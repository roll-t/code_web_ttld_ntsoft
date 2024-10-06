$(function () {
    loadLogoCompany();
    loadTrangThaiTinDang();
    //KiemTraThieuDuLieu();
});

async function loadLogoCompany() {
    var result = await NTS.getAjaxAsync("/NhaTuyenDung/TongQuanNhaTuyenDung/GetLogoCompany", {});
    if (result.Result.length > 0) {
        let data = result.Result[0];
        $('#NhaTuyenDungID').value(data.NhaTuyenDungID);
        let logo = replaceImgLogo(data.Logo).replace('~', '');
        let banner = replaceImg(data.Banner).replace('~', '');
        let SDT = data.SoDienThoai;
        let DiaChi = data.DiaChi;
        let web = data.Website;
        let QuyMo = data.TenQuyMoLaoDong;
        let MaSoThue = data.MaSoThue;
        let LoaiHinh = data.LoaiHinh;
        //Neu logo trong thi lay anh mac dinh
        if (logo == "") {
            logo = "../../Images/CongThongTin_BacLieu/defaut-logo.png";
        }
        //Neu banner trong thi lay banner mac dinh
        if (banner == "") {
            banner = '../../Images/CongThongTin_BacLieu/banner-defaut-company.jpg';
        }
        $('#logo-company').append(`<div class="box-shadow-3 box-logo-company ">
                            <img class="logo-company" src="${logo.replace('*', '')}" onerror="ErrorImg('.logo-company')" />
                            <i class="fa-solid fa-camera icon-update-logo" id="UpdateLogoCompany"></i>
                        </div>
                        <div style="margin-left: 120px;">
                            <div class="bold company-name"><label class="bold" style="font-size: 15px;"> ${data.TenToChuc} </label><a href="/thong-tin-cong-ty.html">  <i class="fa-solid fa-pencil"></i></a></div>
                            <div>${data.TenNganhNghe == "" ? "Chưa cập nhật ngành nghề" : data.TenNganhNghe}</div>
                        </div>
                    <button class="btn btn-primary" style="float: right;height: 35px;"><i class="fa-solid fa-pen-to-square"></i> <a href="/dang-tin-tuyen-dung.html" style="color:white; text-decoration:unset">Đăng tin ngay</a></button>
                    `);
        //Load background
        $('.bg-company').css('background-image', `url("${banner}")`);
        //Load Ten
        $('.name-user').text(data.TenToChuc);
        //Giới thiệu công ty
        $('#GioiThieuCongTy').text(data.GioiThieuCongTy);
        //Load thong tin cong ty
        $('#info-company').append(`<div class="general-infor">
                        Thông tin chung
                    </div>
                    <div class="flex gap-3 content-company mt-10 align-center">
                        <i class="fa-solid fa-phone"></i>
                        <span>${kiemTraChuoiRong(SDT)}</span>
                    </div>
                    <hr class="mb-5 mt-5"/>
                    <div class="flex gap-3 content-company mt-10 align-center">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>${kiemTraChuoiRong(DiaChi)}</span>
                    </div>
                    <hr class="mb-5 mt-5"/>
                    <div class="flex gap-3 content-company mt-10 align-center">
                        <i class="fa-solid fa-globe"></i>
                        <span style="overflow: hidden;"><a href="${web}">${kiemTraChuoiRong(web)}</a></span>
                    </div>
                     <hr class="mb-5 mt-5"/>
                    <div class="flex gap-3 content-company mt-10 align-center">
                        <i class="fa-solid fa-users"></i>
                        <span>Quy mô: ${QuyMo}</span>
                    </div>
                    <hr class="mb-5 mt-5"/>
                    <div class="flex gap-3 content-company mt-10 align-center">
                        <i class="fa-regular fa-id-card"></i>
                        <span>MST: ${kiemTraChuoiRong(MaSoThue)}</span>
                    </div>
                    <hr class="mb-5 mt-5"/>
                    <div class="flex gap-3 content-company mt-10 align-center">
                        <i class="fa-solid fa-gavel"></i>
                        <span>Loại hình: ${kiemTraChuoiRong(LoaiHinh)}</span>
                    </div>
                    <hr class="mb-5 mt-5"/>
                    <div class="flex gap-3 content-company mt-10 align-center">
                        <i class="fa-solid fa-briefcase"></i>
                        <span>Ngành nghề: ${data.TenNganhNghe}</span>
                    </div>`);

    } else {
        $('.name-user').text("Chưa cập nhật");
        $('#GioiThieuCongTy').text("Chưa cập nhật thông tin giới thiệu công ty");
        $('#logo-company').append(`<div class="box-shadow-3 box-logo-company">
                            <img class="logo-company" src="../../Images/CongThongTin_BacLieu/defaut-logo.png" onerror="ErrorImg('.logo-company')" />
                            <i class="fa-solid fa-camera icon-update-logo" id="UpdateLogoCompany"></i>
                        </div>
                        <div style="margin-left: 120px;">
                            <div class="bold company-name">Tên công ty <a href="/thong-tin-cong-ty.html">  <i class="fa-solid fa-pencil"></i></a></div>
                            <div>Tên ngành nghề</div>
                        </div>`);
        $('.bg-company').css('background-image', `url('../../Images/CongThongTin_BacLieu/banner-defaut-company.jpg')`);
    }
}

// banner

$(document).on('click', '#btnChonTepBanner', function () {
    $('#file_banner').click();
});
$(document).on('change', '#file_banner', function () {
    Upload_Banner('NhaTuyenDung'); //hàm dùng chung ở us TaiLieu
    loadBannerChange();
});
function Upload_Banner(pathChiTiet) {
    let data = NTS.upload({
        name: '#file_banner',///ID input type="file"
        loaiVB: 'VB',///Nhận 1 trong 2 giá trị DL hoặc VB
    });
    if (data.length > 0) {
        let result = NTS.getAjax("/CongThongTinViecLam/Function/LuuDinhKem_MotFile", { PathTemp: data, ID: $('#NhaTuyenDungID').value(), PathChiTiet: pathChiTiet, bangDk: 'NhaTuyenDung', cotDk: 'NhaTuyenDungID', cotDinhKem: 'Banner' });
        debugger
        if (result.split('*')[0] == "1") {
            let LuuFile = result.split('*')[1];
            let arrFile = LuuFile.split('*');
            for (let p = 0; p < arrFile.length; p++) {
                if (arrFile[p] != "") {
                    if (arrFile[p].lastIndexOf('.') != -1) {
                        // file có đuôi .*
                        if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".svg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".gif" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg") {
                            $('#list-file-banner').append(`<div class="frame-file me-2">
                                                <div class="frame-top">
                                                    <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('${arrFile[p].replace('~', '')}')"></div>
                                                </div>
                                                <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                <i class="fa fa-trash-o delete-file-attachments-banner" data-url-file="${arrFile[p]}"></i>
                                            </div>`);
                        } else {
                            $('#list-file-banner').append(`<div class="frame-file me-2">
                                                <div class="frame-top">
                                                    <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/images/file.png')"></div>
                                                </div>
                                                <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                <i class="fa fa-trash-o delete-file-attachments-banner" data-url-file="${arrFile[p]}"></i>
                                            </div>`);
                        }
                    } else {
                        // file không đuôi
                        $('#list-file-banner').append(`<div class="frame-file me-2">
                                                <div class="frame-top">
                                                    <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/images/file.png')"></div>
                                                </div>
                                                <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                <i class="fa fa-trash-o delete-file-attachments-banner" data-url-file="${arrFile[p]}"></i>
                                            </div>`);
                    }
                }

            }
        }
    }
}

function loadBannerChange() {
    debugger
    var result = NTS.getAjax("/NhaTuyenDung/TongQuanNhaTuyenDung/GetLogoCompany", {}).Result;
    let banner = "";
    if (result.length > 0) {
        let data = result[0];
        banner = replaceImg(data.Banner).replace('~', '');
        if (banner == "") {
            banner = '../../Images/CongThongTin_BacLieu/banner-defaut-company.jpg';
        }
    } else {
        banner = '../../Images/CongThongTin_BacLieu/banner-defaut-company.jpg';
    }
    $('.bg-company').css('background-image', `url("${banner}")`);
}

//Load Trang Thai TIn Dang Tuyen
async function loadTrangThaiTinDang() {
    var data = await NTS.getAjaxAsync("/NhaTuyenDung/TongQuanNhaTuyenDung/GetTrangThaiTinDang", {});
    var result = data.Result;
    if (result.length > 0) {
        $('.box-status-news').remove();
        let data = result[0];
        let DangHienThi = data.DangHienThi;
        let HetHan = data.HetHan;
        let HetHanTrongTuan = data.HetHanTrongTuan;
        let DangAn = data.DangAn;
        let HoSoUngTuyen = data.HoSoUngTuyen;
        let HoSoLuuTru = data.HoSoLuuTru;
        $('#box-TrangThaiTinDang').append(`<div class="flex space-between flex-wrap gap-1">
                                                <div class="box-data-status">
                                                    <label class="no-padding text-success bold">${DangHienThi}</label>
                                                    <div>Đang tuyển dụng</div>
                                                </div>
                                                <div class="box-data-status">
                                                    <label class="no-padding text-grey bold">${DangAn}</label>
                                                    <div>Đang ẩn</div>
                                                </div>
                                                <div class="box-data-status">
                                                    <label class="no-padding text-primary bold">${HoSoUngTuyen}</label>
                                                    <div>Hồ sơ ứng tuyển</div>
                                                </div>

                                                <div class="box-data-status">
                                                    <label class="no-padding text-danger bold">${HetHan}</label>
                                                    <div>Hết hạn</div>
                                                </div>
                                                <div class="box-data-status">
                                                    <label class="no-padding text-yellow bold">${HetHanTrongTuan}</label>
                                                    <div>Hết hạn trong 7 ngày</div>
                                                </div>
                                                <div class="box-data-status">
                                                    <label class="no-padding text-purple bold">${HoSoLuuTru}</label>
                                                    <div>Hồ sơ lưu trữ</div>
                                                </div>
                                            </div>
                                         `);
    } else {

    }
}

//Logo
$(document).on('click', '#UpdateLogoCompany', function () {
    $('#file_logo_company').click();
});
$(document).on('change', '#file_logo_company', function () {
    UploadTaiLieu_us('NhaTuyenDung'); //hàm dùng chung ở us TaiLieu
    loadLogoChange();
});
function UploadTaiLieu_us(pathChiTiet) {
    let data = NTS.upload({
        name: '#file_logo_company',///ID input type="file"
        loaiVB: 'VB',///Nhận 1 trong 2 giá trị DL hoặc VB
    });
    if (data.length > 0) {
        let result = NTS.getAjax("/CongThongTinViecLam/Function/LuuDinhKem_MotFile", { PathTemp: data, ID: $('#NhaTuyenDungID').value(), PathChiTiet: 'NhaTuyenDung', bangDk: 'NhaTuyenDung', cotDk: 'NhaTuyenDungID', cotDinhKem: 'Logo' });
        if (result.split('*')[0] == "1") {
            let LuuFile = result.split('*')[1];
            let arrFile = LuuFile.split('*');
            for (let p = 0; p < arrFile.length; p++) {
                if (arrFile[p] != "") {
                    if (arrFile[p].lastIndexOf('.') != -1) {
                        // file có đuôi .*
                        if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".svg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".gif" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg") {
                            $('#list-file-tai-lieu').html(`<div class="frame-file me-2">
                                                <div class="frame-top">
                                                    <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('${arrFile[p].replace('~', '')}')"></div>
                                                </div>
                                                <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                <i class="fa fa-trash-o delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                            </div>`);
                        } else {
                            $('#list-file-tai-lieu').html(`<div class="frame-file me-2">
                                                <div class="frame-top">
                                                    <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/images/file.png')"></div>
                                                </div>
                                                <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                <i class="fa fa-trash-o delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                            </div>`);
                        }
                    } else {
                        // file không đuôi
                        $('#list-file-tai-lieu').html(`<div class="frame-file me-2">
                                                <div class="frame-top">
                                                    <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/images/file.png')"></div>
                                                </div>
                                                <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                <i class="fa fa-trash-o delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                            </div>`);
                    }
                }

            }
        }
    }
}

function loadLogoChange() {
    var result = NTS.getAjax("/NhaTuyenDung/TongQuanNhaTuyenDung/GetLogoCompany", {}).Result;
    let logo = "";
    if (result.length > 0) {
        let data = result[0];
        logo = replaceImg(data.Logo).replace('~', '');
        if (logo == "") {
            logo = '../../Images/CongThongTin_BacLieu/defaut-logo.png';
        }
    } else {
        logo = '../../Images/CongThongTin_BacLieu/defaut-logo.png';
    }
    $('.logo-company').attr('src', logo);
}
//Kiem tra co thieu du lieu không
async function KiemTraThieuDuLieu() {
    var result = await NTS.getAjaxAsync('json', "/View/NhaTuyenDung/TongQuanNhaTuyenDung.aspx/GetGetSoLuongThieu", {});
    if (result.length > 0) {
        let data = result[0].SoLuong;
        if (data == 0) {
            $('#LostData').css('display', 'none');
        } else {
            $('#LostData').append(`<div class="load-info-company">
                    <i class="fa-solid fa-circle-info"></i><a href="/thong-tin-cong-ty.html" style="color: #F61D1D;"> Vui lòng hoàn tất thông tin doanh nghiệp của bạn!</a>
                </div>`);
        }
    } else {
        $('#LostData').css('display', 'none');
    }
}