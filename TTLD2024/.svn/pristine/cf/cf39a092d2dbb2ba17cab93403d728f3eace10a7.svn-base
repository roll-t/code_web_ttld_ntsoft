var tempthem = "them";
var tenBangThamChieu = 'HoGiaDinh';
var HinhHoGiaDinhMacDinh = "/Images/HGD.png";
var laChuHo = false;
var soCCCD = "";

$(function () {
    $('#btnChonHoGD').prop('disabled', true);
    checkMacDinhSD('.checkMacDinhSD', 'TrangThai', 'TrangThai');
    LoadTimKiem();
});

$(document).ready(async function () {
    ThietLapCotTrenLuoi(tenBangThamChieu, Grid1); // thiết lập cột trên lưới
    LoadDataTable_ThanhVienHoGD();
    setTimeout(function () {
        $('#DiaBanHanhChinhID_Loai').select2({ width: '100%' });
        $('#Loai').select2({ width: '100%' });
       //LoadDataTable();
    }, 250);
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

//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiem', async function () {
    if ($('#TinhID_TimKiem_us').value() == "") {
        NTS.canhbao("Tỉnh không được bỏ trống!");
        return false;
    }
    if ($('#HuyenID_TimKiem_us').value() == "") {
        NTS.canhbao("Huyện không được bỏ trống!");
        return false;
    }
    LoadDataTable();
    $('#KhungTimKiem').slideUp(200);
    return false;

});

$(document).on('click', '#DongTimKiem', function () {
    $('#KhungTimKiem').slideUp(200);
    return false;
});

function LoadTimKiem() {
    setTimeout(function () {
        NTS.loadDataCombo({
            name: '#TinhID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCTinh_Combo',
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '--Tất cả--',
            showTatCa: !0,
            //indexDefault: 3,
        });
        NTS.loadDataCombo({
            name: '#HuyenID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
            ajaxParam: { id: '' },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '--Tất cả--',
            showTatCa: !0,
            //indexDefault: 3,
        });
        NTS.loadDataCombo({
            name: '#XaID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
            ajaxParam: { id: '' },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '--Tất cả--',
            showTatCa: !0,
            //indexDefault: 3,
        });
        NTS.loadDataCombo({
            name: '#ThonID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
            ajaxParam: { id: '' },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '--Tất cả--',
            showTatCa: !0,
            //indexDefault: 3,
        });
        //--------------Trong form---------------//
        NTS.loadDataCombo({
            name: '#TinhID_TT,#TinhID_HN',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCTinh_Combo',
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '-Chọn-',
            showTatCa: !0,
            indexDefault: 3,
        });
        //NTS.loadDataCombo({
        //    name: '#HuyenID_TT,#HuyenID_HN',
        //    ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
        //    ajaxParam: { id: '' },
        //    columns: 2,
        //    indexValue: 0,
        //    indexText1: 2,
        //    textShowTatCa: '-Chọn-',
        //    showTatCa: !0,
        //    indexDefault: 3,
        //});
        //NTS.loadDataCombo({
        //    name: '#XaID_TT,#XaID_HN',
        //    ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        //    ajaxParam: { id: '' },
        //    columns: 2,
        //    indexValue: 0,
        //    indexText1: 2,
        //    textShowTatCa: '-Chọn-',
        //    showTatCa: !0,
        //    indexDefault: 3,
        //});
        //NTS.loadDataCombo({
        //    name: '#ThonID_TT,#ThonID_HN',
        //    ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        //    ajaxParam: { id: '' },
        //    columns: 2,
        //    indexValue: 0,
        //    indexText1: 2,
        //    textShowTatCa: '-Chọn-',
        //    showTatCa: !0,
        //    indexDefault: 3,
        //});
        PhanQuyenComBoDiaBan('TinhID_TimKiem_us', 'HuyenID_TimKiem_us', 'XaID_TimKiem_us', 'ThonID_TimKiem_us');
    }, 100);
}
//-----------------------Change bộ lọc-------------------------//
$(document).on('change', '#TinhID_TimKiem_us', function () {
    NTS.loadDataCombo({
        name: '#HuyenID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
        ajaxParam: { id: $('#TinhID_TimKiem_us').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '--Tất cả--',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#XaID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: '' },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '--Tất cả--',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#ThonID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '--Tất cả--',
        showTatCa: !0
    });
});
$(document).on('change', '#HuyenID_TimKiem_us', function () {
    NTS.loadDataCombo({
        name: '#XaID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: $('#HuyenID_TimKiem_us').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '--Tất cả--',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#ThonID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '--Tất cả--',
        showTatCa: !0
    });
});
$(document).on('change', '#XaID_TimKiem_us', function () {
    NTS.loadDataCombo({
        name: '#ThonID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: $('#XaID_TimKiem_us').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '--Tất cả--',
        showTatCa: !0
    });
});

function formaterDangSD(value, ID) {
    return ` <div class="form-group">
                <label class="form-check form-switch">
                    <input class="form-check-input checkDangSD" type="checkbox" data='${ID}' id="customCheckbox1${ID}" ` + (value ? 'checked' : '') + `>
                    <label class="form-check-label" for="customCheckbox1${ID}"></label>
                </label>
                
            </div>`;
}

function formaterDangSDDT(value, ID) {
    return ` <div class="form-group">
                <label class="form-check form-switch">
                    <input class="form-check-input checkDangSDDT" type="checkbox" data='${ID}' id="customCheckbox1${ID}" ` + (value ? 'checked' : '') + `>
                    <label class="form-check-label" for="customCheckbox1${ID}"></label>
                </label>
                
            </div>`;
}



var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().HoGiaDinhID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().HoGiaDinhID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().HoGiaDinhID);
}

var fmGhiChu = function (cell) {
    var ID = cell.getData().HoGiaDinhID;
    var ghiChu = cell.getValue();
    if (ghiChu != "") {
        if (ghiChu.length > 40) {
            ghiChu = ghiChu.substring(0, 23) + "...";
            return `
                        <div class="col-md-12" style="padding-right: 0px; padding-left: 0px; padding-bottom:4px;">
                            <div class="Content-text">${ghiChu}<span class='btnXemThemGhiChu' style='color:var(--tblr-primary);'  title="Xem chi tiết ghi chú" data='${ID}' data-loai='TC'>Xem thêm</span></div>
                        </div>`;
        } else {
            return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${ghiChu}</p>
                    </div>`;
        }
    } else {
        return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${ghiChu}</p>
                    </div>`;
    }
}

function actionDropdownFormatter(cell, formatterParams, onRendered) {
    var ID = cell.getData().HoGiaDinhID;
    var TrangThai = cell.getData().TrangThai;

    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
       <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
       <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
           <a class="dropdown-item btnXemTT " href="#" data="${ID}" >
                <i class="fa fa-eye " aria-hidden="true" style="paddding-right:10px; color:#019017;"></i>&ensp;  Xem thông tin hộ gia đình
           </a>
            <a class="dropdown-item btnThemTV " href="#" data="${ID}">
                <i class="fa fa-solid fa-plus text-info" style="color:var(--tbl-btn-luuvadong) !important;font-weight: bold;font-size: 17px;" aria-hidden="true"></i>&ensp;  Thêm thành viên
           </a>
           <a style="display: ${TrangThai == "Đã tổng hợp" ? "none" : "block"}" class="dropdown-item btnSuaTT  " href="#" data="${ID}">
                <i class="fa fa-pencil text-warning" aria-hidden="true"></i>&ensp;  Chỉnh sửa hộ gia đình
           </a>
            <a style="display: ${TrangThai == "Đã tổng hợp" ? "none" : "block"}" class="dropdown-item btnXoaTT" href="#" data="${ID}">
                <i class='fa fa-trash-o  text-danger'></i>&ensp;  Xóa hộ gia đình
           </a>
           <a class="dropdown-item btnXuatTK " href="#" data="${ID}">
                <i class="fa fa-download text-primary" style="color: #4299E1 !important;font-size: 15px;" aria-hidden="true"></i>&ensp;  Xuất danh sách thành viên
           </a>           
       </div>
       </div>`;

    return select;
}

//-------------------Grid hộ gia đình---------------//
var Grid1 = new Tabulator("#Grid1", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: window.innerHeight * 79 / 100,
    columns: [
        {
            title: '<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
            field: "actions",
            formatter: actionDropdownFormatter, width: 60, headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", headerSort: false
        },
        { title: "Mã hộ", field: "MaHoGiaDinh", formatter: 'textarea', width: 150, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Họ và tên chủ hộ", field: "HoVaTenChuHo", formatter: 'textarea', width: 180, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Số giấy tờ", field: "SoGiayTo", formatter: 'textarea', width: 200, vertAlign: "middle", width: 184, headerHozAlign: "center" },
        { title: "CMND/CCCD/Số định danh", field: "SoCCCD", formatter: 'textarea', width: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Ngày cấp", field: "NgayCap", formatter: 'textarea', vertAlign: "middle", width: 120, headerHozAlign: "center", hozAlign: "center" },
        { title: "Ngày sinh", field: "NgayThangNamSinh", formatter: 'textarea', vertAlign: "middle", width: 120, headerHozAlign: "center", hozAlign: "center" },
        { title: "Giới tính", field: "TenGioiTinh", formatter: 'textarea', width: 120, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Số điện thoại", field: "SoDienThoai", formatter: 'textarea', width: 120, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Phân loại hộ", field: "TenLoaiHo", formatter: 'textarea', width: 120, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Nơi cấp", field: "TenNoiCap", formatter: 'textarea', width: 247, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Email", field: "Email", formatter: 'textarea', width: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Dân tộc", field: "TenDanToc", formatter: 'textarea', width: 120, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Quốc tịch", field: "TenQuocTich", formatter: 'textarea', width: 150, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Tôn giáo", field: "TenTonGiao", formatter: 'textarea', width: 150, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Nơi thường trú", field: "DiaChiCuTheTT", formatter: 'textarea', vertAlign: "middle", minWidth: 247, headerHozAlign: "center" },
        { title: "Thôn/Xóm", field: "DiaBanHCID_ThonTT", formatter: 'textarea', vertAlign: "middle", minWidth: 200, headerHozAlign: "center" },
        { title: "Phường/Xã", field: "DiaBanHCID_XaTT", formatter: 'textarea', vertAlign: "middle", minWidth: 200, headerHozAlign: "center" },
        { title: "Quận/Huyện", field: "DiaBanHCID_HuyenTT", formatter: 'textarea', vertAlign: "middle", minWidth: 200, headerHozAlign: "center" },
        { title: "Tỉnh/Thành phố", field: "DiaBanHCID_TinhTT", formatter: 'textarea', vertAlign: "middle", minWidth: 200, headerHozAlign: "center" },
        { title: "Ghi chú", field: "GhiChu", formatter: fmGhiChu, hozAlign: "left", minWidth: 250, vertAlign: "middle", headerHozAlign: "center", headerSort: false },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 130, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThaiText", hozAlign: "center", width: 200, formatter: 'textarea', headerSort: false, vertAlign: "middle", headerHozAlign: "center", visible: false },
        { title: "HoGiaDinhID", field: "HoGiaDinhID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

async function LoadDataTable() {
    var saveData = new Array();
    saveData[0] = $('#TinhID_TimKiem_us').value();
    saveData[1] = $('#HuyenID_TimKiem_us').value();
    saveData[2] = $('#XaID_TimKiem_us').value();
    saveData[3] = $('#ThonID_TimKiem_us').value();
    saveData[4] = $('#timKiem').value();
    Grid1.clearData();
    GridHoGiaDinh_List.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/HoGiaDinh/GetAll", { data: saveData });
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
        Grid1.redraw(1);
        GridHoGiaDinh_List.setData(GetAll.Result);
        GridHoGiaDinh_List.redraw(1);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
    GridKhongCoDuLieu("Grid1");
}

// Xem chi tiết nội dung ghi chú hộ gia đình
$(document).on('click', '.btnXemThemGhiChu', function () {
    $('#HoGiaDinhID').val($(this).attr('data'));
    XemChiTietGhiChu($(this).attr('data'));
});

function XemChiTietGhiChu(ID) {
    $("#mdXemThem").modal('show');
    $('#tieuDeModalCT').text('Chi tiết nội dung ghi chú');
    const result = NTS.getAjax("/DanhMuc/HoGiaDinh/GhiChuCT", { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#NoiDungGhiChu_CT').html(data.GhiChu);
    } else {
        $('#NoiDungGhiChu_CT').html("Chưa có dữ liệu");
    }
    return;
}

// Xem chi tiết nội dung ghi chú thành viên hộ gia đình
$(document).on('click', '.btnXemThemGhiChuDT', function () {
    $('#ThanhVienHoGDID').val($(this).attr('data'));
    XemChiTietGhiChuDT($(this).attr('data'));
});

function XemChiTietGhiChuDT(ID) {
    $("#mdXemThem").modal('show');
    $('#tieuDeModalCT').text('Chi tiết nội dung ghi chú');
    const result = NTS.getAjax("/DanhMuc/HoGiaDinh/GhiChuDT_CT", { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#NoiDungGhiChu_CT').html(data.GhiChu);
    } else {
        $('#NoiDungGhiChu_CT').html("Chưa có dữ liệu");
    }
    return;
}

checkDangSD('.checkDangSD', 'HoGiaDinh', 'HoGiaDinhID');



$('#TrangThai').on('change', function () {
    UpdateLabelDangSD(this);
});

$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        Grid1.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid1.setFilter(matchAny, { value: $('#timKiem').val() });
});

var GridHoGiaDinh_List = new Tabulator("#GridHoGiaDinh_List", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "595",
    HeaderVertAlign: "center",
    headerVisible: false,
    selectable: 1,
    selectableRows: 1,
    columns: [
        { title: "Thông tin hộ gia đình", field: "ThongTinNguoiThamGia", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 300, headerSort: false },
        { title: "HoGiaDinhID", field: "HoGiaDinhID", width: 0, visible: false }
    ],
    rowFormatter: function (row) {
        var element = row.getElement(),
            data = row.getData(),
            width = element.offsetWidth,
            rowTable, cellContents;
        while (element.firstChild) element.removeChild(element.firstChild);
        rowTable = document.createElement("table")
        rowTable.style.width = (width - 18) + "px";
        rowTabletr = document.createElement("tr");
        rowTabletr.classList.add("btnXemTTHoGD");
        rowTabletr.setAttribute("data-value", data.HoGiaDinhID);
        cellContents = "<td><div class='info-img-list-container'>" + TraVeTenVietTat(data.HoVaTenChuHo) + "</div></td>";
        cellContents += "<td><div style='text-align: left;width: 240px;white-space: break-spaces;'><strong>" + data.HoVaTenChuHo + "</strong> </div><div style='text-align: left !important;font-size: 12px!important;width: 240px;white-space: break-spaces;'>" + data.DiaChiCuTheTT + "</div></td>"
        rowTabletr.innerHTML = cellContents;
        rowTable.appendChild(rowTabletr);
        element.append(rowTable);
    },
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

$(document).on('keyup', '#timKiem', async function (e) {
    if (e.keyCode == '13') {
        await LoadDataTable();
        $('#KhungTimKiem').slideUp(200);
        return false;
    }
});

$(document).on('keyup', '#timKiemDV_us', async function (e) {
    if (e.keyCode == '13') {
        await LoadGrid_ChonHoGD_us();
        return false;
    }
});

//function LoadDataTable_ListHoGD() {
//    var saveData = new Array();
//    saveData[0] = $('#TinhID_TimKiem_us').value();
//    saveData[1] = $('#HuyenID_TimKiem_us').value();
//    saveData[2] = $('#XaID_TimKiem_us').value();
//    saveData[3] = $('#ThonID_TimKiem_us').value();
//    saveData[4] = $('#timKiem').value();
//    GridHoGiaDinh_List.clearData();
//    //const GetAll = NTS.getAjax("/DanhMuc/DungChung/GetHoGiaDinh", {});
//    const GetAll = NTS.getAjax("/DanhMuc/HoGiaDinh/GetAll", { data: saveData });
//    if (!GetAll.Err) {
//        GridHoGiaDinh_List.setData(GetAll.Result);
//    }
//    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);

//}

async function LoadDataTable_ThanhVienHoGDView2(ID) {
    Grid_ThanhVien_USHoGiaDinh.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/HoGiaDinh/ThanhVienHoGD_ThuocHoGD", { id: ID });
    if (!GetAll.Err) {
        Grid_ThanhVien_USHoGiaDinh.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

GridHoGiaDinh_List.on("rowClick", function (e, row) {
    var ID = row.getData().HoGiaDinhID;
    LoadDataChuHoGD(ID);
    LoadDataTable_ThanhVienHoGDView(ID);
    LoadDataTable_TaiLieuLuuGiuTabTT(ID);
    $('#btnSua2').attr("data", ID);
    $('#btnThem2').attr("data", ID);
    $('#btnXoa2').attr("data", ID);
    $('#btnXem2').attr("data", ID);
    $('#btnXuatDanhSachThanhVien2').attr("data", ID);
    $('#HoGiaDinhID').value(row.getData().HoGiaDinhID);
});

$(document).on('click', '#btnSua2', function () {
    var ID = $(this).attr('data')
    if (typeof ID !== 'undefined') {
        SuaDuLieu(ID);
    } else {
        if (GridHoGiaDinh_List.getSelectedRows().length == 0) {
            NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
            return false;
        }
    }
});

function LoadDataChuHoGD(ID) {
    if (ID != "") {
        const result = NTS.getAjax('/DanhMuc/HoGiaDinh/LoadDuLieuSua', { id: ID });
        if (!result.Err && result.Result != null) {
            let data = result.Result[0];
            $('#TenVietTat_Tab2').html(TraVeTenVietTat(data.HoVaTenChuHo));
            $('#drop_GiayTo').attr('data-value', data.LoaiHoGD);
            if (data.LoaiHoGD == 1) {
                $('#lblLoaiGiayTo_View').html("Sổ hộ khẩu");
            } else {
                $('#lblLoaiGiayTo_View').html("Sổ tạm trú");
            }
            if (data.NgayThangNamSinh === '' || data.NgayThangNamSinh === null) {
                $('#lblNgaySinh_View').html('---');
            } else {
                $('#lblNgaySinh_View').html(data.NgayThangNamSinh);
            }
            if (data.NgayCap === '' || data.NgayCap === null) {
                $('#lblNgayCap_View').html('---');
            } else {
                $('#lblNgayCap_View').html(data.NgayCap);
            }
            if (data.GhiChu === '' || data.GhiChu === null) {
                $('#lblGhiChu_View').html(`<p style="display: inline;font-weight: normal;">Ghi chú:</p> ` + '---');
            } else {
                $('#lblGhiChu_View').html(`<p style="display: inline;font-weight: normal;">Ghi chú:</p> ` + data.GhiChu);
            }
            if (data.SoDienThoai === '' || data.SoDienThoai === null) {
                $('#lblSoDienThoai_View').html('---');
            } else {
                $('#lblSoDienThoai_View').html(data.SoDienThoai);
            }
            if (data.Email === '' || data.Email === null) {
                $('#lblEmail_View').html('---');
            } else {
                $('#lblEmail_View').html(data.Email);
            }
            if (data.TenLoaiHo === '' || data.TenLoaiHo === null) {
                $('#lblPhanLoaiHo_View').html('---');
            } else {
                $('#lblPhanLoaiHo_View').html(data.TenLoaiHo);
            }
            $('#lblSoiGiayTo_View').html(data.SoGiayTo);
            $('#lblHoTenChuHoMain_View').html(data.HoVaTenChuHo + ' (' + data.SoGiayTo + ') - Mã hộ: ' + data.MaHoGiaDinh);
            $('#lblHoVaTen_View').html(data.HoVaTenChuHo);
            $('#lblGioiTinh_View').html(data.TenGioiTinh);
            $('#lblCMND_View').html(data.SoCCCD);
            $('#lblNgaySinh_View').html(data.NgayThangNamSinh);
            $('#lblNoiCap_View').html(data.TenNoiCap);
            $('#lblDanToc_View').html(data.TenDanToc);
            $('#lblTonGiao_View').html(data.TenTonGiao);
            $('#lblQuocTich_View').html(data.TenQuocTich);
            $('#lblDiaChi_View').html(data.DiaChiCuTheTT);
            $('#lblDiaChiThuongTru_View').html(data.DiaChiCuTheTT);
            $('#lblTinh_View').html(data.Tinh);
            $('#lblHuyen_View').html(data.Huyen);
            $('#lblXa_View').html(data.Xa);
            $('#lblThon_View').html(data.Thon);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    } else {
        $('#lblLoaiGiayTo_View').html("---");
        $('#lblNgaySinh_View').html('---');
        $('#lblNgayCap_View').html('---');
        $('#lblGhiChu_View').html('---');
        $('#lblSoDienThoai_View').html('---');
        $('#lblEmail_View').html('---');
        $('#lblSoiGiayTo_View').html('---');
        $('#lblHoTenChuHoMain_View').html('');
        $('#lblHoVaTen_View').html('---');
        $('#lblGioiTinh_View').html('---');
        $('#lblCMND_View').html('---');
        $('#lblNgaySinh_View').html('---');
        $('#lblDanToc_View').html('---');
        $('#lblTonGiao_View').html('---');
        $('#lblQuocTich_View').html('---');
        $('#lblDiaChi_View').html('Chưa có thông tin');
        $('#lblDiaChiThuongTru_View').html('---');
        $('#lblTinh_View').html('---');
        $('#lblHuyen_View').html('---');
        $('#lblXa_View').html('---');
        $('#lblThon_View').html('---');
        $('#lblNoiCap_View').html('---');
        $('#lblPhanLoaiHo_View').html('---');
    }
}

var fmGhiChuDT = function (cell) {
    var ID = cell.getData().HoGiaDinhID;
    var ghiChu = cell.getValue();
    if (ghiChu != "") {
        if (ghiChu.length > 40) {
            ghiChu = ghiChu.substring(0, 23) + "...";
            return `
                        <div class="col-md-12" style="padding-right: 0px; padding-left: 0px; padding-bottom:4px;">
                            <div class="Content-text">${ghiChu}<span class='btnXemThemGhiChu' style='color:var(--tblr-primary);'  title="Xem chi tiết ghi chú" data='${ID}' data-loai='TC'>Xem thêm</span></div>
                        </div>`;
        } else {
            return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${ghiChu}</p>
                    </div>`;
        }
    } else {
        return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${ghiChu}</p>
                    </div>`;
    }
}

var fmDangSDDT = function (cell) {
    return formaterDangSDDT(cell.getValue(), cell.getData().ThanhVienHoGDID);
}
function actionDropdownFormatterThanhVienHoGiaDinh(cell, formatterParams, onRendered) {
    var ID = cell.getData().ThanhVienHoGDID;
    var ChuHo = cell.getData().ChuHo;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
       <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
       <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
           <a class="dropdown-item btnXemTTThanhVien " href="#" data="${ID}" >
                <i class="fa fa-eye " aria-hidden="true" style="paddding-right:10px; color:#019017;"></i>&ensp;  Xem thông tin thành viên
           </a>           
           <a class="dropdown-item btnSuaDoiTuong" href="#" data="${ID}">
                <i class="fa fa-pencil text-warning" aria-hidden="true"></i>&ensp;  Chỉnh sửa thành viên
           </a>
            ` + (ChuHo == 1 ? `` : ` <a class="dropdown-item btnXoaDoiTuong" href="#" data="${ID}">
            <i class='fa fa-trash-o  text-danger'></i>&ensp; Xóa thành viên
           </a>    `) + `
                            
       </div>
       </div>`;

    

    return select;
}
var Grid_ThanhVien_View = new Tabulator("#Grid_ThanhVien_View", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "350",
    HeaderVertAlign: "center",
    columns: [

        {
            title: "<button id='' class='btn btn-xs btn-primary btnThemDoiTuong_View' style='background-color: #f3f4f5;font-size: 20px;'><i class='fa fa-plus' aria-hidden='true' style='color: var(--tbl-btn-luuvadong);'></i></button>"
            , formatter: actionDropdownFormatterThanhVienHoGiaDinh
            , headerSort: false, headerHozAlign: "Center", hozAlign: "center", field: "ThaoTac", width: 60, vertAlign: "middle",
        },
        { title: "Họ và tên", field: "HoVaTen", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", visible: true, width: 150 },
        { title: "Quan hệ với chủ hộ", field: "TenQuanHe", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 120 },
        { title: "CMND/CCCD/Số định danh", field: "SoCCCD", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 200 },
        { title: "Ngày sinh", field: "NgayThangNamSinh", formatter: 'textarea', headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", width: 120 },
        { title: "Giới tính", field: "TenGioiTinh", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 120, },
        { title: "Số diện thoại", field: "SoDienThoai", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 120, },
        { title: "Nơi thường trú", field: "DiaChiCuTheTT", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 250, },
        //{ title: "Ngày cấp", field: "NgayCap", formatter: 'textarea', headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", width: 100, visible: false  },
        //{ title: "Nơi cấp", field: "TenNoiCap", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 200, visible: false  },
        { title: "Ghi chú", field: "GhiChu", hozAlign: "left", headerHozAlign: "center", formatter: fmGhiChuDT, vertAlign: "middle", width: 250, headerSort: false },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 130, formatter: fmDangSDDT, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "ThanhVienHoGDID", field: "ThanhVienHoGDID", width: 0, visible: false },
        { title: "HoGiaDinhID", field: "HoGiaDinhID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

Grid_ThanhVien_View.on("rowDblClick", function (e, row) {
    $('#ThanhVienHoGDID').val(row.getData().ThanhVienHoGDID);
    SuaDuLieuThanhVienHoGD_us(row.getData().ThanhVienHoGDID, $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
});

$(document).on('click', '.btnThemDoiTuong_View', function () {
    if (GridHoGiaDinh_List.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
        return false;
    } else {
        var row = GridHoGiaDinh_List.getSelectedRows()[0]; // Lấy dòng đang được chọn trên lưới
        var ID = row.getData().HoGiaDinhID;
        // Ẩn chọn hộ gia đình trong combo của modal thêm đối tượng
        actionShowModal = false;
        $('#SelectChuHo_US').prop('disabled', true);
        showModalThemDoiTuong(ID, $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '', 'them', '12');
    }
});

async function LoadDataTable_ThanhVienHoGDView(ID) {
    Grid_ThanhVien_View.clearData();
    const GetAll =await  NTS.getAjaxAsync("/DanhMuc/HoGiaDinh/ThanhVienHoGD_ThuocHoGD", { id: ID });
    if (!GetAll.Err) {
        Grid_ThanhVien_View.setData(GetAll.Result);
        Grid_ThanhVien_View.redraw(1);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}



$(document).on('click', '#btnThemMoi', function () {
    showModalThemMoi();
});

Grid1.on("rowDblClick", function (e, row) {
    $('#HoGiaDinhID').val(row.getData().HoGiaDinhID);
    SuaDuLieu(row.getData().HoGiaDinhID);
});


$(document).on('click', '#btnSuaHGD_Buoc2', function () {
    var ID = $('#HoGiaDinhID').value();
    SuaDuLieu(ID);
});

$(document).on('click', '#btnThem2', function () {
    var ID = $(this).attr('data');
    if (typeof ID !== 'undefined') {
        LoadThongTinChuHoBuoc2(ID);
        actionShowModal = false;
        $('#SelectChuHo_US').prop('disabled', true);
        showModalThemDoiTuong(ID, $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '', 'them', '12');
        var ID = $('#HoGiaDinhID').value();
        const kq = NTS.getAjax('/DanhMuc/HoGiaDinh/LoadDuLieuSua', { id: ID });
        if (!kq.Err && kq.Result != null) {
            let data = kq.Result[0];
            $('#lblTenHoGiaDinh_ThanhVien_us').html(data.HoVaTenChuHo);
            $('#HoGiaDinhID').value(data.HoGiaDinhID);
            return false;
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
        return false;
    } else {
        if (GridHoGiaDinh_List.getSelectedRows().length == 0) {
            NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
            return false;
        }
    }
});

$(document).on('click', '#btnXem2', function () {
    $('#mdXemTTHoGiaDinhCT').html('Xem thông tin hộ gia đình: ');
    var ID = $(this).attr('data');
    if (typeof ID !== 'undefined') {
        $('#mdXemChiTiet_usHoGiaDinh').modal('show');
        const result = NTS.getAjax('/DanhMuc/HoGiaDinh/LoadDuLieuSua', { id: ID });
        if (!result.Err && result.Result != null) {
            let data = result.Result[0];
            $('#mdXemTTHoGiaDinhCT').html('Xem thông tin hộ gia đình: ' + data.HoVaTenChuHo.toUpperCase());
            $('#drop_GiayTo').attr('data-value', data.LoaiHoGD);
            if (data.LoaiHoGD == 1) {
                $('#lblSoHoKhau_USHoGiaDinh').html("Sổ hộ khẩu");
            } else {
                $('#lblSoHoKhau_USHoGiaDinh').html("Sổ tạm trú");
            }
            if (data.NgayThangNamSinh === '' || data.NgayThangNamSinh === null) {
                $('#lblNgaySinh_USHoGiaDinh').html('---');
            } else {
                $('#lblNgaySinh_USHoGiaDinh').html(data.NgayThangNamSinh);
            }
            if (data.NgayCap === '' || data.NgayCap === null) {
                $('#lblNgayCap_USHoGiaDinh').html('---');
            } else {
                $('#lblNgayCap_USHoGiaDinh').html(data.NgayCap);
            }

            if (data.GhiChu === '' || data.GhiChu === null) {
                $('#lblGhiChu_USHoGiaDinh').html(`<p style="display: inline;font-weight: normal;">Ghi chú:</p> ` + '---');
            } else {
                $('#lblGhiChu_USHoGiaDinh').html(`<p style="display: inline;font-weight: normal;">Ghi chú:</p> ` + data.GhiChu);
            }
            $('#lblSoGiayTo_USHoGiaDinh').html(data.SoGiayTo);
            $('#lblHoVaTen_USHoGiaDinh').html(data.HoVaTenChuHo);
            $('#lblGioiTinh_USHoGiaDinh').html(data.TenGioiTinh);
            $('#lblMaDinhDanh_USHoGiaDinh').html(data.SoCCCD);
            $('#lblNoiCap_USHoGiaDinh').html(data.TenNoiCap);
            $('#lblDanToc_USHoGiaDinh').html(data.TenDanToc);
            $('#lblTonGiao_USHoGiaDinh').html(data.TenTonGiao);
            $('#lblSoDienThoai_USHoGiaDinh').html(data.SoDienThoai);
            $('#lblEmail_USHoGiaDinh').html(data.Email);
            $('#lblQuocTich_USHoGiaDinh').html(data.TenQuocTich);
            $('#lblMaDiaChi_USHoGiaDinh').html(data.DiaChiCuTheTT);
            $('#lblTinh_USHoGiaDinh').html(data.Tinh);
            $('#lblHuyen_USHoGiaDinh').html(data.Huyen);
            $('#lblXa_USHoGiaDinh').html(data.Xa);
            $('#lblThon_USHoGiaDinh').html(data.Thon);
            LoadDataTable_ThanhVienHoGDView2(ID);
            LoadDataTable_TaiLieuLuuGiuView(ID);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    } else {
        if (GridHoGiaDinh_List.getSelectedRows().length == 0) {
            NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
            return false;
        }
    }

});

$(document).on('click', '#btnLuuVaDongHGD', function () {
    const validate = new NTSValidate('#mdThemMoiHGD');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }

    //Kiểm tra năm sinh và năm được cấp số CCCD
    var ngaySinh = new Date($('#NgaySinh').val()).getFullYear();
    var ngayCapCCCD = new Date($('#NgayCapSoDinhDanh').val()).getFullYear();

    if (ngaySinh >= ngayCapCCCD) {
        NTS.canhbao("Năm sinh không được lớn hơn năm cấp Số CMND/CCCD/Số định danh cá nhân!");
        return false;
    }

    if (!checkAge($('#NgaySinh').value())) {
        // Ngày sinh không đủ 15 tuổi
        NTS.canhbao("Ngày sinh không được nhỏ hơn 15 tuổi!");
        return false;
    }
    if ($('#SoDinhDanh').val().length !== 12 && $('#SoDinhDanh').val().length !== 9) {
        NTS.canhbao("Số CMND/CCCD/Số định danh cá nhân chưa đúng định dạng!");
        return false;
    }

    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#HoGiaDinhID').value();
    saveData[2] = $('#MaHo').value();
    saveData[3] = $('#HoVaTen').value();
    saveData[4] = $('#SoDinhDanh').value();
    saveData[5] = $('#NgayCapSoDinhDanh').value();
    saveData[6] = $('#NoiCap_TinhID').value();
    saveData[7] = $('#GioiTinhID').value();
    saveData[8] = $('#NgaySinh').value();
    saveData[9] = $('#QuocTichID').value();
    saveData[10] = $('#DanTocID').value();
    saveData[11] = $('#TonGiaoID').value();
    saveData[12] = $('#SoDienThoai').value();
    saveData[13] = $('#Email').value();
    saveData[14] = $('#PhanLoaiHoID').value();
    saveData[15] = $('#drop_GiayTo').attr('data-value');
    saveData[16] = $('#SoGiayTo').value();
    saveData[17] = $('#SoNha_TT').value();
    saveData[18] = $('#ThonID_TT').value();
    saveData[19] = $('#XaID_TT').value();
    saveData[20] = $('#HuyenID_TT').value();
    saveData[21] = $('#TinhID_TT').value();
    saveData[22] = $('#DiaChiThuongTru').value();
    saveData[23] = $('#GhiChu').value();
    saveData[24] = $('#TrangThai').value();
    saveData[25] = "";
    saveData[26] = soCCCD;
    var result = NTS.getAjax('/DanhMuc/HoGiaDinh/LuuThongTin', { data: saveData });
    if (!result.Err) {
        if (result.Logs == "1") {
            CanhBaoTrungSoDinhDanhDoiTuong(() => { }, result.Msg);
        } else if (result.Logs == "0") {
            CanhBaoTrungThanhVien(() => {
                var dataArr = new Array();
                dataArr[0] = saveData[2];
                dataArr[1] = saveData[15];
                dataArr[2] = saveData[16];
                dataArr[3] = result.Result;
                dataArr[4] = saveData[14];
                var data = NTS.getAjax('/DanhMuc/HoGiaDinh/CapNhatThongTinDTQuaHGD', { data: dataArr });
                if (!data.Err) {
                    var HGD = data.Result.HoGiaDinh[0];
                    LoadDataTable();
                    NTS.thanhcong(data.Msg);
                    soCCCD = "";
                    tempthem = "sua";
                    $('#HoGiaDinhID').value(HGD.HoGiaDinhID);
                    $('#MaHo').value(HGD.MaHoGiaDinh);
                    $('#HoVaTen').value(HGD.HoVaTenChuHo);
                    $('#SoDinhDanh').value(HGD.SoCCCD);
                    $('#NgayCapSoDinhDanh').value(convertDateTime(HGD.NgayCap));
                    $('#NoiCap_TinhID').value(HGD.NoiCapID);
                    $('#GioiTinhID').value(HGD.GioiTinhID);
                    $('#NgaySinh').value(convertDateTime(HGD.NgayThangNamSinh));
                    $('#QuocTichID').value(HGD.QuocTichID);
                    $('#DanTocID').value(HGD.DanTocID);
                    $('#TonGiaoID').value(HGD.TonGiaoID);
                    $('#SoDienThoai').value(HGD.SoDienThoai);
                    $('#Email').value(HGD.Email);
                    if (HGD.LoaiHoGD == 1) {
                        $('#drop_GiayTo').html(' Sổ hộ khẩu &nbsp; <i class="fa-solid fa-caret-down"></i>');
                    } else {
                        $('#drop_GiayTo').html(' Sổ tạm trú &nbsp; <i class="fa-solid fa-caret-down"></i>');
                    }
                    $('#SoGiayTo').value(HGD.SoGiayTo);
                    $('#SoNha_TT').value(HGD.SoNhaTT);
                    $('#TinhID_TT').value(HGD.DiaBanHCID_TinhTT);
                    $('#HuyenID_TT').value(HGD.DiaBanHCID_HuyenTT);
                    $('#XaID_TT').value(HGD.DiaBanHCID_XaTT);
                    $('#ThonID_TT').value(HGD.DiaBanHCID_ThonTT);
                    $('#DiaChiThuongTru').value(HGD.DiaChiCuTheTT);
                    $('#GhiChu').value(HGD.GhiChu);
                    $('#TrangThai').value(HGD.TrangThai);
                    soCCCD = HGD.SoCCCD;
                } else {
                    result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
                }
            }, () => { }, result.Msg);
        } else {
            LoadDataTable();
            LoadDataChuHoGD(result.Result);
            NTS.thanhcong(result.Msg);
            $('#mdThemMoiHGD').modal('hide');
            soCCCD = "";
            return false;
        }
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});

$(document).on('click', '.btnSuaTT', function () {
    $('#HoGiaDinhID').val($(this).attr('data'));
    SuaDuLieu($(this).attr('data'));
});

$(document).on('click', '#btnXuatDanhSachThanhVien2', async function () {

    var ID = $(this).attr('data');
    if (typeof ID !== 'undefined') {
        var kq = await NTS.getAjaxAsync('/DanhMuc/HoGiaDinh/XuatExcel_ThanhVienHoGD', { id: ID });
        if (!kq.Err) {
            window.open(kq);
        } else {
            NTS.loi(kq.Msg);
        }
    } else {
        if (GridHoGiaDinh_List.getSelectedRows().length == 0) {
            NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
            return false;
        }
    }
});

$(document).on('click', '.btnXuatTK',async function () {

    var ID = $(this).attr('data');
    var kq = await NTS.getAjaxAsync('/DanhMuc/HoGiaDinh/XuatExcel_ThanhVienHoGD', { id: ID });
    if (!kq.Err) {
        window.open(kq);
    } else {
        NTS.loi(kq.Msg);
    }
});

$(document).on('click', '.btnThemTV', function () {
    var ID = $(this).attr('data');
    actionShowModal = false;
    $('#SelectChuHo_US').prop('disabled', true);
    // Ẩn chủ hộ khi thêm mới thành viên cho hộ gia đình trên combo quan hệ
    showModalThemDoiTuong(ID, $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '', 'them', '12');
    $('#tieuDeModal_ThemThanhVien_us').text('Thêm mới đối tượng');
    tempthem = 'them';
    const kq = NTS.getAjax('/DanhMuc/HoGiaDinh/LoadDuLieuSua', { id: ID });
    if (!kq.Err && kq.Result != null) {
        let data = kq.Result[0];
        $('#lblTenHoGiaDinh_ThanhVien_us').html(data.HoVaTenChuHo);
        $('#HoGiaDinhID').value(data.HoGiaDinhID);
        return false;
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    return false;
});

$(document).on('click', '.btnXemTT', function () {
    $('#mdXemTTHoGiaDinhCT').html('Xem thông tin hộ gia đình: ');
    var ID = $(this).attr('data');
    $('#mdXemChiTiet_usHoGiaDinh').modal('show');

    const result = NTS.getAjax('/DanhMuc/HoGiaDinh/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#mdXemTTHoGiaDinhCT').html('Xem thông tin hộ gia đình: ' + data.HoVaTenChuHo.toUpperCase());
        $('#drop_GiayTo').attr('data-value', data.LoaiHoGD);
        if (data.LoaiHoGD == 1) {
            $('#lblSoHoKhau_USHoGiaDinh').html("Sổ hộ khẩu");
        } else {
            $('#lblSoHoKhau_USHoGiaDinh').html("Sổ tạm trú");
        }
        if (data.NgayThangNamSinh === '' || data.NgayThangNamSinh === null) {
            $('#lblNgaySinh_USHoGiaDinh').html('---');
        } else {
            $('#lblNgaySinh_USHoGiaDinh').html(data.NgayThangNamSinh);
        }
        if (data.NgayCap === '' || data.NgayCap === null) {
            $('#lblNgayCap_USHoGiaDinh').html('---');
        } else {
            $('#lblNgayCap_USHoGiaDinh').html(data.NgayCap);
        }

        if (data.TenLoaiHo === '' || data.TenLoaiHo === null) {
            $('#lblPhanLoaiHo_USHoGiaDinh').html('---');
        } else {
            $('#lblPhanLoaiHo_USHoGiaDinh').html(data.TenLoaiHo);
        }
        if (data.GhiChu === '' || data.GhiChu === null) {
            $('#lblGhiChu_USHoGiaDinh').html(`<p style="display: inline;font-weight: normal;">Ghi chú:</p> ` + '---');
        } else {
            $('#lblGhiChu_USHoGiaDinh').html(`<p style="display: inline;font-weight: normal;">Ghi chú:</p> ` + data.GhiChu);
        }
        $('#lblSoGiayTo_USHoGiaDinh').html(data.SoGiayTo);
        $('#lblHoVaTen_USHoGiaDinh').html(data.HoVaTenChuHo);
        $('#lblGioiTinh_USHoGiaDinh').html(data.TenGioiTinh);
        $('#lblMaDinhDanh_USHoGiaDinh').html(data.SoCCCD);
        $('#lblNoiCap_USHoGiaDinh').html(data.TenNoiCap);
        $('#lblDanToc_USHoGiaDinh').html(data.TenDanToc);
        $('#lblTonGiao_USHoGiaDinh').html(data.TenTonGiao);
        $('#lblQuocTich_USHoGiaDinh').html(data.TenQuocTich);
        $('#lblSoDienThoai_USHoGiaDinh').html(data.SoDienThoai);
        $('#lblEmail_USHoGiaDinh').html(data.Email);
        $('#lblMaDiaChi_USHoGiaDinh').html(data.DiaChiCuTheTT);
        $('#lblTinh_USHoGiaDinh').html(data.Tinh);
        $('#lblHuyen_USHoGiaDinh').html(data.Huyen);
        $('#lblXa_USHoGiaDinh').html(data.Xa);
        $('#lblThon_USHoGiaDinh').html(data.Thon);
        LoadDataTable_ThanhVienHoGDView2(ID);
        LoadDataTable_TaiLieuLuuGiuView(ID);
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);

});

$(document).on('click', '#btnXoa2', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    if (typeof ID !== 'undefined') {
        XoaDuLieu(ID);
    } else {
        if (GridHoGiaDinh_List.getSelectedRows().length == 0) {
            NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
            return false;
        }
    }
});

$(document).on('click', '.btnXoaTT', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieu(ID);
});

function XoaDuLieu(ID) {
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'HoGiaDinhID', ID: ID, TenBangHienTai: 'HoGiaDinh', CacBangKhongXet: ['ThanhVienHoGD'] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            const SoLuong = NTS.getAjax('/DanhMuc/DungChung/SoLuongDoiTuongKhiXoaHoGiaDinh', { ID: ID }).Result;
            CanhBaoXoaTatCaDoiTuong(() => {
                const result = NTS.getAjax('/DanhMuc/HoGiaDinh/XoaDuLieu', { id: ID });
                if (!result.Err) {
                    LoadDataTable();
                    LoadDataChuHoGD('');
                    LoadDataTable_ThanhVienHoGDView('');
                    LoadDataTable_TaiLieuLuuGiuTabTT('');
                    NTS.thanhcong(result.Msg);
                }
                else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            }, () => { }
                , SoLuong[0].SoLuong);
        }
        else CanhBaoDuLieuDangSD(result_ktxoa.Result);
    }
    // Lỗi khi kiểm tra xóa
    else result_ktxoa.CanhBao ? NTS.canhbao(result_ktxoa.Msg) : NTS.loi(result_ktxoa.Msg);
}

//in
$('#btnPrint').on('click', function () {
    Grid1.hideColumn('TrangThai');
    Grid1.showColumn('TrangThaiText');
    Grid1.print(false, true);
    Grid1.showColumn('TrangThai');
    Grid1.hideColumn('TrangThaiText');
    return false;
});
//xuat excel
var dulieuloc = "";
$('#btnExport').on('click', async function () {
    var saveData = new Array();
    saveData[0] = $('#TinhID_TimKiem_us').value();
    saveData[1] = $('#HuyenID_TimKiem_us').value();
    saveData[2] = $('#XaID_TimKiem_us').value();
    saveData[3] = $('#ThonID_TimKiem_us').value();
    saveData[4] = $('#timKiem').value();
    var kq = await NTS.getAjaxAsync('/DanhMuc/HoGiaDinh/XuatExcel_HoGiaDinh', { data: saveData });
    if (!kq.Err) {
        window.open(kq);
    } else {
        NTS.loi(kq.Msg);
    }
});


//-------------------Thay đổi lưới--------------------------//
$(document).on('click', '#btn-layout-1', async function () {
    $('#grid-layout').fadeIn(200);
    $('#list-layout').hide();
    $('#list-layout').removeClass('show');
    $('#grid-layout').addClass('show');

    //await LoadDataTable();
});
$(document).on('click', '#btn-layout-2', async function () {
    $('#grid-layout').hide();
    $('#list-layout').fadeIn(200);
    $('#list-layout').addClass('show');
    $('#grid-layout').removeClass('show');
    LoadDataChuHoGD('');
    Grid_ThanhVien_View.clearData();
    LoadDataTable_TaiLieuLuuGiuTabTT('');
    $('#btnSua2').removeAttr("data");
    $('#btnThem2').removeAttr("data");
    $('#btnXoa2').removeAttr("data");
    $('#btnXem2').removeAttr("data");
    $('#btnXuatDanhSachThanhVien2').removeAttr("data");

});

$('#btnTiepTuc').on('click', function () {
    const validate = new NTSValidate('#mdThemMoiHGD');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }

    //Kiểm tra năm sinh và năm được cấp số CCCD
    var ngaySinh = new Date($('#NgaySinh').val()).getFullYear();
    var ngayCapCCCD = new Date($('#NgayCapSoDinhDanh').val()).getFullYear();

    if (ngaySinh >= ngayCapCCCD) {
        NTS.canhbao("Năm sinh không được lớn hơn năm cấp Số CMND/CCCD/Số định danh cá nhân!");
        return false;
    }
    if (!checkAge($('#NgaySinh').value())) {
        // Ngày sinh không đủ 15 tuổi
        NTS.canhbao("Ngày sinh không được nhỏ hơn 15 tuổi!");
        return false;
    }

    if ($('#SoDinhDanh').val().length !== 12 && $('#SoDinhDanh').val().length !== 9) {
        NTS.canhbao("Số CMND/CCCD/Số định danh cá nhân chưa đúng định dạng!");
        return false;
    }

    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#HoGiaDinhID').value();
    saveData[2] = $('#MaHo').value();
    saveData[3] = $('#HoVaTen').value();
    saveData[4] = $('#SoDinhDanh').value();
    saveData[5] = $('#NgayCapSoDinhDanh').value();
    saveData[6] = $('#NoiCap_TinhID').value();
    saveData[7] = $('#GioiTinhID').value();
    saveData[8] = $('#NgaySinh').value();
    saveData[9] = $('#QuocTichID').value();
    saveData[10] = $('#DanTocID').value();
    saveData[11] = $('#TonGiaoID').value();
    saveData[12] = $('#SoDienThoai').value();
    saveData[13] = $('#Email').value();
    saveData[14] = $('#PhanLoaiHoID').value();
    saveData[15] = $('#drop_GiayTo').attr('data-value');
    saveData[16] = $('#SoGiayTo').value();
    saveData[17] = $('#SoNha_TT').value();
    saveData[18] = $('#ThonID_TT').value();
    saveData[19] = $('#XaID_TT').value();
    saveData[20] = $('#HuyenID_TT').value();
    saveData[21] = $('#TinhID_TT').value();
    saveData[22] = $('#DiaChiThuongTru').value();
    saveData[23] = $('#GhiChu').value();
    saveData[24] = $('#TrangThai').value();
    saveData[25] = "";
    saveData[26] = soCCCD;
    var result = NTS.getAjax('/DanhMuc/HoGiaDinh/LuuThongTin', { data: saveData });
    if (!result.Err) {
        if (result.Logs == "1") {
            CanhBaoTrungSoDinhDanhDoiTuong(() => { }, result.Msg);
        } else if (result.Logs == "0") {
            CanhBaoTrungThanhVien(() => {
                var dataArr = new Array();
                dataArr[0] = saveData[2];
                dataArr[1] = saveData[15];
                dataArr[2] = saveData[16];
                dataArr[3] = result.Result;
                dataArr[4] = saveData[14];
                var data = NTS.getAjax('/DanhMuc/HoGiaDinh/CapNhatThongTinDTQuaHGD', { data: dataArr });
                if (!data.Err) {
                    var HGD = data.Result.HoGiaDinh[0];
                    NTS.thanhcong(data.Msg);
                    LoadDataTable();
                    $('#mdThemMoiHGD').modal('hide');
                    soCCCD = "";
                    var ID = HGD.HoGiaDinhID;
                    $('#HoGiaDinhID').value(ID);
                    $('#mdThemMoiTiepTuc').modal('show');
                    LoadThongTinChuHoBuoc2(ID);
                    LoadDataTable_ThanhVienHoGD(ID);
                    LoadDataTable_TaiLieuLuuGiu(ID);
                } else {
                    result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
                }
            }, () => { }, result.Msg);
        } else {
            LoadDataTable();
            NTS.thanhcong(result.Msg);
            $('#mdThemMoiHGD').modal('hide');
            soCCCD = "";
            var ID = result.Result;
            $('#HoGiaDinhID').value(result.Result);
            $('#mdThemMoiTiepTuc').modal('show');
            LoadThongTinChuHoBuoc2(ID);
            LoadDataTable_ThanhVienHoGD(ID);
            LoadDataTable_TaiLieuLuuGiu(ID);
        }
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
        return false;
    }
});

function LoadThongTinChuHoBuoc2(ID) {
    const kq = NTS.getAjax('/DanhMuc/HoGiaDinh/LoadDuLieuSua', { id: ID });
    if (!kq.Err && kq.Result != null) {
        let data = kq.Result[0];

        // Hiển thị tên viết tắt
        $('#TenVietTat').html(TraVeTenVietTat(data.HoVaTenChuHo));


        $('#lblSoHk_b2').html(data.SoGiayTo);
        $('#lblHoTenChuHo_b2').html(data.HoVaTenChuHo.toUpperCase());
        if (data.TenLoaiHo === '' || data.TenLoaiHo === null) {
            $('#lblPhanLoaiHD_b2').html('---');
        } else {
            $('#lblPhanLoaiHD_b2').html(data.TenLoaiHo);
        }
        if (data.NgayThangNamSinh === '' || data.NgayThangNamSinh === null) {
            $('#lblNamSinh_b2').html('---');
        } else {
            $('#lblNamSinh_b2').html(data.NgayThangNamSinh);
        }
        if (data.NgayCap === '' || data.NgayCap === null) {
            $('#lblNgayCap_b2').html('---');
        } else {
            $('#lblNgayCap_b2').html(data.NgayCap);
        }
        if (data.SoDienThoai === '' || data.SoDienThoai === null) {
            $('#lblSoDienThoai_b2').html('---');
        } else {
            $('#lblSoDienThoai_b2').html(data.SoDienThoai);
        }
        if (data.Email === '' || data.Email === null) {
            $('#lblEmail_b2').html('---');
        } else {
            $('#lblEmail_b2').html(data.Email);
        }
        if (data.GhiChu === '' || data.GhiChu === null) {
            $('#lblGhiChu_b2').html(`<p style="display: inline;font-weight: normal;">Ghi chú:</p> ` + '---');
        } else {
            $('#lblGhiChu_b2').html(`<p style="display: inline;font-weight: normal;">Ghi chú:</p> ` + data.GhiChu);
        }
        $('#lblGioiTinh_b2').html(data.TenGioiTinh);
        $('#lblSoCCD_b2').html(data.SoCCCD);
        $('#lblNoiCap_b2').html(data.TenNoiCap);
        $('#lblHKTT_b2').html(data.DiaChiCuTheTT);
        $('#HoGiaDinhID').value(data.HoGiaDinhID);
        return false;
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
}

//-------------------Grid thành viên hộ gia đình---------------//
function btnThaoTacCT(cell) {
    return `<div class="show-or-hide">
            <a class='text-primary btnSuaDoiTuong' title="Sửa" data='${cell.getData().ThanhVienHoGDID}'><i class="fa fa-pencil"></i></a></b>&ensp;
            <a class='text-danger btnXoaDoiTuong' title="Xoá" data="${cell.getData().ThanhVienHoGDID}"><i class='fa fa-trash-o'></i></a>
        </div>`;
}
var Grid_ThanhVien = new Tabulator("#Grid_ThanhVien", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "500",
    HeaderVertAlign: "center",
    columns: [
        {
            title: "<button id='btnThemDoiTuong' class='btn btn-xs btn-primary btnThemDTBuoc2' style='background-color: #f3f4f5;font-size: 20px;'><i class='fa fa-plus' aria-hidden='true' style='color: var(--tbl-btn-luuvadong);'></i></button>", formatter: actionDropdownFormatterThanhVienHoGiaDinh
            , headerSort: false, headerHozAlign: "Center", hozAlign: "center", field: "ThaoTac", width: 60, vertAlign: "middle",
        },
        { title: "Họ và tên", field: "HoVaTen", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 150, },
        { title: "Quan hệ với chủ hộ", field: "TenQuanHe", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 110 },
        { title: "CMND/CCCD/Số định danh", field: "SoCCCD", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 200 },
        { title: "Ngày sinh", field: "NgayThangNamSinh", formatter: 'textarea', headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", width: 120 },
        { title: "Giới tính", field: "TenGioiTinh", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 100 },
        { title: "Số điện thoại", field: "SoDienThoai", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 120 },
        //{ title: "Ngày cấp", field: "NgayCap", formatter: 'textarea', width: 100, vertAlign: "middle", minWidth: 70, headerHozAlign: "center", hozAlign: "center", visible: false },
        //{ title: "Nơi cấp", field: "TenNoiCap", formatter: 'textarea', width: 180, vertAlign: "middle", minWidth: 70, headerHozAlign: "center", visible: false },
        { title: "Nơi thường trú", field: "DiaChiCuTheTT", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 250 },
        { title: "Ghi chú", field: "GhiChu", hozAlign: "left", headerHozAlign: "center", formatter: fmGhiChuDT, vertAlign: "middle", width: 250, headerSort: false },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 130, formatter: fmDangSDDT, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "ThanhVienHoGDID", field: "ThanhVienHoGDID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

Grid_ThanhVien.on("rowDblClick", function (e, row) {
    $('#ThanhVienHoGDID').val(row.getData().ThanhVienHoGDID);
    SuaDuLieuThanhVienHoGD_us(row.getData().ThanhVienHoGDID, $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
});

async function LoadDataTable_ThanhVienHoGD(ID) {
    Grid_ThanhVien.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/HoGiaDinh/ThanhVienHoGD_ThuocHoGD", { id: ID });
    if (!GetAll.Err) {
        Grid_ThanhVien.setData(GetAll.Result);
    }
    else Grid_ThanhVien.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

$(document).on('click', '#btnThemDoiTuong', function () {
    // Ẩn chọn hộ gia đình trong combo của modal thêm đối tượng
    var ID = $('#HoGiaDinhID').value();
    $('#tieuDeModal_ThemThanhVien_us').text('Thêm mới đối tượng');
    actionShowModal = false;
    $('#SelectChuHo_US').prop('disabled', true);
    showModalThemDoiTuong(ID, $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '', 'them', '12');
});


$(document).on('click', '.btnThemDTBuoc2', function () {
    $('#lblTenHoGiaDinh_ThanhVien_us').html($('#lblHoTenChuHo_b2').text());
});

function QuayRa() {
    $('#mdThemMoiTiepTuc').modal('hide');
    LoadDataTable();
    return false;
}

$(document).on('click', '.btnXemTTThanhVien ', function () {
    $('#ThanhVienHoGDID').val($(this).attr('data'));
    XemThongTinDoiTuong_us($(this).attr('data'));
    LoadQuaTrinhThuThap_Xem($(this).attr('data'));
});

function XemThongTinDoiTuong_us(ID) {
    $('#mdXemChiTietDoiTuong_us').modal('show');
    const result = NTS.getAjax('/DanhMuc/HoGiaDinh/LoadDuLieuSua_ThanhVienHoGD', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
       
        if (data.GhiChu === '' || data.GhiChu === null) {
            $('#lblGhiChu_usDoiTuong').html(`<p style="display: inline;font-weight: normal;">Ghi chú:</p> ` + '---');
        } else {
            $('#lblGhiChu_usDoiTuong').html(`<p style="display: inline;font-weight: normal;">Ghi chú:</p> ` + data.GhiChu);
        }

        if (data.DiaChiCuTheHT === '' || data.DiaChiCuTheHT === null) {
            $('#lblNoiHienNay_usDoiTuong').html("---");
        } else {
            $('#lblNoiHienNay_usDoiTuong').html(data.DiaChiCuTheHT);
        }
        if (data.Email === '' || data.Email === null) {
            $('#lblEmail_usDoiTuong').html("---");
        } else {
            $('#lblEmail_usDoiTuong').html(data.Email);
        }
        if (data.SoDienThoai === '' || data.SoDienThoai === null) {
            $('#lblSoDienThoai_usDoiTuong').html("---");
        } else {
            $('#lblSoDienThoai_usDoiTuong').html(data.SoDienThoai);
        }
        $('#lblHoVaTenChuHo_usDT').html(data.HoVaTenChuHo);
        if (data.LoaiHoGD == 1) {
            $('#lblLoaiGiayTo_usDoiTuong').html("Sổ hộ khẩu");
        } else {
            $('#lblLoaiGiayTo_usDoiTuong').html("Sổ tạm trú");
        }
        if (data.TenLoaiHo === '' || data.TenLoaiHo === null) {
            $('#lblPhanLoaiHo_usDoiTuong').html("---");
        } else {
            $('#lblPhanLoaiHo_usDoiTuong').html(data.TenLoaiHo);
        }
        if (data.Thon === '' || data.Thon === null) {
            $('#lblThonHoGiaDinh_usDoiTuong').html("---");
        } else {
            $('#lblThonHoGiaDinh_usDoiTuong').html(data.Thon);
        }
        $('#HoGiaDinhID').value(data.HoGiaDinhID);
        $('#lblHoVaTenDoiTuong_usDT').html(data.HoVaTen);
        $('#lblGioiTinh_usDT').html(data.TenGioiTinh);
        $('#lblNgaySinh_usDT').html(data.NgayThangNamSinh);
        $('#lblCMND_usDoiTuong').html(data.SoCCCD);
        $('#lblNgayCap_usDoiTuong').html(data.NgayCap);
        $('#lblNoiCap_usDoiTuong').html(data.TenNoiCap);
        $('#lblDanToc_USHoGiaDinhDT').html(data.TenDanToc);
        $('#lblTonGiao_usDoiTuong').html(data.TenTonGiao);
        $('#lblTonGiao_USHoGiaDinh').html(data.TenTonGiao);
        $('#lblQuocTich_USHoGiaDinh').html(data.TenQuocTich);
        $('#lblSoDienThoai_USHoGiaDinh').html(data.SoDienThoai);
        $('#lblQuocTich_usDoiTuong').html(data.TenQuocTich);
        $('#lblNoiThuongTru_usDoiTuong').html(data.DiaChiCuTheTT);
        $('#lblNoiThuongTruHoGiaDinh_usDoiTuong').html(data.NoiThuongTruHGD);
        $('#lblTinhHoGiaDinh_usDoiTuong').html(data.Tinh);
        $('#lblQuanHeChuHo_usDT').html("Chủ hộ");
        $('#lblSoGiayTo_usDoiTuong').html(data.SoGiayTo);
        $('#lblXaHoGiaDinh_usDoiTuong').html(data.Xa);
        $('#lblHuyenHoGiaDinh_usDoiTuong').html(data.Huyen);

    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
}

$(document).on('click', '.btnSuaDoiTuong', function () {
    $('#ThanhVienHoGDID').val($(this).attr('data'));
    SuaDuLieuThanhVienHoGD_us($(this).attr('data'), $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
});

$(document).on('click', '.btnXoaDoiTuong', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieuThanhVienHoGD_us(ID);
});


//-----------------Grid dinh tai lieu dinh kem-----------------------//
var fmXemDinhKemTL = function (cell) {
    return formaterbtnXemDinhKem_USHoGiaDinh(cell.getData().TaiLieuLuuGiuID);
}
var fmThaoTacTL = function (cell) {
    return formaterbtnThaoTac3(cell.getData().TaiLieuLuuGiuID, 'btnSuaGridTaiLieu_us', 'btnXoaGridTaiLieu_us');
}
var tableTaiLieu_us = new Tabulator("#GridTaiLieuLuuGiu_us", {
    height: 500,
    layout: "fitColumns",
    pagination: "local",
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [
        { title: "<button id='btnThemMoi_TL' class='btn btn-xs btn-primary btnThemMoi_TL' style='background-color: #f3f4f5;font-size: 20px;'><i class='fa fa-plus' aria-hidden='true' style='color: var(--tbl-btn-luuvadong);'></i></button>", field: "ThaoTac", headerHozAlign: "center", hozAlign: "center", formatter: fmThaoTacTL, width: 60, headerSort: false, frozen: true, vertAlign: "middle", print: false },
        { title: "TaiLieuLuuGiuID", field: "TaiLieuLuuGiuID", visible: false },
        { title: "Số văn bản", field: "SoVanBan", formatter: 'textarea', hozAlign: "left", width: 150, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Ngày ký", field: "NgayKy", formatter: 'textarea', hozAlign: "center", width: 90, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Người ký", field: "NguoiKy", width: 150, hozAlign: "left", formatter: "textarea", headerHozAlign: "center", vertAlign: "middle" },
        { title: "Chức danh", field: "ChucDanh", formatter: 'textarea', hozAlign: "left", width: 100, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Cơ quan ban hành", field: "CoQuanBanHanh", width: 180, hozAlign: "left", formatter: "textarea", headerHozAlign: "center", vertAlign: "middle" },
        { title: "Trích yếu, nội dung", field: "TrichYeuNoiDung", minWidth: 300, hozAlign: "left", formatter: "textarea", headerHozAlign: "center", vertAlign: "middle" },
        { title: "Loại tài liệu", field: "TenLoaiTaiLieu", formatter: 'textarea', hozAlign: "left", width: 150, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Xem tài liệu", width: 125, hozAlign: "center", formatter: fmXemDinhKemTL, headerHozAlign: "center", vertAlign: "middle", headerSort: false },
    ],
    rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
        SuaDuLieu_TL(TaiLieuLuuGiuID)
    },
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

async function LoadDataTable_TaiLieuLuuGiu(ID) {
    tableTaiLieu_us.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/HoGiaDinh/GetAll_TL", { id: ID });
    if (!GetAll.Err) {
        tableTaiLieu_us.setData(GetAll.Result);
    }
    else tableTaiLieu_us.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);

}

$(document).on('click', '.btnThemTaiLieu_View', function () {
    if (GridHoGiaDinh_List.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
        return false;
    }
    ThemDuLieuTL();
});



$(document).on('click', '.btnThemMoi_TL', function () {
    ThemDuLieuTL();
});

//---------------------------Các hàm xem thông tin thành viên hộ----------------//

function formaterbtnXemDinhKem_USHoGiaDinh(ID) {
    return `<div><button class='btnXemThem' title="Xem đính kèm" data='${ID}'
        onclick="XemDinhKem_USHoGiaDinh('${ID}');return false;"><i class="fa-solid fa-eye"></i>&ensp;Xem đính kèm</button></div>`;
};
var fmXemDinhKemTL_USHoGiaDinh = function (cell) {
    return formaterbtnXemDinhKem_USHoGiaDinh(cell.getData().TaiLieuLuuGiuID);
}

var Grid_ThanhVien_USHoGiaDinh = new Tabulator("#Grid_ThanhVien_USHoGiaDinh", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "550",
    HeaderVertAlign: "center",
    columns: [
        { title: "Họ và tên", field: "HoVaTen", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", visible: true, width: 150 },
        { title: "Quan hệ với chủ hộ", field: "TenQuanHe", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 90 },
        { title: "CMND/CCCD/Số định danh", field: "SoCCCD", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 184 },
        { title: "Ngày sinh", field: "NgayThangNamSinh", formatter: 'textarea', headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", width: 120 },
        { title: "Giới tính", field: "TenGioiTinh", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 90, },
        { title: "Số điện thoại", field: "SoDienThoai", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 120 },
        { title: "Nơi thường trú", field: "DiaChiCuTheTT", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 250, },
        { title: "Thôn/Ấp", field: "Thon", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", width: 135, },
        { title: "Phường/Xã", field: "Xa", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", width: 135, },
        { title: "Quận/Huyện", field: "Huyen", headerWordWrap: true, hozAlign: "left", vertAlign: "middle", formatter: 'textarea', headerSort: false, width: 135, headerHozAlign: "center" },
        { title: "Tỉnh/Thành phố", field: "Tinh", headerWordWrap: true, hozAlign: "left", vertAlign: "middle", formatter: 'textarea', headerSort: false, minWidth: 135, headerHozAlign: "center" }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});



var tableTaiLieu_USHoGiaDinhView = new Tabulator("#GridTaiLieuLuuGiu_USHoGiaDinh", {
    height: 550,
    layout: "fitColumns",
    pagination: "local",
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [
        { title: "TaiLieuLuuGiuID", field: "TaiLieuLuuGiuID", visible: false },
        { title: "Số văn bản", field: "SoVanBan", formatter: 'textarea', hozAlign: "left", width: 120, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Ngày ký", field: "NgayKy", formatter: 'textarea', hozAlign: "center", width: 120, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Trích yếu nội dung", field: "TrichYeuNoiDung", minWidth: 300, hozAlign: "left", formatter: "textarea", headerHozAlign: "center", vertAlign: "middle" },
        { title: "CQ ban hành", field: "CoQuanBanHanh", width: 200, hozAlign: "left", formatter: "textarea", headerHozAlign: "center", vertAlign: "middle" },
        { title: "Người ký", field: "NguoiKy", width: 150, hozAlign: "left", formatter: "textarea", headerHozAlign: "center", vertAlign: "middle" },
        { title: "Chức danh", field: "ChucDanh", formatter: 'textarea', hozAlign: "left", width: 200, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Loại tài liệu", field: "TenLoaiTaiLieu", formatter: 'textarea', hozAlign: "left", width: 200, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Xem tài liệu", width: 140, hozAlign: "center", formatter: fmXemDinhKemTL_USHoGiaDinh, headerHozAlign: "center", vertAlign: "middle", headerSort: false },
    ],
    rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
        SuaDuLieu_TL(TaiLieuLuuGiuID)
    },
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

async function LoadDataTable_TaiLieuLuuGiuView(ID) {
    tableTaiLieu_USHoGiaDinhView.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/HoGiaDinh/GetAll_TL", { id: ID });
    if (!GetAll.Err) {
        tableTaiLieu_USHoGiaDinhView.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);

}

$(document).on('keyup', '#timKiem_tllg_us_View', function (e) {
    if (e.keyCode == '13') {
        tableTaiLieu_USHoGiaDinhView.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    tableTaiLieu_USHoGiaDinhView.setFilter(matchAny, { value: $('#timKiem_tllg_us_View').val() });
});

// Tim kiem thanh vien ho gia dinh tren modal xem 
$(document).on('keyup', '#timkiem_thanhvien_USHoGiaDinh', function (e) {
    if (e.keyCode == '13') {
        Grid_ThanhVien_USHoGiaDinh.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid_ThanhVien_USHoGiaDinh.setFilter(matchAny, { value: $('#timkiem_thanhvien_USHoGiaDinh').val() });
});

// Tim kiem thanh vien ho gia dinh tren luoi buoc 2
$(document).on('keyup', '#timkiem_thanhvien', function (e) {
    if (e.keyCode == '13') {
        Grid_ThanhVien.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid_ThanhVien.setFilter(matchAny, { value: $('#timkiem_thanhvien').val() });
});

// Tim kiem thanh vien ho gia dinh tab thành viên hộ gia đình
$(document).on('keyup', '#timkiem_thanhvien_tabThanhVien', function (e) {
    if (e.keyCode == '13') {
        Grid_ThanhVien_View.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid_ThanhVien_View.setFilter(matchAny, { value: $('#timkiem_thanhvien_tabThanhVien').val() });
});

// Tim kiem tài liệu tab tài liệu
$(document).on('keyup', '#timkiem_tailieu_tabTaiLieu', function (e) {
    if (e.keyCode == '13') {
        tableTaiLieu_USHoGiaDinh.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    tableTaiLieu_USHoGiaDinh.setFilter(matchAny, { value: $('#timkiem_tailieu_tabTaiLieu').val() });
});


//----------------------Grid Tai lieu ho gia đình ------------------------//
var tableTaiLieu_USHoGiaDinh = new Tabulator("#Grid_TaiLieu_View", {
    layout: "fitColumns",
    pagination: "local",
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [
        {
            title: "<button id='btnThemTaiLieu_View'  class='btn btn-xs btn-primary btnThemTaiLieu_View' style='background-color: #f3f4f5;font-size: 20px;'><i class='fa fa-plus' aria-hidden='true' style='color: var(--tbl-btn-luuvadong);'></i></button>", formatter: fmThaoTacTL
            , headerSort: false, headerHozAlign: "Center", hozAlign: "center", field: "ThaoTac", width: 60, vertAlign: "middle",
        },
        { title: "TaiLieuLuuGiuID", field: "TaiLieuLuuGiuID", visible: false },
        { title: "Số văn bản", field: "SoVanBan", formatter: 'textarea', hozAlign: "left", width: 150, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Ngày ký", field: "NgayKy", formatter: 'textarea', hozAlign: "left", width: 90, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Người ký", field: "NguoiKy", width: 150, hozAlign: "left", formatter: "textarea", headerHozAlign: "center", vertAlign: "middle" },
        { title: "Chức danh", field: "ChucDanh", formatter: 'textarea', hozAlign: "left", width: 100, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Cơ quan ban hành", field: "CoQuanBanHanh", width: 180, hozAlign: "left", formatter: "textarea", headerHozAlign: "center", vertAlign: "middle" },
        { title: "Trích yếu, nội dung", field: "TrichYeuNoiDung", minWidth: 300, hozAlign: "left", formatter: "textarea", headerHozAlign: "center", vertAlign: "middle" },
        { title: "Loại tài liệu", field: "TenLoaiTaiLieu", formatter: 'textarea', hozAlign: "left", width: 150, headerHozAlign: "center", vertAlign: "middle" },
        { title: "Xem tài liệu", width: 125, hozAlign: "center", formatter: fmXemDinhKemTL, headerHozAlign: "center", vertAlign: "middle", headerSort: false },
    ],
    rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
        SuaDuLieu_TL(TaiLieuLuuGiuID)
    },
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

async function LoadDataTable_TaiLieuLuuGiuTabTT(ID) {
    tableTaiLieu_USHoGiaDinh.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/HoGiaDinh/GetAll_TL", { id: ID });
    if (!GetAll.Err) {
        tableTaiLieu_USHoGiaDinh.setData(GetAll.Result);
    }
    else tableTaiLieu_USHoGiaDinh.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

//chọn hộ gia đình
$(document).on('click', '#btnChonHoGD', async function () {
    $('#mdChonHoGD_us').modal('show');
    LoadGrid_ChonHoGD_us();
    return false;
});

$(document).on('click', '#btnChonHoGDVaDong_us', function () {
    if (Grid_ChonHoGD_us.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
        return false;
    }
    var data = Grid_ChonHoGD_us.getSelectedRows()[0]._row.data;
    $('#HoGiaDinhID_DoiTuong').html(data.MaHoGiaDinh);
    $('#lblTenHoGiaDinh_ThanhVien_us').html(data.MaHoGiaDinh);
    $('#TenHoGiaDinh').html(data.HoVaTenChuHo);
    $('#HoGiaDinhID').html(data.HoGiaDinhID);
    $('#mdChonHoGD_us').modal('hide');
    $('#mdThemMoiHGD').modal('show');
    NTS.loadDataCombo({
        name: '#MoiQuanHeIDDT_us',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
        ajaxParam: { data: ['them', '12'] },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    return false;
});
//-----------------------Lưu thông tin thành viên--------------//
$(document).on('click', '#btnLuuVaDongThemThanhVien_us', function () {
    if ($('#SelectChuHo_US').attr("value") == "") {
        NTS.canhbao("Hộ gia đình không được để trống!");
        return false;
    }
    
    var result = LuuThongTinThanhVien_us(); // hàm này bên Contrller đối tượng
    if (result == false) {
        return false;
    } else {
        if (!result.Err) {
            if (result.Logs == "1") {
                CanhBaoTrungSoDinhDanhDoiTuong(() => { }, result.Msg);
                return false;
            } else {
                LoadDataTable_ThanhVienHoGD($('#HoGiaDinhID').value());
                LoadDataTable_ThanhVienHoGDView($('#HoGiaDinhID').value());
                LoadDataTable();
                LoadThongTinChuHoBuoc2($('#HoGiaDinhID').value());
                NTS.thanhcong(result.Msg);
                $('#mdThemMoiHGD').modal('hide');
                $('#mdThemMoiThanhVien_us').modal('hide');
                return false;
            }
        } else {
            result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
        }
        return false;
    }
});

$(document).on('click', '#btnLuuVaDong_TL', function () {
    LuuDinhKemTL_us($('#HoGiaDinhID').value());
    LoadDataTable_TaiLieuLuuGiu($('#HoGiaDinhID').value());
    LoadDataTable_TaiLieuLuuGiuTabTT($('#HoGiaDinhID').value());
});

function SuaDuLieu_TL(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#tieuDeModal_TL').text('Cập nhật tài liệu lưu giữ');
    $('#mdThemMoi_TL').modal('show');
    const result = NTS.getAjax('/DanhMuc/HoGiaDinh/LayDuLieuSua_TL', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        resetUploadFile_TaiLieu();
        $('#TaiLieuLuuGiuID').value(ID);
        $('#SoVanBan_us').value(data.SoVanBan);
        $('#NgayKy_TL').value(data.NgayKy);
        $('#TrichYeu_TL').value(data.TrichYeuNoiDung);
        $('#CoQuanBanHanh_TL').value(data.CoQuanBanHanh);
        $('#NguoiKy_TL').value(data.NguoiKy);
        $('#ChucDanh_us').value(data.ChucDanh);
        $('#selLoaiTaiLieu_us').value(data.LoaiTaiLieuID);
        $('#txtDuongDanFileVB_tailieu').value(data.DinhKem);
        tempthem = "sua";
        tempthemVB = "sua";
        $('#list-file-tai-lieu').html('');
        if (data.DinhKem != null && data.DinhKem.length > 0) {
            let linkVB = data.DinhKem;
            let arrFile = linkVB.split('*');
            for (let p = 0; p < arrFile.length - 1; p++) {
                if (arrFile[p].lastIndexOf('.') != -1) {
                    // file có đuôi .*
                    if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg"
                        //arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".docx" ||
                        //arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".PDF"
                    ) {
                        $('#list-file-tai-lieu').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('${arrFile[p].replace('~', '')}')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o text-white delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                    } else {
                        $('#list-file-tai-lieu').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o text-white delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                    }
                } else {
                    // file không đuôi
                    $('#list-file-tai-lieu').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/Images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o text-white delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                }
            }
        }
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
}


$(document).on('click', '.btnSuaGridTaiLieu_us', function () {
    SuaDuLieu_TL($(this).attr('data'));
});

tableTaiLieu_us.on("rowDblClick", function (e, row) {
    $('#TaiLieuLuuGiuID').val(row.getData().TaiLieuLuuGiuID);
    SuaDuLieu_TL(row.getData().TaiLieuLuuGiuID);
});

tableTaiLieu_USHoGiaDinh.on("rowDblClick", function (e, row) {
    $('#TaiLieuLuuGiuID').val(row.getData().TaiLieuLuuGiuID);
    SuaDuLieu_TL(row.getData().TaiLieuLuuGiuID);
});


$(document).on('click', '.btnXoaGridTaiLieu_us', function () {
    var ID = $(this).attr('data');
    XoaDuLieu_TL(ID);
});
function XoaDuLieu_TL(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'TaiLieuLuuGiuID', ID: ID, TenBangHienTai: 'TaiLieuLuuGiu', CacBangKhongXet: [] });
    console.log(result_ktxoa)
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/HoGiaDinh/XoaDuLieu_TL', { id: ID });
                if (!result.Err) {
                    LoadDataTable_TaiLieuLuuGiu($('#HoGiaDinhID').value());
                    NTS.thanhcong(result.Msg);
                }
                else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            });
        }
        else CanhBaoDuLieuDangSD(result_ktxoa.Result);
    }
    // Lỗi khi kiểm tra xóa
    else result_ktxoa.CanhBao ? NTS.canhbao(result_ktxoa.Msg) : NTS.loi(result_ktxoa.Msg);
}

$(document).on('keyup', '#timKiem_tllg_us', function (e) {
    if (e.keyCode == '13') {
        tableTaiLieu_us.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    tableTaiLieu_us.setFilter(matchAny, { value: $('#timKiem_tllg_us').val() });
});


// Thiết lập cột hiển thị trên lưới
$(document).on('click', '#btnThietLapCot', function () {
    ShowModalThietLapCot_us(tenBangThamChieu);
});

$(document).on('click', '#btnLuuThietLapCot_us', function () {
    const DataThietLapCot = NTS.getAjax("/DanhMuc/DungChung/LoadDuLieuThietLapCot", { tenBang: tenBangThamChieu });
    var data = DataThietLapCot.Result;
    var mang = new Array();
    
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if ($('#ThietLap_' + data[i].TenCot).value() == true) { // lấy ra mảng các giá trị được checked trên modal tùy chọn thiết lập cột
                mang.push(data[i].TenCot);
            }
        }
    }
    LuuThongTinThietLapCot(mang, tenBangThamChieu, Grid1, thaoTac);
})

$(document).on('click', '#btnThietLapLai_us', function () {
    LoadListColumn(tenBangThamChieu);
    thaoTac = true;
});

    ////-------------------Xóa dữ liệu dối tượng cá nhân------------------//
    function XoaDuLieuThanhVienHoGD_us(ID) {
        if (!QuyenXoa()) {
            return false;
        }
        const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'ThanhVienHoGDID', ID: ID, TenBangHienTai: 'ThanhVienHoGD', CacBangKhongXet: [] });
        if (!result_ktxoa.Err) {
           if ((result_ktxoa.Result == null || result_ktxoa.Result == "")) {
                CanhBaoXoa(() => {
                    const result = NTS.getAjax('/DanhMuc/HoGiaDinh/XoaDuLieu_ThanhVienHoGD', { id: ID });
                    if (!result.Err) {
                        LoadDataTable_ThanhVienHoGD($('#HoGiaDinhID').value());
                        LoadDataTable_ThanhVienHoGDView($('#HoGiaDinhID').value());
                        NTS.thanhcong(result.Msg);
                    }
                    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
                });
            }
            else CanhBaoDuLieuDangSD(result_ktxoa.Result);
        }
        // Lỗi khi kiểm tra xóa
        else result_ktxoa.CanhBao ? NTS.canhbao(result_ktxoa.Msg) : NTS.loi(result_ktxoa.Msg);
}


//-----------------------Xem thông tin quá trình thu thập--------------//
var Grid_CungLaoDong_XemQuaTrinhTT = new Tabulator("#Grid_QuaTrinhThuThap_Xem", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "500",
    HeaderVertAlign: "center",
    columns: [
        { title: "Ngày thu thập", field: "NgayThuThap", formatter: 'textarea', headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", minWidth: 120 },
        { title: "Họ và tên", field: "HoVaTen", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 250 },
        { title: "CCCD/CMND/Số định danh", field: "SoCCCD", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 200 },
        { title: "Ngày sinh", field: "NgayThangNamSinh", formatter: 'textarea', headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", minWidth: 120 },
        { title: "Giới tính", field: "TenGioiTinh", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 120 },
        { title: "Đối tượng ưu tiên", field: "TenDoiTuongUuTien", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 200 },
        { title: "Trình độ PT cao nhất", field: "TenTrinhDoHocVan", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 180 },
        { title: "Trình độ CMKT cao nhất", field: "TenTrinhDoCMKT", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 200 },
        { title: "Công việc đang làm", field: "TenCongViecDangLam", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 200 },
        { title: "Nơi làm việc", field: "TenDNNoiLV", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 200 },
        { title: "Địa chỉ nơi làm việc", field: "DiaChiCuTheNLV", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 200 },
        { title: "Thời gian thất nghiệp", field: "TenThoiGianTN", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 161 },
        { title: "Nguyên nhân không tham gia HĐKT", field: "TenNguyenNhanKhongTGHDKT", formatter: 'textarea', hozAlign: "left", minWidth: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Loại thu thập", field: "LoaiThuThap", formatter: 'textarea', hozAlign: "left", minWidth: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Loại biến động", field: "LoaiBienDong", formatter: 'textarea', hozAlign: "left", minWidth: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "CungLaoDongID", field: "CungLaoDongID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});


async function LoadQuaTrinhThuThap_Xem(ID) {
    Grid_CungLaoDong_XemQuaTrinhTT.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/DoiTuongCaNhan/LoadDulieuCungLD", { id: ID });
    if (!GetAll.Err) {
        Grid_CungLaoDong_XemQuaTrinhTT.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

$(document).on('keyup', '#timKiem_tllg_us_View', function (e) {
    if (e.keyCode == '13') {
        Grid_CungLaoDong_XemQuaTrinhTT.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid_CungLaoDong_XemQuaTrinhTT.setFilter(matchAny, { value: $('#timKiem_tllg_us_View').val() });
});

//-------------------Sửa dữ liệu dối tượng cá nhân------------------//
function SuaDuLieuThanhVienHoGD_us(ID, TinhID, HuyenID, XaID, ThonID, TuKhoa) {
    if (!QuyenSua()) {
        return false;
    }
    if (Data.RangBuocHoGiaDinh == 1) {
        $('#HoGiaDinhID_ChuHo').prop('required', true);
        $('#lbHoGiaDinhID_ChuHo').addClass('validation');
    }
    PhanQuyenComBoDiaBan('TinhID_TTDT_us', 'HuyenID_TTDT_us', 'XaID_TTDT_us', 'ThonID_TTDT_us');
    $('#mdThemMoiThanhVien_us').modal('show');
    $('#tieuDeModal_ThemThanhVien_us').text('Cập nhật đối tượng');
    $('#SelectChuHo_US').attr('value', '');
    $('#SelectChuHo_US').html('');
    $('#HoGiaDinhID_ChuHo').value('');
    const result = NTS.getAjax('/DanhMuc/HoGiaDinh/LoadDuLieuSua_ThanhVienHoGD', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        showModalThemDoiTuong(data.HoGiaDinhID, TinhID, HuyenID, XaID, ThonID, TuKhoa, 'sua', data.MaQuanHe);
        $('#TinhID_NS_usDT').value(data.NoiSinh);
        $('#HoGiaDinhID').value(data.HoGiaDinhID);
        $('#MoiQuanHeIDDT_us').value(data.QuanHeID);
        $('#HoVaTenDT_us').value(data.HoVaTen);
        $('#GioiTinhDT_us').value(data.GioiTinhID);
        $('#NgaySinhDT_us').val(data.NgayThangNamSinh);

        $('#DanTocIDDT_us').value(data.DanTocID);
        $('#TonGiaoIDDT_us').value(data.TonGiaoID);
        $('#QuocGiaIDDT_us').value(data.QuocTichID);
        $('#SoCMND_DoiTuong_us').value(data.SoCCCD);
        soCCCD = data.SoCCCD;
        $('#NgayCapDT_us').value(data.NgayCap);
        $('#NoiCapDT_us').value(data.NoiCapID);
        $('#SoDienThoaiDT_us').value(data.SoDienThoai);
        $('#TrangThaiDT_us').value(data.TrangThai);
        $('#EmailDT_us').value(data.Email);
        $('#GhiChuDT_us').value(data.GhiChu);
        $('#ThanhVienHoGDID_us').value(data.ThanhVienHoGDID);
        $('#ThanhVienHoGDID').value(data.ThanhVienHoGDID);
        $('#SelectChuHo_US').value(data.HoGiaDinhID);
        $('#SoNha_TTDT_us').value(data.SoNhaTT);
        setTimeout(() => {
            $('#TinhID_TTDT_us').value(data.DiaBanHCID_TinhTT);
            $('#HuyenID_TTDT_us').value(data.DiaBanHCID_HuyenTT);
            $('#XaID_TTDT_us').value(data.DiaBanHCID_XaTT);
            $('#ThonID_TTDT_us').value(data.DiaBanHCID_ThonTT);
        },50);
        $('#DiaChiThuongTruDT_us').value(data.DiaChiCuTheTT);
        $('#TinhID_HNDT_us').value(data.DiaBanHCID_TinhHT);
        $('#HuyenID_HNDT_us').value(data.DiaBanHCID_HuyenHT);
        $('#XaID_HNDT_us').value(data.DiaBanHCID_XaHT);
        $('#ThonID_HNDT_us').value(data.DiaBanHCID_ThonHT);
        $('#SoNha_HNDT_us').value(data.SoNhaHT);
        $('#DiaChiHienNayDT_us').value(data.DiaChiCuTheHT);
        UpdateLabelDangSD('#TrangThaiDT_us');
        //$('#TenHoGiaDinh').value(data.HoVaTenChuHo);
        $('#lblHoVaTen_ThanhVien_us').html(data.HoVaTen);
        $('#lblSoDinhDanh_ThanhVien_us').html(data.SoDinhDanh);
        $('#lblQuanHeVoiChuHo_us').html(data.TenQuanHe);
        $('#lblCCCD_ThanhVien_us').html(data.SoCCCD);
        $('#lblNgayCap_ThanhVien_us').html(data.NgayCap);
        $('#lblNoiCap_ThanhVien_us').html(data.TenNoiCap);
        $('#lblNgaySinh_ThanhVien_us').html(data.NgayThangNamSinh);
        $('#lblGioiTinh_ThanhVien_us').html(data.TenGioiTinh);
        $('#lblSDT_ThanhVien_us').html(data.SoDienThoai);
        $('#lblEmail_ThanhVien_us').html(data.Email);
        $('#lblTenHoGiaDinh_ThanhVien_us').html(data.HoVaTenChuHo);
        $('#lblNoiThuongTru_ThanhVien_usDT').html($('#DiaChiThuongTruDT_us').value());
        if (data.HoGiaDinhID == "00000000-0000-0000-0000-000000000000") {
            $('#SelectChuHo_US').attr('value', "");
        } else {
            $('#SelectChuHo_US').attr('value', data.HoGiaDinhID);
            $('#SelectChuHo_US').html(`<li><span><b>${data.HoVaTenChuHo}(${data.SoGiayTo})</b> - <b>Nơi thường trú: </b>${data.DiaChiCuTheTTHDG}</span></li>`);
        }

        if ($('#select2-MoiQuanHeIDDT_us-container').text() === "Chủ hộ") {
            $('#MoiQuanHeIDDT_us').prop('disabled', true);
            $('#SelectChuHo_US').prop('disabled', true);
            actionShowModal = false;
        } else {
            actionShowModal = false;
            $('#SelectChuHo_US').prop('disabled', true);
            $('#MoiQuanHeIDDT_us').prop('disabled', false);
        }
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
}
