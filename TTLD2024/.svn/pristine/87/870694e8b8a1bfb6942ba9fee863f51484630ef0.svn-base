var tempthem = "them";
var tempthemCauHinh = "them";
var buocStep = "";
var LoaiCauHinh = "";
var rowSelect = [];
$(function () {
    TruocKhiThem();
   
});
$(document).ready(function () {
    $('#LoaiCTID').val('');
    $('#CanhLe').select2({ width: '100%' });
    $('#KieuDuLieu').select2({ width: '100%' });
   
    LoadGrid();
    
    $(document).on('click', '.btnSuaGrid1', function () {
        if (!ntspermiss.sua) {
            NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác chỉnh sửa. Vui lòng kiểm tra lại!");
            return false;
        }
        $('#LoaiCTID').val($(this).attr('data'));

        SuaDuLieu($(this).attr('data'));
    });
    $(document).on('click', '.btnXoaGrid1', function () {
        if (!ntspermiss.xoa) {
            NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác xóa. Vui lòng kiểm tra lại!");
            return false;
        }
        var ID = $(this).attr('data');
        XoaDuLieu(ID);
    });

    //btnthaotac grid cau hinh
    $(document).on('click', '.btnSuaGridCauHinh', function () {
        if (!ntspermiss.sua) {
            NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác chỉnh sửa. Vui lòng kiểm tra lại!");
            return false;
        }
        $('#LoaiCT_CauHinhID').val($(this).attr('data'));
        SuaDuLieu_CauHinh($(this).attr('data'));
    });
    $(document).on('click', '.btnXoaGridCauHinh', function () {
        if (!ntspermiss.xoa) {
            NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác xóa. Vui lòng kiểm tra lại!");
            return false;
        }
        var ID = $(this).attr('data');
        XoaDuLieu_CauHinh(ID);
    });
});
var btnThaoTac = function (cell, formatterParams, onRendered) { //plain text value
    return `<button class='btn btn-xs btn-primary btnSuaGrid1' title="Sửa" title="Sửa" data='${cell.getRow().getData().LoaiCTID}' ><i class='fa fa-pencil'></i></button>
            <button class='btn btn-xs btn-danger btnXoaGrid1' title="Xoá" data='${cell.getRow().getData().LoaiCTID}'><i class='fa fa-trash'></i></button>
            <button type="button" class="btn btn-xs btn-warning" onclick="SaoChep('${cell.getRow().getData().LoaiCTID}')"><i class="fa fa-copy"></i></button>`;
};
var btnThaoTacCauHinh = function (cell, formatterParams, onRendered) { //plain text value
    return `<button class='btn btn-xs btn-primary btnSuaGridCauHinh' title="Sửa" title="Sửa" data='${cell.getRow().getData().LoaiCT_CauHinhID}' ><i class='fa fa-pencil'></i></button>&ensp;<button class='btn btn-xs btn-danger btnXoaGridCauHinh' title="Xoá" data='${cell.getRow().getData().LoaiCT_CauHinhID}'><i class='fa fa-trash'></i></button>`;
};
function updateFooter() {
    var el = document.getElementById("row-count");
    if (table != undefined) {
        if (table.rowManager.activeRows.length > 0) {
            el.innerHTML = 'Dòng: ' + (table.rowManager.table.footerManager.links[0].page * table.rowManager.table.footerManager.links[0].size - table.rowManager.table.footerManager.links[0].size + 1) + ' - ' + (table.rowManager.table.footerManager.links[0].page * table.rowManager.table.footerManager.links[0].size - table.rowManager.table.footerManager.links[0].size + table.rowManager.displayRowsCount) + ' của ' + table.rowManager.activeRows.length + " - ";
        }
        else {
            el.innerHTML = 'Dòng: 0 - 0 của 0 - ';
        }
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
var table = new Tabulator("#Grid1", {
    height: 500,
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        { title: "Thao tác", hozAlign: "center", formatter: btnThaoTac, width: 90, headerSort: false },
        { title: "Mã", field: "LoaiCTCode", formatter: 'textarea', hozAlign: "left", visible: true, width: 200 },
        { title: "Tên loại chứng từ", field: "TenLoaiCT", formatter: 'textarea', hozAlign: "left", width: 350 },
        { title: "TK nợ", field: "TaiKhoanID_No", formatter: 'textarea', hozAlign: "left", width: 90 },
        { title: "TK có", field: "TaiKhoanID_Co", hozAlign: "left", formatter: "textarea", width: 90 },
        { title: "Diễn giải", field: "DienGiai", hozAlign: "left", formatter: "textarea", minWidth: 200  },
        {
            title: "Ngưng SD", field: "NgungSD", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },

    ],
    footerElement: "<span id='row-count' style='color:#102D4F;font-size: 13px; font-family: Arial, Helvetica, sans-serif;font-weight:100'></span>", //add element element to footer to contain count
    dataFiltered: updateFooter, //call updateFooter function when callback triggered
    dataLoaded: updateFooter, //call updateFooter function when callback triggered
    rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
        $('#LoaiCTID').val(row.getData().LoaiCTID);
        SuaDuLieu(row.getData().LoaiCTID);
    },
    rowClick: function (e, row) {
        rowSelect = row._row.data;
    },
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
var Grid2 = new Tabulator("#Grid2", {
    height: 350,
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        { title: "Thao tác", hozAlign: "center", formatter: btnThaoTacCauHinh, width: 60, headerSort: false },
        { title: "Sắp xếp", field: "STT", formatter: 'textarea', hozAlign: "left", visible: true, width: 80 },
        { title: "Tên cột", field: "TenCot", formatter: 'textarea', hozAlign: "left", width: 200 },
        { title: "Mô tả", field: "MoTa", formatter: 'textarea', hozAlign: "left", width: 200 },
        { title: "Kiểu dữ liệu", field: "KieuDuLieu", hozAlign: "left", formatter: "textarea", width: 120 },
        { title: "Độ rộng", field: "ChieuDaiCot", hozAlign: "left", formatter: "textarea", width: 100 },
        {
            title: "Khoá vị trí", field: "KhoaViTri", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
        {
            title: "Hiển thị cột", field: "HienThi", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
        {
            title: "Tìm kiếm", field: "TimKiem", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },


    ],
    rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
        $('#LoaiCT_CauHinhID').val(row.getData().LoaiCT_CauHinhID);
        SuaDuLieu_CauHinh(row.getData().LoaiCT_CauHinhID);
    },
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
var Grid3 = new Tabulator("#Grid3", {
    height: 350,
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        { title: "Thao tác", hozAlign: "center", formatter: btnThaoTacCauHinh, width: 60, headerSort: false },
        { title: "Sắp xếp", field: "STT", formatter: 'textarea', hozAlign: "left", visible: true, width: 80 },
        { title: "Tên cột", field: "TenCot", formatter: 'textarea', hozAlign: "left", width: 200 },
        { title: "Mô tả", field: "MoTa", formatter: 'textarea', hozAlign: "left", width: 200 },
        { title: "Kiểu dữ liệu", field: "KieuDuLieu", hozAlign: "left", formatter: "textarea", width: 120 },
        { title: "Độ rộng", field: "ChieuDaiCot", hozAlign: "left", formatter: "textarea", width: 100 },
        {
            title: "Khoá vị trí", field: "KhoaViTri", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
        {
            title: "Hiển thị cột", field: "HienThi", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
        {
            title: "Tìm kiếm", field: "TimKiem", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
    ],
    rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
        $('#LoaiCT_CauHinhID').val(row.getData().LoaiCT_CauHinhID);
        SuaDuLieu_CauHinh(row.getData().LoaiCT_CauHinhID);
    },
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
var Grid4 = new Tabulator("#Grid4", {
    height: 350,
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        { title: "Thao tác", hozAlign: "center", formatter: btnThaoTacCauHinh, width: 60, headerSort: false },
        { title: "Sắp xếp", field: "STT", formatter: 'textarea', hozAlign: "left", visible: true, width: 80 },
        { title: "Tên cột", field: "TenCot", formatter: 'textarea', hozAlign: "left", width: 200 },
        { title: "Mô tả", field: "MoTa", formatter: 'textarea', hozAlign: "left", width: 200 },
        { title: "Kiểu dữ liệu", field: "KieuDuLieu", hozAlign: "left", formatter: "textarea", width: 120 },
        { title: "Độ rộng", field: "ChieuDaiCot", hozAlign: "left", formatter: "textarea", width: 100 },
        {
            title: "Khoá vị trí", field: "KhoaViTri", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
        {
            title: "Hiển thị cột", field: "HienThi", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
        {
            title: "Tìm kiếm", field: "TimKiem", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
    ],
    rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
        $('#LoaiCT_CauHinhID').val(row.getData().LoaiCT_CauHinhID);
        SuaDuLieu_CauHinh(row.getData().LoaiCT_CauHinhID);
    },
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
var Grid5 = new Tabulator("#Grid5", {
    height: 350,
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        { title: "Thao tác", hozAlign: "center", formatter: btnThaoTacCauHinh, width: 60, headerSort: false },
        { title: "Sắp xếp", field: "STT", formatter: 'textarea', hozAlign: "left", visible: true, width: 80 },
        { title: "Tên cột", field: "TenCot", formatter: 'textarea', hozAlign: "left", width: 200 },
        { title: "Mô tả", field: "MoTa", formatter: 'textarea', hozAlign: "left", width: 200 },
        { title: "Kiểu dữ liệu", field: "KieuDuLieu", hozAlign: "left", formatter: "textarea", width: 120 },
        { title: "Độ rộng", field: "ChieuDaiCot", hozAlign: "left", formatter: "textarea", width: 100 },
        {
            title: "Khoá vị trí", field: "KhoaViTri", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
        {
            title: "Hiển thị cột", field: "HienThi", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
        {
            title: "Tìm kiếm", field: "TimKiem", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
    ],
    rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
        $('#LoaiCT_CauHinhID').val(row.getData().LoaiCT_CauHinhID);
        SuaDuLieu_CauHinh(row.getData().LoaiCT_CauHinhID);
    },
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
var Grid6 = new Tabulator("#Grid6", {
    height: 350,
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        { title: "Thao tác", hozAlign: "center", formatter: btnThaoTacCauHinh, width: 60, headerSort: false },
        { title: "Sắp xếp", field: "STT", formatter: 'textarea', hozAlign: "left", visible: true, width: 80 },
        { title: "Tên cột", field: "TenCot", formatter: 'textarea', hozAlign: "left", width: 200 },
        { title: "Mô tả", field: "MoTa", formatter: 'textarea', hozAlign: "left", width: 200 },
        { title: "Kiểu dữ liệu", field: "KieuDuLieu", hozAlign: "left", formatter: "textarea", width: 120 },
        { title: "Độ rộng", field: "ChieuDaiCot", hozAlign: "left", formatter: "textarea", width: 100 },
        {
            title: "Khoá vị trí", field: "KhoaViTri", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
        {
            title: "Hiển thị cột", field: "HienThi", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
        {
            title: "Tìm kiếm", field: "TimKiem", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
    ],
    rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
        $('#LoaiCT_CauHinhID').val(row.getData().LoaiCT_CauHinhID);
        SuaDuLieu_CauHinh(row.getData().LoaiCT_CauHinhID);
    },
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
var Grid7 = new Tabulator("#Grid7", {
    height: 350,
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        { title: "Thao tác", hozAlign: "center", formatter: btnThaoTacCauHinh, width: 60, headerSort: false },
        { title: "Sắp xếp", field: "STT", formatter: 'textarea', hozAlign: "left", visible: true, width: 80 },
        { title: "Tên cột", field: "TenCot", formatter: 'textarea', hozAlign: "left", width: 200 },
        { title: "Mô tả", field: "MoTa", formatter: 'textarea', hozAlign: "left", width: 200 },
        { title: "Kiểu dữ liệu", field: "KieuDuLieu", hozAlign: "left", formatter: "textarea", width: 120 },
        { title: "Độ rộng", field: "ChieuDaiCot", hozAlign: "left", formatter: "textarea", width: 100 },
        {
            title: "Khoá vị trí", field: "KhoaViTri", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
        {
            title: "Hiển thị cột", field: "HienThi", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
        {
            title: "Tìm kiếm", field: "TimKiem", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
    ],
    rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
        $('#LoaiCT_CauHinhID').val(row.getData().LoaiCT_CauHinhID);
        SuaDuLieu_CauHinh(row.getData().LoaiCT_CauHinhID);
    },
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
var Grid8 = new Tabulator("#Grid8", {
    height: 350,
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        { title: "Thao tác", hozAlign: "center", formatter: btnThaoTacCauHinh, width: 60, headerSort: false },
        { title: "Sắp xếp", field: "STT", formatter: 'textarea', hozAlign: "left", visible: true, width: 80 },
        { title: "Tên cột", field: "TenCot", formatter: 'textarea', hozAlign: "left", width: 200 },
        { title: "Mô tả", field: "MoTa", formatter: 'textarea', hozAlign: "left", width: 200 },
        { title: "Kiểu dữ liệu", field: "KieuDuLieu", hozAlign: "left", formatter: "textarea", width: 120 },
        { title: "Độ rộng", field: "ChieuDaiCot", hozAlign: "left", formatter: "textarea", width: 100 },
        {
            title: "Khoá vị trí", field: "KhoaViTri", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
        {
            title: "Hiển thị cột", field: "HienThi", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
        {
            title: "Tìm kiếm", field: "TimKiem", hozAlign: "center", formatter: (cell) => {
                const value = cell.getValue();
                if (value)
                    return `<input type="checkbox" checked disabled='disabled' />`;
                else
                    return `<input type="checkbox" disabled='disabled' />`;
            }, width: 110, headerSort: false
        },
    ],
    rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
        $('#LoaiCT_CauHinhID').val(row.getData().LoaiCT_CauHinhID);
        SuaDuLieu_CauHinh(row.getData().LoaiCT_CauHinhID);
    },
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        table.setFilter([[{ field: "LoaiCTCode", type: "like", value: $(this).val() },
        { field: "TenLoaiCT", type: "like", value: $(this).val() },
        { field: "TaiKhoanID_Co", type: "like", value: $(this).val() },
        { field: "TaiKhoanID_No", type: "like", value: $(this).val() },
        { field: "DienGiai", type: "like", value: $(this).val() },
        ]]);
        updateFooter();
    }
});
$(document).on('keyup', '#TimKiemGrid2', function (e) {
    if (e.keyCode == '13') {
        Grid2.setFilter([[{ field: "STT", type: "like", value: $(this).val() },
        { field: "TenCot", type: "like", value: $(this).val() },
        { field: "MoTa", type: "like", value: $(this).val() },
        { field: "KieuDuLieu", type: "like", value: $(this).val() },
        ]]);
    }
});
$(document).on('keyup', '#TimKiemGrid3', function (e) {
    if (e.keyCode == '13') {
        Grid3.setFilter([[{ field: "STT", type: "like", value: $(this).val() },
        { field: "TenCot", type: "like", value: $(this).val() },
        { field: "MoTa", type: "like", value: $(this).val() },
        { field: "KieuDuLieu", type: "like", value: $(this).val() },
        ]]);
    }
});
$(document).on('keyup', '#TimKiemGrid4', function (e) {
    if (e.keyCode == '13') {
        Grid4.setFilter([[{ field: "STT", type: "like", value: $(this).val() },
        { field: "TenCot", type: "like", value: $(this).val() },
        { field: "MoTa", type: "like", value: $(this).val() },
        { field: "KieuDuLieu", type: "like", value: $(this).val() },
        ]]);
    }
});
$(document).on('keyup', '#TimKiemGrid5', function (e) {
    if (e.keyCode == '13') {
        Grid5.setFilter([[{ field: "STT", type: "like", value: $(this).val() },
        { field: "TenCot", type: "like", value: $(this).val() },
        { field: "MoTa", type: "like", value: $(this).val() },
        { field: "KieuDuLieu", type: "like", value: $(this).val() },
        ]]);
    }
});
$(document).on('keyup', '#TimKiemGrid6', function (e) {
    if (e.keyCode == '13') {
        Grid6.setFilter([[{ field: "STT", type: "like", value: $(this).val() },
        { field: "TenCot", type: "like", value: $(this).val() },
        { field: "MoTa", type: "like", value: $(this).val() },
        { field: "KieuDuLieu", type: "like", value: $(this).val() },
        ]]);
    }
});
$(document).on('keyup', '#TimKiemGrid7', function (e) {
    if (e.keyCode == '13') {
        Grid7.setFilter([[{ field: "STT", type: "like", value: $(this).val() },
        { field: "TenCot", type: "like", value: $(this).val() },
        { field: "MoTa", type: "like", value: $(this).val() },
        { field: "KieuDuLieu", type: "like", value: $(this).val() },
        ]]);
    }
});
$(document).on('keyup', '#TimKiemGrid8', function (e) {
    if (e.keyCode == '13') {
        Grid8.setFilter([[{ field: "STT", type: "like", value: $(this).val() },
        { field: "TenCot", type: "like", value: $(this).val() },
        { field: "MoTa", type: "like", value: $(this).val() },
        { field: "KieuDuLieu", type: "like", value: $(this).val() },
        ]]);
    }
});
function LuuThongTinLoaiChungTu(e) {
    if (isEmty($('#LoaiCTCode').value())) {
        NTS.canhbao('Mã không được để trống!');
        $('#LoaiCTCode').focus();
        return false;
    }
    if (isEmty($('#TenLoaiCT').value())) {
        NTS.canhbao('Tên loại chứng từ không được để trống!');
        $('#TenLoaiCT').focus();
        return false;
    }
    // Lưu thông tin bước 1
    var saveData = new Array();
    saveData[0] = $('#LoaiCTID').value();
    saveData[1] = $('#LoaiCTCode').value();
    saveData[2] = $('#TenLoaiCT').value();
    saveData[3] = $('#TaiKhoanID_No').value();
    saveData[4] = $('#TaiKhoanID_Co').value();
    saveData[5] = $('#KyHieuCT').value();
    saveData[6] = $('#URL').value();
    saveData[7] = $('#DienGiai').value();
    saveData[8] = $('#NgungSD').value();
    saveData[9] = $('#MauSoCT').value();
    saveData[10] = $('#SoKyTu').value();
    saveData[11] = $('#KyHieuPhiaTruoc').value();
    saveData[12] = $('#KyHieuPhiaSau').value();
    saveData[13] = $('#TuTang').value();
    saveData[14] = $('#TangTheoThang').value();
    saveData[15] = $('#HienKyHieu').value();
    saveData[16] = $('#HienDauGach').value();
    saveData[17] = $('#TaiKhoanID_DTCo').value();
    saveData[18] = $('#TaiKhoanID_DTNo').value();

    var result = NTS.getAjax('/HeThong/LoaiCT/LuuThongTinLoaiChungTu', { data: saveData, thaoTacThem: tempthem });
    if (result.split('_')[0] == "1") {
        tempthem = "sua";
        $('#thongke').trigger('click');
        NTS.thanhcong(result.split('_')[1]);
        $('#LoaiCTID').value(result.split('_')[2]);
        return false;
    } else
        if (result.split('_')[0] == "2") {
            NTS.canhbao(result.split('_')[1]);
            e.preventDefault();
            return false;
        }
        else {
            NTS.loi('Thêm thông tin không thành công!');
            e.preventDefault();
            return false;
        }
}

function LuuThongTinCauHinh(e) {
    if (isEmty($('#TenCot').value())) {
        NTS.canhbao('Tên cột không được để trống!');
        $('#TenCot').focus();
        return false;
    }
    var saveData = new Array();
    saveData[0] = $("#LoaiCT_CauHinhID").value();
    saveData[1] = $("#STT").value();
    saveData[2] = $("#TenCot").value();
    saveData[3] = $("#MoTa").value();
    saveData[4] = $('#TuDong').value() == true ? '' : $("#ChieuDaiCot").value();
    saveData[5] = $("#KieuDuLieu").value();
    saveData[6] = $("#KhoaViTri").value();
    saveData[7] = $("#HienThi").value();
    saveData[8] = $("#TimKiem").value();
    saveData[9] = $("#CanhLe").value();
    saveData[10] = $('#LoaiCauHinh').value();
    saveData[11] = $("#LoaiCTID").value();
    var result = NTS.getAjax('/HeThong/LoaiCT/LuuThongTin_CauHinh', { data: saveData, ThaoTacThem: tempthemCauHinh });
    if (result.length > 0) {
        if (result.split('_')[0] == "1") {
            NTS.thanhcong(result.split('_')[1]);
            switch ($('#LoaiCauHinh').value()) {
                case "Main_HachToan":
                    LoadGrid_CauHinh();
                    break;
                case "Main_ThongKe":
                    LoadGrid_CauHinh();
                    break;
                case "HachToan_DongThoi":
                    LoadGrid_CauHinh();
                    break;
                case "HachToan":
                    LoadGrid_CauHinh();
                    break;
                case "MLNS":
                    LoadGrid_CauHinh();
                    break;
                case "ThongKe":
                    LoadGrid_CauHinh();
                    break;
                case "Thue":
                    LoadGrid_CauHinh();
                    break;
            }
            
            $('#mdThemMoi').modal('hide');
        } else if (result.split('_')[0] == "0") {
            NTS.canhbao(result.split('_')[1]);
        } else {
            NTS.loi(result.split('_')[1]);
        }
    } else {
        NTS.loi("Có lỗi trong quá trình thao tác. Vui lòng thử lại!");
    }
    return false;
}

function XoaDuLieu(ID) {
    if (!ntspermiss.xoa) {
        NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác xóa. Vui lòng kiểm tra lại!");
        return false;
    }
    var result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'LoaiCTID', ID: ID, TenBangHienTai: 'LoaiCT', CacBangKhongXet: [] });
    if (result_ktxoa == "") {
        bootbox.confirm({
            title: 'Cảnh báo',
            message: NTS.CauThongBaoXoa,
            className: 'bb-alternate-modal',
            buttons: {
                cancel: {
                    label: '<i class="fa fa-close"></i> Không',
                    className: "btn-danger btn-sm",
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Có',
                    className: "btn-primary btn-sm",
                }
            },
            callback: function (result) {
                if (result) {
                    var result = NTS.getAjax('/HeThong/LoaiCT/XoaLoaiCT', { ma: ID });
                    if (result.split('_')[0] == "1") {
                        LoadGrid();
                        NTS.thanhcong(result.split('_')[1]);
                    }
                    else {
                        NTS.loi('Xóa dữ liệu thất bại!');
                    }
                }
            }
        });
    }
    else
        bootbox.dialog({
            title: "Cảnh báo",
            message: "Dữ liệu này đang được sử dụng. Không thể xoá, danh sách kèm theo:<br><table>" + result_ktxoa + "</table>",
            className: 'bb-alternate-modal',
            buttons: {
                cancel: {
                    label: '<i class="fa fa-close"></i> Đóng',
                    className: "btn-danger btn-sm",
                }
            },
        })
}


function XoaDuLieu_CauHinh(ID) {
    if (!ntspermiss.xoa) {
        NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác xóa. Vui lòng kiểm tra lại!");
        return false;
    }
    var result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'LoaiCT_CauHinhID', ID: ID, TenBangHienTai: 'LoaiCT_CauHinh', CacBangKhongXet: [] });
    if (result_ktxoa == "") {
        bootbox.confirm({
            title: 'Cảnh báo',
            message: NTS.CauThongBaoXoa,
            className: 'bb-alternate-modal',
            buttons: {
                cancel: {
                    label: '<i class="fa fa-close"></i> Không',
                    className: "btn-danger btn-sm",
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Có',
                    className: "btn-primary btn-sm",
                }
            },
            callback: function (result) {
                if (result) {
                    var result = NTS.getAjax('/HeThong/LoaiCT/XoaLoaiCT_CauHinh', { ma: ID });
                    if (result.split('_')[0] == "1") {
                        LoadGrid_CauHinh();
                        NTS.thanhcong(result.split('_')[1]);
                    }
                    else {
                        NTS.loi('Xóa dữ liệu thất bại!');
                    }
                }
            }
        });
    }
    else
        bootbox.dialog({
            title: "Cảnh báo",
            message: "Dữ liệu này đang được sử dụng. Không thể xoá, danh sách kèm theo:<br><table>" + result_ktxoa + "</table>",
            className: 'bb-alternate-modal',
            buttons: {
                cancel: {
                    label: '<i class="fa fa-close"></i> Đóng',
                    className: "btn-danger btn-sm",
                }
            },
        })
}
function LoadGrid() {
    table.clearData();
    var GetAll = NTS.getAjax("/HeThong/LoaiCT/LoadGrid1", {});
    if (GetAll.Err == false) {
        setTimeout(function () {
            table.setData(GetAll.Result);
    }, 10);
        table.redraw(true);
    }
    else {
        NTS.loi(GetAll.Msg);
    }
}
function LoadGrid_CauHinh() {
    var grid;
    switch (buocStep) {
        case "2.1":
            $('#LoaiCauHinh').value('Main_HachToan');
            grid = Grid2;
            break;
        case "2.2":
            $('#LoaiCauHinh').value('Main_ThongKe');
            grid = Grid3;
            break;
        case "3":
            $('#LoaiCauHinh').value('HachToan_DongThoi');
            grid = Grid4;
            break;
        case "4.1":
            $('#LoaiCauHinh').value('HachToan');
            grid = Grid5;
            break;
        case "4.2":
            $('#LoaiCauHinh').value('MLNS');
            grid = Grid6;
            break;
        case "5":
            $('#LoaiCauHinh').value('ThongKe');
            grid = Grid7;
            break;
        case "6":
            $('#LoaiCauHinh').value('Thue');
            grid = Grid8;
            break;
    }
    grid.clearData();
    var GetAll = NTS.getAjax("/HeThong/LoaiCT/LoadGridCauHinh", {LoaiCTID: $('#LoaiCTID').value(), LoaiCauHinh: $('#LoaiCauHinh').value() });
    if (GetAll.Err == false) {
        setTimeout(function () {
            grid.setData(GetAll.Result);
        }, 100);
        grid.redraw(true);
    }
    else {
        NTS.loi(GetAll.Msg);
    }
}

/////////////////////////////////////////////////////////////////////////
var buoc = 0, tmp_click;

function HienDiv1() {
    $('#Div1').show();
    $('#Div2').hide();
    LoadGrid();
}

function HienDiv2() {
    $('#Div2').show();
    $('#Div1').hide();
}
$('#btnThemMoi').click(function () {
    HienDiv2();
    TruocKhiThem();

    return false;
});
function ThemMoiCauHinh(loaiCauHinh) {
    //var data = NTS.getAjax_v1('/View/hethong/LoaiCT.aspx/KiemTraTruocKhiThaoTac', {});
    //if (data.Err) {
    //    return false;
    //}
    TruocKhiThemCauHinh();
    $('#LoaiCauHinh').value(loaiCauHinh);
    return false;
}
function TruocKhiThemCauHinh() {
    $('#mdThemMoi').modal('show');
    $('#tieuDeModal').html('Thêm mới cấu hình');
    tempthemCauHinh = "them";
    $("#STT").value("");
    $("#TenCot").value("");
    $("#MoTa").value("");
    $("#ChieuDaiCot").value("150");
    $("#TimKiem").prop('checked', 'checked');
    $("#HienThi").prop('checked', 'checked');
    $("#KhoaViTri").value("");
    $("#CanhLe").select2().val("left").trigger("change");
    $("#KieuDuLieu").select2().val("textarea").trigger("change");
    return false;
}

function SuaDuLieu_CauHinh(id) {
    var data = NTS.getAjax('/HeThong/LoaiCT/GetLoaiCT_CauHinhByID', { data: id });
    if (data.length > 0) {
        $('#mdThemMoi').modal('show');
        $('#tieuDeModal').html('Cập nhật cấu hình');
        tempthemCauHinh = "sua";
        $("#STT").value(data[0].STT);
        $("#TenCot").value(data[0].TenCot);
        $("#MoTa").value(data[0].MoTa);
        if (data[0].ChieuDaiCot == '') {
            $('#TuDong').click();
        } else {
            $("#ChieuDaiCot").value(data[0].ChieuDaiCot);
        }
        $("#KieuDuLieu").value(data[0].KieuDuLieu);
        $("#KhoaViTri").value(data[0].KhoaViTri);
        $("#HienThi").value(data[0].HienThi);
        $("#TimKiem").value(data[0].TimKiem);
        $("#CanhLe").value(data[0].CanhLe);
    }
    else {
        NTS.canhbao("Tải dữ liệu thất bại. Vui lòng thử lại!");
        return false
    }
}
function TruocKhiThem() {
    if (!ntspermiss.them) {
        NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác thêm mới. Vui lòng kiểm tra lại.");
        return false;
    }
    tempthem = "them";
    $('#LoaiCTID').value('');
    NTS.loadDataCombo({
        name: '#TaiKhoanID_No,#TaiKhoanID_Co,#TaiKhoanID_DTNo,#TaiKhoanID_DTCo',
        ajaxUrl: '/DanhMuc/DungChung/GetTaiKhoanKeToan',
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textShowTatCa: '',
        columns: 2,
        showTatCa: !0,
        textChange: "text",
    });
    $('#LoaiCTCode').prop('disabled', false);
    $('#LoaiCTCode,#TenLoaiCT,#KyHieuCT,#URL,#DienGiai,#MauSoCT,#SoKyTu,#KyHieuPhiaTruoc,#KyHieuPhiaSau').value('');
    $('#TaiKhoanID_No,#TaiKhoanID_Co').value('');
    $('#TaiKhoanID_DTCo,#TaiKhoanID_DTNo').value('');
    $('#NgungSD').value(false);
    $('#TuTang,#TangTheoThang,#HienKyHieu,#HienDauGach').value(false);
}
$('#btnLui').on('click', function () {
    tmp_click = true;
    var dem = $('.step-content').find('.step-pane.active').attr('data-step');
    if (dem + "" == "1") {
        HienDiv1();
    }
    if (dem + "" == "2") {

    }
    if (dem + "" == "3") {
        LuuThongTinLoaiChungTu();
        $('#thongke').trigger('click');
    }
    if (dem + "" == "4") {
        buocStep = "3";
    }
    if (dem + "" == "5") {
        $('#hoachtoan').trigger('click');
    }
    if (dem + "" == "6") {
        buocStep = "5";
    }
    if (dem + "" == "7") {
        buocStep = "6";
    }
});
$('#btnTiep').click(function () {
    tmp_click = false;
});
$('#btnQuayLai').click(function () {
    HienDiv1();
    var wizard = $('#fuelux-wizard-container').data('fu.wizard');
    wizard.currentStep = 1;
    wizard.setState();
});
jQuery(function ($) {
    $('[data-rel=tooltip]').tooltip();
    var $validation = true;
    $('#fuelux-wizard-container')
        .ace_wizard({
            step: 1,//optional argument. wizard will jump to step "2" at first
            buttons: '.wizard-actions:eq(0)'
        })
        .on('actionclicked.fu.wizard', function (e, info) {
            var dem = $('.step-content').find('.step-pane.active').attr('data-step');
            if (!tmp_click) {
                buoc = parseInt(dem) + 1;
            } else {
                buoc = parseInt(dem) - 1;
            }
            if (buoc == 2 && !tmp_click) {
                LuuThongTinLoaiChungTu();
                buocStep = "2.1";
                $('#thongke').trigger('click');
                LoadGrid_CauHinh();
            }
            if (buoc == 3 && !tmp_click) {
                buocStep = "3";
                LoadGrid_CauHinh();
            }
            if (buoc == 4 && !tmp_click) {
                buocStep = "4.1";
                $('#hoachtoan').trigger('click');
                LoadGrid_CauHinh();
            }
            if (buoc == 5 && !tmp_click) {
                buocStep = "5";
                LoadGrid_CauHinh();
            }
            if (buoc == 6 && !tmp_click) {
                buocStep = "6";
                LoadGrid_CauHinh();
            }
        })
        .on('finished.fu.wizard', function (e) {
            var wizard = $('#fuelux-wizard-container').data('fu.wizard');
            wizard.currentStep = 1;
            wizard.setState();
            HienDiv1();
        })
        .on('started.fu.wizard');
});
/////////////////////////////////////////////////////////////////////////
function SuaDuLieu(id) {
    var data = NTS.getAjax('/HeThong/LoaiCT/GetLoaiChungTuByID', { data: id });
    if (data.length > 0) {
        TruocKhiThem();
        tempthem = "sua";
        HienDiv2();
        $('#LoaiCTCode').prop('disabled', true);
        $('#LoaiCTID').value(data[0].LoaiCTID);
        $('#LoaiCTCode').value(data[0].LoaiCTCode);
        $('#TenLoaiCT').value(data[0].TenLoaiCT);
        $('#TaiKhoanID_No').value(data[0].TaiKhoanID_No);
        $('#TaiKhoanID_Co').value(data[0].TaiKhoanID_Co);
        $('#TaiKhoanID_DTCo').value(data[0].TaiKhoanID_DTCo);
        $('#TaiKhoanID_DTNo').value(data[0].TaiKhoanID_DTNo);
        $('#KyHieuCT').value(data[0].KyHieuCT);
        $('#URL').value(data[0].URLChuyenTrang);
        $('#DienGiai').value(data[0].DienGiai);
        $('#NgungSD').value(data[0].NgungSD);
        $('#MauSoCT').value(data[0].MauSoCT);
        $('#SoKyTu').value(data[0].SoKyTu);
        $('#KyHieuPhiaTruoc').value(data[0].KyHieuPhiaTruoc);
        $('#KyHieuPhiaSau').value(data[0].KyHieuPhiaSau);
        $('#TuTang').value(data[0].TuTang);
        $('#TangTheoThang').value(data[0].TangTheoThang);
        $('#HienKyHieu').value(data[0].HienKyHieu);
        $('#HienDauGach').value(data[0].HienDauGach);
        return false;
    }
    else {
        NTS.loi('Tải dữ liệu sửa thất bại!')
    }
    return false;
}

$(document).on('click', '#thongke', () => {
    buocStep = "2.1";
    LoadGrid_CauHinh();
});
$(document).on('click', '#mucns', () => {
    buocStep = "2.2";
    LoadGrid_CauHinh();
});
$(document).on('click', '#hoachtoan', () => {
    buocStep = "4.1";
    LoadGrid_CauHinh();
});
$(document).on('click', '#mlns', () => {
    buocStep = "4.2";
    LoadGrid_CauHinh();
});


////////////////////////////////////////////// sao chép

function SaoChep(id) {
    $('#Modal_SaoChep').modal('show');
    $('#TenLoaiCT_Tu').text(rowSelect.TenLoaiCT);
    $('#LoaiCTID_SaoChepTu').value(id);
    NTS.loadDataCombo({
        name: '#LoaiCTID_SaoChepDen',
        ajaxUrl: '/DanhMuc/DungChung/GetLoaiCT',
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textShowTatCa: '',
        columns: 2,
        showTatCa: !0
    });
}


$('#btn_LuuSaoChep').click(function () {
    if ($('#LoaiCTID_SaoChepTu').value() == '') {
        NTS.canhbao("Chưa chọn loại chứng từ để sao chép!");
        return false;
    }
    if ($('#LoaiCTID_SaoChepDen').value() == '') {
        NTS.canhbao("Chưa chọn loại chứng từ để sao chép!");
        return false;
    }
    // Lưu thông tin bước 1
    var saveData = new Array();
    saveData[0] = $('#LoaiCTID_SaoChepTu').value();
    saveData[1] = $('#LoaiCTID_SaoChepDen').value();

    var result = NTS.getAjax('/HeThong/LoaiCT/LuuSaoChep', { data: saveData });
    if (result.split('_')[0] == "1") {
        NTS.thanhcong(result.split('_')[1]);
        $('#Modal_SaoChep').modal('hide');
        return false;
    } else
        if (result.split('_')[0] == "0") {
            NTS.canhbao(result.split('_')[1]);
            return false;
        }
        else {
            NTS.loi(result.split('_')[1]);
            return false;
        }
})


$('#TuDong').on('click', function () {
    if ($('#TuDong').value()) {
        document.getElementById("ChieuDaiCot").disabled = true;
        $('#ChieuDaiCot').value('');
    } else {
        document.getElementById("ChieuDaiCot").disabled = false;
    }
});