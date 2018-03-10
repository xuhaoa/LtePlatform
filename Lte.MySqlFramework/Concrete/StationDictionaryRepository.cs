using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Concrete
{
    public class StationDictionaryRepository : EfRepositorySave<MySqlContext, StationDictionary>,
        IStationDictionaryRepository
    {
        public StationDictionaryRepository(IDbContextProvider<MySqlContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public StationDictionary Match(StationDictionaryExcel stat)
        {
            return FirstOrDefault(x => x.StationNum == stat.StationNum);
        }
    }
}