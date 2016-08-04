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
    ]);