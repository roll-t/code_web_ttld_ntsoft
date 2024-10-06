$(function () {
    setActiveTab();
    LoadCombo(); 
    loadColor();
    $('#TinhID').on('change', function () {
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
            indexValue: 0,
            indexText: 2,
            textShowTatCa: '-Chọn-',
            showTatCa: !0
        });
    });
    $('#HuyenID').on('change', function () {
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
            indexValue: 0,
            indexText: 2,
            textShowTatCa: '-Chọn-',
            showTatCa: !0
        });
    });
    $('#XaID').on('change', function () {
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
    });
    $('#DangNgayBaoCao').select2({ width: '100%' });
    $('#DangNgayBaoCao').on('change', function () {
        if ($('#DangNgayBaoCao').value() == '1') {
            $('#NgayLapBaoCao1').attr('disabled', true);
            $('#NgayLapBaoCao2').attr('disabled', true);
        }
        if ($('#DangNgayBaoCao').value() == '2') {
            $('#NgayLapBaoCao1').attr('disabled', false);
            $('#NgayLapBaoCao2').attr('disabled', true);
        }
        if ($('#DangNgayBaoCao').value() == '3') {
            $('#NgayLapBaoCao1').attr('disabled', true);
            $('#NgayLapBaoCao2').attr('disabled', false);
            $('#NgayLapBaoCao2').value('ngày... tháng...năm...')
        }
        return false;
    });
    
    var Data = NTS.getAjax("/HeThong/ThietLapCauHinhHeThong/LayDuLieu", {})[0];
    if (Data != undefined) {
        $('#DonViCapTren').value(Data.DonViCapTren);
        $('#DonViBaoCao').value(Data.DonViBaoCao);
        $('#KyThay').value(Data.KyThay);
        $('#NguoiKT').value(Data.TenNguoiKT);
        $('#ChucDanhNguoiKT').value(Data.ChucDanhNguoiKT);
        $('#NguoiKy').value(Data.NguoiKy);
        $('#NguoiLap').value(Data.NguoiLap);
        $('#ChucDanhNguoiLap').value(Data.ChucDanhNguoiLap);
        $('#DiaDanh').value(Data.DiaDanh);

        $('#DangNgayBaoCao').value(Data.LoaiNgayLap);
        $('#NgayLapBaoCao1').value(Data.NgayLapBaoCao);
        $('#NgayLapBaoCao2').value(Data.NgayLapBaoCao2);
        $('#ChucDanhNguoiKy').value(Data.ChucDanhNguoiKy);

        $('#TinhID').value(Data.DiaBanHCID_Tinh);
        $('#HuyenID').value(Data.DiaBanHCID_Huyen);
        $('#XaID').value(Data.DiaBanHCID_Xa);
        $('#ThonID').value(Data.DiaBanHCID_Thon);
        debugger
        $('#ckKiemTraHoGiaDinh').value(Data.RangBuocHoGiaDinh);

    } else {
        var DataDV = NTS.getAjax("/HeThong/ThietLapCauHinhHeThong/LoadDuLieuDonVi", {});
        $('#DonViCapTren').value(DataDV.Result[0].TenDonVi_Cha);
        $('#DonViBaoCao').value(DataDV.Result[0].TenDonVi);
    }
    KiemTraLoaiNgayBC();
    ///////// PHÍM TẮT /////////
    $(document).on('keydown', function (e) {
        switch (e.keyCode) {
            case 120:
                $('#btnLuuVaDong').trigger('click');
                e.preventDefault();
                break;
        }
    });

});
//Coloris({
//    el: '.coloris',
//    swatches: [
//        '#264653',
//        '#2a9d8f',
//        '#e9c46a',
//        '#f4a261',
//        '#e76f51',
//        '#d62828',
//        '#023e8a',
//        '#0077b6',
//        '#0096c7',
//        '#00b4d8',
//        '#48cae4'
//    ]
//});

//Coloris.setInstance('.instance1', {
//    theme: 'pill',
//    themeMode: 'dark',
//    formatToggle: true,
//    closeButton: true,
//    clearButton: true,
//    swatches: [
//        '#067bc2',
//        '#84bcda',
//        '#80e377',
//        '#ecc30b',
//        '#f37748',
//        '#d56062'
//    ]
//});

//Coloris.setInstance('.instance2', { theme: 'polaroid' });

//Coloris.setInstance('.instance3', {
//    theme: 'polaroid',
//    swatchesOnly: true
//});

//$(document).ready(function () {
//    PhanQuyenComBoDiaBan('TinhID', 'HuyenID', 'XaID', 'ThonID');
//});


//load dữ liệu khi người dùng vào trang
function LoadCombo() {
   
    NTS.loadDataCombo({
        name: '#TinhID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCTinh_Combo',
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
        //indexDefault: 3,
    });
    NTS.loadDataCombo({
        name: '#HuyenID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
        //indexDefault: 3,
    });
    NTS.loadDataCombo({
        name: '#XaID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
        //indexDefault: 3,
    });
    NTS.loadDataCombo({
        name: '#ThonID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
        //indexDefault: 3,
    });
  
}

//lưu dữ liệu
function btnLuuDuLieu() {
    LuuThongTin();
    LuuThongTinColor();
    NTS.thanhcong('Cập nhật thông tin thành công!');
    return false;
};
function SetMacDinhThietLap() {
    $('#DonViCapTren').value('');
    $('#DonViBaoCao').value('');
    $('#ThuTruong').value('');
    $('#ChucDanhThuTruong').value('');
    $('#KeToan').value('');
    $('#ChucDanhKeToan').value('');
    $('#NguoiLap').value('');
    $('#ChucDanhNguoiLap').value('');
    $('#DiaDanh').value('');
    $('#DangNgayBaoCao').value('1');
    $('#NgayLapBaoCao1').value('');
    $('#NgayLapBaoCao2').value('');
    $('#TinhID').value('');
    $('#HuyenID').value('');
    $('#XaID').value('');
    $('#ThonID').value('');

    var PhanThu = [];
    PhanThu.push({ "tensukien": "them", "class": "btn-nts-them", "color": "" });
    PhanThu.push({ "tensukien": "sua", "class": "btn-nts-luu", "color": "" });
    PhanThu.push({ "tensukien": "xoa", "class": "btn-nts-dong", "color": "" });
    PhanThu.push({ "tensukien": "in", "class": "btn-nts-in", "color": "" });
    PhanThu.push({ "tensukien": "xuat", "class": "btn-nts-header", "color": "" });
    PhanThu.push({ "tensukien": "menu", "class": "nts-menu", "color": "" });
    PhanThu.push({ "tensukien": "modal", "class": "nts-modal", "color": "" });
    PhanThu.push({ "tensukien": "khac", "class": "nts-khac", "color": "" });
    var Mang = JSON.stringify(PhanThu);
    var result = NTS.getAjax('/HeThong/ThietLapCauHinhHeThong/LuuColor', { color: Mang });
    getColor();
    loadColor();    
    NTS.thanhcong('Thiết lập mặc định thành công');
}
function LuuThongTin() {
    var Mang = new Array();
    Mang[0] = $('#DonViCapTren').value();
    Mang[1] = $('#DonViBaoCao').value();
    Mang[2] = $('#KyThay').value();
    Mang[3] = $('#ChucDanhNguoiKy').value();
    Mang[4] = $('#NguoiKT').value();
    Mang[5] = $('#ChucDanhNguoiKT').value();
    Mang[6] = $('#NguoiLap').value();
    Mang[7] = $('#ChucDanhNguoiLap').value();
    Mang[8] = $('#DiaDanh').value();
    Mang[9] = $('#DangNgayBaoCao').value();
    Mang[10] = $('#NgayLapBaoCao1').value();
    Mang[11] = $('#NgayLapBaoCao2').value();
    Mang[12] = $('#TinhID').value();
    Mang[13] = $('#HuyenID').value();
    Mang[14] = $('#XaID').value();
    Mang[15] = $('#ThonID').value();
    Mang[16] = $('#NguoiKy').value();
    Mang[17] = 'Sua';    
    Mang[18] = $('#ckKiemTraHoGiaDinh').value();
    var result = NTS.getAjax('/HeThong/ThietLapCauHinhHeThong/LuuThongTinCauHinhHeThong', { _arrayT: Mang });
    if (result.split('_')[0] == "1") {
        //NTS.thanhcong(result.split('_')[1]);
        return false;
    }
    else if (result.split('_')[0] == "-1") {
        NTS.loi(result.result.split('_')[1]);
        return false;
    } else {
        NTS.loi(result);
        return false;
    }
}
function LuuThongTinColor() {
    var Mang = JSON.stringify(addJson());
    var result = NTS.getAjax('/HeThong/ThietLapCauHinhHeThong/LuuColor', { color: Mang });
    if (result.split('_')[0] == "1") {
        loadColor();
        return false;
    }
    else if (result.split('_')[0] == "-1") {
        NTS.loi(result.result.split('_')[1]);
        return false;
    } else {
        NTS.loi(result);
        return false;
    }
}
function KiemTraLoaiNgayBC() {
    if ($('#DangNgayBaoCao').value() == '1') {
        $('#NgayLapBaoCao1').attr('disabled', true);
        $('#NgayLapBaoCao2').attr('disabled', true);
    }
    if ($('#DangNgayBaoCao').value() == '2') {
        $('#NgayLapBaoCao1').attr('disabled', false);
        $('#NgayLapBaoCao2').attr('disabled', true);
    }
    if ($('#DangNgayBaoCao').value() == '3') {
        $('#NgayLapBaoCao1').attr('disabled', true);
        $('#NgayLapBaoCao2').attr('disabled', false);
        if ($('#NgayLapBaoCao2').value() != "" && $('#NgayLapBaoCao2').value() != null) {

        } else {
            $('#NgayLapBaoCao2').value('ngày... tháng...năm...')
        }
    }    
    return false;
}


function addJson() {
    var PhanThu = [];
    PhanThu.push({ "tensukien": "them", "class": "btn-nts-them", "color": $('#them_color').value()});
    PhanThu.push({ "tensukien": "sua", "class": "btn-nts-luu", "color": $('#luu_color').value() });
    PhanThu.push({ "tensukien": "xoa", "class": "btn-nts-dong", "color": $('#dong_color').value() });
    PhanThu.push({ "tensukien": "in", "class": "btn-nts-in", "color": $('#in_color').value() });
    PhanThu.push({ "tensukien": "xuat", "class": "btn-nts-header", "color": $('#header_color').value() });
    PhanThu.push({ "tensukien": "menu", "class": "nts-menu", "color": $('#menu_color').value() });
    PhanThu.push({ "tensukien": "modal", "class": "nts-modal", "color": $('#modal_color').value() });
    PhanThu.push({ "tensukien": "khac", "class": "nts-khac", "color": $('#khac_color').value() });
    return PhanThu;
}
function editJson() {
    for (var i = 0; i < PhanThu.length; i++) {
        PhanThu[i].id = "eee"
    }
}
function getColor() {
    var Data = NTS.getAjax("/HeThong/ThietLapCauHinhHeThong/LayDuLieu", {});
    var mauSac = Data[0].MauSacJson;
    var mauSac = JSON.parse(mauSac);
    if (mauSac != undefined) {
        CSS += `<style>`;
        for (let i = 0; i < mauSac.length; i++) {
            if (mauSac[i].class == 'nts-menu') {
                CSS += `
                                                    .nav-list > li > a:focus,.nav-list > li > .submenu li.open > a,.nav-list > li > .submenu li.open > a > .arrow,.nav-list > li.nts-menu > a, .nav-list > li > a:hover,  .nav-list > li.nts-menu > a > .arrow,.nav-list > li .submenu > li.nts-menu > a,.nav-list > li .submenu > li > a:hover, .nav-list > li .submenu > li.nts-menu > a > .arrow, .nav-list > li.open > a,.nav-list > li.open > a > .arrow  {
                                                        color:${mauSac[i].color} !important
                                                    }
                                                    .nav-list li.nts-menu > a:after {
                                                        border-right-color:${mauSac[i].color} !important
                                                    }
                                                       
`
            } else {
                CSS += `
                                                    .${mauSac[i].class}{
                                                        background:${mauSac[i].color} !important
                                                    }`
            }
        }
        CSS += `</style>`;
    }
    $("#asx").html(CSS)
    LuuThongTin();
    try {
        $('#color_input').value(result[0].MauSac == null ? "" : result[0].MauSac);
        document.getElementsByClassName("clr-field")[0].style.color = result[0].MauSac == null ? "transparent" : result[0].MauSac;
    } catch {

    }
}

function setActiveTab() {
    $('#user-profile-2 .nav-link').removeClass('active');
    $('#user-profile-2 #btnTab1_View').addClass('active');
    $('#user-profile-2 .tab-pane').removeClass('active');
    $('#user-profile-2 .tab-pane').removeClass('show');
    $('#Tab1_View').addClass('active');
    $('#Tab1_View').addClass('show');
}

function loadColor() {
    var Data = NTS.getAjax("/HeThong/ThietLapCauHinhHeThong/LayDuLieu", {});

    // Kiểm tra xem Data có dữ liệu và MauSacJson có tồn tại hay không
    if (Data && Data.length > 0 && Data[0].MauSacJson) {
        var mauSac = Data[0].MauSacJson;

        if (mauSac != null && mauSac != '') {
            mauSac = JSON.parse(mauSac);

            if (mauSac.length > 0) {
                $('#them_color').val(mauSac[0].color);
                document.getElementById('them_color').parentNode.style.color = (mauSac[0].color == null ? "transparent" : mauSac[0].color);
                $('#luu_color').val(mauSac[1].color);
                document.getElementById('luu_color').parentNode.style.color = (mauSac[1].color == null ? "transparent" : mauSac[1].color);
                $('#dong_color').val(mauSac[2].color);
                document.getElementById('dong_color').parentNode.style.color = (mauSac[2].color == null ? "transparent" : mauSac[2].color);
                $('#in_color').val(mauSac[3].color);
                document.getElementById('in_color').parentNode.style.color = (mauSac[3].color == null ? "transparent" : mauSac[3].color);
                $('#header_color').val(mauSac[4].color);
                document.getElementById('header_color').parentNode.style.color = (mauSac[4].color == null ? "transparent" : mauSac[4].color);
                $('#menu_color').val(mauSac[5].color);
                document.getElementById('menu_color').parentNode.style.color = (mauSac[5].color == null ? "transparent" : mauSac[5].color);
                $('#modal_color').val(mauSac[6].color);
                document.getElementById('modal_color').parentNode.style.color = (mauSac[6].color == null ? "transparent" : mauSac[6].color);
                $('#khac_color').val(mauSac[7].color);
                document.getElementById('khac_color').parentNode.style.color = (mauSac[7].color == null ? "transparent" : mauSac[7].color);

                var CSS = ``;
                if (mauSac != undefined) {
                    CSS += `<style>`;
                    for (let i = 0; i < mauSac.length; i++) {
                        if (mauSac[i].class == 'nts-menu') {
                            CSS += `
                                .nav-list > li > .submenu li.open > a,.nav-list > li > .submenu li.open > a > .arrow,.nav-list > li.nts-menu > a, .nav-list > li > a:hover, .nav-list > li > a:focus,  .nav-list > li.nts-menu > a > .arrow,.nav-list > li .submenu > li.nts-menu > a,.nav-list > li .submenu > li > a:hover, .nav-list > li .submenu > li.nts-menu > a > .arrow, .nav-list > li.open > a,.nav-list > li.open > a > .arrow  {
                                    color:${mauSac[i].color} !important
                                }
                                .nav-list li.nts-menu > a:after {
                                    border-right-color:${mauSac[i].color} !important
                                }
                            `;
                        } else {
                            CSS += `
                                .${mauSac[i].class}{
                                    background:${mauSac[i].color} !important
                                }`;
                        }
                    }
                    CSS += `</style>`;
                }
                $("#asx").html(CSS);
            }
        }
    } else {
        console.log("No color data available or failed to fetch data.");
    }
}