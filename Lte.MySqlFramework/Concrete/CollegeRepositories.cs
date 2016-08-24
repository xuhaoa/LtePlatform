using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

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
        public College4GTestResults GetByCollegeIdAndTime(int collegeId, DateTime time)
        {
            return FirstOrDefault(x => x.CollegeId == collegeId && x.TestTime == time);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFCollege4GTestRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

}
