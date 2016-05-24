
app.controller('neighbors.dialog', function ($scope, $uibModalInstance, geometryService,
    dialogTitle, candidateNeighbors, currentCell) {
    $scope.pciNeighbors = [];
    $scope.indoorConsidered = false;
    $scope.distanceOrder = "distance";
    $scope.dialogTitle = dialogTitle;
    $scope.candidateNeighbors = candidateNeighbors;
    $scope.currentCell = currentCell;

    var minDistance = 10000;
    for (var i = 0; i < $scope.candidateNeighbors.length; i++) {
        var neighbor = $scope.candidateNeighbors[i];
        neighbor.distance = geometryService.getDistance($scope.currentCell.lattitute, $scope.currentCell.longtitute,
            neighbor.lattitute, neighbor.longtitute);
        if (neighbor.distance < minDistance && (neighbor.indoor === '室外' || $scope.indoorConsidered)) {
            minDistance = neighbor.distance;
            $scope.nearestCell = neighbor;
        }
        $scope.pciNeighbors.push(neighbor);
    }

    $scope.ok = function() {
        $uibModalInstance.close($scope.nearestCell);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});