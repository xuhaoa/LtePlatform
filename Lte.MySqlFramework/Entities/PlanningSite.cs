using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Geo;
using Lte.Domain.Regular.Attributes;
using System;
using System.ComponentModel.DataAnnotations;
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

        public string SiteCategory { get; set; }

        public string SiteSource { get; set; }

        public string ShouzuShuoming { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string TowerType { get; set; }
        
        public double? AntennaHeight { get; set; }

        public DateTime? CompleteDate { get; set; }
        
        public DateTime? YanshouDate { get; set; }

        public bool IsGotton { get; set; }

        public DateTime? GottenDate { get; set; }

        public string TowerContaction { get; set; }

        public DateTime? ContractDate { get; set; }
        
        public DateTime? FinishedDate { get; set; }

        public string TowerScheme { get; set; }

        public string TowerSiteName { get; set; }

        public string AntennaType { get; set; }
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

        [ExcelColumn("备注（清单来源）")]
        public string SiteSource { get; set; }

        [ExcelColumn("建设类型")]
        public string SiteCategory { get; set; }

        [ExcelColumn("受阻说明")]
        public string ShouzuShuoming { get; set; }

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

        [ExcelColumn("整体完工时间")]
        public DateTime? CompleteDate { get; set; }

        [ExcelColumn("验收交付时间")]
        public DateTime? YanshouDate { get; set; }

        [ExcelColumn("谈点状态")]
        public string GottenState { get; set; }

        public bool IsGotton => GottenState == "已谈点";

        [ExcelColumn("谈点完成日期")]
        public DateTime? GottenDate { get; set; }

        [ExcelColumn("铁塔对接联系人及联系方式")]
        public string TowerContaction { get; set; }

        [ExcelColumn("合同签订日期")]
        public DateTime? ContractDate { get; set; }

        [ExcelColumn("开通日期")]
        public DateTime? FinishedDate { get; set; }

        [ExcelColumn("铁塔盖章方案")]
        public string TowerScheme { get; set; }

        [ExcelColumn("对应提供给铁塔规划需求名（固定）")]
        public string TowerSiteName { get; set; }

        [ExcelColumn("设计天线类型")]
        public string AntennaType { get; set; }
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

    public class ENodebBase : Entity
    {
        [MaxLength(200)]
        public string FSLNO { get; set; }

        public int ENODEBID { get; set; }

        [MaxLength(200)]
        public string ENODEBNAME { get; set; }

        public double LONGITUDE { get; set; }

        public double LATITIUDE { get; set; }

        [MaxLength(2)]
        public string INDOOR { get; set; }

        [MaxLength(200)]
        public string FSCNO { get; set; }

        [MaxLength(200)]
        public string SITENO { get; set; }

        [MaxLength(200)]
        public string AREA { get; set; }

        [MaxLength(200)]
        public string MKTCENTER { get; set; }

        [MaxLength(200)]
        public string ADDRESS { get; set; }

        [MaxLength(1000)]
        public string REMARK { get; set; }
    }

    public class ConstructionInformation : Entity
    {
        [MaxLength(200)]
        public string FSLNO { get; set; }

        [MaxLength(200)]
        public string SITENO { get; set; }

        [MaxLength(200)]
        public string CONSTRUCT_STAUS { get; set; }

        [MaxLength(200)]
        public string PLANNING_ENDOBENAME { get; set; }

        [MaxLength(200)]
        public string ISTRANSFER { get; set; }

        public DateTime? OPEN_TIME { get; set; }

        public DateTime? COMPLETED_TIME { get; set; }

        public DateTime? CONSTRCTION_TIME { get; set; }

        public DateTime? UPLOAD_TIME { get; set; }

        [MaxLength(200)]
        public string CONSTRUCTION_COMPANY { get; set; }

        [MaxLength(200)]
        public string CONSTRUCTION_WORK { get; set; }

        [MaxLength(200)]
        public string BLUEPRINT { get; set; }
    }

    [AutoMapFrom(typeof(ConstructionInformation), typeof(ENodebBase))]
    public class ConstructionView : IGeoPoint<double>, IDistrictTown
    {
        [AutoMapPropertyResolve("FSLNO", typeof(ConstructionInformation))]
        public string FslNumber { get; set; }

        [AutoMapPropertyResolve("SITENO", typeof(ConstructionInformation))]
        public string SiteNumber { get; set; }

        [AutoMapPropertyResolve("CONSTRUCT_STAUS", typeof(ConstructionInformation))]
        public string ConstructStatus { get; set; }

        [AutoMapPropertyResolve("PLANNING_ENDOBENAME", typeof(ConstructionInformation))]
        public string PlanningENodebName { get; set; }

        [AutoMapPropertyResolve("ISTRANSFER", typeof(ConstructionInformation))]
        public string IsTransfer { get; set; }

        [AutoMapPropertyResolve("OPEN_TIME", typeof(ConstructionInformation))]
        public DateTime? OpenTime { get; set; }

        [AutoMapPropertyResolve("COMPLETED_TIME", typeof(ConstructionInformation))]
        public DateTime? CompletedTime { get; set; }

        [AutoMapPropertyResolve("CONSTRCTION_TIME", typeof(ConstructionInformation))]
        public DateTime? ConstructionTime { get; set; }

        [AutoMapPropertyResolve("UPLOAD_TIME", typeof(ConstructionInformation))]
        public DateTime? UploadTime { get; set; }

        public string Status
            =>
                OpenTime != null
                    ? "基站开通"
                    : (CompletedTime != null
                        ? "整体完工"
                        : (ConstructionTime != null ? "天馈施工" : (UploadTime != null ? "审计会审" : "其他")));

        [AutoMapPropertyResolve("CONSTRUCTION_COMPANY", typeof(ConstructionInformation))]
        public string ConstructionCompany { get; set; }

        [AutoMapPropertyResolve("CONSTRUCTION_WORK", typeof(ConstructionInformation))]
        public string ConstructionWork { get; set; }

        [AutoMapPropertyResolve("BLUEPRINT", typeof(ConstructionInformation))]
        public string BluePrint { get; set; }

        [AutoMapPropertyResolve("ENODEBNAME", typeof(ENodebBase))]
        public string ENodebName { get; set; }

        [AutoMapPropertyResolve("LONGITUDE", typeof(ENodebBase))]
        public double Longtitute { get; set; }

        [AutoMapPropertyResolve("LATITIUDE", typeof(ENodebBase))]
        public double Lattitute { get; set; }

        [AutoMapPropertyResolve("AREA", typeof(ENodebBase))]
        public string District { get; set; }

        [AutoMapPropertyResolve("MKTCENTER", typeof(ENodebBase))]
        public string Town { get; set; }

        [AutoMapPropertyResolve("INDOOR", typeof(ENodebBase))]
        public string IsIndoor { get; set; }

        [AutoMapPropertyResolve("FSCNO", typeof(ENodebBase))]
        public string FscNumber { get; set; }
    }
}
