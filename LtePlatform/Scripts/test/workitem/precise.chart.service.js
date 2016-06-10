describe('work item precise chart service tests', function() {
    var preciseChartService;
    beforeEach(module('myApp.url'));
    beforeEach(module('kpi.workitem'));

    beforeEach(inject(function (_preciseChartService_) {
        preciseChartService = _preciseChartService_;
    }));

    it('getTypeOption function input one empty array and output some basic parameters', function() {
        var option = preciseChartService.getTypeOption([]);

        expect(option.title.text).toEqual("工单类型分布图");
        expect(option.series[0].data).toEqual([]);
        expect(option.drilldown.series).toEqual([]);
        expect(option.series[0].name).toEqual("工单类型");
    });

    it('getStateOption function input one empty array and output some basic parameters', function () {
        var option = preciseChartService.getStateOption([]);

        expect(option.title.text).toEqual("工单状态分布图");
        expect(option.series[0].data).toEqual([]);
        expect(option.drilldown.series).toEqual([]);
        expect(option.series[0].name).toEqual("工单状态");
    });
});