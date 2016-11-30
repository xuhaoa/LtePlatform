using Abp.Domain.Repositories;
using AutoMapper;
using Lte.Domain.Common.Geo;
using Lte.Parameters.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Lte.Parameters.Abstract.Infrastructure
{
    public interface IRegionRepository : IRepository<OptimizeRegion>
    {
        List<OptimizeRegion> GetAllList(string city);

        Task<List<OptimizeRegion>> GetAllListAsync(string city);

        int SaveChanges();
    }

    public interface ITownRepository : IRepository<Town>
    {
        IEnumerable<Town> QueryTowns(string city, string district, string town);

        Town QueryTown(string city, string district, string town);

        Town QueryTown(string district, string town);

        List<Town> GetAll(string city);

        List<Town> GetAllList(string city, string district);
    }

    public static class TownQueries
    {
        public static TView ConstructView<TStat, TView>(this TStat stat, ITownRepository repository)
            where TStat : ITownId
            where TView : ICityDistrictTown
        {
            var town = stat.TownId == -1 ? null : repository.Get(stat.TownId);
            var view = Mapper.Map<TStat, TView>(stat);
            view.City = town?.CityName;
            view.District = town?.DistrictName;
            view.Town = town?.TownName;
            return view;
        }
    }
}
