import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import {getMethod,postMethodPayload, deleteMethod} from '../../services/request';


var token = localStorage.getItem("token");



var size = 10
var url = '';
const AdminGiangVien = ()=>{
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);

    useEffect(()=>{
        const getKhoaHoc = async() =>{
            var response = await getMethod('/api/giang-vien/all/find-all?&size='+size+'&sort=maCB,desc&page='+0)
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
            url = '/api/giang-vien/all/find-all?&size='+size+'&sort=maCB,desc&page='
        };
        getKhoaHoc();
    }, []);

    const handlePageClick = async (data)=>{
        var currentPage = data.selected
        var response = await getMethod(url+currentPage)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
    }

    const searchGiangVien = async() =>{
        var search = document.getElementById("search").value
        var response = await getMethod('/api/giang-vien/all/find-all?&size='+size+'&sort=maCB,desc&search='+search+'&page='+0)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
        url = '/api/giang-vien/all/find-all?&size='+size+'&sort=maCB,desc&search='+search+'&page='
    };

    async function deleteGiangVien(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa giảng viên này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/giang-vien/admin/delete?id='+id)
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

    
    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Giảng Viên</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <div className='d-flex divngayadmin'>
                        <input onKeyUp={searchGiangVien} id='search' className='form-control' placeholder='Tìm kiếm giảng viên'/>
                    </div>
                    <a href='add-giang-vien' class="btn btn-primary ms-2"><i className='fa fa-plus'></i></a>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách giảng viên</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Mã giảng viên</th>
                                <th>Tên giảng viên</th>
                                <th>Ngày sinh</th>
                                <th>Bộ môn</th>
                                <th>Học vị</th>
                                <th>Chức danh</th>
                                <th>Đơn vị công tác</th>
                                <th>Số điện thoại</th>
                                <th>Loại hợp đồng</th>
                                <th>Loại tài khoản</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                return  <tr>
                                    <td>{item.maCB}</td>
                                    <td>{item.tenGV}</td>
                                    <td>{item.ngaySinh}</td>
                                    <td>{item.chuyenNganh?.maChuyenNganh}</td>
                                    <td>{item.hocVi}</td>
                                    <td>{item.chucDanh}</td>
                                    <td>{item.donViCongTac}</td>
                                    <td>{item.dienThoai}</td>
                                    <td>{item.dangHopDong}</td>
                                    <td>{item.user?.authorities.description}</td>
                                    <td class="sticky-col">
                                        <a href={'add-giang-vien?id='+item.id} class="edit-btn"><i className='fa fa-edit'></i></a>
                                        <button onClick={()=>deleteGiangVien(item.id)} class="delete-btn"><i className='fa fa-trash'></i></button>
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

export default AdminGiangVien;