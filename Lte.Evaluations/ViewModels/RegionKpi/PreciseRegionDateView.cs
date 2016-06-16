using System;
using System.Collections.Generic;
using Abp.EntityFramework.AutoMapper;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.ViewModels.RegionKpi
{
    public class PreciseRegionDateView
    {
        public DateTime StatDate { get; set; }

        public IEnumerable<DistrictPreciseView> DistrictPreciseViews { get; set; } 

        public IEnumerable<TownPreciseView> TownPreciseViews { get; set; } 
    }

    [AutoMapFrom(typeof(DownSwitchFlow))]
    public class DownSwitchFlowView
    {
        public string Region { get; set; }

        public double Flow4G { get; set; }

        public double DownSwitchFlow3G { get; set; }

        public double DownSwitchRate => 100*DownSwitchFlow3G/Flow4G;
    }

    public class DownSwitchFlowDateView
    {
        public DateTime StatDate { get; set; }

        public string City { get; set; }

        public IEnumerable<DownSwitchFlowView> DownSwitchFlowViews { get; set; }
    }
}
