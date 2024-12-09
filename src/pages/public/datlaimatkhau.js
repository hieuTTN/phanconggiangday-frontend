import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import {getMethod, postMethod, postMethodPayload} from '../../services/request';

async function forgorPassword(event) {
    event.preventDefault();
    var password = event.target.elements.password.value
    var repassword = event.target.elements.repassword.value
    var uls = new URL(document.URL)
    var email = uls.searchParams.get("email");
    var key = uls.searchParams.get("key");
    if(password != repassword){
        toast.warning("Password not match");
        return;
    }
    const res = await postMethod('/api/user/public/dat-lai-mat-khau?email=' + email+"&key="+key+"&password="+password)
    if (res.status < 300) {
        Swal.fire({
            title: "Thông báo",
            text: "Đặt lại mật khẩu thành công",
            preConfirm: () => {
                window.location.replace("login")
            }
        });
    }
    if (res.status == 417) {
        var result = await res.json()
        toast.warning(result.defaultMessage);
    }
}

function datlaimatkhau(){

    return(
        <div class="contentweb">
        <div class="container">
            <div class="dangnhapform">
                <div class="divctlogin">
                    <p class="labeldangnhap">Đặt Lại Mật Khẩu</p>
                    <form onSubmit={forgorPassword} autocomplete="off">
                        <label class="lbform">Nhập mật khẩu mới</label>
                        <input type='password' name='password' class="inputlogin"/>
                        <label class="lbform">Xác nhận mật khẩu mới</label>
                        <input type='password' name='repassword' class="inputlogin"/>
                        <button class="btndangnhap">XÁC NHẬN</button>
                        <button type="button"  onClick={()=>{window.location.href = 'login'}} class="btndangky">ĐĂNG NHẬP</button>
                    </form><br/><br/><br/>
                </div>
            </div>
        </div>
    </div>
    );
}
export default datlaimatkhau;