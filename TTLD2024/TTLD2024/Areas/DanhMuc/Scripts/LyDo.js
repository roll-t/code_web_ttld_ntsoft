﻿var tempthem = "them";
$(function () {
    LoadDataTable();
    checkMacDinhSD('.checkMacDinhSD', 'LyDo', 'LyDoID');
    //$('#reservationdate').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' });
});


var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().LyDoID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().LyDoID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().LyDoID);
}
var Grid1 = new Tabulator("#Grid1", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "80vh",
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', formatter: fmThaoTac, headerSort: false, headerHozAlign: "Center", hozAlign: "center", vertAlign: "middle", field: "ThaoTac", width: 60, print: false },
        { title: "Mã", field: "MaLyDo", formatter: 'textarea', width: 80, vertAlign: "middle", minWidth: 80, headerHozAlign: "center" },
        { title: "Tên lý do không tham gia hoạt động kinh tế", field: "TenLyDo", formatter: 'textarea', hozAlign: "left", width: 400, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Diễn giải", field: "DienGiai", formatter: 'textarea', hozAlign: "left", minWidth: 350, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 150, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThaiText", hozAlign: "center", width: 200, formatter: 'textarea', headerSort: false, vertAlign: "middle", headerHozAlign: "center", visible: false },
        { title: "LyDoID", field: "LyDoID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/DanhMuc/LyDo/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

checkDangSD('.checkDangSD', 'LyDo', 'LyDoID');

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
    $('#lblTieuDeThemMoi').text('Thêm mới lý do không tham gia hoạt động kinh tế');
    $('#mdThemMoi').modal('show');
    $('#MaLyDo').value('');
    $('#TenLyDo').value('');
    $('#LyDoID').value('');
    $('#DienGiai').value('');
    $('#TrangThai').value(true);
    UpdateLabelDangSD('#TrangThai');
    tempthem = 'them';
    return false;
});

Grid1.on("rowDblClick", function (e, row) {
    $('#LyDoID').val(row.getData().LyDoID);
    SuaDuLieu(row.getData().LyDoID);
});

function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }

    $('#lblTieuDeThemMoi').text('Cập nhật lý do không tham gia hoạt động kinh tế');
    const result = NTS.getAjax('/DanhMuc/LyDo/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#LyDoID').value(data.LyDoID);
        $('#MaLyDo').value(data.MaLyDo);
        $('#TenLyDo').value(data.TenLyDo);
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

    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#LyDoID').value();
    saveData[2] = $('#MaLyDo').value();
    saveData[3] = $('#TenLyDo').value();
    saveData[4] = $('#DienGiai').value();
    saveData[5] = $('#TrangThai').value();
    var result = NTS.getAjax('/DanhMuc/LyDo/LuuThongTin', { data: saveData });
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
    $('#LyDoID').val($(this).attr('data'));
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
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'LyDoID', ID: ID, TenBangHienTai: 'LyDo', CacBangKhongXet: [] });
    console.log(result_ktxoa)
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/LyDo/XoaDuLieu', { id: ID });
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
//in
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
