$(document).ready(function () {
    ChiTietNhaTuyenDung();
    LoadDanhSachTuyenDung();
    TrangThaiXacThucCty();
    SoluongTinTuyenDung();
});
var anhDefault = '/Images/banner.jpg';

function ChiTietNhaTuyenDung() {
    debugger
    var url_string = window.location;
    var url = new URL(url_string);
    var ma = url.searchParams.get("p");
    var decodedString = ma;
    var GetAll = NTS.getAjax("/CongThongTinViecLam/TraCuuNhaTuyenDung/GetNhaTuyenDungTheoID", { ma: decodedString });
    if (GetAll.length > 0) {
        let data = GetAll[0];
        $('#tieudetrang,#header-TenCongTy').text(data.TenNhaTuyenDung);
        if ((data.Website) == '' || (data.Website) == null) {
            $('.header-website-link').text('Chưa có dữ liệu');
            $('.header-website-link').attr('href', '#');
        } else {
            $('.header-website-link').text((data.Website));
            $('.header-website-link').attr('href', (data.Website));
        }
        $('#header-quymo').html(isNullOrEmptyOrWhitespace(data.QuyMoLaoDong) ? "Chưa có dữ liệu" : "Quy mô: " + data.QuyMoLaoDong);
        $('#GioiThieu').html(isNullOrEmptyOrWhitespace(data.GioiThieuCongTy) ? "Chưa có dữ liệu" : data.GioiThieuCongTy);
        $('#bg-img').attr('src', isNullOrEmptyOrWhitespace(data.Banner) ? anhDefault : data.Banner.replaceAll("~", "").replaceAll("*", "") == "" ? anhDefault : data.Banner.replaceAll("~", "").replaceAll("*", ""));
        $('#img-logo').attr('src', isNullOrEmptyOrWhitespace(data.Logo) ? anhDefault : data.Logo.replaceAll("~", "").replaceAll("*", "") == "" ? anhDefault : data.Logo.replaceAll("~", "").replaceAll("*", ""));
        $('#contact-diachi').html(isNullOrEmptyOrWhitespace(data.DiaChi) ? "Chưa có dữ liệu" : data.DiaChi);
        $('#contact-sodienthoai').html(isNullOrEmptyOrWhitespace(data.SoDienThoai) ? "Chưa có dữ liệu" : data.SoDienThoai);
        $('#contact-email').html(isNullOrEmptyOrWhitespace(data.Email) ? "Chưa có dữ liệu" : data.Email);
        $('#header-nganhnghe').html(checkNullString(data.NganhNghe) == ';' ? "Chưa có dữ liệu" : data.NganhNghe);
        $('#header-soluongtheodoi').html(SoluongTheoDoiNTD(data.NhaTuyenDungCTTID) + " lượt theo dõi");
        $('#btn-share-face').attr('data-href', $(location).attr('href'))
        $('#thongtinheaderchiase').attr('data-id', $(location).attr('href'));

        let resultLuuTru = KiemTraLuuTruNhaTuyenDung(data.NhaTuyenDungCTTID);
        if (resultLuuTru == "1") {
            $('.btn-theodoi').html(`<i class="fa-solid fa-bookmark btn-DaLuuTin"></i>&nbsp;Đã theo dõi`)
        } else {
            $('.btn-theodoi').html(`<i class="fa-regular fa-bookmark"></i>&nbsp;Theo dõi`)
        }
        if (data.UrlViTri != null && data.UrlViTri != '' && data.UrlViTri.toString().includes('iframe')) {
            $('#iframe').html(data.UrlViTri);
        } else {
            $('#iframe').html(`<div>Chưa có thông tin</div>`);
        }
        var HinhAnhCTy = data.HinhAnh;
        if (HinhAnhCTy.length > 0) {
            var arrHinhAnh = HinhAnhCTy.split('*');
            for (var i = 0; i < arrHinhAnh.length; i++) {
                if (arrHinhAnh[i] != '') {
                    $('#HinhAnhHoatDong').append(`<div class="col-lg-4 col-xl-3 mt-3">
                                            <div class="images-inner">
                                                <a target="_blank" href="${arrHinhAnh[i].replace('~', '')}" data-fancybox="company-gallery" class="fancybox" style="background-image: url('${arrHinhAnh[i].replace('~', '')}')"></a>
                                            </div>
                                        </div>`)
                }

            }
        } else {
            $('#HinhAnhHoatDong').append(`<div style="text-align:center;">
                        <img src="/Images/CongThongTinViecLam/vanban-empty.jpg" class="" id="vanban-empty">
                        <p style="color: #7f7d7d;">Chưa có hình ảnh hoạt động</p>
                    </div>`);
        }
        console.log(HinhAnhCTy);
    }
}

function decodeURL(rot13URL) {
    // Áp dụng ROT13 lên chuỗi đã mã hóa
    var decodedURL = '';
    for (var i = 0; i < rot13URL.length; i++) {
        var charCode = rot13URL.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            decodedURL += String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            decodedURL += String.fromCharCode(((charCode - 97 + 13) % 26) + 97);
        } else {
            decodedURL += rot13URL.charAt(i);
        }
    }

    // Giải mã URL bằng Base64
    var decodedURL = atob(decodedURL);

    // Trả về URL đã được giải mã
    return decodedURL;
}

// Hàm mã hóa URL bằng Base64 và ROT13
function encodeURL(url) {
    // Mã hóa URL sang Base64
    var encodedURL = btoa(url);

    // Áp dụng ROT13 lên URL đã mã hóa
    var rot13URL = '';
    for (var i = 0; i < encodedURL.length; i++) {
        var charCode = encodedURL.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            rot13URL += String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            rot13URL += String.fromCharCode(((charCode - 97 + 13) % 26) + 97);
        } else {
            rot13URL += encodedURL.charAt(i);
        }
    }

    // Trả về URL đã được mã hóa
    return rot13URL;
}

$('#TenCongTy_loc').keypress(async function (e) {
    if (e.which === 13) { // Kiểm tra mã phím, 13 là mã phím cho phím Enter
        await LoadDanhSachTuyenDung();
    }
});
$(document).on('click', '#btnTraCuu', async function () {
    LoadDanhSachTuyenDung();
})
function LoadDanhSachTuyenDung() {
    var url_string = window.location;
    var url = new URL(url_string);
    var ma = url.searchParams.get("p");
    var decodedString = ma;

    $('#list-congviec').html('');
    $('#content_pagination').html('');
    var mang = new Array();
    mang[0] = decodedString
    mang[1] = $('#TenCongTy_loc').value();

    let GetAll = NTS.getAjax("/CongThongTinViecLam/ChiTietNhaTuyenDung/GetCongViecDangTuyenDung", { data: mang });
    if (GetAll && GetAll.length > 0) { // Kiểm tra GetAll có tồn tại và không rỗng
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            // Mã hóa URL bằng Base64 và ROT13
            var encodedURL = encodeURL(data.TinTuyenDungID);
            $('#list-congviec').append(`
                        <div class="job-list_item ">
                            <div class="row row-10 align-items-center">
                                <div class="col-md-9">
                                    <h3 class="list-item_name fs-inherit mb-0">
                                        <a href="/xem-chi-tiet-viec-lam/${data.DinhDanh}.html?p=${data.MaViecTimNguoi}" class="size-095rem fw-700 text-ellipsis d-inline-block tdAjax" data-type="td"  title="" data-toggle="tooltip" data-original-title="${data.ViTriTuyenDung}">
                                            ${data.ViTriTuyenDung}
                                        </a>
                                    </h3>
                                    <div class="list-item_desc size-095rem mt-2">
                                        <div class="row row-10">
                                            <div class="col-md-4">
                                                <div class="desc-item text-ellipsis vertical-middle" data-toggle="tooltip" title="" data-original-title="Mức lương: ${checkNullString(data.MucLuongID)}" style="display: flex; gap: 3px; align-items: center;">
                                                    <svg style="font-size: 16px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-coin size-095rem blue-color" viewBox="0 0 16 16">
                                                        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                        <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                                    </svg>
                                                   ${checkNullString(data.MucLuongID)}
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="desc-item text-ellipsis vertical-middle" data-toggle="tooltip" title="" data-original-title="Hạn nộp: ${data.HanNop}">
                                                    <i class="fa-regular fa-clock blue-color size-095rem"></i>
                                                    ${data.HanNop}
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="desc-item text-ellipsis vertical-middle" data-toggle="tooltip" title="" data-original-title="${checkNullString(data.TenDiaDiem)}">
                                                    <i class="fa-solid fa-location-dot blue-color size-095rem"></i>
                                                    ${checkNullString(data.TenDiaDiem)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="list-item_button text-right">
                                        <a class="btn-ungtuyen ${KiemTraUngTuyen(data.TinTuyenDungID) == `1` ? `btn-DaUngTuyen` : ``} btn button-theme button-basic rounded-0 callNopHoSo" data-id="${data.TinTuyenDungID}"  data-hinhthuc-nophs="1">
                                            <i class="far fa-paper-plane mr-1" aria-hidden="true"></i>
                                            ${KiemTraUngTuyen(data.TinTuyenDungID) == `1` ? `Đã ứng tuyển` : `Ứng tuyển ngay`}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
            //$('#list-congviec').append(`
            //    <div class="congviec-item">                   
            //        <div class="congviec-content">
            //            <div class="congviec-header">
            //                <div style="width:100%;">
            //                    <a href="/xem-chi-tiet-viec-lam.html?p=${encodedURL}" class="congviec-title" title="${data.ViTriTuyenDung}">${data.ViTriTuyenDung} </a>
            //                </div>
            //                <div>
            //                    <i class="${KiemTraLuuTruViecLam(data.TinTuyenDungID) == `1` ? `fa-solid btn-DaLuuTin` : `fa-regular`}  fa-heart btn-luutru" data-id="${data.TinTuyenDungID}"></i>
            //                </div>
            //            </div>
            //            <div class="congviec-info">
            //                <div style="" class="box-content-itemvieclam">
            //                        <span class="congviec-info-label" title="${checkNullString(data.TenDiaDiem)}"><i class="fa-solid fa-location-dot" style="color:#71889b;"></i>&nbsp; <span>${checkNullString(data.TenDiaDiem)}</span></span>
            //                        <div class="item-hannop-mucluong">
            //                            <span class="item-hannop-mucluong-mucluong"><i class="fa-solid fa-money-bill"></i>&nbsp; <span>${checkNullString(data.MucLuongID)}</span></span>
            //                            <span class="item-hannop-mucluong-hannop"><i class="fa-solid fa-calendar-days"></i>&nbsp; <span>Hạn nộp: ${data.HanNop}</span></span>
            //                        </div>
            //                </div>
            //                <div>
            //                    <span class="btn-ungtuyen ${KiemTraUngTuyen(data.TinTuyenDungID) == `1` ? `btn-DaUngTuyen` : ``} btn-primary" data-id="${data.TinTuyenDungID}">${KiemTraUngTuyen(data.TinTuyenDungID) == `1` ? `Đã ứng tuyển` : `Ứng tuyển ngay`}</span>
            //                </div>
            //            </div>
            //        </div>
            //    </div>
            //`);
        }
    }
    else {
        $('#list-congviec').append(`
            <div style="text-align:center;">
                <img src="/Images/CongThongTinViecLam/vanban-empty.jpg" class="" id="vanban-empty"/>
                <p style="color: #7f7d7d;">Chưa có tin tuyển dụng</p>
            </div>
        `);
    }
}




$(document).on('click', '.btn-ungtuyen', function () {
    let resultKT = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/KiemTraDangNhap", {});
    if (resultKT == "2") {
        NTS.canhbao("Vui lòng đăng nhập để thực hiện thao tác!");
        return false;
    }
    //kiểm tra đã có đăng nhập chưa
    let TinTuyenDungID = $(this).attr('data-id');
    let result = UngTuyenViecLam(TinTuyenDungID);
    if (result == "1") {

        let resultTrangThai = KiemTraUngTuyen(TinTuyenDungID);
        if (resultTrangThai == "1") {
            $(this).addClass('btn-DaUngTuyen')
            $(this).html(`<i class="far fa-paper-plane mr-1" aria-hidden="true"></i> Đã ứng tuyển`)
            NTS.thanhcong("Ứng tuyển thành công!")
        } else {
            $(this).removeClass('btn-DaUngTuyen')
            $(this).html(`<i class="far fa-paper-plane mr-1" aria-hidden="true"></i> Ứng tuyển`)
            NTS.thanhcong("Bỏ ứng tuyển thành công!")
        }

    } else if (result == "2") {
        NTS.canhbao("Vui lòng đăng nhập để thực hiện thao tác!");
        return false;
    } else if (result == "3") {
        NTS.canhbao("User của bạn không thể thực hiện thao tác này!");
        return false;
    } else {
        NTS.loi("Có lỗi xảy ra!");
        return false;
    }
})

$(document).on('click', '.btn-luutru', function () {
    let resultKT = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/KiemTraDangNhap", {});
    if (resultKT == "2") {
        NTS.canhbao("Vui lòng đăng nhập để thực hiện thao tác!");
        return false;
    }
    //kiểm tra đã có đăng nhập chưa
    let TinTuyenDungID = $(this).attr('data-id');
    let result = LuuTruViecLam(TinTuyenDungID);
    if (result == "1") {

        let resultTrangThai = KiemTraLuuTruViecLam(TinTuyenDungID);
        if (resultTrangThai == "1") {
            $(this).addClass('btn-DaLuuTin')
            $(this).addClass('fa-solid')
            $(this).removeClass('fa-regular')
            NTS.thanhcong("Lưu tin tuyển dụng thành công!")

        } else {
            $(this).removeClass('btn-DaLuuTin')
            $(this).removeClass('fa-solid')
            $(this).addClass('fa-regular')
            NTS.thanhcong("Bỏ lưu tin tuyển dụng thành công!")
        }

    } else if (result == "2") {
        NTS.canhbao("Vui lòng đăng nhập để thực hiện thao tác!");
        return false;
    } else if (result == "3") {
        NTS.canhbao("User của bạn không thể thực hiện thao tác này!");
        return false;
    } else {
        NTS.loi("Có lỗi xảy ra!");
        return false;
    }
})
//Theo doi nha tuyen dung
$(document).on('click', '.btn-theodoi', function () {
    debugger
    let resultKT = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/KiemTraDangNhap", {});
    if (resultKT == "2") {
        NTS.canhbao("Vui lòng đăng nhập để thực hiện thao tác!");
        return false;
    }
    var url_string = window.location;
    var url = new URL(url_string);
    var ma = url.searchParams.get("p");
    var decodedString = ma;
    var nhaTuyenDungID;
    //kiểm tra đã có đăng nhập chưa
    let resultnhatuyendungID = NTS.getAjax("/CongThongTinViecLam/ChiTietNhaTuyenDung/LayIDNhaTuyenDung", { ma: decodedString });
    if (resultnhatuyendungID != "") {
        nhaTuyenDungID = resultnhatuyendungID[0].NhaTuyenDungID;
    }
    let result = LuuTruNhaTuyenDung(nhaTuyenDungID);
    if (result == "1") {

        let resultTrangThai = KiemTraLuuTruNhaTuyenDung(nhaTuyenDungID);
        if (resultTrangThai == "1") {
            $(this).html(`<i class="fa-solid fa-bookmark btn-DaLuuTin"></i>&nbsp;Đã theo dõi`);
            NTS.thanhcong("Theo dõi nhà tuyển dụng thành công!")

        } else {
            $(this).html(`<i class="fa-regular fa-bookmark"></i>&nbsp;Theo dõi`)
            NTS.thanhcong("Bỏ theo dõi nhà tuyển dụng thành công!")
        }

    } else if (result == "2") {
        NTS.canhbao("Vui lòng đăng nhập để thực hiện thao tác!");
        return false;
    } else if (result == "3") {
        NTS.canhbao("User của bạn không thể thực hiện thao tác này!");
        return false;
    } else {
        NTS.loi("Có lỗi xảy ra!");
        return false;
    }
})


function TrangThaiXacThucCty() {
    var url_string = window.location;
    var url = new URL(url_string);
    var ma = url.searchParams.get("p");
    var decodedString = ma;
    var GetAll = NTS.getAjax("/CongThongTinViecLam/ChiTietNhaTuyenDung/GetTrangThaiNhaTuyenDung", { ma: decodedString });
    if (GetAll.length > 0) {
        let data = GetAll[0];
        if (data.TrangThaiDuyet == '3') {
            $('#logo-img_xacthuc').css({ "display": "block" });
        } else {
            $('#logo-img_xacthuc').css({ "display": "none" });
        }
    }
}

function SoluongTinTuyenDung() {
    var url_string = window.location;
    var url = new URL(url_string);
    var ma = url.searchParams.get("p");
    var decodedString = ma;
    var GetAll = NTS.getAjax("/CongThongTinViecLam/ChiTietNhaTuyenDung/GetSoLuongNhaTuyenDung", { ma: decodedString });
    if (GetAll.length > 0) {
        let data = GetAll[0];
        return $('#header-soluongtintuyendung').html(`${data.soluongTinTuyenDung}` + " tin tuyển dụng");
    }
}
function copyToClipboard(element) {
    var dataId = $(element).data("id");

    // Tạo một input ảo để sao chép vào clipboard
    var $tempInput = $("<input>");
    $("body").append($tempInput);
    $tempInput.val(dataId).select();
    document.execCommand("copy");
    $tempInput.remove();

    NTS.thanhcong("Sao chép liên kết thành công!");
}

$(document).ready(function () {
    var currentIndex = -1;
    var images = $(".fancybox");

    images.click(function (e) {
        e.preventDefault();
        currentIndex = images.index(this);
        showImage(currentIndex);
    });

    function showImage(index) {
        var src = images.eq(index).attr("href");
        $("#modalImage").attr("src", src);
        $("#imageModal").css("display", "flex");
    }

    $("#prevImage").click(function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    });

    $("#nextImage").click(function () {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });

    $(".close").click(function () {
        $("#imageModal").css("display", "none");
    });

    $(window).click(function (e) {
        if ($(e.target).is("#imageModal")) {
            $("#imageModal").css("display", "none");
        }
    });
});
function SoluongTheoDoiNTD(ID) {
    var GetAll = NTS.getAjax("/CongThongTinViecLam/ChiTietNhaTuyenDung/GetSoLuongTheoDoiNhaTuyenDung", { id: ID });
    if (GetAll.length > 0) {
        let data = GetAll[0];
        return data.SoLuongTheoDoiNTD;
    }
}