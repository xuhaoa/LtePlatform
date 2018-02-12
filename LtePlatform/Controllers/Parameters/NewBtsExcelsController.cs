using System.Collections.Generic;
using System.Web.Http;
using Lte.Domain.Common;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.DataService.Dump;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("����CDMA��վExcel��Ϣ��ѯ������")]
    public class NewBtsExcelsController : ApiController
    {
        private readonly BasicImportService _service;
        private readonly BtsDumpService _dumpService;

        public NewBtsExcelsController(BasicImportService service, BtsDumpService dumpService)
        {
            _service = service;
            _dumpService = dumpService;
        }

        [HttpGet]
        public IEnumerable<BtsExcel> Get()
        {
            return _service.GetNewBtsExcels();
        }

        [HttpPost]
        public int Post(NewBtsListContainer container)
        {
            return _dumpService.DumpBtsExcels(container.Infos);
        }
    }
}