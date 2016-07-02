using System;

namespace AutoMapper
{

    /// <summary>
    /// Converts source type to destination type instead of normal member mapping
    /// </summary>
    /// <typeparam name="TDestination">Destination type</typeparam>
    public interface ITypeConverter<out TDestination>
    {

        /// <summary>
        /// Performs conversion from source to destination type
        /// </summary>
        /// <param name="context">Resolution context</param>
        /// <returns>Destination object</returns>
		TDestination Convert(ResolutionContext context);
    }

    public interface ITypeMapFactory
    {
        TypeMap CreateTypeMap(Type sourceType, Type destinationType, IProfileConfiguration mappingOptions, MemberList memberList);
    }

    /// <summary>
    /// Generic-friendly implementation of <see cref="ITypeConverter{TDestination}"/>
    /// </summary>
    /// <typeparam name="TSource">Source type</typeparam>
    /// <typeparam name="TDestination">Destination type</typeparam>
    public abstract class TypeConverter<TSource, TDestination> : ITypeConverter<TDestination> 
    {
        public TDestination Convert(ResolutionContext context)
        {
            if (context.SourceValue != null && !(context.SourceValue is TSource))
            {
                throw new AutoMapperMappingException(context,
                    $"Value supplied is of type {typeof (TSource)} but expected {context.SourceValue.GetType()}.\nChange the type converter source type, or redirect the source value supplied to the value resolver using FromMember.");
            }

            return ConvertCore((TSource)context.SourceValue);
        }

        /// <summary>
        /// When overridden in a base class, this method is provided the casted source object extracted from the <see cref="ResolutionContext"/>
        /// </summary>
        /// <param name="source">Source object</param>
        /// <returns>Destination object</returns>
        protected abstract TDestination ConvertCore(TSource source);
    }
}