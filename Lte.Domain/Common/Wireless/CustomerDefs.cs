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
        Unknown,
        Malfunction,
        Praise,
        Bill,
        InterComm,
        Appliance,
        Service,
        Network
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
        Unknown,
        Juminzhuzhai,
        Shangwubangong,
        Shangyequ,
        Zhuzhaiqu,
        Gongyequ,
        OldZhuzhai,
        NewZhuzhai,
        ShangwuChangsuo,
        LowZhuzhai,
        HighZhuzhai,
        Jiaoyisuo
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
        Unknown,
        NetworkQuality,
        Bill,
        ForeignRoam,
        CustomerSuggestion,
        ProvinceRoam,
        CityRoam,
        Service
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
        Others,
        CallDrop,
        UnderConstruction,
        BillProblem,
        NoCoverage,
        PoorCoverage,
        Normal
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
        Others,
        DenseUrban,
        Urban,
        Suburban,
        Rural
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
        ShortMessage,
        WeakCoverage,
        DeepCoverage
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

    public class SolveFunctionDescriptionTransform : DescriptionTransform<SolveFunction>
    {
        
    }

    public class SolveFunctionTransform : EnumTransform<SolveFunction>
    {
        public SolveFunctionTransform() : base(SolveFunction.Others)
        {
        }
    }

    [EnumTypeDescription(typeof(AlarmType), Others)]
    public enum AlarmType : short
    {
        CeNotEnough,//0
        StarUnlocked,
        TrunkProblem,
        RssiProblem,
        CellDown,//4
        VswrProblem,
        VswrLte,
        Unimportant,
        LinkBroken,
        X2Broken,
        X2UserPlane,//10
        S1Broken,
        S1UserPlane,
        EthernetBroken,
        LteCellDown,
        LteCellError,//15
        SuperCellDown,
        ENodebDown,
        GnssStar,
        GnssFeed,
        PaDeactivate,//20
        RruBroken,
        RxChannel,
        SntpFail,
        VersionError,
        InitializationError,//25
        BoardInexist,
        BoardInitialize,
        BoardPowerDown,
        BoardCommunication,
        BoardSoftId,//30
        FiberReceiver,
        FiberModule,
        BbuInitialize,
        Temperature,
        FanTemperature,//35
        NoClock,
        InnerError,
        SoftwareAbnormal,
        ApparatusPowerDown,
        InputVolte,//40
        OuterApparatus,
        ParametersConfiguation,
        BadPerformance,//43
        Others,
        DatabaseDelay,
        PciCrack,//46
        RruRtwp,
        BbuCpriInterface,
        BbuCpriLost,
        EletricAntenna,
        RfAld,
        RruCpriInterface,
        RruInterfacePerformance,
        RruPowerDown,
        RruRtwpUnbalance,
        RruClock,
        RruOmcLink,
        ClockReference,
        Database,
        AntennaLink,
        UserPlane,
        RemoteOmc,
        LoginError,
        AnalogLoad
    }

    public class AlarmTypeDescriptionTransform : ValueResolver<AlarmType, string>
    {
        protected override string ResolveCore(AlarmType source)
        {
            return source.GetEnumDescription(WirelessPublic.AlarmTypeHuaweiList);
        }
    }

    public class AlarmTypeTransform : ValueResolver<string, AlarmType>
    {
        protected override AlarmType ResolveCore(string source)
        {
            return source.GetEnumType(WirelessPublic.AlarmTypeHuaweiList);
        }
    }

    public class AlarmZteTypeTransform : EnumTransform<AlarmType>
    {
        public AlarmZteTypeTransform() : base(AlarmType.Others)
        {
        }
    }

    [EnumTypeDescription(typeof(AlarmLevel), Others)]
    public enum AlarmLevel : byte
    {
        Serious,
        Primary,
        Secondary,
        Warning,
        Urgent,
        Important,
        Tips,
        Between100And105,
        Between105And110,
        Below110,
        Others,
        BadCoverageCompeteLose,
        BadCoverageCompeteWin,
        GoodCoverageCompeteLose,
        GoodCoverageCompeteWin
    }

    public class AlarmLevelDescriptionTransform : DescriptionTransform<AlarmLevel>
    {
        
    }

    public class AlarmLevelTransform : EnumTransform<AlarmLevel>
    {
        public AlarmLevelTransform() : base(AlarmLevel.Others)
        {
        }
    }

    [EnumTypeDescription(typeof(AlarmCategory), Qos)]
    public enum AlarmCategory : byte
    {
        Communication,
        Qos,
        ProcessError,
        Environment,
        Apparatus,
        Huawei,
        Others,
        Self,
        OverallCompete,
        MobileCompete,
        UnicomCompete
    }

    public class AlarmCategoryDescriptionTransform : DescriptionTransform<AlarmCategory>
    {
        
    }

    public class AlarmCategoryTransform : EnumTransform<AlarmCategory>
    {
        public AlarmCategoryTransform() : base(AlarmCategory.Huawei)
        {
        }
    }

    [EnumTypeDescription(typeof(OrderPreciseStatPolicy), OrderBySecondRate)]
    public enum OrderPreciseStatPolicy : byte
    {
        OrderBySecondRate,
        OrderBySecondNeighborsDescending,
        OrderByFirstRate,
        OrderByFirstNeighborsDescending,
        OrderByTotalMrsDescending,
        OrderByTopDatesDescending
    }

    public class OrderPreciseStatPolicyDescriptionTransform : DescriptionTransform<OrderPreciseStatPolicy>
    {
        
    }

    public class OrderPreciseStatPolicyTransform : EnumTransform<OrderPreciseStatPolicy>
    {
        public OrderPreciseStatPolicyTransform() : base(OrderPreciseStatPolicy.OrderBySecondRate)
        {
        }
    }

    [EnumTypeDescription(typeof(OrderTopConnection3GPolicy), OrderByConnectionRate)]
    public enum OrderTopConnection3GPolicy
    {
        OrderByConnectionFailsDescending,
        OrderByConnectionRate,
        OrderByTopDatesDescending
    }

    public class OrderTopConnection3GPolicyDescriptionTransform : DescriptionTransform<OrderTopConnection3GPolicy>
    {
        
    }

    public class OrderTopConnection3GPolicyTransform : EnumTransform<OrderTopConnection3GPolicy>
    {
        public OrderTopConnection3GPolicyTransform() : base(OrderTopConnection3GPolicy.OrderByConnectionRate)
        {
        }
    }

    [EnumTypeDescription(typeof(OrderTopDrop2GPolicy), OrderByDropRateDescending)]
    public enum OrderTopDrop2GPolicy
    {
        OrderByDropsDescending,
        OrderByDropRateDescending,
        OrderByTopDatesDescending
    }

    public class OrderTopDrop2GPolicyDescriptionTransform : DescriptionTransform<OrderTopDrop2GPolicy>
    {
        
    }

    public class OrderTopDrop2GPolicyTransform : EnumTransform<OrderTopDrop2GPolicy>
    {
        public OrderTopDrop2GPolicyTransform() : base(OrderTopDrop2GPolicy.OrderByDropRateDescending)
        {
        }
    }

    [EnumTypeDescription(typeof(WorkItemType), Others)]
    public enum WorkItemType : byte
    {
        Kpi2G,
        Kpi4G,
        Infrastructure4G,
        Interference4G,
        RrcConnection,
        NetworkProblem,
        Others,
        DailyTask,
        DailyReport,
        Yilutong,
        KeySite,
        SelfConstruction
    }

    public class WorkItemTypeDescriptionTransform : DescriptionTransform<WorkItemType>
    {
        
    }

    public class WorkItemTypeTransform : EnumTransform<WorkItemType>
    {
        public WorkItemTypeTransform() : base(WorkItemType.Others)
        {
        }
    }

    [EnumTypeDescription(typeof(WorkItemSubtype), Others)]
    public enum WorkItemSubtype : short
    {
        Drop2G,
        CallSetup,
        PrbUplinkInterference,
        PrbUplinkSevereInterference,
        Rssi,
        DataMaintainence,
        ErabDrop,
        ErabConnection,
        RrcConnection,
        PreciseRate,
        UplinkInterference,
        UplinkSevereInterference,
        Others,
        AutomaticDt,
        ResourceOptimize,
        ProjectOptimization,
        CommunicationSustain,
        OptimizationWorkItem,
        KpiAlarm,
        RectifyDemand,
        NetworkPlan,
        SpecialData,
        Dispossessed,
        ParameterCheck,
        ClusterRf,
        CoverageEvaluation,
        InterferenceCheck,
        EngineeringOptimization,
        PlanDemandLibrary,
        EngineeringParameters,
        MarketSustain,
        CapacityEvaluation,
        CustomerComplain,
        WeeklyAnalysis,
        DailyTest
    }

    public class WorkItemSubtypeDescriptionTransform : DescriptionTransform<WorkItemSubtype>
    {
        
    }

    public class WorkItemSubtypeTransform : EnumTransform<WorkItemSubtype>
    {
        public WorkItemSubtypeTransform() : base(WorkItemSubtype.Others)
        {
        }
    }

    [EnumTypeDescription(typeof(WorkItemState), ToBeSigned)]
    public enum WorkItemState : byte
    {
        Processing,
        Processed,
        Finished,
        ToBeSigned,
        Auditing
    }

    public class WorkItemStateDescriptionTransform : DescriptionTransform<WorkItemState>
    {
        
    }

    public class WorkItemStateTransform : EnumTransform<WorkItemState>
    {
        public WorkItemStateTransform() : base(WorkItemState.ToBeSigned)
        {
        }
    }

    [EnumTypeDescription(typeof(WorkItemCause), Others)]
    public enum WorkItemCause : short
    {
        Rssi,
        ParameterConfig,
        TrunkProblem,
        PilotPolution,
        Overload,
        InterferenceCoverage,
        ImproperPower,
        FeedAppliance,
        NeighborCell,
        Others,
        WeakCoverage,
        ApplianceProblem,
        IndoorDistribution,
        AntennaFeedline,
        Antenna,
        OuterInterference,
        WrongDownTilt,
        PagingChannelBusy,
        HardSwitch,
        Jamming,
        OverCoverage,
        InvisibleAlarm,
        MainAlarm,
        ResouceJamming
    }

    public class WorkItemCauseDescriptionTransform : DescriptionTransform<WorkItemCause>
    {
        
    }

    public class WorkItemCauseTransform : EnumTransform<WorkItemCause>
    {
        public WorkItemCauseTransform() : base(WorkItemCause.Others)
        {
        }
    }
}
