using LtePlatform.Models;
using System.Web.Http;

namespace LtePlatform.Controllers.Account
{
    [ApiControl("查询当前用户信息")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class CurrentUserController : ApiController
    {
        [HttpGet]
        [ApiDoc("查询当前用户信息")]
        [ApiResponse("当前用户信息视图")]
        public IndexViewModel Get()
        {
            return UserContextConfiguration.CurrentUser;
        } 
    }
}
