﻿using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using Lte.Domain.Common;

namespace Lte.MySqlFramework.Concrete
{
    public class PreciseWorkItemCellRepositroy : EfRepositoryBase<MySqlContext, PreciseWorkItemCell>, IPreciseWorkItemCellRepository
    {
        public PreciseWorkItemCellRepositroy(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public List<PreciseWorkItemCell> GetAllList(string serialNumber)
        {
            return GetAllList(x => x.WorkItemNumber == serialNumber);
        }

        public PreciseWorkItemCell Get(string serialNumber, int eNodebId, byte sectorId)
        {
            return
                FirstOrDefault(x => x.WorkItemNumber == serialNumber && x.ENodebId == eNodebId && x.SectorId == sectorId);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class DownSwitchFlowRepository : EfRepositoryBase<MySqlContext, DownSwitchFlow>, IDownSwitchFlowRepository
    {
        public DownSwitchFlowRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public DownSwitchFlow Match(DownSwitchFlowExcel stat)
        {
            return FirstOrDefault(x => x.City == stat.City && x.Region == stat.Region && x.StatDate == stat.StatDate);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public List<DownSwitchFlow> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.StatDate >= begin && x.StatDate < end);
        }
    }

    public class PlanningSiteRepository : EfRepositoryBase<MySqlContext, PlanningSite>, IPlanningSiteRepository
    {
        public PlanningSiteRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public PlanningSite Match(PlanningSiteExcel stat)
        {
            return FirstOrDefault(x => x.PlanNum == stat.PlanNum);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class AgisDtPointRepository : EfRepositoryBase<MySqlContext, AgisDtPoint>, IAgisDtPointRepository
    {
        public AgisDtPointRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class MrGridRepository : EfRepositoryBase<MySqlContext, MrGrid>, IMrGridRepository
    {
        public MrGridRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class StationDictionaryRepository : EfRepositoryBase<MySqlContext, StationDictionary>,
        IStationDictionaryRepository
    {
        public StationDictionaryRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public StationDictionary Match(StationDictionaryExcel stat)
        {
            return FirstOrDefault(x => x.StationNum == stat.StationNum);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class DistributionRepository : EfRepositoryBase<MySqlContext, DistributionSystem>, IDistributionRepository
    {
        public DistributionRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public DistributionSystem Match(IndoorDistributionExcel stat)
        {
            return FirstOrDefault(x => x.Name == stat.Name);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class TownBoundaryRepository : EfRepositoryBase<MySqlContext, TownBoundary>, ITownBoundaryRepository
    {
        public TownBoundaryRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class Construction_InformationRepository : EfRepositoryBase<MySqlContext, ConstructionInformation>,
        IConstruction_InformationRepository
    {
        public Construction_InformationRepository(IDbContextProvider<MySqlContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }

        public ConstructionInformation GetByFslNo(string fslNo)
        {
            return FirstOrDefault(o => o.FSLNO == fslNo);
        }

        public ConstructionInformation GetBySiteNo(string siteNo)
        {
            return FirstOrDefault(o => o.SITENO == siteNo);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class Enodeb_BaseRepository : EfRepositoryBase<MySqlContext, ENodebBase>, IEnodeb_BaseRepository
    {
        public Enodeb_BaseRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public ENodebBase GetByENodebId(int eNodebId)
        {
            return FirstOrDefault(o => o.ENODEBID == eNodebId);
        }

        public ENodebBase GetByName(string name)
        {
            return FirstOrDefault(o => o.ENODEBNAME == name);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

}
