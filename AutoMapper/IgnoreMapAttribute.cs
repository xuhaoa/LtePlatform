namespace AutoMapper
{
    using System;

    /// <summary>
    /// 映射时忽略这个字段
    /// </summary>
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
    public class IgnoreMapAttribute : Attribute
    {
    }
}