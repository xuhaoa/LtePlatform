angular.module('college.service', ['myApp.url'])
    .factory('collegeService', function(generalHttpService) {
        return {
            queryNames: function() {
                return generalHttpService.getApiData('CollegeNames', {});
            },
            queryStats: function(year) {
                return generalHttpService.getApiData('CollegeStat', {
                    year: year
                });
            },
            queryRegion: function(id) {
                return generalHttpService.getApiData('CollegeRegion/' + id, {});
            },
            queryRange: function(name) {
                return generalHttpService.getApiData('CollegeRegion', {
                    collegeName: name
                });
            },
            queryENodebs: function(name) {
                return generalHttpService.getApiData('CollegeENodeb', {
                    collegeName: name
                });
            },
            queryCells: function(name) {
                return generalHttpService.getApiData('CollegeCells', {
                    collegeName: name
                });
            },
            queryBtss: function(name) {
                return generalHttpService.getApiData('CollegeBtss', {
                    collegeName: name
                });
            },
            queryCdmaCells: function(name) {
                return generalHttpService.getApiData('CollegeCdmaCells', {
                    collegeName: name
                });
            },
            queryLteDistributions: function(name) {
                return generalHttpService.getApiData('CollegeLteDistributions', {
                    collegeName: name
                });
            },
            queryCdmaDistributions: function(name) {
                return generalHttpService.getApiData('CollegeCdmaDistributions', {
                    collegeName: name
                });
            },
            queryRaster: function(dataType, range, begin, end) {
                return generalHttpService.getApiData('RasterFile', {
                    dataType: dataType,
                    west: range.west,
                    east: range.east,
                    south: range.south,
                    north: range.north,
                    begin: begin,
                    end: end
                });
            }
        }
    })
    .factory('collegeQueryService', function(generalHttpService) {
        return {
            queryByName: function(name) {
                return generalHttpService.getApiData('CollegeQuery', {
                    name: name
                });
            },
            queryByNameAndYear: function(name, year) {
                return generalHttpService.getApiData('CollegeQuery', {
                    name: name,
                    year: year
                });
            },
            queryAll: function() {
                return generalHttpService.getApiData('CollegeQuery', {});
            },
            queryYearList: function(year) {
                return generalHttpService.getApiData('CollegeQuery', {
                    year: year
                });
            },
            saveYearInfo: function(info) {
                return generalHttpService.postApiData('CollegeQuery', info);
            },
            constructCollegeInfo: function(info) {
                return generalHttpService.postApiDataWithHeading('CollegeStat', info);
            },
            saveCollegeCells: function(container) {
                return generalHttpService.postApiData('CollegeCellContainer', container);
            },
            saveCollegeENodebs: function (container) {
                return generalHttpService.postApiData('CollegeENodeb', container);
            },
            saveCollegeBtss: function (container) {
                return generalHttpService.postApiData('CollegeBtss', container);
            },
            saveCollege3GTest: function(view) {
                return generalHttpService.postApiData('College3GTest', view);
            },
            saveCollege4GTest: function (view) {
                return generalHttpService.postApiData('College4GTest', view);
            },
            queryCollege3GTestList: function(begin, end, name) {
                return generalHttpService.getApiData('College3GTest', {
                    begin: begin,
                    end: end,
                    name: name
                });
            },
            queryCollege4GTestList: function (begin, end, name) {
                return generalHttpService.getApiData('College4GTest', {
                    begin: begin,
                    end: end,
                    name: name
                });
            }
        };
    })
    .factory('collegeDtService', function (collegeService) {
        var queryRange = function(info) {
            return {
                west: info.centerX - 0.02,
                east: info.centerX + 0.02,
                south: info.centerY - 0.02,
                north: info.centerY + 0.03
            }
        };
        return {
            updateFileInfo: function(info, begin, end) {
                var range = queryRange(info);
                collegeService.queryRaster('2G', range, begin, end).then(function(files) {
                    info.file2Gs = files;
                });
                collegeService.queryRaster('3G', range, begin, end).then(function(files) {
                    info.file3Gs = files;
                });
                collegeService.queryRaster('4G', range, begin, end).then(function(files) {
                    info.file4Gs = files;
                });
            },
            queryRaster: function(center, type, begin, end, callback) {
                var range = queryRange(center);
                collegeService.queryRaster(type, range, begin, end).then(function(files) {
                    callback(files);
                });
            },
            default3GTestView: function(collegeName, place, tester) {
                return {
                    testTime: new Date(),
                    collegeName: collegeName,
                    place: place,
                    tester: tester,
                    downloadRate: 1024,
                    accessUsers: 23,
                    minRssi: -109,
                    maxRssi: -99,
                    vswr: 1.11
                };
            },
            default4GTestView: function (collegeName, place, tester) {
                return {
                    testTime: new Date(),
                    collegeName: collegeName,
                    place: place,
                    tester: tester,
                    downloadRate: 38024,
                    uploadRate: 21024,
                    accessUsers: 33,
                    rsrp: -109,
                    sinr: 12,
                    cellName: "",
                    pci: 0
                };
            }
        };
    })
    .value('collegeInfrastructurePath', '/appViews/College/Infrastructure/')
    .value('collegeTestPath', '/appViews/College/Test/')
    .factory('collegeDialogService', function (collegeInfrastructurePath, collegeTestPath,
        collegeQueryService, $uibModal, $log) {
        var resolveScope = function(name, topic) {
            return {
                dialogTitle: function() {
                    return name + "-" + topic;
                },
                name: function() {
                    return name;
                }
            };
        };
        return {
            showENodebs: function(name) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'ENodebDialog.html',
                    controller: 'eNodeb.dialog',
                    size: 'lg',
                    resolve: resolveScope(name, "LTE基站信息")
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showCells: function(name) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'LteCellDialog.html',
                    controller: 'cell.dialog',
                    size: 'lg',
                    resolve: resolveScope(name, "LTE小区信息")
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showBtss: function(name) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'BtsDialog.html',
                    controller: 'bts.dialog',
                    size: 'lg',
                    resolve: resolveScope(name, "CDMA基站信息")
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showCdmaCells: function(name) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'CdmaCellDialog.html',
                    controller: 'cdmaCell.dialog',
                    size: 'lg',
                    resolve: resolveScope(name, "CDMA小区信息")
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showLteDistributions: function(name) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'DistributionDialog.html',
                    controller: 'lte.distribution.dialog',
                    size: 'lg',
                    resolve: resolveScope(name, "LTE室分信息")
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showCdmaDistributions: function(name) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'DistributionDialog.html',
                    controller: 'cdma.distribution.dialog',
                    size: 'lg',
                    resolve: resolveScope(name, "CDMA室分信息")
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            addYearInfo: function (item, name, year, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'YearInfoDialog.html',
                    controller: 'year.info.dialog',
                    size: 'lg',
                    resolve: {
                        name: function() {
                            return name;
                        },
                        year: function() {
                            return year;
                        },
                        item: function() {
                            return item;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    collegeQueryService.saveYearInfo(info).then(function() {
                        callback();
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            addNewCollege: function (callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'NewCollegeDialog.html',
                    controller: 'college.new.dialog',
                    size: 'lg',
                    resolve: {
                        
                    }
                });
                modalInstance.result.then(function (info) {
                    collegeQueryService.constructCollegeInfo(info).then(function () {
                        callback();
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            supplementENodebCells: function(eNodebs, cells, collegeName, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'CellSupplementDialog.html',
                    controller: 'cell.supplement.dialog',
                    size: 'lg',
                    resolve: {
                        eNodebs: function() {
                            return eNodebs;
                        },
                        cells: function() {
                            return cells;
                        },
                        collegeName: function() {
                            return collegeName;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    var cellNames = [];
                    angular.forEach(info, function(cell) {
                        cellNames.push(cell.cellName);
                    });
                    collegeQueryService.saveCollegeCells({
                        collegeName: collegeName,
                        cellNames: cellNames
                    }).then(function() {
                        callback();
                    });

                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            construct3GTest: function(collegeName) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeTestPath + 'Construct3GTest.html',
                    controller: 'college.test3G.dialog',
                    size: 'lg',
                    resolve: {
                        collegeName: function () {
                            return collegeName;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    collegeQueryService.saveCollege3GTest(info).then(function() {
                        console.log(info);
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            construct4GTest: function (collegeName) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeTestPath + 'Construct4GTest.html',
                    controller: 'college.test4G.dialog',
                    size: 'lg',
                    resolve: {
                        collegeName: function () {
                            return collegeName;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    collegeQueryService.saveCollege4GTest(info).then(function () {
                        console.log(info);
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            processTest: function (collegeName, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeTestPath + 'Process.html',
                    controller: 'test.process.dialog',
                    size: 'lg',
                    resolve: {
                        collegeName: function () {
                            return collegeName;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    callback(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showCollegDialog: function(college) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/College/Table/CollegeMapInfoBox.html',
                    controller: 'map.college.dialog',
                    size: 'sm',
                    resolve: {
                        dialogTitle: function() {
                            return college.name + "-" + "基本信息";
                        },
                        college: function() {
                            return college;
                        }
                    }
                });
                modalInstance.result.then(function(info) {
                    console.log(info);
                }, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            addENodeb: function (collegeName, center, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/College/Infrastructure/CellSupplementDialog.html',
                    controller: 'eNodeb.supplement.dialog',
                    size: 'lg',
                    resolve: {
                        collegeName: function () {
                            return collegeName;
                        },
                        center: function () {
                            return center;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    var ids = [];
                    angular.forEach(info, function (eNodeb) {
                        ids.push(eNodeb.eNodebId);
                    });
                    collegeQueryService.saveCollegeENodebs({
                        collegeName: collegeName,
                        eNodebIds: ids
                    }).then(function (count) {
                        callback(count);
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            addBts: function (collegeName, center, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/College/Infrastructure/CellSupplementDialog.html',
                    controller: 'bts.supplement.dialog',
                    size: 'lg',
                    resolve: {
                        collegeName: function () {
                            return collegeName;
                        },
                        center: function () {
                            return center;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    var ids = [];
                    angular.forEach(info, function (bts) {
                        ids.push(bts.btsId);
                    });
                    collegeQueryService.saveCollegeBtss({
                        collegeName: collegeName,
                        btsIds: ids
                    }).then(function (count) {
                        callback(count);
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        };
    })
    .factory('collegeMapService', function (baiduMapService, collegeService, collegeQueryService, collegeDtService) {
        return {
            showCollegeInfos: function (showCollegeDialogs, year) {
                collegeService.queryStats(year).then(function (colleges) {
                    angular.forEach(colleges, function (college) {
                        var center;
                        collegeService.queryRegion(college.id).then(function (region) {
                            switch (region.regionType) {
                                case 2:
                                    center = baiduMapService.drawPolygonAndGetCenter(region.info.split(';'));
                                    break;
                                case 1:
                                    center = baiduMapService.drawRectangleAndGetCenter(region.info.split(';'));
                                    break;
                                default:
                                    center = baiduMapService.drawCircleAndGetCenter(region.info.split(';'));
                                    break;
                            }
                            var marker = baiduMapService.generateMarker(center.X, center.Y);
                            baiduMapService.addOneMarkerToScope(marker, showCollegeDialogs, college);
                            baiduMapService.drawLabel(college.name, center.X, center.Y);
                        });
                    });
                });
            },
            drawCollegeArea: function (collegeId, callback) {
                collegeService.queryRegion(collegeId).then(function (region) {
                    var center;
                    switch (region.regionType) {
                        case 2:
                            center = baiduMapService.drawPolygonAndGetCenter(region.info.split(';'));
                            break;
                        case 1:
                            center = baiduMapService.drawRectangleAndGetCenter(region.info.split(';'));
                            break;
                        default:
                            center = baiduMapService.drawCircleAndGetCenter(region.info.split(';'));
                            break;
                    }
                    baiduMapService.setCellFocus(center.X, center.Y);
                    callback(center);
                });
            },
            showDtInfos: function (infos, begin, end) {
                collegeQueryService.queryAll().then(function (colleges) {
                    angular.forEach(colleges, function (college) {
                        var center;
                        collegeService.queryRegion(college.id).then(function (region) {
                            switch (region.regionType) {
                                case 2:
                                    center = baiduMapService.getPolygonCenter(region.info.split(';'));
                                    break;
                                case 1:
                                    center = baiduMapService.getRectangleCenter(region.info.split(';'));
                                    break;
                                default:
                                    center = baiduMapService.getCircleCenter(region.info.split(';'));
                                    break;
                            }
                            var info = {
                                name: college.name,
                                centerX: center.X,
                                centerY: center.Y,
                                area: region.area,
                                file2Gs: 0,
                                file3Gs: 0,
                                file4Gs: 0
                            };
                            infos.push(info);
                            collegeDtService.updateFileInfo(info, begin, end);
                        });
                    });
                });
            },
            queryCenterAndCallback: function(collegeName, callback) {
                collegeQueryService.queryByName(collegeName).then(function(college) {
                    collegeService.queryRegion(college.id).then(function(region) {
                        var center;
                        switch (region.regionType) {
                        case 2:
                            center = baiduMapService.getPolygonCenter(region.info.split(';'));
                            break;
                        case 1:
                            center = baiduMapService.getRectangleCenter(region.info.split(';'));
                            break;
                        default:
                            center = baiduMapService.getCircleCenter(region.info.split(';'));
                            break;
                        }
                        callback(center);
                    });
                });
            }
        };
    });