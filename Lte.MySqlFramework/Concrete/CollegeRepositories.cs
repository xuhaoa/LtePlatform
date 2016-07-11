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
}
