angular.module('myApp', ['app.common'])
    .config([
        '$routeProvider', function($routeProvider) {
            var viewDir = "/appViews/Test/Help/";
            $routeProvider
                .when('/', {
                    templateUrl: viewDir + "ApiGroup.html",
                    controller: "api.group"
                })
                .when('/method/:name', {
                    templateUrl: viewDir + "ApiMethod.html",
                    controller: "api.method"
                })
                .when('/api/:apiId/:method', {
                    templateUrl: viewDir + "Api.html",
                    controller: "api.details"
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ])
    .run(function($rootScope) {
        var rootUrl = "/Help#";
        $rootScope.rootPath = rootUrl + "/";
        $rootScope.page = {
            title: "",
            introduction: ""
        };
    })
    .controller("api.details", function($scope, $http, $routeParams) {
        $scope.method = $routeParams.method;
        $http({
            method: 'GET',
            url: '/Help/ApiActionDoc',
            params: {
                apiId: $routeParams.apiId
            }
        }).success(function(result) {
            $scope.page.title = result.RelativePath;
            $scope.page.introduction = result.ResponseDoc;
            $scope.parameters = result.ParameterDescriptions;
            $scope.bodyModel = result.FromBodyModel;
            $scope.responseModel = result.ResponseModel;
        });
    })
    .controller("api.group", function($scope, $http) {
        $scope.page.title = "Introduction";
        $scope.page.introduction = "Provide a general description of your APIs here.";
        $http({
            method: 'GET',
            url: '/Help/ApiDescriptions'
        }).success(function(result) {
            $scope.apiDescription = result;
        });
    })
    .controller("api.method", function($scope, $http, $routeParams) {
        $scope.page.title = $routeParams.name;
        $scope.page.introduction = "Provide the description of this API controller here.";
        $http({
            method: 'GET',
            url: '/Help/ApiMethod',
            params: {
                controllerName: $routeParams.name
            }
        }).success(function(result) {
            $scope.methods = result;
        });
    });