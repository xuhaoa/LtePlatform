using System.Collections.Generic;
using Abp.Domain.Repositories;
using Lte.Parameters.Entities.Basic;

namespace Lte.Parameters.Abstract.Basic
{
    public interface IENodebRepository : IRepository<ENodeb>
    {
        ENodeb GetByENodebId(int eNodebId);

        ENodeb GetByName(string name);

        List<ENodeb> GetAllInUseList();

        List<ENodeb> GetAllList(double west, double east, double south, double north);

        int SaveChanges();
    }

    public interface IBtsRepository : IRepository<CdmaBts>
    {
        CdmaBts GetByBtsId(int btsId);

        CdmaBts GetByName(string name);

        List<CdmaBts> GetAllInUseList();

        List<CdmaBts> GetAllList(double west, double east, double south, double north);

        int SaveChanges();
    }
}
