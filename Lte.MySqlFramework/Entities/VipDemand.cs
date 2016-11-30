using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;
using System;

namespace Lte.MySqlFramework.Entities
{
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
