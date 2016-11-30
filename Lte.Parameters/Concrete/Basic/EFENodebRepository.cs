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
}
