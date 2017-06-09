angular.module('kpi.work', ['myApp.url', 'myApp.region', "ui.bootstrap"])
	.controller('workitem.feedback.dialog', function($scope, $uibModalInstance, input, dialogTitle) {
		$scope.item = input;
		$scope.dialogTitle = dialogTitle;
		$scope.message = "";

		$scope.ok = function() {
			$uibModalInstance.close($scope.message);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('workitem.details.dialog', function($scope, $uibModalInstance, input, dialogTitle, preciseWorkItemGenerator) {
		$scope.currentView = input;
		$scope.dialogTitle = dialogTitle;
		$scope.message = "";
		$scope.platformInfos = preciseWorkItemGenerator.calculatePlatformInfo($scope.currentView.comments);
		$scope.feedbackInfos = preciseWorkItemGenerator.calculatePlatformInfo($scope.currentView.feedbackContents);
		$scope.preventChangeParentView = true;

		$scope.ok = function() {
			$uibModalInstance.close($scope.message);
		};
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller("eNodeb.flow", function($scope, $uibModalInstance, eNodeb, beginDate, endDate,
		networkElementService, appKpiService, kpiChartService) {
		$scope.eNodebName = eNodeb.name;
		$scope.flowStats = [];
		$scope.mergeStats = [];
		$scope.queryFlow = function() {
			appKpiService.calculateFlowStats($scope.cellList, $scope.flowStats, $scope.mergeStats, $scope.beginDate, $scope.endDate);
		};

		$scope.showCharts = function() {
			kpiChartService.showFlowCharts($scope.flowStats, $scope.eNodebName, $scope.mergeStats);
		};

		$scope.ok = function() {
			$uibModalInstance.close($scope.cellList);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		networkElementService.queryCellViewsInOneENodeb(eNodeb.eNodebId).then(function(result) {
			$scope.cellList = result;
			$scope.queryFlow();
		});
	})
	.controller("hotSpot.flow", function($scope, $uibModalInstance, hotSpot, beginDate, endDate,
		complainService, appKpiService, kpiChartService) {
		$scope.eNodebName = hotSpot.hotspotName;
		$scope.flowStats = [];
		$scope.mergeStats = [];
		$scope.queryFlow = function() {
			appKpiService.calculateFlowStats($scope.cellList, $scope.flowStats, $scope.mergeStats, $scope.beginDate, $scope.endDate);
		};

		$scope.showCharts = function() {
			kpiChartService.showFlowCharts($scope.flowStats, $scope.eNodebName, $scope.mergeStats);
		};

		$scope.ok = function() {
			$uibModalInstance.close($scope.cellList);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		complainService.queryHotSpotCells(hotSpot.hotspotName).then(function(result) {
			$scope.cellList = result;
			$scope.queryFlow();
		});
	})
	.controller("rutrace.chart", function($scope, $uibModalInstance, $timeout,
		dateString, districtStats, townStats, appKpiService) {
		$scope.dialogTitle = dateString + "精确覆盖率指标";
		$scope.showCharts = function() {
			$("#leftChart").highcharts(appKpiService.getMrPieOptions(districtStats.slice(0, districtStats.length - 1), townStats));
			$("#rightChart").highcharts(appKpiService.getPreciseRateOptions(districtStats, townStats));
		};

		$scope.ok = function() {
			$uibModalInstance.close($scope.cellList);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$timeout(function() {
			$scope.showCharts();
		}, 500);
	})
	.controller('basic.kpi.trend', function($scope, $uibModalInstance, city, beginDate, endDate, kpi2GService, kpiDisplayService) {
		$scope.dialogTitle = "指标变化趋势-" + city;
		$scope.beginDate = beginDate;
		$scope.endDate = endDate;

		kpi2GService.queryKpiOptions().then(function(result) {
			$scope.kpi = {
				options: result,
				selected: result[0]
			};
		});

		$scope.$watch('kpi.options', function(options) {
			if (options && options.length) {
				$scope.showTrend();
			}
		});

		$scope.ok = function() {
			$uibModalInstance.close($scope.kpi);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.showTrend = function() {
			kpi2GService.queryKpiTrend(city, $scope.beginDate.value, $scope.endDate.value).then(function(data) {
				angular.forEach($scope.kpi.options, function(option, $index) {
					$("#kpi-" + $index).highcharts(kpiDisplayService.generateComboChartOptions(data, option));
				});
			});
		};
	})
	.controller("rutrace.trend.dialog", function($scope, $uibModalInstance, trendStat, city, beginDate, endDate,
		appKpiService, kpiPreciseService, appFormatService) {
		$scope.trendStat = trendStat;
		$scope.city = city;
		$scope.beginDate = beginDate;
		$scope.endDate = endDate;
		$scope.dialogTitle = "精确覆盖率变化趋势";
		$scope.showCharts = function() {
			$("#mr-pie").highcharts(appKpiService.getMrPieOptions($scope.trendStat.districtStats,
				$scope.trendStat.townStats));
			$("#precise").highcharts(appKpiService.getPreciseRateOptions($scope.trendStat.districtStats,
				$scope.trendStat.townStats));
			$("#time-mr").highcharts(appKpiService.getMrsDistrictOptions($scope.trendStat.stats,
				$scope.trendStat.districts));
			$("#time-precise").highcharts(appKpiService.getPreciseDistrictOptions($scope.trendStat.stats,
				$scope.trendStat.districts));
		};
		$scope.ok = function() {
			$uibModalInstance.close($scope.trendStat);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		kpiPreciseService.getDateSpanPreciseRegionKpi($scope.city.selected, $scope.beginDate.value, $scope.endDate.value)
			.then(function(result) {
				$scope.trendStat.stats = appKpiService.generateDistrictStats($scope.trendStat.districts, result);
				if (result.length > 0) {
					appKpiService.generateTrendStatsForPie($scope.trendStat, result);
					$scope.trendStat.stats.push(appKpiService.calculateAverageRates($scope.trendStat.stats));
				}
				$scope.trendStat.beginDateString = appFormatService.getDateString($scope.beginDate.value, "yyyy年MM月dd日");
				$scope.trendStat.endDateString = appFormatService.getDateString($scope.endDate.value, "yyyy年MM月dd日");
				$scope.showCharts();
			});

	})
	.controller('kpi.topConnection3G.trend', function($scope, $uibModalInstance, city, beginDate, endDate, topCount,
		appRegionService, appFormatService, connection3GService) {
		$scope.dialogTitle = "TOP连接变化趋势-" + city;
		$scope.beginDate = beginDate;
		$scope.endDate = endDate;
		$scope.topCount = topCount;
		$scope.showTrend = function() {
			connection3GService.queryCellTrend($scope.beginDate.value, $scope.endDate.value, city,
				$scope.orderPolicy.selected, $scope.topCount.selected).then(function(result) {
				$scope.trendCells = result;
			});
		};
		$scope.ok = function() {
			$uibModalInstance.close($scope.trendStat);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		connection3GService.queryOrderPolicy().then(function(result) {
			$scope.orderPolicy = {
				options: result,
				selected: result[0]
			}
			$scope.showTrend();
		});
	})
	.controller('kpi.topDrop2G.trend', function($scope, $uibModalInstance, city, beginDate, endDate, topCount,
		appRegionService, appFormatService, drop2GService) {
		$scope.dialogTitle = "TOP掉话变化趋势-" + city;
		$scope.beginDate = beginDate;
		$scope.endDate = endDate;
		$scope.topCount = topCount;
		$scope.ok = function() {
			$uibModalInstance.close($scope.trendStat);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.showTrend = function() {
			drop2GService.queryCellTrend($scope.beginDate.value, $scope.endDate.value, city,
				$scope.orderPolicy.selected, $scope.topCount.selected).then(function(result) {
				$scope.trendCells = result;
			});
		};
		drop2GService.queryOrderPolicy().then(function(result) {
			$scope.orderPolicy = {
				options: result,
				selected: result[0]
			}
			$scope.showTrend();
		});
	})
	.controller("topic.cells", function($scope, $uibModalInstance, dialogTitle, name, complainService) {
		$scope.dialogTitle = dialogTitle;
		complainService.queryHotSpotCells(name).then(function(existedCells) {
			$scope.cellList = existedCells;
		});

		$scope.ok = function() {
			$uibModalInstance.close($scope.trendStat);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

	})
	.controller('map.station.dialog', function($scope, $uibModalInstance, station, dialogTitle, beginDate, endDate,
		appFormatService, networkElementService) {
		$scope.beginDate = beginDate;
		$scope.endDate = endDate;
		$scope.itemGroups = appFormatService.generateStationGroups(station);
		$scope.cellList = [];
		networkElementService.queryENodebStationInfo(station.StationId).then(function(eNodeb) {
			if (eNodeb) {
				$scope.eNodebGroups = appFormatService.generateENodebGroups(eNodeb);
			}

		});
		networkElementService.queryCellStationInfo(station.StationId).then(function(cellList) {
			$scope.cellList = cellList;
		});
		$scope.dialogTitle = dialogTitle;
		$scope.ok = function() {
			$uibModalInstance.close($scope.site);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.indoor.dialog', function ($scope, $uibModalInstance, station, dialogTitle, beginDate, endDate,
		appFormatService) {
		$scope.beginDate = beginDate;
		$scope.endDate = endDate;
		$scope.itemGroups = appFormatService.generateIndoorGroups(station);

		$scope.dialogTitle = dialogTitle;
		$scope.ok = function () {
			$uibModalInstance.close($scope.site);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.distribution.dialog', function($scope, $uibModalInstance, distribution, dialogTitle, appFormatService,
		networkElementService, alarmsService) {
		$scope.distribution = distribution;
		$scope.dialogTitle = dialogTitle;
		$scope.distributionGroups = appFormatService.generateDistributionGroups(distribution);
		$scope.alarmLevel = {
			options: ["严重告警", "重要以上告警", "所有告警"],
			selected: "重要以上告警"
		};
		$scope.alarms = [];
		$scope.searchAlarms = function() {
			alarmsService.queryENodebAlarmsByDateSpanAndLevel(distribution.eNodebId,
				$scope.beginDate.value, $scope.endDate.value, $scope.alarmLevel.selected).then(function(result) {
				$scope.alarms = result;
			});
		};
		if (distribution.eNodebId > 0) {
			networkElementService.queryCellInfo(distribution.eNodebId, distribution.lteSectorId).then(function(cell) {
				$scope.lteGroups = appFormatService.generateCellGroups(cell);
			});
			$scope.searchAlarms();
		}
		if (distribution.btsId > 0) {
			networkElementService.queryCdmaCellInfo(distribution.btsId, distribution.cdmaSectorId).then(function(cell) {
				$scope.cdmaGroups = appFormatService.generateCdmaCellGroups(cell);
			});
		}

		$scope.ok = function() {
			$uibModalInstance.close($scope.distributionGroups);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.factory('workItemDialog', function(menuItemService, workitemService) {
		return {
			feedback: function(view, callbackFunc) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: '/appViews/WorkItem/FeedbackDialog.html',
					controller: 'workitem.feedback.dialog',
					resolve: {
						dialogTitle: function() {
							return view.serialNumber + "工单反馈";
						},
						input: function() {
							return view;
						}
					}
				}, function(output) {
					workitemService.feedback(output, view.serialNumber).then(function(result) {
						if (result && callbackFunc)
							callbackFunc();
					});
				});
			},
			showDetails: function(view, callbackFunc) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: '/appViews/WorkItem/DetailsDialog.html',
					controller: 'workitem.details.dialog',
					resolve: {
						dialogTitle: function() {
							return view.serialNumber + "工单信息";
						},
						input: function() {
							return view;
						}
					}
				}, callbackFunc);
			},
			showENodebFlow: function(eNodeb, beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Parameters/Region/ENodebFlow.html',
					controller: 'eNodeb.flow',
					resolve: {
						eNodeb: function() {
							return eNodeb;
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
			showHotSpotFlow: function(hotSpot, beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Parameters/Region/ENodebFlow.html',
					controller: 'hotSpot.flow',
					resolve: {
						hotSpot: function() {
							return hotSpot;
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
			showHotSpotCells: function(name) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Parameters/Region/TopicCells.html',
					controller: 'topic.cells',
					resolve: {
						dialogTitle: function() {
							return name + "热点小区信息";
						},
						name: function() {
							return name;
						}
					}
				});
			},
			showPreciseChart: function(overallStat) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Home/DoubleChartDialog.html',
					controller: 'rutrace.chart',
					resolve: {
						dateString: function() {
							return overallStat.dateString;
						},
						districtStats: function() {
							return overallStat.districtStats;
						},
						townStats: function() {
							return overallStat.townStats;
						}
					}
				});
			},
			showPreciseTrend: function(trendStat, city, beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Rutrace/Coverage/Trend.html',
					controller: 'rutrace.trend.dialog',
					resolve: {
						trendStat: function() {
							return trendStat;
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
			showBasicTrend: function(city, beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/BasicKpi/Trend.html',
					controller: 'basic.kpi.trend',
					resolve: {
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
			showTopDropTrend: function(city, beginDate, endDate, topCount) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/BasicKpi/TopDrop2GTrend.html',
					controller: 'kpi.topDrop2G.trend',
					resolve: {
						city: function() {
							return city;
						},
						beginDate: function() {
							return beginDate;
						},
						endDate: function() {
							return endDate;
						},
						topCount: function() {
							return topCount;
						}
					}
				});
			},
			showTopConnectionTrend: function(city, beginDate, endDate, topCount) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/BasicKpi/TopConnection3GTrend.html',
					controller: 'kpi.topConnection3G.trend',
					resolve: {
						city: function() {
							return city;
						},
						beginDate: function() {
							return beginDate;
						},
						endDate: function() {
							return endDate;
						},
						topCount: function() {
							return topCount;
						}
					}
				});
			},
			showStationInfo: function(station, beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Home/StationDetails.html',
					controller: 'map.station.dialog',
					resolve: {
						dialogTitle: function() {
							return "站点信息:" + station.StationName;
						},
						station: function() {
							return station;
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
			showIndoorInfo: function (station, beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Home/IndoorDetails.html',
					controller: 'map.indoor.dialog',
					resolve: {
						dialogTitle: function () {
							return "站点信息:" + station.name;
						},
						station: function () {
							return station;
						},
						beginDate: function () {
							return beginDate;
						},
						endDate: function () {
							return endDate;
						}
					}
				});
			},
			showDistributionInfo: function(distribution) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Parameters/Map/DistributionMapInfoBox.html',
					controller: 'map.distribution.dialog',
					resolve: {
						dialogTitle: function() {
							return distribution.name + "-" + "室内分布基本信息";
						},
						distribution: function() {
							return distribution;
						}
					}
				});
			}
		};
	});
