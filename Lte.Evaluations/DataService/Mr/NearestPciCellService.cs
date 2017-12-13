using System;
using Lte.Parameters.Abstract.Basic;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Dependency;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;
using Lte.Domain.LinqToCsv.Context;
using Lte.Domain.Regular;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Entities;
using Lte.MySqlFramework.Abstract;
using Lte.Parameters.Entities.Channel;

namespace Lte.Evaluations.DataService.Mr
{
    public class MrGridService
    {
        private readonly IMrGridRepository _repository;

        public MrGridService(IMrGridRepository repository)
        {
            _repository = repository;
        }

        public void UploadMrGrids(XmlDocument xml, string district, string fileName)
        {
            var candidateDescritions = new[] { "竞对总体", "移动竞对", "联通竞对" };
            var competeDescription = candidateDescritions.FirstOrDefault(fileName.Contains);
            var list = competeDescription == null
                ? MrGridXml.ReadGridXmls(xml, district ?? "禅城")
                : MrGridXml.ReadGridXmlsWithCompete(xml, district ?? "禅城", competeDescription);
            foreach (var item in list)
            {
                _repository.Insert(item.MapTo<MrGrid>());
            }
            _repository.SaveChanges();
        }

        public IEnumerable<MrCoverageGridView> QueryCoverageGridViews(DateTime initialDate, string district)
        {
            var stats =
                _repository.QueryDate(initialDate, (repository, beginDate, endDate) => repository.GetAllList(
                    x =>
                        x.StatDate >= beginDate && x.StatDate < endDate && x.District == district &&
                        x.Compete == AlarmCategory.Self));
            return stats.MapTo<IEnumerable<MrCoverageGridView>>();
        }

        public IEnumerable<MrCoverageGridView> QueryCoverageGridViews(DateTime initialDate,
            IEnumerable<List<GeoPoint>> boundaries, string district)
        {
            var stats =
                _repository.QueryDate(initialDate, (repository, beginDate, endDate) => repository.GetAllList(
                    x =>
                        x.StatDate >= beginDate && x.StatDate < endDate && x.District == district &&
                        x.Compete == AlarmCategory.Self)).Where(x =>
                        {
                            var fields = x.Coordinates.GetSplittedFields(';')[0].GetSplittedFields(',');
                            var point = new GeoPoint(fields[0].ConvertToDouble(0), fields[1].ConvertToDouble(0));
                            return boundaries.Any(boundary => GeoMath.IsInPolygon(point, boundary));
                        });
            return stats.MapTo<IEnumerable<MrCoverageGridView>>();
        }

        public IEnumerable<MrCompeteGridView> QueryCompeteGridViews(DateTime initialDate, string district,
            AlarmCategory? compete)
        {
            var stats =
                _repository.QueryDate(initialDate, (repository, beginDate, endDate) => repository.GetAllList(
                    x =>
                        x.StatDate >= beginDate && x.StatDate < endDate && x.District == district &&
                        x.Frequency == -1 && x.Compete == compete)).ToList();
            return stats.MapTo<IEnumerable<MrCompeteGridView>>();
        }

        public IEnumerable<MrCompeteGridView> QueryCompeteGridViews(DateTime initialDate, string district,
            AlarmCategory? compete, IEnumerable<List<GeoPoint>> boundaries)
        {
            var stats =
                _repository.QueryDate(initialDate, (repository, beginDate, endDate) => repository.GetAllList(
                    x =>
                        x.StatDate >= beginDate && x.StatDate < endDate && x.District == district &&
                        x.Frequency == -1 && x.Compete == compete)).Where(x =>
                        {
                            var fields = x.Coordinates.GetSplittedFields(';')[0].GetSplittedFields(',');
                            var point = new GeoPoint(fields[0].ConvertToDouble(0), fields[1].ConvertToDouble(0));
                            return boundaries.Aggregate(false, (current, boundary) => current || GeoMath.IsInPolygon(point, boundary));
                        });
            return stats.MapTo<IEnumerable<MrCompeteGridView>>();
        }
    }

    public class AgpsTownView
    {
        public string District { get; set; }

        public string Town { get; set; }

        public IEnumerable<AgpsCoverageView> Views { get; set; } 
    }

    public class NearestPciCellService
    {
        private readonly INearestPciCellRepository _repository;
        private readonly ICellRepository _cellRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly IAgisDtPointRepository _agisRepository;
        
        private readonly IAppStreamRepository _streamRepository;
        private readonly IWebBrowsingRepository _browsingRepository;
        private readonly IMrGridKpiRepository _mrGridKpiRepository;

        private readonly ITownRepository _townRepository;
        private readonly MrGridService _mrGridService;

        private static Stack<NearestPciCell> NearestCells { get; set; }

        public NearestPciCellService(INearestPciCellRepository repository, ICellRepository cellRepository,
            IENodebRepository eNodebRepository, IAgisDtPointRepository agisRepository,
            ITownRepository townRepository, IMrGridRepository mrGridRepository,
            IAppStreamRepository streamRepository, IWebBrowsingRepository browsingRepository, IMrGridKpiRepository mrGridKpiRepository)
        {
            _repository = repository;
            _cellRepository = cellRepository;
            _eNodebRepository = eNodebRepository;
            _agisRepository = agisRepository;
            
            _streamRepository = streamRepository;
            _browsingRepository = browsingRepository;
            _mrGridKpiRepository = mrGridKpiRepository;

            _townRepository = townRepository;
            _mrGridService = new MrGridService(mrGridRepository);
            
            if (NearestCells == null)
                NearestCells = new Stack<NearestPciCell>();
        }

        public List<NearestPciCellView> QueryCells(int cellId, byte sectorId)
        {
            return
                _repository.GetAllList(cellId, sectorId)
                    .Select(
                        x =>
                            ((NearestPciCell) x).ConstructView(_eNodebRepository))
                    .ToList();
        }

        public List<NearestPciCell> QueryNeighbors(int cellId, byte sectorId)
        {
            return _repository.GetAllList(cellId, sectorId);
        }

        public NearestPciCell QueryNearestPciCell(int cellId, byte sectorId, short pci)
        {
            return _repository.GetNearestPciCell(cellId, sectorId, pci);
        }

        public int UpdateNeighborPcis(int cellId, byte sectorId)
        {
            var neighborList = _repository.GetAllList(cellId, sectorId);
            foreach (var pciCell in neighborList)
            {
                var cell = _cellRepository.GetBySectorId(pciCell.NearestCellId, pciCell.NearestSectorId);
                if (cell == null || pciCell.Pci == cell.Pci) continue;
                pciCell.Pci = cell.Pci;
                _repository.Update(pciCell);
                neighborList = _repository.GetAllList(pciCell.NearestCellId, pciCell.NearestSectorId);
                foreach (var nearestPciCell in neighborList)
                {
                    cell = _cellRepository.GetBySectorId(nearestPciCell.NearestCellId, nearestPciCell.NearestSectorId);
                    if (cell==null||nearestPciCell.Pci==cell.Pci) continue;
                    nearestPciCell.Pci = cell.Pci;
                    _repository.Update(nearestPciCell);
                }
            }
            return _repository.SaveChanges();
        }

        public void UpdateNeighborCell(NearestPciCell cell)
        {
            var item = _repository.GetNearestPciCell(cell.CellId, cell.SectorId, cell.Pci);
            if (item != null)
            {
                item.NearestCellId = cell.NearestCellId;
                item.NearestSectorId = cell.NearestSectorId;
                _repository.Update(item);
            }
            else
            {
                cell.TotalTimes = 98;
                _repository.Insert(cell);
            }
            _repository.SaveChanges();
        }

        public async Task<int> UploadMrGridKpiPoints(StreamReader reader)
        {
            var csvs = CsvContext.Read<MrGridKpiDto>(reader);
            return await _mrGridKpiRepository.UpdateMany<IMrGridKpiRepository, MrGridKpi, MrGridKpiDto>(csvs);

        }

        public void UploadMrGrids(StreamReader reader, string fileName)
        {
            var xml = new XmlDocument();
            xml.Load(reader);
            var districts = _townRepository.GetAllList().Select(x => x.DistrictName).Distinct();
            var district = districts.FirstOrDefault(fileName.Contains);
            _mrGridService.UploadMrGrids(xml, district, fileName);
        }

        public async Task<int> UploadWebBrowsings(StreamReader reader)
        {
            var csvs = CsvContext.Read<WebBrowsingCsv>(reader);
            return await _browsingRepository.UpdateMany<IWebBrowsingRepository, WebBrowsing, WebBrowsingCsv>(csvs);
        }

        public async Task<int> UploadStreamings(StreamReader reader)
        {
            var csvs = CsvContext.Read<AppStreamingCsv>(reader);
            return await _streamRepository.UpdateMany<IAppStreamRepository, AppSteam, AppStreamingCsv>(csvs);
        }

        public IEnumerable<AgisDtPoint> QueryAgisDtPoints(DateTime begin, DateTime end)
        {
            var points = _agisRepository.GetAllList(x => x.StatDate > begin && x.StatDate <= end);
            if (!points.Any()) return new List<AgisDtPoint>();
            return points.GroupBy(x => new {x.X, x.Y}).Select(g =>
            {
                var telecomGroups = g.Where(x => x.TelecomRsrp > 0).ToList();
                var mobileGroups = g.Where(x => x.MobileRsrp > 0).ToList();
                var unicomGroups = g.Where(x => x.UnicomRsrp > 0).ToList();
                var stat = new AgisDtPoint
                {
                    X = g.Key.X,
                    Y = g.Key.Y,
                    Longtitute = g.First().Longtitute,
                    Lattitute = g.First().Lattitute,
                    StatDate = g.First().StatDate
                };
                if (telecomGroups.Any())
                {
                    stat.TelecomRsrp = telecomGroups.Average(x => x.TelecomRsrp);
                    stat.TelecomRate100 = telecomGroups.Average(x => x.TelecomRate100);
                    stat.TelecomRate105 = telecomGroups.Average(x => x.TelecomRate105);
                    stat.TelecomRate110 = telecomGroups.Average(x => x.TelecomRate110);
                }
                if (mobileGroups.Any())
                {
                    stat.MobileRsrp = mobileGroups.Average(x => x.MobileRsrp);
                    stat.MobileRate100 = mobileGroups.Average(x => x.MobileRate100);
                    stat.MobileRate105 = mobileGroups.Average(x => x.MobileRate105);
                    stat.MobileRate110 = mobileGroups.Average(x => x.MobileRate110);
                }
                if (unicomGroups.Any())
                {
                    stat.UnicomRsrp = unicomGroups.Average(x => x.UnicomRsrp);
                    stat.UnicomRate100 = unicomGroups.Average(x => x.UnicomRate100);
                    stat.UnicomRate105 = unicomGroups.Average(x => x.UnicomRate105);
                    stat.UnicomRate110 = unicomGroups.Average(x => x.UnicomRate110);
                }
                return stat;
            });
        }

        public IEnumerable<AgisDtPoint> QueryAgisDtPoints(DateTime begin, DateTime end, string topic)
        {
            var points = _agisRepository.GetAllList(x => x.StatDate > begin && x.StatDate <= end && x.Operator == topic);
            return points;
        }

        public IEnumerable<MrCoverageGridView> QueryCoverageGridViews(DateTime initialDate, string district)
        {
            return _mrGridService.QueryCoverageGridViews(initialDate, district);
        }
        
        public IEnumerable<MrCompeteGridView> QueryCompeteGridViews(DateTime initialDate, string district,
            string competeDescription)
        {
            var competeTuple =
                WirelessConstants.EnumDictionary["AlarmCategory"].FirstOrDefault(x => x.Item2 == competeDescription);
            var compete = (AlarmCategory?)competeTuple?.Item1;

            return _mrGridService.QueryCompeteGridViews(initialDate, district, compete);
        }
    }

    public class LteNeighborCellService
    {
        private readonly ILteNeighborCellRepository _repository;

        public LteNeighborCellService(ILteNeighborCellRepository repository)
        {
            _repository = repository;
        }

        public List<LteNeighborCell> QueryCells(int cellId, byte sectorId)
        {
            return _repository.GetAllList(x => x.CellId == cellId && x.SectorId == sectorId);
        }
    }

    public class GridClusterService
    {
        private readonly IGridClusterRepository _repository;
        private readonly IMrGridKpiRepository _kpiRepository;

        public GridClusterService(IGridClusterRepository repository, IMrGridKpiRepository kpiRepository)
        {
            _repository = repository;
            _kpiRepository = kpiRepository;
        }

        public IEnumerable<GridClusterView> QueryClusterViews(string theme)
        {
            return
                _repository.GetAllList(x => x.Theme == theme)
                    .GroupBy(x => x.ClusterNumber)
                    .Select(g => new GridClusterView
                    {
                        ClusterNumber = g.Key,
                        Theme = theme,
                        GridPoints = g.Select(x => new GeoGridPoint
                        {
                            X = x.X,
                            Y = x.Y
                        })
                    });
        }

        public IEnumerable<GridClusterView> QueryClusterViews(string theme, double west, double east, double south, double north)
        {
            var westX = (int) ((west - 112)/0.00049);
            var eastX = (int) ((east - 112)/0.00049);
            var southY = (int) ((south - 22)/0.00045);
            var northY = (int) ((north - 22)/0.00045);
            return
                _repository.GetAllList(x => x.Theme == theme
                                            && x.X >= westX && x.X < eastX && x.Y >= southY && x.Y < northY)
                    .GroupBy(x => x.ClusterNumber)
                    .Where(g => g.Count() > 4)
                    .Select(g => new GridClusterView
                    {
                        ClusterNumber = g.Key,
                        Theme = theme,
                        GridPoints = g.Select(x => new GeoGridPoint
                        {
                            X = x.X,
                            Y = x.Y
                        })
                    });
        } 

        public IEnumerable<MrGridKpiDto> QueryKpiDtos(IEnumerable<GeoGridPoint> points)
        {
            var stats =
                points.Select(point => _kpiRepository.FirstOrDefault(t => t.X == point.X && t.Y == point.Y))
                    .Where(stat => stat != null)
                    .ToList();
            return stats.MapTo<IEnumerable<MrGridKpiDto>>();
        }

        public MrGridKpiDto QueryClusterKpi(IEnumerable<GeoGridPoint> points)
        {
            var stats =
                points.Select(point => _kpiRepository.FirstOrDefault(t => t.X == point.X && t.Y == point.Y))
                    .Where(stat => stat != null)
                    .ToList();
            var result = stats.Average().MapTo<MrGridKpiDto>();
            var filter = stats.Where(x => x.Rsrp < -110).ToList();
            if (filter.Any())
            {
                var distance = filter.Max(x => x.ShortestDistance);
                var candidate = filter.FirstOrDefault(x => x.ShortestDistance == distance);
                if (candidate != null)
                {
                    result.X = candidate.X;
                    result.Y = candidate.Y;
                    return result;
                }
            }
            filter = stats.Where(x => x.Rsrp < -105).ToList();
            if (filter.Any())
            {
                var distance = filter.Max(x => x.ShortestDistance);
                var candidate = filter.FirstOrDefault(x => x.ShortestDistance == distance);
                if (candidate != null)
                {
                    result.X = candidate.X;
                    result.Y = candidate.Y;
                    return result;
                }
            }
            filter = stats;
            if (filter.Any())
            {
                var distance = filter.Max(x => x.ShortestDistance);
                var candidate = filter.FirstOrDefault(x => x.ShortestDistance == distance);
                if (candidate != null)
                {
                    result.X = candidate.X;
                    result.Y = candidate.Y;
                    return result;
                }
            }
            return result;
        }
    }

    public class DpiGridKpiService
    {
        private readonly IDpiGridKpiRepository _repository;

        public DpiGridKpiService(IDpiGridKpiRepository repository)
        {
            _repository = repository;
        }
        
        public DpiGridKpiDto QueryKpi(int x, int y)
        {
            return _repository.FirstOrDefault(r => r.X == x && r.Y == y).MapTo<DpiGridKpiDto>();
        }
    }
}
