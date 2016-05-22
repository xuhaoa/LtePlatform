function TimeSeriesLine() {
    var self = {};
    self.chart = {
        zoomType: 'x'
    };
    self.title = {
        text: 'USD to EUR exchange rate over time'
    };
    self.yAxis = {
        title: {
            text: 'Exchange rate'
        }
    };
    self.series = [];
    self.options = {
        chart: self.chart,
        title: self.title,
        xAxis: {
            type: 'datetime'
        },
        yAxis: self.yAxis,
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: self.series
    };
    return self;
}