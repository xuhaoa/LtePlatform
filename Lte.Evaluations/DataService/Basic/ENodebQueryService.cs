using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Regular;
using Lte.MySqlFramework.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using Lte.Domain.Common.Geo;
using Lte.Evaluations.ViewModels.RegionKpi;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.Basic
{
    public class ENodebQueryService
    {
        private readonly ITownRepository _townRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly IStationDictionaryRepository _stationDictionaryRepository;
        private readonly IDistributionRepository _distributionRepository;
        private readonly ITownBoundaryRepository _boundaryRepository;

        public ENodebQueryService(ITownRepository townRepository, IENodebRepository eNodebRepository,
            IStationDictionaryRepository stationDictionaryRepository,
            IDistributionRepository distributionRepository, ITownBoundaryRepository boundaryRepository)
        {
            _townRepository = townRepository;
            _eNodebRepository = eNodebRepository;
            _stationDictionaryRepository = stationDictionaryRepository;
            _distributionRepository = distributionRepository;
            _boundaryRepository = boundaryRepository;
        }

        public IEnumerable<ENodebView> GetByTownNames(string city, string district, string town)
        {
            var townItem = _townRepository.QueryTown(city, district, town);
            if (townItem == null) return new List<ENodebView>();
            var list = _eNodebRepository.GetAllList(x => x.TownId == townItem.Id).MapTo<List<ENodebView>>();

            list.ForEach(x=>
            {
                x.CityName = city;
                x.DistrictName = district;
                x.TownName = town;
            });
            return list;
        }

        public IEnumerable<ENodebView> GetByTownArea(string city, string district, string town)
        {
            var list = new List<ENodebView>();
            var townItem = _townRepository.QueryTown(city, district, town);
            if (townItem == null) return list;
            var boudary = _boundaryRepository.FirstOrDefault(x => x.TownId == townItem.Id);
            if (boudary == null) return list;
            foreach (var townEntity in _townRepository.GetAllList(x=>x.CityName==city&&x.DistrictName==district&&x.TownName!=town))
            {
                var views =
                    _eNodebRepository.GetAllList(x => x.TownId == townEntity.Id)
                        .Where(x => boudary.IsInTownRange(x))
                        .MapTo<List<ENodebView>>();
                views.ForEach(x =>
                {
                    x.CityName = city;
                    x.DistrictName = district;
                    x.TownName = townEntity.TownName;
                    x.TownId = townItem.Id;
                });
                list.AddRange(views);
            }
            return list;
        }

        public IEnumerable<ENodebView> GetByTownNamesInUse(string city, string district, string town)
        {
            return GetByTownNames(city, district, town).Where(x => x.IsInUse);
        }

        public IEnumerable<ENodeb> GetENodebsByDistrict(string city, string district)
        {
            var towns = _townRepository.GetAllList(city, district);
            return from town in towns
                join eNodeb in _eNodebRepository.GetAllList() on town.Id equals eNodeb.TownId
                select eNodeb;
        }

        public IEnumerable<ENodebView> GetByDistrictNames(string city, string district)
        {
            var list = GetENodebsByDistrict(city, district).ToList().MapTo<List<ENodebView>>();
            list.ForEach(x =>
            {
                x.CityName = city;
                x.DistrictName = district;
            });
            return list;
        } 

        public IEnumerable<ENodebView> GetByGeneralName(string name)
        {
            var items =
                _eNodebRepository.GetAllList().Where(x => x.Name.IndexOf(name.Trim(), StringComparison.Ordinal) >= 0).ToArray();
            if (items.Any())
                return Mapper.Map<IEnumerable<ENodeb>, IEnumerable<ENodebView>>(items);
            var eNodebId = name.Trim().ConvertToInt(0);
            if (eNodebId > 0)
            {
                items = _eNodebRepository.GetAll().Where(x => x.ENodebId == eNodebId).ToArray();
                if (items.Any()) return items.MapTo<IEnumerable<ENodebView>>();
            }
            items =
                _eNodebRepository.GetAllList()
                    .Where(
                        x =>
                            x.Address.IndexOf(name.Trim(), StringComparison.Ordinal) >= 0 ||
                            x.PlanNum.IndexOf(name.Trim(), StringComparison.Ordinal) >= 0)
                    .ToArray();
            return items.Any() ? items.MapTo<IEnumerable<ENodebView>>() : null;
        }

        public IEnumerable<ENodebView> GetByGeneralNameInUse(string name)
        {
            return GetByGeneralName(name).Where(x => x.IsInUse);
        } 

        public ENodebView GetByENodebId(int eNodebId)
        {
            var item = _eNodebRepository.GetByENodebId(eNodebId);
            return GenerateENodebView(item);
        }

        private ENodebView GenerateENodebView(ENodeb item)
        {
            if (item == null) return null;
            var town = _townRepository.Get(item.TownId);
            var result = item.MapTo<ENodebView>();
            town.MapTo(result);
            return result;
        }

        public ENodebView GetByPlanNum(string planNum)
        {
            var item = _eNodebRepository.FirstOrDefault(x => x.PlanNum == planNum);
            return GenerateENodebView(item);
        }

        public ENodebView GetByStationNum(string stationNum)
        {
            var station =
                _stationDictionaryRepository.FirstOrDefault(x => x.StationNum == stationNum && x.IsRru == false);
            if (station == null) return null;
            var item = _eNodebRepository.GetByENodebId(station.ENodebId) ??
                       _eNodebRepository.FirstOrDefault(x => x.PlanNum == station.PlanNum);
            return GenerateENodebView(item);
        }

        public StationDictionary GetStationDictionary(int eNodebId, string planNum)
        {
            return _stationDictionaryRepository.FirstOrDefault(x => x.ENodebId == eNodebId && x.IsRru == false) ??
                   _stationDictionaryRepository.FirstOrDefault(x => x.PlanNum == planNum);
        }

        public IEnumerable<ENodebView> QueryENodebViews(double west, double east, double south, double north)
        {
            var eNodebs = _eNodebRepository.GetAllList(x => x.Longtitute >= west && x.Longtitute <= east
                && x.Lattitute >= south && x.Lattitute <= north);
            return eNodebs.Any() ? eNodebs.MapTo<IEnumerable<ENodebView>>() : new List<ENodebView>();
        }

        public IEnumerable<DistributionSystem> QueryDistributionSystems(double west, double east, double south,
            double north)
        {
            return
                _distributionRepository.GetAllList(
                    x => x.Longtitute >= west && x.Longtitute <= east && x.Lattitute >= south && x.Lattitute <= north);
        }

        public IEnumerable<ENodebView> QueryENodebViews(ENodebRangeContainer container)
        {
            var eNodebs =
                _eNodebRepository.GetAllList(x => x.Longtitute >= container.West && x.Longtitute <= container.East
                                                  && x.Lattitute >= container.South && x.Lattitute <= container.North)
                    .Where(x => x.IsInUse)
                    .ToList();
            var excludedENodebs = from eNodeb in eNodebs
                join id in container.ExcludedIds on eNodeb.ENodebId equals id
                select eNodeb;
            eNodebs = eNodebs.Except(excludedENodebs).ToList();
            return eNodebs.Any() ? eNodebs.MapTo<IEnumerable<ENodebView>>() : new List<ENodebView>();
        }

        public IEnumerable<DistributionSystem> QueryDistributionSystems(string district)
        {
            return _distributionRepository.GetAllList(x => x.District == district);
        }

    }

    public class BtsConstructionService
    {
        private readonly IConstructionInformationRepository _constructionRepository;
        private readonly IEnodebBaseRepository _enodebBaseRepository;

        public BtsConstructionService(IConstructionInformationRepository constructionRepository, 
            IEnodebBaseRepository enodebBaseRepository)
        {
            _constructionRepository = constructionRepository;
            _enodebBaseRepository = enodebBaseRepository;
        }

        public IEnumerable<ENodebBase> QueryEnodebBases()
        {
            return _enodebBaseRepository.GetAllList();
        }

        public IEnumerable<ENodebBase> QueryEnodebBases(string searchText)
        {
            return string.IsNullOrEmpty(searchText)
                ? QueryEnodebBases()
                : _enodebBaseRepository.GetAllList(x => x.ENODEBNAME.Contains(searchText));
        }

        public IEnumerable<ConstructionView> QueryConstructionInformations(string searchTxt, double west,
            double east, double south, double north, string district, string town)
        {
            var btsList =
                _enodebBaseRepository.GetAllList(
                    x => x.LONGITUDE > west && x.LONGITUDE < east && x.LATITIUDE > south && x.LATITIUDE < north);
            return QueryConstructionViews(searchTxt, district, town, btsList);
        }

        public IEnumerable<ConstructionView> QueryConstructionInformations(string searchTxt, string district,
            string town)
        {
            return QueryConstructionViews(searchTxt, district, town, _enodebBaseRepository.GetAllList());
        }

        private IEnumerable<ConstructionView> QueryConstructionViews(string searchTxt, string district, string town, List<ENodebBase> btsList)
        {
            if (!string.IsNullOrEmpty(searchTxt))
            {
                btsList = btsList.Where(o => o.ENODEBNAME == searchTxt).ToList();
            }
            if (district != "全部")
            {
                btsList = btsList.Where(o => o.AREA == district).ToList();
            }

            if (town != "全部")
            {
                btsList = btsList.Where(o => o.MKTCENTER == town).ToList();
            }
            var conList = _constructionRepository.GetAllList();
            var constructionList = from c in conList
                                   join b in btsList on c.FSLNO equals b.FSLNO
                                   select new
                                   {
                                       Bts = b,
                                       Con = c
                                   };
            return constructionList.Select(x =>
            {
                var view = x.Con.MapTo<ConstructionView>();
                x.Bts.MapTo(view);
                return view;
            });
        }

    }

    public class BluePrintService
    {
        private readonly IBluePrintRepository _bluePrintRepository;

        public BluePrintService(IBluePrintRepository bluePrintRepository)
        {

            _bluePrintRepository = bluePrintRepository;
        }

        public int SaveVisioPath(string fslNumber, string path)
        {
            var item =
                _bluePrintRepository.FirstOrDefault(
                    x => x.FslNumber == fslNumber && x.Folder == fslNumber && x.FileName == path);
            if (item != null) return _bluePrintRepository.SaveChanges();
            {
                var stat =
                    _bluePrintRepository.FirstOrDefault(
                        x => x.FslNumber == fslNumber && x.Folder == fslNumber && string.IsNullOrEmpty(x.FileName));
                if (stat == null)
                {
                    item = new BluePrint
                    {
                        FslNumber = fslNumber,
                        Folder = fslNumber,
                        FileName = path
                    };
                    _bluePrintRepository.Insert(item);
                }
                else
                {
                    stat.FileName = path;
                }
            }
            return _bluePrintRepository.SaveChanges();
        }
    }

    public class PlanningQueryService
    {
        private readonly ITownRepository _townRepository;
        private readonly IPlanningSiteRepository _planningSiteRepository;

        public PlanningQueryService(ITownRepository townRepository, IPlanningSiteRepository planningSiteRepository)
        {
            _townRepository = townRepository;
            _planningSiteRepository = planningSiteRepository;
        }

        public IEnumerable<PlanningSiteView> QueryPlanningSiteViews(double west, double east, double south, double north)
        {
            var sites =
                _planningSiteRepository.GetAllList(
                    x => x.Longtitute >= west && x.Longtitute <= east && x.Lattitute >= south && x.Lattitute <= north);
            var views = sites.MapTo<List<PlanningSiteView>>();
            views.ForEach(view =>
            {
                var town = view.TownId <= 0 ? null : _townRepository.Get(view.TownId);
                if (town != null)
                {
                    view.District = town.DistrictName;
                    view.Town = town.TownName;
                }
            });
            return views;
        }

        public IEnumerable<PlanningSiteView> GetENodebsByDistrict(string city, string district, bool? isOpened = null)
        {
            var towns = _townRepository.GetAllList(city, district);
            var views = new List<PlanningSiteView>();
            foreach (
                var stats in
                    towns.Select(
                        town =>
                            GetPlanningSites(town, isOpened)
                                .MapTo<List<PlanningSiteView>>()
                                .Select(x =>
                                {
                                    x.District = district;
                                    x.Town = town.TownName;
                                    return x;
                                })))
            {
                views.AddRange(stats);
            }
            return views;
        }

        private List<PlanningSite> GetPlanningSites(Town town, bool? isOpened)
        {
            if (isOpened==null) return _planningSiteRepository.GetAllList(x => x.TownId == town.Id);
            if (isOpened == true)
                return _planningSiteRepository.GetAllList(x => x.TownId == town.Id && x.FinishedDate != null);
            return _planningSiteRepository.GetAllList(x => x.TownId == town.Id && x.FinishedDate == null);
        }
    }

    public class BtsQueryService
    {
        private readonly ITownRepository _townRepository;
        private readonly IBtsRepository _btsRepository;
        private readonly ITownBoundaryRepository _boundaryRepository;

        public BtsQueryService(ITownRepository townRepository, IBtsRepository btsRepository,
            ITownBoundaryRepository boundaryRepository)
        {
            _townRepository = townRepository;
            _btsRepository = btsRepository;
            _boundaryRepository = boundaryRepository;
        }

        public IEnumerable<CdmaBtsView> GetByTownNames(string city, string district, string town)
        {
            var townItem = _townRepository.QueryTown(city, district, town);
            return townItem == null
                ? null
                : _btsRepository.GetAll().Where(x => x.TownId == townItem.Id).ToList().MapTo<IEnumerable<CdmaBtsView>>();
        }

        public IEnumerable<CdmaBtsView> GetByTownArea(string city, string district, string town)
        {
            var list = new List<CdmaBtsView>();
            var townItem = _townRepository.QueryTown(city, district, town);
            if (townItem == null) return list;
            var boudary = _boundaryRepository.FirstOrDefault(x => x.TownId == townItem.Id);
            if (boudary == null) return list;
            foreach (var townEntity in _townRepository.GetAllList(x => x.CityName == city && x.DistrictName == district && x.TownName != town))
            {
                var views =
                    _btsRepository.GetAllList(x => x.TownId == townEntity.Id)
                        .Where(x => boudary.IsInTownRange(x))
                        .MapTo<List<CdmaBtsView>>();
                views.ForEach(x =>
                {
                    x.DistrictName = district;
                    x.TownName = townEntity.TownName;
                    x.TownId = townItem.Id;
                });
                list.AddRange(views);
            }
            return list;
        }

        public IEnumerable<CdmaBtsView> GetByGeneralName(string name)
        {
            var items =
                _btsRepository.GetAllList().Where(x => x.Name.IndexOf(name.Trim(), StringComparison.Ordinal) >= 0).ToArray();
            if (items.Any()) return items.MapTo<IEnumerable<CdmaBtsView>>();
            var btsId = name.Trim().ConvertToInt(0);
            if (btsId > 0)
            {
                items = _btsRepository.GetAll().Where(x => x.BtsId == btsId).ToArray();
                if (items.Any()) return items.MapTo<IEnumerable<CdmaBtsView>>();
            }
            items =
                _btsRepository.GetAllList()
                    .Where(
                        x =>
                            x.Address.IndexOf(name.Trim(), StringComparison.Ordinal) >= 0)
                    .ToArray();
            return items.Any() ? items.MapTo<IEnumerable<CdmaBtsView>>() : null;
        }

        public CdmaBtsView GetByBtsId(int btsId)
        {
            var item = _btsRepository.GetByBtsId(btsId);
            if (item == null) return null;
            var view = item.MapTo<CdmaBtsView>();
            var town = _townRepository.Get(item.TownId);
            view.DistrictName = town.DistrictName;
            view.TownName = town.TownName;
            return view;
        }

        public IEnumerable<CdmaBtsView> QueryBtsViews(ENodebRangeContainer container)
        {
            var btss =
                _btsRepository.GetAllList(container.West, container.East, container.South, container.North)
                    .Where(x => x.IsInUse)
                    .ToList();
            var excludedBtss = from bts in btss
                               join id in container.ExcludedIds on bts.BtsId equals id
                               select bts;
            btss = btss.Except(excludedBtss).ToList();
            return btss.Any() ? btss.MapTo<IEnumerable<CdmaBtsView>>() : new List<CdmaBtsView>();
        }
    }
}
