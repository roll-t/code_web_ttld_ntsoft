$(function () {
    CongTyMoi();
    BannerCongTy();
    LoadTinMoiNhat();
    DanhSachUngVien();
    LoadLuongCao();
    //NhaTuyenDung();
    TinTuc_TrangChu();
    LoadCamNangNgheNghiepNew();
    WebSiteLienKet();
    LoadCarousel();
    LoadCarousel3D();
    $('#ViecLam_Loc_us').css({"border-radius":"20px !important"})
});

$(document).ready(function () {
    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function updateJobCounts() {
        var SoLuongBuonBan = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetSoLuongViecLam_NgheNghiep", { ma: "G" }).Result;
        var SoLuongDichVuLuuTru = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetSoLuongViecLam_NgheNghiep", { ma: "I" }).Result;
        var SoLuongThongTinTruyenThong = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetSoLuongViecLam_NgheNghiep", { ma: "J" }).Result;
        var SoLuongXayDung = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetSoLuongViecLam_NgheNghiep", { ma: "F" }).Result;
        var SoLuongCongNghiepCheBien = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetSoLuongViecLam_NgheNghiep", { ma: "C" }).Result;
        var SoLuongGiaoDuc = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetSoLuongViecLam_NgheNghiep", { ma: "P" }).Result;
        var SoLuongHDDichVu = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetSoLuongViecLam_NgheNghiep", { ma: "S" }).Result;
        var SoLuongNongNghiep = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetSoLuongViecLam_NgheNghiep", { ma: "A" }).Result;

        $('#Soluong_Vieclam-NgheNghiep-buonban').text(formatNumberWithCommas(SoLuongBuonBan));
        $('#Soluong_Vieclam-NgheNghiep-buonban').attr("title",formatNumberWithCommas(SoLuongBuonBan));
        $('#Soluong_Vieclam-NgheNghiep-dichvu').text(formatNumberWithCommas(SoLuongDichVuLuuTru));
        $('#Soluong_Vieclam-NgheNghiep-dichvu').attr("title",formatNumberWithCommas(SoLuongDichVuLuuTru));
        $('#Soluong_Vieclam-NgheNghiep-TruyenThong').text(formatNumberWithCommas(SoLuongThongTinTruyenThong));
        $('#Soluong_Vieclam-NgheNghiep-TruyenThong').attr("title",formatNumberWithCommas(SoLuongThongTinTruyenThong));
        $('#Soluong_Vieclam-NgheNghiep-XayDung').text(formatNumberWithCommas(SoLuongXayDung));
        $('#Soluong_Vieclam-NgheNghiep-XayDung').attr("title",formatNumberWithCommas(SoLuongXayDung));
        $('#Soluong_Vieclam-NgheNghiep-NongLam').text(formatNumberWithCommas(SoLuongNongNghiep));
        $('#Soluong_Vieclam-NgheNghiep-NongLam').attr("title",formatNumberWithCommas(SoLuongNongNghiep));
        $('#Soluong_Vieclam-NgheNghiep-CongNghiep').text(formatNumberWithCommas(SoLuongCongNghiepCheBien));
        $('#Soluong_Vieclam-NgheNghiep-CongNghiep').attr("title",formatNumberWithCommas(SoLuongCongNghiepCheBien));
        $('#Soluong_Vieclam-NgheNghiep-GiaoDuc').text(formatNumberWithCommas(SoLuongGiaoDuc));
        $('#Soluong_Vieclam-NgheNghiep-GiaoDuc').attr("title",formatNumberWithCommas(SoLuongGiaoDuc));
        $('#Soluong_Vieclam-NgheNghiep-HDDichVu').text(formatNumberWithCommas(SoLuongHDDichVu));
        $('#Soluong_Vieclam-NgheNghiep-HDDichVu').attr("title",formatNumberWithCommas(SoLuongHDDichVu));
    }
    // Gọi hàm ngay khi trang được tải lần đầu tiên
    updateJobCounts();

});


var textKhongCoDuLieu = `<h5 style='width: 100%; font-size: 20px; text-align: center; text-transform: uppercase;font-weight: bold;padding: 10px 0'>Không có dữ liệu</h5>`
//Load tin mới nhất 
function LoadTinMoiNhat() {
    var result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetTinTuyenDung_MoiNhat", {});
    if (result.length > 0) {
        let item = ``;
        for (var i = 0; i < result.length; i++) {
            let data = result[i];
            var encodedURL = encodeURL(data.TinTuyenDungID);

            // Split the DiaDiemLamViec by semicolon and check the number of locations
            var locations = data.DiaDiemLamViec.split(';').map(location => location.trim()).filter(location => location !== '');

            // If only one location, display it without semicolon; if multiple, join them with semicolon
            var displayedLocation = locations.length > 1 ? locations.join('; ') : locations[0];

            item += `<div class="item" data-aos="fade-down" data-aos-duration="800">
                            <div class="right_item">
                                <div class="absolute" style="right: 10px;">
                                    <i class="${KiemTraLuuTruViecLam(data.TinTuyenDungID) == `1` ? `fa-solid btn-DaLuuTin` : `fa-regular`}  fa-heart btn-luutru-nhatuyendung" data-id="${data.TinTuyenDungID}"></i>
                                </div>
                                <a href="/xem-chi-tiet-viec-lam/${data.DinhDanh}.html?p=${data.MaViecTimNguoi}" target="_blank" rel="nofollow">
                                    <h3 title="${data.ViTriTuyenDung}" class="title_new hot" style="width: 90% !important;">${data.ViTriTuyenDung}</h3>
                                </a>
                                <div class="mt-3 row">
                                    <div class="col-md-3 col-xs-3 col-sm-3" style="padding-right:0px;display: flex;justify-content: center;">
                                        <a class="logo mb-3">
                                            <img src="${replaceImg(data.LogoCongTy)}" class="lazyload" alt="${data.TenNhaTuyenDung}" style='height: 60px;'>
                                        </a>
                                    </div>
                                    <div class="col-md-9 col-xs-9 col-sm-9">
                                        <a class="tennhatuyendungluongcao-trangchu" title="${data.TenNhaTuyenDung}" href="/xem-chi-tiet-nha-tuyen-dung/${data.DinhDanhNTD}.html?p=${data.MaNhaTuyenDung}">${data.TenNhaTuyenDung}</a>
                                        <p title="${displayedLocation}" class="diadiemlamviec-viecmoi-trangchu">
                                            <i class="fa-solid fa-location-dot"></i>
                                            ${displayedLocation}
                                        </p>
                                        <p class="diadiemlamviec-viecmoi-trangchu">
                                            <div class="exp-item mb-1 Box-chucvu-mucluong-htlv">
                                                ${isNullOrEmptyOrWhitespace(data.TenCapBac) ? '' : '<a href="/xem-chi-tiet-viec-lam/' + data.DinhDanh + '.html?p=' + data.MaViecTimNguoi +'">' + data.TenCapBac + '</a>'}
                                                ${isNullOrEmptyOrWhitespace(data.TenYeuCauKinhNghiem) ? '' : '<a href="/xem-chi-tiet-viec-lam/' + data.DinhDanh + '.html?p=' + data.MaViecTimNguoi +'">' + data.TenYeuCauKinhNghiem + '</a>'}
                                                ${isNullOrEmptyOrWhitespace(data.TenHinhThucLamViec) ? '' : '<a title="' + data.TenHinhThucLamViec + '" class="hinhthuclamviec_vieclammoi"  href="/xem-chi-tiet-viec-lam/' + data.DinhDanh + '.html?p=' + data.MaViecTimNguoi +'">' + data.TenHinhThucLamViec + '</a>'}
                                            </div>
                                        </p>
                                    </div>
                                </div>
                               
                                <hr class="padding-item" />
                                <div class="footer-item">
                                    <div class="ft-box-left">
                                        <label class="new-item">MỚI</label>
                                        <p class="p_time p_time_ngaydangtuyen">Ngày đăng tuyển dụng: ${data.NgayDang}</p>
                                    </div>
                                    <div class="ft-box-right">
                                        <p class="p_salary box-mucluongthoathuan" title=" ${data.TenMucLuong}"><i class="fa-solid fa-coins"></i> ${data.TenMucLuong}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        }
        $('#list-new-job').append(item);
    } else {
        $('#list-new-job').append(textKhongCoDuLieu);
    }
}


function LoadLuongCao() {
    var result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetTinTuyenDung_LuongCao", {});
    if (result.length > 0) {
        let item = ``;
        for (var i = 0; i < result.length; i++) {
            let data = result[i];
            var encodedURL = encodeURL(data.TinTuyenDungID);

            // Split the DiaDiemLamViec by semicolon and check the number of locations
            var locations = data.DiaDiemLamViec.split(';').map(location => location.trim()).filter(location => location !== '');

            // If only one location, display it without semicolon; if multiple, join them with semicolon
            var displayedLocation = locations.length > 1 ? locations.join('; ') : locations[0];

            item += `<div class="item" data-aos="fade-down" data-aos-duration="800">
                            <div class="right_item">
                                <div class="absolute" style="right: 10px;">
                                    <i class="${KiemTraLuuTruViecLam(data.TinTuyenDungID) == `1` ? `fa-solid btn-DaLuuTin` : `fa-regular`}  fa-heart btn-luutru-nhatuyendung" data-id="${data.TinTuyenDungID}"></i>
                                </div>
                                <a href="/xem-chi-tiet-viec-lam/${data.DinhDanh}.html?p=${data.MaViecTimNguoi}" target="_blank" rel="nofollow">
                                    <h3 title="${data.ViTriTuyenDung}" class="title_new hot" style="width: 90% !important;">${data.ViTriTuyenDung}</h3>
                                </a>
                                <div class="mt-3 row">
                                    <div class="col-md-3 col-xs-3 col-sm-3" style="padding-right:0px;display: flex;justify-content: center;">
                                        <a class="logo mb-3">
                                            <img src="${replaceImg(data.LogoCongTy)}" class="lazyload" alt="${data.TenNhaTuyenDung}" style='height: 60px;'>
                                        </a>
                                    </div>
                                    <div class="col-md-9 col-xs-9 col-sm-9">
                                        <a class="tennhatuyendungluongcao-trangchu" title="${data.TenNhaTuyenDung}" href="/xem-chi-tiet-nha-tuyen-dung/${data.DinhDanhNTD}.html?p=${data.MaNhaTuyenDung}">${data.TenNhaTuyenDung}</a>
                                        <p title="${displayedLocation}" class="diadiemlamviec-viecmoi-trangchu">
                                            <i class="fa-solid fa-location-dot"></i>
                                            ${displayedLocation}
                                        </p>
                                        <p class="diadiemlamviec-viecmoi-trangchu">
                                            <div class="exp-item mb-1 Box-chucvu-mucluong-htlv">
                                                ${isNullOrEmptyOrWhitespace(data.TenCapBac) ? '' : '<a href="/xem-chi-tiet-viec-lam/' + data.DinhDanh + '.html?p=' + data.MaViecTimNguoi +'">' + data.TenCapBac + '</a>'}
                                                ${isNullOrEmptyOrWhitespace(data.TenYeuCauKinhNghiem) ? '' : '<a href="/xem-chi-tiet-viec-lam/' + data.DinhDanh + '.html?p=' + data.MaViecTimNguoi +'">' + data.TenYeuCauKinhNghiem + '</a>'}
                                                ${isNullOrEmptyOrWhitespace(data.TenHinhThucLamViec) ? '' : '<a title="' + data.TenHinhThucLamViec + '" class="hinhthuclamviec_vieclammoi"  href="/xem-chi-tiet-viec-lam/'+data.DinhDanh+'.html?p='+data.MaViecTimNguoi+'">' + data.TenHinhThucLamViec + '</a>'}
                                            </div>
                                        </p>
                                    </div>
                                </div>
                               
                                <hr class="padding-item" />
                                <div class="footer-item">
                                    <div class="ft-box-left">
                                        <p class="p_time p_time_ngaydangtuyen">Ngày đăng tuyển dụng: ${data.NgayDang}</p>
                                    </div>
                                    <div class="ft-box-right">
                                        <p class="p_salary box-mucluongthoathuan" itle=" ${data.TenMucLuong}"><i class="fa-solid fa-coins"></i> ${data.TenMucLuong}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        }
        $('#list-high-salary').append(item);
    } else {
        $('#list-high-salary').append(textKhongCoDuLieu);
    }
}

//Load nha tuyen dung ngau nhien
var anhDefault = '/Images/banner.jpg';
function NhaTuyenDung() {

    var result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetRand_NhaTuyenDung", {});
    if (result.length > 0) {
        let item = ``;
        for (var i = 0; i < result.length; i++) {
            let data = result[i];
            var encodedURL = encodeURL(data.NhaTuyenDungCTTID);
            item += `<div class="top-employ--item box-shadow-6">
                                <div class="top-employ__image top-employ__image_congty">
                                    <a href="/xem-chi-tiet-nha-tuyen-dung/${data.DinhDanh}.html?p=${data.MaNhaTuyenDung}" title="${data.TenNhaTuyenDung}" target="_blank">
                                        <img alt="${data.TenNganhNghe}" class="lazy entered loaded img-employ" src="${isNullOrEmptyOrWhitespace(data.Logo) ? anhDefault : data.Logo.replaceAll("~", "").replaceAll("*", "") == "" ? anhDefault : data.Logo.replaceAll("~", "").replaceAll("*", "") }">
                                    </a>
                                </div>
                                <h3 class="top-employ__name line-clamp-2">
                                    <a href="/xem-chi-tiet-nha-tuyen-dung/${data.DinhDanh}.html?p=${data.MaNhaTuyenDung}" title="${data.TenNhaTuyenDung}" target="_blank">
                                       ${data.TenNhaTuyenDung}
                                    </a>
                                </h3>
                                <p class="top-employ__caption" style="    width: 100%;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    overflow: hidden;">
                                    <i class="fa-solid fa-location-dot"></i>  ${data.DiaChi}
                                </p>
                            </div>`;
        }
        $('#box-employ').append(item);
    } else {
        $('#box-employ').append(textKhongCoDuLieu);
    }
}

function TinTuc_TrangChu() {
    var result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetTinTuc_TrangChuCTT", {});
    if (result.length > 0) {
        let item = ``;
        let ItemMain = '';

        for (var i = 0; i < result.length; i++) {
            let data = result[i];
            let encodedURL = encodeURL(data.TinTucID);
            if (i == 0) {
                ItemMain = `<div class="col-md-4" data-aos="fade-right" data-aos-duration="1000">
                                <img class="news-img" src="${replaceImg(data.HinhAnh)}" alt="${data.TieuDe}" />
                            </div>
                            <div class="col-md-8" data-aos="fade-right">
                                <button class="btn btn-warning"><a href="/tra-cuu-tin-tuc.html" style="color: white;">Tin mới</a></button>
                                <div class="news-title"><a href="/xem-chi-tiet-tin-tuc.html?ma=${encodedURL}">${data.TieuDe}</a></div>
                                <div class="news-describe">${data.NoiDungTomTat}</div>
                                <div class="news-countinue  mt-5">
                                    <a href="/xem-chi-tiet-tin-tuc.html?ma=${encodedURL}">Đọc tiếp <i class="fa-solid fa-arrow-right"></i></a>
                                </div>
                            </div>`;
            } else {
                item += `<div class="col-md-3" data-aos="fade-right" data-aos-duration="1000">
                            <div class="box-sub-news">
                                <img src="${replaceImg(data.HinhAnh)}" alt="${data.TieuDe}" />
                            </div>
                            <div class="box-sub-describe mt-1">
                                <a href="/xem-chi-tiet-tin-tuc.html?ma=${encodedURL}">${data.TieuDe}</a>
                            </div>
                        </div>`;
            }
        }
        $('#news-main').append(ItemMain);
        $('#list-sub-news').append(item);
    } else {
        $('#news-main').append(textKhongCoDuLieu);
        $('#list-sub-news').append(textKhongCoDuLieu);
    }
}
function WebSiteLienKet() {
    var result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetWebSite_TrangChu", {});
    if (result.length > 0) {
        let item = ``;
        for (var i = 0; i < result.length; i++) {
            let data = result[i];
            item += `<div class="top-employ--item box-shadow-3">
                        <div class="top-employ__image">
                            <a href="${data.UrlWebsite}" target="_blank">
                                <img alt="${data.TenWebsite}" class="lazy entered loaded img-link-page" src="${replaceImg(data.HinhAnh)}">
                            </a>
                        </div>
                        <h3 class="top-employ__name">
                            <a href="${data.UrlWebsite}" title="${data.TenWebsite}" target="_blank">
                                ${data.TenWebsite}
                            </a>
                        </h3>
                    </div>`;

        }
        $('#box-link-page').append(item);
    } else {
        $('#box-link-page').append(textKhongCoDuLieu);
    }
}

//Load Nha tuyen dung
function BannerCongTy() {
    var result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetNhaTuyenDungNoiBat", {}).Result;
    if (result.length > 0) {
        let item = ``;
        for (var i = 0; i < result.length; i++) {
            let data = result[i];
            let encodedURL = encodeURL(data.NhaTuyenDungCTTID);
            item += `<div class="swiper-slide">
                        <div class="slider-image">
                            <div class="relative ">
                                <img src="${replaceImg(data.Banner)}" class="banner-company rounded object-cover">
                                <div class="box-carousel-main company-card-branding-info absolute bottom-0 z-10 mx-2.5 translate-y-1/2 flex-row rounded bg-white p-4 shadow-sm transition-all group-hover:shadow-lg lg:mx-6 lg:shadow-lg">
                                    <div>
                                        <img src="${replaceImg(data.Logo)}" alt="Alternate Text" class="logo-carousel" />
                                    </div>
                                    <div class="company-card-branding-info-content flex grow flex-col gap-1"><a target="" href="/xem-chi-tiet-nha-tuyen-dung/${data.DinhDanh}.html?p=${data.MaNhaTuyenDung}">
                                        <h3 class="card-title line-clamp-2 text-sm font-bold transition-all lg:line-clamp-1 lg:text-lg">${data.TenNhaTuyenDung}</h3>
                                    </a><a target="" href="/xem-chi-tiet-nha-tuyen-dung/${data.DinhDanh}.html?p=${data.MaNhaTuyenDung}">
                                        <p class="tag-line line-clamp-1 min-h-[1.25rem] text-sm lg:my-1 lg:text-lg" style=" width: 100%;
                                                                                                              display: -webkit-box;
                                                                                                              -webkit-box-orient: vertical;
                                                                                                              -webkit-line-clamp: 2;
                                                                                                              overflow: hidden;">
                                                            ${data.TenNganhNghe == ';' ? '' : data.TenNganhNghe}</p>
                                                                                                                                                </a>
                                        <div class="lg:block"><a target="" href="/xem-chi-tiet-nha-tuyen-dung/${data.DinhDanh}.html?p=${data.MaNhaTuyenDung}">
                                            <p class="description line-clamp-2 text-base text-gray-500">${data.GioiThieuCongTy == null ? '' : data.GioiThieuCongTy}</p>
                                        </a></div>
                                         <div class="box-btn_xemthemnhatuyennoibat" title="Xem thêm thông tin chi tiết nhà tuyển dụng">
                                            <button class="btn_xemthemnhatuyennoibat"> <a href="/xem-chi-tiet-nha-tuyen-dung/${data.DinhDanh}.html?p=${data.MaNhaTuyenDung}" >Xem thêm</a></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
        $('#banner-company').append(item);
    } else {
        $('#banner-company').append(textKhongCoDuLieu);
    }
}
function CongTyMoi() {
    $('#NhaTuyenDung-container-content-list').html('');
    var result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetNhaTuyenDungMoiNhat", {}).Result;
    if (result.length > 0) {
        let item = ``;
        for (var i = 0; i < result.length; i++) {
            let data = result[i];
            let encodedURL = encodeURL(data.NhaTuyenDungCTTID);
            // Kiểm tra số lượng tuyển dụng và giới hạn giá trị hiển thị
            let soLuongTuyenHienThi = data.SoLuongtuyen > 99 ? "99+" : data.SoLuongtuyen;
            item += `  <a href="/xem-chi-tiet-nha-tuyen-dung/${data.DinhDanh}.html?p=${data.MaNhaTuyenDung}" class="box-nhatuyendungmoi_trangchu-container" title="${data.tenCongTy}">
                                    <div class="box-nhatuyendungmoi_trangchu-img">
                                        <img src="${replaceImg(data.Logo)}" class="NhaTuyenDung-container-content-img" />
                                    </div>
                                    <div class="box-nhatuyendungmoi_trangchu-soluongtuyen">
                                        <i class="fa-solid fa-briefcase"></i>&ensp; <p class="box-nhatuyendungmoi_trangchu-soluongtuyen-name">${soLuongTuyenHienThi} vị trí tuyển dụng</p>
                                    </div>
                                </a>`;
        }
        $('#NhaTuyenDung-container-content-list').append(item);
        $('.btn-xemtatcanhatuyendungmoi').css({ "display": "flex" });
    } else {
        $('.NhaTuyenDung-container-content').append(textKhongCoDuLieu);
        $('.btn-xemtatcanhatuyendungmoi').css({ "display": "none" });
    }
}

function LoadCarousel() {
    $("#box-nganhnghe").owlCarousel({
        loop: false,
        nav: false,
        dots: false,
        items: 1,
        autoplay: false,
        autoplayTimeout: 3000,
        stopOnHover: true,
        autoplayHoverPause: true,
        margin: 30,
    });
    $("#box-employ").owlCarousel({
        items: 6,
        loop: true,
        margin: 10,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 6
            }
        }
    });
    $("#box-link-page").owlCarousel({
        items: 6,
        loop: true,
        margin: 10,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 6
            }
        }
    });
}

function LoadCarousel3D() {
    var swiper = new Swiper('.swiper-container.two', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'coverflow',
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        centeredSlides: true,
        speed: 1500,
        slidesPerView: 2,
        spaceBetween: 30,
        coverflowEffect: {
            rotate: 0,
            stretch: 200,
            depth: 200,
            modifier: 1.5,
            slideShadows: false,
        },
    });
}

 function LoadCamNangNgheNghiepNew() {
     $('#content').html('');
    let result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetCamNangNewTop3", {});
    if (!result.Err && result.Result != null) {
        let data = result.Result;
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                let data = result.Result[i];
                let img = (data.TenHinhAnh).split('*')[0];
                if (img == '' || img == undefined || img == null) {
                    img = '/Images/news-defaut.jpg';
                }
                // Mã hóa URL bằng Base64 và ROT13
                $('#content').append(`
                   <div class="col-md-4 col-xs-4 col-sm-12 content-camnangnghenghieptrangchu" data-aos="fade-left" data-aos-duration="1000">
                                    <a  href="/chi-tiet-cam-nang.html?p=${data.TenDinhDanhTT}" class="item_camnang">
                                        <a class="item-linkCamNangNgheNghiep" href="/chi-tiet-cam-nang.html?p=${data.TenDinhDanhTT}">
                                            <div class="item_camnang-box_img" style="">
                                                <img src="${img}" class="item_camnang-img" style="height:100%; width:100%;" />
                                            </div>
                                            <div class="item_camnang-tieude">
                                                <h3 title="${data.TenTieuDe}"> <a href="/chi-tiet-cam-nang.html?p=${data.TenDinhDanhTT}" class="item_camnang-tieude-h3">${data.TenTieuDe} </a></h3>
                                                <p title="${data.NoiDungTomTat}"> <a  href="/chi-tiet-cam-nang.html?p=${data.TenDinhDanhTT}" class="item_camnang-tieude-p">${data.NoiDungTomTat} </a></p>
                                            </div>
                                        </a>
                                    </a>
                                </div>
                `);
                $('.btn-xemtatcamnangnghenghiep').css({ "display": "flex" });
            }
        } else {
            $('#content').append(textKhongCoDuLieu);
            $('.btn-xemtatcamnangnghenghiep').css({ "display": "none" });
        }
    } else {
        $('#content').append(textKhongCoDuLieu);
        $('.btn-xemtatcamnangnghenghiep').css({ "display": "none" });
    }
}
function getTimeDifference(sqlTimestamp) {
    // Check if the sqlTimestamp is an empty string or null
    if (!sqlTimestamp) {
        return "Không xác định";
    }

    const timeStamp = new Date(sqlTimestamp); // Parse SQL timestamp into Date object
    const now = new Date(); // Current time

    const diffMs = now - timeStamp; // Difference in milliseconds
    const diffMinutes = Math.floor(diffMs / (1000 * 60)); // Convert to minutes

    if (diffMinutes < 60) {
        return `${diffMinutes} phút trước`;
    } else if (diffMinutes < 1440) { // 1440 minutes in a day
        const diffHours = Math.floor(diffMinutes / 60);
        return `${diffHours} giờ trước`;
    } else if (diffMinutes < 43200) { // 43200 minutes in 30 days
        const diffDays = Math.floor(diffMinutes / 1440);
        return `${diffDays} ngày trước`;
    } else if (diffMinutes < 525600) { // 525600 minutes in a year
        const diffMonths = Math.floor(diffMinutes / 43200);
        return `${diffMonths} tháng trước`;
    } else {
        const diffYears = Math.floor(diffMinutes / 525600);
        return `${diffYears} năm trước`;
    }
}

//Load nha tuyen dung ngau nhien
async function DanhSachUngVien() {
    $('#list-new-UngVien').html('');
    var result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetDanhSachUngVien_TranhChu", {});
    if (result.length > 0) {
        // Phan Trang
        for (var i = 0; i < result.length; i++) {
            let data = result[i];
            let iconGenner = '';
            if (data.GioiTinh == '1') {
                iconGenner = '<i class="fa-solid fa-mars"></i>'
            } else if (data.GioiTinh == '2') {
                iconGenner = '<i class="fa-solid fa-venus"></i>';
            } else {
                iconGenner = '<i class="fa-solid fa-venus-mars"></i>';
            }

            var hienThi = '';
            if (data.TrangThai == '3') {
                hienThi = 'flex';
            } else {
                hienThi = 'none';
            }

            var startColor = '';
            var starStates = [
                data.TrangThaiHSVL,
                data.TTHocVanBanCap,
                data.TTKyNangUngVien,
                data.TTTinHocNgoaiNguUngVien,
                data.TTKinhNghiemLVUngVien
            ];

            // Count the number of '1' states
            var countYellowStars = starStates.filter(state => state == '1').length;

            // Loop through each state and assign the star color based on the count
            for (var j = 0; j < starStates.length; j++) {
                if (j < countYellowStars) {
                    startColor += '<i style="color:#f89d20" class="fa-solid fa-star"></i>';
                } else {
                    startColor += '<i class="fa-solid fa-star"></i>';
                }
            }


            var encodedURL = encodeURL(data.HoSoUngVienID);
            var timeDifference = getTimeDifference(data.NgayGuiXetDuyet); // Adjust to your timestamp field

            $('#list-new-UngVien').append(`<div class="item" data-aos="fade-down" data-aos-duration="800">
                    <div class="right_item">
                        <div class="row">
                            <div class="col-md-3 col-xs-3 col-sm-3">
                                <div class="row box_img-ungvien">
                                    <a href="/xem-chi-tiet-ung-vien/${data.DinhDanh}.html?p=${data.MaUngVien}" class="box_img-ungvien_logo">
                                        <img src="${replaceImg(data.AnhDaiDien)}" class="img_ungvien_trangchu_img" alt="${data.TenNhaTuyenDung}">
                                    </a>
                                </div>
                                <div class="row box_start titlecustom" data-title="Chất lượng hồ sơ">
                                    ${startColor}
                                </div>
                            </div>
                            <div class="col-md-9 col-xs-9 col-sm-9 box-thongtinungvien_9">
                                <div class="box-thongtinungvien_9-tencongviec" data-title="${checkNullString(data.CongViecMongMuon)}">
                                    <a href="/xem-chi-tiet-ung-vien/${data.DinhDanh}.html?p=${data.MaUngVien}" class="name-ungvien-trangchu" ><i class="fa-solid fa-link"></i> ${checkNullString(data.CongViecMongMuon)}</a>
                                </div>
                                <div class="item_inf_main">
                                    <div class="row">
                                        <div class="col-md-12 item_inf_main-name-ngaysinh-sdt">
                                            <div class="box_nameungvien-ngaysinhsdt titlecustom" data-title="${checkNullString(data.TenUngVien)} - Năm sinh  ${checkNullString(data.NamSinh)}">
                                                <a href="/xem-chi-tiet-ung-vien/${data.DinhDanh}.html?p=${data.MaUngVien}" class="p_addr p_addr_tenungvien" >
                                                    ${iconGenner}
                                                    ${checkNullString(data.TenUngVien)} 
                                                </a>
                                                <p class="namsinh_ungvien">
                                                    ${checkNullString(data.NamSinh)}
                                                </p>
                                            </div>
                                            <p style="display:${hienThi};" class="xacthucSDT titlecustom" data-title="Đã xác thực số điện thoại">
                                                <span class="box_XacThucSDT">
                                                    <i class="fa-solid fa-check"></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6 col-xs-6 col-sm-6 titlecustom" data-title="Trình độ ${checkNullString(data.TenHocVan)}">
                                            <p class="p_addr">
                                                <i class="fa-solid fa-graduation-cap"></i>
                                                ${checkNullString(data.TenHocVan)}
                                            </p>
                                        </div>
                                        <div class="col-md-6 col-xs-6 col-sm-6 titlecustom" data-title="Kinh nghiệm ${checkNullString(data.TenKinhNghiem)}">
                                            <p class="p_addr">
                                                <i class="fa-solid fa-star"></i>
                                                ${checkNullString(data.TenKinhNghiem)}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 col-xs-6 col-sm-6 titlecustom"  data-title="Mức lương ${checkNullString(data.TenMucLuong)}">
                                            <p class="p_addr">
                                                <i class="fa-solid fa-money-bill"></i>
                                                ${checkNullString(data.TenMucLuong)}
                                            </p>
                                        </div>
                                        <div class="col-md-6 col-xs-6 col-sm-6 titlecustom" data-title="Cập nhật ${timeDifference}">
                                            <p class="p_addr">
                                                <i class="fa-solid fa-rotate"></i>
                                                ${timeDifference}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="icon-like" data-id="${data.HoSoUngVienID}"><i class="${KiemTraLuuTruHoSo(data.HoSoUngVienID) == `1` ? `fa-solid btn-DaLuuTin` : `fa-regular`}  fa-heart btn-luutru" data-id="${data.HoSoUngVienID}"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
    } else {
        $('#list-new-UngVien').append(textKhongCoDuLieu);
    }
}

$(document).on('click', '.btn-luutru', function () {
    let resultKT = NTS.getAjax("CongThongTinViecLam/TrangChuCTT/KiemTraDangNhap", {});
    if (resultKT == "2") {
        NTS.canhbao("Vui lòng đăng nhập để thực hiện thao tác!");
        return false;
    }
    //kiểm tra đã có đăng nhập chưa
    let UngVienID = $(this).attr('data-id');
    let result = LuuTruUngVien(UngVienID);
    if (result == "1") {

        let resultTrangThai = KiemTraLuuTruHoSo(UngVienID);
        if (resultTrangThai == "1") {
            NTS.thanhcong("Lưu thông tin ứng viên thành công");
            $(this).addClass('btn-DaLuuTin')
            $(this).addClass('fa-solid')
            $(this).removeClass('fa-regular')

        } else {
            NTS.thanhcong("Hủy theo dõi ứng viên thành công");
            $(this).removeClass('btn-DaLuuTin')
            $(this).removeClass('fa-solid')
            $(this).addClass('fa-regular')
        }

    } else if (result == "2") {
        NTS.canhbao("Vui lòng đăng nhập để thực hiện thao tác!");
        return false;
    } else if (result == "3") {
        NTS.canhbao("User của bạn không thể thực hiện thao tác này!");
        return false;
    } else {
        NTS.canhbao("Có lỗi xảy ra!");
        return false;
    }
})


$(document).on('click', '.btn-luutru-nhatuyendung', async function () {
    let resultKT = await NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/KiemTraDangNhap", {});
    if (resultKT == "2") {
        NTS.canhbao("Vui lòng đăng nhập để thực hiện thao tác!");
        return false;
    }
    //kiểm tra đã có đăng nhập chưa
    let TinTuyenDungID = $(this).attr('data-id');
    let result = LuuTruViecLam(TinTuyenDungID);
    if (result == "1") {

        let resultTrangThai = await KiemTraLuuTruViecLam(TinTuyenDungID);
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