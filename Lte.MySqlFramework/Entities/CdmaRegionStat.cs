using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Regular.Attributes;
using System;
using Abp.EntityFramework.Dependency;

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

    public class CdmaRegionStatExcel
    {
        [ExcelColumn("地市")]
        public string Region { get; set; }

        [ExcelColumn("日期")]
        public DateTime StatDate { get; set; }

        [ExcelColumn("2G全天话务量含切换")]
        public double ErlangIncludingSwitch { get; set; }

        [ExcelColumn("2G全天话务量不含切换")]
        public double ErlangExcludingSwitch { get; set; }

        [ExcelColumn("掉话分子")]
        public int Drop2GNum { get; set; }

        [ExcelColumn("掉话分母")]
        public int Drop2GDem { get; set; }

        [ExcelColumn("呼建分子")]
        public int CallSetupNum { get; set; }

        [ExcelColumn("呼建分母")]
        public int CallSetupDem { get; set; }

        [ExcelColumn("EcIo分子")]
        public long EcioNum { get; set; }

        [ExcelColumn("EcIo分母")]
        public long EcioDem { get; set; }

        [ExcelColumn("2G利用率分子")]
        public int Utility2GNum { get; set; }

        [ExcelColumn("2G利用率分母")]
        public int Utility2GDem { get; set; }

        [ExcelColumn("全天流量MB")]
        public double Flow { get; set; }

        [ExcelColumn("DO全天话务量erl")]
        public double Erlang3G { get; set; }

        [ExcelColumn("掉线分子")]
        public int Drop3GNum { get; set; }

        [ExcelColumn("掉线分母")]
        public int Drop3GDem { get; set; }

        [ExcelColumn("连接分子")]
        public int ConnectionNum { get; set; }

        [ExcelColumn("连接分母")]
        public int ConnectionDem { get; set; }

        [ExcelColumn("CI分子")]
        public long CiNum { get; set; }

        [ExcelColumn("CI分母")]
        public long CiDem { get; set; }

        [ExcelColumn("反向链路繁忙率分子")]
        public int LinkBusyNum { get; set; }

        [ExcelColumn("反向链路繁忙率分母")]
        public int LinkBusyDem { get; set; }

        [ExcelColumn("3G切2G流量比分子")]
        public long DownSwitchNum { get; set; }

        [ExcelColumn("3G切2G流量比分母")]
        public int DownSwitchDem { get; set; }

        [ExcelColumn("3G利用率分子")]
        public int Utility3GNum { get; set; }

        [ExcelColumn("3G利用率分母_载扇数")]
        public int Utility3GDem { get; set; }
    }
}
