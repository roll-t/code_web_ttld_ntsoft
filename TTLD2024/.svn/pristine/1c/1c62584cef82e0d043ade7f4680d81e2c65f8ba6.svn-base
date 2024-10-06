$(document).ready(function () {
    $('#divNoiDung_usBC').attr("src", '');
    debugger
    var data = NTS.getAjax('/BaoCao/DanhSachUngVienVL/XemBaoCao', {});
    $('#divNoiDung_usBC').attr("src", data);
});
async function OpenMD_LuuBaoCao() {
    $('#mdLuuTruBaoCao').modal('show');
    $('#TenBaoCaoLuuTru').value('')
    $('#GhiChu_LuuBaoCao').value('')
}

$('#btnOpenMDLoc').on('click', function () {
    $('#mdLocDuLieu').modal('show')
});

$('#btnLocDuLieu').on('click', function () {
    getData()
});

async function XuatExcel() {
    var kq = await NTS.getAjaxAsync('/BaoCao/DanhSachUngVienVL/XuatExcel', { });
    if (!kq.Err) {
        window.open(kq);
        //$('#modal_xemtruockhiin_us').modal('show');
    } else {
        NTS.loi(kq.Msg);
    }
}
async function InBaoCao() {
    var kq = await NTS.getAjaxAsync('/BaoCao/DanhSachUngVienVL/XuatExcel', {});
    if (!kq.Err) {
        $('#divNoiDung_us').attr("src", kq.replace(".xlsx", ".pdf"));
        $('#modal_xemtruockhiin_us').modal('show');
        
    } else {
        NTS.loi(kq.Msg);
    }
}

async function LuuTruBaoCao() {
    const validate = new NTSValidate('#mdLuuTruBaoCao');
    if (!validate.trim().check()) {
        return false;
    }
    var kq = await NTS.getAjaxAsync('/BaoCao/DanhSachUngVienVL/XuatExcel', {});
    if (kq.split('_')[0] != "-1") {
        LuuTruBaoCao_us(kq, ""); // hàm trong
    } else {
        NTS.loi(kq.split('_')[1]);
    }
}

async function LuuTruBaoCao_us(path, kyBaoCao) {
    var param = new Array();
    param[0] = "them";
    param[1] = "";
    param[2] = $('#TenBaoCaoLuuTru').value();
    param[3] = kyBaoCao;
    param[4] = path.replace(".xlsx", ".pdf");
    param[5] = $('#GhiChu_LuuBaoCao').value();

    var kq = await NTS.getAjaxAsync('/BaoCao/DanhSachBaoCao/LuuThongTin_BaoCaoDaLuu', { data: param });

    if (kq.split('_')[0] == "1") {
        NTS.thanhcong(kq.split('_')[1]);
        $('#mdLuuTruBaoCao').modal('hide');
        return false;
    } else if (kq.split('_')[0] == "-1") {
        NTS.canhbao(kq.split('_')[1]);
        return false;
    } else {
        NTS.loi(kq.split('_')[1]);
        return false;
    }
}


