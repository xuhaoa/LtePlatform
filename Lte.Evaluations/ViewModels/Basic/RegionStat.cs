namespace Lte.Evaluations.ViewModels.Basic
{
    public class DistrictStat
    {
        public string District { get; set; }

        public int TotalLteENodebs { get; set; }

        public int TotalLteCells { get; set; }

        public int TotalCdmaBts { get; set; }

        public int TotalCdmaCells { get; set; }
    }

    public class DistrictIndoorStat
    {
        public string District { get; set; }

        public int TotalIndoorCells { get; set; }

        public int TotalOutdoorCells { get; set; }
    }

    public class DistrictBandClassStat
    {
        public string District { get; set; }

        public int Band1Cells { get; set; }

        public int Band3Cells { get; set; }

        public int Band5Cells { get; set; }

        public int Band41Cells { get; set; }
    }

    public class TownStat
    {
        public string Town { get; set; }

        public int TotalLteENodebs { get; set; }

        public int TotalLteCells { get; set; }

        public int TotalCdmaBts { get; set; }

        public int TotalCdmaCells { get; set; }
    }
}
