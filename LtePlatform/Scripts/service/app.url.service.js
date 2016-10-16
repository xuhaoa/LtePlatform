angular.module('myApp.url', [])
    .factory('appUrlService', function() {
        var parseQueryString = function(queryString) {
            var data = {}, pair, separatorIndex, escapedKey, escapedValue, key, value;

            if (queryString === null || queryString === undefined) {
                return data;
            }

            var pairs = queryString.split("?")[1].split("&");

            for (var i = 0; i < pairs.length; i++) {
                pair = pairs[i];
                separatorIndex = pair.indexOf("=");

                if (separatorIndex === -1) {
                    escapedKey = pair;
                    escapedValue = null;
                } else {
                    escapedKey = pair.substr(0, separatorIndex);
                    escapedValue = pair.substr(separatorIndex + 1);
                }

                key = decodeURIComponent(escapedKey);
                value = decodeURIComponent(escapedValue);

                data[key] = value;
            }

            return data;
        };
        var getFragment = function() {
            if (window.location.hash.indexOf("#") === 0) {
                var queryString = window.location.hash.replace("/", "?");
                return parseQueryString(queryString);
            } else {
                return {};
            }
        };
        var initializeAuthorization = function() {
            if (!sessionStorage.getItem("accessToken")) {
                var fragment = getFragment();

                if (fragment.access_token) {
                    // returning with access token, restore old hash, or at least hide token
                    window.location.hash = fragment.state || '';
                    sessionStorage.setItem("accessToken", fragment.access_token);
                } else {
                    // no token - so bounce to Authorize endpoint in AccountController to sign in or register
                    window.location = "/Account/Authorize?client_id=web&response_type=token&state=" + encodeURIComponent(window.location.hash);
                }
            }
        };
        var getAccessToken = function() {
            var token = sessionStorage.getItem("accessToken");
            if (!token) initializeAuthorization();
            return token || sessionStorage.getItem("accessToken");
        };
        return {
            getApiUrl: function(topic) {
                return '/api/' + topic;
            },
            userInfoUrl: "/api/Me",
            siteUrl: "/",
            parseQueryString: parseQueryString,
            getAccessToken: getAccessToken,
            initializeAuthorization: initializeAuthorization,
            getPlanUrlHost: function() {
                return (window.location.hostname === '219.128.254.41') ? 'http://219.128.254.36:8002/' : 'http://10.17.165.111:8002/';
            },
            getDtUrlHost: function() {
                return (window.location.hostname === '219.128.254.41') ? 'http://219.128.254.41:2888/' : 'http://10.17.165.100:2888/';
            },
            getParameterUrlHost: function() {
                return (window.location.hostname === '219.128.254.41') ? 'http://219.128.254.36:8001/' : 'http://10.17.165.111:8001/';
            }
        };
    })
    .factory('generalHttpService', function ($q, $http, appUrlService) {
        return {
            getMvcData: function (topic, params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: topic,
                    params: params
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            getApiData: function(topic, params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl(topic),
                    params: params
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            getApiDataWithHeading: function (topic, params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl(topic),
                    params: params,
                    headers: {
                        'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                    }
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            postApiData: function(topic, data) {
                var deferred = $q.defer();
                $http.post(appUrlService.getApiUrl(topic), data)
                    .success(function (result) {
                        deferred.resolve(result);
                    })
                    .error(function (reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            postApiDataWithHeading: function (topic, data) {
                var deferred = $q.defer();
                $http({
                        method: 'POST',
                        url: appUrlService.getApiUrl(topic),
                        data: data,
                        headers: {
                            'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                        }
                    }).success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            putApiData: function (topic, data) {
                var deferred = $q.defer();
                $http.put(appUrlService.getApiUrl(topic), data)
                    .success(function (result) {
                        deferred.resolve(result);
                    })
                    .error(function (reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            deleteApiData: function(topic) {
                var deferred = $q.defer();
                $http.delete(appUrlService.getApiUrl(topic)).success(function (result) {
                    deferred.resolve(result);
                })
                    .error(function (reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            }
        };
    })
    .factory('menuItemService', function() {
        return {
            updateMenuItem: function (items, index, title, url, masterName) {
                if (index >= items.length) return;
                masterName = masterName || "";
                var subItems = items[index].subItems;
                for (var i = 0; i < subItems.length; i++) {
                    if (subItems[i].displayName === title) return;
                }
                subItems.push({
                    displayName: title,
                    url: url,
                    masterName: masterName
                });
                angular.forEach(items, function(item) {
                    item.isActive = false;
                });
                items[index].isActive = true;
            }
        };
    })
    .factory('appFormatService', function () {
        return {
            getDate: function (strDate) {
                var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
                    function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
                return date;
            },
            getUTCTime: function (strDate) {
                var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
                    function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
                return Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
            },
            getDateString: function (dateTime, fmt) {
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
            lowerFirstLetter: function (str) {
                return str.substring(0, 1).toLowerCase() +
                    str.substring(1);
            },
            getId: function (name) {
                return window.document !== undefined && document.getElementById && document.getElementById(name);
            },
            queryEscapeText: function (s) {
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
            getUrlParams: function () {
                var urlParams = {};
                var params = window.location.search.slice(1).split("&");

                if (params[0]) {
                    angular.forEach(params, function (param) {
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
            searchText: function (options, matchFunction) {
                for (var i = 0; i < options.length; i++) {
                    if (matchFunction(options[i])) {
                        return options[i];
                    }
                }
                return null;
            },
            searchPattern: function (options, text) {
                for (var i = 0; i < options.length; i++) {
                    var pattern = new RegExp(options[i]);
                    if (pattern.test(text)) {
                        return options[i];
                    }
                }
                return null;
            },
            calculateAverages: function (data, queryFunctions) {
                var outputs = [];
                angular.forEach(queryFunctions, function (func) {
                    outputs.push({
                        sum: 0,
                        count: 0
                    });
                });
                angular.forEach(data, function (item) {
                    angular.forEach(queryFunctions, function (func, index) {
                        var value = func(item);
                        if (value !== 0) {
                            outputs[index].sum += value;
                            outputs[index].count += 1;
                        }
                    });
                });
                return outputs;
            },
            prefixInteger: function (num, length) {
                return (Array(length).join('0') + num).slice(-length);
            }
        }
    })
    .factory('neGeometryService', function () {
        var isLongtituteValid = function (longtitute) {
            return (!isNaN(longtitute)) && longtitute > 112 && longtitute < 114;
        };

        var isLattituteValid = function (lattitute) {
            return (!isNaN(lattitute)) && lattitute > 22 && lattitute < 24;
        };

        var isLonLatValid = function (item) {
            return isLongtituteValid(item.longtitute) && isLattituteValid(item.lattitute);
        };

        var mapLonLat = function (source, destination) {
            source.longtitute = destination.longtitute;
            source.lattitute = destination.lattitute;
        };

        return {
            queryENodebLonLatEdits: function (eNodebs) {
                var result = [];
                for (var index = 0; index < eNodebs.length; index++) {
                    if (!isLonLatValid(eNodebs[index])) {
                        result.push({
                            index: index,
                            eNodebId: eNodebs[index].eNodebId,
                            name: eNodebs[index].name,
                            district: eNodebs[index].districtName,
                            town: eNodebs[index].townName,
                            longtitute: eNodebs[index].longtitute,
                            lattitute: eNodebs[index].lattitute
                        });
                    }
                }
                return result;
            },
            queryBtsLonLatEdits: function (btss) {
                var result = [];
                for (var index = 0; index < btss.length; index++) {
                    if (!isLonLatValid(btss[index])) {
                        result.push({
                            index: index,
                            bscId: btss[index].bscId,
                            btsId: btss[index].btsId,
                            name: btss[index].name,
                            districtName: btss[index].districtName,
                            longtitute: eNodebs[index].longtitute,
                            lattitute: eNodebs[index].lattitute
                        });
                    }
                }
                return result;
            },
            queryCellLonLatEdits: function (cells) {
                var result = [];
                for (var index = 0; index < cells.length; index++) {
                    if (!isLonLatValid(cells[index])) {
                        result.push({
                            index: index,
                            eNodebId: cells[index].eNodebId,
                            sectorId: cells[index].sectorId,
                            frequency: cells[index].frequency,
                            isIndoor: cells[index].isIndoor,
                            longtitute: cells[index].longtitute,
                            lattitute: cells[index].lattitute
                        });
                    }
                }
                return result;
            },
            queryCdmaCellLonLatEdits: function (cells) {
                var result = [];
                for (var index = 0; index < cells.length; index++) {
                    if (!isLonLatValid(cells[index])) {
                        result.push({
                            index: index,
                            btsId: cells[index].btsId,
                            sectorId: cells[index].sectorId,
                            frequency: cells[index].frequency,
                            isIndoor: cells[index].isIndoor,
                            longtitute: cells[index].longtitute,
                            lattitute: cells[index].lattitute
                        });
                    }
                }
                return result;
            },
            mapLonLatEdits: function (sourceFunc, destList) {
                var sourceList = sourceFunc();
                for (var i = 0; i < destList.length; i++) {
                    destList[i].longtitute = parseFloat(destList[i].longtitute);
                    destList[i].lattitute = parseFloat(destList[i].lattitute);
                    if (isLonLatValid(destList[i])) {
                        console.log(destList[i]);
                        mapLonLat(sourceList[destList[i].index], destList[i]);
                    }
                }
                sourceFunc(sourceList);
            }
        };
    })
    .factory('generalChartService', function () {
        return {
            getPieOptions: function (data, setting, subNameFunc, subDataFunc) {
                var chart = new GradientPie();
                chart.title.text = setting.title;
                chart.series[0].name = setting.seriesTitle;
                angular.forEach(data, function (subData) {
                    chart.series[0].data.push({
                        name: subNameFunc(subData),
                        y: subDataFunc(subData)
                    });
                });
                return chart.options;
            },
            getColumnOptions: function (stat, setting, categoriesFunc, dataFunc) {
                var chart = new ComboChart();
                chart.title.text = setting.title;
                chart.xAxis[0].title.text = setting.xtitle;
                chart.yAxis[0].title.text = setting.ytitle;
                chart.xAxis[0].categories = categoriesFunc(stat);
                chart.series.push({
                    type: "column",
                    name: setting.ytitle,
                    data: dataFunc(stat)
                });
                return chart.options;
            },
            queryColumnOptions: function (setting, categories, data) {
                var chart = new ComboChart();
                chart.title.text = setting.title;
                chart.xAxis[0].title.text = setting.xtitle;
                chart.yAxis[0].title.text = setting.ytitle;
                chart.xAxis[0].categories = categories;
                chart.series.push({
                    type: "column",
                    name: setting.ytitle,
                    data: data
                });
                return chart.options;
            },
            queryDoubleColumnOptions: function (setting, categories, data1, data2) {
                var chart = new ComboChart();
                chart.title.text = setting.title;
                chart.xAxis[0].title.text = setting.xtitle;
                chart.yAxis[0].title.text = setting.ytitle;
                chart.xAxis[0].categories = categories;
                chart.series.push({
                    type: "column",
                    name: setting.ytitle1,
                    data: data1
                });
                chart.series.push({
                    type: "column",
                    name: setting.ytitle2,
                    data: data2
                });
                return chart.options;
            },
            generateColumnData: function (stats, categoriesFunc, dataFuncs) {
                var result = {
                    categories: [],
                    dataList: []
                };
                angular.forEach(dataFuncs, function (func) {
                    result.dataList.push([]);
                });
                angular.forEach(stats, function (stat) {
                    result.categories.push(categoriesFunc(stat));
                    angular.forEach(dataFuncs, function (func, index) {
                        result.dataList[index].push(func(stat));
                    });
                });
                return result;
            },
            generateCompoundStats: function (views, getType, getSubType, getTotal) {
                var stats = [];
                angular.forEach(views, function (view) {
                    var type = getType !== undefined ? getType(view) : view.type;
                    var subType = getSubType !== undefined ? getSubType(view) : view.subType;
                    var total = getTotal !== undefined ? getTotal(view) : view.total;
                    var j;
                    for (j = 0; j < stats.length; j++) {
                        if (stats[j].type === (type || '无有效值')) {
                            stats[j].total += total;
                            stats[j].subData.push([subType || '无有效值', total]);
                            break;
                        }
                    }
                    if (j === stats.length) {
                        stats.push({
                            type: type || '无有效值',
                            total: total,
                            subData: [[subType || '无有效值', total]]
                        });
                    }
                });
                return stats;
            }
        };
    })
    .factory('chartCalculateService', function () {
        return {
            generateDrillDownData: function (districtStats, townStats, queryFunction) {
                var results = [];
                angular.forEach(districtStats, function (districtStat) {
                    var subData = [];
                    var district = districtStat.district;
                    var districtData = queryFunction(districtStat);
                    angular.forEach(townStats, function (townStat) {
                        if (townStat.district === district) {
                            subData.push([townStat.town, queryFunction(townStat)]);
                        }
                    });

                    results.push({
                        district: district,
                        districtData: districtData,
                        subData: subData
                    });
                });
                return results;
            },
            generateDateDistrictStats: function (stats, districtLength, queryFunction) {
                var statDates = [];
                var districtStats = [];
                angular.forEach(stats, function (stat, index) {
                    statDates.push(stat.statDate);
                    for (var j = 0; j < districtLength; j++) {
                        var statValue = stat.values[j] ? queryFunction(stat.values[j]) : 0;
                        if (index === 0) {
                            districtStats.push([statValue]);
                        } else {
                            districtStats[j].push(statValue);
                        }
                    }
                });
                return {
                    statDates: statDates,
                    districtStats: districtStats
                };
            }
        };
    });