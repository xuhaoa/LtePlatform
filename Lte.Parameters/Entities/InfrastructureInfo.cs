using Abp.Domain.Entities;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;

namespace Lte.Parameters.Entities
{
    public class InfrastructureInfo : Entity
    {
        public HotspotType HotspotType { get; set; }

        public string HotspotName { get; set; }

        public InfrastructureType InfrastructureType { get; set; }

        public int InfrastructureId { get; set; }
    }

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
