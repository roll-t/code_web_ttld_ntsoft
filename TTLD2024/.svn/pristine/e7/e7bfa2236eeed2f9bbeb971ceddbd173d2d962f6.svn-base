var chonNhom = false;
var IDGroup;
var IDMenu;
$(function () {
    LoadDataTableUserGroup();
});
var GroupCodeEditter = function (cell, onRendered, success, cancel, editorParams) {
    var luoi = this.table;
    var cellValue = cell.getValue();
    var editor = document.createElement("input");
    editor.setAttribute("id", "GroupCode");
    editor.setAttribute("type", "text");
    editor.setAttribute("class", "form-control input-sm celledit");

    onRendered(function () {
        var input = $("#GroupCode");
        input.value(cellValue);
        input.focus();
        input.on('change', function (e) {
            debugger
            var resultSuaCode = NTS.getAjax("/HeThong/NhomNguoiDung/CapNhatUserGroupCode", { UserGroupCode: input.val(), id: cell.getRow().getData().UserGroupID });
            cell.getRow().getCell('UserGroupID').setValue(resultSuaCode.split('_')[1]);
            success(input.val());
            luoi.redraw(true);
            luoi.scrollToColumn('UserGroupCode');
        
        });
        input.on('focusout', function (e) {
            var resultSuaCode = NTS.getAjax("/HeThong/NhomNguoiDung/CapNhatUserGroupCode", { UserGroupCode: input.val(), id: cell.getRow().getData().UserGroupID });
            cell.getRow().getCell('UserGroupID').setValue(resultSuaCode.split('_')[1]);
            success(input.val());
            luoi.redraw(true);
            luoi.scrollToColumn('UserGroupCode');
        });
        input.on('blur', function (e) {
            cancel();
        });
    });

    return editor;
};

var GroupNameEditter = function (cell, onRendered, success, cancel, editorParams) {
    var luoi = this.table;
    var cellValue = cell.getValue();

    var editor = document.createElement("input");
    editor.setAttribute("id", "GroupNameEdit");
    editor.setAttribute("type", "text");
    editor.setAttribute("class", "form-control input-sm celledit");

    onRendered(function () {
        var input = $("#GroupNameEdit");
        input.value(cellValue);
        input.focus();
        input.on('change', function (e) {

            var resultSuaName = NTS.getAjax("/HeThong/NhomNguoiDung/CapNhatUserGroupName", { UserGroupName: input.val(), id: cell.getRow().getData().UserGroupID });
            cell.getRow().getCell('UserGroupID').setValue(resultSuaName.split('_')[1]);
            success(inputname.val());
            luoi.redraw(true);
            luoi.scrollToColumn('UserGroupName');
            NTS.thanhcong("Cập nhật thành công!");
           
        });
        input.on('focusout', function (e) {
            var resultSuaName = NTS.getAjax("/HeThong/NhomNguoiDung/CapNhatUserGroupName", { UserGroupName: input.val(), id: cell.getRow().getData().UserGroupID });
            cell.getRow().getCell('UserGroupID').setValue(resultSuaName.split('_')[1]);
            success(input.val());
            luoi.redraw(true);
            luoi.scrollToColumn('UserGroupName');
        });
        input.on('blur', function (e) {
            cancel();
        });
    });

    return editor;
};
var btnThaoTac = function (cell) {
    return `<div class="show-or-hide"><a class='text-danger btnXoaGrid1' title="Xoá" data='${cell.getData().UserGroupID}'><i class='fa fa-trash'></i></a></div>`;
}

$(document).on('click', '.btnXoaGrid1', function () {
    var IDXoa = $(this).attr('data');
    if (!QuyenXoa()) {
        return false;
    }
    CanhBaoXoa(() => {
        var result = NTS.getAjax('/HeThong/NhomNguoiDung/XoaGroupUser', { ma: IDXoa });
        if (!result.Err) {
            LoadDataTableUserGroup();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
});
var fmThaoTacBTC = function (cell) {
    return `<div class="show-or-hide"><a class='text-danger btnXoaGrid2' title="Xoá" data='${cell.getData().GroupPerID}'><i class='fa fa-trash'></i></a></div>`;
}
var table_quyen = new Tabulator("#Grid2", {
    height: "500", // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    selectable: 1,
    selectableRows: 1,
    //data: tabledata, //assign data to table
    layout: "fitColumns", //fit columns to width of table (optional)
    pagination: "local",
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        { title: "<botton id='btnThemChucNang' class='btn btn-xs btn-primary btn-nts-them'><i class='fa fa-plus' aria-hidden='true'></i></botton>", hozAlign: "center", formatter: fmThaoTacBTC, width: 60, align: "center", headerSort: false, headerHozAlign: "center", vertAlign: "middle"},
        { title: "MenuID", field: "MenuID", width: 150, visible: false, headerHozAlign: "center", vertAlign: "middle"},
        { title: "Mã", field: "MenuCode", formatter: 'textarea', hozAlign: "left", visible: true, width: 110, headerHozAlign: "center", vertAlign: "middle"},
        { title: "Chức năng", field: "TenMenu", formatter: 'textarea', hozAlign: "left", visible: true, width: 150, headerHozAlign: "center", vertAlign: "middle"},
        { title: "Quyền", field: "Quyen", hozAlign: "left", formatter: 'textarea', visible: true, minWidth: 180, headerHozAlign: "center", vertAlign: "middle"},
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
table_quyen.on("rowClick", function (e, row) {
    debugger
    var data = table_quyen.getSelectedRows()[0]._row.data;
    IDMenu = data.MenuID;
    ShowDataPermission(row.getData().Quyen);
});
table_quyen.on("rowSelectionChanged", function (e, row) {
    debugger
    var nocheck = document.getElementsByName("quyen");
    for (var i = 0; i < nocheck.length; i++) {
        nocheck[i].checked = false;
    }
    document.getElementById("GanTatCa").checked = false;
    document.getElementById("ChonAll").checked = false;
});
var table = new Tabulator("#Grid1", {
    height: 500, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    selectableRows: 1,
    //data: tabledata, //assign data to table
    layout: "fitColumns", //fit columns to width of table (optional)
    pagination: "local",
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        { title: "<botton id='btnThemNhom' class='btn btn-xs btn-primary btn-nts-them'><i class='fa fa-plus' aria-hidden='true'></i></botton>", hozAlign: "center", formatter: btnThaoTac, width: 60, headerSort: false, headerHozAlign: "center", vertAlign: "middle" },
        { title: "UserGroupID", field: "UserGroupID", width: 50, visible: false },
        { title: "Mã nhóm", field: "UserGroupCode", hozAlign: "left", visible: true, width: 100, editor: GroupCodeEditter, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Tên nhóm", field: "UserGroupName", hozAlign: "left", visible: true, minWidth: 200, editor: GroupNameEditter, headerHozAlign: "center", vertAlign: "middle"},
        
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        table.setFilter(matchAny, { value: $(this).val() });
    }
});
table.on("rowSelectionChanged", function (e, row) {
    table_quyen.clearData();
});
$(document).on('click', '#btnThemNhom', function () {
    if (!QuyenThem()) {
        return false;
    }
    table.addRow({}, 1);
    edit = true;
});
table.on("rowClick", function (e, row) {
    var data = table.getSelectedRows()[0]._row.data;
    //alert(data.UserGroupID);
    IDGroup = data.UserGroupID;
    if (data.UserGroupID.length > 0) {
        chonNhom = true;
        LoadDataTableChucNang(data.UserGroupID);
    }
});

function LoadDataTableUserGroup() {
    table.clearData();
    const GetAll = NTS.getAjax("/HeThong/NhomNguoiDung/GetAllUserGroup", {});
    if (!GetAll.Err) {
        table.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}


//set filter to custom function
$(document).on('click', '#ChonAll', function () {
    $('.quyen').prop('checked', this.checked);
});
$(document).on('keyup', '#timKiemNhom', function (e) {
    table.setFilter(matchAny, { value: $(this).val() });
});
$(document).on('keyup', '#timKiemQuyen', function (e) {
    if (e.keyCode == '13') {
        table_quyen.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('keyup', '#timKiemChucNang', function (e) {
    if (e.keyCode == '13') {
        table_ChonQuyen.setFilter(matchAny, { value: $(this).val() });
    }
});
var table_ChonQuyen = new Tabulator("#Grid_ChonChucNang", {
    height: 400, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    //data: tabledata, //assign data to table
    layout: "fitColumns", //fit columns to width of table (optional)
    pagination: "local",
    selectable: true,
    selectablePersistence: false, // disable rolling selection
    paginationSize: 50,
    //height:"500",
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        {
            formatter: "rowSelection", titleFormatter: "rowSelection", hozAlign: "center", cellClick: function (e, cell) {
                cell.getRow().toggleSelect();
            }, width: 60, headerSort: false, headerHozAlign: "center", vertAlign: "middle"
        },
        { title: "Mã", field: "MenuCode", hozAlign: "left", visible: true, width: 110, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Chức năng", field: "TenMenu", hozAlign: "left", visible: true, width: 250, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Thuộc chức năng", field: "TenMenuCha", hozAlign: "left", visible: true, headerHozAlign: "center", vertAlign: "middle" },
        { title: "MenuID", field: "MenuID", width: 150, visible: false, vertAlign: "middle" },
       
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

$(document).on('click', '#btnThemChucNang', function () {
    
    if (!QuyenThem()) {
        return false;
    }
    if (table.getSelectedRows().length > 0) {
        $('#mdThemChucNang').modal('show');
        document.getElementById("ckChoUser").checked = true;
        table_ChonQuyen.clearData();
        const GetAllTChucNang = NTS.getAjax("/HeThong/NhomNguoiDung/GetAllChucNang", { Data: table.getSelectedRows()[0]._row.data.UserGroupID });
        if (!GetAllTChucNang.Err) {
            setTimeout(function () {
                table_ChonQuyen.setData(GetAllTChucNang.Result);
                table_ChonQuyen.redraw(true);
            }, 300)
        }
        else {
            GetAllTChucNang.CanhBao ? NTS.canhbao(GetAllTChucNang.Msg) : NTS.loi(GetAllTChucNang.Msg);
        }
    }
    else {
        NTS.canhbao("Chọn 1 nhóm người dùng trước khi thực hiện thao tác!");
    }
});

$(document).on('click', '#btnChonChucNangVaDong', function () {
    if (!QuyenThem()) {
        return false;
    }
    var param = "";
    for (var i = 0; i < table_ChonQuyen.getSelectedData().length; i++) {
        if (param == '') {
            param = table_ChonQuyen.getSelectedData()[i].MenuID;
        }
        else {
            param = param + ',' + table_ChonQuyen.getSelectedData()[i].MenuID;
        }
    }
    if (param.length == 0) {
        NTS.canhbao("Vui lòng chọn chức năng trươc khi thực hiện thao tác");
        return false;
    }
    var par = new Array();
    par[0] = $('#Xem').value();
    par[1] = $('#Them').value();
    par[2] = $('#Xoa').value();
    par[3] = $('#Sua').value();
    par[4] = $('#Nap').value();
    par[5] = $('#In').value();
    par[6] = $('#P1').value();
    par[7] = $('#P2').value();
    par[8] = $('#P3').value();
    par[9] = param;
    par[10] = table.getSelectedRows()[0]._row.data.UserGroupID;
    par[11] = $('#ckChoUser').value();
    var result = NTS.getAjax("/HeThong/NhomNguoiDung/ThemChucNang", { Data: par });
    
    if (!result.Err) {
        LoadDataTableChucNang(table.getSelectedRows()[0]._row.data.UserGroupID);
        NTS.thanhcong(result.Msg);
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    $('#mdThemChucNang').modal('hide');
    return false;
});
function LoadDataTableChucNang(ID) {
    table_quyen.clearData();
    table_quyen.setData("/HeThong/NhomNguoiDung/GetQuyenCuaNhom", { id: ID });
}
$('#btnGanQuyen').click(function () {
    if (!QuyenThem()) {
        return false;
    }
    var para = new Array();
    para[0] = $('#Xem').value();
    para[1] = $('#Them').value();
    para[2] = $('#Xoa').value();
    para[3] = $('#Sua').value();
    para[4] = $('#Nap').value();
    para[5] = $('#In').value();
    para[6] = $('#P1').value();
    para[7] = $('#P2').value();
    para[8] = $('#P3').value();
    para[9] = $('#GanTatCa').value();
    para[10] = table.getSelectedRows()[0]._row.data.UserGroupID ;
    para[11] = IDMenu;
    var capnhatQ = NTS.getAjax("/HeThong/NhomNguoiDung/CapNhatQuyen", { saveData: para });
    NTS.thanhcong("Cập nhật thành công");
    LoadDataTableChucNang(table.getSelectedRows()[0]._row.data.UserGroupID);
});

$(document).on('click', '.btnXoaGrid2', function () {
    var IDXoa = $(this).attr('data');
    if (!QuyenXoa()) {
        return false;
    }
    CanhBaoXoaTatCa(
        async () => {
            var result = NTS.getAjax('/HeThong/NhomNguoiDung/XoaChucNang', { ID: IDXoa, IDGroup: IDGroup });
            NTS.thanhcong("Xóa dữ liệu thành công!");
            LoadDataTableChucNang(table.getSelectedRows()[0]._row.data.UserGroupID);
        },
        async () => {
            var result = NTS.getAjax('/HeThong/NhomNguoiDung/XoaChucNang', { ID: '', IDGroup: IDGroup });
            NTS.thanhcong("Xóa dữ liệu thành công!");
            LoadDataTableChucNang(table.getSelectedRows()[0]._row.data.UserGroupID);
        },
    )
});
function ShowDataPermission(Quyen) {
    $('.quyen').value(false);
    var str = new String(Quyen);
    $('input[name=quyen]').attr('checked', false);
    if (str.indexOf("Xem") !== -1) {
        $('#Xem').prop('checked', true);
    }
    if (str.indexOf("Thêm") !== -1) {
        $('#Them').prop('checked', true);
    }
    if (str.indexOf("Sửa") !== -1) {
        $('#Sua').prop('checked', true);
    }
    if (str.indexOf("Xóa") !== -1) {
        $('#Xoa').prop('checked', true);
    }
    if (str.indexOf("Nạp") !== -1) {
        $('#Nap').prop('checked', true);
    }
    if (str.indexOf("In") !== -1) {
        $('#In').prop('checked', true);
    }
    if (str.indexOf("Sửa/Xóa theo Users") !== -1) {
        $('#P1').prop('checked', true);
    }
    if (str.indexOf("Nạp theo Users") !== -1) {
        $('#P2').prop('checked', true);
    }
    if (str.indexOf("Plus3") !== -1) {
        $('#P3').prop('checked', true);
    }
}
//Phân lại tất cả quyền theo nhóm
$(document).on('click', '#btnCapNhatUserTheoNhom', function () {
    if (table.getSelectedData().length == 1) {
        $.confirm({
            title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
            type: 'blue',
            icon: 'fa fa-question-circle',
            typeAnimated: true,
            theme: 'material',
            columnClass: 'col-md-5 col-md-offset-3 w-max-400px',
            content: "<p class=\"mb-1\">Bạn có thật sự muốn cập nhật phân quyền cho nhóm người dùng đã chọn không?</p><p class=\"mb-1\"> - Đồng ý cập nhật chọn <b>'Có'</b></p><p class=\"mb-1\">- Không đồng ý chọn <b>'Không'</b></p>",
            buttons: {
                confirm: {
                    text: '<i class="fa fa-check"></i> Có',
                    btnClass: 'btn-primary',
                    keys: ['enter'],
                    action: function () {
                        var ketQua = NTS.getAjax("/HeThong/NhomNguoiDung/CapNhatUserTheoNhom", { UserGroupID: table.getSelectedData()[0].UserGroupID });
                        if (ketQua == "ThanhCong") {
                            NTS.thanhcong('Đã cập nhật lại phân quyền cho tất cả người dùng thuộc nhóm người dùng đang chọn!');
                        } else {
                            NTS.loi('Thao tác thực hiện thất bại!');
                        }
                    }
                },
                cancel: {
                    text: '<i class="fa fa-close"></i> Không',
                    btnClass: 'btn-danger',
                    keys: ['esc'],
                    action: function () {

                    }
                }
            }
        });
    }
    else {
        NTS.canhbao('Vui lòng chọn nhóm người dùng!');
    }
    return false;
});