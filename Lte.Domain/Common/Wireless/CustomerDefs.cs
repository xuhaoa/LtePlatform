using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lte.Domain.Common.Wireless
{
    [EnumTypeDescription(typeof(DemandLevel), LevelB)]
    public enum DemandLevel : byte
    {
        LevelA,
        LevelB,
        LevelC
    }

    [EnumTypeDescription(typeof(VehicleType), CPlusL)]
    public enum VehicleType : short
    {
        CdmaHuawei,
        CdmaZte,
        CdmaAl,
        PhsUt,
        PhsZte,
        SatelliteC,
        SatelliteKu,
        Flyaway,
        Electirc1000Kw,
        Electirc200Kw,
        Electric60Kw,
        SoftSwitch,
        LittleYouji,
        LittleMicrowave,
        MarineVstat,
        EmergencyVstat,
        Broadcast,
        CPlusL
    }

    [EnumTypeDescription(typeof(NetworkType), With2G3G4G)]
    public enum NetworkType : byte
    {
        With4G,
        With2G3G4G,
        With2G3G,
        With2G,
        With3G,
        With2G3G4G4GPlus
    }

    [EnumTypeDescription(typeof(MarketTheme), OpenChannel)]
    public enum MarketTheme : byte
    {
        ElectricGauge,
        OpenChannel,
        HappyNewYear,
        CollegeSpring,
        CollegeAutumn,
        Others
    }
}
