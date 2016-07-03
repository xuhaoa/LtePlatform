namespace AutoMapper.Test.Should.Core.Exceptions
{
    public abstract class ComparisonException : AssertException
    {
        public string Left { get; private set; }

        public string Right { get; private set; }

        protected ComparisonException(object left, object right, string methodName, string operation)
            : base(
                $"Assert.{methodName}() Failure:\r\n\tExpected: {Format(right)} {operation} {Format(left)}\r\n\tbut it was not"
                )
        {
            Left = left?.ToString();
            Right = right?.ToString();
        }

        protected ComparisonException(object left, object right, string message) : base(message)
        {
            Left = left?.ToString();
            Right = right?.ToString();
        }

        public static string Format(object value)
        {
            if (value == null)
            {
                return "(null)";
            }
            var type = value.GetType();
            return type == typeof(string) // || type == typeof(DateTime) || type == typeof(DateTime?)
                ? $"\"{value}\""
                : value.ToString();
        }
    }

    /// <summary>Exception thrown when a value is not greater than the expected minimum.</summary>
    public class GreaterThanException : ComparisonException
    {
        /// <summary>Initializes a new instance of the <see cref="GreaterThanException"/> class.</summary>
        /// <param name="left">The value being tested.</param>
        /// <param name="right">The exclusive minimum allowed value.</param>
        public GreaterThanException(object left, object right)
            : base(right, left, "GreaterThan", ">")
        { }

        /// <summary>Initializes a new instance of the <see cref="GreaterThanException"/> class.</summary>
        /// <param name="left">The value being tested.</param>
        /// <param name="right">The exclusive minimum allowed value.</param>
        /// <param name="message"></param>
        public GreaterThanException(object left, object right, string message)
            : base(left, right, message)
        { }
    }

    /// <summary>Exception thrown when a value is not less than or equal to the expected maximum.</summary>
    public class LessThanOrEqualException : ComparisonException
    {
        /// <summary>Initializes a new instance of the <see cref="LessThanOrEqualException"/> class.</summary>
        /// <param name="left">The value being tested.</param>
        /// <param name="right">The exclusive maximum allowed value.</param>
        public LessThanOrEqualException(object left, object right)
            : base(right, left, "LessThanOrEqual", "<=")
        { }

        /// <summary>Initializes a new instance of the <see cref="LessThanOrEqualException"/> class.</summary>
        /// <param name="left">The value being tested.</param>
        /// <param name="right">The exclusive maximum allowed value.</param>
        /// <param name="message"></param>
        public LessThanOrEqualException(object left, object right, string message)
            : base(left, right, message)
        { }
    }

    /// <summary>Exception thrown when a value is not greater than the expected minimum.</summary>
    public class GreaterThanOrEqualException : ComparisonException
    {
        /// <summary>Initializes a new instance of the <see cref="GreaterThanOrEqualException"/> class.</summary>
        /// <param name="left">The value being tested.</param>
        /// <param name="right">The exclusive minimum allowed value.</param>
        public GreaterThanOrEqualException(object left, object right)
            : base(right, left, "GreaterThanOrEqual", ">=")
        { }

        /// <summary>Initializes a new instance of the <see cref="GreaterThanOrEqualException"/> class.</summary>
        /// <param name="left">The value being tested.</param>
        /// <param name="right">The exclusive minimum allowed value.</param>
        public GreaterThanOrEqualException(object left, object right, string message)
            : base(left, right, message)
        { }
    }

    /// <summary>Exception thrown when a value is not less than the expected maximum.</summary>
    public class LessThanException : ComparisonException
    {
        /// <summary>Initializes a new instance of the <see cref="LessThanException"/> class.</summary>
        /// <param name="left">The value being tested.</param>
        /// <param name="right">The exclusive maximum allowed value.</param>
        public LessThanException(object left, object right)
            : base(right, left, "LessThan", "<")
        { }

        /// <summary>Initializes a new instance of the <see cref="LessThanException"/> class.</summary>
        /// <param name="left">The value being tested.</param>
        /// <param name="right">The exclusive maximum allowed value.</param>
        public LessThanException(object left, object right, string message)
            : base(left, right, message)
        { }
    }
}