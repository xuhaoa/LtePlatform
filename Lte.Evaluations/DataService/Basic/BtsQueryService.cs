using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Regular;
using Lte.Evaluations.MapperSerive.Infrastructure;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using Lte.Parameters.Entities.Basic;

namespace Lte.Evaluations.DataService.Basic
{
    public class BtsQueryService
    {
        private readonly ITownRepository _townRepository;
        private readonly IBtsRepository _btsRepository;

        public BtsQueryService(ITownRepository townRepository, IBtsRepository btsRepository)
        {
            _townRepository = townRepository;
            _btsRepository = btsRepository;
        }

        public IEnumerable<CdmaBtsView> GetByTownNames(string city, string district, string town)
        {
            var townItem = _townRepository.QueryTown(city, district, town);
            return townItem == null
                ? null
                : _btsRepository.GetAll().Where(x => x.TownId == townItem.Id).ToList().MapTo<IEnumerable<CdmaBtsView>>();
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
