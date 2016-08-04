angular.module('test.angular.root', ['app.common'])
    .run(function($rootScope, $timeout) { // 使用.run访问$rootScope
        $timeout(function() {
            $rootScope.myHref = 'http://google.com';
        }, 2000);
        $rootScope.rootProperty = 'root scope';
        var rootPath = '/TestPage/AngularTest/';
        var indexPath = '/TestPage/AngularTest#/';
        $rootScope.menuItems = [
            {
                displayName: "AngularJS测试",
                isActive: true,
                subItems: [
                    {
                        name: "Simple",
                        displayName: "Simple Type Test",
                        url: indexPath + 'simple'
                    }, {
                        name: "SubmitForm",
                        displayName: "Submit Form",
                        url: indexPath
                    }, {
                        name: "RootProperty",
                        displayName: "Root Property",
                        url: indexPath + "root"
                    }, {
                        name: "Chapter9Ari",
                        displayName: "第 9 章　内置指令",
                        url: rootPath + "Chapter9Ari"
                    }, {
                        name: "Chapter10Ari",
                        displayName: "第 10 章　指令详解",
                        url: rootPath + "Chapter10Ari"
                    }
                ]
            }, {
                displayName: "CoffeeScript脚本测试",
                isActive: false,
                subItems: [
                    {
                        displayName: "Hotseat 5x5",
                        url: "/TestPage/CoffeeScript/Hotseat",
                        tooltip: "全网LTE和CDMA基站、小区列表和地理化显示、对全网的基站按照基站名称、地址等信息进行查询，并进行个别基站小区的增删、修改信息的操作"
                    }
                ]
            }, {
                displayName: "WebApi测试",
                isActive: false,
                subItems: [
                    {
                        displayName: "工参上传测试",
                        url: "/TestPage/WebApiTest/BasicPost",
                        tooltip: "全网LTE和CDMA基站、小区列表和地理化显示、对全网的基站按照基站名称、地址等信息进行查询，并进行个别基站小区的增删、修改信息的操作"
                    }, {
                        displayName: "简单类型测试",
                        url: "/TestPage/WebApiTest/SimpleType",
                        tooltip: "对传统指标（主要是2G和3G）的监控、分析和地理化呈现"
                    }, {
                        displayName: "Html5csv测试",
                        url: "/TestPage/WebApiTest/Html5Test",
                        tooltip: "对接本部优化部4G网优平台，实现对日常工单的监控和分析"
                    }, {
                        displayName: "Html5csv测试-2",
                        url: "/TestPage/WebApiTest/Html5PostTest",
                        tooltip: "校园网专项优化，包括数据管理、指标分析、支撑工作管理和校园网覆盖呈现"
                    }
                ]
            }
        ];

        $rootScope.sectionItems = [
        {
            name: "Simple",
            displayName: "简单类型测试",
            url: indexPath + 'simple'
        }, {
            name: "Add",
            displayName: "简单加减法",
            url: indexPath + "add"
        }, {
            name: "Clock",
            displayName: "时钟控制器",
            url: indexPath + "clock"
        }, {
            name: "Interpolate",
            displayName: "插值字符串测试",
            url: indexPath + "interpolate"
        }, {
            name: "Parse",
            displayName: "表达式解析测试",
            url: indexPath + "parse"
        }];
        $rootScope.section = {
            title: "Simple"
        };
    })
    .config([
        '$routeProvider', function($routeProvider) {
            var viewDir = "/appViews/Test/Angular/";
            var simpleDir = "/appViews/Test/Simple/";
            $routeProvider
                .when('/', {
                    templateUrl: viewDir + "SubmitForm.html",
                    controller: "submit.form"
                })
                .when('/root', {
                    templateUrl: viewDir + "RootProperty.html",
                    controller: "root.property"
                })
                .when('/legacy', {
                    templateUrl: viewDir + "LegacyMarkup.html",
                    controller: "legacy.markup"
                })
                .when('/simple', {
                    templateUrl: simpleDir + "SimpleType.html",
                    controller: "SimpleTypeController"
                })
                .when('/add', {
                    templateUrl: simpleDir + "Add.html",
                    controller: "AddController"
                })
                .when('/clock', {
                    templateUrl: simpleDir + "Clock.html",
                    controller: "ClockController"
                })
                .when('/interpolate', {
                    templateUrl: simpleDir + "Interpolate.html",
                    controller: "InterpolateController"
                })
                .when('/parse', {
                    templateUrl: simpleDir + "Parse.html",
                    controller: "ParseController"
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]);