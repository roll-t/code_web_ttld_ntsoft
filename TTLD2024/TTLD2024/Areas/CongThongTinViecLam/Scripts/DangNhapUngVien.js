document.onkeypress = enter;
function enter(e) {
    if (e.which == 13) { dangNhap(); }
}
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function () {
    // Toggle thuộc tính type của input
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // Toggle class hoặc icon cho phù hợp (nếu cần)
    this.classList.toggle('visible'); // Bạn có thể thêm lớp CSS để thay đổi icon khi mật khẩu được hiển thị
    this.classList.toggle('fa-eye-slash');
    this.classList.toggle('fa-eye');
});

// Lấy tất cả các input có thuộc tính required
const requiredInputs = document.querySelectorAll('input[required]');

// Lặp qua từng input và thêm sự kiện 'blur' để kiểm tra khi người dùng click ra khỏi input
requiredInputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (this.value.trim() === '') {
            // Nếu input trống, thay đổi viền thành màu đỏ
            this.style.borderColor = 'red';
        } else {
            // Nếu input có giá trị, bỏ màu đỏ
            this.style.borderColor = '';
        }
    });
});

$("#btnHuy").click(function () {
    window.location = "/trang-chu.html";
});

jQuery(function ($) {
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
});
/*$(function () {
    NTS.loadDataCombo({
        name: '#selDiaBan',
        ajaxUrl: '/HeThong/Login.aspx/getDiaBan',
        indexValue: 0,
        indexText: 1,
        showTatCa: !0,
        indexDefault: 2
    });
});*/
function dangNhap() {
    var param = new Array();
    param[0] = $('#email').val();
    param[1] = $('#password').val();
    if ($('#email').val() == "") {
        NTS.canhbao('Chưa nhập Email đăng nhập.');
        $('#email').focus();
        return;
    }
    if ($('#password').val() == "") {
        NTS.canhbao('Chưa nhập mật khẩu.');
        $('#password').focus();
        return;
    }
    
    var ketQua = (NTS.getdata({
        ajaxUrl: '/DangNhapUngVien/DangNhap',
        ajaxParam: { data: param },
    }).d);
    if (ketQua == "1") {
        NTS.thanhcong('Đăng nhập thành công!');
        window.location = "/tong-quan-ung-vien.html";
    }
    else if (ketQua == "2") {
        NTS.canhbao('Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu. Nếu bạn đã đăng ký tài khoản, vui lòng kiểm tra email kích hoạt.');
    }
    else if (ketQua == "3") {
        NTS.canhbao('Đăng nhập thất bại!');
    }
    else {
        NTS.loi(ketQua);
    }
    return false;
}
$('#btnDangNhap').click(function () {
    NTS.loadding();
    setTimeout(function () {
        dangNhap();
        NTS.unloadding();
    }, 100);
});
function TroGiup() {
    bootbox.confirm({
        title: "Hướng dẫn sử dụng",
        message: "<h6>Phần mềm quản lý doanh nghiệp - QLLĐ, được cung cấp và phát triển bởi công ty TNHH Phát Triển Phần Mềm Nhất Tâm.</br>Điện thoại: (0270) 3 843 058, Fax: (0270) 3 843 058</br>Email: ntsoft@nhattamsoft.vn</br>Địa chỉ: Số C40, đường Phó Cơ Điều, Phường 3, TP. Vĩnh Long, tỉnh Vĩnh Long</br>Địa chỉ 2: Số 33/6, đường Mậu Thân, Phường 3, TP. Vĩnh Long, tỉnh Vĩnh Long.</br>Các bước đăng nhập phần mềm...!</br>Bước 1: Nhập tên đăng nhập, mật khẩu và chọn niên độ làm việc;</br>Bước 2: Nhấp chọn [Đăng nhập] để đăng nhập vào phần mềm;</br>Bước 3: Khi người dùng đăng nhập vào phần mềm nhưng không thực hiện đăng xuất và sau đó tiếp tục đăng nhập lại phần mềm, khi đó phần mềm sẽ yêu cầu nhập [Mã xác nhận] để tiếp tục sử dụng (Bước 3 chỉ thực hiện khi phần mềm yêu cầu nhập [Mã xác nhận]).</br>***Ghi chú: Mã xác nhận được cung cấp kèm theo thông tin đăng nhập phần mềm.***'</h6>",
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

