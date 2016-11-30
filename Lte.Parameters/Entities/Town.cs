using Abp.Domain.Entities;
using Lte.Domain.Common.Geo;
using System.ComponentModel.DataAnnotations;

namespace Lte.Parameters.Entities
{
    public class Town : Entity, ITown
    {
        [MaxLength(20)]
        public string CityName { get; set; }

        [MaxLength(20)]
        public string DistrictName { get; set; }

        [MaxLength(20)]
        public string TownName { get; set; }
    }

    public class OptimizeRegion : Entity
    {
        public string City { get; set; }

        public string Region { get; set; }

        public string District { get; set; }
    }
}
