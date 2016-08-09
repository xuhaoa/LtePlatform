angular.module('app.common', [
    'app.module',
    'baidu.map',
    'basic.filters',
    'cell.filters',
    'college.service',
    'college.module',
    'customer.module',
    'customer.service',
    'handoff.parameters',
    'handoff.filters',
    "highcharts-ng",
    'huawei.mongo.parameters',
    'kpi.basic',
    'kpi.display',
    'kpi.import',
    'kpi.precise',
    'kpi.workitem',
    'myApp.authorize',
    'myApp.dumpInterference',
    'myApp.kpi',
    'myApp.parameters',
    'myApp.region',
    'myApp.url',
    'neighbor.mongo',
    'ngAnimate',
    'ngRoute',
    'ngTouch',
    'parametersMap',
    'parameters.chart',
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