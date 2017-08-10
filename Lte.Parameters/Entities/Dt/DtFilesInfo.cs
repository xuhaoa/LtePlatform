using System;
using System.Data.Linq.Mapping;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.LinqToCsv;

namespace Lte.Parameters.Entities.Dt
{
    public class FileRecord2GCsv : IGeoPoint<double?>
    {
        public DateTime ComputerTime { get; set; }

        public DateTime HandsetTime { get; set; }

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

    public class FileRecord3GCsv : IGeoPoint<double?>
    {
        public DateTime ComputerTime { get; set; }

        public DateTime HandsetTime { get; set; }

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

    public class FileRecord4GCsv : IGeoPoint<double?>
    {
        [CsvColumn(Name = "Index")]
        public int? Ind { get; set; }

        [CsvColumn(Name = "Time")]
        public DateTime HandsetTime { get; set; }

        public string TestTimeString => HandsetTime.ToLongTimeString();
        
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
        public short? Pci { get; set; }

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
}
