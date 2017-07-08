using Lte.Parameters.Abstract.College;
using Lte.Parameters.Entities.Dt;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Lte.Parameters.Concrete.College
{
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

        private List<RasterInfo> GetAllList()
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
                    return RasterInfos.Where(x => x.CsvFilesName2G != "").ToList();
                case "3G":
                    return RasterInfos.Where(x => x.CsvFilesName3G != "").ToList();
                default:
                    return RasterInfos.Where(x => x.CsvFilesName4G != "").ToList();
            }
        }

        public List<RasterInfo> GetAllList(string dataType, string townName)
        {
            switch (dataType)
            {
                case "2G":
                    return RasterInfos.Where(x => x.CsvFilesName2G != "" && x.Area == townName).ToList();
                case "3G":
                    return RasterInfos.Where(x => x.CsvFilesName3G != "" && x.Area == townName).ToList();
                default:
                    return RasterInfos.Where(x => x.CsvFilesName4G != "" && x.Area == townName).ToList();
            }
        }

        public List<RasterInfo> GetAllList(string dataType, double west, double east, double south, double north)
        {
            return
                GetAllList(dataType)
                    .Where(
                        x =>
                            x.Longtitute < east && x.Longtitute > west && x.Lattitute < north &&
                            x.Lattitute > south)
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
