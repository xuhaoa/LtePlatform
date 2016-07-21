angular.module('college', ['myApp.url'])
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
            }
        };
    })
    .factory('collegeDtService', function(collegeService) {
        return {
            updateFileInfo: function(info, begin, end) {
                var range = {
                    west: info.centerX - 0.03,
                    east: info.centerX + 0.03,
                    south: info.centerY - 0.03,
                    north: info.centerY + 0.03
                };
                collegeService.queryRaster('2G', range, begin, end).then(function(files) {
                    info.file2Gs = files.length;
                });
                collegeService.queryRaster('3G', range, begin, end).then(function(files) {
                    info.file3Gs = files.length;
                });
                collegeService.queryRaster('4G', range, begin, end).then(function(files) {
                    info.file4Gs = files.length;
                });
            }
        };
    })
    .value('collegeInfrastructurePath', '/appViews/College/Infrastructure/')
    .factory('collegeDialogService', function (collegeInfrastructurePath, $uibModal, $log) {
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
                    size: 'sm',
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
                    size: 'sm',
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
                    size: 'sm',
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
                    size: 'sm',
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
                    size: 'sm',
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
                    size: 'sm',
                    resolve: resolveScope(name, "CDMA室分信息")
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        };
    });