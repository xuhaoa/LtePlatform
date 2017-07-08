using System.Data.Linq.Mapping;
using Lte.Domain.Common.Geo;

namespace Lte.Parameters.Entities.Dt
{
    [Table(Name = "dbo.rasterInfo")]
    public class RasterInfo : IGeoPoint<double>
    {
        [System.Data.Linq.Mapping.Column(Name = "rasterNum", DbType = "Int")]
        public int? RasterNum { get; set; }

        [System.Data.Linq.Mapping.Column(Name = "csvFilesName4G", DbType = "VarChar(MAX)")]
        public string CsvFilesName4G { get; set; }

        [System.Data.Linq.Mapping.Column(Name = "csvFilesName3G", DbType = "VarChar(MAX)")]
        public string CsvFilesName3G { get; set; }

        [System.Data.Linq.Mapping.Column(Name = "csvFilesName2G", DbType = "VarChar(MAX)")]
        public string CsvFilesName2G { get; set; }

        [System.Data.Linq.Mapping.Column(Name = "coordinate0", DbType = "Char(100)")]
        public string Coordinate0 { get; set; }

        [System.Data.Linq.Mapping.Column(Name = "coordinate1", DbType = "Char(100)")]
        public string Coordinate1 { get; set; }

        [System.Data.Linq.Mapping.Column(Name = "coordinate2", DbType = "Char(100)")]
        public string Coordinate2 { get; set; }

        [System.Data.Linq.Mapping.Column(Name = "coordinate3", DbType = "Char(100)")]
        public string Coordinate3 { get; set; }

        [System.Data.Linq.Mapping.Column(Name = "area", DbType = "Char(50)")]
        public string Area { get; set; }

        [Column(Name = "lon")]
        public double Longtitute { get; set; }
        
        [Column(Name = "lat")]
        public double Lattitute { get; set; }
    }
}
