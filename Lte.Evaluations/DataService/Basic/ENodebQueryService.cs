using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Regular;
using Lte.Evaluations.MapperSerive.Infrastructure;
using Lte.Evaluations.ViewModels.Basic;
using Lte.MySqlFramework.Abstract;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Entities.Basic;
using System;
using System.Collections.Generic;
using System.Linq;
using Lte.MySqlFramework.Entities;
using Lte.Parameters.Entities;

namespace Lte.Evaluations.DataService.Basic
{
    public class ENodebQueryService
    {
        private readonly ITownRepository _townRepository;
        private readonly IENodebRepository _eNodebRepository;
        private readonly IStationDictionaryRepository _stationDictionaryRepository;

        public ENodebQueryService(ITownRepository townRepository, IENodebRepository eNodebRepository,
            IStationDictionaryRepository stationDictionaryRepository)
        {
            _townRepository = townRepository;
            _eNodebRepository = eNodebRepository;
            _stationDictionaryRepository = stationDictionaryRepository;
        }

        public IEnumerable<ENodebView> GetByTownNames(string city, string district, string town)
        {
            var townItem = _townRepository.QueryTown(city, district, town);
            var list = _eNodebRepository.GetAll().Where(x => x.TownId == townItem.Id).ToList().MapTo<List<ENodebView>>();

            list.ForEach(x=>
            {
                x.CityName = city;
                x.DistrictName = district;
                x.TownName = town;
            });
            return list;
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

        public ENodebView GetByENodebId(int eNodebId)
        {
            var item = _eNodebRepository.GetByENodebId(eNodebId);
            if (item == null) return null;
            var town = _townRepository.Get(item.TownId);
            var result = item.MapTo<ENodebView>();
            town.MapTo(result);
            return result;
        }

        public ENodebView GetByStationNum(string stationNum)
        {
            var station =
                _stationDictionaryRepository.FirstOrDefault(x => x.StationNum == stationNum && x.IsRru == false);
            if (station == null) return null;
            var item = _eNodebRepository.GetByENodebId(station.ENodebId) ??
                       _eNodebRepository.FirstOrDefault(x => x.PlanNum == station.PlanNum);
            var result = item?.MapTo<ENodebView>();
            if (result == null) return null;
            var town = _townRepository.Get(item.TownId);
            town.MapTo(result);
            return result;
        }

        public IEnumerable<ENodebView> QueryENodebViews(double west, double east, double south, double north)
        {
            var eNodebs = _eNodebRepository.GetAllList(west, east, south, north);
            return eNodebs.Any() ? eNodebs.MapTo<IEnumerable<ENodebView>>() : new List<ENodebView>();
        }

        public IEnumerable<ENodebView> QueryENodebViews(ENodebRangeContainer container)
        {
            var eNodebs =
                _eNodebRepository.GetAllList(container.West, container.East, container.South, container.North)
                    .Where(x => x.IsInUse)
                    .ToList();
            var excludedENodebs = from eNodeb in eNodebs
                join id in container.ExcludedIds on eNodeb.ENodebId equals id
                select eNodeb;
            eNodebs = eNodebs.Except(excludedENodebs).ToList();
            return eNodebs.Any() ? eNodebs.MapTo<IEnumerable<ENodebView>>() : new List<ENodebView>();
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
}
