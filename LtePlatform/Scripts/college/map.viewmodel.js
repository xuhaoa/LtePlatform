﻿function MapViewModel(app, dataModel) {
    var self = this;

    self.beginDate = ko.observable((new Date()).getDateFromToday(-7).Format("yyyy-MM-dd"));
    self.endDate = ko.observable((new Date()).getDateFromToday(-1).Format("yyyy-MM-dd"));
    self.collegeInfos = ko.observableArray([]);

    Sammy(function () {
        this.get('#collegeMap', function () {
            $("#BeginDate").datepicker({ dateFormat: 'yy-mm-dd' });
            $("#EndDate").datepicker({ dateFormat: 'yy-mm-dd' });

            initializeMap('all-map', 11);
            $.ajax({
                method: 'get',
                url: app.dataModel.collegeQueryUrl,
                contentType: "application/json; charset=utf-8",
                headers: {
                    'Authorization': 'Bearer ' + app.dataModel.getAccessToken()
                },
                success: function (data) {
                    drawCollegeMap(self, data);
                }
            });
        });
        this.get('/College/Map', function () { this.app.runRoute('get', '#collegeMap'); });
    });

    self.refresh = function () { };

    self.toggleCollegeMarkers = function () {
        toggleDisplay(map.collegeMarkers);
    }

    return self;
}

app.addViewModel({
    name: "Map",
    bindingMemberName: "collegeMap",
    factory: MapViewModel
});