using Lte.Evaluations.DataService.College;
using Lte.Evaluations.ViewModels.College;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Entities.College;
using LtePlatform.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

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
        [ApiDoc("根据名称和年份查询校园网信息")]
        [ApiParameterDoc("name", "校园名称")]
        [ApiParameterDoc("year", "年份")]
        [ApiResponse("校园网信息")]
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

        [HttpPost]
        [ApiDoc("更新校园网基本信息")]
        [ApiParameterDoc("info", "校园网基本信息")]
        public async Task<int> Post(CollegeYearInfo info)
        {
            return await _service.SaveYearInfo(info);
        } 
    }

    public class CollegeNameController : ApiController
    {
        private readonly CollegeStatService _service;

        public CollegeNameController(CollegeStatService service)
        {
            _service = service;
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

    }

    [ApiControl("校园网按年查询控制器")]
    public class CollegeYearController : ApiController
    {
        private readonly CollegeStatService _service;

        public CollegeYearController(CollegeStatService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("获得指定年份的校园网信息列表")]
        [ApiParameterDoc("year", "指定年份")]
        [ApiResponse("校园网信息列表")]
        public IEnumerable<CollegeYearView> GetYearViews(int year)
        {
            return _service.QueryYearViews(year);
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

        [Authorize]
        [HttpPost]
        public async Task<int> Post(CollegeInfo info)
        {
            return await _service.SaveCollegeInfo(info, User.Identity.Name.GetHashCode());
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
