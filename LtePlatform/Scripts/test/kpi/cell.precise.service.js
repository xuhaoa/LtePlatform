describe('cell precise service test', function() {
	var cellPreciseService;
	beforeEach(module('myApp.kpi'));

    beforeEach(inject(function(_cellPreciseService_) {
        cellPreciseService = _cellPreciseService_;
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
        var options = cellPreciseService.getMrsOptions(stats, title);

        expect(options.title.text).toEqual('My title');
        expect(options.yAxis[0].title.text).toEqual("MR数量");
        expect(options.xAxis[0].title.text).toEqual('日期');
        expect(options.series[0].name).toEqual("MR总数");
    });
});