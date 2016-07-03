using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using AutoMapper.Test.Should.Core.Assertions;

namespace AutoMapper.Test.Should.Core.Exceptions
{
    public class AssertException : Exception
    {
        public const string FilterStackTraceAssemblyPrefix = "Should.";

        readonly string stackTrace;
        
        protected AssertException() { }

        protected AssertException(string userMessage)
            : base(userMessage)
        {
            UserMessage = userMessage;
        }
        
        public AssertException(string userMessage, Exception innerException)
            : base(userMessage, innerException) { }
        
        protected AssertException(string userMessage, string stackTrace)
            : base(userMessage)
        {
            this.stackTrace = stackTrace;
        }
        
        public override string StackTrace => FilterStackTrace(stackTrace ?? base.StackTrace);
        
        public string UserMessage { get; protected set; }
        
        protected static string FilterStackTrace(string stackTrace)
        {
            if (stackTrace == null)
                return null;

            return string.Join(Environment.NewLine, (from line in SplitLines(stackTrace)
                let trimmedLine = line.TrimStart()
                where !trimmedLine.StartsWith("at " + FilterStackTraceAssemblyPrefix)
                select line).ToArray());
        }

        // Our own custom String.Split because Silverlight/CoreCLR doesn't support the version we were using
        static IEnumerable<string> SplitLines(string input)
        {
            while (true)
            {
                var idx = input.IndexOf(Environment.NewLine, StringComparison.Ordinal);

                if (idx < 0)
                {
                    yield return input;
                    break;
                }

                yield return input.Substring(0, idx);
                input = input.Substring(idx + Environment.NewLine.Length);
            }
        }
    }

    public class EmptyException : AssertException
    {
        public EmptyException()
            : base("CustomizeAssert.Empty() failure") { }
    }

    public class DoesNotContainException : AssertException
    {
        public DoesNotContainException(object expected)
            : base($"Assert.DoesNotContain() failure: Found: {expected}") { }
    }

    public class ContainsException : AssertException
    {
        public ContainsException(object expected)
            : base($"Assert.Contains() failure: Not found: {expected}") { }
    }

    public class FalseException : AssertException
    {
        public FalseException(string userMessage)
            : base(userMessage ?? "CustomizeAssert.False() Failure") { }
    }

    public class TrueException : AssertException
    {
        public TrueException(string userMessage)
            : base(userMessage ?? "Assert.True() Failure") { }
    }

    /// <summary>
    /// Base class for exceptions that have actual and expected values
    /// </summary>
    public class AssertActualExpectedException : AssertException
    {
        readonly string differencePosition = "";
        
        protected AssertActualExpectedException(object expected,
                                             object actual,
                                             string userMessage,
                                             bool skipPositionCheck = false)
            : base(userMessage)
        {
            if (!skipPositionCheck)
            {
                var enumerableActual = actual as IEnumerable;
                var enumerableExpected = expected as IEnumerable;

                if (enumerableActual != null && enumerableExpected != null)
                {
                    var comparer = new EnumerableEqualityComparer();
                    comparer.Equals(enumerableActual, enumerableExpected);

                    differencePosition = "Position: First difference is at position " + comparer.Position + Environment.NewLine;
                }
            }

            Actual = actual == null ? null : ConvertToString(actual);
            Expected = expected == null ? null : ConvertToString(expected);

            if (actual == null || expected == null || actual.ToString() != expected.ToString() ||
                actual.GetType() == expected.GetType()) return;
            Actual += $" ({actual.GetType().FullName})";
            Expected += $" ({expected.GetType().FullName})";
        }
        
        public string Actual { get; }
        
        public string Expected { get; }
        
        public override string Message => string.Format("{0}{4}{1}Expected: {2}{4}Actual:   {3}",
            base.Message,
            differencePosition,
            FormatMultiLine(Expected ?? "(null)"),
            FormatMultiLine(Actual ?? "(null)"),
            Environment.NewLine);

        static string ConvertToString(object value)
        {
            var valueArray = value as Array;
            if (valueArray == null)
                return value.ToString();

            return value.GetType().FullName + " { " +
                   string.Join(", ",
                       (from object valueObject in valueArray select valueObject?.ToString() ?? "(null)").ToArray()) +
                   " }";
        }

        static string FormatMultiLine(string value)
        {
            return value.Replace(Environment.NewLine, Environment.NewLine + "          ");
        }
    }
    
    public class InRangeException : AssertException
    {
        public InRangeException(object actual,
                                object low,
                                object high)
            : base("CustomizeAssert.InRange() Failure")
        {
            Low = low?.ToString();
            High = high?.ToString();
            Actual = actual?.ToString();
        }
        
        public string Actual { get; }
        
        public string High { get; }
        
        public string Low { get; }
        
        public override string Message => $"{base.Message}\r\nRange:  ({Low} - {High})\r\nActual: {Actual ?? "(null)"}";
    }

    public class TimeoutException : AssertException
    {
        public TimeoutException(long timeout)
            : base($"Test execution time exceeded: {timeout}ms") { }
    }

    public class TraceAssertException : AssertException
    {
        public TraceAssertException(string assertMessage,
                                    string assertDetailedMessage = "")
        {
            AssertMessage = assertMessage ?? "";
            AssertDetailedMessage = assertDetailedMessage ?? "";
        }
        
        public string AssertDetailedMessage { get; }
        
        public string AssertMessage { get; }
        
        public override string Message
        {
            get
            {
                var result = "Debug.CustomizeAssert() Failure";

                if (AssertMessage == "") return result;
                result += " : " + AssertMessage;

                if (AssertDetailedMessage != "")
                    result += Environment.NewLine + "Detailed Message:" + Environment.NewLine + AssertDetailedMessage;

                return result;
            }
        }

        public class StartsWithException : AssertException
        {
            public StartsWithException(object expectedStartString, object actual)
                : base($"Assert.StartsWith() failure: '{expectedStartString}' not found at the beginning of '{actual}'") { }
        }

        public class NotSameException : AssertException
        {
            public NotSameException()
                : base("CustomizeAssert.NotSame() Failure") { }
        }
    }

    public class NotNullException : AssertException
    {
        public NotNullException()
            : this("CustomizeAssert.NotNull() Failure") { }
        
        public NotNullException(string message)
            : base(message) { }
    }

    public class NotInRangeException : AssertException
    {
        public NotInRangeException(object actual,
                                   object low,
                                   object high)
            : base("CustomizeAssert.NotInRange() Failure")
        {
            this.Low = low?.ToString();
            this.High = high?.ToString();
            this.Actual = actual?.ToString();
        }
        
        public string Actual { get; }
        
        public string High { get; }
        
        public string Low { get; }
        
        public override string Message => $"{base.Message}\r\nRange:  ({Low} - {High})\r\nActual: {Actual ?? "(null)"}";
    }

    public class NullException : AssertActualExpectedException
    {
        public NullException(object actual)
            : base(null, actual, "CustomizeAssert.Null() Failure") { }
    }

    public class NotEmptyException : AssertException
    {
        public NotEmptyException()
            : base("CustomizeAssert.NotEmpty() failure") { }
    }

    public class NotEqualException : AssertActualExpectedException
    {
        public NotEqualException(object expected, object actual, string userMessage = "CustomizeAssert.NotEqual() Failure")
            : base(expected, actual, userMessage) { }
    }

    public class IsTypeException : AssertActualExpectedException
    {
        public IsTypeException(Type expected,
                               object actual)
            : base(expected, actual?.GetType(), "CustomizeAssert.IsType() Failure") { }
    }
}