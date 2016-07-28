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
    public class ComplainItem : Entity
    {
        public string SerialNumber { get; set; }

        public int TownId { get; set; }

        public ComplainSource ComplainSource { get; set; }

        public DateTime BeginTime { get; set; }

        public string City { get; set; }

        public string District { get; set; }

        public string RoadName { get; set; }
        
        public string BuildingName { get; set; }

        public double Longtitute { get; set; }
        
        public double Lattitute { get; set; }

        public ComplainReason ComplainReason { get; set; }

        public ComplainSubReason ComplainSubReason { get; set; }

        public string Grid { get; set; }

        public NetworkType NetworkType { get; set; }

        public string SitePosition { get; set; }

        public bool IsIndoor { get; set; }

        public ComplainScene ComplainScene { get; set; }

        public ComplainCategory ComplainCategory { get; set; }

        public ComplainState ComplainState { get; set; }
    }

    public class ComplainDto : IConstructDto<ComplainProcessDto>, IStateChange
    {
        public string SerialNumber { get; set; }

        public string ComplainSourceDescription { get; set; }

        public DateTime BeginTime { get; set; }

        public string City { get; set; }

        public string District { get; set; }

        public string Town { get; set; }

        public string RoadName { get; set; }

        public string BuildingName { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string ComplainReasonDescription { get; set; }

        public string ComplainSubReasonDescription { get; set; }

        public string Grid { get; set; }

        public string NetworkTypeDescription { get; set; }

        public string SitePosition { get; set; }

        public string IsIndoorDescription { get; set; }

        public string ComplainSceneDescription { get; set; }

        public string ComplainCategoryDescription { get; set; }

        public string CurrentStateDescription { get; set; }

        public string NextStateDescription
        {
            get
            {
                var nextState = CurrentStateDescription.GetNextStateDescription(EmergencyState.Finish);
                return nextState == null ? null : ((EmergencyState)nextState).GetEnumDescription();
            }
        }

        public ComplainProcessDto Construct(string userName)
        {
            return new ComplainProcessDto
            {
                SerialNumber = SerialNumber,
                ProcessPerson = userName,
                ProcessTime = DateTime.Now,
                ComplainStateDescription = CurrentStateDescription
            };
        }
    }

    public class ComplainProcess : Entity
    {
        public string SerialNumber { get; set; }

        public ComplainState ComplainState { get; set; }

        public DateTime BeginTime { get; set; }

        public string BeginInfo { get; set; }

        public DateTime ProcessTime { get; set; }

        public string ProcessPerson { get; set; }

        public string ProcessInfo { get; set; }

        public string AttachFilePath { get; set; }

        public string ContactPerson { get; set; }
    }

    public class ComplainProcessDto
    {
        public string SerialNumber { get; set; }

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
