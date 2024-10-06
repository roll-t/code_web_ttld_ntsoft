using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace TTLD2024.Areas.CongThongTin.Controllers
{
    public class ThietLapWebSiteController : Controller
    {
        // GET: CongThongTin/ThietLapWebSite
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string GetAll()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return JSonHelper.ToJson("Bạn không có quyền truy cập!");
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllCauHinhWebSite_CTT", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson("Tải dữ liệu thất bại");
            }
        }
        [HttpPost]
        public string GetAllLoaiTinTuc()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return JSonHelper.ToJson("Bạn không có quyền truy cập!");
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "GetAllLoaiTinTuc", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("Tải dữ liệu thất bại");
            }
        }
        [HttpPost]
        public string LuuThongTin(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                if (data[0].ToString() == "them" && DungChung.KiemTraTonTai(data[1].ToString(), "MaCauHinhWebSite", "CauHinhWebSite_CTT"))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                if (data[0].ToString() == "sua" && DungChung.KiemTraTonTaiSua(data[1].ToString(), "MaCauHinhWebSite", "CauHinhWebSite_CTT", "CauHinhWebSiteID", data[10].ToString()))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@ThaoTac",DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@maCauHinh",DungChung.NormalizationString(data[1].ToString())),
                    new SqlParameter("@tenDonVi",DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@diaChi",DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@soDT", DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@Fax", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@Email", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@banner", data[7].ToString()),
                    new SqlParameter("@web", DungChung.NormalizationString(data[8].ToString())),
                    new SqlParameter("@TrangThai",DungChung.NormalizationBoolean(data[9].ToString())),
                    new SqlParameter("@maCauHinhID", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@Facebook", DungChung.NormalizationString(data[11].ToString())),
                    new SqlParameter("@Youtube", DungChung.NormalizationString(data[12].ToString())),
                    new SqlParameter("@GioiThieu", DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@GiayPhepVanHanh", DungChung.NormalizationString(data[14].ToString())),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTin_CauHinhWebSite", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "CauHinhWebSite_CTT";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                    {
                        duLieu.Tables[0].TableName = "CauHinhWebSite_CTT";
                        NTSSecurity.ghiLogs(duLieu.Tables[0], "Sua");
                        return NTSThongBao.CapNhatThanhCong();
                    }
                    else
                    {
                        return NTSThongBao.ThongBaoXuLyNhieuDong(NTSThongBao.CAPNHAT, duLieu.Tables[0].Rows.Count);
                    }
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LoadDuLieuSua(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@CauHinhWebSiteID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCauHinhWebSite_CTTByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XoaDuLieu(string id)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@CauHinhWebSiteID",DungChung.NormalizationGuid(id)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_CauHinhWebSite_CTT", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "Delete_CauHinhWebSite_CTT";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Xoa");
                    return NTSThongBao.XoaThanhCong();
                }
                else
                {
                    return NTSThongBao.ThongBaoXuLyNhieuDong(NTSThongBao.XOA, duLieu.Tables[0].Rows.Count);
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
    }
}
