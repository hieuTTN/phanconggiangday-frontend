import layoutAdmin from '../layout/admin/Layout'
import layoutTeacher from '../layout/teacher/Layout'
import layoutLogin from '../layout/public/login'
import layoutTruongBoMon from '../layout/headdepartment/Layout'

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
import AdminKeHoachHoc from '../pages/admin/kehoachhoc'
import AdminAddBaiViet from '../pages/admin/addbaiviet'
import AdminChiTietTinTuc from '../pages/admin/chitiettintuc'
import AdminChiTietHoc from '../pages/admin/chitiethoc'
import AdminLopHoc from '../pages/admin/lophoc'
import AdminKeHoachChiTiet from '../pages/admin/kehoachchitiet'


//public
import login from '../pages/public/login'

//teacher
import taikhoan from '../pages/teacher/taikhoan'
import DoiMatKhau from '../pages/teacher/doimatkhau'
import TeacherInfor from '../pages/teacher/taikhoan'
import TeacherPhanCong from '../pages/teacher/phancong'
import TeacherGiangDay from '../pages/teacher/giangday'
import HomeTeacher from '../pages/teacher/index'
import TeacherChiTietTinTuc from '../pages/teacher/chitiettintuc'

//trưởng bộ môn
import TruongBoMonKeHoach from '../pages/headdepartment/kehoach'
import TeacherInforTBM from '../pages/headdepartment/taikhoan'
import DoiMatKhauTBM from '../pages/headdepartment/doimatkhau'
import TBMChiTietTinTuc from '../pages/headdepartment/chitiettintuc'
import HomeTBM from '../pages/headdepartment/index'



const publicRoutes = [
    { path: "/", component: login, layout: layoutLogin },
    { path: "/login", component: login, layout: layoutLogin },
];

const teacherRoutes = [
    { path: "/teacher/doimatkhau", component: DoiMatKhau, layout:layoutTeacher },
    { path: "/teacher/taikhoan", component: TeacherInfor, layout:layoutTeacher },
    { path: "/teacher/phancong", component: TeacherPhanCong, layout:layoutTeacher },
    { path: "/teacher/giang-day", component: TeacherGiangDay, layout:layoutTeacher },
    { path: "/teacher/index", component: HomeTeacher, layout:layoutTeacher },
    { path: "/teacher/chi-tiet-tin-tuc", component: TeacherChiTietTinTuc, layout:layoutTeacher },
];


const truongBoMonRoutes = [
    { path: "/truongbomon/kehoach", component: TruongBoMonKeHoach, layout:layoutTruongBoMon },
    { path: "/truongbomon/thong-tin-ca-nhan", component: TeacherInforTBM, layout:layoutTruongBoMon },
    { path: "/truongbomon/doimatkhau", component: DoiMatKhauTBM, layout:layoutTruongBoMon },
    { path: "/truongbomon/index", component: HomeTBM, layout:layoutTruongBoMon },
    { path: "/truongbomon/chi-tiet-tin-tuc", component: TBMChiTietTinTuc, layout:layoutTruongBoMon },
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
    { path: "/admin/ke-hoach-hoc", component: AdminKeHoachHoc, layout: layoutAdmin },
    { path: "/admin/add-bai-viet", component: AdminAddBaiViet, layout: layoutAdmin },
    { path: "/admin/chi-tiet-tin-tuc", component: AdminChiTietTinTuc, layout: layoutAdmin },
    { path: "/admin/chi-tiet-hoc", component: AdminChiTietHoc, layout: layoutAdmin },
    { path: "/admin/lop-hoc", component: AdminLopHoc, layout: layoutAdmin },
    { path: "/admin/chi-tiet-ke-hoach", component: AdminKeHoachChiTiet, layout: layoutAdmin },
];



export { publicRoutes, adminRoutes, teacherRoutes, truongBoMonRoutes};
