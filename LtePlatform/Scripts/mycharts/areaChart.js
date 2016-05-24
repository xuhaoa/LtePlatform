function AreaChart() {
    var self = {};
    self.title = {
        text: 'USD to EUR exchange rate over time'
    };
    self.xAxis = {
        categories: [],
        title: {
            text: ''
        }
    };
    self.yAxis = {
        title: {
            text: 'Exchange rate'
        }
    };
    self.series = [];
    self.options = {
        chart: {
            type: 'area'
        },
        title: self.title,
        xAxis: self.xAxis,
        yAxis: self.yAxis,
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
        },
        credits: {
            enabled: false
        },
        series: self.series
    };
    return self;
}