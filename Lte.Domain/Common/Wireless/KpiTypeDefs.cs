using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lte.Domain.Common.Wireless
{
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

    [EnumTypeDescription(typeof(OrderTopConnection3GPolicy), OrderByConnectionRate)]
    public enum OrderTopConnection3GPolicy
    {
        OrderByConnectionFailsDescending,
        OrderByConnectionRate,
        OrderByTopDatesDescending
    }

    [EnumTypeDescription(typeof(OrderTopDrop2GPolicy), OrderByDropRateDescending)]
    public enum OrderTopDrop2GPolicy
    {
        OrderByDropsDescending,
        OrderByDropRateDescending,
        OrderByTopDatesDescending
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

    [EnumTypeDescription(typeof(WorkItemState), ToBeSigned)]
    public enum WorkItemState : byte
    {
        Processing,
        Processed,
        Finished,
        ToBeSigned,
        Auditing
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
}
