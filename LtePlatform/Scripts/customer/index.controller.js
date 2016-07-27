app.controller("customer.index", function ($scope, complainService, appKpiService) {
    $scope.overallStats = [
        {
            tips: "抱怨量",
            count: 120,
            type: "shopping-cart",
            color: "blue"
        }, {
            tips: "分公司需求",
            count: 80,
            type: "comment",
            color: "orange"
        }, {
            tips: "在线支撑",
            count: 7,
            type: "user",
            color: "teal"
        }, {
            tips: "政企支撑",
            count: 44,
            type: "stats",
            color: "red"
        }
    ];
    $scope.statDate = {
        value: new Date(),
        opened: false
    };
    $scope.monthObject = 198;
    $scope.query = function() {
        complainService.queryCurrentComplains($scope.statDate.value).then(function(count) {
            $scope.overallStats[0].count = count;
            var objects = [];
            complainService.queryMonthTrend($scope.statDate.value).then(function (stat) {
                angular.forEach(stat.item1, function(date, index) {
                    objects.push((index + 1) / stat.item1.length * $scope.monthObject);
                });
                var options = appKpiService.generateComplainTrendOptions(stat.item1, stat.item2, objects);
                $('#line-chart').highcharts(options);
            });
        });
        complainService.queryBranchDemands($scope.statDate.value).then(function(count) {
            $scope.overallStats[1].count = count;
        });
        complainService.queryOnlineSustains($scope.statDate.value).then(function(count) {
            $scope.overallStats[2].count = count;
        });
    };

    $scope.query();
});
