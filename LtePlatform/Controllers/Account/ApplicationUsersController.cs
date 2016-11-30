using LtePlatform.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace LtePlatform.Controllers.Account
{
    [ApiControl("应用程序用户管理控制器")]
    [Authorize]
    public class ApplicationUsersController : ApiController
    {
        [HttpGet]
        [ApiDoc("获得目前所有用户信息列表")]
        [ApiResponse("应用程序中已注册的所有用户信息列表")]
        public IEnumerable<ApplicationUserViewModel> Get()
        {
            var context = ApplicationDbContext.Create();
            return context.Users.Select(x => new ApplicationUserViewModel
            {
                UserName = x.UserName,
                Email = x.Email,
                PhoneNumber = x.PhoneNumber,
                Hometown = x.Hometown,
                EmailHasBeenConfirmed = false
            });
        } 
    }
}
