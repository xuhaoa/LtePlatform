using Abp.Domain.Entities.Auditing;

namespace Lte.MySqlFramework.Entities
{
    public class CollegeInfo : AuditedEntity
    {
        public int TownId { get; set; }

        public string Name { get; set; }

        public CollegeRegion CollegeRegion { get; set; }

    }
}