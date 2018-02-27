using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("С��վַ��ѯ������")]
    public class CellStationController : ApiController
    {
        private readonly CellRruService _service;

        public CellStationController(CellRruService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("����վַ��Ų�ѯС��RRU��Ϣ")]
        [ApiParameterDoc("stationNum", "վַ���")]
        [ApiResponse("С��RRU��Ϣ�б�")]
        public IEnumerable<CellRruView> Get(string stationNum)
        {
            return _service.GetByStationNum(stationNum);
        }

        [HttpGet]
        [ApiDoc("����RRU���Ʋ�ѯС��RRU")]
        [ApiParameterDoc("rruName", "RRU����")]
        [ApiResponse("С��RRU��Ϣ�б�")]
        public IEnumerable<CellRruView> GetByName(string rruName)
        {
            return _service.GetByRruName(rruName);
        }

        [HttpGet]
        [ApiDoc("���ݹ滮��Ų�ѯС��RRU��Ϣ")]
        [ApiParameterDoc("planNum", "�滮���")]
        [ApiResponse("С��RRU��Ϣ�б�")]
        public IEnumerable<CellRruView> GetViews(string planNum)
        {
            return _service.GetByPlanNum(planNum);
        }
    }
}