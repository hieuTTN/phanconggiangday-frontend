import lich from '../../assest/images/lich.png'
import { useState, useEffect } from 'react'
import {getMethod} from '../../services/request'
import {formatMoney} from '../../services/money'
import ReactPaginate from 'react-paginate';



const TeacherChiTietTinTuc = ()=>{
    const [item, setItems] = useState(null);
    useEffect(()=>{
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        if(id == null){
            window.location.href ='index'
        }
        const getBaiViet= async() =>{
            var response = await getMethod('/api/bai-viet/public/findById?id='+id)
            var result = await response.json();
            setItems(result)
        };
        getBaiViet();
    }, []);


  
    return(
       <>
        <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
            <strong class="text-left">Chi tiết bài viết</strong>
        </div>
        <div className='col-sm-9 noidungbaiviet'>
            <h4>{item?.tieuDe}</h4>
            <div className='d-flex'>
                <span><i className='fa fa-calendar'></i> {item?.ngayTao}</span>
                <span className='nguoidangbv'><i className='fa fa-user'></i> {item?.user.fullName}</span>
            </div>
            <div className='noidungchinhbv' dangerouslySetInnerHTML={{__html:item?.noiDung}}>

            </div>
        </div>
       </>
    );
}
export default TeacherChiTietTinTuc;