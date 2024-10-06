$('#validate-button-register').click(function () {
    LuuNguoiDung();
});
const togglePassword = document.querySelector('#togglePassword');
const toggleRepassword = document.querySelector('#toggleRepassword');
const password = document.querySelector('#password');
const Repassword = document.querySelector('#repassword');

togglePassword.addEventListener('click', function () {
    // Toggle thuộc tính type của input
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // Toggle class hoặc icon cho phù hợp (nếu cần)
    this.classList.toggle('visible'); // Bạn có thể thêm lớp CSS để thay đổi icon khi mật khẩu được hiển thị
    this.classList.toggle('fa-eye-slash');
    this.classList.toggle('fa-eye');
});
toggleRepassword.addEventListener('click', function () {
    // Toggle thuộc tính type của input
    const type = repassword.getAttribute('type') === 'password' ? 'text' : 'password';
    repassword.setAttribute('type', type);

    // Toggle class hoặc icon cho phù hợp (nếu cần)
    this.classList.toggle('visible'); // Bạn có thể thêm lớp CSS để thay đổi icon khi mật khẩu được hiển thị
    this.classList.toggle('fa-eye-slash');
    this.classList.toggle('fa-eye');
});
// Lấy tất cả các input có thuộc tính required
const requiredInputs = document.querySelectorAll('input[required]');

// Lặp qua từng input và thêm sự kiện 'blur' để kiểm tra khi người dùng click ra khỏi input
requiredInputs.forEach(input => {
    // Tạo thẻ span để hiển thị thông báo lỗi
    const errorMessage = document.createElement('span');
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '10px';
    errorMessage.style.marginTop = '5px';
    errorMessage.style.display = 'none'; // Ẩn thông báo ban đầu
    errorMessage.innerText = 'Thông tin này không được để trống!';

    // Thêm thẻ span ngay sau thẻ input
    input.parentNode.parentNode.insertBefore(errorMessage, input.parentNode.nextSibling);

    input.addEventListener('blur', function () {
        if (this.value.trim() === '') {
            // Nếu input trống, thay đổi viền thành màu đỏ và hiển thị thông báo lỗi
            this.style.borderColor = 'red';
            errorMessage.style.display = 'block'; // Hiển thị thông báo
            /*document.querySelectorAll('.toggle-password').forEach(element => {
                element.style.top = '30%';
            });*/


        } else {
            // Nếu input có giá trị, bỏ màu đỏ và ẩn thông báo lỗi
            this.style.borderColor = '';
            errorMessage.style.display = 'none'; // Ẩn thông báo
            /*document.querySelectorAll('.toggle-password').forEach(element => {
                element.style.top = '50%';
            });*/
        }
    });
});

/*
$(function () {
    NTS.loadDataCombo({
        name: '#selDiaBan',
        ajaxUrl: '/HeThong/Login.aspx/getDiaBan',
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0,
        indexDefault: 2
    });
});*/
function removeDiacritics(str) {
    var diacriticsMap = {
        'a': 'áàảạãâấầẩậẫăắằẳặẵÁÀẢẠÃÂẤẦẨẬẪĂẮẰẲẶẴ',
        'e': 'éèẻẹẽêếềểệễÉÈẺẸẼÊẾỀỂỆỄ',
        'i': 'íìỉịĩÍÌỈỊĨ',
        'o': 'óòỏọõôốồổộỗơớờởợỡÓÒỎỌÕÔỐỒỔỘỖƠỚỜỞỢỠ',
        'u': 'úùủụũưứừửựữÚÙỦỤŨƯỨỪỬỰỮ',
        'y': 'ýỳỷỵỹÝỲỶỴỸ',
        'd': 'đĐ'
    };
    for (var char in diacriticsMap) {
        var regex = new RegExp('[' + diacriticsMap[char] + ']', 'g');
        str = str.replace(regex, char);
    }
    return str;
}
function generateSlug(phrase) {
    var str = removeDiacritics(phrase).toLowerCase();
    str = str.replace(/\s+/g, '-'); // Thay thế khoảng trắng bằng dấu gạch ngang
    str = str.replace(/[^a-z0-9-]/g, ''); // Loại bỏ các ký tự đặc biệt
    str = str.replace(/-+/g, '-'); // Loại bỏ các dấu gạch ngang thừa
    return str.trim('-');
}
$('#firstname').on('change', function () {
    var DinhDanh = generateSlug($('#firstname').value());
    $('#TenDinhDanh').value('');
    $('#TenDinhDanh').value(DinhDanh);
});
function LuuNguoiDung() {
    var saveData = new Array();
    saveData[0] = $('#email').val();
    saveData[1] = $('#password').val();
    saveData[2] = $('#firstname').val();
    saveData[3] = $('#date').val();
    saveData[4] = $('input[name="genne"]:checked').val();
    saveData[5] = $('#tele').val();
    try {
        var matutang = NTS.getAjax('/CongThongTinViecLam/Function/LayMaTuTang', { strKyTu: "", strCotTang: "MaUngVien", strBangTang: "UngVien", strDinhDang: "000000" });
        saveData[6] = matutang.Result
    } catch (e) { }
    saveData[7] = $('#TenDinhDanh').value();
    //saveData[6] = $('#Address').val();
    if (saveData[0] == '') {
        NTS.canhbao("Email đăng nhập không được để trống");
        $('#email').focus();
        return false;
    } else if (KiemTraEmail(saveData[0]) === false) {
        NTS.canhbao("Email đăng nhập chưa đúng định dạng!");
        $('#email').focus();
        return false;
    }

    if (saveData[1] == '') {
        NTS.canhbao("Chưa nhập mật khẩu!");
        $('#password').focus();
        return false;
    }
    if ($('#repassword').val() == '') {
        NTS.canhbao("Chưa nhập lại mật khẩu!");
        $('#repassword').focus();
        return false;
    }
    if ((saveData[1]).length < 6) {
        NTS.canhbao("Mật khẩu không được ít hơn 6 lý tự!");
        $('#password').focus();
        return false;
    }
    if (saveData[1] != $('#repassword').val()) {
        NTS.canhbao("Mật khẩu nhập lại chưa chính xác!");
        $('#repassword').focus();
        return false;
    }
    if (saveData[2] == '') {
        NTS.canhbao("Họ và tên không được trống!");
        $('#firstname').focus();
        return false;
    }
    if ($('#tele').value() != '') {
        if (KiemTraSDT(saveData[5]) === false) {
            NTS.canhbao("Số điện thoại chưa đúng định dạng");
            $('#tele').focus();
            return false;
        }
    }
    if ($("#date").value() != "") {
        if ($("#date").value().split('/').length == 2 && $("#date").value().split('/')[1].length == 4) {
            if ($("#date").value().split('/')[0].length == 1) {
                $("#date").value('01/0' + $("#date").value()); // thêm số 0 trước tháng
            }
            else
                if ($("#date").value().split('/')[0].length == 2) {
                    $("#date").value('01/' + $("#date").value());
                }
                else {
                    NTS.canhbao('Ngày sinh không đúng định dạng ngày tháng!');
                    return !1;
                }
        }
        if ($("#date").value().length == 4) {
            $("#date").value('01/01/' + saveData[3]); // thêm ngày, tháng
        }
        var checkngay = NTS.getAjax('/DangKyUngVien/KiemTraNgay', { chuoiNgay: $('#date').value() });
        if (!checkngay.Result) {
            NTS.canhbao("Ngày sinh không đúng định dạng ngày tháng!");
            return false;
        }
        var kq = 0;
        var today = new Date();
        var namhientai = today.getFullYear();
        var ngaysinh = $('#date').val(); // Sử dụng .val() thay vì .value()
        if (ngaysinh.length == 4) {
            kq = namhientai - ngaysinh;
            if (kq < 15) {
                NTS.canhbao("Lao động đang nhập có số tuổi nhỏ hơn 15!");
                $('#date').focus();
                return false; // Thêm lệnh return để dừng hàm
            }
        } else {
            var [ngay, thang, nam] = ngaysinh.split('/');
            kq = namhientai - nam;
            if (kq < 15) {
                NTS.canhbao("Lao động đang nhập có số tuổi nhỏ hơn 15!");
                $('#date').focus();
                return false; // Thêm lệnh return để dừng hàm
            }
        }
    }
    else {
        NTS.canhbao("Chưa nhập ngày sinh!");
        $('#date').focus();
        return false;
    }
    var checkbox = document.getElementById("agree");
    if (!checkbox.checked) {
        checkbox.classList.add("error");
        NTS.canhbao("Vui lòng đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi!");
        return false;
    } else {
        checkbox.classList.remove("error");
    }
    var ketQua = NTS.getAjax('/DangKyUngVien/LuuNguoiDung', { data: saveData });
    if (ketQua.Err == false) {
        if (!sentEmail()) {
            return false;
        }
        NTS.thanhcong(ketQua.Msg + " Chuyển trang sau 3s");
        setTimeout(function () {
            window.location = "/dang-nhap-ung-vien.html";
        }, 3000);
        return false;
    }
    else {
        NTS.canhbao(ketQua.Msg);
        return false;
    }
}

function sentEmail() {
    //if ($('#email').val() === "") {
    //    NTS.canhbao('Chưa nhập Email.');
    //    $('#email').focus();
    //    return;
    //}
    // Gọi AJAX đến dịch vụ .asmx
    $.ajax({
        type: "POST",
        url: "/Services/AuthPassword.asmx/sendAuthCode_ActiveAcount", // Đường dẫn đến file .asmx
        data: JSON.stringify({ mail: $('#email').val() }), // Dữ liệu cần gửi đi
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var data = JSON.parse(response.d);

            if (data.split('_')[0] === "1") {
                NTS.dongthongbao();
                NTS.thanhcong(data.split('_')[1]);
                setTimeout(function () {
                    window.location = "/dang-nhap-ung-vien.html";
                }, 3000);
            } else if (data.split('_')[0] === "0") {
                NTS.dongthongbao();
                NTS.canhbao(data.split('_')[1]);
                return false;
            } else if (data.split('_')[0] === "-1") {
                NTS.dongthongbao();
                NTS.canhbao(data.split('_')[1]);
                return false;
            }
        },
        error: function (xhr, status, error) {
            console.error('Lỗi:', error);
            NTS.canhbao('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            return false;
        }
    });
}
