using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Dt
{
    [ApiControl("���������ļ�������Ϣ��ѯ������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class TownTestInfoController : ApiController
    {
        private readonly TownTestInfoService _service;

        public TownTestInfoController(TownTestInfoService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯָ�������ļ�����֪���ͣ��ڸ�����������ϸ��Ϣ")]
        [ApiParameterDoc("csvFileName", "�����ļ�����")]
        [ApiParameterDoc("type", "�����ļ�����")]
        [ApiResponse("��������DTͳ�Ƶ���ϸ��Ϣ")]
        public IEnumerable<AreaTestInfo> Get(string csvFileName, string type)
        {
            return _service.CalculateAreaTestInfos(csvFileName, type);
        }

        [HttpGet]
        public IEnumerable<AreaTestInfo> Get(int fileId)
        {
            return _service.QueryAreaTestInfos(fileId);
        }

        [HttpPut]
        public int Put(AreaTestInfo info)
        {
            return _service.UpdateAreaTestInfo(info);
        }
    }
}