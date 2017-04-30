using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.Parameters.Entities.College;
using Lte.Parameters.Entities.Dt;
using System;
using System.Collections.Generic;
using System.Linq;
using Lte.Domain.Common.Wireless;

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

    public interface ICsvFileInfoRepository
    {
        IQueryable<CsvFilesInfo> CsvFilesInfos { get; }

        IEnumerable<FileRecord4G> GetFileRecord4Gs(string fileName);

        IEnumerable<FileRecord4G> GetFileRecord4Gs(string fileName, int rasterNum);

        IEnumerable<FileRecord3G> GetFileRecord3Gs(string fileName);

        IEnumerable<FileRecord3G> GetFileRecord3Gs(string fileName, int rasterNum);

        IEnumerable<FileRecord2G> GetFileRecord2Gs(string fileName);

        IEnumerable<FileRecord2G> GetFileRecord2Gs(string fileName, int rasterNum);

        List<CsvFilesInfo> GetAllList(DateTime begin, DateTime end);
    }

    public interface IRasterInfoRepository
    {
        IQueryable<RasterInfo> RasterInfos { get; }
        
        List<RasterInfo> GetAllList(string dataType, double west, double east, double south, double north);

        List<RasterInfo> GetAllList(string dataType);

        List<RasterInfo> GetAllList(string dataType, string townName);
    }
}
