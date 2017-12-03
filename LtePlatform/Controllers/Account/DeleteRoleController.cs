using System.Threading.Tasks;
using System.Web.Http;
using LtePlatform.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace LtePlatform.Controllers.Account
{
    [Authorize(Roles = "����Ա")]
    [ApiControl("ɾ����ɫ������")]
    public class DeleteRoleController : ApiController
    {
        [HttpGet]
        [ApiDoc("ɾ��һ����ɫ")]
        [ApiParameterDoc("roleName", "��ɫ����")]
        [ApiResponse("���������Ϣ")]
        public async Task<string> Get(string roleName)
        {
            var context = ApplicationDbContext.Create();
            var roleManager = new ApplicationRoleManager(new RoleStore<ApplicationRole>(context));
            if (!roleManager.RoleExists(roleName)) return "ɾ����ɫʧ�ܣ��ý�ɫ���Ʋ�����";
            var role = roleManager.FindByName(roleName);
            await roleManager.DeleteAsync(role);
            return "ɾ����ɫ�ɹ�";
        } 
    }
}