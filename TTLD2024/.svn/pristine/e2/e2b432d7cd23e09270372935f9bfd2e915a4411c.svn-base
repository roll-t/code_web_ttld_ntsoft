using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using TTLD2024.Class;

namespace TTLD2024.Areas.CongThongTinViecLam.Controllers
{
    public class VanBanCTTController : Controller
    {
        // GET: CongThongTinViecLam/VanBanCTT
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string getVanBan()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetVanBan_CTTBacLieu", null).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string getVanBanNew()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetVanBanNew_CTTBacLieu", null).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string getVanBan_TimKiem(string noidung)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@NoiDung" , (noidung.ToString()))
                };
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetVanBan_TimKiem", para).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
    }
}