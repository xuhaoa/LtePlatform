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
            return string.IsNullOrEmpty(source) ? AntennaPortsConfigure.Antenna2T4R : source.ToUpper().GetEnumType<AntennaPortsConfigure>();
        }
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

    [EnumTypeDescription(typeof(AntennaFactory), Unkown)]
    public enum AntennaFactory : byte
    {
        Rfs,
        Andrew,
        Anjiexin,
        Guoren,
        Jingxin,
        Indoor,
        Unkown
    }

    public class AntennaFactoryTransform : EnumTransform<AntennaFactory>
    {
        public AntennaFactoryTransform() : base(AntennaFactory.Unkown)
        {
        }
    }
}
