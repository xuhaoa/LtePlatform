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
    return this;
};

GeneralChart.prototype.defaultYAxis = {
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
  
GeneralChart.prototype.defaultXAxis = {
    categories: [],
    title: {
        text: 'xLabel',
        style: {
            color: Highcharts.getOptions().colors[0]
        }
    }
};

GeneralChart.prototype.setDefaultYAxis = function(settings) {
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

var SingleAxisChart = function() {
    this.options.series = this.series = [];
};
SingleAxisChart.prototype = new GeneralChart();
SingleAxisChart.prototype.xAxis = GeneralChart.prototype.defaultXAxis;
SingleAxisChart.prototype.yAxis = GeneralChart.prototype.defaultYAxis;
angular.extend(SingleAxisChart.prototype.options, GeneralChart.prototype.options, {
    xAxis: SingleAxisChart.prototype.xAxis
});
angular.extend(SingleAxisChart.prototype.options, GeneralChart.prototype.options, {
    yAxis: SingleAxisChart.prototype.yAxis
});

var BarChart = function() {

};

BarChart.prototype = new SingleAxisChart();
BarChart.prototype.chart = {
    type: 'bar'
};
BarChart.prototype.plotOptions = {
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
BarChart.prototype.credits = {
    enabled: false
};
angular.extend(BarChart.prototype.options, SingleAxisChart.prototype.options, {
    chart: BarChart.prototype.chart,
    plotOptions: BarChart.prototype.plotOptions,
    credits: BarChart.prototype.credits
});
BarChart.prototype.asignSeries = function (series) {
    series.type = 'bar';
    if (this.series.length === 0) {
        this.series.push(series);
    } else {
        this.series[0] = series;
    }
};