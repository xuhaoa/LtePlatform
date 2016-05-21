describe('cell precise service test', function() {
	var cellPreciseService;
	beforeEach(module('myApp.kpi'));

    beforeEach(inject(function(_cellPreciseService_) {
        cellPreciseService = _cellPreciseService_;
    }));

    it('should be able to get MR options', function() {
        var stats = [1, 2, 3, 4, 5];
        var title = 'My title';
        var options = cellPreciseService.getMrsOptions(stats, title);

        expect(options.title.text).toEqual('My title');
    });
});