import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import {getMethod,postMethodPayload, uploadSingleFile} from '../../services/request';
import Select from 'react-select';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';

var description = '';
var linkbanner = '';
async function saveBlog(event) {
    event.preventDefault();
    document.getElementById("loading").style.display = 'block'
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    var ims = await uploadSingleFile(document.getElementById("imgbanner"))
    if(ims != null){
        linkbanner = ims
    }
    var blog = {
        "id": id,
        "tieuDe": event.target.elements.title.value,
        "moTa": event.target.elements.description.value,
        "noiDung": description,
        "anh": linkbanner,
    }
    console.log(blog)
    const response = await postMethodPayload('/api/bai-viet/admin/add', blog)
    if (response.status < 300) {
        Swal.fire({
            title: "Thông báo",
            text: "Thêm/cập nhật thành công!",
            preConfirm: () => {
                window.location.href = 'index'
            }
        });
    } else {
        toast.error("Thêm/ sửa bài viết thất bại");
         document.getElementById("loading").style.display = 'none'
    }
}

const AdminAddBaiViet = ()=>{
    const editorRef = useRef(null);
    const [blog, setBlog] = useState(null);
    useEffect(()=>{
        const getBlog= async() =>{
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            if(id != null){
                var response = await getMethod('/api/bai-viet/public/findById?id=' + id);
                var result = await response.json();
                setBlog(result)
                description = result.noiDung;
                linkbanner = result.anh
            }
        };
        getBlog();
    }, []);

    function handleEditorChange(content, editor) {
        description = content;
    }

    
    return (
        <>
            <div class="col-sm-12 header-sps">
                <div class="title-add-admin">
                    <h4>Thêm/ cập nhật học phần</h4>
                </div>
            </div>
            <div class="col-sm-12">
                    <div class="form-add">
                    <form class="row" onSubmit={saveBlog} method='post'>
                            <div class="col-md-4 col-sm-12 col-12">
                                <label class="lb-form">Tiêu đề blog</label>
                                <input defaultValue={blog==null?'':blog.tieuDe} name="title" type="text" class="form-control"/>
                                <label class="lb-form">Ảnh bài viết</label>
                                <input id="imgbanner" type="file" class="form-control"/>
                                <img id="imgpreview" className='imgadmin'/>
                                <label class="lb-form">Mô tả</label>
                                <textarea defaultValue={blog==null?'':blog.moTa} name="description" class="form-control"></textarea>
                                <div id="loading">
                                    <div class="bar1 bar"></div>
                                </div>
                                <br/><br/><button class="btn btn-primary form-control">Thêm/ cập nhật</button>
                            </div>
                            <div class="col-md-8 col-sm-12 col-12">
                                <label class="lb-form lbmotadv">Nội dung bài viết</label>
                                <Editor name='editor' tinymceScriptSrc={'https://cdn.tiny.cloud/1/f6s0gxhkpepxkws8jawvfwtj0l9lv0xjgq1swbv4lgcy3au3/tinymce/6/tinymce.min.js'}
                                        onInit={(evt, editor) => editorRef.current = editor} 
                                        initialValue={blog==null?'':blog.noiDung}
                                        onEditorChange={handleEditorChange}/>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );
}

export default AdminAddBaiViet;