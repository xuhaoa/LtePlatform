app.controller('grid.binding', ['$scope', function ($scope) {

    $scope.page.title = 'ui-grid的绑定';
    $scope.gridOptions = {
        enableSorting: true,
        columnDefs: [
          { name: 'firstName', field: 'first-name' },
          { name: '1stFriend', field: 'friends[0]' },
          { name: 'city', field: 'address.city' },
          { name: 'getZip', field: 'getZip()', enableCellEdit: false }
        ],
        data: [{
            "first-name": "Cox",
            "friends": ["friend0"],
            "address": { street: "301 Dove Ave", city: "Laurel", zip: "39565" },
            "getZip": function () { return this.address.zip; }
        }
        ]
    };

}]);