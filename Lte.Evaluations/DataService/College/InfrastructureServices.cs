using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular;
using Lte.Evaluations.MapperSerive.Infrastructure;
using Lte.Evaluations.ViewModels.Basic;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Basic;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lte.Domain.Common.Wireless;

namespace Lte.Evaluations.DataService.College
{
    public class CollegeENodebService
    {
        private readonly IInfrastructureRepository _repository;
        private readonly IENodebRepository _eNodebRepository;

        public CollegeENodebService(IInfrastructureRepository repository, IENodebRepository eNodebRepository)
        {
            _repository = repository;
            _eNodebRepository = eNodebRepository;
        }

        public IEnumerable<ENodebView> Query(string collegeName)
        {
            var ids = _repository.GetCollegeInfrastructureIds(collegeName, InfrastructureType.ENodeb);
            return (from id in ids
                select _eNodebRepository.Get(id)
                into eNodeb
                where eNodeb != null
                select Mapper.Map<ENodeb, ENodebView>(eNodeb)).ToList();
        }

        public async Task<int> UpdateENodebs(CollegeENodebIdsContainer container)
        {
            foreach (var eNodebId in container.ENodebIds)
            {
                var eNodeb = _eNodebRepository.GetByENodebId(eNodebId);
                if (eNodeb==null) continue;
                await _repository.InsertCollegeENodeb(container.CollegeName, eNodeb.Id);
            }
            return _repository.SaveChanges();
        } 
    }

    public class CollegeBtssService
    {
        private readonly IInfrastructureRepository _repository;
        private readonly IBtsRepository _btsRepository;
        private readonly ITownRepository _townRepository;

        public CollegeBtssService(IInfrastructureRepository repository, IBtsRepository btsRepository, ITownRepository townRepository)
        {
            _repository = repository;
            _btsRepository = btsRepository;
            _townRepository = townRepository;
        }

        public IEnumerable<CdmaBtsView> Query(string collegeName)
        {
            var ids = _repository.GetCollegeInfrastructureIds(collegeName, InfrastructureType.CdmaBts);
            var btss = ids.Select(_btsRepository.Get).Where(bts => bts != null).ToList();
            var views = Mapper.Map<List<CdmaBts>, List<CdmaBtsView>>(btss);
            views.ForEach(x =>
            {
                var town = _townRepository.Get(x.TownId);
                if (town != null)
                {
                    x.DistrictName = town.DistrictName;
                    x.TownName = town.TownName;
                }
            });
            return views;
        }

        public async Task<int> UpdateBtss(CollegeBtsIdsContainer container)
        {
            foreach (var btsId in container.BtsIds)
            {
                var bts = _btsRepository.GetByBtsId(btsId);
                if (bts == null) continue;
                await _repository.InsertCollegeBts(container.CollegeName, bts.Id);
            }
            return _repository.SaveChanges();
        }
    }

    public class CollegeCellsService
    {
        private readonly IInfrastructureRepository _repository;
        private readonly ICellRepository _cellRepository;
        private readonly IENodebRepository _eNodebRepository;

        public CollegeCellsService(IInfrastructureRepository repository, ICellRepository cellRepository,
            IENodebRepository eNodebRepository)
        {
            _repository = repository;
            _cellRepository = cellRepository;
            _eNodebRepository = eNodebRepository;
        }

        public IEnumerable<SectorView> Query(string collegeName)
        {
            var ids = _repository.GetCollegeInfrastructureIds(collegeName, InfrastructureType.Cell);
            var query = ids.Select(_cellRepository.Get).Where(cell => cell != null).ToList();
            return query.Any()
                ? Mapper.Map<IEnumerable<CellView>, IEnumerable<SectorView>>(
                    query.Select(x => CellView.ConstructView(x, _eNodebRepository)))
                : null;
        }

        public async Task<int> UpdateCells(CollegeCellNamesContainer container)
        {
            foreach (var cell in from cellName in container.CellNames
                                 select cellName.GetSplittedFields('-') 
                                 into fields where fields.Length > 1
                                 let eNodeb = _eNodebRepository.GetByName(fields[0]) where eNodeb != null
                                 select _cellRepository.GetBySectorId(eNodeb.ENodebId, fields[1].ConvertToByte(0)) 
                                 into cell where cell != null
                                 select cell)
            {
                await _repository.InsertCollegeCell(container.CollegeName, cell.Id);
            }
            return _repository.SaveChanges();
        }
    }

    public class CollegeCdmaCellsService
    {
        private readonly IInfrastructureRepository _repository;
        private readonly ICdmaCellRepository _cellRepository;
        private readonly IBtsRepository _btsRepository;

        public CollegeCdmaCellsService(IInfrastructureRepository repository, ICdmaCellRepository cellRepository,
            IBtsRepository btsRepository)
        {
            _repository = repository;
            _cellRepository = cellRepository;
            _btsRepository = btsRepository;
        }

        public IEnumerable<SectorView> Query(string collegeName)
        {
            var ids = _repository.GetCollegeInfrastructureIds(collegeName, InfrastructureType.CdmaCell);
            var query = ids.Select(_cellRepository.Get).Where(cell => cell != null).ToList();
            return query.Any()
                ? Mapper.Map<IEnumerable<CdmaCellView>, IEnumerable<SectorView>>(
                    query.Select(x => CdmaCellView.ConstructView(x, _btsRepository)))
                : null;
        }
    }

    public class CollegeLteDistributionService
    {
        private readonly IInfrastructureRepository _repository;
        private readonly IIndoorDistributionRepository _indoorRepository;

        public CollegeLteDistributionService(IInfrastructureRepository repository,
            IIndoorDistributionRepository indoorRepository)
        {
            _repository = repository;
            _indoorRepository = indoorRepository;
        }

        public IEnumerable<IndoorDistribution> Query(string collegeName)
        {
            var ids = _repository.GetCollegeInfrastructureIds(collegeName, InfrastructureType.LteIndoor);
            var distributions = ids.Select(_indoorRepository.Get).Where(distribution => distribution != null).ToList();
            return distributions;
        }
    }

    public class CollegeCdmaDistributionService
    {
        private readonly IInfrastructureRepository _repository;
        private readonly IIndoorDistributionRepository _indoorRepository;

        public CollegeCdmaDistributionService(IInfrastructureRepository repository,
            IIndoorDistributionRepository indoorRepository)
        {
            _repository = repository;
            _indoorRepository = indoorRepository;
        }

        public IEnumerable<IndoorDistribution> Query(string collegeName)
        {
            var ids = _repository.GetCollegeInfrastructureIds(collegeName, InfrastructureType.CdmaIndoor);
            var distributions = ids.Select(_indoorRepository.Get).Where(distribution => distribution != null).ToList();
            return distributions;
        }
    }

    public class HotSpotService
    {
        private readonly IInfrastructureRepository _repository;

        public HotSpotService(IInfrastructureRepository repository)
        {
            _repository = repository;
        }

        public async Task SaveBuildingHotSpot(string name, string typeDescription)
        {
            await _repository.InsertHotSpot(name, typeDescription.GetEnumType<HotspotType>());
        } 
    }
}
