using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace TTLD2024.Areas.CongThongTinViecLam.Controllers
{
    public class LogoutCTTController : Controller
    {
        // GET: CongThongTinViecLam/Logout
        public ActionResult Index()
        {
            try
            {
                //(new SqlFunction(NTSSession.GetConnectionString1())).ExeCuteNonQuery("UPDATE dbo.Users SET Online=0 WHERE UserID='" + NTSSession.GetUser().UserID.ToString() + "'");
            }
            catch
            {

            }
            try
            {
                HttpContext.Session.Abandon();
                HttpContext.Session.Clear();
                HttpContext.Session.RemoveAll();
                HttpContext.Session.Remove("lanDangNhap");
            }
            catch (Exception ex)
            {
            }
            Response.Redirect("/trang-chu.html");
            return View();
        }
    }
}