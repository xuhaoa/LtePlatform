using System;
using System.Reflection;
using Abp.Collections.Extensions;
using AutoMapper;
using Lte.Domain.Common;

namespace Abp.EntityFramework.AutoMapper
{
    public static class AutoMapperHelper
    {
        public static void CreateMap(Type type)
        {
            CreateMap<AutoMapFromAttribute>(type);
            CreateMap<AutoMapToAttribute>(type);
            CreateMap<AutoMapAttribute>(type);
        }

        public static void CreateMap<TAttribute>(Type type)
            where TAttribute : AutoMapAttribute
        {
            if (!type.IsDefined(typeof (TAttribute)))
            {
                return;
            }

            foreach (var autoMapToAttribute in type.GetCustomAttributes<TAttribute>())
            {
                if (autoMapToAttribute.TargetTypes.IsNullOrEmpty())
                {
                    continue;
                }

                foreach (var targetType in autoMapToAttribute.TargetTypes)
                {
                    if (autoMapToAttribute.Direction.HasFlag(AutoMapDirection.To))
                    {
                        var coreMap = Mapper.CreateMap(type, targetType);
                        foreach (var property in type.GetProperties())
                        {
                            var resolveAttributes = property.GetCustomAttributes<AutoMapPropertyResolveAttribute>();
                            foreach (var resolveAttribute in resolveAttributes)
                            {
                                if (resolveAttribute.TargetType != targetType) continue;
                                var srcName = property.Name;
                                var destName = resolveAttribute.PeerMemberName;
                                var resolveActionType = resolveAttribute.ResolveActionType;
                                coreMap = coreMap.MappingCore(resolveActionType, destName, srcName);
                            }
                        }
                    }

                    if (autoMapToAttribute.Direction.HasFlag(AutoMapDirection.From))
                    {
                        var coreMap = Mapper.CreateMap(targetType, type);
                        foreach (var property in type.GetProperties())
                        {
                            var resolveAttributes = property.GetCustomAttributes<AutoMapPropertyResolveAttribute>();
                            foreach (var resolveAttribute in resolveAttributes)
                            {
                                if (resolveAttribute.TargetType != targetType) continue;
                                var srcName = resolveAttribute.PeerMemberName;
                                var destName = property.Name;
                                var resolveActionType = resolveAttribute.ResolveActionType;
                                coreMap = coreMap.MappingCore(resolveActionType, destName, srcName);
                            }
                        }
                    }
                }
            }
        }

        private static IMappingExpression MappingCore(this IMappingExpression coreMap,
            Type resolveActionType, string destName, string srcName)
        {
            if (resolveActionType == null)
                coreMap = coreMap.ForMember(destName, map => map.MapFrom(srcName));
            else
                coreMap = coreMap.ForMember(destName,
                    map => map.ResolveUsing(resolveActionType).FromMember(srcName));
            return coreMap;
        }
    }
}