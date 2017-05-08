﻿using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;
using System;
using Abp.EntityFramework.Dependency;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common.Geo;
using Lte.Domain.LinqToCsv;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(OnlineSustainExcel), typeof(OnlineSustainDto))]
    public class OnlineSustain: Entity, ITownId
    {
        public DateTime BeginDate { get; set; }

        public int TownId { get; set; }

        public string ContactPhone { get; set; }
        
        public int StaffId { get; set; }
        
        public string Phenomenon { get; set; }

        public string SerialNumber { get; set; }

        public string DutyStaff { get; set; }

        public string ComplainNumber { get; set; }

        [AutoMapPropertyResolve("ComplainCategoryDescription", typeof(OnlineSustainExcel), typeof(ComplainCategoryTransform))]
        [AutoMapPropertyResolve("ComplainCategoryDescription", typeof(OnlineSustainDto), typeof(ComplainCategoryTransform))]
        public ComplainCategory ComplainCategory { get; set; }

        [AutoMapPropertyResolve("FirstReasonClass", typeof(OnlineSustainExcel), typeof(ComplainSourceTransform))]
        [AutoMapPropertyResolve("ComplainSourceDescription", typeof(OnlineSustainDto), typeof(ComplainSourceTransform))]
        public ComplainSource ComplainSource { get; set; }

        [AutoMapPropertyResolve("SecondReasonClass", typeof(OnlineSustainExcel), typeof(ComplainReasonTransform))]
        [AutoMapPropertyResolve("ComplainReasonDescription", typeof(OnlineSustainDto), typeof(ComplainReasonTransform))]
        public ComplainReason ComplainReason { get; set; }

        [AutoMapPropertyResolve("ThirdReasonClass", typeof(OnlineSustainExcel), typeof(ComplainSubReasonTransform))]
        [AutoMapPropertyResolve("ComplainSubReasonDescription", typeof(OnlineSustainDto), typeof(ComplainSubReasonTransform))]
        public ComplainSubReason ComplainSubReason { get; set; }

        public string Address { get; set; }

        public string Issue { get; set; }

        public string SpecialResponse { get; set; }

        [AutoMapPropertyResolve("PreProcessString", typeof(OnlineSustainExcel), typeof(YesToBoolTransform))]
        [AutoMapPropertyResolve("IsPreProcessedDescription", typeof(OnlineSustainDto), typeof(YesToBoolTransform))]
        public bool IsPreProcessed { get; set; }

        public string WorkItemNumber { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }
        
        public string FeedbackInfo { get; set; }

        public string Site { get; set; }
    }

    [AutoMapFrom(typeof(OnlineSustain))]
    public class OnlineSustainDto
    {
        public DateTime BeginDate { get; set; }

        public int TownId { get; set; }

        public string City { get; set; }

        public string District { get; set; }

        public string Town { get; set; }

        public string ContactPhone { get; set; }

        public int StaffId { get; set; }

        public string Phenomenon { get; set; }

        public string SerialNumber { get; set; }

        public string DutyStaff { get; set; }

        [AutoMapPropertyResolve("ComplainCategory", typeof(OnlineSustain), typeof(ComplainCategoryDescriptionTransform))]
        public string ComplainCategoryDescription { get; set; }

        [AutoMapPropertyResolve("ComplainSource", typeof(OnlineSustain), typeof(ComplainSourceDescriptionTransform))]
        public string ComplainSourceDescription { get; set; }

        [AutoMapPropertyResolve("ComplainReason", typeof(OnlineSustain), typeof(ComplainReasonDescriptionTransform))]
        public string ComplainReasonDescription { get; set; }

        [AutoMapPropertyResolve("ComplainSubReason", typeof(OnlineSustain), typeof(ComplainSubReasonDescriptionTransform))]
        public string ComplainSubReasonDescription { get; set; }

        public string Address { get; set; }

        public string Issue { get; set; }

        public string SpecialResponse { get; set; }

        [AutoMapPropertyResolve("IsPreProcessed", typeof(OnlineSustain), typeof(YesNoTransform))]
        public string IsPreProcessedDescription { get; set; }

        public string WorkItemNumber { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string FollowInfo { get; set; }

        public string FeedbackInfo { get; set; }

        public string Site { get; set; }
    }
    
    public class OnlineSustainExcel
    {
        [ExcelColumn("统计日期")]
        public DateTime BeginDate { get; set; }

        [ExcelColumn("投诉单号")]
        public string SerialNumber { get; set; }
        
        [ExcelColumn("是否经过预处理")]
        public string PreProcessString { get; set; }

        [ExcelColumn("10000号人名/工号")]
        public int StaffId { get; set; }

        [ExcelColumn("派单原因")]
        public string WorkItemNumber { get; set; }

        [ExcelColumn("申告号码")]
        public string ComplainNumber { get; set; }

        [ExcelColumn("联系电话")]
        public string ContactPhone { get; set; }

        [ExcelColumn("投诉地点")]
        public string Site { get; set; }

        [ExcelColumn("投诉内容")]
        public string Phenomenon { get; set; }

        [ExcelColumn("申告一级原因")]
        public string ComplainReason { get; set; }

        [ExcelColumn("投诉类型")]
        public string ComplainCategoryDescription { get; set; }

        [ExcelColumn("申告级别")]
        public string Issue { get; set; }
        
        [ExcelColumn("所属区域")]
        public string District { get; set; }

        [ExcelColumn("镇区")]
        public string Town { get; set; }

        [ExcelColumn("地貌类型")]//Process--
        public string AreaTypeDescription { get; set; }

        [ExcelColumn("申告来源")]
        public string ComplainSourceDescription { get; set; }

        [ExcelColumn("信息点类型1")]//Process--
        public string InfoType1 { get; set; }

        [ExcelColumn("信息点类型2")]//Process--
        public string InfoType2 { get; set; }

        [ExcelColumn("信息点类型3")]//Process--
        public string InfoType3 { get; set; }

        [ExcelColumn("原因分析")]//Process--
        public string ComplainCauseDescription { get; set; }

        [ExcelColumn("处理过程及建议")]//Process--
        public string ProcessSuggestion { get; set; }
        
        [ExcelColumn("处理日期")]//Process--
        public DateTime? ProcessDate { get; set; }

        [ExcelColumn("测试地点")]
        public string Address { get; set; }

        [ExcelColumn("经度", TransformEnum.DoubleEmptyZero, 0)]
        public double Longtitute { get; set; }

        [ExcelColumn("纬度", TransformEnum.DoubleEmptyZero, 0)]
        public double Lattitute { get; set; }

        [ExcelColumn("接收电平")]//Process--
        public short? ReceiveLevel { get; set; }

        [ExcelColumn("发射电平")]//Process--
        public short? TransmitLevel { get; set; }

        [ExcelColumn("最大PN")]//Process--
        public short? Pn { get; set; }

        [ExcelColumn("ECIO")]//Process--
        public double? EcIo { get; set; }

        [ExcelColumn("主要影响基站（名称）")]//Process--
        public string BtsName { get; set; }

        [ExcelColumn("主要影响基站（BSC号）")]//Process--
        public byte? BscId { get; set; }

        [ExcelColumn("主要影响基站（基站号）")]//Process--
        public int? BtsId { get; set; }

        [ExcelColumn("覆盖等级")]//Process--
        public byte? CoverageLevel { get; set; }

        [ExcelColumn("覆盖类型")]//Process--
        public string CoverageTypeDescription { get; set; }

        [ExcelColumn("用户反馈情况")]
        public string FeedbackInfo { get; set; }

        [ExcelColumn("处理/测试人")]//Process--
        public string ProcessPerson { get; set; }

        [ExcelColumn("解决否")]//Process--
        public string ResolveDescription { get; set; }

        [ExcelColumn("解决方案（分类）")]//Process--
        public string ResolveScheme { get; set; }

        [ExcelColumn("原因定位")]//Process--
        public string ResolveCauseDescription { get; set; }

        [ExcelColumn("已规划基站")]//Process--
        public string PlanSite { get; set; }

        [ExcelColumn("最终解决时间")]//Process--
        public DateTime? ResolveDate { get; set; }

        public string[] ReasonGroups => string.IsNullOrEmpty(ComplainReason)? new string[1]:  ComplainReason.GetSplittedFields('-');

        public string FirstReasonClass => ReasonGroups.Length > 0 ? ReasonGroups[0] : "其他";

        public string SecondReasonClass => ReasonGroups.Length > 1 ? ReasonGroups[1] : "其他";

        public string ThirdReasonClass => ReasonGroups.Length > 2 ? ReasonGroups[2] : "其他";
    }

    [AutoMapFrom(typeof(OnlineSustainExcel))]
    public class ComplainProcess : Entity
    {
        public string SerialNumber { get; set; }
        
        [AutoMapPropertyResolve("AreaTypeDescription", typeof(OnlineSustainExcel), typeof(ComplainSceneTransform))]
        public ComplainScene ComplainScene { get; set; }

        [AutoMapPropertyResolve("InfoType1", typeof(OnlineSustainExcel), typeof(CustomerTypeTransform))]
        public CustomerType CustomerType1 { get; set; }

        [AutoMapPropertyResolve("InfoType2", typeof(OnlineSustainExcel), typeof(CustomerTypeTransform))]
        public CustomerType CustomerType2 { get; set; }

        [AutoMapPropertyResolve("InfoType3", typeof(OnlineSustainExcel), typeof(CustomerTypeTransform))]
        public CustomerType CustomerType3 { get; set; }

        public string ProcessSuggestion { get; set; }

        public DateTime BeginDate { get; set; }

        public DateTime? ProcessDate { get; set; }

        public short? ReceiveLevel { get; set; }
        
        public short? TransmitLevel { get; set; }
        
        public short? Pn { get; set; }
        
        public double? EcIo { get; set; }
        
        public string BtsName { get; set; }
        
        public byte? BscId { get; set; }
        
        public int? BtsId { get; set; }

        public byte? CoverageLevel { get; set; }

        [AutoMapPropertyResolve("CoverageTypeDescription", typeof(OnlineSustainExcel), typeof(ComplainCategoryTransform))]
        public ComplainCategory ComplainCategory { get; set; }

        public string ProcessPerson { get; set; }
        
        [AutoMapPropertyResolve("ResolveDescription", typeof(OnlineSustainExcel), typeof(YesToBoolTransform))]
        public bool IsResolved { get; set; }
        
        public string ResolveScheme { get; set; }
        
        public string ResolveCauseDescription { get; set; }
        
        public string PlanSite { get; set; }
        
        public DateTime? ResolveDate { get; set; }
    }

    [AutoMapFrom(typeof(EmergencyCommunicationDto))]
    public class EmergencyCommunication : Entity
    {
        [AutoMapPropertyResolve("DemandLevelDescription", typeof(EmergencyCommunicationDto), typeof(DemandLevelTransform))]
        public DemandLevel DemandLevel { get; set; }

        public int TownId { get; set; }

        public string ProjectName { get; set; }

        public int ExpectedPeople { get; set; }

        public DateTime BeginDate { get; set; }

        public DateTime EndDate { get; set; }

        [AutoMapPropertyResolve("VehicularTypeDescription", typeof(EmergencyCommunicationDto), typeof(VehicularTypeTransform))]
        public VehicleType VehicleType { get; set; }

        public byte Vehicles { get; set; }

        public string TransmitFunction { get; set; }

        public string ElectricSupply { get; set; }

        public string Area { get; set; }

        public string Department { get; set; }

        public string ContactPerson { get; set; }

        public string Description { get; set; }

        [AutoMapPropertyResolve("CurrentStateDescription", typeof(EmergencyCommunicationDto), typeof(EmergencyStateTransform))]
        public EmergencyState EmergencyState { get; set; }
    }

    [AutoMapFrom(typeof(EmergencyCommunication))]
    [TypeDoc("应急通信需求记录")]
    public class EmergencyCommunicationDto : IDistrictTown, ITownId, IConstructDto<EmergencyProcessDto>, IStateChange
    {
        [MemberDoc("记录编号")]
        public int Id { get; set; }

        [AutoMapPropertyResolve("DemandLevel", typeof(EmergencyCommunication), typeof(DemandLevelDescriptionTransform))]
        [MemberDoc("需求等级")]
        public string DemandLevelDescription { get; set; }

        [MemberDoc("需求所在区域")]
        public string District { get; set; }

        [MemberDoc("需求所在镇区")]
        public string Town { get; set; }

        [MemberDoc("镇区编号")]
        public int TownId { get; set; }

        [MemberDoc("项目名称")]
        public string ProjectName { get; set; }

        [MemberDoc("预计人数")]
        public int ExpectedPeople { get; set; }

        [MemberDoc("开始日期")]
        public DateTime BeginDate { get; set; }

        [MemberDoc("结束日期")]
        public DateTime EndDate { get; set; }

        [AutoMapPropertyResolve("VehicleType", typeof(EmergencyCommunication), typeof(VehicularTypeDescriptionTransform))]
        [MemberDoc("应急车类型")]
        public string VehicularTypeDescription { get; set; }

        [MemberDoc("应急车数量")]
        public byte Vehicles { get; set; }

        [MemberDoc("传输方式")]
        public string TransmitFunction { get; set; }

        [MemberDoc("供电方式")]
        public string ElectricSupply { get; set; }

        [MemberDoc("服务区域")]
        public string Area { get; set; }

        [MemberDoc("需求部门")]
        public string Department { get; set; }

        [AutoMapPropertyResolve("ContactPerson", typeof(EmergencyCommunication), typeof(FirstLittleBracketContentsTransform))]
        [MemberDoc("联系人")]
        public string Person { get; set; }

        [AutoMapPropertyResolve("ContactPerson", typeof(EmergencyCommunication), typeof(SecondLittleBracketContentsTransform))]
        [MemberDoc("联系电话")]
        public string Phone { get; set; }

        [MemberDoc("联系信息")]
        public string ContactPerson => Person + "(" + Phone + ")";

        [AutoMapPropertyResolve("Description", typeof(EmergencyCommunication), typeof(FirstMiddleBracketContentsTransform))]
        [MemberDoc("通信车位置")]
        public string VehicleLocation { get; set; }

        [AutoMapPropertyResolve("Description", typeof(EmergencyCommunication), typeof(SecondMiddleBracketContentsTransform))]
        [MemberDoc("其他描述")]
        public string OtherDescription { get; set; }

        [MemberDoc("主要信息")]
        public string Description => "[" + VehicleLocation + "]" + OtherDescription;

        [AutoMapPropertyResolve("EmergencyState", typeof(EmergencyCommunication), typeof(EmergencyStateDescriptionTransform))]
        [MemberDoc("当前状态")]
        public string CurrentStateDescription { get; set; }

        [MemberDoc("下一步状态")]
        public string NextStateDescription
        {
            get
            {
                var nextState = CurrentStateDescription.GetNextStateDescription(EmergencyState.Finish);
                return nextState == null ? null : ((EmergencyState)nextState).GetEnumDescription();
            }
        }

        public EmergencyProcessDto Construct(string userName)
        {
            return new EmergencyProcessDto
            {
                EmergencyId = Id,
                ProcessPerson = userName,
                ProcessTime = DateTime.Now,
                ProcessStateDescription = CurrentStateDescription
            };
        }
    }

    [AutoMapFrom(typeof(EmergencyProcessDto))]
    public class EmergencyProcess : Entity
    {
        public int EmergencyId { get; set; }

        [AutoMapPropertyResolve("ProcessStateDescription", typeof(EmergencyProcessDto), typeof(EmergencyStateTransform))]
        public EmergencyState ProcessState { get; set; }

        public DateTime ProcessTime { get; set; }

        public string ProcessPerson { get; set; }

        public string ProcessInfo { get; set; }

        public string AttachFilePath { get; set; }

        public string ContactPerson { get; set; }
    }

    [AutoMapFrom(typeof(EmergencyProcess))]
    [TypeDoc("应急需求流程处理信息")]
    public class EmergencyProcessDto
    {
        [MemberDoc("应急需求编号")]
        public int EmergencyId { get; set; }

        [AutoMapPropertyResolve("ProcessState", typeof(EmergencyProcess), typeof(EmergencyStateDescriptionTransform))]
        [MemberDoc("处理状态")]
        public string ProcessStateDescription { get; set; }

        [MemberDoc("处理时间")]
        public DateTime ProcessTime { get; set; }

        [MemberDoc("处理人")]
        public string ProcessPerson { get; set; }

        [MemberDoc("处理信息")]
        public string ProcessInfo { get; set; }

        [MemberDoc("附件文件路径")]
        public string AttachFilePath { get; set; }

        [MemberDoc("联系人")]
        public string ContactPerson { get; set; }
    }

    public class EmergencyFiberWorkItem : Entity
    {
        public int EmergencyId { get; set; }

        public string WorkItemNumber { get; set; }

        public string Person { get; set; }

        public DateTime BeginDate { get; set; }

        public DateTime? FinishDate { get; set; }
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

    [AutoMapFrom(typeof(WebBrowsingCsv))]
    public class WebBrowsing : Entity, IGeoPoint<double>, IStatDate
    {
        public string Imsi { get; set; }

        public string Meid { get; set; }
        
        public string PhoneType { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        [AutoMapPropertyResolve("PageSurfTime", typeof(WebBrowsingCsv))]
        public DateTime StatDate { get; set; }
        
        public string LocationDesc { get; set; }
        
        public string NetType { get; set; }
        
        public string Apn { get; set; }
        
        public string LteCi { get; set; }

        [AutoMapPropertyResolve("LteRsrpString", typeof(WebBrowsingCsv), typeof(StringToDoubleTransform))]
        public double LteRsrp { get; set; }

        [AutoMapPropertyResolve("LteSinrString", typeof(WebBrowsingCsv), typeof(StringToDoubleTransform))]
        public double LteSinr { get; set; }
        
        public string WebsiteName { get; set; }
        
        public string PageUrl { get; set; }
        
        public int FirstByteDelay { get; set; }
        
        public int PageOpenDelay { get; set; }
        
        public int DnsDelay { get; set; }

        [AutoMapPropertyResolve("ConnectionDelayString", typeof(WebBrowsingCsv), typeof(StringToIntTransform))]
        public int ConnectionDelay { get; set; }

        [AutoMapPropertyResolve("RequestDelayString", typeof(WebBrowsingCsv), typeof(StringToIntTransform))]
        public int RequestDelay { get; set; }

        [AutoMapPropertyResolve("ResponseDelayString", typeof(WebBrowsingCsv), typeof(StringToIntTransform))]
        public int ResponseDelay { get; set; }
        
        public double PageSize { get; set; }
        
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

    [AutoMapFrom(typeof(AppStreamingCsv))]
    public class AppSteam : Entity, IGeoPoint<double>, IStatDate
    {
        public string Imsi { get; set; }

        public string Meid { get; set; }

        public string PhoneType { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string LocationDesc { get; set; }

        public string NetType { get; set; }

        public string Apn { get; set; }

        public string LteCi { get; set; }

        [AutoMapPropertyResolve("LteRsrpString", typeof(AppStreamingCsv), typeof(StringToDoubleTransform))]
        public double LteRsrp { get; set; }

        [AutoMapPropertyResolve("LteSinrString", typeof(AppStreamingCsv), typeof(StringToDoubleTransform))]
        public double LteSinr { get; set; }
        
        public string VideoName { get; set; }
        
        public string VideoUrl { get; set; }

        [AutoMapPropertyResolve("VideoTestTime", typeof(AppStreamingCsv))]
        public DateTime StatDate { get; set; }
        
        public double VideoAvgSpeed { get; set; }
        
        public double VideoPeakSpeed { get; set; }
        
        public double TotalVideoSize { get; set; }
        
        public int BufferCounter { get; set; }

        [AutoMapPropertyResolve("VideoSizeString", typeof(AppStreamingCsv), typeof(StringToDoubleTransform))]
        public double VideoSize { get; set; }
    }
}
