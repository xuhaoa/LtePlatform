﻿function IndexViewModel(app, dataModel) {
    var self = this;

    app.currentCity = ko.observable();
    app.cities = ko.observableArray([]);
    app.statDate = ko.observable((new Date()).getDateFromToday(-1).Format("yyyy-MM-dd"));
    app.view = ko.observable('主要');
    app.viewOptions = ko.observableArray(['主要', '2G', '3G']);
    app.kpiDateList = ko.observableArray([]);
    app.beginDate = ko.observable((new Date()).getDateFromToday(-7).Format("yyyy-MM-dd"));
    app.endDate = ko.observable((new Date()).getDateFromToday(-1).Format("yyyy-MM-dd"));
    app.kpiSelection = ko.observable('掉话率');
    app.kpiOptions = ko.observableArray([]);

    app.initialize = function () {
        $("#StatDate").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#BeginDate").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#EndDate").datepicker({ dateFormat: 'yy-mm-dd' });

        initializeCityKpi();
        $.ajax({
            method: 'get',
            url: app.dataModel.kpiDataListUrl,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                app.kpiOptions(data);
            }
        });
    };

    app.showKpi = function () {
        $.ajax({
            method: 'get',
            url: app.dataModel.kpiDataListUrl,
            contentType: "application/json; charset=utf-8",
            data: {
                city: app.currentCity(),
                statDate: app.statDate()
            },
            success: function (data) {
                app.statDate(data.statDate);
                app.kpiDateList(data.statViews);
            }
        });
    };

    app.showTrend = function () {
        $.ajax({
            method: 'get',
            url: app.dataModel.kpiDataListUrl,
            contentType: "application/json; charset=utf-8",
            data: {
                city: app.currentCity(),
                beginDate: app.beginDate(),
                endDate: app.endDate()
            },
            success: function (data) {
                $(".kpi-trend").each(function () {
                    var chart = new comboChart();
                    chart.title.text = $(this).attr('name');
                    var kpiOption = lowerFirstLetter(chart.title.text);
                    chart.xAxis[0].categories = data.statDates;
                    chart.yAxis[0].title.text = chart.title.text;
                    chart.xAxis[0].title.text = '日期';
                    for (var i = 0; i < data.regionList.length - 1; i++) {
                        chart.series.push({
                            type: 'column',
                            name: data.regionList[i],
                            data: data.kpiDetails[kpiOption][i]
                        });
                    }
                    chart.series.push({
                        type: 'spline',
                        name: app.currentCity(),
                        data: data.kpiDetails[kpiOption][data.regionList.length - 1],
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: 'white'
                        }
                    });
                    $(this).highcharts(chart.options);
                });
            }
        });        
    };

    return self;
}

app.addViewModel({
    name: "Index",
    bindingMemberName: "index",
    factory: IndexViewModel
});