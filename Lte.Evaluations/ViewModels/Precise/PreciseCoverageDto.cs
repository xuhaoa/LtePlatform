using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Wireless;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.ViewModels.Precise
{
    [AutoMapTo(typeof(PreciseWorkItemCell))]
    public class PreciseCoverageDto : ILteCellQuery
    {
        public int ENodebId { get; set; }

        public byte SectorId { get; set; }

        public double WeakCoverageRate { get; set; }

        public double OverCoverageRate { get; set; }
    }
}