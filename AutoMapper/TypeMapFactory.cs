using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using AutoMapper.Internal;

namespace AutoMapper
{
    public class TypeMapFactory : ITypeMapFactory
    {
        private static readonly ConcurrentDictionary<Type, TypeDetails> _typeInfos
            = new ConcurrentDictionary<Type, TypeDetails>();

        public static TypeDetails GetTypeInfo(Type type, IProfileConfiguration profileConfiguration)
        {
            var typeInfo = _typeInfos.GetOrAdd(type,
                t =>
                    new TypeDetails(type, profileConfiguration.ShouldMapProperty, profileConfiguration.ShouldMapField,
                        profileConfiguration.SourceExtensionMethods));

            return typeInfo;
        }

        public TypeMap CreateTypeMap(Type sourceType, Type destinationType, IProfileConfiguration options, MemberList memberList)
        {
            var sourceTypeInfo = GetTypeInfo(sourceType, options);
            var destTypeInfo = GetTypeInfo(destinationType, options);

            var typeMap = new TypeMap(sourceTypeInfo, destTypeInfo, memberList);

            foreach (var destProperty in destTypeInfo.PublicWriteAccessors)
            {
                var members = new LinkedList<MemberInfo>();

                if (!MapDestinationPropertyToSource(options, sourceTypeInfo, destProperty.GetType(), destProperty.Name,
                        members)) continue;
                var resolvers = members.Select(mi => mi.ToMemberGetter());
                var destPropertyAccessor = destProperty.ToMemberAccessor();

                typeMap.AddPropertyMap(destPropertyAccessor, resolvers);
            }
            if (destinationType.IsAbstract() || !destinationType.IsClass()) return typeMap;
            foreach (var destCtor in destTypeInfo.Constructors.OrderByDescending(ci => ci.GetParameters().Length))
            {
                if (MapDestinationCtorToSource(typeMap, destCtor, sourceTypeInfo, options))
                {
                    break;
                }
            }
            return typeMap;
        }

        private static bool MapDestinationPropertyToSource(IProfileConfiguration options, TypeDetails sourceTypeInfo,
            Type destType, string destMemberInfo, LinkedList<MemberInfo> members)
        {
            return
                options.MemberConfigurations.Any(
                    _ => _.MapDestinationPropertyToSource(options, sourceTypeInfo, destType, destMemberInfo, members));
        }

        private static bool MapDestinationCtorToSource(TypeMap typeMap, ConstructorInfo destCtor,
            TypeDetails sourceTypeInfo, IProfileConfiguration options)
        {
            var ctorParameters = destCtor.GetParameters();

            if (ctorParameters.Length == 0 || !options.ConstructorMappingEnabled)
                return false;

            var parameters = (from parameter in ctorParameters
                let members = new LinkedList<MemberInfo>()
                let canResolve =
                    MapDestinationPropertyToSource(options, sourceTypeInfo, parameter.GetType(), parameter.Name, members)
                let resolvers = members.Select(mi => mi.ToMemberGetter())
                select new ConstructorParameterMap(parameter, resolvers.ToArray(), canResolve)).ToList();

            typeMap.AddConstructorMap(destCtor, parameters);

            return true;
        }

        public TypeDetails GetTypeInfo(Type type, IMappingOptions mappingOptions)
        {
            return GetTypeInfo(type, mappingOptions.ShouldMapProperty, mappingOptions.ShouldMapField, mappingOptions.SourceExtensionMethods);
        }

        private static TypeDetails GetTypeInfo(Type type, Func<PropertyInfo, bool> shouldMapProperty,
            Func<FieldInfo, bool> shouldMapField, IEnumerable<MethodInfo> extensionMethodsToSearch)
        {
            return _typeInfos.GetOrAdd(type,
                t => new TypeDetails(type, shouldMapProperty, shouldMapField, extensionMethodsToSearch));
        }

        private static MemberInfo FindTypeMember(IEnumerable<MemberInfo> modelProperties,
            IEnumerable<MethodInfo> getMethods,
            IEnumerable<MethodInfo> getExtensionMethods,
            string nameToSearch,
            IMappingOptions mappingOptions)
        {
            var pi = modelProperties.FirstOrDefault(prop => NameMatches(prop.Name, nameToSearch, mappingOptions));
            if (pi != null)
                return pi;

            var mi = getMethods.FirstOrDefault(m => NameMatches(m.Name, nameToSearch, mappingOptions));
            if (mi != null)
                return mi;

            mi = getExtensionMethods.FirstOrDefault(m => NameMatches(m.Name, nameToSearch, mappingOptions));
            return mi;
        }

        private static bool NameMatches(string memberName, string nameToMatch, IMappingOptions mappingOptions)
        {
            var possibleSourceNames = PossibleNames(memberName, mappingOptions.Aliases);

            var possibleDestNames = PossibleNames(nameToMatch, mappingOptions.Aliases);

            var all =
                from sourceName in possibleSourceNames
                from destName in possibleDestNames
                select new {sourceName, destName};

            return
                all.Any(pair => string.Compare(pair.sourceName, pair.destName, StringComparison.OrdinalIgnoreCase) == 0);
        }

        private static IEnumerable<string> PossibleNames(string memberName, IEnumerable<AliasedMember> aliases)
        {
            if (string.IsNullOrEmpty(memberName))
                yield break;

            yield return memberName;

            foreach (
                var alias in aliases.Where(alias => string.Equals(memberName, alias.Member, StringComparison.Ordinal)))
            {
                yield return alias.Alias;
            }
        }

        private NameSnippet CreateNameSnippet(IEnumerable<string> matches, int i)
        {
            return new NameSnippet
            {
                First =
                    string.Join("",matches.Take(i).ToArray()),
                Second =
                    string.Join("",matches.Skip(i).ToArray())
            };
        }

        private class NameSnippet
        {
            public string First { get; set; }

            public string Second { get; set; }
        }
    }
}