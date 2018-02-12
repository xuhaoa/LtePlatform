using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.Mr;
using Lte.Evaluations.ViewModels.Precise;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("��ѯPCI����������")]
    public class NearestPciCellController : ApiController
    {
        private readonly NearestPciCellService _service;

        public NearestPciCellController(NearestPciCellService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("����С����ź�������Ų�ѯPCI�����б�")]
        [ApiParameterDoc("cellId", "С�����(eNodebId)")]
        [ApiParameterDoc("sectorId", "�������")]
        [ApiResponse("PCI�����б�")]
        public List<NearestPciCellView> Get(int cellId, byte sectorId)
        {
            return _service.QueryCells(cellId, sectorId);
        }

        [HttpGet]
        [ApiDoc("����С����ź�������ź�PCI��ѯ����")]
        [ApiParameterDoc("cellId", "С�����(eNodebId)")]
        [ApiParameterDoc("sectorId", "�������")]
        [ApiParameterDoc("pci", "����PCI")]
        [ApiResponse("����")]
        public NearestPciCell Get(int cellId, byte sectorId, short pci)
        {
            return _service.QueryNearestPciCell(cellId, sectorId, pci);
        }

        [HttpPost]
        [ApiDoc("���¾�ȷ������ͳ�����������б��PCI����")]
        [ApiParameterDoc("view", "��ȷ������ͳ����")]
        [ApiResponse("���½��")]
        public int Post(Precise4GView view)
        {
            return _service.UpdateNeighborPcis(view.CellId, view.SectorId);
        }

        [HttpPut]
        [ApiDoc("���µ�����������")]
        [ApiParameterDoc("cell", "�����µ�������Ϣ")]
        public void Put(NearestPciCell cell)
        {
            _service.UpdateNeighborCell(cell);
        }
    }
}