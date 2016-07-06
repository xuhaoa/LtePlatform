using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.College;

namespace Lte.Parameters.Concrete.College
{
    public class EFCollege3GTestRepository : EfRepositoryBase<EFParametersContext, College3GTestResults>, ICollege3GTestRepository
    {
        public College3GTestResults GetByCollegeIdAndTime(int collegeId, DateTime time)
        {
            return FirstOrDefault(x => x.CollegeId == collegeId && x.TestTime == time);
        }
        
        public List<College3GTestResults> GetAllList(DateTime begin, DateTime end)
        {
            return GetAllList(x => x.TestTime >= begin && x.TestTime < end);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFCollege3GTestRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class EFCollege4GTestRepository : EfRepositoryBase<EFParametersContext, College4GTestResults>, ICollege4GTestRepository
    {
        public College4GTestResults GetByCollegeIdAndTime(int collegeId, DateTime time)
        {
            return FirstOrDefault(x => x.CollegeId == collegeId && x.TestTime == time);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFCollege4GTestRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class MasterAreaTestDateDateRepository : IAreaTestDateRepository
    {
        private readonly MasterTestContext _context = new MasterTestContext();

        public IQueryable<AreaTestDate> AreaTestDates => _context.AreaTestDates;
    }

    public class MasterRasterInfoRepository : IRasterInfoRepository
    {
        private readonly MasterTestContext _context = new MasterTestContext();

        private static List<RasterInfo> _list;

        public IQueryable<RasterInfo> RasterInfos => _context.RasterInfos;

        public List<RasterInfo> GetAllList()
        {
            if (_list == null || !_list.Any())
                _list = RasterInfos.ToList();
            return _list;
        }

        public List<RasterInfo> GetAllList(string dataType)
        {
            switch (dataType)
            {
                case "2G":
                    return GetAllList().Where(x => x.CsvFilesName2G != "").ToList();
                case "3G":
                    return GetAllList().Where(x => x.CsvFilesName3G != "").ToList();
                default:
                    return GetAllList().Where(x => x.CsvFilesName4G != "").ToList();
            }
        }

        public List<RasterInfo> GetAllList(string dataType, double west, double east, double south, double north)
        {
            return
                GetAllList(dataType)
                    .Where(
                        x =>
                            x.WestLongtitute < east && x.EastLongtitute > west && x.SouthLattitute < north &&
                            x.NorthLattitute > south)
                    .ToList();
        }
    }

    public class MasterCsvFileInfoRepository : ICsvFileInfoRepository
    {
        private readonly MasterTestContext _context = new MasterTestContext();

        public IQueryable<CsvFilesInfo> CsvFilesInfos => _context.CsvFilesInfos;

        public IEnumerable<FileRecord4G> GetFileRecord4Gs(string fileName)
        {
            return _context.Get4GFileContents(fileName);
        }

        public IEnumerable<FileRecord4G> GetFileRecord4Gs(string fileName, int rasterNum)
        {
            return _context.Get4GFileContents(fileName, rasterNum);
        }

        public IEnumerable<FileRecord3G> GetFileRecord3Gs(string fileName)
        {
            return _context.Get3GFileContents(fileName);
        }

        public IEnumerable<FileRecord3G> GetFileRecord3Gs(string fileName, int rasterNum)
        {
            return _context.Get3GFileContents(fileName, rasterNum);
        }

        public IEnumerable<FileRecord2G> GetFileRecord2Gs(string fileName)
        {
            return _context.Get2GFileContents(fileName);
        }

        public IEnumerable<FileRecord2G> GetFileRecord2Gs(string fileName, int rasterNum)
        {
            return _context.Get2GFileContents(fileName, rasterNum);
        }

        public List<CsvFilesInfo> GetAllList(DateTime begin, DateTime end)
        {
            return CsvFilesInfos.Where(x => x.TestDate != null && x.TestDate >= begin && x.TestDate < end).ToList();
        }
    }
}
