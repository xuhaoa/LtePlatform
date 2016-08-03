angular.module('parameters.details', ['app.common'])
    .controller("bts.info", function($scope, $stateParams, networkElementService) {
        $scope.page.title = $stateParams.name + "CDMA基础信息";
        networkElementService.queryBtsInfo($stateParams.btsId).then(function(result) {
            $scope.btsDetails = result;
        });
        networkElementService.queryCdmaCellViews($stateParams.name).then(function(result) {
            $scope.cdmaCellList = result;
        });
    })
    .controller("bts.list", function($scope, $stateParams, networkElementService) {
        $scope.page.title = $stateParams.city + $stateParams.district + $stateParams.town + "CDMA基站列表";
        $scope.currentPage = 1;
        networkElementService.queryBtssInOneTown($stateParams.city, $stateParams.district, $stateParams.town).then(function(result) {
            $scope.btsList = result;
        });
    })
    .controller("cdmaCell.info", function($scope, $stateParams, networkElementService) {
        $scope.page.title = $stateParams.name + "-" + $stateParams.sectorId + "小区信息";
        $scope.isHuaweiCell = false;
        networkElementService.queryCdmaCellInfo($stateParams.btsId, $stateParams.sectorId).then(function(result) {
            $scope.cdmaCellDetails = result;
        });
    })
    .controller("cell.info", function($scope, $stateParams, neighborMongoService) {
        $scope.page.title = $stateParams.name + "-" + $stateParams.sectorId + "小区信息";
        $scope.isHuaweiCell = false;
        $scope.eNodebId = $stateParams.eNodebId;
        $scope.sectorId = $stateParams.sectorId;

        neighborMongoService.queryNeighbors($stateParams.eNodebId, $stateParams.sectorId).then(function(result) {
            $scope.mongoNeighbors = result;
        });
    })
    .controller("eNodeb.alarm", function($scope, $stateParams, alarmsService) {
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
    })
    .controller("eNodeb.flow", function($scope, $stateParams, networkElementService, flowService) {
        $scope.eNodebName = $stateParams.name;
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
        $scope.queryFlow = function() {
            angular.forEach($scope.cellList, function(cell) {
                flowService.queryCellFlowByDateSpan(cell.eNodebId, cell.sectorId,
                    $scope.beginDate.value, $scope.endDate.value).then(function(flowList) {
                    cell.flowList = flowList;
                });
            });
        };

        networkElementService.queryCellViewsInOneENodeb($stateParams.eNodebId).then(function(result) {
            $scope.cellList = result;
            $scope.queryFlow();
        });
    })
    .controller("eNodeb.info", function($scope, $stateParams, networkElementService, cellHuaweiMongoService,
        alarmImportService, intraFreqHoService, interFreqHoService, appRegionService) {
        $scope.page.title = $stateParams.name + "LTE基础信息";

        appRegionService.queryENodebTown($stateParams.eNodebId).then(function(result) {
            $scope.city = result.item1;
            $scope.district = result.item2;
            $scope.town = result.item3;
        });

        //查询基站基本信息
        networkElementService.queryENodebInfo($stateParams.eNodebId).then(function(result) {
            $scope.eNodebDetails = result;
            if (result.factory === '华为') {
                cellHuaweiMongoService.queryLocalCellDef(result.eNodebId).then(function(cellDef) {
                    alarmImportService.updateHuaweiAlarmInfos(cellDef).then(function() {});
                });
            }
        });

        //查询该基站下带的小区列表
        networkElementService.queryCellViewsInOneENodeb($stateParams.eNodebId).then(function(result) {
            $scope.cellList = result;
        });

        //查询基站同频切换参数
        intraFreqHoService.queryENodebParameters($stateParams.eNodebId).then(function(result) {
            $scope.intraFreqHo = result;
        });

        //查询基站异频切换参数
        interFreqHoService.queryENodebParameters($stateParams.eNodebId).then(function(result) {
            $scope.interFreqHo = result;
        });
    })
    .controller("eNodeb.list", function($scope, $stateParams, networkElementService) {
        $scope.page.title = $stateParams.city + $stateParams.district + $stateParams.town + "LTE基站列表";
        $scope.currentPage = 1;
        networkElementService.queryENodebsInOneTown($stateParams.city, $stateParams.district, $stateParams.town).then(function(result) {
            $scope.eNodebList = result;
        });
    });