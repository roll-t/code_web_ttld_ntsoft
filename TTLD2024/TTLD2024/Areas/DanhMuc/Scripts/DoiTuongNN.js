var tempthem = "them";
var tenBangThamChieu = 'DoiTuongNN';
var tempSuaTTTabView = false;
$(function () {
    checkMacDinhSD('.checkMacDinhSD', 'ToChuc', 'ToChucID');
    LoadTimKiem();
});
$(document).ready(function () {
    ThietLapCotTrenLuoi(tenBangThamChieu, Grid1); // thiết lập cột trên lưới
    setTimeout(function () {
        LoadDataTable();
    }, 300);
});
function LoadTimKiem() {
    setTimeout(function () {
        NTS.loadDataCombo({
            name: '#TinhID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCTinh_Combo',
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '--Tất cả--',
            showTatCa: !0,
            //indexDefault: 3,
        });
        NTS.loadDataCombo({
            name: '#HuyenID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
            ajaxParam: { id: '' },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '--Tất cả--',
            showTatCa: !0,
            //indexDefault: 3,
        });
        NTS.loadDataCombo({
            name: '#XaID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
            ajaxParam: { id: '' },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '--Tất cả--',
            showTatCa: !0,
            //indexDefault: 3,
        });
        NTS.loadDataCombo({
            name: '#ThonID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
            ajaxParam: { id: '' },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '--Tất cả--',
            showTatCa: !0,
            //indexDefault: 3,
        });
        //--------------Trong form---------------//
        NTS.loadDataCombo({
            name: '#LoaiHinhDN_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetComBo_LoaiHinhNoiLV',
            columns: 1,
            indexValue: 0,
            indexText: 1,
            textShowTatCa: '--Tất cả--',
            showTatCa: !0,
        });
        PhanQuyenComBoDiaBan('TinhID_TimKiem_us', 'HuyenID_TimKiem_us', 'XaID_TimKiem_us', 'ThonID_TimKiem_us');
    }, 100);
}

//-----------------------Change bộ lọc-------------------------//
$(document).on('change', '#TinhID_TimKiem_us', function () {
    NTS.loadDataCombo({
        name: '#HuyenID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
        ajaxParam: { id: $('#TinhID_TimKiem_us').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '--Tất cả--',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#XaID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: '' },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '--Tất cả--',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#ThonID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '--Tất cả--',
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
        textShowTatCa: '--Tất cả--',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#ThonID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '--Tất cả--',
        showTatCa: !0
    });
});
$(document).on('change', '#XaID_TimKiem_us', function () {
    NTS.loadDataCombo({
        name: '#ThonID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: $('#XaID_TimKiem_us').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '(Tất cả)',
        showTatCa: !0
    });
});

// Thiết lập cột hiển thị trên lưới
$(document).on('click', '#btnThietLapCot', function () {
    ShowModalThietLapCot_us(tenBangThamChieu);
});

$(document).on('click', '#btnLuuThietLapCot_us', function () {
    const DataThietLapCot = NTS.getAjax("/DanhMuc/DungChung/LoadDuLieuThietLapCot", { tenBang: tenBangThamChieu });
    var data = DataThietLapCot.Result;
    var mang = new Array();

    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if ($('#ThietLap_' + data[i].TenCot).value() == true) { // lấy ra mảng các giá trị được checked trên modal tùy chọn thiết lập cột
                mang.push(data[i].TenCot);
            }
        }
    }
    LuuThongTinThietLapCot(mang, tenBangThamChieu, Grid1, thaoTac);
})

$(document).on('click', '#btnThietLapLai_us', function () {
    LoadListColumn(tenBangThamChieu);
    thaoTac = true;
});


//-------------------Thay đổi lưới--------------------------//
$(document).on('click', '#btn-layout-1', async function () {
    $('#grid-layout').fadeIn(200);
    $('#list-layout').hide();
    $('#list-layout').removeClass('show');
    $('#grid-layout').addClass('show');
});
$(document).on('click', '#btn-layout-2', async function () {
    $('#grid-layout').hide();
    $('#list-layout').fadeIn(200);
    $('#list-layout').addClass('show');
    $('#grid-layout').removeClass('show');
});

$(document).on('click', '#btnThemMoi', function () {
    if (!QuyenThem()) {
        return false;
    }
    tempthem = 'them';
    $('#tieuDeModal_ThemDoiTuongNN_us').text('Thêm mới đối tượng người nước ngoài');
    showModalThemMoiDoiTuongNN();
});


var fmGhiChu = function (cell) {
    var ID = cell.getData().DoiTuongNNID;
    var ghiChu = cell.getValue();
    if (ghiChu != "") {
        if (ghiChu.length > 40) {
            ghiChu = ghiChu.substring(0, 23) + "...";
            return `
                        <div class="col-md-12" style="padding-right: 0px; padding-left: 0px; padding-bottom:4px;">
                            <div class="Content-text">${ghiChu}<span class='btnXemThemGhiChu' style='color:var(--tblr-primary);'  title="Xem chi tiết ghi chú" data='${ID}' data-loai='TC'>Xem thêm</span></div>
                        </div>`;
        } else {
            return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${ghiChu}</p>
                    </div>`;
        }
    } else {
        return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${ghiChu}</p>
                    </div>`;
    }
}

var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().DoiTuongNNID);
}

var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().DoiTuongNNID);
}

var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().DoiTuongNNID);
}


function actionDropdownFormatter(cell, formatterParams, onRendered) {
    var ID = cell.getData().DoiTuongNNID;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
       <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
       <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
           <a class="dropdown-item btnXemTTDoiTuongNN " href="#" data="${ID}" >
                <i class="fa fa-eye " aria-hidden="true" style="paddding-right:10px; color:#019017;"></i>&ensp;  Xem thông tin đối tượng
           </a>           
           <a class="dropdown-item btnSuaDoiTuongNN" href="#" data="${ID}">
                <i class="fa fa-pencil text-warning" aria-hidden="true"></i>&ensp;  Chỉnh sửa đối tượng
           </a>
          <a class="dropdown-item btnXoaDoiTuongNN" href="#" data="${ID}">
            <i class='fa fa-trash-o  text-danger'></i>&ensp; Xóa đối tượng
           </a>
                            
       </div>
       </div>`;



    return select;
}
//-------------------Grid hộ gia đình---------------//

var Grid1 = new Tabulator("#Grid1", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: '80vh',
    columns: [
        {
            title: '<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
            field: "actions",
            formatter: actionDropdownFormatter, width: 60, headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", headerSort: false
        },
        { title: "Mã đối tượng", field: "MaDoiTuongNN", formatter: 'textarea', width: 120, vertAlign: "middle", minWidth: 120, headerHozAlign: "center" },
        { title: "Họ và tên", field: "HoVaTen", formatter: 'textarea', minWidth: 180, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Giới tính", field: "TenGioiTinh", formatter: 'textarea', minWidth: 110, vertAlign: "middle", width: 80, headerHozAlign: "center" },
        { title: "Ngày sinh", field: "NgayThangNamSinh", formatter: 'textarea', width: 120, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center"  },
        { title: "Quốc tịch", field: "TenQuocTich", formatter: 'textarea', vertAlign: "middle", width: 120, headerHozAlign: "center", hozAlign: "left" },
        { title: "Số hộ chiếu", field: "SoHoChieu", formatter: 'textarea', vertAlign: "middle", width: 120, headerHozAlign: "center", hozAlign: "left" },
        { title: "Ngày cấp", field: "NgayCap", formatter: 'textarea', width: 120, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center" },
        { title: "Số điện thoại", field: "SoDienThoai", formatter: 'textarea', width: 120, vertAlign: "middle", minWidth: 70, headerHozAlign: "left" },
        { title: "Email", field: "Email", formatter: 'textarea', hozAlign: "left", minWidth: 250, vertAlign: "middle", headerHozAlign: "center", headerSort: false },
        { title: "Địa chỉ", field: "DiaChiCuThe", formatter: 'textarea', minWidth: 250, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Ghi chú", field: "GhiChu", formatter: fmGhiChu, hozAlign: "left", width: 250, vertAlign: "middle", headerHozAlign: "center", headerSort: false },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 130, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "DoiTuongNNID", field: "DoiTuongNNID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

Grid1.on("rowDblClick", function (e, row) {
    var ID = row.getData().DoiTuongNNID;
    $('#DoiTuongNNID').value(ID);
    SuaDuLieuDoiTuongNN_us(ID);
});

async function LoadDataTable() {
    var saveData = new Array();
    saveData[0] = $('#TinhID_TimKiem_us').value();
    saveData[1] = $('#HuyenID_TimKiem_us').value();
    saveData[2] = $('#XaID_TimKiem_us').value();
    saveData[3] = $('#ThonID_TimKiem_us').value();
    saveData[4] = $('#timKiem').value();
    Grid1.clearData();
    GridDoiTuongNN_List.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/DoiTuongNN/GetAll", { data: saveData });
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
        GridDoiTuongNN_List.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.thongbaoloi(GetAll.Msg);
    GridKhongCoDuLieu("Grid1");
}


checkDangSD('.checkDangSD', 'DoiTuongNN', 'DoiTuongNNID');

$('#TrangThai').on('change', function () {
    UpdateLabelDangSD(this);
});

// Xem chi tiết nội dung ghi chú Đối tượng người nước ngoài
$(document).on('click', '.btnXemThemGhiChu', function () {
    $('#ToChucID').val($(this).attr('data'));
    XemChiTietGhiChu($(this).attr('data'));
});

function XemChiTietGhiChu(ID) {
    $("#mdXemThem").modal('show');
    $('#tieuDeModalCT').text('Chi tiết nội dung ghi chú');
    const result = NTS.getAjax("/DanhMuc/DoiTuongNN/GhiChuCT", { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#NoiDungGhiChu_CT').html(data.GhiChu);
    } else {
        $('#NoiDungGhiChu_CT').html("Chưa có dữ liệu");
    }
    return;
}

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
            if ($('#mdThemMoiDoiTuongNN_us').hasClass('show')) {
                $('#mdThemMoiDoiTuongNN_us').modal('hide');
                e.preventDefault();
                break;
            }
            else if ($('#mdXemChiTietDoiTuongNN_us').hasClass('show')) {
                $('#mdXemChiTietDoiTuongNN_us').modal('hide');
                e.preventDefault();
                break;
            } else if ($('#mdXemThongTinNguoiNNLVVN_us').hasClass('show')) {
                $('#mdXemThongTinNguoiNNLVVN_us').modal('hide');
                e.preventDefault();
                break;
            }
        case 120:
            if (hotKey == 1)
                if ($('#mdThemMoiDoiTuongNN_us').hasClass('show')) {
                    $('#btnLuuVaDongThemDoiTuongNN_us').trigger('click');
                    e.preventDefault();
                    break;
                }
    }
});
$(document).on('shown.bs.modal', '#mdThemMoiDoiTuongNN_us', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdThemMoiDoiTuongNN_us', function () {
    hotKey = 0;
});

//-------------------Xem thông tin đối tượng người nước ngoài--------------------//
$(document).on('click', '.btnXemTTDoiTuongNN', function () {
    var ID = $(this).attr('data');
    showModalXemThongTinDoiTuongNN_us(ID);
});

function showModalXemThongTinDoiTuongNN_us(ID) {
    $('#mdXemChiTietDoiTuongNN_us').modal('show');
    LoadDataDoiTuongNN_mdXemthongTin(ID);
    LoadDataQuaTrinhTT_ModalView(ID);
}

// Hàm để chuyển đổi chuỗi định dạng dd/mm/yyyy thành đối tượng Date
function parseDate(input) {
    var parts = input.split('/');
    // parts[0] là ngày, parts[1] là tháng, parts[2] là năm
    return new Date(parts[2], parts[1] - 1, parts[0]); // Lưu ý: Tháng trong Date() bắt đầu từ 0 (tháng 1 là 0)
}

//-----------------------Lưu thông tin đối tượng người nước ngoài--------------//
$(document).on('click', '#btnLuuVaDongThemDoiTuongNN_us', function () {
    const validate = new NTSValidate('#mdThemMoiDoiTuongNN_us');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }
  
    if ($('#SoDienThoaiDoiTuongNN_us').value() != "") {
        if ($('#SoDienThoaiDoiTuongNN_us').value().length < 12) {
            NTS.canhbao("Số điện thoại chưa đúng định dạng!");
            return false;
        }
    }

    if (!checkAge($('#NgaySinhDoiTuongNN_us').value())) {
        // Ngày sinh không đủ 15 tuổi
        NTS.canhbao("Ngày sinh không được nhỏ hơn 15 tuổi!");
        return false;
    }



    // Kiểm tra ngày tháng năm của ngày cấp không được lớn hơn ngày hết hạn
    var ngayCapFull = parseDate($('#NgayCapDoiTuongNN_us').value());
    var ngayHetHanFull = parseDate($('#CoGiaTriDenDoiTuongNN_us').value());

    if (ngayCapFull >= ngayHetHanFull) {
        NTS.canhbao("Ngày cấp không được lớn hơn ngày có giá trị đến!");
        return false;
    }

    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#DoiTuongNNID').value();
    saveData[2] = $('#MaDoiTuongNN_us').value();
    saveData[3] = $('#HoVaTenDoiTuongNN_us').value();
    saveData[4] = $('#GioiTinhDoiTuongNN_us').value();
    saveData[5] = $('#QuocTichDoiTuongNN_us').value();
    saveData[6] = $('#NgaySinhDoiTuongNN_us').value();
    saveData[7] = $('#MaSoDoiTuongNN_us').value();
    saveData[8] = $('#drop_MaSo').attr('data-value');
    saveData[9] = $('#SoHoChieuDoiTuongNN_us').value();
    saveData[10] = $('#NgayCapDoiTuongNN_us').value();
    saveData[11] = $('#CoGiaTriDenDoiTuongNN_us').value();
    saveData[12] = $('#NoiCapDoiTuongNN_us').value();
    saveData[13] = $('#SoDienThoaiDoiTuongNN_us').value();
    saveData[14] = $('#EmailDoiTuongNN_us').value();
    saveData[15] = $('#TinhIDDoiTuongNN_us').value();
    saveData[16] = $('#HuyenIDDoiTuongNN_us').value();
    saveData[17] = $('#XaIDDoiTuongNN_us').value();
    saveData[18] = $('#ThonIDDoiTuongNN_us').value();
    saveData[19] = $('#SoNhaDoiTuongNN_us').value();
    saveData[20] = $('#DiaChiDoiTuongNN_us').text();
    saveData[21] = $('#GhiChuDoiTuongNN_us').value();
    saveData[22] = $('#TrangThaiDoiTuongNN_us').value();
    saveData[23] = $('#CoQuanCapDoiTuongNN_us').value();
    var result = NTS.getAjax('/DanhMuc/DoiTuongNN/LuuThongTin', { data: saveData });
    if (!result.Err) {
        if (result.Logs == "1") {
            CanhBaoTrungSoHoChieu(() => { }, result.Msg);
        } else {
            if (tempSuaTTTabView == true) {
                LoadDataTable();
                $('#mdThemMoiDoiTuongNN_us').modal('hide');
                LoadDataDoiTuongNN_TabView($('#DoiTuongNNID').value());
                NTS.thanhcong(result.Msg);
                tempSuaTTTabView = false;
                return false;
            } else {
                LoadDataTable();
                NTS.thanhcong(result.Msg);
                $('#mdThemMoiDoiTuongNN_us').modal('hide');
                return false;
            }
        }
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});

//-----------------------------------Xóa đối tượng người nước ngoài------------------------------------

function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'DoiTuongNNID', ID: ID, TenBangHienTai: 'DoiTuongNN', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/DoiTuongNN/XoaDuLieu', { id: ID });
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

$(document).on('click', '.btnXoaDoiTuongNN', function () {
    var ID = $(this).attr('data');
    XoaDuLieu(ID);
});

//------------------------------------------- Tìm kiếm--------------------------------------
//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiemNangCao', function () {
    if ($('#KhungTimKiem').css('display') == "block") {
        $('#KhungTimKiem').slideUp(200);
    } else {
        $('#KhungTimKiem').slideDown(200);
    }
    return false;
});

$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        Grid1.setFilter(matchAny, { value: $(this).val() });
        GridDoiTuongNN_List.setFilter(matchAny, { value: $(this).val() });
        GridKhongCoDuLieu("Grid1");
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid1.setFilter(matchAny, { value: $('#timKiem').val() });
    GridDoiTuongNN_List.setFilter(matchAny, { value: $('#timKiem').val() });
    GridKhongCoDuLieu("Grid1");
});


//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiem', async function () {
    await LoadDataTable();
    $('#KhungTimKiem').slideUp(200);
    return false;

});

$(document).on('click', '#DongTimKiem', function () {
    $('#KhungTimKiem').slideUp(200);
    return false;
});


//-------------------Sửa dữ liệu Đối tượng người nước ngoài--------------------//
function SuaDuLieuDoiTuongNN_us(ID) {
    if (!QuyenSua()) {
        return false;
    }
    PhanQuyenComBoDiaBan('TinhIDDoiTuongNN_us', 'HuyenIDDoiTuongNN_us', 'XaIDDoiTuongNN_us', 'ThonIDDoiTuongNN_us');
    $('#tieuDeModal_ThemDoiTuongNN_us').text('Cập nhật thông tin đối tượng người nước ngoài');
    $('#mdThemMoiDoiTuongNN_us').modal('show');
    resetForm('#mdThemMoiDoiTuongNN_us');
    const result = NTS.getAjax('/DanhMuc/DoiTuongNN/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#DoiTuongNNID').value(data.DoiTuongNNID);
        $('#MaDoiTuongNN_us').value(data.MaDoiTuongNN)
        $('#HoVaTenDoiTuongNN_us').value(data.HoVaTen)
        $('#GioiTinhDoiTuongNN_us').value(data.GioiTinhID)
        $('#QuocTichDoiTuongNN_us').value(data.QuocTichID)
        $('#NgaySinhDoiTuongNN_us').value(data.NgayThangNamSinh)
        $('#MaSoDoiTuongNN_us').value(data.MaSo)
        $('#SoHoChieuDoiTuongNN_us').value(data.SoHoChieu)
        $('#NgayCapDoiTuongNN_us').value(data.NgayCap)
        $('#CoGiaTriDenDoiTuongNN_us').value(data.GiaTriDen)
        $('#NoiCapDoiTuongNN_us').value(data.NoiCapID)
        $('#SoDienThoaiDoiTuongNN_us').value(data.SoDienThoai)
        $('#EmailDoiTuongNN_us').value(data.Email)
        setTimeout(() => {
            $('#TinhIDDoiTuongNN_us').value(data.DiaBanHCID_Tinh)
            $('#HuyenIDDoiTuongNN_us').value(data.DiaBanHCID_Huyen)
            $('#XaIDDoiTuongNN_us').value(data.DiaBanHCID_Xa)
            $('#ThonIDDoiTuongNN_us').value(data.DiaBanHCID_Thon)
        }, 50);
        $('#SoNhaDoiTuongNN_us').value(data.SoNha)
        $('#DiaChiDoiTuongNN_us').text(data.DiaChiCuThe)
        $('#GhiChuDoiTuongNN_us').value(data.GhiChu)
        $('#TrangThaiDoiTuongNN_us').value(data.TrangThai)
        $('#CoQuanCapDoiTuongNN_us').value(data.CoQuanCap)
        $('#drop_MaSo').attr('data-value', data.LoaiHoChieu);
        if (data.LoaiHoChieu == 0) {
            $('#drop_MaSo').html(' -Chon- &nbsp; <i class="fa-solid fa-caret-down"></i>');
        } else if (data.LoaiHoChieu == 1) {
            $('#drop_MaSo').html(' P &nbsp; <i class="fa-solid fa-caret-down"></i>');
        } else if (data.LoaiHoChieu == 2) {
            $('#drop_MaSo').html(' O &nbsp; <i class="fa-solid fa-caret-down"></i>');
        } else if (data.LoaiHoChieu == 3) {
            $('#drop_MaSo').html(' D &nbsp; <i class="fa-solid fa-caret-down"></i>');
        }

        //Load
        $('#lblTenDoiTuongNN_us').html(data.HoVaTen);
        $('#lblDiaChiDoiTuongNN_us').html(data.DiaChiCuThe);
        $('#lblSoHoChieuDoiTuongNN_us').html(data.SoHoChieu);
        $('#lblGioiTinhDoiTuongNN_us').html($('#select2-GioiTinhDoiTuongNN_us-container').text());
        $('#lblQuocTichDoiTuongNN_us').html($('#select2-QuocTichDoiTuongNN_us-container').text());
        if (data.SoDienThoai == "" || data.SoDienThoai == null) {
            $('#lblSoDienThoaiDoiTuongNN_us').html('---');
        } else {
            $('#lblSoDienThoaiDoiTuongNN_us').html(data.SoDienThoai);
        }
        if (data.Email == "" || data.Email == null) {
            $('#lblEmailDoiTuongNN_us').html('---');
        } else {
            $('#lblEmailDoiTuongNN_us').html(data.Email);
        }
       
        UpdateLabelDangSD('#TrangThaiDoiTuongNN_us');
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
}

$(document).on('click', '.btnSuaDoiTuongNN', function () {
    var ID = $(this).attr('data');
    SuaDuLieuDoiTuongNN_us(ID);
});

///-----------------------Xuất danh sách excel thông tin đối tượng người nước ngoài------------------------
$('#btnExport').on('click', async function () {
    var saveData = new Array();
    saveData[0] = $('#TinhID_TimKiem_us').value();
    saveData[1] = $('#HuyenID_TimKiem_us').value();
    saveData[2] = $('#XaID_TimKiem_us').value();
    saveData[3] = $('#ThonID_TimKiem_us').value();
    saveData[4] = $('#timKiem').value();
    const kq = await NTS.getAjaxAsync("/DanhMuc/DoiTuongNN/XuatExcel_DoiTuongNN", { data: saveData });
    if (!kq.Err) {
        window.open(kq);
    } else {
        NTS.loi(kq.Msg);
    }
});

//-------------------------Gird dạng lưới Đối tượng người nước ngoài-----------------------//

var GridDoiTuongNN_List = new Tabulator("#GridDoiTuongNN_List", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    selectableRows: 1,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "595",
    HeaderVertAlign: "center",
    headerVisible: false,
    selectable: 1,
    rowFormatter: function (row) {
        var element = row.getElement(),
            data = row.getData(),
            width = element.offsetWidth,
            rowTable, cellContents;
        while (element.firstChild) element.removeChild(element.firstChild);
        rowTable = document.createElement("table")
        rowTable.style.width = (width - 18) + "px";
        rowTabletr = document.createElement("tr");
        rowTabletr.classList.add("btnXemTTDoiTuong");
        rowTabletr.setAttribute("data-value", data.DoiTuongNNID);
        cellContents = "<td><div style='border: 1px solid var(--tblr-color-header);border-radius: 50%;height: 50px;display: flex;align-items: center;justify-content: center;font-weight: bold;color: var(--tblr-color-header);width: 50px;'><img id='avatar_DoiTuong' class=' editable editable-click editable-empty img-fluid' alt='Hình đại diện' src='/Images/user.png'></div></td>";
        cellContents += "<td><div style='text-align: left;width: 240px;white-space: break-spaces;'><strong>" + data.HoVaTen + "</strong> </div><div style='text-align: left !important;font-size: 12px!important;width: 240px;white-space: break-spaces;'>" + data.DiaChiCuThe + "</div></td>"
        rowTabletr.innerHTML = cellContents;
        rowTable.appendChild(rowTabletr);
        element.append(rowTable);
    },
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

// Hàm ẩn số điện thoại
function formatPhoneNumber(phoneNumber) {
    if (phoneNumber.length > 4) {
        return phoneNumber.substring(0, 4) + '.xxx.xxx';
    }
    return phoneNumber;
}

function LoadDataDoiTuongNN_TabView(ID) {
    const result = NTS.getAjax('/DanhMuc/DoiTuongNN/XemThongTinDoiTuongNN_TabView', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        debugger
        $('#lblTenDoiTuongNNMain_View').html(data.HoVaTen + " (" + data.MaDoiTuongNN + ")");
        $('#lblDiaChiDoiTuongNNMain_View').html(data.DiaChiCuThe);
        $('#lblHovaTenDoiTuongNN_View').html(data.HoVaTen);
        $('#lblGioiTinhDoiTuongNN_View').html(data.TenGioiTinh);
        $('#lblNgaySinhDoiTuongNN_View').html(data.NgayThangNamSinh);
        $('#lblQuocTichDoiTuongNN_View').html(data.TenQuocTich);
        $('#lblSoHoChieuDoiTuongNN_View').html(data.SoHoChieu);
        $('#lblDiaChiDoiTuongNN_View').html(data.DiaChiCuThe);
        $('#lblXaDoiTuongNN_View').html(data.Xa);
        $('#lblHuyenDoiTuongNN_View').html(data.Huyen);
        $('#lblTinhDoiTuongNN_View').html(data.Tinh);
        if (data.SoDienThoai == "") {
            $('#lblSoDienThoaiDoiTuongNN_View').html('---');
        } else {
            $('#lblSoDienThoaiDoiTuongNN_View').html(formatPhoneNumber(data.SoDienThoai));
        }
        if (data.NoiCap == "" || data.NoiCap == null) {
            $('#lblNoiCapDoiTuongNN_View').html('---');
        } else {
            $('#lblNoiCapDoiTuongNN_View').html(data.NoiCap);
        }
        if (data.Email == "") {
            $('#lblEmailDoiTuongNN_View').html('---');
        } else {
            $('#lblEmailDoiTuongNN_View').html(data.Email);
        }

        if (data.NgayCap == "" || data.NgayCap == null) {
            $('#lblNgayCapDoiTuongNN_View').html('---');
        } else {
            $('#lblNgayCapDoiTuongNN_View').html(data.NgayCap);
        }

        if (data.GiaTriDen == "") {
            $('#lblCoGiaTriDoiTuongNN_View').html('---');
        } else {
            $('#lblCoGiaTriDoiTuongNN_View').html(data.GiaTriDen);
        }

        if (data.LoaiHoChieu == '0') {
            $('#lblLoaiHoChieuDoiTuongNN_View').html('---');
        } else if (data.LoaiHoChieu == '1') {
            $('#lblLoaiHoChieuDoiTuongNN_View').html('P');
        } else if (data.LoaiHoChieu == '2') {
            $('#lblLoaiHoChieuDoiTuongNN_View').html('O');
        } else if (data.LoaiHoChieu == '3') {
            $('#lblLoaiHoChieuDoiTuongNN_View').html('D');
        }

        if (data.MaSo == "") {
            $('#lblMaSoDoiTuongNN_View').html('---');
        } else {
            $('#lblMaSoDoiTuongNN_View').html(data.MaSo);
        }

        if (data.Thon == "") {
            $('#lblThonTuongNN_View').html('---');
        } else {
            $('#lblThonTuongNN_View').html(data.Thon);
        }

        if (data.GhiChu == "") {
            $('#lblGhiChuDoiTuongNN_View').html(`<p style="display: inline;font-weight: normal;">Ghi chú: </p> ` + '---');
        } else {
            $('#lblGhiChuDoiTuongNN_View').html('<p style="display: inline;font-weight: normal;">Ghi chú: </p>' + data.GhiChu);
        }
    }
}


//-------------------Tab View thông tin đối tượng người nước ngoài------------------
GridDoiTuongNN_List.on("rowClick", function (e, row) {
    var ID = row.getData().DoiTuongNNID;
    LoadDataDoiTuongNN_TabView(ID);
   //LoadDataTableCungLD_TabQuaTrinh(ID);
    $('#btnSua2').attr("data", ID);
    $('#btnXoa2').attr("data", ID);
    $('#btnXem2').attr("data", ID);
    $('#DoiTuongNNID').value(ID);
    LoadDataQuaTrinhTT_TabView(ID);
});

$(document).on('click', '#btn-layout-2', async function () {
    $('#grid-layout').hide();
    $('#list-layout').fadeIn(200);
    $('#list-layout').addClass('show');
    $('#grid-layout').removeClass('show');
});

function ResetTT_TabView() {
    $('#lblTenDoiTuongNNMain_View').html('Chưa có thông tin đối tượng');
    $('#lblDiaChiDoiTuongNNMain_View').html('---');
    $('#lblHovaTenDoiTuongNN_View').html('---');
    $('#lblGioiTinhDoiTuongNN_View').html('---');
    $('#lblNgaySinhDoiTuongNN_View').html('---');
    $('#lblQuocTichDoiTuongNN_View').html('---');
    $('#lblSoHoChieuDoiTuongNN_View').html('---');
    $('#lblNgayCapDoiTuongNN_View').html('---');
    $('#lblNoiCapDoiTuongNN_View').html('---');
    $('#lblDiaChiDoiTuongNN_View').html('---');
    $('#lblXaDoiTuongNN_View').html('---');
    $('#lblHuyenDoiTuongNN_View').html('---');
    $('#lblTinhDoiTuongNN_View').html('---');
    $('#lblSoDienThoaiDoiTuongNN_View').html('---');
    $('#lblEmailDoiTuongNN_View').html('---');
    $('#lblCoGiaTriDoiTuongNN_View').html('---');
    $('#lblLoaiHoChieuDoiTuongNN_View').html('---');
    $('#lblMaSoDoiTuongNN_View').html('---');
    $('#lblThonTuongNN_View').html(`<p style="display: inline;font-weight: normal;">Ghi chú: </p> ` + '---');
    $('#lblGhiChuDoiTuongNN_View').html(`<p style="display: inline;font-weight: normal;">Ghi chú: </p> ` + '---');
}

$(document).on('click', '#btn-layout-2', function () {
    ResetTT_TabView();
    $('#btnSua2').removeAttr("data");
    $('#btnXem2').removeAttr("data");
    $('#btnXoa2').removeAttr("data");
    var selectedRows = GridDoiTuongNN_List.getSelectedRows(); // Lấy các dòng đang được chọn
    if (selectedRows.length > 0) {
        selectedRows.forEach(function (row) {
            row.deselect(); // Bỏ chọn từng dòng
        });
    }
});

$(document).on('click', '#btnSua2', function () {
    if (GridDoiTuongNN_List.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
        return false;
    }
    var ID = $(this).attr('data');
    SuaDuLieuDoiTuongNN_us(ID);
    tempSuaTTTabView = true;
});

$(document).on('click', '#btnXem2', function () {
    if (GridDoiTuongNN_List.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
        return false;
    }
    var ID = $(this).attr('data');
    showModalXemThongTinDoiTuongNN_us(ID);
});


function XoaDuLieu_TabView(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'DoiTuongNNID', ID: ID, TenBangHienTai: 'DoiTuongNN', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/DoiTuongNN/XoaDuLieu', { id: ID });
                if (!result.Err) {
                    LoadDataTable();
                    ResetTT_TabView();
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

$(document).on('click', '#btnXoa2', function () {
    if (GridDoiTuongNN_List.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieu_TabView(ID);
});


function LoadDataDoiTuongNN_mdXemthongTin(ID) {
    const result = NTS.getAjax('/DanhMuc/DoiTuongNN/XemThongTinDoiTuongNN_mdXemThongTin', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#mdXemTTDoiTuongNN').html('Xem thông tin đối tượng: ' + data.HoVaTen);
        $('#lblTenDoiTuongNN_usXem').html(data.HoVaTen);
        $('#lblGioiTinhDoiTuongNN_usXem').html(data.TenGioiTinh);
        $('#lblNgaySinhDoiTuongNN_usXem').html(data.NgayThangNamSinh);
        $('#lblQuocTichDoiTuongNN_usXem').html(data.TenQuocTich);
        $('#lblSoHoChieuDoiTuongNN_usXem').html(data.SoHoChieu);
        $('#lblNgayCapDoiTuongNN_usXem').html(data.NgayCap);
        $('#lblDiaChiDoiTuongNN_usXem').html(data.DiaChiCuThe);
        $('#lblXaDoiTuongNN_usXem').html(data.Xa);
        $('#lblhuyenDoiTuongNN_usXem').html(data.Huyen);
        $('#lblTinhDoiTuongNN_usXem').html(data.Tinh);
        if (data.SoDienThoai == "") {
            $('#lblSoDienThoaiDoiTuong_usXem').html('---');
        } else {
            $('#lblSoDienThoaiDoiTuong_usXem').html(formatPhoneNumber(data.SoDienThoai));
        }
        if (data.NoiCap == "" || data.NoiCap == null) {
            $('#lblNoiCapDoiTuongNN_usXem').html('---');
        } else {
            $('#lblNoiCapDoiTuongNN_usXem').html(data.NoiCap);
        }

        if (data.Email == "") {
            $('#lblEmailDoiTuongNN_usXem').html('---');
        } else {
            $('#lblEmailDoiTuongNN_usXem').html(data.Email);
        }

        if (data.GiaTriDen == "") {
            $('#lblCoGiaTriDen_usXem').html('---');
        } else {
            $('#lblCoGiaTriDen_usXem').html(data.GiaTriDen);
        }

        if (data.LoaiHoChieu == '0') {
            $('#lblLoaiHoChieuDoiTuongNN_usXem').html('---');
        } else if (data.LoaiHoChieu == '1') {
            $('#lblLoaiHoChieuDoiTuongNN_usXem').html('P');
        } else if (data.LoaiHoChieu == '2') {
            $('#lblLoaiHoChieuDoiTuongNN_usXem').html('O');
        } else if (data.LoaiHoChieu == '3') {
            $('#lblLoaiHoChieuDoiTuongNN_usXem').html('D');
        }

        if (data.MaSo == "") {
            $('#lblMaSoDoiTuongNN_usXem').html('---');
        } else {
            $('#lblMaSoDoiTuongNN_usXem').html(data.MaSo);
        }

        if (data.Thon == "") {
            $('#lblThonDoiTuongNN_usXem').html('---');
        } else {
            $('#lblThonDoiTuongNN_usXem').html(data.Thon);
        }

        if (data.GhiChu == "") {
            $('#lblGhiChuDoiTuongNN_usXem').html(`<p style="display: inline;font-weight: normal;">Ghi chú: </p> ` + '---');
        } else {
            $('#lblGhiChuDoiTuongNN_usXem').html('<p style="display: inline;font-weight: normal;">Ghi chú: </p>' + data.GhiChu);
        }
    }
}


function actionDropdownFormatter_TabQuaTrinhThuThap(cell, formatterParams, onRendered) {
    var ID = cell.getData().NguoiNNLVVNID;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
       <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
       <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
            <a  class="dropdown-item btnXemTT  " href="#" data="${ID}">
                 <i class="fa fa-eye " aria-hidden="true" style="paddding-right:10px; color:#019017"></i>&ensp;  Xem thông tin phiếu thu thập
           </a>
            <a  class="dropdown-item btnXoaTT" href="#" data="${ID}">
                <i class='fa fa-trash-o  text-danger'></i>&ensp;  Xóa phiếu thu thập
           </a>
           <a  class="dropdown-item btnInPhieuThuThap" href="#" data="${ID}" style="display: block;">
                    <i class='fa-solid fa-print' style="color: var(--tbl-btn-luuvadong) !important;"></i>&ensp;  In phiếu thu thập <i class="fa-solid fa-angle-right " style="float: right;margin-top: 5px;"></i>
               </a>
               
               <div id="hoverBox_CLD">
                    <a  class="dropdown-item btnInMau03 " href="#" data="${ID}">
                        In mẫu 03 thông tư 01/2022/TT-BLĐTBXH
                   </a>
                </div>
       </div>
       </div>`;

    return select;
}

var fmNoiDungTT = function (cell) {
    var ID = cell.getData().NguoiNNLVVNID;
    var NoiDung = cell.getValue();
    if (NoiDung == "" || NoiDung == null) {
        return ``;
    } else {
        if (NoiDung.length > 40) {
            NoiDung = NoiDung.substring(0, 30) + "...";
            return `
                        <div class="col-md-12" style="padding-right: 0px; padding-left: 0px; padding-bottom:4px;">
                            <div class="Content-text">${NoiDung}<span class='btnXemThemNoiDung' style='color:var(--tblr-primary);'  title="Xem chi tiết nội dung thu thập" data='${ID}' data-loai='TC'>Xem thêm</span></div>
                        </div>`;
        } else {
            return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${NoiDung}</p>
                    </div>`;
        }

    }
}
//-------------------Grid thu thập người nước ngoài làm việc tại VN---------------//
var Grid_QuaTrinhThuThap_TabView = new Tabulator("#Grid_QuaTrinhThuThap_TabView", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: '400px',
    columns: [
        {
            title: '<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
            field: "actions",
            formatter: actionDropdownFormatter_TabQuaTrinhThuThap, width: 60, headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", headerSort: false
        },
        { title: "Ngày thu thập", field: "NgayThuThap", formatter: 'textarea', width: 120, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center" },
        { title: "Họ và tên", field: "HoVaTen", formatter: 'textarea', minWidth: 150, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Giới tính", field: "TenGioiTinh", formatter: 'textarea', minWidth: 110, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Ngày sinh", field: "NgayThangNamSinh", formatter: 'textarea', vertAlign: "middle", minWidth: 130, headerHozAlign: "center", hozAlign: "center" },
        { title: "Quốc tịch", field: "TenQuocTich", formatter: 'textarea', vertAlign: "middle", minWidth: 140, headerHozAlign: "center", hozAlign: "left" },
        { title: "Số hộ chiếu", field: "SoHoChieu", formatter: 'textarea', vertAlign: "middle", minWidth: 130, headerHozAlign: "center", hozAlign: "left" },
        { title: "Ngày cấp", field: "NgayCap", formatter: 'textarea', vertAlign: "middle", minWidth: 120, headerHozAlign: "center", hozAlign: "center" },
        { title: "Trình độ", field: "TenTrinhDo", formatter: 'textarea', vertAlign: "middle", minWidth: 180, headerHozAlign: "center", hozAlign: "left" },
        { title: "Chuyên ngành đào tạo", field: "TenChuyenNganhDT", formatter: 'textarea', vertAlign: "middle", minWidth: 180, headerHozAlign: "center", hozAlign: "left" },
        { title: "GPLĐ/Giấy xác nhận không thuộc diện cấp GPLĐ", field: "GiayPhepLD", formatter: 'textarea', vertAlign: "middle", minWidth: 250, headerHozAlign: "center" },
        { title: "Nơi làm việc", field: "DiaDiemLV", formatter: 'textarea', vertAlign: "middle", minWidth: 350, headerHozAlign: "center" },
        { title: "Thời hạn làm việc", field: "ThoiHanLV", formatter: 'textarea', vertAlign: "middle", minWidth: 260, headerHozAlign: "center" },
        { title: "Nội dung thu thập", field: "NoiDungThuThap", formatter: fmNoiDungTT, vertAlign: "middle", minWidth: 275, headerHozAlign: "center" },
        { title: "NguoiNNLVVNID", field: "NguoiNNLVVNID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

async function LoadDataQuaTrinhTT_TabView(ID) {
    Grid_QuaTrinhThuThap_TabView.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/DoiTuongNN/GetQuaTrinhThuThap", { id: ID });
    if (!GetAll.Err) {
        Grid_QuaTrinhThuThap_TabView.setData(GetAll.Result);
        Grid_QuaTrinhThuThap_TabView.redraw(1);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.thongbaoloi(GetAll.Msg);
}


$(document).on('keyup', '#timkiem_QuaTrinhThuTap_TabView', function (e) {
    if (e.keyCode == '13') {
        Grid_QuaTrinhThuThap_TabView.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid_QuaTrinhThuThap_TabView.setFilter(matchAny, { value: $('#timkiem_QuaTrinhThuTap_TabView').val() });
});

//--------------------------------Lưới hiển thị thông tin quá trình thu thập của người nước ngoài trong modal xem thông tin dt-----------------------

var Grid_QuaTrinhThuThap_mdXem = new Tabulator("#Grid_QuaTrinhThuThap_mdXem", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: '80vh',
    columns: [
        { title: "Ngày thu thập", field: "NgayThuThap", formatter: 'textarea', width: 120, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center" },
        { title: "Họ và tên", field: "HoVaTen", formatter: 'textarea', minWidth: 150, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Giới tính", field: "TenGioiTinh", formatter: 'textarea', minWidth: 110, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Ngày sinh", field: "NgayThangNamSinh", formatter: 'textarea', vertAlign: "middle", minWidth: 130, headerHozAlign: "center", hozAlign: "center" },
        { title: "Quốc tịch", field: "TenQuocTich", formatter: 'textarea', vertAlign: "middle", minWidth: 140, headerHozAlign: "center", hozAlign: "left" },
        { title: "Số hộ chiếu", field: "SoHoChieu", formatter: 'textarea', vertAlign: "middle", minWidth: 130, headerHozAlign: "center", hozAlign: "left" },
        { title: "Ngày cấp", field: "NgayCap", formatter: 'textarea', vertAlign: "middle", minWidth: 120, headerHozAlign: "center", hozAlign: "center" },
        { title: "Trình độ", field: "TenTrinhDo", formatter: 'textarea', vertAlign: "middle", minWidth: 180, headerHozAlign: "center", hozAlign: "left" },
        { title: "Chuyên ngành đào tạo", field: "TenChuyenNganhDT", formatter: 'textarea', vertAlign: "middle", minWidth: 180, headerHozAlign: "center", hozAlign: "left" },
        { title: "GPLĐ/Giấy xác nhận không thuộc diện cấp GPLĐ", field: "GiayPhepLD", formatter: 'textarea', vertAlign: "middle", minWidth: 250, headerHozAlign: "center" },
        { title: "Nơi làm việc", field: "DiaDiemLV", formatter: 'textarea', vertAlign: "middle", minWidth: 350, headerHozAlign: "center" },
        { title: "Thời hạn làm việc", field: "ThoiHanLV", formatter: 'textarea', vertAlign: "middle", minWidth: 260, headerHozAlign: "center" },
        { title: "Nội dung thu thập", field: "NoiDungThuThap", formatter: fmNoiDungTT, vertAlign: "middle", minWidth: 275, headerHozAlign: "center" },
        { title: "NguoiNNLVVNID", field: "NguoiNNLVVNID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataQuaTrinhTT_ModalView(ID) {
    Grid_QuaTrinhThuThap_mdXem.clearData();
    const GetAll = NTS.getAjax("/DanhMuc/DoiTuongNN/GetQuaTrinhThuThap", { id: ID });
    if (!GetAll.Err) {
        Grid_QuaTrinhThuThap_mdXem.setData(GetAll.Result);
        Grid_QuaTrinhThuThap_mdXem.redraw(1);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.thongbaoloi(GetAll.Msg);
}
$(document).on('keyup', '#timKiem_tllg_us_View', function (e) {
    if (e.keyCode == '13') {
        Grid_QuaTrinhThuThap_mdXem.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid_QuaTrinhThuThap_mdXem.setFilter(matchAny, { value: $('#timKiem_tllg_us_View').val() });
});



////-------------------Xuất dữ liệu phieu 03------------------//

$(document).on('click', '.btnInMau03', function () {
    var ID = $(this).attr('data');
    XuatMau03_TT01(ID);
});

async function XuatMau03_TT01(ID) {
    var data = await NTS.getAjaxAsync('/DanhMuc/DoiTuongNN/XuatMau03', { id: ID });
    //window.open(data);
    try {
        $('#divNoiDung_us').attr("src", data.replace(".docx", ".pdf"));
        $('#modal_xemtruockhiin_us').modal('show');
        $('#modal_taifile_us').show();
        $('#modal_taifile2_us').hide();
    } catch (ex) {

    }
}


//------------------------------Xóa lao động nước ngoài-----------------------------

function XoaDuLieu_NguoiNNLVVN(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'NguoiNNLVVNID', ID: ID, TenBangHienTai: 'NguoiNNLVVN', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/DoiTuongNN/XoaDuLieu_NguoiNNLVVN', { id: ID });
                if (!result.Err) {
                    LoadDataQuaTrinhTT_TabView($('#DoiTuongNNID').value());
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

$(document).on('click', '.btnXoaTT', function () {
    var ID = $(this).attr('data');
    XoaDuLieu_NguoiNNLVVN(ID);
});

//--------------------------Xem thông tin phiếu thu thập---------------------------
function ShowModal_XemThongTinNguoiNNLVVN_us(ID) {
    $('#mdXemThongTinNguoiNNLVVN_us').modal('show');
    const result = NTS.getAjax('/DanhMuc/DoiTuongNN/LoadDuLieuXem', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#lblTieuDeThongTinCungLaoDong').html("Xem thông tin thu thập đối tượng  " + data.HoVaTen + " - Số hộ chiếu: " + data.SoHoChieu + ", ngày cấp: " + data.NgayCap);
        $('#lblNgayThuThap_us').html(data.NgayThuThap);
        $('#lblHoVaTen_us').html(data.HoVaTen);
        $('#lblGioiTinh_us').html(data.TenGioiTinh);
        $('#lblNgaySinh_us').html(data.NgayThangNamSinh);
        $('#lblQuocTich_us').html(data.TenQuocTich);
        $('#lblSoHoChieu_us').html(data.SoHoChieu);
        if (data.LoaiHoChieu == "" || data.LoaiHoChieu == null) {
            $('#lblLoaiHoChieu_us').html('---')
        } else {
            $('#lblLoaiHoChieu_us').html(data.LoaiHoChieu);
        }
        if (data.MaSo == "" || data.MaSo == null) {
            $('#lblMaSo_us').html('---')
        } else {
            $('#lblMaSo_us').html(data.MaSo);
        }
        if (data.NgayCap == "" || data.NgayCap == null) {
            $('#lblNgayCap_us').html('---')
        } else {
            $('#lblNgayCap_us').html(data.NgayCap);
        }
        if (data.GiaTriDen == "" || data.GiaTriDen == null) {
            $('#lblCoGiaTriDen_us').html('---')
        } else {
            $('#lblCoGiaTriDen_us').html(data.GiaTriDen);
        }
        if (data.NoiCap == "" || data.NoiCap == null) {
            $('#lblNoiCap_us').html('---')
        } else {
            $('#lblNoiCap_us').html(data.NoiCap);
        }
        if (data.SoDienThoai == "" || data.SoDienThoai == null) {
            $('#lblSoDienThoai_us').html('---')
        } else {
            $('#lblSoDienThoai_us').html(formatPhoneNumber(data.SoDienThoai));
        }
        if (data.Email == "" || data.Email == null) {
            $('#lblEmail_us').html('---')
        } else {
            $('#lblEmail_us').html(data.Email);
        }
        if (data.NoiDungThuThap == "" || data.NoiDungThuThap == null) {
            $('#lblNoiDungTT_us').html('---')
        } else {
            $('#lblNoiDungTT_us').html(data.NoiDungThuThap);
        }
        if (data.TrinhDoDaoTao == "" || data.TrinhDoDaoTao == null) {
            $('#lblTrinhDoDaoTao_us').html('---')
        } else {
            $('#lblTrinhDoDaoTao_us').html(data.TrinhDoDaoTao);
        }
        if (data.TenChuyenNganh == "" || data.TenChuyenNganh == null) {
            $('#lblChuyenNganhDT_us').html('---')
        } else {
            $('#lblChuyenNganhDT_us').html(data.TenChuyenNganh);
        }
        if (data.GiayPheLD == "" || data.GiayPheLD == null) {
            $('#lblGiayPhepLD_us').html('---')
        } else {
            $('#lblGiayPhepLD_us').html(data.GiayPheLD);
        }
        if (data.DiaDiemLV == "" || data.DiaDiemLV == null) {
            $('#lblDiaDiemNLV_us').html('---')
        } else {
            $('#lblDiaDiemNLV_us').html(data.DiaDiemLV);
        }
        $('#lblToChuc_us').html(data.ToChuc);
        $('#lblThoiGianLV_us').html(data.ThoiGianLV);
        $('#lblNguoiCungCapThongTin_us').html(data.NguoiCungCapTT);
        if (data.LoaiHinhDN == "" || data.LoaiHinhDN == null) {
            $('#lblLoaiHinhDN_us').html('---')
        } else {
            $('#lblLoaiHinhDN_us').html(data.LoaiHinhDN);
        }
        if (data.NgheCV == "" || data.NgheCV == null) {
            $('#lblNgheCongViec_us').html('---')
        } else {
            $('#lblNgheCongViec_us').html(data.NgheCV);
        }
        if (data.ViTriCV == "" || data.ViTriCV == null) {
            $('#lblViTriCV_us').html('---')
        } else {
            $('#lblViTriCV_us').html(data.ViTriCV);
        }
        // ĐÍnh kèm chữ ký
        $('#file-dinh-kem-chu-ky').html('');
        if (data.ChuKy != null && data.ChuKy.length > 0) {
            let linkVB = data.ChuKy;
            let arrFile = linkVB.split('*');
            for (let p = 0; p < arrFile.length - 1; p++) {
                if (arrFile[p].lastIndexOf('.') != -1) {
                    // file có đuôi .*
                    if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".docx" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".PDF"
                    ) {
                        $('#file-dinh-kem-chu-ky').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('${arrFile[p].replace('~', '')}')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                </div>`);
                    } else {
                        $('#file-dinh-kem-chu-ky').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                </div>`);
                    }
                } else {
                    // file không đuôi
                    $('#file-dinh-kem-chu-ky').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                </div>`);
                }
            }
        } else {
            $('#file-dinh-kem-chu-ky').html('Chưa có đính kèm chữ ký');
            $('#file-dinh-kem-chu-ky').css({
                "color": "rgb(216 213 213)",
                "font-weight": "500",
            });
        }

        //Xem Đính kèm file
        $('#list-file-xem-dinh-kem-cung-lao-dong').html('');
        $('#list-file-xem-dinh-kem-cung-lao-dong').css({ "padding": "0" });
        if (data.DinhKem != null && data.DinhKem.length > 0) {
            let linkVB = data.DinhKem;
            let arrFile = linkVB.split('*');
            for (let p = 0; p < arrFile.length - 1; p++) {
                if (arrFile[p].lastIndexOf('.') != -1) {
                    // file có đuôi .*
                    if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".docx" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".PDF"
                    ) {
                        $('#list-file-xem-dinh-kem-cung-lao-dong').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('${arrFile[p].replace('~', '')}')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                </div>`);
                    } else {
                        $('#list-file-xem-dinh-kem-cung-lao-dong').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                </div>`);
                    }
                } else {
                    // file không đuôi
                    $('#list-file-xem-dinh-kem-cung-lao-dong').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                </div>`);
                }
            }
        } else {
            $('#list-file-xem-dinh-kem-cung-lao-dong').html('Chưa có đính kèm');
            $('#list-file-xem-dinh-kem-cung-lao-dong').css({
                "text-align": "center",
                "color": "rgb(216 213 213)",
                "font-weight": "500",
                "padding": "30px 0"
            });

        }

    }
}
$(document).on('click', '.download-file-attachments', function () {
    window.open($(this).attr('data-url-file'));
    return false;
});
$(document).on('click', '.btnXemTT', function () {
    var ID = $(this).attr('data');
    ShowModal_XemThongTinNguoiNNLVVN_us(ID);
});

// Xem chi tiết nội dung ghi chú hộ gia đình
$(document).on('click', '.btnXemThemNoiDung', function () {
    $('#NguoiNNLVVNID').val($(this).attr('data'));
    XemChiTietNoiDung($(this).attr('data'));
});

function XemChiTietNoiDung(ID) {
    $("#mdXemThemNoiDungTT").modal('show');
    $('#tieuDeModalCT').text('Chi tiết nội dung nội dung thu thập');
    const result = NTS.getAjax("/DanhMuc/DoiTuongNN/NoiDungThuThapCT", { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#NoiDungThuThap_CT').html(data.NoiDungThuThap);
    } else {
        $('#NoiDungThuThap_CT').html("Chưa có dữ liệu");
    }
    return;
}