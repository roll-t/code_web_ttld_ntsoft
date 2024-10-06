var ThaoTac = "";
$(document).ready(function () {
    setTimeout(() => {
        loadDataComBo();
        LoadDuLieuCV();
    }, 200);
    LoadHocVanBangCap();
    LoadKinhNghiemLamViec();
    LoadKyNangUngVien();
    LoadTinHocNgoaiNguUngVien();
    LoadNguoiLienHe();
    LoadHoatDong();
    //Học vấn bằng cấp
    $(document).on('click', '#btn_ThemMoiHocVan', function () {
        TruocKhiThemHocVanBangCap();
        ThaoTac = "Them";
        $('#ModalThemMoiHocVan').modal('show');
        $('#tieudemodalHocVan').text("Thêm mới học vấn, bằng cấp");
    });

    $(document).on('click', '.btnSuaHocVan', function () {
        SuaDuLieuHocVanBangCap($(this).attr('data'));
    });

    $(document).on('click', '.btnXoaHocVan', function () {
        var ID = $(this).attr('data');
        XoaHocVanBangCap(ID);
    });
    
    //Kinh nghiệm làm việc
    $(document).on('click', '#btn_ThemKinhNghiem', function () {
        TruocKhiThemHocVanBangCap();
        ThaoTac = "Them";
        $('#ModalThemKinhNghiem').modal('show');
        $('#tieudemodalKinhNghiem').text("Kinh nghiệm làm việc");
    });
    $(document).on('click', '.btnSuaKinhNghiemLV', function () {
        SuaDuLieuKinhNghiemLV($(this).attr('data'));
    });
    $(document).on('click', '.btnXoaKinhNghiemLV', function () {
        var ID = $(this).attr('data');
        XoaKinhNghiemLV(ID);
    });
    //Kỹ năng chuyên môn
    $(document).on('click', '#btn_ThemKyNangChuyenMon', function () {
        TruocKhiThemKyNang();
        ThaoTac = "Them";
        $('#ModalThemKyNang').modal('show');
        $('#tieudemodalKyNang').text("Kỹ năng chuyên môn");
    });
    $(document).on('click', '.btnSuaKyNang', function () {
        SuaDuLieuKyNangUngVien($(this).attr('data'));
    });
    $(document).on('click', '.btnXoaKyNang', function () {
        var ID = $(this).attr('data');
        XoaKyNangUngVien(ID);
    });
    //Tin học - Ngoại ngữ
    $(document).on('click', '#btn_ThemTinHocNgoaiNgu', function () {
        TruocKhiThemTinHoc();
        ThaoTac = "Them";
        $('#ModalThemTinHocNgoaiNgu').modal('show');
        $('#tieudemodalTinHocNgoaiNgu').text("Tin học - Ngoại ngữ");
    });
    $(document).on('click', '.btnSuaTinHocNgoaiNgu', function () {
        SuaDuLieuTinHocNgoaiNgu($(this).attr('data'));
    });
    $(document).on('click', '.btnXoaTinHocNgoaiNgu', function () {
        var ID = $(this).attr('data');
        XoaKyTinHocNgoaiNgu(ID);
    });
    //Người liên hệ
    $(document).on('click', '#btn_ThemNguoiLienHe', function () {
        TruocKhiThemTinHoc();
        ThaoTac = "Them";
        $('#ModalThemNguoiLienHe').modal('show');
        $('#tieudemodalNguoiLienHe').text("Người liên hệ");
    });
    $(document).on('click', '.btnSuaNguoiLienHe', function () {
        SuaDuLieuNguoiLienHe($(this).attr('data'));
    });
    $(document).on('click', '.btnXoaNguoiLienHe', function () {
        var ID = $(this).attr('data');
        XoaNguoiLienHe(ID);
    });
    //Hoạt động
    $(document).on('click', '#btn_ThemHoatDong', function () {
        TruocKhiThemHoatDong();
        ThaoTac = "Them";
        $('#ModalThemHoatDong').modal('show');
        $('#tieudemodalHoatDong').text("Hoạt động");
    });
    $(document).on('click', '.btnSuaHoatDong', function () {
        SuaDuLieuHoatDong($(this).attr('data'));
    });
    $(document).on('click', '.btnXoaHoatDong', function () {
        var ID = $(this).attr('data');
        XoaHoatDong(ID);
    });
});

function loadDataComBo() {
    NTS.loadDataCombo_NoVerifi({
        name: '#BangCapID,#BangCapID2',
        ajaxUrl: '/CongThongTinViecLam/Function/getTrinhDoCMKT',
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
}

//-------------------Thay doi khi chon gioi tính------------------------//
$(document).on('change', '#Gender_Nam', function () {
    if ($('#Gender_Nu').value() == true) {
        $('#Gender_Nu').value(false);
    }
});
$(document).on('change', '#Gender_Nu', function () {
    if ($('#Gender_Nam').value() == true) {
        $('#Gender_Nam').value(false);
    }
});

//Học vấn bằng cấp

function TruocKhiThemHocVanBangCap() {
        $('#ChuyenNganh').value("");
        $('#Truong').value("");
        $('#BangCapID').value("");
        $('#TuNgay').value("");
        $('#DenNgay').value("");
        CKEDITOR.instances.ThanhTuu.setData("");
    }

$(document).on('click', '#btn_luuhocvan_bangcap', function () {
        const validate = new NTSValidate('#ModalThemMoiHocVan');
        //Kiểm tra bắt buộc nhập 1
        if (!validate.trim().check()) {
            return false;
        }
        var mang = new Array();
        mang[0] = ThaoTac;
        mang[1] = $('#HocVanBangCapUngVienID').value();
        mang[2] = $('#ChuyenNganh').value();
        mang[3] = $('#Truong').value();
        mang[4] = $('#BangCapID').value();
        mang[5] = $('#TuNgay').value();
        mang[6] = $('#DenNgay').value();
        mang[7] = CKEDITOR.instances.ThanhTuu.getData();

        var DenNgay = moment($('#DenNgay').val(), "DD/MM/YYYY");
        var TuNgay = moment($('#TuNgay').val(), "DD/MM/YYYY");

        if (DenNgay.isValid() && TuNgay.isValid()) {
            if (DenNgay.isBefore(TuNgay)) {
                NTS.canhbao('Ngày kết thúc không được nhỏ hơn ngày bắt đầu!');
                return false;
            } else if (DenNgay.isSame(TuNgay, 'day')) {
                NTS.canhbao('Ngày kết thúc không được trùng với ngày bắt đầu!');
                return false;
            }
        }

        //if ($('#ChuyenNganh').isempty("Chuyên ngành không được bỏ trống!")) return false;
        //if ($('#Truong').isempty("Tên trường không được bỏ trống!")) return false;
        //if ($('#BangCapID').isempty("Bằng cấp không được bỏ trống!")) return false;
        //if ($('#TuNgay').isempty("ngày bắt đầu không được bỏ trống!")) return false;
        //if ($('#DenNgay').isempty("Ngày kết thúc ngành không được bỏ trống!")) return false;

        var result = NTS.getAjax('/UngVien/ChiTietCV/LuuThongTin_HocVanBangCap', { data: mang });
        if (!result.Err) {
            $('#HocVanBangCap_items').html('');
            NTS.thanhcong(result.Msg);
            LoadHocVanBangCap();
        } else {
            result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
        }
        $('#ModalThemMoiHocVan').modal('hide');
        TruocKhiThemHocVanBangCap();
    });

function LoadHocVanBangCap() {
    $('#HocVanBangCap_items').html('');
    var GetAll = NTS.getAjax_NoVerifi('/UngVien/ChiTietCV/getHocVanBangCap', {}).Result;

    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            data = GetAll[i];
            var tuNgayParts = data.TuNgay.split('/');
            var denNgayParts = data.DenNgay.split('/');

            var tuNgayFormatted = tuNgayParts[2] + '-' + tuNgayParts[1] + '-' + tuNgayParts[0];
            var denNgayFormatted = denNgayParts[2] + '-' + denNgayParts[1] + '-' + denNgayParts[0];

            var TuNgay = new Date(tuNgayFormatted);
            var DenNgay = new Date(denNgayFormatted);

            var ThoiGian = '', DonVi = '';

            if (TuNgay.getFullYear() === DenNgay.getFullYear() && TuNgay.getMonth() === DenNgay.getMonth()) {
                // Tính số ngày
                ThoiGian = DenNgay.getDate() - TuNgay.getDate();
                DonVi = 'ngày';

            } else if (TuNgay.getFullYear() === DenNgay.getFullYear()) {
                // Tính số tháng
                ThoiGian = DenNgay.getMonth() - TuNgay.getMonth();
                if (ThoiGian < 0) {
                    ThoiGian += 12;
                }
                DonVi = 'tháng';
            } else {
                // Tính số năm
                ThoiGian = DenNgay.getFullYear() - TuNgay.getFullYear();
                DonVi = 'năm';
            }

            $('#HocVanBangCap_items').append(`
                     <li class="list_items" >
                          <div class="col-md-1 sonam_hocvan">
                              <span>${ThoiGian}</span>
                              <span><strong>${DonVi}</strong></span>
                          </div>
                          <div class="col-md-8 ten_hocvan">
                              <h3>${data.ChuyenNganh}</h3>
                              <p>${data.TenTruong}</p>
                              <p>${data.TuNgay} - ${data.DenNgay}</p>
                          </div>
                          <div class="hocvan_icon col-md-1">
                              <span class="btnSuaHocVan" data=${data.HocVanID}>
                                  <i class="icon_pen hocvan_icon-item fa-solid fa-pencil"></i>
                              </span>
                              <span class="btnXoaHocVan" data=${data.HocVanID}>
                                  <i class="icon_strash hocvan_icon-item fa-solid fa-trash-can"></i>
                              </span>
                          </div>
                      </li>
            `)
        }
    } else {
        $('#HocVanBangCap_items').append(` <li class="list_items">
                                             <div class="col-md-12 ten_hocvan"style="padding:26px 0;text-align:center;color:#D9D9D9;">
                                                 <h3 >Hiện chưa có dữ liệu</h3>
                                             </div>
                                         </li>`);
    }
}


function SuaDuLieuHocVanBangCap(ID) {
    var result = NTS.getAjax('/UngVien/ChiTietCV/LoadDuLieuSuaHocVanBangCap', { ID: ID }).Result;
    if (result.length > 0) {
        data = result[0];
        $('#ModalThemMoiHocVan').modal('show');
        $('#tieudemodalHocVan').text("Cập nhật học vấn, bằng cấp");
        $('#HocVanBangCapUngVienID').value(data.HocVanID);
        $('#ChuyenNganh').value(data.ChuyenNganh);
        $('#Truong').value(data.TenTruong);
        $('#BangCapID').value(data.BangCapID);
        $('#TuNgay').value(data.TuNgay);
        $('#DenNgay').value(data.DenNgay);
        CKEDITOR.instances.ThanhTuu.setData(result[0].ThanhTuu);
        ThaoTac = "sua";
    }
    else {
        NTS.loi('Tải dữ liệu sửa thất bại')
    }
}
function XoaHocVanBangCap(ID) {
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/UngVien/ChiTietCV/XoaHocVanBangCap', { id: ID });
        if (!result.Err) {
            LoadHocVanBangCap();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}

/////////////////////////////////////////////////

//Kinh nghiệm làm việc
function TruocKhiThemKinhNghiemLV() {
    $('#ChucDanh').value("");
    $('#TenCongTy').value("");
    $('#BangCapID2').value("");
    $('#TuThang').value("");
    $('#DenThang').value("");
    CKEDITOR.instances.MoTaKinhNghiemLV.setData("");
}

$(document).on('click', '#btn_luukinhnghiem', function () {
    const validate = new NTSValidate('#ModalThemKinhNghiem');
    //Kiểm tra bắt buộc nhập 1
    if (!validate.trim().check()) {
        return false;
    }
    var mang = new Array();
    mang[0] = ThaoTac;
    mang[1] = $('#KinhNghiemLVUngVienID').value();
    mang[2] = $('#ChucDanh').value();
    mang[3] = $('#TenCongTy').value();
    mang[4] = $('#BangCapID2').value();
    mang[5] = $('#TuThang').value();
    mang[6] = $('#DenThang').value();
    mang[7] = CKEDITOR.instances.MoTaKinhNghiemLV.getData();

    var DenNgay = moment($('#DenThang').val(), "DD/MM/YYYY");
    var TuNgay = moment($('#TuThang').val(), "DD/MM/YYYY");

    if (DenNgay.isValid() && TuNgay.isValid()) {
        if (DenNgay.isBefore(TuNgay)) {
            NTS.canhbao('Ngày kết thúc không được nhỏ hơn ngày bắt đầu!');
            return false;
        } else if (DenNgay.isSame(TuNgay, 'day')) {
            NTS.canhbao('Ngày kết thúc không được trùng với ngày bắt đầu!');
            return false;
        }
    }

    var result = NTS.getAjax('/UngVien/ChiTietCV/LuuThongTin_KinhNghiemLVUngVien', { data: mang });
    if (!result.Err) {
        $('#KinhNghiem_items').html('');
        NTS.thanhcong(result.Msg);
        LoadKinhNghiemLamViec();
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }

    $('#ModalThemKinhNghiem').modal('hide');
    TruocKhiThemKinhNghiemLV();
});

function LoadKinhNghiemLamViec() {
    $('#KinhNghiem_items').html('');
    var GetAll = NTS.getAjax_NoVerifi('/UngVien/ChiTietCV/getKinhNghiemLV', {}).Result;
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            data = GetAll[i];
            var tuNgayParts = data.TuThang.split('/');
            var denNgayParts = data.DenThang.split('/');

            var tuNgayFormatted = tuNgayParts[2] + '-' + tuNgayParts[1] + '-' + tuNgayParts[0];
            var denNgayFormatted = denNgayParts[2] + '-' + denNgayParts[1] + '-' + denNgayParts[0];

            var TuThang = new Date(tuNgayFormatted);
            var DenThang = new Date(denNgayFormatted);

            var ThoiGian = '', DonVi = '';

            if (TuThang.getFullYear() === DenThang.getFullYear() && TuThang.getMonth() === DenThang.getMonth()) {
                // Tính số ngày
                ThoiGian = DenThang.getDate() - TuThang.getDate();
                DonVi = 'ngày';

            } else if (TuThang.getFullYear() === DenThang.getFullYear()) {
                // Tính số tháng
                ThoiGian = DenThang.getMonth() - TuThang.getMonth();
                if (ThoiGian < 0) {
                    ThoiGian += 12;
                }
                DonVi = 'tháng';
            } else {
                // Tính số năm
                ThoiGian = DenThang.getFullYear() - TuThang.getFullYear();
                DonVi = 'năm';
            }

            $('#KinhNghiem_items').append(`
                     <li class="list_items" >
                          <div class="col-md-1 sonam_hocvan">
                              <span>${ThoiGian}</span>
                              <span><strong>${DonVi}</strong></span>
                          </div>
                          <div class="col-md-8 ten_hocvan">
                              <h3>${data.ChucDanh}</h3>
                              <p>${data.TenCongTy}</p>
                              <p>${data.TuThang} - ${data.DenThang}</p>
                          </div>
                          <div class="hocvan_icon col-md-1">
                              <span class="btnSuaKinhNghiemLV" data=${data.KinhNghiemLVUngVienID}>
                                  <i class="icon_pen hocvan_icon-item fa-solid fa-pencil"></i>
                              </span>
                              <span class="btnXoaKinhNghiemLV" data=${data.KinhNghiemLVUngVienID}>
                                  <i class="icon_strash hocvan_icon-item fa-solid fa-trash-can"></i>
                              </span>
                          </div>
                      </li>
            `)
        }
    } else {
        $('#KinhNghiem_items').append(` <li class="list_items">
                                             <div class="col-md-12 ten_hocvan"style="padding:26px 0;text-align:center;color:#D9D9D9;">
                                                 <h3 >Hiện chưa có dữ liệu</h3>
                                             </div>
                                         </li>`);
    }
}

function SuaDuLieuKinhNghiemLV(ID) {
    var result = NTS.getAjax('/UngVien/ChiTietCV/LoadDuLieuSuaKinhNghiemLV', { ID: ID }).Result;
    if (result.length > 0) {
        data = result[0];
        $('#ModalThemKinhNghiem').modal('show');
        $('#tieudemodalHocVan').text("Cập nhật kinh nghiệm làm việc");
        $('#KinhNghiemLVUngVienID').value(ID);
        $('#ChucDanh').value(data.ChucDanh);
        $('#TenCongTy').value(data.TenCongTy);
        $('#BangCapID2').value(data.BangCapID);
        $('#TuThang').value(data.TuThang);
        $('#DenThang').value(data.DenThang);
        CKEDITOR.instances.MoTaKinhNghiemLV.setData(result[0].MoTa);
        ThaoTac = "sua";
    }
    else {
        NTS.loi('Tải dữ liệu sửa thất bại');
    }
}

function XoaKinhNghiemLV(ID) {
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/UngVien/ChiTietCV/XoaKinhNghiemLV', { id: ID });
        if (!result.Err) {
            LoadKinhNghiemLamViec();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });

}


//Kỹ năng
function TruocKhiThemKyNang() {
    $('#TenKyNang').value("");
    CKEDITOR.instances.MoTaKyNangCM.setData("");
}

$(document).on('click', '#btn_luukynang', function () {
    const validate = new NTSValidate('#ModalThemKyNang');
    //Kiểm tra bắt buộc nhập 1
    if (!validate.trim().check()) {
        return false;
    }
    var mang = new Array();
    mang[0] = ThaoTac;
    mang[1] = $('#KyNangUngVienID').value();
    mang[2] = $('#TenKyNang').value();
    mang[3] = CKEDITOR.instances.MoTaKyNangCM.getData();

    var result = NTS.getAjax('/UngVien/ChiTietCV/LuuThongTin_KyNang', { data: mang });
    if (!result.Err) {
        $('#KyNang_items').html('');
        NTS.thanhcong(result.Msg);
        LoadKyNangUngVien();
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    $('#ModalThemKyNang').modal('hide');
    TruocKhiThemKyNang();
});

function LoadKyNangUngVien() {
    $('#KyNang_items').html('');
    var GetAll = NTS.getAjax_NoVerifi('/UngVien/ChiTietCV/getKyNangUngVien', {}).Result;
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            data = GetAll[i];

            $('#KyNang_items').append(`
                     <li class="list_items">
                         <div class="col-md-9 ten_hocvan ten_kynang">
                             <h3>${data.TenKyNang}</h3>
                             <p>${data.MoTa}</p>
                         </div>
                         <div class="hocvan_icon col-md-1">
                             <span class="btnSuaKyNang" data=${data.KyNangUngVienID}>
                                 <i class="icon_pen hocvan_icon-item fa-solid fa-pencil"></i>
                             </span>
                             <span class="btnXoaKyNang" data=${data.KyNangUngVienID}>
                                 <i class="icon_strash hocvan_icon-item fa-solid fa-trash-can"></i>
                             </span>
                         </div>
                     </li>
            `)
        }
    } else {
        $('#KyNang_items').append(` <li class="list_items">
                                             <div class="col-md-12 ten_hocvan"style="padding:26px 0;text-align:center;color:#D9D9D9;">
                                                 <h3 >Hiện chưa có dữ liệu</h3>
                                             </div>
                                         </li>`);
    }
}


function SuaDuLieuKyNangUngVien(ID) {
    var result = NTS.getAjax('/UngVien/ChiTietCV/LoadDuLieuSuaKyNangUngVien', { ID: ID }).Result;
    if (result.length > 0) {
        data = result[0];
        $('#ModalThemKyNang').modal('show');
        $('#tieudemodalKyNang').text("Cập nhật kỹ năng chuyên môn");
        $('#KyNangUngVienID').value(ID);
        $('#TenKyNang').value(data.TenKyNang);
        CKEDITOR.instances.MoTaKyNangCM.setData(result[0].MoTa);
        ThaoTac = "sua";
    }
    else {
        NTS.loi('Tải dữ liệu sửa thất bại')
    }
}

function XoaKyNangUngVien(ID) {
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/UngVien/ChiTietCV/XoaKyNangUngVien', { id: ID });
        if (!result.Err) {
            LoadKyNangUngVien();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}

//Tin học - Ngoại ngữ
function TruocKhiThemTinHoc() {
    $('#TenTinHoc_NgoaiNgu').value("");
    CKEDITOR.instances.MoTaTinHocNgoaiNgu.setData("");
}

$(document).on('click', '#btn_luutinhoc', function () {
    const validate = new NTSValidate('#ModalThemTinHocNgoaiNgu');
    //Kiểm tra bắt buộc nhập 1
    if (!validate.trim().check()) {
        return false;
    }
    var mang = new Array();
    mang[0] = ThaoTac;
    mang[1] = $('#TinHocNgoaiNguUngVienID').value();
    mang[2] = $('#TenTinHoc_NgoaiNgu').value();
    mang[3] = CKEDITOR.instances.MoTaTinHocNgoaiNgu.getData();

    if ($('#TenTinHoc_NgoaiNgu').isempty("Tên tin học, ngoại ngữ không được bỏ trống!")) return false;

    var result = NTS.getAjax('/UngVien/ChiTietCV/LuuThongTin_TinHocNgoaiNgu', { data: mang });
    if (!result.Err) {
        $('#TinHocNgoaiNgu_items').html('');
        NTS.thanhcong(result.Msg);
        LoadTinHocNgoaiNguUngVien();
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    $('#ModalThemTinHocNgoaiNgu').modal('hide');
    TruocKhiThemTinHoc();
});

function LoadTinHocNgoaiNguUngVien() {
    $('#TinHocNgoaiNgu_items').html('');
    var GetAll = NTS.getAjax_NoVerifi('/UngVien/ChiTietCV/getTinHocNgoaiNgu', {}).Result;
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            data = GetAll[i];

            $('#TinHocNgoaiNgu_items').append(`
                     <li class="list_items">
                         <div class="col-md-9 ten_hocvan ten_kynang">
                             <h3>${data.TenTinHocNgoaiNguUngVien}</h3>
                             <p>${data.MoTa}</p>
                         </div>
                         <div class="hocvan_icon col-md-1">
                             <span class="btnSuaTinHocNgoaiNgu" data=${data.TinHocNgoaiNguUngVienID}>
                                 <i class="icon_pen hocvan_icon-item fa-solid fa-pencil"></i>
                             </span>
                             <span class="btnXoaTinHocNgoaiNgu" data=${data.TinHocNgoaiNguUngVienID}>
                                 <i class="icon_strash hocvan_icon-item fa-solid fa-trash-can"></i>
                             </span>
                         </div>
                     </li>
            `)
        }
    } else {
        $('#TinHocNgoaiNgu_items').append(` <li class="list_items">
                                             <div class="col-md-12 ten_hocvan"style="padding:26px 0;text-align:center;color:#D9D9D9;">
                                                 <h3 >Hiện chưa có dữ liệu</h3>
                                             </div>
                                         </li>`);
    }
}

function SuaDuLieuTinHocNgoaiNgu(ID) {
    var result = NTS.getAjax('/UngVien/ChiTietCV/LoadDuLieuSuaTinHocNgoaiNgu', { ID: ID }).Result;
    if (result.length > 0) {
        data = result[0];
        $('#ModalThemTinHocNgoaiNgu').modal('show');
        $('#tieudemodalTinHocNgoaiNgu').text("Cập nhật tin học, ngoại ngữ");
        $('#TinHocNgoaiNguUngVienID').value(ID);
        $('#TenTinHoc_NgoaiNgu').value(data.TenTinHocNgoaiNguUngVien);
        CKEDITOR.instances.MoTaTinHocNgoaiNgu.setData(result[0].MoTa);
        ThaoTac = "sua";
    }
    else {
        NTS.loi('Tải dữ liệu sửa thất bại')
    }
}

function XoaKyTinHocNgoaiNgu(ID) {
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/UngVien/ChiTietCV/XoaTinHocNgoaiNguUngVien', { id: ID });
        if (!result.Err) {
            LoadTinHocNgoaiNguUngVien();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}

//Người liên hệ
function TruocKhiThemNguoiLienHe() {
    $('#TenNguoiLienHe').value("");
    $('#SoDienThoaiNLH').value("");
    $('#TenCongTyNLH').value("");
    $('#ChucVu').value("");
    //CKEDITOR.instances.MoTaNguoiLienHe.setData("");
}

$(document).on('click', '#btn_luunguoilienhe', function () {
    const validate = new NTSValidate('#ModalThemNguoiLienHe');
    //Kiểm tra bắt buộc nhập 1
    if (!validate.trim().check()) {
        return false;
    }
    var mang = new Array();
    mang[0] = ThaoTac;
    mang[1] = $('#NguoiLienHeID').value();
    mang[2] = $('#TenNguoiLienHe').value();
    mang[3] = $('#SoDienThoaiNLH').value();
    mang[4] = $('#TenCongTyNLH').value();
    mang[5] = $('#ChucVu').value();
    //mang[3] = CKEDITOR.instances.MoTaTinHocNgoaiNgu.getData();

    if ($('#TenNguoiLienHe').isempty("Tên người liên hệ không được bỏ trống!")) return false;

    var result = NTS.getAjax('/UngVien/ChiTietCV/LuuThongTin_NguoiLienHe', { data: mang });
    if (!result.Err) {
        $('#NguoiLienHe_items').html('');
        NTS.thanhcong(result.Msg);
        LoadNguoiLienHe();
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    $('#ModalThemNguoiLienHe').modal('hide');
    TruocKhiThemNguoiLienHe();
});

function LoadNguoiLienHe() {
    $('#NguoiLienHe_items').html('');
    var GetAll = NTS.getAjax_NoVerifi('/UngVien/ChiTietCV/getNguoiLienHe', {}).Result;
    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            data = GetAll[i];

            $('#NguoiLienHe_items').append(`
                     <li class="list_items">
                         <div class="col-md-9 ten_hocvan ten_kynang">
                             <h3>${data.TenNguoiLienHe}</h3>
                             <p>${data.SoDienThoai}</p>
                         </div>
                         <div class="hocvan_icon col-md-1">
                             <span class="btnSuaNguoiLienHe" data=${data.NguoiLienHeID}>
                                 <i class="icon_pen hocvan_icon-item fa-solid fa-pencil"></i>
                             </span>
                             <span class="btnXoaNguoiLienHe" data=${data.NguoiLienHeID}>
                                 <i class="icon_strash hocvan_icon-item fa-solid fa-trash-can"></i>
                             </span>
                         </div>
                     </li>
            `)
        }
    } else {
        $('#NguoiLienHe_items').append(` <li class="list_items">
                                             <div class="col-md-12 ten_hocvan"style="padding:26px 0;text-align:center;color:#D9D9D9;">
                                                 <h3 >Hiện chưa có dữ liệu</h3>
                                             </div>
                                         </li>`);
    }
}

function SuaDuLieuNguoiLienHe(ID) {
    var result = NTS.getAjax('/UngVien/ChiTietCV/LoadDuLieuSuaNguoiLienHe', { ID: ID }).Result;
    if (result.length > 0) {
        data = result[0];
        $('#ModalThemNguoiLienHe').modal('show');
        $('#tieudemodalNguoiLienHe').text("Cập nhật người liên hệ");
        $('#NguoiLienHeID').value(ID);
        $('#TenNguoiLienHe').value(data.TenNguoiLienHe);
        $('#SoDienThoaiNLH').value(data.SoDienThoai);
        $('#TenCongTyNLH').value(data.TenCongTy);
        $('#ChucVu').value(data.ChucVu);
        //CKEDITOR.instances.MoTaTinHocNgoaiNgu.setData(result[0].MoTa);
        ThaoTac = "sua";
    }
    else {
        NTS.loi('Tải dữ liệu sửa thất bại')
    }
}

function XoaNguoiLienHe(ID) {
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/UngVien/ChiTietCV/XoaNguoiLienHe', { id: ID });
        if (!result.Err) {
            LoadNguoiLienHe();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}

//Hoạt động
function TruocKhiThemHoatDong() {
    $('#VaiTro').value("");
    $('#HDTuNgay').value("");
    $('#HDDenNgay').value("");
    CKEDITOR.instances.MoTaHoatDong.setData("");
}

$(document).on('click', '#btn_luuhoatdong', function () {
    const validate = new NTSValidate('#ModalThemHoatDong');
    //Kiểm tra bắt buộc nhập 1
    if (!validate.trim().check()) {
        return false;
    }
    var mang = new Array();
    mang[0] = ThaoTac;
    mang[1] = $('#HoatDongID').value();
    mang[2] = $('#VaiTro').value();
    mang[3] = $('#HDTuNgay').value();
    mang[4] = $('#HDDenNgay').value();
    mang[5] = CKEDITOR.instances.MoTaHoatDong.getData();

    var HDDenNgay = moment($('#HDDenNgay').val(), "DD/MM/YYYY");
    var HDTuNgay = moment($('#HDTuNgay').val(), "DD/MM/YYYY");

    if (HDDenNgay.isValid() && HDTuNgay.isValid()) {
        if (HDDenNgay.isBefore(HDTuNgay)) {
            NTS.canhbao('Ngày kết thúc không được nhỏ hơn ngày bắt đầu!');
            return false;
        } else if (HDDenNgay.isSame(HDTuNgay, 'day')) {
            NTS.canhbao('Ngày kết thúc không được trùng với ngày bắt đầu!');
            return false;
        }
    }

    if ($('#VaiTro').isempty("Vai Trò không được bỏ trống!")) return false;

    var result = NTS.getAjax('/UngVien/ChiTietCV/LuuThongTin_HoatDong', { data: mang });
    if (!result.Err) {
        $('#HoatDong_items').html('');
        NTS.thanhcong(result.Msg);
        LoadHoatDong();
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    $('#ModalThemHoatDong').modal('hide');
    TruocKhiThemHoatDong();
});

function LoadHoatDong() {
    $('#HoatDong_items').html('');
    var GetAll = NTS.getAjax_NoVerifi('/UngVien/ChiTietCV/getHoatDong', {}).Result;

    if (GetAll.length > 0) {
        for (var i = 0; i < GetAll.length; i++) {
            data = GetAll[i];
            var tuNgayParts = data.TuNgay.split('/');
            var denNgayParts = data.DenNgay.split('/');

            var tuNgayFormatted = tuNgayParts[2] + '-' + tuNgayParts[1] + '-' + tuNgayParts[0];
            var denNgayFormatted = denNgayParts[2] + '-' + denNgayParts[1] + '-' + denNgayParts[0];

            var TuNgay = new Date(tuNgayFormatted);
            var DenNgay = new Date(denNgayFormatted);

            var ThoiGian = '', DonVi = '';

            if (TuNgay.getFullYear() === DenNgay.getFullYear() && TuNgay.getMonth() === DenNgay.getMonth()) {
                // Tính số ngày
                ThoiGian = DenNgay.getDate() - TuNgay.getDate();
                DonVi = 'ngày';

            } else if (TuNgay.getFullYear() === DenNgay.getFullYear()) {
                // Tính số tháng
                ThoiGian = DenNgay.getMonth() - TuNgay.getMonth();
                if (ThoiGian < 0) {
                    ThoiGian += 12;
                }
                DonVi = 'tháng';
            } else {
                // Tính số năm
                ThoiGian = DenNgay.getFullYear() - TuNgay.getFullYear();
                DonVi = 'năm';
            }

            $('#HoatDong_items').append(`
                     <li class="list_items" >
                          <div class="col-md-1 sonam_hocvan">
                              <span>${ThoiGian}</span>
                              <span><strong>${DonVi}</strong></span>
                          </div>
                          <div class="col-md-8 ten_hocvan">
                              <h3>${data.VaiTro}</h3>
                              <p>${data.TuNgay} - ${data.DenNgay}</p>
                          </div>
                          <div class="hocvan_icon col-md-1">
                              <span class="btnSuaHoatDong" data=${data.HoatDongID}>
                                  <i class="icon_pen hocvan_icon-item fa-solid fa-pencil"></i>
                              </span>
                              <span class="btnXoaHoatDong" data=${data.HoatDongID}>
                                  <i class="icon_strash hocvan_icon-item fa-solid fa-trash-can"></i>
                              </span>
                          </div>
                      </li>
            `)
        }
    } else {
        $('#HoatDong_items').append(` <li class="list_items">
                                             <div class="col-md-12 ten_hocvan"style="padding:26px 0;text-align:center;color:#D9D9D9;">
                                                 <h3 >Hiện chưa có dữ liệu</h3>
                                             </div>
                                         </li>`);
    }
}

function SuaDuLieuHoatDong(ID) {
    var result = NTS.getAjax('/UngVien/ChiTietCV/LoadDuLieuSuaHoatDong', { ID: ID }).Result;
    if (result.length > 0) {
        data = result[0];
        $('#ModalThemHoatDong').modal('show');
        $('#tieudemodalHoatDong').text("Cập nhật hoạt động");
        $('#HoatDongID').value(ID);
        $('#VaiTro').value(data.VaiTro);
        $('#HDTuNgay').value(data.TuNgay);
        $('#HDDenNgay').value(data.DenNgay);
        CKEDITOR.instances.MoTaHoatDong.setData(result[0].MoTa);
        ThaoTac = "sua";
    }
    else {
        NTS.loi('Tải dữ liệu sửa thất bại')
    }
}

function XoaHoatDong(ID) {
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/UngVien/ChiTietCV/XoaHoatDong', { id: ID });
        if (!result.Err) {
            LoadHoatDong();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}

function LoadDuLieuCV() {
    var array = NTS.getAjax('/UngVien/ChiTietCV/LoadDuLieuCV', {}).Result[0];
    $("#CVID").value(array.CVID)
    $("#TieuDe").value(array.TieuDe)
    $('#HoTen').value(array.HoVaTen);
    $('#NgaySinh').value(array.NgayThangNamSinh);
    if (array.GioiTinh == '1') {
        $('#Gender_Nam').prop('checked', true);
    } else if (array.GioiTinh == '2') {
        $('#Gender_Nu').prop('checked', true);
    } else {
        $('#Gender_Nam').prop('checked', false);
        $('#Gender_Nu').prop('checked', false);
    }
    $('#SoDienThoai').value(array.SoDienThoai);
    $('#Email').value(array.Email);
    $('#DiaChi').value(array.DiaChi);
    $('#MucTieuCongViec').value(array.MucTieuNgheNghiep);
    $('#SoThich').value(array.SoThich);
    if (array.AnhDaiDien != null && array.AnhDaiDien.length > 0) {
        let linkVB = array.AnhDaiDien;
        let arrFile = linkVB.split('*');
        for (let p = 0; p < arrFile.length - 1; p++) {
            if (arrFile[p].lastIndexOf('.') != -1) {
                // file có đuôi .*
                if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                    arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                    arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg") {
                    $('#list-file-tai-lieu').html(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('${arrFile[p].replace('~', '')}')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o text-white delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                } else {
                    $('#list-file-tai-lieu').html(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o text-white delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                }
            } else {
                // file không đuôi
                $('#list-file-tai-lieu').html(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o text-white delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
            }
        }
    }
}
/*function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
*/
$(document).on('click', '#complete-cv-btn', function () {
    LuuThongTinCV()
});
$(document).on('click', '#btnChonTepVB_tailieu', function () {
    $('#fileVB_tailieu').click();
});
$(document).on('change', '#fileVB_tailieu', function () {
    UploadTaiLieu_us('CV'); //hàm dùng chung ở us TaiLieu
});
function UploadTaiLieu_us(pathChiTiet) {
    let data = NTS.upload({
        name: '#fileVB_tailieu',///ID input type="file"
        loaiVB: 'VB',///Nhận 1 trong 2 giá trị DL hoặc VB
    });
    if (data.length > 0) {
        var UngVien = NTS.getAjax('/UngVien/TongQuan/getHoSoUngVienID', {}).Result;
        var UngVienID = UngVien[0].UngVienID;
        let result = NTS.getAjax("/CongThongTinViecLam/Function/LuuDinhKem_MotFile", { PathTemp: data, ID: UngVienID, PathChiTiet: 'CV', bangDk: 'CV', cotDk: 'UngVienID', cotDinhKem: 'AnhDaiDien' });
        
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
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg") {
                            $('#list-file-tai-lieu').html(`<div class="frame-file me-2">
                                                <div class="frame-top">
                                                    <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('${arrFile[p].replace('~', '')}')"></div>
                                                </div>
                                                <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                <i class="fa fa-trash-o delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                            </div>`);
                        } else {
                            $('#list-file-tai-lieu').html(`<div class="frame-file me-2">
                                                <div class="frame-top">
                                                    <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/images/file.png')"></div>
                                                </div>
                                                <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                <i class="fa fa-trash-o delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                            </div>`);
                        }
                    } else {
                        // file không đuôi
                        $('#list-file-tai-lieu').html(`<div class="frame-file me-2">
                                                <div class="frame-top">
                                                    <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/images/file.png')"></div>
                                                </div>
                                                <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                <i class="fa fa-trash-o delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                            </div>`);
                    }
                }

            }
        }
    }
}

$(document).on('click', '.download-file-attachments', function () {
    window.open($(this).attr('data-url-file'));
    return false;
});

$(document).on('click', '.delete-file-attachments', function () {
    var UngVien = NTS.getAjax('/UngVien/TongQuan/getHoSoUngVienID', {}).Result;
    var UngVienID = UngVien[0].UngVienID;
    let duongDan = $(this);
    let id = UngVienID;
    let bang = "CV";
    let cot = "UngVienID";
    CanhBaoXoa(() => {
        let result = NTS.getAjax('/CongThongTinViecLam/Function/XoaDinhKem', { ID: id, duongDan: duongDan.attr('data-url-file'), bangDk: bang, cotDk: cot, loai: '', tenCotDinhKem: 'AnhDaiDien' });
        if (!result.Err) {
            duongDan.parent('div').remove();
            $('#fileVB_tailieu').value('');
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
    return false;
});

function LuuThongTinCV() {

    var param = new Array();
    var GioiTinh = '';

    if ($('#Gender_Nam').prop('checked')) {
        GioiTinh = '1';
    } else if ($('#Gender_Nu').prop('checked')) {
        GioiTinh = '2';
    }
    else {
        GioiTinh = '0';
    }

    if ($("#NgaySinh").value() != "") {
        if ($("#NgaySinh").value().split('/').length == 2 && $("#NgaySinh").value().split('/')[1].length == 4) {
            if ($("#NgaySinh").value().split('/')[0].length == 1) {
                $("#NgaySinh").value('01/0' + $("#NgaySinh").value()); // thêm số 0 trước tháng
            }
            else
                if ($("#NgaySinh").value().split('/')[0].length == 2) {
                    $("#NgaySinh").value('01/' + $("#NgaySinh").value());
                }
                else {
                    NTS.canhbao('Ngày sinh không đúng định dạng ngày tháng!');
                    return !1;
                }
        }
        if ($("#NgaySinh").value().length == 4) {
            $("#NgaySinh").value('01/01/' + saveData[3]); // thêm ngày, tháng
        }
        var checkngay = NTS.getAjax('/DangKyUngVien/KiemTraNgay', { chuoiNgay: $('#NgaySinh').value() });
        if (!checkngay.Result) {
            NTS.canhbao("Ngày sinh không đúng định dạng ngày tháng!");
            return false;
        }
        var kq = 0;
        var today = new Date();
        var namhientai = today.getFullYear();
        var ngaysinh = $('#NgaySinh').val(); // Sử dụng .val() thay vì .value()
        if (ngaysinh.length == 4) {
            kq = namhientai - ngaysinh;
            if (kq < 15) {
                NTS.canhbao("Lao động đang nhập có số tuổi nhỏ hơn 15!");
                $('#NgaySinh').focus();
                return false; // Thêm lệnh return để dừng hàm
            }
        } else {
            var [ngay, thang, nam] = ngaysinh.split('/');
            kq = namhientai - nam;
            if (kq < 15) {
                NTS.canhbao("Lao động đang nhập có số tuổi nhỏ hơn 15!");
                $('#NgaySinh').focus();
                return false; // Thêm lệnh return để dừng hàm
            }
        }
    }
    else {
        NTS.canhbao("Chưa nhập ngày sinh!");
        $('#NgaySinh').focus();
        return false;
    }
    
    param[0] = $('#TieuDe').value();
    param[1] = $('#HoTen').value();
    param[2] = $('#NgaySinh').value();
    param[3] = GioiTinh;
    param[4] = $('#SoDienThoai').value();
    param[5] = $('#Email').value();
    param[6] = $('#DiaChi').value();
    param[7] = $('#MucTieuCongViec').value();
    param[8] = $('#SoThich').value();
    param[9] = $('#CVID').value();

    var result = NTS.getAjax('/UngVien/ChiTietCV/LuuThongTinCV', { data: param });
    if (!result.Err) {
        NTS.thanhcong(result.Msg);
        //CapNhatTrangThaiBiTuChoiXacThuc();
        return false;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
}