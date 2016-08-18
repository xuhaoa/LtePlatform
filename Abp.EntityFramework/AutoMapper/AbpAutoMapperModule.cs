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
        public ILogger Logger { get; set; }

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
            CreateMappings();
        }

        private void CreateMappings()
        {
            lock (_syncObj)
            {
                //We should prevent duplicate mapping in an application, since AutoMapper is static.
                if (_createdMappingsBefore)
                {
                    return;
                }

                FindAndAutoMapTypes();
                CreateOtherMappings();

                _createdMappingsBefore = true;
            }
        }

        private void FindAndAutoMapTypes()
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
                AutoMapperHelper.CreateMap(type);
            }
        }

        private void CreateOtherMappings()
        {
            if (IocManager == null) return;
            var localizationManager = IocManager.Resolve<ILocalizationManager>();
            Mapper.CreateMap<LocalizableString, string>().ConvertUsing(ls => localizationManager.GetString(ls));
        }
    }

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
                                coreMap = resolveActionType == typeof (IgnoreMapAttribute)
                                    ? coreMap.ForMember(destName, map => map.Ignore())
                                    : coreMap.MappingCore(resolveActionType, destName, srcName);
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
