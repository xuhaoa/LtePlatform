using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Regular;
using Lte.Evaluations.MapperSerive.Infrastructure;
using Lte.Evaluations.ViewModels;
using Lte.Evaluations.ViewModels.Basic;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities;
using Lte.Parameters.Entities.Basic;

namespace Lte.Evaluations.DataService.College
{
    public interface ICollegeInfrastructure<out TView>
    {
        IEnumerable<TView> Query(string collegeName);

        IEnumerable<TView> Query(IEnumerable<string> collegeNames);
    }

    public class CollegeENodebService : ICollegeInfrastructure<ENodebView>
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
        
        public IEnumerable<ENodebView> Query(IEnumerable<string> collegeNames)
        {
            var concateIds = collegeNames.Select(x => _repository.GetCollegeInfrastructureIds(x, InfrastructureType.ENodeb));
            var distictIds = concateIds.Aggregate((x, y) => x.Concat(y)).Distinct();
            var items = distictIds.Select(_eNodebRepository.Get).Where(eNodeb => eNodeb != null).ToList();
            return Mapper.Map<List<ENodeb>, IEnumerable<ENodebView>>(items);
        }
    }

    public class CollegeBtssService : ICollegeInfrastructure<CdmaBtsView>
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

        public IEnumerable<CdmaBtsView> Query(IEnumerable<string> collegeNames)
        {
            var ids =
                collegeNames.Select(x => _repository.GetCollegeInfrastructureIds(x, InfrastructureType.CdmaBts))
                    .Aggregate((x, y) => x.Concat(y))
                    .Distinct();
            var btss = ids.Select(_btsRepository.Get).Where(bts => bts != null).ToList();
            return Mapper.Map<List<CdmaBts>, IEnumerable<CdmaBtsView>>(btss);
        }
    }

    public class CollegeCellsService : ICollegeInfrastructure<SectorView>
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

        public IEnumerable<SectorView> Query(IEnumerable<string> collegeNames)
        {
            var ids =
                collegeNames.Select(x => _repository.GetCollegeInfrastructureIds(x, InfrastructureType.Cell))
                    .Aggregate((x, y) => x.Concat(y))
                    .Distinct();
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

    public class CollegeCdmaCellsService : ICollegeInfrastructure<SectorView>
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

        public IEnumerable<SectorView> Query(IEnumerable<string> collegeNames)
        {
            var ids =
                collegeNames.Select(x => _repository.GetCollegeInfrastructureIds(x, InfrastructureType.CdmaCell))
                    .Aggregate((x, y) => x.Concat(y))
                    .Distinct();
            var query = ids.Select(_cellRepository.Get).Where(cell => cell != null).ToList();
            return query.Any()
                ? Mapper.Map<IEnumerable<CdmaCellView>, IEnumerable<SectorView>>(
                    query.Select(x => CdmaCellView.ConstructView(x, _btsRepository)))
                : null;
        }
    }

    public class CollegeLteDistributionService : ICollegeInfrastructure<IndoorDistribution>
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

        public IEnumerable<IndoorDistribution> Query(IEnumerable<string> collegeNames)
        {
            var ids =
                collegeNames.Select(x => _repository.GetCollegeInfrastructureIds(x, InfrastructureType.LteIndoor))
                    .Aggregate((x, y) => x.Concat(y))
                    .Distinct();
            var distributions = ids.Select(_indoorRepository.Get).Where(distribution => distribution != null).ToList();
            return distributions;
        }

    }

    public class CollegeCdmaDistributionService : ICollegeInfrastructure<IndoorDistribution>
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

        public IEnumerable<IndoorDistribution> Query(IEnumerable<string> collegeNames)
        {
            var ids =
                collegeNames.Select(x => _repository.GetCollegeInfrastructureIds(x, InfrastructureType.CdmaIndoor))
                    .Aggregate((x, y) => x.Concat(y))
                    .Distinct();
            var distributions = ids.Select(_indoorRepository.Get).Where(distribution => distribution != null).ToList();
            return distributions;
        }
    }
}
