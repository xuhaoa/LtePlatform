app.controller("customer.index", function ($scope, baiduMapService) {
    baiduMapService.initializeMap("map", 11);
    baiduMapService.addCityBoundary("佛山");
});
