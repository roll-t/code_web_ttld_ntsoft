using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TTLD2024.Areas.HeThong.Controllers
{
    public class BaoCaoController : Controller
    {
        // GET: HeThong/BaoCao
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string GetAll()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllBaoCao").Tables[0];
                SqlFunction sqlFunc = new SqlFunction(NTSSession.GetConnectionString2());
                var customerData = duLieu.AsEnumerable();

                for (int i = 0; i < duLieu.Rows.Count; i++)
                {
                    string tenDoiTuongSuDung = "";
                    string DoiTuongSuDung = duLieu.Rows[i]["DoiTuongApDung"].ToString().Replace("[", "").Replace("]", "").Replace("\"", "");
                    string[] arrNhomDT = DoiTuongSuDung.Split(',');

                    for (int j = 0; j < arrNhomDT.Count(); j++)
                    {
                        tenDoiTuongSuDung += sqlFunc.GetOneStringField("SELECT UserGroupName FROM UserGroup where UserGroupID=N'" + arrNhomDT[j] + "'") + ", ";
                    }
                    if (tenDoiTuongSuDung != "")
                    {
                        tenDoiTuongSuDung = tenDoiTuongSuDung.Remove(tenDoiTuongSuDung.Length - 2, 2);
                    }
                    duLieu.Rows[i]["DoiTuongApDung"] = tenDoiTuongSuDung;
                    duLieu.AcceptChanges();
                }
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
                //if (data[0].ToString() == "them" && DungChungController.KiemTraTonTai(data[1].ToString(), "MaBaoCao", "BaoCao"))
                //{
                //    return NTSThongBao.DaTonTaiMa();
                //}
                //if (data[0].ToString() == "sua" && DungChungController.KiemTraTonTaiSua(data[1].ToString(), "MaDanhMucBC", "DanhMucBaoCao", "DanhMucBCID", data[8].ToString()))
                //{
                //    return NTSThongBao.DaTonTaiMa();
                //}

                SqlParameter[] para = {
                    new SqlParameter("@Loai",data[0].ToString()),
                    new SqlParameter("@MaBaoCao",data[1].ToString()),
                    new SqlParameter("@KyHieuMauBieu",  data[2].ToString()),
                    new SqlParameter("@TenBaoCao",  data[3].ToString()),
                    new SqlParameter("@NhomBaoCaoID", DungChung.NormalizationGuid(data[4].ToString())),
                    new SqlParameter("@DuongDan",  data[5].ToString()),
                    new SqlParameter("@GhiChu", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@DangAD", DungChung.NormalizationBoolean(data[7].ToString())),
                    new SqlParameter("@BaoCaoID", DungChung.NormalizationGuid(data[8].ToString())),
                    new SqlParameter("@DoiTuongApDung", DungChung.NormalizationString(data[9].ToString())),

                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinBaoCao", para);

                if (data[0].ToString() == "them")
                {
                    duLieu.Tables[0].TableName = "BaoCao";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                    {
                        duLieu.Tables[0].TableName = "BaoCao";
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
                    new SqlParameter("@BaoCaoID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetBaoCaoTheoID", para).Tables[0];
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
                    new SqlParameter("@ID",DungChung.NormalizationGuid(id)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_BaoCao", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "BaoCao";
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
        public string GetNhomBaoCao()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
                "SELECT NhomBaoCaoID,MaNhomBaoCao,TenNhomBaoCao FROM dbo.NhomBaoCao WHERE ISNULL(TrangThai,1) = 1 ORDER BY MaNhomBaoCao").Tables[0];
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