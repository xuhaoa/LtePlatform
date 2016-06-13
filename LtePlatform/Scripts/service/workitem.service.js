angular.module('kpi.workitem', ['myApp.url', "ui.bootstrap"])
    .factory('workitemService', function($q, $http, appUrlService) {
        return {
            queryWithPaging: function(state, type, itemsPerPage, page) {
                var deferred = $q.defer();
                $http({
                        method: 'GET',
                        url: appUrlService.getApiUrl('WorkItem'),
                        params: {
                            'statCondition': state,
                            'typeCondition': type,
                            'itemsPerPage': itemsPerPage,
                            'page': page
                        },
                        headers: {
                            'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            queryWithPagingByDistrict: function(state, type, district, itemsPerPage, page) {
                var deferred = $q.defer();
                $http({
                        method: 'GET',
                        url: appUrlService.getApiUrl('WorkItem'),
                        params: {
                            statCondition: state,
                            typeCondition: type,
                            district: district,
                            itemsPerPage: itemsPerPage,
                            page: page
                        },
                        headers: {
                            'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            queryTotalPages: function(state, type) {
                var deferred = $q.defer();
                $http({
                        method: 'GET',
                        url: appUrlService.getApiUrl('WorkItem'),
                        params: {
                            'statCondition': state,
                            'typeCondition': type
                        },
                        headers: {
                            'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            queryTotalPagesByDistrict: function(state, type, district) {
                var deferred = $q.defer();
                $http({
                        method: 'GET',
                        url: appUrlService.getApiUrl('WorkItem'),
                        params: {
                            statCondition: state,
                            typeCondition: type,
                            district: district
                        },
                        headers: {
                            'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            querySingleItem: function(serialNumber) {
                var deferred = $q.defer();
                $http({
                        method: 'GET',
                        url: appUrlService.getApiUrl('WorkItem'),
                        params: {
                            serialNumber: serialNumber
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            signIn: function(serialNumber) {
                var deferred = $q.defer();
                $http({
                        method: 'GET',
                        url: appUrlService.getApiUrl('WorkItem'),
                        params: {
                            signinNumber: serialNumber
                        },
                        headers: {
                            'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            queryChartData: function() {
                var deferred = $q.defer();
                $http({
                        method: 'GET',
                        url: appUrlService.getApiUrl('WorkItem'),
                        headers: {
                            'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            updateSectorIds: function() {
                var deferred = $q.defer();
                $http.put(appUrlService.getApiUrl('WorkItem')).success(function(result) {
                        deferred.resolve(result);
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            feedback: function(message, serialNumber) {
                var deferred = $q.defer();
                $http({
                        method: 'POST',
                        url: appUrlService.getApiUrl('WorkItem'),
                        data: {
                            message: message,
                            serialNumber: serialNumber
                        },
                        headers: {
                            'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            queryByENodebId: function(eNodebId) {
                var deferred = $q.defer();
                $http({
                        method: 'GET',
                        url: appUrlService.getApiUrl('WorkItem'),
                        params: {
                            eNodebId: eNodebId
                        },
                        headers: {
                            'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            queryByCellId: function(eNodebId, sectorId) {
                var deferred = $q.defer();
                $http({
                        method: 'GET',
                        url: appUrlService.getApiUrl('WorkItem'),
                        params: {
                            eNodebId: eNodebId,
                            sectorId: sectorId
                        },
                        headers: {
                            'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            queryCurrentMonth: function() {
                var deferred = $q.defer();
                $http({
                        method: 'GET',
                        url: appUrlService.getApiUrl('WorkItemCurrentMonth')
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            constructPreciseItem: function(cell, begin, end) {
                var deferred = $q.defer();
                $http({
                        method: 'POST',
                        url: appUrlService.getApiUrl('PreciseWorkItem'),
                        data: {
                            view: cell,
                            begin: begin,
                            end: end
                        },
                        headers: {
                            'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            }
        };
    })
    .factory('preciseWorkItemService', function($q, $http, appUrlService) {
        return {
            queryByDateSpanDistrict: function(begin, end, district) {
                var deferred = $q.defer();
                $http({
                        method: 'GET',
                        url: appUrlService.getApiUrl('PreciseWorkItem'),
                        params: {
                            begin: begin,
                            end: end,
                            district: district
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            queryByDateSpan: function(begin, end) {
                var deferred = $q.defer();
                $http({
                        method: 'GET',
                        url: appUrlService.getApiUrl('PreciseWorkItem'),
                        params: {
                            begin: begin,
                            end: end
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            queryBySerial: function(number) {
                var deferred = $q.defer();
                $http({
                        method: 'GET',
                        url: appUrlService.getApiUrl('PreciseWorkItem'),
                        params: {
                            number: number
                        },
                        headers: {
                            'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            updateInterferenceNeighbor: function(number, items) {
                var deferred = $q.defer();
                $http({
                        method: 'POST',
                        url: appUrlService.getApiUrl('InterferenceNeighborWorkItem'),
                        data: {
                            workItemNumber: number,
                            items: items
                        },
                        headers: {
                            'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            updateInterferenceVictim: function(number, items) {
                var deferred = $q.defer();
                $http({
                        method: 'POST',
                        url: appUrlService.getApiUrl('InterferenceVictimWorkItem'),
                        data: {
                            workItemNumber: number,
                            items: items
                        },
                        headers: {
                            'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            updateCoverage: function(number, items) {
                var deferred = $q.defer();
                $http({
                        method: 'POST',
                        url: appUrlService.getApiUrl('CoverageWorkItem'),
                        data: {
                            workItemNumber: number,
                            items: items
                        },
                        headers: {
                            'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            }
        };
    })
    .factory('preciseChartService', function() {
        var updateCpmpoundStats = function(stats, type, subType) {
            var j;
            for (j = 0; j < stats.length; j++) {
                if (stats[j].type === type) {
                    stats[j].total++;
                    var subData = stats[j].subData;
                    var k;
                    for (k = 0; k < subData.length; k++) {
                        if (subData[k][0] === subType) {
                            subData[k][1]++;
                            break;
                        }
                    }
                    if (k === subData.length) {
                        subData.push([subType, 1]);
                    }
                    break;
                }
            }
            if (j === stats.length) {
                stats.push({
                    type: type,
                    total: 1,
                    subData: [[subType, 1]]
                });
            }
        };
        var generateCompoundStatsForType = function(views) {
            var stats = [];
            angular.forEach(views, function(view) {
                var type = view.workItemType;
                var subType = view.workItemSubType;
                updateCpmpoundStats(stats, type, subType);
            });
            return stats;
        };
        var generateCompoundStatsForState = function(views) {
            var stats = [];
            angular.forEach(views, function(view) {
                var type = view.workItemState;
                var subType = view.workItemSubType;
                updateCpmpoundStats(stats, type, subType);
            });
            return stats;
        };
        return {
            getTypeOption: function(views) {
                var stats = generateCompoundStatsForType(views);

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
                var stats = generateCompoundStatsForState(views);

                var chart = new DrilldownPie();
                chart.title.text = "工单状态分布图";
                chart.series[0].data = [];
                chart.drilldown.series = [];
                chart.series[0].name = "工单状态";
                angular.forEach(stats, function(stat) {
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
                        if (result)
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