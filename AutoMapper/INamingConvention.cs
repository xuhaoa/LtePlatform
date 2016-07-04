using System.Text.RegularExpressions;

namespace AutoMapper
{
    /// <summary>
    /// Defines a naming convention strategy
    /// </summary>
	public interface INamingConvention
	{
        /// <summary>
        /// Regular expression on how to tokenize a member
        /// </summary>
		Regex SplittingExpression { get; }

        string SeparatorCharacter { get; }

        string ReplaceValue(Match match);
	}

    public class LowerUnderscoreNamingConvention : INamingConvention
    {
        public Regex SplittingExpression { get; } = new Regex(@"[\p{Ll}\p{Lu}0-9]+(?=_?)");

        public string SeparatorCharacter => "_";

        public string ReplaceValue(Match match)
        {
            return match.Value.ToLower();
        }
    }

    public class PascalCaseNamingConvention : INamingConvention
    {
        public Regex SplittingExpression { get; } = new Regex(@"(\p{Lu}+(?=$|\p{Lu}[\p{Ll}0-9])|\p{Lu}?[\p{Ll}0-9]+)");

        public string SeparatorCharacter => string.Empty;
        public string ReplaceValue(Match match)
        {
            return match.Value[0].ToString().ToUpper() + match.Value.Substring(1);
        }
    }
}