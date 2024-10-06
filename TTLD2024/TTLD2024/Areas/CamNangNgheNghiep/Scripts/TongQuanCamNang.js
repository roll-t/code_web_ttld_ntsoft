$(document).ready(function () {
    getTinTucMoiNhat();
    getTinTucNoiBat();

    //getBanner();
    getDataChuyenMucCamNang_TrangChu('title-laban','laban-content','0401');
    getDataChuyenMucCamNang_TrangChu('title-tramsac','tramsac-content','0402');
    getDataChuyenMucCamNang_TrangChu('title-toadonhantai','toadonhantai-content','0403');
    getDataChuyenMucCamNang_TrangChu('title-kiot','kiot-content','0404');
    getDataChuyenMucCamNang_TrangChu('title-bantron', 'bantron-content', '0405');
    LoadTinMoiNhat();
    //getWebsiteLienKet();
    $('#TimKiem').keypress(function (e) {
        if (e.which == 13) { // 13 là mã phím cho phím Enter
            NoiDung = $(this).val(); // Lấy giá trị từ ô input
            location.href = 'tim-kiem-cam-nang-nghe-nghiep.html?tim-kiem=' + NoiDung
        }
    });
});

function getTinTucMoiNhat() {

    var GetAll = NTS.getAjax_NoVerifi("/CamNangNgheNghiep/TongQuanCamNang/getCamNangMoiNhat_Top10", {});
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) { // lay 4 tin tuc noi bat moi nhat
            let data = GetAll[i];
            let imgArr = data.HinhAnh.split('*');
            let img = "";
            if (imgArr.length > 0) {
                img = imgArr[0];
            }
            if (img == '' || img == undefined || img == null) {
                img = '/Images/news-defaut.jpg';
            }
            var content_child_list = "";
            if (i == 0) {
                $('#featured-news-main').append(`
                    <div class="columns">
                        <div class="column is-4">
                            <div class="title-news text-2-row">
                                <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" title="${data.TieuDe}"  class="text-link">${data.TieuDe}</a>
                            </div>
                            <div class="content-news text-5-row">
                                ${data.NoiDungTomTat}
                            </div>
                        </div>
                        <div class="column is-8">
                            <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" title="${data.TieuDe}"><img src="${img}" alt="${data.TieuDe}" class="img-news-banner"/></a>
                        </div>                        
                    </div>`)
            } else if (i == 1) {
                $('#featured-news-child').append(`
                    <div class="column" style="${i == 1 ? ' padding-top: 0;' : ""}">
                        <div class="columns is-gapless is-multiline is-mobile">
                            <div class="column is-12">
                                <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" title="${data.TieuDe}"><img src="${img}" alt=" ${data.TieuDe}" class="img-news-banner-child"/></a>
                            </div>
                            <div class="column">
                                <div class="columns is-gapless is-multiline is-mobile">
                                    <div class="column is-12 content-news-child text-2-row" style="font-weight:bold;font-size: 16px;margin-bottom: 10px;">
                                        <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" title="${data.TieuDe}" class="text-link">${data.TieuDe}</a>
                                    </div>
                                    <div class="content-news text-4-row">
                                        ${data.NoiDungTomTat}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);
            } else if (i >= 2 && i <= 4) {
                $('#list-featured-news-main').append(`
                    <div class="column is-4 box-item-news-work" style="${i == 2 ? ' padding-left: 0 !important;' : ' padding-left: 10px !important;'}">
                        <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" title="${data.TieuDe}"><img class="img-news-work" src="${img}" alt="${data.TieuDe}" /></a>
                        <div class="news-title text-2-row">
                            <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" class="text-link">${data.TieuDe}</a>
                        </div>
                        <div class="content-news text-4-row">
                            ${data.NoiDungTomTat}
                        </div>
                    </div>`);
            } else {
                $('#list-featured-news-child').append(`
                    <div class="columns">
                        <div class="column is-5">
                            <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" title="${data.TieuDe}"><img src="${img}" alt="${data.TieuDe}" class="list-img-news-banner"/></a>
                        </div>
                        <div class="column is-7">
                            <div class="title-news text-5-row">
                                <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" title="${data.TieuDe}"  class="text-link">${data.TieuDe}</a>
                            </div>                            
                        </div>
                                             
                    </div>`)
            }
        }
    }
}
function getBanner() {
    var GetAll = NTS.getAjax_NoVerifi("/CongThongTin/TrangChu/getBanner", {}).Result;
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            $('#box-img').append(
                `<li class="splide__slide">
                    <a href="${data.DuongDan}" target="_blank" title="${data.MoTa}"><img class="img-banner-tc" src="${data.IMG.replaceAll('*', '')}" alt="${data.MoTa}" /></a>
                </li>`)
        }
    }
}
function getDataChuyenMucCamNang_TrangChu(Element_ID_title, Element_ID_Content, MaCamNang) {
    var GetData_Title = NTS.getAjax_NoVerifi("/CamNangNgheNghiep/TongQuanCamNang/getTitleCamNang", { MaLoaiCamNang: MaCamNang });
    if (GetData_Title.length > 0) {
        var textTitle = `<a href="/chuyen-muc-cam-nang-nghe-nghiep.html?p=${GetData_Title[0].MaLoaiTinTuc}"><img src="/Images/next.png" class="img-next"> &nbsp;${GetData_Title[0].TenLoaiTinTuc}</a>`
        $('#' + Element_ID_title).html(textTitle);
    } else {

    }
    var GetAll = NTS.getAjax_NoVerifi("/CamNangNgheNghiep/TongQuanCamNang/getCamNang_TheoMa", { MaLoaiCamNang: MaCamNang});
    if (GetAll.length > 0) {
        var textConent = '';
        var boxContent = '';
        for (var i = 0; i < Math.min(GetAll.length, 9); i++) { // lay 8 tin tuc moi nhat
            let data = GetAll[i];
            let imgArr = data.HinhAnh.split('*');
            let img = "";
            if (imgArr.length > 0) {
                img = imgArr[0];
            }
            if (img == '' || img == undefined || img == null) {
                img = '/Images/news-defaut.jpg';
            }
            if (i == 0) {
                $('#' + Element_ID_Content).append(`<div class="main-box-cat">
                    <div class="category-box-main-item-big">
                        <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" class="expthumb thumb" title="${data.TieuDe}"><img class="lazyload loaded" src="${img}" data-src="${img}" alt="${data.TieuDe}"></a>
                        <div class="news-info">
                            <h3>
                                <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" class="main-title main-title-large  text-3-row" title="${data.TieuDe}">${data.TieuDe}</a>
                            </h3>
                            <div class="news-cate-time">
                                <a href="/chuyen-muc-cam-nang-nghe-nghiep.html?p=${data.MaLoaiTinTuc}" title="${data.TenLoaiTT}" class="news-cate-link">${data.TenLoaiTT}</a>
                                <span class="news-push-date">${data.NgayTao}</span>
                            </div>
                            <p class="main-intro main-intro-limit">${data.NoiDungTomTat}</p>
                        </div>
                    </div>
                </div>`);
            } else {
                textConent += `<div class="item-ebc">
                                    <div class="img-ebc">
                                        <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" class="expthumb expthumb thumb" title="${data.TieuDe}">
                                            <img class="lazyload" src="${img}" data-src="${img}" alt="${data.TieuDe}">
                                        </a>
                                    </div>
                                    <div class="title-ebc">
                                        <h3>
                                            <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" title="${data.TieuDe}">${data.TieuDe}</a>
                                        </h3>
                                    </div>
                                </div>`;
            }
        }
        boxContent += `<div class="extra-box-cat">${textConent} </div>`;

        $('#' + Element_ID_Content).append(boxContent);

    } else {
        $('#' + Element_ID_Content).append(`<img src="/Images/no-data-1.jpg"  class="img-no-data-camnang"/>`);
    }
}
function getWebsiteLienKet() {
    var GetAll = NTS.getAjax_NoVerifi('json', "/CongThongTin/TrangChu/getWebsiteLienKet", {});
    if (GetAll.length > 0) {
        var textConent = '';
        var boxContent = '';
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            let img = data.HinhAnh;
            if (img == '' || img == undefined || img == null) {
                img = '../../Content/themes/Theme_1/images/link-defaut.jpg';
            }
            $('#list-data-lienket').append(
                `<li class="splide__slide">
                    <a href="${data.UrlWebsite}"><img class="img-lienket box" src="${img.replaceAll('*', '')}" alt="${data.TenWebsite}" /></a>
                </li>`);

        }

    }
}

function getTinTucNoiBat() {
    var GetAll = NTS.getAjax_NoVerifi("/CamNangNgheNghiep/TongQuanCamNang/getTinTucCamNangNoiBat", {});
    if (GetAll.length > 0) {
        var biendem = 1;
        for (var i = 0; i < GetAll.length; i++) { // lay 4 tin tuc noi bat moi nhat
            let data = GetAll[i];
            let imgArr = data.HinhAnh.split('*');
            let img = "";
            if (imgArr.length > 0) {
                img = imgArr[0];
            }
            if (img == '' || img == undefined || img == null) {
                img = '/Images/news-defaut.jpg';
            }
            if (i >= 0 && i <= 2) {
                $('#list-tin-noi-bat').append(`
                            <div class="item_event_in_cat">
                            <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" class="expthumb news-left-image" title="${data.TieuDe}">
                                <img class="lazyload" src="${img}" alt="${data.TieuDe}">
                            </a>
                            <div>
                                <h3>
                                    <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" class="news-left-item-title" title="${data.TieuDe}">${data.TieuDe}<i class="expi-video"></i></a>
                                </h3>
                            </div>
                        </div>`)
            }
            else if (i >= 3 && i <= 9) {
                $('#list-box-tin-noi-bat').append(`<div class="justify-content-between news-left-item pt-0">
                        <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" class="expthumb news-left-image pc-console" title="${data.TieuDe}"><img class="lazyload loaded" src="${img}" data-src="${img}" width="300" height="180" alt="${data.TieuDe}"></a>
                        <div class="news-left-item-info">
                            <h3>
                                <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" class="news-left-item-title" title="${data.TieuDe}">${data.TieuDe}</a>
                            </h3>
                            <div class="mobile">
                                <div class="item-ebc">
                                    <div class="img-ebc">
                                        <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" class="expthumb expthumb thumb" title="${data.TieuDe}">
                                            <img class="lazyload loaded" src="${img}" width="300" height="180" alt="${data.TieuDe}" data-was-processed="true">
                                        </a>
                                    </div>
                                    <div class="title-ebc">
                                        <span>${data.NoiDungTomTat}</span>
                                    </div>
                                </div>
                            </div>
                            <a href="/chuyen-muc-cam-nang-nghe-nghiep.html?p=${data.MaLoaiTinTuc}" class="news-left-item-time  pc-console" title="${data.TenLoaiTT}">${data.TenLoaiTT}</a>
                            <span class="alert-light pc-console">${data.NgayTao}</span>
                            <p class="news-left-item-content pc-console">${data.NoiDungTomTat}</p>
                        </div>
                    </div>`);
            } else {
                $('#tin-noi-bat-right').append(`<div class="news-right2 d-flex">
                        <span class="count-view-tp">${biendem}</span>
                        <h3 style="margin-top: 0;">
                            <a href="/chi-tiet-cam-nang.html?p=${data.DinhDanh}" class="main-title main-title-big" title="${data.TieuDe}">${data.TieuDe}</a>
                        </h3>
                    </div>`);
                biendem++;
            }            
        }
    }
}

//function LoadTinMoiNhat() {
//    var result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetTinTuyenDung_MoiNhat", {});
//    if (result.length > 0) {
//        let item = ``;
//        for (var i = 0; i < result.length; i++) {
//            let data = result[i];
//            var encodedURL = encodeURL(data.TinTuyenDungID);
//            item += `<div class="item">
//                            <div class="right_item">                                
//                                <a href="/xem-chi-tiet-viec-lam/${data.DinhDanh}.html?p=${data.MaViecTimNguoi}" target="_blank" rel="nofollow">
//                                    <h3 title="${data.ViTriTuyenDung}" class="title_new hot" style="width: 90% !important;">${data.ViTriTuyenDung}</h3>
//                                </a>
//                                <div class="exp-item mb-1">
//                                    ${isNullOrEmptyOrWhitespace(data.TenCapBac) ? '' : '<a href="#">' + data.TenCapBac + '</a>'}
//                                    ${isNullOrEmptyOrWhitespace(data.TenYeuCauKinhNghiem) ? '' : '<a href="#">' + data.TenYeuCauKinhNghiem + '</a>'}
//                                    ${isNullOrEmptyOrWhitespace(data.TenHinhThucLamViec) ? '' : '<a href="#">' + data.TenHinhThucLamViec + '</a>'}
//                                </div>
//                                <div class="mt-3">
//                                    <a class="logo mb-3">
//                                        <img src="${replaceImg(data.LogoCongTy)}" class="lazyload" alt="${data.TenNhaTuyenDung}" style='height: 60px;'>
//                                    </a>
//                                    <div>
//                                        <a href="/xem-chi-tiet-viec-lam/${data.DinhDanh}.html?p=${data.MaViecTimNguoi}" style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;">${data.TenNhaTuyenDung}</a>
//                                    </div>
//                                </div>
//                                <div class="item_inf_main">
//                                    <p class="p_addr">
//                                        <i class="fa-solid fa-location-dot"></i>
//                                        ${data.DiaDiemLamViec}
//                                    </p>
//                                </div>
//                                <hr class="padding-item" />
//                                <div class="footer-item">
//                                    <div class="ft-box-left">
//                                        <label class="new-item">Mới</label>
//                                        <p class="p_time">${data.NgayDang}</p>
//                                    </div>
//                                    <div class="ft-box-right">
//                                        <p class="p_salary"><i class="fa-solid fa-coins"></i> ${data.TenMucLuong}</p>
//                                    </div>
//                                </div>
//                            </div>
//                        </div>`;
//        }
//        $('#list-new-job').append(item);
//    } else {
//        $('#list-new-job').append(textKhongCoDuLieu);
//    }
//}

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
                                                ${isNullOrEmptyOrWhitespace(data.TenCapBac) ? '' : '<a href="/xem-chi-tiet-viec-lam/' + data.DinhDanh + '.html?p=' + data.MaViecTimNguoi + '">' + data.TenCapBac + '</a>'}
                                                ${isNullOrEmptyOrWhitespace(data.TenYeuCauKinhNghiem) ? '' : '<a href="/xem-chi-tiet-viec-lam/' + data.DinhDanh + '.html?p=' + data.MaViecTimNguoi + '">' + data.TenYeuCauKinhNghiem + '</a>'}
                                                ${isNullOrEmptyOrWhitespace(data.TenHinhThucLamViec) ? '' : '<a title="' + data.TenHinhThucLamViec + '" class="hinhthuclamviec_vieclammoi"  href="/xem-chi-tiet-viec-lam/' + data.DinhDanh + '.html?p=' + data.MaViecTimNguoi + '">' + data.TenHinhThucLamViec + '</a>'}
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

function replaceImg(data) {
    if (data != null) {
        if (data != "") {
            return data.replace('*', '').replace('~', '');
        } else {
            return "../../Images/banner.jpg";
        }
    } else {
        return "../../Images/banner.jpg";
    }

}
function KiemTraLuuTruViecLam(TinTuyenDungID) {
    let result = NTS.getAjax("/CongThongTinViecLam/Function/KiemTraLuuTruViecLam", { id: TinTuyenDungID });
    return result;
}
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