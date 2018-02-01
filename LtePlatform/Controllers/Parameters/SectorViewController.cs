using System.Collections.Generic;
using System.Web.Http;
using Lte.Domain.Common.Geo;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    [ApiControl("������ͼ��ѯ������")]
    public class SectorViewController : ApiController
    {
        private readonly CellService _service;

        public SectorViewController(CellService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ȡ��γ�ȷ�Χ�ڵ�������ͼ�б�")]
        [ApiParameterDoc("west", "���߾���")]
        [ApiParameterDoc("east", "���߾���")]
        [ApiParameterDoc("south", "�ϱ�γ��")]
        [ApiParameterDoc("north", "����γ��")]
        [ApiResponse("��γ�ȷ�Χ�ڵ�������ͼ�б�")]
        public IEnumerable<SectorView> Get(double west, double east, double south, double north)
        {
            return _service.QuerySectors(west, east, south, north);
        }

        [HttpPost]
        [ApiDoc("��ȡ��γ�ȷ�Χ�ڵĳ�ĳЩС�����������ͼ�б�")]
        [ApiParameterDoc("container", "ָ��������Χ")]
        [ApiResponse("ָ��������Χ�ڵ�������ͼ�б�")]
        public IEnumerable<SectorView> Get(SectorRangeContainer container)
        {
            return _service.QuerySectors(container);
        }
    }
}