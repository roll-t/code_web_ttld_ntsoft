
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
    public class TraCuuNhaTuyenDungController : Controller
    {
        // GET: CongThongTinViecLam/TraCuuNhaTuyenDung
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string GetSoLuongNhaTuyenDung(string[] data)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@TenCongTy", DungChung.NormalizationString(data[0])),
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[1])),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetSoLuongNhaTuyenDung", para).Tables[0];
                return JSonHelper.ToJson(duLieu);

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string GetAllNhaTuyenDung(string[] data)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@TenCongTy", DungChung.NormalizationString(data[0])),
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[1])),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetAllNhaTuyenDung_TraCuu", para).Tables[0];
                duLieu.Columns.Add("DaDangNhap", typeof(string));
                for (int i = 0; i < duLieu.Rows.Count; i++)
                {
                    if (NTSSession.GetUser() == null)
                    {
                        duLieu.Rows[i]["DaDangNhap"] = "0";
                    }
                    else
                    {
                        duLieu.Rows[i]["DaDangNhap"] = "1";
                    }
                }
                return JSonHelper.ToJson(duLieu);

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string GetNhaTuyenDungTheoID(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaNhaTuyenDung", DungChung.NormalizationString(ma)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetNhaTuyenDung_XemNhanh", para).Tables[0];
                return JSonHelper.ToJson(duLieu);

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

    }
}