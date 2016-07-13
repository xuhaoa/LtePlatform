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

    public interface ICollegeKpiRepository : IRepository<CollegeKpi>, ISaveChanges
    {
        List<CollegeKpi> GetAllList(DateTime time);

        CollegeKpi GetByCollegeIdAndTime(int collegeId, DateTime time);

        List<CollegeKpi> GetAllList(DateTime begin, DateTime end);
    }

    public interface ICollege3GTestRepository : IRepository<College3GTestResults>, ISaveChanges
    {
        College3GTestResults GetByCollegeIdAndTime(int collegeId, DateTime time);

        List<College3GTestResults> GetAllList(DateTime begin, DateTime end);
    }

    public interface ICollege4GTestRepository : IRepository<College4GTestResults>, ISaveChanges
    {
        College4GTestResults GetByCollegeIdAndTime(int collegeId, DateTime time);
    }

    public interface IAreaTestDateRepository
    {
        IQueryable<AreaTestDate> AreaTestDates { get; }
    }
}
