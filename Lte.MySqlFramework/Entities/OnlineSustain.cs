using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;

namespace Lte.MySqlFramework.Entities
{
    public class OnlineSustain: Entity
    {
        public DateTime BeginDate { get; set; }

        public int TownId { get; set; }

        public string SerialNumber { get; set; }

        public string DutyStaff { get; set; }

        public ComplainCategory ComplainCategory { get; set; }

        public string Address { get; set; }

        public string Issue { get; set; }

        public string SpecialResponse { get; set; }

        public bool IsPreProcessed { get; set; }

        public string WorkItemNumber { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }
        
        public string FollowInfo { get; set; }
        
        public string FeedbackInfo { get; set; }
    }

    public class OnlineSustainExcel
    {
        [ExcelColumn("日期")]
        public DateTime BeginDate { get; set; }

        [ExcelColumn("预处理（流水号）单号")]
        public string SerialNumber { get; set; }

        [ExcelColumn("值班人员")]
        public string DutyStaff { get; set; }

        [ExcelColumn("类型")]
        public string ComplainCategoryDescription { get; set; }

        [ExcelColumn("投诉地址")]
        public string Address { get; set; }

        [ExcelColumn("话务员咨询问题")]
        public string Issue { get; set; }

        [ExcelColumn("专家答复、建议")]
        public string SpecialResponse { get; set; }

        [ExcelColumn("预处理是否成功")]
        public string PreProcessString { get; set; }

        [ExcelColumn("工单单号")]
        public string WorkItemNumber { get; set; }

        [ExcelColumn("经度", TransformEnum.DefaultZeroDouble, 0)]
        public double? Longtitute { get; set; }

        [ExcelColumn("纬度", TransformEnum.DefaultZeroDouble, 0)]
        public double? Lattitute { get; set; }

        [ExcelColumn("后续跟进")]
        public string FollowInfo { get; set; }

        [ExcelColumn("现场人员反馈信息")]
        public string FeedbackInfo { get; set; }
    }
}
