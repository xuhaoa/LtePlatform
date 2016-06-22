using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Lte.Domain.Common.Wireless;

namespace LtePlatform.Controllers.Kpi
{
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
