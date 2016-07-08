using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.Evaluations.ViewModels.College;
using Lte.Parameters.Abstract.College;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("统计校园网信息控制器")]
    public class CollegeStatController : ApiController
    {
        private readonly CollegeStatService _service;

        public CollegeStatController(CollegeStatService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("根据校园编号查询校园网统计信息")]
        [ApiParameterDoc("id", "校园编号")]
        [ApiParameterDoc("year", "年份")]
        [ApiResponse("校园网统计信息， 若查不到则会返回错误信息")]
        public IHttpActionResult Get(int id, int year)
        {
            var stat = _service.QueryStat(id, year);
            return stat == null ? (IHttpActionResult)BadRequest("ID Not Found!") : Ok(stat);
        }

        [HttpGet]
        [ApiDoc("查询所有校园网统计信息")]
        [ApiParameterDoc("year", "年份")]
        [ApiResponse("所有校园网统计信息")]
        public IEnumerable<CollegeStat> Get(int year)
        {
            return _service.QueryStats(year);
        }
    }

    [ApiControl("校园网区域查询控制器")]
    public class CollegeRegionController : ApiController
    {
        private readonly ICollegeRepository _repository;

        public CollegeRegionController(ICollegeRepository repository)
        {
            _repository = repository;
        }

        [ApiDoc("查询校园网区域信息，包括面积和边界坐标")]
        [ApiParameterDoc("id", "校园ID")]
        [ApiResponse("校园网区域信息，包括面积和边界坐标")]
        public IHttpActionResult Get(int id)
        {
            var region = _repository.GetRegion(id);
            return region == null
                ? (IHttpActionResult)BadRequest("College Id Not Found Or without region!")
                : Ok(region);
        }

        [ApiDoc("查询校园网区域范围")]
        [ApiParameterDoc("collegeName", "校园名称")]
        [ApiResponse("校园网区域信息，包括东南西北的坐标点")]
        public IHttpActionResult Get(string collegeName)
        {
            var range = _repository.GetRange(collegeName);
            return range == null ? (IHttpActionResult)BadRequest("College Not Found Or without region!") : Ok(range);
        }
    }
}
