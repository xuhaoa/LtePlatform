using System;
using System.Data.Linq.Mapping;

namespace Lte.Parameters.Entities.Dt
{
    [Table(Name = "dbo.csvFilesInfo")]
    public class CsvFilesInfo
    {
        [Column(Name = "testDate", DbType = "DateTime")]
        public DateTime? TestDate { get; set; }

        [Column(Name = "csvFileName", DbType = "Char(300)")]
        public string CsvFileName { get; set; }

        [Column(Name = "direct", DbType = "Char(300)")]
        public string Directory { get; set; }

        [Column(Name = "dataType", DbType = "Char(50)")]
        public string DataType { get; set; }

        [Column(Name = "distance", DbType = "float")]
        public double? Distance { get; set; }
    }

    [Table(Name = "dbo.areaTestDate")]
    public class AreaTestDate
    {
        [Column(Name = "area", DbType = "Char(50)")]
        public string Area { get; set; }

        [Column(Name = "latestTestDate2G", DbType = "Char(100)")]
        public string LatestTestDate2G { get; set; }

        [Column(Name = "latestTestDate3G", DbType = "Char(100)")]
        public string LatestTestDate3G { get; set; }

        [Column(Name = "latestTestDate4G", DbType = "Char(100)")]
        public string LatestTestDate4G { get; set; }
    }
}
