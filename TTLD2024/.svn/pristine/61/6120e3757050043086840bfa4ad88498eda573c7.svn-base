using System.Web.Mvc;

namespace TTLD2024.Areas.CamNangNgheNghiep
{
    public class CamNangNgheNghiepAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "CamNangNgheNghiep";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "CamNangNgheNghiep_default",
                "CamNangNgheNghiep/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}