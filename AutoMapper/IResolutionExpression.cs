namespace AutoMapper
{
    using System;
    using System.Linq.Expressions;

    /// <summary>
    /// Custom resolver options
    /// </summary>
    /// <typeparam name="TSource">Source type</typeparam>
    public interface IResolutionExpression<TSource> : IResolutionExpression
    {
        void FromMember(Expression<Func<TSource, object>> sourceMember);
    }

    /// <summary>
    /// Custom resolver options
    /// </summary>
    public interface IResolutionExpression
    {
        void FromMember(string sourcePropertyName);
    }

    /// <summary>
    /// Custom resolver options
    /// </summary>
    /// <typeparam name="TSource">Source type</typeparam>
    public interface IResolverConfigurationExpression<TSource> : IResolutionExpression<TSource>
    {
        IResolutionExpression<TSource> ConstructedBy(Func<IValueResolver> constructor);
    }

    /// <summary>
    /// Custom resolver options
    /// </summary>
    /// <typeparam name="TSource">Source type</typeparam>
    /// <typeparam name="TValueResolver">Value resolver type</typeparam>
    public interface IResolverConfigurationExpression<TSource, in TValueResolver>
        where TValueResolver : IValueResolver
    {
        IResolverConfigurationExpression<TSource, TValueResolver> FromMember(Expression<Func<TSource, object>> sourceMember);
        
        IResolverConfigurationExpression<TSource, TValueResolver> FromMember(string sourcePropertyName);
        
        IResolverConfigurationExpression<TSource, TValueResolver> ConstructedBy(Func<TValueResolver> constructor);
    }

    /// <summary>
    /// Custom resolver options
    /// </summary>
    public interface IResolverConfigurationExpression : IResolutionExpression
    {
        IResolutionExpression ConstructedBy(Func<IValueResolver> constructor);
    }
}