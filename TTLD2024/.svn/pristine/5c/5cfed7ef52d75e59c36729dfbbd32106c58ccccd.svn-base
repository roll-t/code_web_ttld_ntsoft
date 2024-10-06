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
    public class TinTucController : Controller
    {
        // GET: CongThongTin/TinTuc
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAll_TinTuc", null).Tables[0];
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
                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@ThaoTac" ,DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@NgayTao" ,DungChung.NormalizationDateTime(data[1].ToString())),
                    new SqlParameter("@NguoiTao",  data[2].ToString()),
                    new SqlParameter("@LoaiTinTuc", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TuKhoa",data[4].ToString()),
                    new SqlParameter("@TieuDe",  data[5].ToString()),
                    new SqlParameter("@HinhAnh", data[6].ToString()),
                    new SqlParameter("@NoiDung", data[7].ToString()),
                    new SqlParameter("@TrangThai", DungChung.NormalizationBoolean(data[8].ToString())),
                    new SqlParameter("@TinTucID", DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@NguoiThaoTac", DungChung.NormalizationGuid(NTSSession.GetUser().UserID.ToString())),
                    new SqlParameter("@DinhDanh",  data[10].ToString()),
                    new SqlParameter("@NoiDungTomTat",  data[11].ToString()),
                    new SqlParameter("@LaNoiBat", DungChung.NormalizationBoolean(data[12].ToString())),
                    new SqlParameter("@MaTinTuc", DungChung.NormalizationString(data[13].ToString()))
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTin_TinTuc", para);
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
                    new SqlParameter("@TinTucID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetTinTucByID", para).Tables[0];
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
                    new SqlParameter("@TinTucID",DungChung.NormalizationGuid(id)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_TinTuc", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "TinTuc";
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