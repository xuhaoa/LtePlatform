using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using Abp.EntityFramework.Dependency;
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

    public class MrsRegionDateView : IRegionDateSpanView<DistrictMrsRsrpView, TownMrsRsrpView>
    {
        public DateTime StatDate { get; set; }

        public IEnumerable<DistrictMrsRsrpView> DistrictViews { get; set; }

        public IEnumerable<TownMrsRsrpView> TownViews { get; set; }
    }

    public class CoverageRegionDateView : IRegionDateSpanView<DistrictCoverageView, TownCoverageView>
    {
        public DateTime StatDate { get; set; }

        public IEnumerable<DistrictCoverageView> DistrictViews { get; set; }

        public IEnumerable<TownCoverageView> TownViews { get; set; }
    }
}
