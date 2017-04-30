angular.module('myApp.url', ['ui.grid', "ui.bootstrap"])
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
                return (window.location.hostname === '219.128.254.41') ? 'http://219.128.254.36:8070/' : 'http://10.17.165.111:8070/';
            },
            getDtUrlHost: function() {
                return (window.location.hostname === '219.128.254.41') ? 'http://219.128.254.41:2888/' : 'http://10.17.165.100:2888/';
            },
            getDtUrlHost2: function () {
                return (window.location.hostname === '219.128.254.41') ? 'http://219.128.254.41:2868/' : 'http://10.17.165.100:2868/';
            },
            getParameterUrlHost: function() {
                return (window.location.hostname === '219.128.254.41') ? 'http://219.128.254.36:8001/' : 'http://10.17.165.111:8001/';
            },
            getTopnUrlHost: function () {
                return (window.location.hostname === '219.128.254.41') ? 'http://219.128.254.36:8006/' : 'http://10.17.165.111:8006/';
            },
            getInterferenceHost: function () {
                return (window.location.hostname === '219.128.254.41') ? 'http://219.128.254.36:8004/' : 'http://10.17.165.111:8004/';
            },
            getCustomerHost: function () {
                return (window.location.hostname === '219.128.254.41') ? 'http://219.128.254.41:8099/' : 'http://10.17.165.100:8099/';
            },
            getPhpHost: function () {
                return (window.location.hostname === '219.128.254.41') ? 'http://219.128.254.36:9000/' : 'http://10.17.165.111:9000/';
            },
            
            initializeIndexedDb: function (myDb, storeNames, key, callback) {
                var version = myDb.version || 1;
                var request = window.indexedDB.open(myDb.name, version);
                request.onerror = function (e) {
                    console.log(e.currentTarget.error.message);
                };
                request.onsuccess = function (e) {
                    myDb.db = e.target.result;
                    if (callback) {
                        callback();
                    }
                };
                request.onupgradeneeded = function (e) {
                    var db = e.target.result;
                    angular.forEach(storeNames, function(storeName) {
                        if (!db.objectStoreNames.contains(storeName)) {
                            db.createObjectStore(storeName, { keyPath: key });
                        }
                    });
                    
                    console.log('DB version changed to ' + version);
                };
            },
            updateIndexedDb: function(db, storeName, keyName, key, value) {
                var transaction = db.transaction(storeName, 'readwrite');
                var store = transaction.objectStore(storeName);
                var request = store.get(key);
                value[keyName] = key;
                request.onsuccess = function (e) {
                    var item = e.target.result;
                    if (item) {
                        store.put(value);
                    } else {
                        store.add(value);
                    }
                    
                }
            },
            refreshIndexedDb: function(db, storeName, keyName, items) {
                var transaction = db.transaction(storeName, 'readwrite');
                var store = transaction.objectStore(storeName);
                store.clear();
                angular.forEach(items, function(item) {
                    store.put(item);
                });

            },
            fetchStoreByCursor:function(db, storeName, callback) {
                var transaction = db.transaction(storeName);
                var store = transaction.objectStore(storeName);
                var request = store.openCursor();
                var data = [];
                request.onsuccess = function (e) {
                    var cursor = e.target.result;
                    if (cursor) {
                        data.push(cursor.value);
                        cursor.continue();
                    } else if(callback) {
                        callback(data);
                    }
                };
            }
        };
    })
    .controller('header.menu', function ($scope, appUrlService) {
        $scope.interferenceUrl = appUrlService.getInterferenceHost();
        $scope.complainUrl = appUrlService.getCustomerHost() + 'IndexOfComplaints.aspx';
        $scope.emergencyUrl = appUrlService.getCustomerHost() + 'IndexOfEmerCom.aspx';
        $scope.repeaterUrl = appUrlService.getCustomerHost() + 'IndexOfMicro.aspx';
        $scope.marketUrl = appUrlService.getCustomerHost() + 'IndexOfTelJobs.aspx';
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
            postMvcData: function (topic, data) {
                var deferred = $q.defer();
                $http.post(topic, data)
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
            postPhpUrlData: function(url, data) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }).success(function (result) {
                    deferred.resolve(result);
                })
                    .error(function (reason) {
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
            },
            getJsonpData: function(url, valueFunc) {
                var deferred = $q.defer();
                $http.jsonp(url).success(function (result) {
                            deferred.resolve(valueFunc(result));
                        })
                    .error(function (reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            getUrlData: function(url, params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: url,
                    params: params
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            }
        };
    })
    .factory('menuItemService', function($uibModal, $log) {
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
            },
            showGeneralDialog: function(settings) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: settings.templateUrl,
                    controller: settings.controller,
                    size: settings.size || 'lg',
                    resolve: settings.resolve
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showGeneralDialogWithAction: function (settings, action) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: settings.templateUrl,
                    controller: settings.controller,
                    size: settings.size || 'lg',
                    resolve: settings.resolve
                });
                modalInstance.result.then(function (info) {
                    action(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        };
    })
    .factory('preciseWorkItemGenerator', function () {
        return {
            generatePreciseInterferenceNeighborDtos: function (sources) {
                var sumDb6Share = 0;
                var sumDb10Share = 0;
                var sumMod3Share = 0;
                var sumMod6Share = 0;
                var dtos = [];
                angular.forEach(sources, function (source) {
                    sumDb6Share += source.overInterferences6Db;
                    sumDb10Share += source.overInterferences10Db;
                    sumMod3Share += source.mod3Interferences;
                    sumMod6Share += source.mod6Interferences;
                });
                angular.forEach(sources, function (source) {
                    if (source.destENodebId > 0 && source.destSectorId > 0) {
                        var db6Share = source.overInterferences6Db * 100 / sumDb6Share;
                        var db10Share = source.overInterferences10Db * 100 / sumDb10Share;
                        var mod3Share = source.mod3Interferences * 100 / sumMod3Share;
                        var mod6Share = source.mod6Interferences * 100 / sumMod6Share;
                        if (db6Share > 10 || db10Share > 10 || mod3Share > 10 || mod6Share > 10) {
                            dtos.push({
                                eNodebId: source.destENodebId,
                                sectorId: source.destSectorId,
                                db6Share: db6Share,
                                db10Share: db10Share,
                                mod3Share: mod3Share,
                                mod6Share: mod6Share
                            });
                        }
                    }
                });
                return dtos;
            },
            generatePreciseInterferenceVictimDtos: function (sources) {
                var sumBackwardDb6Share = 0;
                var sumBackwardDb10Share = 0;
                var sumBackwardMod3Share = 0;
                var sumBackwardMod6Share = 0;
                var dtos = [];
                angular.forEach(sources, function (source) {
                    sumBackwardDb6Share += source.overInterferences6Db;
                    sumBackwardDb10Share += source.overInterferences10Db;
                    sumBackwardMod3Share += source.mod3Interferences;
                    sumBackwardMod6Share += source.mod6Interferences;
                });
                angular.forEach(sources, function (source) {
                    if (source.victimENodebId > 0 && source.victimSectorId > 0) {
                        var db6Share = source.overInterferences6Db * 100 / sumBackwardDb6Share;
                        var db10Share = source.overInterferences10Db * 100 / sumBackwardDb10Share;
                        var mod3Share = source.mod3Interferences * 100 / sumBackwardMod3Share;
                        var mod6Share = source.mod6Interferences * 100 / sumBackwardMod6Share;
                        if (db6Share > 10 || db10Share > 10 || mod3Share > 10 || mod6Share > 10) {
                            dtos.push({
                                eNodebId: source.victimENodebId,
                                sectorId: source.victimSectorId,
                                backwardDb6Share: db6Share,
                                backwardDb10Share: db10Share,
                                backwardMod3Share: mod3Share,
                                backwardMod6Share: mod6Share
                            });
                        }
                    }
                });
                return dtos;
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
            },
            generateSiteGroups: function(site) {
                return [
                    {
                        items: [
                            {
                                key: '正式名称',
                                value: site.formalName
                            }, {
                                key: '规划名称',
                                value: site.planName
                            }, {
                                key: '规划编号',
                                value: site.planNum
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '区域',
                                value: site.district
                            }, {
                                key: '镇区',
                                value: site.town
                            }, {
                                key: '获取日期',
                                value: site.gottenDate
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '杆塔类型',
                                value: site.towerType
                            }, {
                                key: '天线高度',
                                value: site.antennaHeight
                            }, {
                                key: '开通日期',
                                value: site.finishedDate
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: site.longtitute
                            }, {
                                key: '纬度',
                                value: site.lattitute
                            }
                        ]
                    }
                ];
            },
            generateStationGroups: function(station) {
                return [
                    {
                        items: [
                            {
                                key: '站点名称',
                                value: station.StationName
                            }, {
                                key: '机房名称',
                                value: station.EngineRoom
                            }, {
                                key: '站点类型',
                                value: station.StationType
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '区域',
                                value: station.AreaName
                            }, {
                                key: '镇区',
                                value: station.Town
                            }, {
                                key: '安装地址',
                                value: station.InstallAddr
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '杆塔类型',
                                value: station.TowerType
                            }, {
                                key: '天线高度',
                                value: station.TowerHeight
                            }, {
                                key: '开通日期',
                                value: station.IntersectionDate
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '经度',
                                value: station.longtitute
                            }, {
                                key: '纬度',
                                value: station.lattitute
                            }, {
                                key: '系统站址ID',
                                value: station.SysStationId
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '机房归属',
                                value: station.RoomAttribution
                            }, {
                                key: '是否新建机房',
                                value: station.IsNewRoom
                            }, {
                                key: 'CL网是否共用天线',
                                value: station.IsShare
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '网络类型',
                                value: station.NetType
                            }, {
                                key: '是否高危站点',
                                value: station.IsDangerous
                            }, {
                                key: '是否简易机房',
                                value: station.IsSimple
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '属地性质',
                                value: station.AttributionNature
                            }, {
                                key: '是否新建铁塔',
                                value: station.IsNewTower
                            }, {
                                key: '铁塔归属',
                                value: station.TowerAttribution
                            }
                        ]
                    }, {
                        items: [
                            {
                                key: '铁塔高度',
                                value: station.TowerHeight
                            }, {
                                key: '铁塔类型',
                                value: station.TowerType
                            }, {
                                key: '铁塔编号',
                                value: station.TowerCode
                            }
                        ]
                    }
                ];
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
            },
            queryNearestRange: function(xCenter, yCenter) {
                return {
                    west: xCenter - 1e-6,
                    east: xCenter + 1e-6,
                    south: yCenter - 1e-6,
                    north: yCenter + 1e-6
                };
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
            getStackColumnOptions: function (stats, setting, categoriesFunc, dataFuncList) {
                var chart = new StackColumnChart();
                chart.title.text = setting.title;
                chart.xAxis.title.text = setting.xtitle;
                chart.yAxis.title.text = setting.ytitle;
                chart.xAxis.categories = _.map(stats, function(stat) {
                    return categoriesFunc(stat);
                });
                angular.forEach(dataFuncList, function(dataFunc, $index) {
                    chart.series.push({
                        name: setting.seriesTitles[$index],
                        data: _.map(stats, function(stat) {
                            return dataFunc(stat);
                        })
                    });
                });
                
                return chart.options;
            },
            queryColumnOptions: function (setting, categories, data) {
                var chart = new ComboChart();
                chart.title.text = setting.title;
                chart.xAxis[0].title.text = setting.xtitle;
                chart.yAxis[0].title.text = setting.ytitle;
                chart.xAxis[0].categories = categories;
                if (setting.min) {
                    chart.setDefaultYAxis({ min: setting.min });
                }
                if (setting.max) {
                    chart.setDefaultYAxis({ max: setting.max });
                }
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
            queryMultipleColumnOptions: function (setting, categories, dataList, seriesTitle) {
                var chart = new ComboChart();
                chart.title.text = setting.title;
                chart.xAxis[0].title.text = setting.xtitle;
                chart.yAxis[0].title.text = setting.ytitle;
                chart.xAxis[0].categories = categories;
                angular.forEach(dataList, function(data, $index) {
                    chart.series.push({
                        type: "column",
                        name: seriesTitle[$index],
                        data: data
                    });
                });
                return chart.options;
            },
            queryMultipleComboOptions: function (setting, categories, dataList, seriesTitle, typeList) {
                var chart = new ComboChart();
                chart.title.text = setting.title;
                chart.xAxis[0].title.text = setting.xtitle;
                chart.yAxis[0].title.text = setting.ytitle;
                chart.xAxis[0].categories = categories;
                angular.forEach(dataList, function (data, $index) {
                    chart.series.push({
                        type: typeList[$index],
                        name: seriesTitle[$index],
                        data: data
                    });
                });
                return chart.options;
            },
            queryMultipleComboOptionsWithDoubleAxes: function (setting, categories, dataList, seriesTitle, typeList, yAxisList) {
                var chart = new ComboChart();
                chart.title.text = setting.title;
                chart.xAxis[0].title.text = setting.xtitle;
                chart.yAxis[0].title.text = setting.ytitles[0];
                chart.pushOneYAxis(setting.ytitles[1]);

                chart.xAxis[0].categories = categories;
                angular.forEach(dataList, function (data, $index) {
                    chart.series.push({
                        type: typeList[$index],
                        name: seriesTitle[$index],
                        data: data,
                        yAxis: yAxisList[$index]
                    });
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
            generateColumnDataByKeys: function (stats, categoriesKey, dataKeys) {
                var result = {
                    categories: [],
                    dataList: []
                };
                angular.forEach(dataKeys, function (key) {
                    result.dataList.push([]);
                });
                angular.forEach(stats, function (stat) {
                    result.categories.push(stat[categoriesKey]);
                    angular.forEach(dataKeys, function (key, index) {
                        result.dataList[index].push(stat[key]);
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
    .factory('chartCalculateService', function (appFormatService) {
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
            generateDrillDownPieOptions: function(stats, settings) {
                var chart = new DrilldownPie();
                chart.initialize(settings);
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries({
                        name: stat.type,
                        value: stat.total,
                        subData: stat.subData
                    });
                });
                return chart.options;
            },
            generateDrillDownPieOptionsWithFunc: function (stats, settings, func) {
                var chart = new DrilldownPie();
                chart.initialize(settings);
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries({
                        name: func.nameFunc(stat),
                        value: func.valueFunc(stat),
                        subData: stat.subData
                    });
                });
                return chart.options;
            },
            generateDrillDownColumnOptionsWithFunc: function (stats, settings, func) {
                var chart = new DrilldownColumn();
                chart.initialize(settings);
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries({
                        name: func.nameFunc(stat),
                        value: func.valueFunc(stat),
                        subData: stat.subData
                    });
                });
                return chart.options;
            },
            generateSplineChartOptions: function(result, districts, settings) {
                var chart = new ComboChart();
                chart.initialize(settings);
                chart.xAxis[0].categories = result.statDates;

                angular.forEach(districts, function (district, index) {
                    chart.series.push({
                        type: "spline",
                        name: district,
                        data: result.districtStats[index]
                    });
                });
                return chart.options;
            },
            calculateMemberSum: function(array, memberList, categoryFunc) {
                var result = _.reduce(array, function(memo, num) {
                    var temp = {};
                    angular.forEach(memberList, function(member) {
                        temp[member] = memo[member] + num[member];
                    });
                    return temp;
                });
                categoryFunc(result);
                return result;
            },
            generateDistrictStats: function (districts, stats, funcs) {
                var outputStats = [];
                angular.forEach(stats, function (stat) {
                    var districtViews = funcs.districtViewFunc(stat);
                    var statDate = stat.statDate;
                    var generalStat = {};
                    funcs.initializeFunc(generalStat);
                    var values = [];
                    angular.forEach(districts, function (district) {
                        for (var k = 0; k < districtViews.length; k++) {
                            var view = districtViews[k];
                            if (view.district === district) {
                                values.push(funcs.calculateFunc(view));
                                funcs.accumulateFunc(generalStat, view);
                                break;
                            }
                        }
                        if (k === districtViews.length) {
                            values.push(funcs.zeroFunc());
                        }
                    });
                    values.push(funcs.totalFunc(generalStat));
                    outputStats.push({
                        statDate: statDate,
                        values: values
                    });
                });
                return outputStats;
            },
            generateDateDistrictStats: function (stats, districtLength, queryFunction) {
                var statDates = [];
                var districtStats = [];
                angular.forEach(stats, function (stat, index) {
                    statDates.push(stat.statDate.split('T')[0]);
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
            },
            generateStatsForPie: function(trendStat, result, funcs) {
                trendStat.districtStats = funcs.districtViewsFunc(result[0]);
                trendStat.townStats = funcs.townViewsFunc(result[0]);
                for (var i = 1; i < result.length; i++) {
                    angular.forEach(funcs.districtViewsFunc(result[0]), function (currentDistrictStat) {
                        var found = false;
                        for (var k = 0; k < trendStat.districtStats.length; k++) {
                            if (trendStat.districtStats[k].city === currentDistrictStat.city
                                && trendStat.districtStats[k].district === currentDistrictStat.district) {
                                funcs.accumulateFunc(trendStat.districtStats[k], currentDistrictStat);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            trendStat.districtStats.push(currentDistrictStat);
                        }
                    });
                    angular.forEach(result[i].townPreciseView, function (currentTownStat) {
                        var found = false;
                        for (var k = 0; k < trendStat.townStats.length; k++) {
                            if (trendStat.townStats[k].city === currentTownStat.city
                                && trendStat.townStats[k].district === currentTownStat.district
                                && trendStat.townStats[k].town === currentTownStat.town) {
                                funcs.accumulateFunc(trendStat.townStats[k], currentTownStat);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            trendStat.townStats.push(currentTownStat);
                        }
                    });
                }
                angular.forEach(trendStat.districtStats, function (stat) {
                    if (funcs.districtCalculate) {
                        funcs.districtCalculate(stat);
                    }
                    
                });
                angular.forEach(trendStat.townStats, function (stat) {
                    if (funcs.townCalculate) {
                        funcs.townCalculate(stat);
                    }
                });
            },
            generateSeriesInfo: function(seriesInfo, stats, categoryKey, dataKeys) {
                var categories = [];
                angular.forEach(dataKeys, function(key) {
                    seriesInfo[key].data = [];
                });
                angular.forEach(stats, function (stat) {
                    categories.push(stat[categoryKey]);
                    angular.forEach(dataKeys, function(key) {
                        seriesInfo[key].data.push(stat[key]);
                    });
                });
                return {
                    categories: categories,
                    info: seriesInfo
                };
            },
            writeSeriesData: function(series, seriesInfo, dataKeys) {
                angular.forEach(dataKeys, function(key) {
                    series.push({
                        type: seriesInfo[key].type,
                        name: seriesInfo[key].name,
                        data: seriesInfo[key].data
                    });
                });
            },
            generateMrsRsrpStats: function(stats) {
                var categories = _.range(-140, -43);
                var values = _.range(0, 97, 0);
                var array = _.map(_.range(48), function (index) {
                    var value = stats['rsrP_' + appFormatService.prefixInteger(index, 2)];
                    return _.isNumber(value) ? value : 0;
                });
                var i;
                for (i = 2; i < 37; i++) {
                    values[i + 24] = array[i];
                }
                for (i = 37; i < 47; i++) {
                    values[2 * i - 13] = values[2 * i - 12] = array[i] / 2;
                }
                var tail = array[47];
                for (i = 0; i < 17; i++) {
                    if (tail > values[80 + i] / 2) {
                        tail -= values[80 + i] / 2 + 1;
                        values[81 + i] = values[80 + i] / 2 + 1;
                    } else {
                        values[81 + i] = tail;
                        break;
                    }
                }
                var avg = array[1] / 5;
                var step = (values[26] - avg) / 3;
                for (i = 0; i < 5; i++) {
                    values[21 + i] = avg + (i - 2) * step;
                }
                var head = values[21];
                for (i = 0; i < 21; i++) {
                    if (head > values[21 - i] / 2) {
                        head -= values[21 - i] / 2 + 1;
                        values[21 - i - 1] = values[21 - i] / 2 + 1;
                    } else {
                        values[21 - i - 1] = head;
                    }
                }
                return {
                    categories: categories,
                    values: values
                };
            },
            generateCoverageStats: function(stats) {
                var array = _.map(_.range(48), function (index) {
                    var value = stats['rsrP_' + appFormatService.prefixInteger(index, 2)];
                    return _.isNumber(value) ? value : 0;
                });
                var sum = _.reduce(array, function (memo, num) { return memo + num; }, 0);
                return {
                    total: sum,
                    sumBelow115: array[0] + array[1],
                    sumBetween115And110: array[2] + array[3] + array[4] + array[5] + array[6],
                    sumBetween110And105: array[7] + array[8] + array[9] + array[10] + array[11]
                };
            },
            generateMrsTaStats: function (stats) {
                var array = _.map(_.range(45), function (index) {
                    var value = stats['tadv_' + appFormatService.prefixInteger(index, 2)];
                    return _.isNumber(value) ? value : 0;
                });
                return {
                    categories: [
                        100,
                        200,
                        300,
                        400,
                        500,
                        600,
                        700,
                        800,
                        900,
                        1000,
                        1150,
                        1300,
                        1450,
                        1600,
                        1750,
                        1900,
                        2050,
                        2200,
                        2350,
                        2500,
                        2700,
                        2900,
                        3100,
                        3300,
                        3500,
                        3700,
                        3900,
                        4100,
                        4300,
                        4500,
                        4700,
                        4900,
                        5500,
                        6500,
                        8000,
                        9500,
                        11500,
                        15000,
                        20000
                    ],
                    values: [
                        array[0] + 0.280082 * array[1],
                        0.719918 * array[1] + 0.560164 * array[2],
                        0.489836 * array[2] + 0.840246 * array[3],
                        0.159754 * array[3] + array[4] + 0.120328 * array[5],
                        0.879672 * array[5] + 0.40041 * array[6],
                        0.59959 * array[6] + 0.680492 * array[7],
                        0.319508 * array[7] + 0.960593 * array[8],
                        0.039427 * array[8] + array[9] + 0.240655 * array[10],
                        0.759345 * array[11] + 0.520737 * array[12],
                        0.479263 * array[12] + 0.40041 * array[13],
                        0.59959 * array[13] + 0.360471 * array[14],
                        0.639529 * array[14] + 0.320533 * array[15],
                        0.679467 * array[15] + 0.280594 * array[16],
                        0.719406 * array[16] + 0.240655 * array[17],
                        0.759345 * array[17] + 0.200717 * array[18],
                        0.799283 * array[18] + 0.160778 * array[19],
                        0.839222 * array[19] + 0.12084 * array[20],
                        0.87916 * array[20] + 0.080901 * array[21],
                        0.919099 * array[21] + 0.040963 * array[22],
                        0.959037 * array[22] + 0.001024 * array[23],
                        0.998976 * array[23] + 0.281106 * array[24],
                        0.718894 * array[24] + 0.561188 * array[25],
                        0.438812 * array[25] + 0.84127 * array[26],
                        0.15873 * array[26] + array[27] + 0.121352 * array[28],
                        0.878648 * array[28] + 0.401434 * array[29],
                        0.598566 * array[29] + 0.681516 * array[30],
                        0.318484 * array[30] + 0.961598 * array[31],
                        0.038402 * array[31] + array[32] + 0.241679 * array[33],
                        0.758321 * array[33] + 0.521761 * array[34],
                        0.478239 * array[34] + 0.801843 * array[35],
                        0.198157 * array[35] + array[36] + 0.081925 * array[37],
                        0.918075 * array[37] + 0.362007 * array[38],
                        0.637993 * array[38] + 0.400282 * array[39],
                        0.599718 * array[39] + 0.200333 * array[40],
                        0.799667 * array[40] + 0.40041 * array[41],
                        0.59959 * array[41] + 0.600486 * array[42],
                        0.399514 * array[42] + 0.300147 * array[43],
                        0.699853 * array[43] + 0.000192 * array[44],
                        0.999808 * array[44]
                    ]
                };
            },
            generateOverCoverageStats: function(stats) {
                var array = _.map(_.range(45), function (index) {
                    var value = stats['tadv_' + appFormatService.prefixInteger(index, 2)];
                    return _.isNumber(value) ? value : 0;
                });
                var arrayOver = _.map(_.range(18, 45), function (index) {
                    var value = stats['tadv_' + appFormatService.prefixInteger(index, 2)];
                    return _.isNumber(value) ? value : 0;
                });
                return {
                    total: _.reduce(array, function (memo, num) { return memo + num; }, 0),
                    over: _.reduce(arrayOver, function (memo, num) { return memo + num; }, 0)
                }
            },
            generateRsrpTaStats: function(stats, rsrpIndex) {
                var rsrpDivisions = [
                    -110,
                    - 105,
                    - 100,
                    - 95,
                    - 90,
                    - 85,
                    - 80,
                    - 75,
                    - 70,
                    - 65,
                    - 60,
                    - 44
                ];
                rsrpIndex = Math.min(Math.max(0, rsrpIndex), 11);
                var array = _.map(_.range(11), function (index) {
                    var value = stats['tadv' + appFormatService.prefixInteger(index, 2) + 'Rsrp' +appFormatService.prefixInteger(rsrpIndex, 2)];
                    return _.isNumber(value) ? value : 0;
                });
                return {
                    seriesName: rsrpIndex === 0 ? 'RSRP<-110dBm' : rsrpDivisions[rsrpIndex - 1] + 'dBm<=RSRP<' + rsrpDivisions[rsrpIndex] + 'dBm',
                    categories: [
                        100,
                        200,
                        300,
                        400,
                        500,
                        600,
                        700,
                        800,
                        900,
                        1000,
                        1200,
                        1400,
                        1600,
                        1800,
                        2000,
                        2400,
                        2800,
                        3200,
                        3600,
                        4000,
                        5000,
                        6000,
                        8000,
                        10000,
                        15000
                    ],
                    values: [
                        0.426693975 * array[0],
                        0.426693975 * array[0],
                        0.14661205 * array[0] + 0.280081925 * array[1],
                        0.426693975 * array[1],
                        0.2932241 * array[1] + 0.133469875 * array[2],
                        0.426693975 * array[2],
                        0.426693975 * array[2],
                        0.013142174 * array[2] + 0.413551801 * array[3],
                        0.426693975 * array[3],
                        0.159754224 * array[3] + 0.133469875 * array[4],
                        0.426693975 * array[4],
                        0.426693975 * array[4],
                        0.013142174 * array[4] + 0.413551801 * array[5],
                        0.426693975 * array[5],
                        0.159754224 * array[5] + 0.133469875 * array[6],
                        0.426693975 * array[6],
                        0.426693975 * array[6],
                        0.013142174 * array[6] + 0.413551801 * array[7],
                        0.426693975 * array[7],
                        0.159754224 * array[7] + 0.266939751 * array[8],
                        0.129363573 * array[8] + 0.058883769 * array[9],
                        0.188247342 * array[9],
                        0.376494684 * array[9],
                        0.376374206 * array[9] + 0.000064 * array[10],
                        0.500032002 * array[10]
                    ]
                };
            }
        };
    })
    .factory('calculateService', function(chartCalculateService) {
        return {
            calculateOverCoverageRate: function(taList) {
                var sum = 0;
                var sumOver = 0;
                angular.forEach(taList, function(ta) {
                    var stat = chartCalculateService.generateOverCoverageStats(ta);
                    sum += stat.total;
                    sumOver += stat.over;
                });
                return sumOver / sum;
            },
            calculateWeakCoverageRate: function (coverageList) {
                var sum = 0;
                var sum115 = 0;
                var sum110 = 0;
                var sum105 = 0;
                angular.forEach(coverageList, function (coverage) {
                    var stat = chartCalculateService.generateCoverageStats(coverage);
                    sum += stat.total;
                    sum115 += stat.sumBelow115;
                    sum110 += stat.sumBetween115And110;
                    sum105 += stat.sumBetween110And105;
                });
                return {
                    rate115: sum115 / sum,
                    rate110: (sum115 + sum110) / sum,
                    rate105: (sum115 + sum110 + sum105) / sum
                };
            },
            generateGridDirective: function(settings, $compile) {
                return {
                    controller: settings.controllerName,
                    restrict: 'EA',
                    replace: true,
                    scope: settings.scope,
                    template: '<div></div>',
                    link: function (scope, element, attrs) {
                        scope.initialize = false;
                        scope.$watch(settings.argumentName, function (items) {
                            scope.gridOptions.data = items;
                            if (!scope.initialize) {
                                var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                                element.append(linkDom);
                                scope.initialize = true;
                            }
                        });
                    }
                };
            },
            generateShortGridDirective: function (settings, $compile) {
                return {
                    controller: settings.controllerName,
                    restrict: 'EA',
                    replace: true,
                    scope: settings.scope,
                    template: '<div></div>',
                    link: function (scope, element, attrs) {
                        scope.initialize = false;
                        scope.$watch(settings.argumentName, function (items) {
                            scope.gridOptions.data = items;
                            if (!scope.initialize) {
                                var linkDom = $compile('<div style="height: 150px" ui-grid="gridOptions"></div>')(scope);
                                element.append(linkDom);
                                scope.initialize = true;
                            }
                        });
                    }
                };
            },
            generatePagingGridDirective: function (settings, $compile) {
                return {
                    controller: settings.controllerName,
                    restrict: 'EA',
                    replace: true,
                    scope: settings.scope,
                    template: '<div></div>',
                    link: function (scope, element, attrs) {
                        scope.initialize = false;
                        scope.$watch(settings.argumentName, function (items) {
                            scope.gridOptions.data = items;
                            if (!scope.initialize) {
                                var linkDom = $compile('<div ui-grid="gridOptions" ui-grid-pagination style="height: 600px"></div>')(scope);
                                element.append(linkDom);
                                scope.initialize = true;
                            }
                        });
                    }
                };
            },
            generateSelectionGridDirective: function(settings, $compile) {
                return {
                    controller: settings.controllerName,
                    restrict: 'EA',
                    replace: true,
                    scope: settings.scope,
                    template: '<div></div>',
                    link: function (scope, element, attrs) {
                        scope.initialize = false;
                        scope.$watch(settings.argumentName, function (items) {
                            scope.gridOptions.data = items;
                            if (!scope.initialize) {
                                var linkDom = $compile('<div ui-grid="gridOptions" ui-grid-selection></div>')(scope);
                                element.append(linkDom);
                                scope.initialize = true;
                            }
                        });
                    }
                };
            },
            mergeDataByKey: function(list, data, key, dataKeys) {
                angular.forEach(data, function(num) {
                    var finder = {};
                    finder[key] = num[key];
                    var match = _.where(list, finder);
                    if (match.length > 0) {
                        angular.forEach(dataKeys, function(dataKey) {
                            match[0][dataKey] += num[dataKey];
                        });
                    } else {
                        var newNum = {};
                        newNum[key] = num[key];
                        angular.forEach(dataKeys, function(dataKey) {
                            newNum[dataKey] = num[dataKey];
                        });
                        list.push(newNum);
                    }
                });
                return _.sortBy(list, function(num) { return num[key]; });
            },
            generateCellDetailsGroups: function(site) {
                return [
                {
                    items: [
                        {
                            key: '频点',
                            value: site.frequency
                        }, {
                            key: '经度',
                            value: site.longtitute
                        }, {
                            key: '纬度',
                            value: site.lattitute
                        }
                    ]
                }, {
                    items: [
                        {
                            key: '天线挂高',
                            value: site.height
                        }, {
                            key: '方位角',
                            value: site.azimuth
                        }, {
                            key: '下倾角',
                            value: site.downTilt
                        }
                    ]
                }, {
                    items: [
                        {
                            key: '室内外',
                            value: site.indoor
                        }, {
                            key: '天线增益',
                            value: site.antennaGain
                        }, {
                            key: 'RS功率',
                            value: site.rsPower
                        }
                    ]
                }, {
                    items: [
                        {
                            key: 'PCI',
                            value: site.pci
                        }, {
                            key: 'PRACH',
                            value: site.prach
                        }, {
                            key: 'TAC',
                            value: site.tac
                        }
                    ]
                }
                ];
            },
            generateFlowDetailsGroups: function (site) {
                return [
                {
                    items: [
                        {
                            key: '小区名称',
                            value: site.eNodebName + '-' +site.sectorId
                        }, {
                            key: '经度',
                            value: site.longtitute
                        }, {
                            key: '纬度',
                            value: site.lattitute
                        }
                    ]
                }, {
                    items: [
                        {
                            key: '天线挂高',
                            value: site.height
                        }, {
                            key: '方位角',
                            value: site.azimuth
                        }, {
                            key: '下倾角',
                            value: site.downTilt
                        }
                    ]
                }, {
                    items: [
                        {
                            key: '室内外',
                            value: site.indoor
                        }, {
                            key: '天线增益',
                            value: site.antennaGain
                        }, {
                            key: 'RS功率',
                            value: site.rsPower
                        }
                    ]
                }, {
                    items: [
                        {
                            key: '下行流量（MB）',
                            value: site.pdcpDownlinkFlow
                        }, {
                            key: '上行流量（MB）',
                            value: site.pdcpUplinkFlow
                        }, {
                            key: '用户数',
                            value: site.maxUsers
                        }
                    ]
                }, {
                    items: [
                        {
                            key: '下行感知速率（Mbit/s）',
                            value: site.downlinkFeelingRate
                        }, {
                            key: '上行感知速率（Mbit/s）',
                            value: site.uplinkFeelingRate
                        }, {
                            key: 'PCI',
                            value: site.pci
                        }
                    ]
                }, {
                    items: [
                        {
                            key: '4G下切3G次数',
                            value: site.redirectCdma2000
                        }, {
                            key: '4G双流比',
                            value: site.rank2Rate
                        }, {
                            key: 'PRACH',
                            value: site.prach
                        }
                    ]
                }
                ];
            },
            generateCellMongoGroups: function (site) {
                return [
                {
                    items: [
                        {
                            key: '网管PCI',
                            value: site.phyCellId
                        }, {
                            key: '网管PRACH',
                            value: site.rootSequenceIdx
                        }, {
                            key: '本地小区标识（仅华为有效）',
                            value: site.localCellId
                        }
                    ]
                }, {
                    items: [
                        {
                            key: '服务小区偏移量',
                            value: site.cellSpecificOffset,
                            filter: 'dbStep32'
                        }, {
                            key: '服务小区偏置',
                            value: site.qoffsetFreq,
                            filter: 'dbStep32'
                        }, {
                            key: '前导格式',
                            value: site.preambleFmt
                        }
                    ]
                }
                ];
            },
            accumulatePreciseStat: function (source, accumulate) {
                source.totalMrs += accumulate.totalMrs;
                source.firstNeighbors += accumulate.firstNeighbors;
                source.secondNeighbors += accumulate.secondNeighbors;
                source.thirdNeighbors += accumulate.thirdNeighbors;
            },
            accumulateFlowStat: function(source, accumulate) {
                source.pdcpDownlinkFlow += accumulate.pdcpDownlinkFlow;
                source.pdcpUplinkFlow += accumulate.pdcpUplinkFlow;
            },
            calculateDistrictRates: function (districtStat) {
                districtStat.firstRate = 100 - 100 * districtStat.firstNeighbors / districtStat.totalMrs;
                districtStat.preciseRate = 100 - 100 * districtStat.secondNeighbors / districtStat.totalMrs;
                districtStat.thirdRate = 100 - 100 * districtStat.thirdNeighbors / districtStat.totalMrs;
                return districtStat;
            },
            calculateTownRates: function (townStat) {
                townStat.firstRate = 100 - 100 * townStat.firstNeighbors / townStat.totalMrs;
                townStat.preciseRate = 100 - 100 * townStat.secondNeighbors / townStat.totalMrs;
                townStat.thirdRate = 100 - 100 * townStat.thirdNeighbors / townStat.totalMrs;
            },
            getValueFromDivisionAbove: function(division, value) {
                for (var i = 0; i < division.length; i++) {
                    if (value > division[i]) {
                        return 5 - i;
                    }
                }
                return 0;
            },
            getValueFromDivisionBelow: function(division, value) {
                for (var i = 0; i < division.length; i++) {
                    if (value < division[i]) {
                        return 5 - i;
                    }
                }
                return 0;
            },
            generateCoveragePointsWithFunc: function (pointDef, points, func) {
                var intervals = pointDef.intervals;
                angular.forEach(points, function (point) {
                    var value = func(point);
                    for (var i = 0; i < intervals.length; i++) {
                        if ((pointDef.sign && value < intervals[i].threshold) || (!pointDef.sign && value > intervals[i].threshold)) {
                            intervals[i].coors.push({
                                longtitute: point.longtitute,
                                lattitute: point.lattitute
                            });
                            break;
                        }
                    }
                });
            }
        };
    })
    .factory('geometryCalculateService', function() {
        var getDistanceFunc = function (p1Lat, p1Lng, p2Lat, p2Lng) {
            var earthRadiusKm = 6378.137;
            var dLat1InRad = p1Lat * (Math.PI / 180);
            var dLong1InRad = p1Lng * (Math.PI / 180);
            var dLat2InRad = p2Lat * (Math.PI / 180);
            var dLong2InRad = p2Lng * (Math.PI / 180);
            var dLongitude = dLong2InRad - dLong1InRad;
            var dLatitude = dLat2InRad - dLat1InRad;
            var a = Math.pow(Math.sin(dLatitude / 2), 2) + Math.cos(dLat1InRad) * Math.cos(dLat2InRad) * Math.pow(Math.sin(dLongitude / 2), 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var dDistance = earthRadiusKm * c;
            return dDistance;
        };
        var getLonLatFunc = function(centre, x, y) {
            var lat = centre.lat + y / getDistanceFunc(centre.lat, centre.lng, centre.lat + 1, centre.lng);
            var lng = centre.lng + x / getDistanceFunc(centre.lat, centre.lng, centre.lat, centre.lng + 1);
            return new BMap.Point(lng, lat);
        };
        return {
            getDistanceFunc: function(p1Lat, p1Lng, p2Lat, p2Lng) {
                return getDistanceFunc(p1Lat, p1Lng, p2Lat, p2Lng);
            },
            getLonLatFunc: function(centre, x, y) {
                return getLonLatFunc(centre, x, y);
            },
            getPositionFunc: function(centre, r, angle) {
                var x = r * Math.cos(angle * Math.PI / 180);
                var y = r * Math.sin(angle * Math.PI / 180);
                return getLonLatFunc(centre, x, y);
            },
            getPositionRadius: function(centre, r, rad) {
                var x = r * Math.cos(rad);
                var y = r * Math.sin(rad);
                return getLonLatFunc(centre, x, y);
            },
            getRadiusFunc: function(zoom) {
                var rSation = 70;
                var rSector = 0.2;
                switch (zoom) {
                case 15:
                    rSector *= 0.75;
                    rSation *= 0.75;
                    break;
                case 16:
                    rSector /= 2.5;
                    rSation /= 2.5;
                    break;
                case 17:
                    rSector /= 5;
                    rSation /= 5;
                    break;
                default:
                    break;
                }

                return { rSector: rSector, rStation: rSation };
            }

        };
    })
    .factory('geometryService', function (geometryCalculateService) {
        return {
            getDistance: function (p1Lat, p1Lng, p2Lat, p2Lng) {
                return geometryCalculateService.getDistanceFunc(p1Lat, p1Lng, p2Lat, p2Lng);
            },
            getLonLat: function (centre, x, y) {
                return geometryCalculateService.getLonLatFunc(centre, x, y);
            },
            getPosition: function (centre, r, angle) {
                return geometryCalculateService.getPositionFunc(centre, r, angle);
            },
            getPositionLonLat: function (centre, r, angle) {
                var x = r * Math.cos(angle * Math.PI / 180);
                var y = r * Math.sin(angle * Math.PI / 180);
                var lat = centre.lattitute + y / geometryCalculateService.getDistanceFunc(centre.lattitute, centre.longtitute, centre.lattitute + 1, centre.longtitute);
                var lng = centre.longtitute + x / geometryCalculateService.getDistanceFunc(centre.lattitute, centre.longtitute, centre.lattitute, centre.longtitute + 1);
                return {
                    longtitute: lng,
                    lattitute: lat
                };
            },
            generateSectorPolygonPoints: function (centre, irotation, iangle, zoom, scalor) {
                var assemble = [];
                var dot;
                var i;
                var r = geometryCalculateService.getRadiusFunc(zoom).rSector * (scalor || 1);

                for (i = 0; i <= r; i += r / 2) {
                    dot = geometryCalculateService.getPositionFunc(centre, i, irotation);
                    assemble.push(dot);
                }

                for (i = 0; i <= iangle; i += iangle / 5) {
                    dot = geometryCalculateService.getPositionFunc(centre, r, i + irotation);
                    assemble.push(dot);
                }

                return assemble;
            },
            getRadius: function (zoom) {
                return geometryCalculateService.getRadiusFunc(zoom);
            },
            getDtPointRadius: function (zoom) {
                var radius = 17;
                switch (zoom) {
                    case 15:
                        radius *= 0.9;
                        break;
                    case 16:
                        radius *= 0.8;
                        break;
                    case 17:
                        radius *= 0.75;
                        break;
                    default:
                        break;
                }
                return radius;
            },
            getArrowLine: function (x1, y1, x2, y2, r) {
                var rad = Math.atan2(y2 - y1, x2 - x1);
                var centre = {
                    lng: x2,
                    lat: y2
                };
                var point1 = geometryCalculateService.getPositionRadius(centre, -r, rad - 0.2);
                var point2 = geometryCalculateService.getPositionRadius(centre, -r, rad + 0.2);
                return new BMap.Polyline([
                    new BMap.Point(x2, y2),
                    point1,
                    point2,
                    new BMap.Point(x2, y2),
                    new BMap.Point(x1, y1)
                ], { strokeColor: "blue", strokeWeight: 1 });
            },
            getLine: function (x1, y1, x2, y2, color) {
                color = color || "orange";
                return new BMap.Polyline([
                    new BMap.Point(x2, y2),
                    new BMap.Point(x1, y1)
                ], { strokeColor: color, strokeWeight: 1 });
            },
            getCircle: function (x, y, r, color, callback, neighbor) {
                color = color || "orange";
                var circle = new BMap.Circle(new BMap.Point(x, y), r, { strokeColor: color, fillColor: color });
                circle.addEventListener("click", function () {
                    callback(neighbor);
                });
                return circle;
            },
            getPathInfo: function (path) {
                var result = '';
                angular.forEach(path, function (point, $index) {
                    if ($index > 0) result += ';';
                    result += point.lng + ';' + point.lat;
                });
                return result;
            },
            queryMapColors: function() {
                return [
                    '#CC3333',
                    '#FFFF00',
                    '#CC9966',
                    '#003300',
                    '#99CC00',
                    '#FF9966',
                    '#CC6699',
                    '#9933FF',
                    '#333300'];
            }
        };
    })

    .factory('parametersChartService', function (generalChartService) {
        return {
            getDistrictLteENodebPieOptions: function (data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区LTE基站数分布",
                    seriesTitle: "区域"
                }, function (subData) {
                    return subData.district;
                }, function (subData) {
                    return subData.totalLteENodebs;
                });
            },
            getDistrictLteCellPieOptions: function (data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区LTE小区数分布",
                    seriesTitle: "区域"
                }, function (subData) {
                    return subData.district;
                }, function (subData) {
                    return subData.totalLteCells;
                });
            },
            getDistrictCdmaBtsPieOptions: function (data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区CDMA基站数分布",
                    seriesTitle: "区域"
                }, function (subData) {
                    return subData.district;
                }, function (subData) {
                    return subData.totalCdmaBts;
                });
            },
            getDistrictCdmaCellPieOptions: function (data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区CDMA小区数分布",
                    seriesTitle: "区域"
                }, function (subData) {
                    return subData.district;
                }, function (subData) {
                    return subData.totalCdmaCells;
                });
            },
            getTownLteENodebPieOptions: function (data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇LTE基站数分布",
                    seriesTitle: "镇"
                }, function (subData) {
                    return subData.town;
                }, function (subData) {
                    return subData.totalLteENodebs;
                });
            },
            getTownLteCellPieOptions: function (data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇LTE小区数分布",
                    seriesTitle: "镇"
                }, function (subData) {
                    return subData.town;
                }, function (subData) {
                    return subData.totalLteCells;
                });
            },
            getTownCdmaBtsPieOptions: function (data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇CDMA基站数分布",
                    seriesTitle: "镇"
                }, function (subData) {
                    return subData.town;
                }, function (subData) {
                    return subData.totalCdmaBts;
                });
            },
            getTownCdmaCellPieOptions: function (data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇CDMA小区数分布",
                    seriesTitle: "镇"
                }, function (subData) {
                    return subData.town;
                }, function (subData) {
                    return subData.totalCdmaCells;
                });
            },
            getCollegeDistributionForDownlinkFlow: function (data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网下行流量分布",
                    seriesTitle: "下行流量(MB)"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.pdcpDownlinkFlow;
                });
            },
            getCollegeDistributionForUplinkFlow: function (data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网上行流量分布",
                    seriesTitle: "上行流量(MB)"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.pdcpUplinkFlow;
                });
            },
            getCollegeDistributionForAverageUsers: function (data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网平均用户数分布",
                    seriesTitle: "平均用户数"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.averageUsers;
                });
            },
            getCollegeDistributionForActiveUsers: function (data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网最大激活用户数分布",
                    seriesTitle: "最大激活用户数"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.maxActiveUsers;
                });
            },
            getCellDistributionForDownlinkFlow: function (data, index) {
                return generalChartService.queryColumnOptions({
                    title: "小区下行流量分布",
                    xtitle: "小区名称",
                    ytitle: "下行流量(MB)"
                }, data.categories, data.dataList[index]);
            },
            getCellDistributionForUplinkFlow: function (data, index) {
                return generalChartService.queryColumnOptions({
                    title: "小区上行流量分布",
                    xtitle: "小区名称",
                    ytitle: "上行流量(MB)"
                }, data.categories, data.dataList[index]);
            },
            getCellDistributionForAverageUsers: function (data, index) {
                return generalChartService.queryColumnOptions({
                    title: "平均用户数分布",
                    xtitle: "小区名称",
                    ytitle: "平均用户数"
                }, data.categories, data.dataList[index]);
            },
            getCellDistributionForActiveUsers: function (data, index) {
                return generalChartService.queryColumnOptions({
                    title: "最大激活用户数分布",
                    xtitle: "小区名称",
                    ytitle: "最大激活用户数"
                }, data.categories, data.dataList[index]);
            },
            getDateFlowOptions: function (data, index1, index2) {
                return generalChartService.queryDoubleColumnOptions({
                    title: "流量变化趋势",
                    xtitle: "日期",
                    ytitle1: "下行流量(MB)",
                    ytitle2: "上行流量(MB)"
                }, data.categories, data.dataList[index1], data.dataList[index2]);
            },
            getDateUsersOptions: function (data, index1, index2) {
                return generalChartService.queryDoubleColumnOptions({
                    title: "用户数变化趋势",
                    xtitle: "日期",
                    ytitle1: "平均用户数",
                    ytitle2: "最大激活用户数"
                }, data.categories, data.dataList[index1], data.dataList[index2]);
            },
            getCellIndoorTypeColumnOptions: function(stats) {
                return generalChartService.getStackColumnOptions(stats, {
                    title: '各区室内外小区分布',
                    xtitle: '区域',
                    ytitle: '小区数',
                    seriesTitles: ['室内小区', '室外小区']
                }, function(stat) {
                    return stat.district;
                }, [
                    function(stat) {
                        return stat.totalIndoorCells;
                    }, function(stat) {
                        return stat.totalOutdoorCells;
                    }
                ]);
            },
            getCellBandClassColumnOptions: function(stats) {
                return generalChartService.getStackColumnOptions(stats, {
                    title: '各区小区频段分布',
                    xtitle: '区域',
                    ytitle: '小区数',
                    seriesTitles: ['2.1G频段', '1.8G频段', '800M频段', 'TDD频段']
                }, function(stat) {
                    return stat.district;
                }, [
                    function(stat) {
                        return stat.band1Cells;
                    }, function(stat) {
                        return stat.band3Cells;
                    }, function (stat) {
                        return stat.band5Cells;
                    }, function (stat) {
                        return stat.band41Cells;
                    }
                ]);
            }
        };
    })
    .factory('preciseChartService', function (generalChartService, chartCalculateService) {
        return {
            getTypeOption: function (views) {
                return chartCalculateService.generateDrillDownPieOptions(generalChartService.generateCompoundStats(views), {
                    title: "工单类型分布图",
                    seriesName: "工单类型"
                });
            },

            getStateOption: function (views) {
                return chartCalculateService.generateDrillDownPieOptions(generalChartService.generateCompoundStats(views), {
                    title: "工单状态分布图",
                    seriesName: "工单状态"
                });
            },

            getDistrictOption: function (views) {
                return chartCalculateService.generateDrillDownPieOptions(generalChartService.generateCompoundStats(views), {
                    title: "工单镇区分布图",
                    seriesName: "镇区"
                });
            },

            getTownFlowOption: function (views) {
                return chartCalculateService.generateDrillDownPieOptions(generalChartService.generateCompoundStats(views, function (view) {
                    return view.district;
                }, function (view) {
                    return view.town;
                }, function (view) {
                    return (view.pdcpDownlinkFlow + view.pdcpUplinkFlow) / 1024 / 1024 / 8;
                }), {
                    title: "流量镇区分布图(TB)",
                    seriesName: "区域"
                });
            },

            getTownUsersOption: function (views) {
                return chartCalculateService.generateDrillDownPieOptions(generalChartService.generateCompoundStats(views, function (view) {
                    return view.district;
                }, function (view) {
                    return view.town;
                }, function (view) {
                    return view.maxUsers;
                }), {
                    title: "最大在线用户数镇区分布图(TB)",
                    seriesName: "区域"
                });
            },

            getCoverageOptions: function (stats) {
                var chart = new ComboChart();
                chart.initialize({
                    title: '覆盖情况统计',
                    xTitle: 'RSRP(dBm)',
                    yTitle: 'MR次数'
                });
                angular.forEach(stats, function (stat, index) {
                    var data = chartCalculateService.generateMrsRsrpStats(stat);
                    if (index === 0) {
                        chart.xAxis[0].categories = data.categories;
                    }
                    chart.series.push({
                        type: 'spline',
                        name: stat.statDate,
                        data: data.values
                    });
                });

                return chart.options;
            },

            getTaOptions: function (stats) {
                var chart = new ComboChart();
                chart.initialize({
                    title: '接入距离分布统计',
                    xTitle: '接入距离(米)',
                    yTitle: 'MR次数'
                });
                angular.forEach(stats, function (stat, index) {
                    var data = chartCalculateService.generateMrsTaStats(stat);
                    if (index === 0) {
                        chart.xAxis[0].categories = data.categories;
                    }
                    chart.series.push({
                        type: 'spline',
                        name: stat.statDate,
                        data: data.values
                    });
                });

                return chart.options;
            },

            getRsrpTaOptions: function (stats, rsrpIndex) {
                var chart = new ComboChart();
                chart.initialize({
                    title: '接入距离分布统计',
                    xTitle: '接入距离(米)',
                    yTitle: 'MR次数'
                });
                chart.legend.align = 'right';
                angular.forEach(stats, function (stat, index) {
                    var data = chartCalculateService.generateRsrpTaStats(stat, rsrpIndex);
                    if (index === 0) {
                        chart.xAxis[0].categories = data.categories;
                        chart.title.text += '(' + data.seriesName + ')';
                    }
                    chart.series.push({
                        type: 'line',
                        name: stat.statDate,
                        data: data.values
                    });
                });

                return chart.options;
            }
        }
    });