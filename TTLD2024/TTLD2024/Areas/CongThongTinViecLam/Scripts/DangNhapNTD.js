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


function dangNhap() {
    var param = new Array();
    param[0] = $('#email').val();
    param[1] = $('#password').val();
    if ($('#email').val() == "") {
        NTS.canhbao('Chưa nhập tên đăng nhập.');
        $('#email').focus();
        return;
    } else if (KiemTraEmail($('#email').val()) === false) {
        NTS.canhbao("Email đăng nhập chưa đúng định dạng!");
        $('#email').focus();
        return false;
    }
    if ($('#password').val() == "") {
        NTS.canhbao('Chưa nhập mật khẩu.');
        $('#password').focus();
        return;
    }

    var ketQua = (NTS.getdata({
        ajaxUrl: '/DangNhapNTD/DangNhap',
        ajaxParam: { data: param },
    }).d);
    if (ketQua == "1") {
        NTS.thanhcong('Đăng nhập thành công!');
        window.location = "/tong-quan-nha-tuyen-dung.html";
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