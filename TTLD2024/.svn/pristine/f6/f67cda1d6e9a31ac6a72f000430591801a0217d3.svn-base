var tempthem = "them";
var tenBangThamChieu = 'NguoiNNLVVN';
var mangGiaTriDauDT = [];
var mangGiaTriSauDT = [];
var mangGiaTriDauTC = [];
var mangGiaTriSauTC = [];

$(function () {
    LoadTimKiem();
    //getLocation();
});

$(document).ready(function () {
    setTimeout(function () {
        PhanQuyenComBoDiaBan('TinhID_TimKiem_us', 'HuyenID_TimKiem_us', 'XaID_TimKiem_us', 'ThonID_TimKiem_us');
    }, 200);
    NTS.hienNgayDauNamLenTextbox('TuNgay_TimKiem_US');
    NTS.hienNgayCuoiNamLenTextbox('DenNgay_TimKiem_US');
    ThietLapCotTrenLuoi(tenBangThamChieu, Grid1); // thiết lập cột trên lưới
    LoadDataTable();

    //Định dạng nhập xxxx.xxx.xxx cho số điện thoại modal thêm mới tổ chức
    $('#SoDienThoaiDoiTuongNN_us').on('input', function () {
        formatPhoneNumberNhap(this);
    });

    // Restrict input to numbers only
    $('#SoDienThoaiDoiTuongNN_us').on('keydown', function (event) {
        // Allow control keys (backspace, delete, tab, etc.)
        if (event.ctrlKey || event.metaKey || [8, 46, 37, 38, 39, 40, 9, 27, 13].includes(event.keyCode)) {
            return;
        }
        // Check if event.key is defined and allow only numeric input
        if (event.key && event.key.match(/[\d]/)) {
            return;
        }
        // Prevent default action if not allowed
        event.preventDefault();
    });
});

//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiemNangCao', function () {
    if ($('#KhungTimKiem').css('display') == "block") {
        $('#KhungTimKiem').slideUp(200);
    } else {
        $('#KhungTimKiem').slideDown(200);
    }
    return false;
});
$(document).on('click', '#DongTimKiem', function () {
    $('#KhungTimKiem').slideUp(200);
    return false;
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
        NTS.loadDataCombo({
            name: '#QuocTichID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetCombo_QuocGiaLVNuocNgoai',
            columns: 1,
            indexValue: 0,
            indexText: 2,
            textShowTatCa: '-Chọn-',
            showTatCa: !0,
        });

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


// Kiểm tra và thay thế giá trị null hoặc "00000000-0000-0000-0000-000000000000" bằng ""
function replaceNullAndEmptyString(value) {
    if (value === null || value === "00000000-0000-0000-0000-000000000000") {
        return "";
    }
    return value;
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

function actionDropdownFormatter(cell, formatterParams, onRendered) {
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
           <a  class="dropdown-item btnSuaTT  " href="#" data="${ID}">
                <i class="fa fa-pencil text-warning" aria-hidden="true"></i>&ensp;  Chỉnh sửa phiếu thu thập
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
//-------------------Grid thu thập người nước ngoài làm việc tại VN---------------//
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
        { title: "Ngày thu thập", field: "NgayThuThap", formatter: 'textarea', width: 120, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center" },
        { title: "Họ và tên", field: "HoVaTen", formatter: 'textarea', minWidth: 150, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Giới tính", field: "TenGioiTinh", formatter: 'textarea', minWidth: 110, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Ngày sinh", field: "NgayThangNamSinh", formatter: 'textarea', vertAlign: "middle", minWidth: 130, headerHozAlign: "center", hozAlign: "center" },
        { title: "Quốc tịch", field: "TenQuocTich", formatter: 'textarea', vertAlign: "middle", minWidth: 140, headerHozAlign: "center", hozAlign: "left" },
        { title: "Số hộ chiếu", field: "SoHoChieu", formatter: 'textarea', vertAlign: "middle", minWidth: 130, headerHozAlign: "center", hozAlign: "left"},
        { title: "Ngày cấp", field: "NgayCap", formatter: 'textarea', vertAlign: "middle", minWidth: 120, headerHozAlign: "center", hozAlign: "center"},
        { title: "Trình độ", field: "TenTrinhDo", formatter: 'textarea', vertAlign: "middle", minWidth: 180, headerHozAlign: "center", hozAlign: "left" },
        { title: "Chuyên ngành đào tạo", field: "TenChuyenNganhDT", formatter: 'textarea', vertAlign: "middle", minWidth: 180, headerHozAlign: "center", hozAlign: "left" },
        { title: "GPLĐ/Giấy xác nhận không thuộc diện cấp GPLĐ", field: "GiayPhepLD", formatter: 'textarea', vertAlign: "middle", minWidth: 250, headerHozAlign: "center" },
        { title: "Nơi làm việc", field: "DiaDiemLV", formatter: 'textarea', vertAlign: "middle", minWidth: 350, headerHozAlign: "center" },
        { title: "Thời hạn làm việc", field: "ThoiHanLV", formatter: 'textarea' , vertAlign: "middle", minWidth: 260, headerHozAlign: "center" },
        { title: "Nội dung thu thập", field: "NoiDungThuThap", formatter: fmNoiDungTT, vertAlign: "middle", minWidth: 275, headerHozAlign: "center" },
        { title: "NguoiNNLVVNID", field: "NguoiNNLVVNID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

async function LoadDataTable() {
    var saveData = new Array();
    saveData[0] = $('#TinhID_TimKiem_us').value();
    saveData[1] = $('#HuyenID_TimKiem_us').value();
    saveData[2] = $('#XaID_TimKiem_us').value();
    saveData[3] = $('#ThonID_TimKiem_us').value();
    saveData[4] = $('#timKiem').value();
    saveData[5] = $('#TuNgay_TimKiem_US').value();
    saveData[6] = $('#DenNgay_TimKiem_US').value();
    saveData[7] = $('#QuocTichID_TimKiem_us').value();
    saveData[8] = $('#lblNamTrongKCN_TimKiem_us').value();
    Grid1.clearData();
    const GetAll = await NTS.getAjaxAsync("/QuanLy/NguoiNNLVVN/GetAll", { data: saveData });
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
        Grid1.redraw(1);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.thongbaoloi(GetAll.Msg);
    GridKhongCoDuLieu("Grid1");
}


TimKiem//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiem', async function () {
    await LoadDataTable();
    $('#KhungTimKiem').slideUp(200);
    return false;

});

// Xem chi tiết nội dung ghi chú hộ gia đình
$(document).on('click', '.btnXemThemNoiDung', function () {
    $('#NguoiNNLVVNID').val($(this).attr('data'));
    XemChiTietNoiDung($(this).attr('data'));
});

function XemChiTietNoiDung(ID) {
    $("#mdXemThemNoiDungTT").modal('show');
    $('#tieuDeModalCT').text('Chi tiết nội dung nội dung thu thập');
    const result = NTS.getAjax("/QuanLy/NguoiNNLVVN/NoiDungThuThapCT", { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#NoiDungThuThap_CT').html(data.NoiDungThuThap);
    } else {
        $('#NoiDungThuThap_CT').html("Chưa có dữ liệu");
    }
    return;
}

//--------------------------Thêm mới thu thập---------------------------

function showModalThemMoiNguoiNNLVVN() {
    $('#SelectDoiTuongNN_US').prop('disabled', false);
    $('#HienThiTatCaDoiTuongNN').prop('disabled', false);
    $('#SoHoChieuDoiTuongNNTT_us').prop('disabled', false);
    $('#mdThemMoiThuThapNguoiNNLVVN_us').modal('show');
    resetForm('#mdThemMoiThuThapNguoiNNLVVN_us');
    NTS.hienNgayHienTaiLenTextbox('NgayThuThapDoiTuongNN_usTT');
    $('#TrangThaiDoiTuongNN_us').value(true);
    UpdateLabelDangSD('#TrangThaiDoiTuongNN_us');
    $('#SelectToChuc_US').html('<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn tổ chức- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>');
    $('#SelectToChuc_US').attr('value', "");
    $('#SelectDoiTuongNN_US').html('<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn tối tượng- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>');
    $('#SelectDoiTuongNN_US').attr('value', "");
    ResetDinhKemFile();// đính kèm
    // Đính kèm chữ ký
    $('#imgHienThiKyTen').css('background-image', 'none');
    $('#txtDuongDanFileChuKy').value('');
    $('#imgHienThiKyTen').attr('data-url-file', '');
    $('#XemDinhKemChuKy_CauLD').attr('data-url-file', '');
    $('#XoaChuKy').attr('data-url-file', '');
    $('#XoaChuKy').css({ 'display': 'none' });
    $('#TaiChuKy').css({ 'display': 'block' });
    if ($('#txtDuongDanFileChuKy').value() != "") {
        $('#XoaChuKy').css({ 'display': 'block' });
        $('#icon_XemDinhKemChuKy_CauLD').css({ 'display': 'block' });
        $('#TaiChuKy').css({ 'display': 'none' });
    } else {
        $('#XoaChuKy').css({ 'display': 'none' });
        $('#icon_XemDinhKemChuKy_CauLD').css({ 'display': 'none' });
        $('#TaiChuKy').css({ 'display': 'block' });
    }
}

$(document).on('click', '#btnThemMoi', function () {
    tempthem = 'them';
    showModalThemMoiNguoiNNLVVN();
});


// Hàm load combo tổ chức
// Load ra combo tổ chức của địa bàn
function LoadComBoToChuc(TinhID, HuyenID, XaID, ThonID) {
    $('.listOption').html('');
    $('#ToChucID_ChuHo').html('');
    $('#ListDataToChuc').append(`<li action="false" style="position: sticky;top: 0;background-color: white;">
                        <div class="row" style="width: 100%">
                        <div class="form-col-12">
                            <input type="text" class="form-control" id="ckTimKiemToChuc" onkeypress="FillterToChuc()">
                        </div>
                        </div>
                    </li>`);
    $('#ListDataToChuc').append(`<li action="chon" class="itemToChuc"><div class="opInfo Chon"><div>-Chọn tổ chức-</div></li>`);

    var saveData = [TinhID, HuyenID, XaID, ThonID];
    const kq = NTS.getAjax('/DanhMuc/DungChung/GetToChuc_ComboToChuc', { data: saveData }).Result;

    // Chỉ load 20 dòng dữ liệu đầu tiên
    const initialItems = 20;
    for (var i = 0; i < kq.length; i++) {
        $('#ToChucID_ChuHo').append(`<option value="${kq[i].ToChucID}"
                            data-name="${kq[i].TenToChuc}"
                            data-name-NSD="${TraVeTenVietTat(kq[i].TenToChuc)}"
                            data-name-KCN="${kq[i].TenKCN_CLD}"
                            data-code="${kq[i].MaToChuc}"
                            data-masothue="${kq[i].MaSoThue}"
                            data-NoiThuongTru="${kq[i].DiaChiCuThe}"
                            data-tinh="${kq[i].Tinh}"
                            data-huyen="${kq[i].Huyen}"
                            data-xa="${kq[i].Xa}"
                            data-thon="${kq[i].Thon}"
                            data-loaiHinhDN="${kq[i].LoaiHinhDNID}"
                            ></option>`);
        $('#ToChucID_ChuHo').value(kq[i].ToChucID);

        var ToChucID = kq[i].ToChucID;
        var name = kq[i].TenToChuc;
        var name_NSD = TraVeTenVietTat(kq[i].TenToChuc);
        var name_KCN = kq[i].TenKCN_CLD;
        var code = kq[i].MaToChuc;
        var masothue = kq[i].MaSoThue;
        var NoiThuongTru = kq[i].DiaChiCuThe;
        var tinh = kq[i].Tinh;
        var huyen = kq[i].Huyen;
        var xa = kq[i].Xa;
        var thon = kq[i].Thon;
        const mauNgauNhien = getRandomColors(Color, 1);
        var item = `<li action="true" class="itemToChuc" data-name="${name}" data-code="${code}" data-NoiThuongTru="${kq[i].DiaChiCuThe}" value="${ToChucID}" data-masothue="${kq[i].MaSoThue}" data-loaiHinhDN="${kq[i].LoaiHinhDNID}" style="display: none;">
                        <div class="opImg" style="background-color:${mauNgauNhien}">${name_NSD}</div>
                        <div class="opInfo"><div><b>${name}</b> (${code}), Số ĐKKD/Mã số thuế: <b>${masothue}</b>, Người đại diện: <b>${kq[i].TenNguoiSuDungLD}</b></div>
                                <div class="text-diachi" title="${(thon == "" ? "" : thon + ", ")} ${xa}, ${huyen}, ${tinh}">Địa chỉ: <b>${NoiThuongTru}</b></div></div>
                    </li>`;
        $('#ListDataToChuc').append(item);
    }

    // Hiển thị 20 dòng đầu tiên
    $("#ListDataToChuc li").slice(0, initialItems).css("display", "flex");

    if (kq.length > initialItems) {
        $('#ListDataToChuc').append(`<li action="false" id="loadMoreToChucDK" onclick="LoadMoreToChuc()" style="justify-content: center;"> Xem thêm &nbsp<i class="fa fa-arrow-down" style="color: #0054a6" aria-hidden="true"></i></li>`);
    }
}


// Chọn Tổ chức từ combo
$(document).on('click', '#SelectToChuc_US', function () {
    var TinhID = $('#TinhID_TimKiem_us').value();
    var HuyenID = $('#HuyenID_TimKiem_us').value();
    var XaID = $('#XaID_TimKiem_us').value();
    var ThonID = $('#ThonID_TimKiem_us').value();
    LoadComBoToChuc(TinhID, HuyenID, XaID, ThonID);
});

//Chọn xuống tổ chức từ combo
$(document).on('click', '.itemToChuc', function () {
    var action = $(this).attr("action");
    if (action == "false") {
        return;
    }
    if (action == "chon") {
        var item = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn tổ chức- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
        $('#SelectToChuc_US').value('');
        //ResetThongTinToChuc();
    } else {
        var value = $(this).attr('value');
        var name = $(this).attr("data-name");
        var code = $(this).attr("data-code");
        var masothue = $(this).attr("data-masothue");
        var NoiThuongTru = $(this).attr("data-NoiThuongTru");
        var loaihinhDN = $(this).attr("data-loaiHinhDN");
        var item = `<li><span><b>${name}</b> <b>(${code})</b> - Địa chỉ: <b>${NoiThuongTru}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;

        $('#DiaChiDoiTuongNNTT_us').value(NoiThuongTru);
        $('#MaSoThueDoiTuongNNTT_us').value(masothue);
        $('#LoaiHinhDNIDDoiTuongNNTT_us').value(loaihinhDN);
        //// Lưu giá trị của tổ chức với trang thái ban đầu để so sánh nếu có thay đổi khi tiếp tục thì cảnh bảo
        mangGiaTriDauTC = [];
        mangGiaTriDauTC.push(replaceNullAndEmptyString(loaihinhDN));
    }

    $('.btn-select-tochuc').html(item);
    $('.btn-select-tochuc').attr('value', value);
    $('#ToChucID_ChuHo').value(value);
    $(".OptionToChuc").toggle();
});

async function LoadToChucChon() {
    var saveData = new Array();
    saveData[0] = $('#TinhID_timKiemToChuc_us_Chon').value();
    saveData[1] = $('#HuyenID_timKiemToChuc_us_Chon').value();
    saveData[2] = $('#XaID_timKiemToChuc_us_Chon').value();
    saveData[3] = $('#ThonID_timKiemToChuc_us_Chon').value();
    saveData[4] = $('#timKiemToChuc_us_Chon').value();
    saveData[5] = $('#LoaiHinhDN_timKiemToChuc_us_Chon').value();
    Grid_ChonToChuc_us.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/DungChung/GetAllToChuc_Chon", { data: saveData });
    if (!GetAll.Err) {
        Grid_ChonToChuc_us.setData(GetAll.Result);
        Grid_ChonToChuc_us.redraw(1);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.thongbaoloi(GetAll.Msg);
    GridKhongCoDuLieu("Grid_ChonToChuc_us");
}


/// CLick xem modal chọn danh sách tổ chức 
$(document).on('click', '#HienThiTatCaToChuc', function () {
    $('#mdChonToChuc_us').modal('show');
    LoadToChucChon();
});

//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#btntimKiemToChuc_us_Chon', function () {
    LoadToChucChon();
    $('#KhungTimKiem_ToChuc_us').slideUp(200);
    return false;
});

// click button chọn và đóng modal chọn tổ chức
$(document).on('click', '#btnChonToChucVaDong_us', function () {
    if (Grid_ChonToChuc_us.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
        return false;
    }
    var dataGrid = Grid_ChonToChuc_us.getSelectedRows()[0]._row.data;
    $('#DiaChiDoiTuongNNTT_us').value(dataGrid.DiaChiCuThe);
    $('#MaSoThueDoiTuongNNTT_us').value(dataGrid.MaSoThue);
    $('#LoaiHinhDNIDDoiTuongNNTT_us').value(dataGrid.LoaiHinhDNID);
    var item = `<li><span><b>${dataGrid.TenToChuc}</b> <b>(${dataGrid.MaToChuc})</b> - Địa chỉ: <b>${dataGrid.DiaChiCuThe}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
    $('.btn-select-tochuc').html(item);
    $('.btn-select-tochuc').attr('value', dataGrid.ToChucID);
    $('#ToChucID_ChuHo').value(dataGrid.ToChucID);
    $(".OptionToChuc").toggle();
    $('#mdChonToChuc_us').modal('hide');
    //// Lưu giá trị của tổ chức với trang thái ban đầu để so sánh nếu có thay đổi khi tiếp tục thì cảnh bảo
    mangGiaTriDauTC = [];
    mangGiaTriDauTC.push(replaceNullAndEmptyString(dataGrid.LoaiHinhDNID));
});

// Chọn 1 dòng dữ liệu tổ chức trên modal chọn tổ chuc
Grid_ChonToChuc_us.on("rowDblClick", function (e, row) {
    var dataGrid = row.getData();
    $('#DiaChiDoiTuongNNTT_us').value(dataGrid.DiaChiCuThe);
    $('#MaSoThueDoiTuongNNTT_us').value(dataGrid.MaSoThue);
    $('#LoaiHinhDNIDDoiTuongNNTT_us').value(dataGrid.LoaiHinhDNID);
    var item = `<li><span><b>${dataGrid.TenToChuc}</b> <b>(${dataGrid.MaToChuc})</b> - Địa chỉ: <b>${dataGrid.DiaChiCuThe}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
    $('.btn-select-tochuc').html(item);
    $('.btn-select-tochuc').attr('value', dataGrid.ToChucID);
    $('#ToChucID_ChuHo').value(dataGrid.ToChucID);
    $('#mdChonToChuc_us').modal('hide');
    //// Lưu giá trị của tổ chức với trang thái ban đầu để so sánh nếu có thay đổi khi tiếp tục thì cảnh bảo
    mangGiaTriDauTC = [];
    mangGiaTriDauTC.push(replaceNullAndEmptyString(dataGrid.LoaiHinhDNID));
});

// Xử lý combo đối tượng người nước ngoài.
 function LoadComBoDoiTuongNN(TinhID, HuyenID, XaID, ThonID) {
    $('.listOption').html('');
    $('#DoiTuongNNID_ChuHo').html('');
    $('#ListDataDoiTuongNN').append(`<li action="false" style="position: sticky;top: 0;background-color: white;">
                        <div class="row" style="width: 100%">
                        <div class="form-col-12">
                            <input type="text" class="form-control" id="ckTimKiemDoiTuongNN" onkeypress="FillterDoiTuongNN()">
                        </div>
                        </div>
                    </li>`);
    $('#ListDataDoiTuongNN').append(`<li action="chon" class="itemDoiTuongNN"><div class="opInfo Chon"><div>-Chọn đối tượng-</div></li>`);

    var saveData = [TinhID, HuyenID, XaID, ThonID];
     const kq = NTS.getAjax('/DanhMuc/DungChung/GetDoiTuongNN_ComBo', { data: saveData }).Result;
    // Chỉ load 20 dòng dữ liệu đầu tiên
    const initialItems = 20;
    for (var i = 0; i < kq.length; i++) {
        $('#DoiTuongNNID_ChuHo').append(`<option value="${kq[i].DoiTuongNNID}"
                            data-name="${kq[i].HoVaTen}"
                            data-name-NSD="${TraVeTenVietTat(kq[i].HoVaTen)}"
                            data-code="${kq[i].MaDoiTuongNN}"
                            data-sohochieu="${kq[i].SoHoChieu}"
                            data-NoiThuongTru="${kq[i].DiaChiCuThe}"
                            data-tinh="${kq[i].Tinh}"
                            data-huyen="${kq[i].Huyen}"
                            data-xa="${kq[i].Xa}"
                            data-thon="${kq[i].Thon}"
                            data-loaiHinhDN="${kq[i].LoaiHinhDNID}"
                            data-loaihochieu="${kq[i].LoaiHoChieu}"
                            data-maso="${kq[i].MaSo}"
                            data-ngaycap="${kq[i].NgayCap}"
                            data-ngaysinh="${kq[i].NgayThangNamSinh}"
                            data-giatriden="${kq[i].GiaTriDen}"
                            data-noicap="${kq[i].NoiCapID}"
                            data-sodienthoai="${kq[i].SoDienThoai}"
                            data-email="${kq[i].Email}"
                            data-tendantoc="${kq[i].QuocTichID}"
                            data-tengioitinh="${kq[i].TenGioiTinh}"
                            data-tenquoctich="${kq[i].TenQuocTich}"


                            ></option>`);
        $('#DoiTuongNNID_ChuHo').value(kq[i].DoiTuongNNID);

        var DoiTuongNNID = kq[i].DoiTuongNNID;
        var name = kq[i].HoVaTen;
        var name_NSD = TraVeTenVietTat(kq[i].HoVaTen);
        var code = kq[i].MaDoiTuongNN;
        var sohochieu = kq[i].SoHoChieu;
        var NoiThuongTru = kq[i].DiaChiCuThe;
        var tinh = kq[i].Tinh;
        var huyen = kq[i].Huyen;
        var xa = kq[i].Xa;
        var thon = kq[i].Thon;
        const mauNgauNhien = getRandomColors(Color, 1);
        var item = `<li action="true" class="itemDoiTuongNN" data-name="${name}" data-code="${code}"
                                        data-tengioitinh="${kq[i].TenGioiTinh}"
                                        data-tenquoctich="${kq[i].TenQuocTich}"
                                        data-ngaycap="${kq[i].NgayCap}"
                                        data-sodienthoai="${kq[i].SoDienThoai}"
                                        data-email="${kq[i].Email}"
                                        data-giatriden="${kq[i].GiaTriDen}"
                                        data-ngaysinh="${kq[i].NgayThangNamSinh}"
                                        data-maso="${kq[i].MaSo}"
                                        data-noicap="${kq[i].NoiCapID}"
                                        data-NoiThuongTru="${kq[i].DiaChiCuThe}" value="${DoiTuongNNID}"  
                                        data-loaihochieu="${kq[i].LoaiHoChieu}" data-sohochieu="${kq[i].SoHoChieu}" style="display: none;">
                        <div class="opImg" style="background-color:${mauNgauNhien}">${name_NSD}</div>
                        <div class="opInfo"><div><b>${name}</b> (${code}), Số hộ chiếu: <b>${sohochieu}</b>, Ngày cấp: <b>${kq[i].NgayCap}</b>, Quốc tịch: <b>${kq[i].TenQuocTich}</b>, Giới tính: <b>${kq[i].TenGioiTinh}, Ngày sinh: <b>${kq[i].NgayThangNamSinh}</b></b></div>
                                <div class="text-diachi" title="${(thon == "" ? "" : thon + ", ")} ${xa}, ${huyen}, ${tinh}">Địa chỉ: <b>${NoiThuongTru}</b></div></div>
                    </li>`;
        $('#ListDataDoiTuongNN').append(item);
    }

    // Hiển thị 20 dòng đầu tiên
    $("#ListDataDoiTuongNN li").slice(0, initialItems).css("display", "flex");

    if (kq.length > initialItems) {
        $('#ListDataDoiTuongNN').append(`<li action="false" id="loadMoreDoiTuongNNDK" onclick="LoadMoreDoiTuongNN()" style="justify-content: center;"> Xem thêm &nbsp<i class="fa fa-arrow-down" style="color: #0054a6" aria-hidden="true"></i></li>`);
    }
}

// Chọn Tổ chức từ combo
$(document).on('click', '#SelectDoiTuongNN_US', function () {
    var TinhID = $('#TinhID_TimKiem_us').value();
    var HuyenID = $('#HuyenID_TimKiem_us').value();
    var XaID = $('#XaID_TimKiem_us').value();
    var ThonID = $('#ThonID_TimKiem_us').value();
    LoadComBoDoiTuongNN(TinhID, HuyenID, XaID, ThonID);
});

function ResetTTDoiTuong() {
    $('#MaSoDoiTuongNNTT_us').value('');
    $('#SoHoChieuDoiTuongNNTT_us').value('');
    $('#NgayCapDoiTuongNNTT_us').value('');
    $('#CoGiaTriDoiTuongNNTT_us').value('');
    $('#NoiCapDoiTuongNNTT_us').value('');
    $('#SoDienThoaiDoiTuongNN_us').value('');
    $('#EmailDoiTuongNNTT_us').value('');
    $('#drop_MaSo_usTT').attr('data-value', '');
    $('#drop_MaSo_usTT').html(' -Chon- &nbsp; <i class="fa-solid fa-caret-down"></i>');
    $('.btn-select-DoiTuongNN').attr('value', '');
    $('#DoiTuongNNID_ChuHo').value('');
}


//Chọn xuống tổ chức từ combo
$(document).on('click', '.itemDoiTuongNN', function () {
    var action = $(this).attr("action");
    if (action == "false") {
        return;
    }
    if (action == "chon") {
        var item = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn đối tượng- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
        $('#SelectDoiTuongNN_US').value('');
        ResetTTDoiTuong();
    } else {
        var value = $(this).attr('value');
        var name = $(this).attr("data-name");
        var code = $(this).attr("data-code");
        var sohochieu = $(this).attr("data-sohochieu");
        var diachi = $(this).attr("data-NoiThuongTru");
        var ngaycap = $(this).attr("data-ngaycap");
        var noicap = $(this).attr("data-noicap");
        var maso = $(this).attr("data-maso");
        var sodienthoai = $(this).attr("data-sodienthoai");
        var email = $(this).attr("data-email");
        var cogiatri = $(this).attr("data-giatriden");
        var loaihochieu = $(this).attr("data-LoaiHoChieu");
        var ngaysinh = $(this).attr("data-ngaysinh");
        var tenquoctich = $(this).attr("data-tenquoctich");
        var tengioitinh = $(this).attr("data-tengioitinh");
        var item = `<li><span><b>${name}</b>, ngày sinh: <b>${ngaysinh}</b>, Giới tính: <b>${tengioitinh}</b>, Quốc tịch: <b>${tenquoctich}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;

        $('#MaSoDoiTuongNNTT_us').value(maso);
        $('#SoHoChieuDoiTuongNNTT_us').value(sohochieu);
        $('#NgayCapDoiTuongNNTT_us').value(ngaycap);
        $('#CoGiaTriDoiTuongNNTT_us').value(cogiatri);
        $('#NoiCapDoiTuongNNTT_us').value(noicap);
        $('#SoDienThoaiDoiTuongNN_us').value(sodienthoai);
        $('#EmailDoiTuongNNTT_us').value(email);

        $('#drop_MaSo_usTT').attr('data-value', loaihochieu);
        if (loaihochieu == 0) {
            $('#drop_MaSo_usTT').html(' -Chon- &nbsp; <i class="fa-solid fa-caret-down"></i>');
        } else if (loaihochieu == 1) {
            $('#drop_MaSo_usTT').html(' P &nbsp; <i class="fa-solid fa-caret-down"></i>');
        } else if (loaihochieu == 2) {
            $('#drop_MaSo_usTT').html(' O &nbsp; <i class="fa-solid fa-caret-down"></i>');
        } else if (loaihochieu == 3) {
            $('#drop_MaSo_usTT').html(' D &nbsp; <i class="fa-solid fa-caret-down"></i>');
        }
        //// Lưu giá trị của tổ chức với trang thái ban đầu để so sánh nếu có thay đổi khi tiếp tục thì cảnh bảo
        mangGiaTriDauDT = [];
        mangGiaTriDauDT.push(replaceNullAndEmptyString(maso));
        mangGiaTriDauDT.push(replaceNullAndEmptyString(sohochieu));
        mangGiaTriDauDT.push(replaceNullAndEmptyString(ngaycap));
        mangGiaTriDauDT.push(replaceNullAndEmptyString(cogiatri));
        mangGiaTriDauDT.push(replaceNullAndEmptyString(noicap));
        mangGiaTriDauDT.push(replaceNullAndEmptyString(sodienthoai));
        mangGiaTriDauDT.push(replaceNullAndEmptyString(email));
    }

    $('.btn-select-DoiTuongNN').html(item);
    $('.btn-select-DoiTuongNN').attr('value', value);
    $('#DoiTuongNNID_ChuHo').value(value);
    $(".OptionDoiTuongNN").toggle();
});


async function LoadDoiTuongNNChon() {
    var saveData = new Array();
    saveData[0] = $('#TinhID_timKiemDoiTuonGNNTT_us_Chon').value();
    saveData[1] = $('#HuyenID_timKiemDoiTuonGNNTT_us_Chon').value();
    saveData[2] = $('#XaID_timKiemDoiTuonGNNTT_us_Chon').value();
    saveData[3] = $('#ThonID_timKiemDoiTuonGNNTT_us_Chon').value();
    saveData[4] = $('#timKiemDoiTuongNNTT_us_Chon').value();
    Grid_ChonDoiTuongNNTT_us.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/DungChung/GetAllDoiTuong_Chon", { data: saveData });
    if (!GetAll.Err) {
        Grid_ChonDoiTuongNNTT_us.setData(GetAll.Result);
        Grid_ChonDoiTuongNNTT_us.redraw(1);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.thongbaoloi(GetAll.Msg);
    GridKhongCoDuLieu("Grid_ChonDoiTuongNNTT_us");
}


/// CLick xem modal chọn danh sách tổ chức 
$(document).on('click', '#HienThiTatCaDoiTuongNN', function () {
    $('#mdChonDoiTuongNN_us').modal('show');
    setTimeout(() => {
        LoadTimKiem_ChonDoiTuongNN();
        PhanQuyenComBoDiaBan('TinhID_timKiemDoiTuonGNNTT_us_Chon', 'HuyenID_timKiemDoiTuonGNNTT_us_Chon', 'XaID_timKiemDoiTuonGNNTT_us_Chon', 'ThonID_timKiemDoiTuonGNNTT_us_Chon');
    }, 300);
    LoadDoiTuongNNChon();
});

//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#btntimKiemDoiTuongNNTT_us_Chon', function () {
    LoadDoiTuongNNChon();
    $('#KhungTimKiem_DoiTuonGNNTT_us').slideUp(200);
    return false;
});

// click button chọn và đóng modal chọn tổ chức
$(document).on('click', '#btnChonVaDongDoiTuongNNTT_us', function () {
    if (Grid_ChonDoiTuongNNTT_us.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
        return false;
    }
    ResetTTDoiTuong();
    var dataGrid = Grid_ChonDoiTuongNNTT_us.getSelectedRows()[0]._row.data;
    var item = `<li><span><b>${dataGrid.HoVaTen}</b>, ngày sinh: <b>${dataGrid.NgayThangNamSinh}</b>, Giới tính: <b>${dataGrid.TenGioiTinh}</b>, Quốc tịch: <b>${dataGrid.TenQuocTich}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
    $('#MaSoDoiTuongNNTT_us').value(dataGrid.MaSo);
    $('#SoHoChieuDoiTuongNNTT_us').value(dataGrid.SoHoChieu);
    $('#NgayCapDoiTuongNNTT_us').value(dataGrid.NgayCap);
    $('#CoGiaTriDoiTuongNNTT_us').value(dataGrid.GiaTriDen);
    $('#NoiCapDoiTuongNNTT_us').value(dataGrid.NoiCapID);
    $('#SoDienThoaiDoiTuongNN_us').value(dataGrid.SoDienThoai);
    $('#EmailDoiTuongNNTT_us').value(dataGrid.Email);

    $('#drop_MaSo_usTT').attr('data-value', dataGrid.LoaiHoChieu);
    if (dataGrid.LoaiHoChieu == 0) {
        $('#drop_MaSo_usTT').html(' -Chon- &nbsp; <i class="fa-solid fa-caret-down"></i>');
    } else if (dataGrid.LoaiHoChieu == 1) {
            $('#drop_MaSo_usTT').html(' P &nbsp; <i class="fa-solid fa-caret-down"></i>');
    } else if (dataGrid.LoaiHoChieu == 2) {
            $('#drop_MaSo_usTT').html(' O &nbsp; <i class="fa-solid fa-caret-down"></i>');
    } else if (dataGrid.LoaiHoChieu == 3) {
        $('#drop_MaSo_usTT').html(' D &nbsp; <i class="fa-solid fa-caret-down"></i>');
    }
    $('.btn-select-DoiTuongNN').html(item);
    $('.btn-select-DoiTuongNN').attr('value', dataGrid.DoiTuongNNID);
    $('#DoiTuongNNID_ChuHo').value(dataGrid.DoiTuongNNID);
    $(".OptionDoiTuongNN").toggle();
    $('#mdChonDoiTuongNN_us').modal('hide');
    //// Lưu giá trị của tổ chức với trang thái ban đầu để so sánh nếu có thay đổi khi tiếp tục thì cảnh bảo
    mangGiaTriDauDT = [];
    mangGiaTriDauDT.push(replaceNullAndEmptyString(dataGrid.MaSo));
    mangGiaTriDauDT.push(replaceNullAndEmptyString(dataGrid.SoHoChieu));
    mangGiaTriDauDT.push(replaceNullAndEmptyString(dataGrid.NgayCap));
    mangGiaTriDauDT.push(replaceNullAndEmptyString(dataGrid.GiaTriDen));
    mangGiaTriDauDT.push(replaceNullAndEmptyString(dataGrid.NoiCapID));
    mangGiaTriDauDT.push(replaceNullAndEmptyString(dataGrid.SoDienThoai));
    mangGiaTriDauDT.push(replaceNullAndEmptyString(dataGrid.Email));
});

// Chọn 1 dòng dữ liệu tổ chức trên modal chọn đối tượng NN
Grid_ChonDoiTuongNNTT_us.on("rowDblClick", function (e, row) {
    var dataGrid = row.getData();
    ResetTTDoiTuong();
    var item = `<li><span><b>${dataGrid.HoVaTen}</b>, ngày sinh: <b>${dataGrid.NgayThangNamSinh}</b>, Giới tính: <b>${dataGrid.TenGioiTinh}</b>, Quốc tịch: <b>${dataGrid.TenQuocTich}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
    $('#NoiCapDoiTuongNNTT_us').value(dataGrid.NoiCapID);
    $('#MaSoDoiTuongNNTT_us').value(dataGrid.MaSo);
    $('#SoHoChieuDoiTuongNNTT_us').value(dataGrid.SoHoChieu);
    $('#NgayCapDoiTuongNNTT_us').value(dataGrid.NgayCap);
    $('#CoGiaTriDoiTuongNNTT_us').value(dataGrid.GiaTriDen);
    $('#SoDienThoaiDoiTuongNN_us').value(dataGrid.SoDienThoai);
    $('#EmailDoiTuongNNTT_us').value(dataGrid.Email);
    $('#drop_MaSo_usTT').attr('data-value', dataGrid.LoaiHoChieu);
    if (dataGrid.LoaiHoChieu == 0) {
        $('#drop_MaSo_usTT').html(' -Chon- &nbsp; <i class="fa-solid fa-caret-down"></i>');
    } else if (dataGrid.LoaiHoChieu == 1) {
        $('#drop_MaSo_usTT').html(' P &nbsp; <i class="fa-solid fa-caret-down"></i>');
    } else if (dataGrid.LoaiHoChieu == 2) {
        $('#drop_MaSo_usTT').html(' O &nbsp; <i class="fa-solid fa-caret-down"></i>');
    } else if (dataGrid.LoaiHoChieu == 3) {
        $('#drop_MaSo_usTT').html(' D &nbsp; <i class="fa-solid fa-caret-down"></i>');
    }
    $('.btn-select-DoiTuongNN').html(item);
    $('.btn-select-DoiTuongNN').attr('value', dataGrid.DoiTuongNNID);
    $('#DoiTuongNNID_ChuHo').value(dataGrid.DoiTuongNNID);
    $('#mdChonDoiTuongNN_us').modal('hide');
    //// Lưu giá trị của tổ chức với trang thái ban đầu để so sánh nếu có thay đổi khi tiếp tục thì cảnh bảo
    mangGiaTriDauDT = [];
    mangGiaTriDauDT.push(replaceNullAndEmptyString(dataGrid.MaSo));
    mangGiaTriDauDT.push(replaceNullAndEmptyString(dataGrid.SoHoChieu));
    mangGiaTriDauDT.push(replaceNullAndEmptyString(dataGrid.NgayCap));
    mangGiaTriDauDT.push(replaceNullAndEmptyString(dataGrid.GiaTriDen));
    mangGiaTriDauDT.push(replaceNullAndEmptyString(dataGrid.NoiCapID));
    mangGiaTriDauDT.push(replaceNullAndEmptyString(dataGrid.SoDienThoai));
    mangGiaTriDauDT.push(replaceNullAndEmptyString(dataGrid.Email));
});

// Hàm để chuyển đổi chuỗi định dạng dd/mm/yyyy thành đối tượng Date
function parseDate(input) {
    var parts = input.split('/');
    // parts[0] là ngày, parts[1] là tháng, parts[2] là năm
    return new Date(parts[2], parts[1] - 1, parts[0]); // Lưu ý: Tháng trong Date() bắt đầu từ 0 (tháng 1 là 0)
}

//-----------------------Lưu thông tin Phiếu thu thập--------------//
$(document).on('click', '#btnLuuVaDongThemPhieuTTNguoiNNLVVN_us', function () {
    const validate = new NTSValidate('#mdThemMoiThuThapNguoiNNLVVN_us');
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

    if ($('#txtDuongDanFileChuKy').value() == "") {
        NTS.canhbao("Đính kèm chữ ký không được bỏ trống!");
        return false;
    }

    if ($('#KyTen_us').value() == "") {
        NTS.canhbao("Người cung cấp thông tin không được bỏ trống!");
        return false;
    }

    // Kiểm tra ngày tháng năm của ngày cấp không được lớn hơn ngày hết hạn
    var ngayCapFull = parseDate($('#NgayCapDoiTuongNNTT_us').value());
    var ngayHetHanFull = parseDate($('#CoGiaTriDoiTuongNNTT_us').value());


    if (ngayCapFull >= ngayHetHanFull) {
        NTS.canhbao("Ngày cấp không được lớn hơn ngày có giá trị!");
        return false;
    }


    var ThoiHanLVTuNgay = parseDate($('#ThoiGianLVTuNgayDoiTuongNNTT_us').value());
    var ThoiHanLVDenNgay = parseDate($('#ThoiGianLVDenNgayDoiTuongNNTT_us').value());

    // So sánh ngày, tháng, năm
    if (ThoiHanLVTuNgay >= ThoiHanLVDenNgay) {
        NTS.canhbao("Ngày bắt đầu làm việc không được lớn hơn ngày kết thúc làm việc!");
        return false;
    }


    try {
        var data = uploadfileEvent({
            name: '#DinhKem_DoiTuongNNTT_us',///ID input type="file"
            loaiVB: 'VB',
        });
        if (data.length > 0) {
            $('#txtDinhKem_NguoiNNLVVN_US').value(data);
            NTS.dongthongbao();
        }
    } catch (ex) { }

    //// Lưu giá trị của tổ chức với trang thái ban đầu để so sánh nếu có thay đổi khi tiếp tục thì cảnh bảo
    //Đối tương
    mangGiaTriSauDT = [];
    mangGiaTriSauDT.push($('#MaSoDoiTuongNNTT_us').value());
    mangGiaTriSauDT.push($('#SoHoChieuDoiTuongNNTT_us').value());
    mangGiaTriSauDT.push($('#NgayCapDoiTuongNNTT_us').value());
    mangGiaTriSauDT.push($('#CoGiaTriDoiTuongNNTT_us').value());
    mangGiaTriSauDT.push($('#NoiCapDoiTuongNNTT_us').value());
    mangGiaTriSauDT.push($('#SoDienThoaiDoiTuongNN_us').value());
    mangGiaTriSauDT.push($('#EmailDoiTuongNNTT_us').value());

    // Tổ chức
    mangGiaTriSauTC = [];
    mangGiaTriSauTC.push($('#LoaiHinhDNIDDoiTuongNNTT_us').value());
    var thayDoiDoiTuong = false;
    var thayDoiToChuc = false;

    // kiểm tra xem thông tin đối tượng có thay đổi khi lưu ko
    if (mangGiaTriSauDT.length > 0 && mangGiaTriDauDT.length > 0) {
        for (var i = 0; i < mangGiaTriDauDT.length; i++) {
           if (mangGiaTriDauDT[i] !== mangGiaTriSauDT[i]) {
               thayDoiDoiTuong = true;
                break;
            }
        }
    }

    // kiểm tra xem thông tin tổ chức có thay đổi khi lưu ko
    if (mangGiaTriSauTC.length > 0 && mangGiaTriDauTC.length > 0) {
        for (var i = 0; i < mangGiaTriDauTC.length; i++) {
            if (mangGiaTriDauTC[i] !== mangGiaTriSauTC[i]) {
                thayDoiToChuc = true;
                break;
            }
        }
    }

    if (thayDoiToChuc == false && thayDoiDoiTuong == false) {
        var saveData = new Array();
        saveData[0] = tempthem;
        saveData[1] = $('#NguoiNNLVVNID').value();
        saveData[2] = $('#NgayThuThapDoiTuongNN_usTT').value();
        saveData[3] = $('#SelectDoiTuongNN_US').attr('value');
        saveData[4] = $('#SelectToChuc_US').attr('value');
        saveData[5] = $('#MaSoDoiTuongNNTT_us').value();
        saveData[6] = $('#drop_MaSo_usTT').attr('data-value');
        saveData[7] = $('#SoHoChieuDoiTuongNNTT_us').value();
        saveData[8] = $('#NgayCapDoiTuongNNTT_us').value();
        saveData[9] = $('#CoGiaTriDoiTuongNNTT_us').value();
        saveData[10] = $('#NoiCapDoiTuongNNTT_us').value();
        saveData[11] = $('#TrinhDoCMKTDoiTuongNNTT_us').value();
        saveData[12] = $('#ChuyenNganhDaoTaoDoiTuongNNTT_us').value();
        saveData[13] = $('#SoDienThoaiDoiTuongNN_us').value();
        saveData[14] = $('#EmailDoiTuongNNTT_us').value();
        saveData[15] = $('#NoiDungThuThapDoiTuongNNTT_us').value();
        saveData[16] = $('#SoGPLDDoiTuongNNTT_us').value();
        saveData[17] = $('#MaSoThueDoiTuongNNTT_us').value();
        saveData[18] = $('#DiaChiDoiTuongNNTT_us').value();
        saveData[19] = $('#LoaiHinhDNIDDoiTuongNNTT_us').value();
        saveData[20] = $('#ViTriCongViecDoiTuongNNTT_us').value();
        saveData[21] = $('#NgheCongViecDoiTuongNNTT_us').value();
        saveData[22] = $('#ThoiGianLVTuNgayDoiTuongNNTT_us').value();
        saveData[23] = $('#ThoiGianLVDenNgayDoiTuongNNTT_us').value();
        saveData[24] = $('#txtDinhKem_NguoiNNLVVN_US').value();
        saveData[25] = $('#txtDuongDanFileChuKy').value();
        saveData[26] = $('#KyTen_us').value();
        saveData[27] = $('#TrangThaiDoiTuongNN_us').value();
        saveData[28] = $('#HinhTucLamViecIDDoiTuongNNTT_us').value();

        var result = NTS.getAjax('/QuanLy/NguoiNNLVVN/LuuThongTin', { data: saveData });
        if (!result.Err) {
            LoadDataTable();
            $('#NguoiNNLVVNID').value('');
            $('#SelectDoiTuongNN_US').attr('value', '');
            $('#SelectToChuc_US').attr('value', '');
            NTS.thanhcong(result.Msg);
            $('#mdThemMoiThuThapNguoiNNLVVN_us').modal('hide');
            return false;
        } else {
            result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
        }
        return false;
    } else if (thayDoiToChuc == true && thayDoiDoiTuong == true) {
        var saveData = new Array();
        saveData[0] = tempthem;
        saveData[1] = $('#NguoiNNLVVNID').value();
        saveData[2] = $('#NgayThuThapDoiTuongNN_usTT').value();
        saveData[3] = $('#SelectDoiTuongNN_US').attr('value');
        saveData[4] = $('#SelectToChuc_US').attr('value');
        saveData[5] = $('#MaSoDoiTuongNNTT_us').value();
        saveData[6] = $('#drop_MaSo_usTT').attr('data-value');
        saveData[7] = $('#SoHoChieuDoiTuongNNTT_us').value();
        saveData[8] = $('#NgayCapDoiTuongNNTT_us').value();
        saveData[9] = $('#CoGiaTriDoiTuongNNTT_us').value();
        saveData[10] = $('#NoiCapDoiTuongNNTT_us').value();
        saveData[11] = $('#TrinhDoCMKTDoiTuongNNTT_us').value();
        saveData[12] = $('#ChuyenNganhDaoTaoDoiTuongNNTT_us').value();
        saveData[13] = $('#SoDienThoaiDoiTuongNN_us').value();
        saveData[14] = $('#EmailDoiTuongNNTT_us').value();
        saveData[15] = $('#NoiDungThuThapDoiTuongNNTT_us').value();
        saveData[16] = $('#SoGPLDDoiTuongNNTT_us').value();
        saveData[17] = $('#MaSoThueDoiTuongNNTT_us').value();
        saveData[18] = $('#DiaChiDoiTuongNNTT_us').value();
        saveData[19] = $('#LoaiHinhDNIDDoiTuongNNTT_us').value();
        saveData[20] = $('#ViTriCongViecDoiTuongNNTT_us').value();
        saveData[21] = $('#NgheCongViecDoiTuongNNTT_us').value();
        saveData[22] = $('#ThoiGianLVTuNgayDoiTuongNNTT_us').value();
        saveData[23] = $('#ThoiGianLVDenNgayDoiTuongNNTT_us').value();
        saveData[24] = $('#txtDinhKem_NguoiNNLVVN_US').value();
        saveData[25] = $('#txtDuongDanFileChuKy').value();
        saveData[26] = $('#KyTen_us').value();
        saveData[27] = $('#TrangThaiDoiTuongNN_us').value();
        saveData[28] = $('#HinhTucLamViecIDDoiTuongNNTT_us').value();
        CanhBaoThayDoiTTDoiTuongNNvaToChu(() => {
            var result = NTS.getAjax('/QuanLy/NguoiNNLVVN/LuuThongTin_ToChucVaDoiTuongThayDoi', { data: saveData });
            if (!result.Err) {
                LoadDataTable();
                $('#NguoiNNLVVNID').value('');
                $('#SelectDoiTuongNN_US').attr('value','');
                $('#SelectToChuc_US').attr('value','');
                NTS.thanhcong(result.Msg);
                $('#mdThemMoiThuThapNguoiNNLVVN_us').modal('hide');
            } else {
                result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            }
        });
        return false;
    }
    else if (thayDoiDoiTuong == true && thayDoiToChuc == false) {
        var saveData = new Array();
        saveData[0] = tempthem;
        saveData[1] = $('#NguoiNNLVVNID').value();
        saveData[2] = $('#NgayThuThapDoiTuongNN_usTT').value();
        saveData[3] = $('#SelectDoiTuongNN_US').attr('value');
        saveData[4] = $('#SelectToChuc_US').attr('value');
        saveData[5] = $('#MaSoDoiTuongNNTT_us').value();
        saveData[6] = $('#drop_MaSo_usTT').attr('data-value');
        saveData[7] = $('#SoHoChieuDoiTuongNNTT_us').value();
        saveData[8] = $('#NgayCapDoiTuongNNTT_us').value();
        saveData[9] = $('#CoGiaTriDoiTuongNNTT_us').value();
        saveData[10] = $('#NoiCapDoiTuongNNTT_us').value();
        saveData[11] = $('#TrinhDoCMKTDoiTuongNNTT_us').value();
        saveData[12] = $('#ChuyenNganhDaoTaoDoiTuongNNTT_us').value();
        saveData[13] = $('#SoDienThoaiDoiTuongNN_us').value();
        saveData[14] = $('#EmailDoiTuongNNTT_us').value();
        saveData[15] = $('#NoiDungThuThapDoiTuongNNTT_us').value();
        saveData[16] = $('#SoGPLDDoiTuongNNTT_us').value();
        saveData[17] = $('#MaSoThueDoiTuongNNTT_us').value();
        saveData[18] = $('#DiaChiDoiTuongNNTT_us').value();
        saveData[19] = $('#LoaiHinhDNIDDoiTuongNNTT_us').value();
        saveData[20] = $('#ViTriCongViecDoiTuongNNTT_us').value();
        saveData[21] = $('#NgheCongViecDoiTuongNNTT_us').value();
        saveData[22] = $('#ThoiGianLVTuNgayDoiTuongNNTT_us').value();
        saveData[23] = $('#ThoiGianLVDenNgayDoiTuongNNTT_us').value();
        saveData[24] = $('#txtDinhKem_NguoiNNLVVN_US').value();
        saveData[25] = $('#txtDuongDanFileChuKy').value();
        saveData[26] = $('#KyTen_us').value();
        saveData[27] = $('#TrangThaiDoiTuongNN_us').value();
        saveData[28] = $('#HinhTucLamViecIDDoiTuongNNTT_us').value();
        CanhBaoThayDoiTTDoiTuongNN(() => {
            var result = NTS.getAjax('/QuanLy/NguoiNNLVVN/LuuThongTin_DoiTuongThayDoi', { data: saveData });
            if (!result.Err) {
                LoadDataTable();
                $('#NguoiNNLVVNID').value('');
                $('#SelectDoiTuongNN_US').attr('value', '');
                $('#SelectToChuc_US').attr('value', '');
                NTS.thanhcong(result.Msg);
                $('#mdThemMoiThuThapNguoiNNLVVN_us').modal('hide');
            } else {
                result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            }
        });
        return false;
    } else if (thayDoiToChuc == true && thayDoiDoiTuong == false) {
        var saveData = new Array();
        saveData[0] = tempthem;
        saveData[1] = $('#NguoiNNLVVNID').value();
        saveData[2] = $('#NgayThuThapDoiTuongNN_usTT').value();
        saveData[3] = $('#SelectDoiTuongNN_US').attr('value');
        saveData[4] = $('#SelectToChuc_US').attr('value');
        saveData[5] = $('#MaSoDoiTuongNNTT_us').value();
        saveData[6] = $('#drop_MaSo_usTT').attr('data-value');
        saveData[7] = $('#SoHoChieuDoiTuongNNTT_us').value();
        saveData[8] = $('#NgayCapDoiTuongNNTT_us').value();
        saveData[9] = $('#CoGiaTriDoiTuongNNTT_us').value();
        saveData[10] = $('#NoiCapDoiTuongNNTT_us').value();
        saveData[11] = $('#TrinhDoCMKTDoiTuongNNTT_us').value();
        saveData[12] = $('#ChuyenNganhDaoTaoDoiTuongNNTT_us').value();
        saveData[13] = $('#SoDienThoaiDoiTuongNN_us').value();
        saveData[14] = $('#EmailDoiTuongNNTT_us').value();
        saveData[15] = $('#NoiDungThuThapDoiTuongNNTT_us').value();
        saveData[16] = $('#SoGPLDDoiTuongNNTT_us').value();
        saveData[17] = $('#MaSoThueDoiTuongNNTT_us').value();
        saveData[18] = $('#DiaChiDoiTuongNNTT_us').value();
        saveData[19] = $('#LoaiHinhDNIDDoiTuongNNTT_us').value();
        saveData[20] = $('#ViTriCongViecDoiTuongNNTT_us').value();
        saveData[21] = $('#NgheCongViecDoiTuongNNTT_us').value();
        saveData[22] = $('#ThoiGianLVTuNgayDoiTuongNNTT_us').value();
        saveData[23] = $('#ThoiGianLVDenNgayDoiTuongNNTT_us').value();
        saveData[24] = $('#txtDinhKem_NguoiNNLVVN_US').value();
        saveData[25] = $('#txtDuongDanFileChuKy').value();
        saveData[26] = $('#KyTen_us').value();
        saveData[27] = $('#TrangThaiDoiTuongNN_us').value();
        saveData[28] = $('#HinhTucLamViecIDDoiTuongNNTT_us').value();
        CanhBaoThayDoiTTToChuc(() => {
            var result = NTS.getAjax('/QuanLy/NguoiNNLVVN/LuuThongTin_ToChucThayDoi', { data: saveData });
            if (!result.Err) {
                LoadDataTable();
                $('#NguoiNNLVVNID').value('');
                $('#SelectDoiTuongNN_US').attr('value', '');
                $('#SelectToChuc_US').attr('value', '');
                NTS.thanhcong(result.Msg);
                $('#mdThemMoiThuThapNguoiNNLVVN_us').modal('hide');
            } else {
                result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            }
        });
        return false;
    } 
});
//---------------------------------Vẽ chữ ký---------------------------------
$(document).on('click', '#VeChuKy_us', function () {
    signaturePad.clear();
    showModalKyTen_us();
});

// Tải file chữ ký lên server
$(document).on('click', '#TaiChuKy', function () {
    $('#fileVB_ChuKy_CauLD').click();
});
var cunglaodongID = "";
var ChuoiPath = "";
$(document).on('change', '#fileVB_ChuKy_CauLD', function () {
    UploadTaiLieu_us_CLD('ChuKy'); //hàm dùng chung ở us TaiLieu
});

function UploadTaiLieu_us_CLD(pathChiTiet) {
    var data = NTS.upload({
        name: '#fileVB_ChuKy_CauLD',///ID input type="file"
        loaiVB: 'CK',///Nhận 1 trong 2 giá trị DL hoặc VB
    });
    if (data.length > 0) {
        let result = NTS.getAjax('/DanhMuc/DungChung/LuuDinhKem_ChuKy', { ID: $('#NguoiNNLVVNID').value(), bangDk: 'NguoiNNLVVN', cotDk: 'NguoiNNLVVNID', cotDinhKem: 'ChuKy', pathFile: data });
        if (!result.Err) {
            var path = result.Result.Table[0];
            let LuuFile = data;
            $('#txtDuongDanFileChuKy').value(LuuFile); // Corrected .value() to .val()
            let arrFile = LuuFile.split('*');
            for (let p = 0; p < arrFile.length - 1; p++) {
                let filePath = arrFile[p].replace('~', '');
                let fileExt = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();

                if (fileExt === ".png" || fileExt === ".jpeg" || fileExt === ".jpg" || fileExt === "") {
                    $('#imgHienThiKyTen').css('background-image', `url('${filePath}')`);
                    $('#imgHienThiKyTen').attr('data-url-file', filePath);
                    $('#XemDinhKemChuKy_CauLD').attr('data-url-file', filePath);
                    $('#XoaChuKy').attr('data-url-file', filePath);
                }
            }
        } else {
            NTS.thongbaoloi('Tải file không thành công!')
        }
    } else {
        NTS.thongbaoloi('Tải file không thành công!');
    }

    if ($('#txtDuongDanFileChuKy').value() != "") {
        $('#XoaChuKy').css({ 'display': 'block' });
        $('#icon_XemDinhKemChuKy_CauLD').css({ 'display': 'block' });
        $('#TaiChuKy').css({ 'display': 'none' });
    } else {
        $('#XoaChuKy').css({ 'display': 'none' });
        $('#icon_XemDinhKemChuKy_CauLD').css({ 'display': 'none' });
        $('#TaiChuKy').css({ 'display': 'block' });
    }
}

// Xem đính kèm chữ ký
$(document).on('click', '#XemDinhKemChuKy_CauLD', function () {
    $('#mdXemDinhKemChuKy').modal('show');
    $('.MoTa_CT').css({
        'background-image': 'none'  // Xóa background-image
    });
    $('.MoTa_CT').css({
        'background-image': 'url(' + $(this).attr('data-url-file') + ')'
    });
    return false;
});

// xóa chữ ký
$(document).on('click', '#XoaChuKy', function () {
    let duongDan = $(this);
    let id = "";
    let bang = "";
    let cot = "";

    id = $('#NguoiNNLVVNID').value();
    bang = "NguoiNNLVVN";
    cot = "NguoiNNLVVNID";
    cotChuaFile = 'ChuKy';
    CanhBaoXoaDinhKem(() => {
        let result = NTS.getAjax('/DanhMuc/DungChung/XoaDinhKem2', { ID: id, duongDan: duongDan.attr('data-url-file'), bangDk: bang, cotDk: cot, cotValue: cotChuaFile, loai: '' });
        if (!result.Err) {
            $('#imgHienThiKyTen').css('background-image', 'none');
            $('#txtDuongDanFileChuKy').value('');
            $('#imgHienThiKyTen').attr('data-url-file', '');
            $('#XemDinhKemChuKy_CauLD').attr('data-url-file', '');
            $('#XoaChuKy').attr('data-url-file', '');
            $('#XoaChuKy').css({ 'display': 'none' });
            $('#icon_XemDinhKemChuKy_CauLD').css({ 'display': 'none' });
            $('#TaiChuKy').css({ 'display': 'block' });
            NTS.thanhcong(result.Msg);
        }
        else {
            NTS.loi(result.Msg);
        }
    });
    return false;
});

//------------------------------Xóa cầu lao động-----------------------------

function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'NguoiNNLVVNID', ID: ID, TenBangHienTai: 'NguoiNNLVVN', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/QuanLy/NguoiNNLVVN/XoaDuLieu', { id: ID });
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

$(document).on('click', '.btnXoaTT', function () {
    var ID = $(this).attr('data');
    XoaDuLieu(ID);
});

//-------------------------Thiết lập cột hiển thị trên lưới---------------------
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
//---------------------------------------------------------------------------

//---------------------------------Xuất danh sách excel thông tin người lao động nước ngoài tại Việt Nam---------------------------------
$('#btnExport').on('click', async function () {
    var saveData = new Array();
    saveData[0] = $('#TinhID_TimKiem_us').value();
    saveData[1] = $('#HuyenID_TimKiem_us').value();
    saveData[2] = $('#XaID_TimKiem_us').value();
    saveData[3] = $('#ThonID_TimKiem_us').value();
    saveData[4] = $('#timKiem').value();
    saveData[5] = $('#TuNgay_TimKiem_US').value();
    saveData[6] = $('#DenNgay_TimKiem_US').value();
    saveData[7] = $('#QuocTichID_TimKiem_us').value();
    saveData[8] = $('#lblNamTrongKCN_TimKiem_us').value();
    var kq = await NTS.getAjax('/QuanLy/NguoiNNLVVN/XuatExcel_DSNguoiNNLVVN', { data: saveData });
    if (!kq.Err) {
        window.open(kq);
    } else {
        NTS.loi(kq.Msg);
    }
});


//-------------------Sửa dữ liệu tổ chức------------------//
function SuaDuLieuNguoiNNLVVN_us(ID) {

    if (!QuyenSua()) {
        return false;
    }
    $('#mdThemMoiThuThapNguoiNNLVVN_us').modal('show');
    $('#lblTieuDeThemMoi1_us').text('Cập nhật thông tin thông tin người lao động nước ngoài làm việc tại Việt Nam');
    resetForm('#mdThemMoiThuThapNguoiNNLVVN_us');
    $('#SelectDoiTuongNN_US').prop('disabled', true);
    $('#HienThiTatCaDoiTuongNN').prop('disabled', true);
    $('#SoHoChieuDoiTuongNNTT_us').prop('disabled', true);
    const result = NTS.getAjax('/QuanLy/NguoiNNLVVN/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#SelectDoiTuongNN_US').attr('value', data.DoiTuongNNID);
        $('#SelectToChuc_US').attr('value', data.ToChucID);
        $('#NguoiNNLVVNID').value(data.NguoiNNLVVNID);
        $('#NgayThuThapDoiTuongNN_usTT').value(data.NgayThuThap);
        $('#TrinhDoCMKTDoiTuongNNTT_us').value(data.TrinhDoCMKTID);
        $('#HinhTucLamViecIDDoiTuongNNTT_us').value(data.HinhThucLVID);
        $('#ChuyenNganhDaoTaoDoiTuongNNTT_us').value(data.ChuyenNganhDaoTaoID);
        $('#NoiDungThuThapDoiTuongNNTT_us').value(data.NoiDungThuThap);
        $('#SoGPLDDoiTuongNNTT_us').value(data.GiayPhepLDID);
        $('#ViTriCongViecDoiTuongNNTT_us').value(data.ViTriViecLamID);
        $('#NgheCongViecDoiTuongNNTT_us').value(data.NgheCongViecID);
        $('#ThoiGianLVTuNgayDoiTuongNNTT_us').value(data.LamViecTuNgay);
        $('#ThoiGianLVDenNgayDoiTuongNNTT_us').value(data.LamViecDenNgay);
        $('#KyTen_us').value(data.NguoiCungCapTT);
        $('#TrangThaiDoiTuongNN_us').value(data.TrangThai);
        UpdateLabelDangSD('#TrangThaiDoiTuongNN_us');
        $('#MaSoThueDoiTuongNNTT_us').value(data.MaSoThue);
        $('#DiaChiDoiTuongNNTT_us').value(data.DiaChiCuThe);
        $('#LoaiHinhDNIDDoiTuongNNTT_us').value(data.LoaiHinhDNID);
        $('#SoDienThoaiDoiTuongNN_us').value(data.SoDienThoai);
        $('#EmailDoiTuongNNTT_us').value(data.Email);
        $('#MaSoDoiTuongNNTT_us').value(data.MaSo);
        $('#SoHoChieuDoiTuongNNTT_us').value(data.SoHoChieu);
        $('#NgayCapDoiTuongNNTT_us').value(data.NgayCap);
        $('#CoGiaTriDoiTuongNNTT_us').value(data.GiaTriDen);
        $('#NoiCapDoiTuongNNTT_us').value(data.NoiCapID);
        $('#drop_MaSo_usTT').attr('data-value', data.LoaiHoChieu);
        if (data.LoaiHoChieu == 0) {
            $('#drop_MaSo_usTT').html(' -Chon- &nbsp; <i class="fa-solid fa-caret-down"></i>');
        } else if (data.LoaiHoChieu == 1) {
            $('#drop_MaSo_usTT').html(' P &nbsp; <i class="fa-solid fa-caret-down"></i>');
        } else if (data.LoaiHoChieu == 2) {
            $('#drop_MaSo_usTT').html(' O &nbsp; <i class="fa-solid fa-caret-down"></i>');
        } else if (data.LoaiHoChieu == 3) {
            $('#drop_MaSo_usTT').html(' D &nbsp; <i class="fa-solid fa-caret-down"></i>');
        }
        // hiển thị trên Combo đối tượng 
        var itemDT = `<li><span><b>${data.HoVaTen}</b>, ngày sinh: <b>${data.NgayThangNamSinhDT}</b>, Giới tính: <b>${data.TenGioiTinh}</b>, Quốc tịch: <b>${data.TenQuocTich}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
        $('.btn-select-DoiTuongNN').html(itemDT);
        $('.btn-select-DoiTuongNN').attr('value', data.DoiTuongNNID);
        $('#DoiTuongNNID_ChuHo').value(data.DoiTuongNNID);
        // Hiển thị trên combo tổ chức
        var itemTC = `<li><span><b>${data.TenToChuc}</b> <b>(${data.MaToChuc})</b> - Địa chỉ: <b>${data.DiaChiCuThe}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
        $('.btn-select-tochuc').html(itemTC);
        $('.btn-select-tochuc').attr('value', data.ToChucID);
        $('#ToChucID_ChuHo').value(data.ToChucID);
        var listFiles_VanBan_US = [];
        $('#txtDinhKem_NguoiNNLVVN_US').val(data.DinhKem);
        if (data.DinhKem == '' || data.DinhKem == null) {
            ResetDinhKemFile();
        }
        else {
            for (var i = 0; i < data.DinhKem.split('*').length; i++) {
                if (data.DinhKem.split('*')[i] == '') {
                    continue;
                }
                listFiles_VanBan_US.push(data.DinhKem.split('*')[i].split('/')[data.DinhKem.split('*')[i].split('/').length - 1].replaceAll('*', '').toString());
            }
            $('#DinhKem_DoiTuongNNTT_us').ace_file_input('show_file_list', listFiles_VanBan_US);
            var ItemImg = $(".ace-icon.fa.fa-picture-o.file-image");
            //code chuyen doi chuoi dinh kem thanh array
            if (data.DinhKem != null && data.DinhKem.length > 0) {
                var linkVB = data.DinhKem;
                var arrFile = linkVB.split('*');

                for (var i = 0; i < arrFile.length; i++) {
                    if (arrFile[i] != "") {
                        $(ItemImg[i]).attr("ace-img-url", arrFile[i]);
                    }
                }
            }
            else {
                NTS.canhbao('Không có file đính kèm!');
            }
            //end code
            //Gắn sự kiện xem hình ảnh
            $(".ace-icon.fa.fa-picture-o.file-image").addClass("XemDinhKemHinhAnh_USDangKy");
            //Gắn thêm dấu x xóa từng file
            $('.ace-file-container.hide-placeholder .ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKemDT XoaFileDinhKem btn-del-item img-db"  onclick="return false"></i>');
        }
        $('#txtDuongDanFileChuKy').value(data.ChuKy);
        if (data.ChuKy != null && data.ChuKy.length > 0) {
            let LuuFile = data.ChuKy;
            let arrFile = LuuFile.split('*');
            for (let p = 0; p < arrFile.length - 1; p++) {
                let filePath = arrFile[p].replace('~', '');
                let fileExt = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
                if (fileExt === ".png" || fileExt === ".jpeg" || fileExt === ".jpg" || fileExt === "") {
                    $('#imgHienThiKyTen').css('background-image', `url('${filePath}')`);
                    $('#imgHienThiKyTen').attr('data-url-file', filePath);
                    $('#XemDinhKemChuKy_CauLD').attr('data-url-file', filePath);
                    $('#XoaChuKy').attr('data-url-file', filePath);
                }
            }
        }

        // Thiết lập trạng thái cho button tải ảnh và xóa ảnh chữ ký
        if ($('#txtDuongDanFileChuKy').value() != "") {
            $('#XoaChuKy').css({ 'display': 'block' });
            $('#icon_XemDinhKemChuKy_CauLD').css({ 'display': 'block' });
            $('#TaiChuKy').css({ 'display': 'none' });
        } else {
            $('#XoaChuKy').css({ 'display': 'none' });
            $('#icon_XemDinhKemChuKy_CauLD').css({ 'display': 'none' });
            $('#TaiChuKy').css({ 'display': 'block' });
        }

        // Lưu thông tin đối tuong nn
        mangGiaTriDauDT = [];
        mangGiaTriDauDT.push(replaceNullAndEmptyString(data.MaSo));
        mangGiaTriDauDT.push(replaceNullAndEmptyString(data.SoHoChieu));
        mangGiaTriDauDT.push(replaceNullAndEmptyString(data.NgayCap));
        mangGiaTriDauDT.push(replaceNullAndEmptyString(data.GiaTriDen));
        mangGiaTriDauDT.push(replaceNullAndEmptyString(data.NoiCapID));
        mangGiaTriDauDT.push(replaceNullAndEmptyString(data.SoDienThoai));
        mangGiaTriDauDT.push(replaceNullAndEmptyString(data.Email));

        //Luu thông tin tổ chức
        mangGiaTriDauTC = [];
        mangGiaTriDauTC.push(replaceNullAndEmptyString(data.LoaiHinhDNID));
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
}

//-------------------Sua du thông tin phiếu thu thập--------------------//
$(document).on('click', '.btnSuaTT', function () {
    var ID = $(this).attr('data');
    SuaDuLieuNguoiNNLVVN_us(ID);
});

// Chọn 1 dòng dữ liệu tổ chức trên modal chọn tổ chuc
Grid1.on("rowDblClick", function (e, row) {
    var ID = row.getData().NguoiNNLVVNID;
    SuaDuLieuNguoiNNLVVN_us(ID);
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
            if ($('#mdThemMoiThuThapNguoiNNLVVN_us').hasClass('show')) {
                $('#mdThemMoiThuThapNguoiNNLVVN_us').modal('hide');
                e.preventDefault();
                break;
            } else if ($('#mdXemThongTinNguoiNNLVVN_us').hasClass('show')) {
                $('#mdXemThongTinNguoiNNLVVN_us').modal('hide');
                e.preventDefault();
                break;
            }
        case 120:
            if (hotKey == 1)
                if ($('#mdThemMoiThuThapNguoiNNLVVN_us').hasClass('show')) {
                    $('#btnLuuVaDongThemPhieuTTNguoiNNLVVN_us').trigger('click');
                    e.preventDefault();
                    break;
                }
    }
});
$(document).on('shown.bs.modal', '#mdThemMoiThuThapNguoiNNLVVN_us', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdThemMoiThuThapNguoiNNLVVN_us', function () {
    hotKey = 0;
});

////-------------------Xuất dữ liệu phieu 03------------------//

$(document).on('click', '.btnInMau03', function () {
    var ID = $(this).attr('data');
    XuatMau03_TT01(ID);
});

async function XuatMau03_TT01(ID) {
    var data = await NTS.getAjaxAsync('/QuanLy/NguoiNNLVVN/XuatMau03', { id: ID });
    //window.open(data);
    try {
        $('#divNoiDung_us').attr("src", data.replace(".docx", ".pdf"));
        $('#modal_xemtruockhiin_us').modal('show');
        $('#modal_taifile_us').show();
        $('#modal_taifile2_us').hide();
    } catch (ex) {

    }
}

//--------------------------Xem thông tin phiếu thu thập---------------------------
// Hàm ẩn số điện thoại
function formatPhoneNumber(phoneNumber) {
    if (phoneNumber.length > 4) {
        return phoneNumber.substring(0, 4) + '.xxx.xxx';
    }
    return phoneNumber;
}

function ShowModal_XemThongTinNguoiNNLVVN_us(ID) {
    $('#mdXemThongTinNguoiNNLVVN_us').modal('show');
    const result = NTS.getAjax('/QuanLy/NguoiNNLVVN/LoadDuLieuXem', { id: ID });
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
//--------------------------Xem thông tin phiếu thu thập---------------------------
$(document).on('click', '.btnXemTT', function () {
    var ID = $(this).attr('data');
    ShowModal_XemThongTinNguoiNNLVVN_us(ID);
});

function LoadTTDOiTuongBySoHoChieu(value) {
    const result = NTS.getAjax('/QuanLy/NguoiNNLVVN/LoadDuLieuDoiTuongNNBySoHoChieu', { soHoChieu: value });
    if (!result.Err && result.Result != null) {
        if (result.Result != ""){
            let data = result.Result[0];
            var item = `<li><span><b>${data.HoVaTen}</b>, ngày sinh: <b>${data.NgayThangNamSinh}</b>, Giới tính: <b>${data.TenGioiTinh}</b>, Quốc tịch: <b>${data.TenQuocTich}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
            $('#MaSoDoiTuongNNTT_us').value(data.MaSo);
            $('#SoHoChieuDoiTuongNNTT_us').value(data.SoHoChieu);
            $('#NgayCapDoiTuongNNTT_us').value(data.NgayCap);
            $('#CoGiaTriDoiTuongNNTT_us').value(data.GiaTriDen);
            $('#NoiCapDoiTuongNNTT_us').value(data.NoiCapID);
            $('#SoDienThoaiDoiTuongNN_us').value(data.SoDienThoai);
            $('#EmailDoiTuongNNTT_us').value(data.Email);

            $('#drop_MaSo_usTT').attr('data-value', data.LoaiHoChieu);
            if (data.LoaiHoChieu == 0) {
                $('#drop_MaSo_usTT').html(' -Chon- &nbsp; <i class="fa-solid fa-caret-down"></i>');
            } else if (data.LoaiHoChieu == 1) {
                $('#drop_MaSo_usTT').html(' P &nbsp; <i class="fa-solid fa-caret-down"></i>');
            } else if (data.LoaiHoChieu == 2) {
                $('#drop_MaSo_usTT').html(' O &nbsp; <i class="fa-solid fa-caret-down"></i>');
            } else if (data.LoaiHoChieu == 3) {
                $('#drop_MaSo_usTT').html(' D &nbsp; <i class="fa-solid fa-caret-down"></i>');
            }
            $('.btn-select-DoiTuongNN').html(item);
            $('.btn-select-DoiTuongNN').attr('value', data.DoiTuongNNID);
            $('#DoiTuongNNID_ChuHo').value(data.DoiTuongNNID);
            $(".OptionDoiTuongNN").toggle();
            $('#mdChonDoiTuongNN_us').modal('hide');
            //// Lưu giá trị của tổ chức với trang thái ban đầu để so sánh nếu có thay đổi khi tiếp tục thì cảnh bảo
            mangGiaTriDauDT = [];
            mangGiaTriDauDT.push(replaceNullAndEmptyString(data.MaSo));
            mangGiaTriDauDT.push(replaceNullAndEmptyString(data.SoHoChieu));
            mangGiaTriDauDT.push(replaceNullAndEmptyString(data.NgayCap));
            mangGiaTriDauDT.push(replaceNullAndEmptyString(data.GiaTriDen));
            mangGiaTriDauDT.push(replaceNullAndEmptyString(data.NoiCapID));
            mangGiaTriDauDT.push(replaceNullAndEmptyString(data.SoDienThoai));
            mangGiaTriDauDT.push(replaceNullAndEmptyString(data.Email));
        } else {
            NTS.canhbao('Số hộ chiếu:' + value + " Chưa tồn tại trong hệ thống!");
            var item = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn đối tượng- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
            $('#SelectDoiTuongNN_US').value('');
            $('.btn-select-DoiTuongNN').html(item);
            $('.btn-select-DoiTuongNN').attr('value', '');
            $('#DoiTuongNNID_ChuHo').value('');
            ResetTTDoiTuong();
            return false;
        }
    }
}

$(document).on('blur', '#SoHoChieuDoiTuongNNTT_us', function () {
    if ($('#SoHoChieuDoiTuongNNTT_us').value() != "") {
        LoadTTDOiTuongBySoHoChieu($('#SoHoChieuDoiTuongNNTT_us').value());
    }
});


//--------------------------Nhập vào mã số thuể để load thông tin tổ chức---------------------------
function LoadTTToChucByMaSoThue(value) {
    const result = NTS.getAjax('/QuanLy/NguoiNNLVVN/LoadDuLieuToChucByMaSoThue', { maSoThue: value });
    if (!result.Err && result.Result != null) {
        if (result.Result != "") {
            let data = result.Result[0];
            $('#DiaChiDoiTuongNNTT_us').value(data.DiaChiCuThe);
            $('#MaSoThueDoiTuongNNTT_us').value(data.MaSoThue);
            $('#LoaiHinhDNIDDoiTuongNNTT_us').value(data.LoaiHinhDNID);
            var item = `<li><span><b>${data.TenToChuc}</b> <b>(${data.MaToChuc})</b> - Địa chỉ: <b>${data.DiaChiCuThe}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
            $('.btn-select-tochuc').html(item);
            $('.btn-select-tochuc').attr('value', data.ToChucID);
            $('#ToChucID_ChuHo').value(data.ToChucID);
            $(".OptionToChuc").toggle();
            //// Lưu giá trị của tổ chức với trang thái ban đầu để so sánh nếu có thay đổi khi tiếp tục thì cảnh bảo
            mangGiaTriDauTC = [];
            mangGiaTriDauTC.push(replaceNullAndEmptyString(data.LoaiHinhDNID));
        } else {
            NTS.canhbao('Mã số thuế:' + value + " Chưa tồn tại trong hệ thống!");
            var item = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn tổ chức- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
            $('#SelectToChuc_US').value('');
            $('.btn-select-tochuc').html(item);
            $('.btn-select-tochuc').attr('value', '');
            $('#ToChucID_ChuHo').value('');
            $('#DiaChiDoiTuongNNTT_us').value('');
            $('#MaSoThueDoiTuongNNTT_us').value('');
            $('#LoaiHinhDNIDDoiTuongNNTT_us').value('');
            return false;
        }
    }
}

$(document).on('blur', '#MaSoThueDoiTuongNNTT_us', function () {
    if ($('#MaSoThueDoiTuongNNTT_us').value() != "") {
        LoadTTToChucByMaSoThue($('#MaSoThueDoiTuongNNTT_us').value());
    }
});