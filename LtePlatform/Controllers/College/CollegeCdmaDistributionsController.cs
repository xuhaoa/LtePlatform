using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("��ѯУ԰��CDMA���ڷֲ��Ŀ�����")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
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
        [ApiDoc("��ѯУ԰��CDMA���ڷֲ��б�")]
        [ApiParameterDoc("collegeName", "У԰����")]
        [ApiResponse("У԰��CDMA���ڷֲ��б�")]
        public IEnumerable<IndoorDistribution> Get(string collegeName)
        {
            return _cdmaService.Query(collegeName);
        }
    }
}