using System.Web.Http;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Account
{
    [Authorize]
    [ApiControl("查询当前用户名称")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class CurrentUserNameController : ApiController
    {
        [HttpGet]
        [ApiDoc("查询当前用户名称")]
        [ApiResponse("当前用户名称")]
        public string Get()
        {
            return User.Identity.Name;
        }
    }
}