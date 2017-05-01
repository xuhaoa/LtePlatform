using Lte.Domain.Regular.Attributes;

namespace Lte.Evaluations.ViewModels.Basic
{
    [TypeDoc("区域内基站小区统计")]
    public class DistrictStat
    {
        [MemberDoc("区")]
        public string District { get; set; }

        [MemberDoc("LTE基站总数")]
        public int TotalLteENodebs { get; set; }

        [MemberDoc("LTE小区总数")]
        public int TotalLteCells { get; set; }

        [MemberDoc("CDMA基站总数")]
        public int TotalCdmaBts { get; set; }

        [MemberDoc("CDMA小区总数")]
        public int TotalCdmaCells { get; set; }
    }

    [TypeDoc("区域内LTE室内外小区统计")]
    public class DistrictIndoorStat
    {
        [MemberDoc("区")]
        public string District { get; set; }

        [MemberDoc("室内小区总数")]
        public int TotalIndoorCells { get; set; }

        [MemberDoc("室外小区总数")]
        public int TotalOutdoorCells { get; set; }
    }

    [TypeDoc("区域内LTE小区频段统计")]
    public class DistrictBandClassStat
    {
        [MemberDoc("区")]
        public string District { get; set; }

        [MemberDoc("2.1G频段小区总数")]
        public int Band1Cells { get; set; }

        [MemberDoc("1.8G频段小区总数")]
        public int Band3Cells { get; set; }

        [MemberDoc("800M频段小区总数")]
        public int Band5Cells { get; set; }

        [MemberDoc("TDD频段小区总数")]
        public int Band41Cells { get; set; }
    }

    [TypeDoc("镇区小区数统计")]
    public class TownStat
    {
        [MemberDoc("镇")]
        public string Town { get; set; }

        [MemberDoc("LTE基站总数")]
        public int TotalLteENodebs { get; set; }

        [MemberDoc("LTE小区总数")]
        public int TotalLteCells { get; set; }

        [MemberDoc("CDMA基站总数")]
        public int TotalCdmaBts { get; set; }

        [MemberDoc("CDMA小区总数")]
        public int TotalCdmaCells { get; set; }
    }
}
