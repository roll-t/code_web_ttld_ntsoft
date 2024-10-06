using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;

namespace TTLD2024.Areas.CamNangNgheNghiep.Controllers
{
    public class ChiTietCamNangController : Controller
    {
        // GET: CamNangNgheNghiep/ChiTietCamNang
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string getChiTietCamNang(string noiDung)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ma", DungChung.NormalizationString(noiDung)),
                };
                DataTable datatable = SqlHelper.ExecuteDataset(
                        DungChung.GetConnectionStrings(), "Proc_GetNoiDungCamNangNgheNghiep", para).Tables[0];
                return JSonHelper.ToJson(datatable);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpPost]
        public string getCamNangCungLoai(string dinhDanh)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@DinhDanh", DungChung.NormalizationString(dinhDanh)),
                };
                DataTable datatable = SqlHelper.ExecuteDataset(
                        DungChung.GetConnectionStrings(), "Proc_GetCamNangNgheNghiepCungLoai", para).Tables[0];
                return JSonHelper.ToJson(datatable);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpPost]
        public string GetTinTuyenDung_MoiNhat()
        {
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetTinTuyenDung_MoiNhat", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string GetTinTuyenDung_LuongCao()
        {
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetTinTuyenDung_LuongCao", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
    }
}