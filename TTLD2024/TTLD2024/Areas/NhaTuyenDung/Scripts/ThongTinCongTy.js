var tempThem = true;
$(function () {
    setTimeout(function () {
        layToanBoDuLieu();
        LoadDuLieuCongTy();

    }, 200);
    NTS.unloadding();
    var editor1 = CKEDITOR.replace('UrlBanDo', {
        filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
        filebrowserWindowWidth: '1000',
        filebrowserWindowHeight: '1500',
        height: '200px'

    });
    editor1.config.height = 1000;
    CKEDITOR.instances.UrlBanDo.setData("");
    CapNhatTrangThaiButtonXacThuc();
    $(document).on('click', '#btnGuiXacThuc', function () {
        var ID = $('#NhaTuyenDungID').value();
        GuiXacThuc(ID);
    });
});
var dulieu;
function layToanBoDuLieu() {
    //$('#divload').show();
    // $("#Loadding").hide();


    NTS.loadDataCombo_NoVerifi({
        name: '#TinhID_KhuVuc',
        ajaxUrl: '/CongThongTinViecLam/Function/getDiaDiemLamViec',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo_NoVerifi({
        name: '#LoaiHinhDNID',
        ajaxUrl: '/CongThongTinViecLam/Function/getComBoLoaiHinhDN',
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
        indexDefault: 1
    });
    NTS.loadDataCombo_NoVerifi({
        name: '#NganhNgheID',
        ajaxUrl: '/CongThongTinViecLam/Function/getNganhKinhTe',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo_NoVerifi({
        name: '#QuyMoLaoDongID',
        ajaxUrl: '/CongThongTinViecLam/Function/GetComBo_QuyMoLaoDong',
        indexValue: 0,
        indexText:1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
}
function LoadDuLieuTKCongTy() {
    try {
        var data = NTS.getAjax("/NhaTuyenDung/ThongTinCongTy/LoadThongTinTaiKhoan", {}).Result;
        if (data != "") {
            var parts = data.split(';');
            var taiKhoan = parts[0];
            var matKhau = parts[1];
            $('#EmailDangNhap').val(taiKhoan);
            $('#inputPassword').val(matKhau);
        }

    } catch (e) {

    }
    return false;
};

$(document).on('click', '#btncapnhatmk', function () {
    $('#mdThatDoiMatKhau').modal('show');
    $('#MatKhauHT').value('');
    $('#MatKhauMoi').value('')
    $('#NhapLaiMatKhauMoi').value('');
    return false;
});

$(document).on('click', '#btnicon_fa-xmark', function () {
    $('#mdThatDoiMatKhau').modal('hide');
    return false;
});

$(document).ready(function () {
    $('#mdThatDoiMatKhau').modal({
        backdrop: 'static',   // Ngăn đóng khi click ra ngoài modal
        keyboard: false       // Ngăn đóng bằng phím Esc
    });

    // Xử lý sự kiện nút đóng
    $('#mdThatDoiMatKhau .btn-close').on('click', function () {
        $('#mdThatDoiMatKhau').modal('hide'); // Chỉ đóng modal khi click vào nút đóng
    });
});

$(document).on('click', '#btn_xacnha-thaydoimk', function () {
    var data = NTS.getAjax("/NhaTuyenDung/ThongTinCongTy/LoadThongTinTaiKhoan", {}).Result;
    if (data != "") {
        var parts = data.split(';');
        var taiKhoanEmail= parts[0];
        var matKhau = parts[1];

        if ($('#MatKhauMoi').value() == "") {
            NTS.canhbao("Mật khẩu mới không được bỏ trống!");
            return false;
        }

        if ($('#MatKhauHT').value() != matKhau) {
            NTS.canhbao("Mật khẩu hiện tại không đúng!");
            return false;
        } else {
            if ($('#MatKhauMoi').value().length < 6) {
                NTS.canhbao("Mật khẩu  không được ít hơn 6 ký tự!");
                return false;
            } else if ($('#NhapLaiMatKhauMoi').value() == $('#MatKhauMoi').value()) {
                var mangData = [];
                mangData[0] = taiKhoanEmail;
                mangData[1] = $('#NhapLaiMatKhauMoi').value();
                var matKhauMoi = NTS.getAjax("/NhaTuyenDung/ThongTinCongTy/luuMatKhauMoi", { data: mangData });
                if (!matKhauMoi.Err) {
                    NTS.thanhcong(matKhauMoi.Msg);
                    $('#mdThatDoiMatKhau').modal('hide');
                    $('#EmailDangNhap').val(mangData[0]);
                    $('#inputPassword').val(mangData[1]);
                    return false;
                } else {
                    matKhauMoi.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
                }
            } else {
                NTS.canhbao("Mật khẩu mới không trùng nhau!");
                return false;
            }
        }
    } else {
        NTS.canhbao("Có lỗi xảy ra!");
        return false;
    }
 
});



function LoadDuLieuCongTy() {
    try {
        var data = NTS.getAjax("/NhaTuyenDung/ThongTinCongTy/LoadDuLieuSua", {}).Result;
        if (data.length > 0) {
            let array = data[0];
            if (array.NhaTuyenDungID == "") {
                TruocKhiThem();
            } else {
                debugger
                $('#NhaTuyenDungID').value(array.NhaTuyenDungID);
                $('#TenCongTy').value(array.TenToChuc);
                $('#SoDienThoai').value(array.SoDienThoai);
                $('#Email').value(array.Email);
                $('#DiaChi').value(array.DiaChiCuThe);
                $('#MaSoThue').value(array.MaSoThue);
                $('#TinhID_KhuVuc').value(array.TinhID);
                $('#QuyMoLaoDongID').value(array.QuyMoLDID);
                $('#NganhNgheID').value(JSON.parse(array.NganhNgheKD));
                $('#LoaiHinhDNID').value(array.LoaiHinhDNID);
                $('#Website').value(array.Website);
                $('#GioiThieu').value(array.GioiThieu);
                CKEDITOR.instances.UrlBanDo.setData(array.ViTriGoogleMap);
                LoadDuLieuTKCongTy();
                if (array.Logo != null && array.Logo.length > 0) {
                    let linkVB = array.Logo;
                    let arrFile = linkVB.split('*');
                    for (let p = 0; p < arrFile.length - 1; p++) {
                        if (arrFile[p].lastIndexOf('.') != -1) {
                            // file có đuôi .*
                            if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                                arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                                arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg") {
                                $('#list-file-tai-lieu').html(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('${arrFile[p].replace('~', '')}')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o text-white delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                            } else {
                                $('#list-file-tai-lieu').html(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o text-white delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                            }
                        } else {
                            // file không đuôi
                            $('#list-file-tai-lieu').html(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o text-white delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                        }
                    }
                }

                if (array.HinhAnhCongTy != null && array.HinhAnhCongTy.length > 0) {
                    let linkVB = array.HinhAnhCongTy;
                    let arrFile = linkVB.split('*');
                    for (let p = 0; p < arrFile.length - 1; p++) {
                        if (arrFile[p].lastIndexOf('.') != -1) {
                            // file có đuôi .*
                            if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                                arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                                arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg") {
                                $('#list-file-hinh-anh').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('${arrFile[p].replace('~', '')}')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o text-white delete-file-attachments-hinhanh" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                            } else {
                                $('#list-file-hinh-anh').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o text-white delete-file-attachments-hinhanh" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                            }
                        } else {
                            // file không đuôi
                            $('#list-file-hinh-anh').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o text-white delete-file-attachments-hinhanh" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                        }
                    }
                }

                if (array.Banner != null && array.Banner.length > 0) {
                    let linkVB = array.Banner;
                    let arrFile = linkVB.split('*');
                    for (let p = 0; p < arrFile.length - 1; p++) {
                        if (arrFile[p].lastIndexOf('.') != -1) {
                            // file có đuôi .*
                            if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                                arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                                arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg") {
                                $('#list-file-banner').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('${arrFile[p].replace('~', '')}')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o text-white delete-file-attachments-banner" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                            } else {
                                $('#list-file-banner').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o text-white delete-file-attachments-banner" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                            }
                        } else {
                            // file không đuôi
                            $('#list-file-banner').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o text-white delete-file-attachments-banner" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                        }
                    }
                }
            }
        }
        else {
            TruocKhiThem();
        }
        
    } catch (e) {

    }
    return false;
};

function TruocKhiThem() {
    resetForm('.container-content')
}

$(document).on('click', '#btnLuuVaDong', function () {
    const validate = new NTSValidate('#formThemThongTin');
    if (!validate.trim().check()) {
        return false;
    }

    var mang = new Array();
    mang[0] = $('#NhaTuyenDungID').value();
    mang[1] = $('#TenCongTy').value();
    mang[2] = $('#MaSoThue').value();
    mang[3] = $('#TinhID_KhuVuc').value();
    mang[4] = $('#DiaChi').value();
    mang[5] = $('#SoDienThoai').value();
    mang[6] = $('#Email').value();
    mang[7] = JSON.stringify($('#NganhNgheID').value());
    mang[8] = $('#LoaiHinhDNID').value();
    mang[9] = $('#QuyMoLaoDongID').value();
    mang[10] = $('#Website').value();
    mang[11] = $('#GioiThieu').value();
    mang[12] = CKEDITOR.instances.UrlBanDo.getData();
    var Logo = '';
    $('#list-file-tai-lieu .frame-file .download-file-attachments').each(function (e, v) {
        Logo += $(v).attr('data-url-file') + '*';
    });
    mang[13] = Logo;
    var HinhAnh = '';
    $('#list-file-hinh-anh .frame-file .download-file-attachments').each(function (e, v) {
        HinhAnh += $(v).attr('data-url-file') + '*';
    });
    mang[14] = HinhAnh;
    var Banner = '';
    $('#list-file-banner .frame-file .download-file-attachments').each(function (e, v) {
        Banner += $(v).attr('data-url-file') + '*';
    });
    mang[15] = Banner;



    var result = NTS.getAjax('/NhaTuyenDung/ThongTinCongTy/LuuThongTin', { data: mang });    
    if (!result.Err) {
        NTS.thanhcong(result.Msg);
        $('#thongbao').html('');
        CapNhatLaiTrangThaiKhiTuChoi();
        CapNhatTrangThaiButtonXacThuc();
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
})


function Grid1_OnBeforeClientDelete(record) {
    var result_ktxoa = NTS.getAjax("json", '/View/NhaTuyenDung/Huyen.aspx/KiemTraXoa', { data: record.HuyenID });
    if (result_ktxoa == "") {
        bootbox.confirm({
            message: "<br/><h6>Bạn có thật sự muốn xóa dòng dữ liệu đã chọn không? Đồng ý xóa chọn 'Chấp nhận', không đồng ý chọn 'Hủy bỏ'</h6>",
            className: 'bb-alternate-modal', animate: !1,
            buttons: {
                cancel: {
                    label: '<i class="fa fa-close"></i> Hủy bỏ',
                    className: "btn-danger btn-sm",
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Chấp nhận',
                    className: "btn-primary btn-sm",
                }
            },
            callback: function (result) {
                if (result) {
                    var data = NTS.getAjax('json', '/View/NhaTuyenDung/Huyen.aspx/XoaHuyen', { id: record.HuyenID });
                    if (data.split('_')[0] == "1") {
                        Grid1.refresh();
                        NTS.thanhcong(data.split('_')[1]);
                    }
                    else {
                        NTS.loi(data.split('_')[1]);
                    }
                }
            }
        });
    }
    else
        bootbox.dialog({
            title: "Cảnh báo",
            message: "Dữ liệu này đang được sử dụng. Không thể xoá, danh sách kèm theo:<br><table>" + result_ktxoa + "</table>",
            className: 'bb-alternate-modal', animate: !1,
            buttons: {
                cancel: {
                    label: '<i class="fa fa-close"></i> Đóng',
                    className: "btn-danger btn-sm",
                }
            },
        })
    return false;
}
///////// PHÍM TẮT /////////
var hotKey = 0; // 1 thêm
$(document).on('keydown', function (e) {
    console.log(e.keyCode);
    switch (e.keyCode) {
        case 113:
            if (hotKey == 0)
                $('#btnThem').trigger('click');
            e.preventDefault();
            break;
        case 114:
            if (hotKey == 0)
                $('.nav-search-input').focus();
            e.preventDefault();
            break;
        case 115:
            if (hotKey == 1)
                $('#mdThemMoi').modal('hide');
            e.preventDefault();
            break;
        case 120:
            if (hotKey == 1)
                btnLuuDuLieu(null, null);
            e.preventDefault();
            break;
    }
});
// logo

$(document).on('click', '#btnChonTepVB_tailieu', function () {
    $('#fileVB_tailieu').click();
});
$(document).on('change', '#fileVB_tailieu', function () {
    UploadTaiLieu_us('NhaTuyenDung'); //hàm dùng chung ở us TaiLieu
});
function UploadTaiLieu_us(pathChiTiet) {
    let data = NTS.upload({
        name: '#fileVB_tailieu',///ID input type="file"
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



$(document).on('click', '.download-file-attachments', function () {
    window.open($(this).attr('data-url-file'));
    return false;
});

$(document).on('click', '.delete-file-attachments', function () {
    let duongDan = $(this);
    let id = $('#NhaTuyenDungID').value();
    let bang = "NhaTuyenDung";
    let cot = "NhaTuyenDungID";
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/CongThongTinViecLam/Function/XoaDinhKem', { ID: id, duongDan: duongDan.attr('data-url-file'), bangDk: bang, cotDk: cot, loai: '', tenCotDinhKem: 'Logo' });
        if (!result.Err) {
            duongDan.parent('div').remove();
            $('#fileVB_tailieu').value('');
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
    return false;
});


// hình ảnh

$(document).on('click', '#btnChonTepHinhAnh', function () {
    $('#file_hinhanh').click();
});
$(document).on('change', '#file_hinhanh', function () {
    Upload_HinhAnh('NhaTuyenDung'); //hàm dùng chung ở us TaiLieu
});
function Upload_HinhAnh(pathChiTiet) {
    let data = NTS.upload({
        name: '#file_hinhanh',///ID input type="file"
        loaiVB: 'VB',///Nhận 1 trong 2 giá trị DL hoặc VB
    });
    if (data.length > 0) {
        let result = NTS.getAjax("/CongThongTinViecLam/Function/LuuDinhKem_NhieuFile", { PathTemp: data, ID: $('#NhaTuyenDungID').value(), PathChiTiet: pathChiTiet, bangDk: 'NhaTuyenDung', cotDk: 'NhaTuyenDungID', cotDinhKem: 'HinhAnhCongTy' });
        if (result.split('*')[0] == "1") {
            let arrFile = result.split('*');
            for (let p = 1; p < arrFile.length; p++) {
                if (arrFile[p] != "") {
                    if (arrFile[p].lastIndexOf('.') != -1) {
                        // file có đuôi .*
                        if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".svg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".gif" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg") {
                            $('#list-file-hinh-anh').append(`<div class="frame-file me-2">
                                                <div class="frame-top">
                                                    <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('${arrFile[p].replace('~', '')}')"></div>
                                                </div>
                                                <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                <i class="fa fa-trash-o delete-file-attachments-hinhanh" data-url-file="${arrFile[p]}"></i>
                                            </div>`);
                        } else {
                            $('#list-file-hinh-anh').append(`<div class="frame-file me-2">
                                                <div class="frame-top">
                                                    <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/images/file.png')"></div>
                                                </div>
                                                <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                <i class="fa fa-trash-o delete-file-attachments-hinhanh" data-url-file="${arrFile[p]}"></i>
                                            </div>`);
                        }
                    } else {
                        // file không đuôi
                        $('#list-file-hinh-anh').append(`<div class="frame-file me-2">
                                                <div class="frame-top">
                                                    <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/images/file.png')"></div>
                                                </div>
                                                <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                <i class="fa fa-trash-o delete-file-attachments-hinhanh" data-url-file="${arrFile[p]}"></i>
                                            </div>`);
                    }
                }

            }
        }
    }
}


$(document).on('click', '.delete-file-attachments-hinhanh', function () {
    let duongDan = $(this);
    let id = $('#NhaTuyenDungID').value();
    let bang = "NhaTuyenDung";
    let cot = "NhaTuyenDungID";
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/CongThongTinViecLam/Function/XoaDinhKem', { ID: id, duongDan: duongDan.attr('data-url-file'), bangDk: bang, cotDk: cot, loai: '', tenCotDinhKem: 'HinhAnhCongTy' });
        if (!result.Err) {
            duongDan.parent('div').remove();
            $('#file_hinhanh').value('');
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
    return false;
});

// banner

$(document).on('click', '#btnChonTepBanner', function () {
    $('#file_banner').click();
});
$(document).on('change', '#file_banner', function () {
    Upload_Banner('NhaTuyenDung'); //hàm dùng chung ở us TaiLieu
});
function Upload_Banner(pathChiTiet) {
    let data = NTS.upload({
        name: '#file_banner',///ID input type="file"
        loaiVB: 'VB',///Nhận 1 trong 2 giá trị DL hoặc VB
    });
    if (data.length > 0) {
        let result = NTS.getAjax("/CongThongTinViecLam/Function/LuuDinhKem_MotFile", { PathTemp: data, ID: $('#NhaTuyenDungID').value(), PathChiTiet: pathChiTiet, bangDk: 'NhaTuyenDung', cotDk: 'NhaTuyenDungID', cotDinhKem: 'Banner' });
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
                            $('#list-file-banner').html(`<div class="frame-file me-2">
                                                <div class="frame-top">
                                                    <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('${arrFile[p].replace('~', '')}')"></div>
                                                </div>
                                                <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                <i class="fa fa-trash-o delete-file-attachments-banner" data-url-file="${arrFile[p]}"></i>
                                            </div>`);
                        } else {
                            $('#list-file-banner').html(`<div class="frame-file me-2">
                                                <div class="frame-top">
                                                    <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/images/file.png')"></div>
                                                </div>
                                                <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                <i class="fa fa-trash-o delete-file-attachments-banner" data-url-file="${arrFile[p]}"></i>
                                            </div>`);
                        }
                    } else {
                        // file không đuôi
                        $('#list-file-banner').html(`<div class="frame-file me-2">
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


$(document).on('click', '.delete-file-attachments-banner', function () {
    let duongDan = $(this);
    let id = $('#NhaTuyenDungID').value();
    let bang = "NhaTuyenDung";
    let cot = "NhaTuyenDungID";
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/CongThongTinViecLam/Function/XoaDinhKem', { ID: id, duongDan: duongDan.attr('data-url-file'), bangDk: bang, cotDk: cot, loai: '', tenCotDinhKem: 'Banner' });
        if (!result.Err) {
            duongDan.parent('div').remove();
            $('#file_banner').value('');
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
   
    return false;
});


function CapNhatTrangThaiButtonXacThuc() {
    var array = NTS.getAjax("/NhaTuyenDung/ThongTinCongTy/LoadDuLieuSua", {}).Result[0];
    //var result = NTS.getAjax('json', '/View/NhaTuyenDung/ThongTinCongTy.aspx/CapNhatTTThongTinCty', {});
    var temp = false;    
    if (array.TrangThaiDuyet == '1') {
        $('.btnGui').html('');
        $('#thongbao').html('');
        $('.btnGui_ThanhCong').html('');
        $('.btnGui').append(`
            <a href="#"  id="btnGuiXacThuc" class="btn btn-success" style="background: #0275d8 !important;" onclick="return false;"><i class="fa-solid fa-paper-plane"></i>&nbsp;Gửi xét duyệt</a> `);
    } else if (array.TrangThaiDuyet == '4') {
        $('.btnGui').html('');
        $('.btnGui_ThanhCong').html('');
        $('#thongbao').append(` <div class="alert alert-danger" style="margin: 0px 22px 0 22px; border-radius:16px;background: white;">
                     <strong><i class="fa-solid fa-circle-exclamation"></i> Đã bị từ chối! Nội dung từ chối: ${array.NoiDungTuChoi}</strong>
                 </div>`);
        
    } else if (array.TrangThaiDuyet == '3') {
        $('.btnGui').html('');
        $('#thongbao').html('');
        $('.btnGui_ThanhCong').html('');
        $('#thongbao').append(` <div class="alert alert-info" style="margin: 0px 22px 0 0px; border-radius:16px;background: white;">
                     <strong><i class="fa-solid fa-check"></i>&ensp;Đã xét duyệt!</strong>
                 </div>`);
        //$('.btnGui_ThanhCong').append(` <div  class="label_XetDuyet"><i class="fa-solid fa-circle-check"></i>&ensp;Đã xét duyệt</div>`);
    } else {
        $('.btnGui').html('');
        $('.btnGui_ThanhCong').html('');
        $('#thongbao').append(` <div class="alert alert-success" style="margin: 0px 22px 0 0px; border-radius:16px;background: white;">
                     <strong><i class="fa-solid fa-check"></i> Đã gửi xét duyệt!</strong>
                 </div>`);
        $('#thongbaochopheduyet').html(`<div class="col-md-12">
                            <div style="background: rgb(250, 235, 207); padding: 5px 10px; font-weight: 600;border-radius: 3px;">Xin vui lòng kiên nhẫn! Thông tin đăng ký công ty với nhà tuyển dụng đang trong quá trình chờ phê duyệt.</div>
                        </div>`);
    }
}


function GuiXacThuc(ID) {
    CanhBaoGuiPheDuyetTinDangTuyen(() => {
        const result = NTS.getAjax('/NhaTuyenDung/ThongTinCongTy/Update_TrangThaiNhaTuyenDung', { ID: ID });
        if (!result.Err) {
            CapNhatTrangThaiButtonXacThuc();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }, () => { }, "");
    
}

function CapNhatLaiTrangThaiKhiTuChoi() {
    var result = NTS.getAjax('/NhaTuyenDung/ThongTinCongTy/CapNhatTTThongTinCty', {});
}