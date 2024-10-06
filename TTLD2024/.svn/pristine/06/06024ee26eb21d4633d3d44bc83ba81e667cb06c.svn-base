// Author: Nguyễn Hùng Cường
// Date: 08/07/2024
// Sumary: Danh mục thông báo

var tempthem = "them";
var file = "ThongBao";

$(function () {
});

// load dữ liệu cho lưới
function LoadDataTable() {
    table.clearData();
    const GetAll = NTS.getAjax("/HeThong/ThongBao/GetAll", {});
    if (!GetAll.Err) {
        table.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

function ThemDuLieu() {
    if (!QuyenThem()) {
        return false;
    }
    // xóa dữ liệu trên form
    resetForm('#mdThemMoi');
/*
    NTS.loadDataCombo({
        name: '#MaThongBao',
        ajaxUrl: '/HeThong/ThongBao/GetBangMoi',
        indexValue: 0,
        indexText: 0,
        showTatCa: true
    });
*/
    $('#tieuDeModal').text('Thêm thông tin thông báo');
    tempthem = "them";
    $('#mdThemMoi').modal('show');
    $().find('input').focus();
    focusInput('#mdThemMoi .modal-body');
    $('#MaThongBao').prop('disabled', false);
}
function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }
/*
    NTS.loadDataCombo({
        name: '#MaThongBao',
        ajaxUrl: '/HeThong/ThongBao/GetAllBang',
        indexValue: 0,
        indexText: 0,
        textShowTatCa: "-Chọn Mã-",
        showTatCa: true
    });
*/
    $('#MaThongBao').prop('disabled', true);
    $('#tieuDeModal').text('Cập nhật thông tin thông báo');
    const result = NTS.getAjax('/HeThong/ThongBao/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#MaThongBao').value(data.MaThongBao);
        $('#NoiDung').value(data.NoiDung);
        $('#GhiChu').value(data.GhiChu);
        $('#ThongBaoID').value(data.ThongBaoID);
        $('#mdThemMoi').modal('show');
        tempthem = "sua";
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
}
function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/HeThong/ThongBao/XoaDuLieu', { id: ID });
        if (!result.Err) {
            LoadDataTable();
            NTS.thanhcong(result.Msg);
        }
        else showMsg(result);
    });
}

$(document).ready(function () {
    LoadDataTable();
});

var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().ThongBaoID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().ThongBaoID);
}
/*var fmBitXoa = function (cell) {
    return formaterBitXoa(cell.getValue(), cell.getData().ThongBaoID);
}
*/
//#region updateFooter
function updateFooter() {
    const el = document.getElementById("row-count");
    if (table != undefined) {
        if (table.rowManager.activeRows.length > 0) {
            el.innerHTML = 'Dòng: ' + (table.rowManager.table.footerManager.links[0].page * table.rowManager.table.footerManager.links[0].size - table.rowManager.table.footerManager.links[0].size + 1) + ' - ' + (table.rowManager.table.footerManager.links[0].page * table.rowManager.table.footerManager.links[0].size - table.rowManager.table.footerManager.links[0].size + table.rowManager.displayRowsCount) + ' của ' + table.rowManager.activeRows.length + " - ";
        }
        else {
            el.innerHTML = 'Dòng: 0 - 0 của 0 - ';
        }
    }
}
$(document).on('click', '.tabulator-page', function () {
    updateFooter();
});
$(document).on('change', '.tabulator-page-size', function () {
    updateFooter();
});
$(document).on('click', '.tabulator-footer', function () {
    updateFooter();
});
//#endregion /updateFooter

var table = new Tabulator("#Grid1", {
    height: 500,
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', headerHozAlign: "center", hozAlign: "center", formatter: fmThaoTac, width: 60, headerSort: false, frozen: true, vertAlign: "middle", print: false },
        { title: "ThongBaoID", field: "ThongBaoID", visible: false },
        { title: "Mã thông báo", field: "MaThongBao", formatter: 'textarea', hozAlign: "left", width: 150, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Nội dung", field: "NoiDung", formatter: 'textarea', hozAlign: "left", minWidth: 400, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Ghi chú", field: "GhiChu", formatter: 'textarea', hozAlign: "left", minWidth: 400, headerHozAlign: "center", vertAlign: "middle" }
    ],
    footerElement: "<span id='row-count'></span>", //add element element to footer to contain count
    dataFiltered: updateFooter, //call updateFooter function when callback triggered
    dataLoaded: updateFooter, //call updateFooter function when callback triggered
    rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
        $('#ThongBaoID').val(row.getData().ThongBaoID);
        SuaDuLieu(row.getData().ThongBaoID);
    },
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
table.on("rowDblClick", function (e, row) {
    debugger
    $('#ThongBaoID').val(row.getData().ThongBaoID);
    SuaDuLieu(row.getData().ThongBaoID);
});
$('#btnThemMoi').click(function () {
    ThemDuLieu();
});
$(document).on('click', '.btnSuaGrid1', function () {
    $('#ThongBaoID').val($(this).attr('data'));
    SuaDuLieu($(this).attr('data'));
});
$(document).on('click', '.btnXoaGrid1', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieu(ID);
});
$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        table.setFilter(matchAny, { value: $(this).val() });
        updateFooter();
    }
});

$('#btnLuuVaDong').on('click', function () {

    const validate = new NTSValidate('#mdThemMoi');
    if (!validate.trim().check()) {
        return false;
    }

    let param = new Array();
    param[0] = tempthem;
    param[1] = $('#MaThongBao').value();
    param[2] = $('#NoiDung').value();
    param[3] = $('#GhiChu').value();
    param[4] = $('#ThongBaoID').value();


    const result = NTS.getAjax("/HeThong/ThongBao/LuuThongTin", { data: param });
    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        $('#mdThemMoi').modal('hide');
        return false;
    } else
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
});

$('#btnPrint').on('click', function () {
    table.print(false, true);
    return false;
});
var dulieuloc = "";
$('#btnExport').on('click', async function () {
    table.hideColumn('ThaoTac');
    table.download("xlsx", "DanhSachThongBao.xlsx", { sheetName: "Danh sách thông báo" });
    table.showColumn('ThaoTac');
});
/*var dulieuloc = "";
$('#btnExport').on('click', async function () {
    const data = table.getData();
    const filteredData = data.filter(
        // lấy dữ liệu theo bộ lọc
        item => (item.MaThongBao == null ? "" : item.MaThongBao.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.NoiDung == null ? "" : item.NoiDung.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.GhiChu == null ? "" : item.GhiChu.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
    );
    var chuoidulieu = JSON.stringify(filteredData).replaceAll('null', '""').replaceAll('true', '"Đang sử dụng"').replaceAll('false', '""');
    // cấu hình tên cột để xuất
    // thứ tự mảng này quết định thứ tự cột xuất ra
    var TenCot = [
        { 'datafil': 'MaThongBao', 'TenCot': 'Tên bảng', 'DoRong': '20', 'CanhLe': 'Left' },
        { 'datafil': 'NoiDung', 'TenCot': 'Nội dung', 'DoRong': '40', 'CanhLe': 'Left' },
        { 'datafil': 'GhiChu', 'TenCot': 'Ghi chú', 'DoRong': '40', 'CanhLe': 'Left' }]
    var result = await NTS.getAjaxAsync('/QuanLy/DungChung/XuatDataExcel', { Cot: JSON.stringify(TenCot), Data: chuoidulieu, TenFile: 'Danh sách thông báo' });
    if (result != "") {
        window.open(result);
    }
});*/

///////// PHÍM TẮT /////////
var hotKey = 0; // 1 thêm
$(document).on('keydown', function (e) {
    switch (e.keyCode) {
        case 113:
            if (hotKey == 0)
                $('#btnThemMoi').trigger('click');
            e.preventDefault();
            break;
        case 114:
            if (hotKey == 0)
                $('.nav-search-input').focus();
            e.preventDefault();
            break;
        case 115:
            if (hotKey == 1)
                $('#mdThemMoi').modal('hide');
            e.preventDefault();
            break;
        case 120:
            if (hotKey == 1)
                $('#btnLuuVaDong').trigger('click');
            e.preventDefault();
            break;
    }
});
$(document).on('shown.bs.modal', '#mdThemMoi', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdThemMoi', function () {
    hotKey = 0;
});