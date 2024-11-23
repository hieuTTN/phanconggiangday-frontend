import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import {getMethod,postMethodPayload, deleteMethod} from '../../services/request';
import Select from 'react-select';


var token = localStorage.getItem("token");



var size = 10
var url = '';
const TruongBoMonKeHoach = ()=>{
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [namHoc, setnamHoc] = useState([]);
    const [selectNamHoc, setSelectNamHoc] = useState(null);
    const [giangVien, setGiangVien] = useState([]);
    const [selectGiangVien, setSelectGiangVien] = useState(null);
    const [kehoach, setKeHoach] = useState(null);
    const [listKeHoach, setListKeHoach] = useState([]);
    const [giangVienHocPhan, setGiangVienHocPhan] = useState([]);
    const [soNhomDay, setSoNhomDay] = useState(0);
    const [totalElement, setTotalElement] = useState(0);

    useEffect(()=>{
        const getSelect = async() =>{
            var response = await getMethod('/api/nam-hoc/all/find-all-list')
            var result = await response.json();
            setnamHoc(result)
            getKeHoachChiTiet(result[result.length-1].id)
        };
        getSelect();
        const getGiangVien = async() =>{
            var response = await getMethod('/api/giang-vien/head-department/find-all-list-bo-mon')
            var result = await response.json();
            setGiangVien(result)
        };
        getGiangVien();
    }, []);

    const getKeHoachChiTiet = async(idnamhoc, search) =>{
        var urlfr = '/api/ke-hoach-chi-tiet/head-department/find-by-namHoc?&size='+size+'&idNamHoc='+idnamhoc+'&sort=tongSoNhom,asc'
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

    const handlePageClick = async (data)=>{
        var currentPage = data.selected
        var response = await getMethod(url+currentPage)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
    }

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

    async function loadDanhSachGv(item) {
        setKeHoach(item)
        var response = await getMethod('/api/phan-cong-giang-vien/head-department/find-by-ke-hoach?keHoachId='+item.id)
        var result = await response.json();
        setListKeHoach(result)

        setSelectGiangVien(null);
        var response = await getMethod('/api/giang-vien/head-department/find-all-by-hoc-phan?idhocphan='+item.hocPhan.id)
        var result = await response.json();
        setGiangVien(result)
    }
    

    async function handleAddPhanCong(event) {
        event.preventDefault();
        const payload = {
            soNhom: event.target.elements.soNhom.value,
            loaiNhom: event.target.elements.loaiNhom.value,
            keHoachChiTiet: {
                id: kehoach.id,
            },
            giangVien: {
                id: selectGiangVien.id,
            },
        };
        
        const res = await postMethodPayload('/api/phan-cong-giang-vien/head-department/add',payload)
        var result = await res.json()
        console.log(result);
        if (res.status == 417) {
            toast.error(result.defaultMessage);
        }
        if(res.status < 300){
            toast.success("Thành công!");
            var response = await getMethod('/api/phan-cong-giang-vien/head-department/find-by-ke-hoach?keHoachId='+kehoach.id)
            var result = await response.json();
            setListKeHoach(result)
        }
    };

    async function deletePhanCong(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa phân công này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/phan-cong-giang-vien/head-department/delete?id='+id)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            var response = await getMethod('/api/phan-cong-giang-vien/head-department/find-by-ke-hoach?keHoachId='+kehoach.id)
            var result = await response.json();
            setListKeHoach(result)
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

    async function loadThongTinGv(item) {
        setSelectGiangVien(item);
        var response = await getMethod('/api/giang-vien/head-department/thon-tin-gv?namHocId='+selectNamHoc.id+"&idGv="+item.id)
        var result = await response.json();
        setGiangVienHocPhan(result.giangVienHocPhans)
        setSoNhomDay(result.soNhomDay)
    }

    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Kế Hoạch - tìm thấy {totalElement} học phần</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <div className='d-flex divngayadmin'>   
                        <input onKeyUp={searchKeHoach} id='search' placeholder='Nhập mã hoặc tên môn học' className='selectheader'/>  
                        <Select
                            className="select-container selectheader" 
                            options={namHoc}
                            onChange={setSelectNamHoc}
                            getOptionLabel={(option) => option.tenNamHoc + " - "+option.hocKy} 
                            getOptionValue={(option) => option.id}    
                            closeMenuOnSelect={false}
                            id='namHoc'
                            placeholder="Chọn năm học"
                        />
                        <button onClick={locKeHoach} className='btn btn-primary selectheader'>Lọc</button>
                    </div>
                    <a href='add-ke-hoach' class="btn btn-primary ms-2"><i className='fa fa-plus'></i></a>
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
                                <th>SV/ nhóm</th>
                                <th>Tổng số nhóm</th>
                                <th>Nhóm hiện tại</th>
                                <th>Phân công</th>
                                <th>Tổng sinh viên</th>
                                <th>Học phần</th>
                                <th>Bộ môn</th>
                                <th>Trạng thái</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                var tongNhomAll = 0; 
                                var tongNhomLT = 0; 
                                var tongNhomTH = 0; 
                                var tongNhomTam = 0; 
                                var nhomLe = "";
                                var phanHoi = <></>
                                for(var i=0; i< item.phanCongGiangViens.length; i++){
                                    var phanCong = item.phanCongGiangViens[i];
                                    if(phanCong.loaiNhom == "ALL"){
                                        tongNhomAll = Number(tongNhomAll) + Number(phanCong.soNhom)
                                    }
                                    if(phanCong.loaiNhom == "LT"){
                                        tongNhomLT = Number(tongNhomLT) + Number(phanCong.soNhom)
                                    }
                                    if(phanCong.loaiNhom == "TH"){
                                        tongNhomTH = Number(tongNhomTH) + Number(phanCong.soNhom)
                                    }
                                    if(phanCong.phanHoi != null){
                                        phanHoi = <button onClick={()=>loadDanhSachGv(item)} data-bs-toggle="modal" data-bs-target="#modelphanhoi" className='delete-btn top10'>Phản hồi</button>
                                    }
                                }
                                tongNhomTam = tongNhomAll
                                if(Number(tongNhomLT) == Number(tongNhomTH)){
                                    tongNhomAll = Number(tongNhomAll) + Number(tongNhomLT);
                                    tongNhomTam = Number(tongNhomAll) + Number(tongNhomLT);
                                }
                                if(tongNhomLT > tongNhomTH){
                                    tongNhomAll = Number(tongNhomAll) + Number(tongNhomTH);
                                    tongNhomTam = Number(tongNhomTam) + Number(tongNhomLT);
                                    nhomLe = tongNhomLT - tongNhomTH + " - TH"
                                }
                                if(tongNhomTH > tongNhomLT){
                                    tongNhomAll = Number(tongNhomAll) + Number(tongNhomLT);
                                    tongNhomTam = Number(tongNhomTam) + Number(tongNhomTH);
                                    nhomLe = tongNhomTH - tongNhomLT + " - LT"
                                }
                                var btn = <span className='errorpc'>Chưa phân công xong</span>
                                if(tongNhomAll == item.tongSoNhom){
                                    tongNhomAll = Number(tongNhomAll) - Number(tongNhomLT)
                                    btn = <span className='successpc'>Đã công xong</span>
                                }
                                
                                return  <tr>
                                    <td>{item.id}</td>
                                    <td>{item.soLuongSinhVienNhom}</td>
                                    <td>{item.tongSoNhom}</td>
                                    <td>{tongNhomAll} - LT+TH<br/>{tongNhomLT} -LT<br/>{tongNhomTH} -TH</td>
                                    <td>
                                    {item.phanCongGiangViens.map((phanCong=>{
                                        return <span>{phanCong.giangVien.maCB} - {phanCong.giangVien.tenGV}, {phanCong.soNhom} {phanCong.loaiNhom != "ALL"?" - "+phanCong.loaiNhom:''}<br/></span>
                                    }))}
                                    </td>
                                    <td>{item.tongSinhVien}</td>
                                    <td>{item.hocPhan.maHP} - {item.hocPhan.tenHP}</td>
                                    <td>{item.hocPhan.boMon?.tenBoMon}</td>
                                    <td>{btn}<br/>Còn lại: <br/>{item.tongSoNhom - tongNhomTam} - LT+TH<br/>{nhomLe}</td>
                                    <td class="sticky-col">
                                        <button onClick={()=>loadDanhSachGv(item)} data-bs-toggle="modal" data-bs-target="#addtk" class="edit-btn"><i className='fa fa-user-plus'></i></button>
                                        {phanHoi}
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
                        <h5 class="modal-title" id="exampleModalLabel">Kế hoạch học phần {kehoach?.hocPhan.tenHP}, {kehoach?.tongSoNhom} nhóm</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                        <div class="modal-body row">
                            <form onSubmit={handleAddPhanCong} className='row'>
                                <div className='col-sm-3'>
                                    <label class="lb-form">Số nhóm dạy</label>
                                    <input name='soNhom' id='soNhom' class="form-control"/>
                                </div>
                                <div className='col-sm-3'>
                                    <label class="lb-form">Loại nhóm</label>
                                    <select name='loaiNhom' className='form-control'>
                                        <option value='ALL'>LT + TH</option>
                                        <option value='LT'>LT</option>
                                        <option value='TH'>TH</option>
                                    </select>
                                </div>
                                <div className='col-sm-3'>
                                    <label class="lb-form">Giảng viên</label>
                                    <Select
                                        className="select-container" 
                                        options={giangVien}
                                        onChange={loadThongTinGv}
                                        getOptionLabel={(option) => option.id + " - "+option.tenGV} 
                                        getOptionValue={(option) => option.id}    
                                        closeMenuOnSelect={false}
                                        id='giangvien'
                                        placeholder="Chọn giảng viên"
                                    />
                                </div>
                                <div className='col-sm-3'>
                                    <label class="lb-form" dangerouslySetInnerHTML={{__html:'&ThinSpace;'}}></label>
                                    <button className='btn btn-primary'>Thêm</button>
                                </div>
                            </form>
                            <div className='col-sm-12'>
                                {giangVienHocPhan.map((item=>{
                                    return  <span className={item.hocPhan.id == kehoach?.hocPhan.id?'activespmn':''}>{item.hocPhan.tenHP} - {item.loaiNhom}, </span>
                                }))}
                                Số nhóm {soNhomDay}
                            </div>
                            <div class="tablediv">
                                <div class="headertable">
                                    <span class="lbtable">Danh sách phân công </span>
                                </div>
                                <div class="divcontenttable">
                                    <table id="example" class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Mã giảng viên</th>
                                                <th>Tên giảng viên</th>
                                                <th>Số nhóm dạy</th>
                                                <th>Ngày thêm</th>
                                                <th>Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listKeHoach.map((item=>{
                                                return  <tr>
                                                    <td>{item.giangVien.maCB}</td>
                                                    <td>{item.giangVien.tenGV}</td>
                                                    <td>{item.soNhom} {item.loaiNhom != "ALL"?" - "+item.loaiNhom:' - LT + TH'} </td>
                                                    <td>{item.ngayCapNhat}</td>
                                                    <td class="sticky-col">
                                                        <button onClick={()=>deletePhanCong(item.id)} class="delete-btn"><i className='fa fa-trash'></i></button>
                                                    </td>
                                                </tr>
                                            }))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="modelphanhoi" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Phản hồi phân công học phần {kehoach?.hocPhan.tenHP}</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                        <div class="modal-body row">
                            <div class="tablediv">
                                <div class="headertable">
                                    <span class="lbtable">Danh sách phản hồi </span>
                                </div>
                                <div class="divcontenttable">
                                    <table id="example" class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Mã giảng viên</th>
                                                <th>Tên giảng viên</th>
                                                <th>Số nhóm dạy</th>
                                                <th>Ngày phản hồi</th>
                                                <th>Phản hồi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listKeHoach.map((item=>{
                                                return  <tr>
                                                    <td>{item.giangVien.maCB}</td>
                                                    <td>{item.giangVien.tenGV}</td>
                                                    <td>{item.soNhom} {item.loaiNhom != "ALL"?" - "+item.loaiNhom:''} </td>
                                                    <td>{item.ngayPhanHoi}</td>
                                                    <td>{item.phanHoi}</td>
                                                </tr>
                                            }))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TruongBoMonKeHoach;