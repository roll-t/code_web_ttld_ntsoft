var NoiDung = '';

$(document).ready(function () {
    LoadTimKiem(NoiDung);
    LoadCamNangTop1();
    // Bắt sự kiện khi nhấn phím Enter trong ô input tìm kiếm
    $('#TimKiem').keypress(function (e) {
        if (e.which == 13) { // 13 là mã phím cho phím Enter
            NoiDung = $(this).val(); // Lấy giá trị từ ô input
            LoadTimKiem(NoiDung); // Gọi hàm LoadTimKiem với giá trị tìm kiếm
        }
    });
    getTinTucNoiBat();
});


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
    var totalPages = Math.ceil(listNumber / 12); // Tính toán tổng số trang
    var currentURL = window.location.href.split('?')[0];
    var pParam = getUrlParameter('p'); // Lấy tham số 'p' từ URL

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
        var endPage = Math.min(startPage + 4, totalPages); // Chỉ hiển thị tối đa 5 trang và không vượt quá tổng số trang

        var paginationHTML = `
            <div class="row" style="display:flex;justify-content:center; margin:20px 0;" id="pagination">
                <nav aria-label="Page navigation example">
                    <ul class="pagination" id="list-pagination">
                        <li class="page-item ${(page == 1) ? 'disabled' : ''}">
                            <a class="page-link" href="${(page == 1) ? '#' : currentURL + '?p=' + pParam + '&page=' + (page - 1)}" onclick="if (!$(this).parent().hasClass('disabled')) { location.href='${(page == 1) ? '#' : currentURL + '?p=' + pParam + '&page=' + (page - 1)}'; }" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>`;

        for (var i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <li class="page-item ${(i == page) ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="if (!$(this).parent().hasClass('disabled')) { location.href='${currentURL}?p=${pParam}&page=${i}'; }">${i}</a>
                </li>`;
        }

        paginationHTML += `
                        <li class="page-item ${(page == totalPages) ? 'disabled' : ''}">
                            <a class="page-link" href="${(page == totalPages) ? '#' : currentURL + '?p=' + pParam + '&page=' + (page + 1)}" onclick="if (!$(this).parent().hasClass('disabled')) { location.href='${(page == totalPages) ? '#' : currentURL + '?p=' + pParam + '&page=' + (page + 1)}'; }" aria-label="Next">
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


async function LoadTimKiem(noiDung) {
    $('#content').html('');
    $('#content_pagination').html('');
    var url_string = window.location;
    var url = new URL(url_string);
    var ma = url.searchParams.get("p");
    var param = new Array();
    param[0] = noiDung;
    param[1] = ma;
    let result = await NTS.getAjaxAsync("CamNangNgheNghiep/DanhMucCamNangNgheNghiep/GetCamNangTheoLoai", { noidung: param });
    if (!result.Err && result.Result != null) {
        let data = result.Result;
        if (data.length > 0) {
            var page = getUrlParameter('page');
            if (page == false) {
                page = 1;
            }

            var RowData = 12;
            var startIndex = (page * RowData) - RowData;
            var endIndex = Math.min(result.Result.length, (page * RowData));
            for (var i = startIndex; i < endIndex; i++) {
                let data = result.Result[i];
                let img = (data.TenHinhAnh).split('*')[0];
                if (img == '' || img == undefined || img == null) {
                    img = '/Images/news-defaut.jpg';
                }
                // Mã hóa URL bằng Base64 và ROT13
                $('#content').append(`
                    <div class="col-md-4">
                        <div class="item_camnang">
                            <a href="/chi-tiet-cam-nang.html?p=${data.TenDinhDanhTT}">
                                <div style="width:100%;height:90%;">
                                    <img src="${img}" class="item_camnang-img" />
                                </div>
                                <div class="item_camnang-tieude">
                                    <a href="/chuyen-muc-cam-nang-nghe-nghiep.html?p=${data.TenMaLoaiTT}" style="text-transform:uppercase;">${data.TenLoaiTT}</a>
                                    <h3 style="margin-top:10px;"> <a href="/chi-tiet-cam-nang.html?p=${data.TenDinhDanhTT}" class="item_camnang-tieude-h3">${data.TenTieuDe} </a></h3>
                                </div>
                            </a>
                        </div>
                    </div>
                `);
            }
            ListPaginationVanBan(result.Result.length, page);
        } else {
            $('#content').append(`
                <div style="text-align:center;">
                    <img src="/Images/vanban-empty.jpg" class="" id="vanban-empty"/>
                </div>
            `);
        }
    } else {
        $('#content').append(`
                <div style="text-align:center;">
                    <img src="/Images/vanban-empty.jpg" class="" id="vanban-empty"/>
                </div>
            `);
    }
}

function LoadCamNangTop1() {
    $('#item_dautien').html('');
    var url_string = window.location;
    var url = new URL(url_string);
    var ma = url.searchParams.get("p");
    let result = NTS.getAjax("CamNangNgheNghiep/DanhMucCamNangNgheNghiep/GetCamNangTheoLoaiTop1", { noidung: ma });
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
                $('#item_dautien').append(`
                   <div class="col-md-6">
                        <a href="/chi-tiet-cam-nang.html?p=${data.TenDinhDanhTT}" style="width:100%; height:100%;">
                            <img src="${img}" id="item_top" />
                        </a>
                    </div>
                    <div class="col-md-6">
                        <div class="item_top-title" style="text-transform:uppercase;">
                            <a href="/chuyen-muc-cam-nang-nghe-nghiep.html?p=${data.TenMaLoaiTT}" class="item_top-title-link">
                                ${data.TenLoaiTT}
                            </a>
                        </div>
                        <h3 style="margin-top:16px;">
                            <a href="/chi-tiet-cam-nang.html?p=${data.TenDinhDanhTT}" class="item_top-title-camnang">
                                ${data.TenTieuDe}
                            </a>
                        </h3>
                        <p style="margin-top: 12px; color: #999; width: 100%; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">
                            ${data.NoiDungTomTat}
                        </p>
                    </div>
                `);
            }
        } else {
            $('#item_dautien').append(``);
        }
    } else {
        $('#item_dautien').append(``);
    }
}

function getTinTucNoiBat() {
    var GetAll = NTS.getAjax_NoVerifi("/CamNangNgheNghiep/TongQuanCamNang/getTinTucCamNangNoiBat", {});
    if (GetAll.length > 0) {
        var biendem = 1;
        for (var i = 0; i < Math.min(GetAll.length,10); i++) { // lay 4 tin tuc noi bat moi nhat
            let data = GetAll[i];
            let imgArr = data.HinhAnh.split('*');
            let img = "";
            if (imgArr.length > 0) {
                img = imgArr[0];
            }
            if (img == '' || img == undefined || img == null) {
                img = '/Images/news-defaut.jpg';
            }
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