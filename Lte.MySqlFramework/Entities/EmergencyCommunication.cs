using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;
using System;
using Lte.Domain.Regular.Attributes;

namespace Lte.MySqlFramework.Entities
{
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
                return nextState == null ? null : ((EmergencyState) nextState).GetEnumDescription();
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
}
