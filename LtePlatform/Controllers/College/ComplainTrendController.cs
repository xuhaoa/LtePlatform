using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("���Ͷ�ߵ��仯���Ʋ�ѯ������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class ComplainTrendController : ApiController
    {
        private readonly ComplainService _service;

        public ComplainTrendController(ComplainService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯ����������ΪֹͶ�߹�������")]
        public async Task<int> GetCount(DateTime today)
        {
            return await _service.QueryThisMonthCount<ComplainService, ComplainItem>(today);
        }

        [HttpGet]
        public Tuple<IEnumerable<string>, IEnumerable<int>> GetTrend(DateTime date)
        {
            return _service.Query<ComplainService, ComplainItem>(date, x => x.BeginTime);
        }

        [HttpGet]
        public async Task<Tuple<List<string>, List<int>>> QueryCounts(DateTime countDate)
        {
            return await _service.QueryCounts<ComplainService, ComplainItem>(countDate);
        }

    }
}