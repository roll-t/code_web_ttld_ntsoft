////var _listGridAutoResize = new Array();
////var Grid_ChonDonVi_ThayDoiDonVi;
$(function () {
    NTS.loadDataCombo({
        name: '#selKyBaoCao_head',
        ajaxUrl: '/api/GetKyBaoCao',
        ajaxParam: '',
        indexText: 1,
        indexText1: 0
    });
    $('#selKyBaoCao_head').val($('#hdfHeader_kyBaoCao').val() == "" ? "13" : $('#hdfHeader_kyBaoCao').val()).change();
    NTS.loadDataCombo({
        name: "#NamBaoCao_Head",
        ajaxUrl: '/DanhMuc/DungChung/GetAllNienDo_layout',
        ajaxParam: '',
        indexText: 0,
        indexText1: 0
    });
    $('#NamBaoCao_Head').value(nienDo);
    //Notifi_NhatKy();
   
    if (screen.width < 768) {
        if ($('#lbl_TieuDeTrang').text().length > 10) {
            $('#lbl_TieuDeTrang').text($('#lbl_TieuDeTrang').text().replaceAll('\n', '').trim().substr(0, 10) + '...');
        }
    }
    //Notifi_NhatKy();
    //$(document).on('change', '#cbDaXem', function () {
    //    Notifi_NhatKy();
    //});
    //$(document).on('click', '#DanhDauDaXem', function () {
    //    NTS.getAjax('/HeThong/Profile/CapNhatTrangThaiDaXemNhatKy', { NhatKyThaoTacID: '', Loai: '1' });
    //    Notifi_NhatKy();
    //});
    
    //$(document).on('click', '#XemTatCaThongBaoChung', function () {
    //    $('#mdXemTatCaThongBao').modal('show');

    //    var GetAllThongBaoChung = JSON.parse(NTS.getAjax('/api/GetNhatKy', {})).Result;
    //    var HtmlTatCaThongBao = ``;
    //    var ThoiGianThaoTac = '';
    //    for (var i = 0; i < GetAllThongBaoChung.length; i++) {
    //        if (ThoiGianThaoTac != GetAllThongBaoChung[i].ThoiGianThaoTac) {
    //            HtmlTatCaThongBao += `<div class="list-group-header sticky-top">` + GetAllThongBaoChung[i].ThoiGianThaoTac +`</div>`;
    //            ThoiGianThaoTac = GetAllThongBaoChung[i].ThoiGianThaoTac;
    //        }
    //        HtmlTatCaThongBao += `<div class="list-group-item">
    //                                        <div class="row">
    //                                            ` + (GetAllThongBaoChung[i].DaXem == '1' ? `<div class="col-auto" style="margin-top: 4px;"><span class="badge bg-green"></span></div>` : `<div class="col-auto" style="margin-top: 4px;"><span class="badge bg-red"></span></div>`) + `
    //                                            <div class="col-auto">
    //                                                <a href="#">
    //                                                    <span title="Ảnh đại diện user người gửi" class="avatar" style="background-image: url(`+ GetAllThongBaoChung[i].AnhDaiDien +`)"></span>
    //                                                </a>
    //                                            </div>
    //                                            <div class="col text-truncate">
    //                                                <a href="#" class="text-body d-block" title="Tiêu đề gửi">`+ GetAllThongBaoChung[i].TieuDe + `</a>
    //                                                <div class="text-secondary text-truncate mt-n1" title="Nội dung người dùng nhập liệu gửi: `+ GetAllThongBaoChung[i].GhiChu+`">Nội dung gửi: `+ (GetAllThongBaoChung[i].GhiChu.length > 250 ? GetAllThongBaoChung[i].GhiChu.slice(0, 250) + `...` : GetAllThongBaoChung[i].GhiChu) +`</div>
                                                   
    //                                            </div>
    //                                            <div class="col-auto">
    //                                                 <div class="text-secondary text-truncate mt-n1" title="Ngày gửi thông báo">`+ GetAllThongBaoChung[i].NgayThucHien +`</div>
    //                                            </div>
    //                                        </div>
    //                                    </div>`;
    //    }
    //    $('#ListTatCaThongBao').html(HtmlTatCaThongBao);
    //   /* GridXemTatCaThongBao.setData(GetAllThongBaoChung.Result);*/
    //    setTimeout(function () {
    //        $('.tabulator-responsive-collapse-toggle').click();
    //    }, 1)
    
    //});
    //setTimeout(function () {
    //    var resultDV = NTS.getAjax('/DanhMuc/DungChung/GetDonViDangDangNhap', {});
    //    $('.lblTenDonViSD_drop').text(resultDV.Result[0].MaDonVi + " - " + resultDV.Result[0].TenDonVi);
    //    $('#tendonvi_layout_1').text(resultDV.Result[0].MaDonVi + " - " + resultDV.Result[0].TenDonVi);
      
    //}, 1)
});
//////var GridXemTatCaThongBao = new Tabulator("#GridXemTatCaThongBao", {
//////    layout: "fitDataFill",
//////    pagination: true,
//////    paginationSize: 50,
//////    paginationSizeSelector: [50, 100, 150, 200, 500, true],
//////    responsiveLayout: "collapse",
//////    height: "550",
//////    columns: [
        
//////        { title: "Tiêu đề", field: "TieuDe", formatter: 'textarea', hozAlign: "left", width: 600, vertAlign: "middle", headerHozAlign: "center", responsive: 0},
//////        { title: "Ngày thông báo", field: "NgayThucHien", formatter: 'textarea', width: 150, vertAlign: "middle", headerHozAlign: "center", hozAlign: "center", responsive: 1 },
//////        { title: "Người thông báo", field: "NguoiThucHien", formatter: 'textarea', hozAlign: "left", width: 150, vertAlign: "middle", headerHozAlign: "center", responsive: 1 },
//////        { title: "Nội dung thông báo", field: "GhiChu", formatter: 'textarea', hozAlign: "left", width: 250, vertAlign: "middle", headerHozAlign: "center", responsive: 1 },
//////        { title: "Trạng thái", field: "TrangThaiHtml", formatter: 'html', hozAlign: "center", width: 200, vertAlign: "middle", headerHozAlign: "center", responsive: 1 },
//////        { title: "&nbsp;", field: "LoaiThongBaoHtml", formatter: 'html', hozAlign: "center", width: 200, vertAlign: "middle", headerHozAlign: "center", responsive: 4 },

//////    ],
//////    dataLoaded: function (data) {
//////        // Ẩn responsive layout khi dữ liệu được tải
//////        $('.tabulator-responsive-collapse-toggle').click()
//////    },
//////    locale: true,
//////    paginationCounter: "rows",
//////    langs: TabulatorLangsVi,
//////    placeholder: 'Không có dữ liệu',
   
//////});
var resultAct = NTS.getAjax('/HeThong/Profile/GetDataUser', {});
if (!resultAct.Err && resultAct.Result != null) {
    let data = resultAct.Result[0];
    $('#hovaten_layout').text(data.HoVaTen);
    $('#hovaten_layout_1').text(data.HoVaTen);
    if (data.Avatar == "") {
        $('#avt_layout').prop('src', "../../Images/avatar-1.png");
        $('#avt_layout_1').prop('src', "../../Images/avatar-1.png");
    } else {
        $('#avt_layout').prop('src', data.Avatar);
        $('#avt_layout_1').prop('src', data.Avatar);
    }
}
else resultAct.CanhBao ? NTS.canhbao(resultAct.Msg) : NTS.loi(resultAct.Msg);
function capNhatKyBaoCao() {

    $('#hdfHeader_kyBaoCao').val($('#selKyBaoCao_head').value());
    var result = NTS.getAjax('/DanhMuc/DungChung/CapNhatKyBaoCao',
        {
            kyBaoCao: $('#selKyBaoCao_head').val(),
            namBaoCao: $('#NamBaoCao_Head').val(),
        });
    location.reload();
    $('#selKyBaoCao_head').val($('#hdfHeader_kyBaoCao').val()).change();
}

////function Notifi_NhatKy() {
////    //$('#div_ThongBaoNhatKy').html("");
////    //$('#soluong_ChuaXem').html("");
////    var soluong = 0;
////    var soluongTB = 0;
////    var soluongHD = 0;
////    var soluongHT = 0;
////    var soluong_ChuaXem = 0;
////    var result = JSON.parse(NTS.getAjax('/api/GetNhatKy', {})).Result;
////    if (result.length > 0) {
////        var info = ``;
////        var TB = ``;
////        var HD = ``;
////        var HT = ``;
////        for (var i = 0; i < result.length; i++) {
////            if (result[i].DaXem == 0) {
////                soluong_ChuaXem++;
////            }

////            if (result[i].DaXem != 0 && $('#cbDaXem').value() == '1') {
////                continue;
////            }
////            else if (result[i].DaXem == 0 && $('#cbDaXem').value() == '2') {
////                continue;
////            }
////            else {
////                soluong++;
////                if (result[i].LoaiNhatKy == 'TB') {
////                    soluongTB++;
////                }
////                else if (result[i].LoaiNhatKy == 'HD') {
////                    soluongHD++;
////                } else {
////                    soluongHT++;
////                }
////            }
////            if (result[i].AnhDaiDien == '') {
////                result[i].AnhDaiDien = "/Images/UserIcon.png";
////            }
////            info += `  <div class="form-selectgroup-label-content d-flex align-items-center mb-3" style="cursor:pointer" onclick="ChuyenDenChucNangTheoThongBao('` + result[i].ChucNangChuyenDen + `')">
////                                            <span class="avatar me-3" style="background-image: url('`+ result[i].AnhDaiDien + `') ; min-width: 32px;min-height:32px"></span>
////                                            <div>
////                                                <div class="font-weight-medium">` + result[i].TieuDe + `</div>
////                                                <div class="text-primary">` + result[i].NgayThucHien + `</div>
////                                            </div>
////                                        </div>`;
////            if (result[i].LoaiNhatKy == 'TB') {
////                TB += `  <div class="form-selectgroup-label-content d-flex align-items-center mb-3" style="cursor:pointer"  onclick="ChuyenDenChucNangTheoThongBao('` + result[i].ChucNangChuyenDen + `')">
////                                            <span class="avatar me-3" style="background-image: url('`+ result[i].AnhDaiDien + `') ; min-width: 32px;min-height:32px"></span>
////                                            <div>
////                                                <div class="font-weight-medium">` + result[i].TieuDe + `</div>
////                                                <div class="text-primary">` + result[i].NgayThucHien + `</div>
////                                            </div>
////                                        </div>`;
////            }
////            else if (result[i].LoaiNhatKy == 'HD') {
////                HD += `  <div class="form-selectgroup-label-content d-flex align-items-center mb-3" style="cursor:pointer"   onclick="ChuyenDenChucNangTheoThongBao('` + result[i].ChucNangChuyenDen + `')">
////                                            <span class="avatar me-3" style="background-image: url('`+ result[i].AnhDaiDien + `') ; min-width: 32px;min-height:32px"></span>
////                                            <div>
////                                                <div class="font-weight-medium">` + result[i].TieuDe + `</div>
////                                                <div class="text-primary">` + result[i].NgayThucHien + `</div>
////                                            </div>
////                                        </div>`;
////            } else {
////                HT += `  <div class="form-selectgroup-label-content d-flex align-items-center mb-3" style="cursor:pointer"   onclick="ChuyenDenChucNangTheoThongBao('` + result[i].ChucNangChuyenDen + `')">
////                                            <span class="avatar me-3" style="background-image: url('`+ result[i].AnhDaiDien + `') ; min-width: 32px;min-height:32px"></span>
////                                            <div>
////                                                <div class="font-weight-medium">` + result[i].TieuDe + `</div>
////                                                <div class="text-primary">` + result[i].NgayThucHien + `</div>
////                                            </div>
////                                        </div>`;
////            }
////        }
////        $('#Tab3_ThongBaoChung').html(TB);
////        $('#Tab2_ThongBaoChung').html(HD);
////        $('#Tab4_ThongBaoChung').html(HT);
////        $('#Tab1_ThongBaoChung').html(info);
////        if (info != ``) { $('#Tab1_ThongBaoChung').css('text-align', 'left'); }
////        if (TB != ``) { $('#Tab3_ThongBaoChung').css('text-align', 'left'); }
////        if (HD != ``) { $('#Tab2_ThongBaoChung').css('text-align', 'left'); }
////        if (HT != ``) { $('#Tab4_ThongBaoChung').css('text-align', 'left'); }
////        $('#SoLuongTBTatCa').text(soluong);
////        $('#SoLuongTBHD').text(soluongHD);
////        $('#SoLuongTBTB').text(soluongTB);
////        $('#SoLuongTBHT').text(soluongHT);

////    } else {
////        $('#Tab3_ThongBaoChung').html(`<img src="/Images/Hinh_ThongBaoRong.jpg" />
////                                        <span style="font-weight:600;font-size:16px">Chưa có thông báo nào</span>`);
////        $('#Tab3_ThongBaoChung').css('text-align', 'center');

////        $('#Tab1_ThongBaoChung').html(`<img src="/Images/Hinh_ThongBaoRong.jpg" />
////                                        <span style="font-weight:600;font-size:16px">Chưa có thông báo nào</span>`);
////        $('#Tab1_ThongBaoChung').css('text-align', 'center');
////        $('#SoLuongTBTatCa').text(0);
////        $('#SoLuongTBHD').text(0);
////        $('#SoLuongTBTB').text(0);
////        $('#SoLuongTBHT').text(0);
////        //$('#soluong_ChuaXem').text(soluong);
////    }
////    if (soluong_ChuaXem == 0) {
////        $('#ThongBaoMoi').css('display', 'none');
////    } else {
////        $('#ThongBaoMoi').text(soluong_ChuaXem > 99 ? '99+' : soluong_ChuaXem);
////    }
////}
////function ChuyenDenChucNangTheoThongBao(DuongDan) {
////    if (DuongDan != '') {
////        window.location = DuongDan;
////    }
////}
////function ChangeDonVi_header() {
////    $('#mdThayDoiDonVi_header').modal('show');
  
    
////    setTimeout(function () {
////        LoadGrid_ChonDonVi_ThayDoiDonVi();
////    }, 50)
    
////    setTimeout(function () {
////        var resultDV = NTS.getAjax('/DanhMuc/DungChung/GetDonViDangDangNhap', {});
////        Grid_ChonDonVi_ThayDoiDonVi.selectRow(resultDV.Result[0].DonViID);
////        $('.lblTenDonViSD_md').text(resultDV.Result[0].MaDonVi + " - " + resultDV.Result[0].TenDonVi);
////        Grid_ChonDonVi_ThayDoiDonVi.scrollToRow(resultDV.Result[0].DonViID, "middle", false)
////            .then(function () {
               
////            })
////    }, 250)
////    $(document).on('keyup', '#txtDonViID_header', function (e) {
////        if (e.keyCode == '13') {
////            Grid_ChonDonVi_ThayDoiDonVi.setFilter(matchAny, { value: $(this).val() });
////        }
////    });
    
////    return false;
////}
////function LoadGrid_ChonDonVi_ThayDoiDonVi() {
////    Grid_ChonDonVi_ThayDoiDonVi = new Tabulator("#Grid_ChonDonVi_ThayDoiDonVi", {
////        height: 350,
////        layout: "fitColumns",
////        pagination: "local",
////        selectable: 1,
////        paginationSize: true,
////        selectable: 1,
////        index: "DonViID",
////        groupBy: ["TenDonViCapTren"],
////        columns: [ //Define Table Columns
////            {
////                formatter: "rowSelection", titleFormatter: "rowSelection", hozAlign: "center", cellClick: function (e, cell) {
////                    cell.getRow().toggleSelect();
////                }, width: 40, headerSort: false, frozen: true, headerHozAlign: "center", hozAlign: "center", vertAlign: "middle"
////            },
////            { title: "", field: "NoiDung", minWidth: 120, visible: true, vertAlign: "middle", formatter: 'textarea' },
////            { title: "DonViID", field: "DonViID", visible: false },
////        ],
////        locale: true,
////        paginationCounter: "rows",
////        langs: TabulatorLangsVi,
////        placeholder: 'Không có dữ liệu',
////    });
////    setTimeout(function () {
////        var data_ThayDoiDonVi = NTS.getAjax("/DanhMuc/DungChung/GetDonViTheoDonViTrucThuoc", {});
////        if (data_ThayDoiDonVi.Result.length > 0) {
////            Grid_ChonDonVi_ThayDoiDonVi.clearData();
////            Grid_ChonDonVi_ThayDoiDonVi.setData(data_ThayDoiDonVi.Result);
////            Grid_ChonDonVi_ThayDoiDonVi.redraw(true);
////        }
////    }, 100)
////}


////$(function () {
////    $.fn.tolist1 = function (options) {
////        if (typeof $(this).val() == "undefined")
////            NTS.loi("Không tìm thấy control" + this.selector);
////        var defaults = {
////            ajaxUrl: '', //Đường dẫn lấy dữ liệu
////            ajaxParam: {}, //tham số 
////        };
////        var settings = $.extend(defaults, options);
////        var data = NTS.getdata({
////            ajaxUrl: settings.ajaxUrl,
////            ajaxParam: settings.ajaxParam,
////        });
////        var elements;
////        if (data.d.Result != null)
////            elements = $.map(data.d.Result, function (e) {
////                return [$.map(e, function (v) {
////                    return v;
////                })];
////            });
////        $(this).attr("type", "radio");
////        $(this).html('');
////        if (data.d.Result != null)
////            for (i = 0; i < elements.length; i++) {
////                $(this).append('<li><label class="form-check"><input class="form-check-input xacnhandv' + elements[i][0]+'" type="radio" name="' + 'DonViID_header' + '" class="ace" value="' + elements[i][0] + '"/><span class="lbl"> ' + elements[i][2] + '</span></label></li>');
////            }
////    }

////    $.fn.search1 = function () {
////        if (typeof ("DonViID_header") == 'undefined')
////            NTS.loi("Control không được cài đặt để điều khiển bất kì list nào!");
////        var key = $(this).value();
////        $("#DonViID_header li").each(function (index) {
////            if ($(this).find(".lbl").html().toLowerCase().indexOf(key.toLowerCase()) > -1) {
////                $(this).show();
////            }
////            else {
////                $(this).hide();
////            }
////        });
////    };

////    $.fn.value1 = function (data) {
////        if (typeof $(this).val() == 'undefined')
////            NTS.loi('Không tìm thấy control ' + this.selector);
////        if (typeof data !== 'undefined') {
////            if ($(this).prop('type') == 'text') {
////                if ($(this).attr('class').includes('date-picker')) {
////                    $(this).datepicker({ dateFormat: 'dd/mm/yyyy' }).datepicker('setDate', data);
////                }
////                else if ($(this).attr('class').includes('number-format')) {
////                    var bienSo = data + '';
////                    bienSo = formatNumber(bienSo);
////                    $(this).val(bienSo).trigger('change');
////                }
////                else {
////                    $(this).val(data);
////                }
////            }
////            else if ($(this).prop('type').includes('select')) {
////                if (data == '0' || data == null || data == '0' || data == '00000000-0000-0000-0000-000000000000')
////                    $(this).val('').trigger('change');
////                else {
////                    $(this).val(data).trigger('change');
////                }
////            }
////            else if ($(this).prop('type') == 'checkbox' || $(this).prop('type') == 'radio') {
////                $(this).prop('checked', data);
////            }
////            else if ($(this).prop('type') == 'list') {
////                var elements = $.map(data, function (e) {
////                    return [$.map(e, function (v) {
////                        return v;
////                    })];
////                });
////                $($(this).selector + " li").each(function (index) {
////                    for (i = 0; i < elements.length; i++) {
////                        if ($(this).find("input:checkbox")[0].value == elements[i][0]) {
////                            $(this).find("input:checkbox").prop("checked", true);
////                            break;
////                        }
////                        else
////                            $(this).find("input:checkbox").prop("checked", false);
////                    }
////                });
////            }
////            else {
////                $(this).val(data);
////            }
////        }
////        else {
////            //Lấy giá trị
////            if ($(this).prop('type') == 'text')
////                return $(this).val();
////            else if ($(this).prop('type').includes('select')) {

////                if ($(this).val() == null || $(this).val() == "0" || $(this).val() == "00000000-0000-0000-0000-000000000000")
////                    return "";
////                else
////                    return $(this).val();
////            }
////            else if ($(this).prop('type') == 'checkbox' || $(this).prop('type') == 'radio') {
////                return $(this).prop('checked');
////            }
////            else if ($(this).prop('type') == 'list') {
////                var rtn = [];
////                $($(this).selector + " li").each(function (index) {
////                    if ($(this).find("input:checkbox").prop("checked") == true) {
////                        rtn.push({
////                            "id": $(this).find("input:checkbox")[0].value, //khóa chính
////                            "value": $(this).find(".lbl").html(),//Text hiển thị 
////                        });
////                    }
////                });
////                return rtn;
////            }
////            else
////                return $(this).val();
////        }
////    }
////});
//////Thay đổi nhanh đơn vị
////$(document).on('click', '#btnXacNhan_header', function () {
////    if (Grid_ChonDonVi_ThayDoiDonVi.getSelectedData().length == 0) {
////        NTS.canhbao("Vui lòng chọn đơn vị làm việc");
////        return false;
////    }
////    var resultXaNhan = NTS.getAjax('/QuanLy/DungChung/CapNhatDonVi', { id: Grid_ChonDonVi_ThayDoiDonVi.getSelectedData()[0].DonViID });
////    $('#mdThayDoiDonVi_header').modal("hide");
////    setTimeout(function () {
////        var resultDV = NTS.getAjax('/DanhMuc/DungChung/GetDonViDangDangNhap', {});
////        $('.lblTenDonViSD_drop').text(resultDV.Result[0].MaDonVi + " - " + resultDV.Result[0].TenDonVi);
////        $('#tendonvi_layout_1').text(resultDV.Result[0].MaDonVi + " - " + resultDV.Result[0].TenDonVi);
////    }, 1)
////    location.reload();
////    return false;


////});





