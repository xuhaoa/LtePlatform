app.config([
        '$routeProvider', function($routeProvider) {
            var viewDir = "/appViews/Test/Simple/";
            $routeProvider
                .when('/', {
                    templateUrl: viewDir + "Index.html",
                    controller: "qunit.index"
                })
                .when('/main', {
                    templateUrl: viewDir + "Main.html",
                    controller: "qunit.main"
                })
                .when('/legacy', {
                    templateUrl: viewDir + "LegacyMarkup.html",
                    controller: "legacy.markup"
                })
                .when('/filter', {
                    templateUrl: viewDir + "GridFilter.html",
                    controller: "grid.filter"
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ])
    .run(function($rootScope) {
        var rootUrl = "/TestPage/QUnitTest#";
        $rootScope.rootPath = rootUrl + "/";
        $rootScope.page = {
            title: "",
            introduction: ""
        };
        $rootScope.menuItems = [
        {
            displayName: "QUnit and Ui-Grid测试",
            isActive: true,
            subItems: [
            {
                displayName: "QUnit例子",
                url: rootUrl + "/",
                tooltip: "使用QUNnit进行测试的代码。"
            }, {
                displayName: "第一个ui-grid",
                url:  rootUrl + "/main",
                tooltip: "第一个ui-grid"
            }, {
                displayName: "ui-grid的排序功能",
                url: rootUrl + "/legacy"
            }, {
                displayName: "ui-grid的过滤功能",
                url: rootUrl + "/filter"
            }, {
                displayName: "Single Test Id",
                url: "/SingleTestId"
            }, {
                displayName: "Auto Start",
                url: "/AutoStart"
            }, {
                displayName: "Headless",
                url: "/Headless"
            }, {
                displayName: "Logs",
                url: "/Logs"
            }, {
                displayName: "Only",
                url: "/Only"
            }]
        }
        ];
    });