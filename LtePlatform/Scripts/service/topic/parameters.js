﻿angular.module('topic.parameters', ['app.menu', 'app.core', 'topic.basic'])
    .factory('parametersDialogService',
        function(menuItemService, baiduMapService, stationFormatService) {
            return {
                showENodebInfo: function(eNodeb, beginDate, endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Parameters/Map/ENodebMapInfoBox.html',
                        controller: 'map.eNodeb.dialog',
                        resolve: stationFormatService.dateSpanDateResolve({
                                dialogTitle: function() {
                                    return eNodeb.name + "-" + "基站基本信息";
                                },
                                eNodeb: function() {
                                    return eNodeb;
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                showCellInfo: function(cell, beginDate, endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Rutrace/Map/NeighborMapInfoBox.html',
                        controller: 'map.neighbor.dialog',
                        resolve: stationFormatService.dateSpanDateResolve({
                                dialogTitle: function() {
                                    return cell.cellName + "小区信息";
                                },
                                neighbor: function() {
                                    return cell;
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                showBtsInfo: function(bts) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Parameters/Map/BtsMapInfoBox.html',
                        controller: 'map.bts.dialog',
                        resolve: {
                            dialogTitle: function() {
                                return bts.name + "-" + "基站基本信息";
                            },
                            bts: function() {
                                return bts;
                            }
                        }
                    });
                },
                showCdmaCellInfo: function(cell) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Parameters/Map/CdmaCellInfoBox.html',
                        controller: 'map.cdma.cell.dialog',
                        resolve: {
                            dialogTitle: function() {
                                return cell.cellName + "小区信息";
                            },
                            neighbor: function() {
                                return cell;
                            }
                        }
                    });
                },
                showTownDtInfo: function(item) {
                    menuItemService.showGeneralDialogWithAction({
                            templateUrl: '/appViews/College/Coverage/TownMap.html',
                            controller: 'town.dt.dialog',
                            resolve: {
                                dialogTitle: function() {
                                    return item.cityName + item.districtName + item.townName + "-" + "路测数据文件信息";
                                },
                                item: function() {
                                    return item;
                                }
                            }
                        },
                        function(info) {
                            baiduMapService.switchMainMap();
                        });
                },
                showStationList: function() {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Home/StationListDialog.html',
                        controller: 'map.stationList.dialog',
                        resolve: {
                            dialogTitle: function() {
                                return "基站列表";
                            }
                        }
                    });
                },
                showCheckPlanList: function (type) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Evaluation/Dialog/CheckPlanListDialog.html',
                        controller: 'map.checkPlanList.dialog',
                        resolve: {
                            dialogTitle: function () {
                                return "巡检计划列表";
                            },
                            type: function () {
                                return type;
                            }
                        }
                    });
                },
                showIndoorList: function () {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Home/IndoorListDialog.html',
                        controller: 'map.indoorList.dialog',
                        resolve: {
                            dialogTitle: function () {
                                return "室分列表";
                            }
                        }
                    });
                },
                showAddStationList: function (type) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Home/StationAddListDialog.html',
                        controller: 'map.stationAddList.dialog',
                        resolve: {
                            dialogTitle: function () {
                                return "待录入站点列表";
                            },
                            type: function () {
                                return type;
                            }
                        }
                    });
                },
                showStationEdit: function(stationId) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Home/StationEdit.html',
                        controller: 'map.stationEdit.dialog',
                        resolve: {
                            dialogTitle: function() {
                                return "编辑站点";
                            },
                            stationId: function() {
                                return stationId;
                            }
                        }
                    });
                },
                addCheckPlanDialog: function (stationId,name) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Home/AddCheckPlanDialog.html',
                        controller: 'map.addCheckPlan.dialog',
                        resolve: {
                            dialogTitle: function () {
                                return "添加巡检计划";
                            },
                            stationId: function () {
                                return stationId;
                            },
                            name: function () {
                                return name;
                            },
                        }
                    });
                },
                showIndoorEdit: function (stationId) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Home/IndoorEdit.html',
                        controller: 'map.indoorEdit.dialog',
                        resolve: {
                            dialogTitle: function () {
                                return "编辑站点";
                            },
                            stationId: function () {
                                return stationId;
                            }
                        }
                    });
                },
                showCommonStationEdit: function(stationId) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Home/CommonStationEdit.html',
                        controller: 'map.common-stationEdit.dialog',
                        resolve: {
                            dialogTitle: function() {
                                return "编辑站点";
                            },
                            stationId: function() {
                                return stationId;
                            }
                        }
                    });
                },
                showStationAdd: function(station) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Home/StationAdd.html',
                        controller: 'map.stationAdd.dialog',
                        resolve: {
                            dialogTitle: function() {
                                return "站点添加";
                            },
                            station: function () {
                                return station;
                            }
                        }
                    });
                },
                showIndoorAdd: function (station) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Home/IndoorAdd.html',
                        controller: 'map.indoorAdd.dialog',
                        resolve: {
                            dialogTitle: function () {
                                return "室分添加";
                            },
                            station: function () {
                                return station;
                            }
                        }
                    });
                },
                showCommonStationAdd: function(type) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/BasicKpi/CommonStationAdd.html',
                        controller: 'map.common-stationAdd.dialog',
                        resolve: {
                            dialogTitle: function() {
                                return "站点添加";
                            },
                            type: function() {
                                return type;
                            }
                        }
                    });
                },
                showCheckingStationInfo: function(station) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Evaluation/Dialog/CheckDetails.html',
                        controller: 'map.checkingStation.dialog',
                        resolve: {
                            dialogTitle: function() {
                                return "巡检信息:" + station.name;
                            },
                            station: function() {
                                return station;
                            }
                        }
                    });
                },
                showCheckingIndoorInfo: function(station) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Evaluation/Dialog/CheckIndoorDetails.html',
                        controller: 'map.checkingStation.dialog',
                        resolve: {
                            dialogTitle: function() {
                                return "巡检信息:" + station.name;
                            },
                            station: function() {
                                return station;
                            }
                        }
                    });
                },
                showAssessmentAdd: function () {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Evaluation/Dialog/AssessmentAddDialog.html',
                        controller: 'map.assessmentAdd.dialog',
                        resolve: {
                            dialogTitle: function() {
                                return "考核评分";
                            }
                        }
                    });
                },
                showAssessmentEdit: function (assessment) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Evaluation/Dialog/AssessmentEditDialog.html',
                        controller: 'map.assessmentEdit.dialog',
                        resolve: {
                            dialogTitle: function () {
                                return "修改评分";
                            },
                            assessment: function () {
                                return assessment;
                            }
                        }
                    });
                },
                showAssessmentDialog: function (assessment) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Evaluation/Dialog/AssessmentDialog.html',
                        controller: 'map.assessmentDetails.dialog',
                        resolve: {
                            dialogTitle: function () {
                                return "考核明细";
                            },
                            assessment: function () {
                                return assessment;
                            }
                        }
                    });
                },
                showAssessmentListDialog: function () {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Evaluation/Dialog/AssessmentListDialog.html',
                        controller: 'map.assessmentList.dialog',
                        resolve: {
                            dialogTitle: function () {
                                return "考核列表";
                            }
                        }
                    });
                },
                showConstructionInfo: function(site) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/BasicKpi/Construction.html',
                        controller: 'map.construction.dialog',
                        resolve: {
                            dialogTitle: function() {
                                return site.eNodebName + "站点信息";
                            },
                            site: function() {
                                return site;
                            }
                        }
                    });
                },
                showClusterPointInfo: function(site, currentClusterList) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/BasicKpi/ClusterPoint.html',
                        controller: 'cluster.point.dialog',
                        resolve: {
                            dialogTitle: function() {
                                return site.theme + "主题" + site.clusterNumber + "编号簇规划选点信息";
                            },
                            site: function() {
                                return site;
                            },
                            currentClusterList: function() {
                                return currentClusterList;
                            }
                        }
                    });
                },
                showCollegeCoverage: function(name, beginDate, endDate, coverageOverlays, callback) {
                    menuItemService.showGeneralDialogWithAction({
                            templateUrl: '/appViews/College/Coverage/CollegeMap.html',
                            controller: 'college.coverage.name',
                            resolve: stationFormatService.dateSpanDateResolve({
                                    name: function() {
                                        return name;
                                    },
                                    coverageOverlays: function() {
                                        return coverageOverlays;
                                    }
                                },
                                beginDate,
                                endDate)
                        },
                        callback);
                },
                manageCsvDtInfos: function(beginDate, endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/BasicKpi/CsvDtDialog.html',
                        controller: 'csv.dt.dialog',
                        resolve: stationFormatService.dateSpanDateResolve({
                                dialogTitle: function() {
                                    return "全网路测数据信息管理";
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                showHighwayDtInfos: function(beginDate, endDate, name) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/BasicKpi/HotspotDtDialog.html',
                        controller: 'highway.dt.dialog',
                        resolve: stationFormatService.dateSpanDateResolve({
                                dialogTitle: function() {
                                    return name + "路测数据信息查询";
                                },
                                name: function() {
                                    return name;
                                }
                            },
                            beginDate,
                            endDate)
                    });
                }
            }
        })
    .factory('parametersDisplayMapService',
        function(baiduMapService, parametersDialogService, baiduQueryService, networkElementService) {
            var showCellSectors = function(cells, xOffset, yOffset, beginDate, endDate, cellOverlays) {
                angular.forEach(cells,
                    function(cell) {
                        cell.longtitute += xOffset;
                        cell.lattitute += yOffset;
                        var cellSector = baiduMapService.generateSector(cell);
                        if (cellOverlays) {
                            cellOverlays.push(cellSector);
                        }
                        baiduMapService.addOneSectorToScope(cellSector,
                            function(item) {
                                parametersDialogService.showCellInfo(item, beginDate, endDate);
                            },
                            cell);
                    });
            };
            return {
                showENodebsElements:
                    function(eNodebs, beginDate, endDate, shouldShowCells, siteOverlays, cellOverlays) {
                        baiduQueryService.transformToBaidu(eNodebs[0].longtitute, eNodebs[0].lattitute)
                            .then(function(coors) {
                                var xOffset = coors.x - eNodebs[0].longtitute;
                                var yOffset = coors.y - eNodebs[0].lattitute;
                                angular.forEach(eNodebs,
                                    function(eNodeb) {
                                        eNodeb.longtitute += xOffset;
                                        eNodeb.lattitute += yOffset;
                                        var marker = baiduMapService.generateIconMarker(eNodeb.longtitute,
                                            eNodeb.lattitute,
                                            "/Content/Images/Hotmap/site_or.png");
                                        if (siteOverlays) {
                                            siteOverlays.push(marker);
                                        }
                                        baiduMapService.addOneMarkerToScope(marker,
                                            function(item) {
                                                parametersDialogService.showENodebInfo(item, beginDate, endDate);
                                            },
                                            eNodeb);
                                        if (shouldShowCells) {
                                            networkElementService.queryCellInfosInOneENodebUse(eNodeb.eNodebId)
                                                .then(function(cells) {
                                                    showCellSectors(cells,
                                                        xOffset,
                                                        yOffset,
                                                        beginDate,
                                                        endDate,
                                                        cellOverlays);
                                                });
                                        }

                                    });
                            });
                    },
                showCdmaElements: function(btss) {
                    baiduQueryService.transformToBaidu(btss[0].longtitute, btss[0].lattitute).then(function(coors) {
                        var xOffset = coors.x - btss[0].longtitute;
                        var yOffset = coors.y - btss[0].lattitute;
                        angular.forEach(btss,
                            function(bts) {
                                bts.longtitute += xOffset;
                                bts.lattitute += yOffset;
                                var marker = baiduMapService.generateIconMarker(bts.longtitute,
                                    bts.lattitute,
                                    "/Content/Images/Hotmap/site_bl.png");
                                baiduMapService.addOneMarkerToScope(marker,
                                    function(item) {
                                        parametersDialogService.showBtsInfo(item);
                                    },
                                    bts);
                                networkElementService.queryCdmaCellInfosInOneBts(bts.btsId).then(function(cells) {
                                    angular.forEach(cells,
                                        function(cell) {
                                            cell.longtitute += xOffset;
                                            cell.lattitute += yOffset;
                                            cell.btsId = bts.btsId;
                                            var cellSector = baiduMapService.generateSector(cell);
                                            baiduMapService.addOneSectorToScope(cellSector,
                                                function(item) {
                                                    parametersDialogService.showCdmaCellInfo(item);
                                                },
                                                cell);
                                        });
                                });
                            });
                    });
                },
                showCellSectors: function(cells, xOffset, yOffset, beginDate, endDate, cellOverlays) {
                    showCellSectors(cells, xOffset, yOffset, beginDate, endDate, cellOverlays);
                }
            };
        })
    .factory('parametersMapService',
        function(baiduMapService,
            networkElementService,
            baiduQueryService,
            workItemDialog,
            neGeometryService,
            collegeQueryService,
            appRegionService,
            parametersDialogService,
            collegeService,
            alarmsService,
            parametersDisplayMapService,
            stationFactory) {

            return {
                showElementsInOneTown: function(city, district, town, beginDate, endDate, siteOverlays, cellOverlays) {
                    networkElementService.queryENodebsInOneTownUse(city, district, town).then(function(eNodebs) {
                        parametersDisplayMapService
                            .showENodebsElements(eNodebs, beginDate, endDate, true, siteOverlays, cellOverlays);
                    });
                },
                showElementsInRange:
                    function(west, east, south, north, beginDate, endDate, siteOverlays, cellOverlays) {
                        networkElementService.queryInRangeENodebs(west, east, south, north).then(function(eNodebs) {
                            parametersDisplayMapService
                                .showENodebsElements(eNodebs, beginDate, endDate, true, siteOverlays, cellOverlays);
                        });
                    },
                showHotSpotCellSectors: function(hotSpotName, beginDate, endDate) {
                    collegeQueryService.queryHotSpotSectors(hotSpotName).then(function(sectors) {
                        baiduQueryService.transformToBaidu(sectors[0].longtitute, sectors[0].lattitute)
                            .then(function(coors) {
                                var xOffset = coors.x - sectors[0].longtitute;
                                var yOffset = coors.y - sectors[0].lattitute;
                                parametersDisplayMapService.showCellSectors(sectors, xOffset, yOffset, beginDate, endDate);
                            });
                    });
                },
                showCollegeENodebs: function(name, beginDate, endDate) {
                    collegeService.queryENodebs(name).then(function(eNodebs) {
                        parametersDisplayMapService.showENodebsElements(eNodebs, beginDate, endDate);
                    });
                },
                showElementsWithGeneralName: function(name, beginDate, endDate) {
                    networkElementService.queryENodebsByGeneralNameInUse(name).then(function(eNodebs) {
                        if (eNodebs.length === 0) return;
                        parametersDisplayMapService.showENodebsElements(eNodebs, beginDate, endDate, true);
                    });
                },
                showCdmaInOneTown: function(city, district, town) {
                    networkElementService.queryBtssInOneTown(city, district, town).then(function(btss) {
                        parametersDisplayMapService.showCdmaElements(btss);
                    });
                },
                showCdmaWithGeneralName: function(name) {
                    networkElementService.queryBtssByGeneralName(name).then(function(btss) {
                        if (btss.length === 0) return;
                        parametersDisplayMapService.showCdmaElements(btss);
                    });
                },
                showENodebs: function(eNodebs, beginDate, endDate) {
                    parametersDisplayMapService.showENodebsElements(eNodebs, beginDate, endDate, false);
                },
                showBtssElements: function(btss) {
                    return parametersDisplayMapService.showCdmaElements(btss);
                },
                showCellSectors: function(cells, showCellInfo) {
                    baiduQueryService.transformToBaidu(cells[0].longtitute, cells[0].lattitute).then(function(coors) {
                        var xOffset = coors.x - cells[0].longtitute;
                        var yOffset = coors.y - cells[0].lattitute;
                        baiduMapService.setCellFocus(coors.x, coors.y, 16);
                        angular.forEach(cells,
                            function(cell) {
                                cell.longtitute += xOffset;
                                cell.lattitute += yOffset;
                                var cellSector = baiduMapService.generateSector(cell);
                                baiduMapService.addOneSectorToScope(cellSector,
                                    function(item) {
                                        showCellInfo(item);
                                    },
                                    cell);
                            });
                    });
                },
                showPhpElements: function(elements, showElementInfo) {
                    baiduQueryService.transformToBaidu(elements[0].longtitute, elements[0].lattitute)
                        .then(function(coors) {
                            var xOffset = coors.x - parseFloat(elements[0].longtitute);
                            var yOffset = coors.y - parseFloat(elements[0].lattitute);
                            angular.forEach(elements,
                                function(element) {
                                    element.longtitute = xOffset + parseFloat(element.longtitute);
                                    element.lattitute = yOffset + parseFloat(element.lattitute);
                                    var marker = baiduMapService.generateIconMarker(element.longtitute,
                                        element.lattitute,
                                        "/Content/Images/Hotmap/site_or.png");
                                    baiduMapService.addOneMarkerToScope(marker, showElementInfo, element);
                                });
                        });
                },
                showIntervalPoints: function(intervals, coverageOverlays) {
                    angular.forEach(intervals,
                        function(interval) {
                            var coors = interval.coors;
                            var index;
                            if (coors.length === 0) {
                                return;
                            } else
                                index = parseInt(coors.length / 2);
                            baiduQueryService.transformBaiduCoors(coors[index]).then(function(newCoor) {
                                var xoffset = coors[index].longtitute - newCoor.longtitute;
                                var yoffset = coors[index].lattitute - newCoor.lattitute;
                                var points = baiduMapService.drawMultiPoints(coors, interval.color, xoffset, yoffset);
                                if (coverageOverlays)
                                    coverageOverlays.push(points);
                            });
                        });
                },
                showIntervalGrids: function(intervals, coverageOverlays) {
                    angular.forEach(intervals,
                        function(interval) {
                            var coors = interval.coors;
                            var index;
                            if (coors.length === 0) {
                                return;
                            } else
                                index = parseInt(coors.length / 2);
                            baiduQueryService.transformBaiduCoors(coors[index]).then(function(newCoor) {
                                var xoffset = coors[index].longtitute - newCoor.longtitute;
                                var yoffset = coors[index].lattitute - newCoor.lattitute;
                                angular.forEach(coors,
                                    function(coor) {
                                        var polygon = baiduMapService.drawRectangleWithColor([
                                                coor.longtitute - xoffset,
                                                coor.lattitute - yoffset,
                                                coor.longtitute + 0.00049 - xoffset,
                                                coor.lattitute + 0.00045 - yoffset
                                            ],
                                            interval.color);
                                        if (coverageOverlays)
                                            coverageOverlays.push(polygon);
                                    });

                            });
                        });
                },
                displaySourceDistributions: function(sites, filters, colors) {
                    baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function(coors) {
                        var xOffset = coors.x - sites[0].longtitute;
                        var yOffset = coors.y - sites[0].lattitute;
                        angular.forEach(filters,
                            function(filter, $index) {
                                var stats = _.filter(sites, filter);
                                baiduMapService.drawMultiPoints(stats,
                                    colors[$index],
                                    -xOffset,
                                    -yOffset,
                                    function(e) {
                                        var xCenter = e.point.lng - xOffset;
                                        var yCenter = e.point.lat - yOffset;
                                        var container = neGeometryService.queryNearestRange(xCenter, yCenter);
                                        networkElementService.queryRangeDistributions(container).then(function(items) {
                                            if (items.length) {
                                                workItemDialog.showDistributionInfo(items[0]);
                                            }
                                        });
                                    });
                            });
                    });
                },
                showTownBoundaries: function(city, district, town, color) {
                    appRegionService.queryTownBoundaries(city, district, town).then(function(boundaries) {
                        angular.forEach(boundaries,
                            function(boundary) {
                                baiduQueryService
                                    .transformToBaidu(boundary.boundaryGeoPoints[0].longtitute,
                                        boundary.boundaryGeoPoints[0].lattitute).then(function(coors) {
                                        var xOffset = coors.x - boundary.boundaryGeoPoints[0].longtitute;
                                        var yOffset = coors.y - boundary.boundaryGeoPoints[0].lattitute;
                                        baiduMapService
                                            .addBoundary(boundary.boundaryGeoPoints, color, xOffset, yOffset);
                                    });
                            });
                    });
                },
                showAreaBoundaries: function() {
                    appRegionService.queryAreaBoundaries().then(function(boundaries) {
                        angular.forEach(boundaries,
                            function(boundary) {
                                var color = stationFactory.getAreaTypeColor(boundary.areaType);
                                baiduQueryService
                                    .transformToBaidu(boundary.boundaryGeoPoints[0].longtitute,
                                    boundary.boundaryGeoPoints[0].lattitute).then(function (coors) {
                                        var xOffset = coors.x - boundary.boundaryGeoPoints[0].longtitute;
                                        var yOffset = coors.y - boundary.boundaryGeoPoints[0].lattitute;
                                        baiduMapService
                                            .addFilledBoundary(boundary.boundaryGeoPoints, color, xOffset, yOffset);
                                        baiduMapService.drawLabel(boundary.areaName,
                                            boundary.boundaryGeoPoints[0].longtitute + xOffset,
                                            boundary.boundaryGeoPoints[0].lattitute + yOffset);
                                    });
                            });
                    });
                },
                displayClusterPoints: function(clusterList, overlays, threshold, baseCoor) {
                    var baseX = baseCoor ? baseCoor.longtitute : clusterList[0].longtitute;
                    var baseY = baseCoor ? baseCoor.lattitute : clusterList[0].lattitute;
                    baiduQueryService.transformToBaidu(baseX, baseY).then(function(coors) {
                        var xOffset = coors.x - baseX;
                        var yOffset = coors.y - baseY;
                        angular.forEach(clusterList,
                            function(stat) {
                                var centerX = stat.bestLongtitute + xOffset + 0.000245;
                                var centerY = stat.bestLattitute + yOffset + 0.000225;
                                if (baiduMapService.isPointInCurrentCity(centerX, centerY) &&
                                    stat.gridPoints.length > threshold) {
                                    var marker = baiduMapService.generateIconMarker(centerX,
                                        centerY,
                                        "/Content/Images/BtsIcons/m_8_end.png");
                                    overlays.push(marker);
                                    baiduMapService.addOneMarkerToScope(marker,
                                        function(data) {
                                            alarmsService.queryClusterGridKpis(stat.gridPoints).then(function(list) {
                                                parametersDialogService.showClusterPointInfo(data, list);
                                            });
                                        },
                                        stat);
                                }

                            });
                    });
                },
                displayClusterPoint: function(stat, currentClusterList) {
                    baiduQueryService.transformToBaidu(stat.bestLongtitute, stat.bestLattitute).then(function(coors) {
                        var marker = baiduMapService
                            .generateIconMarker(coors.x + 0.000245,
                                coors.y + 0.000225,
                                "/Content/Images/BtsIcons/m_2_end.png");
                        baiduMapService.addOneMarkerToScope(marker,
                            function(data) {
                                parametersDialogService.showClusterPointInfo(data, currentClusterList);
                            },
                            stat);
                    });
                },
                clearOverlaySites: function(sites) {
                    angular.forEach(sites,
                        function(site) {
                            baiduMapService.removeOverlay(site);
                        });
                    sites = [];
                }
            }
        });
