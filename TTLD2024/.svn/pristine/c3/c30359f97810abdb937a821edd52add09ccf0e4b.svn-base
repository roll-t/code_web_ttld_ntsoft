var NoiDung = '';

$(document).ready(function () {
    var url_string = window.location;
    var url = new URL(url_string);
    var NoiDung = url.searchParams.get("tim-kiem");

    var TuKhoa = url.searchParams.get("tu-khoa");
    console.log("Từ khóa: ", TuKhoa);
    if (TuKhoa == null) {
        LoadTimKiem(NoiDung);
    } else {
        LoadTimKiemTheoTuKhoa(TuKhoa);
    }
    
    //LoadCamNangTop1();
    // Bắt sự kiện khi nhấn phím Enter trong ô input tìm kiếm
    $('#TimKiem').keypress(function (e) {
        if (e.which == 13) { // 13 là mã phím cho phím Enter
            NoiDung = $(this).val(); // Lấy giá trị từ ô input
            location.href = 'tim-kiem-cam-nang-nghe-nghiep.html?tim-kiem=' + NoiDung
        }
    });
    LoadCamNangNew();
});

async function LoadTimKiem(NoiDung) {
    $('#content').html('');
    $('#content_pagination').html('');
    $('#TieuDeNoiDungTimKiem').html(NoiDung);
    var param = new Array();
    param[0] = NoiDung;
    let result = await NTS.getAjaxAsync("CamNangNgheNghiep/TimKiemCamNang/GetCamNangTheoNoiDungTimKiem", { noidung: param });
    if (!result.Err && result.Result != null) {
        let data = result.Result;
        if (data.length > 0) {
            var page = getUrlParameter('page');
            if (page == false) {
                page = 1;
            }

            var RowData = 12;
            var startIndex = (page * RowData) - RowData;
            var endIndex = Math.min(result.Result.length, (page * RowData));
            for (var i = startIndex; i < endIndex; i++) {
                let data = result.Result[i];
                let img = (data.TenHinhAnh).split('*')[0];
                if (img == '' || img == undefined || img == null) {
                    img = '/Images/news-defaut.jpg';
                }
                // Mã hóa URL bằng Base64 và ROT13
                $('#content').append(`
                    <div class="col-md-3">
                        <div class="item_camnang">
                            <a href="/chi-tiet-cam-nang.html?p=${data.TenDinhDanhTT}">
                                <div style="width:100%;height:90%;">
                                    <img src="${img}" class="item_camnang-img" />
                                </div>
                                <div class="item_camnang-tieude">
                                    <a href="/chuyen-muc-cam-nang-nghe-nghiep.html?p=${data.TenMaLoaiTT}" style="text-transform:uppercase;">${data.TenLoaiTT}</a>
                                    <h3 style="margin-top:10px;"> <a href="/chi-tiet-cam-nang.html?p=${data.TenDinhDanhTT}" class="item_camnang-tieude-h3 text-3-row">${data.TenTieuDe} </a></h3>
                                </div>
                            </a>
                        </div>
                    </div>
                `);
            }
            //ListPaginationVanBan(result.Result.length, page);
        } else {
            $('#content').append(`
                <div style="text-align:center;margin: 0 auto;">
                    <img src="/Images/vanban-empty.jpg" class="" id="vanban-empty"/>
                </div>
            `);
        }
    } else {
        $('#content').append(`
                <div style="text-align:center;margin: 0 auto;">
                    <img src="/Images/vanban-empty.jpg" class="" id="vanban-empty"/>
                </div>
            `);
    }
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function LoadCamNangNew() {
    $('#camNangCungLoai').html('');
    let data = NTS.getAjax("CamNangNgheNghiep/TimKiemCamNang/getCamNangNew", {});
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            let img = (data[i].TenHinhAnh).split('*')[0];
            if (img == '' || img == undefined || img == null) {
                img = '/Images/news-defaut.jpg';
            }
            // Mã hóa URL bằng Base64 và ROT13
            $('#camNangCungLoai').append(`
            <div class="col-md-3">
                <div class="item_camnang">
                    <a href="/chi-tiet-cam-nang.html?p=${data[i].TenDinhDanhTT}">
                        <div style="width:100%;height:90%;">
                            <img src="${img}" class="item_camnang-img" />
                        </div>
                        <div class="item_camnang-tieude">
                            <a href="/chuyen-muc-cam-nang-nghe-nghiep.html?p=${data[i].TenMaLoaiTT}" style="text-transform:uppercase;">${data[i].TenLoaiTT}</a>
                            <h3 style="margin-top:10px;"> <a href="/chi-tiet-cam-nang.html?p=${data[i].TenDinhDanhTT}" class="item_camnang-tieude-h3  text-3-row" >${data[i].TenTieuDe} </a></h3>
                        </div>
                    </a>
                </div>
            </div>
        `);
        }
    } else {
        $('#camNangCungLoai').append(`
        <div style="text-align:center;">
        </div>
    `);
    }
}


async function LoadTimKiemTheoTuKhoa(NoiDung) {
    $('#content').html('');
    $('#content_pagination').html('');
    $('#TieuDeNoiDungTimKiem').html(NoiDung);
    var param = new Array();
    param[0] = NoiDung;
    let result = await NTS.getAjaxAsync("CamNangNgheNghiep/TimKiemCamNang/GetCamNangTheoTuKhoaTimKiem", { noidung: param });
    if (!result.Err && result.Result != null) {
        let data = result.Result;
        if (data.length > 0) {
            var page = getUrlParameter('page');
            if (page == false) {
                page = 1;
            }

            var RowData = 12;
            var startIndex = (page * RowData) - RowData;
            var endIndex = Math.min(result.Result.length, (page * RowData));
            for (var i = startIndex; i < endIndex; i++) {
                let data = result.Result[i];
                let img = (data.TenHinhAnh).split('*')[0];
                if (img == '' || img == undefined || img == null) {
                    img = '/Images/news-defaut.jpg';
                }
                // Mã hóa URL bằng Base64 và ROT13
                $('#content').append(`
                    <div class="col-md-3">
                        <div class="item_camnang">
                            <a href="/chi-tiet-cam-nang.html?p=${data.TenDinhDanhTT}">
                                <div style="width:100%;height:90%;">
                                    <img src="${img}" class="item_camnang-img" />
                                </div>
                                <div class="item_camnang-tieude">
                                    <a href="/chuyen-muc-cam-nang-nghe-nghiep.html?p=${data.TenMaLoaiTT}" style="text-transform:uppercase;">${data.TenLoaiTT}</a>
                                    <h3 style="margin-top:10px;"> <a href="/chi-tiet-cam-nang.html?p=${data.TenDinhDanhTT}" class="item_camnang-tieude-h3 text-3-row">${data.TenTieuDe} </a></h3>
                                </div>
                            </a>
                        </div>
                    </div>
                `);
            }
            //ListPaginationVanBan(result.Result.length, page);
        } else {
            $('#content').append(`
                <div style="text-align:center;margin: 0 auto;">
                    <img src="/Images/vanban-empty.jpg" class="" id="vanban-empty"/>
                </div>
            `);
        }
    } else {
        $('#content').append(`
                <div style="text-align:center;margin: 0 auto;">
                    <img src="/Images/vanban-empty.jpg" class="" id="vanban-empty"/>
                </div>
            `);
    }
}