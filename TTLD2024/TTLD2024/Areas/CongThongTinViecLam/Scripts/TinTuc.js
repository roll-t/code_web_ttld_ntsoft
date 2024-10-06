$(document).ready(function () {
    var NoiDung = '';
    var LoaiTinTuc = '';
    var eventsOccurred = false; // Biến cờ để theo dõi xem các sự kiện đã xảy ra hay chưa
    loadCombo();
    $('#LoaiTinTuc').select2({ width: '100%' });
    $('#sel_SapXep').select2({ width: '100%' });

    $('#sel_SapXep').on('change', function () {
        NoiDung = $(this).val();
        LoaiTinTuc = $('#LoaiTinTuc').val();
        eventsOccurred = true;
        LoadTimKiem(NoiDung, LoaiTinTuc);
    });
    $('#LoaiTinTuc').on('change', function () {
        LoaiTinTuc = $(this).val();
        NoiDung = $('#sel_SapXep').val();
        eventsOccurred = true;
        LoadTimKiem(NoiDung, LoaiTinTuc);
    });

    $('#TimKiemVB').keypress(function (e) {
        if (e.which === 13) { // Kiểm tra mã phím, 13 là mã phím cho phím Enter
            NoiDung = $('#TimKiemVB').val();
            eventsOccurred = true;
            chuyePage();
            LoadTimKiem(NoiDung, LoaiTinTuc);
        }
    });

    // Kiểm tra xem các sự kiện đã xảy ra hay chưa sau một khoảng thời gian nhất định
    setTimeout(function () {
        if (!eventsOccurred) {
            NoiDung = '';
            LoaiTinTuc = '';
            LoadTimKiem(NoiDung, LoaiTinTuc);
        }
    }, 200); // Thời gian chờ, đặt thLoadComBo();     
    getTinNoiBat();
    LoadTinMoiNhat();
    LoadTinLuongCao();
});

function chuyePage() {
    var url = new URL(window.location.href);
    url.searchParams.set('page', '1');
    window.history.replaceState({}, '', url);
    // Thực hiện các thao tác khác để cập nhật giao diện hoặc thực hiện hành động trên trang 1
}

function loadCombo() {
    NTS.loadDataCombo_NoVerifi({
        name: '#LoaiTinTuc',
        ajaxUrl: '/CongThongTinViecLam/TinTucCTT/getLoaiTinTuc',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: 'Tất cả loại tin tức',
        showTatCa: !0
    });
}

function getTinNoiBat() {
    let GetAll = NTS.getAjax("/CongThongTinViecLam/TinTucCTT/getTinNoiBat", {});

    if (GetAll && GetAll.length > 0) {
        if (GetAll.length >= 4) {
            var dodai = 4;
        } else {
            var dodai = GetAll.length;
        }
        for (let j = 0; j < dodai; j++) {
            let result = GetAll[j];
            let img = (result.HinhAnh).split('*')[0];
            if (img == '' || img == undefined || img == null) {
                img = '/Content/CongThongTin/images/newspapers_default.png';
            }

            let encodedURL = encodeURL(result.TinTucID);
            $('#list-vanbannew').append(`
        <li class="list-group-item">
            <a href="/xem-chi-tiet-tin-tuc/${result.DinhDanh}.html?ma=${result.MaTinTuc}">
                <div class="row">
                    <div class="col-md-4 col-sm-3 col-xs-3">
                        <img src="${img}" alt="" class="img-responsive img_noibat" />
                    </div>
                    <div class="col-md-8 col-sm-9 col-xs-9">
                        <p style="font-size:11px; color:#999" class="vanban-text">${result.TieuDe}</p>
                    </div>
                </div>
            </a>
        </li>
    `);
            let vanban_new = result.TieuDe;
            if (vanban_new.length > 60) {
                let catchuoi_vanban_new = vanban_new.substring(0, 60) + "...";
                $('.vanban-text').last().text(catchuoi_vanban_new);
            }
        }
    } else {
        $('#list-vanbannew').append(`
            <div style="text-align:center;">
                <img src="/Content/CongThongTin/images/newspapers_default.png" class="" id="vanban-empty"/>
            </div>
        `);
    }
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function ListPaginationVanBan(listNumber, page) {
    var totalPages = Math.ceil(listNumber / 6);
    var currentURL = window.location.href.split('?')[0];

    // Chuyển đổi page từ chuỗi sang số nguyên
    page = parseInt(page);

    // Kiểm tra và giới hạn giá trị của page
    if (isNaN(page) || page < 1) {
        page = 1;
    } else if (page > totalPages) {
        page = totalPages;
    }

    if (totalPages > 1) {
        var startPage = Math.max(page - 2, 1);
        var endPage = Math.min(startPage + 5, totalPages);

        var paginationHTML = `
            <div class="row" style="display:flex;justify-content:center; margin:20px 0;" id="pagination">
                <nav aria-label="Page navigation example">
                    <ul class="pagination" id="list-pagination">
                        <li class="page-item ${(page == 1) ? 'disabled' : ''}">
                            <a class="page-link" href="${(page == 1) ? '#' : currentURL + '?page=' + (page - 1)}" onclick="if (!$(this).parent().hasClass('disabled')) { location.href='${(page == 1) ? '#' : currentURL + '?page=' + (page - 1)}'; }" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>`;

        for (var i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <li class="page-item ${(i == page) ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="if (!$(this).parent().hasClass('disabled')) { location.href='${currentURL}?page=${i}'; }">${i}</a>
                </li>`;
        }

        paginationHTML += `
                        <li class="page-item ${(page == totalPages) ? 'disabled' : ''}">
                            <a class="page-link" href="${(page == totalPages) ? '#' : currentURL + '?page=' + (page + 1)}" onclick="if (!$(this).parent().hasClass('disabled')) { location.href='${(page == totalPages) ? '#' : currentURL + '?page=' + (page + 1)}'; }" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>`;

        $('#content_pagination').append(paginationHTML);
    }
}


function LoadTimKiem(NoiDung, LoaiTinTuc) {
    $('#content').html('');
    $('#content_pagination').html('');
    var param = new Array();
    param[0] = NoiDung;
    param[1] = LoaiTinTuc;

    let GetAll = NTS.getAjax("/CongThongTinViecLam/TinTucCTT/getTinTuc_TimKiem", { noidung: param });
    if (GetAll && GetAll.length > 0) { // Kiểm tra GetAll có tồn tại và không rỗng
        var page = getUrlParameter('page');
        if (page == false) {
            page = 1;
        }

        var RowData = 9;
        var startIndex = (page * RowData) - RowData;
        var endIndex = Math.min(GetAll.length, (page * RowData));
        for (var i = startIndex; i < endIndex; i++) {
            let data = GetAll[i];
            let img = (data.HinhAnh).split('*')[0];
            if (img == '' || img == undefined || img == null) {
                img = '/Content/CongThongTin/images/newspapers_default.png';
            }
            // Mã hóa URL bằng Base64 và ROT13
            var encodedURL = encodeURL(data.TinTucID);
            $('#content').append(`
               <div class="content_text">
                    <a href="/xem-chi-tiet-tin-tuc/${data.DinhDanh}.html?ma=${data.MaTinTuc}" >
                        <div class="media">
                            <div class="row">
                                <div class="col-md-3 col-sm-3 col-xs-3">
                                    <img class="mr-3 img-rounded img-vanban" src="${img}" alt="Generic placeholder image">
                                </div>
                                <div class="col-md-9 col-sm-9 col-xs-9">
                                    <div class="media-body">
                                        <h5 class="mt-0">${data.TieuDe}</h5>
                                        <div style="display:flex;margin-top:4px;">
                                            <p class="mr-6"><i class="fa-regular fa-clock mr-2"></i>${data.NgayTao}</p>
                                        </div>
                                        <p class="myParagraph">${data.NoiDungTomTat.length > 200 ? data.NoiDungTomTat.substring(0, 200) + "..." : data.NoiDungTomTat}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
             
            `);

        }
        ListPaginationVanBan(GetAll.length, page);
    }
    else {
        $('#content').append(`
            <div style="text-align:center;">
                <img src="/Images/vanban-empty.jpg" class="" id="vanban-empty"/>
            </div>
        `);
    }
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

function LoadTinMoiNhat() {
    var result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetTinTuyenDung_MoiNhat", {});
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            let data = result[i];
            var encodedURL = encodeURL(data.TinTuyenDungID);
            $('#listCongViecMoiNhat').append(`<li class="list-group-item list-group-vieclam-new">
                                                <a href="/xem-chi-tiet-viec-lam/${data.DinhDanh}.html?p=${data.MaViecTimNguoi}">
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-3 col-xs-2">
                                                        <img src="${replaceImg(data.LogoCongTy)}" alt="" class="img-img-responsive box-white" />
                                                    </div>
                                                    <div class="col-md-9 col-sm-9 col-xs-10">
                                                        <h2 class="text-overflow-line1" style="font-size: 13px;">${data.ViTriTuyenDung}</h2>
                                                        <p class="text-overflow-line1">${data.DiaDiemLamViec.replace(/;$/, '').replace(/; $/, '')}</p>
                                                        <div class="" style="display:flex; align-items:center;justify-content:space-between">
                                                            <span class="badge badge-pill badge-light badge_mucluong" style=" background:#FFF;">
                                                               <span class="" style="border:solid 1px #ff6a00;border-radius:50%;" ><i class="fa-solid fa-dollar-sign p-1 icon_dollar"></i></span> ${data.TenMucLuong}
                                                            </span>
                                                              <span class="badge badge-pill badge-light badge_thoigian" style=" background:#FFF;">
                                                               <i class="fa-regular fa-clock"></i> ${data.NgayDang}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                </a>
                                            </li>`);

        }
    } else {
        $('#listCongViecMoiNhat').append(`
            <div style="text-align:center;">
                <img src="Images/vanban-empty.jpg" class="" id="vanban-empty"/>
                <p style="color: #7f7d7d;">Hiện chưa có tin tuyển dụng</p>
            </div>
        `);
    }
}

function LoadTinLuongCao() {
    var result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetTinTuyenDung_LuongCao", {});
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            let data = result[i];
            var encodedURL = encodeURL(data.TinTuyenDungID);
            $('#listViecLamLuongCao').append(`<li class="list-group-item list-group-vieclam-new">
                                                <a href="/xem-chi-tiet-viec-lam/${data.DinhDanh}.html?p=${data.MaViecTimNguoi}">
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-3 col-xs-2">
                                                        <img src="${replaceImg(data.LogoCongTy)}" alt="" class="img-img-responsive box-white" />
                                                    </div>
                                                    <div class="col-md-9 col-sm-9 col-xs-10">
                                                        <h2 class="text-overflow-line1" style="font-size: 13px;>${data.ViTriTuyenDung}</h2>
                                                        <p class="text-overflow-line1">${data.DiaDiemLamViec.replace(/; $/, '') }</p>
                                                        <div class="" style="display:flex; align-items:center;justify-content:space-between">
                                                            <span class="badge badge-pill badge-light badge_mucluong" style=" background:#FFF;">
                                                               <span class="" style="border:solid 1px #ff6a00;border-radius:50%;" ><i class="fa-solid fa-dollar-sign p-1 icon_dollar"></i></span> ${data.TenMucLuong}
                                                            </span>
                                                              <span class="badge badge-pill badge-light badge_thoigian" style=" background:#FFF;">
                                                               <i class="fa-regular fa-clock"></i> ${data.NgayDang}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                </a>
                                            </li>`);
        }
    } else {
        $('#listViecLamLuongCao').append(`
            <div style="text-align:center;">
                <img src="/Images/vanban-empty.jpg" class="" id="vanban-empty"/>
                <p style="color: #7f7d7d;">Hiện chưa có tin tuyển dụng</p>
            </div>
        `);
    }
}