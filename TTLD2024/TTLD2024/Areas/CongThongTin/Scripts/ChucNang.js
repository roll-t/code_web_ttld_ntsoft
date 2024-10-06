////const { debug } = require("node:util");

var tempthem = "them";
$(function () {
    LoadCombo();
    LoadDataTable();
    checkMacDinhSD('.checkMacDinhSD', 'ChucNang', 'ChucNangID');
    //$('#reservationdate').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' });
});
function LoadCombo() {
    setTimeout(function () {
        NTS.loadDataCombo({
            name: '#MaCha',
            ajaxUrl: '/CongThongTin/ChucNang/getChucNang',
            ajaxParam: { data: "" },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '-Chọn chức năng-',
            showTatCa: !0
        });
        
    }, 100);
}
var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().ChucNangID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().ChucNangID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().ChucNangID);
}
var Grid1 = new Tabulator("#GridChucNang", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "80vh",
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', formatter: fmThaoTac, headerSort: false, headerHozAlign: "Center", hozAlign: "center", vertAlign: "middle", field: "ThaoTac", width: 60, print: false },
        { title: "ChucNangID", field: "ChucNangID", width: 150, visible: false },
        { title: "Mã chức năng", field: "MaChucNang", hozAlign: "left", visible: true, width: 130, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Tên chức năng", field: "TenChucNang", hozAlign: "left", width: 250, formatter: "textarea", vertAlign: "middle", headerHozAlign: "center" },
        { title: "Đường dẫn Url", field: "DuongDanUrl", hozAlign: "left", formatter: "textarea", vertAlign: "middle", headerHozAlign: "center" },
        { title: "Thuộc chức năng", field: "TenMaCha", hozAlign: "left", formatter: "textarea", width: 250, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Thuộc cổng thông tin", field: "CongThongTin", hozAlign: "left", formatter: "textarea", width: 250, vertAlign: "middle", headerHozAlign: "center" },
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/CongThongTin/ChucNang/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

checkDangSD('.checkDangSD', 'ChucNang', 'ChucNangID');

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
    $('#MaChucNang').value('');
    $('#MaChucNang').attr('readonly', false);
    try {
        var matutang = NTS.getAjax('/DanhMuc/DungChung/LayMaTuTang', { strKyTu: "", strCotTang: "MaChucNang", strBangTang: "ChucNang", strDinhDang: "00" });
        $('#MaChucNang').value(matutang.Result)
    } catch (e) {

    }
    $('#TenChucNang').value('');
    $('#DuongDanUrl').value('');
    $('#MaCha').value('');
    $('#chkCongThongTinViecLam').value(false);
    tempthem = "them";
    $('#mdThemMoi').modal('show');
    $('#lblTieuDeThemMoi').text('Thêm chức năng mới');
    tempthem = 'them';
    return false;
});

Grid1.on("rowDblClick", function (e, row) {
    $('#ChucNangID').val(row.getData().ChucNangID);
    SuaDuLieu(row.getData().ChucNangID);
});

function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#lblTieuDeThemMoi').text('Cập nhật chức năng');
    NTS.loadDataCombo({
        name: '#MaCha',
        ajaxUrl: '/CongThongTin/ChucNang/getChucNang',
        ajaxParam: { data: ID },
        indexValue: 0, //ID
        indexText: 1, // Ma
        indexText1: 2, // Ten
        columns: 2,
        textShowTatCa: '-Chọn chức năng-',
        showTatCa: !0
    });
    const result = NTS.getAjax('/CongThongTin/ChucNang/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#MaChucNang').value(data.MaChucNang);
        $('#TenChucNang').value(data.TenChucNang);
        $('#DuongDanUrl').value(data.DuongDanUrl);
        setTimeout(function () {
            $('#MaCha').value(data.ChucNangID_Cha);
        }, 50)
        $('#ChucNangID').val(data.ChucNangID);
        $('#chkCongThongTinViecLam').value(data.Loai);
        $('#chkMenuCamNang').value(data.CTTCamNang);
        $('#mdThemMoi').modal('show');
        $('#tieuDeModal').text('Cập nhật chức năng');
        tempthem = "sua";
        $('#MaChucNang').prop("disabled", false);
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
}

$(document).on('click', '#btnLuuVaDong', function () {
    const validate = new NTSValidate('#mdThemMoi');
    if (!validate.trim().check()) {
        return false;
    }
   
    if (KiemTraKhongCoKyTuDacBiet($('#MaChucNang').value())) {
        return NTS.canhbao("Mã không được chứa ký tự đăc biệt!")
    }    
    if (KiemTraNhapSo($('#MaChucNang').value())) {
        return NTS.canhbao("Mã chỉ được nhập các ký tự số!");
    }
    //var KTData = new Array();
    //KTData[0] = tempthem;
    //KTData[1] = $("#ChucNangID").value();
    //KTData[2] = $("#MaChucNang").value();
    //var array = NTS.getAjax('json', "/View/CongThongTin/ChucNang.aspx/KiemTraChucNang", { data: KTData });
    //if (array.length > 0) {
    //    if (array[0].GiaTri != '0') {
    //        NTS.canhbao(`Mã đã tồn tại trong hệ thống`);
    //        return false;
    //    }
    //}
    var param = new Array();
    param[0] = $('#MaChucNang').value();
    param[1] = $('#TenChucNang').value();
    param[2] = $('#DuongDanUrl').value();
    param[3] = $('#MaCha').value();
    param[4] = $('#ChucNangID').val();
    param[5] = tempthem;
    param[6] = $('#chkCongThongTinViecLam').value();
    param[7] = $('#chkMenuCamNang').value();
    var result = NTS.getAjax('/CongThongTin/ChucNang/LuuThongTin', { data: param });
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
    $('#ChucNangID').val($(this).attr('data'));
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
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/CongThongTin/ChucNang/XoaDuLieu', { id: ID });
        if (!result.Err) {
            LoadDataTable();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
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
    Grid1.download("xlsx", "CongThongTin.xlsx", { sheetName: "DuLieu" });
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
$('#chkCongThongTinViecLam').on('change', function () {
    if ($(this).value() == true) {
        $('#chkMenuCamNang').value(0)
    }
});
$('#chkMenuCamNang').on('change', function () {
    if ($(this).value() == true) {
        $('#chkCongThongTinViecLam').value(0)
    }
});