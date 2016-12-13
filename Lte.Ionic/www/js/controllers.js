angular.module('starter.controllers', ['highcharts-ng'])

.controller('DashCtrl', function($scope, $http) {
        $scope.precise = {
            options: {
                chart: {
                    type: 'line'
                },
                legend: {
                    enabled: false
                }
            },
            title: {
                text: '图标测试'
            },
            yAxis: {
                title: null
            },
            series: []
        };

        $http.get('http://219.128.254.41:2016/api/PreciseRegion?city=佛山&statDate=2016-12-08').success(function (results) {
            var series = {
                data: []
            };
            angular.forEach(results.districtPreciseViews, function(view) {
                series.data.push([view.district, view.totalMrs]);
            });
            $scope.precise.series.push(series);
        });
    })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
