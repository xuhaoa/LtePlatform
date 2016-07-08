using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.College;

namespace Lte.Parameters.Concrete.College
{
    public class EFCollegeRepository : EfRepositoryBase<EFParametersContext, CollegeInfo>, ICollegeRepository
    {
        public CollegeRegion GetRegion(int id)
        {
            return GetAll().Select(x => new {x.Id, x.CollegeRegion}).FirstOrDefault(x => x.Id == id)?.CollegeRegion;
        }

        public CollegeInfo GetByName(string name)
        {
            return FirstOrDefault(x => x.Name == name);
        }

        public RectangleRange GetRange(string name)
        {
            var college = GetByName(name);
            return college == null ? null : GetRegion(college.Id)?.RectangleRange;
        }
        
        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFCollegeRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

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
