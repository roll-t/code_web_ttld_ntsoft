var tempthem = "them";
var UserGroupCode = NTS.getAjax("/api/UserGroupCode", {});
$(document).on('click', '#btnTaoMaDonVi', function () {
    if (isEmty($('#DonViIDCha').val())) {
        NTS.canhbao('Vui lòng chọn đơn vị cấp trên để tạo mã đơn vị!');
        return false;
    }
    var param = new Array();
    param[0] = $("#DonViIDCha").value();
    var duLieu = NTS.getAjax("/HeThong/DonVi/TaoMaDonVi", { param: param });
    if (duLieu != "") {
        $("#MaDonVi").value(duLieu[0].MaDonVi)
    }
});
$(function () {
    LoadTimKiem_us();
    //$('#TinhID').on('change', function () {
    //    NTS.loadDataCombo({
    //        name: '#HuyenID',
    //        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
    //        ajaxParam: { id: $(this).val() },
    //        indexValue: 0,
    //        indexText: 2,
    //        textShowTatCa: '-Chọn-',
    //        showTatCa: !0
    //    });
    //});
    //$('#TinhID').on('change', function () {
    //    NTS.loadDataCombo({
    //        name: '#HuyenID',
    //        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
    //        ajaxParam: { id: $(this).val() },
    //        indexValue: 0,
    //        indexText: 2,
    //        textShowTatCa: '-Chọn-',
    //        showTatCa: !0
    //    });
    //    NTS.loadDataCombo({
    //        name: '#XaID',
    //        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
    //        ajaxParam: { id: '' },
    //        indexValue: 0,
    //        indexText: 2,
    //        textShowTatCa: '-Chọn-',
    //        showTatCa: !0
    //    });
    //    NTS.loadDataCombo({
    //        name: '#ThonID',
    //        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
    //        ajaxParam: { id: '' },
    //        indexValue: 0,
    //        indexText: 2,
    //        textShowTatCa: '-Chọn-',
    //        showTatCa: !0
    //    });
    //});
    //$('#HuyenID').on('change', function () {
    //    var DataXa = new Array();
    //    DataXa[0] = $('#TinhID').value();
    //    DataXa[1] = $(this).val();
    //    NTS.loadDataCombo({
    //        name: '#XaID',
    //        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
    //        ajaxParam: { id: $(this).val() },
    //        indexValue: 0,
    //        indexText: 2,
    //        textShowTatCa: '-Chọn-',
    //        showTatCa: !0
    //    });
    //});
    //$('#XaID').on('change', function () {
    //    var DataThon = new Array();
    //    DataThon[0] = $('#HuyenID').value();
    //    DataThon[1] = $(this).val();
    //    NTS.loadDataCombo({
    //        name: '#XaID',
    //        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
    //        ajaxParam: { id: $(this).val() },
    //        indexValue: 0,
    //        indexText: 2,
    //        textShowTatCa: '-Chọn-',
    //        showTatCa: !0
    //    });
    //});

    if (UserGroupCode.Result != 'Admin') {
        $('#divDangSD').hide();
    }
    LoadGridDonViMain();
    setTimeout(() => { LoadGridDonViMain(); }, 100);
    setTimeout(() => { LoadGrid_ChonDonVi_us(); }, 100);

});
function LoadTimKiem_us() {
    setTimeout(function () {
        NTS.loadDataCombo({
            name: '#DonViID_Cha_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDonVi',
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '(Tất cả)',
            showTatCa: !0
        });
        NTS.loadDataCombo({
            name: '#TinhID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCTinh_Combo',
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '(Tất cả)',
            showTatCa: !0
        });
        NTS.loadDataCombo({
            name: '#HuyenID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
            ajaxParam: { id: '' },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '(Tất cả)',
            showTatCa: !0
        });
        NTS.loadDataCombo({
            name: '#XaID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
            ajaxParam: { id: '' },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '(Tất cả)',
            showTatCa: !0
        });
        NTS.loadDataCombo({
            name: '#ThonID_TimKiem_us',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
            ajaxParam: { id: '' },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '(Tất cả)',
            showTatCa: !0
        });
        NTS.loadDataCombo({
            name: '#TinhID',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCTinh_Combo',
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '(Tất cả)',
            showTatCa: !0
        });
        NTS.loadDataCombo({
            name: '#HuyenID',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
            ajaxParam: { id: '' },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '(Tất cả)',
            showTatCa: !0
        });
        NTS.loadDataCombo({
            name: '#XaID',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
            ajaxParam: { id: '' },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '(Tất cả)',
            showTatCa: !0
        });
        NTS.loadDataCombo({
            name: '#ThonID',
            ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
            ajaxParam: { id: '' },
            columns: 2,
            indexValue: 0,
            indexText1: 2,
            textShowTatCa: '(Tất cả)',
            showTatCa: !0
        });
    }, 100);

} $(document).on('change', '#DonViID_Cha_TimKiem', function () {
    NTS.loadDataCombo({
        name: '#DonViID_Cha_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDonVi',
        ajaxParam: { id: '' },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '(Tất cả)',
        showTatCa: !0
    });
});
$(document).on('change', '#TinhID_TimKiem_us', function () {
    NTS.loadDataCombo({
        name: '#HuyenID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
        ajaxParam: { id: $('#TinhID_TimKiem_us').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '(Tất cả)',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#XaID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: '' },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '(Tất cả)',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#ThonID_TimKiem_us',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: '' },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '(Tất cả)',
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
        textShowTatCa: '(Tất cả)',
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

/*  

*/

$(document).on('change', '#TinhID', function () {
    NTS.loadDataCombo({
        name: '#HuyenID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
        ajaxParam: { id: $('#TinhID').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '(Tất cả)',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#XaID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: '' },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '(Tất cả)',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#ThonID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: '' },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '(Tất cả)',
        showTatCa: !0
    });

});
$(document).on('change', '#HuyenID', function () {
    NTS.loadDataCombo({
        name: '#XaID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: $('#HuyenID').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '(Tất cả)',
        showTatCa: !0
    });
});
$(document).on('change', '#XaID', function () {
    NTS.loadDataCombo({
        name: '#ThonID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCThon_Combo',
        ajaxParam: { id: $('#XaID').value() },
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '(Tất cả)',
        showTatCa: !0
    });
});
//XỬ LÝ TÌM KIẾM NÂNG CAO
$(document).on('click', '#TimKiemNangCao', function () {
    if ($('#KhungTimKiem').css('display') == "block") {
        $('#KhungTimKiem').slideUp(200);
    } else {
        $('#KhungTimKiem').slideDown(200);
        /*LoadTimKiem();*/
    }
    return false;
});
$(document).on('click', '#DongTimKiem', function () {
    $('#KhungTimKiem').slideUp(200);
    return false;
});
function LoadCombo() {
    NTS.loadDataCombo({
        name: '#TinhID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCTinh_Combo',
        columns: 2,
        indexValue: 0,
        indexText1: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    NTS.loadDataCombo({
        name: '#HuyenID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCHuyen_Combo',
        ajaxParam: { id: '' },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
    var DataXa = new Array();
    DataXa[0] = '';
    DataXa[1] = '';
    NTS.loadDataCombo({
        name: '#XaID',
        ajaxUrl: '/DanhMuc/DungChung/GetDiaBanHCXa_Combo',
        ajaxParam: { id: '' },
        indexValue: 0,
        indexText: 2,
        textShowTatCa: '-Chọn-',
        showTatCa: !0
    });
};
$(document).on('click', '#TimKiem', function () {
    LoadDuLieu();
    $('#KhungTimKiem').slideUp(200);
    return false;
});
//XỬ LÝ CHANGE
$('#DangSD').on('change', function () {
    UpdateLabelDangSD(this);
});
function LoadDuLieu() {
    LoadGridDonViMain();
};
//XỬ LÝ LƯỚI DANH SÁCH
var fmThaoTac = function (cell) {
    return formaterbtnThaoTac3(cell.getData().DonViID, 'btnSuaGrid1', 'btnXoaGrid1');
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().DonViID);
}

function checkDangSDDonVi(selector, tenBang, tenCot) {
    $(document).on('change', selector, function () {
        var inp = $(this);
        var id = $(this).attr('data');
        if (!QuyenSua()) {
            inp.prop('checked', !inp.prop('checked'));
            return false;
        }
        $.confirm({
            title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
            type: 'blue',
            icon: 'fa fa-question-circle',
            typeAnimated: true,
            theme: 'material',
            columnClass: 'col-md-5 col-md-offset-3 w-max-400px',
            content: NTS.CauCanhBaoDangSD,
            buttons: {
                confirm: {
                    text: '<i class="fa fa-check"></i> Có',
                    btnClass: 'btn-primary',
                    keys: ['enter'],
                    action: function () {
                        var result = NTS.getAjax('/HeThong/DonVi/LuuCotDangSD', { ID: id, strCotID: tenCot, strBang: tenBang, value: inp.prop('checked') });
                        if (!result.Err) {
                            NTS.thanhcong(result.Msg);
                        }
                        else {
                            NTS.canhbao(result.Msg);
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
checkDangSDDonVi('.checkDangSD', 'DonVi', 'DonViID');

function AnHienCot2_2(LoaiLoai) {
    var table_;

    table_ = GridDonViMain;
    if ($('#Cap2_2').value() == '2') {
        table_.showColumn('Cap2')
        table_.hideColumn('Cap3')
        table_.hideColumn('Cap4')
        table_.hideColumn('Cap5')
    }
    if ($('#Cap2_2').value() == '3') {
        table_.showColumn('Cap2')
        table_.showColumn('Cap3')
        table_.hideColumn('Cap4')
        table_.hideColumn('Cap5')
    }
    if ($('#Cap2_2').value() == '4') {
        table_.showColumn('Cap2')
        table_.showColumn('Cap3')
        table_.showColumn('Cap4')
        table_.hideColumn('Cap5')
    }
    if ($('#Cap2_2').value() == '5') {
        table_.showColumn('Cap2')
        table_.showColumn('Cap3')
        table_.showColumn('Cap4')
        table_.showColumn('Cap5')
    }
    GridDonViMain.redraw();
    return false;
}

var GridDonViMain = new Tabulator("#GridDonViMain", {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "80vh",
    //groupBy: "TenDonVi_Cha",
    vertAlign: "middle",
    columns: [
        { title: '<i class="fa fa-ellipsis-h"></i>', vertAlign: "middle", headerSort: false, headerHozAlign: "center", hozAlign: "center", field: "ThaoTac", width: 60, formatter: fmThaoTac, print: false },
       
        /*{ title: "Mã", field: "MaDonVi", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", visible: true, width: 150 },*/
        {
            title: `<div class="row" style="align-items: center;">
                      <div  class="col-md-9 ">
                            <label class="form-label" style="margin: 0 auto;" >Mã</label>
                     </div>
                    <div class="col-md-3">
                    <div style="width: 70px;float: right;padding-left: 5px;" >
                    <select class="form-control " tabindex="0" onchange="AnHienCot2_2('2_2'); return false;" id="Cap2_2"">
                                                <option value="2">Cấp 2</option>
                                                <option value="3">Cấp 3</option>
                                                <option value="4">Cấp 4</option>
                                                <option value="5">Cấp 5</option>
                                             </select>
                    </div>
                    </div>
                    </div>`, headerHozAlign: "center", headerHozAlign: "center", vertAlign: "middle", hozAlign: "center",
            columns: [
                { title: "Cấp 1", field: "Cap1", formatter: 'textarea', width: 70, vertAlign: "middle", headerHozAlign: "center" },
                { title: "Cấp 2", field: "Cap2", formatter: 'textarea', width: 70, vertAlign: "middle", headerHozAlign: "center" },
                { title: "Cấp 3", field: "Cap3", formatter: 'textarea', width: 70, vertAlign: "middle", headerHozAlign: "center" },
                { title: "Cấp 4", field: "Cap4", formatter: 'textarea', width: 70, vertAlign: "middle", headerHozAlign: "center" },
                { title: "Cấp 5", field: "Cap5", formatter: 'textarea', width: 70, vertAlign: "middle", headerHozAlign: "center" },
            ],
        },
        { title: "DonViID", field: "DonViID", visible: false, print: false },
        { title: "Tên đơn vị", field: "TenDonVi", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 350 },
        { title: "Đơn vị cấp trên", field: "TenDonVi_Cha", formatter: 'textarea', headerHozAlign: "center", hozAlign: "left", vertAlign: "middle", minWidth: 350 },
        { title: "Trạng thái sử dụng", field: "DangSD", headerWordWrap: true, hozAlign: "center", vertAlign: "middle", formatter: fmDangSD, headerSort: false, width: 135, headerHozAlign: "center" }
    ],
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});

GridDonViMain.on("rowDblClick", function (e, row) {
    $('#DonViID').val(row.getData().DonViID);
    SuaDuLieu(row.getData().DonViID);
});
async function LoadGridDonViMain() {
    var saveData = new Array();
    saveData[0] = $('#DonViID_Cha_TimKiem_us').value();
    saveData[1] = $('#TinhID_TimKiem_us').value();
    saveData[2] = $('#HuyenID_TimKiem_us').value();
    saveData[3] = $('#XaID_TimKiem_us').value();
    saveData[4] = $('#ThonID_TimKiem_us').value();
    GridDonViMain.clearData();
    $('#Cap2_2').value(3);
    const GetAll = NTS.getAjax("/HeThong/DonVi/GetAll", { data: saveData });
    if (!GetAll.Err) {
        GridDonViMain.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
   /* $('#Cap2_2').select2({ width: '100%' });*/
};
$(document).on('keyup', '#timKiemDonVi', function (e) {
    if (e.keyCode == '13') {
        GridDonViMain.setFilter(matchAny, { value: $(this).val() });
    }
});
//XỬ LÝ THÊM XÓA SỬA
$(document).on('click', '#btnThemMoi', function () {
    $('#lblTieuDeModal').text('Thêm mới thông tin đơn vị');
    $('#MaDonVi').prop('disabled', false);
    $('#mdThemMoi').modal('show');
    $('#hdf_DonViID').value('');
    resetForm('#mdThemMoi');
    $('#DangSD').value(1);
    LoadCombo();
    tempthem = "them";
    $('.btnChonDonViCha-span').css({ 'display': 'block' });
    return false;
});
async function SuaDuLieu(ID) {
    $('#lblTieuDeModal').text('Cập nhật thông tin đơn vị');
    $('#MaDonVi').prop('disabled', true);
    $('#mdThemMoi').modal('show');
    tempthem = "sua";
    var KT = await NTS.getAjaxAsync("/HeThong/DonVi/KiemTraQuyen", {});
    if (!KT.Result) {
        if (tempthem == "sua") {
            $('.btnChonDonViCha-span').css({ 'display': 'none' });
        }
    }
    var data = await NTS.getAjaxAsync('/HeThong/DonVi/LoadDuLieuSua', { id: ID });
    if (!$.isEmptyObject(data.Result)) {
        LoadCombo();
        var DuLieu = data.Result.Table[0];
        $('#hdf_DonViID').value(ID);
        $('#MaDonVi').value(DuLieu.MaDonVi);
        $('#MaQHNS').value(DuLieu.MaQHNS);
        $('#TenDonVi').value(DuLieu.TenDonVi);
        $('#DonViIDCha').value(DuLieu.DonViID_Cha);
        $('#MaDonVi_Cha').value(DuLieu.DonViCode_Cha);
        $('#TenDonVi_Cha').value(DuLieu.TenDonVi_Cha);
        $('#DiaChi').value(DuLieu.DiaChi);
        $('#TinhID').value(DuLieu.TinhID_);
        $('#HuyenID').value(DuLieu.HuyenID_);
        $('#XaID').value(DuLieu.XaID_);
        $('#ThonID').value(DuLieu.ThonID_);
        $('#MaSoThue').value(DuLieu.MaSoThue);
        $('#DienThoai').value(DuLieu.SoDienThoai);
        $('#Fax').value(DuLieu.Fax);
        $('#Email').value(DuLieu.Email);
        $('#DangSD').value(DuLieu.DangSD);

    } else {
        NTS.canhbao('Không tìm thấy dữ liệu!');
    }
    return false;
}
$(document).on('click', '.btnSuaGrid1', async function () {
    SuaDuLieu($(this).attr('data'));
    return false;
});



$(document).on('click', '#btnLuuVaDong', function () {
    console.log("btnLuuVaDong clicked!");
    if (isEmty($('#MaDonVi').val())) {
        NTS.canhbao('Vui lòng tạo mã đơn vị!');
        return false;
    }
    if (isEmty($('#TenDonVi').val())) {
        NTS.canhbao('Tên đơn vị không được bỏ trống!');
        return false;
    }
    const validate = new NTSValidate('#mdThemMoi');
    if (!validate.trim().check()) {
        return false;
    }
    var saveData = new Array();

    saveData[0] = $('#hdf_DonViID').value();
    saveData[1] = $('#MaDonVi').value();
    saveData[2] = $('#MaQHNS').value();
    saveData[3] = $('#TenDonVi').value();
    saveData[4] = $('#DonViIDCha').value();
    saveData[5] = $('#DiaChi').value();
    saveData[6] = $('#TinhID').value();
    saveData[7] = $('#HuyenID').value();
    saveData[8] = $('#XaID').value();
    saveData[9] = $('#ThonID').value();
    saveData[10] = $('#MaSoThue').value();
    saveData[11] = $('#DienThoai').value();
    saveData[12] = $('#Fax').value();
    saveData[13] = $('#Email').value();
    saveData[14] = $('#DangSD').value();


    var result = NTS.getAjax('/HeThong/DonVi/LuuThongTin', { data: saveData });
    if (!result.Err) {
        $('#hdf_DonViID').value(result.Result.DonVi[0].DonViID);
        NTS.thanhcong(result.Msg);
        $('#mdThemMoi').modal('hide');
        LoadGridDonViMain();
        LoadTimKiem_us();
        return true;
    } else
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
    return false;
});
//chọn đơn vị
var KTr = '0';
$(document).on('click', '#btnChonDonViCha', async function () {

    var KT = await NTS.getAjaxAsync("/HeThong/DonVi/KiemTraQuyen", {});
    if (KT.Result) {
        $('#mdChonDonVi_us').modal('show');
        KTr = '0';
        LoadGrid_ChonDonVi_us();
    }
    else if (tempthem == "them") {
        $('#mdChonDonVi_us').modal('show');
        KTr = '0';
        LoadGrid_ChonDonVi_us();
    }
    else {
        return false;
    }
    return false;
});


//$(document).on('click', '#btnChonDonViCha', async function () {
//    ;
//    var KT = await NTS.getAjaxAsync("/HeThong/DonVi/KiemTraQuyen", {});
//    if (KT.Result) {
//        LoaiChonDonVi = "DVC";
//        $('#mdChonDonVi_us').modal('show');
//        Grid_ChonDonVi_us.clearData();
//        var GetAll = await NTS.getAjaxAsync("/HeThong/DonVi/GetAllChonDonVi", { ID: $('#hdf_DonViID').val() });
//        if (!GetAll.Err) {
//            Grid_ChonDonVi_us.setData(GetAll.Result);
//            Grid_ChonDonVi_us.redraw(true)
//        }
//        else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
//    }
//    else if (tempthem == "them") {
//        LoaiChonDonVi = "DVC";
//        $('#mdChonDonVi_us').modal('show');
//        Grid_ChonDonVi_us.clearData();
//        var GetAll = await NTS.getAjaxAsync("/HeThong/DonVi/GetAllChonDonVi", { ID: $('#hdf_DonViID').val() });
//        if (!GetAll.Err) {
//            Grid_ChonDonVi_us.setData(GetAll.Result);
//            Grid_ChonDonVi_us.redraw(true)
//        }
//        else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
//    }
//    else {
//        NTS.canhbao('Bạn không có quyền thao tác!');
//        return false;
//    }
//});
$(document).on('click', '#btnChonDonViKTDT', async function () {
    $('#mdChonDonVi_us').modal('show');
    KTr = '1';
    LoadGrid_ChonDonVi_us();
    return false;
});

$(document).on('click', '#btnChonDonViVaDong_us', function () {
    if (Grid_ChonDonVi_us.getSelectedRows().length == 0) {
        NTS.canhbao('Vui lòng chọn 1 đơn vị!');
        return false;
    }
    var data = Grid_ChonDonVi_us.getSelectedRows()[0]._row.data;
    if (KTr == '0') {
        $('#MaDonVi_Cha').value(data.MaDonVi);
        $('#TenDonVi_Cha').value(data.TenDonVi);
        $('#DonViIDCha').value(data.DonViID);
    }
    else if (KTr == '1') {
        $('#MaDonVi_KTDT').value(data.MaDonVi);
        $('#TenDonVi_KTDT').value(data.TenDonVi);
        $('#DonViID_KTDT').value(data.DonViID);
    }
    $('#mdChonDonVi_us').modal('hide');
    $('#mdThemMoi').modal('show');
    return false;
});
$(document).on('click', '#btnDong_us', async function () {
    $('#mdChonDonVi_us').modal('hide');
});

$(document).on('click', '.btnXoaGrid1', function () {
    if (!QuyenXoa()) {
        return false;
    }
    var ID = $(this).attr('data');
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'DonViID', ID: ID, TenBangHienTai: 'DonVi', CacBangKhongXet: [] });

    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/HeThong/DonVi/XoaDuLieu', { id: ID });
                if (!result.Err) {
                    LoadGridDonViMain();
                    LoadTimKiem_us();
                    NTS.thanhcong(result.Msg);
                }
                else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
            });
        }
        else CanhBaoDuLieuDangSD(result_ktxoa.Result);
    }
    // Lỗi khi kiểm tra xóa
    else result_ktxoa.CanhBao ? NTS.canhbao(result_ktxoa.Msg) : NTS.loi(result_ktxoa.Msg);
});

//XỬ LÝ NHẬP EXCEL
$(document).on('click', '#btnNhapExcel', function () {
    $('#mdNhapExcel').modal('show');
    Path = "";
    var clearNoiDung = NTS.getAjax('/HeThong/DonVi/ResetExcel');
    $('#TenSheet').html('');
    document.getElementById("DuLieu").style.display = "none";
    $('#lblTenFile_us').html('<b>Tên file: </b>Không có tệp nào đươc chọn');
    GridExcel.clearData();
    $('#SoDongNhan').text("Số dòng nhận từ file: --");
    $('#SoDongHopLe').text("Số dòng hợp lệ: --");
    $('#SoDongLoi').text("Số dòng lỗi: --");
    $('#chkGhiDe').value(false);

});
function TaiFileMau() {
    //console.log("TaiFileMau Clicked!");
    var data = NTS.getAjax("/HeThong/DonVi/TaiFileMau", {});
    window.open(data, ".xlsx");
}

$('#btnTaiFileKiemTra').click(function () {
    var data = NTS.getAjax('/HeThong/DonVi/TaiFileExcelKiemTra', {});
    window.open(data);
});

$(document).on('click', '#btnChonTepVB_us', function () {
    console.log("btnChonTepVB_us Clicked!");
    $('#fileVB_us').value('');
    Path = "";
    var clearNoiDung = NTS.getAjax('/HeThong/DonVi/ResetExcel');
    $('#TenSheet').html('');
    document.getElementById("DuLieu").style.display = "none";
    $('#lblTenFile_us').html('<b>Tên file: </b>Không có tệp nào đươc chọn');
    GridExcel.clearData();
    $('#SoDongNhan').text("Số dòng nhận từ file: --");
    $('#SoDongHopLe').text("Số dòng hợp lệ: --");
    $('#SoDongLoi').text("Số dòng lỗi: --");
    $('#fileVB_us').click();

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
            ajaxUrl: '/HeThong/DonVi/LoadTenSheet',
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

function resetForm() {
    var param = new Array();
    param[0] = Path;
    param[1] = $('#TenSheet').value();
    param[2] = $('#chkGhiDe').value() == true ? '2' : '1';
    var kq = NTS.getAjax('/HeThong/DonVi/KiemTraFile', { Data: param });
    if (kq == "") {
        document.getElementById("DuLieu").style.display = "block";
        GridExcel.clearData();
        GridExcel.setData("/HeThong/DonVi/LoadDataExcel");
    }
    else {
        document.getElementById("DuLieu").style.display = "none";
        NTS.canhbao(kq);
    }
}
function loadTinhTrangFile() {
    var kq2 = NTS.getAjax('/HeThong/DonVi/GetTinhTrangFileExcel', {})[0];
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

$(document).on('click', '#btnKiemTraFile', async function () {
    if ($('#TenSheet').value() == "") {
        NTS.canhbao("Vui lòng chọn 1 sheet!");
    }
    else if ($('#TenSheet').value() != "") {
        var param = new Array();
        param[0] = Path;
        param[1] = $('#TenSheet').value();
        param[2] = $('#chkGhiDe').value() == true ? '2' : '1';
        var kq = await NTS.getAjaxAsync('/HeThong/DonVi/KiemTraFile', { Data: param });
        if (kq == "") {
            document.getElementById("DuLieu").style.display = "block";
            GridExcel.clearData();
            GridExcel.setData(await NTS.getAjax("/HeThong/DonVi/LoadDataExcel"));
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
    var kq2 = NTS.getAjax('/HeThong/DonVi/GetTinhTrangFileExcel', {})[0];
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

$(document).on('click', '#btnLuuVaDongExcel', function () {
    //console.log("btnLuuVaDongExcel Clicked!");
    var param = new Array();
    for (var i = 0; i < GridExcel.getSelectedData().length; i++) {
        param.push(GridExcel.getSelectedData()[i].MaDonVi)
        console.log("GridExcel.getSelectedData()", GridExcel.getSelectedData()[i]);
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
    var kq = NTS.getAjax('/HeThong/DonVi/NhapDuLieuFileExcel', { Data: param });
    console.log(kq);
    //$('#mdNhapExcel').modal('hide');
    if (!$.isEmptyObject(kq) && kq != null) {
        NTS.thanhcong(kq);
        GridExcel.clearData();
        GridExcel.setData("/HeThong/DonVi/LoadDataExcelSauNhan");
        LoadGridDonViMain();
    }
    else {

    }
});

function LoadDataTable() {
    Grid1.clearData();
    const GetAll = NTS.getAjax("/HeThong/DonVi/GetAllDonVi", {});
    if (!GetAll.Err) {
        Grid1.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
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
    //groupBy: ["TenHuyen", "TenXa", "TenThon"],
    columns: [ //Define Table Columns
        {
            formatter: "rowSelection", titleFormatter: "rowSelection", hozAlign: "center", cellClick: function (e, cell) {
                cell.getRow().toggleSelect();
            }, width: 40, headerSort: false
        },
        {
            title: "Tình trạng", field: "TinhTrang", formatter: "textarea", width: 160, align: "left"
        },
        { title: "Mã thông tin đơn vị", field: "MaDonVi", width: 150 },
        { title: "Mã quan hệ ngân sách", field: "MaQHNS", formatter: "textarea", width: 150 },
        { title: "Tên đơn vị", field: "TenDonVi", formatter: "textarea", width: 120 },
        { title: "Tên đơn vị cấp trên", field: "TenDonVi_Cha", formatter: "textarea", width: 120 },
        { title: "Địa chỉ", field: "DiaChi", formatter: "textarea", width: 120 },

        { title: "Tỉnh/Thành Phố", field: "Tinh", formatter: "textarea", width: 120 },
        { title: "Quận/Huyện", field: "Huyen", formatter: "textarea", width: 120 },
        { title: "Phường/Xã", field: "Xa", formatter: "textarea", width: 120 },
        { title: "Thôn/Ấp", field: "Thon", formatter: "textarea", width: 120 }, 
        { title: "Mã số thuế", field: "MaSoThue", formatter: "textarea", width: 200 },
        { title: "Số điện thoại", field: "DienThoai", formatter: "textarea", width: 200 },
        { title: "Email", field: "Email", formatter: "textarea", width: 200 },
        { title: "Fax", field: "Fax", formatter: "textarea", width: 200 }     
    ],
    footerElement: "<span id='select-stats' style='color:#102D4F;font-size: 13px; font-family: Arial, Helvetica, sans-serif;font-weight:100;float:left;line-height: 40px;font-weight: 600;'></span>",
    cellClick: function (e, cell) {
        var $element = $(cell.getElement());
        var $chkbox = $element.find('.select-row');
        if (cell.getData().IsSelected) {
            $chkbox.prop('checked', false);
            cell.getRow().deselect();
            cell.getData().IsSelected = false;
        } else {
            $chkbox.prop('checked', true);
            cell.getRow().select();
            cell.getData().IsSelected = true;
        }
    },
    rowSelectionChanged: function (data, rows) {
        //update selected row counter on selection change
        document.getElementById("select-stats").innerHTML = 'Số dòng đã chọn: ' + data.length;
    },
    locale: true,
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

$('#btnPrint').on('click', function () {
    GridDonViMain.print(false, true);
    return false;
});
var dulieuloc = "";
$('#btnExport').on('click', async function () {
    const data = GridDonViMain.getData();
    const filteredData = data.filter(
        // lấy dữ liệu theo bộ lọc
        item => (item.MaDonVi == null ? "" : item.MaDonVi.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.TenDonVi == null ? "" : item.TenDonVi.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.TenDonVi_Cha == null ? "" : item.TenDonVi_Cha.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.DienGiai == null ? "" : item.DienGiai.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
    );
    var chuoidulieu = JSON.stringify(filteredData).replaceAll('null', '""').replaceAll('true', '"Đang sử dụng"').replaceAll('false', '""');
    // cấu hình tên cột để xuất
    // thứ tự mảng này quết định thứ tự cột xuất ra
    var TenCot = [
        { 'datafil': 'MaDonVi', 'TenCot': 'Mã', 'DoRong': '20', 'CanhLe': 'Left' },
        { 'datafil': 'TenDonVi', 'TenCot': 'Tên đơn vị', 'DoRong': '40', 'CanhLe': 'Left' },
        { 'datafil': 'TenDonVi_Cha', 'TenCot': 'Đơn vị cấp trên', 'DoRong': '40', 'CanhLe': 'Left' },
        { 'datafil': 'DangSD', 'TenCot': 'Trạng thái sử dụng', 'DoRong': '17', 'CanhLe': 'Center' }]
    var result = await NTS.getAjaxAsync('/DanhMuc/DungChung/XuatDataExcel', { Cot: JSON.stringify(TenCot), Data: chuoidulieu, TenFile: 'Danh sách đơn vị' });
    if (result != "") {
        window.open(result);
    }
});

//$(document).on('click', '.btnXoaGrid1', function () {
//    if (!QuyenXoa()) {
//        return false;
//    }
//    var ID = $(this).attr('data');
//    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'DonViID', ID: ID, TenBangHienTai: 'DonVi', CacBangKhongXet: [] });

//    if (!result_ktxoa.Err) {
//        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
//            CanhBaoXoa(() => {
//                const result = NTS.getAjax('/HeThong/DonVi/XoaDuLieu', { id: ID });
//                if (!result.Err) {
//                    if (result.Msg > 0) { // Msg lớn hơn 0 là có bảng dang sử dụng nó
//                        CanhBaoDuLieuDangSD(result.Result);
//                    }
//                    else {
//                        LoadGridDonViMain();
//                        NTS.thanhcong(result.Msg);
//                    }
//                } else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
//            });
//        }
//        else CanhBaoDuLieuDangSD(result_ktxoa.Result);
//    }
//    // Lỗi khi kiểm tra xóa
//    else result_ktxoa.CanhBao ? NTS.canhbao(result_ktxoa.Msg) : NTS.loi(result_ktxoa.Msg);
//});



