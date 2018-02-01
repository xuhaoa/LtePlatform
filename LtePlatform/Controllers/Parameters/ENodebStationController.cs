using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
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
}