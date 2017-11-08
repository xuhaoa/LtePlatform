using System;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("���£��ϸ�26�����¸�25�գ�������������ѯ������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class WorkItemCurrentMonthController : ApiController
    {
        private readonly WorkItemService _service;

        public WorkItemCurrentMonthController(WorkItemService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯ���£�����Ҫ�����ʱ������ϸ�26�����¸�25�գ�����������")]
        [ApiResponse("���£��ϸ�26�����¸�25�գ�����������, ������������������ͳ�ʱ��")]
        public async Task<Tuple<int, int, int>> Get()
        {
            return await _service.QueryTotalItemsThisMonth();
        }
    }
}