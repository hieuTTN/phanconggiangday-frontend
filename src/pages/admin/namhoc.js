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
const AdminNamHoc = ()=>{
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [labelBtn, setLabelBtn] = useState("Thêm năm học");
    const [type, setType] = useState("save");

    useEffect(()=>{
        const getKhoaHoc = async() =>{
            var response = await getMethod('/api/nam-hoc/all/find-all?&size='+size+'&sort=id,desc&page='+0)
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
            url = '/api/nam-hoc/all/find-all?&size='+size+'&sort=id,desc&page='
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
        document.getElementById("idnamhoc").value = "";
        document.getElementById("ten").value = "";
        document.getElementById("hocky").value = "";
        setLabelBtn("Thêm năm học");
    }

    function setData(namHoc){
        document.getElementById("idnamhoc").value = namHoc.id;
        document.getElementById("ten").value = namHoc.tenNamHoc;
        document.getElementById("hocky").value = namHoc.hocKy;
        setLabelBtn("Cập nhật năm học");
    }

    async function handleAddNamHoc(event) {
        event.preventDefault();
        const payload = {
            id: event.target.elements.id.value,
            tenNamHoc: event.target.elements.ten.value,
            hocKy: event.target.elements.hocky.value,
        };
        const res = await postMethodPayload('/api/nam-hoc/admin/add-update',payload)
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
    
    async function deleteNamHoc(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa năm học này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/nam-hoc/admin/delete?id='+id)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

    
    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Năm Học</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <button onClick={clearData} data-bs-toggle="modal" data-bs-target="#addtk" class="btn btn-primary ms-2"><i className='fa fa-plus'></i></button>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách năm học</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên năm học</th>
                                <th>Học kỳ</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                return  <tr>
                                    <td>{item.id}</td>
                                    <td>{item.tenNamHoc}</td>
                                    <td>{item.hocKy}</td>
                                    <td class="sticky-col">
                                        <a data-bs-toggle="modal" data-bs-target="#addtk" onClick={()=>setData(item)} href='#' class="edit-btn"><i className='fa fa-edit'></i></a>
                                        <button onClick={()=>deleteNamHoc(item.id)} class="delete-btn"><i className='fa fa-trash'></i></button>
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
                            <form onSubmit={handleAddNamHoc} class="col-sm-6" style={{margin:'auto'}}>
                                <label class="lb-form">Tên năm học</label>
                                <input name='id' type='hidden' id='idnamhoc' class="form-control"/>
                                <input name='ten' id='ten' class="form-control"/>
                                <label class="lb-form">Học kỳ</label>
                                <input name='hocky' id='hocky' class="form-control"/>
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

export default AdminNamHoc;