using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;

namespace TTLD2024.Areas.BaoCao.Controllers
{
    public class DungChungController : Controller
    {
        // GET: BaoCao/DungChung
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string getThongTinBaoCao(string BaoCaoID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@BaoCaoID",DungChung.NormalizationGuid(BaoCaoID))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_ThongTinBaoCaoByID", para).Tables[0];
                ep.Result = duLieu;

                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        internal static bool KiemTraTonTaiSua(string v1, string v2, string v3, string v4, string v5)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public string getTTDonVi()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                ep.Result = NTSSession.GetDonVi();

                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        internal static bool KiemTraTonTai(string v1, string v2, string v3)
        {
            throw new NotImplementedException();
        }

        internal static string FormatValue(string v)
        {
            throw new NotImplementedException();
        }
    }
}