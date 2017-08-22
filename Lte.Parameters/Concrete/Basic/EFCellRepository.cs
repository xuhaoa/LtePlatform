using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Basic;
using System.Collections.Generic;
using System.Linq;

namespace Lte.Parameters.Concrete.Basic
{
    public class EFCdmaCellRepository : EfRepositoryBase<EFParametersContext, CdmaCell>, ICdmaCellRepository
    {
        public List<CdmaCell> GetAllList(int btsId)
        {
            return GetAll().Where(x => x.BtsId == btsId).ToList();
        }

        public List<CdmaCell> GetAllInUseList()
        {
            return GetAll().Where(x => x.IsInUse).ToList();
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public CdmaCell GetBySectorId(int btsId, byte sectorId)
        {
            return FirstOrDefault(x => x.BtsId == btsId && x.SectorId == sectorId);
        }

        public CdmaCell GetBySectorIdAndCellType(int btsId, byte sectorId, string cellType)
        {
            return FirstOrDefault(x => x.BtsId == btsId && x.SectorId == sectorId && x.CellType == cellType);
        }

        public EFCdmaCellRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}
