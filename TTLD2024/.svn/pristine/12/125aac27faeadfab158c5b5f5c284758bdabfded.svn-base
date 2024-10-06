$(function () {
    LoadDataTable();
});

var fmNganhNgheKD = function (cell) {
    var ID = cell.getData().ViecTimNguoiID;
    var NganhNghe = cell.getValue();
    if (NganhNghe == ";") {
        return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;"></p>
                    </div>`;
    }
    if (NganhNghe != "") {
        if (NganhNghe.length > 40) {
            NganhNghe = NganhNghe.substring(0, 35) + "...";
            return `
                        <div class="col-md-12" style="padding-right: 0px; padding-left: 0px; padding-bottom:4px;">
                            <div class="Content-text">${NganhNghe}<span class='btnXemThemNganhNghe' style='color:var(--tblr-primary);'  title="Xem chi tiết ngành nghề kinh doanh chính" data='${ID}' data-loai='TC'>Xem thêm</span></div>
                        </div>`;
        } else {
            return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${NganhNghe}</p>
                    </div>`;
        }
    } else {
        return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${NganhNghe}</p>
                    </div>`;
    }
}

function actionDropdownFormatter(cell, formatterParams, onRendered) {
    var ID = cell.getData().ViecTimNguoiID;
    var TrangThaiDuyet = cell.getData().TrangThai;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
       <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
       <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
            <a  class="dropdown-item btnXemTT  " href="#" data="${ID}">
                 <i class="fa fa-eye " aria-hidden="true" style="paddding-right:10px; color:#019017"></i>&ensp;  Xem thông tin tin tuyển dụng
           </a>
           ` +

        (TrangThaiDuyet == 2
            ? ` <a class="dropdown-item btnDuyet" href="#" data="${ID}">
        <i class="fa-solid fa-paper-plane" style="color:#3e9ef7"></i>&ensp; Duyệt tin tuyển dụng
    </a>
    <a class="dropdown-item btnTuChoi" href="#" data="${ID}">
        <i class="fa-solid fa-circle-xmark" style="color:red"></i>&ensp; Từ chối tin tuyển dụng
    </a>`
            : '') +

        (TrangThaiDuyet == 3
            ? ` <a class="dropdown-item btnTuChoi" href="#" data="${ID}">
        <i class="fa-solid fa-circle-xmark" style="color:red"></i>&ensp; Từ chối tin tuyển dụng
    </a>`
            : '') +

        (TrangThaiDuyet == 4
            ? ` <a class="dropdown-item btnDuyet" href="#" data="${ID}">
        <i class="fa-solid fa-paper-plane" style="color:#3e9ef7"></i>&ensp; Duyệt tin tuyển dụng
    </a>`
            : '') +
        ` </div>
       </div>`;

    return select;
}

function status(cell, formatterParams, onRendered) {
    data = cell.getData().TrangThai;
    return `<div class="badge ${GetColorTrangThai(data)}">${GetTrangThaiTTD(data)}</div>`;
}

//-------------------Grid thu thập người nước ngoài làm việc tại VN---------------//
var Grid1 = new Tabulator("#Grid1", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: '80vh',
    columns: [
        {
            title: '<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
            field: "actions",
            formatter: actionDropdownFormatter, width: 60, headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", headerSort: false
        },
        { title: "Ngày đăng", field: "NgayDang", formatter: 'textarea', minWidth: 120, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center" },
        { title: "Vị trí tuyển dụng", field: "TenCongViec", formatter: 'textarea', minWidth: 250, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Số lượng", field: "SoLuongTuyen", formatter: 'textarea', minWidth: 90, vertAlign: "middle", headerHozAlign: "center", hozAlign: "right"},
        { title: "Mức lương", field: "MucLuong", formatter: 'textarea', vertAlign: "middle", minWidth: 130, headerHozAlign: "center", hozAlign: "left" },
        { title: "Hạn nộp", field: "HanNop", formatter: 'textarea', vertAlign: "middle", minWidth: 120, headerHozAlign: "center", hozAlign: "center" },
        { title: "Ngành nghề", field: "TenNganhNghe", formatter: fmNganhNgheKD, vertAlign: "middle", minWidth: 350, headerHozAlign: "center", hozAlign: "left" },
        { title: "Trạng thái", field: "TrangThaiDuyet", formatter: status, vertAlign: "middle", minWidth: 120, headerHozAlign: "center", hozAlign: "center" },
        { title: "ViecTimNguoiID", field: "ViecTimNguoiID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

async function LoadDataTable() {
    Grid1.clearData();
    const GetAll = await NTS.getAjaxAsync("/CongThongTinViecLam/DanhSachDangTinTuyenDung/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
    GridKhongCoDuLieu("Grid1");
}

function GetTrangThaiTTD(data) {
    if (data == 1) {
        return "Mới tạo";
    } else if (data == 2) {
        return "Chưa duyệt";
    } else if (data == 3) {
        return "Đã duyệt";
    } else {
        return "Đã từ chối";
    }
}

function GetColorTrangThai(data) {
    if (data == 1) {
        return "bg-warning";
    } else if (data == 2) {
        return "bg-info";
    } else if (data == 3) {
        return "bg-success";
    } else {
        return "bg-danger";
    }
}

// Xem chi tiết nội dung ngành nghề kinh doanh
$(document).on('click', '.btnXemThemNganhNghe', function () {
    XemChiTietNganhNghe($(this).attr('data'));
});

function XemChiTietNganhNghe(ID) {
    $("#mdXemThem").modal('show');
    $('#tieuDeModalCT').text('Chi tiết nội dung ngành nghề kinh doanh chính');
    const result = NTS.getAjax("/CongThongTinViecLam/DanhSachDangTinTuyenDung/NganhNgheKinhDoanhCT", { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        let tenNganhNgheKD = data.TenNganhNgheKD;

        // Tách chuỗi thành các phần tử dựa trên dấu phẩy và khoảng trắng
        let nganhNgheArray = tenNganhNgheKD.split(';').map(item => item.trim()).filter(item => item);

        // Tạo HTML với mỗi phần tử trên một dòng
        let htmlContent = nganhNgheArray.map(item => `- ${item};`).join('<br>');

        $('#NoiDungGhiChu_CT').html(htmlContent);
    } else {
        $('#NoiDungGhiChu_CT').html("Chưa có dữ liệu");
    }

    return;
}

function XetDuyetDangtinTuyenDung(ID) {
    XacNhanDuyet(() => {
        const result = NTS.getAjax("/CongThongTinViecLam/DanhSachDangTinTuyenDung/XetDuyet", { id: ID });
        if (!result.Err) {
            LoadDataTable();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}

$(document).on('click', '.btnDuyet', function () {
    var ID = $(this).attr('data');
    XetDuyetDangtinTuyenDung(ID);
});

function showModalTuChoi() {
    $('#mdTuChoi').modal('show');
    resetForm('#mdTuChoi');
    NTS.hienNgayHienTaiLenTextbox("NgayTuChoi");
}

$(document).on('click', '.btnTuChoi', function () {
    var ID = $(this).attr('data');
    showModalTuChoi()
    $('#ViecTimNguoiID').value(ID);
});

$(document).on('click', '#btnLuuVaDong', function () {
    const validate = new NTSValidate('#mdTuChoi');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }

    var saveData = new Array();
    saveData[0] = $('#ViecTimNguoiID').value();
    saveData[1] = $('#NgayTuChoi').value();
    saveData[2] = $('#NoiDungTuChoi').value();
    var result = NTS.getAjax('/CongThongTinViecLam/DanhSachDangTinTuyenDung/TuChoi', { data: saveData });
    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        $('#ViecTimNguoiID').value('');
        $('#mdTuChoi').modal('hide');
        return false;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});

//------------------------------------------- Tìm kiếm--------------------------------------
$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        Grid1.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid1.setFilter(matchAny, { value: $('#timKiem').val() });
});

/////////// PHÍM TẮT /////////
var hotKey = 0; // 1 thêm
$(document).on('keydown', function (e) {
    switch (e.keyCode) {
        case 113:
            if (hotKey == 0)
                $('#btnThemMoi').trigger('click');
            e.preventDefault();
            break;
        case 114:
            if (hotKey == 0)
                $('.nav-search-input').focus();
            e.preventDefault();
            break;
        case 115:
            if ($('#mdTuChoi').hasClass('show')) {
                $('#mdTuChoi').modal('hide');
                e.preventDefault();
                break;
            }
            else if ($('#mdXemThongTinDangTinTuyenDung').hasClass('show')) {
                $('#mdXemThongTinDangTinTuyenDung').modal('hide');
                e.preventDefault();
                break;
            }
        case 120:
            if (hotKey == 1)
                $('#btnLuuVaDong').trigger('click');
            e.preventDefault();
            break;
    }
});
$(document).on('shown.bs.modal', '#mdTuChoi', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdTuChoi', function () {
    hotKey = 0;
});

function showModalXemThongTin(ID) {
    $('#mdXemThongTinDangTinTuyenDung').modal('show');
    const result = NTS.getAjax('/CongThongTinViecLam/DanhSachDangTinTuyenDung/XemThongTinDangTinTuyenDung', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#lblTieuDeThongTinTinTuyenDung').html('Xem thông tin tin tuyển dụng');
        if (data.TenNganhNgheKD == ";" || data.TenCongViec == "") {
            $('#lblNganhNgheKD_us').html('---');
        } else {
            $('#lblNganhNgheKD_us').html(data.TenNganhNgheKD);
        }

        if (data.TenCongViec == "") {
            $('#lblViTriTuyenDung').html('---');
        } else {
            $('#lblViTriTuyenDung').html(data.TenCongViec);
        }

        if (data.SoLuongTuyen == "") {
            $('#lblSoLuongTuyenDung').html('---');
        } else {
            $('#lblSoLuongTuyenDung').html(data.SoLuongTuyen);
        }

        if (data.NgayDang == "") {
            $('#lblNgayDang_us').html('---');
        } else {
            $('#lblNgayDang_us').html(data.NgayDang);
        }

        if (data.HanNop == "") {
            $('#lblHanNop_us').html('---');
        } else {
            $('#lblHanNop_us').html(data.HanNop);
        }
        if (data.TenGioiTinh == "") {
            $('#lblGioiTinh_us').html('---');
        } else {
            $('#lblGioiTinh_us').html(data.TenGioiTinh);
        }
        if (data.TenHinhThucLV == "") {
            $('#lblHinhThucLV_us').html('---');
        } else {
            $('#lblHinhThucLV_us').html(data.TenHinhThucLV);
        }
        if (data.TenTrinhDoHV == "") {
            $('#lblTrinhDoHV_us').html('---');
        } else {
            $('#lblTrinhDoHV_us').html(data.TenTrinhDoHV);
        }
        if (data.TenMucLuong == "") {
            $('#lblMucLuong_us').html('---');
        } else {
            $('#lblMucLuong_us').html(data.TenMucLuong);
        }

        if (data.TenKinhNghiem == "") {
            $('#lblKinhNghiem_us').html('---');
        } else {
            $('#lblKinhNghiem_us').html(data.TenKinhNghiem);
        }
        

        if (data.MoTaCongViec == "") {
            $('#lblMoTaCV_us').html('---');
        } else {
            $('#lblMoTaCV_us').html(data.MoTaCongViec);
        }
        if (data.CheDoPhucLoi == "") {
            $('#lblCheDoPhucLoi_us').html('---');
        } else {
            $('#lblCheDoPhucLoi_us').html(data.CheDoPhucLoi);
        }
        if (data.HinhThucTuyenDungID == "") {
            $('#lblHinhThucNop_us').html('---');
        } else {
            $('#lblHinhThucNop_us').html(data.HinhThucTuyenDungID);
        } if (data.YeuCauCongViec == "") {
            $('#lblYeuCauHS_us').html('---');
        } else {
            $('#lblYeuCauHS_us').html(data.YeuCauCongViec);
        } if (data.HoTen_NguoiLienHe == "") {
            $('#lblNguoiLienHe_us').html('---');
        } else {
            $('#lblNguoiLienHe_us').html(data.HoTen_NguoiLienHe);
        } if (data.ChucVu_NguoiLienHe == "") {
            $('#lblChucVu_us').html('---');
        } else {
            $('#lblChucVu_us').html(data.ChucVu_NguoiLienHe);
        } if (data.SoDT_NguoiLienHe == "") {
            $('#lblDienThoaiNLH_us').html('---');
        } else {
            $('#lblDienThoaiNLH_us').html(data.SoDT_NguoiLienHe);
        } if (data.Email_NguoiLienhe == "") {
            $('#lblEmailNLH_us').html('---');
        } else {
            $('#lblEmailNLH_us').html(data.Email_NguoiLienhe);
        }
    }
}

$(document).on('click', '.btnXemTT', function () {
    var ID = $(this).attr('data');
    showModalXemThongTin(ID)
});
