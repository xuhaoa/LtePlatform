﻿using Lte.Evaluations.DataService.Basic;
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
        public IHttpActionResult Get(string city)
        {
            var query = _service.GetDistricts(city);
            return query.Count == 0 ? (IHttpActionResult)BadRequest("Empty District List!") : Ok(query);
        }

        [HttpGet]
        [ApiDoc("获得指定城市和区域下属的镇区列表")]
        [ApiParameterDoc("city", "指定城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiResponse("镇区列表")]
        public IHttpActionResult Get(string city, string district)
        {
            var query = _service.GetTowns(city, district);
            return query.Count == 0 ? (IHttpActionResult)BadRequest("Empty Town List!") : Ok(query);
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
        public Town Get(string city, string district, string town)
        {
            return _service.GetTown(city, district, town);
        }
    }

    [ApiControl("镇区边界计算控制器")]
    public class TownBoundaryController : ApiController
    {
        private readonly TownQueryService _service;

        public TownBoundaryController(TownQueryService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<TownBoundaryView> Get(string city, string district, string town)
        {
            return _service.GetTownBoundaryViews(city, district, town);
        }

        [HttpGet]
        public bool Get(double longtitute, double lattitute, string city, string district, string town)
        {
            return _service.IsInTownBoundaries(longtitute, lattitute, city, district, town);
        }
    }
}
