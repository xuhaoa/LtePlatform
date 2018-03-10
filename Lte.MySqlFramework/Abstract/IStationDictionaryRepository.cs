using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.Domain.Common;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Abstract
{
    public interface IStationDictionaryRepository : IRepository<StationDictionary>,
        IMatchRepository<StationDictionary, StationDictionaryExcel>, ISaveChanges
    {
        
    }
}