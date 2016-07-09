app.controller('cell.class', ['$scope', '$http', function ($scope, $http) {
    $scope.page.title = '单元格格式';
  $scope.gridOptions = {
    enableSorting: true,
    columnDefs: [
      { field: 'name', cellClass:'red' },
      { field: 'company',
        cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
          if (grid.getCellValue(row,col) === 'Velity') {
            return 'blue';
          }
        }
      }
    ]
  };
 
  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
}]);