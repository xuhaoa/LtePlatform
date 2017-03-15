using System;
using System.Data.Linq.Mapping;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;

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
    public class AreaTestDate : IArea
    {
        [Column(Name = "area", DbType = "Char(50)")]
        public string Area { get; set; }

        [Column(Name = "latestTestDate2G", DbType = "Char(100)")]
        public string LatestTestDate2G { get; set; }

        [Column(Name = "latestTestDate3G", DbType = "Char(100)")]
        public string LatestTestDate3G { get; set; }

        [Column(Name = "latestTestDate4G", DbType = "Char(100)")]
        public string LatestTestDate4G { get; set; }

        public DateTime LatestDate2G => Convert.ToDateTime(DateTime.Today);

        public DateTime LatestDate3G => Convert.ToDateTime(DateTime.Today);

        public DateTime LatestDate4G => Convert.ToDateTime(DateTime.Today);
    }

    [AutoMapFrom(typeof(AreaTestDate), typeof(Town))]
    public class AreaTestDateView
    {
        public string CityName { get; set; }

        public string DistrictName { get; set; }

        public string TownName { get; set; }

        public double Longtitute { get; set; }

        public double Lattitute { get; set; }

        [AutoMapPropertyResolve("AreaType", typeof(Town), typeof(ComplainSceneDescriptionTransform))]
        public string AreaTypeDescription { get; set; }

        public DateTime LatestDate2G { get; set; }
        
        public DateTime LatestDate3G { get; set; }
        
        public DateTime LatestDate4G { get; set; }

        public int TotalDays2G => (DateTime.Today - LatestDate2G).Days;

        public int TotalDays3G => (DateTime.Today - LatestDate3G).Days;

        public int TotalDays4G => (DateTime.Today - LatestDate4G).Days;
    }
}
