import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import {getMethod,postMethodPayload, deleteMethod} from '../../services/request';


async function saveHocPhan(event) {
    event.preventDefault();
    var uls = new URL(document.URL)
    var mahp = uls.searchParams.get("mahp");
    var payload = {
        "maHP": event.target.elements.maHP.value,
        "tenHP": event.target.elements.tenHP.value,
        "soTinChi": event.target.elements.soTinChi.value,
        "soTietLyThuyet": event.target.elements.soTietLyThuyet.value,
        "soTietThucHanh": event.target.elements.soTietThucHanh.value,
        "tongSoTiet": event.target.elements.tongSoTiet.value,
        "heSo": event.target.elements.heSo.value,
    }
    var url = '/api/hoc-phan/admin/add'
    if(mahp != null){
        url = '/api/hoc-phan/admin/update'
    }
    const response = await postMethodPayload(url, payload)
    if (response.status < 300) {
        Swal.fire({
            title: "Thông báo",
            text: "Thêm/cập nhật thành công!",
            preConfirm: () => {
                window.location.href = 'hoc-phan'
            }
        });
    } 
    else {
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
        else{
             toast.error("Thêm/ sửa học phần thất bại");
        }
    }
}

const AdminAddHocPhan = ()=>{
    const [hocphan, setHocPhan] = useState(null);

    useEffect(()=>{
        const getHocPhan = async() =>{
            var uls = new URL(document.URL)
            var mahp = uls.searchParams.get("mahp");
            if(mahp != null){
                var response = await getMethod('/api/hoc-phan/all/find-by-mahp?maHp='+mahp)
                var result = await response.json();
                setHocPhan(result)
            }
        };
        getHocPhan();
    }, []);

    
    return (
        <>
            <div class="col-sm-12 header-sps">
                <div class="title-add-admin">
                    <h4>Thêm/ cập nhật học phần</h4>
                </div>
            </div>
            <div class="col-sm-12">
                    <div class="form-add">
                        <form onSubmit={saveHocPhan} class="row" method='post'>
                            <div class="col-md-4 col-sm-12 col-12">
                                <label class="lb-form">Mã học phần</label>
                                <input defaultValue={hocphan?.maHP} name="maHP" type="text" class="form-control"/>
                                <label class="lb-form">Tên học phần</label>
                                <input defaultValue={hocphan?.tenHP} name="tenHP" type="text" class="form-control"/>
                                <label class="lb-form">Số tín chỉ</label>
                                <input defaultValue={hocphan?.soTinChi} name="soTinChi" type="text" class="form-control"/>
                            </div>
                            <div className='col-md-4'>
                                <label class="lb-form">Số tiết lý thuyết</label>
                                <input defaultValue={hocphan?.soTietLyThuyet} name="soTietLyThuyet" type="text" class="form-control"/>
                                <label class="lb-form">Số tiết thực hành</label>
                                <input defaultValue={hocphan?.soTietThucHanh} name="soTietThucHanh" type="text" class="form-control"/>
                                <label class="lb-form">Tổng số tiết</label>
                                <input defaultValue={hocphan?.tongSoTiet} name="tongSoTiet" type="text" class="form-control"/>
                                <label class="lb-form">Hệ số</label>
                                <input defaultValue={hocphan?.heSo} name="heSo" type="text" class="form-control"/>

                                <br/><br/><button class="btn btn-primary form-control">Thêm/ cập nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );
}

export default AdminAddHocPhan;