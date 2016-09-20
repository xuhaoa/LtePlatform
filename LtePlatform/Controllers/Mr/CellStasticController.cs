using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Mr;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Mr
{
    [ApiControl("平均RSRP查询控制器")]
    public class AverageRsrpTaController : ApiController
    {
        private readonly CellDistanceService _service;

        public AverageRsrpTaController(CellDistanceService service)
        {
            _service = service;
        }

        [ApiDoc("查询指定日期的平均RSRP按照TA分布")]
        [ApiParameterDoc("eNodebId", "基站编号")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiParameterDoc("date", "统计日期")]
        [ApiResponse("指定日期的平均RSRP按照TA分布，区间是0-100米、100-200米、200-300米等")]
        [HttpGet]
        public List<double> Get(int eNodebId, byte sectorId, DateTime date)
        {
            return _service.QueryAverageRsrpTaStatList(eNodebId, sectorId, date);
        }

        [ApiDoc("查询日期范围的平均RSRP按照TA分布")]
        [ApiParameterDoc("eNodebId", "基站编号")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("平均RSRP按照TA区间分布，区间是0-100米、100-200米、200-300米等")]
        [HttpGet]
        public List<double> Get(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            return _service.QueryAverageRsrpTaStatList(eNodebId, sectorId, begin, end);
        }
    }

    [ApiControl("高于-110dBm覆盖率查询控制器")]
    public class Above110TaRateController : ApiController
    {
        private readonly CellDistanceService _service;

        public Above110TaRateController(CellDistanceService service)
        {
            _service = service;
        }

        [ApiDoc("查询指定日期的高于-110dBm覆盖率按照TA分布")]
        [ApiParameterDoc("eNodebId", "基站编号")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiParameterDoc("date", "统计日期")]
        [ApiResponse("高于-110dBm覆盖率按照TA区间分布，区间是0-100米、100-200米、200-300米等")]
        [HttpGet]
        public List<double> Get(int eNodebId, byte sectorId, DateTime date)
        {
            return _service.QueryAbove110TaRateList(eNodebId, sectorId, date);
        }

        [ApiDoc("查询指定日期的高于-110dBm覆盖率按照TA分布")]
        [ApiParameterDoc("eNodebId", "基站编号")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("高于-110dBm覆盖率按照TA区间分布，区间是0-100米、100-200米、200-300米等")]
        [HttpGet]
        public List<double> Get(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            return _service.QueryAbove110TaRateList(eNodebId, sectorId, begin, end);
        }
    }

    [ApiControl("高于-105dBm覆盖率查询控制器")]
    public class Above105TaRateController : ApiController
    {
        private readonly CellDistanceService _service;

        public Above105TaRateController(CellDistanceService service)
        {
            _service = service;
        }

        [ApiDoc("查询指定日期的高于-105dBm覆盖率按照TA分布")]
        [ApiParameterDoc("eNodebId", "基站编号")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiParameterDoc("date", "统计日期")]
        [ApiResponse("高于-105dBm覆盖率按照TA区间分布，区间是0-100米、100-200米、200-300米等")]
        [HttpGet]
        public List<double> Get(int eNodebId, byte sectorId, DateTime date)
        {
            return _service.QueryAbove105TaRateList(eNodebId, sectorId, date);
        }

        [ApiDoc("查询指定日期的高于-105dBm覆盖率按照TA分布")]
        [ApiParameterDoc("eNodebId", "基站编号")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("高于-105dBm覆盖率按照TA区间分布，区间是0-100米、100-200米、200-300米等")]
        [HttpGet]
        public List<double> Get(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            return _service.QueryAbove105TaRateList(eNodebId, sectorId, begin, end);
        }
    }
}
