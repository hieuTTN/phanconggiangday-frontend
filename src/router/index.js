import layoutAdmin from '../layout/admin/Layout'
import layoutTeacher from '../layout/teacher/Layout'
import layoutLogin from '../layout/public/login'

//admin
import homeAdmin from '../pages/admin/index'
import userAdmin from '../pages/admin/user'
import addUserAdmin from '../pages/admin/adduser'
import AdminKhoaHoc from '../pages/admin/khoahoc'
import AdminNamHoc from '../pages/admin/namhoc'
import AdminHocPhan from '../pages/admin/hocphan'
import AdminAddHocPhan from '../pages/admin/addhocphan'
import AdminGiangVien from '../pages/admin/giangvien'
import AdminAddGiangVien from '../pages/admin/addgiangvien'
import AdminKeHoach from '../pages/admin/kehoach'
import AdminAddKeHoach from '../pages/admin/addkehoach'
import AdminChuyenNganh from '../pages/admin/chuyennganh'


//public
import login from '../pages/public/login'

//teacher
import taikhoan from '../pages/teacher/taikhoan'
import DoiMatKhau from '../pages/teacher/doimatkhau'
import TeacherInfor from '../pages/teacher/taikhoan'
import TeacherPhanCong from '../pages/teacher/phancong'
import TeacherGiangDay from '../pages/teacher/giangday'



const publicRoutes = [
    { path: "/", component: login, layout: layoutLogin },
    { path: "/login", component: login, layout: layoutLogin },
];

const teacherRoutes = [
    { path: "/teacher/doimatkhau", component: DoiMatKhau, layout:layoutTeacher },
    { path: "/teacher/taikhoan", component: TeacherInfor, layout:layoutTeacher },
    { path: "/teacher/phancong", component: TeacherPhanCong, layout:layoutTeacher },
    { path: "/teacher/giang-day", component: TeacherGiangDay, layout:layoutTeacher },
];


const adminRoutes = [
    { path: "/admin/index", component: homeAdmin, layout: layoutAdmin },
    { path: "/admin/user", component: userAdmin, layout: layoutAdmin },
    { path: "/admin/add-user", component: addUserAdmin, layout: layoutAdmin },
    { path: "/admin/khoa-hoc", component: AdminKhoaHoc, layout: layoutAdmin },
    { path: "/admin/nam-hoc", component: AdminNamHoc, layout: layoutAdmin },
    { path: "/admin/hoc-phan", component: AdminHocPhan, layout: layoutAdmin },
    { path: "/admin/add-hoc-phan", component: AdminAddHocPhan, layout: layoutAdmin },
    { path: "/admin/giang-vien", component: AdminGiangVien, layout: layoutAdmin },
    { path: "/admin/add-giang-vien", component: AdminAddGiangVien, layout: layoutAdmin },
    { path: "/admin/ke-hoach", component: AdminKeHoach, layout: layoutAdmin },
    { path: "/admin/add-ke-hoach", component: AdminAddKeHoach, layout: layoutAdmin },
    { path: "/admin/chuyen-nganh", component: AdminChuyenNganh, layout: layoutAdmin },
];



export { publicRoutes, adminRoutes, teacherRoutes};
