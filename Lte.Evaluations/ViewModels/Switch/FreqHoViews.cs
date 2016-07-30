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
    [AutoMapFrom(typeof(IntraRatHoComm))]
    public class ENodebIntraFreqHoView
    {
        [AutoMapPropertyResolve("eNodeB_Id", typeof(IntraRatHoComm))]
        public int ENodebId { get; set; }

        [AutoMapPropertyResolve("IntraFreqHoRprtInterval", typeof(IntraRatHoComm))]
        public int ReportInterval { get; set; }

        [AutoMapPropertyResolve("IntraRatHoRprtAmount", typeof(IntraRatHoComm))]
        public int ReportAmount { get; set; }

        [AutoMapPropertyResolve("IntraRatHoMaxRprtCell", typeof(IntraRatHoComm))]
        public int MaxReportCellNum { get; set; }

        [AutoMapPropertyResolve("IntraFreqHoA3TrigQuan", typeof(IntraRatHoComm))]
        public int TriggerQuantity { get; set; }

        [AutoMapPropertyResolve("IntraFreqHoA3RprtQuan", typeof(IntraRatHoComm))]
        public int ReportQuantity { get; set; }
    }

    public class ENodebInterFreqHoView
    {
        public int ENodebId { get; set; }

        public int InterFreqHoA4RprtQuan { get; set; }

        public int InterFreqHoA4TrigQuan { get; set; }

        public int InterFreqHoA1TrigQuan { get; set; }

        public int InterFreqHoA2TrigQuan { get; set; }

        public int InterFreqHoRprtInterval { get; set; }

        public int A3InterFreqHoA1TrigQuan { get; set; }

        public int A3InterFreqHoA2TrigQuan { get; set; }
    }

    public class CellIntraFreqHoView : IHoEventView
    {
        public int ENodebId { get; set; }

        public int SectorId { get; set; }

        public int Hysteresis { get; set; }

        public int TimeToTrigger { get; set; }

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
