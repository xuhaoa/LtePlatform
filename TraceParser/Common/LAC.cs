using Lte.Domain.Common;
using System;

namespace TraceParser.Common
{
    [Serializable]
    public class LAC
    {
        public class PerDecoder
        {
            public static readonly PerDecoder Instance = new PerDecoder();

            public string Decode(BitArrayInputStream input)
            {
                input.skipUnreadedBits();
                return input.readOctetString(2);
            }
        }
    }

}
