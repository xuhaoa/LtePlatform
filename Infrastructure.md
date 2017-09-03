# 基础数据设施
主要包括基本数据类型定义、外部数据访问API、ABP数据访问模块改写等。
本部分程序在工程Lte.Domain中。
## 枚举类型定义
由于ORM的出现，数据库支持枚举类型。
我们根据无线通信的业务规则定义了大量的枚举类型。
例如如下的定义：
```C#
    [EnumTypeDescription(typeof(DemandLevel), LevelB)]
    public enum DemandLevel : byte
    {
        LevelA,
        LevelB,
        LevelC
    }
```
>这里定义了一个无线用户需求等级的数据结构，分为A、B、C三个等级。
>EnumTypeDescription特性标签说明这个枚举类型与描述定义有对应关系，其缺省类型是B。
### EnumTypeDescription特性定义
该特性的定义如下：
```C#
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
```
## CSV访问模块
## EXCEL访问模块
## ABP数据访问模块改写
