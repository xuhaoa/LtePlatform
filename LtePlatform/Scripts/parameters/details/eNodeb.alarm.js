app.controller("eNodeb.alarm", function($scope, $stateParams) {
    $scope.eNodebName = $stateParams.name;
    var lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 30);
    $scope.beginDate = {
        value: lastWeek,
        opened: false
    };
    $scope.endDate = {
        value: new Date(),
        opened: false
    };
    $scope.alarmLevel = {
        options: ["严重告警", "重要以上告警", "所有告警"],
        selected: "重要以上告警"
    };
});