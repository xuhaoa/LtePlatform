using System;
using System.Collections.Generic;
using System.Data.Linq.Mapping;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.LinqToCsv;

namespace Lte.Parameters.Entities.Dt
{
    public class FileRecord2GCsv : IGeoPoint<double?>, IPn, IStatTime
    {
        public DateTime ComputerTime { get; set; }

        [CsvColumn(Name = "HandsetTime")]
        public DateTime StatTime { get; set; }

        [CsvColumn(Name = "Longitude")]
        public double? Longtitute { get; set; }

        [CsvColumn(Name = "Latitude")]
        public double? Lattitute { get; set; }

        public string CellName { get; set; }

        public string Event { get; set; }

        [CsvColumn(Name = "Direction ")]
        public string Direction { get; set; }

        [CsvColumn(Name = "RxAGC")]
        public double? RxAgc { get; set; }

        [CsvColumn(Name = "TxAGC")]
        public double? TxAgc { get; set; }

        [CsvColumn(Name = "Total Ec/Io")]
        public double? EcIo { get; set; }

        [CsvColumn(Name = "Reference PN")]
        public double? Pn { get; set; }

        [CsvColumn(Name = "TxPower")]
        public double? TxPower { get; set; }

        [CsvColumn(Name = "Tx Gain Adj")]
        public double? TxGain { get; set; }
    }

    [AutoMapFrom(typeof(FileRecord2GCsv))]
    public class FileRecord2G : IGeoPoint<double?>, ICoverage
    {
        [Column(Name = "rasterNum", DbType = "SmallInt")]
        public short RasterNum { get; set; }

        [Column(Name = "rasterNum", DbType = "Char(50)")]
        public string TestTimeString { get; set; }

        [Column(Name = "lon", DbType = "Float")]
        public double? Longtitute { get; set; }

        [Column(Name = "lat", DbType = "Float")]
        public double? Lattitute { get; set; }

        [Column(Name = "refPN", DbType = "SmallInt")]
        public short? Pn { get; set; }

        [Column(Name = "EcIo", DbType = "Real")]
        public double? Ecio { get; set; }

        [Column(Name = "RxAGC", DbType = "Real")]
        public double? RxAgc { get; set; }

        [Column(Name = "txAGC", DbType = "Real")]
        public double? TxAgc { get; set; }

        [Column(Name = "txPower", DbType = "Real")]
        public double? TxPower { get; set; }

        [Column(Name = "txGain", DbType = "Real")]
        public double? TxGain { get; set; }

        [Column(Name = "GridNo50m", DbType = "Int")]
        public int? GridNumber { get; set; }

        public bool IsCoverage()
        {
            return RxAgc > -90 && TxAgc < 15 && Ecio > -12;
        }
    }

    public class FileRecord3GCsv : IGeoPoint<double?>, IPn, IStatTime
    {
        public DateTime ComputerTime { get; set; }

        [CsvColumn(Name = "HandsetTime")]
        public DateTime StatTime { get; set; }

        [CsvColumn(Name = "Longitude")]
        public double? Longtitute { get; set; }

        [CsvColumn(Name = "Latitude")]
        public double? Lattitute { get; set; }

        public string CellName { get; set; }

        [CsvColumn(Name = "EV RxAGC0")]
        public double? RxAgc0 { get; set; }

        [CsvColumn(Name = "EV RxAGC1")]
        public double? RxAgc1 { get; set; }

        [CsvColumn(Name = "EV TxAGC")]
        public double? TxAgc { get; set; }

        [CsvColumn(Name = "EV Total C/I")]
        public double? TotalCi { get; set; }

        [CsvColumn(Name = "EV Total SINR")]
        public double? Sinr { get; set; }

        [CsvColumn(Name = "EV DRC Value")]
        public double? DrcValue { get; set; }

        [CsvColumn(Name = "EV Serving Sector PN")]
        public double? Pn { get; set; }

        [CsvColumn(Name = "EV RLP Instant Throughput DL")]
        public double? RlpThroughput { get; set; }
    }

    [AutoMapFrom(typeof(FileRecord3GCsv))]
    public class FileRecord3G : IGeoPoint<double?>, ICoverage
    {
        [Column(Name = "rasterNum", DbType = "SmallInt")]
        public short RasterNum { get; set; }

        [Column(Name = "rasterNum", DbType = "Char(50)")]
        public string TestTimeString { get; set; }

        [Column(Name = "lon", DbType = "Float")]
        public double? Longtitute { get; set; }

        [Column(Name = "lat", DbType = "Float")]
        public double? Lattitute { get; set; }

        [Column(Name = "refPN", DbType = "SmallInt")]
        public short? Pn { get; set; }

        [Column(Name = "SINR", DbType = "Real")]
        public double? Sinr { get; set; }

        [Column(Name = "RxAGC0", DbType = "Real")]
        public double? RxAgc0 { get; set; }

        [Column(Name = "RxAGC1", DbType = "Real")]
        public double? RxAgc1 { get; set; }

        [Column(Name = "txAGC", DbType = "Real")]
        public double? TxAgc { get; set; }

        [Column(Name = "totalC2I", DbType = "Real")]
        public double? TotalCi { get; set; }

        [Column(Name = "DRCValue", DbType = "Int")]
        public int? DrcValue { get; set; }

        [Column(Name = "RLPThrDL", DbType = "Int")]
        public int? RlpThroughput { get; set; }

        public bool IsCoverage()
        {
            return RxAgc0 > -90 && RxAgc1 > -90 && TxAgc < 15 && Sinr > -5.5;
        }
    }

    public class FileRecord4GCsv : IGeoPoint<double?>, IPn, IStatTime
    {
        [CsvColumn(Name = "Index")]
        public int? Ind { get; set; }

        [CsvColumn(Name = "Time")]
        public DateTime StatTime { get; set; }
        
        [CsvColumn(Name = "Lon")]
        public double? Longtitute { get; set; }

        [CsvColumn(Name = "Lat")]
        public double? Lattitute { get; set; }

        [CsvColumn(Name = "eNodeB ID")]
        public int? ENodebId { get; set; }

        [CsvColumn(Name = "Cell ID")]
        public byte? SectorId { get; set; }

        [CsvColumn(Name = "Frequency DL(MHz)")]
        public double? Frequency { get; set; }

        [CsvColumn(Name = "PCI")]
        public double? Pn { get; set; }

        [CsvColumn(Name = "CRS RSRP")]
        public double? Rsrp { get; set; }

        [CsvColumn(Name = "CRS SINR")]
        public double? Sinr { get; set; }

        [CsvColumn(Name = "DL BLER(%)")]
        public byte? DlBler { get; set; }

        [CsvColumn(Name = "CQI Average")]
        public double? CqiAverage { get; set; }

        [CsvColumn(Name = "UL MCS Value # Average")]
        public byte? UlMcs { get; set; }

        [CsvColumn(Name = "DL MCS Value # Average")]
        public byte? DlMcs { get; set; }

        [CsvColumn(Name = "PDCP Thr'put UL(kb/s)")]
        public double? PdcpThroughputUl { get; set; }

        [CsvColumn(Name = "PDCP Thr'put DL(kb/s)")]
        public double? PdcpThroughputDl { get; set; }

        [CsvColumn(Name = "PHY Thr'put DL(kb/s)")]
        public double? PhyThroughputDl { get; set; }

        [CsvColumn(Name = "MAC Thr'put DL(kb/s)")]
        public double? MacThroughputDl { get; set; }

        [CsvColumn(Name = "PUSCH Rb Num/s")]
        public int? PuschRbNum { get; set; }

        [CsvColumn(Name = "PDSCH Rb Num/s")]
        public int? PdschRbNum { get; set; }

        [CsvColumn(Name = "PUSCH TB Size Ave(bits)")]
        public int? PuschRbSizeAverage { get; set; }

        [CsvColumn(Name = "PDSCH TB Size Ave(bits)")]
        public int? PdschRbSizeAverage { get; set; }

        [CsvColumn(Name = "NCell PCI #1")]
        public short? N1Pci { get; set; }

        [CsvColumn(Name = "NCell RSRP #1")]
        public double? N1Rsrp { get; set; }

        [CsvColumn(Name = "NCell PCI #2")]
        public short? N2Pci { get; set; }

        [CsvColumn(Name = "NCell RSRP #2")]
        public double? N2Rsrp { get; set; }

        [CsvColumn(Name = "NCell PCI #3")]
        public short? N3Pci { get; set; }

        [CsvColumn(Name = "NCell RSRP #3")]
        public double? N3Rsrp { get; set; }
    }

    [AutoMapFrom(typeof(FileRecord4GCsv))]
    public class FileRecord4G : IGeoPoint<double?>, ICoverage
    {
        [Column(Name = "ind", DbType = "Int")]
        public int? Ind { get; set; }

        [Column(Name = "rasterNum", DbType = "SmallInt")]
        public short RasterNum { get; set; }

        [Column(Name = "rasterNum", DbType = "Char(50)")]
        public string TestTimeString { get; set; }

        [Column(Name = "lon", DbType = "Float")]
        public double? Longtitute { get; set; }

        [Column(Name = "lat", DbType = "Float")]
        public double? Lattitute { get; set; }

        [Column(Name = "eNodeBID", DbType = "Int")]
        public int? ENodebId { get; set; }

        [Column(Name = "cellID", DbType = "TinyInt")]
        public byte? SectorId { get; set; }

        [Column(Name = "freq", DbType = "Real")]
        public double? Frequency { get; set; }

        [Column(Name = "PCI", DbType = "SmallInt")]
        [AutoMapPropertyResolve("Pn", typeof(FileRecord4GCsv))]
        public short? Pci { get; set; }

        [Column(Name = "RSRP", DbType = "Real")]
        public double? Rsrp { get; set; }

        [Column(Name = "SINR", DbType = "Real")]
        public double? Sinr { get; set; }

        [Column(Name = "DLBler", DbType = "TinyInt")]
        public byte? DlBler { get; set; }

        [Column(Name = "CQIave", DbType = "Real")]
        public double? CqiAverage { get; set; }

        [Column(Name = "ULMCS", DbType = "TinyInt")]
        public byte? UlMcs { get; set; }

        [Column(Name = "DLMCS", DbType = "TinyInt")]
        public byte? DlMcs { get; set; }

        [Column(Name = "PDCPThrUL", DbType = "Real")]
        public double? PdcpThroughputUl { get; set; }

        [Column(Name = "PDCPThrDL", DbType = "Real")]
        public double? PdcpThroughputDl { get; set; }

        [Column(Name = "PHYThrDL", DbType = "Real")]
        public double? PhyThroughputDl { get; set; }

        [Column(Name = "MACThrDL", DbType = "Real")]
        public double? MacThroughputDl { get; set; }

        [Column(Name = "PUSCHRbNum", DbType = "Int")]
        public int? PuschRbNum { get; set; }

        [Column(Name = "PDSCHRbNum", DbType = "Int")]
        public int? PdschRbNum { get; set; }

        [Column(Name = "PUSCHTBSizeAve", DbType = "Int")]
        public int? PuschRbSizeAverage { get; set; }

        [Column(Name = "PDSCHTBSizeAve", DbType = "Int")]
        public int? PdschRbSizeAverage { get; set; }

        [Column(Name = "n1PCI", DbType = "SmallInt")]
        public short? N1Pci { get; set; }

        [Column(Name = "n1RSRP", DbType = "Real")]
        public double? N1Rsrp { get; set; }

        [Column(Name = "n2PCI", DbType = "SmallInt")]
        public short? N2Pci { get; set; }

        [Column(Name = "n2RSRP", DbType = "Real")]
        public double? N2Rsrp { get; set; }

        [Column(Name = "n3PCI", DbType = "SmallInt")]
        public short? N3Pci { get; set; }

        [Column(Name = "n3RSRP", DbType = "Real")]
        public double? N3Rsrp { get; set; }

        public bool IsCoverage()
        {
            return Rsrp > -105 && Sinr > -3;
        }
    }

    [AutoMapFrom(typeof(FileRecord2G))]
    public class FileRecordCoverage2G
    {
        [AutoMapPropertyResolve("Longtitute", typeof(FileRecord2G), typeof(NullableZeroTransform))]
        public double Longtitute { get; set; }

        [AutoMapPropertyResolve("Lattitute", typeof(FileRecord2G), typeof(NullableZeroTransform))]
        public double Lattitute { get; set; }

        [AutoMapPropertyResolve("Ecio", typeof(FileRecord2G), typeof(NullableZeroTransform))]
        public double Ecio { get; set; }

        [AutoMapPropertyResolve("RxAgc", typeof(FileRecord2G), typeof(NullableZeroTransform))]
        public double RxAgc { get; set; }

        [AutoMapPropertyResolve("TxPower", typeof(FileRecord2G), typeof(NullableZeroTransform))]
        public double TxPower { get; set; }
    }

    [AutoMapFrom(typeof(FileRecord3G))]
    public class FileRecordCoverage3G
    {
        [AutoMapPropertyResolve("Longtitute", typeof(FileRecord3G), typeof(NullableZeroTransform))]
        public double Longtitute { get; set; }

        [AutoMapPropertyResolve("Lattitute", typeof(FileRecord3G), typeof(NullableZeroTransform))]
        public double Lattitute { get; set; }

        [AutoMapPropertyResolve("Sinr", typeof(FileRecord3G), typeof(NullableZeroTransform))]
        public double Sinr { get; set; }

        [AutoMapPropertyResolve("RxAgc0", typeof(FileRecord3G), typeof(NullableZeroTransform))]
        public double RxAgc0 { get; set; }

        [AutoMapPropertyResolve("RxAgc1", typeof(FileRecord3G), typeof(NullableZeroTransform))]
        public double RxAgc1 { get; set; }
    }

    [AutoMapFrom(typeof(FileRecord4G))]
    public class FileRecordCoverage4G
    {
        [AutoMapPropertyResolve("Longtitute", typeof(FileRecord4G), typeof(NullableZeroTransform))]
        public double Longtitute { get; set; }

        [AutoMapPropertyResolve("Lattitute", typeof(FileRecord4G), typeof(NullableZeroTransform))]
        public double Lattitute { get; set; }

        [AutoMapPropertyResolve("Sinr", typeof(FileRecord4G), typeof(NullableZeroTransform))]
        public double Sinr { get; set; }

        [AutoMapPropertyResolve("Rsrp", typeof(FileRecord4G), typeof(NullableZeroTransform))]
        public double Rsrp { get; set; }
    }

    public static class FileRecordQuery
    {
        public static List<FileRecord2G> MergeRecords(this IEnumerable<FileRecord2GCsv> csvs)
        {
            return
                csvs.MergeRecordList()
                    .Select(list => list.MergeSubRecords((subList, lon, lat) => new FileRecord2G
                    {
                        Ecio = subList.Where(x => x.EcIo != null).Average(x => x.EcIo),
                        Longtitute = lon,
                        Lattitute = lat,
                        Pn = (short?) subList.FirstOrDefault(x => x.Pn != null)?.Pn,
                        RxAgc = subList.Where(x => x.RxAgc != null).Average(x => x.RxAgc),
                        TxAgc = subList.Where(x => x.TxAgc != null).Average(x => x.TxAgc),
                        TestTimeString = subList[0].StatTime.ToString("yyyy-M-d HH:mm:ss.fff"),
                        TxGain = subList.Where(x => x.TxGain != null).Average(x => x.TxGain),
                        TxPower = subList.Where(x => x.TxPower != null).Average(x => x.TxPower)
                    }, (csv, stat) =>
                    {
                        if (csv.RxAgc != null) stat.RxAgc = csv.RxAgc;
                        if (csv.EcIo != null) stat.Ecio = csv.EcIo;
                        return stat.RxAgc != null && stat.Ecio != null;
                    })).Aggregate((x, y) => x.Concat(y)).ToList();
        }

        public static List<FileRecord3G> MergeRecords(this IEnumerable<FileRecord3GCsv> csvs)
        {
            return
                csvs.MergeRecordList()
                    .Select(list => list.MergeSubRecords((subList, lon, lat) => new FileRecord3G
                    {
                        Longtitute = lon,
                        Lattitute = lat,
                        Pn = (short?) subList.FirstOrDefault(x => x.Pn != null)?.Pn,
                        RxAgc0 = subList.Where(x => x.RxAgc0 != null).Average(x => x.RxAgc0),
                        RxAgc1 = subList.Where(x => x.RxAgc1 != null).Average(x => x.RxAgc1),
                        RlpThroughput = (int?) subList.Where(x => x.RlpThroughput != null).Average(x => x.RlpThroughput),
                        TxAgc = subList.Where(x => x.TxAgc != null).Average(x => x.TxAgc),
                        TestTimeString = subList[0].StatTime.ToString("yyyy-M-d HH:mm:ss.fff"),
                        TotalCi = subList.Where(x => x.TotalCi != null).Average(x => x.TotalCi),
                        DrcValue = (int?) subList.Where(x => x.DrcValue != null).Average(x => x.DrcValue),
                        Sinr = subList.Where(x => x.Sinr != null).Average(x => x.Sinr)
                    }, (csv, stat) =>
                    {
                        if (csv.RxAgc0 != null) stat.RxAgc0 = csv.RxAgc0;
                        if (csv.RxAgc1 != null) stat.RxAgc1 = csv.RxAgc1;
                        if (csv.Sinr != null) stat.Sinr = csv.Sinr;
                        return stat.RxAgc0 != null && stat.RxAgc1 != null && stat.Sinr != null;
                    })).Aggregate((x, y) => x.Concat(y)).ToList();
        }

        public static List<List<TCsv>> MergeRecordList<TCsv>(this IEnumerable<TCsv> csvs)
            where TCsv : IPn
        {
            var results = new List<List<TCsv>>();
            var tempCsvs = new List<TCsv>();
            var lastPn = -1;
            foreach (var csv in csvs)
            {
                if (csv.Pn == null || lastPn == (int)csv.Pn)
                {
                    tempCsvs.Add(csv);
                }
                else
                {
                    if (tempCsvs.Any()) results.Add(tempCsvs);
                    tempCsvs = new List<TCsv> {csv};
                    lastPn = (int) csv.Pn;
                }
            }
            if (tempCsvs.Any()) results.Add(tempCsvs);
            return results;
        }

        public static IEnumerable<TStat> MergeSubRecords<TCsv, TStat>(this List<TCsv> tempCsvs,
            Func<List<TCsv>, double, double, TStat> generateFunc, Func<TCsv, TStat, bool> validateFunc)
            where TCsv : IGeoPoint<double?>, IStatTime
            where TStat : class, new()
        {
            if (!tempCsvs.Any()) return new List<TStat>();
            var results = new List<TStat>();
            var lon = tempCsvs[0].Longtitute ?? 112.0;
            var lat = tempCsvs[0].Lattitute ?? 22.0;
            var subList = new List<TCsv>();
            var stat = new TStat();
            foreach (var csv in tempCsvs)
            {
                var lo = csv.Longtitute ?? 112.0;
                var la = csv.Lattitute ?? 22.0;
                var validate = validateFunc(csv, stat);
                if ((lo > lon - 0.000049 && lo < lon + 0.000049 && la > lat - 0.000045 && la < lat + 0.000045)
                    ||(lo > lon - 0.00098 && lo < lon + 0.00098 && la > lat - 0.0009 && la < lat + 0.0009 && !validate))
                {
                    subList.Add(csv);
                }
                else
                {
                    results.Add(generateFunc(subList, lon, lat));
                    subList = new List<TCsv> {csv};
                    lon = lo;
                    lat = la;
                }
            }
            if (subList.Any())
            {
                results.Add(generateFunc(subList, lon, lat));
            }
            return results;
        }
    }
}
