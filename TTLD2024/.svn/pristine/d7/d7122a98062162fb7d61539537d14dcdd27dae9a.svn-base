using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTLD2024.Class
{
    public static class CONFIG
    {
        public static string KHONG_CO_QUYEN_TRUY_CAP = "Bạn không có quyền truy cập!";      
        public static string CO_LOI_XAY_RA = "Có lỗi xảy ra!";
        public static string DA_TON_TAI_MA = "2_Đã tồn tại mã trong hệ thống";
        public static string THEM_THANH_CONG = "1_Thêm mới dữ liệu thành công!";
        public static string CAP_NHAT_THANH_CONG = "1_Cập nhật dữ liệu thành công!";
        public static string THAO_TAC_THAT_BAI = "0_Thao tác thất bại!";
        public static string XOA_DU_LIEU_THANH_CONG = "1_Xóa dữ liệu thành công!";
        public static string XOA_DU_LIEU_THAT_BAI = "0_Xóa dữ liệu thất bại!";

        public static string ThongBaoXuLyNhieuDong(string loai, int rowcount)
        {
            switch (loai)
            {
                case "capnhat":
                    return JSonHelper.ToJson("0_Hệ thống bảo mật phát hiện thao tác của bạn sẽ cập nhật " + rowcount + " dòng dữ liệu.<br/>Lượng dữ liệu cập nhật vượt giới hạn cho phép. Bạn vui lòng liên hệ cán bộ chăm sóc khách hàng để được hỗ trợ.<br/>Cám ơn!");
                case "xoa":
                    return JSonHelper.ToJson("0_Hệ thống bảo mật phát hiện thao tác của bạn sẽ xóa " + rowcount + " dòng dữ liệu.<br/>Lượng dữ liệu xóa vượt giới hạn cho phép. Bạn vui lòng liên hệ cán bộ chăm sóc khách hàng để được hỗ trợ.<br/>Cám ơn!");
                default:
                    return JSonHelper.ToJson("0_Hệ thống bảo mật phát hiện thao tác của bạn sẽ cập nhật " + rowcount + " dòng dữ liệu.<br/>Lượng dữ liệu cập nhật vượt giới hạn cho phép. Bạn vui lòng liên hệ cán bộ chăm sóc khách hàng để được hỗ trợ.<br/>Cám ơn!");
            }
        }
    }
}