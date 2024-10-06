var tenBangThamChieu = 'CungLaoDong';
var soCCCD = "";
var tempthem = "them";
var tempthemDT = "them";
var mangGiaTriDau = [];
var mangGiaTriSau = [];
var soCCCDDT = "";

$(function () {
    LoadTimKiem();
});
$(document).ready(function () {
    ThietLapCotTrenLuoi(tenBangThamChieu, Grid1);
    $('#btnTiepTuc').css({ 'display': 'none' });
    NTS.hienNgayDauNamLenTextbox('TuNgay_TimKiem_US');
    NTS.hienNgayCuoiNamLenTextbox('DenNgay_TimKiem_US');
    setTimeout(function () {
        PhanQuyenComBoDiaBan('TinhID_TimKiem_us', 'HuyenID_TimKiem_us', 'XaID_TimKiem_us', 'ThonID_TimKiem_us');
    }, 200);
    getLocation();
    $('#form_BienDong').css({ "display": 'block' });
    $('#lblTieuDeThemMoiThuThapCung').text('Thêm mới thu thập Cung lao động biến động');
    $('#LoaiBienDongID').prop('required', true);
    $('#lblLoaiBienDongID').addClass('validation');
});

// Thiết lập cột hiển thị trên lưới
$(document).on('click', '#btnThietLapCot', function () {
    ShowModalThietLapCot_us(tenBangThamChieu);
});

$(document).on('click', '#TimKiemNangCao_HoGiaDinh_us', function () {
    if ($('#KhungTimKiem_HoGiaDinh_us').css('display') == "block") {
        $('#KhungTimKiem_HoGiaDinh_us').slideUp(200);
    } else {
        $('#KhungTimKiem_HoGiaDinh_us').slideDown(200);
    }
    return false;
});

//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiemHoGiaDinh_us', async function () {
    await LoadGrid_ChonHoGD_us();
    $('#KhungTimKiem_HoGiaDinh_us').slideUp(200);
    return false;

});

$(document).on('click', '#DongTimKiem_US', function () {
    $('#KhungTimKiem_HoGiaDinh_us   ').slideUp(200);
    return false;
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

function loadComBoLoaiBienDong() {
    NTS.loadDataCombo({
        name: '#LoaiBienDongID',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_LoaiBienDong',
        columns: 1,
        indexValue: 0,
        indexText1: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
}
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
            name: '#HoGiaDinhID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetHoGiaDinh_Combo',
            ajaxParam: { data: [$('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), ""] },
            indexValue: 0,
            indexText: 1,
            indexText1: 2,
            columns: 2,
            textShowTatCa: '--Tất cả--',
            showTatCa: !0
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
        textShowTatCa: '--Tất cả--',
        showTatCa: !0
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

//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiem', async function () {
    if ($('#TinhID_TimKiem_us').value() == "") {
        NTS.canhbao("Tỉnh không được bỏ trống!");
        return false;
    }
    if ($('#HuyenID_TimKiem_us').value() == "") {
        NTS.canhbao("Huyện không được bỏ trống!");
        return false;
    }
    if ($('#XaID_TimKiem_us').value() == "") {
        NTS.canhbao("Xã không được bỏ trống!");
        return false;
    }
    LoadDataTable();
    $('#KhungTimKiem').slideUp(200);
    return false;
});


$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        Grid1.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid1.setFilter(matchAny, { value: $('#timKiem').val() });
});

//=======================================================//
var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().HoGiaDinhID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().HoGiaDinhID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().HoGiaDinhID);
}
var fmGhiChu = function (cell) {
    var ID = cell.getData().HoGiaDinhID;
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

// CHỉnh sửa cung lao động
//< a  class="dropdown-item btnSuaTT  " href = "#" data = "${ID}" >
//    <i class="fa fa-pencil text-warning" aria-hidden="true"></i> & ensp; Chỉnh sửa phiếu thu thập
//       </a >

function actionDropdownFormatter(cell, formatterParams, onRendered) {
    var ID = cell.getData().CungLaoDongID;
    var LaBienDong = cell.getData().BienDong;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
       <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
       <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
           <a class="dropdown-item btnXemTT " href="#" data="${ID}" >
                <i class="fa fa-eye " aria-hidden="true" style="paddding-right:10px; color:#0054A6;"></i>&ensp;  Xem thông tin
           </a>
            
            ` + (LaBienDong == 1 ? ` <a  class="dropdown-item btnSuaTTBienDong  " href="#" data="${ID}">
                <i class="fa fa-pencil text-warning" aria-hidden="true"></i>&ensp;  Chỉnh sửa phiếu thu thập
           </a>` : ` <a  class="dropdown-item btnSuaTT  " href="#" data="${ID}">
                <i class="fa fa-pencil text-warning" aria-hidden="true"></i>&ensp;  Chỉnh sửa phiếu thu thập
           </a>`) + `

            <a  class="dropdown-item btnXoaTT" href="#" data="${ID}">
                <i class='fa fa-trash-o  text-danger'></i>&ensp;  Xóa phiếu thu thập
           </a>
           <a  class="dropdown-item btnInPhieuThuThap" href="#" data="${ID}" style="display: block;">
                    <i class='fa-solid fa-print' style="color: var(--tbl-btn-luuvadong) !important;"></i>&ensp;  In phiếu thu thập <i class="fa-solid fa-angle-right " style="float: right;margin-top: 5px;"></i>
               </a>
               
               <div id="hoverBox_CLD">
                    <a  class="dropdown-item btnInMau03 " href="#" data="${ID}">
                        In mẫu 03 thông tư 11/2022/TT-BLĐTBXH
                   </a>
                    <a  class="dropdown-item btnInMau01 " href="#" data="${ID}">
                        In mẫu 01 thông tư 01/2022/TT-BLĐTBXH
                   </a>
                </div>
       </div>
       </div>`;

    return select;
}

//-------------------Grid thu thập cung lao động---------------//
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
        { title: "Ngày thu thập", field: "NgayThuThap", formatter: 'textarea', width: 150, vertAlign: "middle", minWidth: 70, headerHozAlign: "center", hozAlign: "center" },
        { title: "Họ và tên", field: "HoVaTen", formatter: 'textarea', width: 180, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "CMND/CCCD/Số định danh", field: "SoCCCD", formatter: 'textarea', width: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Ngày cấp", field: "NgayCap", formatter: 'textarea', vertAlign: "middle", width: 120, headerHozAlign: "center", hozAlign: "center" },
        { title: "Ngày sinh", field: "NgayThangNamSinh", formatter: 'textarea', vertAlign: "middle", width: 120, headerHozAlign: "center", hozAlign: "center" },
        { title: "Giới tính", field: "TenGioiTinh", formatter: 'textarea', width: 120, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Nơi thường trú", field: "DiaChiCuTheTT", formatter: 'textarea', width: 250, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Dân tộc", field: "TenDanToc", formatter: 'textarea', width: 120, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Tôn giáo", field: "TenTonGiao", formatter: 'textarea', width: 120, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Quốc tịch", field: "TenQuocTich", formatter: 'textarea', width: 120, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Đối tượng ưu tiên", field: "DoiTuongUuTien", formatter: 'textarea', vertAlign: "middle", minWidth: 150, headerHozAlign: "center" },
        { title: "Trình độ PT cao nhất", field: "TrinhDoPT", formatter: 'textarea', vertAlign: "middle", minWidth: 200, headerHozAlign: "center" },
        { title: "Trình độ CMKT cao nhất", field: "TrinhDoCMKT", formatter: 'textarea', vertAlign: "middle", minWidth: 200, headerHozAlign: "center" },
        { title: "Công việc đang làm", field: "CongViecDangLam", formatter: 'textarea', vertAlign: "middle", minWidth: 250, headerHozAlign: "center" },
        { title: "Nơi làm việc", field: "NoiLamViec", formatter: 'textarea', vertAlign: "middle", minWidth: 250, headerHozAlign: "center" },
        { title: "Địa chỉ nơi làm việc", field: "DiaChiCuTheNLV", formatter: 'textarea', vertAlign: "middle", minWidth: 250, headerHozAlign: "center" },
        { title: "Thời gian thất nghiệp", field: "ThoiGianThatNghiep", formatter: 'textarea', vertAlign: "middle", minWidth: 200, headerHozAlign: "center", hozAlign: "center" },
        { title: "Nguyên nhân không tham gia HĐKT", field: "NguyenNhanKTGHDKT", formatter: 'textarea', vertAlign: "middle", minWidth: 180, headerHozAlign: "center" },
        { title: "Nhu cầu đào tạo", field: "NhuCauDaoTaoVL", formatter: 'textarea', vertAlign: "middle", minWidth: 180, headerHozAlign: "center" },
        { title: "Loại biến động", field: "LoaiBienDong", formatter: 'textarea', vertAlign: "middle", minWidth: 180, headerHozAlign: "center" },
        { title: "ThuThapCungLDID", field: "CungLaoDongID", width: 0, visible: false }
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
    saveData[7] = $('#HoGiaDinhID_TimKiem_us').value();
    Grid1.clearData();
    const GetAll = await NTS.getAjaxAsync("/QuanLy/ThuThapCungLaoDongBienDong/GetAll", { data: saveData });
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.thongbaoloi(GetAll.Msg);
    GridKhongCoDuLieu("Grid1");
}



//---------------------------------Thêm mới thông tin hộ gia đình---------------------------------
$(document).on('click', '#btnThemNhanhHoGiaDinh', function () {
    getLocation();
    showModalThemMoi();
});

$(document).on('click', '#btnLuuVaDongHGD', function () {
    const validate = new NTSValidate('#mdThemMoiHGD');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }

    //Kiểm tra năm sinh và năm được cấp số CCCD
    var ngaySinh = new Date($('#NgaySinh').val()).getFullYear();
    var ngayCapCCCD = new Date($('#NgayCapSoDinhDanh').val()).getFullYear();

    if (ngaySinh >= ngayCapCCCD) {
        NTS.canhbao("Năm sinh không được lớn hơn năm cấp Số CMND/CCCD/Số định danh cá nhân!");
        return false;
    }

    if (!checkAge($('#NgaySinh').value())) {
        // Ngày sinh không đủ 15 tuổi
        NTS.canhbao("Ngày sinh không được nhỏ hơn 15 tuổi!");
        return false;
    }

    if ($('#SoDinhDanh').val().length !== 12 && $('#SoDinhDanh').val().length !== 9) {
        NTS.canhbao("Số CMND/CCCD/Số định danh cá nhân chưa đúng định dạng!");
        return false;
    }


    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#HoGiaDinhID').value();
    saveData[2] = $('#MaHo').value();
    saveData[3] = $('#HoVaTen').value();
    saveData[4] = $('#SoDinhDanh').value();
    saveData[5] = $('#NgayCapSoDinhDanh').value();
    saveData[6] = $('#NoiCap_TinhID').value();
    saveData[7] = $('#GioiTinhID').value();
    saveData[8] = $('#NgaySinh').value();
    saveData[9] = $('#QuocTichID').value();
    saveData[10] = $('#DanTocID').value();
    saveData[11] = $('#TonGiaoID').value();
    saveData[12] = $('#SoDienThoai').value();
    saveData[13] = $('#Email').value();
    saveData[14] = $('#PhanLoaiHoID').value();
    saveData[15] = $('#drop_GiayTo').attr('data-value');
    saveData[16] = $('#SoGiayTo').value();
    saveData[17] = $('#SoNha_TT').value();
    saveData[18] = $('#ThonID_TT').value();
    saveData[19] = $('#XaID_TT').value();
    saveData[20] = $('#HuyenID_TT').value();
    saveData[21] = $('#TinhID_TT').value();
    saveData[22] = $('#DiaChiThuongTru').value();
    saveData[23] = $('#GhiChu').value();
    saveData[24] = $('#TrangThai').value();
    saveData[25] = "";
    saveData[26] = soCCCD;
    var result = NTS.getAjax('/DanhMuc/HoGiaDinh/LuuThongTin', { data: saveData });
    if (!result.Err) {
        if (result.Logs == "1") {
            CanhBaoTrungSoDinhDanhDoiTuong(() => { }, result.Msg);
        } else if (result.Logs == "0") {
            CanhBaoTrungThanhVien(() => {
                var dataArr = new Array();
                dataArr[0] = saveData[2];
                dataArr[1] = saveData[15];
                dataArr[2] = saveData[16];
                dataArr[3] = result.Result;
                dataArr[4] = saveData[14];
                var data = NTS.getAjax('/DanhMuc/HoGiaDinh/CapNhatThongTinDTQuaHGD', { data: dataArr });
                if (!data.Err) {
                    var HGD = data.Result.HoGiaDinh[0];
                    LoadComBoHoGiaDinhCLD($('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), "")
                    NTS.thanhcong(data.Msg);
                    soCCCD = "";
                    tempthem = "sua";
                    $('#HoGiaDinhID').value(HGD.HoGiaDinhID);
                    $('#MaHo').value(HGD.MaHoGiaDinh);
                    $('#HoVaTen').value(HGD.HoVaTenChuHo);
                    $('#SoDinhDanh').value(HGD.SoCCCD);
                    $('#NgayCapSoDinhDanh').value(convertDateTime(HGD.NgayCap));
                    $('#NoiCap_TinhID').value(HGD.NoiCapID);
                    $('#GioiTinhID').value(HGD.GioiTinhID);
                    $('#NgaySinh').value(convertDateTime(HGD.NgayThangNamSinh));
                    $('#QuocTichID').value(HGD.QuocTichID);
                    $('#DanTocID').value(HGD.DanTocID);
                    $('#TonGiaoID').value(HGD.TonGiaoID);
                    $('#SoDienThoai').value(HGD.SoDienThoai);
                    $('#Email').value(HGD.Email);
                    if (HGD.LoaiHoGD == 1) {
                        $('#drop_GiayTo').html(' Sổ hộ khẩu &nbsp; <i class="fa-solid fa-caret-down"></i>');
                    } else {
                        $('#drop_GiayTo').html(' Sổ tạm trú &nbsp; <i class="fa-solid fa-caret-down"></i>');
                    }
                    $('#SoGiayTo').value(HGD.SoGiayTo);
                    $('#SoNha_TT').value(HGD.SoNhaTT);
                    $('#TinhID_TT').value(HGD.DiaBanHCID_TinhTT);
                    $('#HuyenID_TT').value(HGD.DiaBanHCID_HuyenTT);
                    $('#XaID_TT').value(HGD.DiaBanHCID_XaTT);
                    $('#ThonID_TT').value(HGD.DiaBanHCID_ThonTT);
                    $('#DiaChiThuongTru').value(HGD.DiaChiCuTheTT);
                    $('#GhiChu').value(HGD.GhiChu);
                    $('#TrangThai').value(HGD.TrangThai);
                    soCCCD = HGD.SoCCCD;
                } else {
                    result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
                }
            }, () => { }, result.Msg);
        } else {
            LoadComBoHoGiaDinhCLD($('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), "")
            NTS.thanhcong(result.Msg);
            $('#mdThemMoiHGD').modal('hide');
            soCCCD = "";
            return false;
        }
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});

//---------------------------------Xem thông tin thu thập cung lao động---------------------------------
$(document).on('click', '.btnXemTT ', function () {
    var ID = $(this).attr('data');
    ShowModal_XemThongTinCungLaoDong_us(ID);
});
//---------------------------------Sửa thông tin thu thập cung lao động---------------------------------
$(document).on('click', '.btnSuaTT   ', function () {
    getLocation();
    var ID = $(this).attr('data');
    SuaDuLieuCungLaoDong(ID, $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
});


///////// PHÍM TẮT /////////
var hotKey = 0; // 1 thêm
$(document).on('keydown', function (e) {
    switch (e.keyCode) {
        case 113:
            if (hotKey == 0)
                $('#btnThemMoiBienDong').trigger('click');
            e.preventDefault();
            break;
        case 114:
            if (hotKey == 0)
                $('.nav-search-input').focus();
            e.preventDefault();
            break;
        case 115:
            if (hotKey == 1)
                if ($('#mdThemMoiCungLaoDongBanDau').hasClass('show')) {
                    $('#mdThemMoiCungLaoDongBanDau').modal('hide');
                    e.preventDefault();
                    break;
                } else if ($('#mdXemThongTinCungLaoDong_us').hasClass('show')) {
                    $('#mdXemThongTinCungLaoDong_us').modal('hide');
                    e.preventDefault();
                    break;
                } else if ($('#mdThemMoiCungLaoDongBanDau_TL').hasClass('show')) {
                    $('#mdThemMoiCungLaoDongBanDau_TL').modal('hide');
                    e.preventDefault();
                    break;
                } else if ($('#mdThemMoi').hasClass('show')) {
                    $('#mdThemMoi').modal('hide');
                    e.preventDefault();
                    break;
                } else if ($('#mdThemMoiHGD').hasClass('show')) {
                    $('#mdThemMoiHGD').modal('hide');
                    e.preventDefault();
                    break;
                }
        case 120:
            if (hotKey == 1) {
                //
                //if ($('#mdThemMoi').hasClass('show')) {
                //    $('#btnLuuVaDong').trigger('click');
                //    e.preventDefault();
                //    break;
                /*}else  */if ($('#mdThemMoiCungLaoDongBanDau').hasClass('show')) {
                    $('#btnLuuVaDongCLD').trigger('click');
                    e.preventDefault();
                    break;
                }
                else if ($('#mdThemMoiCungLaoDongBanDauThanhVien_us').hasClass('show')) {
                    $('#btnLuuVaDongThemThanhVien_us').trigger('click');
                    e.preventDefault();
                    break;
                }
                else if ($('#mdThemMoiCungLaoDongBanDau_TL').hasClass('show')) {
                    $('#btnLuuVaDong_TL').trigger('click');
                    e.preventDefault();
                    break;
                } else if ($('#mdThemMoiHGD').hasClass('show')) {
                    $('#btnLuuVaDongHGD').trigger('click');
                    e.preventDefault();
                    break;
                }
            }
        case 121:
            if (hotKey == 1) {
                if ($('#mdThemMoiCungLaoDongBanDau').hasClass('show')) {
                    $('#btnTiepTuc').trigger('click');
                    e.preventDefault();
                    break;
                }
            }
    }
});
$(document).on('shown.bs.modal', '#mdThemMoiCungLaoDongBanDau', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdThemMoiCungLaoDongBanDau', function () {
    hotKey = 0;
});

$(document).on('shown.bs.modal', '#mdXemThongTinCungLaoDong_us', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdXemThongTinCungLaoDong_us', function () {
    hotKey = 0;
});

$(document).on('shown.bs.modal', '#mdThemMoiCungLaoDongBanDau_TL', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdThemMoiCungLaoDongBanDau_TL', function () {
    hotKey = 0;
});

$(document).on('shown.bs.modal', '#mdThemMoiHGD', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdThemMoiHGD', function () {
    hotKey = 0;
});

//===================Modal chọn hộ gia đình==========================//
$(document).on('click', '#btnChonHoGDVaDong_us', function () {
    if (Grid_ChonHoGD_us.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 hộ gia đình!');
        return false;
    }
    if ($('#select2-MoiQuanHeIDDT_CLD_US-container').text() == "Chủ hộ") {
        ResetInputRong();
    }
    var data = Grid_ChonHoGD_us.getSelectedRows()[0]._row.data;
    $('#HoGiaDinhID').value(data.HoGiaDinhID);
    $('#SelectChuHo_CLD_US').attr('value', data.HoGiaDinhID);
    $('#SelectChuHo_CLD_US').html(`<li><span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;"><b>${data.HoVaTenChuHo}(${data.SoGiayTo})</b> - <b>Nơi thường trú: </b>${data.DiaChiCuTheTT}</span></li>`);
    $('#MoiQuanHeIDDT_CLD_US').prop("disabled", false);
    $('#MoiQuanHeIDDT_CLD_US').prop('required', true);
    $('#lbMoiQuanHeIDDT_CLD_us').addClass('validation');
    $('#mdChonHoGD_us').modal('hide');

    // Load danh sách thành viên hộ gia đình
    ResetTTThanhVienCLD();
    var hoGiaDinhID = data.HoGiaDinhID;
    if (hoGiaDinhID != "") {
        $('#countrydata').html('');
        var result = NTS.getAjax('/DanhMuc/HoGiaDinh/ThanhVienHoGD_ThuocHoGD', { id: hoGiaDinhID });
        var data = result.Result;
        // Truyền giá trị cho thuộc tính list và id
        for (var i = 0; i < data.length; i++) {
            $('#countrydata').append(`<option data="${data[i].ThanhVienHoGDID}">${data[i].SoCCCD} - ${data[i].HoVaTen}</option>`);
        }
    }
    return false;
});

//==================Xử lý logic đối tượng================//
function ResetTTThanhVienCLD() {
    $('#countrydata').html('');
    $('#MoiQuanHeIDDT_CLD_US').value('');
    $('#TinhID_TT_us').prop('disabled', false);
    $('#HuyenID_TT_us').prop('disabled', false);
    $('#XaID_TT_us').prop('disabled', false);
    $('#ThonID_TT_us').prop('disabled', false);
    $('#SoNha_TT_us').prop('disabled', false);
    $('#DiaChiThuongTruDT_us_CLD').prop('disabled', false);
}

// Kiểm tra và thay thế giá trị null hoặc "00000000-0000-0000-0000-000000000000" bằng ""
function replaceNullAndEmptyString(value) {
    if (value === null || value === "00000000-0000-0000-0000-000000000000") {
        return "";
    }
    return value;
}

// Reset lai các input khi nhập CCCD/CMND không tồn tại hoặc thay đổi hộ gia đình khi tối tượng là chủ hộ
function ResetInputRong() {
    $('#SoCMND_us').value('');
    $('#NgayCapCCCD_us').value('');
    $('#NoiCapCCCD_us_CLD').value('');
    $('#HoVaTenDT_us_CLD').value('');
    $('#NgaySinh_us').value('');
    $('#TinhID_NS_us').value('');
    $('#GioiTinh_us').value('');
    $('#DanTocID_us').value('');
    $('#TonGiaoID_us').value('');
    $('#QuocGiaID_us').value('');
    $('#TinhID_TT_us').value('');
    $('#HuyenID_TT_us').value('');
    $('#XaID_TT_us').value('');
    $('#ThonID_TT_us').value('');
    $('#SoNha_TT_us').value('');
    $('#DiaChiThuongTruDT_us_CLD').value('');
    $('#TinhID_HN_us').value('');
    $('#HuyenID_HN_us').value('');
    $('#XaID_HN_us').value('');
    $('#ThonID_HN_us').value('');
    $('#SoNha_HN_us').value('');
    $('#DiaChiThuongTruHN_us').value('');
    $('#GiongHoKhauThuongTru_us').prop('checked', false);
    ////// Chọn phần tử thứ 2 trong select
    $('#NoiCapCCCD_us_CLD option:eq(1)').prop('selected', true);
    $('#NoiCapCCCD_us_CLD').trigger('change');

    $('#GioiTinh_us option:eq(1)').prop('selected', true);
    $('#GioiTinh_us').trigger('change');

    $('#QuocGiaID_us option:eq(1)').prop('selected', true);
    $('#QuocGiaID_us').trigger('change');

    $('#DanTocID_us option:eq(1)').prop('selected', true);
    $('#DanTocID_us').trigger('change');

    $('#TonGiaoID_us option:eq(1)').prop('selected', true);
    $('#TonGiaoID_us').trigger('change');
    // Gán mặc định tỉnh, huyện, xã của địa chỉ thường trú theo tỉnh, huyện, xã theo đơn vị đăng nhập
    try {
        var DonVi = NTS.getAjax('/DanhMuc/DungChung/GetThongTinDonViThaoTac', {});
        DonVi = DonVi.Result;
        if (DonVi != undefined && !$.isEmptyObject(DonVi) && DonVi != '' && DonVi != null) {
            $('#TinhID_TT_us').value(DonVi[0].DiaBanHCID_Tinh);
            $('#TinhID_NS_us').value(DonVi[0].DiaBanHCID_Tinh);
            $('#HuyenID_TT_us').value(DonVi[0].DiaBanHCID_Huyen);
            $('#XaID_TT_us').value(DonVi[0].DiaBanHCID_Xa);
        }
    } catch (e) {

    }
    $('#LoaiBHXH_us').value('');
    $('#DoiTuongUuTienID_us').value('');
    $('#TrinhDoPTID_us').value('');
    $('#TrinhDoCMKTID_us').value('');
    $('#NguoiCungCapThongTin').value('');
    $('#NhuCauDaoTaoViecLam').value('');
    $('#LinhVucDaoTaoID_us').value('');
    $('#ChuyenNganhDTID_us').value('');
    $('#chkBHYT_us').prop('checked', false);
    $('#chkBHTN_us').prop('checked', false);
    $('#MaSoBHXH_us').value('');
    $('#LoaiBienDongID').value('');
    $('#txtDuongDanFileVB_tailieu_CLD').val('');
    $('#btnChonTepVB_tailieu_CLD').css({ "display": "block" });
    $('#btnXoaChuKy').css({ "display": "none" });
    $('#btnXoaChuKy').attr({ "data-url-file": "" });
    $('#list-file-tai-lieu_CLD').html('');
    $('#list-file-tai-lieu_CLD').css({ "display": "none" });
}

$(document).on('click', '.itemDoiTuong', function () {
    if ($('#select2-MoiQuanHeIDDT_CLD_US-container').text() == "Chủ hộ") {
        ResetInputRong();
        NTS.canhbao("Không thể thay đổi hộ gia đình khi đối tượng là chủ hộ!")
    }
    ResetTTThanhVienCLD();
    var action = $(this).attr("action");
    if (action == "false") {
        return;
    }
    if (action != "chon") {
        var hoGiaDinhID = $('#SelectChuHo_CLD_US').attr('value');
        if (hoGiaDinhID != "") {
            $('#countrydata').html('');
            var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBienDong/LayDuLieuCungBanDauTheoHGD', { id: hoGiaDinhID });
            var data = result.Result;
            // Truyền giá trị cho thuộc tính list và id
            for (var i = 0; i < data.length; i++) {
                $('#countrydata').append(`<option data="${data[i].ThanhVienHoGDID}">${data[i].SoCCCD} - ${data[i].HoVaTen}</option>`);
            }
        }
    }
});

function LoadDoiTuongThuThapBanDau(value) {
    var soCCCD = value;
    // Trả về trạng thái thêm mới
    $('#MoiQuanHeIDDT_CLD_US').prop('disabled', false);
    $('#TinhID_TT_us').prop('disabled', false);
    $('#HuyenID_TT_us').prop('disabled', false);
    $('#XaID_TT_us').prop('disabled', false);
    $('#ThonID_TT_us').prop('disabled', false);
    $('#SoNha_TT_us').prop('disabled', false);
    $('#DiaChiThuongTruDT_us_CLD').prop('disabled', false);

    NTS.loadDataCombo({
        name: '#MoiQuanHeIDDT_CLD_US',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
        ajaxParam: { data: ['them', '12'] },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });

    if (soCCCD.indexOf(" ") !== -1) {
        // Lấy ra số CMND/CCCD/Số định danh từ option
        var numberString = soCCCD.split(' ')[0].replace(/[^0-9]/g, "");
        $('#SoCMND_us').value(numberString);

        // Lấy ra thông tin của thành viên vừa chọn
        var thanhvienid = $('#countrydata option[value="' + soCCCD + '"]').attr('data');
        var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBienDong/LoadDuLieu_CungLaoDongBanDauTheoDT', { id: numberString });
        var data = result.Result[0];

        // Nếu thành viên là chủ hộ thì load lại cobom quan hệ và ẩn quan hệ
        if (data.ChuHo == "1") {
            NTS.loadDataCombo({
                name: '#MoiQuanHeIDDT_CLD_US',
                ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
                ajaxParam: { data: ['sua', '12'] },
                indexValue: 0,
                indexText: 2,
                textShowTatCa: '-Chọn-',
                showTatCa: !0
            });
            $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
        } else {
            $('#MoiQuanHeIDDT_CLD_US').prop('disabled', false);
        }
        $('#MoiQuanHeIDDT_CLD_US').value(data.QuanHeID);
        $('#NgayCapCCCD_us').value(data.NgayCap);
        $('#NoiCapCCCD_us_CLD').value(data.NoiCapID);
        $('#HoVaTenDT_us_CLD').value(data.HoVaTen);
        $('#NgaySinh_us').value(data.NgayThangNamSinh);
        $('#TinhID_NS_us').value(data.NoiSinh);
        $('#GioiTinh_us').value(data.GioiTinhID);
        $('#DanTocID_us').value(data.DanTocID);
        $('#TonGiaoID_us').value(data.TonGiaoID);
        $('#QuocGiaID_us').value(data.QuocTichID);
        $('#TinhID_TT_us').value(data.DiaBanHCID_TinhTT);
        $('#HuyenID_TT_us').value(data.DiaBanHCID_HuyenTT);
        $('#XaID_TT_us').value(data.DiaBanHCID_XaTT);
        $('#ThonID_TT_us').value(data.DiaBanHCID_ThonTT);
        $('#SoNha_TT_us').value(data.SoNhaTT);
        $('#DiaChiThuongTruDT_us_CLD').value(data.DiaChiCuTheTT);
        $('#TinhID_HN_us').value(data.DiaBanHCID_TinhHT);
        $('#HuyenID_HN_us').value(data.DiaBanHCID_HuyenHT);
        $('#XaID_HN_us').value(data.DiaBanHCID_XaHT);
        $('#ThonID_HN_us').value(data.DiaBanHCID_ThonHT);
        $('#SoNha_HN_us').value(data.SoNhaHT);
        $('#DiaChiThuongTruHN_us').value(data.DiaChiCuTheHT);
        $('#DoiTuongID').value(data.ThanhVienHoGDID);
        soCCCDDT = data.SoCCCD;
        $('#TinhID_TT_us').prop('disabled', true);
        $('#HuyenID_TT_us').prop('disabled', true);
        $('#XaID_TT_us').prop('disabled', true);
        $('#ThonID_TT_us').prop('disabled', true);
        $('#SoNha_TT_us').prop('disabled', true);
        $('#DiaChiThuongTruDT_us_CLD').prop('disabled', true);
        if (data.HoGiaDinhID == "00000000-0000-0000-0000-000000000000") {
            $('#SelectChuHo_CLD_US').html(`<li action="chon"><div class="opInfo"><div style="display: flex;justify-content: space-between;align-items: center;">--Chọn hộ gia đình-- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);
            $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
            $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
            $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
            $('#SelectChuHo_CLD_US').attr('value', "");
        } else {
            var item = `<li style="display: flex"><span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;"><b>${data.HoVaTenChuHo}</b> <b>(${data.MaHoGiaDinh})</b>- Nơi thường trú : <b>${data.NoiThuongTruHGD}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
            $('#SelectChuHo_CLD_US').attr('value', data.HoGiaDinhID);
            $('#SelectChuHo_CLD_US').html(item);
        }

        // Load dữ liệu của thông tin cung lao động 
        $('#DoiTuongUuTienID_us').value(data.DoiTuongUuTienID);
        $('#TenDanToc_us').value(data.TenDanToc);
        $('#LoaiBHXH_us').value(data.ThamGiaBHXHID);
        if (data.BHTN == 1) {
            $('#chkBHTN_us').prop('checked', true);
        } else {
            $('#chkBHTN_us').prop('checked', false);
        }
        if (data.BHYT == 1) {
            $('#chkBHYT_us').prop('checked', true);
        } else {
            $('#chkBHYT_us').prop('checked', false);
        }
        $('#MaSoBHXH_us').value(data.MaBHXH);
        $('#TrinhDoPTID_us').value(data.TrinhDoHVID);
        $('#TrinhDoCMKTID_us').value(data.TrinhDoCMKTID);
        $('#LinhVucDaoTaoID_us').value(data.LinhVucDaoTaoID);
        $('#ChuyenNganhDTID_us').value(data.ChuyenNganhDaoTaoID);
        $('#ViTheViecLamID_us').value(data.ViTheViecLamID);
        $('#CongViecDangLamID_us').value(data.NgheNghiepID);
        $('#ViTriViecLamID_us').value(data.ViTriViecLamID);
        if (data.HopDongLaoDong == "0") {
            $('#chkKhongCoHDLD').prop('checked', true);
        } else {
            $('#chkKhongCoHDLD').prop('checked', false);
        }
        if (data.HopDongLaoDong == "1") {
            $('#chkCoHDLD').prop('checked', true);
        } else {
            $('#chkCoHDLD').prop('checked', false);
        }
        $('#NgayKy').value(data.NgayKyHĐ);
        $('#LoaiHopDongLaoDongID').value(data.LoaiHopDongID);
        $('#NoiLamViec').value(data.TenDNNoiLV);
        if (data.NoiLVNuocNgoai == "0") {
            $('#LamViecTrongNuoc').prop('checked', true);
            $('#LamViecNuocNgoai').prop('checked', false);
            $('.LamViecTrongNuoc').css('display', 'block');
            $('.LamViecONuocNgoai').css('display', 'none');
        } else {
            $('#LamViecNuocNgoai').prop('checked', true);
            $('#LamViecTrongNuoc').prop('checked', false);
            $('.LamViecTrongNuoc').css('display', 'none');
            $('.LamViecONuocNgoai').css('display', 'block');
        }
        $('#TinhID_NLV').value(data.DiaBanHCID_TinhNLV);
        $('#HuyenID_NLV').value(data.DiaBanHCID_HuyenNLV);
        $('#XaID_NLV').value(data.DiaBanHCID_XaNLV);
        $('#ThonID_NLV').value(data.DiaBanHCID_ThonNLV);
        $('#SoNha_NLV').value(data.SoNhaNoiLV);
        $('#LoaiHinhNLVID').value(data.LoaiHinhDNID);
        $('#DiaChiNoiLamViec').value(data.DiaChiCuTheNLV);
        if (data.ThatNghiep == "0") {
            $('#chkChuaBaoGioLamViec').prop('checked', true);
        } else {
            $('#chkChuaBaoGioLamViec').prop('checked', false);
        }
        if (data.ThatNghiep == "1") {
            $('#chkDaTungLamViec').prop('checked', true);
        } else {
            $('#chkDaTungLamViec').prop('checked', false);
        }
        $('#QuocGiaID_us_NLV').value(data.QuocGiaID);
        $('#ThoiGianThatnghiep').value(data.ThoiGianThatNghiepID);
        $('#CongViecTruocKhiThatNghiep').value(data.CongViecTruocTN);
        $('#NguyenNhanKTGHDKTID').value(data.LyDoID);
        $('#NhuCauDaoTaoViecLam').value(data.NhuCauDaoTaoVL);
        $('#NguoiCungCapThongTin').value(data.NguoiCungCapTT);
        if (data.ThatNghiep != "2" || data.ThoiGianThatNghiepID != "00000000-0000-0000-0000-000000000000" || data.CongViecTruocTN != "00000000-0000-0000-0000-000000000000") {
            ResetDoiVoiNguoiCoViecLam();
            ResetDoiVoiNguoiKTGHDKT();
        }
        else if (data.LyDoID != "00000000-0000-0000-0000-000000000000") {
            ResetDoiVoiNguoiCoViecLam();
            ResetDoiVoiNguoiThatNghiep();
        }
        else if (data.ViTheViecLamID != "00000000-0000-0000-0000-000000000000" ||
            data.NgheNghiepID != "00000000-0000-0000-0000-000000000000" ||
            data.ViTriViecLamID != "00000000-0000-0000-0000-000000000000" ||
            data.DiaBanHCID_TinhNLV != "00000000-0000-0000-0000-000000000000" ||
            data.DiaBanHCID_ThonNLV != "00000000-0000-0000-0000-000000000000" ||
            data.DiaBanHCID_XaNLV != "00000000-0000-0000-0000-000000000000" ||
            data.DiaBanHCID_HuyenNLV != "00000000-0000-0000-0000-000000000000" ||
            data.QuocGiaID != "00000000-0000-0000-0000-000000000000" ||
            data.LoaiHinhDNID != "00000000-0000-0000-0000-000000000000" ||
            data.LoaiHopDongID != "00000000-0000-0000-0000-000000000000" ||
            $('#chkCoHDLD').value() != "0" || $('#NgayKy').value() != "" ||
            $('#NoiLamViec').value() != "" || $('#SoNha_NLV').value() != "" || $('#DiaChiNoiLamViec').value() != ""
        ) {
            ResetDoiVoiNguoiThatNghiep();
            ResetDoiVoiNguoiKTGHDKT();
        }

        //Lưu các giá trị load dữ liệu ra vào mảng để kiểm tra 
        mangGiaTriDau.push(replaceNullAndEmptyString(data.QuanHeID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayCap));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiCapID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.HoVaTen.toUpperCase()));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayThangNamSinh));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiSinh));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.GioiTinhID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DanTocID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.TonGiaoID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.QuocTichID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.HoGiaDinhID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.SoCCCD));
        var listFiles_VanBan_US = [];
        $('#txtDinhKem_VanBan_US').val(data.DinhKem);
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
            $('#HoSoKemTheo_USDangKy').ace_file_input('show_file_list', listFiles_VanBan_US);
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
            $('.ace-file-container.hide-placeholder .ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKem btn-del-item img-db"  onclick="return false"></i>');
        }
        // File đính kèm chữ ký
        $('#list-file-tai-lieu_CLD').html('');
        $('#txtDuongDanFileVB_tailieu_CLD').value(data.ChuKy);
        if (data.ChuKy != null && data.ChuKy.length > 0) {
            $('#btnChonTepVB_tailieu_CLD').css({ "display": "none" });
            $('#btnXoaChuKy').css({ "display": "block" });
            $('#list-file-tai-lieu_CLD').css({ "display": "block" });
            let linkVB = data.ChuKy;
            let arrFile = linkVB.split('*');
            for (let p = 0; p < arrFile.length - 1; p++) {
                if (arrFile[p].lastIndexOf('.') != -1) {
                    // file có đuôi .*
                    if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg"
                    ) {
                        $('#list-file-tai-lieu_CLD').append(`<div class="" style="color: var(--tblr-color-header);">
                                                        <div data-url-file="${arrFile[p].replace('~', '')}" class="xemDinhKemChuKy btn" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}"><i class="fa-solid fa-eye"></i>&nbsp;${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}</div>
                                                    </div>`);
                        $('#btnXoaChuKy').attr('data-url-file', `${arrFile[p]}`);
                    } else {
                        $('#list-file-tai-lieu_CLD').append(`<div class="" style="color: var(--tblr-color-header);">
                                                        <div data-url-file="${arrFile[p].replace('~', '')}" class="xemDinhKemChuKy btn" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}"><i class="fa-solid fa-eye"></i>&nbsp;${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}</div>
                                                    </div>`);
                        $('#btnXoaChuKy').attr('data-url-file', `${arrFile[p]}`);
                    }
                } else {
                    // file không đuôi
                    $('#list-file-tai-lieu_CLD').append(`<div class="" style="color: var(--tblr-color-header);">
                                                        <div data-url-file="${arrFile[p].replace('~', '')}" class="xemDinhKemChuKy btn" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}"><i class="fa-solid fa-eye"></i>&nbsp;${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}</div>
                                                    </div>`);
                    $('#btnXoaChuKy').attr('data-url-file', `${arrFile[p]}`);
                }
            }
        } else {
            $('#btnXoaChuKy').css({ "display": "none" });

        }
    } else {
        $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
        var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBienDong/LoadDuLieu_CungLaoDongBanDauTheoDT', { id: soCCCD });
        if (result.Result != "") {
            var data = result.Result[0];
            if (data.ChuHo == "1") {
                NTS.loadDataCombo({
                    name: '#MoiQuanHeIDDT_CLD_US',
                    ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
                    ajaxParam: { data: ['sua', '12'] },
                    indexValue: 0,
                    indexText: 2,
                    textShowTatCa: '-Chọn-',
                    showTatCa: !0
                });
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
            } else {
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', false);
            }
            $('#MoiQuanHeIDDT_CLD_US').value(data.QuanHeID);
            $('#NgayCapCCCD_us').value(data.NgayCap);
            $('#NoiCapCCCD_us_CLD').value(data.NoiCapID);
            $('#HoVaTenDT_us_CLD').value(data.HoVaTen);
            $('#NgaySinh_us').value(data.NgayThangNamSinh);
            $('#TinhID_NS_us').value(data.NoiSinh);
            $('#GioiTinh_us').value(data.GioiTinhID);
            $('#DanTocID_us').value(data.DanTocID);
            $('#TonGiaoID_us').value(data.TonGiaoID);
            $('#QuocGiaID_us').value(data.QuocTichID);
            $('#TinhID_TT_us').value(data.DiaBanHCID_TinhTT);
            $('#HuyenID_TT_us').value(data.DiaBanHCID_HuyenTT);
            $('#XaID_TT_us').value(data.DiaBanHCID_XaTT);
            $('#ThonID_TT_us').value(data.DiaBanHCID_ThonTT);
            $('#SoNha_TT_us').value(data.SoNhaTT);
            $('#DiaChiThuongTruDT_us_CLD').value(data.DiaChiCuTheTT);
            $('#TinhID_HN_us').value(data.DiaBanHCID_TinhHT);
            $('#HuyenID_HN_us').value(data.DiaBanHCID_HuyenHT);
            $('#XaID_HN_us').value(data.DiaBanHCID_XaHT);
            $('#ThonID_HN_us').value(data.DiaBanHCID_ThonHT);
            $('#SoNha_HN_us').value(data.SoNhaHT);
            $('#DiaChiThuongTruHN_us').value(data.DiaChiCuTheHT);
            $('#DoiTuongID').value(data.ThanhVienHoGDID);
            soCCCDDT = data.SoCCCD;
            $('#TinhID_TT_us').prop('disabled', true);
            $('#HuyenID_TT_us').prop('disabled', true);
            $('#XaID_TT_us').prop('disabled', true);
            $('#ThonID_TT_us').prop('disabled', true);
            $('#SoNha_TT_us').prop('disabled', true);
            $('#DiaChiThuongTruDT_us_CLD').prop('disabled', true);
            if (data.HoGiaDinhID == "00000000-0000-0000-0000-000000000000") {
                $('#SelectChuHo_CLD_US').html(`<li action="chon"><div class="opInfo"><div style="display: flex;justify-content: space-between;align-items: center;">--Chọn hộ gia đình-- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
                $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
                $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
                $('#SelectChuHo_CLD_US').attr('value', "");
            } else {
                var item = `<li style="display: flex"><span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;"><b>${data.HoVaTenChuHo}</b> <b>(${data.MaHoGiaDinh})</b>- Nơi thường trú : <b>${data.NoiThuongTruHGD}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
                $('#SelectChuHo_CLD_US').attr('value', data.HoGiaDinhID);
                $('#SelectChuHo_CLD_US').html(item);
            }

            // Load dữ liệu của thông tin cung lao động 
            $('#DoiTuongUuTienID_us').value(data.DoiTuongUuTienID);
            $('#TenDanToc_us').value(data.TenDanToc);
            $('#LoaiBHXH_us').value(data.ThamGiaBHXHID);
            if (data.BHTN == 1) {
                $('#chkBHTN_us').prop('checked', true);
            } else {
                $('#chkBHTN_us').prop('checked', false);
            }
            if (data.BHYT == 1) {
                $('#chkBHYT_us').prop('checked', true);
            } else {
                $('#chkBHYT_us').prop('checked', false);
            }
            $('#MaSoBHXH_us').value(data.MaBHXH);
            $('#TrinhDoPTID_us').value(data.TrinhDoHVID);
            $('#TrinhDoCMKTID_us').value(data.TrinhDoCMKTID);
            $('#LinhVucDaoTaoID_us').value(data.LinhVucDaoTaoID);
            $('#ChuyenNganhDTID_us').value(data.ChuyenNganhDaoTaoID);
            $('#ViTheViecLamID_us').value(data.ViTheViecLamID);
            $('#CongViecDangLamID_us').value(data.NgheNghiepID);
            $('#ViTriViecLamID_us').value(data.ViTriViecLamID);
            if (data.HopDongLaoDong == "0") {
                $('#chkKhongCoHDLD').prop('checked', true);
            } else {
                $('#chkKhongCoHDLD').prop('checked', false);
            }
            if (data.HopDongLaoDong == "1") {
                $('#chkCoHDLD').prop('checked', true);
            } else {
                $('#chkCoHDLD').prop('checked', false);
            }
            $('#NgayKy').value(data.NgayKyHĐ);
            $('#LoaiHopDongLaoDongID').value(data.LoaiHopDongID);
            $('#NoiLamViec').value(data.TenDNNoiLV);
            if (data.NoiLVNuocNgoai == "0") {
                $('#LamViecTrongNuoc').prop('checked', true);
                $('#LamViecNuocNgoai').prop('checked', false);
                $('.LamViecTrongNuoc').css('display', 'block');
                $('.LamViecONuocNgoai').css('display', 'none');
            } else {
                $('#LamViecNuocNgoai').prop('checked', true);
                $('#LamViecTrongNuoc').prop('checked', false);
                $('.LamViecTrongNuoc').css('display', 'none');
                $('.LamViecONuocNgoai').css('display', 'block');
            }
            $('#TinhID_NLV').value(data.DiaBanHCID_TinhNLV);
            $('#HuyenID_NLV').value(data.DiaBanHCID_HuyenNLV);
            $('#XaID_NLV').value(data.DiaBanHCID_XaNLV);
            $('#ThonID_NLV').value(data.DiaBanHCID_ThonNLV);
            $('#SoNha_NLV').value(data.SoNhaNoiLV);
            $('#LoaiHinhNLVID').value(data.LoaiHinhDNID);
            $('#DiaChiNoiLamViec').value(data.DiaChiCuTheNLV);
            if (data.ThatNghiep == "0") {
                $('#chkChuaBaoGioLamViec').prop('checked', true);
            } else {
                $('#chkChuaBaoGioLamViec').prop('checked', false);
            }
            if (data.ThatNghiep == "1") {
                $('#chkDaTungLamViec').prop('checked', true);
            } else {
                $('#chkDaTungLamViec').prop('checked', false);
            }
            $('#QuocGiaID_us_NLV').value(data.QuocGiaID);
            $('#ThoiGianThatnghiep').value(data.ThoiGianThatNghiepID);
            $('#CongViecTruocKhiThatNghiep').value(data.CongViecTruocTN);
            $('#NguyenNhanKTGHDKTID').value(data.LyDoID);
            $('#NhuCauDaoTaoViecLam').value(data.NhuCauDaoTaoVL);
            $('#NguoiCungCapThongTin').value(data.NguoiCungCapTT);
            if (data.ThatNghiep != "2" || data.ThoiGianThatNghiepID != "00000000-0000-0000-0000-000000000000" || data.CongViecTruocTN != "00000000-0000-0000-0000-000000000000") {
                ResetDoiVoiNguoiCoViecLam();
                ResetDoiVoiNguoiKTGHDKT();
            }
            else if (data.LyDoID != "00000000-0000-0000-0000-000000000000") {
                ResetDoiVoiNguoiCoViecLam();
                ResetDoiVoiNguoiThatNghiep();
            }
            else if (data.ViTheViecLamID != "00000000-0000-0000-0000-000000000000" ||
                data.NgheNghiepID != "00000000-0000-0000-0000-000000000000" ||
                data.ViTriViecLamID != "00000000-0000-0000-0000-000000000000" ||
                data.DiaBanHCID_TinhNLV != "00000000-0000-0000-0000-000000000000" ||
                data.DiaBanHCID_ThonNLV != "00000000-0000-0000-0000-000000000000" ||
                data.DiaBanHCID_XaNLV != "00000000-0000-0000-0000-000000000000" ||
                data.DiaBanHCID_HuyenNLV != "00000000-0000-0000-0000-000000000000" ||
                data.QuocGiaID != "00000000-0000-0000-0000-000000000000" ||
                data.LoaiHinhDNID != "00000000-0000-0000-0000-000000000000" ||
                data.LoaiHopDongID != "00000000-0000-0000-0000-000000000000" ||
                $('#chkCoHDLD').value() != "0" || $('#NgayKy').value() != "" ||
                $('#NoiLamViec').value() != "" || $('#SoNha_NLV').value() != "" || $('#DiaChiNoiLamViec').value() != ""
            ) {
                ResetDoiVoiNguoiThatNghiep();
                ResetDoiVoiNguoiKTGHDKT();
            }
            //Lưu các giá trị load dữ liệu ra vào mảng để kiểm tra 
            // Thêm giá trị vào mảng sau khi kiểm tra và thay thế
            mangGiaTriDau.push(replaceNullAndEmptyString(data.QuanHeID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayCap));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiCapID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.HoVaTen.toUpperCase()));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayThangNamSinh));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiSinh));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.GioiTinhID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DanTocID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.TonGiaoID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.QuocTichID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.HoGiaDinhID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoCCCD));
            var listFiles_VanBan_US = [];
            $('#txtDinhKem_VanBan_US').val(data.DinhKem);
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
                $('#HoSoKemTheo_USDangKy').ace_file_input('show_file_list', listFiles_VanBan_US);
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
                $('.ace-file-container.hide-placeholder .ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKem btn-del-item img-db"  onclick="return false"></i>');
            }
            // File đính kèm chữ ký
            $('#list-file-tai-lieu_CLD').html('');
            $('#txtDuongDanFileVB_tailieu_CLD').value(data.ChuKy);
            if (data.ChuKy != null && data.ChuKy.length > 0) {
                $('#btnChonTepVB_tailieu_CLD').css({ "display": "none" });
                $('#btnXoaChuKy').css({ "display": "block" });
                $('#list-file-tai-lieu_CLD').css({ "display": "block" });
                let linkVB = data.ChuKy;
                let arrFile = linkVB.split('*');
                for (let p = 0; p < arrFile.length - 1; p++) {
                    if (arrFile[p].lastIndexOf('.') != -1) {
                        // file có đuôi .*
                        if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg"
                        ) {
                            $('#list-file-tai-lieu_CLD').append(`<div class="" style="color: var(--tblr-color-header);">
                                                        <div data-url-file="${arrFile[p].replace('~', '')}" class="xemDinhKemChuKy btn" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}"><i class="fa-solid fa-eye"></i>&nbsp;${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}</div>
                                                    </div>`);
                            $('#btnXoaChuKy').attr('data-url-file', `${arrFile[p]}`);
                        } else {
                            $('#list-file-tai-lieu_CLD').append(`<div class="" style="color: var(--tblr-color-header);">
                                                        <div data-url-file="${arrFile[p].replace('~', '')}" class="xemDinhKemChuKy btn" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}"><i class="fa-solid fa-eye"></i>&nbsp;${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}</div>
                                                    </div>`);
                            $('#btnXoaChuKy').attr('data-url-file', `${arrFile[p]}`);
                        }
                    } else {
                        // file không đuôi
                        $('#list-file-tai-lieu_CLD').append(`<div class="" style="color: var(--tblr-color-header);">
                                                        <div data-url-file="${arrFile[p].replace('~', '')}" class="xemDinhKemChuKy btn" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}"><i class="fa-solid fa-eye"></i>&nbsp;${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}</div>
                                                    </div>`);
                        $('#btnXoaChuKy').attr('data-url-file', `${arrFile[p]}`);
                    }
                }
            } else {
                $('#btnXoaChuKy').css({ "display": "none" });

            }
        } else {
            ResetTTThanhVienCLD();
            $('#SelectChuHo_CLD_US').value('');
            $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
            $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
            $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
            $('#TinhID_TT_us').prop('disabled', false);
            $('#HuyenID_TT_us').prop('disabled', false);
            $('#XaID_TT_us').prop('disabled', false);
            $('#ThonID_TT_us').prop('disabled', false);
            $('#SoNha_TT_us').prop('disabled', false);
            $('#DiaChiThuongTruDT_us_CLD').prop('disabled', false);
            ResetInputRong();
            var item = `<li action="chon"><div class="opInfo"><div style="display: flex;justify-content: space-between;align-items: center;">--Chọn hộ gia đình-- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
            $('.btn-select').html(item);
            $('#SoCMND_us').value(soCCCD);
            var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBienDong/LoadDuLieuThanhVienBySoCCCD', { soCCCD: soCCCD });
            if (result.Result != "") {
                var data = result.Result[0];
                if (data.ChuHo == "1") {
                    NTS.loadDataCombo({
                        name: '#MoiQuanHeIDDT_CLD_US',
                        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
                        ajaxParam: { data: ['sua', '12'] },
                        indexValue: 0,
                        indexText: 2,
                        textShowTatCa: '-Chọn-',
                        showTatCa: !0
                    });
                    $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
                } else {
                    $('#MoiQuanHeIDDT_CLD_US').prop('disabled', false);
                }
                $('#MoiQuanHeIDDT_CLD_US').value(data.QuanHeID);
                $('#NgayCapCCCD_us').value(data.NgayCap);
                $('#NoiCapCCCD_us_CLD').value(data.NoiCapID);
                $('#HoVaTenDT_us_CLD').value(data.HoVaTen);
                $('#NgaySinh_us').value(data.NgayThangNamSinh);
                $('#TinhID_NS_us').value(data.NoiSinh);
                $('#GioiTinh_us').value(data.GioiTinhID);
                $('#DanTocID_us').value(data.DanTocID);
                $('#TonGiaoID_us').value(data.TonGiaoID);
                $('#QuocGiaID_us').value(data.QuocTichID);
                $('#TinhID_TT_us').value(data.DiaBanHCID_TinhTT);
                $('#HuyenID_TT_us').value(data.DiaBanHCID_HuyenTT);
                $('#XaID_TT_us').value(data.DiaBanHCID_XaTT);
                $('#ThonID_TT_us').value(data.DiaBanHCID_ThonTT);
                $('#SoNha_TT_us').value(data.SoNhaTT);
                $('#DiaChiThuongTruDT_us_CLD').value(data.DiaChiCuTheTT);
                $('#TinhID_HN_us').value(data.DiaBanHCID_TinhHT);
                $('#HuyenID_HN_us').value(data.DiaBanHCID_HuyenHT);
                $('#XaID_HN_us').value(data.DiaBanHCID_XaHT);
                $('#ThonID_HN_us').value(data.DiaBanHCID_ThonHT);
                $('#SoNha_HN_us').value(data.SoNhaHT);
                $('#DiaChiThuongTruHN_us').value(data.DiaChiCuTheHT);
                $('#DoiTuongID').value(data.ThanhVienHoGDID);
                soCCCDDT = data.SoCCCD;
                $('#TinhID_TT_us').prop('disabled', true);
                $('#HuyenID_TT_us').prop('disabled', true);
                $('#XaID_TT_us').prop('disabled', true);
                $('#ThonID_TT_us').prop('disabled', true);
                $('#SoNha_TT_us').prop('disabled', true);
                $('#DiaChiThuongTruDT_us_CLD').prop('disabled', true);
                if (data.HoGiaDinhID == "00000000-0000-0000-0000-000000000000") {
                    $('#SelectChuHo_CLD_US').html(`<li action="chon"><div class="opInfo"><div style="display: flex;justify-content: space-between;align-items: center;">--Chọn hộ gia đình-- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);
                    $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
                    $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
                    $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
                    $('#SelectChuHo_CLD_US').attr('value', "");
                } else {
                    var item = `<li style="display: flex"><span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;"><b>${data.HoVaTenChuHo}</b> <b>(${data.MaHoGiaDinh})</b>- Nơi thường trú : <b>${data.DiaChiCuTheHGD}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
                    $('#SelectChuHo_CLD_US').attr('value', data.HoGiaDinhID);
                    $('#SelectChuHo_CLD_US').html(item);
                }
                //Lưu các giá trị load dữ liệu ra vào mảng để kiểm tra 
                // Thêm giá trị vào mảng sau khi kiểm tra và thay thế
                mangGiaTriDau.push(replaceNullAndEmptyString(data.QuanHeID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayCap));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiCapID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.HoVaTen.toUpperCase()));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayThangNamSinh));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiSinh));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.GioiTinhID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DanTocID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.TonGiaoID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.QuocTichID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhTT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenTT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaTT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonTT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaTT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheTT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhHT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenHT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaHT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonHT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaHT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheHT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.HoGiaDinhID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.SoCCCD));
            }
            ResetDinhKemFile();
            NTS.canhbao("Số CMND/CCCD/Số định danh chưa được thu thập ban đầu!");
            return false;
        }
    }
}

$(document).on('blur', '#SoCMND_us', function () {
    var soCCCD = $(this).value();
    if (soCCCD != "") {
        // Khi thu thập biến động thì load cách thông tin của đối tượng đã thu thập ban đầu lên
        LoadDoiTuongThuThapBanDau(soCCCD);
    } 
});

$(document).on('change', '#SoCMND_us', function () {
    mangGiaTriDau = [];
    mangGiaTriSau = [];
});


$(document).on('click', '#btnLuuVaDongCLD', function () {
    const validate = new NTSValidate('#mdThemMoiCungLaoDongBanDau');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }

    //Kiểm tra năm sinh và năm được cấp số CCCD
    var ngaySinh = new Date($('#NgaySinh_us').val()).getFullYear();
    var ngayCapCCCD = new Date($('#NgayCapCCCD_us').val()).getFullYear();

    if (ngaySinh >= ngayCapCCCD) {
        NTS.canhbao("Năm sinh không được lớn hơn năm cấp Số CMND/CCCD/Số định danh cá nhân!");
        return false;
    }

    if (!checkAge($('#NgaySinh_us').value())) {
        // Ngày sinh không đủ 15 tuổi
        NTS.canhbao("Ngày sinh không được nhỏ hơn 15 tuổi!");
        return false;
    }

    if ($('#SoCMND_us').val().length !== 12 && $('#SoCMND_us').val().length !== 9) {
        NTS.canhbao("Số CMND/CCCD/Số định danh cá nhân chưa đúng định dạng!");
        return false;
    }

    //Lưu các giá trị trên form vào mảng để kiểm tra 
    mangGiaTriSau.push($('#MoiQuanHeIDDT_CLD_US').value());
    mangGiaTriSau.push($('#NgayCapCCCD_us').value());
    mangGiaTriSau.push($('#NoiCapCCCD_us_CLD').value());
    mangGiaTriSau.push($('#HoVaTenDT_us_CLD').value().toUpperCase());
    mangGiaTriSau.push($('#NgaySinh_us').value());
    mangGiaTriSau.push($('#TinhID_NS_us').value());
    mangGiaTriSau.push($('#GioiTinh_us').value());
    mangGiaTriSau.push($('#DanTocID_us').value());
    mangGiaTriSau.push($('#TonGiaoID_us').value());
    mangGiaTriSau.push($('#QuocGiaID_us').value());
    mangGiaTriSau.push($('#TinhID_TT_us').value());
    mangGiaTriSau.push($('#HuyenID_TT_us').value());
    mangGiaTriSau.push($('#XaID_TT_us').value());
    mangGiaTriSau.push($('#ThonID_TT_us').value());
    mangGiaTriSau.push($('#SoNha_TT_us').value());
    mangGiaTriSau.push($('#DiaChiThuongTruDT_us_CLD').value());
    mangGiaTriSau.push($('#TinhID_HN_us').value());
    mangGiaTriSau.push($('#HuyenID_HN_us').value());
    mangGiaTriSau.push($('#XaID_HN_us').value());
    mangGiaTriSau.push($('#ThonID_HN_us').value());
    mangGiaTriSau.push($('#SoNha_HN_us').value());
    mangGiaTriSau.push($('#DiaChiThuongTruHN_us').value());
    mangGiaTriSau.push($('#SelectChuHo_CLD_US').attr('value'));
    mangGiaTriSau.push($('#SoCMND_us').value());
    // Lưu cho thu thập cung lao động biến động
    if (mangGiaTriSau.length > 0 && mangGiaTriDau.length > 0) {
        var different = false;
        for (var i = 0; i < mangGiaTriDau.length; i++) {
            if (mangGiaTriDau[i] !== mangGiaTriSau[i]) {
                different = true;
                break;
            }
        }
        if (different) { // có thay đổi dữ liệu của thông tin đối tượng
            tempthemDT = 'sua'; // đối tượng
            var saveData = [];
            saveData[0] = tempthem;
            saveData[1] = $('#ThuThapCungLDID').value();
            saveData[2] = $('#NgayThuThap').value();
            saveData[3] = $('#DoiTuongUuTienID_us').value();
            saveData[4] = $('#TenDanToc_us').value();
            saveData[5] = $('#LoaiBHXH_us').value();
            saveData[6] = $('#chkBHYT_us').value();
            saveData[7] = $('#chkBHTN_us').value();
            saveData[8] = $('#MaSoBHXH_us').value();
            saveData[9] = $('#TinhID_TT_us').value();
            saveData[10] = $('#HuyenID_TT_us').value();
            saveData[11] = $('#XaID_TT_us').value();
            saveData[12] = $('#ThonID_TT_us').value();
            saveData[13] = $('#SoNha_TT_us').value();
            saveData[14] = $('#DiaChiThuongTruDT_us_CLD').value();
            saveData[15] = $('#TinhID_HN_us').value();
            saveData[16] = $('#HuyenID_HN_us').value();
            saveData[17] = $('#XaID_HN_us').value();
            saveData[18] = $('#ThonID_HN_us').value();
            saveData[19] = $('#SoNha_HN_us').value();
            saveData[20] = $('#DiaChiThuongTruHN_us').value();

            if (tempthem == 'them') {
                var data = uploadfileEvent({
                    name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                    loaiVB: 'VB',
                });
                if (data.length > 0) {
                    $('#txtDinhKem_VanBan_US').value(data);
                    NTS.dongthongbao();
                }
            }
            else {
                //if (newFile_usDangKy == true) {
                var data = uploadfileEvent({
                    name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                    loaiVB: 'VB',
                });
                if (data.length > 0) {
                    $('#txtDinhKem_VanBan_US').value(data);
                    NTS.dongthongbao();
                }
                //}
            }

            saveData[21] = $('#txtDinhKem_VanBan_US').value();// đính kèm
            saveData[22] = $('#TrinhDoPTID_us').value();
            saveData[23] = $('#TrinhDoCMKTID_us').value();
            saveData[24] = $('#LinhVucDaoTaoID_us').value();
            saveData[25] = $('#ChuyenNganhDTID_us').value();
            saveData[26] = $('#ViTheViecLamID_us').value();
            saveData[27] = $('#CongViecDangLamID_us').value();
            saveData[28] = $('#ViTriViecLamID_us').value();
            if ($('#chkKhongCoHDLD').value() == true) {
                saveData[29] = "0"; // Tình trạng ký hợp đồng lao động (0: Không ký HĐLĐ; 1: Có ký HĐLĐ
            } else if ($('#chkCoHDLD').value() == true) {
                saveData[29] = "1";
            } else {
                saveData[29] = "0";
            }
            saveData[30] = $('#NgayKy').value();
            saveData[31] = $('#LoaiHopDongLaoDongID').value();
            saveData[32] = $('#NoiLamViec').value();
            if ($('#LamViecTrongNuoc').value() == true) {
                saveData[33] = "0";
            } else if ($('#LamViecNuocNgoai').value() == true) { // 0: làm việc trong nước; 1: làm việc ngoài nước
                saveData[33] = "1";
            } else {
                saveData[33] = "0";
            }
            saveData[34] = $('#TinhID_NLV').value();
            saveData[35] = $('#HuyenID_NLV').value();
            saveData[36] = $('#XaID_NLV').value();
            saveData[37] = $('#ThonID_NLV').value();
            saveData[38] = $('#SoNha_NLV').value();
            saveData[39] = $('#LoaiHinhNLVID').value();
            saveData[40] = $('#QuocGiaID_us_NLV').value();
            saveData[41] = $('#DiaChiNoiLamViec').value();
            if ($('#chkChuaBaoGioLamViec').value() == true) {
                saveData[42] = "0";
            } else if ($('#chkDaTungLamViec').value() == true) {
                saveData[42] = "1";
            } else {
                saveData[42] = "2";
            }
            saveData[43] = $('#ThoiGianThatnghiep').value();
            saveData[44] = $('#CongViecTruocKhiThatNghiep').value();
            saveData[45] = $('#NguyenNhanKTGHDKTID').value();
            saveData[46] = $('#NhuCauDaoTaoViecLam').value();
            saveData[47] = $('#NguoiCungCapThongTin').value();
            saveData[48] = $('#SelectChuHo_CLD_US').attr('value');
            saveData[49] = $('#DoiTuongID').value();
            saveData[50] = $('#SoCMND_us').value();
            saveData[51] = tempthemDT;
            saveData[52] = $('#DoiTuongID').attr('value');
            saveData[53] = $('#SelectChuHo_CLD_US').attr('value');
            saveData[54] = soCCCDDT;
            saveData[55] = $('#LoaiBienDongID').value();
            saveData[56] = $('#HoVaTenDT_us_CLD').value().toUpperCase();
            saveData[57] = $('#KinhDoCungLaoDong').value();
            saveData[58] = $('#ViDoCungLaoDong').value();
            var duongDan = ''; //Đính kèm chữ ký
            duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file');
            if (typeof duongDan != "undefined") {
                duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file') + '*'
            } else {
                duongDan = '';
            }
            saveData[59] = duongDan;
            var saveDataDT = [];
            saveDataDT[0] = tempthemDT;
            saveDataDT[1] = $('#DoiTuongID').value();
            saveDataDT[2] = $('#SelectChuHo_CLD_US').attr('value');
            saveDataDT[3] = $('#MoiQuanHeIDDT_CLD_US').value();
            saveDataDT[4] = $('#HoVaTenDT_us_CLD').value();
            saveDataDT[5] = $('#GioiTinh_us').value();
            saveDataDT[6] = $('#NgaySinh_us').value();
            saveDataDT[7] = $('#TinhID_NS_us').value();
            saveDataDT[8] = $('#DanTocID_us').value();
            saveDataDT[9] = $('#TonGiaoID_us').value();
            saveDataDT[10] = $('#QuocGiaID_us').value();
            saveDataDT[11] = $('#SoCMND_us').value();
            saveDataDT[12] = $('#NgayCapCCCD_us').value();
            saveDataDT[13] = $('#NoiCapCCCD_us_CLD').value();
            saveDataDT[14] = $('#SoNha_TT_us').value();
            saveDataDT[15] = $('#ThonID_TT_us').value();
            saveDataDT[16] = $('#XaID_TT_us').value();
            saveDataDT[17] = $('#HuyenID_TT_us').value();
            saveDataDT[18] = $('#TinhID_TT_us').value();
            saveDataDT[19] = $('#DiaChiThuongTruDT_us_CLD').value();
            saveDataDT[20] = $('#ThonID_HN_us').value();
            saveDataDT[21] = $('#XaID_HN_us').value();
            saveDataDT[22] = $('#HuyenID_HN_us').value();
            saveDataDT[23] = $('#TinhID_HN_us').value();
            saveDataDT[24] = $('#SoNha_HN_us').value();
            saveDataDT[25] = $('#DiaChiThuongTruHN_us').value();
            saveDataDT[26] = soCCCDDT;
            var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBienDong/LuuThongTinCungLaoDongBienDong', { data: saveData });
            if (!result.Err || !resultDT.Err) {
                if (result.Logs == "1") {
                    NTS.canhbao(result.Msg);
                    return false;
                } else if (result.Logs == "2") {
                    CanhBaoCapNhatDoiTuong(() => {
                        saveData[51] = "them";
                        var result2 = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBienDong/LuuThongTinCungLaoDongBienDong', { data: saveData });
                        var resultDT = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBienDong/LuuThongTinDoiTuong', { data: saveDataDT });
                        if (!result2.Err || !resultDT.Err) {
                            LoadDataTable();
                            NTS.thanhcong(result2.Msg);
                            $('#mdThemMoiCungLaoDongBanDau').modal('hide');
                            soCCCDDT = "";
                            mangGiaTriDau = [];
                            mangGiaTriSau = [];
                        }
                    }, () => { mangGiaTriSau = []; }, result.Msg);
                } else {
                    LoadDataTable();
                    NTS.thanhcong(result.Msg);
                    $('#mdThemMoiCungLaoDongBanDau').modal('hide');
                    soCCCDDT = "";
                    return false;
                }
            } else {
                result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            }
            return false;
        } else if (!different) {

            ////Xử lý lưu đính kèm
            //var dinhKem = '';
            //var dinhKem = $('.ace-file-container .ace-file-name').map(function () {
            //    return $(this).data('title');
            //}).get();
            var saveData = [];
            tempthemDT = 'them'; // đối tượng
            saveData[0] = tempthem;
            saveData[1] = $('#ThuThapCungLDID').value();
            saveData[2] = $('#NgayThuThap').value();
            saveData[3] = $('#DoiTuongUuTienID_us').value();
            saveData[4] = $('#TenDanToc_us').value();
            saveData[5] = $('#LoaiBHXH_us').value();
            saveData[6] = $('#chkBHYT_us').value();
            saveData[7] = $('#chkBHTN_us').value();
            saveData[8] = $('#MaSoBHXH_us').value();
            saveData[9] = $('#TinhID_TT_us').value();
            saveData[10] = $('#HuyenID_TT_us').value();
            saveData[11] = $('#XaID_TT_us').value();
            saveData[12] = $('#ThonID_TT_us').value();
            saveData[13] = $('#SoNha_TT_us').value();
            saveData[14] = $('#DiaChiThuongTruDT_us_CLD').value();
            saveData[15] = $('#TinhID_HN_us').value();
            saveData[16] = $('#HuyenID_HN_us').value();
            saveData[17] = $('#XaID_HN_us').value();
            saveData[18] = $('#ThonID_HN_us').value();
            saveData[19] = $('#SoNha_HN_us').value();
            saveData[20] = $('#DiaChiThuongTruHN_us').value();

            if (tempthem == 'them') {
                var data = uploadfileEvent({
                    name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                    loaiVB: 'VB',
                });
                if (data.length > 0) {
                    $('#txtDinhKem_VanBan_US').value(data);
                    NTS.dongthongbao();
                }
            }
            else {
                //if (newFile_usDangKy == true) {
                var data = uploadfileEvent({
                    name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                    loaiVB: 'VB',
                });
                if (data.length > 0) {
                    $('#txtDinhKem_VanBan_US').value(data);
                    NTS.dongthongbao();
                }
                //}
            }

            saveData[21] = $('#txtDinhKem_VanBan_US').value();// đính kèm
            saveData[22] = $('#TrinhDoPTID_us').value();
            saveData[23] = $('#TrinhDoCMKTID_us').value();
            saveData[24] = $('#LinhVucDaoTaoID_us').value();
            saveData[25] = $('#ChuyenNganhDTID_us').value();
            saveData[26] = $('#ViTheViecLamID_us').value();
            saveData[27] = $('#CongViecDangLamID_us').value();
            saveData[28] = $('#ViTriViecLamID_us').value();
            if ($('#chkKhongCoHDLD').value() == true) {
                saveData[29] = "0"; // Tình trạng ký hợp đồng lao động (0: Không ký HĐLĐ; 1: Có ký HĐLĐ
            } else if ($('#chkCoHDLD').value() == true) {
                saveData[29] = "1";
            } else {
                saveData[29] = "0";
            }
            saveData[30] = $('#NgayKy').value();
            saveData[31] = $('#LoaiHopDongLaoDongID').value();
            saveData[32] = $('#NoiLamViec').value();
            if ($('#LamViecTrongNuoc').value() == true) {
                saveData[33] = "0";
            } else if ($('#LamViecNuocNgoai').value() == true) { // 0: làm việc trong nước; 1: làm việc ngoài nước
                saveData[33] = "1";
            } else {
                saveData[33] = "0";
            }
            saveData[34] = $('#TinhID_NLV').value();
            saveData[35] = $('#HuyenID_NLV').value();
            saveData[36] = $('#XaID_NLV').value();
            saveData[37] = $('#ThonID_NLV').value();
            saveData[38] = $('#SoNha_NLV').value();
            saveData[39] = $('#LoaiHinhNLVID').value();
            saveData[40] = $('#QuocGiaID_us_NLV').value();
            saveData[41] = $('#DiaChiNoiLamViec').value();
            if ($('#chkChuaBaoGioLamViec').value() == true) {
                saveData[42] = "0";
            } else if ($('#chkDaTungLamViec').value() == true) {
                saveData[42] = "1";
            } else {
                saveData[42] = "2";
            }
            saveData[43] = $('#ThoiGianThatnghiep').value();
            saveData[44] = $('#CongViecTruocKhiThatNghiep').value();
            saveData[45] = $('#NguyenNhanKTGHDKTID').value();
            saveData[46] = $('#NhuCauDaoTaoViecLam').value();
            saveData[47] = $('#NguoiCungCapThongTin').value();
            saveData[48] = $('#SelectChuHo_CLD_US').attr('value');
            saveData[49] = $('#DoiTuongID').value();
            saveData[50] = $('#SoCMND_us').value();
            saveData[51] = tempthemDT;
            saveData[52] = $('#DoiTuongID').value();
            saveData[53] = $('#SelectChuHo_CLD_US').attr('value');
            saveData[54] = soCCCDDT;
            saveData[55] = $('#LoaiBienDongID').value();
            saveData[56] = $('#HoVaTenDT_us_CLD').value().toUpperCase();
            saveData[57] = $('#KinhDoCungLaoDong').value();
            saveData[58] = $('#ViDoCungLaoDong').value();
            var duongDan = ''; //Đính kèm chữ ký
            duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file');
            if (typeof duongDan != "undefined") {
                duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file') + '*'
            } else {
                duongDan = '';
            }
            saveData[59] = duongDan;
            var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBienDong/LuuThongTinCungLaoDongBienDong', { data: saveData });
            if (!result.Err) {
                if (result.Logs == "1") {
                    NTS.canhbao(result.Msg);
                    return false;
                } else {
                    LoadDataTable();
                    NTS.thanhcong(result.Msg);
                    $('#mdThemMoiCungLaoDongBanDau').modal('hide');
                    soCCCDDT = "";
                    mangGiaTriDau = [];
                    mangGiaTriSau = [];
                    return false;
                }
            } else {
                result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            }
            return false;
        }
    } else {
        tempthemDT = 'them'; // đối tượng
        var saveData = [];
        saveData[0] = tempthem;
        saveData[1] = $('#ThuThapCungLDID').value();
        saveData[2] = $('#NgayThuThap').value();
        saveData[3] = $('#DoiTuongUuTienID_us').value();
        saveData[4] = $('#TenDanToc_us').value();
        saveData[5] = $('#LoaiBHXH_us').value();
        saveData[6] = $('#chkBHYT_us').value();
        saveData[7] = $('#chkBHTN_us').value();
        saveData[8] = $('#MaSoBHXH_us').value();
        saveData[9] = $('#TinhID_TT_us').value();
        saveData[10] = $('#HuyenID_TT_us').value();
        saveData[11] = $('#XaID_TT_us').value();
        saveData[12] = $('#ThonID_TT_us').value();
        saveData[13] = $('#SoNha_TT_us').value();
        saveData[14] = $('#DiaChiThuongTruDT_us_CLD').value();
        saveData[15] = $('#TinhID_HN_us').value();
        saveData[16] = $('#HuyenID_HN_us').value();
        saveData[17] = $('#XaID_HN_us').value();
        saveData[18] = $('#ThonID_HN_us').value();
        saveData[19] = $('#SoNha_HN_us').value();
        saveData[20] = $('#DiaChiThuongTruHN_us').value();

        if (tempthem == 'them') {
            var data = uploadfileEvent({
                name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                loaiVB: 'VB',
            });
            if (data.length > 0) {
                $('#txtDinhKem_VanBan_US').value(data);
                NTS.dongthongbao();
            }
        }
        else {
            //if (newFile_usDangKy == true) {
            var data = uploadfileEvent({
                name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                loaiVB: 'VB',
            });
            if (data.length > 0) {
                $('#txtDinhKem_VanBan_US').value(data);
                NTS.dongthongbao();
            }
            //}
        }

        saveData[21] = $('#txtDinhKem_VanBan_US').value();// đính kèm
        saveData[22] = $('#TrinhDoPTID_us').value();
        saveData[23] = $('#TrinhDoCMKTID_us').value();
        saveData[24] = $('#LinhVucDaoTaoID_us').value();
        saveData[25] = $('#ChuyenNganhDTID_us').value();
        saveData[26] = $('#ViTheViecLamID_us').value();
        saveData[27] = $('#CongViecDangLamID_us').value();
        saveData[28] = $('#ViTriViecLamID_us').value();
        if ($('#chkKhongCoHDLD').value() == true) {
            saveData[29] = "0"; // Tình trạng ký hợp đồng lao động (0: Không ký HĐLĐ; 1: Có ký HĐLĐ
        } else if ($('#chkCoHDLD').value() == true) {
            saveData[29] = "1";
        } else {
            saveData[29] = "0";
        }
        saveData[30] = $('#NgayKy').value();
        saveData[31] = $('#LoaiHopDongLaoDongID').value();
        saveData[32] = $('#NoiLamViec').value();
        if ($('#LamViecTrongNuoc').value() == true) {
            saveData[33] = "0";
        } else if ($('#LamViecNuocNgoai').value() == true) { // 0: làm việc trong nước; 1: làm việc ngoài nước
            saveData[33] = "1";
        } else {
            saveData[33] = "0";
        }
        saveData[34] = $('#TinhID_NLV').value();
        saveData[35] = $('#HuyenID_NLV').value();
        saveData[36] = $('#XaID_NLV').value();
        saveData[37] = $('#ThonID_NLV').value();
        saveData[38] = $('#SoNha_NLV').value();
        saveData[39] = $('#LoaiHinhNLVID').value();
        saveData[40] = $('#QuocGiaID_us_NLV').value();
        saveData[41] = $('#DiaChiNoiLamViec').value();
        if ($('#chkChuaBaoGioLamViec').value() == true) {
            saveData[42] = "0";
        } else if ($('#chkDaTungLamViec').value() == true) {
            saveData[42] = "1";
        } else {
            saveData[42] = "2";
        }
        saveData[43] = $('#ThoiGianThatnghiep').value();
        saveData[44] = $('#CongViecTruocKhiThatNghiep').value();
        saveData[45] = $('#NguyenNhanKTGHDKTID').value();
        saveData[46] = $('#NhuCauDaoTaoViecLam').value();
        saveData[47] = $('#NguoiCungCapThongTin').value();
        saveData[48] = $('#SelectChuHo_CLD_US').attr('value');
        saveData[49] = $('#DoiTuongID').value();
        saveData[50] = $('#SoCMND_us').value();
        saveData[51] = tempthemDT;
        saveData[52] = $('#DoiTuongID').attr('value');
        saveData[53] = $('#SelectChuHo_CLD_US').attr('value');
        saveData[54] = soCCCDDT;
        saveData[55] = $('#LoaiBienDongID').value();
        saveData[56] = $('#HoVaTenDT_us_CLD').value().toUpperCase();

        saveData[56] = tempthemDT;
        saveData[57] = $('#DoiTuongID').value();
        saveData[58] = $('#SelectChuHo_CLD_US').attr('value');
        saveData[59] = $('#MoiQuanHeIDDT_CLD_US').value();
        saveData[60] = $('#HoVaTenDT_us_CLD').value();
        saveData[61] = $('#GioiTinh_us').value();
        saveData[62] = $('#NgaySinh_us').value();
        saveData[63] = $('#TinhID_NS_us').value();
        saveData[64] = $('#DanTocID_us').value();
        saveData[65] = $('#TonGiaoID_us').value();
        saveData[66] = $('#QuocGiaID_us').value();
        saveData[67] = $('#SoCMND_us').value();
        saveData[68] = $('#NgayCapCCCD_us').value();
        saveData[69] = $('#NoiCapCCCD_us_CLD').value();
        saveData[70] = $('#SoNha_TT_us').value();
        saveData[71] = $('#ThonID_TT_us').value();
        saveData[72] = $('#XaID_TT_us').value();
        saveData[73] = $('#HuyenID_TT_us').value();
        saveData[74] = $('#TinhID_TT_us').value();
        saveData[75] = $('#DiaChiThuongTruDT_us_CLD').value();
        saveData[76] = $('#ThonID_HN_us').value();
        saveData[77] = $('#XaID_HN_us').value();
        saveData[78] = $('#HuyenID_HN_us').value();
        saveData[79] = $('#TinhID_HN_us').value();
        saveData[80] = $('#SoNha_HN_us').value();
        saveData[81] = $('#DiaChiThuongTruHN_us').value();
        saveData[82] = soCCCDDT;
        saveData[83] = $('#KinhDoCungLaoDong').value();
        saveData[84] = $('#ViDoCungLaoDong').value();
        var duongDan = ''; //Đính kèm chữ ký
        duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file');
        if (typeof duongDan != "undefined") {
            duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file') + '*'
        } else {
            duongDan = '';
        }
        saveData[85] = duongDan;
        var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBienDong/ThemMoiDoiTuongCungLaoDongBienDong', { data: saveData });
        if (!result.Err) {
            if (result.Logs == "1") {
                NTS.canhbao(result.Msg);
                return false;
            } else {
                LoadDataTable();
                NTS.thanhcong(result.Msg);
                $('#mdThemMoiCungLaoDongBanDau').modal('hide');
                soCCCDDT = "";
                mangGiaTriDau = [];
                mangGiaTriSau = [];
                return false;
            }
        } else {
            result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
        }
        return false;
    }
});

////-------------------Xóa dữ liệu cung lao động------------------//
function XoaDuLieuCungLaoDong(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'CungLaoDongID', ID: ID, TenBangHienTai: 'CungLaoDong', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBienDong/XoaDuLieuCungLaoDong', { id: ID });
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
    XoaDuLieuCungLaoDong(ID);
});


////-------------------Xuất dữ liệu cung lao động------------------//

$(document).on('click', '.btnInMau01', function () {
    var ID = $(this).attr('data');
    XuatMau01_TT01(ID);
});

$(document).on('click', '.btnInMau03 ', function () {
    var ID = $(this).attr('data');
    XuatMau03_TT11(ID);
});

async function XuatMau01_TT01(ID) {
    var data = await NTS.getAjaxAsync('/QuanLy/ThuThapCungLaoDongBienDong/XuatMau01', { id: ID });
    //window.open(data);
    try {
        $('#divNoiDung_us').attr("src", data.replace(".docx", ".pdf"));
        $('#modal_xemtruockhiin_us').modal('show');
        $('#modal_taifile_us').show();
        $('#modal_taifile2_us').hide();
    } catch (ex) {

    }
}

async function XuatMau03_TT11(ID) {
    var data = await NTS.getAjaxAsync('/QuanLy/ThuThapCungLaoDongBienDong/XuatMau03', { id: ID });
    //window.open(data);
    try {
        $('#divNoiDung_us').attr("src", data.replace(".docx", ".pdf"));
        $('#modal_xemtruockhiin_us').modal('show');
        $('#modal_taifile_us').show();
        $('#modal_taifile2_us').hide();
    } catch (ex) {

    }
}

//---------------------------------Thêm mới thông tin thu thập cung lao động biến động ---------------------------------
$(document).on('click', '#btnThemMoiBienDong', function () {
    getLocation();
    loadComBoLoaiBienDong();
    showModalThemMoiThuThap('them', '12', $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
});

//---------------------------------Sửa thông tin thu thập cung lao động biến động---------------------------------
$(document).on('click', '.btnSuaTTBienDong   ', function () {
    getLocation();
    loadComBoLoaiBienDong();
    var ID = $(this).attr('data');
    SuaDuLieuCungLaoDong(ID, $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
    $('#lblTieuDeThemMoiThuThapCung').text('Cập nhật thu thập Cung lao động biến động');
});

Grid1.on("rowDblClick", function (e, row) {
    getLocation();
    $('#ThuThapCungLDID').val(row.getData().CungLaoDongID);
    loadComBoLoaiBienDong();
    SuaDuLieuCungLaoDong(row.getData().CungLaoDongID, $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
    $('#lblTieuDeThemMoiThuThapCung').text('Cập nhật thu thập Cung lao động biến động');
});

//---------------------------------Xuất danh sách excel thông tin thu thập cung lao động biến động---------------------------------
$('#btnExport').on('click', async function () {
    var saveData = new Array();
    saveData[0] = $('#TinhID_TimKiem_us').value();
    saveData[1] = $('#HuyenID_TimKiem_us').value();
    saveData[2] = $('#XaID_TimKiem_us').value();
    saveData[3] = $('#ThonID_TimKiem_us').value();
    saveData[4] = $('#timKiem').value();
    saveData[5] = $('#TuNgay_TimKiem_US').value();
    saveData[6] = $('#DenNgay_TimKiem_US').value();
    saveData[7] = $('#HoGiaDinhID_TimKiem_us').value();
    var kq = await NTS.getAjaxAsync('/QuanLy/ThuThapCungLaoDongBienDong/XuatExcel_DSThuThapCungLaoDong', { data: saveData });
    if (!kq.Err) {
        window.open(kq);
    } else {
        NTS.loi(kq.Msg);
    }
});

//---------------------------------Lấy dữ liệu kinh độ, vĩ độ thu thập---------------------------------
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            // tọa độ người dùng: position.coords.latitude, position.coords.longitude
            $('#KinhDoCungLaoDong').value(position.coords.longitude);
            $('#ViDoCungLaoDong').value(position.coords.latitude);
        });
    }
}

/// Khi chọn đính kèm chữ ký mà chưa lưu thì xóa đính kèm khỏi server
$(document).on('click', '#btnDongModalCLD', function () {
    if ($('#txtDuongDanFileVB_tailieu_CLD').value() != "" && tempthem == "them") {
        let duongDan = $('#btnXoaChuKy').attr('data-url-file');
        let id = "";
        let bang = "";
        let cot = "";
        //xác định đang ở form nào
        id = $('#ThuThapCungLDID').value();
        bang = "CungLaoDong";
        cot = "CungLaoDongID";
        let result = NTS.getAjax('/DanhMuc/DungChung/XoaDinhKem', { ID: id, duongDan: duongDan, bangDk: bang, cotDk: cot, loai: '' });
        if (!result.Err) {
            //duongDan.parent('div').remove();
            $('#txtDuongDanFileVB_tailieu_CLD').value('');
        } else {
            NTS.loi(result.Msg);
        }
    }
});