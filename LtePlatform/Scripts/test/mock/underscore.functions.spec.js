/// <reference path="../../angular.js"/>
/// <reference path="../../angular-mocks.js"/>
/// <reference path="../../jasmine/boot.js"/>
/// <reference path="../../jasmine/console.js"/>
/// <reference path="../../jasmine/jasmine.js"/>
/// <reference path="../../jasmine/jasmine-html.js"/>
/// <reference path="../../underscore.min.js"/>

describe('function tests', function() {
    describe('bind', function () {
        var context = { name: 'moe' };
        var func = function (arg) { return 'name: ' + (this.name || arg); };
        it('can bind a function to a context', function() {
            var bound = _.bind(func, context);
            expect(bound()).toEqual('name: moe');
        });

        it('can do OO-style binding', function() {
            var bound = _(func).bind(context);
            expect(bound()).toEqual('name: moe');
        });

        it('can bind without specifying a context', function() {
            var bound = _.bind(func, null, 'curly');
            var result = bound();
            // Work around a PhantomJS bug when applying a function with null|undefined.
            expect(result === 'name: curly' || result === 'name: ' + window.name).toBeTruthy();
        });

        it('the function was partially applied in advance', function() {
            func = function(salutation, name) { return salutation + ': ' + name; };
            func = _.bind(func, this, 'hello');
            expect(func('moe')).toEqual('hello: moe');
        });

        it('the function was completely applied in advance', function() {
            func = _.bind(func, this, 'curly');
            expect(func()).toEqual('hello: curly');
        });

        it('the function was partially applied in advance and can accept multiple arguments', function() {
            func = function(salutation, firstname, lastname) { return salutation + ': ' + firstname + ' ' + lastname; };
            func = _.bind(func, this, 'hello', 'moe', 'curly');
            expect(func()).toEqual('hello: moe curly');
        });

        it('binding a primitive to `this` returns a wrapped primitive', function() {
            func = function() { return this; };
            expect(typeof _.bind(func, 0)()).toEqual('object');
        });

        it('can bind a function to `0`', function() {
            expect(_.bind(func, 0)().valueOf()).toEqual(0);
        });
        it('can bind a function to an empty string', function() {
            expect(_.bind(func, '')().valueOf()).toEqual('');
        });
        it('can bind a function to `false`', function() {
            expect(_.bind(func, false)().valueOf()).toEqual(false);
        });


        // These tests are only meaningful when using a browser without a native bind function
        // To test this with a modern browser, set underscore's nativeBind to undefined
        var F = function () { return this; };
        var boundf = _.bind(F, { hello: 'moe curly' });
        var Boundf = boundf; // make eslint happy.
        var newBoundf = new Boundf();
        it('function should not be bound to the context, to comply with ECMAScript 5', function() {
            expect(newBoundf.hello).toEqual(void 0);
        });
        it("When called without the new operator, it's OK to be bound to the context", function() {
            expect(boundf().hello).toEqual('moe curly');
        });
        it('a bound instance is an instance of the original function', function() {
            expect(newBoundf instanceof F).toBeTruthy();
        });

        it('throws an error when binding to a non-function', function() {
            expect(function() { _.bind('notafunction'); }).toThrowError(TypeError);
        });

    });

    describe('partial', function () {
        var obj = { name: 'moe' };
        var func = function () { return this.name + ' ' + _.toArray(arguments).join(' '); };

        it('can partially apply', function() {
            obj.func = _.partial(func, 'a', 'b');
            expect(obj.func('c', 'd')).toEqual('moe a b c d');
        });

        it('can partially apply with placeholders', function() {
            obj.func = _.partial(func, _, 'b', _, 'd');
            expect(obj.func('a', 'c')).toEqual('moe a b c d');
        });

        it('accepts more and fewer arguments than the number of placeholders', function() {
            func = _.partial(function() { return arguments.length; }, _, 'b', _, 'd');
            expect(func('a', 'c', 'e')).toEqual(5);
            expect(func('a')).toEqual(4);
        });

        it('unfilled placeholders are undefined', function() {
            func = _.partial(function() { return typeof arguments[2]; }, _, 'b', _, 'd');
            expect(func('a')).toEqual('undefined');
        });

        describe('passes context', function() {
            function MyWidget(name, options) {
                this.name = name;
                this.options = options;
            }

            MyWidget.prototype.get = function() {
                return this.name;
            };
            var MyWidgetWithCoolOpts = _.partial(MyWidget, _, { a: 1 });
            var widget = new MyWidgetWithCoolOpts('foo');
            it('Can partially bind a constructor', function() {
                expect(widget instanceof MyWidget).toBeTruthy();
            });
            it('keeps prototype', function() {
                expect(widget.get()).toEqual('foo');
                expect(widget.options).toEqual({ a: 1 });
            });
        });

        it('allows the placeholder to be swapped out', function() {
            _.partial.placeholder = obj;
            func = _.partial(function() { return arguments.length; }, obj, 'b', obj, 'd');
            expect(func('a')).toEqual(4);
        });

        it('swapping the placeholder preserves previously bound arguments', function() {
            _.partial.placeholder = {};
            func = _.partial(function() { return arguments.length; }, obj, 'b', obj, 'd');
            expect(func('a')).toEqual(5);
        });
        

        _.partial.placeholder = _;
    });

    describe('bindAll', function () {
        describe('normal bind', function() {
            var curly = { name: 'curly' };
            var moe = {
                name: 'moe',
                getName: function() { return 'name: ' + this.name; },
                sayHi: function() { return 'hi: ' + this.name; }
            };
            curly.getName = moe.getName;
            _.bindAll(moe, 'getName', 'sayHi');
            curly.sayHi = moe.sayHi;
            it('unbound function is bound to current object', function() {
                expect(curly.getName()).toEqual('name: curly');
            });
            it('bound function is still bound to original object', function() {
                expect(curly.sayHi()).toEqual('hi: moe');
            });

        });

        describe('exception bind and other cases', function() {
            var curly = { name: 'curly' };
            var moe = {
                name: 'moe',
                getName: function() { return 'name: ' + this.name; },
                sayHi: function() { return 'hi: ' + this.name; },
                sayLast: function() { return this.sayHi(_.last(arguments)); }
            };
            it('throws an error for bindAll with no functions named', function() {
                expect(function() { _.bindAll(moe); }).toThrowError(Error);
            });
            it('throws an error for bindAll if the given key is undefined', function() {
                expect(function() { _.bindAll(moe, 'sayBye'); }).toThrowError(TypeError);
            });
            it('throws an error for bindAll if the given key is not a function', function() {
                expect(function() { _.bindAll(moe, 'name'); }).toThrowError(TypeError);
            });
            

            _.bindAll(moe, 'sayHi', 'sayLast');
            curly.sayHi = moe.sayHi;
            it('sayHi', function() {
                expect(curly.sayHi()).toEqual('hi: moe');
            });
            

            var sayLast = moe.sayLast;
            it('createCallback works with any number of arguments', function() {
                expect(sayLast(1, 2, 3, 4, 5, 6, 7, 'Tom')).toEqual('hi: moe');
            });

            it('flattens arguments into a single list', function() {
                _.bindAll(moe, ['getName']);
                var getName = moe.getName;
                expect(getName()).toEqual('name: moe');
            });

        });

    });

    describe('memoize', function () {
        it('a memoized version of fibonacci produces identical results', function() {
            var fib = function(n) {
                return n < 2 ? n : fib(n - 1) + fib(n - 2);
            };
            expect(fib(10)).toEqual(55);
            fib = _.memoize(fib); // Redefine `fib` for memoization
            expect(fib(10)).toEqual(55);
        });

        it('checks hasOwnProperty', function() {
            var o = function(str) {
                return str;
            };
            var fastO = _.memoize(o);
            expect(o('toString')).toEqual('toString');
            expect(fastO('toString')).toEqual('toString');
        });

        it('Expose the cache.', function() {
            var upper = _.memoize(function(s) {
                return s.toUpperCase();
            });
            expect(upper('foo')).toEqual('FOO');
            expect(upper('bar')).toEqual('BAR');
            expect(upper.cache).toEqual({ foo: 'FOO', bar: 'BAR' });
            upper.cache = { foo: 'BAR', bar: 'FOO' };
            expect(upper('foo')).toEqual('BAR');
            expect(upper('bar')).toEqual('FOO');
        });
        // 

        it('hasher doesn\'t change keys', function() {
            var hashed = _.memoize(function(key) {
                //https://github.com/jashkenas/underscore/pull/1679#discussion_r13736209
                expect(/[a-z]+/.test(key)).toBeTruthy();
                return key;
            }, function(key) {
                return key.toUpperCase();
            });
            hashed('yep');
            expect(hashed.cache).toEqual({ YEP: 'yep' });
        });

        it('object is created if second argument used as key', function() {
            // Test that the hash function can be used to swizzle the key.
            var objCacher = _.memoize(function(value, key) {
                return { key: key, value: value };
            }, function(value, key) {
                return key;
            });
            var myObj = objCacher('a', 'alpha');
            var myObjAlias = objCacher('b', 'alpha');
            expect(myObj).not.toEqual(void 0);
            expect(myObj).toEqual(myObjAlias);
            expect(myObj.value).toEqual('a');
        });

    });

    describe('delay', function () {
        var delayed = false;
        _.delay(function () { delayed = true; }, 100);
        it("didn't delay the function quite yet", function() {
            setTimeout(function() { expect(delayed).toBeTruthy(); }, 50);
        });
        it('delayed the function', function() {
            setTimeout(function() { expect(delayed).toBeFalsy(); }, 150);
        });

    });

    describe('defer', function () {
        var deferred = false;
        _.defer(function (bool) { deferred = bool; }, true);
        it('deferred the function', function() {
            _.delay(function() { expect(deferred).toBeTruthy(); }, 50);
        });

    });

    describe('throttle', function () {
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = _.throttle(incr, 32);
        throttledIncr(); throttledIncr();
        it('incr was called immediately', function() {
            expect(counter).toEqual(1);
        });
        it('incr was throttled', function() {
            _.delay(function() { expect(counter).toEqual(2); }, 64);
        });

    });

    describe('throttle arguments', function () {
        var value = 0;
        var update = function (val) { value = val; };
        var throttledUpdate = _.throttle(update, 32);
        throttledUpdate(1); throttledUpdate(2);
        _.delay(function () { throttledUpdate(3); }, 64);
        it('updated to latest value', function() {
            expect(value).toEqual(1);
        });
        it('updated to latest value', function() {
            _.delay(function() { expect(value).toEqual(3); }, 96);
        });

    });

    describe('throttle once', function () {
        var counter = 0;
        var incr = function () { return ++counter; };
        var throttledIncr = _.throttle(incr, 32);
        var result = throttledIncr();
        it('throttled functions return their value', function() {
            _.delay(function() {
                expect(result).toEqual(1);
                expect(counter).toEqual(1);
            }, 64);
        });

    });2

    describe('throttle twice', function () {
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = _.throttle(incr, 32);
        throttledIncr(); throttledIncr();
        it('incr was called twice', function() {
            _.delay(function() { expect(counter).toEqual(2); }, 64);
        });

    });

    it('more throttling', function () {
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = _.throttle(incr, 30);
        throttledIncr(); throttledIncr();
        expect(counter, 1);
        _.delay(function () {
            expect(counter).toEqual(2);
            throttledIncr();
            expect(counter).toEqual(3);
        }, 85);
    });

    describe('throttle repeatedly with results', function () {
        var counter = 0;
        var incr = function () { return ++counter; };
        var throttledIncr = _.throttle(incr, 100);
        var results = [];
        var saveResult = function () { results.push(throttledIncr()); };
        saveResult(); saveResult();
        _.delay(saveResult, 50);
        _.delay(saveResult, 150);
        _.delay(saveResult, 160);
        _.delay(saveResult, 230);
        it('incr was called once', function() {
            _.delay(function() {
                expect(results[0]).toEqual(1);
                expect(results[1]).toEqual(1);
                expect(results[2]).toEqual(1);
                expect(results[3]).toEqual(2);
                expect(results[4]).toEqual(2);
                expect(results[5]).toEqual(3);
            }, 300);
        });

    });

    it('throttle triggers trailing call when invoked repeatedly', function () {
        var counter = 0;
        var limit = 48;
        var incr = function () { counter++; };
        var throttledIncr = _.throttle(incr, 32);

        var stamp = new Date;
        while (new Date - stamp < limit) {
            throttledIncr();
        }
        var lastCount = counter;
        expect(counter > 1).toBeFalsy();

        _.delay(function () {
            expect(counter > lastCount).toBeTruthy();
        }, 96);
    });

    it('throttle does not trigger leading call when leading is set to false', function () {
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = _.throttle(incr, 60, { leading: false });

        throttledIncr(); throttledIncr();
        expect(counter).toEqual(0);

        _.delay(function () {
            expect(counter).toEqual(1);
        }, 96);
    });

    it('more throttle does not trigger leading call when leading is set to false', function () {
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = _.throttle(incr, 100, { leading: false });

        throttledIncr();
        _.delay(throttledIncr, 50);
        _.delay(throttledIncr, 60);
        _.delay(throttledIncr, 200);
        expect(counter, 0);

        _.delay(function () {
            expect(counter).toEqual(1);
        }, 250);

        _.delay(function () {
            expect(counter).toEqual(2);
        }, 350);
    });

    it('one more throttle with leading: false test', function () {
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = _.throttle(incr, 100, { leading: false });

        var time = new Date;
        while (new Date - time < 350) throttledIncr();
        expect(counter <= 3).toBeTruthy();

        _.delay(function () {
            expect(counter <= 4).toBeTruthy();
        }, 200);
    });

    it('throttle does not trigger trailing call when trailing is set to false', function () {
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = _.throttle(incr, 60, { trailing: false });

        throttledIncr(); throttledIncr(); throttledIncr();
        expect(counter).toEqual(1);

        _.delay(function () {
            expect(counter).toEqual(1);

            throttledIncr(); throttledIncr();
            expect(counter).toEqual(2);

            _.delay(function () {
                expect(counter).toEqual(2);
            }, 96);
        }, 96);
    });

    it('throttle continues to function after system time is set backwards', function () {
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = _.throttle(incr, 100);
        var origNowFunc = _.now;

        throttledIncr();
        expect(counter).toEqual(1);
        _.now = function () {
            return new Date(2013, 0, 1, 1, 1, 1);
        };

        _.delay(function () {
            throttledIncr();
            expect(counter).toEqual(2);
            _.now = origNowFunc;
        }, 200);
    });

    describe('throttle re-entrant', function () {
        var sequence = [
          ['b1', 'b2'],
          ['c1', 'c2']
        ];
        var value = '';
        var throttledAppend;
        var append = function (arg) {
            value += this + arg;
            var args = sequence.pop();
            if (args) {
                throttledAppend.call(args[0], args[1]);
            }
        };
        throttledAppend = _.throttle(append, 32);
        throttledAppend.call('a1', 'a2');
        it('append was throttled successfully', function() {
            expect(value).toEqual('a1a2');
            _.delay(function() {
                expect(value).toEqual('a1a2c1c2b1b2');
            }, 100);
        });

    });

    describe('throttle cancel', function () {
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = _.throttle(incr, 32);
        throttledIncr();
        throttledIncr.cancel();
        throttledIncr();
        throttledIncr();
        it('incr was called immediately', function() {
            expect(counter).toEqual(2);
        });
        it('incr was throttled', function() {
            _.delay(function() { expect(counter).toEqual(3); }, 64);
        });

    });

    describe('throttle cancel with leading: false', function () {
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = _.throttle(incr, 32, { leading: false });
        throttledIncr();
        throttledIncr.cancel();
        it('incr was throttled', function() {
            expect(counter).toEqual(0);
        });
        it('incr was throttled', function() {
            _.delay(function() { expect(counter).toEqual(0); }, 64);
        });

    });

    describe('debounce', function () {
        var counter = 0;
        var incr = function () { counter++; };
        var debouncedIncr = _.debounce(incr, 32);
        debouncedIncr(); debouncedIncr();
        _.delay(debouncedIncr, 16);
        it('incr was debounced', function() {
            _.delay(function() { expect(counter).toEqual(1); }, 96);
        });

    });

    describe('debounce cancel', function () {
        var counter = 0;
        var incr = function () { counter++; };
        var debouncedIncr = _.debounce(incr, 32);
        debouncedIncr();
        debouncedIncr.cancel();
        it('incr was not called', function() {
            _.delay(function() { expect(counter).toEqual(0); }, 96);
        });

    });

    describe('debounce asap', function () {
        var a, b, c;
        var counter = 0;
        var incr = function () { return ++counter; };
        var debouncedIncr = _.debounce(incr, 64, true);
        a = debouncedIncr();
        b = debouncedIncr();
        it('incr was called immediately', function() {
            expect(a).toEqual(1);
            expect(b).toEqual(1);
            expect(counter).toEqual(1);
        });
        
        _.delay(debouncedIncr, 16);
        _.delay(debouncedIncr, 32);
        _.delay(debouncedIncr, 48);
        it('incr was debounced', function() {
            _.delay(function() {
                expect(counter).toEqual(1);
                c = debouncedIncr();
                expect(c).toEqual(2);
                expect(counter).toEqual(2);
            }, 128);
        });

    });

    describe('debounce asap cancel', function () {
        var a, b;
        var counter = 0;
        var incr = function () { return ++counter; };
        var debouncedIncr = _.debounce(incr, 64, true);
        a = debouncedIncr();
        debouncedIncr.cancel();
        b = debouncedIncr();
        it('incr was called immediately', function() {
            expect(a).toEqual(1);
            expect(b).toEqual(2);
            expect(counter).toEqual(2);
        });
        
        _.delay(debouncedIncr, 16);
        _.delay(debouncedIncr, 32);
        _.delay(debouncedIncr, 48);
        it('incr was debounced', function() {
            _.delay(function() { expect(counter).toEqual(2); }, 128);
        });

    });

    describe('debounce asap recursively', function () {
        var counter = 0;
        var debouncedIncr = _.debounce(function () {
            counter++;
            if (counter < 10) debouncedIncr();
        }, 32, true);
        debouncedIncr();
        it('incr was called immediately', function() {
            expect(counter).toEqual(1);
        });
        it('incr was debounced', function() {
            _.delay(function() {
                expect(counter).toEqual(1);
            }, 96);
        });

    });

    describe('debounce after system time is set backwards', function () {
        var counter = 0;
        var origNowFunc = _.now;
        var debouncedIncr = _.debounce(function () {
            counter++;
        }, 100, true);

        debouncedIncr();
        it('incr was called immediately', function() {
            expect(counter).toEqual(1);
        });

        _.now = function () {
            return new Date(2013, 0, 1, 1, 1, 1);
        };
        it('incr was debounced successfully', function() {
            _.delay(function() {
                debouncedIncr();
                expect(counter).toEqual(2);
                _.now = origNowFunc;
            }, 200);
        });

    });

    describe('debounce re-entrant', function () {
        var sequence = [
          ['b1', 'b2']
        ];
        var value = '';
        var debouncedAppend;
        var append = function (arg) {
            value += this + arg;
            var args = sequence.pop();
            if (args) {
                debouncedAppend.call(args[0], args[1]);
            }
        };
        debouncedAppend = _.debounce(append, 32);
        it('append was debounced successfully', function() {
            debouncedAppend.call('a1', 'a2');
            expect(value).toEqual('');
            _.delay(function() {
                expect(value).toEqual('a1a2b1b2');
            }, 100);
        });

    });

    describe('once', function () {
        var num = 0;
        var increment = _.once(function () { return ++num; });
        increment();
        increment();
        it('stores a memo to the last value', function() {
            expect(num).toEqual(1);

            expect(increment()).toEqual(1);
        });

    });

    it('Recursive onced function.', function () {
        var f = _.once(function () {
            expect(true).toBeTruthy();
            f();
        });
        f();
    });

    it('wrap', function () {
        var greet = function (name) { return 'hi: ' + name; };
        var backwards = _.wrap(greet, function (func, name) { return func(name) + ' ' + name.split('').reverse().join(''); });
        expect(backwards('moe')).toEqual('hi: moe eom');

        var inner = function () { return 'Hello '; };
        var obj = { name: 'Moe' };
        obj.hi = _.wrap(inner, function (fn) { return fn() + this.name; });
        expect(obj.hi()).toEqual('Hello Moe');

        var noop = function () { };
        var wrapped = _.wrap(noop, function () { return Array.prototype.slice.call(arguments, 0); });
        var ret = wrapped(['whats', 'your'], 'vector', 'victor');
        expect(ret).toEqual([noop, ['whats', 'your'], 'vector', 'victor']);
    });

    describe('negate', function () {
        var isOdd = function (n) { return n & 1; };
        it('should return the complement of the given function', function() {
            expect(_.negate(isOdd)(2)).toEqual(true);
        });
        it('should return the complement of the given function', function() {
            expect(_.negate(isOdd)(3)).toEqual(false);
        });

    });

    describe('compose', function () {
        var greet = function (name) { return 'hi: ' + name; };
        var exclaim = function (sentence) { return sentence + '!'; };
        it('can compose a function that takes another', function() {
            var composed = _.compose(exclaim, greet);
            expect(composed('moe')).toEqual('hi: moe!');
        });

        it('in this case, the functions are also commutative', function() {
            var composed = _.compose(greet, exclaim);
            expect(composed('moe')).toEqual('hi: moe!');
        });

        it('Composed function is called', function() {
            // f(g(h(x, y, z)))
            function h(x, y, z) {
                expect(arguments.length).toEqual(3);
                return z * y;
            }

            function g(x) {
                expect(arguments.length).toEqual(1);
                return x;
            }

            function f(x) {
                expect(arguments.length).toEqual(1);
                return x * 2;
            }

            var composed = _.compose(f, g, h);
            expect(composed(1, 2, 3)).toEqual(12);
        });

    });

    describe('after', function () {
        var testAfter = function (afterAmount, timesCalled) {
            var afterCalled = 0;
            var after = _.after(afterAmount, function () {
                afterCalled++;
            });
            while (timesCalled--) after();
            return afterCalled;
        };
        it('after(N) should fire after being called N times', function() {
            expect(testAfter(5, 5)).toEqual(1);
        });
        it('after(N) should not fire unless called N times', function() {
            expect(testAfter(5, 4)).toEqual(0);
        });
        it('after(0) should not fire immediately', function() {
            expect(testAfter(0, 0)).toEqual(0);
        });
        it('after(0) should fire when first invoked', function() {
            expect(testAfter(0, 1)).toEqual(1);
        });

    });

    describe('before', function () {
        var testBefore = function (beforeAmount, timesCalled) {
            var beforeCalled = 0;
            var before = _.before(beforeAmount, function () { beforeCalled++; });
            while (timesCalled--) before();
            return beforeCalled;
        };
        it('before(N) should not fire after being called N times', function() {
            expect(testBefore(5, 5)).toEqual(4);
        });
        it('before(N) should fire before being called N times', function() {
            expect(testBefore(5, 4)).toEqual(4);
        });
        it('before(0) should not fire immediately', function() {
            expect(testBefore(0, 0)).toEqual(0);
        });
        it('before(0) should not fire when first invoked', function() {
            expect(testBefore(0, 1)).toEqual(0);
        });
        

        var context = { num: 0 };
        var increment = _.before(3, function () { return ++this.num; });
        _.times(10, increment, context);
        it('stores a memo to the last value', function() {
            expect(increment()).toEqual(2);
        });
        it('provides context', function() {
            expect(context.num).toEqual(2);
        });

    });

    describe('iteratee', function () {
        it('_.iteratee is exposed as an external function.', function() {
            var identity = _.iteratee();
            expect(identity).toEqual(_.identity);
        });

        it('fn with arguments', function() {
            function fn() {
                return arguments;
            }

            _.each([_.iteratee(fn), _.iteratee(fn, {})], function(cb) {
                expect(cb().length).toEqual(0);
                expect(_.toArray(cb(1, 2, 3))).toEqual(_.range(1, 4));
                expect(_.toArray(cb(1, 2, 3, 4, 5, 6, 7, 8, 9, 10))).toEqual(_.range(1, 11));
            });
        });

        it('treats an array as a deep property accessor', function() {
            var deepProperty = _.iteratee(['a', 'b']);
            expect(deepProperty({ a: { b: 2 } })).toEqual(2);
        });


        it('Test all methods that claim to be transformed through `_.iteratee`', function() {
            // Test custom iteratee
            var builtinIteratee = _.iteratee;
            _.iteratee = function(value) {
                // RegEx values return a function that returns the number of matches
                if (_.isRegExp(value))
                    return function(obj) {
                        return (obj.match(value) || []).length;
                    };
                return value;
            };

            var collection = ['foo', 'bar', 'bbiz'];

            // 
            expect(_.countBy(collection, /b/g)).toEqual({ 0: 1, 1: 1, 2: 1 });
            expect(_.every(collection, /b/g)).toEqual(false);
            expect(_.filter(collection, /b/g)).toEqual(['bar', 'bbiz']);
            expect(_.find(collection, /b/g)).toEqual('bar');
            expect(_.findIndex(collection, /b/g)).toEqual(1);
            expect(_.findKey(collection, /b/g)).toEqual('1');
            expect(_.findLastIndex(collection, /b/g)).toEqual(2);
            expect(_.groupBy(collection, /b/g)).toEqual({ 0: ['foo'], 1: ['bar'], 2: ['bbiz'] });
            expect(_.indexBy(collection, /b/g)).toEqual({ 0: 'foo', 1: 'bar', 2: 'bbiz' });
            expect(_.map(collection, /b/g)).toEqual([0, 1, 2]);
            expect(_.max(collection, /b/g)).toEqual('bbiz');
            expect(_.min(collection, /b/g)).toEqual('foo');
            expect(_.partition(collection, /b/g)).toEqual([['bar', 'bbiz'], ['foo']]);
            expect(_.reject(collection, /b/g)).toEqual(['foo']);
            expect(_.some(collection, /b/g)).toEqual(true);
            expect(_.sortBy(collection, /b/g)).toEqual(['foo', 'bar', 'bbiz']);
            expect(_.sortedIndex(collection, 'blah', /b/g)).toEqual(1);
            expect(_.uniq(collection, /b/g)).toEqual(['foo', 'bar', 'bbiz']);

            var objCollection = { a: 'foo', b: 'bar', c: 'bbiz' };
            expect(_.mapObject(objCollection, /b/g)).toEqual({ a: 0, b: 1, c: 2 });

            // Restore the builtin iteratee
            _.iteratee = builtinIteratee;
        });

    });

    describe('restArgs', function () {
        it('collects rest arguments into an array', function() {
            _.restArgs(function(a, args) {
                expect(a).toEqual(1);
                expect(args).toEqual([2, 3]);
            })(1, 2, 3);
        });

        it('passes empty array if there are not enough arguments', function() {
            _.restArgs(function(a, args) {
                expect(a, void 0);
                expect(args).toEqual([]);
            })();
        });

        it('works on functions with many named parameters', function() {
            _.restArgs(function(a, b, c, args) {
                expect(arguments.length).toEqual(4);
                expect(args).toEqual([4, 5]);
            })(1, 2, 3, 4, 5);
        });

        it('invokes function with this context', function() {
            var obj = {};
            _.restArgs(function() {
                expect(this).toEqual(obj);
            }).call(obj);
        });

        it('startIndex can be used manually specify index of rest parameter', function() {
            _.restArgs(function(array, iteratee, context) {
                expect(array).toEqual([1, 2, 3, 4]);
                expect(iteratee).toEqual(void 0);
                expect(context).toEqual(void 0);
            }, 0)(1, 2, 3, 4);
        });

    });
});