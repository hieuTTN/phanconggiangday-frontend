import {toast } from 'react-toastify';
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

async function exportExcel(obj, namHoc) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Add Data
    worksheet.addRow(['']); // Row 1
    worksheet.addRow(['']); // Row 2
    worksheet.addRow(['']); // Row 3
    worksheet.addRow(['']); // Row 4
    worksheet.addRow(['']); // Row 5
    worksheet.addRow(['']); // Row 6
    worksheet.addRow(["Hà Nội, ngày"]); // Row 7
    worksheet.addRow(["Ngành đào tạo      : Công nghệ thông tin"]); // Row 8
    worksheet.addRow(['']); // Row 9
    worksheet.addRow(["STT", "Mã HP", "Tên Học Phần", "Số Tc", "Số tiết","","","", "Hệ số HP", "Tổng Số nhóm", "SLSV/Nhóm", "Nhóm", "Mã CBGD", "Họ và tên CBGD","Số tiết thực hiện","Số tiết thực tế"]); // Row 10
    worksheet.addRow(["", "", "","", "LT", "BT", "TH", "TC", "", "", "","","","","",""]); // Row 10
    worksheet.mergeCells('A7:Q7');
    const cell = worksheet.getCell('A7');
    cell.value = namHoc.hocKy+" - "+ namHoc.tenNamHoc;
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.font = { bold: true, size: 14 };
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


    worksheet.eachRow((row) => {
        row.eachCell((cell) => {
            cell.font = {
                name: 'Times New Roman'
            };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            if(row.number == 10 || row.number == 11){
                cell.font = { bold: true, size: 12 };
            }
        });
    });
    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "data.xlsx");
    toast.success('Dữ liệu đã được xuất ra file data.xlsx');
}
export {exportExcel}