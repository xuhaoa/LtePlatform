using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Lte.Evaluations.DataService.Mr;
using Lte.MySqlFramework.Entities;

namespace LtePlatform.Controllers.Kpi
{
    public class MonthKpiController: ApiController
    {
        private readonly MonthKpiService _service;

        public MonthKpiController(MonthKpiService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<MonthKpiStat> Get()
        {
            return _service.QueryLastMonthKpiStats();
        }
    }

    public class MonthDropTrendController : ApiController
    {
        private readonly MonthKpiService _service;

        public MonthDropTrendController(MonthKpiService service)
        {
            _service = service;
        }

        [HttpGet]
        public Tuple<IEnumerable<string>, IEnumerable<Tuple<string, IEnumerable<double>>>> Get()
        {
            return _service.QureyMonthDropTrend();
        }
    }

    public class MonthFlow4GTo3GTrendController : ApiController
    {
        private readonly MonthKpiService _service;

        public MonthFlow4GTo3GTrendController(MonthKpiService service)
        {
            _service = service;
        }

        [HttpGet]
        public Tuple<IEnumerable<string>, IEnumerable<Tuple<string, IEnumerable<double>>>> Get()
        {
            return _service.QureyMonthFlow4GTo3GTrend();
        }
    }

    public class MonthPreciseTrendController : ApiController
    {
        private readonly MonthKpiService _service;

        public MonthPreciseTrendController(MonthKpiService service)
        {
            _service = service;
        }

        [HttpGet]
        public Tuple<IEnumerable<string>, IEnumerable<Tuple<string, IEnumerable<double>>>> Get()
        {
            return _service.QureyMonthPreciseTrend();
        }
    }
}