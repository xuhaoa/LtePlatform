using System;
using System.Collections.Generic;
using System.Linq;
using Abp.EntityFramework.Dependency;
using Lte.MySqlFramework.Abstract;
using Lte.MySqlFramework.Entities;

namespace Lte.Evaluations.DataService.Kpi
{
    public class DownSwitchFlowService
    {
        private readonly IAppStreamRepository _streamRepository;
        private readonly IWebBrowsingRepository _browsingRepository;

        public DownSwitchFlowService(IAppStreamRepository streamRepository, IWebBrowsingRepository browsingRepository)
        {
            _streamRepository = streamRepository;
            _browsingRepository = browsingRepository;
        }
        
        public IEnumerable<AppSteam> QueryAppSteams(DateTime initialDate)
        {
            return
                _streamRepository.QueryDate(initialDate,
                    (repository, beginDate, endDate) =>
                        repository.GetAllList(x => x.StatDate >= beginDate && x.StatDate < endDate)).ToList();
        }

        public IEnumerable<WebBrowsing> QueryBrowsings(DateTime initialDate)
        {
            return
                _browsingRepository.QueryDate(initialDate,
                    (repository, beginDate, endDate) =>
                        repository.GetAllList(x => x.StatDate >= beginDate && x.StatDate < endDate)).ToList();
        }
    }
}