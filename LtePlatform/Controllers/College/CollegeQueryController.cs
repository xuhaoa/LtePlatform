using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.Evaluations.ViewModels.College;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Entities.College;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("校园网基本查询控制器")]
    public class CollegeQueryController : ApiController
    {
        private readonly CollegeStatService _service;

        public CollegeQueryController(CollegeStatService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("根据编号查询校园网信息")]
        [ApiParameterDoc("id", "校园编号")]
        [ApiResponse("校园网信息")]
        public IHttpActionResult Get(int id)
        {
            var info = _service.QueryInfo(id);
            return info == null ? (IHttpActionResult)BadRequest("College Id Not Found!") : Ok(info);
        }

        [HttpGet]
        [ApiDoc("根据名称查询校园网信息")]
        [ApiParameterDoc("name", "校园名称")]
        [ApiResponse("校园网信息")]
        public IHttpActionResult Get(string name)
        {
            var info = _service.QueryInfo(name);
            return info == null ? (IHttpActionResult)BadRequest("College Name Not Found!") : Ok(info);
        }

        [HttpGet]
        public CollegeYearInfo Get(string name, int year)
        {
            return _service.QueryInfo(name, year);
        }

        [HttpGet]
        [ApiDoc("查询所有的校园网")]
        [ApiResponse("所有校园网信息")]
        public IEnumerable<CollegeInfo> Get()
        {
            return _service.QueryInfos();
        }

        [HttpGet]
        public IEnumerable<CollegeYearView> GetYearViews(int year)
        {
            return _service.QuerYearViews(year);
        }
    }

    [ApiControl("统计校园网名称控制器")]
    public class CollegeNamesController : ApiController
    {
        private readonly CollegeStatService _service;

        public CollegeNamesController(CollegeStatService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询所有校园网名称")]
        [ApiResponse("所有校园网名称")]
        public IEnumerable<string> Get()
        {
            return _service.QueryNames();
        }

        [HttpGet]
        [ApiDoc("查询所有校园网名称")]
        [ApiParameterDoc("year", "指定年份")]
        [ApiResponse("所有校园网名称")]
        public IEnumerable<string> Get(int year)
        {
            return _service.QueryNames(year);
        }
    }
}
