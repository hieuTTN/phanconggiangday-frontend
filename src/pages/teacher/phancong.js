import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import {getMethod,postMethodPayload, postMethodText} from '../../services/request';
import Select from 'react-select';


var token = localStorage.getItem("token");



var size = 10
var url = '';
const TeacherPhanCong = ()=>{
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [namHoc, setnamHoc] = useState([]);
    const [selectNamHoc, setSelectNamHoc] = useState([]);
    const [selectPhanCong, setSelectPhanCong] = useState(null);

    useEffect(()=>{
        const getPhanCong = async() =>{
            var response = await getMethod('/api/phan-cong-giang-vien/teacher/phan-cong-cua-toi?&size='+size+'&sort=id,desc&page='+0)
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
            url = '/api/phan-cong-giang-vien/teacher/phan-cong-cua-toi?&size='+size+'&sort=id,desc&page='
        };
        getPhanCong();
        const getSelect = async() =>{
            var response = await getMethod('/api/nam-hoc/all/find-all-list')
            var result = await response.json();
            setnamHoc(result)
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

    async function locPhanCong() {
        var response = await getMethod('/api/phan-cong-giang-vien/teacher/phan-cong-cua-toi?&size='+size+'&sort=id,desc&idNamHoc='+selectNamHoc.id+'&page='+0)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
        url = '/api/phan-cong-giang-vien/teacher/phan-cong-cua-toi?&size='+size+'&sort=id,desc&idNamHoc='+selectNamHoc.id+'&page='
    }

    async function reloadPage() {
        var response = await getMethod('/api/phan-cong-giang-vien/teacher/phan-cong-cua-toi?&size='+size+'&sort=id,desc&page='+0)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
        url = '/api/phan-cong-giang-vien/teacher/phan-cong-cua-toi?&size='+size+'&sort=id,desc&page='
    }

    async function hanlePhanHoi(event) {
        event.preventDefault();
        var phanHoi = event.target.elements.noiDung.value
        const res = await postMethodText('/api/phan-cong-giang-vien/teacher/phan-hoi?id='+selectPhanCong.id, phanHoi);
        if (res.status == 417) {
            var result = await res.json()
            toast.warning(result.defaultMessage);
        }
        if(res.status < 300){
            toast.success("Đã gửi phản hồi")
        }
    };

    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Kế Hoạch phân công</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <div className='d-flex divngayadmin'>   
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
                    </div>
                    <button onClick={locPhanCong} class="btn btn-primary ms-2">Lọc</button>
                    <button onClick={()=>reloadPage()} className='btn btn-primary selectheader'><i class="fa fa-refresh"></i></button>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách kế hoạch phân công</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Ngày tạo</th>
                                <th>Mã học phần</th>
                                <th>Tên học phần</th>
                                <th>Năm học</th>
                                <th>Số nhóm phụ trách</th>
                                <th>Gửi báo cáo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                return  <tr>
                                    <td>{item.ngayCapNhat}</td>
                                    <td>{item.keHoachChiTiet.hocPhan.maHP}</td>
                                    <td>{item.keHoachChiTiet.hocPhan.tenHP}</td>
                                    <td>{item.keHoachChiTiet.namHoc.hocKy}, {item.keHoachChiTiet.namHoc.tenNamHoc}</td>
                                    <td>{item.soNhom} {item.loaiNhom != "ALL"?" - "+item.loaiNhom:'TH + LT'}</td>
                                    <td class="sticky-col">
                                        <a onClick={()=>setSelectPhanCong(item)} data-bs-toggle="modal" data-bs-target="#addtk" class="edit-btn"><i className='fa fa-edit'></i></a>
                                        {item.phanHoi == null ?'':<button onClick={()=>setSelectPhanCong(item)} data-bs-toggle="modal" data-bs-target="#modelph" className='delete-btn'><i className='fa fa-eye'></i></button>}
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
                        <h5 class="modal-title" id="exampleModalLabel">Gửi báo cáo phân công</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                        <div class="modal-body row">
                            <form onSubmit={hanlePhanHoi} className='row'>
                                <div className='col-sm-12'>
                                    <label class="lb-form">Nội dung báo cáo</label>
                                    <textarea name='noiDung' rows={4} class="form-control"></textarea>
                                </div>
                                <div className='col-sm-4'></div>
                                <div className='col-sm-4'>
                                    <label class="lb-form" dangerouslySetInnerHTML={{__html:'&ThinSpace;'}}></label>
                                    <button className='btn btn-primary form-control'>Gửi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="modelph" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Gửi báo cáo phân công</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                        <div class="modal-body row">
                            <table className='table'>
                                <tr>
                                    <th>Ngày gửi</th>
                                    <th>Nội dung gửi</th>
                                    <th>Ngày phản hồi</th>
                                    <th>Nội dung phản hồi</th>
                                </tr>
                                <tr>
                                    <td>{selectPhanCong?.ngayPhanHoi}</td>
                                    <td>{selectPhanCong?.phanHoi}</td>
                                    <td>{selectPhanCong?.ngayTraLoiPhanHoi}</td>
                                    <td>{selectPhanCong?.traLoiPhanHoi}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeacherPhanCong;