using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using LtePlatform.Areas.HelpPage;
using LtePlatform.Areas.HelpPage.ModelDescriptions;
using LtePlatform.Models;

namespace LtePlatform
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            GlobalConfiguration.Configuration.SetDocumentationProvider(new DocProvider());
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            ControllerBuilder.Current.SetControllerFactory(new NinjectControllerFactory());
            GlobalConfiguration.Configuration.DependencyResolver = new NinjectDependencyResolver();
            AutoMapperWebConfiguration.Configure();
        }
    }
}
