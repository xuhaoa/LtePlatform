using System;
using Abp.Domain.Repositories;
using AutoMapper;
using Lte.Parameters.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common.Wireless;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Basic;
using Lte.Parameters.Entities.College;
using Lte.Parameters.Entities.Dt;

namespace Lte.Parameters.Abstract.Infrastructure
{
    public interface RegionRepositories : IRepository<OptimizeRegion>
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

        IEnumerable<string> GetFoshanDistricts();
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

        public static TView ConstructAreaView<TStat, TView>(this TStat stat, ITownRepository repository)
            where TStat : IArea
        {
            var town =
                repository.FirstOrDefault(
                    x => x.TownName == (stat.Area == "北窖" ? "北滘" : stat.Area) || x.DistrictName == stat.Area);
            var view = Mapper.Map<TStat, TView>(stat);
            if (town != null)
            {
                town.MapTo(view);
            }
            return view;
        }

        public static List<TTownStat> QueryTownStat<TTownStat>(this IEnumerable<TTownStat> query,
            ITownRepository townRepository, string city)
            where TTownStat : ITownId
        {
            return (from q in query
                    join t in townRepository.GetAll(city) on q.TownId equals t.Id
                    select q).ToList();
        }

        public static List<ENodeb> QueryENodebs(this ITownRepository townRepository, IENodebRepository eNodebRepository,
            string city, string district)
        {
            var towns = townRepository.GetAllList(city, district);
            if (!towns.Any())
            {
                return new List<ENodeb>();
            }
            return (from eNodeb in eNodebRepository.GetAllList()
                join town in towns on eNodeb.TownId equals town.Id
                select eNodeb).ToList();
        } 
    }

    public interface ICollegeRepository : IRepository<CollegeInfo>, ISaveChanges
    {
        CollegeRegion GetRegion(int id);

        CollegeInfo GetByName(string name);

        RectangleRange GetRange(string name);

    }

    public interface IAreaTestDateRepository
    {
        IQueryable<AreaTestDate> AreaTestDates { get; }
    }

    public interface IFileRecordRepository
    {
        IEnumerable<FileRecord4G> GetFileRecord4Gs(string fileName);

        IEnumerable<FileRecord4G> GetFileRecord4Gs(string fileName, int rasterNum);

        IEnumerable<FileRecord3G> GetFileRecord3Gs(string fileName);

        IEnumerable<FileRecord3G> GetFileRecord3Gs(string fileName, int rasterNum);

        IEnumerable<FileRecord2G> GetFileRecord2Gs(string fileName);

        IEnumerable<FileRecord2G> GetFileRecord2Gs(string fileName, int rasterNum);
        
    }
}
