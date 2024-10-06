var tempthem = "them";
$(function () {
    LoadDataTable();
    checkMacDinhSD('.checkMacDinhSD', 'DieuKienLamViec', 'DieuKienLamViecID');

});

function LoadCombo() {
    NTS.loadDataCombo({
        name: '#NhomDieuKienLVID',
        ajaxUrl: '/DanhMuc/DungChung/GetNhomDieuKienLV_Combo',
        columns: 2,
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
}

var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().DieuKienLamViecID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().DieuKienLamViecID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().DieuKienLamViecID);
}
function customNumberFormatter(cell, formatterParams, onRendered) {
    var value = cell.getValue();//( dieukien ) ? ( đúng ) : ( sai );
    if (value != null) {
        if (value.toString().split(".").length > 1) {
            var formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").replaceAll('.', ',');
        } else {
            var formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        return formattedValue;
    } else {
        return "";
    }
}
var Grid1 = new Tabulator("#Grid1", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: window.innerHeight * 79 / 100,
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', formatter: fmThaoTac, headerSort: false, headerHozAlign: "Center", hozAlign: "center", vertAlign: "middle", field: "ThaoTac", width: 60, print: false},
        { title: "Mã", field: "MaDieuKienLamViec", formatter: 'textarea', width: 80, vertAlign: "middle", minWidth: 80, headerHozAlign: "center" },
        //{ title: "Điều Kiện Làm Việc ID", field: "MaDieuKienLamViec", formatter: 'textarea', width: 200, vertAlign: "middle", minWidth: 80, headerHozAlign: "center" },
        { title: "Tên điều kiện làm việc", field: "TenDieuKienLamViec", formatter: 'textarea', hozAlign: "left", width: 300, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Nhóm điều kiện làm việc", field: "TenNhomDieuKienlV", formatter: 'textarea', hozAlign: "left", width: 300, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Diễn giải", field: "DienGiai", formatter: 'textarea', hozAlign: "left", minWidth: 300, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 150, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThaiText", hozAlign: "center", width: 200, formatter: 'textarea', headerSort: false, vertAlign: "middle", headerHozAlign: "center", visible: false },
        { title: "DieuKienLamViecID", field: "DieuKienLamViecID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
// load dữ liệu lên lưới
function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/DanhMuc/DieuKienLamViec/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

checkDangSD('.checkDangSD', 'DieuKienLamViec', 'DieuKienLamViecID');

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
// sự kiện click vào button thêm mới
$(document).on('click', '#btnThemMoi', function () {
    $('#MaDieuKienLamViec').prop('disabled', false);
    $('#lblTieuDeThemMoi').text('Thêm mới thông tin điều kiện làm việc');
    LoadCombo();
    $('#mdThemMoi').modal('show');
    $('#MaDieuKienLamViec').value('');
    $('#TenDieuKienLamViec').value('');
    $('#DieuKienLamViecID').value('');
    $('#DienGiai').value('');
    $('#TrangThai').value(true);
    $('#NhomDieuKienLVID').value('');
    UpdateLabelDangSD('#TrangThai');
    tempthem = 'them';
    return false;
});

Grid1.on("rowDblClick", function (e, row) {
    $('#DieuKienlamViecID').val(row.getData().DieuKienlamViecID);
    SuaDuLieu(row.getData().DieuKienLamViecID);
});
// sửa dữ liệu
function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#lblTieuDeThemMoi').text('Cập nhật thông tin điều kiện làm việc');
    resetForm('#mdThemMoi');
    LoadCombo();
    const result = NTS.getAjax('/DanhMuc/DieuKienLamViec/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#DieuKienLamViecID').value(data.DieuKienLamViecID);
        $('#MaDieuKienLamViec').value(data.MaDieuKienLamViec);
        $('#TenDieuKienLamViec').value(data.TenDieuKienLamViec);
        $('#DienGiai').value(data.DienGiai);
        $('#TrangThai').value(data.TrangThai);
        $('#NhomDieuKienLVID').value(data.NhomDieuKienLVID);
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
    
    // lưu dữ liệu
    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#DieuKienLamViecID').value();
    saveData[2] = $('#MaDieuKienLamViec').value();
    saveData[3] = $('#TenDieuKienLamViec').value();
    saveData[4] = $('#DienGiai').value();
    saveData[5] = $('#TrangThai').value();
    saveData[6] = $('#NhomDieuKienLVID').value();
    var result = NTS.getAjax('/DanhMuc/DieuKienLamViec/LuuThongTin', { data: saveData });
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
    $('#DieuKienLamViecID').val($(this).attr('data'));
    SuaDuLieu($(this).attr('data'));
});

$(document).on('click', '.btnXoaGrid1', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieu(ID);
});
// xóa dữ liệu
function XoaDuLieu(ID) {
    debugger
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'DieuKienLamViecID', ID: ID, TenBangHienTai: 'DieuKienLamViec', CacBangKhongXet: [] });
    //console.log(result_ktxoa)
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/DieuKienlamViec/XoaDuLieu', { id: ID });
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

