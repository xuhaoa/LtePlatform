using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.College;
using Lte.Parameters.Entities.Dt;

namespace Lte.Parameters.Abstract.College
{
    public interface ICollegeRepository : IRepository<CollegeInfo>, ISaveChanges
    {
        CollegeRegion GetRegion(int id);

        CollegeInfo GetByName(string name);

        RectangleRange GetRange(string name);
        
    }

    public interface IAreaTestDateRepository
    {
        IQueryable<AreaTestDate> AreaTestDates { get; }
    }
}
