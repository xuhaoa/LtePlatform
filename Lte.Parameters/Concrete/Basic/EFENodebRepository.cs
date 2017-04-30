using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Parameters.Abstract.Basic;
using Lte.Parameters.Entities.Basic;
using System.Collections.Generic;
using System.Linq;

namespace Lte.Parameters.Concrete.Basic
{
    public class EFENodebRepository : EfRepositoryBase<EFParametersContext, ENodeb>, IENodebRepository
    {   
        public ENodeb GetByENodebId(int eNodebId)
        {
            return FirstOrDefault(x => x.ENodebId == eNodebId);
        }

        public ENodeb GetByName(string name)
        {
            return FirstOrDefault(x => x.Name == name);
        }

        public List<ENodeb> GetAllInUseList()
        {
            return GetAll().Where(x => x.IsInUse).ToList();
        }

        public List<ENodeb> GetAllList(double west, double east, double south, double north)
        {
            return GetAllList(x => x.Longtitute >= west && x.Longtitute <= east
                && x.Lattitute >= south && x.Lattitute <= north);
        }

        public EFENodebRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

    }

    public class EFBtsRepository : EfRepositoryBase<EFParametersContext, CdmaBts>, IBtsRepository
    {
        public CdmaBts GetByBtsId(int btsId)
        {
            return FirstOrDefault(x => x.BtsId == btsId);
        }

        public CdmaBts GetByName(string name)
        {
            return FirstOrDefault(x => x.Name == name);
        }

        public List<CdmaBts> GetAllInUseList()
        {
            return GetAll().Where(x => x.IsInUse).ToList();
        }

        public List<CdmaBts> GetAllList(double west, double east, double south, double north)
        {
            return GetAllList(x => x.Longtitute >= west && x.Longtitute <= east
                && x.Lattitute >= south && x.Lattitute <= north);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public EFBtsRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }

    public class Construction_InformationRepository : EfRepositoryBase<EFParametersContext, Construction_Information>,
        IConstruction_InformationRepository
    {
        public Construction_InformationRepository(IDbContextProvider<EFParametersContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }

        public Construction_Information GetByFslNo(string fslNo)
        {
            return FirstOrDefault(o => o.FSLNO == fslNo);
        }

        public Construction_Information GetBySiteNo(string siteNo)
        {
            return FirstOrDefault(o => o.SITENO == siteNo);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class Enodeb_BaseRepository : EfRepositoryBase<EFParametersContext, Enodeb_Base>, IEnodeb_BaseRepository
    {
        public Enodeb_BaseRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public Enodeb_Base GetByENodebId(int eNodebId)
        {
            return FirstOrDefault(o => o.ENODEBID == eNodebId);
        }

        public Enodeb_Base GetByName(string name)
        {
            return FirstOrDefault(o => o.ENODEBNAME == name);
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
    }

    public class FSLEnodebRepository : EfRepositoryBase<EFParametersContext, FSLEnodeb>, IFSLEnodebRepository
    {
        public FSLEnodebRepository(IDbContextProvider<EFParametersContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}
