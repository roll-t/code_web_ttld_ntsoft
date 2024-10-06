function QuyenThem() {
    if (ntspermiss.them) {
        return true;
    }
    NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác thêm mới. Vui lòng kiểm tra lại.");
    return false;
}
function QuyenSua() {
    if (ntspermiss.sua) {
        return true;
    }
    NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác chỉnh sửa. Vui lòng kiểm tra lại.");
    return false;
}
function QuyenXoa() {
    if (ntspermiss.xoa) {
        return true;
    }
    NTS.canhbao("User bạn đang sử dụng không thể thực hiện thao tác xóa. Vui lòng kiểm tra lại.");
    return false;
}

$(function () {
    if (document.getElementById("btnThemMoi")) {
        if (!ntspermiss.them) {
            $("#btnThemMoi").addClass("not-allowed")
            $("#btnThemMoi").prop('disabled', true);
        }
    }
});

function checkMacDinhSD(selector, tenBang, tenCot) {
    $(document).on('change', selector, function () {
        var inp = $(this);
        var id = $(this).attr('data');
        $.confirm({
            title: '<span style="font-size:20px" class="text-dark">Cảnh báo!</span>',
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
                        var result = NTS.getAjax('/DanhMuc/DungChung/LuuMacDinhSD', { ID: id, strCotID: tenCot, strBang: tenBang, value: inp.prop('checked') });
                        if (!result.Err) {
                            LoadDataTable();
                            NTS.thanhcong(result.Msg);
                        }
                        else {
                            NTS.loi(result.Msg);
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

function checkDangSD(selector, tenBang, tenCot) {
    $(document).on('change', selector, function () {
        var inp = $(this);
        var id = $(this).attr('data');
        if (!QuyenSua()) {
            inp.prop('checked', !inp.prop('checked'));
            return false;
        }
        var Width = window.innerWidth;
        $.confirm({
            title: '<span style="font-size:18px" class="text-warning">Cảnh báo cập nhật dữ liệu!</span>',
            type: 'orange',
            icon: 'fa fa-question-circle',
            typeAnimated: true,
            theme: 'material',
            columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
            content: NTS.CauCanhBaoDangSDV2,
            buttons: {
                confirm: {
                    text: '<i class="fa fa-check"></i> Có',
                    btnClass: 'btn-outline-primary',
                    keys: ['enter'],
                    action: function () {
                        var result = NTS.getAjax('/DanhMuc/DungChung/LuuDangSD', { ID: id, strCotID: tenCot, strBang: tenBang, value: inp.prop('checked') });
                        if (!result.Err) {
                            NTS.thanhcong(result.Msg);
                        }
                        else {
                            NTS.loi(result.Msg);
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

function thayDoiCheckbox(selector, tenBang, tenCot, thayDoi) {
    $(document).on('change', selector, function () {
        var inp = $(this);
        var id = $(this).attr('data');
        if (!QuyenSua()) {
            inp.prop('checked', !inp.prop('checked'));
            return false;
        }
        var Width = window.innerWidth;
        $.confirm({
            title: '<span style="font-size:18px" class="text-warning">Cảnh báo cập nhật dữ liệu!</span>',
            type: 'orange',
            icon: 'fa fa-question-circle',
            typeAnimated: true,
            theme: 'material',
            columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
            content: NTS.CauCanhBaoDangSDV2,
            buttons: {
                confirm: {
                    text: '<i class="fa fa-check"></i> Có',
                    btnClass: 'btn-outline-primary',
                    keys: ['enter'],
                    action: function () {
                        var result = NTS.getAjax('/DanhMuc/DungChung/LuuCheckbox', { ID: id, strCotID: tenCot, strBang: tenBang, cotthaydoi: thayDoi, value: inp.prop('checked') });
                        if (!result.Err) {
                            NTS.thanhcong(result.Msg);
                        }
                        else {
                            NTS.loi(result.Msg);
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


function thayDoiHienThi(selector, tenBang, tenCot, thayDoi) {
    $(document).on('change', selector, function () {
        var inp = $(this);
        var id = $(this).attr('data');
        if (!QuyenSua()) {
            inp.prop('checked', !inp.prop('checked'));
            return false;
        }
        var Width = window.innerWidth;
        $.confirm({
            title: '<span style="font-size:18px" class="text-warning">Cảnh báo cập nhật dữ liệu!</span>',
            type: 'orange',
            icon: 'fa fa-question-circle',
            typeAnimated: true,
            theme: 'material',
            columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
            content: NTS.CauCanhBaoDangSDV2,
            buttons: {
                confirm: {
                    text: '<i class="fa fa-check"></i> Có',
                    btnClass: 'btn-outline-primary',
                    keys: ['enter'],
                    action: function () {
                        var result = NTS.getAjax('/DanhMuc/DungChung/LuuCheckbox', { ID: id, strCotID: tenCot, strBang: tenBang, cotthaydoi: thayDoi, value: inp.prop('checked') });
                        if (!result.Err) {
                            NTS.thanhcong(result.Msg);
                        }
                        else {
                            NTS.loi(result.Msg);
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

function checkDangSD3(selector, tenBang, tenCot, id) {
    $(document).on('change', selector, function () {
        var inp = $(this);
        if (!QuyenSua()) {
            inp.prop('checked', !inp.prop('checked'));
            return false;
        }
        $.confirm({
            title: '<span style="font-size:20px" class="text-dark">Cảnh báo!</span>',
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
                        var result = NTS.getAjax('/DanhMuc/DungChung/LuuDangSD', { ID: id, strCotID: tenCot, strBang: tenBang, value: inp.prop('checked') });
                        if (!result.Err) {
                            NTS.thanhcong(result.Msg);
                        }
                        else {
                            NTS.loi(result.Msg);
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

function checkDangSD_CallBack(selector, tenBang, tenCot, callback) {
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
                        var result = NTS.getAjax('/DanhMuc/MucTieuMuc/LuuDangSD', { ID: id, strCotID: tenCot, strBang: tenBang, value: inp.prop('checked') });
                        if (!result.Err) {
                            callback();
                            NTS.thanhcong(result.Msg);
                        }
                        else {
                            NTS.loi(result.Msg);
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

function checkDangSD2(selector, tenBang, tenCot) {
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
                        var result = NTS.getAjax('/DanhMuc/DungChung/LuuCotDangSD', { ID: id, strCotID: tenCot, strBang: tenBang, value: inp.prop('checked') });
                        if (!result.Err) {
                            NTS.thanhcong(result.Msg);
                        }
                        else {
                            NTS.loi(result.Msg);
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

function CanhBaoNop(DongY, Huy) {
    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-5 col-md-offset-3 w-max-400px',
        content: NTS.CauThongBaoNop,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}
function CanhBaoThuHoiNop(DongY, Huy) {
    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-5 col-md-offset-3 w-max-400px',
        content: NTS.CauThongBaoThuHoiNop,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}

function CanhBaoXoa(DongY, Huy) {
    var Width = window.innerWidth;

    $.confirm({
        title: '<span style="font-size:18px" class="text-danger">Cảnh báo xóa dữ liệu!</span>',
        type: 'red',
        icon: 'fa fa-trash',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-'+(Width > 1500 ? '5' : '6')+' col-md-offset-3 w-max-500px',
        content: NTS.CauThongBaoXoa,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-outline-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}

function CanhBaoBoThuHoi(DongY, Huy) {
    var Width = window.innerWidth;

    $.confirm({
        title: '<span style="font-size:18px" class="text-danger">Cảnh báo bỏ thu hồi dữ liệu!</span>',
        type: 'red',
        icon: 'fa fa-trash',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
        content: NTS.CauThongBaoBoThuHoi,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-outline-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}

function XacNhanDuyet(DongY, Huy) {
    var Width = window.innerWidth;

    $.confirm({
        title: '<span style="font-size:18px" class="text-danger">Xác nhận xét duyệt dữ liệu!</span>',
        type: 'red',
        icon: 'fa fa-trash',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
        content: NTS.CauThongXetDuyet,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-outline-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}

function CanhBaoThayDoiTTToChuc(DongY, Huy) {
    var Width = window.innerWidth;

    $.confirm({
        title: '<span style="font-size:18px" class="text-danger">Cảnh báo dữ liệu thay đổi!</span>',
        type: 'red',
        icon: 'fa fa-trash',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
        content: NTS.CauThongBaoTrungTTToChuc,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-outline-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}

function CanhBaoThayDoiTTDoiTuongNN(DongY, Huy) {
    var Width = window.innerWidth;

    $.confirm({
        title: '<span style="font-size:18px" class="text-danger">Cảnh báo dữ liệu thay đổi!</span>',
        type: 'red',
        icon: 'fa fa-trash',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
        content: NTS.CauThongBaoTrungTTDoiTuongNN,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-outline-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}

function CanhBaoThayDoiTTDoiTuongNNvaToChu(DongY, Huy) {
    var Width = window.innerWidth;

    $.confirm({
        title: '<span style="font-size:18px" class="text-danger">Cảnh báo dữ liệu thay đổi!</span>',
        type: 'red',
        icon: 'fa fa-trash',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
        content: NTS.CauThongBaoTrungTTDoiTuongNNvaToChuc,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-outline-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}



function CanhDoiMauThuyetMinh(DongY, Huy) {
    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-5 col-md-offset-3 w-max-400px',
        content: "<p class=\"mb-1\">Sau khi đổi mẫu thuyết minh hệ thống sẽ xóa dữ liệu mẫu thuyết minh đang nhập hiện tại. Bạn có đồng ý tiếp tục thực hiện thao tác không?</p><p class=\"mb-1\"> - Đồng ý chọn <b>'Có'</b></p><p class=\"mb-1\">- Không đồng ý chọn <b>'Không'</b></p>",
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}
function CanhBaoLamMoiBaoCao(DongY, Huy) {
    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-5 col-md-offset-3 w-max-400px',
        content: NTS.CauThongLamMoi,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}
function CanhBaoLayNhuCau(DongY, Huy) {
    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-5 col-md-offset-3 w-max-400px',
        content: "<p class=\"mb-1\">Bạn có thật sự muốn lấy số nhu cầu của đơn vị làm số kiểm tra không?</p><p class=\"mb-1\"> - Đồng ý xóa chọn <b>'Có'</b></p><p class=\"mb-1\">- Không đồng ý chọn <b>'Không'</b></p>",
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}

function CanhBaoTongHop(DongY, Huy) {
    
    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-5 col-md-offset-3 w-max-400px',
        content: NTS.CauThongTongHop,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}


function CanhBaoTongHop_KhongThayDoi(DongY, Huy) {

    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-5 col-md-offset-3 w-max-400px',
        content: NTS.CauThongTongHop_KhongThayDoi,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}
function CanhBaoTongHop_ThayDoi(DongY, Huy) {

    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-5 col-md-offset-3 w-max-400px',
        content: NTS.CauThongTongHop_ThayDoi,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}

function CanhBaoXoaNhieuDong(Xoa1Dong, XoaNhieuDong, Huy) {
    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-7 col-md-offset-3 w-max-700px',
        content: "<p>Bạn có thật sự muốn xóa dòng dữ liệu không? <br/>- Xóa 1 dòng đang chọn chọn <b>'Xóa dòng chọn'</b><br/>- Xóa tất cả các dòng đang chọn chọn <b>'Xóa các dòng đang chọn'</b><br/>- Không đồng ý chọn <b>'Không'</b>",
        buttons: {
            confirm: {
                text: '<i class="fa fa-trash"></i> Xóa dòng chọn',
                btnClass: 'btn-blue',
                keys: ['enter'],
                action: Xoa1Dong
            },
            confirm2: {
                text: '<i class="fa fa-check"></i> Xóa các dòng đang chọn',
                btnClass: 'btn-warning',
                keys: ['enter', 'shift'],
                action: XoaNhieuDong
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-red',
                keys: ['esc', 'space'],
                action: Huy
            }
        }
    });
}

function CanhBaoXoaNhieuDongUser(Xoa1Dong, XoaNhieuDong, Huy) {
    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-7 col-md-offset-3 w-max-700px',
        content: "<p>Bạn có thật sự muốn xóa dòng dữ liệu không? <br/>- Xóa 1 dòng đang chọn chọn <b>'Xóa dòng chọn'</b><br/>- Xóa tất cả chọn <b>'Xóa tất cả'</b><br/>- Không đồng ý chọn <b>'Không'</b>",
        buttons: {
            confirm: {
                text: '<i class="fa fa-trash"></i> Xóa dòng chọn',
                btnClass: 'btn-blue',
                keys: ['enter'],
                action: Xoa1Dong
            },
            confirm2: {
                text: '<i class="fa fa-check"></i> Xóa tất cả',
                btnClass: 'btn-warning',
                keys: ['enter', 'shift'],
                action: XoaNhieuDong
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-red',
                keys: ['esc', 'space'],
                action: Huy
            }
        }
    });
}

function CanhBaoXoaTatCa(Xoa1Dong, XoaNhieuDong, Huy) {
    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-7 col-md-offset-3 w-max-700px',
        content: "<p>Bạn có thật sự muốn xóa dòng dữ liệu không? <br/>- Xóa 1 dòng đang chọn chọn <b>'Xóa dòng chọn'</b><br/>- Xóa tất cả các dòng chọn <b>'Xóa tất cả'</b><br/>- Không đồng ý chọn <b>'Không'</b>",
        buttons: {
            confirm: {
                text: '<i class="fa fa-trash"></i> Xóa dòng chọn',
                btnClass: 'btn-blue',
                keys: ['enter'],
                action: Xoa1Dong
            },
            confirm2: {
                text: '<i class="fa fa-check"></i> Xóa tất cả',
                btnClass: 'btn-warning',
                keys: ['enter', 'shift'],
                action: XoaNhieuDong
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-red',
                keys: ['esc', 'space'],
                action: Huy
            }
        }
    });
}

function CanhBaoXoaNhieuDongCustom(content, Xoa1Dong, XoaNhieuDong, Huy) {
    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-7 col-md-offset-3 w-max-700px',
        content: content,
        buttons: {
            confirm: {
                text: '<i class="fa fa-trash"></i> Xóa dòng chọn',
                btnClass: 'btn-blue',
                keys: ['enter'],
                action: Xoa1Dong
            },
            confirm2: {
                text: '<i class="fa fa-check"></i> Xóa các dòng đang chọn',
                btnClass: 'btn-warning',
                keys: ['enter', 'shift'],
                action: XoaNhieuDong
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-red',
                keys: ['esc', 'space'],
                action: Huy
            }
        }
    });
}

function ThongBaoXuLyNhieuDong(content, MotDong, NhieuDong, text, Huy) {
    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-8 col-md-offset-3 w-max-800px',
        content: content,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> '+text[0],
                btnClass: 'btn-blue',
                keys: ['enter'],
                action: MotDong
            },
            confirm2: {
                text: '<i style="vertical-align: middle; font-size: 20px;" class="bx bx-check-double"></i> '+text[1],
                btnClass: 'btn-warning',
                keys: ['enter', 'shift'],
                action: NhieuDong
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-red',
                keys: ['esc', 'space'],
                action: Huy
            }
        }
    });
}
function ThongBaoXuLyNhieuDongv2(col,content, MotDong, NhieuDong, text, Huy) {
    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-'+col+' col-md-offset-3 w-max-800px',
        content: content,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> ' + text[0],
                btnClass: 'btn-blue',
                keys: ['enter'],
                action: MotDong
            },
            confirm2: {
                text: '<i style="vertical-align: middle; font-size: 20px;" class="bx bx-check-double"></i> ' + text[1],
                btnClass: 'btn-warning',
                keys: ['enter', 'shift'],
                action: NhieuDong
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-red',
                keys: ['esc', 'space'],
                action: Huy
            }
        }
    });
}
function CanhBaoDuLieuDangSD(result_ktxoa) {
    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-5 col-md-offset-3 w-max-400px',
        content: "Dữ liệu này đang được sử dụng. Không thể xoá, danh sách kèm theo:<br><table>" + result_ktxoa + "</table>",
        buttons: {
            cancel: {
                text: '<i class="fa fa-close"></i> Đóng',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc','space'],
            }
        }
    });
}

function CanhBaoXoaDinhKem(DongY, Huy) {
    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-5 col-md-offset-3 w-max-400px',
        content: NTS.CauThongBaoXoaDinhKem,
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}
function ThongBaoThuyetMinh(content, MauMD, Mau, Huy) {
    $.confirm({
        title: '<span class="text-dark" style="font-size:20px">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-warning',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-7 col-md-offset-3 w-max-700px',
        content: content,
        buttons: {
            confirm: {
                text: '<i class="fa fa-newspaper-o"></i> Chọn mẫu mặc định',
                btnClass: 'btn-blue',
                keys: ['enter'],
                action: MauMD
            },
            confirm2: {
                text: '<i class="fa fa-newspaper-o"></i> Đổi mẫu thuyết minh',
                btnClass: 'btn-warning',
                keys: ['enter', 'shift'],
                action: Mau
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-red',
                keys: ['esc', 'space'],
                action: Huy
            }
        }
    });
}
function resetForm(selector) {
    $(selector).find('input:not([type="radio"]), textarea, select').each(function () {
        $(this).value('');
    });
    focusInput(selector);
    
}
function UpdateLabelDangSD(selector) {
    if (!QuyenThem()) {
        return false;
    }
    if (!QuyenSua()) {
        return false;
    }
    if (!QuyenXoa()) {
        return false;
    }
    UpdateLabel(selector, 'Đang sử dụng', 'Ngưng sử dụng');
}
function UpdateLabelConHieuLuc(selector) {
    if (!QuyenThem()) {
        return false;
    }
    if (!QuyenSua()) {
        return false;
    }
    if (!QuyenXoa()) {
        return false;
    }
    UpdateLabel(selector, 'Còn hiệu lực', 'Hết hiệu lực');
}
function UpdateLabelDangCongTac(selector) {
    if (!QuyenThem()) {
        return false;
    }
    if (!QuyenSua()) {
        return false;
    }
    if (!QuyenXoa()) {
        return false;
    }
    UpdateLabel(selector, 'Đang công tác', 'Ngừng công tác');
}
function UpdateLabelDangThucHien(selector) {
    if (!QuyenThem()) {
        return false;
    }
    if (!QuyenSua()) {
        return false;
    }
    if (!QuyenXoa()) {
        return false;
    }
    UpdateLabel(selector, 'Hoàn thành', 'Đang thực hiện');
}
function UpdateLabelBanHanh(selector) {
    if (!QuyenThem()) {
        return false;
    }
    if (!QuyenSua()) {
        return false;
    }
    if (!QuyenXoa()) {
        return false;
    }
    UpdateLabel(selector, 'Đã ban hành', 'Chưa ban hành');
}

function UpdateLabel(selector, text1, text2) {
    let _switch = $(selector);
    $("label[for='" + _switch.prop('id') + "']").html(_switch.prop('checked') ? text1 : text2);
}

function UpdateLabelDangSD3(selector, textcheck, textuncheck) {
    let _switch = $(selector);
    $("label[for='" + _switch.prop('id') + "']").html(_switch.prop('checked') ? textcheck :  textuncheck);
}

function formaterMacDinhSD(value, ID) {
    return `<div class="form-check d-flex justify-content-center align-items-center"><input data='${ID}' class="form-check-input checkMacDinhSD" type="checkbox" value="" ` + (value ? 'checked' : '' ) + `></div>`;
}

function formaterDangSD(value, ID) {
    return ` <div class="form-group">
                <label class="form-check form-switch">
                    <input class="form-check-input checkDangSD" type="checkbox" data='${ID}' id="customCheckbox1${ID}" ` + (value ? 'checked' : '') + `>
                    <label class="form-check-label" for="customCheckbox1${ID}"></label>
                </label>
                
            </div>`;
}

function formaterbtnThaoTac(ID) {
    return `<div class="show-or-hide"><a class='text-primary btnSuaGrid1' title="Sửa" data='${ID}'><i class="fa fa-pencil"></i></a></b>&ensp;<a class='text-danger btnXoaGrid1' title="Xoá" data='${ID}'><i class='fa fa-trash-o'></i></a></div>`;
};

function formaterbtnThaoTacXoa(ID, btnXoaGrid1) {
    return `<div class="show-or-hide"><a class='text-danger ${btnXoaGrid1}' title="Xoá" data='${ID}'><i class='fa fa-trash-o'></i></a></div>`;
};

function formaterbtnThaoTacXem(ID, btnXemGrid) {
    return `<div class="show-or-hide"><a class='text-success ${btnXemGrid}' title="Xem" data='${ID}'><i class='fa fa-eye'></i></a></div>`;
};

function formaterbtnThaoTac3(ID, btnSuaGrid1, btnXoaGrid1) {
    return `<div class="show-or-hide"><a class='text-primary ${btnSuaGrid1}' title="Sửa" data='${ID}'><i class='fa fa-pencil'></i></a></b>&ensp;<a class='text-danger ${btnXoaGrid1}' title="Xoá" data='${ID}'><i class='fa fa-trash-o'></i></a></div>`;
};

function formatterPrintMacDinhSD(cell) {
    return `<div class="d-flex justify-content-center align-items-center"><input type="checkbox" ` + (cell.getValue() ? 'checked' : '') + `/></div>`;
};
function formatterPrintDangSD(cell) {
    return `<div class="d-flex justify-content-center align-items-center"><input type="checkbox" ` + (cell.getValue() ? 'checked' : '') + `/></div>`;
};
function formaterbtnXemDinhKem(ID, loai) {
    return `<div><button class='btn btn-sm btn-success text-xemdinhkem' title="Xem đính kèm" data='${ID}' onclick="XemDinhKem('${loai}','${ID}');return false;"><i class='fa fa-paperclip'></i>&ensp;Xem đính kèm</button></div>`;
};

function focusInput(selector) {
    $(selector + " :input:visible:enabled:first").focus();
}

function showMsg(ExecPremiss) {
    if (typeof ExecPremiss == 'object' && ExecPremiss.Msg != '') {
        ExecPremiss.CanhBao ? NTS.canhbao(ExecPremiss.Msg) : NTS.loi(ExecPremiss.Msg);
    }
}

function AnHienMenu(an) {
    if (an) {
        $('aside.navbar').hide();
        $('.page-wrapper').css('margin-left', '0px');
        $('header.navbar').css('margin-left', '0px');
    } else {
        $('aside.navbar').show();
        $('.page-wrapper').css('margin-left','15rem');
        $('header.navbar').css('margin-left','15rem');
    }
    //an ? $('#layout-menu').hide() : $('#layout-menu').show();
}

function checkLaNoiBat(selector, tenBang, tenCot) {
    $(document).on('change', selector, function () {
        var inp = $(this);
        var id = $(this).attr('data');
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
                        var result = NTS.getAjax('/DanhMuc/DungChung/LuuNoiBat', { ID: id, strCotID: tenCot, strBang: tenBang, value: inp.prop('checked') });
                        
                        if (!result.Err) {
                            NTS.thanhcong(result.Msg);
                        }
                        else {
                            NTS.loi(result.Msg);

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

function formaterLaNoiBat(value, ID) {
    return `<div class="form-check form-switch d-flex justify-content-center align-items-center"><input data='${ID}' class="form-check-input float-start checkLaNoiBat" type="checkbox" ` + (value ? 'checked' : '') + `/></div>`;
}

function checkHienThiHDSD(selector, tenBang, tenCot) {

    $(document).on('change', selector, function () {
        var inp = $(this);
        var id = $(this).attr('data');
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
                        var result = NTS.getAjax('/DanhMuc/DungChung/LuuHuongDanSuDung', { ID: id, strCotID: tenCot, strBang: tenBang, value: inp.prop('checked') });
                        
                        if (!result.Err) {
                            NTS.thanhcong(result.Msg);
                        }
                        else {
                            NTS.loi(result.Msg);

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
function formaterHienThiHDSD(value, ID) {
    return `<div class="form-check form-switch d-flex justify-content-center align-items-center"><input data='${ID}' class="form-check-input float-start checkHienThiHDSD" type="checkbox" ` + (value ? 'checked' : '') + `/></div>`;

}
$('.modal').each(function (index) {
    $(this).find('select').attr('data-dropdown-parent', '#' + $(this).attr('id') + ' .modal-body')
});
$(document).on('select2:open', function() {
    try {
        setTimeout(function () {
            document.querySelector('.select2-search__field').focus();
        })
    } catch (e) {

    }
});

//hàm load combo địa bàn theo đơn vị đăng nhập và có phân quyền theo nhóm người dùng
function PhanQuyenComBoDiaBan(TinhID_id, HuyenID_id, XaID_id, ThonID_id) {
    var TinhID_PhanQuyen = "";
    var HuyenID_PhanQuyen = "";
    var XaID_PhanQuyen = "";
    var ThonID_PhanQuyen = "";
    const donvi = NTS.getAjax('/DanhMuc/DungChung/GetDataThietLapDonVi', {});
    if (!donvi.Err && donvi != null) {
        let data = donvi[0];
        if (data.DiaBanHCID_Tinh != "") {
            TinhID_PhanQuyen = data.DiaBanHCID_Tinh;
            HuyenID_PhanQuyen = data.DiaBanHCID_Huyen;
            XaID_PhanQuyen = data.DiaBanHCID_Xa;
            ThonID_PhanQuyen = data.DiaBanHCID_Thon;
        } else {
            const donviThaoTac = NTS.getAjax('/DanhMuc/DungChung/GetThongTinDonViThaoTac', {});
            if (!donviThaoTac.Err && donviThaoTac.Result != null) {
                let data = donviThaoTac.Result[0];
                TinhID_PhanQuyen = data.DiaBanHCID_Tinh;
                HuyenID_PhanQuyen = data.DiaBanHCID_Huyen;
                XaID_PhanQuyen = data.DiaBanHCID_Xa;
                ThonID_PhanQuyen = data.DiaBanHCID_Thon;
            }
        }
    } else {
        const donviThaoTac = NTS.getAjax('/DanhMuc/DungChung/GetThongTinDonViThaoTac', {});
        if (!donviThaoTac.Err && donviThaoTac.Result != null) {
            let data = donviThaoTac.Result[0];
            TinhID_PhanQuyen = data.DiaBanHCID_Tinh;
            HuyenID_PhanQuyen = data.DiaBanHCID_Huyen;
            XaID_PhanQuyen = data.DiaBanHCID_Xa;
            ThonID_PhanQuyen = data.DiaBanHCID_Thon;
        }
    }
    $('#' + TinhID_id).value(TinhID_PhanQuyen)
    const NhomNguoiDung = NTS.getAjax("/DanhMuc/DungChung/GetNhomNguoiDung", {});
    if (parseInt(NhomNguoiDung) > 1) {
        $('#' + TinhID_id).prop('disabled', true)
    }
    if (NhomNguoiDung == "2") {
        setTimeout(function () {
            $('#' + HuyenID_id).value(HuyenID_PhanQuyen)
            $('#' + HuyenID_id).prop('disabled', true)
        }, 10)
    } else if (NhomNguoiDung == "3") {
        setTimeout(function () {
            $('#' + HuyenID_id).value(HuyenID_PhanQuyen)
            $('#' + HuyenID_id).prop('disabled', true)
        }, 10)
        setTimeout(function () {
            $('#' + XaID_id).value(XaID_PhanQuyen)
            $('#' + XaID_id).prop('disabled', true)
        }, 20)
    } else if (NhomNguoiDung == "4") {
        setTimeout(function () {
            $('#' + HuyenID_id).value(HuyenID_PhanQuyen)
            $('#' + HuyenID_id).prop('disabled', true)
        }, 10)
        setTimeout(function () {
            $('#' + XaID_id).value(XaID_PhanQuyen)
            $('#' + XaID_id).prop('disabled', true)
        }, 20)
        setTimeout(function () {
            if (ThonID_id != "") {
                $('#' + ThonID_id).value(ThonID_PhanQuyen)
                $('#' + ThonID_id).prop('disabled', true)
            }
        }, 30)
    }
}


function PhanQuyenComBoDiaBanKhongDisable(TinhID_id, HuyenID_id, XaID_id, ThonID_id) {
    var TinhID_PhanQuyen = "";
    var HuyenID_PhanQuyen = "";
    var XaID_PhanQuyen = "";
    var ThonID_PhanQuyen = "";
    
    const donvi = NTS.getAjax('/DanhMuc/DungChung/GetDataThietLapDonVi', {});
    if (!donvi.Err && donvi.Result != null) {
        let data = donvi.Result[0];
        if (data.TinhID != "") {
            TinhID_PhanQuyen = data.TinhID;
            HuyenID_PhanQuyen = data.HuyenID;
            XaID_PhanQuyen = data.XaID;
            ThonID_PhanQuyen = data.ThonID;
        } else {
            const donviThaoTac = NTS.getAjax('/DanhMuc/DungChung/GetThongTinDonViThaoTac', {});
            if (!donviThaoTac.Err && donviThaoTac.Result != null) {
                let data = donviThaoTac.Result[0];
                TinhID_PhanQuyen = data.TinhID;
                HuyenID_PhanQuyen = data.HuyenID;
                XaID_PhanQuyen = data.XaID;
                ThonID_PhanQuyen = data.ThonID;
            }
        }
    } else {
        const donviThaoTac = NTS.getAjax('/DanhMuc/DungChung/GetThongTinDonViThaoTac', {});
        if (!donviThaoTac.Err && donviThaoTac.Result != null) {
            let data = donviThaoTac.Result[0];
            TinhID_PhanQuyen = data.TinhID;
            HuyenID_PhanQuyen = data.HuyenID;
            XaID_PhanQuyen = data.XaID;
            ThonID_PhanQuyen = data.ThonID;
        }
    }
    $('#' + TinhID_id).value(TinhID_PhanQuyen)
    const NhomNguoiDung = NTS.getAjax("/DanhMuc/DungChung/GetNhomNguoiDung", {});
    if (parseInt(NhomNguoiDung) > 1) {
    /*    $('#' + TinhID_id).prop('disabled', true)*/
    }
    if (NhomNguoiDung == "2") {
        setTimeout(function () {
            $('#' + HuyenID_id).value(HuyenID_PhanQuyen)
       /*     $('#' + HuyenID_id).prop('disabled', true)*/
        }, 10)
    } else if (NhomNguoiDung == "3") {
        setTimeout(function () {
            $('#' + HuyenID_id).value(HuyenID_PhanQuyen)
       /*     $('#' + HuyenID_id).prop('disabled', true)*/
        }, 10)
        setTimeout(function () {
            $('#' + XaID_id).value(XaID_PhanQuyen)
        /*    $('#' + XaID_id).prop('disabled', true)*/
        }, 20)
    } else if (NhomNguoiDung == "4") {
        setTimeout(function () {
            $('#' + HuyenID_id).value(HuyenID_PhanQuyen)
       /*     $('#' + HuyenID_id).prop('disabled', true)*/
        }, 10)
        setTimeout(function () {
            $('#' + XaID_id).value(XaID_PhanQuyen)
/*            $('#' + XaID_id).prop('disabled', true)*/
        }, 20)
        setTimeout(function () {
            if (ThonID_id != "") {
                $('#' + ThonID_id).value(ThonID_PhanQuyen)
           /*     $('#' + ThonID_id).prop('disabled', true)*/
            }
        }, 30)
    }
}


function dinhDangSoLuoi(cell, formatterParams, onRendered) {
    var value = cell.getValue();//( dieukien ) ? ( đúng ) : ( sai );
    if (value != null) {
        if (value.toString().split(".").length > 1) {
            var formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").replaceAll('.', ',');
        } else {
            var formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        return formattedValue.split(',')[0];
    } else {
        return "";
    }
}


//giải mã
async function GiaiMaHoaDuLieu(ID) {
    var result = await NTS.getAjaxAsync("/DanhMuc/DungChung/Decrypt", { id: ID });
    if (result.length > 0) {
        return result;
    } else {
        return ID;
    }
}

function MaHoaDuLieu(ID) {
    var result = NTS.getAjax("/DanhMuc/DungChung/Encrypt", { id: ID });
    if (result.length > 0) {
        return result;
    } else {
        return ID;
    }
}
function KiemTraToKhai() {
    //Kiểm tra đường dẫn
    if (window.location.href.replaceAll("#", "").indexOf("?id=") == -1) {
        //Đang thêm mới
        return '0';
    } else {
        //Đang cập nhật
        var url = window.location.href.replaceAll("#", "");
        var id = url.substr(url.indexOf('?id=') + 4, url.length);
        return id;
    }
}
function HienThiTieuDeToKhaiBTXH() {
    if (window.location.href.replaceAll("#", "").indexOf("?id=") == -1) {
        var url = window.location.href.replaceAll("#", "");
        var duongDan = "/" + url.split("/")[3] + "/" + url.split("/")[4];
        var result = NTS.getAjax("/DanhMuc/DungChung/GetTenToKhaiMau", { duongDan: duongDan });
        if (result.Result.length > 0) {
            return result.Result[0].TenToKhaiMau;
        } else {
            return "";
        }
       
    } else {
        var url = window.location.href.replaceAll("#", "").split("?id=")[0];
        var duongDan = "/" + url.split("/")[3] + "/" + url.split("/")[4]
        var result = NTS.getAjax("/DanhMuc/DungChung/GetTenToKhaiMau", { duongDan: duongDan });
        if (result.Result.length > 0) {
            return result.Result[0].TenToKhaiMau;
        } else {
            return "";
        }
    }
}
function LoadComboBoxMacDinhSD(SelectID, TenBang, TenCotLayDuLieu) {
    try {
        const result = NTS.getAjax("/DanhMuc/DungChung/LoadComboMacDinhSD", { TenBang: TenBang }).Result[0][TenCotLayDuLieu];
        if (result != '') {
            $(SelectID).value(result);
        }
    } catch (e) {

    }    
}

function veHtmlDoanMa(selector, arr) {
    //var arrDoanMa = ["Mã quỹ", "Mã tài khoản kinh tế", "Mã nội dung kinh tế", "Mã cấp ngân sách", "Mã quan hệ ngân sách", "Mã địa bàn hành chính",
    //    "Mã chương", "Mã ngành kinh tế", "Mã chương trình mục tiêu", "Mã kho bạc nhà nước", "Mã nguồn ngân sách nhà nước", "Mã dự phòng"];
    var arrDoanMaKey = ["MaQuy_key", "MaTaiKhoanKT_key", "MaNoiDungKT_key", "MaCapNS_key", "MaQHNS_key", "MaDiaBanHC_key",
        "MaChuong_key", "MaNganhKT_key", "MaNganhKT_key", "MaKBNN_key", "MaNguonNSNN_key", "MaDuPhong_key"];
    var html = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].split(":")[1].trim() != '' && arr[i].split(":")[1].trim() != undefined)
            html += (`<label class="form-selectgroup-item" style="width:100%"> 
                   <span class="form-selectgroup-label" style="text-align:left" data-bs-placement="bottom" aria-label="Enable light mode">
                     &nbsp;<b>`+arr[i]+`</b>
                   </span>
                    <span id="${arrDoanMaKey[i]}" class="float-right badge bg-white" onclick="event.stopPropagation();clearData(this)" style=" margin-right: 0px;position: absolute; font-size: 11px;float: right;right: 1%;top: 50%;transform: translateY(-50%);"> <i style="color: red" class="fa fa-close"></i></span>
                    </label >`);
    }
    if (html != '')
        $("#" + selector).html(html);
    else
        $("#" + selector).html(`<div style="align-items: center; text-align: center; display: grid; height: 100%; "><b><i class="fa fa-warning" style="color: orange"></i>&ensp;Chưa có thiết lập</b></div>`);
}

function veHtmlDoanMaTitle(selector, arr) {
    var arrDoanMa = ["Mã quỹ", "Mã tài khoản kinh tế", "Mã nội dung kinh tế", "Mã cấp ngân sách", "Mã quan hệ ngân sách", "Mã địa bàn hành chính",
        "Mã chương", "Mã ngành kinh tế", "Mã chương trình mục tiêu", "Mã kho bạc nhà nước", "Mã nguồn ngân sách nhà nước", "Mã dự phòng"];
    var arrDoanMaKey = ["MaQuy_key", "MaTaiKhoanKT_key", "MaNoiDungKT_key", "MaCapNS_key", "MaQHNS_key", "MaDiaBanHC_key",
        "MaChuong_key", "MaNganhKT_key", "MaNganhKT_key", "MaKBNN_key", "MaNguonNSNN_key", "MaDuPhong_key"];
    var html = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != '' && arr[i] != undefined)
            html += (`<label class="form-selectgroup-item" style="width:100%"> 
                   <span class="form-selectgroup-label" style="text-align:left" data-bs-placement="bottom" aria-label="Enable light mode">
                     &nbsp;<b>`+ arrDoanMa[i] +`: `+ arr[i] + `</b>
                   </span>
                    <span id="${arrDoanMaKey[i]}" class="float-right badge bg-white" onclick="event.stopPropagation();clearData(this)" style=" margin-right: 0px;position: absolute; font-size: 11px;float: right;right: 1%;top: 50%;transform: translateY(-50%);"> <i style="color: red" class="fa fa-close"></i></span>
                </label >`);
    }
    if (html != '')
        $("#" + selector).html(html);
    else
        $("#" + selector).html(`<div style="align-items: center; text-align: center; display: grid; height: 100%; "><b><i class="fa fa-warning" style="color: orange"></i>&ensp;Chưa có thiết lập</b></div>`);
}

//var DauTachNhomTienTe = NTS.getAjax('/api/DauTachNhomTienTe', {}).Result;
//var DauTachThapPhan = NTS.getAjax('/api/DauTachThapPhan', {}).Result;
//function formatNumber(str) {

//    str = "" + str;
//    str = str.replace(/[^0-9,.-]/g, '');
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
//    phanNguyen = phanNguyen.replace(/[^0-9.-]/g, '');
//    phanThapPhan = phanThapPhan.replace(/[^0-9.,]/g, '');
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
//    };
//    if (phanThapPhan != '' && phanThapPhan != DauTachThapPhan) {
//        phanThapPhan = phanThapPhan.split(DauTachThapPhan).join('').split(DauTachNhomTienTe).join('').toString();
//        phanThapPhan = ',' + phanThapPhan;
//    } else if (phanThapPhan == ',') {
//        phanThapPhan = ',';
//    }
//    else {
//        phanThapPhan = '';
//    }

//    if (kq + phanThapPhan == '' && soAm == "-")
//        return soAm + "";

//    kq = kq + phanThapPhan;
//    if (soAm == "-")
//        kq = "-" + kq + "";
//    return kq;
//}


var chuTongCong = function (values, data, calcParams) {
    var text = "Tổng cộng";
    return text.toString();
}
var tongCot = function (values, data, calcParams) {
    var calc = 0;
    values.forEach(function (value) {
        calc += parseFloat(formatNumberJS((value == null || value == undefined) ? '0' : '' + value));
    });
    return formatNumber(calc != undefined && calc != null ? calc : '').toString();
}
function fetchData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 1000); 
    });
}

//var NTS_SelectDoiTuong = {
//    getData: function (selectID, duongDan, param) {
//        var result = "";
//        result = NTS.getAjax(duongDan, {}).Result;
//        if (result.length > 0) {
//            for (var i = 0; i < result.length; i++) {
//                let data = result[i];
//                $('#' + selectID).append(`<option value="${data.DoiTuongID}"
//                data-name="${data.HoVaTen}"
//                data-name-cv="${layKyTuDauHoVaTen(data.HoVaTen)}"
//                data-code="${data.MaDoiTuong}"
//                data-genner="${data.GioiTinh}"
//                data-cmnd="${data.SoCCCD}"
//                data-tinh="${data.Tinh_ThuongTru}"
//                data-huyen="${data.Huyen_ThuongTru}"
//                data-xa="${data.Xa_ThuongTru}"
//                data-thon="${data.Thon_ThuongTru}"
//                ></option>`);
//            }
//            NTS_SelectDoiTuong.createElement(selectID);
//        } else {
//            console.log("Select có ID: "+selectID + " không có dữ liệu");
//        }
//        return result;
//    },
//    createElement: function (selectID) {
//        $('#' + selectID).addClass('vodiapicker_' + selectID);
//        $('.vodiapicker_' + selectID).css('display', 'none');
//        var langArray = [];
//        langArray.push(`<li action="false" style="position: sticky;top: 0;background-color: #F4F3F3;">
//                        <div class="row" style="width: 100%">
//                        <div class="form-col-12">
//                            <input type="text" class="form-control" id="ckTimKiem_${selectID}" >
//                        </div>
//                        </div>
//                    </li>`);
//        langArray.push(`<li action="chon" style="align-items: center;list-style: none;padding-top: 5px;padding-bottom: 5px;padding-left: 10px;display: flex;flex-wrap: nowrap;"><div class="opInfo" style="padding-left: 10px;"><div>--Chọn--</div></li>`);

//        $('#' + selectID).after(`<div class="lang-select">
//                                <button class="btn-select${selectID}" style="width: 100%;height: auto;min-height: 30px;border-radius: 5px;background-color: #fff;border: 1px solid #ccc;list-style-type: none" value="" id="Select${selectID}"></button>
//                                <div class="BoxItem${selectID}" style="width: 100%;max-width: 570px;box-shadow: 0 6px 12px rgba(0,0,0,.175);border: 1px solid rgba(0,0,0,.15);border-radius: 5px;position: absolute;z-index: 99999;display: none;background: white;">
//                                    <ul id="ListItem${selectID}" class="listOption" style=" background-color: white;padding-left: 0px;"></ul>
//                                </div>
//                            </div>`);
//        $('.btn-select' + selectID).html(langArray[1]);
//        $('.btn-select' + selectID).attr('value', 'en');
//        $('#ListItem' + selectID +'li')
//        var mauSac = [
//            "#0066cc",
//            "#cc3300",
//            "#993399",
//            "#009966",
//            "#ff9900",
//            "#669900",
//            "#cc6600",
//            "#663366",
//            "#009999",
//            "#ff6600",
//            "#996633",
//            "#336699",
//            "#cc6633",
//            "#666699",
//            "#339966",
//            "#ff3366",
//            "#663300",
//            "#336600",
//            "#993300",
//            "#003366"
//        ];
//        var soLuongMau = 1;
//        $('.vodiapicker_'+ selectID +' option').each(function () {
//            var name_cv = $(this).attr("data-name-cv");
//            var name = $(this).attr("data-name");
//            var code = $(this).attr("data-code");
//            var genner = $(this).attr("data-genner");
//            var cmnd = $(this).attr("data-cmnd");
//            var tinh = $(this).attr("data-tinh");
//            var huyen = $(this).attr("data-huyen");
//            var xa = $(this).attr("data-xa");
//            var thon = $(this).attr("data-thon");
//            var doiTuongID = $(this).attr("value");
//            const mauNgauNhien = getRandomColors(mauSac, soLuongMau);
//            var item = "";
//            item = `<li action="true" style="display: flex;list-style: none;padding-top: 5px;padding-bottom: 5px;padding-left: 10px;display: flex;flex-wrap: nowrap;align-items: center;"  data-name="${name}" data-code="${code}" data-cmnd="${cmnd}" value="${doiTuongID}"><div class="opImg" style="background-color:${mauNgauNhien}">${name_cv}</div><div class="opInfo"><div><b>${name}</b> (${code}), Giới tính: <b>${genner}</b>, CMND/CCCD: <b>${cmnd}</b></div><div class="text-diachi" title="${thon}, ${xa}, ${huyen}, ${tinh}">Địa chỉ: <b>${thon}, ${xa}, ${huyen}, ${tinh}</b></div></div></li>`;
//            langArray.push(item);
//        });
//        langArray.push(`<li action="false" id="loadMoreDTDK" onclick="LoadMoreDT()" style="justify-content: center;"> Xem thêm &nbsp<i class="fa fa-arrow-down" style="color: #0054a6" aria-hidden="true"></i></li>`);
//        $('#ListItem' + selectID).html(langArray);

//        $('#ListItemDoiTuongID li').hover(
//            function () {
//                // Thêm CSS khi hover
//                $(this).css({
//                    'background-color': '#F4F3F3',
//                    'cursor': 'pointer'
//                });
//            },
//            function () {
//                // Xóa CSS khi mất hover
//                $(this).css({
//                    'background-color': '',
//                    'cursor': ''
//                });
//            }
//        )

//        $('#ListItem' + selectID + ' li').click(function () {
//            var action = $(this).attr("action");
//            var item = "", value = "";
//            if (action == "false") {
//                return;
//            }
//            if (action == "chon") {
//                item = `<li action="chon" style="list-style: none;float: left;padding-bottom: 0px;"><div class="opInfo"><div>--Chọn--</div></li>`;

//            } else {
//                value = $(this).attr('value');
//                var name = $(this).attr("data-name");
//                var code = $(this).attr("data-code");
//                item = `<li style="list-style: none;float: left;padding-bottom: 0px;"><span><b>${code}</b> - <b>${name}</b></span></li>`;
//            }
//            $('.btn-select' + selectID).html(item);
//            $('.btn-select' + selectID).attr('value', value);
//            $('#' + selectID).value(value);
//            $(".BoxItem" + selectID).toggle();
//        });

//        $(".btn-select" + selectID).click(function () {
//            $(".BoxItem" + selectID).toggle();
//        });
//    },


//}

//function layKyTuDauHoVaTen(hoTen) {
//    hoTen = chuyenDauThanhKhongDau(hoTen);

//    // Tách họ và tên dựa trên khoảng trắng
//    var parts = hoTen.split(" ");

//    // Lấy ký tự đầu của họ và tên
//    var kyTuDauHo = parts[0].charAt(0);
//    var kyTuDauTen = parts[parts.length - 1].charAt(0);

//    // Kết hợp ký tự đầu của họ và tên
//    var kyTuDauHoVaTen = kyTuDauHo + kyTuDauTen;

//    return kyTuDauHoVaTen;
//}
//function chuyenDauThanhKhongDau(chuoi) {
//    var charMap = {
//        'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
//        'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
//        'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
//        'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
//        'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
//        'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
//        'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
//        'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
//        'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
//        'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
//        'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
//        'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
//        'đ': 'd',
//        'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
//        'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
//        'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
//        'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
//        'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
//        'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
//        'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
//        'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
//        'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
//        'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
//        'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
//        'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',
//        'Đ': 'D',
//    };

//    return chuoi.replace(/[^a-zA-Z0-9]/g, function (x) {
//        return charMap[x] || x;
//    });
//}
//function getRandomColors(colorArray, numberOfColors) {
//    const randomColors = [];

//    while (randomColors.length < numberOfColors) {
//        const randomIndex = Math.floor(Math.random() * colorArray.length);
//        const randomColor = colorArray[randomIndex];

//        if (!randomColors.includes(randomColor)) {
//            randomColors.push(randomColor);
//        }
//    }
//    return randomColors;
//}
function LayGioTheoNgay(Ngay) {
    // Tách ngày, tháng, năm từ chuỗi
    var parts1 = Ngay.split('/');
    var day1 = parseInt(parts1[0], 10);
    var month1 = parseInt(parts1[1], 10) - 1; // Lưu ý: tháng trong JavaScript bắt đầu từ 0
    var year1 = parseInt(parts1[2], 10);
    // Lấy giờ, phút, giây hiện tại
    var currentTime2 = new Date();
    var currentHours2 = currentTime2.getHours();
    var currentMinutes2 = currentTime2.getMinutes();
    var currentSeconds2 = currentTime2.getSeconds();
    // Tạo đối tượng Date từ ngày, tháng, năm và giờ hiện tại
    var dateObject = new Date(year1, month1, day1, currentHours2, currentMinutes2, currentSeconds2);
    const date3 = new Date(dateObject);
    const year3 = date3.getFullYear();
    const month3 = ('0' + (date3.getMonth() + 1)).slice(-2);
    const day3 = ('0' + date3.getDate()).slice(-2);
    const hours3 = ('0' + date3.getHours()).slice(-2);
    const minutes3 = ('0' + date3.getMinutes()).slice(-2);
    const seconds3 = ('0' + date3.getSeconds()).slice(-2);
    const milliseconds3 = ('00' + date3.getMilliseconds()).slice(-3);
    const formattedDate3 = `${year3}-${month3}-${day3} ${hours3}:${minutes3}:${seconds3}.${milliseconds3}`;

    return formattedDate3;
}

function isAlphaNumericWithSpecialChars(chuoi) {
    // Sử dụng biểu thức chính quy để kiểm tra chuỗi
    // Kiểm tra xem chuỗi có khớp với biểu thức chính quy hay không
    const containsSpecialChars = /[!@#$^_\[\]{}'"\\|?]/.test(chuoi);
    return  containsSpecialChars;
}
function selectFirstOptionIfMultiple(modalId) {
    var $modal = $('#' + modalId);

    if ($modal.length) {
        // Tìm tất cả các phần tử select trong modal
        var $selects = $modal.find('select');

        $selects.each(function () {
            var $select = $(this);
            // Kiểm tra xem select có nhiều hơn 1 option hay không
            if ($select.children('option').length > 1) {
                // Chọn option đầu tiên
                $select.prop('selectedIndex', 0);
            }
        });
    } else {
        console.warn('Modal with id ' + modalId + ' not found.');
    }
}

//Hàm này trả về tất cả các cột có trong lưới và được hiển thị ngoài lưới, với đối số duy nhất là tên lưới
function getColumnNames(Grid) {
    var columns = Grid.getColumns();    
    var columnNames = columns.map(function (column) {        
        var field = column.getField();
        var title = column.getDefinition().title;
        return { field: field, title: title }; // Trả về object chứa field và title        
    });
    return columnNames;
}
//Loại bỏ 1 trường dữ liệu trong array
function RemoveFieldInArray(array, text) {
    var filteredArray = array.filter(function (item) {
        return item.field !== text;
    });
    return filteredArray;
}

function GridKhongCoDuLieu(ID) {
    if ($('#' + ID + ' .tabulator-tableholder .tabulator-placeholder .tabulator-placeholder-contents').html() == "Không có dữ liệu") {
        $('#' + ID + ' .tabulator-tableholder .tabulator-placeholder .tabulator-placeholder-contents').empty();
        $('#' + ID + ' .tabulator-tableholder .tabulator-placeholder .tabulator-placeholder-contents').prepend($('<img>', {
            class: 'theImg', src: '/Images/EmptyData.jpg', style: 'width: 300px;height: 200px;'
        }));
    }
};

// Select ho gia dinh
//var NTS_SelectDoiTuong = {
//    getData: function (selectID, duongDan, param) {
//        var result = "";
//        result = NTS.getAjax(duongDan, {}).Result;
//        if (result.length > 0) {
//            for (var i = 0; i < result.length; i++) {
//                let data = result[i];
//                $('#' + selectID).append(`<option value="${data.DoiTuongID}"
//                data-name="${data.HoVaTen}"
//                data-name-cv="${layKyTuDauHoVaTen(data.HoVaTen)}"
//                data-code="${data.MaDoiTuong}"
//                data-genner="${data.GioiTinh}"
//                data-cmnd="${data.SoCCCD}"
//                data-tinh="${data.Tinh_ThuongTru}"
//                data-huyen="${data.Huyen_ThuongTru}"
//                data-xa="${data.Xa_ThuongTru}"
//                data-thon="${data.Thon_ThuongTru}"
//                ></option>`);
//            }
//            NTS_SelectDoiTuong.createElement(selectID);
//        } else {
//            console.log("Select có ID: "+selectID + " không có dữ liệu");
//        }
//        return result;
//    },
//    createElement: function (selectID) {
//        $('#' + selectID).addClass('vodiapicker_' + selectID); 
//        $('.vodiapicker_' + selectID).css('display', 'none');
//        var langArray = [];
//        langArray.push(`<li action="false" style="position: sticky;top: 0;background-color: #F4F3F3;">
//                        <div class="row" style="width: 100%">
//                        <div class="form-col-12">
//                            <input type="text" class="form-control" id="ckTimKiem_${selectID}" >
//                        </div>
//                        </div>
//                    </li>`);
//        langArray.push(`<li action="chon" style="align-items: center;list-style: none;padding-top: 5px;padding-bottom: 5px;padding-left: 10px;display: flex;flex-wrap: nowrap;"><div class="opInfo" style="padding-left: 10px;"><div>--Chọn--</div></li>`);

//        $('#' + selectID).after(`<div class="lang-select">
//                                <button class="btn-select${selectID}" style="width: 100%;height: auto;min-height: 30px;border-radius: 5px;background-color: #fff;border: 1px solid #ccc;list-style-type: none" value="" id="Select${selectID}"></button>
//                                <div class="BoxItem${selectID}" style="width: 100%;max-width: 570px;box-shadow: 0 6px 12px rgba(0,0,0,.175);border: 1px solid rgba(0,0,0,.15);border-radius: 5px;position: absolute;z-index: 99999;display: none;background: white;">
//                                    <ul id="ListItem${selectID}" class="listOption" style=" background-color: white;padding-left: 0px;"></ul>
//                                </div>
//                            </div>`);
//        $('.btn-select' + selectID).html(langArray[1]);
//        $('.btn-select' + selectID).attr('value', 'en');
//        $('#ListItem' + selectID +'li')
//        var mauSac = [
//            "#0066cc",
//            "#cc3300",
//            "#993399",
//            "#009966",
//            "#ff9900",
//            "#669900",
//            "#cc6600",
//            "#663366",
//            "#009999",
//            "#ff6600",
//            "#996633",
//            "#336699",
//            "#cc6633",
//            "#666699",
//            "#339966",
//            "#ff3366",
//            "#663300",
//            "#336600",
//            "#993300",
//            "#003366"
//        ];
//        var soLuongMau = 1;
//        $('.vodiapicker_'+ selectID +' option').each(function () {
//            var name_cv = $(this).attr("data-name-cv");
//            var name = $(this).attr("data-name");
//            var code = $(this).attr("data-code");
//            var genner = $(this).attr("data-genner");
//            var cmnd = $(this).attr("data-cmnd");
//            var tinh = $(this).attr("data-tinh");
//            var huyen = $(this).attr("data-huyen");
//            var xa = $(this).attr("data-xa");
//            var thon = $(this).attr("data-thon");
//            var doiTuongID = $(this).attr("value");
//            const mauNgauNhien = getRandomColors(mauSac, soLuongMau);
//            var item = "";
//            item = `<li action="true" style="display: flex;list-style: none;padding-top: 5px;padding-bottom: 5px;padding-left: 10px;display: flex;flex-wrap: nowrap;align-items: center;"  data-name="${name}" data-code="${code}" data-cmnd="${cmnd}" value="${doiTuongID}"><div class="opImg" style="background-color:${mauNgauNhien}">${name_cv}</div><div class="opInfo"><div><b>${name}</b> (${code}), Giới tính: <b>${genner}</b>, CMND/CCCD: <b>${cmnd}</b></div><div class="text-diachi" title="${thon}, ${xa}, ${huyen}, ${tinh}">Địa chỉ: <b>${thon}, ${xa}, ${huyen}, ${tinh}</b></div></div></li>`;
//            langArray.push(item);
//        });
//        langArray.push(`<li action="false" id="loadMoreDTDK" onclick="LoadMoreDT()" style="justify-content: center;"> Xem thêm &nbsp<i class="fa fa-arrow-down" style="color: #0054a6" aria-hidden="true"></i></li>`);
//        $('#ListItem' + selectID).html(langArray);

//        $('#ListItemDoiTuongID li').hover(
//            function () {
//                // Thêm CSS khi hover
//                $(this).css({
//                    'background-color': '#F4F3F3',
//                    'cursor': 'pointer'
//                });
//            },
//            function () {
//                // Xóa CSS khi mất hover
//                $(this).css({
//                    'background-color': '',
//                    'cursor': ''
//                });
//            }
//        )

//        $('#ListItem' + selectID + ' li').click(function () {
//            var action = $(this).attr("action");
//            var item = "", value = "";
//            if (action == "false") {
//                return;
//            }
//            if (action == "chon") {
//                item = `<li action="chon" style="list-style: none;float: left;padding-bottom: 0px;"><div class="opInfo"><div>--Chọn--</div></li>`;

//            } else {
//                value = $(this).attr('value');
//                var name = $(this).attr("data-name");
//                var code = $(this).attr("data-code");                
//                item = `<li style="list-style: none;float: left;padding-bottom: 0px;"><span><b>${code}</b> - <b>${name}</b></span></li>`;
//            }
//            $('.btn-select' + selectID).html(item);
//            $('.btn-select' + selectID).attr('value', value);
//            $('#' + selectID).value(value);
//            $(".BoxItem" + selectID).toggle();
//        });

//        $(".btn-select" + selectID).click(function () {
//            $(".BoxItem" + selectID).toggle();
//        });
//    },


//}

//function layKyTuDauHoVaTen(hoTen) {
//    hoTen = chuyenDauThanhKhongDau(hoTen);

//    // Tách họ và tên dựa trên khoảng trắng
//    var parts = hoTen.split(" ");

//    // Lấy ký tự đầu của họ và tên
//    var kyTuDauHo = parts[0].charAt(0);
//    var kyTuDauTen = parts[parts.length - 1].charAt(0);

//    // Kết hợp ký tự đầu của họ và tên
//    var kyTuDauHoVaTen = kyTuDauHo + kyTuDauTen;

//    return kyTuDauHoVaTen;
//}
//function chuyenDauThanhKhongDau(chuoi) {
//    var charMap = {
//        'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
//        'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
//        'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
//        'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
//        'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
//        'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
//        'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
//        'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
//        'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
//        'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
//        'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
//        'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
//        'đ': 'd',
//        'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
//        'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
//        'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
//        'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
//        'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
//        'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
//        'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
//        'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
//        'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
//        'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
//        'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
//        'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',
//        'Đ': 'D',
//    };

//    return chuoi.replace(/[^a-zA-Z0-9]/g, function (x) {
//        return charMap[x] || x;
//    });
//}
//function getRandomColors(colorArray, numberOfColors) {
//    const randomColors = [];

//    while (randomColors.length < numberOfColors) {
//        const randomIndex = Math.floor(Math.random() * colorArray.length);
//        const randomColor = colorArray[randomIndex];

//        if (!randomColors.includes(randomColor)) {
//            randomColors.push(randomColor);
//        }
//    }
//    return randomColors;
//}


function CanhBaoXoaTatCaDoiTuong(DongY, Huy, SoLuong) {
    var Width = window.innerWidth;

    $.confirm({
        title: '<span style="font-size:18px" class="text-danger">Cảnh báo xóa dữ liệu!</span>',
        type: 'red',
        icon: 'fa fa-trash',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
        content: NTS.CauThongBaoXoaTatCaDoiTuong(SoLuong),
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-outline-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}

function CanhBaoTrungSoDinhDanhDoiTuong(Huy, ThongBao) {
    var Width = window.innerWidth;

    $.confirm({
        title: '<span style="font-size:18px" class="text-danger">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-trash',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
        content: NTS.CauThongBaoTrungSoDinhDanhDoiTuong(ThongBao),
        buttons: {
            cancel: {
                text: '<i class="fa fa-close"></i> Đóng',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}

function CanhBaoTrungMaSoThue(Huy, ThongBao) {
    var Width = window.innerWidth;

    $.confirm({
        title: '<span style="font-size:18px" class="text-danger">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-trash',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
        content: NTS.CauThongBaoTrungMaSoThue(ThongBao),
        buttons: {
            cancel: {
                text: '<i class="fa fa-close"></i> Đóng',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}

function CanhBaoTrungSoHoChieu(Huy, ThongBao) {
    var Width = window.innerWidth;

    $.confirm({
        title: '<span style="font-size:18px" class="text-danger">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-trash',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
        content: NTS.CauThongBaoTrungSoHoChieu(ThongBao),
        buttons: {
            cancel: {
                text: '<i class="fa fa-close"></i> Đóng',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}


function CanhBaoTrungThanhVien(DongY, Huy, ThongBao) {
    var Width = window.innerWidth;

    $.confirm({
        title: '<span style="font-size:18px" class="text-danger">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-trash',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
        content: NTS.CauThongBaoCapNhatDoiTuong(ThongBao),
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-outline-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}

function CanhBaoCapNhatDoiTuong(DongY, Huy, ThongBao) {
    var Width = window.innerWidth;

    $.confirm({
        title: '<span style="font-size:18px" class="text-danger">Cảnh báo!</span>',
        type: 'red',
        icon: 'fa fa-trash',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
        content: NTS.CauThongBaoCapNhatDoiTuongCLD(ThongBao),
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-outline-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}

function CanhBaoGuiPheDuyetTinDangTuyen(DongY, Huy, ThongBao) {
    var Width = window.innerWidth;

    $.confirm({
        title: '<span style="font-size:18px" class="text-primary">Thông báo!</span>',
        type: 'blue',
        icon: 'fa-regular fa-paper-plane',
        typeAnimated: true,
        theme: 'material',
        columnClass: 'col-md-' + (Width > 1500 ? '5' : '6') + ' col-md-offset-3 w-max-500px',
        content: NTS.CauThongBaoGuiPheDuyetTinTuyenDung(ThongBao),
        buttons: {
            confirm: {
                text: '<i class="fa fa-check"></i> Có',
                btnClass: 'btn-outline-primary',
                keys: ['shift'],
                action: DongY
            },
            cancel: {
                text: '<i class="fa fa-close"></i> Không',
                btnClass: 'btn-danger',
                keys: ['enter', 'esc', 'space'],
                action: Huy
            }
        }
    });
}

function replaceImg(data) {
    if (data != null) {
        if (data != "") {
            return data.replace('*', '').replace('~', '');
        } else {
            return "../../Images/banner.jpg";
        }
    } else {
        return "../../Images/banner.jpg";
    }

}
function replaceImgLogo(data) {
    if (data != null) {
        if (data != "") {
            return data.replace('*', '').replace('~', '');
        } else {
            return "../../Images/defaut-logo.png";
        }
    } else {
        return "../../Images/defaut-logo.png";
    }

}
function kiemTraChuoiRong(data) {
    if (data != "") {
        return data;
    }
    return "Chưa có dữ liệu";
}

function ErrorImg(selector) {
    let ImgError = '../../Images/no-image-min.jpg';
    $(selector).attr('src', ImgError);
}
function ErrorImgLogo(selector) {
    let ImgError = '../../Images/no-image-min.jpg';
    $(selector).attr('src', ImgError);
}
function encodeURL(url) {
    // Mã hóa URL sang Base64
    var encodedURL = btoa(url);

    // Áp dụng ROT13 lên URL đã mã hóa
    var rot13URL = '';
    for (var i = 0; i < encodedURL.length; i++) {
        var charCode = encodedURL.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            rot13URL += String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            rot13URL += String.fromCharCode(((charCode - 97 + 13) % 26) + 97);
        } else {
            rot13URL += encodedURL.charAt(i);
        }
    }

    // Trả về URL đã được mã hóa
    return rot13URL;
}

function decodeURL(rot13URL) {
    // Áp dụng ROT13 lên chuỗi đã mã hóa
    var decodedURL = '';
    for (var i = 0; i < rot13URL.length; i++) {
        var charCode = rot13URL.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            decodedURL += String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            decodedURL += String.fromCharCode(((charCode - 97 + 13) % 26) + 97);
        } else {
            decodedURL += rot13URL.charAt(i);
        }
    }

    // Giải mã URL bằng Base64
    var decodedURL = atob(decodedURL);

    // Trả về URL đã được giải mã
    return decodedURL;
}


function UngTuyenViecLam(TinTuyenDungID) {
    let result = NTS.getAjax("/CongThongTinViecLam/Function/LuuUngTuyenViecLam", { id: TinTuyenDungID });
    return result;
}

function KiemTraUngTuyen(TinTuyenDungID) {
    let result = NTS.getAjax("/CongThongTinViecLam/Function/KiemTraUngTuyen", { id: TinTuyenDungID });
    return result;
}

function LuuTruViecLam(TinTuyenDungID) {
    let result = NTS.getAjax("/CongThongTinViecLam/Function/LuuTruViecLamCuaUngVien", { id: TinTuyenDungID });
    return result;
}
function KiemTraLuuTruViecLam(TinTuyenDungID) {
    let result = NTS.getAjax("/CongThongTinViecLam/Function/KiemTraLuuTruViecLam", { id: TinTuyenDungID });
    return result;
}
function LuuTruUngVien(UngVienID) {
    let result = NTS.getAjax("/CongThongTinViecLam/Function/LuuTruUngVienCuaNhaTuyenDung", { id: UngVienID });
    return result;
}
function KiemTraLuuTruHoSo(UngVienID) {
    let result = NTS.getAjax("/CongThongTinViecLam/Function/KiemTraLuuTruUngVien", { id: UngVienID });
    return result;
}
function LuuTruNhaTuyenDung(ID) {
    let result = NTS.getAjax("/CongThongTinViecLam/Function/LuuTruNhaTuyenDungCuaUngVien", { id: ID });
    return result;
}
function KiemTraLuuTruNhaTuyenDung(ID) {
    let result = NTS.getAjax("/CongThongTinViecLam/Function/KiemTraTheoDoiNhaTuyenDung", { id: ID });
    return result;
}
function LoadParamUrltoGuidID(DoiSoParam) {
    var url_string = window.location;
    var url = new URL(url_string);
    var ma = url.searchParams.get(DoiSoParam);
    if (ma != "" && ma != null) {
        var decodedString = decodeURL(ma);
        return decodedString;
    }
    return "";
}
// Hàm trả về chuỗi "Không" nếu chuỗi vào là rỗng hoặc null hoặc khoảng trắng, ngược lại trả về chuỗi ban đầu
function checkNullString(str) {
    return isNullOrEmptyOrWhitespace(str) ? "Chưa cập nhật" : str;
}

function LoadParamUrltoMa(DoiSoParam) {
    var url_string = window.location;
    var url = new URL(url_string);
    var ma = url.searchParams.get(DoiSoParam);
    if (ma != "" && ma != null) {
        var decodedString =ma;
        return decodedString;
    }
    return "";
}