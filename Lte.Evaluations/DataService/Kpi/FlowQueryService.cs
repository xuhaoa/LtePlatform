using Lte.Evaluations.DataService.Switch;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Lte.Evaluations.ViewModels.RegionKpi;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Common.Wireless;

namespace Lte.Evaluations.DataService.Kpi
{
    public class FlowQueryService : DateSpanQuery<FlowView, IFlowHuaweiRepository, IFlowZteRepository>
    {
        public IEnumerable<FlowView> QueryTopDownSwitchViews(string city, string district, DateTime begin, DateTime end, int topCount)
        {
            var results = HuaweiCellRepository.QueryDistrictFlowViews<FlowView, FlowZte, FlowHuawei>(city, district,
                ZteRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end && x.RedirectA2 + x.RedirectB2 > 2000),
                HuaweiRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end && x.RedirectCdma2000 > 2000),
                TownRepository, ENodebRepository);
            return results.OrderByDescending(x => x.RedirectCdma2000).Take(topCount);
        }

        public IEnumerable<FlowView> QueryTopRank2Views(string city, string district, DateTime begin, DateTime end,
            int topCount)
        {
            var results = HuaweiCellRepository.QueryDistrictFlowViews<FlowView, FlowZte, FlowHuawei>(city, district,
                ZteRepository.GetAllList(x => x.StatTime >= begin && x.StatTime < end && x.SchedulingTm3 > 10000000),
                HuaweiRepository.GetAllList(
                    x => x.StatTime >= begin && x.StatTime < end && x.SchedulingRank1 + x.SchedulingRank2 > 20000000),
                TownRepository, ENodebRepository);
            return results.OrderBy(x => x.Rank2Rate).Take(topCount);
        }
        
        public FlowQueryService(IFlowHuaweiRepository huaweiRepository, IFlowZteRepository zteRepository,
            IENodebRepository eNodebRepository, ICellRepository huaweiCellRepository, ITownRepository townRepository)
            : base(huaweiRepository, zteRepository, eNodebRepository, huaweiCellRepository, townRepository)
        {
        }

        protected override IDateSpanQuery<List<FlowView>> GenerateHuaweiQuery(int eNodebId, byte sectorId)
        {
            return new HuaweiFlowQuery(HuaweiRepository, HuaweiCellRepository, eNodebId, sectorId);
        }

        protected override IDateSpanQuery<List<FlowView>> GenerateZteQuery(int eNodebId, byte sectorId)
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

        protected override IDateSpanQuery<List<RrcView>> GenerateHuaweiQuery(int eNodebId, byte sectorId)
        {
            return new HuaweiRrcQuery(HuaweiRepository, HuaweiCellRepository, eNodebId, sectorId);
        }

        protected override IDateSpanQuery<List<RrcView>> GenerateZteQuery(int eNodebId, byte sectorId)
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

    public class TownFlowService
    {
        private readonly ITownFlowRepository _repository;
        private readonly ITownRepository _townRepository;

        public TownFlowService(ITownFlowRepository repository, ITownRepository townRepository)
        {
            _repository = repository;
            _townRepository = townRepository;
        }

        public IEnumerable<TownFlowView> QueryLastDateStat(DateTime initialDate)
        {
            var stats = _repository.Query(initialDate, (repository, beginDate, endDate) => repository.GetAllList(beginDate, endDate));
            return stats.Select(x => x.ConstructView<TownFlowStat, TownFlowView>(_townRepository));
        }

        public IEnumerable<FlowRegionDateView> QueryDateSpanStats(DateTime begin, DateTime end, string city)
        {
            var query = _repository.GetAllList(begin, end);
            var result = query.QueryTownStat(_townRepository, city);
            var townViews = result.Select(x => x.ConstructView<TownFlowStat, TownFlowView>(_townRepository)).ToList();
            return from view in townViews
                   group view by view.StatTime into g
                   select new FlowRegionDateView
                   {
                       StatDate = g.Key,
                       TownFlowViews = g.Select(x => x),
                       DistrictFlowViews = g.Select(x => x).Merge(v =>v.MapTo<DistrictFlowView>())
                   };
        } 
    }

    public class DownSwitchFlowService
    {
        private readonly IDownSwitchFlowRepository _repository;

        private readonly IAppStreamRepository _streamRepository;
        private readonly IWebBrowsingRepository _browsingRepository;

        public DownSwitchFlowService(IDownSwitchFlowRepository repository,
            IAppStreamRepository streamRepository, IWebBrowsingRepository browsingRepository)
        {
            _repository = repository;
            _streamRepository = streamRepository;
            _browsingRepository = browsingRepository;
        }

        public DownSwitchFlowDateView QueryLastDateStat(DateTime initialDate, string city)
        {
            var stats = _repository.QueryDate(initialDate,
                (repository, beginDate, endDate) => repository.GetAllList(beginDate, endDate)).ToList();
            return new DownSwitchFlowDateView
            {
                StatDate = stats.Any() ? stats.First().StatDate : initialDate,
                City = city,
                DownSwitchFlowViews = stats.MapTo<IEnumerable<DownSwitchFlowView>>()
            };
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
