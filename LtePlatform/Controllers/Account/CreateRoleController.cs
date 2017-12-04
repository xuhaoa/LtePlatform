using System.Threading.Tasks;
using System.Web.Http;
using LtePlatform.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace LtePlatform.Controllers.Account
{
    [Authorize(Roles = "����Ա")]
    [ApiControl("������ɫ������")]
    public class CreateRoleController : ApiController
    {
        [HttpGet]
        [ApiDoc("����һ����ɫ")]
        [ApiParameterDoc("roleName", "��ɫ����")]
        [ApiResponse("���������Ϣ")]
        public async Task<string> Get(string roleName)
        {
            var context = ApplicationDbContext.Create();
            var roleManager = new ApplicationRoleManager(new RoleStore<ApplicationRole>(context));
            if (roleManager.RoleExists(roleName)) return "������ɫʧ�ܣ��ý�ɫ�����Ѵ���";
            await roleManager.CreateAsync(new ApplicationRole(roleName));
            return "������ɫ�ɹ�";
        } 
    }
}