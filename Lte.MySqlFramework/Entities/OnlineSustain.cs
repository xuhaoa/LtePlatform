using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;
using System;
using Lte.Domain.Common.Geo;

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
        
        public string FollowInfo { get; set; }
        
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

        [ExcelColumn("联系电话")]
        public string ContactPhone { get; set; }

        [ExcelColumn("10000号人名/工号")]
        public int StaffId { get; set; }

        [ExcelColumn("投诉内容")]
        public string Phenomenon { get; set; }

        [ExcelColumn("投诉单号")]
        public string SerialNumber { get; set; }
        
        [ExcelColumn("投诉类型")]
        public string ComplainCategoryDescription { get; set; }

        [ExcelColumn("投诉地点")]
        public string Site { get; set; }

        [ExcelColumn("测试地点")]
        public string Address { get; set; }

        [ExcelColumn("申告级别")]
        public string Issue { get; set; }
        
        [ExcelColumn("派单原因")]
        public string WorkItemNumber { get; set; }

        [ExcelColumn("经度", TransformEnum.DoubleEmptyZero, 0)]
        public double Longtitute { get; set; }

        [ExcelColumn("纬度", TransformEnum.DoubleEmptyZero, 0)]
        public double Lattitute { get; set; }

        [ExcelColumn("后续跟进")]
        public string FollowInfo { get; set; }

        [ExcelColumn("现场人员反馈信息")]
        public string FeedbackInfo { get; set; }

        [ExcelColumn("申告一级原因")]
        public string ComplainReason { get; set; }

        [ExcelColumn("是否经过预处理")]
        public string PreProcessString { get; set; }

        [ExcelColumn("所属区域")]
        public string District { get; set; }

        public string[] ReasonGroups => string.IsNullOrEmpty(ComplainReason)? new string[1]:  ComplainReason.GetSplittedFields('-');

        public string FirstReasonClass => ReasonGroups.Length > 0 ? ReasonGroups[0] : "其他";

        public string SecondReasonClass => ReasonGroups.Length > 1 ? ReasonGroups[1] : "其他";

        public string ThirdReasonClass => ReasonGroups.Length > 2 ? ReasonGroups[2] : "其他";
    }
}
