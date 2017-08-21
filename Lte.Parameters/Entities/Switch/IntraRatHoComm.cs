using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common;
using MongoDB.Bson;

namespace Lte.Parameters.Entities.Switch
{
    public class IntraRatHoComm : IEntity<ObjectId>, IHuaweiMongo
    {
        public ObjectId Id { get; set; }

        public bool IsTransient()
        {
            return false;
        }

        public string iDate { get; set; }

        public int eNodeB_Id { get; set; }

        public string eNodeBId_Name { get; set; }

        public int IntraFreqHoRprtInterval { get; set; }

        public int IntraRatHoRprtAmount { get; set; }

        public int FreqPriInterFreqHoA1TrigQuan { get; set; }

        public int IntraRatHoMaxRprtCell { get; set; }

        public int InterFreqHoA4RprtQuan { get; set; }

        public int InterFreqHoA4TrigQuan { get; set; }

        public int CovBasedIfHoWaitingTimer { get; set; }

        public int IntraFreqHoA3TrigQuan { get; set; }

        public int InterFreqHoA1A2TrigQuan { get; set; }

        public int objId { get; set; }

        public int InterFreqHoRprtInterval { get; set; }

        public int A3InterFreqHoA1A2TrigQuan { get; set; }

        public int IntraFreqHoA3RprtQuan { get; set; }
    }

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

}
