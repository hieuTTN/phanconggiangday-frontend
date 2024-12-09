import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import Select from 'react-select';
import {getMethod,postMethodPayload, postMethod, uploadSingleFile} from '../../services/request';

var avatar = "";
async function handleAddAccount(event) {
    event.preventDefault();
    document.getElementById("loading").style.display = 'block'
    var imgtam = await uploadSingleFile(document.getElementById("avatar"));
    if(imgtam != null){
        avatar = imgtam
    }
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    const payload = {
        fullName: event.target.elements.fullName.value,
        email: event.target.elements.email.value,
        avatar: avatar,
        authorities: {
            name: event.target.elements.role.value
        },
    };
    console.log(payload);
    
    const res = await postMethodPayload('/api/user/admin/update-account?id='+id,payload)
    var result = await res.json()
    console.log(result);
    if (res.status == 417) {
        toast.error(result.defaultMessage);
    }
    if(res.status < 300){
        Swal.fire({
            title: "Thông báo",
            text: "Cập nhật tài khoản thành công!",
            preConfirm: () => {
                window.location.href = 'user'
            }
        });
    }
};

const AdminEditUser = ()=>{
    const [user, setUser] = useState([]);
    const [authorities, setAuthorities] = useState([]);
    const [idautho, setIdAutho] = useState(null);
    const [contentPage, setContentPage] = useState("Cập nhật tài khoản");
    useEffect(()=>{
        const getAuthority = async() =>{
            var response = await getMethod('/api/authority/admin/all')
            var result = await response.json();
            setAuthorities(result)
        };
        getAuthority();

        const getUser= async() =>{
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            var response = await getMethod('/api/user/admin/find-by-id?id=' + id);
            var result = await response.json();
            setUser(result)
            setIdAutho(result.authorities.name)
            avatar = result.avatar
        };
        getUser();
    }, []);


    
    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> {contentPage}</strong>
            </div>
            <form class="modal-body row" onSubmit={handleAddAccount}>
                <div class="col-sm-5">
                    <label class="lb-form">Họ tên</label>
                    <input defaultValue={user?.fullName} name="fullName" class="form-control"/>
                    <label class="lb-form">Email</label>
                    <input defaultValue={user?.email} required name="email" class="form-control"/>
                    <label class="lb-form">Quyền</label>
                    <select name='role' class="form-control">
                        {authorities.map((item=>{
                            return <option selected={item.name == idautho} value={item.name}>{item.description}</option>
                        }))}
                    </select>
                    <label class="lb-form">Avatar</label>
                    <input id="avatar" type="file" class="form-control"/>
                    <img src={user?.avatar} id="imgpreview" class="imgpreview"/>
                    <br/>
                    <div id="loading">
                        <div class="bar1 bar"></div>
                    </div><br/>
                    <button class="form-control btn btn-primary">Cập nhật tài khoản</button>
                </div>
            </form>
        </>
    );
}

export default AdminEditUser;