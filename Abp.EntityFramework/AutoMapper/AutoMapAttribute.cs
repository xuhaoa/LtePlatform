using System;

namespace Abp.EntityFramework.AutoMapper
{
    [Flags]
    public enum AutoMapDirection
    {
        From,
        To
    }

    public class AutoMapAttribute : Attribute
    {
        public Type[] TargetTypes { get; private set; }

        internal virtual AutoMapDirection Direction => AutoMapDirection.From | AutoMapDirection.To;

        public AutoMapAttribute(params Type[] targetTypes)
        {
            TargetTypes = targetTypes;
        }
    }

    [AttributeUsage(AttributeTargets.Class)]
    public class AutoMapFromAttribute : AutoMapAttribute
    {
        internal override AutoMapDirection Direction => AutoMapDirection.From;

        public AutoMapFromAttribute(params Type[] targetTypes)
            : base(targetTypes)
        {

        }
    }

    public class AutoMapToAttribute : AutoMapAttribute
    {
        internal override AutoMapDirection Direction => AutoMapDirection.To;

        public AutoMapToAttribute(params Type[] targetTypes)
            : base(targetTypes)
        {

        }
    }
}