app.controller("home.network", function ($scope, appRegionService, parametersChartService) {
    var cityName = $scope.city.selected || '佛山';
    appRegionService.queryDistrictInfrastructures(cityName).then(function (result) {
        appRegionService.accumulateCityStat(result, cityName);
        $("#cityLteENodebConfig").highcharts(
            parametersChartService.getDistrictLteENodebPieOptions(result.slice(0, result.length - 1),
            $scope.city.selected || '佛山'));
    });
});