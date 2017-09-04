using System;
using System.Collections.Generic;
using System.Data.Linq.Mapping;
using System.Globalization;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.LinqToCsv;
using Lte.Domain.Regular;

namespace Lte.Parameters.Entities.Dt
{
    [AutoMapFrom(typeof(FileRecord2GDingli))]
    public class FileRecord2GCsv : IGeoPoint<double?>, IPn, IStatTime
    {
        public string ComputerTime { get; set; }

        public DateTime StatTime
        {
            get { return ComputerTime.ConvertToDateTime(DateTime.Now); }
            set { ComputerTime = value.ToString(CultureInfo.InvariantCulture); }
        }

        public string TestTimeString => StatTime.ToString("yyyy-M-d HH:mm:ss.fff");

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

    public class FileRecord2GDingli : IGeoPoint<double?>, IPn, IStatTime
    {
        public string ComputerTime { get; set; }

        public DateTime StatTime
        {
            get { return ComputerTime.ConvertToDateTime(DateTime.Now); }
            set { ComputerTime = value.ToString(CultureInfo.InvariantCulture); }
        }

        public string TestTimeString => StatTime.ToString("yyyy-M-d HH:mm:ss.fff");

        [CsvColumn(Name = "Longitude")]
        public double? Longtitute { get; set; }

        [CsvColumn(Name = "Latitude")]
        public double? Lattitute { get; set; }
        
        [CsvColumn(Name = "CDMA RxAGC")]
        public double? RxAgc { get; set; }

        [CsvColumn(Name = "CDMA TxAGC")]
        public double? TxAgc { get; set; }

        [CsvColumn(Name = "CDMA Total Ec/Io")]
        public double? EcIo { get; set; }

        [CsvColumn(Name = "CDMA Reference PN")]
        public double? Pn { get; set; }

        [CsvColumn(Name = "CDMA TxPower")]
        public double? TxPower { get; set; }

        [CsvColumn(Name = "CDMA Tx Gain Adj")]
        public double? TxGain { get; set; }
    }

    [AutoMapFrom(typeof(FileRecord2GCsv))]
    public class FileRecord2G : IGeoPoint<double?>, ICoverage, IRasterNum
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
        public string ComputerTime { get; set; }
        
        public DateTime StatTime
        {
            get { return ComputerTime.ConvertToDateTime(DateTime.Now); }
            set { ComputerTime = value.ToString(CultureInfo.InvariantCulture); }
        }

        public string TestTimeString => StatTime.ToString("yyyy-M-d HH:mm:ss.fff");

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
    public class FileRecord3G : IGeoPoint<double?>, ICoverage, IRasterNum
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

    [AutoMapFrom(typeof(FileRecord4GZte), typeof(FileRecord4GHuawei))]
    public class FileRecord4GCsv : IGeoPoint<double?>, IPn, IStatTime
    {
        [CsvColumn(Name = "Index")]
        public int? Ind { get; set; }

        public DateTime? LogTime { get; set; }

        [CsvColumn(Name = "Time")]
        public string ComputerTime { get; set; }

        public DateTime StatTime
        {
            get { return ComputerTime.ConvertToDateTime(DateTime.Now); }
            set { ComputerTime = value.ToString(CultureInfo.InvariantCulture); }
        }

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

    public class FileRecord4GZte : IGeoPoint<double?>, IPn, IStatTime
    {
        [CsvColumn(Name = "Offset")]
        public int? Ind { get; set; }

        [CsvColumn(Name = "LogTime")]
        public string ComputerTime { get; set; }

        public DateTime StatTime
        {
            get { return ComputerTime.ConvertToDateTime(DateTime.Now); }
            set { ComputerTime = value.ToString(CultureInfo.InvariantCulture); }
        }

        [CsvColumn(Name = "GPS_Lon")]
        public double? Longtitute { get; set; }

        [CsvColumn(Name = "GPS_Lat")]
        public double? Lattitute { get; set; }

        [CsvColumn(Name = "MS1_Server Cell CellID")]
        public string CellString { get; set; }

        public string[] CellFields => CellString?.GetSplittedFields('_');

        public int? ENodebId
            => (CellFields != null && CellFields.Length > 0) ? CellFields[0].ConvertToInt(0) : (int?) null;

        public byte? SectorId
            => (CellFields != null && CellFields.Length > 1) ? CellFields[1].ConvertToByte(0) : (byte?) null;

        [CsvColumn(Name = "MS1_Downlink Frequency")]
        public double? Frequency { get; set; }

        [CsvColumn(Name = "MS1_Server Cell PCI(PCell)")]
        public double? Pn { get; set; }

        [CsvColumn(Name = "MS1_Server Cell RSRP(PCell)")]
        public double? Rsrp { get; set; }

        [CsvColumn(Name = "MS1_Server Cell SINR(PCell)")]
        public double? Sinr { get; set; }

        [CsvColumn(Name = "MS1_PDSCH Total BLER(PCell)")]
        public double? DlBlerRate { get; set; }

        public byte? DlBler => (byte?) (DlBlerRate * 100);

        [CsvColumn(Name = "MS1_SCell1 WideBand CQI")]
        public double? CqiAverage { get; set; }

        [CsvColumn(Name = "MS1_Uplink MCS")]
        public byte? UlMcs { get; set; }

        [CsvColumn(Name = "MS1_Downlink TB0 Average MCS")]
        public byte? DlMcs { get; set; }

        [CsvColumn(Name = "MS1_PDCP UL PDU Throughput(Mbit/s)")]
        public double? PdcpThroughputUlMbps { get; set; }

        public double? PdcpThroughputUl => PdcpThroughputUlMbps * 1024;

        [CsvColumn(Name = "MS1_PDCP DL PDU Throughput(Mbit/s)")]
        public double? PdcpThroughputDlMbps { get; set; }

        public double? PdcpThroughputDl => PdcpThroughputDlMbps * 1024;

        [CsvColumn(Name = "MS1_Layer1 DL Throughput(Mbit/s)(PCell)")]
        public double? PhyThroughputDlMbps { get; set; }

        public double? PhyThroughputDl => PhyThroughputDlMbps * 1024;

        [CsvColumn(Name = "MS1_MAC DL Throughput(Mbit/s)(PCell)")]
        public double? MacThroughputDlMbps { get; set; }

        public double? MacThroughputDl => MacThroughputDlMbps * 1024;

        [CsvColumn(Name = "PUSCH Rb Num/s")]
        public int? PuschRbNum { get; set; }

        [CsvColumn(Name = "PDSCH Rb Num/s")]
        public int? PdschRbNum { get; set; }

        [CsvColumn(Name = "MS1_PUSCH Total RB Number")]
        public int? PuschRbSizeAverage { get; set; }

        [CsvColumn(Name = "MS1_PDSCH Total RBNumber")]
        public int? PdschRbSizeAverage { get; set; }

        [CsvColumn(Name = "MS1_Neighbor Cell PCI[1]")]
        public short? N1Pci { get; set; }

        [CsvColumn(Name = "MS1_Neighbor Cell RSRP[1]")]
        public double? N1Rsrp { get; set; }

        [CsvColumn(Name = "MS1_Neighbor Cell PCI[2]")]
        public short? N2Pci { get; set; }

        [CsvColumn(Name = "MS1_Neighbor Cell RSRP[2]")]
        public double? N2Rsrp { get; set; }

        [CsvColumn(Name = "MS1_Neighbor Cell PCI[3]")]
        public short? N3Pci { get; set; }

        [CsvColumn(Name = "MS1_Neighbor Cell RSRP[3]")]
        public double? N3Rsrp { get; set; }
    }

    public class FileRecord4GHuawei : IGeoPoint<double?>, IPn, IStatTime
    {
        [CsvColumn(Name = "No.")]
        public int? Ind { get; set; }

        [CsvColumn(Name = "Longitude")]
        public double? Longtitute { get; set; }

        [CsvColumn(Name = "Latitude")]
        public double? Lattitute { get; set; }

        [CsvColumn(Name = "DateTime")]
        public string ComputerTime { get; set; }

        public DateTime StatTime
        {
            get { return ComputerTime.ConvertToDateTime(DateTime.Now); }
            set { ComputerTime = value.ToString(CultureInfo.InvariantCulture); }
        }

        [CsvColumn(Name = "ECI(eNodeBID/CellID)_All Logs")]
        public string CellString { get; set; }

        public string[] CellFields => CellString?.GetSplittedFields(" / ");

        public int? ENodebId
            => (CellFields != null && CellFields.Length > 0) ? CellFields[0].ConvertToInt(0) : (int?)null;

        public byte? SectorId
            => (CellFields != null && CellFields.Length > 1) ? CellFields[1].ConvertToByte(0) : (byte?)null;

        [CsvColumn(Name = "DL Frequency_All Logs")]
        public double? Frequency { get; set; }

        [CsvColumn(Name = "Serving PCI_All Logs")]
        public double? Pn { get; set; }

        [CsvColumn(Name = "Serving RSRP_All Logs")]
        public double? Rsrp { get; set; }

        [CsvColumn(Name = "Serving PCC SINR_All Logs")]
        public double? Sinr { get; set; }

        [CsvColumn(Name = "PCC PDCCH BLER(%)_All Logs")]
        public double? DlBler { get; set; }

        [CsvColumn(Name = "PCC CQIPeriodicity_All Logs")]
        public double? CqiAverage { get; set; }

        [CsvColumn(Name = "MS1_Uplink MCS")]
        public byte? UlMcs { get; set; }

        [CsvColumn(Name = "DL MCSTotal_All Logs")]
        public int? TotalDlMcs { get; set; }

        public byte? DlMcs => (byte?) (TotalDlMcs / 30);

        [CsvColumn(Name = "PDCP Throughput UL_All Logs")]
        public double? PdcpThroughputUl { get; set; }

        [CsvColumn(Name = "PDCP Throughput DL_All Logs")]
        public double? PdcpThroughputDl { get; set; }

        [CsvColumn(Name = "PCC PHY Throughput DL_All Logs")]
        public double? PhyThroughputDl { get; set; }

        [CsvColumn(Name = "PCC MAC Throughput DL_All Logs")]
        public double? MacThroughputDl { get; set; }

        [CsvColumn(Name = "PUSCH RB Number/s_All Logs")]
        public int? PuschRbNum { get; set; }

        [CsvColumn(Name = "PDSCH RB Number/s_All Logs")]
        public int? PdschRbNum { get; set; }

        [CsvColumn(Name = "MS1_PUSCH Total RB Number")]
        public int? PuschRbSizeAverage { get; set; }

        [CsvColumn(Name = "MS1_PDSCH Total RBNumber")]
        public int? PdschRbSizeAverage { get; set; }

        [CsvColumn(Name = "1st PCI in Detected Cells_All Logs")]
        public short? N1Pci { get; set; }

        [CsvColumn(Name = "1st RSRP in Detected Cells_All Logs")]
        public double? N1Rsrp { get; set; }

        [CsvColumn(Name = "2nd PCI in Detected Cells_All Logs")]
        public short? N2Pci { get; set; }

        [CsvColumn(Name = "2nd RSRP in Detected Cells_All Logs")]
        public double? N2Rsrp { get; set; }

        [CsvColumn(Name = "3rd PCI in Detected Cells_All Logs")]
        public short? N3Pci { get; set; }

        [CsvColumn(Name = "3rd RSRP in Detected Cells_All Logs")]
        public double? N3Rsrp { get; set; }
    }

    public class FileRecord4GDingli : IGeoPoint<double?>, IPn, IStatTime
    {
        public string ComputerTime { get; set; }

        public DateTime StatTime
        {
            get { return ComputerTime.ConvertToDateTime(DateTime.Now); }
            set { ComputerTime = value.ToString(CultureInfo.InvariantCulture); }
        }

        [CsvColumn(Name = "Longitude")]
        public double? Longtitute { get; set; }

        [CsvColumn(Name = "Latitude")]
        public double? Lattitute { get; set; }

        [CsvColumn(Name = "LTE eNodeB ID")]
        public int? ENodebId { get; set; }

        [CsvColumn(Name = "LTE SectorID")]
        public byte? SectorId { get; set; }

        [CsvColumn(Name = "LTE Frequency DL")]
        public double? Frequency { get; set; }

        [CsvColumn(Name = "LTE PCI")]
        public double? Pn { get; set; }

        [CsvColumn(Name = "LTE RSRP")]
        public double? SelfRsrp { get; set; }

        public double? Rsrp => SelfRsrp ?? N1Rsrp;

        [CsvColumn(Name = "LTE SINR")]
        public double? Sinr1 { get; set; }

        [CsvColumn(Name = "LTE CRS SINR")]
        public double? Sinr2 { get; set; }

        public double? Sinr => Sinr1 ?? Sinr2;

        [CsvColumn(Name = "LTE PDSCH BLER")]
        public double? DlBler1 { get; set; }

        [CsvColumn(Name = "LTE PDSCH Residual BLER")]
        public double? DlBler2 { get; set; }

        public double? DlBler => DlBler1 ?? DlBler2;

        [CsvColumn(Name = "LTE WideBand CQI")]
        public double? CqiAverage { get; set; }

        [CsvColumn(Name = "LTE MCS Average UL /s")]
        public byte? UlMcs { get; set; }

        [CsvColumn(Name = "LTE MCS Average DL /s")]
        public byte? DlMcs { get; set; }

        [CsvColumn(Name = "LTE PDCP Throughput UL")]
        public double? PdcpBpsUl { get; set; }

        public double? PdcpThroughputUl => PdcpBpsUl / 1024;

        [CsvColumn(Name = "LTE PDCP Throughput DL")]
        public double? PdcpBpsDl { get; set; }

        public double? PdcpThroughputDl => PdcpBpsDl / 1024;

        [CsvColumn(Name = "LTE PHY Throughput DL")]
        public double? PhyBpsDl { get; set; }

        public double? PhyThroughputDl => PhyBpsDl / 1024;

        [CsvColumn(Name = "LTE MAC Throughput DL")]
        public double? MacBpsDl { get; set; }

        public double? MacThroughputDl => MacBpsDl / 1024;

        [CsvColumn(Name = "LTE PUSCH RB Count /s")]
        public int? PuschRbNum { get; set; }

        [CsvColumn(Name = "LTE PDSCH RB Count /s")]
        public int? PdschRbNum { get; set; }

        [CsvColumn(Name = "UL LTE RB Count Per TB")]
        public double? PuschRbSizeAverage { get; set; }

        [CsvColumn(Name = "DL LTE RB Count Per TB")]
        public double? PdschRbSizeAverage { get; set; }

        [CsvColumn(Name = "LTE Cell 1st PCI")]
        public short? N1Pci { get; set; }

        [CsvColumn(Name = "LTE Cell 1st RSRP")]
        public double? N1Rsrp { get; set; }

        [CsvColumn(Name = "LTE Cell 2nd PCI")]
        public short? N2Pci { get; set; }

        [CsvColumn(Name = "LTE Cell 2nd RSRP")]
        public double? N2Rsrp { get; set; }

        [CsvColumn(Name = "LTE Cell 3rd PCI")]
        public short? N3Pci { get; set; }

        [CsvColumn(Name = "LTE Cell 3rd RSRP")]
        public double? N3Rsrp { get; set; }
    }

    [AutoMapFrom(typeof(FileRecord4GCsv), typeof(FileRecord4GDingli))]
    public class FileRecord4G : IGeoPoint<double?>, ICoverage, IRasterNum
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
                        TestTimeString = subList[0].TestTimeString,
                        TxGain = subList.Where(x => x.TxGain != null).Average(x => x.TxGain),
                        TxPower = subList.Where(x => x.TxPower != null).Average(x => x.TxPower),
                        RasterNum = (short)((short)((lat - 22.64409) / 0.00895) * 104 + (short)((lon - 112.387654) / 0.0098))
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
                        TestTimeString = subList[0].TestTimeString,
                        TotalCi = subList.Where(x => x.TotalCi != null).Average(x => x.TotalCi),
                        DrcValue = (int?) subList.Where(x => x.DrcValue != null).Average(x => x.DrcValue),
                        Sinr = subList.Where(x => x.Sinr != null).Average(x => x.Sinr),
                        RasterNum = (short)((short)((lat-22.64409)/0.00895)*104+(short)((lon-112.387654)/0.0098))
                    }, (csv, stat) =>
                    {
                        if (csv.RxAgc0 != null) stat.RxAgc0 = csv.RxAgc0;
                        if (csv.RxAgc1 != null) stat.RxAgc1 = csv.RxAgc1;
                        if (csv.Sinr != null) stat.Sinr = csv.Sinr;
                        return stat.RxAgc0 != null && stat.RxAgc1 != null && stat.Sinr != null;
                    })).Aggregate((x, y) => x.Concat(y)).ToList();
        }

        public static List<FileRecord4G> MergeRecords(this IEnumerable<FileRecord4GCsv> csvs, DateTime? statDate = null)
        {
            return
                csvs.MergeRecordList()
                    .Select(list => list.MergeSubRecords((subList, lon, lat) => new FileRecord4G
                    {
                        Longtitute = lon,
                        Lattitute = lat,
                        Pci = (short?)subList.FirstOrDefault(x => x.Pn != null)?.Pn,
                        ENodebId = subList.FirstOrDefault(x => x.ENodebId != null)?.ENodebId,
                        SectorId = subList.FirstOrDefault(x => x.SectorId != null)?.SectorId,
                        Frequency = subList.FirstOrDefault(x => x.Frequency != null)?.Frequency,
                        Rsrp = subList.Where(x => x.Rsrp != null).Average(x => x.Rsrp),
                        DlBler = (byte?)subList.Where(x => x.DlBler != null).Average(x => x.DlBler),
                        N1Pci = subList.FirstOrDefault(x => x.N1Pci != null)?.N1Pci,
                        N1Rsrp = subList.FirstOrDefault(x => x.N1Rsrp != null)?.N1Rsrp,
                        N2Pci = subList.FirstOrDefault(x => x.N2Pci != null)?.N2Pci,
                        N2Rsrp = subList.FirstOrDefault(x => x.N2Rsrp != null)?.N2Rsrp,
                        N3Pci = subList.FirstOrDefault(x => x.N3Pci != null)?.N3Pci,
                        N3Rsrp = subList.FirstOrDefault(x => x.N3Rsrp != null)?.N3Rsrp,
                        PdcpThroughputDl = subList.Where(x => x.PdcpThroughputDl != null).Average(x => x.PdcpThroughputDl),
                        PdcpThroughputUl = subList.Where(x => x.PdcpThroughputUl != null).Average(x => x.PdcpThroughputUl),
                        MacThroughputDl = subList.Where(x => x.MacThroughputDl != null).Average(x => x.MacThroughputDl),
                        PhyThroughputDl = subList.Where(x => x.PhyThroughputDl != null).Average(x => x.PhyThroughputDl),
                        DlMcs = (byte?)subList.Where(x => x.DlMcs != null).Average(x => x.DlMcs),
                        UlMcs = (byte?)subList.Where(x => x.UlMcs != null).Average(x => x.UlMcs),
                        TestTimeString = (statDate ?? subList[0].StatTime).ToString("yyyy-M-d HH:mm:ss.fff"),
                        CqiAverage = subList.Where(x => x.CqiAverage != null).Average(x => x.CqiAverage),
                        PdschRbSizeAverage = (int?)subList.Where(x => x.PdschRbSizeAverage != null).Average(x => x.PdschRbSizeAverage),
                        PuschRbSizeAverage = (int?)subList.Where(x => x.PuschRbSizeAverage != null).Average(x => x.PuschRbSizeAverage),
                        PuschRbNum = (int?)subList.Where(x => x.PuschRbNum != null).Average(x => x.PuschRbNum),
                        PdschRbNum = (int?)subList.Where(x => x.PdschRbNum != null).Average(x => x.PdschRbNum),
                        Sinr = subList.Where(x => x.Sinr != null).Average(x => x.Sinr),
                        RasterNum = (short)((short)((lat - 22.64409) / 0.00895) * 104 + (short)((lon - 112.387654) / 0.0098))
                    }, (csv, stat) =>
                    {
                        if (csv.Rsrp != null) stat.Rsrp = csv.Rsrp;
                        if (csv.Sinr != null) stat.Sinr = csv.Sinr;
                        return stat.Rsrp != null && stat.Sinr != null;
                    })).Aggregate((x, y) => x.Concat(y)).ToList();
        }

        public static List<FileRecord4G> MergeRecords(this IEnumerable<FileRecord4GDingli> csvs, DateTime? statDate = null)
        {
            return
                csvs.MergeRecordList()
                    .Select(list => list.MergeSubRecords((subList, lon, lat) => new FileRecord4G
                    {
                        Longtitute = lon,
                        Lattitute = lat,
                        Pci = (short?)subList.FirstOrDefault(x => x.Pn != null)?.Pn,
                        ENodebId = subList.FirstOrDefault(x => x.ENodebId != null)?.ENodebId,
                        SectorId = subList.FirstOrDefault(x => x.SectorId != null)?.SectorId,
                        Frequency = subList.FirstOrDefault(x => x.Frequency != null)?.Frequency,
                        Rsrp = subList.Where(x => x.Rsrp != null).Average(x => x.Rsrp),
                        DlBler = (byte?)subList.Where(x => x.DlBler != null).Average(x => x.DlBler),
                        N1Pci = subList.FirstOrDefault(x => x.N1Pci != null)?.N1Pci,
                        N1Rsrp = subList.FirstOrDefault(x => x.N1Rsrp != null)?.N1Rsrp,
                        N2Pci = subList.FirstOrDefault(x => x.N2Pci != null)?.N2Pci,
                        N2Rsrp = subList.FirstOrDefault(x => x.N2Rsrp != null)?.N2Rsrp,
                        N3Pci = subList.FirstOrDefault(x => x.N3Pci != null)?.N3Pci,
                        N3Rsrp = subList.FirstOrDefault(x => x.N3Rsrp != null)?.N3Rsrp,
                        PdcpThroughputDl = subList.Where(x => x.PdcpThroughputDl != null).Average(x => x.PdcpThroughputDl),
                        PdcpThroughputUl = subList.Where(x => x.PdcpThroughputUl != null).Average(x => x.PdcpThroughputUl),
                        MacThroughputDl = subList.Where(x => x.MacThroughputDl != null).Average(x => x.MacThroughputDl),
                        PhyThroughputDl = subList.Where(x => x.PhyThroughputDl != null).Average(x => x.PhyThroughputDl),
                        DlMcs = (byte?)subList.Where(x => x.DlMcs != null).Average(x => x.DlMcs),
                        UlMcs = (byte?)subList.Where(x => x.UlMcs != null).Average(x => x.UlMcs),
                        TestTimeString = (statDate ?? subList[0].StatTime).ToString("yyyy-M-d HH:mm:ss.fff"),
                        CqiAverage = subList.Where(x => x.CqiAverage != null).Average(x => x.CqiAverage),
                        PdschRbSizeAverage = (int?)subList.Where(x => x.PdschRbSizeAverage != null).Average(x => x.PdschRbSizeAverage),
                        PuschRbSizeAverage = (int?)subList.Where(x => x.PuschRbSizeAverage != null).Average(x => x.PuschRbSizeAverage),
                        PuschRbNum = (int?)subList.Where(x => x.PuschRbNum != null).Average(x => x.PuschRbNum),
                        PdschRbNum = (int?)subList.Where(x => x.PdschRbNum != null).Average(x => x.PdschRbNum),
                        Sinr = subList.Where(x => x.Sinr != null).Average(x => x.Sinr),
                        RasterNum = (short)((short)((lat - 22.64409) / 0.00895) * 104 + (short)((lon - 112.387654) / 0.0098))
                    }, (csv, stat) =>
                    {
                        if (csv.Rsrp != null) stat.Rsrp = csv.Rsrp;
                        if (csv.Sinr != null) stat.Sinr = csv.Sinr;
                        return stat.Rsrp != null && stat.Sinr != null;
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

        public static string GenerateInsertSql(this FileRecord2G stat, string tableName)
        {
            return "INSERT INTO [" + tableName
                   + "] ( [rasterNum],[testTime],[lon],[lat],[refPN],[EcIo],[rxAGC],[txAGC],[txPower],[txGain]) VALUES("
                   + stat.RasterNum
                   + ",'" + stat.TestTimeString
                   + "'," + stat.Longtitute
                   + "," + stat.Lattitute
                   + "," + (stat.Pn == null ? "NULL" : stat.Pn.ToString())
                   + "," + (stat.Ecio == null ? "NULL" : stat.Ecio.ToString())
                   + "," + (stat.RxAgc == null ? "NULL" : stat.RxAgc.ToString())
                   + "," + (stat.TxAgc == null ? "NULL" : stat.TxAgc.ToString())
                   + "," + (stat.TxPower == null ? "NULL" : stat.TxPower.ToString())
                   + "," + (stat.TxGain == null ? "NULL" : stat.TxGain.ToString()) + ")";
        }

        public static string GenerateInsertSql(this FileRecord3G stat, string tableName)
        {
            return "INSERT INTO [" + tableName
                   + "] ( [rasterNum],[testTime],[lon],[lat],[refPN],[SINR],[rxAGC0],[rxAGC1],[txAGC],[totalC2I],[DRCValue],[RLPThrDL]) VALUES("
                   + stat.RasterNum
                   + ",'" + stat.TestTimeString
                   + "'," + stat.Longtitute
                   + "," + stat.Lattitute
                   + "," + (stat.Pn == null ? "NULL" : stat.Pn.ToString())
                   + "," + (stat.Sinr == null ? "NULL" : stat.Sinr.ToString())
                   + "," + (stat.RxAgc0 == null ? "NULL" : stat.RxAgc0.ToString())
                   + "," + (stat.RxAgc0 == null ? "NULL" : stat.RxAgc0.ToString())
                   + "," + (stat.TxAgc == null ? "NULL" : stat.TxAgc.ToString())
                   + "," + (stat.TotalCi == null ? "NULL" : stat.TotalCi.ToString())
                   + "," + (stat.DrcValue == null ? "NULL" : stat.DrcValue.ToString())
                   + "," + (stat.RlpThroughput == null ? "NULL" : stat.RlpThroughput.ToString()) + ")";
        }

        public static string GenerateInsertSql(this FileRecord4G stat, string tableName, int index)
        {
            return "INSERT INTO [" + tableName
                   + "] ( [ind],[rasterNum],[testTime],[lon],[lat],[eNodeBID],[cellID],[freq],[PCI],"
                   + "[RSRP],[SINR],[DLBler],[CQIave],[ULMCS],[DLMCS],[PDCPThrUL],[PDCPThrDL],[PHYThrDL],[MACThrDL],"
                   + "[PUSCHRbNum],[PDSCHRbNum],[PUSCHTBSizeAve],[PDSCHTBSizeAve],[n1PCI],[n1RSRP],[n2PCI],[n2RSRP],[n3PCI],[n3RSRP]) VALUES("
                   + index  //[ind]
                   + "," + stat.RasterNum  //[rasterNum]
                   + ",'" + stat.TestTimeString //[testTime]
                   + "'," + stat.Longtitute
                   + "," + stat.Lattitute
                   + "," + (stat.ENodebId == null ? "NULL" : stat.ENodebId.ToString())
                   + "," + (stat.SectorId == null ? "NULL" : stat.SectorId.ToString())
                   + "," + (stat.Frequency == null ? "NULL" : stat.Frequency.ToString())
                   + "," + (stat.Pci == null ? "NULL" : stat.Pci.ToString())
                   + "," + (stat.Rsrp == null ? "NULL" : stat.Rsrp.ToString())
                   + "," + (stat.Sinr == null ? "NULL" : stat.Sinr.ToString())
                   + "," + (stat.DlBler == null ? "NULL" : stat.DlBler.ToString())
                   + "," + (stat.CqiAverage == null ? "NULL" : stat.CqiAverage.ToString())
                   + "," + (stat.UlMcs == null ? "NULL" : stat.UlMcs.ToString())
                   + "," + (stat.DlMcs == null ? "NULL" : stat.DlMcs.ToString())
                   + "," + (stat.PdcpThroughputUl == null ? "NULL" : stat.PdcpThroughputUl.ToString())
                   + "," + (stat.PdcpThroughputDl == null ? "NULL" : stat.PdcpThroughputDl.ToString())
                   + "," + (stat.PhyThroughputDl == null ? "NULL" : stat.PhyThroughputDl.ToString())
                   + "," + (stat.MacThroughputDl == null ? "NULL" : stat.MacThroughputDl.ToString())
                   + "," + (stat.PuschRbNum == null ? "NULL" : stat.PuschRbNum.ToString())
                   + "," + (stat.PdschRbNum == null ? "NULL" : stat.PdschRbNum.ToString())
                   + "," + (stat.PuschRbSizeAverage == null ? "NULL" : stat.PuschRbSizeAverage.ToString())
                   + "," + (stat.PdschRbSizeAverage == null ? "NULL" : stat.PdschRbSizeAverage.ToString())
                   + "," + (stat.N1Pci == null ? "NULL" : stat.N1Pci.ToString())
                   + "," + (stat.N1Rsrp == null ? "NULL" : stat.N1Rsrp.ToString())
                   + "," + (stat.N2Pci == null ? "NULL" : stat.N2Pci.ToString())
                   + "," + (stat.N2Rsrp == null ? "NULL" : stat.N2Rsrp.ToString())
                   + "," + (stat.N3Pci == null ? "NULL" : stat.N3Pci.ToString())
                   + "," + (stat.N3Rsrp == null ? "NULL" : stat.N3Rsrp.ToString()) + ")";
        }
    }
}
