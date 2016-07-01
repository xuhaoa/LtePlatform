using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Entities.College;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("校园网基本查询控制器")]
    public class CollegeQueryController : ApiController
    {
        private readonly ICollegeRepository _repository;

        public CollegeQueryController(ICollegeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [ApiDoc("根据编号查询校园网信息")]
        [ApiParameterDoc("id", "校园编号")]
        [ApiResponse("校园网信息")]
        public IHttpActionResult Get(int id)
        {
            CollegeInfo info = _repository.Get(id);
            return info == null ? (IHttpActionResult)BadRequest("College Id Not Found!") : Ok(info);
        }

        [HttpGet]
        [ApiDoc("根据名称查询校园网信息")]
        [ApiParameterDoc("name", "校园名称")]
        [ApiResponse("校园网信息")]
        public IHttpActionResult Get(string name)
        {
            CollegeInfo info = _repository.FirstOrDefault(x => x.Name == name);
            return info == null ? (IHttpActionResult)BadRequest("College Name Not Found!") : Ok(info);
        }

        [HttpGet]
        [ApiDoc("查询所有的校园网")]
        [ApiResponse("所有校园网信息")]
        public IEnumerable<CollegeInfo> Get()
        {
            return _repository.GetAllList();
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
