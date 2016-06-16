using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.EntityFramework.AutoMapper;

namespace Abp.EntityFramework.Repositories
{
    public interface IMatchRepository<out TEnitty, in TExcel>
        where TEnitty: Entity
    {
        TEnitty Match(TExcel stat);
    }

    public interface ISaveChanges
    {
        int SaveChanges();
    }

    public static class MatchRepositoryOperation
    {
        public static int Import<TRepository, TEntity, TExcel>(this TRepository repository, IEnumerable<TExcel> stats)
            where TRepository : IRepository<TEntity>, IMatchRepository<TEntity, TExcel>, ISaveChanges
            where TEntity : Entity
        {
            foreach (var stat in stats)
            {
                var info = repository.Match(stat);
                if (info == null)
                {
                    repository.Insert(stat.MapTo<TEntity>());
                }
            }
            return repository.SaveChanges();
        }
    }
}
