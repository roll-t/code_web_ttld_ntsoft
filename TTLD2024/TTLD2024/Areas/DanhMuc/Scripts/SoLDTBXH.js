var tempthem = "them";
$(function () {
    LoadDataTable();
    checkMacDinhSD('.checkMacDinhSD', 'SoLDTBXH', 'SoLDTBXHID');

});

var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().SoLDTBXHID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().SoLDTBXHID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().SoLDTBXHID);
}
var Grid1 = new Tabulator("#Grid1", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: window.innerHeight * 79 / 100,
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', formatter: fmThaoTac, headerSort: false, headerHozAlign: "Center", hozAlign: "center", vertAlign: "middle", field: "ThaoTac", width: 60, print: false},
        //{ title: "Mã", field: "MaSoLDTBXH", formatter: 'textarea', width: 80, vertAlign: "middle", minWidth: 80, headerHozAlign: "center" },
        { title: "Mã", field: "MaSoLDTBXH", formatter: 'textarea', width: 80, vertAlign: "middle", minWidth: 80, headerHozAlign: "center" },
        { title: "Tên sở lao động thương binh xã hội", field: "TenSoLDTBXH", formatter: 'textarea', hozAlign: "left", width: 300, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Địa chỉ", field: "DiaChi", formatter: 'textarea', hozAlign: "left", width: 250, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Số điện thoại", field: "DienThoai", formatter: 'textarea', hozAlign: "left", width: 120, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Website", field: "Website", formatter: 'textarea', hozAlign: "left", width: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Email", field: "Email", formatter: 'textarea', hozAlign: "left", width: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Fax", field: "Fax", formatter: 'textarea', hozAlign: "left", width: 120, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Diễn giải", field: "DienGiai", formatter: 'textarea', hozAlign: "left", minWidth: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 150, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThaiText", hozAlign: "center", width: 200, formatter: 'textarea', headerSort: false, vertAlign: "middle", headerHozAlign: "center", visible: false },
        { title: "SoLDTBXHID", field: "SoLDTBXHID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/DanhMuc/SoLDTBXH/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

checkDangSD('.checkDangSD', 'SoLDTBXH', 'SoLDTBXHID');

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
    $('#MaSoLDTBXH').prop('disabled', false);
    $('#lblTieuDeThemMoi').text('Thêm mới thông tin sở lao động thương binh xã hội');
    $('#mdThemMoi').modal('show');
    $('#MaSoLDTBXH').value('');
    $('#TenSoLDTBXH').value('');
    $('#SoLDTBXHID').value('');
    $('#DiaChi').value('');
    $('#DienThoai').value('');
    $('#Fax').value('');
    $('#Website').value('');
    $('#Email').value('');
    $('#DienGiai').value('');
    $('#TrangThai').value(true);
    UpdateLabelDangSD('#TrangThai');
    tempthem = 'them';
    return false;
});

Grid1.on("rowDblClick", function (e, row) {
    $('#SoLDTBXHID').val(row.getData().SoLDTBXHID);
    SuaDuLieu(row.getData().SoLDTBXHID);
});

function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }
    
    $('#lblTieuDeThemMoi').text('Cập nhật thông tin sở lao động thương binh xã hội');
    const result = NTS.getAjax('/DanhMuc/SoLDTBXH/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#SoLDTBXHID').value(data.SoLDTBXHID);
        $('#MaSoLDTBXH').value(data.MaSoLDTBXH);
        $('#TenSoLDTBXH').value(data.TenSoLDTBXH);
        $('#DienGiai').value(data.DienGiai);
        $('#TrangThai').value(data.TrangThai);
        $('#DiaChi').value(data.DiaChi);
        $('#DienThoai').value(data.DienThoai);
        $('#Fax').value(data.Fax);
        $('#Website').value(data.Website);
        $('#Email').value(data.Email);
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
    saveData[1] = $('#SoLDTBXHID').value();
    saveData[2] = $('#MaSoLDTBXH').value();
    saveData[3] = $('#TenSoLDTBXH').value();
    saveData[4] = $('#DienGiai').value();
    saveData[5] = $('#TrangThai').value();
    saveData[6] = $('#DiaChi').value();
    saveData[7] = $('#DienThoai').value();
    saveData[8] = $('#Website').value();
    saveData[9] = $('#Email').value();
    saveData[10] = $('#Fax').value();
    var result = NTS.getAjax('/DanhMuc/SoLDTBXH/LuuThongTin', { data: saveData });
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
    $('#SoLDTBXHID').val($(this).attr('data'));
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
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'SoLDTBXHID', ID: ID, TenBangHienTai: 'SoLDTBXH', CacBangKhongXet: [] });
    //console.log(result_ktxoa)
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/SoLDTBXH/XoaDuLieu', { id: ID });
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

