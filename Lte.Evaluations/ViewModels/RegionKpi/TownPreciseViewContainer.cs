using System.Collections.Generic;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities.Kpi;

namespace Lte.Evaluations.ViewModels.RegionKpi
{
    public class TownPreciseViewContainer
    {
        public IEnumerable<TownPreciseView> Views { get; set; }

        public IEnumerable<TownMrsRsrp> MrsRsrps { get; set; }

        public IEnumerable<TopMrsRsrp> TopMrsRsrps { get; set; }
    }
}