using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using Lte.Domain.Common;

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
        List<College3GTestResults> GetAllList(DateTime begin, DateTime end);
    }

    public interface ICollege4GTestRepository : IRepository<College4GTestResults>, ISaveChanges
    {
    }

    public interface IHotSpotENodebRepository : IRepository<HotSpotENodebId>, ISaveChanges
    {
        
    }

    public interface IHotSpotCellRepository : IRepository<HotSpotCellId>, ISaveChanges, IMatchRepository<HotSpotCellId, HotSpotCellExcel>
    {
        
    }

    public interface IHotSpotBtsRepository : IRepository<HotSpotBtsId>, ISaveChanges
    {
        
    }

    public interface IHotSpotCdmaCellRepository : IRepository<HotSpotCdmaCellId>, ISaveChanges
    {
        
    }
}
