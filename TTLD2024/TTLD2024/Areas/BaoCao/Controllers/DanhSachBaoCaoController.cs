using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;

namespace TTLD2024.Areas.BaoCao.Controllers
{
    public class DanhSachBaoCaoController : Controller
    {
        // GET: BaoCao/DanhSachBaoCao
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string GetAllNhom()
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
                    new SqlParameter("@UserID", NTSSession.GetUser().UserID),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllNhomBaoCao", para).Tables[0];
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                ep.Err = true;
                ep.Logs = ex.ToString();
                return JSonHelper.ToJson(ep);
            }
        }

        [HttpPost]
        public string GetAllNhomCon(string ID)
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
                    new SqlParameter("@UserID", NTSSession.GetUser().UserID),
                    new SqlParameter("@ID", DungChung.NormalizationGuid(ID.ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllNhomCon", para).Tables[0];
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                ep.Err = true;
                ep.Logs = ex.ToString();
                return JSonHelper.ToJson(ep);
            }
        }

        [HttpPost]
        public string GetAllBC(string ID)
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
                    new SqlParameter("@UserID", NTSSession.GetUser().UserID),
                    new SqlParameter("@ID", DungChung.NormalizationGuid(ID.ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllMenuBaoCao", para).Tables[0];
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                ep.Err = true;
                ep.Logs = ex.ToString();
                return JSonHelper.ToJson(ep);
            }
        }

        [HttpPost]
        public string GetAllBaoCaoDaLuu()
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
                    new SqlParameter("@UserID", NTSSession.GetUser().UserID),
                    new SqlParameter("@DonViID", NTSSession.GetDonVi().DonViID),
                    new SqlParameter("@NamNS", NTSSession.GetNamSudung()),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllBaoCaoDaluu", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                ep.Err = true;
                ep.Logs = ex.ToString();
                return JSonHelper.ToJson(ep);
            }
        }

        [HttpPost]
        public string XoaLuuBaoCao(string id)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@LuuBaoCaoID",DungChung.NormalizationGuid(id)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_LuuBaoCao", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "LuuBaoCao";
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
        public string LuuThongTin_BaoCaoDaLuu(object[] data)
        {
            if (!NTSSecurity.Validate())
            {
                return JSonHelper.ToJson("-1_Bạn không có quyền truy cập!");
            }
            try
            {
                string paht = "";
                paht = data[4].ToString();
                if (!data[4].ToString().Contains("/VanBan/"))
                {
                    if (!System.IO.Directory.Exists(Server.MapPath("~/VanBan/" + NTSSession.GetDonVi().MaDonVi + "/" + NTSSession.GetUser().UserGroupCode + "/LuuBaoCao/")))
                    {
                        System.IO.Directory.CreateDirectory(Server.MapPath("~/VanBan/" + NTSSession.GetDonVi().MaDonVi + "/" + NTSSession.GetUser().UserGroupCode + "/LuuBaoCao/"));
                    }
                    System.IO.File.Copy(Server.MapPath("~" + data[4].ToString().Replace("docx", "pdf").Replace("~", "")), Server.MapPath("~/VanBan/" + NTSSession.GetDonVi().MaDonVi + "/" + NTSSession.GetUser().UserGroupCode + "/LuuBaoCao/" + Path.GetFileName(Server.MapPath("~" + data[4].ToString().Replace("docx", "pdf").Replace("~", "")))), true);
                    paht = "~/VanBan/" + NTSSession.GetDonVi().MaDonVi + "/" + NTSSession.GetUser().UserGroupCode + "/LuuBaoCao/" + Path.GetFileName(Server.MapPath("~" + data[4].ToString().Replace("docx", "pdf").Replace("~", "")));
                }
                SqlParameter[] para = {
                    new SqlParameter("@Loai", data[0].ToString()),
                    new SqlParameter("@BaoCaoDaLuuID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@TenBaoCao", DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@KyBaoCao", DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@PathFile", DungChung.NormalizationString(paht)),
                    new SqlParameter("@GhiChu", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@DonViID", NTSSession.GetDonVi().DonViID),
                    new SqlParameter("@UserID", NTSSession.GetUser().UserID),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTin_BaoCaoDaLuu", para).Tables[0];
                if (duLieu.Rows.Count > 0)
                {
                    if (data[0].ToString() == "them")
                    {
                        return JSonHelper.ToJson("1_Lưu báo cáo thành công!");
                    }
                    else
                    {
                        return JSonHelper.ToJson("1_Sửa báo cáo thành công!");
                    }
                }
                else
                {
                    return JSonHelper.ToJson("0_Thao tác thất bại!");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("0_Thao tác thất bại!_" + ex.Message);
            }
        }


        [HttpPost]
        public string GetAll_BaoCaoDaLuu()
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
                    new SqlParameter("@DonViID", NTSSession.GetDonVi().DonViID),
                    new SqlParameter("@UserID", NTSSession.GetUser().UserID),
                    new SqlParameter("@CSDL1", NTSSession.GetConnectionString1().Split(';')[1].Replace("Initial Catalog=", "")),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDSBaoCaoDaLuu", para).Tables[0];
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                ep.Err = true;
                ep.Logs = ex.ToString();
                return JSonHelper.ToJson(ep);
            }
        }

        [HttpPost]
        public string GetBaoCaoDaLuuTheoID(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@BaoCaoDaLuuID",DungChung.NormalizationGuid(ma)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetBaoCaoDaLuu_ByID", para).Tables[0];
                //Returning Json Data

                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string LayDuLieu(string ID)
        {
            try
            {
                SqlParameter[] param = {
                        new SqlParameter("@DonViID", NTSSession.GetDonVi().DonViID),
                    };
                DataSet ds = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetthietlapHeThong", param);
                return JSonHelper.ToJson(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpPost]
        public string XoaBaoCaoDaLuu(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun2 = new SqlFunction(NTSSession.GetConnectionString1());

                if (!NTSSecurity.Validate())
                {
                    ep.Msg = "Bạn không có quyền truy cập!";
                    return JSonHelper.ToJson(ep);
                }
                string duongDan = sqlFun2.GetOneStringField(@"SELECT ISNULL(PathFile,'') FROM dbo.BaoCaoDaLuu WHERE BaoCaoDaLuuID='" + DungChung.NormalizationGuid(ID) + "'");
                SqlParameter[] para = {
                    new SqlParameter("@BaoCaoDaLuuID",DungChung.NormalizationGuid(ID)),
                };
                DataTable tab = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_BaoCaoDaLuu", para).Tables[0];
                if (tab.Rows.Count > 0)
                {
                    if (duongDan != "")
                    {
                        if (System.IO.File.Exists(Server.MapPath(duongDan)))
                        {
                            System.IO.File.Delete(Server.MapPath(duongDan));
                        }
                    }
                    return JSonHelper.ToJson("1_Xóa dữ liệu thành công!");
                }
                else
                {
                    return JSonHelper.ToJson("0_Xóa dữ liệu không thành công!");
                }

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("0_Xóa dữ liệu không thành công!");
            }
        }

    }
}