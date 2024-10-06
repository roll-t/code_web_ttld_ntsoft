$(function () {
    NTS.loadDataCombo({
        name: '#TinhID_loc',
        ajaxUrl: 'CongThongTinViecLam/Function/getTinh',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '(Tất cả)',
        showTatCa: !0,
        indexDefault: 1,
    });
    NTS.loadDataCombo({
        name: '#DiaDiem_usBanner',
        ajaxUrl: '/CongThongTinViecLam/Function/getTinh',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '(Địa điểm - Tất cả)',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#NganhNghe_usBanner',
        ajaxUrl: '/CongThongTinViecLam/Function/getNganhNghe_CauLD',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '(Ngành nghề - Tất cả)',
        showTatCa: !0,
    });
    setTimeout(async function () {
        await LoadDanhSachNhaTuyenDung();
    }, 20)
    $('#TenCongTy_loc').keypress(function (e) {
        if (e.which === 13) { // Kiểm tra mã phím, 13 là mã phím cho phím Enter
            NoiDung = $('#TenCongTy_loc').val();
            eventsOccurred = true;
            var url = new URL(window.location.href);
            // Đặt hoặc cập nhật tham số
            url.searchParams.set('page', '1');
            // Thay thế URL hiện tại bằng URL đã được sửa đổi
            window.history.replaceState({}, '', url);
            LoadDanhSachNhaTuyenDung();
        }
    });
/*
    $('#TinhID_loc').select2();
    var maxSelection = 1;
    $('#TinhID_loc').on('select2:select', function (e) {
        var selectedValues = $(this).val();
        if (selectedValues.length > maxSelection) {
            NTS.canhbao("Bạn chỉ được chọn tối đa " + maxSelection + " giá trị!")
            var lastSelectedItem = e.params.data.id;
            var newValues = selectedValues.filter(function (value) {
                return value != lastSelectedItem;
            });
            $(this).val(newValues).trigger('change');
        }
    });*/
})
var anhDefault = '/Images/banner.jpg';


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
    var totalPages = Math.ceil(listNumber / 12);
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
        var endPage = Math.min(startPage + 3, totalPages);

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


$(document).on('click', '#btnTraCuu', async function () {
    var url = new URL(window.location.href);
    // Đặt hoặc cập nhật tham số
    url.searchParams.set('page', '1');
    // Thay thế URL hiện tại bằng URL đã được sửa đổi
    window.history.replaceState({}, '', url);
    await LoadDanhSachNhaTuyenDung();
})

async function LoadDanhSachNhaTuyenDung() {
    $('#list-nhatuyendung').html('');
    $('#content_pagination').html('');
    var mang = new Array();
    mang[0] = $('#TenCongTy_loc').value();
    mang[1] = $('#TinhID_loc').value(); //JSON.stringify($('#TinhID_loc').value());

    let SoLuong = await NTS.getAjaxAsync("/CongThongTinViecLam/TraCuuNhaTuyenDung/GetSoLuongNhaTuyenDung", { data: mang });
    if (SoLuong.length > 0) {
        $('#SoLuong_CongTy').html(`(${SoLuong[0].SoLuong})`)
    } else {
        $('#SoLuong_CongTy').html(``)
    }

    let GetAll = await NTS.getAjaxAsync("/CongThongTinViecLam/TraCuuNhaTuyenDung/GetAllNhaTuyenDung", { data: mang });
    debugger
    if (GetAll && GetAll.length > 0) { // Kiểm tra GetAll có tồn tại và không rỗng

        var page = getUrlParameter('page');
        if (page == false) {
            page = 1;
        }
        var RowData = 12;
        var startIndex = (page * RowData) - RowData;
        var endIndex = Math.min(GetAll.length, (page * RowData));
        for (var i = startIndex; i < endIndex; i++) {
            let data = GetAll[i];
            // Mã hóa URL bằng Base64 và ROT13
            var encodedURL = encodeURL(data.NhaTuyenDungCTTID);
            $('#list-nhatuyendung').append(`<div class="col-md-6 col-lg-3">
                            <div class="card card-company border-0 bg-white">
                                <div class="card-header p-2 bg-transparent border-bottom-0 rounded-0">
                                    <a href="/xem-chi-tiet-nha-tuyen-dung/${data.DinhDanh}.html?p=${data.MaNhaTuyenDung}" class="d-block card-image">
                                        <img src="${data.Banner.replaceAll("*", "").replaceAll("~", "") == "" ? anhDefault : data.Banner.replaceAll("*", "").replaceAll("~", "")}" class="img-fluid" alt="${data.TenNhaTuyenDung}">
                                    </a>
                                </div>
                                <div class="card-body pt-0 px-3 pb-2">
                                    <div class="card-top">
                                        <div class="card-avatar">
                                            <a href="/xem-chi-tiet-nha-tuyen-dung/${data.DinhDanh}.html?p=${data.MaNhaTuyenDung}" class='d-block'>
                                                <img src="${data.Logo.replaceAll("*", "").replaceAll("~", "") == "" ? anhDefault : data.Logo.replaceAll("*", "").replaceAll("~", "")}" class="img-fluid" alt="${data.TenNhaTuyenDung}">
                                            </a>
                                        </div>
                                        <div class="card-follow">
                                            <i class="fas fa-users mr-1"></i>
                                            ${SoluongTheoDoiNTD(data.NhaTuyenDungCTTID)} lượt theo dõi
                                        </div>
                                    </div>
                                    <h2 class="card-title">
                                        <a href="/xem-chi-tiet-nha-tuyen-dung/${data.DinhDanh}.html?p=${data.MaNhaTuyenDung}" class="d-block">
                                            ${data.TenNhaTuyenDung}
                                        </a>
                                    </h2>
                                    <div class="card-text">
                                        <h3 class="card-text_item mb-0 fw-400 text-1-row" title="${capitalizeFirstLetter(data.NganhNghe.toLowerCase())}">
                                            <i class='fas fa-briefcase'></i>${capitalizeFirstLetter(data.NganhNghe.toLowerCase())}
                                        </h3>
                                        <div class="card-text_item">
                                            <i class='fas fa-tasks'></i>${SoluongTinTuyenDung(data.MaNhaTuyenDung)} việc làm
                                        </div>
                                    </div>
                                    <div class="card-button">
                                        <button type="button" data-id="${data.NhaTuyenDungCTTID}" data-type="nofollow" data-id="1041" class="button-theme button-orange btn-sm w-100 size-09rem rounded-lg btnFollow btn-theodoi">
                                            <svg fill="#ffffff" width="14px" height="14px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.8960000000000001"></g><g id="SVGRepo_iconCarrier"> <title>signal-stream</title> <path d="M16 11.75c-2.347 0-4.25 1.903-4.25 4.25s1.903 4.25 4.25 4.25c2.347 0 4.25-1.903 4.25-4.25v0c-0.003-2.346-1.904-4.247-4.25-4.25h-0zM16 17.75c-0.966 0-1.75-0.784-1.75-1.75s0.784-1.75 1.75-1.75c0.966 0 1.75 0.784 1.75 1.75v0c-0.001 0.966-0.784 1.749-1.75 1.75h-0zM3.25 16c0.211-3.416 1.61-6.471 3.784-8.789l-0.007 0.008c0.223-0.226 0.361-0.536 0.361-0.879 0-0.69-0.56-1.25-1.25-1.25-0.344 0-0.655 0.139-0.881 0.363l0-0c-2.629 2.757-4.31 6.438-4.506 10.509l-0.001 0.038c0.198 4.109 1.879 7.79 4.514 10.553l-0.006-0.006c0.226 0.228 0.54 0.369 0.886 0.369 0.69 0 1.249-0.559 1.249-1.249 0-0.346-0.141-0.659-0.368-0.885l-0-0c-2.173-2.307-3.573-5.363-3.774-8.743l-0.002-0.038zM9.363 16c0.149-2.342 1.109-4.436 2.6-6.026l-0.005 0.005c0.224-0.226 0.363-0.537 0.363-0.88 0-0.69-0.56-1.25-1.25-1.25-0.345 0-0.657 0.139-0.883 0.365l0-0c-1.94 2.035-3.179 4.753-3.323 7.759l-0.001 0.028c0.145 3.032 1.384 5.75 3.329 7.79l-0.005-0.005c0.226 0.228 0.54 0.369 0.886 0.369 0.69 0 1.249-0.559 1.249-1.249 0-0.346-0.141-0.659-0.368-0.885l-0-0c-1.49-1.581-2.451-3.676-2.591-5.993l-0.001-0.027zM26.744 5.453c-0.226-0.227-0.54-0.368-0.886-0.368-0.691 0-1.251 0.56-1.251 1.251 0 0.345 0.139 0.657 0.365 0.883l-0-0c2.168 2.31 3.567 5.365 3.775 8.741l0.002 0.040c-0.21 3.417-1.609 6.471-3.784 8.789l0.007-0.008c-0.224 0.226-0.362 0.537-0.362 0.88 0 0.691 0.56 1.251 1.251 1.251 0.345 0 0.657-0.14 0.883-0.365l-0 0c2.628-2.757 4.308-6.439 4.504-10.509l0.001-0.038c-0.198-4.108-1.878-7.79-4.512-10.553l0.006 0.007zM21.811 8.214c-0.226-0.224-0.537-0.363-0.881-0.363-0.69 0-1.25 0.56-1.25 1.25 0 0.343 0.138 0.653 0.361 0.879l-0-0c1.486 1.585 2.447 3.678 2.594 5.992l0.001 0.028c-0.151 2.343-1.111 4.436-2.601 6.027l0.005-0.005c-0.224 0.226-0.362 0.537-0.362 0.88 0 0.691 0.56 1.251 1.251 1.251 0.345 0 0.657-0.14 0.883-0.365l-0 0c1.939-2.036 3.178-4.754 3.323-7.759l0.001-0.028c-0.145-3.033-1.385-5.751-3.331-7.791l0.005 0.005z"></path> </g></svg> ${KiemTraLuuTruNhaTuyenDung(data.NhaTuyenDungCTTID) == `1` ? `Đang theo dõi` : `Theo dõi`}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
            `);            
        }
        ListPaginationVanBan(GetAll.length, page);
    }
    else {
        $('#list-nhatuyendung').append(`
            <div style="text-align:center;">
                  <img src="/Images/CongThongTinViecLam/vanban-empty.jpg" class="" id="vanban-empty"/>
                <p style="color: #7f7d7d;">Chưa có thông tin</p>
                <br/><br/>
            </div>
        `);
    }
}


function LoadDanhSachTuyenDung(id) {
    var stringHTML = "";
    var mang = new Array();
    mang[0] = id;
    mang[1] = "";
    let GetAll = NTS.getAjax("/CongThongTinViecLam/ChiTietNhaTuyenDung/GetCongViecDangTuyenDung", { data: mang });
    if (GetAll && GetAll.length > 0) { // Kiểm tra GetAll có tồn tại và không rỗng

        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            // Mã hóa URL bằng Base64 và ROT13
            var encodedURL = encodeURL(data.TinTuyenDungID);
            stringHTML += `
                <div class="congviec-item">
                    <div class="congviec-content">
                        <div class="congviec-header">
                            <div>
                                <a href="/xem-chi-tiet-viec-lam.html?p=${encodedURL}" class="congviec-title">${data.ViTriTuyenDung} </a>
                            </div>
                            <div>
                                <span class="btn-ungtuyen ${KiemTraUngTuyen(data.TinTuyenDungID) == `1` ? `btn-DaUngTuyen` : ``} btn-primary" data-id="${data.TinTuyenDungID}">${KiemTraUngTuyen(data.TinTuyenDungID) == `1` ? `Đã ứng tuyển` : `Ứng tuyển`}</span>
                            </div>
                        </div>
                        <div class="congviec-info">
                            <div style="display: flex; gap: 0 10px">
                                    <span class="congviec-info-label"><i class="fa-solid fa-location-dot"></i>&nbsp; <span>${data.TenDiaDiem}</span></span>
                                <span class="congviec-info-label"><i class="fa-solid fa-money-bill"></i>&nbsp; <span>${data.MucLuongID}</span></span>
                                <span class="congviec-info-label"><i class="fa-solid fa-calendar-days"></i>&nbsp; <span>Hạn nộp: ${data.HanNop}</span></span>
                            </div>
                                
                           <div>
                                <i class="${KiemTraLuuTruViecLam(data.TinTuyenDungID) == `1` ? `fa-solid btn-DaLuuTin` : `fa-regular`}  fa-heart btn-luutru" data-id="${data.TinTuyenDungID}"></i>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    else {
        stringHTML = `
            <div style="text-align:center;">
                <img src="/Images/CongThongTinViecLam/vanban-empty.jpg" class="" id="vanban-empty"/>
                <p style="color: #7f7d7d;">Chưa có tin tuyển dụng</p>
            </div>
        `;
    }
    return stringHTML;
}


$(document).on('click', '.btn-ungtuyen', async function () {
    let resultKT = await NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/KiemTraDangNhap", {});
    if (resultKT == "2") {
        NTS.canhbao("Vui lòng đăng nhập để thực hiện thao tác!");
        return false;
    }
    //kiểm tra đã có đăng nhập chưa
    let TinTuyenDungID = $(this).attr('data-id');
    let result = UngTuyenViecLam(TinTuyenDungID);
    if (result == "1") {

        let resultTrangThai = await KiemTraUngTuyen(TinTuyenDungID);
        if (resultTrangThai == "1") {
            $(this).addClass('btn-DaUngTuyen')
            $(this).html(`Đã ứng tuyển`)
            NTS.thanhcong("Ứng tuyển thành công!")
        } else {
            $(this).removeClass('btn-DaUngTuyen')
            $(this).html(`Ứng tuyển`)
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

$(document).on('click', '.btn-luutru', async function () {
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


/// Tìm kiếm
$(document).on('click', '#btn-search-submit', function () {
    var kv = $('#DiaDiem_usBanner').value();
    var nn = $('#NganhNghe_usBanner').value();
    window.location.href = '/tra-cuu-viec-lam.html?p=' + $('#ViecLam_Loc_us').value() + '&q=' + encodeURL(kv == '(Địa điểm - Tất cả)' ? '' : kv) + '&nganhnghe=' + encodeURL(nn == '(Ngành nghề - Tất cả)' ? '' : nn)
});

$('#ViecLam_Loc_us').keypress(function (e) {
    if (e.which === 13) { // Kiểm tra mã phím, 13 là mã phím cho phím Enter
        var kv = $('#DiaDiem_usBanner').value();
        var nn = $('#NganhNghe_usBanner').value();
        window.location.href = '/tra-cuu-viec-lam.html?p=' + $('#ViecLam_Loc_us').value() + '&q=' + encodeURL(kv == '(Địa điểm - Tất cả)' ? '' : kv) + '&nganhnghe=' + encodeURL(nn == '(Ngành nghề - Tất cả)' ? '' : nn)
    }
});

$(document).on('click', '.map_link', function () {
    var kv = $(this).attr('data');
    window.location.href = '/tra-cuu-viec-lam.html?p=' + $('#ViecLam_Loc_us').value() + '&q=' + encodeURL(kv)
})

$(document).on('click', '.item-nghenghiep', function () {
    var kv = $('#DiaDiem_usBanner').value();
    var ngheNghiep = $(this).attr('data-value');
    window.location.href = '/tra-cuu-viec-lam.html?p=' + $('#ViecLam_Loc_us').value() + '&q=' + encodeURL(kv == '(Địa điểm - Tất cả)' ? '' : kv) + '&n=' + ngheNghiep
})

// Hàm viết hoa chữ cái đầu tiên của chuỗi
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

//Theo doi nha tuyen dung
$(document).on('click', '.btn-theodoi', function () {
    debugger
    let resultKT = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/KiemTraDangNhap", {});
    if (resultKT == "2") {
        NTS.canhbao("Vui lòng đăng nhập để thực hiện thao tác!");
        return false;
    }
    if (resultKT[0].NhomNguoiDung == 'NhaTuyenDung') {
        NTS.canhbao("User của bạn không thể thực hiện thao tác này!");
        return false;
    }

    //kiểm tra đã có đăng nhập chưa
    let NhaTuyenDungID = $(this).attr('data-id');

    let result = LuuTruNhaTuyenDung(NhaTuyenDungID);
    if (result == "1") {

        let resultTrangThai = KiemTraLuuTruNhaTuyenDung(NhaTuyenDungID);
        if (resultTrangThai == "1") {
            $(this).html(`<svg fill="#ffffff" width="14px" height="14px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.8960000000000001"></g><g id="SVGRepo_iconCarrier"> <title>signal-stream</title> <path d="M16 11.75c-2.347 0-4.25 1.903-4.25 4.25s1.903 4.25 4.25 4.25c2.347 0 4.25-1.903 4.25-4.25v0c-0.003-2.346-1.904-4.247-4.25-4.25h-0zM16 17.75c-0.966 0-1.75-0.784-1.75-1.75s0.784-1.75 1.75-1.75c0.966 0 1.75 0.784 1.75 1.75v0c-0.001 0.966-0.784 1.749-1.75 1.75h-0zM3.25 16c0.211-3.416 1.61-6.471 3.784-8.789l-0.007 0.008c0.223-0.226 0.361-0.536 0.361-0.879 0-0.69-0.56-1.25-1.25-1.25-0.344 0-0.655 0.139-0.881 0.363l0-0c-2.629 2.757-4.31 6.438-4.506 10.509l-0.001 0.038c0.198 4.109 1.879 7.79 4.514 10.553l-0.006-0.006c0.226 0.228 0.54 0.369 0.886 0.369 0.69 0 1.249-0.559 1.249-1.249 0-0.346-0.141-0.659-0.368-0.885l-0-0c-2.173-2.307-3.573-5.363-3.774-8.743l-0.002-0.038zM9.363 16c0.149-2.342 1.109-4.436 2.6-6.026l-0.005 0.005c0.224-0.226 0.363-0.537 0.363-0.88 0-0.69-0.56-1.25-1.25-1.25-0.345 0-0.657 0.139-0.883 0.365l0-0c-1.94 2.035-3.179 4.753-3.323 7.759l-0.001 0.028c0.145 3.032 1.384 5.75 3.329 7.79l-0.005-0.005c0.226 0.228 0.54 0.369 0.886 0.369 0.69 0 1.249-0.559 1.249-1.249 0-0.346-0.141-0.659-0.368-0.885l-0-0c-1.49-1.581-2.451-3.676-2.591-5.993l-0.001-0.027zM26.744 5.453c-0.226-0.227-0.54-0.368-0.886-0.368-0.691 0-1.251 0.56-1.251 1.251 0 0.345 0.139 0.657 0.365 0.883l-0-0c2.168 2.31 3.567 5.365 3.775 8.741l0.002 0.040c-0.21 3.417-1.609 6.471-3.784 8.789l0.007-0.008c-0.224 0.226-0.362 0.537-0.362 0.88 0 0.691 0.56 1.251 1.251 1.251 0.345 0 0.657-0.14 0.883-0.365l-0 0c2.628-2.757 4.308-6.439 4.504-10.509l0.001-0.038c-0.198-4.108-1.878-7.79-4.512-10.553l0.006 0.007zM21.811 8.214c-0.226-0.224-0.537-0.363-0.881-0.363-0.69 0-1.25 0.56-1.25 1.25 0 0.343 0.138 0.653 0.361 0.879l-0-0c1.486 1.585 2.447 3.678 2.594 5.992l0.001 0.028c-0.151 2.343-1.111 4.436-2.601 6.027l0.005-0.005c-0.224 0.226-0.362 0.537-0.362 0.88 0 0.691 0.56 1.251 1.251 1.251 0.345 0 0.657-0.14 0.883-0.365l-0 0c1.939-2.036 3.178-4.754 3.323-7.759l0.001-0.028c-0.145-3.033-1.385-5.751-3.331-7.791l0.005 0.005z"></path> </g></svg> Đã theo dõi`);
            NTS.thanhcong("Theo dõi nhà tuyển dụng thành công!")

        } else {
            $(this).html(`<svg fill="#ffffff" width="14px" height="14px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.8960000000000001"></g><g id="SVGRepo_iconCarrier"> <title>signal-stream</title> <path d="M16 11.75c-2.347 0-4.25 1.903-4.25 4.25s1.903 4.25 4.25 4.25c2.347 0 4.25-1.903 4.25-4.25v0c-0.003-2.346-1.904-4.247-4.25-4.25h-0zM16 17.75c-0.966 0-1.75-0.784-1.75-1.75s0.784-1.75 1.75-1.75c0.966 0 1.75 0.784 1.75 1.75v0c-0.001 0.966-0.784 1.749-1.75 1.75h-0zM3.25 16c0.211-3.416 1.61-6.471 3.784-8.789l-0.007 0.008c0.223-0.226 0.361-0.536 0.361-0.879 0-0.69-0.56-1.25-1.25-1.25-0.344 0-0.655 0.139-0.881 0.363l0-0c-2.629 2.757-4.31 6.438-4.506 10.509l-0.001 0.038c0.198 4.109 1.879 7.79 4.514 10.553l-0.006-0.006c0.226 0.228 0.54 0.369 0.886 0.369 0.69 0 1.249-0.559 1.249-1.249 0-0.346-0.141-0.659-0.368-0.885l-0-0c-2.173-2.307-3.573-5.363-3.774-8.743l-0.002-0.038zM9.363 16c0.149-2.342 1.109-4.436 2.6-6.026l-0.005 0.005c0.224-0.226 0.363-0.537 0.363-0.88 0-0.69-0.56-1.25-1.25-1.25-0.345 0-0.657 0.139-0.883 0.365l0-0c-1.94 2.035-3.179 4.753-3.323 7.759l-0.001 0.028c0.145 3.032 1.384 5.75 3.329 7.79l-0.005-0.005c0.226 0.228 0.54 0.369 0.886 0.369 0.69 0 1.249-0.559 1.249-1.249 0-0.346-0.141-0.659-0.368-0.885l-0-0c-1.49-1.581-2.451-3.676-2.591-5.993l-0.001-0.027zM26.744 5.453c-0.226-0.227-0.54-0.368-0.886-0.368-0.691 0-1.251 0.56-1.251 1.251 0 0.345 0.139 0.657 0.365 0.883l-0-0c2.168 2.31 3.567 5.365 3.775 8.741l0.002 0.040c-0.21 3.417-1.609 6.471-3.784 8.789l0.007-0.008c-0.224 0.226-0.362 0.537-0.362 0.88 0 0.691 0.56 1.251 1.251 1.251 0.345 0 0.657-0.14 0.883-0.365l-0 0c2.628-2.757 4.308-6.439 4.504-10.509l0.001-0.038c-0.198-4.108-1.878-7.79-4.512-10.553l0.006 0.007zM21.811 8.214c-0.226-0.224-0.537-0.363-0.881-0.363-0.69 0-1.25 0.56-1.25 1.25 0 0.343 0.138 0.653 0.361 0.879l-0-0c1.486 1.585 2.447 3.678 2.594 5.992l0.001 0.028c-0.151 2.343-1.111 4.436-2.601 6.027l0.005-0.005c-0.224 0.226-0.362 0.537-0.362 0.88 0 0.691 0.56 1.251 1.251 1.251 0.345 0 0.657-0.14 0.883-0.365l-0 0c1.939-2.036 3.178-4.754 3.323-7.759l0.001-0.028c-0.145-3.033-1.385-5.751-3.331-7.791l0.005 0.005z"></path> </g></svg> Theo dõi`)
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
function SoluongTinTuyenDung(Ma) {
    var GetAll = NTS.getAjax("/CongThongTinViecLam/ChiTietNhaTuyenDung/GetSoLuongNhaTuyenDung", { ma: Ma });
    if (GetAll.length > 0) {
        let data = GetAll[0];
        return data.soluongTinTuyenDung;
    }
}
function SoluongTheoDoiNTD(ID) {
    var GetAll = NTS.getAjax("/CongThongTinViecLam/ChiTietNhaTuyenDung/GetSoLuongTheoDoiNhaTuyenDung", { id: ID });
    if (GetAll.length > 0) {
        let data = GetAll[0];
        return data.SoLuongTheoDoiNTD;
    }
}