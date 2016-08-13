using System;
using System.Collections.Generic;
using System.Linq;
using Lte.Evaluations.ViewModels.Basic;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities;

namespace Lte.Evaluations.DataService.Basic
{
    public class TownQueryService
    {
        private readonly ITownRepository _repository;
        private readonly IRegionRepository _regionRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly IBtsRepository _btsRepository;
        private readonly ICellRepository _cellRepository;
        private readonly ICdmaCellRepository _cdmaCellRepository;

        public TownQueryService(ITownRepository repository, IRegionRepository regionRepository,
            IENodebRepository eNodebRepositroy, IBtsRepository btsRepository,
            ICellRepository cellRepository, ICdmaCellRepository cdmaCellRepository)
        {
            _repository = repository;
            _regionRepository = regionRepository;
            _eNodebRepository = eNodebRepositroy;
            _btsRepository = btsRepository;
            _cellRepository = cellRepository;
            _cdmaCellRepository = cdmaCellRepository;
        }

        public List<string> GetCities()
        {
            return _repository.GetAll().Select(x => x.CityName).Distinct().ToList();
        }

        public IEnumerable<string> GetRegions(string city)
        {
            return _regionRepository.GetAllList().Where(x => x.City == city)
                .Select(x => x.Region).Distinct().OrderBy(x => x);
        }

        public List<string> GetDistricts(string city)
        {
            return _repository.GetAllList().Where(x => x.CityName == city)
                .Select(x => x.DistrictName).Distinct().ToList();
        }

        public List<DistrictStat> QueryDistrictStats(string city)
        {
            var eNodebTownIds = _eNodebRepository.GetAllInUseList().Select(x => new
            {
                x.TownId, x.ENodebId
            });
            var btsTownIds = _btsRepository.GetAllInUseList().Select(x => new
            {
                x.TownId, x.BtsId
            });
            var cellENodebIds = _cellRepository.GetAllInUseList().Select(x => x.ENodebId);
            var cdmaCellBtsIds = _cdmaCellRepository.GetAllInUseList().Select(x => x.BtsId);
            return (from district in GetDistricts(city)
                let townList = _repository.GetAllList(city, district)
                let eNodebs = (from t in townList join e in eNodebTownIds on t.Id equals e.TownId select e)
                let btss = (from t in townList join b in btsTownIds on t.Id equals b.TownId select b)
                let cells = (from t in townList join e in eNodebTownIds on t.Id equals e.TownId join c in cellENodebIds on e.ENodebId equals c select c)
                let cdmaCells = (from t in townList join b in btsTownIds on t.Id equals b.TownId join c in cdmaCellBtsIds on b.BtsId equals c select c)
                select new DistrictStat
                {
                    District = district,
                    TotalLteENodebs = eNodebs.Count(),
                    TotalLteCells = cells.Count(),
                    TotalCdmaBts = btss.Count(),
                    TotalCdmaCells = cdmaCells.Count()
                }).ToList();
        }

        public List<string> GetTowns(string city, string district)
        {
            return
                _repository.GetAllList()
                    .Where(x => x.CityName == city && x.DistrictName == district)
                    .Select(x => x.TownName)
                    .Distinct()
                    .ToList();
        }

        public List<TownStat> QueryTownStats(string city, string district)
        {
            var eNodebTownIds = _eNodebRepository.GetAllInUseList().Select(x => new
            {
                x.TownId,
                x.ENodebId
            });
            var btsTownIds = _btsRepository.GetAllInUseList().Select(x => new
            {
                x.TownId,
                x.BtsId
            });
            var cellENodebIds = _cellRepository.GetAllInUseList().Select(x => x.ENodebId);
            var cdmaCellBtsIds = _cdmaCellRepository.GetAllInUseList().Select(x => x.BtsId);
            return (from town in _repository.GetAllList(city, district)
                let eNodebs = eNodebTownIds.Where(x => x.TownId == town.Id)
                let btss = btsTownIds.Where(x => x.TownId == town.Id)
                let cells = (from e in eNodebs join c in cellENodebIds on e.ENodebId equals c select c)
                let cdmaCells = (from b in btss join c in cdmaCellBtsIds on b.BtsId equals c select c)
                select new TownStat
                {
                    Town = town.TownName,
                    TotalLteENodebs = eNodebs.Count(),
                    TotalLteCells = cells.Count(),
                    TotalCdmaBts = btss.Count(),
                    TotalCdmaCells = cdmaCells.Count()
                }).ToList();
        }

        public Town GetTown(string city, string district, string town)
        {
            return
                _repository.FirstOrDefault(
                    x => x.CityName == city && x.DistrictName == district && x.TownName == town);
        }

        public Tuple<string, string, string> GetTownNamesByENodebId(int eNodebId)
        {
            var item = _eNodebRepository.GetByENodebId(eNodebId);
            var town = item == null ? null : _repository.Get(item.TownId);
            return town == null
                ? null
                : new Tuple<string, string, string>(town.CityName, town.DistrictName, town.TownName);
        }
    }
}
