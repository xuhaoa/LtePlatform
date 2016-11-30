using Abp.EntityFramework;
using Lte.Domain.Common.Wireless;
using Lte.Parameters.Abstract;
using Lte.Parameters.Entities.Work;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Lte.Parameters.Concrete
{
    public class EFWorkItemRepository : PagingRepositoryBase<WorkItem>, IWorkItemRepository
    {
        public async Task<List<WorkItem>> GetAllListAsync(int eNodebId)
        {
            return await GetAllListAsync(x => x.ENodebId == eNodebId);
        }

        public async Task<List<WorkItem>> GetAllListAsync(DateTime begin, DateTime end)
        {
            return await GetAllListAsync(x => x.Deadline > begin && x.Deadline <= end);
        }

        public async Task<List<WorkItem>> GetAllKpiListAsync(DateTime begin, DateTime end)
        {
            return
                await
                    GetAllListAsync(
                        x =>
                            x.Deadline > begin && x.Deadline <= end && (x.Type == WorkItemType.Interference4G ||
                            x.Type == WorkItemType.Kpi2G || x.Type == WorkItemType.Kpi4G));
        }

        public async Task<List<WorkItem>> GetUnfinishedPreciseListAsync(DateTime begin, DateTime end)
        {
            return
                await
                    GetAllListAsync(
                        x => x.BeginTime >= begin && x.BeginTime < end && x.Subtype == WorkItemSubtype.PreciseRate
                        && x.State != WorkItemState.Finished);
        }

        public async Task<WorkItem> GetPreciseExistedAsync(int eNodebId, byte sectorId)
        {
            return
                await
                    FirstOrDefaultAsync(
                        x =>
                            x.ENodebId == eNodebId && x.SectorId == sectorId && x.Subtype == WorkItemSubtype.PreciseRate &&
                            x.State != WorkItemState.Finished);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public async Task<List<WorkItem>> GetAllListAsync(int eNodebId, byte sectorId)
        {
            return await GetAllListAsync(x => x.ENodebId == eNodebId && x.SectorId == sectorId);
        }

        public EFWorkItemRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}
