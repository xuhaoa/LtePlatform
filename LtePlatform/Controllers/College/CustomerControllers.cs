using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;

namespace LtePlatform.Controllers.College
{
    public class EmergencyCommunicationController : ApiController
    {
        private readonly EmergencyCommunicationService _service;

        public EmergencyCommunicationController(EmergencyCommunicationService service)
        {
            _service = service;
        }

        [HttpPost]
        public int Post(EmergencyCommunicationDto dto)
        {
            return _service.Dump(dto);
        }

        [HttpGet]
        public EmergencyCommunicationDto Get(int id)
        {
            return _service.Query(id);
        }

        [HttpGet]
        public List<EmergencyCommunicationDto> Get(DateTime begin, DateTime end)
        {
            return _service.Query(begin, end);
        }

        [HttpGet]
        public List<EmergencyCommunicationDto> Get(string district, string town, DateTime begin, DateTime end)
        {
            return _service.Query(district, town, begin, end);
        }
    }

    public class EmergencyProcessController : ApiController
    {
        private readonly EmergencyCommunicationService _service;

        public EmergencyProcessController(EmergencyCommunicationService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<EmergencyProcessDto> Get(int id)
        {
            return _service.QueryProcess(id);
        }

        [Authorize]
        [HttpPost]
        public async Task<EmergencyProcessDto> Post(EmergencyCommunicationDto dto)
        {
            return await _service.Process(dto, User.Identity.Name);
        }

        [HttpPut]
        public async Task<int> Put(EmergencyProcessDto dto)
        {
            return await _service.UpdateAsync(dto);
        }
    }

    public class EmergencyFiberController : ApiController
    {
        private readonly EmergencyFiberService _service;

        public EmergencyFiberController(EmergencyFiberService service)
        {
            _service = service;
        }

        [HttpPost]
        public EmergencyFiberWorkItem Post(EmergencyFiberWorkItem item)
        {
            return _service.Create(item);
        }

        [HttpPut]
        public async Task<int> Put(EmergencyFiberWorkItem item)
        {
            return await _service.Finish(item);
        }
    }

    public class VipDemandController : ApiController
    {
        private readonly VipDemandService _service;

        public VipDemandController(VipDemandService service)
        {
            _service = service;
        }

        [HttpPost]
        public int Post(VipDemandDto dto)
        {
            return _service.Dump(dto);
        }

        [HttpPut]
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
    }
}
