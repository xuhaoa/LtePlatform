angular.module('topic.college', ['myApp.url', 'myApp.region', 'myApp.kpi', 'topic.basic'])
	.factory('collegeMapService', function(baiduMapService, collegeService, collegeQueryService, collegeDtService,
		baiduQueryService, workItemDialog, geometryService) {
		return {
			showCollegeInfos: function(showCollegeDialogs, year) {
				collegeService.queryStats(year).then(function(colleges) {
					angular.forEach(colleges, function(college) {
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
			drawCollegeArea: function(collegeId, callback) {
				collegeService.queryRegion(collegeId).then(function(region) {
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
			showDtInfos: function(infos, begin, end) {
				collegeQueryService.queryAll().then(function(colleges) {
					angular.forEach(colleges, function(college) {
						
					    collegeService.queryRegion(college.id).then(function (region) {
					        var center = geometryService.queryRegionCenter(region);
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
					    var center = geometryService.queryRegionCenter(region);
						callback(center);
					});
				});
			},
			showRsrpMrGrid: function(result, longtitute, lattitute, areaStats, colorDictionary) {
				baiduQueryService.transformToBaidu(longtitute, lattitute).then(function(coors) {
					var xOffset = coors.x - longtitute;
					var yOffset = coors.y - lattitute;
					baiduMapService.setCellFocus(coors.x, coors.y, 14);
					angular.forEach(result, function(item) {
						var gridColor = colorDictionary[item.rsrpLevelDescription];
						var polygon = baiduMapService.drawPolygonWithColor(item.coordinates, gridColor, -xOffset, -yOffset);
						var area = BMapLib.GeoUtils.getPolygonArea(polygon);

						if (area > 0) {
							areaStats[item.rsrpLevelDescription] += area;
						}
					});
				});
			},
			showMaintainStations: function(stations, color) {
				baiduQueryService.transformToBaidu(stations[0].longtitute, stations[0].lattitute).then(function(coors) {
					var xOffset = coors.x - stations[0].longtitute;
					var yOffset = coors.y - stations[0].lattitute;
					baiduMapService.drawPointCollection(stations, color, -xOffset, -yOffset, function(e) {
						workItemDialog.showStationInfo(e.point.data);
					});
				});
			},
			showConstructionSites: function(stations, status, callback) {
				baiduQueryService.transformToBaidu(stations[0].longtitute, stations[0].lattitute).then(function(coors) {
					var xOffset = coors.x - stations[0].longtitute;
					var yOffset = coors.y - stations[0].lattitute;
					baiduMapService.setCellFocus(coors.x, coors.y, 15);
					angular.forEach(stations, function(item) {
						var marker = new BMap.Marker(new BMap.Point(item.longtitute + xOffset, item.lattitute + yOffset), {
							icon: geometryService.queryConstructionIcon(status)
						});
						baiduMapService.addOneMarkerToScope(marker, callback, item);
					});
				});
			}
		};
	});