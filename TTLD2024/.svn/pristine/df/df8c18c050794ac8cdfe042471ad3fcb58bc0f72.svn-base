////const { debug } = require("node:util");

var tempthem = "them";
$(function () {
    LoadCombo();
    LoadDataTable();
    checkMacDinhSD('.checkMacDinhSD', 'LoaiTinTuc', 'LoaiTinTucID');
    //$('#reservationdate').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' });
});
function LoadCombo() {
    setTimeout(function () {
        NTS.loadDataCombo({
            name: '#thuocloai',
            ajaxUrl: '/CongThongTin/LoaiTinTuc/getLoaiTinTuc',
            ajaxParam: { data: "" },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '-Chọn loại tin tức-',
            showTatCa: !0
        });

    }, 100);
}
var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().LoaiTinTucID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().LoaiTinTucID);
}
var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().LoaiTinTucID);
}

var fmMinText = function (cell) {
    var VanBan = cell.getValue();
    if (VanBan.length > 40) {
        VanBan = VanBan.substr(0, 40) + '...';
        return `
            <div class="col-md-12" >
                <p class="Content-text" style="margin-bottom: 0px;">${VanBan}</p>
            </div>`;
    } else {
        return `
            <div class="col-md-12" >
                <p class="Content-text"  style="margin-bottom: 0px;">${VanBan}</p>
            </div>`;
    }
}
var fmMoTaNgan = function (cell) {
    var ID = cell.getData().LoaiTinTucID;
    var ghiChu = cell.getValue();
    if (ghiChu != "") {
        if (ghiChu.length > 40) {
            ghiChu = ghiChu.substring(0, 33) + "...";
            return `
                        <div class="col-md-12" style="padding-right: 0px; padding-left: 0px; padding-bottom:4px;">
                            <div class="Content-text">${ghiChu}<span class='btnXemMoTaNgan' style='color:var(--tblr-primary);'  title="Xem chi tiết ghi chú" data='${ID}' data-loai='TC'>Xem thêm</span></div>
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
var Grid1 = new Tabulator("#GridLoaiTinTuc", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "80vh",
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', formatter: fmThaoTac, headerSort: false, headerHozAlign: "Center", hozAlign: "center", vertAlign: "middle", field: "ThaoTac", width: 60, print: false },
        { title: "LoaiTinTucID", field: "LoaiTinTucID", width: 150, visible: false },
        { title: "Mã loại", field: "MaLoaiTinTuc", hozAlign: "left", visible: true, minWidth: 100, formatter: "textarea", headerHozAlign: "center", vertAlign: "middle"  },
        { title: "Tên loại", field: "TenLoaiTinTuc", hozAlign: "left", minWidth: 200, formatter: "textarea", headerHozAlign: "center", vertAlign: "middle" },
        { title: "Từ khóa", field: "TuKhoa", hozAlign: "left", minWidth: 140, formatter: "textarea", headerHozAlign: "center", vertAlign: "middle" },
        { title: "Thuộc loại", field: "ThuocLoai", hozAlign: "left", minWidth: 200, formatter: "textarea", headerHozAlign: "center", vertAlign: "middle"  },
        { title: "Định danh", field: "DinhDanh", hozAlign: "left", minWidth: 155, formatter: "textarea", headerHozAlign: "center", vertAlign: "middle"  },
        { title: "Mô tả ngắn", field: "MoTa", hozAlign: "left", formatter: fmMoTaNgan, minWidth: 300, headerHozAlign: "center", vertAlign: "middle"  },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 150, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
// Xem chi tiết nội dung ghi chú hộ gia đình
$(document).on('click', '.btnXemMoTaNgan', function () {
    XemChiTietGhiChu($(this).attr('data'));
});
function XemChiTietGhiChu(ID) {
    $("#mdXemThem").modal('show');
    $('#tieuDeModalCT').text('Chi tiết mô tả ngắn');
    const result = NTS.getAjax("/CongThongTin/LoaiTinTuc/LoadDuLieuSua", { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];       
        $('#NoiDungGhiChu_CT').html(data.MoTa);
    } else {
        $('#NoiDungGhiChu_CT').html("Chưa có dữ liệu");
    }
    return;
}
function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/CongThongTin/LoaiTinTuc/GetAll", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

checkDangSD('.checkDangSD', 'LoaiTinTuc', 'LoaiTinTucID');

$('#TrangThai').on('change', function () {
    UpdateLabelDangSD(this);
});
$('#TenLoaiTinTuc').on('change', function () {
    var DinhDanh = generateSlug($('#TenLoaiTinTuc').value());
    $('#DinhDanh').value(DinhDanh);
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
    try {
        var matutang = NTS.getAjax('/DanhMuc/DungChung/LayMaTuTang', { strKyTu: "", strCotTang: "MaLoaiTinTuc", strBangTang: "LoaiTinTuc", strDinhDang: "00" });
        $('#MaLoaiTinTuc').value(matutang.Result)
    } catch (e) {

    }
    LoadCombo();
    tempthem = "them";
    $('#mdThemMoi').modal('show');
    $('#lblTieuDeThemMoi').text('Thêm loại tin tức mới');
    $('#TrangThai').value(true);
    UpdateLabelDangSD('#TrangThai');
    tempthem = 'them';
    return false;
});

Grid1.on("rowDblClick", function (e, row) {
    $('#LoaiTinTucID').val(row.getData().LoaiTinTucID);
    SuaDuLieu(row.getData().LoaiTinTucID);
});

function SuaDuLieu(ID) {
    if (!QuyenSua()) {
        return false;
    }
    $('#lblTieuDeThemMoi').text('Cập nhật loại tin tức');
    NTS.loadDataCombo({
        name: '#thuocloai',
        ajaxUrl: '/CongThongTin/LoaiTinTuc/getLoaiTinTuc',
        ajaxParam: { data: ID },
        indexValue: 0, //ID
        indexText: 1, // Ma
        indexText1: 2, // Ten
        columns: 2,
        textShowTatCa: '-Chọn loại tin tức-',
        showTatCa: !0
    });
    const result = NTS.getAjax('/CongThongTin/LoaiTinTuc/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#TenLoaiTinTuc').value(data.TenLoaiTinTuc);
        $('#txtTukhoa').value(data.TuKhoa);
        $('#txtMota').value(data.MoTa);
        $('#thuocloai').value(data.LoaiTinTucID_Cha);
        $('#MaLoaiTinTuc').value(data.MaLoaiTinTuc);

        $('#DinhDanh').value(data.DinhDanh);
        $('#TrangThai').value(data.TrangThai);
        $('#LoaiTinTucID').val(data.LoaiTinTucID);
        UpdateLabelDangSD('#TrangThai');
        $('#mdThemMoi').modal('show');
        tempthem = "sua";
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
    if (KiemTraKhongCoKyTuDacBiet($('#MaLoaiTinTuc').value())) {
        return NTS.canhbao("Mã không được chứa ký tự đăc biệt!")
    }
    if (KiemTraNhapSo($('#MaLoaiTinTuc').value())) {
        return NTS.canhbao("Mã chỉ được nhập các ký tự số!");
    }
    var param = new Array();
    param[0] = $('#TenLoaiTinTuc').value();
    param[1] = $('#txtTukhoa').value();
    param[2] = $('#txtMota').value();
    param[3] = $('#DinhDanh').value();
    param[4] = $('#TrangThai').value();
    param[5] = $('#LoaiTinTucID').val();
    param[6] = tempthem;
    param[7] = $('#MaLoaiTinTuc').value();
    param[8] = $('#thuocloai').value();
    var result = NTS.getAjax('/CongThongTin/LoaiTinTuc/LuuThongTin', { data: param });
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
    $('#LoaiTinTucID').val($(this).attr('data'));
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
        const result = NTS.getAjax('/CongThongTin/LoaiTinTuc/XoaDuLieu', { id: ID });
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

function generateSlug(phrase) {
    var str = removeDiacritics(phrase).toLowerCase();
    str = str.replace(/\s+/g, '-'); // Thay thế khoảng trắng bằng dấu gạch ngang
    str = str.replace(/[^a-z0-9-]/g, ''); // Loại bỏ các ký tự đặc biệt
    str = str.replace(/-+/g, '-'); // Loại bỏ các dấu gạch ngang thừa
    return str.trim('-');
}

function removeDiacritics(str) {
    var diacriticsMap = {
        'a': 'áàảạãâấầẩậẫăắằẳặẵÁÀẢẠÃÂẤẦẨẬẪĂẮẰẲẶẴ',
        'e': 'éèẻẹẽêếềểệễÉÈẺẸẼÊẾỀỂỆỄ',
        'i': 'íìỉịĩÍÌỈỊĨ',
        'o': 'óòỏọõôốồổộỗơớờởợỡÓÒỎỌÕÔỐỒỔỘỖƠỚỜỞỢỠ',
        'u': 'úùủụũưứừửựữÚÙỦỤŨƯỨỪỬỰỮ',
        'y': 'ýỳỷỵỹÝỲỶỴỸ',
        'd': 'đĐ'
    };
    for (var char in diacriticsMap) {
        var regex = new RegExp('[' + diacriticsMap[char] + ']', 'g');
        str = str.replace(regex, char);
    }
    return str;
}
