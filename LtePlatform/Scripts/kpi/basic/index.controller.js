﻿angular.module('myApp', ['app.common'])
    .config([
        '$routeProvider', function($routeProvider) {
            var rootDir = "/appViews/BasicKpi/";
            $routeProvider
                .when('/trend/:city', {
                    templateUrl: rootDir + 'Trend.html',
                    controller: 'kpi.trend'
                })
                .when('/topDrop2G', {
                    templateUrl: rootDir + 'TopDrop2G.html',
                    controller: 'kpi.topDrop2G'
                })
                .when('/topConnection3G', {
                    templateUrl: rootDir + 'TopConnection3G.html',
                    controller: 'kpi.topConnection3G'
                })
                .when('/topDrop2GTrend/:city', {
                    templateUrl: rootDir + 'TopDrop2GTrend.html',
                    controller: 'kpi.topDrop2G.trend'
                })
                .when('/topConnection3GTrend/:city', {
                    templateUrl: rootDir + 'TopConnection3GTrend.html',
                    controller: 'kpi.topConnection3G.trend'
                })
                .when('/cell/:eNodebId/:sectorId/:serialNumber', {
                    templateUrl: rootDir + 'CellInfo.html',
                    controller: "workitem.cell"
                })
                .when('/cdmaCell/:btsId/:sectorId/:serialNumber', {
                    templateUrl: rootDir + 'CdmaCellInfo.html',
                    controller: "workitem.cdmaCell"
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ])
    .run(function($rootScope, appRegionService, menuItemService) {
        var rootUrl = "/Kpi#";
        $rootScope.menuItems = [
            {
                displayName: "总体情况",
                isActive: true,
                subItems: [
                    {
                        displayName: "指标总体情况",
                        url: rootUrl + "/"
                    }
                ]
            }, {
                displayName: "TOP指标",
                isActive: true,
                subItems: [
                    {
                        displayName: "TOP掉话指标",
                        url: rootUrl + "/topDrop2G"
                    }, {
                        displayName: "TOP连接成功率指标",
                        url: rootUrl + "/topConnection3G"
                    }
                ]
            }
        ];
        $rootScope.rootPath = rootUrl + "/";
        $rootScope.page = {
            title: "指标总体情况",
            messages: []
        };
        $rootScope.topData = {
            drop2G: [],
            connection3G: []
        };
        $rootScope.closeAlert = function(index) {
            $rootScope.page.messages.splice(index, 1);
        };
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $rootScope.beginDate = {
            value: lastWeek,
            opened: false
        };
        $rootScope.endDate = {
            value: new Date(),
            opened: false
        };

        appRegionService.initializeCities()
            .then(function(result) {
                angular.forEach(result, function(city) {
                    menuItemService.updateMenuItem($rootScope.menuItems, 0,
                        "指标变化趋势-" + city,
                        $rootScope.rootPath + "trend/" + city);
                    menuItemService.updateMenuItem($rootScope.menuItems, 1,
                        "TOP掉话变化趋势-" + city,
                        $rootScope.rootPath + "topDrop2GTrend/" + city);
                    menuItemService.updateMenuItem($rootScope.menuItems, 1,
                        "TOP连接成功率变化趋势-" + city,
                        $rootScope.rootPath + "topConnection3GTrend/" + city);
                });
            });
    })
    .controller('kpi.topConnection3G', function($scope, appRegionService, appFormatService, connection3GService) {
        $scope.page.title = "TOP连接成功率指标";
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        $scope.statDate = {
            value: yesterday,
            opened: false
        };
        $scope.city = {
            selected: "",
            options: []
        };
        $scope.showKpi = function() {
            connection3GService.queryDayStats($scope.city.selected, $scope.statDate.value).then(function(result) {
                $scope.statDate.value = appFormatService.getDate(result.statDate);
                $scope.topData.connection3G = result.statViews;
            });
        };
        appRegionService.initializeCities().then(function(result) {
            $scope.city.options = result;
            $scope.city.selected = result[0];
            $scope.showKpi();
        });
    })
    .controller('kpi.topConnection3G.trend', function($scope, $routeParams, appRegionService, appFormatService, connection3GService) {
        $scope.page.title = "TOP连接变化趋势-" + $routeParams.city;
        $scope.topCount = {
            options: [10, 20, 30, 50],
            selected: 10
        };
        $scope.showTrend = function() {
            connection3GService.queryCellTrend($scope.beginDate.value, $scope.endDate.value, $routeParams.city,
                $scope.orderPolicy.selected, $scope.topCount.selected).then(function(result) {
                $scope.trendCells = result;
            });
        };
        connection3GService.queryOrderPolicy().then(function(result) {
            $scope.orderPolicy = {
                options: result,
                selected: result[0]
            }
            $scope.showTrend();
        });
    })
    .controller('kpi.topDrop2G', function($scope, appRegionService, appFormatService, drop2GService) {
        $scope.page.title = "TOP掉话指标";
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        $scope.statDate = {
            value: yesterday,
            opened: false
        };
        $scope.city = {
            selected: "",
            options: []
        };
        $scope.showKpi = function() {
            drop2GService.queryDayStats($scope.city.selected, $scope.statDate.value).then(function(result) {
                $scope.statDate.value = appFormatService.getDate(result.statDate);
                $scope.topData.drop2G = result.statViews;
            });
        };
        appRegionService.initializeCities().then(function(result) {
            $scope.city.options = result;
            $scope.city.selected = result[0];
            $scope.showKpi();
        });
    })
    .controller('kpi.topDrop2G.trend', function($scope, $routeParams, appRegionService, appFormatService, drop2GService) {
        $scope.page.title = "TOP掉话变化趋势-" + $routeParams.city;
        $scope.topCount = {
            options: [10, 20, 30, 50],
            selected: 10
        };
        $scope.showTrend = function() {
            drop2GService.queryCellTrend($scope.beginDate.value, $scope.endDate.value, $routeParams.city,
                $scope.orderPolicy.selected, $scope.topCount.selected).then(function(result) {
                $scope.trendCells = result;
            });
        };
        drop2GService.queryOrderPolicy().then(function(result) {
            $scope.orderPolicy = {
                options: result,
                selected: result[0]
            }
            $scope.showTrend();
        });
    });