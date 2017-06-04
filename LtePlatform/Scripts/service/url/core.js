angular.module('app.core', [])
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
        return {
            getApiUrl: function(topic) {
                return '/api/' + topic;
            },
            userInfoUrl: "/api/Me",
            siteUrl: "/",
            parseQueryString: parseQueryString,
            getAccessToken: function() {
                var token = sessionStorage.getItem("accessToken");
                if (!token) initializeAuthorization();
                return token || sessionStorage.getItem("accessToken");
            },
            initializeAuthorization: initializeAuthorization,
            getPlanUrlHost: function() {
                return (window.location.hostname === '219.128.254.38') ? 'http://219.128.254.36:8070/' : 'http://10.17.165.111:8070/';
            },
            getDtUrlHost: function() {
                return (window.location.hostname === '219.128.254.38') ? 'http://219.128.254.38:2888/' : 'http://10.17.165.100:2888/';
            },
            getDistributionHost: function() {
                return (window.location.hostname === '219.128.254.38') ? 'http://219.128.254.36:8086/' : 'http://10.17.165.111:8086/';
            },
            getParameterUrlHost: function() {
                return (window.location.hostname === '219.128.254.38') ? 'http://219.128.254.36:8001/' : 'http://10.17.165.111:8001/';
            },
            getBuildingUrlHost: function() {
                return (window.location.hostname === '219.128.254.38') ? 'http://219.128.254.36:8002/' : 'http://10.17.165.111:8002/';
            },
            getTopnUrlHost: function() {
                return (window.location.hostname === '219.128.254.38') ? 'http://219.128.254.36:8006/' : 'http://10.17.165.111:8006/';
            },
            getInterferenceHost: function() {
                return (window.location.hostname === '219.128.254.38') ? 'http://219.128.254.36:18080/' : 'http://10.17.165.111:18080/';
            },
            getCustomerHost: function() {
                return (window.location.hostname === '219.128.254.38') ? 'http://219.128.254.38:8099/' : 'http://10.17.165.100:8099/';
            },
            getPhpHost: function() {
                return (window.location.hostname === '219.128.254.38') ? 'http://219.128.254.36:9000/' : 'http://10.17.165.111:9000/';
            },
            getPhpUriComponent: function(obj) {
                var str = [];
                for (var p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                }
                return str.join("&");
            },

            initializeIndexedDb: function(myDb, storeNames, key, callback) {
                var version = myDb.version || 1;
                var request = window.indexedDB.open(myDb.name, version);
                request.onerror = function(e) {
                    console.log(e.currentTarget.error.message);
                };
                request.onsuccess = function(e) {
                    myDb.db = e.target.result;
                    if (callback) {
                        callback();
                    }
                };
                request.onupgradeneeded = function(e) {
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
                request.onsuccess = function(e) {
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
            fetchStoreByCursor: function(db, storeName, callback) {
                var transaction = db.transaction(storeName);
                var store = transaction.objectStore(storeName);
                var request = store.openCursor();
                var data = [];
                request.onsuccess = function(e) {
                    var cursor = e.target.result;
                    if (cursor) {
                        data.push(cursor.value);
                        cursor.continue();
                    } else if (callback) {
                        callback(data);
                    }
                };
            }
        };
    })
    .controller('header.menu', function($scope, appUrlService) {
        $scope.emergencyUrl = appUrlService.getCustomerHost() + 'IndexOfEmerCom.aspx';
        $scope.marketUrl = appUrlService.getCustomerHost() + 'IndexOfTelJobs.aspx';
        $scope.rfUrl = appUrlService.getParameterUrlHost() + 'RadioFreqency.html';
        $scope.commonMenu = {
            $folded: true
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
            getApiData: function (topic, params) {
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
            postApiData: function (topic, data) {
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
                }).success(function (result) {
                    deferred.resolve(result);
                })
                    .error(function (reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            postPhpUrlData: function (url, data) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (obj) {
                        return appUrlService.getPhpUriComponent(obj);
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
            deleteApiData: function (topic) {
                var deferred = $q.defer();
                $http.delete(appUrlService.getApiUrl(topic)).success(function (result) {
                    deferred.resolve(result);
                })
                    .error(function (reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            getJsonpData: function (url, valueFunc) {
                var deferred = $q.defer();
                $http.jsonp(url).success(function (result) {
                    deferred.resolve(valueFunc(result));
                })
                    .error(function (reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            getUrlData: function (url, params) {
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
    });