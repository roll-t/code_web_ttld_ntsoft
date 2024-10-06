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
    public class DanhMucCamNangNgheNghiepController : Controller
    {
        // GET: CamNangNgheNghiep/DanhMucCamNangNgheNghiep
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string GetCamNangTheoLoai(object[] noidung)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(noidung[0].ToString())),
                    new SqlParameter("@Ma", DungChung.NormalizationString(noidung[1].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllCamNangNgheNghiepByMa", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetCamNangTheoLoaiTop1(string noidung)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@Ma", DungChung.NormalizationString(noidung)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllCamNangNgheNghiepByMa_Top1", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

    }
}