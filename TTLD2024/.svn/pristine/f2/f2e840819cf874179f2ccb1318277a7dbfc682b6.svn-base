var tempthem = "them";

$(document).ready(function () {
    $('#ChucVuID').val('');
    setTimeout(() => {
        loadComboTimKiem();
    }, 300);
    setTimeout(() => {
        LoadDataTable();
    }, 350);
    $('#btnThemMoi').click(function () {
        resetForm("#mdThemMoi");
        $('#TenViecLam').value("");
        $('#tieuDeModal').text("Thêm mới tin tuyển dụng");
        tempthem = "them";
        layToanBoDuLieu();
        $('#mdThemMoi').modal('show');
        $('#ckAnTinTuyenDung').value(true);
        UpdateLabel('#ckAnTinTuyenDung', 'Hiển thị tin đăng tuyển', 'Ẩn tin đăng tuyển');
    });
    $(document).on('click', '.btnSuaGrid1', function () {

        //$('#ChucVuID').val($(this).attr('data'));
        SuaDuLieu($(this).attr('data'));
    });
    $(document).on('click', '.btnXoaGrid1', function () {

        var ID = $(this).attr('data');
        XoaDanhHieu(ID);
    });

    $(document).on('click', '.btnGuiDuyet', function () {
        var ID = $(this).attr('data');
        GuiXetDuyet(ID);
    });

    $(document).on('click', '.btnXemNoiDungTuChoi', function () {
        var ID = $(this).attr('data');
        XemNoiDungTuChoi(ID);
        $('#modal_xemNoiDungTuChoi').modal('show');
    });
    setTimeout(() => {
        $('#TrangThai_TimKiem_us').select2({ width: '100%' });  
    },500)
});
$('#ckAnTinTuyenDung').on('change', function () {
    UpdateLabel('#ckAnTinTuyenDung', 'Hiển thị tin đăng tuyển', 'Ẩn tin đăng tuyển');
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

function layToanBoDuLieu() {
    $('#divload').show();
    $("#Loadding").hide();
    //setTimeout(function () {
    //    Grid1.refresh();
    //}, 300);
    //Load ngay hien tai len
    NTS.hienNgayHienTaiLenTextbox('NgayDangTuyen');
    NTS.hienNgayHienTaiLenTextbox('HanNop');

    NTS.loadDataCombo({
        name: '#CapBac',
        ajaxUrl: '/CongThongTinViecLam/Function/getCapBac',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    //NganhNghe
    NTS.loadDataCombo({
        name: '#NganhNghe',
        ajaxUrl: '/CongThongTinViecLam/Function/getNganhKinhTe',
        indexValue: 0,
        indexText: 2,
        showTatCa: 0
    });
    //NganhNghe
    NTS.loadDataCombo({
        name: '#DiaDiem',
        ajaxUrl: '/CongThongTinViecLam/Function/getDiaDiemLamViec',
        indexValue: 0,
        indexText: 2,
        showTatCa: 0
    });
    //HinhThucLamViec
    NTS.loadDataCombo({
        name: '#HinhThucLamViec',
        ajaxUrl: '/CongThongTinViecLam/Function/getHinhThucLamViec',
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    //TrinhDoHocVan
    NTS.loadDataCombo({
        name: '#TrinhDoHocVan',
        ajaxUrl: '/CongThongTinViecLam/Function/getTrinhDoCMKT',
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    //TrinhDoHocVan
    NTS.loadDataCombo({
        name: '#KinhNghiem',
        ajaxUrl: '/CongThongTinViecLam/Function/getComBoKinhNghiemLV',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    //TrinhDoHocVan
    NTS.loadDataCombo({
        name: '#MucLuong',
        ajaxUrl: '/CongThongTinViecLam/Function/getMucLuongYeuCau',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#DoiTuongUuTien',
        ajaxUrl: '/CongThongTinViecLam/Function/GetComBo_DoiTuongUuTien',
        indexValue: 0,
        indexText: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#GioiTinh',
        ajaxUrl: '/CongThongTinViecLam/Function/GetGioiTinh_Combo',
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });    
}

function formaterHienThi(value, ID) {
    return ` <div class="form-group">
            <label class="form-check">
                <input class="form-check-input checkMacDinhSD" type="checkbox" data='${ID}' id="customCheckbox1${ID}" ` + (value ? 'checked' : '') + `>
                <label class="form-check-label" for="customCheckbox1${ID}"></label>
            </label>
                
        </div>`;
}

thayDoiCheckbox('.checkMacDinhSD', 'ViecTimNguoi', 'ViecTimNguoiID', 'DangSD');
var fmMacDinhSD = function (cell) {
    return formaterHienThi(cell.getValue(), cell.getData().ViecTimNguoiID);
}


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
    return `<div class="badge ${GetColorTrangThai(data)}">${GetTrangThaiTTD(data)}</div>`;
}
function labelDangSD(cell, formatterParams, onRendered) {
    data = cell.getData().TrangThai;
    let TinhTrang = "";
    let mauSac = "";
    if (data == '3') {
        mauSac = "bg-success";
        TinhTrang = "Đang hiển thị";
    } else {
        mauSac = "bg-secondary";
        TinhTrang = "Ẩn hiển thị";
    }
    return `<div class="badge ${mauSac}" >${TinhTrang}</div>`;
}

var btnThaoTac = function (cell, formatterParams, onRendered) { //plain text value
    //console.log(cell.getRow().getData());
    return `<button type='button' class='btn btn-xs btn-success btnXemNoiDungTuChoi' title="Xem" id='' data='${cell.getRow().getData().ViecTimNguoiID}' style='margin-right:6px;display:${cell.getRow().getData().TrangThai == '4' ? 'inline-block' : 'none'}'><i class="fa fa-eye"></i></button>
        <button class='btn btn-xs btn-primary btnGuiDuyet' type="button" data='${cell.getRow().getData().ViecTimNguoiID}' style='display:${cell.getRow().getData().TrangThai == '1' ? 'inline-block' : cell.getRow().getData().TrangThai == '4' ? 'inline-block' : 'none'}'><i class="fa-solid fa-paper-plane"></i></button>&ensp;
    <button class='btn btn-xs btn-info btnSuaGrid1' type="button" data='${cell.getRow().getData().ViecTimNguoiID}' ><i class='fa fa-pencil'></i></button>&ensp;
    <button class='btn btn-xs btn-danger btnXoaGrid1' type="button" data='${cell.getRow().getData().ViecTimNguoiID}'><i class='fa fa-trash-o'></i></button>`;
};

function actionDropdownFormatter(cell, formatterParams, onRendered) {
    var ID = cell.getData().ViecTimNguoiID;
    var TrangThai = cell.getData().TrangThai;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
       <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
       <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
            <a  class="dropdown-item btnXemNoiDungTuChoi  " href="#" data="${ID}" style="display:${TrangThai == '4' ? 'inline-block' : 'none'};">
                 <i class="fa fa-eye " aria-hidden="true" style="paddding-right:10px; color:#019017"></i>&ensp;  Xem thông tin từ chối
           </a>
            <a  class="dropdown-item btnGuiDuyet" href="#" data="${ID}">
                 <i class="fa-solid fa-paper-plane " aria-hidden="true" style="paddding-right:10px; color:var(--primary-color)"></i>&ensp;  Gửi phê duyệt tin đăng tuyển
           </a>
           <a  class="dropdown-item btnSuaGrid1  " href="#" data="${ID}">
                <i class="fa fa-pencil text-warning" aria-hidden="true"></i>&ensp;  Chỉnh sửa tin đăng tuyển
           </a>

            <a  class="dropdown-item btnXoaGrid1" href="#" data="${ID}">
                <i class='fa fa-trash-o  text-danger'></i>&ensp;  Xóa tin đăng tuyển
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
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        //{ title: "Thao tác", hozAlign: "center", vertAlign: "middle", formatter: btnThaoTac, headerSort: false, headerHozAlign: "center", minWidth: 120 },
        {
            title: '<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
            field: "actions",
            formatter: actionDropdownFormatter, width: 60, headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", headerSort: false
        },
        { title: "ViecTimNguoiID", field: "ViecTimNguoiID", width:250, visible: false, headerHozAlign: "center" },
        { title: "Ngày đăng", field: "NgayDang", vertAlign: "middle", hozAlign: "center", visible: true, minWidth: 100, headerHozAlign: "center" },
        { title: "Vị trí tuyển dụng", vertAlign: "middle", field: "TenCongViec", hozAlign: "left", visible: true, minWidth: 250, headerHozAlign: "center" , formatter: "textarea",},
        { title: "Số lượng", field: "SoLuongTuyen", vertAlign: "middle", hozAlign: "right", visible: true, minWidth: 100, headerHozAlign: "center" },
        { title: "Ngành nghề", field: "TenNganhNghe", vertAlign: "middle", hozAlign: "left", visible: true, minWidth: 300, headerHozAlign: "center" },
        { title: "Ngày hết hạn", field: "HanNop", vertAlign: "middle", hozAlign: "center", minWidth: 130, formatter: "textarea", headerHozAlign: "center" },
        { title: "Tình trạng", field: "TrangThai", vertAlign: "middle", hozAlign: "center", minWidth: 150, formatter: status, headerHozAlign: "center" },
       // { title: "Tạ thái", field: "TrangThai", vertAlign: "middle", hozAlign: "center", minWidth: 150, formatter: labelDangSD, headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "DangSD", vertAlign: "middle", hozAlign: "center", minWidth: 150, formatter: fmMacDinhSD, headerHozAlign: "center" },
    ],
    footerElement: "<span id='row-count' style='color:#102D4F;font-size: 13px; font-family: Arial, Helvetica, sans-serif;font-weight:100'></span>", //add element element to footer to contain count
    //dataFiltered: updateFooter, //call updateFooter function when callback triggered
    //dataLoaded: updateFooter, //call updateFooter function when callback triggered
    rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
        SuaDuLieu(row.getData().ViecTimNguoiID);
    },
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu'
});

async function LoadDataTable() {
    var saveData = new Array();
    saveData[0] = $('#TrangThai_TimKiem_us').value();
    saveData[1] = $('#ViTriCongViec_TimKiem_us').value();
    saveData[2] = $('#MucLuong_TimKiem_us').value();
    saveData[3] = $('#KinhNghiem_TimKiem_us').value();
    saveData[4] = $('#HocVan_TimKiem_us').value();
    saveData[5] = $('#timKiem').value();
    table.clearData();
    const GetAll = await NTS.getAjaxAsync("/NhaTuyenDung/DangTinTuyenDung/GetAll", { data: saveData});
    if (!GetAll.Err) {
        table.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}


table.on("rowDblClick", function (e, row) {
    SuaDuLieu(row.getData().ViecTimNguoiID);
});

$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        table.setFilter(matchAny, { value: $(this).val() });
        updateFooter();
    }
});
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
function generateSlug(phrase) {
    var str = removeDiacritics(phrase).toLowerCase();
    str = str.replace(/\s+/g, '-'); // Thay thế khoảng trắng bằng dấu gạch ngang
    str = str.replace(/[^a-z0-9-]/g, ''); // Loại bỏ các ký tự đặc biệt
    str = str.replace(/-+/g, '-'); // Loại bỏ các dấu gạch ngang thừa
    return str.trim('-');
}
$('#TenCongViec').on('change', function () {
    var DinhDanh = generateSlug($('#TenCongViec').value());
    $('#TenViecLam').value(DinhDanh);
});
//set filter to custom function
$('#btnLuuVaDong').on('click', function () {
    const validate = new NTSValidate('#mdThemMoi');
    if (!validate.trim().check()) {
        return false;
    }

    if ($('#SoLuong').value() < 0) {
        return NTS.canhbao("Số lượng không được nhỏ hơn 0");
    }
    if (isNaN($('#SoLuong').value())) {
        return NTS.canhbao("Số lượng không đúng định dạng");
    }
    var param = new Array();
    param[0] = tempthem;
    param[1] = $('#ViecTimNguoiID').value();
    param[2] = $('#NgayDangTuyen').value();
    param[3] = $('#HanNop').value();
    param[4] = $('#TenCongViec').value();
    param[5] = $('#CapBac').value();
    param[6] = JSON.stringify($('#NganhNghe').value());
    param[7] = JSON.stringify($('#DiaDiem').value());
    param[8] = $('#SoLuong').value();
    param[9] = $('#GioiTinh').value();
    param[10] = $('#HinhThucLamViec').value();
    param[11] = $('#TrinhDoHocVan').value();
    param[12] = $('#KinhNghiem').value();
    param[13] = $('#MucLuong').value();
    param[14] = $('#MoTaCongViec').value();
    param[15] = $('#YeuCauCongViec').value();
    param[16] = $('#CheDoPhucLoi').value();
    param[17] = $('#YeuCauHoSo').value();
    param[18] = $('#HinhThucNopHoSo').value();
    param[19] = $('#NguoiLienHe').value();
    param[20] = $('#ChucVu').value();
    param[21] = $('#SoDienThoai').value();
    param[22] = $('#Email').value();
    param[23] = $('#DiaChi').value();
    param[24] = $('#ckAnTinTuyenDung').value();
    param[25] = JSON.stringify($('#DoiTuongUuTien').value());
    try {
        var matutang = NTS.getAjax('/CongThongTinViecLam/Function/LayMaTuTang', { strKyTu: "", strCotTang: "MaViecTimNguoi", strBangTang: "ViecTimNguoi", strDinhDang: "000000" });
        param[26] = matutang.Result
    } catch (e) { }
    param[27] = $('#TenViecLam').value();
    var HanNop = moment($('#HanNop').val(), "DD/MM/YYYY");
    var NgayDangTuyen = moment($('#NgayDangTuyen').val(), "DD/MM/YYYY");
    if (HanNop.isValid() && NgayDangTuyen.isValid()) {
        if (HanNop < NgayDangTuyen) {
            NTS.canhbao('Ngày đăng tuyển không được nhỏ hơn ngày hạn nộp hồ sơ!');
            return false;
        }
    }
    var result = NTS.getAjax("/NhaTuyenDung/DangTinTuyenDung/LuuThongTin", { data: param });
    if (!result.Err) {
        NTS.thanhcong(result.Msg);
        LoadDataTable();
        $('#mdThemMoi').modal('hide');
        return false;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }    
})
function LoadDataEdit(data) {
    $('#mdThemMoi').modal('show');
}
$(function () {

    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy'

    });
})
function SuaDuLieu(ID) {

    var result = NTS.getAjax('/NhaTuyenDung/DangTinTuyenDung/LoadDuLieuSua', { ID: ID }).Result;
    if (result.length > 0) {
        layToanBoDuLieu();
        data = result[0];
        $('#tieuDeModal').text("Cập nhật tin tuyển dụng");
        $('#NgayDangTuyen').value(data.NgayDang);
        $('#HanNop').value(data.HanNop);
        $('#TenCongViec').value(data.TenCongViec);
        $('#CapBac').value(data.ChucVuID);
        $('#NganhNghe').value(JSON.parse(data.NganhNghe));
        $('#DiaDiem').value(JSON.parse(data.DiaDiemLamViec));
        $('#SoLuong').value(data.SoLuongTuyen);
        $('#GioiTinh').value(data.GioiTinhID);
        $('#HinhThucLamViec').value(data.HinhThucLamViecID);
        $('#TrinhDoHocVan').value(data.TrinhDoHVID);
        $('#KinhNghiem').value(data.KinhNghiemID);
        $('#MucLuong').value(data.MucLuongID);
        $('#MoTaCongViec').value(data.MoTaCongViec);
        $('#YeuCauCongViec').value(data.YeuCauCongViec);
        $('#CheDoPhucLoi').value(data.CheDoPhucLoiID);
        $('#YeuCauHoSo').value(data.YeuCauHoSo);
        $('#HinhThucNopHoSo').value(data.HinhThucTuyenDungID);
        $('#NguoiLienHe').value(data.HoTen_NguoiLienHe);
        $('#ChucVu').value(data.SoDT_NguoiLienHe);
        $('#SoDienThoai').value(data.SoDT_NguoiLienHe);
        $('#Email').value(data.Email_NguoiLienhe);
        $('#DiaChi').value(data.DiaChi_NguoiLienHe);
        $('#ViecTimNguoiID').val(data.ViecTimNguoiID);
        $('#ckAnTinTuyenDung').value(data.DangSD);
        $('#DoiTuongUuTien').value(JSON.parse(data.DoiTuongUuTienID));
        $('#mdThemMoi').modal('show');
        UpdateLabel('#ckAnTinTuyenDung', 'Hiển thị tin đăng tuyển', 'Ẩn tin đăng tuyển');
        tempthem = "sua";
    }
    else {
        NTS.loi('Tải dữ liệu sửa thất bại')
    }
}
function XoaDanhHieu(ID) {
    CanhBaoXoa(() => {
        const result = NTS.getAjax('/NhaTuyenDung/DangTinTuyenDung/XoaTinTuyenDung', { id: ID });
        if (!result.Err) {
            LoadDataTable();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });    
}

function matchAny(data, filterParams) {
    //data - the data for the row being filtered
    //filterParams - params object passed to the filter
    var match = false;
    for (var key in data) {
        try {
            if (data[key] != "") {
                if (data[key].toLowerCase().indexOf(filterParams.value.toLowerCase()) !== -1) {
                    match = true;
                    return match;
                }
            }
        }
        catch (e) { }
    }
    return match;
}

function GetTrangThaiTTD(data) {
    if (data == 1) {
        return "Mới tạo";
    } else if (data == 2) {
        return "Đã gửi duyệt";
    } else if (data == 3) {
        return "Đang đăng tuyển";
    } else {
        return "Đã từ chối";
    }
}

function GetColorTrangThai(data) {
    if (data == 1) {
        return "bg-warning";
    } else if (data == 2) {
        return "bg-info";
    } else if (data == 3) {
        return "bg-success";
    } else {
        return "bg-danger";
    }
}

function btnXuatExcel() {
    //$('#modal_xemtruockhiin_us').modal('show');
    var data = NTS.getAjax('json', "/View/NhaTuyenDung/DangTinTuyenDung.aspx/XuatBaoCao", {});
    //$('#divNoiDung_us').attr("src", data);
    if (data != "") {
        window.open(data.split('_')[1]);
    } else {
        NTS.thanhcong("Đã có lỗi xảy ra");
    }
}

function GuiXetDuyet(ID) {
    CanhBaoGuiPheDuyetTinDangTuyen(() => {
        const result = NTS.getAjax('/NhaTuyenDung/DangTinTuyenDung/GuiDuyetTinTuyenDung', { id: ID });
        if (!result.Err) {
            LoadDataTable();
            NTS.thanhcong(result.Msg);
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }, () => {  }, "");
}

async function XemNoiDungTuChoi(ID) {
    var result = await NTS.getAjaxAsync('/NhaTuyenDung/DangTinTuyenDung/XemNoiDungTuChoi', { ID: ID });
    $('#NgayTuChoi').html(result[0].NgayTuChoi);
    $('#NoiDungTuChoi').html(result[0].NoiDungTuChoi);
}
$('#GioiTinh').on('select2:opening', function (e) {
    setTimeout(function () {
        $($('#select2-GioiTinh-results li')[1]).text('Không yêu cầu')
    }, 1);
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

TimKiem//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiem', async function () {
    await LoadDataTable();
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
    saveData[1] = $('#ViTriCongViec_TimKiem_us').value();
    saveData[2] = $('#MucLuong_TimKiem_us').value();
    saveData[3] = $('#KinhNghiem_TimKiem_us').value();
    saveData[4] = $('#HocVan_TimKiem_us').value();
    saveData[5] = $('#timKiem').value();
    var kq = await NTS.getAjaxAsync('/NhaTuyenDung/DangTinTuyenDung/XuatExcel_DSTinTuyenDung', { data: saveData });
    if (!kq.Err) {
        window.open(kq);
    } else {
        NTS.loi(kq.Msg);
    }
});