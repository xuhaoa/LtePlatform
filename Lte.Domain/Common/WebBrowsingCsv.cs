using System;
using Lte.Domain.Common.Geo;
using Lte.Domain.LinqToCsv;

namespace Lte.Domain.Common
{
    public class WebBrowsingCsv : IGeoPoint<double>
    {
        [CsvColumn(Name = "IMSI")]
        public string Imsi { get; set; }

        [CsvColumn(Name = "MEID")]
        public string Meid { get; set; }

        [CsvColumn(Name = "PhoneType")]
        public string PhoneType { get; set; }

        [CsvColumn(Name = "OSVersion")]
        public string OSVersion { get; set; }

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

        [CsvColumn(Name = "Longitude")]
        public double Longtitute { get; set; }

        [CsvColumn(Name = "Latitude")]
        public double Lattitute { get; set; }

        [CsvColumn(Name = "LocationDesc")]
        public string LocationDesc { get; set; }

        [CsvColumn(Name = "Province")]
        public string Province { get; set; }

        [CsvColumn(Name = "City")]
        public string City { get; set; }

        [CsvColumn(Name = "NetType")]
        public string NetType { get; set; }

        [CsvColumn(Name = "APN")]
        public string Apn { get; set; }
        [CsvColumn(Name = "CdmaSid")]
        public string CdmaSid { get; set; }
        [CsvColumn(Name = "CdmaNid")]
        public string CdmaNid { get; set; }
        [CsvColumn(Name = "CdmaBsid")]
        public string CdmaBsid { get; set; }
        [CsvColumn(Name = "CdmadBm")]
        public string CdmadBm { get; set; }

        [CsvColumn(Name = "LteCi")]
        public string LteCi { get; set; }
        [CsvColumn(Name = "LtePci")]
        public string LtePci { get; set; }
        [CsvColumn(Name = "LteTac")]
        public string LteTac { get; set; }

        [CsvColumn(Name = "LteRsrp")]
        public string LteRsrpString { get; set; }

        [CsvColumn(Name = "LteSinr")]
        public string LteSinrString { get; set; }
        [CsvColumn(Name = "InnerIP")]
        public string InnerIP { get; set; }
        [CsvColumn(Name = "OuterIP")]
        public string OuterIP { get; set; }

        [CsvColumn(Name = "WebsiteName")]
        public string WebsiteName { get; set; }

        [CsvColumn(Name = "PageURL")]
        public string PageUrl { get; set; }

        [CsvColumn(Name = "PageSurfTime")]
        public DateTime PageSurfTime { get; set; }
        [CsvColumn(Name = "PageIP")]
        public string PageIP { get; set; }
        [CsvColumn(Name = "TCLASS")]
        public string TCLASS { get; set; }
        [CsvColumn(Name = "Success")]
        public string Success { get; set; }
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

        [CsvColumn(Name = "DnsIP")]
        public string DnsIP { get; set; }

        [CsvColumn(Name = "Source")]
        public string Source { get; set; }

        [CsvColumn(Name = "FirstByteDelay")]
        public int FirstByteDelay { get; set; }

        [CsvColumn(Name = "PageOpenDelay")]
        public int PageOpenDelay { get; set; }

        [CsvColumn(Name = "RRCsetupDelay")]
        public string RRCsetupDelay { get; set; }

        [CsvColumn(Name = "Extra")]
        public string Extra { get; set; }

        [CsvColumn(Name = "DnsDelay")]
        public int DnsDelay { get; set; }

        [CsvColumn(Name = "ConnDelay")]
        public string ConnectionDelayString { get; set; }

        [CsvColumn(Name = "ReqDelay")]
        public string RequestDelayString { get; set; }

        [CsvColumn(Name = "ResDelay")]
        public string ResponseDelayString { get; set; }

        [CsvColumn(Name = "PageSize")]
        public double PageSize { get; set; }

        [CsvColumn(Name = "PageAvgSpeed")]
        public double PageAvgSpeed { get; set; }
    }
}