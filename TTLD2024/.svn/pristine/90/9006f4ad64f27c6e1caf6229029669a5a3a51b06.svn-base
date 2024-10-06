using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace TTLD2024
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
            name: "chitietcv",
            url: "chi-tiet-cv.html",
            defaults: new { controller = "ChiTietCV", action = "Index" }
        ).DataTokens.Add("area", "UngVien");
            
            routes.MapRoute(
            name: "chitietcamnang",
            url: "chi-tiet-cam-nang.html",
            defaults: new { controller = "ChiTietCamNang", action = "Index" }
        ).DataTokens.Add("area", "CamNangNgheNghiep");

            routes.MapRoute(
            name: "danhmuccamnangnghenghiep",
            url: "chuyen-muc-cam-nang-nghe-nghiep.html",
            defaults: new { controller = "DanhMucCamNangNgheNghiep", action = "Index" }
        ).DataTokens.Add("area", "CamNangNgheNghiep");

            routes.MapRoute(
              name: "danhsachhosovieclam",
              url: "danh-sach-ho-so-viec-lam.html",
              defaults: new { controller = "DanhSachHoSoViecLam", action = "Index" }
          ).DataTokens.Add("area", "CongThongTinViecLam");

            routes.MapRoute(
               name: "danhsachhosoungvien",
               url: "danh-sach-ho-so-ung-vien.html",
               defaults: new { controller = "DanhSachHoSoUngVien", action = "Index" }
           ).DataTokens.Add("area", "CongThongTinViecLam");

            routes.MapRoute(
                name: "danhsachnhatuyendung",
                url: "danh-sach-nha-tuyen-dung.html",
                defaults: new { controller = "DanhSachNhaTuyenDung", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");

            routes.MapRoute(
              name: "danhsachdangtintuyendung",
              url: "danh-sach-dang-tin-tuyen-dung.html",
              defaults: new { controller = "DanhSachDangTinTuyenDung", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");

            routes.MapRoute(
                name: "lienhe",
                url: "lien-he.html",
                defaults: new { controller = "LienHe", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");
            
            routes.MapRoute(
                name: "gioithieu",
                url: "gioi-thieu.html",
                defaults: new { controller = "GioiThieuCTT", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");
            
            routes.MapRoute(
                name: "chitietvanban",
                url: "xem-chi-tiet-van-ban/{dinhDanh}.html",
                defaults: new { controller = "ChiTietVanBan", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");
            
            routes.MapRoute(
                name: "tracuuvanban",
                url: "tra-cuu-van-ban.html",
                defaults: new { controller = "VanBanCTT", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");
            
            routes.MapRoute(
                name: "chitiettintuc",
                url: "xem-chi-tiet-tin-tuc/{dinhDanh}.html",
                defaults: new { controller = "ChiTietTinTuc", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");
            
            routes.MapRoute(
                name: "tracuutintuc",
                url: "tra-cuu-tin-tuc.html",
                defaults: new { controller = "TinTucCTT", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");

            routes.MapRoute(
              name: "chitietungvien",
              url: "xem-chi-tiet-ung-vien/{dinhDanh}.html",
              defaults: new { controller = "ChiTietUngVien", action = "Index" }
          ).DataTokens.Add("area", "CongThongTinViecLam");


            routes.MapRoute(
                name: "tracuuungvien",
                url: "tra-cuu-ung-vien.html",
                defaults: new { controller = "TraCuuUngVien", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");
            
            routes.MapRoute(
                name: "chitietnhatuyendung",
                url: "xem-chi-tiet-nha-tuyen-dung/{dinhDanh}.html",
                defaults: new { controller = "ChiTietNhaTuyenDung", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");
            
            routes.MapRoute(
                name: "tracuunhatuyendung",
                url: "tra-cuu-nha-tuyen-dung.html",
                defaults: new { controller = "TraCuuNhaTuyenDung", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");
            
            routes.MapRoute(
                name: "chitietvieclam",
                url: "xem-chi-tiet-viec-lam/{dinhDanh}.html",
                defaults: new { controller = "ChiTietViecLam", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");
            
            routes.MapRoute(
                name: "tracuuvieclam",
                url: "tra-cuu-viec-lam.html",
                defaults: new { controller = "TraCuuViecLam", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");
            
            routes.MapRoute(
                name: "trangchu",
                url: "trang-chu.html",
                defaults: new { controller = "TrangChuCTT", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");

            routes.MapRoute(
                name: "quenmatkhau",
                url: "quen-mat-khau.html",
                defaults: new { controller = "QuenMatKhau", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");

            routes.MapRoute(
                name: "dangnhapungvien",
                url: "dang-nhap-ung-vien.html",
                defaults: new { controller = "DangNhapUngVien", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");

            routes.MapRoute(
                name: "dangnhapntd",
                url: "dang-nhap-nha-tuyen-dung.html",
                defaults: new { controller = "DangNhapNTD", action = "Index"}
            ).DataTokens.Add("area", "CongThongTinViecLam");

            routes.MapRoute(
                name: "dangkyungvien",
                url: "dang-ky-ung-vien.html",
                defaults: new { controller = "DangKyUngVien", action = "Index"}
            ).DataTokens.Add("area", "CongThongTinViecLam");

            routes.MapRoute(
                name: "dangkyntd",
                url: "dang-ky-nha-tuyen-dung.html",
                defaults: new { controller = "DangKyNTD", action = "Index" }
            ).DataTokens.Add("area", "CongThongTinViecLam");
            
            routes.MapRoute(
               name: "tongquanungvien",
               url: "tong-quan-ung-vien.html",
               defaults: new { controller = "TongQuan", action = "Index" }
           ).DataTokens.Add("area", "UngVien");

            routes.MapRoute(
               name: "hosoungvien",
               url: "ho-so-cua-toi.html",
               defaults: new { controller = "HoSoUngVien", action = "Index" }
           ).DataTokens.Add("area", "UngVien");

            routes.MapRoute(
               name: "vieclamdanop",
               url: "viec-lam-da-nop.html",
               defaults: new { controller = "HoSoUngVienDangUngTuyen", action = "Index" }
           ).DataTokens.Add("area", "UngVien");

            routes.MapRoute(
               name: "vieclamdaluu",
               url: "viec-lam-da-luu.html",
               defaults: new { controller = "ViecLamDangLuuTru", action = "Index" }
           ).DataTokens.Add("area", "UngVien");

            routes.MapRoute(
                name: "tongquannhatuyendung",
                url: "tong-quan-nha-tuyen-dung.html",
                defaults: new { controller = "TongQuanNhaTuyenDung", action = "Index" }
            ).DataTokens.Add("area", "NhaTuyenDung");

            routes.MapRoute(
               name: "thongtincongty",
               url: "thong-tin-cong-ty.html",
               defaults: new { controller = "ThongTinCongTy", action = "Index" }
           ).DataTokens.Add("area", "NhaTuyenDung");

            routes.MapRoute(
               name: "DangTinTuyenDung",
               url: "dang-tin-tuyen-dung.html",
               defaults: new { controller = "DangTinTuyenDung", action = "Index" }
           ).DataTokens.Add("area", "NhaTuyenDung");

            routes.MapRoute(
              name: "HoSoUngTuyen",
              url: "ho-so-ung-tuyen.html",
              defaults: new { controller = "HoSoUngTuyen", action = "Index" }
          ).DataTokens.Add("area", "NhaTuyenDung");

            routes.MapRoute(
              name: "HoSoLuuTru",
              url: "ho-so-luu-tru.html",
              defaults: new { controller = "HoSoLuuTru", action = "Index" }
          ).DataTokens.Add("area", "NhaTuyenDung");

            routes.MapRoute(
             name: "DangXuatCTT",
             url: "dang-xuat.html",
             defaults: new { controller = "LogoutCTT", action = "Index" }
         ).DataTokens.Add("area", "CongThongTinViecLam");

            routes.MapRoute(
            name: "tongquancamnangnghenghiep",
            url: "tong-quan-cam-nang-nghe-nghiep.html",
            defaults: new { controller = "TongQuanCamNang", action = "Index" }
        ).DataTokens.Add("area", "CamNangNgheNghiep");

            routes.MapRoute(
            name: "timkiemcamnangnghenghiep",
            url: "tim-kiem-cam-nang-nghe-nghiep.html",
            defaults: new { controller = "TimKiemCamNang", action = "Index" }
        ).DataTokens.Add("area", "CamNangNgheNghiep");

            routes.MapRoute(
            name: "Root",
            url: "",
            defaults: new { controller = "Root", action = "RedirectToTrangChu" }
        );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "TrangChuCTT", action = "Index", id = UrlParameter.Optional }
            ).DataTokens.Add("area", "CongThongTinViecLam");
        }
    }
}
