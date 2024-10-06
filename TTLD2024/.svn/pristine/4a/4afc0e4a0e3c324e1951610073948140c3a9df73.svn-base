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
    DanhSachUngVien();
    LoadKinhNghiem();
    LoadMucLuongYeuCau();
    LoadCapBac();
    LoadCombo();
    /*var accordion = document.getElementsByClassName("accordion");

    for (let i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var details = this.nextElementSibling;
            if (details.style.maxHeight) {
                details.style.maxHeight = null;
            } else {
                details.style.maxHeight = details.scrollHeight + "px";
            }
        });
    }*/
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
});
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
    $('#list-ungvien').html('');
    $('#content_pagination').html('');
    var mang = new Array();
    mang[0] = $('#content-find').value();
    mang[1] = $('#NganhNgheID').value();
    mang[2] = $('#DiaDiemLamViecID').value();
    mang[3] = $('#GioiTinh').value();

    var MucLuongLoc = $('input[name="checkbox-mucluong"]:checkbox:checked').map(function () {
        return this.value;
    }).get();
    mang[4] = JSON.stringify(MucLuongLoc);
    var CapBacLoc = $('input[name="checkbox-capbac"]:checkbox:checked').map(function () {
        return this.value;
    }).get();
    mang[5] = JSON.stringify(CapBacLoc);
    var KinhNghiemLoc = $('input[name="checkbox-kinhnghiem"]:checkbox:checked').map(function () {
        return this.value;
    }).get();
    mang[6] = JSON.stringify(KinhNghiemLoc);
    mang[7] = $("input[name='checkbox-filter']:checked").val();

    var result = NTS.getAjax("CongThongTinViecLam/TraCuuUngVien/GetDanhSachUngVien", { data: mang });
    if (result.length > 0) {
        let item = ``;
        //Phan Trang

        $('#SL_UngVien').html(result.length)
        var page = getUrlParameter('page');
        if (page == false) {
            page = 1;
        }
        var RowData = 10;
        var startIndex = (page * RowData) - RowData;
        var endIndex = Math.min(result.length, (page * RowData));
        //Phan trang
        for (var i = startIndex; i < endIndex; i++) {

            let data = result[i];
            let iconGenner = '';
            if (data.GioiTinh == '1') {
                iconGenner = '<i class="fa-solid fa-mars"></i>'
            } else if (data.GioiTinh == '2') {
                iconGenner = '<i class="fa-solid fa-venus"></i>';
            } else {
                iconGenner = 'Chưa cập nhật';
            }
            var encodedURL = encodeURL(data.HoSoUngVienID);
            // Giả sử bạn có dữ liệu ngày tháng
            let NamSinh = data.NgaySinh.split("/")[2];

            // Định dạng ngày của bạn
            var strResult = getTimeDifference(data.NgayGuiXetDuyet_UngVien);

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
                    startColor += '<i class="fa-solid fa-star" style="color:#cccccc"></i>';
                }
            }
            // Sử dụng phương pháp split để tách chuỗi
            item += `<div class="col-md-6 box-info-employ" style="">
                             <div class="employ-info">
                                <div class="icon-like" data-id="${data.HoSoUngVienID}"><i class="${KiemTraLuuTruHoSo(data.HoSoUngVienID) == `1` ? `fa-solid btn-DaLuuTin` : `fa-regular`}  fa-heart btn-luutru" data-id="${data.HoSoUngVienID}"></i></div>
                                 <div class="employ-box-avatar">
                                     <img src="${replaceImg(data.AnhDaiDien)}" alt="${checkNullString(data.TenUngVien)}"  class="employ-avatar"/>
                                    <div class="box_start titlecustom" data-title="Chất lượng hồ sơ">
                                        ${startColor}
                                    </div>
                                 </div>
                                
                                <div class="employ-job">
                                    <a href="/xem-chi-tiet-ung-vien/${data.DinhDanh}.html?p=${data.MaUngVien}" style="width: 90%;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    overflow: hidden; margin-bottom: 7px;    font-size: 16px;"><i class="fa-solid fa-briefcase style="font-size: 16px;""></i> ${checkNullString(data.CongViecMongMuon)}
                                    </a>
                                    <div class="employ-name col-md-12" style="padding: unset;margin-bottom: 10px;"><i class="fa-solid fa-venus" aria-hidden="true"></i> ${checkNullString(data.TenUngVien)} ${NamSinh} <i class="fa-solid fa-circle-check" style="color: #28a745;"></i> </div>
                                </div>
                                 <div class="row" style="margin: 25px 0 0 0;padding-top: 5px;">
                                    <div class="employ-edu col-md-6"><i class="fa-solid fa-graduation-cap" style="font-size: 16px;color: #003699;"></i> ${checkNullString(data.TenTrinhDoHV)}</div>
                                    <div class="employ-edu col-md-6"><i class="fa-regular fa-star" style="font-size: 16px;color: #003699;"></i> ${checkNullString(data.KinhNghiemLV)}</div>
                                 </div>
                                <div class="row margin-0 mt-1" style="display:none">
                                    <div class="employ-briefcase col-md-12" style="width: 100%;
                                      display: -webkit-box;
                                      -webkit-box-orient: vertical;
                                      -webkit-line-clamp: 1;
                                      overflow: hidden;"><i class="fa-solid fa-briefcase style="font-size: 16px;""></i> ${checkNullString(data.TenNganhNghe)}</div>
                                </div>
                                 <div class="row margin-0 mt-4">
                                     <div class="employ-place col-md-6" style="display: -webkit-box;color: #003699;
                                            -webkit-box-orient: vertical;
                                            -webkit-line-clamp: 1;
                                            overflow: hidden;display: flex;    gap: 3px;align-items: center;"><svg style="font-size: 16px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
                                            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/>
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
                                        </svg> <span style="color: black">${checkNullString(data.TenMucLuong)}</span></div>
                                    <div class="employ-time col-md-6" style="
                                      display: -webkit-box;
                                      -webkit-box-orient: vertical;
                                      -webkit-line-clamp: 1;
                                      overflow: hidden;"><i class="fa-solid fa-rotate" style="font-size: 16px;color: #003699;"></i> ${checkNullString(strResult)}</div>
                                 </div>
                                 <div class="row margin-0 mt-1" style="display:none">
                                      <div class="employ-money col-md-5">
                                         <div class="p_salary" style="
                                            display: -webkit-box;
                                            -webkit-box-orient: vertical;
                                            -webkit-line-clamp: 1;
                                            overflow: hidden;"><i class="fa-solid fa-money-bill"></i> ${checkNullString(data.TenMucLuong)}</div>
                                    </div>
                                 </div>
                             </div>
                         </div>`;
        }
        $('#list-ungvien').append(item);
        ListPaginationDanhSach(result.length, page);
    } else {
        $('#list-ungvien').append(`
            <div style="text-align:center;">
                <img src="/Images/CongThongTinViecLam/vanban-empty.jpg" class="" id="vanban-empty"/>
                <p style="color: #7f7d7d;">Chưa có thông tin</p>
                <br/><br/>
            </div>
        `);
        $('#SL_UngVien').html(`0`)
    }
}
function ListPaginationDanhSach(listNumber, page) {
    var totalPages = Math.ceil(listNumber / 10);
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
                            <a class="page-link" href="${(page == 1) ? '' : currentURL + '?page=' + (page - 1)}" onclick="if (!$(this).parent().hasClass('disabled')) { thayDoiURL('/tra-cuu-ung-vien.html?page=${page == 1 ? 1 : (page - 1)}')}" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>`;

        for (var i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <li class="page-item ${(i == page) ? 'active' : ''}">
                    <a class="page-link" href="" onclick="if (!$(this).parent().hasClass('disabled')) { thayDoiURL('/tra-cuu-ung-vien.html?page=${i}')}">${i}</a>
                </li>`;
        }

        paginationHTML += `
                        <li class="page-item ${(page == totalPages) ? 'disabled' : ''}">
                            <a class="page-link" href="${(page == totalPages) ? '' : currentURL + '?page=' + (page + 1)}" onclick="if (!$(this).parent().hasClass('disabled')) { thayDoiURL('/tra-cuu-ung-vien.html?page=${page == totalPages ? totalPages : (page + 1)}') }" aria-label="Next">
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

async function LoadKinhNghiem() {
    let GetAll = NTS.getAjax("CongThongTinViecLam/Function/getKinhNghiemLamViec", {});
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
async function LoadMucLuongYeuCau() {
    let GetAll = NTS.getAjax("CongThongTinViecLam/Function/getMucLuongYeuCau", {}).Result;
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
    let GetAll = NTS.getAjax("CongThongTinViecLam/Function/getCapBac", {}).Result;
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
function LoadCombo() {
    NTS.loadDataCombo({
        name: '#NganhNgheID',
        ajaxUrl: 'CongThongTinViecLam/Function/getNganhNghe_CauLD',
        indexValue: 0,
        indexText: 2,
        showTatCa: !0,
        textShowTatCa: 'Chọn ngành nghề',
    });
    NTS.loadDataCombo({
        name: '#DiaDiemLamViecID',
        ajaxUrl: 'CongThongTinViecLam/Function/getDiaDiemLamViec',
        indexValue: 0,
        indexText: 2,
        showTatCa: !0,
        textShowTatCa: 'Chọn địa điểm',
    });
    //$('#GioiTinh').select2({ width: '100%' })
    NTS.loadDataCombo({
        name: '#GioiTinh',
        ajaxUrl: '/CongThongTinViecLam/Function/GetGioiTinh_Combo',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: 'Không yêu cầu giới tính',
        showTatCa: !0
    });
}

$(document).on('change', '.checkbox-input-right,.checkbox-input,#NganhNgheID,#DiaDiemLamViecID,#GioiTinh', function () {
    DanhSachUngVien();
});
$('#content-find').keypress(function (e) {
    if (e.which === 13) { // Kiểm tra mã phím, 13 là mã phím cho phím Enter
        DanhSachUngVien();
    }
});

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
        NTS.thanhcong("Có lỗi xảy ra!");
        return false;
    }
})
// Thay đổi URL mà không reload trang
function thayDoiURL(newURL) {
    window.history.pushState({}, '', newURL);
}


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