
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
    public class ChiTietNhaTuyenDungController : Controller
    {
        // GET: CongThongTinViecLam/ChiTietNhaTuyenDung
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string GetCongViecDangTuyenDung(string[] data)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@Ma", DungChung.NormalizationString(data[0])),
                    new SqlParameter("@TenCongViec", DungChung.NormalizationString(data[1])),
                };
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetDanhSachTinTuyenDungTheoCongTy", para).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string GetTrangThaiNhaTuyenDung(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaNhaTuyenDung", DungChung.NormalizationString(ma)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetTrangThaiNTD", para).Tables[0];
                return JSonHelper.ToJson(duLieu);

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string LayIDNhaTuyenDung(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaNhaTuyenDung", DungChung.NormalizationString(ma)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetIDNhaTuyenDung_CTT", para).Tables[0];
                return JSonHelper.ToJson(duLieu);

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string GetSoLuongNhaTuyenDung(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaNhaTuyenDung", DungChung.NormalizationString(ma)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetSoLuongTinTuyenDungTheoID_NTD", para).Tables[0];
                return JSonHelper.ToJson(duLieu);

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string GetSoLuongTheoDoiNhaTuyenDung(string id)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetSoLuongTheoDoiTinTuyenDung", para).Tables[0];
                return JSonHelper.ToJson(duLieu);

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
    }
}