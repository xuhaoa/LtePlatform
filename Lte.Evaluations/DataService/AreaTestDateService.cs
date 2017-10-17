using AutoMapper;
using Lte.Parameters.Entities.Dt;
using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Infrastructure;

namespace Lte.Evaluations.DataService
{
    public class AreaTestDateService
    {
        private readonly IAreaTestDateRepository _repository;
        private readonly ITownRepository _townRepository;

        public AreaTestDateService(IAreaTestDateRepository repository, ITownRepository townRepository)
        {
            _repository = repository;
            _townRepository = townRepository;
        }

        public IEnumerable<AreaTestDateView> QueryAllList()
        {
            return
                _repository.GetAllList()
                    .Select(x => x.ConstructAreaView<AreaTestDate, AreaTestDateView>(_townRepository));
        }

        public int UpdateLastDate(DateTime testDate, string networkType, int townId)
        {
            var town = _townRepository.Get(townId);
            if (town == null) return 0;
            var item = _repository.FirstOrDefault(x => x.Area == town.TownName);
            if (item == null) return 0;
            switch (networkType)
            {
                case "2G":
                    if (testDate > item.LatestDate2G) item.LatestDate2G = testDate;
                    break;
                case "3G":
                    if (testDate > item.LatestDate3G) item.LatestDate3G = testDate;
                    break;
                default:
                    if (testDate > item.LatestDate4G) item.LatestDate4G = testDate;
                    break;
            }
            return _repository.SaveChanges();
        }
    }

    public class AreaTestInfo2GQuery : AreaTestInfoQuery
    {
        private readonly IFileRecordRepository _repository;

        public AreaTestInfo2GQuery(IFileRecordRepository repository, ITownBoundaryRepository boundaryRepository)
            : base(boundaryRepository)
        {
            _repository = repository;
        }

        public override List<AreaTestInfo> QueryAreaTestInfos(List<int> townIds, string csvFileName, int fileId)
        {
            var results = new List<AreaTestInfo>();
            var data2G = _repository.GetFileRecord2Gs(csvFileName);
            UpdateTownRecords(townIds, fileId, data2G, results);
            return results;
        }

        public override List<AreaTestInfo> QueryRoadTestInfos(List<int> townIds, string csvFileName, int fileId)
        {
            var results = new List<AreaTestInfo>();
            var data2G = _repository.GetFileRecord2Gs(csvFileName);
            UpdateRoadRecords(townIds, fileId, data2G, results);
            return results;
        }
    }

    public class AreaTestInfo3GQuery : AreaTestInfoQuery
    {
        private readonly IFileRecordRepository _repository;

        public AreaTestInfo3GQuery(IFileRecordRepository repository, ITownBoundaryRepository boundaryRepository) : base(boundaryRepository)
        {
            _repository = repository;
        }

        public override List<AreaTestInfo> QueryAreaTestInfos(List<int> townIds, string csvFileName, int fileId)
        {
            var results = new List<AreaTestInfo>();
            var data3G = _repository.GetFileRecord3Gs(csvFileName);
            UpdateTownRecords(townIds, fileId, data3G, results);
            return results;
        }

        public override List<AreaTestInfo> QueryRoadTestInfos(List<int> townIds, string csvFileName, int fileId)
        {
            var results = new List<AreaTestInfo>();
            var data3G = _repository.GetFileRecord3Gs(csvFileName);
            UpdateRoadRecords(townIds, fileId, data3G, results);
            return results;
        }
    }

    public class AreaTestInfo4GQuery : AreaTestInfoQuery
    {
        private readonly IFileRecordRepository _repository;

        public AreaTestInfo4GQuery(IFileRecordRepository repository, ITownBoundaryRepository boundaryRepository) : base(boundaryRepository)
        {
            _repository = repository;
        }

        public override List<AreaTestInfo> QueryAreaTestInfos(List<int> townIds, string csvFileName, int fileId)
        {
            var results = new List<AreaTestInfo>();
            var data4G = _repository.GetFileRecord4Gs(csvFileName);
            UpdateTownRecords(townIds, fileId, data4G, results);
            return results;
        }

        public override List<AreaTestInfo> QueryRoadTestInfos(List<int> townIds, string csvFileName, int fileId)
        {
            var results = new List<AreaTestInfo>();
            var data4G = _repository.GetFileRecord4Gs(csvFileName);
            UpdateRoadRecords(townIds, fileId, data4G, results);
            return results;
        }
    }

    public class TownTestInfoService
    {
        private readonly IFileRecordRepository _repository;
        private readonly ITownBoundaryRepository _boundaryRepository;
        private readonly IDtFileInfoRepository _fileInfoRepository;
        private readonly IAreaTestInfoRepository _areaTestInfoRepository;

        public TownTestInfoService(IFileRecordRepository repository, ITownBoundaryRepository boundaryRepository,
            IDtFileInfoRepository fileInfoRepository, IAreaTestInfoRepository areaTestInfoRepository)
        {
            _repository = repository;
            _boundaryRepository = boundaryRepository;
            _fileInfoRepository = fileInfoRepository;
            _areaTestInfoRepository = areaTestInfoRepository;
        }

        public IEnumerable<AreaTestInfo> QueryAreaTestInfos(int fileId)
        {
            var townIds =
                   _boundaryRepository.GetAllList(x => x.AreaName == null).Select(x => x.TownId).Distinct().ToList();
            return from info in _areaTestInfoRepository.GetAllList(x => x.FileId == fileId)
                join id in townIds on info.TownId equals id
                select info;
        }

        public IEnumerable<AreaTestInfo> QueryRoadTestInfos(int fileId)
        {
            var townIds =
                _boundaryRepository.GetAllList(
                        x => x.AreaName != null && (x.AreaName.StartsWith("S") || x.AreaName.StartsWith("G")))
                    .Select(x => x.TownId)
                    .Distinct()
                    .ToList();
            return from info in _areaTestInfoRepository.GetAllList(x => x.FileId == fileId)
                   join id in townIds on info.TownId equals id
                   select info;
        }

        public IEnumerable<AreaTestFileView> QueryRoadTestInfos(DateTime begin, DateTime end, InfrastructureInfo road)
        {
            var allInfos =
                _areaTestInfoRepository.GetAllList(x => x.TownId == road.Id);
            var views = from info in allInfos
                join file in _fileInfoRepository.GetAllList() on info.FileId equals file.Id
                where file.TestDate >= begin && file.TestDate < end
                select new
                {
                    Info = info,
                    File = file
                };
            return views.Select(v =>
            {
                var view = v.Info.MapTo<AreaTestFileView>();
                view.AreaName = road.HotspotName;
                view.CsvFileName = v.File.CsvFileName;
                view.TestDate = v.File.TestDate;
                return view;
            });
        }

        public IEnumerable<AreaTestInfo> CalculateAreaTestInfos(string csvFileName, string type)
        {
            var file = _fileInfoRepository.FirstOrDefault(x => x.CsvFileName == csvFileName + ".csv");
            if (file == null) return new List<AreaTestInfo>();
            var townIds =
                _boundaryRepository.GetAllList(x => x.AreaName == null).Select(x => x.TownId).Distinct().ToList();
            AreaTestInfoQuery query;
            switch (type)
            {
                case "2G":
                    query = new AreaTestInfo2GQuery(_repository, _boundaryRepository);
                    break;
                case "3G":
                    query = new AreaTestInfo3GQuery(_repository, _boundaryRepository);
                    break;
                default:
                    query = new AreaTestInfo4GQuery(_repository, _boundaryRepository);
                    break;
            }  
            return query.QueryAreaTestInfos(townIds, csvFileName, file.Id);
        }

        public IEnumerable<AreaTestInfo> CalculateRoadTestInfos(string csvFileName, string type)
        {
            var file = _fileInfoRepository.FirstOrDefault(x => x.CsvFileName == csvFileName + ".csv");
            if (file == null) return new List<AreaTestInfo>();
            var townIds =
                _boundaryRepository.GetAllList(
                        x => x.AreaName != null && (x.AreaName.StartsWith("S") || x.AreaName.StartsWith("G")))
                    .Select(x => x.TownId)
                    .Distinct()
                    .ToList();
            
            AreaTestInfoQuery query;
            switch (type)
            {
                case "2G":
                    query = new AreaTestInfo2GQuery(_repository, _boundaryRepository);
                    break;
                case "3G":
                    query = new AreaTestInfo3GQuery(_repository, _boundaryRepository);
                    break;
                default:
                    query = new AreaTestInfo4GQuery(_repository, _boundaryRepository);
                    break;
            }
            return query.QueryRoadTestInfos(townIds, csvFileName, file.Id);
        }

        public int UpdateAreaTestInfo(AreaTestInfo info)
        {
            var item = _areaTestInfoRepository.FirstOrDefault(x => x.TownId == info.TownId && x.FileId == info.FileId);
            if (item != null)
            {
                item.Count = info.Count;
                item.CoverageCount = info.CoverageCount;
                item.Distance = info.Distance;
            }
            else
            {
                _areaTestInfoRepository.Insert(info);
            }
            return _areaTestInfoRepository.SaveChanges();
        }
    }

    public class RasterInfoService
    {
        private readonly IRasterInfoRepository _repository;
        private readonly IRasterTestInfoRepository _testInfoRepository;
        private readonly IDtFileInfoRepository _dtFileInfoRepository;

        public RasterInfoService(IRasterInfoRepository repository,
            IRasterTestInfoRepository testInfoRepository, IDtFileInfoRepository dtFileInfoRepository)
        {
            _repository = repository;
            _testInfoRepository = testInfoRepository;
            _dtFileInfoRepository = dtFileInfoRepository;
        }

        public IEnumerable<RasterInfo> GetAllList()
        {
            return _repository.GetAllList();
        } 
        
        public IEnumerable<FileRasterInfoView> QueryFileNames(string dataType, double west, double east, double south,
            double north)
        {
            var infos =
                _repository.GetAllList(
                    x => x.Longtitute >= west && x.Longtitute < east && x.Lattitute >= south && x.Lattitute < north);
            return GetFileRasterInfoViews(dataType, infos);
        }

        public string QueryNetworkType(string csvFileName)
        {
            var info = _testInfoRepository.FirstOrDefault(x => x.CsvFilesName.Contains(csvFileName));
            return info?.NetworkType;
        }

        public IEnumerable<CsvFilesInfo> QureyFileNames(DateTime begin, DateTime end)
        {
            return _dtFileInfoRepository.GetAllList(x => x.TestDate >= begin && x.TestDate < end);
        }

        private IEnumerable<FileRasterInfoView> GetFileRasterInfoViews(string dataType, List<RasterInfo> infos)
        {
            if (!infos.Any())
                return new List<FileRasterInfoView>();

            var fileInfos =
                infos.Select(
                    info => _testInfoRepository.GetAllList(x => x.NetworkType == dataType && x.RasterNum == info.Id))
                    .Aggregate((x, y) => x.Concat(y).ToList());
            var query = fileInfos.Select(x => x.CsvFilesName.GetSplittedFields(';').Select(t => new
            {
                x.RasterNum,
                FileName = t
            }));
            var tuples = query.Aggregate((x, y) => x.Concat(y)).Distinct();

            return from tuple in tuples
                group tuple by tuple.FileName
                into g
                select new FileRasterInfoView
                {
                    CsvFileName = g.Key,
                    RasterNums = g.Select(x => x.RasterNum)
                };
        }

        public IEnumerable<FileRasterInfoView> QueryFileNames(string dataType, string town)
        {
            var infos = _repository.GetAllList(x=>x.Area==town);
            return GetFileRasterInfoViews(dataType, infos);
        }

        public IEnumerable<FileRasterInfoView> QueryFileNames(string dataType, string townName, DateTime begin,
            DateTime end)
        {
            var views = QueryFileNames(dataType, townName);
            return GetFileRasterInfoViews(begin, end, views);
        }
        
        private IEnumerable<FileRasterInfoView> GetFileRasterInfoViews(DateTime begin, DateTime end, IEnumerable<FileRasterInfoView> views)
        {
            if (!views.Any()) return new List<FileRasterInfoView>();

            var fileInfos = _dtFileInfoRepository.GetAllList(x => x.TestDate >= begin && x.TestDate < end);
            if (!fileInfos.Any()) return new List<FileRasterInfoView>();

            return from fileInfo in fileInfos
                join view in views on fileInfo.CsvFileName.Split('.')[0] equals view.CsvFileName.Split('.')[0]
                   select view;
        }

        public IEnumerable<FileRasterInfoView> QueryFileNames(string dataType, double west, double east, double south,
            double north, DateTime begin, DateTime end)
        {
            var views = QueryFileNames(dataType, west, east, south, north);
            return GetFileRasterInfoViews(begin, end, views);
        }
    }

    public class CsvFileInfoService
    {
        private readonly IFileRecordRepository _repository;
        private readonly IDtFileInfoRepository _dtFileInfoRepository;

        public CsvFileInfoService(IFileRecordRepository repository, IDtFileInfoRepository dtFileInfoRepository)
        {
            _repository = repository;
            _dtFileInfoRepository = dtFileInfoRepository;
        }
        
        public IEnumerable<CsvFilesInfo> QueryFilesInfos(DateTime begin, DateTime end)
        {
            return _dtFileInfoRepository.GetAllList(x => x.TestDate >= begin && x.TestDate < end);
        }

        public CsvFilesInfo QueryCsvFilesInfo(string fileName)
        {
            return _dtFileInfoRepository.FirstOrDefault(x => x.CsvFileName == fileName + ".csv");
        }

        public int UpdateFileDistance(CsvFilesInfo filesInfo)
        {
            var info = _dtFileInfoRepository.FirstOrDefault(x => x.CsvFileName == filesInfo.CsvFileName);
            if (info != null)
            {
                info.Distance = filesInfo.Distance;
                info.Count = filesInfo.Count;
                info.CoverageCount = filesInfo.CoverageCount;
                _dtFileInfoRepository.Update(info);
            }
            return _dtFileInfoRepository.SaveChanges();
        }

        public IEnumerable<FileRecord4G> GetFileRecord4Gs(string fileName)
        {
            return _repository.GetFileRecord4Gs(fileName);
        }

        public IEnumerable<FileRecord4G> GetFileRecord4Gs(string fileName, int rasterNum)
        {
            return _repository.GetFileRecord4Gs(fileName, rasterNum);
        }

        public IEnumerable<FileRecord3G> GetFileRecord3Gs(string fileName)
        {
            return _repository.GetFileRecord3Gs(fileName);
        }

        public IEnumerable<FileRecord3G> GetFileRecord3Gs(string fileName, int rasterNum)
        {
            return _repository.GetFileRecord3Gs(fileName, rasterNum);
        }

        public IEnumerable<FileRecord2G> GetFileRecord2Gs(string fileName)
        {
            return _repository.GetFileRecord2Gs(fileName);
        }

        public IEnumerable<FileRecord2G> GetFileRecord2Gs(string fileName, int rasterNum)
        {
            return _repository.GetFileRecord2Gs(fileName, rasterNum);
        }

        public IEnumerable<FileRecordCoverage2G> GetCoverage2Gs(FileRasterInfoView infoView)
        {
            var query =
                infoView.RasterNums.Select(
                    x =>
                        Mapper.Map<IEnumerable<FileRecord2G>, IEnumerable<FileRecordCoverage2G>>(
                            GetFileRecord2Gs(infoView.CsvFileName, x)));
            return query.Aggregate((x, y) => x.Concat(y));
        }

        public IEnumerable<FileRecord2G> GetFileRecord2Gs(FileRasterInfoView infoView)
        {
            var query =
                infoView.RasterNums.Select(x => GetFileRecord2Gs(infoView.CsvFileName, x));
            return query.Aggregate((x, y) => x.Concat(y));
        }

        public IEnumerable<FileRecordCoverage3G> GetCoverage3Gs(FileRasterInfoView infoView)
        {
            var query =
                infoView.RasterNums.Select(
                    x =>
                        Mapper.Map<IEnumerable<FileRecord3G>, IEnumerable<FileRecordCoverage3G>>(
                            GetFileRecord3Gs(infoView.CsvFileName, x)));
            return query.Aggregate((x, y) => x.Concat(y));
        }

        public IEnumerable<FileRecord3G> GetFileRecord3Gs(FileRasterInfoView infoView)
        {
            var query =
                infoView.RasterNums.Select(x => GetFileRecord3Gs(infoView.CsvFileName, x));
            return query.Aggregate((x, y) => x.Concat(y));
        }

        public IEnumerable<FileRecordCoverage4G> GetCoverage4Gs(FileRasterInfoView infoView)
        {
            var query =
                infoView.RasterNums.Select(
                    x =>
                        Mapper.Map<IEnumerable<FileRecord4G>, IEnumerable<FileRecordCoverage4G>>(
                            GetFileRecord4Gs(infoView.CsvFileName, x)));
            return query.Aggregate((x, y) => x.Concat(y));
        }

        public IEnumerable<FileRecord4G> GetFileRecord4Gs(FileRasterInfoView infoView)
        {
            var query =
                infoView.RasterNums.Select(x => GetFileRecord4Gs(infoView.CsvFileName, x));
            return query.Aggregate((x, y) => x.Concat(y));
        }

    }
}
