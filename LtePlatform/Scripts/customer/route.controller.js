app.config([
        '$routeProvider', function ($routeProvider) {
            var viewDir = "/appViews/Customer/";
            $routeProvider
                .when('/', {
                    templateUrl: viewDir + "Index.html",
                    controller: "customer.index"
                })
                .when('/emergency', {
                    templateUrl: viewDir + "EmergencyList.html",
                    controller: "emergency.list"
                })
                .when('/vip', {
                    templateUrl: viewDir + "VipList.html",
                    controller: "vip.list"
                })
                .when('/vip/process/:number', {
                    templateUrl: viewDir + "Top.html",
                    controller: "rutrace.top.district"
                })
                .when('/chart', {
                    templateUrl: viewDir + "Chart.html",
                    controller: "rutrace.chart"
                })
                .when('/trendchart', {
                    templateUrl: viewDir + "TrendChart.html",
                    controller: "rutrace.trendchart"
                })
                .when('/top', {
                    templateUrl: viewDir + "Top.html",
                    controller: "rutrace.top"
                })
                .when('/import/:cellId/:sectorId/:name', {
                    templateUrl: viewDir + "Import.html",
                    controller: "rutrace.import"
                })
                .when('/interference/:cellId/:sectorId/:name', {
                    templateUrl: viewDir + "Interference/Index.html",
                    controller: "rutrace.interference"
                })
                .when('/coverage/:cellId/:sectorId/:name', {
                    templateUrl: viewDir + "Coverage/Index.html",
                    controller: "rutrace.coverage"
                })
                .when('/baidumap/:cellId/:sectorId/:name', {
                    templateUrl: viewDir + "Map/Index.html",
                    controller: "rutrace.map"
                })
                .when('/details/:number', {
                    templateUrl: viewDir + "WorkItem/AnalyticDetails.html",
                    controller: "workitem.details"
                })
                .when('/workItems/:cellId/:sectorId/:name', {
                    templateUrl: viewDir + 'WorkItem/ForCell.html',
                    controller: "rutrace.workitems"
                })
                .when('/workitemDistrict/:district', {
                    templateUrl: viewDir + "WorkItem/ForCity.html",
                    controller: "workitem.district"
                })
                .when('/workitemCity', {
                    templateUrl: viewDir + "WorkItem/ForCity.html",
                    controller: "workitem.city"
                })
                .when('/cellTrend/:cellId/:sectorId/:name', {
                    templateUrl: viewDir + "WorkItem/CellTrend.html",
                    controller: "cell.trend"
                })
                .when('/mongo', {
                    templateUrl: viewDir + 'FromMongo.html',
                    controller: 'interference.mongo'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
])
    .run(function ($rootScope) {
        var rootUrl = "/Customer#";
        $rootScope.menuItems = [
            {
                displayName: "日常支撑",
                isActive: true,
                subItems: [
                    {
                        displayName: "指标总体情况",
                        url: rootUrl + "/"
                    }, {
                        displayName: "指标变化趋势",
                        url: rootUrl + "/trend"
                    }
                ]
            }, {
                displayName: "专项支撑",
                isActive: true,
                subItems: [{
                    displayName: "应急需求",
                    url: rootUrl + "/emergency",
                    tooltip: "应急需求（围绕应急通信车）的申请和查询"
                }, {
                    displayName: "政企支撑",
                    url: rootUrl + "/vip",
                    tooltip: "政企客户支撑需求的管理"
                }, {
                    displayName: "校园网专题优化",
                    url: "/College/Map",
                    tooltip: "校园网专项优化，包括数据管理、指标分析、支撑工作管理和校园网覆盖呈现"
                }]
            }, {
                displayName: "统计分析",
                isActive: true,
                subItems: [
                    {
                        displayName: "分析",
                        url: rootUrl + "/top"
                    }
                ]
            }, {
                displayName: "基础信息",
                isActive: false,
                subItems: [
                    {
                        displayName: "从MongoDB导入",
                        url: rootUrl + "/mongo"
                    }
                ]
            }
        ];
        $rootScope.rootPath = rootUrl + "/";
        $rootScope.page = {
            messages: []
        };
        $rootScope.closeAlert = function (index) {
            $rootScope.page.messages.splice(index, 1);
        };
        $rootScope.city = {
            selected: "",
            options: []
        };
        $rootScope.district = {
            options: "",
            selected: []
        };
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $rootScope.beginDate = {
            value: new Date(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate(), 8),
            opened: false
        };
        var today = new Date();
        $rootScope.endDate = {
            value: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8),
            opened: false
        };
    });