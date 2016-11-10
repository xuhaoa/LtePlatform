angular.module('myApp.region', ['myApp.url'])
    .factory('parametersChartService', function (generalChartService) {
        return {
            getDistrictLteENodebPieOptions: function (data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区LTE基站数分布",
                    seriesTitle: "区域"
                }, function (subData) {
                    return subData.district;
                }, function (subData) {
                    return subData.totalLteENodebs;
                });
            },
            getDistrictLteCellPieOptions: function (data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区LTE小区数分布",
                    seriesTitle: "区域"
                }, function (subData) {
                    return subData.district;
                }, function (subData) {
                    return subData.totalLteCells;
                });
            },
            getDistrictCdmaBtsPieOptions: function (data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区CDMA基站数分布",
                    seriesTitle: "区域"
                }, function (subData) {
                    return subData.district;
                }, function (subData) {
                    return subData.totalCdmaBts;
                });
            },
            getDistrictCdmaCellPieOptions: function (data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区CDMA小区数分布",
                    seriesTitle: "区域"
                }, function (subData) {
                    return subData.district;
                }, function (subData) {
                    return subData.totalCdmaCells;
                });
            },
            getTownLteENodebPieOptions: function (data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇LTE基站数分布",
                    seriesTitle: "镇"
                }, function (subData) {
                    return subData.town;
                }, function (subData) {
                    return subData.totalLteENodebs;
                });
            },
            getTownLteCellPieOptions: function (data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇LTE小区数分布",
                    seriesTitle: "镇"
                }, function (subData) {
                    return subData.town;
                }, function (subData) {
                    return subData.totalLteCells;
                });
            },
            getTownCdmaBtsPieOptions: function (data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇CDMA基站数分布",
                    seriesTitle: "镇"
                }, function (subData) {
                    return subData.town;
                }, function (subData) {
                    return subData.totalCdmaBts;
                });
            },
            getTownCdmaCellPieOptions: function (data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇CDMA小区数分布",
                    seriesTitle: "镇"
                }, function (subData) {
                    return subData.town;
                }, function (subData) {
                    return subData.totalCdmaCells;
                });
            },
            getCollegeDistributionForDownlinkFlow: function (data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网下行流量分布",
                    seriesTitle: "下行流量(MB)"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.pdcpDownlinkFlow;
                });
            },
            getCollegeDistributionForUplinkFlow: function (data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网上行流量分布",
                    seriesTitle: "上行流量(MB)"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.pdcpUplinkFlow;
                });
            },
            getCollegeDistributionForAverageUsers: function (data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网平均用户数分布",
                    seriesTitle: "平均用户数"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.averageUsers;
                });
            },
            getCollegeDistributionForActiveUsers: function (data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网最大激活用户数分布",
                    seriesTitle: "最大激活用户数"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.maxActiveUsers;
                });
            },
            getCellDistributionForDownlinkFlow: function (data, index) {
                return generalChartService.queryColumnOptions({
                    title: "小区下行流量分布",
                    xtitle: "小区名称",
                    ytitle: "下行流量(MB)"
                }, data.categories, data.dataList[index]);
            },
            getCellDistributionForUplinkFlow: function (data, index) {
                return generalChartService.queryColumnOptions({
                    title: "小区上行流量分布",
                    xtitle: "小区名称",
                    ytitle: "上行流量(MB)"
                }, data.categories, data.dataList[index]);
            },
            getCellDistributionForAverageUsers: function (data, index) {
                return generalChartService.queryColumnOptions({
                    title: "平均用户数分布",
                    xtitle: "小区名称",
                    ytitle: "平均用户数"
                }, data.categories, data.dataList[index]);
            },
            getCellDistributionForActiveUsers: function (data, index) {
                return generalChartService.queryColumnOptions({
                    title: "最大激活用户数分布",
                    xtitle: "小区名称",
                    ytitle: "最大激活用户数"
                }, data.categories, data.dataList[index]);
            },
            getDateFlowOptions: function (data, index1, index2) {
                return generalChartService.queryDoubleColumnOptions({
                    title: "流量变化趋势",
                    xtitle: "日期",
                    ytitle1: "下行流量(MB)",
                    ytitle2: "上行流量(MB)"
                }, data.categories, data.dataList[index1], data.dataList[index2]);
            },
            getDateUsersOptions: function (data, index1, index2) {
                return generalChartService.queryDoubleColumnOptions({
                    title: "用户数变化趋势",
                    xtitle: "日期",
                    ytitle1: "平均用户数",
                    ytitle2: "最大激活用户数"
                }, data.categories, data.dataList[index1], data.dataList[index2]);
            }
        };
    })
    .constant('taDivision', [
        '0-100m',
        '100-200m',
        '200-300m',
        '300-400m',
        '400-500m',
        '500-600m',
        '600-700m',
        '700-800m',
        '800-900m',
        '900-1000m',
        '1000-1100m',
        '1100-1200m',
        '1200-1300m',
        '1300-1400m',
        '1400-1500m',
        '1500-1600m',
        '1600-1700m',
        '1700-1800m',
        '1800-1900m',
        '1900-2000m',
        '2000-2100m',
        '2100-2200m',
        '2200-2300m',
        '2300-2400m',
        '2400-2500m',
        '2500-2600m',
        '2600-2700m',
        '2700-2800m',
        '2800-2900m',
        '2900-3000m',
        '3000-3100m'
    ])
    .factory('preciseChartService', function (generalChartService, chartCalculateService, appFormatService, taDivision) {
        return {
            getTypeOption: function (views) {
                var stats = generalChartService.generateCompoundStats(views);

                var chart = new DrilldownPie();
                chart.initialize({
                    title: "工单类型分布图",
                    seriesName: "工单类型"
                });
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries({
                        name: stat.type,
                        value: stat.total,
                        subData: stat.subData
                    });
                });
                return chart.options;
            },

            getStateOption: function (views) {
                var stats = generalChartService.generateCompoundStats(views);

                var chart = new DrilldownPie();
                chart.initialize({
                    title: "工单状态分布图",
                    seriesName: "工单状态"
                });
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries({
                        name: stat.type,
                        value: stat.total,
                        subData: stat.subData
                    });
                });
                return chart.options;
            },

            getDistrictOption: function (views) {
                var stats = generalChartService.generateCompoundStats(views);

                var chart = new DrilldownPie();
                chart.initialize({
                    title: "工单镇区分布图",
                    seriesName: "镇区"
                });
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries({
                        name: stat.type,
                        value: stat.total,
                        subData: stat.subData
                    });
                });
                return chart.options;
            },

            getTownFlowOption: function(views) {
                var stats = generalChartService.generateCompoundStats(views, function(view) {
                    return view.district;
                }, function(view) {
                    return view.town;
                }, function(view) {
                    return (view.pdcpDownlinkFlow + view.pdcpUplinkFlow) / 1024 / 1024 / 8;
                });

                var chart = new DrilldownPie();
                chart.initialize({
                    title: "流量镇区分布图(TB)",
                    seriesName: "区域"
                });
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries({
                        name: stat.type,
                        value: stat.total,
                        subData: stat.subData
                    });
                });
                return chart.options;
            },

            getCoverageOptions: function (stats) {
                var chart = new ComboChart();
                chart.title.text = '覆盖情况统计';
                
                chart.yAxis[0].title.text = 'MR次数';
                chart.xAxis[0].title.text = 'RSRP(dBm)';
                angular.forEach(stats, function (stat, index) {
                    var data = chartCalculateService.generateMrsRsrpStats(stat);
                    if (index === 0) {
                        chart.xAxis[0].categories = data.categories;
                    }
                    chart.series.push({
                        type: 'spline',
                        name: stat.statDate,
                        data: data.values
                    });
                });
                
                return chart.options;
            },

            getCoverageInterferenceOptions: function (stats, title) {
                var chart = new TimeSeriesLine();
                chart.title.text = title;
                var mod3Rates = [];
                var mod6Rates = [];
                angular.forEach(stats, function (stat) {
                    mod3Rates.push([
                        appFormatService.getUTCTime(stat.currentDate),
                        stat.mrCount === 0 ? null : stat.mod3Count / stat.mrCount * 100
                    ]);
                    mod6Rates.push([
                        appFormatService.getUTCTime(stat.currentDate),
                        stat.mrCount === 0 ? null : stat.mod6Count / stat.mrCount * 100
                    ]);
                });
                chart.yAxis.title.text = '同模干扰比例（%）';
                chart.series.push({
                    type: 'area',
                    name: 'MOD3干扰比例',
                    data: mod3Rates
                });
                chart.series.push({
                    type: 'area',
                    name: 'MOD6干扰比例',
                    data: mod6Rates
                });
                return chart.options;
            },

            getAverageRsrpTaOptions: function (stats, title) {
                var chart = new TimeSeriesLine();
                chart.title.text = title;
                chart.xAxis.categories = taDivision;
                chart.xAxis.title.text = 'TA区间';
                chart.yAxis.title.text = '平均RSRP按TA分布（dBm）';
                chart.series.push({
                    name: '平均RSRP',
                    data: stats
                });
                return chart.options;
            },

            getAboveRateTaOptions: function (above110Stats, above105Stats, title) {
                var chart = new TimeSeriesLine();
                chart.title.text = title;
                chart.xAxis.categories = taDivision;
                chart.xAxis.title.text = 'TA区间';
                chart.yAxis.title.text = 'TA分布覆盖率（%）';
                chart.series.push({
                    name: '-110dBm以上覆盖率',
                    data: above110Stats
                });
                chart.series.push({
                    name: '-105dBm以上覆盖率',
                    data: above105Stats
                });
                return chart.options;
            }
        }
    })

    .factory('authorizeService', function ($q, $http, appUrlService) {
        return {
            queryCurrentUserInfo: function () {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl('CurrentUser')
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            queryAllUsers: function () {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl('ApplicationUsers'),
                    headers: {
                        'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                    }
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            queryEmailConfirmed: function (name) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: '/Manage/EmailHasBeenConfirmed',
                    params: {
                        userName: name
                    }
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            updateRoleList: function () {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl('ApplicationRoles')
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            addRole: function (name) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl('ApplicationRoles'),
                    params: {
                        roleName: name,
                        action: "create"
                    }
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            deleteRole: function (name) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl('ApplicationRoles'),
                    params: {
                        roleName: name,
                        action: "delete"
                    }
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            changePassword: function (input) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/Manage/ChangePassword',
                    data: input
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            forgotPassword: function (input) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/Manage/ForgotPassword',
                    data: input
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            resetPassword: function (input) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/Manage/ResetPassword',
                    data: input
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            addPhoneNumber: function (input) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/Manage/AddPhoneNumber',
                    data: input
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            verifyPhoneNumber: function (input) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/Manage/VerifyPhoneNumber',
                    data: input
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            removePhoneNumber: function () {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/Manage/RemovePhoneNumber'
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            confirmEmail: function (input) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/Manage/ConfirmEmail',
                    data: input
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            }
        };
    });