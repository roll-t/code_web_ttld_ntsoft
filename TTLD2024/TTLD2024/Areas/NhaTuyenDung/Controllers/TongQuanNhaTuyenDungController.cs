using ClosedXML.Excel;
using Cong.Class;
using Newtonsoft.Json;
using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Globalization;
using System.Text.RegularExpressions;

namespace TTLD2024.Areas.NhaTuyenDung.Controllers
{
    public class TongQuanNhaTuyenDungController : Controller
    {
        // GET: NhaTuyenDung/TongQuan
        public ActionResult Index()
        {
            if (NTSSession.GetUserNTD() == null)
            {
                return Redirect("dang-nhap-nha-tuyen-dung.html");
            }
            return View();
        }

        [HttpPost]
        public string GetLogoCompany()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                SqlParameter[] para = {
                    new SqlParameter("@NhaTuyenDungID" , DungChung.NormalizationGuid(NTSSession.GetUserNTD().NhaTuyenDungID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetThongTin_NhaTuyenDungCTT_ByNhaTuyenDungID", para).Tables[0];
                var customerData = duLieu.AsEnumerable();

                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetTrangThaiTinDang()
        {
            try                
            {
                ExecPermiss ep = new ExecPermiss();
                SqlParameter[] para = {
                    new SqlParameter("@UserID" , DungChung.NormalizationGuid(NTSSession.GetUserNTD().NhaTuyenDungID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAll_ThongTinNhaTuyenDung", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
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