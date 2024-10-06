$(document).on('click', '#btnGuiMa',async function () {
    if ($('#email').val() === "") {
        NTS.canhbao('Chưa nhập Email.');
        $('#email').focus();
        return;
    }
    // Gọi AJAX đến dịch vụ .asmx
    $.ajax({
        type: "POST",
        url: "/Services/AuthPassword.asmx/sendAuthCode_CongThongTin", // Đường dẫn đến file .asmx
        data: JSON.stringify({ mail: $('#email').val() }), // Dữ liệu cần gửi đi
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var data = JSON.parse(response.d);

            if (data.split('_')[0] === "1") {
                NTS.dongthongbao();
                NTS.thanhcong(data.split('_')[1]);
                setTimeout(function () {
                    window.location = "/HeThong/Login";
                }, 3000);
            } else if (data.split('_')[0] === "0") {
                NTS.dongthongbao();
                NTS.canhbao(data.split('_')[1]);
            } else if (data.split('_')[0] === "-1") {
                NTS.dongthongbao();
                NTS.canhbao(data.split('_')[1]);
            }
        },
        error: function (xhr, status, error) {
            console.error('Lỗi:', error);
            NTS.canhbao('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
    });

    return false;
});
