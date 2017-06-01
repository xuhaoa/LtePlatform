using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular;
using Lte.Evaluations.MapperSerive.Infrastructure;
using Lte.Evaluations.MapperSerive.Kpi;
using Lte.Evaluations.ViewModels.Basic;
using Lte.Evaluations.ViewModels.Precise;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Basic;
using System.Collections.Generic;
using System.Linq;
using Lte.Domain.Common.Geo;
using Lte.Evaluations.DataService.Switch;
using Lte.Parameters.Abstract.Switch;

namespace Lte.Evaluations.DataService.Basic
{
    public class CellService
    {
        private readonly ICellRepository _repository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly ILteRruRepository _rruRepository;
        private readonly IStationDictionaryRepository _stationDictionaryRepository;

        public CellService(ICellRepository repository, IENodebRepository eNodebRepository, ILteRruRepository rruRepository,
            IStationDictionaryRepository stationDictionaryRepository)
        {
            _repository = repository;
            _eNodebRepository = eNodebRepository;
            _rruRepository = rruRepository;
            _stationDictionaryRepository = stationDictionaryRepository;
        }

        public CellView GetCell(int eNodebId, byte sectorId)
        {
            var cell = _repository.GetBySectorId(eNodebId, sectorId);
            return cell == null ? null : CellView.ConstructView(cell, _eNodebRepository);
        }

        public IEnumerable<Cell> GetCells(double west, double east, double south, double north)
        {
            return _repository.GetAllList(west, east, south, north);
        }

        public IEnumerable<CellRruView> GetCellViews(int eNodebId)
        {
            var cells = _repository.GetAllList(eNodebId);
            return cells.Any()
                ? cells.Select(x => CellRruView.ConstructView(x, _eNodebRepository, _rruRepository))
                : new List<CellRruView>();
        }

        public IEnumerable<CellRruView> GetByStationNum(string stationNum)
        {
            var station =
                _stationDictionaryRepository.FirstOrDefault(x => x.StationNum == stationNum);
            if (station == null) return null;
            var item = _eNodebRepository.GetByENodebId(station.ENodebId) ??
                       _eNodebRepository.FirstOrDefault(x => x.PlanNum == station.PlanNum);
            if (item == null) return new List<CellRruView>();
            return GetCellViews(item.ENodebId);
        }

        public IEnumerable<CellRruView> GetByPlanNum(string planNum)
        {
            var rrus = _rruRepository.GetAllList(x => x.PlanNum == planNum);
            if (!rrus.Any()) return new List<CellRruView>();
            return rrus.Select(rru =>
            {
                var cell =
                    _repository.FirstOrDefault(x => x.ENodebId == rru.ENodebId && x.LocalSectorId == rru.LocalSectorId);
                return cell == null ? null : CellRruView.ConstructView(cell, _eNodebRepository, rru);
            }).Where(rru => rru != null);
        } 

        public IEnumerable<CellView> GetNearbyCellsWithPci(int eNodebId, byte sectorId, short pci)
        {
            var cell = _repository.GetBySectorId(eNodebId, sectorId);
            if (cell==null) return new List<CellView>();
            return
                GetCells(cell.Longtitute - 0.2, cell.Longtitute + 0.2, cell.Lattitute - 0.2, cell.Lattitute + 0.2)
                    .Where(x => x.Pci == pci)
                    .Select(x => CellView.ConstructView(x, _eNodebRepository));
        }

        public List<byte> GetSectorIds(string eNodebName)
        {
            var eNodeb = _eNodebRepository.GetByName(eNodebName);
            return eNodeb == null
                ? null
                : _repository.GetAll().Where(x => x.ENodebId == eNodeb.ENodebId).Select(x => x.SectorId).ToList();
        }

        public IEnumerable<SectorView> QuerySectors(int eNodebId)
        {
            var cells = _repository.GetAllList(eNodebId);
            return cells.Any()
                ? Mapper.Map<IEnumerable<CellView>, IEnumerable<SectorView>>(
                    cells.Select(x => CellView.ConstructView(x, _eNodebRepository)))
                : new List<SectorView>();
        }

        public IEnumerable<SectorView> QuerySectorsInUse(int eNodebId)
        {
            var cells = _repository.GetAllInUseList().Where(x => x.ENodebId == eNodebId).ToList();
            return cells.Any()
                ? Mapper.Map<IEnumerable<CellView>, IEnumerable<SectorView>>(
                    cells.Select(x => CellView.ConstructView(x, _eNodebRepository)))
                : new List<SectorView>();
        }

        public IEnumerable<SectorView> QuerySectors(double west, double east, double south, double north)
        {
            var cells = _repository.GetAllList(west, east, south, north);
            return cells.Any()
                ? Mapper.Map<IEnumerable<CellView>, IEnumerable<SectorView>>(
                    cells.Select(x => CellView.ConstructView(x, _eNodebRepository)))
                : new List<SectorView>();
        }

        public IEnumerable<SectorView> QuerySectors(SectorRangeContainer container)
        {
            var cells =
                _repository.GetAllList(container.West, container.East, container.South, container.North)
                    .Where(x => x.IsInUse).ToList();
            if (container.ExcludedCells.Any())
            {
                var excludeCells = from cell in cells
                    join sector in container.ExcludedCells on new
                    {
                        CellId = cell.ENodebId,
                        cell.SectorId
                    } equals new
                    {
                        sector.CellId,
                        sector.SectorId
                    }
                    select cell;
                cells = cells.Except(excludeCells).ToList();
            }

            return cells.Any()
                ? Mapper.Map<IEnumerable<CellView>, IEnumerable<SectorView>>(
                    cells.Select(x => CellView.ConstructView(x, _eNodebRepository)))
                : new List<SectorView>();
        }

        public IEnumerable<Precise4GSector> QuerySectors(TopPreciseViewContainer container)
        {
            return container.Views.Select(x => Precise4GSector.ConstructSector(x, _repository));
        }

        public LteRru QueryRru(string cellName)
        {
            var fields = cellName.GetSplittedFields('-');
            if (fields.Length < 2) return null;
            var eNodebName = fields[0];
            var sectorId = fields[1].ConvertToByte(0);
            var eNodeb = _eNodebRepository.GetByName(eNodebName);
            if (eNodeb == null) return null;
            var cell = _repository.GetBySectorId(eNodeb.ENodebId, sectorId);
            if (cell == null) return null;
            return _rruRepository.Get(eNodeb.ENodebId, cell.LocalSectorId);
        }

        public IEnumerable<CellView> QueryByRruName(string rruName)
        {
            var rrus = _rruRepository.GetAllList(x => x.RruName.Contains(rruName));
            return from rru in rrus
                   select _repository.FirstOrDefault(x => x.ENodebId == rru.ENodebId && x.LocalSectorId == rru.LocalSectorId) 
                   into cell where cell != null
                   select CellView.ConstructView(cell, _eNodebRepository);
        }

        public IEnumerable<GeoPoint> QueryOutdoorCellSites(IEnumerable<ENodeb> eNodebs)
        {
            var cellSites = _repository.GetAllList(x => x.IsOutdoor).Select(x => new
            {
                x.Longtitute,
                x.Lattitute,
                x.ENodebId
            }).Distinct();
            var results = from e in eNodebs
                join c in cellSites on e.ENodebId equals c.ENodebId
                select new GeoPoint(e.Longtitute, e.Lattitute);
            return results;
        }

        public IEnumerable<GeoPoint> QueryIndoorCellSites(IEnumerable<ENodeb> eNodebs)
        {
            var cellSites = _repository.GetAllList(x => !x.IsOutdoor).Select(x => new
            {
                x.Longtitute,
                x.Lattitute,
                x.ENodebId
            }).Distinct();
            var results = from e in eNodebs
                          join c in cellSites on e.ENodebId equals c.ENodebId
                          select new GeoPoint(e.Longtitute, e.Lattitute);
            return results;
        }
    }

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

    public class CellHuaweiMongoService
    {
        private readonly ICellHuaweiMongoRepository _repository;
        private readonly IEUtranCellFDDZteRepository _zteCellRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly IEUtranCellMeasurementZteRepository _zteMeasRepository;
        private readonly IPrachFDDZteRepository _ztePrachRepository;

        public CellHuaweiMongoService(ICellHuaweiMongoRepository repository,
            IEUtranCellFDDZteRepository zteCellRepository, IENodebRepository eNodebRepository,
            IEUtranCellMeasurementZteRepository zteMeasRepository,
            IPrachFDDZteRepository ztePrachRepository)
        {
            _repository = repository;
            _zteCellRepository = zteCellRepository;
            _eNodebRepository = eNodebRepository;
            _zteMeasRepository = zteMeasRepository;
            _ztePrachRepository = ztePrachRepository;
        }

        private IMongoQuery<CellHuaweiMongo> ConstructQuery(int eNodebId, byte sectorId)
        {
            var eNodeb = _eNodebRepository.GetByENodebId(eNodebId);
            if (eNodeb == null) return null;
            return eNodeb.Factory == "华为"
                ? (IMongoQuery<CellHuaweiMongo>)new HuaweiCellQuery(_repository, eNodebId, sectorId)
                : new ZteCellQuery(_zteCellRepository, _zteMeasRepository, _ztePrachRepository, eNodebId, sectorId);
        }

        public CellHuaweiMongo QueryRecentCellInfo(int eNodebId, byte sectorId)
        {
            var query = ConstructQuery(eNodebId, sectorId);
            return query?.Query();
        }

        public HuaweiLocalCellDef QueryLocalCellDef(int eNodebId)
        {
            var eNodeb = _eNodebRepository.GetByENodebId(eNodebId);
            if (eNodeb == null || eNodeb.Factory != "华为") return null;
            var cells = _repository.GetRecentList(eNodebId);
            return new HuaweiLocalCellDef
            {
                ENodebId = eNodebId,
                LocalCellDict = cells.ToDictionary(x => x.LocalCellId, y => y.CellId)
            };
        }
    }

    public class HuaweiLocalCellDef
    {
        public int ENodebId { get; set; }

        public Dictionary<int, int> LocalCellDict { get; set; }
    }

    internal class HuaweiCellQuery : IMongoQuery<CellHuaweiMongo>
    {
        private readonly ICellHuaweiMongoRepository _repository;
        private readonly int _eNodebId;
        private readonly byte _sectorId;

        public HuaweiCellQuery(ICellHuaweiMongoRepository repository, int eNodebId, byte sectorId)
        {
            _repository = repository;
            _eNodebId = eNodebId;
            _sectorId = sectorId;
        }

        public CellHuaweiMongo Query()
        {
            return _repository.GetRecent(_eNodebId, _sectorId);
        }
    }

    internal class ZteCellQuery : IMongoQuery<CellHuaweiMongo>
    {
        private readonly IEUtranCellFDDZteRepository _zteCellRepository;
        private readonly IEUtranCellMeasurementZteRepository _zteMeasRepository;
        private readonly IPrachFDDZteRepository _ztePrachRepository;
        private readonly int _eNodebId;
        private readonly byte _sectorId;

        public ZteCellQuery(IEUtranCellFDDZteRepository zteCellRepository,
            IEUtranCellMeasurementZteRepository zteMeasRepository,
            IPrachFDDZteRepository ztePrachRepository, int eNodebId, byte sectorId)
        {
            _zteCellRepository = zteCellRepository;
            _zteMeasRepository = zteMeasRepository;
            _ztePrachRepository = ztePrachRepository;
            _eNodebId = eNodebId;
            _sectorId = sectorId;
        }

        public CellHuaweiMongo Query()
        {
            var zteCell = _zteCellRepository.GetRecent(_eNodebId, _sectorId);
            var zteMeas = _zteMeasRepository.GetRecent(_eNodebId, _sectorId);
            var ztePrach = _ztePrachRepository.GetRecent(_eNodebId, _sectorId);

            return new CellHuaweiMongo
            {
                PhyCellId = zteCell?.pci ?? 0,
                CellSpecificOffset = zteCell?.ocs ?? 15,
                QoffsetFreq = zteMeas?.eutranMeasParas_offsetFreq ?? 15,
                RootSequenceIdx = ztePrach?.rootSequenceIndex ?? -1
            };
        }
    }
}
