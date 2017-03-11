angular.module('myApp.kpi', ['myApp.url', 'myApp.region', "ui.bootstrap"])
    .factory('downSwitchService', function (generalHttpService) {
        return {
            getRecentKpi: function (city, initialDate) {
                return generalHttpService.getApiData('DownSwitchFlow', {
                    city: city,
                    statDate: initialDate
                });
            }
        };
    })
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
                return generalHttpService.getApiData('KpiOptions', {
                    key: "OrderTopDrop2GPolicy"
                });
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
    })
    .factory('preciseImportService', function (generalHttpService) {
        return {
            queryDumpHistroy: function (beginDate, endDate) {
                return generalHttpService.getApiData('PreciseImport', {
                    begin: beginDate,
                    end: endDate
                });
            },
            queryTotalDumpItems: function () {
                return generalHttpService.getApiData('PreciseImport', {});
            },
            queryTownPreciseViews: function (statTime) {
                return generalHttpService.getApiData('TownPreciseImport', {
                    statTime: statTime
                });
            },
            clearImportItems: function () {
                return generalHttpService.deleteApiData('PreciseImport', {});
            },
            dumpTownItems: function (views) {
                return generalHttpService.postApiData('TownPreciseImport', {
                    views: views
                });
            },
            dumpSingleItem: function () {
                return generalHttpService.putApiData('PreciseImport', {});
            },
            updateMongoItems: function(statDate) {
                return generalHttpService.getApiData('PreciseMongo', {
                    statDate: statDate
                })
            }
        };
    })
    .factory('cellPreciseService', function (generalHttpService) {
        return {
            queryDataSpanKpi: function (begin, end, cellId, sectorId) {
                return generalHttpService.getApiData('PreciseStat', {
                    'begin': begin,
                    'end': end,
                    'cellId': cellId,
                    'sectorId': sectorId
                });
            },
            queryOneWeekKpi: function (cellId, sectorId) {
                return generalHttpService.getApiData('PreciseStat', {
                    'cellId': cellId,
                    'sectorId': sectorId
                });
            }
        };
    })
    .factory('appRegionService', function (generalHttpService) {
        return {
            initializeCities: function () {
                return generalHttpService.getApiData('CityList', {});
            },
            queryDistricts: function (cityName) {
                return generalHttpService.getApiData('CityList', {
                    city: cityName
                });
            },
            queryDistrictInfrastructures: function (cityName) {
                return generalHttpService.getApiData('RegionStats', {
                    city: cityName
                });
            },
            queryTowns: function (cityName, districtName) {
                return generalHttpService.getApiData('CityList', {
                    city: cityName,
                    district: districtName
                });
            },
            queryTownInfrastructures: function (cityName, districtName) {
                return generalHttpService.getApiData('RegionStats', {
                    city: cityName,
                    district: districtName
                });
            },
            queryTown: function (city, district, town) {
                return generalHttpService.getApiData('Town', {
                    city: city,
                    district: district,
                    town: town
                });
            },
            queryENodebTown: function (eNodebId) {
                return generalHttpService.getApiData('Town', {
                    eNodebId: eNodebId
                });
            },
            accumulateCityStat: function (stats, cityName) {
                var cityStat = {
                    district: cityName,
                    totalLteENodebs: 0,
                    totalLteCells: 0,
                    totalCdmaBts: 0,
                    totalCdmaCells: 0
                };
                angular.forEach(stats, function (stat) {
                    cityStat.totalLteENodebs += stat.totalLteENodebs;
                    cityStat.totalLteCells += stat.totalLteCells;
                    cityStat.totalCdmaBts += stat.totalCdmaBts;
                    cityStat.totalCdmaCells += stat.totalCdmaCells;
                });
                stats.push(cityStat);
            },
            getTownFlowStats: function (statDate) {
                return generalHttpService.getApiData('TownFlow', {
                    statDate: statDate
                });
            }
        };
    })
    .controller('workitem.feedback.dialog', function ($scope, $uibModalInstance, input, dialogTitle) {
        $scope.item = input;
        $scope.dialogTitle = dialogTitle;
        $scope.message = "";

        $scope.ok = function () {
            $uibModalInstance.close($scope.message);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('workitem.details.dialog', function ($scope, $uibModalInstance, input, dialogTitle, workItemDialog) {
        $scope.currentView = input;
        $scope.dialogTitle = dialogTitle;
        $scope.message = "";
        $scope.platformInfos = workItemDialog.calculatePlatformInfo($scope.currentView.comments);
        $scope.feedbackInfos = workItemDialog.calculatePlatformInfo($scope.currentView.feedbackContents);
        $scope.preventChangeParentView = true;

        $scope.ok = function () {
            $uibModalInstance.close($scope.message);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .factory('workitemService', function (generalHttpService) {
        return {
            queryWithPaging: function (state, type) {
                return generalHttpService.getApiDataWithHeading('WorkItem', {
                    'statCondition': state,
                    'typeCondition': type
                });
            },
            queryWithPagingByDistrict: function (state, type, district) {
                return generalHttpService.getApiDataWithHeading('WorkItem', {
                    statCondition: state,
                    typeCondition: type,
                    district: district
                });
            },
            querySingleItem: function (serialNumber) {
                return generalHttpService.getApiData('WorkItem', {
                    serialNumber: serialNumber
                });
            },
            signIn: function (serialNumber) {
                return generalHttpService.getApiDataWithHeading('WorkItem', {
                    signinNumber: serialNumber
                });
            },
            queryChartData: function (chartType) {
                return generalHttpService.getApiDataWithHeading('WorkItem', {
                    chartType: chartType
                });
            },
            updateSectorIds: function () {
                return generalHttpService.putApiData('WorkItem', {});
            },
            feedback: function (message, serialNumber) {
                return generalHttpService.postApiDataWithHeading('WorkItem', {
                    message: message,
                    serialNumber: serialNumber
                });
            },
            finish: function (comments, finishNumber) {
                return generalHttpService.getApiDataWithHeading('WorkItem', {
                    finishNumber: finishNumber,
                    comments: comments
                });
            },
            queryByENodebId: function (eNodebId) {
                return generalHttpService.getApiDataWithHeading('WorkItem', {
                    eNodebId: eNodebId
                });
            },
            queryByCellId: function (eNodebId, sectorId) {
                return generalHttpService.getApiDataWithHeading('WorkItem', {
                    eNodebId: eNodebId,
                    sectorId: sectorId
                });
            },
            queryCurrentMonth: function () {
                return generalHttpService.getApiData('WorkItemCurrentMonth', {});
            },
            constructPreciseItem: function (cell, begin, end) {
                return generalHttpService.postApiDataWithHeading('PreciseWorkItem', {
                    view: cell,
                    begin: begin,
                    end: end
                });
            }
        };
    })
    .factory('dumpWorkItemService', function (generalHttpService) {
        return {
            dumpSingleItem: function () {
                return generalHttpService.putApiData('DumpWorkItem', {});
            },
            clearImportItems: function () {
                return generalHttpService.deleteApiData('DumpWorkItem');
            },
            queryTotalDumpItems: function () {
                return generalHttpService.getApiData('DumpWorkItem', {});
            }
        };
    })
    .factory('preciseWorkItemService', function (generalHttpService) {
        return {
            queryByDateSpanDistrict: function (begin, end, district) {
                return generalHttpService.getApiData('PreciseWorkItem', {
                    begin: begin,
                    end: end,
                    district: district
                });
            },
            queryByDateSpan: function (begin, end) {
                return generalHttpService.getApiData('PreciseWorkItem', {
                    begin: begin,
                    end: end
                });
            },
            queryBySerial: function (number) {
                return generalHttpService.getApiDataWithHeading('PreciseWorkItem', {
                    number: number
                });
            },
            updateInterferenceNeighbor: function (number, items) {
                return generalHttpService.postApiDataWithHeading('InterferenceNeighborWorkItem', {
                    workItemNumber: number,
                    items: items
                });
            },
            updateInterferenceVictim: function (number, items) {
                return generalHttpService.postApiDataWithHeading('InterferenceVictimWorkItem', {
                    workItemNumber: number,
                    items: items
                });
            },
            updateCoverage: function (number, items) {
                return generalHttpService.postApiDataWithHeading('CoverageWorkItem', {
                    workItemNumber: number,
                    items: items
                });
            }
        };
    })

    .controller("eNodeb.flow", function ($scope, $uibModalInstance, eNodeb, beginDate, endDate,
        networkElementService, appKpiService, kpiChartService) {
        $scope.eNodebName = eNodeb.name;
        $scope.flowStats = [];
        $scope.mergeStats = [];
        $scope.queryFlow = function() {
            appKpiService.calculateFlowStats($scope.cellList, $scope.flowStats, $scope.mergeStats, $scope.beginDate, $scope.endDate);
        };

        $scope.showCharts = function() {
            kpiChartService.showFlowCharts($scope.flowStats, $scope.eNodebName, $scope.mergeStats);
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.cellList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        networkElementService.queryCellViewsInOneENodeb(eNodeb.eNodebId).then(function (result) {
            $scope.cellList = result;
            $scope.queryFlow();
        });
    })
    .controller("hotSpot.flow", function ($scope, $uibModalInstance, hotSpot, beginDate, endDate,
        basicImportService, appKpiService, kpiChartService) {
        $scope.eNodebName = hotSpot.hotspotName;
        $scope.flowStats = [];
        $scope.mergeStats = [];
        $scope.queryFlow = function () {
            appKpiService.calculateFlowStats($scope.cellList, $scope.flowStats, $scope.mergeStats, $scope.beginDate, $scope.endDate);
        };

        $scope.showCharts = function () {
            kpiChartService.showFlowCharts($scope.flowStats, $scope.eNodebName, $scope.mergeStats);
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.cellList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        basicImportService.queryHotSpotCells(hotSpot.hotspotName).then(function (result) {
            $scope.cellList = result;
            $scope.queryFlow();
        });
    })

    .controller("rutrace.chart", function ($scope, $uibModalInstance, $timeout,
        dateString, districtStats, townStats, appKpiService) {
        $scope.dialogTitle = dateString + "精确覆盖率指标";
        $scope.showCharts = function () {
            $("#leftChart").highcharts(appKpiService.getMrPieOptions(districtStats.slice(0, districtStats.length - 1), townStats));
            $("#rightChart").highcharts(appKpiService.getPreciseRateOptions(districtStats, townStats));
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.cellList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $timeout(function () {
            $scope.showCharts();
        }, 500);
    })
    .controller('basic.kpi.trend', function ($scope, $uibModalInstance, city, beginDate, endDate, kpi2GService, kpiDisplayService) {
        $scope.dialogTitle = "指标变化趋势-" + city;
        $scope.beginDate = beginDate;
        $scope.endDate = endDate;

        kpi2GService.queryKpiOptions().then(function (result) {
            $scope.kpi = {
                options: result,
                selected: result[0]
            };
        });

        $scope.$watch('kpi.options', function (options) {
            if (options && options.length) {
                $scope.showTrend();
            }
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.kpi);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showTrend = function () {
            kpi2GService.queryKpiTrend(city, $scope.beginDate.value, $scope.endDate.value).then(function (data) {
                angular.forEach($scope.kpi.options, function (option, $index) {
                    $("#kpi-" + $index).highcharts(kpiDisplayService.generateComboChartOptions(data, option, city));
                });
            });
        };
    })

    .controller("rutrace.trend.dialog", function ($scope, $uibModalInstance, trendStat, city, beginDate, endDate,
        appKpiService, kpiPreciseService, appFormatService) {
        $scope.trendStat = trendStat;
        $scope.city = city;
        $scope.beginDate = beginDate;
        $scope.endDate = endDate;
        $scope.dialogTitle = "精确覆盖率变化趋势";
        $scope.showCharts = function () {
            $("#mr-pie").highcharts(appKpiService.getMrPieOptions($scope.trendStat.districtStats,
                $scope.trendStat.townStats));
            $("#precise").highcharts(appKpiService.getPreciseRateOptions($scope.trendStat.districtStats,
                $scope.trendStat.townStats));
            $("#time-mr").highcharts(appKpiService.getMrsDistrictOptions($scope.trendStat.stats,
                $scope.trendStat.districts));
            $("#time-precise").highcharts(appKpiService.getPreciseDistrictOptions($scope.trendStat.stats,
                $scope.trendStat.districts));
        };
        $scope.ok = function () {
            $uibModalInstance.close($scope.trendStat);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        kpiPreciseService.getDateSpanPreciseRegionKpi($scope.city.selected, $scope.beginDate.value, $scope.endDate.value)
            .then(function(result) {
                $scope.trendStat.stats = appKpiService.generateDistrictStats($scope.trendStat.districts, result);
                if (result.length > 0) {
                    appKpiService.generateTrendStatsForPie($scope.trendStat, result);
                    $scope.trendStat.stats.push(appKpiService.calculateAverageRates($scope.trendStat.stats));
                }
                $scope.trendStat.beginDateString = appFormatService.getDateString($scope.beginDate.value, "yyyy年MM月dd日");
                $scope.trendStat.endDateString = appFormatService.getDateString($scope.endDate.value, "yyyy年MM月dd日");
                $scope.showCharts();
            });

    })

    .controller('kpi.topConnection3G.trend', function ($scope, $uibModalInstance, city, beginDate, endDate, topCount,
        appRegionService, appFormatService, connection3GService) {
        $scope.dialogTitle = "TOP连接变化趋势-" + city;
        $scope.beginDate = beginDate;
        $scope.endDate = endDate;
        $scope.topCount = topCount;
        $scope.showTrend = function () {
            connection3GService.queryCellTrend($scope.beginDate.value, $scope.endDate.value, city,
                $scope.orderPolicy.selected, $scope.topCount.selected).then(function (result) {
                    $scope.trendCells = result;
                });
        };
        $scope.ok = function () {
            $uibModalInstance.close($scope.trendStat);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        connection3GService.queryOrderPolicy().then(function (result) {
            $scope.orderPolicy = {
                options: result,
                selected: result[0]
            }
            $scope.showTrend();
        });
    })
    .controller('kpi.topDrop2G.trend', function ($scope, $uibModalInstance, city, beginDate, endDate, topCount,
        appRegionService, appFormatService, drop2GService) {
        $scope.dialogTitle = "TOP掉话变化趋势-" + city;
        $scope.beginDate = beginDate;
        $scope.endDate = endDate;
        $scope.topCount = topCount;
        $scope.ok = function () {
            $uibModalInstance.close($scope.trendStat);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showTrend = function () {
            drop2GService.queryCellTrend($scope.beginDate.value, $scope.endDate.value, city,
                $scope.orderPolicy.selected, $scope.topCount.selected).then(function (result) {
                    $scope.trendCells = result;
                });
        };
        drop2GService.queryOrderPolicy().then(function (result) {
            $scope.orderPolicy = {
                options: result,
                selected: result[0]
            }
            $scope.showTrend();
        });
    })
    .factory('workItemDialog', function ($uibModal, $log, workitemService) {
        return {
            feedback: function (view, callbackFunc) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/WorkItem/FeedbackDialog.html',
                    controller: 'workitem.feedback.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return view.serialNumber + "工单反馈";
                        },
                        input: function () {
                            return view;
                        }
                    }
                });

                modalInstance.result.then(function (output) {
                    workitemService.feedback(output, view.serialNumber).then(function (result) {
                        if (result && callbackFunc)
                            callbackFunc();
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showDetails: function (view, callbackFunc) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/WorkItem/DetailsDialog.html',
                    controller: 'workitem.details.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return view.serialNumber + "工单信息";
                        },
                        input: function () {
                            return view;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    if (callbackFunc) callbackFunc();
                }, function () {
                    if (callbackFunc) callbackFunc();
                });
            },
            showENodebFlow: function (eNodeb, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Parameters/Region/ENodebFlow.html',
                    controller: 'eNodeb.flow',
                    size: 'lg',
                    resolve: {
                        eNodeb: function () {
                            return eNodeb;
                        },
                        beginDate: function() {
                            return beginDate;
                        },
                        endDate: function() {
                            return endDate;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                });
            },
            showHotSpotFlow: function (hotSpot, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Parameters/Region/ENodebFlow.html',
                    controller: 'hotSpot.flow',
                    size: 'lg',
                    resolve: {
                        hotSpot: function () {
                            return hotSpot;
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                });
            },
            showPreciseChart: function (overallStat) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'rutrace.chart',
                    size: 'lg',
                    resolve: {
                        dateString: function () {
                            return overallStat.dateString;
                        },
                        districtStats: function () {
                            return overallStat.districtStats;
                        },
                        townStats: function () {
                            return overallStat.townStats;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                });
            },
            showPreciseTrend: function (trendStat, city, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Coverage/Trend.html',
                    controller: 'rutrace.trend.dialog',
                    size: 'lg',
                    resolve: {
                        trendStat: function () {
                            return trendStat;
                        },
                        city: function () {
                            return city;
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                });
            },
            showBasicTrend: function (city, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/BasicKpi/Trend.html',
                    controller: 'basic.kpi.trend',
                    size: 'lg',
                    resolve: {
                        city: function () {
                            return city;
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                });
            },

            showTopDropTrend: function (city, beginDate, endDate, topCount) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/BasicKpi/TopDrop2GTrend.html',
                    controller: 'kpi.topDrop2G.trend',
                    size: 'lg',
                    resolve: {
                        city: function () {
                            return city;
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        },
                        topCount: function() {
                            return topCount;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                });
            },

            showTopConnectionTrend: function (city, beginDate, endDate, topCount) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/BasicKpi/TopConnection3GTrend.html',
                    controller: 'kpi.topConnection3G.trend',
                    size: 'lg',
                    resolve: {
                        city: function () {
                            return city;
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        },
                        topCount: function () {
                            return topCount;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                });
            },

            calculatePlatformInfo: function (comments) {
                var platformInfos = [];
                if (comments) {
                    var fields = comments.split('[');
                    if (fields.length > 1) {
                        angular.forEach(fields, function (field) {
                            var subFields = field.split(']');
                            platformInfos.push({
                                time: subFields[0],
                                contents: subFields[1]
                            });
                        });
                    }
                }

                return platformInfos;
            }
        };
    })
    .factory('preciseWorkItemGenerator', function () {
        return {
            generatePreciseInterferenceNeighborDtos: function (sources) {
                var sumDb6Share = 0;
                var sumDb10Share = 0;
                var sumMod3Share = 0;
                var sumMod6Share = 0;
                var dtos = [];
                angular.forEach(sources, function (source) {
                    sumDb6Share += source.overInterferences6Db;
                    sumDb10Share += source.overInterferences10Db;
                    sumMod3Share += source.mod3Interferences;
                    sumMod6Share += source.mod6Interferences;
                });
                angular.forEach(sources, function (source) {
                    if (source.destENodebId > 0 && source.destSectorId > 0) {
                        var db6Share = source.overInterferences6Db * 100 / sumDb6Share;
                        var db10Share = source.overInterferences10Db * 100 / sumDb10Share;
                        var mod3Share = source.mod3Interferences * 100 / sumMod3Share;
                        var mod6Share = source.mod6Interferences * 100 / sumMod6Share;
                        if (db6Share > 10 || db10Share > 10 || mod3Share > 10 || mod6Share > 10) {
                            dtos.push({
                                eNodebId: source.destENodebId,
                                sectorId: source.destSectorId,
                                db6Share: db6Share,
                                db10Share: db10Share,
                                mod3Share: mod3Share,
                                mod6Share: mod6Share
                            });
                        }
                    }
                });
                return dtos;
            },
            generatePreciseInterferenceVictimDtos: function (sources) {
                var sumBackwardDb6Share = 0;
                var sumBackwardDb10Share = 0;
                var sumBackwardMod3Share = 0;
                var sumBackwardMod6Share = 0;
                var dtos = [];
                angular.forEach(sources, function (source) {
                    sumBackwardDb6Share += source.overInterferences6Db;
                    sumBackwardDb10Share += source.overInterferences10Db;
                    sumBackwardMod3Share += source.mod3Interferences;
                    sumBackwardMod6Share += source.mod6Interferences;
                });
                angular.forEach(sources, function (source) {
                    if (source.victimENodebId > 0 && source.victimSectorId > 0) {
                        var db6Share = source.overInterferences6Db * 100 / sumBackwardDb6Share;
                        var db10Share = source.overInterferences10Db * 100 / sumBackwardDb10Share;
                        var mod3Share = source.mod3Interferences * 100 / sumBackwardMod3Share;
                        var mod6Share = source.mod6Interferences * 100 / sumBackwardMod6Share;
                        if (db6Share > 10 || db10Share > 10 || mod3Share > 10 || mod6Share > 10) {
                            dtos.push({
                                eNodebId: source.victimENodebId,
                                sectorId: source.victimSectorId,
                                backwardDb6Share: db6Share,
                                backwardDb10Share: db10Share,
                                backwardMod3Share: mod3Share,
                                backwardMod6Share: mod6Share
                            });
                        }
                    }
                });
                return dtos;
            }
        };
    })
    .factory('cellHuaweiMongoService', function (generalHttpService) {
        return {
            queryCellParameters: function (eNodebId, sectorId) {
                return generalHttpService.getApiData('CellHuaweiMongo', {
                    eNodebId: eNodebId,
                    sectorId: sectorId
                });
            },
            queryLocalCellDef: function (eNodebId) {
                return generalHttpService.getApiData('CellHuaweiMongo', {
                    eNodebId: eNodebId
                });
            }
        };
    })
     .factory('cellPowerService', function (generalHttpService) {
         return {
             queryCellParameters: function (eNodebId, sectorId) {
                 return generalHttpService.getApiData('CellPower', {
                     eNodebId: eNodebId,
                     sectorId: sectorId
                 });
             },
             queryUlOpenLoopPowerControll: function (eNodebId, sectorId) {
                 return generalHttpService.getApiData('UplinkOpenLoopPowerControl', {
                     eNodebId: eNodebId,
                     sectorId: sectorId
                 });
             }
         };
     })

    .factory('intraFreqHoService', function (generalHttpService) {
        return {
            queryENodebParameters: function (eNodebId) {
                return generalHttpService.getApiData('IntraFreqHo', {
                    eNodebId: eNodebId
                });
            },
            queryCellParameters: function (eNodebId, sectorId) {
                return generalHttpService.getApiData('IntraFreqHo', {
                    eNodebId: eNodebId,
                    sectorId: sectorId
                });
            }
        };
    })
    .factory('interFreqHoService', function (generalHttpService) {
        return {
            queryENodebParameters: function (eNodebId) {
                return generalHttpService.getApiData('InterFreqHo', {
                    eNodebId: eNodebId
                });
            },
            queryCellParameters: function (eNodebId, sectorId) {
                return generalHttpService.getApiData('InterFreqHo', {
                    eNodebId: eNodebId,
                    sectorId: sectorId
                });
            }
        };
    })
    .controller('dump.cell.mongo', function ($scope, $uibModalInstance,
        dumpProgress, appFormatService, dumpPreciseService, neighborMongoService,
        preciseInterferenceService, networkElementService,
        dialogTitle, cell, begin, end) {
        $scope.dialogTitle = dialogTitle;

        $scope.dateRecords = [];
        $scope.currentDetails = [];
        $scope.currentIndex = 0;

        $scope.ok = function () {
            $uibModalInstance.close($scope.dateRecords);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.queryRecords = function () {
            $scope.mrsRsrpStats = [];
            $scope.mrsTaStats = [];
            angular.forEach($scope.dateRecords, function (record) {
                dumpProgress.queryExistedItems(cell.eNodebId, cell.sectorId, record.date).then(function (result) {
                    record.existedRecords = result;
                });
                dumpProgress.queryMongoItems(cell.eNodebId, cell.sectorId, record.date).then(function (result) {
                    record.mongoRecords = result;
                });
                dumpProgress.queryMrsRsrpItem(cell.eNodebId, cell.sectorId, record.date).then(function (result) {
                    record.mrsRsrpStats = result;
                    if (result) {
                        $scope.mrsRsrpStats.push({
                            statDate: result.statDate,
                            data: _.map(_.range(48), function (index) {
                                return result['rsrP_' + appFormatService.prefixInteger(index, 2)];
                            })
                        });
                    }

                });
                dumpProgress.queryMrsTadvItem(cell.eNodebId, cell.sectorId, record.date).then(function (result) {
                    record.mrsTaStats = result;
                    if (result) {
                        $scope.mrsTaStats.push({
                            statDate: result.statDate,
                            data: _.map(_.range(44), function (index) {
                                return result['tadv_' + appFormatService.prefixInteger(index, 2)];
                            })
                        });
                    }

                });
                dumpProgress.queryMrsPhrItem(cell.eNodebId, cell.sectorId, record.date).then(function (result) {
                    //console.log(result['powerHeadRoom_00']);
                    record.mrsPhrStats = result;
                });
                dumpProgress.queryMrsTadvRsrpItem(cell.eNodebId, cell.sectorId, record.date).then(function (result) {
                    //console.log(result['tadv00Rsrp00']);
                    record.mrsTaRsrpStats = result;
                });
            });
        };

        $scope.updateDetails = function (index) {
            $scope.currentIndex = index % $scope.dateRecords.length;
        };

        $scope.dumpAllRecords = function () {
            dumpPreciseService.dumpAllRecords($scope.dateRecords, 0, 0, cell.eNodebId, cell.sectorId, $scope.queryRecords);
        };

        $scope.showNeighbors = function () {
            $scope.neighborCells = [];
            networkElementService.queryCellNeighbors(cell.eNodebId, cell.sectorId).then(function (result) {
                $scope.neighborCells = result;
                angular.forEach(result, function (neighbor) {
                    preciseInterferenceService.queryMonitor(neighbor.cellId, neighbor.sectorId).then(function (monitored) {
                        neighbor.isMonitored = monitored;
                    });
                });
            });

        };
        $scope.showReverseNeighbors = function () {
            neighborMongoService.queryReverseNeighbors(cell.eNodebId, cell.sectorId).then(function (result) {
                $scope.reverseCells = result;
                angular.forEach(result, function (neighbor) {
                    networkElementService.queryENodebInfo(neighbor.cellId).then(function (info) {
                        neighbor.eNodebName = info.name;
                    });
                    preciseInterferenceService.queryMonitor(neighbor.cellId, neighbor.sectorId).then(function (monitored) {
                        neighbor.isMonitored = monitored;
                    });
                });
            });
        }
        $scope.updatePci = function () {
            networkElementService.updateCellPci(cell).then(function (result) {
                $scope.updateMessages.push({
                    cellName: cell.name + '-' + cell.sectorId,
                    counts: result
                });
                $scope.showNeighbors();
            });
        };
        $scope.synchronizeNeighbors = function () {
            var count = 0;
            neighborMongoService.queryNeighbors(cell.eNodebId, cell.sectorId).then(function (neighbors) {
                angular.forEach(neighbors, function (neighbor) {
                    if (neighbor.neighborCellId > 0 && neighbor.neighborPci > 0) {
                        networkElementService.updateNeighbors(neighbor.cellId, neighbor.sectorId, neighbor.neighborPci,
                            neighbor.neighborCellId, neighbor.neighborSectorId).then(function () {
                                count += 1;
                                if (count === neighbors.length) {
                                    $scope.updateMessages.push({
                                        cellName: $scope.currentCellName,
                                        counts: count
                                    });
                                    $scope.showNeighbors();
                                }
                            });
                    } else {
                        count += 1;
                        if (count === neighbors.length) {
                            $scope.updateMessages.push({
                                cellName: $scope.currentCellName,
                                counts: count
                            });
                            $scope.showNeighbors();
                        }
                    }
                });
            });
        };
        $scope.addMonitor = function () {
            preciseInterferenceService.addMonitor({
                cellId: cell.eNodebId,
                sectorId: cell.sectorId
            });
        };
        $scope.monitorNeighbors = function () {
            angular.forEach($scope.neighborCells, function (neighbor) {
                if (neighbor.isMonitored === false) {
                    networkElementService.monitorNeighbors(neighbor).then(function () {
                        neighbor.isMonitored = true;
                    });
                }
            });
            angular.forEach($scope.reverseCells, function (reverse) {
                if (reverse.isMonitored === false) {
                    networkElementService.monitorNeighbors({
                        nearestCellId: reverse.cellId,
                        nearestSectorId: reverse.sectorId
                    }).then(function () {
                        reverse.isMonitored = true;
                    });
                }
            });
        };

        var startDate = new Date(begin);
        while (startDate < end) {
            var date = new Date(startDate);
            $scope.dateRecords.push({
                date: date,
                existedRecords: 0,
                existedStat: false
            });
            startDate.setDate(date.getDate() + 1);
        }
        $scope.neighborCells = [];
        $scope.updateMessages = [];
        preciseInterferenceService.queryMonitor(cell.eNodebId, cell.sectorId).then(function (result) {
            $scope.cellMonitored = result;
        });

        $scope.queryRecords();
        $scope.showReverseNeighbors();
        $scope.showNeighbors();
    })
    .controller("cell.info.dialog", function ($scope, cell, dialogTitle, neighborMongoService, $uibModalInstance) {
        $scope.dialogTitle = dialogTitle;
        $scope.isHuaweiCell = false;
        $scope.eNodebId = cell.eNodebId;
        $scope.sectorId = cell.sectorId;

        $scope.ok = function () {
            $uibModalInstance.close($scope.mongoNeighbors);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        neighborMongoService.queryNeighbors(cell.eNodebId, cell.sectorId).then(function (result) {
            $scope.mongoNeighbors = result;
        });

    })
    .controller('neighbors.dialog', function ($scope, $uibModalInstance, geometryService,
        dialogTitle, candidateNeighbors, currentCell) {
        $scope.pciNeighbors = [];
        $scope.indoorConsidered = false;
        $scope.distanceOrder = "distance";
        $scope.dialogTitle = dialogTitle;
        $scope.candidateNeighbors = candidateNeighbors;
        $scope.currentCell = currentCell;

        angular.forEach($scope.candidateNeighbors, function (neighbor) {
            neighbor.distance = geometryService.getDistance($scope.currentCell.lattitute, $scope.currentCell.longtitute,
                neighbor.lattitute, neighbor.longtitute);

            $scope.pciNeighbors.push(neighbor);
        });

        $scope.updateNearestCell = function () {
            var minDistance = 10000;
            angular.forEach($scope.candidateNeighbors, function (neighbor) {
                if (neighbor.distance < minDistance && (neighbor.indoor === '室外' || $scope.indoorConsidered)) {
                    minDistance = neighbor.distance;
                    $scope.nearestCell = neighbor;
                }
            });

        };

        $scope.ok = function () {
            $scope.updateNearestCell();
            $uibModalInstance.close($scope.nearestCell);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('coverage.details.dialog', function ($scope, $uibModalInstance, cellName, cellId, sectorId,
        topPreciseService, preciseChartService) {
        $scope.dialogTitle = cellName + '：覆盖详细信息';
        $scope.showCoverage = function () {
            topPreciseService.queryRsrpTa($scope.beginDate.value, $scope.endDate.value,
                cellId, sectorId).then(function (result) {
                    for (var rsrpIndex = 0; rsrpIndex < 12; rsrpIndex++) {
                        var options = preciseChartService.getRsrpTaOptions(result, rsrpIndex);
                        $("#rsrp-ta-" + rsrpIndex).highcharts(options);
                    }
                });
            topPreciseService.queryCoverage($scope.beginDate.value, $scope.endDate.value,
                cellId, sectorId).then(function (result) {
                    var options = preciseChartService.getCoverageOptions(result);
                    $("#coverage-chart").highcharts(options);
                });
            topPreciseService.queryTa($scope.beginDate.value, $scope.endDate.value,
                cellId, sectorId).then(function (result) {
                    var options = preciseChartService.getTaOptions(result);
                    $("#ta-chart").highcharts(options);
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.coverageInfos);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showCoverage();
    })
    .controller("rutrace.interference", function ($scope, $uibModalInstance, cell,
        topPreciseService, kpiDisplayService, preciseInterferenceService, neighborMongoService, networkElementService) {
        $scope.currentCellName = cell.name + "-" + cell.sectorId;
        $scope.dialogTitle = "TOP指标干扰分析: " + $scope.currentCellName;
        $scope.oneAtATime = false;
        $scope.orderPolicy = topPreciseService.getOrderPolicySelection();
        $scope.updateMessages = [];

        networkElementService.queryCellInfo(cell.cellId, cell.sectorId).then(function (info) {
            $scope.current = {
                cellId: cell.cellId,
                sectorId: cell.sectorId,
                eNodebName: cell.name,
                longtitute: info.longtitute,
                lattitute: info.lattitute
            };
        });

        $scope.showInterference = function () {
            $scope.interferenceCells = [];
            $scope.victimCells = [];

            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                cell.cellId, cell.sectorId).then(function (result) {
                    angular.forEach(result, function (interference) {
                        for (var i = 0; i < $scope.mongoNeighbors.length; i++) {
                            var neighbor = $scope.mongoNeighbors[i];
                            if (neighbor.neighborPci === interference.destPci) {
                                interference.isMongoNeighbor = true;
                                break;
                            }
                        }
                    });
                    $scope.interferenceCells = result;
                    preciseInterferenceService.queryInterferenceVictim($scope.beginDate.value, $scope.endDate.value,
                        cell.cellId, cell.sectorId).then(function (victims) {
                            angular.forEach(victims, function (victim) {
                                for (var j = 0; j < result.length; j++) {
                                    if (result[j].destENodebId === victim.victimENodebId
                                        && result[j].destSectorId === victim.victimSectorId) {
                                        victim.forwardInterferences6Db = result[j].overInterferences6Db;
                                        victim.forwardInterferences10Db = result[j].overInterferences10Db;
                                        break;
                                    }
                                }
                            });
                            $scope.victimCells = victims;
                        });
                    var pieOptions = kpiDisplayService.getInterferencePieOptions(result, $scope.currentCellName);
                    $("#interference-over6db").highcharts(pieOptions.over6DbOption);
                    $("#interference-over10db").highcharts(pieOptions.over10DbOption);
                    $("#interference-mod3").highcharts(pieOptions.mod3Option);
                    $("#interference-mod6").highcharts(pieOptions.mod6Option);
                    topPreciseService.queryRsrpTa($scope.beginDate.value, $scope.endDate.value,
                        cell.cellId, cell.sectorId).then(function (info) {
                        });
                });
        };

        $scope.updateNeighborInfos = function () {
            preciseInterferenceService.updateInterferenceNeighbor(cell.cellId, cell.sectorId).then(function (result) {
                $scope.updateMessages.push({
                    cellName: $scope.currentCellName,
                    counts: result,
                    type: "干扰"
                });
            });

            preciseInterferenceService.updateInterferenceVictim(cell.cellId, cell.sectorId).then(function (result) {
                $scope.updateMessages.push({
                    cellName: $scope.currentCellName,
                    counts: result,
                    type: "被干扰"
                });
            });
        }

        $scope.ok = function () {
            $uibModalInstance.close($scope.mongoNeighbors);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        neighborMongoService.queryNeighbors(cell.cellId, cell.sectorId).then(function (result) {
            $scope.mongoNeighbors = result;
            $scope.showInterference();
            $scope.updateNeighborInfos();
        });
    })

    .controller("town.stats", function ($scope, cityName, dialogTitle, $uibModalInstance, appRegionService, parametersChartService) {
        $scope.dialogTitle = dialogTitle;
        appRegionService.queryDistrictInfrastructures(cityName).then(function (result) {
            appRegionService.accumulateCityStat(result, cityName);
            $("#leftChart").highcharts(
                parametersChartService.getDistrictLteENodebPieOptions(result.slice(0, result.length - 1), cityName));
            $("#rightChart").highcharts(
                parametersChartService.getDistrictLteCellPieOptions(result.slice(0, result.length - 1), cityName));
        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("cdma.town.stats", function ($scope, cityName, dialogTitle, $uibModalInstance, appRegionService, parametersChartService) {
        $scope.dialogTitle = dialogTitle;
        appRegionService.queryDistrictInfrastructures(cityName).then(function (result) {
            appRegionService.accumulateCityStat(result, cityName);
            $("#leftChart").highcharts(
                parametersChartService.getDistrictCdmaBtsPieOptions(result.slice(0, result.length - 1), cityName));
            $("#rightChart").highcharts(
                parametersChartService.getDistrictCdmaCellPieOptions(result.slice(0, result.length - 1), cityName));
        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("flow.stats", function ($scope, today, dialogTitle, $uibModalInstance, appRegionService, preciseChartService) {
        $scope.dialogTitle = dialogTitle;
        appRegionService.getTownFlowStats(today).then(function (result) {
            $("#leftChart").highcharts(preciseChartService.getTownFlowOption(result));
            $("#rightChart").highcharts(preciseChartService.getTownUsersOption(result));
        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("flow.trend", function ($scope, beginDate, endDate, city, dialogTitle, $uibModalInstance,
        kpiPreciseService, appFormatService, appKpiService, appRegionService) {
        $scope.dialogTitle = appFormatService.getDateString(beginDate.value, "yyyy年MM月dd日") + '-'
            + appFormatService.getDateString(endDate.value, "yyyy年MM月dd日")
            + dialogTitle;
        kpiPreciseService.getDateSpanFlowRegionKpi(city, beginDate.value, endDate.value).then(function (result) {
            appRegionService.queryDistricts(city).then(function (districts) {
                var stats = appKpiService.generateFlowDistrictStats(districts, result);
                $("#leftChart").highcharts(appKpiService.getDownlinkFlowDistrictOptions(stats, districts));
                $("#rightChart").highcharts(appKpiService.getUplinkFlowDistrictOptions(stats, districts));
            });

        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("users.trend", function ($scope, beginDate, endDate, city, dialogTitle, $uibModalInstance,
        kpiPreciseService, appFormatService, appKpiService, appRegionService) {
        $scope.dialogTitle = appFormatService.getDateString(beginDate.value, "yyyy年MM月dd日") + '-'
            + appFormatService.getDateString(endDate.value, "yyyy年MM月dd日")
            + dialogTitle;
        kpiPreciseService.getDateSpanFlowRegionKpi(city, beginDate.value, endDate.value).then(function (result) {
            appRegionService.queryDistricts(city).then(function (districts) {
                var stats = appKpiService.generateUsersDistrictStats(districts, result);
                $("#leftChart").highcharts(appKpiService.getMaxUsersDistrictOptions(stats, districts));
                $("#rightChart").highcharts(appKpiService.getMaxActiveUsersDistrictOptions(stats, districts));
            });

        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("feelingRate.trend", function ($scope, beginDate, endDate, city, dialogTitle, $uibModalInstance,
        kpiPreciseService, appFormatService, appKpiService, appRegionService) {
        $scope.dialogTitle = appFormatService.getDateString(beginDate.value, "yyyy年MM月dd日") + '-'
            + appFormatService.getDateString(endDate.value, "yyyy年MM月dd日")
            + dialogTitle;
        kpiPreciseService.getDateSpanFlowRegionKpi(city, beginDate.value, endDate.value).then(function (result) {
            appRegionService.queryDistricts(city).then(function (districts) {
                var stats = appKpiService.generateFeelingRateDistrictStats(districts, result);
                $("#leftChart").highcharts(appKpiService.getDownlinkRateDistrictOptions(stats, districts));
                $("#rightChart").highcharts(appKpiService.getUplinkRateDistrictOptions(stats, districts));
            });

        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("rutrace.coverage", function ($scope, cell, $uibModalInstance,
        topPreciseService, preciseInterferenceService,
        preciseChartService, coverageService, kpiDisplayService) {
        $scope.currentCellName = cell.name + "-" + cell.sectorId;
        $scope.dialogTitle = "TOP指标覆盖分析: " + $scope.currentCellName;
        $scope.orderPolicy = topPreciseService.getOrderPolicySelection();
        $scope.detailsDialogTitle = cell.name + "-" + cell.sectorId + "详细小区统计";
        $scope.cellId = cell.cellId;
        $scope.sectorId = cell.sectorId;
        $scope.showCoverage = function () {
            topPreciseService.queryRsrpTa($scope.beginDate.value, $scope.endDate.value,
                cell.cellId, cell.sectorId).then(function (result) {
                    for (var rsrpIndex = 0; rsrpIndex < 12; rsrpIndex++) {
                        var options = preciseChartService.getRsrpTaOptions(result, rsrpIndex);
                        $("#rsrp-ta-" + rsrpIndex).highcharts(options);
                    }
                });
            topPreciseService.queryCoverage($scope.beginDate.value, $scope.endDate.value,
                cell.cellId, cell.sectorId).then(function (result) {
                    var options = preciseChartService.getCoverageOptions(result);
                    $("#coverage-chart").highcharts(options);
                });
            topPreciseService.queryTa($scope.beginDate.value, $scope.endDate.value,
                cell.cellId, cell.sectorId).then(function (result) {
                    var options = preciseChartService.getTaOptions(result);
                    $("#ta-chart").highcharts(options);
                });
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                cell.cellId, cell.sectorId).then(function (result) {
                    $scope.interferenceCells = result;
                    angular.forEach($scope.interferenceCells, function (neighbor) {
                        if (neighbor.destENodebId > 0) {
                            kpiDisplayService.updateCoverageKpi(neighbor, {
                                cellId: neighbor.destENodebId,
                                sectorId: neighbor.destSectorId
                            }, {
                                begin: $scope.beginDate.value,
                                end: $scope.endDate.value
                            });
                        }
                    });
                });
            preciseInterferenceService.queryInterferenceVictim($scope.beginDate.value, $scope.endDate.value,
                cell.cellId, cell.sectorId).then(function (result) {
                    $scope.interferenceVictims = result;
                    angular.forEach($scope.interferenceVictims, function (victim) {
                        if (victim.victimENodebId > 0) {
                            kpiDisplayService.updateCoverageKpi(victim, {
                                cellId: victim.victimENodebId,
                                sectorId: victim.victimSectorId
                            }, {
                                begin: $scope.beginDate.value,
                                end: $scope.endDate.value
                            });
                        }
                    });
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.interferenceCells);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showCoverage();
    })
     .controller("user.roles.dialog", function ($scope, $uibModalInstance, dialogTitle, userName, authorizeService) {
         $scope.dialogTitle = dialogTitle;
         $scope.ok = function () {
             $uibModalInstance.close($scope.city);
         };

         $scope.cancel = function () {
             $uibModalInstance.dismiss('cancel');
         };

         $scope.query = function () {
             authorizeService.queryRolesInUser(userName).then(function (roles) {
                 $scope.existedRoles = roles;
             });
             authorizeService.queryCandidateRolesInUser(userName).then(function (roles) {
                 $scope.candidateRoles = roles;
             });
         };

         $scope.addRole = function (role) {
             authorizeService.assignRoleInUser(userName, role).then(function (result) {
                 if (result) {
                     $scope.query();
                 }
             });
         };

         $scope.removeRole = function (role) {
             authorizeService.releaseRoleInUser(userName, role).then(function (result) {
                 if (result) {
                     $scope.query();
                 }
             });
         };

         $scope.query();
     })

    .factory('neighborDialogService', function ($uibModal, $log, networkElementService) {
        var matchNearest = function (nearestCell, currentNeighbor, center) {
            networkElementService.updateNeighbors(center.cellId, center.sectorId, currentNeighbor.destPci,
                nearestCell.eNodebId, nearestCell.sectorId).then(function () {
                    currentNeighbor.neighborCellName = nearestCell.eNodebName + "-" + nearestCell.sectorId;
                });
        };
        return {
            dumpMongo: function (cell, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/DumpCellMongoDialog.html',
                    controller: 'dump.cell.mongo',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return cell.name + "-" + cell.sectorId + "干扰数据导入";
                        },
                        cell: function () {
                            return cell;
                        },
                        begin: function () {
                            return beginDate;
                        },
                        end: function () {
                            return endDate;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showInterference: function (cell, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/Index.html',
                    controller: 'rutrace.interference',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return cell.name + "-" + cell.sectorId + "干扰指标分析";
                        },
                        cell: function () {
                            return cell;
                        },
                        begin: function () {
                            return beginDate;
                        },
                        end: function () {
                            return endDate;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showCoverage: function (cell, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Coverage/Index.html',
                    controller: 'rutrace.coverage',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return cell.name + "-" + cell.sectorId + "覆盖指标分析";
                        },
                        cell: function () {
                            return cell;
                        },
                        begin: function () {
                            return beginDate;
                        },
                        end: function () {
                            return endDate;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showPrecise: function (precise) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Map/PreciseSectorMapInfoBox.html',
                    controller: 'map.source.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return precise.eNodebName + "-" + precise.sectorId + "精确覆盖率指标";
                        },
                        neighbor: function () {
                            return precise;
                        }
                    }
                });
                modalInstance.result.then(function (sector) {
                    console.log(sector);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            },
            showCell: function (cell) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Parameters/Region/CellInfo.html',
                    controller: 'cell.info.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return cell.eNodebName + "-" + cell.sectorId + "小区详细信息";
                        },
                        cell: function () {
                            return cell;
                        }
                    }
                });
                modalInstance.result.then(function (sector) {
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            },
            showNeighbor: function (neighbor) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Map/NeighborMapInfoBox.html',
                    controller: 'map.neighbor.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return neighbor.cellName + "小区信息";
                        },
                        neighbor: function () {
                            return neighbor;
                        }
                    }
                });
                modalInstance.result.then(function (nei) {
                    console.log(nei);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showInterferenceSource: function (neighbor) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Map/SourceMapInfoBox.html',
                    controller: 'map.source.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return neighbor.neighborCellName + "干扰源信息";
                        },
                        neighbor: function () {
                            return neighbor;
                        }
                    }
                });
                modalInstance.result.then(function (nei) {
                    console.log(nei);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showInterferenceVictim: function (neighbor) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Map/VictimMapInfoBox.html',
                    controller: 'map.source.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return neighbor.victimCellName + "被干扰小区信息";
                        },
                        neighbor: function () {
                            return neighbor;
                        }
                    }
                });
                modalInstance.result.then(function (nei) {
                    console.log(nei);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            matchNeighbor: function (center, candidate, neighbors) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/MatchCellDialog.html',
                    controller: 'neighbors.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return center.eNodebName + "-" + center.sectorId + "的邻区PCI=" + candidate.destPci + "的可能小区";
                        },
                        candidateNeighbors: function () {
                            return neighbors;
                        },
                        currentCell: function () {
                            return center;
                        }
                    }
                });

                modalInstance.result.then(function (nearestCell) {
                    matchNearest(nearestCell, candidate, center);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        }
    })
    .factory('coverageDialogService', function ($uibModal, $log) {
        return {
            showDetails: function (cellName, cellId, sectorId) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Coverage/DetailsChartDialog.html',
                    controller: 'coverage.details.dialog',
                    size: 'lg',
                    resolve: {
                        cellName: function () {
                            return cellName;
                        },
                        cellId: function () {
                            return cellId;
                        },
                        sectorId: function () {
                            return sectorId;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showSource: function (currentView, serialNumber, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/SourceDialog.html',
                    controller: 'interference.source.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return currentView.eNodebName + "-" + currentView.sectorId + "干扰源分析";
                        },
                        eNodebId: function () {
                            return currentView.eNodebId;
                        },
                        sectorId: function () {
                            return currentView.sectorId;
                        },
                        serialNumber: function () {
                            return serialNumber;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                    callback(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showSourceDbChart: function (currentView) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/SourceDbChartDialog.html',
                    controller: 'interference.source.db.chart',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return currentView.eNodebName + "-" + currentView.sectorId + "干扰源图表";
                        },
                        eNodebId: function () {
                            return currentView.eNodebId;
                        },
                        sectorId: function () {
                            return currentView.sectorId;
                        },
                        name: function () {
                            return currentView.eNodebName;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showSourceModChart: function (currentView, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/SourceModChartDialog.html',
                    controller: 'interference.source.mod.chart',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return currentView.eNodebName + "-" + currentView.sectorId + "MOD3/MOD6干扰图表";
                        },
                        eNodebId: function () {
                            return currentView.eNodebId;
                        },
                        sectorId: function () {
                            return currentView.sectorId;
                        },
                        name: function () {
                            return currentView.eNodebName;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                    callback(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showSourceStrengthChart: function (currentView, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/SourceStrengthChartDialog.html',
                    controller: 'interference.source.strength.chart',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return currentView.eNodebName + "-" + currentView.sectorId + "干扰强度图表";
                        },
                        eNodebId: function () {
                            return currentView.eNodebId;
                        },
                        sectorId: function () {
                            return currentView.sectorId;
                        },
                        name: function () {
                            return currentView.eNodebName;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                    callback(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showInterferenceVictim: function (currentView, serialNumber, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/VictimDialog.html',
                    controller: 'interference.victim.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return currentView.eNodebName + "-" + currentView.sectorId + "干扰小区分析";
                        },
                        eNodebId: function () {
                            return currentView.eNodebId;
                        },
                        sectorId: function () {
                            return currentView.sectorId;
                        },
                        serialNumber: function () {
                            return serialNumber;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                    callback(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showCoverage: function (currentView, preciseCells, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/CoverageDialog.html',
                    controller: 'interference.coverage.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return currentView.eNodebName + "-" + currentView.sectorId + "覆盖分析";
                        },
                        preciseCells: function () {
                            return preciseCells;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                    callback(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showTownStats: function (cityName) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'town.stats',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return "全市LTE基站小区分布";
                        },
                        cityName: function () {
                            return cityName;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showCdmaTownStats: function (cityName) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'cdma.town.stats',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return "全市CDMA基站小区分布";
                        },
                        cityName: function () {
                            return cityName;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showFlowStats: function (today) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'flow.stats',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return "全市4G流量和用户数分布";
                        },
                        today: function () {
                            return today;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showFlowTrend: function (city, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Home/FourChartDialog.html',
                    controller: 'flow.trend',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return city + "流量变化趋势";
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        },
                        city: function () {
                            return city;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showUsersTrend: function (city, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Home/FourChartDialog.html',
                    controller: 'users.trend',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return city + "用户数变化趋势";
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        },
                        city: function () {
                            return city;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showFeelingRateTrend: function (city, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Home/FourChartDialog.html',
                    controller: 'feelingRate.trend',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return city + "感知速率变化趋势";
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        },
                        city: function () {
                            return city;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showUserRoles: function (userName) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Manage/UserRolesDialog.html',
                    controller: 'user.roles.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return userName + "角色管理";
                        },
                        userName: function () {
                            return userName;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        }
    });