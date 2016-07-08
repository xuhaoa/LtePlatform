app.config([
    '$routeProvider', function($routeProvider) {
        var viewDir = "/appViews/Test/Angular/";
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
            .otherwise({
                redirectTo: '/'
            });
    }
]);