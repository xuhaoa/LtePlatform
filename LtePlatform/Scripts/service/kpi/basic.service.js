angular.module('kpi.basic', ['myApp.url', 'myApp.url'])
    .factory('kpi2GService', function (generalHttpService) {
        return {
            queryDayStats: function (city, initialDate) {
                return generalHttpService.getApiData('KpiDataList', {
                    city: city,
                    statDate: initialDate
                });
            },
            queryKpiOptions: function () {
                return generalHttpService.getApiData('KpiDataList', {});
            },
            queryKpiTrend: function (city, begin, end) {
                return generalHttpService.getApiData('KpiDataList', {
                    city: city,
                    beginDate: begin,
                    endDate: end
                });
            }
        };
    })
    .factory('drop2GService', function (generalHttpService) {
        return {
            queryDayStats: function (city, initialDate) {
                return generalHttpService.getApiData('TopDrop2G', {
                    city: city,
                    statDate: initialDate
                });
            },
            queryOrderPolicy: function () {
                return generalHttpService.getApiData('TopDrop2G', {});
            },
            queryCellTrend: function (begin, end, city, policy, topCount) {
                return generalHttpService.getApiData('TopDrop2G', {
                    begin: begin,
                    end: end,
                    city: city,
                    policy: policy,
                    topCount: topCount
                });
            }
        }
    })
    .factory('connection3GService', function (generalHttpService) {
        return {
            queryDayStats: function (city, initialDate) {
                return generalHttpService.getApiData('TopConnection3G', {
                    city: city,
                    statDate: initialDate
                });
            },
            queryOrderPolicy: function () {
                return generalHttpService.getApiData('KpiOptions', {
                    key: "OrderTopConnection3GPolicy"
                });
            },
            queryCellTrend: function (begin, end, city, policy, topCount) {
                return generalHttpService.getApiData('TopConnection3G', {
                    begin: begin,
                    end: end,
                    city: city,
                    policy: policy,
                    topCount: topCount
                });
            }
        }
    });