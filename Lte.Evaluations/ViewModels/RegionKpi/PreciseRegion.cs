using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common.Wireless;
using Lte.Parameters.Entities.Kpi;

namespace Lte.Evaluations.ViewModels.RegionKpi
{
    public class PreciseRegionDateView : IRegionDateSpanView<DistrictPreciseView, TownPreciseView>
    {
        public DateTime StatDate { get; set; }

        public IEnumerable<DistrictPreciseView> DistrictViews { get; set; } 

        public IEnumerable<TownPreciseView> TownViews { get; set; }
    }

    public class RrcRegionDateView : IRegionDateSpanView<DistrictRrcView, TownRrcView>
    {
        public DateTime StatDate { get; set; }

        public IEnumerable<DistrictRrcView> DistrictViews { get; set; }

        public IEnumerable<TownRrcView> TownViews { get; set; }
    }

    public class QciRegionDateView : IRegionDateSpanView<DistrictQciView, TownQciView>
    {
        public DateTime StatDate { get; set; }

        public IEnumerable<DistrictQciView> DistrictViews { get; set; }

        public IEnumerable<TownQciView> TownViews { get; set; }
    }

    public class FlowRegionDateView : IRegionDateSpanView<DistrictFlowView, TownFlowView>
    {
        public DateTime StatDate { get; set; }

        public IEnumerable<DistrictFlowView> DistrictViews { get; set; }

        public IEnumerable<TownFlowView> TownViews { get; set; }
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
