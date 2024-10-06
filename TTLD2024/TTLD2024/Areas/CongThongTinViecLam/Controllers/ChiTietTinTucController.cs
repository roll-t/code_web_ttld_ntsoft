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
    public class ChiTietTinTucController : Controller
    {
        // GET: CongThongTinViecLam/ChiTietTinTuc
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string getChiTietTinTuc(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ma", DungChung.NormalizationString(ma)),
                };
                DataTable datatable = SqlHelper.ExecuteDataset(
                        DungChung.GetConnectionStrings(), "Proc_GetAllChiTietTinTuc_CTTByID", para).Tables[0];
                return JSonHelper.ToJson(datatable);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpPost]
        public string getTinNoiBat()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetTinNoiBat_CTTBacLieu", null).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
    }
}