var DonViID = '';
$(function () {
    LoadTable2(DonViID);
    LoadDataTable();
    NTS.loadDataCombo({
        name: '#ChonDonVi',
        ajaxUrl: '/HeThong/NhatKyDangNhap/LoadDonVi',
        columns: 2,
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textShowTatCa: '(Tất cả)',
        showTatCa: !0
    });
});
$(document).on('change', '#ChonDonVi', function () {
    table.clearData();
    var GetDonVi = NTS.getAjax("/HeThong/NhatKyDangNhap/GetDonVi", { ID: $('#ChonDonVi').value() });
    if (GetDonVi.Err == false) {
        table.setData(GetDonVi.Result);
        table2.clearData();
    }
    else {
        NTS.loi(GetDonVi.Msg);
    }
});
var table = new Tabulator("#GridDanhSachNguoiDung", {
    height: 460,
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 150, 200, 500, 1000, true],
    columns: [
        { title: "DonViID", field: "DonViID", hozAlign: "left", formatter: "textarea", visible: false, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Tên đăng nhập", field: "TenDangNhap", hozAlign: "left", formatter: "textarea", width: 150, headerHozAlign: "center", vertAlign: "middle"},
        { title: "Tên đơn vị", field: "TenDonVi", hozAlign: "left", formatter: "textarea", headerHozAlign: "center", vertAlign: "middle"},
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

table.on("rowClick", function (e, row) {
    LoadTable2(row.getData().DonViID)
});
$(document).on('keyup', '#timKiemDanhSachNguoiDung', function (e) {
    if (e.keyCode == '13') {
        table.setFilter(matchAny, { value: $(this).val() });
    }
});
function updateFooterGrid1() {
    var el = document.getElementById("row-countg1");
    if (table != undefined) {
        var Grid = table;
        if (Grid.rowManager.activeRows.length > 0) {
            el.innerHTML = 'Dòng: ' + (Grid.rowManager.table.footerManager.links[0].page * Grid.rowManager.table.footerManager.links[0].size - Grid.rowManager.table.footerManager.links[0].size + 1) + ' - ' + (Grid.rowManager.table.footerManager.links[0].page * Grid.rowManager.table.footerManager.links[0].size - Grid.rowManager.table.footerManager.links[0].size + Grid.rowManager.displayRowsCount) + ' của ' + Grid.rowManager.activeRows.length + " - ";
        }
        else {
            el.innerHTML = 'Dòng: 0 - 0 của 0 - ';
        }
    }
}
$(document).on('click', '.tabulator-page', function () {
    updateFooterGrid1();
});
$(document).on('change', '.tabulator-page-size', function () {
    updateFooterGrid1();
});
$(document).on('click', '.tabulator-footer', function () {
    updateFooterGrid1();
});

function LoadDataTable() {
    table.clearData();
    const GetAll = NTS.getAjax("/HeThong/NhatKyDangNhap/GetAllDanhSachNguoiDung", {});
    if (!GetAll.Err) {
        table.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

// select row onchange data table2
var selectData = table.getSelectedData(); 

var table2 = new Tabulator("#GridNhatKySuDung", {
    height: 460,
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 150, 200, 500, 1000, true],
    columns: [
        { title: "Ngày đăng nhập", field: "NgayDangNhap", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", width: 310, vertAlign: "middle" },
        { title: "Tên máy", field: "TenMayTinh", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle" },
    ],
    rowDblClick: function (e, row) {
        
    },
    footerElement: "<span id='row-countg2' style='color:#102D4F;font-size: 13px; font-family: Arial, Helvetica, sans-serif;font-weight:100'></span>", //add element element to footer to contain count
    dataFiltered: updateFooterGrid2, //call updateFooter function when callback triggered
    dataLoaded: updateFooterGrid2, //call updateFooter function when callback triggered
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function updateFooterGrid2() {
    var el = document.getElementById("row-countg2");
    if (table2 != undefined) {
        var Grid = table2;
        if (Grid.rowManager.activeRows.length > 0) {
            el.innerHTML = 'Dòng: ' + (Grid.rowManager.table.footerManager.links[0].page * Grid.rowManager.table.footerManager.links[0].size - Grid.rowManager.table.footerManager.links[0].size + 1) + ' - ' + (Grid.rowManager.table.footerManager.links[0].page * Grid.rowManager.table.footerManager.links[0].size - Grid.rowManager.table.footerManager.links[0].size + Grid.rowManager.displayRowsCount) + ' của ' + Grid.rowManager.activeRows.length + " - ";
        }
        else {
            el.innerHTML = 'Dòng: 0 - 0 của 0 - ';
        }
    }
}
$(document).on('click', '.tabulator-page', function () {
    updateFooterGrid2();
});
$(document).on('change', '.tabulator-page-size', function () {
    updateFooterGrid2();
});
$(document).on('click', '.tabulator-footer', function () {
    updateFooterGrid2();
});
function LoadTable2(DonViID) {
    table2.clearData();
    setTimeout(async function () {
        
        var GetAllNhatKySuDung = NTS.getAjax("/HeThong/NhatKyDangNhap/GetAllNhatKySuDung", { DonViID: DonViID });
        if (GetAllNhatKySuDung.Err == false) {
            table2.setData(GetAllNhatKySuDung.Result);
        }
        else {
            NTS.loi(GetAllNhatKySuDung.Msg);
        }
    }, 150)
    
}

$(document).on('keyup', '#timKiemNhatKySuDung', function (e) {
    if (e.keyCode == '13') {
        table2.setFilter(matchAny, { value: $(this).val() });
        updateFooterGrid1();
    }
});
