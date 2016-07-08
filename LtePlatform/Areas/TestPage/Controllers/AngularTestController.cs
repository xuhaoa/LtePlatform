using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LtePlatform.Areas.TestPage.Controllers
{
    public class AngularTestController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        // GET: TestPage/AngularTest
        public ActionResult Simple()
        {
            return View();
        }
        
        public ActionResult RootProperty()
        {
            return View();
        }

        public ActionResult Chapter9Ari()
        {
            return View();
        }

        public ActionResult Chapter10Ari()
        {
            return View();
        }
    }
}