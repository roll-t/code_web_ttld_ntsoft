using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;

namespace TTLD2024.Areas.CongThongTinViecLam.Controllers
{
    public class QuenMatKhauController : Controller
    {
        // GET: CongThongTinViecLam/QuenMatKhau
        public ActionResult Index()
        {
            if (NTSSession.GetUserNTD() != null || NTSSession.GetUserUngVien() != null)
            {
                return Redirect("trang-chu.html");
            }
            return View();
        }


    }
}