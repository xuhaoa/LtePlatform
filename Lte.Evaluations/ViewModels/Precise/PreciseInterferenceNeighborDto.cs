using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Wireless;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.ViewModels.Precise
{
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
}