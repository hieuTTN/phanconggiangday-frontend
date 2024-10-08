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
const AdminKeHoach = ()=>{
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [khoahoc, setKhoaHoc] = useState([]);
    const [namHoc, setnamHoc] = useState([]);
    const [hocPhan, sethocPhan] = useState([]);
    const [selectKhoaHoc, setSelectKhoaHoc] = useState(null);
    const [selectNamHoc, setSelectNamHoc] = useState(null);
    const [selectHocPhan, setSelectHocPhan] = useState(null);
    const [giangVien, setGiangVien] = useState([]);
    const [selectGiangVien, setSelectGiangVien] = useState(null);
    const [kehoach, setKeHoach] = useState(null);
    const [listKeHoach, setListKeHoach] = useState([]);

    useEffect(()=>{
        const getKeHoach = async() =>{
            var response = await getMethod('/api/ke-hoach-mo-mon/all/find-all?&size='+size+'&sort=id,desc&page='+0)
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
            url = '/api/ke-hoach-mo-mon/all/find-all?&size='+size+'&sort=id,desc&page='
        };
        getKeHoach();
        const getSelect = async() =>{
            var response = await getMethod('/api/khoa-hoc/all/find-all-list')
            var result = await response.json();
            setKhoaHoc(result)
            var response = await getMethod('/api/nam-hoc/all/find-all-list')
            var result = await response.json();
            setnamHoc(result)
            var response = await getMethod('/api/hoc-phan/all/find-all-list')
            var result = await response.json();
            sethocPhan(result)
        };
        getSelect();
        const getGiangVien = async() =>{
            var response = await getMethod('/api/giang-vien/all/find-all-list')
            var result = await response.json();
            setGiangVien(result)
        };
        getGiangVien();
    }, []);

    const handlePageClick = async (data)=>{
        var currentPage = data.selected
        var response = await getMethod(url+currentPage)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
    }

    const locKeHoach = async() =>{
        var maKhoaHoc = selectKhoaHoc == null?null:selectKhoaHoc.maKhoaHoc
        var maHP = selectHocPhan == null?null:selectHocPhan.maHP
        var idNamHoc = selectNamHoc == null?null:selectNamHoc.id

        var uls = '/api/ke-hoach-mo-mon/all/find-all?&size='+size+'&sort=id,desc'
        if(maKhoaHoc != null){
            uls += '&maKhoaHoc='+maKhoaHoc
        }
        if(maHP != null){
            uls += '&maHP='+maHP
        }
        if(idNamHoc != null){
            uls += '&idNamHoc='+idNamHoc
        }
        uls += '&page='
        url = uls
        var response = await getMethod(uls+0)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
        url = uls
    };

    async function deletekeHoach(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa kế hoạch này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/ke-hoach-mo-mon/admin/delete?id='+id)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            var response = await getMethod(url+0)
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

    async function reloadPage() {
        var response = await getMethod('/api/ke-hoach-mo-mon/all/find-all?&size='+size+'&sort=id,desc&page='+0)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
        url = '/api/ke-hoach-mo-mon/all/find-all?&size='+size+'&sort=id,desc&page='
    }

    async function loadDanhSachGv(item) {
        setKeHoach(item)
        var response = await getMethod('/api/phan-cong-giang-vien/admin/find-by-ke-hoach?keHoachId='+item.id)
        var result = await response.json();
        setListKeHoach(result)
    }
    

    async function handleAddPhanCong(event) {
        event.preventDefault();
        const payload = {
            soNhom: event.target.elements.soNhom.value,
            keHoachMoMon: {
                id: kehoach.id,
            },
            giangVien: {
                maCB: selectGiangVien.maCB,
            },
        };
        
        const res = await postMethodPayload('/api/phan-cong-giang-vien/admin/add',payload)
        var result = await res.json()
        console.log(result);
        if (res.status == 417) {
            toast.error(result.defaultMessage);
        }
        if(res.status < 300){
            toast.success("Thành công!");
            var response = await getMethod('/api/phan-cong-giang-vien/admin/find-by-ke-hoach?keHoachId='+kehoach.id)
            var result = await response.json();
            setListKeHoach(result)
        }
    };

    async function deletePhanCong(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa phân công này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/phan-cong-giang-vien/admin/delete?id='+id)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            var response = await getMethod('/api/phan-cong-giang-vien/admin/find-by-ke-hoach?keHoachId='+kehoach.id)
            var result = await response.json();
            setListKeHoach(result)
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Kế Hoạch</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <div className='d-flex divngayadmin'>   
                        <Select
                            className="select-container" 
                            options={khoahoc}
                            onChange={setSelectKhoaHoc}
                            getOptionLabel={(option) => option.tenKhoaHoc} 
                            getOptionValue={(option) => option.maKhoaHoc}    
                            closeMenuOnSelect={false}
                            id='khoaHoc'
                            placeholder="Chọn khóa học"
                        />
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
                        <Select
                            className="select-container selectheader" 
                            options={hocPhan}
                            onChange={setSelectHocPhan}
                            getOptionLabel={(option) => option.tenHP} 
                            getOptionValue={(option) => option.maHP}    
                            closeMenuOnSelect={false}
                            id='hocPhan'
                            placeholder="Chọn học phần"
                        />
                        <button onClick={locKeHoach} className='btn btn-primary selectheader'>Lọc</button>
                        <button onClick={()=>reloadPage()} className='btn btn-primary selectheader'><i class="fa fa-refresh"></i></button>
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
                                <th>Mã học phần</th>
                                <th>Tên học phần</th>
                                <th>Năm học</th>
                                <th>Khóa học</th>
                                <th>Số lượng sinh viên</th>
                                <th>Tổng số nhóm</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                return  <tr>
                                    <td>{item.hocPhan.maHP}</td>
                                    <td>{item.hocPhan.tenHP}</td>
                                    <td>{item.namHoc.hocKy}, {item.namHoc.tenNamHoc}</td>
                                    <td>{item.khoaHoc.tenKhoaHoc}</td>
                                    <td>{item.soLuongSinhVienNhom}</td>
                                    <td>{item.tongSoNhom}</td>
                                    <td class="sticky-col">
                                        <a href={'add-ke-hoach?id='+item.id} class="edit-btn"><i className='fa fa-edit'></i></a>
                                        <button onClick={()=>deletekeHoach(item.id)} class="delete-btn"><i className='fa fa-trash'></i></button>
                                        <button onClick={()=>loadDanhSachGv(item)} data-bs-toggle="modal" data-bs-target="#addtk" class="edit-btn"><i className='fa fa-user-plus'></i></button>
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
                        <h5 class="modal-title" id="exampleModalLabel">Thêm giảng viên</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                        <div class="modal-body row">
                            <form onSubmit={handleAddPhanCong} className='row'>
                                <div className='col-sm-4'>
                                    <label class="lb-form">Số nhóm dạy</label>
                                    <input name='soNhom' id='soNhom' class="form-control"/>
                                </div>
                                <div className='col-sm-4'>
                                    <label class="lb-form">Giảng viên</label>
                                    <Select
                                        className="select-container" 
                                        options={giangVien}
                                        onChange={setSelectGiangVien}
                                        getOptionLabel={(option) => option.maCB + " - "+option.tenGV} 
                                        getOptionValue={(option) => option.maCB}    
                                        closeMenuOnSelect={false}
                                        id='giangvien'
                                        placeholder="Chọn giảng viên"
                                    />
                                </div>
                                <div className='col-sm-4'>
                                    <label class="lb-form" dangerouslySetInnerHTML={{__html:'&ThinSpace;'}}></label>
                                    <button className='btn btn-primary'>Thêm</button>
                                </div>
                            </form>

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
                                                    <td>{item.soNhom}</td>
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
        </>
    );
}

export default AdminKeHoach;