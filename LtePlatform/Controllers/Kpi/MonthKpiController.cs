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

    public class MonthComplainsTrendController : ApiController
    {
        private readonly MonthKpiService _service;

        public MonthComplainsTrendController(MonthKpiService service)
        {
            _service = service;
        }

        [HttpGet]
        public Tuple<IEnumerable<string>, IEnumerable<Tuple<string, IEnumerable<int>>>> Get()
        {
            return _service.QueryTotalComplainsTrend();
        }
    }

    public class MonthYuejiTrendController : ApiController
    {
        private readonly MonthKpiService _service;

        public MonthYuejiTrendController(MonthKpiService service)
        {
            _service = service;
        }

        [HttpGet]
        public Tuple<IEnumerable<string>, IEnumerable<Tuple<string, IEnumerable<int>>>> Get()
        {
            return _service.QueryYuejiComplainsTrend();
        }
    }

    public class MonthGongxinTrendController : ApiController
    {
        private readonly MonthKpiService _service;

        public MonthGongxinTrendController(MonthKpiService service)
        {
            _service = service;
        }

        [HttpGet]
        public Tuple<IEnumerable<string>, IEnumerable<Tuple<string, IEnumerable<int>>>> Get()
        {
            return _service.QueryGongxinComplainsTrend();
        }
    }
}