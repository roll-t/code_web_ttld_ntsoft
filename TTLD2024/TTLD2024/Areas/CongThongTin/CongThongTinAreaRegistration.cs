using System.Web.Mvc;

namespace TTLD2024.Areas.CongThongTin
{
    public class CongThongTinAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "CongThongTin";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "CongThongTin_default",
                "CongThongTin/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}