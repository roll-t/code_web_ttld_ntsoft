var textDiaChi_defaut = "";
var tempthem = "them";
var tempthemDanhGia = "them";
var JSONDanhGia = "";
var danhGia = [];
var temSuaChuaLuu = false;
var tenBangThamChieu = "PhieuDKGTVL";
$(function () {
    LoadTimKiem();
    setTimeout(() => {
        LoadDataCombo();
    },100);
});
///-------------------Sua loi select------------///
var scrollModal = 0;
$('#mdThemMoi').on('scroll', function () {
    scrollModal = $(this).scrollTop();
});

$(document).on('click', '.select2', function () {
    if (scrollModal != 0) {
        var vitriHienThiDauTien = $('.select2-container.select2-container--default.select2-container--open:not(.select2)');
        vitriHienThiDauTien.css('top', scrollModal + parseInt(vitriHienThiDauTien.css('top').replace('px', '')));
    }
});

$(document).ready(function () {
    setTimeout(function () {
        PhanQuyenComBoDiaBan('TinhID_TimKiem_us', 'HuyenID_TimKiem_us', 'XaID_TimKiem_us', 'ThonID_TimKiem_us');
    }, 200);
    NTS.hienNgayDauNamLenTextbox('TuNgay_TimKiem_US');
    NTS.hienNgayCuoiNamLenTextbox('DenNgay_TimKiem_US');
    ThietLapCotTrenLuoi(tenBangThamChieu, Grid1); // thiết lập cột trên lưới
    //Định dạng nhập xxxx.xxx.xxx cho số điện thoại
    $('#SoDienThoai').on('input', function () {
        formatPhoneNumberNhap(this);
    });

    $('#SoDienThoai_NguoiDaiDien').on('input', function () {
        formatPhoneNumberNhap(this);
    });

    // Restrict input to numbers only
    $('#SoDienThoai').on('keydown', function (event) {
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
    $('#SoDienThoai_NguoiDaiDien').on('keydown', function (event) {
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

function LoadDataCombo() {
    NTS.loadDataCombo({
        name: '#QuyMoLaoDong',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_QuyMoLaoDong',
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#LoaiHinhDNID',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_LoaiHinhNoiLV',
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#NganhNgheKinhDoanhChinh',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_NganhSanXuatKinhDoanh',
        columns: 1,
        indexValue: 0,
        indexText: 1,
        showTatCa: !1,
    });
   
    /// Bước 2
    NTS.loadDataCombo({
        name: '#MaNgheCap1',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap1',
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
   
    NTS.loadDataCombo({
        name: '#GioiTinhID',
        ajaxUrl: '/DanhMuc/DungChung/GetGioiTinh_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#NoiCapCCCD_TinhID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCAllTinh_Combo',
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
        indexDefault: 3,
    });
    NTS.loadDataCombo({
        name: '#DoiTuongUuTienID',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_DoiTuongUuTien',
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#HinhThucTuyenDungID',
        ajaxUrl: '/DanhMuc/DungChung/GetHinhThucTuyenDung_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
  
    NTS.loadDataCombo({
        name: '#TrinhDoHVID',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_TrinhDoGiaoDucPhoThong',
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#TrinhDoCMKTID,#TrinhDoCMKTID_Khac',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_TrinhDoCMKT',
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#ChuyenNganhDTID,#ChuyenNganhDaoID_Khac',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_ChuyenNganhDaoTao',
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#TrinhDoKyNangNgheID',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_TrinhDoKyNangNghe',
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#KyNangMemID',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_TrinhDoKNMem',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#TrinhDoNgoaiNguID1,#TrinhDoNgoaiNguID2',
        ajaxUrl: '/DanhMuc/DungChung/GetTrinhDoNgoaiNgu_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#TinHocVP,#TinHocKhac',
        ajaxUrl: '/DanhMuc/DungChung/GetTrinhDoTinHoc_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#YeuCauKinhNghiemID',
        ajaxUrl: '/DanhMuc/DungChung/GetYeuCauKinhNghiem_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#YeuCauLamThemID',
        ajaxUrl: '/DanhMuc/DungChung/GetYeuCauThem_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#DangKyDichVuID',
        ajaxUrl: '/DanhMuc/DungChung/GetDichVuDK_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        showTatCa: !1,
    });
    NTS.loadDataCombo({
        name: '#BacID',
        ajaxUrl: '/DanhMuc/DungChung/GetBac_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#CheDoPhucLoiID',
        ajaxUrl: '/DanhMuc/DungChung/GetCheDoPhucLoi_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#ChucVuID',
        ajaxUrl: '/DanhMuc/DungChung/GetChucVu_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#TinhID_NoiLamViecDuKien,#TinhID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCTinh_Combo',
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#HuyenID_NoiLamViecDuKien',
        ajaxUrl: '/DanhMuc/DungChung/GetHuyenNoiLamViec_Combo',
        ajaxParam: { id: $('#TinhID_NoiLamViecDuKien').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#MaNgheCap2',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap2',
        ajaxParam: { id: '' },
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#MaNgheCap3',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap3',
        ajaxParam: { id: '' },
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#MaNgheCap4',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap4',
        ajaxParam: { id:''},
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#LoaiHopDongID',
        ajaxUrl: '/DanhMuc/DungChung/GetLoaiHopDong_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#HinhThucLamViecID',
        ajaxUrl: '/DanhMuc/DungChung/GetHinhThucLV_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#MucDichLamViecID',
        ajaxUrl: '/DanhMuc/DungChung/GetMucDichLV_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#MucLuongID',
        ajaxUrl: '/DanhMuc/DungChung/GetMucLuong_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    //Điều kiên làm việc
    NTS.loadDataCombo({
        name: '#NoiLamViecID',
        ajaxUrl: '/DanhMuc/DungChung/GetNoiLamViec_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#TrongLuongNangID',
        ajaxUrl: '/DanhMuc/DungChung/GetTrongLuongNang_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#DiDungID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiDung_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#NgheNoiID',
        ajaxUrl: '/DanhMuc/DungChung/GetNgheNoi_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#ThiLucID',
        ajaxUrl: '/DanhMuc/DungChung/GetThiLuc_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#ThaoTacTayID',
        ajaxUrl: '/DanhMuc/DungChung/GetThaoTacTay_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#Dung2TayID',
        ajaxUrl: '/DanhMuc/DungChung/GetDungHaiTay_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#MongMuonDN',
        ajaxUrl: '/DanhMuc/DungChung/GetMongMuonDN_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
}

function loadComboDiaBan() {
    NTS.loadDataCombo({
        name: '#HuyenID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#XaID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#ThonID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
}

//-----------------------Change tỉnh nơi làm việc-------------------------//
$(document).on('change', '#TinhID_NoiLamViecDuKien', function () {
    NTS.loadDataCombo({
        name: '#HuyenID_NoiLamViecDuKien',
        ajaxUrl: '/DanhMuc/DungChung/GetHuyenNoiLamViec_Combo',
        ajaxParam: { id: $('#TinhID_NoiLamViecDuKien').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
});
//-----------------------Change mã nghề-------------------------//
$(document).on('change', '#MaNgheCap1', function () {
    NTS.loadDataCombo({
        name: '#MaNgheCap2',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap2',
        ajaxParam: { id: $('#MaNgheCap1').value() },
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#MaNgheCap3',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap3',
        ajaxParam: { id: '' },
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#MaNgheCap4',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap4',
        ajaxParam: { id: '' },
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
});

$(document).on('change', '#MaNgheCap2', function () {
    NTS.loadDataCombo({
        name: '#MaNgheCap3',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap3',
        ajaxParam: { id: $('#MaNgheCap2').value() },
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#MaNgheCap4',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap4',
        ajaxParam: { id: '' },
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
});
$(document).on('change', '#MaNgheCap3', function () {
    NTS.loadDataCombo({
        name: '#MaNgheCap4',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap3',
        ajaxParam: { id: $('#MaNgheCap3').value() },
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
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
    }, 100);
}
//-----------------------Change bộ lọc tìm kiếm-------------------------//
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

function actionDropdownFormatter(cell, formatterParams, onRendered) {
    var ID = cell.getData().PhieuDKGTVLID;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
       <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
       <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
           <a class="dropdown-item btnXemTT " href="#" data="${ID}" style="display:none;">
                <i class="fa fa-eye text-info" aria-hidden="true" style="paddding-right:10px;"></i>&ensp;  Xem thông tin phiếu tìm việc
           </a>
            
           <a  class="dropdown-item btnSuaTT  " href="#" data="${ID}">
                <i class="fa fa-pencil text-warning" aria-hidden="true"></i>&ensp;  Chỉnh sửa phiếu tìm việc
           </a>
            <a  class="dropdown-item btnXoaTT" href="#" data="${ID}">
                <i class='fa fa-trash-o  text-danger'></i>&ensp;  Xóa phiếu tìm việc
           </a>
           <a  class="dropdown-item btnInPhieuThuThap" href="#" data="${ID}" style="display: block;">
                    <i class='fa-solid fa-print' style="color: var(--tbl-btn-luuvadong) !important;"></i>&ensp;  In mẫu đăng ký tìm <i class="fa-solid fa-angle-right " style="float: right;margin-top: 5px;"></i>
               </a>
               
               <div id="hoverBox_CLD">
                    <a  class="dropdown-item btnInMau03 " href="#" data="${ID}">
                        In mẫu số 03/PLI Nghị định 23/2021/NĐ-CP
                   </a>
                    <a class="dropdown-item btnInMau03a " href="#" data="${ID}">
                        In mẫu số 03a/PLI Nghị định 23/2021/NĐ-CP
                   </a>                   
                </div>
       </div>
       </div>`;

    return select;
}

var fmDangKyDV = function (cell) {
    var ID = cell.getData().PhieuDKGTVLID;
    var DangKyDV = cell.getValue();
    if (DangKyDV == ";") {
        return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;"></p>
                    </div>`;
    }
    if (DangKyDV != "") {
        if (DangKyDV.length > 40) {
            DangKyDV = DangKyDV.substring(0, 30) + "...";
            return `
                        <div class="col-md-12" style="padding-right: 0px; padding-left: 0px; padding-bottom:4px;">
                            <div class="Content-text">${DangKyDV}<span class='btnXemThemDangKyDV' style='color:var(--tblr-primary);'  title="Xem chi tiết ngành nghề kinh doanh chính" data='${ID}' data-loai='TC'>Xem thêm</span></div>
                        </div>`;
        } else {
            return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${DangKyDV}</p>
                    </div>`;
        }
    } else {
        return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${DangKyDV}</p>
                    </div>`;
    }
}

//-------------------Grid phiếu đăng ký tìm việc làm---------------//
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
        { title: "Mã số", field: "MaSo", formatter: 'textarea', width: 150, vertAlign: "middle", headerHozAlign: "center", hozAlign: "left" },
        { title: "Ngày thu thập", field: "NgayThuThap", formatter: 'textarea', width: 120, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center" },
        { title: "Tên tổ chức", field: "TenToChuc", formatter: 'textarea', minWidth: 350, vertAlign: "middle", headerHozAlign: "center", hozAlign: "left" },
        { title: "Mã số thuế/CCCD/CMND", field: "MaSoThue", formatter: 'textarea', vertAlign: "middle", minWidth: 150, headerHozAlign: "center", hozAlign: "left"},
        { title: "Loại hình doanh nghiệp", field: "TenLoaiHinhDN", formatter: 'textarea', vertAlign: "middle", minWidth: 200, headerHozAlign: "center", hozAlign: "left"},
        { title: "Số điện thoại", field: "SoDienThoai", formatter: 'textarea', vertAlign: "middle", minWidth: 150, headerHozAlign: "center", hozAlign: "left" },
        { title: "Email", field: "Email", formatter: 'textarea', vertAlign: "middle", minWidth: 200, headerHozAlign: "center", hozAlign: "left" },
        { title: "Địa chỉ", field: "DiaChiCuThe", formatter: 'textarea', minWidth: 300, vertAlign: "middle", headerHozAlign: "center", hozAlign: "left"},
        { title: "Thời hạn tuyển dụng", field: "ThoiHanTuyenDung", formatter: 'textarea', minWidth: 120, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center" },
        { title: "Đăng ký dịch vụ", field: "TenDKDVTuVan", formatter: fmDangKyDV, vertAlign: "middle", minWidth: 250, headerHozAlign: "center", hozAlign: "left"},
        { title: "PhieuDKGTVLID", field: "PhieuDKGTVLID", width: 0, visible: false }
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
    saveData[7] = $('#TenToChuc_TimKiem_US').value();
    saveData[8] = $('#MaSoThue_TimKiem_US').value();
    Grid1.clearData();
    const GetAll = await NTS.getAjaxAsync("/QuanLy/PhieuDangKyCungUngLaoDong/GetAll", { data: saveData });
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
        Grid1.redraw(1);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.thongbaoloi(GetAll.Msg);
    GridKhongCoDuLieu("Grid1");
}

//TimKiem//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiem', async function () {
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

// Xem chi tiết nội dung ghi chú hộ gia đình
$(document).on('click', '.btnXemThemDangKyDV', function () {
    $('#PhieuDKGTVLID').val($(this).attr('data'));
    XemChiTietbtnXemThemDangKyDV($(this).attr('data'));
});

function XemChiTietbtnXemThemDangKyDV(ID) {
    $("#mdXemThem").modal('show');
    $('#tieuDeModalCT').text('Chi tiết nội dung đăng ký dịch vụ');
    const result = NTS.getAjax("/QuanLy/PhieuDangKyCungUngLaoDong/DangKyDichVuCT", { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        let tenDangKyDV = data.TenDKDVTuVan;

        // Tách chuỗi thành các phần tử dựa trên dấu phẩy và khoảng trắng
        let DangKyDVArray = tenDangKyDV.split(';').map(item => item.trim()).filter(item => item);

        // Tạo HTML với mỗi phần tử trên một dòng
        let htmlContent = DangKyDVArray.map(item => `- ${item};`).join('<br>');

        $('#NoiDungGhiChu_CT').html(htmlContent);
    } else {
        $('#NoiDungGhiChu_CT').html("Chưa có dữ liệu");
    }
    return;
}

//---------------------------------Thêm mới phiếu đăng ký tìm việc làm---------------------------------
$(document).on('click', '#btnThemMoi', function () {
    $('#mdThemMoi').modal('show');
    resetForm("#mdThemMoi");
    resetForm('#mdThemMoiViecLamMongMuon');
    NTS.hienNgayHienTaiLenTextbox('NgayDangKy');
    NTS.hienNgayHienTaiLenTextbox('NgayDangKyViecLam');
    setTimeout(() => {
        loadComboDiaBan();
    }, 200);
    var item = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn tổ chức- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
    $('.btn-select-tochuc').html(item);
    $('.btn-select-tochuc').attr('value', '');
    LoadDataTableDanhGia('');
});
//-----------------------Change Hộ khẩu thường trú trong form thêm, sửa-------------------------//
$(document).on('change', '#TinhID', function () {
    NTS.loadDataCombo({
        name: '#HuyenID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
        ajaxParam: { id: $('#TinhID').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#XaID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: '' },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#ThonID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    //Change địa chỉ
    var DiaChi = $('#SoNha').value().trim();
    if (DiaChi != '') {
        DiaChi = DiaChi + ', ';
    }
    var txtTinh = $('#TinhID');
    var txtHuyen = $('#HuyenID');
    var txtXa = $('#XaID');
    var txtThon = $('#ThonID');

    if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
        if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
            if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                    $('#DiaChiDoanhNghiep').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                } else {
                    $('#DiaChiDoanhNghiep').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }
            } else {
                $('#DiaChiDoanhNghiep').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
            }
        } else {
            $('#DiaChiDoanhNghiep').value(DiaChi + txtTinh.select2('data')[0].text1);
        }
    } else {
        if (DiaChi != '') {
            $('#DiaChiDoanhNghiep').value(DiaChi);
        }
        else {
            $('#DiaChiDoanhNghiep').value(textDiaChi_defaut);
        }

    }
});
$(document).on('change', '#HuyenID', function () {
    NTS.loadDataCombo({
        name: '#XaID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: $('#HuyenID').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#ThonID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    //Change địa chỉ
    var DiaChi = $('#SoNha').value().trim();
    if (DiaChi != '') {
        DiaChi = DiaChi + ', ';
    }
    var txtTinh = $('#TinhID');
    var txtHuyen = $('#HuyenID');
    var txtXa = $('#XaID');
    var txtThon = $('#ThonID');

    if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
        if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
            if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                    $('#DiaChiDoanhNghiep').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                } else {
                    $('#DiaChiDoanhNghiep').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }
            } else {
                $('#DiaChiDoanhNghiep').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
            }
        } else {
            $('#DiaChiDoanhNghiep').value(DiaChi + txtTinh.select2('data')[0].text1);
        }
    } else {
        if (DiaChi != '') {
            $('#DiaChiDoanhNghiep').value(DiaChi);
        }
        else {
            $('#DiaChiDoanhNghiep').value(textDiaChi_defaut);
        }

    }
});
$(document).on('change','#XaID', function () {
    NTS.loadDataCombo({
        name: '#ThonID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: $('#XaID').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    //Change địa chỉ
    var DiaChi = $('#SoNha').value().trim();
    if (DiaChi != '') {
        DiaChi = DiaChi + ', ';
    }
    var txtTinh = $('#TinhID');
    var txtHuyen = $('#HuyenID');
    var txtXa = $('#XaID');
    var txtThon = $('#ThonID');

    if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
        if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
            if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                    $('#DiaChiDoanhNghiep').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                } else {
                    $('#DiaChiDoanhNghiep').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }
            } else {
                $('#DiaChiDoanhNghiep').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
            }
        } else {
            $('#DiaChiDoanhNghiep').value(DiaChi + txtTinh.select2('data')[0].text1);
        }
    } else {
        if (DiaChi != '') {
            $('#DiaChiDoanhNghiep').value(DiaChi);
        }
        else {
            $('#DiaChiDoanhNghiep').value(textDiaChi_defaut);
        }

    }
});

$(document).on('change', '#ThonID', function () {
    //Change địa chỉ
    var DiaChi = $('#SoNha').value().trim();
    if (DiaChi != '') {
        DiaChi = DiaChi + ', ';
    }
    var txtTinh = $('#TinhID');
    var txtHuyen = $('#HuyenID');
    var txtXa = $('#XaID');
    var txtThon = $('#ThonID');

    if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
        if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
            if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                    $('#DiaChiDoanhNghiep').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                } else {
                    $('#DiaChiDoanhNghiep').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }
            } else {
                $('#DiaChiDoanhNghiep').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
            }
        } else {
            $('#DiaChiDoanhNghiep').value(DiaChi + txtTinh.select2('data')[0].text1);
        }
    } else {
        if (DiaChi != '') {
            $('#DiaChiDoanhNghiep').value(DiaChi);
        }
        else {
            $('#DiaChiDoanhNghiep').value(textDiaChi_defaut);
        }

    }
});

$('#SoNha').on('input', function () {
    //Change địa chỉ
    var DiaChi = $('#SoNha').value().trim();
    if (DiaChi != '') {
        DiaChi = DiaChi + ', ';
    }
    var txtTinh = $('#TinhID');
    var txtHuyen = $('#HuyenID');
    var txtXa = $('#XaID');
    var txtThon = $('#ThonID');

    if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
        if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
            if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                    $('#DiaChiDoanhNghiep').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                } else {
                    $('#DiaChiDoanhNghiep').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }
            } else {
                $('#DiaChiDoanhNghiep').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
            }
        } else {
            $('#DiaChiDoanhNghiep').value(DiaChi + txtTinh.select2('data')[0].text1);
        }
    } else {
        if (DiaChi != '') {
            $('#DiaChiDoanhNghiep').value(DiaChi);
        }
        else {
            $('#DiaChiDoanhNghiep').value(textDiaChi_defaut);
        }

    }

});

//-----------------------Change Mã nghề-------------------------//
$(document).on('change', '#MaNgheCap1', function () {
    NTS.loadDataCombo({
        name: '#MaNgheCap2',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap2',
        ajaxParam: { id: $('#MaNgheCap1').value() },
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#MaNgheCap3',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap3',
        ajaxParam: { id: $('#MaNgheCap2').value() },
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#MaNgheCap4',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap4',
        ajaxParam: { id: $('#MaNgheCap3').value() },
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
});

$(document).on('change', '#MaNgheCap2', function () {
    NTS.loadDataCombo({
        name: '#MaNgheCap3',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap3',
        ajaxParam: { id: $('#MaNgheCap2').value() },
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#MaNgheCap4',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap4',
        ajaxParam: { id: $('#MaNgheCap3').value() },
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
});
$(document).on('change', '#MaNgheCap3', function () {
    NTS.loadDataCombo({
        name: '#MaNgheCap4',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MaNgheCap4',
        ajaxParam: { id: $('#MaNgheCap3').value() },
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
});
//-----------------------Thay đổi trình độ ngoại ngữ 1-----------------------------------//
$(document).on('change', '#TrinhDoNgoaiNgu1_Tot', function () {
    if ($('#TrinhDoNgoaiNgu1_Tot').value() == true) {
        $('#TrinhDoNgoaiNgu1_Kha').value(0);
        $('#TrinhDoNgoaiNgu1_TrungBinh').value(0);
    } else {

    }
})
$(document).on('change', '#TrinhDoNgoaiNgu1_Kha', function () {
    if ($('#TrinhDoNgoaiNgu1_Kha').value() == true) {
        $('#TrinhDoNgoaiNgu1_Tot').value(0);
        $('#TrinhDoNgoaiNgu1_TrungBinh').value(0);
    } else {

    }
})
$(document).on('change', '#TrinhDoNgoaiNgu1_TrungBinh', function () {
    if ($('#TrinhDoNgoaiNgu1_TrungBinh').value() == true) {
        $('#TrinhDoNgoaiNgu1_Tot').value(0);
        $('#TrinhDoNgoaiNgu1_Kha').value(0);
    } else {

    }
})
$(document).on('change', '#TrinhDoNgoaiNguID1', function () {
    if ($('#select2-TrinhDoNgoaiNguID1-container').text() == '-Chọn-') {
        $('#TrinhDoNgoaiNgu1_Tot').value(0);
        $('#TrinhDoNgoaiNgu1_Kha').value(0);
        $('#TrinhDoNgoaiNgu1_TrungBinh').value(0);
    } else {

    }
})
////-----------------------Thay đổi trình độ ngoại ngữ 2-----------------------------------//
$(document).on('change', '#TrinhDoNgoaiNgu2_Tot', function () {
    if ($('#TrinhDoNgoaiNgu2_Tot').value() == true) {
        $('#TrinhDoNgoaiNgu2_Kha').value(0);
        $('#TrinhDoNgoaiNgu2_TrungBinh').value(0);
    } else {

    }
})
$(document).on('change', '#TrinhDoNgoaiNgu2_Kha', function () {
    if ($('#TrinhDoNgoaiNgu2_Kha').value() == true) {
        $('#TrinhDoNgoaiNgu2_Tot').value(0);
        $('#TrinhDoNgoaiNgu2_TrungBinh').value(0);
    } else {

    }
})
$(document).on('change', '#TrinhDoNgoaiNgu2_TrungBinh', function () {
    if ($('#TrinhDoNgoaiNgu2_TrungBinh').value() == true) {
        $('#TrinhDoNgoaiNgu2_Tot').value(0);
        $('#TrinhDoNgoaiNgu2_Kha').value(0);
    } else {

    }
})
$(document).on('change', '#TrinhDoNgoaiNguID2', function () {
    if ($('#select2-TrinhDoNgoaiNguID2-container').text() == '-Chọn-') {
        $('#TrinhDoNgoaiNgu2_Tot').value(0);
        $('#TrinhDoNgoaiNgu2_Kha').value(0);
        $('#TrinhDoNgoaiNgu2_TrungBinh').value(0);
    } else {

    }
})
////-----------------------Thay đổi trình độ tin học văn phòng-----------------------------------//
$(document).on('change', '#TinHocVP_Tot', function () {
    if ($('#TinHocVP_Tot').value() == true) {
        $('#TinHocVP_Kha').value(0);
        $('#TinHocVP_TrungBinh').value(0);
    } else {

    }
})
$(document).on('change', '#TinHocVP_Kha', function () {
    if ($('#TinHocVP_Kha').value() == true) {
        $('#TinHocVP_Tot').value(0);
        $('#TinHocVP_TrungBinh').value(0);
    } else {

    }
})
$(document).on('change', '#TinHocVP_TrungBinh', function () {
    if ($('#TinHocVP_TrungBinh').value() == true) {
        $('#TinHocVP_Tot').value(0);
        $('#TinHocVP_Kha').value(0);
    } else {

    }
})
$(document).on('change', '#TinHocVP', function () {
    if ($('#select2-TinHocVP-container').text() == '-Chọn-') {
        $('#TinHocVP_TrungBinh').value(0);
        $('#TinHocVP_Tot').value(0);
        $('#TinHocVP_Kha').value(0);
    } else {

    }
})
////-----------------------Thay đổi trình độ tin học khác-----------------------------------//
$(document).on('change', '#TinHocKhac_Tot', function () {
    if ($('#TinHocKhac_Tot').value() == true) {
        $('#TinHocKhac_Kha').value(0);
        $('#TinHocKhac_TrungBinh').value(0);
    } else {

    }
})
$(document).on('change', '#TinHocKhac_Kha', function () {
    if ($('#TinHocKhac_Kha').value() == true) {
        $('#TinHocKhac_Tot').value(0);
        $('#TinHocKhac_TrungBinh').value(0);
    } else {

    }
})
$(document).on('change', '#TinHocKhac_TrungBinh', function () {
    if ($('#TinHocKhac_TrungBinh').value() == true) {
        $('#TinHocKhac_Tot').value(0);
        $('#TinHocKhac_Kha').value(0);
    } else {

    }
})
$(document).on('change', '#TinHocKhac', function () {
    if ($('#select2-TinHocKhac-container').text() == '-Chọn-') {
        $('#TinHocKhac_TrungBinh').value(0);
        $('#TinHocKhac_Tot').value(0);
        $('#TinHocKhac_Kha').value(0);
    } else {

    }
})
//------------------------------------------------//

$(document).on('change', '#TrinhDoCMKTID', function () {
    //ràng buộc lĩnh vực và chuyên ngành đào tạo khi từ sơ cấp trở lên
    if (($('#select2-TrinhDoCMKTID-container').text().search('Đại học') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Sơ cấp') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Trung cấp') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Cao đẳng') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Thạc sĩ') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Tiến sĩ') != -1)) {
        $('#lbChuyenNganhDTID').addClass('validation')
        $('#ChuyenNganhDTID').prop('required', true);

    } else {
        $('#lbChuyenNganhDTID').removeClass('validation')
        $('#ChuyenNganhDTID').prop('required', false);
    }
    RangBuocLinhVucVaChuyenNganhTheoCMKT()
})

function RangBuocLinhVucVaChuyenNganhTheoCMKT() {
    var resultTinhTrang = NTS.getAjax('/DanhMuc/DungChung/KiemTraTrinhDoCMKT', { value: $('#TrinhDoCMKTID').value() });
    if (resultTinhTrang.split("_")[0] == "1") {
        $('#ChuyenNganhDTID').prop('disabled', true)
        $('#ChuyenNganhDTID').value("");
        $('#ChuyenNganhDTID').prop('required', false);
    } else {
        $('#ChuyenNganhDTID').prop('disabled', false)
    }
}

$(document).on('select2:select', '#TrinhDoCMKTID', function () {
    if ((($('#select2-TrinhDoCMKTID-container').text().search('Trung cấp') != -1)
        && ($('#select2-TrinhDoHVID-container').text().search('THCS') == -1
        && $('#select2-TrinhDoHVID-container').text().search('THPT') == -1))) {
        $('#TrinhDoCMKTID').value('');
        NTS.canhbao("Trình độ GDPT từ Tốt nghiệp THCS trở lên mới học được trung cấp!");
        return;
    }
    if ((($('#select2-TrinhDoCMKTID-container').text().search('Đại học') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Cao đẳng') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Thạc sĩ') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Tiến sĩ') != -1)
        && ($('#select2-TrinhDoHVID-container').text().search('THPT') == -1))) {
        $('#TrinhDoCMKTID').value('');
        NTS.canhbao("Trình độ GDPT từ Tốt nghiệp THPT mới học được cao đẳng, đại học, thạc sĩ, tiến sĩ!");
        return;
    }
});

$(document).on('select2:select', '#TrinhDoHVID', function () {
    if ((($('#select2-TrinhDoCMKTID-container').text().search('Trung cấp') != -1)
        && ($('#select2-TrinhDoHVID-container').text().search('Tốt nghiệp THCS') == -1
        && $('#select2-TrinhDoHVID-container').text().search('Tốt nghiệp THPT') == -1))) {
        $('#TrinhDoCMKTID').value('');
        NTS.canhbao("Trình độ GDPT từ Tốt nghiệp THCS trở lên mới học được trung cấp!");
        return;
    }
    if ((($('#select2-TrinhDoCMKTID-container').text().search('Đại học') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Cao đẳng') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Thạc sĩ') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Tiến sĩ') != -1)
        && ($('#select2-TrinhDoHVID-container').text().search('Tốt nghiệp THPT') == -1))) {
        $('#TrinhDoCMKTID').value('');
        NTS.canhbao("Trình độ GDPT từ Tốt nghiệp THPT mới học được cao đẳng, đại học, thạc sĩ, tiến sĩ!");
        return;
    }

});

// Hàm để chuyển đổi chuỗi định dạng dd/mm/yyyy thành đối tượng Date
function parseDate(input) {
    var parts = input.split('/');
    // parts[0] là ngày, parts[1] là tháng, parts[2] là năm
    return new Date(parts[2], parts[1] - 1, parts[0]); // Lưu ý: Tháng trong Date() bắt đầu từ 0 (tháng 1 là 0)
}

//---------------------------------Form bước 2---------------------------------
$(document).on('click', '#btnTiepTuc_ViecMongMuon', function () {
    const validate = new NTSValidate('#mdThemMoi');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }
    if ($('#SoCCCD').val() != "") {
        if ($('#SoCCCD').val().length !== 12 && $('#SoCCCD').val().length !== 9) {
            NTS.canhbao("Số CMND/CCCD/Số định danh cá nhân chưa đúng định dạng!");
            return false;
        }
    }
    if ($('#SoDienThoai').value() != "") {
        if ($('#SoDienThoai').value().length < 12) {
            NTS.canhbao("Số điện thoại chưa đúng định dạng!");
            return false;
        }
    }

    // Kiểm tra ngày tháng năm của ngày cấp không được lớn hơn ngày hết hạn
    var ngayDangKy = parseDate($('#NgayDangKy').value());
    var ngayHetHan = parseDate($('#HanNop').value());

    if (ngayDangKy >= ngayHetHan) {
        NTS.canhbao("Hạn nộp không được lớn hơn hoặc bằng ngày đăng ký!");
        return false;
    }

    if ($('#SelectToChuc_US').attr('value') == "") {
        NTS.canhbao("Tổ chức không được bỏ trống!");
        return false;
    }

    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#PhieuDKGTVLID').value();
    saveData[2] = $('#MaSo').value();
    saveData[3] = $('#NgayDangKy').value();
    saveData[4] = $('#NamTronKCN').value();
    saveData[5] = $('#LaCaNhanTuyenDung').value();
    saveData[6] = $('#LoaiHinhDNID').value();
    saveData[7] = $('#MaSoThue').value();
    saveData[8] = $('#TenKCN').value();
    saveData[9] = $('#TenNguoiSuDungLaoDong').value();
    saveData[10] = $('#SoCCCD').value();
    saveData[11] = $('#TinhID').value();
    saveData[12] = $('#HuyenID').value();
    saveData[13] = $('#XaID').value();
    saveData[14] = $('#ThonID').value();
    saveData[15] = $('#SoNha').value();
    saveData[16] = $('#DiaChiDoanhNghiep').value();
    saveData[17] = $('#SoDienThoai').value();
    saveData[18] = $('#Email').value();
    saveData[19] = JSON.stringify($('#NganhNgheKinhDoanhChinh').value());
    saveData[20] = $('#QuyMoLaoDong').value();
    saveData[21] = $('#SanPhamChinh').value();
    saveData[22] = $('#HanNop').value();
    saveData[23] = $('#HoVaTen_NguoiDaiDien').value();
    saveData[24] = $('#ChuVu_NguoiDaiDien').value();
    saveData[25] = $('#SoDienThoai_NguoiDaiDien').value();
    saveData[26] = $('#HinhThucLienHe_NguoiDaiDien').value();
    saveData[27] = JSON.stringify($('#DangKyDichVuID').value());
    saveData[28] = $('#DangKyDichVuKhac').value();
    saveData[29] = $('#SelectToChuc_US').attr('value');
    var result = NTS.getAjax('/QuanLy/PhieuDangKyCungUngLaoDong/LuuThongTin', { data: saveData });
    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        $('#PhieuDKGTVLID').value(result.Result[0].PhieuDKGTVLID);
        $('#MaSoDangKVL').value(result.Result[0].MaSo);
        $('#mdThemMoi').modal('hide');
        $('#mdThemMoiViecLamMongMuon').modal('show');
        if (temSuaChuaLuu == true) {
            tempthemDanhGia = 'them';
        }
        if (danhGia.length > 0) {
            var saveDataDanhGia = new Array();
            saveDataDanhGia[0] = tempthemDanhGia;
            saveDataDanhGia[1] = JSONDanhGia;
            saveDataDanhGia[2] = $('#PhieuDKGTVLID').value();
            var result = NTS.getAjax('/QuanLy/PhieuDangKyCungUngLaoDong/LuuThongTinDanhGia', { data: saveDataDanhGia });
            if (!result.Err) {
                danhGia = [];
                temSuaChuaLuu == false;
            } else {
                result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            }
            return false;
        }
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});


function removeDiacritics(str) {
    var diacriticsMap = {
        'a': 'áàảạãâấầẩậẫăắằẳặẵÁÀẢẠÃÂẤẦẨẬẪĂẮẰẲẶẴ',
        'e': 'éèẻẹẽêếềểệễÉÈẺẸẼÊẾỀỂỆỄ',
        'i': 'íìỉịĩÍÌỈỊĨ',
        'o': 'óòỏọõôốồổộỗơớờởợỡÓÒỎỌÕÔỐỒỔỘỖƠỚỜỞỢỠ',
        'u': 'úùủụũưứừửựữÚÙỦỤŨƯỨỪỬỰỮ',
        'y': 'ýỳỷỵỹÝỲỶỴỸ',
        'd': 'đĐ'
    };
    for (var char in diacriticsMap) {
        var regex = new RegExp('[' + diacriticsMap[char] + ']', 'g');
        str = str.replace(regex, char);
    }
    return str;
}
function generateSlug(phrase) {
    var str = removeDiacritics(phrase).toLowerCase();
    str = str.replace(/\s+/g, '-'); // Thay thế khoảng trắng bằng dấu gạch ngang
    str = str.replace(/[^a-z0-9-]/g, ''); // Loại bỏ các ký tự đặc biệt
    str = str.replace(/-+/g, '-'); // Loại bỏ các dấu gạch ngang thừa
    return str.trim('-');
}
$('#TenCongViec').on('change', function () {
    var DinhDanh = generateSlug($('#TenCongViec').value());
    $('#TenDinhDanh').value('');
    $('#TenDinhDanh').value(DinhDanh);
});
//---------------------------------Kết thúc---------------------------------
$(document).on('click', '#btnKetThuc', function () {
    const validate = new NTSValidate('#mdThemMoiViecLamMongMuon');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }
    // Kiểm tra ngày tháng năm của ngày cấp không được lớn hơn ngày hết hạn
    var ngayDangKy = parseDate($('#NgayDangKyViecLam').value());
    var ngayHetHan = parseDate($('#NgayHetHan').value());

    if (ngayDangKy >= ngayHetHan) {
        NTS.canhbao("Ngày hết hạn không được lớn hơn hoặc bằng ngày đăng ký!");
        return false;
    }

    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#MaSoDangKVL').value();
    saveData[2] = $('#NgayDangKyViecLam').value();
    saveData[3] = $('#TenCongViec').value();
    saveData[4] = $('#SoLuongTuyen').value();
    saveData[5] = $('#MoTaCongViec').value();
    saveData[6] = $('#ChucVuID').value();
    saveData[7] = $('#ChucVuKhac').value();
    saveData[8] = $('#MaNgheCap1').value();
    saveData[9] = $('#MaNgheCap2').value();
    saveData[10] = $('#MaNgheCap3').value();
    saveData[11] = $('#MaNgheCap4').value();
    saveData[12] = $('#TrinhDoHVID').value();
    saveData[13] = $('#TrinhDoCMKTID_Khac').value();
    saveData[14] = $('#TrinhDoCMKTID').value();
    saveData[15] = $('#TrinhDoKyNangNgheID').value();
    saveData[16] = $('#ChuyenNganhDTID').value();
    saveData[17] = $('#BacID').value();
    saveData[18] = $('#TrinhDoNgoaiNguID1').value();
    saveData[19] = $('#ChungChiNgoaiNgu1').value();
    var DanhGiaNgoaiNgu1;
    if ($('#TrinhDoNgoaiNgu1_Kha').value() == true) {
        DanhGiaNgoaiNgu1 = "2";
    } else if ($('#TrinhDoNgoaiNgu1_Tot').value() == true) {
        DanhGiaNgoaiNgu1 = "1";
    } else if ($('#TrinhDoNgoaiNgu1_TrungBinh').value() == true) {
        DanhGiaNgoaiNgu1 = "3";
    } else {
        DanhGiaNgoaiNgu1 = "0";
    }
    saveData[20] = DanhGiaNgoaiNgu1;
    saveData[21] = $('#TinHocVP').value();
    var DanhGiaTinHoc1;
    if ($('#TinHocVP_Tot').value() == true) {
        DanhGiaTinHoc1 = "1";
    } else if ($('#TinHocVP_Kha').value() == true) {
        DanhGiaTinHoc1 = "2";
    } else if ($('#TinHocVP_TrungBinh').value() == true) {
        DanhGiaTinHoc1 = "3";
    } else {
        DanhGiaTinHoc1 = "0";
    }
    saveData[22] = DanhGiaTinHoc1;
    saveData[23] = $('#TrinhDoNgoaiNguID2').value();
    saveData[24] = $('#ChungChiNgoaiNgu2').value();
    var DanhGiaNgoaiNgu2;
    if ($('#TrinhDoNgoaiNgu2_Kha').value() == true) {
        DanhGiaNgoaiNgu2 = "2";
    } else if ($('#TrinhDoNgoaiNgu2_Tot').value() == true) {
        DanhGiaNgoaiNgu2 = "1";
    } else if ($('#TrinhDoNgoaiNgu2_TrungBinh').value() == true) {
        DanhGiaNgoaiNgu2 = "3";
    } else {
        DanhGiaNgoaiNgu2 = "0";
    }
    saveData[25] = DanhGiaNgoaiNgu2;
    saveData[26] = $('#TinHocKhac').value();
    var DanhGiaTinHoc2;
    if ($('#TinHocKhac_Tot').value() == true) {
        DanhGiaTinHoc2 = "1";
    } else if ($('#TinHocKhac_Kha').value() == true) {
        DanhGiaTinHoc2 = "2";
    } else if ($('#TinHocKhac_TrungBinh').value() == true) {
        DanhGiaTinHoc2 = "3";
    } else {
        DanhGiaTinHoc2 = "0";
    }
    saveData[27] = DanhGiaTinHoc2;
    saveData[28] = JSON.stringify($('#KyNangMemID').value());
    saveData[29] = $('#YeuCauKinhNghiemID').value();
    saveData[30] = $('#TinhID_NoiLamViecDuKien').value();
    saveData[31] = $('#HuyenID_NoiLamViecDuKien').value();
    saveData[32] = $('#TenKCN_NoiLamViecDuKien').value();
    saveData[33] = $('#LoaiHopDongID').value();
    saveData[34] = $('#YeuCauLamThemID').value();
    saveData[35] = $('#HinhThucLamViecID').value();
    saveData[36] = $('#MucDichLamViecID').value();
    saveData[37] = $('#MucLuongID').value();
    saveData[38] = $('#LuongTheoNgay').value();
    saveData[39] = $('#LuongTheoGio').value();
    saveData[40] = JSON.stringify($('#CheDoPhucLoiID').value());
    saveData[41] = $('#CheDoPhucLoiKhac').value();
    saveData[42] = JSON.stringify($('#NoiLamViecID').value());
    saveData[43] = JSON.stringify($('#TrongLuongNangID').value());
    saveData[44] = JSON.stringify($('#DiDungID').value());
    saveData[45] = JSON.stringify($('#NgheNoiID').value());
    saveData[46] = JSON.stringify($('#ThiLucID').value());
    saveData[47] = JSON.stringify($('#ThaoTacTayID').value());
    saveData[48] = JSON.stringify($('#Dung2TayID').value());
    saveData[49] = JSON.stringify($('#DoiTuongUuTienID').value());
    saveData[50] = $('#DoiTuongUuTienKhac').value();
    saveData[51] = JSON.stringify($('#HinhThucTuyenDungID').value());
    saveData[52] = $('#NgayHetHan').value();
    saveData[53] = JSON.stringify($('#MongMuonDN').value());
    saveData[54] = $('#HoVaTen_NguoiTuyenDung').value();
    saveData[55] = $('#ChucVu_NguoiTuyenDung').value();
    saveData[56] = $('#SoDienThoai_NguoiTuyenDung').value();
    saveData[57] = $('#Email_NguoiTuyenDung').value();
    saveData[58] = $('#NhanThongBaoSMS').value();
    saveData[59] = $('#NhanThongBaoEmail').value();
    saveData[60] = $('#HinhThucLienHeKhac_NguoiTuyenDung').value();
    var data = uploadfileEvent({
        name: '#DinhKem',///ID input type="file"
        loaiVB: 'VB',
    });
    if (data.length > 0) {
        $('#txtDinhKem').value(data);
        NTS.dongthongbao();
    }
    saveData[61] = $('#txtDinhKem').value();
    saveData[62] = $('#PhieuDKGTVLID').value();
    saveData[63] = $('#ViecTimNguoiID').value();
    try {
        var matutang = NTS.getAjax('/CongThongTinViecLam/Function/LayMaTuTang', { strKyTu: "", strCotTang: "MaViecTimNguoi", strBangTang: "ViecTimNguoi", strDinhDang: "000000" });
        saveData[64] = matutang.Result
    } catch (e) { }
    saveData[65] = $('#TenDinhDanh').value();
    var result = NTS.getAjax('/QuanLy/PhieuDangKyCungUngLaoDong/LuuThongTinViecTimNguoi', { data: saveData });
    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        $('#mdThemMoiViecLamMongMuon').modal('hide');
        return false;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});

//---------------------------------Hiển thị modal chọn việc làm---------------------------------
$(document).on('click', '#HienThiViecLam', function () {
    show_ModalChonViecLam();
});
//---------------------------------Thêm kinh nghiệm làm việc---------------------------------
$(document).on('click', '#btnThemKinhNghiemLamViec', function () {
    show_ModalKinhNghiemLamViec();
});

//---------------------------------Thêm đánh giá dịch vụ tư vấn---------------------------------
$(document).on('click', '#btnThemDanhGia', function () {
    show_ModalDichVuTuVan();
});

var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().DanhGiaTVDVID);
}
//-------------------Grid đánh giá---------------//
var GridDanhGia = new Tabulator("#GridDanhGia", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: '250px',
    columns: [
        {
            title: "<button id='btnThemDanhGia' class='btn btn-xs btn-primary' style='background-color: #f3f4f5;font-size: 20px;'><i class='fa fa-plus' aria-hidden='true' style='color: var(--tbl-btn-luuvadong);'></i></button>",
            field: "actions",
            formatter: fmThaoTac, width: 60, headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", headerSort: false
        },
        { title: "STT", field: "STT", formatter: 'textarea', vertAlign: "middle", width: 80, headerHozAlign: "center", hozAlign: "center" },
        { title: "Nội dung", field: "NoiDung", formatter: 'textarea', vertAlign: "middle", minWidth: 150, headerHozAlign: "center" },
        { title: "Đánh giá", field: "TenDanhGia", formatter: 'textarea', minWidth: 70, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Nhận xét", field: "NhanXet", formatter: 'textarea', vertAlign: "middle", minWidth: 150, headerHozAlign: "center", hozAlign: "left" },
        { title: "DanhGiaTVDVID", field: "DanhGiaTVDVID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
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


///////// PHÍM TẮT /////////
var hotKey = 0; // 1 thêm
$(document).on('keydown', function (e) {
    console.log(e.keyCode);
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
                if ($('#mdThemMoi').hasClass('show')) {
                    $('#mdThemMoi').modal('hide');
                    e.preventDefault();
                    break;
                } 
        case 119:
            if (hotKey == 1) {
                if ($('#mdThemMoiViecLamMongMuon').hasClass('show')) {
                    $('#btnQuayLaiBuoc1').trigger('click');
                    e.preventDefault();
                    break;
                }
            }
        case 120:
            if (hotKey == 1) {
                if ($('#mdThemMoi').hasClass('show')) {
                    $('#btnTiepTuc_ViecMongMuon').trigger('click');
                    e.preventDefault();
                    break;
                }
                else if ($('#mdThemMoiViecLamMongMuon').hasClass('show')) {
                    $('#btnKetThuc').trigger('click');
                    e.preventDefault();
                    break;
                }
            }
    }
});

$(document).on('shown.bs.modal', '#mdThemMoi', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdThemMoi', function () {
    hotKey = 0;
});
$(document).on('shown.bs.modal', '#mdKinhNghiemVaDKDichVu', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdKinhNghiemVaDKDichVu', function () {
    hotKey = 0;
});
$(document).on('shown.bs.modal', '#mdThemMoiViecLamMongMuon', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdThemMoiViecLamMongMuon', function () {
    hotKey = 0;
});

//--------------------------------------------//
// Hàm load combo tổ chức

const Color = [
    "#0066cc",
    "#cc3300",
    "#993399",
    "#009966",
    "#ff9900",
    "#669900",
    "#cc6600",
    "#663366",
    "#009999",
    "#ff6600",
    "#996633",
    "#336699",
    "#cc6633",
    "#666699",
    "#339966",
    "#ff3366",
    "#663300",
    "#336600",
    "#993300",
    "#003366"
];
function FillterToChuc() {
    var input, filter, ul, li, a, i;
    input = $("#ckTimKiemToChuc");
    filter = input.value().toUpperCase();
    div = $("#ListDataToChuc");
    a = $("#ListDataToChuc li");
    for (i = 0; i < a.length; i++) {
        var txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            if (i != 0) { // khong an thanh tim kiem
                a[i].style.display = "none";
            }
        }
    }
}
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
        var toChucID = kq[i].ToChucID;
        var name = kq[i].TenToChuc;
        var nameKCN = kq[i].TenKCN;
        var name_VietTat = TraVeTenVietTat(kq[i].TenToChuc);
        var code = kq[i].MaToChuc;
        var masothue = kq[i].MaSoThue;
        var diaChiCuThe = kq[i].DiaChiCuThe;
        var tinh = kq[i].Tinh;
        var huyen = kq[i].Huyen;
        var xa = kq[i].Xa;
        var thon = kq[i].Thon;
        var tinhID = kq[i].DiaBanHCID_Tinh;
        var huyenID = kq[i].DiaBanHCID_Huyen;
        var xaID = kq[i].DiaBanHCID_Xa;
        var thonID = kq[i].DiaBanHCID_Thon;
        var namTrongKCN = kq[i].NamTrongKCN;
        var loaiHinhDNID = kq[i].LoaiHinhDNID;
        var tenNguoiSuDungLD = kq[i].TenNguoiSuDungLD;
        var soNha = kq[i].SoNha;
        var soCCCD = kq[i].SoCCCD;
        var soDienThoai = kq[i].SoDienThoai;
        var email = kq[i].Email;
        var nganhKinhTeID = JSON.parse(kq[i].NganhKinhTeID);
        $('#ToChucID_ChuHo').append(`<option value="${toChucID}"
                            data-name="${name}"
                            data-name-vietTat="${TraVeTenVietTat(name)}"
                            data-name-KCN="${nameKCN}"
                            data-code="${code}"
                            data-masothue="${masothue}"
                            data-diaChiCuThe="${diaChiCuThe}"
                            data-tinh="${tinh}"
                            data-huyen="${huyen}"
                            data-xa="${xa}"
                            data-thon="${thon}"
                            data-loaiHinhDN="${loaiHinhDNID}"
                            data-tinhID="${tinhID}"
                            data-huyenID="${huyenID}"
                            data-xaID="${xaID}"
                            data-thonID="${thonID}"
                            data-namTrongKCN="${namTrongKCN}"
                            data-TenNguoiSuDungLD="${tenNguoiSuDungLD}"
                            data-SoNha="${soNha}"
                            data-SoCCCD="${soCCCD}"
                            data-SoDienThoai="${soDienThoai}"
                            data-Email="${email}"
                            data-NganhKinhTeID="${nganhKinhTeID}"
                            ></option>`);
        $('#ToChucID_ChuHo').value(toChucID);

        
        const mauNgauNhien = getRandomColors(Color, 1);
        var item = `<li action="true" class="itemToChuc"
                            data-name="${name}"
                            data-name-vietTat="${TraVeTenVietTat(name)}"
                            data-name-KCN="${nameKCN}"
                            data-code="${code}"
                            data-masothue="${masothue}"
                            data-diaChiCuThe="${diaChiCuThe}"
                            data-tinh="${tinh}"
                            data-huyen="${huyen}"
                            data-xa="${xa}"
                            data-thon="${thon}"
                            data-loaiHinhDN="${loaiHinhDNID}"
                            data-tinhID="${tinhID}"
                            data-huyenID="${huyenID}"
                            data-xaID="${xaID}"
                            data-thonID="${thonID}"
                            data-namTrongKCN="${namTrongKCN}"
                            data-TenNguoiSuDungLD="${tenNguoiSuDungLD}"
                            data-SoNha="${soNha}"
                            data-SoCCCD="${soCCCD}"
                            data-SoDienThoai="${soDienThoai}"
                            data-Email="${email}"
                            data-NganhKinhTeID="${nganhKinhTeID}"
                            value = ${toChucID}
                    style="display: none;">
                        <div class="opImg" style="background-color:${mauNgauNhien}">${name_VietTat}</div>
                        <div class="opInfo"><div><b>${name}</b> (${code}), Số ĐKKD/Mã số thuế: <b>${masothue}</b>, Người đại diện: <b>${tenNguoiSuDungLD}</b></div>
                        <div class="text-diachi" title="${(thon == "" ? "" : thon + ", ")} ${xa}, ${huyen}, ${tinh}">Địa chỉ: <b>${diaChiCuThe}</b></div></div>
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
        $('#LoaiHinhDNID').value('');
        $('#MaSoThue').value('');
        $('#NamTronKCN').value(0);
        $('#TenKCN').value('');
        $('#TenNguoiSuDungLaoDong').value('');
        $('#SoCCCD').value('');
        $('#TinhID').value('');
        $('#HuyenID').value('');
        $('#XaID').value('');
        $('#ThonID').value('');
        $('#SoNha').value('');
        $('#DiaChiDoanhNghiep').value('');
        $('#SoDienThoai').value('');
        $('#Email').value('');
        $('#NganhNgheKinhDoanhChinh').value('');
        //ResetThongTinToChuc();
    } else {
        var value = $(this).attr('value');
        var name = $(this).attr("data-name");
        var code = $(this).attr("data-code");
        var masothue = $(this).attr("data-masothue");
        var diaChiCuThe = $(this).attr("data-diaChiCuThe");
        var loaihinhDN = $(this).attr("data-loaiHinhDN");
        var tenkcn = $(this).attr("data-name-KCN");
        var tinhID = $(this).attr("data-tinhID");
        var huyenID = $(this).attr("data-huyenID");
        var xaID = $(this).attr("data-xaID");
        var thonID = $(this).attr("data-thonID");
        var namTrongKCN = $(this).attr("data-namTrongKCN");
        var tenNSD = $(this).attr("data-TenNguoiSuDungLD");
        var soNha = $(this).attr("data-SoNha");
        var soCCCD = $(this).attr("data-SoCCCD");
        var soDienThoai = $(this).attr("data-SoDienThoai");
        var email = $(this).attr("data-Email");
        var nganhKinhTeID = $(this).attr("data-nganhKinhTeID");
        var item = `<li><span><b>${name}</b> <b>(${code})</b> - Địa chỉ: <b>${diaChiCuThe}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
        $('.text-inputTenToChuc').text(name);
        $('#LoaiHinhDNID').value(loaihinhDN);
        $('#MaSoThue').value(masothue);
        if (namTrongKCN == "false") {
            $('#NamTronKCN').value(0);
        } else if (namTrongKCN == "true") {
            $('#NamTronKCN').value(1);
        }
        $('#TenKCN').value(tenkcn);
        $('#TenNguoiSuDungLaoDong').value(tenNSD);
        $('#SoCCCD').value(soCCCD);
        $('#TinhID').value(tinhID);
        $('#HuyenID').value(huyenID);
        $('#XaID').value(xaID);
        $('#ThonID').value(thonID);
        $('#SoNha').value(soNha);
        $('#DiaChiDoanhNghiep').value(diaChiCuThe);
        $('#SoDienThoai').value(soDienThoai);
        $('#Email').value(email);
        var nganhKinhTeID = $(this).attr("data-nganhKinhTeID");

        // Tách chuỗi thành mảng dựa trên dấu phẩy
        var nganhKinhTeIDArray = nganhKinhTeID.split(',');

        // Thêm dấu ngoặc kép cho các phần tử trong mảng và giữ phần tử rỗng nếu có
        nganhKinhTeIDArray = nganhKinhTeIDArray.map(function (item) {
            return item === "" ? '' :  item ;
        });

        $('#NganhNgheKinhDoanhChinh').value(nganhKinhTeIDArray);
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
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/DungChung/GetAllToChuc_ChonCapGiayPhepLD", { data: saveData });
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
    $('#LoaiHinhDNID').value(dataGrid.LoaiHinhDNID);
    $('#MaSoThue').value(dataGrid.MaSoThue);
    $('#NamTronKCN').value(dataGrid.NamTrongKCN);
    $('#TenKCN').value(dataGrid.TenKCN);
    $('#TenNguoiSuDungLaoDong').value(dataGrid.TenNguoiSuDungLD);
    $('#SoCCCD').value(dataGrid.SoCCCD);
    $('#TinhID').value(dataGrid.DiaBanHCID_Tinh);
    $('#HuyenID').value(dataGrid.DiaBanHCID_Huyen);
    $('#XaID').value(dataGrid.DiaBanHCID_Xa);
    $('#ThonID').value(dataGrid.DiaBanHCID_Thon);
    $('#SoNha').value(dataGrid.SoNha);
    $('#DiaChiDoanhNghiep').value(dataGrid.DiaChiCuThe);
    $('#SoDienThoai').value(dataGrid.SoDienThoai);
    $('#Email').value(dataGrid.Email);
    $('#NganhNgheKinhDoanhChinh').value(JSON.parse(dataGrid.NganhKinhTeID));
    var item = `<li><span><b>${dataGrid.TenToChuc}</b> <b>(${dataGrid.MaToChuc})</b> - Địa chỉ: <b>${dataGrid.DiaChiCuThe}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
    $('.btn-select-tochuc').html(item);
    $('.btn-select-tochuc').attr('value', dataGrid.ToChucID);
    $('#ToChucID_ChuHo').value(dataGrid.ToChucID);
    $(".OptionToChuc").toggle();
    $('#mdChonToChuc_us').modal('hide');
});

// Chọn 1 dòng dữ liệu tổ chức trên modal chọn tổ chuc
Grid_ChonToChuc_us.on("rowDblClick", function (e, row) {
    var dataGrid = row.getData();
    $('#LoaiHinhDNID').value(dataGrid.LoaiHinhDNID);
    $('#MaSoThue').value(dataGrid.MaSoThue);
    $('#NamTronKCN').value(dataGrid.NamTrongKCN);
    $('#TenKCN').value(dataGrid.TenKCN);
    $('#TenNguoiSuDungLaoDong').value(dataGrid.TenNguoiSuDungLD);
    $('#SoCCCD').value(dataGrid.SoCCCD);
    $('#TinhID').value(dataGrid.DiaBanHCID_Tinh);
    $('#HuyenID').value(dataGrid.DiaBanHCID_Huyen);
    $('#XaID').value(dataGrid.DiaBanHCID_Xa);
    $('#ThonID').value(dataGrid.DiaBanHCID_Thon);
    $('#SoNha').value(dataGrid.SoNha);
    $('#DiaChiDoanhNghiep').value(dataGrid.DiaChiCuThe);
    $('#SoDienThoai').value(dataGrid.SoDienThoai);
    $('#Email').value(dataGrid.Email);
    $('#NganhNgheKinhDoanhChinh').value(JSON.parse(dataGrid.NganhKinhTeID));
    var item = `<li><span><b>${dataGrid.TenToChuc}</b> <b>(${dataGrid.MaToChuc})</b> - Địa chỉ: <b>${dataGrid.DiaChiCuThe}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
    $('.btn-select-tochuc').html(item);
    $('.btn-select-tochuc').attr('value', dataGrid.ToChucID);
    $('#ToChucID_ChuHo').value(dataGrid.ToChucID);
    $('#mdChonToChuc_us').modal('hide');
    //// Lưu giá trị của tổ chức với trang thái ban đầu để so sánh nếu có thay đổi khi tiếp tục thì cảnh bảo
    //mangGiaTriDauTC = [];
    //mangGiaTriDauTC.push(replaceNullAndEmptyString(dataGrid.LoaiHinhDNID));
});

var langArrayToChuc = [];
langArrayToChuc.push(`<li action="false" style="position: sticky;top: 0;background-color: white;">
                        <div class="row" style="width: 100%">
                        <div class="form-col-12">
                            <input type="text" class="form-control" id="ckTimKiemToChucID" >
                        </div>
                        </div>
                    </li>`);
langArrayToChuc.push(`<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn tổ chức- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);

//$('.vodiapickerToChuc option').each(function () {
//    var ToChucID = $(this).attr("value");
//    var name = $(this).attr("data-name");
//    var name_NSD = $(this).attr("data-name-NSD");
//    var name_KCN = $(this).attr("data-name-KCN");
//    var code = $(this).attr("data-code");
//    var masothue = $(this).attr("data-masothue");
//    var NoiThuongTru = $(this).attr("data-NoiThuongTru");
//    var tinh = $(this).attr("data-tinh");
//    var huyen = $(this).attr("data-huyen");
//    var xa = $(this).attr("data-xa");
//    var thon = $(this).attr("data-thon");
//    const mauNgauNhien = getRandomColors(Color, 1);
//    var item = `<li action="true" class="itemToChuc" data-name="${name}" data-code="${code}" data-NoiThuongTru="${kq[i].DiaChiCuThe}" value="${ToChucID}" data-masothue="${kq[i].MaSoThue}" data-loaiHinhDN="${kq[i].LoaiHinhDNID}" style="display: none;">
//                        <div class="opImg" style="background-color:${mauNgauNhien}">${name_NSD}</div>
//                        <div class="opInfo"><div><b>${name}</b> (${code}), Số ĐKKD/Mã số thuế: <b>${masothue}</b>, Người đại diện: <b>${kq[i].TenNguoiSuDungLD}</b></div>
//                                <div class="text-diachi" title="${(thon == "" ? "" : thon + ", ")} ${xa}, ${huyen}, ${tinh}">Địa chỉ: <b>${NoiThuongTru}</b></div></div>
//                    </li>`;
//    langArrayToChuc.push(item);
//});

//langArray.push(`<li action="false" id="LoadMoreDoiTuongDK" onclick="LoadMoreDoiTuong()" style="justify-content: center;"> Xem thêm &nbsp<i class="fa fa-arrow-down" style="color: #0054a6" aria-hidden="true"></i></li>`);
$('#ListDataToChuc').html(langArrayToChuc);

//Set the button value to the first el of the array
$('.btn-select-tochuc').html(langArrayToChuc[1]);
$('.btn-select-tochuc').attr('value', '');

$(".btn-select-tochuc").click(function () {
    $(".OptionToChuc").toggle();
});
$(document).ready(function () {
    // Bắt sự kiện click trên toàn bộ trang
    $(document).on('click', function (event) {
        // Kiểm tra xem sự kiện click diễn ra bên ngoài thẻ có class A hay không
        if (!$(event.target).closest('.lang-select').length) {

            $(".OptionToChuc").css('display', 'none');
        }
    });
});
////check local storage for the lang
var sessionLang = localStorage.getItem('lang');
if (sessionLang) {
    //find an item with value of sessionLang
    var langIndex = langArrayToChuc.indexOf(sessionLang);
    $('.tn-select-tochuc').html(langArrayToChuc[langIndex]);
    $('.tn-select-tochuc').attr('value', sessionLang);
} else {
    var langIndex = langArrayToChuc.indexOf('ch');
    $('.tn-select-tochuc').html(langArrayToChuc[langIndex]);
    //$('.btn-select').attr('value', 'en');
}


function NumbervisibleLiCountToChuc() {
    var visibleLiCount = $('#ListDataToChuc li').filter(function () {
        return $(this).css('display') === 'flex';
    }).length;
    return visibleLiCount;
}

var soLuongHienThi_ToChuc = 20;

function LoadMoreToChuc() {
    // Số phần tử đang hiển thị
    var visibleLiCount = NumbervisibleLiCountToChuc();
    // Hiển thị thêm 20 phần tử nữa
    $("#ListDataToChuc li").slice(visibleLiCount, visibleLiCount + soLuongHienThi_ToChuc).css("display", "flex");

    // Kiểm tra nếu đã hiển thị hết tất cả các phần tử thì ẩn nút "Xem thêm"
    if (visibleLiCount + soLuongHienThi_ToChuc >= $('#ListDataToChuc li').length - 1) {
        $("#loadMoreToChucDK").css("display", "none");
    }
}


//--------------------------------Đính kèm tài liệu------------------------------------
function uploadfileEvent(options) {

    var result;
    var defaults = {
        name: '',
        loaiVB: '',
        type: '',
        thongBaoThanhCong: 'Tải file thành công!',
        hienThongBao: true
    };
    var settings = $.extend(defaults, options);
    if (settings.loaiVB == '' || settings.loaiVB == 'undefined') {
        result = "";
        NTS.canhbao("Bạn chưa cài đặt loại văn bản, vui lòng kiểm ra lại");
        return result;
    }
    else if (settings.name == '' || settings.name == 'undefined' || $(settings.name).length == 0) {
        NTS.canhbao('Không tồn tại control ' + settings.name + ' cho hàm upload');
        return result;
    }
    var fileUpload = $(settings.name).get(0);
    var files = $(fileUpload).data('ace_input_files');
    if (files == undefined) {
        return "";
    }

    var test = new FormData();
    for (var i = 0; i < files.length; i++) {
        if (positionRemoveItiem.includes(i) == false) {
            test.append(files[i].name, files[i]);
        }
    }
    positionRemoveItiem = [];
    var bar = $('.progress-bar');
    var percent = $('.percent');
    var status = $('#status');
    $.ajax({
        url: "/UploadFiles/UploadFiles?loaiVB=" + settings.loaiVB + '&type=' + settings.type,
        type: "POST",
        contentType: false, // Not to set any content header
        processData: false, // Not to process data
        data: test,
        async: false,
        beforeSend: function () {
            NTS.loadding();
        },
        success: function (data) {
            NTS.unloadding();
            if (data != "") {
                //$('#FileBrowse').find("*").prop("disabled", true);
                //LoadProgressBar(data); //calling LoadProgressBar function to load the progress bar.
            }
            data = data.replaceAll("\"", "");
            data = data.split('|');
            if (data[0] == "1") {
                result = data[1];
                //if (settings.hienThongBao) {
                //    NTS.thanhcong(settings.thongBaoThanhCong);
                //}
            }
            else if (data[0] == "0") {
                result = "";
                NTS.loi(data[1]);
            }
            else if (data[0] == "-1") {
                result = "";
                NTS.loi(data[1]);
                //setTimeout(function () { window.location.href = "/view/shared/main.aspx" }, 500);
            }
        },
        error: function (err) {
            result = "";
            NTS.loi("Tải file thất bại! Bạn vui lòng kiểm tra lại");
            NTS.unloadding();
        }
        , complete: function (err) {
            NTS.unloadding();
        }
    });
    //reset cac file  vua dua len để tránh trường hợp cập nhật lấy lại các file vừa mới đưa lên
    // Tạo một FileList rỗng
    var emptyFileList = new DataTransfer().files;

    // Gán FileList rỗng vào dữ liệu jQuery
    $($('#DinhKem').get(0)).data('ace_input_files', emptyFileList);
    return result;
}
$('#DinhKem').on('change', function () {
    var selectedFiles = this.files;

    // Kiểm tra và xử lý tệp đã chọn ở đây
    for (var i = 0; i < selectedFiles.length; i++) {
        var fileName = selectedFiles[i].name;
        var fileType = fileName.split('.').pop().toLowerCase();
        debugger
        // Kiểm tra loại tệp
        if (fileType === 'doc' || fileType === 'docx' || fileType === 'pdf' || fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
            // Xử lý tệp ở đây nếu đúng định dạng
            console.log('Đã chọn tệp: ' + fileName);
        } else {
            alert('Vui lòng chọn tệp DOC, PDF, PNG, JPG hoặc JPEG.');
            // Xoá tệp không hợp lệ khỏi input (nếu cần)
            ResetDinhKemFile();
        }
    }
});
var old_ItemFile = "";
$('#DinhKem').ace_file_input({
    style: 'well',
    btn_choose: 'Nhấn để chọn tệp hoặc kéo thả vào đây (Cho phép đính kèm các file có định dạng DOC, PDF, PNG, JPG, JPEG)',
    btn_change: null,
    no_icon: 'ace-icon fa fa-cloud-upload',
    droppable: true,
    thumbnail: 'large',
    allowExt: ["jpeg", "jpg", "png", "gif", "pdf", "docx", "doc"]
    , alter_change: function ChangeItem() {
        return false;
    }
    , before_change: function (files, dropped) {
        return true;
    },
    preview_error: function (filename, error_code) {
    }
    , before_remove: function RemoveALl() {
        RemoveAllFileInputAce();
    }
}).on('change', function () {

    //Trước khi load các file đã tồn tại trước đó cần gắn dấu X trước
    $('.ace-file-name').each(function () {
        // Sử dụng find() để kiểm tra xem có thẻ '<i class="ace-icon fa fa-times XoaFileDinhKem btn-del-item" onclick="return false"></i>' hay không
        var hasIcon = $(this).find('i.ace-icon.fa.fa-times.XoaFileDinhKem.btn-del-item').length > 0;

        // Kiểm tra kết quả và thực hiện các hành động cần thiết
        if (hasIcon) {
            // da ton tai dau X
        } else {
            // khong ton tai dau x
            $('.ace-file-name').append('<i class=" ace-icon fa fa-times  XoaFileDinhKemDT XoaFileDinhKem btn-del-item" onclick="return false"></i>');
        }
    });
    //Load các file đã upload vào db
    if ($(old_ItemFile[0]).attr("data-title") != 'No File ...') {
        $('.ace-file-container').append(old_ItemFile);
    }
    //Gắn thêm dấu x xóa từng file
    //các file trước đó đã có trong csdl
    if ($('.ace-file-name').children().hasClass('XoaFileDinhKem')) {
        // Có class "XoaFileDinhKem"
    } else {
        // Không "XoaFileDinhKem"
        $('.ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKemDT XoaFileDinhKem btn-del-item" onclick="return false"></i>');
        //File thêm mới
        $('.ace-file-name.large').append('<i class=" ace-icon fa fa-times XoaFileDinhKemDT XoaFileDinhKem btn-del-item " onclick="return false"></i>');

    }

    return false;
});
var file_input = $('#DinhKem');
file_input.ace_file_input('reset_input');
file_input
    .off('file.error.ace')
    .on('file.error.ace', function (e, info) {
    });

function RemoveAllFileInputAce() {
    var bang = "ViecTimNguoi";
    var cot = "ViecTimNguoiID";

    CanhBaoXoa(() => {
        var result = NTS.getAjax('/QuanLy/PhieuDangKyCungUngLaoDong/XoaDinhKemViecTimNguoi', { ID: $('#ViecTimNguoiID').val(), duongDan: '', bangDk: bang, cotDk: cot, loai: 'all' });
        if (!result.Err) {
            NTS.thanhcong(result.Msg);
            $('#txtDinhKem').value("");
            ResetDinhKemFile();
            old_ItemFile = "";
            //$('#txtDinhKem').value($('#txtDinhKem').value().replaceAll(ListFile[i], '').replaceAll('**', '*'));
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}
var positionRemoveItiem = new Array();
$(document).on('click', '.XoaFileDinhKem', function () {
    var ViecTimNguoiID = $('#ViecTimNguoiID').value();
    var TenFile = $(this).parent().attr('data-title');
    var ListFile = $('#txtDinhKem').value().split('*');
    //Kiểm tra xem file xóa có phải là file vừa mới upload hay không - nếu là file vừa mới upload thì cho vào list xóa để không upload vào server
    if (!$(this).hasClass('img-db')) {
        var indexRemove = $('.XoaFileDinhKem').index(this);
        positionRemoveItiem.push(indexRemove);
    }
    //
    CanhBaoXoa(() => {
        for (var i = 0; i < ListFile.length; i++) {
            if (ListFile[i].includes(TenFile)) {
                var bang = "ViecTimNguoi";
                var cot = "ViecTimNguoiID";
                var result = NTS.getAjax('/QuanLy/PhieuDangKyCungUngLaoDong/XoaDinhKemViecTimNguoi', { ID: ViecTimNguoiID, duongDan: ListFile[i], bangDk: bang, cotDk: cot, loai: '' });

                if (!result.Err) {
                    NTS.thanhcong(result.Msg);
                    $('#txtDinhKem').value($('#txtDinhKem').value().replaceAll(ListFile[i], '').replaceAll('**', '*'))
                }
                else {
                    NTS.loi(result.Msg);
                }
            }
        }
        //$(this).parent().css('display', 'none');
        //if ($('#DinhKem').parent().find('.ace-file-name').length == 1 && $('#DinhKem').parent().find('.ace-file-name').css('display') == "none") {
        //    ResetDinhKemFile();
        //}
        $(this).parent().remove();
        if ($('#DinhKem').parent().find('.ace-file-name').length == 0) {
            ResetDinhKemFile();
        }
    });
    //
});
$(document).on('click', '.XemDinhKemHinhAnh_USDangKy', function () {
    var linkImg = $(this).attr("ace-img-url");
    linkImg = linkImg.replace("~", "");
    window.open(linkImg);
    return false;
});

function ResetDinhKemFile() {
    $('#DinhKem').ace_file_input('reset_input');
    $('.ace-file-container').html(`<span class="ace-file-name" data-title="No File ..."><i class=" ace-icon ace-icon fa fa-cloud-upload"></i></span>`);
}

//-----------------------------Xử lý load ra thông tin tổ chức khi nhập vào đúng mã số thuế-------------------------------

//Lấy ra thông tin tổ chức khi nhập vào mã số thuế trên input mã số thuế
function LoadThongTinToChucTheoMaSoThue(value) {
    const result = NTS.getAjax('/QuanLy/PhieuDangKyCungUngLaoDong/LoadDuLieuToChucTheoMaSoThue', { value: value });
    if (result.Result.length != 0) {
        if (!result.Err && result.Result != null) {
            let data = result.Result[0];
            $('#LoaiHinhDNID').value(data.LoaiHinhDNID);
            $('#MaSoThue').value(data.MaSoThue);
            $('#NamTronKCN').value(data.NamTrongKCN);
            $('#TenKCN').value(data.TenKCN);
            $('#TenNguoiSuDungLaoDong').value(data.TenNguoiSuDungLD);
            $('#SoCCCD').value(data.SoCCCD);
            $('#TinhID').value(data.DiaBanHCID_Tinh);
            $('#HuyenID').value(data.DiaBanHCID_Huyen);
            $('#XaID').value(data.DiaBanHCID_Xa);
            $('#ThonID').value(data.DiaBanHCID_Thon);
            $('#SoNha').value(data.SoNha);
            $('#DiaChiDoanhNghiep').value(data.DiaChiCuThe);
            $('#SoDienThoai').value(data.SoDienThoai);
            $('#Email').value(data.Email);
            $('#NganhNgheKinhDoanhChinh').value(JSON.parse(data.NganhKinhTeID));
            var item = `<li><span><b>${data.TenToChuc}</b> <b>(${data.MaToChuc})</b> - Địa chỉ: <b>${data.DiaChiCuThe}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
            $('.btn-select-tochuc').html(item);
            $('.btn-select-tochuc').attr('value', data.ToChucID);
            $('#ToChucID_ChuHo').value(data.ToChucID);
            $('#SelectToChuc_US').attr('value', data.ToChucID);
            $('#mdChonToChuc_us').modal('hide');
            // lưu giá trị của tổ chức với trang thái ban đầu để so sánh nếu có thay đổi khi tiếp tục thì cảnh bảo
        } else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    } else {
        // Trường hợp tổ chức chưa tồn tại trong hệ thống
        NTS.canhbao(`Tổ chức có Số ĐKKD/Mã số thuế là ${value} chưa tồn tại trong hệ thống!`);
        $('#SelectToChuc_US').html('<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn tổ chức- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>');
        $('#SelectToChuc_US').attr('value', "");
        $('#ToChucID_ChuHo').html("");
        $('#LoaiHinhDNID').value('');
        $('#MaSoThue').value('');
        $('#NamTronKCN').value('');
        $('#TenKCN').value('');
        $('#TenNguoiSuDungLaoDong').value('');
        $('#SoCCCD').value('');
        $('#TinhID').value('');
        $('#HuyenID').value('');
        $('#XaID').value('');
        $('#ThonID').value('');
        $('#SoNha').value('');
        $('#DiaChiDoanhNghiep').value('');
        $('#SoDienThoai').value('');
        $('#Email').value('');
        $('#NganhNgheKinhDoanhChinh').value('');
        return false;
    }
}


// Khi nhập xong Số ĐKKD/Mã số thuế và blur ra khỏi input
$(document).on('blur', '#MaSoThue', function () {
    var MaSoThue = $('#MaSoThue').value();
    if (MaSoThue != "") {
        LoadThongTinToChucTheoMaSoThue(MaSoThue);
    }
});

//--------------------Xử lý Đánh giá chất lượng sử dụng dịch vụ tư vấn--------------------/

$(document).on('click', '#btnThemDanhGia', function () {
    $('#countrydata').html('');
    tempthemDanhGia = "them";
    var result = NTS.getAjax('/DanhMuc/DungChung/GetDichVuDK_Combo', {});
    var data = result.Result;
    if (data.length > 0) {
        // Truyền giá trị cho thuộc tính list và id
        for (var i = 0; i < data.length; i++) {
            $('#countrydata').append(`<option data-data="${data[i].DichVuDKID}">${data[i].TenDichVuDK}</option>`);
        }
    }
});

$(document).on('change','#CongViecChinh_USChonViecLam', function () {
    $('#CongViecChinh_USChonViecLamID').value('');
    $('#CongViecChinh_USChonViecLamValue').value('');
    var inputVal = $(this).val();
    $('#CongViecChinh_USChonViecLamValue').value(inputVal);
    var selectedOption = $('#countrydata option').filter(function () {
        return $(this).text() === inputVal;
    });

    if (selectedOption.length) {
        var dataValue = selectedOption.data('data'); // Sử dụng data-data
        $('#CongViecChinh_USChonViecLamID').value(dataValue); // Gán data vào input
        console.log("Data đã chọn: " + dataValue); // In ra console để kiểm tra
    } 
});
// Khởi tạo biến auto-increment ID
let autoIncrementID = 1;
danhGia = [];
$(document).on('click', '#btnLuuDichVuTuVan_us', function () {
    const validate = new NTSValidate('#mdDichVuTuVan_us');

    // Check validations
    if (!validate.trim().check() || !validate.trim().checkSpecial()) {
        return false;
    }
    
    var tenDanhGia = '';
    if ($('#DanhGia_USChonViecLam').val() == "2") {
        tenDanhGia = "Không đạt";
    } else if ($('#DanhGia_USChonViecLam').val() == "1") {
        tenDanhGia = "Đạt";
    }

    const DanhGiaTVDVID = $('#DanhGiaTVDVID').val();  // Lấy ID đang thao tác
    if (tempthemDanhGia === 'sua') {
        if (temSuaChuaLuu == true) {
            // Tìm và sửa thông tin trong mảng danhGia dựa vào DanhGiaTVDVID
            const index = danhGia.findIndex(item => item.DanhGiaTVDVID == DanhGiaTVDVID);
            if (index !== -1) {
                danhGia[index] = {
                    "DanhGiaTVDVID": DanhGiaTVDVID,  // Không tăng ID, chỉ cập nhật
                    "STT": $('#STT_USDichVuTuVan').val(),
                    "DanhGia": $('#DanhGia_USChonViecLam').val(),
                    "NhanXet": $('#NhanXet_USChonViecLam').val(),
                    "ThamChieuID": $('#PhieuDKGTVLID').val(),
                    "DichVuDKID": $('#CongViecChinh_USChonViecLamID').val(),
                    "NoiDung": $('#CongViecChinh_USChonViecLamValue').val(),
                    "TenDanhGia": tenDanhGia,
                };
            }
        } else {
            var saveDataDanhGia = new Array();
            saveDataDanhGia[0] = tempthemDanhGia;
            saveDataDanhGia[1] = $('#DanhGiaTVDVID').value();
            saveDataDanhGia[2] = $('#PhieuDKGTVLID').value();
            saveDataDanhGia[3] = $('#STT_USDichVuTuVan').value();
            saveDataDanhGia[4] = $('#DanhGia_USChonViecLam').value();
            saveDataDanhGia[5] = $('#NhanXet_USChonViecLam').value();
            saveDataDanhGia[6] = $('#CongViecChinh_USChonViecLamID').value();
            saveDataDanhGia[7] = $('#CongViecChinh_USChonViecLamValue').value();
            var result = NTS.getAjax('/QuanLy/PhieuDangKyCungUngLaoDong/LuuThongTinDanhGia_TrenLuoi', { data: saveDataDanhGia });
            if (!result.Err) {
                LoadDataTableDanhGia($('#PhieuDKGTVLID').value());
                NTS.thanhcong('Cập nhật dữ liệu thành công!');
                temSuaChuaLuu == false;
                $('#mdDichVuTuVan_us').modal('hide');
            } else {
                result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            }
            return false;
        }
    } else {
        // Nếu là thêm mới
        danhGia.push({
            "DanhGiaTVDVID": autoIncrementID++,  // Tăng ID cho mỗi lần thêm mới
            "STT": $('#STT_USDichVuTuVan').val(),
            "DanhGia": $('#DanhGia_USChonViecLam').val(),
            "NhanXet": $('#NhanXet_USChonViecLam').val(),
            "ThamChieuID": $('#PhieuDKGTVLID').val(),
            "DichVuDKID": $('#CongViecChinh_USChonViecLamID').val(),
            "NoiDung": $('#CongViecChinh_USChonViecLamValue').val(),
            "TenDanhGia": tenDanhGia,
        });
    }

    JSONDanhGia = JSON.stringify(danhGia);
    console.log(JSONDanhGia);  // Output the JSON data to console to check
    GridDanhGia.setData(JSONDanhGia);
    $('#mdDichVuTuVan_us').modal('hide');
   
});

function LoadDataTableDanhGia(ID) {
    GridDanhGia.clearData();
    const GetAll = NTS.getAjax("/QuanLy/PhieuDangKyCungUngLaoDong/GetAllDanhGia", {id : ID});
    if (!GetAll.Err) {
        GridDanhGia.setData(GetAll.Result);
        $('#GridDanhGia .tabulator-page-size option:first-child').prop('selected', true);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}
//---------------------------------Quay lại bước 1---------------------------------
$(document).on('click', '#btnQuayLaiBuoc1', function () {
    tempthem = "sua";
    tempthemDanhGia = "sua";
    $('#mdThemMoiViecLamMongMuon').modal('hide');
    $('#mdThemMoi').modal('show');
    LoadDataTableDanhGia($('#PhieuDKGTVLID').value());
});

function SuaDuLieuDanhGia(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#CongViecChinh_USChonViecLamID').value('');
    $('#CongViecChinh_USChonViecLamValue').value('');
    $('#tieuDeDichVuTuVan_us').text('Cập nhật thông tin đánh giá chất lượng sử dụng dịch vụ tư vấn');
    $('#mdDichVuTuVan_us').modal('show');
    const result = NTS.getAjax('/QuanLy/PhieuDangKyCungUngLaoDong/LoadDuLieuSuaDanhGia', { id: ID });
    if (Array.isArray(result.Result) && result.Result.length === 0) {
        // Nếu result.Result là một mảng rỗng, tìm dữ liệu trong danhGia
        const foundData = danhGia.find(item => item.DanhGiaTVDVID == ID);
        if (foundData) {
            // Cập nhật giá trị vào các trường dữ liệu
            $('#DanhGiaTVDVID').val(foundData.DanhGiaTVDVID);
            $('#STT_USDichVuTuVan').val(foundData.STT);
            $('#DanhGia_USChonViecLam').val(foundData.DanhGia);
            $('#CongViecChinh_USChonViecLamValue').val(foundData.NoiDung);
            $('#CongViecChinh_USChonViecLamID').val(foundData.DichVuDKID);
            $('#NhanXet_USChonViecLam').val(foundData.NhanXet);

            // Cập nhật lại mảng danhGia với các giá trị thay đổi
            foundData.DanhGia = $('#DanhGia_USChonViecLam').val();
            foundData.NoiDung = $('#CongViecChinh_USChonViecLamValue').val();
            foundData.DichVuDKID = $('#CongViecChinh_USChonViecLamID').val();
            foundData.NhanXet = $('#NhanXet_USChonViecLam').val();
        }

        // Cập nhật lại JSONDanhGia
        JSONDanhGia = JSON.stringify(danhGia);
        temSuaChuaLuu = true;
    } else if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#DanhGiaTVDVID').val(data.DanhGiaTVDVID);
        $('#STT_USDichVuTuVan').val(data.STT);
        $('#DanhGia_USChonViecLam').val(data.DanhGia);
        $('#CongViecChinh_USChonViecLamValue').val(data.NoiDung);
        $('#CongViecChinh_USChonViecLamID').val(data.DichVuDKID);
        $('#NhanXet_USChonViecLam').val(data.NhanXet);
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    tempthemDanhGia = 'sua';
}


$(document).on('click', '.btnSuaGrid1', function () {
    var ID = $(this).attr('data');
    SuaDuLieuDanhGia(ID);
    $('#DanhGiaTVDVID').value(ID);
});

$(document).on('click', '.btnXoaGrid1', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieuDanhGia(ID);
    $('#DanhGiaTVDVID').value(ID);
});

function XoaDuLieuDanhGia(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'DanhGiaTVDVID', ID: ID, TenBangHienTai: 'DanhGiaTVDV', CacBangKhongXet: [] });
     if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/QuanLy/PhieuDangKyCungUngLaoDong/XoaDuLieuDanhGia', { id: ID });
                //// Kiểm tra nếu result.Result là mảng rỗng
                if ((Array.isArray(result.Result) && result.Result.length === 0) || result.Result == null) {
                    // Xóa dòng khỏi mảng danhGia dựa vào DanhGiaTVDVID
                    // Tìm vị trí của phần tử cần xóa
                    const index = danhGia.findIndex(item => item.DanhGiaTVDVID == ID);
                    if (index !== -1) {
                        // Xóa phần tử tại vị trí 'index'
                        danhGia.splice(index, 1);
                    }
                    // Cập nhật lại dữ liệu vào bảng GridDanhGia
                    GridDanhGia.setData(danhGia);
                    JSONDanhGia = JSON.stringify(danhGia);
                    NTS.thanhcong('Xóa dữ liệu thành công!');
                }
                else if (!result.Err) {
                    LoadDataTableDanhGia($('#PhieuDKGTVLID').value());
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

//------------------------------Xóa Việc tìm người-----------------------------

function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'PhieuDKGTVLID', ID: ID, TenBangHienTai: 'PhieuDKGTVL', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/QuanLy/PhieuDangKyCungUngLaoDong/XoaDuLieu', { id: ID });
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


//-------------------Sửa dữ liệu tổ chức------------------//
function SuaDuLieuViecTimNguoi(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#lblTieuDeThemMoi').text('Cập nhật thông tin Phiếu đăng ký giới thiệu/cung ứng lao động');
    $('#mdThemMoi').modal('show');
    resetForm('#mdThemMoi');
    resetForm('#mdThemMoiViecLamMongMuon');
    const result = NTS.getAjax('/QuanLy/PhieuDangKyCungUngLaoDong/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#PhieuDKGTVLID').value(data.PhieuDKGTVLID);
        $('#MaSo').value(data.MaSoPhieuDK);
        $('#NgayDangKy').value(data.NgayDangKyPhieuDK);
        $('#NamTronKCN').value(data.NamTrongKCN);
        $('#LaCaNhanTuyenDung').value(data.LaCaNhan);
        $('#LoaiHinhDNID').value(data.LoaiHinhDNID);
        $('#MaSoThue').value(data.MaSoThue);
        $('#TenKCN').value(data.TenKCN);
        $('#TenNguoiSuDungLaoDong').value(data.TenNguoiSuDungLaoDong);
        $('#SoCCCD').value(data.SoCCCD);
        $('#SoNha').value(data.SoNha);
        $('#DiaChiDoanhNghiep').value(data.DiaChiCuThe);
        $('#SoDienThoai').value(data.SoDienThoai);
        $('#Email').value(data.Email);
        $('#NganhNgheKinhDoanhChinh').value(JSON.parse(data.NganhKinhTeID));
        $('#QuyMoLaoDong').value(data.QuyMoLDID);
        $('#SanPhamChinh').value(data.MatHangChinh);
        $('#HanNop').value(data.ThoiHanTuyenDungPhieuDK);
        $('#HoVaTen_NguoiDaiDien').value(data.HoVaTenNDD);
        $('#ChuVu_NguoiDaiDien').value(data.ChucVuNDD);
        $('#SoDienThoai_NguoiDaiDien').value(data.SoDienThoaiNDD);
        $('#HinhThucLienHe_NguoiDaiDien').value(data.HinhThucLienHeKhac);
        $('#DangKyDichVuID').value(JSON.parse(data.DKDVTuVan));
        $('#DangKyDichVuKhac').value(data.DKDVTuVan_Khac);
        $('#SelectToChuc_US').attr('value', data.ToChucID);
        LoadDataTableDanhGia(data.PhieuDKGTVLID);
        $('#MaSoDangKVL').value(data.MaSoVTN);
        $('#NgayDangKyViecLam').value(data.NgayDangKyVTN);
        $('#TenCongViec').value(data.TenCongViec);
        $('#SoLuongTuyen').value(data.SoLuongTuyen);
        $('#MoTaCongViec').value(data.MoTaCongViec);
        $('#ChucVuID').value(data.ChucVuID);
        $('#ChucVuKhac').value(data.ChucVuKhac);
        $('#MaNgheCap1').value(data.NganhKinhTeID_Cap1);
        $('#MaNgheCap2').value(data.NganhKinhTeID_Cap2);
        $('#MaNgheCap3').value(data.NganhKinhTeID_Cap3);
        $('#MaNgheCap4').value(data.NganhKinhTeID_Cap4);
        $('#TrinhDoHVID').value(data.TrinhDoHVID);
        $('#TrinhDoCMKTID_Khac').value(data.TrinhDoKhac);
        $('#TrinhDoCMKTID').value(data.TrinhDoCMKTID);
        $('#TrinhDoKyNangNgheID').value(data.TrinhDoKyNangNgheID);
        $('#ChuyenNganhDTID').value(data.ChuyenNganhDTID);
        $('#BacID').value(data.BacKNNID);
        $('#TrinhDoNgoaiNguID1').value(data.TrinhDoNgoaiNgu1);
        $('#ChungChiNgoaiNgu1').value(data.ChungChiNgoaiNgu1);
        if (data.DanhGiaNgoaiNgu1 == "1") {
            $('#TrinhDoNgoaiNgu1_Tot').value(1);
        } else if (data.DanhGiaNgoaiNgu1 == "2") {
            $('#TrinhDoNgoaiNgu1_Kha').value(1);
        } else if (data.DanhGiaNgoaiNgu1 == "3") {
            $('#TrinhDoNgoaiNgu1_TrungBinh').value(1);
        } else {
            $('#TrinhDoNgoaiNgu1_Tot').value(0);
            $('#TrinhDoNgoaiNgu1_Kha').value(0);
            $('#TrinhDoNgoaiNgu1_TrungBinh').value(0);
        }
        $('#TinHocVP').value(data.TrinhDoTinHoc);
        if (data.DanhGiaTinHoc == "1") {
            $('#TinHocVP_Tot').value(1);
        } else if (data.DanhGiaTinHoc == "2") {
            $('#TinHocVP_Kha').value(1);
        } else if (data.DanhGiaTinHoc == "3") {
            $('#TinHocVP_TrungBinh').value(1);
        } else {
            $('#TinHocVP_Tot').value(0);
            $('#TinHocVP_Kha').value(0);
            $('#TinHocVP_TrungBinh').value(0);
        }
        $('#TrinhDoNgoaiNguID2').value(data.TrinhDoNgoaiNgu2);
        $('#ChungChiNgoaiNgu2').value(data.ChungChiNgoaiNgu2);
        if (data.DanhGiaNgoaiNgu2 == "1") {
            $('#TrinhDoNgoaiNgu2_Tot').value(1);
        } else if (data.DanhGiaNgoaiNgu2 == "2") {
            $('#TrinhDoNgoaiNgu2_Kha').value(1);
        } else if (data.DanhGiaNgoaiNgu2 == "3") {
            $('#TrinhDoNgoaiNgu2_TrungBinh').value(1);
        } else {
            $('#TrinhDoNgoaiNgu2_Tot').value(0);
            $('#TrinhDoNgoaiNgu2_Kha').value(0);
            $('#TrinhDoNgoaiNgu2_TrungBinh').value(0);
        }
        $('#TinHocKhac').value(data.TrinhDoTinHocKhac);
        if (data.DanhGiaTinHocKhac == "1") {
            $('#TinHocKhac_Tot').value(1);
        } else if (data.DanhGiaTinHocKhac == "2") {
            $('#TinHocKhac_Kha').value(1);
        } else if (data.DanhGiaTinHocKhac == "3") {
            $('#TinHocKhac_TrungBinh').value(1);
        } else {
            $('#TinHocKhac_Tot').value(0);
            $('#TinHocKhac_Kha').value(0);
            $('#TinHocKhac_TrungBinh').value(0);
        }
        $('#KyNangMemID').value(JSON.parse(data.KyNangMem));
        $('#YeuCauKinhNghiemID').value(data.KinhNghiemID);
        $('#TinhID_NoiLamViecDuKien').value(data.TinhID_NLV);
        $('#HuyenID_NoiLamViecDuKien').value(data.QuanHuyen_NLV);
        $('#TenKCN_NoiLamViecDuKien').value(data.NoiLamViecDuKien_KCN);
        $('#LoaiHopDongID').value(data.LoaiHopDongID);
        $('#YeuCauLamThemID').value(data.YeuCauThemID);
        $('#HinhThucLamViecID').value(data.HinhThucLamViecID);
        $('#MucDichLamViecID').value(data.MucDichLamViecID);
        $('#MucLuongID').value(data.MucLuongID);
        $('#LuongTheoNgay').value(data.LuongTheoNgay);
        $('#LuongTheoGio').value(data.LuongTheoGio);
        $('#CheDoPhucLoiID').value(JSON.parse(data.CheDoPhucLoiID));
        $('#CheDoPhucLoiKhac').value(data.CheDoPhucLoi_Khac);
        $('#NoiLamViecID').value(JSON.parse(data.NoiLamViecID));
        $('#TrongLuongNangID').value(JSON.parse(data.TrongLuongNangID));
        $('#DiDungID').value(JSON.parse(data.DiDungID));
        $('#NgheNoiID').value(JSON.parse(data.NgheNoiID));
        $('#ThiLucID').value(JSON.parse(data.ThiLucID));
        $('#ThaoTacTayID').value(JSON.parse(data.ThaoTacTayID));
        $('#Dung2TayID').value(JSON.parse(data.Dung2TayID));
        $('#DoiTuongUuTienID').value(JSON.parse(data.DoiTuongUuTienID));
        $('#DoiTuongUuTienKhac').value(data.DoiTuongUuTien_Khac);
        $('#HinhThucTuyenDungID').value(JSON.parse(data.HinhThucTuyenDungID));
        $('#NgayHetHan').value(data.ThoiHanTuyenDungVTN);
        $('#MongMuonDN').value(JSON.parse(data.HinhThucTuyenDungID));
        $('#HoVaTen_NguoiTuyenDung').value(data.HoTen_NguoiLienHe);
        $('#ChucVu_NguoiTuyenDung').value(data.ChucVu_NguoiLienHe);
        $('#SoDienThoai_NguoiTuyenDung').value(data.SoDT_NguoiLienHe);
        $('#Email_NguoiTuyenDung').value(data.Email_NguoiLienhe);
        $('#NhanThongBaoSMS').value(data.NhanThongBaoSMSUngTuyen);
        $('#NhanThongBaoEmail').value(data.NhanThongBaoEmailUngTuyen);
        $('#HinhThucLienHeKhac_NguoiTuyenDung').value(data.NhanThongBaoKhac);
        $('#PhieuDKGTVLID').value(data.PhieuDKGTVLID);
        $('#ViecTimNguoiID').value(data.ViecTimNguoiID);
        var itemTC = `<li><span><b>${data.TenToChuc}</b> <b>(${data.MaToChuc})</b> - Địa chỉ: <b>${data.DiaChiToChuc}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
        $('.btn-select-tochuc').html(itemTC);
        $('.btn-select-tochuc').attr('value', data.ToChucID);
        $('#ToChucID_ChuHo').value(data.ToChucID);
        var listFiles_VanBan_US = [];
        $('#txtDinhKem').val(data.DinhKem);
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
            $('#DinhKem').ace_file_input('show_file_list', listFiles_VanBan_US);
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
        setTimeout(() => {
            $('#TinhID').value(data.DiaBanHCID_Tinh);
            $('#HuyenID').value(data.DiaBanHCID_Huyen);
            $('#XaID').value(data.DiaBanHCID_Xa);
            $('#ThonID').value(data.DiaBanHCID_Thon);
        }, 200);
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
}

$(document).on('click', '.btnSuaTT', function () {
    var ID = $(this).attr('data');
    SuaDuLieuViecTimNguoi(ID);
});

$('#btnExport').on('click', async function () {
    var saveData = new Array();
    saveData[0] = $('#TinhID_TimKiem_us').value();
    saveData[1] = $('#HuyenID_TimKiem_us').value();
    saveData[2] = $('#XaID_TimKiem_us').value();
    saveData[3] = $('#ThonID_TimKiem_us').value();
    saveData[4] = $('#timKiem').value();
    saveData[5] = $('#TuNgay_TimKiem_US').value();
    saveData[6] = $('#DenNgay_TimKiem_US').value();
    saveData[7] = $('#TenToChuc_TimKiem_US').value();
    saveData[8] = $('#MaSoThue_TimKiem_US').value();
    var kq = await NTS.getAjax('/QuanLy/PhieuDangKyCungUngLaoDong/XuatExcel_PhieuViecLam', { data: saveData });
    if (!kq.Err) {
        window.open(kq);
    } else {
        NTS.loi(kq.Msg);
    }
});

$(document).on('click', '.btnInMau03 ', function () {
    var ID = $(this).attr('data');
    XuatMau03(ID);
});

async function XuatMau03(ID) {
    var data = await NTS.getAjaxAsync('/QuanLy/PhieuDangKyCungUngLaoDong/XuatMau03PLI', { id: ID });
    //window.open(data);
    try {
        $('#divNoiDung_us').attr("src", data.replace(".docx", ".pdf"));
        $('#modal_xemtruockhiin_us').modal('show');
        $('#modal_taifile_us').show();
        $('#modal_taifile2_us').hide();
    } catch (ex) {

    }
}


$(document).on('click', '.btnInMau03a', function () {
    var ID = $(this).attr('data');
    XuatMau03a(ID);
});

async function XuatMau03a(ID) {
    var data = await NTS.getAjaxAsync('/QuanLy/PhieuDangKyCungUngLaoDong/XuatMau03aPLI', { id: ID });
    //window.open(data);
    try {
        $('#divNoiDung_us').attr("src", data.replace(".docx", ".pdf"));
        $('#modal_xemtruockhiin_us').modal('show');
        $('#modal_taifile_us').show();
        $('#modal_taifile2_us').hide();
    } catch (ex) {

    }
}

function formatCurrency(input) {
    // Remove any non-numeric characters except for the dot (.)
    let value = input.value.replace(/[^0-9]/g, '');

    // Remove leading zeros
    value = value.replace(/^0+/, '');

    // Format the value with periods (thousands separators)
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Set the formatted value back to the input field
    input.value = value;
}

Grid1.on("rowDblClick", function (e, row) {
    $('#PhieuDKGTVLID').val(row.getData().PhieuDKGTVLID);
    SuaDuLieuViecTimNguoi(row.getData().PhieuDKGTVLID);
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
