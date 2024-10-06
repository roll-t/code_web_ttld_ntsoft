using System.Web.Mvc;

namespace TTLD2024.Areas.CongThongTinViecLam
{
    public class CongThongTinViecLamAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "CongThongTinViecLam";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "CongThongTinViecLam_default",
                "CongThongTinViecLam/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}