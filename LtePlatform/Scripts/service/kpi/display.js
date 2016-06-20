angular.module('kpi.display', ['myApp.region'])
    .factory('kpiDisplayService', function (appFormatService) {
        return {
            generatePreciseBarOptions: function (districtStats, cityStat) {
                var chart = new BarChart();
                chart.title.text = cityStat.city + "精确覆盖率统计";
                var category = [];
                var precise = [];
                angular.forEach(districtStats, function (stat) {
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
            generateComboChartOptions: function (data, name, city) {
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
            getMrsOptions: function (stats, title) {
                var chart = new ComboChart();
                chart.title.text = title;
                var statDates = [];
                var mrStats = [];
                var firstNeighbors = [];
                var secondNeighbors = [];
                var thirdNeighbors = [];
                angular.forEach(stats, function (stat) {
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
            getPreciseOptions: function (stats, title) {
                var chart = new ComboChart();
                chart.title.text = title;
                var statDates = [];
                var firstRate = [];
                var secondRate = [];
                var thirdRate = [];
                angular.forEach(stats, function (stat) {
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
            }
        };
    });