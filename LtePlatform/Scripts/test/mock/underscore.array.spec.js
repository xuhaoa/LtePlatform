/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../underscore.js"/>

describe('underscore array tests', function() {
    describe('Array Tests', function() {
        it('should test the push.apply', function() {
            var source = [];
            source.push(1);
            expect(source).toContain(1);
            var array1 = [2, 3, 4];
            source.push.apply(source, array1);
            expect(source.length).toBe(4);
            expect(source).toContain(3);
        });
    });

    describe('underscore array tests', function() {
        it('can pull out the first element of an array', function() {
            expect(_.first([1, 2, 3])).toBe(1);
        });
        it('can perform OO-style "first()"', function() {
            expect(_([1, 2, 3]).first()).toBe(1);
        });
        it('returns an empty array when n <= 0 (0 case)', function() {
            expect(_.first([1, 2, 3], 0)).toEqual([]);
        });
        it('returns an empty array when n <= 0 (negative case)', function() {
            expect(_.first([1, 2, 3], -1)).toEqual([]);
        });
        it('can fetch the first n elements', function() {
            expect(_.first([1, 2, 3], 2)).toEqual([1, 2]);
        });
        it('returns the whole array if n > length', function() {
            expect(_.first([1, 2, 3], 5)).toEqual([1, 2, 3]);
        });
        it('works on an arguments object', function() {
            var result = (function() { return _.first(arguments); }(4, 3, 2, 1));
            expect(result).toBe(4);
        });
        it('works well with _.map', function() {
            var result = _.map([[1, 2, 3], [1, 2, 3]], _.first);
            expect(result).toEqual([1, 1]);
        });
        it('returns undefined when called on null', function() {
            expect(_.first(null)).toBe(void 0);
        });
        it('return undefined when called on a empty array', function() {
            Array.prototype[0] = 'boo';
            expect(_.first([])).toBe(void 0);
            delete Array.prototype[0];
        });
        it('is an alias for first', function() {
            expect(_.take).toEqual(_.first);
        });
    });

    describe('rest tests', function() {
        var numbers = [1, 2, 3, 4];
        it('fetches all but the first element', function() {
            expect(_.rest(numbers)).toEqual([2, 3, 4]);
        });
        it('returns the whole array when index is 0', function() {
            expect(_.rest(numbers, 0)).toEqual([1, 2, 3, 4]);
        });
        it('returns elements starting at the given index', function() {
            expect(_.rest(numbers, 2)).toEqual([3, 4]);
        });
        it('works on an arguments object', function() {
            var result = (function() { return _(arguments).rest(); }(1, 2, 3, 4));
            expect(result).toEqual([2, 3, 4]);
        });
        it('works well with _.map', function() {
            var result = _.map([[1, 2, 3], [1, 2, 3]], _.rest);
            expect(_.flatten(result)).toEqual([2, 3, 2, 3]);
        });
        it('tail is an alias for rest', function() {
            expect(_.tail).toEqual(_.rest);
        });
        it('drop is an alias for rest', function() {
            expect(_.drop).toEqual(_.rest);
        });
    });

    describe('initial test', function() {
        it('returns all but the last element', function() {
            expect(_.initial([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4]);
        });
        it('returns all but the last n elements', function() {
            expect(_.initial([1, 2, 3, 4], 2)).toEqual([1, 2]);
        });
        it('returns an empty array when n > length', function() {
            expect(_.initial([1, 2, 3, 4], 6)).toEqual([]);
        });
        it('works on an arguments object', function() {
            var result = (function() { return _(arguments).initial(); }(1, 2, 3, 4));
            expect(result).toEqual([1, 2, 3]);
        });
        it('works well with _.map', function() {
            var result = _.map([[1, 2, 3], [1, 2, 3]], _.initial);
            expect(_.flatten(result)).toEqual([1, 2, 1, 2]);
        });
    });

    describe('last tests', function() {
        it('can pull out the last element of an array', function() {
            expect(_.last([1, 2, 3])).toEqual(3);
        });
        it('can perform OO-style "last()"', function() {
            expect(_([1, 2, 3]).last(3)).toEqual([1, 2, 3]);
        });
        it('returns an empty array when n <= 0 (0 case)', function() {
            expect(_.last([1, 2, 3], 0)).toEqual([]);
        });
        it('returns an empty array when n <= 0 (negative case)', function() {
            expect(_.last([1, 2, 3], -1)).toEqual([]);
        });
        it('can fetch the last n elements', function() {
            expect(_.last([1, 2, 3], 2)).toEqual([2, 3]);
        });
        it('returns the whole array if n > length', function() {
            expect(_.last([1, 2, 3], 5)).toEqual([1, 2, 3]);
        });
        it('works on an arguments object', function() {
            var result = (function() { return _(arguments).last(); }(1, 2, 3, 4));
            expect(result).toEqual(4);
        });
        it('works well with _.map', function() {
            var result = _.map([[1, 2, 3], [1, 2, 3]], _.last);
            expect(result).toEqual([3, 3]);
        });
        it('returns undefined when called on null', function() {
            expect(_.last(null)).toEqual(void 0);
        });

        it('return undefined when called on a empty array', function() {
            var arr = [];
            arr[-1] = 'boo';
            expect(_.last(arr)).toEqual(void 0);
        });
    });

    describe('compact tests', function() {
        it('removes all falsy values', function() {
            expect(_.compact([1, false, null, 0, '', void 0, NaN, 2])).toEqual([1, 2]);
        });
        it('works on an arguments object', function() {
            var result = (function() { return _.compact(arguments); }(0, 1, false, 2, false, 3));
            expect(result).toEqual([1, 2, 3]);
        });
        it('works well with _.map', function() {
            var result = _.map([[1, false, false], [false, false, 3]], _.compact);
            expect(result).toEqual([[1], [3]]);
        });
    });

    describe('flatten test', function() {
        it('supports null', function() {
            expect(_.flatten(null)).toEqual([]);
        });
        it('supports undefined', function() {
            expect(_.flatten(void 0)).toEqual([]);
        });

        it('supports empty arrays', function() {
            expect(_.flatten([[], [[]], []])).toEqual([]);
        });
        it('can shallowly flatten empty arrays', function() {
            expect(_.flatten([[], [[]], []], true)).toEqual([[]]);
        });

        var list = [1, [2], [3, [[[4]]]]];
        it('can flatten nested arrays', function() {
            expect(_.flatten(list)).toEqual([1, 2, 3, 4]);
        });
        it('can shallowly flatten nested arrays', function() {
            expect(_.flatten(list, true)).toEqual([1, 2, 3, [4]]);
        });
        var result = (function() { return _.flatten(arguments); }(1, [2], [3, [[[4]]]]));
        it('works on an arguments object', function() {
            expect(result).toEqual([1, 2, 3, 4]);
        });
        list = [[1], [2], [3], [[4]]];
        it('can shallowly flatten arrays containing only other arrays', function() {
            expect(_.flatten(list, true)).toEqual([1, 2, 3, [4]]);
        });

        it('can flatten medium length arrays', function() {
            expect(_.flatten([_.range(10), _.range(10), 5, 1, 3], true).length).toEqual(23);
        });
        it('can shallowly flatten medium length arrays', function() {
            expect(_.flatten([_.range(10), _.range(10), 5, 1, 3]).length).toEqual(23);
        });
        it('can handle massive arrays', function() {
            expect(_.flatten([new Array(1000000), _.range(56000), 5, 1, 3]).length).toEqual(1056003);
        });
        it('can handle massive arrays in shallow mode', function() {
            expect(_.flatten([new Array(1000000), _.range(56000), 5, 1, 3], true).length).toEqual(1056003);
        });

        var x = _.range(100000);
        for (var i = 0; i < 1000; i++) x = [x];
        it('can handle very deep arrays', function() {
            expect(_.flatten(x)).toEqual(_.range(100000));
        });
        it('can handle very deep arrays in shallow mode', function() {
            expect(_.flatten(x, true)).toEqual(x[0]);
        });
    });

    describe('without tests', function() {
        it('removes all instances of the given values', function() {
            var list = [1, 2, 1, 0, 3, 1, 4];
            expect(_.without(list, 0, 1)).toEqual([2, 3, 4]);
        });
        var result = (function() { return _.without(arguments, 0, 1); }(1, 2, 1, 0, 3, 1, 4));
        it('works on an arguments object', function() {
            expect(result).toEqual([2, 3, 4]);
        });

        it('compares objects by reference (value case)', function() {
            var list = [{ one: 1 }, { two: 2 }];
            expect(_.without(list, { one: 1 })).toEqual(list);
        });
        it('compares objects by reference (reference case)', function() {
            var list = [{ one: 1 }, { two: 2 }];
            expect(_.without(list, list[0])).toEqual([{ two: 2 }]);
        });
    });

    describe('sortedIndex tests', function() {
        var numbers = [10, 20, 30, 40, 50];
        var indexFor35 = _.sortedIndex(numbers, 35);
        it('finds the index at which a value should be inserted to retain order', function() {
            expect(indexFor35).toEqual(3);
        });
        var indexFor30 = _.sortedIndex(numbers, 30);
        it('finds the smallest index at which a value could be inserted to retain order', function() {
            expect(indexFor30).toEqual(2);
        });

        var objects = [{ x: 10 }, { x: 20 }, { x: 30 }, { x: 40 }];
        it('uses the result of `iterator` for order comparisons', function() {
            var iterator = function(obj) { return obj.x; };
            expect(_.sortedIndex(objects, { x: 25 }, iterator)).toEqual(2);
        });
        it('when `iterator` is a string, uses that key for order comparisons', function() {
            expect(_.sortedIndex(objects, { x: 35 }, 'x')).toEqual(3);
        });

        var context = { 1: 2, 2: 3, 3: 4 };
        it('can execute its iterator in the given context', function() {
            var iterator = function(obj) { return this[obj]; };
            expect(_.sortedIndex([1, 3], 2, iterator, context)).toEqual(1);
        });

        var values = [
            0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287,
            1048575, 2097151, 4194303, 8388607, 16777215, 33554431, 67108863, 134217727, 268435455, 536870911, 1073741823, 2147483647
        ];
        var largeArray = Array(Math.pow(2, 32) - 1);
        var length = values.length;
        // Sparsely populate `array`
        while (length--) {
            largeArray[values[length]] = values[length];
        }
        it('works with large indexes', function() {
            expect(_.sortedIndex(largeArray, 2147483648)).toEqual(2147483648);
        });
    });

    describe('uniq tests', function() {
        it('can find the unique values of an unsorted array', function() {
            var list = [1, 2, 1, 3, 1, 4];
            expect(_.uniq(list)).toEqual([1, 2, 3, 4]);
        });
        it('can find the unique values of a sorted array faster', function() {
            var list = [1, 1, 1, 2, 2, 3];
            expect(_.uniq(list, true)).toEqual([1, 2, 3]);
        });

        it('uses the result of `iterator` for uniqueness comparisons (unsorted case);`sorted` argument defaults to false when omitted;when `iterator` is a string, uses that key for comparisons (unsorted case)', function() {
            var list = [{ name: 'Moe' }, { name: 'Curly' }, { name: 'Larry' }, { name: 'Curly' }];
            var expected = [{ name: 'Moe' }, { name: 'Curly' }, { name: 'Larry' }];
            var iterator = function(stooge) { return stooge.name; };
            expect(_.uniq(list, false, iterator)).toEqual(expected);
            expect(_.uniq(list, iterator)).toEqual(expected);
            expect(_.uniq(list, 'name')).toEqual(expected);
        });

        it('uses the result of `iterator` for uniqueness comparisons (sorted case);when `iterator` is a string, uses that key for comparisons (sorted case)', function() {
            var list = [{ score: 8 }, { score: 10 }, { score: 10 }];
            var expected = [{ score: 8 }, { score: 10 }];
            var iterator = function(item) { return item.score; };
            expect(_.uniq(list, true, iterator)).toEqual(expected);
            expect(_.uniq(list, true, 'score')).toEqual(expected);
        });


        it('can use falsy pluck like iterator', function() {
            expect(_.uniq([{ 0: 1 }, { 0: 1 }, { 0: 1 }, { 0: 2 }], 0)).toEqual([{ 0: 1 }, { 0: 2 }]);
        });

        it('works on an arguments object', function() {
            var result = (function() { return _.uniq(arguments); }(1, 2, 1, 3, 1, 4));
            expect(result).toEqual([1, 2, 3, 4]);
        });

        it('works on values that can be tested for equivalency but not ordered', function() {
            var a = {}, b = {}, c = {};
            expect(_.uniq([a, b, a, b, c])).toEqual([a, b, c]);
        });

        it('returns an empty array when `array` is not iterable', function() {
            expect(_.uniq(null)).toEqual([]);
        });

        it('executes its iterator in the given context;passes its iterator the value;passes its iterator the index;passes its iterator the entire array', function() {
            var context = {};
            var list = [3];
            _.uniq(list, function(value, index, array) {
                expect(this).toEqual(context);
                expect(value).toEqual(3);
                expect(index).toEqual(0);
                expect(array).toEqual(list);
            }, context);
        });

        it('is an alias for uniq', function() {
            expect(_.unique).toEqual(_.uniq);
        });
    });

    describe('interaction tests', function() {
        var leaders = ['moe', 'groucho']
        it('can find the set intersection of two arrays;can perform an OO-style intersection', function() {
            var stooges = ['moe', 'curly', 'larry'];
            expect(_.intersection(stooges, leaders)).toEqual(['moe']);
            expect(_(stooges).intersection(leaders)).toEqual(['moe']);
        });
        it('works on an arguments object', function() {
            var result = (function() { return _.intersection(arguments, leaders); }('moe', 'curly', 'larry'));
            expect(result).toEqual(['moe']);
        });
        it('returns a duplicate-free array', function() {
            var theSixStooges = ['moe', 'moe', 'curly', 'curly', 'larry', 'larry'];
            expect(_.intersection(theSixStooges, leaders)).toEqual(['moe']);
        });
        it('preserves the order of the first array', function() {
            var result = _.intersection([2, 4, 3, 1], [1, 2, 3]);
            expect(result).toEqual([2, 3, 1]);
        });
        it('returns an empty array when passed null as the first argument', function() {
            var result = _.intersection(null, [1, 2, 3]);
            expect(result).toEqual([]);
        });
        it('returns an empty array when passed null as an argument beyond the first', function() {
            var result = _.intersection([1, 2, 3], null);
            expect(result).toEqual([]);
        });
    });

    describe('union tests', function() {
        it('can find the union of a list of arrays', function() {
            var result = _.union([1, 2, 3], [2, 30, 1], [1, 40]);
            expect(result).toEqual([1, 2, 3, 30, 40]);
        });

        it('can perform an OO-style union', function() {
            var result = _([1, 2, 3]).union([2, 30, 1], [1, 40]);
            expect(result).toEqual([1, 2, 3, 30, 40]);
        });

        it('can find the union of a list of nested arrays', function() {
            var result = _.union([1, 2, 3], [2, 30, 1], [1, 40, [1]]);
            expect(result).toEqual([1, 2, 3, 30, 40, [1]]);
        });

        it('orders values by their first encounter', function() {
            var result = _.union([10, 20], [1, 30, 10], [0, 40]);
            expect(result).toEqual([10, 20, 1, 30, 0, 40]);
        });

        it('works on an arguments object', function() {
            var result = (function() { return _.union(arguments, [2, 30, 1], [1, 40]); }(1, 2, 3));
            expect(result).toEqual([1, 2, 3, 30, 40]);
        });

        it('restricts the union to arrays only', function() {
            expect(_.union([1, 2, 3], 4)).toEqual([1, 2, 3]);
        });
    });

    describe('difference tests', function() {
        it('can find the difference of two arrays', function() {
            var result = _.difference([1, 2, 3], [2, 30, 40]);
            expect(result).toEqual([1, 3]);
        });

        it('can perform an OO-style difference', function() {
            var result = _([1, 2, 3]).difference([2, 30, 40]);
            expect(result).toEqual([1, 3]);
        });

        it('can find the difference of three arrays', function() {
            var result = _.difference([1, 2, 3, 4], [2, 30, 40], [1, 11, 111]);
            expect(result).toEqual([3, 4]);
        });

        it('preserves the order of the first array', function() {
            var result = _.difference([8, 9, 3, 1], [3, 8]);
            expect(result).toEqual([9, 1]);
        });

        it('works on an arguments object', function() {
            var result = (function() { return _.difference(arguments, [2, 30, 40]); }(1, 2, 3));
            expect(result).toEqual([1, 3]);
        });

        it('restrict the difference to arrays only', function() {
            var result = _.difference([1, 2, 3], 1);
            expect(result).toEqual([1, 2, 3]);
        });
    });

    describe('zip tests', function() {
        it('zipped together arrays of different lengths', function() {
            var names = ['moe', 'larry', 'curly'], ages = [30, 40, 50], leaders = [true];
            expect(_.zip(names, ages, leaders)).toEqual([
                ['moe', 30, true],
                ['larry', 40, void 0],
                ['curly', 50, void 0]
            ]);
        });

        it('zipped pairs', function() {
            var stooges = _.zip(['moe', 30, 'stooge 1'], ['larry', 40, 'stooge 2'], ['curly', 50, 'stooge 3']);
            expect(stooges).toEqual([['moe', 'larry', 'curly'], [30, 40, 50], ['stooge 1', 'stooge 2', 'stooge 3']]);
        });

        // In the case of different lengths of the tuples, undefined values
        // should be used as placeholder
        it('zipped pairs with empties', function() {
            var stooges = _.zip(['moe', 30], ['larry', 40], ['curly', 50, 'extra data']);
            expect(stooges).toEqual([['moe', 'larry', 'curly'], [30, 40, 50], [void 0, void 0, 'extra data']]);
        });

        it('unzipped empty', function() {
            var empty = _.zip([]);
            expect(empty).toEqual([]);
        });

        it('handles null', function() {
            expect(_.zip(null)).toEqual([]);
        });
        it('_.zip() returns []', function() {
            expect(_.zip()).toEqual([]);
        });
    });

    describe('unzip tests', function() {
        it('handles null', function() {
            expect(_.unzip(null)).toEqual([]);
        });

        it('first', function() {
            expect(_.unzip([['a', 'b'], [1, 2]])).toEqual([['a', 1], ['b', 2]]);
        });

        // complements zip
        it('second unzip', function() {
            var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
            expect(_.unzip(zipped)).toEqual([['fred', 'barney'], [30, 40], [true, false]]);
        });

        it('Uses length of largest array', function() {
            var zipped = _.zip(['moe', 30], ['larry', 40], ['curly', 50, 'extra data']);
            expect(_.unzip(zipped)).toEqual([['moe', 30, void 0], ['larry', 40, void 0], ['curly', 50, 'extra data']]);
        });
    });

    describe('object tests', function() {
        it('two arrays zipped together into an object', function() {
            var result = _.object(['moe', 'larry', 'curly'], [30, 40, 50]);
            var shouldBe = { moe: 30, larry: 40, curly: 50 };
            expect(result).toEqual(shouldBe);
        });

        it('an array of pairs zipped together into an object', function() {
            var result = _.object([['one', 1], ['two', 2], ['three', 3]]);
            var shouldBe = { one: 1, two: 2, three: 3 };
            expect(result).toEqual(shouldBe);
        });

        it('an object converted to pairs and back to an object', function() {
            var stooges = { moe: 30, larry: 40, curly: 50 };
            expect(_.object(_.pairs(stooges))).toEqual(stooges);
        });

        it('handles nulls', function() {
            expect(_.object(null)).toEqual({});
        });
    });

    describe('indexOf tests', function() {
        it('can compute indexOf', function() {
            var numbers = [1, 2, 3];
            expect(_.indexOf(numbers, 2)).toEqual(1);
        });
        it('works on an arguments object', function() {
            var result = (function() { return _.indexOf(arguments, 2); }(1, 2, 3));
            expect(result).toEqual(1);
        });

        it('Handles tests', function() {
            _.each([null, void 0, [], false], function(val) {
                expect(_.indexOf(val, 2)).toEqual(-1);
                expect(_.indexOf(val, 2, -1)).toEqual(-1);
                expect(_.indexOf(val, 2, -20)).toEqual(-1);
                expect(_.indexOf(val, 2, 15)).toEqual(-1);
            });
        });

        it('the element is not in the list', function() {
            var num = 35;
            var numbers = [10, 20, 30, 40, 50];
            var index = _.indexOf(numbers, num, true);
            expect(index).toEqual(-1);
        });

        it('the element is in the list', function() {
            var numbers = [10, 20, 30, 40, 50];
            var num = 40;
            var index = _.indexOf(numbers, num, true);
            expect(index).toEqual(3);
        });

        it('non-nums as fromIndex make indexOf assume sorted', function() {
            var numbers = [1, 40, 40, 40, 40, 40, 40, 40, 50, 60, 70];
            var num = 40;
            expect(_.indexOf(numbers, num, true)).toEqual(1);
            expect(_.indexOf(numbers, 6, true)).toEqual(-1);
            expect(_.indexOf([1, 2, 5, 4, 6, 7], 5, true)).toEqual(-1);
            _.every(['1', [], {}, null], function() {
                return _.indexOf(numbers, num, {}) === 1;
            });
        });


        it('supports the fromIndex argument', function() {
            var numbers = [1, 2, 3, 1, 2, 3, 1, 2, 3];
            var index = _.indexOf(numbers, 2, 5);
            expect(index).toEqual(7);
        });

        it('treats sparse arrays as if they were dense', function() {
            var index = _.indexOf([,,, 0], void 0);
            expect(index).toEqual(0);
        });

        it('neg `fromIndex` starts at the right index', function() {
            var array = [1, 2, 3, 1, 2, 3];
            expect(_.indexOf(array, 1, -3)).toEqual(3);
            expect(_.indexOf(array, 1, -2)).toEqual(-1);
            expect(_.indexOf(array, 2, -3)).toEqual(4);
            _.each([-6, -8, -Infinity], function(fromIndex) {
                expect(_.indexOf(array, 1, fromIndex)).toEqual(0);
            });
        });

        it('simple test', function() {
            expect(_.indexOf([1, 2, 3], 1, true)).toEqual(0);
        });

        it('empty array with truthy `isSorted` returns -1', function() {
            var index = _.indexOf([], void 0, true);
            expect(index).toEqual(-1);
        });

        it('indexOf with NaN', function() {
            expect(_.indexOf([1, 2, NaN, NaN], NaN)).toEqual(2);
            expect(_.indexOf([1, 2, Infinity], NaN)).toEqual(-1);

            expect(_.indexOf([1, 2, NaN, NaN], NaN, 1)).toEqual(2);
            expect(_.indexOf([1, 2, NaN, NaN], NaN, -2)).toEqual(2);

            (function() {
                expect(_.indexOf(arguments, NaN)).toEqual(2);
            }(1, 2, NaN, NaN));
        });

        it('indexOf with +- 0', function() {
            _.each([-0, +0], function(val) {
                expect(_.indexOf([1, 2, val, val], val)).toEqual(2);
                expect(_.indexOf([1, 2, val, val], -val)).toEqual(2);
            });
        });
    });

    describe('lastIndexOf tests', function() {
        var falsy = [void 0, '', 0, false, NaN, null, void 0];

        it('simple test', function() {
            var numbers = [1, 0, 1];
            expect(_.lastIndexOf(numbers, 1)).toEqual(2);
        });

        it('can compute lastIndexOf, even without the native function and lastIndexOf the other element', function() {
            var numbers = [1, 0, 1, 0, 0, 1, 0, 0, 0];
            numbers.lastIndexOf = null;
            expect(_.lastIndexOf(numbers, 1)).toEqual(5);
            expect(_.lastIndexOf(numbers, 0)).toEqual(8);
        });


        it('works on an arguments object', function() {
            var result = (function() { return _.lastIndexOf(arguments, 1); }(1, 0, 1, 0, 0, 1, 0, 0, 0));
            expect(result).toEqual(5);
        });

        it('null handlers', function() {
            _.each([null, void 0, [], false], function(val) {
                expect(_.lastIndexOf(val, 2)).toEqual(-1);
                expect(_.lastIndexOf(val, 2, -1)).toEqual(-1);
                expect(_.lastIndexOf(val, 2, -20)).toEqual(-1);
                expect(_.lastIndexOf(val, 2, 15)).toEqual(-1);
            });
        });


        it('supports the fromIndex argument', function() {
            var numbers = [1, 2, 3, 1, 2, 3, 1, 2, 3];
            var index = _.lastIndexOf(numbers, 2, 2);
            expect(index).toEqual(1);
        });

        var array = [1, 2, 3, 1, 2, 3];

        it('starts at the correct from idx', function() {
            expect(_.lastIndexOf(array, 1, 0)).toEqual(0);
        });
        it('should return the index of the last matched value', function() {
            expect(_.lastIndexOf(array, 3)).toEqual(5);
        });
        it('should return `-1` for an unmatched value', function() {
            expect(_.lastIndexOf(array, 4)).toEqual(-1);
        });

        it('should work with a positive `fromIndex`', function() {
            expect(_.lastIndexOf(array, 1, 2)).toEqual(0);
        });

        it('test the large fromIndex', function() {
            _.each([6, 8, Math.pow(2, 32), Infinity], function(fromIndex) {
                expect(_.lastIndexOf(array, void 0, fromIndex)).toEqual(-1);
                expect(_.lastIndexOf(array, 1, fromIndex)).toEqual(3);
                expect(_.lastIndexOf(array, '', fromIndex)).toEqual(-1);
            });
        });


        it('should treat falsy `fromIndex` values, except `0` and `NaN`, as `array.length`', function() {
            var expected = _.map(falsy, function(value) {
                return typeof value == 'number' ? -1 : 5;
            });

            var actual = _.map(falsy, function(fromIndex) {
                return _.lastIndexOf(array, 3, fromIndex);
            });

            expect(actual).toEqual(expected);
        });

        it('should treat non-number `fromIndex` values as `array.length`', function() {
            expect(_.lastIndexOf(array, 3, '1')).toEqual(5);
        });
        it('should treat non-number `fromIndex` values as `array.length`', function() {
            expect(_.lastIndexOf(array, 3, true)).toEqual(5);
        });

        it('should work with a negative `fromIndex`', function() {
            expect(_.lastIndexOf(array, 2, -3)).toEqual(1);
        });
        it('neg `fromIndex` starts at the right index', function() {
            expect(_.lastIndexOf(array, 1, -3)).toEqual(3);
        });

        it('test the map result', function() {
            expect(_.map([-6, -8, -Infinity], function(fromIndex) {
                return _.lastIndexOf(array, 1, fromIndex);
            })).toEqual([0, -1, -1]);
        });

        it('lastIndexOf with NaN', function() {
            expect(_.lastIndexOf([1, 2, NaN, NaN], NaN)).toEqual(3);
            expect(_.lastIndexOf([1, 2, Infinity], NaN)).toEqual(-1);

            expect(_.lastIndexOf([1, 2, NaN, NaN], NaN, 2)).toEqual(2);
            expect(_.lastIndexOf([1, 2, NaN, NaN], NaN, -2)).toEqual(2);

            (function() {
                expect(_.lastIndexOf(arguments, NaN)).toEqual(3);
            }(1, 2, NaN, NaN));
        });

        it('lastIndexOf with +- 0', function() {
            _.each([-0, +0], function(val) {
                expect(_.lastIndexOf([1, 2, val, val], val)).toEqual(3);
                expect(_.lastIndexOf([1, 2, val, val], -val)).toEqual(3);
                expect(_.lastIndexOf([-1, 1, 2], -val)).toEqual(-1);
            });
        });
    });

    describe('advanced topic', function() {
        it('findIndex', function() {
            var objects = [
                { a: 0, b: 0 },
                { a: 1, b: 1 },
                { a: 2, b: 2 },
                { a: 0, b: 0 }
            ];

            expect(_.findIndex(objects, function(obj) {
                return obj.a === 0;
            })).toEqual(0);

            expect(_.findIndex(objects, function(obj) {
                return obj.b * obj.a === 4;
            })).toEqual(2);

            expect(_.findIndex(objects, 'a')).toEqual(1);

            expect(_.findIndex(objects, function(obj) {
                return obj.b * obj.a === 5;
            })).toEqual(-1);

            expect(_.findIndex(null, _.noop)).toEqual(-1);
            expect(_.findIndex(objects, function(a) {
                return a.foo === null;
            })).toEqual(-1);
            _.findIndex([{ a: 1 }], function(a, key, obj) {
                expect(key).toEqual(0);
                expect(obj).toEqual([{ a: 1 }]);
                expect(this).toEqual(objects);
            }, objects);

            var sparse = [];
            sparse[20] = { a: 2, b: 2 };
            expect(_.findIndex(sparse, function(obj) {
                return obj && obj.b * obj.a === 4;
            })).toEqual(20);

            var array = [1, 2, 3, 4];
            array.match = 55;
            expect(_.findIndex(array, function (x) { return x === 55; })).toEqual(-1);
        });

        it('findLastIndex', function() {
            var objects = [
                { a: 0, b: 0 },
                { a: 1, b: 1 },
                { a: 2, b: 2 },
                { a: 0, b: 0 }
            ];

            expect(_.findLastIndex(objects, function(obj) {
                return obj.a === 0;
            })).toEqual(3);

            expect(_.findLastIndex(objects, function(obj) {
                return obj.b * obj.a === 4;
            })).toEqual(2);

            expect(_.findLastIndex(objects, 'a')).toEqual(2);

            expect(_.findLastIndex(objects, function(obj) {
                return obj.b * obj.a === 5;
            })).toEqual(-1);

            expect(_.findLastIndex(null, _.noop)).toEqual(-1);
            expect(_.findLastIndex(objects, function(a) {
                return a.foo === null;
            })).toEqual(-1);
            _.findLastIndex([{ a: 1 }], function(a, key, obj) {
                expect(key).toEqual(0);
                expect(obj).toEqual([{ a: 1 }]);
                expect(this).toEqual(objects);
            }, objects);

            var sparse = [];
            sparse[20] = { a: 2, b: 2 };
            expect(_.findLastIndex(sparse, function(obj) {
                return obj && obj.b * obj.a === 4;
            })).toEqual(20);

            var array = [1, 2, 3, 4];
            array.match = 55;
            expect(_.findLastIndex(array, function (x) { return x === 55; })).toEqual(-1);
        });

        describe('range', function () {
            it('range with 0 as a first argument generates an empty array', function() {
                expect(_.range(0)).toEqual([]);
            });
            it('range with a single positive argument generates an array of elements 0,1,2,...,n-1', function () {
                expect(_.range(4)).toEqual([0, 1, 2, 3]);
            });
            it('range with two arguments a &amp; b, a&lt;b generates an array of elements a,a+1,a+2,...,b-2,b-1', function () {
                expect(_.range(5, 8)).toEqual([5, 6, 7]);
            });
            it('range with three arguments a &amp; b &amp; c, c &lt; b-a, a &lt; b generates an array of elements a,a+c,a+2c,...,b - (multiplier of a) &lt; c', function () {
                expect(_.range(3, 10, 3)).toEqual([3, 6, 9]);
            });
            it('range with three arguments a &amp; b &amp; c, c &gt; b-a, a &lt; b generates an array with a single element, equal to a', function () {
                expect(_.range(3, 10, 15)).toEqual([3]);
            });
            it('range with three arguments a &amp; b &amp; c, a &gt; b, c &lt; 0 generates an array of elements a,a-c,a-2c and ends with the number not less than b', function () {
                expect(_.range(12, 7, -2)).toEqual([12, 10, 8]);
            });
            it('final example in the Python docs', function () {
                expect(_.range(0, -10, -1)).toEqual([0, -1, -2, -3, -4, -5, -6, -7, -8, -9]);
            });
            it('should preserve -0', function () {
                expect(1 / _.range(-0, 1)[0]).toEqual(-Infinity);
            });
            it('negative range generates descending array', function () {
                expect(_.range(8, 5, -1)).toEqual([8, 7, 6]);
            });
            it('negative range generates descending array 2', function () {
                expect(_.range(0, -3, -1)).toEqual([0, -1, -2]);
            });
        });

        describe('chunk', function () {
            it('chunk for empty array returns an empty array', function () {
                expect(_.chunk([], 2)).toEqual([]);
            });

            it('chunk into parts of 0 elements returns empty array', function () {
                expect(_.chunk([1, 2, 3], 0)).toEqual([]);
            });
            it('chunk into parts of negative amount of elements returns an empty array', function () {
                expect(_.chunk([1, 2, 3], -1)).toEqual([]);
            });
            it('defaults to empty array (chunk size 0)', function () {
                expect(_.chunk([1, 2, 3])).toEqual([]);
            });

            it('chunk into parts of 1 elements returns original array', function () {
                expect(_.chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
            });

            it('chunk into parts of current array length elements returns the original array', function () {
                expect(_.chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
            });
            it('chunk into parts of more then current array length elements returns the original array', function () {
                expect(_.chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
            });

            it('chunk into parts of less then current array length elements', function () {
                expect(_.chunk([10, 20, 30, 40, 50, 60, 70], 2)).toEqual([[10, 20], [30, 40], [50, 60], [70]]);
            });
            it('chunk into parts of less then current array length elements', function () {
                expect(_.chunk([10, 20, 30, 40, 50, 60, 70], 3)).toEqual([[10, 20, 30], [40, 50, 60], [70]]);
            });
        });
    });
});
