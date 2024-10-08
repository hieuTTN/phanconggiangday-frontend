import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import Swal from 'sweetalert2'
import {getMethod, postMethod, postMethodPayload, uploadSingleFile} from '../../services/request';


async function capNhatInfor(event) {
    event.preventDefault();
    var payload = {
        "tenGV": event.target.elements.tenGV.value,
        "ngaySinh": event.target.elements.ngaySinh.value,
        "chuyenNganh": event.target.elements.chuyenNganh.value,
        "hocVi": event.target.elements.hocVi.value,
        "chucDanh": event.target.elements.chucDanh.value,
        "donViCongTac": event.target.elements.donViCongTac.value,
        "dienThoai": event.target.elements.dienThoai.value,
    }
    const response = await postMethodPayload('/api/giang-vien/teacher/cap-nhat-thong-tin', payload)
    if (response.status < 300) {
        Swal.fire({
            title: "Thông báo",
            text: "Cập nhật thành công!",
            preConfirm: () => {
                window.location.reload();
            }
        });
    } 
    else {
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
        else{
             toast.error("Thất bại");
        }
    }
}

function TeacherInfor(){
    const [teacher, setTeacher] = useState(null);
    useEffect(()=>{
        const getInfor = async() =>{
            var response = await getMethod("/api/giang-vien/teacher/thong-tin-cua-toi")
            var result = await response.json();
            setTeacher(result)
        };
        getInfor();
    }, []);

    return(
    <>
        <h3>Cập nhật thông tin cá nhân</h3>
        <form onSubmit={capNhatInfor} style={{margin:'auto'}} class="col-sm-8">
            <table class="table">
                <tr>
                    <th>Họ tên</th>
                    <td><br/><input defaultValue={teacher?.tenGV} name='tenGV' class="form-control"/></td>
                </tr>
                <tr>
                    <th>Ngày sinh</th>
                    <td><br/><input defaultValue={teacher?.ngaySinh} type='date' name="ngaySinh" class="form-control"/></td>
                </tr>
                <tr>
                    <th>Chuyên ngành</th>
                    <td><br/><input defaultValue={teacher?.chuyenNganh} name="chuyenNganh" class="form-control"/></td>
                </tr>
                <tr>
                    <th>Học vị</th>
                    <td><br/><input defaultValue={teacher?.hocVi} name="hocVi" class="form-control"/></td>
                </tr>
                <tr>
                    <th>Chức danh</th>
                    <td><br/><input defaultValue={teacher?.chucDanh} name="chucDanh" class="form-control"/></td>
                </tr>
                <tr>
                    <th>Đơn vị công tác</th>
                    <td><br/><input defaultValue={teacher?.donViCongTac} name="donViCongTac" class="form-control"/></td>
                </tr>
                <tr>
                    <th>Số điện thoại</th>
                    <td><br/><input defaultValue={teacher?.dienThoai} name="dienThoai" class="form-control"/></td>
                </tr>
                <tr>
                    <th>Mật khẩu</th>
                    <td><br/><a class="pointer" href="doimatkhau">Đổi mật khẩu</a></td>
                </tr>
            </table>
            <button class="btn btn-primary ">Cập nhật</button>
        </form>
    </>
    );
}
export default TeacherInfor;
