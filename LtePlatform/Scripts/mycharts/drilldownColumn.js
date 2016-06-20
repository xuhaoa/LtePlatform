var DrilldownColumn = function() {

};

DrilldownColumn.prototype = new DrilldownChart();

DrilldownColumn.prototype.options.chart = {
    type: 'column'
};

DrilldownColumn.prototype.options.plotOptions.series.dataLabels.format = '{point.y:.2f}';

DrilldownColumn.prototype.options.xAxis = {
    type: 'category'
};