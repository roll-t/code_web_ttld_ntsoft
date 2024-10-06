var tempthem = "them";
var tenBangThamChieu = 'ToChuc';
var tempSuaTTTabView = false;
var rowPosition = "";
$(function () {
    checkMacDinhSD('.checkMacDinhSD', 'ToChuc', 'ToChucID');
    LoadTimKiem();
    setTimeout(function () {
        PhanQuyenComBoDiaBan('TinhID_TimKiem_us', 'HuyenID_TimKiem_us', 'XaID_TimKiem_us', 'ThonID_TimKiem_us');
    }, 150);
});
$(document).ready(function () {
   ThietLapCotTrenLuoi(tenBangThamChieu, Grid1); // thiết lập cột trên lưới
    setTimeout(function () {
        LoadDataTable();
    }, 300);

    //Định dạng nhập xxxx.xxx.xxx cho số điện thoại
    $('#SoDienThoai_us').on('input', function () {
        formatPhoneNumberNhap(this);
    });

    // Restrict input to numbers only
    $('#SoDienThoai_us').on('keydown', function (event) {
        // Allow control keys (backspace, delete, tab, etc.)
        if (event.ctrlKey || event.metaKey || [8, 46, 37, 38, 39, 40, 9, 27, 13].includes(event.keyCode)) {
            return;
        }
        // Check if event.key is defined and allow only numeric input
        if (event.key && event.key.match(/[\d]/)) {
            return;
        }
        // Prevent default action if not allowed
        event.preventDefault();
    });
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
            name: '#LoaiHinhDN_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetComBo_LoaiHinhNoiLV',
            columns: 1,
            indexValue: 0,
            indexText: 1,
            textShowTatCa: '--Tất cả--',
            showTatCa: !0,
        });
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
        textShowTatCa: '(Tất cả)',
        showTatCa: !0
    });
});

function formaternamTrongKCN(value, ID) {
    return ` <div class="form-group">
                <label class="form-check">
                    <input class="form-check-input checkDangNamTrongKCN" type="checkbox" data='${ID}' id="customCheckbox1${ID}" ` + (value ? 'checked' : '') + `>
                    <label class="form-check-label" for="customCheckbox1${ID}"></label>
                </label>
                
            </div>`;
}

var fmGhiChu = function (cell) {
    var ID = cell.getData().ToChucID;
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

var fmNganhNgheKD = function (cell) {
    var ID = cell.getData().ToChucID;
    var NganhNghe = cell.getValue();
    if (NganhNghe == ";") {
        return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;"></p>
                    </div>`;
    }
    if (NganhNghe != "") {
        if (NganhNghe.length > 40) {
            NganhNghe = NganhNghe.substring(0, 35) + "...";
            return `
                        <div class="col-md-12" style="padding-right: 0px; padding-left: 0px; padding-bottom:4px;">
                            <div class="Content-text">${NganhNghe}<span class='btnXemThemNganhNghe' style='color:var(--tblr-primary);'  title="Xem chi tiết ngành nghề kinh doanh chính" data='${ID}' data-loai='TC'>Xem thêm</span></div>
                        </div>`;
        } else {
            return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${NganhNghe}</p>
                    </div>`;
        }
    } else {
        return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${NganhNghe}</p>
                    </div>`;
    }
}

var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().ToChucID);
}

var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().ToChucID);
}

var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().ToChucID);
}

var fmNamTrongKCN = function (cell) {
    return formaternamTrongKCN(cell.getValue(), cell.getData().ToChucID);
}

function actionDropdownFormatter(cell, formatterParams, onRendered) {
    var ID = cell.getData().ToChucID;
    var ChuHo = cell.getData().ChuHo;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
       <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
       <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
           <a class="dropdown-item btnXemTTToChuc " href="#" data="${ID}" >
                <i class="fa fa-eye " aria-hidden="true" style="paddding-right:10px; color:#019017;"></i>&ensp;  Xem thông tin tổ chức
           </a>           
           <a class="dropdown-item btnSuaToChuc" href="#" data="${ID}">
                <i class="fa fa-pencil text-warning" aria-hidden="true"></i>&ensp;  Chỉnh sửa tổ chức
           </a>
            ` + (ChuHo == 1 ? `` : ` <a class="dropdown-item btnXoaToChuc" href="#" data="${ID}">
            <i class='fa fa-trash-o  text-danger'></i>&ensp; Xóa tổ chức
           </a>    `) + `
                            
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
    height: '80vh',
    columns: [
        {
            title: '<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
            field: "actions",
            formatter: actionDropdownFormatter, width: 60, headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", headerSort: false
        },
        { title: "Mã tổ chức", field: "MaToChuc", formatter: 'textarea', width: 150, vertAlign: "middle", minWidth: 70, headerHozAlign: "center" },
        { title: "Tên tổ chức", field: "TenToChuc", formatter: 'textarea', minWidth: 250, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Tên khu công nghiệp", field: "TenKCN", formatter: 'textarea', minWidth: 250, vertAlign: "middle", width: 184, headerHozAlign: "center" },
        { title: "Tên người sử dụng lao động", field: "TenNguoiSuDungLD", formatter: 'textarea', width: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "CCCD/CMND/Số định danh", field: "SoCCCD", formatter: 'textarea', vertAlign: "middle", width: 120, headerHozAlign: "center", hozAlign: "left" },
        { title: "Mã số thuế", field: "MaSoThue", formatter: 'textarea', vertAlign: "middle", width: 120, headerHozAlign: "center", hozAlign: "left" },
        { title: "Số điện thoại", field: "SoDienThoai", formatter: 'textarea', width: 120, vertAlign: "middle", minWidth: 70, headerHozAlign: "left" },
        { title: "Ngày hoạt động", field: "NgayHoatDong", formatter: 'textarea', hozAlign: "center", width: 120, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Loại hình doanh nghiệp", field: "TenLoaiHinhDoanhNghiep", formatter: 'textarea', width: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Tên ngành nghề kinh doanh chính", field: "TenNganhNgheKD", formatter: fmNganhNgheKD, width: 320, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Địa chỉ", field: "DiaChiCuThe", formatter: 'textarea', minWidth: 250, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Số nhà", field: "SoNha", formatter: 'textarea', width: 150, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Thôn/Xóm", field: "TenThon", formatter: 'textarea', vertAlign: "middle", minWidth: 200, headerHozAlign: "center" },
        { title: "Phường/Xã", field: "TenXa", formatter: 'textarea', vertAlign: "middle", minWidth: 200, headerHozAlign: "center" },
        { title: "Quận/Huyện", field: "TenHuyen", formatter: 'textarea', vertAlign: "middle", minWidth: 200, headerHozAlign: "center" },
        { title: "Tỉnh/Thành phố", field: "TenTinh", formatter: 'textarea', vertAlign: "middle", minWidth: 200, headerHozAlign: "center" },
        { title: "Email", field: "Email", formatter: 'textarea', hozAlign: "left", minWidth: 250, vertAlign: "middle", headerHozAlign: "center", headerSort: false },
        { title: "Tình trạng hoạt động", field: "TenTinhTrangHDKinhTe", formatter: 'textarea', hozAlign: "left", minWidth: 250, vertAlign: "middle", headerHozAlign: "center", headerSort: false },
        { title: "Ghi chú", field: "GhiChu", formatter: fmGhiChu, hozAlign: "left", width: 250, vertAlign: "middle", headerHozAlign: "center", headerSort: false },
        { title: "Nằm trong KCN", field: "NamTrongKCN", hozAlign: "center", width: 130, formatter: fmNamTrongKCN, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 130, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "ToChucID", field: "ToChucID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

Grid1.on("rowDblClick", function (e, row) {
    $('#ToChucID').val(row.getData().ToChucID);
    SuaDuLieuToChuc_us(row.getData().ToChucID);
});

async function LoadDataTable() {
    var saveData = new Array();
    saveData[0] = $('#TinhID_TimKiem_us').value();
    saveData[1] = $('#HuyenID_TimKiem_us').value();
    saveData[2] = $('#XaID_TimKiem_us').value();
    saveData[3] = $('#ThonID_TimKiem_us').value();
    saveData[4] = $('#timKiem').value();
    saveData[5] = $('#LoaiHinhDN_TimKiem_us').value();
    Grid1.clearData();
    GridToChuc_List.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/ToChuc/GetAll", { data: saveData });
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
        GridToChuc_List.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
    GridKhongCoDuLieu("Grid1");
}

function checkNamTrongKCN(selector, tenBang, tenCot) {
    $(document).on('change', selector, function () {
        var inp = $(this);
        var id = $(this).attr('data');
        if (!QuyenSua()) {
            inp.prop('checked', !inp.prop('checked'));
            return false;
        }
        var Width = window.innerWidth;
        $.confirm({
            title: '<span style="font-size:18px" class="text-warning">Cảnh báo cập nhật dữ liệu!</span>',
            type: 'orange',
            icon: 'fa fa-question-circle',
            typeAnimated: true,
            theme: 'material',
            columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
            content: NTS.CauCanhBaoDangSDV2,
            buttons: {
                confirm: {
                    text: '<i class="fa fa-check"></i> Có',
                    btnClass: 'btn-outline-primary',
                    keys: ['enter'],
                    action: function () {
                        var result = NTS.getAjax('/DanhMuc/ToChuc/NamTrongKCN', { ID: id, strCotID: tenCot, strBang: tenBang, value: inp.prop('checked') });
                        if (!result.Err) {
                            NTS.thanhcong(result.Msg);
                        }
                        else {
                            NTS.loi(result.Msg);
                            inp.prop('checked', !inp.prop('checked'));
                        }
                    }
                },
                cancel: {
                    text: '<i class="fa fa-close"></i> Không',
                    btnClass: 'btn-danger',
                    keys: ['esc'],
                    action: function () {
                        inp.prop('checked', !inp.prop('checked'));
                    }
                }
            }
        });

    })
}

checkDangSD('.checkDangSD', 'ToChuc', 'ToChucID');

checkNamTrongKCN('.checkDangNamTrongKCN', 'ToChuc', 'ToChucID');

$('#TrangThai').on('change', function () {
    UpdateLabelDangSD(this);
});

// Xem chi tiết nội dung ghi chú hộ gia đình
$(document).on('click', '.btnXemThemGhiChu', function () {
    $('#ToChucID').val($(this).attr('data'));
    XemChiTietGhiChu($(this).attr('data'));
});

function XemChiTietGhiChu(ID) {
    $("#mdXemThem").modal('show');
    $('#tieuDeModalCT').text('Chi tiết nội dung ghi chú');
    const result = NTS.getAjax("/DanhMuc/ToChuc/GhiChuCT", { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#NoiDungGhiChu_CT').html(data.GhiChu);
    } else {
        $('#NoiDungGhiChu_CT').html("Chưa có dữ liệu");
    }
    return;
}

// Xem chi tiết nội dung ghi chú hộ gia đình
$(document).on('click', '.btnXemThemNganhNghe', function () {
    $('#ToChucID').val($(this).attr('data'));
    XemChiTietNganhNghe($(this).attr('data'));
});

function XemChiTietNganhNghe(ID) {
    $("#mdXemThem").modal('show');
    $('#tieuDeModalCT').text('Chi tiết nội dung ngành nghề kinh doanh chính');
    const result = NTS.getAjax("/DanhMuc/ToChuc/NganhNgheKinhDoanhCT", { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        let tenNganhNgheKD = data.TenNganhNgheKD;

        // Tách chuỗi thành các phần tử dựa trên dấu phẩy và khoảng trắng
        let nganhNgheArray = tenNganhNgheKD.split(';').map(item => item.trim()).filter(item => item);

        // Tạo HTML với mỗi phần tử trên một dòng
        let htmlContent = nganhNgheArray.map(item => `- ${item};`).join('<br>');

        $('#NoiDungGhiChu_CT').html(htmlContent);
    } else {
        $('#NoiDungGhiChu_CT').html("Chưa có dữ liệu");
    }

    return;
}


//-------------------Sua du lieu tổ chức--------------------//
$(document).on('click', '.btnSuaToChuc', function () {
    var ID = $(this).attr('data');
    SuaDuLieuToChuc_us(ID);
});
//-------------------Xem thông tin tổ chức--------------------//
$(document).on('click', '.btnXemTTToChuc', function () {
    var ID = $(this).attr('data');
    showModalXemThongTinToChuc_us(ID);
});

// Hàm ẩn số điện thoại
function formatPhoneNumber(phoneNumber) {
    if (phoneNumber.length > 4) {
        return phoneNumber.substring(0, 4) + '.xxx.xxx';
    }
    return phoneNumber;
}

function showModalXemThongTinToChuc_us(ID) {
    $('#mdXemChiTietToChuc_us').modal('show');
    LoadDataTable_QuaTrinhThuThap_Xem(ID);
    const result = NTS.getAjax('/DanhMuc/ToChuc/XemThongTinToChuc', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#mdXemTTToChuc').html("Xem thông tin tổ chức: " + data.TenToChuc.toUpperCase());
        $('#lblTenToChuc_usTC').html(data.TenToChuc);
        $('#lblSoDKKD_usTC').html(data.MaSoThue);
        $('#lblTenNgoiSDLD_usTC').html(data.TenNguoiSuDungLD);
        $('#lblTinhTrangHD_usTC').html(data.TenTinhTrangHD);
        $('#lblDiaChi_usTC').html(data.DiaChiCuThe);
        $('#lblTinh_usTC').html(data.TenTinh);
        $('#lblhuyen_usToChuc').html(data.TenHuyen);
        $('#lblXa_usToChuc').html(data.TenXa);

        if (data.TenNganhNgheKD == ";" || data.TenNganhNgheKD == "") {
            $('#lblNganhNghe_usTC').html('---');
        } else {
            $('#lblNganhNghe_usTC').html(data.TenNganhNgheKD);
        }

        if (data.SoDienThoai == "") {
            $('#lblSoDienThoai_usTC').html('---');
        } else {
            $('#lblSoDienThoai_usTC').html(formatPhoneNumber(data.SoDienThoai));
        }

        if (data.Email == "") {
            $('#lblEmail_usTC').html('---');
        } else {
            $('#lblEmail_usTC').html(data.Email);
        }

        if (data.NgayHoatDong == "") {
            $('#lblNgayHoatDong_usTC').html('---');
        } else {
            $('#lblNgayHoatDong_usTC').html(data.NgayHoatDong);
        }
        if (data.TenLoaiHinh == "") {
            $('#lblLoaiHinhDN_usTC').html('---');
        } else {
            $('#lblLoaiHinhDN_usTC').html(data.TenLoaiHinh);
        }
        if (data.SoCCCD == "") {
            $('#lblSoCCCD_usTC').html('---');
        } else {
            $('#lblSoCCCD_usTC').html(data.SoCCCD);
        }
        if (data.TenThon == "") {
            $('#lblThon_usTC').html('---');
        } else {
            $('#lblThon_usTC').html(data.TenThon);
        }
        if (data.TenKCN == "") {
            $('#lblTenKCN_usTC').html('---');
        } else {
            $('#lblTenKCN_usTC').html(data.TenKCN);
        }

        if (data.GhiChu == "") {
            $('#lblGhiChu_usTC').html(`<p style="display: inline;font-weight: normal;">Ghi chú: </p> ` + '---');
        } else {
            $('#lblGhiChu_usTC').html('<p style="display: inline;font-weight: normal;">Ghi chú: </p>' + data.GhiChu);
        }
        if (data.NamTrongKCN == 1) {
            $('#lblNamTrongKCN_usTC').prop('checked', true);
        } else {
            $('#lblNamTrongKCN_usTC').prop('checked', false);
        }
    }
}
//-------------------Sửa dữ liệu tổ chức------------------//
function SuaDuLieuToChuc_us(ID) {    
    if (!QuyenSua()) {
        return false;
    }
    $('#tieuDeModal_ThemToChuc_us').text('Cập nhật thông tin tổ chức');
    $('#mdThemMoiToChuc_us').modal('show');
    resetForm('#mdThemMoiToChuc_us');
    const result = NTS.getAjax('/DanhMuc/ToChuc/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        PhanQuyenComBoDiaBan('TinhID_us_TC', 'HuyenID_us_TC', 'XaID_us_TC', 'ThonID_us_TC');
        $('#ToChucID').value(data.ToChucID);
        $('#MaToChuc_us').value(data.MaToChuc);
        $('#NamTrongKCN').value(data.NamTrongKCN);
        $('#TenKCN_us').value(data.TenKCN);
        $('#MaSoThue_us').value(data.MaSoThue);
        $('#TenToChuc_us').value(data.TenToChuc);
        $('#TenNguoiSDLD_us').value(data.TenNguoiSuDungLD);
        $('#SoCCCD_us').value(data.SoCCCD);
        $('#LoaiHinhDNID_us_TC').value(data.LoaiHinhDNID);
        $('#TinhTrangHDID_us').value(data.TinhTrangTGHDKTID);
        $('#NgayHoatDong_us_TC').value(data.NgayHoatDong);
        $('#SoDienThoai_us').value(data.SoDienThoai);
        $('#Email_us').value(data.Email);
        setTimeout(() => {
            $('#TinhID_us_TC').value(data.DiaBanHCID_Tinh);
            $('#HuyenID_us_TC').value(data.DiaBanHCID_Huyen);
            $('#XaID_us_TC').value(data.DiaBanHCID_Xa);
            $('#ThonID_us_TC').value(data.DiaBanHCID_Thon);
        }, 100);
        $('#SoNha_us_TC').value(data.SoNha);
        $('#DiaChi_us_TC').text(data.DiaChiCuThe);
        $('#GhiChuTC_us').value(data.GhiChu);
        $('#TrangThaiToChuc_us').value(data.TrangThai);
        $('#NganhNgheID_us_TC').value(JSON.parse(data.NganhKinhTeID));
        $('#lblTenToChuc_ToChuc_us').html(data.TenToChuc);
        $('#lblSoDKKD_ToChuc_us').html(data.MaSoThue);
        $('#lblLoaiHinhDN_ToChuc_us').html(data.TenLoaiHinh);
        $('#lblTenNguoiSDLD_ToChuc_us').html(data.TenNguoiSuDungLD);
        $('#lblSoDienThoaiToChuc_us').html(data.SoDienThoai);
        $('#lblEmail_ToChuc_us').html(data.Email);
        $('#lblDiaChi_ToChuc_us').html(data.DiaChiCuThe);
        UpdateLabelDangSD('#TrangThaiToChuc_us');
        if (data.TenNganhNgheKD == ";") {
            $('#lblNganhNgheKD_ToChuc_us').html('---');
        } else {
            $('#lblNganhNgheKD_ToChuc_us').html(data.TenNganhNgheKD);
        }
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
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
    //LoadDataTable_ListHoGD();
    //LoadDataChuHoGD('');
    //Grid_ThanhVien_View.clearData();
    //LoadDataTable_TaiLieuLuuGiuTabTT('');
    //$('#btnSua2').removeAttr("data");
    //$('#btnThem2').removeAttr("data");
    //$('#btnXoa2').removeAttr("data");
    //$('#btnXem2').removeAttr("data");
    //$('#btnXuatDanhSachThanhVien2').removeAttr("data");

});

$(document).on('click', '#btnThemMoi', function () {
    if (!QuyenThem()) {
        return false;
    }
    tempthem = 'them';
    $('#tieuDeModal_ThemToChuc_us').text('Thêm mới tổ chức');
    PhanQuyenComBoDiaBan('TinhID_us_TC', 'HuyenID_us_TC', 'XaID_us_TC', 'ThonID_us_TC');
    showModalThemMoiToChuc();
});
//-----------------------Lưu thông tin tổ chức--------------//
$(document).on('click', '#btnLuuVaDongThemToChuc_us', function () {
    const validate = new NTSValidate('#mdThemMoiToChuc_us');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }
    if ($('#SoCCCD_us').val() != "") {
        if ($('#SoCCCD_us').val().length !== 12 && $('#SoCCCD_us').val().length !== 9) {
            NTS.canhbao("Số CMND/CCCD/Số định danh cá nhân chưa đúng định dạng!");
            return false;
        }
    }
    if ($('#SoDienThoai_us').value() != "") {
        if ($('#SoDienThoai_us').value().length < 12) {
            NTS.canhbao("Số điện thoại chưa đúng định dạng!");
            return false;
        }
    }

    var saveData = new Array();
    saveData[0] = tempthem;
    saveData[1] = $('#ToChucID').value();
    saveData[2] = $('#MaToChuc_us').value();
    saveData[3] = $('#NamTrongKCN').value();
    saveData[4] = $('#TenKCN_us').value();
    saveData[5] = $('#MaSoThue_us').value();
    saveData[6] = $('#TenToChuc_us').value();
    saveData[7] = $('#TenNguoiSDLD_us').value();
    saveData[8] = $('#SoCCCD_us').value();
    saveData[9] = $('#LoaiHinhDNID_us_TC').value();
    saveData[10] = $('#TinhTrangHDID_us').value();
    saveData[11] = $('#NgayHoatDong_us_TC').value();
    saveData[12] = $('#SoDienThoai_us').value();
    saveData[13] = $('#Email_us').value();
    saveData[14] = $('#TinhID_us_TC').value();
    saveData[15] = $('#HuyenID_us_TC').value();
    saveData[16] = $('#XaID_us_TC').value();
    saveData[17] = $('#ThonID_us_TC').value();
    saveData[18] = $('#SoNha_us_TC').value();
    saveData[19] = $('#DiaChi_us_TC').text();
    saveData[20] = $('#GhiChuTC_us').value();
    saveData[21] = $('#TrangThaiToChuc_us').value();
    saveData[22] = JSON.stringify($('#NganhNgheID_us_TC').value());
    var result = NTS.getAjax('/DanhMuc/ToChuc/LuuThongTin', { data: saveData });
    if (!result.Err) {
        if (result.Logs == "1") {
            CanhBaoTrungMaSoThue(() => { }, result.Msg);
        } else {
            if (tempSuaTTTabView == true) {
                LoadDataTable();
                $('#mdThemMoiToChuc_us').modal('hide');
                GridToChuc_List.selectRow(rowPosition);
                LoadDataToChuc_TabView($('#ToChucID').value());
                NTS.thanhcong(result.Msg);
                tempSuaTTTabView = false;
                rowPosition = "";
                return false;
            } else {
                LoadDataTable();
                NTS.thanhcong(result.Msg);
                $('#mdThemMoiToChuc_us').modal('hide');
                return false;
            }
        }
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});
//-------------------------Gird dạng lưới Đối tượng-----------------------//
var GridToChuc_List = new Tabulator("#GridToChuc_List", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    selectableRows: 1,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "595",
    HeaderVertAlign: "center",
    headerVisible: false,
    selectable: 1,
    columns: [
        { title: "Thông tin tổ chức", field: "ThongTinToChuc", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 300, headerSort: false },
        { title: "ToChucID", field: "ToChucID", width: 0, visible: false }
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
        rowTabletr.classList.add("btnXemTTDoiTuong");
        rowTabletr.setAttribute("data-value", data.ToChucID);
        cellContents = "<td><div style='border: 1px solid var(--tblr-color-header);border-radius: 50%;height: 50px;display: flex;align-items: center;justify-content: center;font-weight: bold;color: var(--tblr-color-header);width: 50px;'><img id='avatar_DoiTuong' class=' editable editable-click editable-empty img-fluid' alt='Hình đại diện' src='/Images/user.png'></div></td>";
        cellContents += "<td><div style='text-align: left;width: 240px;white-space: break-spaces;'><strong>" + data.TenToChuc + "</strong> </div><div style='text-align: left !important;font-size: 12px!important;width: 240px;white-space: break-spaces;'>" + data.DiaChiCuThe + "</div></td>"
        rowTabletr.innerHTML = cellContents;
        rowTable.appendChild(rowTabletr);
        element.append(rowTable);
    },
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
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
            if ($('#mdThemMoiToChuc_us').hasClass('show')) {
                $('#mdThemMoiToChuc_us').modal('hide');
                e.preventDefault();
                break;
            } else if ($('#mdXemChiTietToChuc_us').hasClass('show')) {
                $('#mdXemChiTietToChuc_us').modal('hide');
                e.preventDefault();
                break;
            }
        case 120:
            if (hotKey == 1)
                if ($('#mdThemMoiToChuc_us').hasClass('show')) {
                    $('#btnLuuVaDongThemToChuc_us').trigger('click');
                    e.preventDefault();
                    break;
                } 
    }
});
$(document).on('shown.bs.modal', '#mdThemMoiToChuc_us', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdThemMoiToChuc_us', function () {
    hotKey = 0;
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

//-----------------------------------------------------------------------

function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'ToChucID', ID: ID, TenBangHienTai: 'ToChuc', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/ToChuc/XoaDuLieu', { id: ID });
                if (!result.Err) {
                    LoadDataTable();
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

$(document).on('click', '.btnXoaToChuc', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieu(ID);
});

//------------------------------------------- Tìm kiếm--------------------------------------
$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        Grid1.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid1.setFilter(matchAny, { value: $('#timKiem').val() });
});


//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiem', async function () {
    await LoadDataTable();
  /*  await LoadDataTable_ListTab2();*/
    $('#KhungTimKiem').slideUp(200);
    return false;

});

$(document).on('click', '#DongTimKiem', function () {
    $('#KhungTimKiem').slideUp(200);
    return false;
});

//$(document).on('keyup', '#timKiem', async function (e) {
//    if (e.keyCode == '13') {
//        //await LoadDataTable_ListTab2();
//        await LoadDataTable();
//        $('#KhungTimKiem').slideUp(200);
//        return false;
//    }
//});

///-----------------------Xuất danh sách excel thông tin tổ chức
$('#btnExport').on('click', async function () {
    var saveData = new Array();
    saveData[0] = $('#TinhID_TimKiem_us').value();
    saveData[1] = $('#HuyenID_TimKiem_us').value();
    saveData[2] = $('#XaID_TimKiem_us').value();
    saveData[3] = $('#ThonID_TimKiem_us').value();
    saveData[4] = $('#timKiem').value();
    saveData[5] = $('#LoaiHinhDN_TimKiem_us').value();
    const kq = await NTS.getAjaxAsync("/DanhMuc/ToChuc/XuatExcel_ToChuc", { data: saveData });
    if (!kq.Err) {
        window.open(kq);
    } else {
        NTS.loi(kq.Msg);
    }
});

//-------------------Tab View thông tin tổ chức-------------------
GridToChuc_List.on("rowClick", function (e, row) {
    var ID = row.getData().ToChucID;
    rowPosition = row.getPosition();
    LoadDataToChuc_TabView(ID);
    LoadDataTableCungLD_TabQuaTrinh(ID);
    $('#btnSua2').attr("data", ID);
    $('#btnXem2').attr("data", ID);
    $('#btnXoa2').attr("data", ID);
    $('#ToChucID').value(ID);
});

function LoadDataToChuc_TabView(ID) {
    const result = NTS.getAjax('/DanhMuc/ToChuc/XemThongTinToChuc_TabView', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#lblTenToChucMain_View').html(data.TenToChuc + " (" + data.MaToChuc + ")");
        $('#lblDiaChiMain_View').html(data.DiaChiCuThe);
        $('#lblTenToChuc_View').html(data.TenToChuc);
        $('#lblSoDKKD_View').html(data.MaSoThue);
        $('#lblTenNguoiSDLD_View').html(data.TenNguoiSuDungLD);
        $('#lblTinhTrangHD_View').html(data.TenTinhTrangHD);
        $('#lblDiaChi_View').html(data.DiaChiCuThe);
        $('#lblTinh_View').html(data.TenTinh);
        $('#lblHuyen_View').html(data.TenHuyen);
        $('#lblXa_View').html(data.TenXa);

        if (data.SoDienThoai == "") {
            $('#lblSoDienThoai_View').html('---');
        } else {
            $('#lblSoDienThoai_View').html(formatPhoneNumber(data.SoDienThoai));
        }

        if (data.Email == "") {
            $('#lblEmail_View').html('---');
        } else {
            $('#lblEmail_View').html(data.Email);
        }

        if (data.TenNganhNgheKD == ";" || data.TenNganhNgheKD == "") {
            $('#lblNganhNghe_View').html('---');
        } else {
            $('#lblNganhNghe_View').html(data.TenNganhNgheKD);
        }

        if (data.NgayHoatDong == "") {
            $('#lblNgayHoatDong_View').html('---');
        } else {
            $('#lblNgayHoatDong_View').html(data.NgayHoatDong);
        }

        if (data.TenLoaiHinh == "") {
            $('#lblLoaiHinhDN_View').html('---');
        } else {
            $('#lblLoaiHinhDN_View').html(data.TenLoaiHinh);
        }

        if (data.SoCCCD == "") {
            $('#lblCCCD_View').html('---');
        } else {
            $('#lblCCCD_View').html(data.SoCCCD);
        }

        if (data.TenThon == "") {
            $('#lblThon_View').html('---');
        } else {
            $('#lblThon_View').html(data.TenThon);
        }

        if (data.TenKCN == "") {
            $('#lblTenKCN_View').html('---');
        } else {
            $('#lblTenKCN_View').html(data.TenKCN);
        }

        if (data.GhiChu == "") {
            $('#lblGhiChu_View').html(`<p style="display: inline;font-weight: normal;">Ghi chú: </p> ` + '---');
        } else {
            $('#lblGhiChu_View').html('<p style="display: inline;font-weight: normal;">Ghi chú: </p>' + data.GhiChu);
        }

        if (data.NamTrongKCN == 1) {
            $('#lblNamTrongKCN_View').prop('checked', true);
        } else {
            $('#lblNamTrongKCN_View').prop('checked', true);
        }
    }
}

function ResetTT_TabView() {
    $('#lblTenToChucMain_View').html('Chưa có thông tin tổ chức');
    $('#lblDiaChiMain_View').html('---');
    $('#lblTenToChuc_View').html('---');
    $('#lblSoDKKD_View').html('---');
    $('#lblTenNguoiSDLD_View').html('---');
    $('#lblTinhTrangHD_View').html('---');
    $('#lblDiaChi_View').html('---');
    $('#lblSoDienThoai_View').html('---');
    $('#lblEmail_View').html('---');
    $('#lblTinh_View').html('---');
    $('#lblHuyen_View').html('---');
    $('#lblXa_View').html('---');
    $('#lblNganhNghe_View').html('---');
    $('#lblNgayHoatDong_View').html('---');
    $('#lblLoaiHinhDN_View').html('---');
    $('#lblCCCD_View').html('---');
    $('#lblTenKCN_View').html('---');
    $('#lblThon_View').html('---');
    $('#lblGhiChu_View').html(`<p style="display: inline;font-weight: normal;">Ghi chú: </p> ` + '---');
    $('#lblNamTrongKCN_View').prop('checked', false);
}

$(document).on('click', '#btn-layout-2', function () {
    ResetTT_TabView();
    $('#btnSua2').removeAttr("data");
    $('#btnXem2').removeAttr("data");
    $('#btnXoa2').removeAttr("data");
    var selectedRows = GridToChuc_List.getSelectedRows(); // Lấy các dòng đang được chọn
    if (selectedRows.length > 0) {
        selectedRows.forEach(function (row) {
            row.deselect(); // Bỏ chọn từng dòng
        });
    }
});


$(document).on('click', '#btnXem2', function () {
    if (GridToChuc_List.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
        return false;
    }
    var ID = $(this).attr('data');
    showModalXemThongTinToChuc_us(ID);
});

$(document).on('click', '#btnSua2', function () {
    if (GridToChuc_List.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
        return false;
    }
    var ID = $(this).attr('data');
    SuaDuLieuToChuc_us(ID);
    tempSuaTTTabView = true;
});

function XoaDuLieu_TabView(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'ToChucID', ID: ID, TenBangHienTai: 'ToChuc', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/ToChuc/XoaDuLieu', { id: ID });
                if (!result.Err) {
                    LoadDataTable();
                    ResetTT_TabView();
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


$(document).on('click', '#btnXoa2', function () {
    if (!QuyenXoa()) {
        return false;
    }
    if (GridToChuc_List.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!');
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieu_TabView(ID);
});

//-----------------------------------------Lưới xem quá trình thu thập modal xem thông tin tồ chức------------------------------------------
function formaterTTCauLaoDong(value, ID) {
    return ` <div class="form-group">
                <label class="form-check">
                    <input class="form-check-input checkTTCauLaoDong" type="checkbox" data='${ID}' id="customCheckbox1${ID}" ` + (value ? 'checked' : '') + `>
                    <label class="form-check-label" for="customCheckbox1${ID}"></label>
                </label>
                
            </div>`;
}

var fmDangSDTTCauLaoDong = function (cell) {
    return formaterTTCauLaoDong(cell.getValue(), cell.getData().ToChucID);
}

// Formater phần xem nội dung thu thập
var fmNoiDungTT = function (cell) {
    var ID = cell.getData().CauLaoDongID;
    var NoiDung = cell.getValue();
    if (NoiDung != "") {
        if (NoiDung.length > 40) {
            NoiDung = NoiDung.substring(0, 30) + "...";
            return `
                        <div class="col-md-12" style="padding-right: 0px; padding-left: 0px; padding-bottom:4px;">
                            <div class="Content-text">${NoiDung}<span class='btnXemThemNoiDung' style='color:var(--tblr-primary);'  title="Xem chi tiết nội dung thu thập" data='${ID}' data-loai='TC'>Xem thêm</span></div>
                        </div>`;
        } else {
            return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${NoiDung}</p>
                    </div>`;
        }
    } else {
        return `
                    <div class="col-md-12">
                        <p class="Content-text" style="margin-bottom: 0;">${NoiDung}</p>
                    </div>`;
    }
}

var Grid_QuaTrinhThuThap_Xem = new Tabulator("#Grid_QuaTrinhThuThap_Xem", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: '80vh',
    columns: [
        { title: "Ngày thu thập", field: "NgayThuThap", formatter: 'textarea', hozAlign: "center", width: 120, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Tên tổ chức", field: "TenToChuc", formatter: 'textarea', minWidth: 250, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Mã số thuế", field: "MaSoThue", formatter: 'textarea', vertAlign: "middle", width: 120, headerHozAlign: "center", hozAlign: "left" },
        { title: "Tên người sử dụng lao động", field: "TenNguoiSuDungLD", formatter: 'textarea', width: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "CCCD/CMND/Số định danh", field: "SoCCCD", formatter: 'textarea', vertAlign: "middle", width: 120, headerHozAlign: "center", hozAlign: "left" },
        { title: "Địa chỉ", field: "DiaChiCuThe", formatter: 'textarea', minWidth: 250, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Loại thu thập", field: "LoaiBienDong", formatter: 'textarea', minWidth: 150, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Nội dung thu thập", field: "NoiDungThuThap", formatter: fmNoiDungTT, minWidth: 250, vertAlign: "middle", width: 184, headerHozAlign: "center" },
        { title: "ToChucID", field: "ToChucID", width: 0, visible: false }
        ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});


// Load lưới
async function LoadDataTable_QuaTrinhThuThap_Xem(ID) {
    Grid_QuaTrinhThuThap_Xem.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/ToChuc/LoadDuLieuThuThapCauLaoDong", { id: ID });
    if (!GetAll.Err) {
        Grid_QuaTrinhThuThap_Xem.setData(GetAll.Result);
        Grid_QuaTrinhThuThap_Xem.redraw(1);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

$(document).on('keyup', '#timKiem_tllg_us_View', function (e) {
    if (e.keyCode == '13') {
        Grid_QuaTrinhThuThap_Xem.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid_QuaTrinhThuThap_Xem.setFilter(matchAny, { value: $('#timKiem_tllg_us_View').val() });
});

// Xem chi tiết nội dung ghi chú hộ gia đình
$(document).on('click', '.btnXemThemNoiDung', function () {
    XemChiTietNoiDung($(this).attr('data'));
});

function XemChiTietNoiDung(ID) {
    $("#mdXemThemNoiDungTT").modal('show');
    $('#tieuDeModalCT').text('Chi tiết nội dung nội dung thu thập');
    const result = NTS.getAjax("/QuanLy/ThuThapCauLaoDongBienDong/NoiDungThuThapCT", { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        $('#NoiDungThuThap_CT').html(data.NoiDungThuThap);
    } else {
        $('#NoiDungThuThap_CT').html("Chưa có dữ liệu");
    }
    return;
}


//------------------------Grid quá trình thu thập cầu lao động------------------------------//
function formater_XemDinhKem() {
    var btnXemDinhKem = `<div class="text-success"> <i class="fa-solid fa-eye"></i> Xem đính kèm</div>`;
    return btnXemDinhKem;
}

function actionDropdownFormatter_QuaTrinhTT(cell, formatterParams, onRendered) {
    var ID = cell.getData().CauLaoDongID;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
       <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
       <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" >
            <a  class="dropdown-item btnXoaTT" href="#" data="${ID}">
                <i class='fa fa-trash-o  text-danger'></i>&ensp;  Xóa phiếu thu thập
           </a>
           <a  class="dropdown-item btnInPhieuThuThap" href="#" data="${ID}" style="display: block;">
                    <i class='fa-solid fa-print' style="color: var(--tbl-btn-luuvadong) !important;"></i>&ensp;  In phiếu thu thập <i class="fa-solid fa-angle-right " style="float: right;margin-top: 5px;"></i>
               </a>
               
               <div id="hoverBox_CLD">
                    <a  class="dropdown-item btnInMau02 " href="#" data="${ID}">
                        In mẫu 02 thông tư 01/2022/TT-BLĐTBXH
                   </a>
                </div>
       </div>
       </div>`;

    return select;
}

var Grid_QuaTrinhThuThap_TabView = new Tabulator("#Grid_QuaTrinhThuThap_TabView", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: '400',
    columns: [
        {
            title: '<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
            field: "actions",
            formatter: actionDropdownFormatter_QuaTrinhTT, width: 60, headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", headerSort: false
        },
        { title: "Ngày thu thập", field: "NgayThuThap", formatter: 'textarea', hozAlign: "center", width: 120, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Tên tổ chức", field: "TenToChuc", formatter: 'textarea', minWidth: 250, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Mã số thuế", field: "MaSoThue", formatter: 'textarea', vertAlign: "middle", width: 120, headerHozAlign: "center", hozAlign: "left" },
        { title: "Tên người sử dụng lao động", field: "TenNguoiSuDungLD", formatter: 'textarea', width: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "CCCD/CMND/Số định danh", field: "SoCCCD", formatter: 'textarea', vertAlign: "middle", width: 120, headerHozAlign: "center", hozAlign: "left" },
        { title: "Địa chỉ", field: "DiaChiCuThe", formatter: 'textarea', minWidth: 250, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Loại thu thập", field: "LoaiBienDong", formatter: 'textarea', minWidth: 150, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Nội dung thu thập", field: "NoiDungThuThap", formatter: fmNoiDungTT, minWidth: 250, vertAlign: "middle", width: 184, headerHozAlign: "center" },
        { title: "ToChucID", field: "ToChucID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});


function LoadDataTableCungLD_TabQuaTrinh(ID) {
    Grid_QuaTrinhThuThap_TabView.clearData();
    const GetAll = NTS.getAjax("/DanhMuc/ToChuc/LoadDuLieuThuThapCauLaoDong", { id: ID });
    if (!GetAll.Err) {
        Grid_QuaTrinhThuThap_TabView.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}

$(document).on('keyup', '#timkiem_QuaTrinhThuTap_TabView', function (e) {
    if (e.keyCode == '13') {
        Grid_QuaTrinhThuThap_TabView.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid_QuaTrinhThuThap_TabView.setFilter(matchAny, { value: $('#timkiem_QuaTrinhThuTap_TabView').val() });
});

////-------------------Xuất dữ liệu cầu lao động------------------//

$(document).on('click', '.btnInMau02', function () {
    var ID = $(this).attr('data');
    XuatMau02_TT01(ID);
});

async function XuatMau02_TT01(ID) {
    var data = await NTS.getAjaxAsync('/DanhMuc/ToChuc/XuatMau02', { id: ID });
    //window.open(data);
    try {
        $('#divNoiDung_us').attr("src", data.replace(".docx", ".pdf"));
        $('#modal_xemtruockhiin_us').modal('show');
        $('#modal_taifile_us').show();
        $('#modal_taifile2_us').hide();
    } catch (ex) {

    }
}

//------------------------------Xóa cầu lao động-----------------------------

function XoaDuLieu_CauLaoDong(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'CauLaoDongID', ID: ID, TenBangHienTai: 'CauLaoDong', CacBangKhongXet: ['CauLaoDongTTLD', 'CauLaoDongTD'] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/ToChuc/XoaDuLieu_CauLaoDong', { id: ID });
                if (!result.Err) {
                    LoadDataTableCungLD_TabQuaTrinh($('#ToChucID').value());
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

$(document).on('click', '.btnXoaTT', function () {
    var ID = $(this).attr('data');
    XoaDuLieu_CauLaoDong(ID);
});