
    using System;
    using System.Collections.Generic;
    using System.Reflection;

namespace AutoMapper
{
    public class AliasedMember
    {
        public AliasedMember(string member, string alias)
        {
            Member = member;
            Alias = alias;
        }

        public string Member { get; }

        public string Alias { get; }

        public bool Equals(AliasedMember other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return Equals(other.Member, Member) && Equals(other.Alias, Alias);
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != typeof(AliasedMember)) return false;
            return Equals((AliasedMember)obj);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                return (Member.GetHashCode() * 397) ^ Alias.GetHashCode();
            }
        }
    }

    public class MemberNameReplacer
    {
        public MemberNameReplacer(string originalValue, string newValue)
        {
            OriginalValue = originalValue;
            NewValue = newValue;
        }

        public string OriginalValue { get; private set; }
        public string NewValue { get; private set; }
    }

    /// <summary>
    /// Options for matching source/destination member types
    /// </summary>
    public interface IMappingOptions
    {
        Func<PropertyInfo, bool> ShouldMapProperty { get; }
        
        Func<FieldInfo, bool> ShouldMapField { get; }
        
        INamingConvention SourceMemberNamingConvention { get; }
        
        INamingConvention DestinationMemberNamingConvention { get; }
        
        IEnumerable<string> Prefixes { get; }
        
        IEnumerable<string> Postfixes { get; }
        
        IEnumerable<string> DestinationPrefixes { get; }

        IEnumerable<string> DestinationPostfixes { get; }
        
        IEnumerable<MemberNameReplacer> MemberNameReplacers { get; }
        
        IEnumerable<AliasedMember> Aliases { get; }
        
        bool ConstructorMappingEnabled { get; }
        
        IEnumerable<MethodInfo> SourceExtensionMethods { get; }
    }

    /// <summary>
    /// Options for a single map operation
    /// </summary>
    public interface IMappingOperationOptions
    {
        void ConstructServicesUsing(Func<Type, object> constructor);
        
        bool CreateMissingTypeMaps { get; set; }
        
        IDictionary<string, object> Items { get; }
        
        bool DisableCache { get; set; }
        
        void BeforeMap(Action<object, object> beforeFunction);
        
        void AfterMap(Action<object, object> afterFunction);
    }

    public interface IMappingOperationOptions<out TSource, out TDestination> : IMappingOperationOptions
    {
        void BeforeMap(Action<TSource, TDestination> beforeFunction);
        
        void AfterMap(Action<TSource, TDestination> afterFunction);
    }
}