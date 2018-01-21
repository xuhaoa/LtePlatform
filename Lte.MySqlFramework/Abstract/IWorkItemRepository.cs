using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Abstract
{
    public interface IWorkItemRepository : IPagingRepository<WorkItem>, ISaveChanges
    {
        Task<List<WorkItem>> GetAllListAsync(int eNodebId, byte sectorId);

        Task<List<WorkItem>> GetAllListAsync(int eNodebId);

        Task<List<WorkItem>> GetUnfinishedPreciseListAsync(DateTime begin, DateTime end);

        Task<WorkItem> GetPreciseExistedAsync(int eNodebId, byte sectorId);
    }
}