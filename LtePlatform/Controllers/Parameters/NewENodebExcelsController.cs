using System.Collections.Generic;
using System.Web.Http;
using Lte.Domain.Common;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.DataService.Dump;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("������վExcel��Ϣ��ѯ������")]
    public class NewENodebExcelsController : ApiController
    {
        private readonly BasicImportService _service;
        private readonly ENodebDumpService _dumpService;

        public NewENodebExcelsController(BasicImportService service, ENodebDumpService dumpService)
        {
            _service = service;
            _dumpService = dumpService;
        }

        [HttpGet]
        [ApiDoc("��ѯ����Excel��Ϣ")]
        [ApiResponse("����Excel��Ϣ")]
        public IEnumerable<ENodebExcel> Get()
        {
            return _service.GetNewENodebExcels();
        }

        [HttpPost]
        [ApiDoc("���������վExcel��Ϣ")]
        [ApiParameterDoc("container", "�������վExcel��Ϣ")]
        [ApiResponse("�ɹ���������")]
        public int Post(NewENodebListContainer container)
        {
            return _dumpService.DumpNewEnodebExcels(container.Infos);
        }
    }
}