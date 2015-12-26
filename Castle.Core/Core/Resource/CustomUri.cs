// Copyright 2004-2009 Castle Project - http://www.castleproject.org/
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

namespace Castle.Core.Resource
{
	using System;
	using System.Text;

#if FEATURE_SERIALIZATION
	[Serializable]
#endif
	public sealed class CustomUri
	{
		public static readonly string SchemeDelimiter = "://";
		public static readonly string UriSchemeFile = "file";
		public static readonly string UriSchemeAssembly = "assembly";

		private string scheme;
		private string host;
		private string path;
		private bool isUnc;
		private bool isFile;
		private bool isAssembly;

		public CustomUri(string resourceIdentifier)
		{
			if (resourceIdentifier == null)
			{
				throw new ArgumentNullException(nameof(resourceIdentifier));
			}
			if (resourceIdentifier == string.Empty)
			{
				throw new ArgumentException("Empty resource identifier is not allowed", nameof(resourceIdentifier));
			}

			ParseIdentifier(resourceIdentifier);
		}

		public bool IsUnc => isUnc;

	    public bool IsFile => isFile;

	    public bool IsAssembly => isAssembly;

	    public string Scheme => scheme;

	    public string Host => host;

	    public string Path => path;

	    private void ParseIdentifier(string identifier)
		{
			var comma = identifier.IndexOf(':');

			if (comma == -1 && !(identifier[0] == '\\' && identifier[1] == '\\') && identifier[0] != '/')
			{
				throw new ArgumentException("Invalid Uri: no scheme delimiter found on " + identifier);
			}

			var translateSlashes = true;

			if (identifier[0] == '\\' && identifier[1] == '\\')
			{
				// Unc

				isUnc = true;
				isFile = true;
				scheme = UriSchemeFile;
				translateSlashes = false;
			}
			else if (identifier[comma + 1] == '/' && identifier[comma + 2] == '/')
			{
				// Extract scheme

				scheme = identifier.Substring(0, comma);

				isFile = (scheme == UriSchemeFile);
				isAssembly = (scheme == UriSchemeAssembly);

				identifier = identifier.Substring(comma + SchemeDelimiter.Length);
			}
			else
			{
				isFile = true;
				scheme = UriSchemeFile;
			}

			var sb = new StringBuilder();
			foreach(var ch in identifier.ToCharArray())
			{
				if (translateSlashes && (ch == '\\' || ch == '/'))
				{
					if (host == null && !IsFile)
					{
						host = sb.ToString();
						sb.Length = 0;
					}

					sb.Append('/');
				}
				else
				{
					sb.Append(ch);
				}
			}

#if SILVERLIGHT
			path = sb.ToString();
#else
			path = Environment.ExpandEnvironmentVariables(sb.ToString());
#endif
		}
	}
}