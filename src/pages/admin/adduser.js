import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import Select from 'react-select';
import {getMethod,postMethodPayload, postMethod, uploadSingleFile} from '../../services/request';


async function handleAddAccount(event) {
    event.preventDefault();
    document.getElementById("loading").style.display = 'block'
    var avatar = await uploadSingleFile(document.getElementById("avatar"));
    const payload = {
        fullName: event.target.elements.fullName.value,
        email: event.target.elements.email.value,
        password: event.target.elements.password.value,
        avatar: avatar,
        authorities: {
            name: event.target.elements.role.value
        },
    };
    console.log(payload);
    
    const res = await postMethodPayload('/api/user/admin/addaccount',payload)
    var result = await res.json()
    console.log(result);
    if (res.status == 417) {
        toast.error(result.defaultMessage);
        document.getElementById("loading").style.display = 'none'
    }
    if(res.status < 300){
        Swal.fire({
            title: "Thông báo",
            text: "Tạo tài khoản thành công!",
            preConfirm: () => {
                window.location.href = 'user'
            }
        });
    }
};

const AdminAddUser = ()=>{
    const [items, setItems] = useState([]);
    const [authorities, setAuthorities] = useState([]);
    const [contentPage, setContentPage] = useState("Thêm tài khoản");
    useEffect(()=>{
        const getAuthority = async() =>{
            var response = await getMethod('/api/authority/admin/all')
            var result = await response.json();
            setAuthorities(result)
        };
        getAuthority();
    }, []);


    
    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> {contentPage}</strong>
            </div>
            <form class="modal-body row" onSubmit={handleAddAccount}>
                <div class="col-sm-5">
                    <label class="lb-form">Họ tên</label>
                    <input name="fullName" class="form-control"/>
                    <label class="lb-form">Email</label>
                    <input required name="email" class="form-control"/>
                    <br/>
                    <div id="loading">
                        <div class="bar1 bar"></div>
                    </div><br/>
                    <button class="form-control btn btn-primary">Thêm/ cập nhật tài khoản</button>
                </div>
                <div class="col-sm-5">
                    <label class="lb-form">Mật khẩu</label>
                    <input required name="password" class="form-control"/>
                    <label class="lb-form">Quyền</label>
                    <select name='role' class="form-control">
                        {authorities.map((item=>{
                            return <option value={item.name}>{item.description}</option>
                        }))}
                    </select>
                    <label class="lb-form">Avatar</label>
                    <input id="avatar" type="file" class="form-control"/>
                    <img id="imgpreview" class="imgpreview"/>
                </div>
            </form>
        </>
    );
}

export default AdminAddUser;