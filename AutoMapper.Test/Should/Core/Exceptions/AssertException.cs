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

        /// <summary>
        /// Creates a new instance of the <see href="AssertActualExpectedException"/> class.
        /// </summary>
        /// <param name="expected">The expected value</param>
        /// <param name="actual">The actual value</param>
        /// <param name="userMessage">The user message to be shown</param>
        /// <param name="skipPositionCheck">Set to true to skip the check for difference position</param>
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

        /// <summary>
        /// Gets the actual value.
        /// </summary>
        public string Actual { get; }

        /// <summary>
        /// Gets the expected value.
        /// </summary>
        public string Expected { get; }

        /// <summary>
        /// Gets a message that describes the current exception. Includes the expected and actual values.
        /// </summary>
        /// <returns>The error message that explains the reason for the exception, or an empty string("").</returns>
        /// <filterpriority>1</filterpriority>
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

    /// <summary>
    /// Exception thrown when a value is unexpectedly not in the given range.
    /// </summary>
    public class InRangeException : AssertException
    {
        /// <summary>
        /// Creates a new instance of the <see cref="InRangeException"/> class.
        /// </summary>
        /// <param name="actual">The actual object value</param>
        /// <param name="low">The low value of the range</param>
        /// <param name="high">The high value of the range</param>
        public InRangeException(object actual,
                                object low,
                                object high)
            : base("CustomizeAssert.InRange() Failure")
        {
            this.Low = low?.ToString();
            this.High = high?.ToString();
            this.Actual = actual?.ToString();
        }

        /// <summary>
        /// Gets the actual object value
        /// </summary>
        public string Actual { get; }

        /// <summary>
        /// Gets the high value of the range
        /// </summary>
        public string High { get; }

        /// <summary>
        /// Gets the low value of the range
        /// </summary>
        public string Low { get; }

        /// <summary>
        /// Gets a message that describes the current exception.
        /// </summary>
        /// <returns>The error message that explains the reason for the exception, or an empty string("").</returns>
        public override string Message => $"{base.Message}\r\nRange:  ({Low} - {High})\r\nActual: {Actual ?? "(null)"}";
    }

    public class TimeoutException : AssertException
    {
        public TimeoutException(long timeout)
            : base($"Test execution time exceeded: {timeout}ms") { }
    }

    /// <summary>
    /// Exception that is thrown when a call to Debug.CustomizeAssert() fails.
    /// </summary>
    public class TraceAssertException : AssertException
    {
        /// <summary>
        /// Creates a new instance of the <see cref="TraceAssertException"/> class.
        /// </summary>
        /// <param name="assertMessage">The original assert message</param>
        /// <param name="assertDetailedMessage">The original assert detailed message</param>
        public TraceAssertException(string assertMessage,
                                    string assertDetailedMessage = "")
        {
            this.AssertMessage = assertMessage ?? "";
            this.AssertDetailedMessage = assertDetailedMessage ?? "";
        }

        /// <summary>
        /// Gets the original assert detailed message.
        /// </summary>
        public string AssertDetailedMessage { get; }

        /// <summary>
        /// Gets the original assert message.
        /// </summary>
        public string AssertMessage { get; }

        /// <summary>
        /// Gets a message that describes the current exception.
        /// </summary>
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
}