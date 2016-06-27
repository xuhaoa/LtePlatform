using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.EntityFramework.AutoMapper;
using AutoMapper;
using Lte.Domain.Regular;

namespace Abp.EntityFramework.Repositories
{
    public interface IMatchRepository<out TEnitty, in TExcel>
        where TEnitty: Entity
    {
        TEnitty Match(TExcel stat);
    }

    public interface IDateSpanQuery<TEntity>
    {
        List<TEntity> GetAllList(DateTime begin, DateTime end);

        List<TEntity> GetAllList(int townId, DateTime begin, DateTime end);
    }

    public interface ISaveChanges
    {
        int SaveChanges();
    }

    public interface IDistrictTown
    {
        string District { get; set; }

        string Town { get; set; }

        int TownId { get; set; }
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

        public static int ImportOne<TRepository, TEntity, TDto>(this TRepository repository, TDto stat)
            where TRepository : IRepository<TEntity>, IMatchRepository<TEntity, TDto>, ISaveChanges
            where TEntity : Entity
        {
            var info = repository.Match(stat);
            if (info == null)
            {
                repository.Insert(stat.MapTo<TEntity>());
            }
            return repository.SaveChanges();
        }

        public async static Task<int> UpdateOne<TRepository, TEntity, TDto>(this TRepository repository, TDto stat)
            where TRepository : IRepository<TEntity>, IMatchRepository<TEntity, TDto>, ISaveChanges
            where TEntity : Entity, new()
        {
            var info = repository.Match(stat);
            if (info == null)
            {
                await repository.InsertAsync(stat.MapTo<TEntity>());
            }
            else
            {
                Mapper.Map<TDto, TEntity>(stat).CloneProperties(info, true);
                await repository.UpdateAsync(info);
            }
            return repository.SaveChanges();
        }
    }
}
