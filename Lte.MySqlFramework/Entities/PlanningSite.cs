using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Geo;
using Lte.Domain.Regular.Attributes;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(PlanningSiteExcel))]
    public class PlanningSite : Entity, ITownId
    {
        public int TownId { get; set; }

        public string PlanNum { get; set; }
        
        public string PlanName { get; set; }

        public string FormalName { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        public string TowerType { get; set; }
        
        public double? AntennaHeight { get; set; }
        
        public DateTime? GottenDate { get; set; }
        
        public DateTime? ContractDate { get; set; }
        
        public DateTime? FinishedDate { get; set; }
    }

    public class PlanningSiteExcel : IDistrictTown
    {
        [ExcelColumn("区县")]
        public string District { get; set; }

        [ExcelColumn("分局")]
        public string Town { get; set; }

        [ExcelColumn("编号")]
        public string PlanNum { get; set; }

        [ExcelColumn("规划名")]
        public string PlanName { get; set; }

        [ExcelColumn("电信出图站名")]
        public string FormalName { get; set; }

        [ExcelColumn("规划经度")]
        public double PlanLongtitute { get; set; }

        [ExcelColumn("规划纬度")]
        public double PlanLattitute { get; set; }

        [ExcelColumn("选址经度")]
        public double? FinalLongtitute { get; set; }

        [ExcelColumn("选址纬度")]
        public double? FinalLattitute { get; set; }

        public double Longtitute => FinalLongtitute ?? PlanLongtitute;

        public double Lattitute => FinalLattitute ?? PlanLattitute;

        [ExcelColumn("杆塔类型")]
        public string TowerType { get; set; }

        [ExcelColumn("天线挂高")]
        public double? AntennaHeight { get; set; }

        [ExcelColumn("谈点完成日期")]
        public DateTime? GottenDate { get; set; }

        [ExcelColumn("合同签订日期")]
        public DateTime? ContractDate { get; set; }

        [ExcelColumn("开通日期")]
        public DateTime? FinishedDate { get; set; }
    }
}
