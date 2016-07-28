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
        CPlusL,
        LteHuawei,
        LteZte,
        LteEricsson
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

    [EnumTypeDescription(typeof(EmergencyState), Begin)]
    public enum EmergencyState : byte
    {
        Begin,
        Register,
        FiberBegin,
        ElectricPrepare,
        FiberFinish,
        VehicleInPlace,
        VehicleInService,
        Test,
        Finish
    }

    [EnumTypeDescription(typeof(VipState), Begin)]
    public enum VipState : byte
    {
        Begin,
        Preprocessed,
        Test,
        TestEvaluation,
        NetworkOptimization,
        NewSite,
        EmergencyDemand,
        Conclusion
    }

    [EnumTypeDescription(typeof(ComplainState), Begin)]
    public enum ComplainState : byte
    {
        Begin,
        Preprocessed,
        PlanTest,
        Test,
        ProcessIssues,
        Feedback,
        Archive
    }

    [EnumTypeDescription(typeof(ComplainSource), Unknown)]
    public enum ComplainSource : byte
    {
        Number10000,
        Qq,
        Weixin,
        Voice,
        BranchService,
        Others,
        Wangting,
        Zhangting,
        Yingyeting,
        Unknown
    }

    [EnumTypeDescription(typeof(CustomerType), Unknown)]
    public enum CustomerType : byte
    {
        Individual,
        Family,
        Company,
        Unknown
    }

    [EnumTypeDescription(typeof(ComplainReason), Unknown)]
    public enum ComplainReason : byte
    {
        OutOfBuisiness,
        SubscriberProblem,
        OtherMalfunction,
        NetworkMalfunction,
        NetworkOptimize,
        UnConfirmed,
        BiqianMalfunction,
        NeedNewSite,
        CustomerReservation,
        Unknown
    }

    [EnumTypeDescription(typeof(ComplainSubReason), Others)]
    public enum ComplainSubReason : byte
    {
        Biqian,
        ParameterAdjust,
        OutOfBuisiness,
        NothingWithNetwork,
        BaseStationMalfunction,
        WrongDestination,
        OutInterference,
        ProjectNotBegin,
        UnableToConfirmCustomer,
        WuyeProblem,
        WrongReasonJustified,
        RecoverButUnknownReason,
        EmergencyOptimization,
        SubscriberFeeling,
        SubscriberTerminal,
        ReservationTest,
        Others
    }

    [EnumTypeDescription(typeof(ComplainScene), Others)]
    public enum ComplainScene : byte
    {
        BetweenCityAndVillage,
        VillageInCity,
        SubRailway,
        TransportationRoutine,
        College,
        CenterOfCity,
        ImportantRegion,
        Residential,
        Others
    }

    [EnumTypeDescription(typeof(ComplainCategory), Others)]
    public enum ComplainCategory : byte
    {
        LowSpeed3G,
        WeakCoverage3G,
        LowSpeed4G,
        WeakCoverage4G,
        BadQualityVoice,
        WeakCoverageVoice,
        Others,
        Voice,
        Web,
        ShortMessage
    }

    [EnumTypeDescription(typeof(SolveFunction), Others)]
    public enum SolveFunction : byte
    {
        NewSiteUnplanned,
        NewSitePlanned,
        NewRruUnplanned,
        NewRruPlanned,
        NewDistributionPlanned,
        NewDistributionUnplanned,
        NewRepeaterPlanned,
        NewRepeaterUnplanned,
        NewDoPlanned,
        NewDoUnplanned,
        DistributionExpansion,
        SubscriberTerminal,
        BtsMalfunction,
        DistributionMalfunction,
        RepeaterMalfunction,
        NetworkOptimization,
        SelfRecoverage,
        NormalTest,
        NoContact,
        Others
    }
}
