using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using Abp.Domain.Entities;
using Lte.Domain.Common.Wireless;

namespace Abp.EntityFramework.Extensions
{
    /// <summary>
    /// Extension methods for <see cref="IQueryable"/> and <see cref="IQueryable{T}"/>.
    /// </summary>
    public static class QueryableExtensions
    {
        /// <summary>
        /// Specifies the related objects to include in the query results.
        /// </summary>
        /// <param name="source">The source <see cref="IQueryable"/> on which to call Include.</param>
        /// <param name="condition">A boolean value to determine to include <see cref="path"/> or not.</param>
        /// <param name="path">The dot-separated list of related objects to return in the query results.</param>
        public static IQueryable IncludeIf(this IQueryable source, bool condition, string path)
        {
            return condition
                ? source.Include(path)
                : source;
        }

        /// <summary>
        /// Specifies the related objects to include in the query results.
        /// </summary>
        /// <param name="source">The source <see cref="IQueryable{T}"/> on which to call Include.</param>
        /// <param name="condition">A boolean value to determine to include <see cref="path"/> or not.</param>
        /// <param name="path">The dot-separated list of related objects to return in the query results.</param>
        public static IQueryable<T> IncludeIf<T>(this IQueryable<T> source, bool condition, string path)
        {
            return condition
                ? source.Include(path)
                : source;
        }

        /// <summary>
        /// Specifies the related objects to include in the query results.
        /// </summary>
        /// <param name="source">The source <see cref="IQueryable{T}"/> on which to call Include.</param>
        /// <param name="condition">A boolean value to determine to include <see cref="path"/> or not.</param>
        /// <param name="path">The type of navigation property being included.</param>
        public static IQueryable<T> IncludeIf<T, TProperty>(this IQueryable<T> source, bool condition, Expression<Func<T, TProperty>> path)
        {
            return condition
                ? source.Include(path)
                : source;
        }

        public static List<T> FilterTownList<T, TTown>(this IEnumerable<T> query, List<TTown> towns)
            where T : ITownId
            where TTown : Entity
        {
            return (from q in query join t in towns on q.TownId equals t.Id select q).ToList();
        }
    }
}