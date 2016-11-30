using AutoMapper.Test.Should.Core;
using AutoMapper.Test.Should.Core.Assertions;
using System;

namespace AutoMapper.Test.Should
{
    /// <summary>
    /// Extensions which provide assertions to classes derived from <see cref="Boolean"/>.
    /// </summary>
    public static class DateAssertionExtensions
    {
        /// <summary>
        /// Verifies that two values are equal within a given tolerance.
        /// </summary>
        /// <param name="actual">The value to be compared against</param>
        /// <param name="expected">The expected value</param>
        /// <param name="tolerance">The +/- value for where the expected and actual are considered to be equal</param>
        /// <exception cref="EqualException">Thrown when the objects are not equal</exception>
        public static void ShouldEqual(this DateTime actual, DateTime expected, TimeSpan tolerance)
        {
            CustomizeAssert.Equal(expected, actual, tolerance);
        }
        
        /// <summary>
        /// Verifies that two values are not equal within a given tolerance.
        /// </summary>
        /// <param name="actual">The value to be compared against</param>
        /// <param name="expected">The expected value</param>
        /// <param name="tolerance">The +/- value for where the expected and actual are considered to be equal</param>
        /// <exception cref="EqualException">Thrown when the objects are equal</exception>
        public static void ShouldNotEqual(this DateTime actual, DateTime expected, TimeSpan tolerance)
        {
            CustomizeAssert.NotEqual(expected, actual, tolerance);
        }

        /// <summary>
        /// Verifies that two values are equal within a given tolerance.
        /// </summary>
        /// <param name="actual">The value to be compared against</param>
        /// <param name="expected">The expected value</param>
        /// <param name="precision">The level of precision to use when making the comparison</param>
        /// <exception cref="EqualException">Thrown when the objects are not equal</exception>
        public static void ShouldEqual(this DateTime actual, DateTime expected, DatePrecision precision)
        {
            CustomizeAssert.Equal(expected, actual, precision);
        }

        /// <summary>
        /// Verifies that two values are not equal within a given tolerance.
        /// </summary>
        /// <param name="actual">The value to be compared against</param>
        /// <param name="expected">The expected value</param>
        /// <param name="precision">The level of precision to use when making the comparison</param>
        /// <exception cref="EqualException">Thrown when the objects are equal</exception>
        public static void ShouldNotEqual(this DateTime actual, DateTime expected, DatePrecision precision)
        {
            CustomizeAssert.NotEqual(expected, actual, precision);
        }
    }
}