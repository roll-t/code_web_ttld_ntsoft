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
    public class TimKiemCamNangController : Controller
    {
        // GET: CamNangNgheNghiep/TimKiemCamNang
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string GetCamNangTheoNoiDungTimKiem(object[] noidung)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(noidung[0].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllCamNangNgheNghiepByNoiDungTimKiem", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string getCamNangNew()
        {
            try
            {
                DataTable datatable = SqlHelper.ExecuteDataset(
                        DungChung.GetConnectionStrings(), "Proc_GetCamNangNgheNghiepNew", null).Tables[0];
                return JSonHelper.ToJson(datatable);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpPost]
        public string GetCamNangTheoTuKhoaTimKiem(object[] noidung)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(noidung[0].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllCamNangNgheNghiepByTuKhoa", para).Tables[0];
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