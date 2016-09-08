using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Abp.Collections.Extensions;
using Abp.Localization;
using Abp.Modules;
using Abp.Reflection;
using AutoMapper;
using Castle.Core.Logging;
using Lte.Domain.Common;

namespace Abp.EntityFramework.AutoMapper
{
    [DependsOn(typeof (AbpKernelModule))]
    public class AbpAutoMapperModule : AbpModule
    {
        private readonly ITypeFinder _typeFinder;

        private static bool _createdMappingsBefore;
        private static readonly object _syncObj = new object();

        public AbpAutoMapperModule(ITypeFinder typeFinder)
        {
            _typeFinder = typeFinder;
            Logger = NullLogger.Instance;
        }

        public override void PostInitialize()
        {
            Mapper.Initialize(CreateMappings);
            
        }

        private void CreateMappings(IMapperConfiguration cfg)
        {
            lock (_syncObj)
            {
                //We should prevent duplicate mapping in an application, since AutoMapper is static.
                if (_createdMappingsBefore)
                {
                    return;
                }

                FindAndAutoMapTypes(cfg);
                CreateOtherMappings(cfg);

                _createdMappingsBefore = true;
            }
        }

        private void FindAndAutoMapTypes(IMapperConfiguration cfg)
        {
            var types = _typeFinder.Find(type =>
                type.IsDefined(typeof(AutoMapAttribute)) ||
                type.IsDefined(typeof(AutoMapFromAttribute)) ||
                type.IsDefined(typeof(AutoMapToAttribute))
                );

            Logger.DebugFormat("Found {0} classes defines auto mapping attributes", types.Length);
            foreach (var type in types)
            {
                Logger.Debug(type.FullName);
                AutoMapperHelper.CreateMap(type, cfg);
            }
        }

        private void CreateOtherMappings(IMapperConfiguration cfg)
        {
            var types = _typeFinder.Find(type => type.IsDefined(typeof (AutoMapConverterAttribute)));
            if (types.Length > 0)
            {
                var destType = types[0];
                var attribute = destType.GetCustomAttribute<AutoMapConverterAttribute>();
                if (attribute != null)
                {
                    var sourceType = attribute.SourceType;
                    var converterType = attribute.ConverterType;
                    cfg.CreateMap(sourceType,destType).ConvertUsing(converterType);
                }
            }
            if (IocManager == null) return;
            var localizationManager = IocManager.Resolve<ILocalizationManager>();
            cfg.CreateMap<LocalizableString, string>().ConvertUsing(ls => localizationManager.GetString(ls));
        }
    }

    public static class AutoMapperHelper
    {
        public static void CreateMap(Type type, IMapperConfiguration cfg)
        {
            CreateMap<AutoMapFromAttribute>(type, cfg);
            CreateMap<AutoMapToAttribute>(type, cfg);
            CreateMap<AutoMapAttribute>(type, cfg);
        }

        public static void CreateMap<TAttribute>(Type type, IMapperConfiguration cfg)
            where TAttribute : AutoMapAttribute
        {
            if (!type.IsDefined(typeof(TAttribute)))
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
                        var coreMap = cfg.CreateMap(type, targetType);
                        foreach (var property in type.GetProperties())
                        {
                            var resolveAttributes = property.GetCustomAttributes<AutoMapPropertyResolveAttribute>();
                            foreach (var resolveAttribute in resolveAttributes)
                            {
                                if (resolveAttribute.TargetType != targetType) continue;
                                var srcName = property.Name;
                                var destName = resolveAttribute.PeerMemberName;
                                var resolveActionType = resolveAttribute.ResolveActionType;
                                coreMap = resolveActionType == typeof (IgnoreMapAttribute)
                                    ? coreMap.ForMember(destName, map => map.Ignore())
                                    : coreMap.MappingCore(resolveActionType, destName, srcName);
                            }
                        }
                    }

                    if (autoMapToAttribute.Direction.HasFlag(AutoMapDirection.From))
                    {
                        var coreMap = cfg.CreateMap(targetType, type);
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
            else if (string.IsNullOrEmpty(srcName))
                coreMap = coreMap.ForMember(destName,
                    map => map.ResolveUsing(resolveActionType));
            else
                coreMap = coreMap.ForMember(destName,
                    map => map.ResolveUsing(resolveActionType).FromMember(srcName));
            return coreMap;
        }
    }
}
