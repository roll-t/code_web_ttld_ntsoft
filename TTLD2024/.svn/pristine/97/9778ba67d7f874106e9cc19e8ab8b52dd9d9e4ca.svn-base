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
namespace TTLD2024.Areas.UngVien.Controllers
{
    public class TongQuanController : Controller
    {
        // GET: UngVien/TongQuan
        public ActionResult Index()
        {
            if (NTSSession.GetUserUngVien() == null)
            {
                return Redirect("dang-nhap-ung-vien.html");
            }
            return View();
        }
        [HttpPost]
        public string getSoLuongViecLamDaNop()
        {
            try
            {
                if (NTSSession.GetUserUngVien().UngVienID == null)
                {
                    return "2"; // chưa đăng nhập
                }
                else
                {
                    ExecPermiss ep = new ExecPermiss();
                    string id = NTSSession.GetUserUngVien().UngVienID.ToString();
                    SqlParameter[] para = {
                        new SqlParameter("@UserID", DungChung.NormalizationGuid(id)),
                    };
                    DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetSoLuongViecLamDaNop_CTT", para).Tables[0];
                    ep.Result = duLieu;
                    return JSonHelper.ToJson(ep);
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string getSoLuongViecLamPhuHop()
        {
            try
            {
                if (NTSSession.GetUserUngVien().UngVienID == null)
                {
                    return "2"; // chưa đăng nhập
                }
                else
                {
                    ExecPermiss ep = new ExecPermiss();
                    string id = NTSSession.GetUserUngVien().UngVienID.ToString();
                    SqlParameter[] para = {
                        new SqlParameter("@UserID", DungChung.NormalizationGuid(id)),
                    };
                    DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetSoLuongViecLamPhuHop_CTT", para).Tables[0];
                    ep.Result = duLieu;
                    return JSonHelper.ToJson(ep);
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public  string getSoLuongViecLamDaLuu()
        {
            try
            {
                if (NTSSession.GetUserUngVien().UngVienID == null)
                {
                    return "2"; // chưa đăng nhập
                }
                else
                {
                    ExecPermiss ep = new ExecPermiss();
                    string id = NTSSession.GetUserUngVien().UngVienID.ToString();
                    SqlParameter[] para = {
                        new SqlParameter("@UserID", DungChung.NormalizationGuid(id)),
                    };
                    DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetSoLuongViecLamDaLuu_CTT", para).Tables[0];
                    ep.Result = duLieu;
                    return JSonHelper.ToJson(ep);
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public  string getSoLuongNhaTuyenDungDaLuu()
        {
            try
            {
                if (NTSSession.GetUserUngVien().UngVienID == null)
                {
                    return "2"; // chưa đăng nhập
                }
                else
                {
                    ExecPermiss ep = new ExecPermiss();
                    string id = NTSSession.GetUserUngVien().UngVienID.ToString();
                    SqlParameter[] para = {
                        new SqlParameter("@UserID", DungChung.NormalizationGuid(id)),
                    };
                    DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetSoLuongNhaTuyenDungDaLuu_CTT", para).Tables[0];
                    ep.Result = duLieu;
                    return JSonHelper.ToJson(ep);
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string getCongTyMoiNhat()
        {
            try
            {
                string id = NTSSession.GetUserUngVien().UngVienID.ToString();
                SqlParameter[] para = {
                        new SqlParameter("@UserID", DungChung.NormalizationGuid(id)),
                    };
                ExecPermiss ep = new ExecPermiss();
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllCongTyBanSeThich_CTT", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string getCongTyDangTheoDoi()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                string id = NTSSession.GetUserUngVien().UngVienID.ToString();
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllNhaTuyenDungDaLuu_CTT", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string getHoSoDinhKem()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllHoSoDinhKem_CTT", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string getHoSoUngVienID()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetHoSoUngVienID_CTT", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XoaTheoDoiCongTy(string ID)
        {
            try
            {               
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_DeleteCongTyTheoDoi_CTT", para).Tables[0];
                ExecPermiss ep = new ExecPermiss
                {
                    Err = false,
                    Msg = "Bỏ theo dõi nhà tuyển dụng thành công!"
                };
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                ExecPermiss ep = new ExecPermiss
                {
                    Err = false,
                    Msg = "Bỏ theo dõi nhà tuyển dụng không thành công!"
                };
                return JSonHelper.ToJson(ep);
            }
        }
    }
}