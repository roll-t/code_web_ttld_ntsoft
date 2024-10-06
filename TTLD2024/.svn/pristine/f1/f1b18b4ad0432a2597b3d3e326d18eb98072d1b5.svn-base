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
    public class TraCuuUngVienController : Controller
    {
        // GET: CongThongTinViecLam/TraCuuUngVien
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string GetDanhSachUngVien(string[] data)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@NoiDung", DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@NganhNgheID", DungChung.NormalizationGuid(data[1]).ToString()),
                    new SqlParameter("@DiaDiemLamViecID", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@GioiTinh", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@MucLuong", DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@CapBac", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@KinhNghiem", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@LoaiSapXep", DungChung.NormalizationNumber(data[7].ToString()))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetDanhSachUngVien", para).Tables[0];
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