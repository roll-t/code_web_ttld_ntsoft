$(function () {
    LoadDataTable();
});

var fmNganhNgheKD = function (cell) {
    var ID = cell.getData().NhaTuyenDungID;
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
    var ID = cell.getData().NhaTuyenDungID;
    var TrangThaiDuyet = cell.getData().TrangThaiDuyet;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
       <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
       <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
            <a  class="dropdown-item btnXemTT  " href="#" data="${ID}">
                 <i class="fa fa-eye " aria-hidden="true" style="paddding-right:10px; color:#019017"></i>&ensp;  Xem thông tin nhà tuyển dụng
           </a>
           ` +

        (TrangThaiDuyet == 2
        ? ` <a class="dropdown-item btnDuyet" href="#" data="${ID}">
        <i class="fa-solid fa-paper-plane" style="color:#3e9ef7"></i>&ensp; Duyệt nhà tuyển dụng
    </a>
    <a class="dropdown-item btnTuChoi" href="#" data="${ID}">
        <i class="fa-solid fa-circle-xmark" style="color:red"></i>&ensp; Từ chối nhà tuyển dụng
    </a>`
            : '') +

        (TrangThaiDuyet == 3
        ? ` <a class="dropdown-item btnTuChoi" href="#" data="${ID}">
        <i class="fa-solid fa-circle-xmark" style="color:red"></i>&ensp; Từ chối nhà tuyển dụng
    </a>`
            : '') +

        (TrangThaiDuyet == 4
        ? ` <a class="dropdown-item btnDuyet" href="#" data="${ID}">
        <i class="fa-solid fa-paper-plane" style="color:#3e9ef7"></i>&ensp; Duyệt nhà tuyển dụng
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
        { title: "Tên nhà tuyển dụng", field: "TenToChuc", formatter: 'textarea', minWidth: 250, vertAlign: "middle", headerHozAlign: "center", hozAlign: "left" },
        { title: "Quy mô", field: "TenQuyMo", formatter: 'textarea', minWidth: 150, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Mã số thuế", field: "MaSothue", formatter: 'textarea', minWidth: 110, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Điện thoại", field: "SoDienThoai", formatter: 'textarea', vertAlign: "middle", minWidth: 130, headerHozAlign: "center", hozAlign: "left" },
        { title: "Email", field: "Email", formatter: 'textarea', vertAlign: "middle", minWidth: 250, headerHozAlign: "center", hozAlign: "left" },
        { title: "Ngành nghề", field: "TenNganhNghe", formatter: fmNganhNgheKD, vertAlign: "middle", minWidth: 350, headerHozAlign: "center", hozAlign: "left" },
        { title: "Trạng thái", field: "TrangThaiDuyet", formatter: status, vertAlign: "middle", minWidth: 120, headerHozAlign: "center", hozAlign: "center" },
        { title: "NhaTuyenDungID", field: "NhaTuyenDungID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/CongThongTinViecLam/DanhSachNhaTuyenDung/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
    GridKhongCoDuLieu("Grid1");
}


function XetDuyetNhaTuyenDung(ID) {
    XacNhanDuyet(() => {
        const result = NTS.getAjax("/CongThongTinViecLam/DanhSachNhaTuyenDung/XetDuyet", { id: ID });
        if (!result.Err) {
            LoadDataTable();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}

$(document).on('click', '.btnDuyet', function () {
    var ID = $(this).attr('data');
    XetDuyetNhaTuyenDung(ID);
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

function showModalTuChoi() {
    $('#mdTuChoi').modal('show');
    resetForm('#mdTuChoi');
    NTS.hienNgayHienTaiLenTextbox("NgayTuChoi");
}

$(document).on('click', '#btnLuuVaDong', function () {
    const validate = new NTSValidate('#mdTuChoi');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }

    var saveData = new Array();
    saveData[0] = $('#NhaTuyenDungID').value();
    saveData[1] = $('#NgayTuChoi').value();
    saveData[2] = $('#NoiDungTuChoi').value();

    var result = NTS.getAjax('/CongThongTinViecLam/DanhSachNhaTuyenDung/TuChoi', { data: saveData });
    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        $('#NhaTuyenDungID').value('');
        $('#mdTuChoi').modal('hide');
        return false;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});

$(document).on('click', '.btnTuChoi', function () {
    var ID = $(this).attr('data');
    showModalTuChoi()
    $('#NhaTuyenDungID').value(ID);
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
            else if ($('#mdXemThongTinNhaTuyenDung').hasClass('show')) {
                $('#mdXemThongTinNhaTuyenDung').modal('hide');
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

// Xem chi tiết nội dung ngành nghề kinh doanh
$(document).on('click', '.btnXemThemNganhNghe', function () {
    XemChiTietNganhNghe($(this).attr('data'));
});

function XemChiTietNganhNghe(ID) {
    $("#mdXemThem").modal('show');
    $('#tieuDeModalCT').text('Chi tiết nội dung ngành nghề kinh doanh chính');
    const result = NTS.getAjax("/CongThongTinViecLam/DanhSachNhaTuyenDung/NganhNgheKinhDoanhCT", { id: ID });
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

function showModalXemThongTin(ID) {
    $('#mdXemThongTinNhaTuyenDung').modal('show');
    const result = NTS.getAjax('/CongThongTinViecLam/DanhSachNhaTuyenDung/XemThongTinNhaTuyenDung', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#lblTieuDeThongTinNhatTuyenDung').html('Xem thông tin nhà tuyển dụng: ' + data.TenToChuc.toUpperCase());
        if (data.TenNganhNgheKD == ";" || data.TenNganhNgheKD == "") {
            $('#lblNganhNgheKD_us').html('---');
        } else {
            $('#lblNganhNgheKD_us').html(data.TenNganhNgheKD);
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

        if (data.TenToChuc == "") {
            $('#lblTenNhaTuyenDung').html('---');
        } else {
            $('#lblTenNhaTuyenDung').html(data.TenToChuc);
        }
        if (data.NguoiDaiDien == "") {
            $('#lblHoVaTen_us').html('---');
        } else {
            $('#lblHoVaTen_us').html(data.NguoiDaiDien);
        }
        if (data.SoCCCD == "") {
            $('#lblSoCCCD_us').html('---');
        } else {
            $('#lblSoCCCD_us').html(data.SoCCCD);
        }
        if (data.MaSothue == "") {
            $('#lblMaSoThue_us').html('---');
        } else {
            $('#lblMaSoThue_us').html(data.MaSothue);
        }
        if (data.TenTinh == "") {
            $('#lblTinh_us').html('---');
        } else {
            $('#lblTinh_us').html(data.TenTinh);
        }

        if (data.TenHuyen == "") {
            $('#lblHuyen_us').html('---');
        } else {
            $('#lblHuyen_us').html(data.TenHuyen);
        }
        if (data.TenXa == "") {
            $('#lblXa_us').html('---');
        } else {
            $('#lblXa_us').html(data.TenXa);
        }

        if (data.DiaChiCuThe == "") {
            $('#lblDiaChiCuThe_us').html('---');
        } else {
            $('#lblDiaChiCuThe_us').html(data.DiaChiCuThe);
        }

        if (data.GioiThieu == "") {
            $('#lblGioiThieu_us').html('---');
        } else {
            $('#lblGioiThieu_us').html(data.GioiThieu);
        }
        //Xem Đính kèm file
        $('#list-file-xem-dinh-kem-Nha-tuyen-dung').html('');
        $('#list-file-xem-dinh-kem-Nha-tuyen-dung').css({ "padding": "0" });
        if (data.Logo != null && data.Logo.length > 0) {
            let linkVB = data.Logo;
            let arrFile = linkVB.split('*');
            for (let p = 0; p < arrFile.length - 1; p++) {
                if (arrFile[p].lastIndexOf('.') != -1) {
                    // file có đuôi .*
                    if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".docx" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".PDF"
                    ) {
                        $('#list-file-xem-dinh-kem-Nha-tuyen-dung').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('${arrFile[p].replace('~', '')}')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                </div>`);
                    } else {
                        $('#list-file-xem-dinh-kem-Nha-tuyen-dung').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                </div>`);
                    }
                } else {
                    // file không đuôi
                    $('#list-file-xem-dinh-kem-Nha-tuyen-dung').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                </div>`);
                }
            }
        } else {
            $('#list-file-xem-dinh-kem-Nha-tuyen-dung').html('Chưa có logo');
            $('#list-file-xem-dinh-kem-Nha-tuyen-dung').css({
                "text-align": "center",
                "color": "rgb(216 213 213)",
                "font-weight": "500",
                "padding": "30px 0"
            });

        }
    }
}

$(document).on('click', '.btnXemTT', function () {
    var ID = $(this).attr('data');
    showModalXemThongTin(ID)
});

$(document).on('click', '.download-file-attachments', function () {
    window.open($(this).attr('data-url-file'));
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