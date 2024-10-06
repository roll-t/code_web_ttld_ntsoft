using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using TTLD2024.Areas.DanhMuc.Controllers;
using TTLD2024.Class;
using TTLD2024.DataConnect;
using WEB_DLL;

namespace TTLD2024.Areas.CongThongTinViecLam.Controllers
{
    public class DangKyUngVienController : Controller
    {
        // GET: CongThongTinViecLam/DangKyUngVien
        public ActionResult Index()
        {
            if (NTSSession.GetUserNTD() != null || NTSSession.GetUserUngVien() != null)
            {
                return Redirect("trang-chu.html");
            }
            return View();
        }

        [HttpPost]
        public string LuuNguoiDung(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                /*if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }*/
                if (DungChungController.KiemTraTonTai(data[0].ToString(), "Email", "UngVien"))
                {
                    return NTSThongBao.DaTonTaiEmail();
                }
                if (DungChungController.KiemTraTonTai(data[0].ToString(), "Email", "NhaTuyenDung"))
                {
                    return NTSThongBao.DaTonTaiEmail();
                }
                SqlParameter[] para = {
                    new SqlParameter("@Email", data[0].ToString()),
                    new SqlParameter("@MatMa", WEB_DLL.ntsSecurity._mEncrypt(data[0].ToString() + ";" + data[1].ToString(), "rateAnd2012", true)),
                    new SqlParameter("@HoVaTen", data[2].ToString()),
                    new SqlParameter("@NgayThangNamSinh", data[3].ToString()),
                    new SqlParameter("@GioiTinh", data[4].ToString()),
                    new SqlParameter("@SoDienThoai", data[5].ToString()),
                    new SqlParameter("@MaUngVien", data[6].ToString()),
                    new SqlParameter("@DinhDanh", data[7].ToString()),
                    //new SqlParameter("@DiaChi", data[6].ToString()),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_DangKyUngVien", para);
                duLieu.Tables[0].TableName = "UngVien";
                NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                return NTSThongBao.DangKyThanhCong("ứng viên");
            }
            catch (Exception ex)
            {
                return NTSThongBao.DangKyThatBai("ứng viên");
            }
        }

        [HttpPost]
        public string KiemTraNgay(string chuoiNgay)
        {
            chuoiNgay = chuoiNgay.Replace("-", "/").Trim();
            try
            {
                ExecPermiss ep = new ExecPermiss();
                string[] mangNgay = chuoiNgay.Split('/');
                DateTime.Parse(mangNgay[2] + "/" + mangNgay[1] + "/" + mangNgay[0]);
                ep.Result = true;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                ExecPermiss ep = new ExecPermiss();
                ep.Result = false;
                return JSonHelper.ToJson(ep);
            }
        }
    }
}