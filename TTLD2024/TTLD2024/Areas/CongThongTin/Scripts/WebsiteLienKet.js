////const { debug } = require("node:util");

var tempthem = "them";
$(function () {
    //LoadCombo();
    LoadDataTable();
    checkMacDinhSD('.checkMacDinhSD', 'WebsiteLienKet', 'WebsiteLienKetID');
});
function LoadCombo() {
    setTimeout(function () {

    }, 100);
}
var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().WebsiteLienKetID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().WebsiteLienKetID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().WebsiteLienKetID);
}
var Grid1 = new Tabulator("#GridWebsiteLienKet", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "80vh",
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', formatter: fmThaoTac, headerSort: false, headerHozAlign: "Center", hozAlign: "center", vertAlign: "middle", field: "ThaoTac", width: 60, print: false },
        { title: "WebsiteLienKetID", field: "WebsiteLienKetID", formatter: "textarea", width: 100, visible: false },
        { title: "Số thứ tự", field: "STT", hozAlign: "left", formatter: "textarea", width: 100, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Tên website", field: "TenWebsite", hozAlign: "left", formatter: "textarea", minWidth: 300, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Đường dẫn", field: "UrlWebsite", hozAlign: "left", formatter: "textarea", minWidth: 380, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 150, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/CongThongTin/WebsiteLienKet/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

checkDangSD('.checkDangSD', 'WebsiteLienKet', 'WebsiteLienKetID');

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
    resetUploadFile_TaiLieu();
    tempthem = "them";
    $('#mdThemMoi').modal('show');
    $('#lblTieuDeThemMoi').text('Thêm mới liên kết trang');
    $('#TrangThai').value(true);
    UpdateLabelDangSD('#TrangThai');
    return false;
});

Grid1.on("rowDblClick", function (e, row) {
    $('#WebsiteLienKetID').val(row.getData().WebsiteLienKetID);
    SuaDuLieu(row.getData().WebsiteLienKetID);
});

function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#lblTieuDeThemMoi').text('Cập nhật liên kết trang');
    const result = NTS.getAjax('/CongThongTin/WebsiteLienKet/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        resetUploadFile_TaiLieu();
        $('#hdfTaiLieuLuuGiuID_us').val(ID);
        $('#WebsiteLienKetID').value(ID);
        $('#STT').value(data.STT);
        $('#UrlWebsite').value(data.UrlWebsite);
        $('#TenWebsite').value(data.TenWebsite);
        $('#TrangThai').value(data.TrangThai);

        UpdateLabelDangSD('#TrangThai');
        $('#txtDuongDanFileVB_tailieu').value(data.HinhAnh);
        $('#mdThemMoi').modal('show');
        tempthem = "sua";
        ChuoiPath = "";
        ChuoiPath = data.HinhAnh;
        tempthemVB = "sua";
        $('#list-file-tai-lieu').html('');
        if (data.HinhAnh != null && data.HinhAnh.length > 0) {
            let linkVB = data.HinhAnh;
            let arrFile = linkVB.split('*');
            for (let p = 0; p < arrFile.length - 1; p++) {
                if (arrFile[p].lastIndexOf('.') != -1) {
                    // file có đuôi .*
                    if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg") {
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

        $('#tieuDeModal').text('Cập nhật WebsiteLienKet');
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
}

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
    saveData[1] = $("#WebsiteLienKetID").value();
    saveData[2] = $("#STT").value();
    saveData[3] = $("#TenWebsite").value();
    saveData[4] = $("#UrlWebsite").value();
    saveData[5] = $("#TrangThai").value();
    var duongDan = '';
    $('#list-file-tai-lieu .frame-file .download-file-attachments').each(function (e, v) {

        if (duongDan != '') {
            duongDan += '*' + $(v).attr('data-url-file');
        } else {
            duongDan += $(v).attr('data-url-file');
        }
    });
    if (duongDan != '') {
        duongDan += '*';
    }
    saveData[6] = duongDan;
    var result = NTS.getAjax('/CongThongTin/WebsiteLienKet/LuuThongTin', { data: saveData });
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
    $('#WebsiteLienKetID').val($(this).attr('data'));
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
        const result = NTS.getAjax('/CongThongTin/WebsiteLienKet/XoaDuLieu', { id: ID });
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
            let result = NTS.getAjax('/CongThongTin/DungChung/LuuVanBan_DinhKem', { PathTemp: data, ID: $('#hdfTaiLieuLuuGiuID_us').value(), PathChiTiet: pathChiTiet, bangDk: 'WebsiteLienKet', cotDk: 'WebsiteLienKetID', cotDinhKem: 'HinhAnh' });
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
            let result = NTS.getAjax('/CongThongTin/DungChung/LuuVanBan_DinhKem', { PathTemp: data, ID: $('#hdfTaiLieuLuuGiuID_us').value(), PathChiTiet: pathChiTiet, bangDk: 'WebsiteLienKet', cotDk: 'WebsiteLienKetID', cotDinhKem: 'HinhAnh' });
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
    var kq = NTS.getAjax('json', '/View/CongThongTin/WebsiteLienKet.aspx/XoaFile', { PathFile: $('#txtDuongDanFileVB_tailieu').value() });
    $('#txtDuongDanFileVB_tailieu').value('');
    $('#TenFile').text('');
    AnHienXoaHetTepVB();
});*/
/*function XoaAnhWebsiteLienKet() {
    if (!ntspermiss.xoa) {
        NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác xóa. Vui lòng kiểm tra lại.");
        return false;
    }
    if ($('#txtDuongDanFileVB_tailieu').value() != "" && tempthem == 'them') {
        var kq = NTS.getAjax('json', '/View/CongThongTin/WebsiteLienKet.aspx/XoaFile', { PathFile: $('#txtDuongDanFileVB_tailieu').value() });
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
    bang = "WebsiteLienKet";
    cot = "WebsiteLienKetID";



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