using System;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.AdminitrativeRegion
{
    [ApiControl("镇区信息查询控制器")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class TownController : ApiController
    {
        private readonly TownQueryService _service;

        public TownController(TownQueryService service)
        {
            _service = service;
        }

        [ApiDoc("根据LTE基站编号查询基站镇区信息")]
        [ApiParameterDoc("eNodebId", "LTE基站编号")]
        [ApiResponse("基站镇区信息，包括城市、区域、镇")]
        public Tuple<string, string, string> Get(int eNodebId)
        {
            return _service.GetTownNamesByENodebId(eNodebId);
        }

        [HttpGet]
        [ApiDoc("查询指定镇区信息")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区")]
        [ApiParameterDoc("town", "镇")]
        [ApiResponse("指定镇区信息")]
        public Town Get(string city, string district, string town)
        {
            return _service.GetTown(city, district, town);
        }
    }
}