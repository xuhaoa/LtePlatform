using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using Abp.EntityFramework.Dependency;
using Lte.Parameters.Entities.Kpi;

namespace Lte.Evaluations.ViewModels.RegionKpi
{
    public class PreciseRegionDateView : IStatDate
    {
        public DateTime StatDate { get; set; }

        public IEnumerable<DistrictPreciseView> DistrictPreciseViews { get; set; } 

        public IEnumerable<TownPreciseView> TownPreciseViews { get; set; }
    }

    public class FlowRegionDateView : IStatDate
    {
        public DateTime StatDate { get; set; }

        public IEnumerable<DistrictFlowView> DistrictFlowViews { get; set; }

        public IEnumerable<TownFlowView> TownFlowViews { get; set; }
    }

    public class DownSwitchFlowDateView : IStatDate
    {
        public DateTime StatDate { get; set; }

        public string City { get; set; }

        public IEnumerable<DownSwitchFlowView> DownSwitchFlowViews { get; set; }
    }

    public class DistrictComplainView
    {
        public string District { get; set; }

        public int Complain2G { get; set; }

        public int Complain3G { get; set; }

        public int Complain4G { get; set; }

        public int ComplainAll => Complain2G + Complain3G + Complain4G;

        public int Demand2G { get; set; }

        public int Demand3G { get; set; }

        public int Demand4G { get; set; }

        public int DemandAll => Demand2G + Demand3G + Demand4G;

        public int Total => ComplainAll + DemandAll;
    }

    public class DistrictComplainDateView : IStatDate
    {
        public DateTime StatDate { get; set; }

        public IEnumerable<DistrictComplainView> DistrictComplainViews { get; set; } 
    }
}
