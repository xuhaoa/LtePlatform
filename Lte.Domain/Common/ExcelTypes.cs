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

    public class FlowZteCsv
    {
        [CsvColumn(Name = "开始时间")]
        public DateTime StatTime { get; set; }

        [CsvColumn(Name = "网元")]
        public int ENodebId { get; set; }

        [CsvColumn(Name = "小区")]
        public byte SectorId { get; set; }

        [CsvColumn(Name = "最大RRC连接用户数_1")]
        public int OldMaxRrcUsers { get; set; }

        [CsvColumn(Name = "最大RRC连接用户数-FDD")]
        public int NewMaxRrcUsers { get; set; }

        public int MaxRrcUsers => OldMaxRrcUsers + NewMaxRrcUsers;

        [CsvColumn(Name = "上行平均激活用户数_1")]
        public double OldUlAverageActiveUsers { get; set; }

        [CsvColumn(Name = "上行平均激活用户数-FDD_1484414261455-0-71")]
        public double NewUlAvgActUsers { get; set; }

        public double UplinkAverageActiveUsers => OldUlAverageActiveUsers + NewUlAvgActUsers;

        [CsvColumn(Name = "下行平均激活用户数_1")]
        public double OldDlAverageActiveUsers { get; set; }

        [CsvColumn(Name = "下行平均激活用户数-FDD_1484414261455-0-72")]
        public double NewDlAvgActUsers { get; set; }

        public double DownlinkAverageActiveUsers => OldDlAverageActiveUsers + NewDlAvgActUsers;

        [CsvColumn(Name = "平均RRC连接用户数_1")]
        public double AverageRrcUsers { get; set; }

        [CsvColumn(Name = "平均激活用户数_1")]
        public double OldAverageActiveUsers { get; set; }

        [CsvColumn(Name = "平均激活用户数")]
        public double NewAvgActUsers { get; set; }

        public double AverageActiveUsers => OldAverageActiveUsers + NewAvgActUsers;

        public int MaxActiveUsers
            =>
                OldMaxActiveUsers + UplinkQci8MaxActiveUsers + UplinkQci9MaxActiveUsers + DownlinkQci8MaxActiveUsers +
                DownlinkQci9MaxActiveUsers;

        [CsvColumn(Name = "最大激活用户数_1")]
        public int OldMaxActiveUsers { get; set; }

        [CsvColumn(Name = "[LTE]上行QCI8最大激活用户数")]
        public int UplinkQci8MaxActiveUsers { get; set; }

        [CsvColumn(Name = "[LTE]上行QCI9最大激活用户数")]
        public int UplinkQci9MaxActiveUsers { get; set; }

        [CsvColumn(Name = "[LTE]下行QCI8最大激活用户数")]
        public int DownlinkQci8MaxActiveUsers { get; set; }

        [CsvColumn(Name = "[LTE]下行QCI9最大激活用户数")]
        public int DownlinkQci9MaxActiveUsers { get; set; }

        [CsvColumn(Name = "小区PDCP接收上行数据的总时长(s)")]
        public int OldPdcpUplinkDuration { get; set; }

        [CsvColumn(Name = "小区PDCP接收上行数据的总时长(s)")]
        public int NewPdcpUlDuration { get; set; }

        public int PdcpUplinkDuration => OldPdcpUplinkDuration + NewPdcpUlDuration;

        [CsvColumn(Name = "小区PDCP发送下行数据的总时长(s)")]
        public int OldPdcpDownlinkDuration { get; set; }

        [CsvColumn(Name = "小区PDCP发送下行数据的总时长(s)")]
        public int NewPdcpDlDuration { get; set; }

        public int PdcpDownlinkDuration => OldPdcpDownlinkDuration + NewPdcpDlDuration;

        [CsvColumn(Name = "小区上行PDCP层流量（MB）_1440661576499")]
        public double OldUlPdcpFlowInMByte { get; set; }

        [CsvColumn(Name = "小区上行PDCP层流量（MB）")]
        public double NewUlPdcpFlowInMByte { get; set; }

        public double UplindPdcpFlowInMByte => OldUlPdcpFlowInMByte + NewUlPdcpFlowInMByte;

        [CsvColumn(Name = "小区下行PDCP层流量（MB）_1440661576499")]
        public double OldDlPdcpFlowInMByte { get; set; }

        [CsvColumn(Name = "小区下行PDCP层流量（MB）")]
        public double NewDlPdcpFlowInMByte { get; set; }

        public double DownlinkPdcpFlowInMByte => OldDlPdcpFlowInMByte + NewDlPdcpFlowInMByte;

        [CsvColumn(Name = "QCI8小区上行IP Throughput数据量高(兆比特)")]
        public string Qci8UplinkIpThroughputHigh { get; set; }

        [CsvColumn(Name = "QCI8小区上行IP Throughput数据量低(千比特)")]
        public string Qci8UplinkIpThroughputLow { get; set; }

        public double Qci8UplinkIpThroughput
            => (string.IsNullOrEmpty(Qci8UplinkIpThroughputHigh) ? 0 : Qci8UplinkIpThroughputHigh.ConvertToInt(0))
               +
               (string.IsNullOrEmpty(Qci8UplinkIpThroughputLow)
                   ? 0
                   : Qci8UplinkIpThroughputLow.Replace(",", "").ConvertToDouble(0) / 1024);

        [CsvColumn(Name = "QCI8小区上行IP Throughput数据传输时间(毫秒)")]
        public string Qci8UplinkIpThroughputDuration { get; set; }

        public double Qci8UplinkIpDuration => string.IsNullOrEmpty(Qci8UplinkIpThroughputDuration)
            ? 0
            : Qci8UplinkIpThroughputDuration.ConvertToDouble(0) / 1000;

        [CsvColumn(Name = "QCI9小区上行IP Throughput数据量高(兆比特)")]
        public string Qci9UplinkIpThroughputHigh { get; set; }

        [CsvColumn(Name = "QCI9小区上行IP Throughput数据量低(千比特)")]
        public string Qci9UplinkIpThroughputLow { get; set; }

        public double Qci9UplinkIpThroughput
            => (string.IsNullOrEmpty(Qci9UplinkIpThroughputHigh) ? 0 : Qci9UplinkIpThroughputHigh.ConvertToInt(0)) +
               (string.IsNullOrEmpty(Qci9UplinkIpThroughputLow)
                   ? 0
                   : Qci9UplinkIpThroughputLow.Replace(",", "").ConvertToDouble(0) / 1024);

        [CsvColumn(Name = "QCI9小区上行IP Throughput数据传输时间(毫秒)")]
        public string Qci9UplinkIpThroughputDuration { get; set; }

        public double Qci9UplinkIpDuration
            =>
                string.IsNullOrEmpty(Qci9UplinkIpThroughputDuration)
                    ? 0
                    : Qci9UplinkIpThroughputDuration.ConvertToDouble(0) / 1000;

        [CsvColumn(Name = "QCI8小区下行IP Throughput数据量高(兆比特)")]
        public string Qci8DownlinkIpThroughputHigh { get; set; }

        [CsvColumn(Name = "QCI8小区下行IP Throughput数据量低(千比特)")]
        public string Qci8DownlinkIpThroughputLow { get; set; }

        public double Qci8DownlinkIpThroughput
            => (string.IsNullOrEmpty(Qci8DownlinkIpThroughputHigh) ? 0 : Qci8DownlinkIpThroughputHigh.ConvertToInt(0)) +
               (string.IsNullOrEmpty(Qci8DownlinkIpThroughputLow)
                   ? 0
                   : Qci8DownlinkIpThroughputLow.Replace(",", "").ConvertToDouble(0) / 1024);

        [CsvColumn(Name = "QCI8小区下行IP Throughput数据传输时间(毫秒)")]
        public string Qci8DownlinkIpThroughputDuration { get; set; }

        public double Qci8DownlinkIpDuration
            =>
                string.IsNullOrEmpty(Qci8DownlinkIpThroughputDuration)
                    ? 0
                    : Qci8DownlinkIpThroughputDuration.ConvertToDouble(0) / 1000;

        [CsvColumn(Name = "QCI9小区下行IP Throughput数据量高(兆比特)")]
        public string Qci9DownlinkIpThroughputHigh { get; set; }

        [CsvColumn(Name = "QCI9小区下行IP Throughput数据量低(千比特)")]
        public string Qci9DownlinkIpThroughputLow { get; set; }

        public double Qci9DownlinkIpThroughput
            => (string.IsNullOrEmpty(Qci9DownlinkIpThroughputHigh) ? 0 : Qci9DownlinkIpThroughputHigh.ConvertToInt(0)) +
               (string.IsNullOrEmpty(Qci9DownlinkIpThroughputLow)
                   ? 0
                   : Qci9DownlinkIpThroughputLow.Replace(",", "").ConvertToDouble(0) / 1024);

        [CsvColumn(Name = "QCI9小区下行IP Throughput数据传输时间(毫秒)")]
        public string Qci9DownlinkIpThroughputDuration { get; set; }

        public double Qci9DownlinkIpDuration
            =>
                string.IsNullOrEmpty(Qci9DownlinkIpThroughputDuration)
                    ? 0
                    : Qci9DownlinkIpThroughputDuration.ConvertToDouble(0) / 1000;

        [CsvColumn(Name = "下行PDSCH信道上模式3调度次数")]
        public int SchedulingTm3 { get; set; }

        [CsvColumn(Name = "下行PDSCH信道上模式3 RI=2调度次数")]
        public int SchedulingTm3Rank2 { get; set; }

        [CsvColumn(Name = "LTE-CDMA2000系统间重定向请求次数(A2事件触发原因)")]
        public int RedirectA2 { get; set; }

        [CsvColumn(Name = "LTE-CDMA2000系统间重定向请求次数(B2事件触发原因)")]
        public int RedirectB2 { get; set; }

        [CsvColumn(Name = "mt-Access类型RRC连接建立成功次数")]
        public int MtAccessRrcSuccess { get; set; }

        [CsvColumn(Name = "mt-Access类型RRC连接失败次数，定时器超时")]
        public int MtAccessRrcFailTimer { get; set; }

        [CsvColumn(Name = "mt-Access类型RRC连接失败次数，eNB接纳失败")]
        public int MtAccessRrcFailAllow { get; set; }

        [CsvColumn(Name = "mt-Access类型RRC连接失败次数，其他原因")]
        public int MtAccessRrcFailOther { get; set; }

        [CsvColumn(Name = "mo-Signalling类型RRC连接建立成功次数")]
        public int MoSignallingRrcSuccess { get; set; }

        [CsvColumn(Name = "mo-Signalling类型RRC连接失败次数，定时器超时")]
        public int MoSignallingRrcFailTimer { get; set; }

        [CsvColumn(Name = "mo-Signalling类型RRC连接失败次数，eNB接纳失败")]
        public int MoSignallingRrcFailAllow { get; set; }

        [CsvColumn(Name = "mo-Signalling类型RRC连接失败次数，其他原因")]
        public int MoSignallingRrcFailOther { get; set; }

        [CsvColumn(Name = "mo-Data类型RRC连接建立成功次数")]
        public int MoDataRrcSuccess { get; set; }

        [CsvColumn(Name = "mo-Data类型RRC连接失败次数，定时器超时")]
        public int MoDataRrcFailTimer { get; set; }

        [CsvColumn(Name = "mo-Data类型RRC连接失败次数，eNB接纳失败")]
        public int MoDataRrcFailAllow { get; set; }

        [CsvColumn(Name = "mo-Data类型RRC连接失败次数，其他原因")]
        public int MoDataRrcFailOther { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，UserInactive触发释放")]
        public int RrcReleaseUserInactive { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，MME通过上下文释放消息触发释放")]
        public int RrcReleaseMmeContext { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，ENB资源不足引发的释放")]
        public int RrcReleaseResourceLack { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，小区关断或复位引发释放")]
        public int RrcReleaseCellReset { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，ENB触发的其他原因")]
        public int RrcReleaseOther { get; set; }

        [CsvColumn(Name = "highPriorityAccess类型RRC连接建立成功次数")]
        public int HighPriorityAccessRrcSuccess { get; set; }

        [CsvColumn(Name = "highPriorityAccess类型RRC连接失败次数，定时器超时")]
        public int HighPriorityAccessRrcFailTimer { get; set; }

        [CsvColumn(Name = "highPriorityAccess类型RRC连接失败次数，eNB接纳失败")]
        public int HighPriorityAccessRrcFailAllow { get; set; }

        [CsvColumn(Name = "highPriorityAccess类型RRC连接失败次数，其他原因")]
        public int HighPriorityAccessRrcFailOther { get; set; }

        [CsvColumn(Name = "emergency类型RRC连接建立成功次数")]
        public int EmergencyRrcSuccess { get; set; }

        [CsvColumn(Name = "emergency类型RRC连接失败次数，定时器超时")]
        public int EmergencyRrcFailTimer { get; set; }

        [CsvColumn(Name = "emergency类型RRC连接失败次数，eNB接纳失败")]
        public int EmergencyRrcFailAllow { get; set; }

        [CsvColumn(Name = "emergency类型RRC连接失败次数，其他原因")]
        public int EmergencyRrcFailOther { get; set; }

        [CsvColumn(Name = "RRC连接建立总时长(毫秒)")]
        public int RrcTotalDurationInMs { get; set; }

        [CsvColumn(Name = "RRC连接建立最大时间(毫秒)")]
        public int RrcMaxDurationInMs { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，空口定时器超时")]
        public int RrcReleaseTimer { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，ENB等待UE上下文建立定时器超时导致释放")]
        public int RrcReleaseUeContextTimer { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，空口质量差触发RLF")]
        public int RrcReleaseBadRsrp { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，RLC达到最大重传次数")]
        public int RrcReleaseRlcMaxRetransmit { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，PDCP完整性保护失败")]
        public int RrcReleasePdcpIntegrationFail { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，Gtpu ErrInd触发释放")]
        public int RrcReleaseGptu { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，Path故障触发释放")]
        public int RrcReleasePathMalfunction { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，光口故障触发释放")]
        public int RrcReleaseFiber { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，ENB检测到UE被异常拔掉")]
        public int RrcReleaseUeExit { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，跨站重建立失败导致的释放")]
        public int RrcReleaseInterSiteReconstruction { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，ENB重定向导致释放")]
        public int RrcReleaseRedirect { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，ENB无线链路失败导致释放")]
        public int RrcReleaseRadioLink { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，重建立失败引发的释放")]
        public int RrcReleaseReconstructionFail { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，S1链路故障引发释放")]
        public int RrcReleaseS1 { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，MME其它原因导致释放")]
        public int RrcReleaseMmeOther { get; set; }

        [CsvColumn(Name = "RRC连接释放次数，切换失败原因导致释放")]
        public int RrcReleaseSwitchFail { get; set; }

        [CsvColumn(Name = "mt-Access类型RRC连接建立请求次数")]
        public int MtAccessRrcRequest { get; set; }

        [CsvColumn(Name = "mo-Signalling类型RRC连接建立请求次数")]
        public int MoSignallingRrcRequest { get; set; }

        [CsvColumn(Name = "mo-Data类型RRC连接建立请求次数")]
        public int MoDataRrcRequest { get; set; }

        [CsvColumn(Name = "highPriorityAccess类型RRC连接建立请求次数")]
        public int HighPriorityAccessRrcRequest { get; set; }

        [CsvColumn(Name = "emergency类型RRC连接建立请求次数")]
        public int EmergencyRrcRequest { get; set; }

        public static List<FlowZteCsv> ReadFlowZteCsvs(StreamReader reader)
        {
            return
                CsvContext.Read<FlowZteCsv>(reader, CsvFileDescription.CommaDescription)
                    .ToList()
                    .Where(x => !string.IsNullOrEmpty(x.Qci8DownlinkIpThroughputDuration)).ToList();
        }
    }

    public class FlowHuaweiCsv
    {
        [CsvColumn(Name = "开始时间")]
        public DateTime StatTime { get; set; }

        [CsvColumn(Name = "小区")]
        public string CellInfo { get; set; }

        public int ENodebId
        {
            get
            {
                if (string.IsNullOrEmpty(CellInfo)) return 0;
                var fields = CellInfo.GetSplittedFields(", ");
                return fields.Length == 0 ? 0 : fields[3].GetSplittedFields('=')[1].ConvertToInt(0);
            }
        }

        public byte LocalCellId
        {
            get
            {
                if (string.IsNullOrEmpty(CellInfo)) return 0;
                var fields = CellInfo.GetSplittedFields(", ");
                return fields.Length == 0 ? (byte)0 : fields[1].GetSplittedFields('=')[1].ConvertToByte(0);
            }
        }

        [CsvColumn(Name = "小区PDCP层所发送的下行数据的总吞吐量 (比特)")]
        public long PdcpDownlinkFlowInByte { get; set; }

        [CsvColumn(Name = "小区PDCP层所接收到的上行数据的总吞吐量 (比特)")]
        public long PdcpUplinkFlowInByte { get; set; }

        [CsvColumn(Name = "小区内的平均用户数 (无)")]
        public double AverageUsers { get; set; }

        [CsvColumn(Name = "小区内的最大用户数 (无)")]
        public int MaxUsers { get; set; }

        [CsvColumn(Name = "平均激活用户数 (无)")]
        public double AverageActiveUsers { get; set; }

        [CsvColumn(Name = "最大激活用户数 (无)")]
        public int MaxActiveUsers { get; set; }

        [CsvColumn(Name = "上行平均激活用户数 (无)")]
        public double UplinkAverageUsers { get; set; }

        [CsvColumn(Name = "上行最大激活用户数 (无)")]
        public int UplinkMaxUsers { get; set; }

        [CsvColumn(Name = "下行平均激活用户数 (无)")]
        public double DownlinkAverageUsers { get; set; }

        [CsvColumn(Name = "下行最大激活用户数 (无)")]
        public int DownlinkMaxUsers { get; set; }

        [CsvColumn(Name = "小区下行有数据传输总时长(1ms精度) (毫秒)")]
        public int DownlinkDurationInMs { get; set; }

        [CsvColumn(Name = "小区上行有数据传输总时长(1ms精度) (毫秒)")]
        public int UplinkDurationInMs { get; set; }

        [CsvColumn(Name = "小区Uu接口寻呼用户个数 (无)")]
        public string PagingUsersString { get; set; }

        [CsvColumn(Name = "下行Physical Resource Block被使用的平均个数 (无)")]
        public double DownlinkAveragePrbs { get; set; }

        [CsvColumn(Name = "下行PDSCH DRB的Physical Resource Block被使用的平均个数 (无)")]
        public double DownlinkDrbPbs { get; set; }

        [CsvColumn(Name = "上行Physical Resource Block被使用的平均个数 (无)")]
        public double UplinkAveragePrbs { get; set; }

        [CsvColumn(Name = "上行PUSCH DRB的Physical Resource Block被使用的平均个数 (无)")]
        public double UplinkDrbPbs { get; set; }

        [CsvColumn(Name = "小区接收到属于Group A的Preamble消息次数 (无)")]
        public int GroupAPreambles { get; set; }

        [CsvColumn(Name = "小区接收到属于Group B的Preamble消息的次数 (无)")]
        public int GroupBPreambles { get; set; }

        [CsvColumn(Name = "小区接收到专用前导消息的次数 (无)")]
        public int DedicatedPreambles { get; set; }

        [CsvColumn(Name = "统计周期内上行DCI所使用的PDCCH CCE个数 (无)")]
        public long UplinkDciCces { get; set; }

        public double UplinkDciCceRate => TotalCces == 0 ? 0 : (double)UplinkDciCces / TotalCces;

        [CsvColumn(Name = "统计周期内下行DCI所使用的PDCCH CCE个数 (无)")]
        public long DownlinkDciCces { get; set; }

        public double DownlinkDciCceRate => TotalCces == 0 ? 0 : (double)DownlinkDciCces / TotalCces;

        [CsvColumn(Name = "统计周期内可用的PDCCH CCE的个数 (无)")]
        public long TotalCces { get; set; }

        [CsvColumn(Name = "PUCCH的PRB资源分配的平均值 (无)")]
        public string PucchPrbsString { get; set; }

        [CsvColumn(Name = "使UE缓存为空的最后一个TTI所传的上行PDCP吞吐量 (比特)")]
        public long LastTtiUplinkFlowInByte { get; set; }

        [CsvColumn(Name = "扣除使UE缓存为空的最后一个TTI之后的上行数传时长 (毫秒)")]
        public int ButLastUplinkDurationInMs { get; set; }

        [CsvColumn(Name = "使缓存为空的最后一个TTI所传的下行PDCP吞吐量 (比特)")]
        public long LastTtiDownlinkFlowInByte { get; set; }

        [CsvColumn(Name = "扣除使下行缓存为空的最后一个TTI之后的数传时长 (毫秒)")]
        public int ButLastDownlinkDurationInMs { get; set; }

        [CsvColumn(Name = "RANK1的上报次数 (无)")]
        public string SchedulingRank1String { get; set; }

        [CsvColumn(Name = "RANK2的上报次数 (无)")]
        public string SchedulingRank2String { get; set; }

        [CsvColumn(Name = "重定向到CDMA2000 HRPD的总次数 (无)")]
        public int RedirectCdma2000 { get; set; }

        [CsvColumn(Name = "emergency原因的RRC连接建立尝试次数 (无)")]
        public int EmergencyRrcRequest { get; set; }

        [CsvColumn(Name = "emergency原因的RRC连接建立尝试次数(包括重发) (无)")]
        public int EmergencyRrcRequestAll { get; set; }

        [CsvColumn(Name = "emergency原因的RRC连接建立成功次数 (无)")]
        public int EmergencyRrcSuccess { get; set; }

        [CsvColumn(Name = "highPriorityAccess原因的RRC连接建立尝试次数 (无)")]
        public int HighPriorityRrcRequest { get; set; }

        [CsvColumn(Name = "highPriorityAccess原因的RRC连接建立尝试次数(包括重发) (无)")]
        public int HighPriorityRrcRequestAll { get; set; }

        [CsvColumn(Name = "highPriorityAccess原因的RRC连接建立成功次数 (无)")]
        public int HighPriorityRrcSuccess { get; set; }

        [CsvColumn(Name = "mo-Data原因的RRC连接建立尝试次数 (无)")]
        public int MoDataRrcRequest { get; set; }

        [CsvColumn(Name = "mo-Data原因的RRC连接建立尝试次数(包括重发) (无)")]
        public int MoDataRrcRequestAll { get; set; }

        [CsvColumn(Name = "mo-Data原因的RRC连接建立成功次数 (无)")]
        public int MoDataRrcSuccess { get; set; }

        [CsvColumn(Name = "mo-Signalling原因的RRC连接建立尝试次数 (无)")]
        public int MoSignallingRrcRequest { get; set; }

        [CsvColumn(Name = "mo-Signalling原因的RRC连接建立尝试次数(包括重发) (无)")]
        public int MoSignallingRrcRequestAll { get; set; }

        [CsvColumn(Name = "mo-Signalling原因的RRC连接建立成功次数 (无)")]
        public int MoSignallingRrcSuccess { get; set; }

        [CsvColumn(Name = "mt-Access原因的RRC连接建立尝试次数 (无)")]
        public int MtAccessRrcRequest { get; set; }

        [CsvColumn(Name = "mt-Access原因的RRC连接建立尝试次数(包括重发) (无)")]
        public int MtAccessRrcRequestAll { get; set; }

        [CsvColumn(Name = "mt-Access原因的RRC连接建立成功次数 (无)")]
        public int MtAccessRrcSuccess { get; set; }

        [CsvColumn(Name = "其它资源分配失败而导致RRC连接建立失败的次数 (无)")]
        public int RrcFailOtherResource { get; set; }

        [CsvColumn(Name = "用户数规格受限导致的RRC连接建立失败次数 (无)")]
        public int RrcFailUserLimit { get; set; }

        [CsvColumn(Name = "其它原因导致的RRC连接建立被拒绝的次数 (无)")]
        public int RrcRejectFail { get; set; }

        [CsvColumn(Name = "MME过载导致的发送RRC Connection Reject消息次数 (无)")]
        public int RrcRejectOverload { get; set; }

        [CsvColumn(Name = "流控导致的RRC重建请求消息丢弃次数 (无)")]
        public int RrcReconstructionLostFlowControl { get; set; }

        [CsvColumn(Name = "流控导致的RRC Connection Request 消息丢弃次数 (无)")]
        public int RrcRequestLostFlowControl { get; set; }

        [CsvColumn(Name = "资源分配失败而导致RRC连接建立失败次数 (无)")]
        public int RrcFailResourceAssignment { get; set; }

        [CsvColumn(Name = "UE无应答而导致RRC连接建立失败次数 (无)")]
        public int RrcFailUeNoAnswer { get; set; }

        [CsvColumn(Name = "因为SRS资源分配失败而导致RRC连接建立失败的次数 (无)")]
        public int RrcFailSrsAssignment { get; set; }

        [CsvColumn(Name = "因为PUCCH资源分配失败而导致RRC连接建立失败的次数 (无)")]
        public int RrcFailPucchAssignment { get; set; }

        [CsvColumn(Name = "流控导致的发送RRC Connection Reject消息次数 (无)")]
        public int RrcRejectFlowControl { get; set; }

        public static List<FlowHuaweiCsv> ReadFlowHuaweiCsvs(StreamReader reader)
        {
            return CsvContext.Read<FlowHuaweiCsv>(reader, CsvFileDescription.CommaDescription).ToList();
        }
    }

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

        [ExcelColumn("投诉类型")]
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

}
