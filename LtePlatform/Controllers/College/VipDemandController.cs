using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("����ͻ������ѯ������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class VipDemandController : ApiController
    {
        private readonly VipDemandService _service;

        public VipDemandController(VipDemandService service)
        {
            _service = service;
        }

        [HttpPost]
        [ApiDoc("��������ͻ�")]
        [ApiParameterDoc("dto", "����ͻ���Ϣ")]
        public int Post(VipDemandDto dto)
        {
            return _service.Dump(dto);
        }

        [HttpPut]
        [ApiDoc("��������ͻ�")]
        [ApiParameterDoc("dto", "����ͻ���Ϣ")]
        public async Task<int> Put(VipDemandDto dto)
        {
            return await _service.UpdateAsync(dto);
        }

        [HttpGet]
        public List<VipDemandDto> Get(DateTime begin, DateTime end)
        {
            return _service.Query(begin, end);
        }

        [HttpGet]
        public List<VipDemandDto> Get(string district, string town, DateTime begin, DateTime end)
        {
            return _service.Query(district, town, begin, end);
        }

        [HttpGet]
        public VipDemandDto Get(string serialNumber)
        {
            return _service.QuerySingle(serialNumber);
        }

        [HttpGet]
        public async Task<int> GetCount(DateTime today)
        {
            return await _service.QueryCount<VipDemandService, VipDemand>(today);
        }
    }
}