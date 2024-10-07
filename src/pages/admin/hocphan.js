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
const AdminHocPhan = ()=>{
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);

    useEffect(()=>{
        const getKhoaHoc = async() =>{
            var response = await getMethod('/api/hoc-phan/all/find-all?&size='+size+'&sort=maHP,desc&page='+0)
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
            url = '/api/hoc-phan/all/find-all?&size='+size+'&sort=maHP,desc&page='
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

    const searchKhoaHoc = async() =>{
        var search = document.getElementById("search").value
        var response = await getMethod('/api/hoc-phan/all/find-all?&size='+size+'&sort=maHP,desc&search='+search+'&page='+0)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
        url = '/api/hoc-phan/all/find-all?&size='+size+'&sort=maHP,desc&search='+search+'&page='
    };

    async function deleteHocPhan(mahp){
        var con = window.confirm("Bạn chắc chắn muốn xóa học phần "+mahp+"?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/hoc-phan/admin/delete?maHp='+mahp)
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
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Học Phần</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <div className='d-flex divngayadmin'>
                        <input onKeyUp={searchKhoaHoc} id='search' className='form-control' placeholder='Tìm kiếm học phần'/>
                    </div>
                    <a href='add-hoc-phan' class="btn btn-primary ms-2"><i className='fa fa-plus'></i></a>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách học phần</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Mã học phân</th>
                                <th>Tên học phần</th>
                                <th>Số tín chỉ</th>
                                <th>Số tiết lý thuyết</th>
                                <th>Số tiết thực hành</th>
                                <th>Tổng số tiết</th>
                                <th>Hệ số</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                return  <tr>
                                    <td>{item.maHP}</td>
                                    <td>{item.tenHP}</td>
                                    <td>{item.soTinChi}</td>
                                    <td>{item.soTietLyThuyet}</td>
                                    <td>{item.soTietThucHanh}</td>
                                    <td>{item.tongSoTiet}</td>
                                    <td>{item.heSo}</td>
                                    <td class="sticky-col">
                                        <a href={'add-hoc-phan?mahp='+item.maHP} class="edit-btn"><i className='fa fa-edit'></i></a>
                                        <button onClick={()=>deleteHocPhan(item.maHP)} class="delete-btn"><i className='fa fa-trash'></i></button>
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

export default AdminHocPhan;