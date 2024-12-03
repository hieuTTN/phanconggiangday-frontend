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
                <li className={isActive("/truongbomon/index")}>
                    <a href="index" class="text-white text-decoration-none">
                        <i class="fa fa-newspaper"></i> Thông báo
                    </a>
                </li>
                <li className={isActive(["/truongbomon/thong-tin-ca-nhan"])}>
                    <a href="thong-tin-ca-nhan" class="text-white text-decoration-none">
                        <i class="fa fa-user"></i> Thông tin cá nhân
                    </a>
                </li>
                <li className={isActive(["/truongbomon/kehoach"])}>
                    <a href="kehoach" class="text-white text-decoration-none">
                        <i class="fa fa-book"></i> Kế hoạch
                    </a>
                </li>
                <li className={isActive(["/truongbomon/giang-day"])}>
                    <a href="giang-day" class="text-white text-decoration-none">
                        <i class="fa fa-book"></i> Giảng dạy
                    </a>
                </li>
                <li className={isActive(["/truongbomon/phan-cong"])}>
                    <a href="phan-cong" class="text-white text-decoration-none">
                        <i class="fa fa-calendar"></i> Phân công giảng viên
                    </a>
                </li>
                <li className={isActive(["/truongbomon/phan-cong-giang-day"])}>
                    <a href="phan-cong-giang-day" class="text-white text-decoration-none">
                        <i class="fa fa-calendar"></i> Phân công giảng dạy
                    </a>
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
                            <li><a class="dropdown-item" href="taikhoan">Cập nhật thông tin</a></li>
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


function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace('../login')
}

export default Header;