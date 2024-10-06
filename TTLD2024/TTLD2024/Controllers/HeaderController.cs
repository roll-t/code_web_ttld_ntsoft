using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;
using WEB_DLL;

namespace TTLD2024.Controllers
{
    public class HeaderController : Controller
    {
        // GET: Header
        public PartialViewResult Index()
        {
            try
            {
                PageInfo p = new PageInfo();
                try
                {
                    if (NTSSession.GetUser() == null)
                    {
                        RedirectToAction("hethong", "login");
                    }

                    //Nếu không được cấp quyền xem
                    //if (!p.Permiss.Xem)
                    //    Response.Redirect(p.KhongCoQuyenTruyCap);
                }
                catch (Exception ex)
                {
                    Response.Redirect("/404.html");
                }
                ViewBag.TieuDeTrang = p.NoiDungTieuDe.ToUpper();
                ViewBag.lblNam = NTSSession.GetNamSudung().ToString();
                //ViewBag.lblDonVi = NTSSession.GetDonVi().MaDonVi.ToString() + " - " + NTSSession.GetDonVi().TenDonVi.ToString();
                ViewBag.hdfHeader_kyBaoCao = NTSSession.GetKyBaoCao();

                //if (sqlFun.GetOneStringField(@"SELECT top 1 TenNhanVien FROM dbo.NhanVien WHERE NhanVienID=N'" + NTSSession.GetUser().NhanVienID.ToString() + "'").ToString() != "")
                //    ViewBag.lblUser_us = sqlFun.GetOneStringField(@"SELECT TenNhanVien FROM dbo.NhanVien WHERE NhanVienID=N'" + NTSSession.GetUser().NhanVienID.ToString() + "'").ToString();
                //else
                //    ViewBag.lblUser_us = NTSSession.GetUser().TenDangNhap.ToString();

                ViewBag.lblNam = NTSSession.GetNamSudung().ToString();
                ViewBag.lblDonVi = NTSSession.GetDonVi().MaDonVi.ToString() + " - " + NTSSession.GetDonVi().TenDonVi.ToString();
                //ViewBag.lblTuNgayHeader = NTSSession.GetDonVi().NgayDauKy.Value.ToString("dd/MM/yyyy");
                //ViewBag.lblDenNgayHeader = NTSSession.GetDonVi().NgayCuoiKy.Value.ToString("dd/MM/yyyy");
                ViewBag.lblKeyMaHoa = NTSSession.GetKeyMaHoa();
                ViewBag.hdfHeader_kyBaoCao = NTSSession.GetKyBaoCao();
                ViewBag.HoVaTenUser = NTSSession.GetUser().HoVaTen.ToString();
                ViewBag.MaDonVi = NTSSession.GetDonVi().MaDonVi.ToString();
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                if (sqlFun.GetOneStringField(@"SELECT top 1 TenNhanVien FROM dbo.NhanVien WHERE NhanVienID=N'" + NTSSession.GetUser().NhanVienID.ToString() + "'").ToString() != "")
                    ViewBag.lblUser_us = sqlFun.GetOneStringField(@"SELECT TenNhanVien FROM dbo.NhanVien WHERE NhanVienID=N'" + NTSSession.GetUser().NhanVienID.ToString() + "'").ToString();
                else
                    ViewBag.lblUser_us = NTSSession.GetUser().TenDangNhap.ToString();
                //ViewBag.lblTuNgayHeader = NTSSession.GetDonVi().NgayDauKy.Value.ToString("dd/MM/yyyy");
                //ViewBag.lblDenNgayHeader = NTSSession.GetDonVi().NgayCuoiKy.Value.ToString("dd/MM/yyyy");
                ViewBag.hdfHeader_kyBaoCao = NTSSession.GetKyBaoCao();
                //SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());

            }
            catch (Exception)
            {
                RedirectToAction("hethong", "login");
            }
            return PartialView();
        }
        public DataTable GetCauHinhWebSite()
        {
            try
            {
                string _vConnectstring = ntsDataConnect._mGetConnectStringFromFile2();
                string _dataName = _vConnectstring.Split(';')[1].Replace("Initial Catalog=", "");
                _vConnectstring = _vConnectstring.Replace(_vConnectstring.Split(';')[1], "Initial Catalog=master");
                SqlFunction _vSql = new SqlFunction(_vConnectstring);
                _vConnectstring = _vConnectstring.Replace("master", _dataName.ToLower());
                _vSql = new SqlFunction(_vConnectstring);
                DataTable _vdt = _vSql.GetData(@"select TenDonVi=ISNULL(TenDonVi,''),DiaChi=ISNULL(DiaChi,''),
                SoDT=ISNULL(SoDT,''),Fax=ISNULL(Fax,''),Email=ISNULL(Email,''),Web=ISNULL(Web,''),TenPMVietTat=ISNULL(TenPMVietTat,''),
                TenPhanMem = (select TenDonVi=ISNULL(TenDonVi,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1),
                TenPMVietTatPM = (select TenPMVietTat=ISNULL(TenPMVietTat,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1),
                PhienBanPM = (select PhienBan=ISNULL(PhienBan,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1),
                Banner = (select Banner=ISNULL(Banner,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1)    
                from CauHinhWebsite where MaCauHinh='02' and ISNULL(DangSD,0)=1");
                var customerData = _vdt.AsEnumerable();
                return _vdt;
            }
            catch (Exception ex)
            {
                return new DataTable();
            }
        }

        public PartialViewResult GetInfoUser()
        {
            try
            {
                ViewBag.TenUser = NTSSession.GetUserUngVien().HoVaTen.ToString();
            }
            catch (Exception)
            {
                ViewBag.TenUser = NTSSession.GetUserNTD().TenToChuc.ToString();
            }
            return PartialView();
        }

    }
}