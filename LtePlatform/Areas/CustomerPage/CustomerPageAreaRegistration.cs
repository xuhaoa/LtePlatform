using System.Web.Mvc;

namespace LtePlatform.Areas.CustomerPage
{
    public class CustomerPageAreaRegistration : AreaRegistration 
    {
        public override string AreaName => "CustomerPage";

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "CustomerPage_default",
                "Customer/{action}/{id}",
                new { controller = "Customer", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}