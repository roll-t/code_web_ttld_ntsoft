var selectedTab = 1;
$(document).ready(function () {
    loadAllBaoCao();
    loadAllBaoCaoDaLuu();
})

function changeTab(tabIndex) {
    if (selectedTab != tabIndex) {
        if (tabIndex === 1) {
            $("#BCDaLuu").removeClass('show active')
            $("#DSBaoCao").addClass('show active')
        }
        else {
            $("#DSBaoCao").removeClass('show active')
            $("#BCDaLuu").addClass('show active')
        }
        selectedTab = tabIndex;
    }
}

function formaterbtnThaoTacXemVaXoa(DuongDan, ID, btnXemGrid, btnXoaGrid) {
    return `<div class="show-or-hide"><a class='text-success ${btnXemGrid}' title="Xem" data='${DuongDan}'><i class='fa fa-eye'></i></a> <a class='text-danger ${btnXoaGrid} btn-nts-xoa' title="Xoá" data='${ID}'><i class='fa fa-trash-o'></i></a></div>`;
};
var fmThaoTac = function (cell) {
    return formaterbtnThaoTacXemVaXoa(cell.getData().DuongDan + '/Index/' + cell.getData().LuuBaoCaoID + '?p=1', cell.getData().LuuBaoCaoID, "btnXemBaoCaoDaLuu", "btnXoaBaoCaoDaLuu")
}
$(document).on('keyup', '#timKiem_GridBCDaLuu', function (e) {
    if (e.keyCode == '13') {
        tableBaoCaoDaLuu.setFilter(matchAny, { value: $(this).val() });
    }
});

$(document).on('click', '.btnXemBaoCaoDaLuu', function () {
    //alert("Hello!")
    window.location.href = $(this).attr('data');
});

$(document).on('click', '.btnXoaBaoCaoDaLuu', function () {
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
    const result_ktxoa = NTS.getAjax('/DanhMuc/DungChung/KiemTraXoaDT', { TenCot: 'LuuBaoCaoID', ID: ID, TenBangHienTai: 'LuuBaoCao', CacBangKhongXet: [] });
    if (!result_ktxoa.Err) {
        if (result_ktxoa.Result == null || result_ktxoa.Result == "") {
            CanhBaoXoa(() => {
                const result = NTS.getAjax('/BaoCao/DanhSachBaoCao/XoaLuuBaoCao', { id: ID });
                if (!result.Err) {
                    LoadDataTable_BaoCaoDaLuu();
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

function htmlWrapFormatter(cell, formatterParams, onRendered) {
    cell.getElement().style.whiteSpace = "pre-wrap";
    return this.emptyToSpace(cell.getValue());
}

async function loadAllBaoCao() {

    var divBaoCao = ``;
    var GetAllNhom = await NTS.getAjaxAsync("/BaoCao/DanhSachBaoCao/GetAllNhom", {});
    if (GetAllNhom.length > 0) {
        for (let i = 0; i < GetAllNhom.length; i++) {
            var listBC =
                `<div class="card card accordion-item active">
                    <div class="card-status-top bg-blue"></div>
                        <div class="accordion-header card-header">
                            <ul class="nav nav-pills card-header-pills d-flex" style="font-size:14px">
                                <li class="nav-item">
                                    <a class="nav-link active" href="#">
                                        <i class="fa fa-line-chart handle"></i>&nbsp;${GetAllNhom[i].TenNhomBaoCao}
                                    </a>
                                </li>
                                <li class="nav-item ms-auto">
                                    <a class="nav-link" href="#">
                                        <i class="fa fa-angle-double-up" data-bs-toggle="collapse" data-bs-target="#accordion${i + 1}" aria-expanded="true" aria-controls=""></i>&nbsp;&nbsp;&nbsp;
                                        
                                    </a>

                                </li>
                            </ul>
                        </div>
                    <div  class="card-body row accordion-collapse collapse show" id="accordion${i + 1}">
                        <div class="col-md-6" id="leftcolumn${i + 1}">
                        </div>
                        <div class="col-md-6" id="rightcolumn${i + 1}">
                        </div>
                    </div>
                    </div>`;
            $('#list-baocao').append(listBC);
            var leftcolumn = ``;
            var rightcolumn = ``;
            var GetAllNhomCon = await NTS.getAjaxAsync("/BaoCao/DanhSachBaoCao/GetAllNhomCon", { ID: GetAllNhom[i].NhomBaoCaoID });
            if (GetAllNhomCon.length > 0) {
                for (var j = 0; j < GetAllNhomCon.length; j++) {
                    if ((j + 1) % 2 != 0) {
                        //if (GetAllNhomCon[j].DuongDan == '') {
                        leftcolumn = `
                            <div class="message-item message-unread" style="margin-top: 10px;color: #6a9cba;">
                                <a href="${GetAllNhomCon[j].DuongDan}/Index/${GetAllNhomCon[j].BaoCaoID}" class="sender" title="${GetAllNhomCon[j].TenBaoCao}" style="color: #6a9cba; font-size: 12px;">
                                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                                    &nbsp;${GetAllNhomCon[j].TenBaoCao}
                                </a>
                             </div>`;
                        //}
                        $('#leftcolumn' + (i + 1)).append(leftcolumn);
                        // var GetAllBCCon = await NTS.getAjaxAsync("/BaoCao/DanhSachBaoCao/GetAllBCCon", { ID: GetAllNhom[i].NhomBaoBaoID, Code: GetAllNhomCon[j].MaBaoCao });

                        //for (var k = 0; k < GetAllBCCon.length; k++) {
                        //     leftcolumn =
                        //     `<div class="message-item message-unread" style="margin-top: 10px;color: #6a9cba;">
                        //                                 <a href="${GetAllBCCon[k].DuongDan}" class="sender" title="${GetAllBCCon[k].TenNhomBC}" style="color: #6a9cba; font-size: 12px;">
                        //                                     <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                        //                                     &nbsp;${GetAllBCCon[k].TenNhomBC}
                        //                                 </a>
                        //                             </div>`;
                        //     $('#leftcolumn' + (i + 1)).append(leftcolumn);
                        // }
                    }
                    else {
                        //if (GetAllNhomCon[j].DuongDan == '') {
                        rightcolumn = `
                       <div class="message-item message-unread" style="margin-top: 10px;color: #6a9cba;">
                                <a href="${GetAllNhomCon[j].DuongDan}/Index/${GetAllNhomCon[j].BaoCaoID}" class="sender" title="${GetAllNhomCon[j].TenBaoCao}" style="color: #6a9cba; font-size: 12px;">
                                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                                    &nbsp;${GetAllNhomCon[j].TenBaoCao}
                                </a>
                             </div>`;
                        //}
                        $('#rightcolumn' + (i + 1)).append(rightcolumn);
                        //var GetAllBCCon = await NTS.getAjaxAsync("/BaoCao/DanhSachBaoCao/GetAllBCCon", { ID: GetAllNhom[i].NhomBaoBaoID, Code: GetAllNhomCon[j].MaBaoCao });
                        //for (var k = 0; k < GetAllBCCon.length; k++) {
                        //    rightcolumn =
                        //    `<div class="message-item message-unread" style="margin-top: 10px;color: #6a9cba;">
                        //                                <a href="${GetAllBCCon[k].DuongDan}" class="sender" title="${GetAllBCCon[k].TenNhomBC}" style="color: #6a9cba; font-size: 12px;">
                        //                                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                        //                                    &nbsp;${GetAllBCCon[k].TenNhomBC}
                        //                                </a>
                        //                            </div>`;
                        //    $('#rightcolumn' + (i + 1)).append(rightcolumn);
                        //}
                    }
                }
            }
            else {

                var GetAllBC = await NTS.getAjaxAsync("/BaoCao/DanhSachBaoCao/GetAllBC", { ID: GetAllNhom[i].NhomBaoCaoID });
                for (var j = 0; j < GetAllBC.length; j++) {
                    if (j + 1 <= Math.ceil(GetAllBC.length / 2)) {
                        if (GetAllBC[j].DuongDan == '') {
                            leftcolumn += `
                        <div class="message-item message-unread" style="margin-top: 10px;font-size: 13px;color: #6a9cba;">
                          <lable class="sender" style="color: black;"><b>${GetAllBC[j].TenBaoCao}</b></lable>
                        </div>`;
                        } else {
                            leftcolumn += `<div class="message-item message-unread" style="margin-top: 10px;font-size: 13px;color: #6a9cba;">
                           
                          <a href="${GetAllBC[j].DuongDan}/Index/${GetAllBC[j].BaoCaoID}" class="sender" title="${GetAllBC[j].TenBaoCao}" style="color: #6a9cba;">${GetAllBC[j].TenBaoCao}</a>
                        </div>`;
                        }
                        $('#leftcolumn' + (i + 1)).html(leftcolumn);
                    }
                    else {
                        if (GetAllBC[j].DuongDan == '') {
                            rightcolumn += `
                        <div class="message-item message-unread" style="margin-top: 10px;font-size: 13px;color: #6a9cba;">
                          <lable class="sender" style="color: black;"><b>${GetAllBC[j].TenBaoCao}</b></lable>
                        </div>`;
                        }
                        else {
                            rightcolumn += `<div class="message-item message-unread" style="margin-top: 10px;font-size: 13px;color: #6a9cba;">

                          <a href="${GetAllBC[j].DuongDan}/Index/${GetAllBC[j].BaoCaoID}" class="sender" title="${GetAllBC[j].TenBaoCao}" style="color: #6a9cba;">${GetAllBC[j].TenBaoCao}</a>
                        </div>`;//<i class="iconBaoCao blue fa fa-hand-o-right"></i>
                        }
                        $('#rightcolumn' + (i + 1)).html(rightcolumn);
                    }
                }
            }
        }
    }
}

async function LuuTruBaoCao() {
    if ($('#TenBaoCaoLuuTru').value() == "") {
        NTS.canhbao("Tên báo cáo không được bỏ trống!");
        $('#TenBaoCaoLuuTru').focus();
        return false;
    }
    var param = new Array();
    param[0] = "sua";
    param[1] = $('#BaoCaoDaLuuID').value();
    param[2] = $('#TenBaoCaoLuuTru').value();
    param[3] = "";
    param[4] = pathFile;
    param[5] = $('#GhiChu_LuuBaoCao').value();
    var kq = await NTS.getAjaxAsync('/BaoCao/DanhSachBaoCao/LuuThongTin_BaoCaoDaLuu', { data: param });

    if (kq.split('_')[0] == "1") {
        NTS.thanhcong(kq.split('_')[1]);
        loadAllBaoCaoDaLuu();
        $('#mdLuuTruBaoCao').modal('hide');

    } else if (kq.split('_')[0] == "-1") {
        NTS.canhbao(kq.split('_')[1]);
    } else {
        NTS.loi(kq.split('_')[1]);
    }
}
async function loadAllBaoCaoDaLuu() {
    var GetAll = await NTS.getAjaxAsync("/BaoCao/DanhSachBaoCao/GetAll_BaoCaoDaLuu", {});
    if (GetAll.length > 0) {
        table.clearData();
        table.setData(GetAll);
        table.redraw(1);
    } else {
        table.clearData();
    }
}
var fmThaoTac1 = function (cell) {
    return formaterbtnThaoTac(cell.getData().BaoCaoDaLuuID);
}
var btnThaoTac1 = function (cell, formatterParams, onRendered) { //plain text value
    return `<a href='javascript:void(0)' onclick='XemDinhKem_us("${cell.getRow().getData().PathFile}")' class=''>${cell.getRow().getData().TenBaoCao}</a>`;
};
var table = new Tabulator("#GridBCDaLuu", {
    height: 500,
    layout: "fitColumns",
    selectable: 1,
    pagination: "local",
    //groupBy: ['TenChucNang'],
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 250, 500, true],
    columns: [ //Define Table Columns
        { title: "TT", headerSort: false, headerHozAlign: "center", vertAlign: "middle", hozAlign: "center", field: "ThaoTac", width: 60, formatter: fmThaoTac1 },
        { title: "Tên báo cáo đã lưu", hozAlign: "left", vertAlign: "middle", visible: true, formatter: btnThaoTac1, width: 300, headerHozAlign: "center" },
        { title: "Người tạo", field: "NguoiThaoTac", hozAlign: "left", vertAlign: "middle", width: 150, formatter: 'textarea', headerHozAlign: "center" },
        { title: "Ngày tạo", field: "NgayTao", hozAlign: "left", vertAlign: "middle", width: 110, headerHozAlign: "center" },
        { title: "Kỳ báo cáo", field: "KyBaoCao", hozAlign: "left", vertAlign: "middle", formatter: 'textarea', width: 200, headerHozAlign: "center"},
        { title: "Ghi chú", field: "GhiChu", hozAlign: "left", vertAlign: "middle", formatter: 'textarea', minWidth: 200, headerHozAlign: "center" },
    ],
    rowDblClick: function (e, row) { //trigger an alert message when the row is clicked
        SuaBaoCaoDaLuu(row.getData().BaoCaoDaLuuID);
    },
    locale: true,
    paginationCounter: "rows",
    langs: TabulatorLangsVi,
    placeholder: 'Không có dữ liệu',
});
$(document).on('click', '.btnSuaGrid1', function () {
    $('#BaoCaoDaLuuID').val($(this).attr('data'));
    SuaBaoCaoDaLuu($(this).attr('data'));
});

$(document).on('click', '.btnXoaGrid1', function () {
    if (!QuyenXoa()) {
        return false;
    }
    if (!ntspermiss.xoa) {
        NTS.canhbao("User bạn Đang công tác không thể thực hiện thao tác xóa. Vui lòng kiểm tra lại!");
        return false;
    }
    var ID = $(this).attr('data');
    $.confirm({
        title: '<b>Cảnh báo!</b>',
        type: 'red',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-6 col-md-offset-3',
        content: NTS.CauThongBaoXoa,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Chấp nhận',
                btnClass: 'btn-blue',
                keys: ['enter', 'shift'],
                action: function () {
                    var result = NTS.getAjax('/BaoCao/DanhSachBaoCao/XoaBaoCaoDaLuu', { ID: ID });
                    if (result.split('_')[0] == "1") {
                        loadAllBaoCaoDaLuu();
                        NTS.thanhcong(result.split('_')[1]);
                    }
                    else {
                        NTS.loi('Xóa dữ liệu thất bại');
                    }
                }
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Hủy bỏ',
                btnClass: 'btn-red',
                keys: ['enter', 'shift'],
                action: function () {
                }
            }
        }
    });
    return false;
});

function SuaBaoCaoDaLuu(id) {
    if (!ntspermiss.sua) {
        NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác chỉnh sửa. Vui lòng kiểm tra lại!");
        return false;
    }
    $('#tieuDeModal').text('Cập nhật thông tin báo cáo');
    pathFile = '';
    kyBaoCao = '';
    debugger;
    var result = NTS.getAjax("/BaoCao/DanhSachBaoCao/GetBaoCaoDaLuuTheoID", { ma: id });
    if (result.length > 0) {
        tempthem = "sua";
        $('#TenBaoCaoLuuTru').value(result[0].TenBaoCao);
        $('#GhiChu_LuuBaoCao').value(result[0].GhiChu);
        $('#BaoCaoDaLuuID').value(result[0].BaoCaoDaLuuID);
        pathFile = result[0].PathFile;
        kyBaoCao = result[0].KyBaoCao;
        $('#mdLuuTruBaoCao').modal('show');
    }
    else {
        NTS.loi('Tải dữ liệu sửa thất bại!')
    }
}
function XemDinhKem_us(path) {
    $('#divNoiDung_us').attr("src", path.replace("~", ""));
    $('#modal_xemtruockhiin_us').modal('show');
    return false;
}