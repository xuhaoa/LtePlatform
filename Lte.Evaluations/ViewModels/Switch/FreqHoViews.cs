using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Parameters.Entities.Switch;

namespace Lte.Evaluations.ViewModels.Switch
{
    [AutoMapFrom(typeof(IntraRatHoComm), typeof(UeEUtranMeasurementZte))]
    public class ENodebIntraFreqHoView
    {
        [AutoMapPropertyResolve("eNodeB_Id", typeof(IntraRatHoComm))]
        [AutoMapPropertyResolve("eNodeB_Id", typeof(UeEUtranMeasurementZte))]
        public int ENodebId { get; set; }

        [AutoMapPropertyResolve("IntraFreqHoRprtInterval", typeof(IntraRatHoComm))]
        [AutoMapPropertyResolve("reportInterval", typeof(UeEUtranMeasurementZte))]
        public int ReportInterval { get; set; }

        [AutoMapPropertyResolve("IntraRatHoRprtAmount", typeof(IntraRatHoComm))]
        [AutoMapPropertyResolve("reportAmount", typeof(UeEUtranMeasurementZte))]
        public int ReportAmount { get; set; }

        [AutoMapPropertyResolve("IntraRatHoMaxRprtCell", typeof(IntraRatHoComm))]
        [AutoMapPropertyResolve("maxReportCellNum", typeof(UeEUtranMeasurementZte))]
        public int MaxReportCellNum { get; set; }

        [AutoMapPropertyResolve("IntraFreqHoA3TrigQuan", typeof(IntraRatHoComm))]
        [AutoMapPropertyResolve("triggerQuantity", typeof(UeEUtranMeasurementZte))]
        public int TriggerQuantity { get; set; }

        [AutoMapPropertyResolve("IntraFreqHoA3RprtQuan", typeof(IntraRatHoComm))]
        [AutoMapPropertyResolve("reportQuantity", typeof(UeEUtranMeasurementZte))]
        public int ReportQuantity { get; set; }
    }

    [AutoMapFrom(typeof(IntraRatHoComm))]
    public class ENodebInterFreqHoView
    {
        [AutoMapPropertyResolve("eNodeB_Id", typeof(IntraRatHoComm))]
        public int ENodebId { get; set; }
        
        public int InterFreqHoA4RprtQuan { get; set; }

        public int InterFreqHoA4TrigQuan { get; set; }

        [AutoMapPropertyResolve("InterFreqHoA1A2TrigQuan", typeof(IntraRatHoComm))]
        public int InterFreqHoA1TrigQuan { get; set; }

        [AutoMapPropertyResolve("InterFreqHoA1A2TrigQuan", typeof(IntraRatHoComm))]
        public int InterFreqHoA2TrigQuan { get; set; }
        
        public int InterFreqHoRprtInterval { get; set; }

        [AutoMapPropertyResolve("A3InterFreqHoA1A2TrigQuan", typeof(IntraRatHoComm))]
        public int A3InterFreqHoA1TrigQuan { get; set; }

        [AutoMapPropertyResolve("A3InterFreqHoA1A2TrigQuan", typeof(IntraRatHoComm))]
        public int A3InterFreqHoA2TrigQuan { get; set; }
    }

    [AutoMapFrom(typeof(IntraFreqHoGroup), typeof(UeEUtranMeasurementZte))]
    public class CellIntraFreqHoView : IHoEventView
    {
        [AutoMapPropertyResolve("eNodeB_Id", typeof(IntraFreqHoGroup))]
        [AutoMapPropertyResolve("eNodeB_Id", typeof(UeEUtranMeasurementZte))]
        public int ENodebId { get; set; }

        public int SectorId { get; set; }

        [AutoMapPropertyResolve("IntraFreqHoA3Hyst", typeof(IntraFreqHoGroup))]
        [AutoMapPropertyResolve("hysteresis", typeof(UeEUtranMeasurementZte), typeof(DoubleTransform))]
        public int Hysteresis { get; set; }

        [AutoMapPropertyResolve("IntraFreqHoA3TimeToTrig", typeof(IntraFreqHoGroup))]
        [AutoMapPropertyResolve("timeToTrigger", typeof(UeEUtranMeasurementZte))]
        public int TimeToTrigger { get; set; }

        [AutoMapPropertyResolve("IntraFreqHoA3Offset", typeof(IntraFreqHoGroup))]
        [AutoMapPropertyResolve("a3Offset", typeof(UeEUtranMeasurementZte), typeof(DoubleTransform))]
        public int A3Offset { get; set; }
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
