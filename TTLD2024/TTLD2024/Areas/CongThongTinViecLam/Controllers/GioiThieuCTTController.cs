using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using TTLD2024.Class;

namespace TTLD2024.Areas.CongThongTinViecLam.Controllers
{
    public class GioiThieuCTTController : Controller
    {
        // GET: CongThongTinViecLam/GioiThieu
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string GetAllCoCauToChuc()
        {
            try
            {
                DataTable tab = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetAllCoCauToChuc_CTT", null).Tables[0];
                return JSonHelper.ToJson(tab);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(ex);
            }
        }

        [HttpPost]
        public string getTinNoiBat()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetTinNoiBat_CTTBacLieu", null).Tables[0];
                ep.Result = dt;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(ex);
            }
        }
    }
}