import lich from '../../assest/images/lich.png'
import { useState, useEffect } from 'react'
import {getMethod} from '../../services/request'
import {formatMoney} from '../../services/money'
import Chart from "chart.js/auto";


var token = localStorage.getItem("token");


const HomeAdmin = ()=>{
    const [doanhthu, setDoanhThu] = useState(0);
    const [quantri, setQt] = useState(null);
    const [doanhthuHomNay, setDoanhThuHomNay] = useState(0);
    const [donHoanThanhHomNay, setDonHoanThanhHomNay] = useState(0);
    const [items, setItems] = useState([]);
    useEffect(()=>{


    }, []);



  
    return(
       <>
        <div class="row">
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left shadow h-100 py-2">
                    <span class="lbcard">Số lượng giảng viên</span>
                    <span className='solieudoanhthu'>0</span>
                </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left shadow h-100 py-2">
                    <span class="lbcard">Số lượng trưởng bộ môn</span>
                    <span className='solieudoanhthu'>0</span>
                </div>
            </div>
        </div>



       </>
    );
}
export default HomeAdmin;