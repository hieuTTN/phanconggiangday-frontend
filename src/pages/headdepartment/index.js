import lich from '../../assest/images/lich.png'
import { useState, useEffect } from 'react'
import {getMethod} from '../../services/request'
import {formatMoney} from '../../services/money'
import ReactPaginate from 'react-paginate';


var token = localStorage.getItem("token");

var url = '';
var size = 12;
const HomeTBM = ()=>{
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    useEffect(()=>{
        const getBaiViet= async() =>{
            var response = await getMethod('/api/bai-viet/public/findAll-page?size='+size+'&sort=id,desc&page='+0)
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
            url = '/api/bai-viet/public/findAll-page?&size='+size+'&sort=id,desc&page='
        };
        getBaiViet();
    }, []);

    const handlePageClick = async (data)=>{
        var currentPage = data.selected
        var response = await getMethod(url+currentPage)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
    }

    async function searchBv(){
        var uls = '/api/bai-viet/public/findAll-page?size='+size+'&sort=id,desc';
        var search = document.getElementById("search").value;
        if(search != ""){
            uls += '&search='+search;
        }
        uls += '&page='
        url =uls
        var response = await getMethod(uls+0)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
    }
  
    return(
       <>
        <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
            <strong class="text-left"><i className='fa fa-users'></i> Danh Sách Thông Báo</strong>
            <div class="search-wrapper d-flex align-items-center">
                <div className='d-flex divngayadmin'>
                    <input onKeyUp={searchBv} id='search' className='form-control' placeholder='Tìm kiếm bài viết'/>
                </div>
                <a href='add-bai-viet' class="btn btn-primary ms-2"><i className='fa fa-plus'></i></a>
            </div>
        </div>

        <div className='row dsbaiviet'>
            {items.map((item=>{
                return <div className='col-sm-4'>
                    <a href={'chi-tiet-tin-tuc?id='+item.id} className='row singlebv'>
                        <div className='col-sm-5'>
                            <img src={item.anh} className='imgblogindex'/>
                        </div>
                        <div className='col-sm-7'>
                            <span className='tieudebv'>{item.tieuDe}</span>
                            <span className='motabv'>{item.moTa}</span>
                            <span className='ngaytaobv'><i className='fa fa-calendar'></i> {item.ngayTao}</span>
                        </div>
                    </a>
                </div>
            }))}
        </div>

        <ReactPaginate 
            marginPagesDisplayed={2} 
            pageCount={pageCount} 
            onPageChange={handlePageClick}
            containerClassName={'pagination'} 
            pageClassName={'page-item'} 
            pageLinkClassName={'page-link'}
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link' 
            previousLabel='Trang trước'
            nextLabel='Trang sau'
            activeClassName='active'/>
       </>
    );
}
export default HomeTBM;