$(function () {
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
    //$('.selNganhNgheTimKiem .select2-selection').addClass('text-1-row');
    //$('.selNganhNgheTimKiem .select2-selection__rendered').css('display', 'flex');

    
    setTimeout(async function () {
        if (getUrlParameter('v') == "phuhop") {
            $('#checkbox-quantam').prop('checked', true);
        }
        await LoadDanhSachViecLam();
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
            LoadDanhSachViecLam();
        }
    });
    //LoadNganhNgheYeuCau();
    LoadMucLuongYeuCau();
    LoadCapBac();
    LoadKinhNghiem();
    LoadHinhThucLamViec();
    LoadTrinhDoHocVan();
    LoadDoiTuongUuTien();
    var accordion = document.getElementsByClassName("accordion");

    for (let i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener("click", function () {
            // Thu gọn tất cả các accordion khác
            for (let j = 0; j < accordion.length; j++) {
                if (accordion[j] !== this) { // Kiểm tra nếu không phải chính cái đang click
                    accordion[j].classList.remove("active");
                    accordion[j].nextElementSibling.style.maxHeight = null;
                }
            }

            // Toggle accordion hiện tại
            this.classList.toggle("active");
            var details = this.nextElementSibling;
            if (details.style.maxHeight) {
                details.style.maxHeight = null;
            } else {
                details.style.maxHeight = details.scrollHeight + "px";
            }
        });
    }
    var DiaDiemTuyen = !getUrlParameter('q') ? "" : decodeURL(getUrlParameter('q'));
    LoadGoiYSoLuongViecLam(DiaDiemTuyen);
})
var anhDefault = '~/Images/banner.jpg';

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

function ListPaginationDanhSach(listNumber, page) {
    var totalPages = Math.ceil(listNumber / 30);
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
    await LoadDanhSachViecLam();
})

function LoadGoiYSoLuongViecLam(ID) {
    let GetAll = NTS.getAjax("/CongThongTinViecLam/TraCuuViecLam/GetSoLuongViecLamTheoDiaBan", { id: ID }).Result;
    if (GetAll != null) {
        if (GetAll.length > 0) {
            for (var i = 0; i < GetAll.length; i++) {
                let data = GetAll[i];
                $('.box_map-content').append(`
                   <a href="#" data="${data.DiaBanHCID}" class="map_link">${data.TenDiaDiem}<span>(${data.SoLuongViec})</span></a>
                `);
            }
        }
    }
}

async function LoadDanhSachViecLam() {
    $('#list-vieclam').html('');
    $('#content_pagination').html('');

    // Kiểm tra giá trị của 'q' trong URL
    let diaBan = getUrlParameter('q');

    if (!diaBan || diaBan === "") {
        // Nếu 'q' không có giá trị hoặc trống
        $('.map-title').css({ "display": "none" });
    } else {
        // Nếu 'q' có giá trị
        $('.map-title').css({ "display": "flex" });
    }

    var mang = new Array();
    mang[0] = !getUrlParameter('q') ? "" : decodeURL(getUrlParameter('q'));
    !getUrlParameter('q') ? $("#DiaDiem_usBanner").value("(Địa điểm - Tất cả)") : $("#DiaDiem_usBanner").value(decodeURL(getUrlParameter('q')));
    mang[1] = !getUrlParameter('p') ? "" : getUrlParameter('p');
    mang[2] = $("input[name='checkbox-filter']:checked").val();
    !getUrlParameter('p') ? $("#ViecLam_Loc_us").value("") : $("#ViecLam_Loc_us").value(getUrlParameter('p'));
    //if ($("input[name='checkbox-filter']:checked").val() == '3') {
    //    let resultKT = await NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/KiemTraDangNhap", {});
    //    if (resultKT == "2") {
    //        NTS.canhbao("Vui lòng đăng nhập để lấy danh sách việc làm phù hợp!");
    //    }
    //    if (resultKT[0].NhomNguoiDung == "NhaTuyenDung") {
    //        NTS.canhbao("Chỉ tài khoản ứng viên có thể xem danh sách việc làm phù hợp!");
    //    }
    //}
    var MucLuongLoc = $('input[name="checkbox-mucluong"]:checkbox:checked').map(function () {
        return this.value;
    }).get();
    mang[3] = JSON.stringify(MucLuongLoc);

    var CapBacLoc = $('input[name="checkbox-capbac"]:checkbox:checked').map(function () {
        return this.value;
    }).get();
    mang[4] = JSON.stringify(CapBacLoc);
    var KinhNghiemLoc = $('input[name="checkbox-kinhnghiem"]:checkbox:checked').map(function () {
        return this.value;
    }).get();
    mang[5] = JSON.stringify(KinhNghiemLoc);

    var HinhThucLoc = $('input[name="checkbox-hinhthuc"]:checkbox:checked').map(function () {
        return this.value;
    }).get();
    mang[6] = JSON.stringify(HinhThucLoc);

    var TrinhDoLoc = $('input[name="checkbox-trinhdo"]:checkbox:checked').map(function () {
        return this.value;
    }).get();
    mang[7] = JSON.stringify(TrinhDoLoc);

    var DoiTuongLoc = $('input[name="checkbox-doituonguutien"]:checkbox:checked').map(function () {
        return this.value;
    }).get();
    mang[8] = JSON.stringify(DoiTuongLoc);
    mang[9] = !getUrlParameter('n') ? "" : (getUrlParameter('n'));
    //var NganhNgheLoc = $('input[name="checkbox-nghenghiep"]:checkbox:checked').map(function () {
    //    return this.value;
    //}).get();
    mang[10] = !getUrlParameter('nganhnghe') ? "" : decodeURL(getUrlParameter('nganhnghe'));
    !getUrlParameter('nganhnghe') ? $("#NganhNghe_usBanner").value("(Ngành nghề - Tất cả)") : $("#NganhNghe_usBanner").value(decodeURL(getUrlParameter('nganhnghe')));
    let GetAll = await NTS.getAjaxAsync("CongThongTinViecLam/TraCuuViecLam/GetCongViecDangTuyenDung", { data: mang });
    if (GetAll && GetAll.length > 0) { // Kiểm tra GetAll có tồn tại và không rỗng
        $('#SL_ViecLam').html(GetAll.length)
        var page = getUrlParameter('page');
        if (page == false) {
            page = 1;
        }
        var RowData = 30;
        var startIndex = (page * RowData) - RowData;
        var endIndex = Math.min(GetAll.length, (page * RowData));
        for (var i = startIndex; i < endIndex; i++) {
            let data = GetAll[i];
            // Mã hóa URL bằng Base64 và ROT13
            var encodedURL = encodeURL(data.TinTuyenDungID);

            // Định dạng ngày của bạn
            var strResult = "";
            var givenDateStr = data.NgayDang;

            // Chuyển đổi chuỗi thành đối tượng Date
            var givenDateParts = givenDateStr.split('/');
            var givenDate = new Date(givenDateParts[2], givenDateParts[1] - 1, givenDateParts[0]);

            // Lấy ngày hiện tại
            var today = new Date();
            today.setHours(0, 0, 0, 0);  // Đặt giờ phút giây thành 0 để chỉ so sánh ngày

            // So sánh ngày
            if (givenDate > today) {
                strResult = "Hôm nay";
            } else {
                var timeDifference = today - givenDate;
                var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                if (daysDifference == 0) {
                    strResult = "Hôm nay";
                } else {
                    strResult = daysDifference + " ngày";
                }
            }
            $('#list-vieclam').append(`
                 <div class="congviec-item">
                        <div class="box-item-viec-lam">
                            <div class="avatar">
                                <img src="${data.HinhAnhCongTy.replaceAll("*", "").replaceAll("~", "")}" />

                            </div>
                            <div class="congviec-content">
                                <div class="congviec-header">
                                    <div>
                                        <div class="tooltip-custom" style="margin-bottom: 7px;">
                                            <a href="/xem-chi-tiet-viec-lam/${data.DinhDanh}.html?p=${data.MaViecTimNguoi}" class="congviec-title text-1-row">${checkNullString(data.ViTriTuyenDung)} </a>
                                            <div class="right tooltip-container">
                                                <div class="view-container">
                                                    <div class="view-content">
                                                        <div class="row">
                                                            <div class="col-md-2">
                                                                <div class="view-logo">
                                                                    <img src="${data.HinhAnhCongTy.replaceAll(" *", "").replaceAll("~", "") == "" ? anhDefault : data.HinhAnhCongTy.replaceAll("*", "").replaceAll("~", "")}" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-10">
                                                                <div>
                                                                    <h5 style="margin-bottom: 4px;" class="view-tencongty ">${checkNullString(data.ViTriTuyenDung)}</h5>
                                                                    <h6 style="margin-bottom: 4px;" class="view-tencongty2 ">${checkNullString(data.TenCongTy)}</h6>
                                                                    <span class="view-mucluong">${data.MucLuongID}</span></span>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12">
                                                                <div style="" class="content-congty-hover">                                                                    
                                                                    <span class="congviec-info-label" title="${checkNullString(data.TenDiaDiem)}"><i class="fa-solid fa-location-dot"></i>&nbsp; <span class="text-1-row">${checkNullString(data.TenDiaDiem)}</span></span>
                                                                    <span class="congviec-info-label"><i class="fa-regular fa-clock"></i>&nbsp; <span>${checkNullString(data.HanNop)}</span></span>
                                                                    <span class="congviec-info-label"><i class="fa-solid fa-rotate"></i>&nbsp; <span>${checkNullString(strResult)}</span></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="view-body">
                                                        <h5 class="view-line-left">Mô tả công việc</h5>
                                                        <p class="view-gioithieu">${checkNullString(data.MoTaCongViec == ';' ? '' : data.MoTaCongViec)}</p>
                                                        <br />
                                                        <h5 class="view-line-left">Yêu cầu ứng viên</h5>
                                                        <p class="view-gioithieu">${checkNullString(data.YeuCauCongViec == ';' ? '' : data.YeuCauCongViec)}</p>
                                                        <br />
                                                        <h5 class="view-line-left">Quyền lợi</h5>
                                                        <p class="view-gioithieu">${checkNullString(data.CheDoPhucLoi == ';' ? '' : data.CheDoPhucLoi)}</p>
                                                        <br />
                                                        <h5 class="view-line-left">Hình thức làm việc</h5>
                                                        <p class="view-gioithieu">${checkNullString(data.HinhThucLamViecID == ';' ? '' : data.HinhThucLamViecID)}</p>
                                                        <br />
                                                        <h5 class="view-line-left">Địa điểm liên hệ</h5>
                                                        <p class="view-gioithieu">${checkNullString(data.DiaChi == ';' ? '' : data.DiaChi)}</p>
                                                        <br />
                                                    </div>
                                                    <div class="view-footer">
                                                         <div class="div-btnugntuyen">
                                                            <span class="btn-ungtuyen btn-ungtuyen-hover ${KiemTraUngTuyen(data.TinTuyenDungID) == `1` ? `btn-DaUngTuyen` : ``} btn-primary" data-id="${data.TinTuyenDungID}">${KiemTraUngTuyen(data.TinTuyenDungID) == `1` ? `Đã ứng tuyển` : `Ứng tuyển`}</span>
                                                        </div>
                                                        <a href="/xem-chi-tiet-viec-lam/${data.DinhDanh}.html?p=${data.MaViecTimNguoi}" class="btn-primary btn-xemchitiet-hover">Xem chi tiết</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <a class="TenCongTy text-1-row" href="/xem-chi-tiet-nha-tuyen-dung/${data.DinhDanhNTD}.html?p=${data.MaNhaTuyenDung}">${checkNullString(data.TenCongTy)}</a>
                                    </div>
                                    <div>
                                        <i class="${KiemTraLuuTruViecLam(data.TinTuyenDungID) == `1` ? `fa-solid btn-DaLuuTin` : `fa-regular`}  fa-heart btn-luutru" data-id="${data.TinTuyenDungID}"></i>
                                    </div>
                                </div>
                                <div class="congviec-info">
                                    <div style="display: flex; gap: 4px 10px; flex-wrap: wrap;justify-content: space-between;    width: 80%;">
                                        <span class="congviec-info-label">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
                                            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/>
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
                                        </svg>&nbsp; <span>${data.MucLuongID}</span></span>
                                        <span class="congviec-info-label" title="${checkNullString(data.TenDiaDiem)}"><i class="fa-solid fa-location-dot"></i>&nbsp; <span class="text-1-row">${checkNullString(data.TenDiaDiem)}</span></span>
                                        <span class="congviec-info-label"><i class="fa-regular fa-clock"></i>&nbsp; <span>${checkNullString(data.HanNop)}</span></span>
                                        <span class="congviec-info-label"><i class="fa-solid fa-rotate"></i>&nbsp; <span>${checkNullString(strResult)}</span></span>
                                    </div>
                                    <div>
                                        <span class="btn-ungtuyen ${KiemTraUngTuyen(data.TinTuyenDungID) == `1` ? `btn-DaUngTuyen` : ``} btn-primary" data-id="${data.TinTuyenDungID}">${KiemTraUngTuyen(data.TinTuyenDungID) == `1` ? `Đã ứng tuyển` : `Ứng tuyển`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            `);
        }
        ListPaginationDanhSach(GetAll.length, page);
    }
    else {
        $('#list-vieclam').append(`
            <div style="text-align:center;">
                  <img src="/Images/CongThongTinViecLam/vanban-empty.jpg" class="" id="vanban-empty" />
                <p style="color: #7f7d7d;">Chưa có thông tin</p>
                <br/><br/>
            </div>
        `);
        $('#SL_ViecLam').html(`0`)

    }
}



$(document).on('change', '.checkbox-input-right,.checkbox-input', async function () {
    await LoadDanhSachViecLam();
})

async function LoadNganhNgheYeuCau() {
    let GetAll = NTS.getAjax("/CongThongTinViecLam/Function/getNganhNghe_CauLD", {}).Result;
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            $('#list-nghenghiep').append(`
                <li class="checkbox-item-right">
                    <input class="checkbox-input-right" type="checkbox" name="checkbox-nghenghiep" id="checkbox-mucluong${i}" value="${data.NganhKinhTeID}">
                        <label class="checkbox-bg" for="checkbox-nghenghiep${i}">${checkNullString(data.TenNganhKinhTe)}</label>
                </li>
            `);
        }
    }
}

async function LoadMucLuongYeuCau() {
    let GetAll = NTS.getAjax("/CongThongTinViecLam/Function/getMucLuongYeuCau", {}).Result;
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            $('#list-mucluong').append(`
                <li class="checkbox-item-right">
                    <input class="checkbox-input-right" type="checkbox" name="checkbox-mucluong" id="checkbox-mucluong${i}" value="${data.MucLuongID}">
                        <label class="checkbox-bg" for="checkbox-mucluong${i}">${checkNullString(data.TenMucLuong)}</label>
                </li>
            `);
        }
    }
}

async function LoadCapBac() {
    let GetAll = NTS.getAjax("/CongThongTinViecLam/Function/getCapBac", {}).Result;
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            $('#list-capbac').append(`
                <li class="checkbox-item-right">
                    <input class="checkbox-input-right" type="checkbox" name="checkbox-capbac" id="checkbox-capbac${i}" value="${data.ChucVuID}">
                        <label class="checkbox-bg" for="checkbox-capbac${i}">${checkNullString(data.TenChucVu)}</label>
                </li>
            `);
        }
    }
}


async function LoadKinhNghiem() {
    let GetAll = await NTS.getAjaxAsync("CongThongTinViecLam/Function/getKinhNghiemLamViec", {});
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            $('#list-kinhnghiem').append(`
                <li class="checkbox-item-right">
                    <input class="checkbox-input-right" type="checkbox" name="checkbox-kinhnghiem" id="checkbox-kinhnghiem${i}" value="${data.YeuCauKinhNghiemID}">
                        <label class="checkbox-bg" for="checkbox-kinhnghiem${i}">${checkNullString(data.TenYeuCauKinhNghiem)}</label>
                </li>
            `);
        }
    }
}



async function LoadHinhThucLamViec() {
    let GetAll = NTS.getAjax("/CongThongTinViecLam/Function/getHinhThucLamViec", {}).Result;
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            $('#list-hinhthuc').append(`
                <li class="checkbox-item-right">
                    <input class="checkbox-input-right" type="checkbox" name="checkbox-hinhthuc" id="checkbox-hinhthuc${i}" value="${data.HinhThucLamViecID}">
                        <label class="checkbox-bg" for="checkbox-hinhthuc${i}">${checkNullString(data.TenHinhThucLamViec)}</label>
                </li>
            `);
        }
    }
}

async function LoadTrinhDoHocVan() {
    let GetAll = NTS.getAjax("/CongThongTinViecLam/Function/getTrinhDoCMKT", {}).Result;
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            $('#list-trinhdo').append(`
                <li class="checkbox-item-right">
                    <input class="checkbox-input-right" type="checkbox" name="checkbox-trinhdo" id="checkbox-trinhdo${i}" value="${data.TrinhDoCMKTID}">
                        <label class="checkbox-bg" for="checkbox-trinhdo${i}">${checkNullString(data.TenTrinhDoCMKT)}</label>
                </li>
            `);
        }
    }
}


async function LoadDoiTuongUuTien() {
    let GetAll = await NTS.getAjaxAsync("CongThongTinViecLam/Function/GetDoiTuongUuTien", {});
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            $('#list-doituonguutien').append(`
                <li class="checkbox-item-right">
                    <input class="checkbox-input-right" type="checkbox" name="checkbox-doituonguutien" id="checkbox-doituonguutien${i}" value="${data.DoiTuongUuTienID}">
                        <label class="checkbox-bg" for="checkbox-doituonguutien${i}">${checkNullString(data.TenDoiTuongUuTien)}</label>
                </li>
            `);
        }
    }
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
        window.location.href = '/tra-cuu-viec-lam.html?p=' + $('#ViecLam_Loc_us').value() + '&q=' + encodeURL(kv == '(Địa điểm - Tất cả)' ? '' : kv) + '&nganhnghe='  + encodeURL(nn == '(Ngành nghề - Tất cả)' ? '' : nn)
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

