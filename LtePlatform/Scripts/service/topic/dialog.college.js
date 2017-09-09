angular.module("topic.dialog.college", ['myApp.url', 'myApp.region', 'myApp.kpi', 'topic.basic', "ui.bootstrap"])
    .run(function ($rootScope) {
        $rootScope.closeAlert = function (messages, index) {
            messages.splice(index, 1);
        };
    })
    .controller("college.flow.name",
        function($scope,
            $uibModalInstance,
            name,
            beginDate,
            endDate,
            collegeService,
            appKpiService,
            kpiChartService) {
            $scope.dialogTitle = name + "流量分析";
            $scope.beginDate = beginDate;
            $scope.endDate = endDate;
            $scope.flowStats = [];
            $scope.mergeStats = [];
            $scope.query = function() {
                appKpiService.calculateFlowStats($scope.cellList,
                    $scope.flowStats,
                    $scope.mergeStats,
                    $scope.beginDate,
                    $scope.endDate);
            };
            $scope.showCharts = function() {
                kpiChartService.showFlowCharts($scope.flowStats, name, $scope.mergeStats);
            };
            collegeService.queryCells(name).then(function(cells) {
                $scope.cellList = cells;
                $scope.query();
            });

            $scope.ok = function() {
                $uibModalInstance.close($scope.eNodeb);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
    })
    .controller("college.feeling.name",
        function ($scope,
            $uibModalInstance,
            name,
            beginDate,
            endDate,
            collegeService,
            appKpiService,
            kpiChartService) {
            $scope.dialogTitle = name + "感知速率分析";
            $scope.beginDate = beginDate;
            $scope.endDate = endDate;
            $scope.flowStats = [];
            $scope.mergeStats = [];
            $scope.query = function () {
                appKpiService.calculateFeelingStats($scope.cellList,
                    $scope.flowStats,
                    $scope.mergeStats,
                    $scope.beginDate,
                    $scope.endDate);
            };
            $scope.showCharts = function () {
                kpiChartService.showFeelingCharts($scope.flowStats, name, $scope.mergeStats);
            };
            collegeService.queryCells(name).then(function (cells) {
                $scope.cellList = cells;
                $scope.query();
            });

            $scope.ok = function () {
                $uibModalInstance.close($scope.eNodeb);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller('college.coverage.all',
        function($scope,
            beginDate,
            endDate,
            $uibModalInstance,
            collegeDtService,
            collegeMapService) {
            $scope.dialogTitle = "校园网路测数据查询";
            $scope.dtInfos = [];
            $scope.query = function() {
                collegeMapService.showDtInfos($scope.dtInfos, beginDate.value, endDate.value);
            };
            $scope.ok = function() {
                $uibModalInstance.close($scope.building);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });