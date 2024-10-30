import lich from '../../assest/images/lich.png'
import logo from '../../assest/images/logo.png'
import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
function Header({ children }){
     // Ensure useLocation is called at the top level of the component
     const location = useLocation();

     // Function to check if the current path matches the given pathname
     const isActive = (pathname) => {
         for(var i=0; i<pathname.length; i++){
            if(location.pathname === pathname[i]){
                return 'activenavbar';
            }
         }
         return '';
     };
     
    const [isCssLoaded, setCssLoaded] = useState(false);
    useEffect(()=>{
        import('../admin/layout.scss').then(() => setCssLoaded(true));
    }, []);
    if (!isCssLoaded) {
        return <></>
    }

    var user = window.localStorage.getItem("user")
    if(user != null){
        user = JSON.parse(user);
    }

    function openClose(){
        document.getElementById("sidebar").classList.toggle("toggled");
        document.getElementById("page-content-wrapper").classList.toggle("toggled");
        document.getElementById("navbarmain").classList.toggle("navbarmainrom");
    }

    return(
        <div class="d-flex" id="wrapper">
        <nav id="sidebar" class="bg-dark">
            <div class="sidebar-header p-3 text-white">
            <i class="fa fa-bars pointer" id="iconbaradmin" onClick={openClose}></i>
            <img src={logo} className='imglogonavbar'/>
            </div>
            <ul class="list-unstyled components">
                <li className={isActive(["/admin/user"])}>
                    <a href="#coltaikhoan" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle text-white text-decoration-none">
                        <i class="fa fa-user"></i> Tài khoản
                    </a>
                    <ul class="collapse list-unstyleds" id="coltaikhoan">
                        <li class="nav-item">
                            <a href="user" class="text-white text-decoration-none ps-4"><i class="fa fa-list"></i> Danh sách tài khoản</a>
                        </li>
                        <li class="nav-item">
                            <a href="add-user" class="text-white text-decoration-none ps-4"><i class="fa fa-plus"></i> Thêm tài khoản</a>
                        </li>
                    </ul>
                </li>
                <li className={isActive(["/admin/add-hoc-phan", "/admin/hoc-phan"])}>
                    <a href="#colhocphan" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle text-white text-decoration-none">
                        <i class="fa fa-book"></i> Học phần
                    </a>
                    <ul class="collapse list-unstyleds" id="colhocphan">
                        <li class="nav-item">
                            <a href="hoc-phan" class="text-white text-decoration-none ps-4"><i class="fa fa-list"></i> Danh sách học phần</a>
                        </li>
                        <li class="nav-item">
                            <a href="add-hoc-phan" class="text-white text-decoration-none ps-4"><i class="fa fa-plus"></i> Thêm học phần</a>
                        </li>
                    </ul>
                </li>
                <li className={isActive(["/admin/giang-vien", "/admin/add-giang-vien"])}>
                    <a href="#colgiangvien" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle text-white text-decoration-none">
                        <i class="fa fa-user"></i> Giảng viên
                    </a>
                    <ul class="collapse list-unstyleds" id="colgiangvien">
                        <li class="nav-item">
                            <a href="giang-vien" class="text-white text-decoration-none ps-4"><i class="fa fa-list"></i> Danh sách giảng viên</a>
                        </li>
                        <li class="nav-item">
                            <a href="add-giang-vien" class="text-white text-decoration-none ps-4"><i class="fa fa-plus"></i> Thêm giảng viên</a>
                        </li>
                    </ul>
                </li>
                <li className={isActive(["/admin/ke-hoach", "/admin/add-ke-hoach"])}>
                    <a href="#colkehoach" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle text-white text-decoration-none">
                        <i class="fa fa-calendar-check"></i> Kế hoạch mở môn
                    </a>
                    <ul class="collapse list-unstyleds" id="colkehoach">
                        <li class="nav-item">
                            <a href="ke-hoach" class="text-white text-decoration-none ps-4"><i class="fa fa-list"></i> Danh sách kế hoạch</a>
                        </li>
                        <li class="nav-item">
                            <a href="add-ke-hoach" class="text-white text-decoration-none ps-4"><i class="fa fa-plus"></i> Thêm kế hoạch</a>
                        </li>
                    </ul>
                </li>
                <li className={isActive(["/admin/khoa-hoc"])}>
                    <a href="khoa-hoc" class="text-white text-decoration-none">
                        <i class="fa fa-graduation-cap"></i> Khóa học
                    </a>
                </li>
                <li className={isActive(["/admin/nam-hoc"])}>
                    <a href="nam-hoc" class="text-white text-decoration-none">
                        <i class="fa fa-calendar"></i> Năm học
                    </a>
                </li>
                <li className={isActive(["/admin/ke-hoach-hoc"])}>
                    <a href="ke-hoach-hoc" class="text-white text-decoration-none">
                        <i class="fa fa-calendar"></i> Kế hoạch học
                    </a>
                </li>
                <li className={isActive(["/admin/index", "/admin/add-bai-viet"])}>
                    <a href="#colbaiviet" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle text-white text-decoration-none">
                        <i class="fa fa-newspaper"></i> Bài viết
                    </a>
                    <ul class="collapse list-unstyleds" id="colbaiviet">
                        <li class="nav-item">
                            <a href="index" class="text-white text-decoration-none ps-4"><i class="fa fa-list"></i> Danh sách bài viết</a>
                        </li>
                        <li class="nav-item">
                            <a href="add-bai-viet" class="text-white text-decoration-none ps-4"><i class="fa fa-plus"></i> Thêm bài viết</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#" onClick={logout} class="text-white text-decoration-none">
                        <i class="fa fa-sign-out"></i> Đăng xuất
                    </a>
                </li>
            </ul>
        </nav>

        <div id="page-content-wrapper" class="w-100">
            <nav id='navbarmain' class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <div class="container-fluid">
                    <button class="btn btn-link" id="menu-toggle"><i class="fas fa-bars" onClick={openClose}></i></button>
                    <div class="dropdown ms-auto">
                        <a class="nav-link dropdown-toggle position-relative" href="#" role="button" id="notificationDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-bell"></i>
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                4
                            </span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="notificationDropdown">
                            <li><a class="dropdown-item" href="#">New comment on your post</a></li>
                            <li><a class="dropdown-item" href="#">New user registered</a></li>
                            <li><a class="dropdown-item" href="#">System update available</a></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><a class="dropdown-item" href="#">View all notifications</a></li>
                        </ul>
                    </div>
            
                    <div class="dropdown ms-3">
                        <a class="dropdown-toggle d-flex align-items-center text-decoration-none" href="#" role="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="navbar-text me-2">Xin chào: {user?.fullName}</span>
                            {/* <img src={user?.avatar} class="rounded-circle" alt="User Avatar"/> */}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="#">Cập nhật thông tin</a></li>
                            <li onClick={logout}><a class="dropdown-item" href="#">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="container-fluid py-4" id='mainpageadmin'>
                {children}
            </div>
        </div>
    </div>
    );
}

async function checkAdmin(){
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/admin/check-role-admin';
    const response = await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status > 300) {
        window.location.replace('../login')
    }
}


function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace('../login')
}

export default Header;