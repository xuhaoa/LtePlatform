using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Concrete
{
    public class EFCdmaRegionStatRepository : EfRepositoryBase<MySqlContext, CdmaRegionStat>, ICdmaRegionStatRepository
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

        public EFCdmaRegionStatRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public CdmaRegionStat Match(CdmaRegionStatExcel stat)
        {
            return FirstOrDefault(x => x.Region == stat.Region && x.StatDate == stat.StatDate);
        }
    }

    public class EFTopDrop2GCellRepository : EfRepositoryBase<MySqlContext, TopDrop2GCell>, ITopDrop2GCellRepository
    {
        public List<TopDrop2GCell> GetAllList(string city, DateTime begin, DateTime end)
        {
            return GetAll().Where(x => x.StatTime >= begin && x.StatTime < end && x.City == city).ToList();
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFTopDrop2GCellRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public TopDrop2GCell Match(TopDrop2GCellExcel stat)
        {
            var time = stat.StatDate.AddHours(stat.StatHour);
            return FirstOrDefault(x => x.BtsId == stat.BtsId && x.SectorId == stat.SectorId && x.StatTime == time);
        }
    }

    public class EFTopConnection3GRepository : EfRepositoryBase<MySqlContext, TopConnection3GCell>, ITopConnection3GRepository
    {
        public List<TopConnection3GCell> GetAllList(string city, DateTime begin, DateTime end)
        {
            return GetAll().Where(x => x.StatTime >= begin && x.StatTime < end && x.City == city).ToList();
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFTopConnection3GRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public TopConnection3GCell Match(TopConnection3GCellExcel stat)
        {
            var time = stat.StatDate.AddHours(stat.StatHour);
            return FirstOrDefault(x => x.BtsId == stat.BtsId && x.SectorId == stat.SectorId && x.StatTime == time);
        }
    }

    public class EFTopConnection2GRepository : EfRepositoryBase<MySqlContext, TopConnection2GCell>, ITopConnection2GRepository
    {
        public List<TopConnection2GCell> GetAllList(string city, DateTime begin, DateTime end)
        {
            return GetAll().Where(x => x.StatTime >= begin && x.StatTime < end && x.City == city).ToList();
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFTopConnection2GRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
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
}
