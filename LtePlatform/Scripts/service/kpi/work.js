angular.module('kpi.work', ['app.menu', 'myApp.region'])
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
			showHotSpotCellFlow: function(hotSpot, beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Parameters/Region/ENodebFlow.html',
					controller: 'hotSpot.cell.flow',
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
            showRrcChart: function (overallStat) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/FourChartDialog.html',
                    controller: 'rrc.chart',
                    resolve: {
                        dateString: function () {
                            return overallStat.dateString;
                        },
                        districtStats: function () {
                            return overallStat.districtStats;
                        },
                        townStats: function () {
                            return overallStat.townStats;
                        }
                    }
                });
            },
            showCqiChart: function (overallStat) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'cqi.chart',
                    resolve: {
                        dateString: function () {
                            return overallStat.dateString;
                        },
                        districtStats: function () {
                            return overallStat.districtStats;
                        },
                        townStats: function () {
                            return overallStat.townStats;
                        }
                    }
                });
            },
            showDownSwitchChart: function (overallStat) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'down.switch.chart',
                    resolve: {
                        dateString: function () {
                            return overallStat.dateString;
                        },
                        districtStats: function () {
                            return overallStat.districtStats;
                        },
                        townStats: function () {
                            return overallStat.townStats;
                        }
                    }
                });
            },
			showPreciseTrend: function(city, beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Rutrace/Coverage/Trend.html',
					controller: 'rutrace.trend.dialog',
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
            showRrcTrend: function (city, beginDate, endDate) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/WorkItem/RrcTrend.html',
                    controller: 'rrc.trend.dialog',
                    resolve: {
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
            showCqiTrend: function (city, beginDate, endDate) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/WorkItem/RrcTrend.html',
                    controller: 'cqi.trend.dialog',
                    resolve: {
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
            showDownSwitchTrend: function (city, beginDate, endDate) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/WorkItem/RrcTrend.html',
                    controller: 'down.switch.trend.dialog',
                    resolve: {
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
			},
			showTodayKpi: function(city) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Rutrace/Index.html',
					controller: 'rutrace.index',
					resolve: {
						dialogTitle: function () {
							return "今日指标";
						},
						city: function() {
							return city;
						}
					}
				});
			},
			showPreciseCellTrend: function (name, cellId, sectorId) {
				menuItemService.showGeneralDialog({
				    templateUrl: '/appViews/Rutrace/WorkItem/CellTrend.html',
				    controller: 'cell.trend',
					resolve: {
						name: function () {
							return name;
						},
						cellId: function () {
							return cellId;
						},
						sectorId: function() {
							return sectorId;
						}
					}
				});
			}
		};
	});
