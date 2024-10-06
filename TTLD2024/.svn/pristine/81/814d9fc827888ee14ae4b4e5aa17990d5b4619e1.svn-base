using TTLD2024.Class;
using System;
using System.Data;
using System.Text;
using System.Web.Mvc;

namespace TTLD2024.Controllers
{
    public class LeftBarController : Controller
    {
        // GET: Menu
        private StringBuilder sb_ = new StringBuilder();

        public PartialViewResult Index()
        {
            return PartialView(LoadMainMenu_lv1());
        }
        public DataTable GetMenu()
        {
            return LoadMainMenu_lv1();
        }

        public string CheckOpen(string AbsolutePath, string motherID)
        {
            DataTable dtData = LoadMainMenu_child(motherID);
            sb_.Clear();
            if (dtData != null && dtData.Rows.Count > 0)
            {
                foreach (DataRow row in dtData.Rows)
                {
                    if (row["DuongDan"].ToString().ToLower() == AbsolutePath.ToLower())
                    {
                        sb_.Append("active open nts-menu");
                    }
                    else
                    {
                        DataTable dtData1 = LoadMainMenu_child(row["MenuID"].ToString());
                        if (dtData1 != null && dtData1.Rows.Count > 0)
                        {
                            foreach (DataRow row1 in dtData1.Rows)
                            {
                                if (row1["DuongDan"].ToString().ToLower() == AbsolutePath.ToLower())
                                {
                                    sb_.Append("active open nts-menu");
                                }
                                else
                                {
                                    DataTable dtData2 = LoadMainMenu_child(row1["MenuID"].ToString());
                                    if (dtData2 != null && dtData2.Rows.Count > 0)
                                    {
                                        foreach (DataRow row2 in dtData2.Rows)
                                        {
                                            if (row2["DuongDan"].ToString().ToLower() == AbsolutePath.ToLower())
                                            {
                                                sb_.Append("active open nts-menu");
                                            }
                                            else
                                            {
                                                DataTable dtData3 = LoadMainMenu_child(row2["MenuID"].ToString());
                                                if (dtData3 != null && dtData3.Rows.Count > 0)
                                                {
                                                    foreach (DataRow row3 in dtData3.Rows)
                                                    {
                                                        if (row3["DuongDan"].ToString().ToLower() == AbsolutePath.ToLower())
                                                        {
                                                            sb_.Append("active open nts-menu");
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return sb_.ToString();
        }
        public string ChildMenu(string AbsolutePath, string motherID)
        {
            StringBuilder sb = new StringBuilder();
            DataTable dtData = LoadMainMenu_child(motherID);
            sb.Append("");
            string html = "";
            if (dtData != null && dtData.Rows.Count > 0)
            {
                html += "<ul class=\"submenu\">";
                foreach (DataRow row in dtData.Rows)
                {
                    if (row["DuongDan"].ToString().ToLower() == AbsolutePath.ToLower())
                    {
                        html += "<li class=\"active nts-menu\"> <a  href=\"" + row["DuongDan"] + "\" " + (row["MenuButton"].ToString() == "True" ? "onclick=\"OnClickMenu('" + row["DuongDan"] + "')\"" : "") + ">";

                        //ViewBag.ChucNang = row["DuongDan"];
                    }
                    else
                    {
                        if (row["DuongDan"].ToString() == "" || row["DuongDan"].ToString() == null)
                        {
                            html += "<li class=\""+ CheckOpen(AbsolutePath, row["MenuID"].ToString()) + "\"><a class=\" dropdown-toggle\" href=\"" + row["DuongDan"] + "\">";
                        }
                        else
                        {
                            html += "<li  class=\"" + CheckOpen(AbsolutePath, row["MenuID"].ToString()) + "\"><a href =\"" + row["DuongDan"] + "\" " + (row["MenuButton"].ToString() == "True" ? "onclick=\"OnClickMenu('" + row["DuongDan"] + "')\"" : "") + ">";
                        }
                    }
                    html += "<div style='width: 24px;float: left;text-align: center;'><i class='menu-icon " + row["Icon"] + "' ></i></div>";
                    html += "" + row["TenMenu"];
                    if (row["DuongDan"].ToString() == "" || row["DuongDan"].ToString() == null)
                    {
                        html += "<b class=\"arrow fa-solid fa-chevron-right\"></b></a>";
                    }
                    else
                    {
                        html += "</a>";
                    }
                    html += ChildMenu(AbsolutePath, row["MenuID"].ToString());
                    html += "</li>";
                }
                html += "</ul>";
            }

            sb.Append(html);
            return sb.ToString();
        }


        public DataTable LoadMainMenu_child(string motherID)
        {
            try
            {
                SqlFunction sqlFun2 = new SqlFunction(NTSSession.GetConnectionString1());
                System.Data.SqlClient.SqlConnectionStringBuilder connBuilder = new System.Data.SqlClient.SqlConnectionStringBuilder();
                connBuilder.ConnectionString = NTSSession.GetConnectionString1();
                string database1 = connBuilder.InitialCatalog;
                string dieuKien = "", dieuKien2 = "";
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());

                return sqlFun.GetData(@"SELECT * FROM (SELECT
                  [MenuID]
                  ,[TenMenu]
                  ,DuongDan = isnull(DuongDan,'')
                  ,[Icon]
                  ,[MenuID_cha]
                  ,[SapXep]
                  ,[MenuButton]
                  FROM [dbo].[Menu]   WHERE  isnull(HienThi,0) = '1' and isnull(MenuButton,0) = '0' and MenuID_cha = '" + motherID + "' AND MenuID IN (SELECT MenuID FROM dbo.UserPermiss  where UserID = N'" + NTSSession.GetUser().UserID + @"')
                 ) AS bang1 ORDER BY  SapXep");
            }
            catch (Exception)
            {
                return null;
            }
        }

        public DataTable LoadMainMenu_lv1()
        {
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                return sqlFun.GetData(@"SELECT
                  [MenuID]
                  ,[TenMenu]
                  ,DuongDan = isnull(DuongDan,'')
                  ,[Icon]
                  ,[MenuID_cha]
                  ,[SapXep]
                  ,[MenuButton]
                  FROM [dbo].[Menu] WHERE   isnull(HienThi,0) = '1' and  isnull(MenuButton,0) = '0' and MenuID_cha IS NULL AND MenuID IN (SELECT MenuID FROM dbo.UserPermiss  where  UserID = N'" + NTSSession.GetUser().UserID + @"')
                  ORDER BY SapXep,TenMenu");
            }
            catch (Exception)
            {
                return null;
            }
        }

        public DataTable LoadMainMenu_CTT_UngVien()
        {
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                try
                {
                    string ID = NTSSession.GetUserUngVien().UngVienID.ToString();
                    return sqlFun.GetData(@"SELECT
                  [MenuCTTID]
                  ,[TenMenuCTT]
                  ,DuongDan = isnull(DuongDan,'')
                  ,[Icon]
                  ,[MenuID_cha]
                  ,[SapXep]
                  ,[MenuButton]
                  FROM [dbo].[MenuCTT] WHERE   isnull(HienThi,0) = '1' and  isnull(MenuButton,0) = '0' and MenuID_cha IS NULL 
				AND (SELECT MenuGroupID from MenuGroupCTT WHERE MaMenuGroup = '01') = MenuGroupID
                  ORDER BY SapXep,TenMenuCTT");
                }
                catch (Exception)
                {
                    return sqlFun.GetData(@"SELECT
                  [MenuCTTID]
                  ,[TenMenuCTT]
                  ,DuongDan = isnull(DuongDan,'')
                  ,[Icon]
                  ,[MenuID_cha]
                  ,[SapXep]
                  ,[MenuButton]
                  FROM [dbo].[MenuCTT] WHERE   isnull(HienThi,0) = '1' and  isnull(MenuButton,0) = '0' and MenuID_cha IS NULL 
				AND (SELECT MenuGroupID from MenuGroupCTT WHERE MaMenuGroup = '02') = MenuGroupID
                  ORDER BY SapXep,TenMenuCTT");
                }
                
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}