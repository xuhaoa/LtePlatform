using System;
using Lte.Domain.Common;
using Lte.Domain.LinqToExcel;
using Lte.Parameters.Abstract.Basic;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Abp.EntityFramework.Repositories;
using AutoMapper;
using Lte.Domain.Common.Geo;
using Lte.Domain.Common.Wireless;
using Lte.Domain.LinqToCsv.Context;
using Lte.Domain.LinqToCsv.Description;
using Lte.Domain.Regular;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.Kpi;

namespace Lte.Evaluations.DataService.Basic
{
    public static class BasicImportContainer
    {
        public static List<ENodebExcel> ENodebExcels { get; set; } = new List<ENodebExcel>();

        public static List<CellExcel> CellExcels { get; set; } = new List<CellExcel>();

        public static int LteRruIndex { get; set; }

        public static int LteCellIndex { get; set; }

        public static List<CdmaCellExcel> CdmaCellExcels { get; set; } = new List<CdmaCellExcel>();

        public static int CdmaRruIndex { get; set; }
    }

    public class BasicImportService
    {
        private readonly IENodebRepository _eNodebRepository;
        private readonly ICellRepository _cellRepository;
        private readonly IBtsRepository _btsRepository;
        private readonly ICdmaCellRepository _cdmaCellRepository;
        private readonly IStationDictionaryRepository _stationDictionary;
        private readonly IDistributionRepository _distributionRepository;
        private readonly IHotSpotCellRepository _hotSpotCellRepository;

        public BasicImportService(IENodebRepository eNodebRepository, ICellRepository cellRepository,
            IBtsRepository btsRepository, ICdmaCellRepository cdmaCellRepository, 
            IStationDictionaryRepository stationDictionary, IDistributionRepository distributionRepository,
            IHotSpotCellRepository hotSpotCellRepository)
        {
            _eNodebRepository = eNodebRepository;
            _cellRepository = cellRepository;
            _btsRepository = btsRepository;
            _cdmaCellRepository = cdmaCellRepository;
            _stationDictionary = stationDictionary;
            _distributionRepository = distributionRepository;
            _hotSpotCellRepository = hotSpotCellRepository;
        }

        public static List<BtsExcel> BtsExcels { get; set; } = new List<BtsExcel>();
        
        public List<ENodebExcel> ImportENodebExcels(string path)
        {
            var repo = new ExcelQueryFactory { FileName = path };
            return (from c in repo.Worksheet<ENodebExcel>("基站级") select c).ToList();
        }

        public List<CellExcel> ImportCellExcels(string path)
        {
            var repo = new ExcelQueryFactory { FileName = path };
            return (from c in repo.Worksheet<CellExcel>("小区级") select c).ToList();
        } 

        public List<CdmaCellExcel> ImportCdmaParameters(string path)
        {
            var repo = new ExcelQueryFactory { FileName = path };
            BtsExcels = (from c in repo.Worksheet<BtsExcel>("基站级")
                select c).Where(x => x.BtsId > 0).ToList();
            return (from c in repo.Worksheet<CdmaCellExcel>("小区级")
                select c).ToList();
        }

        public int ImportStationDictionaries(string path)
        {
            var repo = new ExcelQueryFactory { FileName = path };
            var excels = (from c in repo.Worksheet<StationDictionaryExcel>("L网网元台账对应关系") select c).ToList();
            return _stationDictionary.Import<IStationDictionaryRepository, StationDictionary, StationDictionaryExcel>(excels);
        }

        public int ImportDistributions(string path)
        {
            var repo = new ExcelQueryFactory { FileName = path };
            var excels = (from c in repo.Worksheet<IndoorDistributionExcel>("室分总表") select c).ToList();
            return _distributionRepository.Import<IDistributionRepository, DistributionSystem, IndoorDistributionExcel>(excels);
        }

        public int ImportHotSpots(string path)
        {
            var repo = new ExcelQueryFactory { FileName = path };
            var excels = (from c in repo.Worksheet<HotSpotCellExcel>("基础信息") select c).ToList();
            return _hotSpotCellRepository.Import<IHotSpotCellRepository, HotSpotCellId, HotSpotCellExcel>(excels);
        }

        public IEnumerable<ENodebExcel> GetNewENodebExcels()
        {
            if (!BasicImportContainer.ENodebExcels.Any()) return new List<ENodebExcel>();
            return from info in BasicImportContainer.ENodebExcels
                join eNodeb in _eNodebRepository.GetAllInUseList()
                    on info.ENodebId equals eNodeb.ENodebId into eNodebQuery
                from eq in eNodebQuery.DefaultIfEmpty()
                where eq == null
                select info;
        }

        public IEnumerable<int> GetVanishedENodebIds()
        {
            if (!BasicImportContainer.ENodebExcels.Any()) return new List<int>();
            return from eNodeb in _eNodebRepository.GetAllInUseList()
                join info in BasicImportContainer.ENodebExcels
                    on eNodeb.ENodebId equals info.ENodebId into eNodebQuery
                from eq in eNodebQuery.DefaultIfEmpty()
                where eq == null
                select eNodeb.ENodebId;
        }

        public IEnumerable<int> GetVanishedBtsIds()
        {
            if (!BtsExcels.Any()) return new List<int>();
            return from bts in _btsRepository.GetAllInUseList()
                   join info in BtsExcels
                       on bts.BtsId equals info.BtsId into btsQuery
                   from eq in btsQuery.DefaultIfEmpty()
                   where eq == null
                   select bts.BtsId;
        }

        public IEnumerable<CellExcel> GetNewCellExcels()
        {
            if (!BasicImportContainer.CellExcels.Any()) return new List<CellExcel>();
            return from info in BasicImportContainer.CellExcels
                join cell in _cellRepository.GetAllInUseList()
                    on new {info.ENodebId, info.SectorId, info.Pci} equals 
                    new {cell.ENodebId, cell.SectorId, cell.Pci} into cellQuery
                from cq in cellQuery.DefaultIfEmpty()
                where cq == null
                select info;
        }

        public IEnumerable<CellIdPair> GetVanishedCellIds()
        {
            if (!BasicImportContainer.CellExcels.Any()) return new List<CellIdPair>();
            return from cell in _cellRepository.GetAllInUseList()
                join info in BasicImportContainer.CellExcels
                    on new {cell.ENodebId, cell.SectorId} equals new {info.ENodebId, info.SectorId}
                    into cellQuery
                from cq in cellQuery.DefaultIfEmpty()
                where cq == null
                select new CellIdPair {CellId = cell.ENodebId, SectorId = cell.SectorId};
        }

        public IEnumerable<CdmaCellIdPair> GetVanishedCdmaCellIds()
        {
            if (!BasicImportContainer.CdmaCellExcels.Any()) return new List<CdmaCellIdPair>();
            return from cell in _cdmaCellRepository.GetAllInUseList()
                   join info in BasicImportContainer.CdmaCellExcels
                       on new { cell.BtsId, cell.SectorId, cell.CellType } equals new { info.BtsId, info.SectorId, info.CellType }
                       into cellQuery
                   from cq in cellQuery.DefaultIfEmpty()
                   where cq == null
                   select new CdmaCellIdPair { CellId = cell.BtsId, SectorId = cell.SectorId, CellType = cell.CellType };
        }

        public IEnumerable<BtsExcel> GetNewBtsExcels()
        {
            if (!BtsExcels.Any()) return new List<BtsExcel>();
            return from info in BtsExcels
                join bts in _btsRepository.GetAllList()
                    on info.BtsId equals bts.BtsId into btsQuery
                from bq in btsQuery.DefaultIfEmpty()
                where bq == null
                select info;
        }

        public IEnumerable<CdmaCellExcel> GetNewCdmaCellExcels()
        {
            if (!BasicImportContainer.CdmaCellExcels.Any()) return new List<CdmaCellExcel>();
            return from info in BasicImportContainer.CdmaCellExcels
                join cell in _cdmaCellRepository.GetAllList()
                    on new {info.BtsId, info.SectorId} equals new {cell.BtsId, cell.SectorId} into cellQuery
                from cq in cellQuery.DefaultIfEmpty()
                where cq == null
                select info;
        }
    }

    public class TownQueryService
    {
        private readonly ITownRepository _repository;
        private readonly IOptimzeRegionRepository _optimzeRegionRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly IBtsRepository _btsRepository;
        private readonly ICellRepository _cellRepository;
        private readonly ICdmaCellRepository _cdmaCellRepository;
        private readonly ITownBoundaryRepository _boundaryRepository;

        public TownQueryService(ITownRepository repository, IOptimzeRegionRepository optimzeRegionRepository,
            IENodebRepository eNodebRepositroy, IBtsRepository btsRepository,
            ICellRepository cellRepository, ICdmaCellRepository cdmaCellRepository, ITownBoundaryRepository boundaryRepository)
        {
            _repository = repository;
            _optimzeRegionRepository = optimzeRegionRepository;
            _eNodebRepository = eNodebRepositroy;
            _btsRepository = btsRepository;
            _cellRepository = cellRepository;
            _cdmaCellRepository = cdmaCellRepository;
            _boundaryRepository = boundaryRepository;
        }

        public List<string> GetCities()
        {
            return _repository.GetAll().Select(x => x.CityName).Distinct().ToList();
        }

        public IEnumerable<string> GetRegions(string city)
        {
            return _optimzeRegionRepository.GetAllList().Where(x => x.City == city)
                .Select(x => x.Region).Distinct().OrderBy(x => x);
        }

        public List<string> GetDistricts(string city)
        {
            return _repository.GetAllList().Where(x => x.CityName == city)
                .Select(x => x.DistrictName).Distinct().ToList();
        }

        public List<DistrictIndoorStat> QueryDistrictIndoorStats(string city)
        {
            var eNodebTownIds = _eNodebRepository.GetAllInUseList().Select(x => new
            {
                x.TownId,
                x.ENodebId
            });
            var allCells = _cellRepository.GetAllInUseList();
            return (from district in GetDistricts(city)
                    let townList = _repository.GetAllList(city, district)
                    let cells = (from t in townList
                                 join e in eNodebTownIds on t.Id equals e.TownId
                                 join c in allCells on e.ENodebId equals c.ENodebId
                                 select c)
                    select new DistrictIndoorStat
                    {
                        District = district,
                        TotalIndoorCells = cells.Count(x => !x.IsOutdoor),
                        TotalOutdoorCells = cells.Count(x => x.IsOutdoor)
                    }).ToList();
        }

        public List<DistrictBandClassStat> QueryDistrictBandStats(string city)
        {
            var eNodebTownIds = _eNodebRepository.GetAllList().Select(x => new
            {
                x.TownId,
                x.ENodebId
            });
            var allCells = _cellRepository.GetAllInUseList();
            return (from district in GetDistricts(city)
                    let townList = _repository.GetAllList(city, district)
                    let cells = (from t in townList
                                 join e in eNodebTownIds on t.Id equals e.TownId
                                 join c in allCells on e.ENodebId equals c.ENodebId
                                 select c)
                    select new DistrictBandClassStat
                    {
                        District = district,
                        Band1Cells = cells.Count(x => x.BandClass == 1),
                        Band3Cells = cells.Count(x => x.BandClass == 3),
                        Band5Cells = cells.Count(x => x.BandClass == 5 && x.Frequency != 2506),
                        NbIotCells = cells.Count(x => x.BandClass == 5 && x.Frequency == 2506),
                        Band41Cells = cells.Count(x => x.BandClass == 41)
                    }).ToList();
        }

        public List<DistrictStat> QueryDistrictStats(string city)
        {
            var eNodebTownIds = _eNodebRepository.GetAllInUseList().Select(x => new
            {
                x.TownId,
                x.ENodebId
            });
            var btsTownIds = _btsRepository.GetAllInUseList().Select(x => new
            {
                x.TownId,
                x.BtsId
            });
            var cellENodebs = _cellRepository.GetAllInUseList();
            var cdmaCellBtsIds = _cdmaCellRepository.GetAllInUseList().Select(x => x.BtsId);
            return (from district in GetDistricts(city)
                let townList = _repository.GetAllList(city, district)
                let eNodebs = (from t in townList join e in eNodebTownIds on t.Id equals e.TownId select e)
                let btss = (from t in townList join b in btsTownIds on t.Id equals b.TownId select b)
                let cells = (from t in townList
                    join e in eNodebTownIds on t.Id equals e.TownId
                    join c in cellENodebs on e.ENodebId equals c.ENodebId
                    select c)
                let cdmaCells =
                (from t in townList
                    join b in btsTownIds on t.Id equals b.TownId
                    join c in cdmaCellBtsIds on b.BtsId equals c
                    select c)
                select new DistrictStat
                {
                    District = district,
                    TotalLteENodebs = eNodebs.Count(),
                    TotalLteCells = cells.Count(x => x.Frequency != 2506),
                    Lte800Cells = cells.Count(x => x.BandClass == 5 && x.Frequency != 2506),
                    TotalNbIotCells = cells.Count(x => x.Frequency == 2506),
                    TotalCdmaBts = btss.Count(),
                    TotalCdmaCells = cdmaCells.Count()
                }).ToList();
        }

        public List<string> GetTowns(string city, string district)
        {
            return
                _repository.GetAllList()
                    .Where(x => x.CityName == city && x.DistrictName == district)
                    .Select(x => x.TownName)
                    .Distinct()
                    .ToList();
        }

        public List<TownStat> QueryTownStats(string city, string district)
        {
            var eNodebTownIds = _eNodebRepository.GetAllInUseList().Select(x => new
            {
                x.TownId,
                x.ENodebId
            });
            var btsTownIds = _btsRepository.GetAllInUseList().Select(x => new
            {
                x.TownId,
                x.BtsId
            });
            var cellENodebs = _cellRepository.GetAllInUseList();
            var cdmaCellBtsIds = _cdmaCellRepository.GetAllInUseList().Select(x => x.BtsId);
            return (from town in _repository.GetAllList(city, district)
                    let eNodebs = eNodebTownIds.Where(x => x.TownId == town.Id)
                    let btss = btsTownIds.Where(x => x.TownId == town.Id)
                    let cells = (from e in eNodebs join c in cellENodebs on e.ENodebId equals c.ENodebId select c)
                    let cdmaCells = (from b in btss join c in cdmaCellBtsIds on b.BtsId equals c select c)
                    select new TownStat
                    {
                        Town = town.TownName,
                        TotalLteENodebs = eNodebs.Count(),
                        TotalLteCells = cells.Count(x => x.Frequency != 2506),
                        Lte800Cells = cells.Count(x => x.BandClass == 5 && x.Frequency != 2506),
                        TotalNbIotCells = cells.Count(x => x.Frequency == 2506),
                        TotalCdmaBts = btss.Count(),
                        TotalCdmaCells = cdmaCells.Count()
                    }).ToList();
        }

        public LteCellStat QueryLteCellStat(string city, string district, string town, bool isIndoor)
        {
            var townId = GetTown(city, district, town)?.Id;
            if (townId == null) return null;
            var eNodebs = _eNodebRepository.GetAllList(x => x.TownId == townId);
            var cells =
            (from cell in _cellRepository.GetAllList(x => x.IsOutdoor != isIndoor)
                join eNodeb in eNodebs on cell.ENodebId equals eNodeb.ENodebId
                select cell).ToList();
            return new LteCellStat
            {
                Lte1800Cells = cells.Count(x => x.BandClass == 3),
                Lte2100Cells = cells.Count(x => x.BandClass == 1),
                Lte800Cells = cells.Count(x => x.BandClass == 5 && x.Frequency != 2506),
                TotalNbIotCells = cells.Count(x => x.Frequency == 2506),
                Lte2600Cells = cells.Count(x => x.BandClass == 41)
            };
        }

        public Town GetTown(string city, string district, string town)
        {
            return
                _repository.FirstOrDefault(
                    x => x.CityName == city && x.DistrictName == district && x.TownName == town);
        }

        public Tuple<string, string, string> GetTownNamesByENodebId(int eNodebId)
        {
            var item = _eNodebRepository.GetByENodebId(eNodebId);
            var town = item == null ? null : _repository.Get(item.TownId);
            return town == null
                ? null
                : new Tuple<string, string, string>(town.CityName, town.DistrictName, town.TownName);
        }

        public IEnumerable<TownBoundaryView> GetTownBoundaryViews(string city, string district, string town)
        {
            var item = _repository.QueryTown(city, district, town);
            if (item == null) return new List<TownBoundaryView>();
            var coors = _boundaryRepository.GetAllList(x => x.TownId == item.Id);
            var boundaries = new List<TownBoundaryView>();
            foreach (var coor in coors)
            {
                var coorList = coor.Boundary.GetSplittedFields(' ');
                var boundaryPoints = new List<GeoPoint>();
                for (var i = 0; i < coorList.Length / 2; i++)
                {
                    boundaryPoints.Add(new GeoPoint(coorList[i * 2].ConvertToDouble(0), coorList[i * 2 + 1].ConvertToDouble(0)));
                }
                boundaries.Add(new TownBoundaryView
                {
                    Town = town,
                    BoundaryGeoPoints = boundaryPoints
                });
            }
            return boundaries;
        }

        public bool IsInTownBoundaries(double longtitute, double lattitute, string city, string district, string town)
        {
            var item = _repository.QueryTown(city, district, town);
            if (item == null) return false;
            var point = new GeoPoint(longtitute, lattitute);
            return _boundaryRepository.GetAllList(x => x.TownId == item.Id).IsInTownRange(point);
        }
    }

    public class AlarmsService
    {
        private readonly IAlarmRepository _repository;

        public AlarmsService(IAlarmRepository repository)
        {
            _repository = repository;
            if (AlarmStats == null)
                AlarmStats = new Stack<AlarmStat>();
        }

        public IEnumerable<AlarmView> Get(int eNodebId, DateTime begin, DateTime end)
        {
            var stats = _repository.GetAllList(begin, end, eNodebId);
            return Mapper.Map<IEnumerable<AlarmStat>, IEnumerable<AlarmView>>(stats);
        }

        public IEnumerable<AlarmView> Get(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            var stats = _repository.GetAllList(begin, end, eNodebId, sectorId);
            return Mapper.Map<IEnumerable<AlarmStat>, IEnumerable<AlarmView>>(stats);
        }

        public IEnumerable<AlarmView> Get(int eNodebId, DateTime begin, DateTime end, string levelDescription)
        {
            var stats = _repository.GetAllList(begin, end, eNodebId);
            IEnumerable<AlarmStat> refinedStats;
            switch (levelDescription)
            {
                case "严重告警":
                    refinedStats =
                        stats.Where(x => x.AlarmLevel == AlarmLevel.Serious || x.AlarmLevel == AlarmLevel.Urgent);
                    break;
                case "重要以上告警":
                    refinedStats =
                        stats.Where(
                            x =>
                                x.AlarmLevel == AlarmLevel.Serious || x.AlarmLevel == AlarmLevel.Urgent ||
                                x.AlarmLevel == AlarmLevel.Primary || x.AlarmLevel == AlarmLevel.Important);
                    break;
                default:
                    refinedStats = stats;
                    break;
            }
            return Mapper.Map<IEnumerable<AlarmStat>, IEnumerable<AlarmView>>(refinedStats);
        }

        public int GetCounts(int eNodebId, DateTime begin, DateTime end)
        {
            return _repository.Count(begin, end, eNodebId);
        }

        private static Stack<AlarmStat> AlarmStats { get; set; }

        public void UploadZteAlarms(StreamReader reader)
        {
            try
            {
                var stats = CsvContext.Read<AlarmStatCsv>(reader, CsvFileDescription.CommaDescription).ToList();
                foreach (var stat in stats)
                {
                    AlarmStats.Push(Mapper.Map<AlarmStatCsv, AlarmStat>(stat));
                }
            }
            catch
            {
                //ignore.
            }
        }

        public void UploadHwAlarms(StreamReader reader)
        {
            try
            {
                var stats = CsvContext.Read<AlarmStatHuawei>(reader, CsvFileDescription.CommaDescription).ToList();
                foreach (var stat in stats)
                {
                    AlarmStats.Push(Mapper.Map<AlarmStatHuawei, AlarmStat>(stat));
                }
            }
            catch
            {
                // ignored
            }
        }

        public bool DumpOneStat()
        {
            var stat = AlarmStats.Pop();
            if (stat == null) throw new NullReferenceException("alarm stat is null!");
            var item =
                _repository.FirstOrDefault(
                    x =>
                        x.HappenTime == stat.HappenTime && x.ENodebId == stat.ENodebId && x.SectorId == stat.SectorId &&
                        x.AlarmId == stat.AlarmId);
            if (item == null)
            {
                _repository.Insert(stat);
            }
            else
            {
                item.RecoverTime = stat.RecoverTime;
            }
            _repository.SaveChanges();
            return true;
        }

        public int GetAlarmsToBeDump()
        {
            return AlarmStats.Count;
        }

        public IEnumerable<AlarmStat> GetAlarmsToBeDump(int begin, int range)
        {
            return AlarmStats.Skip(begin).Take(range);
        }

        public IEnumerable<AlarmStat> QueryAlarmStats()
        {
            return AlarmStats;
        }

        public void ClearAlarmStats()
        {
            AlarmStats.Clear();
        }

        public IEnumerable<AlarmHistory> GetAlarmHistories(DateTime begin, DateTime end)
        {
            var results = new List<AlarmHistory>();
            while (begin < end.AddDays(1))
            {
                var beginDate = begin;
                var endDate = begin.AddDays(1);
                var items = _repository.GetAllList(beginDate, endDate);
                results.Add(new AlarmHistory
                {
                    DateString = begin.ToShortDateString(),
                    Alarms = items.Count
                });
                begin = begin.AddDays(1);
            }
            return results;
        }

        public int DumpHuaweiAlarmInfo(HuaweiLocalCellDef cellDef)
        {
            var items = _repository.GetAllList(DateTime.Now.AddDays(-100), DateTime.Now, cellDef.ENodebId);
            foreach (var item in items.Where(x => x.SectorId == 0))
            {
                if (item.AlarmCategory == AlarmCategory.Huawei)
                {
                    switch (item.AlarmType)
                    {
                        //eNodeB名称=大良南区电信LBBU6, 本地小区标识=3, 小区双工模式=FDD, 小区名称=大良美的广场擎峰_3, eNodeB标识=501157, 小区标识=51, 具体问题=射频单元异常
                        case AlarmType.CellDown://AlarmType=4
                            item.AlarmCategory = AlarmCategory.Qos;
                            item.SectorId =
                                byte.Parse(
                                    item.Details.Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries)[5].Split('=')
                                        [1]);
                            break;
                        //eNodeB名称=杏坛电信LBBU13, 本地小区标识=2, PCI值=212, 下行频点=1825, 小区双工模式=FDD, 冲突类型=混淆, 小区名称=杏坛万亩员工村R_2, eNodeB标识=500578, 小区标识=50
                        case AlarmType.PciCrack://AlarmType=46
                            item.AlarmCategory = AlarmCategory.Qos;
                            item.SectorId =
                                byte.Parse(
                                    item.Details.Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries)[8].Split('=')
                                        [1]);
                            break;
                        //eNodeB名称=乐从奥运林, 本地小区标识=0, 小区双工模式=FDD, 小区当前使用发射通道数=2, 小区当前使用接收通道数=4, 小区名称=乐从奥运林_0, eNodeB标识=499773, 小区标识=0, 具体问题=基带降额
                        //eNodeB名称=乐从东平桥脚, 本地小区标识=4, 小区双工模式=FDD, 小区当前使用发射通道数=1, 小区当前使用接收通道数=2, 小区名称=乐从东平桥脚_4, eNodeB标识=500264, 小区标识=4, 具体问题=通道异常
                        //eNodeB名称=容桂华口接入机房LBBU2, 本地小区标识=1, 小区双工模式=FDD, 小区当前使用发射通道数=2, 小区当前使用接收通道数=4, 小区名称=容桂骏业路R_1, eNodeB标识=552563, 小区标识=49, 具体问题=基带降额
                        case AlarmType.BadPerformance://AlarmType=43
                            item.SectorId =
                               byte.Parse(
                                   item.Details.Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries)[7].Split('=')
                                       [1]);
                            item.AlarmCategory = AlarmCategory.Apparatus;
                            break;
                        default:
                            item.SectorId = 255;
                            break;
                    }
                }
                else
                    item.SectorId = 255;
                _repository.Update(item);
            }
            return _repository.SaveChanges();
        }
    }
}
