using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Abstract
{
    public interface ICollegeYearRepository : IRepository<CollegeYearInfo>, ISaveChanges
    {
        CollegeYearInfo GetByCollegeAndYear(int collegeId, int year);

        List<CollegeYearInfo> GetAllList(int year);
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

}
