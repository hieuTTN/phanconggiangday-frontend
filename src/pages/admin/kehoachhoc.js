import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import Select from 'react-select';
import {getMethod,postMethodPayload, deleteMethod} from '../../services/request';


var token = localStorage.getItem("token");



var size = 10
var url = '';
const AdminKeHoachHoc = ()=>{
    const [items, setItems] = useState([]);
    const [nganh, setNganh] = useState([]);
    const [selectedNganh, setSelectedNganh] = useState(null);
    const [khoaHoc, setKhoaHoc] = useState([]);
    const [selectedKhoaHoc, setSelectedKhoaHoc] = useState(null);
    const [labelBtn, setLabelBtn] = useState("Thêm kế hoạch học");
    const [pageCount, setpageCount] = useState(0);
    const [selectedKhoaHocSearch, setSelectedKhoaHocSearch] = useState(null);
    const [selectedNganhSearch, setSelectedNganhSearch] = useState(null);

    useEffect(()=>{
        const getKeHoachHoc = async() =>{
            var response = await getMethod('/api/ke-hoach-hoc/all/findAll-page?size='+size+'&page='+0)
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
            url = '/api/ke-hoach-hoc/all/findAll-page?size='+size+'&page=';
        };
        getKeHoachHoc();
        const getNganh = async() =>{
            var response = await getMethod('/api/nganh/all/find-all')
            var result = await response.json();
            setNganh(result)
        };
        getNganh();
        const getKhoaHoc = async() =>{
            var response = await getMethod('/api/khoa-hoc/all/find-all-list')
            var result = await response.json();
            setKhoaHoc(result)
        };
        getKhoaHoc();
    }, []);


    function clearData(){
        document.getElementById("idkhh").value = "";
        setLabelBtn("Thêm ké hoạch học");
    }

    function setData(item){
        document.getElementById("idkhh").value = item.id;
        setSelectedNganh(item.nganh)
        setSelectedKhoaHoc(item.khoaHoc)
        setLabelBtn("Cập nhật ké hoạch học");
    }

    async function handleAddKeHoachHoc(event) {
        event.preventDefault();
        const payload = {
            id: event.target.elements.idkhh.value,
            nganh: {
                id:event.target.elements.nganh.value
            },
            khoaHoc: {
                id:event.target.elements.khoahoc.value
            },
        };
        const res = await postMethodPayload('/api/ke-hoach-hoc/admin/add',payload)
        var result = await res.json()
        console.log(result);
        if (res.status == 417) {
            toast.error(result.defaultMessage);
        }
        if(res.status < 300){
            toast.success("Thành công!");
            var response = await getMethod('/api/ke-hoach-hoc/all/findAll-page?size='+size+'&page='+0)
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
            url = '/api/ke-hoach-hoc/all/findAll-page?size='+size+'&page=';
        }
    };
    
    async function deleteKeHoachHoc(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa kế học học này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/ke-hoach-hoc/admin/delete?id='+id)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            reloadPage();
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

    const locKeHoach = async() =>{
        var urlfi = '/api/ke-hoach-hoc/all/findAll-page?size='+size;
        if(selectedKhoaHocSearch != null){
            urlfi += '&khoaHocId='+selectedKhoaHocSearch.id
        }
        if(selectedNganhSearch != null){
            urlfi += '&nganhId='+selectedNganhSearch.id
        }
        urlfi += '&page='
        url = urlfi;
        var response = await getMethod(urlfi+0)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
    };

    async function reloadPage() {
        var response = await getMethod('/api/ke-hoach-hoc/all/findAll-page?size='+size+'&page='+0)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
        url = '/api/ke-hoach-hoc/all/findAll-page?size='+size+'&page=';
        setSelectedKhoaHocSearch(null)
        setSelectedNganhSearch(null)
    }

    const handlePageClick = async (data)=>{
        var currentPage = data.selected
        var response = await getMethod(url+currentPage)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
    }


    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Kế Hoạch Học</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <div className='d-flex divngayadmin'>
                        <Select
                            className="select-container" 
                            options={khoaHoc}
                            onChange={setSelectedKhoaHocSearch}
                            value={selectedKhoaHocSearch}
                            getOptionLabel={(option) => option.tenKhoaHoc} 
                            getOptionValue={(option) => option.id}    
                            closeMenuOnSelect={false}
                            placeholder="Chọn khóa học"
                        />
                        <Select
                            className="select-container selectheader" 
                            options={nganh}
                            onChange={setSelectedNganhSearch}
                            value={selectedNganhSearch}
                            getOptionLabel={(option) => option.tenNganh} 
                            getOptionValue={(option) => option.id}    
                            closeMenuOnSelect={false}
                            placeholder="Chọn ngành"
                        />
                         <button onClick={locKeHoach} className='btn btn-primary selectheader'>Lọc</button>
                         <button onClick={()=>reloadPage()} className='btn btn-primary selectheader'><i class="fa fa-refresh"></i></button>
                    </div>
                    <button onClick={clearData} data-bs-toggle="modal" data-bs-target="#addtk" class="btn btn-primary ms-2"><i className='fa fa-plus'></i></button>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách kế hoạch học</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Ngành</th>
                                <th>Khóa học</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                return  <tr>
                                    <td>{item.id}</td>
                                    <td>{item.nganh.tenNganh}</td>
                                    <td>{item.khoaHoc.tenKhoaHoc}</td>
                                    <td class="sticky-col">
                                        <a data-bs-toggle="modal" data-bs-target="#addtk" onClick={()=>setData(item)} href='#' class="edit-btn"><i className='fa fa-edit'></i></a>
                                        <button onClick={()=>deleteKeHoachHoc(item.id)} class="delete-btn"><i className='fa fa-trash'></i></button>
                                        <a href={'chi-tiet-hoc?kehoachhoc='+item.id} class="edit-btn"><i className='fa fa-book'></i></a>
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
                            <form onSubmit={handleAddKeHoachHoc} class="col-sm-6" style={{margin:'auto'}}>
                                <input name='idkhh' id='idkhh' type='hidden' class="form-control"/>
                                <label class="lb-form">Ngành</label>
                                <Select
                                    className="select-container" 
                                    options={nganh}
                                    onChange={setSelectedNganh}
                                    value={selectedNganh}
                                    getOptionLabel={(option) => option.tenNganh} 
                                    getOptionValue={(option) => option.id}    
                                    closeMenuOnSelect={false}
                                    name='nganh'
                                    placeholder="Chọn ngành"
                                />
                                <label class="lb-form">Khóa học</label>
                                <Select
                                    className="select-container" 
                                    options={khoaHoc}
                                    onChange={setSelectedKhoaHoc}
                                    value={selectedKhoaHoc}
                                    getOptionLabel={(option) => option.tenKhoaHoc} 
                                    getOptionValue={(option) => option.id}    
                                    closeMenuOnSelect={false}
                                    name='khoahoc'
                                    placeholder="Chọn khóa học"
                                />
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

export default AdminKeHoachHoc;