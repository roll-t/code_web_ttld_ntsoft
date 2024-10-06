$(document).ready(function () {
    ChiTietViecLam();
});
var anhDefault = '/Images/banner.jpg';

function LoadTuyenDungLienQuan(maNganhNghe, idTinDangXem) {
    var mangData = [];
    mangData[0] = maNganhNghe;
    mangData[1] = idTinDangXem;
    var GetAll = NTS.getAjax("/CongThongTinViecLam/ChiTietViecLam/GetTinTuyenDungLienQuanTheoNganhNghe", { data: mangData });
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            $('#list-tintuyendunglienquan').append(`
               <li class="container-thongtincongty-list">
                    <div class="row">
                        <div class="col-md-12 col-xs-12 col-sm-12">
                            <div class="goiycty-tenvitri">
                                <a href="/xem-chi-tiet-viec-lam/${data.DinhDanhVTN}.html?p=${data.MaViecTimNguoi}" class="goiycty-tenvitri-name" title="${data.ViTriTuyenDung}">${data.ViTriTuyenDung}</a>
                                <a href="/xem-chi-tiet-nha-tuyen-dung/${data.DinhDanh}.html?p=${data.MaNhaTuyenDung}" class="goiycty-tenvitri-tencty" title="${data.TenCongTy}">${data.TenCongTy}</a>
                            </div>
                            <div class="goiycty-diachi-mucluong">
                                <p class="goiycty-diachi-mucluong-diadiemlv"><span class="goiycty-diachi-mucluong-diadiemlv-name" title="Địa điểm: ${data.TenDiaDiem}"><i class="fa-solid fa-location-dot" style="color: #71889b;"></i>&nbsp;${data.TenDiaDiem}</span></p>
                                <p class="goiycty-diachi-mucluong-mucluong"><span class="goiycty-diachi-mucluong-mucluong-name" title="Mức lương: ${data.MucLuongID}"><i class="fa-solid fa-money-bill" style="color: #71889b;"></i>&nbsp;${data.MucLuongID}</span></p>
                            </div>
                        </div>
                    </div>
                </li>
            `);
        }
    } else {
        $('#list-tintuyendunglienquan').append(`
               <li class="container-thongtincongty-list">
                    <div class="row">
                        <div class="col-md-12 col-xs-12 col-sm-12">
                            <div class="goiycty-tenvitri">
                                <a href="#" class="goiycty-tenvitri-name"></a>
                                <a href="#" class="goiycty-tenvitri-tencty" style="text-align:center">Chưa có công việc liên quan</a>
                            </div>
                            <div class="goiycty-diachi-mucluong">
                                <p class="goiycty-diachi-mucluong-diadiemlv"><span class="goiycty-diachi-mucluong-diadiemlv-name"></span></p>
                                <p class="goiycty-diachi-mucluong-mucluong"><span class="goiycty-diachi-mucluong-mucluong-name"></span></p>
                            </div>
                        </div>
                    </div>
                </li>
            `);
    }
}


function ChiTietViecLam() {
    var url_string = window.location;
    var url = new URL(url_string);
    var ma = url.searchParams.get("p");
    var decodedString =ma;
    var GetAll = NTS.getAjax("/CongThongTinViecLam/ChiTietViecLam/GetTinTuyenDungTheoID", { ma: decodedString });
    if (GetAll.length > 0) {
        let data = GetAll[0];
        $('#tieudetrang,#header-TenViecLam').text(data.ViTriTuyenDung);
        $('#header-mucluong').text(data.MucLuongID);
        $('#header-ngaydang').html("Ngày đăng: " + data.NgayDang);
        $('#header-hannop').html(data.HanNop);
        $('#header-chucvu').html("Cấp bậc: " + data.CapBacID);
        $('#img-logo').attr('src', data.HinhAnhCongTy.replaceAll("~", "").replaceAll("*", "")) == "" ? anhDefault : data.HinhAnhCongTy.replaceAll("~", "").replaceAll("*", "");
        $('#header-yeucaugioitinh').html(checkNullString(data.GioiTinh));
        $('#header-soluongtuyen').html(checkNullString(data.SoLuong));
        $('#header-hinhthuclamviec').html(checkNullString(data.HinhThucLamViecID));
        $('#header-trinhdo').html(checkNullString(data.TrinhDoHocVanID));
        $('#header-kinhnghiem').html( checkNullString(data.KinhNghiemID));
        $('#MoTaCongViec').html(checkNullString(data.MoTaCongViec.replaceAll("\n", "</br>")));
        $('#CheDoPhucLoi').html(checkNullString(data.CheDoPhucLoiID.replaceAll("\n", "</br>")));
        $('#YeuCauHoSo').html(checkNullString(data.YeuCauHoSo.replaceAll("\n", "</br>")));
        $('#HinhThucNop').html(checkNullString(data.HinhThucNop.replaceAll("\n", "</br>")));
        $('#NguoiLienHe').html(checkNullString(data.NguoiLienHe));
        $('#SoDienThoai').html(checkNullString(data.SoDienThoai));
        $('#ChucVu').html(checkNullString(data.ChucVu));
        $('#Email').html(checkNullString(data.Email));
        $('#contact-diachi').html(checkNullString(data.DiaChiCongTy));
        $('#header-diachi').html(checkNullString(data.DiaChiCongTy));
        $('#contact-sodienthoai').html(checkNullString(data.SDTCongTy));
        $('#contact-nganhnghe').html(checkNullString(data.NganhNgheCongTy));
        $('#contact-website').html(checkNullString(data.Website));
        $('#contact-website').attr('href',checkNullString(data.Website));
        $('#contact-quymo').html(checkNullString(data.QuyMo));
        $('#contact-tencongty').html(checkNullString(data.TenCongTy));
        $('#contact-email').html(checkNullString(data.EmailCongTy));
        $('#container-iframe').html(checkNullString(data.UrlViTri));
        $('#hdfTinTuyenDungID').value(data.TinTuyenDungID)
        var codeURL = encodeURL(data.UserID);
        $('#contact-tencongty').attr('href', `/xem-chi-tiet-nha-tuyen-dung/${data.DinhDanh}.html?p=${data.MaNhaTuyenDung}`);
        $('#contact-tencongty').attr('title', `${data.TenCongTy}`);

        let resultLuuTru = KiemTraLuuTruViecLam(data.TinTuyenDungID);
        if (resultLuuTru == "1") {
            $('.btn-theodoi').html(`<i class="fa-solid fa-heart btn-DaLuuTin"></i>&nbsp;Đã lưu tin`)
        } else {
            $('.btn-theodoi').html(`<i class="fa-regular fa-heart"></i>&nbsp;Lưu tin`)
        }

        let resultTrangThai = KiemTraUngTuyen(data.TinTuyenDungID);
        if (resultTrangThai == "1") {
            $('.btn-ungtuyen').addClass('btn-DaUngTuyen')
            $('.btn-ungtuyen').html(`Đã ứng tuyển`)
        } else {
            $('.btn-ungtuyen').removeClass('btn-DaUngTuyen')
            $('.btn-ungtuyen').html(`<i class="fa-regular fa-paste" style="color:#fff;"></i>&ensp;Nộp hồ sơ`)
        }
        if (data.TrangThaiDuyenNTD == '3') {
            $('#logo-img_xacthuc').css({ "display": "block" });
        } else{
            $('#logo-img_xacthuc').css({ "display": "none" });
        }
        try {
            // Tách chuỗi "MaTenNganhNgheCongTy" thành mảng các ngành nghề
            var nganhNgheArray = checkNullString(data.MaTenNganhNgheCongTy).split('; ');

            // Tạo các thẻ <a> và nối chúng lại với nhau bằng ký tự '/'
            var htmlOutput = nganhNgheArray.map(function (nganhNghe) {
                // Tách mã và tên ngành nghề dựa trên dấu "_"
                var parts = nganhNghe.split('_');
                var ma = parts[0].trim();  // Mã ngành nghề
                var ten = parts[1].trim(); // Tên ngành nghề

                // Trả về thẻ <a> với href chứa mã ngành nghề và nội dung là tên ngành nghề
                return '<a href="/tra-cuu-viec-lam.html?p=' + '' + '&q=' + '' + '&n=' + ma + '" class="nganhnghe-thongtinchu-chitietvieclam">' + ten + '</a>';
            }).join(' / ');
            var htmlOutput2 = nganhNgheArray.map(function (nganhNghe) {
                // Tách mã và tên ngành nghề dựa trên dấu "_"
                var parts = nganhNghe.split('_');
                var ma = parts[0].trim();  // Mã ngành nghề
                var ten = parts[1].trim(); // Tên ngành nghề

                // Trả về thẻ <a> với href chứa mã ngành nghề và nội dung là tên ngành nghề
                return '<a href="/tra-cuu-viec-lam.html?p=' + '' + '&q=' + '' + '&n=' + ma + '" class="list-timkiemlienquan-link">' + ten + '</a>';
            }).join(' / ');
            // Hiển thị kết quả đã được chuyển đổi thành các thẻ <a> vào phần tử với id "header-nganhnghe"
            $('#header-nganhnghe').html(htmlOutput);
            $('#list-timkiemlienquan-li-tuyendung').html("Tuyển dụng " + htmlOutput2);

        } catch (ex) { }

        try {
            // Tách chuỗi "MaTenDiaBan" thành mảng các địa bàn
            var diaDiemArray = checkNullString(data.MaTenDiaDiem).split('; ');

            // Tạo các thẻ <a> và nối chúng lại với nhau bằng ký tự '/'
            var htmlOutput = diaDiemArray.map(function (diaDiem) {
                // Tách mã và tên ngành nghề dựa trên dấu "_"
                var parts = diaDiem.split('_');
                var idDiaBan = parts[0].trim();  // Mã địa bàn
                var ten = parts[1].trim(); // Tên địa bàn

                // Trả về thẻ <a> với href chứa mã địa bàn và nội dung là tên địa bàn
                return '<a href="/tra-cuu-viec-lam.html?p=' + '' + '&q=' + encodeURL(idDiaBan) + '&n=" class="nganhnghe-thongtinchu-chitietvieclam">' + ten + '</a>';
            }).join(' / ');
            var htmlOutput2 = diaDiemArray.map(function (diaDiem) {
                // Tách mã và tên ngành nghề dựa trên dấu "_"
                var parts = diaDiem.split('_');
                var idDiaBan = parts[0].trim();  // Mã địa bàn
                var ten = parts[1].trim(); // Tên địa bàn

                // Trả về thẻ <a> với href chứa mã địa bàn và nội dung là tên địa bàn
                return '<a href="/tra-cuu-viec-lam.html?p=' + '' + '&q=' + encodeURL(idDiaBan) + '&n=" class="list-timkiemlienquan-link">' + ten + '</a>';
            }).join(' / ');
            // Hiển thị kết quả đã được chuyển đổi thành các thẻ <a> vào phần tử với id "header-nganhnghe"
            $('#header-diachi-thongtinchung').html(htmlOutput);
            $('#list-timkiemlienquan-li-tuyendungtai').html("Tuyển dụng tại " + htmlOutput2);
        } catch (ex) { }


        // Load danh sách tin tuyển dụng liên quan
        let maTenNganhNgheCongTy = data.MaTenNganhNgheCongTy;
        let firstPart = maTenNganhNgheCongTy.split(';')[0];
        var maNganhNgheCV = firstPart.split('_')[0];
        LoadTuyenDungLienQuan(maNganhNgheCV, data.TinTuyenDungID);
    }
}

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




$(document).on('click', '.btn-ungtuyen', function () {
    let resultKT = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/KiemTraDangNhap", {});
    if (resultKT == "2") {
        NTS.canhbao("Vui lòng đăng nhập để thực hiện thao tác!");
        return false;
    }
    //kiểm tra đã có đăng nhập chưa
    let TinTuyenDungID = $('#hdfTinTuyenDungID').value();
    let result = UngTuyenViecLam(TinTuyenDungID);
    if (result == "1") {

        let resultTrangThai = KiemTraUngTuyen(TinTuyenDungID);
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

$(document).on('click', '.btn-theodoi', function () {
    let resultKT = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/KiemTraDangNhap", {});
    if (resultKT == "2") {
        NTS.canhbao("Vui lòng đăng nhập để thực hiện thao tác!");
        return false;
    }
    //kiểm tra đã có đăng nhập chưa
    let TinTuyenDungID = $('#hdfTinTuyenDungID').value();
    let result = LuuTruViecLam(TinTuyenDungID);
    if (result == "1") {

        let resultTrangThai = KiemTraLuuTruViecLam(TinTuyenDungID);
        if (resultTrangThai == "1") {
            $(this).html(`<i class="fa-solid fa-heart btn-DaLuuTin"></i>&nbsp;Đã lưu tin`);
            NTS.thanhcong("Lưu tin tuyển dụng thành công!")
        } else {
            $(this).html(`<i class="fa-regular fa-heart"></i>&nbsp;Lưu tin`)
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