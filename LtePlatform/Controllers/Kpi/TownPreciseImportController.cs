using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.MySqlFramework.Entities;
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
        [HttpGet]
        public IEnumerable<TownPreciseView> Get(DateTime statTime)
        {
            return _service.GetMergeStats(statTime);
        }

        [HttpGet]
        public IEnumerable<TownMrsRsrp> GetMrs(DateTime statDate)
        {
            return _service.GetMergeMrsStats(statDate);
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