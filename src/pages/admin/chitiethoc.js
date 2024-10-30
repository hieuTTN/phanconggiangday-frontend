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
const AdminChiTietHoc = ()=>{
    const [items, setItems] = useState([]);
    const [hocKy, setHocKy] = useState([]);
    const [hocPhan, setHocPhan] = useState([]);
    const [hocPhanSelected, setHocPhanSelected] = useState([]);
    const [selectedHocKySearch, setSelectedHocKySearch] = useState(null);
    const [pageCount, setpageCount] = useState(0);
    const [keHoachHoc, setKeHoachHoc] = useState(null);

    useEffect(()=>{
        var uls = new URL(document.URL)
        var kehoachhoc = uls.searchParams.get("kehoachhoc");
        const getChiTietHoc = async() =>{
            var response = await getMethod('/api/chi-tiet-hoc/all/findAll-page?size='+size+'&keHoachHocId='+kehoachhoc+'&page='+0)
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
            url = '/api/chi-tiet-hoc/all/findAll-page?size='+size+'&keHoachHocId='+kehoachhoc+'&page=';
        };
        getChiTietHoc();
        const getHocKy = async() =>{
            var response = await getMethod('/api/hocky/all/find-all')
            var result = await response.json();
            setHocKy(result)
        };
        getHocKy();
        const getHocPhan = async() =>{
            var response = await getMethod('/api/hoc-phan/all/find-all-list')
            var result = await response.json();
            setHocPhan(result)
        };
        getHocPhan();
        const getKeHoachHoc = async() =>{
            var response = await getMethod('/api/ke-hoach-hoc/public/findById?id='+kehoachhoc)
            var result = await response.json();
            setKeHoachHoc(result)
        };
        getKeHoachHoc();
    }, []);


    async function handleAddChiTietHoc(event) {
        event.preventDefault();
        var listId = [];
        if(hocPhanSelected.length == 0){
            toast.warning("Chưa có học phần nào được chọn")
            return;
        }
        for(var i=0; i<hocPhanSelected.length; i++){
            listId.push(hocPhanSelected[i].id)
        }
        const payload = {
            listIdHocPhan: listId,
            hocKy: {
                id:event.target.elements.hocky.value
            },
            keHoachHoc: {
                id:keHoachHoc.id
            },
        };
        const res = await postMethodPayload('/api/chi-tiet-hoc/admin/add',payload)
        var result = await res.json()
        console.log(result);
        if (res.status == 417) {
            toast.error(result.defaultMessage);
        }
        if(res.status < 300){
            toast.success("Thành công!");
            reloadPage();
        }
    };
    
    async function deleteChiTietHoc(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa chi tiết học học này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/chi-tiet-hoc/admin/delete?id='+id)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            reloadPage();
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

    const locChiTietHoc = async() =>{
        var uls = new URL(document.URL)
        var kehoachhoc = uls.searchParams.get("kehoachhoc");
        var urlfi = '/api/chi-tiet-hoc/all/findAll-page?size='+size+'&keHoachHocId='+kehoachhoc;
        if(selectedHocKySearch != null){
            urlfi += '&hocKyId='+selectedHocKySearch.id
        }
        urlfi += '&page='
        url = urlfi;
        var response = await getMethod(urlfi+0)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
    };

    async function reloadPage() {
        var uls = new URL(document.URL)
        var kehoachhoc = uls.searchParams.get("kehoachhoc");
        var response = await getMethod('/api/chi-tiet-hoc/all/findAll-page?size='+size+'&keHoachHocId='+kehoachhoc+'&page='+0)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
        url = '/api/chi-tiet-hoc/all/findAll-page?size='+size+'&keHoachHocId='+kehoachhoc+'&page=';
        setSelectedHocKySearch(null);
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
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Chi Tiết Học<br/>Ngành: {keHoachHoc?.nganh.tenNganh} - Khóa học: {keHoachHoc?.khoaHoc.tenKhoaHoc}</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <div className='d-flex divngayadmin'>
                        <Select
                            className="select-container" 
                            options={hocKy}
                            onChange={setSelectedHocKySearch}
                            value={selectedHocKySearch}
                            getOptionLabel={(option) => option.tenHocKy} 
                            getOptionValue={(option) => option.id}    
                            closeMenuOnSelect={false}
                            placeholder="Chọn học kỳ"
                        />
                         <button onClick={locChiTietHoc} className='btn btn-primary selectheader'>Lọc</button>
                         <button onClick={()=>reloadPage()} className='btn btn-primary selectheader'><i class="fa fa-refresh"></i></button>
                    </div>
                    <button data-bs-toggle="modal" data-bs-target="#addtk" class="btn btn-primary ms-2"><i className='fa fa-plus'></i></button>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách chi tiết học</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Mã học phần</th>
                                <th>Tên học phần</th>
                                <th>Học kỳ</th>
                                <th>Ngành học</th>
                                <th>Khóa học</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                return  <tr>
                                    <td>{item.id}</td>
                                    <td>{item.hocPhan.maHP}</td>
                                    <td>{item.hocPhan.tenHP}</td>
                                    <td>{item.hocKy.tenHocKy}</td>
                                    <td>{item.keHoachHoc.nganh.tenNganh}</td>
                                    <td>{item.keHoachHoc.khoaHoc.tenKhoaHoc}</td>
                                    <td class="sticky-col">
                                        <button onClick={()=>deleteChiTietHoc(item.id)} class="delete-btn"><i className='fa fa-trash'></i></button>
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
                            <h5 class="modal-title" id="exampleModalLabel">Thêm danh sách chi tiết học</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                        <div class="modal-body row">
                            <form onSubmit={handleAddChiTietHoc} class="col-sm-12">
                                <input name='idkhh' id='idkhh' type='hidden' class="form-control"/>
                                <label class="lb-form">Chọn danh sách học phần</label>
                                <Select
                                    className="select-container" 
                                    options={hocPhan}
                                    isMulti
                                    onChange={setHocPhanSelected}
                                    value={hocPhanSelected}
                                    getOptionLabel={(option) => option.maHP+ " - "+option.tenHP} 
                                    getOptionValue={(option) => option.id}    
                                    closeMenuOnSelect={false}
                                    name='hocphan'
                                    placeholder="Chọn danh sách học phần"
                                />
                                <label class="lb-form">Học kỳ</label>
                                <Select
                                    className="select-container" 
                                    options={hocKy}
                                    getOptionLabel={(option) => option.tenHocKy} 
                                    getOptionValue={(option) => option.id}    
                                    closeMenuOnSelect={false}
                                    name='hocky'
                                    placeholder="Chọn học kỳ"
                                />
                                <br/>
                                <button class="form-control btn btn-primary">Thêm danh sách chi tiết học</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminChiTietHoc;