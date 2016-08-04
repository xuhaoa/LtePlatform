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
    }

    public class CoffeeScriptController : Controller
    {
        // GET: TestPage/CoffeeScript
        public ActionResult Hotseat()
        {
            return View();
        }
    }

    public class QUnitTestController : Controller
    {
        // GET: TestPage/QUnitTest
        public ActionResult Index()
        {
            return View();
        }

    }

    public class WebApiTestController : Controller
    {
        // GET: TestPage/WebApiTest
        public ActionResult SimpleType()
        {
            return View();
        }

        public ActionResult BasicPost()
        {
            return View();
        }

        public ActionResult Html5Test()
        {
            return View();
        }

        public ActionResult Html5PostTest()
        {
            return View();
        }
    }
}