using AutoMapper;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Switch;
using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities.Basic;

namespace Lte.Evaluations.DataService.Switch
{
    public interface IMongoQuery<out T>
    {
        T Query();
    }

    public interface IDateSpanQuery<out T>
    {
        T Query(DateTime begin, DateTime end);
    }

    public abstract class HuaweiDateSpanQuery<T, TView, THuaweiRepository> : IDateSpanQuery<List<TView>>
        where TView : class, ILteCellQuery
    {
        protected readonly THuaweiRepository HuaweiRepository;
        private readonly ICellRepository _huaweiCellRepository;
        protected readonly int ENodebId;
        private readonly byte _sectorId;

        protected HuaweiDateSpanQuery(THuaweiRepository huaweiRepository, ICellRepository huaweiCellRepository,
            int eNodebId, byte sectorId)
        {
            HuaweiRepository = huaweiRepository;
            _huaweiCellRepository = huaweiCellRepository;
            ENodebId = eNodebId;
            _sectorId = sectorId;
        }

        public List<TView> Query(DateTime begin, DateTime end)
        {
            var huaweiCell =
                _huaweiCellRepository.FirstOrDefault(x => x.ENodebId == ENodebId && x.SectorId == _sectorId);
            var localCellId = huaweiCell?.LocalSectorId ?? _sectorId;
            var views =
                Mapper.Map<List<T>, List<TView>>(QueryList(begin, end, localCellId));
            foreach (var view in views)
            {
                view.SectorId = _sectorId;
            }
            return views;
        }

        protected abstract List<T> QueryList(DateTime begin, DateTime end, byte localCellId);
    }

    public abstract class ZteDateSpanQuery<T, TView, TZteRepository> : IDateSpanQuery<List<TView>>
        where TView : class, ILteCellQuery
    {
        protected readonly TZteRepository ZteRepository;
        protected readonly int ENodebId;
        protected readonly byte SectorId;

        protected ZteDateSpanQuery(TZteRepository zteRepository, int eNodebId, byte sectorId)
        {
            ZteRepository = zteRepository;
            ENodebId = eNodebId;
            SectorId = sectorId;
        }

        public List<TView> Query(DateTime begin, DateTime end)
        {
            return Mapper.Map<List<T>, List<TView>>(QueryList(begin, end));
        }

        protected abstract List<T> QueryList(DateTime begin, DateTime end);
    }

    public abstract class DateSpanQuery<T, THuaweiRepository, TZteRepository> 
        where T : class, new()
    {
        protected readonly THuaweiRepository HuaweiRepository;
        protected readonly TZteRepository ZteRepository;
        protected readonly IENodebRepository ENodebRepository;
        protected readonly ICellRepository HuaweiCellRepository;
        protected readonly ITownRepository TownRepository;

        protected DateSpanQuery(THuaweiRepository huaweiRepository, TZteRepository zteRepository,
            IENodebRepository eNodebRepository, ICellRepository huaweiCellRepository,
            ITownRepository townRepository)
        {
            HuaweiRepository = huaweiRepository;
            ZteRepository = zteRepository;
            ENodebRepository = eNodebRepository;
            HuaweiCellRepository = huaweiCellRepository;
            TownRepository = townRepository;
        }

        protected IDateSpanQuery<List<T>> ConstructQuery(int eNodebId, byte sectorId)
        {
            var eNodeb = ENodebRepository.GetByENodebId(eNodebId);
            if (eNodeb == null) return null;
            return eNodeb.Factory == "华为"
                ? GenerateHuaweiQuery(eNodebId, sectorId)
                : GenerateZteQuery(eNodebId, sectorId);
        }

        protected abstract IDateSpanQuery<List<T>> GenerateHuaweiQuery(int eNodebId, byte sectorId);

        protected abstract IDateSpanQuery<List<T>> GenerateZteQuery(int eNodebId, byte sectorId);

        public List<T> Query(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            var query = ConstructQuery(eNodebId, sectorId);
            return query?.Query(begin, end);
        }

        public T QueryAverageView(int eNodebId, byte sectorId, DateTime begin, DateTime end)
        {
            var query = ConstructQuery(eNodebId, sectorId);
            return query?.Query(begin, end).Average();
        }

    }

    public abstract class HuaweiENodebMongoQuery<TStat, TView, TRepository> : IMongoQuery<TView>
        where TRepository: IRecent<TStat>
        where TView: class 
    {
        private readonly TRepository _repository;
        private readonly int _eNodebId;

        protected HuaweiENodebMongoQuery(TRepository repository, int eNodebId)
        {
            _repository = repository;
            _eNodebId = eNodebId;
        }

        public TView Query()
        {
            var huaweiPara = _repository.GetRecent(_eNodebId);
            return huaweiPara == null ? null : Mapper.Map<TStat, TView>(huaweiPara);
        }
    }

    public abstract class HuaweiCellMongoQuery<TView> : IMongoQuery<TView>
    {
        private readonly ICellHuaweiMongoRepository _huaweiCellRepository;
        protected readonly int ENodebId;
        protected readonly byte SectorId;

        protected HuaweiCellMongoQuery(ICellHuaweiMongoRepository huaweiCellRepository, int eNodebId, byte sectorId)
        {
            _huaweiCellRepository = huaweiCellRepository;
            ENodebId = eNodebId;
            SectorId = sectorId;
        }

        protected abstract TView QueryByLocalCellId(int localCellId);

        public TView Query()
        {
            var huaweiCell = _huaweiCellRepository.GetRecent(ENodebId, SectorId);
            var localCellId = huaweiCell?.LocalCellId ?? SectorId;
            return QueryByLocalCellId(localCellId);
        }
    }

    public abstract class ZteGeneralENodebQuery<TStat, TView> : IMongoQuery<TView>
        where TView : class
    {
        protected readonly int ENodebId;

        protected ZteGeneralENodebQuery(int eNodebId)
        {
            ENodebId = eNodebId;
        }

        protected abstract TStat QueryStat();

        public TView Query()
        {
            var ztePara = QueryStat();
            return ztePara == null ? null : Mapper.Map<TStat, TView>(ztePara);
        }
    }

    public static class GeneralFlowQuery
    {
        public static List<TView> QueryZteViews<TView, T>(this List<ENodeb> eNodebs, List<T> zteStats)
            where T : ILteCellQuery
            where TView : class, IENodebName, new()
        {
            var zteViews = new List<TView>();
            var zteGroups = zteStats.GroupBy(x => new
            {
                x.ENodebId,
                x.SectorId
            });
            foreach (var group in zteGroups)
            {
                var eNodeb = eNodebs.FirstOrDefault(x => x.ENodebId == group.Key.ENodebId);

                if (eNodeb == null) continue;
                var views = group.Select(g => g.MapTo<TView>());
                var view = views.Average();
                view.ENodebName = eNodeb.Name;
                zteViews.Add(view);
            }
            return zteViews;
        }

        public static List<TView> QueryHuaweiViews<TView, T>(this List<ENodeb> eNodebs, List<T> huaweiStats,
            ICellRepository huaweiCellRepository)
            where T : ILocalCellQuery
            where TView : class, IENodebName, ILteCellQuery, new()
        {
            var huaweiViews = new List<TView>();
            if (eNodebs.FirstOrDefault(x => x.Factory == "华为") == null) return new List<TView>();
            var huaweiGroups = huaweiStats.GroupBy(x => new
            {
                x.ENodebId,
                x.LocalCellId
            });
            foreach (var group in huaweiGroups)
            {
                var eNodeb = eNodebs.FirstOrDefault(x => x.ENodebId == group.Key.ENodebId);

                if (eNodeb == null) continue;
                var views = group.Select(g => g.MapTo<TView>());
                var view = views.Average();
                view.ENodebName = eNodeb.Name;
                var cell =
                    huaweiCellRepository.FirstOrDefault(
                        x => x.ENodebId == group.Key.ENodebId && x.LocalSectorId == group.Key.LocalCellId);
                view.SectorId = cell?.SectorId ?? @group.Key.LocalCellId;
                huaweiViews.Add(view);
            }
            return huaweiViews;
        }

        public static IEnumerable<TView> QueryDistrictFlowViews<TView, TZte, THuawei>(this ICellRepository huaweiCellRepository,
            string city, string district, List<TZte> zteStats, List<THuawei> huaweiStats,
            ITownRepository townRepository, IENodebRepository eNodebRepository)
            where TZte : ILteCellQuery
            where THuawei : ILocalCellQuery
            where TView : class, IENodebName, ILteCellQuery, new()
        {
            var eNodebs = townRepository.QueryENodebs(eNodebRepository, city, district);
            if (!eNodebs.Any())
            {
                return new List<TView>();
            }

            var zteViews = eNodebs.QueryZteViews<TView, TZte>(zteStats);
            var huaweiViews = eNodebs.QueryHuaweiViews<TView, THuawei>(huaweiStats, huaweiCellRepository);

            return zteViews.Concat(huaweiViews).ToList();
        }
    }
}
