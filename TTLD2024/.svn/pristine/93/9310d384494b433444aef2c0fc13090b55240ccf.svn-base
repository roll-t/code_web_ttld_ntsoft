//Nguyen Quoc Dung

$(document).ready(function () {
    //$('#LoaiCTID').val('');

    LoadGrid_LoaiCT();

    $(document).on("click", ".btnSuaGrid1", function () {
        if (!ntspermiss.sua) {
            NTS.canhbao(
                "User bạn đang sử dụng không thể thực hiện thao tác chỉnh sửa. Vui lòng kiểm tra lại!"
            );
            return false;
        }
        $("#hdf_LoaiChungTuID").val($(this).attr("data"));

        SuaDuLieu($(this).attr("data"));
    });

    $(document).on("click", ".btnXoaGrid1", function () {
        if (!ntspermiss.xoa) {
            NTS.canhbao(
                "User bạn đang sử dụng không thể thực hiện thao tác xóa. Vui lòng kiểm tra lại!"
            );
            return false;
        }
        var ID = $(this).attr("data");
        XoaDuLieu(ID);
    });
});

// Load data
async function LoadGrid_LoaiCT() {
    try {
        table_loaiCT.clearData();
        let GetAll = await NTS.getAjax("/HeThong/LoaiChungTu/GetAll_LoaiCT");
        if (!GetAll.Err) {
            table_loaiCT.setData(GetAll.Result);
            table_loaiCT.redraw(true);
        } else {
            NTS.loi(GetAll.Msg);
        }
    } catch (error) {
        NTS.loi("An unexpected error occurred. Please try again later.");
    }
}

//Call delete backend
function XoaDuLieu(id) {
    if (!QuyenXoa()) {
        return false;
    }
    CanhBaoXoa(() => {
        var result = NTS.getAjax("/HeThong/LoaiChungTu/XoaDuLieu", { id });
        console.log(result);
        if (result.split("_")[0] == "1") {
            LoadGrid_LoaiCT();
            NTS.thanhcong(result.split("_")[1]);
        } else {
            NTS.loi("Xóa thất bại");
        }
    });
}

var btnThaoTacg1 = function (cell) {
    return `<div class="show-or-hide">
  <a class='text-primary btnSuaGrid1 btn-nts-sua' title="Sửa" data='${cell.getData().LoaiChungTuID
        }'><i class="fa fa-pencil"></i></a></b>&ensp;
  <a class='text-danger btnXoaGrid1 btn-nts-xoa' title="Xoá" data='${cell.getData().LoaiChungTuID
        }'><i class='fa fa-trash-o'></i></a>&ensp;
  </div>`;
};

//XỬ LÝ THÊM XÓA SỬA
$(document).on("click", "#btnThemMoi", function () {
    $("#tieuDeModal").text("Thêm mới loại chứng từ");
    $("#MaDonVi").prop("disabled", false);
    $("#mdThemMoi").modal("show");
    //$('#hdf_DonViID').value('');
    resetForm("#mdThemMoi");
    $("#DangSD").value(1);
    //LoadCombo();
    tempthem = "them";
    return false;
});

// Upalod
$(document).on("click", "#btnPrint", function () {
    NTS.thanhcong("Chức năng đang phát triển");
});

$(document).on("click", "#btnExport", function () {
    NTS.thanhcong("Chức năng đang phát triển");
});

async function SuaDuLieu(ID) {
    $("#tieuDeModal").text("Cập nhật loại chứng từ");
    $("#MaDonVi").prop("disabled", true);
    $("#mdThemMoi").modal("show");
    tempthem = "sua";
    var data = await NTS.getAjaxAsync("/HeThong/LoaiChungTu/LoadDuLieuSua", {
        id: ID,
    });
    if (data.Result && data.Result.length > 0) {
        var DuLieu = data.Result[0];
        console.log(DuLieu);
        $("#hdf_LoaiChungTuID").val(DuLieu.LoaiChungTuID);
        $("#MaLoaiCT").val(DuLieu.LoaiChungTuCode);
        $("#TenCT").val(DuLieu.TenLoaiChungTu);
        $("#KyHieuMauCT").val(DuLieu.KyHieuMauCT);
        $("#KyHieuCT").val(DuLieu.KyHieuCT);
        $("#DienGiai").val(DuLieu.DienGiai);
        $("#KyHieuPhiaTruoc").val(DuLieu.KyHieuPhiaTruoc);
        $("#ChieuDai").val(DuLieu.ChieuDaiChuoiTT);
        $("#KyHieuPhiaSau").val(DuLieu.KyHieuPhiaSau);
        $("#SoCTMau").val(DuLieu.SoChungTuMau);
        $("#HienKyHieuCT").prop("checked", DuLieu.HienKyHieuCT);
        $("#HienDauGach").prop("checked", DuLieu.HienDauGach);
        $("#DangSD").prop("checked", DuLieu.TrangThai);
        if (DuLieu.TuTang) {
            $("#TuTang").prop("checked", true);
        } else {
            $("#TuTangTheoThang").prop("checked", true);
        }
    } else {
        NTS.canhbao("Không tìm thấy dữ liệu!");
    }

    return false;
}

$("#DangSD").on("change", function () {
    UpdateLabelDangSD(this);
    console.log(this);
});

// Click btn save
$(document).on("click", "#btnLuuVaDong", function () {
    if (isEmtyValue($("#MaLoaiCT").val())) {
        NTS.canhbao("Vui lòng nhập mã chứng từ!");
        return false;
    }
    if (isEmtyValue($("#TenCT").val())) {
        NTS.canhbao("Vui lòng nhập tên chứng từ!");
        return false;
    }

    const validate = new NTSValidate("#mdThemMoi");
    if (!validate.trim().check()) {
        return false;
    }
    var saveData = new Array();
    saveData[0] = $("#hdf_LoaiChungTuID").val();
    saveData[1] = $("#MaLoaiCT").val();
    saveData[2] = $("#TenCT").val();
    saveData[3] = $("#KyHieuMauCT").val();
    saveData[4] = $("#KyHieuCT").val();
    saveData[5] = $("#DienGiai").val();
    saveData[6] = $("#KyHieuPhiaTruoc").val();
    saveData[7] = $("#ChieuDai").val();
    saveData[8] = $("#KyHieuPhiaSau").val();
    saveData[9] = $("#SoCTMau").val();
    saveData[10] = $("#HienKyHieuCT").prop("checked");
    saveData[11] = $("#HienDauGach").prop("checked");
    saveData[12] = $("#DangSD").prop("checked");
    saveData[13] = $("#TuTang").prop("checked");
    saveData[14] = $("#TuTangTheoThang").prop("checked");
    saveData[15] = tempthem;
    var result = NTS.getAjax("/HeThong/LoaiChungTu/LuuThongTin", {
        data: saveData,
    });

    if (!result.Err) {
        NTS.thanhcong(result.Msg);
        $("#mdThemMoi").modal("hide");
        LoadGrid_LoaiCT();
        // LoadTimKiem_us();
        return true;
    } else {
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
        return false;
    }
});

//Search
$(document).on("keyup", "#timKiem", async function (e) {
    if (e.keyCode == "13") {
        await table_loaiCT.setFilter(matchAny, { value: $(this).val() });
    }
});
$(document).on("click", "#btnSearch", async function (e) {
    table_loaiCT.setFilter(matchAny, { value: $(this).val() });
});
function checkDangSDLoaiCT(selector, tenBang, tenCot) {
    $(document).on("change", selector, function () {
        var inp = $(this);
        var id = $(this).attr("data");
        if (!QuyenSua()) {
            inp.prop("checked", !inp.prop("checked"));
            return false;
        }
        $.confirm({
            title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
            type: "blue",
            icon: "fa fa-question-circle",
            typeAnimated: true,
            theme: "material",
            columnClass: "col-md-5 col-md-offset-3 w-max-400px",
            content: NTS.CauCanhBaoDangSD,
            buttons: {
                confirm: {
                    text: '<i class="fa fa-check"></i> Có',
                    btnClass: "btn-primary",
                    keys: ["enter"],
                    action: function () {
                        var result = NTS.getAjax("/HeThong/LoaiChungTu/LuuCotDangSD", {
                            ID: id,
                            strCotID: tenCot,
                            strBang: tenBang,
                            value: inp.prop("checked"),
                        });
                        if (!result.Err) {
                            NTS.thanhcong(result.Msg);
                        } else {
                            NTS.canhbao(result.Msg);
                            inp.prop("checked", !inp.prop("checked"));
                        }
                    },
                },
                cancel: {
                    text: '<i class="fa fa-close"></i> Không',
                    btnClass: "btn-danger",
                    keys: ["esc"],
                    action: function () {
                        inp.prop("checked", !inp.prop("checked"));
                    },
                },
            },
        });
    });
}
checkDangSDLoaiCT(".checkDangSD", "LoaiChungTu", "LoaiChungTuID");
var fmDangSD = function (cell) {
    return formaterDangSD(cell.getValue(), cell.getData().LoaiChungTuID);
};

//Render table loaiCT
var table_loaiCT = new Tabulator("#Table_LoaiChungTu", {
    responsiveLayout: false,
    pagination: true,
    layout: "fitColumns",
    selectable: 1,
    paginationSize: 50,
    paginationSizeSelector: [50, 100, 150, 200, 500, true],
    height: "80vh",
    HeaderVertAlign: "center",
    columns: [
        {
            title: '<i class="fa fa-ellipsis-h"></i>',
            hozAlign: "center",
            formatter: btnThaoTacg1,
            width: 60,
            headerSort: false,
            headerHozAlign: "center",
            vertAlign: "middle",
        },
        {
            title: "Mã",
            field: "LoaiChungTuCode",
            formatter: "textarea",
            hozAlign: "left",
            headerHozAlign: "center",
            vertAlign: "middle",
            visible: true,
            width: 200,
        },
        {
            title: "Tên loại chứng từ",
            field: "TenLoaiChungTu",
            formatter: "textarea",
            vertAlign: "middle",
            headerHozAlign: "center",
            hozAlign: "left",
            width: 250,
        },
        {
            title: "Diễn giải",
            field: "DienGiai",
            hozAlign: "left",
            formatter: "textarea",
            headerHozAlign: "center",
            vertAlign: "middle",
            minWidth: 350,
        },
        {
            title: "Kí hiệu mẫu CT",
            field: "KyHieuMauCT",
            hozAlign: "left",
            formatter: "textarea",
            headerHozAlign: "center",
            vertAlign: "middle",
            minWidth: 200,
        },
        {
            title: "Kí hiệu CT",
            field: "KyHieuCT",
            hozAlign: "left",
            formatter: "textarea",
            headerHozAlign: "center",
            vertAlign: "middle",
            minWidth: 200,
        },
        {
            title: "Kí hiệu phía trước",
            field: "KyHieuPhiaTruoc",
            hozAlign: "left",
            headerHozAlign: "center",
            formatter: "textarea",
            vertAlign: "middle",
            minWidth: 200,
        },
        {
            title: "Kí phía hiệu sau",
            field: "KyHieuPhiaSau",
            hozAlign: "left",
            headerHozAlign: "center",
            formatter: "textarea",
            vertAlign: "middle",
            minWidth: 200,
        },
        {
            title: "Số chứng từ mẫu",
            field: "SoChungTuMau",
            hozAlign: "left",
            headerHozAlign: "center",
            formatter: "textarea",
            vertAlign: "middle",
            minWidth: 200,
        },
        {
            title: "Hiện dấu gạch",
            field: "HienDauGach",
            hozAlign: "center",
            headerHozAlign: "center",
            formatter: check,
            vertAlign: "center",
            minWidth: 130,
        },
        {
            title: "Tăng theo tháng",
            field: "TangTheoThang",
            hozAlign: "center",
            headerHozAlign: "center",
            formatter: check,
            vertAlign: "center",
            minWidth: 130,
        },
        {
            title: "Hiện ký hiệu chứng từ",
            field: "HienKyHieuCT",
            hozAlign: "center",
            headerHozAlign: "center",
            formatter: check,
            vertAlign: "center",
            minWidth: 180,
        },
        {
            title: "Tự tăng",
            field: "TuTang",
            hozAlign: "center",
            formatter: check,
            headerHozAlign: "center",
            vertAlign: "center",
            minWidth: 130,
        },
        {
            title: "Trạng thái sử dụng",
            field: "TrangThai",
            hozAlign: "center",
            headerHozAlign: "center",
            vertAlign: "center",
            formatter: fmDangSD,
            width: 130,
            headerSort: false,
        },
    ],
    footerElement:
        "<span id='row-count' style='color:#102D4F;font-size: 13px; font-family: Arial, Helvetica, sans-serif;font-weight:100'></span>", //add element element to footer to contain count
    //dataFiltered: updateFooter, //call updateFooter function when callback triggered
    //dataLoaded: updateFooter, //call updateFooter function when callback triggered
    locale: true,
    langs: TabulatorLangsVi,
    placeholder: "Không có dữ liệu",
});

// fun checkbox
function check(cell) {
    const value = cell.getValue();
    if (value) return `<input type="checkbox" checked disabled='disabled' />`;
    else return `<input type="checkbox" disabled='disabled' />`;
}

// Event Row dbClick
table_loaiCT.on("rowDblClick", function (e, row) {
    $("#LoaiChungTuID").val(row.getData().LoaiChungTuID);
    SuaDuLieu(row.getData().LoaiChungTuID);
});

// Event Row Click
table_loaiCT.on("rowClick", function (e, row) {
    //console.log("Row clicked");
    //rowSelect = row._row.data;
});
