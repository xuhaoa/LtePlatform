using Abp.EntityFramework.AutoMapper;
using Lte.MySqlFramework.Entities;
using System.Collections.Generic;

namespace Lte.Evaluations.ViewModels.RegionKpi
{
    public class CdmaRegionStatTrend
    {
        public IEnumerable<string> StatDates { get; set; }

        public List<string> RegionList { get; set; }

        public List<IEnumerable<CdmaRegionStatView>> ViewList { get; set; }
    }

    [AutoMapFrom(typeof(CdmaRegionStat))]
    public class CdmaRegionStatView
    {
        public string Region { get; set; }

        public double ErlangIncludingSwitch { get; set; }

        public double Drop2GRate { get; set; }

        public double CallSetupRate { get; set; }

        public double Ecio { get; set; }

        public double Utility2GRate { get; set; }

        public double Flow { get; set; }

        public double Erlang3G { get; set; }

        public double Drop3GRate { get; set; }

        public double ConnectionRate { get; set; }

        public double Ci { get; set; }

        public double LinkBusyRate { get; set; }

        public double DownSwitchRate { get; set; }

        public double Utility3GRate { get; set; }
    }
}
