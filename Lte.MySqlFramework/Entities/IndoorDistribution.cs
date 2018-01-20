using Abp.Domain.Entities;
using Lte.Domain.Common.Geo;

namespace Lte.MySqlFramework.Entities
{
    public class IndoorDistribution : Entity, IGeoPoint<double>
    {
        public string Name { get; set; }

        public string Range { get; set; }

        public string SourceName { get; set; }

        public string SourceType { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }
    }
}