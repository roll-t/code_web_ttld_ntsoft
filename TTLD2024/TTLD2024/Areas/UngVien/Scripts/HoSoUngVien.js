var ThaoTac = "";
$(document).ready(function () {
    //$('#TinhID,#MucLuongMongMuonID,#CapBacID,#HinhThucLamViecID,#BangCapID,#BangCapID2,#KinhNghiemLamViecID').select2({ width: '100%' });
    
    setTimeout(() => {
        loadDataComBo();
        LoadDuLieuUngVien();
    }, 200);
   
    LoadHocVanBangCap();
    LoadKinhNghiemLamViec();
    LoadKyNangUngVien();
    LoadTinHocNgoaiNguUngVien();
    ThongTinHoSo();
    //Học vấn bằng cấp
    $(document).on('click', '#btn_ThemMoiHocVan', function () {
        TruocKhiThemHocVanBangCap();
        ThaoTac = "Them";
        $('#ModalThemMoiHocVan').modal('show');
        $('#tieudemodalHocVan').text("Thêm mới học vấn, bằng cấp");
    });

    $(document).on('click', '.btnSuaHocVan', function () {
        SuaDuLieuHocVanBangCap($(this).attr('data'));
    });

    $(document).on('click', '.btnXoaHocVan', function () {
        var ID = $(this).attr('data');
        XoaHocVanBangCap(ID);
    });

    //Kinh nghiệm làm việc
    $(document).on('click', '#btn_ThemKinhNghiem', function () {
        TruocKhiThemHocVanBangCap();
        ThaoTac = "Them";
        $('#ModalThemKinhNghiem').modal('show');
        $('#tieudemodalKinhNghiem').text("Kinh nghiệm làm việc");
    });
    $(document).on('click', '.btnSuaKinhNghiemLV', function () {
        SuaDuLieuKinhNghiemLV($(this).attr('data'));
    });
    $(document).on('click', '.btnXoaKinhNghiemLV', function () {
        var ID = $(this).attr('data');
        XoaKinhNghiemLV(ID);
    });

    //Kỹ năng chuyên môn
    $(document).on('click', '#btn_ThemKyNangChuyenMon', function () {
        TruocKhiThemKyNang();
        ThaoTac = "Them";
        $('#ModalThemKyNang').modal('show');
        $('#tieudemodalKyNang').text("Kỹ năng chuyên môn");
    });
    $(document).on('click', '.btnSuaKyNang', function () {
        SuaDuLieuKyNangUngVien($(this).attr('data'));
    });
    $(document).on('click', '.btnXoaKyNang', function () {
        var ID = $(this).attr('data');
        XoaKyNangUngVien(ID);
    });

    //Tin học - Ngoại ngữ
    $(document).on('click', '#btn_ThemTinHocNgoaiNgu', function () {
        TruocKhiThemTinHoc();
        ThaoTac = "Them";
        $('#ModalThemTinHocNgoaiNgu').modal('show');
        $('#tieudemodalTinHocNgoaiNgu').text("Tin học - Ngoại ngữ");
    });
    $(document).on('click', '.btnSuaTinHocNgoaiNgu', function () {
        SuaDuLieuTinHocNgoaiNgu($(this).attr('data'));
    });
    $(document).on('click', '.btnXoaTinHocNgoaiNgu', function () {
        var ID = $(this).attr('data');
        XoaKyTinHocNgoaiNgu(ID);
    });

    $(document).on('click', '#btn_xacthuc', function () {
        GuiXacThuc();
    });

    $(document).on('click', '#btnXetDuyet', function () {
        var ID = $('#NguoiTimViecID').value();
        GuiXetDuyet();
    });
});

function ThongTinHoSo() {
    var data = NTS.getAjax('/UngVien/HoSoUngVien/ThongTinHoSo', {}).Result;
    let result = data[0];
    if (result.ThongTinCaNhan == '1' && result.ThongTinHoSo == '1') {
        $('.btn-circle').removeClass('disabled');
    }
}

// btn_finish click event
$('.btn_finish').click(function () {
    var prevStepWizard = $('div.setup-panel div a[href="#step-1"]');
    NTS.thanhcong("Lưu thông tin thành công");
    prevStepWizard.trigger('click');
});

function loadDataComBo() {
    NTS.loadDataCombo_NoVerifi({
        name: '#MucLuongMongMuonID',
        ajaxUrl: '/CongThongTinViecLam/Function/getMucLuongYeuCau',
        columns: 2,
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    
    NTS.loadDataCombo_NoVerifi({
        name: '#CapBacID',
        ajaxUrl: '/CongThongTinViecLam/Function/getCapBac',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });

    NTS.loadDataCombo_NoVerifi({
        name: '#BangCapID,#BangCapID2',
        ajaxUrl: '/CongThongTinViecLam/Function/getTrinhDoCMKT',
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });

    NTS.loadDataCombo_NoVerifi({
        name: '#DiaDiemLamViecID',
        ajaxUrl: '/CongThongTinViecLam/Function/getDiaDiemLamViec',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
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
        name: '#HinhThucLamViecID',
        ajaxUrl: '/CongThongTinViecLam/Function/getHinhThucLamViec',
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });

    NTS.loadDataCombo_NoVerifi({
        name: '#TinhID',
        ajaxUrl: '/CongThongTinViecLam/Function/getDiaDiemLamViec',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });

    NTS.loadDataCombo_NoVerifi({
        name: '#KinhNghiemLamViecID',
        ajaxUrl: '/CongThongTinViecLam/Function/getComBoKinhNghiemLV',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo_NoVerifi({
        name: '#TrinhDoHocVanID',
        ajaxUrl: '/CongThongTinViecLam/Function/GetComBo_TrinhDoHV',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
}

//Bước step wizard
$(document).ready(function () {
    if ($('.step_link').hasClass('active')) {
        CapNhatTrangThaiButtonXacThuc();
    }
    $(document).on('click', '.step_link', function () {
        if ($(this).hasClass('step-1')) {
            CapNhatTrangThaiButtonXacThuc();
        } else {
            $('#alertTuChoi').html('');
        }
    });
    $(document).on('click', '.step_link', function () {
        if ($(this).hasClass('step-2')) {
            
            CapNhatTrangThaiButtonXetDuyet();
        } else {
            $('#alertTuChoiDuyet').html('');
        }
    });
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('active').addClass('step-default');
            $item.addClass('active');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });
    //Bước tiếp theo
    allNextBtn.click(function () {
        
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;
        $(".form-group").removeClass("has-error");
        //for (var i = 0; i < curInputs.length; i++) {
        //    if (!curInputs[i].validity.valid) {
        //        isValid = false;
        //        $(curInputs[i]).closest(".form-group").addClass("has-error");
        //    }
        //}

        if (isValid) {
            if (curStepBtn === "step-1") {
                const validate = new NTSValidate('#step-1');
                //Kiểm tra bắt buộc nhập 1
                if (!validate.trim().check()) {
                    return false;
                }
                var sdtValue = $('#SoDienThoai').value();
                var emailValue = $('#Email').value();

                var NgaySinh = moment($('#NgaySinh').val(), "DD/MM/YYYY");
                if (NgaySinh.isValid()) {
                    var currentDate = moment();
                    var age = currentDate.diff(NgaySinh, 'years');
                    if (age < 15) {
                        NTS.canhbao('Tuổi phải lớn hơn hoặc bằng 15!');
                        return false;
                    }
                }

                if (KiemTraEmail(emailValue) === false) {
                    NTS.canhbao("Email sai định dạng!");
                    return false;
                }
                if (KiemTraSDT(sdtValue) === false) {
                    NTS.canhbao("Số điện thoại sai định dạng!");
                    return false;
                }
                $('#alertTuChoi').html('');
                LuuThongTinBuoc1();
                
                CapNhatTrangThaiButtonXetDuyet();
            } else if (curStepBtn === "step-2") {
                //Kiểm tra bắt buộc nhập bước 2
                const validate = new NTSValidate('#step-2');
                //Kiểm tra bắt buộc nhập 1
                if (!validate.trim().check()) {
                    return false;
                }
                LuuThongTinBuoc2();
            }
            //nextStepWizard.removeAttr('disabled').trigger('click');
            nextStepWizard.removeClass('disabled');
            nextStepWizard.trigger('click');
        }
    });
    $('div.setup-panel div a.active').trigger('click');
});


function TruocKhiLuu() {
    $('#HoTen').value("");
    $('#NgaySinh').value("");
    $('#Gender_Nam').value("");
    $('#Gender_Nu').value("");
    $('#DocThan').value("");
    $('#KetHon').value("");
    $('#SoDienThoai').value("");
    $('#Email').value("");
    $('#TinhID').value("");
    $('#DiaChi').value("");
    $('#CongViecMongMuon').value("");
    $('#MucLuongMongMuonID').value("");
    $('#CapBacID').value("");
    $('#NganhNgheID').value("");
    $('#DiaDiemLamViecID').value("");
    $('#HinhThucLamViecID').value("");
    $('#GioiThieuBanThan').value("");
    $('#MucTieuCongViec').value("");
}

function LuuThongTinBuoc1() {
    
    var param = new Array();
    var GioiTinh = '';
    var HonNhan = '';

    if ($('#Gender_Nam').prop('checked')) {
        GioiTinh = '1';
    } else if ($('#Gender_Nu').prop('checked')) {
        GioiTinh = '2';
    }
    else {
        GioiTinh = '0';
    }

    if ($('#DocThan').prop('checked')) {
        HonNhan = '02';
    } else if ($('#KetHon').prop('checked')) {
        HonNhan = '03';
    } else {
        HonNhan = '01'
    }
    param[0] = $('#HoTen').value();
    param[1] = $('#NgaySinh').value();
    param[2] = GioiTinh;
    param[3] = HonNhan;
    param[4] = $('#SoDienThoai').value();
    param[5] = $('#Email').value();
    param[6] = $('#TinhID').value();
    param[7] = $('#DiaChi').value();
    


    //var Logo = '';
    //$('#list-file-tai-lieu .frame-file .download-file-attachments').each(function (e, v) {
    //    Logo += $(v).attr('data-url-file') + '*';
    //});

    var result = NTS.getAjax('/UngVien/HoSoUngVien/LuuThongTinCaNhan', { data: param });
    if (!result.Err) {
        NTS.thanhcong(result.Msg);
        //CapNhatTrangThaiBiTuChoiXacThuc();
        return false;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
}

function LuuThongTinBuoc2() {
    
    var mang = new Array();
    mang[0] = $('#CongViecMongMuon').value();
    mang[1] = $('#MucLuongMongMuonID').value();
    mang[2] = $('#CapBacID').value();
    mang[3] = JSON.stringify($('#NganhNgheID').value());
    mang[4] = JSON.stringify($('#DiaDiemLamViecID').value());
    mang[5] = $('#HinhThucLamViecID').value();
    mang[6] = $('#GioiThieuBanThan').value();
    mang[7] = $('#MucTieuCongViec').value();
    mang[8] = $('#KinhNghiemLamViecID').value();
    mang[9] = $('#TrinhDoHocVanID').value();

    var result = NTS.getAjax('/UngVien/HoSoUngVien/LuuThongTinHoSo', { data: mang });
    if (!result.Err) {
        NTS.thanhcong(result.Msg);
        //CapNhatTrangThaiBiTuChoiXacThuc();
        return false;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
}
//-------------------Thay doi khi chon gioi tính------------------------//
$(document).on('change', '#Gender_Nam', function () {
    if ($('#Gender_Nu').value() == true) {
        $('#Gender_Nu').value(false);
    }
});
$(document).on('change', '#Gender_Nu', function () {
    if ($('#Gender_Nam').value() == true) {
        $('#Gender_Nam').value(false);
    }
});
//-------------------Thay doi khi chon tình trạng hôn nhân------------------------//
$(document).on('change', '#DocThan', function () {
    if ($('#KetHon').value() == true) {
        $('#KetHon').value(false);
    }
});
$(document).on('change', '#KetHon', function () {
    if ($('#DocThan').value() == true) {
        $('#DocThan').value(false);
    }
});
function LoadDuLieuUngVien() {
    try {
        TruocKhiLuu();
        
        var array = NTS.getAjax('/UngVien/HoSoUngVien/LoadDuLieuSua', {}).Result[0];
        $('#HoTen').value(array.HoVaTen);
        $('#NgaySinh').value(array.NgaySinh);
        if (array.GioiTinh == '1') {
            $('#Gender_Nam').prop('checked', true);
        } else if (array.GioiTinh == '2') {
            $('#Gender_Nu').prop('checked', true);
        } else {
            $('#Gender_Nam').prop('checked', false);
            $('#Gender_Nu').prop('checked', false);
        }

        if (array.TinhTrangHonNhan == '02' || array.TinhTrangHonNhan == '04') {
            $('#DocThan').prop('checked', true);
        } else if (array.TinhTrangHonNhan === '03') {
            $('#KetHon').prop('checked', true);
        } else {
            $('#DocThan').prop('checked', false);
            $('#KetHon').prop('checked', false);
        }
        $('#SoDienThoai').value(array.SoDienThoai);
        $('#Email').value(array.Email);
        $('#TinhID').value(array.DiaBanHC_HN_TinhID);
        $('#DiaChi').value(array.DiaChi_HN);
        $('#KinhNghiemLamViecID').value(array.KinhNghiemLVID);
        $('#TrinhDoHocVanID').value(array.TrinhDoHocVanID);
        
        if (array.AnhDaiDien != null && array.AnhDaiDien.length > 0) {
            let linkVB = array.AnhDaiDien;
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


        

        $('#CongViecMongMuon').value(array.TenCongViec);
        $('#MucLuongMongMuonID').value(array.MucLuongID);
        $('#CapBacID').value(array.ChucVuID);
        $('#HinhThucLamViecID').value(array.HinhThucLamViecID);
        $('#GioiThieuBanThan').value(array.GioiThieu);
        $('#MucTieuCongViec').value(array.MucTieuCongViec);
        $('#NguoiTimViecID').value(array.NguoiTimViecID);
        $('#NganhNgheID').value(array.NganhKinhTeID != "" ? JSON.parse(array.NganhKinhTeID) : "");
        $('#DiaDiemLamViecID').value(array.DiaDiemLVID != "" ? JSON.parse(array.DiaDiemLVID) : "");
        

        if (array.DinhKem != null && array.DinhKem.length > 0) {
            let linkVB = array.DinhKem;
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

    } catch (e) {

    }
    return false;
};



// Hình ảnh hoặc bằng cấp
$(document).on('click', '#btnChonTepHinhAnh', function () {
    $('#file_hinhanh').click();
});
$(document).on('change', '#file_hinhanh', function () {
    Upload_HinhAnh('HoSoUngVien'); //hàm dùng chung ở us TaiLieu
});

$(document).on('click', '.download-file-attachments', function () {
    window.open($(this).attr('data-url-file'));
    return false;
});

function Upload_HinhAnh(pathChiTiet) {
    let data = NTS.upload({
        name: '#file_hinhanh',///ID input type="file"
        loaiVB: 'VB',///Nhận 1 trong 2 giá trị DL hoặc VB
    });
    if (data.length > 0) {
        let result = NTS.getAjax( "/CongThongTinViecLam/Function/LuuDinhKem_NhieuFile", { PathTemp: data, ID: $('#NguoiTimViecID').value(), PathChiTiet: pathChiTiet, bangDk: 'NguoiTimviec', cotDk: 'NguoiTimViecID', cotDinhKem: 'DinhKem' });
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
    let id = $('#NguoiTimViecID').value();
    let bang = "NguoiTimViec";
    let cot = "NguoiTimViecID";
    CanhBaoXoa(() => {
        let result = NTS.getAjax('/CongThongTinViecLam/Function/XoaDinhKem', { ID: id, duongDan: duongDan.attr('data-url-file'), bangDk: bang, cotDk: cot, loai: '', tenCotDinhKem: 'DinhKem' });
        if (!result.Err) {
            duongDan.parent('div').remove();
            $('#file_hinhanh').value('');
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
    return false;
});

//Học vấn bằng cấp

function TruocKhiThemHocVanBangCap() {
    $('#ChuyenNganh').value("");
    $('#Truong').value("");
    $('#BangCapID').value("");
    $('#TuNgay').value("");
    $('#DenNgay').value("");
    CKEDITOR.instances.ThanhTuu.setData("");
}

$(document).on('click', '#btn_luuhocvan_bangcap', function () {
    const validate = new NTSValidate('#ModalThemMoiHocVan');
    //Kiểm tra bắt buộc nhập 1
    if (!validate.trim().check()) {
        return false;
    }
    var mang = new Array();
    mang[0] = ThaoTac;
    mang[1] = $('#HocVanBangCapUngVienID').value();
    mang[2] = $('#ChuyenNganh').value();
    mang[3] = $('#Truong').value();
    mang[4] = $('#BangCapID').value();
    mang[5] = $('#TuNgay').value();
    mang[6] = $('#DenNgay').value();
    mang[7] = CKEDITOR.instances.ThanhTuu.getData();
    mang[8] = $('#NguoiTimViecID').value();

    var DenNgay = moment($('#DenNgay').val(), "DD/MM/YYYY");
    var TuNgay = moment($('#TuNgay').val(), "DD/MM/YYYY");

    if (DenNgay.isValid() && TuNgay.isValid()) {
        if (DenNgay.isBefore(TuNgay)) {
            NTS.canhbao('Đến ngày không được nhỏ hơn từ ngày!');
            return false;
        } else if (DenNgay.isSame(TuNgay, 'day')) {
            NTS.canhbao('Đến ngày không được trùng với từ ngày!');
            return false;
        }
    }


    //if ($('#ChuyenNganh').isempty("Chuyên ngành không được bỏ trống!")) return false;
    //if ($('#Truong').isempty("Tên trường không được bỏ trống!")) return false;
    //if ($('#BangCapID').isempty("Bằng cấp không được bỏ trống!")) return false;
    //if ($('#TuNgay').isempty("Từ ngày không được bỏ trống!")) return false;
    //if ($('#DenNgay').isempty("Đến ngày ngành không được bỏ trống!")) return false;

    var result = NTS.getAjax('/UngVien/HoSoUngVien/LuuThongTin_HocVanBangCap', { data: mang });
    if (!result.Err) {
        $('#HocVanBangCap_items').html('');
        NTS.thanhcong(result.Msg);
        LoadHocVanBangCap();
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }    
    $('#ModalThemMoiHocVan').modal('hide');
    TruocKhiThemHocVanBangCap();
});

function LoadHocVanBangCap() {
    $('#HocVanBangCap_items').html('');
    var GetAll = NTS.getAjax_NoVerifi('/UngVien/HoSoUngVien/getHocVanBangCap', {}).Result;
    
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            data = GetAll[i];
            var tuNgayParts = data.TuNgay.split('/');
            var denNgayParts = data.DenNgay.split('/');

            var tuNgayFormatted = tuNgayParts[2] + '-' + tuNgayParts[1] + '-' + tuNgayParts[0];
            var denNgayFormatted = denNgayParts[2] + '-' + denNgayParts[1] + '-' + denNgayParts[0];

            var TuNgay = new Date(tuNgayFormatted);
            var DenNgay = new Date(denNgayFormatted);

            var ThoiGian = '', DonVi = '';

            if (TuNgay.getFullYear() === DenNgay.getFullYear() && TuNgay.getMonth() === DenNgay.getMonth()) {
                // Tính số ngày
                ThoiGian = DenNgay.getDate() - TuNgay.getDate();
                DonVi = 'ngày';

            } else if (TuNgay.getFullYear() === DenNgay.getFullYear()) {
                // Tính số tháng
                ThoiGian = DenNgay.getMonth() - TuNgay.getMonth();
                if (ThoiGian < 0) {
                    ThoiGian += 12;
                }
                DonVi = 'tháng';
            } else {
                // Tính số năm
                ThoiGian = DenNgay.getFullYear() - TuNgay.getFullYear();
                DonVi = 'năm';
            }

            $('#HocVanBangCap_items').append(`
                     <li class="list_items" >
                          <div class="col-md-1 sonam_hocvan">
                              <span>${ThoiGian}</span>
                              <span><strong>${DonVi}</strong></span>
                          </div>
                          <div class="col-md-10 ten_hocvan">
                              <h3>${data.ChuyenNganh}</h3>
                              <p>${data.TenTruong}</p>
                              <p>${data.TuNgay} - ${data.DenNgay}</p>
                          </div>
                          <div class="hocvan_icon col-md-1">
                              <span class="btnSuaHocVan" data=${data.HocVanBangCapUngVienID}>
                                  <i class="icon_pen hocvan_icon-item fa-solid fa-pencil"></i>
                              </span>
                              <span class="btnXoaHocVan" data=${data.HocVanBangCapUngVienID}>
                                  <i class="icon_strash hocvan_icon-item fa-solid fa-trash-can"></i>
                              </span>
                          </div>
                      </li>
            `)
        }
    } else {
        $('#HocVanBangCap_items').append(` <li class="list_items">
                                             <div class="col-md-12 ten_hocvan"style="padding:26px 0;text-align:center;color:#D9D9D9;">
                                                 <h3 >Hiện chưa có dữ liệu</h3>
                                             </div>
                                         </li>`);
    }
}


function SuaDuLieuHocVanBangCap(ID) {
    var result = NTS.getAjax('/UngVien/HoSoUngVien/LoadDuLieuSuaHocVanBangCap', { ID: ID }).Result;
    if (result.length > 0) {
        data = result[0];
        $('#ModalThemMoiHocVan').modal('show');
        $('#tieudemodalHocVan').text("Cập nhật học vấn, bằng cấp");
        $('#HocVanBangCapUngVienID').value(ID);
        $('#ChuyenNganh').value(data.ChuyenNganh);
        $('#Truong').value(data.TenTruong);
        $('#BangCapID').value(data.BangCapID);
        $('#TuNgay').value(data.TuNgay);
        $('#DenNgay').value(data.DenNgay);
        CKEDITOR.instances.ThanhTuu.setData(result[0].ThanhTuu);
        ThaoTac = "sua";
    }
    else {
        NTS.loi('Tải dữ liệu sửa thất bại')
    }
}
function XoaHocVanBangCap(ID) {
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/UngVien/HoSoUngVien/XoaHocVanBangCap', { id: ID });
        if (!result.Err) {
            LoadHocVanBangCap();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });  
}

/////////////////////////////////////////////////

//Kinh nghiệm làm việc
function TruocKhiThemKinhNghiemLV() {
    $('#ChucDanh').value("");
    $('#TenCongTy').value("");
    $('#BangCapID2').value("");
    $('#TuThang').value("");
    $('#DenThang').value("");
    $('#CVHientai').value("");
    CKEDITOR.instances.MoTaKinhNghiemLV.setData("");
}

$(document).on('click', '#btn_luukinhnghiem', function () {
    const validate = new NTSValidate('#ModalThemKinhNghiem');
    //Kiểm tra bắt buộc nhập 1
    if (!validate.trim().check()) {
        return false;
    }
    var mang = new Array();
    mang[0] = ThaoTac;
    mang[1] = $('#KinhNghiemLVUngVienID').value();
    mang[2] = $('#ChucDanh').value();
    mang[3] = $('#TenCongTy').value();
    mang[4] = $('#BangCapID2').value();
    mang[5] = $('#TuThang').value();
    mang[6] = $('#DenThang').value();
    mang[7] = $('#CVHientai').value();
    mang[8] = CKEDITOR.instances.MoTaKinhNghiemLV.getData();
    mang[9] = $('#NguoiTimViecID').value();

    var DenNgay = moment($('#DenThang').val(), "DD/MM/YYYY");
    var TuNgay = moment($('#TuThang').val(), "DD/MM/YYYY");

    if (DenNgay.isValid() && TuNgay.isValid()) {
        if (DenNgay.isBefore(TuNgay)) {
            NTS.canhbao('Đến ngày không được nhỏ hơn từ ngày!');
            return false;
        } else if (DenNgay.isSame(TuNgay, 'day')) {
            NTS.canhbao('Đến ngày không được trùng với từ ngày!');
            return false;
        }
    }    

    var result = NTS.getAjax('/UngVien/HoSoUngVien/LuuThongTin_KinhNghiemLVUngVien', { data: mang });
    if (!result.Err) {
        $('#KinhNghiem_items').html('');
        NTS.thanhcong(result.Msg);
        LoadKinhNghiemLamViec();
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
   
    $('#ModalThemKinhNghiem').modal('hide');
    TruocKhiThemKinhNghiemLV();
});

function LoadKinhNghiemLamViec() {
    $('#KinhNghiem_items').html('');
    var GetAll = NTS.getAjax_NoVerifi('/UngVien/HoSoUngVien/getKinhNghiemLV', {}).Result;
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            data = GetAll[i];
            var tuNgayParts = data.TuThang.split('/');
            var denNgayParts = data.DenThang.split('/');

            var tuNgayFormatted = tuNgayParts[2] + '-' + tuNgayParts[1] + '-' + tuNgayParts[0];
            var denNgayFormatted = denNgayParts[2] + '-' + denNgayParts[1] + '-' + denNgayParts[0];

            var TuThang = new Date(tuNgayFormatted);
            var DenThang = new Date(denNgayFormatted);

            var ThoiGian = '', DonVi = '';

            if (TuThang.getFullYear() === DenThang.getFullYear() && TuThang.getMonth() === DenThang.getMonth()) {
                // Tính số ngày
                ThoiGian = DenThang.getDate() - TuThang.getDate();
                DonVi = 'ngày';

            } else if (TuThang.getFullYear() === DenThang.getFullYear()) {
                // Tính số tháng
                ThoiGian = DenThang.getMonth() - TuThang.getMonth();
                if (ThoiGian < 0) {
                    ThoiGian += 12;
                }
                DonVi = 'tháng';
            } else {
                // Tính số năm
                ThoiGian = DenThang.getFullYear() - TuThang.getFullYear();
                DonVi = 'năm';
            }

            $('#KinhNghiem_items').append(`
                     <li class="list_items" >
                          <div class="col-md-1 sonam_hocvan">
                              <span>${ThoiGian}</span>
                              <span><strong>${DonVi}</strong></span>
                          </div>
                          <div class="col-md-10 ten_hocvan">
                              <h3>${data.ChucDanh}</h3>
                              <p>${data.TenCongTy}</p>
                              <p>${data.TuThang} - ${data.DenThang}</p>
                          </div>
                          <div class="hocvan_icon col-md-1">
                              <span class="btnSuaKinhNghiemLV" data=${data.KinhNghiemLVUngVienID}>
                                  <i class="icon_pen hocvan_icon-item fa-solid fa-pencil"></i>
                              </span>
                              <span class="btnXoaKinhNghiemLV" data=${data.KinhNghiemLVUngVienID}>
                                  <i class="icon_strash hocvan_icon-item fa-solid fa-trash-can"></i>
                              </span>
                          </div>
                      </li>
            `)
        }
    } else {
        $('#KinhNghiem_items').append(` <li class="list_items">
                                             <div class="col-md-12 ten_hocvan"style="padding:26px 0;text-align:center;color:#D9D9D9;">
                                                 <h3 >Hiện chưa có dữ liệu</h3>
                                             </div>
                                         </li>`);
    }
}

function SuaDuLieuKinhNghiemLV(ID) {
    var result = NTS.getAjax('/UngVien/HoSoUngVien/LoadDuLieuSuaKinhNghiemLV', { ID: ID }).Result;
    if (result.length > 0) {
        data = result[0];
        $('#ModalThemKinhNghiem').modal('show');
        $('#tieudemodalHocVan').text("Cập nhật kinh nghiệm làm việc");
        $('#KinhNghiemLVUngVienID').value(ID);
        $('#ChucDanh').value(data.ChucDanh);
        $('#TenCongTy').value(data.TenCongTy);
        $('#BangCapID2').value(data.BangCapID);
        $('#TuThang').value(data.TuThang);
        $('#DenThang').value(data.DenThang);
        $('#CVHientai').value(data.CongViecHienTai);
        CKEDITOR.instances.MoTaKinhNghiemLV.setData(result[0].MoTa);
        ThaoTac = "sua";
    }
    else {
        NTS.loi('Tải dữ liệu sửa thất bại');
    }
}

function XoaKinhNghiemLV(ID) {
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/UngVien/HoSoUngVien/XoaKinhNghiemLV', { id: ID });
        if (!result.Err) {
            LoadKinhNghiemLamViec();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
    
}


//Kỹ năng
function TruocKhiThemKyNang() {
    $('#TenKyNang').value("");
    CKEDITOR.instances.MoTaKyNangCM.setData("");
}

$(document).on('click', '#btn_luukynang', function () {
    const validate = new NTSValidate('#ModalThemKyNang');
    //Kiểm tra bắt buộc nhập 1
    if (!validate.trim().check()) {
        return false;
    }
    var mang = new Array();
    mang[0] = ThaoTac;
    mang[1] = $('#KyNangUngVienID').value();
    mang[2] = $('#TenKyNang').value();
    mang[3] = CKEDITOR.instances.MoTaKyNangCM.getData();
    mang[4] = $('#NguoiTimViecID').value();

    var result = NTS.getAjax('/UngVien/HoSoUngVien/LuuThongTin_KyNang', { data: mang });
    if (!result.Err) {
        $('#KyNang_items').html('');
        NTS.thanhcong(result.Msg);
        LoadKyNangUngVien();
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    $('#ModalThemKyNang').modal('hide');
    TruocKhiThemKyNang();
});

function LoadKyNangUngVien() {
    $('#KyNang_items').html('');
    var GetAll = NTS.getAjax_NoVerifi('/UngVien/HoSoUngVien/getKyNangUngVien', {}).Result;
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            data = GetAll[i];

            $('#KyNang_items').append(`
                     <li class="list_items">
                         <div class="col-md-11 ten_hocvan ten_kynang">
                             <h3>${data.TenKyNang}</h3>
                             <p>${data.MoTa}</p>
                         </div>
                         <div class="hocvan_icon col-md-1">
                             <span class="btnSuaKyNang" data=${data.KyNangUngVienID}>
                                 <i class="icon_pen hocvan_icon-item fa-solid fa-pencil"></i>
                             </span>
                             <span class="btnXoaKyNang" data=${data.KyNangUngVienID}>
                                 <i class="icon_strash hocvan_icon-item fa-solid fa-trash-can"></i>
                             </span>
                         </div>
                     </li>
            `)
        }
    } else {
        $('#KyNang_items').append(` <li class="list_items">
                                             <div class="col-md-12 ten_hocvan"style="padding:26px 0;text-align:center;color:#D9D9D9;">
                                                 <h3 >Hiện chưa có dữ liệu</h3>
                                             </div>
                                         </li>`);
    }
}


function SuaDuLieuKyNangUngVien(ID) {
    var result = NTS.getAjax('/UngVien/HoSoUngVien/LoadDuLieuSuaKyNangUngVien', { ID: ID }).Result;
    if (result.length > 0) {
        data = result[0];
        $('#ModalThemKyNang').modal('show');
        $('#tieudemodalKyNang').text("Cập nhật kỹ năng chuyên môn");
        $('#KyNangUngVienID').value(ID);
        $('#TenKyNang').value(data.TenKyNang);
        CKEDITOR.instances.MoTaKyNangCM.setData(result[0].MoTa);
        ThaoTac = "sua";
    }
    else {
        NTS.loi('Tải dữ liệu sửa thất bại')
    }
}

function XoaKyNangUngVien(ID) {
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/UngVien/HoSoUngVien/XoaKyNangUngVien', { id: ID });
        if (!result.Err) {
            LoadKyNangUngVien();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });    
}

//Tin học - Ngoại ngữ
function TruocKhiThemTinHoc() {
    $('#TenTinHoc_NgoaiNgu').value("");
    CKEDITOR.instances.MoTaTinHocNgoaiNgu.setData("");
}

$(document).on('click', '#btn_luutinhoc', function () {
    const validate = new NTSValidate('#ModalThemTinHocNgoaiNgu');
    //Kiểm tra bắt buộc nhập 1
    if (!validate.trim().check()) {
        return false;
    }
    var mang = new Array();
    mang[0] = ThaoTac;
    mang[1] = $('#TinHocNgoaiNguUngVienID').value();
    mang[2] = $('#TenTinHoc_NgoaiNgu').value();
    mang[3] = CKEDITOR.instances.MoTaTinHocNgoaiNgu.getData();
    mang[4] = $('#NguoiTimViecID').value();

    if ($('#TenTinHoc_NgoaiNgu').isempty("Tên tin học, ngoại ngữ không được bỏ trống!")) return false;

    var result = NTS.getAjax('/UngVien/HoSoUngVien/LuuThongTin_TinHocNgoaiNgu', { data: mang });
    if (!result.Err) {
        $('#TinHocNgoaiNgu_items').html('');
        NTS.thanhcong(result.Msg);
        LoadTinHocNgoaiNguUngVien();
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }    
    $('#ModalThemTinHocNgoaiNgu').modal('hide');
    TruocKhiThemTinHoc();
});

function LoadTinHocNgoaiNguUngVien() {
    $('#TinHocNgoaiNgu_items').html('');
    var GetAll = NTS.getAjax_NoVerifi('/UngVien/HoSoUngVien/getTinHocNgoaiNgu', {}).Result;
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            data = GetAll[i];

            $('#TinHocNgoaiNgu_items').append(`
                     <li class="list_items">
                         <div class="col-md-11 ten_hocvan ten_kynang">
                             <h3>${data.TenTinHocNgoaiNguUngVien}</h3>
                             <p>${data.MoTa}</p>
                         </div>
                         <div class="hocvan_icon col-md-1">
                             <span class="btnSuaTinHocNgoaiNgu" data=${data.TinHocNgoaiNguUngVienID}>
                                 <i class="icon_pen hocvan_icon-item fa-solid fa-pencil"></i>
                             </span>
                             <span class="btnXoaTinHocNgoaiNgu" data=${data.TinHocNgoaiNguUngVienID}>
                                 <i class="icon_strash hocvan_icon-item fa-solid fa-trash-can"></i>
                             </span>
                         </div>
                     </li>
            `)
        }
    } else {
        $('#TinHocNgoaiNgu_items').append(` <li class="list_items">
                                             <div class="col-md-12 ten_hocvan"style="padding:26px 0;text-align:center;color:#D9D9D9;">
                                                 <h3 >Hiện chưa có dữ liệu</h3>
                                             </div>
                                         </li>`);
    }
}

function SuaDuLieuTinHocNgoaiNgu(ID) {
    var result = NTS.getAjax('/UngVien/HoSoUngVien/LoadDuLieuSuaTinHocNgoaiNgu', { ID: ID }).Result;
    if (result.length > 0) {
        data = result[0];
        $('#ModalThemTinHocNgoaiNgu').modal('show');
        $('#tieudemodalKyNang').text("Cập nhật tin học, ngoại ngữ");
        $('#TinHocNgoaiNguUngVienID').value(ID);
        $('#TenTinHoc_NgoaiNgu').value(data.TenTinHocNgoaiNguUngVien);
        CKEDITOR.instances.MoTaTinHocNgoaiNgu.setData(result[0].MoTa);
        ThaoTac = "sua";
    }
    else {
        NTS.loi('Tải dữ liệu sửa thất bại')
    }
}

function XoaKyTinHocNgoaiNgu(ID) {
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/UngVien/HoSoUngVien/XoaTinHocNgoaiNguUngVien', { id: ID });
        if (!result.Err) {
            LoadTinHocNgoaiNguUngVien();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });    
}


function CapNhatTrangThaiButtonXacThuc() {
    

    var data = NTS.getAjax('/UngVien/HoSoUngVien/LoadDuLieuSua', {}).Result;
    let array = data[0];
    if (array.TrangThaiDuyet == '1') {
        $('#XacThuc').html('');
        $('#alertTuChoi').html('');
        $('#XacThuc').append(`
        <button type="button"  class="btn_xacthuc" id="btn_xacthuc"><i class="icon-sent fa-solid fa-paper-plane"></i><p>Gửi xác thực</p></button>`);
    } else if (array.TrangThaiDuyet == '3') {
        $('#XacThuc').html('');
        $('#alertTuChoi').html('');
        $('#XacThuc').append(`<div  class=" btn_xacthuc_hover"><i class="fa-solid fa-circle-check"></i>&ensp;<p>Đã xác thực</p></div>`);
    } else if (array.TrangThaiDuyet == '4') {
        $('#XacThuc').html('');
        $('#alertTuChoi').html('');
        $('#alertTuChoi').append(` <div class="alert alert-danger " style="background: white;">
                              <span><strong><i class="fa-solid fa-circle-exclamation"></i></strong> Thông tin hồ sơ chưa hợp lệ!</span>
                                <span>Nội dung từ chối: ${array.NoiDungTuChoi}</span>
                            </div>`);
    }
    else {
        $('#XacThuc').html('');
        $('#alertTuChoi').html('');
        $('#alertTuChoi').append(` <div class="alert alert-success " style="background: white;">
                              <span><strong><i class="fa-solid icon-sent fa-check"></i></strong> Đã gửi xác thực!</span>
                            </div>`);

    }
}

function CapNhatTrangThaiButtonXetDuyet() {
    var data = NTS.getAjax('/UngVien/HoSoUngVien/LoadDuLieuHoSoViecLam', {}).Result;
    
    let array = data[0];
    var temp = true;
    if (array == undefined) {
        temp = false; //truong hop vua tao tai khoan, chua co tao du lieu viec lam
    }
    if (temp == true) {
        if (array.TrangThai == '1') {
            $('#XetDuyet').html('');
            $('#alertTuChoiDuyet').html('');
            $('#XetDuyet').append(`
            <button type="button"  class="btn_xacthuc" id="btnXetDuyet"><i class="icon-sent fa-solid fa-paper-plane"></i><p>Gửi xét duyệt</p></button>`);
        } else if (array.TrangThai == '4') {
            $('#XetDuyet').html('');
            $('#alertTuChoiDuyet').html('');
            $('#alertTuChoiDuyet').append(` <div class="alert alert-danger "style="background: white;">
                              <span><strong><i class="fa-solid fa-circle-exclamation"></i></strong> Thông tin hồ sơ chưa hợp lệ!</span>
                                <span>Nội dung từ chối: ${array.NoiDungTuChoiHSViecLam}</span>
                            </div>`);
        } else if (array.TrangThai == '3') {
            $('#XetDuyet').html('');
            $('#alertTuChoiDuyet').html('');
            $('#XetDuyet').append(` <div  class=" btn_xacthuc_hover"><i class="fa-solid fa-circle-check"></i>&ensp;<p>Đã xét duyệt</p></div>`);
        } else {
            $('#XetDuyet').html('');
            $('#alertTuChoiDuyet').html('');
            $('#alertTuChoiDuyet').append(` <div class="alert alert-success "style="background: white;">
                              <span><strong><i class="fa-solid icon-sent fa-check"></i></strong> Đã gửi xét duyệt!</span>
                            </div>`);
        }
    }
}

function GuiXacThuc() {
    CanhBaoGuiPheDuyetTinDangTuyen(() => {
        var result = NTS.getAjax('/UngVien/HoSoUngVien/Update_TrangThai', {});
        if (!result.Err) {
            CapNhatTrangThaiButtonXacThuc();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }, () => { }, "");
}


function GuiXetDuyet() {
    CanhBaoGuiPheDuyetTinDangTuyen(() => {
        var result = NTS.getAjax('/UngVien/HoSoUngVien/Update_TrangThaiHSViecLam', {});
        if (!result.Err) {
            
            CapNhatTrangThaiButtonXetDuyet();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }, () => { }, "");
}

function CapNhatTrangThaiBiTuChoiXetDuyet() {
    var result = NTS.getAjax('json', '/CongThongTinViecLam/UngVien/HoSoUngVien.aspx/CapNhatTTHSViecLam', {})[0];
    return false;
}

function CapNhatTrangThaiBiTuChoiXacThuc() {
    var result = NTS.getAjax('json', '/CongThongTinViecLam/UngVien/HoSoUngVien.aspx/CapNhatTTHSCaNhan', {})[0];
    return false;
}


// logo

$(document).on('click', '#btnChonTepVB_tailieu', function () {
    $('#fileVB_tailieu').click();
});
$(document).on('change', '#fileVB_tailieu', function () {
    UploadTaiLieu_us('UngVien'); //hàm dùng chung ở us TaiLieu
});
function UploadTaiLieu_us(pathChiTiet) {
    let data = NTS.upload({
        name: '#fileVB_tailieu',///ID input type="file"
        loaiVB: 'VB',///Nhận 1 trong 2 giá trị DL hoặc VB
    });
    if (data.length > 0) {
        var UngVien = NTS.getAjax('/UngVien/TongQuan/getHoSoUngVienID', {}).Result;
        var UngVienID = UngVien[0].UngVienID;
        let result = NTS.getAjax("/CongThongTinViecLam/Function/LuuDinhKem_MotFile", { PathTemp: data, ID: UngVienID, PathChiTiet: 'UngVien', bangDk: 'UngVien', cotDk: 'UngVienID', cotDinhKem: 'AnhDaiDien' });
        
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
    var UngVien = NTS.getAjax('/UngVien/TongQuan/getHoSoUngVienID', {}).Result;
    var UngVienID = UngVien[0].UngVienID;
    let duongDan = $(this);
    let id = UngVienID;
    let bang = "UngVien";
    let cot = "UngVienID";
    CanhBaoXoa(() => {
        let result = NTS.getAjax('/CongThongTinViecLam/Function/XoaDinhKem', { ID: id, duongDan: duongDan.attr('data-url-file'), bangDk: bang, cotDk: cot, loai: '', tenCotDinhKem: 'AnhDaiDien' });
        if (!result.Err) {
            duongDan.parent('div').remove();
            $('#fileVB_tailieu').value('');
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
    return false;
});
