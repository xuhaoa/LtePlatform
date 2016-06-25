describe('cell precise service test', function() {
    var kpiDisplayService;
    beforeEach(module('kpi.display'));

	beforeEach(inject(function (_kpiDisplayService_) {
	    kpiDisplayService = _kpiDisplayService_;
    }));

    it('should be able to get MR options', function() {
        var stats = [
        {
        	dateString: '2016-1-1',
        	totalMrs: 1,
        	firstNeighbors: 2,
        	secondNeighbors: 3,
        	thirdNeighbors: 4
        }, {
        	dateString: '2016-1-2',
        	totalMrs: 3,
        	firstNeighbors: 2,
        	secondNeighbors: 3,
        	thirdNeighbors: 4
        }, {
        	dateString: '2016-1-3',
        	totalMrs: 5,
        	firstNeighbors: 2,
        	secondNeighbors: 3,
        	thirdNeighbors: 4
        }];
        var title = 'My title';
        var options = kpiDisplayService.getMrsOptions(stats, title);

        expect(options.title.text).toEqual('My title');
        expect(options.yAxis[0].title.text).toEqual("MR数量");
        expect(options.xAxis[0].title.text).toEqual('日期');
        expect(options.xAxis[0].categories).toContain('2016-1-2');
        expect(options.series[0].name).toEqual("MR总数");
        expect(options.series[0].data.length).toEqual(3);
        expect(options.series[0].data).toContain(3);
        expect(options.series[1].name).toEqual("第一邻区MR数");
        expect(options.series[2].name).toEqual("第二邻区MR数");
        expect(options.series[3].name).toEqual("第三邻区MR数");
    });

    it('should be able to get precise rate options', function() {
        var stats = [
            {
                dateString: '2016-1-1',
                firstRate: 2,
                secondRate: 3,
                thirdRate: 4
            }, {
                dateString: '2016-1-2',
                firstRate: 2,
                secondRate: 3,
                thirdRate: 4
            }, {
                dateString: '2016-1-3',
                firstRate: 2,
                secondRate: 3,
                thirdRate: 4
            }
        ];
        var title = 'My title';
        var options = kpiDisplayService.getPreciseOptions(stats, title);

        expect(options.title.text).toEqual('My title');
        expect(options.yAxis[0].title.text).toEqual("精确覆盖率");
        expect(options.xAxis[0].title.text).toEqual('日期');
        expect(options.series[0].name).toEqual("第一邻区精确覆盖率");
        expect(options.series[0].data).toEqual([98, 98, 98]);
        expect(options.series[1].name).toEqual("第二邻区精确覆盖率");
        expect(options.series[2].name).toEqual("第三邻区精确覆盖率");
    });
});