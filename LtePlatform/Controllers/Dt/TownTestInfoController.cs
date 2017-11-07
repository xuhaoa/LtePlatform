using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Dt
{
    [ApiControl("镇区测试文件联合信息查询控制器")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class TownTestInfoController : ApiController
    {
        private readonly TownTestInfoService _service;

        public TownTestInfoController(TownTestInfoService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定数据文件（已知类型）在各个镇区的详细信息")]
        [ApiParameterDoc("csvFileName", "数据文件名称")]
        [ApiParameterDoc("type", "数据文件类型")]
        [ApiResponse("各个镇区DT统计的详细信息")]
        public IEnumerable<AreaTestInfo> Get(string csvFileName, string type)
        {
            return _service.CalculateAreaTestInfos(csvFileName, type);
        }

        [HttpGet]
        public IEnumerable<AreaTestInfo> Get(int fileId)
        {
            return _service.QueryAreaTestInfos(fileId);
        }

        [HttpPut]
        public int Put(AreaTestInfo info)
        {
            return _service.UpdateAreaTestInfo(info);
        }
    }
}