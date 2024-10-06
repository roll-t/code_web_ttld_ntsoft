
$(function () {
    getThongTinLienHe();
});

function getThongTinLienHe() {
    var GetAll = NTS.getAjax("CongThongTinViecLam/LienHe/getThongTinLienHe", {});
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            $('#card-lienhe').append(`
                        <h1>LIÊN HỆ VỚI ${data.tenDonVi ? data.tenDonVi : 'Chưa có dữ liệu'}</h1>
                        <p class="card-text">Chúng tôi sẽ phản hồi sớm nhất có thể</p>
                        <div class="card-body mt-5">
                            <p class="card-text">
                                <i class="fa-solid fa-building"></i> Đơn vị phát triển: <span>${data.tenDonVi ? data.tenDonVi : 'Chưa có dữ liệu'}</span>
                            </p>
                            <p class="card-text"><i class="fa-solid fa-location-dot"></i> Địa chỉ: <span>${data.diaChi ? data.diaChi : 'Chưa có dữ liệu'}</span></p>
                            <p class="card-text"><i class="fa-solid fa-envelope"></i> Email: <span>${data.Email ? data.Email : 'Chưa có dữ liệu'}</span></p>
                            <p class="card-text"><i class="fa-solid fa-phone"></i> Điện thoại: <span>${data.soDT ? data.soDT : 'Chưa có dữ liệu'}</span></p>
                            <p class="card-text"><i class="fa-solid fa-fax"></i> Fax: <span>${data.Fax ? data.Fax : 'Chưa có dữ liệu'}</span></p>
                            <p class="card-text"><i class="fa fa-globe"></i> Website: <span>${data.web ? data.web : 'Chưa có dữ liệu'}</span></p>
                        </div>
                    `);
            if (data.UrlBanDo != null && data.UrlBanDo != '' && data.UrlBanDo.toString().includes('iframe')) {
                $('#iframe').html(data.UrlBanDo);
            }
        }
    } else {
        $('#card-lienhe').append(`
                    <h1>LIÊN HỆ VỚI ...</h1>
                    <p class="card-text">Chúng tôi sẽ phản hồi sớm nhất có thể</p>
                    <div class="card-body mt-5">
                        <p class="card-text">
                            <span><i class="fa-solid fa-building"></i> Đơn vị phát triển: Chưa có dữ liệu</span>
                        </p>
                        <p class="card-text"><span><i class="fa-solid fa-location-dot"></i> Địa chỉ: Chưa có dữ liệu</span></p>
                        <p class="card-text"><span><i class="fa-solid fa-envelope"></i> Email: Chưa có dữ liệu</span></p>
                        <p class="card-text"><span><i class="fa-solid fa-phone"></i> Điện thoại: Chưa có dữ liệu</span></p>
                        <p class="card-text"><span><i class="fa-solid fa-fax"></i> Fax: Chưa có dữ liệu</span></p>
                        <p class="card-text"><span><i class="fa fa-globe"></i> Website: Chưa có dữ liệu</span></p>
                    </div>
                `);
    }
}
