////const { debug } = require("node:util");

var tempthem = "them";
$(function () {
    LoadDataTable();
});

var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().ThietLapCotID);
}
var fmHienThiSD = function (cell) {
    return formaterHienThiSD(cell.getValue(), cell.getData().ThietLapCotID);
}

var fmMacDinhSD = function (cell) {
    return formaterMacDinh(cell.getValue(), cell.getData().ThietLapCotID);
}

function formaterHienThiSD(value, ID) {
    return ` <div class="form-group">
            <label class="form-check">
                <input class="form-check-input checkHienThiSD" type="checkbox" data='${ID}' id="customCheckbox1${ID}" ` + (value ? 'checked' : '') + `>
                <label class="form-check-label" for="customCheckbox1${ID}"></label>
            </label>
                
        </div>`;
}

function formaterMacDinh(value, ID) {
    return ` <div class="form-group">
            <label class="form-check ">
                <input class="form-check-input checkMacDinhSD" type="checkbox" data='${ID}' id="customCheckbox1${ID}" ` + (value ? 'checked' : '') + `>
                <label class="form-check-label" for="customCheckbox1${ID}"></label>
            </label>
                
        </div>`;
}

thayDoiCheckbox('.checkHienThiSD', 'ThietLapCot', 'ThietLapCotID','HienThi');
thayDoiCheckbox('.checkMacDinhSD', 'ThietLapCot', 'ThietLapCotID', 'MacDinh');

var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().ThietLapCotID);
}
var Grid1 = new Tabulator("#Grid1", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "550",
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', formatter: fmThaoTac, headerSort: false, headerHozAlign: "Center", hozAlign: "center", vertAlign: "middle", field: "ThaoTac", width: 60, print: false },
        { title: "Số thự tự", field: "STT", formatter: 'textarea', width: 80, vertAlign: "middle", minWidth: 80, headerHozAlign: "center" },
        { title: "Tên Mô tả", field: "MoTa", formatter: 'textarea', hozAlign: "left", width: 400, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Tên cột", field: "TenCot", formatter: 'textarea', hozAlign: "left", width: 400, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Hiển thị", field: "HienThi", hozAlign: "center", width: 150, formatter: fmHienThiSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Mặc định", field: "MacDinh", hozAlign: "center", width: 150, formatter: fmMacDinhSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Bảng tham chiếu", field: "BangThamChieu", formatter: 'textarea', hozAlign: "left", width: 400, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Diễn giải", field: "GhiChu", formatter: 'textarea', hozAlign: "left", minWidth: 350, vertAlign: "middle", headerHozAlign: "center" },
        { title: "ThietLapCotID", field: "ThietLapCotID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/DanhMuc/ThietLapCot/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}



$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        Grid1.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid1.setFilter(matchAny, { value: $('#timKiem').val() });
});

$(document).on('click', '#btnThemMoi', function () {
    $('#lblTieuDeThemMoi').text('Thêm mới thông tin thiết lập cột');
    $('#mdThemMoi').modal('show');
    resetForm("#mdThemMoi");
    tempthem = 'them';
    return false;
});

Grid1.on("rowDblClick", function (e, row) {
    $('#ThietLapCotID').val(row.getData().ThietLapCotID);
    SuaDuLieu(row.getData().ThietLapCotID);
});

function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#lblTieuDeThemMoi').text('Cập nhật thông tin thiết lập cột');
    const result = NTS.getAjax('/DanhMuc/ThietLapCot/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#ThietLapCotID').value(data.ThietLapCotID);
        $('#STT').value(data.STT);
        $('#HienThi').value(data.HienThi);
        $('#MacDinh').value(data.MacDinh);
        $('#MoTa').value(data.MoTa);
        $('#TenCot').value(data.TenCot);
        $('#BangThamChieu').value(data.BangThamChieu);
        $('#DienGiai').value(data.GhiChu);
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
    debugger
    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#ThietLapCotID').value();
    saveData[2] = $('#STT').value();
    saveData[3] = $('#HienThi').value();
    saveData[4] = $('#MacDinh').value();
    saveData[5] = $('#MoTa').value();
    saveData[6] = $('#TenCot').value();
    saveData[7] = $('#BangThamChieu').value();
    saveData[8] = $('#DienGiai').value();
   
    var result = NTS.getAjax('/DanhMuc/ThietLapCot/LuuThongTin', { data: saveData });
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
    $('#ThietLapCotID').val($(this).attr('data'));
    SuaDuLieu($(this).attr('data'));
});

$(document).on('click', '.btnXoaGrid1', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieu(ID);
});

// function XoaDuLieu(ID) {
//    if (!QuyenXoa()) {
//        return false;
//     }
//     CanhBaoXoa(() => {
//         const result = NTS.getAjax('/DanhMuc/GioiTinh/XoaDuLieu', { id: ID });
//         if (!result.Err) {
//             LoadDataTable();
//             NTS.thanhcong(result.Msg);
//         }
//         else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
//     });
//}

function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'ThietLapCotID', ID: ID, TenBangHienTai: 'ThietLapCot', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/ThietLapCot/XoaDuLieu', { id: ID });
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
