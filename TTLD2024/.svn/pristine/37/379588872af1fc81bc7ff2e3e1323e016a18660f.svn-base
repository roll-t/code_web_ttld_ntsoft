using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TTLD2024.Areas.CongThongTin.Controllers
{
    public class LoaiTinTucController : Controller
    {
        // GET: CongThongTin/LoaiTinTuc
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string GetALL()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return JSonHelper.ToJson("Bạn không có quyền truy cập!");
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAll_LoaiTinTuc", null).Tables[0];
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
        public string getLoaiTinTuc(string data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = { new SqlParameter("@LoaiTinTucID", DungChung.NormalizationGuid(data)) };
                DataTable datatable = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetComboLoaiTinTuc", para).Tables[0];
                ep.Result = datatable;
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
                if (data[6].ToString() == "them" && DungChung.KiemTraTonTai(data[7].ToString(), "MaLoaiTinTuc", "LoaiTinTuc"))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                if (data[6].ToString() == "sua" && DungChung.KiemTraTonTaiSua(data[7].ToString(), "MaLoaiTinTuc", "LoaiTinTuc", "LoaiTinTucID", data[5].ToString()))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                string Loai = data[6].ToString();                
                SqlParameter[] para = {
                     new SqlParameter("@ThaoTac",data[6].ToString()),
                    new SqlParameter("@LoaiTinTucID", DungChung.NormalizationGuid(data[5].ToString())),
                    new SqlParameter("@TenLoaiTinTuc",data[0].ToString()),
                    new SqlParameter("@LoaiTinTucID_Cha", DungChung.NormalizationGuid(data[8].ToString())),
                    new SqlParameter("@TuKhoa", data[1].ToString()),
                    new SqlParameter("@MoTa",data[2].ToString()),
                    new SqlParameter("@DinhDanh",data[3].ToString()),
                    new SqlParameter("@TrangThai",DungChung.NormalizationBoolean(data[4].ToString())),
                    new SqlParameter("@MaLoaiTinTuc", data[7].ToString()),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTin_LoaiTinTuc", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "LoaiTinTuc";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                    {
                        duLieu.Tables[0].TableName = "LoaiTinTuc";
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
                    new SqlParameter("@LoaiTinTucID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetLoaiTinTucID", para).Tables[0];
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
                    new SqlParameter("@LoaiTinTucID",DungChung.NormalizationGuid(id)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_LoaiTinTuc", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "LoaiTinTuc";
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