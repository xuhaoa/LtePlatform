using Lte.Evaluations.DataService.Basic;
using Lte.Parameters.Entities;
using LtePlatform.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.MySqlFramework.Entities;

namespace LtePlatform.Controllers.AdminitrativeRegion
{
    [ApiControl("获取行政区域信息的控制器")]
    public class CityListController : ApiController
    {
        private readonly TownQueryService _service;

        public CityListController(TownQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("获得所有城市列表")]
        [ApiResponse("所有城市列表")]
        public IHttpActionResult Get()
        {
            var query = _service.GetCities();
            return query.Count == 0 ? (IHttpActionResult) BadRequest("Empty City List!") : Ok(query);
        }

        [HttpGet]
        [ApiDoc("获得指定城市下属的区域列表")]
        [ApiParameterDoc("city", "指定城市")]
        [ApiResponse("区域列表")]
        [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
        public List<string> Get(string city)
        {
            return _service.GetDistricts(city);
        }

        [HttpGet]
        [ApiDoc("获得指定城市和区域下属的镇区列表")]
        [ApiParameterDoc("city", "指定城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiResponse("镇区列表")]
        public List<string> Get(string city, string district)
        {
            return _service.GetTowns(city, district);
        }
    }

    [ApiControl("镇区信息查询控制器")]
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

    [ApiControl("镇区边界计算控制器")]
    public class TownBoundaryController : ApiController
    {
        private readonly TownBoundaryService _service;

        public TownBoundaryController(TownBoundaryService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定镇区的边界坐标信息")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区")]
        [ApiParameterDoc("town", "镇")]
        [ApiResponse("镇区的边界坐标信息")]
        public IEnumerable<TownBoundaryView> Get(string city, string district, string town)
        {
            return _service.GetTownBoundaryViews(city, district, town);
        }

        [HttpGet]
        [ApiDoc("判断指定的经纬度是否在某个镇区内")]
        [ApiParameterDoc("longtitute", "经度")]
        [ApiParameterDoc("lattitute", "纬度")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区")]
        [ApiParameterDoc("town", "镇")]
        [ApiResponse("指定的经纬度是否在某个镇区内")]
        public bool Get(double longtitute, double lattitute, string city, string district, string town)
        {
            return _service.IsInTownBoundaries(longtitute, lattitute, city, district, town);
        }
    }

    public class AreaBoundaryController : ApiController
    {
        private readonly TownBoundaryService _service;

        public AreaBoundaryController(TownBoundaryService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<AreaBoundaryView> Get()
        {
            return _service.GetAreaBoundaryViews();
        }
    }
}
