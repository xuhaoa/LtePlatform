using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TraceParser.Common
{
    public class TraceResultList
    {
        public List<TraceConfig> Messages { get; } = new List<TraceConfig>();

        public TraceResultList()
        {
            FailCounts = 0;
        }

        public int FailCounts { get; set; }
    }
}
