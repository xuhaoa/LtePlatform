using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using LtePlatform.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace LtePlatform.Controllers.Account
{
    [Authorize(Roles = "����Ա")]
    [ApiControl("���ӽ�ɫ���û�������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class ManageRolesController : ApiController
    {
        private readonly ApplicationUserManager _userManager;
        private readonly ApplicationRoleManager _roleManager;

        public ManageRolesController()
        {
            var context = ApplicationDbContext.Create();
            _userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(context));
            _roleManager = new ApplicationRoleManager(new RoleStore<ApplicationRole>(context));
        }

        [HttpGet]
        [ApiDoc("�����ɫ���û�֮��İ󶨹�ϵ")]
        [ApiParameterDoc("roleName", "��ɫ����")]
        [ApiParameterDoc("userName", "�û�����")]
        [ApiResponse("����Ƿ�ɹ�")]
        public bool Get(string roleName, string userName)
        {
            if (!_roleManager.RoleExists(roleName)) return false;
            var user = _userManager.FindByName(userName);
            if (user == null) return false;
            if (!_userManager.IsInRole(user.Id, roleName)) return false;
            _userManager.RemoveFromRole(user.Id, roleName);
            return true;
        }

        [HttpPost]
        [ApiDoc("�������û�ɾ��ĳ����ɫ")]
        [ApiParameterDoc("dto", "��ɫɾ����Ϣ��������ɫ���ƺʹ�ɾ�����û��б�")]
        [ApiResponse("ɾ���Ƿ�ɹ�")]
        public bool Post(RoleUsersDto dto)
        {
            if (!_roleManager.RoleExists(dto.RoleName)) return false;
            foreach (
                var user in
                dto.UserNames.Select(userName => _userManager.FindByName(userName))
                    .Where(user => user != null)
                    .Where(user => _userManager.IsInRole(user.Id, dto.RoleName)))
            {
                _userManager.RemoveFromRole(user.Id, dto.RoleName);
            }
            return true;
        }

        [HttpGet]
        [ApiDoc("��ѯָ����ɫ�´����û��б��Ա���ٽ�ɫ")]
        [ApiParameterDoc("roleName", "��ɫ����")]
        [ApiResponse("ָ����ɫ�´����û��б�")]
        public IEnumerable<ApplicationUser> Get(string roleName)
        {
            if (!_roleManager.RoleExists(roleName)) return null;
            return _userManager.Users.Where(user => _userManager.IsInRole(user.Id, roleName));
        }
    }
}