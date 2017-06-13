using Abp.EntityFramework.AutoMapper;
using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common.Wireless;
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

    [AutoMapFrom(typeof(TownPreciseView))]
    public class DistrictPreciseView : ICityDistrict
    {
        public string City { get; set; } = "-";

        public string District { get; set; } = "-";

        public int TotalMrs { get; set; }

        public int SecondNeighbors { get; set; }

        public int FirstNeighbors { get; set; }

        public int ThirdNeighbors { get; set; }

        public double PreciseRate => 100 - (double)SecondNeighbors * 100 / TotalMrs;

        public double FirstRate => 100 - (double)FirstNeighbors * 100 / TotalMrs;

        public double ThirdRate => 100 - (double)ThirdNeighbors * 100 / TotalMrs;

        public int NeighborsMore { get; set; }

        public int InterFirstNeighbors { get; set; }

        public int InterSecondNeighbors { get; set; }

        public int InterThirdNeighbors { get; set; }

        public static DistrictPreciseView ConstructView(TownPreciseView townView)
        {
            return townView.MapTo<DistrictPreciseView>();
        }
    }

    [AutoMap(typeof(TownPreciseCoverage4GStat))]
    public class TownPreciseView : ICityDistrictTown
    {
        public DateTime StatTime { get; set; }

        public string City { get; set; } = "-";

        public string District { get; set; } = "-";

        public string Town { get; set; } = "-";

        public int TownId { get; set; }

        public int TotalMrs { get; set; }

        public int ThirdNeighbors { get; set; }

        public int SecondNeighbors { get; set; }

        public int FirstNeighbors { get; set; }

        public double PreciseRate => 100 - (double)SecondNeighbors * 100 / TotalMrs;

        public double FirstRate => 100 - (double)FirstNeighbors * 100 / TotalMrs;

        public double ThirdRate => 100 - (double)ThirdNeighbors * 100 / TotalMrs;

        public int NeighborsMore { get; set; }

        public int InterFirstNeighbors { get; set; }

        public int InterSecondNeighbors { get; set; }

        public int InterThirdNeighbors { get; set; }
    }
}
