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
