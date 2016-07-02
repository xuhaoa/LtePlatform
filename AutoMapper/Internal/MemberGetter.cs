
    using System;
    using System.Collections.Generic;
    using System.Reflection;

namespace AutoMapper.Internal
{
    public abstract class MemberGetter : IMemberGetter
    {
        protected static readonly DelegateFactory DelegateFactory = new DelegateFactory();

        public abstract MemberInfo MemberInfo { get; }

        public abstract string Name { get; }

        public abstract Type MemberType { get; }

        public abstract object GetValue(object source);

        public ResolutionResult Resolve(ResolutionResult source)
        {
            return source.Value == null
                ? source.New(source.Value, MemberType)
                : source.New(GetValue(source.Value), MemberType);
        }

        public abstract IEnumerable<object> GetCustomAttributes(Type attributeType, bool inherit);

        public abstract IEnumerable<object> GetCustomAttributes(bool inherit);

        public abstract bool IsDefined(Type attributeType, bool inherit);
    }

    public class MethodGetter : MemberGetter
    {
        private readonly MethodInfo _methodInfo;
        private readonly Type _memberType;
        private readonly Lazy<LateBoundMethod> _lateBoundMethod;

        public MethodGetter(MethodInfo methodInfo)
        {
            _methodInfo = methodInfo;
            Name = _methodInfo.Name;
            _memberType = _methodInfo.ReturnType;
            _lateBoundMethod = new Lazy<LateBoundMethod>(() => DelegateFactory.CreateGet(methodInfo));
        }

        public override MemberInfo MemberInfo => _methodInfo;

        public override string Name { get; }

        public override Type MemberType => _memberType;

        public override object GetValue(object source)
        {
            return _memberType == null
                ? null
                : _lateBoundMethod.Value(source, new object[0]);
        }

        public override IEnumerable<object> GetCustomAttributes(Type attributeType, bool inherit)
        {
            return _methodInfo.GetCustomAttributes(attributeType, inherit);
        }

        public override IEnumerable<object> GetCustomAttributes(bool inherit)
        {
            return _methodInfo.GetCustomAttributes(inherit);
        }

        public override bool IsDefined(Type attributeType, bool inherit)
        {
            return _methodInfo.IsDefined(attributeType, inherit);
        }

        public bool Equals(MethodGetter other)
        {
            if (ReferenceEquals(null, other)) return false;
            return ReferenceEquals(this, other) || Equals(other._methodInfo, _methodInfo);
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == typeof(MethodGetter) && Equals((MethodGetter)obj);
        }

        public override int GetHashCode()
        {
            return _methodInfo.GetHashCode();
        }
    }

    public class PropertyGetter : MemberGetter
    {
        private readonly PropertyInfo _propertyInfo;
        private readonly Lazy<LateBoundPropertyGet> _lateBoundPropertyGet;

        public PropertyGetter(PropertyInfo propertyInfo)
        {
            _propertyInfo = propertyInfo;
            Name = _propertyInfo.Name;
            MemberType = _propertyInfo.PropertyType;
            _lateBoundPropertyGet =
                _propertyInfo.GetGetMethod(true) != null
                ? new Lazy<LateBoundPropertyGet>(() => DelegateFactory.CreateGet(propertyInfo))
                : new Lazy<LateBoundPropertyGet>(() => src => null);
        }

        public override MemberInfo MemberInfo => _propertyInfo;

        public override string Name { get; }

        public override Type MemberType { get; }

        public override object GetValue(object source)
        {
            return _lateBoundPropertyGet.Value(source);
        }

        public override IEnumerable<object> GetCustomAttributes(Type attributeType, bool inherit)
        {
            return _propertyInfo.GetCustomAttributes(attributeType, inherit);
        }

        public override IEnumerable<object> GetCustomAttributes(bool inherit)
        {
            return _propertyInfo.GetCustomAttributes(inherit);
        }

        public override bool IsDefined(Type attributeType, bool inherit)
        {
            return _propertyInfo.IsDefined(attributeType, inherit);
        }

        public bool Equals(PropertyGetter other)
        {
            if (ReferenceEquals(null, other)) return false;
            return ReferenceEquals(this, other) || Equals(other._propertyInfo, _propertyInfo);
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == typeof(PropertyGetter) && Equals((PropertyGetter)obj);
        }

        public override int GetHashCode()
        {
            return _propertyInfo.GetHashCode();
        }
    }

    public class PropertyAccessor : PropertyGetter, IMemberAccessor
    {
        private readonly Lazy<LateBoundPropertySet> _lateBoundPropertySet;

        public PropertyAccessor(PropertyInfo propertyInfo)
            : base(propertyInfo)
        {
            HasSetter = propertyInfo.GetSetMethod(true) != null;
            if (HasSetter)
            {
                _lateBoundPropertySet = new Lazy<LateBoundPropertySet>(() => DelegateFactory.CreateSet(propertyInfo));
            }
        }

        public bool HasSetter { get; }

        public virtual void SetValue(object destination, object value)
        {
            _lateBoundPropertySet.Value(destination, value);
        }
    }
}