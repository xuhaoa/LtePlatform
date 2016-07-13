using System.Data.Linq.Mapping;

namespace Lte.Parameters.Entities.Dt
{
    public class FileRecord2G
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
    }

    public class FileRecord3G
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
    }

    public class FileRecord4G
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
    }
}
