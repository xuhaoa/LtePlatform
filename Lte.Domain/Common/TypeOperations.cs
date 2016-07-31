using System;
using System.Globalization;
using System.Linq;
using System.Reflection;
using AutoMapper;
using Lte.Domain.Common.Wireless;
using Lte.Domain.LinqToExcel.Service;
using Lte.Domain.Regular;

namespace Lte.Domain.Common
{
    public static class TypeOperations
    {
        public static MethodInfo GetParseNumberMethod(this Type t)
        {
            return t.GetMethod("Parse",
                new[] {typeof (string), typeof (NumberStyles), typeof (IFormatProvider)});
        }

        public static MethodInfo GetParseExactMethod(this Type t)
        {
            return t.GetMethod("ParseExact",
                new[] {typeof (string), typeof (string), typeof (IFormatProvider)});
        }

        public static TEnum GetEnumType<TEnum>(this string description)
            where TEnum : struct
        {
            var attribute =
                typeof (TEnum).GetCustomAttribute<EnumTypeDescriptionAttribute>();
            if (attribute == null) return default(TEnum);
            var list = attribute.TupleList;
            var defaultValue = attribute.DefaultValue;
            var tuple = list.FirstOrDefault(x => x.Item2 == description);
            return (TEnum)(tuple?.Item1 ?? defaultValue);
        }

        public static TEnum GetEnumType<TEnum>(this string description, Tuple<TEnum, string>[] alternativeList)
            where TEnum : struct
        {
            var attribute =
                   typeof(TEnum).GetCustomAttribute<EnumTypeDescriptionAttribute>();
            if (attribute == null) return default(TEnum);
            var defaultValue = attribute.DefaultValue;
            var alternativeTuple = alternativeList.FirstOrDefault(x => x.Item2 == description);
            return alternativeTuple?.Item1 ?? (TEnum)defaultValue;
        }

        public static string GetEnumDescription<TEnum>(this TEnum type)
            where TEnum : struct
        {
            var attribute =
                typeof(TEnum).GetCustomAttribute<EnumTypeDescriptionAttribute>();
            if (attribute == null) return null;
            var list = attribute.TupleList;
            var defaultValue = attribute.DefaultValue;
            var defaultDescription = list.FirstOrDefault(x => x.Item1 == defaultValue)?.Item2;
            var tuple = list.FirstOrDefault(x => x.Item1.Equals(type));
            return (tuple != null) ? tuple.Item2 : defaultDescription;
        }

        public static string GetEnumDescription<TEnum>(this TEnum type, Tuple<TEnum, string>[] alternativeList)
            where TEnum : struct
        {
            var attribute =
                typeof(TEnum).GetCustomAttribute<EnumTypeDescriptionAttribute>();
            if (attribute == null) return null;
            var list = attribute.TupleList;
            var defaultValue = attribute.DefaultValue;
            var defaultDescription = list.FirstOrDefault(x => x.Item1 == defaultValue)?.Item2;
            var tuple = list.FirstOrDefault(x => x.Item1.Equals(type));
            if (tuple != null) return tuple?.Item2;
            var alternativeTuple = alternativeList.FirstOrDefault(x => x.Item1.Equals(type));
            return alternativeTuple != null ? alternativeTuple.Item2 : defaultDescription;
        }

        public static byte? GetNextStateDescription<TEnum>(this string currentStateDescription, TEnum finalState)
            where TEnum: struct
        {
            var currentState = currentStateDescription.GetEnumType<TEnum>();
            if (currentState.Equals(finalState))
                return null;
            return (byte) (currentState.Cast<byte>() + 1);
        }
    }

    [AttributeUsage(AttributeTargets.Enum)]
    public class EnumTypeDescriptionAttribute : Attribute
    {
        public Type EnumType { get; }

        public Tuple<object, string>[] TupleList { get; }

        public object DefaultValue { get; }

        public EnumTypeDescriptionAttribute(Type enumType, object defaultValue)
        {
            EnumType = enumType;
            DefaultValue = defaultValue;
            TupleList = WirelessConstants.EnumDictionary[EnumType.Name];
        }
    }

    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class AutoMapPropertyResolveAttribute : Attribute
    {
        public string PeerMemberName { get; }

        public Type TargetType { get; set; }

        public Type ResolveActionType { get; }

        public AutoMapPropertyResolveAttribute(string peerMemberName, Type targetType, Type resolvActionType = null)
        {
            PeerMemberName = peerMemberName;
            TargetType = targetType;
            ResolveActionType = resolvActionType;
        }
    }

    public class IntToBoolTransform : ValueResolver<int, bool>
    {
        protected override bool ResolveCore(int source)
        {
            return source == 1;
        }
    }

    public class PositiveBoolTransform : ValueResolver<int, bool>
    {
        protected override bool ResolveCore(int source)
        {
            return source > 0;
        }
    }

    public class ZeroBoolTransform : ValueResolver<int, bool>
    {
        protected override bool ResolveCore(int source)
        {
            return source == 0;
        }
    }

    public class IndoorDescriptionToOutdoorBoolTransform : ValueResolver<string, bool>
    {
        protected override bool ResolveCore(string source)
        {
            return source.Trim() == "否";
        }
    }

    public class FddTransform : ValueResolver<string, bool>
    {
        protected override bool ResolveCore(string source)
        {
            return source.IndexOf("FDD", StringComparison.Ordinal) >= 0;
        }
    }

    public class IpAddressTransform : ValueResolver<IpAddress, string>
    {
        protected override string ResolveCore(IpAddress source)
        {
            return source.AddressString;
        }
    }

    public class IpByte4Transform : ValueResolver<IpAddress, byte>
    {
        protected override byte ResolveCore(IpAddress source)
        {
            return source.IpByte4;
        }
    }

    public class DoubleTransform : ValueResolver<double, double>
    {
        protected override double ResolveCore(double source)
        {
            return source*2;
        }
    }

    public class FirstLittleBracketContentsTransform : ValueResolver<string, string>
    {
        protected override string ResolveCore(string source)
        {
            return source.GetSplittedFields(new[] {'(', ')'})[0];
        }
    }

    public class SecondLittleBracketContentsTransform : ValueResolver<String, string>
    {
        protected override string ResolveCore(string source)
        {
            return source.GetSplittedFields(new[] {'(', ')'})[1];
        }
    }

    public class FirstMiddleBracketContentsTransform : ValueResolver<string, string>
    {
        protected override string ResolveCore(string source)
        {
            return source.GetSplittedFields(new[] {'[', ']'})[0];
        }
    }

    public class SecondMiddleBracketContentsTransform : ValueResolver<string, string>
    {
        protected override string ResolveCore(string source)
        {
            return source.GetSplittedFields(new[] { '[', ']' })[1];
        }
    }
}
