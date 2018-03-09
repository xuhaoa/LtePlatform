using System;
using Lte.Domain.Common.Geo;
using Lte.Domain.LinqToCsv;

namespace Lte.Domain.Common
{
    public class AppStreamingCsv : IGeoPoint<double>
    {
        [CsvColumn(Name = "IMSI")]
        public string Imsi { get; set; }

        [CsvColumn(Name = "MEID")]
        public string Meid { get; set; }

        [CsvColumn(Name = "PhoneType")]
        public string PhoneType { get; set; }

        [CsvColumn(Name = "Longitude")]
        public double Longtitute { get; set; }

        [CsvColumn(Name = "Latitude")]
        public double Lattitute { get; set; }

        [CsvColumn(Name = "LocationDesc")]
        public string LocationDesc { get; set; }

        [CsvColumn(Name = "NetType")]
        public string NetType { get; set; }

        [CsvColumn(Name = "APN")]
        public string Apn { get; set; }

        [CsvColumn(Name = "LteCi")]
        public string LteCi { get; set; }

        [CsvColumn(Name = "LteRsrp")]
        public string LteRsrpString { get; set; }

        [CsvColumn(Name = "LteSinr")]
        public string LteSinrString { get; set; }

        [CsvColumn(Name = "VideoName")]
        public string VideoName { get; set; }

        [CsvColumn(Name = "VideoURL")]
        public string VideoUrl { get; set; }

        [CsvColumn(Name = "VideoTestTime")]
        public DateTime VideoTestTime { get; set; }

        [CsvColumn(Name = "VideoAvgSpeed")]
        public double VideoAvgSpeed { get; set; }

        [CsvColumn(Name = "VideoPeakSpeed")]
        public double VideoPeakSpeed { get; set; }

        [CsvColumn(Name = "3GIMSI_LAST4")]
        public double TotalVideoSize { get; set; }

        [CsvColumn(Name = "BufferCounter")]
        public int BufferCounter { get; set; }

        [CsvColumn(Name = "VideoSize")]
        public string VideoSizeString { get; set; }

        [CsvColumn(Name = "BaseBand")]
        public string BaseBand { get; set; }

        [CsvColumn(Name = "Kernel")]
        public string Kernel { get; set; }

        [CsvColumn(Name = "InnerVersion")]
        public string InnerVersion { get; set; }

        [CsvColumn(Name = "RamUsage")]
        public string RamUsage { get; set; }

        [CsvColumn(Name = "CpuUsage")]
        public string CpuUsage { get; set; }

        [CsvColumn(Name = "Province")]
        public string Province { get; set; }

        [CsvColumn(Name = "City")]
        public string City { get; set; }

        [CsvColumn(Name = "CdmaSid")]
        public string CdmaSid { get; set; }

        [CsvColumn(Name = "CdmaNid")]
        public string CdmaNid { get; set; }

        [CsvColumn(Name = "CdmaBsid")]
        public string CdmaBsid { get; set; }

        [CsvColumn(Name = "CdmadBm")]
        public string CdmadBm { get; set; }

        [CsvColumn(Name = "LtePci")]
        public string LtePci { get; set; }

        [CsvColumn(Name = "LteTac")]
        public string LteTac { get; set; }

        [CsvColumn(Name = "InnerIP")]
        public string InnerIP { get; set; }

        [CsvColumn(Name = "OuterIP")]
        public string OuterIP { get; set; }

        [CsvColumn(Name = "VideoIP")]
        public string VideoIP { get; set; }

        [CsvColumn(Name = "TCLASS")]
        public string TCLASS { get; set; }

        [CsvColumn(Name = "3GIMSI_LAST4")]
        public string IMSI_LAST4 { get; set; }

        [CsvColumn(Name = "FLAG")]
        public string FLAG { get; set; }

        [CsvColumn(Name = "Ecio")]
        public string Ecio { get; set; }

        [CsvColumn(Name = "Snr")]
        public string Snr { get; set; }

        [CsvColumn(Name = "LteRsrq")]
        public string LteRsrq { get; set; }

        [CsvColumn(Name = "DnsIP ")]
        public string DnsIP { get; set; }

        [CsvColumn(Name = "Source")]
        public string Source { get; set; }

        [CsvColumn(Name = "OSVersion")]
        public string OSVersion { get; set; }

        [CsvColumn(Name = "Extra1")]
        public string Extra1 { get; set; }


        [CsvColumn(Name = "Extra2")]
        public string Extra2 { get; set; }

    }
}