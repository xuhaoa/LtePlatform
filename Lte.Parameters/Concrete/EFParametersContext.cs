﻿using Abp.EntityFramework;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.College;
using Lte.Parameters.Entities.Kpi;
using Lte.Parameters.Entities.Neighbor;
using Lte.Parameters.Entities.Work;
using System.Data.Entity;

namespace Lte.Parameters.Concrete
{
    public class EFParametersContext : AbpDbContext
    {
        public EFParametersContext() : base("EFParametersContext")
        {
        }

        public DbSet<Town> Towns { get; set; }

        public DbSet<OptimizeRegion> OptimizeRegions { get; set; }

        public DbSet<CollegeInfo> CollegeInfos { get; set; }

        public DbSet<InfrastructureInfo> InfrastructureInfos { get; set; }

        public DbSet<AlarmStat> AlarmStats { get; set; }

        public DbSet<ENodeb> ENodebs { get; set; }

        public DbSet<CdmaBts> Btss { get; set; }

        public DbSet<Cell> Cells { get; set; }

        public DbSet<CdmaCell> CdmaCells { get; set; }

        public DbSet<IndoorDistribution> IndoorDistributions { get; set; }

        public DbSet<PreciseCoverage4G> PrecisCoverage4Gs { get; set; }

        public DbSet<TownPreciseCoverage4GStat> TownPreciseCoverage4GStats { get; set; }

        public DbSet<LteNeighborCell> LteNeighborCells { get; set; }

        public DbSet<NearestPciCell> NearestPciCells { get; set; }

        public DbSet<WorkItem> WorkItems { get; set; }

        public DbSet<InterferenceMatrixStat> InterferenceMatrices { get; set; }
        

    }
}
