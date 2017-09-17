using System;
using Lte.Domain.Common;

namespace Lte.Domain.Regular.Attributes
{
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false)]
    public class ColumnAttribute : Attribute
    {
        public const int McDefaultFieldIndex = int.MaxValue;

        public string Name { get; set; }

        public bool CanBeNull { get; set; }

        public int FieldIndex { get; set; }

        public string DateTimeFormat { get; set; }

        public ColumnAttribute()
        {
            Name = "";

            FieldIndex = McDefaultFieldIndex;

            CanBeNull = true;
        }

        public ColumnAttribute(string name, int fieldIndex, bool canBeNull)
        {
            Name = name;

            FieldIndex = fieldIndex;

            CanBeNull = canBeNull;
        }
    }

    [AttributeUsage(AttributeTargets.Property)]
    public sealed class ArraySumProtectionAttribute : Attribute
    {

    }

    [AttributeUsage(AttributeTargets.Delegate | AttributeTargets.Parameter
                    | AttributeTargets.Field | AttributeTargets.Property | AttributeTargets.Method)]
    public sealed class CanBeNullAttribute : Attribute
    {
    }

    [AttributeUsage(AttributeTargets.Class)]
    public sealed class IncreaseNumberKpiAttribute : Attribute
    {
        public string KpiPrefix { get; set; } = "Kpi";

        public string KpiAffix { get; set; } = "";

        public int IndexRange { get; set; } = 1;
    }

    [AttributeUsage(AttributeTargets.Class)]
    internal sealed class MeansImplicitUseAttribute : Attribute
    {
        [UsedImplicitly]
        public MeansImplicitUseAttribute()
            : this(ImplicitUseKindFlags.Default)
        {
        }

        [UsedImplicitly]
        public MeansImplicitUseAttribute(ImplicitUseTargetFlags targetFlags)
            : this(ImplicitUseKindFlags.Default, targetFlags)
        {
        }

        [UsedImplicitly]
        public MeansImplicitUseAttribute(ImplicitUseKindFlags useKindFlags,
            ImplicitUseTargetFlags targetFlags = ImplicitUseTargetFlags.Default)
        {
            UseKindFlags = useKindFlags;
            TargetFlags = targetFlags;
        }

        [UsedImplicitly]
        public ImplicitUseTargetFlags TargetFlags { get; private set; }

        [UsedImplicitly]
        public ImplicitUseKindFlags UseKindFlags { get; private set; }
    }

    [AttributeUsage(AttributeTargets.Delegate | AttributeTargets.Parameter | AttributeTargets.Field
                    | AttributeTargets.Property | AttributeTargets.Method)]
    public sealed class NotNullAttribute : Attribute
    {
    }

    [AttributeUsage(AttributeTargets.All)]
    internal sealed class UsedImplicitlyAttribute : Attribute
    {
        [UsedImplicitly]
        public UsedImplicitlyAttribute()
            : this(ImplicitUseKindFlags.Default)
        {
        }

        [UsedImplicitly]
        public UsedImplicitlyAttribute(ImplicitUseTargetFlags targetFlags)
            : this(ImplicitUseKindFlags.Default, targetFlags)
        {
        }

        [UsedImplicitly]
        public UsedImplicitlyAttribute(ImplicitUseKindFlags useKindFlags,
            ImplicitUseTargetFlags targetFlags = ImplicitUseTargetFlags.Default)
        {
            UseKindFlags = useKindFlags;
            TargetFlags = targetFlags;
        }

        [UsedImplicitly]
        public ImplicitUseTargetFlags TargetFlags { get; private set; }

        [UsedImplicitly]
        public ImplicitUseKindFlags UseKindFlags { get; private set; }
    }

    [Flags]
    internal enum ImplicitUseTargetFlags
    {
        Default = 1,
        Itself = 1,
        Members = 2,
        WithMembers = 3
    }

    [Flags]
    internal enum ImplicitUseKindFlags
    {
        Access = 1,
        Assign = 2,
        Default = 7,
        InstantiatedNoFixedConstructorSignature = 8,
        InstantiatedWithFixedConstructorSignature = 4
    }
}
