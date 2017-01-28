﻿angular.module('app.common', [
    'app.module',
    'baidu.map',
    'basic.filters',
    'cell.filters',
    'college.service',
    'college.module',
    'customer.module',
    'handoff.filters',
    "highcharts-ng",
    'myApp.kpi',
    'myApp.region',
    'myApp.url',
    'ngAnimate',
    'ngRoute',
    'ngTouch',
    'parameters.module',
    'rutrace.module',
    "ui.bootstrap",
    'ui.grid', 
    'ui.grid.edit',
    'ui.grid.exporter',
    'ui.grid.pagination',
    'ui.grid.selection',
    'ui.router',
    'workitem.module'
]);

angular.module('app.common').run(function($rootScope) {
    $rootScope.sideBarShown = true;
    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });
});