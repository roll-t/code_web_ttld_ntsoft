var tempthem = "them";
$(function () {
    LoadDataTable();
    loadCombo();
    $(document).on('shown.bs.modal', '#mdThemMoi', function () {
        hotKey = 1;
    });
    $(document).on('hidden.bs.modal', '#mdThemMoi', function () {
        hotKey = 0;
    });
    $('.modal').each(function (index) {
        $(this).find('select').attr('data-dropdown-parent', '#' + $(this).attr('id') + ' .modal-body')
    });
});
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
function LoadDataTable() {
    table.clearData();
    const GetAll = NTS.getAjax("/HeThong/NhomBaoCao/GetAll", {});
    if (!GetAll.Err) {
        table.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}
var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().NhomBaoCaoID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().NhomBaoCaoID);
}
var table = new Tabulator("#Grid1", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "550",
    HeaderVertAlign: "center",
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', formatter: fmThaoTac, headerSort: false, headerHozAlign: "Center", hozAlign: "center", vertAlign: "middle", field: "ThaoTac", width: 60, print: false },
        { title: "NhomBaoCaoID", field: "NhomBaoCaoID", visible: false, print: false },
        { title: "Mã", field: "MaNhomBaoCao", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", width: 150 },
        { title: "Tên nhóm báo cáo", field: "TenNhomBaoCao", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", width: 450 },
        { title: "Đối tượng áp dụng", field: "DoiTuongApDung", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", width: 250 },
        { title: "Diễn giải", field: "GhiChu", hozAlign: "left", headerHozAlign: "center", formatter: "textarea", minWidth: 300 },
        { title: "Trạng thái sử dụng", field: "DangSD", headerWordWrap: true, hozAlign: "center", vertAlign: "middle", formatter: fmDangSD, headerSort: false, width: 135, headerHozAlign: "center" }
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
checkDangSD('.checkDangSD', 'NhomBaoCao', 'NhomBaoCaoID');

$('#DangSD').on('change', function () {
    UpdateLabelDangSD(this);
});
table.on("rowDblClick", function (e, row) {
    $('#NhomBaoCaoID').val(row.getData().NhomBaoCaoID);
    SuaDuLieu(row.getData().NhomBaoCaoID);
});
$(document).on('click', '#btnThemMoi', function () {
    if (!QuyenThem()) {
        return false;
    }
    ThemDuLieu();
});
$(document).on('click', '.btnSuaGrid1', function () {
    $('#NhomBaoCaoID').val($(this).attr('data'));
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
    $('#mdThemMoi').modal('show');
    $('#lblTieuDeThemMoi').text("Thêm mới thông tin nhóm báo cáo");
    $('#NhomBaoCaoID').value('');

    $('#DoiTuongApDung').value('-');
    resetForm('#mdThemMoi');
    //const MaTuTang = NTS.getAjax("/DanhMuc/DungChung/LayMaTuTang", { strKyTu: '', strCotTang: 'MaNhomBaoCao', strBangTang: 'NhomBaoCao', strDinhDang: '0' });
    //if (!MaTuTang.Err) {
    //    $('#MaNhomBaoCao').value(MaTuTang.Result);
    //}
    $('#DangSD').value(true);
    UpdateLabelDangSD('#DangSD');
    tempthem = "them";
}
function SuaDuLieu(ID) {
    loadCombo();
    if (!QuyenSua()) {
        return false;
    }
    $('#lblTieuDeThemMoi').text('Cập nhật thông tin nhóm báo cáo');
    const result = NTS.getAjax('/HeThong/NhomBaoCao/LoadDuLieuSua', { id: ID });
    if (!result.Err && result.Result != null) {
        debugger
        let data = result.Result[0];
        $('#MaNhomBaoCao').value(data.MaNhomBaoCao);
        $('#TenNhomBaoCao').value(data.TenNhomBaoCao);
        $('#GhiChu').value(data.GhiChu);

        $('#DoiTuongApDung').value('-');
        $('#DoiTuongApDung').value(data.DoiTuongApDung != "" ? JSON.parse(data.DoiTuongApDung).filter(item => item != "") : "-");

        $('#NhomBaoCaoID').value(data.NhomBaoCaoID);
        $('#DangSD').value(data.TrangThai);
        UpdateLabelDangSD('#DangSD');
        $('#mdThemMoi').modal('show');
        tempthem = "sua";
    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
}
function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    const result_ktxoa = NTS.getAjax('../DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'NhomBaoCaoID', ID: ID, TenBangHienTai: 'NhomBaoCao', CacBangKhongXet: ['DonVi'] });

    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/HeThong/NhomBaoCao/XoaDuLieu', { id: ID });
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
    param[1] = $('#MaNhomBaoCao').value();
    param[2] = $('#TenNhomBaoCao').value();
    param[3] = $('#GhiChu').value();
    param[4] = $('#DoiTuongApDung').value() != "" ? JSON.stringify($('#DoiTuongApDung').value().filter(item => item != "")) : "";
    param[5] = $('#NhomBaoCaoID').value();
    param[6] = $('#DangSD').value();

    const result = NTS.getAjax("/HeThong/NhomBaoCao/LuuThongTin", { data: param });
    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        $('#mdThemMoi').modal('hide');
        return false;
    } else
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
});

