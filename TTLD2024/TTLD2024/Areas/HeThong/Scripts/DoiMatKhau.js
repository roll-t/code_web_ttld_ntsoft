

var mode = ""
var laModeNhanBan = false
$(document).ready(() => {
    var ThongTin = NTS.getAjax('/HeThong/DoiMatKhau/GetThongTinUser')[0];
    $('#lblTen').text(ThongTin.HoTen);
    $('#lblTenDangNhap').text(ThongTin.TenDangNhap);
    $('#lblTenDonVi').text(ThongTin.DonVi);
    if (ThongTin.HinhAnh == undefined || ThongTin.HinhAnh == '') {
        $('#AnhDaiDien_dmk').prop('src', "../../Images/avatar-1.png");
    } else {
        $('#AnhDaiDien_dmk').prop('src', ThongTin.HinhAnh.replace('*',''));
    }
    $('#btnLuu').click(function (e) {
        if (isEmtyValue($('#MKCu').value())) {
            NTS.canhbao('Vui lòng nhập mật khẩu cũ!');
            $('#MKCu').focus();
            return false;
        }
        if (isEmtyValue($('#MKMoi').value())) {
            NTS.canhbao('Vui lòng nhập mật khẩu mới!');
            $('#MKMoi').focus();
            return false;
        }
        if ($('#MKMoi').value().length < 5) {
            NTS.canhbao('Vui lòng nhập mật khẩu mới lớn hơn 5 ký tự!');
            $('#MKMoi').focus();
            return false;
        }
        if ($('#MKMoi').value() == $('#MKCu').value()) {
            NTS.canhbao('Mật khẩu cũ và mật khẩu mới phải khác nhau!');
            return false;
        }
        
        $.confirm({
            title: '<span class="text-dark">Thông báo!</span>',
            type: 'red',
            icon: 'fa fa-warning',
            typeAnimated: true,
            theme: 'material',
            columnClass: 'col-md-5 col-md-offset-3 w-max-400px',
            content: 'Xác nhận đổi mật khẩu chọn <b>"Xác nhận"</b>, hủy bỏ chọn <b>"Hủy bỏ"</b>',
            buttons: {
                confirm: {
                    text: '<i class="fa fa-check"></i> Xác nhận',
                    btnClass: 'btn-primary',
                    keys: ['shift'],
                    action: async function () {
                        var param = new Array();
                        param[0] = $('#MKMoi').value();
                        param[1] = $('#XNMK').value();
                        param[2] = $('#MKCu').value();
                        var Data = NTS.getAjax('/HeThong/DoiMatKhau/LuuThongTin', { param: param });
                        if (Data.split('_')[0] == "0") {
                            NTS.canhbao(Data.split('_')[1]);
                        }
                        else {
                            NTS.thanhcong('Đổi mật khẩu thành công!');
                        }
                    }
                },
                cancel: {
                    text: '<i class="fa fa-close"></i> Hủy bỏ',
                    btnClass: 'btn-danger',
                    keys: ['enter', 'esc', 'space'],
                }
            }
        });
    });

    $('#HienMK').change(function (e) {
        if ($('#HienMK').value() == true) {
            $('#MKMoi').prop('type', 'text');
            $('#XNMK').prop('type', 'text');
            $('#MKCu').prop('type', 'text');
        }
        else {
            $('#MKMoi').prop('type', 'password');
            $('#XNMK').prop('type', 'password');
            $('#MKCu').prop('type', 'password');
        }
    });

    Flag = 1;
})
function GuiIconVeModal(icon) {
    $('#txtIcon').val(icon)
}
$(document).on('click', '#avatar', function () {
    $('#fileVB_us').click();
});
$(document).on('change', '#fileVB_us', function () {
    var data = NTS.upload({
        name: '#fileVB_us',///ID input type="file"
        loaiVB: 'DL',///Nhận 1 trong 2 giá trị DL hoặc VB
    });
    if (data.length > 0) {
        arrFile = data.replace('*', '')
        if (arrFile.substring(arrFile.lastIndexOf('.'), arrFile.length).toLocaleLowerCase() == ".png" ||
            arrFile.substring(arrFile.lastIndexOf('.'), arrFile.length).toLocaleLowerCase() == ".jpeg" ||
            arrFile.substring(arrFile.lastIndexOf('.'), arrFile.length).toLocaleLowerCase() == ".jpg") {
            $('#avatar').prop('src', data.replace('~', '').replace('*', ''));
            LuuThongTin();
        }
        else {
            NTS.canhbao('Vui lòng chọn file ảnh!');
        }
    }
});
function LuuThongTin() {
    var param = new Array();
    param[0] = $('#HoTen').value();
    param[1] = $('#txtEmail').value();
    param[2] = $('#avatar').attr('src');
    var KQ = NTS.getAjax('/HeThong/DoiMatKhau/LuuThongTin', { Data: param });
    if (!$.isEmptyObject(KQ) && KQ != null) {
        if (KQ.split('_')[0] == '1') {
            NTS.thanhcong(KQ.split('_')[1]);
        }
    }
}
