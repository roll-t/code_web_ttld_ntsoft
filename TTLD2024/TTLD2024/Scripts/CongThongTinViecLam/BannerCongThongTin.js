$(function () {
    NTS.loadDataCombo({
        name: '#DiaDiem_usBanner',
        ajaxUrl: '/CongThongTinViecLam/Function/getTinh',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: 'Lọc theo địa điểm',
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#NganhNghe_usBanner',
        ajaxUrl: '/CongThongTinViecLam/Function/getNganhNghe_CauLD',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: 'Lọc theo ngành nghề',
        showTatCa: !0,
    });
});

$(document).on('click', '#btn-search-submit', function () {
    var kv = $('#DiaDiem_usBanner').value();
    var nn = $('#NganhNghe_usBanner').value();
    window.location.href = '/tra-cuu-viec-lam.html?p=' + $('#ViecLam_Loc_us').value() + '&q=' + encodeURL(kv == 'Lọc theo địa điểm' ? '' : kv) + '&nganhnghe=' + encodeURL(nn == 'Lọc theo ngành nghề' ? '' : nn)
});

$('#ViecLam_Loc_us').keypress(function (e) {
    if (e.which === 13) { // Kiểm tra mã phím, 13 là mã phím cho phím Enter
        var kv = $('#DiaDiem_usBanner').value();
        var nn = $('#NganhNghe_usBanner').value();
        window.location.href = '/tra-cuu-viec-lam.html?p=' + $('#ViecLam_Loc_us').value() + '&q=' + encodeURL(kv == 'Lọc theo địa điểm' ? '' : kv) + '&nganhnghe=' + encodeURL(nn == 'Lọc theo ngành nghề' ? '' : nn)
    }
});

$(document).on('click', '.map_link', function () {
    var kv = $(this).attr('data');
    window.location.href = '/tra-cuu-viec-lam.html?p=' + $('#ViecLam_Loc_us').value() + '&q=' + encodeURL(kv)
})

$(document).on('click', '.item-nghenghiep', function () {
    var kv = $('#DiaDiem_usBanner').value();
    var ngheNghiep = $(this).attr('data-value');
    window.location.href = '/tra-cuu-viec-lam.html?p=' + $('#ViecLam_Loc_us').value() + '&q=' + encodeURL(kv == 'Lọc theo địa điểm' ? '' : kv) + '&n=' + ngheNghiep
})


$(document).on('click', '.item-nghenghiep-TatCa', function () {
    $('#mdDanhSachNganhNghe').modal('show');
    $('#mdDanhSachNganhNghe').addClass('no-padding-right');
    LoadDanhSachNgheNghiep();
    LoadDanhSachNgheNghiep_top10();
});

$(document).on('click', '#btnDongModalDsNgheNghiep', function () {
    $('#mdDanhSachNganhNghe').modal('hide');
});
function capitalizeFirstLetterOfSentence(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

async function LoadDanhSachNgheNghiep() {
    $('.item_nganhnghe-All').html('');
    let GetAll = await NTS.getAjaxAsync("CongThongTinViecLam/TrangChuCTT/GetNgheNghiep", {});
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            let tenNganhKinhTe = capitalizeFirstLetterOfSentence(data.TenNganhKinhTe);
            $('.item_nganhnghe-All').append(`
                <div class="col-md-6 item_nganhnghe-All-row item_nganhnghe-link" data-value="${data.MaNganhKinhTe}">
                    <a style="">
                            ${tenNganhKinhTe}
                    </a>
                </div>
            `);
        }
    }
}

 function LoadDanhSachNgheNghiep_top10() {
    $('.list_10NgheNghiep-content').html('');
    let GetAll = NTS.getAjax("CongThongTinViecLam/TrangChuCTT/GetNgheNghiep_top10", {});
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            let tenNganhKinhTe = capitalizeFirstLetterOfSentence(data.TenNganhKinhTe);
            $('.list_10NgheNghiep-content').append(`
                 <li class="list_10NgheNghiep-container-item item_nganhnghe-link" data-value="${data.MaNganhKinhTe}">
                    <a class="list_10NgheNghiep-container-item-link"> ${tenNganhKinhTe}</a>
                </li>
            `);
        }
    }
}

$(document).on('click', '.item_nganhnghe-link', function () {
    var kv = $('#DiaDiem_usBanner').value();
    var ngheNghieptop10 = $(this).attr('data-value');
    window.location.href = '/tra-cuu-viec-lam.html?p=' + $('#ViecLam_Loc_us').value() + '&q=' + encodeURL(kv == 'Lọc theo địa điểm' ? '' : kv) + '&n=' + ngheNghieptop10
});

$(document).on('mouseenter', '.item_nganhnghe-link a', function () {
    $(this).css('color', '#3e9ef7'); // Đổi màu khi hover
});     

$(document).on('mouseleave', '.item_nganhnghe-link a', function () {
    $(this).css('color', 'black'); // Trở lại màu gốc khi không hover
});

