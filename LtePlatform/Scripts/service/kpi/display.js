angular.module('kpi.display', ['myApp.region'])
    .constant('taDivision', [
        '0-100m',
        '100-200m',
        '200-300m',
        '300-400m',
        '400-500m',
        '500-600m',
        '600-700m',
        '700-800m',
        '800-900m',
        '900-1000m',
        '1000-1100m',
        '1100-1200m',
        '1200-1300m',
        '1300-1400m',
        '1400-1500m',
        '1500-1600m',
        '1600-1700m',
        '1700-1800m',
        '1800-1900m',
        '1900-2000m',
        '2000-2100m',
        '2100-2200m',
        '2200-2300m',
        '2300-2400m',
        '2400-2500m',
        '2500-2600m',
        '2600-2700m',
        '2700-2800m',
        '2800-2900m',
        '2900-3000m',
        '3000-3100m'
    ])
    .factory('kpiDisplayService', function(appFormatService, taDivision) {
        return {
            generatePreciseBarOptions: function(districtStats, cityStat) {
                var chart = new BarChart();
                chart.title.text = cityStat.city + "精确覆盖率统计";
                var category = [];
                var precise = [];
                angular.forEach(districtStats, function(stat) {
                    category.push(stat.district);
                    precise.push(stat.preciseRate);
                });
                category.push(cityStat.city);
                precise.push(cityStat.preciseRate);
                chart.xAxis.categories = category;
                chart.yAxis.title.text = '精确覆盖率';
                chart.xAxis.title.text = '区域';
                chart.yAxis.min = 80;
                chart.yAxis.max = 100;
                chart.series.push({
                    type: 'bar',
                    name: '精确覆盖率',
                    data: precise
                });
                return chart.options;
            },
            generateComboChartOptions: function(data, name, city) {
                var chart = new ComboChart();
                chart.title.text = name;
                var kpiOption = appFormatService.lowerFirstLetter(name);
                chart.xAxis[0].categories = data.statDates;
                chart.yAxis[0].title.text = name;
                chart.xAxis[0].title.text = '日期';
                for (var i = 0; i < data.regionList.length - 1; i++) {
                    chart.series.push({
                        type: kpiOption === "2G呼建(%)" ? 'line' : 'column',
                        name: data.regionList[i],
                        data: data.kpiDetails[kpiOption][i]
                    });
                }
                chart.series.push({
                    type: 'spline',
                    name: city,
                    data: data.kpiDetails[kpiOption][data.regionList.length - 1],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                });
                return chart.options;
            },
            getMrsOptions: function(stats, title) {
                var chart = new ComboChart();
                chart.title.text = title;
                var statDates = [];
                var mrStats = [];
                var firstNeighbors = [];
                var secondNeighbors = [];
                var thirdNeighbors = [];
                angular.forEach(stats, function(stat) {
                    statDates.push(stat.dateString);
                    mrStats.push(stat.totalMrs);
                    firstNeighbors.push(stat.firstNeighbors);
                    secondNeighbors.push(stat.secondNeighbors);
                    thirdNeighbors.push(stat.thirdNeighbors);
                });
                chart.xAxis[0].categories = statDates;
                chart.yAxis[0].title.text = "MR数量";
                chart.xAxis[0].title.text = '日期';
                chart.series.push({
                    type: "column",
                    name: "MR总数",
                    data: mrStats
                });
                chart.series.push({
                    type: "spline",
                    name: "第一邻区MR数",
                    data: firstNeighbors
                });
                chart.series.push({
                    type: "spline",
                    name: "第二邻区MR数",
                    data: secondNeighbors
                });
                chart.series.push({
                    type: "spline",
                    name: "第三邻区MR数",
                    data: thirdNeighbors
                });
                return chart.options;
            },
            getPreciseOptions: function(stats, title) {
                var chart = new ComboChart();
                chart.title.text = title;
                var statDates = [];
                var firstRate = [];
                var secondRate = [];
                var thirdRate = [];
                angular.forEach(stats, function(stat) {
                    statDates.push(stat.dateString);
                    firstRate.push(100 - parseFloat(stat.firstRate));
                    secondRate.push(100 - parseFloat(stat.secondRate));
                    thirdRate.push(100 - parseFloat(stat.thirdRate));
                });
                chart.xAxis[0].categories = statDates;
                chart.xAxis[0].title.text = '日期';
                chart.yAxis[0].title.text = "精确覆盖率";
                chart.series.push({
                    type: "spline",
                    name: "第一邻区精确覆盖率",
                    data: firstRate
                });
                chart.series.push({
                    type: "spline",
                    name: "第二邻区精确覆盖率",
                    data: secondRate
                });
                chart.series.push({
                    type: "spline",
                    name: "第三邻区精确覆盖率",
                    data: thirdRate
                });
                return chart.options;
            },
            getCoverageOptions: function(stats, title) {
                var chart = new TimeSeriesLine();
                chart.title.text = title;
                var weakCoverageRates = [];
                var overCoverageRates = [];
                angular.forEach(stats, function(stat) {
                    weakCoverageRates.push([
                        appFormatService.getUTCTime(stat.currentDate),
                        stat.mrCount === 0 ? null : stat.weakCoverCount / stat.mrCount * 100
                    ]);
                    overCoverageRates.push([
                        appFormatService.getUTCTime(stat.currentDate),
                        stat.mrCount === 0 ? null : stat.overCoverCount / stat.mrCount * 100
                    ]);
                });
                chart.yAxis.title.text = '弱覆盖率/过覆盖率（%）';
                chart.series.push({
                    type: 'area',
                    name: '弱覆盖率',
                    data: weakCoverageRates
                });
                chart.series.push({
                    type: 'area',
                    name: '过覆盖率',
                    data: overCoverageRates
                });
                return chart.options;
            },
            getCoverageInterferenceOptions: function(stats, title) {
                var chart = new TimeSeriesLine();
                chart.title.text = title;
                var mod3Rates = [];
                var mod6Rates = [];
                angular.forEach(stats, function(stat) {
                    mod3Rates.push([
                        appFormatService.getUTCTime(stat.currentDate),
                        stat.mrCount === 0 ? null : stat.mod3Count / stat.mrCount * 100
                    ]);
                    mod6Rates.push([
                        appFormatService.getUTCTime(stat.currentDate),
                        stat.mrCount === 0 ? null : stat.mod6Count / stat.mrCount * 100
                    ]);
                });
                chart.yAxis.title.text = '同模干扰比例（%）';
                chart.series.push({
                    type: 'area',
                    name: 'MOD3干扰比例',
                    data: mod3Rates
                });
                chart.series.push({
                    type: 'area',
                    name: 'MOD6干扰比例',
                    data: mod6Rates
                });
                return chart.options;
            },
            getAverageRsrpTaOptions: function(stats, title) {
                var chart = new AreaChart();
                chart.title.text = title;
                chart.xAxis.categories = taDivision;
                chart.xAxis.title.text = 'TA区间';
                chart.yAxis.title.text = '平均RSRP按TA分布（dBm）';
                chart.series.push({
                    name: '平均RSRP',
                    data: stats
                });
                return chart.options;
            },
            getAboveRateTaOptions: function(above110Stats, above105Stats, title) {
                var chart = new AreaChart();
                chart.title.text = title;
                chart.xAxis.categories = taDivision;
                chart.xAxis.title.text = 'TA区间';
                chart.yAxis.title.text = 'TA分布覆盖率（%）';
                chart.series.push({
                    name: '-110dBm以上覆盖率',
                    data: above110Stats
                });
                chart.series.push({
                    name: '-105dBm以上覆盖率',
                    data: above105Stats
                });
                return chart.options;
            },
            getInterferencePieOptions: function (interferenceCells, currentCellName) {
                var over6DbPie = new GradientPie();
                var over10DbPie = new GradientPie();
                var mod3Pie = new GradientPie();
                var mod6Pie = new GradientPie();
                over6DbPie.series[0].name = '6dB干扰日平均次数';
                over10DbPie.series[0].name = '10dB干扰日平均次数';
                over6DbPie.title.text = currentCellName + ': 6dB干扰日平均次数';
                over10DbPie.title.text = currentCellName + ': 10dB干扰日平均次数';
                mod3Pie.series[0].name = 'MOD3干扰日平均次数';
                mod6Pie.series[0].name = 'MOD6干扰日平均次数';
                mod3Pie.title.text = currentCellName + ': MOD3干扰日平均次数';
                mod6Pie.title.text = currentCellName + ': MOD6干扰日平均次数';
                angular.forEach(interferenceCells, function (cell) {
                    over6DbPie.series[0].data.push({
                        name: cell.neighborCellName,
                        y: cell.overInterferences6Db
                    });
                    over10DbPie.series[0].data.push({
                        name: cell.neighborCellName,
                        y: cell.overInterferences10Db
                    });
                    if (cell.mod3Interferences > 0) {
                        mod3Pie.series[0].data.push({
                            name: cell.neighborCellName,
                            y: cell.mod3Interferences
                        });
                    }
                    if (cell.mod6Interferences > 0) {
                        mod6Pie.series[0].data.push({
                            name: cell.neighborCellName,
                            y: cell.mod6Interferences
                        });
                    }
                });
                return {
                    over6DbOption: over6DbPie.options,
                    over10DbOption: over10DbPie.options,
                    mod3Option: mod3Pie.options,
                    mod6Option: mod6Pie.options
                };
            },
            getStrengthColumnOptions: function (interferenceCells, mrCount, currentCellName) {
                var over6DbColumn = new Column3d();
                var over10DbColumn = new Column3d();
                over6DbColumn.series[0].name = '6dB干扰强度';
                over10DbColumn.series[0].name = '10dB干扰强度';
                over6DbColumn.title.text = currentCellName + ': 6dB干扰干扰强度';
                over10DbColumn.title.text = currentCellName + ': 10dB干扰干扰强度';

                angular.forEach(interferenceCells, function (cell) {
                    over6DbColumn.series[0].data.push(cell.overInterferences6Db / mrCount * 100);
                    over10DbColumn.series[0].data.push(cell.overInterferences10Db / mrCount * 100);
                    over6DbColumn.xAxis.categories.push(cell.neighborCellName);
                    over10DbColumn.xAxis.categories.push(cell.neighborCellName);
                });
                return {
                    over6DbOption: over6DbColumn.options,
                    over10DbOption: over10DbColumn.options
                };
            }
        };
    });