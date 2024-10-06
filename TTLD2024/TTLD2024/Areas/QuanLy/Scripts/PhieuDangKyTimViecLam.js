var textDiaChi_defaut = "";
var tempthem = "them";
var tempthemKinhNghiemLV = "them";
var tempthemDanhGia = "them";
var tenBangThamChieu = "PhieuDKTimViecLam";
$(function () {
    LoadTimKiem();
});

$(document).ready(function () {
    setTimeout(function () {
        PhanQuyenComBoDiaBan('TinhID_TimKiem_us', 'HuyenID_TimKiem_us', 'XaID_TimKiem_us', 'ThonID_TimKiem_us');
        LoadDataCombo();
    }, 200);
    NTS.hienNgayDauNamLenTextbox('TuNgay_TimKiem_US');
    NTS.hienNgayCuoiNamLenTextbox('DenNgay_TimKiem_US');
    ThietLapCotTrenLuoi(tenBangThamChieu, Grid1); // thiết lập cột trên lưới

    //Định dạng nhập xxxx.xxx.xxx cho số điện thoại
    $('#SoDiDong').on('input', function () {
        formatPhoneNumberNhap(this);
    });

    // Restrict input to numbers only
    $('#SoDiDong').on('keydown', function (event) {
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


function LoadDataCombo() {
    NTS.loadDataCombo({
        name: '#LoaiHinDNID',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_LoaiHinhNoiLV',
        columns: 1,
        indexValue: 0,
        indexText: 1,
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
        textShowTatCa: '',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#TinhID_TT, #TinhID_HN',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCTinh_Combo',
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#HuyenID_TT,#HuyenID_HN',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
        indexDefault: 3,
    });
    NTS.loadDataCombo({
        name: '#XaID_TT,#XaID_HN',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
        indexDefault: 3,
    });
    NTS.loadDataCombo({
        name: '#ThonID_TT,#ThonID_HN',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
        indexDefault: 3,
    });
    NTS.loadDataCombo({
        name: '#TrinhDoPTID',
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
        name: '#KyNangMem',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_TrinhDoKNMem',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#NgoaiNgu1,#NgoaiNgu2',
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
        name: '#QuocGiaID_LamViec',
        ajaxUrl: '/DanhMuc/DungChung/GetCombo_QuocGiaLVNuocNgoai',
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
        textShowTatCa: '',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#BacKyNangNghe',
        ajaxUrl: '/DanhMuc/DungChung/GetBac_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#CheDoPhucLoi',
        ajaxUrl: '/DanhMuc/DungChung/GetCheDoPhucLoi_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '',
        showTatCa: !0,
    });
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
        ajaxParam: { id: '' },
        columns: 1,
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#TinhID_UuTien1,#TinhID_UuTien2',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCTinh_Combo',
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#HuyenID_UuTien1',
        ajaxUrl: '/DanhMuc/DungChung/GetHuyenNoiLamViec_Combo',
        ajaxParam: { id: $('#TinhID_UuTien1').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#HuyenID_UuTien2',
        ajaxUrl: '/DanhMuc/DungChung/GetHuyenNoiLamViec_Combo',
        ajaxParam: { id: $('#TinhID_UuTien2').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
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
        name: '#KinhNghiemLamViecID',
        ajaxUrl: '/DanhMuc/DungChung/GetYeuCauKinhNghiem_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#LoaiHopDongLDID',
        ajaxUrl: '/DanhMuc/DungChung/GetLoaiHopDong_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#KhaNangDapUngID',
        ajaxUrl: '/DanhMuc/DungChung/GetKhaNangDapUng_Combo',
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
        name: '#SanSangLamViecID',
        ajaxUrl: '/DanhMuc/DungChung/GetSanSangLV_Combo',
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '',
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

//-----------------------Change tỉnh nơi làm việc-------------------------//
$(document).on('change', '#TinhID_UuTien1', function () {
    NTS.loadDataCombo({
        name: '#HuyenID_UuTien1',
        ajaxUrl: '/DanhMuc/DungChung/GetHuyenNoiLamViec_Combo',
        ajaxParam: { id: $('#TinhID_UuTien1').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
});

$(document).on('change', '#TinhID_UuTien2', function () {
    NTS.loadDataCombo({
        name: '#HuyenID_UuTien2',
        ajaxUrl: '/DanhMuc/DungChung/GetHuyenNoiLamViec_Combo',
        ajaxParam: { id: $('#TinhID_UuTien2').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
});
var fmDangKyDV = function (cell) {
    var ID = cell.getData().PhieuDKTimViecID;
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

function actionDropdownFormatter(cell, formatterParams, onRendered) {
    var ID = cell.getData().PhieuDKTimViecID;
    var TrangThai = cell.getData().TrangThai;
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
                    <a  class="dropdown-item btnInMau01 " href="#" data="${ID}">
                        In mẫu số 01/PLI Nghị định 23/2021/NĐ-CP
                   </a>
                    <a class="dropdown-item btnInMau01a " href="#" data="${ID}">
                        In mẫu số 01a/PLI Nghị định 23/2021/NĐ-CP
                   </a>
                    <a class="dropdown-item btnInGioiThieuVL " href="#" data="${ID}">
                        In mẫu phiếu giới thiệu việc làm
                   </a>
                </div>
       </div>
       </div>`;

    return select;
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
        { title: "Mã số", field: "MaSo", formatter: 'textarea', width: 100, vertAlign: "middle", headerHozAlign: "center", hozAlign: "left" },
        { title: "Ngày thu thập", field: "NgayThuThap", formatter: 'textarea', width: 120, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center" },
        { title: "Họ và tên", field: "HoVaTen", formatter: 'textarea', minWidth: 150, vertAlign: "middle",headerHozAlign: "center" },
        { title: "CCCD/CMND/Số định danh", field: "SoCCCD", formatter: 'textarea', vertAlign: "middle", minWidth: 120, headerHozAlign: "center", hozAlign: "left" },
        { title: "Ngày sinh", field: "NgaySinh", formatter: 'textarea', vertAlign: "middle", minWidth: 120, headerHozAlign: "center" },
        { title: "Giới tính", field: "TenGioiTinh", formatter: 'textarea',vertAlign: "middle", minWidth: 90, headerHozAlign: "center" },
        { title: "Đối tượng ưu tiên", field: "TenDoiTuongUuTien", formatter: 'textarea', minWidth: 250,vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trình độ học vấn", field: "TrinhDoHV", formatter: 'textarea', minWidth: 180,vertAlign: "middle", headerHozAlign: "center" },
        { title: "Chuyên môn kỹ thuật", field: "TrinhDoCMKT", formatter: 'textarea', minWidth: 180,vertAlign: "middle", headerHozAlign: "center" },
        { title: "Công việc cần tìm", field: "TenCongViec", formatter: 'textarea', minWidth: 180,vertAlign: "middle", headerHozAlign: "center" },
        { title: "Đăng ký dịch vụ", field: "TenDichVuDK", formatter: fmDangKyDV, vertAlign: "middle", minWidth: 250, headerHozAlign: "center" },
        { title: "PhieuDKTimViecID", field: "PhieuDKTimViecID", width: 0, visible: false }
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
    saveData[7] = $('#HoVaTen_TimKiem_US').value();
    saveData[8] = $('#SoCCCD_TimKiem_US').value();
    Grid1.clearData();
    const GetAll = await NTS.getAjaxAsync("/QuanLy/PhieuDangKyTimViecLam/GetAll", { data: saveData });
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.thongbaoloi(GetAll.Msg);
    GridKhongCoDuLieu("Grid1");
}

// Xem chi tiết nội dung ghi chú hộ gia đình
$(document).on('click', '.btnXemThemDangKyDV', function () {
    $('#PhieuDKGTVLID').val($(this).attr('data'));
    XemChiTietbtnXemThemDangKyDV($(this).attr('data'));
});

function XemChiTietbtnXemThemDangKyDV(ID) {
    $("#mdXemThem").modal('show');
    $('#tieuDeModalCT').text('Chi tiết nội dung đăng ký dịch vụ');
    const result = NTS.getAjax("/QuanLy/PhieuDangKyTimViecLam/DangKyDichVuCT", { id: ID });
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
    resetForm("#mdThemMoiViecLamMongMuon");
    resetForm("#mdKinhNghiemVaDKDichVu");
    NTS.hienNgayHienTaiLenTextbox('NgayNopHoSo');
    var item = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn đối tượng- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
    $('.btn-select-DoiTuongNN').html(item);
    $('.btn-select-DoiTuongNN').attr('value', '');
});
//-----------------------Change Hộ khẩu thường trú trong form thêm, sửa-------------------------//
$(document).on('change', '#TinhID_TT', function () {
    NTS.loadDataCombo({
        name: '#HuyenID_TT',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
        ajaxParam: { id: $('#TinhID_TT').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#XaID_TT',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: '' },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#ThonID_TT',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    //Change địa chỉ
    var DiaChi = $('#SoNha_TT').value().trim();
    if (DiaChi != '') {
        DiaChi = DiaChi + ', ';
    }
    var txtTinh = $('#TinhID_TT');
    var txtHuyen = $('#HuyenID_TT');
    var txtXa = $('#XaID_TT');  
    var txtThon = $('#ThonID_TT');

    if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
        if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
            if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                    $('#DiaChiThuongTru').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                } else {
                    $('#DiaChiThuongTru').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }
            } else {
                $('#DiaChiThuongTru').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
            }
        } else {
            $('#DiaChiThuongTru').value(DiaChi + txtTinh.select2('data')[0].text1);
        }
    } else {
        if (DiaChi != '') {
            $('#DiaChiThuongTru').value(DiaChi);
        }
        else {
            $('#DiaChiThuongTru').value(textDiaChi_defaut);
        }

    }
});
$(document).on('change', '#HuyenID_TT', function () {
    NTS.loadDataCombo({
        name: '#XaID_TT',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: $('#HuyenID_TT').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#ThonID_TT',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    //Change địa chỉ
    var DiaChi = $('#SoNha_TT').value().trim();
    if (DiaChi != '') {
        DiaChi = DiaChi + ', ';
    }
    var txtTinh = $('#TinhID_TT');
    var txtHuyen = $('#HuyenID_TT');
    var txtXa = $('#XaID_TT');
    var txtThon = $('#ThonID_TT');

    if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
        if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
            if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                    $('#DiaChiThuongTru').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                } else {
                    $('#DiaChiThuongTru').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }
            } else {
                $('#DiaChiThuongTru').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
            }
        } else {
            $('#DiaChiThuongTru').value(DiaChi + txtTinh.select2('data')[0].text1);
        }
    } else {
        if (DiaChi != '') {
            $('#DiaChiThuongTru').value(DiaChi);
        }
        else {
            $('#DiaChiThuongTru').value(textDiaChi_defaut);
        }

    }
});
$(document).on('change', '#XaID_TT', function () {
    NTS.loadDataCombo({
        name: '#ThonID_TT',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: $('#XaID_TT').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    //Change địa chỉ
    var DiaChi = $('#SoNha_TT').value().trim();
    if (DiaChi != '') {
        DiaChi = DiaChi + ', ';
    }
    var txtTinh = $('#TinhID_TT');
    var txtHuyen = $('#HuyenID_TT');
    var txtXa = $('#XaID_TT');
    var txtThon = $('#ThonID_TT');

    if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
        if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
            if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                    $('#DiaChiThuongTru').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                } else {
                    $('#DiaChiThuongTru').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }
            } else {
                $('#DiaChiThuongTru').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
            }
        } else {
            $('#DiaChiThuongTru').value(DiaChi + txtTinh.select2('data')[0].text1);
        }
    } else {
        if (DiaChi != '') {
            $('#DiaChiThuongTru').value(DiaChi);
        }
        else {
            $('#DiaChiThuongTru').value(textDiaChi_defaut);
        }

    }
});

$(document).on('change', '#ThonID_TT', function () {
    //Change địa chỉ
    var DiaChi = $('#SoNha_TT').value().trim();
    if (DiaChi != '') {
        DiaChi = DiaChi + ', ';
    }
    var txtTinh = $('#TinhID_TT');
    var txtHuyen = $('#HuyenID_TT');
    var txtXa = $('#XaID_TT');
    var txtThon = $('#ThonID_TT');

    if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
        if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
            if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                    $('#DiaChiThuongTru').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                } else {
                    $('#DiaChiThuongTru').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }
            } else {
                $('#DiaChiThuongTru').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
            }
        } else {
            $('#DiaChiThuongTru').value(DiaChi + txtTinh.select2('data')[0].text1);
        }
    } else {
        if (DiaChi != '') {
            $('#DiaChiThuongTru').value(DiaChi);
        }
        else {
            $('#DiaChiThuongTru').value(textDiaChi_defaut);
        }

    }
});

$('#SoNha_TT').on('input', function () {
    //Change địa chỉ
    var DiaChi = $('#SoNha_TT').value().trim();
    if (DiaChi != '') {
        DiaChi = DiaChi + ', ';
    }
    var txtTinh = $('#TinhID_TT');
    var txtHuyen = $('#HuyenID_TT');
    var txtXa = $('#XaID_TT');
    var txtThon = $('#ThonID_TT');

    if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
        if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
            if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                    $('#DiaChiThuongTru').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                } else {
                    $('#DiaChiThuongTru').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }
            } else {
                $('#DiaChiThuongTru').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
            }
        } else {
            $('#DiaChiThuongTru').value(DiaChi + txtTinh.select2('data')[0].text1);
        }
    } else {
        if (DiaChi != '') {
            $('#DiaChiThuongTru').value(DiaChi);
        }
        else {
            $('#DiaChiThuongTru').value(textDiaChi_defaut);
        }

    }

});
//-----------------------Change Hộ khẩu hiện nay trong form thêm, sửa-------------------------/ /
$(document).on('change', '#TinhID_HN', function () {
    NTS.loadDataCombo({
        name: '#HuyenID_HN',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
        ajaxParam: { id: $('#TinhID_HN').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#XaID_HN',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: '' },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#ThonID_HN',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    //Change địa chỉ
    var DiaChi = $('#SoNha_HN').value().trim();
    if (DiaChi != '') {
        DiaChi = DiaChi + ', ';
    }
    var txtTinh = $('#TinhID_HN');
    var txtHuyen = $('#HuyenID_HN');
    var txtXa = $('#XaID_HN');
    var txtThon = $('#ThonID_HN');

    if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
        if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
            if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                    $('#DiaChiThuongTruHN').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                } else {
                    $('#DiaChiThuongTruHN').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }

            } else {
                $('#DiaChiThuongTruHN').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
            }
        } else {
            $('#DiaChiThuongTruHN').value(DiaChi + txtTinh.select2('data')[0].text1);
        }
    } else {
        if (DiaChi != '') {
            $('#DiaChiThuongTruHN').value(DiaChi);
        }
        else {
            $('#DiaChiThuongTruHN').value(textDiaChi_defaut);
        }

    }
});
$(document).on('change', '#HuyenID_HN', function () {
    NTS.loadDataCombo({
        name: '#XaID_HN',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: $('#HuyenID_HN').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    //Change địa chỉ
    NTS.loadDataCombo({
        name: '#ThonID_HN',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    //Change địa chỉ
    var DiaChi = $('#SoNha_HN').value().trim();
    if (DiaChi != '') {
        DiaChi = DiaChi + ', ';
    }
    var txtTinh = $('#TinhID_HN');
    var txtHuyen = $('#HuyenID_HN');
    var txtXa = $('#XaID_HN');
    var txtThon = $('#ThonID_HN');

    if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
        if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
            if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                    $('#DiaChiThuongTruHN').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                } else {
                    $('#DiaChiThuongTruHN').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }

            } else {
                $('#DiaChiThuongTruHN').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
            }
        } else {
            $('#DiaChiThuongTruHN').value(DiaChi + txtTinh.select2('data')[0].text1);
        }
    } else {
        if (DiaChi != '') {
            $('#DiaChiThuongTruHN').value(DiaChi);
        }
        else {
            $('#DiaChiThuongTruHN').value(textDiaChi_defaut);
        }

    }
});
$(document).on('change', '#XaID_HN', function () {

    NTS.loadDataCombo({
        name: '#ThonID_HN',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: $('#XaID_HN').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });

    //Change địa chỉ
    var DiaChi = $('#SoNha_HN').value().trim();
    if (DiaChi != '') {
        DiaChi = DiaChi + ', ';
    }
    var txtTinh = $('#TinhID_HN');
    var txtHuyen = $('#HuyenID_HN');
    var txtXa = $('#XaID_HN');
    var txtThon = $('#ThonID_HN');

    if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
        if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
            if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                    $('#DiaChiThuongTruHN').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                } else {
                    $('#DiaChiThuongTruHN').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }

            } else {
                $('#DiaChiThuongTruHN').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
            }
        } else {
            $('#DiaChiThuongTruHN').value(DiaChi + txtTinh.select2('data')[0].text1);
        }
    } else {
        if (DiaChi != '') {
            $('#DiaChiThuongTruHN').value(DiaChi);
        }
        else {
            $('#DiaChiThuongTruHN').value(textDiaChi_defaut);
        }

    }
});
$(document).on('change', '#ThonID_HN', function () {   

    //Change địa chỉ
    var DiaChi = $('#SoNha_HN').value().trim();
    if (DiaChi != '') {
        DiaChi = DiaChi + ', ';
    }
    var txtTinh = $('#TinhID_HN');
    var txtHuyen = $('#HuyenID_HN');
    var txtXa = $('#XaID_HN');
    var txtThon = $('#ThonID_HN');

    if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
        if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
            if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                    $('#DiaChiThuongTruHN').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                } else {
                    $('#DiaChiThuongTruHN').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }

            } else {
                $('#DiaChiThuongTruHN').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
            }
        } else {
            $('#DiaChiThuongTruHN').value(DiaChi + txtTinh.select2('data')[0].text1);
        }
    } else {
        if (DiaChi != '') {
            $('#DiaChiThuongTruHN').value(DiaChi);
        }
        else {
            $('#DiaChiThuongTruHN').value(textDiaChi_defaut);
        }

    }
});

$('#SoNha_HN').on('input', function () {
    //Change địa chỉ
    var DiaChi = $('#SoNha_HN').value().trim();
    if (DiaChi != '') {
        DiaChi = DiaChi + ', ';
    }
    var txtTinh = $('#TinhID_HN');
    var txtHuyen = $('#HuyenID_HN');
    var txtXa = $('#XaID_HN');
    var txtThon = $('#ThonID_HN');

    if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
        if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
            if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                    $('#DiaChiThuongTruHN').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                } else {
                    $('#DiaChiThuongTruHN').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }

            } else {
                $('#DiaChiThuongTruHN').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
            }
        } else {
            $('#DiaChiThuongTruHN').value(DiaChi + txtTinh.select2('data')[0].text1);
        }
    } else {
        if (DiaChi != '') {
            $('#DiaChiThuongTruHN').value(DiaChi);
        }
        else {
            $('#DiaChiThuongTruHN').value(textDiaChi_defaut);
        }

    }

});
//-----------------------Thay đổi trình độ ngoại ngữ 1-----------------------------------//
$(document).on('change', '#NgoaiNgu1_Tot', function () {
    if ($('#NgoaiNgu1_Tot').value() == true) {
        $('#NgoaiNgu1_Kha').value(0);
        $('#NgoaiNgu1_TrungBinh').value(0);
    } else {
        
    }
})
$(document).on('change', '#NgoaiNgu1_Kha', function () {
    if ($('#NgoaiNgu1_Kha').value() == true) {
        $('#NgoaiNgu1_Tot').value(0);
        $('#NgoaiNgu1_TrungBinh').value(0);
    } else {

    }
})
$(document).on('change', '#NgoaiNgu1_TrungBinh', function () {
    if ($('#NgoaiNgu1_TrungBinh').value() == true) {
        $('#NgoaiNgu1_Tot').value(0);
        $('#NgoaiNgu1_Kha').value(0);
    } else {

    }
})
//-----------------------Thay đổi trình độ ngoại ngữ 2-----------------------------------//
$(document).on('change', '#NgoaiNgu2_Tot', function () {
    if ($('#NgoaiNgu2_Tot').value() == true) {
        $('#NgoaiNgu2_Kha').value(0);
        $('#NgoaiNgu2_TrungBinh').value(0);
    } else {

    }
})
$(document).on('change', '#NgoaiNgu2_Kha', function () {
    if ($('#NgoaiNgu2_Kha').value() == true) {
        $('#NgoaiNgu2_Tot').value(0);
        $('#NgoaiNgu2_TrungBinh').value(0);
    } else {

    }
})
$(document).on('change', '#NgoaiNgu2_TrungBinh', function () {
    if ($('#NgoaiNgu2_TrungBinh').value() == true) {
        $('#NgoaiNgu2_Tot').value(0);
        $('#NgoaiNgu2_Kha').value(0);
    } else {

    }
})

//-----------------------Thay đổi trình độ tin học văn phòng-----------------------------------//
$(document).on('change', '#ChungChiTinHocVP_Tot', function () {
    if ($('#ChungChiTinHocVP_Tot').value() == true) {
        $('#ChungChiTinHocVP_Kha').value(0);
        $('#ChungChiTinHocVP_TrungBinh').value(0);
    } else {

    }
})
$(document).on('change', '#ChungChiTinHocVP_Kha', function () {
    if ($('#ChungChiTinHocVP_Kha').value() == true) {
        $('#ChungChiTinHocVP_Tot').value(0);
        $('#ChungChiTinHocVP_TrungBinh').value(0);
    } else {

    }
})
$(document).on('change', '#ChungChiTinHocVP_TrungBinh', function () {
    if ($('#ChungChiTinHocVP_TrungBinh').value() == true) {
        $('#ChungChiTinHocVP_Tot').value(0);
        $('#ChungChiTinHocVP_Kha').value(0);
    } else {

    }
})
//-----------------------Thay đổi trình độ tin học khác-----------------------------------//
$(document).on('change', '#ChungChiTinHocKhac_Tot', function () {
    if ($('#ChungChiTinHocKhac_Tot').value() == true) {
        $('#ChungChiTinHocKhac_Kha').value(0);
        $('#ChungChiTinHocKhac_TrungBinh').value(0);
    } else {

    }
})
$(document).on('change', '#ChungChiTinHocKhac_Kha', function () {
    if ($('#ChungChiTinHocKhac_Kha').value() == true) {
        $('#ChungChiTinHocKhac_Tot').value(0);
        $('#ChungChiTinHocKhac_TrungBinh').value(0);
    } else {

    }
})
$(document).on('change', '#ChungChiTinHocKhac_TrungBinh', function () {
    if ($('#ChungChiTinHocKhac_TrungBinh').value() == true) {
        $('#ChungChiTinHocKhac_Tot').value(0);
        $('#ChungChiTinHocKhac_Kha').value(0);
    } else {

    }
})

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
        && ($('#select2-TrinhDoPTID-container').text().search('THCS') == -1
            && $('#select2-TrinhDoPTID-container').text().search('THPT') == -1))) {
        $('#TrinhDoCMKTID').value('');
        NTS.canhbao("Trình độ GDPT từ Tốt nghiệp THCS trở lên mới học được trung cấp!");
        return;
    }
    if ((($('#select2-TrinhDoCMKTID-container').text().search('Đại học') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Cao đẳng') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Thạc sĩ') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Tiến sĩ') != -1)
        && ($('#select2-TrinhDoPTID-container').text().search('THPT') == -1))) {
        $('#TrinhDoCMKTID').value('');
        NTS.canhbao("Trình độ GDPT từ Tốt nghiệp THPT mới học được cao đẳng, đại học, thạc sĩ, tiến sĩ!");
        return;
    }
});

$(document).on('select2:select', '#TrinhDoPTID', function () {
    if ((($('#select2-TrinhDoCMKTID-container').text().search('Trung cấp') != -1)
        && ($('#select2-TrinhDoPTID-container').text().search('Tốt nghiệp THCS') == -1
            && $('#select2-TrinhDoPTID-container').text().search('Tốt nghiệp THPT') == -1))) {
        $('#TrinhDoCMKTID').value('');
        NTS.canhbao("Trình độ GDPT từ Tốt nghiệp THCS trở lên mới học được trung cấp!");
        return;
    }
    if ((($('#select2-TrinhDoCMKTID-container').text().search('Đại học') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Cao đẳng') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Thạc sĩ') != -1
        || $('#select2-TrinhDoCMKTID-container').text().search('Tiến sĩ') != -1)
        && ($('#select2-TrinhDoPTID-container').text().search('Tốt nghiệp THPT') == -1))) {
        $('#TrinhDoCMKTID').value('');
        NTS.canhbao("Trình độ GDPT từ Tốt nghiệp THPT mới học được cao đẳng, đại học, thạc sĩ, tiến sĩ!");
        return;
    }

});

//-------------------Giống hộ khẩu thường trú------------------//
$(document).on('change', '#GiongHoKhauThuongTru', function () {
    //Lấy dữ liệu input
    var checkbox = $('#GiongHoKhauThuongTru').value();
    if (checkbox == true) {
        $('#TinhID_HN').value($('#TinhID_TT').value());
        $('#HuyenID_HN').value($('#HuyenID_TT').value());
        $('#XaID_HN').value($('#XaID_TT').value());
        $('#ThonID_HN').value($('#ThonID_TT').value());
        $('#SoNha_HN').value($('#SoNha_TT').value());
        //Change địa chỉ
        var DiaChi = $('#SoNha_HN').value().trim();
        if (DiaChi != '') {
            DiaChi = DiaChi + ', ';
        }
        var txtTinh = $('#TinhID_HN');
        var txtHuyen = $('#HuyenID_HN');
        var txtXa = $('#XaID_HN');
        var txtThon = $('#ThonID_HN');

        if (txtTinh.select2('data')[0].text1 != '-Chọn-') {
            if (txtHuyen.select2('data')[0].text1 != '-Chọn-') {
                if (txtXa.select2('data')[0].text1 != '-Chọn-') {
                    if (txtThon.select2('data')[0].text1 != '-Chọn-') {
                        $('#DiaChiThuongTruHN').value(DiaChi + txtThon.select2('data')[0].text1 + ', ' + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                    } else {
                        $('#DiaChiThuongTruHN').value(DiaChi + txtXa.select2('data')[0].text1 + ', ' + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                    }
                } else {
                    $('#DiaChiThuongTruHN').value(DiaChi + txtHuyen.select2('data')[0].text1 + ', ' + txtTinh.select2('data')[0].text1);
                }
            } else {
                $('#DiaChiThuongTruHN').value(DiaChi + txtTinh.select2('data')[0].text1);
            }
        } else {
            if (DiaChi != '') {
                $('#DiaChiThuongTruHN').value(DiaChi);
            } else {
                $('#DiaChiThuongTruHN').value(textDiaChi_defaut);
            }
        }
    } else {

    }
});
//---------------------------------Form bước 2---------------------------------
$(document).on('click', '#btnTiepTuc_ViecMongMuon', function () {
    //setTimeout(() => { GridKinhNghiemLamViec.redraw(true); }, 500);
    const validate = new NTSValidate('#mdThemMoi');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }

    if ($('#SelectDoiTuongNN_US').attr('value') == "") {
        NTS.canhbao('Đối tượng không được bỏ trống!');
        return false;
    }

    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#PhieuDKTimViecID').value();
    saveData[2] = $('#MaSo').value();
    saveData[3] = $('#NgayNopHoSo').value();
    saveData[4] = $('#SelectDoiTuongNN_US').attr('value');
    saveData[5] = JSON.stringify($('#DoiTuongUuTienID').value());
    saveData[6] = $('#SoDiDong').value();
    saveData[7] = $('#Email').value();
    saveData[8] = $('#TinhID_TT').value();
    saveData[9] = $('#HuyenID_TT').value();
    saveData[10] = $('#XaID_TT').value();
    saveData[11] = $('#ThonID_TT').value();
    saveData[12] = $('#SoNha_TT').value();
    saveData[13] = $('#DiaChiThuongTru').value();
    saveData[14] = $('#TinhID_HN').value();
    saveData[15] = $('#HuyenID_HN').value();
    saveData[16] = $('#XaID_HN').value();
    saveData[17] = $('#ThonID_HN').value();
    saveData[18] = $('#SoNha_HN').value();
    saveData[19] = $('#DiaChiThuongTruHN').value();
    saveData[20] = $('#TrinhDoPTID').value();
    saveData[21] = $('#TrinhDoCMKTID').value();
    saveData[22] = $('#ChuyenNganhDTID').value();
    saveData[23] = $('#TrinhDoCMKTID_Khac').value();
    saveData[24] = $('#ChuyenNganhDaoID_Khac').value();
    saveData[25] = $('#TrinhDoKyNangNgheID').value();
    saveData[26] = $('#BacKyNangNghe').value();
    saveData[27] = $('#NgoaiNgu1').value();
    var DanhGiaNgoaiNgu1;
    if ($('#NgoaiNgu1_Tot').value() == true) {
        DanhGiaNgoaiNgu1 = "1";
    } else if ($('#NgoaiNgu1_Kha').value() == true) {
        DanhGiaNgoaiNgu1 = "2";
    } else if ($('#NgoaiNgu1_TrungBinh').value() == true) {
        DanhGiaNgoaiNgu1 = "3";
    } else {
        DanhGiaNgoaiNgu1 = "0";
    }
    saveData[28] = DanhGiaNgoaiNgu1;
    saveData[29] = $('#NgoaiNgu2').value();
    var DanhGiaNgoaiNgu2;
    if ($('#NgoaiNgu2_Tot').value() == true) {
        DanhGiaNgoaiNgu2 = "1";
    } else if ($('#NgoaiNgu2_Kha').value() == true) {
        DanhGiaNgoaiNgu2 = "2";
    } else if ($('#NgoaiNgu2_TrungBinh').value() == true) {
        DanhGiaNgoaiNgu2 = "3";
    } else {
        DanhGiaNgoaiNgu2 = "0";
    }
    saveData[30] = DanhGiaNgoaiNgu2;
    saveData[31] = $('#TinHocVP').value();
    var DanhGiaTinHoc;
    if ($('#ChungChiTinHocVP_Tot').value() == true) {
        DanhGiaTinHoc = "1";
    } else if ($('#ChungChiTinHocVP_Kha').value() == true) {
        DanhGiaTinHoc = "2";
    } else if ($('#ChungChiTinHocVP_TrungBinh').value() == true) {
        DanhGiaTinHoc = "3";
    } else {
        DanhGiaTinHoc = "0";
    }
    saveData[32] = DanhGiaTinHoc;
    saveData[33] = $('#TinHocKhac').value();
    var DanhGiaTinHocKhac;
    if ($('#ChungChiTinHocKhac_Tot').value() == true) {
        DanhGiaTinHocKhac = "1";
    } else if ($('#ChungChiTinHocKhac_Kha').value() == true) {
        DanhGiaTinHocKhac = "2";
    } else if ($('#ChungChiTinHocKhac_TrungBinh').value() == true) {
        DanhGiaTinHocKhac = "3";
    } else {
        DanhGiaTinHocKhac = "0";
    }
    saveData[34] = DanhGiaTinHocKhac;
    saveData[35] = JSON.stringify($('#KyNangMem').value());
    saveData[36] = $('#KyNangMemKhac').value();
    saveData[37] = $('#ChungChiNgoaiNgu2').value();
    saveData[38] = $('#ChungChiNgoaiNgu1').value();
    var result = NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/LuuThongTinBuocMot', { data: saveData });
    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        if (tempthem == 'them') {
            $('#NguoiTimViecID').value(result.Result.split("_")[0]);
            $('#MaSoNguoiTimViec').value(result.Result.split("_")[1]);
            tempthem = 'sua';
        }
        $('#mdThemMoi').modal('hide');
        $('#mdKinhNghiemVaDKDichVu').modal('show');
        LoadDataTableKinhNghiemLV($('#NguoiTimViecID').value());
        LoadDataTableDanhGia($('#NguoiTimViecID').value());
        return false;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});

//---------------------------------Quay lại bước 2---------------------------------
$(document).on('click', '#btnQuayLaiBuoc2', function () {
    $('#mdThemMoiViecLamMongMuon').modal('hide');
    $('#mdKinhNghiemVaDKDichVu').modal('show');
});
//---------------------------------Hiển thị modal chọn việc làm---------------------------------
$(document).on('click', '#HienThiViecLam', function () {
    show_ModalChonViecLam();
});
//---------------------------------Thêm kinh nghiệm làm việc---------------------------------
$(document).on('click', '#btnThemKinhNghiemLamViec', function () {
    tempthemKinhNghiemLV = "them";
    show_ModalKinhNghiemLamViec();
});

//---------------------------------Thêm đánh giá dịch vụ tư vấn---------------------------------
$(document).on('click', '#btnThemDanhGia', function () {
    show_ModalDichVuTuVan();
});

var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().KinhNghiemLVUngVienID);
}
//-------------------Grid kinh nghiệm làm việc---------------//
var GridKinhNghiemLamViec = new Tabulator("#GridKinhNghiemLamViec", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: '250px',
    columns: [
        {
            title: "<button id='btnThemKinhNghiemLamViec' class='btn btn-xs btn-primary' style='background-color: #f3f4f5;font-size: 20px;'><i class='fa fa-plus' aria-hidden='true' style='color: var(--tbl-btn-luuvadong);'></i></button>",
            field: "actions",
            formatter: fmThaoTac, width: 60, headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", headerSort: false
        },
        { title: "Tên đơn vị", field: "TenCongTy", formatter: 'textarea', vertAlign: "middle", minWidth: 70, headerHozAlign: "center", hozAlign: "left" },
        { title: "Chức vụ", field: "ChucDanh", formatter: 'textarea', vertAlign: "middle", minWidth: 70, headerHozAlign: "center", hozAlign: "left" },
        { title: "Công việc chính", field: "TenCongViecChinh", formatter: 'textarea', minWidth: 70, vertAlign: "middle", headerHozAlign: "center", hozAlign: "left" },
        { title: "Thời gian", field: "ThoiGian", formatter: 'textarea', vertAlign: "middle", minWidth: 120, headerHozAlign: "center", hozAlign: "center" },
        { title: "KinhNghiemLVUngVienID", field: "KinhNghiemLVUngVienID", visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});


function LoadDataTableKinhNghiemLV(ID) {
    GridKinhNghiemLamViec.clearData();
    const GetAll = NTS.getAjax("/QuanLy/PhieuDangKyTimViecLam/GetAllKinhNghiemLV", { id: ID });
    if (!GetAll.Err) {
        GridKinhNghiemLamViec.setData(GetAll.Result);
        $('#GridKinhNghiemLamViec .tabulator-page-size option:first-child').prop('selected', true);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}


//---------------------------------Đóng modal---------------------------------
$(document).on('click', '#btnLuuKNLV_us', function () {
    const validate = new NTSValidate('#mdKinhNghiemLamViec_us');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }

    var saveData = new Array();
    saveData[0] = tempthemKinhNghiemLV;
    saveData[1] = $('#NguoiTimViecID').value();
    saveData[2] = $('#TuNgay_KinhNghiemLV').value();
    saveData[3] = $('#DenNgay_KinhNghiemLV').value();
    saveData[4] = $('#TenDonVi_USKNLV').value();
    saveData[5] = $('#ChucVuID_USChonViecLam').value();
    saveData[6] = $('#CongViecChinh_USChonViecLam').value();
    saveData[7] = $('#KinhNghiemLVUngVienID').value();
    var result = NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/LuuThongTinKinhNghiemLV', { data: saveData });
    if (!result.Err) {
        LoadDataTableKinhNghiemLV($('#NguoiTimViecID').value());
        NTS.thanhcong(result.Msg);
        $('#mdKinhNghiemLamViec_us').modal('hide');
        return false;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});


function SuaDuLieuKinhNghiemLV(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#tieuDeKinhNghiemLamViec_us').text('Cập nhật thông tin kinh nghiệm làm việc');
    const result = NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/LoadDuLieuSuaKinhNghiemLV', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#NguoiTimViecID').value(data.NguoiTimViecID);
        $('#TuNgay_KinhNghiemLV').value(data.TuNgay);
        $('#DenNgay_KinhNghiemLV').value(data.DenNgay);
        $('#TenDonVi_USKNLV').value(data.TenCongTy);
        $('#ChucVuID_USChonViecLam').value(data.ChucDanh);
        $('#CongViecChinh_USChonViecLam').value(data.TenCongViecChinh);
        $('#KinhNghiemLVUngVienID').value(data.KinhNghiemLVUngVienID);
        $('#mdKinhNghiemLamViec_us').modal('show');
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthemKinhNghiemLV = 'sua';
}



function XoaDuLieuKinhNghiemLV(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'KinhNghiemLVUngVienID', ID: ID, TenBangHienTai: 'KinhNghiemLVUngVien', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/XoaDuLieuKinhNghiemLV', { id: ID });
                if (!result.Err) {
                    LoadDataTableKinhNghiemLV($('#NguoiTimViecID').value());
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

$(document).on('click', '.btnSuaGrid1', function () {
    SuaDuLieuKinhNghiemLV($(this).attr('data'));
});

$(document).on('click', '.btnXoaGrid1', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieuKinhNghiemLV(ID);
});

//-------------------Grid đánh giá---------------//
function formaterbtnThaoTacDanhGia(ID) {
    return `<div class="show-or-hide"><a class='text-primary btnSuaGridDanhGia' title="Sửa" data='${ID}'><i class="fa fa-pencil"></i></a></b>&ensp;<a class='text-danger btnXoaGridDanhGia' title="Xoá" data='${ID}'><i class='fa fa-trash-o'></i></a></div>`;
};
var fmThaoTacDanhGia = function (cell) {
    return formaterbtnThaoTacDanhGia(cell.getData().DanhGiaTVDVID);
}

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
            formatter: fmThaoTacDanhGia, width: 60, headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", headerSort: false
        },
        { title: "STT", field: "STT", formatter: 'textarea', vertAlign: "middle", width: 80, headerHozAlign: "center", hozAlign: "left" },
        { title: "Nội dung", field: "NoiDung", formatter: 'textarea', vertAlign: "middle", minWidth: 70, headerHozAlign: "left" },
        { title: "Đánh giá", field: "DanhGia", formatter: 'textarea', minWidth: 70, vertAlign: "middle", headerHozAlign: "left" },
        { title: "Nhận xét", field: "NhanXet", formatter: 'textarea', vertAlign: "middle", minWidth: 120, headerHozAlign: "center", hozAlign: "center" },
        { title: "DanhGiaTVDVID", field: "DanhGiaTVDVID", visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataTableDanhGia(ID) {
    GridDanhGia.clearData();
    const GetAll = NTS.getAjax("/QuanLy/PhieuDangKyTimViecLam/GetAllDanhGia", { id: ID });
    if (!GetAll.Err) {
        GridDanhGia.setData(GetAll.Result);
        $('#GridDanhGia .tabulator-page-size option:first-child').prop('selected', true);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

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

$(document).on('change', '#CongViecChinh_USChonViecLam', function () {
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

$(document).on('click', '#btnLuuDichVuTuVan_us', function () {
    const validate = new NTSValidate('#mdDichVuTuVan_us');
    // Check validations
    if (!validate.trim().check() || !validate.trim().checkSpecial()) {
        return false;
    }

    var saveDataDanhGia = new Array();
    saveDataDanhGia[0] = tempthemDanhGia;
    saveDataDanhGia[1] = $('#DanhGiaTVDVID').value();
    saveDataDanhGia[2] = $('#NguoiTimViecID').value();
    saveDataDanhGia[3] = $('#STT_USDichVuTuVan').value();
    saveDataDanhGia[4] = $('#DanhGia_USChonViecLam').value();
    saveDataDanhGia[5] = $('#NhanXet_USChonViecLam').value();
    saveDataDanhGia[6] = $('#CongViecChinh_USChonViecLamID').value();
    saveDataDanhGia[7] = $('#CongViecChinh_USChonViecLamValue').value();
    var result = NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/LuuThongTinDanhGia', { data: saveDataDanhGia });
    if (!result.Err) {
        LoadDataTableDanhGia($('#NguoiTimViecID').value());
        NTS.thanhcong(result.Msg);
        $('#mdDichVuTuVan_us').modal('hide');
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;

});

function SuaDuLieuDanhGia(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#CongViecChinh_USChonViecLamID').value('');
    $('#CongViecChinh_USChonViecLamValue').value('');
    $('#tieuDeDichVuTuVan_us').text('Cập nhật thông tin đánh giá chất lượng sử dụng dịch vụ tư vấn');
    $('#mdDichVuTuVan_us').modal('show');
    const result = NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/LoadDuLieuSuaDanhGia', { id: ID });
    if (!result.Err) {
        let data = result.Result[0];
        $('#DanhGiaTVDVID').value(data.DanhGiaTVDVID);
        $('#STT_USDichVuTuVan').value(data.STT);
        $('#DanhGia_USChonViecLam').value(data.DanhGia);
        $('#CongViecChinh_USChonViecLamValue').value(data.NoiDung);
        $('#CongViecChinh_USChonViecLamID').value(data.DichVuDKID);
        $('#NhanXet_USChonViecLam').value(data.NhanXet);
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    tempthemDanhGia = 'sua';
}

function XoaDuLieuDanhGia(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'DanhGiaTVDVID', ID: ID, TenBangHienTai: 'DanhGiaTVDV', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/XoaDuLieuDanhGia', { id: ID });
                if (!result.Err) {
                    LoadDataTableDanhGia($('#NguoiTimViecID').value());
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


$(document).on('click', '.btnSuaGridDanhGia', function () {
    var ID = $(this).attr('data');
    SuaDuLieuDanhGia(ID);
});

$(document).on('click', '.btnXoaGridDanhGia', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieuDanhGia(ID);
});


//---------------------Đính kèm văn bằng, chứng chỉ---------------------------///
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
        if (positionRemoveItiemHS.includes(i) == false) {
            test.append(files[i].name, files[i]);
        }
    }
    positionRemoveItiemHS = [];
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
    var emptyFileListHS = new DataTransfer().files;

    // Gán FileList rỗng vào dữ liệu jQuery
    $($('#HoSoKemTheo_USDangKy').get(0)).data('ace_input_files', emptyFileListHS);
    return result;
}
$('#HoSoKemTheo_USDangKy').on('change', function () {
    var selectedFiles = this.files;

    // Kiểm tra và xử lý tệp đã chọn ở đây
    for (var i = 0; i < selectedFiles.length; i++) {
        var fileName = selectedFiles[i].name;
        var fileType = fileName.split('.').pop().toLowerCase();
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
var old_ItemFileHS = "";
$('#HoSoKemTheo_USDangKy').ace_file_input({
    style: 'well',
    btn_choose: 'Nhấn để chọn tệp hoặc kéo thả vào đây (Cho phép đính kèm các file có định dạng DOC, PDF, PNG, JPG, JPEG)',
    btn_change: null,
    no_icon: 'ace-icon fa fa-cloud-upload',
    droppable: true,
    thumbnail: 'large',
    allowExt: ["jpeg", "jpg", "png", "gif", "pdf"]
    , alter_change: function ChangeItem() {
        return false;
    }
    , before_change: function (files, dropped) {
        return true;
    },
    preview_error: function (filename, error_code) {
    }
    , before_remove: function RemoveALl() {
        RemoveAllFileInputAceHS();
    }
}).on('change', function () {

    //Trước khi load các file đã tồn tại trước đó cần gắn dấu X trước
    $('.ace-file-name').each(function () {
        // Sử dụng find() để kiểm tra xem có thẻ '<i class="ace-icon fa fa-times XoaFileDinhKem btn-del-item" onclick="return false"></i>' hay không
        var hasIcon = $(this).find('i.ace-icon.fa.fa-times.XoaFileDinhKemHS.btn-del-item').length > 0;

        // Kiểm tra kết quả và thực hiện các hành động cần thiết
        if (hasIcon) {
            // da ton tai dau X
        } else {
            // khong ton tai dau x
            $('.ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKemHS btn-del-item" onclick="return false"></i>');
        }
    });
    //Load các file đã upload vào db
    if ($(old_ItemFileHS[0]).attr("data-title") != 'No File ...') {
        $('.ace-file-container').append(old_ItemFileHS);
    }
    //Gắn thêm dấu x xóa từng file
    //các file trước đó đã có trong csdl
    if ($('.ace-file-name').children().hasClass('XoaFileDinhKemHS')) {
        // Có class "XoaFileDinhKem"
    } else {
        // Không "XoaFileDinhKem"
        $('.ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKemHS btn-del-item" onclick="return false"></i>');
        //File thêm mới
        $('.ace-file-name.large').append('<i class=" ace-icon fa fa-times XoaFileDinhKemHS btn-del-item " onclick="return false"></i>');

    }

    return false;
});
var file_inputHS = $('#HoSoKemTheo_USDangKy');
file_inputHS.ace_file_input('reset_input');
file_inputHS
    .off('file.error.ace')
    .on('file.error.ace', function (e, info) {
    });

function RemoveAllFileInputAceHS() {
    var bang = "NguoiTimViec";
    var cot = "NguoiTimViecID";

    CanhBaoXoa(() => {
        var result = NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/XoaDinhKemHoSo', { ID: $('#NguoiTimViecID').val(), duongDan: '', bangDk: bang, cotDk: cot, loai: 'all' });
        if (!result.Err) {
            NTS.thanhcong(result.Msg);
            $('#txtHoSoKemTheo_USDangKy').value("");
            ResetDinhKemFile();
            old_ItemFileHS = "";
            //$('#txtDinhKem_VanBan_US').value($('#txtDinhKem_VanBan_US').value().replaceAll(ListFile[i], '').replaceAll('**', '*'));
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}
var positionRemoveItiemHS = new Array();
$(document).on('click', '.XoaFileDinhKemHS', function () {
    var ToKhaiID = $('#NguoiTimViecID').value();
    var TenFile = $(this).parent().attr('data-title');
    var ListFile = $('#txtHoSoKemTheo_USDangKy').value().split('*');
    //Kiểm tra xem file xóa có phải là file vừa mới upload hay không - nếu là file vừa mới upload thì cho vào list xóa để không upload vào server
    if (!$(this).hasClass('img-db')) {
        var indexRemove = $('.XoaFileDinhKemHS').index(this);
        positionRemoveItiemHS.push(indexRemove);
    }
    //
    CanhBaoXoa(() => {
        for (var i = 0; i < ListFile.length; i++) {
            if (ListFile[i].includes(TenFile)) {
                var bang = "NguoiTimViec";
                var cot = "NguoiTimViecID";
                var result = NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/XoaDinhKemHoSo', { ID: ToKhaiID, duongDan: ListFile[i], bangDk: bang, cotDk: cot, loai: '' });

                if (!result.Err) {
                    NTS.thanhcong(result.Msg);
                    $('#txtHoSoKemTheo_USDangKy').value($('#txtHoSoKemTheo_USDangKy').value().replaceAll(ListFile[i], '').replaceAll('**', '*'))
                }
                else {
                    NTS.loi(result.Msg);
                }
            }
        }
        $(this).parent().css('display', 'none');
        if ($('#HoSoKemTheo_USDangKy').parent().find('.ace-file-name').length == 1 && $('#HoSoKemTheo_USDangKy').parent().find('.ace-file-name').css('display') == "none") {
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
    $('#HoSoKemTheo_USDangKy').ace_file_input('reset_input');
    $('.ace-file-container').html(`<span class="ace-file-name" data-title="No File ..."><i class=" ace-icon ace-icon fa fa-cloud-upload"></i></span>`);
}


//---------------------------------------------Dinh kèm Văn bản----------------------------------------

function uploadfileEventTaiLieuKhac(options) {

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
    $($('#DinhKem_VanBan').get(0)).data('ace_input_files', emptyFileList);
    return result;
}
$('#DinhKem_VanBan').on('change', function () {
    var selectedFiles = this.files;

    // Kiểm tra và xử lý tệp đã chọn ở đây
    for (var i = 0; i < selectedFiles.length; i++) {
        var fileName = selectedFiles[i].name;
        var fileType = fileName.split('.').pop().toLowerCase();
        // Kiểm tra loại tệp
        if (fileType === 'doc' || fileType === 'docx' || fileType === 'pdf' || fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
            // Xử lý tệp ở đây nếu đúng định dạng
            console.log('Đã chọn tệp: ' + fileName);
        } else {
            alert('Vui lòng chọn tệp DOC, PDF, PNG, JPG hoặc JPEG.');
            // Xoá tệp không hợp lệ khỏi input (nếu cần)
            ResetDinhKemFileTL();
        }
    }
});
var old_ItemFile_VanBan = "";
$('#DinhKem_VanBan').ace_file_input({
    style: 'well',
    btn_choose: 'Nhấn để chọn tệp hoặc kéo thả vào đây (Cho phép đính kèm các file có định dạng DOC, PDF, PNG, JPG, JPEG)',
    btn_change: null,
    no_icon: 'ace-icon fa fa-cloud-upload',
    droppable: true,
    thumbnail: 'large',
    allowExt: ["jpeg", "jpg", "png", "gif", "pdf"]
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
            $('.ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKem btn-del-item" onclick="return false"></i>');
        }
    });
    //Load các file đã upload vào db
    if ($(old_ItemFile_VanBan[0]).attr("data-title") != 'No File ...') {
        $('.ace-file-container').append(old_ItemFile_VanBan);
    }
    //Gắn thêm dấu x xóa từng file
    //các file trước đó đã có trong csdl
    if ($('.ace-file-name').children().hasClass('XoaFileDinhKem')) {
        // Có class "XoaFileDinhKem"
    } else {
        // Không "XoaFileDinhKem"
        $('.ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKem btn-del-item" onclick="return false"></i>');
        //File thêm mới
        $('.ace-file-name.large').append('<i class=" ace-icon fa fa-times XoaFileDinhKem btn-del-item " onclick="return false"></i>');

    }

    return false;
});
var file_input = $('#DinhKem_VanBan');
file_input.ace_file_input('reset_input');
file_input
    .off('file.error.ace')
    .on('file.error.ace', function (e, info) {
    });
function RemoveAllFileInputAce() {
    var bang = "NguoiTimViec";
    var cot = "NguoiTimViecID";

    CanhBaoXoa(() => {
        var result = NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/XoaDinhKemTaiLieu', { ID: $('#NguoiTimViecID').val(), duongDan: '', bangDk: bang, cotDk: cot, loai: 'all' });
        if (!result.Err) {
            NTS.thanhcong(result.Msg);
            $('#txtDinhKem_VanBan').value("");
            ResetDinhKemFileTL();
            old_ItemFile = "";
            //$('#txtDinhKem').value($('#txtDinhKem').value().replaceAll(ListFile[i], '').replaceAll('**', '*'));
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}
var positionRemoveItiem = new Array();
$(document).on('click', '.XoaFileDinhKem', function () {
    var ViecTimNguoiID = $('#NguoiTimViecID').value();
    var TenFile = $(this).parent().attr('data-title');
    var ListFile = $('#txtDinhKem_VanBan').value().split('*');
    //Kiểm tra xem file xóa có phải là file vừa mới upload hay không - nếu là file vừa mới upload thì cho vào list xóa để không upload vào server
    if (!$(this).hasClass('img-db')) {
        var indexRemove = $('.XoaFileDinhKem').index(this);
        positionRemoveItiem.push(indexRemove);
    }
    //
    CanhBaoXoa(() => {
        for (var i = 0; i < ListFile.length; i++) {
            if (ListFile[i].includes(TenFile)) {
                var bang = "NguoiTimViec";
                var cot = "NguoiTimViecID";
                var result = NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/XoaDinhKemTaiLieu', { ID: ViecTimNguoiID, duongDan: ListFile[i], bangDk: bang, cotDk: cot, loai: '' });

                if (!result.Err) {
                    NTS.thanhcong(result.Msg);
                    $('#txtDinhKem_VanBan').value($('#txtDinhKem_VanBan').value().replaceAll(ListFile[i], '').replaceAll('**', '*'))
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
        if ($('#DinhKem_VanBan').parent().find('.ace-file-name').length == 0) {
            ResetDinhKemFileTL();
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

function ResetDinhKemFileTL() {
    $('#DinhKem_VanBan').ace_file_input('reset_input');
    $('.ace-file-container').html(`<span class="ace-file-name" data-title="No File ..."><i class=" ace-icon ace-icon fa fa-cloud-upload"></i></span>`);
}

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
                    $('#mdKinhNghiemVaDKDichVu').modal('show');

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
        case 119:
            if (hotKey == 1) {
                if ($('#mdKinhNghiemVaDKDichVu').hasClass('show')) {
                    $('#btnQuayLaiBuoc1').trigger('click');
                    e.preventDefault();
                    break;
                }
                else if ($('#mdThemMoiViecLamMongMuon').hasClass('show')) {
                    $('#btnQuayLaiBuoc2').trigger('click');
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
                else if ($('#mdKinhNghiemVaDKDichVu').hasClass('show')) {
                    $('#btnTiepTucBuoc3').trigger('click');
                    e.preventDefault();
                    break;
                }
                else if ($('#mdThemMoiViecLamMongMuon').hasClass('show')) {
                    $('#btnKetThuc').trigger('click');
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

//----------------------------Xử lý Combo đối tượng cá nhân-----------------------------//
var langArray = [];
langArray.push(`<li action="false" style="position: sticky;top: 0;background-color: white;">
                        <div class="row" style="width: 100%">
                        <div class="form-col-12">
                            <input type="text" class="form-control" id="ckTimKiemDoiTuongNNID" >
                        </div>
                        </div>
                    </li>`);
langArray.push(`<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn đối tượng- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);

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

//$('.vodiapickerDT option').each(function () {
//    var name_cv = $(this).attr("data-name-cv");
//    var name = $(this).attr("data-name");
//    var code = $(this).attr("data-code");
//    var genner = $(this).attr("data-genner");
//    var cmnd = $(this).attr("data-cmnd");
//    var tinh = $(this).attr("data-tinh");
//    var huyen = $(this).attr("data-huyen");
//    var xa = $(this).attr("data-xa");
//    var thon = $(this).attr("data-thon");
//    var doiTuongID = $(this).attr("value");
//    var NoiThuongTru = $(this).attr("data-NoiThuongTru");
//    const mauNgauNhien = getRandomColors(Color, 1);
//    var item = "";
//    item = `<li class="itemDoiTuongNN" action="true" style="display:none" data-name="${name}" data-code="${code}" data-cmnd="${cmnd}" data-NoiThuongTru="${NoiThuongTru}" value="${doiTuongID}"><div class="opImg" style="background-color:${mauNgauNhien}">${name_cv}</div><div class="opInfo"><div><b>${name}</b> (${code}), Giới tính: <b>${genner}</b>, CMND/CCCD: <b>${cmnd}</b></div><div class="text-diachi" title="${(thon == "" ? "" : thon + ", ")} ${xa}, ${huyen}, ${tinh}">Nơi thường trú: <b>${NoiThuongTru}</b></div></div></li>`;
//    langArray.push(item);
//});

//langArray.push(`<li action="false" id="LoadMoreDoiTuongDK" onclick="LoadMoreDoiTuong()" style="justify-content: center;"> Xem thêm &nbsp<i class="fa fa-arrow-down" style="color: #0054a6" aria-hidden="true"></i></li>`);
$('#ListDataDoiTuongNN').html(langArray);

//Set the button value to the first el of the array
$('.btn-select-DoiTuongNN').html(langArray[1]);
$('.btn-select-DoiTuongNN').attr('value', '');

$(".btn-select-DoiTuongNN").click(function () {
    $(".OptionDoiTuongNN").toggle();
});
$(document).ready(function () {
    // Bắt sự kiện click trên toàn bộ trang
    $(document).on('click', function (event) {
        // Kiểm tra xem sự kiện click diễn ra bên ngoài thẻ có class A hay không
        if (!$(event.target).closest('.lang-select').length) {

            $(".OptionDoiTuongNN").css('display', 'none');
        }
    });
});
////check local storage for the lang
var sessionLang = localStorage.getItem('lang');
if (sessionLang) {
    //find an item with value of sessionLang
    var langIndex = langArray.indexOf(sessionLang);
    $('.btn-select-DoiTuongNN').html(langArray[langIndex]);
    $('.btn-select-DoiTuongNN').attr('value', sessionLang);
} else {
    var langIndex = langArray.indexOf('ch');
    $('.btn-select-DoiTuongNN').html(langArray[langIndex]);
    //$('.btn-select').attr('value', 'en');
}

function LoadComBoDoiTuongNN(TinhID, HuyenID, XaID, ThonID) {
    $('.listOption').html('');
    $('#DoiTuongNNID_ChuHo').html('');
    $('#ListDataDoiTuongNN').html(''); // Xóa danh sách cũ
    $('#ListDataDoiTuongNN').append(`
        <li action="false" style="position: sticky;top: 0;background-color: white;">
            <div class="row" style="width: 100%">
                <div class="form-col-12">
                    <input type="text" class="form-control" id="ckTimKiemDoiTuongNN" onkeypress="FillterDoiTuongNN()">
                </div>
            </div>
        </li>
    `);
    $('#ListDataDoiTuongNN').append(`
        <li action="chon" class="itemDoiTuongNN">
            <div class="opInfo Chon"><div>-Chọn đối tượng-</div></div>
        </li>
    `);

    var saveData = [TinhID, HuyenID, XaID, ThonID];
    const kq = NTS.getAjax('/DanhMuc/DungChung/GetDoiTuongCaNhan_Combo', { data: saveData }).Result;

    // Hiển thị 20 mục đầu tiên
    const initialItems = 20;
    for (var i = 0; i < kq.length; i++) {
        $('#DoiTuongNNID_ChuHo').append(`
            <option value="${kq[i].ThanhVienHoGDID}" 
                    data-name="${kq[i].HoVaTen}" 
                    data-name-NSD="${TraVeTenVietTat(kq[i].HoVaTen)}" 
                    data-NoiThuongTru="${kq[i].DiaChiCuTheTT}" 
                    data-tinh="${kq[i].Tinh}" 
                    data-huyen="${kq[i].Huyen}" 
                    data-xa="${kq[i].Xa}" 
                    data-thon="${kq[i].Thon}" 
                    data-ngaycap="${kq[i].NgayCap}" 
                    data-ngaysinh="${kq[i].NgayThangNamSinh}" 
                    data-sodienthoai="${kq[i].SoDienThoai}" 
                    data-email="${kq[i].Email}" 
                    data-tengioitinh="${kq[i].TenGioiTinh}" 
                    data-tenquoctich="${kq[i].TenQuocTich}" 
                    data-socccd="${kq[i].SoCCCD}"

                    data-tinhtt="${kq[i].DiaBanHCID_TinhTT}"
                    data-huyentt="${kq[i].DiaBanHCID_HuyenTT}"
                    data-xatt="${kq[i].DiaBanHCID_XaTT}"
                    data-thontt="${kq[i].DiaBanHCID_ThonTT}"
                    data-tinhht="${kq[i].DiaBanHCID_TinhHT}"
                    data-huyenht="${kq[i].DiaBanHCID_HuyenHT}"
                    data-xaht="${kq[i].DiaBanHCID_XaHT}"
                    data-thonht="${kq[i].DiaBanHCID_ThonHT}"
                    data-diachiht="${kq[i].DiaChiCuTheHT}"
                    data-sonhaht="${kq[i].SoNhaHT}"
                    data-sonhatt="${kq[i].SoNhaTT}"
            >`);

        var item = `
            <li action="true" class="itemDoiTuongNN"
                                data-name="${kq[i].HoVaTen}" 
                                data-namsinh="${kq[i].NamSinh}" 
                                data-tengioitinh="${kq[i].TenGioiTinh}" 
                                data-tenquoctich="${kq[i].TenQuocTich}" 
                                data-ngaycap="${kq[i].NgayCap}" 
                                data-sodienthoai="${kq[i].SoDienThoai}" 
                                data-email="${kq[i].Email}" 
                                data-ngaysinh="${kq[i].NgayThangNamSinh}" 
                                data-NoiThuongTru="${kq[i].DiaChiCuTheTT}"
                                data-tinhtt="${kq[i].DiaBanHCID_TinhTT}"
                                data-huyentt="${kq[i].DiaBanHCID_HuyenTT}"
                                data-xatt="${kq[i].DiaBanHCID_XaTT}"
                                data-thontt="${kq[i].DiaBanHCID_ThonTT}"
                                data-tinhht="${kq[i].DiaBanHCID_TinhHT}"
                                data-huyenht="${kq[i].DiaBanHCID_HuyenHT}"
                                data-xaht="${kq[i].DiaBanHCID_XaHT}"
                                data-thonht="${kq[i].DiaBanHCID_ThonHT}"
                                data-diachiht="${kq[i].DiaChiCuTheHT}"
                                data-sonhaht="${kq[i].SoNhaHT}"
                                data-sonhatt="${kq[i].SoNhaTT}"
                                value="${kq[i].ThanhVienHoGDID}">
                <div class="opImg" style="background-color:${getRandomColors(Color, 1)}">${TraVeTenVietTat(kq[i].HoVaTen)}</div>
                <div class="opInfo">
                    <div><b>${kq[i].HoVaTen}</b> (${kq[i].NamSinh}), Số CCCD/CMND/Số định danh: <b>${kq[i].SoCCCD}</b>, Ngày cấp: <b>${kq[i].NgayCap}</b>, Quốc tịch: <b>${kq[i].TenQuocTich}</b>, Giới tính: <b>${kq[i].TenGioiTinh}, Ngày sinh: <b>${kq[i].NgayThangNamSinh}</b></b></div>
                    <div class="text-diachi" title="${(kq[i].Thon == "" ? "" : kq[i].Thon + ", ")} ${kq[i].Xa}, ${kq[i].Huyen}, ${kq[i].Tinh}">Địa chỉ: <b>${kq[i].DiaChiCuTheTT}</b></div>
                </div>
            </li>
        `;

        $('#ListDataDoiTuongNN').append(item);
    }

    // Ẩn tất cả các mục, chỉ hiển thị 20 mục đầu tiên
    $("#ListDataDoiTuongNN li").slice(1, kq.length).hide();
    $("#ListDataDoiTuongNN li").slice(1, initialItems + 1).show(); // Hiển thị 20 item đầu

    if (kq.length > initialItems) {
        $('#ListDataDoiTuongNN').append(`
            <li action="false" id="loadMoreDoiTuongNNDK" onclick="LoadMoreDoiTuongNN()" style="justify-content: center;"> 
                Xem thêm &nbsp<i class="fa fa-arrow-down" style="color: #0054a6" aria-hidden="true"></i>
            </li>
        `);
    }
}

function NumbervisibleLiCountDoiTuong() {
    return $('#ListDataDoiTuongNN li:visible').length;
}

var soLuongHienThi_DoiTuongNN = 20;

function LoadMoreDoiTuongNN() {
    // Số phần tử đang hiển thị
    var visibleLiCount = NumbervisibleLiCountDoiTuong();
    // Hiển thị thêm 20 phần tử nữa
    $("#ListDataDoiTuongNN li").slice(visibleLiCount, visibleLiCount + soLuongHienThi_DoiTuongNN).show();

    // Kiểm tra nếu đã hiển thị hết tất cả các phần tử thì ẩn nút "Xem thêm"
    if (visibleLiCount + soLuongHienThi_DoiTuongNN >= $('#ListDataDoiTuongNN li').length - 1) {
        $("#loadMoreDoiTuongNNDK").hide();
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
        $('#SoDiDong').value('');
        $('#Email').value('');
        $('#TinhID_TT').value('');
        $('#HuyenID_TT').value('');
        $('#XaID_TT').value('');
        $('#ThonID_TT').value('');
        $('#SoNha_TT').value('');
        $('#TinhID_HN').value('');
        $('#HuyenID_HN').value('');
        $('#XaID_HN').value('');
        $('#ThonID_HN').value('');
        $('#SoNha_HN').value('');
        $('#DiaChiThuongTru').value('');
        $('#DiaChiThuongTruHN').value('');
    } else {
        var value = $(this).attr('value');
        var name = $(this).attr("data-name");
        var code = $(this).attr("data-code");
        var diachi = $(this).attr("data-NoiThuongTru");
        var ngaycap = $(this).attr("data-ngaycap");
        var noicap = $(this).attr("data-noicap");
        var sodienthoai = $(this).attr("data-sodienthoai");
        var email = $(this).attr("data-email");
        var ngaysinh = $(this).attr("data-ngaysinh");
        var tenquoctich = $(this).attr("data-tenquoctich");
        var tengioitinh = $(this).attr("data-tengioitinh");
        var item = `<li><span><b>${name}</b>, ngày sinh: <b>${ngaysinh}</b>, Giới tính: <b>${tengioitinh}</b>, Quốc tịch: <b>${tenquoctich}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
        var tinhtt = $(this).attr("data-tinhtt");
        var huyentt = $(this).attr("data-huyentt");
        var xatt = $(this).attr("data-xatt");
        var thontt = $(this).attr("data-thontt");
        var tinhht = $(this).attr("data-tinhht");
        var huyenht = $(this).attr("data-huyenht");
        var xaht = $(this).attr("data-xaht");
        var thonht = $(this).attr("data-thonht");
        var diachiht = $(this).attr("data-diachiht");
        var sonhaht = $(this).attr("data-sonhaht");
        var sonhatt = $(this).attr("data-sonhatt");

        $('#SoDiDong').value(sodienthoai);
        $('#Email').value(email);
        $('#TinhID_TT').value(tinhtt);
        $('#HuyenID_TT').value(huyentt);
        $('#XaID_TT').value(xatt);
        $('#ThonID_TT').value(thontt);
        $('#SoNha_TT').value(sonhatt);
        $('#TinhID_HN').value(tinhht);
        $('#HuyenID_HN').value(huyenht);
        $('#XaID_HN').value(xaht);
        $('#ThonID_HN').value(thonht);
        $('#SoNha_HN').value(sonhaht);
        $('#DiaChiThuongTru').value(diachi);
        $('#DiaChiThuongTruHN').value(diachiht);
    }

    $('.btn-select-DoiTuongNN').html(item);
    $('.btn-select-DoiTuongNN').attr('value', value);
    $('#DoiTuongNNID_ChuHo').value(value);
    $(".OptionDoiTuongNN").toggle();
});
async function LoadDoiTuongNNChon() {
    var saveData = new Array();
    saveData[0] = $('#TinhID_timKiemDoiTuongCaNhanTT_us_Chon').value();
    saveData[1] = $('#HuyenID_timKiemDoiTuongCaNhanTT_us_Chon').value();
    saveData[2] = $('#XaID_timKiemDoiTuongCaNhanTT_us_Chon').value();
    saveData[3] = $('#ThonID_timKiemDoiTuongCaNhanTT_us_Chon').value();
    saveData[4] = $('#timKiemDoiTuongCaNhanTT_us_Chon').value();
    Grid_ChonDoiTuongCaNhanTT_us.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/DungChung/GetAllDoiTuongCaNhan_Chon", { data: saveData });
    if (!GetAll.Err) {
        Grid_ChonDoiTuongCaNhanTT_us.setData(GetAll.Result);
        Grid_ChonDoiTuongCaNhanTT_us.redraw(1);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.thongbaoloi(GetAll.Msg);
    GridKhongCoDuLieu("Grid_ChonDoiTuongCaNhanTT_us");
}

$(document).on('click', '#btntimKiemDoiTuongCaNhanTT_us_Chon', function () {
    LoadDoiTuongNNChon();
    $('#KhungTimKiem_DoiTuongNN_us').slideUp(200);
    return false;
});


// CLick xem modal chọn danh sách tổ chức 
$(document).on('click', '#HienThiTatCaDoiTuongNN', function () {
    $('#mdChonDoiTuongCaNhan_us').modal('show');
    setTimeout(() => {
        LoadTimKiem_ChonDoiTuongCaNhan();
        PhanQuyenComBoDiaBan('TinhID_timKiemDoiTuongCaNhanTT_us_Chon', 'HuyenID_timKiemDoiTuongCaNhanTT_us_Chon', 'XaID_timKiemDoiTuongCaNhanTT_us_Chon', 'ThonID_timKiemDoiTuongCaNhanTT_us_Chon');
    }, 300);
    LoadDoiTuongNNChon();
});

// click button chọn và đóng modal chọn tổ chức
$(document).on('click', '#btnChonVaDongDoiTuongCaNhanTT_us', function () {
    if (Grid_ChonDoiTuongCaNhanTT_us.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
        return false;
    }
    ResetTTDoiTuong();
    $('#SoDiDong').value('');
    $('#Email').value('');
    $('#TinhID_TT').value('');
    $('#HuyenID_TT').value('');
    $('#XaID_TT').value('');
    $('#ThonID_TT').value('');
    $('#SoNha_TT').value('');
    $('#TinhID_HN').value('');
    $('#HuyenID_HN').value('');
    $('#XaID_HN').value('');
    $('#ThonID_HN').value('');
    $('#SoNha_HN').value('');
    $('#DiaChiThuongTru').value('');
    $('#DiaChiThuongTruHN').value('');
    var dataGrid = Grid_ChonDoiTuongCaNhanTT_us.getSelectedRows()[0]._row.data;
    var item = `<li><span><b>${dataGrid.HoVaTen}</b>, ngày sinh: <b>${dataGrid.NgayThangNamSinh}</b>, Giới tính: <b>${dataGrid.TenGioiTinh}</b>, Quốc tịch: <b>${dataGrid.TenQuocTich}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
    $('.btn-select-DoiTuongNN').html(item);
    $('.btn-select-DoiTuongNN').attr('value', dataGrid.ThanhVienHoGDID);
    $('#DoiTuongNNID_ChuHo').value(dataGrid.ThanhVienHoGDID);
    $(".OptionDoiTuongNN").toggle();

    $('#SoDiDong').value(dataGrid.SoDienThoai);
    $('#Email').value(dataGrid.Email);
    $('#TinhID_TT').value(dataGrid.DiaBanHCID_TinhTT);
    $('#HuyenID_TT').value(dataGrid.DiaBanHCID_HuyenTT);
    $('#XaID_TT').value(dataGrid.DiaBanHCID_XaTT);
    $('#ThonID_TT').value(dataGrid.DiaBanHCID_ThonTT);
    $('#SoNha_TT').value(dataGrid.SoNhaTT);
    $('#TinhID_HN').value(dataGrid.DiaBanHCID_TinhHT);
    $('#HuyenID_HN').value(dataGrid.DiaBanHCID_HuyenHT);
    $('#XaID_HN').value(dataGrid.DiaBanHCID_XaHT);
    $('#ThonID_HN').value(dataGrid.DiaBanHCID_ThonHT);
    $('#SoNha_HN').value(dataGrid.SoNhaHT);
    $('#DiaChiThuongTru').value(dataGrid.DiaChiCuTheTT);
    $('#DiaChiThuongTruHN').value(dataGrid.DiaChiCuTheHT);
    $('#mdChonDoiTuongCaNhan_us').modal('hide');
});

//Grid_ChonDoiTuongCaNhanTT_us.on("rowDblClick", function (e, row) {
//    debugger
//    var dataGrid = row.getData();
//    ResetTTDoiTuong();
//    $('#SoDiDong').value('');
//    $('#Email').value('');
//    $('#TinhID_TT').value('');
//    $('#HuyenID_TT').value('');
//    $('#XaID_TT').value('');
//    $('#ThonID_TT').value('');
//    $('#SoNha_TT').value('');
//    $('#TinhID_HN').value('');
//    $('#HuyenID_HN').value('');
//    $('#XaID_HN').value('');
//    $('#ThonID_HN').value('');
//    $('#SoNha_HN').value('');
//    $('#DiaChiThuongTru').value('');
//    $('#DiaChiThuongTruHN').value('');
//    var dataGrid = Grid_ChonDoiTuongCaNhanTT_us.getSelectedRows()[0]._row.data;
//    var item = `<li><span><b>${dataGrid.HoVaTen}</b>, ngày sinh: <b>${dataGrid.NgayThangNamSinh}</b>, Giới tính: <b>${dataGrid.TenGioiTinh}</b>, Quốc tịch: <b>${dataGrid.TenQuocTich}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
//    $('.btn-select-DoiTuongNN').html(item);
//    $('.btn-select-DoiTuongNN').attr('value', dataGrid.ThanhVienHoGDID);
//    $('#DoiTuongNNID_ChuHo').value(dataGrid.ThanhVienHoGDID);
//    $(".OptionDoiTuongNN").toggle();
//    $('#SoDiDong').value(dataGrid.SoDienThoai);
//    $('#Email').value(dataGrid.Email);
//    $('#TinhID_TT').value(dataGrid.DiaBanHCID_TinhTT);
//    $('#HuyenID_TT').value(dataGrid.DiaBanHCID_HuyenTT);
//    $('#XaID_TT').value(dataGrid.DiaBanHCID_XaTT);
//    $('#ThonID_TT').value(dataGrid.DiaBanHCID_ThonTT);
//    $('#SoNha_TT').value(dataGrid.SoNhaTT);
//    $('#TinhID_HN').value(dataGrid.DiaBanHCID_TinhHT);
//    $('#HuyenID_HN').value(dataGrid.DiaBanHCID_HuyenHT);
//    $('#XaID_HN').value(dataGrid.DiaBanHCID_XaHT);
//    $('#ThonID_HN').value(dataGrid.DiaBanHCID_ThonHT);
//    $('#SoNha_HN').value(dataGrid.SoNhaHT);
//    $('#DiaChiThuongTru').value(dataGrid.DiaChiCuTheTT);
//    $('#DiaChiThuongTruHN').value(dataGrid.DiaChiCuTheHT);
//    $('#mdChonDoiTuongCaNhan_us').modal('hide');
//});


function FillterDoiTuongNN() {
    var input, filter, ul, li, a, i;
    input = $("#ckTimKiemDoiTuongNN");
    filter = input.value().toUpperCase();
    div = $("#ListDataDoiTuongNN");
    a = $("#ListDataDoiTuongNN li");
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

//------------------------------Xử lý combo Phiếu đăng ký tuyển dụng------------------//
var langArrayPhieuDKGTVL = [];
langArrayPhieuDKGTVL.push(`<li action="false" style="position: sticky;top: 0;background-color: white;">
                        <div class="row" style="width: 100%">
                        <div class="form-col-12">
                            <input type="text" class="form-control" id="ckTimKiemPhieuDKGTVLID" >
                        </div>
                        </div>
                    </li>`);
langArrayPhieuDKGTVL.push(`<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn việc làm đang tuyển dụng- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);

//$('.vodiapickerPhieuDKGTVL option').each(function () {
//    var name_cv = $(this).attr("data-name-cv");
//    var name = $(this).attr("data-name");
//    var code = $(this).attr("data-code");
//    var genner = $(this).attr("data-genner");
//    var cmnd = $(this).attr("data-cmnd");
//    var tinh = $(this).attr("data-tinh");
//    var huyen = $(this).attr("data-huyen");
//    var xa = $(this).attr("data-xa");
//    var thon = $(this).attr("data-thon");
//    var doiTuongID = $(this).attr("value");
//    var NoiThuongTru = $(this).attr("data-NoiThuongTru");
//    const mauNgauNhien = getRandomColors(Color, 1);
//    var item = "";
//    item = `<li class="itemPhieuDKGTVL" action="true" style="display:none" data-name="${name}" data-code="${code}" data-cmnd="${cmnd}" data-NoiThuongTru="${NoiThuongTru}" value="${doiTuongID}"><div class="opImg" style="background-color:${mauNgauNhien}">${name_cv}</div><div class="opInfo"><div><b>${name}</b> (${code}), Giới tính: <b>${genner}</b>, CMND/CCCD: <b>${cmnd}</b></div><div class="text-diachi" title="${(thon == "" ? "" : thon + ", ")} ${xa}, ${huyen}, ${tinh}">Nơi thường trú: <b>${NoiThuongTru}</b></div></div></li>`;
//    langArrayPhieuDKGTVL.push(item);
//});

//langArray.push(`<li action="false" id="LoadMoreDoiTuongDK" onclick="LoadMoreDoiTuong()" style="justify-content: center;"> Xem thêm &nbsp<i class="fa fa-arrow-down" style="color: #0054a6" aria-hidden="true"></i></li>`);
$('#ListDataPhieuDKGTVL').html(langArrayPhieuDKGTVL);

//Set the button value to the first el of the array
$('.btn-select-PhieuDKGTVL').html(langArrayPhieuDKGTVL[1]);
$('.btn-select-PhieuDKGTVL').attr('value', '');

$(".btn-select-PhieuDKGTVL").click(function () {
    $(".OptionPhieuDKGTVL").toggle();
});
$(document).ready(function () {
    // Bắt sự kiện click trên toàn bộ trang
    $(document).on('click', function (event) {
        // Kiểm tra xem sự kiện click diễn ra bên ngoài thẻ có class A hay không
        if (!$(event.target).closest('.lang-select').length) {

            $(".OptionPhieuDKGTVL").css('display', 'none');
        }
    });
});
////check local storage for the lang
var sessionLang = localStorage.getItem('lang');
if (sessionLang) {
    //find an item with value of sessionLang
    var langIndex = langArrayPhieuDKGTVL.indexOf(sessionLang);
    $('.btn-select-PhieuDKGTVL').html(langArrayPhieuDKGTVL[langIndex]);
    $('.btn-select-PhieuDKGTVL').attr('value', sessionLang);
} else {
    var langIndex = langArrayPhieuDKGTVL.indexOf('ch');
    $('.btn-select-PhieuDKGTVL').html(langArrayPhieuDKGTVL[langIndex]);
    //$('.btn-select').attr('value', 'en');
}

function LoadComBoPhieuDKGTVL(TinhID, HuyenID, XaID, ThonID) {
    $('.listOption').html('');
    $('#PhieuDKGTVLID_ComBo').html('');
    $('#ListDataPhieuDKGTVL').html(''); // Xóa danh sách cũ
    $('#ListDataPhieuDKGTVL').append(`
        <li action="false" style="position: sticky;top: 0;background-color: white;">
            <div class="row" style="width: 100%">
                <div class="form-col-12">
                    <input type="text" class="form-control" id="ckTimKiemPhieuDKGTVL" onkeypress="FillterPhieuDKGTVL()">
                </div>
            </div>
        </li>
    `);
    $('#ListDataPhieuDKGTVL').append(`
        <li action="chon" class="itemPhieuDKGTVL">
            <div class="opInfo Chon"><div>-Chọn việc làm đang tuyển dụng-</div></div>
        </li>
    `);

    var saveData = [TinhID, HuyenID, XaID, ThonID];
    const kq = NTS.getAjax('/DanhMuc/DungChung/GetPhieuDKGTVL_Combo', { data: saveData }).Result;

    // Hiển thị 20 mục đầu tiên
    const initialItems = 20;
    for (var i = 0; i < kq.length; i++) {
        $('#PhieuDKGTVLID_ComBo').append(`
            <option value="${kq[i].PhieuDKGTVLID}" 
                    data-name-TC="${kq[i].TenToChuc}" 
                    data-name-CV="${TraVeTenVietTat(kq[i].TenCongViec)}" 
                    data-NoiThuongTru="${kq[i].DiaChiCuThe}" 
                    data-tinh="${kq[i].Tinh}" 
                    data-huyen="${kq[i].Huyen}" 
                    data-xa="${kq[i].Xa}" 
                    data-thon="${kq[i].Thon}" 
                    data-ngaydk="${kq[i].NgayDangKy}" 
                    data-hanTuyenDung="${kq[i].ThoiHanTuyenDung}" 
                    data-sodienthoai="${kq[i].SoDT_NguoiLienHe}" 
                    data-email="${kq[i].Email_NguoiLienhe}" 
                    data-tennguoilienhe="${kq[i].HoTen_NguoiLienHe}" 
                    data-chuvunguoilienhe="${kq[i].ChucVu_NguoiLienHe}"
                    data-chuvutuyendung="${kq[i].ChucVu}"
                    data-hocvan="${kq[i].HocVan}"
                    data-trinhdocmkt="${kq[i].TenTrinhDoCMKT}"
                    data-tenhinhthuclv="${kq[i].TenHinhThucLamViec}"
                    data-mucluong="${kq[i].TenMucLuong}"
                    data-chedophucloi="${kq[i].CheDoPhucLoi}"
                    data-dieukienlamviec="${kq[i].DieuKienLV}"
                    data-hinhthuctuyendung="${kq[i].HinhThucTuyenDung}"
        >`);

        var item = `
            <li action="true" class="itemPhieuDKGTVL"
                                data-name-TC="${kq[i].TenToChuc}" 
                                data-name-CV="${TraVeTenVietTat(kq[i].TenCongViec)}" 
                                data-NoiThuongTru="${kq[i].DiaChiCuThe}" 
                                data-tinh="${kq[i].Tinh}" 
                                data-huyen="${kq[i].Huyen}" 
                                data-xa="${kq[i].Xa}" 
                                data-thon="${kq[i].Thon}" 
                                data-ngaydk="${kq[i].NgayDangKy}" 
                                data-hanTuyenDung="${kq[i].ThoiHanTuyenDung}" 
                                data-sodienthoai="${kq[i].SoDT_NguoiLienHe}" 
                                data-email="${kq[i].Email_NguoiLienhe}" 
                                data-tennguoilienhe="${kq[i].HoTen_NguoiLienHe}" 
                                data-chuvunguoilienhe="${kq[i].ChucVu_NguoiLienHe}" 
                                value="${kq[i].PhieuDKGTVLID}"
                                data-chuvutuyendung="${kq[i].ChucVu}"
                                data-hocvan="${kq[i].HocVan}"
                                data-trinhdocmkt="${kq[i].TenTrinhDoCMKT}"
                                data-tenhinhthuclv="${kq[i].TenHinhThucLamViec}"
                                data-mucluong="${kq[i].TenMucLuong}"
                                data-chedophucloi="${kq[i].CheDoPhucLoi}"
                                data-dieukienlamviec="${kq[i].DieuKienLV}"
                                data-hinhthuctuyendung="${kq[i].HinhThucTuyenDung}"
                >
                <div class="opImg" style="background-color:${getRandomColors(Color, 1)}">${TraVeTenVietTat(kq[i].TenCongViec)}</div>
                <div class="opInfo">
                    <div><b>${kq[i].TenCongViec}</b> (${kq[i].TenToChuc}), Thời hạn tuyển dụng: <b>${kq[i].NgayDangKy}</b> - <b>${kq[i].ThoiHanTuyenDung}</b>, Số lượng tuyển: <b>${kq[i].SoLuongTuyen}</b> nhân viên, Chức vụ: <b>${kq[i].ChucVu}</b>, Học vấn: <b>${kq[i].HocVan}</b></div>
                    <div class="text-diachi" title="${(kq[i].Thon == "" ? "" : kq[i].Thon + ", ")} ${kq[i].Xa}, ${kq[i].Huyen}, ${kq[i].Tinh}">Địa chỉ: <b>${kq[i].DiaChiCuThe}</b></div>
                </div>
            </li>
        `;

        $('#ListDataPhieuDKGTVL').append(item);
    }

    // Ẩn tất cả các mục, chỉ hiển thị 20 mục đầu tiên
    $("#ListDataPhieuDKGTVL li").slice(1, kq.length).hide();
    $("#ListDataPhieuDKGTVL li").slice(1, initialItems + 1).show(); // Hiển thị 20 item đầu

    if (kq.length > initialItems) {
        $('#ListDataPhieuDKGTVL').append(`
            <li action="false" id="loadMorePhieuDKGTVLDK" onclick="LoadMorePhieuDKGTVL()" style="justify-content: center;">
                Xem thêm &nbsp<i class="fa fa-arrow-down" style="color: #0054a6" aria-hidden="true"></i>
            </li>
        `);
    }
}

function NumbervisibleLiCountPhieuDKGTVL() {
    return $('#ListDataPhieuDKGTVL li:visible').length;
}

var soLuongHienThi_PhieuDKGTVL = 20;

function LoadMorePhieuDKGTVL() {
    // Số phần tử đang hiển thị
    var visibleLiCount = NumbervisibleLiCountPhieuDKGTVL();
    // Hiển thị thêm 20 phần tử nữa
    $("#ListDataPhieuDKGTVL li").slice(visibleLiCount, visibleLiCount + soLuongHienThi_PhieuDKGTVL).show();

    // Kiểm tra nếu đã hiển thị hết tất cả các phần tử thì ẩn nút "Xem thêm"
    if (visibleLiCount + soLuongHienThi_PhieuDKGTVL >= $('#ListDataPhieuDKGTVL li').length - 1) {
        $("#loadMorePhieuDKGTVLDK").hide();
    }
}



// Chọn Tổ chức từ combo
$(document).on('click', '#SelectPhieuDKGTVL_US', function () {
    var TinhID = $('#TinhID_TimKiem_us').value();
    var HuyenID = $('#HuyenID_TimKiem_us').value();
    var XaID = $('#XaID_TimKiem_us').value();
    var ThonID = $('#ThonID_TimKiem_us').value();
    LoadComBoPhieuDKGTVL(TinhID, HuyenID, XaID, ThonID);
});

function ResetTTPhieuDKGTVL() {
    $('.btn-select-PhieuDKGTVL').attr('value', '');
    $('#PhieuDKGTVLID_ComBo').value('');
}


//Chọn xuống tổ chức từ combo
$(document).on('click', '.itemPhieuDKGTVL', function () {
    var action = $(this).attr("action");
    if (action == "false") {
        return;
    }
    if (action == "chon") {
        var item = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn việc làm đang tuyển dụng- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
        $('#SelectPhieuDKGTVL_US').value('');
        ResetTTPhieuDKGTVL();
        $('#lblChuVu_PhieuDKGTVL').html('');
        $('#lblMucLuong_PhieuDKGTVL').html('');
        $('#lblHocVan_PhieuDKGTVL').html('');
        $('#lblCheDoPhucLoi_PhieuDKGTVL').html('');
        $('#lblCMKT_PhieuDKGTVL').html('');
        $('#lblDKLV_PhieuDKGTVL').html('');
        $('#lblHinhThucLV_PhieuDKGTVL').html('');
        $('#lblHinhThucTuyenDung_PhieuDKGTVL').html('');
    } else {
        var value = $(this).attr('value');
        var nameTC = $(this).attr("data-name-tc");
        var nameCV = $(this).attr("data-name-cv");
        var diachi = $(this).attr("data-noithuongtru");
        var tinh = $(this).attr("data-tinh");
        var huyen = $(this).attr("data-huyen");
        var xa = $(this).attr("data-xa");
        var thon = $(this).attr("data-thon");
        var ngayDK = $(this).attr("data-ngaydk");
        var hanTuyenDung = $(this).attr("data-hantuyendung");
        var Sodienthoai = $(this).attr("data-sodienthoai");
        var email = $(this).attr("data-email");
        var tennguoilienhe = $(this).attr("data-tennguoilienhe");
        var chucvunguoilienhe = $(this).attr("data-chuvunguoilienhe");
        var item = `<li><span><b>${nameCV}</b>, Tổ chức: <b>${nameTC}</b>, thời hạng tuyển dụng: <b>${ngayDK} - ${hanTuyenDung}</b>, địa chỉ: <b>${diachi}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
        var hocvan = $(this).attr("data-hocvan");
        var trinhdocmkt = $(this).attr("data-trinhdocmkt");
        var hinhthuclv = $(this).attr("data-tenhinhthuclv");
        var mucluong = $(this).attr("data-mucluong");
        var chedophucloi = $(this).attr("data-chedophucloi");
        var dieukienlv = $(this).attr("data-dieukienlamviec");
        var hinhthuctuyendung = $(this).attr("data-hinhthuctuyendung");
        var chucvu = $(this).attr("data-chuvutuyendung");
        $('#lblChuVu_PhieuDKGTVL').html(chucvu);
        $('#lblMucLuong_PhieuDKGTVL').html(mucluong);
        $('#lblHocVan_PhieuDKGTVL').html(hocvan);
        $('#lblCheDoPhucLoi_PhieuDKGTVL').html(chedophucloi);
        $('#lblCMKT_PhieuDKGTVL').html(trinhdocmkt);
        $('#lblDKLV_PhieuDKGTVL').html(dieukienlv);
        $('#lblHinhThucLV_PhieuDKGTVL').html(hinhthuclv);
        $('#lblHinhThucTuyenDung_PhieuDKGTVL').html(hinhthuctuyendung + ", Thời hạn: " + hanTuyenDung);
    }

    $('.btn-select-PhieuDKGTVL').html(item);
    $('.btn-select-PhieuDKGTVL').attr('value', value);
    $('#PhieuDKGTVLID_ComBo').value(value);
    $(".OptionPhieuDKGTVL").toggle();
});
async function LoadPhieuDKGTVLChon() {
    var saveData = new Array();
    saveData[0] = $('#TinhID_timKiemPhieuDKGTVL_us_Chon').value();
    saveData[1] = $('#HuyenID_timKiemPhieuDKGTVL_us_Chon').value();
    saveData[2] = $('#XaID_timKiemPhieuDKGTVL_us_Chon').value();
    saveData[3] = $('#ThonID_timKiemPhieuDKGTVL_us_Chon').value();
    saveData[4] = $('#timKiemPhieuDKGTVL_us_Chon').value();
    Grid_ChonPhieuDKGTVLTT_us.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/DungChung/GetAllPhieuDKGTVL_Chon", { data: saveData });
    if (!GetAll.Err) {
        Grid_ChonPhieuDKGTVLTT_us.setData(GetAll.Result);
        Grid_ChonPhieuDKGTVLTT_us.redraw(1);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.thongbaoloi(GetAll.Msg);
}

$(document).on('click', '#btntimKiemPhieuDKGTVL_us_Chon', function () {
    LoadPhieuDKGTVLChon();
    $('#KhungTimKiem_PhieuDKGTVL_us').slideUp(200);
    return false;
});

// CLick xem modal chọn danh sách tổ chức 
$(document).on('click', '#HienThiTatCaPhieuDKGTVL', function () {
    $('#mdChonPhieuDKGTVL_us').modal('show');
    setTimeout(() => {
        LoadTimKiem_ChonPhieuDKGTVL();
        PhanQuyenComBoDiaBan('TinhID_timKiemPhieuDKGTVL_us_Chon', 'HuyenID_timKiemPhieuDKGTVL_us_Chon', 'XaID_timKiemPhieuDKGTVL_us_Chon', 'ThonID_timKiemPhieuDKGTVL_us_Chon');
    }, 300);
    LoadPhieuDKGTVLChon();
});

// click button chọn và đóng modal chọn tổ chức
$(document).on('click', '#btnChonVaDongPhieuDKGTVL_us', function () {
    if (Grid_ChonPhieuDKGTVLTT_us.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
        return false;
    }
    ResetTTPhieuDKGTVL();
    var dataGrid = Grid_ChonPhieuDKGTVLTT_us.getSelectedRows()[0]._row.data;
    var item = `<li><span><b>${dataGrid.TenCongViec}</b>, Tổ chức: <b>${dataGrid.TenToChuc}</b>, thời hạng tuyển dụng: <b>${dataGrid.ThoiHanTuyenDung}</b>, địa chỉ: <b>${dataGrid.DiaChiCuThe}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
    $('.btn-select-PhieuDKGTVL').html(item);
    $('.btn-select-PhieuDKGTVL').attr('value', dataGrid.PhieuDKGTVLID);
    $('#PhieuDKGTVLID_ComBo').value(dataGrid.PhieuDKGTVLID);
    $(".OptionPhieuDKGTVL").toggle();

    $('#lblChuVu_PhieuDKGTVL').html(dataGrid.ChucVu);
    $('#lblMucLuong_PhieuDKGTVL').html(dataGrid.TenMucLuong);
    $('#lblHocVan_PhieuDKGTVL').html(dataGrid.HocVan);
    $('#lblCheDoPhucLoi_PhieuDKGTVL').html(dataGrid.CheDoPhucLoi);
    $('#lblCMKT_PhieuDKGTVL').html(dataGrid.TenTrinhDoCMKT);
    $('#lblDKLV_PhieuDKGTVL').html(dataGrid.DieuKienLV);
    $('#lblHinhThucLV_PhieuDKGTVL').html(dataGrid.TenHinhThucLamViec);
    $('#lblHinhThucTuyenDung_PhieuDKGTVL').html(dataGrid.HinhThucTuyenDung + ", Thời hạn: " + dataGrid.HanTuyenDung);

    $('#mdChonPhieuDKGTVL_us').modal('hide');
});


function FillterPhieuDKGTVL() {
    var input, filter, ul, li, a, i;
    input = $("#ckTimKiemPhieuDKGTVL");
    filter = input.value().toUpperCase();
    div = $("#ListDataPhieuDKGTVL");
    a = $("#ListDataPhieuDKGTVL li");
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

//---------------------------------Quay lại bước 1---------------------------------
$(document).on('click', '#btnQuayLaiBuoc1', function () {
    tempthem = "sua";
    tempthemDanhGia = "sua";
    tempthemKinhNghiemLV = "sua";
    $('#mdKinhNghiemVaDKDichVu').modal('hide');
    $('#mdThemMoi').modal('show');
    LoadDataTableDanhGia($('#NguoiTimViecID').value());
    LoadDataTableKinhNghiemLV($('#NguoiTimViecID').value());
});

//---------------------------------Qua bước 3---------------------------------
$(document).on('click', '#btnTiepTucBuoc3', function () {
    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#QuocGiaID_LamViec').value();
    saveData[2] = JSON.stringify($('#DangKyDichVuID').value());
    saveData[3] = $('#NoiDungDichVuKhac').value();
    var data = uploadfileEvent({
        name: '#HoSoKemTheo_USDangKy',///ID input type="file"
        loaiVB: 'VB',
    });
    if (data.length > 0) {
        $('#txtHoSoKemTheo_USDangKy').value(data);
        NTS.dongthongbao();
    }
    saveData[4] = $('#txtHoSoKemTheo_USDangKy').value();
    var data = uploadfileEventTaiLieuKhac({
        name: '#DinhKem_VanBan',///ID input type="file"
        loaiVB: 'VB',
    });
    if (data.length > 0) {
        $('#txtDinhKem_VanBan').value(data);
        NTS.dongthongbao();
    }
    saveData[5] = $('#txtDinhKem_VanBan').value();
    saveData[6] = $('#NguoiTimViecID').value();
    var result = NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/LuuThongTinBuoc2', { data: saveData });
    if (!result.Err) {
        NTS.thanhcong(result.Msg);
        $('#mdKinhNghiemVaDKDichVu').modal('hide');
        $('#mdThemMoiViecLamMongMuon').modal('show');
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});

$(document).on('click', '#btnKetThuc', function () {
    const validate = new NTSValidate('#mdThemMoi');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }
    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#NguoiTimViecID').value();
    saveData[2] = $('#MaSoNguoiTimViec').value();
    saveData[3] = $('#LoaiHinDNID').value();
    saveData[4] = $('#TenCongViec').value();
    saveData[5] = $('#MoTaCongViec').value();
    saveData[6] = $('#MaNgheCap1').value();
    saveData[7] = $('#MaNgheCap2').value();
    saveData[8] = $('#MaNgheCap3').value();
    saveData[9] = $('#MaNgheCap4').value();
    saveData[10] = $('#TinhID_UuTien1').value();
    saveData[11] = $('#HuyenID_UuTien1').value();
    saveData[12] = $('#Quan_UuTien1').value();
    saveData[13] = $('#TinhID_UuTien2').value();
    saveData[14] = $('#HuyenID_UuTien2').value();
    saveData[15] = $('#Quan_UuTien2').value();
    saveData[16] = $('#ChucVuID').value();
    saveData[17] = $('#ChucVuKhac').value();
    saveData[18] = $('#KinhNghiemLamViecID').value();
    saveData[19] = $('#LoaiHopDongLDID').value();
    saveData[20] = $('#KhaNangDapUngID').value();
    saveData[21] = $('#HinhThucLamViecID').value();
    saveData[22] = $('#MucDichLamViecID').value();
    saveData[23] = $('#MucLuongID').value();
    saveData[24] = $('#LuongTheoNgay').value();
    saveData[25] = $('#LuongTheoGio').value();
    saveData[26] = JSON.stringify($('#CheDoPhucLoi').value());
    saveData[27] = $('#CheDoPhucLoiKhac').value();
    saveData[28] = JSON.stringify($('#NoiLamViecID').value());
    saveData[29] = JSON.stringify($('#TrongLuongNangID').value());
    saveData[30] = JSON.stringify($('#DiDungID').value());
    saveData[31] = JSON.stringify($('#NgheNoiID').value());
    saveData[32] = JSON.stringify($('#ThiLucID').value());
    saveData[33] = JSON.stringify($('#ThaoTacTayID').value());
    saveData[34] = JSON.stringify($('#Dung2TayID').value());
    saveData[35] = JSON.stringify($('#SanSangLamViecID').value());
    saveData[36] = JSON.stringify($('#HinhThucTuyenDungID').value());
    saveData[37] = $('#SelectPhieuDKGTVL_US').attr('value');
    var result = NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/LuuThongTinBuoc3', { data: saveData });
    if (!result.Err) {
        NTS.thanhcong(result.Msg);
        $('#mdThemMoiViecLamMongMuon').modal('hide');
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;

});

//------------------------------Xóa Việc tìm người-----------------------------

function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'NguoiTimViecID', ID: ID, TenBangHienTai: 'NguoiTimViec', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/XoaDuLieu', { id: ID });
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
function SuaDuLieuNguoiTimViec(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#lblTieuDeThemMoiViecLamMongMuon').text('Cập nhật thông tin Phiếu đăng ký tìm việc làm');
    $('#mdThemMoi').modal('show');
    resetForm('#mdThemMoi');
    resetForm('#lblTieuDeThemMoiViecLamMongMuon');
    resetForm('#mdKinhNghiemVaDKDichVu');
    const result = NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];

        if (data.DanhGiaNgoaiNgu1 == "1") {
            $('#NgoaiNgu1_Tot').value(1);
        } else if (data.DanhGiaNgoaiNgu1 == "2") {
            $('#NgoaiNgu1_Kha').value(1);
        } else if (data.DanhGiaNgoaiNgu1 == "3") {
            $('#NgoaiNgu1_TrungBinh').value(1);
        } else {
            $('#NgoaiNgu1_Tot').value(0);
            $('#NgoaiNgu1_Kha').value(0);
            $('#NgoaiNgu1_TrungBinh').value(0);
        }
        if (data.DanhGiaNgoaiNgu2 == "1") {
            $('#NgoaiNgu2_Tot').value(1);
        } else if (data.DanhGiaNgoaiNgu2 == "2") {
            $('#NgoaiNgu2_Kha').value(1);
        } else if (data.DanhGiaNgoaiNgu2 == "3") {
            $('#NgoaiNgu2_TrungBinh').value(1);
        } else {
            $('#NgoaiNgu2_Tot').value(0);
            $('#NgoaiNgu2_Kha').value(0);
            $('#NgoaiNgu2_TrungBinh').value(0);
        }
        if (data.DanhGiaTinHoc == "1") {
            $('#ChungChiTinHocVP_Tot').value(1);
        } else if (data.DanhGiaTinHoc == "2") {
            $('#ChungChiTinHocVP_Kha').value(1);
        } else if (data.DanhGiaTinHoc == "3") {
            $('#ChungChiTinHocVP_TrungBinh').value(1);
        } else {
            $('#ChungChiTinHocVP_Tot').value(0);
            $('#ChungChiTinHocVP_Kha').value(0);
            $('#ChungChiTinHocVP_TrungBinh').value(0);
        }
        if (data.DanhGiaTinHocKhac == "1") {
            $('#ChungChiTinHocKhac_Tot').value(1);
        } else if (data.DanhGiaTinHocKhac == "2") {
            $('#ChungChiTinHocKhac_Kha').value(1);
        } else if (data.DanhGiaTinHocKhac == "3") {
            $('#ChungChiTinHocKhac_TrungBinh').value(1);
        } else {
            $('#ChungChiTinHocKhac_Tot').value(0);
            $('#ChungChiTinHocKhac_Kha').value(0);
            $('#ChungChiTinHocKhac_TrungBinh').value(0);
        }
        var itemDT = `<li><span><b>${data.TenDoiTuong}</b>, ngày sinh: <b>${data.NgaySinh}</b>, Giới tính: <b>${data.TenGioiTinh}</b>, Quốc tịch: <b>${data.TenQuocTich}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
        $('.btn-select-DoiTuongNN').html(itemDT);
        $('.btn-select-DoiTuongNN').attr('value', data.ThanhVienHoGDID);
        $('#DoiTuongNNID_ChuHo').value(data.ThanhVienHoGDID);

        var itemNTV = `<li><span><b>${data.TenCongViecVTN}</b>, Tổ chức: <b>${data.TenToChuc}</b>, thời hạng tuyển dụng: <b>${data.NgayDKTuyenDung} - ${data.NgayHetTuyenDung}</b>, địa chỉ: <b>${data.DiaChiTuyenDung}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
        $('.btn-select-PhieuDKGTVL').html(itemNTV);
        $('.btn-select-PhieuDKGTVL').attr('value', data.ViecTimNguoiID);
        $('#PhieuDKGTVLID_ComBo').value(data.ViecTimNguoiID);

        $('#PhieuDKTimViecID').value(data.PhieuDKTimViecID);
        $('#MaSo').value(data.MaSoPhieuDKTimViec);
        $('#NgayNopHoSo').value(data.NgayNopHS);
        $('#DoiTuongUuTienID').value(JSON.parse(data.DoiTuongUuTienID));
        $('#SoDiDong').value(data.SoDienThoai1);
        $('#Email').value(data.Email);
        $('#TinhID_TT').value(data.DiaBanHC_TT_TinhID);
        $('#HuyenID_TT').value(data.DiaBanHC_TT_HuyenID);
        $('#XaID_TT').value(data.DiaBanHC_TT_XaID);
        $('#ThonID_TT').value(data.DiaBanHC_TT_ThonID);
        $('#SoNha_TT').value(data.SoNhaTT);
        $('#DiaChiThuongTru').value(data.DiaChi_TT);
        $('#TinhID_HN').value(data.DiaBanHC_HN_TinhID);
        $('#HuyenID_HN').value(data.DiaBanHC_HN_HuyenID);
        $('#XaID_HN').value(data.DiaBanHC_HN_XaID);
        $('#ThonID_HN').value(data.DiaBanHC_HN_ThonID);
        $('#SoNha_HN').value(data.SoNhaHT);
        $('#DiaChiThuongTruHN').value(data.DiaChi_HN);
        $('#TrinhDoPTID').value(data.TrinhDoHVID);
        $('#TrinhDoCMKTID').value(data.TrinhDoCMKTID);
        $('#ChuyenNganhDTID').value(data.ChuyenNganhDaoTaoID);
        $('#TrinhDoCMKTID_Khac').value(data.TrinhDoCMKTID_Khac);
        $('#ChuyenNganhDaoID_Khac').value(data.ChuyenNganhDaoTaoID_Khac);
        $('#TrinhDoKyNangNgheID').value(data.TrinhDoKyNangNghe);
        $('#BacKyNangNghe').value(data.BacTrinhDoKyNangNghe);
        $('#NgoaiNgu1').value(data.TrinhDoNgoaiNgu1);
        $('#NgoaiNgu2').value(data.TrinhDoNgoaiNgu2);
        $('#TinHocVP').value(data.TrinhDoTinHoc);
        $('#TinHocKhac').value(data.TrinhDoTinHocKhac);
        $('#KyNangMem').value(JSON.parse(data.KyNangMem));
        $('#KyNangMemKhac').value(data.KyNangMemKhac);
        $('#ChungChiNgoaiNgu2').value(data.ChungChiNgoaiNgu2);
        $('#ChungChiNgoaiNgu1').value(data.ChungChiNgoaiNgu1);
        $('#QuocGiaID_LamViec').value(data.QuocGiaLamViecID);
        $('#DangKyDichVuID').value(JSON.parse(data.DKDVTuVan));
        $('#NoiDungDichVuKhac').value(data.DKDVTuVan_Khac);
        $('#NguoiTimViecID').value(data.NguoiTimViecID);
        $('#MaSoNguoiTimViec').value(data.MaSoPhieuDKTimViec);
        $('#LoaiHinDNID').value(data.LoaiHinhDNID);
        $('#TenCongViec').value(data.TenCongViec);
        $('#MoTaCongViec').value(data.MoTaCongViec);
        $('#MaNgheCap1').value(data.NganhKinhTeID_Cap1);
        $('#MaNgheCap2').value(data.NganhKinhTeID_Cap2);
        $('#MaNgheCap3').value(data.NganhKinhTeID_Cap3);
        $('#MaNgheCap4').value(data.NganhKinhTeID_Cap4);
        $('#TinhID_UuTien1').value(data.DiaBanHC_NoiLV1_TinhID);
        $('#HuyenID_UuTien1').value(data.DiaBanHC_NoiLV1_HuyenID);
        $('#Quan_UuTien1').value(data.NoiLV_KCN1);
        $('#TinhID_UuTien2').value(data.DiaBanHC_NoiLV2_TinhID);
        $('#HuyenID_UuTien2').value(data.DiaBanHC_NoiLV2_HuyenID);
        $('#Quan_UuTien2').value(data.NoiLV_KCN2);
        $('#ChucVuID').value(data.ChucVuID);
        $('#ChucVuKhac').value(data.ChucVuKhac);
        $('#KinhNghiemLamViecID').value(data.KinhNghiemLVID);
        $('#LoaiHopDongLDID').value(data.LoaiHopDongID);
        $('#KhaNangDapUngID').value(data.KhaNangDapUngID);
        $('#HinhThucLamViecID').value(data.HinhThucLamViecID);
        $('#MucDichLamViecID').value(data.MucDichLamViecID);
        $('#MucLuongID').value(data.MucLuongID);
        $('#LuongTheoNgay').value(data.LuongTheoNgay);
        $('#LuongTheoGio').value(data.LuongTheoGio);
        $('#CheDoPhucLoiKhac').value(data.CheDoPhucLoi_Khac);
        //$('#CheDoPhucLoi').value(JSON.parse(data.CheDoPhucLoiID));
        $('#NoiLamViecID').value(JSON.parse(data.NoiLamViecID));
        $('#TrongLuongNangID').value(JSON.parse(data.TrongLuongNangID));
        $('#DiDungID').value(JSON.parse(data.Dung_DiLaiID));
        $('#NgheNoiID').value(JSON.parse(data.NgheNoiID));
        $('#ThiLucID').value(JSON.parse(data.ThiLucID));
        $('#ThaoTacTayID').value(JSON.parse(data.ThaoTacBangTayID));
        $('#Dung2TayID').value(JSON.parse(data.DungHaiTayID));
        $('#SanSangLamViecID').value(JSON.parse(data.SanSanLVID));
        $('#HinhThucTuyenDungID').value(JSON.parse(data.HinhThucTuyenDung));

        if (data.ChucVuVTN == "") {
            $('#lblChuVu_PhieuDKGTVL').html('---');
        } else {
            $('#lblChuVu_PhieuDKGTVL').html(data.ChucVuVTN);
        }
        if (data.TenMucLuongVTN == "") {
            $('#lblMucLuong_PhieuDKGTVL').html('---');
        } else {
            $('#lblMucLuong_PhieuDKGTVL').html(data.TenMucLuongVTN);
        }
        if (data.HocVanVTN == "") {
            $('#lblHocVan_PhieuDKGTVL').html('---');
        } else {
            $('#lblHocVan_PhieuDKGTVL').html(data.HocVanVTN);
        }
        if (data.CheDoPhucLoiVTN == "") {
            $('#lblCheDoPhucLoi_PhieuDKGTVL').html('---');
        } else {
            $('#lblCheDoPhucLoi_PhieuDKGTVL').html(data.CheDoPhucLoiVTN);
        }
        if (data.TenTrinhDoCMKTVTN == "") {
            $('#lblCMKT_PhieuDKGTVL').html('---');
        } else {
            $('#lblCMKT_PhieuDKGTVL').html(data.TenTrinhDoCMKTVTN);
        }
        if (data.DieuKienLVVTN == "") {
            $('#lblDKLV_PhieuDKGTVL').html('---');
        } else {
            $('#lblDKLV_PhieuDKGTVL').html(data.DieuKienLVVTN);
        }
        if (data.TenHinhThucLamViecVTN == "") {
            $('#lblHinhThucLV_PhieuDKGTVL').html('---');
        } else {
            $('#lblHinhThucLV_PhieuDKGTVL').html(data.TenHinhThucLamViecVTN);
        }

        if (data.HinhThucTuyenDungVTN == "") {
            $('#lblHinhThucTuyenDung_PhieuDKGTVL').html('---' + ", Thời hạn: " + data.NgayHetTuyenDung);

        } else {
            $('#lblHinhThucTuyenDung_PhieuDKGTVL').html(data.HinhThucTuyenDungVTN + ", Thời hạn: " + data.NgayHetTuyenDung);
        }

        var listFiles_VanBan_USHS = [];
        $('#txtHoSoKemTheo_USDangKy').val(data.Dinhkem);
        if (data.Dinhkem == '' || data.Dinhkem == null) {
            ResetDinhKemFileHS();
        }
        else {
            for (var i = 0; i < data.Dinhkem.split('*').length; i++) {
                if (data.Dinhkem.split('*')[i] == '') {
                    continue;
                }
                listFiles_VanBan_USHS.push(data.Dinhkem.split('*')[i].split('/')[data.Dinhkem.split('*')[i].split('/').length - 1].replaceAll('*', '').toString());
            }
            $('#HoSoKemTheo_USDangKy').ace_file_input('show_file_list', listFiles_VanBan_USHS);
            var ItemImg = $(".ace-icon.fa.fa-picture-o.file-image");
            //code chuyen doi chuoi dinh kem thanh array
            if (data.Dinhkem != null && data.Dinhkem.length > 0) {
                var linkVB = data.Dinhkem;
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


            /// Đính kem

            var listFiles_VanBan_US = [];
            $('#txtDinhKem_VanBan').val(data.TaiLieu);
            if (data.TaiLieu == '' || data.TaiLieu == null) {
                ResetDinhKemFileTL();
            }
            else {
                for (var i = 0; i < data.TaiLieu.split('*').length; i++) {
                    if (data.TaiLieu.split('*')[i] == '') {
                        continue;
                    }
                    listFiles_VanBan_US.push(data.TaiLieu.split('*')[i].split('/')[data.TaiLieu.split('*')[i].split('/').length - 1].replaceAll('*', '').toString());
                }
                $('#DinhKem_VanBan').ace_file_input('show_file_list', listFiles_VanBan_US);
                var ItemImg = $(".ace-icon.fa.fa-picture-o.file-image");
                //code chuyen doi chuoi dinh kem thanh array
                if (data.TaiLieu != null && data.TaiLieu.length > 0) {
                    var linkVB = data.TaiLieu;
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
        }
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
}

$(document).on('click', '.btnSuaTT', function () {
    var ID = $(this).attr('data');
    tempthem = 'sua';
    SuaDuLieuNguoiTimViec(ID);
});


//TimKiem//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiem', async function () {
    LoadDataTable();
    $('#KhungTimKiem').slideUp(200);
    return false;

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
    saveData[7] = $('#HoVaTen_TimKiem_US').value();
    saveData[8] = $('#SoCCCD_TimKiem_US').value();
    var kq = await NTS.getAjax('/QuanLy/PhieuDangKyTimViecLam/XuatExcel_PhieuDKTimViecLam', { data: saveData });
    if (!kq.Err) {
        window.open(kq);
    } else {
        NTS.loi(kq.Msg);
    }
});

$(document).on('click', '.btnInMau01', function () {
    var ID = $(this).attr('data');
    XuatMau01(ID);
});

async function XuatMau01(ID) {
    var data = await NTS.getAjaxAsync('/QuanLy/PhieuDangKyTimViecLam/XuatMau01PLI', { id: ID });
    //window.open(data);
    try {
        $('#divNoiDung_us').attr("src", data.replace(".docx", ".pdf"));
        $('#modal_xemtruockhiin_us').modal('show');
        $('#modal_taifile_us').show();
        $('#modal_taifile2_us').hide();
    } catch (ex) {

    }
}


$(document).on('click', '.btnInMau01a', function () {
    var ID = $(this).attr('data');
    XuatMau01a(ID);
});

async function XuatMau01a(ID) {
    var data = await NTS.getAjaxAsync('/QuanLy/PhieuDangKyTimViecLam/XuatMau01aPLI', { id: ID });
    //window.open(data);
    try {
        $('#divNoiDung_us').attr("src", data.replace(".docx", ".pdf"));
        $('#modal_xemtruockhiin_us').modal('show');
        $('#modal_taifile_us').show();
        $('#modal_taifile2_us').hide();
    } catch (ex) {

    }
}

$(document).on('click', '.btnInGioiThieuVL', function () {
    var ID = $(this).attr('data');
    XuatPhieuGioiThieu(ID);
});

async function XuatPhieuGioiThieu(ID) {
    var data = await NTS.getAjaxAsync('/QuanLy/PhieuDangKyTimViecLam/XuatPhieuGioiThieu', { id: ID });
    //window.open(data);
    try {
        $('#divNoiDung_us').attr("src", data.replace(".docx", ".pdf"));
        $('#modal_xemtruockhiin_us').modal('show');
        $('#modal_taifile_us').show();
        $('#modal_taifile2_us').hide();
    } catch (ex) {

    }
}



Grid1.on("rowDblClick", function (e, row) {
    var data = row.getData();
    SuaDuLieuNguoiTimViec(data.PhieuDKTimViecID);
});

GridDanhGia.on("rowDblClick", function (e, row) {
    var data = row.getData();
    SuaDuLieuDanhGia(data.DanhGiaTVDVID);
});


GridKinhNghiemLamViec.on("rowDblClick", function (e, row) {
    var data = row.getData();
    SuaDuLieuKinhNghiemLV(data.KinhNghiemLVUngVienID);
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

$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        Grid1.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid1.setFilter(matchAny, { value: $('#timKiem').val() });
});

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
