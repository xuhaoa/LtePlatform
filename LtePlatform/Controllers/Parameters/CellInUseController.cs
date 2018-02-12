using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("����С����ѯ������")]
    public class CellInUseController : ApiController
    {
        private readonly CellService _service;

        public CellInUseController(CellService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("������վ��ŶԶ���������ͼ�����б�")]
        [ApiParameterDoc("eNodebId", "��վ���")]
        [ApiResponse("�Զ���������ͼ�����б�")]
        public IEnumerable<SectorView> Get(int eNodebId)
        {
            return _service.QuerySectorsInUse(eNodebId);
        }

    }
}