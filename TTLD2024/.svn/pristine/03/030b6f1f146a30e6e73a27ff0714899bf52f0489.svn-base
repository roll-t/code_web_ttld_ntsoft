$(document).ready(function () {
    //$('#sel_SapXep').select2({ width: '100%' });
    var NoiDung = '';
    var eventsOccurred = false; // Biến cờ để theo dõi xem các sự kiện đã xảy ra hay chưa

    $('#sel_SapXep').on('change', function () {
        NoiDung = $(this).val();
        eventsOccurred = true;
        LoadTimKiem(NoiDung);
    });
    $('#sel_SapXep').select2({ width: '100%' })
    $('#TimKiemVB').keypress(function (e) {
        if (e.which === 13) { // Kiểm tra mã phím, 13 là mã phím cho phím Enter
            NoiDung = $('#TimKiemVB').val();
            eventsOccurred = true;
            chuyePage();
            LoadTimKiem(NoiDung);
        }
    });

    // Kiểm tra xem các sự kiện đã xảy ra hay chưa sau một khoảng thời gian nhất định
    setTimeout(function () {
        if (!eventsOccurred) {
            NoiDung = '';
            LoadTimKiem(NoiDung);
        }
    }, 200); // Thời gian chờ, đặt thành giá trị phù hợp

    getVanBanMoi();
    LoadTinMoiNhat();
    LoadTinLuongCao();
});

function chuyePage() {
    var url = new URL(window.location.href);
    url.searchParams.set('page', '1');
    window.history.replaceState({}, '', url);
    // Thực hiện các thao tác khác để cập nhật giao diện hoặc thực hiện hành động trên trang 1
}


function getVanBanMoi() {
    let GetAll = NTS.getAjax("/CongThongTinViecLam/VanBanCTT/getVanBan", {});
    let anh = 'Content/CongThongTin/images/document-default.png';
    if (GetAll && GetAll.length > 0) { // Kiểm tra GetAll có tồn tại và không rỗng
        if (GetAll.length >= 3) {
            var dodai = 3;
        } else {
            var dodai = GetAll.length;
        }
        for (var j = 0; j < dodai; j++) {
            let result = GetAll[j];
            var encodedURL = encodeURL(result.VanBanID);
            $('#list-vanbannew').append(`
                <li class="list-group-item" >
                    <a href="/xem-chi-tiet-van-ban/${result.DinhDanh}.html?ma=${result.MaVanBan}">
                            <div class="row ">
                        <div class="col-md-4 col-sm-3 col-xs-4">
                            <img src="${anh}"
                                alt="" class="img-responsive" />
                        </div>
                        <div class="col-md-8 col-sm-9 col-xs-8">
                            <p style="font-size:11px; color:#999" class="vanban-text">${result.TrichYeu}</p>
                        </div>
                    </div>
                    </a>
                </li>
            `);
            var vanban_new = result.TrichYeu;
            if (vanban_new.length > 80) {
                var catchuoi_vanban_new = vanban_new.substring(0, 80) + "...";
                $('.vanban-text').text(catchuoi_vanban_new);
            }
        }
    } else {
        $('#list-vanbannew').append(`
            <div style="text-align:center;">
                <img src="Images/vanban-empty.jpg" class="" id="vanban-empty"/>
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

function LoadTimKiem(NoiDung) {
    $('#content').html('');
    $('#content_pagination').html('');
    let GetAll = NTS.getAjax("/CongThongTinViecLam/VanBanCTT/getVanBan_TimKiem", { noidung: NoiDung });
    var anh = 'Content/CongThongTin/images/document-default.png';
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
            // Mã hóa URL bằng Base64 và ROT13
            var encodedURL = encodeURL(data.VanBanID);
            $('#content').append(`
                <div class="content_text">
                    <a href="/xem-chi-tiet-van-ban/${data.DinhDanh}.html?ma=${data.MaVanBan}" >
                        <div class="media">
                            <div class="row">
                                <div class="col-md-3 col-sm-3 col-xs-3">
                                    <img class="mr-3 img-rounded img-vanban" src="${anh}" alt="Generic placeholder image">
                                </div>
                                <div class="col-md-9 col-sm-9 col-xs-9">
                                    <div class="media-body">
                                        <h5 class="mt-0">${data.SoKyHieu}</h5>
                                        <div style="display:flex;margin-top:4px;">
                                            <p class="mr-6">Ngày ban hành: ${data.NgayBanHanh}</p>
                                            <p class="ml-6">Ngày có hiệu lực: ${data.NgayHieuLuc}</p>
                                        </div>
                                        <p>Loại văn bản: ${data.TenLoaiVanBan}</p>
                                        <p class="myParagraph">Trích yếu: ${data.TrichYeu}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `);
            var content = data.TrichYeu;
            if (content.length > 200) {
                const catchuoi_Content = content.substring(0, 200) + "...";
                $('.myParagraph').text(catchuoi_Content);
            }
        }
        ListPaginationVanBan(GetAll.length, page);
    }
    else {
        $('#content').append(`
            <div style="text-align:center;">
                 <img src="Images/vanban-empty.jpg" class="" id="vanban-empty" style="width: 300px; height: 200px;"/>
                <p style="color: #7f7d7d;">Chưa có thông tin</p>
                <br/>
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

async function LoadTinMoiNhat() {
    var result = await NTS.getAjaxAsync("CongThongTinViecLam/TrangChuCTT/GetTinTuyenDung_MoiNhat", {});
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
                                                        <p class="text-overflow-line1" style="font-size: 13px;">${data.DiaDiemLamViec.replace(/;$/, '').replace(/; $/, '')}</p>
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

async function LoadTinLuongCao() {
    var result = await NTS.getAjaxAsync("CongThongTinViecLam/TrangChuCTT/GetTinTuyenDung_LuongCao", {});
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
                                                        <h2 class="text-overflow-line1" style="font-size: 13px;">${data.ViTriTuyenDung}</h2>
                                                        <p class="text-overflow-line1" style="font-size: 13px;">${data.DiaDiemLamViec.replace(/;$/, '').replace(/; $/, '')}</p>
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
                <img src="Images/vanban-empty.jpg" class="" id="vanban-empty"/>
                <p style="color: #7f7d7d;">Hiện chưa có tin tuyển dụng</p>
            </div>
        `);
    }
}