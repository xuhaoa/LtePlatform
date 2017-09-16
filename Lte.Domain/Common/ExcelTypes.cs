using System;
using System.Collections.Generic;
using AutoMapper;
using Lte.Domain.Regular.Attributes;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;
using Lte.Domain.LinqToCsv;
using Lte.Domain.LinqToCsv.Context;
using Lte.Domain.LinqToCsv.Description;
using Lte.Domain.Regular;

namespace Lte.Domain.Common
{
    public interface IBeginDate
    {
        DateTime BeginDate { get; set; }
    }

    [TypeDoc("定义记录CDMA小区的信息的Excel导出数据项，需要定义与CdmaCell之间的映射关系")]
    public class CdmaCellExcel
    {
        [ExcelColumn("扇区标识")]
        [MemberDoc("扇区标识")]
        [Required]
        public byte SectorId { get; set; }

        [ExcelColumn("频点")]
        [MemberDoc("CDMA频点，如283、201、37等")]
        public int Frequency { get; set; }

        [ExcelColumn("覆盖类型(室内/室外/地铁)")]
        [MemberDoc("覆盖类型(室内/室外/地铁)")]
        public string IsIndoor { get; set; } = "否";

        [ExcelColumn("经度")]
        [MemberDoc("经度")]
        [Required]
        public double Longtitute { get; set; }

        [ExcelColumn("纬度")]
        [MemberDoc("纬度")]
        [Required]
        public double Lattitute { get; set; }

        [ExcelColumn("挂高")]
        [MemberDoc("天线挂高（米）")]
        public double Height { get; set; }

        [ExcelColumn("下倾角（机械）")]
        [MemberDoc("下倾角（机械）")]
        public double MTilt { get; set; }

        [ExcelColumn("下倾角（电调）")]
        [MemberDoc("下倾角（电调）")]
        public double ETilt { get; set; }

        [ExcelColumn("方位角")]
        [MemberDoc("方位角")]
        public double Azimuth { get; set; }

        [ExcelColumn("天线增益（dBi）", TransformEnum.DefaultZeroDouble)]
        [MemberDoc("天线增益（dBi）")]
        public double AntennaGain { get; set; }

        [ExcelColumn("基站编号")]
        [MemberDoc("基站编号")]
        public int BtsId { get; set; }

        [ExcelColumn("小区标识")]
        [MemberDoc("小区标识")]
        public int CellId { get; set; }

        [IgnoreMap]
        [ExcelColumn("载扇类型(1X/DO)")]
        [MemberDoc("载扇类型(1X/DO)")]
        public string CellType { get; set; }

        [IgnoreMap]
        [ExcelColumn("LAC")]
        [MemberDoc("LAC，位置区编码")]
        public string Lac { get; set; }

        [IgnoreMap]
        [ExcelColumn("PN码")]
        [MemberDoc("PN码")]
        public short Pn { get; set; }

        [ExcelColumn("是否是RRU(来自：RRU拉远表)")]
        public string IsRru { get; set; }

        [ExcelColumn("TRM单板号")]
        public byte TrmId { get; set; }

        [ExcelColumn("RRU覆盖名称(来自：RRU拉远表)")]
        public string RruName { get; set; }
    }

    [TypeDoc("定义记录LTE小区的信息的Excel导出数据项")]
    public class CellExcel
    {
        [ExcelColumn("CELL_ID", TransformEnum.ByteRemoveQuotions)]
        public byte SectorId { get; set; }

        [ExcelColumn("FSL编号")]
        public string PlanNum { get; set; }

        [ExcelColumn("SectorID")]
        public byte LocalSectorId { get; set; }

        [ExcelColumn("频点")]
        public int Frequency { get; set; }

        [ExcelColumn("拉远名称")]
        public string RruName { get; set; }

        [ExcelColumn("是否接室分")]
        public string IsIndoor { get; set; } = "否";

        [ExcelColumn("经度")]
        public double Longtitute { get; set; }

        [ExcelColumn("纬度")]
        public double Lattitute { get; set; }

        [ExcelColumn("天线挂高")]
        public double Height { get; set; }

        [ExcelColumn("机械下倾角")]
        public double MTilt { get; set; }

        [ExcelColumn("电下倾角")]
        public double ETilt { get; set; }

        [ExcelColumn("方位角")]
        public double Azimuth { get; set; }

        [ExcelColumn("天线增益")]
        public double AntennaGain { get; set; }

        [ExcelColumn("eNodeB ID", TransformEnum.IntegerRemoveQuotions)]
        public int ENodebId { get; set; }

        [ExcelColumn("频段号")]
        public byte BandClass { get; set; }

        [ExcelColumn("天线信息")]
        public string AntennaInfo { get; set; }

        [ExcelColumn("收发类型")]
        public string TransmitReceive { get; set; }

        [ExcelColumn("共天线信息")]
        public string ShareCdmaInfo { get; set; }

        [ExcelColumn("PCI")]
        public short Pci { get; set; }

        [ExcelColumn("根序列索引")]
        public short Prach { get; set; }

        [ExcelColumn("TAC")]
        public int Tac { get; set; }

        [ExcelColumn("参考信号功率")]
        public double RsPower { get; set; }

        [ExcelColumn("C网共站小区ID")]
        public string CdmaCellId { get; set; }

        [ExcelColumn("天线厂家")]
        public string AntennaFactoryString { get; set; }

        [ExcelColumn("天线型号")]
        public string AntennaModel { get; set; }

        [ExcelColumn("能否电调")]
        public string CanBeETiltDescription { get; set; }

        [ExcelColumn("是否美化")]
        public string IsBeautifyDescription { get; set; }

        [ExcelColumn("是否CA")]
        public string IsCaDescription { get; set; }
    }

    public class IndoorDistributionExcel : IGeoPoint<double>
    {
        [ExcelColumn("站址编号")]
        public string StationNum { get; set; }

        [ExcelColumn("站名")]
        public string Name { get; set; }

        [ExcelColumn("详细地址")]
        public string Address { get; set; }
        
        [ExcelColumn("经度")]
        public double Longtitute { get; set; }

        [ExcelColumn("纬度")]
        public double Lattitute { get; set; }

        [ExcelColumn("地市")]
        public string City { get; set; }

        [ExcelColumn("所属网格")]
        public string District { get; set; }

        [ExcelColumn("服务商名称")]
        public string Server { get; set; }

        [ExcelColumn("服务区编号")]
        public string ServiceArea { get; set; }

        [ExcelColumn("系统分类")]
        public string ScaleDescription { get; set; }

        [ExcelColumn("站点归属")]
        public string Owner { get; set; }

        [ExcelColumn("有源设备数量")]
        public byte SourceAppliances { get; set; }

        [ExcelColumn("室外微基站数量")]
        public byte OutdoorPicos { get; set; }

        [ExcelColumn("室外直放站数量")]
        public byte OutdoorRepeaters { get; set; }

        [ExcelColumn("室外RRU拉远数量")]
        public byte OutdoorRrus { get; set; }

        [ExcelColumn("室分信源微基站数量")]
        public byte IndoorPicos { get; set; }

        [ExcelColumn("室分信源直放站数量")]
        public byte IndoorRepeaters { get; set; }

        [ExcelColumn("室分信源RRU拉远数量")]
        public byte IndoorRrus { get; set; }

        [ExcelColumn("室分干放数量")]
        public byte Amplifiers { get; set; }

        [ExcelColumn("L网基站编号")]
        public int ENodebId { get; set; }

        [ExcelColumn("L网扇区编号")]
        public byte LteSectorId { get; set; }

        [ExcelColumn("C网基站编号")]
        public int BtsId { get; set; }

        [ExcelColumn("C网扇区编号")]
        public byte CdmaSectorId { get; set; }
    }

    [TypeDoc("定义记录LTE基站的信息的Excel导出数据项")]
    public class ENodebExcel
    {
        [ExcelColumn("eNodeBName")]
        [MemberDoc("基站名称")]
        public string Name { get; set; }

        [ExcelColumn("区域")]
        [MemberDoc("区域")]
        public string DistrictName { get; set; }

        [ExcelColumn("镇区")]
        [MemberDoc("镇区")]
        public string TownName { get; set; }

        [ExcelColumn("经度")]
        [MemberDoc("经度")]
        public double Longtitute { get; set; }

        [ExcelColumn("纬度")]
        [MemberDoc("纬度")]
        public double Lattitute { get; set; }

        [ExcelColumn("地址")]
        [MemberDoc("地址")]
        public string Address { get; set; }

        [ExcelColumn("地市")]
        [MemberDoc("地市")]
        public string CityName { get; set; }

        [ExcelColumn("网格")]
        [MemberDoc("网格")]
        public string Grid { get; set; }

        [ExcelColumn("厂家")]
        [MemberDoc("厂家")]
        public string Factory { get; set; }

        [ExcelColumn("IP", TransformEnum.IpAddress)]
        [MemberDoc("IP")]
        public IpAddress Ip { get; set; } = new IpAddress("0.0.0.0");

        [ExcelColumn("eNodeB ID")]
        [MemberDoc("eNodeB ID")]
        public int ENodebId { get; set; }

        [MemberDoc("IP地址字符串")]
        public string IpString => Ip.AddressString;

        [ExcelColumn("网关", TransformEnum.IpAddress)]
        [MemberDoc("网关")]
        public IpAddress GatewayIp { get; set; } = new IpAddress("0.0.0.0");

        [MemberDoc("网关地址字符串")]
        public string GatewayString => GatewayIp.AddressString;

        [ExcelColumn("规划编号(设计院)")]
        [MemberDoc("规划编号(设计院)")]
        public string PlanNum { get; set; }

        [ExcelColumn("制式")]
        [MemberDoc("制式")]
        public string DivisionDuplex { get; set; } = "FDD";

        [ExcelColumn("入网日期", TransformEnum.DefaultOpenDate)]
        [MemberDoc("入网日期")]
        public DateTime OpenDate { get; set; }
    }

    public class ENodebExcelWithTownIdContainer
    {
        public ENodebExcel ENodebExcel { get; set; }

        public int TownId { get; set; }
    }

    [TypeDoc("定义记录CDMA基站信息的Excel导出数据项，需要定义与CdmaBts之间的映射关系。")]
    public class BtsExcel
    {
        [ExcelColumn("基站名称")]
        public string Name { get; set; }

        [ExcelColumn("行政区域")]
        public string DistrictName { get; set; }

        [ExcelColumn("所属镇区")]
        public string TownName { get; set; }

        [ExcelColumn("经度")]
        public double Longtitute { get; set; }

        [ExcelColumn("纬度")]
        public double Lattitute { get; set; }

        [ExcelColumn("地址", TransformEnum.AntiNullAddress)]
        public string Address { get; set; }

        [ExcelColumn("基站编号")]
        public int BtsId { get; set; }

        [ExcelColumn("BSC编号")]
        public short BscId { get; set; }
    }

    public class BtsExcelWithTownIdContainer
    {
        public BtsExcel BtsExcel { get; set; }

        public int TownId { get; set; }
    }

    public class SharedBtsIdTransform : ValueResolver<string, int>
    {
        protected override int ResolveCore(string source)
        {
            if (string.IsNullOrEmpty(source)) return 0;
            return source.Split('_').Length > 2 ? source.Split('_')[1].ConvertToInt(-1) : -1;
        }
    }

    public class PreciseCoverage4GCsv
    {
        [CsvColumn(Name = "时间")]
        public DateTime StatTime { get; set; }

        [CsvColumn(Name = "BTS")]
        public int CellId { get; set; }

        [CsvColumn(Name = "SECTOR")]
        public byte SectorId { get; set; }

        [CsvColumn(Name = "MR总数")]
        public int TotalMrs { get; set; }

        [CsvColumn(Name = "第三强邻区MR重叠覆盖率")]
        public double ThirdNeighborRate { get; set; }

        public int ThirdNeighbors => (int)(TotalMrs * ThirdNeighborRate) / 100;

        [CsvColumn(Name = "第二强邻区MR重叠覆盖率")]
        public double SecondNeighborRate { get; set; }

        public int SecondNeighbors => (int)(TotalMrs * SecondNeighborRate) / 100;

        [CsvColumn(Name = "第一强邻区MR重叠覆盖率")]
        public double FirstNeighborRate { get; set; }

        public int FirstNeighbors => (int)(TotalMrs * FirstNeighborRate) / 100;
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

    public class ComplainExcel : IBeginDate
    {
        [ExcelColumn("工单编号")]
        public string SerialNumber { get; set; }

        [ExcelColumn("所属区域")]
        public string SelfDistrict { get; set; }

        public string District
            =>
                string.IsNullOrEmpty(SelfDistrict)
                    ? (string.IsNullOrEmpty(Grid)
                        ? (string.IsNullOrEmpty(CandidateDistrict) ? "" : CandidateDistrict.Replace("区", ""))
                        : Grid.Replace("FS", ""))
                    : SelfDistrict;

        [ExcelColumn("产品类型")]
        public string ProductType { get; set; }

        [ExcelColumn("服务类别")]
        public string ServiceType { get; set; }

        public string[] ServiceTypeFields => ServiceType.GetSplittedFields('-');

        public string ServiceType1 => ServiceTypeFields.Length > 0 ? ServiceTypeFields[0] : "";

        public string ServiceType2 => ServiceTypeFields.Length > 1 ? ServiceTypeFields[1] : "";

        public string ServiceType3 => ServiceTypeFields.Length > 2 ? ServiceTypeFields[2] : "";

        [ExcelColumn("工单状态")]
        public string StateDescription { get; set; }

        [ExcelColumn("客户电话")]
        public string SubscriberPhone { get; set; }

        [ExcelColumn("重复次数")]
        public byte? RepeatTimes { get; set; }

        [ExcelColumn("紧急程度")]
        public string UrgentDescription { get; set; }

        public bool IsUrgent => UrgentDescription == "紧急";

        [ExcelColumn("工单来源")]
        public string ComplainSource { get; set; }

        [ExcelColumn("归属地")]
        public string City { get; set; }

        [ExcelColumn("客户名称")]
        public string SubscriberInfo { get; set; }

        [ExcelColumn("联系电话1")]
        public string ContactPhone { get; set; }

        [ExcelColumn("联系人")]
        public string ContactPerson { get; set; }

        [ExcelColumn("联系地址")]
        public string ContactAddress { get; set; }

        [ExcelColumn("受理内容")]
        public string ComplainContents { get; set; }

        [ExcelColumn("受理时间")]
        public DateTime BeginDate { get; set; }

        [ExcelColumn("受理人班组")]
        public string ManagerInfo { get; set; }

        [ExcelColumn("当前环节")]
        public string StageDescription { get; set; }

        [ExcelColumn("全程超时时间")]
        public DateTime Deadline { get; set; }

        [ExcelColumn("当前处理班组")]
        public string CurrentProcessor { get; set; }

        [ExcelColumn("当前班组接单时间")]
        public DateTime ProcessTime { get; set; }

        [ExcelColumn("电子运维流水号")]
        public string OssSerialNumber { get; set; }

        [ExcelColumn("工单来源")]
        public string SourceDescription { get; set; }

        [ExcelColumn("受理时间")]
        public DateTime BeginTime { get; set; }

        [ExcelColumn("区/县")]
        public string CandidateDistrict { get; set; }

        [ExcelColumn("路名")]
        public string RoadName { get; set; }

        [ExcelColumn("楼宇名称")]
        public string BuildingName { get; set; }

        [ExcelColumn("原因定性")]
        public string CauseLocation { get; set; }

        [ExcelColumn("预处理内容")]
        public string PreProcessContents { get; set; }

        [ExcelColumn("4G用户")]
        public string Subscriber4G { get; set; }

        [ExcelColumn("经度", TransformEnum.Longtitute, 0)]
        public double Longtitute { get; set; }

        [ExcelColumn("纬度", TransformEnum.Lattitute, 0)]
        public double Lattitute { get; set; }

        [ExcelColumn("原因定性一级")]
        public string FirstReason { get; set; }

        public string ReasonFirst => string.IsNullOrEmpty(FirstReason) ? ServiceType2 : FirstReason;

        [ExcelColumn("原因定性二级")]
        public string SecondReason { get; set; }

        public string ReasonSecond => string.IsNullOrEmpty(SecondReason) ? ServiceType3 : SecondReason;

        [ExcelColumn("归属网格")]
        public string Grid { get; set; }

        [ExcelColumn("业务类型")]
        public string NetworkDescription { get; set; }

        [ExcelColumn("相关站点名称")]
        public string Site { get; set; }

        [ExcelColumn("问题点或区域描述")]
        public string Position { get; set; }

        public string SitePosition => string.IsNullOrEmpty(Site) ? Position : Site;

        [ExcelColumn("室内室外")]
        public string IndoorDescription { get; set; }

        [ExcelColumn("使用场合")]
        public string Scene { get; set; }

        [ExcelColumn("表象大类")]
        public string CategoryDescription { get; set; }

        public int TownId { get; set; }
    }

    public class VipDemandExcel : IBeginDate
    {
        [ExcelColumn("编号")]
        public string SerialNumber { get; set; }

        [ExcelColumn("需求等级")]
        public string DemandLevelDescription { get; set; }

        [ExcelColumn("项目名称")]
        public string ProjectName { get; set; }

        [ExcelColumn("涉及网络")]
        public string NetworkTypeDescription { get; set; }

        [ExcelColumn("需求部门")]
        public string Department { get; set; }

        [ExcelColumn("需求联系人")]
        public string ContactPerson { get; set; }

        [ExcelColumn("联系人电话")]
        public string PhoneNumber { get; set; }

        [ExcelColumn("保障区域")]
        public string Area { get; set; }

        [ExcelColumn("受理时间")]
        public DateTime BeginDate { get; set; }

        [ExcelColumn("预计完成时间")]
        public DateTime PlanDate { get; set; }

        [ExcelColumn("项目内容")]
        public string ProjectContents { get; set; }

        [ExcelColumn("回单人")]
        public string SustainPerson { get; set; }

        [ExcelColumn("回单时间")]
        public DateTime FinishTime { get; set; }

        [ExcelColumn("支撑放号", TransformEnum.IntegerDefaultToZero, 100)]
        public int SubscriberGotten { get; set; }

        [ExcelColumn("处理结果")]
        public string FinishResults { get; set; }
    }

    public class WorkItemExcel
    {
        [ExcelColumn("故障单号")]
        public string SerialNumber { get; set; }

        [ExcelColumn("故障标题")]
        public string Title { get; set; }

        public string SubTypeDescription
            => Title.Replace("集团接口", "").Replace("省接口", "").Replace("【移动业务感知/无线】", "").GetSplittedFields("/Ne=")[0];

        [ExcelColumn("故障种类")]
        public string TypeDescription { get; set; }

        [ExcelColumn("故障位置")]
        public string Position { get; set; }

        public string[] NetworkElement
            => Position.Contains(':') ? Position.GetSplittedFields(':')[1].GetSplittedFields('_') : new[] { "" };

        public string ENodebPart => SplittedContents.FirstOrDefault(x => x.StartsWith("enb_id："));

        public int ENodebId
            =>
                NetworkElement.Length > 2
                    ? NetworkElement[1].ConvertToInt(0)
                    : ENodebPart?.Replace("enb_id：", "").ConvertToInt(0) ?? 0;

        public string SectorPart => SplittedContents.FirstOrDefault(x => x.StartsWith("cell_id："));

        public byte SectorId
            =>
                NetworkElement.Length > 2
                    ? NetworkElement[2].ConvertToByte(0)
                    : SectorPart?.Replace("cell_id：", "").ConvertToByte(0) ?? 0;

        [ExcelColumn("建单时间")]
        public DateTime BeginTime { get; set; }

        [ExcelColumn("应恢复时间")]
        public DateTime Deadline { get; set; }

        [ExcelColumn("受理部门")]
        public string StaffName { get; set; }

        [ExcelColumn("故障修复时间")]
        public DateTime? FinishTime { get; set; }

        [ExcelColumn("故障状态")]
        public string StateDescription { get; set; }

        [ExcelColumn("故障原因")]
        public string MalfunctionCause { get; set; }

        public string CauseDescription
            => string.IsNullOrEmpty(MalfunctionCause) ? "" : MalfunctionCause.GetSplittedFields(',')[0];

        [ExcelColumn("故障内容")]
        public string Contents { get; set; }

        public string[] SplittedContents => Contents.GetSplittedFields("；");

        public string[] Information => Contents.GetSplittedFields("<br/>");

        public string DateTimeString
            =>
                Information.FirstOrDefault(x => x.StartsWith("【告警附件文本信息】:"))?.Replace("【告警附件文本信息】:", "") ??
                (Information.Length > 0 ? Information[0] : DateTime.Today.ToShortDateString());

        public IEnumerable<string> Condition => Information.Where(x => x.StartsWith("问题判决条件:") || x.Contains("请求次数："));

        public string Comments
            => "[" + DateTimeString + "]" + (Condition.Any() ? Condition.Aggregate((x, y) => x + y) : "");
    }

    [TypeDoc("电子运维投诉工单Excel表结构")]
    public class OnlineSustainExcel : IBeginDate
    {
        [ExcelColumn("接单日期")]
        public DateTime BeginDate { get; set; }

        [ExcelColumn("故障单号（投诉单号）")]
        public string SerialNumber { get; set; }

        [ExcelColumn("故障来源")]
        public string ComplainSourceDescription { get; set; }

        [ExcelColumn("故障现象（申告现象）")]
        public string ComplainReason { get; set; }

        public string[] ReasonGroups => string.IsNullOrEmpty(ComplainReason) ? new string[1] : ComplainReason.GetSplittedFields('-');

        public string FirstReasonClass => ReasonGroups.Length > 0 ? ReasonGroups[0] : "其他";

        public string SecondReasonClass => ReasonGroups.Length > 1 ? ReasonGroups[1] : "其他";

        public string ThirdReasonClass => ReasonGroups.Length > 2 ? ReasonGroups[2] : "其他";

        [ExcelColumn("故障内容（投诉内容）")]
        public string Phenomenon { get; set; }

        [ExcelColumn("结单信息")]
        public string FeedbackInfo { get; set; }

        [ExcelColumn("投诉地点")]
        public string Site { get; set; }

        [ExcelColumn("故障种类（申告种类）")]
        public string ComplainCategoryDescription { get; set; }

        [ExcelColumn("申告级别")]
        public string Issue { get; set; }

        [ExcelColumn("所属区域")]
        public string District { get; set; }

        [ExcelColumn("镇区")]
        public string Town { get; set; }

        [ExcelColumn("申告时间")]//Process--
        public DateTime? ComplainTime { get; set; }

        [ExcelColumn("受理时间")]//Process--
        public DateTime? ReceiveTime { get; set; }

        [ExcelColumn("申告号码")]
        public string ComplainNumber { get; set; }

        [ExcelColumn("联系电话")]
        public string ContactPhone { get; set; }

        [ExcelColumn("协查单信息")]
        public string WorkItemNumber { get; set; }
        
        [ExcelColumn("覆盖类型")]//Process--
        public string CoverageTypeDescription { get; set; }

        [ExcelColumn(("工单信息"))]
        public string WorkItemInfo { get; set; }

        [ExcelColumn("处理日期")]//Process--
        public DateTime? ProcessDate { get; set; }

        [ExcelColumn("投诉点场所类型")]//Process--
        public string AreaTypeDescription { get; set; }

        [ExcelColumn("处理过程及建议")]//Process--
        public string ProcessSuggestion { get; set; }

        [ExcelColumn("测试地点")]
        public string Address { get; set; }

        [ExcelColumn("投诉点经度", TransformEnum.DoubleEmptyZero, 0)]
        public double Longtitute { get; set; }

        [ExcelColumn("投诉点纬度", TransformEnum.DoubleEmptyZero, 0)]
        public double Lattitute { get; set; }

        [ExcelColumn("主用基站名称")]//Process--
        public string BtsName { get; set; }
        
        [ExcelColumn("主用基站编号")]//Process--
        public int? BtsId { get; set; }

        [ExcelColumn("PN")]//Process--
        public short? Pn { get; set; }

        [ExcelColumn("RX")]//Process--
        public short? ReceiveLevel { get; set; }

        [ExcelColumn("TX")]//Process--
        public short? TransmitLevel { get; set; }

        [ExcelColumn("ECIO")]//Process--
        public double? EcIo { get; set; }
        
        [ExcelColumn("覆盖等级")]//Process--
        public byte? CoverageLevel { get; set; }

        [ExcelColumn("处理/测试人")]//Process--
        public string ProcessPerson { get; set; }

        [ExcelColumn("最终解决方案（分类）")]//Process--
        public string ResolveScheme { get; set; }

        [ExcelColumn("最终解决时间")]//Process--
        public DateTime? ResolveDate { get; set; }

        [ExcelColumn("当前进度（必选）")]//Process
        public string ComplainStateDescription { get; set; }

        public bool IsResolved => ComplainStateDescription == "已解决";

        [ExcelColumn("规划站点名称（新增资源必填）")]//Process--
        public string PlanSite { get; set; }

        [ExcelColumn("投诉原因（按需修正）")]
        public string CauseLocation { get; set; }

        public string[] CauseFields => string.IsNullOrEmpty(CauseLocation) ? null : CauseLocation.GetSplittedFields('/');

        public string WorkItemCause => CauseFields == null ? "" : CauseFields[0];

        public string WorkItemSubCause
            => CauseFields == null ? "" : (CauseFields.Length > 1 ? CauseFields[1] : CauseFields[0]);

        [ExcelColumn("测试报告名称（按规范命名，若无测试安报告需说明原因）")]//Process--
        public string ResolveCauseDescription { get; set; }

    }

    public class WebBrowsingCsv : IGeoPoint<double>
    {
        [CsvColumn(Name = "IMSI")]
        public string Imsi { get; set; }

        [CsvColumn(Name = "MEID")]
        public string Meid { get; set; }

        [CsvColumn(Name = "PhoneType")]
        public string PhoneType { get; set; }

        [CsvColumn(Name = "OSVersion")]
        public string OSVersion { get; set; }

        [CsvColumn(Name = "BaseBand")]
        public string BaseBand { get; set; }

        [CsvColumn(Name = "Kernel")]
        public string Kernel { get; set; }

        [CsvColumn(Name = "InnerVersion")]
        public string InnerVersion { get; set; }

        [CsvColumn(Name = "RamUsage")]
        public string RamUsage { get; set; }

        [CsvColumn(Name = "CpuUsage")]
        public string CpuUsage { get; set; }

        [CsvColumn(Name = "Longitude")]
        public double Longtitute { get; set; }

        [CsvColumn(Name = "Latitude")]
        public double Lattitute { get; set; }

        [CsvColumn(Name = "LocationDesc")]
        public string LocationDesc { get; set; }

        [CsvColumn(Name = "Province")]
        public string Province { get; set; }

        [CsvColumn(Name = "City")]
        public string City { get; set; }

        [CsvColumn(Name = "NetType")]
        public string NetType { get; set; }

        [CsvColumn(Name = "APN")]
        public string Apn { get; set; }
        [CsvColumn(Name = "CdmaSid")]
        public string CdmaSid { get; set; }
        [CsvColumn(Name = "CdmaNid")]
        public string CdmaNid { get; set; }
        [CsvColumn(Name = "CdmaBsid")]
        public string CdmaBsid { get; set; }
        [CsvColumn(Name = "CdmadBm")]
        public string CdmadBm { get; set; }

        [CsvColumn(Name = "LteCi")]
        public string LteCi { get; set; }
        [CsvColumn(Name = "LtePci")]
        public string LtePci { get; set; }
        [CsvColumn(Name = "LteTac")]
        public string LteTac { get; set; }

        [CsvColumn(Name = "LteRsrp")]
        public string LteRsrpString { get; set; }

        [CsvColumn(Name = "LteSinr")]
        public string LteSinrString { get; set; }
        [CsvColumn(Name = "InnerIP")]
        public string InnerIP { get; set; }
        [CsvColumn(Name = "OuterIP")]
        public string OuterIP { get; set; }

        [CsvColumn(Name = "WebsiteName")]
        public string WebsiteName { get; set; }

        [CsvColumn(Name = "PageURL")]
        public string PageUrl { get; set; }

        [CsvColumn(Name = "PageSurfTime")]
        public DateTime PageSurfTime { get; set; }
        [CsvColumn(Name = "PageIP")]
        public string PageIP { get; set; }
        [CsvColumn(Name = "TCLASS")]
        public string TCLASS { get; set; }
        [CsvColumn(Name = "Success")]
        public string Success { get; set; }
        [CsvColumn(Name = "3GIMSI_LAST4")]
        public string IMSI_LAST4 { get; set; }

        [CsvColumn(Name = "FLAG")]
        public string FLAG { get; set; }

        [CsvColumn(Name = "Ecio")]
        public string Ecio { get; set; }

        [CsvColumn(Name = "Snr")]
        public string Snr { get; set; }

        [CsvColumn(Name = "LteRsrq")]
        public string LteRsrq { get; set; }

        [CsvColumn(Name = "DnsIP")]
        public string DnsIP { get; set; }

        [CsvColumn(Name = "Source")]
        public string Source { get; set; }

        [CsvColumn(Name = "FirstByteDelay")]
        public int FirstByteDelay { get; set; }

        [CsvColumn(Name = "PageOpenDelay")]
        public int PageOpenDelay { get; set; }

        [CsvColumn(Name = "RRCsetupDelay")]
        public string RRCsetupDelay { get; set; }

        [CsvColumn(Name = "Extra")]
        public string Extra { get; set; }

        [CsvColumn(Name = "DnsDelay")]
        public int DnsDelay { get; set; }

        [CsvColumn(Name = "ConnDelay")]
        public string ConnectionDelayString { get; set; }

        [CsvColumn(Name = "ReqDelay")]
        public string RequestDelayString { get; set; }

        [CsvColumn(Name = "ResDelay")]
        public string ResponseDelayString { get; set; }

        [CsvColumn(Name = "PageSize")]
        public double PageSize { get; set; }

        [CsvColumn(Name = "PageAvgSpeed")]
        public double PageAvgSpeed { get; set; }
    }

    public class AppStreamingCsv : IGeoPoint<double>
    {
        [CsvColumn(Name = "IMSI")]
        public string Imsi { get; set; }

        [CsvColumn(Name = "MEID")]
        public string Meid { get; set; }

        [CsvColumn(Name = "PhoneType")]
        public string PhoneType { get; set; }

        [CsvColumn(Name = "Longitude")]
        public double Longtitute { get; set; }

        [CsvColumn(Name = "Latitude")]
        public double Lattitute { get; set; }

        [CsvColumn(Name = "LocationDesc")]
        public string LocationDesc { get; set; }

        [CsvColumn(Name = "NetType")]
        public string NetType { get; set; }

        [CsvColumn(Name = "APN")]
        public string Apn { get; set; }

        [CsvColumn(Name = "LteCi")]
        public string LteCi { get; set; }

        [CsvColumn(Name = "LteRsrp")]
        public string LteRsrpString { get; set; }

        [CsvColumn(Name = "LteSinr")]
        public string LteSinrString { get; set; }

        [CsvColumn(Name = "VideoName")]
        public string VideoName { get; set; }

        [CsvColumn(Name = "VideoURL")]
        public string VideoUrl { get; set; }

        [CsvColumn(Name = "VideoTestTime")]
        public DateTime VideoTestTime { get; set; }

        [CsvColumn(Name = "VideoAvgSpeed")]
        public double VideoAvgSpeed { get; set; }

        [CsvColumn(Name = "VideoPeakSpeed")]
        public double VideoPeakSpeed { get; set; }

        [CsvColumn(Name = "3GIMSI_LAST4")]
        public double TotalVideoSize { get; set; }

        [CsvColumn(Name = "BufferCounter")]
        public int BufferCounter { get; set; }

        [CsvColumn(Name = "VideoSize")]
        public string VideoSizeString { get; set; }

        [CsvColumn(Name = "BaseBand")]
        public string BaseBand { get; set; }

        [CsvColumn(Name = "Kernel")]
        public string Kernel { get; set; }

        [CsvColumn(Name = "InnerVersion")]
        public string InnerVersion { get; set; }

        [CsvColumn(Name = "RamUsage")]
        public string RamUsage { get; set; }

        [CsvColumn(Name = "CpuUsage")]
        public string CpuUsage { get; set; }

        [CsvColumn(Name = "Province")]
        public string Province { get; set; }

        [CsvColumn(Name = "City")]
        public string City { get; set; }

        [CsvColumn(Name = "CdmaSid")]
        public string CdmaSid { get; set; }

        [CsvColumn(Name = "CdmaNid")]
        public string CdmaNid { get; set; }

        [CsvColumn(Name = "CdmaBsid")]
        public string CdmaBsid { get; set; }

        [CsvColumn(Name = "CdmadBm")]
        public string CdmadBm { get; set; }

        [CsvColumn(Name = "LtePci")]
        public string LtePci { get; set; }

        [CsvColumn(Name = "LteTac")]
        public string LteTac { get; set; }

        [CsvColumn(Name = "InnerIP")]
        public string InnerIP { get; set; }

        [CsvColumn(Name = "OuterIP")]
        public string OuterIP { get; set; }

        [CsvColumn(Name = "VideoIP")]
        public string VideoIP { get; set; }

        [CsvColumn(Name = "TCLASS")]
        public string TCLASS { get; set; }

        [CsvColumn(Name = "3GIMSI_LAST4")]
        public string IMSI_LAST4 { get; set; }

        [CsvColumn(Name = "FLAG")]
        public string FLAG { get; set; }

        [CsvColumn(Name = "Ecio")]
        public string Ecio { get; set; }

        [CsvColumn(Name = "Snr")]
        public string Snr { get; set; }

        [CsvColumn(Name = "LteRsrq")]
        public string LteRsrq { get; set; }

        [CsvColumn(Name = "DnsIP ")]
        public string DnsIP { get; set; }

        [CsvColumn(Name = "Source")]
        public string Source { get; set; }

        [CsvColumn(Name = "OSVersion")]
        public string OSVersion { get; set; }

        [CsvColumn(Name = "Extra1")]
        public string Extra1 { get; set; }


        [CsvColumn(Name = "Extra2")]
        public string Extra2 { get; set; }

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

    public class HotSpotCellExcel
    {
        [ExcelColumn("热点类型")]
        public string HotSpotTypeDescription { get; set; }

        [ExcelColumn("热点名称")]
        public string HotspotName { get; set; }

        [ExcelColumn("基站编号")]
        public int ENodebId { get; set; }

        [ExcelColumn("小区编号")]
        public byte SectorId { get; set; }
    }

    public class TopDrop2GCellExcel
    {
        [ExcelColumn("地市")]
        public string City { get; set; }

        [ExcelColumn("日期")]
        public DateTime StatDate { get; set; }

        [ExcelColumn("时")]
        public int StatHour { get; set; }

        public DateTime StatTime => StatDate.AddHours(StatHour);

        [ExcelColumn("站号")]
        public int BtsId { get; set; }

        [ExcelColumn("扇区")]
        public byte SectorId { get; set; }

        [ExcelColumn("载波")]
        public short Frequency { get; set; }

        [ExcelColumn("中文名")]
        public string CellName { get; set; }

        [ExcelColumn("业务信道掉话次数")]
        public int Drops { get; set; }

        [ExcelColumn("主叫业务信道分配成功次数")]
        public int MoAssignmentSuccess { get; set; }

        [ExcelColumn("被叫业务信道分配成功次数")]
        public int MtAssignmentSuccess { get; set; }

        [ExcelColumn("业务信道分配成功次数")]
        public int TrafficAssignmentSuccess { get; set; }

        [ExcelColumn("呼叫尝试总次数")]
        public int CallAttempts { get; set; }

        public static string SheetName { get; } = "掉话TOP30小区";
    }

    public class TopConnection2GExcel
    {
        [ExcelColumn("地市")]
        public string City { get; set; }

        [ExcelColumn("日期")]
        public DateTime StatDate { get; set; }

        [ExcelColumn("时")]
        public int StatHour { get; set; }

        public DateTime StatTime => StatDate.AddHours(StatHour);

        [ExcelColumn("站号")]
        public int BtsId { get; set; }

        [ExcelColumn("扇区")]
        public byte SectorId { get; set; }

        [ExcelColumn("载波")]
        public short Frequency { get; set; }

        [ExcelColumn("中文名")]
        public string CellName { get; set; }

        [ExcelColumn("业务信道掉话次数")]
        public int Drops { get; set; }

        [ExcelColumn("主叫业务信道分配成功次数")]
        public int MoAssignmentSuccess { get; set; }

        [ExcelColumn("被叫业务信道分配成功次数")]
        public int MtAssignmentSuccess { get; set; }

        [ExcelColumn("业务信道分配成功次数")]
        public int TrafficAssignmentSuccess { get; set; }

        [ExcelColumn("呼叫尝试总次数")]
        public int CallAttempts { get; set; }

        [ExcelColumn("业务信道分配失败次数")]
        public int TrafficAssignmentFail { get; set; }

        public static string SheetName { get; } = "呼建TOP30小区";
    }

    public class TopConnection3GCellExcel
    {
        [ExcelColumn("地市")]
        public string City { get; set; }

        [ExcelColumn("日期")]
        public DateTime StatDate { get; set; }

        [ExcelColumn("时")]
        public int StatHour { get; set; }

        public DateTime StatTime => StatDate.AddHours(StatHour);

        [ExcelColumn("站号")]
        public int BtsId { get; set; }

        [ExcelColumn("扇区")]
        public byte SectorId { get; set; }

        [ExcelColumn("载波")]
        public short Frequency { get; set; }

        [ExcelColumn("中文名")]
        public string CellName { get; set; }

        [ExcelColumn("无线掉线次数")]
        public int WirelessDrop { get; set; }

        [ExcelColumn("连接尝试次数")]
        public int ConnectionAttempts { get; set; }

        [ExcelColumn("连接失败次数")]
        public int ConnectionFails { get; set; }

        [ExcelColumn("反向链路繁忙率")]
        public double LinkBusyRate { get; set; }

        public static string SheetName { get; } = "连接TOP30小区";
    }

    public class NeighborCellZteCsv
    {
        [CsvColumn(Name = "网元")]
        public int ENodebId { get; set; }

        [CsvColumn(Name = "小区")]
        public byte SectorId { get; set; }

        [CsvColumn(Name = "邻区关系")]
        public string NeighborRelation { get; set; }

        [CsvColumn(Name = "[FDD]系统内同频切换出请求次数（小区对）")]
        public int IntraSystemTimes { get; set; }

        [CsvColumn(Name = "[FDD]系统内异频切换出请求次数(小区对)")]
        public int InterSystemTimes { get; set; }

        public static List<NeighborCellZteCsv> ReadNeighborCellZteCsvs(StreamReader reader)
        {
            var infos = CsvContext.Read<NeighborCellZteCsv>(reader, CsvFileDescription.CommaDescription);
            var groupInfos = (from info in infos
                              group info by new { info.ENodebId, info.SectorId, info.NeighborRelation }
                into g
                              select new NeighborCellZteCsv
                              {
                                  ENodebId = g.Key.ENodebId,
                                  SectorId = g.Key.SectorId,
                                  NeighborRelation = g.Key.NeighborRelation,
                                  IntraSystemTimes = g.Sum(x => x.IntraSystemTimes),
                                  InterSystemTimes = g.Sum(x => x.InterSystemTimes)
                              }).ToList();
            return groupInfos;
        }

    }

    public class NeighborCellHwCsv
    {
        [CsvColumn(Name = "邻小区")]
        public string CellRelation { get; set; }

        [CsvColumn(Name = "特定两小区间切换出尝试次数 (无)")]
        public int TotalTimes { get; set; }

        public static List<NeighborCellHwCsv> ReadNeighborCellHwCsvs(StreamReader reader)
        {
            var infos = CsvContext.Read<NeighborCellHwCsv>(reader, CsvFileDescription.CommaDescription);
            var groupInfos = (from info in infos
                              group info by info.CellRelation
                into g
                              select new NeighborCellHwCsv
                              {
                                  CellRelation = g.Key,
                                  TotalTimes = g.Sum(x => x.TotalTimes)
                              }).ToList();
            return groupInfos;
        }
    }

}
