using Lte.Evaluations.DataService.Mr;
using Lte.Parameters.Entities.Neighbor;
using LtePlatform.Models;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.ViewModels.Mr;
using Lte.Parameters.Entities.Kpi;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("查询LTE邻区控制器")]
    public class LteNeighborCellController : ApiController
    {
        private readonly LteNeighborCellService _service;

        public LteNeighborCellController(LteNeighborCellService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("根据小区编号和扇区编号查询LTE邻区列表")]
        [ApiParameterDoc("cellId", "小区编号(eNodebId)")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiResponse("LTE邻区列表（PCI可能为空）")]
        public List<LteNeighborCell> Get(int cellId, byte sectorId)
        {
            return _service.QueryCells(cellId, sectorId);
        } 
    }

    [ApiControl("查询PCI邻区控制器")]
    public class NearestPciCellController : ApiController
    {
        private readonly NearestPciCellService _service;

        public NearestPciCellController(NearestPciCellService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("根据小区编号和扇区编号查询PCI邻区列表")]
        [ApiParameterDoc("cellId", "小区编号(eNodebId)")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiResponse("PCI邻区列表")]
        public List<NearestPciCellView> Get(int cellId, byte sectorId)
        {
            return _service.QueryCells(cellId, sectorId);
        }

        [HttpGet]
        [ApiDoc("根据小区编号和扇区编号和PCI查询邻区")]
        [ApiParameterDoc("cellId", "小区编号(eNodebId)")]
        [ApiParameterDoc("sectorId", "扇区编号")]
        [ApiParameterDoc("pci", "邻区PCI")]
        [ApiResponse("邻区")]
        public NearestPciCell Get(int cellId, byte sectorId, short pci)
        {
            return _service.QueryNearestPciCell(cellId, sectorId, pci);
        }

        [HttpPost]
        [ApiDoc("更新精确覆盖率统计项内邻区列表的PCI定义")]
        [ApiParameterDoc("view", "精确覆盖率统计项")]
        [ApiResponse("更新结果")]
        public int Post(Precise4GView view)
        {
            return _service.UpdateNeighborPcis(view.CellId, view.SectorId);
        }

        [HttpPut]
        [ApiDoc("更新单条邻区定义")]
        [ApiParameterDoc("cell", "待更新的邻区信息")]
        public void Put(NearestPciCell cell)
        {
            _service.UpdateNeighborCell(cell);
        }
    }
}
