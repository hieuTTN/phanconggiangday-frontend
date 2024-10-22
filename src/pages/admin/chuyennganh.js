import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import Select from 'react-select';
import {getMethod,postMethodPayload, deleteMethod} from '../../services/request';


var token = localStorage.getItem("token");



var size = 10
var url = '';
const AdminChuyenNganh = ()=>{
    const [items, setItems] = useState([]);
    const [nganh, setNganh] = useState([]);
    const [selectedNganh, setSelectedNganh] = useState(null);
    const [labelBtn, setLabelBtn] = useState("Thêm chuyên ngành");
    const [type, setType] = useState("save");

    useEffect(()=>{
        const getChuyenNganh = async() =>{
            var response = await getMethod('/api/chuyen-nganh/all/find-all')
            var result = await response.json();
            setItems(result)
        };
        getChuyenNganh();
        const getNganh = async() =>{
            var response = await getMethod('/api/nganh/all/find-all')
            var result = await response.json();
            setNganh(result)
        };
        getNganh();
    }, []);


    function clearData(){
        document.getElementById("machuyennganh").value = "";
        setLabelBtn("Thêm chuyên ngành");
    }

    function setData(chuyenganh){
        document.getElementById("machuyennganh").value = chuyenganh.maChuyenNganh;
        setSelectedNganh(chuyenganh.nganh)
        setLabelBtn("Cập nhật chuyên ngành");
    }

    async function handleAddChuyenNganh(event) {
        event.preventDefault();
        const payload = {
            maChuyenNganh: event.target.elements.machuyennganh.value,
            nganh: {
                maNganh:event.target.elements.nganh.value
            },
        };
        const res = await postMethodPayload('/api/chuyen-nganh/admin/add-update',payload)
        var result = await res.json()
        console.log(result);
        if (res.status == 417) {
            toast.error(result.defaultMessage);
        }
        if(res.status < 300){
            toast.success("Thành công!");
            var response = await getMethod('/api/chuyen-nganh/all/find-all')
            var result = await response.json();
            setItems(result)
        }
    };
    
    async function deleteChuyenNganh(maChuyenNganh){
        var con = window.confirm("Bạn chắc chắn muốn xóa chuyên ngành này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/chuyen-nganh/admin/delete?maChuyenNganh='+maChuyenNganh)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            var response = await getMethod('/api/chuyen-nganh/all/find-all')
            var result = await response.json();
            setItems(result)
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

    
    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Chuyên Ngành</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <button onClick={clearData} data-bs-toggle="modal" data-bs-target="#addtk" class="btn btn-primary ms-2"><i className='fa fa-plus'></i></button>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh chuyên ngành</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Mã/ tên chuyên ngành</th>
                                <th>Mã ngành</th>
                                <th>Tên ngành</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                return  <tr>
                                    <td>{item.maChuyenNganh}</td>
                                    <td>{item.nganh.maNganh}</td>
                                    <td>{item.nganh.tenNganh}</td>
                                    <td class="sticky-col">
                                        <a data-bs-toggle="modal" data-bs-target="#addtk" onClick={()=>setData(item)} href='#' class="edit-btn"><i className='fa fa-edit'></i></a>
                                        <button onClick={()=>deleteChuyenNganh(item.maChuyenNganh)} class="delete-btn"><i className='fa fa-trash'></i></button>
                                    </td>
                                </tr>
                            }))}
                        </tbody>
                    </table>

                </div>
            </div>

            <div class="modal fade" id="addtk" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{labelBtn}</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                        <div class="modal-body row">
                            <form onSubmit={handleAddChuyenNganh} class="col-sm-6" style={{margin:'auto'}}>
                                <label class="lb-form">Mã hoặc tên chuyên ngành</label>
                                <input name='machuyennganh' id='machuyennganh' class="form-control"/>
                                <label class="lb-form">Ngành</label>
                                <Select
                                    className="select-container" 
                                    options={nganh}
                                    onChange={setSelectedNganh}
                                    value={selectedNganh}
                                    getOptionLabel={(option) => option.tenNganh} 
                                    getOptionValue={(option) => option.maNganh}    
                                    closeMenuOnSelect={false}
                                    name='nganh'
                                    placeholder="Chọn ngành"
                                />
                                <br/>
                                <button class="form-control btn btn-primary">{labelBtn}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminChuyenNganh;