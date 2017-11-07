using System;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("在线支撑次数查询控制器")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class SustainCountController : ApiController
    {
        private readonly OnlineSustainService _service;

        public SustainCountController(OnlineSustainService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定日期的前一个月的在线支撑次数")]
        [ApiParameterDoc("today", "指定日期")]
        [ApiResponse("指定日期的前一个月的在线支撑次数")]
        public async Task<int> GetCount(DateTime today)
        {
            return await _service.QueryCount<OnlineSustainService, OnlineSustain>(today);
        }

    }
}