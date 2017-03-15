using Abp.Domain.Entities;
using Lte.Domain.Common.Geo;
using System.ComponentModel.DataAnnotations;
using Lte.Domain.Common.Wireless;

namespace Lte.Parameters.Entities
{
    public class Town : Entity, ITown, IGeoPoint<double>
    {
        [MaxLength(20)]
        public string CityName { get; set; }

        [MaxLength(20)]
        public string DistrictName { get; set; }

        [MaxLength(20)]
        public string TownName { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public ComplainScene AreaType { get; set; }
    }

    public class OptimizeRegion : Entity
    {
        public string City { get; set; }

        public string Region { get; set; }

        public string District { get; set; }
    }
}
