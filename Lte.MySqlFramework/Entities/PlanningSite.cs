using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Geo;
using Lte.Domain.Regular.Attributes;
using System;
using Lte.Domain.Common;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(PlanningSiteExcel))]
    public class PlanningSite : Entity, ITownId
    {
        public int TownId { get; set; }

        public string PlanNum { get; set; }
        
        public string PlanName { get; set; }

        public string TowerNum { get; set; }
        
        public string TowerName { get; set; }

        public string FormalName { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string TowerType { get; set; }
        
        public double? AntennaHeight { get; set; }
        
        public DateTime? GottenDate { get; set; }
        
        public DateTime? ContractDate { get; set; }
        
        public DateTime? FinishedDate { get; set; }
    }

    public class PlanningSiteExcel : IDistrictTown
    {
        [ExcelColumn("区县")]
        public string District { get; set; }

        [ExcelColumn("分局")]
        public string Town { get; set; }

        [ExcelColumn("编号")]
        public string PlanNum { get; set; }

        [ExcelColumn("规划名")]
        public string PlanName { get; set; }

        [ExcelColumn("铁塔编号")]
        public string TowerNum { get; set; }

        [ExcelColumn("铁塔站名")]
        public string TowerName { get; set; }

        [ExcelColumn("电信出图站名")]
        public string FormalName { get; set; }

        [ExcelColumn("规划经度")]
        public double PlanLongtitute { get; set; }

        [ExcelColumn("规划纬度")]
        public double PlanLattitute { get; set; }

        [ExcelColumn("选址经度")]
        public double? FinalLongtitute { get; set; }

        [ExcelColumn("选址纬度")]
        public double? FinalLattitute { get; set; }

        public double Longtitute => FinalLongtitute ?? PlanLongtitute;

        public double Lattitute => FinalLattitute ?? PlanLattitute;

        [ExcelColumn("杆塔类型")]
        public string TowerType { get; set; }

        [ExcelColumn("天线挂高")]
        public double? AntennaHeight { get; set; }

        [ExcelColumn("谈点完成日期")]
        public DateTime? GottenDate { get; set; }

        [ExcelColumn("合同签订日期")]
        public DateTime? ContractDate { get; set; }

        [ExcelColumn("开通日期")]
        public DateTime? FinishedDate { get; set; }
    }

    public class StationDictionaryExcel
    {
        [ExcelColumn("站址编号")]
        public string StationNum { get; set; }

        [ExcelColumn("L网网管ID")]
        public int ENodebId { get; set; }

        [ExcelColumn("FSL编号")]
        public string PlanNum { get; set; }

        [ExcelColumn("网格")]
        public string Grid { get; set; }

        [ExcelColumn("L网网管名称（对应拉远填写RRU名称）")]
        public string ElementName { get; set; }

        [ExcelColumn("是否L网拉远")]
        public string IsRruString { get; set; }

        [ExcelColumn("施主BBU名称")]
        public string ENodebName { get; set; }

        [ExcelColumn("L网RRU数量")]
        public byte TotalRrus { get; set; }
    }

    [AutoMapFrom(typeof(StationDictionaryExcel))]
    public class StationDictionary : Entity
    {
        public string StationNum { get; set; }
        
        public int ENodebId { get; set; }
        
        public string PlanNum { get; set; }

        
        public string ElementName { get; set; }
        
        [AutoMapPropertyResolve("IsRruString", typeof(StationDictionaryExcel), typeof(YesToBoolTransform))]
        public bool IsRru { get; set; }
        
        public string ENodebName { get; set; }
        
        public byte TotalRrus { get; set; }
    }
}
