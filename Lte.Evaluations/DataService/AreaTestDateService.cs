using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Lte.Evaluations.ViewModels;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Dt;

namespace Lte.Evaluations.DataService
{
    public class AreaTestDateService
    {
        private readonly IAreaTestDateRepository _repository;

        public AreaTestDateService(IAreaTestDateRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<AreaTestDate> QueryAllList()
        {
            return _repository.AreaTestDates.ToList();
        }
    }

    public class RasterInfoService
    {
        private readonly IRasterInfoRepository _repository;
        private readonly ICsvFileInfoRepository _fileRepository;

        public RasterInfoService(IRasterInfoRepository repository, ICsvFileInfoRepository fileRepository)
        {
            _repository = repository;
            _fileRepository = fileRepository;
        }

        public IEnumerable<RasterInfoView> QueryAllList()
        {
            return Mapper.Map<IEnumerable<RasterInfo>, IEnumerable<RasterInfoView>>(_repository.GetAllList());
        }

        public IEnumerable<RasterInfoView> QueryWithDataType(string dataType)
        {
            var infos = _repository.GetAllList(dataType);
            return Mapper.Map<IEnumerable<RasterInfo>, IEnumerable<RasterInfoView>>(infos);
        }

        public IEnumerable<FileRasterInfoView> QueryFileNames(string dataType)
        {
            var fileInfos = _repository.GetAllList(dataType).Select(x => new RasterFileInfoView(x, dataType));
            var query = fileInfos.Select(x => x.CsvFilesNames.Select(f => new Tuple<int, string>(x.RasterNum, f)));
            var tuples = query.Aggregate((x, y) => x.Concat(y)).Distinct();

            return from tuple in tuples
                   group tuple by tuple.Item2
                into g
                   select new FileRasterInfoView
                   {
                       CsvFileName = g.Key,
                       RasterNums = g.Select(x => x.Item1)
                   };
        }

        public IEnumerable<FileRasterInfoView> QueryFileNames(string dataType, double west, double east, double south,
            double north)
        {
            var infos = _repository.GetAllList(dataType, west, east, south, north);
            if (!infos.Any())
                return new List<FileRasterInfoView>();

            var fileInfos = infos.Select(x => new RasterFileInfoView(x, dataType));
            var query = fileInfos.Select(x => x.CsvFilesNames.Select(f => new Tuple<int, string>(x.RasterNum, f)));
            var tuples = query.Aggregate((x, y) => x.Concat(y)).Distinct();

            return from tuple in tuples
                   group tuple by tuple.Item2
                into g
                   select new FileRasterInfoView
                   {
                       CsvFileName = g.Key,
                       RasterNums = g.Select(x => x.Item1)
                   };
        }

        public IEnumerable<FileRasterInfoView> QueryFileNames(string dataType, double west, double east, double south,
            double north, DateTime begin, DateTime end)
        {
            var views = QueryFileNames(dataType, west, east, south, north);
            if (!views.Any()) return new List<FileRasterInfoView>();

            var fileInfos = _fileRepository.GetAllList(begin, end);
            if (!fileInfos.Any()) return new List<FileRasterInfoView>();

            return from fileInfo in fileInfos
                   join view in views on fileInfo.CsvFileName.Split('.')[0] equals view.CsvFileName
                   select view;
        }
    }

    public class CsvFileInfoService
    {
        private static ICsvFileInfoRepository _repository;

        public CsvFileInfoService(ICsvFileInfoRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<CsvFilesInfo> QueryAllList()
        {
            return _repository.CsvFilesInfos.ToList();
        }

        public IEnumerable<CsvFilesInfo> QueryFilesInfos(DateTime begin, DateTime end)
        {
            return _repository.GetAllList(begin, end);
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

        public IEnumerable<FileRecordCoverage3G> GetCoverage3Gs(FileRasterInfoView infoView)
        {
            var query =
                infoView.RasterNums.Select(
                    x =>
                        Mapper.Map<IEnumerable<FileRecord3G>, IEnumerable<FileRecordCoverage3G>>(
                            GetFileRecord3Gs(infoView.CsvFileName, x)));
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
    }
}
