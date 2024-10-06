using TTLD2024.Class;
using System;
using System.Data;
using System.Text;
using System.Web.Mvc;

namespace TTLD2024.Controllers
{
    public class NavbarController : Controller
    {
        private StringBuilder sb_ = new StringBuilder();

        public PartialViewResult Index()
        {
            return PartialView(LoadMainMenuGroup_lv1());
        }
        public DataTable GetMenu()
        {
            return LoadMainMenuGroup_lv1();
        }
        public string GetGiaiDoanDuAn(string duongDan)
        {
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            return sqlFun.GetOneStringField("select ISNULL(convert(nvarchar(50),GiaiDoanDuAnID),'') from Menu where DuongDan=N'" + duongDan + "'");
        }
        
        
        public DataTable LoadMainMenuGroup_lv1()
        {
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                return sqlFun.GetData(@"select MenuGroupID,MenuGroupCode,TenMenuGroup,Icon,DienGiai,DangSD=ISNULL(DangSD,0) 
                from MenuGroup where MenuGroupID in (select distinct Menu.MenuGroupID FROM [dbo].[Menu]   WHERE  isnull(HienThi,0) = '1' and isnull(MenuButton,0) = '0' AND MenuID IN (SELECT MenuID FROM dbo.UserPermiss  where UserID = N'" + NTSSession.GetUser().UserID + @"')
                   )
                and ISNULL(DangSD,1)=1 order by MenuGroupCode asc ");
                //return sqlFun.GetData(@"SELECT
                //  [MenuID]
                //  ,[TenMenu]
                //  ,DuongDan = isnull(DuongDan,'')
                //  ,[Icon]
                //  ,[MenuID_cha]
                //  ,[SapXep]
                //  ,[MenuButton]
                //  FROM [dbo].[Menu] WHERE   isnull(HienThi,0) = '1' and  isnull(MenuButton,0) = '0' and MenuID_cha IS NULL AND MenuID IN (SELECT MenuID FROM dbo.UserPermiss  where UserID = N'" + NTSSession.GetUser().UserID + @"')
                //  ORDER BY SapXep,TenMenu");
            }
            catch (Exception)
            {
                return null;
            }
        }
        public DataTable LoadMenuGroup(string DuongDan)
        {
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                return sqlFun.GetData(@"select MenuGroupID = ISNULL(CONVERT(nvarchar(50),MenuGroupID),'') from Menu where DuongDan=N'"+ DuongDan + "'");
            }
            catch (Exception)
            {
                return null;
            }
        }
        public string CheckOpen(string AbsolutePath)
        {
            DataTable dtData = LoadMenuGroup(AbsolutePath);
            string sb_ = "";
            if (dtData != null && dtData.Rows.Count > 0)
            {
                foreach (DataRow row in dtData.Rows)
                {
                    sb_ = row["MenuGroupID"].ToString().ToLower();
                }
            }
            else
            {
                sb_ = "";
            }
            return sb_;
        }
    }
}