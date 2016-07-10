app.controller('grid.template', ['$scope', '$log', '$http', function ($scope, $log, $http) {

    $scope.page.title = 'ui-grid模板';
    $scope.someProp = 'abc',
    $scope.showMe = function (val) {
        alert(val);
    };

    $scope.gridOptions = {};

    //you can override the default assignment if you wish
    //$scope.gridOptions.appScopeProvider = someOtherReference;

    $scope.gridOptions.columnDefs = [
          { field: 'name', name: '姓名' },
          { name: 'gender' },
          {
              name: 'ShowScope',
              cellTemplate: '<button class="btn primary" ng-click="grid.appScope.showMe(row.entity.gender)">Click Me</button>'
          },
        {
            name: 'ShowGender',
            cellTemplate: '<a href="">{{row.entity.gender}}</a>'
        }
    ];
    /*
    $scope.gridOptions.data = [
       {
           "firstName": "Cox",
           "lastName": "Carney",
           "company": "Enormo",
           "employed": true
       },
       {
           "firstName": "Lorraine",
           "lastName": "Wise",
           "company": "Comveyer",
           "employed": false
       },
       {
           "firstName": "Nancy",
           "lastName": "Waters",
           "company": "Fuelton",
           "employed": false
       }
   ];
   */

    $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
      .success(function (data) {
          $scope.gridOptions.data = data;
      });

}]);