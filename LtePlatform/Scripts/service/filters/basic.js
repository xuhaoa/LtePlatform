angular.module('basic.filters', [])
    .filter("percentage", function() {
        return function(input) {
            return angular.isNumber(input) ? input * 100 : parseFloat(input) * 100;
        };
    });