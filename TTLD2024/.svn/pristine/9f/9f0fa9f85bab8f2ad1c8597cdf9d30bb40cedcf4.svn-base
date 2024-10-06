////const { debug } = require("node:util");

var tempthem = "them";
$(function () {
    LoadDataTable();
    checkMacDinhSD('.checkMacDinhSD', 'LoaiHinhDN', 'LoaiHinhDNID');
    //$('#reservationdate').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' });
});

var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().LoaiHinhDNID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().LoaiHinhDNID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().LoaiHinhDNID);
}
var Grid1 = new Tabulator("#Grid1", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "80vh",
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', formatter: fmThaoTac, headerSort: false, headerHozAlign: "Center", hozAlign: "center", vertAlign: "middle", field: "ThaoTac", width: 60, print: false },
        { title: "Mã", field: "MaLoaiHinhDN", formatter: 'textarea', width: 80, vertAlign: "middle", minWidth: 80, headerHozAlign: "center" },
        { title: "Tên loại hình doanh nghiệp", field: "TenLoaiHinhDN", formatter: 'textarea', hozAlign: "left", width: 400, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Diễn giải", field: "DienGiai", formatter: 'textarea', hozAlign: "left", minWidth: 300, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 150, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThaiText", hozAlign: "center", width: 200, formatter: 'textarea', headerSort: false, vertAlign: "middle", headerHozAlign: "center", visible: false },
        { title: "LoaiHinhDNID", field: "LoaiHinhDNID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataTable() {

    Grid1.clearData();
    const GetAll = NTS.getAjax("/DanhMuc/LoaiHinhDoanhNghiep/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

checkDangSD('.checkDangSD', 'LoaiHinhDN', 'LoaiHinhDNID');

$('#TrangThai').on('change', function () {
    UpdateLabelDangSD(this);
});

$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        Grid1.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid1.setFilter(matchAny, { value: $('#timKiem').val() });
});

$(document).on('click', '#btnThemMoi', function () {
    $('#lblTieuDeThemMoi').text('Thêm mới loại hình doanh nghiệp');
    $('#mdThemMoi').modal('show');
    $('#MaLoaiHinhDN').value('');
    $('#TenLoaiHinhDN').value('');
    $('#LoaiHinhDNID').value('');
    $('#DienGiai').value('');
    $('#TrangThai').value(true);
    UpdateLabelDangSD('#TrangThai');
    tempthem = 'them';
    return false;
});

Grid1.on("rowDblClick", function (e, row) {
    $('#LoaiHinhDNID').val(row.getData().LoaiHinhDNID);
    SuaDuLieu(row.getData().LoaiHinhDNID);
});

function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#lblTieuDeThemMoi').text('Cập nhật loại hình doanh nghiệp');
    const result = NTS.getAjax('/DanhMuc/LoaiHinhDoanhNghiep/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#LoaiHinhDNID').value(data.LoaiHinhDNID);
        $('#MaLoaiHinhDN').value(data.MaLoaiHinhDN);
        $('#TenLoaiHinhDN').value(data.TenLoaiHinhDN);
        $('#DienGiai').value(data.DienGiai);
        $('#TrangThai').value(data.TrangThai);
        UpdateLabelDangSD('#TrangThai');
        $('#mdThemMoi').modal('show');
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
}

// Ngăn chặn nhập ký tự đặc biệt và khoảng trắng
$(document).on('input', '#MaLoaiHinhDN', function (event) {
    const value = $(this).val();

    // Lọc các ký tự không hợp lệ
    const filteredValue = value.split('').filter(char => KiemTraKyTuHopLe(char)).join('');

    // Cập nhật giá trị của input với các ký tự hợp lệ
    $(this).val(filteredValue);
});

$(document).on('click', '#btnLuuVaDong', function () {
    const validate = new NTSValidate('#mdThemMoi');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }

    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#LoaiHinhDNID').value();
    saveData[2] = $('#MaLoaiHinhDN').value();
    saveData[3] = $('#TenLoaiHinhDN').value();
    saveData[4] = $('#DienGiai').value();
    saveData[5] = $('#TrangThai').value();
    var result = NTS.getAjax('/DanhMuc/LoaiHinhDoanhNghiep/LuuThongTin', { data: saveData });
    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        $('#mdThemMoi').modal('hide');
        return false;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});

$(document).on('click', '.btnSuaGrid1', function () {
    $('#LoaiHinhDNID').val($(this).attr('data'));
    SuaDuLieu($(this).attr('data'));
});

$(document).on('click', '.btnXoaGrid1', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieu(ID);
});


function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'LoaiHinhDNID', ID: ID, TenBangHienTai: 'LoaiHinhDN', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/LoaiHinhDoanhNghiep/XoaDuLieu', { id: ID });
                if (!result.Err) {
                    LoadDataTable();
                    NTS.thanhcong(result.Msg);
                }
                else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            });
        }
        else CanhBaoDuLieuDangSD(result_ktxoa.Result);
    }
    // Lỗi khi kiểm tra xóa
    else result_ktxoa.CanhBao ? NTS.canhbao(result_ktxoa.Msg) : NTS.loi(result_ktxoa.Msg);
}
////in
$('#btnPrint').on('click', function () {
    Grid1.hideColumn('TrangThai');
    Grid1.showColumn('TrangThaiText');
    Grid1.print(false, true);
    Grid1.showColumn('TrangThai');
    Grid1.hideColumn('TrangThaiText');
    return false;
});
//xuat excel
var dulieuloc = "";
//$('#btnExport').on('click', async function () {
//    Grid1.hideColumn('ThaoTac');
//    Grid1.hideColumn('TrangThai');
//    Grid1.showColumn('TrangThaiText');
//    Grid1.download("xlsx", "DanhMuc.xlsx", { sheetName: "DuLieu" });
//    Grid1.showColumn('ThaoTac');
//    Grid1.showColumn('TrangThai');
//    Grid1.hideColumn('TrangThaiText');
//});
/////////// PHÍM TẮT /////////
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
$('#btnExport').on('click', async function () {
    const data = Grid1.getData();
    const filteredData = data.filter(
        // lấy dữ liệu theo bộ lọc
        item => (item.MaLoaiHinhDN == null ? "" : item.MaLoaiHinhDN.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.TenLoaiHinhDN == null ? "" : item.TenLoaiHinhDN.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.DienGiai == null ? "" : item.DienGiai.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
    );
    var chuoidulieu = JSON.stringify(filteredData).replaceAll('null', '""').replaceAll('true', '"Đang sử dụng"').replaceAll('false', '""');
    // cấu hình tên cột để xuất
    // thứ tự mảng này quết định thứ tự cột xuất ra
    var TenCot = [
        { 'datafil': 'MaLoaiHinhDN', 'TenCot': 'Mã', 'DoRong': '10', 'CanhLe': 'Left' },
        { 'datafil': 'TenLoaiHinhDN', 'TenCot': 'Tên loại hình doanh nghiệp', 'DoRong': '40', 'CanhLe': 'Left' },
        { 'datafil': 'DienGiai', 'TenCot': 'Diễn giải', 'DoRong': '30', 'CanhLe': 'Left' },
        { 'datafil': 'TrangThai', 'TenCot': 'Trạng thái sử dụng', 'DoRong': '17', 'CanhLe': 'Center' }]
    var result = await NTS.getAjaxAsync('/DanhMuc/DungChung/XuatDataExcel', { Cot: JSON.stringify(TenCot), Data: chuoidulieu, TenFile: 'Danh sách loại hình doanh nghiệp' });
    if (result != "") {
        window.open(result);
    }
});