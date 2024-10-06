var tempthem = "them";
$(function () {
    LoadDataTable();
    checkMacDinhSD('.checkMacDinhSD', 'NgheNghiep', 'NgheNghiepID');
});

function LoadCombo() {
    //NTS.loadDataCombo({
    //    name: '#NganhKinhTeID_cha',
    //    ajaxUrl: '/DanhMuc/DungChung/GetNganhKinhTe_Combo',
    //    ajaxParam: {data: [$('#NganhKinhTeID').val(), $('#CapID').val()]},
    //    columns: 2,
    //    indexValue: 0,
    //    indexText: 1,
    //    indexText1: 2,
    //    textShowTatCa: '-Chọn-',
    //    showTatCa: !0,
    //});
    NTS.loadDataCombo({
        name: '#CapID',
        ajaxUrl: '/DanhMuc/DungChung/GetCap_Combo',
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
}

$("#CapID").change(function () {
    NTS.loadDataCombo({
        name: '#NgheNghiepID_Cha',
        ajaxUrl: '/DanhMuc/DungChung/GetNgheNghiep_Combo',
        ajaxParam: { data: [$('#NgheNghiepID').val(), $(this).val()] },
        columns: 2,
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
});

var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().NgheNghiepID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().NgheNghiepID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().NgheNghiepID);
}
var Grid1 = new Tabulator("#Grid1", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "80vh",
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', formatter: fmThaoTac, headerSort: false, headerHozAlign: "Center", hozAlign: "center", vertAlign: "middle", field: "ThaoTac", width: 60, print: false },
        { title: "Cấp 1", field: "Cap1", formatter: 'textarea', width: 70, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Cấp 2", field: "Cap2", formatter: 'textarea', width: 70, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Cấp 3", field: "Cap3", formatter: 'textarea', width: 70, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Cấp 4", field: "Cap4", formatter: 'textarea', width: 70, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Cấp 5", field: "Cap5", formatter: 'textarea', width: 70, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Tên nghề nghiệp", field: "TenNgheNghiep", formatter: 'textarea', hozAlign: "left", width: 472, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Diễn giải", field: "DienGiai", formatter: 'textarea', hozAlign: "left", minWidth: 383, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 150, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThaiText", hozAlign: "center", width: 200, formatter: 'textarea', headerSort: false, vertAlign: "middle", headerHozAlign: "center", visible: false },
        { title: "NgheNghiepID", field: "NgheNghiepID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/DanhMuc/NgheNghiep/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

checkDangSD('.checkDangSD', 'NgheNghiep', 'NgheNghiepID');

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
    LoadCombo();
    $('#lblTieuDeThemMoi').text('Thêm mới nghề nghiệp');
    $('#mdThemMoi').modal('show');
    $('#MaNgheNghiep').value('');
    $('#TenNgheNghiep').value('');
    $('#NgheNghiepID').value('');
    $('#CapID').value('');
    $('#NgheNghiepID_Cha').value('');
    $('#DienGiai').value('');
    $('#TrangThai').value(true);
    UpdateLabelDangSD('#TrangThai');
    tempthem = 'them';
    return false;
});

Grid1.on("rowDblClick", function (e, row) {
    $('#NgheNghiepID').val(row.getData().NgheNghiepID);
    SuaDuLieu(row.getData().NgheNghiepID);
});

function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }

    $('#lblTieuDeThemMoi').text('Cập nhật nghề nghiệp');
    LoadCombo();
    const result = NTS.getAjax('/DanhMuc/NgheNghiep/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#mdThemMoi').modal('show');
        $('#NgheNghiepID').value(data.NgheNghiepID);
        $('#MaNgheNghiep').value(data.MaNgheNghiep);
        $('#TenNgheNghiep').value(data.TenNgheNghiep);
        $('#CapID').value(data.CapID);
        $('#NgheNghiepID_Cha').value(data.NgheNghiepID_Cha);
        $('#DienGiai').value(data.DienGiai);
        $('#TrangThai').value(data.TrangThai);
        UpdateLabelDangSD('#TrangThai');
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
}

// Ngăn chặn nhập ký tự đặc biệt và khoảng trắng
$(document).on('input', '#MaNgheNghiep', function (event) {
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
    saveData[1] = $('#NgheNghiepID').value();
    saveData[2] = $('#MaNgheNghiep').value();
    saveData[3] = $('#TenNgheNghiep').value();
    saveData[4] = $('#DienGiai').value();
    saveData[5] = $('#TrangThai').value();
    saveData[6] = $('#CapID').value();
    saveData[7] = $('#NgheNghiepID_Cha').value();
    var result = NTS.getAjax('/DanhMuc/NgheNghiep/LuuThongTin', { data: saveData });
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
    $('#NgheNghiepID').val($(this).attr('data'));
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
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'NgheNghiepID', ID: ID, TenBangHienTai: 'NgheNghiep', CacBangKhongXet: [] });
    const result_ktxoa1 = NTS.getAjax('/DanhMuc/NgheNghiep/KiemTraXoa', { ID: ID });
    console.log(result_ktxoa)
    if (!result_ktxoa.Err) {
        if ((result_ktxoa.Result == null || result_ktxoa.Result == "") && result_ktxoa1.Result[0].KT == 0) {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/NgheNghiep/XoaDuLieu', { id: ID });
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
