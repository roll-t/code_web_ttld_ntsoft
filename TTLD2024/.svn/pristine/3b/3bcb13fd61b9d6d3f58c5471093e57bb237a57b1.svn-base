using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Windows.Interop;

namespace TTLD2024.Class
{
    public static class NTSThongBao
    {
        public static int THEM = 1;
        public static int CAPNHAT = 2;
        public static int XOA = 3;

        // nhóm err = false
        public static string ThemThanhCong()
        {
            ExecPermiss ep = new ExecPermiss
            {
                Err = false,
                Msg = "Thêm mới dữ liệu thành công!"
            };
            return JSonHelper.ToJson(ep);
        }
        public static string ThemThanhCong(string ID)
        {
            ExecPermiss ep = new ExecPermiss
            {
                Err = false,
                Msg = "Thêm mới dữ liệu thành công!_"+ID
            };
            return JSonHelper.ToJson(ep);
        }
        public static string ThemThanhCong(ExecPermiss execPermiss)
        {
            execPermiss.Err = false;
            execPermiss.Msg = "Thêm mới dữ liệu thành công!";
            return JSonHelper.ToJson(execPermiss);
        }
        public static string CapNhatThanhCong()
        {
            ExecPermiss ep = new ExecPermiss();
            ep.Err = false;
            ep.Msg = "Cập nhật dữ liệu thành công!";
            return JSonHelper.ToJson(ep);
        }
        
        public static string CapNhatThanhCong(ExecPermiss execPermiss)
        {
            execPermiss.Err = false;
            execPermiss.Msg = "Cập nhật dữ liệu thành công!";
            return JSonHelper.ToJson(execPermiss);
        }
        public static string XoaThanhCong()
        {
            ExecPermiss ep = new ExecPermiss
            {
                Err = false,
                Msg = "Xóa dữ liệu thành công!"
            };
            return JSonHelper.ToJson(ep);
        }


        // nhóm err = true

        public static string KhongCoQuyenTruyCap()
        {
            ExecPermiss ep = new ExecPermiss
            {
                Err = true,
                
                Msg = "Bạn không có quyền truy cập!"
            };
            return JSonHelper.ToJson(ep);
        }
        public static string CoLoiXayRa()
        {
            ExecPermiss ep = new ExecPermiss
            {
                Err = true,
                Msg = "Có lỗi xảy ra!"
            };
            return JSonHelper.ToJson(ep);
        }
        public static string CoLoiXayRa(Exception ex)
        {
            ExecPermiss ep = new ExecPermiss
            {
                Err = true,
                Msg = "Có lỗi xảy ra!" + NTSSecurity.Insert_MaCodeLoi(ex)
            };
            return JSonHelper.ToJson(ep);
        }

        public static string DaTonTaiMa()
        {
            ExecPermiss ep = new ExecPermiss
            {
                Err = true,
                CanhBao = true,
                Msg = "Đã tồn tại mã trong hệ thống!"
            };
            return JSonHelper.ToJson(ep);
        }
        public static string ThaoTacThatBai()
        {
            ExecPermiss ep = new ExecPermiss
            {
                Err = true,
                
                Msg = "Thao tác thất bại!"
            };
            return JSonHelper.ToJson(ep);
        }
        public static string XoaDuLieuThatBai()
        {
            ExecPermiss ep = new ExecPermiss
            {
                Err = true,
                Msg = "Xóa dữ liệu thất bại!"
            };
            return JSonHelper.ToJson(ep);
        }

        public static string ThongBaoXuLyNhieuDong(int loai, int rowcount)
        {
            string thongbao = String.Empty;
            if(loai == XOA)
            {
                thongbao = "Hệ thống bảo mật phát hiện thao tác của bạn sẽ xóa " + rowcount + " dòng dữ liệu.<br/>Lượng dữ liệu xóa vượt giới hạn cho phép. Bạn vui lòng liên hệ cán bộ chăm sóc khách hàng để được hỗ trợ.<br/>Cám ơn!";
            }
            else
            {
                thongbao = "Hệ thống bảo mật phát hiện thao tác của bạn sẽ cập nhật " + rowcount + " dòng dữ liệu.<br/>Lượng dữ liệu cập nhật vượt giới hạn cho phép. Bạn vui lòng liên hệ cán bộ chăm sóc khách hàng để được hỗ trợ.<br/>Cám ơn!";
            }

            ExecPermiss ep = new ExecPermiss
            {
                Err = true,
                
                Msg = thongbao
            };
            return JSonHelper.ToJson(ep);
        }

        public static string DaTonTaiEmail()
        {
            ExecPermiss ep = new ExecPermiss
            {
                Err = true,
                CanhBao = true,
                Msg = "Đã tồn tại email trong hệ thống!"
            };
            return JSonHelper.ToJson(ep);
        }

        public static string DangKyThanhCong(string LoaiTaiKhoan_string)
        {
            ExecPermiss ep = new ExecPermiss
            {
                Err = false,
                Msg = "Đăng ký " + LoaiTaiKhoan_string + " thành công!"
            };
            return JSonHelper.ToJson(ep);
        }
        
        public static string DangNhapThanhCong()
        {
            ExecPermiss ep = new ExecPermiss
            {
                Err = false,
                Msg = "Đăng nhập thành công!"
            };
            return JSonHelper.ToJson(ep);
        }

        public static string DangKyThatBai(string LoaiTaiKhoan_string)
        {
            ExecPermiss ep = new ExecPermiss
            {
                Err = true,
                Msg = "Đăng ký " + LoaiTaiKhoan_string + " thất bại!"
            };
            return JSonHelper.ToJson(ep);
        }

        public static string DangNhapThatBai()
        {
            ExecPermiss ep = new ExecPermiss
            {
                Err = true,
                Msg = "Đăng nhập thất bại!"
            };
            return JSonHelper.ToJson(ep);
        }

        public static string _Ajax = "0_Bạn không có quyền truy cập!";
        public static string KhongQuyenAjax()
        {
            return JSonHelper.ToJson(_Ajax);
        }
    }
}