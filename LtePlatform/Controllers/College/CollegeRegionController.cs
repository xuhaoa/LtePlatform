using System.Web.Http;
using Lte.MySqlFramework.Abstract;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class CollegeRegionController : ApiController
    {
        private readonly ICollegeRepository _repository;

        public CollegeRegionController(ICollegeRepository repository)
        {
            _repository = repository;
        }

        [ApiDoc("��ѯУ԰��������Ϣ����������ͱ߽�����")]
        [ApiParameterDoc("id", "У԰ID")]
        [ApiResponse("У԰��������Ϣ����������ͱ߽�����")]
        public IHttpActionResult Get(int id)
        {
            var region = _repository.GetRegion(id);
            return region == null
                ? (IHttpActionResult)BadRequest("College Id Not Found Or without region!")
                : Ok(region);
        }
    }
}