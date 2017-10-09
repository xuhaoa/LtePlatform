angular.module('topic.dialog.station', ['myApp.url', 'myApp.region', 'myApp.kpi', 'topic.basic', "ui.bootstrap"])
    .controller('map.special-station.dialog',
        function($scope,
            $uibModalInstance,
            station,
            dialogTitle,
            appFormatService) {

            $scope.itemGroups = appFormatService.generateSpecialStationGroups(station);

            $scope.dialogTitle = dialogTitle;


            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller('map.special-indoor.dialog',
        function($scope,
            $uibModalInstance,
            station,
            dialogTitle,
            appFormatService) {

            $scope.itemGroups = appFormatService.generateSpecialIndoorGroups(station);

            $scope.dialogTitle = dialogTitle;


            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller('map.fault-station.dialog',
        function($scope,
            $uibModalInstance,
            station,
            dialogTitle,
            appFormatService) {

            $scope.itemGroups = appFormatService.generateFaultStationGroups(station);

            $scope.dialogTitle = dialogTitle;


            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller('map.checkingStation.dialog', function ($scope, $uibModalInstance, station, dialogTitle,
        appFormatService, networkElementService, downSwitchService) {
        $scope.station;
        downSwitchService.getCheckDetailsById(station.id).then(function (response) {
            $scope.station = response.result[0];
        });
        $scope.dialogTitle = dialogTitle;
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller('map.fixingStation.dialog',
        function($scope,
            $uibModalInstance,
            station,
            dialogTitle,
            appFormatService) {
            $scope.itemGroups = appFormatService.generateFixingStationGroups(station);
            $scope.dialogTitle = dialogTitle;

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller('map.common-station.dialog',
        function($scope, $uibModalInstance, station, dialogTitle) {
            $scope.station = station;
            $scope.dialogTitle = dialogTitle;
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller('map.common-stationList.dialog',
        function($scope,
            $http,
            dialogTitle,
            type,
            $uibModalInstance,
            parametersDialogService,
            downSwitchService) {
            $scope.dialogTitle = dialogTitle;
            $scope.distincts = new Array('FS', 'SD', 'NH', 'CC', 'SS', 'GM');
            $scope.stationList = [];
            $scope.page = 1;
            $scope.stationName = '';
            $scope.totolPage = 1;
            downSwitchService.getAllCommonStations(type, 0, 10).then(function(response) {
                $scope.stationList = response.result.rows;
                $scope.totolPage = response.result.total_pages;
                $scope.page = response.result.curr_page;
            });
            $scope.details = function(stationId) {
                downSwitchService.getCommonStationById(stationId).then(function(result) {
                    mapDialogService.showCommonStationInfo(result.result[0]);
                });
            }

            $scope.delete = function(stationId) {
                if (confirm("你确定删除该站点？")) {
                    downSwitchService.deleteCommonStation(stationId).then(function(response) {
                        alert(response.description);
                        $scope.jumpPage($scope.page);
                    });
                }
            }
            $scope.edit = function(stationId) {
                parametersDialogService.showCommonStationEdit(stationId);
            }
            $scope.addStation = function() {
                parametersDialogService.showCommonStationAdd();
            }
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
                downSwitchService.getCommonStationByName($scope.selectDistinct, $scope.stationName, type, page, 10)
                    .then(function(response) {
                        $scope.stationList = response.result.rows;
                        $scope.totolPage = response.result.total_pages;
                        $scope.page = response.result.curr_page;
                        $scope.records = response.dresult.records;
                    });
            }
        });