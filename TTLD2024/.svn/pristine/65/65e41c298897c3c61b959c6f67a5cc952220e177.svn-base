////const { debug } = require("node:util");

var tempthem = "them";
$(function () {
    LoadDataTable();
    checkMacDinhSD('.checkMacDinhSD', 'HopHoSo', 'HopHoSoID');
    setTimeout(() => { LoadCombo() }, 200);
    //$('#reservationdate').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' });    
});
function LoadCombo() {
    NTS.loadDataCombo({
        name: '#KhoLuuTruID',
        ajaxUrl: '/DanhMuc/DungChung/GetKhoLuuTru_Combo',
        columns: 2,
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#KeLuuTruID',
        ajaxUrl: '/DanhMuc/DungChung/GetKeLuuTru_Combo',
        columns: 2,
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
}
var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().HopHoSoID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().HopHoSoID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().HopHoSoID);
}
var Grid1 = new Tabulator("#Grid1", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "80vh",
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', formatter: fmThaoTac, headerSort: false, headerHozAlign: "Center", hozAlign: "center", vertAlign: "middle", field: "ThaoTac", width: 60, print: false },
        { title: "Mã", field: "MaHopHoSo", formatter: 'textarea', width: 80, vertAlign: "middle", minWidth: 80, headerHozAlign: "center" },
        { title: "Tên hộp hồ sơ", field: "TenHopHoSo", formatter: 'textarea', hozAlign: "left", minWidth: 270, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Kho lưu trữ", field: "TenKhoLuuTru", formatter: 'textarea', hozAlign: "left", width: 135, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Kệ lưu trữ", field: "TenKeLuuTru", formatter: 'textarea', hozAlign: "left", width: 135, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Thời gian bắt đầu", field: "ThoiGianBatDau", formatter: 'textarea', hozAlign: "center", width: 150, vertAlign: "middle", headerHozAlign: "center", headerSort: false },
        { title: "Thời gian kết thúc", field: "ThoiGianKetThuc", formatter: 'textarea', hozAlign: "center", width: 150, vertAlign: "middle", headerHozAlign: "center", headerSort: false },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 150, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThaiText", hozAlign: "center", width: 200, formatter: 'textarea', headerSort: false, vertAlign: "middle", headerHozAlign: "center", visible: false },
        { title: "HopHoSoID", field: "HopHoSoID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataTable() {

    Grid1.clearData();
    const GetAll = NTS.getAjax("/DanhMuc/HopHoSo/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

checkDangSD('.checkDangSD', 'HopHoSo', 'HopHoSoID');

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
    $('#lblTieuDeThemMoi').text('Thêm mới thông tin hộp hồ sơ');
    $('#mdThemMoi').modal('show');
    NTS.hienNgayHienTaiLenTextbox('ThoiGianBatDau')
    NTS.hienNgayHienTaiLenTextbox('ThoiGianKetThuc')
    $('#MaHopHoSo').value('');
    $('#TenHopHoSo').value('');
    $('#KhoLuuTruID').value('');
    $('#KeLuuTruID').value('');
    $('#HopHoSoID').value('');
    $('#DienGiai').value('');
    $('#TrangThai').value(true);
    UpdateLabelDangSD('#TrangThai');
    tempthem = 'them';
    return false;
});

Grid1.on("rowDblClick", function (e, row) {
    $('#HopHoSoID').val(row.getData().HopHoSoID);
    SuaDuLieu(row.getData().HopHoSoID);
});

function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#lblTieuDeThemMoi').text('Cập nhật thông tin hộp hồ sơ');
    const result = NTS.getAjax('/DanhMuc/HopHoSo/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#HopHoSoID').value(data.HopHoSoID);
        $('#MaHopHoSo').value(data.MaHopHoSo);
        $('#TenHopHoSo').value(data.TenHopHoSo);
        $('#KhoLuuTruID').value(data.KhoLuuTruID);
        $('#KeLuuTruID').value(data.KeLuuTruID);
        $('#ThoiGianBatDau').value(data.ThoiGianBatDau);
        $('#ThoiGianKetThuc').value(data.ThoiGianKetThuc);
        $('#DienGiai').value(data.DienGiai);
        $('#TrangThai').value(data.TrangThai);
        UpdateLabelDangSD('#TrangThai');
        $('#mdThemMoi').modal('show');
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
}

$(document).on('click', '#btnLuuVaDong', function () {
    const validate = new NTSValidate('#mdThemMoi');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }
    if (KiemTraKhongCoKyTuDacBiet($('#MaHopHoSo').value())) {
        return NTS.canhbao("Mã không được chứa ký tự đăc biệt!")
    }

    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#HopHoSoID').value();
    saveData[2] = $('#MaHopHoSo').value();
    saveData[3] = $('#TenHopHoSo').value();
    saveData[4] = $('#KhoLuuTruID').value();
    saveData[5] = $('#KeLuuTruID').value();
    saveData[6] = $('#ThoiGianBatDau').value();
    saveData[7] = $('#ThoiGianKetThuc').value();
    saveData[8] = $('#DienGiai').value();
    saveData[9] = $('#TrangThai').value();
    var result = NTS.getAjax('/DanhMuc/HopHoSo/LuuThongTin', { data: saveData });
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
    $('#HopHoSoID').val($(this).attr('data'));
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
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'HopHoSoID', ID: ID, TenBangHienTai: 'HopHoSo', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/HopHoSo/XoaDuLieu', { id: ID });
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
$('#btnExport').on('click', async function () {
    Grid1.hideColumn('ThaoTac');
    Grid1.hideColumn('TrangThai');
    Grid1.showColumn('TrangThaiText');
    Grid1.download("xlsx", "DanhMuc.xlsx", { sheetName: "DuLieu" });
    Grid1.showColumn('ThaoTac');
    Grid1.showColumn('TrangThai');
    Grid1.hideColumn('TrangThaiText');
});
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
