using Lte.Domain.Regular.Attributes;
using System.Collections.Generic;

namespace LtePlatform.Models
{
    [TypeDoc("角色分配用户定义")]
    public class RoleUsersDto
    {
        [MemberDoc("角色名称")]
        public string RoleName { get; set; }

        [MemberDoc("用户名称列表")]
        public IEnumerable<string> UserNames { get; set; }
    }
}
