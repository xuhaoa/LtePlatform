angular.module('region.kpi', ['app.core'])
    .factory('kpiPreciseService',
        function(generalHttpService) {
            return {
                getRecentPreciseRegionKpi: function(city, initialDate) {
                    return generalHttpService.getApiData('PreciseRegion',
                    {
                        city: city,
                        statDate: initialDate
                    });
                },
                getDateSpanPreciseRegionKpi: function(city, beginDate, endDate) {
                    return generalHttpService.getApiData('PreciseRegion',
                    {
                        city: city,
                        begin: beginDate,
                        end: endDate
                    });
                },
                getRecentRrcRegionKpi: function(city, initialDate) {
                    return generalHttpService.getApiData('RrcRegion',
                    {
                        city: city,
                        statDate: initialDate
                    });
                },
                getDateSpanRrcRegionKpi: function(city, beginDate, endDate) {
                    return generalHttpService.getApiData('RrcRegion',
                    {
                        city: city,
                        begin: beginDate,
                        end: endDate
                    });
                },
                getRecentCqiRegionKpi: function (city, initialDate) {
                    return generalHttpService.getApiData('CqiRegion',
                        {
                            city: city,
                            statDate: initialDate
                        });
                },
                getDateSpanCqiRegionKpi: function (city, beginDate, endDate) {
                    return generalHttpService.getApiData('CqiRegion',
                        {
                            city: city,
                            begin: beginDate,
                            end: endDate
                        });
                },
                getDateSpanFlowRegionKpi: function(city, beginDate, endDate, frequency) {
                    return generalHttpService.getApiData('TownFlow',
                    {
                        city: city,
                        begin: beginDate,
                        end: endDate, 
                        frequency: frequency
                    });
                },
                getOrderSelection: function() {
                    return generalHttpService.getApiData('KpiOptions',
                    {
                        key: "OrderPreciseStatPolicy"
                    });
                },
                getHotSpotTypeSelection: function() {
                    return generalHttpService.getApiData('KpiOptions',
                    {
                        key: "HotspotType"
                    });
                },
                queryTopKpis: function(begin, end, topCount, orderSelection) {
                    return generalHttpService.getApiData('PreciseStat',
                    {
                        'begin': begin,
                        'end': end,
                        'topCount': topCount,
                        'orderSelection': orderSelection
                    });
                },
                queryTopKpisInDistrict: function(begin, end, topCount, orderSelection, city, district) {
                    return generalHttpService.getApiData('PreciseStat',
                    {
                        'begin': begin,
                        'end': end,
                        'topCount': topCount,
                        'orderSelection': orderSelection,
                        city: city,
                        district: district
                    });
                },
                queryTopDownSwitchInDistrict: function(begin, end, topCount, city, district) {
                    return generalHttpService.getApiData('TopDownSwitch',
                    {
                        begin: begin,
                        end: end,
                        topCount: topCount,
                        city: city,
                        district: district
                    });
                },
                queryTopRank2InDistrict: function(begin, end, topCount, city, district) {
                    return generalHttpService.getApiData('TopRank2',
                    {
                        begin: begin,
                        end: end,
                        topCount: topCount,
                        city: city,
                        district: district
                    });
                },
                queryTopRrcFailInDistrict: function(begin, end, topCount, city, district) {
                    return generalHttpService.getApiData('TopRrcFail',
                    {
                        begin: begin,
                        end: end,
                        topCount: topCount,
                        city: city,
                        district: district
                    });
                }
            };
        })
    .factory('kpi2GService',
        function(generalHttpService) {
            return {
                queryDayStats: function(city, initialDate) {
                    return generalHttpService.getApiData('KpiDataList',
                    {
                        city: city,
                        statDate: initialDate
                    });
                },
                queryKpiOptions: function() {
                    return generalHttpService.getApiData('KpiDataList', {});
                },
                queryKpiTrend: function(city, begin, end) {
                    return generalHttpService.getApiData('KpiDataList',
                    {
                        city: city,
                        beginDate: begin,
                        endDate: end
                    });
                }
            };
        })
    .factory('drop2GService',
        function(generalHttpService) {
            return {
                queryDayStats: function(city, initialDate) {
                    return generalHttpService.getApiData('TopDrop2G',
                    {
                        city: city,
                        statDate: initialDate
                    });
                },
                queryOrderPolicy: function() {
                    return generalHttpService.getApiData('KpiOptions',
                    {
                        key: "OrderTopDrop2GPolicy"
                    });
                },
                queryCellTrend: function(begin, end, city, policy, topCount) {
                    return generalHttpService.getApiData('TopDrop2G',
                    {
                        begin: begin,
                        end: end,
                        city: city,
                        policy: policy,
                        topCount: topCount
                    });
                }
            }
        })
    .factory('connection3GService',
        function(generalHttpService) {
            return {
                queryDayStats: function(city, initialDate) {
                    return generalHttpService.getApiData('TopConnection3G',
                    {
                        city: city,
                        statDate: initialDate
                    });
                },
                queryOrderPolicy: function() {
                    return generalHttpService.getApiData('KpiOptions',
                    {
                        key: "OrderTopConnection3GPolicy"
                    });
                },
                queryCellTrend: function(begin, end, city, policy, topCount) {
                    return generalHttpService.getApiData('TopConnection3G',
                    {
                        begin: begin,
                        end: end,
                        city: city,
                        policy: policy,
                        topCount: topCount
                    });
                }
            }
        });