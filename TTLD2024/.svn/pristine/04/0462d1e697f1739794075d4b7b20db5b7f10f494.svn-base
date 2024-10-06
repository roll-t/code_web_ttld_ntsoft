using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Areas.DanhMuc.Controllers;
using TTLD2024.Class;

namespace TTLD2024.Areas.DanhMuc.Controllers
{
    public class DiaBanHanhChinhController : Controller
    {
        // GET: DanhMuc/DiaBanHanhChinh
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string GetAll(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID", DungChung.NormalizationGuid(data[2].ToString())),
                     new SqlParameter("@LoaiDiaBan", DungChung.NormalizationGuid(data[3].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllDiaBanHC", para).Tables[0];
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
        public string LuuThongTin(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                if (data[0].ToString() == "them" && DungChungController.KiemTraTonTai(data[1].ToString(), "MaDiaBanHC", "DiaBanHC"))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                if (data[0].ToString() == "sua" && DungChungController.KiemTraTonTaiSua(data[1].ToString(), "MaDiaBanHC", "DiaBanHC", "DiaBanHCID", data[6].ToString()))
                {
                    return NTSThongBao.DaTonTaiMa();
                }

                SqlParameter[] para = {
                    new SqlParameter("@Loai",data[0].ToString()),
                    new SqlParameter("@MaDiaBanHC",data[1].ToString()),
                    new SqlParameter("@TenDiaBanHC",  data[2].ToString()),
                    new SqlParameter("@DiaBanHCID_Cha", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@DienGiai",  data[4].ToString()),
                    new SqlParameter("@TrangThai", DungChung.NormalizationBoolean(data[5].ToString())),
                    new SqlParameter("@DiaBanHCID", DungChung.NormalizationGuid(data[6].ToString())),
                     new SqlParameter("@LoaiDV", DungChung.NormalizationGuid(data[7].ToString())),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinDiaBanHC", para);

                if (data[0].ToString() == "them")
                {
                    duLieu.Tables[0].TableName = "DiaBanHC";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                    {
                        duLieu.Tables[0].TableName = "DiaBanHC";
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
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@DiaBanHCID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDiaBanHC_ByID", para).Tables[0];
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
                    new SqlParameter("@DiaBanHCID",DungChung.NormalizationGuid(id)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_DiaBanHC", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "DiaBanHC";
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

        [HttpPost]
        public string GetDiaBanHC(string id, string loai)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), CommandType.Text,
                "SELECT DiaBanHCID,MaDiaBanHC,TenDiaBan FROM dbo.DiaBanHC WHERE ISNULL(TrangThai,0) = 1 " +
                "AND DiaBanHCID != '" + DungChung.NormalizationGuid(id) + "' And LoaiDiaBanID = (select LoaiDiaBanID from LoaiDiaBan where MaLoaiDiaBan = '" + (loai.ToString()) + "') ORDER BY len(MaDiaBanHC), MaDiaBanHC", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string getLoaiDiaBan()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), CommandType.Text,
                "SELECT LoaiDiaBanID,MaLoaiDiaBan,TenLoaiDiaBan FROM dbo.LoaiDiaBan WHERE ISNULL(TrangThai,0) = 1 ORDER BY len(MaLoaiDiaBan), MaLoaiDiaBan", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string KiemTraDiaBanHC(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                DataTable tab = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), CommandType.Text,
                "SELECT 1 from DiaBanHC where DiaBanHCID_Cha = '" + DungChung.NormalizationGuid(id) + "'", null).Tables[0];
                string kt = "0";
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());

                if (tab.Rows.Count > 0)
                {
                    kt = "1";
                }
                ep.Result = kt;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }

        }

    }
}