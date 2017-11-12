using System.Security.Principal;
using LtePlatform.Models;
using System.Web.Http;

namespace LtePlatform.Controllers.Account
{
    [ApiControl("查询当前用户信息")]
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

    public class UserInfoController : ApiController
    {
        [HttpGet]
        public IIdentity Get()
        {
            return User.Identity;
        }
    }
}
