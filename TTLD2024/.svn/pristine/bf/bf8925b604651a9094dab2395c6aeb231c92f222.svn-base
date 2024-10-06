$(function () {
    LoadDataTable();
});
function actionDropdownFormatter(cell, formatterParams, onRendered) {
    var ID = cell.getData().UngVienID;
    var TrangThaiDuyet = cell.getData().TrangThaiDuyet;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
       <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
       <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
            <a  class="dropdown-item btnXemTT  " href="#" data="${ID}">
                 <i class="fa fa-eye " aria-hidden="true" style="paddding-right:10px; color:#019017"></i>&ensp;  Xem thông tin hồ sơ ứng viên
           </a>
           ` +

        (TrangThaiDuyet == 2
            ? ` <a class="dropdown-item btnDuyet" href="#" data="${ID}">
        <i class="fa-solid fa-paper-plane" style="color:#3e9ef7"></i>&ensp; Duyệt hồ sơ ứng viên
    </a>
    <a class="dropdown-item btnTuChoi" href="#" data="${ID}">
        <i class="fa-solid fa-circle-xmark" style="color:red"></i>&ensp; Từ chối nhà hồ sơ ứng viên
    </a>`
            : '') +

        (TrangThaiDuyet == 3
            ? ` <a class="dropdown-item btnTuChoi" href="#" data="${ID}">
        <i class="fa-solid fa-circle-xmark" style="color:red"></i>&ensp; Từ chối hồ sơ ứng viên
    </a>`
            : '') +

        (TrangThaiDuyet == 4
            ? ` <a class="dropdown-item btnDuyet" href="#" data="${ID}">
        <i class="fa-solid fa-paper-plane" style="color:#3e9ef7"></i>&ensp; Duyệt hồ sơ ứng viên
    </a>`
            : '') +
        ` </div>
       </div>`;

    return select;
}

function status(cell, formatterParams, onRendered) {
    data = cell.getData().TrangThaiDuyet;
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
        { title: "Tên ứng viên", field: "HoVaTen", formatter: 'textarea', minWidth: 250, vertAlign: "middle", headerHozAlign: "center", hozAlign: "left" },
        { title: "Giới tính", field: "TenGioiTinh", formatter: 'textarea', minWidth: 150, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Điện thoại", field: "SoDienThoai", formatter: 'textarea', vertAlign: "middle", minWidth: 130, headerHozAlign: "center", hozAlign: "left" },
        { title: "Email", field: "Email", formatter: 'textarea', vertAlign: "middle", minWidth: 250, headerHozAlign: "center", hozAlign: "left" },
        { title: "Địa chỉ", field: "DiaChi", formatter: 'textarea', vertAlign: "middle", minWidth: 250, headerHozAlign: "center", hozAlign: "left" },
        { title: "Trạng thái", field: "TrangThaiDuyet", formatter: status, vertAlign: "middle", minWidth: 120, headerHozAlign: "center", hozAlign: "center" },
        { title: "UngVienID", field: "UngVienID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/CongThongTinViecLam/DanhSachHoSoUngVien/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
    GridKhongCoDuLieu("Grid1");
}

//------------------------------------------- Tìm kiếm--------------------------------------
$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        Grid1.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid1.setFilter(matchAny, { value: $('#timKiem').val() });
});

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

function XetDuyetHoSoUngVien(ID) {
    XacNhanDuyet(() => {
        const result = NTS.getAjax("/CongThongTinViecLam/DanhSachHoSoUngVien/XetDuyet", { id: ID });
        if (!result.Err) {
            LoadDataTable();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}

$(document).on('click', '.btnDuyet', function () {
    var ID = $(this).attr('data');
    XetDuyetHoSoUngVien(ID);
});


function showModalTuChoi() {
    $('#mdTuChoi').modal('show');
    resetForm('#mdTuChoi');
    NTS.hienNgayHienTaiLenTextbox("NgayTuChoi");
}


$(document).on('click', '.btnTuChoi', function () {
    var ID = $(this).attr('data');
    showModalTuChoi()
    $('#UngVienID').value(ID);
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
    saveData[0] = $('#UngVienID').value();
    saveData[1] = $('#NgayTuChoi').value();
    saveData[2] = $('#NoiDungTuChoi').value();

    var result = NTS.getAjax('/CongThongTinViecLam/DanhSachHoSoUngVien/TuChoi', { data: saveData });
    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        $('#UngVienID').value('');
        $('#mdTuChoi').modal('hide');
        return false;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
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
            else if ($('#mdXemThongTinHoSoUngVien').hasClass('show')) {
                $('#mdXemThongTinHoSoUngVien').modal('hide');
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
    $('#mdXemThongTinHoSoUngVien').modal('show');
    const result = NTS.getAjax('/CongThongTinViecLam/DanhSachHoSoUngVien/XemThongTinHoSoUngVien', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#lblTieuDeThongTinHoSoUngVien').html('Xem thông tin hồ sơ ứng viên');
        if (data.TenTinh == ";" || data.TenTinh == "") {
            $('#lblTinh_us').html('---');
        } else {
            $('#lblTinh_us').html(data.TenTinh);
        }

        if (data.SoDienThoai == "") {
            $('#lblSoDienThoai_us').html('---');
        } else {
            $('#lblSoDienThoai_us').html(data.SoDienThoai);
        }

        if (data.Email == "") {
            $('#lblEmail_us').html('---');
        } else {
            $('#lblEmail_us').html(data.Email);
        }

        if (data.TinhTrangHonNhan == "") {
            $('#lblHonNhan_us').html('---');
        } else {
            $('#lblHonNhan_us').html(data.TinhTrangHonNhan);
        }
        if (data.TenGioiTinh == "") {
            $('#lblGioiTinh_us').html('---');
        } else {
            $('#lblGioiTinh_us').html(data.TenGioiTinh);
        }
        if (data.NgaySinh == "") {
            $('#lblNgaySinh').html('---');
        } else {
            $('#lblNgaySinh').html(data.NgaySinh);
        }
        if (data.HoVaTen == "") {
            $('#lblTenUngVien').html('---');
        } else {
            $('#lblTenUngVien').html(data.HoVaTen);
        }

        if (data.DiaChi == "") {
            $('#lblDiaChi_us').html('---');
        } else {
            $('#lblDiaChi_us').html(data.DiaChi);
        }
        if (data.SoCCCD == "") {
            $('#lblSoCCCD').html('---');
        } else {
            $('#lblSoCCCD').html(data.SoCCCD);
        } if (data.TenDanToc == "") {
            $('#lblDanToc_us').html('---');
        } else {
            $('#lblDanToc_us').html(data.TenDanToc);
        } if (data.TenTonGiao == "") {
            $('#lblTonGiao_us').html('---');
        } else {
            $('#lblTonGiao_us').html(data.TenTonGiao);
        } if (data.TenQuocTich == "") {
            $('#lblQuocTich_us').html('---');
        } else {
            $('#lblQuocTich_us').html(data.TenQuocTich);
        }
    }
}

$(document).on('click', '.btnXemTT', function () {
    var ID = $(this).attr('data');
    showModalXemThongTin(ID)
});