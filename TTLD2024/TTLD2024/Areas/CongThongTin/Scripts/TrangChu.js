$(document).ready(function () {
    getTinTucNoiBat();
    getBanner();
    //getTinTuc_TrangChu();
    //getWebsiteLienKet();
});

function getTinTucNoiBat() {
    var GetAll = NTS.getAjax_NoVerifi("/CongThongTin/TrangChu/getTinTucChiTiet", {});
    if (GetAll.length > 0) {
        for (var i = 0; i < Math.min(GetAll.length, 4); i++) { // lay 4 tin tuc noi bat moi nhat
            let data = GetAll[i];
            let img = data.HinhAnh;
            if (img == '' || img == undefined || img == null) {
                img = '../../Content/themes/Theme_1/images/news-defaut.jpg';
            }
            if (i == 0) {
                $('#featured-news-main').append(`
                    <a href="/tin-tuc-chi-tiet.html?dinh-danh=${data.DinhDanh}" title="${data.TieuDe}"><img src="${img}" alt="${data.TieuDe}" class="img-news-banner"/></a>
                    <div class="title-news text-2-row">
                        <a href="/tin-tuc-chi-tiet.html?dinh-danh=${data.DinhDanh}" title="${data.TieuDe}">${data.TieuDe}</a>
                    </div>
                    <div class="content-news text-5-row">
                        ${data.NoiDungTomTat}
                    </div>`)
            } else {
                $('#featured-news-child').append(`
                    <div class="column">
                        <div class="columns is-gapless is-multiline is-mobile">
                            <div class="column is-one-quarter">
                                <a href="/tin-tuc-chi-tiet.html?dinh-danh=${data.DinhDanh}" title="${data.TieuDe}"><img src="${img}" alt=" ${data.TieuDe}" class="img-news-banner-child"/></a>
                            </div>
                            <div class="column">
                                <div class="columns is-gapless is-multiline is-mobile">
                                    <div class="column is-12 content-news-child text-2-row" style="font-weight:bold;font-size: 16px;">
                                        <a href="/tin-tuc-chi-tiet.html?dinh-danh=${data.DinhDanh}" title="${data.TieuDe}">${data.TieuDe}</a>
                                    </div>
                                    <div class="column is-12 content-news-child text-5-row">
                                        ${data.NoiDungTomTat}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);
            }
        }
    }
}
function getBanner() {
    debugger
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
function getTinTuc_TrangChu() {
    var GetAll = NTS.getAjax_NoVerifi('json', "/CongThongTin/TrangChu/getTinTuc_TrangChu", {});
    if (GetAll.length > 0) {
        var textConent = '';
        var boxContent = '';
        for (var i = 0; i < Math.min(GetAll.length, 8); i++) { // lay 8 tin tuc moi nhat
            let data = GetAll[i];
            let img = data.HinhAnh;
            if (img == '' || img == undefined || img == null) {
                img = '../../Content/themes/Theme_1/images/news-defaut.jpg';
            }
            textConent +=
                `<div class="column is-3 box-item-news-work box">
                        <a class="ui teal  ribbon label ribbon-news"><i class="fa-solid fa-calendar-days"></i>: ${data.NgayTao}</a>
                        <a href="/tin-tuc-chi-tiet.html?dinh-danh=${data.DinhDanh}" title="${data.TieuDe}"><img class="img-news-work" src="${img}" alt="${data.TieuDe}" /></a>
                        <div class="news-title text-2-row">
                            <a href="/tin-tuc-chi-tiet.html?dinh-danh=${data.DinhDanh}">${data.TieuDe}</a>
                        </div>
                        <div class="text-5-row">
                            <i class="fa-solid fa-circle" style="font-size: 6px; color: #90ff83; position: relative; top: -3px;"></i> ${data.NoiDungTomTat}
                        </div>
                    </div>`;
            if ((i + 1) % 4 == 0 || i == GetAll.length - 1) { // neu do la phan tu thu 4 hoac la phan tu cuoi cung thi block vao element cha cua no                
                boxContent +=
                    `<div class="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd" style="gap: 0 10px;">
                        ${textConent}
                    </div>`;
                textConent = ''; //reset noi dung khi da append vao box tin tuc
            }
        }
        $('#tintuc-content').append(boxContent);

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

