
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;
using TTLD2024.Areas.DanhMuc.Controllers;

namespace TTLD2024.Areas.CongThongTinViecLam.Controllers
{
    public class DangKyNTDController : Controller
    {
        // GET: CongThongTinViecLam/DangKyNTD
        public ActionResult Index()
        {
            if (NTSSession.GetUserNTD() != null || NTSSession.GetUserUngVien() != null)
            {
                return Redirect("trang-chu.html");
            }
            return View();
        }

        [HttpPost]
        public string LuuNhaTuyenDung(object[] data)
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
                    new SqlParameter("@TenToChuc", data[2].ToString()),
                    new SqlParameter("@MaSoThue", data[3].ToString()),
                    new SqlParameter("@SoDienThoai", data[4].ToString()),
                    new SqlParameter("@DiaChi", data[5].ToString()),
                    new SqlParameter("@MaNhaTuyenDung", data[6].ToString()),
                    new SqlParameter("@DinhDanh", data[7].ToString()),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_DangKyNhaTuyenDung", para);
                duLieu.Tables[0].TableName = "NhaTuyenDung";
                NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                return NTSThongBao.DangKyThanhCong("nhà tuyển dụng");
            }
            catch (Exception ex)
            {
                return NTSThongBao.DangKyThatBai("nhà tuyển dụng");
            }
        }
    }
}