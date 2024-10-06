var ntspermiss = { xem: !1, them: 1, xoa: 1, sua: 1, _in: 1, record: 1 }, keyper, chuoiPhanQuyen;
$(() => {
    chuoiPhanQuyen = NTS.getAjax('/api/GetPermission', {}).Result;
    if (!jQuery.isEmptyObject(chuoiPhanQuyen)) {
        ntspermiss = {
            xem: chuoiPhanQuyen[0],
            them: chuoiPhanQuyen[1],
            xoa: chuoiPhanQuyen[2],
            sua: chuoiPhanQuyen[3],
            _in: chuoiPhanQuyen[4],
            record: chuoiPhanQuyen[6]
        }
    }

    $('[permiss]').each(function () {
        switch ($(this).attr('permiss')) {
            case 'xem':
                ('xem' in ntspermiss) && $(this).prop('disabled', !ntspermiss.xem);
                break;
            case 'them':
                ('them' in ntspermiss) && $(this).prop('disabled', !ntspermiss.them);
                break;
            case 'xoa':
                ('xoa' in ntspermiss) && $(this).prop('disabled', !ntspermiss.xoa);
                break;
            case 'sua':
                ('sua' in ntspermiss) && $(this).prop('disabled', !ntspermiss.sua);
                break;
            case 'in':
                ('in' in ntspermiss) && $(this).prop('disabled', !ntspermiss.in);
                break;
            default:
        }
    })
});