using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("��ѯ�ȵ�LTEС���Ŀ�����")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class HotSpotCellsController : ApiController
    {
        private readonly CollegeCellViewService _viewService;

        public HotSpotCellsController(CollegeCellViewService viewService)
        {
            _viewService = viewService;
        }

        [HttpGet]
        [ApiDoc("��ѯ�ȵ�LTEС��")]
        [ApiParameterDoc("name", "�ȵ�����")]
        [ApiResponse("�ȵ�LTEС���б�")]
        public IEnumerable<CellRruView> Get(string name)
        {
            return _viewService.GetHotSpotViews(name);
        }
    }
}