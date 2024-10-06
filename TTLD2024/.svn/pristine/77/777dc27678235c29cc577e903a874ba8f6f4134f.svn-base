using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;

namespace TTLD2024.Areas.HeThong.Controllers
{
    public class MenuController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Lấy Menu code của menu cha 
        /// </summary>
        /// <param name="MenuID_cha"></param>
        /// <returns>Trả về chuỗi rỗng nếu như không có Menu cha</returns>
        public string GetMenuCodeOfMenuParent(string MenuID_cha)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                if (MenuID_cha != null)
                {
                    SqlParameter[] para = {
                    new SqlParameter("@MenuID_cha", DungChung.NormalizationGuid(MenuID_cha)),
                    };
                    var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_GetMenuTheoMenuID_Cha", para);
                    ep.Result = duLieu;
                    return JSonHelper.ToJson(ep);
                }
                else
                {
                    return JSonHelper.ToJson("");
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }

        }
        public string LayMenuTheoID(string MenuID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {

                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                SqlParameter[] para = {
                    new SqlParameter("@MenuID", DungChung.NormalizationGuid(MenuID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetMenuTheoID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch(Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LayToanBoMenu()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"SELECT *,TenMenu_Cha = (select m.TenMenu+'('+m.MenuCode+')' from menu m where m.MenuID = Menu.MenuID_cha) FROM dbo.Menu order by menucode,SapXep").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
             "SELECT MenuID,MenuCode,TenMenu FROM dbo.Menu ORDER BY MenuCode,SapXep").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        
        [HttpPost]
        public string LayDanhSachMenuGroup()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
             "SELECT MenuGroupID,MenuGroupCode,TenMenuGroup FROM MenuGroup WHERE ISNULL(DangSD, 0) = 1 order by MenuGroupCode, Len(MenuGroupCode)").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
       
        public string ThemMenu(object[] obj)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                try
                {
                    obj[5] = Convert.ToInt32(obj[5]);
                }catch
                {
                    obj[5] = 0;
                }
                SqlConnection connection = new SqlConnection(NTSSession.GetConnectionString1());
                SqlCommand cmd = new SqlCommand()
                {
                    CommandType = CommandType.StoredProcedure,
                    Connection = connection,
                    CommandText = "Insert_Menu"
                };
                cmd.Parameters.Add(new SqlParameter("@MenuCode", obj[0].ToString()));
                cmd.Parameters.Add(new SqlParameter("@TenMenu", obj[1].ToString()));
                cmd.Parameters.Add(new SqlParameter("@DuongDan", obj[2].ToString()));
                cmd.Parameters.Add(new SqlParameter("@Icon", obj[3].ToString()));
                //Nếu record có MenuID_cha
                if (obj[4] != null && obj[4].ToString() != "")
                {
                    obj[4] = new Guid(Convert.ToString(obj[4]));
                    cmd.Parameters.Add(new SqlParameter("@MenuID_cha", obj[4]));
                }
                // Truyền null nếu không có
                else
                {
                    cmd.Parameters.Add(new SqlParameter("@MenuID_cha", DBNull.Value));
                }
                cmd.Parameters.Add(new SqlParameter("@SapXep", obj[5]));
                cmd.Parameters.Add(new SqlParameter("@MenuButton", obj[6]));
                cmd.Parameters.Add(new SqlParameter("@LaMenuCha_Button", obj[7]));
                cmd.Parameters.Add(new SqlParameter("@HienThi", obj[8]));
                cmd.Parameters.Add(new SqlParameter("@DuongDanTuyetDoi", obj[9].ToString()));
                cmd.Parameters.Add(new SqlParameter("@NoiDungTieuDe", obj[10].ToString()));
                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();
                return JSonHelper.ToJson("Added");

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        public string CapNhatMenu(object[] obj, string id)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                Guid MenuID = new Guid(id);
                //MenuID_cha : uniqueindentifer
                //SapXep : int
                obj[5] = Convert.ToInt32(obj[5]);
                SqlConnection connection = new SqlConnection(NTSSession.GetConnectionString1());
                SqlCommand cmd = new SqlCommand()
                {
                    CommandType = CommandType.StoredProcedure,
                    Connection = connection,
                    CommandText = "Edit_Menu"
                };
                cmd.Parameters.Add(new SqlParameter("@MenuID", MenuID));
                cmd.Parameters.Add(new SqlParameter("@MenuCode", obj[0].ToString()));
                cmd.Parameters.Add(new SqlParameter("@TenMenu", obj[1].ToString()));
                cmd.Parameters.Add(new SqlParameter("@DuongDan", obj[2].ToString()));
                cmd.Parameters.Add(new SqlParameter("@Icon", obj[3].ToString()));
                if (obj[4] != null && obj[4]!= "")
                {
                    obj[4] = new Guid(Convert.ToString(obj[4]));
                    cmd.Parameters.Add(new SqlParameter("@MenuID_cha", obj[4]));
                }
                // Truyền null nếu không có
                else
                {
                    cmd.Parameters.Add(new SqlParameter("@MenuID_cha", DBNull.Value));
                }
                cmd.Parameters.Add(new SqlParameter("@SapXep", obj[5]));
                cmd.Parameters.Add(new SqlParameter("@MenuButton", obj[6]));
                cmd.Parameters.Add(new SqlParameter("@LaMenuCha_Button", obj[7]));
                cmd.Parameters.Add(new SqlParameter("@HienThi", obj[8]));
                cmd.Parameters.Add(new SqlParameter("@DuongDanTuyetDoi", obj[9].ToString()));
                cmd.Parameters.Add(new SqlParameter("@NoiDungTieuDe", obj[10].ToString()));
                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();
                return JSonHelper.ToJson("Edited");
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
                    new SqlParameter("@MenuID",DungChung.NormalizationGuid(id)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_Menu", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "Menu";
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