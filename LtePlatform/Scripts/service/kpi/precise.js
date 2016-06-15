angular.module('kpi.precise', ['myApp.url', 'myApp.region'])
    .factory('kpiPreciseService', function(generalHttpService) {
        return {
            getRecentPreciseRegionKpi: function(city, initialDate) {
                return generalHttpService.getApiData('PreciseRegion', {
                    city: city,
                    statDate: initialDate
                });
            },
            getDateSpanPreciseRegionKpi: function(city, beginDate, endDate) {
                return generalHttpService.getApiData('PreciseRegion', {
                    city: city,
                    begin: beginDate,
                    end: endDate
                });
            }
        };
    });