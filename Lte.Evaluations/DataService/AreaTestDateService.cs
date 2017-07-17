using AutoMapper;
using Lte.Evaluations.ViewModels;
using Lte.Parameters.Entities.Dt;
using System;
using System.Collections.Generic;
using System.Linq;
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
                _repository.AreaTestDates.ToList()
                    .Select(x => x.ConstructAreaView<AreaTestDate, AreaTestDateView>(_townRepository));
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
