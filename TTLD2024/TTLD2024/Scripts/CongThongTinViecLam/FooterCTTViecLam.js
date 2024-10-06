$(document).ready(function () {
    getFooterDiaChiCTy();
});

function getFooterDiaChiCTy() {
    var GetAll = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/getFooterDiaChi_CTy", {});
    if (GetAll.length > 0) {
        let data = GetAll[0];
        $('.HotlineHoTro').text(data.soDT ? data.soDT : '');
        $('#ft-info-nts').append(`
                        <p class="footer-diachi footer-diachi-title">${data.tenDonVi ? data.tenDonVi : 'Tên đơn vị: Chưa cập nhật'}</p>
                        <p class="footer-diachi">${data.diaChi ? data.diaChi : 'Địa chỉ: Chưa cập nhật'}</p>
                        <p class="footer-diachi">${data.GiayPhepVanHanh ? data.GiayPhepVanHanh : 'Giấy phép vận hành: Chưa cập nhật'}</p>
                        <p class="footer-diachi">
                            Điện thoại:
                            ${data.soDT ? data.soDT : ''} 
                            ${data.Fax ? (data.soDT ? ' | ' : '') + data.Fax : ''} 
                            ${!data.soDT && !data.Fax ? 'Chưa cập nhật' : ''}
                        </p>

                        <p class="footer-diachi">Email hỗ trợ người tìm việc: ${data.Email ? data.Email : 'Chưa cập nhật'}</p>
                        <p class="footer-diachi">Email hỗ trợ nhà tuyển dụng: ${data.Email ? data.Email : 'Chưa cập nhật'}</p>`);
        $('.footer-mangXH-yt').attr('href', data.Youtube ? data.Youtube : '#');
        $('.footer-mangXH-fb').attr('href', data.Facebook ? data.Facebook : '#');
    }
}