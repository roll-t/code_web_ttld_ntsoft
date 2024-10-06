var tempthem = "them";
var tempthemBuoc2 = "them";
var tempthemToChuc = "sua";
var mangGiaTriDau = [];
var mangGiaTriSau = [];
var tenBangThamChieu = 'CauLaoDongBanDau'; // sử dụng cho thiết lập tùy chỉnh hiển thị cột trên lưới chính
var capNhatbuoc = false; // Khi thêm mới bước 2 và 3 nếu chọn button quay lại thì biến capNhatBuoc = true để khi tiếp tục nó lưu trạng thái sửa

$(function () {
    LoadTimKiem();
    getLocation(); // lấy dữ liệu kinh độ và vĩ độ thu thập
});

$(document).ready(function () {
    // Thiết lập hệ thống phần tìm kiếm
    setTimeout(function () {
        PhanQuyenComBoDiaBan('TinhID_TimKiem_us', 'HuyenID_TimKiem_us', 'XaID_TimKiem_us', 'ThonID_TimKiem_us');
    }, 150);
    // Hiển thị ngày đầu/cuối của năm hiện tại 
    NTS.hienNgayDauNamLenTextbox('TuNgay_TimKiem_US');
    NTS.hienNgayCuoiNamLenTextbox('DenNgay_TimKiem_US');
    //Tùy chọn hiển thị cột trên lưới chính
    ThietLapCotTrenLuoi(tenBangThamChieu, Grid1); // thiết lập cột trên lưới
    LoadDataTable();
    CanhBaoDuLieuChuaHoanThanh(); // Cảnh báo số lượng phiếu chưa hoàn thành thu thập


    //Định dạng nhập xxxx.xxx.xxx cho số điện thoại modal thêm mới tổ chức
    $('#SoDienThoai_us').on('input', function () {
        formatPhoneNumberNhap(this);
    });

    // Restrict input to numbers only
    $('#SoDienThoai_us').on('keydown', function (event) {
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


function actionDropdownFormatter(cell, formatterParams, onRendered) {
    var ID = cell.getData().CauLaoDongID;
    var LaBienDong = cell.getData().BienDong;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
       <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
       <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
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
                    <a  class="dropdown-item btnInMau02 " href="#" data="${ID}">
                        In mẫu 02 thông tư 01/2022/TT-BLĐTBXH
                   </a>
                </div>
       </div>
       </div>`;

    return select;
}

// Formater phần xem nội dung thu thập
var fmNoiDungTT = function (cell) {
    var ID = cell.getData().CauLaoDongID;
    var NoiDung = cell.getValue();
    if (NoiDung != "") {
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
    } else {
        return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${NoiDung}</p>
                    </div>`;
    }
}

//-------------------Grid thu thập cầu lao động---------------//
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
        { title: "Ngày thu thập", field: "NgayThuThap", formatter: 'textarea', width: 120, vertAlign: "middle",  headerHozAlign: "center", hozAlign: "center" },
        { title: "Mã tổ chức", field: "MaToChuc", formatter: 'textarea', minWidth: 150, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Tên tổ chức", field: "TenToChuc", formatter: 'textarea', minWidth: 250, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Mã số thuế", field: "MaSoThue", formatter: 'textarea', vertAlign: "middle", minWidth: 130, headerHozAlign: "center", hozAlign: "left" },
        { title: "Tên người sử dụng lao động", field: "TenNguoiSuDungLD", formatter: 'textarea', vertAlign: "middle", minWidth: 140, headerHozAlign: "center", hozAlign: "left" },
        { title: "CCCD/CMND/Số định danh", field: "SoCCCD", formatter: 'textarea', vertAlign: "middle", minWidth: 130, headerHozAlign: "center" },
        { title: "Địa chỉ", field: "DiaChiCuThe", formatter: 'textarea', vertAlign: "middle", minWidth: 250, headerHozAlign: "center" },
        { title: "Nội dung thu thập", field: "NoiDungThuThap", formatter: fmNoiDungTT, vertAlign: "middle", minWidth: 260, headerHozAlign: "center" },
        { title: "ThuThapCauLDID", field: "ThuThapCauLDID", width: 0, visible: false }
    ],
    rowFormatter: function (row) {
        try {
            // Chưa hoàn thành thu thập
            if (row.getData().ChuaHoanThanh == 1) {
                row.getElement().style.color = "#fb2b1b";
            }
        }
        catch { }
    },
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

// Load lưới
async function LoadDataTable() {
    var saveData = new Array();
    saveData[0] = $('#TinhID_TimKiem_us').value();
    saveData[1] = $('#HuyenID_TimKiem_us').value();
    saveData[2] = $('#XaID_TimKiem_us').value();
    saveData[3] = $('#ThonID_TimKiem_us').value();
    saveData[4] = $('#timKiem').value();
    saveData[5] = $('#TuNgay_TimKiem_US').value();
    saveData[6] = $('#DenNgay_TimKiem_US').value();
    Grid1.clearData();
    const GetAll = await NTS.getAjaxAsync("/QuanLy/ThuThapCauLaoDongBanDau/GetAll", { data: saveData });
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
        Grid1.redraw(1);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
    GridKhongCoDuLieu("Grid1");
}

async function CanhBaoDuLieuChuaHoanThanh() {
    var saveData = new Array();
    saveData[0] = $('#TinhID_TimKiem_us').value();
    saveData[1] = $('#HuyenID_TimKiem_us').value();
    saveData[2] = $('#XaID_TimKiem_us').value();
    saveData[3] = $('#ThonID_TimKiem_us').value();
    saveData[4] = $('#timKiem').value();
    saveData[5] = $('#TuNgay_TimKiem_US').value();
    saveData[6] = $('#DenNgay_TimKiem_US').value();
    const result = await NTS.getAjaxAsync("/QuanLy/ThuThapCauLaoDongBanDau/CanhBaoDuLieuChuaHoanThanh", { data: saveData });
    if (!result.Err) {
        if (result.Result > 0) {
            NTS.canhbao('Đang có ' + result.Result + ' phiếu chưa hoàn thành thu thập!');
        }
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
}

// Tìm kiếm trên lưới
$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        Grid1.setFilter(matchAny, { value: $(this).val() });
    }
});

// CLick icon kính lup để tìm kiếm trên lưới
$(document).on('click', '.input-icon-addon', function () {
    Grid1.setFilter(matchAny, { value: $('#timKiem').val() });
});

//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiem', async function () {
    await LoadDataTable();
    await CanhBaoDuLieuChuaHoanThanh();
    $('#KhungTimKiem').slideUp(200);
    return false;

});

// Xem chi tiết nội dung ghi chú hộ gia đình
$(document).on('click', '.btnXemThemNoiDung', function () {
    $('#CauLaoDongID').val($(this).attr('data'));
    XemChiTietNoiDung($(this).attr('data'));
});

function XemChiTietNoiDung(ID) {
    $("#mdXemThemNoiDungTT").modal('show');
    $('#tieuDeModalCT').text('Chi tiết nội dung nội dung thu thập');
    const result = NTS.getAjax("/QuanLy/ThuThapCauLaoDongBienDong/NoiDungThuThapCT", { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#NoiDungThuThap_CT').html(data.NoiDungThuThap);
    } else {
        $('#NoiDungThuThap_CT').html("Chưa có dữ liệu");
    }
    return;
}


//---------------------------------Thêm mới thông tin thu thập cầu lao động ban đầu ---------------------------------
$(document).on('click', '#btnThemMoiBanDau', function () {
    if (!QuyenThem()) {
        return false;
    }
    getLocation();
    $('#CauLaoDongID').value('');
    $('#SelectToChuc_US').prop('disabled', false);
    $('#MaSoThue_us_CLD').prop('disabled', false);
    $('#HienThiTatCaToChuc').prop('disabled', false);
    $('#lblTieuDeThemMoi1_us').text('Thu thập thông tin Nhu cầu tuyển dụng lao động của người sử dụng lao động');
    showModalThemMoiThuThapCauLaoDong();
});

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
    var saveData = new Array();
    saveData[0] = TinhID;
    saveData[1] = HuyenID;
    saveData[2] = XaID;
    saveData[3] = ThonID;
    const kq = NTS.getAjax('/DanhMuc/DungChung/GetToChuc_ComboChuaThuThap', { data: saveData }).Result;
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
        var item = "";
        item = `<li action="true" class="itemToChuc" data-name="${name}" data-code="${code}"data-NoiThuongTru="${kq[i].DiaChiCuThe}" value="${ToChucID}">
                        <div class="opImg" style="background-color:${mauNgauNhien}">${name_NSD}</div>
                        <div class="opInfo"><div><b>${name}</b> (${code}), Số ĐKKD/Mã số thuế: <b>${masothue}</b>, Người đại diện: <b>${kq[i].TenNguoiSuDungLD}</b></div>
                                <div class="text-diachi" title="${(thon == "" ? "" : thon + ", ")} ${xa}, ${huyen}, ${tinh}">Địa chỉ: <b>${NoiThuongTru}</b></div></div>
                    </li>`;
        $('#ListDataToChuc').append(item);
    }
    $('#ListDataToChuc').append(`<li action="false" id="loadMoreToChucDK" onclick="LoadMoreToChuc()" style="justify-content: center;"> Xem thêm &nbsp<i class="fa fa-arrow-down" style="color: #0054a6" aria-hidden="true"></i></li>`);
}

//Chọn xuống tổ chức từ combo
$(document).on('click', '.itemToChuc', function () {
    var action = $(this).attr("action");
    if (action == "false") {
        return;
    }
    if (action == "chon") {
        var item = `<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn tổ chức- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
        $('#SelectToChuc_US').value('');
        ResetThongTinToChuc();
    } else {
        var value = $(this).attr('value');
        var name = $(this).attr("data-name");
        var code = $(this).attr("data-code");
        var masothue = $(this).attr("data-masothue");
        var NoiThuongTru = $(this).attr("data-NoiThuongTru");
        var item = `<li><span><b>${name}</b> <b>(${code})</b> - Địa chỉ: <b>${NoiThuongTru}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;

        // Load thông tin của tổ chức lên modal thu thập
        const result = NTS.getAjax('/DanhMuc/ToChuc/LoadDuLieuSua', { id: value });
        if (!result.Err && result.Result != null) {
            let data = result.Result[0];
            $('#ToChucID').value(data.ToChucID);
            $('#TenKCN_CLD_CLD').value(data.TenKCN);
            $('#MaSoThue_us_CLD').value(data.MaSoThue);
            $('#MaToChucUS_CLD').value(data.MaToChuc);
            $('#NamTrongKCN_us_CLD').value(data.NamTrongKCN);
            $('#TenNguoiSDLD_us_CLD').value(data.TenNguoiSuDungLD);
            $('#SoCCCD_us_CLD').value(data.SoCCCD);
            $('#LoaiHinhDNID_us_CLD').value(data.LoaiHinhDNID);
            $('#TinhTrangHDKTID_us_CLD').value(data.TinhTrangTGHDKTID);
            $('#NgayHoatDong_us_CLD').value(data.NgayHoatDong);
            $('#NganhNgheChinh_us_CLD').value(JSON.parse(data.NganhKinhTeID));
            $('#SoDienThoai_us_CLD').value(data.SoDienThoai);
            $('#Email_us_CLD').value(data.Email);
            $('#TinhID_us_CLD').value(data.DiaBanHCID_Tinh);
            $('#HuyenID_us_CLD').value(data.DiaBanHCID_Huyen);
            $('#XaID_us_CLD').value(data.DiaBanHCID_Xa);
            $('#ThonID_us_CLD').value(data.DiaBanHCID_Thon);
            $('#SoNha_us_CLD').value(data.SoNha);
            $('#DiaChi_us_CLD').text(data.DiaChiCuThe);

            // Lưu giá trị của tổ chức với trang thái ban đầu để so sánh nếu có thay đổi khi tiếp tục thì cảnh bảo
            mangGiaTriDau = [];
            mangGiaTriDau.push(replaceNullAndEmptyString(data.TenKCN));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.MaSoThue));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NamTrongKCN));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.TenNguoiSuDungLD));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoCCCD));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.LoaiHinhDNID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.TinhTrangTGHDKTID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayHoatDong));
            mangGiaTriDau.push(replaceNullAndEmptyString(JSON.parse(data.NganhKinhTeID)));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoDienThoai));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.Email));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_Tinh));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_Huyen));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_Xa));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_Thon));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNha));
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }

    $('.btn-select').html(item);
    $('.btn-select').attr('value', value);
    $('#ToChucID_ChuHo').value(value);
    $(".OptionToChuc").toggle();
});

// Chọn Tổ chức từ combo
$(document).on('click', '#SelectToChuc_US', function () {
    var TinhID = $('#TinhID_TimKiem_us').value();
    var HuyenID = $('#HuyenID_TimKiem_us').value();
    var XaID = $('#XaID_TimKiem_us').value();
    var ThonID = $('#ThonID_TimKiem_us').value();
    LoadComBoToChuc(TinhID, HuyenID, XaID, ThonID);
});

//Click thêm mới tổ chức
$(document).on('click', '#btnThemNhanhToChuc', function () {
    tempthemToChuc = "them";
    $('#tieuDeModal_ThemToChuc_us').text('Thêm mới tổ chức');
    showModalThemMoiToChuc();
});
//-----------------------Lưu thông tin tổ chức--------------//
$(document).on('click', '#btnLuuVaDongThemToChuc_us', function () {
    const validate = new NTSValidate('#mdThemMoiToChuc_us');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }
    if ($('#SoCCCD_us').val() != "") {
        if ($('#SoCCCD_us').val().length !== 12 && $('#SoCCCD_us').val().length !== 9) {
            NTS.canhbao("Số CMND/CCCD/Số định danh cá nhân chưa đúng định dạng!");
            return false;
        }
    }
    if ($('#SoDienThoai_us').value() != "") {
        if ($('#SoDienThoai_us').value().length < 12) {
            NTS.canhbao("Số điện thoại chưa đúng định dạng!");
            return false;
        }
    }

    var saveData = new Array();
    saveData[0] = tempthemToChuc;
    saveData[1] = $('#ToChucID').value();
    saveData[2] = $('#MaToChuc_us').value();
    saveData[3] = $('#NamTrongKCN').value();
    saveData[4] = $('#TenKCN_us').value();
    saveData[5] = $('#MaSoThue_us').value();
    saveData[6] = $('#TenToChuc_us').value();
    saveData[7] = $('#TenNguoiSDLD_us').value();
    saveData[8] = $('#SoCCCD_us').value();
    saveData[9] = $('#LoaiHinhDNID_us_TC').value();
    saveData[10] = $('#TinhTrangHDID_us').value();
    saveData[11] = $('#NgayHoatDong_us_TC').value();
    saveData[12] = $('#SoDienThoai_us').value();
    saveData[13] = $('#Email_us').value();
    saveData[14] = $('#TinhID_us_TC').value();
    saveData[15] = $('#HuyenID_us_TC').value();
    saveData[16] = $('#XaID_us_TC').value();
    saveData[17] = $('#ThonID_us_TC').value();
    saveData[18] = $('#SoNha_us_TC').value();
    saveData[19] = $('#DiaChi_us_TC').text();
    saveData[20] = $('#GhiChuTC_us').value();
    saveData[21] = $('#TrangThaiToChuc_us').value();
    saveData[22] = JSON.stringify($('#NganhNgheID_us_TC').value());
    var result = NTS.getAjax('/DanhMuc/DungChung/LuuThongTinToChuc', { data: saveData });
    if (!result.Err) {
        if (result.Logs == "1") {
            CanhBaoTrungMaSoThue(() => { }, result.Msg);
        } else {
            NTS.thanhcong(result.Msg);
            $('#mdThemMoiToChuc_us').modal('hide');
            return false;
        }
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});

/// CLick xem modal chọn danh sách tổ chức 
$(document).on('click', '#HienThiTatCaToChuc',function () {
    $('#mdChonToChuc_us').modal('show');
    LoadToChucChon();
});

//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#btntimKiemToChuc_us_Chon',function () {
    LoadToChucChon();
    $('#KhungTimKiem_ToChuc_us').slideUp(200);
    return false;
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
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
    GridKhongCoDuLieu("Grid_ChonToChuc_us");
}


//Lấy ra thông tin tổ chức khi nhập vào mã số thuế trên input mã số thuế
function LoadThongTinToChucTheoMaSoThue(value) {
    const result = NTS.getAjax('/QuanLy/ThuThapCauLaoDongBanDau/LoadDuLieuToChucTheoMaSoThue', { value: value });
    if (result.Result.length != 0 ) {
        if (!result.Err && result.Result != null) {
            let data = result.Result[0];
            if (data.GiaTri == '1') {
                NTS.canhbao(`Tổ chức có Số ĐKKD/Mã số thuế:${value} đã được thu thập thông tin Nhu cầu tuyển dụng lao động của người sử dụng lao động!`);
                return false;
            } else {
                $('#ToChucID').value(data.ToChucID);
                $('#TenKCN_CLD_CLD').value(data.TenKCN);
                $('#MaSoThue_us_CLD').value(data.MaSoThue);
                $('#MaToChucUS_CLD').value(data.MaToChuc);
                $('#NamTrongKCN_us_CLD').value(data.NamTrongKCN);
                $('#TenNguoiSDLD_us_CLD').value(data.TenNguoiSuDungLD);
                $('#SoCCCD_us_CLD').value(data.SoCCCD);
                $('#LoaiHinhDNID_us_CLD').value(data.LoaiHinhDNID);
                $('#TinhTrangHDKTID_us_CLD').value(data.TinhTrangTGHDKTID);
                $('#NgayHoatDong_us_CLD').value(data.NgayHoatDong);
                $('#NganhNgheChinh_us_CLD').value(JSON.parse(data.NganhKinhTeID));
                $('#SoDienThoai_us_CLD').value(data.SoDienThoai);
                $('#Email_us_CLD').value(data.Email);
                $('#TinhID_us_CLD').value(data.DiaBanHCID_Tinh);
                $('#HuyenID_us_CLD').value(data.DiaBanHCID_Huyen);
                $('#XaID_us_CLD').value(data.DiaBanHCID_Xa);
                $('#ThonID_us_CLD').value(data.DiaBanHCID_Thon);
                $('#SoNha_us_CLD').value(data.SoNha);
                $('#DiaChi_us_CLD').text(data.DiaChiCuThe);
                var item = `<li><span><b>${data.TenToChuc}</b> <b>(${data.MaToChuc})</b> - Địa chỉ: <b>${data.DiaChiCuThe}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
                $('.btn-select').html(item);
                $('.btn-select').attr('value', data.ToChucID);
                $('#ToChucID_ChuHo').value(data.ToChucID);
                // lưu giá trị của tổ chức với trang thái ban đầu để so sánh nếu có thay đổi khi tiếp tục thì cảnh bảo
                mangGiaTriDau = [];
                mangGiaTriDau.push(replaceNullAndEmptyString(data.TenKCN));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.MaSoThue));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.NamTrongKCN));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.TenNguoiSuDungLD));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.SoCCCD));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.LoaiHinhDNID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.TinhTrangTGHDKTID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayHoatDong));
                mangGiaTriDau.push(replaceNullAndEmptyString(JSON.parse(data.NganhKinhTeID)));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.SoDienThoai));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.Email));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_Tinh));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_Huyen));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_Xa));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_Thon));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNha));
            }
        } else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    } else {
        // Trường hợp tổ chức chưa tồn tại trong hệ thống
        NTS.canhbao(`Tổ chức có Số ĐKKD/Mã số thuế:${value} chưa tồn tại trong hệ thống!`);
        $('#SelectToChuc_US').html('<li action="chon"><div class="opInfo Chon"><div style="display: flex;justify-content: space-between;align-items: center;">-Chọn tổ chức- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>');
        $('#SelectToChuc_US').attr('value', "");
        $('#ToChucID_ChuHo').html("");
        ResetThongTinToChuc2();
        $('#MaSoThue_us_CLD').value('');
        tempthemToChuc = 'them';
        themToChuc = true;
        return false;
    }
}

function ResetThongTinToChuc2() {
    $('#ToChucID').value('');
    $('#TenKCN_CLD_CLD').value('');
    $('#NamTrongKCN_us_CLD').value('');
    $('#TenNguoiSDLD_us_CLD').value('');
    $('#SoCCCD_us_CLD').value('');
    $('#LoaiHinhDNID_us_CLD').value('');
    $('#TinhTrangHDKTID_us_CLD').value('');
    $('#NgayHoatDong_us_CLD').value('');
    $('#NganhNgheChinh_us_CLD').value('');
    $('#SoDienThoai_us_CLD').value('');
    $('#Email_us_CLD').value('');
    $('#TinhID_us_CLD').value('');
    $('#HuyenID_us_CLD').value('');
    $('#XaID_us_CLD').value('');
    $('#ThonID_us_CLD').value('');
    $('#SoNha_us_CLD').value('');
    $('#DiaChi_us_CLD').text('');
    $('#TinhTrangHDKTID_us_CLD option:eq(1)').prop('selected', true);
    $('#TinhTrangHDKTID_us_CLD').trigger('change');
    PhanQuyenComBoDiaBan('TinhID_us_CLD', 'HuyenID_us_CLD', 'XaID_us_CLD', 'ThonID_us_CLD');
    loadMacDinhDiaBanHC_TheoDV();
}

// Khi nhập xong Số ĐKKD/Mã số thuế và blur ra khỏi input
$(document).on('blur', '#MaSoThue_us_CLD', function () {
    var MaSoThue = $('#MaSoThue_us_CLD').value();
    if (MaSoThue != "") {
        LoadThongTinToChucTheoMaSoThue(MaSoThue);
    }
});

// Chọn 1 dòng dữ liệu tổ chức trên modal chọn tổ chuc
Grid_ChonToChuc_us.on("rowDblClick", function (e, row) {
    var masothue = row.getData().MaSoThue;
    LoadThongTinToChucTheoMaSoThue(masothue);
    $('#mdChonToChuc_us').modal('hide');
});

// click button chọn và đóng modal chọn tổ chức
$(document).on('click', '#btnChonToChucVaDong_us', function () {
    var dataGrid = Grid_ChonToChuc_us.getSelectedRows()[0]._row.data;
    var masothue = dataGrid.MaSoThue;
    LoadThongTinToChucTheoMaSoThue(masothue);
    $('#mdChonToChuc_us').modal('hide');
});

///////// PHÍM TẮT /////////
var hotKey = 0; // 1 thêm
var hotKey2 = 0; // 1 thêm
$(document).on('keydown', function (e) {
    console.log(e.keyCode);
    switch (e.keyCode) {
        case 113:
            if (hotKey == 0)
                $('#btnThemMoiBanDau').trigger('click');
            e.preventDefault();
            break;
        case 114:
            if (hotKey == 0)
                $('.nav-search-input').focus();
            e.preventDefault();
            break;
        case 115:
            //if (hotKey == 1)
            //    if ($('#mdThemMoiToChuc_us').hasClass('show')) {
            //        $('#mdThemMoiToChuc_us').modal('hide');
            //        e.preventDefault();
            //        break;
            //    }
        case 119:
            if (hotKey == 1) {
                // Kiểm tra modal 2
                if ($('#mdThemMoiThuThapCau_Buoc2_us').hasClass('show') && $('#mdThemMoiThuThapCau_Buoc2_us').css('display') === 'block') {
                    $('#btnQuayLaiBuoc1_us').trigger('click');
                    e.preventDefault();
                    break;
                }
            }
            if (hotKey2 == 1) {
                // Kiểm tra modal 3
                if ($('#mdThemMoiThuThapCau_Buoc3_us').hasClass('show') && $('#mdThemMoiThuThapCau_Buoc3_us').css('display') === 'block') {
                    $('#btnQuayLaiBuoc2_us').trigger('click');
                    e.preventDefault();
                    break;
                }
            }
        case 120:
            if (hotKey == 1) {
                // Kiểm tra modal 1
                if ($('#mdThemMoiThuThapCau_us').hasClass('show') && $('#mdThemMoiThuThapCau_us').css('display') === 'block') {
                    $('#btnTiepTuc_PhieuThuThap').trigger('click');
                    e.preventDefault();
                    break;
                }
                // Kiểm tra modal 2
                if ($('#mdThemMoiThuThapCau_Buoc2_us').hasClass('show') && $('#mdThemMoiThuThapCau_Buoc2_us').css('display') === 'block') {
                    $('#btnTiepTuc_NhuCauTuyenDung').trigger('click');
                    e.preventDefault();
                    break;
                }
            }
            if (hotKey2 == 1) {
                // Kiểm tra modal 3
                if ($('#mdThemMoiThuThapCau_Buoc3_us').hasClass('show') && $('#mdThemMoiThuThapCau_Buoc3_us').css('display') === 'block') {
                    $('#btnKetThuc_us').trigger('click');
                    e.preventDefault();
                    break;
                }
            }
    }
});
$(document).on('shown.bs.modal', '#mdThemMoiThuThapCau_us', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdThemMoiThuThapCau_us', function () {
    hotKey = 0;
});
$(document).on('shown.bs.modal', '#mdThemMoiThuThapCau_Buoc2_us', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdThemMoiThuThapCau_Buoc2_us', function () {
    hotKey = 0;
});
$(document).on('shown.bs.modal', '#mdThemMoiThuThapCau_Buoc3_us', function () {
    console.log('Modal is shown');
    hotKey2 = 1;
});

$(document).on('hidden.bs.modal', '#mdThemMoiThuThapCau_Buoc3_us', function () {
    console.log('Modal is hidden');
    hotKey2 = 0;
});
//---------------------------------Form bước 2---------------------------------

// Hàm kiểm tra 2 mảng giống nhau
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

$(document).on('click', '#btnTiepTuc_PhieuThuThap', function () {
    const validate = new NTSValidate('#mdThemMoiThuThapCau_us');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }
    if ($('#SoCCCD_us_CLD').val() != "") {
        if ($('#SoCCCD_us_CLD').val().length !== 12 && $('#SoCCCD_us_CLD').val().length !== 9) {
            NTS.canhbao("Số CMND/CCCD/Số định danh cá nhân chưa đúng định dạng!");
            return false;
        }
    }
    if ($('#SoDienThoai_us_CLD').value() != "") {
        if ($('#SoDienThoai_us_CLD').value().length < 12) {
            NTS.canhbao("Số điện thoại chưa đúng định dạng!");
            return false;
        }
    }

    if (capNhatbuoc == false) { // Khi thêm mới bước 2 và 3 nếu chọn button quay lại thì biến capNhatBuoc = true để khi tiếp tục nó lưu trạng thái sửa
        tempthem = 'them'; 
    } else {
        tempthem = 'sua';
    }

    //Lưu các giá trị trên form hiện tại để so sánh thông tin trong mảng sau với mảng ban đầu, nếu có khác nhau thì hiển cảnh báo khác nhau
    mangGiaTriSau.push($('#TenKCN_CLD_CLD').value());
    mangGiaTriSau.push($('#MaSoThue_us_CLD').value());
    mangGiaTriSau.push($('#NamTrongKCN_us_CLD').value());
    mangGiaTriSau.push($('#TenNguoiSDLD_us_CLD').value());
    mangGiaTriSau.push($('#SoCCCD_us_CLD').value());
    mangGiaTriSau.push($('#LoaiHinhDNID_us_CLD').value());
    mangGiaTriSau.push($('#TinhTrangHDKTID_us_CLD').value());
    mangGiaTriSau.push($('#NgayHoatDong_us_CLD').value());
    mangGiaTriSau.push($('#NganhNgheChinh_us_CLD').value());
    mangGiaTriSau.push($('#SoDienThoai_us_CLD').value());
    mangGiaTriSau.push($('#Email_us_CLD').value());
    mangGiaTriSau.push($('#TinhID_us_CLD').value());
    mangGiaTriSau.push($('#HuyenID_us_CLD').value());
    mangGiaTriSau.push($('#XaID_us_CLD').value());
    mangGiaTriSau.push($('#ThonID_us_CLD').value());
    mangGiaTriSau.push($('#SoNha_us_CLD').value());
    if (mangGiaTriSau.length > 0 && mangGiaTriDau.length > 0) {
        var different = false; // không có khác nhau về thông tin tô chức trên modal khi lưu bước 1
        for (var i = 0; i < mangGiaTriDau.length; i++) {
            if (Array.isArray(mangGiaTriDau[i]) && Array.isArray(mangGiaTriSau[i])) {
                if (!arraysEqual(mangGiaTriDau[i], mangGiaTriSau[i])) {
                    different = true;
                    break;
                }
            } else if (mangGiaTriDau[i] !== mangGiaTriSau[i]) {
                different = true;
                break;
            }
        }


        if (different) { // thay đổi thông tin tổ chức
            tempthemToChuc = 'sua';
            var saveData = new Array();
            saveData[0] = tempthem;
            saveData[1] = $('#ToChucID').value();
            saveData[2] = $('#MaToChucUS_CLD').value();
            saveData[3] = $('#NamTrongKCN_us_CLD').value();
            saveData[4] = $('#TenKCN_CLD_CLD').value();
            saveData[5] = $('#MaSoThue_us_CLD').value();
            saveData[6] = $('#SelectToChuc_US li span b:first').text();
            saveData[7] = $('#TenNguoiSDLD_us_CLD').value();
            saveData[8] = $('#SoCCCD_us_CLD').value();
            saveData[9] = $('#LoaiHinhDNID_us_CLD').value();
            saveData[10] = $('#TinhTrangHDKTID_us_CLD').value();
            saveData[11] = $('#NgayHoatDong_us_CLD').value();
            saveData[12] = $('#SoDienThoai_us_CLD').value();
            saveData[13] = $('#Email_us_CLD').value();
            saveData[14] = $('#TinhID_us_CLD').value();
            saveData[15] = $('#HuyenID_us_CLD').value();
            saveData[16] = $('#XaID_us_CLD').value();
            saveData[17] = $('#ThonID_us_CLD').value();
            saveData[18] = $('#SoNha_us_CLD').value();
            saveData[19] = $('#DiaChi_us_CLD').text();
            saveData[20] = '';
            saveData[21] = 1;
            saveData[22] = JSON.stringify($('#NganhNgheChinh_us_CLD').value());
            // 
            saveData[23] = $('#CauLaoDongID').value();
            saveData[24] = $('#NgayThuThap_us').value();
            saveData[25] = $('#MatHangChinh_us').value();
            saveData[26] = $('#QuyMoSDLD_us_CLD').value();
            saveData[27] = $('#NoiDungTT_us_CLD').value();
            saveData[28] = $('#KinhDo').value();
            saveData[29] = $('#ViDo').value();
            saveData[30] = tempthemToChuc;

            CanhBaoThayDoiTTToChuc(() => {
                var result = NTS.getAjax('/QuanLy/ThuThapCauLaoDongBanDau/LuuThongTinBuoc1', { data: saveData });
                if (!result.Err) {
                    LoadDataTable();
                    NTS.thanhcong(result.Msg);
                    $('#mdThemMoiThuThapCau_us').modal('hide');
                    $('#mdThemMoiThuThapCau_Buoc2_us').modal('show');
                    LoadMauThongTinNguoiLaoDongDangLV(result.Result);
                    $('#CauLaoDongID').value(result.Result);
                    resetForm("#mdThemMoiThuThapCau_Buoc2_us");
                }
                else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            });
            return false;
        }
        else if (!different) {
            // không có thay đổi thông tin tổ chức
            tempthemToChuc = '';
            var saveData = new Array();
            saveData[0] = tempthem;
            saveData[1] = $('#ToChucID').value();
            saveData[2] = $('#MaToChucUS_CLD').value();
            saveData[3] = $('#NamTrongKCN_us_CLD').value();
            saveData[4] = $('#TenKCN_CLD_CLD').value();
            saveData[5] = $('#MaSoThue_us_CLD').value();
            saveData[6] = $('#SelectToChuc_US li span b:first').text();
            saveData[7] = $('#TenNguoiSDLD_us_CLD').value();
            saveData[8] = $('#SoCCCD_us_CLD').value();
            saveData[9] = $('#LoaiHinhDNID_us_CLD').value();
            saveData[10] = $('#TinhTrangHDKTID_us_CLD').value();
            saveData[11] = $('#NgayHoatDong_us_CLD').value();
            saveData[12] = $('#SoDienThoai_us_CLD').value();
            saveData[13] = $('#Email_us_CLD').value();
            saveData[14] = $('#TinhID_us_CLD').value();
            saveData[15] = $('#HuyenID_us_CLD').value();
            saveData[16] = $('#XaID_us_CLD').value();
            saveData[17] = $('#ThonID_us_CLD').value();
            saveData[18] = $('#SoNha_us_CLD').value();
            saveData[19] = $('#DiaChi_us_CLD').text();
            saveData[20] = '';
            saveData[21] = 1;
            saveData[22] = JSON.stringify($('#NganhNgheChinh_us_CLD').value());
            // 
            saveData[23] = $('#CauLaoDongID').value();
            saveData[24] = $('#NgayThuThap_us').value();
            saveData[25] = $('#MatHangChinh_us').value();
            saveData[26] = $('#QuyMoSDLD_us_CLD').value();
            saveData[27] = $('#NoiDungTT_us_CLD').value();
            saveData[28] = $('#KinhDo').value();
            saveData[29] = $('#ViDo').value();
            saveData[30] = tempthemToChuc;
            var result = NTS.getAjax('/QuanLy/ThuThapCauLaoDongBanDau/LuuThongTinBuoc1', { data: saveData });
            if (!result.Err) {
                if (result.Logs == "1") {
                    NTS.canhbao(result.Msg);
                    return false;
                } else {
                    LoadDataTable();
                    NTS.thanhcong(result.Msg);
                    $('#mdThemMoiThuThapCau_us').modal('hide');
                    $('#mdThemMoiThuThapCau_Buoc2_us').modal('show');
                    LoadMauThongTinNguoiLaoDongDangLV(result.Result);
                    $('#CauLaoDongID').value(result.Result);
                    resetForm("#mdThemMoiThuThapCau_Buoc2_us");
                    return false;
                }
            } else {
                result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            }
            return false;
        }
    }
});

//---------------------------------Lấy dữ liệu kinh độ, vĩ độ thu thập---------------------------------
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            // tọa độ người dùng: position.coords.latitude, position.coords.longitude
            $('#KinhDo').value(position.coords.longitude);
            $('#ViDo').value(position.coords.latitude);
        });
    }
}


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

//------------------------------Xóa cầu lao động-----------------------------

function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'CauLaoDongID', ID: ID, TenBangHienTai: 'CauLaoDong', CacBangKhongXet: ['CauLaoDongTTLD','CauLaoDongTD'] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/QuanLy/ThuThapCauLaoDongBanDau/XoaDuLieu', { id: ID });
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

//---------------------------------Quay lại bước 1---------------------------------
$(document).on('click', '#btnQuayLaiBuoc1_us', function () {
    $('#mdThemMoiThuThapCau_Buoc2_us').modal('hide');
    $('#mdThemMoiThuThapCau_us').modal('show');
    capNhatbuoc = true;
    SuaDuLieuCauLaoDong_us($('#CauLaoDongID').value());
});

//-------------------Sửa dữ liệu cầu lao động ban đầu------------------//
function SuaDuLieuCauLaoDong_us(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#lblTieuDeThemMoi1_us').text('Cập nhật thông tin Nhu cầu tuyển dụng lao động của người sử dụng lao động');
    $('#mdThemMoiThuThapCau_us').modal('show');
    $('#CauLaoDongID').value('');
    $('#CauLaoDongID').value(ID);
    $('#SelectToChuc_US').prop('disabled', true);
    $('#MaSoThue_us_CLD').prop('disabled', true);
    $('#HienThiTatCaToChuc').prop('disabled', true);

    resetForm("#mdThemMoiThuThapCau_us");
    const result = NTS.getAjax('/QuanLy/ThuThapCauLaoDongBanDau/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        PhanQuyenComBoDiaBan('TinhID_us_CLD', 'HuyenID_us_CLD', 'XaID_us_CLD', 'ThonID_us_CLD');
        $('#ToChucID').value(data.ToChucID);
        $('#MaToChucUS_CLD').value(data.MaToChuc);
        $('#NamTrongKCN_us_CLD').value(data.NamTrongKCN);
        $('#TenKCN_CLD_CLD').value(data.TenKCN);
        $('#MaSoThue_us_CLD').value(data.MaSoThue);
        $('#TenNguoiSDLD_us_CLD').value(data.TenNguoiSuDungLD);
        $('#SoCCCD_us_CLD').value(data.SoCCCD);
        $('#LoaiHinhDNID_us_CLD').value(data.LoaiHinhDNID);
        $('#TinhTrangHDKTID_us_CLD').value(data.TinhTrangTGHDKTID);
        $('#NgayHoatDong_us_CLD').value(data.NgayHoatDong);
        $('#SoDienThoai_us_CLD').value(data.SoDienThoai);
        $('#Email_us_CLD').value(data.Email);
        setTimeout(() => {
            $('#TinhID_us_CLD').value(data.DiaBanHCID_Tinh);
            $('#HuyenID_us_CLD').value(data.DiaBanHCID_Huyen);
            $('#XaID_us_CLD').value(data.DiaBanHCID_Xa);
            $('#ThonID_us_CLD').value(data.DiaBanHCID_Thon);
        }, 50);
        $('#SoNha_us_CLD').value(data.SoNha);
        $('#DiaChi_us_CLD').text(data.DiaChiCuThe);
        $('#NganhNgheChinh_us_CLD').value(JSON.parse(data.NganhKinhTeID));
        $('#NgayThuThap_us').value(data.NgayThuThap);
        $('#QuyMoSDLD_us_CLD').value(data.QuyMoLaoDongID);
        $('#MatHangChinh_us').value(data.MatHang);
        $('#NoiDungTT_us_CLD').value(data.NoiDungThuThap);
        var item = `<li><span><b>${data.TenToChuc}</b> <b>(${data.MaToChuc})</b> - Địa chỉ: <b>${data.DiaChiCuThe}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
        $('.btn-select').html(item);
        $('.btn-select').attr('value', data.ToChucID);
        $('#ToChucID_ChuHo').value(data.ToChucID);

        mangGiaTriDau = [];
        mangGiaTriDau.push(replaceNullAndEmptyString(data.TenKCN));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.MaSoThue));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.NamTrongKCN));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.TenNguoiSuDungLD));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.SoCCCD));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.LoaiHinhDNID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.TinhTrangTGHDKTID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayHoatDong));
        mangGiaTriDau.push(replaceNullAndEmptyString(JSON.parse(data.NganhKinhTeID)));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.SoDienThoai));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.Email));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_Tinh));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_Huyen));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_Xa));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_Thon));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNha));
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
    capNhatbuoc = true;
}

$(document).on('click', '.btnSuaTT', function () {
    if (!QuyenSua()) {
        return false;
    }
    var ID = $(this).attr('data');
    SuaDuLieuCauLaoDong_us(ID);
});

// Thiết lập edit trên lưới
var SoNguoi = function (cell, onRendered, success, cancel, editorParams) {
    var luoi = this.table; // Lấy bảng hiện tại
    var rowData = cell.getRow().getData(); // Lấy dữ liệu của hàng hiện tại
    var ID = rowData.CauLaoDongTTLDID; // Lấy ID từ hàng hiện tại
    var valueChiDoc = rowData.ChiDoc; // Lấy giá trị ChiDoc từ hàng hiện tại
    var valthutu = rowData.ThuTu; // Lấy giá trị ThuTu từ hàng hiện tại
    var valstt = rowData.STT; // Lấy giá trị STT từ hàng hiện tại

    var editor = $('<input type="text">'); // Tạo một input mới
    editor.val(cell.getValue()); // Đặt giá trị của input là giá trị của ô hiện tại

    // Nếu giá trị ChiDoc là true, thiết lập kiểu dáng cho input nhưng không cho phép chỉnh sửa
    if (valueChiDoc == true) {
        editor.css({
            width: '100%',
            height: '100%',
            preventDefault: 'none',
        });
        return false;
    } else {
        editor.css({
            width: '100%',
            height: '100%'
        });
    }

    // Tự động focus vào input khi nó được hiển thị
    onRendered(function () {
        editor.focus();
    });

    // Giới hạn nhập chỉ cho phép ký tự số
    editor.on('input', function () {
        var value = editor.val(); // Lấy giá trị hiện tại của input
        var numericValue = value.replace(/[^0-9]/g, ''); // Loại bỏ tất cả các ký tự không phải là số
        numericValue = numericValue.replace(/^0+/, ''); // Loại bỏ các số 0 ở đầu
        if (value !== numericValue) {
            editor.val(numericValue); // Đặt lại giá trị chỉ chứa các ký tự số
        }
    });

    // Xử lý khi giá trị thay đổi
    editor.on('change', function () {
        var inputValue = editor.val(); // Lấy giá trị mới từ input
        if (inputValue === '') {
            inputValue = '0'; // Nếu input rỗng, đặt giá trị là 0
        }


        if (valthutu == '4.1') {
            var row4 = luoi.getRows().find(row => row.getData().ThuTu == '4');
            if (row4) {
                row4.update({ SoNguoi: inputValue }); // Cập nhật giá trị của ô 4.1 cho ô 4
                var row4ID = row4.getData().CauLaoDongTTLDID;
                NTS.getAjax("/QuanLy/ThuThapCauLaoDongBanDau/LuuThongTin_CauLDBanDauTTLD_LaoDong", { id: row4ID, tenCot: 'SoNguoi', soNguoi: inputValue });
            }
        }

        if (valthutu == '4.2' || valthutu == '4.3' || valthutu == '4.4' || valthutu == '4.5' || valthutu == '4.6' || valthutu == '4.7') {
            var row41 = luoi.getRows().find(row => row.getData().ThuTu == '4.1');
            if (row41) {
                var soNguoi41 = parseInt(row41.getData().SoNguoi, 10);
                var inputValueInt = parseInt(inputValue, 10);

                var warningMessage = '';
                if (valthutu == '4.2' && inputValueInt > soNguoi41) warningMessage = 'Lao động ngoại tỉnh không được lớn hơn Tổng số lao động đang làm việc!';
                if (valthutu == '4.3' && inputValueInt > soNguoi41) warningMessage = 'Lao động trực tiếp không được lớn hơn Tổng số lao động đang làm việc!';
                if (valthutu == '4.4' && inputValueInt > soNguoi41) warningMessage = 'Lao động nữ không được lớn hơn Tổng số lao động đang làm việc!';
                if (valthutu == '4.5' && inputValueInt > soNguoi41) warningMessage = 'Số lao động đã đăng ký hợp đồng lao động không được lớn hơn Tổng số lao động đang làm việc!';
                if (valthutu == '4.6' && inputValueInt > soNguoi41) warningMessage = 'Số lao động là người nước ngoài không được lớn hơn Tổng số lao động đang làm việc!';
                if (valthutu == '4.7' && inputValueInt > soNguoi41) warningMessage = 'Lao động đã tốt nghiệp trung học phổ thông không được lớn hơn Tổng số lao động đang làm việc!';

                if (warningMessage) {
                    NTS.canhbao(warningMessage);
                    inputValue = '0';
                } else {
                    var rowToUpdate = luoi.getRows().find(row => row.getData().ThuTu == valthutu);
                    var rowID = rowToUpdate.getData().CauLaoDongTTLDID;
                    NTS.getAjax("/QuanLy/ThuThapCauLaoDongBanDau/LuuThongTin_CauLDBanDauTTLD_LaoDong", { id: rowID, tenCot: 'SoNguoi', soNguoi: inputValue });
                }
            }
        }

        if (valstt == '10') {
            var row45 = luoi.getRows().find(row => row.getData().ThuTu == '4.5');
            if (row45) {
                var soNguoi45 = parseInt(row45.getData().SoNguoi, 10);
                var inputValueInt = parseInt(inputValue, 10);

                var warningMessage = '';
                if (inputValueInt > soNguoi45) warningMessage = 'Số lao động nữ không được lớn hơn Số lao động đã đăng ký hợp đồng lao động!';

                if (warningMessage) {
                    NTS.canhbao(warningMessage);
                    inputValue = '0';
                } else {
                    var rowToUpdate = luoi.getRows().find(row => row.getData().STT == valstt);
                    var rowID = rowToUpdate.getData().CauLaoDongTTLDID;
                    NTS.getAjax("/QuanLy/ThuThapCauLaoDongBanDau/LuuThongTin_CauLDBanDauTTLD_LaoDong", { id: rowID, tenCot: 'SoNguoi', soNguoi: inputValue });
                }
            }
        }

        // khi thay đổi giá trị ô 4.5 thì con của nó trở về giá trị 0
        if (valthutu == '4.5') {
            var row45 = luoi.getRows().find(row => row.getData().ThuTu == '4.5');
            if (row45) {
               
                // Cập nhật giá trị của ô có STT = 10 thành 0
                var row10 = luoi.getRows().find(row => row.getData().STT == '10');
                if (row10) {
                    var soNguoi10 = parseInt(row10.getData().SoNguoi, 10);
                    var inputValueInt = parseInt(inputValue, 10);

                    if (inputValueInt < soNguoi10) {
                        row10.update({ SoNguoi: '0' }); // Đặt giá trị của ô có STT = 10 thành 0
                        var row10ID = row10.getData().CauLaoDongTTLDID;
                        NTS.getAjax("/QuanLy/ThuThapCauLaoDongBanDau/LuuThongTin_CauLDBanDauTTLD_LaoDong", { id: row10ID, tenCot: 'SoNguoi', soNguoi: '0' });
                    }

                }
            }
        }

        // khi thay đổi giá trị ô 4.6 thì con của nó trở về giá trị 0
        if (valthutu == '4.6') {
            var row46 = luoi.getRows().find(row => row.getData().ThuTu == '4.6');
            if (row46) {
                // Cập nhật giá trị của ô có STT = 10 thành 0
                var row12 = luoi.getRows().find(row => row.getData().STT == '12');
                if (row12) {
                    var soNguoi12 = parseInt(row12.getData().SoNguoi, 10);
                    var inputValueInt = parseInt(inputValue, 10);

                    if (inputValueInt < soNguoi12) {
                        row12.update({ SoNguoi: '0' }); // Đặt giá trị của ô có STT = 10 thành 0
                        var row12ID = row12.getData().CauLaoDongTTLDID;
                        NTS.getAjax("/QuanLy/ThuThapCauLaoDongBanDau/LuuThongTin_CauLDBanDauTTLD_LaoDong", { id: row12ID, tenCot: 'SoNguoi', soNguoi: '0' });
                    }
                }
            }
        }


        if (valstt == '12') {
            var row46 = luoi.getRows().find(row => row.getData().ThuTu == '4.6');
            if (row46) {
                var soNguoi46 = parseInt(row46.getData().SoNguoi, 10);
                var inputValueInt = parseInt(inputValue, 10);

                var warningMessage = '';
                if (inputValueInt > soNguoi46) warningMessage = 'Số lao động nữ không được lớn hơn Số lao động là người nước ngoài!';

                if (warningMessage) {
                    NTS.canhbao(warningMessage);
                    inputValue = '0';
                } else {
                    var rowToUpdate = luoi.getRows().find(row => row.getData().STT == valstt);
                    var rowID = rowToUpdate.getData().CauLaoDongTTLDID;
                    NTS.getAjax("/QuanLy/ThuThapCauLaoDongBanDau/LuuThongTin_CauLDBanDauTTLD_LaoDong", { id: rowID, tenCot: 'SoNguoi', soNguoi: inputValue });
                }
            }
        }

        function KiemTraInputNhap(mangKT, oTong, message) {
            if (mangKT.includes(valthutu)) {
                var sum = 0; // Khởi tạo biến `sum6` để tính tổng
                //var subRows = ['6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7', '6.8']; // Danh sách các mã hàng con

                // Duyệt qua từng mã hàng con để tính tổng giá trị hiện tại trên lưới
                mangKT.forEach(function (subRow) {
                    var row = luoi.getRows().find(row => row.getData().ThuTu == subRow); // Tìm hàng có mã hàng con tương ứng
                    if (row) {
                        var value = parseInt(row.getData().SoNguoi, 10) || 0; // Lấy giá trị của ô và chuyển đổi thành số nguyên
                        if (subRow !== valthutu) { // Loại trừ ô đang nhập
                            sum += value; // Cộng giá trị vào tổng nếu không phải ô đang nhập
                        }
                    }
                });

                // Thêm giá trị hiện tại của ô đang chỉnh sửa vào tổng
                sum += parseInt(inputValue, 10) || 0;

                var row41 = luoi.getRows().find(row => row.getData().ThuTu == '4.1'); // Tìm hàng có mã hàng là '4.1'
                var maxAllowed = row41 ? parseInt(row41.getData().SoNguoi, 10) || 0 : 0; // Lấy giá trị tối đa cho phép từ hàng '4.1'

                // Kiểm tra xem tổng giá trị có vượt quá giá trị tối đa cho phép không
                if (sum > maxAllowed) {
                    NTS.canhbao(message); // Hiển thị cảnh báo nếu tổng vượt quá giá trị tối đa
                    inputValue = '0'; // Đặt lại giá trị của ô đang chỉnh sửa thành 0 nếu tổng vượt quá giá trị tối đa

                    // Cập nhật giá trị của ô hiện tại với 0
                    var row = luoi.getRows().find(row => row.getData().ThuTu == valthutu); // Tìm hàng hiện tại
                    if (row) {
                        row.update({ SoNguoi: 0 }); // Đặt lại giá trị của ô hiện tại thành 0
                    }

                    // Tính toán lại tổng giá trị hiện tại của các ô con sau khi đặt lại giá trị của ô hiện tại
                    sum = 0; // Đặt lại tổng
                    mangKT.forEach(function (subRow) {
                        var row = luoi.getRows().find(row => row.getData().ThuTu == subRow); // Tìm hàng có mã hàng con tương ứng
                        if (row) {
                            var value = parseInt(row.getData().SoNguoi, 10) || 0; // Lấy giá trị của ô và chuyển đổi thành số nguyên
                            sum += value; // Cộng giá trị vào tổng
                        }
                    });

                    // Cập nhật giá trị của hàng '6' với tổng mới
                    var row6 = luoi.getRows().find(row => row.getData().ThuTu == oTong); // Tìm hàng có mã hàng là '6'
                    if (row6) {
                        row6.update({ SoNguoi: sum }); // Cập nhật giá trị tổng cho hàng '6'
                        var row6ID = row6.getData().CauLaoDongTTLDID; // Lấy ID của hàng '6'
                        // Gửi yêu cầu AJAX để lưu thông tin lên server
                        NTS.getAjax("/QuanLy/ThuThapCauLaoDongBanDau/LuuThongTin_CauLDBanDauTTLD_LaoDong", { id: row6ID, tenCot: 'SoNguoi', soNguoi: sum });
                    }
                } else {
                    // Cập nhật giá trị của hàng '6' nếu tổng không vượt quá giá trị tối đa
                    var row6 = luoi.getRows().find(row => row.getData().ThuTu == oTong); // Tìm hàng có mã hàng là '6'
                    if (row6) {
                        row6.update({ SoNguoi: sum }); // Cập nhật giá trị tổng cho hàng '6'
                        var row6ID = row6.getData().CauLaoDongTTLDID; // Lấy ID của hàng '6'
                        // Gửi yêu cầu AJAX để lưu thông tin lên server
                        NTS.getAjax("/QuanLy/ThuThapCauLaoDongBanDau/LuuThongTin_CauLDBanDauTTLD_LaoDong", { id: row6ID, tenCot: 'SoNguoi', soNguoi: sum });
                    }
                }
            }
        }

        function TinhTongInput(mangKT, oTong) {
            if (mangKT.includes(valthutu)) {
                var sum = 0; // Khởi tạo biến `sum6` để tính tổng

                // Duyệt qua từng mã hàng con để tính tổng giá trị hiện tại trên lưới
                mangKT.forEach(function (subRow) {
                    var row = luoi.getRows().find(row => row.getData().ThuTu == subRow); // Tìm hàng có mã hàng con tương ứng
                    if (row) {
                        var value = parseInt(row.getData().SoNguoi, 10) || 0; // Lấy giá trị của ô và chuyển đổi thành số nguyên
                        if (subRow !== valthutu) { // Loại trừ ô đang nhập
                            sum += value; // Cộng giá trị vào tổng nếu không phải ô đang nhập
                        }
                    }
                });

                // Thêm giá trị hiện tại của ô đang chỉnh sửa vào tổng
                sum += parseInt(inputValue, 10) || 0;

                // Cập nhật giá trị của hàng '6' nếu tổng không vượt quá giá trị tối đa
                var row6 = luoi.getRows().find(row => row.getData().ThuTu == oTong); // Tìm hàng có mã hàng là '6'
                if (row6) {
                    row6.update({ SoNguoi: sum }); // Cập nhật giá trị tổng cho hàng '6'
                    var row6ID = row6.getData().CauLaoDongTTLDID; // Lấy ID của hàng '6'
                    // Gửi yêu cầu AJAX để lưu thông tin lên server
                    NTS.getAjax("/QuanLy/ThuThapCauLaoDongBanDau/LuuThongTin_CauLDBanDauTTLD_LaoDong", { id: row6ID, tenCot: 'SoNguoi', soNguoi: sum });
                }
            }
        }
        // Kiểm tra Lao động đang làm việc chia theo nhóm nghề
        var subRows5 = ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7']; // Danh sách các mã hàng con
        var message5 = 'Lao động đang làm việc chia theo nhóm nghề không được lớn hơn Tổng số lao động đang làm việc!';
        KiemTraInputNhap(subRows5, '5', message5);

         // Kiểm tra Lao động đang làm việc chia theo nhóm nghề
        var subRows6 = ['6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7', '6.8']; // Danh sách các mã hàng con
        var message6 = 'Lao động đang làm việc chia theo nhóm nghề không được lớn hơn Tổng số lao động đang làm việc!';
        KiemTraInputNhap(subRows6, '6', message6);

         // Kiểm tra Lao động đang làm việc chia theo lĩnh vực giáo dục - đào tạo
        var subRows7 = ['7.1', '7.2', '7.3', '7.4', '7.5', '7.6']; // Danh sách các mã hàng con
        var message7 = 'Lao động đang làm việc chia theo lĩnh vực giáo dục - đào tạo không được lớn hơn Tổng số lao động đang làm việc!';
        KiemTraInputNhap(subRows7, '7', message7);

         // Kiểm tra Loại và hiệu lực hợp đồng lao động
        var subRows10 = ['10.1', '10.2', '10.3']; // Danh sách các mã hàng con
        var message10 = 'Loại và hiệu lực hợp đồng lao động không được lớn hơn Tổng số lao động đang làm việc!';
        KiemTraInputNhap(subRows10, '10', message10);

        // Nhu cầu tuyển dụng lao động
        var subRows10 = ['a', 'b', 'c', 'đ', 'e', 'g', 'h']; // Danh sách các mã hàng con
        TinhTongInput(subRows10, '9'); // Cập nhật tổng cho các hàng '9', '9.1', '9.2'
        TinhTongInput(subRows10, '9.1');
        TinhTongInput(subRows10, '9.2');

        // Gọi hàm NTS.getAjax để lưu giá trị mới vào cơ sở dữ liệu
        NTS.getAjax("/QuanLy/ThuThapCauLaoDongBanDau/LuuThongTin_CauLDBanDauTTLD_LaoDong", { id: ID, tenCot: 'SoNguoi', soNguoi: inputValue });
        success(inputValue); // Cập nhật giá trị mới cho ô
        //luoi.redraw(true); // Vẽ lại bảng để hiển thị giá trị mới
    });

    // Xử lý khi input mất focus (focusout)
    editor.on('focusout', function () {
        var inputValue = editor.val(); // Lấy giá trị mới từ input
        if (inputValue === '') {
            inputValue = '0'; // Nếu input rỗng, đặt giá trị là 0
        }
        cell.setValue(inputValue); // Cập nhật giá trị mới cho ô ngay lập tức
        success(inputValue); // Cập nhật giá trị mới cho ô
        cancel(); // Hủy bỏ chế độ chỉnh sửa
    });

    return editor[0]; // Trả về phần tử DOM thô của input
};


// Chỉnh các trạng thái: in đậm, in nghiên, và chỉ đọc cho record trên lưới
var fmThietLapCotTT = function (cell) {
    var indam = cell.getData().InDam;
    var innghien = cell.getData().InNghien;
    var tt = cell.getData().ThuTu;

    if (indam == true) {
        return `<div style="font-weight: bold;display: flex;align-items: center;">${tt}</div>`;
    } else if (innghien == true) {
        return `<div style="font-style: italic;display: flex;align-items: center;">${tt}</div>`;
    } else if (indam == true && innghien == true) {
        return `<div style="font-style: italic;font-weight: bold;display: flex;align-items: center;">${tt}</div>`;
    }
    else {
        return tt;
    }
}

var fmThietLapCotChiTieu = function (cell) {
    var indam = cell.getData().InDam;
    var innghien = cell.getData().InNghien;
    var tt = cell.getData().ChiTieu;

    if (indam == true) {
        return `<div style="font-weight: bold;display: flex;align-items: center;">${tt}</div>`;
    } else if (innghien == true) {
        return `<div style="font-style: italic;display: flex;align-items: center;">${tt}</div>`;
    } else if (indam == true && innghien == true) {
        return `<div style="font-style: italic;font-weight: bold;display: flex;align-items: center;">${tt}</div>`;
    }
    else {
        return tt;
    }
}

var fmThietLapCotSoNguoi = function (cell) {
    var indam = cell.getData().InDam;
    var innghien = cell.getData().InNghien;
    var CLDMauCode = cell.getData().CauLaoDongMauCode;
    var tt = cell.getData().SoNguoi;

    if (CLDMauCode == "01" || CLDMauCode == "02" || CLDMauCode == "03" ) {
        if (indam == true) {
            return `<div style="font-weight: bold;display: flex;align-items: center;justify-content:left;width: 100%;">${tt}</div>`;
        } else if (innghien == true) {
            return `<div style="font-style: italic;display: flex;align-items: center;justify-content:left;width: 100%;">${tt}</div>`;
        } else if (indam == true && innghien == true) {
            return `<div style="font-style: italic;font-weight: bold;display: flex;align-items: center;justify-content:left; width: 100%;">${tt}</div>`;
        }
        else {
            return tt;
        }
    } else {
        if (indam == true) {
            return `<div style="font-weight: bold;display: flex;align-items: center;">${tt}</div>`;
        } else if (innghien == true) {
            return `<div style="font-style: italic;display: flex;align-items: center;">${tt}</div>`;
        } else if (indam == true && innghien == true) {
            return `<div style="font-style: italic;font-weight: bold;display: flex;align-items: center;">${tt}</div>`;
        }
        else {
            return tt;
        }
    }
}

// Lưới thông tin người lao động đang làm việc
var Grid_ChiTieuThuThap_Buoc1 = new Tabulator("#Grid_ChiTieuThuThap_us", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 55,
    paginationSizeSelector: [55, 100, 150, 200, 500, true],
    height: '500px',
    columns: [
        { title: "TT", field: "ThuTu", formatter: fmThietLapCotTT, vertAlign: "middle", width: 60, headerHozAlign: "center", hozAlign: "center" },
        { title: "Chỉ tiêu", field: "ChiTieu1", formatter: fmThietLapCotChiTieu, vertAlign: "middle", minWidth: 300, headerHozAlign: "center" },
        { title: "Số lượng (người)", field: "SoNguoi", formatter: fmThietLapCotSoNguoi, minWidth: 100, vertAlign: "middle", headerHozAlign: "center", editor: SoNguoi, hozAlign: "right" },
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

async function LoadMauThongTinNguoiLaoDongDangLV(ID) {
    Grid_ChiTieuThuThap_Buoc1.clearData();
    const GetAll = await NTS.getAjaxAsync("/QuanLy/ThuThapCauLaoDongBanDau/LayDuLieuMauNguoiLaoDong", { id: ID });
    if (!GetAll.Err) {
        Grid_ChiTieuThuThap_Buoc1.setData(GetAll.Result);
        Grid_ChiTieuThuThap_Buoc1.redraw(1);
        $('#Grid_ChiTieuThuThap_us .tabulator-page-size option:first-child').prop('selected', true);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}


Grid1.on("rowDblClick", function (e, row) {
    $('#CauLaoDongID').val(row.getData().CauLaoDongID);
    SuaDuLieuCauLaoDong_us(row.getData().CauLaoDongID);
});


//---------------------------------Form bước 3---------------------------------
//-------------------Sửa dữ liệu cầu lao động ban đầu------------------//
function SuaDuLieuCauLaoDong_us_Buoc3(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#mdThemMoiThuThapCau_Buoc3_us').modal('show');
    $('#CauLaoDongID').value('');
    $('#CauLaoDongID').value(ID);
    $('#SelectToChuc_US').prop('disabled', true);
    $('#MaSoThue_us_CLD').prop('disabled', true);
    $('#HienThiTatCaToChuc').prop('disabled', true);
    $('#lblTieuDeThemMoi1_us').text('Cập nhật thông tin Nhu cầu tuyển dụng lao động của người sử dụng lao động');
    resetForm("#mdThemMoiThuThapCau_Buoc3_us");
    const result = NTS.getAjax('/QuanLy/ThuThapCauLaoDongBanDau/LoadDuLieuSua_Buoc3', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#ToChucID').value(data.ToChucID);
        $('#KyTen_us').value(data.NguoiCungCapTT);
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
            $('#DinhKem_CauLD_us').ace_file_input('show_file_list', listFiles_VanBan_US);
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
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
    capNhatbuoc = true;
}

$(document).on('click', '#btnTiepTuc_NhuCauTuyenDung', function () {
    // reset rỗng cho đính kèm 
    ResetDinhKemFile();// đính kèm
    // Đính kèm chữ ký
    $('#imgHienThiKyTen').css('background-image', 'none');
    $('#txtDuongDanFileChuKy').value('');
    $('#imgHienThiKyTen').attr('data-url-file', '');
    $('#XemDinhKemChuKy_CauLD').attr('data-url-file', '');
    $('#XoaChuKy').attr('data-url-file', '');
    $('#XoaChuKy').css({ 'display': 'none' });
    $('#TaiChuKy').css({ 'display': 'block' });

    LoadMauThongTinNhuCauTuyenDung($('#CauLaoDongID').value());
    SuaDuLieuCauLaoDong_us_Buoc3($('#CauLaoDongID').value());
    NTS.thanhcong("Lưu dữ liệu thành công!");
    $('#mdThemMoiThuThapCau_Buoc2_us').modal('hide');
    $('#mdThemMoiThuThapCau_Buoc3_us').modal('show');
});


// Thiết lập edit trên lưới
var SoLuongNguoi = function (cell, onRendered, success, cancel, editorParams) {
    var luoi = this.table; // Lấy bảng hiện tại
    var rowData = cell.getRow().getData(); // Lấy dữ liệu của hàng hiện tại
    var ID = rowData.CauLaoDongTDID; // Lấy ID từ hàng hiện tại

    var editor = $('<input type="text">'); // Tạo một input mới
    editor.val(cell.getValue()); // Đặt giá trị của input là giá trị của ô hiện tại

    editor.css({
        width: '100%',
        height: '100%'
    });

    // Tự động focus vào input khi nó được hiển thị
    onRendered(function () {
        editor.focus();
    });

    // Giới hạn nhập chỉ cho phép ký tự số
    editor.on('input', function () {
        var value = editor.val(); // Lấy giá trị hiện tại của input
        var numericValue = value.replace(/[^0-9]/g, ''); // Loại bỏ tất cả các ký tự không phải là số
        numericValue = numericValue.replace(/^0+/, ''); // Loại bỏ các số 0 ở đầu
        if (value !== numericValue) {
            editor.val(numericValue); // Đặt lại giá trị chỉ chứa các ký tự số
        }
    });

    // Xử lý khi giá trị thay đổi
    editor.on('change', function () {
        var inputValue = editor.val(); // Lấy giá trị mới từ input
        if (inputValue === '') {
            inputValue = '0'; // Nếu input rỗng, đặt giá trị là 0
        }

        // Gọi hàm NTS.getAjax để lưu giá trị mới vào cơ sở dữ liệu
        NTS.getAjax("/QuanLy/ThuThapCauLaoDongBanDau/LuuThongTin_CauLDBanDauTD_NhuCauTuyenDung", { id: ID, tenCot: 'TongSo', soNguoi: inputValue });
        success(inputValue); // Cập nhật giá trị mới cho ô
        //luoi.redraw(true); // Vẽ lại bảng để hiển thị giá trị mới
    });

    // Xử lý khi input mất focus (focusout)
    editor.on('focusout', function () {
        var inputValue = editor.val(); // Lấy giá trị mới từ input
        if (inputValue === '') {
            inputValue = '0'; // Nếu input rỗng, đặt giá trị là 0
        }
        cell.setValue(inputValue); // Cập nhật giá trị mới cho ô ngay lập tức
        success(inputValue); // Cập nhật giá trị mới cho ô
        cancel(); // Hủy bỏ chế độ chỉnh sửa
    });

    return editor[0]; // Trả về phần tử DOM thô của input
};

var SoLuongLDNu = function (cell, onRendered, success, cancel, editorParams) {
    var luoi = this.table; // Lấy bảng hiện tại
    var rowData = cell.getRow().getData(); // Lấy dữ liệu của hàng hiện tại
    var ID = rowData.CauLaoDongTDID; // Lấy ID từ hàng hiện tại
    var maNghe = rowData.NgheNghiepCLDCode; // Lấy mã nghề từ hàng hiện tại

    var editor = $('<input type="text">'); // Tạo một input mới
    editor.val(cell.getValue()); // Đặt giá trị của input là giá trị của ô hiện tại

    editor.css({
        width: '100%',
        height: '100%'
    });

    // Tự động focus vào input khi nó được hiển thị
    onRendered(function () {
        editor.focus();
    });

    // Giới hạn nhập chỉ cho phép ký tự số
    editor.on('input', function () {
        var value = editor.val(); // Lấy giá trị hiện tại của input
        var numericValue = value.replace(/[^0-9]/g, ''); // Loại bỏ tất cả các ký tự không phải là số
        numericValue = numericValue.replace(/^0+/, ''); // Loại bỏ các số 0 ở đầu
        if (value !== numericValue) {
            editor.val(numericValue); // Đặt lại giá trị chỉ chứa các ký tự số
        }
    });

    // Xử lý khi giá trị thay đổi
    editor.on('change', function () {
        var inputValue = editor.val(); // Lấy giá trị mới từ input
        if (inputValue === '') {
            inputValue = '0'; // Nếu input rỗng, đặt giá trị là 0
        }

        var inputValueInt = parseInt(inputValue, 10);
        var tongSoValue = parseInt(rowData.TongSo, 10) || 0; // Lấy giá trị của ô `TongSo`

        if (inputValueInt > tongSoValue) {
            NTS.canhbao('Số lượng nữ không được lớn hơn Tổng số người!'); // Hiển thị cảnh báo
            inputValue = '0'; // Đặt lại giá trị của ô đang chỉnh sửa thành 0
            inputValueInt = 0;
        }

        // Gọi hàm NTS.getAjax để lưu giá trị mới vào cơ sở dữ liệu
        NTS.getAjax("/QuanLy/ThuThapCauLaoDongBanDau/LuuThongTin_CauLDBanDauTD_NhuCauTuyenDung", { id: ID, tenCot: 'SoLuongNu', soNguoi: inputValueInt });
        success(inputValueInt); // Cập nhật giá trị mới cho ô
        //luoi.redraw(true); // Vẽ lại bảng để hiển thị giá trị mới
    });

    // Xử lý khi input mất focus (focusout)
    editor.on('focusout', function () {
        var inputValue = editor.val(); // Lấy giá trị mới từ input
        if (inputValue === '') {
            inputValue = '0'; // Nếu input rỗng, đặt giá trị là 0
        }
        cell.setValue(inputValue); // Cập nhật giá trị mới cho ô ngay lập tức
        success(inputValue); // Cập nhật giá trị mới cho ô
        cancel(); // Hủy bỏ chế độ chỉnh sửa
    });

    return editor[0]; // Trả về phần tử DOM thô của input
};


// Lưới thông tin nhu cầu tuyển dung lao động
var Grid_MaNghe_us = new Tabulator("#Grid_MaNghe_us", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: '300px',
    columns: [
        { title: "Mã nghề cấp 2", field: "NgheNghiepCLDCode", formatter: 'textarea', vertAlign: "middle", width: 130, headerHozAlign: "center", hozAlign: "center" },
        { title: "Chỉ tiêu", field: "TenNgheNghiepCLD", formatter: 'textarea', vertAlign: "middle", minWidth: 336, headerHozAlign: "center", hozAlign: "left" },
        { title: "Số lượng (người)", field: "TongSo", formatter: 'textarea', width: 200, vertAlign: "middle", headerHozAlign: "center", hozAlign: "right", editor: SoLuongNguoi },
        { title: "Trong đó nữ (Người)", field: "SoLuongNu", formatter: 'textarea', width: 200, vertAlign: "middle", headerHozAlign: "center", hozAlign: "right",editor: SoLuongLDNu },
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

async function LoadMauThongTinNhuCauTuyenDung(ID) {
    Grid_MaNghe_us.clearData();
    const GetAll = await NTS.getAjaxAsync("/QuanLy/ThuThapCauLaoDongBanDau/LayDuLieuMauTuyenDung", { id: ID });
    if (!GetAll.Err) {
        Grid_MaNghe_us.setData(GetAll.Result);
        Grid_MaNghe_us.redraw(1);
        $('#Grid_MaNghe_us .tabulator-page-size option:first-child').prop('selected', true);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

//function ChuyenModalBuoc1_us() {
//    $('#mdThemMoiThuThapCau_Buoc2_us').modal('hide');
//    $('#mdThemMoiThuThapCau_Buoc3_us').modal('hide');
//    $('#mdThemMoiThuThapCau_us').modal('show');
//}
//function ChuyenModalBuoc2_us() {
//    $('#mdThemMoiThuThapCau_Buoc2_us').modal('show');
//    $('#mdThemMoiThuThapCau_Buoc3_us').modal('hide');
//    $('#mdThemMoiThuThapCau_us').modal('hide');
//}
//function ChuyenModalBuoc3_us() {
//    $('#mdThemMoiThuThapCau_Buoc2_us').modal('hide');
//    $('#mdThemMoiThuThapCau_Buoc3_us').modal('show');
//    $('#mdThemMoiThuThapCau_us').modal('hide');
//}


//---------------------------------Bước kết thúc---------------------------------
// Lưu thông tin bước 3
$(document).on('click', '#btnKetThuc_us', function () {
    if ($('#txtDuongDanFileChuKy').value() == "") {
        NTS.canhbao("Đính kèm chữ ký không được bỏ trống!");
        return false;
    }

    if ($('#KyTen_us').value() == "") {
        NTS.canhbao("Người cung cấp thông tin không được bỏ trống!");
        return false;
    }

    getLocation();
    var data = uploadfileEvent({
        name: '#DinhKem_CauLD_us',///ID input type="file"
        loaiVB: 'VB',
    });
    if (data.length > 0) {
        $('#txtDinhKem_VanBan_US').value(data);
        NTS.dongthongbao();
    }
  
    var saveData = [];
    saveData[0] = tempthemBuoc2;
    saveData[1] = $('#CauLaoDongID').value();
    saveData[2] = $('#txtDinhKem_VanBan_US').value();
    saveData[3] = $('#txtDuongDanFileChuKy').value();
    saveData[4] = $('#KyTen_us').value();
    saveData[5] = $('#KinhDo').value();
    saveData[6] = $('#ViDo').value();
    var result = NTS.getAjax('/QuanLy/ThuThapCauLaoDongBanDau/LuuThongTinBuoc3', { data: saveData });
    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        $('#mdThemMoiThuThapCau_Buoc3_us').modal('hide');
        return false;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
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
        let result = NTS.getAjax('/DanhMuc/DungChung/LuuDinhKem_ChuKy', { ID: $('#CauLaoDongID').value(), bangDk: 'CauLaoDong', cotDk: 'CauLaoDongID', cotDinhKem: 'ChuKy', pathFile: data });
        if (!result.Err) {
            var path = result.Result.Table[0];
            let LuuFile = path.ChuKy;
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
            NTS.loi('Tải file không thành công!')
        }
    } else {
        NTS.loi('Tải file không thành công!');
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

    //xác định đang ở form nào
    if ($('#mdThemMoiThuThapCau_Buoc3_us').hasClass('show')) {
        id = $('#CauLaoDongID').value();
        bang = "CauLaoDong";
        cot = "CauLaoDongID";
        cotChuaFile = 'ChuKy';
    }
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

//---------------------------------Quay lại bước 2---------------------------------
$(document).on('click', '#btnQuayLaiBuoc2_us', function () {
    $('#mdThemMoiThuThapCau_Buoc3_us').modal('hide');
    $('#mdThemMoiThuThapCau_Buoc2_us').modal('show');
    capNhatbuoc = true; // true là trạng thái sữa cầu lao động
});

//---------------------------------Vẽ chữ ký---------------------------------
$(document).on('click', '#VeChuKy_us', function () {
    signaturePad.clear();
    showModalKyTen_us();
});

////-------------------Xuất dữ liệu cầu lao động------------------//

$(document).on('click', '.btnInMau02', function () {
    var ID = $(this).attr('data');
    XuatMau02_TT01(ID);
});

async function XuatMau02_TT01(ID) {
    var data = await NTS.getAjaxAsync('/QuanLy/ThuThapCauLaoDongBanDau/XuatMau02', { id: ID });
    //window.open(data);
    try {
        $('#divNoiDung_us').attr("src", data.replace(".docx", ".pdf"));
        $('#modal_xemtruockhiin_us').modal('show');
        $('#modal_taifile_us').show();
        $('#modal_taifile2_us').hide();
    } catch (ex) {

    }
}

//---------------------------------Xuất danh sách excel thông tin thu thập cung lao động biến động---------------------------------
$('#btnExport').on('click', async function () {
    var saveData = new Array();
    var saveData = new Array();
    saveData[0] = $('#TinhID_TimKiem_us').value();
    saveData[1] = $('#HuyenID_TimKiem_us').value();
    saveData[2] = $('#XaID_TimKiem_us').value();
    saveData[3] = $('#ThonID_TimKiem_us').value();
    saveData[4] = $('#timKiem').value();
    saveData[5] = $('#TuNgay_TimKiem_US').value();
    saveData[6] = $('#DenNgay_TimKiem_US').value();
    Grid1.clearData();
    var kq = await NTS.getAjax('/QuanLy/ThuThapCauLaoDongBanDau/XuatExcel_DSThuThapCauLaoDongBanDau', { data: saveData });
    if (!kq.Err) {
        window.open(kq);
    } else {
        NTS.loi(kq.Msg);
    }
});

