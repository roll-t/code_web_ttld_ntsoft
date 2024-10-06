var ID_Duyet = '';
var ID_TuChoi = '';

$(document).ready(function () {
    setTimeout(function () {
        $('#selHoSoUngTuyen').select2({ widht: 100 });
        LoadGrid1();
    }, 200);
    setTimeout(() => {
        loadComboTimKiem();
    }, 150);
    $(document).on('click', '.btnDuyetHSUngTuyen', function () {
        $('#mdDuyetHSUngTuyen').modal('show');
        $('#NgayDuyet').value('');
        $('#NoiDungDuyet').value('');
        NTS.hienNgayHienTaiLenTextbox('NgayDuyet');
        ID_Duyet = $(this).attr('data');
    });

    $(document).on('click', '#btnLuuVaDongDuyetHSUngTuyen', function () {
        XetDuyet(ID_Duyet);
    });

    ///Từ chối duyệt hồ sơ ứng tuyển
    $(document).on('click', '.btnLoaiHSUngTuyen', function () {
        $('#mdLoaiHSUngTuyen').modal('show');
        $('#NgayLoai').value('');
        $('#NoiDungLoai').value('');
        NTS.hienNgayHienTaiLenTextbox('NgayLoai');
        ID_TuChoi = $(this).attr('data');
    });

    $(document).on('click', '#btnLuuVaDongLoaiHSUngTuyen', function () {
        LoaiHoSoUngTuyen(ID_TuChoi);
    });
    /// Xem hồ sơ ứng tuyển việc làm
    $(document).on('click', '.btnXemHSUngTuyen', function () {
        var ID = $(this).attr('data');
        $('#modal_xemHSUngTuyen').modal('show');
        XemHoSoUngTuyen(ID);
    });
    setTimeout(() => {
        $('#TrangThai_TimKiem_us').select2({ width: '100%' });
    }, 500)
});

function loadComboTimKiem() {
    NTS.loadDataCombo({
        name: '#ViTriCongViec_TimKiem_us',
        ajaxUrl: '/CongThongTinViecLam/Function/getCapBac',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '(--Tất cả--)',
        showTatCa: !0
    });
    //TrinhDoHocVan
    NTS.loadDataCombo({
        name: '#HocVan_TimKiem_us',
        ajaxUrl: '/CongThongTinViecLam/Function/getTrinhDoCMKT',
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '(--Tất cả--)',
        showTatCa: !0
    });
    //TrinhDoHocVan
    NTS.loadDataCombo({
        name: '#KinhNghiem_TimKiem_us',
        ajaxUrl: '/CongThongTinViecLam/Function/getComBoKinhNghiemLV',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '(--Tất cả--)',
        showTatCa: !0
    });
    //TrinhDoHocVan
    NTS.loadDataCombo({
        name: '#MucLuong_TimKiem_us',
        ajaxUrl: '/CongThongTinViecLam/Function/getMucLuongYeuCau',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '(--Tất cả--)',
        showTatCa: !0
    });
}

var btnThaoTac = function (cell, formatterParams, onRendered) { //plain text value
    //console.log(cell.getRow().getData());
    return `<button type='button' class='btn btn-xs btn-success btnXemHSUngTuyen' title="Xem" data='${cell.getRow().getData().UngTuyenViecLamID}'><i class="fa fa-eye"></i></button>&ensp;
            <button class='btn btn-xs btn-primary btnDuyetHSUngTuyen' type="button" data='${cell.getRow().getData().UngTuyenViecLamID}' title="Duyệt" style='margin-right: 5px;display:${cell.getData().TrangThai == '3' ? 'inline-block;' : cell.getData().TrangThai == '2' ? 'none;' : 'inline-block;'}' title="Xác thực"><i class="fa fa-check"></i></button>
            <button class='btn btn-xs btn-danger btnLoaiHSUngTuyen' type="button" data='${cell.getRow().getData().UngTuyenViecLamID}' title="Loại" style='display:${cell.getData().TrangThai == '2' ? 'inline-block;' : cell.getData().TrangThai == '3' ? 'none;' : 'inline-block;'}' title="Từ chối"><i class="fa fa-times"></i></button>
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
    return `<div class="badge " style="${GetColorTrangThai(data)}">${GetTrangThaiDuyet(data)}</div>`;
}

function actionDropdownFormatter(cell, formatterParams, onRendered) {
    var ID = cell.getData().UngTuyenViecLamID;
    var TrangThai = cell.getData().TrangThai;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
            <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
            <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
                    <a  class="dropdown-item btnXemHSUngTuyen  " href="#" data="${ID}" >
                        <i class="fa fa-eye " aria-hidden="true" style="paddding-right:10px; color:#019017"></i>&ensp;  Xem thông tin hồ sơ ứng tuyển
                </a>
                <a  class="dropdown-item btnDuyetHSUngTuyen" href="#" data="${ID}" style="display:${cell.getData().TrangThai == '3' ? 'block;' : cell.getData().TrangThai == '2' ? 'none;' : 'block;'};">
                        <i class="fa-solid fa-paper-plane " aria-hidden="true" style="paddding-right:10px; color:var(--primary-color)"></i>&ensp; Duyệt hồ sơ ứng tuyển
                </a>
                <a  class="dropdown-item btnLoaiHSUngTuyen  " href="#" data="${ID}" style="display:${cell.getData().TrangThai == '2' ? 'block;' : cell.getData().TrangThai == '3' ? 'none;' : 'block;'}">
                        <i class="fa fa-times text-danger" aria-hidden="true"></i>&ensp; Từ chối hồ sơ ứng tuyển
                </a>
            </div>
       </div>`;

    return select;
}

var table = new Tabulator("#Grid1", {
    height: "80vh",
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 150, 200, 500, 1000, -1],
    columnHeaderVertAlign: "center",
    columns: [ //Define Table Columns
        //{ title: "Thao tác", field: 'ThaoTac', hozAlign: "center", formatter: btnThaoTac, minWidth: 100, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        {
            title: '<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
            field: "actions",
            formatter: actionDropdownFormatter, width: 60, headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", headerSort: false
        },
        { title: "Tên ứng viên", field: "TenUngVien", hozAlign: "left", visible: true, minWidth: 250, headerHozAlign: "center", formatter: "textarea" },
        { title: "Vị trí ứng tuyển", field: "ViTriUngTuyen", hozAlign: "left", visible: true, minWidth: 250, headerHozAlign: "center", formatter: "textarea" },
        { title: "Thời gian nộp", field: "NgayUngTuyen", hozAlign: "center", visible: true, minWidth: 120, headerHozAlign: "center", formatter: "textarea" },
        { title: "Kinh nghiệm", field: "KinhNghiemLamViec", hozAlign: "left", visible: true, minWidth: 250, headerHozAlign: "center", formatter: "textarea" },
        //{ title: "Khu vực", field: "KhuVuc", hozAlign: "left", visible: true, minWidth: 250, headerHozAlign: "center", formatter: "textarea" },
        { title: "Ngày sinh", field: "NgaySinh", hozAlign: "center", visible: true, minWidth: 120, headerHozAlign: "center", formatter: "textarea" },
        { title: "Giới tính", field: "GioiTinh", hozAlign: "left", visible: true, minWidth: 120, headerHozAlign: "center", formatter: "textarea" },
        { title: "Điện thoại", field: "DienThoai", hozAlign: "left", visible: true, minWidth: 100, headerHozAlign: "center", formatter: "textarea" },
        { title: "Email", field: "Email", hozAlign: "left", visible: true, minWidth: 250, headerHozAlign: "center", formatter: "textarea" },
        { title: "Công việc mong muốn", field: "CongViecMongMuon", hozAlign: "left", visible: true, minWidth: 250, headerHozAlign: "center", formatter: "textarea" },
        { title: "Mục tiêu công việc", field: "MucTieuCongViec", hozAlign: "left", visible: false, minWidth: 250, headerHozAlign: "center", formatter: "textarea" },
        { title: "Giới thiệu", field: "GioiThieu", hozAlign: "left", visible: false, minWidth: 250, headerHozAlign: "center", formatter: "textarea" },
        { title: "Trạng thái", field: "TrangThai", hozAlign: "center", minWidth: 150, formatter: status, headerHozAlign: "center" },
    ],
    footerElement: "<span id='row-count' style='color:#102D4F;font-size: 13px; font-family: Arial, Helvetica, sans-serif;font-weight:100'></span>", //add element element to footer to contain count
    dataFiltered: updateFooter, //call updateFooter function when callback triggered
    dataLoaded: updateFooter, //call updateFooter function when callback triggered
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadGrid1() {
    var saveData = new Array();
    saveData[0] = $('#TrangThai_TimKiem_us').value();
    saveData[1] = $('#MucLuong_TimKiem_us').value();
    saveData[2] = $('#KinhNghiem_TimKiem_us').value();
    saveData[3] = $('#timKiem').value();
    var GetAll = NTS.getAjax("/NhaTuyenDung/HoSoUngTuyen/GetALLHoSoUngTuyen", { data: saveData }).Result;
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

function btnXuatExcel() {
    var mang = new Array();
    mang[0] = $('#selHoSoUngTuyen').value();
    var data = NTS.getAjax("/NhaTuyenDung/HoSoUngTuyen/XuatExcel", { data: mang });
    if (data != "") {
        window.open(data.split('_')[1]);
    } else {
        NTS.thanhcong("Đã có lỗi xảy ra");
    }
}

function GetColorTrangThai(data) {
    if (data == 1) {
        return " background: #3E9EF7 !important; background - color: #3E9EF7!important;";
    } else if (data == 2) {
        return " background: #66CE9C !important; background - color: #66CE9C!important;";
    } else if (data == 3) {
        return "background: #FF0000 !important;background - color: #FF0000!important;";
    } else {
        return "background: #FF0000 !important;";
    }
}

function GetTrangThaiDuyet(data) {
    if (data == 1) {
        return "Chờ duyệt";
    } else if (data == 2) {
        return "Đã duyệt";
    } else if (data == 3) {
        return "Đã loại";
    }
}

function LocDanhSachHSUngTuyen() {
    LoadGrid1();
    return false;
}

$(document).on('keyup', '#timKiemHoSoUngTuyen', function (e) {
    if (e.keyCode == '13') {
        table.setFilter(matchAny, { value: $(this).val() });
        updateFooter();
    }
});

function LoaiHoSoUngTuyen(ID) {
    const validate = new NTSValidate('#mdLoaiHSUngTuyen');
    if (!validate.trim().check()) {
        return false;
    }
    var mang = new Array();
    mang[0] = ID;
    mang[1] = $('#NgayLoai').value();
    mang[2] = $('#NoiDungLoai').value();
    var result = NTS.getAjax('/NhaTuyenDung/HoSoUngTuyen/LoaiHoSoUngTuyen', { data: mang });
    if (!result.Err) {
        NTS.thanhcong(result.Msg);
        //NTS.getAjax('json', '/View/CongThongTin/Function.aspx/LuuThongBao', { TenBang: 'UngTuyenViecLam', Cotpk: result.split('_')[3], GhiChu: 'Hồ sơ ứng tuyển của bạn đã bị loại!', UserID: result.split('_')[2] });
        LoadGrid1();
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    
    $('#mdLoaiHSUngTuyen').modal('hide');
}


function XetDuyet(ID) {
    const validate = new NTSValidate('#mdDuyetHSUngTuyen');
    if (!validate.trim().check()) {
        return false;
    }
    var mang = new Array();
    mang[0] = ID;
    mang[1] = $('#NgayDuyet').value();
    mang[2] = $('#NoiDungDuyet').value();
    var result = NTS.getAjax('/NhaTuyenDung/HoSoUngTuyen/DuyetHoSoUngTuyen', { data: mang });

    if (!result.Err) {
        NTS.thanhcong(result.Msg);
        //NTS.getAjax('json', '/View/CongThongTin/Function.aspx/LuuThongBao', { TenBang: 'UngTuyenViecLam', Cotpk: result.split('_')[3], GhiChu: 'Hồ sơ ứng tuyển của bạn đã được duyệt!', UserID: result.split('_')[2] });
        LoadGrid1();
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    $('#mdDuyetHSUngTuyen').modal('hide');

}

async function XemHoSoUngTuyen(ID) {
    var data = await NTS.getAjaxAsync('/NhaTuyenDung/HoSoUngTuyen/XemHoSoUngTuyen', { ID: ID });
    var result = data.Result;
    $('#TenUngVien').html(result[0].TenUngVien);
    $('#ViTriUngTuyen').html(result[0].ViTriUngTuyen);
    $('#KhuVuc').html(result[0].KhuVuc);
    $('#ThoiGianNop').html(result[0].NgayUngTuyen);
    $('#NgaySinh').html(result[0].NgaySinh);
    $('#GioiTinh').html(result[0].GioiTinh);
    $('#Email').html(result[0].Email);
    $('#DienThoai').html(result[0].DienThoai);
    $('#GioiThieu').html("<b>Giới thiệu bản thân: </b>" + result[0].GioiThieu.replace(/\n/g, '<br>'));
    $('#CongViecMongMuon').html("<b>Công việc mong muốn: </b>" + result[0].CongViecMongMuon.replace(/\n/g, '<br>'));
    $('#MucTieu').html("<b>Mục tiêu công việc: </b>" + result[0].MucTieuCongViec.replace(/\n/g, '<br>'));
    $('#DiaChi').html(result[0].DiaChi);
    $('#DiaDiemLamViec').html(result[0].TenDiaDiem);
    $('#TenNganhNghe').html(result[0].TenNganhNghe);


    if (result[0].TrangThai == '1') {
        $('#TrangThai').html('Chờ duyệt');
    } else if (result[0].TrangThai == '2') {
        $('#TrangThai').html('Đã duyệt');
    } else {
        $('#TrangThai').html('Đã loại');
    }
}

///////// PHÍM TẮT /////////
var hotKey = 1; // 1 thêm
$(document).on('keydown', function (e) {
    console.log(e.keyCode);
    switch (e.keyCode) {
        case 114:
            if (hotKey == 0)
                $('.nav-search-input').focus();
            e.preventDefault();
            break;
        case 115:
            if (hotKey == 1) {
                if ($('#mdDuyetHSUngTuyen').hasClass('in')) {
                    $('#mdDuyetHSUngTuyen').modal('hide');
                    e.preventDefault();
                    break;
                } else if ($('#mdLoaiHSUngTuyen').hasClass('in')) {
                    $('#mdLoaiHSUngTuyen').modal('hide');
                    e.preventDefault();
                    break;
                }
            }
        case 120:
            if (hotKey == 1) {
                if ($('#mdDuyetHSUngTuyen').hasClass('in')) {
                    $('#btnLuuVaDongDuyetHSUngTuyen').trigger('click');
                    e.preventDefault();
                    break;
                } else if ($('#mdLoaiHSUngTuyen').hasClass('in')) {
                    $('#btnLuuVaDongLoaiHSUngTuyen').trigger('click');
                    e.preventDefault();
                    break;
                }
            }
    }
});

//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiemNangCao', function () {
    if ($('#KhungTimKiem').css('display') == "block") {
        $('#KhungTimKiem').slideUp(200);
    } else {
        $('#KhungTimKiem').slideDown(200);
    }
    return false;
});
$(document).on('click', '#DongTimKiem', function () {
    $('#KhungTimKiem').slideUp(200);
    return false;
});

//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiem', async function () {
    await LoadGrid1();
    $('#KhungTimKiem').slideUp(200);
    return false;

});

$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        table.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    table.setFilter(matchAny, { value: $('#timKiem').val() });
});

$('#btnXuatExcel').on('click', async function () {
    var saveData = new Array();
    saveData[0] = $('#TrangThai_TimKiem_us').value();
    saveData[1] = $('#MucLuong_TimKiem_us').value();
    saveData[2] = $('#KinhNghiem_TimKiem_us').value();
    saveData[3] = $('#timKiem').value();
    var kq = await NTS.getAjaxAsync('/NhaTuyenDung/HoSoUngTuyen/XuatExcel_DSHoSoUngTuyen', { data: saveData });
    if (!kq.Err) {
        window.open(kq);
    } else {
        NTS.loi(kq.Msg);
    }
});