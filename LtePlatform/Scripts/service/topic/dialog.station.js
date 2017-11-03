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
    .controller('map.resourceStation.dialog', function ($scope, $uibModalInstance, station, dialogTitle, downSwitchService,
        appFormatService, networkElementService) {
        $scope.station = station;
        $scope.dialogTitle = dialogTitle;
        $scope.bool = {};
        $scope.bool.crru = false;
        $scope.bool.cjz = false;
        $scope.bool.csf = false;
        $scope.bool.czf = false;
        $scope.bool.lrru = false;
        $scope.bool.ljz = false;
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.tab = 1;

        $scope.selectTab = function (setTab) {
            $scope.tab = setTab;
            if (0 == setTab) {
                downSwitchService.getResourceCounter(station.id).then(function (response) {
                    $scope.counter = response.result;
                    if ($scope.counter.crru == '0')
                        $scope.bool.crru = true;
                    else
                        $scope.bool.crru = false;

                    if ($scope.counter.cjz == '0')
                        $scope.bool.cjz = true;
                    else
                        $scope.bool.cjz = false;

                    if ($scope.counter.csf == '0')
                        $scope.bool.csf = true;
                    else
                        $scope.bool.csf = false;

                    if ($scope.counter.czf == '0')
                        $scope.bool.czf = true;
                    else
                        $scope.bool.czf = false;

                    if ($scope.counter.lrru == '0')
                        $scope.bool.lrru = true;
                    else
                        $scope.bool.lrru = false;

                    if ($scope.counter.ljz == '0')
                        $scope.bool.ljz = true;
                    else
                        $scope.bool.ljz = false;
                });
            } else if (1 == setTab) {
                $scope.table = "crru";
            } else if (2 == setTab) {
                $scope.table = "cjz";
            } else if (3 == setTab) {
                $scope.table = "csf";
            } else if (4 == setTab) {
                $scope.table = "czf";
            } else if (5 == setTab) {
                $scope.table = "lrru";
            } else if (6 == setTab) {
                $scope.table = "ljz";
            } else if (7 == setTab) {
                $scope.table = "asset";
            }
            if (0 != setTab) {
                downSwitchService.getResource($scope.table, station.id).then(function (response) {
                    $scope.resourceList = response.result;
                });
            }
        }

        $scope.isSelectTab = function (checkTab) {
            return $scope.tab === checkTab
        }
        $scope.selectTab(0);
    })

    .controller('map.fixingStation.dialog',
        function($scope,
            $uibModalInstance,
            station,
            dialogTitle,
            appFormatService,
            downSwitchService) {

            downSwitchService.getFixingStationById(station.id).then(function (response) {
                $scope.fixingStations = response.result[0];
                $scope.fixingStations.longtitute = station.longtitute;
                $scope.fixingStations.lattitute = station.lattitute;
                $scope.itemGroups = appFormatService.generateFixingStationGroups($scope.fixingStations);
            });
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
                parametersDialogService.showCommonStationAdd(type);
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