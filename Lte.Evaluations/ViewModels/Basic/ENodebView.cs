using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Geo;
using Lte.Domain.Regular;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities.Basic;
using System;
using Lte.Parameters.Entities;

namespace Lte.Evaluations.ViewModels.Basic
{
    [AutoMapFrom(typeof(ENodeb), typeof(Town))]
    public class ENodebView : IGeoPointReadonly<double>
    {
        public int ENodebId { get; set; }

        public string Name { get; set; }

        public string Factory { get; set; }

        public IpAddress GatewayIp { get; set; }

        public IpAddress Ip { get; set; }

        public bool IsInUse { get; set; }

        public double Longtitute { get; set; }
        
        public double Lattitute { get; set; }
        
        public string Address { get; set; }

        public string PlanNum { get; set; }

        public DateTime OpenDate { get; set; }

        public string OpenDateString => OpenDate.ToShortDateString();

        public string CityName { get; set; }

        public string DistrictName { get; set; }

        public string TownName { get; set; }
    }

    [AutoMapFrom(typeof(PlanningSite))]
    public class PlanningSiteView
    {
        public int TownId { get; set; }

        public string District { get; set; }

        public string Town { get; set; }

        public string PlanNum { get; set; }

        public string PlanName { get; set; }

        public string FormalName { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string TowerType { get; set; }

        public double? AntennaHeight { get; set; }

        public DateTime? CompleteDate { get; set; }

        public DateTime? YanshouDate { get; set; }

        public bool IsGotton { get; set; }

        public string SiteCategory { get; set; }

        public string SiteSource { get; set; }

        public string ShouzuShuoming { get; set; }

        public DateTime? GottenDate { get; set; }

        public string TowerContaction { get; set; }

        public DateTime? ContractDate { get; set; }

        public DateTime? FinishedDate { get; set; }

        public string TowerScheme { get; set; }

        public string TowerSiteName { get; set; }

        public string AntennaType { get; set; }
    }
}
