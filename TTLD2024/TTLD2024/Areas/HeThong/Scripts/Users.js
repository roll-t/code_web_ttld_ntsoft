var tempthem = "them";
$(function () {
    NTS.loadDataCombo({
        name: '#NhomNguoiDung',
        ajaxUrl: '/HeThong/Users/GetAllNhomNguoiDung',
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '',
        hideshowTatCa: false,
        showTatCa: !0,
    });
    NTS.loadDataCombo({
        name: '#DonVi_noicongtac',
        ajaxUrl: '/HeThong/Users/GetAllDonVi',
        columns: 2,
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textChange: "text1",
        indexDefault: 1,
        showTatCa: false
    });
    NTS.loadDataCombo({
        name: '#TrangChu',
        ajaxUrl: '/HeThong/Users/GetAllDSTrang',
        ajaxParam: { data: $('#NhomNguoiDung').value() },
        columns: 2,
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textChange: "text1",
        indexDefault: 1,
        showTatCa: false
    });
    LoadDataTable()
})
checkDangSD2('.checkDangSD', 'Users', 'UserID');
$('#DangSD').on('change', function () {
    UpdateLabelDangSD(this);
});
$('#NhomNguoiDung').on('change', function () {
    NTS.loadDataCombo({
        name: '#TrangChu',
        ajaxUrl: '/HeThong/Users/GetAllDSTrang',
        ajaxParam: { data: $('#NhomNguoiDung').value() },
        columns: 2,
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textChange: "text1",
        indexDefault: 1,
        showTatCa: false
    });
});
var btnThaoTacg1 = function (cell) {
    return `<div class="show-or-hide"><a class='text-primary btnSuaGrid1 btn-nts-sua' title="Sửa" data='${cell.getData().UserID}'><i class="fa fa-pencil"></i></a></b>&ensp;<a class='text-danger btnXoaGrid1 btn-nts-xoa' title="Xoá" data='${cell.getData().UserID}'><i class='fa fa-trash-o'></i></a>&ensp;<a class='text-success btnReset1 btn-nts-reset' title="Làm mới mật khẩu" data='${cell.getData().UserID}'><i class='fa fa-refresh'></i></a></div>`;
    /*return formaterbtnThaoTac(cell.getData().UserID);*/
}
var btnThaoTacg2 = function (cell, formatterParams, onRendered) {
    return `<div class="show-or-hide"><a class='text-danger btnXoaGrid2' title="Xoá" data='${cell.getData().UserPerID}'><i class='fa fa-trash'></i></a></div>`;
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().UserID);
}
var Grid1 = new Tabulator("#Grid1", {
    layout: "fitColumns",
    height: "80vh", // fix height của lưới
    responsiveLayout: true,
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 150, 200, 500, 1000],
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', hozAlign: "center", formatter: btnThaoTacg1, width: 60, headerSort: false, headerHozAlign: "center", vertAlign: "middle" },
        { title: "UserID", field: "UserID", width: 0, visible: false, vertAlign: "middle" },
        { title: "Tên đăng nhập", field: "TenDangNhap", formatter: 'textarea', hozAlign: "left", width: 150, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Tên đơn vị", field: "TenDonVi", formatter: 'textarea', hozAlign: "left", minwidth: 250, width: 300, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Nhóm", field: "GroupName", hozAlign: "left", formatter: "textarea", width: 220, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Email", field: "Email", hozAlign: "left", formatter: "textarea", minWidth: 350, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Trạng thái sử dụng", field: "DangSD", headerWordWrap: true, hozAlign: "center", vertAlign: "middle", formatter: fmDangSD, headerSort: false, width: 135, headerHozAlign: "center", vertAlign: "middle" }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
Grid1.on("rowDblClick", function (e, row) {
    SuaChucNang(row.getData().UserID);
});
function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/HeThong/Users/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}


$("#btnNhapExcel").on("click", async function () {
    await ClearModalExcel();
    $("#mdNhapExcel").modal("show");
})

const TaiFileMau = async () => {
    await window.open(NTS.getAjax('/HeThong/Users/TaiFileMau'));
}

$(document).on('click', '#btnChonTepVB_us', function () {
    ClearModalExcel();
    $('#fileVB_us').click();
});

$(document).on('keyup', '#timKiemNhapExcel', function (e) {
    if (e.keyCode == '13') {
        GridExcel.setFilter(matchAny, { value: $(this).val() });
        $('.tabulator-page-size').click();
    }
});


$('#btnTaiFileKiemTra').click(function () {
    var kq = NTS.getAjax('/HeThong/Users/TaiFileExcelKiemTra', {});
    window.open(kq);
});


function ClearModalExcel() {
    $('#fileVB_us').value('');
    Path = "";
    var clearNoiDung = NTS.getAjax('/HeThong/Users/ResetExcel');
    $('#TenSheet').html('');
    document.getElementById("DuLieu").style.display = "none";
    $('#lblTenFile_us').html('<b>Tên file: </b>Không có tệp nào đươc chọn');
    GridExcel.clearData();
    $('#SoDongNhan').text("Số dòng nhận từ file: --");
    $('#SoDongHopLe').text("Số dòng hợp lệ: --");
    $('#SoDongLoi').text("Số dòng lỗi: --");
    $('#chkGhiDe').value(false);
}


$(document).on('click', '#btnLuuVaDongExcel', async function () {
    var param = new Array();
    for (var i = 0; i < GridExcel.getSelectedData().length; i++) {
        await param.push(GridExcel.getSelectedData()[i].TenDangNhap)
    }
    if (Path == "") {
        NTS.canhbao('Chưa chọn file nào đễ nhận excel!');
        return false;
    }
    if ($('#TenSheet').value() == "") {
        NTS.canhbao('Chưa chọn tên sheet!');
        return false;
    }
    if (GridExcel.getData().length == 0) {
        NTS.canhbao('Không tìm thấy dữ liệu nhận!');
        return false;
    }
    if (param.length == 0) {
        NTS.canhbao('Vui lòng chọn ít nhất 1 đối tượng để nhận excel!');
        return false;
    }
    var kq = await NTS.getAjax('/HeThong/Users/NhapDuLieuFileExcel', { Data: param });
    if (!$.isEmptyObject(kq) && kq != null) {
        NTS.thanhcong(kq);
        GridExcel.clearData();
        GridExcel.setData("/HeThong/Users/LoadDataExcelSauNhan");
        LoadDataTable();
    }
    else {
    }
});

$(document).on('change', '#fileVB_us', function () {
    var data = NTS.upload({
        name: '#fileVB_us',///ID input type="file"
        loaiVB: 'VB',///Nhận 1 trong 2 giá trị DL hoặc VB
    });
    if (data.length > 0) {
        Path = data.replace('*', '').replace('~', '');
        if ((Path.substring(Path.lastIndexOf('/') + 1)).substring((Path.substring(Path.lastIndexOf('/') + 1)).lastIndexOf('.') + 1).toUpperCase() != 'XLSX' && (Path.substring(Path.lastIndexOf('/') + 1)).substring((Path.substring(Path.lastIndexOf('/') + 1)).lastIndexOf('.') + 1).toUpperCase() != 'XLS') {
            NTS.canhbao('Vui lòng chọn file .xlsx hoặc .xls!');
            return false;
        }
        NTS.loadDataCombo({
            name: '#TenSheet',
            ajaxUrl: '/HeThong/Users/LoadTenSheet',
            ajaxParam: { Data: data },
            indexValue: 0,
            indexText: 0,
            showTatCa: !0,
            textShowTatCa: '-Chọn sheet-'
        });
        $('#lblTenFile_us').html('<b>Tên file: </b>' + Path.substring(Path.lastIndexOf('/') + 1));
    }
    else {
        $('#lblTenFile_us').html('<b>Tên file: </b> Không có tệp nào được chọn.');
    }
});


$("#btnKiemTraGhiDe").on('click', async function () {
    if ($('#TenSheet').value() == "") {
        NTS.canhbao("Vui lòng chọn 1 sheet!");
    }
    else if ($('#TenSheet').value() != "") {
        var param = new Array();
        param[0] = Path;
        param[1] = $('#TenSheet').value();
        param[2] = "2";
        var kq = await NTS.getAjaxAsync('/DanhMuc/CaNhan/KiemTraFile', { Data: param });
        if (kq == "") {
            NTS.thanhcong('Đã kiểm tra');
            document.getElementById("DuLieu").style.display = "block";
            GridExcel.clearData();
            GridExcel.setData(NTS.getAjax("/DanhMuc/CaNhan/LoadDataExcel"));
            loadTinhTrangFile();
        }
        else {
            document.getElementById("DuLieu").style.display = "none";
            NTS.canhbao(kq)
        }
    }
});


$(document).on('click', '#btnKiemTraFile', async function () {
    if ($('#TenSheet').value() == "") {
        NTS.canhbao("Vui lòng chọn 1 sheet!");
    }
    else if ($('#TenSheet').value() != "") {
        var param = new Array();
        param[0] = Path;
        param[1] = $('#TenSheet').value();
        param[2] = $('#chkGhiDe').value() == true ? '2' : '1';
        var kq = await NTS.getAjaxAsync('/HeThong/Users/KiemTraFile', { Data: param });
        if (kq == "") {
            document.getElementById("DuLieu").style.display = "block";
            GridExcel.clearData();
            GridExcel.setData(await NTS.getAjax("/HeThong/Users/LoadDataExcel"));
            NTS.thanhcong('Kiểm tra dữ liệu hoàn tất!');
        }
        else {
            document.getElementById("DuLieu").style.display = "none";
            NTS.canhbao(kq);
        }
        loadTinhTrangFile();
    }
});

function loadTinhTrangFile() {
    var kq2 = NTS.getAjax('/HeThong/Users/GetTinhTrangFileExcel', {})[0];
    if (kq2 != null || kq2 != "") {
        $('#SoDongNhan').text("Số dòng nhận từ file: " + kq2.TongSo);
        $('#SoDongHopLe').text("Số dòng hợp lệ: " + kq2.TongSoHopLe);
        $('#SoDongLoi').text("Số dòng lỗi: " + kq2.TongSoLoi);
    }
    else {
        $('#SoDongNhan').text("Số dòng nhận từ file: --");
        $('#SoDongHopLe').text("Số dòng hợp lệ: --");
        $('#SoDongLoi').text("Số dòng lỗi: --");
    }
}



$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        Grid1.setFilter(matchAny, { value: $(this).val() });
    }
});
function LoadDataTable2(ID) {
    Grid2.clearData();
    const GetAll2 = NTS.getAjax("/HeThong/Users/GetAllUserPermiss", { ID: ID });
    if (!GetAll2.Err) {
        Grid2.setData(GetAll2.Result);
    }
    else GetAll2.CanhBao ? NTS.canhbao(GetAll2.Msg) : NTS.loi(GetAll2.Msg);
}


var GridExcel = new Tabulator("#GridExcel", {
    headerClick: function (e, column) {
        //e - the click event object
        //column - column component
        if (column.getTable().getSelectedRows().length !== column.getTable().getDataCount()) {
            $('.select-row').prop('checked', true);
            column.getTable().selectRow();
        }
        else {
            $('.select-row').prop('checked', false);
            column.getTable().deselectRow();
        }
    },
    rowFormatter: function (row) {
        var data = row.getData();

        if (data.TinhTrang == "" || data.TinhTrang == null || data.TinhTrang == "Ghi đè" || data.TinhTrang == "Chờ nhận.") {
            row.getElement().style.color = "#333333";
        }
        else if (data.TinhTrang == "Đã nhận thành công" || data.TinhTrang == "Đã ghi đè") {
            row.getElement().style.color = "#27ae60";
        }
        else {
            row.getElement().style.color = "#FF0000";
        }
    },
    height: 300, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    selectable: true,
    //data: tabledata, //assign data to table
    layout: "fitColumns", //fit columns to width of table (optional)
    pagination: "local",
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        {
            formatter: "rowSelection", titleFormatter: "rowSelection", hozAlign: "center", cellClick: function (e, cell) {
                cell.getRow().toggleSelect();
            }, width: 40, headerSort: false
        },
        {
            title: "Tình trạng", field: "TinhTrang", formatter: "textarea", width: 160, align: "left"
        },
        {
            title: "Tên đăng nhập", field: "TenDangNhap", formatter: "textarea", width: 160, align: "left"
        },
        {
            title: "Mật khẩu", field: "MatKhau", formatter: "textarea", width: 160, align: "left"
        },
        {
            title: "Mã xác nhận", field: "MaXacNhan", formatter: "textarea", width: 160, align: "left"
        },
        {
            title: "Tên nhóm", field: "Nhom", formatter: "textarea", width: 160, align: "left"
        },
        {
            title: "Tên đơn vị", field: "TenDonVi", formatter: "textarea", width: 160, align: "left"
        },
        {
            title: "Email", field: "Email", formatter: "textarea", width: 160, align: "left"
        },
        {
            title: "Số điện thoại", field: "SoDienThoai", formatter: "textarea", width: 160, align: "left"
        },
        {
            title: "Họ và tên", field: "HoVaTen", formatter: "textarea", width: 160, align: "left"
        },


    ],
    //cellClick: function (e, cell) {
    //    var $element = $(cell.getElement());
    //    var $chkbox = $element.find('.select-row');
    //    if (cell.getData().IsSelected) {
    //        $chkbox.prop('checked', false);
    //        cell.getRow().deselect();
    //        cell.getData().IsSelected = false;
    //    } else {
    //        $chkbox.prop('checked', true);
    //        cell.getRow().select();
    //        cell.getData().IsSelected = true;
    //    }
    //},
    //rowClick: function (e, row) { //trigger an alert message when the row is clicked
    //    alert("Row " + row.getData().HoGiaDinhID + " Clicked!!!!");
    //},
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});



var Grid2 = new Tabulator("#Grid2", {
    layout: "fitColumns",
    selectableRows: 1,
    responsiveLayout: true,
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: 400,
    selectable: 1,
    columns: [
        { title: "<botton id='btnThemMoiQuyen' class='btn btn-xs btn-primary btn-nts-them'><i class='fa fa-plus' aria-hidden='true'></i></botton>", hozAlign: "center", formatter: btnThaoTacg2, width: 60, headerSort: false, headerSort: false, headerHozAlign: "center" },
        { title: "UserID", field: "UserID", visible: false },
        { title: "UserPerID", field: "UserPerID", visible: false },
        { title: "MenuID", field: "MenuID", visible: false, },
        { title: "Mã chức năng", field: "MenuCode", hozAlign: "left", width: 150, visible: true },
        { title: "Chức năng", field: "TenMenu", formatter: 'textarea', hozAlign: "left", visible: true, width: 350 },
        { title: "Quyền", field: "Permission", formatter: 'textarea', hozAlign: "left", minWidth: 700, visible: true },
    ],

    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
Grid2.on("rowClick", function (e, row) {
    ShowDataPermission(row.getData().UserPerID, row.getData().UserID);
});
$(document).on('keyup', '#timKiem2', function (e) {
    if (e.keyCode == '13') {
        Grid2.setFilter(matchAny, { value: $(this).val() });
    }
});
var Grid3 = new Tabulator("#Grid3", {
    height: 400, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    //data: tabledata, //assign data to table
    layout: "fitColumns", //fit columns to width of table (optional)
    pagination: "local",
    selectable: true,
    selectablePersistence: false, // disable rolling selection
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        {
            formatter: "rowSelection", titleFormatter: "rowSelection", hozAlign: "center", cellClick: function (e, cell) {
                cell.getRow().toggleSelect();
            }, width: 40, headerSort: false
        },
        { title: "Mã", field: "MenuCode", hozAlign: "left", visible: true, width: 110 },
        { title: "Chức năng", field: "TenMenu", formatter: 'textarea', hozAlign: "left", visible: true, width: 180 },
        { title: "Thuộc chức năng", field: "TenMenuCha", formatter: 'textarea', hozAlign: "left", visible: true },
        { title: "MenuID", field: "MenuID", width: 150, visible: false },
    ],
    rowSelectionChanged: function (data, rows) {
        //update selected row counter on selection change
    },
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
$(document).on('keyup', '#timKiemChucNang', function (e) {
    if (e.keyCode == '13') {
        Grid3.setFilter(matchAny, { value: $(this).val() });
    }
});
$(document).on('click', '#btnThemMoiQuyen', function () {
    if (!QuyenThem()) {
        return false;
    }
    $('#mdChucNang_us').modal('show');
    setTimeout(() => {
        LoadDataTable3($('#UserID').val());
    }, "300");

});
function LoadDataTable3(ID) {
    Grid3.clearData();
    const GetAll = NTS.getAjax("/HeThong/Users/GetAllChucNang", { UserID: ID });
    if (!GetAll.Err) {

        Grid3.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}
$('#btnChonDoiTuongVaDong_us').click(function () {
    if (!ntspermiss.them) {
        NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác thêm mới. Vui lòng kiểm tra lại.");
        return false;
    }
    var param = "";
    for (var i = 0; i < Grid3.getSelectedData().length; i++) {
        if (param == '') {
            param = Grid3.getSelectedData()[i].MenuID;
        }
        else {
            param = param + ',' + Grid3.getSelectedData()[i].MenuID;
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
    par[10] = $('#UserID').val();
    par[11] = $('#NhomNguoiDung').val();
    var result = NTS.getAjax("/HeThong/Users/ThemChucNang", { saveData: par });
    if (!result.Err) {
        setTimeout(() => {
            LoadDataTable2($('#UserID').val());

        }, "300");
        NTS.thanhcong("Thêm mới chức năng thành công!");
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    $('#mdChucNang_us').modal('hide');
    return false;
});

$(document).on('click', '#btnThemMoi', function () {
    if (!QuyenThem()) {
        return false;
    }
    resetForm('#mdThemMoi')
    $('#MatKhau').value('@Abc@123');
    $('#MaXacNhan').value('654321');
    $('#MatKhau').attr('disabled', false);
    $('#UserID').val('');
    $('#DangSD').value(true);
    $('input[name=quyen]').attr('checked', false);
    $('#TatCa').attr('checked', false);
    $('#QuyenTatCa').attr('checked', false);
    $('#TenDangNhap').removeAttr('disabled');
    Grid2.clearData();
    tempthem = "them";
    $('#mdThemMoi').modal('show');
    $('#tieuDeModal').text('Thêm mới người dùng');
    $('.div-MatKhau').show();
});
$(document).on('click', '.btnSuaGrid1', function () {
    if (!QuyenSua()) {
        return false;
    }
    SuaChucNang($(this).attr('data'));
});
$(document).on('click', '.btnXoaGrid1', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieu(ID);
});
$(document).on('click', '.btnReset1', function () {
    var ID = $(this).attr('data');
    ResetMatKhau(ID);
});
function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    CanhBaoXoa(() => {
        var result = NTS.getAjax('/HeThong/Users/XoaUser', { ma: ID });
        if (result.split('_')[0] == "1") {
            LoadDataTable();
            NTS.thanhcong(result.split('_')[1]);
        }
        else {
            NTS.loi('Xóa thất bại');
        }
    });
}
function ResetMatKhau(ID) {
    $.confirm({
        title: '<span class="text-dark">Thông báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-5 col-md-offset-3 w-max-400px',
        content: 'Xác nhận đổi mật khẩu về mặt định [@Abc@123] <b>"Xác nhận"</b>, hủy bỏ chọn <b>"Hủy bỏ"</b>',
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Xác nhận',
                btnClass: 'btn-primary',
                keys: ['shift'],
                action: async function () {
                    var param = new Array();
                    param[0] = ID;
                    param[1] = "@Abc@123";
                    var Data = NTS.getAjax('/HeThong/Users/DoiMatKhau', { param: param });
                    if (Data.split('_')[0] == "0") {
                        NTS.canhbao(Data.split('_')[1]);
                    }
                    else {
                        NTS.thanhcong('Đổi mật khẩu thành công!');
                    }
                }
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Hủy bỏ',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
            }
        }
    });
}
$('#btnGanQuyen').click(function () {
    if (!ntspermiss.sua) {
        NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác gán quyền. Vui lòng kiểm tra lại.");
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
    para[10] = $('#UserID').val();
    para[11] = Grid2.getSelectedRows()[0]._row.data.UserPerID;
    var capnhatQ = NTS.getAjax("/HeThong/Users/CapNhatQuyen", { saveData: para });
    NTS.thanhcong("Cập nhật thành công");
    setTimeout(() => {
        LoadDataTable2($('#UserID').val());

    }, "300");
});
$(document).on('click', '.btnXoaGrid2', function () {
    var IDXoa = $(this).attr('data');
    if (!QuyenXoa()) {
        return false;
    }
    CanhBaoXoaNhieuDongUser(
        async () => {
            var result = NTS.getAjax('/HeThong/Users/XoaUserPremisss', { ma: IDXoa, UserID: $('#UserID').val() });
            if (result.split('_')[0] == "1") {
                setTimeout(() => {
                    LoadDataTable2($('#UserID').val());

                }, "300");
                NTS.thanhcong(result.split('_')[1]);
            }
            else {
                NTS.loi('Xóa thất bại');
            }
        },
        async () => {
            var result = NTS.getAjax('/HeThong/Users/XoaUserPremisss', { ma: "", UserID: $('#UserID').val() });
            if (result.split('_')[0] == "1") {
                setTimeout(() => {
                    LoadDataTable2($('#UserID').val());

                }, "300");
                NTS.thanhcong(result.split('_')[1]);
            }
            else {
                NTS.loi('Xóa thất bại');
            }
        },
    )

});
$(document).on('click', '.btnXoaGrid1', function () {
    if (!ntspermiss.xoa) {
        NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác xóa. Vui lòng kiểm tra lại.");
        return false;
    }
    var ID = $(this).attr('data');
    //  XoaUser(ID);
});
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}
var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
function validatePassword(p) {
    if (p.length < 8) {
        NTS.canhbao('Mật khẩu phải lớn hơn 8 ký tự');
        return false;
    }
    if (p.search(/[0-9]/) < 0) {
        NTS.canhbao('Mật khẩu phải chứa ít nhất 1 chữ số');
        return false;
    }
    if (p.search(/[a-z]/) < 0) {
        NTS.canhbao('Mật khẩu phải chứa ít nhất 1 ký tự chữ thường');
        return false;
    }
    if (p.search(/[A-Z]/) < 0) {
        NTS.canhbao('Mật khẩu phải chứa ít nhất 1 ký tự chữ hoa');
        return false;
    }

    if (p.search(/[!@#\$%\^&\*_]/) < 0) {
        NTS.canhbao('Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt');
        return false;
    }
    return true;
}
$('#btnLuuVaDong').on('click', function () {
    if (!ntspermiss.them) {
        NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác thêm mới. Vui lòng kiểm tra lại.");
        return false;
    }
    var favorite = [];
    $.each($("input[name='quyen']:checked"), function () {
        favorite.push($(this).val());
    });
    var Permission = "";
    Permission = favorite.join(";");
    if (!validateEmail($('#Email').value())) {
        NTS.canhbao('Email không đúng định dạng');
        return false;
    }
    if ($('#TenDangNhap').value().indexOf(" ") !== -1) {
        NTS.canhbao('Tên đăng nhập phải viết liền');
        return false;
    }
    if (isEmty($('#TenDangNhap').value())) {
        NTS.canhbao('Tên đăng nhập không được để trống');
        return false;
    }
    if (isEmty($('#MatKhau').value())) {
        NTS.canhbao('Mật khẩu không được để trống');
        return false;
    }

    if (tempthem == "them") {
        if (validatePassword($('#MatKhau').value()) == false)
            return false;
    }

    if (isEmty($('#NhomNguoiDung').value())) {
        NTS.canhbao('Nhóm người dùng không được để trống');
        return false;
    }
    if (isEmty($('#DonVi_noicongtac').value())) {
        NTS.canhbao('Đơn vị không được để trống');
        return false;
    }
    if (isEmty($('#TrangChu').value())) {
        NTS.canhbao('Trang chủ không được để trống');
        return false;
    }
    var param = new Array();
    param[0] = tempthem;
    param[1] = $('#TenDangNhap').value();
    param[2] = $('#DangSD').value();
    param[3] = $('#MatKhau').value();
    param[4] = $('#MaXacNhan').value();
    param[5] = $('#Email').value();
    param[6] = $('#NhomNguoiDung').value();
    param[7] = $('#DonVi_noicongtac').value();
    param[8] = $('#UserID').value();
    param[9] = Permission;
    // param[10] = JSON.stringify($("#DonViXetDuyet").value());
    param[10] = '';
    param[11] = $('#TrangChu').value();
    var result = NTS.getAjax("/HeThong/Users/LuuThongTin", { data: param });
    if (result.split('_')[0] == "1") {
        tempthem = "sua";
        LoadDataTable();
        setTimeout(() => {
            LoadDataTable2(result.split('_')[1]);

        }, "300");

        NTS.thanhcong(result.split('_')[2]);
        $('#UserID').value(result.split('_')[1]);
        return false;
    }
    if (result.split('_')[0] == "0") {
        NTS.canhbao(result.split('_')[1]);
        return false;
    }
    else {
        NTS.loi('Thêm thất bại');
        return false;
    }
})
function ShowDataPermission(ID, UserID) {
    $('.quyen').value(false);
    var ShowDataPermission = NTS.getAjax("/HeThong/Users/ShowDataPermission", { ID: ID });
    var str = new String(ShowDataPermission[0].Permission);
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
function SuaChucNang(ID) {
    if (!ntspermiss.sua) {
        NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác cập nhật. Vui lòng kiểm tra lại.");
        return false;
    }
    $('#tieuDeModal').text('Cập nhật người dùng');
    $('#mdThemMoi').modal('show');
    tempthem = "sua";
    $('input[name=quyen]').attr('checked', false);
    $('#TatCa').attr('checked', false);
    $('#QuyenTatCa').attr('checked', false);
    $('#TenDangNhap').attr('disabled', 'disabled');
    $('#MatKhau').attr('disabled', 'disabled');
    $('.div-MatKhau').hide();
    var result = NTS.getAjax('/HeThong/Users/LoadDuLieuSua', { ma: ID });
    if (result.length > 0) {
        $('#TenDangNhap').value(result[0].TenDangNhap);
        $('#DangSD').value(result[0].DangSD);
        UpdateLabelDangSD('#DangSD');
        $('#MatKhau').value(result[0].MatMa);
        $('#MaXacNhan').value(result[0].MaXacNhan);
        $('#Email').val(result[0].Email);
        $('#NhomNguoiDung').value(result[0].UserGroupID);
        $('#UserID').val(result[0].UserID);
        $('#DonVi_noicongtac').value(result[0].DonViID);
        $('#TrangChu').value(result[0].MenuID);

        setTimeout(() => {
            LoadDataTable2($('#UserID').val());

        }, "300");
    }
    else {
        NTS.loi('Tải dữ liệu sửa thất bại')
    }
}
$(document).on('click', '#TatCa', function () {
    $('.quyen').prop('checked', this.checked);
    $('#GanTatCa').prop('checked', false);
});
$(document).ready(function () {
    if ($('input[name = quyen]').prop('checked')) {
        $('#TatCa').prop('checked', true);
    }

});
$(document).on('click', '#ChonHetDonViXetDuyet', function () {
    if ($(this).value() == true) {
        $('#DonViXetDuyet li label').find('input[type=checkbox]').prop('checked', true);
    } else {
        $('#DonViXetDuyet li label').find('input[type=checkbox]').prop('checked', false);
    }
});

$('#btnPrint').on('click', function () {
    Grid1.print(false, true);
    return false;
});

$('#btnExport').on('click', function () {
    Grid1.download("xlsx", file + ".xlsx", { sheetName: "Sheet1" });
});
$(document).on('click', '#btnChonDonVi_noicongtac', async function () {
    $('#mdChonDonVi_us').modal('show');
    Grid_ChonDonVi_us.clearData();
    var GetAll = await NTS.getAjaxAsync("/HeThong/DonVi/GetAllChonDonVi", { ID: $('#hdfDonViID').val() });
    if (!GetAll.Err) {
        Grid_ChonDonVi_us.setData(GetAll.Result);
        Grid_ChonDonVi_us.redraw(true)
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
});

$(document).on('click', '#btnChonDonViVaDong_us', function () {
    if (Grid_ChonDonVi_us.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 đơn vị!');
        return false;
    }
    try {
        var data = Grid_ChonDonVi_us.getSelectedRows()[0]._row.data;
        $('#DonViCode_noicongtac').value(data.DonViCode);
        $('#TenDonVi_noicongtac').value(data.TenDonVi);
        $('#DonVi_noicongtac').value(data.DonViID);
        $('#mdThemMoiHoSo').modal('show');
        $('#mdChonDonVi_us').modal('hide');

        LoadHoSoCBCCVC();
    } catch (e) {
    }
});
function LoadHoSoCBCCVC() {
    NTS.loadDataCombo({
        name: '#HoSoCBCCVCID',
        ajaxUrl: '/QuanLy/DungChung/GetAllHoSoCBCCVC_TheoDonViVaUser',
        ajaxParam: { DonViID: $('#DonVi_noicongtac').value(), UserID: $('#UserID').value() }, //tham số
        columns: 1,
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '',
        showTatCa: !0
    });
}

///////// PHÍM TẮT /////////
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
            if (hotKey == 1)
                debugger
            $('#mdThemMoi').modal('hide');
            e.preventDefault();
            break;
        case 120:
            if (hotKey == 1)
                debugger
            $('#btnLuuVaDong').trigger('click');
            e.preventDefault();
            break;
    }
});