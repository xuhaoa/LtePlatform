using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;
using Lte.Parameters.Entities.Kpi;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("����������ȷ�����ʵĿ�����")]
    public class TownPreciseImportController : ApiController
    {
        private readonly PreciseImportService _service;

        public TownPreciseImportController(PreciseImportService service)
        {
            _service = service;
        }

        [ApiDoc("��ѯָ�����ڵľ�ȷ����������ͳ��ָ��")]
        [ApiParameterDoc("statTime", "��ѯָ������")]
        [ApiResponse("������ȷ������ͳ��ָ��")]
        public IEnumerable<TownPreciseView> Get(DateTime statTime)
        {
            return _service.GetMergeStats(statTime);
        }

        [HttpPost]
        [ApiDoc("����������ȷ������")]
        [ApiParameterDoc("container", "�ȴ��������ݿ�ļ�¼")]
        public void Post(TownPreciseViewContainer container)
        {
            _service.DumpTownStats(container);
        }
    }
}