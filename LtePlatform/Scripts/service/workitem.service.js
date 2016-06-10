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
    .factory('showPieChart', function() {
        return {
            type: function(views, tag) {
                var stats = [];
                var i;
                for (i = 0; i < views.length; i++) {
                    var type = views[i].workItemType;
                    var subType = views[i].workItemSubType;
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
                }

                var chart = new DrilldownPie();
                chart.title.text = "工单类型分布图";
                chart.series[0].data = [];
                chart.drilldown.series = [];
                chart.series[0].name = "工单类型";
                for (i = 0; i < stats.length; i++) {
                    chart.addOneSeries(stats[i].type, stats[i].total, stats[i].subData);
                }
                $(tag).highcharts(chart.options);
            },

            state: function(views, tag) {
                var stats = [];
                var i;
                for (i = 0; i < views.length; i++) {
                    var state = views[i].workItemState;
                    var subType = views[i].workItemSubType;
                    var j;
                    for (j = 0; j < stats.length; j++) {
                        if (stats[j].state === state) {
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
                            state: state,
                            total: 1,
                            subData: [[subType, 1]]
                        });
                    }
                }

                var chart = new DrilldownPie();
                chart.title.text = "工单状态分布图";
                chart.series[0].data = [];
                chart.drilldown.series = [];
                chart.series[0].name = "工单状态";
                for (i = 0; i < stats.length; i++) {
                    chart.addOneSeries(stats[i].state, stats[i].total, stats[i].subData);
                }
                $(tag).highcharts(chart.options);
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
    });