angular.module('kpi.parameter', ['myApp.url', 'myApp.region', "ui.bootstrap"])
    .controller('dump.cell.mongo', function ($scope, $uibModalInstance,
        dumpProgress, appFormatService, dumpPreciseService, neighborMongoService,
        preciseInterferenceService, networkElementService,
        dialogTitle, cell, begin, end) {
        $scope.dialogTitle = dialogTitle;

        $scope.dateRecords = [];
        $scope.currentDetails = [];
        $scope.currentIndex = 0;

        $scope.ok = function () {
            $uibModalInstance.close($scope.dateRecords);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.queryRecords = function () {
            $scope.mrsRsrpStats = [];
            $scope.mrsTaStats = [];
            angular.forEach($scope.dateRecords, function (record) {
                dumpProgress.queryExistedItems(cell.eNodebId, cell.sectorId, record.date).then(function (result) {
                    record.existedRecords = result;
                });
                dumpProgress.queryMongoItems(cell.eNodebId, cell.sectorId, record.date).then(function (result) {
                    record.mongoRecords = result;
                });
                dumpProgress.queryMrsRsrpItem(cell.eNodebId, cell.sectorId, record.date).then(function (result) {
                    record.mrsRsrpStats = result;
                    if (result) {
                        $scope.mrsRsrpStats.push({
                            statDate: result.statDate,
                            data: _.map(_.range(48), function (index) {
                                return result['rsrP_' + appFormatService.prefixInteger(index, 2)];
                            })
                        });
                    }

                });
                dumpProgress.queryMrsTadvItem(cell.eNodebId, cell.sectorId, record.date).then(function (result) {
                    record.mrsTaStats = result;
                    if (result) {
                        $scope.mrsTaStats.push({
                            statDate: result.statDate,
                            data: _.map(_.range(44), function (index) {
                                return result['tadv_' + appFormatService.prefixInteger(index, 2)];
                            })
                        });
                    }

                });
                dumpProgress.queryMrsPhrItem(cell.eNodebId, cell.sectorId, record.date).then(function (result) {
                    //console.log(result['powerHeadRoom_00']);
                    record.mrsPhrStats = result;
                });
                dumpProgress.queryMrsTadvRsrpItem(cell.eNodebId, cell.sectorId, record.date).then(function (result) {
                    //console.log(result['tadv00Rsrp00']);
                    record.mrsTaRsrpStats = result;
                });
            });
        };

        $scope.updateDetails = function (index) {
            $scope.currentIndex = index % $scope.dateRecords.length;
        };

        $scope.dumpAllRecords = function () {
            dumpPreciseService.dumpAllRecords($scope.dateRecords, 0, 0, cell.eNodebId, cell.sectorId, $scope.queryRecords);
        };

        $scope.showNeighbors = function () {
            $scope.neighborCells = [];
            networkElementService.queryCellNeighbors(cell.eNodebId, cell.sectorId).then(function (result) {
                $scope.neighborCells = result;
            });

        };
        $scope.showReverseNeighbors = function () {
            neighborMongoService.queryReverseNeighbors(cell.eNodebId, cell.sectorId).then(function (result) {
                $scope.reverseCells = result;
                angular.forEach(result, function (neighbor) {
                    networkElementService.queryENodebInfo(neighbor.cellId).then(function (info) {
                        neighbor.eNodebName = info.name;
                    });
                });
            });
        }
        $scope.updatePci = function () {
            networkElementService.updateCellPci(cell).then(function (result) {
                $scope.updateMessages.push({
                    cellName: cell.name + '-' + cell.sectorId,
                    counts: result
                });
                $scope.showNeighbors();
            });
        };
        $scope.synchronizeNeighbors = function () {
            var count = 0;
            neighborMongoService.queryNeighbors(cell.eNodebId, cell.sectorId).then(function (neighbors) {
                angular.forEach(neighbors, function (neighbor) {
                    if (neighbor.neighborCellId > 0 && neighbor.neighborPci > 0) {
                        networkElementService.updateNeighbors(neighbor.cellId, neighbor.sectorId, neighbor.neighborPci,
                            neighbor.neighborCellId, neighbor.neighborSectorId).then(function () {
                                count += 1;
                                if (count === neighbors.length) {
                                    $scope.updateMessages.push({
                                        cellName: $scope.currentCellName,
                                        counts: count
                                    });
                                    $scope.showNeighbors();
                                }
                            });
                    } else {
                        count += 1;
                        if (count === neighbors.length) {
                            $scope.updateMessages.push({
                                cellName: $scope.currentCellName,
                                counts: count
                            });
                            $scope.showNeighbors();
                        }
                    }
                });
            });
        };

        var startDate = new Date(begin);
        while (startDate < end) {
            var date = new Date(startDate);
            $scope.dateRecords.push({
                date: date,
                existedRecords: 0,
                existedStat: false
            });
            startDate.setDate(date.getDate() + 1);
        }
        $scope.neighborCells = [];
        $scope.updateMessages = [];

        $scope.queryRecords();
        $scope.showReverseNeighbors();
        $scope.showNeighbors();
    })
    .controller("rutrace.interference", function ($scope, $uibModalInstance, cell,
        topPreciseService, kpiDisplayService, preciseInterferenceService, neighborMongoService, networkElementService) {
        $scope.currentCellName = cell.name + "-" + cell.sectorId;
        $scope.dialogTitle = "TOP指标干扰分析: " + $scope.currentCellName;
        $scope.oneAtATime = false;
        $scope.orderPolicy = topPreciseService.getOrderPolicySelection();
        $scope.updateMessages = [];

        networkElementService.queryCellInfo(cell.cellId, cell.sectorId).then(function (info) {
            $scope.current = {
                cellId: cell.cellId,
                sectorId: cell.sectorId,
                eNodebName: cell.name,
                longtitute: info.longtitute,
                lattitute: info.lattitute
            };
        });

        $scope.showInterference = function () {
            $scope.interferenceCells = [];
            $scope.victimCells = [];

            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                cell.cellId, cell.sectorId).then(function (result) {
                    angular.forEach(result, function (interference) {
                        for (var i = 0; i < $scope.mongoNeighbors.length; i++) {
                            var neighbor = $scope.mongoNeighbors[i];
                            if (neighbor.neighborPci === interference.destPci) {
                                interference.isMongoNeighbor = true;
                                break;
                            }
                        }
                    });
                    $scope.interferenceCells = result;
                    preciseInterferenceService.queryInterferenceVictim($scope.beginDate.value, $scope.endDate.value,
                        cell.cellId, cell.sectorId).then(function (victims) {
                            angular.forEach(victims, function (victim) {
                                for (var j = 0; j < result.length; j++) {
                                    if (result[j].destENodebId === victim.victimENodebId
                                        && result[j].destSectorId === victim.victimSectorId) {
                                        victim.forwardInterferences6Db = result[j].overInterferences6Db;
                                        victim.forwardInterferences10Db = result[j].overInterferences10Db;
                                        break;
                                    }
                                }
                            });
                            $scope.victimCells = victims;
                        });
                    var pieOptions = kpiDisplayService.getInterferencePieOptions(result, $scope.currentCellName);
                    $("#interference-over6db").highcharts(pieOptions.over6DbOption);
                    $("#interference-over10db").highcharts(pieOptions.over10DbOption);
                    $("#interference-mod3").highcharts(pieOptions.mod3Option);
                    $("#interference-mod6").highcharts(pieOptions.mod6Option);
                    topPreciseService.queryRsrpTa($scope.beginDate.value, $scope.endDate.value,
                        cell.cellId, cell.sectorId).then(function (info) {
                        });
                });
        };

        $scope.updateNeighborInfos = function () {
            preciseInterferenceService.updateInterferenceNeighbor(cell.cellId, cell.sectorId).then(function (result) {
                $scope.updateMessages.push({
                    cellName: $scope.currentCellName,
                    counts: result,
                    type: "干扰"
                });
            });

            preciseInterferenceService.updateInterferenceVictim(cell.cellId, cell.sectorId).then(function (result) {
                $scope.updateMessages.push({
                    cellName: $scope.currentCellName,
                    counts: result,
                    type: "被干扰"
                });
            });
        }

        $scope.ok = function () {
            $uibModalInstance.close($scope.mongoNeighbors);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        neighborMongoService.queryNeighbors(cell.cellId, cell.sectorId).then(function (result) {
            $scope.mongoNeighbors = result;
            $scope.showInterference();
            $scope.updateNeighborInfos();
        });
    })
    .controller("rutrace.coverage", function ($scope, cell, $uibModalInstance,
        topPreciseService, preciseInterferenceService,
        preciseChartService, coverageService, kpiDisplayService) {
        $scope.currentCellName = cell.name + "-" + cell.sectorId;
        $scope.dialogTitle = "TOP指标覆盖分析: " + $scope.currentCellName;
        $scope.orderPolicy = topPreciseService.getOrderPolicySelection();
        $scope.detailsDialogTitle = cell.name + "-" + cell.sectorId + "详细小区统计";
        $scope.cellId = cell.cellId;
        $scope.sectorId = cell.sectorId;
        $scope.showCoverage = function () {
            topPreciseService.queryRsrpTa($scope.beginDate.value, $scope.endDate.value,
                cell.cellId, cell.sectorId).then(function (result) {
                    for (var rsrpIndex = 0; rsrpIndex < 12; rsrpIndex++) {
                        var options = preciseChartService.getRsrpTaOptions(result, rsrpIndex);
                        $("#rsrp-ta-" + rsrpIndex).highcharts(options);
                    }
                });
            topPreciseService.queryCoverage($scope.beginDate.value, $scope.endDate.value,
                cell.cellId, cell.sectorId).then(function (result) {
                    var options = preciseChartService.getCoverageOptions(result);
                    $("#coverage-chart").highcharts(options);
                });
            topPreciseService.queryTa($scope.beginDate.value, $scope.endDate.value,
                cell.cellId, cell.sectorId).then(function (result) {
                    var options = preciseChartService.getTaOptions(result);
                    $("#ta-chart").highcharts(options);
                });
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                cell.cellId, cell.sectorId).then(function (result) {
                    $scope.interferenceCells = result;
                    angular.forEach($scope.interferenceCells, function (neighbor) {
                        if (neighbor.destENodebId > 0) {
                            kpiDisplayService.updateCoverageKpi(neighbor, {
                                cellId: neighbor.destENodebId,
                                sectorId: neighbor.destSectorId
                            }, {
                                begin: $scope.beginDate.value,
                                end: $scope.endDate.value
                            });
                        }
                    });
                });
            preciseInterferenceService.queryInterferenceVictim($scope.beginDate.value, $scope.endDate.value,
                cell.cellId, cell.sectorId).then(function (result) {
                    $scope.interferenceVictims = result;
                    angular.forEach($scope.interferenceVictims, function (victim) {
                        if (victim.victimENodebId > 0) {
                            kpiDisplayService.updateCoverageKpi(victim, {
                                cellId: victim.victimENodebId,
                                sectorId: victim.victimSectorId
                            }, {
                                begin: $scope.beginDate.value,
                                end: $scope.endDate.value
                            });
                        }
                    });
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.interferenceCells);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showCoverage();
    })

    .controller('map.source.dialog', function ($scope, $uibModalInstance, neighbor, dialogTitle, topPreciseService, preciseChartService) {
        $scope.neighbor = neighbor;
        $scope.dialogTitle = dialogTitle;
        if (neighbor.cellId !== undefined) {
            $scope.cellId = neighbor.cellId;
            $scope.sectorId = neighbor.sectorId;
        } else {
            $scope.cellId = neighbor.destENodebId;
            $scope.sectorId = neighbor.destSectorId;
        }
        topPreciseService.queryCoverage($scope.beginDate.value, $scope.endDate.value,
            $scope.cellId, $scope.sectorId).then(function (result) {
                var options = preciseChartService.getCoverageOptions(result);
                $("#coverage-chart").highcharts(options);
            });
        $scope.ok = function () {
            $uibModalInstance.close($scope.neighbor);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("cell.info.dialog", function ($scope, cell, dialogTitle, neighborMongoService, $uibModalInstance) {
        $scope.dialogTitle = dialogTitle;
        $scope.isHuaweiCell = false;
        $scope.eNodebId = cell.eNodebId;
        $scope.sectorId = cell.sectorId;

        $scope.ok = function () {
            $uibModalInstance.close($scope.mongoNeighbors);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        neighborMongoService.queryNeighbors(cell.eNodebId, cell.sectorId).then(function (result) {
            $scope.mongoNeighbors = result;
        });

    })

    .controller('query.setting.dialog', function ($scope, $uibModalInstance, city, dialogTitle, beginDate, endDate,
    appRegionService, parametersMapService, parametersDialogService, networkElementService) {
        $scope.network = {
            options: ["LTE", "CDMA"],
            selected: "LTE"
        };
        $scope.queryText = "";
        $scope.city = city;
        $scope.dialogTitle = dialogTitle;
        $scope.beginDate = beginDate;
        $scope.endDate = endDate;
        $scope.eNodebList = [];
        $scope.btsList = [];

        $scope.updateDistricts = function () {
            appRegionService.queryDistricts($scope.city.selected).then(function (result) {
                $scope.district.options = result;
                $scope.district.selected = result[0];
            });
        };
        $scope.updateTowns = function () {
            appRegionService.queryTowns($scope.city.selected, $scope.district.selected).then(function (result) {
                $scope.town.options = result;
                $scope.town.selected = result[0];
            });
        };

        $scope.queryItems = function () {
            if ($scope.network.selected === "LTE") {
                if ($scope.queryText.trim() === "") {
                    networkElementService.queryENodebsInOneTown($scope.city.selected, $scope.district.selected, $scope.town.selected).then(function (eNodebs) {
                        $scope.eNodebList = eNodebs;
                    });
                } else {
                    networkElementService.queryENodebsByGeneralName($scope.queryText).then(function (eNodebs) {
                        $scope.eNodebList = eNodebs;
                    });
                }
            } else {
                if ($scope.queryText.trim() === "") {
                    networkElementService.queryBtssInOneTown($scope.city.selected, $scope.district.selected, $scope.town.selected).then(function (btss) {
                        $scope.btsList = btss;
                    });
                } else {
                    networkElementService.queryBtssByGeneralName($scope.queryText).then(function (btss) {
                        $scope.btsList = btss;
                    });
                }
            }
        };
        appRegionService.queryDistricts($scope.city.selected).then(function (districts) {
            $scope.district = {
                options: districts,
                selected: districts[0]
            };
            appRegionService.queryTowns($scope.city.selected, $scope.district.selected).then(function (towns) {
                $scope.town = {
                    options: towns,
                    selected: towns[0]
                };
            });
        });
        $scope.ok = function () {
            if ($scope.network.selected === "LTE") {
                if ($scope.queryText.trim() === "") {
                    parametersMapService.showElementsInOneTown($scope.city.selected, $scope.district.selected, $scope.town.selected,
                        $scope.beginDate, $scope.endDate);
                } else {
                    parametersMapService.showElementsWithGeneralName($scope.queryText, $scope.beginDate, $scope.endDate);
                }
            } else {
                if ($scope.queryText.trim() === "") {
                    parametersMapService.showCdmaInOneTown($scope.city.selected, $scope.district.selected, $scope.town.selected);
                } else {
                    parametersMapService.showCdmaWithGeneralName($scope.queryText);
                }
            }
            $uibModalInstance.close($scope.neighbor);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("parameters.list", function ($scope, $uibModalInstance, city, dialogTitle, appRegionService, parametersChartService) {
        $scope.city = city;
        $scope.dialogTitle = dialogTitle;
        $scope.showCityStats = function () {
            appRegionService.queryDistrictInfrastructures($scope.city.selected).then(function (result) {
                appRegionService.accumulateCityStat(result, $scope.city.selected);
                $scope.districtStats = result;

                $("#cityLteENodebConfig").highcharts(parametersChartService.getDistrictLteENodebPieOptions(result.slice(0, result.length - 1),
                    $scope.city.selected));
                $("#cityLteCellConfig").highcharts(parametersChartService.getDistrictLteCellPieOptions(result.slice(0, result.length - 1),
                    $scope.city.selected));
                $("#cityNbIotCellConfig").highcharts(parametersChartService.getDistrictNbIotCellPieOptions(result.slice(0, result.length - 1),
                    $scope.city.selected));
                $("#cityCdmaENodebConfig").highcharts(parametersChartService.getDistrictCdmaBtsPieOptions(result.slice(0, result.length - 1),
                    $scope.city.selected));
                $("#cityCdmaCellConfig").highcharts(parametersChartService.getDistrictCdmaCellPieOptions(result.slice(0, result.length - 1),
                    $scope.city.selected));
            });
        };
        $scope.$watch('currentDistrict', function (district) {
            appRegionService.queryTownInfrastructures($scope.city.selected, district).then(function (result) {
                $scope.townStats = result;
                $("#districtLteENodebConfig").highcharts(parametersChartService.getTownLteENodebPieOptions(result, district));
                $("#districtLteCellConfig").highcharts(parametersChartService.getTownLteCellPieOptions(result, district));
                $("#districtNbIotCellConfig").highcharts(parametersChartService.getTownNbIotCellPieOptions(result, district));
                $("#districtCdmaENodebConfig").highcharts(parametersChartService.getTownCdmaBtsPieOptions(result, district));
                $("#districtCdmaCellConfig").highcharts(parametersChartService.getTownCdmaCellPieOptions(result, district));
            });
        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.neighbor);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showCityStats();
    })

    .controller('cell.type.chart', function ($scope, $uibModalInstance, city, dialogTitle, appRegionService, parametersChartService) {
        $scope.dialogTitle = dialogTitle;
        $scope.ok = function () {
            $uibModalInstance.close($scope.neighbor);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        appRegionService.queryDistrictIndoorCells(city.selected).then(function (stats) {
            $("#leftChart").highcharts(parametersChartService.getCellIndoorTypeColumnOptions(stats));
        });
        appRegionService.queryDistrictBandCells(city.selected).then(function (stats) {
            $("#rightChart").highcharts(parametersChartService.getCellBandClassColumnOptions(stats));
        });
    })
    .controller("flow.kpi.dialog", function ($scope, cell, begin, end, dialogTitle, flowService, generalChartService, calculateService,
        $uibModalInstance) {
        $scope.dialogTitle = dialogTitle;
        $scope.itemGroups = calculateService.generateFlowDetailsGroups(cell);
        flowService.queryAverageRrcByDateSpan(cell.eNodebId, cell.sectorId, begin, end).then(function(result) {
            $scope.rrcGroups = calculateService.generateRrcDetailsGroups(result);
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.mongoNeighbors);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        flowService.queryCellFlowByDateSpan(cell.eNodebId, cell.sectorId, begin, end).then(function (result) {
            var dates = _.map(result, function (stat) {
                return stat.statTime;
            });
            $("#flowChart").highcharts(generalChartService.queryMultipleColumnOptions({
                title: '流量统计',
                xtitle: '日期',
                ytitle: '流量（MB）'
            }, dates, [
                _.map(result, function (stat) {
                    return stat.pdcpDownlinkFlow;
                }),
                _.map(result, function (stat) {
                    return stat.pdcpUplinkFlow;
                })
            ], ['下行流量', '上行流量']));
            $("#feelingRateChart").highcharts(generalChartService.queryMultipleComboOptionsWithDoubleAxes({
                title: '感知速率',
                xtitle: '日期',
                ytitles: ['感知速率（Mbit/s）', '用户数']
            }, dates, [
                _.map(result, function (stat) {
                    return stat.downlinkFeelingRate;
                }),
                _.map(result, function (stat) {
                    return stat.uplinkFeelingRate;
                }),
                _.map(result, function (stat) {
                    return stat.maxUsers;
                })
            ], ['下行感知速率', '上行感知速率', '用户数'], ['line', 'line', 'column'], [0, 0, 1]));
            $("#downSwitchChart").highcharts(generalChartService.queryMultipleComboOptionsWithDoubleAxes({
                title: '4G下切3G次数统计',
                xtitle: '日期',
                ytitles: ['4G下切3G次数', '流量（MB）']
            }, dates, [
                _.map(result, function (stat) {
                    return stat.redirectCdma2000;
                }),
                _.map(result, function (stat) {
                    return stat.pdcpDownlinkFlow;
                }),
                _.map(result, function (stat) {
                    return stat.pdcpUplinkFlow;
                })
            ], ['4G下切3G次数', '下行流量', '上行流量'], ['column', 'line', 'line'], [0, 1, 1]));
            $("#rank2Chart").highcharts(generalChartService.queryMultipleComboOptionsWithDoubleAxes({
                title: '4G双流比统计',
                xtitle: '日期',
                ytitles: ['4G双流比（%）', '感知速率（Mbit/s）']
            }, dates, [
                _.map(result, function (stat) {
                    return stat.rank2Rate;
                }),
                _.map(result, function (stat) {
                    return stat.downlinkFeelingRate;
                }),
                _.map(result, function (stat) {
                    return stat.uplinkFeelingRate;
                })
            ], ['4G双流比', '下行感知速率', '上行感知速率'], ['column', 'line', 'line'], [0, 1, 1]));
        });
    })
    .controller("rrc.kpi.dialog", function ($scope, cell, begin, end, dialogTitle, flowService, generalChartService, calculateService,
        networkElementService, $uibModalInstance) {
        $scope.dialogTitle = dialogTitle;
        $scope.rrcGroups = calculateService.generateRrcDetailsGroups(cell);
        flowService.queryAverageFlowByDateSpan(cell.eNodebId, cell.sectorId, begin, end).then(function (result) {
            networkElementService.queryCellInfo(cell.eNodebId, cell.sectorId).then(function(item) {
                $scope.itemGroups = calculateService.generateFlowDetailsGroups(angular.extend(result, item));
            });
        });

        flowService.queryCellRrcByDateSpan(cell.eNodebId, cell.sectorId, begin, end).then(function(result) {
            var dates = _.map(result, function (stat) {
                return stat.statTime;
            });
            $("#rrcRequestChart").highcharts(generalChartService.queryMultipleColumnOptions({
                title: '连接请求数统计',
                xtitle: '日期',
                ytitle: 'RRC连接请求数'
            }, dates, [
                    _.map(result, function (stat) {
                        return stat.totalRrcRequest;
                    }),
                    _.map(result, function (stat) {
                        return stat.moDataRrcRequest;
                    }),
                    _.map(result, function (stat) {
                        return stat.moSignallingRrcRequest;
                    }),
                    _.map(result, function (stat) {
                        return stat.mtAccessRrcRequest;
                    })
            ], ['总连接次数', '主叫数据连接次数', '主叫信令连接次数', '被叫连接次数']));
            $("#rrcFailChart").highcharts(generalChartService.queryMultipleColumnOptions({
                title: '连接失败数统计',
                xtitle: '日期',
                ytitle: 'RRC连接失败次数'
            }, dates, [
                    _.map(result, function (stat) {
                        return stat.totalRrcFail;
                    }),
                    _.map(result, function (stat) {
                        return stat.moDataRrcFail;
                    }),
                    _.map(result, function (stat) {
                        return stat.moSignallingRrcFail;
                    }),
                    _.map(result, function (stat) {
                        return stat.mtAccessRrcFail;
                    })
            ], ['总连接失败次数', '主叫数据连接失败次数', '主叫信令连接失败次数', '被叫连接失败次数']));
            $("#rrcRateChart").highcharts(generalChartService.queryMultipleComboOptionsWithDoubleAxes({
                title: 'RRC连接成功率统计',
                xtitle: '日期',
                ytitles: ['连接成功率（%）', '连接次数']
            }, dates, [
                    _.map(result, function (stat) {
                        return stat.rrcSuccessRate * 100;
                    }),
                    _.map(result, function (stat) {
                        return stat.moSiganllingRrcRate * 100;
                    }),
                    _.map(result, function (stat) {
                        return stat.totalRrcRequest;
                    }),
                    _.map(result, function (stat) {
                        return stat.moSignallingRrcRequest;
                    })
            ], ['总体成功率', '主叫信令成功率', '总连接次数', '主叫信令连接次数'], ['line', 'line', 'column', 'column'], [0, 0, 1, 1]));
        });
        flowService.queryCellFlowByDateSpan(cell.eNodebId, cell.sectorId, begin, end).then(function(result) {
            var dates = _.map(result,
                function(stat) {
                    return stat.statTime;
                });
            $("#flowChart").highcharts(generalChartService.queryMultipleComboOptionsWithDoubleAxes({
                    title: '流量和用户数统计',
                    xtitle: '日期',
                    ytitles: ['流量（MB）', '感知速率（Mbit/s）']
                },
                dates,
                [
                    _.map(result,
                        function(stat) {
                            return stat.downlinkFeelingRate;
                        }),
                    _.map(result,
                        function(stat) {
                            return stat.uplinkFeelingRate;
                        }),
                    _.map(result, function (stat) {
                        return stat.pdcpDownlinkFlow;
                    }),
                    _.map(result, function (stat) {
                        return stat.pdcpUplinkFlow;
                    })
                ],
                ['下行感知速率', '上行感知速率', '下行流量', '上行流量'],
                ['line', 'line', 'column', 'column'],
                [1, 1, 0, 0]));
        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.mongoNeighbors);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    })
    .controller('neighbors.dialog', function ($scope, $uibModalInstance, geometryService,
        dialogTitle, candidateNeighbors, currentCell) {
        $scope.pciNeighbors = [];
        $scope.indoorConsidered = false;
        $scope.distanceOrder = "distance";
        $scope.dialogTitle = dialogTitle;
        $scope.candidateNeighbors = candidateNeighbors;
        $scope.currentCell = currentCell;

        angular.forEach($scope.candidateNeighbors, function (neighbor) {
            neighbor.distance = geometryService.getDistance($scope.currentCell.lattitute, $scope.currentCell.longtitute,
                neighbor.lattitute, neighbor.longtitute);

            $scope.pciNeighbors.push(neighbor);
        });

        $scope.updateNearestCell = function () {
            var minDistance = 10000;
            angular.forEach($scope.candidateNeighbors, function (neighbor) {
                if (neighbor.distance < minDistance && (neighbor.indoor === '室外' || $scope.indoorConsidered)) {
                    minDistance = neighbor.distance;
                    $scope.nearestCell = neighbor;
                }
            });

        };

        $scope.ok = function () {
            $scope.updateNearestCell();
            $uibModalInstance.close($scope.nearestCell);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .factory('neighborDialogService', function(menuItemService, networkElementService) {
        var matchNearest = function(nearestCell, currentNeighbor, center) {
            networkElementService.updateNeighbors(center.cellId, center.sectorId, currentNeighbor.destPci,
                nearestCell.eNodebId, nearestCell.sectorId).then(function() {
                currentNeighbor.neighborCellName = nearestCell.eNodebName + "-" + nearestCell.sectorId;
            });
        };
        return {
            dumpMongo: function(cell, beginDate, endDate) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Interference/DumpCellMongoDialog.html',
                    controller: 'dump.cell.mongo',
                    resolve: {
                        dialogTitle: function() {
                            return cell.name + "-" + cell.sectorId + "干扰数据导入";
                        },
                        cell: function() {
                            return cell;
                        },
                        begin: function() {
                            return beginDate;
                        },
                        end: function() {
                            return endDate;
                        }
                    }
                });
            },
            showInterference: function(cell, beginDate, endDate) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Interference/Index.html',
                    controller: 'rutrace.interference',
                    resolve: {
                        dialogTitle: function() {
                            return cell.name + "-" + cell.sectorId + "干扰指标分析";
                        },
                        cell: function() {
                            return cell;
                        },
                        begin: function() {
                            return beginDate;
                        },
                        end: function() {
                            return endDate;
                        }
                    }
                });
            },
            showCoverage: function(cell, beginDate, endDate) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Coverage/Index.html',
                    controller: 'rutrace.coverage',
                    resolve: {
                        dialogTitle: function() {
                            return cell.name + "-" + cell.sectorId + "覆盖指标分析";
                        },
                        cell: function() {
                            return cell;
                        },
                        begin: function() {
                            return beginDate;
                        },
                        end: function() {
                            return endDate;
                        }
                    }
                });
            },
            showPrecise: function(precise) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Map/PreciseSectorMapInfoBox.html',
                    controller: 'map.source.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return precise.eNodebName + "-" + precise.sectorId + "精确覆盖率指标";
                        },
                        neighbor: function() {
                            return precise;
                        }
                    }
                });
            },
            showCell: function(cell) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Parameters/Region/CellInfo.html',
                    controller: 'cell.info.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return cell.eNodebName + "-" + cell.sectorId + "小区详细信息";
                        },
                        cell: function() {
                            return cell;
                        }
                    }
                });
            },
            setQueryConditions: function(city, beginDate, endDate) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Parameters/QueryMap.html',
                    controller: 'query.setting.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return "小区信息查询条件设置";
                        },
                        city: function() {
                            return city;
                        },
                        beginDate: function() {
                            return beginDate;
                        },
                        endDate: function() {
                            return endDate;
                        }
                    }
                });
            },
            queryList: function(city) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Parameters/List.html',
                    controller: 'parameters.list',
                    resolve: {
                        dialogTitle: function() {
                            return "全网基站小区信息统计";
                        },
                        city: function() {
                            return city;
                        }
                    }
                });
            },
            queryCellTypeChart: function(city) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'cell.type.chart',
                    resolve: {
                        dialogTitle: function() {
                            return "全网小区类型统计";
                        },
                        city: function() {
                            return city;
                        }
                    }
                });
            },
            showFlowCell: function(cell) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Parameters/Region/FlowKpiInfo.html',
                    controller: 'flow.kpi.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return cell.item.eNodebName + "-" + cell.item.sectorId + "小区流量相关指标信息";
                        },
                        cell: function() {
                            return cell.item;
                        },
                        begin: function() {
                            return cell.beginDate.value;
                        },
                        end: function() {
                            return cell.endDate.value;
                        }
                    }
                });
            },
            showRrcCell: function (cell) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Parameters/Region/RrcKpiInfo.html',
                    controller: 'rrc.kpi.dialog',
                    resolve: {
                        dialogTitle: function () {
                            return cell.item.eNodebName + "-" + cell.item.sectorId + "小区RRC连接指标信息";
                        },
                        cell: function () {
                            return cell.item;
                        },
                        begin: function () {
                            return cell.beginDate.value;
                        },
                        end: function () {
                            return cell.endDate.value;
                        }
                    }
                });
            },
            showInterferenceSource: function(neighbor) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Map/SourceMapInfoBox.html',
                    controller: 'map.source.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return neighbor.neighborCellName + "干扰源信息";
                        },
                        neighbor: function() {
                            return neighbor;
                        }
                    }
                });
            },
            showInterferenceVictim: function(neighbor) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Map/VictimMapInfoBox.html',
                    controller: 'map.source.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return neighbor.victimCellName + "被干扰小区信息";
                        },
                        neighbor: function() {
                            return neighbor;
                        }
                    }
                });
            },
            matchNeighbor: function(center, candidate, neighbors) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Rutrace/Interference/MatchCellDialog.html',
                    controller: 'neighbors.dialog',
                    resolve: {
                        dialogTitle: function() {
                            return center.eNodebName + "-" + center.sectorId + "的邻区PCI=" + candidate.destPci + "的可能小区";
                        },
                        candidateNeighbors: function() {
                            return neighbors;
                        },
                        currentCell: function() {
                            return center;
                        }
                    }
                }, function(nearestCell) {
                    matchNearest(nearestCell, candidate, center);
                });
            }
        }
    });
