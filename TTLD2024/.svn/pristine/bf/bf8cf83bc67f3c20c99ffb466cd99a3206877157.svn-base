var tempthem = "them";
var tempthemHA = "them";
var tenBangThamChieu = 'GiayPhepLD';
var tinhTrang = 'CapMoi';
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
    setTimeout(() => {
        $('#TrangThai_TimKiem_us').select2({ width: '100%' });
    }, 300)
    ThietLapCotTrenLuoi(tenBangThamChieu, Grid1); // thiết lập cột trên lưới

    // Modal thêm mới
    $(".thugon").click(function () {
        var infoBox = $(".info_hosodenghi");
        if (infoBox.is(":visible")) {
            infoBox.hide(); // Hide the info_hosodenghi
            $(".tab_noidung").removeClass("col-md-6").addClass("col-md-10"); // Expand tab_noidung to fill the space
            $(".thugon i").removeClass("fa-chevron-right").addClass("fa-chevron-left"); // Change icon to right arrow
        } else {
            infoBox.show(); // Show the info_hosodenghi
            $(".tab_noidung").removeClass("col-md-10").addClass("col-md-6"); // Return tab_noidung to its original size
            $(".thugon i").removeClass("fa-chevron-left").addClass("fa-chevron-right"); // Change icon to left arrow
        }
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

function Loadcombo() {
    NTS.loadDataCombo({
        name: '#selViTriCongViec_us,#selViTriCongViec_XN',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_ViTriViecLam_NguoiNNLVVN',
        columns: 1,
        indexValue: 0,
        indexText1: 1,
        textShowTatCa: '--Tất cả--',
        showTatCa: !0,
        //indexDefault: 3,
    });
    NTS.loadDataCombo({
        name: '#selHinhThucLV_us,#selHinhThucLV_XN',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_HinhThucLV',
        ajaxParam: { id: '' },
        columns: 1,
        indexValue: 0,
        indexText1: 1,
        textShowTatCa: '--Tất cả--',
        showTatCa: !0,
        //indexDefault: 3,
    });
    NTS.loadDataCombo({
        name: '#selChucDanhCV_us,#selChucDanhCV_XN',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_ChucVu',
        ajaxParam: { id: '' },
        columns: 1,
        indexValue: 0,
        indexText1: 1,
        textShowTatCa: '--Tất cả--',
        showTatCa: !0,
        //indexDefault: 3,
    });
}

//<a class="dropdown-item btnThuHoi  " href="#" data="${ID}">
//    <i class="text-warning fa-solid fa-arrow-rotate-left"></i>&ensp;  Thu hồi GPLĐ/GXN
//</a>

function actionDropdownFormatter(cell, formatterParams, onRendered) {
    var ID = cell.getData().GiayPhepLDID;
    var TrangThai = cell.getData().TrangThai;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
           <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
           <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
                <a  class="dropdown-item btnXemTT  " href="#" data="${ID}">
                     <i class="fa fa-eye " aria-hidden="true" style="paddding-right:10px; color:#019017"></i>&ensp;  Xem GPLĐ/GXN
               </a>
                <a  class="dropdown-item btnInTT  " href="#" data="${ID}">
                     <i class=" fa fa-print iconsize-item" style="paddding-right:10px; color:#4299E1 !important"></i>&ensp;  In GPLĐ/GXN
               </a>
                ` + (TrangThai == 40 ? `<a  class="dropdown-item btnSuaTTXacNhan  " href="#" data="${ID}">
                                <i class="fa fa-pencil text-warning" aria-hidden="true"></i>&ensp;  Chỉnh sửa GPLĐ/GXN
                           </a>`
                    : ` <a  class="dropdown-item btnSuaTT  " href="#" data="${ID}">
                                <i class="fa fa-pencil text-warning" aria-hidden="true"></i>&ensp;  Chỉnh sửa GPLĐ/GXN
                           </a>`
        ) + `
                 ` + (TrangThai == 40 ? '' : TrangThai == 44 ? `<a  class="dropdown-item btnBoThuHoi  " href="#" data="${ID}"><i class="text-warning fa-solid fa-arrow-rotate-left"></i>&ensp;  Bỏ thu hồi GPLĐ/GXN</a> `
                    : ` <a  class="dropdown-item btnThuHoi  " href="#" data="${ID}"><i class="text-warning fa-solid fa-arrow-rotate-left"></i>&ensp;  Thu hồi GPLĐ/GXN</a>`
                   ) + `
              
                <a  class="dropdown-item btnXoaTT" href="#" data="${ID}">
                    <i class='fa fa-trash-o  text-danger'></i>&ensp;  Xoá GPLĐ/GXN
               </a>
           </div>
       </div>`;

    return select;
}
function labelGPLDGXN(cell, formatterParams, onRendered) {
    data = cell.getData().TrangThai;
    let TinhTrang = "";
    if (data == '40') {
        TinhTrang = "Giấy xác nhận";
    } else {
        TinhTrang = "Giấy phép lao động";
    }
    return `<div class="badge" style="background:var(--tblr-color-header);">${TinhTrang}</div>`;
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
        { title: "Ngày cấp GPLĐ/GXN", field: "NgayCapGPLD", formatter: 'textarea', width: 120, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center" },
        { title: "Số GPLĐ/GXN", field: "SoGPLD", formatter: 'textarea', minWidth: 100, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Họ và tên", field: "HoVaTen", formatter: 'textarea', minWidth: 150, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Giới tính", field: "TenGioiTinh", formatter: 'textarea', minWidth: 110, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Ngày sinh", field: "NgaySinh", formatter: 'textarea', vertAlign: "middle", minWidth: 130, headerHozAlign: "center", hozAlign: "center" },
        { title: "Quốc tịch", field: "TenQuocTich", formatter: 'textarea', vertAlign: "middle", minWidth: 140, headerHozAlign: "center", hozAlign: "left" },
        { title: "Số hộ chiếu", field: "SoHoChieu", formatter: 'textarea', vertAlign: "middle", minWidth: 130, headerHozAlign: "center", hozAlign: "left" },
        { title: "Ngày cấp", field: "NgayCapSHC", formatter: 'textarea', vertAlign: "middle", minWidth: 120, headerHozAlign: "center", hozAlign: "center" },
        { title: "Nơi làm việc", field: "DiaDiemLV", formatter: 'textarea', vertAlign: "middle", minWidth: 450, headerHozAlign: "center" },
        { title: "Thời hạn làm việc", field: "ThoiGianLV", formatter: 'textarea', vertAlign: "middle", minWidth: 260, headerHozAlign: "center" },
        { title: "Tình trạng GPLĐ", field: "TinhTrang", formatter: 'textarea', vertAlign: "middle", minWidth: 150, headerHozAlign: "center" },
        { title: "GPLĐ/GXN", field: "GPLD", formatter: labelGPLDGXN, vertAlign: "middle", minWidth: 150, headerHozAlign: "center", hozAlign: "center"  },
        { title: "GiayPhepLDID", field: "GiayPhepLDID", width: 0, visible: false }
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
    saveData[8] = $('#lblKhongThuocCapGPLD_TimKiem_us').value();
    saveData[9] = $('#TrangThai_TimKiem_us').value();
    Grid1.clearData();
    const GetAll = await NTS.getAjaxAsync("/QuanLy/GiayPhepLD/GetAll", { data: saveData });
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
        Grid1.redraw(1);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.thongbaoloi(GetAll.Msg);
    GridKhongCoDuLieu("Grid1");
}


//TimKiem//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiem', async function () {
    await LoadDataTable();
    $('#KhungTimKiem').slideUp(200);
    return false;

});

function resetText() {
    $('.text-inputdenngay').text('');
    $('.text-inputdenthang').text('');
    $('.text-inputdennam').text('');
    $('.text-inputtungay').text('');
    $('.text-inputtuthang').text('');
    $('.text-inputtunam').text('');
    $('.text-inputvitricv').text('');
    $('.text-inputchudanhcv').text('');
    $('.text-input-hinhthuclv').text('');
    $('.GiayPhep_So').text('');
    $('.text-inputdiadiemlamviec').text('');
    $('.text-inputlydokhongcapphep').text('');
    $('.GiayPhep_No').text('');
    $('.text-inputHoVaTen').text('');
    $('.text-inputGTNam').text('');
    $('.text-inputGTNu').text('');
    $('.text-inputNgaySinh').text('');
    $('.text-inputQuocTich').text('');
    $('.text-inputSohoChieu').text('');
    $('.text-inputTenToChuc').text('');
    $('.text-inputvitricv').text('');
    $('.text-inputchudanhcv').text('');
    $('.text-input-hinhthuclv').text('');
    $('.text-inputlydokhongcapphep').text('');
}

$(document).on('click', '#btnThemMoi', function () {
    $('#mdThemMoiGiayPhepLD_us').modal('show');
    resetText();
    const result = NTS.getAjax('/QuanLy/GiayPhepLD/LoadDuLieuHoSoDeNghi', {});
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        if (data.NoiDungHoSoDeNghi != '') {
            $('#NoiDungHoSoDeNghi').html(data.NoiDungHoSoDeNghi.replaceAll("\n", "</br>"));
            $('#NoiDungHS').html(data.NoiDungHoSoDeNghi.replaceAll("\n", "</br>"));
        } else {
            $('#NoiDungHoSoDeNghi').html("Chưa có hồ sơ đề nghị");
            $('#NoiDungHS').html("Chưa có hồ sơ đề nghị");
        }
    } else {
        $('#NoiDungHoSoDeNghi').html("Chưa có hồ sơ đề nghị");
        $('#NoiDungHS').html("Chưa có hồ sơ đề nghị");
    }
});

//------------------------ Modal cấp mới giấy phép lao động---------------------------//
$(document).on('click', '#btnThemMoiCapMoi', function () {
    $('#mdCapMoiGiayPhepLD').modal('show');
    resetText();
    resetForm('#mdCapMoiGiayPhepLD');
    NTS.hienNgayHienTaiLenTextbox('NgayCap');
    tempthemHA = 'them';
    tempthem = 'them';
    tinhTrang = 'CapMoi';
    $('#LyDo_us').css({ "display": "none" });
    $('#lblLyDo_us').css({ "display": "none" });
    $('#SelectDoiTuongNN_US').attr('value','');
    $('#SelectToChuc_US').attr('value', '');
    var itemDT = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn đối tượng- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
    $('.btn-select-DoiTuongNN').html(itemDT);
    var itemTC = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn tổ chức- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
    $('.btn-select-tochuc').html(itemTC);
    $('#txtDinhKem_VanBan_US').value('');
    ResetDinhKemFile();
    $('.GiayPhep_Img').css({
        'background-image': 'none'  // Xóa background-image
    });
    $('#GiayPhep_Img_mau').css({
        'background-image': 'none'  // Xóa background-image
    });
    $('.text-img').css({
        'display': 'block'  // Xóa background-image
    });
    Loadcombo();
    $('.text-capmoi').html('&#x2612;');
    $('.text-caplai').html('&#x2610;');
    $('.text-Giahan').html('&#x2610;');
    $('.text-inputtinhtrangGiaypld').text('Cấp mới');

    // Lấy ngày hiện tại
    var today = new Date();

    // Lấy ngày, tháng, năm
    var ngay = String(today.getDate()).padStart(2, '0');  // Thêm số 0 vào nếu ngày < 10
    var thang = String(today.getMonth() + 1).padStart(2, '0');  // Tháng bắt đầu từ 0 nên cần +1
    var nam = today.getFullYear();

    $('.text-inputngayhientai').text(ngay);
    $('.text-inputthanghientai').text(thang);
    $('.text-inputnamhientai').text(nam);
});

//------------------------ Modal cấp lại giấy phép lao động---------------------------//
$(document).on('click', '#btnThemMoiCapLai', function () {
    $('#mdCapMoiGiayPhepLD').modal('show');
    resetText();
    resetForm('#mdCapMoiGiayPhepLD');
    NTS.hienNgayHienTaiLenTextbox('NgayCap');
    tempthemHA = 'them';
    tempthem = 'them';
    tinhTrang = 'CapLai';
    $('#LyDo_us').css({ "display": "block" });
    $('#lblLyDo_us').css({ "display": "block" });
    $('#lblLyDo_us').text('Lý do đề nghị cấp lại');
    $('#SelectDoiTuongNN_US').attr('value', '');
    $('#SelectToChuc_US').attr('value', '');
    var itemDT = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn đối tượng- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
    $('.btn-select-DoiTuongNN').html(itemDT);
    var itemTC = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn tổ chức- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
    $('.btn-select-tochuc').html(itemTC);
    $('#txtDinhKem_VanBan_US').value('');
    ResetDinhKemFile();
    $('.GiayPhep_Img').css({
        'background-image': 'none'  // Xóa background-image
    });
    $('#GiayPhep_Img_mau').css({
        'background-image': 'none'  // Xóa background-image
    });
    $('.text-img').css({
        'display': 'block'  // Xóa background-image
    });
    Loadcombo();
    $('.text-capmoi').html('&#x2610;');
    $('.text-caplai').html('&#x2612;');
    $('.text-Giahan').html('&#x2610;');
    $('.text-inputtinhtrangGiaypld').text('Cấp lại');

    // Lấy ngày hiện tại
    var today = new Date();

    // Lấy ngày, tháng, năm
    var ngay = String(today.getDate()).padStart(2, '0');  // Thêm số 0 vào nếu ngày < 10
    var thang = String(today.getMonth() + 1).padStart(2, '0');  // Tháng bắt đầu từ 0 nên cần +1
    var nam = today.getFullYear();

    $('.text-inputngayhientai').text(ngay);
    $('.text-inputthanghientai').text(thang);
    $('.text-inputnamhientai').text(nam);
});

//------------------------ Modal Xác nhận không thuộc diện cấp giấy phép lao động---------------------------//
$(document).on('click', '#btnThemMoiXacNhanKhongCapGiay', function () {
    $('#mdXacNhanKhongCapGiayPhepLD').modal('show');
    resetText();
    resetForm('#mdXacNhanKhongCapGiayPhepLD');
    NTS.hienNgayHienTaiLenTextbox('NgayCap_XN');
    tempthem = 'them';
    $('#SelectDoiTuongNN_USXacNhan').attr('value', '');
    $('#SelectToChuc_USXacNhan').attr('value', '');
    var itemDT = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn đối tượng- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
    $('.btn-select-DoiTuongNNXacNhan').html(itemDT);
    var itemTC = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn tổ chức- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
    $('.btn-select-tochucXacNhan').html(itemTC);
    $('#txtDinhKemXacNhan_VanBan_US').value('');
    ResetDinhKemFileXacNhan();
    $('.GiayPhep_Img').css({
        'background-image': 'none'  // Xóa background-image
    });
    $('#GiayPhep_Img_mau').css({
        'background-image': 'none'  // Xóa background-image
    });
    $('.text-img').css({
        'display': 'block'  // Xóa background-image
    });
    Loadcombo();
    // Lấy ngày hiện tại
    var today = new Date();

    // Lấy ngày, tháng, năm
    var ngay = String(today.getDate()).padStart(2, '0');  // Thêm số 0 vào nếu ngày < 10
    var thang = String(today.getMonth() + 1).padStart(2, '0');  // Tháng bắt đầu từ 0 nên cần +1
    var nam = today.getFullYear();

    $('.text-inputngayhientai').text(ngay);
    $('.text-inputthanghientai').text(thang);
    $('.text-inputnamhientai').text(nam);
});

//------------------------ Modal Gia hạn giấy phép lao động---------------------------//
$(document).on('click', '#btnGiaHanGiayPhepLD', function () {
    $('#mdCapMoiGiayPhepLD').modal('show');
    resetText();
    resetForm('#mdCapMoiGiayPhepLD');
    NTS.hienNgayHienTaiLenTextbox('NgayCap');
    tempthemHA = 'them';
    tempthem = 'them';
    tinhTrang = 'GiaHan';
    $('#LyDo_us').css({ "display": "none" });
    $('#lblLyDo_us').css({ "display": "none" });
    $('#SelectDoiTuongNN_US').attr('value', '');
    $('#SelectToChuc_US').attr('value', '');
    var itemDT = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn đối tượng- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
    $('.btn-select-DoiTuongNN').html(itemDT);
    var itemTC = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn tổ chức- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
    $('.btn-select-tochuc').html(itemTC);
    $('#txtDinhKem_VanBan_US').value('');
    ResetDinhKemFile();
    $('.GiayPhep_Img').css({
        'background-image': 'none'  // Xóa background-image
    });
    $('#GiayPhep_Img_mau').css({
        'background-image': 'none'  // Xóa background-image
    });
    $('.text-img').css({
        'display': 'block'  // Xóa background-image
    });
    Loadcombo();
    $('.text-capmoi').html('&#x2610;');
    $('.text-caplai').html('&#x2610;');
    $('.text-Giahan').html('&#x2612;');
    $('.text-inputtinhtrangGiaypld').text('Gia hạn');

    // Lấy ngày hiện tại
    var today = new Date();

    // Lấy ngày, tháng, năm
    var ngay = String(today.getDate()).padStart(2, '0');  // Thêm số 0 vào nếu ngày < 10
    var thang = String(today.getMonth() + 1).padStart(2, '0');  // Tháng bắt đầu từ 0 nên cần +1
    var nam = today.getFullYear();

    $('.text-inputngayhientai').text(ngay);
    $('.text-inputthanghientai').text(thang);
    $('.text-inputnamhientai').text(nam);
});

//------------------------ Xem Thong tin---------------------------//
$(document).on('click', '.btnXemTT', function () {
    $('#mdXemThongTinNguoiLaoDongNuocNgoai').modal('show');
});

//------------------------ Thu hồi giấy phép---------------------------//
$(document).on('click', '.btnThuHoi', function () {
    $('#mdThuHoiGiayPhepLD').modal('show');
    resetForm('#mdThuHoiGiayPhepLD');
    ResetDinhKemFileThuHoi();
    var ID = $(this).attr('data');
    $('#GiayPhepLDID').value(ID);
    NTS.hienNgayHienTaiLenTextbox('NgayKyThuHoi_ThuHoi');
});

//------------------------ Xử lý khi nhập input thì load qua giấy phép lao động---------------------------//
// Xử lý khi nhập input thì load qua giấy phép lao động
$('#SoGPLD').on('input', function () {
    // Lấy giá trị từ input và cập nhật phần tử với class GiayPhep_So
    $('.GiayPhep_So').text($(this).value());
});

$('#DiaChiNoiLV_us').on('input', function () {
    // Lấy giá trị từ input và cập nhật phần tử với class GiayPhep_So
    $('.text-inputdiadiemlamviec').text($(this).value());
});

$('#CanCu').on('input', function () {
    $('.GiayPhep_No').text($(this).value());
});

$('#selViTriCongViec_us').on('select2:select', function () {
    if ($('#selViTriCongViec_us').select2('data')[0].text == 'Quản lý') {
        $('.text-nhaquanly').html('&#x2612;');  // Sử dụng .html thay vì .text để hiển thị ký tự đặc biệt
        $('.text-ChuyenGia').html('&#x2610;');
        $('.text-LDKT').html('&#x2610;');
        $('.text-GDDH').html('&#x2610;');
    } else if ($('#selViTriCongViec_us').select2('data')[0].text == 'Giám đốc điều hành') {
        $('.text-nhaquanly').html('&#x2610;');  // Sử dụng .html thay vì .text để hiển thị ký tự đặc biệt
        $('.text-ChuyenGia').html('&#x2610;');
        $('.text-LDKT').html('&#x2610;');
        $('.text-GDDH').html('&#x2612;');
    } else if ($('#selViTriCongViec_us').select2('data')[0].text == 'Chuyên gia') {
        $('.text-nhaquanly').html('&#x2610;');  // Sử dụng .html thay vì .text để hiển thị ký tự đặc biệt
        $('.text-ChuyenGia').html('&#x2612;');
        $('.text-LDKT').html('&#x2610;');
        $('.text-GDDH').html('&#x2610;');
    } else if ($('#selViTriCongViec_us').select2('data')[0].text == 'Lao động kỹ thuật') {
        $('.text-nhaquanly').html('&#x2610;');  // Sử dụng .html thay vì .text để hiển thị ký tự đặc biệt
        $('.text-ChuyenGia').html('&#x2610;');
        $('.text-LDKT').html('&#x2612;');
        $('.text-GDDH').html('&#x2610;');
    }
});

$('#selHinhThucLV_us').on('select2:select', function () {
    $('.text-input-hinhthuclv').text($('#selHinhThucLV_us').select2('data')[0].text);
});
$('#selChucDanhCV_us').on('select2:select', function () {
    $('.text-inputchudanhcv').text($('#selChucDanhCV_us').select2('data')[0].text);
});
$('#NgayLamViec_us_TC').on('change', function () {
    var TuNgay = $(this).val(); // Lấy giá trị từ input

    if (TuNgay && TuNgay.includes('/')) {
        var parts = TuNgay.split('/');

        if (parts.length === 3) {
            var ngay = parts[0];
            var thang = parts[1];
            var nam = parts[2];

            $('.text-inputtungay').text(ngay);
            $('.text-inputtuthang').text(thang);
            $('.text-inputtunam').text(nam);
        }
    }
});

$('#NgayKetThuc_us_TC').on('change', function () {
    var TuNgay = $(this).val(); // Lấy giá trị từ input

    if (TuNgay && TuNgay.includes('/')) {
        var parts = TuNgay.split('/');

        if (parts.length === 3) {
            var ngay = parts[0];
            var thang = parts[1];
            var nam = parts[2];

            $('.text-inputdenngay').text(ngay);
            $('.text-inputdenthang').text(thang);
            $('.text-inputdennam').text(nam);
        }
    }
});

//------------------------------------Đính kèm tài liệu Cấp mới giấy phép lao động------------------------//
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
    $($('#DinhKem_CapMoiGiayPhepLD_us').get(0)).data('ace_input_files', emptyFileList);
    return result;
}

//----------------------------Đính kèm Cấp mới giấy phép lao động-----------------------------------//
$('#DinhKem_CapMoiGiayPhepLD_us').on('change', function () {
    var selectedFiles = this.files;

    // Kiểm tra và xử lý tệp đã chọn ở đây
    for (var i = 0; i < selectedFiles.length; i++) {
        var fileName = selectedFiles[i].name;
        var fileType = fileName.split('.').pop().toLowerCase();

        // Kiểm tra loại tệp
        if (fileType === 'docx' || fileType === 'pdf' || fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
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
$('#DinhKem_CapMoiGiayPhepLD_us').ace_file_input({
    style: 'well',
    btn_choose: 'Nhấn để chọn tệp hoặc kéo thả vào đây (Cho phép đính kèm các file có định dạng DOC, PDF, PNG, JPG, JPEG)',
    btn_change: null,
    no_icon: 'ace-icon fa fa-cloud-upload',
    droppable: true,
    thumbnail: 'large',
    allowExt: ["jpeg", "jpg", "png", "gif", "pdf", "docx"]
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
var file_input = $('#DinhKem_CapMoiGiayPhepLD_us');
file_input.ace_file_input('reset_input');
file_input
    .off('file.error.ace')
    .on('file.error.ace', function (e, info) {
    });

function RemoveAllFileInputAce() {
    var bang = "GiayPhepLD";
    var cot = "GiayPhepLDID";

    CanhBaoXoa(() => {
        var result = NTS.getAjax('/QuanLy/GiayPhepLD/XoaDinhKemGiayPhepLD', { ID: $('#GiayPhepLDID').val(), duongDan: '', bangDk: bang, cotDk: cot, loai: 'all' });
        if (!result.Err) {
            NTS.thanhcong(result.Msg);
            $('#txtDinhKem_VanBan_US').value("");
            ResetDinhKemFile();
            old_ItemFile = "";
            //$('#txtDinhKem_VanBan_US').value($('#txtDinhKem_VanBan_US').value().replaceAll(ListFile[i], '').replaceAll('**', '*'));
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}
var positionRemoveItiem = new Array();
$(document).on('click', '.XoaFileDinhKem', function () {
    debugger
    var GiayPhepLDID = $('#GiayPhepLDID').value();
    var TenFile = $(this).parent().attr('data-title');
    var ListFile = $('#txtDinhKem_VanBan_US').value().split('*');
    //Kiểm tra xem file xóa có phải là file vừa mới upload hay không - nếu là file vừa mới upload thì cho vào list xóa để không upload vào server
    if (!$(this).hasClass('img-db')) {
        var indexRemove = $('.XoaFileDinhKem').index(this);
        positionRemoveItiem.push(indexRemove);
    }
    //
    CanhBaoXoa(() => {
        for (var i = 0; i < ListFile.length; i++) {
            if (ListFile[i].includes(TenFile)) {
                var bang = "GiayPhepLD";
                var cot = "GiayPhepLDID";
                var result = NTS.getAjax('/QuanLy/GiayPhepLD/XoaDinhKemGiayPhepLD', { ID: GiayPhepLDID, duongDan: ListFile[i], bangDk: bang, cotDk: cot, loai: '' });

                if (!result.Err) {
                    NTS.thanhcong(result.Msg);
                    $('#txtDinhKem_VanBan_US').value($('#txtDinhKem_VanBan_US').value().replaceAll(ListFile[i], '').replaceAll('**', '*'))
                }
                else {
                    NTS.loi(result.Msg);
                }
            }
        }
        //$(this).parent().css('display', 'none');
        //if ($('#DinhKem_CapMoiGiayPhepLD_us').parent().find('.ace-file-name').length == 1 && $('#DinhKem_CapMoiGiayPhepLD_us').parent().find('.ace-file-name').css('display') == "none") {
        //    ResetDinhKemFile();
        //}
        $(this).parent().remove();
        if ($('#DinhKem_CapMoiGiayPhepLD_us').parent().find('.ace-file-name').length == 0) {
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
    $('#DinhKem_CapMoiGiayPhepLD_us').ace_file_input('reset_input');
    $('.ace-file-container').html(`<span class="ace-file-name" data-title="No File ..."><i class=" ace-icon ace-icon fa fa-cloud-upload"></i></span>`);
}




// Xử lý combo đối tượng người nước ngoài.
//// Xử lý Combo đối tượng
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

$('.vodiapickerDT option').each(function () {
    var name_cv = $(this).attr("data-name-cv");
    var name = $(this).attr("data-name");
    var code = $(this).attr("data-code");
    var genner = $(this).attr("data-genner");
    var cmnd = $(this).attr("data-cmnd");
    var tinh = $(this).attr("data-tinh");
    var huyen = $(this).attr("data-huyen");
    var xa = $(this).attr("data-xa");
    var thon = $(this).attr("data-thon");
    var doiTuongID = $(this).attr("value");
    var NoiThuongTru = $(this).attr("data-NoiThuongTru");
    const mauNgauNhien = getRandomColors(Color, 1);
    var item = "";
    item = `<li class="itemDoiTuongNN" action="true" style="display:none" data-name="${name}" data-code="${code}" data-cmnd="${cmnd}" data-NoiThuongTru="${NoiThuongTru}" value="${doiTuongID}"><div class="opImg" style="background-color:${mauNgauNhien}">${name_cv}</div><div class="opInfo"><div><b>${name}</b> (${code}), Giới tính: <b>${genner}</b>, CMND/CCCD: <b>${cmnd}</b></div><div class="text-diachi" title="${(thon == "" ? "" : thon + ", ")} ${xa}, ${huyen}, ${tinh}">Nơi thường trú: <b>${NoiThuongTru}</b></div></div></li>`;
    langArray.push(item);
});

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


function NumbervisibleLiCountDoiTuong() {
    var visibleLiCount = $('#ListDataDoiTuongNN li').filter(function () {
        return $(this).css('display') === 'flex';
    }).length;
    return visibleLiCount;
}

var soLuongHienThi_DoiTuongNN = 20;

function LoadMoreDoiTuongNN() {
    // Số phần tử đang hiển thị
    var visibleLiCount = NumbervisibleLiCountDoiTuong();
    // Hiển thị thêm 20 phần tử nữa
    $("#ListDataDoiTuongNN li").slice(visibleLiCount, visibleLiCount + soLuongHienThi_DoiTuongNN).css("display", "flex");

    // Kiểm tra nếu đã hiển thị hết tất cả các phần tử thì ẩn nút "Xem thêm"
    if (visibleLiCount + soLuongHienThi_DoiTuongNN >= $('#ListDataDoiTuongNN li').length - 1) {
        $("#loadMoreDoiTuongNNDK").css("display", "none");
    }
}

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
    const kq = NTS.getAjax('/DanhMuc/DungChung/GetDoiTuongNN_ComBoCapGPLD', { data: saveData }).Result;
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
        $('.text-inputHoVaTen').text(name);
        if (tengioitinh == 'Nam') {
            $('.text-inputGTNam').text('X');
            $('.text-inputGTNu').text('');
        } else if (tengioitinh == 'Nữ') {
            $('.text-inputGTNu').text('X');
            $('.text-inputGTNam').text('');
        } else {
            $('.text-inputGTNu').text('');
            $('.text-inputGTNam').text('');
        }

        if (ngaysinh != '') {
            $('.text-inputNgaySinh').text(ngaysinh);
        }
        if (tenquoctich != '') {
            $('.text-inputQuocTich').text(tenquoctich);
        }
        if (sohochieu != '') {
            $('.text-inputSohoChieu').text(sohochieu);
        }

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


// CLick xem modal chọn danh sách tổ chức 
$(document).on('click', '#HienThiTatCaDoiTuongNN', function () {
    $('#mdChonDoiTuongNN_us').modal('show');
    setTimeout(() => {  
        LoadTimKiem_ChonDoiTuongNN();
        PhanQuyenComBoDiaBan('TinhID_timKiemDoiTuonGNNTT_us_Chon', 'HuyenID_timKiemDoiTuonGNNTT_us_Chon', 'XaID_timKiemDoiTuonGNNTT_us_Chon', 'ThonID_timKiemDoiTuonGNNTT_us_Chon');
    }, 300);
    LoadDoiTuongNNChon();
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
    $('.btn-select-DoiTuongNN').html(item);
    $('.btn-select-DoiTuongNN').attr('value', dataGrid.DoiTuongNNID);
    $('#DoiTuongNNID_ChuHo').value(dataGrid.DoiTuongNNID);
    $(".OptionDoiTuongNN").toggle();
    $('#mdChonDoiTuongNN_us').modal('hide');
});

//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#btntimKiemDoiTuongNNTT_us_Chon', function () {
    LoadDoiTuongNNChon();
    $('#KhungTimKiem_DoiTuonGNNTT_us').slideUp(200);
    return false;
});

// Chọn 1 dòng dữ liệu tổ chức trên modal chọn đối tượng NN
Grid_ChonDoiTuongNNTT_us.on("rowDblClick", function (e, row) {
    var dataGrid = row.getData();
    ResetTTDoiTuong();
    var item = `<li><span><b>${dataGrid.HoVaTen}</b>, ngày sinh: <b>${dataGrid.NgayThangNamSinh}</b>, Giới tính: <b>${dataGrid.TenGioiTinh}</b>, Quốc tịch: <b>${dataGrid.TenQuocTich}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
    $('.btn-select-DoiTuongNN').html(item);
    $('.btn-select-DoiTuongNN').attr('value', dataGrid.DoiTuongNNID);
    $('#DoiTuongNNID_ChuHo').value(dataGrid.DoiTuongNNID);
    $('#mdChonDoiTuongNN_us').modal('hide');
});


//--------------------------------------------//
// Hàm load combo tổ chức
// Load ra combo tổ chức của địa bàn
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
        $('.text-inputTenToChuc').text(name);
        //$('#DiaChiDoiTuongNNTT_us').value(NoiThuongTru);
        //$('#MaSoThueDoiTuongNNTT_us').value(masothue);
        //$('#LoaiHinhDNIDDoiTuongNNTT_us').value(loaihinhDN);
        //// Lưu giá trị của tổ chức với trang thái ban đầu để so sánh nếu có thay đổi khi tiếp tục thì cảnh bảo
        //mangGiaTriDauTC = [];
        //mangGiaTriDauTC.push(replaceNullAndEmptyString(loaihinhDN));
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
    var item = `<li><span><b>${dataGrid.TenToChuc}</b> <b>(${dataGrid.MaToChuc})</b> - Địa chỉ: <b>${dataGrid.DiaChiCuThe}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
    $('.btn-select-tochuc').html(item);
    $('.btn-select-tochuc').attr('value', dataGrid.ToChucID);
    $('#ToChucID_ChuHo').value(dataGrid.ToChucID);
    $(".OptionToChuc").toggle();
    $('.btn-select-tochucXacNhan').html(item);
    $('.btn-select-tochucXacNhan').attr('value', dataGrid.ToChucID);
    $('#ToChucID_ChuHoXacNhan').value(dataGrid.ToChucID);
    $(".OptionToChucXacNhan").toggle();
    $('#mdChonToChuc_us').modal('hide');
});

// Chọn 1 dòng dữ liệu tổ chức trên modal chọn tổ chuc
Grid_ChonToChuc_us.on("rowDblClick", function (e, row) {
    var dataGrid = row.getData();
    //$('#DiaChiDoiTuongNNTT_us').value(dataGrid.DiaChiCuThe);
    //$('#MaSoThueDoiTuongNNTT_us').value(dataGrid.MaSoThue);
    //$('#LoaiHinhDNIDDoiTuongNNTT_us').value(dataGrid.LoaiHinhDNID);
    var item = `<li><span><b>${dataGrid.TenToChuc}</b> <b>(${dataGrid.MaToChuc})</b> - Địa chỉ: <b>${dataGrid.DiaChiCuThe}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
    $('.btn-select-tochuc').html(item);
    $('.btn-select-tochuc').attr('value', dataGrid.ToChucID);
    $('#ToChucID_ChuHo').value(dataGrid.ToChucID);
    $('.btn-select-tochucXacNhan').html(item);
    $('.btn-select-tochucXacNhan').attr('value', dataGrid.ToChucID);
    $('#ToChucID_ChuHoXacNhan').value(dataGrid.ToChucID);
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

$('.vodiapickerToChuc option').each(function () {
    var ToChucID = $(this).attr("value");
    var name = $(this).attr("data-name");
    var name_NSD = $(this).attr("data-name-NSD");
    var name_KCN = $(this).attr("data-name-KCN");
    var code = $(this).attr("data-code");
    var masothue = $(this).attr("data-masothue");
    var NoiThuongTru = $(this).attr("data-NoiThuongTru");
    var tinh = $(this).attr("data-tinh");
    var huyen = $(this).attr("data-huyen");
    var xa = $(this).attr("data-xa");
    var thon = $(this).attr("data-thon");
    const mauNgauNhien = getRandomColors(Color, 1);
    var item = `<li action="true" class="itemToChuc" data-name="${name}" data-code="${code}" data-NoiThuongTru="${kq[i].DiaChiCuThe}" value="${ToChucID}" data-masothue="${kq[i].MaSoThue}" data-loaiHinhDN="${kq[i].LoaiHinhDNID}" style="display: none;">
                        <div class="opImg" style="background-color:${mauNgauNhien}">${name_NSD}</div>
                        <div class="opInfo"><div><b>${name}</b> (${code}), Số ĐKKD/Mã số thuế: <b>${masothue}</b>, Người đại diện: <b>${kq[i].TenNguoiSuDungLD}</b></div>
                                <div class="text-diachi" title="${(thon == "" ? "" : thon + ", ")} ${xa}, ${huyen}, ${tinh}">Địa chỉ: <b>${NoiThuongTru}</b></div></div>
                    </li>`;
    langArrayToChuc.push(item);
});

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



/////////Tải hình ảnh
function resetUploadFile_TaiLieu() {
    $('#fileHinhAnh').value('');
    $('#txtDuongDanFileHinhAnh').value('');
}
//------------------------Dinh kem------------------------//
$(document).on('click', '#GiayPhep_Img_mau', function () {
    $('#fileHinhAnh').click();
});

$(document).on('change', '#fileHinhAnh', function () {
    UploadTaiLieu_us('HinhAnh'); //hàm dùng chung ở us TaiLieu
});
function UploadTaiLieu_us(pathChiTiet) {
    var data = NTS.upload({
        name: '#fileHinhAnh',///ID input type="file"
        loaiVB: 'HA',///Nhận 1 trong 2 giá trị DL hoặc VB
    });
    if (data.length > 0) {
        let LuuFile = data;
        $('#txtDuongDanFileHinhAnh').value(LuuFile); // Corrected .value() to .val()
        let arrFile = LuuFile.split('*');
        for (let p = 0; p < arrFile.length - 1; p++) {
            let filePath = arrFile[p].replace('~', '');
            let fileExt = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();

            if (fileExt === ".png" || fileExt === ".jpeg" || fileExt === ".jpg" || fileExt === "") {
                $('#GiayPhep_Img_mau').css('background-image', `url('${filePath}')`);
                $('#GiayPhep_Img_mau').attr('data-url-file', filePath);
                $('.GiayPhep_Img').css('background-image', `url('${filePath}')`);
                $('.GiayPhep_Img').attr('data-url-file', filePath);
                $('.text-img').css({ 'display': 'none' });
                $('#XemDinhKemChuKy_CauLD').attr('data-url-file', filePath);
                $('#XoaChuKy').attr('data-url-file', filePath);
            }
        }
    } else {
        NTS.loi('Tải file không thành công!');
    }
}

$('#NgayLamViec_us_TC').on('change', function () {
    let ngayLamViecVal = $(this).val();
    let ngayKetThucVal = $('#NgayKetThuc_us_TC').val();

    if (ngayLamViecVal !== '') {
        $(this).prop('required', true);
        $('#lblNgayLamViec_us_TC').addClass('validation');
        $('#NgayKetThuc_us_TC').prop('required', true);
        $('#lblNgayKetThuc_us_TC').addClass('validation');
    } else if (ngayLamViecVal === '' && ngayKetThucVal === '') {
        $(this).prop('required', false);
        $('#lblNgayLamViec_us_TC').removeClass('validation');
        $('#NgayKetThuc_us_TC').prop('required', false);
        $('#lblNgayKetThuc_us_TC').removeClass('validation');
    }
});

$('#NgayKetThuc_us_TC').on('change', function () {
    let ngayLamViecVal = $('#NgayLamViec_us_TC').val();
    let ngayKetThucVal = $(this).val();

    if (ngayKetThucVal !== '') {
        $(this).prop('required', true);
        $('#lblNgayKetThuc_us_TC').addClass('validation');
        $('#NgayLamViec_us_TC').prop('required', true);
        $('#lblNgayLamViec_us_TC').addClass('validation');
    } else if (ngayKetThucVal === '' && ngayLamViecVal === '') {
        $(this).prop('required', false);
        $('#lblNgayKetThuc_us_TC').removeClass('validation');
        $('#NgayLamViec_us_TC').prop('required', false);
        $('#lblNgayLamViec_us_TC').removeClass('validation');
    }
});


// Hàm để chuyển đổi chuỗi định dạng dd/mm/yyyy thành đối tượng Date
function parseDate(input) {
    var parts = input.split('/');
    // parts[0] là ngày, parts[1] là tháng, parts[2] là năm
    return new Date(parts[2], parts[1] - 1, parts[0]); // Lưu ý: Tháng trong Date() bắt đầu từ 0 (tháng 1 là 0)
}

$(document).on('click', '#btnLuuVaDongCapMoiGiayPhepLD_us', function () {
    const validate = new NTSValidate('#mdCapMoiGiayPhepLD');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }

    // Kiểm tra ngày tháng năm của ngày cấp không được lớn hơn ngày hết hạn
    var ngayLamViecFull = parseDate($('#NgayLamViec_us_TC').value());
    var ngayHetHanFull = parseDate($('#NgayKetThuc_us_TC').value());

    if ($('#NgayLamViec_us_TC').value() != '') {
        if (ngayLamViecFull >= ngayHetHanFull) {
            NTS.canhbao("Ngày bắt đầu làm việc không được lớn hơn hoặc bằng ngày kết thúc làm việc!");
            return false;
        }
    }

    if($('#SelectToChuc_US').attr('value') == ''){
        NTS.canhbao("Tổ chức không được bỏ trống!");
        return false;
    }

    if (tinhTrang == 'CapMoi') {
        var saveData = new Array();
        saveData[0] = tempthem;
        saveData[1] = $('#GiayPhepLDID').value();
        saveData[2] = $('#SoGPLD').value();
        saveData[3] = $('#CanCu').value();
        saveData[4] = $('#NgayCap').value();
        saveData[5] = $('#NguoiKy_us').value();
        saveData[6] = $('#CoQuanCap_US').value();
        saveData[7] = $('#SelectDoiTuongNN_US').attr('value');
        saveData[8] = $('#SelectToChuc_US').attr('value');
        saveData[9] = $('#DiaChiNoiLV_us').value();
        saveData[10] = $('#selViTriCongViec_us').value();
        saveData[11] = $('#selHinhThucLV_us').value();
        saveData[12] = $('#selChucDanhCV_us').value();
        saveData[13] = $('#MucLuong_US').value();
        saveData[14] = $('#NgayLamViec_us_TC').value();
        saveData[15] = $('#NgayKetThuc_us_TC').value();
        saveData[16] = $('#txtDuongDanFileHinhAnh').value();
        var data = uploadfileEvent({
            name: '#DinhKem_CapMoiGiayPhepLD_us',///ID input type="file"
            loaiVB: 'VB',
        });
        if (data.length > 0) {
            $('#txtDinhKem_VanBan_US').value(data);
            NTS.dongthongbao();
        }
        saveData[17] = $('#txtDinhKem_VanBan_US').value();
        var result = NTS.getAjax('/QuanLy/GiayPhepLD/LuuThongTinCapMoi', { data: saveData });
        if (!result.Err) {
            LoadDataTable();
            NTS.thanhcong(result.Msg);
            $('#mdCapMoiGiayPhepLD').modal('hide');
            $('#mdThemMoiGiayPhepLD_us').modal('hide');
            return false;
        } else {
            result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
        }
        return false;
    } else if (tinhTrang == 'CapLai') {
        var saveData = new Array();
        saveData[0] = tempthem;
        saveData[1] = $('#GiayPhepLDID').value();
        saveData[2] = $('#SoGPLD').value();
        saveData[3] = $('#CanCu').value();
        saveData[4] = $('#NgayCap').value();
        saveData[5] = $('#NguoiKy_us').value();
        saveData[6] = $('#CoQuanCap_US').value();
        saveData[7] = $('#SelectDoiTuongNN_US').attr('value');
        saveData[8] = $('#SelectToChuc_US').attr('value');
        saveData[9] = $('#DiaChiNoiLV_us').value();
        saveData[10] = $('#selViTriCongViec_us').value();
        saveData[11] = $('#selHinhThucLV_us').value();
        saveData[12] = $('#selChucDanhCV_us').value();
        saveData[13] = $('#MucLuong_US').value();
        saveData[14] = $('#NgayLamViec_us_TC').value();
        saveData[15] = $('#NgayKetThuc_us_TC').value();
        saveData[16] = $('#txtDuongDanFileHinhAnh').value();
        var data = uploadfileEvent({
            name: '#DinhKem_CapMoiGiayPhepLD_us',///ID input type="file"
            loaiVB: 'VB',
        });
        if (data.length > 0) {
            $('#txtDinhKem_VanBan_US').value(data);
            NTS.dongthongbao();
        }
        saveData[17] = $('#txtDinhKem_VanBan_US').value();
        saveData[18] = $('#LyDo_us').value();
        var result = NTS.getAjax('/QuanLy/GiayPhepLD/LuuThongTinCapLai', { data: saveData });
        if (!result.Err) {
            LoadDataTable();
            NTS.thanhcong(result.Msg);
            $('#mdCapMoiGiayPhepLD').modal('hide');
            $('#mdThemMoiGiayPhepLD_us').modal('hide');
            return false;
        } else {
            result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
        }
        return false;
    } else if (tinhTrang == 'GiaHan') {
        var saveData = new Array();
        saveData[0] = tempthem;
        saveData[1] = $('#GiayPhepLDID').value();
        saveData[2] = $('#SoGPLD').value();
        saveData[3] = $('#CanCu').value();
        saveData[4] = $('#NgayCap').value();
        saveData[5] = $('#NguoiKy_us').value();
        saveData[6] = $('#CoQuanCap_US').value();
        saveData[7] = $('#SelectDoiTuongNN_US').attr('value');
        saveData[8] = $('#SelectToChuc_US').attr('value');
        saveData[9] = $('#DiaChiNoiLV_us').value();
        saveData[10] = $('#selViTriCongViec_us').value();
        saveData[11] = $('#selHinhThucLV_us').value();
        saveData[12] = $('#selChucDanhCV_us').value();
        saveData[13] = $('#MucLuong_US').value();
        saveData[14] = $('#NgayLamViec_us_TC').value();
        saveData[15] = $('#NgayKetThuc_us_TC').value();
        saveData[16] = $('#txtDuongDanFileHinhAnh').value();
        var data = uploadfileEvent({
            name: '#DinhKem_CapMoiGiayPhepLD_us',///ID input type="file"
            loaiVB: 'VB',
        });
        if (data.length > 0) {
            $('#txtDinhKem_VanBan_US').value(data);
            NTS.dongthongbao();
        }
        saveData[17] = $('#txtDinhKem_VanBan_US').value();
        var result = NTS.getAjax('/QuanLy/GiayPhepLD/LuuThongTinGiaHan', { data: saveData });
        if (!result.Err) {
            LoadDataTable();
            NTS.thanhcong(result.Msg);
            $('#mdCapMoiGiayPhepLD').modal('hide');
            $('#mdThemMoiGiayPhepLD_us').modal('hide');
            return false;
        } else {
            result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
        }
        return false;
    }
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

//------------------------------Xóa Giấy phép lao động-----------------------------

function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'GiayPhepLDID', ID: ID, TenBangHienTai: 'GiayPhepLD', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/QuanLy/GiayPhepLD/XoaDuLieu', { id: ID });
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

//-------------------Sửa dữ liệu------------------//
function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#mdCapMoiGiayPhepLD').modal('show');
    resetForm('#mdCapMoiGiayPhepLD');
    resetText();
    Loadcombo();
    const result = NTS.getAjax('/QuanLy/GiayPhepLD/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#GiayPhepLDID').value(data.GiayPhepLDID);
        $('#SoGPLD').value(data.SoGPLD);
        $('#CanCu').value(data.CanCu);
        $('#NgayCap').value(data.NgayCapGPLD);
        $('#NguoiKy_us').value(data.NguoiNopHS);
        $('#CoQuanCap_US').value(data.CoQuanCap);
        $('#SelectDoiTuongNN_US').attr('value', data.DoiTuongNNID);
        $('#SelectToChuc_US').attr('value', data.ToChucID);
        $('#DiaChiNoiLV_us').value(data.DiaDiemLV);
        setTimeout(() => {
            $('#selViTriCongViec_us').value(data.ViTriViecLamID);
            $('#selHinhThucLV_us').value(data.HinhThucLVID);
            $('#selChucDanhCV_us').value(data.ChucVuID);
        }, 250);
        $('#MucLuong_US').value(data.MucLuong);
        $('#NgayLamViec_us_TC').value(data.LamViecTuNgay);
        $('#NgayKetThuc_us_TC').value(data.LamViecDenNgay);
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
        $('#txtDinhKem_VanBan_US').val(data.TaiLieu);
        if (data.TaiLieu == '' || data.TaiLieu == null) {
            ResetDinhKemFile();
        }
        else {
            for (var i = 0; i < data.TaiLieu.split('*').length; i++) {
                if (data.TaiLieu.split('*')[i] == '') {
                    continue;
                }
                listFiles_VanBan_US.push(data.TaiLieu.split('*')[i].split('/')[data.TaiLieu.split('*')[i].split('/').length - 1].replaceAll('*', '').toString());
            }
            $('#DinhKem_CapMoiGiayPhepLD_us').ace_file_input('show_file_list', listFiles_VanBan_US);
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
            $('.ace-file-container.hide-placeholder .ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKemDT XoaFileDinhKem btn-del-item img-db"  onclick="return false"></i>');
        }
       
        $('#txtDuongDanFileHinhAnh').value(data.HinhAnh);
        if (data.HinhAnh != null && data.HinhAnh.length > 0) {
            let LuuFile = data.HinhAnh;
            let arrFile = LuuFile.split('*');
            for (let p = 0; p < arrFile.length - 1; p++) {
                let filePath = arrFile[p].replace('~', '');
                let fileExt = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
                if (fileExt === ".png" || fileExt === ".jpeg" || fileExt === ".jpg" || fileExt === "") {
                    $('#GiayPhep_Img_mau').css('background-image', `url('${filePath}')`);
                    $('#GiayPhep_Img_mau').attr('data-url-file', filePath);
                    $('.GiayPhep_Img').css('background-image', `url('${filePath}')`);
                    $('.GiayPhep_Img').attr('data-url-file', filePath);
                    $('.text-img').css({ 'display': 'none' });
                }
            }
        }
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
}

//-------------------Sua du thông tin phiếu thu thập--------------------//
$(document).on('click', '.btnSuaTT', function () {
    var ID = $(this).attr('data');
    SuaDuLieu(ID);
});

function ShowModal_XemThongTinGiayPhepLD(ID) {
    $('#mdXemThongTinNguoiLaoDongNuocNgoai').modal('show');
    const result = NTS.getAjax('/QuanLy/GiayPhepLD/LoadDuLieuXem', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
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
        if (data.NgayCapSHC == "" || data.NgayCapSHC == null) {
            $('#lblNgayCap_us').html('---')
        } else {
            $('#lblNgayCap_us').html(data.NgayCapSHC);
        }
        if (data.GiaTriDen == "" || data.GiaTriDen == null) {
            $('#lblCoGiaTriDen_us').html('---')
        } else {
            $('#lblCoGiaTriDen_us').html(data.GiaTriDen);
        }
        if (data.NoiDungThuThap == "" || data.NoiDungThuThap == null) {
            $('#lblNoiDungTT_us').html('---')
        } else {
            $('#lblNoiDungTT_us').html(data.NoiDungThuThap);
        }
        if (data.SoGPLD == "" || data.SoGPLD == null) {
            $('#lblSo_us').html('---')
        } else {
            $('#lblSo_us').html(data.SoGPLD);
        }
        if (data.CanCu == "" || data.CanCu == null) {
            $('#lblNo_us').html('---')
        } else {
            $('#lblNo_us').html(data.CanCu);
        }
       
        if (data.NgayCapGPLD == "" || data.NgayCapGPLD == null) {
            $('#lblNgayCap_us').html('---')
        } else {
            $('#lblNgayCap_us').html(data.NgayCapGPLD);
        }
        if (data.NguoiKy == "" || data.NguoiKy == null) {
            $('#lblNguoiKy_us').html('---')
        } else {
            $('#lblNguoiKy_us').html(data.NguoiKy);
        }
        if (data.DonViCapGPLD == "" || data.DonViCapGPLD == null) {
            $('#lblCoQuanCap_us').html('---')
        } else {
            $('#lblCoQuanCap_us').html(data.DonViCapGPLD);
        }
        if (data.DiaDiemLV == "" || data.DiaDiemLV == null) {
            $('#lblDiaDiemNoiLV_us').html('---')
        } else {
            $('#lblDiaDiemNoiLV_us').html(data.DiaDiemLV);
        }
        $('#lblToChuc_us').html(data.ToChuc);
        if (data.ThoiGianLV == "" || data.ThoiGianLV == null) {
            $('#lblThoiGianLV_us').html('---')
        } else {
            $('#lblThoiGianLV_us').html(data.ThoiGianLV);
        }
        if (data.HinhThucLV == "" || data.HinhThucLV == null) {
            $('#lblHinhThucLV_us').html('---')
        } else {
            $('#lblHinhThucLV_us').html(data.HinhThucLV);
        }
        if (data.ViTriCV == "" || data.ViTriCV == null) {
            $('#lblViTriCongViec_us').html('---')
        } else {
            $('#lblViTriCongViec_us').html(data.ViTriCV);
        }
        if (data.ChucVu == "" || data.ChucVu == null) {
            $('#lblChucDanh_us').html('---')
        } else {
            $('#lblChucDanh_us').html(data.ChucVu);
        }
        if (data.TinhTrangCapGPLD == "" || data.TinhTrangCapGPLD == null) {
            $('#lblTinhTrang_us').html('---')
        } else {
            $('#lblTinhTrang_us').html(data.TinhTrangCapGPLD);
        }
        if (data.MucLuong == "" || data.MucLuong == null) {
            $('#lblMucLuong_us').html('---')
        } else {
            $('#lblMucLuong_us').html(data.MucLuong);
        }
        // ĐÍnh kèm chữ ký
        $('#file-dinh-kem-chu-ky').html('');
        if (data.TaiLieu != null && data.TaiLieu.length > 0) {
            let linkVB = data.TaiLieu;
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
            $('#file-dinh-kem-chu-ky').html('Chưa có đính kèm tài liệu');
            $('#file-dinh-kem-chu-ky').css({
                "color": "rgb(216 213 213)",
                "font-weight": "500",
            });
        }

        //Xem Đính kèm file
        if (data.HinhAnh != null && data.HinhAnh.length > 0) {
            let LuuFile = data.HinhAnh;
            let arrFile = LuuFile.split('*');
            for (let p = 0; p < arrFile.length - 1; p++) {
                let filePath = arrFile[p].replace('~', '');
                let fileExt = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
                if (fileExt === ".png" || fileExt === ".jpeg" || fileExt === ".jpg" || fileExt === "") {
                    $('#GiayPhep_Img_mau-xem').css('background-image', `url('${filePath}')`);
                    $('#GiayPhep_Img_mau-xem').attr('data-url-file', filePath);
                }
            }
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
    ShowModal_XemThongTinGiayPhepLD(ID);
});

////-------------------Xuất dữ liệu Mẫu 12 PLI------------------//

$(document).on('click', '.btnInTT', function () {
    var ID = $(this).attr('data');
    XuatMau12PLI(ID);
});

async function XuatMau12PLI(ID) {
    debugger
    var data = await NTS.getAjaxAsync('/QuanLy/GiayPhepLD/XuatMau12PLI', { id: ID });
    //window.open(data);
    try {
        $('#divNoiDung_us').attr("src", data.replace(".docx", ".pdf"));
        $('#modal_xemtruockhiin_us').modal('show');
        $('#modal_taifile_us').show();
        $('#modal_taifile2_us').hide();
    } catch (ex) {

    }
}



///-----------------------------Thu hồi giấy phép lao động-------------------///
//------------------------------------Đính kèm tài liệu thu hồi giấy phép lao động------------------------//
function uploadfileEventThuHoi(options) {

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
        if (positionRemoveItiemThuHoi.includes(i) == false) {
            test.append(files[i].name, files[i]);
        }
    }
    positionRemoveItiemThuHoi = [];
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
    $($('#DinhKem_ThuhoiCapGiayPhepLD_us').get(0)).data('ace_input_files', emptyFileList);
    return result;
}

//----------------------------Đính kèm Cấp mới giấy phép lao động-----------------------------------//
$('#DinhKem_ThuhoiCapGiayPhepLD_us').on('change', function () {
    var selectedFilesThuHoi = this.files;

    // Kiểm tra và xử lý tệp đã chọn ở đây
    for (var i = 0; i < selectedFilesThuHoi.length; i++) {
        var fileName = selectedFilesThuHoi[i].name;
        var fileType = fileName.split('.').pop().toLowerCase();

        // Kiểm tra loại tệp
        if (fileType === 'docx' || fileType === 'pdf' || fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
            // Xử lý tệp ở đây nếu đúng định dạng
            console.log('Đã chọn tệp: ' + fileName);
        } else {
            alert('Vui lòng chọn tệp DOC, PDF, PNG, JPG hoặc JPEG.');
            // Xoá tệp không hợp lệ khỏi input (nếu cần)
            ResetDinhKemFileThuHoi();
        }
    }
});
var old_ItemFileThuHoi = "";
$('#DinhKem_ThuhoiCapGiayPhepLD_us').ace_file_input({
    style: 'well',
    btn_choose: 'Nhấn để chọn tệp hoặc kéo thả vào đây (Cho phép đính kèm các file có định dạng DOC, PDF, PNG, JPG, JPEG)',
    btn_change: null,
    no_icon: 'ace-icon fa fa-cloud-upload',
    droppable: true,
    thumbnail: 'large',
    allowExt: ["jpeg", "jpg", "png", "gif", "pdf", "docx"]
    , alter_change: function ChangeItem() {
        return false;
    }
    , before_change: function (files, dropped) {
        return true;
    },
    preview_error: function (filename, error_code) {
    }
    , before_remove: function RemoveALl() {
        RemoveAllFileInputAceThuHoi();
    }
}).on('change', function () {

    //Trước khi load các file đã tồn tại trước đó cần gắn dấu X trước
    $('.ace-file-name').each(function () {
        // Sử dụng find() để kiểm tra xem có thẻ '<i class="ace-icon fa fa-times XoaFileDinhKem btn-del-item" onclick="return false"></i>' hay không
        var hasIcon = $(this).find('i.ace-icon.fa.fa-times.btn-del-item.XoaFileDinhKemThuHoi').length > 0;

        // Kiểm tra kết quả và thực hiện các hành động cần thiết
        if (hasIcon) {
            // da ton tai dau X
        } else {
            // khong ton tai dau x
            $('.ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKemThuHoi  XoaFileDinhKemDT btn-del-item" onclick="return false"></i>');
        }
    });
    //Load các file đã upload vào db
    if ($(old_ItemFileThuHoi[0]).attr("data-title") != 'No File ...') {
        $('.ace-file-container').append(old_ItemFileThuHoi);
    }
    //Gắn thêm dấu x xóa từng file
    //các file trước đó đã có trong csdl
    if ($('.ace-file-name').children().hasClass('XoaFileDinhKemThuHoi')) {
        // Có class "XoaFileDinhKem"
    } else {
        // Không "XoaFileDinhKem"
        $('.ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKemThuHoi XoaFileDinhKemDT btn-del-item" onclick="return false"></i>');
        //File thêm mới
        $('.ace-file-name.large').append('<i class=" ace-icon fa fa-times XoaFileDinhKemThuHoi XoaFileDinhKemDT btn-del-item " onclick="return false"></i>');

    }

    return false;
});
var file_inputThuHoi = $('#DinhKem_ThuhoiCapGiayPhepLD_us');
file_inputThuHoi.ace_file_input('reset_input');
file_inputThuHoi
    .off('file.error.ace')
    .on('file.error.ace', function (e, info) {
    });

function RemoveAllFileInputAceThuHoi() {
    var bang = "GiayPhepLD";
    var cot = "GiayPhepLDID";

    CanhBaoXoa(() => {
        var result = NTS.getAjax('/QuanLy/GiayPhepLD/XoaDinhKemThuHoiGiayPhepLD', { ID: $('#GiayPhepLDID').val(), duongDan: '', bangDk: bang, cotDk: cot, loai: 'all' });
        if (!result.Err) {
            NTS.thanhcong(result.Msg);
            $('#txtDinhKemThuHoi_VanBan_US').value("");
            ResetDinhKemFileThuHoi();
            old_ItemFileThuHoi = "";
            //$('#txtDinhKem_VanBan_US').value($('#txtDinhKem_VanBan_US').value().replaceAll(ListFile[i], '').replaceAll('**', '*'));
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}
var positionRemoveItiemThuHoi = new Array();
$(document).on('click', '.XoaFileDinhKemThuHoi', function () {
    var GiayPhepLDID = $('#GiayPhepLDID').value();
    var TenFile = $(this).parent().attr('data-title');
    var ListFile = $('#txtDinhKemThuHoi_VanBan_US').value().split('*');
    //Kiểm tra xem file xóa có phải là file vừa mới upload hay không - nếu là file vừa mới upload thì cho vào list xóa để không upload vào server
    if (!$(this).hasClass('img-db')) {
        var indexRemove = $('.XoaFileDinhKemThuHoi').index(this);
        positionRemoveItiemThuHoi.push(indexRemove);
    }
    //
    CanhBaoXoa(() => {
        for (var i = 0; i < ListFile.length; i++) {
            if (ListFile[i].includes(TenFile)) {
                var bang = "GiayPhepLD";
                var cot = "GiayPhepLDID";
                var result = NTS.getAjax('/QuanLy/GiayPhepLD/XoaDinhKemThuHoiGiayPhepLD', { ID: GiayPhepLDID, duongDan: ListFile[i], bangDk: bang, cotDk: cot, loai: '' });

                if (!result.Err) {
                    NTS.thanhcong(result.Msg);
                    $('#txtDinhKemThuHoi_VanBan_US').value($('#txtDinhKemThuHoi_VanBan_US').value().replaceAll(ListFile[i], '').replaceAll('**', '*'))
                }
                else {
                    NTS.loi(result.Msg);
                }
            }
        }
        //$(this).parent().css('display', 'none');
        //if ($('#DinhKem_CapMoiGiayPhepLD_us').parent().find('.ace-file-name').length == 1 && $('#DinhKem_CapMoiGiayPhepLD_us').parent().find('.ace-file-name').css('display') == "none") {
        //    ResetDinhKemFile();
        //}
        $(this).parent().remove();
        if ($('#DinhKem_ThuhoiCapGiayPhepLD_us').parent().find('.ace-file-name').length == 0) {
            ResetDinhKemFileThuHoi();
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

function ResetDinhKemFileThuHoi() {
    $('#DinhKem_ThuhoiCapGiayPhepLD_us').ace_file_input('reset_input');
    $('.ace-file-container').html(`<span class="ace-file-name" data-title="No File ..."><i class=" ace-icon ace-icon fa fa-cloud-upload"></i></span>`);
}


//-------------------- Lưu thông tin thu hồi GPLD--------------//
$(document).on('click', '#btnLuuVaDongThuHoiGiayPhepLD_us', function () {
    const validate = new NTSValidate('#mdThuHoiGiayPhepLD');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }

    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#GiayPhepLDID').value();
    saveData[2] = $('#SoQuyetDinh_ThuHoi').value();
    saveData[3] = $('#NgayKyThuHoi_ThuHoi').value();
    saveData[4] = $('#NguoiKy_ThuHoi').value();
    saveData[5] = $('#CoQuanBanHanh_ThuHoi').value();
    saveData[6] = $('#NoiDung_ThuHoi').value();
    var data = uploadfileEventThuHoi({
        name: '#DinhKem_ThuhoiCapGiayPhepLD_us',///ID input type="file"
        loaiVB: 'VB',
    });
    if (data.length > 0) {
        $('#txtDinhKemThuHoi_VanBan_US').value(data);
        NTS.dongthongbao();
    }
    saveData[7] = $('#txtDinhKemThuHoi_VanBan_US').value();
    var result = NTS.getAjax('/QuanLy/GiayPhepLD/LuuThongThuHoi', { data: saveData });
    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        $('#mdThuHoiGiayPhepLD').modal('hide');
        return false;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});

$(document).on('click', '.btnBoThuHoi', function () {
    var ID = $(this).attr('data');
    BoThuHoiGiayPhepLD(ID);
});

function BoThuHoiGiayPhepLD(ID) {
    if (!QuyenSua()) {
        return false;
    }
    CanhBaoBoThuHoi(() => {
        const result = NTS.getAjax('/QuanLy/GiayPhepLD/BoThuHoi', { id: ID });
        if (!result.Err) {
            LoadDataTable();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
    return false;
}

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
    saveData[8] = $('#lblKhongThuocCapGPLD_TimKiem_us').value();
    saveData[9] = $('#TrangThai_TimKiem_us').value();
    var kq = await NTS.getAjax('/QuanLy/GiayPhepLD/XuatExcel_DSGiayPhepLD', { data: saveData });
    if (!kq.Err) {
        window.open(kq);
    } else {
        NTS.loi(kq.Msg);
    }
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
            if ($('#mdCapMoiGiayPhepLD').hasClass('show')) {
                $('#mdCapMoiGiayPhepLD').modal('hide');
                e.preventDefault();
                break;
            } else if ($('#mdXemThongTinNguoiLaoDongNuocNgoai').hasClass('show')) {
                $('#mdXemThongTinNguoiLaoDongNuocNgoai').modal('hide');
                e.preventDefault();
                break;
            }
            else if ($('#mdXacNhanKhongCapGiayPhepLD').hasClass('show')) {
                $('#mdXacNhanKhongCapGiayPhepLD').modal('hide');
                e.preventDefault();
                break;
            }
        case 120:
            if (hotKey == 1)
                if ($('#mdCapMoiGiayPhepLD').hasClass('show')) {
                    $('#btnLuuVaDongCapMoiGiayPhepLD_us').trigger('click');
                    e.preventDefault();
                    break;
                } else if (hotKey == 1)
                    if ($('#mdXacNhanKhongCapGiayPhepLD').hasClass('show')) {
                        $('#btnLuuVaDongXacNhanGiayPhepLD_us').trigger('click');
                        e.preventDefault();
                        break;
                    }
    }
});
$(document).on('shown.bs.modal', '#mdCapMoiGiayPhepLD', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdCapMoiGiayPhepLD', function () {
    hotKey = 0;
});

$(document).on('shown.bs.modal', '#mdXemThongTinNguoiLaoDongNuocNgoai', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdXemThongTinNguoiLaoDongNuocNgoai', function () {
    hotKey = 0;
});

$(document).on('shown.bs.modal', '#mdXacNhanKhongCapGiayPhepLD', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdXacNhanKhongCapGiayPhepLD', function () {
    hotKey = 0;
});


///-----------------------------Xác nhận không giấy phép lao động-------------------///
//------------------------------------Đính kèm tài liệu thu hồi giấy phép lao động------------------------//
function uploadfileEventXacNhan(options) {

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
        if (positionRemoveItiemThuHoi.includes(i) == false) {
            test.append(files[i].name, files[i]);
        }
    }
    positionRemoveItiemThuHoi = [];
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
    $($('#DinhKem_XNKhongCapGiayPhepLD_us').get(0)).data('ace_input_files', emptyFileList);
    return result;
}

//----------------------------Đính kèm Cấp mới giấy phép lao động-----------------------------------//
$('#DinhKem_XNKhongCapGiayPhepLD_us').on('change', function () {
    var selectedFilesThuHoi = this.files;

    // Kiểm tra và xử lý tệp đã chọn ở đây
    for (var i = 0; i < selectedFilesThuHoi.length; i++) {
        var fileName = selectedFilesThuHoi[i].name;
        var fileType = fileName.split('.').pop().toLowerCase();

        // Kiểm tra loại tệp
        if (fileType === 'docx' || fileType === 'pdf' || fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
            // Xử lý tệp ở đây nếu đúng định dạng
            console.log('Đã chọn tệp: ' + fileName);
        } else {
            alert('Vui lòng chọn tệp DOC, PDF, PNG, JPG hoặc JPEG.');
            // Xoá tệp không hợp lệ khỏi input (nếu cần)
            ResetDinhKemFileXacNhan();
        }
    }
});
var old_ItemFileThuHoi = "";
$('#DinhKem_XNKhongCapGiayPhepLD_us').ace_file_input({
    style: 'well',
    btn_choose: 'Nhấn để chọn tệp hoặc kéo thả vào đây (Cho phép đính kèm các file có định dạng DOC, PDF, PNG, JPG, JPEG)',
    btn_change: null,
    no_icon: 'ace-icon fa fa-cloud-upload',
    droppable: true,
    thumbnail: 'large',
    allowExt: ["jpeg", "jpg", "png", "gif", "pdf", "docx"]
    , alter_change: function ChangeItem() {
        return false;
    }
    , before_change: function (files, dropped) {
        return true;
    },
    preview_error: function (filename, error_code) {
    }
    , before_remove: function RemoveALl() {
        RemoveAllFileInputAceXacNhan();
    }
}).on('change', function () {

    //Trước khi load các file đã tồn tại trước đó cần gắn dấu X trước
    $('.ace-file-name').each(function () {
        // Sử dụng find() để kiểm tra xem có thẻ '<i class="ace-icon fa fa-times XoaFileDinhKem btn-del-item" onclick="return false"></i>' hay không
        var hasIcon = $(this).find('i.ace-icon.fa.fa-times.btn-del-item.XoaFileDinhKemXacNhan').length > 0;

        // Kiểm tra kết quả và thực hiện các hành động cần thiết
        if (hasIcon) {
            // da ton tai dau X
        } else {
            // khong ton tai dau x
            $('.ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKemXacNhan  XoaFileDinhKemDT btn-del-item" onclick="return false"></i>');
        }
    });
    //Load các file đã upload vào db
    if ($(old_ItemFileThuHoi[0]).attr("data-title") != 'No File ...') {
        $('.ace-file-container').append(old_ItemFileThuHoi);
    }
    //Gắn thêm dấu x xóa từng file
    //các file trước đó đã có trong csdl
    if ($('.ace-file-name').children().hasClass('XoaFileDinhKemXacNhan')) {
        // Có class "XoaFileDinhKem"
    } else {
        // Không "XoaFileDinhKem"
        $('.ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKemXacNhan XoaFileDinhKemDT btn-del-item" onclick="return false"></i>');
        //File thêm mới
        $('.ace-file-name.large').append('<i class=" ace-icon fa fa-times XoaFileDinhKemXacNhan XoaFileDinhKemDT btn-del-item " onclick="return false"></i>');

    }

    return false;
});
var file_inputThuHoi = $('#DinhKem_XNKhongCapGiayPhepLD_us');
file_inputThuHoi.ace_file_input('reset_input');
file_inputThuHoi
    .off('file.error.ace')
    .on('file.error.ace', function (e, info) {
    });

function RemoveAllFileInputAceXacNhan() {
    var bang = "GiayPhepLD";
    var cot = "GiayPhepLDID";

    CanhBaoXoa(() => {
        var result = NTS.getAjax('/QuanLy/GiayPhepLD/XoaDinhKemThuHoiGiayPhepLD', { ID: $('#GiayPhepLDID').val(), duongDan: '', bangDk: bang, cotDk: cot, loai: 'all' });
        if (!result.Err) {
            NTS.thanhcong(result.Msg);
            $('#txtDinhKemXacNhan_VanBan_US').value("");
            ResetDinhKemFileXacNhan();
            old_ItemFileThuHoi = "";
            //$('#txtDinhKem_VanBan_US').value($('#txtDinhKem_VanBan_US').value().replaceAll(ListFile[i], '').replaceAll('**', '*'));
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}
var positionRemoveItiemThuHoi = new Array();
$(document).on('click', '.XoaFileDinhKemXacNhan', function () {
    var GiayPhepLDID = $('#GiayPhepLDID').value();
    var TenFile = $(this).parent().attr('data-title');
    var ListFile = $('#txtDinhKemXacNhan_VanBan_US').value().split('*');
    //Kiểm tra xem file xóa có phải là file vừa mới upload hay không - nếu là file vừa mới upload thì cho vào list xóa để không upload vào server
    if (!$(this).hasClass('img-db')) {
        var indexRemove = $('.XoaFileDinhKemXacNhan').index(this);
        positionRemoveItiemThuHoi.push(indexRemove);
    }
    //
    CanhBaoXoa(() => {
        for (var i = 0; i < ListFile.length; i++) {
            if (ListFile[i].includes(TenFile)) {
                var bang = "GiayPhepLD";
                var cot = "GiayPhepLDID";
                var result = NTS.getAjax('/QuanLy/GiayPhepLD/XoaDinhKemThuHoiGiayPhepLD', { ID: GiayPhepLDID, duongDan: ListFile[i], bangDk: bang, cotDk: cot, loai: '' });

                if (!result.Err) {
                    NTS.thanhcong(result.Msg);
                    $('#txtDinhKemXacNhan_VanBan_US').value($('#txtDinhKemXacNhan_VanBan_US').value().replaceAll(ListFile[i], '').replaceAll('**', '*'))
                }
                else {
                    NTS.loi(result.Msg);
                }
            }
        }
        //$(this).parent().css('display', 'none');
        //if ($('#DinhKem_CapMoiGiayPhepLD_us').parent().find('.ace-file-name').length == 1 && $('#DinhKem_CapMoiGiayPhepLD_us').parent().find('.ace-file-name').css('display') == "none") {
        //    ResetDinhKemFile();
        //}
        $(this).parent().remove();
        if ($('#DinhKem_XNKhongCapGiayPhepLD_us').parent().find('.ace-file-name').length == 0) {
            ResetDinhKemFileXacNhan();
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

function ResetDinhKemFileXacNhan() {
    $('#DinhKem_XNKhongCapGiayPhepLD_us').ace_file_input('reset_input');
    $('.ace-file-container').html(`<span class="ace-file-name" data-title="No File ..."><i class=" ace-icon ace-icon fa fa-cloud-upload"></i></span>`);
}



// Xử lý combo đối tượng người nước ngoài.
//// Xử lý Combo đối tượng Giấy xác nhận
var langArrayXacNhan = [];
langArrayXacNhan.push(`<li action="false" style="position: sticky;top: 0;background-color: white;">
                        <div class="row" style="width: 100%">
                        <div class="form-col-12">
                            <input type="text" class="form-control" id="ckTimKiemDoiTuongNNIDXacNhan" >
                        </div>
                        </div>
                    </li>`);
langArrayXacNhan.push(`<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn đối tượng- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);

$('.vodiapickerDTXacNhan option').each(function () {
    var name_cv = $(this).attr("data-name-cv");
    var name = $(this).attr("data-name");
    var code = $(this).attr("data-code");
    var genner = $(this).attr("data-genner");
    var cmnd = $(this).attr("data-cmnd");
    var tinh = $(this).attr("data-tinh");
    var huyen = $(this).attr("data-huyen");
    var xa = $(this).attr("data-xa");
    var thon = $(this).attr("data-thon");
    var doiTuongID = $(this).attr("value");
    var NoiThuongTru = $(this).attr("data-NoiThuongTru");
    const mauNgauNhien = getRandomColors(Color, 1);
    var item = "";
    item = `<li class="itemDoiTuongNNXacNhan" action="true" style="display:none" data-name="${name}" data-code="${code}" data-cmnd="${cmnd}" data-NoiThuongTru="${NoiThuongTru}" value="${doiTuongID}"><div class="opImg" style="background-color:${mauNgauNhien}">${name_cv}</div><div class="opInfo"><div><b>${name}</b> (${code}), Giới tính: <b>${genner}</b>, CMND/CCCD: <b>${cmnd}</b></div><div class="text-diachi" title="${(thon == "" ? "" : thon + ", ")} ${xa}, ${huyen}, ${tinh}">Nơi thường trú: <b>${NoiThuongTru}</b></div></div></li>`;
    langArrayXacNhan.push(item);
});

//langArray.push(`<li action="false" id="LoadMoreDoiTuongDK" onclick="LoadMoreDoiTuong()" style="justify-content: center;"> Xem thêm &nbsp<i class="fa fa-arrow-down" style="color: #0054a6" aria-hidden="true"></i></li>`);
$('#ListDataDoiTuongNNXacNhan').html(langArrayXacNhan);

//Set the button value to the first el of the array
$('.btn-select-DoiTuongNNXacNhan').html(langArrayXacNhan[1]);
$('.btn-select-DoiTuongNNXacNhan').attr('value', '');

$(".btn-select-DoiTuongNNXacNhan").click(function () {
    $(".OptionDoiTuongNNXacNhan").toggle();
});
$(document).ready(function () {
    // Bắt sự kiện click trên toàn bộ trang
    $(document).on('click', function (event) {
        // Kiểm tra xem sự kiện click diễn ra bên ngoài thẻ có class A hay không
        if (!$(event.target).closest('.lang-select').length) {

            $(".OptionDoiTuongNNXacNhan").css('display', 'none');
        }
    });
});
////check local storage for the lang
var sessionLang = localStorage.getItem('lang');
if (sessionLang) {
    //find an item with value of sessionLang
    var langIndex = langArrayXacNhan.indexOf(sessionLang);
    $('.btn-select-DoiTuongNNXacNhan').html(langArrayXacNhan[langIndex]);
    $('.btn-select-DoiTuongNNXacNhan').attr('value', sessionLang);
} else {
    var langIndex = langArrayXacNhan.indexOf('ch');
    $('.btn-select-DoiTuongNNXacNhan').html(langArrayXacNhan[langIndex]);
    //$('.btn-select').attr('value', 'en');
}


function NumbervisibleLiCountDoiTuongXacNhan() {
    var visibleLiCount = $('#ListDataDoiTuongNNXacNhan li').filter(function () {
        return $(this).css('display') === 'flex';
    }).length;
    return visibleLiCount;
}

var soLuongHienThi_DoiTuongNNXacNhan = 20;

function LoadMoreDoiTuongNNXacNhan() {
    // Số phần tử đang hiển thị
    var visibleLiCount = NumbervisibleLiCountDoiTuongXacNhan();
    // Hiển thị thêm 20 phần tử nữa
    $("#ListDataDoiTuongNNXacNhan li").slice(visibleLiCount, visibleLiCount + soLuongHienThi_DoiTuongNNXacNhan).css("display", "flex");

    // Kiểm tra nếu đã hiển thị hết tất cả các phần tử thì ẩn nút "Xem thêm"
    if (visibleLiCount + soLuongHienThi_DoiTuongNNXacNhan >= $('#ListDataDoiTuongNNXacNhan li').length - 1) {
        $("#loadMoreDoiTuongNNDKXacNhan").css("display", "none");
    }
}

function FillterDoiTuongNNXacNhan() {
    var input, filter, ul, li, a, i;
    input = $("#ckTimKiemDoiTuongNNXacNhan");
    filter = input.value().toUpperCase();
    div = $("#ListDataDoiTuongNNXacNhan");
    a = $("#ListDataDoiTuongNNXacNhan li");
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

function LoadComBoDoiTuongNNXacNhan(TinhID, HuyenID, XaID, ThonID) {
    $('.listOptionXacNhan').html('');
    $('#DoiTuongNNID_ChuHoXacNhan').html('');
    $('#ListDataDoiTuongNNXacNhan').append(`<li action="false" style="position: sticky;top: 0;background-color: white;">
                        <div class="row" style="width: 100%">
                        <div class="form-col-12">
                            <input type="text" class="form-control" id="ckTimKiemDoiTuongNNXacNhan" onkeypress="FillterDoiTuongNNXacNhan()">
                        </div>
                        </div>
                    </li>`);
    $('#ListDataDoiTuongNNXacNhan').append(`<li action="chon" class="itemDoiTuongNNXacNhan"><div class="opInfo Chon"><div>-Chọn đối tượng-</div></li>`);

    var saveData = [TinhID, HuyenID, XaID, ThonID];
    const kq = NTS.getAjax('/DanhMuc/DungChung/GetDoiTuongNN_ComBoCapGPLD', { data: saveData }).Result;
    // Chỉ load 20 dòng dữ liệu đầu tiên
    const initialItems = 20;
    for (var i = 0; i < kq.length; i++) {
        $('#DoiTuongNNID_ChuHoXacNhan').append(`<option value="${kq[i].DoiTuongNNID}"
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
        $('#DoiTuongNNID_ChuHoXacNhan').value(kq[i].DoiTuongNNID);

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
        var item = `<li action="true" class="itemDoiTuongNNXacNhan" data-name="${name}" data-code="${code}"
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
        $('#ListDataDoiTuongNNXacNhan').append(item);
    }

    // Hiển thị 20 dòng đầu tiên
    $("#ListDataDoiTuongNNXacNhan li").slice(0, initialItems).css("display", "flex");

    if (kq.length > initialItems) {
        $('#ListDataDoiTuongNNXacNhan').append(`<li action="false" id="loadMoreDoiTuongNNDKXacNhan" onclick="LoadMoreDoiTuongNNXacNhan()" style="justify-content: center;"> Xem thêm &nbsp<i class="fa fa-arrow-down" style="color: #0054a6" aria-hidden="true"></i></li>`);
    }
}

// Chọn Tổ chức từ combo
$(document).on('click', '#SelectDoiTuongNN_USXacNhan', function () {
    var TinhID = $('#TinhID_TimKiem_us').value();
    var HuyenID = $('#HuyenID_TimKiem_us').value();
    var XaID = $('#XaID_TimKiem_us').value();
    var ThonID = $('#ThonID_TimKiem_us').value();
    LoadComBoDoiTuongNNXacNhan(TinhID, HuyenID, XaID, ThonID);
});

function ResetTTDoiTuongXacNhan() {
    $('.btn-select-DoiTuongNNXacNhan').attr('value', '');
    $('#DoiTuongNNID_ChuHoXacNhan').value('');
}


//Chọn xuống tổ chức từ combo
$(document).on('click', '.itemDoiTuongNNXacNhan', function () {
    var action = $(this).attr("action");
    if (action == "false") {
        return;
    }
    if (action == "chon") {
        var item = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn đối tượng- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
        $('#SelectDoiTuongNN_USXacNhan').value('');
        ResetTTDoiTuongXacNhan();
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
        $('.text-inputHoVaTen').text(name);
        if (tengioitinh == 'Nam') {
            $('.text-inputGTNam').text('X');
            $('.text-inputGTNu').text('');
        } else if (tengioitinh == 'Nữ') {
            $('.text-inputGTNu').text('X');
            $('.text-inputGTNam').text('');
        } else {
            $('.text-inputGTNu').text('');
            $('.text-inputGTNam').text('');
        }

        if (ngaysinh != '') {
            $('.text-inputNgaySinh').text(ngaysinh);
        }
        if (tenquoctich != '') {
            $('.text-inputQuocTich').text(tenquoctich);
        }
        if (sohochieu != '') {
            $('.text-inputSohoChieu').text(sohochieu);
        }

    }

    $('.btn-select-DoiTuongNNXacNhan').html(item);
    $('.btn-select-DoiTuongNNXacNhan').attr('value', value);
    $('#DoiTuongNNID_ChuHoXacNhan').value(value);
    $(".OptionDoiTuongNNXacNhan").toggle();
});


// click button chọn và đóng modal chọn tổ chức
$(document).on('click', '#btnChonVaDongDoiTuongNNTT_us', function () {
    if (Grid_ChonDoiTuongNNTT_us.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
        return false;
    }
    ResetTTDoiTuongXacNhan();
    var dataGrid = Grid_ChonDoiTuongNNTT_us.getSelectedRows()[0]._row.data;
    var item = `<li><span><b>${dataGrid.HoVaTen}</b>, ngày sinh: <b>${dataGrid.NgayThangNamSinh}</b>, Giới tính: <b>${dataGrid.TenGioiTinh}</b>, Quốc tịch: <b>${dataGrid.TenQuocTich}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
    $('.btn-select-DoiTuongNNXacNhan').html(item);
    $('.btn-select-DoiTuongNNXacNhan').attr('value', dataGrid.DoiTuongNNID);
    $('#DoiTuongNNID_ChuHoXacNhan').value(dataGrid.DoiTuongNNID);
    $(".OptionDoiTuongNNXacNhan").toggle();
    $('#mdChonDoiTuongNN_usXacNhan').modal('hide');
});

// Chọn 1 dòng dữ liệu tổ chức trên modal chọn đối tượng NN
Grid_ChonDoiTuongNNTT_us.on("rowDblClick", function (e, row) {
    var dataGrid = row.getData();
    ResetTTDoiTuongXacNhan();
    var item = `<li><span><b>${dataGrid.HoVaTen}</b>, ngày sinh: <b>${dataGrid.NgayThangNamSinh}</b>, Giới tính: <b>${dataGrid.TenGioiTinh}</b>, Quốc tịch: <b>${dataGrid.TenQuocTich}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
    $('.btn-select-DoiTuongNNXacNhan').html(item);
    $('.btn-select-DoiTuongNNXacNhan').attr('value', dataGrid.DoiTuongNNID);
    $('#DoiTuongNNID_ChuHoXacNhan').value(dataGrid.DoiTuongNNID);
    $('#mdChonDoiTuongNN_usXacNhan').modal('hide');
});


//--------------------------------------------//
// Hàm load combo tổ chức
// Load ra combo tổ chức của địa bàn
function FillterToChucXacNhan() {
    var input, filter, ul, li, a, i;
    input = $("#ckTimKiemToChucXacNhan");
    filter = input.value().toUpperCase();
    div = $("#ListDataToChucXacNhan");
    a = $("#ListDataToChucXacNhan li");
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
function LoadComBoToChucXacNhan(TinhID, HuyenID, XaID, ThonID) {
    $('.listOptionXacNhan').html('');
    $('#ToChucID_ChuHoXacNhan').html('');
    $('#ListDataToChucXacNhan').append(`<li action="false" style="position: sticky;top: 0;background-color: white;">
                        <div class="row" style="width: 100%">
                        <div class="form-col-12">
                            <input type="text" class="form-control" id="ckTimKiemToChucXacNhan" onkeypress="FillterToChucXacNhan()">
                        </div>
                        </div>
                    </li>`);
    $('#ListDataToChucXacNhan').append(`<li action="chon" class="itemToChucXacNhan"><div class="opInfo Chon"><div>-Chọn tổ chức-</div></li>`);

    var saveData = [TinhID, HuyenID, XaID, ThonID];
    const kq = NTS.getAjax('/DanhMuc/DungChung/GetToChuc_ComboToChuc', { data: saveData }).Result;

    // Chỉ load 20 dòng dữ liệu đầu tiên
    const initialItems = 20;
    for (var i = 0; i < kq.length; i++) {
        $('#ToChucID_ChuHoXacNhan').append(`<option value="${kq[i].ToChucID}"
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
        $('#ToChucID_ChuHoXacNhan').value(kq[i].ToChucID);

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
        var item = `<li action="true" class="itemToChucXacNhan" data-name="${name}" data-code="${code}" data-NoiThuongTru="${kq[i].DiaChiCuThe}" value="${ToChucID}" data-masothue="${kq[i].MaSoThue}" data-loaiHinhDN="${kq[i].LoaiHinhDNID}" style="display: none;">
                        <div class="opImg" style="background-color:${mauNgauNhien}">${name_NSD}</div>
                        <div class="opInfo"><div><b>${name}</b> (${code}), Số ĐKKD/Mã số thuế: <b>${masothue}</b>, Người đại diện: <b>${kq[i].TenNguoiSuDungLD}</b></div>
                                <div class="text-diachi" title="${(thon == "" ? "" : thon + ", ")} ${xa}, ${huyen}, ${tinh}">Địa chỉ: <b>${NoiThuongTru}</b></div></div>
                    </li>`;
        $('#ListDataToChucXacNhan').append(item);
    }

    // Hiển thị 20 dòng đầu tiên
    $("#ListDataToChucXacNhan li").slice(0, initialItems).css("display", "flex");

    if (kq.length > initialItems) {
        $('#ListDataToChucXacNhan').append(`<li action="false" id="loadMoreToChucDKXacNhan" onclick="LoadMoreToChucXacNhan()" style="justify-content: center;"> Xem thêm &nbsp<i class="fa fa-arrow-down" style="color: #0054a6" aria-hidden="true"></i></li>`);
    }
}


// Chọn Tổ chức từ combo
$(document).on('click', '#SelectToChuc_USXacNhan', function () {
    var TinhID = $('#TinhID_TimKiem_us').value();
    var HuyenID = $('#HuyenID_TimKiem_us').value();
    var XaID = $('#XaID_TimKiem_us').value();
    var ThonID = $('#ThonID_TimKiem_us').value();
    LoadComBoToChucXacNhan(TinhID, HuyenID, XaID, ThonID);
});

//Chọn xuống tổ chức từ combo
$(document).on('click', '.itemToChucXacNhan', function () {
    var action = $(this).attr("action");
    if (action == "false") {
        return;
    }
    if (action == "chon") {
        var item = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn tổ chức- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
        $('#SelectToChuc_USXacNhan').value('');
        //ResetThongTinToChuc();
    } else {
        var value = $(this).attr('value');
        var name = $(this).attr("data-name");
        var code = $(this).attr("data-code");
        var masothue = $(this).attr("data-masothue");
        var NoiThuongTru = $(this).attr("data-NoiThuongTru");
        var loaihinhDN = $(this).attr("data-loaiHinhDN");
        var item = `<li><span><b>${name}</b> <b>(${code})</b> - Địa chỉ: <b>${NoiThuongTru}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
        $('.text-inputTenToChuc').text(name);
        //$('#DiaChiDoiTuongNNTT_us').value(NoiThuongTru);
        //$('#MaSoThueDoiTuongNNTT_us').value(masothue);
        //$('#LoaiHinhDNIDDoiTuongNNTT_us').value(loaihinhDN);
        //// Lưu giá trị của tổ chức với trang thái ban đầu để so sánh nếu có thay đổi khi tiếp tục thì cảnh bảo
        //mangGiaTriDauTC = [];
        //mangGiaTriDauTC.push(replaceNullAndEmptyString(loaihinhDN));
    }

    $('.btn-select-tochucXacNhan').html(item);
    $('.btn-select-tochucXacNhan').attr('value', value);
    $('#ToChucID_ChuHoXacNhan').value(value);
    $(".OptionToChucXacNhan").toggle();
});



var langArrayToChucXacNhan = [];
langArrayToChucXacNhan.push(`<li action="false" style="position: sticky;top: 0;background-color: white;">
                        <div class="row" style="width: 100%">
                        <div class="form-col-12">
                            <input type="text" class="form-control" id="ckTimKiemToChucIDXacNhan" >
                        </div>
                        </div>
                    </li>`);
langArrayToChucXacNhan.push(`<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn tổ chức- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);

$('.vodiapickerToChucXacNhan option').each(function () {
    var ToChucID = $(this).attr("value");
    var name = $(this).attr("data-name");
    var name_NSD = $(this).attr("data-name-NSD");
    var name_KCN = $(this).attr("data-name-KCN");
    var code = $(this).attr("data-code");
    var masothue = $(this).attr("data-masothue");
    var NoiThuongTru = $(this).attr("data-NoiThuongTru");
    var tinh = $(this).attr("data-tinh");
    var huyen = $(this).attr("data-huyen");
    var xa = $(this).attr("data-xa");
    var thon = $(this).attr("data-thon");
    const mauNgauNhien = getRandomColors(Color, 1);
    var item = `<li action="true" class="itemToChucXacNhan" data-name="${name}" data-code="${code}" data-NoiThuongTru="${kq[i].DiaChiCuThe}" value="${ToChucID}" data-masothue="${kq[i].MaSoThue}" data-loaiHinhDN="${kq[i].LoaiHinhDNID}" style="display: none;">
                        <div class="opImg" style="background-color:${mauNgauNhien}">${name_NSD}</div>
                        <div class="opInfo"><div><b>${name}</b> (${code}), Số ĐKKD/Mã số thuế: <b>${masothue}</b>, Người đại diện: <b>${kq[i].TenNguoiSuDungLD}</b></div>
                                <div class="text-diachi" title="${(thon == "" ? "" : thon + ", ")} ${xa}, ${huyen}, ${tinh}">Địa chỉ: <b>${NoiThuongTru}</b></div></div>
                    </li>`;
    langArrayToChucXacNhan.push(item);
});

//langArray.push(`<li action="false" id="LoadMoreDoiTuongDK" onclick="LoadMoreDoiTuong()" style="justify-content: center;"> Xem thêm &nbsp<i class="fa fa-arrow-down" style="color: #0054a6" aria-hidden="true"></i></li>`);
$('#ListDataToChucXacNhan').html(langArrayToChucXacNhan);

//Set the button value to the first el of the array
$('.btn-select-tochucXacNhan').html(langArrayToChucXacNhan[1]);
$('.btn-select-tochucXacNhan').attr('value', '');

$(".btn-select-tochucXacNhan").click(function () {
    $(".OptionToChucXacNhan").toggle();
});
$(document).ready(function () {
    // Bắt sự kiện click trên toàn bộ trang
    $(document).on('click', function (event) {
        // Kiểm tra xem sự kiện click diễn ra bên ngoài thẻ có class A hay không
        if (!$(event.target).closest('.lang-select').length) {

            $(".OptionToChucXacNhan").css('display', 'none');
        }
    });
});
////check local storage for the lang
var sessionLang = localStorage.getItem('lang');
if (sessionLang) {
    //find an item with value of sessionLang
    var langIndex = langArrayToChucXacNhan.indexOf(sessionLang);
    $('.tn-select-tochucXacNhan').html(langArrayToChucXacNhan[langIndex]);
    $('.tn-select-tochucXacNhan').attr('value', sessionLang);
} else {
    var langIndex = langArrayToChucXacNhan.indexOf('ch');
    $('.tn-select-tochucXacNhan').html(langArrayToChucXacNhan[langIndex]);
    //$('.btn-select').attr('value', 'en');
}


function NumbervisibleLiCountToChucXacNhan() {
    var visibleLiCount = $('#ListDataToChucXacNhan li').filter(function () {
        return $(this).css('display') === 'flex';
    }).length;
    return visibleLiCount;
}

var soLuongHienThi_ToChucXacNhan = 20;

function LoadMoreToChucXacNhan() {
    // Số phần tử đang hiển thị
    var visibleLiCount = NumbervisibleLiCountToChucXacNhan();
    // Hiển thị thêm 20 phần tử nữa
    $("#ListDataToChucXacNhan li").slice(visibleLiCount, visibleLiCount + soLuongHienThi_ToChucXacNhan).css("display", "flex");

    // Kiểm tra nếu đã hiển thị hết tất cả các phần tử thì ẩn nút "Xem thêm"
    if (visibleLiCount + soLuongHienThi_ToChucXacNhan >= $('#ListDataToChucXacNhan li').length - 1) {
        $("#loadMoreToChucDKXacNhan").css("display", "none");
    }
}


//--------------Lưu thông tin xác nhận không thuộc diện cấp giấy phép lao động----------------//
$('#NgayLamViec_XN').on('change', function () {
    let ngayLamViecVal = $(this).val();
    let ngayKetThucVal = $('#NgayKetThuc_XN').val();

    if (ngayLamViecVal !== '') {
        $(this).prop('required', true);
        $('#lblNgayLamViec_XN').addClass('validation');
        $('#NgayKetThuc_XN').prop('required', true);
        $('#lblNgayKetThuc_XN').addClass('validation');
    } else if (ngayLamViecVal === '' && ngayKetThucVal === '') {
        $(this).prop('required', false);
        $('#lblNgayLamViec_XN').removeClass('validation');
        $('#NgayKetThuc_XN').prop('required', false);
        $('#lblNgayKetThuc_XN').removeClass('validation');
    }
});

$('#NgayKetThuc_XN').on('change', function () {
    let ngayLamViecVal = $('#NgayLamViec_XN').val();
    let ngayKetThucVal = $(this).val();

    if (ngayKetThucVal !== '') {
        $(this).prop('required', true);
        $('#lblNgayKetThuc_XN').addClass('validation');
        $('#NgayLamViec_XN').prop('required', true);
        $('#lblNgayLamViec_XN').addClass('validation');
    } else if (ngayKetThucVal === '' && ngayLamViecVal === '') {
        $(this).prop('required', false);
        $('#lblNgayKetThuc_XN').removeClass('validation');
        $('#NgayLamViec_XN').prop('required', false);
        $('#lblNgayLamViec_XN').removeClass('validation');
    }
});


// Hàm để chuyển đổi chuỗi định dạng dd/mm/yyyy thành đối tượng Date
function parseDate(input) {
    var parts = input.split('/');
    // parts[0] là ngày, parts[1] là tháng, parts[2] là năm
    return new Date(parts[2], parts[1] - 1, parts[0]); // Lưu ý: Tháng trong Date() bắt đầu từ 0 (tháng 1 là 0)
}

$(document).on('click', '#btnLuuVaDongXacNhanGiayPhepLD_us', function () {
    const validate = new NTSValidate('#mdXacNhanKhongCapGiayPhepLD');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }

    // Kiểm tra ngày tháng năm của ngày cấp không được lớn hơn ngày hết hạn
    var ngayLamViecFull = parseDate($('#NgayLamViec_XN').value());
    var ngayHetHanFull = parseDate($('#NgayKetThuc_XN').value());

    if ($('#NgayLamViec_XN').value() != '') {
        if (ngayLamViecFull >= ngayHetHanFull) {
            NTS.canhbao("Ngày bắt đầu làm việc không được lớn hơn hoặc bằng ngày kết thúc làm việc!");
            return false;
        }
    }

    if ($('#SelectToChuc_USXacNhan').attr('value') == '') {
        NTS.canhbao("Tổ chức không được bỏ trống!");
        return false;
    }

    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#GiayPhepLDID').value();
    saveData[2] = $('#SoGPLD_XN').value();
    saveData[3] = $('#CanCu_XN').value();
    saveData[4] = $('#NgayCap_XN').value();
    saveData[5] = $('#NguoiKy_XN').value();
    saveData[6] = $('#CoQuanCap_XN').value();
    saveData[7] = $('#SelectDoiTuongNN_USXacNhan').attr('value');
    saveData[8] = $('#SelectToChuc_USXacNhan').attr('value');
    saveData[9] = $('#DiaChiNoiLV_XN').value();
    saveData[10] = $('#selViTriCongViec_XN').value();
    saveData[11] = $('#selHinhThucLV_XN').value();
    saveData[12] = $('#selChucDanhCV_XN').value();
    saveData[13] = $('#MucLuong_XN').value();
    saveData[14] = $('#NgayLamViec_XN').value();
    saveData[15] = $('#NgayKetThuc_XN').value();
    saveData[16] = $('#LyDoKhongThuocDienCap').value();
    var data = uploadfileEventXacNhan({
        name: '#DinhKem_XNKhongCapGiayPhepLD_us',///ID input type="file"
        loaiVB: 'VB',
    });
    if (data.length > 0) {
        $('#txtDinhKemXacNhan_VanBan_US').value(data);
        NTS.dongthongbao();
    }
    saveData[17] = $('#txtDinhKemXacNhan_VanBan_US').value();
    var result = NTS.getAjax('/QuanLy/GiayPhepLD/LuuThongTinXacNhan', { data: saveData });
    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        $('#mdXacNhanKhongCapGiayPhepLD').modal('hide');
        $('#mdThemMoiGiayPhepLD_us').modal('hide');
        return false;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});

//-------------------Sửa dữ liệu------------------//
function SuaDuLieuGiayXacNhan(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#mdXacNhanKhongCapGiayPhepLD').modal('show');
    resetForm('#mdXacNhanKhongCapGiayPhepLD');
    Loadcombo();
    resetText();
    const result = NTS.getAjax('/QuanLy/GiayPhepLD/LoadDuLieuSuaXacNhan', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#GiayPhepLDID').value(data.GiayPhepLDID);
        $('#SoGPLD_XN').value(data.SoGPLD);
        $('#CanCu_XN').value(data.CanCu);
        $('#NgayCap_XN').value(data.NgayCapGPLD);
        $('#NguoiKy_XN').value(data.NguoiNopHS);
        $('#CoQuanCap_XN').value(data.CoQuanCap);
        $('#SelectDoiTuongNN_USXacNhan').attr('value', data.DoiTuongNNID);
        $('#SelectToChuc_USXacNhan').attr('value', data.ToChucID);
        $('#LyDoKhongThuocDienCap').value(data.LyDoKhongCapGPLD);
        $('#DiaChiNoiLV_XN').value(data.DiaDiemLV);
        setTimeout(() => {
            $('#selViTriCongViec_XN').value(data.ViTriViecLamID);
            $('#selHinhThucLV_XN').value(data.HinhThucLVID);
            $('#selChucDanhCV_XN').value(data.ChucVuID);
        }, 250);
        $('#MucLuong_XN').value(data.MucLuong);
        $('#NgayLamViec_XN').value(data.LamViecTuNgay);
        $('#NgayKetThuc_XN').value(data.LamViecDenNgay);
        // hiển thị trên Combo đối tượng 
        var itemDT = `<li><span><b>${data.HoVaTen}</b>, ngày sinh: <b>${data.NgayThangNamSinhDT}</b>, Giới tính: <b>${data.TenGioiTinh}</b>, Quốc tịch: <b>${data.TenQuocTich}</b> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
        $('.btn-select-DoiTuongNNXacNhan').html(itemDT);
        $('.btn-select-DoiTuongNNXacNhan').attr('value', data.DoiTuongNNID);
        $('#DoiTuongNNID_ChuHoXacNhan').value(data.DoiTuongNNID);
        // Hiển thị trên combo tổ chức
        var itemTC = `<li><span><b>${data.TenToChuc}</b> <b>(${data.MaToChuc})</b> - Địa chỉ: <b>${data.DiaChiCuThe}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
        $('.btn-select-tochucXacNhan').html(itemTC);
        $('.btn-select-tochucXacNhan').attr('value', data.ToChucID);
        $('#ToChucID_ChuHoXacNhan').value(data.ToChucID);
        var listFiles_VanBan_US = [];
        $('#txtDinhKemXacNhan_VanBan_US').val(data.TaiLieu);
        if (data.TaiLieu == '' || data.TaiLieu == null) {
            ResetDinhKemFileXacNhan();
        }
        else {
            for (var i = 0; i < data.TaiLieu.split('*').length; i++) {
                if (data.TaiLieu.split('*')[i] == '') {
                    continue;
                }
                listFiles_VanBan_US.push(data.TaiLieu.split('*')[i].split('/')[data.TaiLieu.split('*')[i].split('/').length - 1].replaceAll('*', '').toString());
            }
            $('#DinhKem_XNKhongCapGiayPhepLD_us').ace_file_input('show_file_list', listFiles_VanBan_US);
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
            $('.ace-file-container.hide-placeholder .ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKemXacNhan XoaFileDinhKem btn-del-item img-db"  onclick="return false"></i>');
        }
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
}
//-------------------Sua du thông tin phiếu thu thập--------------------//
$(document).on('click', '.btnSuaTTXacNhan', function () {
    var ID = $(this).attr('data');
    SuaDuLieuGiayXacNhan(ID);
});

//------------------------ Xử lý khi nhập input thì load qua giấy phép lao động---------------------------/ /
    // Xử lý khi nhập input thì load qua giấy phép lao động
    $('#SoGPLD_XN').on('input', function () {
        // Lấy giá trị từ input và cập nhật phần tử với class GiayPhep_So
        $('.GiayPhep_So').text($(this).value());
    });

$('#DiaChiNoiLV_XN').on('input', function () {
    // Lấy giá trị từ input và cập nhật phần tử với class GiayPhep_So
    $('.text-inputdiadiemlamviec').text($(this).value());
});

$('#LyDoKhongThuocDienCap').on('input', function () {
    // Lấy giá trị từ input và cập nhật phần tử với class GiayPhep_So
    $('.text-inputlydokhongcapphep').text($(this).value());
});

$('#CanCu_XN').on('input', function () {
    $('.GiayPhep_No').text($(this).value());
});

$('#selHinhThucLV_XN').on('select2:select', function () {
    $('.text-input-hinhthuclv').text($('#selHinhThucLV_XN').select2('data')[0].text);
});
$('#selChucDanhCV_XN').on('select2:select', function () {
    $('.text-inputchudanhcv').text($('#selChucDanhCV_XN').select2('data')[0].text);
});

$('#selViTriCongViec_XN').on('select2:select', function () {
    $('.text-inputvitricv').text($('#selViTriCongViec_XN').select2('data')[0].text);
});

$('#NgayLamViec_XN').on('change', function () {
    var TuNgay = $(this).val(); // Lấy giá trị từ input

    if (TuNgay && TuNgay.includes('/')) {
        var parts = TuNgay.split('/');

        if (parts.length === 3) {
            var ngay = parts[0];
            var thang = parts[1];
            var nam = parts[2];

            $('.text-inputtungay').text(ngay);
            $('.text-inputtuthang').text(thang);
            $('.text-inputtunam').text(nam);
        }
    }
});

$('#NgayKetThuc_XN').on('change', function () {
    var TuNgay = $(this).val(); // Lấy giá trị từ input

    if (TuNgay && TuNgay.includes('/')) {
        var parts = TuNgay.split('/');

        if (parts.length === 3) {
            var ngay = parts[0];
            var thang = parts[1];
            var nam = parts[2];

            $('.text-inputdenngay').text(ngay);
            $('.text-inputdenthang').text(thang);
            $('.text-inputdennam').text(nam);
        }
    }
});


$(document).on('click', '.badge_Xemthem', function () {
    $('#mdXemThemHoSo').modal('show');
});