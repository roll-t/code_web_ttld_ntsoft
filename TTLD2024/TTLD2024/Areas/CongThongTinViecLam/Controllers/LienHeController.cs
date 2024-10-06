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
    public class LienHeController : Controller
    {
        // GET: CongThongTinViecLam/LienHe
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string getThongTinLienHe()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetAllThongTinLienHe_CTTBacLieu", null).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
    }
}