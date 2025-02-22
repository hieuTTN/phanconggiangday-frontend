import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import {getMethod,postMethodPayload, deleteMethod, postMethod} from '../../services/request';
import Select from 'react-select';



async function handleAddGiangDay(event) {
    event.preventDefault();
    
    const payload = {
        loaiNhom:event.target.elements.loaiNhom.value,
        hocPhan: {
            id:event.target.elements.hocphan.value
        },
    };
    const res = await postMethodPayload('/api/giang-vien-hoc-phan/teacher/add', payload);
    if (res.status == 417) {
        var result = await res.json()
        toast.warning(result.defaultMessage);
    }
    if(res.status < 300){
        Swal.fire({
            title: "Thông báo",
            text: "Thêm thành công!",
            preConfirm: () => {
                window.location.reload();
            }
        });
    }
};

var size = 10
var url = '';
const TeacherGiangDay = ()=>{
    const [items, setItems] = useState([]);
    const [monHoc, setMonHoc] = useState([]);
    const [teacher, setTeacher] = useState(null);
    const [pageCount, setpageCount] = useState(0);
    useEffect(()=>{
        const getGiangDay = async() =>{
            var response = await getMethod('/api/giang-vien-hoc-phan/teacher/hoc-phan-cua-toi?&size='+size+'&page='+0)
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
            url = '/api/giang-vien-hoc-phan/teacher/hoc-phan-cua-toi?&size='+size+'&page='
        };
        getGiangDay();
        const getSelect = async() =>{
            var response = await getMethod('/api/hoc-phan/teacher/find-by-giang-vien-bo-mon')
            var result = await response.json();
            setMonHoc(result)
        };
        getSelect();
        const getInfor = async() =>{
            var response = await getMethod("/api/giang-vien/teacher/thong-tin-cua-toi")
            var result = await response.json();
            setTeacher(result)
        };
        getInfor();
    }, []);

    const handlePageClick = async (data)=>{
        var currentPage = data.selected
        var response = await getMethod(url+currentPage)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
    }

    async function deleteGiangDay(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa học phần giảng dạy này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/giang-vien-hoc-phan/teacher/delete?id='+id)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            var response = await getMethod('/api/giang-vien-hoc-phan/teacher/hoc-phan-cua-toi?&size='+size+'&page='+0)
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
            url = '/api/giang-vien-hoc-phan/teacher/hoc-phan-cua-toi?&size='+size+'&page='
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

    async function updateLoaiNhom(id, loai){
        var response = await postMethod('/api/giang-vien-hoc-phan/teacher/update-loainhom?id='+id+'&loaiNhom='+loai)
        if (response.status < 300) {
            toast.success("Cập nhật hành công!");
        }
        else {
            toast.error("Thất bại");
        }
    }


    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Học Phần giảng dạy {teacher?.boMon?.tenBoMon}</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <button  data-bs-toggle="modal" data-bs-target="#addtk" className='btn btn-primary selectheader'><i class="fa fa-plus"></i></button>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách học phần giảng dạy </span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Mã học phần</th>
                                <th>Tên học phần</th>
                                <th>Số tín chỉ</th>
                                <th>Tín lý thuyết</th>
                                <th>Tín thực hành</th>
                                <th>Loại nhóm dạy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                var loai = item.loaiNhom;
                                if(loai == "ALL") loai = "LT + TH"
                                return  <tr>
                                    <td>{item.hocPhan.maHP}</td>
                                    <td>{item.hocPhan.tenHP}</td>
                                    <td>{item.hocPhan.soTinChi}</td>
                                    <td>{item.hocPhan.soTietLyThuyet}</td>
                                    <td>{item.hocPhan.soTietThucHanh}</td>
                                    <td>
                                        <select onChange={(event)=>updateLoaiNhom(item.id, event.target.value)} className='form-control'>
                                            <option selected={item.loaiNhom == 'ALL'} value='ALL'>Lý thuyết + Thực hành</option>
                                            <option selected={item.loaiNhom == 'LT'} value='LT'>Lý thuyết</option>
                                            <option selected={item.loaiNhom == 'TH'} value='TH'>Thực hành</option>
                                        </select>
                                    </td>
                                    <td class="sticky-col">
                                        <button onClick={()=>deleteGiangDay(item.id)} class="delete-btn"><i className='fa fa-trash'></i></button>
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
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Thêm môn học giảng dạy {teacher?.boMon?.tenBoMon}</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                        <div class="modal-body row">
                            <form method='post' onSubmit={handleAddGiangDay} className='row'>
                                <div className='col-sm-12'>
                                    <label class="lb-form">Chọn học phần giảng dạy</label>
                                    <Select
                                        className="select-container selectheader" 
                                        options={monHoc}
                                        getOptionLabel={(option) => option.maHP + " - "+option.tenHP} 
                                        getOptionValue={(option) => option.id}    
                                        closeMenuOnSelect={false}
                                        name='hocphan'
                                        placeholder="Chọn học phần"
                                    />
                                </div>
                                <div className='col-sm-12'>
                                    <label class="lb-form">Loại</label>
                                    <select name='loaiNhom' className='form-control'>
                                        <option value='ALL'>Lý thuyết + Thực hành</option>
                                        <option value='LT'>Lý thuyết</option>
                                        <option value='TH'>Thực hành</option>
                                    </select>
                                </div>
                                <div className='col-sm-4'></div>
                                <div className='col-sm-4'>
                                    <label class="lb-form" dangerouslySetInnerHTML={{__html:'&ThinSpace;'}}></label>
                                    <button className='btn btn-primary form-control'>Thêm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeacherGiangDay;