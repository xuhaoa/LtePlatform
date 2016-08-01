angular.module('kpi.workitem', ['myApp.url', "ui.bootstrap"])
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
            finish: function(comments, finishNumber){
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
    .factory('dumpWorkItemService', function(generalHttpService) {
        return {
            dumpSingleItem: function() {
                return generalHttpService.putApiData('DumpWorkItem', {});
            },
            clearImportItems: function() {
                return generalHttpService.deleteApiData('DumpWorkItem');
            },
            queryTotalDumpItems: function() {
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
    .factory('preciseChartService', function() {
        var updateCompoundStats = function(stats, type, subType, total) {
            var j;
            for (j = 0; j < stats.length; j++) {
                if (stats[j].type === type) {
                    stats[j].total += total;
                    stats[j].subData.push([subType, total]);
                    break;
                }
            }
            if (j === stats.length) {
                stats.push({
                    type: type,
                    total: total,
                    subData: [[subType, total]]
                });
            }
        };
        var generateCompoundStats = function(views) {
            var stats = [];
            angular.forEach(views, function(view) {
                var type = view.type;
                var subType = view.subType;
                var total = view.total;
                updateCompoundStats(stats, type, subType, total);
            });
            return stats;
        };
        return {
            getTypeOption: function(views) {
                var stats = generateCompoundStats(views);

                var chart = new DrilldownPie();
                chart.title.text = "工单类型分布图";
                chart.series[0].data = [];
                chart.drilldown.series = [];
                chart.series[0].name = "工单类型";
                angular.forEach(stats, function(stat) {
                    chart.addOneSeries(stat.type, stat.total, stat.subData);
                });
                return chart.options;
            },

            getStateOption: function(views) {
                var stats = generateCompoundStats(views);

                var chart = new DrilldownPie();
                chart.title.text = "工单状态分布图";
                chart.series[0].data = [];
                chart.drilldown.series = [];
                chart.series[0].name = "工单状态";
                angular.forEach(stats, function(stat) {
                    chart.addOneSeries(stat.type, stat.total, stat.subData);
                });
                return chart.options;
            },

            getDistrictOption: function (views) {
                var stats = generateCompoundStats(views);

                var chart = new DrilldownPie();
                chart.title.text = "工单镇区分布图";
                chart.series[0].data = [];
                chart.drilldown.series = [];
                chart.series[0].name = "镇区";
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries(stat.type, stat.total, stat.subData);
                });
                return chart.options;
            }
        }
    })
    .factory('workItemDialog', function($uibModal, $log, workitemService) {
        return {
            feedback: function(view, callbackFunc) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/WorkItem/FeedbackDialog.html',
                    controller: 'workitem.feedback.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function() {
                            return view.serialNumber + "工单反馈";
                        },
                        input: function() {
                            return view;
                        }
                    }
                });

                modalInstance.result.then(function(output) {
                    workitemService.feedback(output, view.serialNumber).then(function(result) {
                        if (result && callbackFunc)
                            callbackFunc();
                    });
                }, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showDetails: function(view, callbackFunc) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/WorkItem/DetailsDialog.html',
                    controller: 'workitem.details.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function() {
                            return view.serialNumber + "工单信息";
                        },
                        input: function() {
                            return view;
                        }
                    }
                });

                modalInstance.result.then(function() {
                    if (callbackFunc) callbackFunc();
                }, function() {
                    if (callbackFunc) callbackFunc();
                });
            },
            calculatePlatformInfo: function(comments) {
                var platformInfos = [];
                if (comments) {
                    var fields = comments.split('[');
                    if (fields.length > 1) {
                        angular.forEach(fields, function(field) {
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
    .factory('preciseWorkItemGenerator', function() {
        return {
            generatePreciseInterferenceNeighborDtos: function (sources) {
                var sumDb6Share = 0;
                var sumDb10Share = 0;
                var sumMod3Share = 0;
                var sumMod6Share = 0;
                var dtos = [];
                angular.forEach(sources, function(source) {
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
    });