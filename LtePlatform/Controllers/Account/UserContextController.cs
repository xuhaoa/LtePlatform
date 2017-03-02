using LtePlatform.Models;
using System.Web.Http;

namespace LtePlatform.Controllers.Account
{
    public class CurrentUserController : ApiController
    {
        [HttpGet]
        public IndexViewModel Get()
        {
            return UserContextConfiguration.CurrentUser;
        } 
    }

    [Authorize]
    public class CurrentUserNameController : ApiController
    {
        [HttpGet]
        public string Get()
        {
            return User.Identity.Name;
        }
    }
}
