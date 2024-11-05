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
    const [hocKy, setHocKy] = useState([]);
    const [nganh, setNganh] = useState([]);
    const [selectKhoaHoc, setSelectKhoaHoc] = useState(null);
    const [selectNamHoc, setSelectNamHoc] = useState(null);
    const [selectHocKy, setSelectHocKy] = useState(null);
    const [selectedNganh, setSelectedNganh] = useState(null);

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
            var response = await getMethod('/api/hocky/all/find-all')
            var result = await response.json();
            setHocKy(result)
            var response = await getMethod('/api/nganh/all/find-all')
            var result = await response.json();
            setNganh(result)
        };
        getSelect();
    }, []);

    const handlePageClick = async (data)=>{
        var currentPage = data.selected
        var response = await getMethod(url+currentPage)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
    }

    const locKeHoach = async() =>{
        var idkhoahoc = selectKhoaHoc?.id
        var idhocky = selectHocKy?.id
        var idNamHoc = selectNamHoc?.id
        var idnganh = selectedNganh?.id

        var uls = '/api/ke-hoach-mo-mon/all/find-all?&size='+size+'&sort=id,desc'
        if(idkhoahoc != null){
            uls += '&idKhoaHoc='+idkhoahoc
        }
        if(idhocky != null){
            uls += '&idHocKy='+idhocky
        }
        if(idNamHoc != null){
            uls += '&idNamHoc='+idNamHoc
        }
        if(idnganh != null){
            uls += '&idNganh='+idnganh
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
        setSelectHocKy(null)
        setSelectKhoaHoc(null)
        setSelectNamHoc(null)
        setSelectedNganh(null)
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
                            value={selectKhoaHoc}
                            onChange={setSelectKhoaHoc}
                            getOptionLabel={(option) => option.tenKhoaHoc} 
                            getOptionValue={(option) => option.maKhoaHoc}    
                            id='khoaHoc'
                            placeholder="Chọn khóa học"
                        />
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
                        <Select
                            className="select-container selectheader" 
                            options={hocKy}
                            value={selectHocKy}
                            onChange={setSelectHocKy}
                            getOptionLabel={(option) => option.tenHocKy} 
                            getOptionValue={(option) => option.id}    
                            id='hocKy'
                            placeholder="Chọn học kỳ"
                        />
                        <Select
                            className="select-container selectheader" 
                            options={nganh}
                            value={selectedNganh}
                            onChange={setSelectedNganh}
                            getOptionLabel={(option) => option.tenNganh} 
                            getOptionValue={(option) => option.id}    
                            id='nganh'
                            placeholder="Chọn ngành"
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
                                <th>ID</th>
                                <th>Ngày tạo</th>
                                <th>Năm học</th>
                                <th>Khóa học</th>
                                <th>Học kỳ</th>
                                <th>Ngành</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                return  <tr>
                                    <td>{item.id}</td>
                                    <td>{item.ngayTao}</td>
                                    <td>{item.namHoc.hocKy}, {item.namHoc.tenNamHoc}</td>
                                    <td>{item.khoaHoc.tenKhoaHoc}</td>
                                    <td>{item.hocKy.tenHocKy}</td>
                                    <td>{item.nganh.tenNganh}</td>
                                    <td class="sticky-col">
                                        <a href={'chi-tiet-ke-hoach?kehoach='+item.id} target='_blank' class="edit-btn"><i className='fa fa-eye'></i></a>
                                        <button onClick={()=>deletekeHoach(item.id)} class="delete-btn"><i className='fa fa-trash'></i></button>
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

export default AdminKeHoach;