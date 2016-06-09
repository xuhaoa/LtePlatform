using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Lte.Evaluations.DataService.Basic;
using Lte.MySqlFramework.Abstract;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Abstract.Infrastructure;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities;
using Moq;

namespace Lte.Evaluations.MockItems
{
    public static class MockItemsOperations
    {
        public static void MockGetId<TRepository, TEntity>(this Mock<TRepository> repository)
            where TRepository : class, IRepository<TEntity, int>
            where TEntity: class, IEntity<int>
        {
            repository.Setup(x => x.Get(It.IsAny<int>()))
                .Returns<int>(id => repository.Object.GetAll().FirstOrDefault(x => x.Id == id));
        }

        public static void MockOperations(this Mock<IAlarmRepository> repository)
        {
            repository.Setup(x => x.GetAllList(It.IsAny<DateTime>(), It.IsAny<DateTime>()))
                .Returns<DateTime, DateTime>(
                    (begin, end) =>
                        repository.Object.GetAll().Where(x => x.HappenTime >= begin && x.HappenTime < end).ToList());

            repository.Setup(x => x.GetAllList(It.IsAny<DateTime>(), It.IsAny<DateTime>(), It.IsAny<int>()))
                .Returns<DateTime, DateTime, int>(
                    (begin, end, eNodebId) =>
                        repository.Object.GetAll()
                            .Where(x => x.HappenTime >= begin && x.HappenTime < end && x.ENodebId == eNodebId).ToList());

            repository.Setup(x => x.Count(It.IsAny<DateTime>(), It.IsAny<DateTime>(), It.IsAny<int>()))
                .Returns<DateTime, DateTime, int>(
                    (begin, end, eNodebId) => repository.Object.GetAllList(begin, end, eNodebId).Count);
        }

        public static void MockOperations(this Mock<ICdmaCellRepository> repository)
        {
            repository.Setup(x => x.GetBySectorId(It.IsAny<int>(), It.IsAny<byte>()))
                .Returns<int, byte>(
                    (btsId, sectorId) =>
                        repository.Object.GetAll().FirstOrDefault(x => x.BtsId == btsId && x.SectorId == sectorId));
        }

        public static void MockOperation(this Mock<IBtsRepository> repository)
        {
            repository.Setup(x => x.GetByBtsId(It.IsAny<int>()))
                .Returns<int>(btsId => repository.Object.GetAll().FirstOrDefault(x => x.BtsId == btsId));
        }

        public static void MockOperation(this Mock<ICdmaRegionStatRepository> repository)
        {
            repository.Setup(x => x.GetAllList(It.IsAny<DateTime>(), It.IsAny<DateTime>()))
                .Returns<DateTime, DateTime>(
                    (begin, end) =>
                        repository.Object.GetAll().Where(x => x.StatDate >= begin && x.StatDate < end).ToList());

            repository.Setup(x => x.GetAllListAsync(It.IsAny<DateTime>(), It.IsAny<DateTime>()))
                .Returns<DateTime, DateTime>(
                    (begin, end) =>
                        Task.Run(
                            () =>
                                repository.Object.GetAll().Where(x => x.StatDate >= begin && x.StatDate < end).ToList()));

            repository.Setup(x => x.Import(It.IsAny<IEnumerable<CdmaRegionStatExcel>>()))
                .Returns<IEnumerable<CdmaRegionStatExcel>>(stats => stats.Count());
        }

        public static void MockOperations(this Mock<ICellRepository> repository)
        {
            repository.Setup(x => x.GetBySectorId(It.IsAny<int>(), It.IsAny<byte>()))
                .Returns<int, byte>(
                    (eNodebId, sectorId) =>
                        repository.Object.GetAll().FirstOrDefault(x => x.ENodebId == eNodebId && x.SectorId == sectorId));

            repository.Setup(x => x.GetAllInUseList())
                .Returns(repository.Object.GetAll().Where(x => x.IsInUse).ToList());
        }

        public static void MockOpertions(this Mock<ICollegeRepository> repository)
        {
            repository.Setup(x => x.GetByName(It.IsAny<string>())).Returns<string>(
                name => repository.Object.GetAll().FirstOrDefault(
                    x => x.Name == name));
        }

        public static void MockOperations(this Mock<ICollege3GTestRepository> repository)
        {
            repository.Setup(x => x.GetByCollegeIdAndTime(It.IsAny<int>(), It.IsAny<DateTime>())
                ).Returns<int, DateTime>((id, time) => repository.Object.GetAll().FirstOrDefault(
                    x => x.CollegeId == id && x.TestTime == time));

            repository.Setup(x => x.GetAllList(It.IsAny<DateTime>(), It.IsAny<DateTime>()))
                .Returns<DateTime, DateTime>(
                    (begin, end) => repository.Object.GetAll().Where(x => x.TestTime > begin && x.TestTime <= end).ToList());
        }

        public static void MockOperations(this Mock<ICollegeKpiRepository> repository)
        {
            repository.Setup(x => x.GetAllList(It.IsAny<DateTime>()))
                .Returns<DateTime>(time => repository.Object.GetAll().Where(x => x.TestTime == time).ToList());
        }

        public static void MockOperations(this Mock<IENodebRepository> repository)
        {
            repository.Setup(x => x.GetByENodebId(It.IsAny<int>()))
                .Returns<int>(eNodebId => repository.Object.GetAll().FirstOrDefault(x => x.ENodebId == eNodebId));
            
            repository.Setup(x => x.GetByName(It.IsAny<string>()))
                .Returns<string>(name => repository.Object.GetAll().FirstOrDefault(x => x.Name == name));

            repository.Setup(x => x.GetAllInUseList())
                .Returns(repository.Object.GetAll().Where(x => x.IsInUse).ToList());
        }
        
        public static void MockOperations(this Mock<IInfrastructureRepository> repository)
        {
            repository.Setup(x => x.GetENodebIds(It.IsAny<string>()))
                .Returns<string>(collegeName => repository.Object.GetAll().Where(x =>
                    x.HotspotName == collegeName && x.InfrastructureType == InfrastructureType.ENodeb)
                    .Select(x => x.InfrastructureId).ToList());

            repository.Setup(x => x.GetBtsIds(It.IsAny<string>()))
                .Returns<string>(collegeName => repository.Object.GetAll().Where(x =>
                    x.HotspotName == collegeName && x.InfrastructureType == InfrastructureType.CdmaBts)
                    .Select(x => x.InfrastructureId).ToList());

            repository.Setup(x => x.GetCellIds(It.IsAny<string>()))
                .Returns<string>(collegeName => repository.Object.GetAll().Where(x =>
                    x.HotspotName == collegeName && x.InfrastructureType == InfrastructureType.Cell
                    ).Select(x => x.InfrastructureId).ToList());

            repository.Setup(x => x.GetCdmaCellIds(It.IsAny<string>()))
                .Returns<string>(collegeName => repository.Object.GetAll().Where(x =>
                    x.HotspotName == collegeName && x.InfrastructureType == InfrastructureType.CdmaCell
                    ).Select(x => x.InfrastructureId).ToList());

            repository.Setup(x => x.GetLteDistributionIds(It.IsAny<string>()))
                .Returns<string>(collegeName => repository.Object.GetAll().Where(x =>
                    x.HotspotName == collegeName && x.InfrastructureType == InfrastructureType.LteIndoor
                    ).Select(x => x.InfrastructureId).ToList());

            repository.Setup(x => x.GetCdmaDistributionIds(It.IsAny<string>()))
                .Returns<string>(collegeName => repository.Object.GetAll().Where(x =>
                    x.HotspotName == collegeName && x.InfrastructureType == InfrastructureType.CdmaIndoor
                    ).Select(x => x.InfrastructureId).ToList());
        }

        public static void MockOperation(this Mock<ITownPreciseCoverage4GStatRepository> repository)
        {
            repository.Setup(x => x.GetAllList(It.IsAny<DateTime>(), It.IsAny<DateTime>()))
                .Returns<DateTime, DateTime>(
                    (begin, end) =>
                        repository.Object.GetAll().Where(x => x.StatTime >= begin && x.StatTime < end).ToList());
        }

        public static void MockOperations(this Mock<IPreciseCoverage4GRepository> repository)
        {
            repository.Setup(
                x => x.GetAllList(It.IsAny<int>(), It.IsAny<byte>(), It.IsAny<DateTime>(), It.IsAny<DateTime>()))
                .Returns<int, int, DateTime, DateTime>(
                    (cellId, sectorId, begin, end) =>
                        repository.Object.GetAll()
                            .Where(
                                x =>
                                    x.CellId == cellId && x.SectorId == sectorId && x.StatTime >= begin &&
                                    x.StatTime < end)
                            .ToList());
        }

        public static void MockOperation(this Mock<IRegionRepository> repository)
        {
            repository.Setup(x => x.GetAllList(It.IsAny<string>()))
                .Returns<string>(city => repository.Object.GetAll().Where(x => x.City == city).ToList());

            repository.Setup(x => x.GetAllListAsync(It.IsAny<string>()))
                .Returns<string>(city => Task.Run(() =>
                    repository.Object.GetAll().Where(x => x.City == city).ToList()));
        }

        public static void MockOperation(this Mock<ITopDrop2GCellRepository> repository)
        {
            repository.Setup(x => x.Import(It.IsAny<IEnumerable<TopDrop2GCellExcel>>()))
                .Returns<IEnumerable<TopDrop2GCellExcel>>(stats => stats.Count());

            repository.Setup(x => x.GetAllList(It.IsAny<string>(), It.IsAny<DateTime>(), It.IsAny<DateTime>()))
                .Returns<string, DateTime, DateTime>((city, begin, end) =>
                    repository.Object.GetAll().Where(x => x.City == city && x.StatTime >= begin && x.StatTime < end).ToList());
        }

        public static void MockOperation(this Mock<ITopConnection3GRepository> repository)
        {
            repository.Setup(x => x.Import(It.IsAny<IEnumerable<TopConnection3GCellExcel>>()))
                .Returns<IEnumerable<TopConnection3GCellExcel>>(stats => stats.Count());
        }

        public static void MockOpertion(this Mock<ITownRepository> repository)
        {
            repository.Setup(x => x.GetAll(It.IsAny<string>()))
                .Returns<string>(city => repository.Object.GetAll().Where(x => x.CityName == city).ToList());
            repository.Setup(x => x.QueryTown(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .Returns<string, string, string>(
                    (city, district, town) =>
                        repository.Object.GetAll()
                            .FirstOrDefault(x => x.CityName == city && x.DistrictName == district && x.TownName == town));
        }

        public static void MockOperation(this Mock<IPreciseWorkItemCellRepository> repository)
        {
            repository.Setup(x => x.Get(It.IsAny<string>(), It.IsAny<int>(), It.IsAny<byte>()))
                .Returns<string, int, byte>(
                    (number, eNodebId, sectorId) =>
                        repository.Object.GetAll()
                            .FirstOrDefault(
                                x => x.WorkItemNumber == number && x.ENodebId == eNodebId && x.SectorId == sectorId));
        }
        
    }
}
