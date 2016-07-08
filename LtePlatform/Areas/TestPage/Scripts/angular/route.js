app.config([
    '$routeProvider', function($routeProvider) {
        var viewDir = "/appViews/Test/Angular/";
        $routeProvider
            .when('/', {
                templateUrl: viewDir + "SubmitForm.html",
                controller: "submit.form"
            })
            .when('/main', {
                templateUrl: viewDir + "Main.html",
                controller: "qunit.main"
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