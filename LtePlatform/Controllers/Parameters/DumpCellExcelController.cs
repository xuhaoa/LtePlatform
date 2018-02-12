using System.Collections.Generic;
using System.Web.Http;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.DataService.Dump;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("LTEС����Excel���������")]
    public class DumpCellExcelController : ApiController
    {
        private readonly CellDumpService _service;
        private readonly BasicImportService _importService;

        public DumpCellExcelController(CellDumpService service, BasicImportService importService)
        {
            _service = service;
            _importService = importService;
        }

        [HttpPost]
        [ApiDoc("��Excel����LTEС����Ϣ")]
        [ApiParameterDoc("info", "LTEС����Ϣ")]
        [ApiResponse("�����Ƿ�ɹ� ")]
        public bool Post(CellExcel info)
        {
            return _service.DumpSingleCellExcel(info);
        }

        [HttpGet]
        [ApiDoc("�Աȵ����LTEС����Ϣ�����ݿ�������Ϣ����ȡ���д�������LTEС�������Ϣ")]
        [ApiResponse("���д�������LTEС�������Ϣ")]
        public IEnumerable<CellIdPair> Get()
        {
            return _importService.GetVanishedCellIds();
        }

        [HttpPut]
        [ApiDoc("�����޸����ݿ���LTEС��������״̬")]
        [ApiParameterDoc("container", "��������LTEС���������")]
        public void Put(CellIdsContainer container)
        {
            _service.VanishCells(container);
        }
    }
}