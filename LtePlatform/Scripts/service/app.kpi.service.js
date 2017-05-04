angular.module('myApp.kpi', ['myApp.url', 'myApp.region', "ui.bootstrap"])
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
                    $("#kpi-" + $index).highcharts(kpiDisplayService.generateComboChartOptions(data, option));
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

    .controller("topic.cells", function ($scope, $uibModalInstance, dialogTitle, name, complainService) {
        $scope.dialogTitle = dialogTitle;
        complainService.queryHotSpotCells(name).then(function (existedCells) {
            $scope.cellList = existedCells;
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.trendStat);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

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
            showHotSpotCells: function (name) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Parameters/Region/TopicCells.html',
                    controller: 'topic.cells',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return name + "热点小区信息";
                        },
                        name: function () {
                            return name;
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
    .controller("flow.kpi.dialog", function ($scope, cell, begin, end, dialogTitle, flowService, generalChartService,
        $uibModalInstance) {
        $scope.dialogTitle = dialogTitle;
        $scope.cell = cell;

        $scope.ok = function () {
            $uibModalInstance.close($scope.mongoNeighbors);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        flowService.queryCellFlowByDateSpan(cell.eNodebId, cell.sectorId, begin, end).then(function (result) {
            var dates = _.map(result, function(stat) {
                return stat.statTime;
            });
            $("#flowChart").highcharts(generalChartService.queryMultipleColumnOptions({
                title: '流量统计',
                xtitle: '日期',
                ytitle: '流量（MB）'
            }, dates, [
                _.map(result, function(stat) {
                    return stat.pdcpDownlinkFlow;
                }), 
                _.map(result, function(stat) {
                    return stat.pdcpUplinkFlow;
                })
            ], ['下行流量', '上行流量']));
            $("#feelingRateChart").highcharts(generalChartService.queryMultipleComboOptionsWithDoubleAxes({
                title: '感知速率',
                xtitle: '日期',
                ytitles: ['感知速率（Mbit/s）', '用户数']
            }, dates, [
                _.map(result, function(stat) {
                    return stat.downlinkFeelingRate;
                }),
                _.map(result, function(stat) {
                    return stat.uplinkFeelingRate;
                }),
                _.map(result, function(stat) {
                    return stat.maxUsers;
                })
            ], ['下行感知速率', '上行感知速率', '用户数'], ['line', 'line', 'column'], [0, 0, 1]));
            $("#downSwitchChart").highcharts(generalChartService.queryMultipleComboOptionsWithDoubleAxes({
                title: '4G下切3G次数统计',
                xtitle: '日期',
                ytitles: ['4G下切3G次数', '流量（MB）']
            }, dates, [
                _.map(result, function (stat) {
                    return stat.redirectCdma2000;
                }),
                _.map(result, function (stat) {
                    return stat.pdcpDownlinkFlow;
                }),
                _.map(result, function (stat) {
                    return stat.pdcpUplinkFlow;
                })
            ], ['4G下切3G次数', '下行流量', '上行流量'], ['column', 'line', 'line'], [0, 1, 1]));
            $("#rank2Chart").highcharts(generalChartService.queryMultipleComboOptionsWithDoubleAxes({
                title: '4G双流比统计',
                xtitle: '日期',
                ytitles: ['4G双流比（%）', '感知速率（Mbit/s）']
            }, dates, [
                _.map(result, function (stat) {
                    return stat.rank2Rate;
                }),
                _.map(result, function (stat) {
                    return stat.downlinkFeelingRate;
                }),
                _.map(result, function (stat) {
                    return stat.uplinkFeelingRate;
                })
            ], ['4G双流比', '下行感知速率', '上行感知速率'], ['column', 'line', 'line'], [0, 1, 1]));
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

    .controller("grid.stats", function ($scope, dialogTitle, category, stats, $uibModalInstance, $timeout, generalChartService) {
        $scope.dialogTitle = dialogTitle;
        var options = generalChartService.getPieOptions(stats, {
            title: dialogTitle,
            seriesTitle: category
        }, function(stat) {
            return stat.key;
        }, function(stat) {
            return stat.value;
        });
        $timeout(function () {
            $("#rightChart").highcharts(options);
        }, 500);
        
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("agps.stats", function ($scope, dialogTitle, stats, $uibModalInstance, $timeout, generalChartService) {
        $scope.dialogTitle = dialogTitle;
        var operatorStats = [
        {
            operator: '移动主导',
            count: _.countBy(stats, function (stat) { return stat.domination === '移动主导' })['true']
        },
        {
            operator: '联通主导',
            count: _.countBy(stats, function (stat) { return stat.domination === '联通主导' })['true']
        },
        {
            operator: '电信主导',
            count: _.countBy(stats, function (stat) { return stat.domination === '电信主导' })['true']
        }];
        var counts = stats.length;
        var operators = ['移动', '联通', '电信'];
        var coverages = [
            _.countBy(stats, function(stat) { return stat.mobileRsrp >= -110 })['true'] / counts * 100,
            _.countBy(stats, function (stat) { return stat.unicomRsrp >= -110 })['true'] / counts * 100,
            _.countBy(stats, function (stat) { return stat.telecomRsrp >= -110 })['true'] / counts * 100
        ];
        $timeout(function() {
            $("#leftChart").highcharts(generalChartService.getPieOptions(operatorStats, {
                title: '主导运营商分布比例',
                seriesTitle: '主导运营商'
            }, function(stat) {
                return stat.operator;
            }, function(stat) {
                return stat.count;
            }));
            $("#rightChart").highcharts(generalChartService.queryColumnOptions({
                title: '运营商覆盖率比较（RSRP>=-110dBm）',
                ytitle: '覆盖率（%）',
                xtitle: '运营商',
                min: 80,
                max: 100
            }, operators, coverages));
        }, 500);
        
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
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
                var trendStat = {};
                appKpiService.generateFlowTrendStatsForPie(trendStat, result);
                $("#leftChart").highcharts(appKpiService.getDownlinkFlowDistrictOptions(stats, districts));
                $("#rightChart").highcharts(appKpiService.getUplinkFlowDistrictOptions(stats, districts));
                $("#thirdChart").highcharts(appKpiService.getDownlinkFlowOptions(trendStat.districtStats, trendStat.townStats));
                $("#fourthChart").highcharts(appKpiService.getUplinkFlowOptions(trendStat.districtStats, trendStat.townStats));
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
                var trendStat = {};
                appKpiService.generateFlowTrendStatsForPie(trendStat, result);
                $("#leftChart").highcharts(appKpiService.getMaxUsersDistrictOptions(stats, districts));
                $("#rightChart").highcharts(appKpiService.getMaxActiveUsersDistrictOptions(stats, districts));
                $("#thirdChart").highcharts(appKpiService.getMaxUsersOptions(trendStat.districtStats, trendStat.townStats));
                $("#fourthChart").highcharts(appKpiService.getMaxActiveUsersOptions(trendStat.districtStats, trendStat.townStats));
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
                var trendStat = {};
                appKpiService.generateFlowTrendStatsForPie(trendStat, result);
                $("#leftChart").highcharts(appKpiService.getDownlinkRateDistrictOptions(stats, districts));
                $("#rightChart").highcharts(appKpiService.getUplinkRateDistrictOptions(stats, districts));
                $("#thirdChart").highcharts(appKpiService.getDownlinkRateOptions(trendStat.districtStats, trendStat.townStats));
                $("#fourthChart").highcharts(appKpiService.getUplinkRateOptions(trendStat.districtStats, trendStat.townStats));
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

    .controller('map.source.dialog', function ($scope, $uibModalInstance, neighbor, dialogTitle, topPreciseService, preciseChartService) {
        $scope.neighbor = neighbor;
        $scope.dialogTitle = dialogTitle;
        if (neighbor.cellId !== undefined) {
            $scope.cellId = neighbor.cellId;
            $scope.sectorId = neighbor.sectorId;
        } else {
            $scope.cellId = neighbor.destENodebId;
            $scope.sectorId = neighbor.destSectorId;
        }
        topPreciseService.queryCoverage($scope.beginDate.value, $scope.endDate.value,
            $scope.cellId, $scope.sectorId).then(function (result) {
                var options = preciseChartService.getCoverageOptions(result);
                $("#coverage-chart").highcharts(options);
            });
        $scope.ok = function () {
            $uibModalInstance.close($scope.neighbor);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller('query.setting.dialog', function ($scope, $uibModalInstance, city, dialogTitle, beginDate, endDate,
    appRegionService, parametersMapService, parametersDialogService, networkElementService) {
        $scope.network = {
            options: ["LTE", "CDMA"],
            selected: "LTE"
        };
        $scope.queryText = "";
        $scope.city = city;
        $scope.dialogTitle = dialogTitle;
        $scope.beginDate = beginDate;
        $scope.endDate = endDate;
        $scope.eNodebList = [];
        $scope.btsList = [];

        $scope.updateDistricts = function () {
            appRegionService.queryDistricts($scope.city.selected).then(function (result) {
                $scope.district.options = result;
                $scope.district.selected = result[0];
            });
        };
        $scope.updateTowns = function () {
            appRegionService.queryTowns($scope.city.selected, $scope.district.selected).then(function (result) {
                $scope.town.options = result;
                $scope.town.selected = result[0];
            });
        };

        $scope.queryItems = function () {
            if ($scope.network.selected === "LTE") {
                if ($scope.queryText.trim() === "") {
                    networkElementService.queryENodebsInOneTown($scope.city.selected, $scope.district.selected, $scope.town.selected).then(function (eNodebs) {
                        $scope.eNodebList = eNodebs;
                    });
                } else {
                    networkElementService.queryENodebsByGeneralName($scope.queryText).then(function (eNodebs) {
                        $scope.eNodebList = eNodebs;
                    });
                }
            } else {
                if ($scope.queryText.trim() === "") {
                    networkElementService.queryBtssInOneTown($scope.city.selected, $scope.district.selected, $scope.town.selected).then(function (btss) {
                        $scope.btsList = btss;
                    });
                } else {
                    networkElementService.queryBtssByGeneralName($scope.queryText).then(function (btss) {
                        $scope.btsList = btss;
                    });
                }
            }
        };
        appRegionService.queryDistricts($scope.city.selected).then(function (districts) {
            $scope.district = {
                options: districts,
                selected: districts[0]
            };
            appRegionService.queryTowns($scope.city.selected, $scope.district.selected).then(function (towns) {
                $scope.town = {
                    options: towns,
                    selected: towns[0]
                };
            });
        });
        $scope.ok = function () {
            if ($scope.network.selected === "LTE") {
                if ($scope.queryText.trim() === "") {
                    parametersMapService.showElementsInOneTown($scope.city.selected, $scope.district.selected, $scope.town.selected,
                        $scope.beginDate, $scope.endDate);
                } else {
                    parametersMapService.showElementsWithGeneralName($scope.queryText, $scope.beginDate, $scope.endDate);
                }
            } else {
                if ($scope.queryText.trim() === "") {
                    parametersMapService.showCdmaInOneTown($scope.city.selected, $scope.district.selected, $scope.town.selected);
                } else {
                    parametersMapService.showCdmaWithGeneralName($scope.queryText);
                }
            }
            $uibModalInstance.close($scope.neighbor);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller("parameters.list", function ($scope, $uibModalInstance, city, dialogTitle, appRegionService, parametersChartService) {
        $scope.city = city;
        $scope.dialogTitle = dialogTitle;
        $scope.showCityStats = function () {
            appRegionService.queryDistrictInfrastructures($scope.city.selected).then(function (result) {
                appRegionService.accumulateCityStat(result, $scope.city.selected);
                $scope.districtStats = result;

                $("#cityLteENodebConfig").highcharts(parametersChartService.getDistrictLteENodebPieOptions(result.slice(0, result.length - 1),
                    $scope.city.selected));
                $("#cityLteCellConfig").highcharts(parametersChartService.getDistrictLteCellPieOptions(result.slice(0, result.length - 1),
                    $scope.city.selected));
                $("#cityCdmaENodebConfig").highcharts(parametersChartService.getDistrictCdmaBtsPieOptions(result.slice(0, result.length - 1),
                    $scope.city.selected));
                $("#cityCdmaCellConfig").highcharts(parametersChartService.getDistrictCdmaCellPieOptions(result.slice(0, result.length - 1),
                    $scope.city.selected));
            });
        };
        $scope.$watch('currentDistrict', function (district) {
            appRegionService.queryTownInfrastructures($scope.city.selected, district).then(function (result) {
                $scope.townStats = result;
                $("#districtLteENodebConfig").highcharts(parametersChartService.getTownLteENodebPieOptions(result, district));
                $("#districtLteCellConfig").highcharts(parametersChartService.getTownLteCellPieOptions(result, district));
                $("#districtCdmaENodebConfig").highcharts(parametersChartService.getTownCdmaBtsPieOptions(result, district));
                $("#districtCdmaCellConfig").highcharts(parametersChartService.getTownCdmaCellPieOptions(result, district));
            });
        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.neighbor);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showCityStats();
    })
    .controller('cell.type.chart', function ($scope, $uibModalInstance, city, dialogTitle, appRegionService, parametersChartService) {
        $scope.dialogTitle = dialogTitle;
        $scope.ok = function () {
            $uibModalInstance.close($scope.neighbor);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        appRegionService.queryDistrictIndoorCells(city.selected).then(function(stats) {
            $("#leftChart").highcharts(parametersChartService.getCellIndoorTypeColumnOptions(stats));
        });
        appRegionService.queryDistrictBandCells(city.selected).then(function (stats) {
            $("#rightChart").highcharts(parametersChartService.getCellBandClassColumnOptions(stats));
        });
    })

    .factory('neighborDialogService', function (menuItemService, networkElementService) {
        var matchNearest = function (nearestCell, currentNeighbor, center) {
            networkElementService.updateNeighbors(center.cellId, center.sectorId, currentNeighbor.destPci,
                nearestCell.eNodebId, nearestCell.sectorId).then(function () {
                    currentNeighbor.neighborCellName = nearestCell.eNodebName + "-" + nearestCell.sectorId;
                });
        };
        return {
            dumpMongo: function (cell, beginDate, endDate) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Interference/DumpCellMongoDialog.html',
                    controller: 'dump.cell.mongo',
                    resolve: {
                        dialogTitle: function() {
                            return cell.name + "-" + cell.sectorId + "干扰数据导入";
                        },
                        cell: function() {
                            return cell;
                        },
                        begin: function() {
                            return beginDate;
                        },
                        end: function() {
                            return endDate;
                        }
                    }
                });
            },
            showInterference: function (cell, beginDate, endDate) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Interference/Index.html',
                    controller: 'rutrace.interference',
                    resolve: {
                        dialogTitle: function() {
                            return cell.name + "-" + cell.sectorId + "干扰指标分析";
                        },
                        cell: function() {
                            return cell;
                        },
                        begin: function() {
                            return beginDate;
                        },
                        end: function() {
                            return endDate;
                        }
                    }
                });
            },
            showCoverage: function (cell, beginDate, endDate) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Coverage/Index.html',
                    controller: 'rutrace.coverage',
                    resolve: {
                        dialogTitle: function() {
                            return cell.name + "-" + cell.sectorId + "覆盖指标分析";
                        },
                        cell: function() {
                            return cell;
                        },
                        begin: function() {
                            return beginDate;
                        },
                        end: function() {
                            return endDate;
                        }
                    }
                });
            },
            showPrecise: function (precise) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Map/PreciseSectorMapInfoBox.html',
                    controller: 'map.source.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return precise.eNodebName + "-" + precise.sectorId + "精确覆盖率指标";
                        },
                        neighbor: function() {
                            return precise;
                        }
                    }
                });
            },
            showCell: function (cell) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Parameters/Region/CellInfo.html',
                    controller: 'cell.info.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return cell.eNodebName + "-" + cell.sectorId + "小区详细信息";
                        },
                        cell: function() {
                            return cell;
                        }
                    }
                });
            },
            setQueryConditions: function(city, beginDate, endDate) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Parameters/QueryMap.html',
                    controller: 'query.setting.dialog',
                    resolve: {
                        dialogTitle: function () {
                            return "小区信息查询条件设置";
                        },
                        city: function () {
                            return city;
                        },
                        beginDate: function() {
                            return beginDate;
                        },
                        endDate: function() {
                            return endDate;
                        }
                    }
                });
            },
            queryList: function (city) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Parameters/List.html',
                    controller: 'parameters.list',
                    resolve: {
                        dialogTitle: function () {
                            return "全网基站小区信息统计";
                        },
                        city: function () {
                            return city;
                        }
                    }
                });
            },
            queryCellTypeChart: function (city) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'cell.type.chart',
                    resolve: {
                        dialogTitle: function () {
                            return "全网小区类型统计";
                        },
                        city: function () {
                            return city;
                        }
                    }
                });
            },
            showFlowCell: function (cell) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Parameters/Region/FlowKpiInfo.html',
                    controller: 'flow.kpi.dialog',
                    resolve: {
                        dialogTitle: function () {
                            return cell.item.eNodebName + "-" + cell.item.sectorId + "小区流量相关指标信息";
                        },
                        cell: function () {
                            return cell.item;
                        },
                        begin: function() {
                            return cell.beginDate.value;
                        },
                        end: function() {
                            return cell.endDate.value;
                        }
                    }
                });
            },
            showInterferenceSource: function (neighbor) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Map/SourceMapInfoBox.html',
                    controller: 'map.source.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return neighbor.neighborCellName + "干扰源信息";
                        },
                        neighbor: function() {
                            return neighbor;
                        }
                    }
                });
            },
            showInterferenceVictim: function (neighbor) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Map/VictimMapInfoBox.html',
                    controller: 'map.source.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return neighbor.victimCellName + "被干扰小区信息";
                        },
                        neighbor: function() {
                            return neighbor;
                        }
                    }
                });
            },
            matchNeighbor: function (center, candidate, neighbors) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Rutrace/Interference/MatchCellDialog.html',
                    controller: 'neighbors.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return center.eNodebName + "-" + center.sectorId + "的邻区PCI=" + candidate.destPci + "的可能小区";
                        },
                        candidateNeighbors: function() {
                            return neighbors;
                        },
                        currentCell: function() {
                            return center;
                        }
                    }
                }, function (nearestCell) {
                    matchNearest(nearestCell, candidate, center);
                });
            }
        }
    })

    .controller('interference.source.db.chart', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId, name,
        topPreciseService, kpiDisplayService, preciseInterferenceService) {
        $scope.dialogTitle = dialogTitle;
        $scope.currentCellName = name + "-" + sectorId;
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $scope.beginDate = {
            value: lastWeek,
            opened: false
        };
        $scope.endDate = {
            value: new Date(),
            opened: false
        };
        $scope.showChart = function () {
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function (result) {
                    var pieOptions = kpiDisplayService.getInterferencePieOptions(result, $scope.currentCellName);
                    $("#interference-over6db").highcharts(pieOptions.over6DbOption);
                    $("#interference-over10db").highcharts(pieOptions.over10DbOption);
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showChart();
    })
    .controller('interference.source.dialog', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId,
        preciseInterferenceService, neighborMongoService) {
        $scope.dialogTitle = dialogTitle;
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $scope.beginDate = {
            value: lastWeek,
            opened: false
        };
        $scope.endDate = {
            value: new Date(),
            opened: false
        };
        var options = [
            {
                name: "模3干扰数",
                value: "mod3Interferences"
            }, {
                name: "模6干扰数",
                value: "mod6Interferences"
            }, {
                name: "6dB干扰数",
                value: "overInterferences6Db"
            }, {
                name: "10dB干扰数",
                value: "overInterferences10Db"
            }, {
                name: "总干扰水平",
                value: "interferenceLevel"
            }
        ];
        $scope.orderPolicy = {
            options: options,
            selected: options[4].value
        };
        $scope.displayItems = {
            options: [5, 10, 15, 20, 30],
            selected: 10
        };

        $scope.showInterference = function () {
            $scope.interferenceCells = [];

            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function (result) {
                    angular.forEach(result, function (cell) {
                        for (var i = 0; i < $scope.mongoNeighbors.length; i++) {
                            var neighbor = $scope.mongoNeighbors[i];
                            if (neighbor.neighborPci === cell.destPci) {
                                cell.isMongoNeighbor = true;
                                break;
                            }
                        }
                    });
                    $scope.interferenceCells = result;
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.interferenceCells);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        neighborMongoService.queryNeighbors(eNodebId, sectorId).then(function (result) {
            $scope.mongoNeighbors = result;
            $scope.showInterference();
        });
    })
    .controller('interference.source.mod.chart', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId, name,
        topPreciseService, kpiDisplayService, preciseInterferenceService) {
        $scope.dialogTitle = dialogTitle;
        $scope.currentCellName = name + "-" + sectorId;
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $scope.beginDate = {
            value: lastWeek,
            opened: false
        };
        $scope.endDate = {
            value: new Date(),
            opened: false
        };
        $scope.showChart = function () {
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function (result) {
                    var pieOptions = kpiDisplayService.getInterferencePieOptions(result, $scope.currentCellName);
                    $("#interference-mod3").highcharts(pieOptions.mod3Option);
                    $("#interference-mod6").highcharts(pieOptions.mod6Option);
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showChart();
    })
    .controller('interference.source.strength.chart', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId, name,
        topPreciseService, kpiDisplayService, preciseInterferenceService, neighborMongoService, networkElementService) {
        $scope.dialogTitle = dialogTitle;
        $scope.currentCellName = name + "-" + sectorId;
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $scope.beginDate = {
            value: lastWeek,
            opened: false
        };
        $scope.endDate = {
            value: new Date(),
            opened: false
        };
        $scope.showChart = function () {
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function (result) {
                    networkElementService.queryCellInfo(eNodebId, sectorId).then(function (info) {
                        topPreciseService.queryCellStastic(eNodebId, info.pci,
                            $scope.beginDate.value, $scope.endDate.value).then(function (stastic) {
                                var columnOptions = kpiDisplayService.getStrengthColumnOptions(result, stastic.mrCount,
                                    $scope.currentCellName);
                                $("#strength-over6db").highcharts(columnOptions.over6DbOption);
                                $("#strength-over10db").highcharts(columnOptions.over10DbOption);
                            });
                    });
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showChart();
    })
    .controller('interference.victim.dialog', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId,
        topPreciseService, preciseInterferenceService) {
        $scope.dialogTitle = dialogTitle;
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $scope.beginDate = {
            value: lastWeek,
            opened: false
        };
        $scope.endDate = {
            value: new Date(),
            opened: false
        };
        var options = [
            {
                name: "模3干扰数",
                value: "mod3Interferences"
            }, {
                name: "模6干扰数",
                value: "mod6Interferences"
            }, {
                name: "6dB干扰数",
                value: "overInterferences6Db"
            }, {
                name: "10dB干扰数",
                value: "overInterferences10Db"
            }, {
                name: "总干扰水平",
                value: "interferenceLevel"
            }
        ];
        $scope.orderPolicy = {
            options: options,
            selected: options[4].value
        };
        $scope.displayItems = {
            options: [5, 10, 15, 20, 30],
            selected: 10
        };

        $scope.showVictim = function () {
            $scope.victimCells = [];

            preciseInterferenceService.queryInterferenceVictim($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function (victims) {
                    preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                        eNodebId, sectorId).then(function (result) {
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
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.victimCells);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showVictim();
    })

    .factory('coverageDialogService', function (menuItemService) {
        return {
            showDetails: function (cellName, cellId, sectorId) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Coverage/DetailsChartDialog.html',
                    controller: 'coverage.details.dialog',
                    resolve: {
                        cellName: function() {
                            return cellName;
                        },
                        cellId: function() {
                            return cellId;
                        },
                        sectorId: function() {
                            return sectorId;
                        }
                    }
                });
            },
            showSource: function (currentView, serialNumber, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Rutrace/Interference/SourceDialog.html',
                    controller: 'interference.source.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return currentView.eNodebName + "-" + currentView.sectorId + "干扰源分析";
                        },
                        eNodebId: function() {
                            return currentView.eNodebId;
                        },
                        sectorId: function() {
                            return currentView.sectorId;
                        },
                        serialNumber: function() {
                            return serialNumber;
                        }
                    }
                }, function(info) {
                    callback(info);
                });
            },
            showSourceDbChart: function (currentView) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Interference/SourceDbChartDialog.html',
                    controller: 'interference.source.db.chart',
                    resolve: {
                        dialogTitle: function() {
                            return currentView.eNodebName + "-" + currentView.sectorId + "干扰源图表";
                        },
                        eNodebId: function() {
                            return currentView.eNodebId;
                        },
                        sectorId: function() {
                            return currentView.sectorId;
                        },
                        name: function() {
                            return currentView.eNodebName;
                        }
                    }
                });
            },
            showSourceModChart: function (currentView, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Rutrace/Interference/SourceModChartDialog.html',
                    controller: 'interference.source.mod.chart',
                    resolve: {
                        dialogTitle: function() {
                            return currentView.eNodebName + "-" + currentView.sectorId + "MOD3/MOD6干扰图表";
                        },
                        eNodebId: function() {
                            return currentView.eNodebId;
                        },
                        sectorId: function() {
                            return currentView.sectorId;
                        },
                        name: function() {
                            return currentView.eNodebName;
                        }
                    }
                }, function(info) {
                    callback(info);
                });
            },
            showSourceStrengthChart: function (currentView, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Rutrace/Interference/SourceStrengthChartDialog.html',
                    controller: 'interference.source.strength.chart',
                    resolve: {
                        dialogTitle: function() {
                            return currentView.eNodebName + "-" + currentView.sectorId + "干扰强度图表";
                        },
                        eNodebId: function() {
                            return currentView.eNodebId;
                        },
                        sectorId: function() {
                            return currentView.sectorId;
                        },
                        name: function() {
                            return currentView.eNodebName;
                        }
                    }
                }, function(info) {
                    callback(info);
                });
            },
            showInterferenceVictim: function (currentView, serialNumber, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Rutrace/Interference/VictimDialog.html',
                    controller: 'interference.victim.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return currentView.eNodebName + "-" + currentView.sectorId + "干扰小区分析";
                        },
                        eNodebId: function() {
                            return currentView.eNodebId;
                        },
                        sectorId: function() {
                            return currentView.sectorId;
                        },
                        serialNumber: function() {
                            return serialNumber;
                        }
                    }
                }, function(info) {
                    callback(info);
                });
            },
            showCoverage: function (currentView, preciseCells, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Rutrace/Interference/CoverageDialog.html',
                    controller: 'interference.coverage.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return currentView.eNodebName + "-" + currentView.sectorId + "覆盖分析";
                        },
                        preciseCells: function() {
                            return preciseCells;
                        }
                    }
                }, function(info) {
                    callback(info);
                });
            },///////////未完成
            showGridStats: function (district, theme, category, data, keys) {
                var stats = [];
                angular.forEach(keys, function(key) {
                    stats.push({
                        key: key,
                        value: data[key]
                    });
                });
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/SingleChartDialog.html',
                    controller: 'grid.stats',
                    resolve: {
                        dialogTitle: function () {
                            return district + theme;
                        },
                        category: function() {
                            return category;
                        },
                        stats: function () {
                            return stats;
                        }
                    }
                });
            },
            showAgpsStats: function (stats) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'agps.stats',
                    resolve: {
                        dialogTitle: function () {
                            return 'AGPS三网对比覆盖指标';
                        },
                        stats: function () {
                            return stats;
                        }
                    }
                });
            },
            showTownStats: function (cityName) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'town.stats',
                    resolve: {
                        dialogTitle: function() {
                            return "全市LTE基站小区分布";
                        },
                        cityName: function() {
                            return cityName;
                        }
                    }
                });
            },
            showCdmaTownStats: function (cityName) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'cdma.town.stats',
                    resolve: {
                        dialogTitle: function() {
                            return "全市CDMA基站小区分布";
                        },
                        cityName: function() {
                            return cityName;
                        }
                    }
                });
            },
            showFlowStats: function (today) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'flow.stats',
                    resolve: {
                        dialogTitle: function() {
                            return "全市4G流量和用户数分布";
                        },
                        today: function() {
                            return today;
                        }
                    }
                });
            },
            showFlowTrend: function (city, beginDate, endDate) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/FourChartDialog.html',
                    controller: 'flow.trend',
                    resolve: {
                        dialogTitle: function() {
                            return city + "流量变化趋势";
                        },
                        beginDate: function() {
                            return beginDate;
                        },
                        endDate: function() {
                            return endDate;
                        },
                        city: function() {
                            return city;
                        }
                    }
                });
            },
            showUsersTrend: function (city, beginDate, endDate) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/FourChartDialog.html',
                    controller: 'users.trend',
                    resolve: {
                        dialogTitle: function() {
                            return city + "用户数变化趋势";
                        },
                        beginDate: function() {
                            return beginDate;
                        },
                        endDate: function() {
                            return endDate;
                        },
                        city: function() {
                            return city;
                        }
                    }
                });
            },
            showFeelingRateTrend: function (city, beginDate, endDate) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/FourChartDialog.html',
                    controller: 'feelingRate.trend',
                    resolve: {
                        dialogTitle: function() {
                            return city + "感知速率变化趋势";
                        },
                        beginDate: function() {
                            return beginDate;
                        },
                        endDate: function() {
                            return endDate;
                        },
                        city: function() {
                            return city;
                        }
                    }
                });
            },
            showUserRoles: function (userName) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Manage/UserRolesDialog.html',
                    controller: 'user.roles.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return userName + "角色管理";
                        },
                        userName: function() {
                            return userName;
                        }
                    }
                });
            }
        }
    })

    .controller('emergency.new.dialog', function ($scope, $uibModalInstance, customerQueryService,
        dialogTitle, city, district, vehicularType) {
        $scope.dialogTitle = dialogTitle;
        $scope.message = "";
        $scope.city = city;
        $scope.district = district;
        $scope.vehicularType = vehicularType;

        var firstDay = new Date();
        firstDay.setDate(firstDay.getDate() + 7);
        var nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 14);
        $scope.itemBeginDate = {
            value: firstDay,
            opened: false
        };
        $scope.itemEndDate = {
            value: nextDay,
            opened: false
        };
        customerQueryService.queryDemandLevelOptions().then(function (options) {
            $scope.demandLevel = {
                options: options,
                selected: options[0]
            };
        });
        var transmitOptions = customerQueryService.queryTransmitFunctionOptions();
        $scope.transmitFunction = {
            options: transmitOptions,
            selected: transmitOptions[0]
        };
        var electrictOptions = customerQueryService.queryElectricSupplyOptions();
        $scope.electricSupply = {
            options: electrictOptions,
            selected: electrictOptions[0]
        };
        $scope.dto = {
            projectName: "和顺梦里水乡百合花文化节",
            expectedPeople: 500000,
            vehicles: 1,
            area: "万顷洋园艺世界",
            department: "南海区分公司客响维护部",
            person: "刘文清",
            phone: "13392293722",
            vehicleLocation: "门口东边100米处",
            otherDescription: "此次活动为佛山市南海区政府组织的一次大型文化活动，是宣传天翼品牌的重要场合。",
            townId: 1
        };

        $scope.ok = function () {
            $scope.dto.demandLevelDescription = $scope.demandLevel.selected;
            $scope.dto.beginDate = $scope.itemBeginDate.value;
            $scope.dto.endDate = $scope.itemEndDate.value;
            $scope.dto.vehicularTypeDescription = $scope.vehicularType.selected;
            $scope.dto.transmitFunction = $scope.transmitFunction.selected;
            $scope.dto.district = $scope.district.selected;
            $scope.dto.town = $scope.town.selected;
            $scope.dto.electricSupply = $scope.electricSupply.selected;
            $uibModalInstance.close($scope.dto);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('vip.supplement.dialog', function ($scope, $uibModalInstance,
        customerQueryService, appFormatService,
        dialogTitle, view, city, district) {
        $scope.dialogTitle = dialogTitle;
        $scope.view = view;
        $scope.city = city;
        $scope.district = district;
        $scope.matchFunction = function (text) {
            return $scope.view.projectName.indexOf(text) >= 0 || $scope.view.projectContents.indexOf(text) >= 0;
        };
        $scope.matchDistrictTown = function () {
            var districtOption = appFormatService.searchText($scope.district.options, $scope.matchFunction);
            if (districtOption) {
                $scope.district.selected = districtOption;
            }
        };
        $scope.$watch('town.selected', function () {
            var townOption = appFormatService.searchText($scope.town.options, $scope.matchFunction);
            if (townOption) {
                $scope.town.selected = townOption;
            }
        });

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.ok = function () {
            $scope.view.district = $scope.district.selected;
            $scope.view.town = $scope.town.selected;
            $uibModalInstance.close($scope.view);
        };
    })
    .controller('complain.supplement.dialog', function ($scope, $uibModalInstance,
        appRegionService, appFormatService, baiduMapService, parametersMapService, parametersDialogService, item) {
        $scope.dialogTitle = item.serialNumber + "工单信息补充";

        $scope.item = item;
        appRegionService.initializeCities().then(function (cities) {
            $scope.city.options = cities;
            $scope.city.selected = cities[0];
            appRegionService.queryDistricts($scope.city.selected).then(function (districts) {
                $scope.district.options = districts;
                $scope.district.selected = (item.district) ? item.district.replace('区', '') : districts[0];
                baiduMapService.initializeMap("map", 11);
                baiduMapService.addCityBoundary("佛山");
                if (item.longtitute && item.lattitute) {
                    var marker = baiduMapService.generateMarker(item.longtitute, item.lattitute);
                    baiduMapService.addOneMarker(marker);
                    baiduMapService.setCellFocus(item.longtitute, item.lattitute, 15);
                }
                if (item.sitePosition) {
                    parametersMapService.showElementsWithGeneralName(item.sitePosition,
                        parametersDialogService.showENodebInfo, parametersDialogService.showCellInfo);
                }
            });
        });

        $scope.matchTown = function () {
            var town = appFormatService.searchPattern($scope.town.options, item.sitePosition);
            if (town) {
                $scope.town.selected = town;
                return;
            }
            town = appFormatService.searchPattern($scope.town.options, item.buildingName);
            if (town) {
                $scope.town.selected = town;
                return;
            }
            town = appFormatService.searchPattern($scope.town.options, item.roadName);
            if (town) {
                $scope.town.selected = town;
            }
        };

        $scope.ok = function () {
            $scope.item.district = $scope.district.selected;
            $scope.item.town = $scope.town.selected;
            $uibModalInstance.close($scope.item);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('fiber.new.dialog', function ($scope, $uibModalInstance,
        dialogTitle, id, num) {
        $scope.dialogTitle = dialogTitle;

        $scope.item = {
            id: 0,
            emergencyId: id,
            workItemNumber: "FS-Fiber-" + new Date().getYear() + "-" + new Date().getMonth() + "-" + new Date().getDate() + "-" + num,
            person: "",
            beginDate: new Date(),
            finishDate: null
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.item);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('emergency.college.dialog', function ($scope, $uibModalInstance, serialNumber, collegeName,
        collegeQueryService, appFormatService, customerQueryService, appRegionService) {
        $scope.dialogTitle = collegeName + "应急通信车申请-" + serialNumber;
        $scope.dto = {
            projectName: collegeName + "应急通信车申请",
            expectedPeople: 500000,
            vehicles: 1,
            area: collegeName,
            department: "南海区分公司客响维护部",
            person: "刘文清",
            phone: "13392293722",
            vehicleLocation: "门口东边100米处",
            otherDescription: "应急通信车申请。",
            townId: 1
        };
        customerQueryService.queryDemandLevelOptions().then(function (options) {
            $scope.demandLevel = {
                options: options,
                selected: options[0]
            };
        });
        customerQueryService.queryVehicleTypeOptions().then(function (options) {
            $scope.vehicularType = {
                options: options,
                selected: options[17]
            };
        });
        var transmitOptions = customerQueryService.queryTransmitFunctionOptions();
        $scope.transmitFunction = {
            options: transmitOptions,
            selected: transmitOptions[0]
        };
        var electrictOptions = customerQueryService.queryElectricSupplyOptions();
        $scope.electricSupply = {
            options: electrictOptions,
            selected: electrictOptions[0]
        };
        collegeQueryService.queryByNameAndYear(collegeName, $scope.collegeInfo.year.selected).then(function (item) {
            $scope.itemBeginDate = {
                value: appFormatService.getDate(item.oldOpenDate),
                opened: false
            };
            $scope.itemEndDate = {
                value: appFormatService.getDate(item.newOpenDate),
                opened: false
            };
            $scope.dto.expectedPeople = item.expectedSubscribers;
        });
        customerQueryService.queryOneVip(serialNumber).then(function (item) {
            angular.forEach($scope.district.options, function (district) {
                if (district === item.district) {
                    $scope.district.selected = item.district;
                }
            });
            appRegionService.queryTowns($scope.city.selected, $scope.district.selected).then(function (towns) {
                $scope.town.options = towns;
                $scope.town.selected = towns[0];
                angular.forEach(towns, function (town) {
                    if (town === item.town) {
                        $scope.town.selected = town;
                    }
                });
            });
        });

        $scope.ok = function () {
            $scope.dto.demandLevelDescription = $scope.demandLevel.selected;
            $scope.dto.beginDate = $scope.itemBeginDate.value;
            $scope.dto.endDate = $scope.itemEndDate.value;
            $scope.dto.vehicularTypeDescription = $scope.vehicularType.selected;
            $scope.dto.transmitFunction = $scope.transmitFunction.selected;
            $scope.dto.district = $scope.district.selected;
            $scope.dto.town = $scope.town.selected;
            $scope.dto.electricSupply = $scope.electricSupply.selected;
            $uibModalInstance.close($scope.dto);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('hot.spot.dialog', function ($scope, dialogTitle, $uibModalInstance) {
        $scope.dialogTitle = dialogTitle;
        $scope.spotType = {
            options: ["楼宇", "校园网", "医院", "商场", "交通枢纽", "其他"],
            selected: "楼宇"
        }
        $scope.ok = function () {
            $scope.dto.typeDescription = $scope.spotType.selected;
            $uibModalInstance.close($scope.dto);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('hot.spot.cell.dialog', function ($scope, dialogTitle, address, name, center, $uibModalInstance,
        basicImportService, collegeQueryService, networkElementService, neighborImportService, complainService) {
        $scope.dialogTitle = dialogTitle;
        $scope.address = address;
        $scope.gridApi = {};
        $scope.gridApi2 = {};
        $scope.query = function () {
            basicImportService.queryHotSpotCells(name).then(function (result) {
                $scope.candidateIndoorCells = result;
            });
            complainService.queryHotSpotCells(name).then(function (existedCells) {
                $scope.existedCells = existedCells;
                $scope.positionCells = [];
                networkElementService.queryRangeCells({
                    west: center.longtitute - 0.003,
                    east: center.longtitute + 0.003,
                    south: center.lattitute - 0.003,
                    north: center.lattitute + 0.003
                }).then(function (positions) {
                    neighborImportService.updateENodebRruInfo($scope.positionCells, {
                        dstCells: positions,
                        cells: existedCells,
                        longtitute: center.longtitute,
                        lattitute: center.lattitute
                    });
                });
            });
        };
        $scope.ok = function () {
            $uibModalInstance.close($scope.dto);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.importCells = function () {
            var cellNames = [];
            angular.forEach($scope.gridApi.selection.getSelectedRows(), function (cell) {
                cellNames.push(cell.cellName);
            });
            angular.forEach($scope.gridApi2.selection.getSelectedRows(), function (cell) {
                cellNames.push(cell.cellName);
            });
            collegeQueryService.saveCollegeCells({
                collegeName: name,
                cellNames: cellNames
            }).then(function () {
                $scope.query();
            });
        }
        $scope.query();
    })
    .controller('college.supplement.dialog', function ($scope, $uibModalInstance,
        customerQueryService, appFormatService, dialogTitle, view) {
        $scope.dialogTitle = dialogTitle;
        $scope.view = view;

        $scope.ok = function () {
            $scope.view.district = $scope.district.selected;
            $scope.view.town = $scope.town.selected;
            $uibModalInstance.close($scope.view);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .factory('customerDialogService', function (menuItemService, customerQueryService, emergencyService, complainService, basicImportService) {
        return {
            constructEmergencyCommunication: function (city, district, type, messages, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Customer/Dialog/Emergency.html',
                    controller: 'emergency.new.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return "新增应急通信需求";
                        },
                        city: function() {
                            return city;
                        },
                        district: function() {
                            return district;
                        },
                        vehicularType: function() {
                            return type;
                        }
                    }
                }, function(dto) {
                    customerQueryService.postDto(dto).then(function(result) {
                        if (result > 0) {
                            messages.push({
                                type: 'success',
                                contents: '完成应急通信需求：' + dto.projectName + '的导入'
                            });
                            callback();
                        } else {
                            messages.push({
                                type: 'warning',
                                contents: '最近已经有该需求，请不要重复导入'
                            });
                        }
                    });
                });
            },
            constructEmergencyCollege: function (serialNumber, collegeName, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Customer/Dialog/Emergency.html',
                    controller: 'emergency.college.dialog',
                    resolve: {
                        serialNumber: function() {
                            return serialNumber;
                        },
                        collegeName: function() {
                            return collegeName;
                        }
                    }
                }, function(dto) {
                    customerQueryService.postDto(dto).then(function(result) {
                        callback();
                    });
                });
            },
            constructHotSpot: function (callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Parameters/Import/HotSpot.html',
                    controller: 'hot.spot.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return '新增热点信息';
                        }
                    }
                }, function(dto) {
                    basicImportService.dumpOneHotSpot(dto).then(function(result) {
                        callback();
                    });
                });
            },
            manageHotSpotCells: function (hotSpot, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Parameters/Import/HotSpotCell.html',
                    controller: 'hot.spot.cell.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return hotSpot.hotspotName + '热点小区管理';
                        },
                        name: function() {
                            return hotSpot.hotspotName;
                        },
                        address: function() {
                            return hotSpot.address;
                        },
                        center: function() {
                            return {
                                longtitute: hotSpot.longtitute,
                                lattitute: hotSpot.lattitute
                            }
                        }
                    }
                }, function(dto) {
                    callback(dto);
                });
            },
            supplementVipDemandInfo: function (view, city, district, messages, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Customer/Dialog/VipSupplement.html',
                    controller: 'vip.supplement.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return "补充政企客户支撑需求信息";
                        },
                        view: function() {
                            return view;
                        },
                        city: function() {
                            return city;
                        },
                        district: function() {
                            return district;
                        }
                    }
                }, function(dto) {
                    customerQueryService.updateVip(dto).then(function() {
                        messages.push({
                            type: 'success',
                            contents: '完成政企客户支撑需求：' + dto.serialNumber + '的补充'
                        });
                        callback();
                    });
                });
            },
            supplementCollegeDemandInfo: function (view, messages) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Customer/Dialog/CollegeSupplement.html',
                    controller: 'college.supplement.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return "补充校园网支撑需求信息";
                        },
                        view: function() {
                            return view;
                        }
                    }
                }, function(dto) {
                    customerQueryService.updateVip(dto).then(function() {
                        messages.push({
                            type: 'success',
                            contents: '完成校园网支撑需求：' + dto.serialNumber + '的补充'
                        });
                    });
                });
            },
            constructFiberItem: function (id, num, callback, messages) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Customer/Dialog/Fiber.html',
                    controller: 'fiber.new.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return "新增光纤工单信息";
                        },
                        id: function() {
                            return id;
                        },
                        num: function() {
                            return num;
                        }
                    }
                }, function(item) {
                    emergencyService.createFiberItem(item).then(function(result) {
                        if (result) {
                            messages.push({
                                type: 'success',
                                contents: '完成光纤工单：' + item.workItemNumber + '的导入'
                            });
                            callback(result);
                        } else {
                            messages.push({
                                type: 'warning',
                                contents: '最近已经有该工单，请不要重复导入'
                            });
                        }
                    });
                });
            },
            supplementComplainInfo: function (item, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Customer/Dialog/Complain.html',
                    controller: 'complain.supplement.dialog',
                    resolve: {
                        item: function() {
                            return item;
                        }
                    }
                }, function(info) {
                    complainService.postPosition(info).then(function() {
                        callback();
                    });
                });
            }
        };
    })
    .factory('kpiDisplayService', function (appFormatService, coverageService, topPreciseService, calculateService, chartCalculateService,
    generalChartService) {
        return {
            generatePreciseBarOptions: function (districtStats, cityStat) {
                var chart = new BarChart();
                chart.title.text = cityStat.city + "精确覆盖率统计";
                chart.legend.enabled = false;
                var category = [];
                var precise = [];
                angular.forEach(districtStats, function (stat) {
                    category.push(stat.district);
                    precise.push(stat.preciseRate);
                });
                category.push(cityStat.city);
                precise.push(cityStat.preciseRate);
                chart.xAxis.categories = category;
                chart.xAxis.title.text = '区域';
                chart.setDefaultYAxis({
                    title: '精确覆盖率',
                    min: 70,
                    max: 100
                });
                var series = {
                    name: '精确覆盖率',
                    data: precise
                };
                chart.asignSeries(series);
                return chart.options;
            },
            generateDownSwitchOptions: function (districtStats, city, cityDownSwitch) {
                var chart = new BarChart();
                chart.title.text = city + "4G用户3G流量比统计";
                chart.legend.enabled = false;
                var category = [];
                var precise = [];
                angular.forEach(districtStats, function (stat) {
                    category.push(stat.region);
                    precise.push(stat.downSwitchRate);
                });
                category.push(city);
                precise.push(cityDownSwitch);
                chart.xAxis.categories = category;
                chart.xAxis.title.text = '区域';
                chart.setDefaultYAxis({
                    title: '4G用户3G流量比',
                    min: 0,
                    max: 10
                });
                var series = {
                    name: '4G用户3G流量比',
                    data: precise
                };
                chart.asignSeries(series);
                return chart.options;
            },
            generateComboChartOptions: function (data, name) {
                var setting = {
                    title: name,
                    xtitle: '日期',
                    ytitle: name
                };
                var categories = data.statDates;
                var dataList = [];
                var seriesTitle = [];
                var typeList = [];
                var kpiOption = appFormatService.lowerFirstLetter(name);
                var type = kpiOption === "2G呼建(%)" ? 'line' : 'column';
                angular.forEach(data.regionList, function(item, $index) {
                    typeList.push($index === data.regionList.length - 1 ? 'spline' : type);
                    dataList.push(data.kpiDetails[kpiOption][$index]);
                    seriesTitle.push(item);
                });

                return generalChartService.queryMultipleComboOptions(setting, categories, dataList, seriesTitle, typeList);
            },
            getMrsOptions: function (stats, title) {
                var chart = new ComboChart();
                chart.title.text = title;
                var categoryKey = 'dateString';
                var dataKeys = [
                    'totalMrs',
                    'firstNeighbors',
                    'secondNeighbors',
                    'thirdNeighbors'
                ];
                var seriesInfo = {
                    totalMrs: {
                        type: 'column',
                        name: "MR总数"
                    },
                    firstNeighbors: {
                        type: "spline",
                        name: "第一邻区MR数"
                    },
                    secondNeighbors: {
                        type: "spline",
                        name: "第二邻区MR数"
                    },
                    thirdNeighbors: {
                        type: "spline",
                        name: "第三邻区MR数"
                    }
                };
                var seriesData = chartCalculateService.generateSeriesInfo(seriesInfo, stats, categoryKey, dataKeys);
                chart.xAxis[0].categories = seriesData.categories;
                chart.yAxis[0].title.text = "MR数量";
                chart.xAxis[0].title.text = '日期';
                chartCalculateService.writeSeriesData(chart.series, seriesData.info, dataKeys);
                return chart.options;
            },
            getPreciseOptions: function (stats, title) {
                var chart = new ComboChart();
                chart.title.text = title;
                var statDates = [];
                var firstRate = [];
                var secondRate = [];
                var thirdRate = [];
                angular.forEach(stats, function (stat) {
                    statDates.push(stat.dateString);
                    firstRate.push(100 - parseFloat(stat.firstRate));
                    secondRate.push(100 - parseFloat(stat.secondRate));
                    thirdRate.push(100 - parseFloat(stat.thirdRate));
                });
                chart.xAxis[0].categories = statDates;
                chart.xAxis[0].title.text = '日期';
                chart.yAxis[0].title.text = "精确覆盖率";
                chart.series.push({
                    type: "spline",
                    name: "第一邻区精确覆盖率",
                    data: firstRate
                });
                chart.series.push({
                    type: "spline",
                    name: "第二邻区精确覆盖率",
                    data: secondRate
                });
                chart.series.push({
                    type: "spline",
                    name: "第三邻区精确覆盖率",
                    data: thirdRate
                });
                return chart.options;
            },
            getInterferencePieOptions: function (interferenceCells, currentCellName) {
                var over6DbPie = new GradientPie();
                var over10DbPie = new GradientPie();
                var mod3Pie = new GradientPie();
                var mod6Pie = new GradientPie();
                over6DbPie.series[0].name = '6dB干扰日平均次数';
                over10DbPie.series[0].name = '10dB干扰日平均次数';
                over6DbPie.title.text = currentCellName + ': 6dB干扰日平均次数';
                over10DbPie.title.text = currentCellName + ': 10dB干扰日平均次数';
                mod3Pie.series[0].name = 'MOD3干扰日平均次数';
                mod6Pie.series[0].name = 'MOD6干扰日平均次数';
                mod3Pie.title.text = currentCellName + ': MOD3干扰日平均次数';
                mod6Pie.title.text = currentCellName + ': MOD6干扰日平均次数';
                angular.forEach(interferenceCells, function (cell) {
                    over6DbPie.series[0].data.push({
                        name: cell.neighborCellName,
                        y: cell.overInterferences6Db
                    });
                    over10DbPie.series[0].data.push({
                        name: cell.neighborCellName,
                        y: cell.overInterferences10Db
                    });
                    if (cell.mod3Interferences > 0) {
                        mod3Pie.series[0].data.push({
                            name: cell.neighborCellName,
                            y: cell.mod3Interferences
                        });
                    }
                    if (cell.mod6Interferences > 0) {
                        mod6Pie.series[0].data.push({
                            name: cell.neighborCellName,
                            y: cell.mod6Interferences
                        });
                    }
                });
                return {
                    over6DbOption: over6DbPie.options,
                    over10DbOption: over10DbPie.options,
                    mod3Option: mod3Pie.options,
                    mod6Option: mod6Pie.options
                };
            },
            getStrengthColumnOptions: function (interferenceCells, mrCount, currentCellName) {
                var over6DbColumn = new Column3d();
                var over10DbColumn = new Column3d();
                over6DbColumn.series[0].name = '6dB干扰强度';
                over10DbColumn.series[0].name = '10dB干扰强度';
                over6DbColumn.title.text = currentCellName + ': 6dB干扰干扰强度';
                over10DbColumn.title.text = currentCellName + ': 10dB干扰干扰强度';

                angular.forEach(interferenceCells, function (cell) {
                    over6DbColumn.series[0].data.push(cell.overInterferences6Db / mrCount * 100);
                    over10DbColumn.series[0].data.push(cell.overInterferences10Db / mrCount * 100);
                    over6DbColumn.xAxis.categories.push(cell.neighborCellName);
                    over10DbColumn.xAxis.categories.push(cell.neighborCellName);
                });
                return {
                    over6DbOption: over6DbColumn.options,
                    over10DbOption: over10DbColumn.options
                };
            },
            calculatePreciseChange: function (input) {
                var preKpis = input.slice(0, 7);
                var postKpis = input.slice(input.length - 7);
                var preSum = 0;
                var postSum = 0;
                angular.forEach(preKpis, function (kpi) {
                    preSum += kpi.secondRate;
                });
                angular.forEach(postKpis, function (kpi) {
                    postSum += kpi.secondRate;
                });
                return {
                    pre: 100 - preSum / 7,
                    post: 100 - postSum / 7
                };
            },
            queryKpiOptions: function (network) {
                switch (network) {
                    case '2G':
                        return {
                            options: ['Ec/Io', 'RxAGC', 'TxPower'],
                            selected: 'Ec/Io'
                        };
                    case '3G':
                        return {
                            options: ['SINR(3G)', 'RxAGC0', 'RxAGC1'],
                            selected: 'SINR(3G)'
                        };
                    default:
                        return {
                            options: ['RSRP', 'SINR'],
                            selected: 'RSRP'
                        };
                }
            },
            queryCoverageLegend: function (kpi) {
                switch (kpi) {
                    case 'Ec/Io':
                        return {
                            criteria: coverageService.defaultEcioCriteria,
                            sign: true
                        };
                    case 'RxAGC':
                        return {
                            criteria: coverageService.defaultRxCriteria,
                            sign: true
                        };
                    case 'TxPower':
                        return {
                            criteria: coverageService.defaultTxCriteria,
                            sign: false
                        };
                    case 'SINR(3G)':
                        return {
                            criteria: coverageService.defaultSinr3GCriteria,
                            sign: true
                        };
                    case 'RxAGC0':
                        return {
                            criteria: coverageService.defaultRxCriteria,
                            sign: true
                        };
                    case 'RxAGC1':
                        return {
                            criteria: coverageService.defaultRxCriteria,
                            sign: true
                        };
                    case 'RSRP':
                        return {
                            criteria: coverageService.defaultRsrpCriteria,
                            sign: true
                        };
                    case 'rsrpInterval':
                        return {
                            criteria: coverageService.rsrpIntervalCriteria,
                            sign: true
                        };
                    case 'competeResult':
                        return {
                            criteria: coverageService.competeCriteria,
                            sign: true
                        };
                    default:
                        return {
                            criteria: coverageService.defaultSinrCriteria,
                            sign: true
                        };
                }
            },
            initializeCoveragePoints: function (legend) {
                var pointDef = {
                    sign: legend.sign,
                    intervals: []
                };
                angular.forEach(legend.criteria, function (interval) {
                    pointDef.intervals.push({
                        color: interval.color,
                        threshold: interval.threshold,
                        coors: []
                    });
                });
                pointDef.intervals.push({
                    color: "#077f07",
                    threshold: legend.sign ? 10000 : -10000,
                    coors: []
                });
                return pointDef;
            },
            generateCoveragePoints: function (pointDef, points, kpi) {
                calculateService.generateCoveragePointsWithFunc(pointDef, points, function(point) {
                    switch (kpi) {
                    case 'Ec/Io':
                        return point.ecio;
                    case 'RxAGC':
                        return point.rxAgc;
                    case 'TxPower':
                        return point.txPower;
                    case 'SINR(3G)':
                        return point.sinr;
                    case 'RxAGC0':
                        return point.rxAgc0;
                    case 'RxAGC1':
                        return point.rxAgc1;
                    case 'RSRP':
                        return point.rsrp;
                    default:
                        return point.sinr;
                    }
                });
            },
            generateMobileRsrpPoints: function(pointDef, points) {
                calculateService.generateCoveragePointsWithFunc(pointDef, points, function(point) {
                    return point.mobileRsrp;
                });
            },
            generateTelecomRsrpPoints: function (pointDef, points) {
                calculateService.generateCoveragePointsWithFunc(pointDef, points, function (point) {
                    return point.telecomRsrp;
                });
            },
            generateUnicomRsrpPoints: function (pointDef, points) {
                calculateService.generateCoveragePointsWithFunc(pointDef, points, function (point) {
                    return point.unicomRsrp;
                });
            },
            updateCoverageKpi: function (neighbor, cell, dateSpan) {
                topPreciseService.queryCoverage(dateSpan.begin, dateSpan.end,
                    cell.cellId, cell.sectorId).then(function (coverage) {
                        if (coverage.length > 0) {
                            var coverageRate = calculateService.calculateWeakCoverageRate(coverage);
                            neighbor.weakBelow115 = coverageRate.rate115;
                            neighbor.weakBelow110 = coverageRate.rate110;
                            neighbor.weakBelow105 = coverageRate.rate105;
                        }

                    });
                topPreciseService.queryTa(dateSpan.begin, dateSpan.end,
                    cell.cellId, cell.sectorId).then(function (taList) {
                        if (taList.length > 0) {
                            neighbor.overCover = calculateService.calculateOverCoverageRate(taList);
                        }
                    });
            }
        };
    })
    .constant('kpiRatingDivisionDefs', {
        precise: [94.6, 83.6, 72.6, 61.6, 50],
        downSwitch: [3, 5, 8, 10, 15],
        drop: [0.2, 0.3, 0.35, 0.4, 0.5]
    })
    .factory('appKpiService', function (chartCalculateService, generalChartService, kpiRatingDivisionDefs, flowService, calculateService) {
        return {
            getDownSwitchRate: function (stats) {
                var flow3G = 0;
                var flow4G = 0;
                angular.forEach(stats, function (stat) {
                    flow3G += stat.downSwitchFlow3G;
                    flow4G += stat.flow4G;
                });
                return 100 * flow3G / flow4G;
            },
            getCityStat: function (districtStats, currentCity) {
                var stat = {
                    city: currentCity,
                    district: "全网",
                    totalMrs: 0,
                    firstNeighbors: 0,
                    secondNeighbors: 0,
                    thirdNeighbors: 0,
                    firstRate: 0,
                    preciseRate: 0,
                    objectRate: 90
                };
                angular.forEach(districtStats, function (districtStat) {
                    calculateService.accumulatePreciseStat(stat, districtStat);
                });
                return calculateService.calculateDistrictRates(stat);
            },
            calculatePreciseRating: function (precise) {
                return calculateService.getValueFromDivisionAbove(kpiRatingDivisionDefs.precise, precise);
            },
            calculateDownSwitchRating: function (rate) {
                return calculateService.getValueFromDivisionBelow(kpiRatingDivisionDefs.downSwitch, rate);
            },
            calculateDropStar: function (drop) {
                return calculateService.getValueFromDivisionBelow(kpiRatingDivisionDefs.drop, drop);
            },
            calculateFlowStats: function (cellList, flowStats, mergeStats, beginDate, endDate) {
                flowStats.length = 0;
                mergeStats.length = 0;
                angular.forEach(cellList, function (cell) {
                    flowService.queryCellFlowByDateSpan(cell.eNodebId, cell.sectorId,
                        beginDate.value, endDate.value).then(function (flowList) {
                            cell.flowList = flowList;
                            if (flowList.length > 0) {
                                flowStats.push(chartCalculateService.calculateMemberSum(flowList, [
                                    'averageActiveUsers',
                                    'averageUsers',
                                    'maxActiveUsers',
                                    'maxUsers',
                                    'pdcpDownlinkFlow',
                                    'pdcpUplinkFlow'
                                ], function (stat) {
                                    stat.cellName = cell.eNodebName + '-' + cell.sectorId;
                                }));
                                calculateService.mergeDataByKey(mergeStats, flowList, 'statTime', [
                                    'averageActiveUsers',
                                    'averageUsers',
                                    'maxActiveUsers',
                                    'maxUsers',
                                    'pdcpDownlinkFlow',
                                    'pdcpUplinkFlow'
                                ]);
                            }
                        });
                });
            },
            getMrPieOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.totalMrs;
                }), {
                    title: "分镇区测量报告数分布图",
                    seriesName: "区域"
                }, {
                    nameFunc: function (stat) {
                        return stat.district;
                    },
                    valueFunc: function (stat) {
                        return stat.districtData;
                    }
                });
            },
            getPreciseRateOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownColumnOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.preciseRate;
                }), {
                    title: "分镇区精确覆盖率分布图",
                    seriesName: "区域"
                }, {
                    nameFunc: function (stat) {
                        return stat.district;
                    },
                    valueFunc: function (stat) {
                        return stat.districtData;
                    }
                });
            },
            getDownlinkFlowOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.pdcpDownlinkFlow / 1024 / 1024 / 8;
                }), {
                    title: "分镇区下行流量分布图（TB）",
                    seriesName: "区域"
                }, {
                    nameFunc: function (stat) {
                        return stat.district;
                    },
                    valueFunc: function (stat) {
                        return stat.districtData;
                    }
                });
            },
            getUplinkFlowOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.pdcpUplinkFlow / 1024 / 1024 / 8;
                }), {
                    title: "分镇区上行流量分布图（TB）",
                    seriesName: "区域"
                }, {
                    nameFunc: function (stat) {
                        return stat.district;
                    },
                    valueFunc: function (stat) {
                        return stat.districtData;
                    }
                });
            },
            getDownlinkRateOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownColumnOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.downlinkFeelingRate;
                }), {
                    title: "分镇区下行感知速率分布图（Mbit/s）",
                    seriesName: "区域"
                }, {
                    nameFunc: function (stat) {
                        return stat.district;
                    },
                    valueFunc: function (stat) {
                        return stat.districtData;
                    }
                });
            },
            getUplinkRateOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownColumnOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.uplinkFeelingRate;
                }), {
                    title: "分镇区上行感知速率分布图（Mbit/s）",
                    seriesName: "区域"
                }, {
                    nameFunc: function (stat) {
                        return stat.district;
                    },
                    valueFunc: function (stat) {
                        return stat.districtData;
                    }
                });
            },
            getMaxUsersOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.maxUsers;
                }), {
                    title: "分镇区最大用户数",
                    seriesName: "区域"
                }, {
                    nameFunc: function (stat) {
                        return stat.district;
                    },
                    valueFunc: function (stat) {
                        return stat.districtData;
                    }
                });
            },
            getMaxActiveUsersOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.maxActiveUsers;
                }), {
                    title: "分镇区最大激活用户数",
                    seriesName: "区域"
                }, {
                    nameFunc: function (stat) {
                        return stat.district;
                    },
                    valueFunc: function (stat) {
                        return stat.districtData;
                    }
                });
            },
            getMrsDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
                    return stat.mr;
                }), districts, {
                    title: "MR总数变化趋势图",
                    xTitle: '日期',
                    yTitle: "MR总数"
                });
            },
            getDownlinkFlowDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
                    return stat.pdcpDownlinkFlow;
                }), districts, {
                    title: "下行流量变化趋势图",
                    xTitle: '日期',
                    yTitle: "下行流量(TB)"
                });
            },
            getUplinkFlowDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
                    return stat.pdcpUplinkFlow;
                }), districts, {
                    title: "上行流量变化趋势图",
                    xTitle: '日期',
                    yTitle: "上行流量(TB)"
                });
            },
            getMaxUsersDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
                    return stat.maxUsers;
                }), districts, {
                    title: "最大用户数变化趋势图",
                    xTitle: '日期',
                    yTitle: "最大用户数"
                });
            },
            getMaxActiveUsersDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
                    return stat.maxActiveUsers;
                }), districts, {
                    title: "最大激活用户数变化趋势图",
                    xTitle: '日期',
                    yTitle: "最大激活用户数"
                });
            },
            getDownlinkRateDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
                    return stat.downlinkFeelingRate;
                }), districts, {
                    title: "下行感知速率变化趋势图",
                    xTitle: '日期',
                    yTitle: "下行感知速率（Mbit/s）"
                });
            },
            getUplinkRateDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
                    return stat.uplinkFeelingRate;
                }), districts, {
                    title: "上行感知速率变化趋势图",
                    xTitle: '日期',
                    yTitle: "上行感知速率（Mbit/s）"
                });
            },
            getPreciseDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
                    return stat.precise;
                }), districts, {
                    title: "精确覆盖率变化趋势图",
                    xTitle: '日期',
                    yTitle: "精确覆盖率"
                });
            },
            generateFlowDistrictStats: function (districts, stats) {
                return chartCalculateService.generateDistrictStats(districts, stats, {
                    districtViewFunc: function (stat) {
                        return stat.districtFlowViews;
                    },
                    initializeFunc: function (generalStat) {
                        generalStat.pdcpDownlinkFlow = 0;
                        generalStat.pdcpUplinkFlow = 0;
                    },
                    calculateFunc: function (view) {
                        return {
                            pdcpDownlinkFlow: view.pdcpDownlinkFlow / 1024 / 1024 / 8,
                            pdcpUplinkFlow: view.pdcpUplinkFlow / 1024 / 1024 / 8
                        };
                    },
                    accumulateFunc: function (generalStat, view) {
                        generalStat.pdcpDownlinkFlow += view.pdcpDownlinkFlow / 1024 / 1024 / 8;
                        generalStat.pdcpUplinkFlow += view.pdcpUplinkFlow / 1024 / 1024 / 8;
                    },
                    zeroFunc: function () {
                        return {
                            pdcpDownlinkFlow: 0,
                            pdcpUplinkFlow: 0
                        };
                    },
                    totalFunc: function (generalStat) {
                        return {
                            pdcpDownlinkFlow: generalStat.pdcpDownlinkFlow,
                            pdcpUplinkFlow: generalStat.pdcpUplinkFlow
                        }
                    }
                });
            },
            generateUsersDistrictStats: function (districts, stats) {
                return chartCalculateService.generateDistrictStats(districts, stats, {
                    districtViewFunc: function (stat) {
                        return stat.districtFlowViews;
                    },
                    initializeFunc: function (generalStat) {
                        generalStat.maxUsers = 0;
                        generalStat.maxActiveUsers = 0;
                    },
                    calculateFunc: function (view) {
                        return {
                            maxUsers: view.maxUsers,
                            maxActiveUsers: view.maxActiveUsers
                        };
                    },
                    accumulateFunc: function (generalStat, view) {
                        generalStat.maxUsers += view.maxUsers;
                        generalStat.maxActiveUsers += view.maxActiveUsers;
                    },
                    zeroFunc: function () {
                        return {
                            maxUsers: 0,
                            maxActiveUsers: 0
                        };
                    },
                    totalFunc: function (generalStat) {
                        return {
                            maxUsers: generalStat.maxUsers,
                            maxActiveUsers: generalStat.maxActiveUsers
                        }
                    }
                });
            },
            generateFeelingRateDistrictStats: function (districts, stats) {
                return chartCalculateService.generateDistrictStats(districts, stats, {
                    districtViewFunc: function (stat) {
                        return stat.districtFlowViews;
                    },
                    initializeFunc: function (generalStat) {
                        generalStat.totalUplinkDuration = 0;
                        generalStat.totalUplinkThroughput = 0;
                        generalStat.totalDownlinkDuration = 0;
                        generalStat.totalDownlinkThroughput = 0;
                    },
                    calculateFunc: function (view) {
                        return {
                            uplinkFeelingRate: view.uplinkFeelingRate,
                            downlinkFeelingRate: view.downlinkFeelingRate
                        };
                    },
                    accumulateFunc: function (generalStat, view) {
                        generalStat.totalUplinkDuration += view.uplinkFeelingDuration;
                        generalStat.totalUplinkThroughput += view.uplinkFeelingThroughput;
                        generalStat.totalDownlinkDuration += view.downlinkFeelingDuration;
                        generalStat.totalDownlinkThroughput += view.downlinkFeelingThroughput;
                    },
                    zeroFunc: function () {
                        return {
                            totalUplinkDuration: 0,
                            totalUplinkThroughput: 0,
                            totalDownlinkDuration: 0,
                            totalDownlinkThroughput: 0
                        };
                    },
                    totalFunc: function (generalStat) {
                        return {
                            uplinkFeelingRate: generalStat.totalUplinkThroughput / generalStat.totalUplinkDuration,
                            downlinkFeelingRate: generalStat.totalDownlinkThroughput / generalStat.totalDownlinkDuration
                        }
                    }
                });
            },
            generateDistrictStats: function (districts, stats) {
                return chartCalculateService.generateDistrictStats(districts, stats, {
                    districtViewFunc: function (stat) {
                        return stat.districtPreciseViews;
                    },
                    initializeFunc: function (generalStat) {
                        generalStat.totalMrs = 0;
                        generalStat.totalSecondNeighbors = 0;
                    },
                    calculateFunc: function (view) {
                        return {
                            mr: view.totalMrs,
                            precise: view.preciseRate
                        };
                    },
                    accumulateFunc: function (generalStat, view) {
                        generalStat.totalMrs += view.totalMrs;
                        generalStat.totalSecondNeighbors += view.secondNeighbors;
                    },
                    zeroFunc: function () {
                        return {
                            mr: 0,
                            precise: 0
                        };
                    },
                    totalFunc: function (generalStat) {
                        return {
                            mr: generalStat.totalMrs,
                            precise: 100 - 100 * generalStat.totalSecondNeighbors / generalStat.totalMrs
                        }
                    }
                });
            },
            calculateAverageRates: function (stats) {
                var result = {
                    statDate: "平均值",
                    values: []
                };
                if (stats.length === 0) return result;
                for (var i = 0; i < stats.length; i++) {
                    for (var j = 0; j < stats[i].values.length; j++) {
                        if (i === 0) {
                            result.values.push({
                                mr: stats[i].values[j].mr / stats.length,
                                precise: stats[i].values[j].precise / stats.length
                            });
                        } else {
                            result.values[j].mr += stats[i].values[j].mr / stats.length;
                            result.values[j].precise += stats[i].values[j].precise / stats.length;
                        }
                    }
                }
                return result;
            },
            generateTrendStatsForPie: function (trendStat, result) {
                chartCalculateService.generateStatsForPie(trendStat, result, {
                    districtViewsFunc: function (stat) {
                        return stat.districtPreciseViews;
                    },
                    townViewsFunc: function (stat) {
                        return stat.townPreciseViews;
                    },
                    accumulateFunc: function (source, accumulate) {
                        calculateService.accumulatePreciseStat(source, accumulate);
                    },
                    districtCalculate: function (stat) {
                        calculateService.calculateDistrictRates(stat);
                    },
                    townCalculate: function (stat) {
                        calculateService.calculateTownRates(stat);
                    }
                });
            },
            generateFlowTrendStatsForPie: function (trendStat, result) {
                chartCalculateService.generateStatsForPie(trendStat, result, {
                    districtViewsFunc: function (stat) {
                        return stat.districtFlowViews;
                    },
                    townViewsFunc: function (stat) {
                        return stat.townFlowViews;
                    },
                    accumulateFunc: function (source, accumulate) {
                        calculateService.accumulateFlowStat(source, accumulate);
                    }
                });
            },
            getPreciseObject: function (district) {
                var objectTable = {
                    "禅城": 89.8,
                    "南海": 90,
                    "三水": 90,
                    "高明": 90,
                    "顺德": 90.2
                };
                return objectTable[district] === undefined ? 90 : objectTable[district];
            },
            generateComplainTrendOptions: function (dates, counts, objects) {
                var chart = new TimeSeriesLine();
                chart.title.text = '月度抱怨量变化趋势图';
                chart.setDefaultXAxis({
                    title: '日期',
                    categories: dates
                });
                chart.setDefaultYAxis({
                    title: '抱怨量'
                });
                chart.insertSeries({
                    name: '指标值',
                    data: counts
                });
                chart.insertSeries({
                    name: '目标值',
                    data: objects
                });
                return chart.options;
            },
            generateColumnOptions: function (stat, title, xtitle, ytitle) {
                return generalChartService.getColumnOptions(stat, {
                    title: title,
                    xtitle: xtitle,
                    ytitle: ytitle
                }, function (data) {
                    return data.item1;
                }, function (data) {
                    return data.item2;
                });
            },
            generateDownlinkFlowOptions: function (stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '下行PDCP层流量（MB）',
                    seriesTitle: '下行PDCP层流量（MB）'
                }, function (stat) {
                    return stat.cellName;
                }, function (stat) {
                    return stat.pdcpDownlinkFlow;
                });
            },
            generateUplinkFlowOptions: function (stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '上行PDCP层流量（MB）',
                    seriesTitle: '上行PDCP层流量（MB）'
                }, function (stat) {
                    return stat.cellName;
                }, function (stat) {
                    return stat.pdcpUplinkFlow;
                });
            },
            generateMaxUsersOptions: function (stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '最大连接用户数',
                    seriesTitle: '最大连接用户数'
                }, function (stat) {
                    return stat.cellName;
                }, function (stat) {
                    return stat.maxUsers;
                });
            },
            generateAverageUsersOptions: function (stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '平均连接用户数',
                    seriesTitle: '平均连接用户数'
                }, function (stat) {
                    return stat.cellName;
                }, function (stat) {
                    return stat.averageUsers;
                });
            },
            generateMaxActiveUsersOptions: function (stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '最大激活用户数',
                    seriesTitle: '最大激活用户数'
                }, function (stat) {
                    return stat.cellName;
                }, function (stat) {
                    return stat.maxActiveUsers;
                });
            },
            generateAverageActiveUsersOptions: function (stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '平均激活用户数',
                    seriesTitle: '平均激活用户数'
                }, function (stat) {
                    return stat.cellName;
                }, function (stat) {
                    return stat.averageActiveUsers;
                });
            },
            generateMergeFlowOptions: function (stats, topic) {
                var flowData = generalChartService.generateColumnDataByKeys(stats, 'statTime', [
                'pdcpDownlinkFlow',
                'pdcpUplinkFlow'
                ]);
                return generalChartService.queryMultipleColumnOptions({
                    xtitle: '日期',
                    ytitle: '流量（MB）',
                    title: topic + '流量统计'
                }, flowData.categories, flowData.dataList, ['下行流量', '上行流量']);
            },
            generateMergeUsersOptions: function (stats, topic) {
                var usersData = generalChartService.generateColumnDataByKeys(stats, 'statTime', [
                'averageActiveUsers',
                'averageUsers',
                'maxActiveUsers',
                'maxUsers'
                ]);
                return generalChartService.queryMultipleColumnOptions({
                    xtitle: '日期',
                    ytitle: '用户数',
                    title: topic + '用户数'
                }, usersData.categories, usersData.dataList, ['平均激活用户数', '平均连接用户数', '最大激活用户数', '最大连接用户数']);
            }
        }
    })
    .controller('eNodeb.dialog', function ($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryENodebs(name).then(function (result) {
            $scope.eNodebList = result;
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.eNodebList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('bts.dialog', function ($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryBtss(name).then(function (result) {
            $scope.btsList = result;
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.btsList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('cell.dialog', function ($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryCells(name).then(function (result) {
            $scope.cellList = result;
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.cellList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('cdmaCell.dialog', function ($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryCdmaCells(name).then(function (result) {
            $scope.cdmaCellList = result;
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.cdmaCellList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('lte.distribution.dialog', function ($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryLteDistributions(name).then(function (result) {
            $scope.distributionList = result;
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.distributionList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('cdma.distribution.dialog', function ($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryCdmaDistributions(name).then(function (result) {
            $scope.distributionList = result;
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.distributionList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('year.info.dialog', function ($scope, $uibModalInstance, appFormatService,
        name, year, item) {
        $scope.dialogTitle = name + year + "年校园信息补充";
        $scope.dto = item;
        $scope.beginDate = {
            value: appFormatService.getDate(item.oldOpenDate),
            opened: false
        };
        $scope.endDate = {
            value: appFormatService.getDate(item.newOpenDate),
            opened: false
        };
        $scope.beginDate.value.setDate($scope.beginDate.value.getDate() + 365);
        $scope.endDate.value.setDate($scope.endDate.value.getDate() + 365);

        $scope.ok = function () {
            $scope.dto.oldOpenDate = $scope.beginDate.value;
            $scope.dto.newOpenDate = $scope.endDate.value;
            $scope.dto.year = year;
            $uibModalInstance.close($scope.dto);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('cell.supplement.dialog', function ($scope, $uibModalInstance, networkElementService, neighborImportService,
        eNodebs, cells, collegeName) {
        $scope.dialogTitle = collegeName + "LTE小区补充";
        $scope.supplementCells = [];
        $scope.gridApi = {};

        angular.forEach(eNodebs, function (eNodeb) {
            networkElementService.queryCellInfosInOneENodeb(eNodeb.eNodebId).then(function (cellInfos) {
                neighborImportService.updateCellRruInfo($scope.supplementCells, {
                    dstCells: cellInfos,
                    cells: cells,
                    longtitute: eNodeb.longtitute,
                    lattitute: eNodeb.lattitute
                });
            });
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.gridApi.selection.getSelectedRows());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller('cell.position.supplement.dialog', function ($scope, $uibModalInstance, collegeMapService, baiduQueryService, collegeService,
        networkElementService, neighborImportService, collegeName) {
        $scope.dialogTitle = collegeName + "LTE小区补充";
        $scope.supplementCells = [];
        $scope.gridApi = {};

        collegeMapService.queryCenterAndCallback(collegeName, function (center) {
            collegeService.queryCells(collegeName).then(function (cells) {
                baiduQueryService.transformToBaidu(center.X, center.Y).then(function (coors) {
                    collegeService.queryRange(collegeName).then(function (range) {
                        networkElementService.queryRangeCells({
                            west: range.west + center.X - coors.x,
                            east: range.east + center.X - coors.x,
                            south: range.south + center.Y - coors.y,
                            north: range.north + center.Y - coors.y
                        }).then(function (results) {
                            neighborImportService.updateENodebRruInfo($scope.supplementCells, {
                                dstCells: results,
                                cells: cells,
                                longtitute: center.X,
                                lattitute: center.Y
                            });
                        });
                    });
                });
            });
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.gridApi.selection.getSelectedRows());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller('eNodeb.supplement.dialog', function ($scope, $uibModalInstance, networkElementService, geometryService,
        baiduQueryService, collegeService,
        center, collegeName) {
        $scope.dialogTitle = collegeName + "LTE基站补充";
        $scope.supplementCells = [];
        $scope.gridOptions = {
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            showGridFooter: true
        };
        $scope.gridOptions.multiSelect = true;
        $scope.gridOptions.columnDefs = [
            { field: 'eNodebId', name: 'LTE基站编号' },
            { field: 'name', name: '基站名称', width: 120 },
            { field: 'planNum', name: '规划编号' },
            { field: 'openDate', name: '入网日期', cellFilter: 'date: "yyyy-MM-dd"' },
            { field: 'address', name: '地址', width: 300, enableColumnResizing: false },
            { field: 'factory', name: '厂家' },
            {
                name: 'IP',
                cellTemplate: '<span class="text-primary">{{row.entity.ip.addressString}}</span>',
                width: 100
            },
            { name: '与中心距离', field: 'distance', cellFilter: 'number: 2' }
        ];

        baiduQueryService.transformToBaidu(center.X, center.Y).then(function (coors) {
            collegeService.queryRange(collegeName).then(function (range) {
                var ids = [];
                collegeService.queryENodebs(collegeName).then(function (eNodebs) {
                    angular.forEach(eNodebs, function (eNodeb) {
                        ids.push(eNodeb.eNodebId);
                    });
                    networkElementService.queryRangeENodebs({
                        west: range.west + center.X - coors.x,
                        east: range.east + center.X - coors.x,
                        south: range.south + center.Y - coors.y,
                        north: range.north + center.Y - coors.y,
                        excludedIds: ids
                    }).then(function (results) {
                        angular.forEach(results, function (item) {
                            item.distance = geometryService.getDistance(item.lattitute, item.longtitute, coors.y, coors.x);
                        });
                        $scope.gridOptions.data = results;
                    });
                });
            });
        });

        $scope.gridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.gridApi.selection.getSelectedRows());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller('bts.supplement.dialog', function ($scope, $uibModalInstance, networkElementService, geometryService, baiduQueryService,
        collegeService, center, collegeName) {
        $scope.dialogTitle = collegeName + "CDMA基站补充";
        $scope.supplementCells = [];
        $scope.gridOptions = {
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            showGridFooter: true
        };
        $scope.gridOptions.multiSelect = true;
        $scope.gridOptions.columnDefs = [
            { field: 'btsId', name: 'CDMA基站编号' },
            { field: 'name', name: '基站名称', width: 120 },
            { field: 'btsId', name: 'BSC编号' },
            { field: 'longtitute', name: '经度' },
            { field: 'lattitute', name: '纬度' },
            { field: 'address', name: '地址', width: 300, enableColumnResizing: false },
            { field: 'isInUse', name: '是否在用', cellFilter: 'yesNoChinese' },
            { name: '与中心距离', field: 'distance', cellFilter: 'number: 2' }
        ];

        baiduQueryService.transformToBaidu(center.X, center.Y).then(function (coors) {
            collegeService.queryRange(collegeName).then(function (range) {
                var ids = [];
                collegeService.queryBtss(collegeName).then(function (btss) {
                    angular.forEach(btss, function (bts) {
                        ids.push(bts.btsId);
                    });
                    networkElementService.queryRangeBtss({
                        west: range.west + center.X - coors.x,
                        east: range.east + center.X - coors.x,
                        south: range.south + center.Y - coors.y,
                        north: range.north + center.Y - coors.y,
                        excludedIds: ids
                    }).then(function (results) {
                        angular.forEach(results, function (item) {
                            item.distance = geometryService.getDistance(item.lattitute, item.longtitute, coors.y, coors.x);
                        });
                        $scope.supplementCells = results;
                        $scope.gridOptions.data = results;
                    });
                });
            });
        });

        $scope.gridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.gridApi.selection.getSelectedRows());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('college.test3G.dialog', function ($scope, $uibModalInstance, collegeName,
        collegeDtService, coverageService, collegeMapService, baiduQueryService) {
        $scope.dialogTitle = collegeName + "-3G测试结果上报";
        $scope.item = collegeDtService.default3GTestView(collegeName, '饭堂', '许良镇');

        var queryRasterInfo = function (files, index, data, callback) {
            coverageService.queryDetailsByRasterInfo(files[index], '3G').then(function (result) {
                data.push.apply(data, result);
                if (index < files.length - 1) {
                    queryRasterInfo(files, index + 1, data, callback);
                } else {
                    callback(data);
                }
            });
        };
        collegeMapService.queryCenterAndCallback(collegeName, function (center) {
            baiduQueryService.transformToBaidu(center.X, center.Y).then(function (coors) {
                $scope.center = {
                    centerX: 2 * center.X - coors.x,
                    centerY: 2 * center.Y - coors.y
                };
            });
        });

        $scope.matchCoverage = function () {
            collegeDtService.queryRaster($scope.center, '3G', $scope.beginDate.value, $scope.endDate.value, function (files) {
                if (files.length) {
                    var data = [];
                    queryRasterInfo(files, 0, data, function (result) {
                        console.log(result);
                    });
                }
            });
        };
        $scope.ok = function () {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('college.test4G.dialog', function ($scope, $uibModalInstance, collegeName,
        collegeDtService, collegeService, networkElementService, collegeMapService, baiduQueryService, coverageService, appFormatService) {
        $scope.dialogTitle = collegeName + "-4G测试结果上报";
        $scope.item = collegeDtService.default4GTestView(collegeName, '饭堂', '许良镇');
        collegeService.queryCells(collegeName).then(function (cellList) {
            var names = [];
            angular.forEach(cellList, function (cell) {
                names.push(cell.cellName);
            });
            $scope.cellName = {
                options: names,
                selected: names[0]
            };
        });
        collegeMapService.queryCenterAndCallback(collegeName, function (center) {
            baiduQueryService.transformToBaidu(center.X, center.Y).then(function (coors) {
                $scope.center = {
                    centerX: 2 * center.X - coors.x,
                    centerY: 2 * center.Y - coors.y
                };
            });
        });
        $scope.$watch('cellName.selected', function (cellName) {
            if (cellName) {
                networkElementService.queryLteRruFromCellName(cellName).then(function (rru) {
                    $scope.rru = rru;
                });
            }
        });

        var queryRasterInfo = function (files, index, data, callback) {
            coverageService.queryDetailsByRasterInfo(files[index], '4G').then(function (result) {
                data.push.apply(data, result);
                if (index < files.length - 1) {
                    queryRasterInfo(files, index + 1, data, callback);
                } else {
                    callback(data);
                }
            });
        };

        $scope.matchCoverage = function () {
            collegeDtService.queryRaster($scope.center, '4G', $scope.beginDate.value, $scope.endDate.value, function (files) {
                if (files.length) {
                    var data = [];
                    queryRasterInfo(files, 0, data, function (result) {
                        var testEvaluations = appFormatService.calculateAverages(result, [
                            function (point) {
                                return point.rsrp;
                            }, function (point) {
                                return point.sinr;
                            }, function (point) {
                                return point.pdcpThroughputDl > 10 ? point.pdcpThroughputDl : 0;
                            }, function (point) {
                                return point.pdcpThroughputUl > 1 ? point.pdcpThroughputUl : 0;
                            }
                        ]);
                        $scope.item.rsrp = testEvaluations[0].sum / testEvaluations[0].count;
                        $scope.item.sinr = testEvaluations[1].sum / testEvaluations[1].count;
                        $scope.item.downloadRate = testEvaluations[2].sum / testEvaluations[2].count * 1024;
                        $scope.item.uploadRate = testEvaluations[3].sum / testEvaluations[3].count * 1024;
                    });
                }
            });
        };

        $scope.ok = function () {
            $scope.item.cellName = $scope.cellName.selected;
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('test.process.dialog', function ($scope, $uibModalInstance, collegeName, collegeQueryService, appFormatService) {
        $scope.dialogTitle = collegeName + "校园网测试信息确认";

        $scope.query = function () {
            collegeQueryService.queryCollege3GTestList($scope.beginDate.value, $scope.endDate.value, collegeName).then(function (test3G) {
                $scope.items3G = test3G;
            });
            collegeQueryService.queryCollege4GTestList($scope.beginDate.value, $scope.endDate.value, collegeName).then(function (test4G) {
                $scope.items4G = test4G;
                var testEvaluations = appFormatService.calculateAverages(test4G, [
                    function (point) {
                        return point.rsrp;
                    }, function (point) {
                        return point.sinr;
                    }, function (point) {
                        return point.downloadRate;
                    }, function (point) {
                        return point.uploadRate;
                    }
                ]);
                $scope.averageRsrp = testEvaluations[0].sum / testEvaluations[0].count;
                $scope.averageSinr = testEvaluations[1].sum / testEvaluations[1].count;
                $scope.averageDownloadRate = testEvaluations[2].sum / testEvaluations[2].count;
                $scope.averageUploadRate = testEvaluations[3].sum / testEvaluations[3].count;
            });
        };
        $scope.query();

        $scope.ok = function () {
            $uibModalInstance.close($("#reports").html());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('trace.planning.dialog', function ($scope, $uibModalInstance, collegeName,
        baiduQueryService, collegeService, networkElementService, collegeMapService) {
        $scope.dialogTitle = collegeName + "校园网规划站点跟踪";

        collegeMapService.queryCenterAndCallback(collegeName, function (center) {
            baiduQueryService.transformToBaidu(center.X, center.Y).then(function (coors) {
                collegeService.queryRange(collegeName).then(function (range) {
                    networkElementService.queryRangePlanningSites({
                        west: range.west + center.X - coors.x,
                        east: range.east + center.X - coors.x,
                        south: range.south + center.Y - coors.y,
                        north: range.north + center.Y - coors.y
                    }).then(function (results) {
                        $scope.items = results;
                    });
                });
            });
        });

        $scope.ok = function () {
            $uibModalInstance.close($("#reports").html());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('map.college.dialog', function ($scope, $uibModalInstance, college, year, dialogTitle,
        collegeQueryService, generalChartService, parametersChartService, emergencyService) {
        $scope.college = college;
        $scope.dialogTitle = dialogTitle;
        $scope.query = function () {
            collegeQueryService.queryCollegeDateFlows(college.name, $scope.beginDate.value, $scope.endDate.value).then(function (stats) {
                var result = generalChartService.generateColumnData(stats, function (stat) {
                    return stat.statTime;
                }, [
                    function (stat) {
                        return stat.pdcpDownlinkFlow;
                    }, function (stat) {
                        return stat.pdcpUplinkFlow;
                    }, function (stat) {
                        return stat.averageUsers;
                    }, function (stat) {
                        return stat.maxActiveUsers;
                    }
                ]);
                $("#flowConfig").highcharts(parametersChartService.getDateFlowOptions(result, 0, 1));
                $("#usersConfig").highcharts(parametersChartService.getDateUsersOptions(result, 2, 3));
            });
        };
        $scope.query();
        collegeQueryService.queryByNameAndYear(college.name, year).then(function (info) {
            if (info) {
                $scope.college.expectedSubscribers = info.expectedSubscribers;
                $scope.college.oldOpenDate = info.oldOpenDate;
                $scope.college.newOpenDate = info.newOpenDate;
            }
        });
        emergencyService.queryCollegeVipDemand(year, college.name).then(function (item) {
            if (item) {
                $scope.college.serialNumber = item.serialNumber;
                $scope.college.currentStateDescription = item.currentStateDescription;
            }
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.college);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('college.new.dialog', function ($scope, $uibModalInstance, baiduMapService, geometryService, baiduQueryService, appRegionService, $timeout) {
        $scope.dialogTitle = "新建校园信息";
        $scope.collegeRegion = {
            area: 0,
            regionType: 0,
            info: ""
        };
        $scope.saveCircleParameters = function (circle) {
            var center = circle.getCenter();
            var radius = circle.getRadius();
            $scope.collegeRegion.regionType = 0;
            $scope.collegeRegion.area = BMapLib.GeoUtils.getCircleArea(circle);
            $scope.collegeRegion.info = center.lng + ';' + center.lat + ';' + radius;
        };
        $scope.saveRetangleParameters = function (rect) {
            $scope.collegeRegion.regionType = 1;
            var pts = rect.getPath();
            $scope.collegeRegion.info = geometryService.getPathInfo(pts);
            $scope.collegeRegion.area = BMapLib.GeoUtils.getPolygonArea(pts);
        };
        $scope.savePolygonParameters = function (polygon) {
            $scope.collegeRegion.regionType = 2;
            var pts = polygon.getPath();
            $scope.collegeRegion.info = geometryService.getPathInfo(pts);
            $scope.collegeRegion.area = BMapLib.GeoUtils.getPolygonArea(pts);
        };
        $timeout(function () {
            baiduMapService.initializeMap('map', 12);
            baiduMapService.initializeDrawingManager();
            baiduMapService.addDrawingEventListener('circlecomplete', $scope.saveCircleParameters);
            baiduMapService.addDrawingEventListener('rectanglecomplete', $scope.saveRetangleParameters);
            baiduMapService.addDrawingEventListener('polygoncomplete', $scope.savePolygonParameters);
        }, 500);
        $scope.matchPlace = function () {
            baiduQueryService.queryBaiduPlace($scope.collegeName).then(function (result) {
                angular.forEach(result, function (place) {
                    var marker = baiduMapService.generateMarker(place.location.lng, place.location.lat);
                    baiduMapService.addOneMarker(marker);
                    baiduMapService.drawLabel(place.name, place.location.lng, place.location.lat);
                });
            });
        };
        $scope.ok = function () {
            $scope.college = {
                name: $scope.collegeName,
                townId: 0,
                collegeRegion: $scope.collegeRegion
            };
            appRegionService.queryTown($scope.city.selected, $scope.district.selected, $scope.town.selected).then(function (town) {
                if (town) {
                    $scope.college.townId = town.id;
                    $uibModalInstance.close($scope.college);
                }
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .value('collegeInfrastructurePath', '/appViews/College/Infrastructure/')
    .value('collegeTestPath', '/appViews/College/Test/')
    .factory('collegeDialogService', function (collegeInfrastructurePath, collegeTestPath,
        collegeQueryService, menuItemService) {
        var resolveScope = function (name, topic) {
            return {
                dialogTitle: function () {
                    return name + "-" + topic;
                },
                name: function () {
                    return name;
                }
            };
        };
        return {
            showENodebs: function (name) {
                menuItemService.showGeneralDialog({
                    templateUrl: collegeInfrastructurePath + 'ENodebDialog.html',
                    controller: 'eNodeb.dialog',
                    resolve: resolveScope(name, "LTE基站信息")
                });
            },
            showCells: function (name) {
                menuItemService.showGeneralDialog({
                    templateUrl: collegeInfrastructurePath + 'LteCellDialog.html',
                    controller: 'cell.dialog',
                    resolve: resolveScope(name, "LTE小区信息")
                });
            },
            showBtss: function (name) {
                menuItemService.showGeneralDialog({
                    templateUrl: collegeInfrastructurePath + 'BtsDialog.html',
                    controller: 'bts.dialog',
                    resolve: resolveScope(name, "CDMA基站信息")
                });
            },
            showCdmaCells: function (name) {
                menuItemService.showGeneralDialog({
                    templateUrl: collegeInfrastructurePath + 'CdmaCellDialog.html',
                    controller: 'cdmaCell.dialog',
                    resolve: resolveScope(name, "CDMA小区信息")
                });
            },
            showLteDistributions: function (name) {
                menuItemService.showGeneralDialog({
                    templateUrl: collegeInfrastructurePath + 'DistributionDialog.html',
                    controller: 'lte.distribution.dialog',
                    resolve: resolveScope(name, "LTE室分信息")
                });
            },
            showCdmaDistributions: function (name) {
                menuItemService.showGeneralDialog({
                    templateUrl: collegeInfrastructurePath + 'DistributionDialog.html',
                    controller: 'cdma.distribution.dialog',
                    resolve: resolveScope(name, "CDMA室分信息")
                });
            },
            addYearInfo: function (item, name, year, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: collegeInfrastructurePath + 'YearInfoDialog.html',
                    controller: 'year.info.dialog',
                    resolve: {
                        name: function() {
                            return name;
                        },
                        year: function() {
                            return year;
                        },
                        item: function() {
                            return item;
                        }
                    }
                }, function(info) {
                    collegeQueryService.saveYearInfo(info).then(function() {
                        callback();
                    });
                });
            },
            addNewCollege: function (callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: collegeInfrastructurePath + 'NewCollegeDialog.html',
                    controller: 'college.new.dialog',
                    resolve: {}
                }, function(info) {
                    collegeQueryService.constructCollegeInfo(info).then(function() {
                        callback();
                    });
                });
            },
            supplementENodebCells: function (eNodebs, cells, collegeName, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: collegeInfrastructurePath + 'CellSupplementDialog.html',
                    controller: 'cell.supplement.dialog',
                    resolve: {
                        eNodebs: function() {
                            return eNodebs;
                        },
                        cells: function() {
                            return cells;
                        },
                        collegeName: function() {
                            return collegeName;
                        }
                    }
                }, function(info) {
                    var cellNames = [];
                    angular.forEach(info, function(cell) {
                        cellNames.push(cell.cellName);
                    });
                    collegeQueryService.saveCollegeCells({
                        collegeName: collegeName,
                        cellNames: cellNames
                    }).then(function() {
                        callback();
                    });

                });
            },
            supplementPositionCells: function (collegeName, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: collegeInfrastructurePath + 'CellSupplementDialog.html',
                    controller: 'cell.position.supplement.dialog',
                    resolve: {
                        collegeName: function() {
                            return collegeName;
                        }
                    }
                }, function(info) {
                    var cellNames = [];
                    angular.forEach(info, function(cell) {
                        cellNames.push(cell.cellName);
                    });
                    collegeQueryService.saveCollegeCells({
                        collegeName: collegeName,
                        cellNames: cellNames
                    }).then(function() {
                        callback();
                    });

                });
            },
            construct3GTest: function (collegeName) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: collegeTestPath + 'Construct3GTest.html',
                    controller: 'college.test3G.dialog',
                    resolve: {
                        collegeName: function() {
                            return collegeName;
                        }
                    }
                }, function(info) {
                    collegeQueryService.saveCollege3GTest(info).then(function() {
                        console.log(info);
                    });
                });
            },
            construct4GTest: function (collegeName) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: collegeTestPath + 'Construct4GTest.html',
                    controller: 'college.test4G.dialog',
                    resolve: {
                        collegeName: function() {
                            return collegeName;
                        }
                    }
                }, function(info) {
                    collegeQueryService.saveCollege4GTest(info).then(function() {
                        console.log(info);
                    });
                });
            },
            processTest: function (collegeName, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: collegeTestPath + 'Process.html',
                    controller: 'test.process.dialog',
                    resolve: {
                        collegeName: function() {
                            return collegeName;
                        }
                    }
                }, function(info) {
                    callback(info);
                });
            },
            tracePlanning: function (collegeName, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: collegeTestPath + 'Planning.html',
                    controller: 'trace.planning.dialog',
                    resolve: {
                        collegeName: function() {
                            return collegeName;
                        }
                    }
                }, function(info) {
                    callback(info);
                });
            },
            showCollegDialog: function (college, year) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/College/Table/CollegeMapInfoBox.html',
                    controller: 'map.college.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return college.name + "-" + "基本信息";
                        },
                        college: function() {
                            return college;
                        },
                        year: function() {
                            return year;
                        }
                    }
                });
            },
            addENodeb: function (collegeName, center, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/College/Infrastructure/CellSupplementDialog.html',
                    controller: 'eNodeb.supplement.dialog',
                    resolve: {
                        collegeName: function() {
                            return collegeName;
                        },
                        center: function() {
                            return center;
                        }
                    }
                }, function(info) {
                    var ids = [];
                    angular.forEach(info, function(eNodeb) {
                        ids.push(eNodeb.eNodebId);
                    });
                    collegeQueryService.saveCollegeENodebs({
                        collegeName: collegeName,
                        eNodebIds: ids
                    }).then(function(count) {
                        callback(count);
                    });
                });
            },
            addBts: function (collegeName, center, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/College/Infrastructure/CellSupplementDialog.html',
                    controller: 'bts.supplement.dialog',
                    resolve: {
                        collegeName: function() {
                            return collegeName;
                        },
                        center: function() {
                            return center;
                        }
                    }
                }, function(info) {
                    var ids = [];
                    angular.forEach(info, function(bts) {
                        ids.push(bts.btsId);
                    });
                    collegeQueryService.saveCollegeBtss({
                        collegeName: collegeName,
                        btsIds: ids
                    }).then(function(count) {
                        callback(count);
                    });
                });
            }
        };
    });