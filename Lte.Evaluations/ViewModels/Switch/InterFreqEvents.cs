using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Parameters.Entities.Switch;

namespace Lte.Evaluations.ViewModels.Switch
{
    public interface IHoEventView
    {
        int Hysteresis { get; set; }

        int TimeToTrigger { get; set; }
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
}
