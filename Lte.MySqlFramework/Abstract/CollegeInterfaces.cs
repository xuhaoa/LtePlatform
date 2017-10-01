using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;

namespace Lte.MySqlFramework.Abstract
{
    public interface ICollegeRepository : IRepository<CollegeInfo>, ISaveChanges
    {
        CollegeRegion GetRegion(int id);

        CollegeInfo GetByName(string name);

        RectangleRange GetRange(string name);

    }

    public interface ICollegeYearRepository : IRepository<CollegeYearInfo>, ISaveChanges
    {
        CollegeYearInfo GetByCollegeAndYear(int collegeId, int year);

        List<CollegeYearInfo> GetAllList(int year);
    }

    public interface ICollegeKpiRepository : IRepository<CollegeKpi>, ISaveChanges
    {
        List<CollegeKpi> GetAllList(DateTime time);

        CollegeKpi GetByCollegeIdAndTime(int collegeId, DateTime time);

        List<CollegeKpi> GetAllList(DateTime begin, DateTime end);
    }

    public interface ICollege3GTestRepository : IRepository<College3GTestResults>, ISaveChanges
    {
        List<College3GTestResults> GetAllList(DateTime begin, DateTime end);
    }

    public interface ICollege4GTestRepository : IRepository<College4GTestResults>, ISaveChanges
    {
    }

    public interface IHotSpotENodebRepository : IRepository<HotSpotENodebId>, ISaveChanges
    {
        
    }

    public interface IHotSpotCellRepository : IRepository<HotSpotCellId>, ISaveChanges, IMatchRepository<HotSpotCellId, HotSpotCellExcel>
    {
        
    }

    public interface IHotSpotBtsRepository : IRepository<HotSpotBtsId>, ISaveChanges
    {
        
    }

    public interface IHotSpotCdmaCellRepository : IRepository<HotSpotCdmaCellId>, ISaveChanges
    {

    }

    public interface IRasterInfoRepository : IRepository<RasterInfo>, ISaveChanges
    {
    }

    public interface IRasterTestInfoRepository : IRepository<RasterTestInfo>, ISaveChanges
    {
        
    }

    public interface IRasterFileDtRepository : IRepository<RasterFileDtInfo>, ISaveChanges
    {
        
    }

    public interface IDtFileInfoRepository : IRepository<CsvFilesInfo>, ISaveChanges
    {
        
    }

    public interface IAreaTestInfoRepository : IRepository<AreaTestInfo>, ISaveChanges
    {
        
    }

    public interface ICdmaRegionStatRepository : IRepository<CdmaRegionStat>,
        IMatchRepository<CdmaRegionStat, CdmaRegionStatExcel>, ISaveChanges
    {
        List<CdmaRegionStat> GetAllList(DateTime begin, DateTime end);

        Task<List<CdmaRegionStat>> GetAllListAsync(DateTime begin, DateTime end);
    }

    public interface ITopDrop2GCellRepository : IRepository<TopDrop2GCell>,
        IMatchRepository<TopDrop2GCell, TopDrop2GCellExcel>, ISaveChanges
    {
        List<TopDrop2GCell> GetAllList(string city, DateTime begin, DateTime end);
    }

    public interface ITopConnection2GRepository : IRepository<TopConnection2GCell>,
        IMatchRepository<TopConnection2GCell, TopConnection2GExcel>, ISaveChanges
    {
        List<TopConnection2GCell> GetAllList(string city, DateTime begin, DateTime end);
    }

    public interface ITopConnection3GRepository : IRepository<TopConnection3GCell>,
        IMatchRepository<TopConnection3GCell, TopConnection3GCellExcel>, ISaveChanges
    {
        List<TopConnection3GCell> GetAllList(string city, DateTime begin, DateTime end);
    }

    public interface ICdmaRruRepository : IRepository<CdmaRru>,
        IMatchRepository<CdmaRru, CdmaCellExcel>, ISaveChanges
    {
        CdmaRru Get(int btsId, byte sectorId);
    }

    public interface ILteRruRepository : IRepository<LteRru>,
        IMatchRepository<LteRru, CellExcel>, ISaveChanges
    {
        LteRru Get(int eNodebId, byte localSectorId);
    }

    public interface IAreaTestDateRepository : IRepository<AreaTestDate>, ISaveChanges
    {
    }

    public interface IConstructionInformationRepository : IRepository<ConstructionInformation>, ISaveChanges
    {
    }

    public interface IEnodebBaseRepository : IRepository<ENodebBase>, ISaveChanges
    {
    }

    public interface IBluePrintRepository : IRepository<BluePrint>, ISaveChanges
    {

    }

    public interface IOptimzeRegionRepository : IRepository<OptimizeRegion>
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

        public static List<TView> ConstructViews<TStat, TView>(this IEnumerable<TStat> stats, ITownRepository townRepository)
            where TStat : ITownId
            where TView : ICityDistrictTown
        {
            return stats.Select(x => x.ConstructView<TStat, TView>(townRepository)).ToList();
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
    }

}
