angular.module('myApp.region', ['myApp.url'])
    .factory('appRegionService', function (generalHttpService) {
        return {
            initializeCities: function () {
                return generalHttpService.getApiData('CityList', {});
            },
            queryDistricts: function (cityName) {
                return generalHttpService.getApiData('CityList', {
                    city: cityName
                });
            },
            queryDistrictInfrastructures: function (cityName) {
                return generalHttpService.getApiData('RegionStats', {
                    city: cityName
                });
            },
            queryTowns: function (cityName, districtName) {
                return generalHttpService.getApiData('CityList', {
                    city: cityName,
                    district: districtName
                });
            },
            queryTownInfrastructures: function (cityName, districtName) {
                return generalHttpService.getApiData('RegionStats', {
                    city: cityName,
                    district: districtName
                });
            },
            queryTown: function(city, district, town) {
                return generalHttpService.getApiData('Town', {
                    city: city,
                    district: district,
                    town: town
                });
            },
            queryENodebTown: function (eNodebId) {
                return generalHttpService.getApiData('Town', {
                    eNodebId: eNodebId
                });
            },
            accumulateCityStat: function (stats, cityName) {
                var cityStat = {
                    district: cityName,
                    totalLteENodebs: 0,
                    totalLteCells: 0,
                    totalCdmaBts: 0,
                    totalCdmaCells: 0
                };
                angular.forEach(stats, function(stat) {
                    cityStat.totalLteENodebs += stat.totalLteENodebs;
                    cityStat.totalLteCells += stat.totalLteCells;
                    cityStat.totalCdmaBts += stat.totalCdmaBts;
                    cityStat.totalCdmaCells += stat.totalCdmaCells;
                });
                stats.push(cityStat);
            }
        };
    })
    .factory('appFormatService', function() {
        return {
            getDate: function (strDate) {
                var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
                    function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
                return date;
            },
            getUTCTime: function(strDate) {
                var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
                    function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
                return Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
            },
            getDateString: function(dateTime, fmt) {
                var o = {
                    "M+": dateTime.getMonth() + 1, //月份 
                    "d+": dateTime.getDate(), //日 
                    "h+": dateTime.getHours(), //小时 
                    "m+": dateTime.getMinutes(), //分 
                    "s+": dateTime.getSeconds(), //秒 
                    "q+": Math.floor((dateTime.getMonth() + 3) / 3), //季度 
                    "S": dateTime.getMilliseconds() //毫秒 
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (o.hasOwnProperty(k))
                        if (new RegExp("(" + k + ")").test(fmt))
                            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            },
            lowerFirstLetter: function(str) {
                return str.substring(0, 1).toLowerCase() +
                    str.substring(1);
            },
            getId: function(name) {
                return window.document !== undefined && document.getElementById && document.getElementById(name);
            },
            queryEscapeText: function(s) {
                if (!s) {
                    return "";
                }
                s = s + "";

                // Both single quotes and double quotes (for attributes)
                return s.replace(/['"<>&]/g, function (ss) {
                    switch (ss) {
                        case "'":
                            return "&#039;";
                        case "\"":
                            return "&quot;";
                        case "<":
                            return "&lt;";
                        case ">":
                            return "&gt;";
                        case "&":
                            return "&amp;";
                        default:
                            return "";
                    }
                });
            },
            getUrlParams: function() {
                var urlParams = {};
                var params = window.location.search.slice(1).split("&");

                if (params[0]) {
                    angular.forEach(params, function(param) {
                        var current = param.split("=");
                        current[0] = decodeURIComponent(current[0]);

                        // allow just a key to turn on a flag, e.g., test.html?noglobals
                        current[1] = current[1] ? decodeURIComponent(current[1]) : true;
                        if (urlParams[current[0]]) {
                            urlParams[current[0]] = [].concat(urlParams[current[0]], current[1]);
                        } else {
                            urlParams[current[0]] = current[1];
                        }
                    });
                }

                return urlParams;
            },
            searchText: function(options, matchFunction) {
                for (var i = 0; i < options.length; i++) {
                    if (matchFunction(options[i])) {
                        return options[i];
                    }
                }
                return null;
            },
            searchPattern: function(options, text) {
                for (var i = 0; i < options.length; i++) {
                    var pattern = new RegExp(options[i]);
                    if (pattern.test(text)) {
                        return options[i];
                    }
                }
                return null;
            },
            calculateAverages: function(data, queryFunctions) {
                var outputs = [];
                angular.forEach(queryFunctions, function(func) {
                    outputs.push({
                        sum: 0,
                        count: 0
                    });
                });
                angular.forEach(data, function(item) {
                    angular.forEach(queryFunctions, function(func, index) {
                        var value = func(item);
                        if (value !== 0) {
                            outputs[index].sum += value;
                            outputs[index].count += 1;
                        }
                    });
                });
                return outputs;
            },
            prefixInteger: function(num, length) {
                return (Array(length).join('0') + num).slice(-length);
            }
        }
    });