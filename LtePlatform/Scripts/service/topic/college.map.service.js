angular.module('college.map', ['myApp.region', 'college'])
    .factory('collegeMapService', function (baiduMapService, collegeService, collegeQueryService) {
        return {
            showCollegeInfos: function(showCollegeDialogs, year) {
                collegeService.queryStats(year).then(function(colleges) {
                    angular.forEach(colleges, function (college) {
                        var center;
                        collegeService.queryRegion(college.id).then(function(region) {
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
            drawCollegeArea: function(collegeId) {
                collegeService.queryRegion(collegeId).then(function (region) {
                    switch (region.regionType) {
                        case 2:
                            baiduMapService.drawPolygon(region.info.split(';'));
                            break;
                        case 1:
                            baiduMapService.drawRectangle(region.info.split(';'));
                            break;
                        default:
                            baiduMapService.drawCircle(region.info.split(';'));
                            break;
                    }
                });
            },
            showDtInfos: function(infos, begin, end) {
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
                            var range = {
                                west: center.X - 0.03,
                                east: center.X + 0.03,
                                south: center.Y - 0.03,
                                north: center.Y + 0.03
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
                        });
                    });
                });
            }
        };
    });