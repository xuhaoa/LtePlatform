﻿/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../mock/highcharts.mock.js"/>
/// <reference path="../../mycharts/comboChart.js"/>

describe('chart object tests', function() {
    describe('general chart test', function() {
        it('should separately set the title property with different instances', function() {
            var chart1 = new GeneralChart();
            chart1.title.text = 'title1';
            var chart2 = new GeneralChart();
            chart2.title.text = 'title2';
            expect(chart1.title.text).toBe('title1');
            expect(chart2.title.text).toBe('title2');
        });

        it('should separately set the title property with different GradientPie instances', function() {
            var chart1 = new GradientPie();
            chart1.title.text = 'title1';
            chart1.series[0].data = [1, 2, 3];
            var chart2 = new GradientPie();
            chart2.title.text = 'title2';
            chart2.series[0].data = [4, 5, 6];
            expect(chart1.title.text).toBe('title1');
            expect(chart1.series[0].data).toEqual([1, 2, 3]);
            expect(chart2.title.text).toBe('title2');
            expect(chart2.series[0].data).toEqual([4, 5, 6]);
        });
    });

    describe('combo chart test', function() {
        var chart = new ComboChart();

        it('should be able to construct a combo chart', function() {
            expect(chart).not.toBeNull();
        });

        it('should be able to get the title text', function() {
            expect(chart.title.text).toBe('');
        });

        it('should be able to set the title text', function() {
            chart.title.text = 'new title';
            expect(chart.options.title.text).toBe('new title');
        });

        it('should be able to get default yAxis properties', function() {
            expect(chart.yAxis[0].labels.format).toBe('{value}');
            expect(chart.yAxis[0].labels.style.color).toBe('0');
            expect(chart.yAxis[0].title.text).toBe('YLabel');
            expect(chart.yAxis[0].title.style.color).toBe('0');
        });

        it('should be able to add one yAxis definition', function() {
            chart.pushOneYAxis('new label');
            expect(chart.yAxis.length).toBe(2);
            expect(chart.yAxis).toContain({
                labels: {
                    format: '{value}',
                    style: {
                        color: '1'
                    }
                },
                title: {
                    text: 'new label',
                    style: {
                        color: '1'
                    }
                }
            });
            chart.pushOneYAxis('another new label');
            expect(chart.yAxis.length).toBe(3);
            expect(chart.yAxis).toContain({
                labels: {
                    format: '{value}',
                    style: {
                        color: '2'
                    }
                },
                title: {
                    text: 'another new label',
                    style: {
                        color: '2'
                    }
                }
            });
        });

        it('should be able to get legend property', function() {
            expect(chart.legend).toEqual({
                layout: 'vertical',
                align: 'left',
                x: 100,
                verticalAlign: 'top',
                y: 30,
                floating: true,
                backgroundColor: '#FFFFFF',
                enabled: true
            });
        });

        it('should be able to get tooltip property', function() {
            expect(chart.tooltip).toEqual({
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<b>{point.y:.2f}</b>'
            });
        });
    });

    describe('combo chart options test', function() {
        var chart = new ComboChart();

        var options = chart.options;

        it('should be get the options', function() {
            expect(options).not.toBeNull();
        });

        it('should be able to get the title text', function() {
            var base = new GeneralChart();

            expect(base.options.title).toEqual({
                text: ''
            });
            expect(options.title).toEqual({
                text: ''
            });
        });

        it('should be able to add one yAxis definition', function() {
            chart.pushOneYAxis('new label');
            expect(options.yAxis.length).toBe(2);
            expect(options.yAxis).toContain({
                labels: {
                    format: '{value}',
                    style: {
                        color: '1'
                    }
                },
                title: {
                    text: 'new label',
                    style: {
                        color: '1'
                    }
                }
            });
            chart.pushOneYAxis('another new label');
            expect(options.yAxis.length).toBe(3);
            expect(options.yAxis).toContain({
                labels: {
                    format: '{value}',
                    style: {
                        color: '2'
                    }
                },
                title: {
                    text: 'another new label',
                    style: {
                        color: '2'
                    }
                }
            });
        });

        it('should be able to get chart zoomType', function() {
            var baseOptions = ComboChart.prototype.options;
            expect(baseOptions.title).toEqual({
                text: ''
            });
            expect(options.chart).toEqual({
                zoomType: 'xy'
            });
        });

        it('should be able to get default yAxis properties', function() {
            expect(options.yAxis[0].labels.format).toBe('{value}');
            expect(options.yAxis[0].labels.style.color).toBe('0');
            expect(options.yAxis[0].title.text).toBe('YLabel');
            expect(options.yAxis[0].title.style.color).toBe('0');
        });

    });

    describe('combo chart series test', function() {
        it('insert one series once', function() {
            var chart = new ComboChart();
            chart.series.push({
                name: 'aaa',
                data: [1, 2, 3]
            });
            expect(chart.options.series.length).toBe(1);
        });

        it('insert one series twice', function() {
            var chart = new ComboChart();
            chart.series.push({
                name: 'aaa',
                data: [1, 2, 3]
            });
            expect(chart.options.series.length).toBe(1);
            chart = new ComboChart();
            chart.series.push({
                name: 'bbb',
                data: [4, 5, 6]
            });
            expect(chart.options.series.length).toBe(1);
        });
    });

    describe('combo chart axis test', function() {
        it('insert one yAxis once', function() {
            var chart = new ComboChart();
            expect(chart.options.yAxis.length).toBe(1);
            chart.pushOneYAxis('aaa');
            expect(chart.options.yAxis.length).toBe(2);
            chart = new ComboChart();
            expect(chart.options.yAxis.length).toBe(1);
        });
    });

    describe('single axis chart test', function() {
        var chart = new SingleAxisChart();
        it('should be able to set title text', function() {
            chart.title.text = 'title1';
            expect(chart.title.text).toBe('title1');
        });
    });

    describe('bar chart test', function() {
        var chart = new BarChart();

        it('should be able to construct a combo chart', function() {
            expect(chart).not.toBeNull();
        });

        it('should be able to get the title text', function() {
            expect(chart.title.text).toBe('');
        });

        it('should be able to get default yAxis properties', function() {
            expect(chart.defaultYAxis.labels.format).toBe('{value}');
            expect(chart.yAxis.labels.format).toBe('{value}');
            expect(chart.yAxis.labels.style.color).toBe('0');
            expect(chart.yAxis.title.text).toBe('YLabel');
            expect(chart.yAxis.title.style.color).toBe('0');
        });

        it('should be able to get xAxis properties', function() {
            expect(chart.xAxis.title.text).toBe('xLabel');
            expect(chart.xAxis.title.style.color).toBe('0');
        });

        it('should be able to get legend property', function() {
            expect(chart.legend).toEqual({
                layout: 'vertical',
                align: 'left',
                x: 100,
                verticalAlign: 'top',
                y: 30,
                floating: true,
                backgroundColor: '#FFFFFF',
                enabled: true
            });
        });

        it('should be able to get tooltip property', function() {
            expect(chart.tooltip).toEqual({
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<b>{point.y:.2f}</b>'
            });
        });

        it('should be able to get chart type', function() {
            expect(chart.chart).toEqual({
                type: 'bar'
            });
        });

    });

    describe('bar chart options test', function() {
        var chart = new BarChart();
        var options = chart.options;

        it('should be able to get the title text', function() {
            expect(options.title).toEqual({
                text: ''
            });
        });

        it('should be able to set the title text', function() {
            chart.title.text = "精确覆盖率统计";
            expect(options.title).toEqual({
                text: '精确覆盖率统计'
            });
        });

        it('should be able to get default yAxis properties', function() {
            expect(options.yAxis.labels.format).toBe('{value}');
            expect(options.yAxis.labels.style.color).toBe('0');
            expect(options.yAxis.title.text).toBe('YLabel');
            expect(options.yAxis.title.style.color).toBe('0');
        });

        it('should be able to asign one series', function() {
            chart.asignSeries({
                name: 'abcde',
                data: [1, 2, 3, 4]
            });
            expect(chart.series.length).toBe(1);
            expect(chart.options.series.length).toBe(1);
        });

        it('should be able to set the default yAxis properties', function() {
            chart.setDefaultYAxis({
                title: 'new y axis title',
                min: 12,
                max: 34
            });
            expect(options.yAxis).toEqual({
                labels: {
                    format: '{value}',
                    style: {
                        color: '0'
                    }
                },
                title: {
                    text: 'new y axis title',
                    style: {
                        color: '0'
                    }
                },
                min: 12,
                max: 34
            });
        });

        it('should be able to get xAxis properties', function() {
            expect(options.xAxis.title.text).toBe('xLabel');
            expect(options.xAxis.title.style.color).toBe('0');
        });

        it('should be able to get legend property', function() {
            expect(options.legend).toEqual({
                layout: 'vertical',
                align: 'left',
                x: 100,
                verticalAlign: 'top',
                y: 30,
                floating: true,
                backgroundColor: '#FFFFFF',
                enabled: true
            });
            chart.legend.enabled = false;
            expect(options.legend).toEqual({
                layout: 'vertical',
                align: 'left',
                x: 100,
                verticalAlign: 'top',
                y: 30,
                floating: true,
                backgroundColor: '#FFFFFF',
                enabled: false
            });
        });

        it('should be able to get tooltip property', function() {
            expect(options.tooltip).toEqual({
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<b>{point.y:.2f}</b>'
            });
        });

        it('should be able to get chart type', function() {
            expect(options.chart).toEqual({
                type: 'bar'
            });
        });

        it('should be able to get plot options', function() {
            var dataLabels = options.plotOptions.bar.dataLabels;
            expect(dataLabels.enabled).toBe(true);
            expect(dataLabels.align).toBe('center');
            expect(dataLabels.color).toBe('red');
        });

        it('should be able to get credit', function() {
            expect(options.credits).toEqual({
                enabled: false
            });
        });
    });

    describe('stack column chart options test', function () {
        var chart = new StackColumnChart();
        var options = chart.options;

        it('should be able to get the title text', function () {
            expect(options.title).toEqual({
                text: ''
            });
        });

        it('should be able to set the title text', function () {
            chart.title.text = "精确覆盖率统计";
            expect(options.title).toEqual({
                text: '精确覆盖率统计'
            });
        });

        it('should be able to get default yAxis properties', function () {
            expect(options.yAxis.labels.format).toBe('{value}');
            expect(options.yAxis.labels.style.color).toBe('0');
            expect(options.yAxis.title.text).toBe('YLabel');
            expect(options.yAxis.title.style.color).toBe('0');
        });

        it('should be able to asign one series', function () {
            chart.series.push({
                name: 'abcde',
                data: [1, 2, 3, 4]
            });
            expect(chart.series.length).toBe(1);
            expect(chart.options.series.length).toBe(1);
        });

        it('should be able to set the default yAxis properties', function () {
            chart.setDefaultYAxis({
                title: 'new y axis title',
                min: 12,
                max: 34
            });
            expect(options.yAxis).toEqual({
                labels: {
                    format: '{value}',
                    style: {
                        color: '0'
                    }
                },
                title: {
                    text: 'new y axis title',
                    style: {
                        color: '0'
                    }
                },
                min: 12,
                max: 34,
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            });
        });

        it('should be able to get xAxis properties', function () {
            expect(options.xAxis.title.text).toBe('xLabel');
            expect(options.xAxis.title.style.color).toBe('0');
        });

        it('should be able to get legend property', function () {
            expect(options.legend).toEqual({
                layout: 'vertical',
                align: 'left',
                x: 100,
                verticalAlign: 'top',
                y: 30,
                floating: true,
                backgroundColor: '#FFFFFF',
                enabled: true
            });
            chart.legend.enabled = false;
            expect(options.legend).toEqual({
                layout: 'vertical',
                align: 'left',
                x: 100,
                verticalAlign: 'top',
                y: 30,
                floating: true,
                backgroundColor: '#FFFFFF',
                enabled: false
            });
        });

        it('should be able to get tooltip property', function () {
            expect(options.tooltip).toEqual({
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<b>{point.y:.2f}</b>'
            });
        });

        it('should be able to get chart type', function () {
            expect(options.chart).toEqual({
                type: 'column'
            });
        });

        it('should be able to get plot options', function () {
            var dataLabels = options.plotOptions.column.dataLabels;
            expect(dataLabels.enabled).toBe(true);
            expect(dataLabels.style).toEqual({
                textShadow: '0 0 3px black'
            });
            expect(dataLabels.color).toBe('white');
        });
    });
});
