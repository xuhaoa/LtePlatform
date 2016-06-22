angular.module('customer.service', ['myApp.url'])
    .factory('customerDiloagService', function($uibModal, $log) {
        return {
            constructEmergencyCommunication: function(city, district, type) {
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

                modalInstance.result.then(function(info) {
                    console.log(info);
                }, function() {
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
            }
        }
    });