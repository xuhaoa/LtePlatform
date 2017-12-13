﻿using System;
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
}