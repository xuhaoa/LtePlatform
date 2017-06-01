using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Evaluations.ViewModels.College;
using Lte.Evaluations.ViewModels.Precise;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.College;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;

namespace Lte.Evaluations.DataService.College
{
    public class CollegeStatService
    {
        private readonly ICollegeRepository _repository;
        private readonly IInfrastructureRepository _infrastructureRepository;
        private readonly ICollegeYearRepository _yearRepository;
        private readonly IHotSpotENodebRepository _eNodebRepository;
        private readonly IHotSpotCellRepository _cellRepository;
        private readonly IHotSpotBtsRepository _btsRepository;
        private readonly IHotSpotCdmaCellRepository _cdmaCellRepository;

        public CollegeStatService(ICollegeRepository repository, IInfrastructureRepository infrastructureRepository,
            ICollegeYearRepository yearRepository, IHotSpotENodebRepository eNodebRepository, IHotSpotCellRepository cellRepository,
            IHotSpotBtsRepository btsRepository, IHotSpotCdmaCellRepository cdmaCellRepository)
        {
            _repository = repository;
            _infrastructureRepository = infrastructureRepository;
            _yearRepository = yearRepository;
            _eNodebRepository = eNodebRepository;
            _cellRepository = cellRepository;
            _btsRepository = btsRepository;
            _cdmaCellRepository = cdmaCellRepository;
        }
        
        public CollegeInfo QueryInfo(int id)
        {
            return _repository.Get(id);
        }

        public CollegeInfo QueryInfo(string name)
        {
            return _repository.FirstOrDefault(x => x.Name == name);
        }

        public CollegeYearInfo QueryInfo(string name, int year)
        {
            var info = _repository.GetByName(name);
            return info == null
                ? null
                : _yearRepository.GetByCollegeAndYear(info.Id, year);
        }

        public async Task<int> SaveCollegeInfo(CollegeInfo info, long userId)
        {
            var item = _repository.GetByName(info.Name);
            if (item == null)
            {
                info.CreatorUserId = userId;
                await _repository.InsertAsync(info);
            }
            else
            {
                item.TownId = info.TownId;
                var areaItem = _repository.GetRegion(item.Id);
                if (areaItem == null)
                {
                    item.CollegeRegion = info.CollegeRegion;
                }
                else
                {
                    areaItem.Area = info.CollegeRegion.Area;
                    areaItem.Info = info.CollegeRegion.Info;
                    areaItem.RegionType = info.CollegeRegion.RegionType;
                }
            }
            return _repository.SaveChanges();
        } 

        public async Task<int> SaveYearInfo(CollegeYearInfo info)
        {
            var item = _yearRepository.GetByCollegeAndYear(info.CollegeId, info.Year);
            if (item != null) return 0;
            await _yearRepository.InsertAsync(info);
            return _yearRepository.SaveChanges();
        } 

        public CollegeStat QueryStat(int id, int year)
        {
            var info = _repository.Get(id);
            return info == null
                ? null
                : new CollegeStat(_repository, info, _yearRepository.GetByCollegeAndYear(id, year),
                    _infrastructureRepository, _eNodebRepository, _cellRepository, _btsRepository, _cdmaCellRepository);
        }

        public IEnumerable<CollegeStat> QueryStats(int year)
        {
            var infos = _repository.GetAllList();
            return !infos.Any()
                ? new List<CollegeStat>()
                : infos.Select(
                    x =>
                        new CollegeStat(_repository, x, _yearRepository.GetByCollegeAndYear(x.Id, year),
                            _infrastructureRepository, _eNodebRepository, _cellRepository, _btsRepository, _cdmaCellRepository))
                            .Where(x=>x.ExpectedSubscribers > 0);
        }

        public List<CollegeInfo> QueryInfos()
        {
            return _repository.GetAllList();
        } 

        public IEnumerable<CollegeYearView> QueryYearViews(int year)
        {
            var infos = _yearRepository.GetAllList(year);
            return !infos.Any()
                ? new List<CollegeYearView>()
                : infos.Select(x =>
                {
                    var stat = Mapper.Map<CollegeYearView>(x);
                    stat.Name = _repository.Get(x.CollegeId).Name;
                    return stat;
                });
        } 

        public IEnumerable<string> QueryNames()
        {
            return _repository.GetAllList().Select(x => x.Name).Distinct();
        }

        public IEnumerable<string> QueryNames(int year)
        {
            var infos = _repository.GetAllList();
            var query =
                infos.Select(x => new {x.Name, YearInfo = _yearRepository.GetByCollegeAndYear(x.Id, year)})
                    .Where(x => x.YearInfo != null);
            return query.Select(x => x.Name).Distinct();
        }
    }

    public class CollegeKpiService
    {
        private readonly ICollegeKpiRepository _repository;
        private readonly ICollegeRepository _collegeRepository;

        public CollegeKpiService(ICollegeKpiRepository repository, ICollegeRepository collegeRepository)
        {
            _repository = repository;
            _collegeRepository = collegeRepository;
        }

        public IEnumerable<CollegeKpiView> GetViews(DateTime date, int hour)
        {
            var time = date.AddHours(hour);
            var results = _repository.GetAllList(time);

            if (!results.Any()) return new List<CollegeKpiView>();
            return results.Select(x =>
            {
                var college = _collegeRepository.Get(x.CollegeId);
                var view = x.MapTo<CollegeKpiView>();
                view.CollegeName = college?.Name;
                return view;
            });
        }

        public CollegeKpi GetResult(DateTime date, int hour, string name)
        {
            var college = _collegeRepository.GetByName(name);
            if (college == null) return null;
            var time = date.AddHours(hour);
            var result = _repository.GetByCollegeIdAndTime(college.Id, time);
            return result ?? new CollegeKpi
            {
                TestTime = date.AddHours(hour),
                CollegeId = college.Id,
                OnlineUsers = 100,
                DownloadFlow = 10,
                UploadFlow = 1,
                RrcConnection = 99.9,
                ErabConnection = 99.9,
                ErabDrop = 0.1,
                Connection2G = 99.8,
                Connection3G = 99.9,
                Erlang3G = 32,
                Flow3G = 1,
                Drop3G = 0.1
            };
        }

        public Dictionary<string, double> GetAverageKpi(DateTime begin, DateTime end, string kpiName)
        {
            var property = typeof(CollegeKpi).GetProperty(kpiName);
            if (property == null) return null;
            var results = _repository.GetAllList(begin, end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, Kpi = (double)property.GetValue(r) };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Kpi));
        }

        public static string GetKpiName(string tips)
        {
            var dictionay = new Dictionary<string, string>
            {
                {"在线用户数", "OnlineUsers"},
                {"下行速率", "DownloadFlow"},
                {"上行速率", "UploadFlow" },
                {"rRC连接成功率", "RrcConnection" },
                {"e-RAB连接成功率", "ErabConnection" },
                {"e-RAB掉线率", "ErabDrop" },
                {"呼建成功率", "Connection2G" },
                {"3G连接成功率", "Connection3G" },
                {"3G话务量", "Erlang3G" },
                {"3G流量", "Flow3G" },
                {"3G掉线率", "Drop3G" }
            };
            return dictionay.ContainsKey(tips) ? dictionay[tips] : "OnlineUsers";
        }

        public async Task<CollegeKpi> Post(CollegeKpi stat)
        {
            var item = await _repository.InsertOrUpdateAsync(stat);
            _repository.SaveChanges();
            return item;
        }

        public async Task<int> Delete(CollegeKpi stat)
        {
            await _repository.DeleteAsync(stat);
            return _repository.SaveChanges();
        }

        public CollegeKpi GetRecordResult(CollegeKpiView view)
        {
            var college = _collegeRepository.GetByName(view.CollegeName);
            if (college == null) return null;
            var time = view.TestTime;
            return _repository.GetByCollegeIdAndTime(college.Id, time);
        }
    }

    public class CollegePreciseService
    {
        private readonly IInfrastructureRepository _repository;
        private readonly ICellRepository _cellRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly IPreciseCoverage4GRepository _kpiRepository;

        public CollegePreciseService(IInfrastructureRepository repository, ICellRepository cellRepository,
            IENodebRepository eNodebRepository, IPreciseCoverage4GRepository kpiRepository)
        {
            _repository = repository;
            _cellRepository = cellRepository;
            _eNodebRepository = eNodebRepository;
            _kpiRepository = kpiRepository;
        }

        public IEnumerable<CellPreciseKpiView> GetViews(string collegeName, DateTime begin, DateTime end)
        {
            var ids = _repository.GetCollegeInfrastructureIds(collegeName, InfrastructureType.Cell);
            var query =
                ids.Select(_cellRepository.Get).Where(cell => cell != null)
                    .Select(x => CellPreciseKpiView.ConstructView(x, _eNodebRepository)).ToList();
            foreach (var view in query)
            {
                view.UpdateKpi(_kpiRepository, begin, end);
            }
            return query;
        }
    }

    public class College3GTestService
    {
        private readonly ICollege3GTestRepository _repository;
        private readonly ICollegeRepository _collegeRepository;

        public College3GTestService(ICollege3GTestRepository repository, ICollegeRepository collegeRepository)
        {
            _repository = repository;
            _collegeRepository = collegeRepository;
        }

        public IEnumerable<College3GTestView> GetViews(DateTime begin, DateTime end, string name)
        {
            var college = _collegeRepository.GetByName(name);
            if (college == null) return new List<College3GTestView>();
            var results =
                _repository.GetAllList(x => x.TestTime >= begin && x.TestTime < end && x.CollegeId == college.Id)
                    .MapTo<List<College3GTestView>>();
            results.ForEach(x => x.CollegeName = name);
            return results;
        }

        public Dictionary<string, double> GetAverageRates(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList(begin, end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, Rate = r.DownloadRate };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Rate));
        }

        public Dictionary<string, double> GetAverageUsers(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList(begin, end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, Users = (double)r.AccessUsers };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Users));
        }

        public Dictionary<string, double> GetAverageMinRssi(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList(begin, end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, Rssi = r.MinRssi };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Rssi));
        }

        public Dictionary<string, double> GetAverageMaxRssi(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList(begin, end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, Rssi = r.MaxRssi };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Rssi));
        }

        public Dictionary<string, double> GetAverageVswr(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList(begin, end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, r.Vswr };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Vswr));
        }

        public async Task<int> Post(College3GTestView view)
        {
            var college = _collegeRepository.GetByName(view.CollegeName);
            if (college == null) return 0;
            view.TestTime = DateTime.Today.AddHours(DateTime.Now.Hour);
            var result =
                _repository.FirstOrDefault(
                    x => x.TestTime == view.TestTime && x.CollegeId == college.Id && x.Place == view.Place);
            if (result != null)
                Mapper.Map(view, result);
            else
                result = view.MapTo<College3GTestResults>();
            result.CollegeId = college.Id;
            await _repository.InsertOrUpdateAsync(result);
            return _repository.SaveChanges();
        }
    }

    public class College4GTestService
    {
        private readonly ICollege4GTestRepository _repository;
        private readonly ICollegeRepository _collegeRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly ICellRepository _cellRepository;

        public College4GTestService(ICollege4GTestRepository repository,
            ICollegeRepository collegeRepository, IENodebRepository eNodebRepository, ICellRepository cellRepository)
        {
            _repository = repository;
            _collegeRepository = collegeRepository;
            _eNodebRepository = eNodebRepository;
            _cellRepository = cellRepository;
        }

        public IEnumerable<College4GTestView> GetViews(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList(x => x.TestTime >= begin && x.TestTime < end);
            if (!results.Any()) return new List<College4GTestView>();
            return results.Select(x =>
            {
                var college = _collegeRepository.Get(x.CollegeId);
                var eNodeb = _eNodebRepository.GetByENodebId(x.ENodebId);
                var cell = eNodeb == null
                    ? null
                    : _cellRepository.GetBySectorId(x.ENodebId, x.SectorId);
                var view = x.MapTo<College4GTestView>();
                view.CollegeName = college?.Name;
                view.CellName = eNodeb?.Name + "-" + x.SectorId;
                view.Pci = cell?.Pci ?? -1;
                return view;
            });
        }

        public IEnumerable<College4GTestView> GetResult(DateTime begin, DateTime end, string name)
        {
            var college = _collegeRepository.GetByName(name);
            if (college == null) return new List<College4GTestView>();

            var result =
                _repository.GetAllList(x => x.TestTime >= begin && x.TestTime < end && x.CollegeId == college.Id);
            var views = result.MapTo<IEnumerable<College4GTestView>>().Select(x =>
            {
                var eNodeb = _eNodebRepository.GetByENodebId(x.ENodebId);
                var cell = eNodeb == null
                    ? null
                    : _cellRepository.GetBySectorId(x.ENodebId, x.SectorId);
                var view = x.MapTo<College4GTestView>();
                view.CollegeName = name;
                view.CellName = eNodeb?.Name + "-" + x.SectorId;
                view.Pci = cell?.Pci ?? -1;
                return view;
            });
            return views;
        }

        public Dictionary<string, double> GetAverageRates(DateTime begin, DateTime end, byte upload)
        {
            var results = _repository.GetAllList().Where(x => x.TestTime >= begin && x.TestTime < end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, Rate = (upload == 0) ? r.DownloadRate : r.UploadRate };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Rate));
        }

        public Dictionary<string, double> GetAverageUsers(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList().Where(x => x.TestTime >= begin && x.TestTime < end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, Users = (double)r.AccessUsers };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Users));
        }

        public Dictionary<string, double> GetAverageRsrp(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList().Where(x => x.TestTime >= begin && x.TestTime < end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, r.Rsrp };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Rsrp));
        }

        public Dictionary<string, double> GetAverageSinr(DateTime begin, DateTime end)
        {
            var results = _repository.GetAllList().Where(x => x.TestTime >= begin && x.TestTime < end);
            var query = from r in results
                        join c in _collegeRepository.GetAllList() on r.CollegeId equals c.Id
                        select new { c.Name, r.Sinr };
            return query.GroupBy(x => x.Name).ToDictionary(s => s.Key, t => t.Average(x => x.Sinr));
        }

        public async Task<int> Post(College4GTestView view)
        {
            var college = _collegeRepository.GetByName(view.CollegeName);
            if (college == null) return 0;
            view.TestTime = DateTime.Today.AddHours(DateTime.Now.Hour);
            var result =
                _repository.FirstOrDefault(
                    x => x.TestTime == view.TestTime && x.CollegeId == college.Id && x.Place == view.Place);
            if (result != null)
                Mapper.Map(view, result);
            else
                result = view.MapTo<College4GTestResults>();
            result.CollegeId = college.Id;
            var fields = view.CellName.GetSplittedFields('-');
            if (fields.Length > 1)
            {
                var eNodeb = _eNodebRepository.GetByName(fields[0]);
                if (eNodeb != null)
                {
                    result.ENodebId = eNodeb.ENodebId;
                    result.SectorId = fields[1].ConvertToByte(0);
                }
            }
            await _repository.InsertOrUpdateAsync(result);
            return _repository.SaveChanges();
        }
    }
}
