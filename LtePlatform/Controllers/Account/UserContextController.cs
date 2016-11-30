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
}
