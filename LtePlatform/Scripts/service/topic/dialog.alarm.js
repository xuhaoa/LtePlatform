angular.module('topic.dialog.alarm', ['myApp.url', 'myApp.region', 'myApp.kpi', 'topic.basic', "ui.bootstrap"])
    .controller('map.zero-voice.dialog',
        function($scope,
            $uibModalInstance,
            station,
            dialogTitle,
            appFormatService) {

            $scope.itemGroups = appFormatService.generateZeroVoiceGroups(station);

            $scope.dialogTitle = dialogTitle;


            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller('map.zero-flow.dialog',
        function($scope,
            $uibModalInstance,
            station,
            dialogTitle,
            appFormatService) {

            $scope.itemGroups = appFormatService.generateZeroFlowGroups(station);

            $scope.dialogTitle = dialogTitle;


            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller('map.alarmStation.dialog',
        function($scope,
            $uibModalInstance,
            station,
            beginDate,
            endDate,
            dialogTitle,
            appFormatService,
            downSwitchService,
            workItemDialog,
            mapDialogService) {
            $scope.station = station;
            downSwitchService.getAlarmStationById(station.StationId, 0, 10000).then(function(response) {
                $scope.alarmStations = response.result;
            });
            $scope.showHistory = function(netAdminId) {
                mapDialogService.showAlarmHistoryList(netAdminId);
            };
            $scope.showStationInfo = function() {
                downSwitchService.getStationById(station.StationId).then(function(result) {
                    workItemDialog.showStationInfo(result.result[0], beginDate, endDate);
                });
            };

            $scope.dialogTitle = dialogTitle;
            $scope.ok = function() {
                $uibModalInstance.close($scope.site);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller('map.alarmHistoryList.dialog',
        function($scope,
            $http,
            dialogTitle,
            alarmStation,
            $uibModalInstance,
            downSwitchService) {
            $scope.levels = [
                { value: '', name: '全部' },
                { value: '0', name: '紧急' },
                { value: '1', name: '重要' },
                { value: '2', name: '一般' }
            ];
            $scope.alarmStation = alarmStation;
            $scope.dialogTitle = dialogTitle;
            $scope.page = 1;
            $scope.totolPage = 1;
            $scope.records = 0;
            $scope.alarmList = new Array();

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            }
            $scope.search = function() {
                $scope.page = 1;
                $scope.jumpPage($scope.page);
            }
            $scope.firstPage = function() {
                $scope.page = 1;
                $scope.jumpPage($scope.page);
            }
            $scope.lastPage = function() {
                $scope.page = $scope.totolPage;
                $scope.jumpPage($scope.page);
            }
            $scope.prevPage = function() {
                if ($scope.page !== 1)
                    $scope.page--;
                $scope.jumpPage($scope.page);
            }
            $scope.nextPage = function() {
                if ($scope.page !== $scope.totolPage)
                    $scope.page++;
                $scope.jumpPage($scope.page);
            }
            $scope.jumpPage = function(page) {
                if (page >= $scope.totolPage)
                    page = $scope.totolPage;
                downSwitchService.getAlarmHistorybyId($scope.alarmStation.NetAdminId,
                    page,
                    10,
                    $scope.selectLevel.value).then(function(response) {
                    $scope.alarmList = response.result.rows;
                    $scope.totolPage = response.result.total_pages;
                    $scope.page = response.result.curr_page;
                    $scope.records = response.result.records;
                });
            }

        })
    .controller('map.resource.dialog',
        function($scope, $uibModalInstance, station, dialogTitle, downSwitchService) {
            $scope.station = station;
            $scope.dialogTitle = dialogTitle;
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.tab = 1;

            $scope.selectTab = function(setTab) {
                $scope.tab = setTab;
                if (0 === setTab) {
                    downSwitchService.getResourceCounter(station.id).then(function(response) {
                        $scope.counter = response.result;
                    });
                } else if (1 === setTab) {
                    $scope.table = "bts";
                } else if (2 === setTab) {
                    $scope.table = "enodeb";
                } else if (3 === setTab) {
                    $scope.table = "rru";
                } else if (4 === setTab) {
                    $scope.table = "lrru";
                } else if (5 === setTab) {
                    $scope.table = "sfz";
                } else if (6 === setTab) {
                    $scope.table = "zfz";
                } else if (7 === setTab) {
                    $scope.table = "asset";
                }
                if (0 !== setTab) {
                    downSwitchService.getResource($scope.table, station.id).then(function(response) {
                        $scope.resourceList = response.result;
                    });
                }
            }

            $scope.isSelectTab = function(checkTab) {
                return $scope.tab === checkTab
            }
            $scope.selectTab(0);
        });