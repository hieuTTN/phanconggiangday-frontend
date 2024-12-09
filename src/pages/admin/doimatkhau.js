import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import {getMethod, postMethod, postMethodPayload} from '../../services/request';
import Swal from 'sweetalert2'

async function handleChangePass(event) {
    event.preventDefault();
    if(event.target.elements.newpass.value != event.target.elements.renewpass.value){
        toast.error("Mật khẩu xác nhận không trùng khớp"); return;
    }
    const payload = {
        oldPass: event.target.elements.oldpass.value,
        newPass: event.target.elements.newpass.value
    };
    const res = await postMethodPayload('/api/user/user/change-password', payload);
    if (res.status == 417) {
        var result = await res.json()
        toast.warning(result.defaultMessage);
    }
    if(res.status < 300){
        toast.success("Đã đổi mật khẩu thành công! Hãy đăng nhập lại")
    }
};

function DoiMatKhau(){
    useEffect(()=>{
    }, []);
  
    return(
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Cập Nhật Mật Khẩu</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <a href='taikhoan' class="btn btn-primary ms-2"><i className='fa fa-user'></i></a>
                </div>
            </div>
            <br/><br/>
            <div class="col-lg-6 col-md-8 col-sm-12 col-12 passacc">
                <form onSubmit={handleChangePass} autocomplete="off">
                    <label class="lb-form">Mật khẩu hiện tại *</label>
                    <input name="oldpass" type="password" class="form-control" required/>
                    <label class="lb-form">Mật khẩu mới *</label>
                    <input name="newpass" type="password" class="form-control" required/>
                    <label class="lb-form">Xác nhận mật khẩu mới *</label>
                    <input name="renewpass" type="password" class="form-control" required/>
                    <br/>
                    <button type="submit" class="btn btn-primary form-control">LƯU</button>
                </form>
            </div>
        </>
    );
}

export default DoiMatKhau;
