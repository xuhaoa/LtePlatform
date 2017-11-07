using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using LtePlatform.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace LtePlatform.Controllers.Account
{
    [Authorize(Roles = "����Ա")]
    [ApiControl("")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class ManageUsersController : ApiController
    {
        private readonly ApplicationUserManager _userManager;
        private readonly ApplicationRoleManager _roleManager;

        public ManageUsersController()
        {
            var context = ApplicationDbContext.Create();
            _userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(context));
            _roleManager = new ApplicationRoleManager(new RoleStore<ApplicationRole>(context));
        }

        [HttpGet]
        [ApiDoc("���ָ���û������еĽ�ɫ�б�")]
        public IEnumerable<string> Get(string userName)
        {
            var user = _userManager.FindByName(userName);
            if (user == null) return new List<string>();
            return _roleManager.Roles.ToList().Where(x => !_userManager.IsInRole(user.Id, x.Name)).Select(x => x.Name);
        }
    }
}