using System.Collections.Generic;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Wireless;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.ViewModels.Precise
{
    public interface IPreciseWorkItemDto<TLteCellId>
        where TLteCellId : class, ILteCellQuery, new()
    {
        List<TLteCellId> Items { get; set; }

        string WorkItemNumber { get; set; }
    }

    [AutoMapTo(typeof(PreciseWorkItemCell))]
    public class PreciseInterferenceNeighborDto : ILteCellQuery
    {
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public double Db6Share { get; set; }

        public double Db10Share { get; set; }

        public double Mod3Share { get; set; }

        public double Mod6Share { get; set; }
    }

    public class PreciseInterferenceNeighborsContainer : IPreciseWorkItemDto<PreciseInterferenceNeighborDto>
    {
        public List<PreciseInterferenceNeighborDto> Items { get; set; }

        public string WorkItemNumber { get; set; }
    }

    [AutoMapTo(typeof(PreciseWorkItemCell))]
    public class PreciseInterferenceVictimDto : ILteCellQuery
    {
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public double BackwardDb6Share { get; set; }

        public double BackwardDb10Share { get; set; }

        public double BackwardMod3Share { get; set; }

        public double BackwardMod6Share { get; set; }
    }

    public class PreciseInterferenceVictimsContainer : IPreciseWorkItemDto<PreciseInterferenceVictimDto>
    {
        public List<PreciseInterferenceVictimDto> Items { get; set; }

        public string WorkItemNumber { get; set; }
    }

    [AutoMapTo(typeof(PreciseWorkItemCell))]
    public class PreciseCoverageDto : ILteCellQuery
    {
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public double WeakCoverageRate { get; set; }

        public double OverCoverageRate { get; set; }
    }

    public class PreciseCoveragesContainer : IPreciseWorkItemDto<PreciseCoverageDto>
    {
        public List<PreciseCoverageDto> Items { get; set; }

        public string WorkItemNumber { get; set; }
    }
}
