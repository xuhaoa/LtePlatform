namespace AutoMapper.Internal
{
    using System;
    using System.Collections.Generic;
    using System.Reflection;

    public class FieldGetter : MemberGetter
    {
        private readonly FieldInfo _fieldInfo;
        private readonly Lazy<LateBoundFieldGet> _lateBoundFieldGet;

        public FieldGetter(FieldInfo fieldInfo)
        {
            _fieldInfo = fieldInfo;
            Name = fieldInfo.Name;
            MemberType = fieldInfo.FieldType;
            _lateBoundFieldGet = new Lazy<LateBoundFieldGet>(() => DelegateFactory.CreateGet(fieldInfo));
        }

        public override MemberInfo MemberInfo => _fieldInfo;

        public override string Name { get; }

        public override Type MemberType { get; }

        public override object GetValue(object source)
        {
            return _lateBoundFieldGet.Value(source);
        }

        public bool Equals(FieldGetter other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return Equals(other._fieldInfo, _fieldInfo);
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != typeof (FieldGetter)) return false;
            return Equals((FieldGetter) obj);
        }

        public override int GetHashCode()
        {
            return _fieldInfo.GetHashCode();
        }

        public override IEnumerable<object> GetCustomAttributes(Type attributeType, bool inherit)
        {
            return _fieldInfo.GetCustomAttributes(attributeType, inherit);
        }

        public override IEnumerable<object> GetCustomAttributes(bool inherit)
        {
            return _fieldInfo.GetCustomAttributes(inherit);
        }

        public override bool IsDefined(Type attributeType, bool inherit)
        {
            return _fieldInfo.IsDefined(attributeType, inherit);
        }
    }

    public class FieldAccessor : FieldGetter, IMemberAccessor
    {
        private readonly Lazy<LateBoundFieldSet> _lateBoundFieldSet;

        public FieldAccessor(FieldInfo fieldInfo)
            : base(fieldInfo)
        {
            _lateBoundFieldSet = new Lazy<LateBoundFieldSet>(() => DelegateFactory.CreateSet(fieldInfo));
        }

        public void SetValue(object destination, object value)
        {
            _lateBoundFieldSet.Value(destination, value);
        }
    }

    public class ValueTypeFieldAccessor : FieldGetter, IMemberAccessor
    {
        private readonly FieldInfo _lateBoundFieldSet;

        public ValueTypeFieldAccessor(FieldInfo fieldInfo)
            : base(fieldInfo)
        {
            _lateBoundFieldSet = fieldInfo;
        }

        public void SetValue(object destination, object value)
        {
            _lateBoundFieldSet.SetValue(destination, value);
        }
    }

    public class ValueTypePropertyAccessor : PropertyGetter, IMemberAccessor
    {
        private readonly MethodInfo _lateBoundPropertySet;

        public ValueTypePropertyAccessor(PropertyInfo propertyInfo)
            : base(propertyInfo)
        {
            var method = propertyInfo.GetSetMethod(true);
            HasSetter = method != null;
            if (HasSetter)
            {
                _lateBoundPropertySet = method;
            }
        }

        public bool HasSetter { get; }

        public void SetValue(object destination, object value)
        {
            _lateBoundPropertySet.Invoke(destination, new[] { value });
        }
    }
}