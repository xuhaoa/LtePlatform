using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common;
using MongoDB.Bson;

namespace Lte.Parameters.Entities.Switch
{
    public interface IHoEventView
    {
        int Hysteresis { get; set; }

        int TimeToTrigger { get; set; }
    }

    public class IntraFreqHoGroup : IEntity<ObjectId>, IHuaweiCellMongo
    {
        public ObjectId Id { get; set; }

        public bool IsTransient()
        {
            return false;
        }

        public int IntraFreqHoA3Hyst { get; set; }

        public int IntraFreqHoA3TimeToTrig { get; set; }

        public int LocalCellId { get; set; }

        public int IntraFreqHoA3Offset { get; set; }

        public string iDate { get; set; }

        public int eNodeB_Id { get; set; }

        public string eNodeBId_Name { get; set; }

        public int IntraFreqHoGroupId { get; set; }

        public int? HighSpeedA3TimeToTrig { get; set; }
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
}
