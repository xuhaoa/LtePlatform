using System;
using Abp.Domain.Entities;
using AutoMapper;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular.Attributes;

namespace Lte.MySqlFramework.Entities
{
    public class VipDemand : Entity
    {
        public string SerialNumber { get; set; }

        public DemandLevel DemandLevel { get; set; }
        
        public int TownId { get; set; }

        public string ProjectName { get; set; }

        public NetworkType NetworkType { get; set; }

        public MarketTheme MarketTheme { get; set; }

        public string Department { get; set; }

        public string ContactPerson { get; set; }

        public string PhoneNumber { get; set; }

        public string Area { get; set; }

        public DateTime BeginDate { get; set; }

        public DateTime PlanDate { get; set; }

        public string ProjectContents { get; set; }

        public string SustainPerson { get; set; }

        [IgnoreMap]
        public DateTime? FinishTime { get; set; }

        public int SubscriberGotten { get; set; }

        public string FinishResults { get; set; }

        public string ProcessInfo { get; set; }
    }
    
    public class VipDemandDto : IDistrictTown, ITownId
    {
        public string SerialNumber { get; set; }
        
        public string DemandLevelDescription { get; set; }

        public int TownId { get; set; }

        public string District { get; set; }

        public string Town { get; set; }

        public string ProjectName { get; set; }
        
        public string NetworkTypeDescription { get; set; }

        public string MarketThemeDescription { get; set; }

        public string Department { get; set; }

        public string ContactPerson { get; set; }

        public string PhoneNumber { get; set; }

        public string Area { get; set; }

        public DateTime BeginDate { get; set; }

        public DateTime PlanDate { get; set; }

        public string ProjectContents { get; set; }

        public string SustainPerson { get; set; }

        public bool IsFinished { get; set; }

        public bool IsInfoComplete { get; set; }

        public int SubscriberGotten { get; set; }

        public string FinishResults { get; set; }

        public string ProcessInfo { get; set; }
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
}
