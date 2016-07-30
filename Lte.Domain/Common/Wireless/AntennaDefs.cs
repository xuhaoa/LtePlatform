using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace Lte.Domain.Common.Wireless
{
    [EnumTypeDescription(typeof(AntennaPortsConfigure), Antenna2T4R)]
    public enum AntennaPortsConfigure
    {
        Antenna2T2R,
        Antenna2T4R,
        Antenna1T1R,
        Antenna2T8R,
        Antenna4T4R
    }

    public class AntennaPortsConfigureTransform : ValueResolver<string, AntennaPortsConfigure>
    {
        protected override AntennaPortsConfigure ResolveCore(string source)
        {
            return source.ToUpper().GetEnumType<AntennaPortsConfigure>();
        }
    }

    public enum FrequencyBand : byte
    {
        Fdd2100 = 0,
        Fdd1800 = 1,
        Tdd2600 = 2
    }

    public enum FrequencyBandType
    {
        Downlink2100,

        Uplink2100,

        Downlink1800,

        Uplink1800,

        Tdd2600,

        Undefined
    }

    internal class FrequencyBandDef
    {
        public FrequencyBandType FrequencyBandType { get; set; }

        public int FcnStart { get; set; }

        public int FcnEnd { get; set; }

        public double FrequencyStart { get; set; }

        public double FrequencyEnd { get; set; }
    }
}
