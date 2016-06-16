using System;
using System.Collections.Generic;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Entities.College;

namespace Lte.Parameters.Concrete.College
{
    public class EFCollegeKpiRepository : EfRepositoryBase<EFParametersContext, CollegeKpi>, ICollegeKpiRepository
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

        public EFCollegeKpiRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}
