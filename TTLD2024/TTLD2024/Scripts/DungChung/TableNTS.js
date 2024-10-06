var stopAsync = false;
var stopAsync_temp = false;
var stopsetSum = false;
class Table_NTS {
    constructor(array) {
        this.array = array;
        this.arrData = [];
    }
    setDatatableNTS(data) {

        this.data = data;
        //phân trang
        this.currentPage = 1;
        this.rows = 50;
        this.arrData = data.Result;
        this.pagination();
        this.loadPaginationButton();
        this.colorStatus = '';

    }
    clearDatatableNTS() {
        var id = this.array[0].id // ID html table   
        var columns = this.array[0].columns // Cột thao tác
        try {
            //Tính số dòng để hiển thị text
            if (this.typeText == 'pagination') {
                this.rowPage = this.rows * (this.currentPage - 1) + data.length;
            } else {
                this.rowPage = data.length;
            }
            if (stopAsync == true) {
                stopAsync_temp = true;
            }
            this.setCurrentRowstableNTS();
        } catch {

        }

        $('.' + id + '-tr').remove();
        $('.' + this.array[0].id + '-tr').remove();
        var table = document.getElementById(id).getElementsByTagName('tbody')[0];
        var row = table.insertRow(-1);
        row.classList.add("nts-table-tr", id + '-tr');
        row.classList.add("nts-table-tr", id + '-tr-khongcosolieu');

        var celloperation = row.insertCell(0);
        celloperation.classList.add("nts-table-td");
        var originWeb = window.location.origin;
        celloperation.innerHTML = `<label><img  src="${originWeb}/Images/nodata.png" style="width: 300px; height: 300px" ></label>`;
        try {
            celloperation.colSpan = columns.length + (checkAll ? (operation.length > 0 ? 1 : 0) + 1 : (operation.length > 0 ? 1 : 0));
        } catch {
            celloperation.colSpan = columns.length + 1;
        }


        $('#' + id).css('height', '100%');
        this.changeTextArea();
    }
    addDatatableNTS(data) {
        this.data = data;
        this.addtableNTS();
        //phân trang
        this.currentPage = 1;
        this.rows = 50;
        this.arrData = data.Result;
    }
    getDatatableNTS() {
        return this.arrData;
        //    return this.data.Result = this.arrData;
    }
    scroll(id) {
        /*event scroll table*/
        $('.' + $('#' + id).parent()[0].className).on('scroll', function () {
            if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight - 1) {
                document.getElementById(id).getElementsByTagName('tbody')[0].style.borderBottom = "23px solid transparent";
            } else {
                document.getElementById(id).getElementsByTagName('tbody')[0].style.borderBottom = "23px solid black";
            }

        });
    }
    changeTextArea() {
        var id = this.array[0].id

        $('#' + id).find('textarea').each(function () {
            this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden; color: ' + this.style.color + ";");
        }).on('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    async loadtableNTS() {
        try {
            NTS.loadding();
            var id = this.array[0].id // ID html table
            var data = this.data.Result; // Dữ liệu
            var tableName = this.data.Msg // Tên bảng đang thao tác
            var columns = this.array[0].columns // Cột thao tác
            var groupBy = (this.array[0] && this.array[0].groupBy) ? this.array[0].groupBy : []; // Nhóm dữ liệu
            var edit = (this.array[0].edit != undefined) ? this.array[0].edit : true; // cho phép ràn sửa dữ liệu trên lưới
            var key = this.array[0].Keyid //Khóa chính của bảng dữ liệu đang thao tác
            var operation = (this.array[0] && this.array[0].operation) ? this.array[0].operation : []; // các nút thao tác, nút xóa, nút sửa
            var checkAll = this.array[0].checkAll; // cho phép hiển thị cột dấu check trên lưới
            var operation_checkAll = (this.array[0] && this.array[0].operation_checkAll) ? this.array[0].operation_checkAll : []; // điều kiện để hiển thị dấu check ở dòng mong muốn
            var onblur = (this.array[0] && this.array[0].onblur) ? this.array[0].onblur : ""; // hàm onblur của từng input trên lưới
            var rowscolor = (this.array[0] && this.array[0].rowscolor) ? this.array[0].rowscolor : []; // set màu của dòng theo điều kiện mong muốn ví dụ nếu in đậm =1 thì màu đỏ
            var displayAction = (this.array[0].displayAction != undefined) ? this.array[0].displayAction : true; // ẩn hiện cột thao tác

            try {
                //Tính số dòng để hiển thị text
                if (this.typeText == 'pagination') {
                    this.rowPage = this.rows * (this.currentPage - 1) + data.length;
                } else {
                    this.rowPage = data.length;
                }
                if (stopAsync == true) {
                    stopAsync_temp = true;
                }
                this.setCurrentRowstableNTS();
            } catch {

            }

            $('.' + id + '-tr').remove();

            if (data.length > 0) {

                var space = 0;
                var tempgroup = '';
                for (let i = 0; i < data.length; i++) {
                    stopAsync = true;
                    if (stopAsync_temp == true) {
                        stopAsync_temp = false;
                        stopAsync = false;
                        $('.' + id + '-tr').remove();
                        break;
                    }
                    var table = document.getElementById(id).getElementsByTagName('tbody')[0];
                    var row = table.insertRow(-1);

                    if (rowscolor.length > 0) {
                        for (let y = 0; y < rowscolor.length; y++) {
                            if (data[i][rowscolor[y].field] == rowscolor[y].value && rowscolor[y].value != "") {
                                this.colorStatus = rowscolor[y].color;
                                break;
                            }
                            else {
                                this.colorStatus = 'black';
                            }
                        }
                    }

                    row.classList.add("nts-table-tr", id + "-tr", "context-menu-one");
                    row.setAttribute("id", "nts-table-tr" + i);
                    row.setAttribute("data-tableName", tableName);

                    row.setAttribute("data-groupfather", data[i]["textgroupFather"]);
                    row.setAttribute("data-groupsub", data[i]["textgroupsub"]);

                    row.setAttribute("data-index", i);
                    row.setAttribute("data-key", data[i]["" + key]);
                    row.setAttribute("data-colum-key", key);
                    if (data[i]["InDam"] == '1') {
                        row.classList.add("bold-table-nts");
                    }
                    if (data[i]["InNghieng"] == '1') {
                        row.classList.add("italic-table-nts");
                    }
                    if (data[i]["GachChan"] == '1') {
                        row.classList.add("decoration-table-nts");
                    }
                    var index_Cell = 0
                    if (checkAll) {

                        var cellCheck = row.insertCell(index_Cell);
                        cellCheck.classList.add("nts-table-td", "checkAll" + (i + 1));
                        cellCheck.setAttribute("data-key", data[i]["" + key]);
                        cellCheck.setAttribute("data-tableName", tableName);
                        cellCheck.colSpan = 0;
                        cellCheck.rowSpan = 1;
                        cellCheck.innerHTML = `<div class="dropdown">` + (data[i]["" + operation_checkAll[0].field] == operation_checkAll[0].value ? "<input type='checkbox' class='checkBox'/>" : "") + `</div>`;
                        index_Cell = index_Cell + 1;

                    }

                    if (displayAction) {
                        var celloperation = row.insertCell(index_Cell);
                        index_Cell = index_Cell + 1;
                        celloperation.classList.add("nts-table-td", "table_Thu_SN_DV-A" + (i + 1));
                        celloperation.colSpan = 0;
                        celloperation.rowSpan = 1;
                        // celloperation.title = getColumnName(j) + (i + 1);
                        if (data[i].groupFather == '0') {
                            if (operation.length > 0) {
                                var innerHTML_operation = "";
                                var innerHTML_operation_row = "";
                                for (var j = 0; j < operation.length; j++) {
                                    var row_ = (operation[j].row != 'undefined') ? operation[j].row : false;
                                    var visible = (operation[j].visible != 'undefined') ? operation[j].visible : true;

                                    if (visible == false) {
                                        innerHTML_operation = "";
                                        innerHTML_operation_row = "";
                                        break;
                                    }
                                    try {
                                        if (data[i][operation[j].visible[0].field] == operation[j].visible[0].value) {
                                            if (row_ == true) {
                                                innerHTML_operation_row += (innerHTML_operation_row == "" ? "" : "") + `<a class=" ${operation[j].event} ${(innerHTML_operation_row == "" ? "" : " marginleft")}" data-key="${data[i]["" + key]}" href="#" title="${operation[j].title}"><i class="${operation[j].class}"></i></a>`;
                                            } else {
                                                innerHTML_operation += `<a class="dropdown-item ${operation[j].event}" data-key="${data[i]["" + key]}" href="#"><i class="${operation[j].class}"></i>&nbsp;${operation[j].title}</a>`;
                                            }
                                        }
                                    } catch {
                                        if (row_ == true) {
                                            innerHTML_operation_row += (innerHTML_operation_row == "" ? "" : "") + `<a class="${operation[j].event} ${(innerHTML_operation_row == "" ? "" : " marginleft")}" data-key="${data[i]["" + key]}" href="#" title="${operation[j].title}"><i class="${operation[j].class}"></i></a>`;
                                        } else {
                                            innerHTML_operation += `<a class="dropdown-item ${operation[j].event}" data-key="${data[i]["" + key]}" href="#"><i class="${operation[j].class}"></i>&nbsp;${operation[j].title}</a>`;
                                        }
                                    }
                                }
                                celloperation.innerHTML = `<div><div>` + innerHTML_operation_row + (innerHTML_operation == "" ? "" : `<div class="dropdown" ${(innerHTML_operation == "" ? `style = "display:none"` : ``)}>
                                                                                            <a class="text-secondary" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-h nts-color-NTS-16a085" ></i></a>
                                                                                            <div class="dropdown-menu dropdown-menu-end" style="min-width: 260px;">
                                                                                            `+ innerHTML_operation + `
                                                                                             </div>
                                                                                        </div> `) + `</div></div>`;
                            }
                            //    space = 0;
                        }
                        else {

                            celloperation.innerHTML = `<div>                                                
                            <a class="text-secondary" onclick="toggleGroupBy(this); return false;" href="#"><i class="nts fa fa-angle-down nts-color-NTS-16a085" style="font-size:18px;"></i></a></div>`;
                        }
                    }

                    for (var j = 0; j < columns.length; j++) {
                        stopAsync = true;
                        if (stopAsync_temp == true) {
                            stopAsync_temp = false;
                            stopAsync = false;
                            $('.' + id + '-tr').remove();
                            break;
                        }
                        var title = columns[j].title;
                        var field = columns[j].field;
                        var formatter = (columns[j] && columns[j].formatter) ? columns[j].formatter : "";
                        var Combobox = (columns[j] && columns[j].Combobox) ? columns[j].Combobox : "";
                        var hozAlign = columns[j].hozAlign;
                        var width = columns[j].width;
                        var visible = columns[j].visible;
                        var readonly = (columns[j] && columns[j].readonly) ? columns[j].readonly : "";
                        var round = columns[j].round;
                        var disabled = (columns[j] && columns[j].disabled) ? columns[j].disabled : "";

                        var formula_Default = (columns[j] && columns[j].formula ? columns[j].formula : "").replaceAll("[index]", (i + 1));
                        var width = (columns[j] && columns[j].width) ? columns[j].width : "100px";
                        var Json_CongThuc = "";
                        var event = (columns[j] && columns[j].event) ? columns[j].event : "";

                        try {
                            Json_CongThuc = (formula_Default == "" ? JSON.parse(data[i]["Json_CongThuc"])[0]["" + field] : formula_Default);
                        } catch {
                            Json_CongThuc = (formula_Default == "" ? "" : formula_Default)
                        }
                        var a = index_Cell + j;
                        let cell = row.insertCell(a);

                        cell.classList.add("nts-table-td", id + "-td-" + getColumnName(j) + (i + 1));
                        cell.colSpan = 0;
                        cell.rowSpan = 1;
                        //cell.title = getColumnName(j) + (i + 1);
                        var groupfatherText = (data[i]["textgroupFather"] == "" || formatter != "number" ? "" : "[" + field + "][" + data[i]["textgroupFather"] + "]");
                        var groupsubText = (data[i]["textgroupsub"] == "" || formatter != "number" ? "" : "[" + field + "][" + data[i]["textgroupsub"] + "]");
                        if (event != "" && data[i]["InDam"] == '0') {
                            cell.innerHTML = `
                                <label class="label-class-td" style="z-index: 999999;">${getColumnName(j) + (i + 1)}</label> 
                                <a class = 'formatter-nts 
                                    nts-td-input
                                    nts-td-input-left
                                    ${event}
                                    ${id + getColumnName(j) + (i + 1)}
                                    ${field + "_" + data[i]["" + key]}'
                                    data-groupfather="${groupfatherText}"
                                    data-groupsub="${groupsubText}"
                                    data-input="${id + "-td-" + getColumnName(j) + (i + 1)}"
                                    data-formula-temp=""
                                    data-formula="${Json_CongThuc}" 
                                    data-Keyid="${data[i]["" + key]}"
                                    data-key="${data[i]["" + key]}"
                                    data-table="${id + ""}" 
                                    data-td="${id + "-td-"}"
                                    data-colum="${field}"' style='color: black; float:left; margin-left:7px' value='${data[i][field]}'> ${data[i][field]} </a>`;
                        }
                        else {
                            if (Combobox != "") {
                                cell.innerHTML = `
                                <label class="label-class-td" style="z-index: 999999;">${getColumnName(j) + (i + 1)}</label> 
                           
                                <select  ${readonly == true || this.data.Sua == true ? "disabled" : ""}  class="selectmenu
                                              form-control
                                              input-sm
                                              nts-td-input
                                              nts-td-input-${hozAlign}
                                              ${readonly == true || this.data.Sua == true ? "no-input" : ""}
                                              ${id}-input
                                              ${id + getColumnName(j) + (i + 1)}
                                              ${field + "_" + data[i]["" + key]}"
                                              ${readonly == true || this.data.Sua == true ? `tabindex="-1"` : ""}
                                              data-groupfather="${groupfatherText}"
                                              data-groupsub="${groupsubText}"
                                              data-input="${id + "-td-" + getColumnName(j) + (i + 1)}"
                                              data-formula-temp=""
                                              data-formula="${Json_CongThuc}" 
                                              data-Keyid="${data[i]["" + key]}"
                                              data-key="${getColumnName(j) + (i + 1)}" 
                                              data-table="${id + ""}" 
                                              data-td="${id + "-td-"}"
                                              data-colum="${field}"
                                              onkeydown = "colorformula_onkeydown(this)"
                                              onkeyup = "colorformula_onkeyup(this)"
                                              onclick = "kiemtraformula(this)"
                                              onchange ="setSum(this)"
                                              ${(onblur == "" ? "" : `onblur = "` + onblur + `(this)"`)} ${(((formula_Default != "" || data[i].groupFather == '1') && formatter == "number") || disabled == true ? "disabled" : "")}/> `;

                                NTS.loadDataComboTableNTS({
                                    name: "." + field + "_" + data[i]["" + key],
                                    data: Combobox,
                                    columns: 2,
                                    indexValue: 0,
                                    indexText1: 2,
                                    textShowTatCa: '-Chọn-',
                                    showTatCa: 0
                                });

                            }
                            else {
                                if (formatter == "html") {
                                    cell.innerHTML = data[i][field];

                                }
                                else if (formatter == "number") {
                                    cell.innerHTML = `
                                <label class="label-class-td">${getColumnName(j) + (i + 1)}</label> 

                                <input class="formatter-nts ${formatter == "number" ? "number-table-nts" : ""} 
                                              form-control
                                              input-sm
                                              nts-td-input
                                              nts-td-input-${hozAlign}
                                              ${readonly == true || this.data.Sua == true ? "no-input" : ""}
                                              ${id}-input
                                              ${id + getColumnName(j) + (i + 1)}
                                              ${field + "_" + data[i]["" + key]}"
                                              ${readonly == true || this.data.Sua == true ? `tabindex="-1"` : ""}
                                              round="${round}"
                                              data-groupfather="${groupfatherText}"
                                              data-groupsub="${groupsubText}"
                                              data-input="${id + "-td-" + getColumnName(j) + (i + 1)}"
                                              data-formula-temp=""
                                              data-formula="${Json_CongThuc}" 
                                              data-Keyid="${data[i]["" + key]}"
                                              data-key="${getColumnName(j) + (i + 1)}" 
                                              data-table="${id + ""}" 
                                              data-td="${id + "-td-"}"
                                              data-colum="${field}"
                                              onkeydown = "colorformula_onkeydown(this)"
                                              onkeyup = "colorformula_onkeyup(this)"
                                              onclick = "kiemtraformula(this)"
                                              onchange ="setSum(this)"
                                              ${(onblur == "" ? "" : `onblur = "` + onblur + `(this)"`)} ${(((formula_Default != "" || data[i].groupFather == '1') && formatter == "number") || disabled == true ? (edit == true ? "disabled" : "") : "")}
                                              style = "color: ${this.colorStatus}"/>`;
                                }
                                else {
                                    cell.innerHTML = `
                                <label class="label-class-td">${getColumnName(j) + (i + 1)}</label> 

                                <textarea  rows="1" class="formatter-nts  
                                              form-control
                                              input-sm
                                              nts-td-input
                                              nts-td-input-${hozAlign}
                                              ${readonly == true || this.data.Sua == true ? "no-input" : ""}
                     
                                              ${id}-input
                                              ${id + getColumnName(j) + (i + 1)}
                                              ${field + "_" + data[i]["" + key]}"
                                              ${readonly == true || this.data.Sua == true ? `tabindex="-1"` : ""}
                                              data-groupfather="${groupfatherText}"
                                              data-groupsub="${groupsubText}"
                                              data-input="${id + "-td-" + getColumnName(j) + (i + 1)}"
                                              data-formula-temp=""
                                              data-formula="${Json_CongThuc}" 
                                              data-Keyid="${data[i]["" + key]}"
                                              data-key="${getColumnName(j) + (i + 1)}" 
                                              data-table="${id + ""}" 
                                              data-td="${id + "-td-"}"
                                              data-colum="${field}"
                                              onkeydown = "colorformula_onkeydown(this)"
                                              onkeyup = "colorformula_onkeyup(this)"
                                              onclick = "kiemtraformula(this)"
                                              onchange ="setSum(this)"
                                              ${(onblur == "" ? "" : `onblur = "` + onblur + `(this)"`)} ${(((formula_Default != "" || data[i].groupFather == '1') && formatter == "number") || disabled == true ? (edit == true ? "disabled" : "") : "")}
                                              style = "color: ${this.colorStatus}"></textarea>`;
                                }

                            }
                        }


                        stopsetSum = true;
                        if (event == '' || data[i]["InDam"] == '1') {
                            if (formatter != "html") {
                                $("." + field + "_" + data[i]["" + key]).value(data[i][field]);
                            }
                            if (this.data.Xoa == true) {

                                $('.Xoa').hide()
                            }
                            if (this.data.Sua == true) {
                                $('.Sua').hide()
                            }
                        }
                        stopsetSum = false;

                    }

                    await new Promise(resolve => setTimeout(resolve, 1));

                }
                var table = document.getElementById(id).getElementsByTagName('tbody')[0];
                var row = table.insertRow(-1);
                row.classList.add("nts-table-tr", id + "-tr", "context-menu-one");
                stopAsync = false;
                stopAsync_temp = false;

                $('#' + id).removeAttr('style');
                $('#' + id).css({
                    'width': 'max-content'
                });
            } else {
                $('.' + this.array[0].id + '-tr').remove();
                var table = document.getElementById(id).getElementsByTagName('tbody')[0];
                var row = table.insertRow(-1);
                row.classList.add("nts-table-tr", id + '-tr');
                row.classList.add("nts-table-tr", id + '-tr-khongcosolieu');
                $('#' + id).css('height', '100%');
                var celloperation = row.insertCell(0);
                celloperation.classList.add("nts-table-td");
                var originWeb = window.location.origin;
                celloperation.innerHTML = `<label><img  src="${originWeb}/Images/nodata.png" style="width: 300px; height: 300px" ></label>`;
                celloperation.colSpan = columns.length + (checkAll ? (operation.length > 0 ? 1 : 0) + 1 : (operation.length > 0 ? 1 : 0));
                celloperation.rowSpan = 1;
            }
            this.changeTextArea();
            NTS.unloadding();

        } catch (e) {
            console.log(e);
            NTS.unloadding();
            NTS.unloadding();
            //   $('.' + this.array[0].id + '-tr').remove();
        }
    }
    addtableNTS() {
        try {
            $('.' + this.array[0].id + '-tr-khongcosolieu').remove();
            var id = this.array[0].id
            var data = this.data.Result;
            var tableName = this.data.Msg
            var columns = this.array[0].columns
            var groupBy = (this.array[0] && this.array[0].groupBy) ? this.array[0].groupBy : [];
            var key = this.array[0].Keyid
            var operation = this.array[0].operation
            var checkAll = this.array[0].checkAll;
            var onblur = (this.array[0] && this.array[0].onblur) ? this.array[0].onblur : "";

            if (this.typeText == 'pagination') {
                this.rowPage = this.rows * (this.currentPage - 1) + data.length;
            } else {
                this.rowPage = data.length;
            }
            if (stopAsync == true) {
                stopAsync_temp = true;
            }
            this.setCurrentRowstableNTS();

            if (data.length > 0) {
                var space = 0;
                var tempgroup = '';
                var i = 0
                stopAsync_temp = false;
                stopAsync = false;
                var table = document.getElementById(id).getElementsByTagName('tbody')[0];
                var row = table.insertRow(0);
                row.classList.add("nts-table-tr", id + "-tr", "context-menu-one");
                row.setAttribute("id", "nts-table-tr" + i);
                row.setAttribute("data-tableName", tableName);
                row.setAttribute("data-groupfather", data[i]["textgroupFather"]);
                row.setAttribute("data-groupsub", data[i]["textgroupsub"]);
                row.setAttribute("data-index", i);
                row.setAttribute("data-key", data[i]["" + key]);
                row.setAttribute("data-colum-key", key);
                if (data[i]["InDam"] == '1') {
                    row.classList.add("bold-table-nts");
                }
                if (data[i]["InNghieng"] == '1') {
                    row.classList.add("italic-table-nts");
                }
                if (data[i]["GachChan"] == '1') {
                    row.classList.add("decoration-table-nts");
                }
                var index_Cell = 0
                if (checkAll) {
                    var cellCheck = row.insertCell(index_Cell);
                    cellCheck.classList.add("nts-table-td", "checkAll" + (i + 1));
                    cellCheck.setAttribute("data-key", data[i]["" + key]);
                    cellCheck.setAttribute("data-tableName", tableName);
                    cellCheck.colSpan = 0;
                    cellCheck.rowSpan = 1;
                    cellCheck.innerHTML = `<div class="dropdown"><input type='checkbox'/></div>`;
                    index_Cell = index_Cell + 1;
                }
                var celloperation = row.insertCell(index_Cell);
                celloperation.classList.add("nts-table-td", "table_Thu_SN_DV-A" + (i + 1));
                celloperation.colSpan = 0;
                celloperation.rowSpan = 1;
                // celloperation.title = getColumnName(j) + (i + 1);
                if (data[i].groupFather == '0') {

                    if (operation.length > 0) {
                        var innerHTML_operation = "";
                        var innerHTML_operation_row = "";
                        for (var j = 0; j < operation.length; j++) {
                            var row_ = (operation[j].row != 'undefined') ? operation[j].row : false;
                            var visible = (operation[j].visible != 'undefined') ? operation[j].visible : true;
                            if (visible == false) {
                                innerHTML_operation = "";
                                innerHTML_operation_row = "";
                                break;
                            }
                            try {
                                if (data[i][operation[j].visible[0].field] == operation[j].visible[0].value) {
                                    if (row_ == true) {
                                        innerHTML_operation_row += (innerHTML_operation_row == "" ? "" : "&nbsp;&nbsp;") + `<a class=" ${operation[j].event}" data-key="${data[i]["" + key]}" href="#" title="${operation[j].title}"><i class="${operation[j].class}"></i></a>`;
                                    } else {
                                        innerHTML_operation += `<a class="dropdown-item ${operation[j].event}" data-key="${data[i]["" + key]}" href="#"><i class="${operation[j].class}"></i>&nbsp;${operation[j].title}</a>`;
                                    }
                                }
                            } catch {
                                if (row_ == true) {
                                    innerHTML_operation_row += (innerHTML_operation_row == "" ? "" : "&nbsp;&nbsp;") + `<a class="${operation[j].event}" data-key="${data[i]["" + key]}" href="#" title="${operation[j].title}"><i class="${operation[j].class}"></i></a>`;
                                } else {
                                    innerHTML_operation += `<a class="dropdown-item ${operation[j].event}" data-key="${data[i]["" + key]}" href="#"><i class="${operation[j].class}"></i>&nbsp;${operation[j].title}</a>`;
                                }
                            }
                        }
                        celloperation.innerHTML = `<div><div>` + innerHTML_operation_row + (innerHTML_operation == "" ? "" : `<div class="dropdown" ${(innerHTML_operation == "" ? `style = "display:none"` : ``)}>
                                                                                            <a class="text-secondary" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-h nts-color-NTS-16a085" ></i></a>
                                                                                            <div class="dropdown-menu dropdown-menu-end" style="width: 250px;">
                                                                                            `+ innerHTML_operation + `
                                                                                             </div>
                                                                                        </div> `) + `</div></div>`;
                    }
                    //    space = 0;
                }
                else {
                    celloperation.innerHTML = `<div>                                                
                            <a class="text-secondary" onclick="toggleGroupBy(this); return false;" href="#"><i class="nts fa fa-angle-down nts-color-NTS-16a085" style="font-size:18px;"></i></a></div>`;
                }

                for (var j = 0; j < columns.length; j++) {

                    var title = columns[j].title;
                    var field = columns[j].field;
                    var formatter = (columns[j] && columns[j].formatter) ? columns[j].formatter : "";
                    var Combobox = (columns[j] && columns[j].Combobox) ? columns[j].Combobox : "";
                    var hozAlign = columns[j].hozAlign;
                    var width = columns[j].width;
                    var visible = columns[j].visible;
                    var readonly = (columns[j] && columns[j].readonly) ? columns[j].readonly : "";

                    var disabled = (columns[j] && columns[j].disabled) ? columns[j].disabled : "";
                    var formula_Default = (columns[j] && columns[j].formula ? columns[j].formula : "").replaceAll("[index]", (i + 1));
                    var Json_CongThuc = "";
                    if (field == "NoiDung") {
                        data[i][field]
                    }
                    try {
                        Json_CongThuc = (formula_Default == "" ? JSON.parse(data[i]["Json_CongThuc"])[0]["" + field] : formula_Default);
                    } catch {
                        Json_CongThuc = (formula_Default == "" ? "" : formula_Default)
                    }
                    let cell = row.insertCell((operation.length > 0 ? (j + (index_Cell + 1)) : j));
                    cell.classList.add("nts-table-td", id + "-td-" + getColumnName(j) + (i + 1));
                    cell.colSpan = 0;
                    cell.rowSpan = 1;
                    //cell.title = getColumnName(j) + (i + 1);
                    var groupfatherText = (data[i]["textgroupFather"] == "" || formatter != "number" ? "" : "[" + field + "][" + data[i]["textgroupFather"] + "]");
                    var groupsubText = (data[i]["textgroupsub"] == "" || formatter != "number" ? "" : "[" + field + "][" + data[i]["textgroupsub"] + "]");
                    if (Combobox != "") {
                        cell.innerHTML = `
                                <label class="label-class-td">${getColumnName(j) + (i + 1)}</label> 
                                <select class="selectmenu
                                              form-control
                                              input-sm
                                              nts-td-input
                                              nts-td-input-${hozAlign}
                                              ${readonly == true ? "no-input" : ""}
                                              ${id}-input
                                              ${id + getColumnName(j) + (i + 1)}
                                              ${field + "_" + data[i]["" + key]}"
                                              data-groupfather="${groupfatherText}"
                                              data-groupsub="${groupsubText}"
                                              data-input="${id + "-td-" + getColumnName(j) + (i + 1)}"
                                              data-formula-temp=""
                                              data-formula="${Json_CongThuc}" 
                                              data-Keyid="${data[i]["" + key]}"
                                              data-key="${getColumnName(j) + (i + 1)}" 
                                              data-table="${id + ""}" 
                                              data-td="${id + "-td-"}"
                                              data-colum="${field}"
                                              onkeydown = "colorformula_onkeydown(this)"
                                              onkeyup = "colorformula_onkeyup(this)"
                                              onclick = "kiemtraformula(this)"
                                              onchange ="setSum(this)"
                                              ${(onblur == "" ? "" : `onblur = "` + onblur + `(this)"`)} ${(((formula_Default != "" || data[i].groupFather == '1') && formatter == "number") || disabled == true ? "disabled" : "")}/>`;

                        NTS.loadDataComboTableNTS({
                            name: "." + field + "_" + data[i]["" + key],
                            data: Combobox,
                            columns: 2,
                            indexValue: 0,
                            indexText1: 2,
                            textShowTatCa: '-Chọn-',
                            showTatCa: !0
                        });

                    } else {
                        cell.innerHTML = `
                                <label class="label-class-td">${getColumnName(j) + (i + 1)}</label> 
                                <input class="formatter-nts ${formatter == "number" ? "number-table-nts" : ""} 
                                              form-control
                                              input-sm
                                              nts-td-input
                                              nts-td-input-${hozAlign}
                                              ${readonly == true ? "no-input" : ""}
                                              ${id}-input
                                              ${id + getColumnName(j) + (i + 1)}
                                              ${field + "_" + data[i]["" + key]}"
                                              data-groupfather="${groupfatherText}"
                                              data-groupsub="${groupsubText}"
                                              data-input="${id + "-td-" + getColumnName(j) + (i + 1)}"
                                              data-formula-temp=""
                                              data-formula="${Json_CongThuc}" 
                                              data-Keyid="${data[i]["" + key]}"
                                              data-key="${getColumnName(j) + (i + 1)}" 
                                              data-table="${id + ""}" 
                                              data-td="${id + "-td-"}"
                                              data-colum="${field}"
                                              onkeydown = "colorformula_onkeydown(this)"
                                              onkeyup = "colorformula_onkeyup(this)"
                                              onclick = "kiemtraformula(this)"
                                              onchange ="setSum(this)"
                                              ${(onblur == "" ? "" : `onblur = "` + onblur + `(this)"`)} ${(((formula_Default != "" || data[i].groupFather == '1') && formatter == "number") || disabled == true ? "disabled" : "")}/>`;
                    }
                    stopsetSum = true;
                    $("." + field + "_" + data[i]["" + key]).value(data[i][field]);
                    stopsetSum = false;
                }

                $('#' + id).removeAttr('style');
                $('#' + id).css({
                    'width': 'max-content'
                });

            } else {
                $('#' + id).css('height', '100%');

            }
        } catch {
        }
    }
    loadPaginationButton() {

        try {
            if (this.array[0].pagination[0].visible) {
                // Load select Trang
                try {
                    var parentElement = document.getElementById(this.array[0].id);
                    var childElements = parentElement.getElementsByClassName('Trang');
                    var textTrang = parentElement.getElementsByClassName('textTrang');
                    textTrang[0].innerText = '';

                    childElements[0].innerHTML = ` <select  class="form-control select-rows" tabindex="0" onchange="${this.array[0].pagination[0].varTable}.setLoadPagination(event);">
                                                                <option value="50" ${this.rows == 50 ? "selected" : ""}>50</option>
                                                                <option value="100" ${this.rows == 100 ? "selected" : ""}>100</option>
                                                                <option value="200" ${this.rows == 200 ? "selected" : ""}>200</option>
                                                                <option value="500" ${this.rows == 500 ? "selected" : ""}>500</option>
                                                                <option value="Tất cả" ${this.rows == this.arrData.length ? "selected" : ""}>Tất cả</option>
                                                            </select>`;
                    childElements[0].value = this.rows + '';
                } catch (e) { }

                // Load phân trang button
                try {
                    var parentElement = document.getElementById(this.array[0].id);
                    var button_group = parentElement.getElementsByClassName('btn-group');
                    try {
                        while (button_group[0].firstChild) {
                            button_group[0].removeChild(button_group[0].firstChild);
                        }
                    } catch { }
                    var soTrang = 0;
                    if ((this.arrData.length % this.rows) != 0) {
                        soTrang = (this.arrData.length / this.rows) + 1;
                    }
                    else {
                        soTrang = (this.arrData.length / this.rows);
                    }

                    var html = '';
                    var dem = 0;

                    if (this.currentPage > 0) {
                        for (let i = 0; i < soTrang; i++) {
                            if (i < 5 && (this.currentPage + i <= soTrang)) {
                                html += `<button type="button" onclick="${this.array[0].pagination[0].varTable}.paginateArray(this);" class="btn btn-white" style="${this.currentPage == (this.currentPage + i) ? "background-color:#d0ead9" : ""}">
                            ${this.currentPage + i}</button>`;
                                dem++;
                            }
                        }
                        //Phần bù
                        if (dem < 5) {
                            for (let i = 0; i < (soTrang >= 5 ? 5 : soTrang) - dem; i++) {
                                if (this.currentPage - (i + 1) != 0) {
                                    html = `<button type="button" onclick="${this.array[0].pagination[0].varTable}.paginateArray(this);" class="btn btn-white" style="${this.currentPage == (this.currentPage - (i + 1)) ? "background-color:#d0ead9" : ""}">
                                ${this.currentPage - (i + 1)}</button>` + html;
                                }
                            }
                        }
                    } else {
                        html += `<button type="button" onclick="${this.array[0].pagination[0].varTable}.paginateArray(this);" class="btn btn-white" style="background-color:#d0ead9">
                           1</button>`;
                    }

                    button_group[0].innerHTML = `<button type="button" onclick="${this.array[0].pagination[0].varTable}.paginateArray(this);" class="btn btn-primary">Trước</button>
                                    ${html}
                                    <button type="button" onclick="${this.array[0].pagination[0].varTable}.paginateArray(this);" class="btn btn-primary">Sau</button>`;

                } catch (e) { }
            }
            else {
                var parentElement = document.getElementById(this.array[0].id);
                var textTrang = parentElement.getElementsByClassName('textTrang');
                textTrang[0].innerText = '';
            }
        } catch {

        }

    }
    setCurrentRowstableNTS() {
        try {
            var parentElement = document.getElementById(this.array[0].id);
            var childElements = parentElement.getElementsByClassName('footer-text-nts');

            childElements[0].innerText = ('Hiển thị ' + (this.rowPage) + ' - ' + this.arrData.length + ' dòng');
        } catch { NTS.unloadding(); }

    };
    paginateArray(selector) {
        try {

            //Xử lý phân trang khi nhấn vào nút
            var currentPage = 1;
            if (selector.textContent == 'Trước' && this.currentPage > 1)
                currentPage = this.currentPage - 1;
            else if (selector.textContent == 'Sau' && (this.currentPage * this.rows < this.arrData.length))
                currentPage = this.currentPage + 1;
            else if (selector.textContent == 'Trước' || selector.textContent == 'Sau') {
                currentPage = this.currentPage;
            }
            else
                currentPage = parseInt(selector.textContent);

            this.currentPage = currentPage;
            this.typeText = 'pagination';
            this.loadPaginationButton();

            this.pagination();
        } catch { NTS.unloadding(); }
    };
    pagination() {
        //Xử lý phân trang
        if ((this.array[0].pagination.length > 0 && this.array[0].pagination[0].visible)) {
            const startIndex = (this.currentPage - 1) * this.rows;
            const endIndex = startIndex + this.rows;
            this.data.Result = this.arrData.slice(startIndex, endIndex);
        }
        else {
            this.data.Result = this.arrData;
        }
        this.typeText = 'pagination';

        this.loadtableNTS();
    }
    setLoadPagination(event) {
        // Chọn từ select Trang
        var endIndex = 50;
        if (event.target.value != 'Tất cả') {
            endIndex = parseInt(event.target.value);
        }
        else
            endIndex = this.arrData.length;
        this.currentPage = 1;
        this.rows = endIndex;
        this.data.Result = this.arrData.slice(0, endIndex);;
        this.typeText = 'select';
        this.loadtableNTS();
        this.loadPaginationButton();
    }
    getData() {
        var id = this.array[0].id
        var arr = [];
        var table = document.getElementById(id);
        var rows = table.getElementsByTagName('tr');

        for (var i = 1; i < rows.length; i++) {
            var cellData = rows[i].getAttribute('data-key');
            var cells = rows[i].getElementsByTagName('td');
            if (cells && cells.length > 0) {
                var cell = cells[0]; // Lấy ô đầu tiên chứa checkbox
                var checkboxInRow = cell.querySelector('input[type="checkbox"]');
                if (checkboxInRow && checkboxInRow.checked) {
                    arr.push(cellData);
                }
            }
        }
        return arr;
    }
    getDataByID(id) {
        var element = null;
        for (let i = 0; i < this.arrData.length; i++) {
            if (this.arrData[i][this.array[0].Keyid] == id) {
                element = this.data.Result[i]
                break
            }
        }
        return element;
    }
    getArrDataByID(id, columnCha, columnCon) {
        var element = null;
        var arr = [];

        for (let i = 0; i < this.arrData.length; i++) {
            if (this.arrData[i][this.array[0].Keyid] == id) {
                element = this.data.Result[i]
                break
            }
        }

        for (let i = 0; i < this.arrData.length; i++) {
            if (element[columnCha] == this.arrData[i][columnCha] && this.arrData[i][columnCon] != '00000000-0000-0000-0000-000000000000' && this.arrData[i][columnCon] != '') {
                arr.push(this.data.Result[i])
            }
        }

        return arr;
    }

}
function getColumnName(colIndex) {
    colIndex = colIndex + 1;
    let columnName = '';
    while (colIndex > 0) {
        const modulo = (colIndex - 1) % 26;
        columnName = String.fromCharCode(65 + modulo) + columnName;
        colIndex = Math.floor((colIndex - modulo) / 26);
    }
    return columnName;
}
function kiemtraformula(this_) {
    if ($(this_).attr('data-formula').toUpperCase()  != undefined && $(this_).attr('data-formula').toUpperCase() != '' && $(this_).attr('data-formula').toUpperCase() != 'undefined') {
        try {
            if ($(this_).attr('data-formula').toUpperCase() != 'UNDEFINED') {
                $(this_).value($(this_).attr('data-formula').toUpperCase());
            }
        } catch (e) {
            
        }
        colorformula($(this_).attr('data-formula').toUpperCase(), this_.dataset.td)
        $('.label-class-td').show();
    } else {
        $('.label-class-td').hide();
    }
}
function colorformula(formula, idTable_td) {
    var arr_formula = formula.split(/([\(\)\=\+\-\*\/])/);
    for (var i = 0; i < arr_formula.length; i++) {
        if (arr_formula[i] != "" && arr_formula[i] != "=") {
            if (arr_formula[i] != "+" && arr_formula[i] != "-" && arr_formula[i] != "*" && arr_formula[i] != "/" && arr_formula[i] != ")" && arr_formula[i] != "(") {
                $("." + idTable_td + arr_formula[i]).not(this).css("background-color", "#f2dcfa");
            }
        }
    }
}
function colorformula_onkeydown(this_) {
    var arr_formula = $(this_).value().toUpperCase().split(/([\(\)\=\+\-\*\/])/);
    for (var i = 0; i < arr_formula.length; i++) {
        if (arr_formula[i] != "" && arr_formula[i] != "=") {
            if (arr_formula[i] != "+" && arr_formula[i] != "-" && arr_formula[i] != "*" && arr_formula[i] != "/" && arr_formula[i] != ")" && arr_formula[i] != "(") {
                $("." + this_.dataset.td + arr_formula[i]).not(this).removeAttr("style");
            }
        }
    }
}
function colorformula_onkeyup(this_) {
    if ($(this_).value().includes('=')) {
        $('.label-class-td').show()
    } else {
        $('.label-class-td').hide()
    }
    var arr_formula = $(this_).value().toUpperCase().split(/([\(\)\=\+\-\*\/])/);
    for (var i = 0; i < arr_formula.length; i++) {
        if (arr_formula[i] != "" && arr_formula[i] != "=") {
            if (arr_formula[i] != "+" && arr_formula[i] != "-" && arr_formula[i] != "*" && arr_formula[i] != "/" && arr_formula[i] != ")" && arr_formula[i] != "(") {
                $("." + this_.dataset.td + arr_formula[i]).not(this).css("background-color", "#f2dcfa");
            }
        }
    }
}
$(document).on('focus', '.nts-td-input', function () {
    var this_ = this;
    if ($(this_).value() == '0')
        $(this_).value('')

});

$(document).on('blur', '.nts-td-input', function () {
    var this_ = this;
    $('.label-class-td').hide()
    colorformula_onkeydown(this_)
    if (this_.value.includes("=")) {
        $(this_).attr('data-formula', this_.value);
        var arr_formula = this_.value.replaceAll(",", ".").toUpperCase().split(/([\(\)\=\+\-\*\/])/);
        var Value = ""
        for (var i = 0; i < arr_formula.length; i++) {
            if (arr_formula[i] != "" && arr_formula[i] != "=") {
                if (!isNaN(arr_formula[i]) || arr_formula[i] == "+" || arr_formula[i] == "-" || arr_formula[i] == "*" || arr_formula[i] == "/" || arr_formula[i] == "(" || arr_formula[i] == ")") {
                    Value = Value + arr_formula[i];
                } else {
                    try {
                        Value = Value + (formatNumberJS($('.' + $(this_).attr('data-table') + arr_formula[i]).value()) == '' ? '0' : formatNumberJS($('.' + $(this_).attr('data-table') + arr_formula[i]).value()));
                        console.log('.' + $(this_).attr('data-table') + arr_formula[i]);
                    } catch (e) {
                        console.log('.' + $(this_).attr('data-table') + arr_formula[i]);
                        console.log(e);
                        NTS.dongthongbao();
                    }

                }
            }
        }
        if (kiemtraformula_DungSai(Value) == false) {
            $(this_).value('0');
            return false;
        }
        try {
            if (eval(Value) == Infinity) {
                $(this_).value('0')
            } else {
                $(this_).value(eval(Value).toFixed($(this_).attr("round")))// chổ này bị sai trường hợp có tính số lẻ
            }
        } catch {
            $(this_).value('0')
        }
    } else {
        $(this_).attr('data-formula', "")
    }
    if ($(this_).attr('data-groupsub') != "") {
        var sum = 0;
        $('#' + $(this_).parent().parent().parent().parent().attr('id') + ' .nts-table-td input[data-groupsub="' + $(this_).attr('data-groupsub') + '"]').each(function () {
            var inputValue = $(this).val();
            var inputValue = parseFloat(formatNumberJS($(this).val()));
            if (!isNaN(inputValue)) {
                sum += inputValue;
            }
        });
        $('#' + $(this_).parent().parent().parent().parent().attr('id') + ' .nts-table-td input[data-groupfather="' + $(this_).attr('data-groupsub') + '"]').value(sum);
    }
    var cellsWithC1Formula = $('#' + $(this).parent().parent().parent().parent().attr('id') + ' input[data-formula*="' + $(this).attr('data-key') + '"]');
    cellsWithC1Formula.each(function () {
        var this__ = this;

        colorformula_onkeydown(this__)
        if ($(this__).attr('data-formula').toUpperCase().includes("=")) {
            var arr_formula = $(this__).attr('data-formula').replaceAll(",", ".").toUpperCase().split(/([\(\)\=\+\-\*\/])/);
            var Value = ""

            for (var i = 0; i < arr_formula.length; i++) {
                if (arr_formula[i] != "" && arr_formula[i] != "=") {
                    if (!isNaN(arr_formula[i]) || arr_formula[i] == "+" || arr_formula[i] == "-" || arr_formula[i] == "*" || arr_formula[i] == "/" || arr_formula[i] == "(" || arr_formula[i] == ")") {
                        Value = Value + arr_formula[i]
                    } else {
                        try {
                            Value = Value + (formatNumberJS($('.' + $(this__).attr('data-table') + arr_formula[i]).value()) == '' ? '0' : formatNumberJS($('.' + $(this__).attr('data-table') + arr_formula[i]).value()))
                            console.log('.' + $(this__).attr('data-table') + arr_formula[i]);
                        } catch (e) {
                            console.log('.' + $(this__).attr('data-table') + arr_formula[i]);
                            console.log(e);
                            NTS.dongthongbao();
                        }
                    }
                }
            }
            if (kiemtraformula_DungSai(Value) == false) {
                $(this__).value('0');
                return false;
            }
            try {
                if (eval(Value) == Infinity) {
                    $(this__).value('0')
                } else {
                    $(this__).value(eval(Value).toFixed($(this__).attr("round"))) // chổ này bị sai trường hợp có tính số lẻ
                }
            } catch {
                $(this__).value('0')
            }
        } else {
        }
        try {

            if ($(this__).value() == '0') {
                return false;
            }
            var trElement = this__.closest('tr');
            var inputElements = trElement.querySelectorAll('input[data-colum]');
            var formula = []
            var formulaObject = {};
            inputElements.forEach(function (input) {
                var columnName = input.getAttribute('data-colum');
                var columnValue = $('.' + columnName + '_' + $(this__).attr('data-keyid')).attr('data-formula').toUpperCase() + ''.replace('undefined', "");
                formulaObject[columnName] = columnValue;
            });
            formula.push(formulaObject);
            const result = NTS.getAjax('/QuanLy/DungChung/Edite_TableNTS', {
                TenBang: $(this__).parent().parent().attr('data-tablename'),
                Cot: $(this__).attr('data-colum'),
                GiaTri: (!isNaN(($(this__).value()).replaceAll('.', '').replaceAll(',', '.')) ? ($(this__).value()).replaceAll('.', '').replaceAll(',', '.') : $(this__).value()),
                Json_CongThuc: JSON.stringify(formula),
                Key: $(this__).parent().parent().attr('data-colum-key'),
                ID: $(this__).attr('data-keyid')
            });
            if (!result.Err) {
            } else
                result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);



            window[$(this__).attr('onblur').replace('(this)', '')](this);
        } catch {

        }

        if ($(this__).attr('data-groupsub') != "") {
            var sum = 0;

            $('#' + $(this__).parent().parent().parent().parent().attr('id') + ' .nts-table-td input[data-groupsub="' + $(this__).attr('data-groupsub') + '"]').each(function () {
                var inputValue = $(this).val();
                var inputValue = parseFloat(formatNumberJS($(this).val()));
                if (!isNaN(inputValue)) {
                    sum += inputValue;
                }
            });
            $('#' + $(this__).parent().parent().parent().parent().attr('id') + ' .nts-table-td input[data-groupfather="' + $(this__).attr('data-groupsub') + '"]').value(sum);
        }

    });
    if ($(this_).value() == '0') {
        return false;
    }
    var trElement = this_.closest('tr');
    var inputElements = trElement.querySelectorAll('input[data-colum]');
    var formula = []
    var formulaObject = {};
    inputElements.forEach(function (input) {
        var columnName = input.getAttribute('data-colum');
        var columnValue = $('.' + columnName + '_' + $(this_).attr('data-keyid')).attr('data-formula').toUpperCase() + ''.replace('undefined', "");
        formulaObject[columnName] = columnValue;
    });
    formula.push(formulaObject);
    const result = NTS.getAjax('/QuanLy/DungChung/Edite_TableNTS', {
        TenBang: $(this_).parent().parent().attr('data-tablename'),
        Cot: $(this_).attr('data-colum'),
        //GiaTri: (!isNaN(($(this_).value()).replaceAll('.', '').replaceAll(',', '.')) ? ($(this_).value()).replaceAll('.', '').replaceAll(',', '.') : $(this_).value()),
        GiaTri: containsNonDigits($(this_).value()) ? $(this_).value() : formatNumberJS($(this_).value()),
        Json_CongThuc: JSON.stringify(formula),
        Key: $(this_).parent().parent().attr('data-colum-key'),
        ID: $(this_).attr('data-keyid')
    });
    if (!result.Err) {
    } else
        result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);

    if ($(this_).value() == '' && $(this_).hasClass('number-table-nts'))
        $(this_).value('0')

});
function setSum(this_) {
    try {
        if (stopsetSum == false) {
            if ($(this_).attr('data-groupsub') != "") {
                var sum = 0;
                $('#' + $(this_).parent().parent().parent().parent().attr('id') + ' .nts-table-td input[data-groupsub="' + $(this_).attr('data-groupsub') + '"]').each(function () {
                    var inputValue = $(this).val();
                    var inputValue = parseFloat(formatNumberJS($(this).val()));
                    if (!isNaN(inputValue)) {
                        sum += inputValue;
                    }
                });
                $('#' + $(this_).parent().parent().parent().parent().attr('id') + ' .nts-table-td input[data-groupfather="' + $(this_).attr('data-groupsub') + '"]').value(sum);
            }
            var trElement = this_.closest('tr');
            var inputElements = trElement.querySelectorAll('input[data-colum]');
            var formula = []
            var formulaObject = {};
            inputElements.forEach(function (input) {
                var columnName = input.getAttribute('data-colum');
                var columnValue = $('.' + columnName + '_' + $(this_).attr('data-keyid')).attr('data-formula').toUpperCase() + ''.replace('undefined', "");
                formulaObject[columnName] = columnValue;
            });
            formula.push(formulaObject);
            const result = NTS.getAjax('/QuanLy/DungChung/Edite_TableNTS', {
                TenBang: $(this_).parent().parent().attr('data-tablename'),
                Cot: $(this_).attr('data-colum'),
                //GiaTri: (!isNaN(($(this_).value()).replaceAll('.', '').replaceAll(',', '.')) ? ($(this_).value()).replaceAll('.', '').replaceAll(',', '.') : $(this_).value()),
                GiaTri: containsNonDigits($(this_).value()) ? $(this_).value() : formatNumberJS($(this_).value()),
                Json_CongThuc: JSON.stringify(formula),
                Key: $(this_).parent().parent().attr('data-colum-key'),
                ID: $(this_).attr('data-keyid')
            });
            if (!result.Err) {
            } else
                result.CanhBao ? NTS.canhbao(result.Msg) : NTS.loi(result.Msg);
        }


    }
    catch {

    }

}
function kiemtraformula_DungSai(expression) {
    try {
        eval(expression);
        return true;
    } catch (error) {
        return false;
    }
}
//$.contextMenu({
//    selector: '.context-menu-one',
//    callback: function (key, options) {
//        if (key == "indam") {
//            document.getElementById($(this).attr('id')).classList.toggle("bold-table-nts");
//            const result = NTS.getAjax('/QuanLy/DungChung/Format_TableNTS', {
//                TenBang: $(this).attr('data-tablename'),
//                Cot: 'InDam',
//                GiaTri: ($(this).attr('class').includes('bold-table-nts')? '1' :'0'),
//                Key: $(this).attr('data-colum-key'),
//                ID: $(this).attr('data-key')
//            });
//        }
//        else if (key == "innghieng") {
//            document.getElementById($(this).attr('id')).classList.toggle("italic-table-nts");
//            const result = NTS.getAjax('/QuanLy/DungChung/Format_TableNTS', {
//                TenBang: $(this).attr('data-tablename'),
//                Cot: 'InNghieng',
//                GiaTri: ($(this).attr('class').includes('italic-table-nts') ? '1' : '0'),
//                Key: $(this).attr('data-colum-key'),
//                ID: $(this).attr('data-key')
//            });
//        } else if (key == "gachchan") {
//            document.getElementById($(this).attr('id')).classList.toggle("decoration-table-nts");
//            const result = NTS.getAjax('/QuanLy/DungChung/Format_TableNTS', {
//                TenBang: $(this).attr('data-tablename'),
//                Cot: 'GachChan',
//                GiaTri: ($(this).attr('class').includes('decoration-table-nts') ? '1' : '0'),
//                Key: $(this).attr('data-colum-key'),
//                ID: $(this).attr('data-key')
//            });
//        }
//        else { }
//    },
//    items: {
//        "indam": { name: "In đậm", icon: "fa-bold" },
//        "innghieng": { name: "In nghiêng", icon: "fa-italic" },
//        "gachchan": { name: "Gạch chân", icon: "fa-underline" }
//    }
//});
//$('.context-menu-one').on('click', function (e) {

//})
function toggleGroupBy(selector) {
    var row = selector.closest("tr");
    var tagi = $(selector).find("i");
    var arr = [];

    var value = row.getAttribute("data-groupfather").toLowerCase();
    arr.push(value);
    var parentChildren = Array.from(row.parentNode.children);
    var positionCurrent = $(row).index();

    // đổi mũi tên
    //if ($(tagi).hasClass('fa-angle-double-down') && !$(tagi).hasClass('fa-angle-down')) {
    //    $(tagi).removeClass('fa-angle-double-down');
    //    $(tagi).addClass('fa-angle-double-right');
    //}
    //else if ($(tagi).hasClass('fa-angle-double-right') && !$(tagi).hasClass('fa-angle-down')) {
    //    $(tagi).removeClass('fa-angle-double-right');
    //    $(tagi).addClass('fa-angle-double-down');
    //}
    //else
    if ($(tagi).hasClass('fa-angle-down')) {
        $(tagi).removeClass('fa-angle-down');
        $(tagi).addClass('fa-angle-right');
    }
    else {
        $(tagi).removeClass('fa-angle-right');
        $(tagi).addClass('fa-angle-down');
    }

    parentChildren.forEach(function (element) {

        var rowContent = element.getAttribute("data-groupsub").toLowerCase();
        var valuefather = element.getAttribute("data-groupfather").toLowerCase();
        var position = $(element).index();

        // Kiểm tra group cha con để ẩn hiện
        if (arr.includes(rowContent) && !arr.includes(valuefather) && valuefather != '' && valuefather != undefined && position > positionCurrent)
            arr.push(valuefather);

        // Ẩn hiện dòng group
        if (arr.includes(rowContent) && row != element && position > positionCurrent) {
            if ($(tagi).hasClass('fa-angle-down')) {
                $(element).show();
                // set lại class khi sổ group
                try {
                    var classes = $(element).find("i").attr('class').replace('right', 'down');
                    $(element).find("i.nts").removeClass($(element).attr('class'))
                    $(element).find("i.nts").addClass(classes);
                } catch { }
            }
            else
                $(element).hide();
        }
    });

}
function toggleCheckboxes(this_) {
    var table = document.getElementById($(this_).parent().parent().parent().parent().parent().attr('id'));
    var rows = table.getElementsByTagName('tr');

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        if (cells && cells.length > 0) {
            var cell = cells[0]; // Lấy ô đầu tiên chứa checkbox
            var checkboxInRow = cell.querySelector('input[type="checkbox"]');
            if (checkboxInRow) {
                checkboxInRow.checked = this_.checked;
            }
        }
    }
}
function onchangeformula() {
    var cellsWithC1Formula = $('#table_Thu_SN_DV input[data-formula*="C1"]');
    cellsWithC1Formula.each(function () {

        var inputValue = $(this).attr('');

    });
}
//$(function () {
//    $(".nts-table").sortable({
//        items: "tr", // Chỉ sắp xếp các thẻ tr
//        cursor: "move", // Hình con trỏ khi kéo
//        opacity: 0.6, // Độ mờ khi kéo
//        update: function (event, ui) {
//            // Cập nhật thứ tự sau khi sắp xếp
//            var order = $(this).sortable("toArray");
//            $(this).find('tr').each(function (index, element) {
//                // Update data-index attribute with the new index
//                console.log($(this).attr('data-tablename'))
//                console.log($(this).attr('data-colum-key'))
//                console.log($(this).attr('data-key'))
//                $(element).attr('data-index', index);
//            });
//        }
//    });
//});

function searchTableNTS(id, selector) {

    var searchTerm = $(selector).val().toLowerCase();

    $('#' + id).find('tbody tr').each(function () {
        var row = $(this);
        var rowContent = row.text().toLowerCase();

        // Check if any input value within the row matches the search term
        var found = false;
        row.find('textarea').each(function () {
            if ($(this).val().toLowerCase().includes(searchTerm)) {
                found = true;
                return false; // Break out of the loop if a match is found
            }
        });

        // Show or hide the row based on the search result
        if (found || rowContent.includes(searchTerm)) {
            row.show();
        } else {
            row.hide();
        }
    });
}