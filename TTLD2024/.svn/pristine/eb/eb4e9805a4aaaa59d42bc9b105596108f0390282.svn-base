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
    public class TinTucCTTController : Controller
    {
        // GET: CongThongTinViecLam/TinTucCTT
        public ActionResult Index()
        {
            return View();
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

        [HttpPost]
        public string getTinTuc_TimKiem(string[] noidung)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@NoiDung" , noidung[0].ToString()),
                    new SqlParameter("@LoaiTinTucID" ,DungChung.NormalizationGuid (noidung[1].ToString())),


                };
                DataTable dt = SqlHelper.ExecuteDataset(DungChung. GetConnectionStrings(), "Proc_GetTinTucCTT_TimKiem", para).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string getLoaiTinTuc()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung. GetConnectionStrings(), "Proc_GetComBoLoaiTinTuc_CTT", null).Tables[0];
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