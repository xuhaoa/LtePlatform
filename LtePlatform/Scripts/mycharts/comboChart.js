function GeneralChart() {
    this.title = {
        text: ''
    };
    this.series = [];

    this.legend = {
        layout: 'vertical',
        align: 'left',
        x: 100,
        verticalAlign: 'top',
        y: 30,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        enabled: true
    };
    this.tooltip = {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<b>{point.y:.2f}</b>'
    };
    this.options = {
        title: this.title,
        tooltip: this.tooltip,
        legend: this.legend,
        series: this.series
    };
    this.putSeries = function(series, type) {
        series.type = type;
        if (this.series.length === 0) {
            this.series.push(series);
        } else {
            this.series[0] = series;
        }
        this.options.series = this.series;
    };
    this.defaultYAxis = {
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        title: {
            text: 'YLabel',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        }
    };
    this.defaultXAxis = {
        categories: [],
        title: {
            text: 'xLabel',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        }
    };
    this.setDefaultYAxis = function(settings) {
        if (settings.title) {
            this.defaultYAxis.title.text = settings.title;
        }
        if (settings.min) {
            this.defaultYAxis.min = settings.min;
        }
        if (settings.max) {
            this.defaultYAxis.max = settings.max;
        }
    };
    this.setDefaultXAxis = function(settings) {
        if (settings.title) {
            this.defaultXAxis.title.text = settings.title;
        }
        if (settings.categories) {
            this.defaultXAxis.categories = settings.categories;
        }
    };
    this.addSeries = function(series, type) {
        series.type = type;
        this.series.push(series);
        this.options.series = this.series;
    };
    return this;
};
 
function ComboChart() {
    this.options.series = this.series = [];
    this.options.xAxis = this.xAxis = [this.defaultXAxis];
    this.options.yAxis = this.yAxis = [this.defaultYAxis];
}

ComboChart.prototype = new GeneralChart();
ComboChart.prototype.chart = {
    zoomType: 'xy'
};
angular.extend(ComboChart.prototype.options, GeneralChart.prototype.options, {
    chart: ComboChart.prototype.chart
});
angular.extend(ComboChart.prototype.options, GeneralChart.prototype.options, {
    xAxis: []
});
angular.extend(ComboChart.prototype.options, GeneralChart.prototype.options, {
    yAxis: []
});
ComboChart.prototype.pushOneYAxis = function (yLabel) {
    var length = this.yAxis.length;
    this.yAxis.push({
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[length]
            }
        },
        title: {
            text: yLabel,
            style: {
                color: Highcharts.getOptions().colors[length]
            }
        }
    });
};
ComboChart.prototype.initialize=function(settings) {
    chart.title.text = settings.title;

    chart.yAxis[0].title.text = settings.yTitle;
    chart.xAxis[0].title.text = settings.xTitle;
}

var SingleAxisChart = function () {
    GeneralChart.call(this);
    this.options.series = this.series = [];
    this.options.xAxis = this.xAxis = this.defaultXAxis;
    this.options.yAxis = this.yAxis = this.defaultYAxis;
};

var GradientPie = function () {
    GeneralChart.call(this);
    this.tooltip = {
        pointFormat: '{series.name}: <b>{point.y: .1f}, 占比{point.percentage:.1f}%</b>'
    };
    this.putSeries({
        name: 'Brands',
        data: []
    });
    this.options.chart = this.chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    };
    this.options.plotOptions = this.plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                },
                connectorColor: 'silver'
            }
        }
    };
};

function BarChart() {
    SingleAxisChart.call(this);
    this.options.chart = this.chart = {
        type: 'bar'
    };
    this.options.plotOptions = this.plotOptions = {
        bar: {
            dataLabels: {
                enabled: true,
                align: "center",
                color: 'red',
                formatter: function() {
                    return parseInt(this.y * 100) / 100;
                }
            }
        }
    };
    this.options.credits = this.credits = {
        enabled: false
    };
    this.asignSeries = function(series) {
        this.putSeries(series, 'bar');
    };
};

var TimeSeriesLine = function () {
    this.xAxis.type = 'datetime';
};

TimeSeriesLine.prototype = new SingleAxisChart();
TimeSeriesLine.prototype.plotOptions = {
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
};
angular.extend(TimeSeriesLine.prototype.options, SingleAxisChart.prototype.options, {
    plotOptions: TimeSeriesLine.prototype.plotOptions
});
TimeSeriesLine.prototype.insertSeries = function(series) {
    this.addSeries(series, 'area');
};