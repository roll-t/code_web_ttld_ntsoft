var tempthem = "them";
$(function () {
    LoadDataTable();
    checkMacDinhSD('.checkMacDinhSD', 'DanToc', 'DanTocID');

});

var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().DanTocID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().DanTocID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().DanTocID);
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
        //{ title: "Mã", field: "MaDanToc", formatter: 'textarea', width: 80, vertAlign: "middle", minWidth: 80, headerHozAlign: "center" },
        { title: "Mã", field: "MaDanToc", formatter: 'textarea', width: 80, vertAlign: "middle", minWidth: 80, headerHozAlign: "center" },
        { title: "Tên dân tộc", field: "TenDanToc", formatter: 'textarea', hozAlign: "left", width: 400, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Dân số", field: "DanSo", formatter: 'textarea', hozAlign: "right", width: 150, vertAlign: "middle", headerHozAlign: "center", formatter: customNumberFormatter },
        { title: "Chiếm tỷ lệ", field: "ChiemTyLe", formatter: 'textarea', hozAlign: "right", width: 150, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Diễn giải", field: "DienGiai", formatter: 'textarea', hozAlign: "left", minWidth: 350, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 150, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThaiText", hozAlign: "center", width: 200, formatter: 'textarea', headerSort: false, vertAlign: "middle", headerHozAlign: "center", visible: false },
        { title: "DanTocID", field: "DanTocID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/DanhMuc/DanToc/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

checkDangSD('.checkDangSD', 'DanToc', 'DanTocID');

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
    $('#MaDanToc').prop('disabled', false);
    $('#lblTieuDeThemMoi').text('Thêm mới thông tin dân tộc');
    $('#mdThemMoi').modal('show');
    $('#MaDanToc').value('');
    $('#TenDanToc').value('');
    $('#DanTocID').value('');
    $('#DienGiai').value('');
    $('#DanSo').value('');
    $('#ChiemTyLe').value('');
    $('#TrangThai').value(true);
    UpdateLabelDangSD('#TrangThai');
    tempthem = 'them';
    return false;
});

Grid1.on("rowDblClick", function (e, row) {
    $('#DanTocID').val(row.getData().DanTocID);
    SuaDuLieu(row.getData().DanTocID);
});

function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }
    
    $('#lblTieuDeThemMoi').text('Cập nhật thông tin dân tộc');
    const result = NTS.getAjax('/DanhMuc/DanToc/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#DanTocID').value(data.DanTocID);
        $('#MaDanToc').value(data.MaDanToc);
        $('#TenDanToc').value(data.TenDanToc);
        $('#DienGiai').value(data.DienGiai);
        $('#TrangThai').value(data.TrangThai);

        $('#DanSo').value(data.DanSo);
        $('#ChiemTyLe').value(data.ChiemTyLe);
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
    if ($('#ChiemTyLe').value().replaceAll(',', '.') != '') {
        if (parseFloat($('#ChiemTyLe').value().replaceAll(',', '.')) > 100) {
            NTS.canhbao('Tỷ lệ không được lớn hơn 100%!');
            return false;
        }
    }
    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#DanTocID').value();
    saveData[2] = $('#MaDanToc').value();
    saveData[3] = $('#TenDanToc').value();
    saveData[4] = $('#DienGiai').value();
    saveData[5] = $('#TrangThai').value();
    saveData[6] = $('#DanSo').value();
    saveData[7] = $('#ChiemTyLe').value().replaceAll('.',',');
    var result = NTS.getAjax('/DanhMuc/DanToc/LuuThongTin', { data: saveData });
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
    $('#DanTocID').val($(this).attr('data'));
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
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'DanTocID', ID: ID, TenBangHienTai: 'DanToc', CacBangKhongXet: [] });
    //console.log(result_ktxoa)
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/DanToc/XoaDuLieu', { id: ID });
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

