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
    const [pageCount, setpageCount] = useState(0);

    useEffect(()=>{
        getKeHoachChiTiet();
    }, []);

    const getKeHoachChiTiet = async() =>{
        var uls = new URL(document.URL)
        var kehoach = uls.searchParams.get("kehoach");
        var response = await getMethod('/api/ke-hoach-chi-tiet/all/find-by-kehoach?&size='+size+'&idKeHoach='+kehoach+'&sort=tongSoNhom,asc&page='+0)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
        url ='/api/ke-hoach-chi-tiet/all/find-by-kehoach?&size='+size+'&idKeHoach='+kehoach+'&sort=tongSoNhom,asc&page='
    };

    const handlePageClick = async (data)=>{
        var currentPage = data.selected
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
            getKeHoachChiTiet();
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

    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Kế Hoạch Chi Tiết</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <div className='d-flex divngayadmin'>   
                    </div>
                    {/* <a href='add-ke-hoach' class="btn btn-primary ms-2"><i className='fa fa-plus'></i></a> */}
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
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                return  <tr>
                                    <td>{item.id}</td>
                                    <td>
                                        <form onSubmit={updateSoLuong}>
                                            <input name='idct' value={item.id} type='hidden'/>
                                            <input required name='soluong' defaultValue={item.soLuongSinhVienNhom} className='inputnoborder' placeholder='0'/>
                                            <button className='edit-btn'><i class="fa fa-edit"></i></button>
                                        </form>
                                    </td>
                                    <td>{item.tongSoNhom}</td>
                                    <td>{item.tongSinhVien}</td>
                                    <td>{item.hocPhan.maHP} - {item.hocPhan.tenHP}</td>
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