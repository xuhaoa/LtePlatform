using Lte.Evaluations.DataService.College;
using Lte.Evaluations.MapperSerive.Infrastructure;
using Lte.Evaluations.ViewModels.Basic;
using Lte.Parameters.Entities;
using LtePlatform.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace LtePlatform.Controllers.College
{
    [ApiControl("查询校园网LTE小区的控制器")]
    public class CollegeCellsController : ApiController
    {
        private readonly CollegeCellViewService _viewService;

        public CollegeCellsController(CollegeCellViewService viewService)
        {
            _viewService = viewService;
        }

        [HttpGet]
        [ApiDoc("查询校园网LTE小区")]
        [ApiParameterDoc("collegeName", "校园名称")]
        [ApiResponse("校园网LTE小区列表")]
        public IEnumerable<CellView> Get(string collegeName)
        {
            return _viewService.GetViews(collegeName);
        }
    }

    [ApiControl("校园网/热点小区批量更新控制器")]
    public class CollegeCellContainerController : ApiController
    {
        private readonly CollegeCellsService _service;

        public CollegeCellContainerController(CollegeCellsService serive)
        {
            _service = serive;
        }

        [HttpPost]
        [ApiDoc("校园网/热点小区批量更新")]
        [ApiParameterDoc("container", "批量更新信息")]
        public async Task<int> Post(CollegeCellNamesContainer container)
        {
            return await _service.UpdateHotSpotCells(container);
        } 
    }

    [ApiControl("查询校园网CDMA小区的控制器")]
    public class CollegeCdmaCellsController : ApiController
    {
        private readonly CollegeCdmaCellViewService _viewService;

        public CollegeCdmaCellsController(CollegeCdmaCellViewService viewService)
        {
            _viewService = viewService;
        }

        [HttpGet]
        [ApiDoc("查询校园网CDMA小区列表")]
        [ApiParameterDoc("collegeName", "校园名称")]
        [ApiResponse("校园网CDMA小区列表")]
        public IEnumerable<CdmaCellView> Get(string collegeName)
        {
            return _viewService.GetViews(collegeName);
        }
    }

    [ApiControl("查询校园网CDMA室内分布的控制器")]
    public class CollegeCdmaDistributionsController : ApiController
    {
        private readonly CollegeLteDistributionService _service;
        private readonly CollegeCdmaDistributionService _cdmaService;

        public CollegeCdmaDistributionsController(CollegeLteDistributionService service,
            CollegeCdmaDistributionService cdmaService)
        {
            _service = service;
            _cdmaService = cdmaService;
        }

        [HttpGet]
        [ApiDoc("查询校园网CDMA室内分布列表")]
        [ApiParameterDoc("collegeName", "校园名称")]
        [ApiResponse("校园网CDMA室内分布列表")]
        public IEnumerable<IndoorDistribution> Get(string collegeName)
        {
            return _cdmaService.Query(collegeName);
        }
    }

    [ApiControl("查询校园网LTE室内分布的控制器")]
    public class CollegeLteDistributionsController : ApiController
    {
        private readonly CollegeLteDistributionService _service;

        public CollegeLteDistributionsController(CollegeLteDistributionService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("查询校园网LTE室内分布列表")]
        [ApiParameterDoc("collegeName", "校园名称")]
        [ApiResponse("校园网LTE室内分布列表")]
        public IEnumerable<IndoorDistribution> Get(string collegeName)
        {
            return _service.Query(collegeName);
        }
    }

    [ApiControl("热点查询控制器")]
    public class HotSpotController : ApiController
    {
        private readonly HotSpotService _service;

        public HotSpotController(HotSpotService service)
        {
            _service = service;
        }

        [HttpPost]
        [ApiDoc("保存热点信息")]
        [ApiParameterDoc("dto", "热点信息")]
        public async Task<int> Post(HotSpotView dto)
        {
            return await _service.SaveBuildingHotSpot(dto.HotspotName, dto.TypeDescription, dto.Address, dto.SourceName);
        }

        [HttpGet]
        [ApiDoc("查询热点信息")]
        [ApiResponse("热点信息")]
        public IEnumerable<HotSpotView> Get()
        {
            return _service.QueryHotSpotViews();
        }
    }
}
