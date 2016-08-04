angular.module('myApp', ['test.angular.root', 'test.angular.index']);

angular.module('test.angular.index', ['app.common'])
    .controller("root.property", function($scope) {
        $scope.pageTitle = "RootProperty";
    })
    .controller('ParentController', function($scope) {
        // 使用.controller访问`ng-controller`内部的属性
        // 在DOM忽略的$scope中，根据当前控制器进行推断
        $scope.parentProperty = 'parent scope';
    })
    .controller('ChildController', function($scope) {
        $scope.childProperty = 'child scope';
        // 同在DOM中一样，我们可以通过当前$scope直接访问原型中的任意属性
        $scope.fullSentenceFromChild = 'Same $scope: We can access: ' +
            $scope.rootProperty + ' and ' +
            $scope.parentProperty + ' and ' +
            $scope.childProperty;
    })
    .directive('myDirective', function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                myUrl: '@', //绑定策略
                myLinkText: '@' //绑定策略
            },
            template: '<a href="{{myUrl}}">' +
                '{{myLinkText}}</a>'
        };
    })
    .directive('theirDirective', function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                myUrl: '=someAttr', // 经过了修改
                myLinkText: '@'
            },
            template: '\
            <div>\
                <label>My Url Field:</label>\
                <input type="text"\
                    ng-model="myUrl" />\
                <a href="{{myUrl}}">{{myLinkText}}</a>\
            </div>'
        };
    }).directive('ngFocus', [
        function() {
            var FOCUS_CLASS = "ng-focused";
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {
                    ctrl.$focused = false;
                    element.bind('focus', function(evt) {
                        element.addClass(FOCUS_CLASS);
                        scope.$apply(function() {
                            ctrl.$focused = true;
                        });
                    }).bind('blur', function(evt) {
                        element.removeClass(FOCUS_CLASS);
                        scope.$apply(function() {
                            ctrl.$focused = false;
                        });
                    });
                }
            };
        }
    ])
    .controller("submit.form", function($scope) {
        $scope.pageTitle = "SubmitForm";
    })
    .controller('signupController', [
        '$scope', function($scope) {
            $scope.submitted = false;
            $scope.signupForm = function() {
                if ($scope.signup_form.$valid) {
                    // Submit as normal
                    alert("The form is submit!");
                } else {
                    $scope.signup_form.submitted = true;
                }
            };
        }
    ])
    .controller("SimpleTypeController", function($scope) {
        $scope.section.title = "Simple";
        $scope.simpleA = 1;
        $scope.simpleB = 2;
    })
    .controller("ClockController", function($scope, $timeout) {
        $scope.section.title = "Clock";
        var updateClock = function() {
            $scope.clock = new Date();
            $timeout(function() {
                updateClock();
            }, 1000);
        };
        updateClock();
    })
    .controller("AddController", function($scope) {
        $scope.section.title = "Add";
        $scope.counter = 0;
        $scope.add = function(amount) { $scope.counter += amount; };
        $scope.subtract = function(amount) { $scope.counter -= amount; };
    })
    .controller("ParseController", function($scope, $parse) {
        $scope.section.title = "Parse";
        $scope.$watch('expr', function(newVal, oldVal, scope) {
            if (newVal !== oldVal) {
                var parseFun = $parse(newVal);
                $scope.parsedValue = parseFun(scope);
            }
        });
    })
    .controller("InterpolateController", function($scope, $interpolate) {
        $scope.section.title = "Interpolate";
        $scope.$watch('emailBody', function(body) {
            if (body) {
                var template = $interpolate(body);
                $scope.previewText = template({ to: $scope.to });
            }
        });
    });