using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.Evaluations.ViewModels.College;
using Lte.Evaluations.ViewModels.Precise;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("操作校园网指标的控制器")]
    public class CollegeKpiController : ApiController
    {
        private readonly CollegeKpiService _service;

        public CollegeKpiController(CollegeKpiService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定时段的所有校园的指标")]
        [ApiParameterDoc("date", "指定日期")]
        [ApiParameterDoc("hour", "指定时间")]
        [ApiResponse("指定时段的所有校园的指标")]
        public IEnumerable<CollegeKpiView> Get(DateTime date, int hour)
        {
            return _service.GetViews(date, hour);
        }

        [HttpGet]
        [ApiDoc("查询指定日期范围内的各校园的单项指标")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("kpiName", "指标名称")]
        [ApiResponse("各校园的单项指标")]
        public Dictionary<string, double> Get(DateTime begin, DateTime end, string kpiName)
        {
            return _service.GetAverageKpi(begin, end, CollegeKpiService.GetKpiName(kpiName));
        }

        [HttpGet]
        [ApiDoc("查询指定时段的指定校园的指标，若查不到则会报错")]
        [ApiParameterDoc("date", "指定日期")]
        [ApiParameterDoc("hour", "指定时间")]
        [ApiParameterDoc("name", "指定校园")]
        [ApiResponse("指定时段的指定校园的指标，若查不到则会报错")]
        public IHttpActionResult Get(DateTime date, int hour, string name)
        {
            var result = _service.GetResult(date, hour, name);
            return result == null ? (IHttpActionResult)BadRequest("Bad College Name!") : Ok(result);
        }

        [HttpPost]
        [ApiDoc("新增或保存校园网指标信息")]
        [ApiParameterDoc("stat", "待新增或保存校园网指标信息")]
        [ApiResponse("操作结果")]
        public async Task<IHttpActionResult> Post(CollegeKpi stat)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _service.Post(stat);
            return Ok();
        }

        [HttpDelete]
        [ApiDoc("删除校园网指标信息")]
        [ApiParameterDoc("stat", "待删除校园网指标信息")]
        [ApiResponse("操作结果")]
        public async Task<IHttpActionResult> Delete(CollegeKpiView view)
        {
            var result = _service.GetRecordResult(view);
            if (result == null) return BadRequest("The test record does not exist!");
            await _service.Delete(result);
            return Ok();
        }
    }

    [ApiControl("校园网精确覆盖率查询控制器")]
    public class CollegePreciseController : ApiController
    {
        private readonly CollegePreciseService _service;

        public CollegePreciseController(CollegePreciseService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定时间范围的指定校园的指标")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("collegeName", "指定校园")]
        public IEnumerable<CellPreciseKpiView> Get(string collegeName, DateTime begin, DateTime end)
        {
            return _service.GetViews(collegeName, begin, end);
        }
    }

    [ApiControl("校园网告警查询控制器")]
    public class CollegeAlarmController : ApiController
    {
        private readonly CollegeAlarmService _service;

        public CollegeAlarmController(CollegeAlarmService service)
        {
            _service = service;
        }
        
        [HttpGet]
        [ApiDoc("查询单个校园的LTE基站视图列表，指定告警统计的时间段")]
        [ApiParameterDoc("collegeName", "校园名称")]
        [ApiParameterDoc("begin", "查询告警的开始日期")]
        [ApiParameterDoc("end", "查询告警的结束日期")]
        [ApiResponse("LTE告警列表")]
        public IEnumerable<Tuple<string, IEnumerable<AlarmStat>>> Get(string collegeName, DateTime begin, DateTime end)
        {
            return _service.QueryCollegeENodebAlarms(collegeName, begin, end);
        }
    }
}
