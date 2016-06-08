using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lte.Parameters.Abstract;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Abstract.College;
using Lte.Parameters.Abstract.Kpi;
using Lte.Parameters.Entities;
using Moq;

namespace Lte.Evaluations.MockItems
{
    public static class MockItemsOperations
    {
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
        }

        public static void MockOperations(this Mock<ICdmaCellRepository> repository)
        {
            repository.Setup(x => x.Get(It.IsAny<int>()))
                .Returns<int>(id => repository.Object.GetAll().FirstOrDefault(x => x.Id == id));

            repository.Setup(x => x.GetBySectorId(It.IsAny<int>(), It.IsAny<byte>()))
                .Returns<int, byte>(
                    (btsId, sectorId) =>
                        repository.Object.GetAll().FirstOrDefault(x => x.BtsId == btsId && x.SectorId == sectorId));
        }

        public static void MockOperation(this Mock<IBtsRepository> repository)
        {
            repository.Setup(x => x.GetByBtsId(It.IsAny<int>()))
                .Returns<int>(btsId => repository.Object.GetAll().FirstOrDefault(x => x.BtsId == btsId));

            repository.Setup(x => x.Get(It.IsAny<int>()))
                .Returns<int>(id => repository.Object.GetAll().FirstOrDefault(x => x.Id == id));
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
            repository.Setup(x => x.Get(It.IsAny<int>()))
                .Returns<int>(id => repository.Object.GetAll().FirstOrDefault(x => x.Id == id));

            repository.Setup(x => x.GetBySectorId(It.IsAny<int>(), It.IsAny<byte>()))
                .Returns<int, byte>(
                    (eNodebId, sectorId) =>
                        repository.Object.GetAll().FirstOrDefault(x => x.ENodebId == eNodebId && x.SectorId == sectorId));

            repository.Setup(x => x.GetAllInUseList())
                .Returns(repository.Object.GetAll().Where(x => x.IsInUse).ToList());
        }

        public static void MockOpertions(this Mock<ICollegeRepository> repository)
        {
            repository.Setup(x => x.Get(It.IsAny<int>())).Returns<int>(
                id => repository.Object.GetAll().FirstOrDefault(
                    x => x.Id == id));
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

    }
}
