using System.Web.Mvc;

namespace TTLD2024.Areas.NhaTuyenDung
{
    public class NhaTuyenDungAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "NhaTuyenDung";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "NhaTuyenDung_default",
                "NhaTuyenDung/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}