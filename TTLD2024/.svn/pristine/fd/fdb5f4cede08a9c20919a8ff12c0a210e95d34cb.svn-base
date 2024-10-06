var tempthem = "them";
$(function () {
    LoadDataTable();
    checkMacDinhSD('.checkMacDinhSD', 'ChuyenNganhDaoTao', 'ChuyenNganhDaoTaoID');
});

function LoadCombo() {
    NTS.loadDataCombo({
        name: '#ChuyenNganhDaoTaoID_Cha',
        ajaxUrl: '/DanhMuc/DungChung/GetChuyenNganhDaoTao_Combo',
        ajaxParam: { id: $('#ChuyenNganhDaoTaoID').value() },
        columns: 2,
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
}


var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().ChuyenNganhDaoTaoID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().ChuyenNganhDaoTaoID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().ChuyenNganhDaoTaoID);
}
var Grid1 = new Tabulator("#Grid1", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "80vh",
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', formatter: fmThaoTac, headerSort: false, headerHozAlign: "Center", hozAlign: "center", vertAlign: "middle", field: "ThaoTac", width: 60, print: false },
        { title: "Mã", field: "MaChuyenNganhDaoTao", formatter: 'textarea', width: 80, vertAlign: "middle", minWidth: 80, headerHozAlign: "center" },
        { title: "Tên chuyên ngành đào tạo", field: "TenChuyenNganhDaoTao", formatter: 'textarea', hozAlign: "left", width: 472, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Diễn giải", field: "DienGiai", formatter: 'textarea', hozAlign: "left", minWidth: 383, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 150, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThaiText", hozAlign: "center", width: 200, formatter: 'textarea', headerSort: false, vertAlign: "middle", headerHozAlign: "center", visible: false },
        { title: "ChuyenNganhDaoTaoID", field: "ChuyenNganhDaoTaoID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/DanhMuc/ChuyenNganhDaoTao/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

checkDangSD('.checkDangSD', 'ChuyenNganhDaoTao', 'ChuyenNganhDaoTaoID');

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
    $('#lblTieuDeThemMoi').text('Thêm mới chuyên ngành đào tạo');
    $('#mdThemMoi').modal('show');
    $('#MaChuyenNganhDaoTao').value('');
    $('#TenChuyenNganhDaoTao').value('');
    $('#ChuyenNganhDaoTaoID').value('');
    $('#ChuyenNganhDaoTaoID_Cha').value('');
    $('#DienGiai').value('');
    $('#TrangThai').value(true);
    UpdateLabelDangSD('#TrangThai');
    tempthem = 'them';
    return false;
});

Grid1.on("rowDblClick", function (e, row) {
    $('#ChuyenNganhDaoTaoID').val(row.getData().ChuyenNganhDaoTaoID);
    SuaDuLieu(row.getData().ChuyenNganhDaoTaoID);
});

function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }
    LoadCombo();
    $('#lblTieuDeThemMoi').text('Cập nhật chuyên ngành đào tạo');
    const result = NTS.getAjax('/DanhMuc/ChuyenNganhDaoTao/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#ChuyenNganhDaoTaoID').value(data.ChuyenNganhDaoTaoID);
        $('#MaChuyenNganhDaoTao').value(data.MaChuyenNganhDaoTao);
        $('#TenChuyenNganhDaoTao').value(data.TenChuyenNganhDaoTao);
        $('#ChuyenNganhDaoTaoID_Cha').value(data.ChuyenNganhDaoTaoID_Cha);
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

    if (KiemTraKhongCoKyTuDacBiet($('#MaChuyenNganhDaoTao').value())) {
        return NTS.canhbao("Mã không được chứa ký tự đặc biệt!");
    }


    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#ChuyenNganhDaoTaoID').value();
    saveData[2] = $('#MaChuyenNganhDaoTao').value();
    saveData[3] = $('#TenChuyenNganhDaoTao').value();
    saveData[4] = $('#ChuyenNganhDaoTaoID_Cha').value();
    saveData[5] = $('#DienGiai').value();
    saveData[6] = $('#TrangThai').value();
    var result = NTS.getAjax('/DanhMuc/ChuyenNganhDaoTao/LuuThongTin', { data: saveData });
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
    $('#ChuyenNganhDaoTaoID').val($(this).attr('data'));
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
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'ChuyenNganhDaoTaoID', ID: ID, TenBangHienTai: 'ChuyenNganhDaoTao', CacBangKhongXet: [] });
    const result_ktxoa1 = NTS.getAjax('/DanhMuc/ChuyenNganhDaoTao/KiemTraXoa', { ID: ID });
    console.log(result_ktxoa)
    if (!result_ktxoa.Err) {
        if ((result_ktxoa.Result == null || result_ktxoa.Result == "") && result_ktxoa1.Result[0].KT == 0) {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/ChuyenNganhDaoTao/XoaDuLieu', { id: ID });
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

