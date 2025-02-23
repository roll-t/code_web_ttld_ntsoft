﻿$(function () {
    getTinNoiBat();
    LoadTinMoiNhat();
    LoadTinLuongCao();
    getAllGioiThieu();
});

//Giới thiệu
function getAllGioiThieu() {
    var result = NTS.getAjax("CongThongTinViecLam/GioiThieuCTT/GetAllCoCauToChuc", {});
    if (result[0] != null) {
        $('#content_GioiThieu').append(result[0].ToChuc);
        $('#content_GioiThieu').append(result[0].ChucNang);
        $('#content_GioiThieu').append(result[0].NhiemVuQuyenHan);
        $('#content_GioiThieu').append(result[0].QuyChe);
        $('#content_GioiThieu').append(result[0].ThongTinLienHe);
    } else {
        $('#content_GioiThieu').append('<h5 style="text-align: center; width: 100%; margin-top: 5%;">Chưa có dữ liệu</h1>');
    }
    return false;
}

function getTinNoiBat() {
    let GetAll = NTS.getAjax("/CongThongTinViecLam/ChiTietTinTuc/getTinNoiBat", {});

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
    var result = NTS.getAjax("CongThongTinViecLam/TrangChuCTT/GetTinTuyenDung_MoiNhat", {});
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

function LoadTinLuongCao() {
    var result = NTS.getAjax("CongThongTinViecLam/TrangChuCTT/GetTinTuyenDung_LuongCao", {});
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
