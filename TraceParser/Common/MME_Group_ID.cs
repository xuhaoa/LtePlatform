using Lte.Domain.Common;
using System;

namespace TraceParser.Common
{
    [Serializable]
    public class MME_Group_ID
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
