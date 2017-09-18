angular.module('topic.dialog',[ 'app.menu' ])
    .factory('mapDialogService',
        function(menuItemService) {
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
                showFixingStationInfo: function(station) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Evaluation/Dialog/SpecialStationDetails.html',
                        controller: 'map.fixingStation.dialog',
                        resolve: {
                            dialogTitle: function() {
                                return "整治信息:" + station.name;
                            },
                            station: function() {
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
                showResourceInfo: function(station) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Import/ResoureDetails.html',
                        controller: 'map.resource.dialog',
                        resolve: {
                            dialogTitle: function() {
                                return "资源资产:" + station.name;
                            },
                            station: function() {
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
                            dialogTitle: function() {
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
                            dialogTitle: function() {
                                return "RRC连接成功率变化趋势";
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
                showCqiTrend: function (city, beginDate, endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Rutrace/Trend.html',
                        controller: 'cqi.trend',
                        resolve: {
                            dialogTitle: function () {
                                return "CQI优良比变化趋势";
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
                showPreciseWorkItem: function(endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Rutrace/WorkItem/ForCity.html',
                        controller: 'workitem.city',
                        resolve: {
                            endDate: function() {
                                return endDate;
                            }
                        }
                    });
                },
                showPreciseWorkItemDistrict: function(district, endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Rutrace/WorkItem/ForCity.html',
                        controller: 'workitem.district',
                        resolve: {
                            district: function() {
                                return district;
                            },
                            endDate: function() {
                                return endDate;
                            }
                        }
                    });
                },
                showPreciseTop: function(beginDate, endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Rutrace/Top.html',
                        controller: 'rutrace.top',
                        resolve: {
                            dialogTitle: function() {
                                return "全市精确覆盖率TOP统计";
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
                showPreciseTopDistrict: function(beginDate, endDate, district) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Rutrace/Top.html',
                        controller: 'rutrace.top.district',
                        resolve: {
                            beginDate: function() {
                                return beginDate;
                            },
                            endDate: function() {
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
                            item: function() {
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
                            beginDate: function() {
                                return beginDate;
                            },
                            endDate: function() {
                                return endDate;
                            }
                        }
                    });
                },
                showCollegeFlowTrend: function(beginDate, endDate, name) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/College/Test/CollegeFlow.html',
                        controller: 'college.flow.name',
                        resolve: {
                            beginDate: function() {
                                return beginDate;
                            },
                            endDate: function() {
                                return endDate;
                            },
                            name: function() {
                                return name;
                            }
                        }
                    });
                },
                showHotSpotFlowTrend: function (beginDate, endDate, name) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/College/Test/CollegeFlow.html',
                        controller: 'hotSpot.flow.name',
                        resolve: {
                            beginDate: function () {
                                return beginDate;
                            },
                            endDate: function () {
                                return endDate;
                            },
                            name: function () {
                                return name;
                            }
                        }
                    });
                },
                showCollegeFeelingTrend: function (beginDate, endDate, name) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/College/Test/CollegeFlow.html',
                        controller: 'college.feeling.name',
                        resolve: {
                            beginDate: function () {
                                return beginDate;
                            },
                            endDate: function () {
                                return endDate;
                            },
                            name: function () {
                                return name;
                            }
                        }
                    });
                },
                showHotSpotFeelingTrend: function (beginDate, endDate, name) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/College/Test/CollegeFlow.html',
                        controller: 'hotSpot.feeling.name',
                        resolve: {
                            beginDate: function () {
                                return beginDate;
                            },
                            endDate: function () {
                                return endDate;
                            },
                            name: function () {
                                return name;
                            }
                        }
                    });
                }
            };
        });