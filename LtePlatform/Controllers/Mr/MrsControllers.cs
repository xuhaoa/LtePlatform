using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Lte.Evaluations.DataService.Mr;
using Lte.Parameters.Entities.Kpi;

namespace LtePlatform.Controllers.Mr
{
    public class MrsPhrController : ApiController
    {
        private readonly MrsService _service;

        public MrsPhrController(MrsService service)
        {
            _service = service;
        }

        [HttpGet]
        public MrsPhrStat Get(int eNodebId, byte sectorId, DateTime statDate)
        {
            return _service.QueryPhrStat(eNodebId, sectorId, statDate);
        }
    }

    public class MrsRsrpController : ApiController
    {
        private readonly MrsService _service;

        public MrsRsrpController(MrsService service)
        {
            _service = service;
        }

        [HttpGet]
        public MrsRsrpStat Get(int eNodebId, byte sectorId, DateTime statDate)
        {
            return _service.QueryRsrpStat(eNodebId, sectorId, statDate);
        }
    }

    public class MrsTadvController : ApiController
    {
        private readonly MrsService _service;

        public MrsTadvController(MrsService service)
        {
            _service = service;
        }

        [HttpGet]
        public MrsTadvStat Get(int eNodebId, byte sectorId, DateTime statDate)
        {
            return _service.QueryTadvStat(eNodebId, sectorId, statDate);
        }
    }

    public class MrsSinrUlController : ApiController
    {
        private readonly MrsService _service;

        public MrsSinrUlController(MrsService service)
        {
            _service = service;
        }

        [HttpGet]
        public MrsSinrUlStat Get(int eNodebId, byte sectorId, DateTime statDate)
        {
            return _service.QuerySinrUlStat(eNodebId, sectorId, statDate);
        }
    }

    public class MrsTadvRsrpController : ApiController
    {
        private readonly MrsService _service;

        public MrsTadvRsrpController(MrsService service)
        {
            _service = service;
        }

        public MrsTadvRsrpStat Get(int eNodebId, byte sectorId, DateTime statDate)
        {
            return _service.QueryTadvRsrpStat(eNodebId, sectorId, statDate);
        }
    }
}