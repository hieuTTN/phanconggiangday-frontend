import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import {getMethod,postMethodPayload, deleteMethod, postMethod} from '../../services/request';
import Select from 'react-select';


var token = localStorage.getItem("token");



var size = 10
var url = '';
const AdminKeHoachChiTiet = ()=>{
    const [items, setItems] = useState([]);
    const [namHoc, setnamHoc] = useState([]);
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
                urls =  '/api/ke-hoach-chi-tiet/all/find-by-kehoach?&size='+size+'&idNamHoc='+selectNamHoc.id+'&sort=tongSoNhom,asc&page='
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

        </>
    );
}

export default AdminKeHoachChiTiet;