using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.College;

namespace Lte.Parameters.Concrete.College
{
    public class EFCollegeRepository : EfRepositoryBase<EFParametersContext, CollegeInfo>, ICollegeRepository
    {
        public CollegeRegion GetRegion(int id)
        {
            return Get(id)?.CollegeRegion;
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

        public List<CollegeInfo> GetAllList(int year)
        {
            return GetAll().Where(x => x.OldOpenDate.Year == year).ToList();
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFCollegeRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}
