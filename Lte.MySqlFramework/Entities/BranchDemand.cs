using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;
using Lte.Domain.LinqToCsv;
using Lte.Domain.Regular;
using Lte.Domain.Regular.Attributes;

namespace Lte.MySqlFramework.Entities
{

    [AutoMapFrom(typeof(BranchDemandExcel), typeof(BranchDemandDto))]
    public class BranchDemand : Entity, ITownId
    {
        public DateTime BeginDate { get; set; }

        public string SerialNumber { get; set; }

        public int TownId { get; set; }

        public string ComplainContents { get; set; }

        [AutoMapPropertyResolve("FirstContents", typeof(BranchDemandExcel), typeof(DateTimeNowLabelTransform))]
        public string ProcessContents { get; set; }

        [AutoMapPropertyResolve("SolveFunctionDescription", typeof(BranchDemandExcel), typeof(SolveFunctionTransform))]
        [AutoMapPropertyResolve("SolveFunctionDescription", typeof(BranchDemandDto), typeof(SolveFunctionTransform))]
        public SolveFunction SolveFunction { get; set; }

        [AutoMapPropertyResolve("IsSolvedDescription", typeof(BranchDemandExcel), typeof(YesToBoolTransform))]
        [AutoMapPropertyResolve("IsSolvedDescription", typeof(BranchDemandDto), typeof(YesToBoolTransform))]
        public bool IsSolved { get; set; }

        public DateTime? EndDate { get; set; }

        public double Lontitute { get; set; }

        public double Lattitute { get; set; }

        public string SubscriberInfo { get; set; }

        public string ManagerInfo { get; set; }
    }

    [AutoMapFrom(typeof(BranchDemand))]
    public class BranchDemandDto
    {
        [MemberDoc("开始日期")]
        public DateTime BeginDate { get; set; }

        [MemberDoc("工单编码")]
        public string SerialNumber { get; set; }

        [MemberDoc("镇区编号，用于定义一个镇")]
        public int TownId { get; set; }

        [MemberDoc("城市")]
        public string City { get; set; }

        [MemberDoc("区域")]
        public string District { get; set; }

        [MemberDoc("镇区")]
        public string Town { get; set; }

        [MemberDoc("申告内容")]
        public string ComplainContents { get; set; }

        [MemberDoc("过程信息")]
        public string ProcessContents { get; set; }

        [AutoMapPropertyResolve("SolveFunction", typeof(BranchDemand), typeof(SolveFunctionDescriptionTransform))]
        [MemberDoc("解决措施")]
        public string SolveFunctionDescription { get; set; }

        [AutoMapPropertyResolve("IsSolved", typeof(BranchDemand), typeof(YesNoTransform))]
        [MemberDoc("是否已解决")]
        public string IsSolvedDescription { get; set; }

        [MemberDoc("结单日期，如果为空，则说明该工单未解决")]
        public DateTime? EndDate { get; set; }

        [MemberDoc("经度")]
        public double Lontitute { get; set; }

        [MemberDoc("纬度")]
        public double Lattitute { get; set; }

        [MemberDoc("用户信息")]
        public string SubscriberInfo { get; set; }

        [MemberDoc("客户经理信息")]
        public string ManagerInfo { get; set; }
    }

    [AutoMapFrom(typeof(BranchDemand))]
    public class BranchDemandExcel : IDistrictTown
    {
        [ExcelColumn("用户申告时间")]
        public DateTime BeginDate { get; set; }

        [ExcelColumn("序号")]
        public string SerialNumber { get; set; }

        [ExcelColumn("所属区域")]
        public string District { get; set; }

        [ExcelColumn("所属镇")]
        public string Town { get; set; }

        [ExcelColumn("用户申告内容描述")]
        public string ComplainContents { get; set; }

        [ExcelColumn("处理情况")]
        public string FirstContents { get; set; }

        [ExcelColumn("解决方式（解决措施分类）")]
        public string SolveFunctionDescription { get; set; }

        [ExcelColumn("问题是否解决")]
        public string IsSolvedDescription { get; set; }

        [ExcelColumn("解决时间")]
        public DateTime? EndDate { get; set; }

        [ExcelColumn("经度")]
        public double Lontitute { get; set; }

        [ExcelColumn("纬度")]
        public double Lattitute { get; set; }

        [ExcelColumn("用户姓名及电话号码")]
        public string SubscriberInfo { get; set; }

        [ExcelColumn("客户经理姓名")]
        public string ManagerInfo { get; set; }
    }

    public class PreciseWorkItemCell : Entity, IWorkItemCell
    {
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public string WorkItemNumber { get; set; }

        public double Db6Share { get; set; }

        public double Db10Share { get; set; }

        public double BackwardDb6Share { get; set; }

        public double BackwardDb10Share { get; set; }

        public double Mod3Share { get; set; }

        public double Mod6Share { get; set; }

        public double BackwardMod3Share { get; set; }

        public double BackwardMod6Share { get; set; }

        public double WeakCoverageRate { get; set; }

        public double OverCoverageRate { get; set; }

        public double OriginalDownTilt { get; set; }

        public double OriginalRsPower { get; set; }

        public double AdjustDownTilt { get; set; }

        public double AdjustRsPower { get; set; }

        public DateTime? BeginDate { get; set; }

        public DateTime? FininshDate { get; set; }
    }

    [AutoMapFrom(typeof(MrGridKpiDto))]
    public class MrGridKpi : Entity
    {
        public int X { get; set; }

        public int Y { get; set; }

        public int MrCount { get; set; }

        public int WeakCount { get; set; }

        public double Rsrp { get; set; }

        public int MrCountNormalize { get; set; }

        public int WeakCountNormalize { get; set; }

        public int RsrpNormalize { get; set; }

        public int ShortestDistance { get; set; }
    }

    [AutoMapFrom(typeof(MrGridKpi))]
    public class MrGridKpiDto : IGeoGridPoint<double>
    {
        [CsvColumn(Name = "X")]
        public int X { get; set; }

        [CsvColumn(Name = "Y")]
        public int Y { get; set; }

        public double Longtitute => 112 + X*0.00049;

        public double Lattitute => 22 + Y*0.00045;

        [CsvColumn(Name = "MR总数")]
        public int MrCount { get; set; }

        [CsvColumn(Name = "弱覆盖数")]
        public int WeakCount { get; set; }

        public double WeakCoverageRate => MrCount == 0 ? 0 : (double) WeakCount/MrCount*100;

        [CsvColumn(Name = "平均RSRP")]
        public double Rsrp { get; set; }

        [CsvColumn(Name = "MR总数归一")]
        public int MrCountNormalize { get; set; }

        [CsvColumn(Name = "弱覆盖数归一")]
        public int WeakCountNormalize { get; set; }

        [CsvColumn(Name = "平均RSRP归一")]
        public int RsrpNormalize { get; set; }

        [CsvColumn(Name = "最近距离")]
        public int ShortestDistance { get; set; }
    }

    [AutoMapFrom(typeof(DpiGridKpiDto))]
    public class DpiGridKpi : Entity
    {
        public int X { get; set; }

        public int Y { get; set; }

        public double FirstPacketDelay { get; set; }

        public double FirstPacketDelayClass { get; set; }

        public double PageOpenDelay { get; set; }

        public double PageOpenDelayClass { get; set; }
    }

    [AutoMapFrom(typeof(DpiGridKpi))]
    public class DpiGridKpiDto : IGeoGridPoint<double>
    {
        public int X { get; set; }
        
        public int Y { get; set; }

        public double Longtitute => 112 + X * 0.00049;

        public double Lattitute => 22 + Y * 0.00045;

        public double FirstPacketDelay { get; set; }

        public double FirstPacketDelayClass { get; set; }

        public double PageOpenDelay { get; set; }

        public double PageOpenDelayClass { get; set; }
    }

    public class GridCluster : Entity, IGeoGridPoint<double>
    {
        public string Theme { get; set; }

        public int ClusterNumber { get; set; }

        public int X { get; set; }

        public int Y { get; set; }

        public double Longtitute => 112 + X * 0.00049;

        public double Lattitute => 22 + Y * 0.00045;
    }

    public class GridClusterView
    {
        public string Theme { get; set; }

        public int ClusterNumber { get; set; }

        public IEnumerable<GeoGridPoint> GridPoints { get; set; }
    }

    [TypeDoc("定义LTE基站数据库表对应的ORM对象")]
    [AutoMapFrom(typeof(ENodebExcel))]
    public class ENodeb : Entity, IGeoPoint<double>
    {
        [MemberDoc("基站编号")]
        public int ENodebId { get; set; }

        [MaxLength(50)]
        [MemberDoc("基站名称")]
        public string Name { get; set; }

        [MemberDoc("镇区编号")]
        public int TownId { get; set; }

        [MemberDoc("经度")]
        public double Longtitute { get; set; }

        [MemberDoc("纬度")]
        public double Lattitute { get; set; }

        [MemberDoc("厂家")]
        public string Factory { get; set; }

        [MemberDoc("FDD制式")]
        [AutoMapPropertyResolve("DivisionDuplex", typeof(ENodebExcel), typeof(FddTransform))]
        public bool IsFdd { get; set; }

        [MemberDoc("地址")]
        public string Address { get; set; }

        [MemberDoc("网关")]
        [AutoMapPropertyResolve("GatewayIp", typeof(ENodebExcel), typeof(IpAddressTransform))]
        public int Gateway { get; set; }

        [MemberDoc("子IP")]
        [AutoMapPropertyResolve("Ip", typeof(ENodebExcel), typeof(IpByte4Transform))]
        public byte SubIp { get; set; }

        [MemberDoc("网关IP")]
        public IpAddress GatewayIp => new IpAddress { AddressValue = Gateway };

        [MemberDoc("IP")]
        public IpAddress Ip => new IpAddress { AddressValue = Gateway, IpByte4 = SubIp };

        [MemberDoc("规划编号(设计院)")]
        public string PlanNum { get; set; }

        [MemberDoc("入网日期")]
        public DateTime OpenDate { get; set; }

        [MemberDoc("是否在用")]
        public bool IsInUse { get; set; } = true;

    }

    public class ENodebExcelTransform : ValueResolver<ENodebExcel, ENodeb>
    {
        protected override ENodeb ResolveCore(ENodebExcel source)
        {
            return source.MapTo<ENodeb>();
        }
    }

    [AutoMapFrom(typeof(CellExcel))]
    public class ENodebBtsIdPair
    {
        public int ENodebId { get; set; }

        [AutoMapPropertyResolve("ShareCdmaInfo", typeof(CellExcel), typeof(SharedBtsIdTransform))]
        public int BtsId { get; set; }
    }

    [AutoMapFrom(typeof(ENodebExcelWithTownIdContainer))]
    public class ENodebWithTownIdContainer
    {
        [AutoMapPropertyResolve("ENodebExcel", typeof(ENodebExcelWithTownIdContainer), typeof(ENodebExcelTransform))]
        public ENodeb ENodeb { get; set; }

        public int TownId { get; set; }
    }

    [TypeDoc("定义CDMA基站的数据库对应的ORM对象")]
    [AutoMapFrom(typeof(BtsExcel))]
    public class CdmaBts : Entity
    {
        public int ENodebId { get; set; } = -1;

        [MaxLength(50)]
        public string Name { get; set; }

        public int TownId { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string Address { get; set; }

        public int BtsId { get; set; }

        public short BscId { get; set; }

        public bool IsInUse { get; set; } = true;
    }

    [AutoMapFrom(typeof(CdmaBts))]
    [TypeDoc("CDMA基站视图")]
    public class CdmaBtsView
    {
        [MemberDoc("基站名称")]
        public string Name { get; set; }

        [MemberDoc("所属镇区编号")]
        public int TownId { get; set; }

        [MemberDoc("经度")]
        public double Longtitute { get; set; }

        [MemberDoc("区域")]
        public string DistrictName { get; set; }

        [MemberDoc("镇区")]
        public string TownName { get; set; }

        [MemberDoc("纬度")]
        public double Lattitute { get; set; }

        [MemberDoc("地址")]
        public string Address { get; set; }

        [MemberDoc("基站编号")]
        public int BtsId { get; set; }

        [MemberDoc("BSC编号")]
        public int BscId { get; set; }

        [MemberDoc("是否在用")]
        public bool IsInUse { get; set; }
    }

    public class CdmaBtsTransform : ValueResolver<BtsExcel, CdmaBts>
    {
        protected override CdmaBts ResolveCore(BtsExcel source)
        {
            return source.MapTo<CdmaBts>();
        }
    }

    [AutoMapFrom(typeof(BtsExcelWithTownIdContainer))]
    public class BtsWithTownIdContainer
    {
        [AutoMapPropertyResolve("BtsExcel", typeof(BtsExcelWithTownIdContainer), typeof(CdmaBtsTransform))]
        public CdmaBts CdmaBts { get; set; }

        public int TownId { get; set; }
    }
}
