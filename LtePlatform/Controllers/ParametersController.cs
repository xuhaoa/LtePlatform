using Lte.Evaluations.DataService;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.DataService.Kpi;
using Lte.Evaluations.DataService.Mr;
using LtePlatform.Models;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Remotion.Data.Linq.Parsing.Structure.IntermediateModel;

namespace LtePlatform.Controllers
{
    [Authorize]
    public class ParametersController : Controller
    {
        private readonly BasicImportService _basicImportService;
        private readonly AlarmsService _alarmsService;
        private readonly NearestPciCellService _neighborService;
        private readonly FlowService _flowService;

        public ParametersController(BasicImportService basicImportService, AlarmsService alarmsService,
            NearestPciCellService neighborService, FlowService flowService)
        {
            _basicImportService = basicImportService;
            _alarmsService = alarmsService;
            _neighborService = neighborService;
            _flowService = flowService;
        }
        
        public ActionResult AlarmImport()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ZteAlarmPost(HttpPostedFileBase[] alarmZte)
        {
            if (alarmZte == null || alarmZte.Length <= 0 || string.IsNullOrEmpty(alarmZte[0]?.FileName))
                return View("AlarmImport");
            ViewBag.Message = "共上传中兴告警信息文件" + alarmZte.Length + "个！";
            foreach (var file in alarmZte)
            {
                _alarmsService.UploadZteAlarms(new StreamReader(file.InputStream, Encoding.GetEncoding("GB2312")));
            }
            return View("AlarmImport");
        }

        [HttpPost]
        public ActionResult HwAlarmPost(HttpPostedFileBase[] alarmHw)
        {
            if (alarmHw == null || alarmHw.Length <= 0 || string.IsNullOrEmpty(alarmHw[0]?.FileName))
                return View("AlarmImport");
            ViewBag.Message = "共上传华为告警信息文件" + alarmHw.Length + "个！";
            foreach (var file in alarmHw)
            {
                _alarmsService.UploadHwAlarms(new StreamReader(file.InputStream, Encoding.GetEncoding("GB2312")));
            }
            return View("AlarmImport");
        }
        
        public ActionResult BasicImport()
        {
            return View();
        }

        [HttpPost]
        public ActionResult LteImportPost()
        {
            var lteFile = Request.Files["lteExcel"];
            if (lteFile != null && lteFile.FileName != "")
            {
                var ltePath = lteFile.UploadParametersFile();
                BasicImportContainer.ENodebExcels = _basicImportService.ImportENodebExcels(ltePath);
                BasicImportContainer.CellExcels = _basicImportService.ImportCellExcels(ltePath);
                BasicImportContainer.LteRruIndex = 0;
                BasicImportContainer.LteCellIndex = 0;
            }
            return RedirectToAction("BasicImport");
        }

        [HttpPost]
        public ActionResult CdmaImportPost()
        {
            var cdmaFile = Request.Files["cdmaExcel"];
            if (cdmaFile != null && cdmaFile.FileName != "")
            {
                var cdmaPath = cdmaFile.UploadParametersFile();
                _basicImportService.ImportCdmaParameters(cdmaPath);
            }
            return RedirectToAction("BasicImport");
        }

        public ActionResult StationDictionaryPost()
        {
            var dictFile = Request.Files["stationDictionary"];
            if (dictFile!=null&& dictFile.FileName!="")
            {
                var dictPath = dictFile.UploadParametersFile();
                var count = _basicImportService.ImportStationDictionaries(dictPath);
                ViewBag.Message = "共上传LTE站点对应关系记录" + count + "条";
            } 
            return View("BasicImport");
        }

        public ActionResult DistributionPost()
        {
            var distributionFile = Request.Files["distribution"];
            if (distributionFile!=null&&distributionFile.FileName!="")
            {
                var path = distributionFile.UploadParametersFile();
                var count = _basicImportService.ImportDistributions(path);
                ViewBag.Message = "共上传室内分布记录" + count + "条";
            }
            return View("BasicImport");
        }

        public ActionResult HotSpotPost()
        {
            var hotSpotFile = Request.Files["hotSpot"];
            if (hotSpotFile != null && hotSpotFile.FileName != "")
            {
                var path = hotSpotFile.UploadParametersFile();
                var count = _basicImportService.ImportHotSpots(path);
                ViewBag.Message = "共上传热点基础数据记录" + count + "条";
            }
            return View("BasicImport");
        }

        [Authorize]
        public ActionResult NeighborImport()
        {
            return View();
        }
        
        [HttpPost]
        public ActionResult ZteNeighborPost(HttpPostedFileBase[] neighborZte)
        {
            if (neighborZte != null && neighborZte.Length > 0 && !string.IsNullOrEmpty(neighborZte[0]?.FileName))
            {
                ViewBag.Message = "共上传AGIS信息文件" + neighborZte.Length + "个！";
                foreach (var file in neighborZte)
                {
                    _neighborService.UploadAgisDtPoints(new StreamReader(file.InputStream, Encoding.GetEncoding("GB2312")));
                }
            }
            return View("NeighborImport");
        }

        [HttpPost]
        public ActionResult HwNeighborPost(HttpPostedFileBase[] neighborHw)
        {
            if (neighborHw != null && neighborHw.Length > 0 && !string.IsNullOrEmpty(neighborHw[0]?.FileName))
            {
                ViewBag.Message = "共上传MR栅格信息文件" + neighborHw.Length + "个！";
                foreach (var file in neighborHw)
                {
                    _neighborService.UploadMrGrids(new StreamReader(file.InputStream), file.FileName);
                }
            }
            return View("NeighborImport");
        }

        [HttpPost]
        public async Task<ActionResult> WebBrowsingPost(HttpPostedFileBase[] webBrowsing)
        {
            if (webBrowsing != null && webBrowsing.Length > 0 && !string.IsNullOrEmpty(webBrowsing[0]?.FileName))
            {
                ViewBag.Message = "共上传网页浏览信息文件" + webBrowsing.Length + "个！";
                foreach (var file in webBrowsing)
                {
                    await _neighborService.UploadWebBrowsings(new StreamReader(file.InputStream, Encoding.GetEncoding("GB2312")));
                }
            }
            return View("NeighborImport");
        }

        [HttpPost]
        public async Task<ActionResult> StreamingPost(HttpPostedFileBase[] streaming)
        {
            if (streaming != null && streaming.Length > 0 && !string.IsNullOrEmpty(streaming[0]?.FileName))
            {
                ViewBag.Message = "共上传视频信息文件" + streaming.Length + "个！";
                foreach (var file in streaming)
                {
                    await _neighborService.UploadStreamings(new StreamReader(file.InputStream, Encoding.GetEncoding("GB2312")));
                }
            }
            return View("NeighborImport");
        }

        [HttpPost]
        public ActionResult HwFlowPost(HttpPostedFileBase[] flowHw)
        {
            if (flowHw != null && flowHw.Length > 0 && !string.IsNullOrEmpty(flowHw[0]?.FileName))
            {
                ViewBag.Message = "共上传华为流量信息文件" + flowHw.Length + "个！";
                foreach (var file in flowHw)
                {
                    _flowService.UploadFlowHuaweis(new StreamReader(file.InputStream, Encoding.GetEncoding("GB2312")));
                }
            }
            return View("NeighborImport");
        }

        [HttpPost]
        public ActionResult ZteFlowPost(HttpPostedFileBase[] flowZte)
        {
            if (flowZte != null && flowZte.Length > 0 && !string.IsNullOrEmpty(flowZte[0]?.FileName))
            {
                ViewBag.Message = "共上传中兴流量信息文件" + flowZte.Length + "个！";
                foreach (var file in flowZte)
                {
                    _flowService.UploadFlowZtes(new StreamReader(file.InputStream, Encoding.GetEncoding("GB2312")));
                }
            }
            return View("NeighborImport");
        }
    }
}