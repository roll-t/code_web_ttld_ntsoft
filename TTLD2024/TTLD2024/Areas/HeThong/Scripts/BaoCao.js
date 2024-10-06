var tempthem = "them";
function loadCombo() {
    NTS.loadDataCombo({
        name: '#DoiTuongApDung',
        ajaxUrl: '/HeThong/NhomNguoiDung/GetAllUserGroup',
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
}
$(function () {
    loadCombo();
    LoadDataTable();
    $(document).on('shown.bs.modal', '#mdThemMoi', function () {
        hotKey = 1;
    });
    $(document).on('hidden.bs.modal', '#mdThemMoi', function () {
        hotKey = 0;
    });
});
var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().BaoCaoID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().BaoCaoID);
}
var table = new Tabulator("#Grid1", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "600",
    groupBy: ["ThuocNhomBC"],
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', formatter: fmThaoTac, headerSort: false, headerHozAlign: "Center", hozAlign: "center", vertAlign: "middle", field: "ThaoTac", width: 60, print: false },
        { title: "BaoCaoID", field: "BaoCaoID", visible: false, print: false },
        { title: "Mã", field: "MaBaoCao", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", visible: true, width: 100 },
        { title: "Ký hiệu mẫu biểu", field: "KyHieuMauBieu", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", visible: true, width: 100 },
        { title: "Tên báo cáo", field: "TenBaoCao", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", width: 450 },
        { title: "Nhóm báo cáo", field: "ThuocNhomBC", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", width: 450, visible: false },
        { title: "Đường dẫn", field: "DuongDan", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", width: 300 },
        { title: "Đối tượng áp dụng", field: "DoiTuongApDung", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", width: 250 },
        { title: "Diễn giải", field: "GhiChu", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", minWidth: 300 },
        { title: "Trạng thái sử dụng", field: "DangSD", headerWordWrap: true, hozAlign: "center", vertAlign: "middle", formatter: fmDangSD, headerSort: false, width: 135, headerHozAlign: "center" }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
function LoadNhomBaoCao() {
    NTS.loadDataCombo({
        name: '#NhomBaoCaoID',
        ajaxUrl: '/HeThong/BaoCao/GetNhomBaoCao',
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
}
function LoadDataTable() {
    table.clearData();
    const GetAll = NTS.getAjax("/HeThong/BaoCao/GetAll", {});
    if (!GetAll.Err) {
        table.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}
// sửa DangSD, MacDinhSD trực tiếp trên lưới
checkDangSD('.checkDangSD', 'BaoCao', 'BaoCaoID');
$('#DangSD').on('change', function () {
    UpdateLabelDangSD(this);
});
$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        table.setFilter(matchAny, { value: $(this).val() });
    }
});

table.on("rowDblClick", function (e, row) {
    $('#BaoCaoID').val(row.getData().BaoCaoID);
    SuaDuLieu(row.getData().BaoCaoID);
});
$(document).on('click', '#btnThemMoi', function () {
    if (!QuyenThem()) {
        return false;
    }
    ThemDuLieu();
});
$(document).on('click', '.btnSuaGrid1', function () {
    $('#BaoCaoID').val($(this).attr('data'));
    SuaDuLieu($(this).attr('data'));
});
$(document).on('click', '.btnXoaGrid1', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    XoaDuLieu(ID);
});

function ThemDuLieu() {
    loadCombo();
    resetForm('#mdThemMoi');
    //const MaTuTang = NTS.getAjax("/DanhMuc/DungChung/LayMaTuTang", { strKyTu: '', strCotTang: 'MaBaoCao', strBangTang: 'BaoCao', strDinhDang: '0' });
    //if (!MaTuTang.Err) {
    //    $('#MaBaoCao').value(MaTuTang.Result);
    //}
    $('#mdThemMoi').modal('show');
    $('#DoiTuongApDung').value('-');
    $('#lblTieuDeThemMoi').text("Thêm mới thông tin báo cáo");
    $('#BaoCaoID').val("");
    LoadNhomBaoCao();
    $('#DangSD').prop('checked', true);
    UpdateLabelDangSD('#DangSD');
    tempthem = "them";
}
function SuaDuLieu(ID) {
    loadCombo();
    if (!QuyenSua()) {
        return false;
    }
    $('#lblTieuDeThemMoi').text('Cập nhật thông tin báo cáo');
    const result = NTS.getAjax('/HeThong/BaoCao/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        let data = result.Result[0];
        LoadNhomBaoCao();
        $('#MaBaoCao').value(data.MaBaoCao);
        $('#KyHieuMauBieu').value(data.KyHieuMauBieu);
        $('#TenBaoCao').value(data.TenBaoCao);
        $('#NhomBaoCaoID').value(data.NhomBaoCaoID);
        $('#DuongDan').value(data.DuongDan);
        $('#GhiChu').value(data.GhiChu);

        $('#DoiTuongApDung').value('-');
        $('#DoiTuongApDung').value(data.DoiTuongApDung != "" ? JSON.parse(data.DoiTuongApDung).filter(item => item != "") : "-");

        $('#mdThemMoi').modal('show');
        $('#DangSD').value(data.TrangThai);
        UpdateLabelDangSD('#DangSD');
        tempthem = "sua";
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
}
function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'BaoCaoID', ID: ID, TenBangHienTai: 'BaoCao', CacBangKhongXet: [] });

    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/HeThong/BaoCao/XoaDuLieu', { id: ID });
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

$('#btnLuuVaDong').on('click', function () {
    const validate = new NTSValidate('#mdThemMoi');
    if (!validate.trim().check()) {
        return false;
    }
    var param = new Array();
    param[0] = tempthem;
    param[1] = $('#MaBaoCao').value();
    param[2] = $('#KyHieuMauBieu').value();
    param[3] = $('#TenBaoCao').value();
    param[4] = $('#NhomBaoCaoID').value();
    param[5] = $('#DuongDan').value();
    param[6] = $('#GhiChu').value();
    param[7] = $('#DangSD').value();
    param[8] = $('#BaoCaoID').value();
    param[9] = $('#DoiTuongApDung').value() != "" ? JSON.stringify($('#DoiTuongApDung').value().filter(item => item != "")) : "";
    const result = NTS.getAjax("/HeThong/BaoCao/LuuThongTin", { data: param });
    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        $('#mdThemMoi').modal('hide');
        return false;
    } else
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
});