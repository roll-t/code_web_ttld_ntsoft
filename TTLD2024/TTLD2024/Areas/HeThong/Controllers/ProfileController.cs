using TTLD2024.Class;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace TTLD2024.Areas.HeThong.Controllers
{
    public class ProfileController : Controller
    {
        // GET: HeThong/Profile
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string GetDataUser()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllProfile", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuThongTin(string[] Data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@HoVaTen",Data[0].ToString()),
                    new SqlParameter("@Email",  Data[1].ToString()),
                    new SqlParameter("@SoDienThoai",  Data[2].ToString()),
                    new SqlParameter("@MenuID_HienThi",DungChung.NormalizationGuid(Data[3].ToString())),
                    new SqlParameter("@Avatar",Data[4].ToString() ),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                    new SqlParameter("@NgaySinh",DungChung.NormalizationDateTime(Data[5].ToString())),
                    new SqlParameter("@GioiTinh",Data[6].ToString()),
                    new SqlParameter("@CCCD",Data[7].ToString()),
                    new SqlParameter("@DiaChi",Data[8].ToString())
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Update_ThongTinUser", para).Tables[0];
                if (duLieu.Rows[0][0].ToString() == "1")
                {
                    duLieu.TableName = "Users";
                    NTSSecurity.ghiLogs(duLieu, "Sua");
                    return NTSThongBao.CapNhatThanhCong();
                }
                else
                {
                    return NTSThongBao.ThongBaoXuLyNhieuDong(NTSThongBao.CAPNHAT, duLieu.Rows.Count);
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LuuMatKhau(string[] Data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                DataTable tab_ = sqlFun.GetData("SELECT MatMa FROM dbo.Users WHERE UserID='" + DungChung.NormalizationGuid(NTSSession.GetUser().UserID) + "'  AND MatMa='" + Data[0].ToString() + "'");
                if (tab_.Rows.Count > 0)
                {
                    SqlParameter[] para = {
                        new SqlParameter("@MatMa",Data[1].ToString()),
                        new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                    };
                    DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Update_MatMaUser", para).Tables[0];
                    //Returning Json Data
                    return NTSThongBao.CapNhatThanhCong();
                }
                else
                {
                    return NTSThongBao.ThaoTacThatBai();
                }

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LayDanhSachMenu()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@UserID",DungChung.NormalizationGuid(NTSSession.GetUser().UserID))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAll_ProfileTheoUsers", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }

        }
       
        [HttpPost]
        public string CapNhatLichSuThaoTac(string NhatKyThaoTacID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    ep.Msg = "Bạn không có quyền truy cập!";
                    return JSonHelper.ToJson(ep);
                }
                SqlParameter[] para = {
                    new SqlParameter("@NhatKyThaoTacID", DungChung.NormalizationGuid(NhatKyThaoTacID))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "CapNhatNhatKyThaoTac", para).Tables[0];
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {

                return JSonHelper.ToJson("");
            }
        }
        [HttpPost]
        public string CapNhatTrangThaiDaXemNhatKy(string NhatKyThaoTacID, string Loai)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    ep.Msg = "Bạn không có quyền truy cập!";
                    return JSonHelper.ToJson(ep);
                }
                SqlParameter[] para = {
                      new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                      new SqlParameter("@Loai", DungChung.NormalizationNumber(Loai)),
                      new SqlParameter("@NhatKyThaoTacID", DungChung.NormalizationGuid(NhatKyThaoTacID))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_CapNhatTrangThaiDaXemNhatKy", para).Tables[0];
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {

                return JSonHelper.ToJson("");
            }
        }
    }
}