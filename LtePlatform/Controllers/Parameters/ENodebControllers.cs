using System;
using Lte.Evaluations.DataService.Basic;
using LtePlatform.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.Regular;
using Lte.Evaluations.DataService.Dump;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.MySqlFramework.Entities;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("查询LTE基站的控制器")]
    public class ENodebController : ApiController
    {
        private readonly ENodebQueryService _service;

        public ENodebController(ENodebQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("根据行政区域条件查询基站列表")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiParameterDoc("town", "镇区")]
        [ApiResponse("查询得到的基站列表结果，如果没有则会报错")]
        public IEnumerable<ENodebView> Get(string city, string district, string town)
        {
            return _service.GetByTownNames(city, district, town);
        }

        [HttpGet]
        public IEnumerable<ENodebView> Get(string city, string district)
        {
            return _service.GetByDistrictNames(city, district);
        }

        [HttpGet]
        [ApiDoc("使用名称模糊查询，可以先后匹配基站名称、基站编号、规划编号和地址")]
        [ApiParameterDoc("name", "模糊查询的名称")]
        [ApiResponse("查询得到的基站列表结果，如果没有则会报错")]
        public IEnumerable<ENodebView> Get(string name)
        {
            return _service.GetByGeneralName(name);
        }

        [HttpGet]
        [ApiDoc("根据基站编号条件查询基站")]
        [ApiParameterDoc("eNodebId", "基站编号")]
        [ApiResponse("查询得到的基站列表结果，如果没有则会报错")]
        public ENodebView Get(int eNodebId)
        {
            return _service.GetByENodebId(eNodebId);
        }

        [HttpGet]
        [ApiDoc("获取经纬度范围内的基站视图列表")]
        [ApiParameterDoc("west", "西边经度")]
        [ApiParameterDoc("east", "东边经度")]
        [ApiParameterDoc("south", "南边纬度")]
        [ApiParameterDoc("north", "北边纬度")]
        [ApiResponse("经纬度范围内的基站视图列表")]
        public IEnumerable<ENodebView> Get(double west, double east, double south, double north)
        {
            return _service.QueryENodebViews(west, east, south, north);
        }

        [HttpPost]
        [ApiDoc("获取经纬度范围内的除某些基站外的基站视图列表")]
        [ApiParameterDoc("container", "指定条件范围")]
        [ApiResponse("指定条件范围内的基站视图列表")]
        public IEnumerable<ENodebView> Post(ENodebRangeContainer container)
        {
            return _service.QueryENodebViews(container);
        }
    }

    [ApiControl("LTE基站查询控制器")]
    public class ENodebQueryController : ApiController
    {
        private readonly ENodebQueryService _service;

        public ENodebQueryController(ENodebQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("根据规划编号查询基站")]
        [ApiParameterDoc("planNum", "规划编号(FSL)")]
        [ApiResponse("基站视图")]
        public ENodebView Get(string planNum)
        {
            return _service.GetByPlanNum(planNum);
        }

        [HttpGet]
        [ApiDoc("查询行政上归属于某镇区统一区域的其他镇区，但地理位置位于本镇区范围内的LTE基站，用于后续调整镇区归属")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiParameterDoc("town", "镇区")]
        [ApiResponse("满足以上条件的LTE基站视图列表")]
        public IEnumerable<ENodebView> Get(string city, string district, string town)
        {
            return _service.GetByTownArea(city, district, town);
        }

        [HttpGet]
        public ENodeb Get(int eNodebId, int townId)
        {
            return _service.UpdateTownInfo(eNodebId, townId);
        }
    }

    [ApiControl("在用基站查询控制器")]
    public class ENodebInUseController : ApiController
    {
        private readonly ENodebQueryService _service;

        public ENodebInUseController(ENodebQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("根据行政区域条件查询在用基站列表")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiParameterDoc("town", "镇区")]
        [ApiResponse("查询得到在用的基站列表结果")]
        public IEnumerable<ENodebView> Get(string city, string district, string town)
        {
            return _service.GetByTownNamesInUse(city, district, town);
        }

        [HttpGet]
        [ApiDoc("使用名称模糊查询，可以先后匹配基站名称、基站编号、规划编号和地址")]
        [ApiParameterDoc("name", "模糊查询的名称")]
        [ApiResponse("查询得到的基站列表结果，如果没有则会报错")]
        public IEnumerable<ENodebView> Get(string name)
        {
            return _service.GetByGeneralNameInUse(name);
        }

    }

    [ApiControl("基站站址查询控制器")]
    public class ENodebStationController : ApiController
    {
        private readonly ENodebQueryService _service;

        public ENodebStationController(ENodebQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("根据站址编码查询基站视图")]
        [ApiParameterDoc("stationNum", "基站站址")]
        [ApiResponse("基站视图")]
        public ENodebView Get(string stationNum)
        {
            return _service.GetByStationNum(stationNum);
        }

        [HttpGet]
        [ApiDoc("根据基站编号和规划编号查询站址信息")]
        [ApiParameterDoc("eNodebId", "基站编号")]
        [ApiParameterDoc("planNum", "规划编号(FSL)")]
        [ApiResponse("站址信息，站址编号和规划编号的对应关系")]
        public StationDictionary Get(int eNodebId, string planNum)
        {
            return _service.GetStationDictionary(eNodebId, planNum);
        }
    }

    [ApiControl("查询CDMA基站的控制器")]
    public class BtsController : ApiController
    {
        private readonly BtsQueryService _service;

        public BtsController(BtsQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("根据行政区域条件查询基站列表")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiParameterDoc("town", "镇区")]
        [ApiResponse("查询得到的基站列表结果，如果没有则会报错")]
        public IEnumerable<CdmaBtsView> Get(string city, string district, string town)
        {
            return _service.GetByTownNames(city, district, town);
        }

        [HttpGet]
        [ApiDoc("使用名称模糊查询，可以先后匹配基站名称、基站编号和地址")]
        [ApiParameterDoc("name", "模糊查询的名称")]
        [ApiResponse("查询得到的基站列表结果，如果没有则会报错")]
        public IEnumerable<CdmaBtsView> Get(string name)
        {
            return _service.GetByGeneralName(name);
        }

        [HttpGet]
        [ApiDoc("根据基站编号条件查询基站")]
        [ApiParameterDoc("btsId", "基站编号")]
        [ApiResponse("查询得到的基站列表结果，如果没有则会报错")]
        public CdmaBtsView Get(int btsId)
        {
            return _service.GetByBtsId(btsId);
        }

        [HttpPost]
        [ApiDoc("获取经纬度范围内的除某些基站外的基站视图列表")]
        [ApiParameterDoc("container", "指定条件范围")]
        [ApiResponse("指定条件范围内的基站视图列表")]
        public IEnumerable<CdmaBtsView> Post(ENodebRangeContainer container)
        {
            return _service.QueryBtsViews(container);
        }
    }

    [ApiControl("CDMA基站查询控制器")]
    public class BtsQueryController : ApiController
    {
        private readonly BtsQueryService _service;

        public BtsQueryController(BtsQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询行政上归属于某镇区统一区域的其他镇区，但地理位置位于本镇区范围内的CDMA基站，用于后续调整镇区归属")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiParameterDoc("town", "镇区")]
        [ApiResponse("满足以上条件的CDMA基站视图列表")]
        public IEnumerable<CdmaBtsView> Get(string city, string district, string town)
        {
            return _service.GetByTownArea(city, district, town);
        }

        [HttpGet]
        public CdmaBts Get(int btsId, int townId)
        {
            return _service.UpdateTownInfo(btsId, townId);
        }
    }

    [ApiControl("地理规划站点查询控制器")]
    public class PlanningSiteRangeController : ApiController
    {
        private readonly PlanningQueryService _service;

        public PlanningSiteRangeController(PlanningQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询地理范围内的规划站点")]
        [ApiParameterDoc("west", "坐标西界")]
        [ApiParameterDoc("east", "坐标东界")]
        [ApiParameterDoc("south", "坐标南界")]
        [ApiParameterDoc("north", "坐标北界")]
        [ApiResponse("地理范围内的规划站点")]
        public IEnumerable<PlanningSiteView> Get(double west, double east, double south, double north)
        {
            return _service.QueryPlanningSiteViews(west, east, south, north);
        } 
    }

    [ApiControl("规划站点查询控制器")]
    public class PlanningSiteController : ApiController
    {
        private readonly PlanningQueryService _service;

        public PlanningSiteController(PlanningQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询区域内的规划点")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiResponse("规划点视图列表")]
        public IEnumerable<PlanningSiteView> Get(string city, string district)
        {
            return _service.GetENodebsByDistrict(city, district);
        } 
    }

    [ApiControl("未开通规划站点查询控制器")]
    public class OpenningSiteController : ApiController
    {
        private readonly PlanningQueryService _service;

        public OpenningSiteController(PlanningQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询区域内未开通的规划点")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiResponse("未开通规划点视图列表")]
        public IEnumerable<PlanningSiteView> Get(string city, string district)
        {
            return _service.GetENodebsByDistrict(city, district, false);
        }
    }

    [ApiControl("已开通规划站点查询控制器")]
    public class OpennedSiteController : ApiController
    {
        private readonly PlanningQueryService _service;

        public OpennedSiteController(PlanningQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询区域内已开通的规划点")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiResponse("已开通规划点视图列表")]
        public IEnumerable<PlanningSiteView> Get(string city, string district)
        {
            return _service.GetENodebsByDistrict(city, district, true);
        }
    }

    [ApiControl("新增基站Excel信息查询控制器")]
    public class NewENodebExcelsController : ApiController
    {
        private readonly BasicImportService _service;
        private readonly ENodebDumpService _dumpService;

        public NewENodebExcelsController(BasicImportService service, ENodebDumpService dumpService)
        {
            _service = service;
            _dumpService = dumpService;
        }

        [HttpGet]
        [ApiDoc("查询所有Excel信息")]
        [ApiResponse("所有Excel信息")]
        public IEnumerable<ENodebExcel> Get()
        {
            return _service.GetNewENodebExcels();
        }

        [HttpPost]
        [ApiDoc("批量导入基站Excel信息")]
        [ApiParameterDoc("container", "待导入基站Excel信息")]
        [ApiResponse("成功导入数量")]
        public int Post(NewENodebListContainer container)
        {
            return _dumpService.DumpNewEnodebExcels(container.Infos);
        }
    }

    [ApiControl("新增CDMA基站Excel信息查询控制器")]
    public class NewBtsExcelsController : ApiController
    {
        private readonly BasicImportService _service;
        private readonly BtsDumpService _dumpService;

        public NewBtsExcelsController(BasicImportService service, BtsDumpService dumpService)
        {
            _service = service;
            _dumpService = dumpService;
        }

        [HttpGet]
        public IEnumerable<BtsExcel> Get()
        {
            return _service.GetNewBtsExcels();
        }

        [HttpPost]
        public int Post(NewBtsListContainer container)
        {
            return _dumpService.DumpBtsExcels(container.Infos);
        }
    }

    public class ENodebBaseController : ApiController
    {
        private readonly BtsConstructionService _service;

        public ENodebBaseController(BtsConstructionService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<ENodebBase> Get()
        {
            return _service.QueryEnodebBases();
        }

        [HttpGet]
        public IEnumerable<ENodebBase> Get(string searchText)
        {
            return _service.QueryEnodebBases(searchText);
        } 
    }

    public class ConstructionController : ApiController
    {
        private readonly BtsConstructionService _service;

        public ConstructionController(BtsConstructionService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<ConstructionView> Get(string searchTxt, double west,
            double east, double south, double north, string district, string town)
        {
            return _service.QueryConstructionInformations(searchTxt, west, east, south, north, district, town);
        }

        [HttpGet]
        public IEnumerable<ConstructionView> Get(string searchTxt, string district, string town)
        {
            return _service.QueryConstructionInformations(searchTxt, district, town);
        } 
    }

    public class DistributionController : ApiController
    {
        private readonly ENodebQueryService _service;

        public DistributionController(ENodebQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<DistributionSystem> Get(string district)
        {
            return _service.QueryDistributionSystems(district);
        }

        [HttpGet]
        [ApiDoc("获取经纬度范围内的室内分布列表")]
        [ApiParameterDoc("west", "西边经度")]
        [ApiParameterDoc("east", "东边经度")]
        [ApiParameterDoc("south", "南边纬度")]
        [ApiParameterDoc("north", "北边纬度")]
        [ApiResponse("经纬度范围内的室内分布列表")]
        public IEnumerable<DistributionSystem> Get(double west, double east, double south, double north)
        {
            return _service.QueryDistributionSystems(west, east, south, north);
        }
    }

    public class DwgViewController : ApiController
    {
        private readonly BluePrintService _service;

        public DwgViewController(BluePrintService service)
        {
            _service = service;
        }

        [HttpGet]
        public FileResultMessage View(string directory, string btsId, string filename)
        {
            var dwgService = new BtsDwgService(directory, btsId);

            var file = filename;
            if (file.EndsWith(".vsd") || file.EndsWith(".vsdx"))
            {
                file = dwgService.GetPdfOfVisio(file);
            }

            return !File.Exists(dwgService.DirectoryPath + "/" + file)
                ? new FileResultMessage {Error = "文件不存在", File = ""}
                : new FileResultMessage {Error = "", File = file};
        }

        [HttpDelete]
        public bool Delete(DWGDeleteView dwg)
        {
            var dwgService = new BtsDwgService(dwg.Directory, dwg.BtsId);
            return dwgService.Delete(dwg.FileName);
        }

        [HttpPost]
        public async Task<IHttpActionResult> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);

            Func<HttpRequestMessage, string, string> getQuerystring = (request, key) =>
            {
                var queryStrings = request.GetQueryNameValuePairs();
                if (queryStrings == null)
                    return null;

                var match = queryStrings.FirstOrDefault(kv => string.Compare(kv.Key, key, StringComparison.OrdinalIgnoreCase) == 0);
                return string.IsNullOrEmpty(match.Value) ? null : match.Value;
            };

            var btsId = getQuerystring(Request, "btsId");
            var directory = getQuerystring(Request, "directory");

            if (string.IsNullOrEmpty(btsId) || string.IsNullOrEmpty(directory))
            {
                throw new DirectoryNotFoundException("基站ID或者图纸目录为空");
            }

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);
            var dwgService = new BtsDwgService(directory, btsId);

            foreach (var file in provider.Contents)
            {
                if (string.IsNullOrEmpty(file.Headers.ContentDisposition.FileName)) { continue; }

                var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                var buffer = await file.ReadAsByteArrayAsync();

                dwgService.Save(filename, buffer);
                _service.SaveVisioPath(btsId, filename);
            }

            return Ok(new { Result = 1 });
        }
    }

    public class DwgQueryController : ApiController
    {
        [HttpGet]
        public IList<DwgInfo> Get(string directory, string btsId)
        {
            var service = new BtsDwgService(directory, btsId);
            return service.GetList();
        }

        [HttpGet]
        public string Get(string btsId)
        {
            var service = new BtsDwgService("Common", btsId);
            return service.DirectoryPath;
        }

        [HttpGet]
        public HttpResponseMessage Get(string directory, string btsId, string name)
        {
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            var dwgService = new BtsDwgService(directory, btsId);
            var data = dwgService.GetFile(name);
            var ext = Path.GetExtension(name);
            var contentType = ext?.ToLower().QueryContentType();

            response.Content = new ByteArrayContent(data);
            response.Content.Headers.Add("Content-Disposition", "attachment; filename*=UTF-8''" + name.UrlEncode());
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(contentType);

            return response;
        }
    }
}
