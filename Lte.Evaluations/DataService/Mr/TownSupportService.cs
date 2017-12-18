using System;
using System.Collections.Generic;
using System.Linq;
using Lte.Domain.Common.Geo;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.Mr
{
    public class TownSupportService
    {
        private readonly ITownRepository _townRepository;
        private readonly ITownBoundaryRepository _boundaryRepository;

        public TownSupportService(ITownRepository townRepository, ITownBoundaryRepository boundaryRepository)
        {
            _townRepository = townRepository;
            _boundaryRepository = boundaryRepository;
        }
        
        public List<List<GeoPoint>> QueryTownBoundaries(string district, string town)
        {
            var townItem = _townRepository.QueryTown(district, town);
            if (townItem == null) return null;
            return _boundaryRepository.GetAllList(x => x.TownId == townItem.Id).Select(x => x.CoorList()).ToList();
        }
        
    }

    public class MonthKpiService
    {
        private readonly IMonthKpiRepository _repository;

        public MonthKpiService(IMonthKpiRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<MonthKpiStat> QueryLastMonthKpiStats()
        {
            var result = new List<MonthKpiStat>();

            var end = new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1);
            while (!result.Any() && end > DateTime.Today.AddYears(-1))
            {
                var begin = end.AddMonths(-1);
                result = _repository.GetAllList(x => x.StatDate >= begin && x.StatDate < end);
            }

            return result;
        }

        private Tuple<IEnumerable<string>, IEnumerable<Tuple<string, IEnumerable<T>>>> QueryMonthTrend<T>(Func<MonthKpiStat, T> func)
        {
            var end = DateTime.Today;
            var begin = DateTime.Today.AddYears(-1);
            var result = _repository.GetAllList(x => x.StatDate >= begin && x.StatDate < end);
            var category = result.Select(x => x.StatDate).Distinct().Select(x => x.ToString("yyyy-MM"));
            return new Tuple<IEnumerable<string>, IEnumerable<Tuple<string, IEnumerable<T>>>>(category,
                result.GroupBy(x => x.District).Select(x => new Tuple<string, IEnumerable<T>>(x.Key, x.Select(func))));
        }

        public Tuple<IEnumerable<string>, IEnumerable<Tuple<string, IEnumerable<double>>>> QureyMonthDropTrend()
        {
            return QueryMonthTrend(x => x.Drop2GRate);
        }
    }
}