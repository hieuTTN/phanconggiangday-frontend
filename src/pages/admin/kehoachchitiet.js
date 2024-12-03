import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import {getMethod,postMethodPayload, deleteMethod, postMethod} from '../../services/request';
import Select from 'react-select';


var token = localStorage.getItem("token");
async function saveChiTiet(event) {
    event.preventDefault();
    var namHoc = event.target.elements.namHoc.value
    var hocphan = event.target.elements.hocphan.value
    var tongsinhvien = event.target.elements.tongsinhvien.value
    var slsinhviennhom = event.target.elements.slsinhviennhom.value
    var urs = '/api/ke-hoach-chi-tiet/admin/add?idMonHoc='+hocphan+'&idNamHoc='+namHoc;
    if(tongsinhvien != "") urs += '&tongSv='+tongsinhvien
    if(slsinhviennhom != "") urs += '&soLuongSvNhom='+slsinhviennhom
    const response = await postMethod(urs)
    if (response.status < 300) {
        Swal.fire({
            title: "Thông báo",
            text: "Thêm thành công!",
            preConfirm: () => {
                window.location.reload();
            }
        });
    } 
    else {
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
        else{
             toast.error("Thêm thất bại");
        }
    }
}



var size = 10
var url = '';
const AdminKeHoachChiTiet = ()=>{
    const [items, setItems] = useState([]);
    const [namHoc, setnamHoc] = useState([]);
    const [hocphan, sethocphan] = useState([]);
    const [selectNamHoc, setSelectNamHoc] = useState(null);
    const [pageCount, setpageCount] = useState(0);
    const [pagecurrent, setpagecurrent] = useState(0);
    const [totalElement, setTotalElement] = useState(0);

    useEffect(()=>{
        const getSelect = async() =>{
            var response = await getMethod('/api/nam-hoc/all/find-all-list')
            var result = await response.json();
            setnamHoc(result)
            getKeHoachChiTiet(result[result.length-1].id)

        };
        getSelect();
    }, []);

    const getKeHoachChiTiet = async(idnamhoc, search) =>{
        var urlfr = '/api/ke-hoach-chi-tiet/all/find-by-kehoach?&size='+size+'&idNamHoc='+idnamhoc+'&sort=tongSoNhom,asc'
        if(search != null && search != undefined){
            urlfr += '&search='+search
        }
        urlfr += '&page='
        url = urlfr;
        var response = await getMethod(urlfr+0)
        var result = await response.json();
        setTotalElement(result.totalElements);
        setItems(result.content)
        setpageCount(result.totalPages)
    };

    const locKeHoach = async() =>{
        getKeHoachChiTiet(selectNamHoc.id)
    };

    const searchKeHoach = async() =>{
        var search = document.getElementById("search").value
        if(search != ""){
            getKeHoachChiTiet(selectNamHoc.id, search)
        }
        else{
            getKeHoachChiTiet(selectNamHoc.id)
        }
    };

    const handlePageClick = async (data)=>{
        var currentPage = data.selected
        setpagecurrent(currentPage)
        var response = await getMethod(url+currentPage)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
    }

    async function updateSoLuong(event) {
        event.preventDefault();
        var idct = event.target.elements.idct.value
        var soluong = event.target.elements.soluong.value
        var url = '/api/ke-hoach-chi-tiet/admin/update-soluong-sinh-vien?id='+idct+'&soLuongSinhVienNhom='+soluong
        const response = await postMethod(url)
        if (response.status < 300) {
            toast.success("Cập nhật thành công")
            event.target.elements.soluong.value = null;
            getKeHoachChiTiet(selectNamHoc.id)
        } 
        else {
            if (response.status == 417) {
                var result = await response.json()
                toast.warning(result.defaultMessage);
            }
            else{
                 toast.error("Thất bại");
            }
        }
    }

    async function updateTongSoLuong(event) {
        event.preventDefault();
        var idct = event.target.elements.idct.value
        var soluong = event.target.elements.soluong.value
        var url = '/api/ke-hoach-chi-tiet/admin/update-tong-soluong-sinh-vien?id='+idct+'&tongSL='+soluong
        const response = await postMethod(url)
        if (response.status < 300) {
            toast.success("Cập nhật thành công")
            event.target.elements.soluong.value = null;
            getKeHoachChiTiet(selectNamHoc.id)
        } 
        else {
            if (response.status == 417) {
                var result = await response.json()
                toast.warning(result.defaultMessage);
            }
            else{
                 toast.error("Thất bại");
            }
        }
    }

    async function lockOrUnlock(id) {
        const response = await postMethod('/api/ke-hoach-chi-tiet/all/lock-single?id='+id)
        if (response.status < 300) {
            toast.success("Cập nhật thành công")
            var urls = url;
            if(url == ""){
                urls =  '/api/ke-hoach-chi-tiet/all/find-by-kehoach?&size='+size+'&idNamHoc='+selectNamHoc.id+'&sort=id,desc&sort=tongSoNhom,asc&page='
            }
            var res = await getMethod(urls+pagecurrent)
            var result = await res.json();
            setItems(result.content)
            setpageCount(result.totalPages)
        } 
        else {
            toast.error("Thất bại");
        }
    }

    async function khoaTatca() {
        var con = window.confirm("Xác nhận khóa tất cả kế hoạch kỳ này?");
        if(con == false){
            return;
        }
        const response = await postMethod('/api/ke-hoach-chi-tiet/all/lock?idNamHoc='+selectNamHoc.id)
        if (response.status < 300) {
            toast.success("Cập nhật thành công")
            locKeHoach();
        } 
        else {
            toast.error("Thất bại");
        }
    }

    const handleInputChange = (id, field, value) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    async function loadHocPhan(option) {
        var response = await getMethod('/api/hoc-phan/all/find-all-list-by-nam-hoc?idNamHoc='+option.id)
        var result = await response.json();
        toast.success("Tìm thấy "+result.length+" học phần chưa được mở trong học kỳ này")
        sethocphan(result)
    }

    async function deleteChiTiet(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa chi tiết kế hoạch này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/ke-hoach-chi-tiet/admin/delete?id='+id)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            var response = await getMethod(url+pagecurrent)
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
        }
        else{
            toast.warning("Đã có liên kết, không thể xóa");
        }
    }


    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Kế Hoạch Chi Tiết - tìm thấy {totalElement} học phần</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <div className='d-flex divngayadmin'>
                        {selectNamHoc == null?'':<button onClick={()=>khoaTatca()} className='btn btn-danger selectheader'>Khóa kế hoạch</button>}
                        <input onKeyUp={searchKeHoach} id='search' placeholder='Nhập mã hoặc tên môn học' className='selectheader'/>  
                        <Select
                            className="select-container selectheader" 
                            options={namHoc}
                            value={selectNamHoc}
                            onChange={setSelectNamHoc}
                            getOptionLabel={(option) => option.tenNamHoc + " - "+option.hocKy} 
                            getOptionValue={(option) => option.id}    
                            id='namHoc'
                            placeholder="Chọn năm học"
                        /> 
                        <button onClick={locKeHoach} className='btn btn-primary selectheader'>Lọc</button>
                        <button data-bs-toggle="modal" data-bs-target="#addtk" className='btn btn-primary selectheader'><i class="fa fa-plus"></i></button>
                    </div>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách kế hoạch</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Số lượng sinh viên/ nhóm</th>
                                <th>Tổng số nhóm</th>
                                <th>Tổng sinh viên</th>
                                <th>Học phần</th>
                                <th>Bộ môn</th>
                                <th>Khóa</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody id='tbodymap'>
                            {items.map((item=>{
                                return  <tr>
                                    <td>{item.id}</td>
                                    <td>
                                        <form onSubmit={updateSoLuong}>
                                            <input name='idct' value={item.id} type='hidden'/>
                                            <input required name='soluong' onChange={(e) => handleInputChange(item.id, 'soLuongSinhVienNhom', e.target.value)}
                                            value={item.soLuongSinhVienNhom || ''} className='inputnoborder' placeholder='0'/>
                                            <button className='edit-btn'><i class="fa fa-edit"></i></button>
                                        </form>
                                    </td>
                                    <td>{item.tongSoNhom}</td>
                                    <td>
                                        <form onSubmit={updateTongSoLuong}>
                                            <input name='idct' value={item.id} type='hidden'/>
                                            <input required name='soluong' onChange={(e) => handleInputChange(item.id, 'tongSinhVien', e.target.value)} 
                                                value={item.tongSinhVien || ''} className='inputnoborder' />
                                            <button className='edit-btn'><i class="fa fa-edit"></i></button>
                                        </form>
                                    </td>
                                    <td>{item.hocPhan.maHP} - {item.hocPhan.tenHP}</td>
                                    <td>{item.hocPhan.boMon?.tenBoMon}</td>
                                    <td>
                                        <label class="checkbox-custom cateparent">
                                            <input onChange={()=>lockOrUnlock(item.id)} checked={item.locked} class="inputchecktrademark" type="checkbox"/>
                                            <span class="checkmark-checkbox"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <button onClick={()=>deleteChiTiet(item.id)} class="delete-btn"><i className='fa fa-trash'></i></button>
                                    </td>
                                </tr>
                            }))}
                        </tbody>
                    </table>

                    <ReactPaginate 
                        marginPagesDisplayed={2} 
                        pageCount={pageCount} 
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'} 
                        pageClassName={'page-item'} 
                        pageLinkClassName={'page-link'}
                        previousClassName='page-item'
                        previousLinkClassName='page-link'
                        nextClassName='page-item'
                        nextLinkClassName='page-link'
                        breakClassName='page-item'
                        breakLinkClassName='page-link' 
                        previousLabel='Trang trước'
                        nextLabel='Trang sau'
                        activeClassName='active'/>
                </div>
            </div>

            <div class="modal fade" id="addtk" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Thêm chi tiết kế hoạch</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                        <div class="modal-body row">
                            <form onSubmit={saveChiTiet} class="col-sm-6" style={{margin:'auto'}}>
                                <label className='lb-form'>Chọn học kỳ - năm học</label>
                                <Select
                                    options={namHoc}
                                    onChange={loadHocPhan}
                                    getOptionLabel={(option) => option.tenNamHoc + " - "+option.hocKy} 
                                    getOptionValue={(option) => option.id}    
                                    name='namHoc'
                                    placeholder="Chọn năm học"
                                /> 
                                <label className='lb-form'>Chọn học phần</label>
                                <Select
                                    options={hocphan}
                                    getOptionLabel={(option) => option.maHP + " - "+option.tenHP} 
                                    getOptionValue={(option) => option.id}    
                                    name='hocphan'
                                    placeholder="Chọn học phần muốn mở"
                                />
                                <label className='lb-form'>Tổng sinh viên (có thể bỏ trống)</label>
                                <input name='tongsinhvien' className='form-control'/>
                                <label className='lb-form'>Số lượng sinh viên / nhóm (có thể bỏ trống)</label>
                                <input name='slsinhviennhom' className='form-control'/>
                                <br/>
                                <button class="form-control btn btn-primary">Thêm chi tiết kế hoạch</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminKeHoachChiTiet;