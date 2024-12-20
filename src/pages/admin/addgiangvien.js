import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import {getMethod,postMethodPayload, deleteMethod} from '../../services/request';
import Select from 'react-select';


async function saveGiangVien(event) {
    event.preventDefault();
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    var payload = {
        "id": id,
        "maCB": event.target.elements.maCB.value,
        "tenGV": event.target.elements.tenGV.value,
        "ngaySinh": event.target.elements.ngaySinh.value,
        "hocVi": event.target.elements.hocVi.value,
        "chucDanh": event.target.elements.chucDanh.value,
        "donViCongTac": event.target.elements.donViCongTac.value,
        "dienThoai": event.target.elements.dienThoai.value,
        "dangHopDong": event.target.elements.dangHopDong.value,
        "user": {
            "id":event.target.elements.user.value
        },
        "boMon": {
            id:event.target.elements.bomon.value
        },
    }
    console.log(payload);
    
    var url = '/api/giang-vien/admin/add'
    if(id != null){
        url = '/api/giang-vien/admin/update'
    }
    const response = await postMethodPayload(url, payload)
    if (response.status < 300) {
        Swal.fire({
            title: "Thông báo",
            text: "Thêm/cập nhật thành công!",
            preConfirm: () => {
                window.location.href = 'giang-vien'
            }
        });
    } 
    else {
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
        else{
             toast.error("Thêm/ sửa giảng viên thất bại");
        }
    }
}

const AdminAddGiangVien = ()=>{
    const [item, setItem] = useState(null);
    const [user, setUser] = useState([]);
    const [selectUser, setSelectUser] = useState(null);
    const [boMon, setBoMon] = useState([]);
    const [selectedBoMon, setSelectedBoMon] = useState(null);

    useEffect(()=>{
        const getGiangVien = async() =>{
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            if(id != null){
                var response = await getMethod('/api/giang-vien/all/find-by-id?id='+id)
                var result = await response.json();
                setItem(result)
                setSelectUser(result.user)
                setSelectedBoMon(result.boMon)
            }
        };
        getGiangVien();
        const getUser = async() =>{
            var response = await getMethod('/api/user/admin/user-teacher')
            var result = await response.json();
            setUser(result)
        };
        getUser();
        const getBoMon = async() =>{
            var response = await getMethod('/api/bomon/all/find-all')
            var result = await response.json();
            setBoMon(result)
        };
        getBoMon();
    }, []);

    const setUs= (option) =>{
        setSelectUser(option)
    }
    
    return (
        <>
            <div class="col-sm-12 header-sps">
                <div class="title-add-admin">
                    <h4>Thêm/ cập nhật giảng viên</h4>
                </div>
            </div>
            <div class="col-sm-12">
                    <div class="form-add">
                        <form onSubmit={saveGiangVien} class="row" method='post'>
                            <div class="col-md-4 col-sm-12 col-12">
                                <label class="lb-form">Mã giảng viên</label>
                                <input defaultValue={item?.maCB} name="maCB" type="text" class="form-control"/>
                                <label class="lb-form">Tên giảng viên</label>
                                <input defaultValue={item?.tenGV} name="tenGV" type="text" class="form-control"/>
                                <label class="lb-form">Ngày sinh</label>
                                <input defaultValue={item?.ngaySinh} name="ngaySinh" type="date" class="form-control"/>
                                <label class="lb-form">Dạng hợp đồng</label>
                                <select defaultValue={item?.dangHopDong} name="dangHopDong" class="form-control">
                                    <option value='Cơ hữu'>Cơ hữu</option>
                                    <option value='Mời giảng'>Mời giảng</option>
                                    <option value='Thính giảng'>Thính giảng</option>
                                </select>
                                <label class="lb-form">Chọn tài khoản</label>
                                <Select
                                    className="select-container" 
                                    onChange={setUs}
                                    options={user}
                                    value={selectUser}
                                    getOptionLabel={(option) => option.email + " - Quyền: "+option.authorities.description} 
                                    getOptionValue={(option) => option.id}    
                                    closeMenuOnSelect={false}
                                    name='user'
                                    placeholder="Chọn tài khoản"
                                />
                            </div>
                            <div className='col-md-4'>
                                <label class="lb-form">Bộ môn</label>
                                <Select
                                    className="select-container" 
                                    onChange={setSelectedBoMon}
                                    options={boMon}
                                    value={selectedBoMon}
                                    getOptionLabel={(option) => option.tenBoMon} 
                                    getOptionValue={(option) => option.id}    
                                    closeMenuOnSelect={false}
                                    name='bomon'
                                    placeholder="Chọn bộ môn"
                                />
                                <label class="lb-form">Học vị</label>
                                <input defaultValue={item?.hocVi} name="hocVi" type="text" class="form-control"/>
                                <label class="lb-form">Chức danh</label>
                                <input defaultValue={item?.chucDanh} name="chucDanh" type="text" class="form-control"/>
                                <label class="lb-form">Đơn vị công tác</label>
                                <input defaultValue={item?.donViCongTac} name="donViCongTac" type="text" class="form-control"/>
                                <label class="lb-form">Điện thoại</label>
                                <input defaultValue={item?.dienThoai} name="dienThoai" type="text" class="form-control"/>

                                <br/><br/><button class="btn btn-primary form-control">Thêm/ cập nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );
}

export default AdminAddGiangVien;