$(function () {
    setTimeout(() => {
        loadComboTimKiem();
    },100);
});
$(document).ready(function () {

    setTimeout(() => {
        LoadGrid1();
    }, 150);
    $(document).on('click', '.btnXemHSLuuTru', function () {
        $('#modal_xemHSLuuTru').modal('show');
        var ID = $(this).attr('data');
        XemHoSoLuuTru(ID);
    });

    $(document).on('click', '.btnBoLuuHS', function () {
        var ID = $(this).attr('data');
        XoaHoSoLuuTru(ID);
    });
});


function loadComboTimKiem() {
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
var btnThaoTac = function (cell, formatterParams, onRendered) {
    return `<button type='button' class='btn btn-xs btn-success btnXemHSLuuTru' title="Xem" data='${cell.getRow().getData().UngVienDaLuuID}'><i class="fa fa-eye"></i></button>&ensp;
            <button type="button" class='btn btn-xs btn-danger btnBoLuuHS' title="Bỏ lưu" data='${cell.getRow().getData().UngVienDaLuuID}' ><i class="fas fa-trash-alt"></i></button>
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

function actionDropdownFormatter(cell, formatterParams, onRendered) {
    var ID = cell.getData().UngVienDaLuuID;
    var TrangThai = cell.getData().TrangThai;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
       <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
       <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
            <a  class="dropdown-item btnXemHSLuuTru  " href="#" data="${ID}">
                 <i class="fa fa-eye " aria-hidden="true" style="paddding-right:10px; color:#019017"></i>&ensp;  Xem thông tin ứng viên
           </a>
            <a  class="dropdown-item btnBoLuuHS" href="#" data="${ID}">
                <i class='fa fa-trash-o  text-danger'></i>&ensp;  Xóa theo dõi ứng viên
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
    paginationSizeSelector: [50, 150, 200, 500, 1000, true],
    columnHeaderVertAlign: "center",
    columns: [ //Define Table Columns
        /*  { title: "Thao tác", field: 'ThaoTac', hozAlign: "center", formatter: btnThaoTac, width: 80, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },*/
        {
            title: '<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
            field: "actions",
            formatter: actionDropdownFormatter, width: 60, headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", headerSort: false
        },
        { title: "Tên ứng viên", field: "TenUngVien", hozAlign: "left", visible: true, width: 250, headerHozAlign: "center", formatter: "textarea", vertAlign: "middle" },
        { title: "Vị trí ứng tuyển", field: "ViTriUngTuyen", hozAlign: "left", visible: true, width: 250, headerHozAlign: "center", formatter: "textarea", vertAlign: "middle" },
        { title: "Mức lương mong muốn", field: "MucLuong", hozAlign: "left", visible: true, width: 250, headerHozAlign: "center", formatter: "textarea", vertAlign: "middle" },
        { title: "Địa chỉ", field: "DiaChi", hozAlign: "left", visible: true, minWidth: 250, headerHozAlign: "center", formatter: "textarea", vertAlign: "middle"},
        { title: "Ngày lưu", field: "NgayUngTuyen", hozAlign: "center", visible: true, width: 120, headerHozAlign: "center", formatter: "textarea", vertAlign: "middle"},
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
    saveData[0] = $('#MucLuong_TimKiem_us').value();
    saveData[1] = $('#KinhNghiem_TimKiem_us').value();
    saveData[2] = $('#HocVan_TimKiem_us').value();
    saveData[3] = $('#timKiem').value();
    table.clearData();
    var GetAll = NTS.getAjax("/NhaTuyenDung/HoSoLuuTru/getALLHoSoLuuTru", { data: saveData}).Result;
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

function XemHoSoLuuTru(ID) {
    var result = NTS.getAjax('/NhaTuyenDung/HoSoLuuTru/getHoSoLuuTruTheoID', { ID: ID }).Result;
    $('#TenUngVien').html(result[0].TenUngVien);
    $('#ViTriUngTuyen').html(result[0].ViTriUngTuyen);
    $('#HinhThucLamViec').html(result[0].HinhThucLamViec);
    $('#NgaySinh').html(result[0].NgaySinh);
    $('#GioiTinh').html(result[0].GioiTinh);
    $('#Email').html(result[0].Email);
    $('#DienThoai').html(result[0].DienThoai);
    $('#GioiThieu').html(result[0].GioiThieu);
    $('#CongViecMongMuon').html(result[0].CongViecMongMuon);
    $('#MucTieu').html(result[0].MucTieuCongViec);
    $('#DiaChi').html(result[0].DiaChi);
    $('#DiaDiemLamViec').html(result[0].TenDiaDiem);
    $('#TenNganhNghe').html(result[0].TenNganhNghe);
    $('#MucLuong').html(result[0].MucLuong);
}

function XoaHoSoLuuTru(ID) {
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/NhaTuyenDung/HoSoLuuTru/XoaHoSoLuuTru', { ID: ID});
        if (!result.Err) {
            LoadGrid1();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}

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

TimKiem//XỬ LÝ TÌM KIẾM NÂNG CAO
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
    saveData[0] = $('#MucLuong_TimKiem_us').value();
    saveData[1] = $('#KinhNghiem_TimKiem_us').value();
    saveData[2] = $('#HocVan_TimKiem_us').value();
    saveData[3] = $('#timKiem').value();
    var kq = await NTS.getAjaxAsync('/NhaTuyenDung/HoSoLuuTru/XuatExcel_DSHoSoLuuTru', { data: saveData });
    if (!kq.Err) {
        window.open(kq);
    } else {
        NTS.loi(kq.Msg);
    }
});