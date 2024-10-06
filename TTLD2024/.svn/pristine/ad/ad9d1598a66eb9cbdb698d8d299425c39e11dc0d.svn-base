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
    public class ChucNangController : Controller
    {
        // GET: CongThongTin/ChucNang
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public  string GetALL()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return JSonHelper.ToJson("Bạn không có quyền truy cập!");
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAll_ChucNang", null).Tables[0];
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
        public string getChucNang(string data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = { new SqlParameter("@ChucNangID", DungChung.NormalizationGuid(data)) };
                DataTable datatable = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetComboChucNang", para).Tables[0];
                ep.Result = datatable;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public  string LuuThongTin(object[] data)
        {
            try
            {
                int LoaiCTT = 1;
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                if (data[5].ToString() == "them" && DungChung.KiemTraTonTai(data[0].ToString(), "MaChucNang", "ChucNang"))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                if (data[5].ToString() == "sua" && DungChung.KiemTraTonTaiSua(data[0].ToString(), "MaChucNang", "ChucNang", "ChucNangID", data[4].ToString()))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                string Loai = data[5].ToString();
                if (data[6].ToString() == "True")
                {
                    LoaiCTT = 2; //menu trang việc làm
                }
                if(data[7].ToString() == "True")
                {
                    LoaiCTT = 3; //menu cẩm nang
                }
                SqlParameter[] para = {
                     new SqlParameter("@ThaoTac", data[5].ToString()),
                    new SqlParameter("@ChucNangID", DungChung.NormalizationGuid(data[4].ToString())),
                    new SqlParameter("@TenChucNang",data[1].ToString()),
                    new SqlParameter("@DuongDanUrl",data[2].ToString()),
                    new SqlParameter("@MaCha", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@MaChucNang",data[0].ToString()),
                    new SqlParameter("@Loai",DungChung.NormalizationNumber(LoaiCTT)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTin_ChucNang", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "ChucNang";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                    {
                        duLieu.Tables[0].TableName = "ChucNang";
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
                    new SqlParameter("@ChucNangID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetChucNangID", para).Tables[0];
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
                    new SqlParameter("@ChucNangID",DungChung.NormalizationGuid(id)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_ChucNang", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "ChucNang";
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