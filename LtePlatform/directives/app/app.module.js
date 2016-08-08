angular.module('app.module', [
    'app.directives.date', 'app.directives.file', 'app.directives.district', 'app.directives.form', 'app.directives.glyphicon'])
    .constant('appRoot', '/directives/app/');

angular.module('app.directives.date', [])
    .directive('dateSpanColumn', function(appRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                beginDate: '=',
                endDate: '='
            },
            templateUrl: appRoot + 'DateSpan.Tpl.html'
        };
    })
    .directive('dateSpanRow', function(appRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                beginDate: '=',
                endDate: '='
            },
            templateUrl: appRoot + 'DateSpanRow.Tpl.html',
            transclude: true,
            link: function(scope, element, attrs) {
                scope.beginTips = attrs.beginTips || "开始日期：";
                scope.endTips = attrs.endTips || "结束日期：";
            }
        };
    });

angular.module('app.directives.file', [])
    .directive('dumpFileSelector', function(appRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                fileTitle: '@',
                tag: '@'
            },
            templateUrl: appRoot + 'dump/FileSelector.html',
            transclude: true
        };
    });

angular.module('app.directives.district', ["ui.bootstrap", 'myApp.region'])
    .directive('cityDistrictSelection', function(appRoot, appRegionService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                city: '=',
                district: '='
            },
            templateUrl: appRoot + 'CityDistrictSelection.Tpl.html',
            link: function(scope) {
                appRegionService.initializeCities().then(function(cities) {
                    scope.city.options = cities;
                    scope.city.selected = cities[0];
                });
                scope.$watch("city.selected", function(city) {
                    if (city) {
                        appRegionService.queryDistricts(city).then(function(districts) {
                            scope.district.options = districts;
                            scope.district.selected = districts[0];
                        });
                    }
                });
            }
        };
    })
    .directive('districtTownSelection', function(appRoot, appRegionService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                city: '=',
                district: '=',
                town: '='
            },
            templateUrl: appRoot + 'DistrictTownSelection.Tpl.html',
            transclude: true,
            link: function(scope) {
                scope.$watch("district.selected", function(district) {
                    if (district) {
                        appRegionService.queryTowns(scope.city.selected, district).then(function(towns) {
                            scope.town.options = towns;
                            scope.town.selected = towns[0];
                        });
                    }
                });
            }
        };
    })
    .directive('districtTownPlain', function (appRoot, appRegionService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                city: '=',
                district: '=',
                town: '='
            },
            templateUrl: appRoot + 'DistrictTownPlain.Tpl.html',
            link: function (scope) {
                scope.$watch("district.selected", function (district) {
                    if (district) {
                        appRegionService.queryTowns(scope.city.selected, district).then(function (towns) {
                            scope.town.options = towns;
                            scope.town.selected = towns[0];
                        });
                    }
                });
            }
        };
    });

angular.module('app.directives.form', [])
    .directive('formFieldError', function($compile) {
        return{
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                var subScope = scope.$new(true);
                subScope.hasErrors = function() {
                    return ngModel.$invalid && ngModel.$dirty;
                };
                subScope.errors = function() {
                    var errors = ngModel.$error;
                    if (errors.parse !== undefined) {
                        errors.parse = false;
                    }
                    return errors;
                };
                subScope.customHints = scope.$eval(attrs.formFieldError);
                var hint = $compile(
                    '<ul class="text-danger" ng-if="hasErrors()">'
                    + '<small ng-repeat="(name, wrong) in errors()" ng-if="wrong">{{name | formError: customHints}}</small>'
                    + '</ul>'
                )(subScope);
                element.after(hint);
            }
        };
    })
    .directive('formAssertSameAs', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                var isSame = function(value) {
                    var anotherValue = scope.$eval(attrs.formAssertSameAs);
                    return value === anotherValue;
                };
                ngModel.$parsers.push(function(value) {
                    ngModel.$setValidity('same', isSame(value));
                    return isSame(value) ? value : undefined;
                });
                scope.$watch(function() {
                    return scope.$eval(attrs.formAssertSameAs);
                }, function() {
                    ngModel.$setValidity('same', isSame(ngModel.$modelValue));
                });
            }
        };
    });

angular.module('app.directives.glyphicon', [])
    .directive('glyphiconEnhance', function() {
        return {
            restrict: 'A',
            compile: function(element, attrs) {
                element.addClass('glyphicon');
                element.addClass('glyphicon-l');
                if (attrs.type) {
                    element.addClass('glyphicon-' + attrs.type);
                }
            }
        }
    })
    .directive('glyphiconInline', function ($compile) {
        return {
            restrict: 'A',
            scope: {
                type: '='
            },
            link: function (scope, element, attrs) {
                scope.initialize = true;
                scope.$watch('type', function(type) {
                    if (type && scope.initialize) {
                        var dom = $compile('<em glyphicon-enhance type=' + type + '></em>')(scope);
                        element.append(dom);
                        scope.initialze = false;
                    }
                });

            }
        };
    })
    .directive('panelColor', function() {
        return {
            restrict: 'A',
            scope: {
                color: '='
            },
            link: function (scope, element, attrs) {
                scope.initialize = true;
                scope.$watch('color', function (color) {
                    if (color && scope.initialize) {
                        element.addClass('panel');
                        element.addClass('panel-widget');
                        element.addClass('panel-' + color);
                        scope.initialze = false;
                    }
                });

            }
        }
    });
    