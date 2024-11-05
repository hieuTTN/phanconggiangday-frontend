import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import {getMethod,postMethodPayload, deleteMethod} from '../../services/request';
import Select from 'react-select';



const AdminAddKeHoach = ()=>{
    const [khoahoc, setKhoaHoc] = useState([]);
    const [namHoc, setnamHoc] = useState([]);
    const [hocKy, setHocKy] = useState([]);

    useEffect(()=>{
        const getSelect = async() =>{
            var response = await getMethod('/api/khoa-hoc/all/khoa-hoc-chua-ket-thuc')
            var result = await response.json();
            setKhoaHoc(result)
            var response = await getMethod('/api/nam-hoc/all/find-all-list')
            var result = await response.json();
            setnamHoc(result)
            var response = await getMethod('/api/hocky/all/find-all')
            var result = await response.json();
            setHocKy(result)
        };
        getSelect();
    }, []);


    async function saveKeHoach(event) {
        event.preventDefault();
        var payload = {
            "namHocId": event.target.elements.namHoc.value,
            "khoaHocId": event.target.elements.khoaHoc.value,
            "hocKyId": event.target.elements.hocKy.value,
        }
        
        const response = await postMethodPayload('/api/ke-hoach-mo-mon/admin/add', payload)
        if (response.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Thêm/cập nhật thành công!",
                preConfirm: () => {
                    window.location.href = 'ke-hoach'
                }
            });
        } 
        else {
            if (response.status == 417) {
                var result = await response.json()
                toast.warning(result.defaultMessage);
            }
            else{
                 toast.error("Thêm/ sửa kế hoạch thất bại");
            }
        }
    }
    
    
    return (
        <>
            <div class="col-sm-12 header-sps">
                <div class="title-add-admin">
                    <h4>Thêm/ cập nhật kế hoạch</h4>
                </div>
            </div>
            <div class="col-sm-12">
                    <div class="form-add">
                        <form onSubmit={saveKeHoach} class="row" method='post'>
                            <div class="col-md-4 col-sm-12 col-12">
                                <label class="lb-form">Khóa học</label>
                                <Select
                                    className="select-container" 
                                    options={khoahoc}
                                    getOptionLabel={(option) => option.tenKhoaHoc} 
                                    getOptionValue={(option) => option.id}    
                                    closeMenuOnSelect={false}
                                    name='khoaHoc'
                                    placeholder="Chọn khóa học"
                                />
                                <label class="lb-form">Năm học</label>
                                <Select
                                    className="select-container" 
                                    options={namHoc}
                                    getOptionLabel={(option) => option.tenNamHoc + " - "+option.hocKy} 
                                    getOptionValue={(option) => option.id}    
                                    closeMenuOnSelect={false}
                                    name='namHoc'
                                    placeholder="Chọn năm học"
                                />
                                <label class="lb-form">Học kỳ</label>
                                <Select
                                    className="select-container" 
                                    options={hocKy}
                                    getOptionLabel={(option) => option.tenHocKy} 
                                    getOptionValue={(option) => option.id}    
                                    closeMenuOnSelect={false}
                                    name='hocKy'
                                    placeholder="Chọn học kỳ"
                                />

                            <br/><button class="btn btn-primary form-control">Thêm/ cập nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );
}

export default AdminAddKeHoach;