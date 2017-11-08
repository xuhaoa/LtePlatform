using Lte.Domain.Common.Wireless;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace LtePlatform.Controllers.Kpi
{
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class KpiOptionsController : ApiController
    {
        [HttpGet]
        public IEnumerable<string> Get(string key)
        {
            return WirelessConstants.EnumDictionary.ContainsKey(key)
                ? WirelessConstants.EnumDictionary[key].Select(x => x.Item2)
                : new List<string>();
        }
    }
}
