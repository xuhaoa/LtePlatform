app.controller("customer.index", function ($scope, complainService, appKpiService, emergencyService) {
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
        emergencyService.queryVipDemands($scope.statDate.value).then(function(count) {
            $scope.overallStats[3].count = count;
        });
    };

    $scope.notices = [
        {
            person: '卢立双',
            dateString: "2016/7/24",
            contents: "乐从劳村站点停闭公告，应答口径：投诉点一带 2/4G 覆盖劳村的基站，因为周边村民误认为幅射影响，不停到劳村村委会和乐从政府投诉，而且威胁业主拆除。导致站点被迫需要闭站几天进行信号监测，由于村民要求拆站的情绪强烈，难以协商。建议客户向劳村村委和乐从政府反映信号需求，力求获得支持开启，以早日改善信号覆盖。顺德政务服务热线： 0757-22838180"
        }, {
            person: '卢立双',
            dateString: "2016/7/19",
            contents: "佛山无线网络紧急异动通告：（南海区罗村荣星工业区）从2016年7月19日9：00开始，南海区罗村务庄、罗村务庄荣星工业区、大丰田工业区、沿江南路、罗村朗沙、朗沙村、朗沙工业区，罗沙一带、幸福村、罗务路、新光源产业基地附近等一带出现外部干扰，预计2016年8月19日24：00前可以解决。请注意支撑拦截"
        }
    ];

    $scope.query();
});
