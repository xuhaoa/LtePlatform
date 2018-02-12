using System.Collections.Generic;
using System.Web.Http;
using Lte.Domain.Common;
using Lte.Evaluations.DataService.Basic;
using Lte.Evaluations.DataService.Dump;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("����CDMAС����EXCEL��¼�Ŀ�������������߼������ϴ�����EXCEL�ļ���Ȼ��ӷ�������ȡ�����������������û������ݽ����ֹ�����Ȼ������������ϴ�")]
    public class NewCdmaCellExcelsController : ApiController
    {
        private readonly BasicImportService _service;
        private readonly CdmaCellDumpService _dumpService;

        public NewCdmaCellExcelsController(BasicImportService service, CdmaCellDumpService dumpService)
        {
            _service = service;
            _dumpService = dumpService;
        }

        [HttpGet]
        [ApiDoc("�ӷ�������ȡ��������CDMAС����EXCEL��¼���ϣ�����֮ǰ�Ѿ���������ϴ���EXCEL�ļ�������˽���")]
        [ApiResponse("��������CDMAС����EXCEL��¼����")]
        public IEnumerable<CdmaCellExcel> Get()
        {
            return _service.GetNewCdmaCellExcels();
        }

        [HttpPost]
        [ApiDoc("�����ϴ�CDMAС����Ϣ�����ݿ�")]
        [ApiParameterDoc("container", "������������CDMAС����EXCEL��¼���ϵ�����������WebApi��֧��ֱ��POST���ϣ���Ҫ�����װ������")]
        [ApiResponse("�ϴ��ɹ�������")]
        public int Post(NewCdmaCellListContainer container)
        {
            return _dumpService.DumpNewCellExcels(container.Infos);
        }
    }
}