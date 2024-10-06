$(document).ready(function () {
    LoadGrid1();

    $(document).on('click', '.btnXemHSLuuTru', function () {
        $('#modal_xemHSLuuTru').modal('show');
        var ID = $(this).attr('data');
        XemTinTuyenDung(ID);
    });

    $(document).on('click', '.btnBoLuuHS', function () {
        var ID = $(this).attr('data');
        XoaHoSoUngTuyen(ID);
    });
});

var btnThaoTac = function (cell, formatterParams, onRendered) {
    return `<button type='button' class='btn btn-xs btn-success btnXemHSLuuTru' title="Xem" data='${cell.getRow().getData().ViecTimNguoiID}'><i class="fa fa-eye"></i></button>&ensp;
            <button type="button" class='btn btn-xs btn-danger btnBoLuuHS' title="Bỏ lưu" data='${cell.getRow().getData().UngTuyenViecLamID}' ><i class="fas fa-trash-alt"></i></button>
            `;
};
function updateFooter() {
    var el = document.getElementById("row-count");
    if (table != undefined) {
        el.innerHTML = 'Dòng: ' + (table.rowManager.table.footerManager.links[0].page * table.rowManager.table.footerManager.links[0].size - table.rowManager.table.footerManager.links[0].size + 1) + ' - ' + (table.rowManager.table.footerManager.links[0].page * table.rowManager.table.footerManager.links[0].size - table.rowManager.table.footerManager.links[0].size + table.rowManager.displayRowsCount) + ' của ' + table.rowManager.activeRows.length + " - ";
    } else {
        el.innerHTML = 'Dòng: 0 - 0 của 0 - ';
    }
}
$(document).on('click', '.tabulator-page', function () {
    updateFooter();
});
$(document).on('change', '.tabulator-page-size', function () {
    updateFooter();
});
$(document).on('click', '.tabulator-footer', function () {
    updateFooter();
});
function status(cell, formatterParams, onRendered) {
    data = cell.getData().TrangThai;
    return `<div class="badge ${GetColorTrangThai(data)}">${GetTrangThaiTTD(data)}</div>`;
}

var table = new Tabulator("#Grid1", {
    height: 500,
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 150, 200, 500, 1000, true],
    columnHeaderVertAlign: "center",
    columns: [ //Define Table Columns
        { title: "Thao tác", field: 'ThaoTac', hozAlign: "center", formatter: btnThaoTac, width: 80, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Vị trí ứng tuyển", field: "TenCongViec", hozAlign: "left", visible: true, minWidth: 250, headerHozAlign: "center", formatter: "textarea", vertAlign: "middle" },
        { title: "Công ty", field: "TenCongTy", hozAlign: "left", visible: true, width: 350, headerHozAlign: "center", formatter: "textarea", vertAlign: "middle" },
        { title: "Mức lương", field: "MucLuong", hozAlign: "left", visible: true, width: 150, headerHozAlign: "center", formatter: "textarea", vertAlign: "middle"},
        { title: "Ngày nộp hồ sơ", field: "NgayNop", hozAlign: "center", visible: true, minWidth: 150, headerHozAlign: "center", formatter: "textarea", vertAlign: "middle"},
        { title: "Trạng thái", field: "TrangThai", hozAlign: "center", visible: true, width: 200, headerHozAlign: "center", formatter: status, vertAlign: "middle" },
    ],
    footerElement: "<span id='row-count' style='color:#102D4F;font-size: 13px; font-family: Arial, Helvetica, sans-serif;font-weight:100'></span>", //add element element to footer to contain count
    dataFiltered: updateFooter, //call updateFooter function when callback triggered
    dataLoaded: updateFooter, //call updateFooter function when callback triggered
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadGrid1() {
    var GetAll = NTS.getAjax("/UngVien/HoSoUngVienDangUngTuyen/getALLViecLamDangUngTuyen", {}).Result;
    
    if (GetAll.length > 0) {
        table.clearData();
        table.setData(GetAll);
        setTimeout(function () {
            table.redraw(1);
        }, 100)
    } else {
        table.clearData();
        setTimeout(function () {
            table.redraw(1);
        }, 100)
    }
}

$(document).on('keyup', '#timKiemHoSoluuTru', function (e) {
    if (e.keyCode == '13') {
        table.setFilter(matchAny, { value: $(this).val() });
        updateFooter();
    }
});

function XemTinTuyenDung(ID) {
    $('#modal-thongtinvieclam').html('');
    var result = NTS.getAjax('/UngVien/HoSoUngVienDangUngTuyen/GetThongTinViecLamByID', { ID: ID }).Result;
    let data = result[0];
    var encodedURL = encodeURL(data.ViecTimNguoiID);
    $('#modal-thongtinvieclam').append(`<div class="tooltip-custom">
                                            <div class="right tooltip-container">
                                                <div class="view-container">
                                                    <div class="view-content">
                                                        <div class="view-logo">
                                                            <img src="${data.HinhAnhCongTy.replaceAll("*", "").replaceAll("~", "") == "" ? anhDefault : data.HinhAnhCongTy.replaceAll("*", "").replaceAll("~", "")}"/>
                                                        </div>
                                                        <div>
                                                            <h5 style="margin-bottom: 4px;" class="view-tencongty">${data.ViTriTuyenDung}</h5>
                                                            <div style="display: flex; gap: 4px 10px; flex-wrap: wrap;">
                                                                <span class="congviec-info-label"><i class="fa-solid fa-location-dot"></i>&nbsp; <span>${data.TenDiaDiem}</span></span>
                                                                <span class="congviec-info-label"><i class="fa-solid fa-money-bill"></i>&nbsp; <span>${data.MucLuongID}</span></span>
                                                                <span class="congviec-info-label"><i class="fa-solid fa-calendar-days"></i>&nbsp; <span>Hạn nộp: ${data.HanNop}</span></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="view-body">
                                                        <h5>Mô tả công việc</h5>
                                                        <p class="view-gioithieu">${data.MoTaCongViec.replace(/\n/g, "<br>")}</p>
                                                        <br>
                                                        <h5>Yêu cầu ứng viên</h5>
                                                        <p class="view-gioithieu">${data.YeuCauCongViec.replace(/\n/g, "<br>")}</p>
                                                        <br>
                                                        <h5>Quyền lợi</h5>
                                                        <p class="view-gioithieu">${data.CheDoPhucLoi.replace(/\n/g, "<br>")}</p>
                                                        <br>
                                                    </div>
                                                    <div class="view-footer">
                                                        <a href="/xem-chi-tiet-viec-lam.html?p=${encodedURL}" class="btn btn-primary" style="margin-right: 5px;">Xem chi tiết</a>
                                                        <a href="#" class="btn btn-danger"
                                                           data-bs-dismiss="modal">
                                                            <i class="fa fa-close"></i>&nbsp;Đóng
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`);
    $('#modal_xemHSUngVienDangUngTuyen').modal('show');
}

function XoaHoSoUngTuyen(ID) {
    CanhBaoXoa(() => {
        var result = NTS.getAjax('/UngVien/HoSoUngVienDangUngTuyen/XoaHoSoUngVienDangUngTuyen', { ID: ID });
        if (!result.Err) {
            LoadGrid1();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}
function GetTrangThaiTTD(data) {
    if (data == 0) {
        return "Mới tạo";
    } else if (data == 1) {
        return "Đã ứng tuyển/Chờ duyệt";
    } else if (data == 2) {
        return "Đã duyệt";
    } else {
        return "Từ chối";
    }
}

function GetColorTrangThai(data) {
    if (data == 1) {
        return "bg-info";
    } else if (data == 2) {
        return "bg-success";
    } else {
        return "bg-danger";
    }
}