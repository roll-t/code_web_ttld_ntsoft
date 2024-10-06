using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;

namespace TTLD2024.Areas.HeThong.Controllers
{
    public class NhatKyDangNhapController : Controller
    {
        // GET: HeThong/DanhSachNguoiDung
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string GetAllDanhSachNguoiDung()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDanhSachNguoiDung", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetAllNhatKySuDung(string DonViID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@DonViID",DungChung.NormalizationGuid(DonViID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllNhatKySuDung", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LoadDonVi()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDonVi", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

       
        [HttpPost]
        public string GetDonVi(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    NTSThongBao.KhongCoQuyenTruyCap();
                }
                //SqlFunction sqlFun = new SqlFunction(NTSSession.get);
                if (ID == "" || ID == null)
                {
                    DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDanhSachNguoiDung", null).Tables[0];
                    var customerData = duLieu.AsEnumerable();
                    ep.Result = duLieu;
                }
                else
                {
                    SqlParameter[] para = {
                    new SqlParameter("@DonViID",DungChung.NormalizationGuid(ID)),
                };
                    DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDanhSachByDonVi", para).Tables[0];
                    var customerData = duLieu.AsEnumerable();
                    ep.Result = duLieu;
                }
                
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                 return NTSThongBao.CoLoiXayRa(ex);
            }
        }
    }
}