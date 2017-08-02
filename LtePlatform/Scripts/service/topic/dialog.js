angular.module('topic.dialog', ['myApp.url', 'myApp.region', 'myApp.kpi', 'topic.basic', "ui.bootstrap"])
	.run(function($rootScope, kpiPreciseService) {
		$rootScope.orderPolicy = {
			options: [],
			selected: ""
		};
		$rootScope.topCount = {
			options: [5, 10, 15, 20, 30],
			selected: 15
		};
		kpiPreciseService.getOrderSelection().then(function (result) {
			$rootScope.orderPolicy.options = result;
			$rootScope.orderPolicy.selected = result[5];
		});
		$rootScope.closeAlert = function (messages, index) {
			messages.splice(index, 1);
		};

	})
	.factory('mapDialogService', function(menuItemService) {
		return {
			showTownENodebInfo: function(item, city, district) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Parameters/Region/TownENodebInfo.html',
					controller: 'town.eNodeb.dialog',
					resolve: {
						dialogTitle: function() {
							return city + district + item.town + "-" + "基站基本信息";
						},
						city: function() {
							return city;
						},
						district: function() {
							return district;
						},
						town: function() {
							return item.town;
						}
					}
				});
			},
			showHotSpotsInfo: function(hotSpotList) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: '/appViews/Parameters/Map/HotSpotInfoBox.html',
					controller: 'hot.spot.info.dialog',
					resolve: {
						dialogTitle: function() {
							return "热点信息列表";
						},
						hotSpotList: function() {
							return hotSpotList;
						}
					}
				});
			},
			showCellsInfo: function(sectors) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Parameters/Map/CellsMapInfoBox.html',
					controller: 'map.sectors.dialog',
					resolve: {
						dialogTitle: function() {
							return "小区信息列表";
						},
						sectors: function() {
							return sectors;
						}
					}
				});
			},
			showPlanningSitesInfo: function(site) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Home/PlanningDetails.html',
					controller: 'map.site.dialog',
					resolve: {
						dialogTitle: function() {
							return "规划站点信息:" + site.formalName;
						},
						site: function() {
							return site;
						}
					}
				});
			},
			showOnlineSustainInfos: function(items) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Customer/Complain/Online.html',
					controller: 'online.sustain.dialog',
					resolve: {
						dialogTitle: function() {
							return "在线支撑基本信息";
						},
						items: function() {
							return items;
						}
					}
				});
			},
			showMicroAmpliferInfos: function(item) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Customer/Dialog/Micro.html',
					controller: 'micro.dialog',
					resolve: {
						dialogTitle: function() {
							return item.addressNumber + "手机伴侣基本信息";
						},
						item: function() {
							return item;
						}
					}
				});
			},
			showAlarmStationInfo: function(station, beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Evaluation/AlarmStationDetails.html',
					controller: 'map.alarmStation.dialog',
					resolve: {
						dialogTitle: function() {
							return "告警信息:" + station.StationName;
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
			showAlarmHistoryList: function(alarmStation) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Evaluation/Dialog/AlarmHistoryListDialog.html',
					controller: 'map.alarmHistoryList.dialog',
					resolve: {
						dialogTitle: function() {
							return "告警历史：" + alarmStation.NetAdminName;
						},
						alarmStation: function() {
							return alarmStation;
						}
					}
				});
			},
			showCheckingStationInfo: function(station) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Evaluation/Dialog/SpecialStationDetails.html',
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
			showFixingStationInfo: function (station) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Evaluation/Dialog/SpecialStationDetails.html',
					controller: 'map.fixingStation.dialog',
					resolve: {
						dialogTitle: function () {
							return "整治信息:" + station.name;
						},
						station: function () {
							return station;
						}
					}
				});
			},
			showCommonStationInfo: function(station) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Evaluation/Dialog/CommonStationDetails.html',
					controller: 'map.common-station.dialog',
					resolve: {
						dialogTitle: function() {
							return "站点信息:" + station.name;
						},
						station: function() {
							return station;
						}
					}
				});
			},
			showCommonStationList: function(type) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Evaluation/Dialog/CommonStationListDialog.html',
					controller: 'map.common-stationList.dialog',
					resolve: {
						dialogTitle: function() {
							return "公共列表";
						},
						type: function() {
							return type;
						}
					}
				});
			},
			showSpecialStationInfo: function(station) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Evaluation/Dialog/SpecialStationDetails.html',
					controller: 'map.special-station.dialog',
					resolve: {
						dialogTitle: function() {
							return "站点信息:" + station.enodebName;
						},
						station: function() {
							return station;
						}
					}
				});
			},
			showSpecialIndoorInfo: function(station) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Evaluation/Dialog/SpecialStationDetails.html',
					controller: 'map.special-indoor.dialog',
					resolve: {
						dialogTitle: function() {
							return "站点信息:" + station.enodebName;
						},
						station: function() {
							return station;
						}
					}
				});
			},
			showFaultStationInfo: function(station) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Evaluation/Dialog/SpecialStationDetails.html',
					controller: 'map.fault-station.dialog',
					resolve: {
						dialogTitle: function() {
							return "站点信息:" + station.enodebName;
						},
						station: function() {
							return station;
						}
					}
				});
			},
			showZeroFlowInfo: function(station) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Evaluation/Dialog/SpecialStationDetails.html',
					controller: 'map.zero-flow.dialog',
					resolve: {
						dialogTitle: function() {
							return "站点信息:" + station.enodebName;
						},
						station: function() {
							return station;
						}
					}
				});
			},
			showZeroVoiceInfo: function(station) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Evaluation/Dialog/SpecialStationDetails.html',
					controller: 'map.zero-voice.dialog',
					resolve: {
						dialogTitle: function() {
							return "站点信息:" + station.BTSName;
						},
						station: function() {
							return station;
						}
					}
				});
			},
			showResourceInfo: function (station) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Import/ResoureDetails.html',
					controller: 'map.resource.dialog',
					resolve: {
						dialogTitle: function () {
							return "资源资产:" + station.name;
						},
						station: function () {
							return station;
						}
					}
				});
			},
			showBuildingInfo: function(building) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Evaluation/Dialog/BuildingInfoBox.html',
					controller: 'map.building.dialog',
					resolve: {
						dialogTitle: function() {
							return building.name + "楼宇信息";
						},
						building: function() {
							return building;
						}
					}
				});
			},
			showPreciseTrend: function(city, beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Rutrace/Trend.html',
					controller: 'rutrace.trend',
					resolve: {
						dialogTitle: function () {
							return "精确覆盖率变化趋势";
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
            showRrcTrend: function(city, beginDate, endDate) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Trend.html',
                    controller: 'rrc.trend',
                    resolve: {
                        dialogTitle: function () {
                            return "RRC连接成功率变化趋势";
                        },
                        city: function () {
                            return city;
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
			showPreciseWorkItem: function (endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Rutrace/WorkItem/ForCity.html',
					controller: 'workitem.city',
					resolve: {
						endDate: function () {
							return endDate;
						}
					}
				});
			},
			showPreciseWorkItemDistrict: function (district, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Rutrace/WorkItem/ForCity.html',
					controller: 'workitem.district',
					resolve: {
						district: function() {
							return district;
						},
						endDate: function () {
							return endDate;
						}
					}
				});
			},
			showPreciseTop: function (beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Rutrace/Top.html',
					controller: 'rutrace.top',
					resolve: {
						dialogTitle: function () {
							return "全市精确覆盖率TOP统计";
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
			showPreciseTopDistrict: function (beginDate, endDate, district) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Rutrace/Top.html',
					controller: 'rutrace.top.district',
					resolve: {
						beginDate: function () {
							return beginDate;
						},
						endDate: function () {
							return endDate;
						},
						district: function() {
							return district;
						}
					}
				});
			},
			showMonthComplainItems: function() {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Customer/Index.html',
					controller: 'customer.index',
					resolve: {}
				});
			},
			showYesterdayComplainItems: function(city) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Customer/Dialog/Yesterday.html',
					controller: 'customer.yesterday',
					resolve: {
						city: function() {
							return city;
						}
					}
				});
			},
			showComplainDetails: function(item) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Customer/Complain/Details.html',
					controller: 'complain.details',
					resolve: {
						item: function () {
							return item;
						}
					}
				});
			},
			showCollegeCoverageList: function(beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/College/Coverage/All.html',
					controller: 'college.coverage.all',
					resolve: {
						beginDate: function () {
							return beginDate;
						},
						endDate: function () {
							return endDate;
						}
					}
				});
			}
		};
	})
	.controller('online.sustain.dialog', function($scope, $uibModalInstance, items, dialogTitle,
		networkElementService, cellHuaweiMongoService, alarmImportService, intraFreqHoService, interFreqHoService, appFormatService) {
		$scope.dialogTitle = dialogTitle;
		$scope.itemGroups = [];

		angular.forEach(items, function(item) {
			$scope.itemGroups.push(appFormatService.generateSustainGroups(item));
		});

		$scope.ok = function() {
			$uibModalInstance.close($scope.eNodebGroups);
		};
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

	})
	.controller('micro.dialog', function($scope, $uibModalInstance, dialogTitle, item, appFormatService) {
		$scope.dialogTitle = dialogTitle;
		$scope.ok = function() {
			$uibModalInstance.close($scope.eNodebGroups);
		};
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.detailsGroups = appFormatService.generateMicroAddressGroups(item);
		$scope.microGroups = [];
		angular.forEach(item.microItems, function(micro) {
			$scope.microGroups.push(appFormatService.generateMicroItemGroups(micro));
		});
	})
	.controller('town.eNodeb.dialog', function($scope, $uibModalInstance, dialogTitle, city, district, town,
		networkElementService) {
		$scope.dialogTitle = dialogTitle;
		networkElementService.queryENodebsInOneTown(city, district, town).then(function(eNodebs) {
			$scope.eNodebList = eNodebs;
		});
		networkElementService.queryBtssInOneTown(city, district, town).then(function(btss) {
			$scope.btsList = btss;
		});

		$scope.ok = function() {
			$uibModalInstance.close($scope.eNodeb);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('hot.spot.info.dialog', function($scope, $uibModalInstance, dialogTitle, hotSpotList) {
		$scope.dialogTitle = dialogTitle;
		$scope.hotSpotList = hotSpotList;

		$scope.ok = function() {
			$uibModalInstance.close($scope.neighbor);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

	})
	.controller('map.sectors.dialog', function($scope, $uibModalInstance, sectors, dialogTitle, networkElementService) {
		$scope.sectors = sectors;
		$scope.dialogTitle = dialogTitle;
		if (sectors.length > 0) {
			networkElementService.queryCellInfo(sectors[0].eNodebId, sectors[0].sectorId).then(function(result) {
				$scope.currentCell = result;
			});
		}
		$scope.ok = function() {
			$uibModalInstance.close($scope.sectors);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

	})
	.controller('map.site.dialog', function($scope, $uibModalInstance, site, dialogTitle, appFormatService, networkElementService) {
		$scope.itemGroups = appFormatService.generateSiteGroups(site);
		$scope.detailsGroups = appFormatService.generateSiteDetailsGroups(site);
		$scope.cellGroups = [];
		networkElementService.queryENodebByPlanNum(site.planNum).then(function(eNodeb) {
			if (eNodeb) {
				$scope.eNodebGroups = appFormatService.generateENodebGroups(eNodeb);
				$scope.eNodeb = eNodeb;
			} else {
				networkElementService.queryLteRrusFromPlanNum(site.planNum).then(function(cells) {
					angular.forEach(cells, function(cell) {
						$scope.cellGroups.push({
							cellName: cell.cellName,
							cellGroup: appFormatService.generateCellGroups(cell),
							rruGroup: appFormatService.generateRruGroups(cell)
						});
					});
					if (cells.length) {
						networkElementService.queryENodebInfo(cells[0].eNodebId).then(function(item) {
							if (item) {
								$scope.eNodebGroups = appFormatService.generateENodebGroups(item);
								$scope.eNodeb = item;
								networkElementService.queryCellViewsInOneENodeb(item.eNodebId).then(function(cellList) {
									$scope.cellList = cellList;
								});
							}
						});
					}
				});
			}
		});
		$scope.dialogTitle = dialogTitle;
		$scope.ok = function() {
			$uibModalInstance.close($scope.site);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.special-station.dialog', function($scope, $uibModalInstance, station, dialogTitle,
		appFormatService) {

		$scope.itemGroups = appFormatService.generateSpecialStationGroups(station);

		$scope.dialogTitle = dialogTitle;


		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.zero-voice.dialog', function($scope, $uibModalInstance, station, dialogTitle,
		appFormatService) {

		$scope.itemGroups = appFormatService.generateZeroVoiceGroups(station);

		$scope.dialogTitle = dialogTitle;


		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.zero-flow.dialog', function($scope, $uibModalInstance, station, dialogTitle,
		appFormatService) {

		$scope.itemGroups = appFormatService.generateZeroFlowGroups(station);

		$scope.dialogTitle = dialogTitle;


		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.special-indoor.dialog', function($scope, $uibModalInstance, station, dialogTitle,
		appFormatService) {

		$scope.itemGroups = appFormatService.generateSpecialIndoorGroups(station);

		$scope.dialogTitle = dialogTitle;


		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.fault-station.dialog', function($scope, $uibModalInstance, station, dialogTitle,
		appFormatService) {

		$scope.itemGroups = appFormatService.generateFaultStationGroups(station);

		$scope.dialogTitle = dialogTitle;


		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.checkingStation.dialog', function($scope, $uibModalInstance, station, dialogTitle,
        appFormatService, networkElementService, downSwitchService) {
        downSwitchService.getCheckDetailsById(station.id).then(function(response) {
            station = response.result[0];
            $scope.itemGroups = appFormatService.generateCheckingDetailsGroups(station);
        });

		$scope.dialogTitle = dialogTitle;

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.fixingStation.dialog', function ($scope, $uibModalInstance, station, dialogTitle,
		appFormatService) {
		$scope.itemGroups = appFormatService.generateFixingStationGroups(station);
		$scope.dialogTitle = dialogTitle;

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.common-station.dialog', function($scope, $uibModalInstance, station, dialogTitle) {
		$scope.station = station;
		$scope.dialogTitle = dialogTitle;
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.common-stationList.dialog', function($scope, $http, dialogTitle, type, $uibModalInstance, parametersDialogService,
		downSwitchService) {
		$scope.dialogTitle = dialogTitle;
		$scope.distincts = new Array('FS', 'SD', 'NH', 'CC', 'SS', 'GM');
		$scope.stationList = [];
		$scope.page = 1;
		$scope.stationName = '';
		$scope.totolPage = 1;
		downSwitchService.getAllCommonStations(type, 0, 10).then(function(response) {
			$scope.stationList = response.result.rows;
			$scope.totolPage = response.result.total_pages;
			$scope.page = response.result.curr_page;
		});
		$scope.details = function(stationId) {
			downSwitchService.getCommonStationById(stationId).then(function(result) {
				parametersDialogService.showCommonStationInfo(result.result[0]);
			});
		}

		$scope.delete = function(stationId) {
			if (confirm("你确定删除该站点？")) {
				downSwitchService.deleteCommonStation(stationId).then(function(response) {
					alert(response.description);
					$scope.jumpPage($scope.page);
				});
			}
		}
		$scope.edit = function(stationId) {
			parametersDialogService.showCommonStationEdit(stationId);
		}
		$scope.addStation = function() {
			parametersDialogService.showCommonStationAdd();
		}
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		}
		$scope.search = function() {
			$scope.page = 1;
			$scope.jumpPage($scope.page);
		}
		$scope.firstPage = function() {
			$scope.page = 1;
			$scope.jumpPage($scope.page);
		}
		$scope.lastPage = function() {
			$scope.page = $scope.totolPage;
			$scope.jumpPage($scope.page);
		}
		$scope.prevPage = function() {
			if ($scope.page !== 1)
				$scope.page--;
			$scope.jumpPage($scope.page);
		}
		$scope.nextPage = function() {
			if ($scope.page !== $scope.totolPage)
				$scope.page++;
			$scope.jumpPage($scope.page);
		}
		$scope.jumpPage = function(page) {
			if (page >= $scope.totolPage)
				page = $scope.totolPage;
			downSwitchService.getCommonStationByName($scope.selectDistinct, $scope.stationName, type, page, 10).then(function(response) {
				$scope.stationList = response.result.rows;
				$scope.totolPage = response.result.total_pages;
				$scope.page = response.result.curr_page;
				$scope.records = response.dresult.records;
			});
		}
	})
	.controller('map.alarmStation.dialog', function($scope, $uibModalInstance, station, beginDate, endDate, dialogTitle,
		appFormatService, downSwitchService, workItemDialog, mapDialogService) {
		$scope.station = station;
		downSwitchService.getAlarmStationById(station.StationId, 0, 10000).then(function(response) {
			$scope.alarmStations = response.result;
		});
		$scope.showHistory = function(netAdminId) {
			mapDialogService.showAlarmHistoryList(netAdminId);
		};
		$scope.showStationInfo = function() {
			downSwitchService.getStationById(station.StationId).then(function(result) {
				workItemDialog.showStationInfo(result.result[0], beginDate, endDate);
			});
		};

		$scope.dialogTitle = dialogTitle;
		$scope.ok = function() {
			$uibModalInstance.close($scope.site);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.alarmHistoryList.dialog', function($scope, $http, dialogTitle, alarmStation, $uibModalInstance,
		downSwitchService) {
		$scope.levels = [
			{ value: '', name: '全部' },
			{ value: '0', name: '紧急' },
			{ value: '1', name: '重要' },
			{ value: '2', name: '一般' }
		];
		$scope.alarmStation = alarmStation;
		$scope.dialogTitle = dialogTitle;
		$scope.page = 1;
		$scope.totolPage = 1;
		$scope.records = 0;
		$scope.alarmList = new Array();

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		}
		$scope.search = function() {
			$scope.page = 1;
			$scope.jumpPage($scope.page);
		}
		$scope.firstPage = function() {
			$scope.page = 1;
			$scope.jumpPage($scope.page);
		}
		$scope.lastPage = function() {
			$scope.page = $scope.totolPage;
			$scope.jumpPage($scope.page);
		}
		$scope.prevPage = function() {
			if ($scope.page !== 1)
				$scope.page--;
			$scope.jumpPage($scope.page);
		}
		$scope.nextPage = function() {
			if ($scope.page !== $scope.totolPage)
				$scope.page++;
			$scope.jumpPage($scope.page);
		}
		$scope.jumpPage = function(page) {
			if (page >= $scope.totolPage)
				page = $scope.totolPage;
			downSwitchService.getAlarmHistorybyId($scope.alarmStation.NetAdminId, page, 10, $scope.selectLevel.value).then(function(response) {
				$scope.alarmList = response.result.rows;
				$scope.totolPage = response.result.total_pages;
				$scope.page = response.result.curr_page;
				$scope.records = response.result.records;
			});
		}

	})
	.controller('map.resource.dialog', function ($scope, $uibModalInstance, station, dialogTitle, downSwitchService) {
		$scope.station = station;
		$scope.dialogTitle = dialogTitle;
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.tab = 1;

		$scope.selectTab = function (setTab) {
			$scope.tab = setTab;
			if (0 === setTab) {
				downSwitchService.getResourceCounter(station.id).then(function (response) {
					$scope.counter = response.result;
				});
			} else if (1 === setTab) {
				$scope.table = "bts";
			} else if (2 === setTab) {
				$scope.table = "enodeb";
			} else if (3 === setTab) {
				$scope.table = "rru";
			} else if (4 === setTab) {
				$scope.table = "lrru";
			} else if (5 === setTab) {
				$scope.table = "sfz";
			} else if (6 === setTab) {
				$scope.table = "zfz";
			} else if (7 === setTab) {
				$scope.table = "asset";
			}
			if (0 !== setTab) {
				downSwitchService.getResource($scope.table, station.id).then(function (response) {
					$scope.resourceList = response.result;
				});
			}
		}

		$scope.isSelectTab = function (checkTab) {
			return $scope.tab === checkTab
		}
		$scope.selectTab(0);
	})

	.controller('map.building.dialog', function($scope, $uibModalInstance, building, dialogTitle) {
		$scope.building = building;
		$scope.dialogTitle = dialogTitle;

		$scope.ok = function() {
			$uibModalInstance.close($scope.building);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller("rutrace.trend", function ($scope, $uibModalInstance, mapDialogService,
		appKpiService, kpiPreciseService, appFormatService, workItemDialog,
		dialogTitle, city, beginDate, endDate) {
		var yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
        $scope.dialogTitle = dialogTitle + '-' + yesterday;
        $scope.kpiType = 'precise';
		$scope.statDate = {
			value: yesterday,
			opened: false
		};
		
		$scope.overallStat = {
			currentDistrict: "",
			districtStats: [],
			townStats: [],
			cityStat: {},
			dateString: ""
		};
		$scope.beginDate = beginDate;
		$scope.endDate = endDate;
		$scope.showKpi = function() {
			kpiPreciseService.getRecentPreciseRegionKpi(city.selected, $scope.statDate.value)
				.then(function(result) {
					$scope.statDate.value = appFormatService.getDate(result.statDate);
					angular.forEach(result.districtPreciseViews, function(view) {
						view.objectRate = appKpiService.getPreciseObject(view.district);
					});
					$scope.overallStat.districtStats = result.districtPreciseViews;
					$scope.overallStat.townStats = result.townPreciseViews;
					$scope.overallStat.currentDistrict = result.districtPreciseViews[0].district;
					$scope.overallStat.districtStats.push(appKpiService.getCityStat($scope.overallStat.districtStats, city.selected));
					$scope.overallStat.dateString = appFormatService.getDateString($scope.statDate.value, "yyyy年MM月dd日");
				});
		};
		$scope.showChart = function() {
			workItemDialog.showPreciseChart($scope.overallStat);
		};
		$scope.showWorkitemCity = function() {
			mapDialogService.showPreciseWorkItem($scope.endDate);
		};
		$scope.showTrend = function() {
			workItemDialog.showPreciseTrend(city, $scope.beginDate, $scope.endDate);
		};
		$scope.showTopKpi = function() {
			mapDialogService.showPreciseTop($scope.beginDate, $scope.endDate);
		};

		$scope.showKpi();

		$scope.ok = function() {
			$uibModalInstance.close($scope.building);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
    })
    .controller('rrc.trend', function ($scope, $uibModalInstance,
        kpiPreciseService, appFormatService, appKpiService, workItemDialog,
        dialogTitle, city, beginDate, endDate) {
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        $scope.dialogTitle = dialogTitle + '-' + yesterday;
        $scope.kpiType = 'rrc';
        $scope.statDate = {
            value: yesterday,
            opened: false
        };

        $scope.overallStat = {
            currentDistrict: "",
            districtStats: [],
            townStats: [],
            cityStat: {},
            dateString: ""
        };
        $scope.beginDate = beginDate;
        $scope.endDate = endDate;
        $scope.showKpi = function () {
            kpiPreciseService.getRecentRrcRegionKpi(city.selected, $scope.statDate.value)
                .then(function (result) {
                    $scope.statDate.value = appFormatService.getDate(result.statDate);
                    angular.forEach(result.districtRrcViews, function (view) {
                        view.objectRate = appKpiService.getRrcObject(view.district);
                    });
                    $scope.overallStat.districtStats = result.districtRrcViews;
                    $scope.overallStat.townStats = result.townRrcViews;
                    $scope.overallStat.currentDistrict = result.districtRrcViews[0].district;
                    $scope.overallStat.districtStats.push(appKpiService.getRrcCityStat($scope.overallStat.districtStats, city.selected));
                    $scope.overallStat.dateString = appFormatService.getDateString($scope.statDate.value, "yyyy年MM月dd日");
                });
        };
        $scope.showChart = function () {
            workItemDialog.showRrcChart($scope.overallStat);
        };

        $scope.showKpi();
        $scope.ok = function () {
            $uibModalInstance.close($scope.building);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
	.controller("workitem.city", function ($scope, $uibModalInstance, endDate,
		preciseWorkItemService, workItemDialog) {
		$scope.dialogTitle = "精确覆盖优化工单一览";
		var lastSeason = new Date();
		lastSeason.setDate(lastSeason.getDate() - 100);
		$scope.seasonDate = {
			value: new Date(lastSeason.getFullYear(), lastSeason.getMonth(), lastSeason.getDate(), 8),
			opened: false
		};
		$scope.endDate = endDate;
		$scope.queryWorkItems = function () {
			preciseWorkItemService.queryByDateSpan($scope.seasonDate.value, $scope.endDate.value).then(function (views) {
				angular.forEach(views, function (view) {
					view.detailsPath = $scope.rootPath + "details/" + view.serialNumber;
				});
				$scope.viewItems = views;
			});
		};
		$scope.showDetails = function (view) {
			workItemDialog.showDetails(view, $scope.queryWorkItems);
		};
		$scope.queryWorkItems();

		$scope.ok = function () {
			$uibModalInstance.close($scope.building);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller("workitem.district", function ($scope, $uibModalInstance, district, endDate,
		preciseWorkItemService, workItemDialog) {
		$scope.dialogTitle = district + "精确覆盖优化工单一览";
		var lastSeason = new Date();
		lastSeason.setDate(lastSeason.getDate() - 100);
		$scope.seasonDate = {
			value: new Date(lastSeason.getFullYear(), lastSeason.getMonth(), lastSeason.getDate(), 8),
			opened: false
		};
		$scope.endDate = endDate;
		$scope.queryWorkItems = function () {
			preciseWorkItemService.queryByDateSpanDistrict($scope.seasonDate.value, $scope.endDate.value, district).then(function (views) {
				angular.forEach(views, function (view) {
					view.detailsPath = $scope.rootPath + "details/" + view.serialNumber;
				});
				$scope.viewItems = views;
			});
		};
		$scope.showDetails = function (view) {
			workItemDialog.showDetails(view, $scope.queryWorkItems);
		};
		$scope.queryWorkItems();

		$scope.ok = function () {
			$uibModalInstance.close($scope.building);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller("rutrace.top", function ($scope, $uibModalInstance, dialogTitle,
		preciseInterferenceService, kpiPreciseService, workitemService, beginDate, endDate) {
		$scope.dialogTitle = dialogTitle;
		$scope.topCells = [];
		$scope.updateMessages = [];
		$scope.beginDate = beginDate;
		$scope.endDate = endDate;

		$scope.query = function () {
			$scope.topCells = [];
			kpiPreciseService.queryTopKpis(beginDate.value, endDate.value, $scope.topCount.selected,
				$scope.orderPolicy.selected).then(function (result) {
					$scope.topCells = result;
					angular.forEach(result, function (cell) {
						workitemService.queryByCellId(cell.cellId, cell.sectorId).then(function (items) {
							if (items.length > 0) {
								for (var j = 0; j < $scope.topCells.length; j++) {
									if (items[0].eNodebId === $scope.topCells[j].cellId && items[0].sectorId === $scope.topCells[j].sectorId) {
										$scope.topCells[j].hasWorkItems = true;
										break;
									}
								}
							}
						});
						preciseInterferenceService.queryMonitor(cell.cellId, cell.sectorId).then(function (monitored) {
							cell.isMonitored = monitored;
						});
					});
				});
		};
		$scope.monitorAll = function () {
			angular.forEach($scope.topCells, function (cell) {
				if (cell.isMonitored === false) {
					preciseInterferenceService.addMonitor(cell);
				}
			});
		};

		$scope.query();

		$scope.ok = function () {
			$uibModalInstance.close($scope.building);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller("rutrace.top.district", function ($scope, $uibModalInstance, district,
		preciseInterferenceService, kpiPreciseService, workitemService, beginDate, endDate) {
		$scope.dialogTitle = "TOP指标分析-" + district;
		$scope.topCells = [];
		$scope.updateMessages = [];
		$scope.beginDate = beginDate;
		$scope.endDate = endDate;

		$scope.query = function () {
			$scope.topCells = [];
			kpiPreciseService.queryTopKpisInDistrict($scope.beginDate.value, $scope.endDate.value, $scope.topCount.selected,
				$scope.orderPolicy.selected, $scope.city.selected, district).then(function (result) {
					$scope.topCells = result;
					angular.forEach(result, function (cell) {
						workitemService.queryByCellId(cell.cellId, cell.sectorId).then(function (items) {
							if (items.length > 0) {
								for (var j = 0; j < $scope.topCells.length; j++) {
									if (items[0].eNodebId === $scope.topCells[j].cellId && items[0].sectorId === $scope.topCells[j].sectorId) {
										$scope.topCells[j].hasWorkItems = true;
										break;
									}
								}
							}
						});
						preciseInterferenceService.queryMonitor(cell.cellId, cell.sectorId).then(function (monitored) {
							cell.isMonitored = monitored;
						});
					});
				});
		};
		$scope.monitorAll = function () {
			angular.forEach($scope.topCells, function (cell) {
				if (cell.isMonitored === false) {
					preciseInterferenceService.addMonitor(cell);
				}
			});
		};

		$scope.query();

		$scope.ok = function () {
			$uibModalInstance.close($scope.building);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller("customer.index", function ($scope, $uibModalInstance,
	    complainService, appKpiService) {
		$scope.statDate = {
			value: new Date(),
			opened: false
		};
		$scope.monthObject = 498;
		$scope.query = function () {
			complainService.queryCurrentComplains($scope.statDate.value).then(function (count) {
				$scope.count = count;
				var objects = [];
				complainService.queryMonthTrend($scope.statDate.value).then(function (stat) {
					angular.forEach(stat.item1, function (date, index) {
						objects.push((index + 1) / stat.item1.length * $scope.monthObject);
					});
					var options = appKpiService.generateComplainTrendOptions(stat.item1, stat.item2, objects);
					$('#line-chart').highcharts(options);
				});
			});
		};
		$scope.query();
		$scope.ok = function () {
			$uibModalInstance.close($scope.building);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller("customer.yesterday", function ($scope, $uibModalInstance, city,
	    complainService) {
		$scope.statDate = {
			value: new Date(),
			opened: false
		};
		$scope.city = city;
		$scope.data = {
			complainList: []
		};
		$scope.query = function () {
			complainService.queryLastDateComplainStats($scope.statDate.value).then(function(result) {
				$scope.statDate.value = result.statDate;
				$scope.districtStats = result.districtComplainViews;
			});
		};
		$scope.query();
		$scope.ok = function () {
			$uibModalInstance.close($scope.building);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller("complain.details", function ($scope, $uibModalInstance, item, appFormatService) {
		$scope.dialogTitle = item.serialNumber + "投诉工单详细信息";
		$scope.complainGroups = appFormatService.generateComplainItemGroups(item);
		$scope.ok = function () {
			$uibModalInstance.close($scope.building);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('college.coverage.all', function ($scope, beginDate, endDate, $uibModalInstance,
		collegeDtService, collegeMapService) {
		$scope.dialogTitle = "校园网路测数据查询";
		$scope.dtInfos = [];
		$scope.query = function () {
			collegeMapService.showDtInfos($scope.dtInfos, beginDate.value, endDate.value);
		};
		$scope.ok = function () {
			$uibModalInstance.close($scope.building);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	});