using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;

namespace Lte.MySqlFramework.Entities
{
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
}