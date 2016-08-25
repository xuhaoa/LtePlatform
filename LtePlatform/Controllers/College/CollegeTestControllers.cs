using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("校园网3G测试记录查询控制器")]
    public class College3GTestController : ApiController
    {
        private readonly College3GTestService _service;

        public College3GTestController(College3GTestService service)
        {
            _service = service;
        }
        
        [HttpGet]
        [ApiDoc("查询指定日期、时段和校园名称的3G测试记录")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("name", "校园名称")]
        [ApiResponse("3G测试记录")]
        public IEnumerable<College3GTestView> GetViews(DateTime begin, DateTime end, string name)
        {
            return _service.GetViews(begin, end, name);
        }

        [HttpGet]
        [ApiDoc("查询指定日期范围内的各校园的平均速率")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("各校园的平均速率")]
        public Dictionary<string, double> Get(DateTime begin, DateTime end)
        {
            return _service.GetAverageRates(begin, end);
        }
        
        [HttpGet]
        [ApiDoc("查询指定日期范围内的各校园的单项指标")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("kpiName", "指标名称")]
        [ApiResponse("各校园的单项指标")]
        public Dictionary<string, double> Get(DateTime begin, DateTime end, string kpiName)
        {
            switch (kpiName)
            {
                case "users":
                    return _service.GetAverageUsers(begin, end);
                case "minRssi":
                    return _service.GetAverageMinRssi(begin, end);
                case "maxRssi":
                    return _service.GetAverageMaxRssi(begin, end);
                default:
                    return _service.GetAverageVswr(begin, end);
            }
        }

        [HttpPost]
        [ApiDoc("保存校园网3G测试记录")]
        [ApiParameterDoc("view", "校园网3G测试记录")]
        [ApiResponse("保存结果")]
        public async Task<int> Post(College3GTestView view)
        {
            return await _service.Post(view);
        }
    }

    [ApiControl("校园网4G测试控制器")]
    public class College4GTestController : ApiController
    {
        private readonly College4GTestService _service;

        public College4GTestController(College4GTestService service)
        {
            _service = service;
        }
        
        [HttpGet]
        [ApiDoc("获取所有校园的4G测试记录集合")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("4G测试记录集合")]
        public IEnumerable<College4GTestView> Get(DateTime begin, DateTime end)
        {
            return _service.GetViews(begin, end);
        }

        [HttpGet]
        [ApiDoc("获取指定校园、指定小区的4G测试记录集合")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("name", "校园名称")]
        [ApiResponse("4G测试记录集合查询结果，或错误输出信息")]
        public IEnumerable<College4GTestView> GetViews(DateTime begin, DateTime end, string name)
        {
            return _service.GetResult(begin, end, name);
        }

        [HttpGet]
        [ApiDoc("获取各个校园对应的速率等指标")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("upload", "是否查询上行速率，0表示下行，其他值表示上行")]
        [ApiResponse("各个校园对应的速率等指标，以字典格式表示")]
        public Dictionary<string, double> Get(DateTime begin, DateTime end, byte upload)
        {
            return _service.GetAverageRates(begin, end, upload);
        }

        [HttpGet]
        [ApiDoc("获取各个校园对应的单项指标")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("kpiName", "指标名称")]
        [ApiResponse("各个校园对应的单项指标，以字典格式表示")]
        public Dictionary<string, double> Get(DateTime begin, DateTime end, string kpiName)
        {
            switch (kpiName)
            {
                case "users":
                    return _service.GetAverageUsers(begin, end);
                case "rsrp":
                    return _service.GetAverageRsrp(begin, end);
                default:
                    return _service.GetAverageSinr(begin, end);
            }
        }

        [HttpPost]
        [ApiDoc("保存4G测试结果信息")]
        [ApiParameterDoc("view", "测试记录信息")]
        [ApiResponse("保存结果")]
        public async Task<int> Post(College4GTestView view)
        {
            return await _service.Post(view);
        }
    }
}
