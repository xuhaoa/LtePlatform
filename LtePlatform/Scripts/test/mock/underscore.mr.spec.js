/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../underscore.min.js"/>
/// <reference path="../../service/app.url.service.js"/>

describe('MR tests using underscroe', function () {
    var appFormatService;
    beforeEach(module('myApp.url'));

    beforeEach(inject(function (_appFormatService_) {
        appFormatService = _appFormatService_;
    }));

    describe('preparing tests', function () {
        it('calculate the rsrp from indices', function() {
            var indices = _.range(11);
            var source = {
                rsrp_00: 2,
                rsrp_01: 4,
                rsrp_02: 6,
                rsrp_03: 8,
                rsrp_04: 10,
                rsrp_05: 12,
                rsrp_06: 14,
                rsrp_07: 16,
                rsrp_08: 18,
                rsrp_09: 20,
                rsrp_10: 22
            };
            var results = _.map(indices, function(index) {
                return source['rsrp_' + appFormatService.prefixInteger(index, 2)];
            });
            expect(results).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]);
        });

        it('calculate the sum of rsrp arrays', function() {
            var indices = _.range(11);
            var source = [
                {
                    rsrp_00: 2,
                    rsrp_01: 4,
                    rsrp_02: 6,
                    rsrp_03: 8,
                    rsrp_04: 10,
                    rsrp_05: 12,
                    rsrp_06: 14,
                    rsrp_07: 16,
                    rsrp_08: 18,
                    rsrp_09: 20,
                    rsrp_10: 22
                }, {
                    rsrp_00: 1,
                    rsrp_01: 2,
                    rsrp_02: 3,
                    rsrp_03: 4,
                    rsrp_04: 5,
                    rsrp_05: 6,
                    rsrp_06: 7,
                    rsrp_07: 8,
                    rsrp_08: 9,
                    rsrp_09: 10,
                    rsrp_10: 11
                }, {
                    rsrp_00: 2,
                    rsrp_01: 4,
                    rsrp_02: 6,
                    rsrp_03: 8,
                    rsrp_04: 10,
                    rsrp_05: 12,
                    rsrp_06: 14,
                    rsrp_07: 16,
                    rsrp_08: 18,
                    rsrp_09: 20,
                    rsrp_10: 22
                }
            ];
            expect(_.map(source, function(item) {
                return item['rsrp_00'];
            })).toEqual([2, 1, 2]);
            expect(_.reduce(_.map(source, function(item) {
                return item['rsrp_00'];
            }), function(a, b) {
                return a + b;
            }, 0)).toBe(5);

            var results = _.map(indices, function(index) {
                var rsrpIndex = 'rsrp_' + appFormatService.prefixInteger(index, 2);
                return _.reduce(_.map(source, function (item) {
                    return item[rsrpIndex];
                }), function (a, b) {
                    return a + b;
                }, 0);
            });
            
            expect(results).toEqual([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
        });

    });
})