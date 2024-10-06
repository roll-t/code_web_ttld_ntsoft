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
    public class ChiTietViecLamController : Controller
    {
        // GET: CongThongTinViecLam/ChiTietViecLam
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string GetTinTuyenDungTheoID(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaViecTimNguoi", DungChung.NormalizationString(ma)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetTinDangTuyenTheoID", para).Tables[0];
                return JSonHelper.ToJson(duLieu);

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string GetTinTuyenDungLienQuanTheoNganhNghe(object[] data)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@Ma", DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@TinTuyenDungID", DungChung.NormalizationGuid(data[1].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetDanhSachTinTuyenDung_LienQuan", para).Tables[0];
                return JSonHelper.ToJson(duLieu);

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
    }
}