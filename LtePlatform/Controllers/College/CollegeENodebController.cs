using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.Evaluations.MapperSerive.Infrastructure;
using Lte.Evaluations.ViewModels.Basic;
using Lte.Parameters.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("校园网LTE基站查询控制器")]
    public class CollegeENodebController : ApiController
    {
        private readonly ICollegeInfrastructure<ENodebView> _service;
        private readonly CollegeAlarmService _alarmService;

        public CollegeENodebController(ICollegeInfrastructure<ENodebView> service, CollegeAlarmService alarmService)
        {
            _service = service;
            _alarmService = alarmService;
        }

        [HttpGet]
        [ApiDoc("查询单个校园的LTE基站列表")]
        [ApiParameterDoc("collegeName", "校园名称")]
        [ApiResponse("LTE基站列表")]
        public IEnumerable<ENodebView> Get(string collegeName)
        {
            return _service.Query(collegeName);
        }

        [HttpGet]
        [ApiDoc("查询单个校园的LTE基站视图列表，指定告警统计的时间段")]
        [ApiParameterDoc("collegeName", "校园名称")]
        [ApiParameterDoc("begin", "查询告警的开始日期")]
        [ApiParameterDoc("end", "查询告警的结束日期")]
        [ApiResponse("LTE告警列表")]
        public IEnumerable<Tuple<string, IEnumerable<AlarmStat>>> Get(string collegeName, DateTime begin, DateTime end)
        {
            return _alarmService.QueryCollegeENodebAlarms(collegeName, begin, end);
        }

        [HttpPost]
        [ApiDoc("查询多个校园的LTE基站视图")]
        [ApiParameterDoc("collegeNames", "校园名称列表")]
        [ApiResponse("LTE基站视图列表")]
        public IEnumerable<ENodebView> Post(CollegeNamesContainer collegeNames)
        {
            return _service.Query(collegeNames.Names);
        }
    }

    [ApiControl("校园网CDMA基站查询控制器")]
    public class CollegeBtssController : ApiController
    {
        private readonly ICollegeInfrastructure<CdmaBtsView> _service;

        public CollegeBtssController(CollegeBtssService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询单个校园的CDMA基站视图列表")]
        [ApiParameterDoc("collegeName", "校园名称")]
        [ApiResponse("CDMA基站视图列表")]
        public IEnumerable<CdmaBtsView> Get(string collegeName)
        {
            return _service.Query(collegeName);
        }

        [HttpPost]
        [ApiDoc("查询多个校园的CDMA基站视图")]
        [ApiParameterDoc("collegeNames", "校园名称列表")]
        [ApiResponse("CDMA基站视图列表")]
        public IEnumerable<CdmaBtsView> Post(CollegeNamesContainer collegeNames)
        {
            return _service.Query(collegeNames.Names);
        }
    }
}
