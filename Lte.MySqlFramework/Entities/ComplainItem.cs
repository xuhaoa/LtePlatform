﻿using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;
using System;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(ComplainDto), typeof(ComplainExcel))]
    public class ComplainItem : Entity, IBeginDate, ITownId
    {
        public string SerialNumber { get; set; }

        public string SubscriberPhone { get; set; }
        
        public byte RepeatTimes { get; set; }

        [AutoMapPropertyResolve("ServiceType1", typeof(ComplainExcel), typeof(ComplainCategoryTransform))]
        [AutoMapPropertyResolve("ServiceCategoryDescription", typeof(ComplainDto), typeof(ComplainCategoryTransform))]
        public ComplainCategory ServiceCategory { get; set; }

        [AutoMapPropertyResolve("IsUrgentDescription", typeof(ComplainDto), typeof(YesToBoolTransform))]
        public bool IsUrgent { get; set; }

        public string SubscriberInfo { get; set; }

        public string ContactPhone { get; set; }

        public string ContactPerson { get; set; }

        public string ContactAddress { get; set; }

        public string ManagerInfo { get; set; }

        public string ComplainContents { get; set; }

        public DateTime BeginDate { get; set; }

        public DateTime Deadline { get; set; }

        public string CurrentProcessor { get; set; }

        public DateTime ProcessTime { get; set; }
        
        public string OssSerialNumber { get; set; }

        public int TownId { get; set; }

        [AutoMapPropertyResolve("ComplainSourceDescription", typeof(ComplainDto), typeof(ComplainSourceTransform))]
        [AutoMapPropertyResolve("SourceDescription", typeof(ComplainExcel), typeof(ComplainSourceTransform))]
        public ComplainSource ComplainSource { get; set; }

        public DateTime BeginTime { get; set; }

        public string City { get; set; }

        public string District { get; set; }

        public string RoadName { get; set; }
        
        public string BuildingName { get; set; }

        public string CauseLocation { get; set; }

        public string PreProcessContents { get; set; }

        [AutoMapPropertyResolve("Subscriber4G", typeof(ComplainExcel), typeof(YesToBoolTransform))]
        [AutoMapPropertyResolve("IsSubscriber4GDescription", typeof(ComplainDto), typeof(YesToBoolTransform))]
        public bool IsSubscriber4G { get; set; }

        public double Longtitute { get; set; }
        
        public double Lattitute { get; set; }

        [AutoMapPropertyResolve("ComplainReasonDescription", typeof(ComplainDto), typeof(ComplainReasonTransform))]
        [AutoMapPropertyResolve("ReasonFirst", typeof(ComplainExcel), typeof(ComplainReasonTransform))]
        public ComplainReason ComplainReason { get; set; }

        [AutoMapPropertyResolve("ComplainSubReasonDescription", typeof(ComplainDto), typeof(ComplainSubReasonTransform))]
        [AutoMapPropertyResolve("ReasonSecond", typeof(ComplainExcel), typeof(ComplainSubReasonTransform))]
        public ComplainSubReason ComplainSubReason { get; set; }

        public string Grid { get; set; }
        
        [AutoMapPropertyResolve("NetworkTypeDescription", typeof(ComplainDto), typeof(NetworkTypeTransform))]
        [AutoMapPropertyResolve("NetworkDescription", typeof(ComplainExcel), typeof(NetworkTypeTransform))]
        public NetworkType NetworkType { get; set; }

        public string SitePosition { get; set; }

        [AutoMapPropertyResolve("IsIndoorDescription", typeof(ComplainDto), typeof(IndoorBoolTransform))]
        public bool IsIndoor { get; set; }

        public string IndoorDescription { get; set; }

        [AutoMapPropertyResolve("ComplainSceneDescription", typeof(ComplainDto), typeof(ComplainSceneTransform))]
        [AutoMapPropertyResolve("Scene", typeof(ComplainExcel), typeof(ComplainSceneTransform))]
        public ComplainScene ComplainScene { get; set; }

        [AutoMapPropertyResolve("ComplainCategoryDescription", typeof(ComplainDto), typeof(ComplainCategoryTransform))]
        [AutoMapPropertyResolve("CategoryDescription", typeof(ComplainExcel), typeof(ComplainCategoryTransform))]
        public ComplainCategory ComplainCategory { get; set; }

        [AutoMapPropertyResolve("CurrentStateDescription", typeof(ComplainDto), typeof(ComplainStateTransform))]
        public ComplainState ComplainState { get; set; }
    }

    [AutoMapFrom(typeof(ComplainItem))]
    public class ComplainDto : IStateChange, IBeginDate, ICityDistrictTown
    {
        public string SerialNumber { get; set; }

        public string SubscriberPhone { get; set; }

        public byte RepeatTimes { get; set; }

        [AutoMapPropertyResolve("ServiceCategory", typeof(ComplainItem), typeof(ComplainCategoryDescriptionTransform))]
        public string ServiceCategoryDescription { get; set; }

        [AutoMapPropertyResolve("IsUrgent", typeof(ComplainItem), typeof(YesNoTransform))]
        public string IsUrgentDescription { get; set; }

        public string SubscriberInfo { get; set; }

        public string ContactPhone { get; set; }

        public string ContactPerson { get; set; }

        public string ContactAddress { get; set; }

        public string ManagerInfo { get; set; }

        public string ComplainContents { get; set; }

        public DateTime BeginDate { get; set; }

        public DateTime Deadline { get; set; }

        public string CurrentProcessor { get; set; }

        public DateTime ProcessTime { get; set; }

        public string OssSerialNumber { get; set; }

        [AutoMapPropertyResolve("ComplainSource", typeof(ComplainItem), typeof(ComplainSourceDescriptionTransform))]
        public string ComplainSourceDescription { get; set; }

        public DateTime BeginTime { get; set; }

        public string City { get; set; }

        public string District { get; set; }

        public string Town { get; set; }

        public string RoadName { get; set; }

        public string BuildingName { get; set; }

        public string CauseLocation { get; set; }

        public string PreProcessContents { get; set; }
        
        [AutoMapPropertyResolve("IsSubscriber4G", typeof(ComplainItem), typeof(YesNoTransform))]
        public string IsSubscriber4GDescription { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        [AutoMapPropertyResolve("ComplainReason", typeof(ComplainItem), typeof(ComplainReasonDescriptionTransform))]
        public string ComplainReasonDescription { get; set; }

        [AutoMapPropertyResolve("ComplainSubReason", typeof(ComplainItem), typeof(ComplainSubReasonDescriptionTransform))]
        public string ComplainSubReasonDescription { get; set; }

        public string Grid { get; set; }

        [AutoMapPropertyResolve("NetworkType", typeof(ComplainItem), typeof(NetworkTypeDescritionTransform))]
        public string NetworkTypeDescription { get; set; }

        public string SitePosition { get; set; }

        [AutoMapPropertyResolve("IsIndoor", typeof(ComplainItem), typeof(IndoorDescriptionTransform))]
        public string IsIndoorDescription { get; set; }

        [AutoMapPropertyResolve("ComplainScene", typeof(ComplainItem), typeof(ComplainSceneDescriptionTransform))]
        public string ComplainSceneDescription { get; set; }

        [AutoMapPropertyResolve("ComplainCategory", typeof(ComplainItem), typeof(ComplainCategoryDescriptionTransform))]
        public string ComplainCategoryDescription { get; set; }

        [AutoMapPropertyResolve("ComplainState", typeof(ComplainItem), typeof(ComplainStateDescriptionTransform))]
        public string CurrentStateDescription { get; set; }

        public string NextStateDescription
        {
            get
            {
                var nextState = CurrentStateDescription.GetNextStateDescription(ComplainState.Archive);
                return nextState == null ? null : ((ComplainState)nextState).GetEnumDescription();
            }
        }
    }
    
    [AutoMapFrom(typeof(ComplainItem))]
    [TypeDoc("抱怨信息（后端投诉工单）与经纬度校正相关信息视图")]
    public class ComplainPositionDto
    {
        [MemberDoc("投诉单编号")]
        public string SerialNumber { get; set; }

        [MemberDoc("城市")]
        public string City { get; set; }

        [MemberDoc("区域")]
        public string District { get; set; }
        
        [MemberDoc("镇区")]
        public string Town { get; set; }

        [MemberDoc("道路名称，作为匹配地理位置的第一重要信息")]
        public string RoadName { get; set; }

        [MemberDoc("楼宇名称，作为匹配地理位置的第二重要信息")]
        public string BuildingName { get; set; }

        [MemberDoc("经度，需要匹配的经度，通过百度地图API获取")]
        public double Longtitute { get; set; }

        [MemberDoc("纬度，需要匹配的经度，通过百度地图API获取")]
        public double Lattitute { get; set; }

        [MemberDoc("站点位置，作为匹配地理位置的第三重要信息")]
        public string SitePosition { get; set; }

        [MemberDoc("投诉内容，作为匹配地理位置的次重要信息")]
        public string ComplainContents { get; set; }

        [MemberDoc("联系地址，作为匹配地理位置的次要信息，因为用户开户地址通常与投诉地址不是同一地址")]
        public string ContactAddress { get; set; }
    }

    [AutoMapFrom(typeof(VipDemandExcel), typeof(VipDemandDto))]
    public class VipDemand : Entity
    {
        public string SerialNumber { get; set; }

        [AutoMapPropertyResolve("DemandLevelDescription", typeof(VipDemandExcel), typeof(DemandLevelTransform))]
        [AutoMapPropertyResolve("DemandLevelDescription", typeof(VipDemandDto), typeof(DemandLevelTransform))]
        public DemandLevel DemandLevel { get; set; }

        public int TownId { get; set; }

        public string ProjectName { get; set; }

        [AutoMapPropertyResolve("NetworkTypeDescription", typeof(VipDemandExcel), typeof(NetworkTypeTransform))]
        [AutoMapPropertyResolve("NetworkTypeDescription", typeof(VipDemandDto), typeof(NetworkTypeTransform))]
        public NetworkType NetworkType { get; set; }

        [AutoMapPropertyResolve("MarketThemeDescription", typeof(VipDemandDto), typeof(MarketThemeTransform))]
        public MarketTheme MarketTheme { get; set; }

        public string Department { get; set; }

        public string ContactPerson { get; set; }

        public string PhoneNumber { get; set; }

        public string Area { get; set; }

        public DateTime BeginDate { get; set; }

        public DateTime PlanDate { get; set; }

        public string ProjectContents { get; set; }

        public string SustainPerson { get; set; }

        [AutoMapPropertyResolve("", typeof(VipDemandDto), typeof(DateTimeNowTransform))]
        public DateTime? FinishTime { get; set; }

        public int SubscriberGotten { get; set; }

        public string FinishResults { get; set; }

        public string ProcessInfo { get; set; }

        [AutoMapPropertyResolve("CurrentStateDescription", typeof(VipDemandDto), typeof(VipStateTransform))]
        public VipState VipState { get; set; }
    }

    [AutoMapFrom(typeof(VipDemand))]
    [TypeDoc("VIP需求信息数据单元")]
    public class VipDemandDto : IDistrictTown, ITownId, IConstructDto<VipProcessDto>, IStateChange, IBeginDate
    {
        public string SerialNumber { get; set; }

        [AutoMapPropertyResolve("DemandLevel", typeof(VipDemand), typeof(DemandLevelDescriptionTransform))]
        public string DemandLevelDescription { get; set; }

        public int TownId { get; set; }

        public string District { get; set; }

        public string Town { get; set; }

        public string ProjectName { get; set; }

        [AutoMapPropertyResolve("NetworkType", typeof(VipDemand), typeof(NetworkTypeDescritionTransform))]
        public string NetworkTypeDescription { get; set; }

        [AutoMapPropertyResolve("MarketTheme", typeof(VipDemand), typeof(MarketThemeDescriptionTransform))]
        public string MarketThemeDescription { get; set; }

        public string Department { get; set; }

        public string ContactPerson { get; set; }

        public string PhoneNumber { get; set; }

        public string Area { get; set; }

        public DateTime BeginDate { get; set; }

        public DateTime PlanDate { get; set; }

        public string ProjectContents { get; set; }

        public string SustainPerson { get; set; }

        [AutoMapPropertyResolve("FinishTime", typeof(VipDemand), typeof(NotNullTransform))]
        public bool IsFinished { get; set; }

        public bool IsInfoComplete => !string.IsNullOrEmpty(Area) && !string.IsNullOrEmpty(ContactPerson) &&
                                      !string.IsNullOrEmpty(PhoneNumber) && TownId > 0;

        public int SubscriberGotten { get; set; }

        public string FinishResults { get; set; }

        public string ProcessInfo { get; set; }

        [AutoMapPropertyResolve("VipState", typeof(VipDemand), typeof(VipStateDescriptionTransform))]
        public string CurrentStateDescription { get; set; }

        public string NextStateDescription
        {
            get
            {
                var nextState = CurrentStateDescription.GetNextStateDescription(VipState.Conclusion);
                return nextState == null ? null : ((VipState)nextState).GetEnumDescription();
            }
        }

        public VipProcessDto Construct(string userName)
        {
            return new VipProcessDto
            {
                SerialNumber = SerialNumber,
                ContactPerson = userName,
                BeginTime = DateTime.Now,
                VipStateDescription = CurrentStateDescription
            };
        }
    }

    [AutoMapFrom(typeof(VipProcessDto))]
    public class VipProcess : Entity
    {
        public string SerialNumber { get; set; }

        [AutoMapPropertyResolve("VipStateDescription", typeof(VipProcessDto), typeof(VipStateTransform))]
        public VipState VipState { get; set; }

        public DateTime BeginTime { get; set; }

        public string BeginInfo { get; set; }

        public DateTime ProcessTime { get; set; }

        public string ProcessPerson { get; set; }

        public string ProcessInfo { get; set; }

        public string AttachFilePath { get; set; }

        public string ContactPerson { get; set; }
    }

    [AutoMapFrom(typeof(VipProcess))]
    public class VipProcessDto
    {
        public string SerialNumber { get; set; }

        [AutoMapPropertyResolve("VipState", typeof(VipProcess), typeof(VipStateDescriptionTransform))]
        public string VipStateDescription { get; set; }

        public DateTime BeginTime { get; set; }

        public string BeginInfo { get; set; }

        public DateTime ProcessTime { get; set; }

        public string ProcessPerson { get; set; }

        public string ProcessInfo { get; set; }

        public string AttachFilePath { get; set; }

        public string ContactPerson { get; set; }
    }
}
