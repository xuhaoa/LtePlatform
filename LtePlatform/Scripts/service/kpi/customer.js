angular.module('kpi.customer', ['myApp.url', 'myApp.region', "ui.bootstrap"])
    .controller('emergency.new.dialog', function ($scope, $uibModalInstance, customerQueryService,
        dialogTitle, city, district, vehicularType) {
        $scope.dialogTitle = dialogTitle;
        $scope.message = "";
        $scope.city = city;
        $scope.district = district;
        $scope.vehicularType = vehicularType;

        var firstDay = new Date();
        firstDay.setDate(firstDay.getDate() + 7);
        var nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 14);
        $scope.itemBeginDate = {
            value: firstDay,
            opened: false
        };
        $scope.itemEndDate = {
            value: nextDay,
            opened: false
        };
        customerQueryService.queryDemandLevelOptions().then(function (options) {
            $scope.demandLevel = {
                options: options,
                selected: options[0]
            };
        });
        var transmitOptions = customerQueryService.queryTransmitFunctionOptions();
        $scope.transmitFunction = {
            options: transmitOptions,
            selected: transmitOptions[0]
        };
        var electrictOptions = customerQueryService.queryElectricSupplyOptions();
        $scope.electricSupply = {
            options: electrictOptions,
            selected: electrictOptions[0]
        };
        $scope.dto = {
            projectName: "和顺梦里水乡百合花文化节",
            expectedPeople: 500000,
            vehicles: 1,
            area: "万顷洋园艺世界",
            department: "南海区分公司客响维护部",
            person: "刘文清",
            phone: "13392293722",
            vehicleLocation: "门口东边100米处",
            otherDescription: "此次活动为佛山市南海区政府组织的一次大型文化活动，是宣传天翼品牌的重要场合。",
            townId: 1
        };

        $scope.ok = function () {
            $scope.dto.demandLevelDescription = $scope.demandLevel.selected;
            $scope.dto.beginDate = $scope.itemBeginDate.value;
            $scope.dto.endDate = $scope.itemEndDate.value;
            $scope.dto.vehicularTypeDescription = $scope.vehicularType.selected;
            $scope.dto.transmitFunction = $scope.transmitFunction.selected;
            $scope.dto.district = $scope.district.selected;
            $scope.dto.town = $scope.town.selected;
            $scope.dto.electricSupply = $scope.electricSupply.selected;
            $uibModalInstance.close($scope.dto);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('emergency.college.dialog', function ($scope, $uibModalInstance, serialNumber, collegeName,
        collegeQueryService, appFormatService, customerQueryService, appRegionService) {
        $scope.dialogTitle = collegeName + "应急通信车申请-" + serialNumber;
        $scope.dto = {
            projectName: collegeName + "应急通信车申请",
            expectedPeople: 500000,
            vehicles: 1,
            area: collegeName,
            department: "南海区分公司客响维护部",
            person: "刘文清",
            phone: "13392293722",
            vehicleLocation: "门口东边100米处",
            otherDescription: "应急通信车申请。",
            townId: 1
        };
        customerQueryService.queryDemandLevelOptions().then(function (options) {
            $scope.demandLevel = {
                options: options,
                selected: options[0]
            };
        });
        customerQueryService.queryVehicleTypeOptions().then(function (options) {
            $scope.vehicularType = {
                options: options,
                selected: options[17]
            };
        });
        var transmitOptions = customerQueryService.queryTransmitFunctionOptions();
        $scope.transmitFunction = {
            options: transmitOptions,
            selected: transmitOptions[0]
        };
        var electrictOptions = customerQueryService.queryElectricSupplyOptions();
        $scope.electricSupply = {
            options: electrictOptions,
            selected: electrictOptions[0]
        };
        collegeQueryService.queryByNameAndYear(collegeName, $scope.collegeInfo.year.selected).then(function (item) {
            $scope.itemBeginDate = {
                value: appFormatService.getDate(item.oldOpenDate),
                opened: false
            };
            $scope.itemEndDate = {
                value: appFormatService.getDate(item.newOpenDate),
                opened: false
            };
            $scope.dto.expectedPeople = item.expectedSubscribers;
        });
        customerQueryService.queryOneVip(serialNumber).then(function (item) {
            angular.forEach($scope.district.options, function (district) {
                if (district === item.district) {
                    $scope.district.selected = item.district;
                }
            });
            appRegionService.queryTowns($scope.city.selected, $scope.district.selected).then(function (towns) {
                $scope.town.options = towns;
                $scope.town.selected = towns[0];
                angular.forEach(towns, function (town) {
                    if (town === item.town) {
                        $scope.town.selected = town;
                    }
                });
            });
        });

        $scope.ok = function () {
            $scope.dto.demandLevelDescription = $scope.demandLevel.selected;
            $scope.dto.beginDate = $scope.itemBeginDate.value;
            $scope.dto.endDate = $scope.itemEndDate.value;
            $scope.dto.vehicularTypeDescription = $scope.vehicularType.selected;
            $scope.dto.transmitFunction = $scope.transmitFunction.selected;
            $scope.dto.district = $scope.district.selected;
            $scope.dto.town = $scope.town.selected;
            $scope.dto.electricSupply = $scope.electricSupply.selected;
            $uibModalInstance.close($scope.dto);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller('hot.spot.dialog', function ($scope, dialogTitle, $uibModalInstance, kpiPreciseService, baiduMapService) {
        $scope.dialogTitle = dialogTitle;
        $scope.dto = {
            longtitute: 112.99,
            lattitute: 22.98
        };

        kpiPreciseService.getHotSpotTypeSelection().then(function (result) {
            $scope.spotType = {
                options: result,
                selected: result[0]
            };
            baiduMapService.switchSubMap();
            baiduMapService.initializeMap("hot-map", 15);
            baiduMapService.addClickListener(function (e) {
                $scope.dto.longtitute = e.point.lng;
                $scope.dto.lattitute = e.point.lat;
                baiduMapService.clearOverlays();
                baiduMapService.addOneMarker(baiduMapService.generateMarker($scope.dto.longtitute, $scope.dto.lattitute));
            });
        });
        $scope.ok = function () {
            $scope.dto.typeDescription = $scope.spotType.selected;
            $uibModalInstance.close($scope.dto);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('hot.spot.modify', function ($scope, dialogTitle, dto, $uibModalInstance, kpiPreciseService, baiduMapService) {
        $scope.dialogTitle = dialogTitle;
        $scope.dto = dto;
        $scope.modify = true;

        kpiPreciseService.getHotSpotTypeSelection().then(function (result) {
            $scope.spotType = {
                options: result,
                selected: $scope.dto.typeDescription
            };
            baiduMapService.switchSubMap();
            baiduMapService.initializeMap("hot-map", 15);
            baiduMapService.addOneMarker(baiduMapService.generateMarker($scope.dto.longtitute, $scope.dto.lattitute));
            baiduMapService.setCellFocus($scope.dto.longtitute, $scope.dto.lattitute);
            baiduMapService.addClickListener(function (e) {
                $scope.dto.longtitute = e.point.lng;
                $scope.dto.lattitute = e.point.lat;
                baiduMapService.clearOverlays();
                baiduMapService.addOneMarker(baiduMapService.generateMarker($scope.dto.longtitute, $scope.dto.lattitute));
            });
        });
        $scope.ok = function () {
            $scope.dto.typeDescription = $scope.spotType.selected;
            $uibModalInstance.close($scope.dto);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('hot.spot.cell.dialog', function ($scope, dialogTitle, address, name, center, $uibModalInstance,
        basicImportService, collegeQueryService, networkElementService, neighborImportService, complainService) {
        $scope.dialogTitle = dialogTitle;
        $scope.address = address;
        $scope.gridApi = {};
        $scope.gridApi2 = {};
        $scope.query = function () {
            basicImportService.queryHotSpotCells(name).then(function (result) {
                $scope.candidateIndoorCells = result;
            });
            complainService.queryHotSpotCells(name).then(function (existedCells) {
                $scope.existedCells = existedCells;
                $scope.positionCells = [];
                networkElementService.queryRangeCells({
                    west: center.longtitute - 0.003,
                    east: center.longtitute + 0.003,
                    south: center.lattitute - 0.003,
                    north: center.lattitute + 0.003
                }).then(function (positions) {
                    neighborImportService.updateENodebRruInfo($scope.positionCells, {
                        dstCells: positions,
                        cells: existedCells,
                        longtitute: center.longtitute,
                        lattitute: center.lattitute
                    });
                });
            });
        };
        $scope.ok = function () {
            $uibModalInstance.close($scope.dto);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.importCells = function () {
            var cellNames = [];
            angular.forEach($scope.gridApi.selection.getSelectedRows(), function (cell) {
                cellNames.push(cell.cellName);
            });
            angular.forEach($scope.gridApi2.selection.getSelectedRows(), function (cell) {
                cellNames.push(cell.cellName);
            });
            collegeQueryService.saveCollegeCells({
                collegeName: name,
                cellNames: cellNames
            }).then(function () {
                $scope.query();
            });
        }
        $scope.query();
    })

    .controller('vip.supplement.dialog', function ($scope, $uibModalInstance,
        customerQueryService, appFormatService,
        dialogTitle, view, city, district) {
        $scope.dialogTitle = dialogTitle;
        $scope.view = view;
        $scope.city = city;
        $scope.district = district;
        $scope.matchFunction = function (text) {
            return $scope.view.projectName.indexOf(text) >= 0 || $scope.view.projectContents.indexOf(text) >= 0;
        };
        $scope.matchDistrictTown = function () {
            var districtOption = appFormatService.searchText($scope.district.options, $scope.matchFunction);
            if (districtOption) {
                $scope.district.selected = districtOption;
            }
        };
        $scope.$watch('town.selected', function () {
            var townOption = appFormatService.searchText($scope.town.options, $scope.matchFunction);
            if (townOption) {
                $scope.town.selected = townOption;
            }
        });

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.ok = function () {
            $scope.view.district = $scope.district.selected;
            $scope.view.town = $scope.town.selected;
            $uibModalInstance.close($scope.view);
        };
    })
    .controller('college.supplement.dialog', function ($scope, $uibModalInstance,
        customerQueryService, appFormatService, dialogTitle, view) {
        $scope.dialogTitle = dialogTitle;
        $scope.view = view;

        $scope.ok = function () {
            $scope.view.district = $scope.district.selected;
            $scope.view.town = $scope.town.selected;
            $uibModalInstance.close($scope.view);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('fiber.new.dialog', function ($scope, $uibModalInstance,
        dialogTitle, id, num) {
        $scope.dialogTitle = dialogTitle;

        $scope.item = {
            id: 0,
            emergencyId: id,
            workItemNumber: "FS-Fiber-" + new Date().getYear() + "-" + new Date().getMonth() + "-" + new Date().getDate() + "-" + num,
            person: "",
            beginDate: new Date(),
            finishDate: null
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.item);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('complain.supplement.dialog', function ($scope, $uibModalInstance,
        appRegionService, appFormatService, baiduMapService, parametersMapService, parametersDialogService, item) {
        $scope.dialogTitle = item.serialNumber + "工单信息补充";

        $scope.item = item;
        appRegionService.initializeCities().then(function (cities) {
            $scope.city.options = cities;
            $scope.city.selected = cities[0];
            appRegionService.queryDistricts($scope.city.selected).then(function (districts) {
                $scope.district.options = districts;
                $scope.district.selected = (item.district) ? item.district.replace('区', '') : districts[0];
                baiduMapService.initializeMap("map", 11);
                baiduMapService.addCityBoundary("佛山");
                if (item.longtitute && item.lattitute) {
                    var marker = baiduMapService.generateMarker(item.longtitute, item.lattitute);
                    baiduMapService.addOneMarker(marker);
                    baiduMapService.setCellFocus(item.longtitute, item.lattitute, 15);
                }
                if (item.sitePosition) {
                    parametersMapService.showElementsWithGeneralName(item.sitePosition,
                        parametersDialogService.showENodebInfo, parametersDialogService.showCellInfo);
                }
            });
        });

        $scope.matchTown = function () {
            var town = appFormatService.searchPattern($scope.town.options, item.sitePosition);
            if (town) {
                $scope.town.selected = town;
                return;
            }
            town = appFormatService.searchPattern($scope.town.options, item.buildingName);
            if (town) {
                $scope.town.selected = town;
                return;
            }
            town = appFormatService.searchPattern($scope.town.options, item.roadName);
            if (town) {
                $scope.town.selected = town;
            }
        };

        $scope.ok = function () {
            $scope.item.district = $scope.district.selected;
            $scope.item.town = $scope.town.selected;
            $uibModalInstance.close($scope.item);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .factory('customerDialogService', function(menuItemService, customerQueryService, emergencyService, complainService, basicImportService) {
        return {
            constructEmergencyCommunication: function(city, district, type, messages, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Customer/Dialog/Emergency.html',
                    controller: 'emergency.new.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return "新增应急通信需求";
                        },
                        city: function() {
                            return city;
                        },
                        district: function() {
                            return district;
                        },
                        vehicularType: function() {
                            return type;
                        }
                    }
                }, function(dto) {
                    customerQueryService.postDto(dto).then(function(result) {
                        if (result > 0) {
                            messages.push({
                                type: 'success',
                                contents: '完成应急通信需求：' + dto.projectName + '的导入'
                            });
                            callback();
                        } else {
                            messages.push({
                                type: 'warning',
                                contents: '最近已经有该需求，请不要重复导入'
                            });
                        }
                    });
                });
            },
            constructEmergencyCollege: function(serialNumber, collegeName, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Customer/Dialog/Emergency.html',
                    controller: 'emergency.college.dialog',
                    resolve: {
                        serialNumber: function() {
                            return serialNumber;
                        },
                        collegeName: function() {
                            return collegeName;
                        }
                    }
                }, function(dto) {
                    customerQueryService.postDto(dto).then(function(result) {
                        callback();
                    });
                });
            },
            constructHotSpot: function(callback, callback2) {
                menuItemService.showGeneralDialogWithDoubleAction({
                    templateUrl: '/appViews/Parameters/Import/HotSpot.html',
                    controller: 'hot.spot.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return '新增热点信息';
                        }
                    }
                }, function(dto) {
                    basicImportService.dumpOneHotSpot(dto).then(function(result) {
                        callback();
                    });
                }, callback2);
            },
            modifyHotSpot: function(item, callback, callback2) {
                menuItemService.showGeneralDialogWithDoubleAction({
                    templateUrl: '/appViews/Parameters/Import/HotSpot.html',
                    controller: 'hot.spot.modify',
                    resolve: {
                        dialogTitle: function() {
                            return '修改热点信息-' + item.hotspotName;
                        },
                        dto: function() {
                            return item;
                        }
                    }
                }, function(dto) {
                    basicImportService.dumpOneHotSpot(dto).then(function(result) {
                        callback();
                    });
                }, callback2);
            },
            manageHotSpotCells: function(hotSpot, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Parameters/Import/HotSpotCell.html',
                    controller: 'hot.spot.cell.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return hotSpot.hotspotName + '热点小区管理';
                        },
                        name: function() {
                            return hotSpot.hotspotName;
                        },
                        address: function() {
                            return hotSpot.address;
                        },
                        center: function() {
                            return {
                                longtitute: hotSpot.longtitute,
                                lattitute: hotSpot.lattitute
                            }
                        }
                    }
                }, function(dto) {
                    callback(dto);
                });
            },
            supplementVipDemandInfo: function(view, city, district, messages, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Customer/Dialog/VipSupplement.html',
                    controller: 'vip.supplement.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return "补充政企客户支撑需求信息";
                        },
                        view: function() {
                            return view;
                        },
                        city: function() {
                            return city;
                        },
                        district: function() {
                            return district;
                        }
                    }
                }, function(dto) {
                    customerQueryService.updateVip(dto).then(function() {
                        messages.push({
                            type: 'success',
                            contents: '完成政企客户支撑需求：' + dto.serialNumber + '的补充'
                        });
                        callback();
                    });
                });
            },
            supplementCollegeDemandInfo: function(view, messages) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Customer/Dialog/CollegeSupplement.html',
                    controller: 'college.supplement.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return "补充校园网支撑需求信息";
                        },
                        view: function() {
                            return view;
                        }
                    }
                }, function(dto) {
                    customerQueryService.updateVip(dto).then(function() {
                        messages.push({
                            type: 'success',
                            contents: '完成校园网支撑需求：' + dto.serialNumber + '的补充'
                        });
                    });
                });
            },
            constructFiberItem: function(id, num, callback, messages) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Customer/Dialog/Fiber.html',
                    controller: 'fiber.new.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return "新增光纤工单信息";
                        },
                        id: function() {
                            return id;
                        },
                        num: function() {
                            return num;
                        }
                    }
                }, function(item) {
                    emergencyService.createFiberItem(item).then(function(result) {
                        if (result) {
                            messages.push({
                                type: 'success',
                                contents: '完成光纤工单：' + item.workItemNumber + '的导入'
                            });
                            callback(result);
                        } else {
                            messages.push({
                                type: 'warning',
                                contents: '最近已经有该工单，请不要重复导入'
                            });
                        }
                    });
                });
            },
            supplementComplainInfo: function(item, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Customer/Dialog/Complain.html',
                    controller: 'complain.supplement.dialog',
                    resolve: {
                        item: function() {
                            return item;
                        }
                    }
                }, function(info) {
                    complainService.postPosition(info).then(function() {
                        callback();
                    });
                });
            }
        };
    });