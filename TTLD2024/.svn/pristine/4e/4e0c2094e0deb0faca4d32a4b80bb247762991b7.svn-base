//Theo dõi lỗi không edit được CKE
//var DauTachNhomTienTe = NTS.getAjax('/api/DauTachNhomTienTe', {}).Result;
//var DauTachThapPhan = NTS.getAjax('/api/DauTachThapPhan', {}).Result;
//var DauTachNhomTienTe = "";
//var DauTachThapPhan = "";
$(".cke").removeAttr("tabindex");

function getUrl() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
//Xu ly khong xoa
//Ket thuc xu ly khong xoa
String.prototype.replaceAll = function (strTarget, strSubString) {
    var strText = this;
    if (strText.length > 0) {
        var intIndexOfMatch = strText.indexOf(strTarget);
        while (intIndexOfMatch != -1) {
            strText = strText.replace(strTarget, strSubString)
            intIndexOfMatch = strText.indexOf(strTarget);
        }
        return (strText);
    } else {
        return "";
    }
}
function checkDate(value, flag) {
    var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    //Cho phép rỗng
    if (flag == true) {
        if (!value.match(re)) {
            return false;
        } else
            return true;
    } else if (value != '' && !value.match(re)) {
        return false;
    }
}
//Kiểm tra value null hoặc bằng 0
function isEmtyValue(value) {
    if (value == "0" || value == "")
        return true;
    return false;
}

function bindData(comboName, dataSource) {
    comboName.options.clear();
    if (dataSource != null) {
        $.each(JSON.parse(dataSource.toJSON()).Rows, function (index, item) {
            comboName.options.add(item[1] + "", item[0] + "", comboName.options.length);
        })
    }
}
//custom filter function
function matchAny(data, filterParams) {
    //data - the data for the row being filtered
    //filterParams - params object passed to the filter
    var regex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
    var match = false;
    for (var key in data) {
        try {
            if (data[key] != "" && !regex.test(data[key])) {
                if (data[key].toLowerCase().indexOf(filterParams.value.toLowerCase()) !== -1) {
                    match = true;
                    return match;
                }
            }
        }
        catch (e) { }
    }
    return match;
}
function checkEmtyValue(value) {
    if (value == "0" || value == "")
        return true;
    return false;
}
//Kiểm tra value null
function isEmty(value) {
    if (value == "")
        return true;
    return false;
}
//Định dạng window
function dinhDangWindow(winDowName) {
    var screenWidth = screen.width;
    var screenHeight = screen.height;
    var WindowSize = winDowName.getSize();
    winDowName.setPosition(parseFloat((parseFloat(screenWidth) - parseFloat(WindowSize.width)) / 2), window.scrollY + 100);
    winDowName.Open();
}
//Định dạng số
function dinhDangSo(sender, value) {
    sender.value(formatNumber(value));
}

//Định dạng tiền tệ
//function formatNumber(str) {
//    var soAm = (str + "").substring(0, 1);
//    if (soAm == "-")
//        str = str.replace("-", "");
//    if (jQuery.type(str) == "undefined" || str == null)
//        return '0';
//    str = str.toString();
//    var m = str.lastIndexOf(DauTachThapPhan);
//    var phanNguyen = "";
//    var phanThapPhan = "";
//    if (m == -1)
//        phanNguyen = str;
//    else {
//        phanNguyen = str.substring(0, str.lastIndexOf(DauTachThapPhan));
//        phanThapPhan = str.substring(str.lastIndexOf(DauTachThapPhan), str.length);
//    }
//    var kq = "";
//    var dem = 0;
//    phanNguyen = parseFloat(phanNguyen.split(DauTachNhomTienTe).join('').split(DauTachThapPhan).join('')).toString();
//    for (var i = phanNguyen.length; i > 0; i--) {

//        if (!isNaN(phanNguyen.substring(i, i - 1))) {
//            kq = phanNguyen.substring(i, i - 1).toString() + kq;
//            if (dem == 2 && i != 1) {
//                kq = DauTachNhomTienTe + kq;
//                dem = 0;
//            } else {
//                dem = dem + 1;
//            }
//        }
//    } 
//    if (phanThapPhan != '' && phanThapPhan != DauTachThapPhan && parseFloat(phanThapPhan.split(DauTachThapPhan).join('').split(DauTachNhomTienTe).join('')).toString() != "0") {
//        phanThapPhan = parseFloat(phanThapPhan.split(DauTachThapPhan).join('').split(DauTachNhomTienTe).join('')).toString();
//        phanThapPhan = DauTachThapPhan + phanThapPhan;
//    } else if (phanThapPhan == DauTachThapPhan) {
//        phanThapPhan = DauTachThapPhan;
//    }
//    else
//    { phanThapPhan = ''; }
//    if (kq + phanThapPhan == '')
//        return 0;

//    kq = kq + phanThapPhan;
//    if (soAm == "-")
//        kq = "-" + kq + "";
//    return kq;
//}
//Định dạng tiền tệ
function formatNumber(str) {
    if (typeof str == 'number') {
        str = "" + str;
        str = str.replace('.', ',');
    }
    //str = "" + str;
    //str = str.replace('.', ',');
    str = str.replace(/[^0-9,.-]/g, '');
    var soAm = (str + "").substring(0, 1);
    if (soAm == "-")
        str = str.replace("-", "");
    if (jQuery.type(str) == "undefined" || str == null)
        return '0';
    str = str.toString();
    var m = str.lastIndexOf(DauTachThapPhan);
    var phanNguyen = "";
    var phanThapPhan = "";
    if (m == -1)
        phanNguyen = str;
    else {
        phanNguyen = str.substring(0, str.lastIndexOf(DauTachThapPhan));
        phanThapPhan = str.substring(str.lastIndexOf(DauTachThapPhan), str.length);
    }
    var kq = "";
    var dem = 0;
    phanNguyen = phanNguyen.replace(/[^0-9.-]/g, '');
    phanThapPhan = phanThapPhan.replace(/[^0-9.,]/g, '');
    phanNguyen = parseFloat(phanNguyen.split(DauTachNhomTienTe).join('').split(DauTachThapPhan).join('')).toString();
    for (var i = phanNguyen.length; i > 0; i--) {

        if (!isNaN(phanNguyen.substring(i, i - 1))) {
            kq = phanNguyen.substring(i, i - 1).toString() + kq;
            if (dem == 2 && i != 1) {
                kq = DauTachNhomTienTe + kq;
                dem = 0;
            } else {
                dem = dem + 1;
            }
        }
    };
    if (phanThapPhan != '' && phanThapPhan != DauTachThapPhan) {
        phanThapPhan = phanThapPhan.split(DauTachThapPhan).join('').split(DauTachNhomTienTe).join('').toString();
        phanThapPhan = ',' + phanThapPhan;
    } else if (phanThapPhan == ',') {
        phanThapPhan = ',';
    }
    else {
        phanThapPhan = '';
    }

    if (kq + phanThapPhan == '' && soAm == "-")
        return soAm + "";

    kq = kq + phanThapPhan;
    if (soAm == "-")
        kq = "-" + kq + "";
    return kq;
}
function formatNumberJS(str) {
    try {
        str += "";
        if (DauTachThapPhan == '.') {
            str = str.replaceAll(DauTachNhomTienTe, '');
            if ($.isNumeric(str)) {
                return str.replaceAll(",", ".");
            }
            return "0";
        }
        else {
            str = str.replaceAll('.', '');
            str = str.replaceAll(',', '.');
            if ($.isNumeric(str)) {
                return str;
            }
            return "0";
        }
    }
    catch (e) {
        return "0";
    }
}

function formatNumber_TableNTS(str) {
    str = "" + str;
    if (isNaN(str.replaceAll(',', '').replaceAll('.', ''))) {
        return str;
    }
    str = str.replace(/[^0-9,.-]/g, '');
    var soAm = (str + "").substring(0, 1);
    if (soAm == "-")
        str = str.replace("-", "");
    if (jQuery.type(str) == "undefined" || str == null)
        return '0';
    str = str.toString();
    var m = str.lastIndexOf(DauTachThapPhan);
    var phanNguyen = "";
    var phanThapPhan = "";
    if (m == -1)
        phanNguyen = str;
    else {
        phanNguyen = str.substring(0, str.lastIndexOf(DauTachThapPhan));
        phanThapPhan = str.substring(str.lastIndexOf(DauTachThapPhan), str.length);
    }
    var kq = "";
    var dem = 0;
    phanNguyen = phanNguyen.replace(/[^0-9.-]/g, '');
    phanThapPhan = phanThapPhan.replace(/[^0-9.,]/g, '');
    phanNguyen = parseFloat(phanNguyen.split(DauTachNhomTienTe).join('').split(DauTachThapPhan).join('')).toString();
    for (var i = phanNguyen.length; i > 0; i--) {
        if (!isNaN(phanNguyen.substring(i, i - 1))) {
            kq = phanNguyen.substring(i, i - 1).toString() + kq;
            if (dem == 2 && i != 1) {
                kq = DauTachNhomTienTe + kq;
                dem = 0;
            } else {
                dem = dem + 1;
            }
        }
    };
    if (phanThapPhan != '' && phanThapPhan != DauTachThapPhan) {
        phanThapPhan = phanThapPhan.split(DauTachThapPhan).join('').split(DauTachNhomTienTe).join('').toString();
        phanThapPhan = ',' + phanThapPhan;
    } else if (phanThapPhan == ',') {
        phanThapPhan = ',';
    }
    else {
        phanThapPhan = '';
    }

    if (kq + phanThapPhan == '' && soAm == "-")
        return soAm + "";

    kq = kq + phanThapPhan;
    if (soAm == "-")
        kq = "-" + kq + "";
    return kq;
}

// Code goc
//function formatNumber(str) {
//    var soAm = (str + "").substring(0, 1);
//    if (soAm == "-")
//        str = str.replace("-", "");
//    if (jQuery.type(str) == "undefined" || str == null)
//        return '0';
//    str = str.toString();
//    var m = str.lastIndexOf(",");
//    var phanNguyen = "";
//    var phanThapPhan = "";
//    if (m == -1)
//        phanNguyen = str;
//    else {
//        phanNguyen = str.substring(0, str.lastIndexOf(","));
//        phanThapPhan = str.substring(str.lastIndexOf(","), str.length);
//    }
//    var kq = "";
//    var dem = 0;
//    phanNguyen = parseFloat(phanNguyen.split(".").join('').split(",").join('')).toString();
//    for (var i = phanNguyen.length; i > 0; i--) {

//        if (!isNaN(phanNguyen.substring(i, i - 1))) {
//            kq = phanNguyen.substring(i, i - 1).toString() + kq;
//            if (dem == 2 && i != 1) {
//                kq = "." + kq;
//                dem = 0;
//            } else {
//                dem = dem + 1;
//            }
//        }
//    }
//    if (phanThapPhan != '' && phanThapPhan != ',' && parseFloat(phanThapPhan.split(",").join('').split(".").join('')).toString() != "0") {
//        phanThapPhan = parseFloat(phanThapPhan.split(",").join('').split(".").join('')).toString();
//        phanThapPhan = ',' + phanThapPhan;
//    } else if (phanThapPhan == ',') {
//        phanThapPhan = ',';
//    }
//    else { phanThapPhan = ''; }
//    if (kq + phanThapPhan == '')
//        return 0;

//    kq = kq + phanThapPhan;
//    if (soAm == "-")
//        kq = "-" + kq + "";
//    return kq;
//}
var keyEnter = 0;
function performSearch(grid, index, value) {
    if (keyEnter != "1") {
        return false
    }
    keyEnter = 0;
    for (var i = index; i < grid.ColumnsCollection.length - 1; i++) {
        var s = grid.ColumnsCollection[i].DataField;
        if (grid.ColumnsCollection[i].Visible == true) {
            grid.addFilterCriteria(s, OboutGridFilterCriteria.Contains, value);
        }
    }
    grid.executeFilter();
    searchTimeout = null;
    return false;
}
var searchTimeout = null;

function searchValue(grid, index, value) {
    if (keyEnter != "1") {
        return false
    }
    keyEnter = 0;
    if (searchTimeout != null) {
        return false;
    }
    if (searchTimeout != null) {
        return false;
    }
    if (jQuery.type(value) == "undefined")
        value = '';
    for (var i = index; i < grid.ColumnsCollection.length; i++) {
        if (grid.ColumnsCollection[i].HeaderText != "") {
            var s = grid.ColumnsCollection[i].DataField;
            if (grid.ColumnsCollection[i].Visible == true && s != "") {
                grid.addFilterCriteria(s, OboutGridFilterCriteria.Contains, value);
            }
        }
    }
    //if (jQuery.type(grid.executeFilter()) == "undefined") {
    //    alert("Looix");
    //    return false;
    //}
    searchTimeout = window.setTimeout(grid.executeFilter(), 2000);
    searchTimeout = null;
    return false;
}
// tìm kiếm trong grid
// Range là mảng index cột trong grid
function SearchGridByValue(gridID, Range, value) {
    if (keyEnter != "1") {
        return false
    }
    keyEnter = 0;
    if (searchTimeout != null) {
        return false;
    }
    (jQuery.type(value) == "undefined") && (value = '');
    (jQuery.isEmptyObject(Range)) && (Range.length = 0);
    if (Range.length > 0 && Range[0] == -1) {
        for (var i = index; i < grid.ColumnsCollection.length; i++) {
            if (grid.ColumnsCollection[i].HeaderText != "") {
                var s = grid.ColumnsCollection[i].DataField;
                if (grid.ColumnsCollection[i].Visible == true && s != "") {
                    grid.addFilterCriteria(s, OboutGridFilterCriteria.Contains, value);
                }
            }
        }
    }
    else {
        for (var i = 0; i < Range.length; i++) {
            if (gridID.ColumnsCollection[Range[i]].HeaderText != "") {
                var ColName = gridID.ColumnsCollection[Range[i]].DataField;
                (gridID.ColumnsCollection[Range[i]].Visible == true && ColName != "") && (gridID.addFilterCriteria(ColName, OboutGridFilterCriteria.Contains, value));
            }
        }
    }

    gridID.executeFilter();
    (value == '' || value == undefined) && (gridID.executeFilter());
    return false;
}

function bieuDoTron(result, tenBieuDo, DivID) {
    var dataTableGoogle = new google.visualization.DataTable();
    for (var i = 0; i < result.Columns.length; i++) {
        if (i == 0)
            dataTableGoogle.addColumn('string', result.Columns[i].Name);
        else
            dataTableGoogle.addColumn('number', result.Columns[i].Name);
    }
    dataTableGoogle.addRows(
        JSON.parse(result.toJSON()).Rows
    );
    // Instantiate and draw our chart, passing in some options
    var chart = new google.visualization.PieChart(document.getElementById(DivID));
    chart.draw(dataTableGoogle, {
        title: tenBieuDo,
        position: "top",
        fontsize: "14px",
        chartArea: {
            width: '100%',
            height: '100%'
        },
    });
}

function bieuDoTron3D(result, tenBieuDo, DivID) {
    var dataTableGoogle = new google.visualization.DataTable();
    for (var i = 0; i < result.Columns.length; i++) {
        if (i == 0)
            dataTableGoogle.addColumn('string', result.Columns[i].Name);
        else
            dataTableGoogle.addColumn('number', result.Columns[i].Name);
    }
    dataTableGoogle.addRows(
        JSON.parse(result.toJSON()).Rows
    );
    // Instantiate and draw our chart, passing in some options
    //var chart = new google.visualization.PieChart(document.getElementById(DivID));
    var options = {
        title: tenBieuDo,
        position: "top",
        fontsize: "12px",
        top: '20px',
        chartArea: {
            width: '100%',
            height: '80%'
        },
        is3D: true
    };

    var chart = new google.visualization.PieChart(document.getElementById(DivID));

    chart.draw(dataTableGoogle, options);

    //chart.draw(dataTableGoogle,
    //    {
    //        title: tenBieuDo,
    //        position: "top",
    //        fontsize: "14px",
    //        top:'20px',
    //        chartArea: { width: '300px', height: '100%' },
    //        is3D:true
    //    });
}

function veBieuDoCot(result, tenBieuDo, DivID) {

    var dataTableGoogle = new google.visualization.DataTable();
    for (var i = 0; i < result.Columns.length; i++) {
        if (i == 0)
            dataTableGoogle.addColumn('string', result.Columns[i].Name);
        else
            dataTableGoogle.addColumn('number', result.Columns[i].Name);
    }
    dataTableGoogle.addRows(
        JSON.parse(result.toJSON()).Rows
    );
    // Instantiate and draw our chart, passing in some options
    var chart = new google.visualization.ColumnChart(document.getElementById(DivID));
    chart.draw(dataTableGoogle, {
        title: tenBieuDo,
        position: "top",
        fontsize: "14px",
    });
}

function veBieuDoPhatTrien(result, tenBieuDo, DivID) {
    if (result == null) {
        $('#' + DivID).html("");

    } else {
        var dataTableGoogle = new google.visualization.DataTable();
        for (var i = 0; i < result.Columns.length; i++) {
            if (i == 0)
                dataTableGoogle.addColumn('string', result.Columns[i].Name);
            else
                dataTableGoogle.addColumn('number', result.Columns[i].Name);
        }
        dataTableGoogle.addRows(
            JSON.parse(result.toJSON()).Rows
        );
        var options = {
            title: tenBieuDo,
        };
        var chart = new google.visualization.LineChart(document.getElementById(DivID));
        chart.draw(dataTableGoogle, options);
    }

}
//var pickerFn = $.fn.datepicker,
//    placeholder = 'dd/MM/yyyy';
//$.fn.datepicker = function () {
//    var datePicker = pickerFn.apply(this, arguments);
//    var self = this;
//    self.attr('placeholder', placeholder);
//    return datePicker;
//};
// control boostrap
//Ngày bỗ sung: 18/12/2018
//Người bỗ sung: Vịnh
// Nội dung: các hàm sử dụng cho theme boostrap
function Loadding(class_) {
    $('.' + class_).append('<div class="message-loading-overlay"><i class="fa-spin ace-icon fa fa-spinner orange2 bigger-260"></i></div>');
}
function Loadding_Finish(class_) {
    $('.' + class_).find('.message-loading-overlay').remove();
}
function An_HienNut(idBotton, thaoTac) {
    $('#' + idBotton).css("visibility", '' + thaoTac + '');
    $('#' + idBotton).css("display", '' + thaoTac + '');
}
function HienThiControl(idBotton, visibe) {
    if (visibe) {
        $('#' + idBotton).css("visibility", "visible");
        $('#' + idBotton).css("display", "inline-block");
    } else {
        $('#' + idBotton).css("visibility", "hidden");
        $('#' + idBotton).css("display", "none");
    }
}
//Loại bỏ các khoảng trắng ở đầu, cuối và dư thừa của chuỗi.
function trimSpace(str) {
    if (str == "" || str == null)
        return "";
    else
        return str.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, "").replace(/\s+/g, " ");
}
//kiem tra email
function KiemTraEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    } else {
        return false;
    }
}
//kiem tra sdt
function KiemTraSDT(txtPhone) {
    var filter = /^[0-9]+$/;
    if (filter.test(txtPhone)) {
        return true;
    } else {
        return false;
    }
}
function kiemTraTenDangNhap(chuoi) {
    var usernameRegex = /^[a-zA-Z0-9-_]+$/;
    if (usernameRegex.test(chuoi)) {
        return true;
    } else {
        return false;
    }
}
$(document).keypress(function (e) {
    if (!e.shiftKey && e.keyCode == 13) {
        keyEnter = 1;
        return false;
    }
});

var now = new Date();
var dayArray = new Array(9);
function layThoiGianTheoKyBaoCao(idTuNgay, idDenNgay, idKyBaoCao) {
    $('#' + idTuNgay + '').prop('disabled', true);
    $('#' + idDenNgay + '').prop('disabled', true);
    var ngayHienTai = '';
    var thangHienTai = '';
    dayArray[0] = "01";
    dayArray[1] = "02";
    dayArray[2] = "03";
    dayArray[3] = "04";
    dayArray[4] = "05";
    dayArray[5] = "06";
    dayArray[6] = "07";
    dayArray[7] = "08";
    dayArray[8] = "09";
    if (now.getDate() < 10)
        ngayHienTai = dayArray[now.getDate() - 1];
    else
        ngayHienTai = now.getDate();
    if ($('#' + idKyBaoCao + '').val() < 10)
        thangHienTai = dayArray[$('#' + idKyBaoCao + '').val() - 1];
    else
        thangHienTai = $('#' + idKyBaoCao + '').val();
    if ($('#' + idKyBaoCao + '').val() == "") {
        $('#' + idTuNgay + '').prop('disabled', false);
        $('#' + idDenNgay + '').prop('disabled', false);
    } else if ($('#' + idKyBaoCao + '').val() < 13) {
        $('#' + idTuNgay + '').val('01/' + thangHienTai + '/' + now.getFullYear());
        $('#' + idDenNgay + '').val(getDaysOfMonth(new Date().getFullYear(), $('#' + idKyBaoCao + '').val()) + '/' + thangHienTai + '/' + now.getFullYear());
    }
    else if ($('#' + idKyBaoCao + '').val() == 13) {
        $('#' + idTuNgay + '').val('01/01/' + now.getFullYear());
        $('#' + idDenNgay + '').val('31/12/' + now.getFullYear());
    }
    else if ($('#' + idKyBaoCao + '').val() == 14) {
        $('#' + idTuNgay + '').val('01/01/' + now.getFullYear());
        $('#' + idDenNgay + '').val('31/03/' + now.getFullYear());
    }
    else if ($('#' + idKyBaoCao + '').val() == 15) {
        $('#' + idTuNgay + '').val('01/04/' + now.getFullYear());
        $('#' + idDenNgay + '').val('30/06/' + now.getFullYear());
    }
    else if ($('#' + idKyBaoCao + '').val() == 16) {
        $('#' + idTuNgay + '').val('01/07/' + now.getFullYear());
        $('#' + idDenNgay + '').val('30/09/' + now.getFullYear());
    }
    else if ($('#' + idKyBaoCao + '').val() == 17) {
        $('#' + idTuNgay + '').val('01/10/' + now.getFullYear());
        $('#' + idDenNgay + '').val('31/12/' + now.getFullYear());
    }
    else if ($('#' + idKyBaoCao + '').val() == 18) {
        $('#' + idTuNgay + '').val('01/01/' + now.getFullYear());
        $('#' + idDenNgay + '').val('30/06/' + now.getFullYear());
    }
    else if ($('#' + idKyBaoCao + '').val() == 19) {
        $('#' + idTuNgay + '').val('01/07/' + now.getFullYear());
        $('#' + idDenNgay + '').val('31/12/' + now.getFullYear());
    }
    else if ($('#' + idKyBaoCao + '').val() == 20) {
        $('#' + idTuNgay + '').prop('disabled', false);
        $('#' + idDenNgay + '').prop('disabled', false);
    }
}
function getDaysOfMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

$(function () {
    $('.date-picker').datepicker({
        format: 'dd/mm/yyyy',//use this option to display seconds
        autoclose: true,
        todayHighlight: true,
        startDate: new Date('1900-01-01'),
        endDate: new Date('2079-12-31')
    });
    $('.date-picker').wrap('<div class="input-group"></div>');
    $('.date-picker').after(`<span class="input-group-text cursor-pointer"><i class="fa-solid fa-calendar-days" style="color:var(--tbl-btn-luuvadong)"></i></span>`);
    $('.date-picker').prop('placeholder', 'dd/MM/yyyy');
    $('.date-picker + .input-group-text').on('click', function () {
        $(this).prev().focus();
    });
    $('input[name="datepicker"]').wrap('<div class="input-group"></div>');
    $('input[name="datepicker"]').after(`<span class="input-group-text cursor-pointer" for="input[name='datepicker']"><i class="fa fa-calendar"></i></span>`);
    $('input[name="datepicker"]').prop('placeholder', 'dd/MM/yyyy');
    $('input[name="datepicker"] + .input-group-text').on('click', function () {
        $(this).prev().focus();
    });




    //    .next().on(ace.click_event, function () {
    //    $(this).prev().focus();
    //});
    $(document).on('keyup', '.number-format', function () {
        $(this).val(formatNumber($(this).val()));
    });
    $(document).on('change', '.number-format', function (evt) {
        $(this).val(formatNumber($(this).val()));
    });

    $(document).on('keyup', '.number-table-nts', function () {
        $(this).val(formatNumber_TableNTS($(this).val()));
    });
    $(document).on('change', '.number-table-nts', function (evt) {
        $(this).val(formatNumber_TableNTS($(this).val()));
    });

    //set
    $("button").on('dblclick', function (event) {
        event.preventDefault();
    });
});
function getAjax(kieuTraVe, duongDanAjax, duLieuGui) {
    var result = null;
    $.ajax({
        type: "POST",
        url: duongDanAjax,
        data: JSON.stringify(duLieuGui),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            result = response.d;
        },
        error: function (response) {
            result = null;
            console.log(response);
        }
    });
    if (result === null) return null;
    // xử lý kiểu trả về
    switch (kieuTraVe.toLowerCase()) {
        case "string":
            return result;
            break;
        case "boolean":
            try {
                return JSON.parse((result).toString().toLowerCase());
            } catch (e) {
                return false;
            }
            break;
        case "json":
            try {
                return JSON.parse(result.toString());
            } catch (e) {
                console.log(e);
            }
            break;
        default:
            return null;
            break;
    }
}
var quyenTruyCap;
function kiemTraPhanQuyen() {
    $.ajax({
        type: "POST",
        url: "../../Services/ServiceSystem.asmx/kiemTraPhanQuyen",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            quyenTruyCap = JSON.parse(response.d);
        },
        error: function () {
            quyenTruyCap = "";
        }
    });
}
function Loadding(class_) {
    $('' + class_ + '').append('<div class="message-loading-overlay"><i class="fa-spin ace-icon fa fa-spinner orange2 bigger-260"></i></div>');
}
function Loadding_Finish(class_) {
    $('' + class_ + '').find('.message-loading-overlay').remove();
}
function An_HienNut(idBotton, thaoTac) {
    $('' + idBotton + '').css("visibility", '' + thaoTac + '');
    $('' + idBotton + '').css("display", '' + thaoTac + '');
}
function HienThiControl(idBotton, visibe) {
    if (visibe) {
        $('' + idBotton + '').css("visibility", "visible");
        $('' + idBotton + '').css("display", "inline-block");
    }
    else {
        $('' + idBotton + '').css("visibility", "hidden");
        $('' + idBotton + '').css("display", "none");
    }
}

function HienThongBao(tieudeTB, noidungTB, loaiTB) {
    switch (loaiTB) {
        case "Loi":
            //lỗi
            $.gritter.add({
                title: tieudeTB,
                text: noidungTB,
                class_name: 'gritter-error' + (!$('#gritter-light').get(0).checked ? ' gritter-light' : '')
            });
            break;
        case "ThanhCong":
            //thành công
            $.gritter.add({
                title: tieudeTB,
                text: noidungTB,
                class_name: 'gritter-success' + (!$('#gritter-light').get(0).checked ? ' gritter-light' : '')
            });
            break;
        case "CanhBao":
            //cảnh báo
            $.gritter.add({
                title: tieudeTB,
                text: noidungTB,
                class_name: 'gritter-warning' + (!$('#gritter-light').get(0).checked ? ' gritter-light' : '')
            });
            break;
        case "ChiTiet":
            // hiện chi tiêt cảnh báo
            $.gritter.add({
                title: tieudeTB,
                text: noidungTB,
                class_name: 'gritter-info gritter-center' + (!$('#gritter-light').get(0).checked ? ' gritter-light' : '')
            });
            break;

    }
}
//Loại bỏ các khoảng trắng ở đầu, cuối và dư thừa của chuỗi.
function trimSpace(str) {
    if (str == "")
        return str;
    else
        return str.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, "").replace(/\s+/g, " ");
}
//kiem tra email
function KiemTraEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}
//kiem tra sdt
function KiemTraSDT(txtPhone) {
    var filter = /^[0-9]+$/;
    if (filter.test(txtPhone)) {
        return true;
    }
    else {
        return false;
    }
}
//kiem tra ngay thang năm 
function KiemTraNgay(dtValue) {
    var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
    return dtRegex.test(dtValue);
}
//cho input chỉ nhập số
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}
function isNullOrEmptyOrWhitespace(str) {
    return !str || str.trim().length === 0;
}

//// Daterangepicker
//if (jQuery().daterangepicker) {
//    if ($(".date-picker").length) {
//        $('.date-picker').daterangepicker({
//            locale: { format: 'DD/MM/YYYY' },
//            singleDatePicker: true,
//            language: "vi"
//        });
//    }
//    if ($(".datetimepicker").length) {
//        $('.datetimepicker').daterangepicker({
//            locale: { format: 'DD/MM/YYYY hh:mm' },
//            singleDatePicker: true,
//            timePicker: true,
//            timePicker24Hour: true,
//        });
//    }
//    if ($(".daterange").length) {
//        $('.daterange').daterangepicker({
//            locale: { format: 'DD/MM/YYYY' },
//            drops: 'down',
//            opens: 'right'
//        });
//    }
//}

//// Timepicker
//if (jQuery().timepicker && $(".timepicker").length) {
//    $(".timepicker").timepicker({
//        icons: {
//            up: 'fas fa-chevron-up',
//            down: 'fas fa-chevron-down'
//        }
//    });
//}
//jQuery(function ($) {
//    $.daterangepicker.regional["vi-VN"] =
//        {
//            closeText: "Đóng",
//            prevText: "Trước",
//            nextText: "Sau",
//            currentText: "Hôm nay",
//            monthNames: ["Tháng một", "Tháng hai", "Tháng ba", "Tháng tư", "Tháng năm", "Tháng sáu", "Tháng bảy", "Tháng tám", "Tháng chín", "Tháng mười", "Tháng mười một", "Tháng mười hai"],
//            monthNamesShort: ["Một", "Hai", "Ba", "Bốn", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Mười một", "Mười hai"],
//            dayNames: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
//            dayNamesShort: ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"],
//            dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
//            weekHeader: "Tuần",
//            dateFormat: "dd/mm/yy",
//            firstDay: 1,
//            isRTL: false,
//            showMonthAfterYear: false,
//            yearSuffix: ""
//        };

//    $.daterangepicker.setDefaults($.daterangepicker.regional["vi-VN"]);
//});
//add validation

$(function () {
    $('.datetimepicker-input').datetimepicker({
        format: 'DD/MM/YYYY'
    });
    $('input[required], select[required], textarea[required]').prev('label').addClass('validation');
    $('.input-group > input[required], .input-group > select[required], .input-group > textarea[required]').parent().parent().find('label').addClass('validation');

});

var dinhDangSoLuoi = function (cell, formatterParams, onRendered) {
    return formatNumber(cell.getValue() != undefined && cell.getValue() != null ? cell.getValue() : '').toString();
}
function containsNonDigits(chuoi) {
    // Sử dụng biểu thức chính quy để kiểm tra chuỗi
    const regex = /^[0-9,.\-]+$/;

    // Kiểm tra xem chuỗi có khớp với biểu thức chính quy hay không
    return !regex.test(chuoi);
}

function KiemTraKhongCoKyTuDacBiet(chuoi) {
    // Sử dụng biểu thức chính quy để kiểm tra chuỗi
    const regex = /^[a-zA-Z0-9]+$/;

    // Kiểm tra xem chuỗi có khớp với biểu thức chính quy hay không
    return !regex.test(chuoi);
}

function KiemTraKyTuHopLe(chuoi) {
    // Sử dụng biểu thức chính quy để kiểm tra chuỗi chỉ chứa chữ cái và số
    const regex = /^[a-zA-Z0-9]*$/;
    return regex.test(chuoi);
}

function NhapKyTuVaKhoangtrang(chuoi) {
    // Sử dụng biểu thức chính quy để kiểm tra chuỗi chỉ chứa chữ cái và khoảng trắng (bao gồm dấu tiếng Việt)
    const regex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]*$/;
    return regex.test(chuoi);
}



function KiemTraNhapSo(chuoi) {
    // Sử dụng biểu thức chính quy để kiểm tra chuỗi
    const regex = /^[0-9]+$/;

    // Kiểm tra xem chuỗi có khớp với biểu thức chính quy hay không
    return !regex.test(chuoi);
}

// Hàm chỉ cho nhập số từ [0-9]
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

// Hàm kiểm tra ngày sinh có đủ 15 tuồi hay không
function checkAge(ngaySinh) {
    var ngaySinhParts = ngaySinh.split('/');
    var ngaySinhDay = parseInt(ngaySinhParts[0]);
    var ngaySinhMonth = parseInt(ngaySinhParts[1]);
    var ngaySinhYear = parseInt(ngaySinhParts[2]);

    var currentDate = new Date();
    var currentDay = parseInt(currentDate.getDate());
    var currentMonth = parseInt(currentDate.getMonth() + 1); // Tháng trong JavaScript bắt đầu từ 0
    var currentYear = parseInt(currentDate.getFullYear());

    var minAge = 15;

    if (currentYear - ngaySinhYear < minAge) {
        return false;
    } else if (currentYear - ngaySinhYear === minAge) {
        if (currentMonth < ngaySinhMonth) {
            return false;
        } else if (currentMonth === ngaySinhMonth && currentDay < ngaySinhDay) {
            return false;
        }
    }
    return true;
}

// Hàm chỉ cho nhập ký tự là chữ cái và số 0-9
    function isAlphaNumericKey(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (
            (charCode > 31 && charCode < 48) || 
            (charCode > 57 && charCode < 65) || 
            (charCode > 90 && charCode < 97) || 
            charCode > 122
        ) {
            return false;
        }
        return true;
}

function LoaiBoDau(str) {
    var diacriticsMap = {
        'a': 'áàảạãâấầẩậẫăắằẳặẵ',
        'e': 'éèẻẹẽêếềểệễ',
        'i': 'íìỉịĩ',
        'o': 'óòỏọõôốồổộỗơớờởợỡ',
        'u': 'úùủụũưứừửựữ',
        'y': 'ýỳỷỵỹ',
        'd': 'đ'
    };
    for (var char in diacriticsMap) {
        var regex = new RegExp('[' + diacriticsMap[char] + ']', 'g');
        str = str.replace(regex, char);
    }
    return str;
}

function TraVeTenVietTat(fullName) {
    var nameParts = fullName.split(" ");
    var initials = "";

    if (nameParts.length <= 2) {
        for (var i = 0; i < nameParts.length; i++) {
            var word = nameParts[i];
            var sanitizedWord = LoaiBoDau(word);
            var firstLetter = sanitizedWord.charAt(0).toUpperCase();
            initials += firstLetter;
        }
    } else {
        var lastTwoWords = nameParts.slice(-2);
        for (var i = 0; i < lastTwoWords.length; i++) {
            var word = lastTwoWords[i];
            var sanitizedWord = LoaiBoDau(word);
            var firstLetter = sanitizedWord.charAt(0).toUpperCase();
            initials += firstLetter;
        }
    }

    return initials;
}

function getRandomColors(colorArray, numberOfColors) {
    const randomColors = [];

    while (randomColors.length < numberOfColors) {
        const randomIndex = Math.floor(Math.random() * colorArray.length);
        const randomColor = colorArray[randomIndex];

        if (!randomColors.includes(randomColor)) {
            randomColors.push(randomColor);
        }
    }
    return randomColors;
}

function layKyTuDauHoVaTen(hoTen) {
    hoTen = chuyenDauThanhKhongDau(hoTen);

    // Tách họ và tên dựa trên khoảng trắng
    var parts = hoTen.split(" ");

    // Lấy ký tự đầu của họ và tên
    var kyTuDauHo = parts[0].charAt(0);
    var kyTuDauTen = parts[parts.length - 1].charAt(0);

    // Kết hợp ký tự đầu của họ và tên
    var kyTuDauHoVaTen = kyTuDauHo + kyTuDauTen;

    return kyTuDauHoVaTen;
}

function chuyenDauThanhKhongDau(chuoi) {
    var charMap = {
        'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
        'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
        'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
        'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
        'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
        'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
        'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
        'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
        'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
        'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
        'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
        'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
        'đ': 'd',
        'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
        'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
        'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
        'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
        'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
        'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
        'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
        'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
        'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
        'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
        'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
        'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',
        'Đ': 'D',
    };

    return chuoi.replace(/[^a-zA-Z0-9]/g, function (x) {
        return charMap[x] || x;
    });
}

function convertDateTime(ngay) {
    // Trích xuất ngày, tháng và năm từ chuỗi ngày tháng
    var date = new Date(ngay);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    // Xây dựng chuỗi ngày tháng mới có định dạng "dd/mm/yyyy"
    var formattedDate = day + "/" + month + "/" + year;

    // Đặt giá trị mới vào trường nhập ngày
    return formattedDate;
}

//Hàm định dạng nhập số điện thoại theo xxxx.xxx.xxx
function formatPhoneNumberNhap(input) {
    // Get the current cursor position
    let cursorPosition = input.selectionStart;

    // Get the input value and remove all non-numeric characters
    let value = $(input).val();
    let cleanedValue = value.replace(/\D/g, '');

    // Format the cleaned value
    let formattedValue = cleanedValue.replace(/(\d{4})(\d{0,3})(\d{0,3})/, function (match, p1, p2, p3) {
        let result = p1;
        if (p2) result += '.' + p2;
        if (p3) result += '.' + p3;
        return result;
    });

    // Update the input field with the formatted value
    $(input).val(formattedValue);

    // Calculate the new cursor position
    let newCursorPosition = cursorPosition;
    if (cursorPosition > 4 && cursorPosition <= 8) {
        newCursorPosition++;
    } else if (cursorPosition > 8) {
        newCursorPosition += 2;
    }

    // Reset cursor position after formatting
    input.selectionStart = input.selectionEnd = newCursorPosition;
}
