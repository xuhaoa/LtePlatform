using Lte.Evaluations.DataService.College;
using Lte.Evaluations.ViewModels.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace LtePlatform.Controllers.College
{
    [ApiControl("应急通信需求查询控制器")]
    public class EmergencyCommunicationController : ApiController
    {
        private readonly EmergencyCommunicationService _service;

        public EmergencyCommunicationController(EmergencyCommunicationService service)
        {
            _service = service;
        }

        [HttpPost]
        [ApiDoc("导入一条应急通信需求记录")]
        [ApiParameterDoc("dto", "应急通信需求记录数据")]
        [ApiResponse("导入结果")]
        public int Post(EmergencyCommunicationDto dto)
        {
            return _service.Dump(dto);
        }

        [HttpGet]
        [ApiDoc("根据记录编号查询应急通信需求记录")]
        [ApiParameterDoc("id", "记录编号")]
        [ApiResponse("应急通信需求记录")]
        public EmergencyCommunicationDto Get(int id)
        {
            return _service.Query(id);
        }

        [HttpGet]
        [ApiDoc("查询一定时间范围内的应急通信需求记录")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("一定时间范围内的应急通信需求记录列表")]
        public List<EmergencyCommunicationDto> Get(DateTime begin, DateTime end)
        {
            return _service.Query(begin, end);
        }

        [HttpGet]
        [ApiDoc("查询一定时间范围内指定镇区的应急通信需求记录")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiParameterDoc("district", "区域")]
        [ApiParameterDoc("town", "镇")]
        [ApiResponse("一定时间范围内制定镇区的应急通信需求记录列表")]
        public List<EmergencyCommunicationDto> Get(string district, string town, DateTime begin, DateTime end)
        {
            return _service.Query(district, town, begin, end);
        }
    }

    [ApiControl("应急流程查询控制器")]
    public class EmergencyProcessController : ApiController
    {
        private readonly EmergencyCommunicationService _service;

        public EmergencyProcessController(EmergencyCommunicationService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("根据应急需求编号查询对应的流程信息")]
        [ApiParameterDoc("id", "应急需求记录编号")]
        [ApiResponse("对应的流程信息，应该是一个列表，一个步骤对应一条记录")]
        public IEnumerable<EmergencyProcessDto> Get(int id)
        {
            return _service.QueryProcess(id);
        }

        [Authorize]
        [HttpPost]
        [ApiDoc("给定应急需求信息，新增建立一条应急需求流程处理信息")]
        [ApiParameterDoc("dto", "应急需求信息")]
        [ApiResponse("建立结果")]
        public async Task<EmergencyProcessDto> Post(EmergencyCommunicationDto dto)
        {
            return await _service.ConstructProcess(dto, User.Identity.Name);
        }

        [HttpPut]
        [ApiDoc("修改一条应急需求流程处理信息，一般是修改状态")]
        [ApiParameterDoc("dto", "应急需求流程处理信息")]
        [ApiResponse("修改结果")]
        public async Task<int> Put(EmergencyProcessDto dto)
        {
            return await _service.UpdateAsync(dto);
        }
    }

    public class EmergencyFiberController : ApiController
    {
        private readonly EmergencyFiberService _service;

        [HttpGet]
        public IEnumerable<EmergencyFiberWorkItem> Get(int id)
        {
            return _service.Query(id);
        }

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

    [ApiControl("政企客户需求查询控制器")]
    public class VipDemandController : ApiController
    {
        private readonly VipDemandService _service;

        public VipDemandController(VipDemandService service)
        {
            _service = service;
        }

        [HttpPost]
        [ApiDoc("新增政企客户")]
        [ApiParameterDoc("dto", "政企客户信息")]
        public int Post(VipDemandDto dto)
        {
            return _service.Dump(dto);
        }

        [HttpPut]
        [ApiDoc("更新政企客户")]
        [ApiParameterDoc("dto", "政企客户信息")]
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

    [ApiControl("校园VIP需求查询控制器")]
    public class CollegeVipDemandController : ApiController
    {
        private readonly VipDemandService _service;

        public CollegeVipDemandController(VipDemandService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询指定校园名称指定年份的VIP需求")]
        [ApiParameterDoc("collegeName", "指定校园名称")]
        [ApiParameterDoc("year", "指定年份")]
        [ApiResponse("VIP需求")]
        public VipDemandDto Get(string collegeName, int year)
        {
            return _service.QueryYearDemand(collegeName, year);
        }

        [HttpGet]
        [ApiDoc("查询指定年份的VIP需求列表")]
        [ApiParameterDoc("year", "指定年份")]
        [ApiResponse("VIP需求列表")]
        public IEnumerable<VipDemandDto> Get(int year)
        {
            return _service.QueryYearDemands(year);
        }

        [HttpPost]
        [Authorize]
        [ApiDoc("保存单个校园网年度信息")]
        [ApiParameterDoc("stat", "单个校园网年度信息")]
        public async Task<int> Post(CollegeYearView stat)
        {
            return await _service.ConstructCollegeDemand(stat, User.Identity.Name);
        }
    }

    [ApiControl("VIP需求处理过程查询控制器")]
    public class VipProcessController : ApiController
    {
        private readonly VipDemandService _service;

        public VipProcessController(VipDemandService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("根据工单序列号查询VIP处理过程信息")]
        [ApiParameterDoc("serialNumber", "工单序列号")]
        [ApiResponse("VIP处理过程数据单元列表")]
        public IEnumerable<VipProcessDto> Get(string serialNumber)
        {
            return _service.QueryProcess(serialNumber);
        }

        [Authorize]
        [HttpPost]
        [ApiDoc("处理单个VIP需求信息，处理后返回处理结果")]
        [ApiParameterDoc("dto", "单个VIP需求信息")]
        [ApiResponse("处理结果")]
        public async Task<VipProcessDto> Post(VipDemandDto dto)
        {
            return await _service.ConstructProcess(dto, User.Identity.Name);
        }

        [HttpPut]
        [ApiDoc("处理VIP需求处理过程，录入信息")]
        [ApiParameterDoc("dto", "单个VIP需求处理过程信息")]
        public async Task<int> Put(VipProcessDto dto)
        {
            return await _service.UpdateAsync(dto);
        }
    }

    public class VipProcessFinishController : ApiController
    {
        private readonly VipDemandService _service;

        public VipProcessFinishController(VipDemandService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpPost]
        public async Task<int> Post(VipProcessDto dto)
        {
            return await _service.FinishAsync(dto, User.Identity.Name);
        } 
    }

    [ApiControl("抱怨量位置更新控制器")]
    public class ComplainPositionController : ApiController
    {
        private readonly ComplainService _service;

        public ComplainPositionController(ComplainService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<ComplainPositionDto> Get(DateTime begin, DateTime end)
        {
            return _service.QueryPositionDtos(begin, end);
        }

        [HttpPost]
        public async Task<int> Post(ComplainPositionDto dto)
        {
            return await _service.UpdateTown(dto);
        } 
    }

    public class ComplainQueryController : ApiController
    {
        private readonly ComplainService _service;

        public ComplainQueryController(ComplainService service)
        {
            _service = service;
        }

        [HttpGet]
        public List<ComplainDto> Get(DateTime begin, DateTime end)
        {
            return _service.Query(begin, end);
        }

        [HttpGet]
        public async Task<int> GetCount(DateTime today)
        {
            return await _service.QueryCount<ComplainService, ComplainItem>(today);
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

        [HttpGet]
        public ComplainDto Get(string serialNumber)
        {
            return _service.Query(serialNumber);
        }
        
        [HttpPut]
        public async Task<int> Put(ComplainDto dto)
        {
            return await _service.UpdateAsync(dto);
        }
    }

    public class ComplainProcessController : ApiController
    {
        private readonly ComplainService _service;

        public ComplainProcessController(ComplainService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<ComplainProcessDto> Get(string serialNumber)
        {
            return _service.QueryProcess(serialNumber);
        }

        [Authorize]
        [HttpPost]
        public async Task<ComplainProcessDto> Post(ComplainDto dto)
        {
            return await _service.ConstructProcess(dto, User.Identity.Name);
        }

        [HttpPut]
        public async Task<int> Put(ComplainProcessDto dto)
        {
            return await _service.UpdateAsync(dto);
        }
    }

    [ApiControl("分公司需求查询控制器")]
    public class BranchDemandController : ApiController
    {
        private readonly BranchDemandService _service;

        public BranchDemandController(BranchDemandService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询到指定日期当月发生的分公司需求数")]
        [ApiParameterDoc("today", "指定统计日期")]
        [ApiResponse("到指定日期当月发生的分公司需求数")]
        public async Task<int> GetCount(DateTime today)
        {
            return await _service.QueryCount<BranchDemandService, BranchDemand>(today);
        }

        [HttpGet]
        [ApiDoc("查询指定日期范围内的分公司需求列表")]
        [ApiParameterDoc("begin", "开始日期")]
        [ApiParameterDoc("end", "结束日期")]
        [ApiResponse("分公司需求列表")]
        public List<BranchDemandDto> Get(DateTime begin, DateTime end)
        {
            return _service.QueryList(begin, end);
        }

    }

    public class OnlineSustainController : ApiController
    {
        private readonly OnlineSustainService _service;

        public OnlineSustainController(OnlineSustainService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<int> GetCount(DateTime today)
        {
            return await _service.QueryCount<OnlineSustainService, OnlineSustain>(today);
        }

        [HttpGet]
        public List<OnlineSustainDto> Get(DateTime begin, DateTime end)
        {
            return _service.QueryList(begin, end);
        }

    }
}
