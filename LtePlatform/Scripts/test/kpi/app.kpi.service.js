describe('app kpi service test', function() {
    var appKpiService;
    beforeEach(module('myApp.kpi'));

    beforeEach(inject(function(_appKpiService_) {
        appKpiService = _appKpiService_;
    }));

    it('should be able to get city stat', function() {
        var districtStats = [
            {
                totalMrs: 100,
                firstNeighbors: 23,
                secondNeighbors: 11,
                thirdNeighbors: 5
            }, {
                totalMrs: 100,
                firstNeighbors: 26,
                secondNeighbors: 12,
                thirdNeighbors: 7
            }, {
                totalMrs: 100,
                firstNeighbors: 31,
                secondNeighbors: 15,
                thirdNeighbors: 8
            }
        ];

        var stat = appKpiService.getCityStat(districtStats, 'Foshan');

        expect(stat.city).toEqual('Foshan');
        expect(stat.firstRate).toBeCloseTo(73.33, 2);
    });

    it('should be able to get MR pie options', function() {
        var districtStats = [
            {
                district: 'district1',
                totalMrs: 100
            }, {
                district: 'district2',
                totalMrs: 101
            }, {
                district: 'district3',
                totalMrs: 102
            }
        ];
        var townStats = [
            {
                district: 'district1',
                town: 'town1',
                totalMrs: 50
            }, {
                district: 'district1',
                town: 'town2',
                totalMrs: 51
            }, {
                district: 'district2',
                town: 'town3',
                totalMrs: 52
            }, {
                district: 'district3',
                town: 'town4',
                totalMrs: 54
            }
        ];

        var options = appKpiService.getMrPieOptions(districtStats, townStats);

        expect(options.title.text).toEqual("分镇区测量报告数分布图");
        expect(options.series[0].name).toEqual("区域");
        expect(options.series[0].data.length).toEqual(3);
    });
});