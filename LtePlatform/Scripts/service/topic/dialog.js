﻿angular.module('topic.dialog',[ 'app.menu', 'app.core' ])
    .factory('mapDialogService',
        function (menuItemService, stationFormatService) {
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
                arrangeTownENodebInfo: function (city, district, town) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Parameters/Region/ArrangeInfo.html',
                        controller: 'arrange.eNodeb.dialog',
                        resolve: {
                            dialogTitle: function () {
                                return city + district + town + "-" + "LTE基站镇区调整";
                            },
                            city: function () {
                                return city;
                            },
                            district: function () {
                                return district;
                            },
                            town: function () {
                                return town;
                            }
                        }
                    });
                },
                arrangeTownBtsInfo: function (city, district, town) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Parameters/Region/ArrangeInfo.html',
                        controller: 'arrange.bts.dialog',
                        resolve: {
                            dialogTitle: function () {
                                return city + district + town + "-" + "CDMA基站镇区调整";
                            },
                            city: function () {
                                return city;
                            },
                            district: function () {
                                return district;
                            },
                            town: function () {
                                return town;
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
                        resolve: stationFormatService.dateSpanDateResolve({
                                dialogTitle: function() {
                                    return "告警信息:" + station.name;
                                },
                                station: function() {
                                    return station;
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                showAlarmHistoryList: function(alarmStation) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Evaluation/Dialog/AlarmHistoryListDialog.html',
                        controller: 'map.alarmHistoryList.dialog',
                        resolve: {
                            dialogTitle: function() {
                                return "告警历史：" + alarmStation.name;
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
                showResourceStationInfo: function (station) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews//Evaluation/Dialog/ResoureDetails.html',
                        controller: 'map.resourceStation.dialog',
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
                showBasicKpiDialog: function (city, beginDate, endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/BasicKpi/Index.html',
                        controller: 'kpi.basic',
                        resolve: stationFormatService.dateSpanDateResolve({
                                dialogTitle: function() {
                                    return city.selected + "CDMA整体分析";
                                },
                                city: function() {
                                    return city;
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                showTopDrop2GDialog: function(city, beginDate, endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/BasicKpi/TopDrop2G.html',
                        controller: 'kpi.topDrop2G',
                        resolve: stationFormatService.dateSpanDateResolve({
                                dialogTitle: function() {
                                    return city.selected + "TOP掉话分析";
                                },
                                city: function() {
                                    return city;
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                showPreciseTrendDialog: function(city, beginDate, endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Rutrace/Trend.html',
                        controller: 'rutrace.trend',
                        resolve: stationFormatService.dateSpanDateResolve({
                                dialogTitle: function() {
                                    return "精确覆盖率变化趋势";
                                },
                                city: function() {
                                    return city;
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                showRrcTrend: function(city, beginDate, endDate) {
                    menuItemService.showGeneralDialog({
                            templateUrl: '/appViews/Rutrace/Trend.html',
                            controller: 'rrc.trend',
                            resolve: stationFormatService.dateSpanDateResolve({
                                    dialogTitle: {
                                        function() {
                                            return "RRC连接成功率变化趋势";
                                        },
                                        city: function() {
                                            return city;
                                        }
                                    }
                                },
                                beginDate,
                                endDate)
                    });
                },
                showCityCqiTrend: function (city, beginDate, endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Rutrace/Trend.html',
                        controller: 'cqi.trend',
                        resolve: stationFormatService.dateSpanDateResolve({
                                dialogTitle: function() {
                                    return "CQI优良比变化趋势";
                                },
                                city: function() {
                                    return city;
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                showDownSwitchTrendDialog: function (city, beginDate, endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Rutrace/Trend.html',
                        controller: 'down.switch.trend',
                        resolve: stationFormatService.dateSpanDateResolve({
                                dialogTitle: function() {
                                    return "4G下切3G变化趋势";
                                },
                                city: function() {
                                    return city;
                                }
                            },
                            beginDate,
                            endDate)
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
                        resolve: stationFormatService.dateSpanDateResolve({
                                dialogTitle: function() {
                                    return "全市精确覆盖率TOP统计";
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                showDownSwitchTop: function (beginDate, endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Rutrace/Top.html',
                        controller: 'down.switch.top',
                        resolve: stationFormatService.dateSpanDateResolve({
                                dialogTitle: function() {
                                    return "全市4G下切3GTOP统计";
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                showCqiTop: function (beginDate, endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Rutrace/Top.html',
                        controller: 'cqi.top',
                        resolve: stationFormatService.dateSpanDateResolve({
                            dialogTitle: function () {
                                return "全市CQI优良比TOP统计";
                            }
                        },
                            beginDate,
                            endDate)
                    });
                },
                showPreciseTopDistrict: function(beginDate, endDate, district) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Rutrace/Top.html',
                        controller: 'rutrace.top.district',
                        resolve: stationFormatService.dateSpanDateResolve({
                                district: function() {
                                    return district;
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                showDownSwitchTopDistrict: function (beginDate, endDate, district) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Rutrace/Top.html',
                        controller: 'down.switch.top.district',
                        resolve: stationFormatService.dateSpanDateResolve({
                                district: function() {
                                    return district;
                                }
                            },
                            beginDate,
                            endDate)
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
                showRecentComplainItems: function (city, beginDate, endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/Customer/Dialog/Recent.html',
                        controller: 'customer.recent',
                        resolve: stationFormatService.dateSpanDateResolve({
                                city: function() {
                                    return city;
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                adjustComplainItems: function () {
                    menuItemService.showGeneralDialog({
                        templateUrl: "/appViews/Customer/Complain/Adjust.html",
                        controller: 'complain.adjust',
                        resolve: {}
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
                        resolve: stationFormatService.dateSpanDateResolve({}, beginDate, endDate)
                    });
                },
                showCollegeFlowTrend: function(beginDate, endDate, name) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/College/Test/CollegeFlow.html',
                        controller: 'college.flow.name',
                        resolve: stationFormatService.dateSpanDateResolve({
                                name: function() {
                                    return name;
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                showHotSpotFlowTrend: function (beginDate, endDate, name) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/College/Test/CollegeFlow.html',
                        controller: 'hotSpot.flow.name',
                        resolve: stationFormatService.dateSpanDateResolve({
                                name: function() {
                                    return name;
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                showCollegeFeelingTrend: function (beginDate, endDate, name) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/College/Test/CollegeFlow.html',
                        controller: 'college.feeling.name',
                        resolve: stationFormatService.dateSpanDateResolve({
                                name: function() {
                                    return name;
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                showHotSpotFeelingTrend: function (beginDate, endDate, name) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/College/Test/CollegeFlow.html',
                        controller: 'hotSpot.feeling.name',
                        resolve: stationFormatService.dateSpanDateResolve({
                                name: function() {
                                    return name;
                                }
                            },
                            beginDate,
                            endDate)
                    });
                },
                showCollegeFlowDumpDialog: function(beginDate, endDate) {
                    menuItemService.showGeneralDialog({
                        templateUrl: '/appViews/College/Table/DumpCollegeFlowTable.html',
                        controller: 'college.flow.dump',
                        resolve: stationFormatService.dateSpanDateResolve({},
                            beginDate,
                            endDate)
                    });
                }
            };
        });