using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Lte.Evaluations.DataService.Mr;
using Lte.Evaluations.ViewModels.Mr;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities.Mr;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Mr
{
    [ApiControl("从MongoDB数据库中查询小区干扰信息统计")]
    public class CellStasticController : ApiController
    {
        private readonly CellStasticService _service;

        public CellStasticController(CellStasticService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定日期范围内的单个小区聚合小区干扰信息统计")]
        [ApiParameterDoc("eNodebId", "小区基站编号")]
        [ApiParameterDoc("pci", "小区PCI（由于MR中不记录扇区编号，必须用PCI进行查询）")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("单个小区聚合小区干扰信息统计")]
        public CellStasticView Get(int eNodebId, short pci, DateTime begin, DateTime end)
        {
            return _service.QueryDateSpanAverageStat(eNodebId, pci, begin.Date, end.Date);
        }

        [HttpGet]
        [ApiDoc("查询指定日期范围内的单个小区聚合小区覆盖信息统计")]
        [ApiParameterDoc("eNodebId", "小区基站编号")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("单个小区聚合小区覆盖信息统计")]
        public List<CellStatMysql> Get(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            return _service.QueryDateSpanStatList(eNodebId, sectorId, begin.Date, end.Date);
        }

        [HttpGet]
        public List<CellStastic> Get(int eNodebId, byte sectorId, DateTime date)
        {
            return _service.QueryOneDayStats(eNodebId, sectorId, date.Date);
        }
    }

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
