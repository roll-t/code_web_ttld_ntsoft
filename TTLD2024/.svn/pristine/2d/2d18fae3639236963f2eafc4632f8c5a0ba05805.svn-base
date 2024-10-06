using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace TTLD2024.Areas.CongThongTin.Controllers
{
    public class TrangChuController : Controller
    {
        // GET: CongThongTin/TrangChu
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string getMenu()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                //SqlFunction sqlFun = new SqlFunction(HttpContext.Current.Session.get);
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetMenuChucNang", null).Tables[0];
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
        public  string getTinTucChiTiet()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                DataTable dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetTinTucNoiBat", null).Tables[0];
                var customerData = dt.AsEnumerable();
                ep.Result = dt;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public  string getBanner()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                DataTable dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetBanner", null).Tables[0];
                var customerData = dt.AsEnumerable();
                ep.Result = dt;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public  string getTinTuc_TrangChu()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                DataTable dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetTinTuc_TrangChu", null).Tables[0];
                var customerData = dt.AsEnumerable();
                ep.Result = dt;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public  string getWebsiteLienKet()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                DataTable dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetWebsiteLienKet", null).Tables[0];
                var customerData = dt.AsEnumerable();
                ep.Result = dt;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public  string getFooterDiaChi()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                DataTable dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetDiaChiFooter_CTT", null).Tables[0];
                var customerData = dt.AsEnumerable();
                ep.Result = dt;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public  string getFooterDiaChi_CTy()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                DataTable dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetDiaChiCTy_CTT", null).Tables[0];
                var customerData = dt.AsEnumerable();
                ep.Result = dt;
                return JSonHelper.ToJson(ep);
            }            
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
    }
}