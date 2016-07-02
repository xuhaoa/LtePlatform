namespace AutoMapper
{
    using System;
    using System.Collections.Generic;
    using System.Reflection;
    using Internal;

    /// <summary>
    /// Options for matching source/destination member types
    /// </summary>
    public interface IMappingOptions
    {
        /// <summary>
        /// Specify which properties should be mapped.
        /// By default only public properties are mapped.
        /// </summary>
        Func<PropertyInfo, bool> ShouldMapProperty { get; }

        /// <summary>
        /// Specify which fields should be mapped.
        /// By default only public fields are mapped.
        /// </summary>
        Func<FieldInfo, bool> ShouldMapField { get; }
        /// <summary>
        /// Naming convention for source members
        /// </summary>
        INamingConvention SourceMemberNamingConvention { get; }
        /// <summary>
        /// Naming convention for destination members
        /// </summary>
        INamingConvention DestinationMemberNamingConvention { get; }
        /// <summary>
        /// Source member name prefixes to ignore/drop
        /// </summary>
        IEnumerable<string> Prefixes { get; }
        /// <summary>
        /// Source member name postfixes to ignore/drop
        /// </summary>
        IEnumerable<string> Postfixes { get; }

        /// <summary>
        /// Destination member name prefixes to ignore/drop
        /// </summary>
        IEnumerable<string> DestinationPrefixes { get; }

        /// <summary>
        /// Destination member naem prefixes to ignore/drop
        /// </summary>
        IEnumerable<string> DestinationPostfixes { get; }

        /// <summary>
        /// Source/destination member name replacers
        /// </summary>
        IEnumerable<MemberNameReplacer> MemberNameReplacers { get; }

        /// <summary>
        /// Source/destination member aliases
        /// </summary>
        IEnumerable<AliasedMember> Aliases { get; }

        /// <summary>
        /// Allow mapping to constructors that accept arguments
        /// </summary>
        bool ConstructorMappingEnabled { get; }

        /// <summary>
        /// Source extension methods included for search
        /// </summary>
        IEnumerable<MethodInfo> SourceExtensionMethods { get; }
    }

    /// <summary>
    /// Options for a single map operation
    /// </summary>
    public interface IMappingOperationOptions
    {
        /// <summary>
        /// Construct services using this callback. Use this for child/nested containers
        /// </summary>
        /// <param name="constructor"></param>
        void ConstructServicesUsing(Func<Type, object> constructor);

        /// <summary>
        /// Create any missing type maps, if found
        /// </summary>
        bool CreateMissingTypeMaps { get; set; }

        /// <summary>
        /// Add context items to be accessed at map time inside an <see cref="IValueResolver"/> or <see cref="ITypeConverter{TDestination}"/>
        /// </summary>
        IDictionary<string, object> Items { get; }

        /// <summary>
        /// Disable the cache used to re-use destination instances based on equality
        /// </summary>
        bool DisableCache { get; set; }

        /// <summary>
        /// Execute a custom function to the source and/or destination types before member mapping
        /// </summary>
        /// <param name="beforeFunction">Callback for the source/destination types</param>
        void BeforeMap(Action<object, object> beforeFunction);

        /// <summary>
        /// Execute a custom function to the source and/or destination types after member mapping
        /// </summary>
        /// <param name="afterFunction">Callback for the source/destination types</param>
        void AfterMap(Action<object, object> afterFunction);
    }

    public interface IMappingOperationOptions<out TSource, out TDestination> : IMappingOperationOptions
    {
        /// <summary>
        /// Execute a custom function to the source and/or destination types before member mapping
        /// </summary>
        /// <param name="beforeFunction">Callback for the source/destination types</param>
        void BeforeMap(Action<TSource, TDestination> beforeFunction);

        /// <summary>
        /// Execute a custom function to the source and/or destination types after member mapping
        /// </summary>
        /// <param name="afterFunction">Callback for the source/destination types</param>
        void AfterMap(Action<TSource, TDestination> afterFunction);
    }
}