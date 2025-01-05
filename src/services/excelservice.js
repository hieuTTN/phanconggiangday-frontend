import {toast } from 'react-toastify';
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

async function exportExcel(list, namHoc, GiangVienCTHs) {
    console.log(list);
    
    const workbook = new ExcelJS.Workbook();
    getMauHK1(list, namHoc, workbook)
    getMau2(GiangVienCTHs, namHoc, workbook)
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "data.xlsx");
    toast.success('Dữ liệu đã được xuất ra file data.xlsx');
}

function getMauHK1(list, namHoc, workbook){
    const worksheet = workbook.addWorksheet("Mau1_HK1");
    // Add Data
    worksheet.addRow(['']); // Row 1
    worksheet.addRow(['']); // Row 2
    worksheet.addRow(['']); // Row 3
    worksheet.addRow(['']); // Row 4
    worksheet.addRow(['']); // Row 5
    worksheet.addRow(["KẾ HOẠCH MỞ NHÓM MÔN CHUYÊN NGÀNH"]); // Row 6
    worksheet.addRow([""]); // Row 7
    worksheet.addRow(["Ngành đào tạo      : Công nghệ thông tin"]); // Row 8
    worksheet.addRow(['']); // Row 9
    worksheet.addRow(["STT", "Mã HP", "Tên Học Phần", "Số Tc", "Số tiết","","","", "Hệ số HP", "Tổng Số nhóm", "SLSV/Nhóm", "Nhóm", "Mã CBGD", "Họ và tên CBGD","Số tiết thực hiện","Số tiết thực tế"]); // Row 10
    worksheet.addRow(["", "", "","", "LT", "BT", "TH", "TC", "", "", "","","","","",""]); // Row 10
    worksheet.mergeCells('A6:Q6');
    worksheet.mergeCells('A7:Q7');
    worksheet.mergeCells('A8:Q8');
    worksheet.mergeCells('A1:D1');
    worksheet.mergeCells('A2:D2');
    worksheet.mergeCells('A3:D3');
    worksheet.mergeCells('L1:Q1');
    worksheet.mergeCells('L2:Q2');
    worksheet.mergeCells('F4:Q4');
    const cell = worksheet.getCell('A7');
    cell.value = namHoc.hocKy+" - "+ namHoc.tenNamHoc;
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.font = { bold: true, size: 14 };
    const cellA1 = worksheet.getCell('A1');
    const cellA2 = worksheet.getCell('A2');
    const cellA3 = worksheet.getCell('A3');
    const cellL1 = worksheet.getCell('L1');
    const cellL2 = worksheet.getCell('L2');
    const cellF4= worksheet.getCell('F4');
    cellA1.value = 'ỦY BAN NHÂN DÂN'
    cellA2.value = 'THÀNH PHỐ HỒ CHÍ MINH'
    cellA3.value = 'TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TPHCM'
    cellL1.value = 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM'
    cellL2.value = 'Độc lập - Tự do - Hạnh phúc'
    cellF4.value = `Thành phố Hồ Chí Minh, ${getNgay()} `


    worksheet.mergeCells('E10:H10');
    worksheet.mergeCells('A10:A11');
    worksheet.mergeCells('B10:B11');
    worksheet.mergeCells('C10:C11');
    worksheet.mergeCells('D10:D11');
    worksheet.mergeCells('I10:I11');
    worksheet.mergeCells('J10:J11');
    worksheet.mergeCells('K10:K11');
    worksheet.mergeCells('L10:L11');
    worksheet.mergeCells('M10:M11');
    worksheet.mergeCells('N10:N11');
    worksheet.mergeCells('O10:O11');
    worksheet.mergeCells('P10:P11');
    worksheet.mergeCells('Q10:Q11');

    for(var i=0; i< list.length; i++){
        worksheet.addRow([
            Number(i)+Number(1),list[i].hocPhan.maHP, list[i].hocPhan.tenHP, list[i].hocPhan.soTinChi,list[i].hocPhan.soTietLyThuyet, 0, list[i].hocPhan.soTietThucHanh,0,
            list[i].hocPhan.heSo, (list[i].tongSoNhom==null?0:list[i].tongSoNhom) +"\n"+list[i].tongSinhVien +" SV",
            list[i].soLuongSinhVienNhom==null?0:list[i].soLuongSinhVienNhom
        ]);
        var numGv = worksheet.lastRow.number
        var phanCongs = list[i].phanCongGiangViens
        for(var j=0; j< phanCongs.length; j++){
            var soTietTh = 0;
            if(phanCongs[j].loaiNhom == 'ALL'){
                soTietTh = phanCongs[j].soNhom * list[i].hocPhan.tongSoTiet
            }
            if(phanCongs[j].loaiNhom == 'TH'){
                soTietTh = phanCongs[j].soNhom*list[i].hocPhan.soTietThucHanh
            }
            if(phanCongs[j].loaiNhom == 'LT'){
                soTietTh = phanCongs[j].soNhom*list[i].hocPhan.soTietLyThuyet
            }
            worksheet.addRow([
                '','','','','','','','','','','',phanCongs[j].soNhom +(phanCongs[j].loaiNhom=='ALL'?'':phanCongs[j].loaiNhom),
                phanCongs[j].giangVien.maCB,phanCongs[j].giangVien.tenGV,
                soTietTh, soTietTh* list[i].hocPhan.heSo
            ]);
        }
        
        var tam = Number(numGv) + Number(list[i].phanCongGiangViens.length)
        try {
            worksheet.mergeCells(`A${numGv}:A${tam}`);
            worksheet.mergeCells(`B${numGv}:B${tam}`);
            worksheet.mergeCells(`C${numGv}:C${tam}`);
            worksheet.mergeCells(`D${numGv}:D${tam}`);
            worksheet.mergeCells(`E${numGv}:E${tam}`);
            worksheet.mergeCells(`F${numGv}:F${tam}`);
            worksheet.mergeCells(`G${numGv}:G${tam}`);
            worksheet.mergeCells(`H${numGv}:H${tam}`);
            worksheet.mergeCells(`I${numGv}:I${tam}`);
            worksheet.mergeCells(`J${numGv}:J${tam}`);
            worksheet.mergeCells(`K${numGv}:K${tam}`);
        } catch (error) {
            
        }
        if(list[i].phanCongGiangViens.length > 0){
            numGv = Number(numGv) + Number(list[i].phanCongGiangViens.length);
        }
        else{
            numGv = Number(numGv) + Number(1)
        }
    }
    worksheet.eachRow((row) => {
        row.eachCell((cell) => {
            cell.font = {
                name: 'Times New Roman'
            };
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            if(row.number == 10 || row.number == 11){
                cell.font = { bold: true, size: 12 };
            }
        });
    });
}

function getMau2(list, namHoc, workbook){
    const worksheet = workbook.addWorksheet("Mẫu 2");
    // Add Data
    worksheet.addRow(['']); // Row 1
    worksheet.addRow(['']); // Row 2
    worksheet.addRow(['']); // Row 3
    worksheet.addRow(['']); // Row 4
    worksheet.addRow(['']); // Row 5
    worksheet.addRow(["BẢNG PHÂN CÔNG CÔNG TÁC CỦA CÁN BỘ, GIẢNG VIÊN CƠ HỮU"]); // Row 6
    worksheet.addRow(['']); // Row 7
    worksheet.addRow(['']); // Row 8
    worksheet.addRow(["STT", "Mã CB", "Họ và tên GV", "Năm sinh", "Chức danh, học vị","Phân công giảng dạy","","","","","",
        "Tổng tiết dạy thực tế","Công tác khác","Tổng CLC (đã tính CVHT CLC)", "Tổng số tiết công tác của GV"]); // Row 9
    worksheet.addRow(["", "", "","", "", "Tên học phần", "Mã học phần","Số TC", "Số tiết của HP", "Số lượng lớp, nhóm","Tổng số tiết giảng dạy của GV","","","",""]); // Row 10
    worksheet.mergeCells('A6:S6');
    worksheet.mergeCells('A1:F1');
    worksheet.mergeCells('A2:F2');
    worksheet.mergeCells('A3:F3');
    worksheet.mergeCells('A4:F4');
    worksheet.mergeCells('H1:S1');
    worksheet.mergeCells('H2:S2');
    const cellA1 = worksheet.getCell('A1');
    const cellA2 = worksheet.getCell('A2');
    const cellA3 = worksheet.getCell('A3');
    const cellA4 = worksheet.getCell('A4');
    const cellH1 = worksheet.getCell('H1');
    const cellH2 = worksheet.getCell('H2');
    cellA1.value = 'ỦY BAN NHÂN DÂN'
    cellA2.value = 'THÀNH PHỐ HỒ CHÍ MINH'
    cellA3.value = 'TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TPHCM'
    cellA4.value = 'Khoa: Công nghệ Thông tin'
    cellH1.value = 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM'
    cellH2.value = 'Độc lập - Tự do - Hạnh phúc'


    worksheet.mergeCells('F9:K9');
    worksheet.mergeCells('A9:A10');
    worksheet.mergeCells('B9:B10');
    worksheet.mergeCells('C9:C10');
    worksheet.mergeCells('D9:D10');
    worksheet.mergeCells('E9:E10');
    worksheet.mergeCells('L9:L10');
    worksheet.mergeCells('M9:M10');
    worksheet.mergeCells('N9:N10');
    worksheet.mergeCells('O9:O10');

    for(var i=0; i< list.length; i++){
        worksheet.addRow([
            Number(i)+Number(1),list[i].giangVien.maCB, list[i].giangVien.tenGV, list[i].giangVien.ngaySinh,list[i].giangVien.chucDanh+"\n"+list[i].giangVien.hocVi
        ]);
        var phanCongs = list[i].phanCongGiangViens
        var numGv = worksheet.lastRow.number
        for(var j=0; j< phanCongs.length; j++){
            var soTietTh = 0;
            if(phanCongs[j].loaiNhom == 'ALL'){
                soTietTh = phanCongs[j].soNhom * phanCongs[j].keHoachChiTiet.hocPhan.tongSoTiet
            }
            if(phanCongs[j].loaiNhom == 'TH'){
                soTietTh = phanCongs[j].soNhom* phanCongs[j].keHoachChiTiet.hocPhan.soTietThucHanh
            }
            if(phanCongs[j].loaiNhom == 'LT'){
                soTietTh = phanCongs[j].soNhom* phanCongs[j].keHoachChiTiet.hocPhan.soTietLyThuyet
            }
            worksheet.addRow([
                '','','','','',phanCongs[j].keHoachChiTiet.hocPhan.tenHP,phanCongs[j].keHoachChiTiet.hocPhan.maHP,
                phanCongs[j].keHoachChiTiet.hocPhan.soTinChi, phanCongs[j].keHoachChiTiet.hocPhan.tongSoTiet,
                phanCongs[j].soNhom + (phanCongs[j].loaiNhom == 'ALL'?'':phanCongs[j].loaiNhom),soTietTh, soTietTh*phanCongs[j].keHoachChiTiet.hocPhan.heSo
            ]);
        }
        
        var tam = Number(numGv) + Number(list[i].phanCongGiangViens.length)
        try {
            worksheet.mergeCells(`A${numGv}:A${tam}`);
            worksheet.mergeCells(`B${numGv}:B${tam}`);
            worksheet.mergeCells(`C${numGv}:C${tam}`);
            worksheet.mergeCells(`D${numGv}:D${tam}`);
            worksheet.mergeCells(`E${numGv}:E${tam}`);
        } catch (error) {
            
        }
    }
    worksheet.eachRow((row) => {
        row.eachCell((cell) => {
            cell.font = {
                name: 'Times New Roman'
            };
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            if(row.number == 9 || row.number == 10){
                cell.font = { bold: true, size: 12 };
            }
        });
    });
}

function getNgay(){
    const today = new Date();
    const day = today.getDate(); // Ngày (1-31)
    const month = today.getMonth() + 1; // Tháng (0-11) + 1 để thành (1-12)
    const year = today.getFullYear(); // Năm (ví dụ: 2025)
    return 'ngày '+day+' tháng '+month+' năm '+year
}
export {exportExcel}