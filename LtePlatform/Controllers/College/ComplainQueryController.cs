using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("后端投诉工单基本查询控制器")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class ComplainQueryController : ApiController
    {
        private readonly ComplainService _service;

        public ComplainQueryController(ComplainService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询日期范围内的后端投诉工单视图")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("日期范围内的后端投诉工单视图")]
        public List<ComplainDto> Get(DateTime begin, DateTime end)
        {
            return _service.Query(begin, end);
        }

        [HttpGet]
        [ApiDoc("查询初始日期前的最近一天后端投诉工单视图")]
        [ApiParameterDoc("statDate", "初始日期")]
        [ApiResponse("最近一天后端投诉工单视图")]
        public List<ComplainDto> Get(DateTime statDate, string district)
        {
            var end = statDate.AddDays(1);
            return _service.QueryDate(statDate, end, district);
        }

        [HttpGet]
        public List<ComplainDto> Get(DateTime beginDate, DateTime endDate, string district)
        {
            return _service.QueryDate(beginDate.Date, endDate.Date, district);
        }

        [HttpGet]
        [ApiDoc("按照工单号码查询投诉工单视图")]
        [ApiParameterDoc("serialNumber", "工单号码")]
        [ApiResponse("投诉工单视图")]
        public ComplainDto Get(string serialNumber)
        {
            return _service.Query(serialNumber);
        }
        
        [HttpPut]
        [ApiDoc("更新投诉工单信息")]
        [ApiParameterDoc("dto", "投诉工单视图")]
        [ApiResponse("更新结果")]
        public async Task<int> Put(ComplainDto dto)
        {
            return await _service.UpdateAsync(dto);
        }

        [HttpGet]
        [ApiDoc("查询指定区域内指定日期的前一个月的在后端投诉工单")]
        [ApiParameterDoc("today", "指定日期")]
        [ApiParameterDoc("city", "城市")]
        [ApiParameterDoc("district", "区域")]
        [ApiResponse("指定区域内指定日期的前一个月的后端投诉工单")]
        public IEnumerable<ComplainDto> Get(DateTime today, string city, string district)
        {
            return _service.QueryList(today, city, district);
        }
    }
}