using AutoMapper;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Switch;
using System;

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
}
