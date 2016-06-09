using System.Data.Entity;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities;

namespace Lte.Parameters.Concrete.Infrastructure
{
    public class EFIndoorDistributionRepository
        : LightWeightRepositroyBase<IndoorDistribution>, IIndoorDistributionRepository
    {
        protected override DbSet<IndoorDistribution> Entities => context.IndoorDistributions;
    }
}
