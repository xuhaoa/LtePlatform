using System;

namespace Lte.Domain.Regular.Attributes
{
    public enum TransformEnum
    {
        Default,
        IntegerDefaultToZero,
        IntegerRemoveDots,
        IntegerRemoveQuotions,
        ByteRemoveQuotions,
        IpAddress,
        DefaultZeroDouble,
        DefaultOpenDate,
        AntiNullAddress,
        NullabelDateTime
    }

    [AttributeUsage(AttributeTargets.Property, Inherited = true, AllowMultiple = false)]
    public sealed class ExcelColumnAttribute : Attribute
    {
        private readonly TransformEnum _transformation;
        private readonly object _defaultValue;

        public ExcelColumnAttribute(string columnName, TransformEnum transformation = TransformEnum.Default,
            object defaultValue = null)
        {
            ColumnName = columnName;
            _transformation = transformation;
            _defaultValue = defaultValue;
        }

        public string ColumnName { get; }

        public Func<string, object> Transformation
        {
            get
            {
                //这里可以根据需要增加我们的转换规则
                switch (_transformation)
                {
                    case TransformEnum.IntegerDefaultToZero:
                        return x => x.ToString().ConvertToInt((int?) _defaultValue ?? 0);
                    case TransformEnum.IntegerRemoveDots:
                        return x => x.ToString().Replace(".", "").ConvertToInt((int?)_defaultValue ?? 0);
                    case TransformEnum.IntegerRemoveQuotions:
                        return x => x.ToString().Replace("'", "").ConvertToInt((int?)_defaultValue ?? 0);
                    case TransformEnum.ByteRemoveQuotions:
                        return x => x.ToString().Replace("'", "").ConvertToByte((byte?)_defaultValue ?? 0);
                    case TransformEnum.IpAddress:
                        return x => new IpAddress(x.ToString());
                    case TransformEnum.DefaultZeroDouble:
                        return x => x.ToString().ConvertToDouble((double?)_defaultValue ?? 0);
                    case TransformEnum.DefaultOpenDate:
                        return x => x.ToString().ConvertToDateTime((DateTime?)_defaultValue ?? DateTime.Today.AddMonths(-1));
                    case TransformEnum.AntiNullAddress:
                        return x => string.IsNullOrEmpty(x.ToString()) ? "请编辑地址" : x.ToString();
                    case TransformEnum.NullabelDateTime:
                        return x => string.IsNullOrEmpty(x) ? (DateTime?)null : x.ConvertToDateTime(DateTime.Now);
                    default:
                        return null;
                }
            }
        }
    }
}
