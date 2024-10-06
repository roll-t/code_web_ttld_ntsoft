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
    public class ThongTinCongTyController : Controller
    {
        // GET: NhaTuyenDung/ThongTinCongTy
        public ActionResult Index()
        {
            if (NTSSession.GetUserNTD() == null)
            {
                return Redirect("dang-nhap-nha-tuyen-dung.html");
            }
            return View();
        }
        [HttpPost]
        public string LuuThongTin(object[] data)
        {
            try
            {                
                SqlParameter[] para = {
                    new SqlParameter("@NhaTuyenDungID" ,DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@TenCongTy",  DungChung.NormalizationString(data[1].ToString())),
                    new SqlParameter("@MaSoThue", DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@TinhID_KhuVuc", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@DiaChi",  DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@SoDienThoai", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@Email", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@NganhNgheID", DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@LoaiHinhDNID", DungChung.NormalizationGuid(data[8].ToString())),
                    new SqlParameter("@QuyMoLaoDongID", DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@Website", DungChung.NormalizationString(data[10].ToString())),
                    new SqlParameter("@GioiThieu", DungChung.NormalizationString(data[11].ToString())),
                    new SqlParameter("@UrlBanDo", DungChung.NormalizationString(data[12].ToString())),
                    new SqlParameter("@LogoCongTy", DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@HinhAnh", DungChung.NormalizationString(data[14].ToString())),
                    new SqlParameter("@Banner", DungChung.NormalizationString(data[15].ToString())),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserNTD().NhaTuyenDungID.ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_LuuThongTinNhaTuyenDung", para).Tables[0];
                //Returning Json Data
                if (data[0].ToString() == "")
                {
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    return NTSThongBao.CapNhatThanhCong();
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LoadDuLieuSua()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserNTD().NhaTuyenDungID.ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetNhaTuyenDungTheoUser", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LoadThongTinTaiKhoan()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserNTD().NhaTuyenDungID.ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetTaiKhoanNhaTuyenDungTheoUser", para).Tables[0];
                if(duLieu.Rows.Count > 0)
                {
                    string matKhau;
                    matKhau = WEB_DLL.ntsSecurity._mDecrypt(duLieu.Rows[0]["MatMa"].ToString(), "rateAnd2012", true);
                    ep.Result = matKhau;
                }
                else
                {
                    ep.Result = false;
                }
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
            
        [HttpPost]
        public string luuMatKhauMoi(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserNTD().NhaTuyenDungID.ToString())),
                     new SqlParameter("@MatMa", WEB_DLL.ntsSecurity._mEncrypt(data[0].ToString() + ";" + data[1].ToString(), "rateAnd2012", true)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_ThayDoiMauKhau_CTT", para);
                if (duLieu.Tables[0].Rows.Count > 0)
                {
                    ep.Result = true;
                    ep.Msg = "Thay đổi mật khẩu thành công!";
                }
                else
                {
                    ep.Result = false;
                    ep.Msg = "Thay đổi mật khẩu không thành công!";
                }
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string Update_TrangThaiNhaTuyenDung(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),                   
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_Update_TrangThaiNhaTuyenDung_GuiXacThuc", para);
                //Returning Json Data
                ExecPermiss ep = new ExecPermiss
                {
                    Err = false,
                    Msg = "Gửi phê duyệt thành công!"
                };
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                ExecPermiss ep = new ExecPermiss
                {
                    Err = true,
                    Msg = "Gửi xét duyệt không thành công!_" + ex
                };
                return JSonHelper.ToJson(ep); 
            }
        }
        [HttpPost]
        public string CapNhatTTThongTinCty()
        {
            try
            {
                
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserNTD().NhaTuyenDungID.ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_CapNhatThongTinCty_CTT", para).Tables[0];
                //Returning Json Data
                return NTSThongBao.CapNhatThanhCong();
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
    }
}