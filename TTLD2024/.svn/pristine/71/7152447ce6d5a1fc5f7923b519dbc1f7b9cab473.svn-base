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
    public class ChiTietVanBanController : Controller
    {
        // GET: CongThongTinViecLam/ChiTietVanBan
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string getChiTietVanBan(string ma)
        {
            try
            {
                SqlParameter[] para = {
            new SqlParameter("@MaVanBan", DungChung.NormalizationString(ma)),
        };
                DataTable datatable = SqlHelper.ExecuteDataset(
                        DungChung.GetConnectionStrings(), "Proc_GetAllChiTietVanBan_CTTByID", para).Tables[0];
                return JSonHelper.ToJson(datatable);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpPost]
        public string getLoaiVB(string[] dulieu)
        {
            try
            {
                SqlParameter[] para = {
            new SqlParameter("@LoaiVanBan", DungChung.NormalizationGuid(dulieu[0])) ,
             new SqlParameter("@VanBanID", DungChung.NormalizationGuid(dulieu[1])),
        };
                DataTable datatable = SqlHelper.ExecuteDataset(
                        DungChung.GetConnectionStrings(), "Proc_GetAllLoaiVBCungLoai_CTT", para).Tables[0];
                return JSonHelper.ToJson(datatable);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpPost]
        public string getVanBanLienQuan()
        {
            try
            {
                DataTable datatable = SqlHelper.ExecuteDataset(
                        DungChung.GetConnectionStrings(), "Proc_GetVanBanLienQuan_CTT", null).Tables[0];
                return JSonHelper.ToJson(datatable);
            }
            catch (Exception ex)
            {
                return null;
            }
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
    }
}