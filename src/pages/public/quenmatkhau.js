import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import {getMethod, postMethod, postMethodPayload} from '../../services/request';

async function forgorPassword(event) {
    event.preventDefault();
    var email = document.getElementById("email").value
    const res = await postMethod('/api/user/public/quen-mat-khau?email=' + email)
    if (res.status < 300) {
        Swal.fire({
            title: "Thông báo",
            text: "Kiểm tra email của bạn",
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

function quenMatKhau(){

    return(
        <div class="contentweb">
        <div class="container">
            <div class="dangnhapform">
                <div class="divctlogin">
                    <p class="labeldangnhap">Quên Mật Khẩu</p>
                    <form onSubmit={forgorPassword} autocomplete="off">
                        <label class="lbform">Email</label>
                        <input required name='username' id="email" class="inputlogin"/>
                        <button class="btndangnhap">XÁC NHẬN</button>
                        <button type="button"  onClick={()=>{window.location.href = 'login'}} class="btndangky">ĐĂNG NHẬP</button>
                    </form><br/><br/><br/>
                </div>
            </div>
        </div>
    </div>
    );
}
export default quenMatKhau;