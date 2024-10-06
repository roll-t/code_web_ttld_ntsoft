using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TTLD2024.Areas.DanhMuc.Controllers
{
    public class ChuongController : Controller
    {
        // GET: DanhMuc/Chuong
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllChuong", null).Tables[0];
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
        public string LoadDuLieuSua(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllChuongByID", para).Tables[0];
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
                if (data[0].ToString() == "them" && DungChungController.KiemTraTonTai(data[2].ToString(), "MaChuong", "Chuong"))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                if (data[0].ToString() == "sua" && DungChungController.KiemTraTonTaiSua(data[2].ToString(), "MaChuong", "Chuong", "ChuongID", data[1].ToString()))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@ChuongID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@MaChuong", data[2].ToString()),
                    new SqlParameter("@TenChuong", data[3].ToString()),
                    new SqlParameter("@DienGiai", data[4].ToString()),
                    new SqlParameter("@TrangThai", DungChung.NormalizationBoolean(data[5].ToString())),
                    new SqlParameter("@CapChuongID", data[6].ToString()),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinChuong", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "Chuong";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                    {
                        duLieu.Tables[0].TableName = "Chuong";
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
                DataTable getMa = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllChuongByID", para).Tables[0];
                string[] array = new string[0];
                ExecPermiss thongbao = DungChungController.KiemTraXoaDT_nvarchar("MaChuong", "", getMa.Rows[0]["MaChuong"].ToString(), "Chuong", array);
                if (int.Parse(thongbao.Msg) > 0)
                {
                    return JSonHelper.ToJson(thongbao);
                }
                else
                {
                    DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_Chuong", para);
                    if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                    {
                        duLieu.Tables[0].TableName = "Chuong";
                        NTSSecurity.ghiLogs(duLieu.Tables[0], "Xoa");
                        return NTSThongBao.XoaThanhCong();
                    }
                    else
                    {
                        return NTSThongBao.ThongBaoXuLyNhieuDong(NTSThongBao.XOA, duLieu.Tables[0].Rows.Count);
                    }
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetCapChuong()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllCapChuong_Combo", null).Tables[0];
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