using Lte.Evaluations.DataService.Switch;
using Lte.Evaluations.ViewModels.Channel;
using Lte.Parameters.Abstract.Basic;

namespace Lte.Evaluations.DataService.Basic
{
    public interface ICellPowerService
    {
        CellPower Query(int eNodebId, byte sectorId);
    }

    public class CellPowerService : ICellPowerService
    {
        private readonly IEUtranCellFDDZteRepository _ztePbRepository;
        private readonly IPowerControlDLZteRepository _ztePaRepository;
        private readonly IPDSCHCfgRepository _huaweiPbRepository;
        private readonly ICellDlpcPdschPaRepository _huaweiPaRepository;
        private readonly ICellHuaweiMongoRepository _huaweiCellRepository;
        private readonly IENodebRepository _eNodebRepository;

        public CellPowerService(IEUtranCellFDDZteRepository ztePbRepository,
            IPowerControlDLZteRepository ztePaRepository, IPDSCHCfgRepository huaweiPbRepository,
            ICellDlpcPdschPaRepository huaweiPaRepository, ICellHuaweiMongoRepository huaweiCellRepository,
            IENodebRepository eNodebRepository)
        {
            _ztePbRepository = ztePbRepository;
            _ztePaRepository = ztePaRepository;
            _huaweiPbRepository = huaweiPbRepository;
            _huaweiPaRepository = huaweiPaRepository;
            _huaweiCellRepository = huaweiCellRepository;
            _eNodebRepository = eNodebRepository;
        }

        private IMongoQuery<CellPower> ConstructQuery(int eNodebId, byte sectorId)
        {
            var eNodeb = _eNodebRepository.GetByENodebId(eNodebId);
            if (eNodeb == null) return null;
            return eNodeb.Factory == "华为"
                ? (IMongoQuery<CellPower>)
                    new HuaweiCellPowerQuery(_huaweiCellRepository, _huaweiPbRepository, _huaweiPaRepository, eNodebId,
                        sectorId)
                : new ZteCellPowerQuery(_ztePbRepository, _ztePaRepository, eNodebId, sectorId);
        }

        public CellPower Query(int eNodebId, byte sectorId)
        {
            var query = ConstructQuery(eNodebId, sectorId);
            return query?.Query();
        }
    }

    internal class HuaweiCellPowerQuery : HuaweiCellMongoQuery<CellPower>
    {
        private readonly IPDSCHCfgRepository _huaweiPbRepository;
        private readonly ICellDlpcPdschPaRepository _huaweiPaRepository;

        public HuaweiCellPowerQuery(ICellHuaweiMongoRepository huaweiCellRepository,
            IPDSCHCfgRepository huaweiPbRepository, ICellDlpcPdschPaRepository huaweiPaRepository, int eNodebId,
            byte sectorId) : base(huaweiCellRepository, eNodebId, sectorId)
        {
            _huaweiPbRepository = huaweiPbRepository;
            _huaweiPaRepository = huaweiPaRepository;
        }

        protected override CellPower QueryByLocalCellId(int localCellId)
        {
            var pbCfg = _huaweiPbRepository.GetRecent(ENodebId, localCellId);
            var paCfg = _huaweiPaRepository.GetRecent(ENodebId, localCellId);
            return pbCfg == null || paCfg == null ? null : new CellPower(pbCfg, paCfg) { SectorId = SectorId };
        }
    }

    internal class ZteCellPowerQuery : IMongoQuery<CellPower>
    {
        private readonly IEUtranCellFDDZteRepository _ztePbRepository;
        private readonly IPowerControlDLZteRepository _ztePaRepository;
        private readonly int _eNodebId;
        private readonly byte _sectorId;

        public ZteCellPowerQuery(IEUtranCellFDDZteRepository ztePbRepository,
            IPowerControlDLZteRepository ztePaRepository, int eNodebId, byte sectorId)
        {
            _ztePbRepository = ztePbRepository;
            _ztePaRepository = ztePaRepository;
            _eNodebId = eNodebId;
            _sectorId = sectorId;
        }

        public CellPower Query()
        {
            var pbCfg = _ztePbRepository.GetRecent(_eNodebId, _sectorId);
            var paCfg = _ztePaRepository.GetRecent(_eNodebId, _sectorId);
            return pbCfg == null || paCfg == null ? null : new CellPower(pbCfg, paCfg) { SectorId = _sectorId };
        }
    }
}
