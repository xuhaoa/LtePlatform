using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using Abp.Extensions;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;

namespace Lte.MySqlFramework.Concrete
{
    public class CollegeYearRepository : EfRepositoryBase<MySqlContext, CollegeYearInfo>, ICollegeYearRepository
    {
        public CollegeYearRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public CollegeYearInfo GetByCollegeAndYear(int collegeId, int year)
        {
            return FirstOrDefault(x => x.CollegeId == collegeId && x.Year == year);
        }

        public List<CollegeYearInfo> GetAllList(int year)
        {
            return GetAllList(x => x.Year == year);
        }
    }

    public class EFCollegeKpiRepository : EfRepositoryBase<MySqlContext, CollegeKpi>, ICollegeKpiRepository
    {
        public List<CollegeKpi> GetAllList(DateTime time)
        {
            return GetAllList(x => x.TestTime == time);
        }

        public CollegeKpi GetByCollegeIdAndTime(int collegeId, DateTime time)
        {
            return FirstOrDefault(x => x.CollegeId == collegeId && x.TestTime == time);
        }

        public List<CollegeKpi> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.TestTime >= begin && x.TestTime < end);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFCollegeKpiRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class EFCollege3GTestRepository : EfRepositoryBase<MySqlContext, College3GTestResults>, ICollege3GTestRepository
    {
        public List<College3GTestResults> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.TestTime >= begin && x.TestTime < end);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFCollege3GTestRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class EFCollege4GTestRepository : EfRepositoryBase<MySqlContext, College4GTestResults>, ICollege4GTestRepository
    {
        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFCollege4GTestRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class HotSpotENodebRepository : EfRepositoryBase<MySqlContext, HotSpotENodebId>, IHotSpotENodebRepository
    {
        public HotSpotENodebRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class HotSpotCellRepository : EfRepositoryBase<MySqlContext, HotSpotCellId>, IHotSpotCellRepository
    {
        public HotSpotCellRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public HotSpotCellId Match(HotSpotCellExcel stat)
        {
            var type = stat.HotSpotTypeDescription.GetEnumType<HotspotType>();
            return FirstOrDefault(x => x.HotspotType == type && x.HotspotName == stat.HotspotName);
        }
    }

    public class HotSpotBtsRepository : EfRepositoryBase<MySqlContext, HotSpotBtsId>, IHotSpotBtsRepository
    {
        public HotSpotBtsRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class HotSpotCdmaCellRepository : EfRepositoryBase<MySqlContext, HotSpotCdmaCellId>,
        IHotSpotCdmaCellRepository
    {
        public HotSpotCdmaCellRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class RasterInfoRepository : EfRepositoryBase<MySqlContext, RasterInfo>, IRasterInfoRepository
    {
        public RasterInfoRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class RasterTestInfoRepository : EfRepositoryBase<MySqlContext, RasterTestInfo>, IRasterTestInfoRepository
    {
        public RasterTestInfoRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class RasterFileDtRepository : EfRepositoryBase<MySqlContext, RasterFileDtInfo>, IRasterFileDtRepository
    {
        public RasterFileDtRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class DtFileInfoRepository : EfRepositoryBase<MySqlContext, CsvFilesInfo>, IDtFileInfoRepository
    {
        public DtFileInfoRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class AreaTestInfoRepository : EfRepositoryBase<MySqlContext, AreaTestInfo>, IAreaTestInfoRepository
    {
        public AreaTestInfoRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }
}
