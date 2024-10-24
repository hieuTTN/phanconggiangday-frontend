import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import {getMethod,postMethodPayload, deleteMethod} from '../../services/request';
import Select from 'react-select';



const AdminAddKeHoach = ()=>{
    const [item, setItem] = useState(null);
    const [khoahoc, setKhoaHoc] = useState([]);
    const [namHoc, setnamHoc] = useState([]);
    const [hocPhan, sethocPhan] = useState([]);
    const [nganh, setNganh] = useState([]);
    const [selectKhoaHoc, setSelectKhoaHoc] = useState(null);
    const [selectNamHoc, setSelectNamHoc] = useState(null);
    const [selectHocPhan, setSelectHocPhan] = useState(null);
    const [selectedNganh, setSelectedNganh] = useState([]);

    useEffect(()=>{
        const getKeHoach = async() =>{
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            if(id != null){
                var response = await getMethod('/api/ke-hoach-mo-mon/all/find-by-id?id='+id)
                var result = await response.json();
                setItem(result)
                setSelectKhoaHoc(result.khoaHoc)
                setSelectNamHoc(result.namHoc)
                setSelectHocPhan(result.hocPhan)
                var listnganh = [];
                for(var i=0; i<result.keHoachMoMonNganhs.length; i++){
                    listnganh.push(result.keHoachMoMonNganhs[i].nganh)
                }
                setSelectedNganh(listnganh)
            }
        };
        getKeHoach();
        const getSelect = async() =>{
            var response = await getMethod('/api/khoa-hoc/all/find-all-list')
            var result = await response.json();
            setKhoaHoc(result)
            var response = await getMethod('/api/nam-hoc/all/find-all-list')
            var result = await response.json();
            setnamHoc(result)
            var response = await getMethod('/api/hoc-phan/all/find-all-list')
            var result = await response.json();
            sethocPhan(result)
        };
        getSelect();
        const getNganh = async() =>{
            var response = await getMethod('/api/nganh/all/find-all')
            var result = await response.json();
            setNganh(result)
        };
        getNganh();
    }, []);

    const handleChangeKhoaHoc= (option) =>{
        setSelectKhoaHoc(option)
    }
    
    const handleChangeHocPhan= (option) =>{
        setSelectHocPhan(option)
    }
    
    const handleChangeNamHoc= (option) =>{
        setSelectNamHoc(option)
    }


    async function saveKeHoach(event) {
        event.preventDefault();
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        var strings = [];
        for(var i =0; i< selectedNganh.length; i++){
            strings.push(selectedNganh[i].maNganh)
        }
        
        var payload = {
            "id": id,
            "tongSoSinhVien": event.target.elements.tongSoSv.value,
            "soLuongSinhVienNhom": event.target.elements.soLuongSinhVienNhom.value,
            "listMaNganh": strings,
            "khoaHoc": {
                "maKhoaHoc":event.target.elements.khoaHoc.value
            },
            "namHoc": {
                "id":event.target.elements.namHoc.value
            },
            "hocPhan": {
                "maHP":event.target.elements.hocPhan.value
            },
        }
        console.log(payload);
        
        const response = await postMethodPayload('/api/ke-hoach-mo-mon/admin/add', payload)
        if (response.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Thêm/cập nhật thành công!",
                preConfirm: () => {
                    window.location.href = 'ke-hoach'
                }
            });
        } 
        else {
            if (response.status == 417) {
                var result = await response.json()
                toast.warning(result.defaultMessage);
            }
            else{
                 toast.error("Thêm/ sửa kế hoạch thất bại");
            }
        }
    }
    
    
    return (
        <>
            <div class="col-sm-12 header-sps">
                <div class="title-add-admin">
                    <h4>Thêm/ cập nhật kế hoạch</h4>
                </div>
            </div>
            <div class="col-sm-12">
                    <div class="form-add">
                        <form onSubmit={saveKeHoach} class="row" method='post'>
                            <div class="col-md-4 col-sm-12 col-12">
                                <label class="lb-form">Tổng số sinh viên</label>
                                <input defaultValue={item?.tongSoSinhVien} name="tongSoSv" type="text" class="form-control"/>
                                <label class="lb-form">Số lượng sinh viên nhóm</label>
                                <input defaultValue={item?.soLuongSinhVienNhom} name="soLuongSinhVienNhom" type="text" class="form-control"/>
                                <label class="lb-form">Khóa học</label>
                                <Select
                                    className="select-container" 
                                    onChange={handleChangeKhoaHoc}
                                    options={khoahoc}
                                    value={selectKhoaHoc}
                                    getOptionLabel={(option) => option.tenKhoaHoc} 
                                    getOptionValue={(option) => option.maKhoaHoc}    
                                    closeMenuOnSelect={false}
                                    name='khoaHoc'
                                    placeholder="Chọn khóa học"
                                />
                                <label class="lb-form">Năm học</label>
                                <Select
                                    className="select-container" 
                                    onChange={handleChangeNamHoc}
                                    options={namHoc}
                                    value={selectNamHoc}
                                    getOptionLabel={(option) => option.tenNamHoc + " - "+option.hocKy} 
                                    getOptionValue={(option) => option.id}    
                                    closeMenuOnSelect={false}
                                    name='namHoc'
                                    placeholder="Chọn năm học"
                                />
                                <label class="lb-form">Học phần</label>
                                <Select
                                    className="select-container" 
                                    onChange={handleChangeHocPhan}
                                    options={hocPhan}
                                    value={selectHocPhan}
                                    getOptionLabel={(option) => "Mã: "+option.maHP+" - "+option.tenHP} 
                                    getOptionValue={(option) => option.maHP}    
                                    closeMenuOnSelect={false}
                                    name='hocPhan'
                                    placeholder="Chọn học phần"
                                />
                                <label class="lb-form">Chọn các ngành</label>
                                <label class="lb-form">Ngành</label>
                                <Select
                                    className="select-container" 
                                    options={nganh}
                                    isMulti
                                    onChange={setSelectedNganh}
                                    value={selectedNganh}
                                    getOptionLabel={(option) => option.tenNganh} 
                                    getOptionValue={(option) => option.maNganh}    
                                    closeMenuOnSelect={false}
                                    name='nganh'
                                    placeholder="Chọn ngành"
                                />

                            <br/><button class="btn btn-primary form-control">Thêm/ cập nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );
}

export default AdminAddKeHoach;