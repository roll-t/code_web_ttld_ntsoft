$(function () {
    $('.menu-is-opening .nav-link').addClass("active");
    $('.nav-treeview .nav-item .nav-toggle').removeClass("active");
    //var Toast = Swal.mixin({
    //    toast: true,
    //    position: 'top-end',
    //    showConfirmButton: false,
    //    timer: 3000
    //});
    $.fn.tolist = function (options) {
        if (typeof $(this).val() == "undefined")
            NTS.loi("Không tìm thấy control" + this.selector);
        var defaults = {
            ajaxUrl: '', //Đường dẫn lấy dữ liệu
            ajaxParam: '', //tham số 
            indexValue: 0,
            indexText: 2
        };
        var settings = $.extend(defaults, options);
        var data = NTS.getdata({
            ajaxUrl: settings.ajaxUrl,
            ajaxParam: settings.ajaxParam,
        });
        var elements;
        if (data.d.Result != null) {
            elements = $.map(data.d.Result, function (e) {
                return [$.map(e, function (v) {
                    return v;
                })];
            });
        } else {
            elements = new Array();
        }

        $(this).attr("type", "list");
        $(this).html('');
        if (data.d.Result != null)
            for (i = 0; i < elements.length; i++) {
                $(this).append('<li><label class="middle"><input type="checkbox" class="ace form-check-input" value="' + elements[i][settings.indexValue] + '"/><span class="lbl"> ' + elements[i][settings.indexText] + '</span></label></li>');
            }
        $(this).prepend('<input type="text" class="form-control input-sm" onkeyup="$(this).search();" for="' + $(this).attr("id") + '" placeholder="Nhập nội dung tìm kiếm..." />');
    }
    $.fn.search = function () {
        if (typeof ($($(this)[0]).attr('for')) == 'undefined')
            NTS.loi("Control không được cài đặt để điều khiển bất kì list nào!");
        var key = $(this).value();
        $("#" + $($(this)[0]).attr('for') + " li").each(function (index) {

            if ($(this).find(".lbl").html().toLowerCase().indexOf(key.toLowerCase()) > -1) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    };
    $.fn.value = function (data) {
        if (typeof $(this).val() == "undefined")
            NTS.loi("Không tìm thấy control" + this.selector);
        if (typeof data !== "undefined") {
            //set giá trị
            if ($(this).prop('type') == 'text') {
                if ($(this).attr('class').lastIndexOf('date-picker') != -1) {
                    //set gia tri ngay thang
                    $(this).datepicker({ dateFormat: "dd/mm/yyyy" }).datepicker("setDate", data);
                }
                else if ($(this).attr('class').lastIndexOf('number-format') != -1) {
                    $(this).val((data + "").replace(".", ",")).trigger('change');
                }
                else if ($(this).attr('class').lastIndexOf('number-table-nts') != -1) {
                    $(this).val((data + "").replace(".", ",")).trigger('change');
                }
                else {
                    $(this).val(data); 
                }
            }
            else if ($(this).prop('type').search('select') != -1) {
                if (data == '0' || data == null || data == '0' || data == "00000000-0000-0000-0000-000000000000")
                    $(this).val('').trigger('change');
                else {
                    $(this).val(data).trigger('change');
                }
            }
            else if ($(this).prop('type') == 'checkbox' || $(this).prop('type') == 'radio') {
                $(this).prop('checked', data);
            }
            else if ($(this).prop('type') == 'list') {
                var elements = $.map(data, function (e) {
                    return [$.map(e, function (v) {
                        return v;
                    })];
                });
                //elements[i][settings.indexValue] 

                $($(this).selector + " li").each(function (index) {
                    for (i = 0; i < elements.length; i++) {
                        if ($(this).find("input:checkbox")[0].value == elements[i][0]) {
                            $(this).find("input:checkbox").prop("checked", true);
                            break;
                        }
                        else
                            $(this).find("input:checkbox").prop("checked", false);
                    }
                });

            }
            else {
                $(this).val(data);
            }
        }
        else {
            //Lấy giá trị
            if ($(this).prop('type') == 'text')
                return $(this).val();//($(this).val() == "0" ? "" : $(this).val());
            else if ($(this).prop('type').search('select') != -1) {

                if ($(this).val() == null || $(this).val() == "0" || $(this).val() == "00000000-0000-0000-0000-000000000000")
                    return "";
                else
                    return $(this).val();
            }
            else if ($(this).prop('type') == 'checkbox' || $(this).prop('type') == 'radio') {
                return $(this).prop('checked');
            }
            else if ($(this).prop('type') == 'list') {
                var rtn = [];
                $($(this).selector + " li").each(function (index) {
                    if ($(this).find("input:checkbox").prop("checked") == true) {
                        rtn.push({
                            "id": $(this).find("input:checkbox")[0].value, //khóa chính
                            "value": $(this).find(".lbl").html(),//Text hiển thị 
                        });
                    }
                });
                return rtn;
            }
            else
                return $(this).val();
        }
    }
    // Hàm kiểm tra xem có đúng định dạng ngày hay không
    $.fn.isdateformat = function (frmt) {
        var value = $(this).val().substring(8, 10) + "/" + $(this).val().substring(5, 7) + "/" + $(this).val().substring(0, 4);
        $(this).val(value);
    }
    // Kiểm tra chuỗi có rỗng hay không
    $.fn.isempty = function () {
        value = $(this).val();
        var rtn = false;
        if (value == null || value == "")
            rtn = true;
        return rtn;
    }
    // Kiểm tra chuỗi có rỗng hay không + thông báo lỗi
    $.fn.isempty = function (message) {
        value = $(this).val();
        var rtn = false;
        if (value == null || value == "") {
            NTS.loi(message);
            rtn = true;
        }
        return rtn;
    }
    $.fn.isdate = function (message) {
        value = $(this).val();
        var rtn = false;
        if (value == null || value == "") {
            NTS.loi(message);
            rtn = true;
        }
        return rtn;
    }
    $.fn.taoSoCT = function (url) {
        var data = NTS.getdata(
            {
                ajaxUrl: url,
                ajaxParam: ''
            });
        if (data.length != 0) {
            $(this).val(JSON.parse(data.d))
        }
    }
    $.fn.taoMa = function (col, tab) {
        $(this).val('');
        var obj = new Array();
        obj[0] = col;
        obj[1] = tab;
        var data = NTS.getdata(
            {
                ajaxUrl: '/Services/ServiceSystem.asmx/taoMaTuTang',
                ajaxParam: obj
            });
        if (data.length != 0) {

            $(this).val(JSON.parse(data.d));
        }

    }
    //$('.tabulator-page-size').select2({ width: "55px" });
    $('.select2').each(function () {
        $(this).select2({
            theme: "bootstrap-5",
            dropdownParent: $(this).parent(), // fix select2 search input focus bug
        })
    })

    // fix select2 bootstrap modal scroll bug
    $(document).on('select2:close', '.my-select2', function (e) {
        var evt = "scroll.select2"
        $(e.target).parents().off(evt)
        $(window).off(evt)
    });

    // tắt loading khi load xong trang
    NTS.unloadding();

});

var NTS = {
    // phân quyền
    permiss: function (func, table, value) {
        var rtn = false;
        //
        switch (func) {
            case 'sua':
                if (!ntspermiss.sua)
                    NTS.canhbao('Bạn không được cấp quyền thực hiện chức năng sửa!');
                rtn = true;
                break;
            case 'xoa':
                if (!ntspermiss.sua)
                    NTS.canhbao('Bạn không được cấp quyền thực hiện chức năng xóa!');
                rtn = true;
                break;
        }
        return rtn
    },
    loadding: function (obj) {
        var originWeb = window.location.origin;
        $('#Loadding').html('<div class="message-loading-overlay"><img class="ace-icon" src="'+originWeb+'/Images/loading.gif" width="48" height="48" alt="Vui lòng chờ..." /></div>');
       
        $('#Loadding').show();
    },
    unloadding: function (obj) {
        $('#Loadding').html('').hide();
    },
    // Thông báo thành công
    thanhcong: function (obj) {
        toastr.success(obj);
    },
    // Thông báo cảnh báo
    canhbao: function (obj) {
        toastr.warning(obj);
    },
    // Thông báo lỗi
    loi: function (obj) {
        toastr.error(obj);        
    },
    // Đóng tất cả thông báo trên màn hình
    dongthongbao: function () {
        //$('.gritter-item-wrapper').remove();
        $('.bs-toast').hide();
        //toastr.remove();
    },
    // kiểu trả về hợp lệ: string, boolean, json
    // getAjax("string","test.aspx/LayDuLieu", { _arrT: mang, donVi: donVi });
    // dữ liệu gửi dạng object {a: 'abc', b: '123'} nếu không có truyền tham số thì để {}
    getAjax: function (duongDanAjax, duLieuGui) {
        var result = null;
        $.ajax({
            type: "POST",
            url: duongDanAjax,
            data: JSON.stringify(duLieuGui),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            timeout: 100000, // thời gian chờ
            beforeSend: function (request) {
                try {
                    request.setRequestHeader("__RequestVerificationToken", document.querySelector('input[name=__RequestVerificationToken]').value);
                } catch (e) { }
            },
            success: function (response) {
                result = response;
            },
            error: function (response) {
                result = null;
                NTS.loi(response);
            },
            complete: function () {
            }
        });
        return result;
    },
    getAjax_v1: function (duongDanAjax, duLieuGui) {
        var result = null;
        $.ajax({
            type: "POST",
            url: duongDanAjax,
            data: JSON.stringify(duLieuGui),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (response) {
                result = response;
            },
            error: function (response) {
                result = null;
                NTS.loi(response);
            },
            complete: function () {
                NTS.unloadding();
            }
        });
        if (result === null) return null;
        if (result.Err) {
            if (result.Redirect) {
                NTS.loi(result.Msg)
                setTimeout(function () {
                    window.location.href = result.RedirectUrl;
                });
            }
            if (result.ErrCode == "-1") {
                NTS.canhbao(result.Msg);
            } else {
                NTS.loi(result.Msg)
            }
        } else if (result.Msg != "") {
            if (result.ErrCode == "-1")
                NTS.canhbao(result.Msg);
            else {
                if (result.Msg != null && result.Msg.length > 0) {
                    NTS.thanhcong();
                }
            }
        }
        return result;
    }, 
    getAjaxAsync: async function (duongDanAjax, duLieuGui) {
        var result = null;
        await $.ajax({
            type: "POST",
            url: duongDanAjax,
            data: JSON.stringify(duLieuGui),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function (request) {
                NTS.loadding();
                try {
                    request.setRequestHeader("__RequestVerificationToken", document.querySelector('input[name=__RequestVerificationToken]').value);
                } catch (e) { }
            },
            success: function (response) {
                result = response;
            },
            error: function (response) {
                result = null;
                NTS.loi(response);
            },
            complete: function () {
                NTS.unloadding();
            }
        });
        return result;
    },
    getAjaxAsyncV2: async function (duongDanAjax, duLieuGui) {
        var result = null;
        await $.ajax({
            type: "POST",
            url: duongDanAjax,
            data: JSON.stringify(duLieuGui),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function (request) {
                //NTS.loadding();
                try {
                    request.setRequestHeader("__RequestVerificationToken", document.querySelector('input[name=__RequestVerificationToken]').value);
                } catch (e) { }
            },
            success: function (response) {
                result = response;
            },
            error: function (response) {
                result = null;
                NTS.loi(response);
            },
            complete: function () {
                //NTS.unloadding();
            }
        });
        return result;
    },
    getAjax_NoVerifi: function (duongDanAjax, duLieuGui) {
        var result = null;
        $.ajax({
            type: "POST",
            url: duongDanAjax,
            data: JSON.stringify(duLieuGui),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            timeout: 100000, // thời gian chờ
            beforeSend: function (request) {
                NTS.loadding();
            },
            success: function (response) {
                result = response;
            },
            error: function (response) {
                result = null;
                NTS.loi(response);
            },
            complete: function () {
                NTS.unloadding();
            }
        });
        return result;
    },
    getAjaxAsync_NoVerifi: async function (duongDanAjax, duLieuGui) {
        var result = null;
        await $.ajax({
            type: "POST",
            url: duongDanAjax,
            data: JSON.stringify(duLieuGui),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function (request) {
                NTS.loadding();
            },
            success: function (response) {
                result = response.d;
            },
            error: function (response) {
                result = null;
                NTS.loi(response);
            },
            complete: function () {
                NTS.unloadding();
            }
        });
        return result;
    },
    //upload file, bắt sự kiện trong change input type=file
    //name --> #tên control
    //loaiVB --> nhận 1 trong 2 giá trị DL|VB
    
    upload: function (options) {
        var result;
        var defaults = {
            name: '',
            loaiVB: '',
            type: '',
            thongBaoThanhCong: 'Tải file thành công!',
            hienThongBao: true
        };
        var settings = $.extend(defaults, options);
        if (settings.loaiVB == '' || settings.loaiVB == 'undefined') {
            result = "";
            NTS.canhbao("Bạn chưa cài đặt loại văn bản, vui lòng kiểm ra lại");
            return result;
        }
        else if (settings.name == '' || settings.name == 'undefined' || $(settings.name).length == 0) {
            NTS.canhbao('Không tồn tại control ' + settings.name + ' cho hàm upload');
            return result;
        }
        var fileUpload = $(settings.name).get(0);
        var files = fileUpload.files;
        var test = new FormData();
        for (var i = 0; i < files.length; i++) {
            test.append(files[i].name, files[i]);
        }
        var bar = $('.progress-bar');
        var percent = $('.percent');
        var status = $('#status');
        $.ajax({
            url: "/UploadFiles/UploadFiles?loaiVB=" + settings.loaiVB + '&type=' + settings.type,
            type: "POST",
            contentType: false, // Not to set any content header      
            processData: false, // Not to process data      
            data: test,
            async: false,
            beforeSend: function () {
                NTS.loadding();
            },
            success: function (data) {
                NTS.unloadding();
                if (data != "") {
                    //$('#FileBrowse').find("*").prop("disabled", true);
                    //LoadProgressBar(data); //calling LoadProgressBar function to load the progress bar.    
                }
                data = data.replaceAll("\"", "");
                data = data.split('|');
                if (data[0] == "1") {
                    result = data[1];
                    if (settings.hienThongBao) {
                        NTS.thanhcong(settings.thongBaoThanhCong);
                    }
                }
                else if (data[0] == "0") {
                    result = "";
                    NTS.loi(data[1]);
                }
                else if (data[0] == "-1") {
                    result = "";
                    NTS.loi(data[1]);
                    //setTimeout(function () { window.location.href = "/view/shared/main.aspx" }, 500);
                }
            },
            error: function (err) {
                result = "";
                NTS.loi("Tải file thất bại! Bạn vui lòng kiểm tra lại");
                NTS.unloadding();
            }
            ,complete: function (err) {
                NTS.unloadding();
            }
        }); 

        return result;
    },
    // Lấy dữ liệu từ sever
    getdata: function (options) {
        //Khởi tạo biến return
        var result;
        var defaults = {
            ajaxUrl: '',
            ajaxParam: {},
            ajaxParamObject: false
        };
        var settings = $.extend(defaults, options);
        if (!$.isEmptyObject(settings.ajaxParam)) {
            //result = { d: this.getAjax('string', settings.ajaxUrl, { data: settings.ajaxParam }) }; code gốc
            result = { d: this.getAjax(settings.ajaxUrl, settings.ajaxParam) };
        } else {
            //result = { d: this.getAjax('string', settings.ajaxUrl, { data: settings.ajaxParam }) };
            result = { d: this.getAjax(settings.ajaxUrl, {}) };
        }

        return result;
    },
    getstring: function (options) {
        var result;
        var defaults = {
            ajaxUrl: '',
            ajaxParam: {},
        };
        var settings = $.extend(defaults, options);
        if (!$.isEmptyObject(settings.ajaxParam)) {
            //result = { d: this.getAjax('string', settings.ajaxUrl, { data: settings.ajaxParam }) };
            result = { d: this.getAjax(settings.ajaxUrl, settings.ajaxParam) };
        } else {
            result = { d: this.getAjax(settings.ajaxUrl, {}) };
        }
        return result;
    },
    // Thực thi với sever
    // Trả về dạng {0|1}_{Nội dung}
    exec: function (options) {
        var result = false;
        var defaults = {
            ajaxUrl: '',
            ajaxParam: {},
        };
        var settings = $.extend(defaults, options);
        if (!$.isEmptyObject(settings.ajaxParam)) {
            var data = this.getAjax(settings.ajaxUrl, settings.ajaxParam);
            try {
                if (data.split('_')[0] == '1') {
                    NTS.thanhcong(data.split('_')[1]);
                    result = true;
                }
                else {
                    NTS.loi(data.split('_')[1]);
                    result = false;
                }
            } catch (e) {
                result = false;
            }
        }
        else {
            var data = this.getAjax(settings.ajaxUrl, {});
            try {
                if (data.split('_')[0] == '1') {
                    NTS.thanhcong(data.split('_')[1]);
                    result = true;
                }
                else {
                    NTS.loi(data.split('_')[1]);
                    result = false;
                }
            } catch (e) {
                result = false;
            }
        }
        return result;
    },
    //Hàm dùng để load dữ liệu từ combobox
    //name: '' -> ID select
    //ajaxUrl: '' -> Đường dẫn lấy dữ liệu
    //ajaxParam: '' -> tham số
    //indexValue: 0 -> index cột lấy làm value
    //indexText: 1 -> index cột lấy làm text
    //indexText1: 0 -> index cột lấy làm mã khi combo 2 cột
    //indexDefault: 0 -> index mặc định khi load combo
    //columns: 1 -> số lượng cột của combo
    //textChange: "text1" -> Khi chọn combo cột nào sẽ hiển thị {id,text,text1}
    loadDataCombo: function (options) {
        var defaults = {
            //ID select
            name: '',
            ajaxUrl: '', //Đường dẫn lấy dữ liệu
            ajaxParam: {}, //tham số
            indexValue: 0, //index cột lấy làm value
            indexText: 1,//index cột lấy làm text
            indexText1: 0,//index cột lấy làm mã khi combo 2 cột
            indexDefault: 0,//index mặc định khi load combo
            columns: 1,//số lượng cột của combo
            textChange: "text1",//Khi chọn combo cột nào sẽ hiển thị {id,text,text1}
            showTatCa: false,
            textShowTatCa: 'Tất cả',
            hideshowTatCa: false
        };
        var settings = $.extend(defaults, options);
        if (!$(settings.name)) {
            NTS.loi('Không tồn tại control ' + settings.name + ' cho hàm loadDataCombo');
        }
    
        var data = NTS.getdata(
            obj = {
                ajaxUrl: settings.ajaxUrl,
                ajaxParam: settings.ajaxParam,
                ajaxParamObject: settings.ajaxParamObject
            }
        );
   
        var elements;
        if (!$.isEmptyObject(data.d) && !data.d.Err && data.d.Result.length != 0)
            elements = $.map(data.d.Result, function (e) {
                return [$.map(e, function (v) {
                    return v;
                })];
            });
        $(settings.name).html('');

        if (settings.columns == 2) {
            //Tạo 1 source mẫu theo options select2
            var newDataSource = [{
                "id": "-1",
                "text": "",
                "text1": "",
                "disabled": true
            }
                , {
                "id": "",
                "text": (settings.showTatCa ? settings.textShowTatCa : ""),
                "text1": (settings.showTatCa ? settings.textShowTatCa : ""),
                "disabled": false
            }];
            if (settings.hideshowTatCa) {
                newDataSource.length = 0;
                newDataSource = [{
                    "id": "-1",
                    "text": "",
                    "text1": "",
                    "disabled": true
                }];
            }
            try {
                //Chuyển source vào source mẫu
                for (i = 0; i < elements.length; i++) {
                    if (elements[i][settings.indexValue].toString() != "")
                        newDataSource.push({
                            "id": elements[i][settings.indexValue], //khóa chính
                            "text": elements[i][settings.indexText],//Text hiển thị
                            "text1": elements[i][settings.indexText1],//Mã hiển thị
                            "disabled": (data.d.Result[i]['disabled'] == "1" ? true : false)
                        });
                }
            } catch (e) {
                //console.log(e.message);
            }
            //Combo2 cột người dùng chọn hiển thị mã
            if (settings.textChange == "text1") {
                $(settings.name).select2({
                    width: "100%",
                    dropdownCssClass: settings.menuWidth,
                    data: newDataSource,
                    language: {
                        noResults: function () {
                            return "Không tìm thấy thông tin!";
                        }
                    },
                    templateResult: templateResult1,
                    templateSelection: templateSelection_ChangeText1,
                    escapeMarkup: function (m) { return m; },
                    matcher: matcher,
                    tags: true
                });
            }
            else {
                //Combo2 cột người dùng chọn hiển thị tên
                $(settings.name).select2({
                    width: "100%",
                    data: newDataSource,
                    language: {
                        noResults: function () {
                            return "Không tìm thấy thông tin!";
                        }
                    },
                    templateResult: templateResult,
                    templateSelection: templateSelection,
                    escapeMarkup: function (m) { return m; },
                    matcher: matcher,
                    tags: true
                });
            }
            //select.$results.parents('.select2-results')
            //                        .append('<button class="btn btn-info select2-link"><i class="fa fa-plus"></i> Thêm mới </button>');
        } else {
            //Tạo 1 source mẫu theo options select2
            var newDataSource = [{
                "id": "",
                "text": (settings.showTatCa ? settings.textShowTatCa : ""),
                "disabled": !1
            }];
            if (settings.hideshowTatCa) {
                newDataSource.length = 0;
            }
            try {
                //Chuyển source vào source mẫu elements[i][settings.indexValue]
                for (i = 0; i < elements.length; i++) {
                    {
                        if (elements[i][settings.indexValue].toString() != "") {
                            newDataSource.push({
                                "id": elements[i][settings.indexValue], //khóa chính
                                "text": elements[i][settings.indexText],//Text hiển thị
                                "disabled": (data.d.Result[i]['disabled'] == "1" ? true : false)
                            });
                        }
                    }
                }
            } catch (e) {
            }
            //
            $(settings.name).select2({
                width: "100%",
                dropdownCssClass: settings.menuWidth,
                data: newDataSource,
                language: {
                    noResults: function () {
                        return "Không tìm thấy thông tin!";
                    }
                },
            });
        };
        $(settings.name).on("select2:open", function (e) {
            //Tạo nút thêm mới
            try {
                var ID = $(this)[0].id;
                var addNew = document.getElementById(ID).getAttribute("add-new");
                if (!$('#' + ID + 'AddNew').length) {
                    if (addNew.toUpperCase() == "true".toUpperCase()) {
                        var a = $(this).data('select2');
                        if (a.id == "select2-" + ID);
                        {
                            //console.log(a.$results.parents());
                            var x = a.$results.parents('.select2-results')[0].innerHTML;;
                            a.$results.parents('.select2-results')
                                .append('<button id="' + ID + 'AddNew" permiss="them" onclick="' + ID + 'AddNew(); return false;" class="btn btn-success select2-link"><i class="fa fa-plus"></i> Thêm mới </button>')
                                .on('click', function (b) {
                                    a.trigger('close');
                                });
                        }
                    }
                }
            } catch (e) {
            }
        });
        $(settings.name + ' :nth-child(' + settings.indexDefault + ')').prop('selected', true).change();
    },
    loadDataComboTableNTS: function (options) {
       
        var defaults = {
            //ID select
            name: '',
            data: [], //Đường dẫn lấy dữ liệu
            indexValue: 0, //index cột lấy làm value
            indexText: 1,//index cột lấy làm text
            indexText1: 0,//index cột lấy làm mã khi combo 2 cột
            indexDefault: 0,//index mặc định khi load combo
            columns: 1,//số lượng cột của combo
            textChange: "text1",//Khi chọn combo cột nào sẽ hiển thị {id,text,text1}
            showTatCa: false,
            textShowTatCa: 'Tất cả',
            hideshowTatCa: false
        };
        var settings = $.extend(defaults, options);
        if (!$(settings.name)) {
            NTS.loi('Không tồn tại control ' + settings.name + ' cho hàm loadDataCombo');
        }

        var data = settings.data 

        var elements;
        if (!$.isEmptyObject(data.d) && !data.d.Err && data.d.Result.length != 0)
            elements = $.map(data.d.Result, function (e) {
                return [$.map(e, function (v) {
                    return v;
                })];
            });
        $(settings.name).html('');

        if (settings.columns == 2) {
            //Tạo 1 source mẫu theo options select2
            var newDataSource = [{
                "id": "-1",
                "text": "",
                "text1": "",
                "disabled": true
            }
                , {
                "id": "",
                "text": (settings.showTatCa ? settings.textShowTatCa : ""),
                "text1": (settings.showTatCa ? settings.textShowTatCa : ""),
                "disabled": false
            }];
            if (settings.hideshowTatCa) {
                newDataSource.length = 0;
                newDataSource = [{
                    "id": "-1",
                    "text": "",
                    "text1": "",
                    "disabled": true
                }];
            }
            try {
                //Chuyển source vào source mẫu
                for (i = 0; i < elements.length; i++) {
                    if (elements[i][settings.indexValue].toString() != "")
                        newDataSource.push({
                            "id": elements[i][settings.indexValue], //khóa chính
                            "text": elements[i][settings.indexText],//Text hiển thị
                            "text1": elements[i][settings.indexText1],//Mã hiển thị
                            "disabled": (data.d.Result[i]['disabled'] == "1" ? true : false)
                        });
                }
            } catch (e) {
                //console.log(e.message);
            }
            //Combo2 cột người dùng chọn hiển thị mã
            if (settings.textChange == "text1") {
                $(settings.name).select2({
                    width: "100%",
                    dropdownCssClass: settings.menuWidth,
                    data: newDataSource,
                    language: {
                        noResults: function () {
                            return "Không tìm thấy thông tin!";
                        }
                    },
                    templateResult: templateResult1,
                    templateSelection: templateSelection_ChangeText1,
                    escapeMarkup: function (m) { return m; },
                    matcher: matcher,
                    tags: true
                });
            }
            else {
                //Combo2 cột người dùng chọn hiển thị tên
                $(settings.name).select2({
                    width: "100%",
                    data: newDataSource,
                    language: {
                        noResults: function () {
                            return "Không tìm thấy thông tin!";
                        }
                    },
                    templateResult: templateResult,
                    templateSelection: templateSelection,
                    escapeMarkup: function (m) { return m; },
                    matcher: matcher,
                    tags: true
                });
            }
            //select.$results.parents('.select2-results')
            //                        .append('<button class="btn btn-info select2-link"><i class="fa fa-plus"></i> Thêm mới </button>');
        } else {
            //Tạo 1 source mẫu theo options select2
            var newDataSource = [{
                "id": "",
                "text": (settings.showTatCa ? settings.textShowTatCa : ""),
                "disabled": !1
            }];
            if (settings.hideshowTatCa) {
                newDataSource.length = 0;
            }
            try {
                //Chuyển source vào source mẫu elements[i][settings.indexValue]
                for (i = 0; i < elements.length; i++) {
                    {
                        if (elements[i][settings.indexValue].toString() != "") {
                            newDataSource.push({
                                "id": elements[i][settings.indexValue], //khóa chính
                                "text": elements[i][settings.indexText],//Text hiển thị
                                "disabled": (data.d.Result[i]['disabled'] == "1" ? true : false)
                            });
                        }
                    }
                }
            } catch (e) {
            }
            //
            $(settings.name).select2({
                width: "100%",
                dropdownCssClass: settings.menuWidth,
                data: newDataSource,
                language: {
                    noResults: function () {
                        return "Không tìm thấy thông tin!";
                    }
                },
            });
        };
        $(settings.name).on("select2:open", function (e) {
            //Tạo nút thêm mới
            try {
                var ID = $(this)[0].id;
                var addNew = document.getElementById(ID).getAttribute("add-new");
                if (!$('#' + ID + 'AddNew').length) {
                    if (addNew.toUpperCase() == "true".toUpperCase()) {
                        var a = $(this).data('select2');
                        if (a.id == "select2-" + ID);
                        {
                            //console.log(a.$results.parents());
                            var x = a.$results.parents('.select2-results')[0].innerHTML;;
                            a.$results.parents('.select2-results')
                                .append('<button id="' + ID + 'AddNew" permiss="them" onclick="' + ID + 'AddNew(); return false;" class="btn btn-success select2-link"><i class="fa fa-plus"></i> Thêm mới </button>')
                                .on('click', function (b) {
                                    a.trigger('close');
                                });
                        }
                    }
                }
            } catch (e) {
            }
        });
        $(settings.name + ' :nth-child(' + settings.indexDefault + ')').prop('selected', true).change();
    },
    loadDataCombo_v1: function (options) {
        var defaults = {
            //ID select
            name: '',
            ajaxUrl: '', //Đường dẫn lấy dữ liệu
            ajaxParam: '', //tham số
            indexValue: 0, //index cột lấy làm value
            indexText: 1,//index cột lấy làm text
            indexText1: 0,//index cột lấy làm mã khi combo 2 cột
            indexDefault: 0,//index mặc định khi load combo 
            columns: 1,//số lượng cột của combo
            textChange: "text1",//Khi chọn combo cột nào sẽ hiển thị {id,text,text1}
            showTatCa: false,
            textShowTatCa: 'Tất cả',
            source: null // Mảng array
        };
        var settings = $.extend(defaults, options);
        if (!$(settings.name)) {
            NTS.loi('Không tồn tại control ' + settings.name + ' cho hàm loadDataCombo');
        }
        var data = null;
        if (settings.source != null && !$.isEmptyObject(settings.source)) {
            data = JSON.parse(settings.source);
        }
        else {
            data = NTS.getAjax_v1(settings.ajaxUrl, { data: settings.ajaxParam }).Result.Table;
        }
        //if (settings.ajaxParam != '')
        //    data = NTS.getAjax_v1(settings.ajaxUrl, { data: settings.ajaxParam });
        //else
        //    data = NTS.getAjax_v1(settings.ajaxUrl, {}); 
        if (data != null) {
            data = data.Result.Table;
            var elements = $.map(data, function (e) {
                return [$.map(e, function (v) {
                    return v;
                })];
            });
        }
        else {
            data = [];
        }
        $(settings.name).html('');

        if (settings.columns == 2) {
            //Tạo 1 source mẫu theo options select2
            var newDataSource = [{
                "id": "-1",
                "text": "",
                "text1": "",
                "disabled": true
            }
                , {
                "id": "",
                "text": (settings.showTatCa ? settings.textShowTatCa : ""),
                "text1": (settings.showTatCa ? settings.textShowTatCa : ""),
                "disabled": false
            }]
            try {
                //Chuyển source vào source mẫu
                for (i = 0; i < elements.length; i++) {

                    if (elements[i][settings.indexValue].toString() != "")

                        newDataSource.push({
                            "id": elements[i][settings.indexValue], //khóa chính
                            "text": elements[i][settings.indexText],//Text hiển thị
                            "text1": elements[i][settings.indexText1],//Mã hiển thị
                            "disabled": (data[i]['disabled'] == "1" ? true : false)
                        });
                }
            } catch (e) {
                //console.log(e.message);
            }
            //Combo2 cột người dùng chọn hiển thị mã
            if (settings.textChange == "text1") {
                $(settings.name).select2({
                    width: "100%",
                    dropdownCssClass: settings.menuWidth,
                    data: newDataSource,
                    language: {
                        noResults: function () {
                            return "Không tìm thấy thông tin!";
                        }
                    },
                    templateResult: templateResult1,
                    templateSelection: templateSelection_ChangeText1,
                    escapeMarkup: function (m) { return m; },
                    matcher: matcher,
                    tags: true,
                    dir: "ltr",
                });
            }
            else {
                //Combo2 cột người dùng chọn hiển thị tên
                $(settings.name).select2({
                    width: "100%",
                    data: newDataSource,
                    language: {
                        noResults: function () {
                            return "Không tìm thấy thông tin!";
                        }
                    },
                    templateResult: templateResult,
                    templateSelection: templateSelection,
                    escapeMarkup: function (m) { return m; },
                    matcher: matcher,
                    tags: true,
                    dir: "ltr",
                });
            }

            //select.$results.parents('.select2-results')
            //                        .append('<button class="btn btn-info select2-link"><i class="fa fa-plus"></i> Thêm mới </button>');
        } else {
            //Tạo 1 source mẫu theo options select2
            var newDataSource = [{
                "id": "",
                "text": (settings.showTatCa ? settings.textShowTatCa : ""),
                "disabled": !1
            }]
            try {
                //Chuyển source vào source mẫu elements[i][settings.indexValue]
                for (i = 0; i < elements.length; i++) {
                    {
                        if (elements[i][settings.indexValue].toString() != "") {
                            newDataSource.push({
                                "id": elements[i][settings.indexValue], //khóa chính
                                "text": elements[i][settings.indexText],//Text hiển thị 
                                "disabled": (data[i]['disabled'] == "1" ? true : false)
                            });
                        }
                    }
                }
            } catch (e) {

            }
            //
            $(settings.name).select2({
                width: "100%",
                dropdownCssClass: settings.menuWidth,
                data: newDataSource,
                language: {
                    noResults: function () {
                        return "Không tìm thấy thông tin!";
                    }
                },
            });
        }

        $(settings.name).on("select2:open", function (e) {

            //Tạo nút thêm mới
            try {
                var ID = $(this)[0].id;
                var addNew = document.getElementById(ID).getAttribute("add-new");
                if (!$('#' + ID + 'AddNew').length) {
                    if (addNew.toUpperCase() == "true".toUpperCase()) {
                        var a = $(this).data('select2');
                        if (a.id == "select2-" + ID);
                        {
                            //console.log(a.$results.parents());
                            var x = a.$results.parents('.select2-results')[0].innerHTML;;
                            a.$results.parents('.select2-results')
                                .append('<button id="' + ID + 'AddNew" permiss="them" onclick="' + ID + 'AddNew(); return false;" class="btn btn-success select2-link"><i class="fa fa-plus"></i> Thêm mới </button>')
                                .on('click', function (b) {
                                    a.trigger('close');
                                });

                        }
                    }
                }
            } catch (e) {
                //console.log(e);

            }
        })
        $(settings.name).find('option:eq(' + settings.indexDefault + ')').prop('selected', true).change();
    },
    // kiểm tra xem đối tượng có tồn tại hay không
    // Kiểm tra hình ảnh, file có tồn tại trên sever hay không
    loadDataCombo_NoVerifi: function (options) {
        var defaults = {
            //ID select
            name: '',
            ajaxUrl: '', //Đường dẫn lấy dữ liệu
            ajaxParam: {}, //tham số
            indexValue: 0, //index cột lấy làm value
            indexText: 1,//index cột lấy làm text
            indexText1: 0,//index cột lấy làm mã khi combo 2 cột
            indexDefault: 0,//index mặc định khi load combo
            columns: 1,//số lượng cột của combo
            textChange: "text1",//Khi chọn combo cột nào sẽ hiển thị {id,text,text1}
            showTatCa: false,
            textShowTatCa: 'Tất cả',
            hideshowTatCa: false
        };
        var settings = $.extend(defaults, options);
        if (!$(settings.name)) {
            NTS.loi('Không tồn tại control ' + settings.name + ' cho hàm loadDataCombo');
        }

        var data = NTS.getdata(
            obj = {
                ajaxUrl: settings.ajaxUrl,
                ajaxParam: settings.ajaxParam,
                ajaxParamObject: settings.ajaxParamObject
            }
        );

        var elements;
        if (!$.isEmptyObject(data.d) && !data.d.Err && data.d.Result.length != 0)
            elements = $.map(data.d.Result, function (e) {
                return [$.map(e, function (v) {
                    return v;
                })];
            });
        $(settings.name).html('');

        if (settings.columns == 2) {
            //Tạo 1 source mẫu theo options select2
            var newDataSource = [{
                "id": "-1",
                "text": "",
                "text1": "",
                "disabled": true
            }
                , {
                "id": "",
                "text": (settings.showTatCa ? settings.textShowTatCa : ""),
                "text1": (settings.showTatCa ? settings.textShowTatCa : ""),
                "disabled": false
            }];
            if (settings.hideshowTatCa) {
                newDataSource.length = 0;
                newDataSource = [{
                    "id": "-1",
                    "text": "",
                    "text1": "",
                    "disabled": true
                }];
            }
            try {
                //Chuyển source vào source mẫu
                for (i = 0; i < elements.length; i++) {
                    if (elements[i][settings.indexValue].toString() != "")
                        newDataSource.push({
                            "id": elements[i][settings.indexValue], //khóa chính
                            "text": elements[i][settings.indexText],//Text hiển thị
                            "text1": elements[i][settings.indexText1],//Mã hiển thị
                            "disabled": (data.d.Result[i]['disabled'] == "1" ? true : false)
                        });
                }
            } catch (e) {
                //console.log(e.message);
            }
            //Combo2 cột người dùng chọn hiển thị mã
            if (settings.textChange == "text1") {
                $(settings.name).select2({
                    width: "100%",
                    dropdownCssClass: settings.menuWidth,
                    data: newDataSource,
                    language: {
                        noResults: function () {
                            return "Không tìm thấy thông tin!";
                        }
                    },
                    templateResult: templateResult1,
                    templateSelection: templateSelection_ChangeText1,
                    escapeMarkup: function (m) { return m; },
                    matcher: matcher,
                    tags: true
                });
            }
            else {
                //Combo2 cột người dùng chọn hiển thị tên
                $(settings.name).select2({
                    width: "100%",
                    data: newDataSource,
                    language: {
                        noResults: function () {
                            return "Không tìm thấy thông tin!";
                        }
                    },
                    templateResult: templateResult,
                    templateSelection: templateSelection,
                    escapeMarkup: function (m) { return m; },
                    matcher: matcher,
                    tags: true
                });
            }
            //select.$results.parents('.select2-results')
            //                        .append('<button class="btn btn-info select2-link"><i class="fa fa-plus"></i> Thêm mới </button>');
        } else {
            //Tạo 1 source mẫu theo options select2
            var newDataSource = [{
                "id": "",
                "text": (settings.showTatCa ? settings.textShowTatCa : ""),
                "disabled": !1
            }];
            if (settings.hideshowTatCa) {
                newDataSource.length = 0;
            }
            try {
                //Chuyển source vào source mẫu elements[i][settings.indexValue]
                for (i = 0; i < elements.length; i++) {
                    {
                        if (elements[i][settings.indexValue].toString() != "") {
                            newDataSource.push({
                                "id": elements[i][settings.indexValue], //khóa chính
                                "text": elements[i][settings.indexText],//Text hiển thị
                                "disabled": (data.d.Result[i]['disabled'] == "1" ? true : false)
                            });
                        }
                    }
                }
            } catch (e) {
            }
            //
            $(settings.name).select2({
                width: "100%",
                dropdownCssClass: settings.menuWidth,
                data: newDataSource,
                language: {
                    noResults: function () {
                        return "Không tìm thấy thông tin!";
                    }
                },
            });
        };
        $(settings.name).on("select2:open", function (e) {
            //Tạo nút thêm mới
            try {
                var ID = $(this)[0].id;
                var addNew = document.getElementById(ID).getAttribute("add-new");
                if (!$('#' + ID + 'AddNew').length) {
                    if (addNew.toUpperCase() == "true".toUpperCase()) {
                        var a = $(this).data('select2');
                        if (a.id == "select2-" + ID);
                        {
                            //console.log(a.$results.parents());
                            var x = a.$results.parents('.select2-results')[0].innerHTML;;
                            a.$results.parents('.select2-results')
                                .append('<button id="' + ID + 'AddNew" permiss="them" onclick="' + ID + 'AddNew(); return false;" class="btn btn-success select2-link"><i class="fa fa-plus"></i> Thêm mới </button>')
                                .on('click', function (b) {
                                    a.trigger('close');
                                });
                        }
                    }
                }
            } catch (e) {
            }
        });
        $(settings.name + ' :nth-child(' + settings.indexDefault + ')').prop('selected', true).change();
    },
    checkLinkExits: function (options) {
        var defaults = {
            //link cần kiểm tra
            link: ''
        };
        var settings = $.extend(defaults, options);

        var xhr = new XMLHttpRequest();
        if (settings.link.length <= 4) {
            return false;
        }
        xhr.open('HEAD', settings.link + '?subins=' + 3000, false);
        try {
            xhr.send();
            if (xhr.status >= 200 && xhr.status < 304) return true;
            else return false;
        } catch (e) {
            return false;
        }
        return check;
    },
    // bỏ chọn các dòng đã chọn trong Grid
    // GridID: ID grid
    deselectedGrid: function (GridID) {
        try {
            for (var i = 0; i < GridID.Rows.length; i++) {
                GridID.deselectRecord(i);
            }
        } catch (e) {
        }
    },
    // hiển thị ngày hiện tại lên textbox
    hienNgayHienTaiLenTextbox: function (id) {
        try {
            id = id.replaceAll(' ', '');
            var data = id.split(',');
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const formattedToday = dd + '/' + mm + '/' + yyyy;
            for (var i = 0; i < data.length; i++) {
                $('#' + data[i]).value(formattedToday);
            }
            
        } catch (e) {
        }
    },
      // hiển thị ngày đầu tháng lên textbox
    hienNgayDauThangLenTextbox: function (id) {
        try {
            id = id.replaceAll(' ', '');
            var data = id.split(',');
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            const dd = '01';

            if (mm < 10) mm = '0' + mm;

            const formattedFirstDay = dd + '/' + mm + '/' + yyyy;

            for (var i = 0; i < data.length; i++) {
                $('#' + data[i]).value(formattedFirstDay);
            }
        } catch (e) { }
    },
    // hiển thị ngày cuối tháng lên textbox
    hienNgayCuoiThangLenTextbox: function (id) {
        try {
            id = id.replaceAll(' ', '');
            var data = id.split(',');
            const today = new Date();
            const year = today.getFullYear();
            let month = today.getMonth() + 1; // Months start at 0!

            if (month < 10) {
                month = '0' + month;
            }

            const lastDay = new Date(year, month, 0).getDate();
            const formattedLastDay = lastDay + '/' + month + '/' + year;

            for (var i = 0; i < data.length; i++) {
                $('#' + data[i]).val(formattedLastDay);
            }
        } catch (e) {
            console.error(e);
        }
    },
    // hiển thị giờ:phút hiện tại lên textbox
    hienGioPhutHienTaiLenTextbox: function (id) {
        try {
            id = id.replaceAll(' ', '');
            var data = id.split(',');
            for (var i = 0; i < data.length; i++) {
                $('#' + data[i]).value((((new Date()).getHours() <= 9 ? "0" + ((new Date()).getHours()) : ((new Date()).getHours()))) + ":" + (((new Date()).getMinutes() <= 9 ? "0" + ((new Date()).getMinutes()) : ((new Date()).getMinutes()))));
            }
        } catch (e) {
        }
    },
    // Hàm hiển thị ngày đầu năm lên textbox
    hienNgayDauNamLenTextbox: function (id) {
        try {
            id = id.replaceAll(' ', '');
            var data = id.split(',');
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = '01'; // Tháng 1
            const dd = '01'; // Ngày 1

            const formattedFirstDayOfYear = dd + '/' + mm + '/' + yyyy;

            for (var i = 0; i < data.length; i++) {
                $('#' + data[i]).value(formattedFirstDayOfYear);
            }
        } catch (e) { }
    },
    // Hàm hiển thị ngày cuối năm lên textbox
    hienNgayCuoiNamLenTextbox: function (id) {
        try {
            id = id.replaceAll(' ', '');
            var data = id.split(',');
            const today = new Date();
            const yyyy = today.getFullYear();
            const lastDayOfYear = new Date(yyyy, 11, 31); // Ngày 31 tháng 12 của năm hiện tại

            const dd = String(lastDayOfYear.getDate()).padStart(2, '0');
            const mm = String(lastDayOfYear.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên phải cộng 1

            const formattedLastDayOfYear = dd + '/' + mm + '/' + yyyy;

            for (var i = 0; i < data.length; i++) {
                $('#' + data[i]).val(formattedLastDayOfYear); // Sử dụng .val thay vì .value
            }
        } catch (e) { }
    },
    SetChieuCaoFrame: function (FrameID, chieucaotruhao) {
        var chieucao = window.innerHeight - chieucaotruhao;
        var MangFrameID = FrameID.split(',');
        for (var i = 0; i < MangFrameID.length; i++) {
            if (chieucao < 550) {
                chieucao = 550;
            }
            $('#' + MangFrameID[i]).css('height', chieucao + 'px');
        }
    },
    addHeader: function (options) {
        var defaults = {
            name: '',
            listMer: [],
        };
        var settings = $.extend(defaults, options);
        if (settings.listMer.length == 0)
            return;
        var Grid = settings.name;
        if ($('#ctl00_ContentPlaceHolder1_' + Grid.ID + '_ob_' + Grid.ID + 'HeaderContainer table tbody').find('tr').length == 1) {
            //Nhân bản tiêu đề lưới
            //$('#ctl00_ContentPlaceHolder1_' + Grid.ID + '_ob_' + Grid.ID + 'HeaderContainer div table tbody').append(
            //    $('#ctl00_ContentPlaceHolder1_' + Grid.ID + '_ob_' + Grid.ID + 'HeaderContainer div table tbody').html()
            //);
            //
            if ($('#ctl00_ContentPlaceHolder1_' + Grid.ID + '_ob_' + Grid.ID + 'HeaderContainer div table .headerMegreOfGrid').length > 0)
                $('#ctl00_ContentPlaceHolder1_' + Grid.ID + '_ob_' + Grid.ID + 'HeaderContainer div table .headerMegreOfGrid').remove();
            $($('#ctl00_ContentPlaceHolder1_' + Grid.ID + '_ob_' + Grid.ID + 'HeaderContainer div table tbody').html().replace('ob_gHR', 'ob_gHR headerMegreOfGrid')).insertBefore(
                $('#ctl00_ContentPlaceHolder1_' + Grid.ID + '_ob_' + Grid.ID + 'HeaderContainer div table tbody')
            );
            //Xóa text của tr đầu tiên
            //Xóa icon sort  của tr đầu tiên
            $('.headerMegreOfGrid').find('div').text('');

            for (var j = 0; j < settings.listMer.length; j++) {
                var chieuDaiCot = 0;
                for (var i = settings.listMer[j].CotBD; i <= settings.listMer[j].CotKT; i++) {
                    chieuDaiCot += parseFloat(Grid.ColumnsCollection[i].Width);
                }
                //Append nội dung merg
                $('#ctl00_ContentPlaceHolder1_' + Grid.ID + '_ob_' + Grid.ID + 'HeaderContainer div table tbody').find('tr:first > :nth-child(' + (settings.listMer[j].CotBD + 1) + ')').append('<div class="mercol" style="width: ' + chieuDaiCot + 'px;">' + settings.listMer[j].NoiDung + '</div>');
            }
        }
    },
    GridToJsonString: function (index, grid) {
        var mang = [];
        for (var i = 0; i < Grid1.Rows.length; i++) { // quyets dòng
            var arrTemp = {};
            for (var j = index; j < grid.ColumnsCollection.length; j++) { // quét cột
                if (grid.ColumnsCollection[j].HeaderText != "") {
                    var s = grid.ColumnsCollection[j].DataField;
                    arrTemp[s] = grid.Rows[i].Cells[j].Value;
                }
            }
            mang.push(arrTemp);
        }
        return JSON.stringify(mang);
    },
    RemoveCharCodeAt0: function (str) {
        if (str === null || str === undefined) {
            str = '';
        }
        str = str.trim();
        while (str.search(String.fromCharCode(10)) != -1) {
            str = str.replace(String.fromCharCode(10), '<br />');
        }
        return str;
    },
    AddCharCodeAt0: function (str) {
        if (str === null || str === undefined) {
            str = '';
        }
        str = str.trim();
        while (str.search('<br />') != -1) {
            str = str.replace('<br />', String.fromCharCode(10));
        }
        return str;
    },
    NomalArray: function (arrMang) {
        for (var i = 0; i < arrMang.length; ++i) {
            (arrMang[i] == null || arrMang[i] == undefined) && (arrMang[i] = "");
        }
    },
    KiemTraQuyenThem: function () {
        if (!ntspermiss.them) {
            NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác thêm. Vui lòng kiểm tra lại.");
            return !1;
        }
        return !0;
    },
    KiemTraQuyenSua: function () {
        if (!ntspermiss.sua) {
            NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác sửa. Vui lòng kiểm tra lại.");
            return !1;
        }
        return !0;
    },
    KiemTraQuyenXoa: function () {
        if (!ntspermiss.xoa) {
            NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác xoá. Vui lòng kiểm tra lại.");
            return !1;
        }
        return !0;
    }, CauThongXetDuyet: function () {
        return `<p class="mb-1">Bạn có thật sự muốn xét duyệt dòng dữ liệu đã chọn không?</p>
<div style="padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #FFE9D9;
    border-left: 4px solid #FA703F;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 8px;
color: #BC4C2E;
">

<p class="mb-1" style="color:#771505"><i class="fa fa-warning" style="font-size:15px"></i> <b>Cảnh báo</b></p>
<p class="mb-1"></p>
<p class="mb-1">- Đồng ý xóa chọn <b>"Có"</b></p>
<p class="mb-1">- Không đồng ý chọn <b>"Không"</b></p>
</div>
`;
    }, CauThongBaoBoThuHoi: function () {
        return `<p class="mb-1">Bạn có thật sự muốn bỏ thu hồi dòng dữ liệu đã chọn không?</p>
<div style="padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #FFE9D9;
    border-left: 4px solid #FA703F;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 8px;
color: #BC4C2E;
">

<p class="mb-1" style="color:#771505"><i class="fa fa-warning" style="font-size:15px"></i> <b>Cảnh báo</b></p>
<p class="mb-1"></p>
<p class="mb-1">- Đồng ý bỏ thu hồi chọn <b>"Có"</b></p>
<p class="mb-1">- Không đồng ý chọn <b>"Không"</b></p>
</div>
`;
    },
    CauThongBaoXoa: function () {
        return `<p class="mb-1">Bạn có thật sự muốn xóa dòng dữ liệu đã chọn không?</p>
<div style="padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #FFE9D9;
    border-left: 4px solid #FA703F;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 8px;
color: #BC4C2E;
">

<p class="mb-1" style="color:#771505"><i class="fa fa-warning" style="font-size:15px"></i> <b>Cảnh báo</b></p>
<p class="mb-1">Dữ liệu sau khi đã xóa không thể phục hồi.</p>
<p class="mb-1">- Đồng ý xóa chọn <b>"Có"</b></p>
<p class="mb-1">- Không đồng ý chọn <b>"Không"</b></p>
</div>
`;
    }, CauThongBaoTrungTTDoiTuongNN: function () {
        return `<p class="mb-1">Bạn có thật sự muốn lưu thông tin thay đổi của đối tượng người nước ngoài khi thu thập không?</p>
<div style="padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #FFE9D9;
    border-left: 4px solid #FA703F;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 8px;
color: #BC4C2E;
">

<p class="mb-1" style="color:#771505"><i class="fa fa-warning" style="font-size:15px"></i> <b>Cảnh báo</b></p>
<p class="mb-1"></p>
<p class="mb-1">- Đồng ý lưu chọn <b>"Có"</b></p>
<p class="mb-1">- Không đồng ý chọn <b>"Không"</b></p>
</div>
`;
    }, CauThongBaoTrungTTDoiTuongNNvaToChuc: function () {
        return `<p class="mb-1">Bạn có thật sự muốn lưu thông tin thay đổi của đối tượng người nước ngoài và thông tin của tổ chức khi thu thập không?</p>
<div style="padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #FFE9D9;
    border-left: 4px solid #FA703F;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 8px;
color: #BC4C2E;
">

<p class="mb-1" style="color:#771505"><i class="fa fa-warning" style="font-size:15px"></i> <b>Cảnh báo</b></p>
<p class="mb-1"></p>
<p class="mb-1">- Đồng ý lưu chọn <b>"Có"</b></p>
<p class="mb-1">- Không đồng ý chọn <b>"Không"</b></p>
</div>
`;
    },
    CauThongBaoTrungTTToChuc: function () {
        return `<p class="mb-1">Bạn có thật sự muốn lưu thông tin thay đổi của tổ chức khi thu thập không?</p>
<div style="padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #FFE9D9;
    border-left: 4px solid #FA703F;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 8px;
color: #BC4C2E;
">

<p class="mb-1" style="color:#771505"><i class="fa fa-warning" style="font-size:15px"></i> <b>Cảnh báo</b></p>
<p class="mb-1"></p>
<p class="mb-1">- Đồng ý lưu chọn <b>"Có"</b></p>
<p class="mb-1">- Không đồng ý chọn <b>"Không"</b></p>
</div>
`;
    },
    CauThongLamMoi: function () {
        return "<p class=\"mb-1\">Bạn có thật sự muốn làm mới dữ liệu đã chọn không?</p><p class=\"mb-1\"> - Đồng ý làm mới chọn <b>'Có'</b></p><p class=\"mb-1\">- Không đồng ý chọn <b>'Không'</b></p>";
    },
    CauThongTongHop: function () {
        return "<p class=\"mb-1\">Anh/Chị có đồng ý tổng hợp số liệu không?</p><p class=\"mb-1\"> - Tổng hợp số liệu chọn <b>'Có'</b></p><p class=\"mb-1\">- Bỏ qua chọn <b>'Không'</b></p>";
    },


    CauThongTongHop_KhongThayDoi: function () {
        return "<p class=\"mb-1\">Số liệu dự toán thu, chi NSNN năm " + $('#texthdNamNS').text() + " đã tổng hợp. Anh/Chị có đồng ý tổng hợp lại không?</p><p class=\"mb-1\"> - Tổng hợp số liệu chọn <b>'Có'</b></p><p class=\"mb-1\">- Bỏ qua chọn <b>'Không'</b></p>";
    },
    CauThongTongHop_ThayDoi: function () {
        return "<p class=\"mb-1\">Số liệu lập dự toán thu, chi NSNN năm " + $('#texthdNamNS').text() + " có thay đổi. Anh/Chị có đồng ý tổng hợp lại không?</p><p class=\"mb-1\"> - Tổng hợp số liệu chọn <b>'Có'</b></p><p class=\"mb-1\">- Bỏ qua chọn <b>'Không'</b></p>";
    },
    CauThongBaoDuyet: function () {
        return "Bạn có đồng ý xét duyệt thông tin đã chọn không?<br/> - Đồng ý chọn <b>'Có'</b><br/>- Không đồng ý chọn <b>'Không'</b>.";
    },
    CauThongBaoBoDuyet: function () {
        return "<p class=\"mb-1\">Bạn có đồng ý bỏ duyệt thông tin đã chọn không?<br/> - Đồng ý chọn <b>'Có'</b>- Không đồng ý chọn <b>'Không'</b>.";
    },
    CauThongBaoGui: function () {
        return "<p class=\"mb-1\">Khi thực hiện thao tác gửi, số liệu sẽ không được phép chỉnh sửa và đơn vị tiếp nhận sẽ nhận được số liệu bạn gửi. Bạn có muốn tiếp tục thực hiện thao tác không? <p class=\"mb-1\"> - Đồng ý chọn <b>'Có'</b></p><p class=\"mb-1\">- Không đồng ý chọn <b>'Không'</b></p>";
    },
    CauThongBaoNop: function () {
        return "<p class=\"mb-1\">Khi thực hiện thao tác nộp, số liệu sẽ không được phép chỉnh sửa và đơn vị tiếp nhận sẽ nhận được số liệu bạn gửi. Bạn có muốn tiếp tục thực hiện thao tác không? <p class=\"mb-1\"> - Đồng ý chọn <b>'Có'</b></p><p class=\"mb-1\">- Không đồng ý chọn <b>'Không'</b></p>";
    },
    CauThongBaoThuHoiNop: function () {
        return "<p class=\"mb-1\">Khi thực hiện thao tác thu hồi, số liệu sẽ được phép chỉnh sửa và đơn vị tiếp nhận sẽ không nhận được số liệu bạn nộp. Bạn có muốn tiếp tục thực hiện thao tác không? <p class=\"mb-1\"> - Đồng ý chọn <b>'Có'</b></p><p class=\"mb-1\">- Không đồng ý chọn <b>'Không'</b></p>";
    },
    CauThongBaoBoGui: function () {
        return "<p class=\"mb-1\">Khi thực hiện thao tác bỏ gửi, số liệu sẽ được phép chỉnh sửa và đơn vị tiếp nhận sẽ không nhận được số liệu bạn gửi. Bạn có muốn tiếp tục thực hiện thao tác không? <p class=\"mb-1\"> - Đồng ý chọn <b>'Có'</b></p><p class=\"mb-1\">- Không đồng ý chọn <b>'Không'</b></p>";
    },
    CauCanhBaoDangSD: function () {
        return "<p class=\"mb-1\">Bạn có thật sự muốn cập nhật cho dòng dữ liệu đã chọn không?</p><p class=\"mb-1\"> - Đồng ý cập nhật chọn <b>'Có'</b></p><p class=\"mb-1\">- Không đồng ý chọn <b>'Không'</b></p>";
    },
    CauCanhBaoMacDinhSD: function () {
        return "<p class=\"mb-1\">Bạn có thật sự muốn cập nhật cho dòng dữ liệu đã chọn không?</p><p class=\"mb-1\"> - Đồng ý cập nhật chọn <b>'Có'</b></p><p class=\"mb-1\">- Không đồng ý chọn <b>'Không'</b></p>";
    },
    CauThongBaoXoaDinhKem: function () {
        return "<p class=\"mb-1\">Bạn có thật sự muốn xóa đính kèm đã chọn không?</p><p class=\"mb-1\"> - Đồng ý xóa chọn <b>'Có'</b></p><p class=\"mb-1\">- Không đồng ý chọn <b>'Không'</b></p>";
    },
    CauThongBaoCapNhatMacDinh: function () {
        return "<p class=\"mb-1\">Bạn có thật sự muốn lưu dòng dữ liệu với trạng thái mặc định sử dụng thay thế cho các thiết lập mặc định trước đó không?</p><p class=\"mb-1\"> - Đồng ý chọn <b>'Có'</b></p><p class=\"mb-1\">- Không đồng ý chọn <b>'Không'</b></p>";
    },
    CauCanhBaoDangSDV2: function () {
        return `
<div style="padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #FFE9D9;
    border-left: 4px solid #FA703F;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 8px;
color: #BC4C2E;
">

<p class="mb-1" style="color:#771505"> <b>Bạn có thật sự muốn cập nhật cho dòng dữ liệu đã chọn không?</b></p>
<p class="mb-1">- Đồng ý chọn <b>"Có"</b></p>
<p class="mb-1">- Không đồng ý chọn <b>"Không"</b></p>
</div>
`;
    },
    CauThongBaoXoaTatCaDoiTuong: function (SoLuong) {
        return `<p class="mb-1">Bạn có thật sự muốn xóa dòng dữ liệu đã chọn không?</p>
<div style="padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #FFE9D9;
    border-left: 4px solid #FA703F;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 8px;
color: #BC4C2E;
">

<p class="mb-1" style="color:#771505"><i class="fa fa-warning" style="font-size:15px"></i> <b>Cảnh báo</b></p>
<p class="mb-1">Khi đồng ý xoá hộ gia đình phần mềm sẽ xoá ${SoLuong} thành viên hộ. Dữ liệu sau khi đã xóa không thể phục hồi.</p>
<p class="mb-1">- Đồng ý xóa chọn <b>"Có"</b></p>
<p class="mb-1">- Không đồng ý chọn <b>"Không"</b></p>
</div>
`;
    },
    CauThongBaoTrungSoDinhDanhDoiTuong: function (ThongBao) {
        return `<p class="mb-1"></p>
<div style="padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #FFE9D9;
    border-left: 4px solid #FA703F;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 8px;
color: #BC4C2E;
">

<p class="mb-1" style="color:#771505"><i class="fa fa-warning" style="font-size:15px"></i> <b>Đã tồn tại số CMND/CCCD/Số định danh cá nhân</b></p>
<p class="mb-1">${ThongBao.replace(/\n/g, "<br>")}</p>
</div>
`;
    }, CauThongBaoTrungSoHoChieu: function (ThongBao) {
        return `<p class="mb-1"></p>
<div style="padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #FFE9D9;
    border-left: 4px solid #FA703F;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 8px;
color: #BC4C2E;
">
<p class="mb-1" style="color:#771505"><i class="fa fa-warning" style="font-size:15px"></i> <b>Đã tồn tại Số hộ chiếu</b></p>
<p class="mb-1">${ThongBao.replace(/\n/g, "<br>")}</p>
</div>
`;
    }, CauThongBaoTrungMaSoThue: function (ThongBao) {
        return `<p class="mb-1"></p>
<div style="padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #FFE9D9;
    border-left: 4px solid #FA703F;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 8px;
color: #BC4C2E;
">
<p class="mb-1" style="color:#771505"><i class="fa fa-warning" style="font-size:15px"></i> <b>Đã tồn tại Số ĐKKD/Mã số thuế</b></p>
<p class="mb-1">${ThongBao.replace(/\n/g, "<br>")}</p>
</div>
`;
    },
    CauThongBaoCapNhatDoiTuongCLD: function (ThongBao) {
        return `<p class="mb-1"></p>
<div style="padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #FFE9D9;
    border-left: 4px solid #FA703F;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 8px;
color: #BC4C2E;
">

<p class="mb-1" style="color:#771505"><i class="fa fa-warning" style="font-size:15px"></i> <b>Bạn có thật sự muốn cập nhật lại thông tin?</b></p>
<p class="mb-1">${ThongBao.replace(/\n/g, "<br>")}</p>
<p class="mb-1">- Đồng ý cập nhật chọn <b>"Có"</b></p>
<p class="mb-1">- Không đồng ý chọn <b>"Không"</b></p>
</div>
`;
    },
     CauThongBaoCapNhatDoiTuong: function (ThongBao) {
        return `<p class="mb-1">Bạn có muốn cập nhập dữ liệu thông tin của đối tượng thành chủ hộ gia đình?</p>
<div style="padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #FFE9D9;
    border-left: 4px solid #FA703F;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 8px;
color: #BC4C2E;
">

<p class="mb-1" style="color:#771505"><i class="fa fa-warning" style="font-size:15px"></i> <b>Đã tồn tại số CMND/CCCD/Số định danh cá nhân</b></p>
<p class="mb-1">${ThongBao.replace(/\n/g, "<br>")}</p>
<p class="mb-1">- Đồng ý xóa chọn <b>"Có"</b></p>
<p class="mb-1">- Không đồng ý chọn <b>"Không"</b></p>

</div>
`;
    }, CauThongBaoGuiPheDuyetTinTuyenDung: function (ThongBao) {
        return `<p class="mb-1"></p>
<div style="padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #FFE9D9;
    border-left: 4px solid #FA703F;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 8px;
color: #BC4C2E;
">

<p class="mb-1" style="color:#771505"><i class="fa fa-warning" style="font-size:15px"></i> <b>Bạn có thật sự muốn gửi phê duyệt?</b></p>
<p class="mb-1">${ThongBao.replace(/\n/g, "<br>")}</p>
<p class="mb-1">- Đồng ý phê duyệt chọn <b>"Có"</b></p>
<p class="mb-1">- Không đồng ý chọn <b>"Không"</b></p>
</div>
`;
    },
}
var TabulatorLangsVi = {
    "default": {
        "columns": {
            "name": "Name",
        },
        "ajax": {
            "loading": "Đang tải...",
            "error": "Lỗi tải dữ liệu",
        },
        "groups": {
            "item": "dòng",
            "items": "dòng",
        },
        "pagination": {
            "page_size": "Kích thước",
            "page_title": "Hiển thị",
            "first": '<i class="fa fa-step-backward" aria-hidden="true"></i>',
            "first_title": "Trang đầu",
            "last": '<i class="fa fa-step-forward" aria-hidden="true"></i>',
            "last_title": "Trang cuối",
            "prev": '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
            "prev_title": "Lùi lại",
            "next": '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
            "next_title": "Kế tiếp",
            "all": "All",
            "counter": {
                "showing": "Hiển thị",
                "of": "của",
                "rows": "dòng",
                "pages": "trang",
            }
        },
        "headerFilters": {
            "default": "filter column...",
            "columns": {
                "name": "filter name...",
            }
        },
    }
}
var firstEmptySelect = true;
function templateResult1(result) {
    if (firstEmptySelect) {
        firstEmptySelect = false;
        return '<div class="row header-select2">' +
            '<div class="col-4"><b>Mã</b></div>' +
            '<div class="col-8"><b>Tên</b></div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-4"></div>' +
            '<div class="col-8"></div>' +
            '</div>';
    }
    return '<div class="row">' +
        '<div class="col-4">' + result.text + '</div>' +
        '<div class="col-8">' + result.text1 + '</div>' +
        '</div>';
}
function templateResult(result) {
    if (firstEmptySelect) {
        firstEmptySelect = false;
        return '<div class="row" >' +
            '<div class="col-4"><b>Mã</b></div>' +
            '<div class="col-8"><b>Tên</b></div>' +
            '</div>';
    }
    return '<div class="row">' +
        '<div class="col-4">' + result.text + '</div>' +
        '<div class="col-8">' + result.text1 + '</div>' +
        '</div>';
}
function templateSelection_ChangeText1(result) {
    return result.text1;
}
function templateSelection(result) {
    return result.text;
}
function matcher(query, option) {
    //id, text, text1
    firstEmptySelect = true;
    if (!query.term || option.id == "" || option.id == "-1") {
        return option;
    }

    var has = true;
    var words = query.term.toUpperCase().split(" ");
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        has = (has && (option.text.toUpperCase().indexOf(word) >= 0)) || (has && (option.text1.toUpperCase().indexOf(word) >= 0));
    }
    if (has) return option;
    return null;
}
function str_replace(search, replace, str) {
    var ra = replace instanceof Array, sa = str instanceof Array, l = (search = [].concat(search)).length, replace = [].concat(replace), i = (str = [].concat(str)).length;
    while (j = 0, i--)
        while (str[i] = str[i].split(search[j]).join(ra ? replace[j] || "" : replace[0]), ++j < l);
    return sa ? str : str[0];
}
function remove_vietnamese_accents(str) {
    accents_arr = new Array(
        "à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ", "ă",
        "ằ", "ắ", "ặ", "ẳ", "ẵ", "è", "é", "ẹ", "ẻ", "ẽ", "ê", "ề",
        "ế", "ệ", "ể", "ễ",
        "ì", "í", "ị", "ỉ", "ĩ",
        "ò", "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ",
        "ờ", "ớ", "ợ", "ở", "ỡ",
        "ù", "ú", "ụ", "ủ", "ũ", "ư", "ừ", "ứ", "ự", "ử", "ữ",
        "ỳ", "ý", "ỵ", "ỷ", "ỹ",
        "đ",
        "À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ", "Ấ", "Ậ", "Ẩ", "Ẫ", "Ă",
        "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ",
        "È", "É", "Ẹ", "Ẻ", "Ẽ", "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ",
        "Ì", "Í", "Ị", "Ỉ", "Ĩ",
        "Ò", "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ", "Ơ",
        "Ờ", "Ớ", "Ợ", "Ở", "Ỡ",
        "Ù", "Ú", "Ụ", "Ủ", "Ũ", "Ư", "Ừ", "Ứ", "Ự", "Ử", "Ữ",
        "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ",
        "Đ"
    );

    no_accents_arr = new Array(
        "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
        "a", "a", "a", "a", "a", "a",
        "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
        "i", "i", "i", "i", "i",
        "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o",
        "o", "o", "o", "o", "o",
        "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u",
        "y", "y", "y", "y", "y",
        "d",
        "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A",
        "A", "A", "A", "A", "A",
        "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E",
        "I", "I", "I", "I", "I",
        "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O",
        "O", "O", "O", "O", "O",
        "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U",
        "Y", "Y", "Y", "Y", "Y",
        "D"
    );

    return str_replace(accents_arr, no_accents_arr, str);
}
function handleEvent(e) {
    var loaded = e.loaded;
    var total = e.total;
    var progressValue = Math.round((loaded / total) * 100);
}
function handleLoadstart(e, msg) {
    NTS.loadding();
}
function handleProgress(e, msg) {
    var loaded = e.loaded;
    var total = e.total;
    var progressValue = Math.round((loaded / total) * 100);
    $('.process').html(msg + ' ' + progressValue + '%');
}
function handleLoadend(e) {
    NTS.unloadding();
}
function addListeners(xhr, msg) {
    xhr.upload.addEventListener('loadstart', handleLoadstart(xhr, msg));
    xhr.addEventListener('load', handleEvent(xhr, msg));
    xhr.addEventListener('loadend', handleLoadend(xhr, msg));
    xhr.addEventListener('progress', handleProgress(xhr, msg));
    xhr.addEventListener('error', handleEvent);
    xhr.addEventListener('abort', handleEvent);
}
function request(kieuTraVe, data) {
    result = data;
    if (typeof (result) == 'undefined') {
        if (kieuTraVe == 'string')
            return '';
        return JSON.stringify({ d: [] });
    }
    if (typeof (result) == 'string')
        return result;
    return JSON.parse(result);
}

function toastDispose(toast) {
    if (toast && toast._element !== null) {
        if (toastPlacementExample) {
            toastPlacementExample.classList.remove(selectedType);
            DOMTokenList.prototype.remove.apply(toastPlacementExample.classList, selectedPlacement);
        }
        toast.dispose();
    }
}

