import layoutAdmin from '../layout/admin/Layout'
import layoutTeacher from '../layout/teacher/Layout'
import layoutLogin from '../layout/public/login'

//admin
import homeAdmin from '../pages/admin/index'
import userAdmin from '../pages/admin/user'
import addUserAdmin from '../pages/admin/adduser'
import AdminKhoaHoc from '../pages/admin/khoahoc'
import AdminNamHoc from '../pages/admin/namhoc'


//public
import login from '../pages/public/login'

//teacher
import taikhoan from '../pages/teacher/taikhoan'
import DoiMatKhau from '../pages/teacher/doimatkhau'



const publicRoutes = [
    { path: "/", component: login, layout: layoutLogin },
    { path: "/login", component: login, layout: layoutLogin },
];

const teacherRoutes = [
    { path: "/teacher/doimatkhau", component: DoiMatKhau, layout:layoutTeacher },
    { path: "/teacher/taikhoan", component: taikhoan, layout:layoutTeacher },
];


const adminRoutes = [
    { path: "/admin/index", component: homeAdmin, layout: layoutAdmin },
    { path: "/admin/user", component: userAdmin, layout: layoutAdmin },
    { path: "/admin/add-user", component: addUserAdmin, layout: layoutAdmin },
    { path: "/admin/khoa-hoc", component: AdminKhoaHoc, layout: layoutAdmin },
    { path: "/admin/nam-hoc", component: AdminNamHoc, layout: layoutAdmin },
];



export { publicRoutes, adminRoutes, teacherRoutes};
