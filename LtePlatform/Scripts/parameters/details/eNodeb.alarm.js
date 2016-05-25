app.controller("eNodeb.alarm", function($scope, $stateParams, alarmsService) {
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
    $scope.alarms = [];

    $scope.searchAlarms = function() {
        alarmsService.queryENodebAlarmsByDateSpanAndLevel($stateParams.eNodebId,
            $scope.beginDate.value, $scope.endDate.value, $scope.alarmLevel.selected).then(function(result) {
                $scope.alarms = result;
        });
    };

    $scope.searchAlarms();
});