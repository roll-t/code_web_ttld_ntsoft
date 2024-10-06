$(document).ready(function () {
    LoadTinMoiNhat();
    LoadTinLuongCao();
    ChiTietCamNangNgheNghiep();
    //getTinNoiBat();
    getTinTucNoiBat();
});


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
    var result = NTS.getAjax("CamNangNgheNghiep/ChiTietCamNang/GetTinTuyenDung_MoiNhat", {});
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            let data = result[i];
            let img = '';
            if (data.LogoCongTy != null) {
                if (data.LogoCongTy != "") {
                    img = data.LogoCongTy.replace('*', '').replace('~', '');
                } else {
                    img = "../../Images/banner.jpg";
                }
            } else {
                img = "../../Images/banner.jpg";
            }
            let encodedURL = encodeURL(data.TinTuyenDungID);
            $('#listCongViecMoiNhat_ChiTietCamNam').append(`<li class="list-group-item list-group-vieclam-new" style="border-radius: 4px !important;">
                                                <a href="/xem-chi-tiet-viec-lam/${data.DinhDanh}.html?p=${data.MaViecTimNguoi}">
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-3 col-xs-2">
                                                        <img src="${img}" alt="" class="img-img-responsive box-white" />
                                                    </div>
                                                    <div class="col-md-9 col-sm-9 col-xs-10">
                                                        <h2 class="text-overflow-line1">${data.ViTriTuyenDung}</h2>
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
        $('#listCongViecMoiNhat_ChiTietCamNam').append(`
            <div style="text-align:center;">
                <img src="Images/vanban-empty.jpg" class="" id="vanban-empty"/>
                <p style="color: #7f7d7d;">Hiện chưa có tin tuyển dụng</p>
            </div>
        `);
    }
}

function LoadTinLuongCao() {
    var result = NTS.getAjax("CamNangNgheNghiep/ChiTietCamNang/GetTinTuyenDung_LuongCao", {});
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            let data = result[i];
            let img = '';
            if (data.LogoCongTy != null) {
                if (data.LogoCongTy != "") {
                    img = data.LogoCongTy.replace('*', '').replace('~', '');
                } else {
                    img = "../../Images/banner.jpg";
                }
            } else {
                img = "../../Images/banner.jpg";
            }
            let encodedURL = encodeURL(data.TinTuyenDungID);
            $('#listViecLamLuongCao_ChiTietCamNam').append(`<li class="list-group-item list-group-vieclam-new" style="border-radius: 4px !important;">
                                                <a href="/xem-chi-tiet-viec-lam/${data.DinhDanh}.html?p=${data.MaViecTimNguoi}">
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-3 col-xs-2">
                                                        <img src="${img}" alt="" class="img-img-responsive box-white" />
                                                    </div>
                                                    <div class="col-md-9 col-sm-9 col-xs-10">
                                                        <h2 class="text-overflow-line1">${data.ViTriTuyenDung}</h2>
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
        $('#listViecLamLuongCao_ChiTietCamNam').append(`
            <div style="text-align:center;">
                <img src="Images/vanban-empty.jpg" class="" id="vanban-empty"/>
                <p style="color: #7f7d7d;">Hiện chưa có tin tuyển dụng</p>
            </div>
        `);
    }

}

function LoadCamNangCungLoai(DinhDanh) {
    $('#camNangCungLoai').html('');
    let data = NTS.getAjax("/CamNangNgheNghiep/ChiTietCamNang/getCamNangCungLoai", { dinhDanh: DinhDanh });
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            let img = (data[i].TenHinhAnh).split('*')[0];
            if (img == '' || img == undefined || img == null) {
                img = '/Images/news-defaut.jpg';
            }
            // Mã hóa URL bằng Base64 và ROT13
            $('#camNangCungLoai').append(`
            <div class="col-md-3">
                <div class="item_camnang">
                    <a href="/chi-tiet-cam-nang.html?p=${data[i].TenDinhDanhTT}">
                        <div style="width:100%;height:90%;">
                            <img src="${img}" class="item_camnang-img" />
                        </div>
                        <div class="item_camnang-tieude">
                            <a href="/chuyen-muc-cam-nang-nghe-nghiep.html?p=${data[i].TenMaLoaiTT}" style="text-transform:uppercase;">${data[i].TenLoaiTT}</a>
                            <h3 style="margin-top:10px;"> <a href="/chi-tiet-cam-nang.html?p=${data[i].TenDinhDanhTT}" class="item_camnang-tieude-h3 text-3-row">${data[i].TenTieuDe} </a></h3>
                        </div>
                    </a>
                </div>
            </div>
        `);
        }
    } else {
        $('#camNangCungLoai').append(`
        <div style="text-align:center;">
        </div>
    `);
    }
}

async function ChiTietCamNangNgheNghiep() {
    var url_string = window.location;
    var url = new URL(url_string);
    var ma = url.searchParams.get("p");
    var GetAll = await NTS.getAjaxAsync("CamNangNgheNghiep/ChiTietCamNang/getChiTietCamNang", { noiDung: ma });
    if (GetAll.length > 0) {
        let data = GetAll[0];
        $('#tieude_content,#tieude_tintuc').text(data.TieuDe);
        $('#thoigian').text('Thời gian: ' + data.NgayTao);
        $('#noidung_tintuc').html(data.NoiDung);
    }
    LoadCamNangCungLoai(ma);
}

function getTinTucNoiBat() {
    var GetAll = NTS.getAjax_NoVerifi("/CamNangNgheNghiep/TongQuanCamNang/getTinTucCamNangNoiBat", {});
    if (GetAll.length > 0) {
        var biendem = 1;
        for (var i = 0; i < Math.min(GetAll.length, 10); i++) { // lay 4 tin tuc noi bat moi nhat
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


function LoadTinMoiNhat() {
    var result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetTinTuyenDung_MoiNhat", {});
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            let data = result[i];
            if (data.LogoCongTy != null) {
                if (data.LogoCongTy != "") {
                    img = data.LogoCongTy.replace('*', '').replace('~', '');
                } else {
                    img = "../../Images/banner.jpg";
                }
            } else {
                img = "../../Images/banner.jpg";
            }
            var encodedURL = encodeURL(data.TinTuyenDungID);
            $('#listCongViecMoiNhat_ChiTietCamNam').append(`<li class="list-group-item list-group-vieclam-new">
                                                <a href="/xem-chi-tiet-viec-lam/${data.DinhDanh}.html?p=${data.MaViecTimNguoi}">
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-3 col-xs-2">
                                                        <img src="${img}" alt="" class="img-img-responsive box-white" />
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
            if (data.LogoCongTy != null) {
                if (data.LogoCongTy != "") {
                    img = data.LogoCongTy.replace('*', '').replace('~', '');
                } else {
                    img = "../../Images/banner.jpg";
                }
            } else {
                img = "../../Images/banner.jpg";
            }
            var encodedURL = encodeURL(data.TinTuyenDungID);
            $('#listViecLamLuongCao_ChiTietCamNam').append(`<li class="list-group-item list-group-vieclam-new">
                                                <a href="/xem-chi-tiet-viec-lam/${data.DinhDanh}.html?p=${data.MaViecTimNguoi}">
                                                <div class="row">
                                                    <div class="col-md-3 col-sm-3 col-xs-2">
                                                        <img src="${img}" alt="" class="img-img-responsive box-white" />
                                                    </div>
                                                    <div class="col-md-9 col-sm-9 col-xs-10">
                                                        <h2 class="text-overflow-line1" style="font-size: 13px;>${data.ViTriTuyenDung}</h2>
                                                        <p class="text-overflow-line1">${data.DiaDiemLamViec.replace(/; $/, '')}</p>
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