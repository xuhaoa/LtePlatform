﻿app.controller('map.neighbor.dialog', function ($scope, $uibModalInstance, intraFreqHoService, neighbor, dialogTitle) {
    $scope.neighbor = neighbor;
    $scope.dialogTitle = dialogTitle;
    $scope.parameter = {
        options: ['基本参数', '同频切换', 'A1异频切换', 
        'A2异频切换', 'A3异频切换', 'A4异频切换', 'A5异频切换'],
        selected: '基本参数'
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.neighbor);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    var eNodebId = $scope.neighbor.otherInfos.split(': ')[5];
    var sectorId = $scope.neighbor.cellName.split('-')[1];
    intraFreqHoService.queryCellParameters(eNodebId, sectorId).then(function (result) {
        $scope.intraFreqHo = result;
    });
});