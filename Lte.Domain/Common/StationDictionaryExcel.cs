using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    public class StationDictionaryExcel
    {
        [ExcelColumn("站址编号")]
        public string StationNum { get; set; }

        [ExcelColumn("L网网管ID")]
        public int ENodebId { get; set; }

        [ExcelColumn("FSL编号")]
        public string PlanNum { get; set; }

        [ExcelColumn("网格")]
        public string Grid { get; set; }

        [ExcelColumn("L网网管名称（对应拉远填写RRU名称）")]
        public string ElementName { get; set; }

        [ExcelColumn("是否L网拉远")]
        public string IsRruString { get; set; }

        [ExcelColumn("施主BBU名称")]
        public string ENodebName { get; set; }

        [ExcelColumn("L网RRU数量")]
        public byte TotalRrus { get; set; }
    }
}