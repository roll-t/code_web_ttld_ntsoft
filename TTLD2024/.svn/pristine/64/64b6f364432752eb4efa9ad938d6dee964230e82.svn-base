var tempthem = "them";
$(function () {
    LoadDataTable();
    checkMacDinhSD('.checkMacDinhSD', 'Chuong', 'ChuongID');
    //$('#reservationdate').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' });
});

function LoadCombo() {
    NTS.loadDataCombo({
        name: '#CapChuongID',
        ajaxUrl: '/DanhMuc/Chuong/GetCapChuong',
        columns: 2,
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
}

var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().ChuongID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().ChuongID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().ChuongID);
}
var Grid1 = new Tabulator("#Grid1", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: window.innerHeight * 79 / 100,
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', formatter: fmThaoTac, headerSort: false, headerHozAlign: "Center", hozAlign: "center", vertAlign: "middle", field: "ThaoTac", width: 60, print: false },
        //{ title: "Mã", field: "MaChuong", formatter: 'textarea', width: 80, vertAlign: "middle", minWidth: 80, headerHozAlign: "center" },
        {//create column group
            title: "Mã", headerHozAlign: "center", vertAlign: "middle", hozAlign: "center",
            columns: [
                { title: "Cấp Trung ương", field: "CapTrungUong", formatter: 'textarea', width: 60, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center", },
                { title: "Cấp tỉnh", field: "CapTinh", formatter: 'textarea', width: 60, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center", },
                { title: "Cấp huyện", field: "CapHuyen", formatter: 'textarea', width: 60, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center", },
                { title: "Cấp xã", field: "CapXa", formatter: 'textarea', width: 60, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center", },
            ],
        },
        { title: "Tên chương", field: "TenChuong", formatter: 'textarea', hozAlign: "left", width: 400, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Cấp chương", field: "TenCapChuong", formatter: 'textarea', hozAlign: "left", width: 150, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Diễn giải", field: "DienGiai", formatter: 'textarea', hozAlign: "left", minWidth: 350, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 150, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "ChuongID", field: "ChuongID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/DanhMuc/Chuong/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

checkDangSD('.checkDangSD', 'MoiQuanHe', 'MoiQuanHeID');

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
    $('#MaChuong').prop('disabled', false);
    $('#lblTieuDeThemMoi').text('Thêm mới thông tin chương');
    $('#mdThemMoi').modal('show');
    $('#MaChuong').value('');
    $('#TenChuong').value('');
    $('#ChuongID').value('');
    $('#DienGiai').value('');
    $('#TrangThai').value(true);
    $('#CapChuongID').value('');
    LoadCombo();
    UpdateLabelDangSD('#TrangThai');
    tempthem = 'them';
    return false;
});

Grid1.on("rowDblClick", function (e, row) {
    $('#ChuongID').val(row.getData().ChuongID);
    SuaDuLieu(row.getData().ChuongID);
});

function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }
    LoadCombo();
    $('#lblTieuDeThemMoi').text('Cập nhật thông tin chương');
    $('#MaChuong').prop('disabled', true);
    const result = NTS.getAjax('/DanhMuc/Chuong/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#ChuongID').value(data.ChuongID);
        $('#MaChuong').value(data.MaChuong);
        $('#TenChuong').value(data.TenChuong);
        $('#DienGiai').value(data.DienGiai);
        $('#TrangThai').value(data.TrangThai);
        $('#CapChuongID').value(data.CapChuongID);
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
    saveData[1] = $('#ChuongID').value();
    saveData[2] = $('#MaChuong').value();
    saveData[3] = $('#TenChuong').value();
    saveData[4] = $('#DienGiai').value();
    saveData[5] = $('#TrangThai').value();
    saveData[6] = $('#CapChuongID').value();
    var result = NTS.getAjax('/DanhMuc/Chuong/LuuThongTin', { data: saveData });
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
    $('#ChuongID').val($(this).attr('data'));
    SuaDuLieu($(this).attr('data'));
});

$(document).on('click', '.btnXoaGrid1', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieu(ID);
});

//function XoaDuLieu(ID) {
//    if (!QuyenXoa()) {
//        return false;
//    }
//    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'ChuongID', ID: ID, TenBangHienTai: 'Chuong', CacBangKhongXet: [] });
//    console.log(result_ktxoa)
//    if (!result_ktxoa.Err) {
//        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
//            CanhBaoXoa(() => {
//                const result = NTS.getAjax('/DanhMuc/Chuong/XoaDuLieu', { id: ID });
//                if (!result.Err) {
//                    LoadDataTable();
//                    NTS.thanhcong(result.Msg);
//                }
//                else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
//            });
//        }
//        else CanhBaoDuLieuDangSD(result_ktxoa.Result);
//    }
//    // Lỗi khi kiểm tra xóa
//    else result_ktxoa.CanhBao ? NTS.canhbao(result_ktxoa.Msg) : NTS.loi(result_ktxoa.Msg);
//}
//in
$('#btnPrint').on('click', function () {
    Grid1.print(false, true);
    return false;
});
//xuat excel
var dulieuloc = "";
$('#btnExport').on('click', async function () {
    debugger
    const data = Grid1.getData();
    const filteredData = data.filter(
        // lấy dữ liệu theo bộ lọc
        item => (item.MaTinh == null ? "" : item.MaTinh.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.TenTinh == null ? "" : item.TenTinh.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.TenVietTat == null ? "" : item.TenVietTat.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.TenVietTat == null ? "" : item.TenVietTat.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.DienGiai == null ? "" : item.DienGiai.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
    );
    var chuoidulieu = JSON.stringify(filteredData).replaceAll('null', '""').replaceAll('true', '"Đang sử dụng"').replaceAll('false', '""');
    // cấu hình tên cột để xuất
    // thứ tự mảng này quết định thứ tự cột xuất ra
    var TenCot = [
        { 'datafil': 'MaChuong', 'TenCot': 'Mã', 'DoRong': '10', 'CanhLe': 'Left' },
        { 'datafil': 'TenChuong', 'TenCot': 'Tên chương', 'DoRong': '40', 'CanhLe': 'Left' },
        { 'datafil': 'DienGiai', 'TenCot': 'Diễn giải', 'DoRong': '30', 'CanhLe': 'Left' },
        { 'datafil': 'DangSD', 'TenCot': 'Trạng thái sử dụng', 'DoRong': '17', 'CanhLe': 'Center' }]
    var result = await NTS.getAjaxAsync('/QuanLy/DungChung/XuatDataExcel', { Cot: JSON.stringify(TenCot), Data: chuoidulieu, TenFile: 'Danh sách tỉnh' });
    if (result != "") {
        window.open(result);
    }
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

function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'ChuongID', ID: ID, TenBangHienTai: 'Chuong', CacBangKhongXet: [] });
    console.log(result_ktxoa)
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/Chuong/XoaDuLieu', { id: ID });
                if (!result.Err) {
                    if (result.Msg > 0) { // Msg lớn hơn 0 là có bảng dang sử dụng nó
                        CanhBaoDuLieuDangSD(result.Result);
                    }
                    else {
                        LoadDataTable();
                        NTS.thanhcong(result.Msg);
                    }
                } else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            });
        }
        else CanhBaoDuLieuDangSD(result_ktxoa.Result);
    }
    // Lỗi khi kiểm tra xóa
    else result_ktxoa.CanhBao ? NTS.canhbao(result_ktxoa.Msg) : NTS.loi(result_ktxoa.Msg);
}