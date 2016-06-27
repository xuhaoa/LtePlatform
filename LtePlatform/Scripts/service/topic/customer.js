angular.module('customer.service', ['myApp.url'])
    .factory('customerDialogService', function ($uibModal, $log, customerQueryService) {
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
                    customerQueryService.postDto(dto).then(function (result) {
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
            supplementVipDemandInfo: function(view, city, district) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Customer/Dialog/VipSupplement.html',
                    controller: 'vip.supplement.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return "补充政企客户支撑需求信息";
                        },
                        view: function() {
                            return view;
                        },
                        city: function () {
                            return city;
                        },
                        district: function () {
                            return district;
                        }
                    }
                });

                modalInstance.result.then(function (dto) {
                    customerQueryService.updateVip(dto).then(function () {
                        messages.push({
                            type: 'success',
                            contents: '完成政企客户支撑需求：' + dto.serialNumber + '的补充'
                        });
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
            queryAllVip: function (begin, end) {
                return generalHttpService.getApiData("VipDemand", {
                    begin: begin,
                    end: end
                });
            },
            updateVip: function(dto) {
                return generalHttpService.putApiData("VipDemand", dto)
            }
        }
    });