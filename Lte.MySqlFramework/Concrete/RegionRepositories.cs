using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lte.MySqlFramework.Concrete
{
    public class CdmaRegionStatRepository : EfRepositoryBase<MySqlContext, CdmaRegionStat>, ICdmaRegionStatRepository
    {
        public List<CdmaRegionStat> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.StatDate >= begin && x.StatDate < end);
        }

        public async Task<List<CdmaRegionStat>> GetAllListAsync(DateTime begin, DateTime end)
        {
            return await GetAllListAsync(x => x.StatDate >= begin && x.StatDate < end);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public CdmaRegionStatRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public CdmaRegionStat Match(CdmaRegionStatExcel stat)
        {
            return FirstOrDefault(x => x.Region == stat.Region && x.StatDate == stat.StatDate);
        }
    }

    public class TopDrop2GCellRepository : EfRepositoryBase<MySqlContext, TopDrop2GCell>, ITopDrop2GCellRepository
    {
        public List<TopDrop2GCell> GetAllList(string city, DateTime begin, DateTime end)
        {
            return GetAll().Where(x => x.StatTime >= begin && x.StatTime < end && x.City == city).ToList();
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public TopDrop2GCellRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public TopDrop2GCell Match(TopDrop2GCellExcel stat)
        {
            var time = stat.StatDate.AddHours(stat.StatHour);
            return FirstOrDefault(x => x.BtsId == stat.BtsId && x.SectorId == stat.SectorId && x.StatTime == time);
        }
    }

    public class TopConnection3GRepository : EfRepositoryBase<MySqlContext, TopConnection3GCell>, ITopConnection3GRepository
    {
        public List<TopConnection3GCell> GetAllList(string city, DateTime begin, DateTime end)
        {
            return GetAll().Where(x => x.StatTime >= begin && x.StatTime < end && x.City == city).ToList();
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public TopConnection3GRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public TopConnection3GCell Match(TopConnection3GCellExcel stat)
        {
            var time = stat.StatDate.AddHours(stat.StatHour);
            return FirstOrDefault(x => x.BtsId == stat.BtsId && x.SectorId == stat.SectorId && x.StatTime == time);
        }
    }

    public class TopConnection2GRepository : EfRepositoryBase<MySqlContext, TopConnection2GCell>, ITopConnection2GRepository
    {
        public List<TopConnection2GCell> GetAllList(string city, DateTime begin, DateTime end)
        {
            return GetAll().Where(x => x.StatTime >= begin && x.StatTime < end && x.City == city).ToList();
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public TopConnection2GRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public TopConnection2GCell Match(TopConnection2GExcel stat)
        {
            var time = stat.StatDate.AddHours(stat.StatHour);
            return FirstOrDefault(x => x.BtsId == stat.BtsId && x.SectorId == stat.SectorId && x.StatTime == time);
        }
    }

    public class CdmaRruRepository : EfRepositoryBase<MySqlContext, CdmaRru>, ICdmaRruRepository
    {
        public CdmaRruRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public CdmaRru Match(CdmaCellExcel stat)
        {
            return Get(stat.BtsId, stat.SectorId);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public CdmaRru Get(int btsId, byte sectorId)
        {
            return FirstOrDefault(x => x.BtsId == btsId && x.SectorId == sectorId);
        }
    }

    public class LteRruRepository : EfRepositoryBase<MySqlContext, LteRru>, ILteRruRepository
    {
        public LteRruRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public LteRru Match(CellExcel stat)
        {
            return Get(stat.ENodebId, stat.LocalSectorId);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public LteRru Get(int eNodebId, byte localSectorId)
        {
            return FirstOrDefault(x => x.ENodebId == eNodebId && x.LocalSectorId == localSectorId);
        }
    }

    public class AreaTestDateDateRepository : EfRepositoryBase<MySqlContext, AreaTestDate>, IAreaTestDateRepository
    {
        public AreaTestDateDateRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class TownRepository : EfRepositoryBase<MySqlContext, Town>, ITownRepository
    {
        public TownRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public IEnumerable<Town> QueryTowns(string city, string district, string town)
        {
            const string flag = "=All=";
            city = city ?? flag;
            district = district ?? flag;
            town = town ?? flag;
            return GetAllList(x =>
                (x.TownName == town || town.IndexOf(flag, StringComparison.Ordinal) >= 0)
                && (x.DistrictName == district || district.IndexOf(flag, StringComparison.Ordinal) >= 0)
                && (x.CityName == city || city.IndexOf(flag, StringComparison.Ordinal) >= 0));
        }

        public Town QueryTown(string city, string district, string town)
        {
            return FirstOrDefault(x => x.CityName == city && x.DistrictName == district && x.TownName == town);
        }

        public Town QueryTown(string district, string town)
        {
            return FirstOrDefault(x => x.DistrictName == district && x.TownName == town);
        }

        public List<Town> GetAll(string city)
        {
            return GetAllList(x => x.CityName == city);
        }

        public List<Town> GetAllList(string city, string district)
        {
            return GetAllList(x => x.CityName == city && x.DistrictName == district);
        }

        public IEnumerable<string> GetFoshanDistricts()
        {
            return new[] { "顺德", "南海", "禅城", "三水", "高明" };
        }
    }

    public class OptimizeOptimzeRegionRepository : EfRepositoryBase<MySqlContext, OptimizeRegion>, IOptimzeRegionRepository
    {
        public OptimizeOptimzeRegionRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public List<OptimizeRegion> GetAllList(string city)
        {
            return GetAllList(x => x.City == city);
        }

        public async Task<List<OptimizeRegion>> GetAllListAsync(string city)
        {
            return await GetAllListAsync(x => x.City == city);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

}
