var laChuHo = false;
var tenBangThamChieu = 'DoiTuong';
var mangGiaTriDau = [];
var mangGiaTriSau = [];
var bienDong = false;
var tempthem = "them";
var tempthemDT = "them";
var soCCCDDT = "";
$(function () {
    checkMacDinhSD('.checkMacDinhSD', 'TrangThai', 'TrangThai');
    LoadTimKiem_us();
});

$(document).ready(function () {
    ThietLapCotTrenLuoi(tenBangThamChieu, Grid1);
    setTimeout( function () {
            NTS.loadDataCombo({
            name: '#HoGiaDinhID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetHoGiaDinh_Combo',
            ajaxParam: { data: [$('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), "",] },
            indexValue: 0,
            indexText: 1,
            indexText1: 2,
            columns: 2,
            textShowTatCa: '--Tất cả--',
            showTatCa: !0
        });
    }, 100);
});

$(document).on('click', '#TimKiemNangCao_HoGiaDinh_us', function () {
    if ($('#KhungTimKiem_HoGiaDinh_us').css('display') == "block") {
        $('#KhungTimKiem_HoGiaDinh_us').slideUp(200);
    } else {
        $('#KhungTimKiem_HoGiaDinh_us').slideDown(200);
    }
    return false;
});

//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiemHoGiaDinh_us', async function () {
    await LoadGrid_ChonHoGD_us();
    $('#KhungTimKiem_HoGiaDinh_us').slideUp(200);
    return false;

});

$(document).on('click', '#DongTimKiem_US', function () {
    $('#KhungTimKiem_HoGiaDinh_us   ').slideUp(200);
    return false;
});

function loadComBoLoaiBienDong() {
    NTS.loadDataCombo({
        name: '#LoaiBienDongID',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_LoaiBienDong',
        columns: 1,
        indexValue: 0,
        indexText1: 1,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
}

function LoadTimKiem_us() {
    setTimeout(function () {
        NTS.loadDataCombo({
            name: '#TinhID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCTinh_Combo',
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '--Tất cả--',
            showTatCa: !0,
            indexDefault: 3,
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
            indexDefault: 3,
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
            indexDefault: 3,
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
            indexDefault: 3,
        });
        NTS.loadDataCombo({
            name: '#TinhID_TT,#TinhID_HN',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCTinh_Combo',
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '-Chọn-',
            showTatCa: !0
        });
        PhanQuyenComBoDiaBan('TinhID_TimKiem_us', 'HuyenID_TimKiem_us', 'XaID_TimKiem_us', 'ThonID_TimKiem_us');
    }, 50);

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


////--------------Trong form---------------//

//NTS.loadDataCombo({
//    name: '#HuyenID_TT,#HuyenID_HN',
//    ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
//    ajaxParam: { id: '' },
//    columns: 2,
//    indexValue: 0,
//    indexText1: 2,
//    textShowTatCa: '-Chọn-',
//    showTatCa: !0
//});
//NTS.loadDataCombo({
//    name: '#XaID_TT,#XaID_HN',
//    ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
//    ajaxParam: { id: '' },
//    columns: 2,
//    indexValue: 0,
//    indexText1: 2,
//    textShowTatCa: '-Chọn-',
//    showTatCa: !0
//});
//NTS.loadDataCombo({
//    name: '#ThonID_TT,#ThonID_HN',
//    ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
//    ajaxParam: { id: '' },
//    columns: 2,
//    indexValue: 0,
//    indexText1: 2,
//    textShowTatCa: '-Chọn-',
//    showTatCa: !0
//});
//NTS.loadDataCombo({
//    name: '#NoiCap_TinhID',
//    ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCAllTinh_Combo',
//    columns: 2,
//    indexValue: 0,
//    indexText1: 2,
//    textShowTatCa: '-Chọn-',
//    showTatCa: !0
//});


//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#btnTimKiem', function () {
    if ($('#TinhID_TimKiem_us').value() == "") {
        NTS.canhbao("Tỉnh không được bỏ trống!");
        return false;
    }
    if ($('#HuyenID_TimKiem_us').value() == "") {
        NTS.canhbao("Huyện không được bỏ trống!");
        return false;
    }
    if ($('#XaID_TimKiem_us').value() == "") {
        NTS.canhbao("Xã không được bỏ trống!");
        return false;
    }
     LoadDataTable();
     //LoadDataTable_ListTab2();
    $('#KhungTimKiem').slideUp(200);
    return false;

});

$(document).on('click', '#DongTimKiem', function () {
    $('#KhungTimKiem').slideUp(200);
    return false;
});

$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
         //LoadDataTable_ListTab2();
         LoadDataTable();
        $('#KhungTimKiem').slideUp(200);
        return false;
    }
});

$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        Grid1.setFilter(matchAny, { value: $(this).val() });
        GridDoiTuong_List.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.input-icon-addon', function () {
    Grid1.setFilter(matchAny, { value: $('#timKiem').val() });
    GridDoiTuong_List.setFilter(matchAny, { value: $('#timKiem').val() });
});

var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().ThanhVienHoGDID);
}

var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().ThanhVienHoGDID);
}

var fmMacDinhSD = function (cell) {
    return formaterMacDinhSD(cell.getValue(), cell.getData().ThanhVienHoGDID);
}

var fmGhiChu = function (cell) {
    var ID = cell.getData().ThanhVienHoGDID;
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
    var ID = cell.getData().ThanhVienHoGDID;
    var TrangThai = cell.getData().TrangThai;
    var ChuHo = cell.getData().ChuHo;
    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator">
       <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
       <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" style="">
           <a class="dropdown-item btnXemTT " href="#" data="${ID}">
                <i class="fa fa-eye text-success" aria-hidden="true"></i>&ensp;  Xem thông tin đối tượng
           </a>
           <a style="display: ${TrangThai == "Đã tổng hợp" ? "none" : "block"}" class="dropdown-item btnSuaTT  " href="#" data="${ID}">
                <i class="fa fa-pencil text-warning" aria-hidden="true"></i>&ensp;  Chỉnh sửa đối tượng
           </a>
            ` + (ChuHo == 1 ? `` : `<a style="display: ${TrangThai == "Đã tổng hợp" ? "none" : "block"}" class="dropdown-item btnXoaTT " href="#" data="${ID}">
                <i class='fa fa-trash-o  text-danger'></i>&ensp;  Xóa đối tượng
           </a>    `) + `
            
       </div>
       </div>`;

    return select;
}

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
        { title: "Họ và tên", field: "HoVaTen", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", width: 150 },
        { title: "Hộ gia đình", field: "HoVaTenChuHo", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", width: 150 },
        { title: "Quan hệ với chủ hộ", field: "TenQuanHe", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", width: 100 },
        { title: "CMND/CCCD/Số định danh", field: "SoCCCD", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 210 },
        { title: "Ngày sinh", field: "NgayThangNamSinh", formatter: 'textarea', headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", minWidth: 100 },
        { title: "Nơi sinh", field: "TenNoiSinh", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 180 },
        { title: "Giới tính", field: "TenGioiTinh", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 110 },
        { title: "Số điện thoại", field: "SoDienThoai", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 120 },
        { title: "Email", field: "Email", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 250 },
        { title: "Ngày cấp", field: "NgayCap", hozAlign: "center", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 90 },
        { title: "Nơi cấp", field: "TenNoiCap", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 250 },
        { title: "Dân tộc", field: "TenDanToc", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 120 },
        { title: "Tôn giáo", field: "TenTonGiao", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 120 },
        { title: "Quốc tịch", field: "TenQuocTich", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 120 },
        { title: "Nơi thường trú", field: "DiaChiCuTheTT", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 300 },
        { title: "Ghi chú", field: "GhiChu", formatter: fmGhiChu, hozAlign: "left", width: 250, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Trạng thái sử dụng", field: "TrangThai", hozAlign: "center", width: 130, formatter: fmDangSD, headerSort: false, vertAlign: "middle", headerHozAlign: "center" },
        { title: "ThanhVienHoGDID", field: "ThanhVienHoGDID", width: 0, visible: false }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
Grid1.on("rowDblClick", function (e, row) {
    $('#ThanhVienHoGDID_us').val(row.getData().ThanhVienHoGDID);
    SuaDuLieuThanhVienHoGD_us(row.getData().ThanhVienHoGDID, $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
    if ($('#select2-MoiQuanHeIDDT_us-container').text() === "Chủ hộ") {
        $('#MoiQuanHeIDDT_us').prop('disabled', true);
        $('#SelectChuHo_US').prop('disabled', true);
        $('#HienThiTatCaHoGiaDinh').prop('disabled', true);
    }
});
//---------------------------------Xóa đối tượng---------------------------------
$(document).on('click', '.btnXoaTT', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieuThanhVienHoGD_us(ID);
});


////-------------------Xóa dữ liệu dối tượng cá nhân------------------//
function XoaDuLieuThanhVienHoGD_us(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'ThanhVienHoGDID', ID: ID, TenBangHienTai: 'ThanhVienHoGD', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/HoGiaDinh/XoaDuLieu_ThanhVienHoGD', { id: ID });
                if (!result.Err) {
                    LoadDataTable();
                    //LoadDataTable_ListTab2();
                    reloadThongTinTabTT();
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

$(document).on('click', '#btnXoaCaNhan', function () {
    if (GridDoiTuong_List.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 đối tượng!');
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieuThanhVienHoGD_us(ID);
    LoadThongTinDoiTuongTabTT(ID);
});
//----------------------------Xuất thông tin đối tượng ra mẫu 01----------------------------
//$(document).on('click', '.btnXuat01 ', function () {
//    var ID = $(this).attr('data');
//    var data = NTS.getAjax("/DanhMuc/DoiTuongCaNhan/XuatMau01", { data: ID });
//    if (!data.Err) {
//        window.open(data);
//    } else {
//        NTS.loi(data.Msg);
//    }
//});

//---------------------------------Xem thông tin đối tượng---------------------------------
$(document).on('click', '.btnXemTT ', function () {
    var ID = $(this).attr('data');
    XemThongTinDoiTuong_us(ID);
});

$(document).on('click', '#btnXemThongTinCaNhan ', function () {
    if (GridDoiTuong_List.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 đối tượng!');
        return false;
    }
    var ID = $(this).attr('data');
    XemThongTinDoiTuong_us(ID);
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

        if (data.LoaiHoGD === '' || data.LoaiHoGD === null) {
            $('#lblLoaiGiayTo_usDoiTuong').html("---");
        } else {
            if (data.LoaiHoGD == 1) {
                $('#lblLoaiGiayTo_usDoiTuong').html("Sổ hộ khẩu");
            } else {
                $('#lblLoaiGiayTo_usDoiTuong').html("Sổ tạm trú");
            }
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

        if (data.TenLoaiHo === '' || data.TenLoaiHo === null) {
            $('#lblPhanLoaiHo_View').html("---");
        } else {
            $('#lblPhanLoaiHo_View').html(data.TenLoaiHo);
        }
        if (data.Thon === '' || data.Thon === null) {
            $('#lblThon_View').html("---");
        } else {
            $('#lblThon_View').html(data.Thon);
        }

        if (data.HoVaTenChuHo === '' || data.HoVaTenChuHo === null) {
            $('#lblHoVaTenChuHo_usDT').html('---');
        } else {
            $('#lblHoVaTenChuHo_usDT').html(data.HoVaTenChuHo);
        }
        if (data.SoGiayTo === '' || data.SoGiayTo === null) {
            $('#lblSoGiayTo_usDoiTuong').html('---');
        } else {
            $('#lblSoGiayTo_usDoiTuong').html(data.SoGiayTo);
        }
        if (data.NoiThuongTruHGD === '' || data.NoiThuongTruHGD === null) {
            $('#lblNoiThuongTruHoGiaDinh_usDoiTuong').html('---');
        } else {
            $('#lblNoiThuongTruHoGiaDinh_usDoiTuong').html(data.NoiThuongTruHGD);
        }

        if (data.Tinh === '' || data.Tinh === null) {
            $('#lblTinhHoGiaDinh_usDoiTuong').html('---');
        } else {
            $('#lblTinhHoGiaDinh_usDoiTuong').html(data.Tinh);
        }
        if (data.Huyen === '' || data.Huyen === null) {
            $('#lblHuyenHoGiaDinh_usDoiTuong').html('---');
        } else {
            $('#lblHuyenHoGiaDinh_usDoiTuong').html(data.Huyen);
        }
        if (data.Xa === '' || data.Xa === null) {
            $('#lblXaHoGiaDinh_usDoiTuong').html('---');
        } else {
            $('#lblXaHoGiaDinh_usDoiTuong').html(data.Xa);
        }
        if (data.TenQuanHe === '' || data.TenQuanHe === null) {
            $('#lblQuanHeChuHo_usDT').html('---');
        } else {
            $('#lblQuanHeChuHo_usDT').html(data.TenQuanHe);
        }
        if (data.HoGiaDinhID == "00000000-0000-0000-0000-000000000000") {
            $('#HoGiaDinhID').value("");
        } else {
            $('#HoGiaDinhID').value(data.HoGiaDinhID);
        }

        $('#lblHoVaTenDoiTuong_usDT').html(data.HoVaTen);
        $('#lblGioiTinh_usDT').html(data.TenGioiTinh);
        $('#lblNgaySinh_usDT').html(data.NgayThangNamSinh);
        $('#lblCMND_usDoiTuong').html(data.SoCCCD);
        $('#lblNgayCap_usDoiTuong').html(data.NgayCap);
        $('#lblNoiCap_usDoiTuong').html(data.TenNoiCap);
        $('#lblDanToc_USHoGiaDinhDT').html(data.TenDanToc);
        $('#lblTonGiao_usDoiTuong').html(data.TenTonGiao);
        $('#lblQuocTich_usDoiTuong').html(data.TenQuocTich);
        $('#lblNoiThuongTru_usDoiTuong').html(data.DiaChiCuTheTT);
        LoadQuaTrinhThuThap_Xem(ID);
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
}

async function LoadDataTable() {
    var saveData = new Array();
    saveData[0] = $('#TinhID_TimKiem_us').value();
    saveData[1] = $('#HuyenID_TimKiem_us').value();
    saveData[2] = $('#XaID_TimKiem_us').value();
    saveData[3] = $('#ThonID_TimKiem_us').value();
    saveData[4] = $('#timKiem').value();
    saveData[5] = $('#HoGiaDinhID_TimKiem_us').value();
    Grid1.clearData();
    GridDoiTuong_List.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/DoiTuongCaNhan/GetAll", { data: saveData });
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
        GridDoiTuong_List.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
    GridKhongCoDuLieu("Grid1");
}


checkDangSD('.checkDangSD', 'ThanhVienHoGD', 'ThanhVienHoGDID');


$('#TrangThai').on('change', function () {
    UpdateLabelDangSD(this);
});

// Xem chi tiết nội dung ghi chú hộ gia đình
$(document).on('click', '.btnXemThemGhiChu', function () {
    $('#ThanhVienHoGDID').val($(this).attr('data'));
    XemChiTietGhiChu($(this).attr('data'));
});

function XemChiTietGhiChu(ID) {
    $("#mdXemThem").modal('show');
    $('#tieuDeModalCT').text('Chi tiết nội dung ghi chú');
    const result = NTS.getAjax("/DanhMuc/DoiTuongCaNhan/GhiChuCT", { id: ID });
    if (!result.Err && result.Result != null || !result.Err && result.Result != '') {
        let data = result.Result[0];
        $('#NoiDungGhiChu_CT').html(data.GhiChu);
    } else {
        $('#NoiDungGhiChu_CT').html("Chưa có dữ liệu");
    }
    return;
}

//TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiemNangCao', function () {
    if ($('#KhungTimKiem').css('display') == "block") {
        $('#KhungTimKiem').slideUp(200);

    } else {
        $('#KhungTimKiem').slideDown(200);
        /*LoadTimKiem();*/
    }
    return false;
});

$(document).on('click', '#btnThemMoi', function () {
    $('#MoiQuanHeIDDT_us').prop('disabled', false);
    $('#SelectChuHo_US').prop('disabled', false);
    actionShowModal = true;
    $('#HienThiTatCaHoGiaDinh').prop('disabled', false);
    $('#tieuDeModal_ThemThanhVien_us').text('Thêm mới đối tượng');
    showModalThemDoiTuong('', $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '', "them", "12")
});
//------------------Change dữ liệu khi thêm đối tượng------------------------//
$(document).on('keyup', '#SoDinhDanhCaNhan', function () {
    if ($('#mdThemMoi').hasClass('show')) {
        $('#lblSoDinhDanh_ThanhVien').text($(this).value())
    }
})

$(document).on('keyup', '#HoVaTenDT', function () {
    if ($('#mdThemMoi').hasClass('show')) {
        if (laChuHo) {
            $('#lblHoVaTen_ThanhVien').text($(this).value().toUpperCase() + " (" + MaHoGiaDinh + ")")
        }
        $('#lblHoVaTen_ThanhVien').text($(this).value().toUpperCase())
    }
})
$(document).on('keyup', '#SoDienThoaiDT', function () {
    if ($('#mdThemMoi').hasClass('show')) {
        if (laChuHo) {
            $('#lblSDT_TV').text($(this).value())
        }
        $('#lblSDT_ThanhVien').text($(this).value())
    }
})
$(document).on('keyup', '#SoCMND_DoiTuong', function () {
    if ($('#mdThemMoi').hasClass('show')) {
        $('#lblCCCD_ThanhVien').text($(this).value())
    }
})
$(document).on('keyup', '#EmailDT', function () {
    if ($('#mdThemMoi').hasClass('show')) {
        $('#lblEmail_ThanhVien').text($(this).value())
    }
})
$(document).on('change', '#NgayCapDT', function () {
    if ($('#mdThemMoi').hasClass('show')) {
        $('#lblNgayCap_ThanhVien').text($(this).value())
    }
})
$(document).on('change', '#NgaySinhDT', function () {
    if ($('#mdThemMoi').hasClass('show')) {
        $('#lblNgaySinh_ThanhVien').text($(this).value())
    }
})
$(document).on('change', '#NoiCapDT', function () {
    if ($('#mdThemMoi').hasClass('show')) {
        var data = $('#NoiCapDT').select2('data')[0].text.replace('-Chọn-', '') == "" || $('#NoiCapDT').select2('data')[0].text == undefined ? "" : $('#NoiCapDT').select2('data')[0].text;
        $('#lblNoiCap_ThanhVien').text(data)
    }
})
$(document).on('change', '#MoiQuanHeIDDT', function () {
    if ($('#mdThemMoi').hasClass('show')) {
        var data = $(this).select2('data')[0].text.replace('-Chọn-', '') == "" || $(this).select2('data')[0].text == undefined ? "" : $(this).select2('data')[0].text;
        $('#lblQuanHeVoiChuHo').text(data)
    }
})
$(document).on('change', '#GioiTinhDT', function () {
    if ($('#mdThemMoi').hasClass('show')) {
        var data = $(this).select2('data')[0].text.replace('-Chọn-', '') == "" || $(this).select2('data')[0].text == undefined ? "" : $(this).select2('data')[0].text;

        $('#lblGioiTinh_ThanhVien').text(data);
    }
})
//-------------------Thay đổi lưới--------------------------//
$(document).on('click', '#btn-layout-1', async function () {
    $('#grid-layout').fadeIn(200);
    $('#list-layout').hide();
    $('#list-layout').removeClass('show');
    $('#grid-layout').addClass('show');

    //await LoadDataTable();
});
$(document).on('click', '#btn-layout-2', function () {
    $('#grid-layout').hide();
    $('#list-layout').fadeIn(200);
    $('#list-layout').addClass('show');
    $('#grid-layout').removeClass('show');
    $('#btnSua2').removeAttr("data");
    $('#btnXemThongTinCaNhan').removeAttr("data");
    $('#btnXoaCaNhan').css({ display: "block" });
    reloadThongTinTabTT();
    var selectedRows = GridDoiTuong_List.getSelectedRows(); // Lấy các dòng đang được chọn
    if (selectedRows.length > 0) {
        selectedRows.forEach(function (row) {
            row.deselect(); // Bỏ chọn từng dòng
        });
    }
});

function reloadThongTinTabTT() {
    $('#lblHoVaTen_View').html("---");
    $('#lblGioiTinh_View').html("---");
    $('#lblNgaySinh_View').html("---");
    $('#lblCMND_View').html("---");
    $('#lblNgayCap_View').html("---");
    $('#lblNoiCap_View').html("---");
    $('#lblDanToc_View').html("---");
    $('#lblTonGiao_View').html("---");
    $('#lblQuocTich_View').html("---");
    $('#lblSoDienThoai_View').html("---");
    $('#lblEmail_View').html("---");
    $('#lblHoKhauThuongTru_View').html("---");
    $('#lblChoOHienNay_View').html("---");
    $('#lblGhiChu_View').html("---");
    $('#lblHoTenChuHo_View').html("---");
    $('#lblQuanHeChuHo_View').html("---");
    $('#lblLoaiGiayTo_View').html("---");
    $('#lblSoiGiayTo_View').html("---");
    $('#lblDiaChiThuongTru_View').html("---");
    $('#lblThon_View').html("---");
    $('#lblXa_View').html("---");
    $('#lblHuyen_View').html("---");
    $('#lblTinh_View').html("---");
    $('#lblPhanLoaiHo_View').html("---");
    $('#lblHoTenChuHoMain_View').html("");
    $('#lblDiaChi_View').html("Chưa có thông tin");
}

$(document).on('click', '.btnXemThongTin', function () {
    var ID = $(this).attr('data');
    ShowModal_XemThongTinCungLaoDong_us(ID);
});
//-------------------------Gird dạng lưới Đối tượng-----------------------//

var GridDoiTuong_List = new Tabulator("#GridDoiTuong_List", {
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
        { title: "Thông tin hộ gia đình", field: "ThongTinNguoiThamGia", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 300, headerSort: false },
        { title: "ThanhVienHoGDID", field: "ThanhVienHoGDID", width: 0, visible: false }
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
        rowTabletr.setAttribute("data-value", data.ThanhVienHoGDID);
        cellContents = "<td><div style='border: 1px solid var(--tblr-color-header);border-radius: 50%;height: 50px;display: flex;align-items: center;justify-content: center;font-weight: bold;color: var(--tblr-color-header);width: 50px;'><img id='avatar_DoiTuong' class=' editable editable-click editable-empty img-fluid' alt='Hình đại diện' src='/Images/user.png'></div></td>";
        cellContents += "<td><div style='text-align: left;width: 240px;white-space: break-spaces;'><strong>" + data.HoVaTen + "</strong> </div><div style='text-align: left !important;font-size: 12px!important;width: 240px;white-space: break-spaces;'>" + data.DiaChiCuTheTT + "</div></td>"
        rowTabletr.innerHTML = cellContents;
        rowTable.appendChild(rowTabletr);
        element.append(rowTable);
    },
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

GridDoiTuong_List.on("rowClick", function (e, row) {
    var ID = row.getData().ThanhVienHoGDID;
    LoadThongTinDoiTuongTabTT(ID);
    $('#btnSua2').attr("data", ID);
    $('#btnXemThongTinCaNhan').attr("data", ID);
    $('#btnXoaCaNhan').attr("data", ID);
    $('#ThanhVienHoGDID').value(row.getData().ThanhVienHoGDID);
    LoadDataTableCungLD_TabQuaTrinh(ID);
});

async function LoadThongTinDoiTuongTabTT(ID) {
    $('#btnXoaCaNhan').css({ display: "block" });
    const result = await NTS.getAjaxAsync('/DanhMuc/HoGiaDinh/LoadDuLieuSua_ThanhVienHoGD', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];

        if (data.ChuHo == "1") {
            $('#btnXoaCaNhan').css({ display: "none" });
        }

        if (data.DiaChiCuTheHT === '' || data.DiaChiCuTheHT === null) {
            $('#lblChoOHienNay_View').html("---");
        } else {
            $('#lblChoOHienNay_View').html(data.DiaChiCuTheHT);
        }
        if (data.Email === '' || data.Email === null) {
            $('#lblEmail_View').html("---");
        } else {
            $('#lblEmail_View').html(data.Email);
        }
        if (data.SoDienThoai === '' || data.SoDienThoai === null) {
            $('#lblSoDienThoai_View').html("---");
        } else {
            $('#lblSoDienThoai_View').html(data.SoDienThoai);
        }
        if (data.LoaiHoGD === '' || data.LoaiHoGD === null) {
            $('#lblLoaiGiayTo_View').html("---");
        } else {
            if (data.LoaiHoGD == 1) {
                $('#lblLoaiGiayTo_View').html("Sổ hộ khẩu");
            } else {
                $('#lblLoaiGiayTo_View').html("Sổ tạm trú");
            }
        }
        if (data.TenLoaiHo === '' || data.TenLoaiHo === null) {
            $('#lblPhanLoaiHo_View').html("---");
        } else {
            $('#lblPhanLoaiHo_View').html(data.TenLoaiHo);
        }
        if (data.Thon === '' || data.Thon === null) {
            $('#lblThon_View').html("---");
        } else {
            $('#lblThon_View').html(data.Thon);
        }
        if (data.GhiChu === '' || data.GhiChu === null) {
            $('#lblGhiChu_View').html(`<p style="display: inline;font-weight: normal;">Ghi chú:</p> ` + '---');
        } else {
            $('#lblGhiChu_View').html(`<p style="display: inline;font-weight: normal;">Ghi chú:</p> ` + data.GhiChu);
        }
        if (data.HoVaTenChuHo === '' || data.HoVaTenChuHo === null) {
            $('#lblHoTenChuHo_View').html('---');
        } else {
            $('#lblHoTenChuHo_View').html(data.HoVaTenChuHo);
        }
        if (data.TenQuanHe === '' || data.TenQuanHe === null) {
            $('#lblQuanHeChuHo_View').html('---');
        } else {
            $('#lblQuanHeChuHo_View').html(data.TenQuanHe);
        }
        if (data.SoGiayTo === '' || data.SoGiayTo === null) {
            $('#lblSoiGiayTo_View').html('---');
        } else {
            $('#lblSoiGiayTo_View').html(data.SoGiayTo);
        }
        if (data.NoiThuongTruHGD === '' || data.NoiThuongTruHGD === null) {
            $('#lblDiaChiThuongTru_View').html('---');
        } else {
            $('#lblDiaChiThuongTru_View').html(data.NoiThuongTruHGD);
        }

        if (data.Tinh === '' || data.Tinh === null) {
            $('#lblTinh_View').html('---');
        } else {
            $('#lblTinh_View').html(data.Tinh);
        }
        if (data.Huyen === '' || data.Huyen === null) {
            $('#lblHuyen_View').html('---');
        } else {
            $('#lblHuyen_View').html(data.Huyen);
        }
        if (data.Xa === '' || data.Xa === null) {
            $('#lblXa_View').html('---');
        } else {
            $('#lblXa_View').html(data.Xa);
        }
        if (data.HoGiaDinhID == "00000000-0000-0000-0000-000000000000") {
            $('#HoGiaDinhID').value("");
        } else {
            $('#HoGiaDinhID').value(data.HoGiaDinhID);
        }
        $('#ThanhVienHoGDID').value(data.ThanhVienHoGDID);
        $('#lblHoVaTen_View').html(data.HoVaTen);
        $('#lblGioiTinh_View').html(data.TenGioiTinh);
        $('#lblNgaySinh_View').html(data.NgayThangNamSinh);
        $('#lblCMND_View').html(data.SoCCCD);
        $('#lblNgayCap_View').html(data.NgayCap);
        $('#lblNoiCap_View').html(data.TenNoiCap);
        $('#lblDanToc_View').html(data.TenDanToc);
        $('#lblTonGiao_View').html(data.TenTonGiao);
        $('#lblQuocTich_View').html(data.TenQuocTich);
        $('#lblHoKhauThuongTru_View').html(data.DiaChiCuTheTT);
        $('#lblHoTenChuHoMain_View').html(data.HoVaTen + " (" + data.SoCCCD + ")");
        $('#lblDiaChi_View').html(data.DiaChiCuTheTT);
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
}


//async function LoadDataTable_ListTab2() {
//    var saveData = new Array();
//    saveData[0] = $('#TinhID_TimKiem_us').value();
//    saveData[1] = $('#HuyenID_TimKiem_us').value();
//    saveData[2] = $('#XaID_TimKiem_us').value();
//    saveData[3] = $('#ThonID_TimKiem_us').value();
//    saveData[4] = $('#timKiem').value();
//    saveData[5] = $('#HoGiaDinhID_TimKiem_us').value();
//    GridDoiTuong_List.clearData();
//    const GetAll = await NTS.getAjax("/DanhMuc/DoiTuongCaNhan/GetAll", { data: saveData });
//    if (!GetAll.Err) {
//        GridDoiTuong_List.setData(GetAll.Result);
//    }
//    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
//}

//------------------------Grid quá trình------------------------------//
function actionDropdownFormatter_View(cell, formatterParams, onRendered) {
    var ID = cell.getData().CungLaoDongID;
    var TrangThai = cell.getData().TrangThai;
    var LaBienDong = cell.getData().BienDong;

    var select = document.createElement("div");
    select.className = 'dropdown';
    select.innerHTML = `
       <div class="btn-group btn-group-tabulator btnThuThapCungLaoDong">
           <a data-bs-toggle="dropdown" class=" dropdown-toggle dropdown-toggle-split" aria-expanded="false"> <i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
           <div class="dropdown-menu dropdown-menu-end dropdown-menu-tabulator" style="">          
                <a style="display: ${TrangThai == "Đã tổng hợp" ? "none" : "block"}" class="dropdown-item btnXemThongTin " href="#" data="${ID}">
                    <i class='fa fa-eye text-primary'></i>&ensp;  Xem thông tin
               </a>
                ` + (LaBienDong == 1 ? `  <a style="display: ${TrangThai == "Đã tổng hợp" ? "none" : "block"}" class="dropdown-item btnSuaTTBienDong" href="#" data="${ID}">
                    <i class="fa fa-pencil text-warning" aria-hidden="true"></i>&ensp;  Chỉnh sửa phiếu thu thập
               </a>` : ` <a style="display: ${TrangThai == "Đã tổng hợp" ? "none" : "block"}" class="dropdown-item btnSuaTTBanDau" href="#" data="${ID}">
                    <i class="fa fa-pencil text-warning" aria-hidden="true"></i>&ensp;  Chỉnh sửa phiếu thu thập
               </a>`) + `
                <a style="display: ${TrangThai == "Đã tổng hợp" ? "none" : "block"}" class="dropdown-item btnXoaTTCungLD " href="#" data="${ID}">
                    <i class='fa fa-trash-o  text-danger'></i>&ensp;  Xóa phiếu thu thập
               </a>
                <a style="display: ${TrangThai == "Đã tổng hợp" ? "none" : "block"}" class="dropdown-item btnInPhieuThuThap " href="#" data="${ID}">
                    <i class='fa-solid fa-print' style="color: var(--tbl-btn-luuvadong) !important;"></i>&ensp;  In phiếu thu thập <i class="fa-solid fa-angle-right " style="float: right;margin-top: 5px;"></i>
               </a>
               
               <div id="hoverBoxQTT">
                    <a style="display: ${TrangThai == "Đã tổng hợp" ? "none" : "block"}" class="dropdown-item btnInMau03 " href="#" data="${ID}">
                        In mẫu 03 thông tư 11/2022/TT-BLĐTBXH
                   </a>
                    <a style="display: ${TrangThai == "Đã tổng hợp" ? "none" : "block"}" class="dropdown-item btnInMau01 " href="#" data="${ID}">
                        In mẫu 01 thông tư 01/2022/TT-BLĐTBXH
                   </a>
                </div>

           </div>    
       </div>`;
    return select;
}
function formater_XemDinhKem() {
    var btnXemDinhKem = `<div class="text-success"> <i class="fa-solid fa-eye"></i> Xem đính kèm</div>`;
    return btnXemDinhKem;
}

var Grid_QuaTrinh_View = new Tabulator("#Grid_QuaTrinh_View", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "432",
    columns: [
        //{
        //    title: "<button id='btnThemCungLD' class='btn btn-xs btn-primary' style='background-color: #f3f4f5;font-size: 20px;'><i class='fa fa-plus' aria-hidden='true' style='color: var(--tbl-btn-luuvadong);'></i></button>"
        //    , formatter: actionDropdownFormatter_View
        //    , headerSort: false, headerHozAlign: "Center", hozAlign: "center", field: "ThaoTac", width: 60,
        //},
        {
            title: "<div class='btn-group btn-group-tabulator'><a data-bs-toggle='dropdown' class='dropdown-toggle dropdown-toggle-split' aria-expanded='false' style='background-color: #f3f4f5;font-size: 20px;'><i class='fa fa-plus' aria-hidden='true' style='color: var(--tbl-btn-luuvadong);'></i></a><div class='dropdown-menu dropdown-menu-end dropdown-menu-tabulator' ><a class='dropdown-item textsize-item' href='javascript: void (0); ' id='btnThemMoiBanDau'><i style=' font-size: 17px; ' class='text-warning fa-solid fa-user-plus iconsize-item'></i>&ensp; Thêm mới cung lao động ban đầu</a><a class= 'dropdown-item textsize-item' href = 'javascript:void(0);' id = 'btnThemMoiBienDong' > <i style='font-size: 17px; color: #4299E1 !important;' class='text-primary fa-solid fa-user-pen iconsize-item'></i>&ensp;Thêm mới cung lao động biến động</a></div></div>"
            , formatter: actionDropdownFormatter_View
            , headerSort: false, headerHozAlign: "Center", hozAlign: "center", field: "ThaoTac", width: 60,
        },
        { title: "Ngày thu thập", field: "NgayThuThap", formatter: 'textarea', headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", minWidth: 130 },
        { title: "Đối tượng ưu tiên", field: "TenDoiTuongUuTien", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 200 },
        { title: "Trình độ PT cao nhất", field: "TenTrinhDoHocVan", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 180 },
        { title: "Trình độ CMKT cao nhất", field: "TenTrinhDoCMKT", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 200 },
        { title: "Công việc đang làm", field: "TenCongViecDangLam", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 250 },
        { title: "Nơi làm việc", field: "TenDNNoiLV", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 200 },
        { title: "Địa chỉ nơi làm việc", field: "DiaChiCuTheNLV", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 200 },
        { title: "Thời gian thất nghiệp", field: "TenThoiGianTN", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 161 },
        { title: "Nguyên nhân không tham gia HĐKT", field: "TenNguyenNhanKhongTGHDKT", formatter: 'textarea', hozAlign: "left", minWidth: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Loại thu thập", field: "LoaiThuThap", formatter: 'textarea', hozAlign: "left", minWidth: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Loại biến động", field: "LoaiBienDong", formatter: 'textarea', hozAlign: "left", minWidth: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "CungLaoDongID", field: "CungLaoDongID", width: 0, visible: false }
        //{ title: "Nơi đăng ký thường trú", field: "NoiDangKyThuongTru", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 250, visible: false },
        //{ title: "Nơi ở hiện tại", field: "NoiOHienTai", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 250, visible: false },
        //{ title: "Hình thức làm việc", field: "HinhThucLamViec", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 150, visible: false },
        //{ title: "Xem đính kèm", field: "DinhKem", hozAlign: "center", width: 130, formatter: formater_XemDinhKem, headerSort: false, vertAlign: "middle", headerHozAlign: "center", visible: false},
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});


async function LoadDataTableCungLD_TabQuaTrinh(ID) {
    Grid_QuaTrinh_View.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/DoiTuongCaNhan/LoadDulieuCungLD", { id: ID });
    if (!GetAll.Err) {
        Grid_QuaTrinh_View.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}


//-----------------------Xem thông tin quá trình thu thập--------------//
var Grid_QuaTrinhThuThap_Xem = new Tabulator("#Grid_QuaTrinhThuThap_Xem", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "500",
    HeaderVertAlign: "center",
    columns: [
        { title: "Ngày thu thập", field: "NgayThuThap", formatter: 'textarea', headerHozAlign: "center", hozAlign: "center", vertAlign: "middle", minWidth: 130 },
        { title: "Đối tượng ưu tiên", field: "TenDoiTuongUuTien", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 200 },
        { title: "Trình độ PT cao nhất", field: "TenTrinhDoHocVan", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 180 },
        { title: "Trình độ CMKT cao nhất", field: "TenTrinhDoCMKT", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 200 },
        { title: "Công việc đang làm", field: "TenCongViecDangLam", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 250 },
        { title: "Nơi làm việc", field: "TenDNNoiLV", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 200 },
        { title: "Địa chỉ nơi làm việc", field: "DiaChiCuTheNLV", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 200 },
        { title: "Thời gian thất nghiệp", field: "TenThoiGianTN", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 161 },
        { title: "Nguyên nhân không tham gia HĐKT", field: "TenNguyenNhanKhongTGHDKT", formatter: 'textarea', hozAlign: "left", minWidth: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Loại thu thập", field: "LoaiThuThap", formatter: 'textarea', hozAlign: "left", minWidth: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "Loại biến động", field: "LoaiBienDong", formatter: 'textarea', hozAlign: "left", minWidth: 200, vertAlign: "middle", headerHozAlign: "center" },
        { title: "CungLaoDongID", field: "CungLaoDongID", width: 0, visible: false }
        //{ title: "Nơi đăng ký thường trú", field: "NoiDangKyThuongTru", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 250, visible: false },
        //{ title: "Nơi ở hiện tại", field: "NoiOHienTai", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 250, visible: false },
        //{ title: "Hình thức làm việc", field: "HinhThucLamViec", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", vertAlign: "middle", minWidth: 150, visible: false },
        //{ title: "Xem đính kèm", field: "DinhKem", hozAlign: "center", width: 130, formatter: formater_XemDinhKem, headerSort: false, vertAlign: "middle", headerHozAlign: "center", visible: false},
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});


async function LoadQuaTrinhThuThap_Xem(ID) {
    Grid_QuaTrinhThuThap_Xem.clearData();
    const GetAll = await NTS.getAjaxAsync("/DanhMuc/DoiTuongCaNhan/LoadDulieuCungLD", { id: ID });
    if (!GetAll.Err) {
        Grid_QuaTrinhThuThap_Xem.setData(GetAll.Result);
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

////-------------------Xuất dữ liệu cung lao động------------------//

$(document).on('click', '.btnInMau01', function () {
    var ID = $(this).attr('data');
    XuatMau01_TT01_DT(ID);
});

$(document).on('click', '.btnInMau03 ', function () {
    var ID = $(this).attr('data');
    XuatMau03_TT11_DT(ID);
});

async function XuatMau01_TT01_DT(ID) {
    var data = await NTS.getAjaxAsync('/DanhMuc/DoiTuongCaNhan/XuatMau01', { id: ID });
    //window.open(data);
    try {
        $('#divNoiDung_us').attr("src", data.replace(".docx", ".pdf"));
        $('#modal_xemtruockhiin_us').modal('show');
        $('#modal_taifile_us').show();
        $('#modal_taifile2_us').hide();
    } catch (ex) {

    }
}

async function XuatMau03_TT11_DT(ID) {
    var data = await NTS.getAjaxAsync('/DanhMuc/DoiTuongCaNhan/XuatMau03', { id: ID });
    //window.open(data);
    try {
        $('#divNoiDung_us').attr("src", data.replace(".docx", ".pdf"));
        $('#modal_xemtruockhiin_us').modal('show');
        $('#modal_taifile_us').show();
        $('#modal_taifile2_us').hide();
    } catch (ex) {

    }
}


//-----------------------Lưu thông tin thành viên--------------//
$(document).on('click', '.btnLuuVaDongThemThanhVien_usDT', function () {
    const validate = new NTSValidate('#mdThemMoiThanhVien_us');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }
    if ($('#lbHoGiaDinhID_ChuHo').hasClass("validation")) {
        if ($('#SelectChuHo_US').attr("value") == "") {
            NTS.canhbao("Hộ gia đình không được để trống!");
            return false;
        }
    }

    if ($('#SoCMND_DoiTuong_us').val().length !== 12 && $('#SoCMND_DoiTuong_us').val().length !== 9) {
        NTS.canhbao("Số CMND/CCCD/Số định danh cá nhân chưa đúng định dạng!");
        return false;
    }


    //Kiểm tra năm sinh và năm được cấp số CCCD
    var ngaySinh = moment($('#NgaySinhDT_us').val(), 'DD/MM/YYYY').toDate();
    var ngaySinhYear = ngaySinh.getFullYear();
    var ngayCapCCCD = moment($('#NgayCapDT_us').val(), 'DD/MM/YYYY').toDate();
    var ngayCapCCCDYear = ngayCapCCCD.getFullYear();

    if (ngaySinhYear >= ngayCapCCCDYear) {
        NTS.canhbao("Năm sinh không được lớn hơn năm cấp Số CMND/CCCD/Số định danh cá nhân!");
        return false;
    }

    if (!checkAge($('#NgaySinhDT_us').value())) {
        // Ngày sinh không đủ 15 tuổi
        NTS.canhbao("Ngày sinh không được nhỏ hơn 15 tuổi!");
        return false;
    }

    var result = LuuThongTinThanhVien_us();
    if (!result.Err) {
        if (result.Logs == "1") {
            CanhBaoTrungSoDinhDanhDoiTuong(() => { }, result.Msg);
        } else {
            LoadDataTable();
            //LoadDataTable_ListTab2();
            if (tempthem == "sua") {
                LoadThongTinDoiTuongTabTT($('#ThanhVienHoGDID').value());
            }
            NTS.thanhcong(result.Msg);
            $('#mdThemMoiThanhVien_us').modal('hide');
            return false;
        }
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    }
    return false;
});

//-------------------Sua du lieu đối tượng--------------------//
$(document).on('click', '.btnSuaTT', function () {
    $('#ThanhVienHoGDID_us').val($(this).attr('data'));
    SuaDuLieuThanhVienHoGD_us($(this).attr('data'), $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
    if ($('#select2-MoiQuanHeIDDT_us-container').text() === "Chủ hộ") {
        $('#MoiQuanHeIDDT_us').prop('disabled', true);
        $('#SelectChuHo_US').prop('disabled', true);
        $('#HienThiTatCaHoGiaDinh').prop('disabled', true);
    }
});
$(document).on('click', '#btnSua2', function () {
    if (GridDoiTuong_List.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 đối tượng!');
        return false;
    }

    $('#ThanhVienHoGDID_us').val($(this).attr('data'));
    SuaDuLieuThanhVienHoGD_us($(this).attr('data'), $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
    if ($('#select2-MoiQuanHeIDDT_us-container').text() === "Chủ hộ") {
        $('#MoiQuanHeIDDT_us').prop('disabled', true);
        $('#SelectChuHo_US').prop('disabled', true);
        $('#HienThiTatCaHoGiaDinh').prop('disabled', true);
    }
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

// Xuất excel
var dulieuloc = "";
$('#btnExport').on('click', async function () {
    var saveData = new Array();
    saveData[0] = $('#TinhID_TimKiem_us').value();
    saveData[1] = $('#HuyenID_TimKiem_us').value();
    saveData[2] = $('#XaID_TimKiem_us').value();
    saveData[3] = $('#ThonID_TimKiem_us').value();
    saveData[4] = $('#timKiem').value();
    saveData[5] = $('#HoGiaDinhID_TimKiem_us').value();
    var kq = await NTS.getAjaxAsync('/DanhMuc/DoiTuongCaNhan/XuatExcel_DoiTuong', { data: saveData });
    if (!kq.Err) {
        window.open(kq);
    } else {
        NTS.loi(kq.Msg);
    }
});

$(document).on('click', '#btnChonHoGDVaDong_us', function () {
    if (Grid_ChonHoGD_us.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 hộ gia đình!');
        return false;
    }
    var data = Grid_ChonHoGD_us.getSelectedRows()[0]._row.data;
    $('#HoGiaDinhID').value(data.HoGiaDinhID);
    $('#lblTenHoGiaDinh_ThanhVien_us').html(data.HoVaTenChuHo);
    $('#SelectChuHo_US').attr('value', data.HoGiaDinhID);
    $('#SelectChuHo_US').html(`<li><span><b>${data.HoVaTenChuHo}(${data.SoGiayTo})</b> - <b>Nơi thường trú: </b>${data.DiaChiCuTheTT}</span></li>`);
    $('#MoiQuanHeIDDT_us').prop("disabled", false);
    $('#MoiQuanHeIDDT_us').prop('required', true);
    $('#lbMoiQuanHeIDDT_us').addClass('validation');
    $('#mdChonHoGD_us').modal('hide');
    //// Kiểm tra khi chọn lại nếu đối tượng là chủ hộ thì ẩn combo quan hệ
    //if ($('#select2-MoiQuanHeIDDT_us-container').text() === "Chủ hộ") {
    //    $('#MoiQuanHeIDDT_us').prop('disabled', true);
    //}
    //if ($('#SelectChuHo_US').val() !== "") {
    //    $('#MoiQuanHeIDDT_us').prop('disabled', false);
    //    $('#MoiQuanHeIDDT_us').prop('required', true);
    //    $('#lbMoiQuanHeIDDT_us').addClass('validation');
    //}
    //// khi Sửa chọn lại đối tượng là chủ hộ thì ẩn chủ hộ trong combo quan hệ
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

///////// PHÍM TẮT /////////
var hotKey = 0; // 1 thêm
$(document).on('keydown', function (e) {
    console.log(e.keyCode);
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
            if ($('#mdThemMoiThanhVien_us').hasClass('show')) {
                $('#mdThemMoiThanhVien_us').modal('hide');
                e.preventDefault();
                break;
            } else if ($('#mdXemThongTinCungLaoDong_us').hasClass('show')) {
                $('#mdXemThongTinCungLaoDong_us').modal('hide');
                e.preventDefault();
                break;
            } else if ($('#mdThemMoiCungLaoDongBanDau').hasClass('show')) {
                $('#mdThemMoiCungLaoDongBanDau').modal('hide');
                e.preventDefault();
                break;
            }
        case 120:
            if (hotKey == 1)
                if ($('#mdXemThongTinCungLaoDong_us').hasClass('show')) {
                    $('.btnLuuVaDongThemThanhVien_usDT').trigger('click');
                    e.preventDefault();
                    break;
                } else if ($('#mdThemMoiCungLaoDongBanDau').hasClass('show')) {
                    $('#btnLuuVaDongCLD').trigger('click');
                    e.preventDefault();
                    break;
                }
    }
});
$(document).on('shown.bs.modal', '#mdThemMoiThanhVien_us', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdThemMoiThanhVien_us', function () {
    hotKey = 0;
});

$(document).on('shown.bs.modal', '#mdThemMoiCungLaoDongBanDau', function () {
    hotKey = 1;
});
$(document).on('hidden.bs.modal', '#mdThemMoiCungLaoDongBanDau', function () {
    hotKey = 0;
});

//---------------------------------Xóa cung lao động---------------------------------
$(document).on('click', '.btnXoaTTCungLD', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieuCungLaoDong_us(ID);
});


////-------------------Xóa dữ liệu cung lao động------------------//
function XoaDuLieuCungLaoDong_us(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'CungLaoDongID', ID: ID, TenBangHienTai: 'CungLaoDong', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/DanhMuc/DoiTuongCaNhan/XoaDuLieuCungLD', { id: ID });
                if (!result.Err) {
                    LoadDataTableCungLD_TabQuaTrinh(ID);
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

//-------------------Sửa dữ liệu dối tượng cá nhân------------------//
function SuaDuLieuThanhVienHoGD_us(ID, TinhID, HuyenID, XaID, ThonID, TuKhoa) {
    if (!QuyenSua()) {
        return false;
    }
    if (Data.RangBuocHoGiaDinh == 1) {
        $('#HoGiaDinhID_ChuHo').prop('required', true);
        $('#lbHoGiaDinhID_ChuHo').addClass('validation');
    }
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
            $('#TinhID_HNDT_us').value(data.DiaBanHCID_TinhHT);
            $('#HuyenID_HNDT_us').value(data.DiaBanHCID_HuyenHT);
            $('#XaID_HNDT_us').value(data.DiaBanHCID_XaHT);
            $('#ThonID_HNDT_us').value(data.DiaBanHCID_ThonHT);
        },50);
        $('#DiaChiThuongTruDT_us').value(data.DiaChiCuTheTT);
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
        if ($('#select2-MoiQuanHeIDDT_us-container').text() === "Chủ hộ") {
            $('#MoiQuanHeIDDT_us').prop('disabled', true);
            $('#SelectChuHo_US').prop('disabled', true);
            actionShowModal = false;
        } else {
            actionShowModal = true;
            $('#SelectChuHo_US').prop('disabled', false);
            $('#MoiQuanHeIDDT_us').prop('disabled', false);
        }
        if (data.HoGiaDinhID == "00000000-0000-0000-0000-000000000000") {
            $('#SelectChuHo_US').attr('value', "");
            $('#MoiQuanHeIDDT_us').prop('disabled', true);
        } else {
            $('#SelectChuHo_US').attr('value', data.HoGiaDinhID);
            $('#SelectChuHo_US').html(`<li><span><b>${data.HoVaTenChuHo}(${data.SoGiayTo})</b> - <b>Nơi thường trú: </b>${data.DiaChiCuTheTTHDG}</span></li>`);
        }

    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    tempthem = 'sua';
}

//========================================================Thu thập cung lao động=========================================================================////////////
//---------------------------------Thêm mới thông tin hộ gia đình---------------------------------
$(document).on('click', '#btnThemNhanhHoGiaDinh', function () {
    getLocation();
    showModalThemMoi();
    $('#btnTiepTuc').css({ 'display': 'none' });
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
                    LoadComBoHoGiaDinhCLD($('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), "")
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
            LoadComBoHoGiaDinhCLD($('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), "")
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


//===================Modal chọn hộ gia đình==========================//
$(document).on('click', '#btnChonHoGDVaDong_us', function () {
    if (Grid_ChonHoGD_us.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 hộ gia đình!');
        return false;
    }
    if ($('#select2-MoiQuanHeIDDT_CLD_US-container').text() == "Chủ hộ") {
        ResetInputRong();
    }
    var data = Grid_ChonHoGD_us.getSelectedRows()[0]._row.data;
    $('#HoGiaDinhID').value(data.HoGiaDinhID);
    $('#SelectChuHo_CLD_US').attr('value', data.HoGiaDinhID);
    $('#SelectChuHo_CLD_US').html(`<li><span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;"><b>${data.HoVaTenChuHo}(${data.SoGiayTo})</b> - <b>Nơi thường trú: </b>${data.DiaChiCuTheTT}</span></li>`);
    $('#MoiQuanHeIDDT_CLD_US').prop("disabled", false);
    $('#MoiQuanHeIDDT_CLD_US').prop('required', true);
    $('#lbMoiQuanHeIDDT_CLD_us').addClass('validation');
    $('#mdChonHoGD_us').modal('hide');

    // Load danh sách thành viên hộ gia đình
    ResetTTThanhVienCLD();
    var hoGiaDinhID = data.HoGiaDinhID;
    if (hoGiaDinhID != "") {
        $('#countrydata').html('');
        var result = NTS.getAjax('/DanhMuc/HoGiaDinh/ThanhVienHoGD_ThuocHoGD', { id: hoGiaDinhID });
        var data = result.Result;
        // Truyền giá trị cho thuộc tính list và id
        for (var i = 0; i < data.length; i++) {
            $('#countrydata').append(`<option data="${data[i].ThanhVienHoGDID}">${data[i].SoCCCD} - ${data[i].HoVaTen}</option>`);
        }
    }
    return false;
});

//==================Xử lý logic đối tượng================//
function ResetTTThanhVienCLD() {
    $('#countrydata').html('');
    $('#MoiQuanHeIDDT_CLD_US').value('');
    $('#TinhID_TT_us').prop('disabled', false);
    $('#HuyenID_TT_us').prop('disabled', false);
    $('#XaID_TT_us').prop('disabled', false);
    $('#ThonID_TT_us').prop('disabled', false);
    $('#SoNha_TT_us').prop('disabled', false);
    $('#DiaChiThuongTruDT_us_CLD').prop('disabled', false);
}

// Kiểm tra và thay thế giá trị null hoặc "00000000-0000-0000-0000-000000000000" bằng ""
function replaceNullAndEmptyString(value) {
    if (value === null || value === "00000000-0000-0000-0000-000000000000") {
        return "";
    }
    return value;
}

// Reset lai các input khi nhập CCCD/CMND không tồn tại hoặc thay đổi hộ gia đình khi tối tượng là chủ hộ
function ResetInputRong() {
    $('#SoCMND_us').value('');
    $('#NgayCapCCCD_us').value('');
    $('#NoiCapCCCD_us_CLD').value('');
    $('#HoVaTenDT_us_CLD').value('');
    $('#NgaySinh_us').value('');
    $('#TinhID_NS_us').value('');
    $('#GioiTinh_us').value('');
    $('#DanTocID_us').value('');
    $('#TonGiaoID_us').value('');
    $('#QuocGiaID_us').value('');
    $('#TinhID_TT_us').value('');
    $('#HuyenID_TT_us').value('');
    $('#XaID_TT_us').value('');
    $('#ThonID_TT_us').value('');
    $('#SoNha_TT_us').value('');
    $('#DiaChiThuongTruDT_us_CLD').value('');
    $('#TinhID_HN_us').value('');
    $('#HuyenID_HN_us').value('');
    $('#XaID_HN_us').value('');
    $('#ThonID_HN_us').value('');
    $('#SoNha_HN_us').value('');
    $('#DiaChiThuongTruHN_us').value('');
    $('#GiongHoKhauThuongTru_us').prop('checked', false);
    ////// Chọn phần tử thứ 2 trong select
    $('#NoiCapCCCD_us_CLD option:eq(1)').prop('selected', true);
    $('#NoiCapCCCD_us_CLD').trigger('change');

    $('#GioiTinh_us option:eq(1)').prop('selected', true);
    $('#GioiTinh_us').trigger('change');

    $('#QuocGiaID_us option:eq(1)').prop('selected', true);
    $('#QuocGiaID_us').trigger('change');

    $('#DanTocID_us option:eq(1)').prop('selected', true);
    $('#DanTocID_us').trigger('change');

    $('#TonGiaoID_us option:eq(1)').prop('selected', true);
    $('#TonGiaoID_us').trigger('change');
    // Gán mặc định tỉnh, huyện, xã của địa chỉ thường trú theo tỉnh, huyện, xã theo đơn vị đăng nhập
    try {
        var DonVi = NTS.getAjax('/DanhMuc/DungChung/GetThongTinDonViThaoTac', {});
        DonVi = DonVi.Result;
        if (DonVi != undefined && !$.isEmptyObject(DonVi) && DonVi != '' && DonVi != null) {
            $('#TinhID_TT_us').value(DonVi[0].DiaBanHCID_Tinh);
            $('#TinhID_NS_us').value(DonVi[0].DiaBanHCID_Tinh);
            $('#HuyenID_TT_us').value(DonVi[0].DiaBanHCID_Huyen);
            $('#XaID_TT_us').value(DonVi[0].DiaBanHCID_Xa);
        }
    } catch (e) {

    }
    $('#LoaiBHXH_us').value('');
    $('#DoiTuongUuTienID_us').value('');
    $('#TrinhDoPTID_us').value('');
    $('#TrinhDoCMKTID_us').value('');
    $('#NguoiCungCapThongTin').value('');
    $('#NhuCauDaoTaoViecLam').value('');
    $('#LinhVucDaoTaoID_us').value('');
    $('#ChuyenNganhDTID_us').value('');
    $('#chkBHYT_us').prop('checked', false);
    $('#chkBHTN_us').prop('checked', false);
    $('#MaSoBHXH_us').value('');
    $('#LoaiBienDongID').value('');
    $('#txtDuongDanFileVB_tailieu_CLD').val('');
    $('#btnChonTepVB_tailieu_CLD').css({ "display": "block" });
    $('#btnXoaChuKy').css({ "display": "none" });
    $('#btnXoaChuKy').attr({ "data-url-file": "" });
    $('#list-file-tai-lieu_CLD').html('');
    $('#list-file-tai-lieu_CLD').css({ "display": "none" });
}

$(document).on('click', '.itemDoiTuong', function () {
    if ($('#select2-MoiQuanHeIDDT_CLD_US-container').text() == "Chủ hộ") {
        ResetInputRong();
        NTS.canhbao("Không thể thay đổi hộ gia đình khi đối tượng là chủ hộ!")
    }
    ResetTTThanhVienCLD();
    var action = $(this).attr("action");
    if (action == "false") {
        return;
    }
    if (action != "chon") {
        if (bienDong == false) {
            var soCCCD = $(this).val();
            var hoGiaDinhID = $('#SelectChuHo_CLD_US').attr('value');
            if (hoGiaDinhID != "") {
                $('#countrydata').html('');
                var result = NTS.getAjax('/DanhMuc/HoGiaDinh/ThanhVienHoGD_ThuocHoGD', { id: hoGiaDinhID });
                var data = result.Result;
                // Truyền giá trị cho thuộc tính list và id
                for (var i = 0; i < data.length; i++) {
                    //$('#countrydata').append(`<option data="${data[i].ThanhVienHoGDID}">${data[i].SoCCCD} - ${data[i].HoVaTen}</option>`);
                    $('#countrydata').append(`<option data="${data[i].ThanhVienHoGDID}">${data[i].SoCCCD} - ${data[i].HoVaTen}</option>`);
                }
            }
        } else {
            var hoGiaDinhID = $('#SelectChuHo_CLD_US').attr('value');
            if (hoGiaDinhID != "") {
                $('#countrydata').html('');
                var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBanDau/LayDuLieuCungBanDauTheoHGD', { id: hoGiaDinhID });
                var data = result.Result;
                // Truyền giá trị cho thuộc tính list và id
                for (var i = 0; i < data.length; i++) {
                    $('#countrydata').append(`<option data="${data[i].ThanhVienHoGDID}">${data[i].SoCCCD} - ${data[i].HoVaTen}</option>`);
                }
            }
        }
    }
});

function LoadThanhVienHoGiaDinh(value) {
    var soCCCD = value;
    // Trả về trạng thái thêm mới
    $('#MoiQuanHeIDDT_CLD_US').prop('disabled', false);
    $('#TinhID_TT_us').prop('disabled', false);
    $('#HuyenID_TT_us').prop('disabled', false);
    $('#XaID_TT_us').prop('disabled', false);
    $('#ThonID_TT_us').prop('disabled', false);
    $('#SoNha_TT_us').prop('disabled', false);
    $('#DiaChiThuongTruDT_us_CLD').prop('disabled', false);

    NTS.loadDataCombo({
        name: '#MoiQuanHeIDDT_CLD_US',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
        ajaxParam: { data: ['them', '12'] },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });

    if (soCCCD.indexOf(" ") !== -1) {
        // Lấy ra số CMND/CCCD/Số định danh từ option
        var numberString = soCCCD.split(' ')[0].replace(/[^0-9]/g, "");

        $('#SoCMND_us').value(numberString);

        // Lấy ra thông tin của thành viên vừa chọn
        var ThanhVienID = $('#countrydata option[value="' + soCCCD + '"]').attr('data');
        var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBanDau/LoadDuLieuThanhVienBySoCCCD', { soCCCD: numberString });
        var data = result.Result[0];

        // Nếu thành viên là chủ hộ thì load lại cobom quan hệ và ẩn quan hệ
        if (data.ChuHo == "1") {
            NTS.loadDataCombo({
                name: '#MoiQuanHeIDDT_CLD_US',
                ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
                ajaxParam: { data: ['sua', '12'] },
                indexValue: 0,
                indexText: 2,
                textShowTatCa: '-Chọn-',
                showTatCa: !0
            });
            $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
        } else {
            $('#MoiQuanHeIDDT_CLD_US').prop('disabled', false);
        }
        $('#MoiQuanHeIDDT_CLD_US').value(data.QuanHeID);
        $('#NgayCapCCCD_us').value(data.NgayCap);
        $('#NoiCapCCCD_us_CLD').value(data.NoiCapID);
        $('#HoVaTenDT_us_CLD').value(data.HoVaTen);
        $('#NgaySinh_us').value(data.NgayThangNamSinh);
        $('#TinhID_NS_us').value(data.NoiSinh);
        $('#GioiTinh_us').value(data.GioiTinhID);
        $('#DanTocID_us').value(data.DanTocID);
        $('#TonGiaoID_us').value(data.TonGiaoID);
        $('#QuocGiaID_us').value(data.QuocTichID);
        $('#TinhID_TT_us').value(data.DiaBanHCID_TinhTT);
        $('#HuyenID_TT_us').value(data.DiaBanHCID_HuyenTT);
        $('#XaID_TT_us').value(data.DiaBanHCID_XaTT);
        $('#ThonID_TT_us').value(data.DiaBanHCID_ThonTT);
        $('#SoNha_TT_us').value(data.SoNhaTT);
        $('#DiaChiThuongTruDT_us_CLD').value(data.DiaChiCuTheTT);
        $('#TinhID_HN_us').value(data.DiaBanHCID_TinhHT);
        $('#HuyenID_HN_us').value(data.DiaBanHCID_HuyenHT);
        $('#XaID_HN_us').value(data.DiaBanHCID_XaHT);
        $('#ThonID_HN_us').value(data.DiaBanHCID_ThonHT);
        $('#SoNha_HN_us').value(data.SoNhaHT);
        $('#DiaChiThuongTruHN_us').value(data.DiaChiCuTheHT);
        $('#DoiTuongID').value(data.ThanhVienHoGDID);
        soCCCDDT = data.SoCCCD;
        $('#TinhID_TT_us').prop('disabled', true);
        $('#HuyenID_TT_us').prop('disabled', true);
        $('#XaID_TT_us').prop('disabled', true);
        $('#ThonID_TT_us').prop('disabled', true);
        $('#SoNha_TT_us').prop('disabled', true);
        $('#DiaChiThuongTruDT_us_CLD').prop('disabled', true);
        if (data.HoGiaDinhID == "00000000-0000-0000-0000-000000000000") {
            $('#SelectChuHo_CLD_US').html(`<li action="chon"><div class="opInfo"><div style="display: flex;justify-content: space-between;align-items: center;">--Chọn hộ gia đình-- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);
            $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
            $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
            $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
            $('#SelectChuHo_CLD_US').attr('value', "");
        } else {
            var item = `<li style="display: flex"><span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;"><b>${data.HoVaTenChuHo}</b> <b>(${data.MaHoGiaDinh})</b>- Nơi thường trú : <b>${data.DiaChiCuTheHGD}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
            $('#SelectChuHo_CLD_US').attr('value', data.HoGiaDinhID);
            $('#SelectChuHo_CLD_US').html(item);
        }

        //Lưu các giá trị load dữ liệu ra vào mảng để kiểm tra 
        mangGiaTriDau.push(replaceNullAndEmptyString(data.QuanHeID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayCap));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiCapID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.HoVaTen.toUpperCase()));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayThangNamSinh));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiSinh));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.GioiTinhID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DanTocID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.TonGiaoID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.QuocTichID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.HoGiaDinhID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.SoCCCD));

    } else {
        $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
        var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBanDau/LoadDuLieuThanhVienBySoCCCD', { soCCCD: soCCCD });
        if (result.Result != "") {
            var data = result.Result[0];
            if (data.ChuHo == "1") {
                NTS.loadDataCombo({
                    name: '#MoiQuanHeIDDT_CLD_US',
                    ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
                    ajaxParam: { data: ['sua', '12'] },
                    indexValue: 0,
                    indexText: 2,
                    textShowTatCa: '-Chọn-',
                    showTatCa: !0
                });
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
            } else {
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', false);
            }
            $('#MoiQuanHeIDDT_CLD_US').value(data.QuanHeID);
            $('#NgayCapCCCD_us').value(data.NgayCap);
            $('#NoiCapCCCD_us_CLD').value(data.NoiCapID);
            $('#HoVaTenDT_us_CLD').value(data.HoVaTen);
            $('#NgaySinh_us').value(data.NgayThangNamSinh);
            $('#TinhID_NS_us').value(data.NoiSinh);
            $('#GioiTinh_us').value(data.GioiTinhID);
            $('#DanTocID_us').value(data.DanTocID);
            $('#TonGiaoID_us').value(data.TonGiaoID);
            $('#QuocGiaID_us').value(data.QuocTichID);
            $('#TinhID_TT_us').value(data.DiaBanHCID_TinhTT);
            $('#HuyenID_TT_us').value(data.DiaBanHCID_HuyenTT);
            $('#XaID_TT_us').value(data.DiaBanHCID_XaTT);
            $('#ThonID_TT_us').value(data.DiaBanHCID_ThonTT);
            $('#SoNha_TT_us').value(data.SoNhaTT);
            $('#DiaChiThuongTruDT_us_CLD').value(data.DiaChiCuTheTT);
            $('#TinhID_HN_us').value(data.DiaBanHCID_TinhHT);
            $('#HuyenID_HN_us').value(data.DiaBanHCID_HuyenHT);
            $('#XaID_HN_us').value(data.DiaBanHCID_XaHT);
            $('#ThonID_HN_us').value(data.DiaBanHCID_ThonHT);
            $('#SoNha_HN_us').value(data.SoNhaHT);
            $('#DiaChiThuongTruHN_us').value(data.DiaChiCuTheHT);
            $('#DoiTuongID').value(data.ThanhVienHoGDID);
            soCCCDDT = data.SoCCCD;
            $('#TinhID_TT_us').prop('disabled', true);
            $('#HuyenID_TT_us').prop('disabled', true);
            $('#XaID_TT_us').prop('disabled', true);
            $('#ThonID_TT_us').prop('disabled', true);
            $('#SoNha_TT_us').prop('disabled', true);
            $('#DiaChiThuongTruDT_us_CLD').prop('disabled', true);
            if (data.HoGiaDinhID == "00000000-0000-0000-0000-000000000000") {
                $('#SelectChuHo_CLD_US').html(`<li action="chon"><div class="opInfo"><div style="display: flex;justify-content: space-between;align-items: center;">--Chọn hộ gia đình-- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
                $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
                $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
                $('#SelectChuHo_CLD_US').attr('value', "");
            } else {
                var item = `<li style="display: flex"><span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;"><b>${data.HoVaTenChuHo}</b> <b>(${data.MaHoGiaDinh})</b>- Nơi thường trú : <b>${data.DiaChiCuTheHGD}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
                $('#SelectChuHo_CLD_US').attr('value', data.HoGiaDinhID);
                $('#SelectChuHo_CLD_US').html(item);
            }
            //Lưu các giá trị load dữ liệu ra vào mảng để kiểm tra 
            // Thêm giá trị vào mảng sau khi kiểm tra và thay thế
            mangGiaTriDau.push(replaceNullAndEmptyString(data.QuanHeID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayCap));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiCapID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.HoVaTen.toUpperCase()));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayThangNamSinh));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiSinh));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.GioiTinhID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DanTocID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.TonGiaoID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.QuocTichID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.HoGiaDinhID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoCCCD));
        } else {
            ResetTTThanhVienCLD();
            $('#SelectChuHo_CLD_US').value('');
            $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
            $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
            $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
            $('#TinhID_TT_us').prop('disabled', false);
            $('#HuyenID_TT_us').prop('disabled', false);
            $('#XaID_TT_us').prop('disabled', false);
            $('#ThonID_TT_us').prop('disabled', false);
            $('#SoNha_TT_us').prop('disabled', false);
            $('#DiaChiThuongTruDT_us_CLD').prop('disabled', false);
            ResetInputRong();
            var item = `<li action="chon"><div class="opInfo"><div style="display: flex;justify-content: space-between;align-items: center;">--Chọn hộ gia đình-- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
            $('.btn-select').html(item);
            $('#SoCMND_us').value(soCCCD);
            NTS.canhbao("Số CMND/CCCD/Số định danh chưa tồn tại trong hệ thống!");
            return false;
        }
    }
}

function LoadDoiTuongThuThapBanDau(value) {
    var soCCCD = value;
    // Trả về trạng thái thêm mới
    $('#MoiQuanHeIDDT_CLD_US').prop('disabled', false);
    $('#TinhID_TT_us').prop('disabled', false);
    $('#HuyenID_TT_us').prop('disabled', false);
    $('#XaID_TT_us').prop('disabled', false);
    $('#ThonID_TT_us').prop('disabled', false);
    $('#SoNha_TT_us').prop('disabled', false);
    $('#DiaChiThuongTruDT_us_CLD').prop('disabled', false);

    NTS.loadDataCombo({
        name: '#MoiQuanHeIDDT_CLD_US',
        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
        ajaxParam: { data: ['them', '12'] },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });

    if (soCCCD.indexOf(" ") !== -1) {
        // Lấy ra số CMND/CCCD/Số định danh từ option
        var numberString = soCCCD.split(' ')[0].replace(/[^0-9]/g, "");
        $('#SoCMND_us').value(numberString);

        // Lấy ra thông tin của thành viên vừa chọn
        var thanhvienid = $('#countrydata option[value="' + soCCCD + '"]').attr('data');
        var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBanDau/LoadDuLieu_CungLaoDongBanDauTheoDT', { id: numberString });
        var data = result.Result[0];

        // Nếu thành viên là chủ hộ thì load lại cobom quan hệ và ẩn quan hệ
        if (data.ChuHo == "1") {
            NTS.loadDataCombo({
                name: '#MoiQuanHeIDDT_CLD_US',
                ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
                ajaxParam: { data: ['sua', '12'] },
                indexValue: 0,
                indexText: 2,
                textShowTatCa: '-Chọn-',
                showTatCa: !0
            });
            $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
        } else {
            $('#MoiQuanHeIDDT_CLD_US').prop('disabled', false);
        }
        $('#MoiQuanHeIDDT_CLD_US').value(data.QuanHeID);
        $('#NgayCapCCCD_us').value(data.NgayCap);
        $('#NoiCapCCCD_us_CLD').value(data.NoiCapID);
        $('#HoVaTenDT_us_CLD').value(data.HoVaTen);
        $('#NgaySinh_us').value(data.NgayThangNamSinh);
        $('#TinhID_NS_us').value(data.NoiSinh);
        $('#GioiTinh_us').value(data.GioiTinhID);
        $('#DanTocID_us').value(data.DanTocID);
        $('#TonGiaoID_us').value(data.TonGiaoID);
        $('#QuocGiaID_us').value(data.QuocTichID);
        $('#TinhID_TT_us').value(data.DiaBanHCID_TinhTT);
        $('#HuyenID_TT_us').value(data.DiaBanHCID_HuyenTT);
        $('#XaID_TT_us').value(data.DiaBanHCID_XaTT);
        $('#ThonID_TT_us').value(data.DiaBanHCID_ThonTT);
        $('#SoNha_TT_us').value(data.SoNhaTT);
        $('#DiaChiThuongTruDT_us_CLD').value(data.DiaChiCuTheTT);
        $('#TinhID_HN_us').value(data.DiaBanHCID_TinhHT);
        $('#HuyenID_HN_us').value(data.DiaBanHCID_HuyenHT);
        $('#XaID_HN_us').value(data.DiaBanHCID_XaHT);
        $('#ThonID_HN_us').value(data.DiaBanHCID_ThonHT);
        $('#SoNha_HN_us').value(data.SoNhaHT);
        $('#DiaChiThuongTruHN_us').value(data.DiaChiCuTheHT);
        $('#DoiTuongID').value(data.ThanhVienHoGDID);
        soCCCDDT = data.SoCCCD;
        $('#TinhID_TT_us').prop('disabled', true);
        $('#HuyenID_TT_us').prop('disabled', true);
        $('#XaID_TT_us').prop('disabled', true);
        $('#ThonID_TT_us').prop('disabled', true);
        $('#SoNha_TT_us').prop('disabled', true);
        $('#DiaChiThuongTruDT_us_CLD').prop('disabled', true);
        if (data.HoGiaDinhID == "00000000-0000-0000-0000-000000000000") {
            $('#SelectChuHo_CLD_US').html(`<li action="chon"><div class="opInfo"><div style="display: flex;justify-content: space-between;align-items: center;">--Chọn hộ gia đình-- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);
            $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
            $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
            $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
            $('#SelectChuHo_CLD_US').attr('value', "");
        } else {
            var item = `<li style="display: flex"><span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;"><b>${data.HoVaTenChuHo}</b> <b>(${data.MaHoGiaDinh})</b>- Nơi thường trú : <b>${data.NoiThuongTruHGD}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
            $('#SelectChuHo_CLD_US').attr('value', data.HoGiaDinhID);
            $('#SelectChuHo_CLD_US').html(item);
        }

        // Load dữ liệu của thông tin cung lao động 
        $('#DoiTuongUuTienID_us').value(data.DoiTuongUuTienID);
        $('#TenDanToc_us').value(data.TenDanToc);
        $('#LoaiBHXH_us').value(data.ThamGiaBHXHID);
        if (data.BHTN == 1) {
            $('#chkBHTN_us').prop('checked', true);
        } else {
            $('#chkBHTN_us').prop('checked', false);
        }
        if (data.BHYT == 1) {
            $('#chkBHYT_us').prop('checked', true);
        } else {
            $('#chkBHYT_us').prop('checked', false);
        }
        $('#MaSoBHXH_us').value(data.MaBHXH);
        $('#TrinhDoPTID_us').value(data.TrinhDoHVID);
        $('#TrinhDoCMKTID_us').value(data.TrinhDoCMKTID);
        $('#LinhVucDaoTaoID_us').value(data.LinhVucDaoTaoID);
        $('#ChuyenNganhDTID_us').value(data.ChuyenNganhDaoTaoID);
        $('#ViTheViecLamID_us').value(data.ViTheViecLamID);
        $('#CongViecDangLamID_us').value(data.NgheNghiepID);
        $('#ViTriViecLamID_us').value(data.ViTriViecLamID);
        if (data.HopDongLaoDong == "0") {
            $('#chkKhongCoHDLD').prop('checked', true);
        } else {
            $('#chkKhongCoHDLD').prop('checked', false);
        }
        if (data.HopDongLaoDong == "1") {
            $('#chkCoHDLD').prop('checked', true);
        } else {
            $('#chkCoHDLD').prop('checked', false);
        }
        $('#NgayKy').value(data.NgayKyHĐ);
        $('#LoaiHopDongLaoDongID').value(data.LoaiHopDongID);
        $('#NoiLamViec').value(data.TenDNNoiLV);
        if (data.NoiLVNuocNgoai == "0") {
            $('#LamViecTrongNuoc').prop('checked', true);
            $('#LamViecNuocNgoai').prop('checked', false);
            $('.LamViecTrongNuoc').css('display', 'block');
            $('.LamViecONuocNgoai').css('display', 'none');
        } else {
            $('#LamViecNuocNgoai').prop('checked', true);
            $('#LamViecTrongNuoc').prop('checked', false);
            $('.LamViecTrongNuoc').css('display', 'none');
            $('.LamViecONuocNgoai').css('display', 'block');
        }
        $('#TinhID_NLV').value(data.DiaBanHCID_TinhNLV);
        $('#HuyenID_NLV').value(data.DiaBanHCID_HuyenNLV);
        $('#XaID_NLV').value(data.DiaBanHCID_XaNLV);
        $('#ThonID_NLV').value(data.DiaBanHCID_ThonNLV);
        $('#SoNha_NLV').value(data.SoNhaNoiLV);
        $('#LoaiHinhNLVID').value(data.LoaiHinhDNID);
        $('#DiaChiNoiLamViec').value(data.DiaChiCuTheNLV);
        if (data.ThatNghiep == "0") {
            $('#chkChuaBaoGioLamViec').prop('checked', true);
        } else {
            $('#chkChuaBaoGioLamViec').prop('checked', false);
        }
        if (data.ThatNghiep == "1") {
            $('#chkDaTungLamViec').prop('checked', true);
        } else {
            $('#chkDaTungLamViec').prop('checked', false);
        }
        $('#QuocGiaID_us_NLV').value(data.QuocGiaID);
        $('#ThoiGianThatnghiep').value(data.ThoiGianThatNghiepID);
        $('#CongViecTruocKhiThatNghiep').value(data.CongViecTruocTN);
        $('#NguyenNhanKTGHDKTID').value(data.LyDoID);
        $('#NhuCauDaoTaoViecLam').value(data.NhuCauDaoTaoVL);
        $('#NguoiCungCapThongTin').value(data.NguoiCungCapTT);
        if (data.ThatNghiep != "2" || data.ThoiGianThatNghiepID != "00000000-0000-0000-0000-000000000000" || data.CongViecTruocTN != "00000000-0000-0000-0000-000000000000") {
            ResetDoiVoiNguoiCoViecLam();
            ResetDoiVoiNguoiKTGHDKT();
        }
        else if (data.LyDoID != "00000000-0000-0000-0000-000000000000") {
            ResetDoiVoiNguoiCoViecLam();
            ResetDoiVoiNguoiThatNghiep();
        }
        else if (data.ViTheViecLamID != "00000000-0000-0000-0000-000000000000" ||
            data.NgheNghiepID != "00000000-0000-0000-0000-000000000000" ||
            data.ViTriViecLamID != "00000000-0000-0000-0000-000000000000" ||
            data.DiaBanHCID_TinhNLV != "00000000-0000-0000-0000-000000000000" ||
            data.DiaBanHCID_ThonNLV != "00000000-0000-0000-0000-000000000000" ||
            data.DiaBanHCID_XaNLV != "00000000-0000-0000-0000-000000000000" ||
            data.DiaBanHCID_HuyenNLV != "00000000-0000-0000-0000-000000000000" ||
            data.QuocGiaID != "00000000-0000-0000-0000-000000000000" ||
            data.LoaiHinhDNID != "00000000-0000-0000-0000-000000000000" ||
            data.LoaiHopDongID != "00000000-0000-0000-0000-000000000000" ||
            $('#chkCoHDLD').value() != "0" || $('#NgayKy').value() != "" ||
            $('#NoiLamViec').value() != "" || $('#SoNha_NLV').value() != "" || $('#DiaChiNoiLamViec').value() != ""
        ) {
            ResetDoiVoiNguoiThatNghiep();
            ResetDoiVoiNguoiKTGHDKT();
        }

        //Lưu các giá trị load dữ liệu ra vào mảng để kiểm tra 
        mangGiaTriDau.push(replaceNullAndEmptyString(data.QuanHeID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayCap));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiCapID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.HoVaTen.toUpperCase()));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayThangNamSinh));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiSinh));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.GioiTinhID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DanTocID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.TonGiaoID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.QuocTichID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheTT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheHT));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.HoGiaDinhID));
        mangGiaTriDau.push(replaceNullAndEmptyString(data.SoCCCD));
        var listFiles_VanBan_US = [];
        $('#txtDinhKem_VanBan_USDT').val(data.DinhKem);
        if (data.DinhKem == '' || data.DinhKem == null) {
            ResetDinhKemFile();
        }
        else {
            for (var i = 0; i < data.DinhKem.split('*').length; i++) {
                if (data.DinhKem.split('*')[i] == '') {
                    continue;
                }
                listFiles_VanBan_US.push(data.DinhKem.split('*')[i].split('/')[data.DinhKem.split('*')[i].split('/').length - 1].replaceAll('*', '').toString());
            }
            $('#HoSoKemTheo_USDangKy').ace_file_input('show_file_list', listFiles_VanBan_US);
            var ItemImg = $(".ace-icon.fa.fa-picture-o.file-image");
            //code chuyen doi chuoi dinh kem thanh array
            if (data.DinhKem != null && data.DinhKem.length > 0) {
                var linkVB = data.DinhKem;
                var arrFile = linkVB.split('*');

                for (var i = 0; i < arrFile.length; i++) {
                    if (arrFile[i] != "") {
                        $(ItemImg[i]).attr("ace-img-url", arrFile[i]);
                    }
                }
            }
            else {
                NTS.canhbao('Không có file đính kèm!');
            }
            //end code
            //Gắn sự kiện xem hình ảnh
            $(".ace-icon.fa.fa-picture-o.file-image").addClass("XemDinhKemHinhAnh_USDangKy");
            //Gắn thêm dấu x xóa từng file
            $('.ace-file-container.hide-placeholder .ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKemDT XoaFileDinhKemDT btn-del-item img-db"  onclick="return false"></i>');
        }
        // File đính kèm chữ ký
        $('#list-file-tai-lieu_CLD').html('');
        $('#txtDuongDanFileVB_tailieu_CLD').value(data.ChuKy);
        if (data.ChuKy != null && data.ChuKy.length > 0) {
            $('#btnChonTepVB_tailieu_CLD').css({ "display": "none" });
            $('#btnXoaChuKy').css({ "display": "block" });
            $('#list-file-tai-lieu_CLD').css({ "display": "block" });
            let linkVB = data.ChuKy;
            let arrFile = linkVB.split('*');
            for (let p = 0; p < arrFile.length - 1; p++) {
                if (arrFile[p].lastIndexOf('.') != -1) {
                    // file có đuôi .*
                    if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                        arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg"
                    ) {
                        $('#list-file-tai-lieu_CLD').append(`<div class="" style="color: var(--tblr-color-header);">
                                                        <div data-url-file="${arrFile[p].replace('~', '')}" class="xemDinhKemChuKy btn" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}"><i class="fa-solid fa-eye"></i>&nbsp;${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}</div>
                                                    </div>`);
                        $('#btnXoaChuKy').attr('data-url-file', `${arrFile[p]}`);
                    } else {
                        $('#list-file-tai-lieu_CLD').append(`<div class="" style="color: var(--tblr-color-header);">
                                                        <div data-url-file="${arrFile[p].replace('~', '')}" class="xemDinhKemChuKy btn" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}"><i class="fa-solid fa-eye"></i>&nbsp;${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}</div>
                                                    </div>`);
                        $('#btnXoaChuKy').attr('data-url-file', `${arrFile[p]}`);
                    }
                } else {
                    // file không đuôi
                    $('#list-file-tai-lieu_CLD').append(`<div class="" style="color: var(--tblr-color-header);">
                                                        <div data-url-file="${arrFile[p].replace('~', '')}" class="xemDinhKemChuKy btn" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}"><i class="fa-solid fa-eye"></i>&nbsp;${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}</div>
                                                    </div>`);
                    $('#btnXoaChuKy').attr('data-url-file', `${arrFile[p]}`);
                }
            }
        } else {
            $('#btnXoaChuKy').css({ "display": "none" });

        }
    } else {
        $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
        var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBanDau/LoadDuLieu_CungLaoDongBanDauTheoDT', { id: soCCCD });
        if (result.Result != "") {
            var data = result.Result[0];
            if (data.ChuHo == "1") {
                NTS.loadDataCombo({
                    name: '#MoiQuanHeIDDT_CLD_US',
                    ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
                    ajaxParam: { data: ['sua', '12'] },
                    indexValue: 0,
                    indexText: 2,
                    textShowTatCa: '-Chọn-',
                    showTatCa: !0
                });
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
            } else {
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', false);
            }
            $('#MoiQuanHeIDDT_CLD_US').value(data.QuanHeID);
            $('#NgayCapCCCD_us').value(data.NgayCap);
            $('#NoiCapCCCD_us_CLD').value(data.NoiCapID);
            $('#HoVaTenDT_us_CLD').value(data.HoVaTen);
            $('#NgaySinh_us').value(data.NgayThangNamSinh);
            $('#TinhID_NS_us').value(data.NoiSinh);
            $('#GioiTinh_us').value(data.GioiTinhID);
            $('#DanTocID_us').value(data.DanTocID);
            $('#TonGiaoID_us').value(data.TonGiaoID);
            $('#QuocGiaID_us').value(data.QuocTichID);
            $('#TinhID_TT_us').value(data.DiaBanHCID_TinhTT);
            $('#HuyenID_TT_us').value(data.DiaBanHCID_HuyenTT);
            $('#XaID_TT_us').value(data.DiaBanHCID_XaTT);
            $('#ThonID_TT_us').value(data.DiaBanHCID_ThonTT);
            $('#SoNha_TT_us').value(data.SoNhaTT);
            $('#DiaChiThuongTruDT_us_CLD').value(data.DiaChiCuTheTT);
            $('#TinhID_HN_us').value(data.DiaBanHCID_TinhHT);
            $('#HuyenID_HN_us').value(data.DiaBanHCID_HuyenHT);
            $('#XaID_HN_us').value(data.DiaBanHCID_XaHT);
            $('#ThonID_HN_us').value(data.DiaBanHCID_ThonHT);
            $('#SoNha_HN_us').value(data.SoNhaHT);
            $('#DiaChiThuongTruHN_us').value(data.DiaChiCuTheHT);
            $('#DoiTuongID').value(data.ThanhVienHoGDID);
            soCCCDDT = data.SoCCCD;
            $('#TinhID_TT_us').prop('disabled', true);
            $('#HuyenID_TT_us').prop('disabled', true);
            $('#XaID_TT_us').prop('disabled', true);
            $('#ThonID_TT_us').prop('disabled', true);
            $('#SoNha_TT_us').prop('disabled', true);
            $('#DiaChiThuongTruDT_us_CLD').prop('disabled', true);
            if (data.HoGiaDinhID == "00000000-0000-0000-0000-000000000000") {
                $('#SelectChuHo_CLD_US').html(`<li action="chon"><div class="opInfo"><div style="display: flex;justify-content: space-between;align-items: center;">--Chọn hộ gia đình-- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
                $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
                $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
                $('#SelectChuHo_CLD_US').attr('value', "");
            } else {
                var item = `<li style="display: flex"><span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;"><b>${data.HoVaTenChuHo}</b> <b>(${data.MaHoGiaDinh})</b>- Nơi thường trú : <b>${data.NoiThuongTruHGD}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
                $('#SelectChuHo_CLD_US').attr('value', data.HoGiaDinhID);
                $('#SelectChuHo_CLD_US').html(item);
            }

            // Load dữ liệu của thông tin cung lao động 
            $('#DoiTuongUuTienID_us').value(data.DoiTuongUuTienID);
            $('#TenDanToc_us').value(data.TenDanToc);
            $('#LoaiBHXH_us').value(data.ThamGiaBHXHID);
            if (data.BHTN == 1) {
                $('#chkBHTN_us').prop('checked', true);
            } else {
                $('#chkBHTN_us').prop('checked', false);
            }
            if (data.BHYT == 1) {
                $('#chkBHYT_us').prop('checked', true);
            } else {
                $('#chkBHYT_us').prop('checked', false);
            }
            $('#MaSoBHXH_us').value(data.MaBHXH);
            $('#TrinhDoPTID_us').value(data.TrinhDoHVID);
            $('#TrinhDoCMKTID_us').value(data.TrinhDoCMKTID);
            $('#LinhVucDaoTaoID_us').value(data.LinhVucDaoTaoID);
            $('#ChuyenNganhDTID_us').value(data.ChuyenNganhDaoTaoID);
            $('#ViTheViecLamID_us').value(data.ViTheViecLamID);
            $('#CongViecDangLamID_us').value(data.NgheNghiepID);
            $('#ViTriViecLamID_us').value(data.ViTriViecLamID);
            if (data.HopDongLaoDong == "0") {
                $('#chkKhongCoHDLD').prop('checked', true);
            } else {
                $('#chkKhongCoHDLD').prop('checked', false);
            }
            if (data.HopDongLaoDong == "1") {
                $('#chkCoHDLD').prop('checked', true);
            } else {
                $('#chkCoHDLD').prop('checked', false);
            }
            $('#NgayKy').value(data.NgayKyHĐ);
            $('#LoaiHopDongLaoDongID').value(data.LoaiHopDongID);
            $('#NoiLamViec').value(data.TenDNNoiLV);
            if (data.NoiLVNuocNgoai == "0") {
                $('#LamViecTrongNuoc').prop('checked', true);
                $('#LamViecNuocNgoai').prop('checked', false);
                $('.LamViecTrongNuoc').css('display', 'block');
                $('.LamViecONuocNgoai').css('display', 'none');
            } else {
                $('#LamViecNuocNgoai').prop('checked', true);
                $('#LamViecTrongNuoc').prop('checked', false);
                $('.LamViecTrongNuoc').css('display', 'none');
                $('.LamViecONuocNgoai').css('display', 'block');
            }
            $('#TinhID_NLV').value(data.DiaBanHCID_TinhNLV);
            $('#HuyenID_NLV').value(data.DiaBanHCID_HuyenNLV);
            $('#XaID_NLV').value(data.DiaBanHCID_XaNLV);
            $('#ThonID_NLV').value(data.DiaBanHCID_ThonNLV);
            $('#SoNha_NLV').value(data.SoNhaNoiLV);
            $('#LoaiHinhNLVID').value(data.LoaiHinhDNID);
            $('#DiaChiNoiLamViec').value(data.DiaChiCuTheNLV);
            if (data.ThatNghiep == "0") {
                $('#chkChuaBaoGioLamViec').prop('checked', true);
            } else {
                $('#chkChuaBaoGioLamViec').prop('checked', false);
            }
            if (data.ThatNghiep == "1") {
                $('#chkDaTungLamViec').prop('checked', true);
            } else {
                $('#chkDaTungLamViec').prop('checked', false);
            }
            $('#QuocGiaID_us_NLV').value(data.QuocGiaID);
            $('#ThoiGianThatnghiep').value(data.ThoiGianThatNghiepID);
            $('#CongViecTruocKhiThatNghiep').value(data.CongViecTruocTN);
            $('#NguyenNhanKTGHDKTID').value(data.LyDoID);
            $('#NhuCauDaoTaoViecLam').value(data.NhuCauDaoTaoVL);
            $('#NguoiCungCapThongTin').value(data.NguoiCungCapTT);
            if (data.ThatNghiep != "2" || data.ThoiGianThatNghiepID != "00000000-0000-0000-0000-000000000000" || data.CongViecTruocTN != "00000000-0000-0000-0000-000000000000") {
                ResetDoiVoiNguoiCoViecLam();
                ResetDoiVoiNguoiKTGHDKT();
            }
            else if (data.LyDoID != "00000000-0000-0000-0000-000000000000") {
                ResetDoiVoiNguoiCoViecLam();
                ResetDoiVoiNguoiThatNghiep();
            }
            else if (data.ViTheViecLamID != "00000000-0000-0000-0000-000000000000" ||
                data.NgheNghiepID != "00000000-0000-0000-0000-000000000000" ||
                data.ViTriViecLamID != "00000000-0000-0000-0000-000000000000" ||
                data.DiaBanHCID_TinhNLV != "00000000-0000-0000-0000-000000000000" ||
                data.DiaBanHCID_ThonNLV != "00000000-0000-0000-0000-000000000000" ||
                data.DiaBanHCID_XaNLV != "00000000-0000-0000-0000-000000000000" ||
                data.DiaBanHCID_HuyenNLV != "00000000-0000-0000-0000-000000000000" ||
                data.QuocGiaID != "00000000-0000-0000-0000-000000000000" ||
                data.LoaiHinhDNID != "00000000-0000-0000-0000-000000000000" ||
                data.LoaiHopDongID != "00000000-0000-0000-0000-000000000000" ||
                $('#chkCoHDLD').value() != "0" || $('#NgayKy').value() != "" ||
                $('#NoiLamViec').value() != "" || $('#SoNha_NLV').value() != "" || $('#DiaChiNoiLamViec').value() != ""
            ) {
                ResetDoiVoiNguoiThatNghiep();
                ResetDoiVoiNguoiKTGHDKT();
            }
            //Lưu các giá trị load dữ liệu ra vào mảng để kiểm tra 
            // Thêm giá trị vào mảng sau khi kiểm tra và thay thế
            mangGiaTriDau.push(replaceNullAndEmptyString(data.QuanHeID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayCap));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiCapID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.HoVaTen.toUpperCase()));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayThangNamSinh));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiSinh));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.GioiTinhID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DanTocID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.TonGiaoID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.QuocTichID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.HoGiaDinhID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoCCCD));
            var listFiles_VanBan_US = [];
            $('#txtDinhKem_VanBan_USDT').val(data.DinhKem);
            if (data.DinhKem == '' || data.DinhKem == null) {
                ResetDinhKemFile();
            }
            else {
                for (var i = 0; i < data.DinhKem.split('*').length; i++) {
                    if (data.DinhKem.split('*')[i] == '') {
                        continue;
                    }
                    listFiles_VanBan_US.push(data.DinhKem.split('*')[i].split('/')[data.DinhKem.split('*')[i].split('/').length - 1].replaceAll('*', '').toString());
                }
                $('#HoSoKemTheo_USDangKy').ace_file_input('show_file_list', listFiles_VanBan_US);
                var ItemImg = $(".ace-icon.fa.fa-picture-o.file-image");
                //code chuyen doi chuoi dinh kem thanh array
                if (data.DinhKem != null && data.DinhKem.length > 0) {
                    var linkVB = data.DinhKem;
                    var arrFile = linkVB.split('*');

                    for (var i = 0; i < arrFile.length; i++) {
                        if (arrFile[i] != "") {
                            $(ItemImg[i]).attr("ace-img-url", arrFile[i]);
                        }
                    }
                }
                else {
                    NTS.canhbao('Không có file đính kèm!');
                }
                //end code
                //Gắn sự kiện xem hình ảnh
                $(".ace-icon.fa.fa-picture-o.file-image").addClass("XemDinhKemHinhAnh_USDangKy");
                //Gắn thêm dấu x xóa từng file
                $('.ace-file-container.hide-placeholder .ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKemDT XoaFileDinhKemDT btn-del-item img-db"  onclick="return false"></i>');
            }
            // File đính kèm chữ ký
            $('#list-file-tai-lieu_CLD').html('');
            $('#txtDuongDanFileVB_tailieu_CLD').value(data.ChuKy);
            if (data.ChuKy != null && data.ChuKy.length > 0) {
                $('#btnChonTepVB_tailieu_CLD').css({ "display": "none" });
                $('#btnXoaChuKy').css({ "display": "block" });
                $('#list-file-tai-lieu_CLD').css({ "display": "block" });
                let linkVB = data.ChuKy;
                let arrFile = linkVB.split('*');
                for (let p = 0; p < arrFile.length - 1; p++) {
                    if (arrFile[p].lastIndexOf('.') != -1) {
                        // file có đuôi .*
                        if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg"
                        ) {
                            $('#list-file-tai-lieu_CLD').append(`<div class="" style="color: var(--tblr-color-header);">
                                                        <div data-url-file="${arrFile[p].replace('~', '')}" class="xemDinhKemChuKy btn" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}"><i class="fa-solid fa-eye"></i>&nbsp;${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}</div>
                                                    </div>`);
                            $('#btnXoaChuKy').attr('data-url-file', `${arrFile[p]}`);
                        } else {
                            $('#list-file-tai-lieu_CLD').append(`<div class="" style="color: var(--tblr-color-header);">
                                                        <div data-url-file="${arrFile[p].replace('~', '')}" class="xemDinhKemChuKy btn" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}"><i class="fa-solid fa-eye"></i>&nbsp;${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}</div>
                                                    </div>`);
                            $('#btnXoaChuKy').attr('data-url-file', `${arrFile[p]}`);
                        }
                    } else {
                        // file không đuôi
                        $('#list-file-tai-lieu_CLD').append(`<div class="" style="color: var(--tblr-color-header);">
                                                        <div data-url-file="${arrFile[p].replace('~', '')}" class="xemDinhKemChuKy btn" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}"><i class="fa-solid fa-eye"></i>&nbsp;${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}</div>
                                                    </div>`);
                        $('#btnXoaChuKy').attr('data-url-file', `${arrFile[p]}`);
                    }
                }
            } else {
                $('#btnXoaChuKy').css({ "display": "none" });

            }
        } else {
            ResetTTThanhVienCLD();
            $('#SelectChuHo_CLD_US').value('');
            $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
            $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
            $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
            $('#TinhID_TT_us').prop('disabled', false);
            $('#HuyenID_TT_us').prop('disabled', false);
            $('#XaID_TT_us').prop('disabled', false);
            $('#ThonID_TT_us').prop('disabled', false);
            $('#SoNha_TT_us').prop('disabled', false);
            $('#DiaChiThuongTruDT_us_CLD').prop('disabled', false);
            ResetInputRong();
            var item = `<li action="chon"><div class="opInfo"><div style="display: flex;justify-content: space-between;align-items: center;">--Chọn hộ gia đình-- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`;
            $('.btn-select').html(item);
            $('#SoCMND_us').value(soCCCD);
            var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBanDau/LoadDuLieuThanhVienBySoCCCD', { soCCCD: soCCCD });
            if (result.Result != "") {
                var data = result.Result[0];
                if (data.ChuHo == "1") {
                    NTS.loadDataCombo({
                        name: '#MoiQuanHeIDDT_CLD_US',
                        ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
                        ajaxParam: { data: ['sua', '12'] },
                        indexValue: 0,
                        indexText: 2,
                        textShowTatCa: '-Chọn-',
                        showTatCa: !0
                    });
                    $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
                } else {
                    $('#MoiQuanHeIDDT_CLD_US').prop('disabled', false);
                }
                $('#MoiQuanHeIDDT_CLD_US').value(data.QuanHeID);
                $('#NgayCapCCCD_us').value(data.NgayCap);
                $('#NoiCapCCCD_us_CLD').value(data.NoiCapID);
                $('#HoVaTenDT_us_CLD').value(data.HoVaTen);
                $('#NgaySinh_us').value(data.NgayThangNamSinh);
                $('#TinhID_NS_us').value(data.NoiSinh);
                $('#GioiTinh_us').value(data.GioiTinhID);
                $('#DanTocID_us').value(data.DanTocID);
                $('#TonGiaoID_us').value(data.TonGiaoID);
                $('#QuocGiaID_us').value(data.QuocTichID);
                $('#TinhID_TT_us').value(data.DiaBanHCID_TinhTT);
                $('#HuyenID_TT_us').value(data.DiaBanHCID_HuyenTT);
                $('#XaID_TT_us').value(data.DiaBanHCID_XaTT);
                $('#ThonID_TT_us').value(data.DiaBanHCID_ThonTT);
                $('#SoNha_TT_us').value(data.SoNhaTT);
                $('#DiaChiThuongTruDT_us_CLD').value(data.DiaChiCuTheTT);
                $('#TinhID_HN_us').value(data.DiaBanHCID_TinhHT);
                $('#HuyenID_HN_us').value(data.DiaBanHCID_HuyenHT);
                $('#XaID_HN_us').value(data.DiaBanHCID_XaHT);
                $('#ThonID_HN_us').value(data.DiaBanHCID_ThonHT);
                $('#SoNha_HN_us').value(data.SoNhaHT);
                $('#DiaChiThuongTruHN_us').value(data.DiaChiCuTheHT);
                $('#DoiTuongID').value(data.ThanhVienHoGDID);
                soCCCDDT = data.SoCCCD;
                $('#TinhID_TT_us').prop('disabled', true);
                $('#HuyenID_TT_us').prop('disabled', true);
                $('#XaID_TT_us').prop('disabled', true);
                $('#ThonID_TT_us').prop('disabled', true);
                $('#SoNha_TT_us').prop('disabled', true);
                $('#DiaChiThuongTruDT_us_CLD').prop('disabled', true);
                if (data.HoGiaDinhID == "00000000-0000-0000-0000-000000000000") {
                    $('#SelectChuHo_CLD_US').html(`<li action="chon"><div class="opInfo"><div style="display: flex;justify-content: space-between;align-items: center;">--Chọn hộ gia đình-- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);
                    $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
                    $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
                    $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
                    $('#SelectChuHo_CLD_US').attr('value', "");
                } else {
                    var item = `<li style="display: flex"><span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;"><b>${data.HoVaTenChuHo}</b> <b>(${data.MaHoGiaDinh})</b>- Nơi thường trú : <b>${data.DiaChiCuTheHGD}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
                    $('#SelectChuHo_CLD_US').attr('value', data.HoGiaDinhID);
                    $('#SelectChuHo_CLD_US').html(item);
                }
                //Lưu các giá trị load dữ liệu ra vào mảng để kiểm tra 
                // Thêm giá trị vào mảng sau khi kiểm tra và thay thế
                mangGiaTriDau.push(replaceNullAndEmptyString(data.QuanHeID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayCap));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiCapID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.HoVaTen.toUpperCase()));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayThangNamSinh));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiSinh));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.GioiTinhID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DanTocID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.TonGiaoID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.QuocTichID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhTT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenTT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaTT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonTT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaTT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheTT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhHT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenHT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaHT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonHT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaHT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheHT));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.HoGiaDinhID));
                mangGiaTriDau.push(replaceNullAndEmptyString(data.SoCCCD));
            }
            ResetDinhKemFile();
            NTS.canhbao("Số CMND/CCCD/Số định danh chưa được thu thập ban đầu!");
            return false;
        }
    }
}


$(document).on('blur', '#SoCMND_us', function () {
    var soCCCD = $(this).value();
    // nếu là thu thap ban đầu thì biến động bang false
    if (bienDong == false) {
        LoadThanhVienHoGiaDinh(soCCCD);
    } else {
        // Khi thu thập biến động thì load cách thông tin của đối tượng đã thu thập ban đầu lên
        LoadDoiTuongThuThapBanDau(soCCCD);
    }
});

$(document).on('change', '#SoCMND_us', function () {
    mangGiaTriDau = [];
    mangGiaTriSau = [];
});

//---------------------------------Thêm mới thông tin thu thập cung lao động ban đầu ---------------------------------
$(document).on('click', '#btnThemMoiBanDau', function () {
    //chuyển trạng thái về ban đầu khi thu thập ban đầu
    $('#countrydata').html('');
    $('#lblTieuDeThemMoiThuThapCung').text('Thêm mới thu thập Cung lao động biến động');
    $('#LoaiBienDongID').prop('required', false);
    $('#lblLoaiBienDongID').removeClass('validation');
    $('#txtDuongDanFileVB_tailieu_CLD').val('');
    $('#btnChonTepVB_tailieu_CLD').css({ "display": "block" });
    $('#btnXoaChuKy').css({ "display": "none" });
    $('#btnXoaChuKy').attr({ "data-url-file": "" });
    $('#list-file-tai-lieu_CLD').html('');
    $('#list-file-tai-lieu_CLD').css({ "display": "none" });
    bienDong = false;
    $('#form_BienDong').css({ "display": 'none' });
    getLocation();
    if (GridDoiTuong_List.getSelectedRows().length == 0) {
        NTS.canhbao("Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!");
        return false;
    }
    //showModalThemMoiThuThap('them', '12', $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
    if (GridDoiTuong_List.getSelectedRows().length > 0) {
        var ID = $('#btnSua2').attr("data");
        $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
        var result = NTS.getAjax('/DanhMuc/DoiTuongCaNhan/LoadDuLieuThanhVienByID', { id: ID });
        if (result.Result != "") {
            var data = result.Result[0];
            if (data.ChuHo == "1") {
                NTS.loadDataCombo({
                    name: '#MoiQuanHeIDDT_CLD_US',
                    ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
                    ajaxParam: { data: ['sua', '12'] },
                    indexValue: 0,
                    indexText: 2,
                    textShowTatCa: '-Chọn-',
                    showTatCa: !0
                });
                showModalThemMoiThuThapDT($('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
            } else {
                NTS.loadDataCombo({
                    name: '#MoiQuanHeIDDT_CLD_US',
                    ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
                    ajaxParam: { data: ['them', '12'] },
                    indexValue: 0,
                    indexText: 2,
                    textShowTatCa: '-Chọn-',
                    showTatCa: !0
                });
                showModalThemMoiThuThapDT($('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', false);
            }
            $('#MoiQuanHeIDDT_CLD_US').value(data.QuanHeID);
            $('#SoCMND_us').value(data.SoCCCD);
            $('#NgayCapCCCD_us').value(data.NgayCap);
            $('#NoiCapCCCD_us_CLD').value(data.NoiCapID);
            $('#HoVaTenDT_us_CLD').value(data.HoVaTen);
            $('#NgaySinh_us').value(data.NgayThangNamSinh);
            $('#TinhID_NS_us').value(data.NoiSinh);
            $('#GioiTinh_us').value(data.GioiTinhID);
            $('#DanTocID_us').value(data.DanTocID);
            $('#TonGiaoID_us').value(data.TonGiaoID);
            $('#QuocGiaID_us').value(data.QuocTichID);
            $('#TinhID_TT_us').value(data.DiaBanHCID_TinhTT);
            $('#HuyenID_TT_us').value(data.DiaBanHCID_HuyenTT);
            $('#XaID_TT_us').value(data.DiaBanHCID_XaTT);
            $('#ThonID_TT_us').value(data.DiaBanHCID_ThonTT);
            $('#SoNha_TT_us').value(data.SoNhaTT);
            $('#DiaChiThuongTruDT_us_CLD').value(data.DiaChiCuTheTT);
            $('#TinhID_HN_us').value(data.DiaBanHCID_TinhHT);
            $('#HuyenID_HN_us').value(data.DiaBanHCID_HuyenHT);
            $('#XaID_HN_us').value(data.DiaBanHCID_XaHT);
            $('#ThonID_HN_us').value(data.DiaBanHCID_ThonHT);
            $('#SoNha_HN_us').value(data.SoNhaHT);
            $('#DiaChiThuongTruHN_us').value(data.DiaChiCuTheHT);
            $('#DoiTuongID').value(data.ThanhVienHoGDID);
            soCCCDDT = data.SoCCCD;
            $('#TinhID_TT_us').prop('disabled', true);
            $('#HuyenID_TT_us').prop('disabled', true);
            $('#XaID_TT_us').prop('disabled', true);
            $('#ThonID_TT_us').prop('disabled', true);
            $('#SoNha_TT_us').prop('disabled', true);
            $('#DiaChiThuongTruDT_us_CLD').prop('disabled', true);
            if (data.HoGiaDinhID == "00000000-0000-0000-0000-000000000000") {
                $('#SelectChuHo_CLD_US').html(`<li action="chon"><div class="opInfo"><div style="display: flex;justify-content: space-between;align-items: center;">--Chọn hộ gia đình-- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
                $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
                $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
                $('#SelectChuHo_CLD_US').attr('value', "");
            } else {
                var item = `<li style="display: flex"><span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;"><b>${data.HoVaTenChuHo}</b> <b>(${data.MaHoGiaDinh})</b>- Nơi thường trú : <b>${data.DiaChiCuTheHGD}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
                $('#SelectChuHo_CLD_US').attr('value', data.HoGiaDinhID);
                $('#SelectChuHo_CLD_US').html(item);
            }
            //Lưu các giá trị load dữ liệu ra vào mảng để kiểm tra 
            // Thêm giá trị vào mảng sau khi kiểm tra và thay thế
            mangGiaTriDau.push(replaceNullAndEmptyString(data.QuanHeID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayCap));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiCapID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.HoVaTen.toUpperCase()));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayThangNamSinh));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiSinh));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.GioiTinhID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DanTocID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.TonGiaoID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.QuocTichID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.HoGiaDinhID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoCCCD));
        } 
    } else {
        showModalThemMoiThuThap('them', '12', $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
    }
});

function showModalThemMoiThuThapDT(TinhID, HuyenID, XaID, ThonID, TuKhoa) {
    $('#SelectChuHo_CLD_US').html(`<li action="chon"><div class="opInfo"><div style="display: flex;justify-content: space-between;align-items: center;">--Chọn hộ gia đình-- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);
    $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
    $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
    $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
    $('#SelectChuHo_CLD_US').attr('value', "");
    $('#SoCMND_us_list').html('');
    $('#TinhID_TT_us').prop('disabled', false);
    $('#HuyenID_TT_us').prop('disabled', false);
    $('#XaID_TT_us').prop('disabled', false);
    $('#ThonID_TT_us').prop('disabled', false);
    $('#SoNha_TT_us').prop('disabled', false);
    $('#DiaChiThuongTruDT_us_CLD').prop('disabled', false);
    $('.LamViecTrongNuoc').css('display', 'block');
    $('.LamViecONuocNgoai').css('display', 'none');
    $('#txtDinhKem_VanBan_US').val('');
    ResetDinhKemFile();
    /* $('.ace-file-container').html('');*/
    // Kiểm tra điều kiện quản lý theo hộ gia đình
    var Data = NTS.getAjax("/HeThong/ThietLapCauHinhHeThong/LayDuLieu", {})[0];
    if (Data.RangBuocHoGiaDinh == 1) {
        $('#HoGiaDinhID_ChuHo_CLD').prop('required', true);
        $('#lbHoGiaDinhID_ChuHo_CLD').addClass('validation');
        $('#MoiQuanHeIDDT_CLD_US').prop("disabled", false);
        $('#MoiQuanHeIDDT_CLD_US').prop('required', true);
        $('#lbMoiQuanHeIDDT_CLD_us').addClass('validation');
    } else {
        $('#HoGiaDinhID_ChuHo_CLD').prop('required', false);
        $('#lbHoGiaDinhID_ChuHo_CLD').removeClass('validation');
        $('#MoiQuanHeIDDT_CLD_US').prop("disabled", true);
        $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
        $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
    }

    // Load combo hộ gia đình
    LoadComBoHoGiaDinhCLD(TinhID, HuyenID, XaID, ThonID, TuKhoa);

    $('#lblTieuDeThemMoiThuThapCung').text('Thêm mới thu thập Cung lao động ban đầu');
    $('#mdThemMoiCungLaoDongBanDau').modal('show');
    resetForm("#mdThemMoiCungLaoDongBanDau");
    $('#ThoiGianThatnghiep').prop("disabled", true);
    $('#LamViecTrongNuoc').prop("checked", true);
    $('#chkKhongCoHDLD').prop("checked", true);
    $('#CongViecTruocKhiThatNghiep').prop("disabled", true);
    $('#NgayKy').prop("disabled", true);
    NTS.hienNgayHienTaiLenTextbox("NgayThuThap");
    ////// Chọn phần tử thứ 2 trong select

    $('#GioiTinh_us option:eq(1)').prop('selected', true);
    $('#GioiTinh_us').trigger('change');

    $('#QuocGiaID_us option:eq(1)').prop('selected', true);
    $('#QuocGiaID_us').trigger('change');

    $('#DanTocID_us option:eq(1)').prop('selected', true);
    $('#DanTocID_us').trigger('change');

    $('#TonGiaoID_us option:eq(1)').prop('selected', true);
    $('#TonGiaoID_us').trigger('change');

    $('#NoiCapCCCD_us_CLD option:eq(1)').prop('selected', true);
    $('#NoiCapCCCD_us_CLD').trigger('change');

    //$('#TrangThai').value(true);
    //UpdateLabelDangSD('#TrangThai');
    tempthem = 'them';

    // Gán mặc định tỉnh, huyện, xã của địa chỉ thường trú theo tỉnh, huyện, xã theo đơn vị đăng nhập
    try {
        var DonVi = NTS.getAjax('/DanhMuc/DungChung/GetThongTinDonViThaoTac', {});
        DonVi = DonVi.Result;
        if (DonVi != undefined && !$.isEmptyObject(DonVi) && DonVi != '' && DonVi != null) {
            $('#TinhID_TT_us').value(DonVi[0].DiaBanHCID_Tinh);
            $('#TinhID_NS_us').value(DonVi[0].DiaBanHCID_Tinh);
            $('#HuyenID_TT_us').value(DonVi[0].DiaBanHCID_Huyen);
            $('#XaID_TT_us').value(DonVi[0].DiaBanHCID_Xa);
        }
    } catch (e) {

    }
    // Lấy giá trị của thuộc tính CSS "display" của phần tử có class ".OptionDoiTuongCLD"
    var displayValue = $(".OptionDoiTuongCLD").css("display");

    // Kiểm tra giá trị và thực hiện hành động tương ứng
    if (displayValue === "none") {
        // Phần tử có class ".OptionDoiTuongCLD" đang ẩn (display: none)
    } else if (displayValue === "block") {
        // Phần tử có class ".OptionDoiTuongCLD" đang hiển thị (display: block)
        $(".OptionDoiTuongCLD").toggle();
    } else {
        // Trường hợp khác, ví dụ như display: inline, inline-block, ...
    }
    //$($('#ListDataDoiTuongThuThapCung li')).css('display', 'none');
    $("#ListDataDoiTuongThuThapCung li").slice(0, $('#ListDataDoiTuongThuThapCung li').length - 1).css("display", "none");
    $("#ListDataDoiTuongThuThapCung li").slice(0, soLuongHienThi_HoGiaDinh + 2).css("display", "flex");//+2 do phải thêm nút chọn và nút xem thêm, nếu không +2 thì sẽ load ra thiếu (ví dụ muốn load 10 thì phải là 10 + 2 nếu ko sẽ ra 8)

    return false;
}


$(document).on('click', '#btnLuuVaDongCLD', function () {
    const validate = new NTSValidate('#mdThemMoiCungLaoDongBanDau');
    if (!validate.trim().check()) {
        return false;
    }
    if (!validate.trim().checkSpecial()) {
        return false;
    }

    //Kiểm tra năm sinh và năm được cấp số CCCD
    var ngaySinh = new Date($('#NgaySinh_us').val()).getFullYear();
    var ngayCapCCCD = new Date($('#NgayCapCCCD_us').val()).getFullYear();

    if (ngaySinh >= ngayCapCCCD) {
        NTS.canhbao("Năm sinh không được lớn hơn năm cấp Số CMND/CCCD/Số định danh cá nhân!");
        return false;
    }

    if (!checkAge($('#NgaySinh_us').value())) {
        // Ngày sinh không đủ 15 tuổi
        NTS.canhbao("Ngày sinh không được nhỏ hơn 15 tuổi!");
        return false;
    }

    if ($('#SoCMND_us').val().length !== 12 && $('#SoCMND_us').val().length !== 9) {
        NTS.canhbao("Số CMND/CCCD/Số định danh cá nhân chưa đúng định dạng!");
        return false;
    }

    //Lưu các giá trị trên form vào mảng để kiểm tra 
    mangGiaTriSau.push($('#MoiQuanHeIDDT_CLD_US').value());
    mangGiaTriSau.push($('#NgayCapCCCD_us').value());
    mangGiaTriSau.push($('#NoiCapCCCD_us_CLD').value());
    mangGiaTriSau.push($('#HoVaTenDT_us_CLD').value().toUpperCase());
    mangGiaTriSau.push($('#NgaySinh_us').value());
    mangGiaTriSau.push($('#TinhID_NS_us').value());
    mangGiaTriSau.push($('#GioiTinh_us').value());
    mangGiaTriSau.push($('#DanTocID_us').value());
    mangGiaTriSau.push($('#TonGiaoID_us').value());
    mangGiaTriSau.push($('#QuocGiaID_us').value());
    mangGiaTriSau.push($('#TinhID_TT_us').value());
    mangGiaTriSau.push($('#HuyenID_TT_us').value());
    mangGiaTriSau.push($('#XaID_TT_us').value());
    mangGiaTriSau.push($('#ThonID_TT_us').value());
    mangGiaTriSau.push($('#SoNha_TT_us').value());
    mangGiaTriSau.push($('#DiaChiThuongTruDT_us_CLD').value());
    mangGiaTriSau.push($('#TinhID_HN_us').value());
    mangGiaTriSau.push($('#HuyenID_HN_us').value());
    mangGiaTriSau.push($('#XaID_HN_us').value());
    mangGiaTriSau.push($('#ThonID_HN_us').value());
    mangGiaTriSau.push($('#SoNha_HN_us').value());
    mangGiaTriSau.push($('#DiaChiThuongTruHN_us').value());
    mangGiaTriSau.push($('#SelectChuHo_CLD_US').attr('value'));
    mangGiaTriSau.push($('#SoCMND_us').value());

    if (bienDong == false) { // Lưu cho thu thập cung lao động ban đầu

        if (mangGiaTriSau.length > 0 && mangGiaTriDau.length > 0) {
            var different = false; // không có khác nhau về thông tin trên modal thi thập với thông tin thành viên
            for (var i = 0; i < mangGiaTriDau.length; i++) {
                if (mangGiaTriDau[i] !== mangGiaTriSau[i]) {
                    different = true; // không có khác nhau về thông tin trên modal thi thập với thông tin thành viên
                    break;
                }
            }
            if (different) { // có thay đổi dữ liệu của thông tin đối tượng
                tempthemDT = 'sua'; // đối tượng
                var saveData = [];
                saveData[0] = tempthem;
                saveData[1] = $('#ThuThapCungLDID').value();
                saveData[2] = $('#NgayThuThap').value();
                saveData[3] = $('#DoiTuongUuTienID_us').value();
                saveData[4] = $('#TenDanToc_us').value();
                saveData[5] = $('#LoaiBHXH_us').value();
                saveData[6] = $('#chkBHYT_us').value();
                saveData[7] = $('#chkBHTN_us').value();
                saveData[8] = $('#MaSoBHXH_us').value();
                saveData[9] = $('#TinhID_TT_us').value();
                saveData[10] = $('#HuyenID_TT_us').value();
                saveData[11] = $('#XaID_TT_us').value();
                saveData[12] = $('#ThonID_TT_us').value();
                saveData[13] = $('#SoNha_TT_us').value();
                saveData[14] = $('#DiaChiThuongTruDT_us_CLD').value();
                saveData[15] = $('#TinhID_HN_us').value();
                saveData[16] = $('#HuyenID_HN_us').value();
                saveData[17] = $('#XaID_HN_us').value();
                saveData[18] = $('#ThonID_HN_us').value();
                saveData[19] = $('#SoNha_HN_us').value();
                saveData[20] = $('#DiaChiThuongTruHN_us').value();
                saveData[21] = $('#HoSoKemTheo_USDangKy').value();// đính kèm
                saveData[22] = $('#TrinhDoPTID_us').value();
                saveData[23] = $('#TrinhDoCMKTID_us').value();
                saveData[24] = $('#LinhVucDaoTaoID_us').value();
                saveData[25] = $('#ChuyenNganhDTID_us').value();
                saveData[26] = $('#ViTheViecLamID_us').value();
                saveData[27] = $('#CongViecDangLamID_us').value();
                saveData[28] = $('#ViTriViecLamID_us').value();
                if ($('#chkKhongCoHDLD').value() == true) {
                    saveData[29] = "0"; // Tình trạng ký hợp đồng lao động (0: Không ký HĐLĐ; 1: Có ký HĐLĐ
                } else if ($('#chkCoHDLD').value() == true) {
                    saveData[29] = "1";
                } else {
                    saveData[29] = "0";
                }
                saveData[30] = $('#NgayKy').value();
                saveData[31] = $('#LoaiHopDongLaoDongID').value();
                saveData[32] = $('#NoiLamViec').value();
                if ($('#LamViecTrongNuoc').value() == true) {
                    saveData[33] = "0";
                } else if ($('#LamViecNuocNgoai').value() == true) { // 0: làm việc trong nước; 1: làm việc ngoài nước
                    saveData[33] = "1";
                } else {
                    saveData[33] = "0";
                }
                saveData[34] = $('#TinhID_NLV').value();
                saveData[35] = $('#HuyenID_NLV').value();
                saveData[36] = $('#XaID_NLV').value();
                saveData[37] = $('#ThonID_NLV').value();
                saveData[38] = $('#SoNha_NLV').value();
                saveData[39] = $('#LoaiHinhNLVID').value();
                saveData[40] = $('#QuocGiaID_us_NLV').value();
                saveData[41] = $('#DiaChiNoiLamViec').value();
                if ($('#chkChuaBaoGioLamViec').value() == true) {
                    saveData[42] = "0";
                } else if ($('#chkDaTungLamViec').value() == true) {
                    saveData[42] = "1";
                } else {
                    saveData[42] = "2";
                }
                saveData[43] = $('#ThoiGianThatnghiep').value();
                saveData[44] = $('#CongViecTruocKhiThatNghiep').value();
                saveData[45] = $('#NguyenNhanKTGHDKTID').value();
                saveData[46] = $('#NhuCauDaoTaoViecLam').value();
                saveData[47] = $('#NguoiCungCapThongTin').value();
                saveData[48] = $('#SelectChuHo_CLD_US').attr('value');
                saveData[49] = $('#DoiTuongID').value();
                saveData[50] = $('#SoCMND_us').value();
                saveData[51] = tempthemDT;
                saveData[52] = $('#DoiTuongID').attr('value');
                saveData[53] = $('#SelectChuHo_CLD_US').attr('value');
                saveData[54] = soCCCDDT;
                saveData[55] = $('#HoVaTenDT_us_CLD').value();
                saveData[56] = $('#KinhDoCungLaoDong').value();
                saveData[57] = $('#ViDoCungLaoDong').value();
                var duongDan = ''; //Đính kèm chữ ký
                duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file');
                if (typeof duongDan != "undefined") {
                    duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file') + '*'
                } else {
                    duongDan = '';
                }
                saveData[58] = duongDan;

                var saveDataDT = [];
                saveDataDT[0] = tempthemDT;
                saveDataDT[1] = $('#DoiTuongID').value();
                saveDataDT[2] = $('#SelectChuHo_CLD_US').attr('value');
                saveDataDT[3] = $('#MoiQuanHeIDDT_CLD_US').value();
                saveDataDT[4] = $('#HoVaTenDT_us_CLD').value();
                saveDataDT[5] = $('#GioiTinh_us').value();
                saveDataDT[6] = $('#NgaySinh_us').value();
                saveDataDT[7] = $('#TinhID_NS_us').value();
                saveDataDT[8] = $('#DanTocID_us').value();
                saveDataDT[9] = $('#TonGiaoID_us').value();
                saveDataDT[10] = $('#QuocGiaID_us').value();
                saveDataDT[11] = $('#SoCMND_us').value();
                saveDataDT[12] = $('#NgayCapCCCD_us').value();
                saveDataDT[13] = $('#NoiCapCCCD_us_CLD').value();
                saveDataDT[14] = $('#SoNha_TT_us').value();
                saveDataDT[15] = $('#ThonID_TT_us').value();
                saveDataDT[16] = $('#XaID_TT_us').value();
                saveDataDT[17] = $('#HuyenID_TT_us').value();
                saveDataDT[18] = $('#TinhID_TT_us').value();
                saveDataDT[19] = $('#DiaChiThuongTruDT_us_CLD').value();
                saveDataDT[20] = $('#ThonID_HN_us').value();
                saveDataDT[21] = $('#XaID_HN_us').value();
                saveDataDT[22] = $('#HuyenID_HN_us').value();
                saveDataDT[23] = $('#TinhID_HN_us').value();
                saveDataDT[24] = $('#SoNha_HN_us').value();
                saveDataDT[25] = $('#DiaChiThuongTruHN_us').value();
                saveDataDT[26] = soCCCDDT;
                var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBanDau/LuuThongTin', { data: saveData });
                if (!result.Err || !resultDT.Err) {
                    if (result.Logs == "1") {
                        NTS.canhbao(result.Msg);
                        return false;
                    } else if (result.Logs == "2") {
                        CanhBaoCapNhatDoiTuong(() => {
                            saveData[51] = "them";
                            var result2 = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBanDau/LuuThongTin', { data: saveData });
                            var resultDT = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBanDau/LuuThongTinDoiTuong', { data: saveDataDT });
                            if (!result2.Err || !resultDT.Err) {
                                LoadDataTable();
                                LoadDataTableCungLD_TabQuaTrinh($('#ThanhVienHoGDID').value());
                                //LoadDataTable_ListTab2();
                                NTS.thanhcong(result2.Msg);
                                $('#mdThemMoiCungLaoDongBanDau').modal('hide');
                                soCCCDDT = "";
                                mangGiaTriDau = [];
                                mangGiaTriSau = [];
                            }
                        }, () => { mangGiaTriSau = []; }, result.Msg);
                    } else {
                        LoadDataTable();
                        LoadDataTableCungLD_TabQuaTrinh($('#ThanhVienHoGDID').value());
                        //LoadDataTable_ListTab2();
                        NTS.thanhcong(result.Msg);
                        $('#mdThemMoiCungLaoDongBanDau').modal('hide');
                        soCCCDDT = "";
                        return false;
                    }
                } else {
                    result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
                }
                return false;
            } else if (!different) {

                ////Xử lý lưu đính kèm
                //var dinhKem = '';
                //var dinhKem = $('.ace-file-container .ace-file-name').map(function () {
                //    return $(this).data('title');
                //}).get();
                var saveData = [];
                tempthemDT = 'them'; // đối tượng
                saveData[0] = tempthem;
                saveData[1] = $('#ThuThapCungLDID').value();
                saveData[2] = $('#NgayThuThap').value();
                saveData[3] = $('#DoiTuongUuTienID_us').value();
                saveData[4] = $('#TenDanToc_us').value();
                saveData[5] = $('#LoaiBHXH_us').value();
                saveData[6] = $('#chkBHYT_us').value();
                saveData[7] = $('#chkBHTN_us').value();
                saveData[8] = $('#MaSoBHXH_us').value();
                saveData[9] = $('#TinhID_TT_us').value();
                saveData[10] = $('#HuyenID_TT_us').value();
                saveData[11] = $('#XaID_TT_us').value();
                saveData[12] = $('#ThonID_TT_us').value();
                saveData[13] = $('#SoNha_TT_us').value();
                saveData[14] = $('#DiaChiThuongTruDT_us_CLD').value();
                saveData[15] = $('#TinhID_HN_us').value();
                saveData[16] = $('#HuyenID_HN_us').value();
                saveData[17] = $('#XaID_HN_us').value();
                saveData[18] = $('#ThonID_HN_us').value();
                saveData[19] = $('#SoNha_HN_us').value();
                saveData[20] = $('#DiaChiThuongTruHN_us').value();

                if (tempthem == 'them') {
                    var data = uploadfileEvent({
                        name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                        loaiVB: 'VB',
                    });
                    if (data.length > 0) {
                        $('#txtDinhKem_VanBan_USDT').value(data);
                        NTS.dongthongbao();
                    }
                }
                else {
                    //if (newFile_usDangKy == true) {
                    var data = uploadfileEvent({
                        name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                        loaiVB: 'VB',
                    });
                    if (data.length > 0) {
                        $('#txtDinhKem_VanBan_USDT').value(data);
                        NTS.dongthongbao();
                    }
                    //}
                }

                saveData[21] = $('#txtDinhKem_VanBan_USDT').value();// đính kèm
                saveData[22] = $('#TrinhDoPTID_us').value();
                saveData[23] = $('#TrinhDoCMKTID_us').value();
                saveData[24] = $('#LinhVucDaoTaoID_us').value();
                saveData[25] = $('#ChuyenNganhDTID_us').value();
                saveData[26] = $('#ViTheViecLamID_us').value();
                saveData[27] = $('#CongViecDangLamID_us').value();
                saveData[28] = $('#ViTriViecLamID_us').value();
                if ($('#chkKhongCoHDLD').value() == true) {
                    saveData[29] = "0"; // Tình trạng ký hợp đồng lao động (0: Không ký HĐLĐ; 1: Có ký HĐLĐ
                } else if ($('#chkCoHDLD').value() == true) {
                    saveData[29] = "1";
                } else {
                    saveData[29] = "0";
                }
                saveData[30] = $('#NgayKy').value();
                saveData[31] = $('#LoaiHopDongLaoDongID').value();
                saveData[32] = $('#NoiLamViec').value();
                if ($('#LamViecTrongNuoc').value() == true) {
                    saveData[33] = "0";
                } else if ($('#LamViecNuocNgoai').value() == true) { // 0: làm việc trong nước; 1: làm việc ngoài nước
                    saveData[33] = "1";
                } else {
                    saveData[33] = "0";
                }
                saveData[34] = $('#TinhID_NLV').value();
                saveData[35] = $('#HuyenID_NLV').value();
                saveData[36] = $('#XaID_NLV').value();
                saveData[37] = $('#ThonID_NLV').value();
                saveData[38] = $('#SoNha_NLV').value();
                saveData[39] = $('#LoaiHinhNLVID').value();
                saveData[40] = $('#QuocGiaID_us_NLV').value();
                saveData[41] = $('#DiaChiNoiLamViec').value();
                if ($('#chkChuaBaoGioLamViec').value() == true) {
                    saveData[42] = "0";
                } else if ($('#chkDaTungLamViec').value() == true) {
                    saveData[42] = "1";
                } else {
                    saveData[42] = "2";
                }
                saveData[43] = $('#ThoiGianThatnghiep').value();
                saveData[44] = $('#CongViecTruocKhiThatNghiep').value();
                saveData[45] = $('#NguyenNhanKTGHDKTID').value();
                saveData[46] = $('#NhuCauDaoTaoViecLam').value();
                saveData[47] = $('#NguoiCungCapThongTin').value();
                saveData[48] = $('#SelectChuHo_CLD_US').attr('value');
                saveData[49] = $('#DoiTuongID').value();
                saveData[50] = $('#SoCMND_us').value();
                saveData[51] = tempthemDT;
                saveData[52] = $('#DoiTuongID').value();
                saveData[53] = $('#SelectChuHo_CLD_US').attr('value');
                saveData[54] = soCCCDDT;
                saveData[55] = $('#HoVaTenDT_us_CLD').value();
                saveData[56] = $('#KinhDoCungLaoDong').value();
                saveData[57] = $('#ViDoCungLaoDong').value();
                var duongDan = ''; //Đính kèm chữ ký
                duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file');
                if (typeof duongDan != "undefined") {
                    duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file') + '*'
                } else {
                    duongDan = '';
                }
                saveData[58] = duongDan;
                var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBanDau/LuuThongTin', { data: saveData });
                if (!result.Err) {
                    if (result.Logs == "1") {
                        NTS.canhbao(result.Msg);
                        return false;
                    } else {
                        LoadDataTable();
                        LoadDataTableCungLD_TabQuaTrinh($('#ThanhVienHoGDID').value());
                        //LoadDataTable_ListTab2();
                        NTS.thanhcong(result.Msg);
                        $('#mdThemMoiCungLaoDongBanDau').modal('hide');
                        soCCCDDT = "";
                        mangGiaTriDau = [];
                        mangGiaTriSau = [];
                        return false;
                    }
                } else {
                    result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
                }
                return false;
            }
        } else {
            tempthemDT = 'them'; // đối tượng
            var saveData = [];
            saveData[0] = tempthem;
            saveData[1] = $('#ThuThapCungLDID').value();
            saveData[2] = $('#NgayThuThap').value();
            saveData[3] = $('#DoiTuongUuTienID_us').value();
            saveData[4] = $('#TenDanToc_us').value();
            saveData[5] = $('#LoaiBHXH_us').value();
            saveData[6] = $('#chkBHYT_us').value();
            saveData[7] = $('#chkBHTN_us').value();
            saveData[8] = $('#MaSoBHXH_us').value();
            saveData[9] = $('#TinhID_TT_us').value();
            saveData[10] = $('#HuyenID_TT_us').value();
            saveData[11] = $('#XaID_TT_us').value();
            saveData[12] = $('#ThonID_TT_us').value();
            saveData[13] = $('#SoNha_TT_us').value();
            saveData[14] = $('#DiaChiThuongTruDT_us_CLD').value();
            saveData[15] = $('#TinhID_HN_us').value();
            saveData[16] = $('#HuyenID_HN_us').value();
            saveData[17] = $('#XaID_HN_us').value();
            saveData[18] = $('#ThonID_HN_us').value();
            saveData[19] = $('#SoNha_HN_us').value();
            saveData[20] = $('#DiaChiThuongTruHN_us').value();

            if (tempthem == 'them') {
                var data = uploadfileEvent({
                    name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                    loaiVB: 'VB',
                });
                if (data.length > 0) {
                    $('#txtDinhKem_VanBan_USDT').value(data);
                    NTS.dongthongbao();
                }
            }
            else {
                //if (newFile_usDangKy == true) {
                var data = uploadfileEvent({
                    name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                    loaiVB: 'VB',
                });
                if (data.length > 0) {
                    $('#txtDinhKem_VanBan_USDT').value(data);
                    NTS.dongthongbao();
                }
                //}
            }

            saveData[21] = $('#txtDinhKem_VanBan_USDT').value();// đính kèm
            saveData[22] = $('#TrinhDoPTID_us').value();
            saveData[23] = $('#TrinhDoCMKTID_us').value();
            saveData[24] = $('#LinhVucDaoTaoID_us').value();
            saveData[25] = $('#ChuyenNganhDTID_us').value();
            saveData[26] = $('#ViTheViecLamID_us').value();
            saveData[27] = $('#CongViecDangLamID_us').value();
            saveData[28] = $('#ViTriViecLamID_us').value();
            if ($('#chkKhongCoHDLD').value() == true) {
                saveData[29] = "0"; // Tình trạng ký hợp đồng lao động (0: Không ký HĐLĐ; 1: Có ký HĐLĐ
            } else if ($('#chkCoHDLD').value() == true) {
                saveData[29] = "1";
            } else {
                saveData[29] = "0";
            }
            saveData[30] = $('#NgayKy').value();
            saveData[31] = $('#LoaiHopDongLaoDongID').value();
            saveData[32] = $('#NoiLamViec').value();
            if ($('#LamViecTrongNuoc').value() == true) {
                saveData[33] = "0";
            } else if ($('#LamViecNuocNgoai').value() == true) { // 0: làm việc trong nước; 1: làm việc ngoài nước
                saveData[33] = "1";
            } else {
                saveData[33] = "0";
            }
            saveData[34] = $('#TinhID_NLV').value();
            saveData[35] = $('#HuyenID_NLV').value();
            saveData[36] = $('#XaID_NLV').value();
            saveData[37] = $('#ThonID_NLV').value();
            saveData[38] = $('#SoNha_NLV').value();
            saveData[39] = $('#LoaiHinhNLVID').value();
            saveData[40] = $('#QuocGiaID_us_NLV').value();
            saveData[41] = $('#DiaChiNoiLamViec').value();
            if ($('#chkChuaBaoGioLamViec').value() == true) {
                saveData[42] = "0";
            } else if ($('#chkDaTungLamViec').value() == true) {
                saveData[42] = "1";
            } else {
                saveData[42] = "2";
            }
            saveData[43] = $('#ThoiGianThatnghiep').value();
            saveData[44] = $('#CongViecTruocKhiThatNghiep').value();
            saveData[45] = $('#NguyenNhanKTGHDKTID').value();
            saveData[46] = $('#NhuCauDaoTaoViecLam').value();
            saveData[47] = $('#NguoiCungCapThongTin').value();
            saveData[48] = $('#SelectChuHo_CLD_US').attr('value');
            saveData[49] = $('#DoiTuongID').value();
            saveData[50] = $('#SoCMND_us').value();
            saveData[51] = tempthemDT;
            saveData[52] = $('#DoiTuongID').attr('value');
            saveData[53] = $('#SelectChuHo_CLD_US').attr('value');
            saveData[54] = soCCCDDT;
            saveData[55] = $('#HoVaTenDT_us_CLD').value();

            saveData[56] = tempthemDT;
            saveData[57] = $('#DoiTuongID').value();
            saveData[58] = $('#SelectChuHo_CLD_US').attr('value');
            saveData[59] = $('#MoiQuanHeIDDT_CLD_US').value();
            saveData[60] = $('#HoVaTenDT_us_CLD').value();
            saveData[61] = $('#GioiTinh_us').value();
            saveData[62] = $('#NgaySinh_us').value();
            saveData[63] = $('#TinhID_NS_us').value();
            saveData[64] = $('#DanTocID_us').value();
            saveData[65] = $('#TonGiaoID_us').value();
            saveData[66] = $('#QuocGiaID_us').value();
            saveData[67] = $('#SoCMND_us').value();
            saveData[68] = $('#NgayCapCCCD_us').value();
            saveData[69] = $('#NoiCapCCCD_us_CLD').value();
            saveData[70] = $('#SoNha_TT_us').value();
            saveData[71] = $('#ThonID_TT_us').value();
            saveData[72] = $('#XaID_TT_us').value();
            saveData[73] = $('#HuyenID_TT_us').value();
            saveData[74] = $('#TinhID_TT_us').value();
            saveData[75] = $('#DiaChiThuongTruDT_us_CLD').value();
            saveData[76] = $('#ThonID_HN_us').value();
            saveData[77] = $('#XaID_HN_us').value();
            saveData[78] = $('#HuyenID_HN_us').value();
            saveData[79] = $('#TinhID_HN_us').value();
            saveData[80] = $('#SoNha_HN_us').value();
            saveData[81] = $('#DiaChiThuongTruHN_us').value();
            saveData[82] = soCCCDDT;
            saveData[83] = $('#KinhDoCungLaoDong').value();
            saveData[84] = $('#ViDoCungLaoDong').value();
            var duongDan = ''; //Đính kèm chữ ký
            duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file');
            if (typeof duongDan != "undefined") {
                duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file') + '*'
            } else {
                duongDan = '';
            }
            saveData[85] = duongDan;
            var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBanDau/ThemMoiDoiTuongCungLaoDong', { data: saveData });
            if (!result.Err) {
                if (result.Logs == "1") {
                    NTS.canhbao(result.Msg);
                    return false;
                } else {
                    LoadDataTable();
                    LoadDataTableCungLD_TabQuaTrinh($('#ThanhVienHoGDID').value());
                    //LoadDataTable_ListTab2();
                    NTS.thanhcong(result.Msg);
                    $('#mdThemMoiCungLaoDongBanDau').modal('hide');
                    soCCCDDT = "";
                    mangGiaTriDau = [];
                    mangGiaTriSau = [];
                    return false;
                }
            } else {
                result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            }
            return false;
        }
    } else {
        // Lưu cho thu thập cung lao động biến động
        if (mangGiaTriSau.length > 0 && mangGiaTriDau.length > 0) {
            var different = false;
            for (var i = 0; i < mangGiaTriDau.length; i++) {
                if (mangGiaTriDau[i] !== mangGiaTriSau[i]) {
                    different = true;
                    break;
                }
            }
            if (different) { // có thay đổi dữ liệu của thông tin đối tượng
                tempthemDT = 'sua'; // đối tượng
                var saveData = [];
                saveData[0] = tempthem;
                saveData[1] = $('#ThuThapCungLDID').value();
                saveData[2] = $('#NgayThuThap').value();
                saveData[3] = $('#DoiTuongUuTienID_us').value();
                saveData[4] = $('#TenDanToc_us').value();
                saveData[5] = $('#LoaiBHXH_us').value();
                saveData[6] = $('#chkBHYT_us').value();
                saveData[7] = $('#chkBHTN_us').value();
                saveData[8] = $('#MaSoBHXH_us').value();
                saveData[9] = $('#TinhID_TT_us').value();
                saveData[10] = $('#HuyenID_TT_us').value();
                saveData[11] = $('#XaID_TT_us').value();
                saveData[12] = $('#ThonID_TT_us').value();
                saveData[13] = $('#SoNha_TT_us').value();
                saveData[14] = $('#DiaChiThuongTruDT_us_CLD').value();
                saveData[15] = $('#TinhID_HN_us').value();
                saveData[16] = $('#HuyenID_HN_us').value();
                saveData[17] = $('#XaID_HN_us').value();
                saveData[18] = $('#ThonID_HN_us').value();
                saveData[19] = $('#SoNha_HN_us').value();
                saveData[20] = $('#DiaChiThuongTruHN_us').value();

                if (tempthem == 'them') {
                    var data = uploadfileEvent({
                        name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                        loaiVB: 'VB',
                    });
                    if (data.length > 0) {
                        $('#txtDinhKem_VanBan_USDT').value(data);
                        NTS.dongthongbao();
                    }
                }
                else {
                    //if (newFile_usDangKy == true) {
                    var data = uploadfileEvent({
                        name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                        loaiVB: 'VB',
                    });
                    if (data.length > 0) {
                        $('#txtDinhKem_VanBan_USDT').value(data);
                        NTS.dongthongbao();
                    }
                    //}
                }

                saveData[21] = $('#txtDinhKem_VanBan_USDT').value();// đính kèm
                saveData[22] = $('#TrinhDoPTID_us').value();
                saveData[23] = $('#TrinhDoCMKTID_us').value();
                saveData[24] = $('#LinhVucDaoTaoID_us').value();
                saveData[25] = $('#ChuyenNganhDTID_us').value();
                saveData[26] = $('#ViTheViecLamID_us').value();
                saveData[27] = $('#CongViecDangLamID_us').value();
                saveData[28] = $('#ViTriViecLamID_us').value();
                if ($('#chkKhongCoHDLD').value() == true) {
                    saveData[29] = "0"; // Tình trạng ký hợp đồng lao động (0: Không ký HĐLĐ; 1: Có ký HĐLĐ
                } else if ($('#chkCoHDLD').value() == true) {
                    saveData[29] = "1";
                } else {
                    saveData[29] = "0";
                }
                saveData[30] = $('#NgayKy').value();
                saveData[31] = $('#LoaiHopDongLaoDongID').value();
                saveData[32] = $('#NoiLamViec').value();
                if ($('#LamViecTrongNuoc').value() == true) {
                    saveData[33] = "0";
                } else if ($('#LamViecNuocNgoai').value() == true) { // 0: làm việc trong nước; 1: làm việc ngoài nước
                    saveData[33] = "1";
                } else {
                    saveData[33] = "0";
                }
                saveData[34] = $('#TinhID_NLV').value();
                saveData[35] = $('#HuyenID_NLV').value();
                saveData[36] = $('#XaID_NLV').value();
                saveData[37] = $('#ThonID_NLV').value();
                saveData[38] = $('#SoNha_NLV').value();
                saveData[39] = $('#LoaiHinhNLVID').value();
                saveData[40] = $('#QuocGiaID_us_NLV').value();
                saveData[41] = $('#DiaChiNoiLamViec').value();
                if ($('#chkChuaBaoGioLamViec').value() == true) {
                    saveData[42] = "0";
                } else if ($('#chkDaTungLamViec').value() == true) {
                    saveData[42] = "1";
                } else {
                    saveData[42] = "2";
                }
                saveData[43] = $('#ThoiGianThatnghiep').value();
                saveData[44] = $('#CongViecTruocKhiThatNghiep').value();
                saveData[45] = $('#NguyenNhanKTGHDKTID').value();
                saveData[46] = $('#NhuCauDaoTaoViecLam').value();
                saveData[47] = $('#NguoiCungCapThongTin').value();
                saveData[48] = $('#SelectChuHo_CLD_US').attr('value');
                saveData[49] = $('#DoiTuongID').value();
                saveData[50] = $('#SoCMND_us').value();
                saveData[51] = tempthemDT;
                saveData[52] = $('#DoiTuongID').attr('value');
                saveData[53] = $('#SelectChuHo_CLD_US').attr('value');
                saveData[54] = soCCCDDT;
                saveData[55] = $('#LoaiBienDongID').value();
                saveData[56] = $('#HoVaTenDT_us_CLD').value();
                saveData[57] = $('#KinhDoCungLaoDong').value();
                saveData[58] = $('#ViDoCungLaoDong').value();
                var duongDan = ''; //Đính kèm chữ ký
                duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file');
                if (typeof duongDan != "undefined") {
                    duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file') + '*'
                } else {
                    duongDan = '';
                }
                saveData[59] = duongDan;

                var saveDataDT = [];
                saveDataDT[0] = tempthemDT;
                saveDataDT[1] = $('#DoiTuongID').value();
                saveDataDT[2] = $('#SelectChuHo_CLD_US').attr('value');
                saveDataDT[3] = $('#MoiQuanHeIDDT_CLD_US').value();
                saveDataDT[4] = $('#HoVaTenDT_us_CLD').value();
                saveDataDT[5] = $('#GioiTinh_us').value();
                saveDataDT[6] = $('#NgaySinh_us').value();
                saveDataDT[7] = $('#TinhID_NS_us').value();
                saveDataDT[8] = $('#DanTocID_us').value();
                saveDataDT[9] = $('#TonGiaoID_us').value();
                saveDataDT[10] = $('#QuocGiaID_us').value();
                saveDataDT[11] = $('#SoCMND_us').value();
                saveDataDT[12] = $('#NgayCapCCCD_us').value();
                saveDataDT[13] = $('#NoiCapCCCD_us_CLD').value();
                saveDataDT[14] = $('#SoNha_TT_us').value();
                saveDataDT[15] = $('#ThonID_TT_us').value();
                saveDataDT[16] = $('#XaID_TT_us').value();
                saveDataDT[17] = $('#HuyenID_TT_us').value();
                saveDataDT[18] = $('#TinhID_TT_us').value();
                saveDataDT[19] = $('#DiaChiThuongTruDT_us_CLD').value();
                saveDataDT[20] = $('#ThonID_HN_us').value();
                saveDataDT[21] = $('#XaID_HN_us').value();
                saveDataDT[22] = $('#HuyenID_HN_us').value();
                saveDataDT[23] = $('#TinhID_HN_us').value();
                saveDataDT[24] = $('#SoNha_HN_us').value();
                saveDataDT[25] = $('#DiaChiThuongTruHN_us').value();
                saveDataDT[26] = soCCCDDT;
                var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBienDong/LuuThongTinCungLaoDongBienDong', { data: saveData });
                if (!result.Err || !resultDT.Err) {
                    if (result.Logs == "1") {
                        NTS.canhbao(result.Msg);
                        return false;
                    } else if (result.Logs == "2") {
                        CanhBaoCapNhatDoiTuong(() => {
                            saveData[51] = "them";
                            var result2 = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBienDong/LuuThongTinCungLaoDongBienDong', { data: saveData });
                            var resultDT = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBienDong/LuuThongTinDoiTuong', { data: saveDataDT });
                            if (!result2.Err || !resultDT.Err) {
                                LoadDataTable();
                                LoadDataTableCungLD_TabQuaTrinh($('#ThanhVienHoGDID').value());
                                //LoadDataTable_ListTab2();
                                NTS.thanhcong(result2.Msg);
                                $('#mdThemMoiCungLaoDongBanDau').modal('hide');
                                soCCCDDT = "";
                                mangGiaTriDau = [];
                                mangGiaTriSau = [];
                                bienDong = false;
                            }
                        }, () => { mangGiaTriSau = []; }, result.Msg);
                    } else {
                        LoadDataTable();
                        LoadDataTableCungLD_TabQuaTrinh($('#ThanhVienHoGDID').value());
                        //LoadDataTable_ListTab2();
                        NTS.thanhcong(result.Msg);
                        $('#mdThemMoiCungLaoDongBanDau').modal('hide');
                        soCCCDDT = "";
                        bienDong = false;
                        return false;
                    }
                } else {
                    result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
                }
                return false;
            } else if (!different) {

                ////Xử lý lưu đính kèm
                //var dinhKem = '';
                //var dinhKem = $('.ace-file-container .ace-file-name').map(function () {
                //    return $(this).data('title');
                //}).get();
                var saveData = [];
                tempthemDT = 'them'; // đối tượng
                saveData[0] = tempthem;
                saveData[1] = $('#ThuThapCungLDID').value();
                saveData[2] = $('#NgayThuThap').value();
                saveData[3] = $('#DoiTuongUuTienID_us').value();
                saveData[4] = $('#TenDanToc_us').value();
                saveData[5] = $('#LoaiBHXH_us').value();
                saveData[6] = $('#chkBHYT_us').value();
                saveData[7] = $('#chkBHTN_us').value();
                saveData[8] = $('#MaSoBHXH_us').value();
                saveData[9] = $('#TinhID_TT_us').value();
                saveData[10] = $('#HuyenID_TT_us').value();
                saveData[11] = $('#XaID_TT_us').value();
                saveData[12] = $('#ThonID_TT_us').value();
                saveData[13] = $('#SoNha_TT_us').value();
                saveData[14] = $('#DiaChiThuongTruDT_us_CLD').value();
                saveData[15] = $('#TinhID_HN_us').value();
                saveData[16] = $('#HuyenID_HN_us').value();
                saveData[17] = $('#XaID_HN_us').value();
                saveData[18] = $('#ThonID_HN_us').value();
                saveData[19] = $('#SoNha_HN_us').value();
                saveData[20] = $('#DiaChiThuongTruHN_us').value();

                if (tempthem == 'them') {
                    var data = uploadfileEvent({
                        name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                        loaiVB: 'VB',
                    });
                    if (data.length > 0) {
                        $('#txtDinhKem_VanBan_USDT').value(data);
                        NTS.dongthongbao();
                    }
                }
                else {
                    //if (newFile_usDangKy == true) {
                    var data = uploadfileEvent({
                        name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                        loaiVB: 'VB',
                    });
                    if (data.length > 0) {
                        $('#txtDinhKem_VanBan_USDT').value(data);
                        NTS.dongthongbao();
                    }
                    //}
                }

                saveData[21] = $('#txtDinhKem_VanBan_USDT').value();// đính kèm
                saveData[22] = $('#TrinhDoPTID_us').value();
                saveData[23] = $('#TrinhDoCMKTID_us').value();
                saveData[24] = $('#LinhVucDaoTaoID_us').value();
                saveData[25] = $('#ChuyenNganhDTID_us').value();
                saveData[26] = $('#ViTheViecLamID_us').value();
                saveData[27] = $('#CongViecDangLamID_us').value();
                saveData[28] = $('#ViTriViecLamID_us').value();
                if ($('#chkKhongCoHDLD').value() == true) {
                    saveData[29] = "0"; // Tình trạng ký hợp đồng lao động (0: Không ký HĐLĐ; 1: Có ký HĐLĐ
                } else if ($('#chkCoHDLD').value() == true) {
                    saveData[29] = "1";
                } else {
                    saveData[29] = "0";
                }
                saveData[30] = $('#NgayKy').value();
                saveData[31] = $('#LoaiHopDongLaoDongID').value();
                saveData[32] = $('#NoiLamViec').value();
                if ($('#LamViecTrongNuoc').value() == true) {
                    saveData[33] = "0";
                } else if ($('#LamViecNuocNgoai').value() == true) { // 0: làm việc trong nước; 1: làm việc ngoài nước
                    saveData[33] = "1";
                } else {
                    saveData[33] = "0";
                }
                saveData[34] = $('#TinhID_NLV').value();
                saveData[35] = $('#HuyenID_NLV').value();
                saveData[36] = $('#XaID_NLV').value();
                saveData[37] = $('#ThonID_NLV').value();
                saveData[38] = $('#SoNha_NLV').value();
                saveData[39] = $('#LoaiHinhNLVID').value();
                saveData[40] = $('#QuocGiaID_us_NLV').value();
                saveData[41] = $('#DiaChiNoiLamViec').value();
                if ($('#chkChuaBaoGioLamViec').value() == true) {
                    saveData[42] = "0";
                } else if ($('#chkDaTungLamViec').value() == true) {
                    saveData[42] = "1";
                } else {
                    saveData[42] = "2";
                }
                saveData[43] = $('#ThoiGianThatnghiep').value();
                saveData[44] = $('#CongViecTruocKhiThatNghiep').value();
                saveData[45] = $('#NguyenNhanKTGHDKTID').value();
                saveData[46] = $('#NhuCauDaoTaoViecLam').value();
                saveData[47] = $('#NguoiCungCapThongTin').value();
                saveData[48] = $('#SelectChuHo_CLD_US').attr('value');
                saveData[49] = $('#DoiTuongID').value();
                saveData[50] = $('#SoCMND_us').value();
                saveData[51] = tempthemDT;
                saveData[52] = $('#DoiTuongID').value();
                saveData[53] = $('#SelectChuHo_CLD_US').attr('value');
                saveData[54] = soCCCDDT;
                saveData[55] = $('#LoaiBienDongID').value();
                saveData[56] = $('#HoVaTenDT_us_CLD').value();
                saveData[57] = $('#KinhDoCungLaoDong').value();
                saveData[58] = $('#ViDoCungLaoDong').value();
                var duongDan = ''; //Đính kèm chữ ký
                duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file');
                if (typeof duongDan != "undefined") {
                    duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file') + '*'
                } else {
                    duongDan = '';
                }
                saveData[59] = duongDan;
                var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBienDong/LuuThongTinCungLaoDongBienDong', { data: saveData });
                if (!result.Err) {
                    if (result.Logs == "1") {
                        NTS.canhbao(result.Msg);
                        return false;
                    } else {
                        LoadDataTable();
                        LoadDataTableCungLD_TabQuaTrinh($('#ThanhVienHoGDID').value());
                        //LoadDataTable_ListTab2();
                        NTS.thanhcong(result.Msg);
                        $('#mdThemMoiCungLaoDongBanDau').modal('hide');
                        soCCCDDT = "";
                        mangGiaTriDau = [];
                        mangGiaTriSau = [];
                        bienDong = false;
                        return false;
                    }
                } else {
                    result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
                }
                return false;
            }
        } else {
            tempthemDT = 'them'; // đối tượng
            var saveData = [];
            saveData[0] = tempthem;
            saveData[1] = $('#ThuThapCungLDID').value();
            saveData[2] = $('#NgayThuThap').value();
            saveData[3] = $('#DoiTuongUuTienID_us').value();
            saveData[4] = $('#TenDanToc_us').value();
            saveData[5] = $('#LoaiBHXH_us').value();
            saveData[6] = $('#chkBHYT_us').value();
            saveData[7] = $('#chkBHTN_us').value();
            saveData[8] = $('#MaSoBHXH_us').value();
            saveData[9] = $('#TinhID_TT_us').value();
            saveData[10] = $('#HuyenID_TT_us').value();
            saveData[11] = $('#XaID_TT_us').value();
            saveData[12] = $('#ThonID_TT_us').value();
            saveData[13] = $('#SoNha_TT_us').value();
            saveData[14] = $('#DiaChiThuongTruDT_us_CLD').value();
            saveData[15] = $('#TinhID_HN_us').value();
            saveData[16] = $('#HuyenID_HN_us').value();
            saveData[17] = $('#XaID_HN_us').value();
            saveData[18] = $('#ThonID_HN_us').value();
            saveData[19] = $('#SoNha_HN_us').value();
            saveData[20] = $('#DiaChiThuongTruHN_us').value();

            if (tempthem == 'them') {
                var data = uploadfileEvent({
                    name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                    loaiVB: 'VB',
                });
                if (data.length > 0) {
                    $('#txtDinhKem_VanBan_USDT').value(data);
                    NTS.dongthongbao();
                }
            }
            else {
                //if (newFile_usDangKy == true) {
                var data = uploadfileEvent({
                    name: '#HoSoKemTheo_USDangKy',///ID input type="file"
                    loaiVB: 'VB',
                });
                if (data.length > 0) {
                    $('#txtDinhKem_VanBan_USDT').value(data);
                    NTS.dongthongbao();
                }
                //}
            }

            saveData[21] = $('#txtDinhKem_VanBan_USDT').value();// đính kèm
            saveData[22] = $('#TrinhDoPTID_us').value();
            saveData[23] = $('#TrinhDoCMKTID_us').value();
            saveData[24] = $('#LinhVucDaoTaoID_us').value();
            saveData[25] = $('#ChuyenNganhDTID_us').value();
            saveData[26] = $('#ViTheViecLamID_us').value();
            saveData[27] = $('#CongViecDangLamID_us').value();
            saveData[28] = $('#ViTriViecLamID_us').value();
            if ($('#chkKhongCoHDLD').value() == true) {
                saveData[29] = "0"; // Tình trạng ký hợp đồng lao động (0: Không ký HĐLĐ; 1: Có ký HĐLĐ
            } else if ($('#chkCoHDLD').value() == true) {
                saveData[29] = "1";
            } else {
                saveData[29] = "0";
            }
            saveData[30] = $('#NgayKy').value();
            saveData[31] = $('#LoaiHopDongLaoDongID').value();
            saveData[32] = $('#NoiLamViec').value();
            if ($('#LamViecTrongNuoc').value() == true) {
                saveData[33] = "0";
            } else if ($('#LamViecNuocNgoai').value() == true) { // 0: làm việc trong nước; 1: làm việc ngoài nước
                saveData[33] = "1";
            } else {
                saveData[33] = "0";
            }
            saveData[34] = $('#TinhID_NLV').value();
            saveData[35] = $('#HuyenID_NLV').value();
            saveData[36] = $('#XaID_NLV').value();
            saveData[37] = $('#ThonID_NLV').value();
            saveData[38] = $('#SoNha_NLV').value();
            saveData[39] = $('#LoaiHinhNLVID').value();
            saveData[40] = $('#QuocGiaID_us_NLV').value();
            saveData[41] = $('#DiaChiNoiLamViec').value();
            if ($('#chkChuaBaoGioLamViec').value() == true) {
                saveData[42] = "0";
            } else if ($('#chkDaTungLamViec').value() == true) {
                saveData[42] = "1";
            } else {
                saveData[42] = "2";
            }
            saveData[43] = $('#ThoiGianThatnghiep').value();
            saveData[44] = $('#CongViecTruocKhiThatNghiep').value();
            saveData[45] = $('#NguyenNhanKTGHDKTID').value();
            saveData[46] = $('#NhuCauDaoTaoViecLam').value();
            saveData[47] = $('#NguoiCungCapThongTin').value();
            saveData[48] = $('#SelectChuHo_CLD_US').attr('value');
            saveData[49] = $('#DoiTuongID').value();
            saveData[50] = $('#SoCMND_us').value();
            saveData[51] = tempthemDT;
            saveData[52] = $('#DoiTuongID').attr('value');
            saveData[53] = $('#SelectChuHo_CLD_US').attr('value');
            saveData[54] = soCCCDDT;
            saveData[55] = $('#LoaiBienDongID').value();
            saveData[56] = $('#HoVaTenDT_us_CLD').value();

            saveData[56] = tempthemDT;
            saveData[57] = $('#DoiTuongID').value();
            saveData[58] = $('#SelectChuHo_CLD_US').attr('value');
            saveData[59] = $('#MoiQuanHeIDDT_CLD_US').value();
            saveData[60] = $('#HoVaTenDT_us_CLD').value();
            saveData[61] = $('#GioiTinh_us').value();
            saveData[62] = $('#NgaySinh_us').value();
            saveData[63] = $('#TinhID_NS_us').value();
            saveData[64] = $('#DanTocID_us').value();
            saveData[65] = $('#TonGiaoID_us').value();
            saveData[66] = $('#QuocGiaID_us').value();
            saveData[67] = $('#SoCMND_us').value();
            saveData[68] = $('#NgayCapCCCD_us').value();
            saveData[69] = $('#NoiCapCCCD_us_CLD').value();
            saveData[70] = $('#SoNha_TT_us').value();
            saveData[71] = $('#ThonID_TT_us').value();
            saveData[72] = $('#XaID_TT_us').value();
            saveData[73] = $('#HuyenID_TT_us').value();
            saveData[74] = $('#TinhID_TT_us').value();
            saveData[75] = $('#DiaChiThuongTruDT_us_CLD').value();
            saveData[76] = $('#ThonID_HN_us').value();
            saveData[77] = $('#XaID_HN_us').value();
            saveData[78] = $('#HuyenID_HN_us').value();
            saveData[79] = $('#TinhID_HN_us').value();
            saveData[80] = $('#SoNha_HN_us').value();
            saveData[81] = $('#DiaChiThuongTruHN_us').value();
            saveData[82] = soCCCDDT;
            saveData[83] = $('#KinhDoCungLaoDong').value();
            saveData[84] = $('#ViDoCungLaoDong').value();
            var duongDan = ''; //Đính kèm chữ ký
            duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file');
            if (typeof duongDan != "undefined") {
                duongDan = $('#list-file-tai-lieu_CLD .xemDinhKemChuKy').attr('data-url-file') + '*'
            } else {
                duongDan = '';
            }
            saveData[85] = duongDan;
            var result = NTS.getAjax('/QuanLy/ThuThapCungLaoDongBienDong/ThemMoiDoiTuongCungLaoDongBienDong', { data: saveData });
            if (!result.Err) {
                if (result.Logs == "1") {
                    NTS.canhbao(result.Msg);
                    return false;
                } else {
                    LoadDataTable();
                    LoadDataTableCungLD_TabQuaTrinh($('#ThanhVienHoGDID').value());
                    //LoadDataTable_ListTab2();
                    NTS.thanhcong(result.Msg);
                    $('#mdThemMoiCungLaoDongBanDau').modal('hide');
                    soCCCDDT = "";
                    mangGiaTriDau = [];
                    mangGiaTriSau = [];
                    bienDong = false;
                    return false;
                }
            } else {
                result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            }
            return false;
        }
    }

});

//---------------------------------Thêm mới thông tin thu thập cung lao động biến động ---------------------------------
$(document).on('click', '#btnThemMoiBienDong', function () {
    getLocation();
    $('#countrydata').html('');
    loadComBoLoaiBienDong();
    $('#form_BienDong').css({ "display": 'block' });
    //showModalThemMoiThuThap('them', '12', $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
    $('#lblTieuDeThemMoiThuThapCung').text('Thêm mới thu thập Cung lao động biến động');
    $('#LoaiBienDongID').prop('required', true);
    $('#lblLoaiBienDongID').addClass('validation');
    $('#txtDuongDanFileVB_tailieu_CLD').val('');
    $('#btnChonTepVB_tailieu_CLD').css({ "display": "block" });
    $('#btnXoaChuKy').css({ "display": "none" });
    $('#btnXoaChuKy').attr({ "data-url-file": "" });
    $('#list-file-tai-lieu_CLD').html('');
    $('#list-file-tai-lieu_CLD').css({ "display": "none" });
    bienDong = true;
    if (GridDoiTuong_List.getSelectedRows().length == 0) {
        NTS.canhbao("Vui lòng chọn 1 dòng dữ liệu trước khi thao tác!");
        return false;
    }
    if (GridDoiTuong_List.getSelectedRows().length > 0) {
        var ID = $('#btnSua2').attr("data");
        var result = NTS.getAjax('/DanhMuc/DoiTuongCaNhan/LoadDuLieu_CungLaoDongBanDauTheoDT_DT', { id: ID });
        if (result.Result != "") {
            var data = result.Result[0];
            // Nếu thành viên là chủ hộ thì load lại cobom quan hệ và ẩn quan hệ
            if (data.ChuHo == "1") {
                NTS.loadDataCombo({
                    name: '#MoiQuanHeIDDT_CLD_US',
                    ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
                    ajaxParam: { data: ['sua', '12'] },
                    indexValue: 0,
                    indexText: 2,
                    textShowTatCa: '-Chọn-',
                    showTatCa: !0
                });
                showModalThemMoiThuThapDT($('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
            } else {
                NTS.loadDataCombo({
                    name: '#MoiQuanHeIDDT_CLD_US',
                    ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
                    ajaxParam: { data: ['them', '12'] },
                    indexValue: 0,
                    indexText: 2,
                    textShowTatCa: '-Chọn-',
                    showTatCa: !0
                });
                showModalThemMoiThuThapDT($('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', false);
            }
            $('#MoiQuanHeIDDT_CLD_US').value(data.QuanHeID);
            $('#SoCMND_us').value(data.SoCCCD);
            $('#NgayCapCCCD_us').value(data.NgayCap);
            $('#NoiCapCCCD_us_CLD').value(data.NoiCapID);
            $('#HoVaTenDT_us_CLD').value(data.HoVaTen);
            $('#NgaySinh_us').value(data.NgayThangNamSinh);
            $('#TinhID_NS_us').value(data.NoiSinh);
            $('#GioiTinh_us').value(data.GioiTinhID);
            $('#DanTocID_us').value(data.DanTocID);
            $('#TonGiaoID_us').value(data.TonGiaoID);
            $('#QuocGiaID_us').value(data.QuocTichID);
            $('#TinhID_TT_us').value(data.DiaBanHCID_TinhTT);
            $('#HuyenID_TT_us').value(data.DiaBanHCID_HuyenTT);
            $('#XaID_TT_us').value(data.DiaBanHCID_XaTT);
            $('#ThonID_TT_us').value(data.DiaBanHCID_ThonTT);
            $('#SoNha_TT_us').value(data.SoNhaTT);
            $('#DiaChiThuongTruDT_us_CLD').value(data.DiaChiCuTheTT);
            $('#TinhID_HN_us').value(data.DiaBanHCID_TinhHT);
            $('#HuyenID_HN_us').value(data.DiaBanHCID_HuyenHT);
            $('#XaID_HN_us').value(data.DiaBanHCID_XaHT);
            $('#ThonID_HN_us').value(data.DiaBanHCID_ThonHT);
            $('#SoNha_HN_us').value(data.SoNhaHT);
            $('#DiaChiThuongTruHN_us').value(data.DiaChiCuTheHT);
            $('#DoiTuongID').value(data.ThanhVienHoGDID);
            soCCCDDT = data.SoCCCD;
            $('#TinhID_TT_us').prop('disabled', true);
            $('#HuyenID_TT_us').prop('disabled', true);
            $('#XaID_TT_us').prop('disabled', true);
            $('#ThonID_TT_us').prop('disabled', true);
            $('#SoNha_TT_us').prop('disabled', true);
            $('#DiaChiThuongTruDT_us_CLD').prop('disabled', true);
            if (data.HoGiaDinhID == "00000000-0000-0000-0000-000000000000") {
                $('#SelectChuHo_CLD_US').html(`<li action="chon"><div class="opInfo"><div style="display: flex;justify-content: space-between;align-items: center;">--Chọn hộ gia đình-- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
                $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
                $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
                $('#SelectChuHo_CLD_US').attr('value', "");
            } else {
                var item = `<li style="display: flex"><span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;"><b>${data.HoVaTenChuHo}</b> <b>(${data.MaHoGiaDinh})</b>- Nơi thường trú : <b>${data.NoiThuongTruHGD}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
                $('#SelectChuHo_CLD_US').attr('value', data.HoGiaDinhID);
                $('#SelectChuHo_CLD_US').html(item);
            }

            // Load dữ liệu của thông tin cung lao động 
            $('#DoiTuongUuTienID_us').value(data.DoiTuongUuTienID);
            $('#TenDanToc_us').value(data.TenDanToc);
            $('#LoaiBHXH_us').value(data.ThamGiaBHXHID);
            if (data.BHTN == 1) {
                $('#chkBHTN_us').prop('checked', true);
            } else {
                $('#chkBHTN_us').prop('checked', false);
            }
            if (data.BHYT == 1) {
                $('#chkBHYT_us').prop('checked', true);
            } else {
                $('#chkBHYT_us').prop('checked', false);
            }
            $('#MaSoBHXH_us').value(data.MaBHXH);
            $('#TrinhDoPTID_us').value(data.TrinhDoHVID);
            $('#TrinhDoCMKTID_us').value(data.TrinhDoCMKTID);
            $('#LinhVucDaoTaoID_us').value(data.LinhVucDaoTaoID);
            $('#ChuyenNganhDTID_us').value(data.ChuyenNganhDaoTaoID);
            $('#ViTheViecLamID_us').value(data.ViTheViecLamID);
            $('#CongViecDangLamID_us').value(data.NgheNghiepID);
            $('#ViTriViecLamID_us').value(data.ViTriViecLamID);
            if (data.HopDongLaoDong == "0") {
                $('#chkKhongCoHDLD').prop('checked', true);
            } else {
                $('#chkKhongCoHDLD').prop('checked', false);
            }
            if (data.HopDongLaoDong == "1") {
                $('#chkCoHDLD').prop('checked', true);
            } else {
                $('#chkCoHDLD').prop('checked', false);
            }
            $('#NgayKy').value(data.NgayKyHĐ);
            $('#LoaiHopDongLaoDongID').value(data.LoaiHopDongID);
            $('#NoiLamViec').value(data.TenDNNoiLV);
            if (data.NoiLVNuocNgoai == "0") {
                $('#LamViecTrongNuoc').prop('checked', true);
                $('#LamViecNuocNgoai').prop('checked', false);
                $('.LamViecTrongNuoc').css('display', 'block');
                $('.LamViecONuocNgoai').css('display', 'none');
            } else {
                $('#LamViecNuocNgoai').prop('checked', true);
                $('#LamViecTrongNuoc').prop('checked', false);
                $('.LamViecTrongNuoc').css('display', 'none');
                $('.LamViecONuocNgoai').css('display', 'block');
            }
            $('#TinhID_NLV').value(data.DiaBanHCID_TinhNLV);
            $('#HuyenID_NLV').value(data.DiaBanHCID_HuyenNLV);
            $('#XaID_NLV').value(data.DiaBanHCID_XaNLV);
            $('#ThonID_NLV').value(data.DiaBanHCID_ThonNLV);
            $('#SoNha_NLV').value(data.SoNhaNoiLV);
            $('#LoaiHinhNLVID').value(data.LoaiHinhDNID);
            $('#DiaChiNoiLamViec').value(data.DiaChiCuTheNLV);
            if (data.ThatNghiep == "0") {
                $('#chkChuaBaoGioLamViec').prop('checked', true);
            } else {
                $('#chkChuaBaoGioLamViec').prop('checked', false);
            }
            if (data.ThatNghiep == "1") {
                $('#chkDaTungLamViec').prop('checked', true);
            } else {
                $('#chkDaTungLamViec').prop('checked', false);
            }
            $('#QuocGiaID_us_NLV').value(data.QuocGiaID);
            $('#ThoiGianThatnghiep').value(data.ThoiGianThatNghiepID);
            $('#CongViecTruocKhiThatNghiep').value(data.CongViecTruocTN);
            $('#NguyenNhanKTGHDKTID').value(data.LyDoID);
            $('#NhuCauDaoTaoViecLam').value(data.NhuCauDaoTaoVL);
            $('#NguoiCungCapThongTin').value(data.NguoiCungCapTT);
            if (data.ThatNghiep != "2" || data.ThoiGianThatNghiepID != "00000000-0000-0000-0000-000000000000" || data.CongViecTruocTN != "00000000-0000-0000-0000-000000000000") {
                ResetDoiVoiNguoiCoViecLam();
                ResetDoiVoiNguoiKTGHDKT();
            }
            else if (data.LyDoID != "00000000-0000-0000-0000-000000000000") {
                ResetDoiVoiNguoiCoViecLam();
                ResetDoiVoiNguoiThatNghiep();
            }
            else if (data.ViTheViecLamID != "00000000-0000-0000-0000-000000000000" ||
                data.NgheNghiepID != "00000000-0000-0000-0000-000000000000" ||
                data.ViTriViecLamID != "00000000-0000-0000-0000-000000000000" ||
                data.DiaBanHCID_TinhNLV != "00000000-0000-0000-0000-000000000000" ||
                data.DiaBanHCID_ThonNLV != "00000000-0000-0000-0000-000000000000" ||
                data.DiaBanHCID_XaNLV != "00000000-0000-0000-0000-000000000000" ||
                data.DiaBanHCID_HuyenNLV != "00000000-0000-0000-0000-000000000000" ||
                data.QuocGiaID != "00000000-0000-0000-0000-000000000000" ||
                data.LoaiHinhDNID != "00000000-0000-0000-0000-000000000000" ||
                data.LoaiHopDongID != "00000000-0000-0000-0000-000000000000" ||
                $('#chkCoHDLD').value() != "0" || $('#NgayKy').value() != "" ||
                $('#NoiLamViec').value() != "" || $('#SoNha_NLV').value() != "" || $('#DiaChiNoiLamViec').value() != ""
            ) {
                ResetDoiVoiNguoiThatNghiep();
                ResetDoiVoiNguoiKTGHDKT();
            }

            //Lưu các giá trị load dữ liệu ra vào mảng để kiểm tra 
            mangGiaTriDau.push(replaceNullAndEmptyString(data.QuanHeID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayCap));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiCapID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.HoVaTen.toUpperCase()));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayThangNamSinh));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiSinh));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.GioiTinhID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DanTocID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.TonGiaoID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.QuocTichID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.HoGiaDinhID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoCCCD));
            var listFiles_VanBan_US = [];
            $('#txtDinhKem_VanBan_USDT').val(data.DinhKem);
            if (data.DinhKem == '' || data.DinhKem == null) {
                ResetDinhKemFile();
            }
            else {
                for (var i = 0; i < data.DinhKem.split('*').length; i++) {
                    if (data.DinhKem.split('*')[i] == '') {
                        continue;
                    }
                    listFiles_VanBan_US.push(data.DinhKem.split('*')[i].split('/')[data.DinhKem.split('*')[i].split('/').length - 1].replaceAll('*', '').toString());
                }
                $('#HoSoKemTheo_USDangKy').ace_file_input('show_file_list', listFiles_VanBan_US);
                var ItemImg = $(".ace-icon.fa.fa-picture-o.file-image");
                //code chuyen doi chuoi dinh kem thanh array
                if (data.DinhKem != null && data.DinhKem.length > 0) {
                    var linkVB = data.DinhKem;
                    var arrFile = linkVB.split('*');

                    for (var i = 0; i < arrFile.length; i++) {
                        if (arrFile[i] != "") {
                            $(ItemImg[i]).attr("ace-img-url", arrFile[i]);
                        }
                    }
                }
                else {
                    NTS.canhbao('Không có file đính kèm!');
                }
                //end code
                //Gắn sự kiện xem hình ảnh
                $(".ace-icon.fa.fa-picture-o.file-image").addClass("XemDinhKemHinhAnh_USDangKy");
                //Gắn thêm dấu x xóa từng file
                $('.ace-file-container.hide-placeholder .ace-file-name').append('<i class=" ace-icon fa fa-times XoaFileDinhKemDT XoaFileDinhKem btn-del-item img-db"  onclick="return false"></i>');
            }
            // File đính kèm chữ ký
            $('#list-file-tai-lieu_CLD').html('');
            $('#txtDuongDanFileVB_tailieu_CLD').value(data.ChuKy);
            if (data.ChuKy != null && data.ChuKy.length > 0) {
                $('#btnChonTepVB_tailieu_CLD').css({ "display": "none" });
                $('#btnXoaChuKy').css({ "display": "block" });
                $('#list-file-tai-lieu_CLD').css({ "display": "block" });
                let linkVB = data.ChuKy;
                let arrFile = linkVB.split('*');
                for (let p = 0; p < arrFile.length - 1; p++) {
                    if (arrFile[p].lastIndexOf('.') != -1) {
                        // file có đuôi .*
                        if (arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".png" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpeg" ||
                            arrFile[p].substring(arrFile[p].lastIndexOf('.'), arrFile[p].length).toLocaleLowerCase() == ".jpg"
                        ) {
                            $('#list-file-tai-lieu_CLD').append(`<div class="" style="color: var(--tblr-color-header);">
                                                        <div data-url-file="${arrFile[p].replace('~', '')}" class="xemDinhKemChuKy btn" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}"><i class="fa-solid fa-eye"></i>&nbsp;${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}</div>
                                                    </div>`);
                            $('#btnXoaChuKy').attr('data-url-file', `${arrFile[p]}`);
                        } else {
                            $('#list-file-tai-lieu_CLD').append(`<div class="" style="color: var(--tblr-color-header);">
                                                        <div data-url-file="${arrFile[p].replace('~', '')}" class="xemDinhKemChuKy btn" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}"><i class="fa-solid fa-eye"></i>&nbsp;${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}</div>
                                                    </div>`);
                            $('#btnXoaChuKy').attr('data-url-file', `${arrFile[p]}`);
                        }
                    } else {
                        // file không đuôi
                        $('#list-file-tai-lieu_CLD').append(`<div class="" style="color: var(--tblr-color-header);">
                                                        <div data-url-file="${arrFile[p].replace('~', '')}" class="xemDinhKemChuKy btn" title="${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}"><i class="fa-solid fa-eye"></i>&nbsp;${arrFile[p].substring(arrFile[p].lastIndexOf('/') + 1, arrFile[p].length)}</div>
                                                    </div>`);
                        $('#btnXoaChuKy').attr('data-url-file', `${arrFile[p]}`);
                    }
                }
            } else {
                $('#btnXoaChuKy').css({ "display": "none" });

            }
        } else {
            var result2 = NTS.getAjax('/DanhMuc/DoiTuongCaNhan/LoadDuLieuThanhVienByID', { id: ID });
            var data = result2.Result[0];
            if (data.ChuHo == "1") {
                NTS.loadDataCombo({
                    name: '#MoiQuanHeIDDT_CLD_US',
                    ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
                    ajaxParam: { data: ['sua', '12'] },
                    indexValue: 0,
                    indexText: 2,
                    textShowTatCa: '-Chọn-',
                    showTatCa: !0
                });
                showModalThemMoiThuThapDT($('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
            } else {
                NTS.loadDataCombo({
                    name: '#MoiQuanHeIDDT_CLD_US',
                    ajaxUrl: '/DanhMuc/DungChung/GetComBo_MoiQuanHeKhongChuHo',
                    ajaxParam: { data: ['them', '12'] },
                    indexValue: 0,
                    indexText: 2,
                    textShowTatCa: '-Chọn-',
                    showTatCa: !0
                });
                showModalThemMoiThuThapDT($('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', false);
            }
            $('#MoiQuanHeIDDT_CLD_US').value(data.QuanHeID);
            $('#SoCMND_us').value(data.SoCCCD);
            $('#NgayCapCCCD_us').value(data.NgayCap);
            $('#NoiCapCCCD_us_CLD').value(data.NoiCapID);
            $('#HoVaTenDT_us_CLD').value(data.HoVaTen);
            $('#NgaySinh_us').value(data.NgayThangNamSinh);
            $('#TinhID_NS_us').value(data.NoiSinh);
            $('#GioiTinh_us').value(data.GioiTinhID);
            $('#DanTocID_us').value(data.DanTocID);
            $('#TonGiaoID_us').value(data.TonGiaoID);
            $('#QuocGiaID_us').value(data.QuocTichID);
            $('#TinhID_TT_us').value(data.DiaBanHCID_TinhTT);
            $('#HuyenID_TT_us').value(data.DiaBanHCID_HuyenTT);
            $('#XaID_TT_us').value(data.DiaBanHCID_XaTT);
            $('#ThonID_TT_us').value(data.DiaBanHCID_ThonTT);
            $('#SoNha_TT_us').value(data.SoNhaTT);
            $('#DiaChiThuongTruDT_us_CLD').value(data.DiaChiCuTheTT);
            $('#TinhID_HN_us').value(data.DiaBanHCID_TinhHT);
            $('#HuyenID_HN_us').value(data.DiaBanHCID_HuyenHT);
            $('#XaID_HN_us').value(data.DiaBanHCID_XaHT);
            $('#ThonID_HN_us').value(data.DiaBanHCID_ThonHT);
            $('#SoNha_HN_us').value(data.SoNhaHT);
            $('#DiaChiThuongTruHN_us').value(data.DiaChiCuTheHT);
            $('#DoiTuongID').value(data.ThanhVienHoGDID);
            soCCCDDT = data.SoCCCD;
            $('#TinhID_TT_us').prop('disabled', true);
            $('#HuyenID_TT_us').prop('disabled', true);
            $('#XaID_TT_us').prop('disabled', true);
            $('#ThonID_TT_us').prop('disabled', true);
            $('#SoNha_TT_us').prop('disabled', true);
            $('#DiaChiThuongTruDT_us_CLD').prop('disabled', true);
            if (data.HoGiaDinhID == "00000000-0000-0000-0000-000000000000") {
                $('#SelectChuHo_CLD_US').html(`<li action="chon"><div class="opInfo"><div style="display: flex;justify-content: space-between;align-items: center;">--Chọn hộ gia đình-- <i class="fa-solid fa-caret-down" style="float: right;"></i></div></li>`);
                $('#MoiQuanHeIDDT_CLD_US').prop('disabled', true);
                $('#MoiQuanHeIDDT_CLD_US').prop('required', false);
                $('#lbMoiQuanHeIDDT_CLD_us').removeClass('validation');
                $('#SelectChuHo_CLD_US').attr('value', "");
            } else {
                var item = `<li style="display: flex"><span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;"><b>${data.HoVaTenChuHo}</b> <b>(${data.MaHoGiaDinh})</b>- Nơi thường trú : <b>${data.DiaChiCuTheHGD}</b></span> <i class="fa-solid fa-caret-down" style="float: right;margin-top: 3px;"></i></li>`;
                $('#SelectChuHo_CLD_US').attr('value', data.HoGiaDinhID);
                $('#SelectChuHo_CLD_US').html(item);
            }
            //Lưu các giá trị load dữ liệu ra vào mảng để kiểm tra 
            // Thêm giá trị vào mảng sau khi kiểm tra và thay thế
            mangGiaTriDau.push(replaceNullAndEmptyString(data.QuanHeID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayCap));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiCapID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.HoVaTen.toUpperCase()));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NgayThangNamSinh));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.NoiSinh));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.GioiTinhID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DanTocID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.TonGiaoID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.QuocTichID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheTT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_TinhHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_HuyenHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_XaHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaBanHCID_ThonHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoNhaHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.DiaChiCuTheHT));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.HoGiaDinhID));
            mangGiaTriDau.push(replaceNullAndEmptyString(data.SoCCCD));
            ResetDinhKemFile();
            NTS.canhbao("Số CMND/CCCD/Số định danh chưa được thu thập ban đầu!");
        }
    } else {
        showModalThemMoiThuThap('them', '12', $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
    }
});

//---------------------------------Sửa thông tin thu thập cung lao động biến động---------------------------------
$(document).on('click', '.btnSuaTTBienDong', function () {
    getLocation();
    loadComBoLoaiBienDong();
    $('#form_BienDong').css({ "display": 'block' });
    var ID = $(this).attr('data');
    SuaDuLieuCungLaoDong(ID, $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
    $('#lblTieuDeThemMoiThuThapCung').text('Cập nhật thu thập Cung lao động biến động');
    $('#LoaiBienDongID').prop('required', true);
    $('#lblLoaiBienDongID').addClass('validation');
    bienDong = true;
});

Grid_QuaTrinh_View.on("rowDblClick", function (e, row) {
    getLocation();
    $('#ThuThapCungLDID').val(row.getData().CungLaoDongID);
    if (row.getData().BienDong == 1) {
        $('#ThuThapCungLDID').val(row.getData().CungLaoDongID);
        loadComBoLoaiBienDong();
        $('#form_BienDong').css({ "display": 'block' });
        SuaDuLieuCungLaoDong(row.getData().CungLaoDongID, $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
        $('#lblTieuDeThemMoiThuThapCung').text('Cập nhật thu thập Cung lao động biến động');
        $('#LoaiBienDongID').prop('required', true);
        $('#lblLoaiBienDongID').addClass('validation');
        bienDong = true;
    } else {
        $('#ThuThapCungLDID').val(row.getData().CungLaoDongID);
        $('#form_BienDong').css({ "display": 'none' });
        SuaDuLieuCungLaoDong(row.getData().CungLaoDongID, $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
        $('#lblTieuDeThemMoiThuThapCung').text('Cập nhật thu thập Cung lao động ban đầu');
        $('#LoaiBienDongID').prop('required', false);
        $('#lblLoaiBienDongID').removeClass('validation');
        bienDong = false;
    }
});

//---------------------------------Lấy dữ liệu kinh độ, vĩ độ thu thập---------------------------------
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            // tọa độ người dùng: position.coords.latitude, position.coords.longitude
            $('#KinhDoCungLaoDong').value(position.coords.longitude);
            $('#ViDoCungLaoDong').value(position.coords.latitude);
        });
    }
}

//---------------------------------Sửa thông tin thu thập cung lao động ban đầu ---------------------------------
$(document).on('click', '.btnSuaTTBanDau', function () {
    getLocation();
    var ID = $(this).attr('data');
    SuaDuLieuCungLaoDong(ID, $('#TinhID_TimKiem_us').value(), $('#HuyenID_TimKiem_us').value(), $('#XaID_TimKiem_us').value(), $('#ThonID_TimKiem_us').value(), '');
});

//Xóa đính kèm
function RemoveAllFileInputAce() {
    var bang = "CungLaoDong";
    var cot = "CungLaoDongID";

    CanhBaoXoa(() => {
        var result = NTS.getAjax('/DanhMuc/DungChung/XoaDinhKemCungLaoDong', { ID: $('#ThuThapCungLDID').val(), duongDan: '', bangDk: bang, cotDk: cot, loai: 'all' });
        if (!result.Err) {
            NTS.thanhcong(result.Msg);
            $('#txtDinhKem_VanBan_USDT').value("");
            ResetDinhKemFile();
            old_ItemFile = "";
            //$('#txtDinhKem_VanBan_US').value($('#txtDinhKem_VanBan_US').value().replaceAll(ListFile[i], '').replaceAll('**', '*'));
        }
        else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    });
}
var positionRemoveItiem = new Array();
$(document).on('click', '.XoaFileDinhKemDT', function () {
    var CungLaoDongID = $('#ThuThapCungLDID').value();
    var TenFile = $(this).parent().attr('data-title');
    var ListFile = $('#txtDinhKem_VanBan_USDT').value().split('*');
    //Kiểm tra xem file xóa có phải là file vừa mới upload hay không - nếu là file vừa mới upload thì cho vào list xóa để không upload vào server
    if (!$(this).hasClass('img-db')) {
        var indexRemove = $('.XoaFileDinhKemDT').index(this);
        positionRemoveItiem.push(indexRemove);
    }
    //
    CanhBaoXoa(() => {
        for (var i = 0; i < ListFile.length; i++) {
            if (ListFile[i].includes(TenFile)) {
                var bang = "CungLaoDong";
                var cot = "CungLaoDongID";
                var result = NTS.getAjax('/DanhMuc/DungChung/XoaDinhKemCungLaoDong', { ID: CungLaoDongID, duongDan: ListFile[i], bangDk: bang, cotDk: cot, loai: '' });

                if (!result.Err) {
                    NTS.thanhcong(result.Msg);
                    $('#txtDinhKem_VanBan_USDT').value($('#txtDinhKem_VanBan_USDT').value().replaceAll(ListFile[i], '').replaceAll('**', '*'))
                }
                else {
                    NTS.loi(result.Msg);
                }
            }
        }
        //$(this).parent().css('display', 'none');
        //if ($('#HoSoKemTheo_USDangKy').parent().find('.ace-file-name').length == 1 && $('#HoSoKemTheo_USDangKy').parent().find('.ace-file-name').css('display') == "none") {
        //    ResetDinhKemFile();
        //}
        $(this).parent().remove();
        if ($('#HoSoKemTheo_USDangKy').parent().find('.ace-file-name').length == 0) {
            ResetDinhKemFile();
        }
    });
    //
    HienThiTatCaHoGiaDinh_CLD
});