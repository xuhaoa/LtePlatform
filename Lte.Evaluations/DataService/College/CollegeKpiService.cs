using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Lte.Evaluations.ViewModels.College;
using Lte.Evaluations.ViewModels.Precise;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities.College;

namespace Lte.Evaluations.DataService.College
{
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
            var property = typeof (CollegeKpi).GetProperty(kpiName);
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
            var ids = _repository.GetCellIds(collegeName);
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
}
