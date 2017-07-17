angular.module('topic.parameters', ['myApp.url', 'myApp.region', 'myApp.kpi', 'topic.basic', "ui.bootstrap"])
	.controller('map.eNodeb.dialog', function ($scope, $uibModalInstance, eNodeb, dialogTitle,
		networkElementService, cellHuaweiMongoService, alarmImportService, intraFreqHoService, interFreqHoService, appFormatService,
		downSwitchService, alarmsService, appRegionService) {
		$scope.dialogTitle = dialogTitle;
		$scope.alarmLevel = {
			options: ["严重告警", "重要以上告警", "所有告警"],
			selected: "重要以上告警"
		};
		$scope.alarms = [];
		$scope.searchAlarms = function () {
			alarmsService.queryENodebAlarmsByDateSpanAndLevel(eNodeb.eNodebId,
				$scope.beginDate.value, $scope.endDate.value, $scope.alarmLevel.selected).then(function (result) {
					$scope.alarms = result;
				});
		};

		$scope.searchAlarms();

		networkElementService.queryENodebInfo(eNodeb.eNodebId).then(function (result) {
			appRegionService.isInTownBoundary(result.longtitute, result.lattitute, result.cityName, result.districtName, result.townName).then(function(conclusion) {
				var color = conclusion ? 'green' : 'red';
				$scope.eNodebGroups = appFormatService.generateENodebGroups(result, color);
			});
			networkElementService.queryStationByENodeb(eNodeb.eNodebId, eNodeb.planNum).then(function (dict) {
				if (dict) {
					downSwitchService.getStationById(dict.stationNum).then(function (stations) {
						stations.result[0].Town = result.townName;
						$scope.stationGroups = appFormatService.generateStationGroups(stations.result[0]);
					});
				}

			});
			if (result.factory === '华为') {
				cellHuaweiMongoService.queryLocalCellDef(result.eNodebId).then(function (cellDef) {
					alarmImportService.updateHuaweiAlarmInfos(cellDef).then(function () { });
				});
			}
		});

		//查询该基站下带的小区列表
		networkElementService.queryCellViewsInOneENodeb(eNodeb.eNodebId).then(function (result) {
			$scope.cellList = result;
		});

		//查询基站同频切换参数
		intraFreqHoService.queryENodebParameters(eNodeb.eNodebId).then(function (result) {
			$scope.intraFreqHo = result;
		});

		//查询基站异频切换参数
		interFreqHoService.queryENodebParameters(eNodeb.eNodebId).then(function (result) {
			$scope.interFreqHo = result;
		});

		$scope.ok = function () {
			$uibModalInstance.close($scope.eNodebGroups);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.neighbor.dialog', function ($scope, $uibModalInstance, interFreqHoService, neighborDialogService, flowService, appKpiService,
		neighbor, dialogTitle, beginDate, endDate) {
		$scope.neighbor = neighbor;
		$scope.eNodebId = neighbor.otherInfos.split(': ')[5];
		$scope.sectorId = neighbor.cellName.split('-')[1];
		$scope.dialogTitle = dialogTitle;
		$scope.beginDate = beginDate;
		$scope.endDate = endDate;
		$scope.parameter = {
			options: [
				'基本参数', '同频切换', 'A1异频切换',
				'A2异频切换', 'A3异频切换', 'A4异频切换', 'A5异频切换'
			],
			selected: '基本参数'
		};

		$scope.dump = function () {
			neighborDialogService.dumpMongo({
				eNodebId: $scope.eNodebId,
				sectorId: $scope.sectorId,
				pci: neighbor.pci,
				name: neighbor.cellName.split('-')[0]
			}, $scope.beginDate.value, $scope.endDate.value);
		};

		$scope.ok = function () {
			$uibModalInstance.close($scope.neighbor);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		$scope.queryFlow = function () {
			flowService.queryCellFlowByDateSpan($scope.eNodebId, $scope.sectorId, $scope.beginDate.value, $scope.endDate.value).then(function (results) {
				$("#flowChart").highcharts(appKpiService.generateMergeFlowOptions(results, neighbor.cellName));
				$("#usersChart").highcharts(appKpiService.generateMergeUsersOptions(results, neighbor.cellName));
			});
		};

		interFreqHoService.queryCellParameters($scope.eNodebId, $scope.sectorId).then(function (result) {
			$scope.interFreqHo = result;
			$scope.queryFlow();
		});
	})
	.controller('map.bts.dialog', function ($scope, $uibModalInstance, bts, dialogTitle, networkElementService) {
		$scope.bts = bts;
		$scope.dialogTitle = dialogTitle;

		networkElementService.queryBtsInfo(bts.btsId).then(function (result) {
			$scope.btsDetails = result;
		});
		networkElementService.queryCdmaCellViews(bts.name).then(function (result) {
			$scope.cdmaCellList = result;
		});
		$scope.ok = function () {
			$uibModalInstance.close($scope.bts);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.cdma.cell.dialog', function ($scope, $uibModalInstance, neighbor, dialogTitle,
		networkElementService) {
		$scope.cdmaCellDetails = neighbor;
		$scope.dialogTitle = dialogTitle;
		$scope.ok = function () {
			$uibModalInstance.close($scope.neighbor);
		};
		networkElementService.queryCdmaCellInfo(neighbor.btsId, neighbor.sectorId).then(function (result) {
			angular.extend($scope.cdmaCellDetails, result);
		});
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('town.dt.dialog', function ($scope, $uibModalInstance, dialogTitle, item,
		kpiDisplayService, baiduMapService, parametersMapService, coverageService, collegeService) {
		$scope.dialogTitle = dialogTitle;

		$scope.includeAllFiles = false;
		$scope.network = {
			options: ['2G', '3G', '4G'],
			selected: '2G'
		};
		$scope.dataFile = {
			options: [],
			selected: ''
		};
		$scope.data = [];
		$scope.coverageOverlays = [];

		$scope.query = function () {
			$scope.kpi = kpiDisplayService.queryKpiOptions($scope.network.selected);
			collegeService.queryTownRaster($scope.network.selected, item.townName, $scope.beginDate.value, $scope.endDate.value).then(function (results) {
				baiduMapService.switchSubMap();
				baiduMapService.initializeMap("all-map", 14);
				baiduMapService.setCellFocus(item.longtitute, item.lattitute, 14);
				if (results.length) {
					$scope.dataFile.options = results;
					$scope.dataFile.selected = results[0];
				}
			});

		};

		$scope.$watch('network.selected', function () {
			$scope.query();
		});

		$scope.showDtPoints = function () {
			$scope.legend = kpiDisplayService.queryCoverageLegend($scope.kpi.selected);
			$scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
			kpiDisplayService.generateCoveragePoints($scope.coveragePoints, $scope.data, $scope.kpi.selected);
			angular.forEach($scope.coverageOverlays, function (overlay) {
				baiduMapService.removeOverlay(overlay);
			});
			parametersMapService.showIntervalPoints($scope.coveragePoints.intervals, $scope.coverageOverlays);
		};

		var queryRasterInfo = function (index) {
			console.log($scope.dataFile);
			console.log($scope.network);
			coverageService.queryByRasterInfo($scope.dataFile.options[index], $scope.network.selected).then(function (result) {
				$scope.data.push.apply($scope.data, result);
				if (index < $scope.dataFile.options.length - 1) {
					queryRasterInfo(index + 1);
				} else {
					$scope.showDtPoints();
				}
			});
		};

		$scope.showStat = function () {
			$scope.data = [];
			if ($scope.includeAllFiles) {
				queryRasterInfo(0);
			} else {
				coverageService.queryByRasterInfo($scope.dataFile.selected, $scope.network.selected).then(function (result) {
					$scope.data = result;
					$scope.showDtPoints();
				});
			}
		};

		$scope.ok = function () {
			$uibModalInstance.close($scope.eNodeb);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})

	.controller('map.stationList.dialog', function ($scope, dialogTitle, $uibModalInstance, workItemDialog,
		downSwitchService, parametersDialogService) {
		$scope.dialogTitle = dialogTitle;
		$scope.distincts = new Array('全市', 'FS顺德', 'FS南海', 'FS禅城', 'FS三水', 'FS高明');
		$scope.stationList = [];
		$scope.page = 1;
		$scope.stationName = '';
		$scope.totolPage = 1;
		downSwitchService.getStations(0, 10).then(function (result) {
			$scope.stationList = result.result.rows;
			$scope.totolPage = result.result.total_pages;
			$scope.page = result.result.curr_page;
		});
		$scope.details = function (stationId) {
			downSwitchService.getStationById(stationId).then(function (result) {
				workItemDialog.showStationInfo(result.result[0]);
			});
		}

		$scope.delete = function (stationId) {
			if (confirm("你确定删除该站点？")) {
				downSwitchService.deleteStationById(stationId).then(function (result) {
					alert(result.description);
					$scope.jumpPage($scope.page);
				});
			}
		}
		$scope.edit = function (stationId) {
			parametersDialogService.showStationEdit(stationId);
		}
		$scope.addStation = function () {
			parametersDialogService.showStationAdd();
		}
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		}
		$scope.search = function () {
			$scope.page = 1;
			$scope.jumpPage($scope.page);
		}
		$scope.firstPage = function () {
			$scope.page = 1;
			$scope.jumpPage($scope.page);
		}
		$scope.lastPage = function () {
			$scope.page = $scope.totolPage;
			$scope.jumpPage($scope.page);
		}
		$scope.prevPage = function () {
			if ($scope.page != 1)
				$scope.page--;
			$scope.jumpPage($scope.page);
		}
		$scope.nextPage = function () {
			if ($scope.page != $scope.totolPage)
				$scope.page++;
			$scope.jumpPage($scope.page);
		}
		$scope.jumpPage = function (page) {
			if (page >= $scope.totolPage)
				page = $scope.totolPage;
			downSwitchService.getStationByName($scope.stationName, $scope.selectDistinct, page, 10).then(function (result) {
				$scope.stationList = result.result.rows;
				$scope.totolPage = result.result.total_pages;
				$scope.page = result.result.curr_page;
			});
		};
	})

	.controller('map.stationEdit.dialog', function ($scope, stationId, dialogTitle, $uibModalInstance, downSwitchService) {
		$scope.dialogTitle = dialogTitle;
		$scope.station = '';
		downSwitchService.getStationById(stationId).then(function(result) {
			$scope.station = result.result[0];
		});
		$scope.ok = function () {
			downSwitchService.updateStation({
				"Station": JSON.stringify($scope.station)
			}).then(function(result) {
				alert(result.description);
			});
		}
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		}
	})
	.controller('map.stationAdd.dialog', function ($scope, dialogTitle, $uibModalInstance, downSwitchService) {
		$scope.dialogTitle = dialogTitle;
		$scope.station = '';
		$scope.ok = function () {
			downSwitchService.addStation({
				"Station": JSON.stringify($scope.station)
			}).then(function(result) {
				alert(result.description);
			});
		}
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		}
	})
	.controller('map.construction.dialog', function ($scope, $uibModalInstance, dialogTitle, site, appFormatService, downSwitchService) {
		$scope.dialogTitle = dialogTitle;
		$scope.site = site;
		$scope.upload = {
			dwg: false
		};
		$scope.constructionGroups = appFormatService.generateConstructionGroups(site);
		$scope.uploadNewDwg = function() {
			$scope.upload.dwg = true;
			var $uploader = $("#btsInfo_upload_dwg");
			//配置上传控件
			$uploader.fileinput({
				language: "zh",//本地化语言
				uploadUrl: "/api/DwgView?directory=Common&btsId=" + site.fslNumber,
				uploadAsync: true,
				minFileCount: 1,
				maxFileCount: 6,//一次最多上传数量
				overwriteInitial: false,
				allowedFileExtensions: ["pdf", "vsd", "vsdx"],
				previewSettings: {
					image: { width: "120px", height: "80px" }
				},
				initialPreviewAsData: true // identify if you are sending preview data only and not the markup
			}).on('fileuploaded', function (event, data, id, index) {
				$scope.upload.dwg = false;
				$scope.getDwgList();
			}).on('filebatchuploaderror', function (event, data, previewId, index) {
				$scope.upload.dwg = false;
			});

			//清空已选
			$uploader.fileinput('clear');
		};

		$scope.getDwgList = function() {
			downSwitchService.queryDwgList(site.fslNumber).then(function(list) {
				$scope.dwgList = list;
			});
		};
		$scope.download = function (fileName) {
			downSwitchService.queryDwgUrl(site.fslNumber, fileName).then(function(result) {
				if (result.error) {
					console.log(error);
				} else {
					$scope.downloadUrl = "http://" + window.location.hostname + ":2015/BTSDWG/Common/" + site.fslNumber + "/" + encodeURIComponent(result.file);
				}
			});
		};

		$scope.getDwgList();

		$scope.ok = function () {
			$uibModalInstance.close($scope.site);
		};
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('cluster.point.dialog', function ($scope, $uibModalInstance, dialogTitle, site, currentClusterList,
	alarmsService) {
		$scope.dialogTitle = dialogTitle;
		$scope.currentClusterList = currentClusterList;
		angular.forEach(currentClusterList, function(stat) {
			alarmsService.queryDpiGridKpi(stat.x, stat.y).then(function(result) {
				stat.firstPacketDelay = result.firstPacketDelay;
				stat.pageOpenDelay = result.pageOpenDelay;
				stat.firstPacketDelayClass = result.firstPacketDelayClass;
				stat.pageOpenDelayClass = result.pageOpenDelayClass;
			});
		});
		$scope.ok = function () {
			$uibModalInstance.close($scope.site);
		};
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	
	.controller('college.coverage.name', function ($scope, $uibModalInstance, name, beginDate, endDate, coverageOverlays,
		baiduMapService, collegeQueryService, baiduQueryService, collegeService,
		collegeMapService, collegeDtService, coverageService, kpiDisplayService, parametersMapService) {
		$scope.dialogTitle = name + '覆盖情况评估';
		$scope.includeAllFiles = false;
		$scope.network = {
			options: ['2G', '3G', '4G'],
			selected: '2G'
		};
		$scope.dataFile = {
			options: [],
			selected: ''
		};
		$scope.data = [];
		$scope.coverageOverlays = coverageOverlays;

		$scope.query = function () {
			$scope.kpi = kpiDisplayService.queryKpiOptions($scope.network.selected);
			$scope.legend = kpiDisplayService.queryCoverageLegend($scope.kpi.selected);
			$scope.legend.title = $scope.kpi.selected;
			collegeDtService.queryRaster($scope.center, $scope.network.selected, beginDate.value, endDate.value, function (files) {
				$scope.dataFile.options = files;
				if (files.length) {
					$scope.dataFile.selected = files[0];
				}
				$scope.dtList = files;
				angular.forEach(files, function(file) {
					collegeService.queryCsvFileInfo(file.csvFileName).then(function(info) {
						angular.extend(file, info);
					});
				});
			});
		};

		$scope.$watch('network.selected', function () {
			if ($scope.center) {
			   $scope.query(); 
			}
		});

		$scope.showDtPoints = function () {
			$scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
			kpiDisplayService.generateCoveragePoints($scope.coveragePoints, $scope.data, $scope.kpi.selected);
			angular.forEach($scope.coverageOverlays, function(overlay) {
				baiduMapService.removeOverlay(overlay);
			});
			parametersMapService.showIntervalPoints($scope.coveragePoints.intervals, $scope.coverageOverlays);
		};

		var queryRasterInfo = function(index) {
			coverageService.queryByRasterInfo($scope.dataFile.options[index], $scope.network.selected).then(function(result) {
				$scope.data.push.apply($scope.data, result);
				if (index < $scope.dataFile.options.length - 1) {
					queryRasterInfo(index + 1);
				} else {
					$scope.showDtPoints();
				}
			});
		};

		$scope.showResults = function () {
			$scope.data = [];
			if ($scope.includeAllFiles) {
				queryRasterInfo(0);
			} else {
				coverageService.queryByRasterInfo($scope.dataFile.selected, $scope.network.selected).then(function (result) {
					$scope.data = result;
					$scope.showDtPoints();
				});
			}
		};

		collegeMapService.queryCenterAndCallback(name, function(center) {
			baiduQueryService.transformToBaidu(center.X, center.Y).then(function (coors) {
				$scope.center = {
					centerX: 2 * center.X - coors.x,
					centerY: 2 * center.Y - coors.y
				};
				$scope.query();
			});
		});

		$scope.ok = function () {
			$scope.showResults();
			$uibModalInstance.close($scope.legend);
		};
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})


	.factory('parametersDialogService', function(menuItemService, baiduMapService) {
		return {
			showENodebInfo: function (eNodeb, beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Parameters/Map/ENodebMapInfoBox.html',
					controller: 'map.eNodeb.dialog',
					resolve: {
						dialogTitle: function () {
							return eNodeb.name + "-" + "基站基本信息";
						},
						eNodeb: function () {
							return eNodeb;
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
			showCellInfo: function (cell, beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Rutrace/Map/NeighborMapInfoBox.html',
					controller: 'map.neighbor.dialog',
					resolve: {
						dialogTitle: function () {
							return cell.cellName + "小区信息";
						},
						neighbor: function () {
							return cell;
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
			showBtsInfo: function (bts) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Parameters/Map/BtsMapInfoBox.html',
					controller: 'map.bts.dialog',
					resolve: {
						dialogTitle: function () {
							return bts.name + "-" + "基站基本信息";
						},
						bts: function () {
							return bts;
						}
					}
				});
			},
			showCdmaCellInfo: function (cell) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Parameters/Map/CdmaCellInfoBox.html',
					controller: 'map.cdma.cell.dialog',
					resolve: {
						dialogTitle: function () {
							return cell.cellName + "小区信息";
						},
						neighbor: function () {
							return cell;
						}
					}
				});
			},
			showTownDtInfo: function (item) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: '/appViews/College/Coverage/TownMap.html',
					controller: 'town.dt.dialog',
					resolve: {
						dialogTitle: function () {
							return item.cityName + item.districtName + item.townName + "-" + "路测数据文件信息";
						},
						item: function () {
							return item;
						}
					}
				}, function (info) {
					baiduMapService.switchMainMap();
				});
			},
			showStationList: function () {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Home/StationListDialog.html',
					controller: 'map.stationList.dialog',
					resolve: {
						dialogTitle: function () {
							return "站点列表";
						}
					}
				});
			},
			showStationEdit: function (stationId) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Home/StationEdit.html',
					controller: 'map.stationEdit.dialog',
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
			showStationAdd: function () {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Home/StationAdd.html',
					controller: 'map.stationAdd.dialog',
					resolve: {
						dialogTitle: function () {
							return "站点添加";
						}
					}
				});
			},
			showConstructionInfo: function(site) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/BasicKpi/Construction.html',
					controller: 'map.construction.dialog',
					resolve: {
						dialogTitle: function () {
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
						dialogTitle: function () {
							return site.theme + "主题" + site.clusterNumber + "编号簇规划选点信息";
						},
						site: function () {
							return site;
						},
						currentClusterList: function() {
							return currentClusterList;
						}
					}
				});
			},
			showCollegeCoverage: function (name, beginDate, endDate, coverageOverlays, callback) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: '/appViews/College/Coverage/CollegeMap.html',
					controller: 'college.coverage.name',
					resolve: {
						name: function () {
							return name;
						},
						beginDate: function () {
							return beginDate;
						},
						endDate: function () {
							return endDate;
						},
						coverageOverlays: function() {
							return coverageOverlays;
						}
					}
				}, callback);
			}
		}
	})
	.factory('parametersMapService', function(baiduMapService, networkElementService, baiduQueryService, workItemDialog,
		neGeometryService, collegeQueryService, appRegionService, parametersDialogService, collegeService, alarmsService) {
		var showCellSectors = function(cells, xOffset, yOffset, beginDate, endDate, cellOverlays) {
			angular.forEach(cells, function(cell) {
				cell.longtitute += xOffset;
				cell.lattitute += yOffset;
				var cellSector = baiduMapService.generateSector(cell);
				if (cellOverlays) {
					cellOverlays.push(cellSector);
				}
				baiduMapService.addOneSectorToScope(cellSector, function(item) {
					parametersDialogService.showCellInfo(item, beginDate, endDate);
				}, cell);
			});
		};
		var showENodebsElements = function(eNodebs, beginDate, endDate, shouldShowCells, siteOverlays, cellOverlays) {
			baiduQueryService.transformToBaidu(eNodebs[0].longtitute, eNodebs[0].lattitute).then(function(coors) {
				var xOffset = coors.x - eNodebs[0].longtitute;
				var yOffset = coors.y - eNodebs[0].lattitute;
				angular.forEach(eNodebs, function(eNodeb) {
					eNodeb.longtitute += xOffset;
					eNodeb.lattitute += yOffset;
					var marker = baiduMapService.generateIconMarker(eNodeb.longtitute, eNodeb.lattitute,
						"/Content/Images/Hotmap/site_or.png");
					if (siteOverlays) {
						siteOverlays.push(marker);
					}
					baiduMapService.addOneMarkerToScope(marker, function(item) {
						parametersDialogService.showENodebInfo(item, beginDate, endDate);
					}, eNodeb);
					if (shouldShowCells) {
						networkElementService.queryCellInfosInOneENodebUse(eNodeb.eNodebId).then(function(cells) {
							showCellSectors(cells, xOffset, yOffset, beginDate, endDate, cellOverlays);
						});
					}

				});
			});
		};
		var showPhpElements = function(elements, showElementInfo) {
			baiduQueryService.transformToBaidu(elements[0].longtitute, elements[0].lattitute).then(function(coors) {
				var xOffset = coors.x - parseFloat(elements[0].longtitute);
				var yOffset = coors.y - parseFloat(elements[0].lattitute);
				angular.forEach(elements, function(element) {
					element.longtitute = xOffset + parseFloat(element.longtitute);
					element.lattitute = yOffset + parseFloat(element.lattitute);
					var marker = baiduMapService.generateIconMarker(element.longtitute, element.lattitute,
						"/Content/Images/Hotmap/site_or.png");
					baiduMapService.addOneMarkerToScope(marker, showElementInfo, element);
				});
			});
		};
		var showCdmaElements = function(btss) {
			baiduQueryService.transformToBaidu(btss[0].longtitute, btss[0].lattitute).then(function(coors) {
				var xOffset = coors.x - btss[0].longtitute;
				var yOffset = coors.y - btss[0].lattitute;
				angular.forEach(btss, function(bts) {
					bts.longtitute += xOffset;
					bts.lattitute += yOffset;
					var marker = baiduMapService.generateIconMarker(bts.longtitute, bts.lattitute,
						"/Content/Images/Hotmap/site_bl.png");
					baiduMapService.addOneMarkerToScope(marker, function(item) {
						parametersDialogService.showBtsInfo(item);
					}, bts);
					networkElementService.queryCdmaCellInfosInOneBts(bts.btsId).then(function(cells) {
						angular.forEach(cells, function(cell) {
							cell.longtitute += xOffset;
							cell.lattitute += yOffset;
							cell.btsId = bts.btsId;
							var cellSector = baiduMapService.generateSector(cell);
							baiduMapService.addOneSectorToScope(cellSector, function(item) {
								parametersDialogService.showCdmaCellInfo(item);
							}, cell);
						});
					});
				});
			});
		};
		return {
			showElementsInOneTown: function(city, district, town, beginDate, endDate, siteOverlays, cellOverlays) {
				networkElementService.queryENodebsInOneTownUse(city, district, town).then(function(eNodebs) {
					showENodebsElements(eNodebs, beginDate, endDate, true, siteOverlays, cellOverlays);
				});
			},
			showElementsInRange: function (west, east, south, north, beginDate, endDate, siteOverlays, cellOverlays) {
				networkElementService.queryInRangeENodebs(west, east, south, north).then(function (eNodebs) {
					showENodebsElements(eNodebs, beginDate, endDate, true, siteOverlays, cellOverlays);
				});
			},
			showHotSpotCellSectors: function(hotSpotName, beginDate, endDate) {
				collegeQueryService.queryHotSpotSectors(hotSpotName).then(function(sectors) {
					baiduQueryService.transformToBaidu(sectors[0].longtitute, sectors[0].lattitute).then(function(coors) {
						var xOffset = coors.x - sectors[0].longtitute;
						var yOffset = coors.y - sectors[0].lattitute;
						showCellSectors(sectors, xOffset, yOffset, beginDate, endDate);
					});
				});
			},
			showCollegeENodebs: function(name, beginDate, endDate) {
				collegeService.queryENodebs(name).then(function(eNodebs) {
					showENodebsElements(eNodebs, beginDate, endDate);
				});
			},
			showElementsWithGeneralName: function(name, beginDate, endDate) {
				networkElementService.queryENodebsByGeneralNameInUse(name).then(function(eNodebs) {
					if (eNodebs.length === 0) return;
					showENodebsElements(eNodebs, beginDate, endDate, true);
				});
			},
			showCdmaInOneTown: function(city, district, town) {
				networkElementService.queryBtssInOneTown(city, district, town).then(function(btss) {
					showCdmaElements(btss);
				});
			},
			showCdmaWithGeneralName: function(name) {
				networkElementService.queryBtssByGeneralName(name).then(function(btss) {
					if (btss.length === 0) return;
					showCdmaElements(btss);
				});
			},
			showENodebs: function(eNodebs, beginDate, endDate) {
				showENodebsElements(eNodebs, beginDate, endDate, false);
			},
			showBtssElements: function(btss) {
				return showCdmaElements(btss);
			},
			showCellSectors: function(cells, showCellInfo) {
				baiduQueryService.transformToBaidu(cells[0].longtitute, cells[0].lattitute).then(function(coors) {
					var xOffset = coors.x - cells[0].longtitute;
					var yOffset = coors.y - cells[0].lattitute;
					baiduMapService.setCellFocus(coors.x, coors.y, 16);
					angular.forEach(cells, function(cell) {
						cell.longtitute += xOffset;
						cell.lattitute += yOffset;
						var cellSector = baiduMapService.generateSector(cell);
						baiduMapService.addOneSectorToScope(cellSector, function(item) {
							showCellInfo(item);
						}, cell);
					});
				});
			},
			showPhpElements: function(elements, showElementInfo) {
				return showPhpElements(elements, showElementInfo);
			},
			showIntervalPoints: function(intervals, coverageOverlays) {
				angular.forEach(intervals, function(interval) {
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
			showIntervalGrids: function (intervals, coverageOverlays) {
				angular.forEach(intervals, function (interval) {
					var coors = interval.coors;
					var index;
					if (coors.length === 0) {
						return;
					} else
						index = parseInt(coors.length / 2);
					baiduQueryService.transformBaiduCoors(coors[index]).then(function (newCoor) {
						var xoffset = coors[index].longtitute - newCoor.longtitute;
						var yoffset = coors[index].lattitute - newCoor.lattitute;
						angular.forEach(coors, function(coor) {
							var polygon = baiduMapService.drawRectangleWithColor([
								coor.longtitute - xoffset,
								coor.lattitute - yoffset,
								coor.longtitute + 0.00049 - xoffset,
								coor.lattitute + 0.00045 - yoffset
							], interval.color);
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
					angular.forEach(filters, function(filter, $index) {
						var stats = _.filter(sites, filter);
						baiduMapService.drawMultiPoints(stats, colors[$index], -xOffset, -yOffset, function(e) {
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
					angular.forEach(boundaries, function(boundary) {
						baiduQueryService.transformToBaidu(boundary.boundaryGeoPoints[0].longtitute, boundary.boundaryGeoPoints[0].lattitute).then(function(coors) {
							var xOffset = coors.x - boundary.boundaryGeoPoints[0].longtitute;
							var yOffset = coors.y - boundary.boundaryGeoPoints[0].lattitute;
							baiduMapService.addBoundary(boundary.boundaryGeoPoints, color, xOffset, yOffset);
						});
					});
				});
			},
			displayClusterPoints: function (clusterList, overlays, threshold, baseCoor) {
				var baseX = baseCoor ? baseCoor.longtitute : clusterList[0].longtitute;
				var baseY = baseCoor ? baseCoor.lattitute : clusterList[0].lattitute;
				baiduQueryService.transformToBaidu(baseX, baseY).then(function (coors) {
					var xOffset = coors.x - baseX;
					var yOffset = coors.y - baseY;
					angular.forEach(clusterList, function (stat) {
						var centerX = stat.bestLongtitute + xOffset + 0.000245;
						var centerY = stat.bestLattitute + yOffset + 0.000225;
						if (baiduMapService.isPointInCurrentCity(centerX, centerY) && stat.gridPoints.length > threshold) {
							var marker = baiduMapService.generateIconMarker(centerX, centerY,
								"/Content/Images/BtsIcons/m_8_end.png");
							overlays.push(marker);
							baiduMapService.addOneMarkerToScope(marker, function (data) {
								alarmsService.queryClusterGridKpis(stat.gridPoints).then(function(list) {
									parametersDialogService.showClusterPointInfo(data, list);
								});
							}, stat);
						}

					});
				});
			},
			displayClusterPoint: function(stat, currentClusterList) {
				baiduQueryService.transformToBaidu(stat.bestLongtitute, stat.bestLattitute).then(function(coors) {
					var marker = baiduMapService.generateIconMarker(coors.x + 0.000245, coors.y + 0.000225, "/Content/Images/BtsIcons/m_2_end.png");
					baiduMapService.addOneMarkerToScope(marker, function (data) {
						parametersDialogService.showClusterPointInfo(data, currentClusterList);
					}, stat);
				});
			},
			clearOverlaySites: function(sites) {
				angular.forEach(sites, function (site) {
					baiduMapService.removeOverlay(site);
				});
				sites = [];
			}
		}
	});
