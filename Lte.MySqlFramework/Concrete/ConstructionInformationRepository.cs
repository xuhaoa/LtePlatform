using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Concrete
{
    public class ConstructionInformationRepository : EfRepositorySave<MySqlContext, ConstructionInformation>,
        IConstructionInformationRepository
    {
        public ConstructionInformationRepository(IDbContextProvider<MySqlContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }
    }
}