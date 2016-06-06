using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Abstract
{
    public interface ICellStatMysqlRepository : IRepository<CellStatMysql>
    {
        CellStatMysql Get(int eNodebId, byte sectorId, DateTime date);

        CellStatMysql Get(int eNodebId, short pci, DateTime date);

        int SaveChanges();
    }

    public interface IPreciseWorkItemCellRepository : IRepository<PreciseWorkItemCell>
    {
        List<PreciseWorkItemCell> GetAllList(string serialNumber);

        PreciseWorkItemCell Get(string serialNumber, int eNodebId, byte sectorId);

        int SaveChanges();
    }
}
