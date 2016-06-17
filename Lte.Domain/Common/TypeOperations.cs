using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Lte.Domain.Regular;
using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    public static class TypeOperations
    {
        public static MethodInfo GetParseNumberMethod(this Type t)
        {
            return t.GetMethod("Parse",
                new[] {typeof (string), typeof (NumberStyles), typeof (IFormatProvider)});
        }

        private static MethodInfo GetParseMethod(this Type t)
        {
            return t.GetMethod("Parse", new[] {typeof (string)});
        }

        public static MethodInfo GetParseExactMethod(this Type t)
        {
            return t.GetMethod("ParseExact",
                new[] {typeof (string), typeof (string), typeof (IFormatProvider)});
        }

        private static Dictionary<string, string> GetFieldTextList<T>(this string line) where T : class
        {
            Dictionary<string, string> result = new Dictionary<string, string>();
            RowAttribute attribute = Attribute.GetCustomAttribute((typeof (T)), typeof (RowAttribute))
                as RowAttribute;
            if (attribute != null)
            {
                char interSplitter = attribute.InterColumnSplitter;
                char intraSplitter = attribute.IntraColumnSplitter;
                string[] fields = line.GetSplittedFields(interSplitter);
                foreach (string field in fields)
                {
                    string[] intraFields = field.GetSplittedFields(intraSplitter);
                    result.Add(intraFields[0], intraFields[1]);
                }
            }
            return result;
        }

        public static T GenerateOneRowFromText<T>(this string line) where T : class, new()
        {
            Dictionary<string, string> fieldTextList = line.GetFieldTextList<T>();
            PropertyInfo[] properties = (typeof (T)).GetProperties();
            T result = new T();
            foreach (PropertyInfo property in properties)
            {
                ColumnAttribute columnAttribute =
                    Attribute.GetCustomAttribute(property, typeof (ColumnAttribute)) as ColumnAttribute;
                if (columnAttribute != null)
                {
                    string propertyName
                        = columnAttribute.Name;
                    string valueText = fieldTextList[propertyName];
                    result.SetValueByText(property, valueText);
                }
            }
            return result;
        }

        private static void SetValueByText<T>(this T result, PropertyInfo property, string valueText)
            where T : class, new()
        {
            Type propertyType = property.PropertyType;
            ColumnAttribute columnAttribute = Attribute.GetCustomAttribute(property, typeof (ColumnAttribute))
                as ColumnAttribute;
            if (columnAttribute != null)
            {
                string dateTimeFormat = columnAttribute.DateTimeFormat;
                property.SetValue(result,
                    (propertyType == typeof (string)
                        ? valueText
                        : (propertyType == typeof (DateTime) && !string.IsNullOrEmpty(dateTimeFormat)
                            ? DateTime.ParseExact(valueText, dateTimeFormat, CultureInfo.CurrentCulture,
                                DateTimeStyles.None)
                            : propertyType.GetParseMethod().Invoke(propertyType,
                                new object[] {valueText}))),
                    null);
            }
        }

        public static TEnum GetEnumType<TEnum>(this string description, Tuple<TEnum, string>[] list, TEnum defaultValue)
            where TEnum : struct
        {
            var tuple = list.FirstOrDefault(x => x.Item2 == description);
            return tuple?.Item1 ?? defaultValue;
        }

        public static string GetEnumDescription<TEnum>(this TEnum type, Tuple<TEnum, string>[] list,
            string defaultDescription)
            where TEnum : struct
        {
            var tuple = list.FirstOrDefault(x => x.Item1.Equals(type));
            return (tuple != null) ? tuple.Item2 : defaultDescription;
        }
    }

    [AttributeUsage(AttributeTargets.Enum)]
    public class EnumTypeDescriptionAttribute : Attribute
    {
        public Type TupleType { get; private set; }

        public object TupleList { get; private set; }

        public EnumTypeDescriptionAttribute(Type tupleType, object tupleList)
        {
            if (tupleList.GetType() != tupleType)
                throw new ArgumentException("Bad tupleList type");
            TupleType = tupleType;
            TupleList = tupleList;
        }
    }
}
