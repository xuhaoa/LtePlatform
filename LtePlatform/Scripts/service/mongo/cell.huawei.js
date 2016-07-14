angular.module('huawei.mongo.parameters', ['myApp.url'])
    .factory('cellHuaweiMongoService', function (generalHttpService) {
        return {
            queryCellParameters: function (eNodebId, sectorId) {
                return generalHttpService.getApiData('CellHuaweiMongo', {
                    eNodebId: eNodebId,
                    sectorId: sectorId
                });
            },
            queryLocalCellDef: function (eNodebId) {
                return generalHttpService.getApiData('CellHuaweiMongo', {
                    eNodebId: eNodebId
                });
            }
        };
    })
     .factory('cellPowerService', function (generalHttpService) {
         return {
             queryCellParameters: function (eNodebId, sectorId) {
                 return generalHttpService.getApiData('CellPower', {
                     eNodebId: eNodebId,
                     sectorId: sectorId
                 });
             },
             queryUlOpenLoopPowerControll: function(eNodebId, sectorId) {
                 return generalHttpService.getApiData('UplinkOpenLoopPowerControl', {
                     eNodebId: eNodebId,
                     sectorId: sectorId
                 });
             }
         };
     });