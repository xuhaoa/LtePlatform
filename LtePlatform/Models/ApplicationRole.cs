using Microsoft.AspNet.Identity.EntityFramework;

namespace LtePlatform.Models
{
    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole()
        { }

        public ApplicationRole(string name): base(name) { }
    }
}
