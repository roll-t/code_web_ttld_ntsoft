$(function () {
    LoadThongTinUngVien();
    //LoadTinMoiNhat();
    LoadTinLuongCao();
});

function LoadUngVienLienQuan(NganhNge, ID) {
    var mangData = [];
    mangData[0] = NganhNge;
    mangData[1] = ID;
    var GetAll = NTS.getAjax("/CongThongTinViecLam/ChiTietUngVien/GetUngVienLienQuan", { data: mangData });
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            $('#list-tintuyendunglienquan').append(`
              <li class="container-thongtincongty-list">
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-4" style="padding-right: 0; padding-left: 0;">
                                    <div class="employ-box-avatar">
                                        <img src="${replaceImg(data.AnhDaiDien)}" alt="${checkNullString(data.TenUngVien)}" class="employ-avatar" />
                                    </div>
                                </div>
                                <div class="col-md-8 col-xs-8 col-sm-8" style="padding-left: 0; padding-right: 0; ">
                                    <div class="goiycty-tenvitri">
                                        <a href="/xem-chi-tiet-ung-vien/${data.DinhDanh}.html?p=${data.MaUngVien}"" class="goiycty-tenvitri-name" title="">${checkNullString(data.CongViecMongMuon)}</a>
                                        <p class="goiycty-tenvitri-tencty" title="">${checkNullString(data.TenUngVien)}</p>
                                    </div>
                                    <div class="goiycty-diachi-mucluong">
                                        <p class="goiycty-diachi-mucluong-diadiemlv"><span class="goiycty-diachi-mucluong-diadiemlv-name" title=""><i class="fa-solid fa-graduation-cap" style="color: var(--primary-color) !important"></i>&nbsp;${checkNullString(data.bangcap)}</span></p>
                                        <p class="goiycty-diachi-mucluong-mucluong"><span class="goiycty-diachi-mucluong-mucluong-name" title=""><i class="fa-solid fa-star" style="color: var(--primary-color) !important"></i>&nbsp;${checkNullString(data.TenYeuCauKinhNghiem)}</span></p>
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
                                <a href="#" class="goiycty-tenvitri-tencty" style="text-align:center">Chưa có ứng viên liên quan</a>
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


function LoadThongTinUngVien() {
    var decodedString = LoadParamUrltoMa("p");
    var result = NTS.getAjax("/CongThongTinViecLam/ChiTietUngVien/GetHoSoUngVien_ByHoSoID", { ma: decodedString });
    if (result.length > 0) {
        let data = result[0];
        var item = `<div class="icon-like" data-id="${data.HoSoUngVienID}"><i class="${KiemTraLuuTruHoSo(data.HoSoUngVienID) == 1 ? 'fa-solid btn-DaLuuTin' : 'fa-regular'} fa-heart btn-luutru" data-id="${data.HoSoUngVienID}"></i></div>`;
        $('#cvContent').append(item)
        //$('#luutruungvien').html(item)
        $('#tieudetrang').html(data.TenUngVien);
        $('#TenNhanVien').html(data.TenUngVien);
        $('#AnhUngVien').css('background-image', 'url("' + replaceImg(data.AnhDaiDien) + '")');
        $('#CongViecMongMuon').html(checkNullString(data.CongViecMongMuon));
        $('#NgaySinh').html(` <i class="fa-solid fa-calendar-days"></i> ${data.NgaySinh}`);
        $('#GioiTinh').html(`<i class="fa-solid ${data.GioiTinh == 'Nam' ? 'fa-mars' : data.GioiTinh == 'Nữ' ? 'fa-venus' : 'fa-venus-mars'}"></i> ${data.GioiTinh}  `);
        $('#TinhTrangHonNhan').html(`<i class="fa-solid fa-hand-holding-heart"></i> ${checkNullString(data.TinhTrangHonNhan == 'Không có thông tin' ? 'Chưa cập nhật' : data.TinhTrangHonNhan == 'Đang có vợ/chồng' ? 'Đã lập gia đình' : data.TinhTrangHonNhan)}`);
        $('#Email').html(`<i class="fa-regular fa-envelope"></i> <a href="mailto:${data.Email}">${data.Email}</a>`);
        $('#DiaChi').html(`<i class="fa-solid fa-location-dot"></i> ${checkNullString(data.DiaChi)}`);
        $('#MucLuongMongMuon').html(`<span class="fw-500">Mức lương mong muốn:</span> ${checkNullString(data.TenMucLuong)}`);
        $('#SoNamKinhNghiem').html(`<span class="fw-500">Số năm kinh nghiệm:</span> ${data.TenYeuCauKinhNghiem == 'Không yêu cầu' ? 'Chưa có kinh nghiệm' : data.TenYeuCauKinhNghiem}`);

        let NganhNghe = checkNullString(data.TenNganhNghe);

        let HTML_nganhNghe = '<span class="fw-500">Ngành nghề: </span>' + ViewBag_Html(NganhNghe);
        $('#TenNganhNghe').html(HTML_nganhNghe);
        $('#CapBac').html(`<span class="fw-500">Cấp bậc mong muốn:</span> ${checkNullString(data.TenCapBac)}`);
        $('#HinhThucLamViec').html(`<span class="fw-500">Hình thức làm việc:</span> ${checkNullString(data.TenHinhThucLamViec)}`);
        $('#NgayCapNhat').html(`<span class="fw-500">Ngày cập nhật:</span> ${checkNullString(data.NgayGui)}`);

        let DiaDiemLamViec = checkNullString(data.DiaDiemLamViec);
        let HTML_DiaDiem = '<span class="fw-500">Nơi làm việc: </span>' + ViewBag_Html(DiaDiemLamViec);
        $('#DiaDiemLamViec').html(HTML_DiaDiem);
        $('#GioiThieuBanThan').html(checkNullString(data.GioiThieu.trim()));
        $('#MucTieuNgheNghiep').html(checkNullString(data.MucTieuCongViec).replace(/\n/g, "<br>"));
        // Load danh sách tin tuyển dụng liên quan
        //let maTenDiaDiem = data.MaTenDiaDiem;
        //let firstPart = maTenDiaDiem.split(';')[0];
        //var madiadiemlv = firstPart.split('_')[0];
        LoadUngVienLienQuan(NganhNghe, data.HoSoUngVienID);

        var HocVan = NTS.getAjax("/CongThongTinViecLam/ChiTietUngVien/GetHocVanBangCap", { ma: decodedString });
        if (HocVan.length > 0) {
            for (var i = 0; i < HocVan.length; i++) {
                let item = HocVan[i];
                $('#ListHocVan').append(`<div class="timeline" >
                                            <div class="item">
                                                <div class="itemTime">
                                                    Từ ${checkNullString(item.TuNgay)} - Đến ${checkNullString(item.DenNgay)}
                                                </div>
                                                <div class="itemInfo">
                                                    <p><span class="fw-500">${checkNullString(item.ChuyenNganh)}</span></p>
                                                    <p>
                                                        <span class="fw-500">Đơn vị đào tạo:</span> ${checkNullString(item.TenTruong)}
                                                    </p>
                                                    <p>
                                                        <span class="fw-500">Cấp bậc:</span> ${checkNullString(item.TenCapBac)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>`);
            }
        } else {
            $('#ListHocVan').append(`<div style="text-align: center;">
                                        <img src="/Images/vanban-empty.jpg" class="img-empty" id="vanban-empty"/>
                                        <div>Đang cập nhật</div>
                                    </div>`);
        }
        var KinhNghiem = NTS.getAjax("/CongThongTinViecLam/ChiTietUngVien/GetKinhNghiemLamViec", { ma: decodedString });

        if (KinhNghiem.length > 0) {
            for (var i = 0; i < KinhNghiem.length; i++) {
                let item = KinhNghiem[i];
                $('#ListKinhNghiem').append(`<div class="timeline" >
                                                <div class="item">
                                                    <div class="itemTime">
                                                        Từ ${checkNullString(item.TuNgay)} - Đến ${checkNullString(item.DenNgay)}
                                                    </div>
                                                    <div class="itemInfo">
                                                        <p><span class="fw-500">${checkNullString(item.ChucDanh)}</span></p>
                                                        <p>
                                                            <span class="fw-500">Công ty:</span> ${checkNullString(item.TenCongTy)}
                                                        </p>
                                                        <p>
                                                            <span class="fw-500">Mô tả:</span> ${checkNullString(item.MoTa)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>`);
            }
        } else {
            $('#ListKinhNghiem').append(`<div style="text-align: center;">
                                        <img src="/Images/vanban-empty.jpg" class="img-empty" id="vanban-empty"/>
                                        <div>Đang cập nhật</div>
                                    </div>`);
        }
        
        var KyNang = NTS.getAjax("/CongThongTinViecLam/ChiTietUngVien/getKyNangUngVienByID", { ma: decodedString });
        if (KyNang.length > 0) {
            for (var i = 0; i < KyNang.length; i++) {
                let item = KyNang[i];
                var star = "";
                if (item.MaDanhGia == null) item.MaDanhGia = 2;
                switch (item.MaDanhGia) {
                    case 1:
                        star = `<div class="rating">
                                    <span class="fa-solid fa-star" data-index="1"></span>
                                    <span class="fa-regular fa-star" data-index="2"></span>
                                    <span class="fa-regular fa-star" data-index="3"></span>
                                    <span class="fa-regular fa-star" data-index="4"></span>
                                    <span class="fa-regular fa-star" data-index="5"></span>
                                </div>`;
                        break;
                    case 2:
                        star = `<div class="rating">
                                    <span class="fa-solid fa-star" data-index="1"></span>
                                    <span class="fa-solid fa-star" data-index="2"></span>
                                    <span class="fa-regular fa-star" data-index="3"></span>
                                    <span class="fa-regular fa-star" data-index="4"></span>
                                    <span class="fa-regular fa-star" data-index="5"></span>
                                </div>`;
                        break;
                    case 3:
                        star = `<div class="rating">
                                    <span class="fa-solid fa-star" data-index="1"></span>
                                    <span class="fa-solid fa-star" data-index="2"></span>
                                    <span class="fa-solid fa-star" data-index="3"></span>
                                    <span class="fa-regular fa-star" data-index="4"></span>
                                    <span class="fa-regular fa-star" data-index="5"></span>
                                </div>`;
                        break;
                    case 4:
                        star = `<div class="rating">
                                    <span class="fa-solid fa-star" data-index="1"></span>
                                    <span class="fa-solid fa-star" data-index="2"></span>
                                    <span class="fa-solid fa-star" data-index="3"></span>
                                    <span class="fa-solid fa-star" data-index="4"></span>
                                    <span class="fa-regular fa-star" data-index="5"></span>
                                </div>`;
                        break;
                    case 5:
                        star = `<div class="rating">
                                    <span class="fa-solid fa-star" data-index="1"></span>
                                    <span class="fa-solid fa-star" data-index="2"></span>
                                    <span class="fa-solid fa-star" data-index="3"></span>
                                    <span class="fa-solid fa-star" data-index="4"></span>
                                    <span class="fa-solid fa-star" data-index="5"></span>
                                </div>`;
                        break;
                }
                $('#ListKyNang').append(`<div class="timeline" >
                                                <div class="itemTime">
                                                    <div class="container">
                                                        <p><span class="fw-500">${checkNullString(item.TenKyNang)}</span></p>
                                                        <div class="line"></div>
                                                        ${star}
                                                    </div>
                                                </div>
                                            </div>`);
            }
        } else {
            $('#ListKyNang').append(`<div style="text-align: center;">
                                        <img src="/Images/vanban-empty.jpg" class="img-empty" id="vanban-empty"/>
                                        <div>Đang cập nhật</div>
                                    </div>`);
        }

        var TinHoc = NTS.getAjax("/CongThongTinViecLam/ChiTietUngVien/getTinHocUngVienByID", { ma: decodedString });
        if (TinHoc.length > 0) {
            for (var i = 0; i < TinHoc.length; i++) {
                let item = TinHoc[i];
                var star = "";
                if (item.MaDanhGia == null) item.MaDanhGia = 2;
                switch (item.MaDanhGia) {
                    case 1:
                        star = `<div class="rating">
                                    <span class="fa-solid fa-star" data-index="1"></span>
                                    <span class="fa-regular fa-star" data-index="2"></span>
                                    <span class="fa-regular fa-star" data-index="3"></span>
                                    <span class="fa-regular fa-star" data-index="4"></span>
                                    <span class="fa-regular fa-star" data-index="5"></span>
                                </div>`;
                        break;
                    case 2:
                        star = `<div class="rating">
                                    <span class="fa-solid fa-star" data-index="1"></span>
                                    <span class="fa-solid fa-star" data-index="2"></span>
                                    <span class="fa-regular fa-star" data-index="3"></span>
                                    <span class="fa-regular fa-star" data-index="4"></span>
                                    <span class="fa-regular fa-star" data-index="5"></span>
                                </div>`;
                        break;
                    case 3:
                        star = `<div class="rating">
                                    <span class="fa-solid fa-star" data-index="1"></span>
                                    <span class="fa-solid fa-star" data-index="2"></span>
                                    <span class="fa-solid fa-star" data-index="3"></span>
                                    <span class="fa-regular fa-star" data-index="4"></span>
                                    <span class="fa-regular fa-star" data-index="5"></span>
                                </div>`;
                        break;
                    case 4:
                        star = `<div class="rating">
                                    <span class="fa-solid fa-star" data-index="1"></span>
                                    <span class="fa-solid fa-star" data-index="2"></span>
                                    <span class="fa-solid fa-star" data-index="3"></span>
                                    <span class="fa-solid fa-star" data-index="4"></span>
                                    <span class="fa-regular fa-star" data-index="5"></span>
                                </div>`;
                        break;
                    case 5:
                        star = `<div class="rating">
                                    <span class="fa-solid fa-star" data-index="1"></span>
                                    <span class="fa-solid fa-star" data-index="2"></span>
                                    <span class="fa-solid fa-star" data-index="3"></span>
                                    <span class="fa-solid fa-star" data-index="4"></span>
                                    <span class="fa-solid fa-star" data-index="5"></span>
                                </div>`;
                        break;
                }
                $('#ListTinHoc').append(`<div class="timeline" >
                                                <div class="itemTime">
                                                    <div class="container">
                                                        <p><span class="fw-500">${checkNullString(item.TenTinHocNgoaiNguUngVien)}</span></p>
                                                        <div class="line"></div>
                                                        ${star}
                                                    </div>
                                                </div>
                                            </div>`);
            }
        } else {
            $('#ListTinHoc').append(`<div style="text-align: center;">
                                        <img src="/Images/vanban-empty.jpg" class="img-empty" id="vanban-empty"/>
                                        <div>Đang cập nhật</div>
                                    </div>`);
        }
        
        var NgoaiNgu = NTS.getAjax("/CongThongTinViecLam/ChiTietUngVien/getNgoaiNguUngVienByID", { ma: decodedString });
        if (NgoaiNgu.length > 0) {
            for (var i = 0; i < NgoaiNgu.length; i++) {
                let item = NgoaiNgu[i];
                var star = "";
                if (item.MaDanhGia == null) item.MaDanhGia = 2;
                switch (item.MaDanhGia) {
                    case 1:
                        star = `<div class="rating">
                                    <span class="fa-solid fa-star" data-index="1"></span>
                                    <span class="fa-regular fa-star" data-index="2"></span>
                                    <span class="fa-regular fa-star" data-index="3"></span>
                                    <span class="fa-regular fa-star" data-index="4"></span>
                                    <span class="fa-regular fa-star" data-index="5"></span>
                                </div>`;
                        break;
                    case 2:
                        star = `<div class="rating">
                                    <span class="fa-solid fa-star" data-index="1"></span>
                                    <span class="fa-solid fa-star" data-index="2"></span>
                                    <span class="fa-regular fa-star" data-index="3"></span>
                                    <span class="fa-regular fa-star" data-index="4"></span>
                                    <span class="fa-regular fa-star" data-index="5"></span>
                                </div>`;
                        break;
                    case 3:
                        star = `<div class="rating">
                                    <span class="fa-solid fa-star" data-index="1"></span>
                                    <span class="fa-solid fa-star" data-index="2"></span>
                                    <span class="fa-solid fa-star" data-index="3"></span>
                                    <span class="fa-regular fa-star" data-index="4"></span>
                                    <span class="fa-regular fa-star" data-index="5"></span>
                                </div>`;
                        break;
                    case 4:
                        star = `<div class="rating">
                                    <span class="fa-solid fa-star" data-index="1"></span>
                                    <span class="fa-solid fa-star" data-index="2"></span>
                                    <span class="fa-solid fa-star" data-index="3"></span>
                                    <span class="fa-solid fa-star" data-index="4"></span>
                                    <span class="fa-regular fa-star" data-index="5"></span>
                                </div>`;
                        break;
                    case 5:
                        star = `<div class="rating">
                                    <span class="fa-solid fa-star" data-index="1"></span>
                                    <span class="fa-solid fa-star" data-index="2"></span>
                                    <span class="fa-solid fa-star" data-index="3"></span>
                                    <span class="fa-solid fa-star" data-index="4"></span>
                                    <span class="fa-solid fa-star" data-index="5"></span>
                                </div>`;
                        break;
                }
                $('#ListNgoaiNgu').append(`<div class="timeline" >
                                                <div class="itemTime">
                                                    <div class="container">
                                                        <p><span class="fw-500">${checkNullString(item.TenTinHocNgoaiNguUngVien)}</span></p>
                                                        <div class="line"></div>
                                                        ${star}
                                                    </div>
                                                </div>
                                            </div>`);
            }
        } else {
            $('#ListNgoaiNgu').append(`<div style="text-align: center;">
                                        <img src="/Images/vanban-empty.jpg" class="img-empty" id="vanban-empty"/>
                                        <div>Đang cập nhật</div>
                                    </div>`);
        }


        var NguoiThamKhao = JSON.parse(data.NguoiThamKhao); //NTS.getAjax("/CongThongTinViecLam/ChiTietUngVien/GetKinhNghiemLamViec", { ma: decodedString });

        if (NguoiThamKhao != null) {
            for (var i = 0; i < NguoiThamKhao.length; i++) {
                let item = NguoiThamKhao[i];
                $('#ListNguoiThamKhao').append(`<div class="timeline" >
                                                <div class="item">
                                                    <div class="itemTime" style="color: black;">
                                                        <div class="itemInfo">
                                                            <p><span class="fw-500">${checkNullString(item.Ten)}</span></p>
                                                            <p>
                                                                <span class="fw-500">Vị trí:</span> ${checkNullString(item.ViTri)}
                                                            </p>
                                                            <p>
                                                                <span class="fw-500">Công ty:</span> ${checkNullString(item.CongTy)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>`);
            }
        } else {
            $('#ListNguoiThamKhao').append(`<div style="text-align: center;">
                                        <img src="/Images/vanban-empty.jpg" class="img-empty" id="vanban-empty"/>
                                        <div>Đang cập nhật</div>
                                    </div>`);
        }

        
        if (data.DinhKem != '') {
            let ListHoSo = data.DinhKem.split('*');
            if (ListHoSo.length > 0) {
                for (var i = 0; i < ListHoSo.length; i++) {
                    if (ListHoSo[i] != "") {
                        let UrlFile = ListHoSo[i].replace('~', '');
                        let FileName = UrlFile.split('/').pop(); // Extracts the filename
                        $('#list-file').append(`<div class="flex box-file-attached space-between align-center mt-10">
                            <div class="bold initial">
                                <h5>${FileName}</h5>
                            </div>
                            <div class="icon-action flex">
                                <i class="fa-solid fa-download download-file-attachments" data-url-file="${UrlFile}"></i>
                                <i class="fa-regular fa-eye view-file-attachments" style="color: #98FB7A" data-url-file="${UrlFile}"></i>
                            </div>
                        </div>`);
                    }
                }
            }
        } else {
            console.log("Khong");
        }
    }
}
$(document).on('click', '.btn-luutru', function (event) {
    let resultKT = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/KiemTraDangNhap", {});
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
function LoadSDTUngVien() {
    var decodedString = LoadParamUrltoMa("p");
    var result = NTS.getAjax("/CongThongTinViecLam/ChiTietUngVien/LoadSoDienThoai", { ma: decodedString });
    if (result.length > 0) {
        let data = result[0];
        $('#SoDienThoai').html(`<i class="fa-solid fa-phone"></i> ${checkNullString(data.DienThoai)}`);
    } else {
        NTS.canhbao("Bạn không có đủ quyền để thực hiện thao tác này");
    }
}

function ViewBag_Html(Data) {
    let ListData = '';
    let HTML_Data = '';
    //Kiem tra xem chuoi co rong khong
    if (Data != null || Data != "") {
        ListData = Data.split(';');//Tach chuoi theo dau ;
        if (ListData.length > 0) {
            for (var i = 0; i < ListData.length; i++) {
                let trimStr = ListData[i].trim();
                if (trimStr != "") {
                    if (trimStr.slice(-1) == ',') {
                        // If it is a comma, remove it
                        trimStr = trimStr.slice(0, -1);
                    }
                    HTML_Data += `<span class="badge badge-info" style="background:var(--primary-color) ! important;">${checkNullString(trimStr)}</span>`;
                } else {
                    continue;
                }
            }
        }
    } else {
        HTML_Data += `<span class="">Dữ liệu chưa cập nhật</span>`;
    }
    return HTML_Data;
}


//function LoadTinMoiNhat() {
//    var result = NTS.getAjax("CongThongTinViecLam/TrangChuCTT/GetTinTuyenDung_MoiNhat", {});
//    if (result.length > 0) {
//        for (var i = 0; i < result.length; i++) {
//            let data = result[i];
//            var encodedURL = encodeURL(data.TinTuyenDungID);
//            $('#listCongViecMoiNhat').append(`<li class="list-group-item list-group-vieclam-new">
//                        <a href="/xem-chi-tiet-viec-lam.html?p=${encodedURL}">
//                            <div class="row">
//                                <div class="img-congty col-md-2 col-sm-3 col-xs-2 text-center" style="padding-right:0;padding-left:0;">
//                                    <img src="${replaceImg(data.LogoCongTy)}" alt="" class="img-img-responsive box-white" />
//                                </div>
//                                <div class="col-md-10 col-sm-9 col-xs-10" style="">
//                                    <h2 class="text-overflow-line1">${checkNullString(data.ViTriTuyenDung)}</h2>
//                                    <p class="text-overflow-line1" style="font-weight: 600;">${checkNullString(data.TenNhaTuyenDung)}</p>
//                                    <p class="text-overflow-line1 text-overflow-line2 textdiachi_goiy"><i class="fa-solid fa-location-dot" aria-hidden="true"></i>&ensp;${checkNullString(data.DiaDiemLamViec)}</p>
//                                    <p class="text-overflow-line1 text-overflow-line2 textmucluong_goiy"><i class="fa-solid fa-dollar-sign"></i>&ensp;${checkNullString(data.TenMucLuong)}</p>
//                                    <p class="text-overflow-line1 text-overflow-line2 textkinhnghiem_goiy"><i class="fa-solid fa-briefcase"></i>&ensp;${checkNullString(data.TenYeuCauKinhNghiem)}</p>
//                                </div>
//                            </div>
//                        </a>
//                    </li>`);

//        }
//    } else {
//        $('#listCongViecMoiNhat').append(`
//            <div style="text-align:center;">
//                <img src="Images/vanban-empty.jpg" class="" id="vanban-empty"/>
//                <p style="color: #7f7d7d;">Hiện chưa có tin tuyển dụng</p>
//            </div>
//        `);
//    }
//}

function LoadTinMoiNhat() {
    var result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetTinTuyenDung_MoiNhat", {});
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
                                                        <h2 class="text-overflow-line1">${checkNullString(data.ViTriTuyenDung)}</h2>
                                                        <p class="text-overflow-line1">${checkNullString(data.DiaDiemLamViec)}</p>
                                                        <div class="" style="display:flex; align-items:center;justify-content:space-between">
                                                            <span class="badge badge-pill badge-light badge_mucluong" style=" background:#FFF;">
                                                               <span class="" style="border:solid 1px #ff6a00;border-radius:50%;" ><i class="fa-solid fa-dollar-sign p-1 icon_dollar"></i></span> ${checkNullString(data.TenMucLuong)}
                                                            </span>
                                                              <span class="badge badge-pill badge-light badge_thoigian" style=" background:#FFF;">
                                                               <i class="fa-regular fa-clock"></i> ${checkNullString(data.NgayDang)}
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
function LoadTinLuongCao() {
    var result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetTinTuyenDung_LuongCao", {});
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
                                                        <h2 class="text-overflow-line1">${checkNullString(data.ViTriTuyenDung)}</h2>
                                                        <p class="text-overflow-line1">${checkNullString(data.DiaDiemLamViec)}</p>
                                                        <div class="" style="display:flex; align-items:center;justify-content:space-between">
                                                            <span class="badge badge-pill badge-light badge_mucluong" style=" background:#FFF;">
                                                               <span class="" style="border:solid 1px #ff6a00;border-radius:50%;" ><i class="fa-solid fa-dollar-sign p-1 icon_dollar"></i></span> ${checkNullString(data.TenMucLuong)}
                                                            </span>
                                                              <span class="badge badge-pill badge-light badge_thoigian" style=" background:#FFF;">
                                                               <i class="fa-regular fa-clock"></i> ${checkNullString(data.NgayDang)}
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

$(document).on('click', '.view-file-attachments', function () {
    window.open($(this).attr('data-url-file'));
    return false;
});

$(document).on('click', '.download-file-attachments', function () {
    var fileUrl = $(this).attr('data-url-file');
    var fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    var link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
    return false;
});