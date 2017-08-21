using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common;
using MongoDB.Bson;

namespace Lte.Parameters.Entities.Switch
{
    public class InterFreqHoGroup : IEntity<ObjectId>, IHuaweiCellMongo
    {
        public ObjectId Id { get; set; }

        public bool IsTransient()
        {
            return false;
        }

        public string iDate { get; set; }

        public int eNodeB_Id { get; set; }

        public string eNodeBId_Name { get; set; }

        public int InterFreqHoA1ThdRsrq { get; set; }

        public int FreqPriInterFreqHoA1ThdRsrp { get; set; }

        public int LocalCellId { get; set; }

        public int FreqPriInterFreqHoA1ThdRsrq { get; set; }

        public int InterFreqMlbA1A2ThdRsrp { get; set; }

        public int InterFreqHoA5Thd1Rsrq { get; set; }

        public int InterFreqHoA4Hyst { get; set; }

        public int SrvReqHoA4ThdRsrp { get; set; }

        public int InterFreqHoA1ThdRsrp { get; set; }

        public int InterFreqHoA1A2Hyst { get; set; }

        public int InterFreqHoGroupId { get; set; }

        public int UlHeavyTrafficMlbA4ThdRsrp { get; set; }

        public int InterFreqHoA4TimeToTrig { get; set; }

        public int FreqPriInterFreqHoA2ThdRsrp { get; set; }

        public int A3InterFreqHoA2ThdRsrp { get; set; }

        public int InterFreqLoadBasedHoA4ThdRsrq { get; set; }

        public int FreqPriInterFreqHoA2ThdRsrq { get; set; }

        public int UlBadQualHoA4Offset { get; set; }

        public int UlHeavyTrafficMlbA4ThdRsrq { get; set; }

        public int A3InterFreqHoA2ThdRsrq { get; set; }

        public int A3InterFreqHoA1ThdRsrp { get; set; }

        public int InterFreqHoA3Offset { get; set; }

        public int InterFreqHoA1A2TimeToTrig { get; set; }

        public int InterFreqHoA4ThdRsrp { get; set; }

        public int MlbInterFreqHoA5Thd1Rsrp { get; set; }

        public int MlbInterFreqHoA5Thd1Rsrq { get; set; }

        public int InterFreqHoA2ThdRsrq { get; set; }

        public int A3InterFreqHoA1ThdRsrq { get; set; }

        public int InterFreqHoA4ThdRsrq { get; set; }

        public int InterFreqLoadBasedHoA4ThdRsrp { get; set; }

        public int InterFreqHoA5Thd1Rsrp { get; set; }

        public int SrvReqHoA4ThdRsrq { get; set; }

        public int InterFreqHoA2ThdRsrp { get; set; }
    }

    [AutoMapFrom(typeof(UeEUtranMeasurementZte), typeof(InterFreqHoGroup))]
    public class InterFreqEventA1 : IHoEventView
    {
        [AutoMapPropertyResolve("hysteresis", typeof(UeEUtranMeasurementZte))]
        [AutoMapPropertyResolve("InterFreqHoA1A2Hyst", typeof(InterFreqHoGroup))]
        public int Hysteresis { get; set; }

        [AutoMapPropertyResolve("timeToTrigger", typeof(UeEUtranMeasurementZte))]
        [AutoMapPropertyResolve("InterFreqHoA1A2TimeToTrig", typeof(InterFreqHoGroup))]
        public int TimeToTrigger { get; set; }

        [AutoMapPropertyResolve("thresholdOfRSRP", typeof(UeEUtranMeasurementZte))]
        public int ThresholdOfRsrp { get; set; }

        [AutoMapPropertyResolve("thresholdOfRSRQ", typeof(UeEUtranMeasurementZte))]
        public int ThresholdOfRsrq { get; set; }
    }

    [AutoMapFrom(typeof(UeEUtranMeasurementZte), typeof(InterFreqHoGroup))]
    public class InterFreqEventA2 : IHoEventView
    {
        [AutoMapPropertyResolve("hysteresis", typeof(UeEUtranMeasurementZte))]
        [AutoMapPropertyResolve("InterFreqHoA1A2Hyst", typeof(InterFreqHoGroup))]
        public int Hysteresis { get; set; }

        [AutoMapPropertyResolve("timeToTrigger", typeof(UeEUtranMeasurementZte))]
        [AutoMapPropertyResolve("InterFreqHoA1A2TimeToTrig", typeof(InterFreqHoGroup))]
        public int TimeToTrigger { get; set; }

        [AutoMapPropertyResolve("thresholdOfRSRP", typeof(UeEUtranMeasurementZte))]
        public int ThresholdOfRsrp { get; set; }

        [AutoMapPropertyResolve("thresholdOfRSRQ", typeof(UeEUtranMeasurementZte))]
        public int ThresholdOfRsrq { get; set; }
    }

    [AutoMapFrom(typeof(UeEUtranMeasurementZte), typeof(InterFreqHoGroup))]
    public class InterFreqEventA3 : IHoEventView
    {
        [AutoMapPropertyResolve("hysteresis", typeof(UeEUtranMeasurementZte))]
        public int Hysteresis { get; set; }

        [AutoMapPropertyResolve("timeToTrigger", typeof(UeEUtranMeasurementZte))]
        public int TimeToTrigger { get; set; }

        [AutoMapPropertyResolve("a3Offset", typeof(UeEUtranMeasurementZte))]
        [AutoMapPropertyResolve("InterFreqHoA3Offset", typeof(InterFreqHoGroup))]
        public int A3Offset { get; set; }
    }

    [AutoMapFrom(typeof(UeEUtranMeasurementZte), typeof(InterFreqHoGroup))]
    public class InterFreqEventA4 : IHoEventView
    {
        [AutoMapPropertyResolve("hysteresis", typeof(UeEUtranMeasurementZte))]
        [AutoMapPropertyResolve("InterFreqHoA4Hyst", typeof(InterFreqHoGroup))]
        public int Hysteresis { get; set; }

        [AutoMapPropertyResolve("timeToTrigger", typeof(UeEUtranMeasurementZte))]
        [AutoMapPropertyResolve("InterFreqHoA4TimeToTrig", typeof(InterFreqHoGroup))]
        public int TimeToTrigger { get; set; }

        [AutoMapPropertyResolve("thresholdOfRSRP", typeof(UeEUtranMeasurementZte))]
        [AutoMapPropertyResolve("InterFreqHoA4ThdRsrp", typeof(InterFreqHoGroup))]
        public int ThresholdOfRsrp { get; set; }

        [AutoMapPropertyResolve("thresholdOfRSRQ", typeof(UeEUtranMeasurementZte))]
        [AutoMapPropertyResolve("InterFreqHoA4ThdRsrq", typeof(InterFreqHoGroup))]
        public int ThresholdOfRsrq { get; set; }
    }

    [AutoMapFrom(typeof(UeEUtranMeasurementZte), typeof(InterFreqHoGroup))]
    public class InterFreqEventA5 : IHoEventView
    {
        [AutoMapPropertyResolve("hysteresis", typeof(UeEUtranMeasurementZte))]
        [AutoMapPropertyResolve("InterFreqHoA4Hyst", typeof(InterFreqHoGroup))]
        public int Hysteresis { get; set; }

        [AutoMapPropertyResolve("timeToTrigger", typeof(UeEUtranMeasurementZte))]
        [AutoMapPropertyResolve("InterFreqHoA4TimeToTrig", typeof(InterFreqHoGroup))]
        public int TimeToTrigger { get; set; }

        [AutoMapPropertyResolve("thresholdOfRSRP", typeof(UeEUtranMeasurementZte))]
        [AutoMapPropertyResolve("InterFreqHoA4ThdRsrp", typeof(InterFreqHoGroup))]
        public int ThresholdOfRsrp { get; set; }

        [AutoMapPropertyResolve("thresholdOfRSRQ", typeof(UeEUtranMeasurementZte))]
        [AutoMapPropertyResolve("InterFreqHoA4ThdRsrq", typeof(InterFreqHoGroup))]
        public int ThresholdOfRsrq { get; set; }

        [AutoMapPropertyResolve("a5Threshold2OfRSRP", typeof(UeEUtranMeasurementZte))]
        [AutoMapPropertyResolve("InterFreqHoA5Thd1Rsrp", typeof(InterFreqHoGroup))]
        public int Threshold2OfRsrp { get; set; }

        [AutoMapPropertyResolve("a5Threshold2OfRSRQ", typeof(UeEUtranMeasurementZte))]
        [AutoMapPropertyResolve("InterFreqHoA5Thd1Rsrq", typeof(InterFreqHoGroup))]
        public int Threshold2OfRsrq { get; set; }
    }

    public class CellInterFreqHoView
    {
        public int Earfcn { get; set; }

        public int InterFreqHoEventType { get; set; }

        public InterFreqEventA1 InterFreqEventA1 { get; set; }

        public InterFreqEventA2 InterFreqEventA2 { get; set; }

        public InterFreqEventA3 InterFreqEventA3 { get; set; }

        public InterFreqEventA4 InterFreqEventA4 { get; set; }

        public InterFreqEventA5 InterFreqEventA5 { get; set; }
    }
}
