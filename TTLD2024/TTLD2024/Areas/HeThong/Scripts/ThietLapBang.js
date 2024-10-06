var tempthem = "them";
$(function () {
    LoadCombo();
    LoadDataTable();

});




function LoadCombo() {
    debugger;
    NTS.loadDataCombo({
        name: '#CBChucNang,#ComBoChucNang',
        ajaxUrl: '/HeThong/ThietLapBang/getMenu',
        indexValue: 0,
        indexText: 1,
        indexText1: 2,
        textShowTatCa: '- Chọn -',
        hideshowTatCa: false,
        showTatCa: !0,
        columns: 2,
    });
    //NTS.loadDataCombo({
    //    name: ',
    //    ajaxUrl: '/DanhMuc/DungChung/getMenu',
    //    columns: 2,
    //    indexValue: 0,
    //    indexText1: 2,
    //    textShowTatCa: '-Chọn-',
    //    showTatCa: !0
    //});



    //NTS.loadDataCombo({
    //    name: '#CBChucNang,#ComBoChucNang',
    //    ajaxUrl: '/DanhMuc/DungChung/getMenu',
    //    indexValue: 0,
    //    indexText: 1,
    //    indexText1: 2,
    //    textShowTatCa: '(Tất cả)',
    //    hideshowTatCa: false,
    //    showTatCa: !0,
    //    columns: 2,
    //});


}

function LoadDataTable2(chucnang) {
    table.clearData();
    const GetAll = NTS.getAjax("/HeThong/ThietLapBang/GetAll2", { id: chucnang });
    if (!GetAll.Err) {
        table.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}
function LoadDataTable() {
    table.clearData();
    const GetAll = NTS.getAjax("/HeThong/ThietLapBang/GetAll1", {});
    if (!GetAll.Err) {
        table.setData(GetAll.Result);
    }
    else GetAll.CanhBao ? NTS.canhbao(GetAll.Msg) : NTS.loi(GetAll.Msg);
}
// sửa DangSD, MacDinhSD trực tiếp trên lưới
checkDangSD('.checkDangSD', 'Xa', 'XaID');
$('#DangSD').on('change', function () {
    UpdateLabelDangSD(this);
});
var TabulatorLangsVi = {
    "vi": {
        "columns": {
            "name": "Name", //replace the title of column name with the value "Name"
        },
        "ajax": {
            "loading": "Đang tải...", //ajax loader text
            "error": "Lỗi tải dữ liệu", //ajax error text
        },
        "groups": { //copy for the auto generated item count in group header
            "item": "dòng", //the singular  for item
            "items": "dòng", //the plural for items
        },
        "pagination": {
            "page_size": "Kích thước", //label for the page size select element
            "page_title": "Hiển thị",//tooltip text for the numeric page button, appears in front of the page number (eg. "Show Page" will result in a tool tip of "Show Page 1" on the page 1 button)
            "first": '<i class="fa fa-step-backward" aria-hidden="true"></i>', //text for the first page button
            "first_title": "Trang đầu", //tooltip text for the first page button
            "last": '<i class="fa fa-step-forward" aria-hidden="true"></i>',
            "last_title": "Trang cuối",
            "prev": '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
            "prev_title": "Lùi lại",
            "next": '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
            "next_title": "Kế tiếp",
            "all": "All",
        },
        "headerFilters": {
            "default": "filter column...", //default header filter placeholder text
            "columns": {
                "name": "filter name...", //replace default header filter text for column name
            }
        }
    }
}
var fmThaoTac = function (cell) {
    return formaterbtnThaoTac(cell.getData().ThietLapBangID);
}
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().ThietLapBangID);
}


var fmThaoTac2 = function (cell) {
    return formaterbtnThaoTacXoa(cell.getData().ThietLapBangID, 'btnXoaGrid2');
}
//var fmDangSD2 = function (cell) {
//    return formaterDangSD(cell.getValue(), cell.getData().ThietLapBangID);
//}

function updateFooter() {
    var el = document.getElementById("row-count");
    if (table != undefined) {
        if (table.rowManager.activeRows.length > 0) {
            el.innerHTML = 'Dòng: ' + (table.rowManager.table.footerManager.links[0].page * table.rowManager.table.footerManager.links[0].size - table.rowManager.table.footerManager.links[0].size + 1) + ' - ' + (table.rowManager.table.footerManager.links[0].page * table.rowManager.table.footerManager.links[0].size - table.rowManager.table.footerManager.links[0].size + table.rowManager.displayRowsCount) + ' của ' + table.rowManager.activeRows.length + " - ";
        }
        else {
            el.innerHTML = 'Dòng: 0 - 0 của 0 - ';
        }
    }
}


var table = new Tabulator("#Grid1", {
    height: 500,
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    /* groupBy: ["TenChucNang"],*/
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        { title: "Thao tác", headerHozAlign: "center", hozAlign: "center", formatter: fmThaoTac, width: 80, headerSort: false },
        { title: "CauHinhID", headerHozAlign: "center", hozAlign: "CauHinhID", formatter: 'textarea', width: 80, headerSort: false, visible: false },
        { title: "Tên chức năng", headerHozAlign: "center", field: "TenChucNang", formatter: 'textarea', hozAlign: "left", width: 250 },
        { title: "Tên lưới", headerHozAlign: "center", field: "MaLuoi", formatter: 'textarea', hozAlign: "left", width: 250 },
        /*{ title: "Tên lưới", headerHozAlign: "center", field: "TenTruongDuLieu", formatter: 'textarea', hozAlign: "left", width: 150 },*/
        //{ title: "Vị trí", headerHozAlign: "center", field: "ViTri", formatter: 'textarea', hozAlign: "left", width: 90 },
        //{ title: "Canh lề", headerHozAlign: "center", field: "CanhLe", formatter: 'textarea', hozAlign: "left", width: 100 },
        //{ title: "Độ rộng", headerHozAlign: "center", field: "DoRongchu", formatter: 'textarea', hozAlign: "left", width: 100 },
        //{ title: "Kiểu dữ liệu", headerHozAlign: "center", field: "KieuDuLieu", formatter: 'textarea', hozAlign: "left", width: 100 },
        //{ title: "Khóa vị trí", headerHozAlign: "center", field: "KhoaViTri", formatter: check, hozAlign: "center", width: 100 },
        //{ title: "Tìm kiếm", headerHozAlign: "center", field: "TimKiem", formatter: check, hozAlign: "center", width: 100 },
        //{ title: "Ẩn / hiện", headerHozAlign: "center", field: "AnHien", formatter: check, hozAlign: "center", width: 100 },
        //{ title: "Sắp xếp", headerHozAlign: "center", field: "SapXep", formatter: check, hozAlign: "center", width: 100 },
        { title: "Diễn giải", headerHozAlign: "center", field: "DienGiai", hozAlign: "left", formatter: "textarea", width: 550 },
    ],
    footerElement: "<span id='row-count' style='color:#102D4F;font-size: 13px; font-family: Arial, Helvetica, sans-serif;font-weight:100'></span>", //add element element to footer to contain count
    dataFiltered: updateFooter, //call updateFooter function when callback triggered
    dataLoaded: updateFooter, //call updateFooter function when callback triggered
    rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
        /*SuaCauHinh(row.getData().ThietLapBangID);*/
    },
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});





$(document).on('click', '#LocDuLieu', function (e) {
    var chucnang = $("#ComBoChucNang").value().trim();
    if (chucnang == "") {
        LoadDataTable();
    } else {
        LoadDataTable2(chucnang);
    }
});




$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        table.setFilter(matchAny, { value: $(this).val() });
    }
});

table.on("rowDblClick", function (e, row) {
    $('#XaID').val(row.getData().XaID);
    SuaDuLieu(row.getData().ThietLapBangID);
});
$(document).on('click', '#btnThemMoi', function () {
    if (!QuyenThem()) {
        return false;
    }
    ThemDuLieu();
});
$(document).on('click', '.btnSuaGrid1', function () {
    $('#ThietLapBangID').val($(this).attr('data'));
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
    debugger;
    $('#mdThemMoi').modal('show');
    $('#tieuDeModal').text("Thêm mới thiết lập");
    $('#MaLuoi').val("");
    table2.clearData();
    LoadCombo();
    resetForm('#mdThemMoi');
    //const MaTuTang = NTS.getAjax("/DanhMuc/DungChung/LayMaTuTang", { strKyTu: '', strCotTang: 'MaXa', strBangTang: 'Xa', strDinhDang: '00000' });
    //if (!MaTuTang.Err) {
    //    $('#MaXa').value(MaTuTang.Result);
    //}
    //$('#DangSD').prop('checked', true);
    //UpdateLabelDangSD('#DangSD');
    tempthem = "them";
}
function SuaDuLieu(ID) {

    if (!QuyenSua()) {
        return false;
    }
    $('#tieuDeModal').text('Cập nhật thông tin thiết lập');
    const data = NTS.getAjax('/HeThong/ThietLapBang/LoadDuLieuSua', { id: ID });
    debugger;
    if (!data.Err && data.Result != null) {
        let result = data.Result[0];

        $('#mdThemMoi').modal('show');
        tempthem = "sua";
        $('#MaLuoi').value(result.MaLuoi);
        $("#CBChucNang").value(result.ChucNang);
        $("#ThietLapBangID").value(result.ThietLapBangID);
        var result2 = NTS.getAjax("/HeThong/ThietLapBang/GetJsonCauHinhTest", { ma: ID });
        if (!result2.Err && result2.Result != null) {
            table2.setData(result2.Result);
        } else {
            table2.clearData();
        }
        //tempthem = "sua";
        //LoadCombo();
        //$('#MaXa').value(data.MaXa);
        //$('#TenXa').value(data.TenXa);
        //$('#TenVietTat').value(data.TenVietTat);
        //$('#DangSD').value(data.DangSD);
        //$('#TinhID').value(data.TinhID);
        //$('#HuyenID').value(data.HuyenID);
        //UpdateLabelDangSD('#DangSD');
        //$('#DienGiai').value(data.DienGiai);
        //$('#XaID').value(data.XaID);
        //$('#mdThemMoi').modal('show');

    }
    else result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
}
function XoaDuLieu(ID) {
    if (!QuyenXoa()) {
        return false;
    }
    debugger
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'ThietLapBangID', ID: ID, TenBangHienTai: 'ThietLapBang', CacBangKhongXet: [] });

    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/HeThong/ThietLapBang/XoaDuLieu', { id: ID });
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

    var arr = new Array();
    arr[0] = tempthem;
    arr[1] = $("#ThietLapBangID").value();
    arr[2] = $('#CBChucNang').value();
    arr[3] = $('#MaLuoi').value();




    var kt = NTS.getAjax("/HeThong/ThietLapBang/KTTrungCauTruc", { maluoi: arr[3], chucnangid: arr[2] });
    if (parseInt(kt) > 0 && arr[0] == "them") {
        NTS.canhbao("Mã lưới và chức năng đã có!");
        return false;
    }


    for (let i = 0; i < table2.getData().length; i++) {
        var id = table2.getData()[i].ThietLapBangID;
        table2.updateData([{ ThietLapBangID: id, ViTri: i + 1 }])
    }
    console.log(table2.getData());

    try {
        arr[4] = JSON.stringify(table2.getData())
    } catch {
        arr[4] = JSON.stringify([""]);
    }

    var result = NTS.getAjax("/HeThong/ThietLapBang/LuuThongTin", { data: arr });

    if (!result.Err) {
        LoadDataTable();
        NTS.thanhcong(result.Msg);
        $('#mdThemMoi').modal('hide');
        return false;
    } else
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
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
/// In và Xuất excel

var dulieuloc = "";
$(document).on('keyup', '#timKiem', function (e) {
    if (e.keyCode == '13') {
        Search($(this).val());
    }
});
function Search(data) {
    if (data == '' || data == undefined) {
        data = $('#timKiem').value();
    }
    dulieuloc = data;
    table.setFilter(matchAny, {
        value: $('#timKiem').value()
    });
}
$('#btnPrint').on('click', function () {
    table.print(false, true);
    return false;
});

$('#btnExport').on('click', async function () {
    const data = table.getData();
    const filteredData = data.filter(
        // lấy dữ liệu theo bộ lọc
        item => (item.MaXa == null ? "" : item.MaXa.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.TenXa == null ? "" : item.TenXa.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.ThuocHuyen == null ? "" : item.ThuocHuyen.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.ThuocTinh == null ? "" : item.ThuocTinh.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
            || (item.DienGiai == null ? "" : item.DienGiai.toLowerCase().indexOf(dulieuloc.toLowerCase()) !== -1)
    );
    var chuoidulieu = JSON.stringify(filteredData).replaceAll('null', '""').replaceAll('true', '"Đang sử dụng"').replaceAll('false', '""');
    // cấu hình tên cột để xuất
    // thứ tự mảng này quết định thứ tự cột xuất ra
    var TenCot = [
        { 'datafil': 'MaXa', 'TenCot': 'Mã', 'DoRong': '10', 'CanhLe': 'Left' },
        { 'datafil': 'TenXa', 'TenCot': 'Tên xã', 'DoRong': '40', 'CanhLe': 'Left' },
        { 'datafil': 'ThuocHuyen', 'TenCot': 'Thuộc huyện', 'DoRong': '40', 'CanhLe': 'Left' },
        { 'datafil': 'ThuocTinh', 'TenCot': 'Thuộc tỉnh', 'DoRong': '40', 'CanhLe': 'Left' },
        { 'datafil': 'DienGiai', 'TenCot': 'Diễn giải', 'DoRong': '30', 'CanhLe': 'Left' },
        { 'datafil': 'DangSD', 'TenCot': 'Trạng thái sử dụng', 'DoRong': '17', 'CanhLe': 'Center' }]
    var result = await NTS.getAjaxAsync('/QuanLy/DungChung/XuatDataExcel', { Cot: JSON.stringify(TenCot), Data: chuoidulieu, TenFile: 'Danh sách xã' });
    if (result != "") {
        window.open(result);
    }
});



















//$("#btnThemMoiHang").click(function () {
//    LuuDuLieuTemp();
//})

function LuuDuLieuTemp() {

    var tudong = "";
    //if ($('#TuDong').value() == true) {
    //    tudong = '';
    //} else {
    //    tudong = $('#DoRong').value();
    //}
    debugger;
    var id = NTS.getAjax("/HeThong/ThietLapBang/MaID", {});

    table2.addData([{
        ThietLapBangID: id,
        ChucNang: $('#CBChucNang').value(),
        MaLuoi: $('#MaLuoi').value(),
        TenCot: "",
        TenTruongDuLieu: "",
        ViTri: "",
        CanhLe: "left",
        KieuDuLieu: "text",
        AnHien: true,
        DienGiai: "",
        DoRong: 100,
        TuDong: false,
    }], false);
    return false;
}
function xoadulieu2(id) {
    //if (id.includes(TempTable)) {
    //    table2.deleteRow(id);
    //    stt = table2.getData().length+1;
    //}
    debugger;
    table2.deleteRow(id);

    return false;
}


var numberEditor = function (cell, onRendered, success, cancel) {
    input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control input-sm number-format celledit");
    input.value = cell._cell.value;

    onRendered(function () {
        input.focus();
        input.style.height = "100%";
    });

    function onChange() {
        if (input.value != cell._cell.value) {
            success(input.value);

        } else {
            cancel();
        }
    }
    //submit new value on blur or change
    input.addEventListener("blur", onChange);
    //submit new value on enter
    input.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            onChange();
        }

        if (e.keyCode == 27) {
            cancel();
        }
    });

    return input;
};


var textEditor = function (cell, onRendered, success, cancel) {
    input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control input-sm celledit");
    input.value = cell._cell.value;
    onRendered(function () {
        input.focus();
        input.style.height = "100%";
    });

    function onChange() {

        if (input.value != cell._cell.value) {
            debugger
            success(input.value);
            var ViTri = cell._cell.row.data.ThietLapBangID;
            var Data = cell._cell.column.field;
            var Result = input.value;
            eventText(ViTri, Data, Result);




        } else {
            cancel();
        }
    }

    //submit new value on blur or change
    input.addEventListener("blur", onChange);

    //submit new value on enter
    input.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            onChange();
        }

        if (e.keyCode == 27) {
            cancel();
        }
    });

    return input;
};



function eventText(ViTri, Data, Result) {
    debugger
    switch (Data) {
        case 'MaLuoi':
            table2.updateData([{ ThietLapBangID: ViTri, MaLuoi: Result }])
            break;
        case 'TenCot':
            table2.updateData([{ ThietLapBangID: ViTri, TenCot: Result }])
            break;
        case 'TenTruongDuLieu':
            table2.updateData([{ ThietLapBangID: ViTri, TenTruongDuLieu: Result }])
            break;
        case 'ViTri':
            table2.updateData([{ ThietLapBangID: ViTri, ViTri: Result }])
            break;
        case 'DienGiai':
            table2.updateData([{ ThietLapBangID: ViTri, DienGiai: Result }])
            break;
        default:
            table2.updateData([{ ThietLapBangID: ViTri, DienGiai: Result }])
    }

}









//var btnThaoTac2 = function (cell, formatterParams, onRendered) { //plain text value
//    return `<button class='btn btn-xs btn-danger btnXoaGrid2' title="Xoá" onclick="xoadulieu2('${cell.getRow().getData().ThietLapBangID}')" data-id='${cell.getRow().getData().ThietLapBangID}'><i class='fa fa-trash'></i></button>`;
//};





var cbcanhle = function (cell, formatterParams, onRendered) {
    return `<select class="form-control input-sm"
onchange="selectdata('${cell._cell.row.data.ThietLapBangID}','${cell._cell.column.field}')"
data-id="CBcanhle" id='` + cell._cell.row.data.ThietLapBangID + cell._cell.column.field + `'>
                    <option value="left" ${cell._cell.row.data.CanhLe == "left" ? 'selected' : ''}>Trái</option>
                    <option value="right" ${cell._cell.row.data.CanhLe == "right" ? 'selected' : ''}>Phải</option>
                    <option value="center" ${cell._cell.row.data.CanhLe == "center" ? 'selected' : ''}>Giữa</option>
                </select>`

};







var cbkieudulieu = function (cell, formatterParams, onRendered) {
    return `<select class="form-control input-sm"
onchange="selectdata('${cell._cell.row.data.ThietLapBangID}','${cell._cell.column.field}')"
data-id="CBcanhle" id='` + cell._cell.row.data.ThietLapBangID + cell._cell.column.field + `'>
                    <option value="textarea" ${cell._cell.row.data.KieuDuLieu == "textarea" ? 'selected' : ''}>Văn bản</option>
                    <option value="money" ${cell._cell.row.data.KieuDuLieu == "money" ? 'selected' : ''}>Tiền tệ</option>
                    <option value="check" ${cell._cell.row.data.KieuDuLieu == "check" ? 'selected' : ''}>Đánh dấu</option>
                </select>`

};

function selectdata(ViTri, Data) {
    debugger
    var Result = $('#' + ViTri + Data).value();
    var id = ViTri + Data;
    switch (Data) {
        case 'CanhLe':
            table2.updateData([{ ThietLapBangID: ViTri, CanhLe: Result }])
            break;
        default:
            table2.updateData([{ ThietLapBangID: ViTri, KieuDuLieu: Result }])
    }
}


var checksua = function (cell, formatterParams, onRendered) { //plain text value
    const value = cell.getValue();
    var id = cell._cell.row.data.ThietLapBangID + cell._cell.column.field;
    if (value)
        return `<input onchange="datacheck('${cell._cell.row.data.ThietLapBangID}','${cell._cell.column.field}')" type="checkbox" id="` + id + `" checked />`;
    else
        return `<input onchange="datacheck('${cell._cell.row.data.ThietLapBangID}','${cell._cell.column.field}')" type="checkbox" id="` + id + `"/>`;
};







function datacheck(ViTri, Data) {
    debugger;
    var id = ViTri + Data;
    var Result = $('#' + id + '').prop("checked");
    /*console.log($('#'+id).prop("checked"))*/
    switch (Data) {
        case 'SapXep':
            table2.updateData([{ ThietLapBangID: ViTri, SapXep: Result }])
            break;
        case 'TimKiem':
            table2.updateData([{ ThietLapBangID: ViTri, TimKiem: Result }])
            break;
        case 'KhoaViTri':
            table2.updateData([{ ThietLapBangID: ViTri, KhoaViTri: Result }])
            break;
        case 'AnHien':
            table2.updateData([{ ThietLapBangID: ViTri, AnHien: Result }])
            break;
        default:
            /*getcauhinh[ViTri].AnHien = $('#' + id + '').value();*/
            table2.updateData([{ ThietLapBangID: ViTri, TuDong: Result }])
    }

}



$(document).on('click', '.btnXoaGrid2', function () {
    if (!QuyenXoa()) {
        return false;
    }

    CanhBaoXoa(() => {
        var ID = $(this).attr('data');
        table2.deleteRow(ID);
        NTS.thanhcong("Xóa thành công!")
    });
});





var table2 = new Tabulator("#Grid2", {
    index: "ThietLapBangID",
    movableRows: true,
    height: 500,
    scrollX: true,
    scrolly: true,
    layout: "fitColumns",
    pagination: "local",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        {
            title: "",
            rowHandle: true,
            formatter: "handle",
            headerSort: false,
            frozen: true,
            width: 40,
            minWidth: 40,
            headerHozAlign: "center"
        },
        { title: "<botton id='btnThemMoiHang' class='btn btn-xs btn-primary'><i class='fa fa-plus' aria-hidden='true'></i></botton>", headerHozAlign: "center", hozAlign: "center", formatter: fmThaoTac2, width: 60, headerSort: false },
        { title: "ThietLapBangID", headerHozAlign: "center", field: "ThietLapBangID", hozAlign: "ThietLapBangID", formatter: 'textarea', width: 60, headerSort: false, visible: false },
        { title: "Tên cột", editor: textEditor, headerHozAlign: "center", field: "TenCot", hozAlign: "left", width: 150 },
        { title: "Tên trường dữ liệu", editor: textEditor, headerHozAlign: "center", field: "TenTruongDuLieu", hozAlign: "left", width: 210 },
        { title: "Vị trí", headerHozAlign: "center", field: "ViTri", editor: textEditor, hozAlign: "left", width: 90, visible: false },
        { title: "Canh lề", headerHozAlign: "center", field: "CanhLe", formatter: cbcanhle, hozAlign: "left", width: 110 },
        { title: "Độ rộng", field: "DoRong", editor: numberEditor, vertAlign: "middle", headerHozAlign: "center", width: 100 },
        { title: "Kiểu dữ liệu", headerHozAlign: "center", field: "KieuDuLieu", formatter: cbkieudulieu, hozAlign: "left", width: 150 },
        { title: "Ẩn / hiện", headerHozAlign: "center", field: "AnHien", formatter: checksua, hozAlign: "center", width: 110 },
        { title: "Diễn giải", headerHozAlign: "center", field: "DienGiai", hozAlign: "left", editor: textEditor, width: 250 },
        { title: "Độ rộng tự động", headerHozAlign: "center", field: "TuDong", formatter: checksua, hozAlign: "center", width: 150 },
    ],
    //footerElement: "<span id='row-count' style='color:#102D4F;font-size: 13px; font-family: Arial, Helvetica, sans-serif;font-weight:100'></span>", //add element element to footer to contain count
    //dataFiltered: updateFooter, //call updateFooter function when callback triggered
    //dataLoaded: updateFooter, //call updateFooter function when callback triggered
    //rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
    //    SuaCauHinh2(row.getData().ThietLapBangID);
    //},
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});



$(document).on('click', '#btnThemMoiHang', function () {
    if (!QuyenThem()) {
        return false;
    }
    LuuDuLieuTemp();
});