using Lte.Evaluations.DataService.Switch;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;
using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Lte.Evaluations.ViewModels.RegionKpi;
using Abp.EntityFramework.Dependency;
using Abp.EntityFramework.Extensions;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common.Wireless;

namespace Lte.Evaluations.DataService.Kpi
{
    public class FlowQueryService : DateSpanQuery<FlowView, IFlowHuaweiRepository, IFlowZteRepository>
    {
        private IEnumerable<FlowView> QueryDistrictViews(string city, string district, DateTime begin, DateTime end)
        {
            var zteStats =
                ZteRepository.GetAllList(
                    x => x.StatTime >= begin && x.StatTime < end && x.RedirectA2 + x.RedirectB2 > 2000);
            var huaweiStats =
                HuaweiRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end && x.RedirectCdma2000 > 2000);
            var results = HuaweiCellRepository.QueryDistrictFlowViews<FlowView, FlowZte, FlowHuawei>(city, district,
                zteStats,
                huaweiStats,
                TownRepository, ENodebRepository);
            return results;
        }

        private List<FlowView> QueryTopViewsByPolicy(IEnumerable<FlowView> source, int topCount,
            OrderDownSwitchPolicy policy)
        {
            switch (policy)
            {
                case OrderDownSwitchPolicy.OrderByDownSwitchCountsDescendings:
                    return source.OrderByDescending(x => x.RedirectCdma2000).Take(topCount).ToList();
                case OrderDownSwitchPolicy.OrderByDownSwitchRateDescending:
                    return source.OrderByDescending(x => x.DownSwitchRate).Take(topCount).ToList();
            }
            return new List<FlowView>();
        }

        public List<FlowView> QueryTopDownSwitchViews(string city, string district, DateTime begin, DateTime end, int topCount)
        {
            var results = QueryDistrictViews(city, district, begin, end);
            return results.OrderByDescending(x => x.RedirectCdma2000).Take(topCount).ToList();
        }

        public List<FlowView> QueryTopDownSwitchViews(DateTime begin, DateTime end, int topCount, OrderDownSwitchPolicy policy)
        {
            var zteViews =
                ZteRepository.GetAllList(
                        x => x.StatTime >= begin && x.StatTime < end && x.RedirectA2 + x.RedirectB2 > 2000)
                    .MapTo<IEnumerable<FlowView>>();
            var huaweiViews =
                HuaweiRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end && x.RedirectCdma2000 > 2000)
                    .MapTo<IEnumerable<FlowView>>();
            var joinViews = zteViews.Concat(huaweiViews);
            return QueryTopViewsByPolicy(joinViews, topCount, policy);
        }

        public List<FlowView> QueryTopDownSwitchViews(string city, string district, DateTime begin, DateTime end,
            int topCount, OrderDownSwitchPolicy policy)
        {
            var joinViews = QueryDistrictViews(city, district, begin, end);
            return QueryTopViewsByPolicy(joinViews, topCount, policy);
        }

        public IEnumerable<FlowView> QueryTopRank2Views(string city, string district, DateTime begin, DateTime end,
            int topCount)
        {
            var results = HuaweiCellRepository.QueryDistrictFlowViews<FlowView, FlowZte, FlowHuawei>(city, district,
                ZteRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end && x.SchedulingTm3 -x.SchedulingTm3Rank2 > 10000000),
                HuaweiRepository.GetAllList(
                    x => x.StatTime >= begin && x.StatTime < end && x.SchedulingRank1 > 20000000),
                TownRepository, ENodebRepository);
            return results.OrderBy(x => x.Rank2Rate).Take(topCount);
        }

        public IEnumerable<FlowView> QueryAllTopRank2Views(DateTime begin, DateTime end,
            int topCount)
        {
            var results = HuaweiCellRepository.QueryAllFlowViews<FlowView, FlowZte, FlowHuawei>(
                ZteRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end && x.SchedulingTm3 - x.SchedulingTm3Rank2 > 10000000),
                HuaweiRepository.GetAllList(
                    x => x.StatTime >= begin && x.StatTime < end && x.SchedulingRank1 > 20000000),
                ENodebRepository);
            return results.OrderBy(x => x.Rank2Rate).Take(topCount);
        }

        public FlowQueryService(IFlowHuaweiRepository huaweiRepository, IFlowZteRepository zteRepository,
            IENodebRepository eNodebRepository, ICellRepository huaweiCellRepository, ITownRepository townRepository)
            : base(huaweiRepository, zteRepository, eNodebRepository, huaweiCellRepository, townRepository)
        {
        }

        protected override Switch.IDateSpanQuery<List<FlowView>> GenerateHuaweiQuery(int eNodebId, byte sectorId)
        {
            return new HuaweiFlowQuery(HuaweiRepository, HuaweiCellRepository, eNodebId, sectorId);
        }

        protected override Switch.IDateSpanQuery<List<FlowView>> GenerateZteQuery(int eNodebId, byte sectorId)
        {
            return new ZteFlowQuery(ZteRepository, eNodebId, sectorId);
        }
    }

    public class HuaweiFlowQuery : HuaweiDateSpanQuery<FlowHuawei, FlowView, IFlowHuaweiRepository>
    {
        public HuaweiFlowQuery(IFlowHuaweiRepository huaweiRepository, ICellRepository huaweiCellRepository,
            int eNodebId, byte sectorId) 
            : base(huaweiRepository, huaweiCellRepository, eNodebId, sectorId)
        {
        }

        protected override List<FlowHuawei> QueryList(DateTime begin, DateTime end, byte localCellId)
        {
            return HuaweiRepository.GetAllList(begin, end, ENodebId, localCellId);
        }
    }

    public class ZteFlowQuery : ZteDateSpanQuery<FlowZte, FlowView, IFlowZteRepository>
    {
        public ZteFlowQuery(IFlowZteRepository zteRepository, int eNodebId, byte sectorId)
            : base(zteRepository, eNodebId, sectorId)
        {
        }

        protected override List<FlowZte> QueryList(DateTime begin, DateTime end)
        {
            return ZteRepository.GetAllList(begin, end, ENodebId, SectorId);
        }
    }

    public class RrcQueryService : DateSpanQuery<RrcView, IRrcHuaweiRepository, IRrcZteRepository>
    {
        public RrcQueryService(IRrcHuaweiRepository huaweiRepository, IRrcZteRepository zteRepository,
            IENodebRepository eNodebRepository, ICellRepository huaweiCellRepository, ITownRepository townRepository)
            : base(huaweiRepository, zteRepository, eNodebRepository, huaweiCellRepository, townRepository)
        {
        }

        protected override Switch.IDateSpanQuery<List<RrcView>> GenerateHuaweiQuery(int eNodebId, byte sectorId)
        {
            return new HuaweiRrcQuery(HuaweiRepository, HuaweiCellRepository, eNodebId, sectorId);
        }

        protected override Switch.IDateSpanQuery<List<RrcView>> GenerateZteQuery(int eNodebId, byte sectorId)
        {
            return new ZteRrcQuery(ZteRepository, eNodebId, sectorId);
        }

        public IEnumerable<RrcView> QueryTopRrcFailViews(string city, string district, DateTime begin, DateTime end,
            int topCount)
        {
            var results = HuaweiCellRepository.QueryDistrictFlowViews<RrcView, RrcZte, RrcHuawei>(city, district,
                ZteRepository.GetAllList(
                    x =>
                        x.StatTime >= begin && x.StatTime < end &&
                        x.MoDataRrcRequest + x.MoSignallingRrcRequest + x.MtAccessRrcRequest > 20000),
                HuaweiRepository.GetAllList(
                    x =>
                        x.StatTime >= begin && x.StatTime < end &&
                        x.MoDataRrcRequest + x.MoSignallingRrcRequest + x.MtAccessRrcRequest > 20000),
                TownRepository, ENodebRepository);
            return results.OrderByDescending(x => x.TotalRrcFail).Take(topCount);
        }
    }

    public class HuaweiRrcQuery : HuaweiDateSpanQuery<RrcHuawei, RrcView, IRrcHuaweiRepository>
    {
        public HuaweiRrcQuery(IRrcHuaweiRepository huaweiRepository, ICellRepository huaweiCellRepository, int eNodebId,
            byte sectorId) : base(huaweiRepository, huaweiCellRepository, eNodebId, sectorId)
        {
        }

        protected override List<RrcHuawei> QueryList(DateTime begin, DateTime end, byte localCellId)
        {
            return
                HuaweiRepository.GetAllList(
                    x =>
                        x.StatTime >= begin && x.StatTime < end && x.ENodebId == ENodebId &&
                        x.LocalCellId == localCellId);
        }
    }

    public class ZteRrcQuery : ZteDateSpanQuery<RrcZte, RrcView, IRrcZteRepository>
    {
        public ZteRrcQuery(IRrcZteRepository zteRepository, int eNodebId, byte sectorId)
            : base(zteRepository, eNodebId, sectorId)
        {
        }

        protected override List<RrcZte> QueryList(DateTime begin, DateTime end)
        {
            return
                ZteRepository.GetAllList(
                    x => x.StatTime >= begin && x.StatTime < end && x.ENodebId == ENodebId && x.SectorId == SectorId);
        }
    }

    public class CqiQueryService : DateSpanQuery<QciView, IQciHuaweiRepository, IQciZteRepository>
    {
        public CqiQueryService(IQciHuaweiRepository huaweiRepository, IQciZteRepository zteRepository,
            IENodebRepository eNodebRepository, ICellRepository huaweiCellRepository, ITownRepository townRepository)
            : base(huaweiRepository, zteRepository, eNodebRepository, huaweiCellRepository, townRepository)
        {
        }

        protected override Switch.IDateSpanQuery<List<QciView>> GenerateHuaweiQuery(int eNodebId, byte sectorId)
        {
            return new HuaweiQciQuery(HuaweiRepository, HuaweiCellRepository, eNodebId, sectorId);
        }

        protected override Switch.IDateSpanQuery<List<QciView>> GenerateZteQuery(int eNodebId, byte sectorId)
        {
            return new ZteQciQuery(ZteRepository, eNodebId, sectorId);
        }

        private IEnumerable<QciView> QueryDistrictViews(string city, string district, DateTime begin, DateTime end)
        {
            var zteStats =
                ZteRepository.GetAllList(
                    x => x.StatTime >= begin && x.StatTime < end 
                    && x.Cqi0Times + x.Cqi1Times + x.Cqi2Times + x.Cqi3Times + x.Cqi4Times
                    + x.Cqi5Times + x.Cqi6Times + x.Cqi7Times + x.Cqi8Times + x.Cqi9Times
                    + x.Cqi10Times + x.Cqi11Times + x.Cqi12Times + x.Cqi13Times + x.Cqi14Times + x.Cqi15Times > 2000);
            var huaweiStats =
                HuaweiRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end
                    && x.Cqi0Times + x.Cqi1Times + x.Cqi2Times + x.Cqi3Times + x.Cqi4Times
                    + x.Cqi5Times + x.Cqi6Times + x.Cqi7Times + x.Cqi8Times + x.Cqi9Times
                    + x.Cqi10Times + x.Cqi11Times + x.Cqi12Times + x.Cqi13Times + x.Cqi14Times + x.Cqi15Times > 2000);
            var results = HuaweiCellRepository.QueryDistrictFlowViews<QciView, QciZte, QciHuawei>(city, district,
                zteStats,
                huaweiStats,
                TownRepository, ENodebRepository);
            return results;
        }

        private List<QciView> QueryTopViewsByPolicy(IEnumerable<QciView> source, int topCount,
            OrderCqiPolicy policy)
        {
            switch (policy)
            {
                case OrderCqiPolicy.OrderByCqiRate:
                    return source.OrderBy(x => x.CqiRate).Take(topCount).ToList();
                case OrderCqiPolicy.OrderByPoorCqiDescending:
                    return source.OrderByDescending(x => x.CqiCounts.Item1 - x.CqiCounts.Item2).Take(topCount).ToList();
            }
            return new List<QciView>();
        }

        public List<QciView> QueryTopCqiViews(string city, string district, DateTime begin, DateTime end, int topCount)
        {
            var results = QueryDistrictViews(city, district, begin, end);
            return results.OrderByDescending(x => x.CqiCounts.Item1 - x.CqiCounts.Item2).Take(topCount).ToList();
        }

        public List<QciView> QueryTopCqiViews(DateTime begin, DateTime end, int topCount, OrderCqiPolicy policy)
        {
            var zteViews =
                ZteRepository.GetAllList(
                    x => x.StatTime >= begin && x.StatTime < end
                    && x.Cqi0Times + x.Cqi1Times + x.Cqi2Times + x.Cqi3Times + x.Cqi4Times
                    + x.Cqi5Times + x.Cqi6Times + x.Cqi7Times + x.Cqi8Times + x.Cqi9Times
                    + x.Cqi10Times + x.Cqi11Times + x.Cqi12Times + x.Cqi13Times + x.Cqi14Times + x.Cqi15Times > 200000)
                    .MapTo<IEnumerable<QciView>>();
            var huaweiViews =
                HuaweiRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end
                    && x.Cqi0Times + x.Cqi1Times + x.Cqi2Times + x.Cqi3Times + x.Cqi4Times
                    + x.Cqi5Times + x.Cqi6Times + x.Cqi7Times + x.Cqi8Times + x.Cqi9Times
                    + x.Cqi10Times + x.Cqi11Times + x.Cqi12Times + x.Cqi13Times + x.Cqi14Times + x.Cqi15Times > 200000)
                    .MapTo<IEnumerable<QciView>>();
            var joinViews = zteViews.Concat(huaweiViews);
            return QueryTopViewsByPolicy(joinViews, topCount, policy);
        }

        public List<QciView> QueryTopCqiViews(string city, string district, DateTime begin, DateTime end,
            int topCount, OrderCqiPolicy policy)
        {
            var joinViews = QueryDistrictViews(city, district, begin, end);
            return QueryTopViewsByPolicy(joinViews, topCount, policy);
        }
    }

    public class HuaweiQciQuery : HuaweiDateSpanQuery<QciHuawei, QciView, IQciHuaweiRepository>
    {
        public HuaweiQciQuery(IQciHuaweiRepository huaweiRepository, ICellRepository huaweiCellRepository, int eNodebId,
            byte sectorId) : base(huaweiRepository, huaweiCellRepository, eNodebId, sectorId)
        {
        }

        protected override List<QciHuawei> QueryList(DateTime begin, DateTime end, byte localCellId)
        {
            return
                HuaweiRepository.GetAllList(
                    x =>
                        x.StatTime >= begin && x.StatTime < end && x.ENodebId == ENodebId &&
                        x.LocalCellId == localCellId);
        }
    }

    public class ZteQciQuery : ZteDateSpanQuery<QciZte, QciView, IQciZteRepository>
    {
        public ZteQciQuery(IQciZteRepository zteRepository, int eNodebId, byte sectorId)
            : base(zteRepository, eNodebId, sectorId)
        {
        }

        protected override List<QciZte> QueryList(DateTime begin, DateTime end)
        {
            return
                ZteRepository.GetAllList(
                    x => x.StatTime >= begin && x.StatTime < end && x.ENodebId == ENodebId && x.SectorId == SectorId);
        }
    }

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
                    repository.GetAllList(
                            x => x.StatTime >= beginDate && x.StatTime < endDate && x.FrequencyBandType == frequency)
                        .OrderBy(x => x.StatTime)
                        .ToList());
            return stats.Select(x => x.ConstructView<TownFlowStat, TownFlowView>(_townRepository));
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

    public class DownSwitchFlowService
    {
        private readonly IAppStreamRepository _streamRepository;
        private readonly IWebBrowsingRepository _browsingRepository;

        public DownSwitchFlowService(IAppStreamRepository streamRepository, IWebBrowsingRepository browsingRepository)
        {
            _streamRepository = streamRepository;
            _browsingRepository = browsingRepository;
        }
        
        public IEnumerable<AppSteam> QueryAppSteams(DateTime initialDate)
        {
            return
                _streamRepository.QueryDate(initialDate,
                    (repository, beginDate, endDate) =>
                        repository.GetAllList(x => x.StatDate >= beginDate && x.StatDate < endDate)).ToList();
        }

        public IEnumerable<WebBrowsing> QueryBrowsings(DateTime initialDate)
        {
            return
                _browsingRepository.QueryDate(initialDate,
                    (repository, beginDate, endDate) =>
                        repository.GetAllList(x => x.StatDate >= beginDate && x.StatDate < endDate)).ToList();
        }
    }
}
