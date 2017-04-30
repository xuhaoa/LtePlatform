using Abp.Domain.Repositories;
using Lte.Parameters.Entities.Basic;
using System.Collections.Generic;
using Abp.EntityFramework.Repositories;

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

    public interface IConstruction_InformationRepository : IRepository<Construction_Information>, ISaveChanges
    {
        Construction_Information GetByFslNo(string fslNo);

        Construction_Information GetBySiteNo(string siteNo);
    }

    public interface IEnodeb_BaseRepository : IRepository<Enodeb_Base>, ISaveChanges
    {
        Enodeb_Base GetByENodebId(int eNodebId);

        Enodeb_Base GetByName(string name);
    }

    public interface IFSLEnodebRepository : IRepository<FSLEnodeb>
    {
    }
}
