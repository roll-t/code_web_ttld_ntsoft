var max = 99;
var valueMax = '99+';
$(function () {
    $('#bussinis-like-tab').tab('show');
    ViecLamPhuHop();
    ViecLamDaNop();
    ViecLamDaLuu();
    NhaTuyenDungDaLuu();
    CongTyBanSeThich();
    CongTyDangTheoDoi();
    getHoSoDinhKem();
    //TrangThaiHoSoUngVien();
    $(document).on('click', '.btn-unlike-company', function () {
        var ID = $(this).attr('data');
        XoaTheoDoiCongTy(ID);
    });
    $(document).on('click', '.icon-save-company', async function () {
        var NhaTuyenDungID = $(this).attr('data');
        let result = LuuTruNhaTuyenDung(NhaTuyenDungID);
        if (result == "1") {
            let resultTrangThai = await KiemTraLuuTruNhaTuyenDung(NhaTuyenDungID);
            if (resultTrangThai == "1") {
                $(this).html(`<i class="fa-solid fa-bookmark btn-DaLuuTin"></i>`);
                NhaTuyenDungDaLuu();
                CongTyDangTheoDoi();
                NTS.thanhcong("Theo dõi nhà tuyển dụng thành công")
            } else {
                $(this).html(`<i class="fa-regular fa-bookmark btn-DaLuuTin"></i>`);
                NhaTuyenDungDaLuu();
                CongTyDangTheoDoi();
                NTS.thanhcong("Bỏ theo dõi nhà tuyển dụng thành công!")
            }

        }
    });

});



function ViecLamDaNop() {
    var result = NTS.getAjax('/UngVien/TongQuan/getSoLuongViecLamDaNop', {}).Result;
    if (result.length > 0) {
        if (result[0].SoLuong > max) {
            $('.vieclamdanop').html(valueMax);
        } else {
            $('.vieclamdanop').html(result[0].SoLuong);
        }
    } else {
        $('.vieclamdanop').html('0');
    }
}

function ViecLamPhuHop() {
    var result = NTS.getAjax('/UngVien/TongQuan/getSoLuongViecLamPhuHop', {}).Result;
    if (result.length > 0) {
        if (result[0].SoLuong > max) {
            $('.VieclamPhuhop').html(valueMax);
        } else {
            $('.VieclamPhuhop').html(result[0].SoLuong);
        }
    } else {
        $('.VieclamPhuhop').html('0');
    }
}


function ViecLamDaLuu() {
    var result = NTS.getAjax('/UngVien/TongQuan/getSoLuongViecLamDaLuu', {}).Result;
    if (result.length > 0) {
        if (result[0].SoLuong > max) {
            $('.vieclamdaluu').html(valueMax);
        } else {
            $('.vieclamdaluu').html(result[0].SoLuong);
        }
    } else {
        $('.vieclamdaluu').html('0');
    }
}

function NhaTuyenDungDaLuu() {
    var result = NTS.getAjax('/UngVien/TongQuan/getSoLuongNhaTuyenDungDaLuu', {}).Result;
    if (result.length > 0) {
        if (result[0].SoLuong > max) {
            $('.nhatuyendungdaluu').html(valueMax);
        } else {
            $('.nhatuyendungdaluu').html(result[0].SoLuong);
        }
    } else {
        $('.nhatuyendungdaluu').html('0');
    }
}


function CongTyDangTheoDoi() {
    $('#list_company').html('');
    $('#content_pagination').html('');
    let GetAll = NTS.getAjax('/UngVien/TongQuan/getCongTyDangTheoDoi', {}).Result;
    var anh = '../../Images/CongThongTin_BacLieu/company.jpg';
    var img = '';
    if (GetAll && GetAll.length > 0) { // Kiểm tra GetAll có tồn tại và không rỗng
        //var page = getUrlParameter('page');
        //if (page == false) {
        //    page = 1;
        //}
        //var RowData = 6;
        //var startIndex = (page * RowData) - RowData;
        //var endIndex = Math.min(GetAll.length, (page * RowData));
        for (var i = 0; i < GetAll.length; i++) {
            let data = GetAll[i];
            if (data.Logo == '') {
                img = anh;
            } else {
                var ImgCompany = (data.Logo);
                img = ImgCompany;
            }
            $('#list_company').append(`
                                <div class="col-md-4">
                                    <div class="grid-company" >
                                     <div class="box-company">
                                        <div class="btn-unlike-company" data=${data.NhaTuyenDungDaLuuID}><i class="fa-solid fa-circle-xmark"></i></div>
                                        <div class="flex space-between">
                                            <div class="box-img-company">
                                                <img src="${replaceImg(img)}" alt="" />
                                            </div>
                                            <div style="margin-left: 80px;">
                                                <p class="company-name bold text-in-line-1" > ${data.TenNhaTuyenDung}</p>
                                                <p class="company-place"> ${data.TinhID_KhuVuc}</p>
                                            </div>
                                            <div class="icon-save-company">
                                                <i class="fa-regular fa-bookmark"></i>
                                            </div>
                                        </div>
                                        <div class="text-in-line-1">
                                            <i class="fa-solid fa-city"></i> ${data.TenNganhNghe}
                                        </div>
                                        <div class="text-in-line-1">
                                            <i class="fa-solid fa-briefcase"></i> ${data.ViTriTuyenDung ? data.ViTriTuyenDung : ' Không có vị trí nào đang tuyển'}
                                        </div>
                                        <div class="text-in-line-1">
                                            <i class="fa-solid fa-users-line"></i> ${data.QuyMoLaoDongID} Nhân viên
                                        </div>
                                        <div class="text-in-line-3">
                                            ${data.GioiThieuCongTy}
                                        </div>
                                    </div>
                                </div>
                                 </div>
            `);
        }
        /* ListPaginationVanBan(GetAll.length, page);*/
    } else {
        $('#list_company').append(` <div class="grid grid-company" >
                                     <div class="box-company box-company-null" style="display: flex;justify-content: center;">
                                        <div>
                                            <img src="/Images/vanban-empty.jpg" class="" id="vanban-empty">
                                            <h3 style="color:#999;">Hiện chưa có dữ liệu</h3>
                                         </div>
                                    </div>
                                </div>`);
    }

}

function XoaTheoDoiCongTy(ID) {
    CanhBaoXoa(() => {
        var result = NTS.getAjax('/UngVien/TongQuan/XoaTheoDoiCongTy', { ID: ID });
        if (!result.Err) {
            CongTyDangTheoDoi();
            NhaTuyenDungDaLuu();
            CongTyBanSeThich();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });

}

function CongTyBanSeThich() {
    $('#list-company-new').html('');
    var result = NTS.getAjax('/UngVien/TongQuan/getCongTyMoiNhat', {}).Result;
    var anh = '../../Images/CongThongTin_BacLieu/company.jpg';
    var img = '';
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            var data = result[i];
            var iconluu = ' <i class="fa-regular fa-bookmark"></i>';
            let resultTrangThai = KiemTraLuuTruNhaTuyenDung(data.NhaTuyenDungID);
            if (resultTrangThai == "1") {
                iconluu = '<i class="fa-solid fa-bookmark btn-DaLuuTin"></i>';
            }
            $('#list-company-new').append(`<div class="col-md-4">
                                      <div class="grid-company">
                                           <div class="box-company ">
                                               <div class="flex space-between">
                                                   <div class="box-img-company">
                                                       <img src="${data.Logo ? replaceImg(data.Logo) : anh} " alt="" />
                                                   </div>
                                                   <div style="width:70%;margin-left:59px;" class="title_company-name">
                                                       <p class="company-name bold " > ${data.TenNhaTuyenDung}</p>
                                                       <p class="company-place"> ${data.TinhID_KhuVuc}</p>
                                                   </div>
                                                   <div class="icon-save-company" data="${data.NhaTuyenDungID}">
                                                      ${iconluu}
                                                   </div>
                                               </div>
                                               <div class="text-in-line-1">
                                                   <i class="fa-solid fa-city"></i> ${data.TenNganhNghe}
                                               </div>
                                               <div class="text-in-line-1">
                                                   <i class="fa-solid fa-briefcase"></i> ${data.ViTriTuyenDung ? data.ViTriTuyenDung : 'Không có vị trí nào đang tuyển'}
                                               </div>
                                               <div class="text-in-line-1">
                                                   <i class="fa-solid fa-users-line"></i> ${data.QuyMoLaoDongID} Nhân viên
                                               </div>
                                               <div class="text-in-line-3">
                                                   ${data.GioiThieuCongTy}
                                               </div>
                                           </div>
                                      </div>
                                </div>`);
        }

    } else {
        $('#list-company-new').append(` <div class="grid grid-company" >
                                     <div class="box-company box-company-null" style="display: flex;justify-content: center;">
                                        <div>
                                            <img src="/Images/vanban-empty.jpg" class="" id="vanban-empty">
                                            <h3 style="color:#999;">Hiện chưa có dữ liệu</h3>
                                         </div>
                                    </div>
                                </div>`);
    }
}

//Đính kèm hồ sơ

$(document).on('click', '#btnChonTepHinhAnh', function () {
    $('#file_hinhanh').click();
});
$(document).on('change', '#file_hinhanh', function () {
    Upload_HinhAnh('UngVien'); //hàm dùng chung ở us TaiLieu
});
function Upload_HinhAnh(pathChiTiet) {
    var result = NTS.getAjax('/UngVien/TongQuan/getHoSoUngVienID', {}).Result;
    var UngVienID = result[0].UngVienID;
    let data = NTS.upload({
        name: '#file_hinhanh',///ID input type="file"
        loaiVB: 'VB',///Nhận 1 trong 2 giá trị DL hoặc VB
    });
    if (data.length > 0) {
        let result = NTS.getAjax("/CongThongTinViecLam/Function/LuuDinhKem_NhieuFile", { PathTemp: data, ID: UngVienID, PathChiTiet: pathChiTiet, bangDk: 'UngVien', cotDk: 'UngVienID', cotDinhKem: 'HoSoDinhKem' });
        if (result.split('*')[0] == "1") {
            let LuuFile = result.split('*')[1];
            let arrFile = LuuFile.split('*');
            for (let p = 0; p < arrFile.length; p++) {
                if (arrFile[p] != "") {
                    if (arrFile[p].lastIndexOf('.') != -1) {
                        // file có đuôi .*
                        if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".svg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".gif" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".pdf") {
                            getHoSoDinhKem();
                        }
                    }
                }

            }
        }
    }
}


$(document).on('click', '.delete-file-attachments-hinhanh', function () {
    var result = NTS.getAjax('/UngVien/TongQuan/getHoSoUngVienID', {}).Result;
    var UngVienID = result[0].UngVienID;
    let duongDan = $(this);
    let id = UngVienID;
    let bang = "UngVien";
    let cot = "UngVienID";
    CanhBaoXoa(() => {
        let result = NTS.getAjax('/CongThongTinViecLam/Function/XoaDinhKem', { ID: id, duongDan: duongDan.attr('data-url-file'), bangDk: bang, cotDk: cot, loai: '', tenCotDinhKem: 'HoSoDinhKem' });
        if (!result.Err) {
            duongDan.parent('div').remove();
            $('#file_hinhanh').value('');
            getHoSoDinhKem();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
    return false;
});

function getHoSoDinhKem() {
    $('#list-file').html('');
    var result = NTS.getAjax('/UngVien/TongQuan/getHoSoDinhKem', {}).Result;
    if (result.length > 0) {
        if (result[0].HoSoDinhKem != '') {
            var mang = (result[0].HoSoDinhKem).split('*');
            $('#TongHoso').html(mang.length - 1);
            for (var i = 0; i < mang.length; i++) {
                var parts = replaceImg(mang[i]).split("/");
                var fileName = parts[parts.length - 1];
                if (mang[i] != '') {
                    $('#list-file').append(`
                            <div class="flex box-file-attached space-between align-center mt-10">
                            <div class="bold initial">
                                <h5>${fileName}</h5>
                            </div>
                            <div class="icon-action flex">
                                <i class="fa-solid fa-download download-file-attachments" style="color:#409FF7" data-url-file=${mang[i].replace('~', '')}></i>
                                <i class="fa-regular fa-eye view-file-attachments" style="color:#98FB7A" data-url-file=${mang[i].replace('~', '')}></i>
                                <i class="fa-solid fa-trash-can delete-file-attachments-hinhanh" style="color:#EB3223" data-url-file=${mang[i]}></i>
                            </div>
                        </div>`);
                }
            }
        } else {
            $('#TongHoso').html('0');
            $('#list-file').append(`<div class="flex box-file-attached justify-content-center align-center mt-10"><div style="width:100%;"><h3 style="color:#999;">Hiện chưa có dữ liệu</h3></div></div>`);
        }
    } else {
        $('#TongHoso').html('0');
        $('#list-file').append(`<div class="flex box-file-attached justify-content-center align-center mt-10"><div style="width:100%;"><h3 style="color:#999;">Hiện chưa có dữ liệu</h3></div></div>`);
    }


}

$(document).on('click', '.download-file-attachments', function () {
    var fileUrl = $(this).attr('data-url-file');
    var fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    var link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
    return false;
});

$(document).on('click', '.view-file-attachments', function () {
    window.open($(this).attr('data-url-file'));
    return false;
});
$(document).on('click', '.nav-item', function () {
    $('.nav-item').removeClass("action");
    $(this).addClass("action");
    var elementId = $(this).find('a').attr('href');
    $('.tab-pane.fade').removeClass("active show");
    $(elementId).addClass("active show");
});
function TrangThaiHoSoUngVien() {
    $('#thongbao').html('');
    var result = NTS.getAjax('json', '/View/UngVien/TongQuan.aspx/getTrangThaiHoSoUngVien', {});
    if ((result[0].TrangThaiHSViecLam) == '1') {
        $('#thongbao').append(` <div class="col-md-12" style="margin-top: 5px;">
                <div class="title-wait-for-completion">
                    <i class="fa-solid fa-circle-info"></i> Vui lòng hoàn tất thông tin hồ sơ của bạn!.
                </div>
            </div>       `);
    } else if ((result[0].TrangThaiHSViecLam) == '2') {
        $('#thongbao').append(`  <div class="col-md-12">
                <div class="title-waiting">
                    <i class="fa-solid fa-circle-info"></i> Hồ sơ đang chờ phê duyệt!
                </div>
            </div>
                `);
    } else {
        //$('#thongbao').append(` <div class="col-md-12" style="margin-top: 5px;">
        //        <div class="title-wait-for-completion">
        //            <i class="fa-solid fa-circle-info"></i> Hồ sơ của bạn đã bị từ chối! Vui lòng điều chỉnh lại thông tin hồ sơ của bạn!.
        //        </div>
        //    </div>       `);
    }
}
function KiemTraLuuTruNhaTuyenDung(ID) {
    let result = NTS.getAjax_NoVerifi("/CongThongTinViecLam/Function/KiemTraTheoDoiNhaTuyenDung", { id: ID });
    return result;
}
function LuuTruNhaTuyenDung(ID) {
    let result = NTS.getAjax_NoVerifi("/CongThongTinViecLam/Function/LuuTruNhaTuyenDungCuaUngVien", { id: ID });
    return result;
}