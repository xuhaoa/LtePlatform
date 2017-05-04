using System.CodeDom;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;

namespace Lte.Parameters.Entities
{
    public class InfrastructureInfo : Entity, IHotSpot
    {
        public HotspotType HotspotType { get; set; }

        public string HotspotName { get; set; }

        public InfrastructureType InfrastructureType { get; set; }

        public int InfrastructureId { get; set; }

        public string Address { get; set; }

        public string SourceName { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }
    }

    [AutoMapFrom(typeof(InfrastructureInfo))]
    public class HotSpotView
    {
        [AutoMapPropertyResolve("HotspotType", typeof(InfrastructureInfo), typeof(HotspotTypeDescriptionTransform))]
        public string TypeDescription { get; set; }

        public string HotspotName { get; set; }
        
        public string Address { get; set; }

        public string SourceName { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }
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
