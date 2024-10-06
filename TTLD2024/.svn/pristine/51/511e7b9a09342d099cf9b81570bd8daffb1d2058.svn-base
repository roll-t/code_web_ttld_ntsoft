using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using TTLD2024.DataConnect;
using WEB_DLL;
using System.Data;
using System.Net.Http.Headers;
using TTLD2024.App_Start;
using System.Web.Http;
using System.Net.Http.Formatting;
using System.Web.SessionState;

namespace TTLD2024
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_PostAuthorizeRequest()
        {
            if (IsWebApiRequest())
            {
                HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
            }
        }

        private bool IsWebApiRequest()
        {
            return HttpContext.Current.Request.AppRelativeCurrentExecutionFilePath.StartsWith(WebApiConfig.UrlPrefixRelative);
        }

        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
        protected void Session_Start(object sender, EventArgs e)
        {
            ntsDataConnect._mCreateFileConnectString(@"ASUS3006\SQLEXPRESS", "TTLD_2024", "TTLD_2024");
            //ntsSqlFunctions ntsSQLServerFunctions = new ntsSqlFunctions(ntsSqlRunType.Web);
            NTSSession.SetConnectionString1(@"Data Source=ASUS3006\SQLEXPRESS;Initial Catalog=TTLD_2024;Integrated Security=True");
            NTSSession.SetConnectionString2(@"Data Source=ASUS3006\SQLEXPRESS;Initial Catalog=TTLD_2024;Integrated Security=True");
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            UsersDataContext db = new UsersDataContext();
            //SqlFunction _vSql = new SqlFunction(NTSSession.GetConnectionString2());
            string TenDangNhap = "Admin";//thptthoaingochau//sgdangiang//stcangiang//thptnguyencongtru//Admin//pgddttpcamau
            IQueryable<DonVi> tblDMDonVi = from tdbDvi in db.DonVis
                                           where tdbDvi.DonViID.ToString().ToUpper() == sqlFun.GetOneStringField(@"SELECT UPPER(CONVERT(nvarchar(36), DonViID)) FROM dbo.Users WHERE TenDangNhap=N'" + TenDangNhap + "'")
                                           select tdbDvi;
            DonVi _vdbDonVi = tblDMDonVi.FirstOrDefault();

            //Sở giáo dục
            //_vdbDonVi.DonViID = Guid.Parse("CE1A46F1-7498-4FA7-A688-C8C3DDED90B5");

            NTSSession.SetDonVi(_vdbDonVi);
            IQueryable<User> dbUsers = from tdbUse in db.Users
                                       where tdbUse.TenDangNhap.ToLower() == TenDangNhap
                                       select tdbUse;
            User _vdbUser = dbUsers.FirstOrDefault();
            NTSSession.SetUser(_vdbUser);
            Session.Add("CurrentPermiss", "true;true;true;true;true;true;true;true;true;true;true;true;true");
            NTSSession.SetNamSudung("2024");
        }
        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }
        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }
        protected void Application_Error(object sender, EventArgs e)
        {

        }
        protected void Session_End(object sender, EventArgs e)
        {
            try
            {
                Session.Remove("lanDangNhap");
                UsersDataContext db = new UsersDataContext();
                //db.Pro_SetOffline(NTSSession.GetUser().UserID);
                Session.RemoveAll();
            }
            catch (Exception ex)
            {
            }
        }
        protected void Application_End(object sender, EventArgs e)
        {

        }



    }
}
