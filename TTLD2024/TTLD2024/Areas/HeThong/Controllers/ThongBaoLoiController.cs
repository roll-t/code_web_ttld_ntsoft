
using TTLD2024.Class;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;

namespace TTLD2024.Areas.HeThong.Controllers
{
    //Author: Phạm Minh Triều
    //Date: 04/01/2023
    //Sumary: Danh mục thông báo lỗi
    public class ThongBaoLoiController : Controller
    {
        // GET: HeThong/ThongBaoLoi
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAll_ThongBaoLoi").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetAllBang()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAll_Bang").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetBangMoi()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAll_BangMoi").Tables[0];
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
                if (data[0].ToString() == "them" && DungChung.KiemTraTonTai(data[1].ToString(), "ThongBaoLoiCode", "ThongBaoLoi"))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                if (data[0].ToString() == "sua" && DungChung.KiemTraTonTaiSua(data[1].ToString(), "ThongBaoLoiCode", "ThongBaoLoi", "ThongBaoLoiID", data[3].ToString()))
                {
                    return NTSThongBao.DaTonTaiMa();
                }

                SqlParameter[] para = {
                    new SqlParameter("@Loai",data[0].ToString()),
                    new SqlParameter("@ThongBaoLoiCode",data[1].ToString()),
                    new SqlParameter("@NoiDung",  data[2].ToString()),
                    new SqlParameter("@ThongBaoLoiID", DungChung.NormalizationGuid(data[3].ToString()))
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinThongBaoLoi", para);


                if (data[0].ToString() == "them")
                {
                    duLieu.Tables[0].TableName = "ThongBaoLoi";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                    {
                        duLieu.Tables[0].TableName = "ThongBaoLoi";
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
                    new SqlParameter("@ThongBaoLoiID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetThongBaoLoiTheoID", para).Tables[0];
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
                    new SqlParameter("@ThongBaoLoiID",DungChung.NormalizationGuid(id)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_ThongBaoLoi", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "ThongBaoLoi";
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