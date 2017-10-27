angular.module("myApp", ['app.common'])
    .controller("neighbor.import",
    function ($scope, basicImportService, neighborImportService, flowImportService, mapDialogService) {
            var lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 7);
            $scope.beginDate = {
                value: lastWeek,
                opened: false
            };
            $scope.endDate = {
                value: new Date(),
                opened: false
            };

            $scope.huaweiInfo = {
                totalSuccessItems: 0,
                totalFailItems: 0,
                totalDumpItems: 0
            };
            $scope.clearHuaweiItems = function() {
                flowImportService.clearDumpHuaweis().then(function() {
                    $scope.huaweiInfo.totalDumpItems = 0;
                    $scope.huaweiInfo.totalSuccessItems = 0;
                    $scope.huaweiInfo.totalFailItems = 0;
                });
            };
            $scope.dumpHuaweiItems = function() {
                flowImportService.dumpHuaweiItem().then(function(result) {
                        neighborImportService.updateSuccessProgress(result, $scope.huaweiInfo, $scope.dumpHuaweiItems);
                    },
                    function() {
                        neighborImportService.updateFailProgress($scope.huaweiInfo, $scope.dumpHuaweiItems);
                    });
            };
            $scope.zteInfo = {
                totalSuccessItems: 0,
                totalFailItems: 0,
                totalDumpItems: 0
            };
            $scope.clearZteItems = function() {
                flowImportService.clearDumpHuaweis().then(function() {
                    $scope.zteInfo.totalDumpItems = 0;
                    $scope.zteInfo.totalSuccessItems = 0;
                    $scope.zteInfo.totalFailItems = 0;
                });
            }
            $scope.dumpZteItems = function() {
                flowImportService.dumpZteItem().then(function(result) {
                        neighborImportService.updateSuccessProgress(result, $scope.zteInfo, $scope.dumpZteItems);
                    },
                    function() {
                        neighborImportService.updateFailProgress($scope.zteInfo, $scope.dumpZteItems);
                    });
            };
            $scope.updateDumpHistory = function() {
                flowImportService.queryHuaweiFlows().then(function(result) {
                    $scope.huaweiInfo.totalDumpItems = result;
                });
                flowImportService.queryZteFlows().then(function(result) {
                    $scope.zteInfo.totalDumpItems = result;
                });
                flowImportService.queryFlowDumpHistory($scope.beginDate.value, $scope.endDate.value).then(function(result) {
                    $scope.dumpHistory = result;
                    angular.forEach(result,
                        function(record) {
                            if (record.huaweiItems > 7900 &&
                                record.zteItems > 15500 &&
                                (record.townStats === 0 ||
                                    record.townRrcs === 0 ||
                                    record.townQcis === 0 ||
                                    record.townPrbs === 0 ||
                                    record.townStats2100 === 0 ||
                                    record.townStats1800 === 0 ||
                                    record.townStats800VoLte === 0)) {
                                flowImportService.dumpTownStats(record.dateString).then(function(count) {
                                    record.townStats = count.item1;
                                    record.townRrcs = count.item2;
                                    record.townStats2100 = count.item3;
                                    record.townStats1800 = count.item4;
                                    record.townStats800VoLte = count.item5;
                                    record.townQcis = count.item6;
                                    record.townPrbs = count.item7;
                                });
                            }
                        });
                });
            };
            $scope.dumpCollegeFlows = function() {
                mapDialogService.showCollegeFlowDumpDialog($scope.beginDate, $scope.endDate);
            };
            $scope.updateDumpHistory();
        });