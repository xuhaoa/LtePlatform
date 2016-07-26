app.controller("customer.index", function ($scope) {
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
});
