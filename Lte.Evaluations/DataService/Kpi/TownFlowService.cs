using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Dependency;
using Abp.EntityFramework.Extensions;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common.Wireless;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.Kpi
{
    public class TownFlowService
    {
        private readonly ITownFlowRepository _repository;
        private readonly ITownRepository _townRepository;

        public TownFlowService(ITownFlowRepository repository, ITownRepository townRepository)
        {
            _repository = repository;
            _townRepository = townRepository;
        }

        public IEnumerable<TownFlowView> QueryLastDateView(DateTime initialDate,
            FrequencyBandType frequency = FrequencyBandType.All)
        {
            var stats = _repository.QueryLastDate(initialDate,
                (repository, beginDate, endDate) =>
                    repository.GetAllList(x => x.StatTime >= beginDate && x.StatTime < endDate 
                    && x.FrequencyBandType == frequency)
                            .OrderBy(x => x.StatTime)
                        .ToList());
            return stats.Select(x => x.ConstructView<TownFlowStat, TownFlowView>(_townRepository));
        }

        public IEnumerable<TownFlowView> QueryLastDateView(DateTime initialDate, string city, string district,
            FrequencyBandType frequency = FrequencyBandType.All)
        {
            var towns = _townRepository.GetAllList(x => x.CityName == city && x.DistrictName == district);
            var stats = _repository.QueryLastDate(initialDate,
                (repository, beginDate, endDate) =>
                    repository.GetAllList(x => x.StatTime >= beginDate && x.StatTime < endDate
                    && x.FrequencyBandType == frequency)
                            .OrderBy(x => x.StatTime)
                        .ToList());
            var filterStats = from s in stats join t in towns on s.TownId equals t.Id select s;
            return filterStats.Select(x => x.ConstructView<TownFlowStat, TownFlowView>(_townRepository));
        }

        public IEnumerable<TownFlowStat> QueryCurrentDateStats(DateTime currentDate, FrequencyBandType frequency)
        {
            var beginDate = currentDate.Date;
            var endDate = beginDate.AddDays(1);
            return
                _repository.GetAllList(
                    x => x.StatTime >= beginDate && x.StatTime < endDate && x.FrequencyBandType == frequency);
        }

        public FlowRegionDateView QueryLastDateStat(DateTime initialDate, string city)
        {
            var stats = _repository.QueryLastDate(initialDate, (repository, beginDate, endDate) =>
            {
                var query =
                    _repository.GetAllList(x => x.StatTime >= beginDate & x.StatTime < endDate && x.FrequencyBandType == FrequencyBandType.All);
                return query.FilterTownList(_townRepository.GetAllList().Where(x => x.CityName == city).ToList());
            });
            var townViews = stats.ConstructViews<TownFlowStat, TownFlowView>(_townRepository);
            return townViews.QueryRegionDateView<FlowRegionDateView, DistrictFlowView, TownFlowView>(initialDate,
                DistrictFlowView.ConstructView);
        }

        public IEnumerable<FlowRegionDateView> QueryDateSpanStats(DateTime begin, DateTime end, string city,
            FrequencyBandType frequency = FrequencyBandType.All)
        {
            var townViews = QueryTownFlowViews(begin, end, city, frequency);
            return from view in townViews
                group view by view.StatTime into g
                select new FlowRegionDateView
                {
                    StatDate = g.Key,
                    TownViews = g.Select(x => x),
                    DistrictViews = g.Select(x => x).Merge(v =>v.MapTo<DistrictFlowView>())
                };
        }

        public List<TownFlowView> QueryTownFlowViews(DateTime begin, DateTime end, string city, FrequencyBandType frequency)
        {
            var query =
                _repository.GetAllList(x => x.StatTime >= begin && x.StatTime < end && x.FrequencyBandType == frequency)
                    .OrderBy(x => x.StatTime)
                    .ToList();
            var result = query.QueryTownStat(_townRepository, city);
            var townViews = result.Select(x => x.ConstructView<TownFlowStat, TownFlowView>(_townRepository)).ToList();
            return townViews;
        }

        public List<TownFlowStat> QueryTownFlowViews(DateTime begin, DateTime end, int townId, FrequencyBandType frequency)
        {
            var query =
                _repository.GetAllList(
                        x =>
                            x.StatTime >= begin && x.StatTime < end && x.FrequencyBandType == frequency &&
                            x.TownId == townId)
                    .OrderBy(x => x.StatTime)
                    .ToList();
            return query;
        }

        public TownFlowStat Update(TownFlowStat stat)
        {
            return _repository.ImportOne(stat);
        }
    }
}