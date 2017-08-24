using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Geo;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;

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

    public class BluePrint : Entity
    {
        public string FslNumber { get; set; }

        public string FileName { get; set; }

        public string Folder { get; set; }

        public string DesignBrief { get; set; }
    }

    [Table("dbo.LteNeighborCells")]
    public class NearestPciCell : LteNeighborCell
    {
        public short Pci { get; set; }

        public int TotalTimes { get; set; }

    }

    [Table("dbo.LteNeighborCells")]
    [KnownType(typeof(NearestPciCell))]
    [TypeDoc("LTE邻区关系定义")]
    public class LteNeighborCell : Entity
    {
        [MemberDoc("小区编号（对于LTE来说就是基站编号）")]
        public int CellId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("邻区小区编号")]
        public int NearestCellId { get; set; }

        [MemberDoc("邻区扇区编号")]
        public byte NearestSectorId { get; set; }
    }

    [TypeDoc("包含PCI的LTE邻区关系视图")]
    [AutoMapFrom(typeof(NearestPciCell))]
    public class NearestPciCellView
    {
        [MemberDoc("小区编号（对于LTE来说就是基站编号）")]
        public int CellId { get; set; }

        [MemberDoc("扇区编号")]
        public byte SectorId { get; set; }

        [MemberDoc("邻区小区编号")]
        public int NearestCellId { get; set; }

        [MemberDoc("邻区扇区编号")]
        public byte NearestSectorId { get; set; }

        [MemberDoc("PCI，便于查询邻区")]
        public short Pci { get; set; }

        [MemberDoc("切换次数，仅供参考")]
        public int TotalTimes { get; set; }

        [MemberDoc("邻区基站名称")]
        public string NearestENodebName { get; set; }
    }

}
