using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lte.Domain.Common.Geo
{
    public interface ITownId
    {
        int TownId { get; set; }
    }

    public interface IDistrictTown
    {
        string District { get; set; }

        string Town { get; set; }
    }

    public interface ICityDistrictTown : IDistrictTown
    {
        string City { get; set; }
    }

    public interface ITown
    {
        string CityName { get; set; }

        string DistrictName { get; set; }

        string TownName { get; set; }
    }
}
