var checkKiemTra = false;
document.onkeypress = enter;
async function enter(e) {
    if (e.which == 13) {
        await dangNhap();
    }
}
jQuery(function ($) {
    generateCAPTCHA();
    try {
        $('body').ripples({
            resolution: 512,
            dropRadius: 20, //px
            perturbance: 0.04,
        });
    }
    catch (e) {

    }
    //$('body').attr('class', 'login-layout light-login');
    //$('#id-company-text').attr('class', 'blue');
    $('#txtnamlamviec').val(new Date().getFullYear());
    var message = 'Right Click is disabled';
    function clickIE() { if (event.button == 2) { alert(message); return false; } }
    function clickNS(e) {
        if (document.layers || (document.getElementById && !document.all)) {
            if (e.which == 2 || e.which == 3) { return false; }
        }
    }
    if (document.layers) { document.captureEvents(Event.MOUSEDOWN); document.onmousedown = clickNS; }
    else if (document.all && !document.getElementById) { document.onmousedown = clickIE; }
    NTS.unloadding();
});
async function dangNhap() {
    var param = new Array();
    param[0] = $('#txtusername').val(); 
    param[1] = $('#txtpassword').val();
    param[2] = $('#txtmaxacnhan').val();
    param[3] = $('#txtnamlamviec').val();
   
    if ($('#txtnamlamviec').val() == "") {
        canhbao('Chưa nhập năm làm việc.');
        $('#txtnamlamviec').focus();
        return;
    }
    //if (checkKiemTra == false) {
    //    canhbao('Vui lòng xác nhận captcha!');
    //    $('#input').focus();
    //    return;
    //}
    var ketQua = NTS.getAjax("/HeThong/Login/DangNhap", { data: param });
    //if (ketQua == "1") {
    //    canhbao('Mã xác nhận không đúng!')
    //    $('div[for="xacnhan"]').css('visibility', 'visible');
    //    $('div[for="xacnhan"]').css('display', 'block');
    //}
    //else if (ketQua == "2") {
    //    canhbao('Nhập vào mã xác nhận.')
    //    $('div[for="xacnhan"]').css('visibility', 'visible');
    //    $('div[for="xacnhan"]').css('display', 'block');
    //}

    if (ketQua == "4") {
        canhbao('Không tồn tại niên độ ' + $('#txtnamlamviec').val() + ' hoặc Hệ thống chưa được đăng ký sử dụng!');
    }
    else if (ketQua == "5") {
        canhbao('Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
    }
    else if (ketQua == "6") {
        canhbao('Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
    }
    else if (ketQua == "7") {
        canhbao('Bạn nhập sai thông tin quá nhiều lần!');
    }
    else if (ketQua == "8") {
        canhbao('Thông tin đơn vị đăng nhập không hợp lệ!');
    }
    else if (ketQua == "") {
        canhbao('Đăng nhập thất bại. Vui lòng liên hệ ban quản trị');
    }
    else if (ketQua == "9") {
        canhbao('Không thể kết nối đến CSDL!');
    }
    else if (ketQua == "3") {
        window.location = "/quanly/tongquan";
    }
    else if (ketQua.split('*').length > 1) {
        window.location = ketQua.split('*')[1];
    }
    else {
        canhbao(ketQua);
    }
    return false;
}
$('#btnDangNhap').click(async function () {
    await dangNhap();
    return false;
});
function TroGiup() {
    bootbox.confirm({
        title: "Hướng dẫn sử dụng",
        message: "<h6>HỆ THỐNG QUẢN LÝ CẢI CÁCH HÀNH CHÍNH - NTSOFT, được cung cấp và phát triển bởi công ty TNHH Phát Triển Phần Mềm Nhất Tâm.</br>Điện thoại: (0270) 3 843 058, Fax: (0270) 3 843 058</br>Email: ntsoft@nhattamsoft.vn</br>Địa chỉ:Địa chỉ: Số H25, đường Phan Văn Đáng, Phường 8, thành Phố Vĩnh Long, tỉnh Vĩnh Long.</br>Các bước đăng nhập phần mềm...!</br>Bước 1: Nhập tên đăng nhập, mật khẩu và chọn niên độ làm việc;</br>Bước 2: Nhấp chọn [Đăng nhập] để đăng nhập vào phần mềm;</br>Bước 3: Khi người dùng đăng nhập vào phần mềm nhưng không thực hiện đăng xuất và sau đó tiếp tục đăng nhập lại phần mềm, khi đó phần mềm sẽ yêu cầu nhập [Mã xác nhận] để tiếp tục sử dụng (Bước 3 chỉ thực hiện khi phần mềm yêu cầu nhập [Mã xác nhận]).</br>***Ghi chú: Mã xác nhận được cung cấp kèm theo thông tin đăng nhập phần mềm.***'</h6>",
        className: 'bb-alternate-modal',
        buttons: {
            cancel: {
                label: '<i class="fa fa-close"></i> Đóng',
                className: "btn-danger btn-sm",
            },
            confirm: {

                label: '<i class="fa fa-phone"></i> HotLine: (0270) 3 843 058',
                className: "btn-primary btn-sm",
            }
        },
        callback: function (result) {
            if (result) {
            }
        }
    });
    return false;
}
$('#HienMatKhau').click(async function () {
    if ($('#HienMatKhau').value() == true) {
        $("#txtpassword").attr('type', 'text');
        $("#txtmaxacnhan").attr('type', 'text');
    }
    else {
        $("#txtpassword").attr('type', 'password');
        $("#txtmaxacnhan").attr('type', 'password');
    }
});
$(document).on('click', '#btnGuiMa', async function () {
    if ($('#txtusernamereset').val() == "") {
        canhbao('Chưa nhập tên đăng nhập.');
        $('#txtusernamereset').focus();
        return;
    }
    
    var data = JSON.parse(NTS.getAjax('/api/sendAuthCode', { username: $('#txtusernamereset').value() }));
    if (data.split('_')[0] == "1") {
        NTS.dongthongbao();
        /*NTS.thanhcong(data.split('_')[2]);*/
        setTimeout(function () {
            window.location = "/ResetPassword/AuthCode.html?AuthID=" + data.split('_')[1];
        }, 3000);
    }
    else
        if (data.split('_')[0] == "0") {
            NTS.dongthongbao();
            /*NTS.canhbao(data.split('_')[1]);*/
        }
        else
            if (data.split('_')[0] == "-1") {
                NTS.dongthongbao();
                /* NTS.canhbao(data.split('_')[1]);*/
            }
    return false;
});

var input = document.getElementById("maCAPTCHA"),

    submit_ = document.getElementById("submit_"),

    boxCAPTCHA = document.getElementById("box-CAPTCHA"),

    boxDone = document.getElementById("box-done"),

    CAPTCHA = document.getElementById("CAPTCHA");

input.onfocus = function () {

    "use strict";

    if (this.placeholder === "Type CAPTCHA Here") {

        this.placeholder = "";
    }

};

input.onblur = function () {

    "use strict";

    if (this.placeholder === "") {

        this.placeholder = "Nhập mã Captcha đại đây";
    }

};
jQuery.fn.cssImportant = function (name, value) {
    const $this = this;
    const applyStyles = (n, v) => {
        // Convert style name from camelCase to dashed-case.
        const dashedName = n.replace(/(.)([A-Z])(.)/g, (str, m1, upper, m2) => {
            return m1 + "-" + upper.toLowerCase() + m2;
        });
        // Loop over each element in the selector and set the styles.
        $this.each(function () {
            this.style.setProperty(dashedName, v, 'important');
        });
    };
    // If called with the first parameter that is an object,
    // Loop over the entries in the object and apply those styles. 
    if (jQuery.isPlainObject(name)) {
        for (const [n, v] of Object.entries(name)) {
            applyStyles(n, v);
        }
    } else {
        // Otherwise called with style name and value.
        applyStyles(name, value);
    }
    // This is required for making jQuery plugin calls chainable.
    return $this;
};
function generateCAPTCHA() {
    checkKiemTra = false;
    "use strict";

    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",

        CAPTCHALength = 6,

        randomCAPTCHA = "",

        i,

        randomNumber;

    for (i = 0; i < CAPTCHALength; i = i + 1) {

        randomNumber = Math.floor(Math.random() * chars.length);

        randomCAPTCHA += chars.substring(randomNumber, randomNumber + 1);
    }

    CAPTCHA.innerHTML = randomCAPTCHA;

    submit_.onclick = function () {

        if (input.value === "") {
            canhbao("Vui lòng nhập mã Captcha");
            input.focus();
            checkKiemTra = false;

        } else if (input.value !== randomCAPTCHA) {
            canhbao("Captcha không đúng. Vui lòng thử lại!");
            generateCAPTCHA();
            $('#maCAPTCHA').cssImportant('background', 'rgb(255 227 228)');
            $('#maCAPTCHA').cssImportant('border', '1px solid rgb(248 140 144)');
            checkKiemTra = false;

        } else {
            thongbao("Xác nhận Catpcha thành công!");
            input.disabled = true;
            $('#maCAPTCHA').cssImportant('background', '#deffe1');
            $('#maCAPTCHA').cssImportant('border', '1px solid rgb(186 255 192)');
            $('.btnXacNhan').hide();
            $('.btnLamMoi').hide();
            checkKiemTra = true;
        }
        return false;
    };

}

function back() {

    "use strict";

    document.getElementById("wrong").style.display = "none";

    boxDone.style.display = "none";

    boxCAPTCHA.style.display = "block";

    input.value = "";

    generateCAPTCHA();

}