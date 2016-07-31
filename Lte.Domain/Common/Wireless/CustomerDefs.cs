using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace Lte.Domain.Common.Wireless
{
    public abstract class DescriptionTransform<TEnum> : ValueResolver<TEnum, string>
        where TEnum : struct 
    {
        protected override string ResolveCore(TEnum source)
        {
            return source.GetEnumDescription();
        }
    }

    public abstract class EnumTransform<TEnum> : ValueResolver<string, TEnum>
        where TEnum : struct
    {
        private readonly TEnum _defaultEnum;

        protected EnumTransform(TEnum defaultEnum)
        {
            _defaultEnum = defaultEnum;
        } 

        protected override TEnum ResolveCore(string source)
        {
            return string.IsNullOrEmpty(source) ? _defaultEnum : source.GetEnumType<TEnum>();
        }
    }

    [EnumTypeDescription(typeof(DemandLevel), LevelB)]
    public enum DemandLevel : byte
    {
        LevelA,
        LevelB,
        LevelC
    }

    public class DemandLevelDescriptionTransform : DescriptionTransform<DemandLevel>
    {
    }

    public class DemandLevelTransform : EnumTransform<DemandLevel>
    {
        public DemandLevelTransform() : base(DemandLevel.LevelB)
        {
        }
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

    public class VehicularTypeDescriptionTransform : DescriptionTransform<VehicleType>
    {
        
    }

    public class VehicularTypeTransform : EnumTransform<VehicleType>
    {
        public VehicularTypeTransform() : base(VehicleType.CPlusL)
        {
        }
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

    public class NetworkTypeDescritionTransform : DescriptionTransform<NetworkType>
    {
        
    }

    public class NetworkTypeTransform : EnumTransform<NetworkType>
    {
        public NetworkTypeTransform() : base(NetworkType.With2G3G4G)
        {
        }
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

    public class MarketThemeDescriptionTransform : DescriptionTransform<MarketTheme>
    {
        
    }

    public class MarketThemeTransform : EnumTransform<MarketTheme>
    {
        public MarketThemeTransform() : base(MarketTheme.OpenChannel)
        {
        }
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

    public class EmergencyStateDescriptionTransform : DescriptionTransform<EmergencyState>
    {
        
    }

    public class EmergencyStateTransform : EnumTransform<EmergencyState>
    {
        public EmergencyStateTransform() : base(EmergencyState.Begin)
        {
        }
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

    public class VipStateDescriptionTransform : DescriptionTransform<VipState>
    {
        
    }

    public class VipStateTransform : EnumTransform<VipState>
    {
        public VipStateTransform() : base(VipState.Begin)
        {
        }
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

    public class ComplainStateDescriptionTransform : DescriptionTransform<ComplainState>
    {
        
    }

    public class ComplainStateTransform : EnumTransform<ComplainState>
    {
        public ComplainStateTransform() : base(ComplainState.Begin)
        {
        }
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

    public class ComplainSourceDescriptionTransform : DescriptionTransform<ComplainSource>
    {
        
    }

    public class ComplainSourceTransform : EnumTransform<ComplainSource>
    {
        public ComplainSourceTransform() : base(ComplainSource.Unknown)
        {
        }
    }

    [EnumTypeDescription(typeof(CustomerType), Unknown)]
    public enum CustomerType : byte
    {
        Individual,
        Family,
        Company,
        Unknown
    }

    public class CustomerTypeDescriptionTransform : DescriptionTransform<CustomerType>
    {
        
    }

    public class CustomerTypeTransform : EnumTransform<CustomerType>
    {
        public CustomerTypeTransform(CustomerType defaultEnum) : base(defaultEnum)
        {
        }
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

    public class ComplainReasonDescriptionTransform : DescriptionTransform<ComplainReason>
    {
        
    }

    public class ComplainReasonTransform : EnumTransform<ComplainReason>
    {
        public ComplainReasonTransform() : base(ComplainReason.Unknown)
        {
        }
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

    public class ComplainSubReasonDescriptionTransform : DescriptionTransform<ComplainSubReason>
    {
        
    }

    public class ComplainSubReasonTransform : EnumTransform<ComplainSubReason>
    {
        public ComplainSubReasonTransform() : base(ComplainSubReason.Others)
        {
        }
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

    public class ComplainSceneDescriptionTransform : DescriptionTransform<ComplainScene>
    {
        
    }

    public class ComplainSceneTransform : EnumTransform<ComplainScene>
    {
        public ComplainSceneTransform() : base(ComplainScene.Others)
        {
        }
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

    public class ComplainCategoryDescriptionTransform : DescriptionTransform<ComplainCategory>
    {
        
    }

    public class ComplainCategoryTransform : EnumTransform<ComplainCategory>
    {
        public ComplainCategoryTransform() : base(ComplainCategory.Others)
        {
        }
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
