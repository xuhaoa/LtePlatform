using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
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

    public class MrsRegionDateView : IRegionDateSpanView<DistrictMrsRsrpView, TownMrsRsrpView>
    {
        public DateTime StatDate { get; set; }

        public IEnumerable<DistrictMrsRsrpView> DistrictViews { get; set; }

        public IEnumerable<TownMrsRsrpView> TownViews { get; set; }
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

        public static DistrictComplainDateView GenerateDistrictComplainDateView(List<ComplainItem> stats,
            IEnumerable<string> districts)
        {
            var results = GenerateDistrictComplainList(stats, districts);
            results.Add(new DistrictComplainView
            {
                District = "佛山",
                Complain2G =
                    stats.Count(
                        s =>
                            s.NetworkType == NetworkType.With2G &&
                            s.ServiceCategory == ComplainCategory.NetworkQuality),
                Complain3G =
                    stats.Count(
                        s =>
                            (s.NetworkType == NetworkType.With3G || s.NetworkType == NetworkType.With2G3G) &&
                            s.ServiceCategory == ComplainCategory.NetworkQuality),
                Complain4G =
                    stats.Count(
                        s =>
                            (s.NetworkType == NetworkType.With4G || s.NetworkType == NetworkType.With2G3G4G ||
                             s.NetworkType == NetworkType.With2G3G4G4GPlus) &&
                            s.ServiceCategory == ComplainCategory.NetworkQuality),
                Demand2G =
                    stats.Count(
                        s =>
                            s.NetworkType == NetworkType.With2G &&
                            s.ServiceCategory == ComplainCategory.Appliance),
                Demand3G =
                    stats.Count(
                        s =>
                            (s.NetworkType == NetworkType.With3G || s.NetworkType == NetworkType.With2G3G) &&
                            s.ServiceCategory == ComplainCategory.Appliance),
                Demand4G =
                    stats.Count(
                        s =>
                            (s.NetworkType == NetworkType.With4G || s.NetworkType == NetworkType.With2G3G4G ||
                             s.NetworkType == NetworkType.With2G3G4G4GPlus) &&
                            s.ServiceCategory == ComplainCategory.Appliance)
            });
            return new DistrictComplainDateView
            {
                StatDate = stats.First().BeginDate.Date,
                DistrictComplainViews = results
            };
        }

        public static List<DistrictComplainView> GenerateDistrictComplainList(List<ComplainItem> stats, 
            IEnumerable<string> districts)
        {
            var results = districts.Select(x => new DistrictComplainView
            {
                District = x,
                Complain2G =
                    stats.Count(
                        s =>
                            s.District == x && s.NetworkType == NetworkType.With2G &&
                            s.ServiceCategory == ComplainCategory.NetworkQuality),
                Complain3G =
                    stats.Count(
                        s =>
                            s.District == x &&
                            (s.NetworkType == NetworkType.With3G || s.NetworkType == NetworkType.With2G3G) &&
                            s.ServiceCategory == ComplainCategory.NetworkQuality),
                Complain4G =
                    stats.Count(
                        s =>
                            s.District == x &&
                            (s.NetworkType == NetworkType.With4G || s.NetworkType == NetworkType.With2G3G4G ||
                             s.NetworkType == NetworkType.With2G3G4G4GPlus) &&
                            s.ServiceCategory == ComplainCategory.NetworkQuality),
                Demand2G =
                    stats.Count(
                        s =>
                            s.District == x && s.NetworkType == NetworkType.With2G &&
                            s.ServiceCategory == ComplainCategory.Appliance),
                Demand3G =
                    stats.Count(
                        s =>
                            s.District == x &&
                            (s.NetworkType == NetworkType.With3G || s.NetworkType == NetworkType.With2G3G) &&
                            s.ServiceCategory == ComplainCategory.Appliance),
                Demand4G =
                    stats.Count(
                        s =>
                            s.District == x &&
                            (s.NetworkType == NetworkType.With4G || s.NetworkType == NetworkType.With2G3G4G ||
                             s.NetworkType == NetworkType.With2G3G4G4GPlus) &&
                            s.ServiceCategory == ComplainCategory.Appliance)
            }).ToList();
            return results;
        }
    }

    public class TownPreciseViewContainer
    {
        public IEnumerable<TownPreciseView> Views { get; set; }

        public IEnumerable<TownMrsRsrp> MrsRsrps { get; set; }
    }

}
