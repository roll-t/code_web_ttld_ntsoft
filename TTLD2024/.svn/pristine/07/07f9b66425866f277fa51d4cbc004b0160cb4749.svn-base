var tempthem = "them";
$(function () {
    LoadDataTable();
    LoadTimKiem_us();
    setTimeout(() => {
        $('#DiaBanHanhChinhID_Loai').select2({ width: '100%' });
        $('#Loai').select2({ width: '100%' });
    }, 500);
});
//TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiemNangCao', function () {
    if ($('#KhungTimKiem').css('display') == "block") {
        $('#KhungTimKiem').slideUp(200);
    } else {
        $('#KhungTimKiem').slideDown(200);
        /*LoadTimKiem();*/
    }
    return false;
});
$(document).on('click', '#TimKiem', function () {
    LoadDataTable();
    $('#KhungTimKiem').slideUp(200);
    return false;
});
$(document).on('click', '#DongTimKiem', function () {
    $('#KhungTimKiem').slideUp(200);
    return false;
});
function LoadTimKiem_us() {
    setTimeout(function () {
        NTS.loadDataCombo({
            name: '#TinhID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCTinh_Combo',
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '(Tất cả)',
            showTatCa: !0
        });
        NTS.loadDataCombo({
            name: '#HuyenID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
            ajaxParam: { id: '' },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '(Tất cả)',
            showTatCa: !0
        });
        NTS.loadDataCombo({
            name: '#XaID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
            ajaxParam: { id: '' },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '(Tất cả)',
            showTatCa: !0
        });
        NTS.loadDataCombo({
            name: '#Loai_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetLoaiDiaBan_Combo',
            ajaxParam: { id: '' },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '(Tất cả)',
            showTatCa: !0
        });     
    }, 100);

}

$(document).on('change', '#TinhID_TimKiem_us', function () {
    NTS.loadDataCombo({
        name: '#HuyenID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
        ajaxParam: { id: $('#TinhID_TimKiem_us').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '(Tất cả)',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#XaID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: '' },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '(Tất cả)',
        showTatCa: !0
    });
});
$(document).on('change', '#HuyenID_TimKiem_us', function () {
    NTS.loadDataCombo({
        name: '#XaID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: $('#HuyenID_TimKiem_us').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '(Tất cả)',
        showTatCa: !0
    });
});

$('#Loai').on('change', function () {
    if ($('#Loai').select2('data')[0].text == "01" || $('#Loai').select2('data')[0].text == "") {
        NTS.loadDataCombo({
            name: '#DiaBanHanhChinhID_Loai',
            ajaxUrl: '/DanhMuc/DiaBanHanhChinh/GetDiaBanHC',
            columns: 2,
            indexValue: 0,
            indexText: 1,
            indexText1: 2,
            textShowTatCa: '-Chọn-',
            showTatCa: !0,
            ajaxParam: { id: $('#DiaBanHanhChinhID').value(), loai: "-" }
        });

    } else if ($('#Loai').select2('data')[0].text == "02") {
        NTS.loadDataCombo({
            name: '#DiaBanHanhChinhID_Loai',
            ajaxUrl: '/DanhMuc/DiaBanHanhChinh/GetDiaBanHC',
            columns: 2,
            indexValue: 0,
            indexText: 1,
            indexText1: 2,
            textShowTatCa: '-Chọn-',
            showTatCa: !0,
            ajaxParam: { id: $('#DiaBanHanhChinhID').value(), loai: "01" }
        });
    } else if ($('#Loai').select2('data')[0].text == "03") {
        NTS.loadDataCombo({
            name: '#DiaBanHanhChinhID_Loai',
            ajaxUrl: '/DanhMuc/DiaBanHanhChinh/GetDiaBanHC',
            columns: 2,
            indexValue: 0,
            indexText: 1,
            indexText1: 2,
            textShowTatCa: '-Chọn-',
            showTatCa: !0,
            ajaxParam: { id: $('#DiaBanHanhChinhID').value(), loai: "02" }
        });
    } else if ($('#Loai').select2('data')[0].text == "04") {
        NTS.loadDataCombo({
            name: '#DiaBanHanhChinhID_Loai',
            ajaxUrl: '/DanhMuc/DiaBanHanhChinh/GetDiaBanHC',
            columns: 2,
            indexValue: 0,
            indexText: 1,
            indexText1: 2,
            textShowTatCa: '-Chọn-',
            showTatCa: !0,
            ajaxParam: { id: $('#DiaBanHanhChinhID').value(), loai: "03" }
        });
    }
});
function htmlWrapFormatter(cell, formatterParams, onRendered) {
    cell.getElement().style.whiteSpace = "pre-wrap";
    return this.emptyToSpace(cell.getValue());
}
function LoadComBo() {
    $('#DiaBanHanhChinhID_Loai').select2({ width: '100%' });
    NTS.loadDataCombo({
        name: '#Loai',
        ajaxUrl: '/DanhMuc/DiaBanHanhChinh/getLoaiDiaBan',
        columns: 2,
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#DiaBanHanhChinhID_Loai',
        ajaxUrl: '/DanhMuc/DiaBanHanhChinh/GetDiaBanHC',
        columns: 2,
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
        ajaxParam: { id: $('#DiaBanHanhChinhID').value(), loai: "-" }
    });
}
function LoadDataTable() {
    table.clearData();
    var fillData = new Array();
    fillData[0] = $('#TinhID_TimKiem_us').value();
    fillData[1] = $('#HuyenID_TimKiem_us').value();
    fillData[2] = $('#XaID_TimKiem_us').value();
    fillData[3] = $('#Loai_TimKiem_us').value();
    const GetAll = NTS.getAjax("/DanhMuc/DiaBanHanhChinh/GetAll", { data: fillData });
    if (!GetAll.Err) {
        table.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}
// sửa DangSD, MacDinhSD trực tiếp trên lưới
checkDangSD('.checkDangSD', 'DiaBanHC', 'DiaBanHCID');
$('#DangSD').on('change', function () {
    UpdateLabelDangSD(this);
});

var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().DiaBanHCID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().DiaBanHCID);
}
var table = new Tabulator("#Grid1", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: '80vh',
    HeaderVertAlign: "center",
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', headerHozAlign: "center", hozAlign: "center", formatter: fmThaoTac, width: 60, headerSort: false, frozen: true, vertAlign: "middle", print: false },
        {//create column group
            title: "Mã", headerHozAlign: "center", vertAlign: "middle", hozAlign: "center",
            columns: [
                { title: "Tỉnh", field: "MaTinh", formatter: 'textarea', width: 100, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center", },
                { title: "Huyện", field: "MaHuyen", formatter: 'textarea', width: 100, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center", },
                { title: "Xã", field: "MaXa", formatter: 'textarea', width: 100, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center", },
                { title: "Thôn/ấp", field: "MaThon", formatter: 'textarea', width: 100, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center", },
            ],
        },
        { title: "Tên địa bàn hành chính", field: "TenDiaBan", formatter: "textarea", headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 200 },
        { title: "Thuộc địa bàn hành chính", field: "TenDiaBan_Cha", formatter: "textarea", headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 200 },
        { title: "Loại địa bàn", field: "Loai", formatter: "textarea", headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", width: 110 },
        { title: "Diễn giải", field: "DienGiai", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 400 },
        { title: "Trạng thái sử dụng", field: "TrangThai", headerWordWrap: true, hozAlign: "center", vertAlign: "middle", formatter: fmDangSD, headerSort: false, width: 135, headerHozAlign: "center" }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu'
});

table.on("rowDblClick", function (e, row) {
    $('#DiaBanHanhChinhID').val(row.getData().DiaBanHCID);
    SuaDuLieu(row.getData().DiaBanHCID);
});
$(document).on('click', '#btnThemMoi', function () {
    if (!QuyenThem()) {
        return false;
    }
    ThemDuLieu();
});
$(document).on('click', '.btnSuaGrid1', function () {
    $('#DiaBanHanhChinhID').val($(this).attr('data'));
    SuaDuLieu($(this).attr('data'));
});
$(document).on('click', '.btnXoaGrid1', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieu(ID);
});

function ThemDuLieu() {
    $('#mdThemMoi').modal('show');
    $('#lblTieuDeThemMoi').text("Thêm mới thông tin địa bàn hành chính");
    $('#DiaBanHanhChinhID').val("");
    $('#DiaBanHanhChinhID_Loai').value("");
    LoadComBo();
    resetForm('#mdThemMoi');
    $('#DangSD').value(1);
    UpdateLabelDangSD('#DangSD');
    $('#MaDiaBanHanhChinh').value("");
    $('#DiaBanHanhChinhID_Loai').prop('disabled', false);
    tempthem = "them";
}
function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#lblTieuDeThemMoi').text('Cập nhật thông tin địa bàn hành chính');
    const result = NTS.getAjax('/DanhMuc/DiaBanHanhChinh/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        LoadComBo();
        $('#Loai').value(data.LoaiDiaBanID);
        $('#MaDiaBanHanhChinh').value(data.MaDiaBanHC);
        $('#TenDiaBanHanhChinh').value(data.TenDiaBan);
        $('#DangSD').value(data.TrangThai);
        $('#DiaBanHanhChinhID_Loai').value(data.DiaBanHCID_Cha);
        UpdateLabelDangSD('#DangSD');
        $('#DienGiai').value(data.DienGiai);
        $('#DiaBanHanhChinhID').value(data.DiaBanHCID);
        $('#mdThemMoi').modal('show');
        tempthem = "sua";
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
}
function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }

    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT_CotCha', { TenCot: 'DiaBanHCID', TenCot_Cha: 'DiaBanHCID_Cha', ID: ID, TenBangHienTai: 'DiaBanHC', CacBangKhongXet: ['DonVi'] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/DiaBanHanhChinh/XoaDuLieu', { id: ID });
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

$('#btnLuuVaDong').on('click', function () {
    const validate = new NTSValidate('#mdThemMoi');    
    if (!validate.trim().check()) {
        return false;
    } 
    if (!validate.trim().checkSpecial()) {
        return false;
    }
    if ($('#MaDiaBanHanhChinh').value().length > 5) {
        NTS.canhbao("Mã địa bạn hành chính quá ký tự cho phép!");
        return false;
    }
    var param = new Array();
    param[0] = tempthem;
    param[1] = $('#MaDiaBanHanhChinh').value();
    param[2] = $('#TenDiaBanHanhChinh').value();
    param[3] = $('#DiaBanHanhChinhID_Loai').value();
    param[4] = $('#DienGiai').value();
    param[5] = $('#DangSD').value();
    param[6] = $('#DiaBanHanhChinhID').value();
    param[7] = $('#Loai').value();

    const result = NTS.getAjax("/DanhMuc/DiaBanHanhChinh/LuuThongTin", { data: param });

    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        $('#mdThemMoi').modal('hide');
        return false;
    } else
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
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


/// In và Xuất excel

var dulieuloc = "";

$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        dulieuloc = $(this).val();
        table.setFilter(matchAny, { value: $(this).val() });
    }
});


////in
//$('#btnPrint').on('click', function () {
//    table.hideColumn('TrangThai');
//    table.showColumn('TrangThaiText');
//    table.print(false, true);
//    table.showColumn('TrangThai');
//    table.hideColumn('TrangThaiText');
//    return false;
//});
////xuat excel
//var dulieuloc = "";
//$('#btnExport').on('click', async function () {
//    table.hideColumn('ThaoTac');
//    table.hideColumn('TrangThai');
//    table.showColumn('TrangThaiText');
//    table.download("xlsx", "DanhMuc.xlsx", { sheetName: "DuLieu" });
//    table.showColumn('ThaoTac');
//    table.showColumn('TrangThai');
//    table.hideColumn('TrangThaiText');
//});

$('#btnPrint').on('click', function () {
    table.print(false, true);
    return false;
});

$('#btnExport').on('click', async function () {
    const data = table.getData();
    const filteredData = data.filter(
        // lấy dữ liệu theo bộ lọc
        item => (item.MaDiaBanHC == null ? "" : item.MaDiaBanHC.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.TenDiaBanHC == null ? "" : item.TenDiaBanHC.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.DienGiai == null ? "" : item.DienGiai.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
    );
    var chuoidulieu = JSON.stringify(filteredData).replaceAll('null', '""').replaceAll('true', '"Đang sử dụng"').replaceAll('false', '""');
    // cấu hình tên cột để xuất
    // thứ tự mảng này quết định thứ tự cột xuất ra
    var TenCot = [
        { 'datafil': 'MaDiaBanHC', 'TenCot': 'Mã', 'DoRong': '10', 'CanhLe': 'Left' },
        { 'datafil': 'TenDiaBan', 'TenCot': 'Tên địa bàn hành chính', 'DoRong': '40', 'CanhLe': 'Left' },
        { 'datafil': 'TenDiaBan_Cha', 'TenCot': 'Thuộc địa bàn hành chính', 'DoRong': '40', 'CanhLe': 'Left' },
        { 'datafil': 'DienGiai', 'TenCot': 'Diễn giải', 'DoRong': '30', 'CanhLe': 'Left' },
        { 'datafil': 'TrangThai', 'TenCot': 'Trạng thái sử dụng', 'DoRong': '17', 'CanhLe': 'Center' }]
    var result = await NTS.getAjaxAsync('/DanhMuc/DungChung/XuatDataExcel', { Cot: JSON.stringify(TenCot), Data: chuoidulieu, TenFile: 'Danh sách địa bàn hành chính' });
    if (result != "") {
        window.open(result);
    }
});