using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.Kpi;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Kpi
{
    [ApiControl("������������������")]
    public class DumpZteFlowController : ApiController
    {
        private readonly FlowService _service;

        public DumpZteFlowController(FlowService service)
        {
            _service = service;
        }

        [HttpPut]
        [ApiDoc("����һ����������")]
        [ApiResponse("�Ƿ��Ѿ��ɹ�����")]
        public Task<bool> Put()
        {
            return _service.DumpOneZteStat();
        }

        [HttpGet]
        [ApiDoc("��õ�ǰ�������д��������������ͳ�Ƽ�¼��")]
        [ApiResponse("��ǰ�������д��������������ͳ�Ƽ�¼��")]
        public int Get()
        {
            return _service.FlowZteCount;
        }

        [HttpDelete]
        [ApiDoc("��մ��������������ͳ�Ƽ�¼")]
        public void Delete()
        {
            _service.ClearZteStats();
        }
    }
}