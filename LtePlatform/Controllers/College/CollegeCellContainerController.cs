using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Domain.Common.Geo;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("У԰��/�ȵ�С���������¿�����")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class CollegeCellContainerController : ApiController
    {
        private readonly CollegeCellViewService _service;

        public CollegeCellContainerController(CollegeCellViewService serive)
        {
            _service = serive;
        }

        [HttpGet]
        [ApiDoc("��ѯ�ȵ�LTEС��")]
        [ApiParameterDoc("collegeName", "У԰����")]
        [ApiResponse("�ȵ�LTEС���б�")]
        public IEnumerable<SectorView> Get(string collegeName)
        {
            return _service.QueryCollegeSectors(collegeName);
        }

        [HttpPost]
        [ApiDoc("У԰��/�ȵ�С����������")]
        [ApiParameterDoc("container", "����������Ϣ")]
        public async Task<int> Post(CollegeCellNamesContainer container)
        {
            return await _service.UpdateHotSpotCells(container);
        }
    }
}