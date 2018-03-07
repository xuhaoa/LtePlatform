using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common;
using Lte.Domain.Regular;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(CdmaRegionStatExcel))]
    public class CdmaRegionStat : Entity, IStatDate
    {
        public string Region { get; set; }
        
        public DateTime StatDate { get; set; }
        
        public double ErlangIncludingSwitch { get; set; }
        
        public double ErlangExcludingSwitch { get; set; }
        
        public int Drop2GNum { get; set; }
        
        public int Drop2GDem { get; set; }
        
        public double Drop2GRate => Drop2GDem == 0 ? 0 : (double)Drop2GNum / Drop2GDem;

        public int CallSetupNum { get; set; }
        
        public int CallSetupDem { get; set; }
        
        public double CallSetupRate => CallSetupDem ==0 ? 1: (double)CallSetupNum / CallSetupDem;

        public long EcioNum { get; set; }
        
        public long EcioDem { get; set; }
        
        public double Ecio => EcioDem == 0 ? 1 : (double)EcioNum / EcioDem;

        public int Utility2GNum { get; set; }
        
        public int Utility2GDem { get; set; }

        public double Utility2GRate => Utility2GDem == 0 ? 0 : (double)Utility2GNum / Utility2GDem;

        public double Flow { get; set; }
        
        public double Erlang3G { get; set; }
        
        public int Drop3GNum { get; set; }
        
        public int Drop3GDem { get; set; }
        
        public double Drop3GRate => Drop3GDem == 0 ? 0 : (double)Drop3GNum / Drop3GDem;

        public int ConnectionNum { get; set; }
        
        public int ConnectionDem { get; set; }
        
        public double ConnectionRate => ConnectionDem == 0 ? 1 : (double)ConnectionNum / ConnectionDem;

        public long CiNum { get; set; }
        
        public long CiDem { get; set; }
        
        public double Ci => CiDem == 0 ? 1 : (double)CiNum / CiDem;

        public int LinkBusyNum { get; set; }
        
        public int LinkBusyDem { get; set; }

        public double LinkBusyRate => LinkBusyDem == 0 ? 0 : (double)LinkBusyNum / LinkBusyDem;

        public long DownSwitchNum { get; set; }
        
        public int DownSwitchDem { get; set; }
        
        public double DownSwitchRate => DownSwitchDem == 0 ? 100 : (double)DownSwitchNum / DownSwitchDem;

        public int Utility3GNum { get; set; }
        
        public int Utility3GDem { get; set; }

        public double Utility3GRate => Utility3GDem == 0 ? 0 : (double)Utility3GNum / Utility3GDem;
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

    public class CdmaRegionDateView
    {
        public DateTime StatDate { get; set; }

        public IEnumerable<CdmaRegionStatView> StatViews { get; set; }
    }

    public class CdmaRegionStatDetails
    {
        public IEnumerable<string> StatDates { get; set; }

        public List<string> RegionList { get; set; }

        public Dictionary<string, List<IEnumerable<double>>> KpiDetails { get; } =
            new Dictionary<string, List<IEnumerable<double>>>();

        public CdmaRegionStatDetails(CdmaRegionStatTrend trend)
        {
            StatDates = trend.StatDates;
            RegionList = trend.RegionList;
            ImportDetails(trend.ViewList);
        }

        public static readonly List<string> KpiOptions = new List<string>
        {
            "2G呼建(%)",
            "C/I优良率(%)",
            "3G连接(%)",
            "3G切2G流量比(MB)",
            "掉话率(%)",
            "掉线率(%)",
            "Ec/Io优良率(%)",
            "2G全天话务量(Erl)",
            "3G全天话务量(Erl)",
            "全天流量(GB)",
            "反向链路繁忙率(%)",
            "2G利用率(%)",
            "3G利用率(%)"
        };

        private void ImportDetails(List<IEnumerable<CdmaRegionStatView>> views)
        {
            KpiDetails.Add(KpiOptions[0], views.Select(x => x.Select(v => v.CallSetupRate * 100)).ToList());
            KpiDetails.Add(KpiOptions[1], views.Select(x => x.Select(v => v.Ci * 100)).ToList());
            KpiDetails.Add(KpiOptions[2], views.Select(x => x.Select(v => v.ConnectionRate * 100)).ToList());
            KpiDetails.Add(KpiOptions[3], views.Select(x => x.Select(v => v.DownSwitchRate * 100)).ToList());
            KpiDetails.Add(KpiOptions[4], views.Select(x => x.Select(v => v.Drop2GRate * 100)).ToList());
            KpiDetails.Add(KpiOptions[5], views.Select(x => x.Select(v => v.Drop3GRate * 100)).ToList());
            KpiDetails.Add(KpiOptions[6], views.Select(x => x.Select(v => v.Ecio * 100)).ToList());
            KpiDetails.Add(KpiOptions[7], views.Select(x => x.Select(v => v.ErlangIncludingSwitch)).ToList());
            KpiDetails.Add(KpiOptions[8], views.Select(x => x.Select(v => v.Erlang3G)).ToList());
            KpiDetails.Add(KpiOptions[9], views.Select(x => x.Select(v => v.Flow / 1024)).ToList());
            KpiDetails.Add(KpiOptions[10], views.Select(x => x.Select(v => v.LinkBusyRate * 100)).ToList());
            KpiDetails.Add(KpiOptions[11], views.Select(x => x.Select(v => v.Utility2GRate * 100)).ToList());
            KpiDetails.Add(KpiOptions[12], views.Select(x => x.Select(v => v.Utility3GRate)).ToList());
        }
    }

    public class CdmaRegionStatTrend
    {
        public IEnumerable<string> StatDates { get; set; }

        public List<string> RegionList { get; set; }

        public List<IEnumerable<CdmaRegionStatView>> ViewList { get; set; }
    }

    public class OptimizeRegion : Entity
    {
        public string City { get; set; }

        public string Region { get; set; }

        public string District { get; set; }
    }
}
