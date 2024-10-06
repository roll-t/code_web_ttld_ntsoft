$(function () {
    getVanBanMoi();
    ChiTietVanBan();
    LoadTinMoiNhat();
    LoadTinLuongCao();
});

function decodeURL(rot13URL) {
    // Áp dụng ROT13 lên chuỗi đã mã hóa
    var decodedURL = '';
    for (var i = 0; i < rot13URL.length; i++) {
        var charCode = rot13URL.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            decodedURL += String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            decodedURL += String.fromCharCode(((charCode - 97 + 13) % 26) + 97);
        } else {
            decodedURL += rot13URL.charAt(i);
        }
    }

    // Giải mã URL bằng Base64
    var decodedURL = atob(decodedURL);

    // Trả về URL đã được giải mã
    return decodedURL;
}

function ChiTietVanBan() {
    var url_string = window.location;
    var url = new URL(url_string);
    var ma = url.searchParams.get("ma");
    var decodedString = ma;
    var GetAll = NTS.getAjax("/CongThongTinViecLam/ChiTietVanBan/getChiTietVanBan", { ma: decodedString });
    if (GetAll.length > 0) {
        let data = GetAll[0];
        $('#SoKyHieu').text(data.SoKyHieu);
        $('#NgayBanHanh').text(data.NgayBanHanh);
        $('#NgayCoHieuLuc').text(data.NgayHieuLuc);
        $('#TrichYeu').text(data.TrichYeu);
        $('#LoaiVanBan').text(data.TenLoaiVanBan);
        $('#CoQuanBanHanh').text(data.CQBanHanh);
        $('#NguoiKy').text(data.NguoiKy);
        $('#ChucVu').text(data.ChucVu);
        $('#title-vbchitiet').text(data.SoKyHieu);

        //$('#DinhKem').text(data.DinhKemVB);
        var files = data.DinhKemVB;
        var DinhKem = files.split('*');
        for (var j = 0; j < DinhKem.length - 1; j++) {
            var str = DinhKem[j];
            var parts = str.split("/");
            var fileName = parts[parts.length - 1];
            var urlFile = str;
            $('#DinhKem').append(`<div class="file-item-parent">
                                <span class="file-item" data-url-file="${urlFile}">${fileName}<i class="ml-2 fa-solid fa-download"></i></span>
                          </div>`);
        }
        var MaLoaiVB = data.LoaiVanBan;
        var param = new Array();
        param[0] = MaLoaiVB;
        param[1] = data.VanBanID;
        var array = NTS.getAjax("/CongThongTinViecLam/ChiTietVanBan/getLoaiVB", { dulieu: param });
        if (array && array.length > 0) {
            if (array.length >= 5) {
                var dodaiLoaiVB = 5;
            } else {
                var dodaiLoaiVB = array.length;
            }
            for (var i = 0; i < dodaiLoaiVB; i++) {
                let data_LoaiVb = array[i];
                var encodedURL = encodeURL(data_LoaiVb.VanBanID);
                $('#vanban_lienquan').append(`
                <div class="mt-2 mb-2 ">
                    <i class="fa-solid fa-file icon-file pr-1"></i>
                    <a href="/xem-chi-tiet-van-ban/${data_LoaiVb.DinhDanh}.html?ma=${data_LoaiVb.MaVanBan}" class="VBlienquan">${data_LoaiVb.TrichYeu}</a>
                </div>
            `);
                var vanban_cungloai = data_LoaiVb.TrichYeu;
                if (vanban_cungloai.length > 90) {
                    var catchuoiVBCungLoai = vanban_cungloai.substring(0, 90) + "...";
                    $('.VBlienquan').text(catchuoiVBCungLoai);
                }
            }
        }
    }
}

//Xem đính kèm
$(document).on('click', '.file-item', function () {
    var url = $(this).attr('data-url-file');
    window.open(url);
    return false;
});


function getVanBanMoi() {
    let GetAll = NTS.getAjax("/CongThongTinViecLam/VanBanCTT/getVanBan", {});
    let anh = '/Content/CongThongTin/images/document-default.png';
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

async function LoadTinMoiNhat() {
    var result = await NTS.getAjaxAsync("/CongThongTinViecLam/TrangChuCTT/GetTinTuyenDung_MoiNhat", {});
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
                <img src="/Images/vanban-empty.jpg" class="" id="vanban-empty"/>
                <p style="color: #7f7d7d;">Hiện chưa có tin tuyển dụng</p>
            </div>
        `);
    }
}

async function LoadTinLuongCao() {
    var result = await NTS.getAjaxAsync("/CongThongTinViecLam/TrangChuCTT/GetTinTuyenDung_LuongCao", {});
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
                <img src="/Images/vanban-empty.jpg" class="" id="vanban-empty"/>
                <p style="color: #7f7d7d;">Hiện chưa có tin tuyển dụng</p>
            </div>
        `);
    }
}