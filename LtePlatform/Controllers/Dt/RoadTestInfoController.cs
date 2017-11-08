using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.DataService;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Dt
{
    [ApiControl("道路测试文件联合信息查询控制器")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class RoadTestInfoController : ApiController
    {
        private readonly TownTestInfoService _service;
        private readonly HotSpotService _hotSpotService;

        public RoadTestInfoController(TownTestInfoService service, HotSpotService hotSpotService)
        {
            _service = service;
            _hotSpotService = hotSpotService;
        }

        [HttpGet]
        [ApiDoc("查询指定数据文件（已知类型）在各个道路的详细信息")]
        [ApiParameterDoc("csvFileName", "数据文件名称")]
        [ApiParameterDoc("type", "数据文件类型")]
        [ApiResponse("各个道路DT统计的详细信息")]
        public IEnumerable<AreaTestInfo> Get(string csvFileName, string type)
        {
            return _service.CalculateRoadTestInfos(csvFileName, type);
        }

        [HttpGet]
        public IEnumerable<AreaTestInfo> Get(int fileId)
        {
            return _service.QueryRoadTestInfos(fileId);
        }

        [HttpGet]
        public IEnumerable<AreaTestFileView> Get(string roadName, DateTime begin, DateTime end)
        {
            var road = _hotSpotService.QueryHotSpot(roadName, HotspotType.Highway);
            if (road == null) return new List<AreaTestFileView>();
            return _service.QueryRoadTestInfos(begin, end, road);
        }
    }
}