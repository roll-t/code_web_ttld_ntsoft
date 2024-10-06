var Flag = 0;
$(function () {
    
    layToanBoDuLieu();

    $('#HoVaTen').change(function () {
        if (Flag == 1) {
            LuuThongTin();
        }
    })
    $('#Email').change(function () {
        if (Flag == 1) {
            LuuThongTin();
        }
    })
    $('#SoDienThoai').change(function () {
        if (Flag == 1) {
            LuuThongTin();
        }
    })
    //$('#selMenuCha').change(function () {
    //    if (Flag == 1) {
    //        LuuThongTin();
    //    }
    //})
    $('#NgaySinh').change(function () {
        if (Flag == 1) {
            LuuThongTin();
        }
    })
    $('#GioiTinh').change(function () {
        if (Flag == 1) {
            LuuThongTin();
        }
    })
    $('#CCCD').change(function () {
        if (Flag == 1) {
            LuuThongTin();
        }
    })
    $('#DiaChi').change(function () {
        if (Flag == 1) {
            LuuThongTin();
        }
    })
    Flag = 1;
    setTimeout(function () {
        $('#GioiTinh').select2({
            width: '100%'
        });
    }, 100)
})
$(document).on('click', '#avatar', function () {
    $('#fileVB_us').click();
});
$(document).on('change', '#fileVB_us', function () {
    var data = NTS.upload({
        name: '#fileVB_us',///ID input type="file"
        loaiVB: 'HA',///Nhận 1 trong 2 giá trị DL hoặc VB
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
$('#HienMK').change(function (e) {
    if ($('#HienMK').value() == true) {
        $('#MKMoi').prop('type', 'text');
        $('#XNMK').prop('type', 'text');
    }
    else {
        $('#MKMoi').prop('type', 'password');
        $('#XNMK').prop('type', 'password');
    }
});
function layToanBoDuLieu() {
    //NTS.loadDataCombo({
    //    name: "#selMenuCha",
    //    ajaxUrl: '/HeThong/Profile/LayDanhSachMenu',
    //    columns: 2,
    //    indexValue: 0,
    //    indexText: 1,
    //    indexText1: 2,
    //    textChange: "text1",
    //    indexDefault: 1,
    //    showTatCa: true
    //});
    var result = NTS.getAjax('/HeThong/Profile/GetDataUser', {});
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#UserID').val(data.UserID);
        $('#HoVaTen').value(data.HoVaTen);
        $('#Email').value(data.Email);
        $('#SoDienThoai').value(data.SoDienThoai);
        /*$('#selMenuCha').value(data.MenuID_HienThi);*/
        $('#lbl_TenDonVi').text(data.TenDonVi);
        $('#lbl_NhomNguoiDung').text(data.UserGroupName);
        $('#lbl_TenDangNhap').text(data.TenDangNhap);
        $('#lbl_HoVaTen').text(data.HoVaTen);
        $('#NgaySinh').value(data.NgaySinh);
        $('#GioiTinh').value(data.GioiTinh);
        $('#CCCD').value(data.CCCD);
        $('#DiaChi').value(data.DiaChi);
        
        if (data.Avatar == undefined || data.Avatar =='') {
            $('#avatar').prop('src', "/Images/avatar-1.png");
        } else {
            $('#avatar').prop('src', data.Avatar);
        }
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
}
function LuuThongTin() {
    var param = new Array();
    param[0] = $('#HoVaTen').value();
    param[1] = $('#Email').value();
    param[2] = $('#SoDienThoai').value();
    param[3] = "";
    param[4] = $('#avatar').attr('src');
    param[5] = $('#NgaySinh').value();
    param[6] = $('#GioiTinh').value();
    param[7] = $('#CCCD').value();
    param[8] = $('#DiaChi').value();
    var KQ = NTS.getAjax('/HeThong/Profile/LuuThongTin', { Data: param });
    
    if (!$.isEmptyObject(KQ) && KQ != null) {
        var result = NTS.getAjax('/HeThong/Profile/GetDataUser', {});
        if (result.length > 0) {
            $('#lbl_HoVaTen').text(result[0].HoVaTen);
        }
        var resultAct = NTS.getAjax('/HeThong/Profile/GetDataUser', {});
        
        var resultAct = NTS.getAjax('/HeThong/Profile/GetDataUser', {});
        if (!resultAct.Err && resultAct.Result != null) {
            let data = resultAct.Result[0];
            $('#hovaten_layout').text(data.HoVaTen);
            if (data.Avatar == "") {
                $('#avt_layout').prop('src', "../../Images/avatar-1.png");
            } else {
                $('#avt_layout').prop('src', data.Avatar);
            }
        }
        else resultAct.CanhBao ? NTS.canhbao(resultAct.Msg) : NTS.loi(resultAct.Msg);
        
    }
}
$(document).on('click', '#btn_XacNhan', function () {
    var param = new Array();
    param[0] = $('#MKCu').value();
    param[1] = $('#MKMoi').value();
    param[2] = $('#XNMK').value();
    if (isEmty($('#MKCu').value())) {
        NTS.canhbao('Mật khẩu cũ không được để trống!');
        $('#MKCu').focus();
        return false;
    }
    if (isEmty($('#MKMoi').value())) {
        NTS.canhbao('Mật khẩu mới không được để trống!');
        $('#MKMoi').focus();
        return false;
    }
    if ($('#MKMoi').value().length < 5) {
        NTS.canhbao('Vui lòng nhập mật khẩu mới lớn hơn 5 ký tự!');
        $('#MKMoi').focus();
        return false;
    }
    if (isEmtyValue($('#XNMK').value())) {
        NTS.canhbao('Vui lòng nhập mật khẩu xác nhận đồng nhất với mật khẩu mới!');
        $('#XNMK').focus();
        return false;
    }
    if ($('#MKMoi').value().toLocaleLowerCase() != $('#XNMK').value().toLocaleLowerCase()) {
        NTS.canhbao('Mật khẩu không đồng nhất!');
        return false;
    }
    var KQ = NTS.getAjax('/HeThong/Profile/LuuMatKhau', { Data: param });
    if (!$.isEmptyObject(KQ) && KQ != null) {
        if (KQ.split('_')[0] == '1') {
            NTS.thanhcong(KQ.split('_')[1]);

        }
        if (KQ.split('_')[0] == '2') {
            NTS.canhbao(KQ.split('_')[1]);

        }
    }
});