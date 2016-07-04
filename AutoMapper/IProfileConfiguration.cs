using System;
using System.Collections.Generic;
using System.Reflection;
using AutoMapper.Mappers;

namespace AutoMapper
{
    /// <summary>
    /// Contains profile-specific configuration
    /// </summary>
	public interface IProfileConfiguration
	{
        IEnumerable<IMemberConfiguration> MemberConfigurations { get; }

        IMemberConfiguration AddMemberConfiguration();

        IEnumerable<IConditionalObjectMapper> TypeConfigurations { get; }

        IConditionalObjectMapper AddConditionalObjectMapper();

        bool ConstructorMappingEnabled { get; }

        IMemberConfiguration DefaultMemberConfig { get; }
        
        IEnumerable<MethodInfo> SourceExtensionMethods { get; }

        void IncludeSourceExtensionMethods(Assembly assembly);
        
        Func<PropertyInfo, bool> ShouldMapProperty { get; set; }
        
        Func<FieldInfo, bool> ShouldMapField { get; set; }
    }

    /// <summary>
    /// Configuration for profile-specific maps
    /// </summary>
    public interface IProfileExpression : IProfileConfiguration
    {
        void DisableConstructorMapping();

        IMappingExpression<TSource, TDestination> CreateMap<TSource, TDestination>();
        
        IMappingExpression<TSource, TDestination> CreateMap<TSource, TDestination>(MemberList memberList);

        IMappingExpression<TSource, TDestination> CreateMap<TSource, TDestination>(string profileName, MemberList memberList);
        
        IMappingExpression CreateMap(Type sourceType, Type destinationType);
        
        IMappingExpression CreateMap(Type sourceType, Type destinationType, MemberList memberList);
        
        IMappingExpression CreateMap(Type sourceType, Type destinationType, MemberList memberList, string profileName);
        
        void ClearPrefixes();
        
        void RecognizePrefixes(params string[] prefixes);
        
        void RecognizePostfixes(params string[] postfixes);
        
        void RecognizeAlias(string original, string alias);
        
        void ReplaceMemberName(string original, string newValue);
        
        void RecognizeDestinationPrefixes(params string[] prefixes);
        
        void RecognizeDestinationPostfixes(params string[] postfixes);
        
        void AddGlobalIgnore(string propertyNameStartingWith);
        
        bool AllowNullDestinationValues { get; set; }
        
        bool AllowNullCollections { get; set; }
        
        INamingConvention SourceMemberNamingConvention { get; set; }
        
        INamingConvention DestinationMemberNamingConvention { get; set; }
        
        void ForAllMaps(Action<TypeMap, IMappingExpression> configuration);
    }
}