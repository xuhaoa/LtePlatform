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

        public int TownId { get; set; }

        [AutoMapPropertyResolve("ComplainSourceDescription", typeof(ComplainDto), typeof(ComplainSourceTransform))]
        [AutoMapPropertyResolve("SourceDescription", typeof(ComplainExcel), typeof(ComplainSourceTransform))]
        public ComplainSource ComplainSource { get; set; }

        public DateTime BeginTime { get; set; }

        public string City { get; set; }

        public string District { get; set; }

        public string RoadName { get; set; }
        
        public string BuildingName { get; set; }

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
        [AutoMapPropertyResolve("IndoorDescription", typeof(ComplainExcel), typeof(IndoorBoolTransform))]
        public bool IsIndoor { get; set; }

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

        [ExcelColumn("工单来源")]
        public string SourceDescription { get; set; }

        [ExcelColumn("受理时间")]
        public DateTime BeginTime { get; set; }

        [ExcelColumn("申告地")]
        public string City { get; set; }

        [ExcelColumn("区/县")]
        public string CandidateDistrict { get; set; }

        [ExcelColumn("路名")]
        public string RoadName { get; set; }

        [ExcelColumn("楼宇名称")]
        public string BuildingName { get; set; }

        [ExcelColumn("战略分群")]
        public string CustomerTypeDescription { get; set; }

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

        public string District
            =>
                string.IsNullOrEmpty(Grid)
                    ? CandidateDistrict
                    : (Grid.StartsWith("FS") ? Grid.Substring(2) : CandidateDistrict);

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
