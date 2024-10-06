$(function () {
    LoadThongBao();
    LoadMenu();
    $(document).on('click', '.notifi_item', function () {
        $('#modal_xemThongBao').modal('show');
        var ID = $(this).attr('data');
        XemThongBao(ID);
    });
    $(document).on('click', '.XoaThongBao', function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan ra các phần tử con
        var ID = $(this).attr('data');
        XoaThongbao(ID);
    });

    $(document).on('click', '.XoaToanBoThongBao', function () {
        var ID = $(this).attr('data');
        XoaToanBoThongBao(ID);
    });

    LayoutLogin();
});

//Load tin mới nhất
function LoadMenu() {
    var result = NTS.getAjax("/CongThongTinViecLam/TrangChuCTT/GetMenu_TrangChuCTT", {});
    if (result.length > 0) {
        let item = ``;
        let data = '';
        for (var i = 0; i < result.length; i++) {
            data = result[i];
            item += `<li class="nav-item dropdown header--item-right ">
                            <a class="nav-link " href="${data.DuongDanUrl}">
                               <span class="minu">${data.TenChucNang}</span>
                            </a>
                        </li>`;
        }
        $('#menu-header').append(item);
    } else {
        $('#menu-header').append("Không có dữ liệu");
    }
}

async function LoadThongBao() {
    var data = await NTS.getAjaxAsync('/CongThongTinViecLam/TrangChuCTT/GetThongBao_CTT', {});
    var ChuaXem = 0;
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            mang = data[i];
            if (mang.DaXem === false) {
                ChuaXem += 1;
            }

            var iconColor = mang.DaXem ? "none" : ""; // Màu sắc của biểu tượng

            $('.dropdown_notifi-list-item').append(`
                                                     <a class="notifi_item" style="display:flex;align-items:center;justify-content:space-between;" data="${mang.ThongBaoCTTID}">
                                                       <div class="col-md-1 icon-fa-circle">
                                                         <i class="fa-solid fa-circle" style="display: ${iconColor};"></i>
                                                       </div>
                                                       <div class="col-md-10 notifi-title">
                                                         <p>${mang.GhiChu}</p>
                                                         <span>${mang.NgayThaoTac}</span>
                                                       </div>
                                                       <div class="col-md-1 XoaThongBao" style="text-align:center;" data="${mang.ThongBaoCTTID}">
                                                         <i class="icon-xmark fa-solid fa-xmark"></i>
                                                       </div>
                                                     </a>
                                                   `);
        }
        if (ChuaXem > '0') {
            if (ChuaXem > 99) {
                ChuaXem = "99+";
            }
            $('.dropdown-menu_span').append(`<span class="number_notifi">${ChuaXem}</span>`);
        } else {
            $('.number_notifi ').css({ display: 'none' });
        }
        $('.dropdown_notifi-btnXoa').html('');
        $('.dropdown_notifi-btnXoa').addClass('btnXoaThongBao');
        $('.dropdown_notifi-btnXoa').append(` <span class="XoaToanBoThongBao" data="${mang.UserID}">Xóa toàn bộ thông báo</span>`);
    } else {
        $('.number_notifi ').css({ display: 'none' });
        $('.dropdown_notifi-btnXoa').html('');
        $('.dropdown_notifi-btnXoa').removeClass('btnXoaThongBao');
        $('.dropdown_notifi-btnXoa').append(` <div class="notifi"><p>Chưa có thông báo!</p></div >`);
    }
}
function XoaThongbao(ID) {
    var mang = NTS.getAjax('/CongThongTinViecLam/TrangChuCTT/XoaThongBao', { ID: ID });
    if (mang.split('_')[0] == '1') {
        $('.dropdown_notifi-list-item').html('');
        LoadThongBao();
        NTS.thanhcong(mang.split('_')[1]);
    } else {
        NTS.loi(mang.split('_')[1]);
    }
}

function XemThongBao(ID) {
    var result = NTS.getAjax('/CongThongTinViecLam/TrangChuCTT/XemThongBao', { ID: ID });
    var date = new Date(result[0].NgayThaoTac);
    var ngayThongBaoFormatted = ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
    $('#NgayThongBao').html(ngayThongBaoFormatted);
    $('#GhiChu').html(result[0].GhiChu);
    $('.dropdown_notifi-list-item').html('');
    LoadThongBao();
}

function XoaToanBoThongBao(ID) {
    var mang = NTS.getAjax_NoVerifi('/CongThongTinViecLam/TrangChuCTT/XoaToanBoThongBao', { ID: ID });
    if (mang.split('_')[0] == '1') {
        $('.dropdown_notifi-list-item').html('');
        LoadThongBao();
        NTS.thanhcong(mang.split('_')[1]);
    } else {
        NTS.loi(mang.split('_')[1]);
    }
}

function LayoutLogin() {
    var result = NTS.getAjax_NoVerifi('/CongThongTinViecLam/TrangChuCTT/KiemTraDangNhap', {});
    if (result == '2') { // result = 2 là không có đăng nhập
        $('.header-right--login').append(` <div class="btn-groupzz dropdown btn-dnhap" style="">
                                            <a id="modal_trigger_mobile" href="#modal" onclick="save_type(1);" title="save_type">
                                                <i class="fa fa-user" style="font-size: 16px; line-height: 18px;margin-right: 4px;display: inline;color:white !important;"></i>
                                                <span class="minu" style="">&nbsp;Đăng nhập</span>
                                            </a>
                                             <div class="dropdown-content">
                                                <a href="/dang-nhap-ung-vien.html"><i class="fa-solid fa-user-plus"></i> Đăng nhập ứng viên</a>
                                                <a href="/dang-nhap-nha-tuyen-dung.html"><i class="fa-solid fa-briefcase"></i> Đăng nhập nhà tuyển dụng</a>
                                            </div>
                                        </div>
                                        <div class="btn-groupzz dropdown btn-dky" style="">
                                            <a id="modal_trigger_mobile1" href="#">
                                                <i class="fa fa-user-plus" style="font-size: 16px;margin-right: 4px;margin-right: 4px;line-height: 18px;display: inline;"></i>
                                                <span class="minu">&nbsp;Đăng ký</span>
                                            </a>
                                            <div class="dropdown-content">
                                                <a href="/dang-ky-ung-vien.html"><i class="fa-solid fa-user-plus"></i> Đăng ký ứng viên</a>
                                                <a href="/dang-ky-nha-tuyen-dung.html"><i class="fa-solid fa-briefcase"></i> Đăng ký nhà tuyển dụng</a>
                                            </div>
                                        </div>`);
    } else {
        if (result[0].NhomNguoiDung == 'UngVien') {
            $('.header-right--login').append(`
                                            <div class="dropdown_notifi">
                                            <span class="dropdown-menu_span">
                                               <i class="icon_notifi fa-solid fa-bell"></i>
                                           </span>
                                            <div class="dropdown_notifi-list">
                                                <div class="dropdown_notifi-list-item">
                                                </div>
                                                <div class="dropdown_notifi-btnXoa btnXoaThongBao">
                                                    <div class="notifi"><p>Chưa có thông báo!</p></div >
                                                </div>
                                            </div>
                                        </div>
                                            <div class="btn-groupzz dropdown btn-dnhap btn-dadangnhap">
                                            <a id="modal_trigger_mobile" href="#modal" onclick="save_type(1);" title="save_type">
                                                <i class="fa fa-user icon-user" style="font-size: 16px;margin-right: 4px; line-height: 18px;color: white !important;"></i>
                                                <span class="minu">&nbsp;${result[0].HoVaTen}</span>
                                            </a>
                                             <div class="dropdown-content">
                                                <a href="/tong-quan-ung-vien.html"><i class="fa-solid fa-gauge-high"></i> Trang chủ ứng viên</a>
                                                <a href="/dang-xuat.html"><i class="fa-solid fa-arrow-right-from-bracket btn-dangxuat"></i> Đăng xuất</a>
                                            </div>
                                        </div>`);
        } else if (result[0].NhomNguoiDung == 'NhaTuyenDung') {
            $('.header-right--login').append(`
                                            <div class="dropdown_notifi">
                                            <span class="dropdown-menu_span">
                                               <i class="icon_notifi fa-solid fa-bell"></i>
                                           </span>
                                            <div class="dropdown_notifi-list">
                                                <div class="dropdown_notifi-list-item">
                                                </div>
                                                <div class="dropdown_notifi-btnXoa btnXoaThongBao">
                                                    <div class="notifi"><p>Chưa có thông báo!</p></div >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="btn-groupzz dropdown btn-dnhap btn-dadangnhap">
                                            <a id="modal_trigger_mobile " href="#modal" onclick="save_type(1);" title="save_type" style="display:flex;align-item:center;">
                                                <i class="fa fa-user icon-user" style="font-size: 16px; margin-right: 4px;line-height: 18px;color: white !important; margin-top:4px;"></i>
                                                <span class="minu">&nbsp;${result[0].TenToChuc}</span>
                                            </a>
                                             <div class="dropdown-content">
                                                <a href="/tong-quan-nha-tuyen-dung.html"><i class="fa-solid fa-gauge-high"></i> Trang chủ nhà tuyển dụng</a>
                                                <a href="/dang-xuat.html"><i class="fa-solid fa-arrow-right-from-bracket btn-dangxuat"></i> Đăng xuất</a>
                                            </div>
                                        </div>`);
        }
    }
}