import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import Select from 'react-select';
import {getMethod,postMethodPayload, postMethod, uploadSingleFile} from '../../services/request';
import Chart from "chart.js/auto";

const AdminThongKe = ()=>{
    const [namHoc, setnamHoc] = useState([]);
    const [tiLeGiangVien, setTiLeGiangVien] = useState(null);
    useEffect(()=>{
        const getTiLeGiangVien = async() =>{
            var response = await getMethod('/api/giang-vien/admin/ti-le-giang-vien')
            var result = await response.json();
            setTiLeGiangVien(result)
            bieuDoTiLeGiangVien([result.coHuu, result.thinhGiang, result.moiGiang])
        };
        getTiLeGiangVien();
        const getSelect = async() =>{
            var response = await getMethod('/api/nam-hoc/all/find-all-list')
            var result = await response.json();
            setnamHoc(result)
        };
        getSelect();
        chartSoTiet(null)
    }, []);


    async function bieuDoTiLeGiangVien(list) {
        var lb = 'Tỉ lệ giảng viên';
        document.getElementById("bieudoTlGiangVien").innerHTML = `<canvas id="chartTiLeGiangVien"></canvas>`;
        const ctx = document.getElementById("chartTiLeGiangVien").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Giảng viên cơ hữu', 'Giảng viên thỉnh giảng', 'Giảng viên mời giảng'],
                datasets: [{
                    label: 'Tỉ lệ giảng viên giảng dạy',
                    data: list,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        enabled: true
                    },
                    datalabels: {
                        color: "#000",
                        anchor: "center",
                        align: "center",
                        formatter: (value) => value + "%"
                    }
                }
            }
        });
    }

    async function chartSoTiet(namHocId) {
        var url = 'http://localhost:8080/api/giang-vien/admin/tong-so-tiet';
        if(namHocId != null){
            url += '?namHocId='+namHocId;
        }
        const response = await getMethod(url)
        var result = await response.json();
        var list = [result.coHuu, result.thinhGiang, result.moiGiang];
    
        var lb = 'Số tiết dạy '+result.namHoc.hocKy+" - "+ result.namHoc.tenNamHoc;
        document.getElementById("bieudocot").innerHTML = `<canvas id="chartSoTiet"></canvas>`
        const ctx = document.getElementById("chartSoTiet").getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Giảng viên cơ hữu', 'Giảng viên thỉnh giảng', 'Giảng viên mời giảng'],
                datasets: [{
                    label: lb,
                    backgroundColor: 'rgba(161, 198, 247, 1)',
                    borderColor: 'rgb(47, 128, 237)',
                    data: list,
                }]
            },
            // options: {
            //     scales: {
            //         yAxes: [{
            //             ticks: {
            //                 callback: function(value) {
            //                     return formatMoney(value);
            //                 }
            //             }
            //         }]
            //     }
            // },
        });
    }
    
    async function locBieuDoCot(option) {
        chartSoTiet(option.id)
    }

    
    return (
        <div class="row">
            <div className='col-sm-4'>
                <div class="" id='bieudoTlGiangVien'>
                </div>
            </div>
            <div className='col-sm-8'>
                <Select
                    className="select-container selectheader" 
                    options={namHoc}
                    onChange={locBieuDoCot}
                    getOptionLabel={(option) => option.tenNamHoc + " - "+option.hocKy} 
                    getOptionValue={(option) => option.id}    
                    id='namHoc'
                    placeholder="Chọn năm học"
                />
                <div class="" id='bieudocot'>

                </div>
            </div>
        </div>
    );
}

export default AdminThongKe;