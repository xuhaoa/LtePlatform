angular.module('customer.service', ['myApp.url'])
    .factory('customerDialogService', function ($uibModal, $log, customerQueryService, emergencyService, complainService) {
        return {
            constructEmergencyCommunication: function(city, district, type, messages, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Customer/Dialog/Emergency.html',
                    controller: 'emergency.new.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function() {
                            return "新增应急通信需求";
                        },
                        city: function() {
                            return city;
                        },
                        district: function() {
                            return district;
                        },
                        vehicularType: function() {
                            return type;
                        }
                    }
                });

                modalInstance.result.then(function(dto) {
                    customerQueryService.postDto(dto).then(function(result) {
                        if (result > 0) {
                            messages.push({
                                type: 'success',
                                contents: '完成应急通信需求：' + dto.projectName + '的导入'
                            });
                            callback();
                        } else {
                            messages.push({
                                type: 'warning',
                                contents: '最近已经有该需求，请不要重复导入'
                            });
                        }
                    });
                }, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            supplementVipDemandInfo: function(view, city, district, messages, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Customer/Dialog/VipSupplement.html',
                    controller: 'vip.supplement.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function() {
                            return "补充政企客户支撑需求信息";
                        },
                        view: function() {
                            return view;
                        },
                        city: function() {
                            return city;
                        },
                        district: function() {
                            return district;
                        }
                    }
                });

                modalInstance.result.then(function(dto) {
                    customerQueryService.updateVip(dto).then(function() {
                        messages.push({
                            type: 'success',
                            contents: '完成政企客户支撑需求：' + dto.serialNumber + '的补充'
                        });
                        callback();
                    });
                }, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            constructFiberItem: function(id, num, callback, messages) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Customer/Dialog/Fiber.html',
                    controller: 'fiber.new.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function() {
                            return "新增光纤工单信息";
                        },
                        id: function() {
                            return id;
                        },
                        num: function() {
                            return num;
                        }
                    }
                });

                modalInstance.result.then(function(item) {
                    emergencyService.createFiberItem(item).then(function(result) {
                        if (result) {
                            messages.push({
                                type: 'success',
                                contents: '完成光纤工单：' + item.workItemNumber + '的导入'
                            });
                            callback(result);
                        } else {
                            messages.push({
                                type: 'warning',
                                contents: '最近已经有该工单，请不要重复导入'
                            });
                        }
                    });
                }, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            supplementComplainInfo: function(item, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Customer/Dialog/Complain.html',
                    controller: 'complain.supplement.dialog',
                    size: 'lg',
                    resolve: {
                        item: function () {
                            return item;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                    complainService.postPosition(info).then(function() {
                        callback();
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        };
    })
    .factory('customerQueryService', function(generalHttpService) {
        return {
            queryVehicleTypeOptions: function() {
                return generalHttpService.getApiData('KpiOptions', {
                    key: "VehicleType"
                });
            },
            queryDemandLevelOptions: function() {
                return generalHttpService.getApiData('KpiOptions', {
                    key: "DemandLevel"
                });
            },
            queryNetworkTypeOptions: function() {
                return generalHttpService.getApiData('KpiOptions', {
                    key: 'NetworkType'
                });
            },
            queryMarketThemeOptions: function() {
                return generalHttpService.getApiData('KpiOptions', {
                    key: 'MarketTheme'
                });
            },
            queryTransmitFunctionOptions: function() {
                return ['光纤', '微波', '卫星'];
            },
            queryElectricSupplyOptions: function() {
                return ['市电', '市电供电', '远供', '油机'];
            },
            postDto: function(dto) {
                return generalHttpService.postApiData("EmergencyCommunication", dto);
            },
            queryAll: function(begin, end) {
                return generalHttpService.getApiData("EmergencyCommunication", {
                    begin: begin,
                    end: end
                });
            },
            queryAllVip: function(begin, end) {
                return generalHttpService.getApiData("VipDemand", {
                    begin: begin,
                    end: end
                });
            },
            queryOneVip: function(serialNumber) {
                return generalHttpService.getApiData("VipDemand", {
                    serialNumber: serialNumber
                });
            },
            queryOneComplain: function (serialNumber) {
                return generalHttpService.getApiData("ComplainQuery", {
                    serialNumber: serialNumber
                });
            },
            updateVip: function(dto) {
                return generalHttpService.putApiData("VipDemand", dto);
            },
            queryOneEmergency: function(id) {
                return generalHttpService.getApiData('EmergencyCommunication/' + id, {});
            }
        };
    })
    .factory('emergencyService', function(generalHttpService) {
        return {
            queryProcessList: function(id) {
                return generalHttpService.getApiData('EmergencyProcess/' + id, {});
            },
            createProcess: function(dto) {
                return generalHttpService.postApiDataWithHeading('EmergencyProcess', dto);
            },
            createVipProcess: function(dto) {
                return generalHttpService.postApiDataWithHeading('VipProcess', dto);
            },
            updateProcess: function(process) {
                return generalHttpService.putApiData('EmergencyProcess', process);
            },
            updateVipProcess: function (process) {
                return generalHttpService.putApiData('VipProcess', process);
            },
            createFiberItem: function(item) {
                return generalHttpService.postApiData('EmergencyFiber', item);
            },
            finishFiberItem: function(item) {
                return generalHttpService.putApiData('EmergencyFiber', item);
            },
            queryFiberList: function(id) {
                return generalHttpService.getApiData('EmergencyFiber/' + id, {});
            },
            queryVipDemands: function(today) {
                return generalHttpService.getApiData('VipDemand', {
                    today: today
                });
            },
            queryCollegeVipDemands: function (year) {
                return generalHttpService.getApiData('CollegeVipDemand', {
                    year: year
                });
            },
            queryCollegeVipDemand: function (year, collegeName) {
                return generalHttpService.getApiData('CollegeVipDemand', {
                    collegeName: collegeName,
                    year: year
                });
            },
            queryVipProcessList: function(number) {
                return generalHttpService.getApiData('VipProcess', {
                    serialNumber: number
                });
            },
            constructCollegeVipDemand: function(stat) {
                return generalHttpService.postApiDataWithHeading('CollegeVipDemand', stat);
            }
        };
    })
    .factory('complainService', function(generalHttpService) {
        return {
            queryPositionList: function(begin, end) {
                return generalHttpService.getApiData('ComplainPosition', {
                    begin: begin,
                    end: end
                });
            },
            postPosition: function(dto) {
                return generalHttpService.postApiData('ComplainPosition', dto);
            },
            queryCurrentComplains: function(today) {
                return generalHttpService.getApiData('ComplainQuery', {
                    today: today
                });
            },
            queryMonthTrend: function(date) {
                return generalHttpService.getApiData('ComplainQuery', {
                    date: date
                });
            },
            queryBranchDemands: function(today) {
                return generalHttpService.getApiData('BranchDemand', {
                    today: today
                });
            },
            queryOnlineSustains: function(today) {
                return generalHttpService.getApiData('OnlineSustain', {
                    today: today
                });
            },
            queryAll: function (begin, end) {
                return generalHttpService.getApiData("ComplainQuery", {
                    begin: begin,
                    end: end
                });
            },
            queryBranchList: function(begin, end) {
                return generalHttpService.getApiData("BranchDemand", {
                    begin: begin,
                    end: end
                });
            },
            queryOnlineList: function (begin, end) {
                return generalHttpService.getApiData("OnlineSustain", {
                    begin: begin,
                    end: end
                });
            },
            queryComplainProcessList: function (number) {
                return generalHttpService.getApiData('ComplainProcess', {
                    serialNumber: number
                });
            },
            createComplainProcess: function (dto) {
                return generalHttpService.postApiDataWithHeading('ComplainProcess', dto);
            },
            updateComplainProcess: function (process) {
                return generalHttpService.putApiData('ComplainProcess', process);
            },
            updateComplain: function (dto) {
                return generalHttpService.putApiData("ComplainQuery", dto);
            },
            queryComplainMonthStats: function(date) {
                return generalHttpService.getApiData("ComplainQuery", {
                    countDate: date
                });
            }
        }
    });