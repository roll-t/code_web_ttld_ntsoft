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
    public class TraCuuViecLamController : Controller
    {
        // GET: CongThongTinViecLam/TraCuuViecLam
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
                    new SqlParameter("@KhuVuc", DungChung.NormalizationString(data[0])),
                    new SqlParameter("@TenCongViec", DungChung.NormalizationString(data[1])),
                    new SqlParameter("@LoaiSapXep", DungChung.NormalizationNumber(data[2])),
                    new SqlParameter("@MucLuong", DungChung.NormalizationString(data[3])),
                    new SqlParameter("@CapBac", DungChung.NormalizationString(data[4])),
                    new SqlParameter("@KinhNghiem", DungChung.NormalizationString(data[5])),
                    new SqlParameter("@HinhThuc", DungChung.NormalizationString(data[6])),
                    new SqlParameter("@TrinhDo", DungChung.NormalizationString(data[7])),
                    new SqlParameter("@DoiTuongUuTien", DungChung.NormalizationString(data[8])),
                    new SqlParameter("@MaNganhKinhTe", DungChung.NormalizationString(data[9])),
                    new SqlParameter("@NganhNgheID", DungChung.NormalizationString(data[10])),
                    new SqlParameter("@UserID", NTSSession.GetUserNTD() == null ? (NTSSession.GetUserUngVien() == null ? DungChung.NormalizationGuid("") : NTSSession.GetUserUngVien().UngVienID) : NTSSession.GetUserNTD().NhaTuyenDungID),
                };
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetDanhSachTinTuyenDung_TraCuu", para).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string GetSoLuongViecLamTheoDiaBan(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetSoLuongViecLamTheoDiaBan", para).Tables[0];
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