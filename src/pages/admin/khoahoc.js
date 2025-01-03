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
const AdminKhoaHoc = ()=>{
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [labelBtn, setLabelBtn] = useState("Thêm khóa học");
    const [type, setType] = useState("save");

    useEffect(()=>{
        const getKhoaHoc = async() =>{
            var response = await getMethod('/api/khoa-hoc/all/find-all?&size='+size+'&sort=maKhoaHoc,desc&page='+0)
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
            url = '/api/khoa-hoc/all/find-all?&size='+size+'&sort=maKhoaHoc,desc&page='
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

    function clearData(){
        document.getElementById("idkh").value = "";
        document.getElementById("tenkh").value = "";
        setLabelBtn("Thêm khóa học");
    }

    function setData(khoahoc){
        document.getElementById("idkh").value = khoahoc.id;
        document.getElementById("tenkh").value = khoahoc.tenKhoaHoc;
        document.getElementById("ketthuc").checked = khoahoc.trangThaiKhoaHoc == "DA_KET_THUC";
        setLabelBtn("Cập nhật khóa học");
    }

    async function handleAddKhoaHoc(event) {
        event.preventDefault();
        const payload = {
            id: event.target.elements.idkh.value,
            tenKhoaHoc: event.target.elements.tenkh.value,
            trangThaiKhoaHoc: event.target.elements.ketthuc.checked == true?'DA_KET_THUC':'DANG_HOC',
        };
        var urls = '/api/khoa-hoc/admin/add'
        const res = await postMethodPayload(urls,payload)
        var result = await res.json()
        console.log(result);
        if (res.status == 417) {
            toast.error(result.defaultMessage);
        }
        if(res.status < 300){
            toast.success("Thành công!");
            var response = await getMethod(url+0)
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
        }
    };
    
    async function deleteKhoaHoc(makh){
        var con = window.confirm("Bạn chắc chắn muốn xóa khóa học "+makh+"?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/khoa-hoc/admin/delete?maKh='+makh)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            setItems((prevItems) => prevItems.filter((item) => item.id !== makh));
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

    
    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Khóa Học</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <button onClick={clearData} data-bs-toggle="modal" data-bs-target="#addtk" class="btn btn-primary ms-2"><i className='fa fa-plus'></i></button>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách khóa học</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tên khóa học</th>
                                <th>Trạng thái</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                return  <tr>
                                    <td>{item.id}</td>
                                    <td>{item.tenKhoaHoc}</td>
                                    <td>{item.trangThaiKhoaHoc}</td>
                                    <td class="sticky-col">
                                        <a data-bs-toggle="modal" data-bs-target="#addtk" onClick={()=>setData(item)} href='#' class="edit-btn"><i className='fa fa-edit'></i></a>
                                        <button onClick={()=>deleteKhoaHoc(item.id)} class="delete-btn"><i className='fa fa-trash'></i></button>
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
                            <h5 class="modal-title" id="exampleModalLabel">{labelBtn}</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                        <div class="modal-body row">
                            <form onSubmit={handleAddKhoaHoc} class="col-sm-6" style={{margin:'auto'}}>
                                <input name='idkh' id='idkh' type='hidden' class="form-control"/>
                                <label class="lb-form">Tên khóa học</label>
                                <input name='tenkh' id='tenkh' class="form-control"/>
                                <br/>
                                <label class="checkbox-custom">Kết thúc
                                    <input name='ketthuc' type="checkbox" id='ketthuc'/>
                                    <span class="checkmark-checkbox"></span>
                                </label>
                                <br/>
                                <button class="form-control btn btn-primary">{labelBtn}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminKhoaHoc;