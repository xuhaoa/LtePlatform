﻿angular.module('app.module', ["ui.bootstrap", 'myApp.region'])
    .value('appRoot', '/directives/app/')
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
            transclude: true
        };
    })
    .directive('cityDistrictSelection', function (appRoot, appRegionService) {
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
                scope.$watch("city.selected", function (city) {
                    if (city) {
                        appRegionService.queryDistricts(city).then(function (districts) {
                            scope.district = {
                                options: districts,
                                selected: districts[0]
                            };
                        });
                    }
                });
            }
        };
    })
    .directive('formFieldError', function($compile) {
        return{
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                var subScope = scope.$new(true);
                subScope.hasErrors = function() {
                    return ngModel.$invalid && ngModel.$dirty;
                };
                subScope.errors = function () {
                    var errors = ngModel.$error;
                    if (errors.parse !== undefined) {
                        errors.parse = false;
                    }
                    return errors;
                };
                subScope.customHints =  scope.$eval(attrs.formFieldError);
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
    