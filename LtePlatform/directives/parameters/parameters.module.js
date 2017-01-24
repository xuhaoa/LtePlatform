angular.module('parameters.module', ['parameters.infrastructure', 'parameters.list', 'parameters.handoff', 'parameters.power'])
    .constant('parametersRoot', '/directives/parameters/');

angular.module('parameters.infrastructure', [])
    .directive('cityInfrastructure', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                districtStats: '=',
                currentDistrict: '='
            },
            templateUrl: parametersRoot + 'CityInfrastructure.Tpl.html',
            link: function(scope, element, attrs) {
                scope.showDistrictDetails = function(district) {
                    scope.currentDistrict = district;
                };
                scope.$watch('districtStats', function(stats) {
                    if (stats === undefined) return;
                    scope.showDistrictDetails(stats[0].district);
                });
            }
        };
    })
    .directive('districtInfrastructure', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                townStats: '=',
                rootPath: '=',
                city: '=',
                currentDistrict: '='
            },
            templateUrl: parametersRoot + 'DistrictInfrastructure.Tpl.html'
        }
    })
    .directive('eNodebQueryButton', function (parametersRoot) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                eNodeb: '=',
                rootPath: '='
            },
            templateUrl: parametersRoot + 'eNodeb/Query.html'
        }
    });

angular.module('parameters.list', ['ui.grid', 'myApp.region', 'myApp.url', 'huawei.mongo.parameters'])
    .directive('alarmTable', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                alarms: '='
            },
            templateUrl: parametersRoot + 'kpi/AlarmTable.html'
        }
    })
    .directive('flowTable', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                flowList: '='
            },
            templateUrl: parametersRoot + 'kpi/FlowTable.html'
        }
    })
    .controller('LteENodebController', function ($scope) {
        $scope.gridOptions = {
            columnDefs: [
                { field: 'eNodebId', name: 'LTE基站编号' },
                { field: 'name', name: '基站名称', width: 150 },
                { field: 'planNum', name: '规划编号' },
                { field: 'openDate', name: '入网日期', cellFilter: 'date: "yyyy-MM-dd"' },
                { field: 'address', name: '地址', width: 300, enableColumnResizing: false },
                { field: 'factory', name: '厂家' },
                { field: 'isInUse', name: '是否在用', cellFilter: 'yesNoChinese' }
            ],
            data: []
        };
    })
    .directive('eNodebTable', function ($compile) {
        return {
            controller: 'LteENodebController',
            restrict: 'EA',
            replace: true,
            scope: {
                items: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    })
    .controller('PlanningSiteController', function ($scope) {
        $scope.gridOptions = {
            columnDefs: [
                { field: 'district', name: '区县' },
                { field: 'town', name: '镇街' },
                { field: 'formalName', name: '正式名称' },
                { field: 'contractDate', name: '合同日期', cellFilter: 'date: "yyyy-MM-dd"' },
                { field: 'finishedDate', name: '完工日期', cellFilter: 'date: "yyyy-MM-dd"' },
                { field: 'planNum', name: '规划编号' },
                { field: 'antennaHeight', name: '天线挂高（米）' },
                { field: 'towerType', name: '杆塔类型' }
            ],
            data: []
        };
    })
    .directive('planningSiteTable', function ($compile) {
        return {
            controller: 'PlanningSiteController',
            restrict: 'EA',
            replace: true,
            scope: {
                items: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    })
    .controller('ENodebPlainController', function ($scope) {
        $scope.gridOptions = {
            paginationPageSizes: [20, 40, 60],
            paginationPageSize: 20,
            columnDefs: [
                { field: 'eNodebId', name: 'LTE基站编号' },
                { field: 'name', name: '基站名称', width: 120 },
                { field: 'planNum', name: '规划编号' },
                { field: 'openDate', name: '入网日期', cellFilter: 'date: "yyyy-MM-dd"' },
                { field: 'address', name: '地址', width: 300, enableColumnResizing: false },
                { field: 'factory', name: '厂家' },
                {
                    name: 'IP',
                    cellTemplate: '<span class="text-primary">{{row.entity.ip.addressString}}</span>',
                    width: 100
                },
                {
                    name: '查询',
                    cellTemplate: '<div e-nodeb-query-button root-path="grid.appScope.rootPath" e-nodeb="row.entity"></div>',
                    width: 100
                }
            ],
            data: []
        };
    })
    .directive('eNodebPlainTable', function ($compile) {
        return {
            controller: 'ENodebPlainController',
            restrict: 'EA',
            replace: true,
            scope: {
                items: '=',
                rootPath: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions" ui-grid-pagination style="height: 600px"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    })
    .directive('eNodebDetailsTable', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                eNodebDetails: '='
            },
            templateUrl: parametersRoot + 'eNodeb/ENodebDetailsTable.html'
        }
    })

    .controller('CdmaBtsController', function ($scope) {
        $scope.gridOptions = {
            columnDefs: [
                { field: 'btsId', name: 'CDMA基站编号' },
                { field: 'name', name: '基站名称', width: 150 },
                { field: 'bscId', name: 'BSC编号' },
                { field: 'districtName', name: '区域' },
                { field: 'townName', name: '镇区' },
                {
                     field: 'address', 
                     name: '地址',
                     width: 300,
                     enableColumnResizing: false,
                     cellTooltip: function (row) {
                         return row.entity.address;
                     }
                },
                { field: 'isInUse', name: '是否在用', cellFilter: 'yesNoChinese' }
            ],
            data: []
        };
    })
    .directive('btsTable', function ($compile) {
        return {
            controller: 'CdmaBtsController',
            restrict: 'EA',
            replace: true,
            scope: {
                items: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    })
    .controller('BtsPlainController', function ($scope) {
        $scope.gridOptions = {
            paginationPageSizes: [20, 40, 60],
            paginationPageSize: 20,
            columnDefs: [
                { field: 'btsId', name: 'CDMA基站编号' },
                { field: 'name', name: '基站名称', width: 120 },
                { field: 'btsId', name: 'BSC编号' },
                { field: 'longtitute', name: '经度' },
                { field: 'lattitute', name: '纬度' },
                { field: 'address', name: '地址', width: 300, enableColumnResizing: false },
                { field: 'isInUse', name: '是否在用', cellFilter: 'yesNoChinese' },
                {
                    name: '查询',
                    cellTemplate: '<a ng-href="{{grid.appScope.rootPath}}btsInfo/{{row.entity.btsId}}/{{row.entity.name}}"\
                                class="btn btn-sm" ng-class="{\'btn-default\': !row.entity.isInUse, \'btn-success\': row.entity.isInUse}">基站详细信息</a>',
                    width: 100
                }
            ],
            data: []
        };
    })
    .directive('btsPlainTable', function ($compile) {
        return {
            controller: 'BtsPlainController',
            restrict: 'EA',
            replace: true,
            scope: {
                items: '=',
                rootPath: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions" ui-grid-pagination style="height: 600px"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    })

    .controller('CellDialogController', function ($scope) {
        $scope.gridOptions = {
            columnDefs: [
                {
                     name: '小区名称',
                     cellTemplate: '<span class="text-primary">{{row.entity.eNodebName}}-{{row.entity.sectorId}}</span>'
                },
                { field: 'frequency', name: '频点' },
                { field: 'pci', name: 'PCI' },
                { field: 'prach', name: 'PRACH' },
                { field: 'rsPower', name: 'RS功率' },
                { field: 'indoor', name: '室内外' },
                { field: 'height', name: '高度' },
                { field: 'azimuth', name: '方位角' },
                { field: 'downTilt', name: '下倾' },
                { field: 'antennaGain', name: '天线增益(dB)' }
            ],
            data: []
        };
    })
    .directive('cellDialogTable', function ($compile) {
        return {
            controller: 'CellDialogController',
            restrict: 'EA',
            replace: true,
            scope: {
                items: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    })

    .controller('CellRruController', function ($scope) {
        $scope.gridOptions = {
            columnDefs: [
                {
                    name: '小区名称',
                    cellTemplate: '<span class="text-primary">{{row.entity.eNodebName}}-{{row.entity.sectorId}}</span>'
                },
                { field: 'frequency', name: '频点' },
                {
                    name: 'RRU名称',
                    cellTemplate: '<span class="text-primary">{{row.entity.rruName}}</span>'
                },
                { field: 'eNodebId', name: '基站编号' },
                { field: 'antennaFactoryDescription', name: '天线厂家' },
                { field: 'indoor', name: '室内外' },
                { field: 'antennaInfo', name: '天线信息' },
                { field: 'antennaModel', name: '天线型号' },
                { field: 'downTilt', name: '下倾' },
                { field: 'antennaGain', name: '天线增益(dB)' }
            ],
            data: []
        };
    })
    .directive('cellRruTable', function ($compile) {
        return {
            controller: 'CellRruController',
            restrict: 'EA',
            replace: true,
            scope: {
                items: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    })

    .controller('LteCellController', function ($scope) {
        $scope.gridOptions = {
            columnDefs: [
                {
                    name: '小区名称',
                    cellTemplate: '<span class="text-primary">{{row.entity.eNodebName}}-{{row.entity.sectorId}}</span>'
                },
                { field: 'frequency', name: '频点' },
                { field: 'pci', name: 'PCI' },
                { field: 'tac', name: 'TAC' },
                { field: 'prach', name: 'PRACH' },
                { field: 'rsPower', name: 'RS功率' },
                { field: 'indoor', name: '室内外' },
                { field: 'height', name: '高度' },
                { field: 'azimuth', name: '方位角' },
                { field: 'downTilt', name: '下倾' },
                { field: 'antennaGain', name: '天线增益(dB)' },
                {
                    name: '详细信息',
                    cellTemplate: '<a ng-href="{{grid.appScope.rootPath}}cellInfo/{{row.entity.eNodebId}}/{{row.entity.eNodebName}}/{{row.entity.sectorId}}" class="btn btn-sm btn-primary">小区信息</a>'
                }
            ],
            data: []
        };
    })
    .directive('lteCellTable', function ($compile) {
        return {
            controller: 'LteCellController',
            restrict: 'EA',
            replace: true,
            scope: {
                items: '=',
                rootPath: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        }
    })

    .controller('CellSelectionController', function ($scope) {
        $scope.gridOptions = {
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            showGridFooter: true
        };
        $scope.gridOptions.multiSelect = true;
        $scope.gridOptions.columnDefs = [
            {
                name: '小区名称',
                cellTemplate: '<span class="text-primary">{{row.entity.eNodebName}}-{{row.entity.sectorId}}</span>'
            },
            { field: 'frequency', name: '频点' },
            { field: 'pci', name: 'PCI' },
            { field: 'tac', name: 'TAC' },
            { field: 'prach', name: 'PRACH' },
            { field: 'rsPower', name: 'RS功率' },
            { field: 'indoor', name: '室内外' },
            { field: 'height', name: '高度' },
            { field: 'azimuth', name: '方位角' },
            { field: 'downTilt', name: '下倾' },
            { field: 'antennaGain', name: '天线增益(dB)' }
        ];
        $scope.gridOptions.data = [];
        $scope.gridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
        };
    })
    .directive('cellSelectionTable', function ($compile, calculateService) {
        return calculateService.generateGridDirective({
            controllerName: 'CollegeSelectionController',
            scope: {
                items: '=',
                gridApi: '='
            },
            argumentName: 'items'
        }, $compile); 
    })

    .controller('LteCellFlowController', function ($scope) {
        $scope.gridOptions = {
            columnDefs: [
                {
                    name: '小区名称',
                    cellTemplate: '<span class="text-primary">{{row.entity.eNodebName}}-{{row.entity.sectorId}}</span>'
                },
                { field: 'frequency', name: '频点' },
                {
                    field: 'rruName', name: 'RRU名称',
                    cellTooltip: function (row) {
                        return row.entity.rruName;
                    }
                },
                { field: 'rsPower', name: 'RS功率' },
                { field: 'indoor', name: '室内外' },
                { field: 'height', name: '高度' },
                { field: 'antennaGain', name: '天线增益(dB)' },
                { field: 'pdcpDownlinkFlow', name: '平均下行流量(MB)', cellFilter: 'number: 2' },
                { field: 'pdcpUplinkFlow', name: '平均上行流量(MB)', cellFilter: 'number: 2' },
                { field: 'averageUsers', name: '平均用户数', cellFilter: 'number: 2' }
            ],
            data: []
        };
    })
    .directive('lteCellFlowTable', function ($compile) {
        return {
            controller: 'LteCellFlowController',
            restrict: 'EA',
            replace: true,
            scope: {
                items: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        }
    })

    .controller('CdmaCellController', function ($scope) {
        $scope.gridOptions = {
            columnDefs: [
                {
                    name: '小区名称',
                    cellTemplate: '<span class="text-primary">{{row.entity.btsName}}-{{row.entity.sectorId}}</span>'
                },
                { field: 'frequency', name: '频点' },
                { field: 'cellType', name: '小区类别' },
                { field: 'frequencyList', name: '频点列表' },
                { field: 'cellId', name: '小区编号' },
                { field: 'lac', name: 'LAC' },
                { field: 'pn', name: 'PN' },
                { field: 'height', name: '高度' },
                { field: 'azimuth', name: '方位角' },
                { field: 'downTilt', name: '下倾' },
                { field: 'antennaGain', name: '天线增益(dB)' }
            ],
            data: []
        };
    })
    .directive('cdmaCellTable', function ($compile) {
        return {
            restrict: 'EA',
            controller: 'CdmaCellController',
            replace: true,
            scope: {
                items: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        }
    })

    .controller('CellDetailsController', function ($scope, networkElementService, cellHuaweiMongoService) {
        networkElementService.queryCellInfo($scope.eNodebId, $scope.sectorId).then(function (result) {
            $scope.lteCellDetails = result;
        });
        cellHuaweiMongoService.queryCellParameters($scope.eNodebId, $scope.sectorId).then(function (info) {
            $scope.cellMongo = info;
        });
    })
    .directive('cellDetails', function(parametersRoot) {
        return {
            controller: 'CellDetailsController',
            restrict: 'EA',
            replace: true,
            scope: {
                eNodebId: '=',
                sectorId: '='
            },
            templateUrl: parametersRoot + 'cell/CellDetails.html'
        }
    })
    .directive('lteCellBasicInfo', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                neighbor: '='
            },
            templateUrl: parametersRoot + 'cell/BasicInfo.html'
        }
    });

angular.module('parameters.handoff', ['handoff.parameters'])
    .directive('eNodebIntraFreq', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                intraFreqHo: '='
            },
            templateUrl: parametersRoot + 'eNodeb/ENodebIntraFreq.html'
        }
    })
    .directive('eNodebInterFreq', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'eNodeb/ENodebInterFreq.html'
        }
    })
    .controller('CellIntraFreqController', function($scope, intraFreqHoService) {
        intraFreqHoService.queryCellParameters($scope.eNodebId, $scope.sectorId).then(function(result) {
            $scope.intraFreqHo = result;
        });
    })
    .directive('cellIntraFreq', function(parametersRoot) {
        return {
            restrict: 'EA',
            controller: 'CellIntraFreqController',
            replace: true,
            scope: {
                eNodebId: '=',
                sectorId: '='
            },
            templateUrl: parametersRoot + 'cell/CellIntraFreq.html'
        }
    })
    .directive('cellIntraFreqTable', function (parametersRoot) {
        return {
            restrict: 'EA',
            controller: 'CellIntraFreqController',
            replace: true,
            scope: {
                eNodebId: '=',
                sectorId: '='
            },
            templateUrl: parametersRoot + 'cell/CellIntraFreqTable.html'
        }
    })
    .directive('a1InterFreq', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/A1InterFreq.html'
        }
    })
    .directive('a2InterFreq', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/A2InterFreq.html'
        }
    })
    .directive('a3InterFreq', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/A3InterFreq.html'
        }
    })
    .directive('a4InterFreq', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/A4InterFreq.html'
        }
    })
    .directive('a5InterFreq', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/A5InterFreq.html'
        }
    })
    .controller('CellInterFreqController', function($scope, interFreqHoService) {
        interFreqHoService.queryCellParameters($scope.eNodebId, $scope.sectorId).then(function(result) {
            $scope.interFreqHo = result;
        });
    })
    .directive('cellInterFreq', function(parametersRoot) {
        return {
            restrict: 'EA',
            controller: 'CellInterFreqController',
            replace: true,
            scope: {
                eNodebId: '=',
                sectorId: '='
            },
            templateUrl: parametersRoot + 'cell/CellInterFreq.html'
        }
    });

angular.module('parameters.power', ['huawei.mongo.parameters'])
    .controller('CellChannelPowerControl', function($scope, cellPowerService) {
        cellPowerService.queryCellParameters($scope.eNodebId, $scope.sectorId).then(function(result) {
            $scope.cellPower = result;
        });
    })
    .directive('cellChannelPower', function(parametersRoot) {
        return {
            restrict: 'EA',
            controller: 'CellChannelPowerControl',
            replace: true,
            scope: {
                eNodebId: '=',
                sectorId: '='
            },
            templateUrl: parametersRoot + 'cell/Power.html'
        }
    })
    .controller('UplinkOpenLoopPowerControl', function($scope, cellPowerService) {
        cellPowerService.queryUlOpenLoopPowerControll($scope.eNodebId, $scope.sectorId).then(function(result) {
            $scope.item = result;
        });
    })
    .directive('uplinkOpenLoopPower', function(parametersRoot) {
        return {
            restrict: 'EA',
            controller: 'UplinkOpenLoopPowerControl',
            replace: true,
            scope: {
                eNodebId: '=',
                sectorId: '='
            },
            templateUrl: parametersRoot + 'cell/UlOpenLoopPowerControl.html'
        }
    });