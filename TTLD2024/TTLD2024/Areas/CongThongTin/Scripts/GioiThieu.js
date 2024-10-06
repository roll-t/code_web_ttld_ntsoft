////const { debug } = require("node:util");

var tempthem = "them";
var editor1 = CKEDITOR.replace('NoiDungToChuc', {
    filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
    filebrowserWindowWidth: '1000',
    filebrowserWindowHeight: '1500',
    height: '200px'

});
var editor2 = CKEDITOR.replace('NoiDungChucNang', {
    filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
    filebrowserWindowWidth: '1000',
    filebrowserWindowHeight: '1500',
    height: '200px'

});
var editor3 = CKEDITOR.replace('NoiDungNhiemVu', {
    filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
    filebrowserWindowWidth: '1000',
    filebrowserWindowHeight: '1500',
    height: '200px'

});
var editor4 = CKEDITOR.replace('NoiDungQuyChe', {
    filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
    filebrowserWindowWidth: '1000',
    filebrowserWindowHeight: '1500',
    height: '200px'

});
var editor5 = CKEDITOR.replace('NoiDungThongTinLienHe', {
    filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
    filebrowserWindowWidth: '1000',
    filebrowserWindowHeight: '1500',
    height: '200px'

});

editor1.config.height = 1000;
editor2.config.height = 1000;
editor3.config.height = 1000;
editor4.config.height = 1000;
editor5.config.height = 1000;


$(function () {
    //LoadCombo();
    LoadDataTable();
    checkMacDinhSD('.checkMacDinhSD', 'GioiThieu', 'GioiThieuID');
    
});
function LoadCombo() {
    setTimeout(function () {
       

    }, 100);
}
var fmGhiChu = function (cell) {
    var ID = cell.getData().GioiThieuID;
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
var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().GioiThieuID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().GioiThieuID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().GioiThieuID);
}
var Grid1 = new Tabulator("#GridGioiThieu", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "80vh",
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', formatter: fmThaoTac, headerSort: false, headerHozAlign: "Center", hozAlign: "center", vertAlign: "middle", field: "ThaoTac", width: 60, print: false },
        { title: "GioiThieuID", field: "GioiThieuID", width: 150, visible: false },
        { title: "Ngày tạo", field: "NgayTao", hozAlign: "center", visible: true, minWidth: 120, formatter: "textarea", vertAlign: "middle", headerHozAlign: "center" },
        { title: "Người tạo", field: "NguoiTao", hozAlign: "left", minWidth: 150, formatter: "textarea", vertAlign: "middle", headerHozAlign: "center" },
        {
            title: "Nội dung cơ cấu tổ chức", field: "ToChuc", formatter: fmGhiChu, headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 150, visible: false
        },

        {
            title: "Nội dung chức năng nhiệm vụ",
            field: "ChucNang",
            formatter: function (cell) {
                var ID = cell.getData().GioiThieuID;
                var ChucNang = cell.getValue();
                if (ChucNang.length > 100) {
                    ChucNang = ChucNang.substr(0, 100) + '...';
                    return `
                    <div class="col-md-12" style="padding-right: 0px; padding-left: 0px; padding-bottom:4px;">
                        <div class="Content-text"><span class='btnXemThemTC btnXemThem'  title="Xem chi tiết tổ chức" data='${ID}' data-loai='CN'><i class="fa-solid fa-eye"></i> Xem chi tiết</span></div>
                    </div>`;
                } else {
                    return `
                    <div class="col-md-12" >
                        <p class="Content-text">${ChucNang}</p>
                    </div>`;
                }
            },
            headerHozAlign: "center",
            hozAlign: "left", vertAlign: "middle",
            minWidth: 150, visible: false
        },
        {
            title: "Nội dung quy chế",
            field: "QuyChe",
            formatter: function (cell) {
                var ID = cell.getData().GioiThieuID;
                var QuyChe = cell.getValue();
                if (QuyChe.length > 100) {
                    QuyChe = QuyChe.substr(0, 100) + '...';
                    return `
                    <div class="col-md-12" style="padding-right: 0px; padding-left: 0px; padding-bottom:4px;">
                        <div class="Content-text"><span class='btnXemThemTC btnXemThem'  title="Xem chi tiết tổ chức" data='${ID}' data-loai='QC'><i class="fa-solid fa-eye"></i> Xem chi tiết</span></div>
                    </div>`;
                } else {
                    return `
                    <div class="col-md-12" >
                        <p class="Content-text">${QuyChe}</p>
                    </div>`;
                }
            },
            headerHozAlign: "center",
            hozAlign: "left", vertAlign: "middle",
            minWidth: 150, visible: false
        },
        {
            title: "Nội dung liên hệ",
            field: "ThongTinLienHe",
            formatter: function (cell) {
                var ID = cell.getData().GioiThieuID;
                var ThongTinLienHe = cell.getValue();
                if (ThongTinLienHe.length > 100) {
                    ThongTinLienHe = ThongTinLienHe.substr(0, 100) + '...';
                    return `
                    <div class="col-md-12" style="padding-right: 0px; padding-left: 0px; padding-bottom:4px;">
                        <div class="Content-text"><span class='btnXemThemTC btnXemThem'  title="Xem chi tiết tổ chức" data='${ID}' data-loai='LH'><i class="fa-solid fa-eye"></i> Xem chi tiết</span></div>
                    </div>`;
                } else {
                    return `
                    <div class="col-md-12" >
                        <p class="Content-text">${ThongTinLienHe}</p>
                    </div>`;
                }
            },
            headerHozAlign: "center",
            hozAlign: "left", vertAlign: "middle",
            minWidth: 150, visible: false
        },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 150, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },

    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/CongThongTin/GioiThieu/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

checkDangSD('.checkDangSD', 'GioiThieu', 'GioiThieuID');

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

$(document).on('click', '#btnThemMoi', function () {
    resetForm('#mdThemMoi');
    NTS.hienNgayHienTaiLenTextbox("NgayTao")
    CKEDITOR.instances.NoiDungToChuc.setData("");
    CKEDITOR.instances.NoiDungChucNang.setData("");
    CKEDITOR.instances.NoiDungNhiemVu.setData("");
    CKEDITOR.instances.NoiDungQuyChe.setData("");
    CKEDITOR.instances.NoiDungThongTinLienHe.setData("");
    tempthem = "them";
    $('#mdThemMoi').modal('show');
    $('#lblTieuDeThemMoi').text('Thêm mới giới thiệu');
    $('#TrangThai').value(true);
    UpdateLabelDangSD('#TrangThai');
    tempthem = 'them';
    return false;
});

Grid1.on("rowDblClick", function (e, row) {
    $('#GioiThieuID').val(row.getData().GioiThieuID);
    SuaDuLieu(row.getData().GioiThieuID);
});

function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#lblTieuDeThemMoi').text('Cập nhật giới thiệu');
    const result = NTS.getAjax('/CongThongTin/GioiThieu/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#GioiThieuID').value(ID);
        $('#NgayTao').value(data.NgayTao);
        $('#NguoiTao').value(data.NguoiTao);
        CKEDITOR.instances.NoiDungToChuc.setData(data.ToChuc);
        CKEDITOR.instances.NoiDungChucNang.setData(data.ChucNang);
        CKEDITOR.instances.NoiDungNhiemVu.setData(data.NhiemVuQuyenHan);
        CKEDITOR.instances.NoiDungQuyChe.setData(data.QuyChe);
        CKEDITOR.instances.NoiDungThongTinLienHe.setData(data.ThongTinLienHe);
        $('#TrangThai').value(data.TrangThai);
        UpdateLabelDangSD('#TrangThai');
        $('#mdThemMoi').modal('show');
        $('#tieuDeModal').text('Cập nhật giới thiệu');
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
}
$('#TieuDe').on('change', function () {
    var DinhDanh = generateSlug($('#TieuDe').value());
    $('#DinhDanh').value(DinhDanh);
});
$(document).on('click', '#btnLuuVaDong', function () {
    const validate = new NTSValidate('#mdThemMoi');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }

    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $("#GioiThieuID").value();
    saveData[2] = $("#NguoiTao").value();
    saveData[3] = $("#NgayTao").value();
    saveData[4] = CKEDITOR.instances.NoiDungToChuc.getData();
    saveData[5] = CKEDITOR.instances.NoiDungChucNang.getData();
    saveData[6] = CKEDITOR.instances.NoiDungNhiemVu.getData();
    saveData[7] = CKEDITOR.instances.NoiDungQuyChe.getData();
    saveData[8] = CKEDITOR.instances.NoiDungThongTinLienHe.getData();
    saveData[9] = $("#TrangThai").value();
    var result = NTS.getAjax('/CongThongTin/GioiThieu/LuuThongTin', { data: saveData });
    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        $('#mdThemMoi').modal('hide');
        return false;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});

$(document).on('click', '.btnSuaGrid1', function () {
    $('#GioiThieuID').val($(this).attr('data'));
    SuaDuLieu($(this).attr('data'));
});

$(document).on('click', '.btnXoaGrid1', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieu(ID);
});


function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/CongThongTin/GioiThieu/XoaDuLieu', { id: ID });
        if (!result.Err) {
            LoadDataTable();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}
////in
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
    Grid1.hideColumn('ThaoTac');
    Grid1.hideColumn('TrangThai');
    Grid1.showColumn('TrangThaiText');
    Grid1.download("xlsx", "CongThongTin.xlsx", { sheetName: "DuLieu" });
    Grid1.showColumn('ThaoTac');
    Grid1.showColumn('TrangThai');
    Grid1.hideColumn('TrangThaiText');
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
            if (hotKey == 1)
                $('#mdThemMoi').modal('hide');
            e.preventDefault();
            break;
        case 120:
            if (hotKey == 1)
                $('#btnLuuVaDong').trigger('click');
            e.preventDefault();
            break;
    }
});
$(document).on('shown.bs.modal', '#mdThemMoi', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdThemMoi', function () {
    hotKey = 0;
});
//------------------------Dinh kem------------------------//
$(document).on('click', '#btnChonTepVB_tailieu', function () {
    $('#fileVB_tailieu').click();
});
var tempthemVB = "them";
var doiTuongID = "";
var ChuoiPath = "";
$(document).on('change', '#fileVB_tailieu', function () {
    UploadTaiLieu_us('HinhAnh'); //hàm dùng chung ở us TaiLieu
});
function UploadTaiLieu_us(pathChiTiet) {
    var data = NTS.upload({
        name: '#fileVB_tailieu',///ID input type="file"
        loaiVB: 'VB',///Nhận 1 trong 2 giá trị DL hoặc VB
    });
    if (data.length > 0) {
        $('#txtDuongDanFileVB_tailieu').value(data);
        if (tempthemVB != "them") {
            let result = NTS.getAjax('/CongThongTin/DungChung/LuuVanBan_DinhKem', { PathTemp: data, ID: $('#hdfTaiLieuLuuGiuID_us').value(), PathChiTiet: pathChiTiet, bangDk: 'GioiThieu', cotDk: 'GioiThieuID', cotDinhKem: 'HinhAnh' });
            if (!result.Err) {
                let LuuFile = result.Result;
                let arrFile = LuuFile.split('*');
                for (let p = 0; p < arrFile.length - 1; p++) {
                    if (arrFile[p].lastIndexOf('.') != -1) {
                        // file có đuôi .*
                        if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".svg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".gif" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg") {
                            $('#list-file-tai-lieu').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('${arrFile[p].replace('~', '')}')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                        } else {
                            $('#list-file-tai-lieu').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                        }
                    } else {
                        // file không đuôi
                        $('#list-file-tai-lieu').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                    }
                }
            }
        } else {
            //Trường hợp thêm mới thì đưa vào tạm
            let result = NTS.getAjax('/CongThongTin/DungChung/LuuVanBan_DinhKem', { PathTemp: data, ID: $('#hdfTaiLieuLuuGiuID_us').value(), PathChiTiet: pathChiTiet, bangDk: 'GioiThieu', cotDk: 'GioiThieuID', cotDinhKem: 'HinhAnh' });
            if (!result.Err) {
                let LuuFile = result.Result;
                let arrFile = LuuFile.split('*');
                for (let p = 0; p < arrFile.length - 1; p++) {
                    ChuoiPath += arrFile[p] + "*";
                    if (arrFile[p].lastIndexOf('.') != -1) {
                        // file có đuôi .*
                        if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".svg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".gif" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg") {
                            $('#list-file-tai-lieu').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('${arrFile[p].replace('~', '')}')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                        } else {
                            $('#list-file-tai-lieu').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                        }
                    } else {
                        // file không đuôi
                        $('#list-file-tai-lieu').append(`<div class="frame-file me-2">
                                                    <div class="frame-top">
                                                        <div class="frame-image" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}" style="background-image:url('/images/file.png')"></div>
                                                    </div>
                                                    <i class="fa fa-arrow-down download-file-attachments" data-url-file="${arrFile[p].replace('~', '')}"></i>
                                                    <i class="fa fa-trash-o delete-file-attachments" data-url-file="${arrFile[p]}"></i>
                                                </div>`);
                    }
                }
            }
        }
    }
    else {
        NTS.loi('Tải file không thành công!')
    }
}
function AnHienXoaHetTepVB() {
    if ($('#txtDuongDanFileVB_tailieu').val().length > 0) {
        $('#btnChonTepVB_tailieu').css('display', 'none');
        $('#btnXoaHetTepVB').css('display', 'inline');
        $('#btnXemDinhKemVB').css('display', 'inline');
        $('#RowDinhKem').show();
        $('#RowChonDinhKem').hide();
    } else {
        $('#btnXoaHetTepVB').css('display', 'none');
        $('#btnXemDinhKemVB').css('display', 'none');
        $('#btnChonTepVB_tailieu').css('display', 'inline');
        $('#RowDinhKem').hide();
        $('#RowChonDinhKem').show();
    }
}
$(document).on('click', '#btnXemDinhKemVB', function () {
    var fileExt = ($('#txtDuongDanFileVB_tailieu').val()).split('.').pop();
    fileExt = fileExt.toLocaleLowerCase();
    if (fileExt == 'jpg' || fileExt == 'png' || fileExt == 'jpeg' || fileExt == 'zip' || fileExt == 'rar') {
        window.open($('#txtDuongDanFileVB_tailieu').val());
    }
});
/*$(document).on('click', '#btnXoaHetTepVB', function () {
    if (!ntspermiss.xoa) {
        NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác xóa. Vui lòng kiểm tra lại.");
        return false;
    }
    var kq = NTS.getAjax('json', '/View/CongThongTin/GioiThieu.aspx/XoaFile', { PathFile: $('#txtDuongDanFileVB_tailieu').value() });
    $('#txtDuongDanFileVB_tailieu').value('');
    $('#TenFile').text('');
    AnHienXoaHetTepVB();
});*/
/*function XoaAnhGioiThieu() {
    if (!ntspermiss.xoa) {
        NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác xóa. Vui lòng kiểm tra lại.");
        return false;
    }
    if ($('#txtDuongDanFileVB_tailieu').value() != "" && tempthem == 'them') {
        var kq = NTS.getAjax('json', '/View/CongThongTin/GioiThieu.aspx/XoaFile', { PathFile: $('#txtDuongDanFileVB_tailieu').value() });
        $('#txtDuongDanFileVB_tailieu').value('');
        $('#TenFile').text('');
        AnHienXoaHetTepVB();
    }
}*/
function resetUploadFile_TaiLieu() {

    $('#list-file-tai-lieu').html('');
    $('#fileVB_tailieu').value('');
    $('#txtDuongDanFileVB_tailieu').value('');
    $('#hdfTaiLieuLuuGiuID_us').value('')
}
function generateSlug(phrase) {
    var str = removeDiacritics(phrase).toLowerCase();
    str = str.replace(/\s+/g, '-'); // Thay thế khoảng trắng bằng dấu gạch ngang
    str = str.replace(/[^a-z0-9-]/g, ''); // Loại bỏ các ký tự đặc biệt
    str = str.replace(/-+/g, '-'); // Loại bỏ các dấu gạch ngang thừa
    return str.trim('-');
}

function removeDiacritics(str) {
    var diacriticsMap = {
        'a': 'áàảạãâấầẩậẫăắằẳặẵ',
        'e': 'éèẻẹẽêếềểệễ',
        'i': 'íìỉịĩ',
        'o': 'óòỏọõôốồổộỗơớờởợỡ',
        'u': 'úùủụũưứừửựữ',
        'y': 'ýỳỷỵỹ',
        'd': 'đ'
    };
    for (var char in diacriticsMap) {
        var regex = new RegExp('[' + diacriticsMap[char] + ']', 'g');
        str = str.replace(regex, char);
    }
    return str;
}

$(document).on('click', '.delete-file-attachments', function () {
    let duongDan = $(this);
    let id = "";
    let bang = "";
    let cot = "";

    //xác định đang ở form nào

    id = $('#hdfTaiLieuLuuGiuID_us').val();
    bang = "GioiThieu";
    cot = "GioiThieuID";



    CanhBaoXoaDinhKem(() => {
        let result = NTS.getAjax('/CongThongTin/DungChung/XoaDinhKem', { ID: id, duongDan: duongDan.attr('data-url-file'), bangDk: bang, cotDk: cot, loai: '', tenCotTrongDB: 'HinhAnh' });
        if (!result.Err) {
            duongDan.parent('div').remove();
            NTS.thanhcong(result.Msg);
        }
        else {
            NTS.loi(result.Msg);
        }
    });
    return false;
});
$(document).on('click', '.download-file-attachments', function () {
    window.open($(this).attr('data-url-file'));
    return false;
});


// Xem chi tiết nội dung cơ cấu tổ chức
$(document).on('click', '.btnXemThemTC', function () {
    $('#GioiThieuID').val($(this).attr('data'));
    XemChiTietTC($(this).attr('data'), $(this).attr('data-loai'));
});

function XemChiTietTC(ID,loai) {
    debugger
    $("#mdXemThem").modal('show');
    if (loai == 'TC') {
        $('#tieuDeModalCT').text('Chi tiết nội dung cơ cấu tổ chức');
        const result = NTS.getAjax("/CongThongTin/GioiThieu/ToChucCT", { id: ID });
        if (!result.Err && result.Result != null) {
            let data = result.Result[0];
            $('#NoiDungToChu_CT').html(data.ToChuc);
        } else {
            $('#NoiDungToChu_CT').html("Chưa có dữ liệu");
        }
        return;
    }
    if (loai == 'CN') {
        $('#tieuDeModalCT').text('Chi tiết nội dung chức năng nhiệm vụ');
        const result = NTS.getAjax("/CongThongTin/GioiThieu/ChucNangNhiemVuCT", { id: ID });
        if (!result.Err && result.Result != null) {
            let data = result.Result[0];
            $('#NoiDungToChu_CT').html(data.ChucNang);
        } else {
            $('#NoiDungToChu_CT').html("Chưa có dữ liệu");
        }
        return;
    }
    if (loai == 'QC') {
        $('#tieuDeModalCT').text('Chi tiết nội dung quy chế');
        const result = NTS.getAjax("/CongThongTin/GioiThieu/QuyCheCT", { id: ID });
        if (!result.Err && result.Result != null) {
            let data = result.Result[0];
            $('#NoiDungToChu_CT').html(data.QuyChe);
        } else {
            $('#NoiDungToChu_CT').html("Chưa có dữ liệu");
        }
        return;
    }
    if (loai == 'LH') {
        $('#tieuDeModalCT').text('Chi tiết nội dung liên hệ');
        const result = NTS.getAjax("/CongThongTin/GioiThieu/ThongTinLienHeCT", { id: ID });
        if (!result.Err && result.Result != null) {
            let data = result.Result[0];
            $('#NoiDungToChu_CT').html(data.ThongTinLienHe);
        } else {
            $('#NoiDungToChu_CT').html("Chưa có dữ liệu");
        }
        return;
    }
}