using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;
using System;
using Lte.Domain.Common.Geo;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(ComplainDto), typeof(ComplainExcel))]
    public class ComplainItem : Entity
    {
        public string SerialNumber { get; set; }

        public string SubscriberPhone { get; set; }

        public byte RepeatTimes { get; set; }

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
    public class ComplainDto : IStateChange
    {
        public string SerialNumber { get; set; }

        [AutoMapPropertyResolve("ComplainSource", typeof(ComplainItem), typeof(ComplainSourceDescriptionTransform))]
        public string ComplainSourceDescription { get; set; }

        public DateTime BeginTime { get; set; }

        public string City { get; set; }

        public string District { get; set; }

        public string Town { get; set; }

        public string RoadName { get; set; }

        public string BuildingName { get; set; }

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
    public class ComplainPositionDto
    {
        public string SerialNumber { get; set; }

        public string City { get; set; }

        public string District { get; set; }
        
        public string Town { get; set; }

        public string RoadName { get; set; }

        public string BuildingName { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string SitePosition { get; set; }
    }

    public class ComplainExcel
    {
        [ExcelColumn("工单编号")]
        public string SerialNumber { get; set; }

        [ExcelColumn("所属区域")]
        public string District { get; set; }
        
        [ExcelColumn("产品类型")]
        public string ProductType { get; set; }

        [ExcelColumn("服务类别")]
        public string ServiceType { get; set; }

        [ExcelColumn("工单状态")]
        public string StateDescription { get; set; }

        [ExcelColumn("客户电话")]
        public string SubscriberPhone { get; set; }

        [ExcelColumn("重复次数")]
        public byte RepeatTimes { get; set; }

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
        public string ReasonFirst { get; set; }

        [ExcelColumn("原因定性二级")]
        public string ReasonSecond { get; set; }

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
    public class VipDemandDto : IDistrictTown, ITownId, IConstructDto<VipProcessDto>, IStateChange
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

    public class VipDemandExcel
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
