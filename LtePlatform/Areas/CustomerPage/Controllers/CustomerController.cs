using System.Web.Mvc;

namespace LtePlatform.Areas.CustomerPage.Controllers
{
    public class CustomerController : Controller
    {
        // GET: CustomerPage/Customer
        public ActionResult Index()
        {
            return View();
        }
    }
}