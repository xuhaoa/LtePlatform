var GeneralChart = {
    title: {
        text: ''
    },
    yAxis: [{ 
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
    }],
    xAxis: [{
        categories: [],
        title: {
            text: 'xLabel',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        }
    }],
    series: [],

    legend: {
        layout: 'vertical',
        align: 'left',
        x: 100,
        verticalAlign: 'top',
        y: 30,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<b>{point.y:.2f}</b>'
    },
    chart: {
        
    },
    plotOptions: {
        
    }
};

Object.defineProperty(GeneralChart, "options", {
    get: function() {
        return {
            chart: this.chart,
            title: this.title,
            xAxis: this.xAxis,
            yAxis: this.yAxis,
            tooltip: this.tooltip,
            legend: this.legend,
            series: this.series,
            plotOptions: this.plotOptions
        };
    }
});

var ComboChart = function() {
    angular.extend(GeneralChart.chart, GeneralChart.chart, {
        zoomType: 'xy'
    });
};

ComboChart.prototype = GeneralChart;

var BarChart = function() {
};

BarChart.prototype = new GeneralChart;
BarChart.prototype.options.chart.type = 'bar';

angular.extend(BarChart.prototype.options, GeneralChart.prototype.options, {
    plotOptions: {
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
    },
    credits: {
        enabled: false
    }
})