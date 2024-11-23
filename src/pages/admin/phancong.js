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
const AdminPhanCong = ()=>{
    const [items, setItems] = useState([]);
    const [namHoc, setnamHoc] = useState([]);
    const [selectNamHoc, setSelectNamHoc] = useState(null);
    const [pageCount, setpageCount] = useState(0);

    useEffect(()=>{
        const getSelect = async() =>{
            var response = await getMethod('/api/nam-hoc/all/find-all-list')
            var result = await response.json();
            setnamHoc(result)
        };
        getSelect();
    }, []);

    const getPhanCong = async() =>{
        if(selectNamHoc == null){
            toast.error("Hãy chọn 1 học kỳ");
            return;
        }
        var response = await getMethod('/api/giang-vien/admin/giang-vien-so-tiet?idnamhoc='+selectNamHoc.id+'&size='+size+'&page='+0)
        var result = await response.json();
        console.log(result);
        setItems(result.content)
        setpageCount(result.totalPages)
        url = '/api/giang-vien/admin/giang-vien-so-tiet?idnamhoc='+selectNamHoc.id+'&size='+size+'&page='
    };

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
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Phân Công</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <div className='d-flex divngayadmin'>
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
                        <button onClick={getPhanCong} className='btn btn-primary selectheader'>Lọc</button>
                    </div>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách phân công</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Mã giảng viên</th>
                                <th>Họ tên</th>
                                <th>Bộ môn</th>
                                <th>Số tiết dạy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                return <tr>
                                    <td>{item.giangVien.maCB}</td>
                                    <td>{item.giangVien.tenGV}</td>
                                    <td>{item.giangVien.boMon?.tenBoMon}</td>
                                    <td>{item.soTiet}</td>
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

export default AdminPhanCong;