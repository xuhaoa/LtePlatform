using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(ComplainDto))]
    public class ComplainItem : Entity
    {
        public string SerialNumber { get; set; }

        public int TownId { get; set; }

        [AutoMapPropertyResolve("ComplainSourceDescription", typeof(ComplainDto), typeof(ComplainSourceTransform))]
        public ComplainSource ComplainSource { get; set; }

        public DateTime BeginTime { get; set; }

        public string City { get; set; }

        public string District { get; set; }

        public string RoadName { get; set; }
        
        public string BuildingName { get; set; }

        public double Longtitute { get; set; }
        
        public double Lattitute { get; set; }

        [AutoMapPropertyResolve("ComplainReasonDescription", typeof(ComplainDto), typeof(ComplainReasonTransform))]
        public ComplainReason ComplainReason { get; set; }

        [AutoMapPropertyResolve("ComplainSubReasonDescription", typeof(ComplainDto), typeof(ComplainSubReasonTransform))]
        public ComplainSubReason ComplainSubReason { get; set; }

        public string Grid { get; set; }

        [AutoMapPropertyResolve("NetworkTypeDescription", typeof(ComplainDto), typeof(NetworkTypeTransform))]
        public NetworkType NetworkType { get; set; }

        public string SitePosition { get; set; }

        [AutoMapPropertyResolve("IsIndoorDescription", typeof(ComplainDto), typeof(IndoorBoolTransform))]
        public bool IsIndoor { get; set; }

        [AutoMapPropertyResolve("ComplainSceneDescription", typeof(ComplainDto), typeof(ComplainSceneTransform))]
        public ComplainScene ComplainScene { get; set; }

        [AutoMapPropertyResolve("ComplainCategoryDescription", typeof(ComplainDto), typeof(ComplainCategoryTransform))]
        public ComplainCategory ComplainCategory { get; set; }

        [AutoMapPropertyResolve("CurrentStateDescription", typeof(ComplainDto), typeof(ComplainStateTransform))]
        public ComplainState ComplainState { get; set; }
    }

    [AutoMapFrom(typeof(ComplainItem))]
    public class ComplainDto : IConstructDto<ComplainProcessDto>, IStateChange
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

        public ComplainProcessDto Construct(string userName)
        {
            return new ComplainProcessDto
            {
                SerialNumber = SerialNumber,
                ContactPerson = userName,
                BeginTime = DateTime.Now,
                ComplainStateDescription = CurrentStateDescription
            };
        }
    }

    [AutoMapFrom(typeof(ComplainProcessDto))]
    public class ComplainProcess : Entity
    {
        public string SerialNumber { get; set; }

        [AutoMapPropertyResolve("ComplainStateDescription", typeof(ComplainProcessDto), typeof(ComplainStateTransform))]
        public ComplainState ComplainState { get; set; }

        public DateTime BeginTime { get; set; }

        public string BeginInfo { get; set; }

        public DateTime ProcessTime { get; set; }

        public string ProcessPerson { get; set; }

        public string ProcessInfo { get; set; }

        public string AttachFilePath { get; set; }

        public string ContactPerson { get; set; }
    }

    [AutoMapFrom(typeof(ComplainProcess))]
    public class ComplainProcessDto
    {
        public string SerialNumber { get; set; }

        [AutoMapPropertyResolve("ComplainState", typeof(ComplainProcess), typeof(ComplainStateDescriptionTransform))]
        public string ComplainStateDescription { get; set; }

        public DateTime BeginTime { get; set; }

        public string BeginInfo { get; set; }

        public DateTime ProcessTime { get; set; }

        public string ProcessPerson { get; set; }

        public string ProcessInfo { get; set; }

        public string AttachFilePath { get; set; }

        public string ContactPerson { get; set; }
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

        [ExcelColumn("业务类型")]
        public string NetworkDescription { get; set; }

        [ExcelColumn("相关站点名称")]
        public string Site { get; set; }

        [ExcelColumn("问题点或区域描述")]
        public string Position { get; set; }

        [ExcelColumn("室内室外")]
        public string IndoorDescription { get; set; }

        [ExcelColumn("使用场合")]
        public string Scene { get; set; }

        [ExcelColumn("表象大类")]
        public string CategoryDescription { get; set; }

        public int TownId { get; set; }
    }
}
