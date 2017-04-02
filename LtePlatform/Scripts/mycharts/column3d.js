function Column3d() {
    var self = {};
    self.title = {
        text: '3D chart with null values'
    };
    self.xAxis = {
        categories: []
    };
    self.series = [{
        name: 'Sales',
        data: []
    }];
    self.tooltip = {
        headerFormat: '<span style="font-size:11px">{point.x}</span><br>',
        pointFormat: '<b>{point.y:.2f}</b>'
    };
    self.legend = {
        enabled: false
    };

    self.options = {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 25,
                depth: 70
            }
        },
        title: self.title,
        plotOptions: {
            column: {
                depth: 25
            }
        },
        xAxis: self.xAxis,
        yAxis: {
            title: {
                text: null
            }
        },
        tooltip: self.tooltip,
        legend: self.legend,
        series: self.series
    };
    return self;
}

function GaugeMeter() {
    var self = {};
    self.chart = {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    };
    self.title = {
        text: 'Speedometer'
    };
    self.pane = {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    };
    self.yAxis = {
        min: 0,
        max: 200,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'km/h'
        },
        plotBands: [{
            from: 0,
            to: 120,
            color: '#DF5353' // red
        }, {
            from: 120,
            to: 160,
            color: '#DDDF0D' // yellow
        }, {
            from: 160,
            to: 200,
            color: '#55BF3B' // green
        }]
    };
    self.series = [{
        name: 'Speed',
        data: [80]
    }];
    self.options = {
        chart: self.chart,
        title: self.title,
        pane: self.pane,
        yAxis: self.yAxis,
        series: self.series
    };
    return self;
}
