angular.module('kpi.college', ['myApp.url', 'myApp.region', "ui.bootstrap", 'topic.basic'])
	.controller('eNodeb.dialog', function ($scope, $uibModalInstance, collegeService, collegeDialogService, geometryService, collegeQueryService,
		baiduQueryService,
		name, dialogTitle) {
		$scope.dialogTitle = dialogTitle;
		$scope.query = function() {
			collegeService.queryENodebs(name).then(function(result) {
				$scope.eNodebList = result;
			});
		};
		collegeQueryService.queryByName(name).then(function (college) {
			collegeService.queryRegion(college.id).then(function(region) {
				var center = geometryService.queryRegionCenter(region);
				baiduQueryService.transformToBaidu(center.X, center.Y).then(function (coors) {
					$scope.center = {
						X: 2 * center.X - coors.x,
						Y: 2 * center.Y - coors.y
					};
				});
			});
		});
		
		$scope.addENodebs = function () {
			collegeDialogService.addENodeb(name, $scope.center, function (count) {
				$scope.page.messages.push({
					type: 'success',
					contents: '增加ENodeb' + count + '个'
				});
				$scope.query();
			});
		};

		$scope.query();
		

		$scope.ok = function() {
			$uibModalInstance.close($scope.eNodebList);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('bts.dialog', function($scope, $uibModalInstance, collegeService, name, dialogTitle) {
		$scope.dialogTitle = dialogTitle;
		collegeService.queryBtss(name).then(function(result) {
			$scope.btsList = result;
		});

		$scope.ok = function() {
			$uibModalInstance.close($scope.btsList);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('cell.dialog', function($scope, $uibModalInstance, collegeService, collegeDialogService,
		name, dialogTitle) {
		$scope.dialogTitle = dialogTitle;
		$scope.updateLteCells = function() {
			collegeService.queryCells(name).then(function(cells) {
				$scope.cellList = cells;
			});
		};
		$scope.supplementCells = function() {
			collegeDialogService.supplementENodebCells($scope.eNodebList, $scope.cellList, name, $scope.updateLteCells);
		};
		$scope.supplementLonelyCells = function() {
			collegeDialogService.supplementPositionCells(name, $scope.updateLteCells);
		};

		$scope.updateLteCells();
		collegeService.queryENodebs(name).then(function(eNodebs) {
			$scope.eNodebList = eNodebs;
		});

		$scope.ok = function() {
			$uibModalInstance.close($scope.cellList);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('cdmaCell.dialog', function($scope, $uibModalInstance, collegeService, name, dialogTitle) {
		$scope.dialogTitle = dialogTitle;
		collegeService.queryCdmaCells(name).then(function(result) {
			$scope.cdmaCellList = result;
		});

		$scope.ok = function() {
			$uibModalInstance.close($scope.cdmaCellList);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('lte.distribution.dialog', function($scope, $uibModalInstance, collegeService, name, dialogTitle) {
		$scope.dialogTitle = dialogTitle;
		collegeService.queryLteDistributions(name).then(function(result) {
			$scope.distributionList = result;
		});

		$scope.ok = function() {
			$uibModalInstance.close($scope.distributionList);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('cdma.distribution.dialog', function($scope, $uibModalInstance, collegeService, name, dialogTitle) {
		$scope.dialogTitle = dialogTitle;
		collegeService.queryCdmaDistributions(name).then(function(result) {
			$scope.distributionList = result;
		});

		$scope.ok = function() {
			$uibModalInstance.close($scope.distributionList);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('year.info.dialog', function($scope, $uibModalInstance, appFormatService,
		name, year, item) {
		$scope.dialogTitle = name + year + "年校园信息补充";
		$scope.dto = item;
		$scope.beginDate = {
			value: appFormatService.getDate(item.oldOpenDate),
			opened: false
		};
		$scope.endDate = {
			value: appFormatService.getDate(item.newOpenDate),
			opened: false
		};
		$scope.beginDate.value.setDate($scope.beginDate.value.getDate() + 365);
		$scope.endDate.value.setDate($scope.endDate.value.getDate() + 365);

		$scope.ok = function() {
			$scope.dto.oldOpenDate = $scope.beginDate.value;
			$scope.dto.newOpenDate = $scope.endDate.value;
			$scope.dto.year = year;
			$uibModalInstance.close($scope.dto);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('cell.supplement.dialog', function($scope, $uibModalInstance, networkElementService, neighborImportService,
		eNodebs, cells, collegeName) {
		$scope.dialogTitle = collegeName + "LTE小区补充";
		$scope.supplementCells = [];
		$scope.gridApi = {};

		angular.forEach(eNodebs, function(eNodeb) {
			networkElementService.queryCellInfosInOneENodeb(eNodeb.eNodebId).then(function(cellInfos) {
				neighborImportService.updateCellRruInfo($scope.supplementCells, {
					dstCells: cellInfos,
					cells: cells,
					longtitute: eNodeb.longtitute,
					lattitute: eNodeb.lattitute
				});
			});
		});

		$scope.ok = function() {
			$uibModalInstance.close($scope.gridApi.selection.getSelectedRows());
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('cell.position.supplement.dialog', function($scope, $uibModalInstance, collegeMapService, baiduQueryService, collegeService,
		networkElementService, neighborImportService, collegeName) {
		$scope.dialogTitle = collegeName + "LTE小区补充";
		$scope.supplementCells = [];
		$scope.gridApi = {};

		collegeMapService.queryCenterAndCallback(collegeName, function(center) {
			collegeService.queryCells(collegeName).then(function(cells) {
				baiduQueryService.transformToBaidu(center.X, center.Y).then(function(coors) {
					collegeService.queryRange(collegeName).then(function(range) {
						networkElementService.queryRangeCells({
							west: range.west + center.X - coors.x,
							east: range.east + center.X - coors.x,
							south: range.south + center.Y - coors.y,
							north: range.north + center.Y - coors.y
						}).then(function(results) {
							neighborImportService.updateENodebRruInfo($scope.supplementCells, {
								dstCells: results,
								cells: cells,
								longtitute: center.X,
								lattitute: center.Y
							});
						});
					});
				});
			});
		});

		$scope.ok = function() {
			$uibModalInstance.close($scope.gridApi.selection.getSelectedRows());
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('eNodeb.supplement.dialog', function($scope, $uibModalInstance, networkElementService, geometryService,
		baiduQueryService, collegeService, 
		center, collegeName) {
		$scope.dialogTitle = collegeName + "LTE基站补充";
		$scope.supplementENodebs = [];
		$scope.gridApi = {};

		$scope.query = function() {
			baiduQueryService.transformToBaidu(center.X, center.Y).then(function(coors) {
				collegeService.queryRange(collegeName).then(function(range) {
					var ids = [];
					collegeService.queryENodebs(collegeName).then(function(eNodebs) {
						angular.forEach(eNodebs, function(eNodeb) {
							ids.push(eNodeb.eNodebId);
						});
						networkElementService.queryRangeENodebs({
							west: range.west + center.X - coors.x,
							east: range.east + center.X - coors.x,
							south: range.south + center.Y - coors.y,
							north: range.north + center.Y - coors.y,
							excludedIds: ids
						}).then(function(results) {
							angular.forEach(results, function(item) {
								item.distance = geometryService.getDistance(item.lattitute, item.longtitute, coors.y, coors.x);
							});
							$scope.supplementENodebs = results;
						});
					});
				});
			});
		};

		$scope.query();

		$scope.ok = function() {
			$uibModalInstance.close($scope.gridApi.selection.getSelectedRows());
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('bts.supplement.dialog', function($scope, $uibModalInstance, networkElementService, geometryService, baiduQueryService,
		collegeService, center, collegeName) {
		$scope.dialogTitle = collegeName + "CDMA基站补充";
		$scope.supplementCells = [];
		$scope.gridOptions = {
			enableRowSelection: true,
			enableSelectAll: true,
			selectionRowHeaderWidth: 35,
			rowHeight: 35,
			showGridFooter: true
		};
		$scope.gridOptions.multiSelect = true;
		$scope.gridOptions.columnDefs = [
			{ field: 'btsId', name: 'CDMA基站编号' },
			{ field: 'name', name: '基站名称', width: 120 },
			{ field: 'btsId', name: 'BSC编号' },
			{ field: 'longtitute', name: '经度' },
			{ field: 'lattitute', name: '纬度' },
			{ field: 'address', name: '地址', width: 300, enableColumnResizing: false },
			{ field: 'isInUse', name: '是否在用', cellFilter: 'yesNoChinese' },
			{ name: '与中心距离', field: 'distance', cellFilter: 'number: 2' }
		];

		baiduQueryService.transformToBaidu(center.X, center.Y).then(function(coors) {
			collegeService.queryRange(collegeName).then(function(range) {
				var ids = [];
				collegeService.queryBtss(collegeName).then(function(btss) {
					angular.forEach(btss, function(bts) {
						ids.push(bts.btsId);
					});
					networkElementService.queryRangeBtss({
						west: range.west + center.X - coors.x,
						east: range.east + center.X - coors.x,
						south: range.south + center.Y - coors.y,
						north: range.north + center.Y - coors.y,
						excludedIds: ids
					}).then(function(results) {
						angular.forEach(results, function(item) {
							item.distance = geometryService.getDistance(item.lattitute, item.longtitute, coors.y, coors.x);
						});
						$scope.supplementCells = results;
						$scope.gridOptions.data = results;
					});
				});
			});
		});

		$scope.gridOptions.onRegisterApi = function(gridApi) {
			$scope.gridApi = gridApi;
		};

		$scope.ok = function() {
			$uibModalInstance.close($scope.gridApi.selection.getSelectedRows());
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('college.test3G.dialog', function($scope, $uibModalInstance, collegeName,
		collegeDtService, coverageService, collegeMapService, baiduQueryService) {
		$scope.dialogTitle = collegeName + "-3G测试结果上报";
		$scope.item = collegeDtService.default3GTestView(collegeName, '饭堂', '许良镇');

		var queryRasterInfo = function(files, index, data, callback) {
			coverageService.queryDetailsByRasterInfo(files[index], '3G').then(function(result) {
				data.push.apply(data, result);
				if (index < files.length - 1) {
					queryRasterInfo(files, index + 1, data, callback);
				} else {
					callback(data);
				}
			});
		};
		collegeMapService.queryCenterAndCallback(collegeName, function(center) {
			baiduQueryService.transformToBaidu(center.X, center.Y).then(function(coors) {
				$scope.center = {
					centerX: 2 * center.X - coors.x,
					centerY: 2 * center.Y - coors.y
				};
			});
		});

		$scope.matchCoverage = function() {
			collegeDtService.queryRaster($scope.center, '3G', $scope.beginDate.value, $scope.endDate.value, function(files) {
				if (files.length) {
					var data = [];
					queryRasterInfo(files, 0, data, function(result) {
						console.log(result);
					});
				}
			});
		};
		$scope.ok = function() {
			$uibModalInstance.close($scope.item);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('college.test4G.dialog', function($scope, $uibModalInstance, collegeName,
		collegeDtService, collegeService, networkElementService, collegeMapService, baiduQueryService, coverageService, appFormatService) {
		$scope.dialogTitle = collegeName + "-4G测试结果上报";
		$scope.item = collegeDtService.default4GTestView(collegeName, '饭堂', '许良镇');
		collegeService.queryCells(collegeName).then(function(cellList) {
			var names = [];
			angular.forEach(cellList, function(cell) {
				names.push(cell.cellName);
			});
			$scope.cellName = {
				options: names,
				selected: names[0]
			};
		});
		collegeMapService.queryCenterAndCallback(collegeName, function(center) {
			baiduQueryService.transformToBaidu(center.X, center.Y).then(function(coors) {
				$scope.center = {
					centerX: 2 * center.X - coors.x,
					centerY: 2 * center.Y - coors.y
				};
			});
		});
		$scope.$watch('cellName.selected', function(cellName) {
			if (cellName) {
				networkElementService.queryLteRruFromCellName(cellName).then(function(rru) {
					$scope.rru = rru;
				});
			}
		});

		var queryRasterInfo = function(files, index, data, callback) {
			coverageService.queryDetailsByRasterInfo(files[index], '4G').then(function(result) {
				data.push.apply(data, result);
				if (index < files.length - 1) {
					queryRasterInfo(files, index + 1, data, callback);
				} else {
					callback(data);
				}
			});
		};

		$scope.matchCoverage = function() {
			collegeDtService.queryRaster($scope.center, '4G', $scope.beginDate.value, $scope.endDate.value, function(files) {
				if (files.length) {
					var data = [];
					queryRasterInfo(files, 0, data, function(result) {
						var testEvaluations = appFormatService.calculateAverages(result, [
							function(point) {
								return point.rsrp;
							}, function(point) {
								return point.sinr;
							}, function(point) {
								return point.pdcpThroughputDl > 10 ? point.pdcpThroughputDl : 0;
							}, function(point) {
								return point.pdcpThroughputUl > 1 ? point.pdcpThroughputUl : 0;
							}
						]);
						$scope.item.rsrp = testEvaluations[0].sum / testEvaluations[0].count;
						$scope.item.sinr = testEvaluations[1].sum / testEvaluations[1].count;
						$scope.item.downloadRate = testEvaluations[2].sum / testEvaluations[2].count * 1024;
						$scope.item.uploadRate = testEvaluations[3].sum / testEvaluations[3].count * 1024;
					});
				}
			});
		};

		$scope.ok = function() {
			$scope.item.cellName = $scope.cellName.selected;
			$uibModalInstance.close($scope.item);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('test.process.dialog', function($scope, $uibModalInstance, collegeName, collegeQueryService, appFormatService) {
		$scope.dialogTitle = collegeName + "校园网测试信息确认";

		$scope.query = function() {
			collegeQueryService.queryCollege3GTestList($scope.beginDate.value, $scope.endDate.value, collegeName).then(function(test3G) {
				$scope.items3G = test3G;
			});
			collegeQueryService.queryCollege4GTestList($scope.beginDate.value, $scope.endDate.value, collegeName).then(function(test4G) {
				$scope.items4G = test4G;
				var testEvaluations = appFormatService.calculateAverages(test4G, [
					function(point) {
						return point.rsrp;
					}, function(point) {
						return point.sinr;
					}, function(point) {
						return point.downloadRate;
					}, function(point) {
						return point.uploadRate;
					}
				]);
				$scope.averageRsrp = testEvaluations[0].sum / testEvaluations[0].count;
				$scope.averageSinr = testEvaluations[1].sum / testEvaluations[1].count;
				$scope.averageDownloadRate = testEvaluations[2].sum / testEvaluations[2].count;
				$scope.averageUploadRate = testEvaluations[3].sum / testEvaluations[3].count;
			});
		};
		$scope.query();

		$scope.ok = function() {
			$uibModalInstance.close($("#reports").html());
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('trace.planning.dialog', function($scope, $uibModalInstance, collegeName,
		baiduQueryService, collegeService, networkElementService, collegeMapService) {
		$scope.dialogTitle = collegeName + "校园网规划站点跟踪";

		collegeMapService.queryCenterAndCallback(collegeName, function(center) {
			baiduQueryService.transformToBaidu(center.X, center.Y).then(function(coors) {
				collegeService.queryRange(collegeName).then(function(range) {
					networkElementService.queryRangePlanningSites({
						west: range.west + center.X - coors.x,
						east: range.east + center.X - coors.x,
						south: range.south + center.Y - coors.y,
						north: range.north + center.Y - coors.y
					}).then(function(results) {
						$scope.items = results;
					});
				});
			});
		});

		$scope.ok = function() {
			$uibModalInstance.close($("#reports").html());
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.college.dialog', function($scope, $uibModalInstance, college, year, dialogTitle,
		collegeQueryService, generalChartService, parametersChartService, emergencyService) {
		$scope.college = college;
		$scope.dialogTitle = dialogTitle;
		$scope.query = function() {
			collegeQueryService.queryCollegeDateFlows(college.name, $scope.beginDate.value, $scope.endDate.value).then(function(stats) {
				var result = generalChartService.generateColumnData(stats, function(stat) {
					return stat.statTime;
				}, [
					function(stat) {
						return stat.pdcpDownlinkFlow;
					}, function(stat) {
						return stat.pdcpUplinkFlow;
					}, function(stat) {
						return stat.averageUsers;
					}, function(stat) {
						return stat.maxActiveUsers;
					}
				]);
				$("#flowConfig").highcharts(parametersChartService.getDateFlowOptions(result, 0, 1));
				$("#usersConfig").highcharts(parametersChartService.getDateUsersOptions(result, 2, 3));
			});
		};
		$scope.query();
		collegeQueryService.queryByNameAndYear(college.name, year).then(function(info) {
			if (info) {
				$scope.college.expectedSubscribers = info.expectedSubscribers;
				$scope.college.oldOpenDate = info.oldOpenDate;
				$scope.college.newOpenDate = info.newOpenDate;
			}
		});
		emergencyService.queryCollegeVipDemand(year, college.name).then(function(item) {
			if (item) {
				$scope.college.serialNumber = item.serialNumber;
				$scope.college.currentStateDescription = item.currentStateDescription;
			}
		});

		$scope.ok = function() {
			$uibModalInstance.close($scope.college);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller("college.query.name", function($scope, $uibModalInstance, dialogTitle, name, collegeService) {
		$scope.collegeName = name;
		$scope.dialogTitle = dialogTitle;
		$scope.updateLteCells = function() {
			collegeService.queryCells($scope.collegeName).then(function(cells) {
				$scope.cellList = cells;
			});
		};
		collegeService.queryENodebs($scope.collegeName).then(function(eNodebs) {
			$scope.eNodebList = eNodebs;
		});
		$scope.updateLteCells();
		collegeService.queryBtss($scope.collegeName).then(function(btss) {
			$scope.btsList = btss;
		});
		collegeService.queryCdmaCells($scope.collegeName).then(function(cells) {
			$scope.cdmaCellList = cells;
		});

		$scope.ok = function() {
			$uibModalInstance.close($scope.college);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('college.new.dialog', function($scope, $uibModalInstance, baiduMapService, geometryService, baiduQueryService, appRegionService, $timeout) {
		$scope.dialogTitle = "新建校园信息";
		$scope.collegeRegion = {
			area: 0,
			regionType: 0,
			info: ""
		};
		$scope.saveCircleParameters = function(circle) {
			var center = circle.getCenter();
			var radius = circle.getRadius();
			$scope.collegeRegion.regionType = 0;
			$scope.collegeRegion.area = BMapLib.GeoUtils.getCircleArea(circle);
			$scope.collegeRegion.info = center.lng + ';' + center.lat + ';' + radius;
		};
		$scope.saveRetangleParameters = function(rect) {
			$scope.collegeRegion.regionType = 1;
			var pts = rect.getPath();
			$scope.collegeRegion.info = geometryService.getPathInfo(pts);
			$scope.collegeRegion.area = BMapLib.GeoUtils.getPolygonArea(pts);
		};
		$scope.savePolygonParameters = function(polygon) {
			$scope.collegeRegion.regionType = 2;
			var pts = polygon.getPath();
			$scope.collegeRegion.info = geometryService.getPathInfo(pts);
			$scope.collegeRegion.area = BMapLib.GeoUtils.getPolygonArea(pts);
		};
		$timeout(function() {
			baiduMapService.initializeMap('map', 12);
			baiduMapService.initializeDrawingManager();
			baiduMapService.addDrawingEventListener('circlecomplete', $scope.saveCircleParameters);
			baiduMapService.addDrawingEventListener('rectanglecomplete', $scope.saveRetangleParameters);
			baiduMapService.addDrawingEventListener('polygoncomplete', $scope.savePolygonParameters);
		}, 500);
		$scope.matchPlace = function() {
			baiduQueryService.queryBaiduPlace($scope.collegeName).then(function(result) {
				angular.forEach(result, function(place) {
					var marker = baiduMapService.generateMarker(place.location.lng, place.location.lat);
					baiduMapService.addOneMarker(marker);
					baiduMapService.drawLabel(place.name, place.location.lng, place.location.lat);
				});
			});
		};
		$scope.ok = function() {
			$scope.college = {
				name: $scope.collegeName,
				townId: 0,
				collegeRegion: $scope.collegeRegion
			};
			appRegionService.queryTown($scope.city.selected, $scope.district.selected, $scope.town.selected).then(function(town) {
				if (town) {
					$scope.college.townId = town.id;
					$uibModalInstance.close($scope.college);
				}
			});
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller("college.flow", function ($scope, $uibModalInstance, dialogTitle, year, collegeQueryService, parametersChartService) {
		$scope.dialogTitle = dialogTitle;
		$scope.collegeStatCount = 0;
		$scope.query = function () {
			angular.forEach($scope.collegeList, function (college) {
				collegeQueryService.queryCollegeFlow(college.name, $scope.beginDate.value, $scope.endDate.value).then(function (stat) {
					college.pdcpDownlinkFlow = stat.pdcpDownlinkFlow;
					college.pdcpUplinkFlow = stat.pdcpUplinkFlow;
					college.averageUsers = stat.averageUsers;
					college.cellCount = stat.cellCount;
					college.maxActiveUsers = stat.maxActiveUsers;
					$scope.collegeStatCount += 1;
					});
					});
					};
			$scope.$watch('collegeStatCount', function (count) {
			if ($scope.collegeList && count === $scope.collegeList.length && count > 0) {
				$("#downloadFlowConfig").highcharts(parametersChartService.getCollegeDistributionForDownlinkFlow($scope.collegeList));
				$("#uploadFlowConfig").highcharts(parametersChartService.getCollegeDistributionForUplinkFlow($scope.collegeList));
				$("#averageUsersConfig").highcharts(parametersChartService.getCollegeDistributionForAverageUsers($scope.collegeList));
				$("#activeUsersConfig").highcharts(parametersChartService.getCollegeDistributionForActiveUsers($scope.collegeList));
				$scope.collegeStatCount = 0;
				}
				});
		collegeQueryService.queryYearList(year).then(function (colleges) {
			$scope.collegeList = colleges;
			$scope.query();
				});

		$scope.ok = function () {
			$uibModalInstance.close($scope.cell);
			};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
			};

	})
	.controller("maintain.college.dialog", function ($scope, $uibModalInstance, dialogTitle, year,
		collegeService, collegeQueryService, collegeDialogService, appFormatService) {
		$scope.dialogTitle = dialogTitle;
		$scope.collegeYearList = [];
		$scope.collegeInfo = {
			names: []
		};
		collegeService.queryNames().then(function (result) {
			$scope.collegeInfo.names = result;
			$scope.collegeName = $scope.collegeInfo.names[0];
		});

		$scope.updateInfos = function () {
			collegeService.queryStats(year).then(function (colleges) {
				$scope.collegeList = colleges;
			});
			collegeQueryService.queryYearList(year).then(function (colleges) {
				$scope.collegeYearList = colleges;
			});
			$scope.updateCollegeStatus($scope.collegeName);
		};
		$scope.updateCollegeStatus = function (name) {
			collegeQueryService.queryByNameAndYear(name, year).then(function (info) {
				$scope.collegeExisted = !!info;
			});
		};
		$scope.$watch('collegeName', function (name) {
			$scope.updateCollegeStatus(name);
		});
		$scope.addOneCollegeMarkerInfo = function () {
			collegeQueryService.queryByNameAndYear($scope.collegeName, year - 1).then(function (item) {
				if (!item) {
					var begin = new Date();
					begin.setDate(begin.getDate() - 365 - 7);
					var end = new Date();
					end.setDate(end.getDate() - 365);
					collegeQueryService.queryByName($scope.collegeName).then(function (college) {
						item = {
							oldOpenDate: appFormatService.getDateString(begin, 'yyyy-MM-dd'),
							newOpenDate: appFormatService.getDateString(end, 'yyyy-MM-dd'),
							collegeId: college.id
						};
						collegeDialogService.addYearInfo(item, $scope.collegeName, year, function () {
							$scope.updateInfos();
						});
					});
				} else {
					collegeDialogService.addYearInfo(item, $scope.collegeName, year, function () {
						$scope.updateInfos();
					});
				}
			});
		};
		$scope.createNewCollege = function () {
			collegeDialogService.addNewCollege(function () {
				$scope.updateInfos();
			});
		};

		$scope.updateInfos();

		$scope.ok = function () {
			$uibModalInstance.close($scope.cell);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

	})

	.value('collegeInfrastructurePath', '/appViews/College/Infrastructure/')
	.value('collegeTestPath', '/appViews/College/Test/')
	.factory('collegeDialogService', function(collegeInfrastructurePath, collegeTestPath,
		collegeQueryService, menuItemService) {
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
				menuItemService.showGeneralDialog({
					templateUrl: collegeInfrastructurePath + 'ENodebDialog.html',
					controller: 'eNodeb.dialog',
					resolve: resolveScope(name, "LTE基站信息")
				});
			},
			showCells: function(name) {
				menuItemService.showGeneralDialog({
					templateUrl: collegeInfrastructurePath + 'LteCellDialog.html',
					controller: 'cell.dialog',
					resolve: resolveScope(name, "LTE小区信息")
				});
			},
			showBtss: function(name) {
				menuItemService.showGeneralDialog({
					templateUrl: collegeInfrastructurePath + 'BtsDialog.html',
					controller: 'bts.dialog',
					resolve: resolveScope(name, "CDMA基站信息")
				});
			},
			showCdmaCells: function(name) {
				menuItemService.showGeneralDialog({
					templateUrl: collegeInfrastructurePath + 'CdmaCellDialog.html',
					controller: 'cdmaCell.dialog',
					resolve: resolveScope(name, "CDMA小区信息")
				});
			},
			showLteDistributions: function(name) {
				menuItemService.showGeneralDialog({
					templateUrl: collegeInfrastructurePath + 'DistributionDialog.html',
					controller: 'lte.distribution.dialog',
					resolve: resolveScope(name, "LTE室分信息")
				});
			},
			showCdmaDistributions: function(name) {
				menuItemService.showGeneralDialog({
					templateUrl: collegeInfrastructurePath + 'DistributionDialog.html',
					controller: 'cdma.distribution.dialog',
					resolve: resolveScope(name, "CDMA室分信息")
				});
			},
			showCollegeDetails: function(name) {
				menuItemService.showGeneralDialog({
					templateUrl: collegeInfrastructurePath + 'CollegeQuery.html',
					controller: 'college.query.name',
					resolve: resolveScope(name, "详细信息")
				});
			},

			addYearInfo: function(item, name, year, callback) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: collegeInfrastructurePath + 'YearInfoDialog.html',
					controller: 'year.info.dialog',
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
				}, function(info) {
					collegeQueryService.saveYearInfo(info).then(function() {
						callback();
					});
				});
			},
			addNewCollege: function(callback) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: collegeInfrastructurePath + 'NewCollegeDialog.html',
					controller: 'college.new.dialog',
					resolve: {}
				}, function(info) {
					collegeQueryService.constructCollegeInfo(info).then(function() {
						callback();
					});
				});
			},
			supplementENodebCells: function(eNodebs, cells, collegeName, callback) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: collegeInfrastructurePath + 'CellSupplementDialog.html',
					controller: 'cell.supplement.dialog',
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
				}, function(info) {
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

				});
			},
			supplementPositionCells: function(collegeName, callback) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: collegeInfrastructurePath + 'CellSupplementDialog.html',
					controller: 'cell.position.supplement.dialog',
					resolve: {
						collegeName: function() {
							return collegeName;
						}
					}
				}, function(info) {
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

				});
			},
			construct3GTest: function(collegeName) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: collegeTestPath + 'Construct3GTest.html',
					controller: 'college.test3G.dialog',
					resolve: {
						collegeName: function() {
							return collegeName;
						}
					}
				}, function(info) {
					collegeQueryService.saveCollege3GTest(info).then(function() {
						console.log(info);
					});
				});
			},
			construct4GTest: function(collegeName) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: collegeTestPath + 'Construct4GTest.html',
					controller: 'college.test4G.dialog',
					resolve: {
						collegeName: function() {
							return collegeName;
						}
					}
				}, function(info) {
					collegeQueryService.saveCollege4GTest(info).then(function() {
						console.log(info);
					});
				});
			},
			processTest: function(collegeName, callback) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: collegeTestPath + 'Process.html',
					controller: 'test.process.dialog',
					resolve: {
						collegeName: function() {
							return collegeName;
						}
					}
				}, function(info) {
					callback(info);
				});
			},
			tracePlanning: function(collegeName, callback) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: collegeTestPath + 'Planning.html',
					controller: 'trace.planning.dialog',
					resolve: {
						collegeName: function() {
							return collegeName;
						}
					}
				}, function(info) {
					callback(info);
				});
			},
			showCollegDialog: function(college, year) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/College/Table/CollegeMapInfoBox.html',
					controller: 'map.college.dialog',
					resolve: {
						dialogTitle: function() {
							return college.name + "-" + "基本信息";
						},
						college: function() {
							return college;
						},
						year: function() {
							return year;
						}
					}
				});
			},
			addENodeb: function(collegeName, center, callback) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: '/appViews/College/Infrastructure/ENodebSupplementDialog.html',
					controller: 'eNodeb.supplement.dialog',
					resolve: {
						collegeName: function() {
							return collegeName;
						},
						center: function() {
							return center;
						}
					}
				}, function(info) {
					var ids = [];
					angular.forEach(info, function(eNodeb) {
						ids.push(eNodeb.eNodebId);
					});
					collegeQueryService.saveCollegeENodebs({
						collegeName: collegeName,
						eNodebIds: ids
					}).then(function(count) {
						callback(count);
					});
				});
			},
			addBts: function(collegeName, center, callback) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: '/appViews/College/Infrastructure/CellSupplementDialog.html',
					controller: 'bts.supplement.dialog',
					resolve: {
						collegeName: function() {
							return collegeName;
						},
						center: function() {
							return center;
						}
					}
				}, function(info) {
					var ids = [];
					angular.forEach(info, function(bts) {
						ids.push(bts.btsId);
					});
					collegeQueryService.saveCollegeBtss({
						collegeName: collegeName,
						btsIds: ids
					}).then(function(count) {
						callback(count);
					});
				});
			},
			showCollegeFlow: function(year) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/College/Test/Flow.html',
					controller: 'college.flow',
					resolve: {
						dialogTitle: function() {
							return "校园流量分析（" + year + "年）";
						},
						year: function() {
							return year;
						}
					}
				});
			},
			maintainCollegeInfo: function (year) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/College/Stat.html',
					controller: 'maintain.college.dialog',
					resolve: {
						dialogTitle: function () {
							return "校园基础信息维护（" + year + "年）";
						},
						year: function () {
							return year;
						}
					}
				});
			}
		};
	});