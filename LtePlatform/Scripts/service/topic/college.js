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
            queryAll: function() {
                return generalHttpService.getApiData('CollegeQuery', {});
            }
        };
    })
    .factory('collegeDtService', function (collegeService) {
        return {
            updateFileInfo: function(info, begin, end) {
                var range = {
                    west: info.centerX - 0.03,
                    east: info.centerX + 0.03,
                    south: info.centerY - 0.03,
                    north: info.centerY + 0.03
                };
                collegeService.queryRaster('2G', range, begin, end).then(function (files) {
                    info.file2Gs = files.length;
                });
                collegeService.queryRaster('3G', range, begin, end).then(function (files) {
                    info.file3Gs = files.length;
                });
                collegeService.queryRaster('4G', range, begin, end).then(function (files) {
                    info.file4Gs = files.length;
                });
            }
        };
    });