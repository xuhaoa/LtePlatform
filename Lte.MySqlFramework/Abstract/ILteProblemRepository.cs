using Abp.Domain.Repositories;
using Abp.EntityFramework.Repositories;
using Lte.MySqlFramework.Entities;

namespace Lte.MySqlFramework.Abstract
{
    public interface ILteProblemRepository : IRepository<LteProblem>, ISaveChanges, 
        IMatchRepository<LteProblem, StandarProblemExcel>,
        IMatchRepository<LteProblem, ChoiceProblemExcel>
    {
        
    }
}