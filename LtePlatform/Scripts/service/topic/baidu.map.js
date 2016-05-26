angular.module('baidu.map', ['myApp.url', 'myApp.parameters'])
    .factory('geometryService', function($http, $q, appUrlService) {
        var getDistanceFunc = function(p1Lat, p1Lng, p2Lat, p2Lng) {
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
        var getPositionFunc = function(centre, r, angle) {
            var x = r * Math.cos(angle * Math.PI / 180);
            var y = r * Math.sin(angle * Math.PI / 180);
            return getLonLatFunc(centre, x, y);
        };
        var getPositionRadius = function (centre, r, rad) {
        	var x = r * Math.cos(rad);
        	var y = r * Math.sin(rad);
        	return getLonLatFunc(centre, x, y);
        };
        var getRadiusFunc = function(zoom) {
            var rSation = 70;
            var rSector = 0.2;
            switch (zoom) {
            case 15:
                rSector*= 0.75;
                rSation*= 0.75;
                break;
            case 16:
                rSector/= 2.5;
                rSation/= 2.5;
                break;
            case 17:
                rSector/= 5;
                rSation/= 5;
                break;
            default:
                break;
            }

            return { rSector: rSector, rStation: rSation };
        };
        var myKey = 'LlMnTd7NcCWI1ibhDAdKeVlG';
        var baiduApiUrl = '//api.map.baidu.com/geoconv/v1/?callback=JSON_CALLBACK';
        return {
            getDistance: function(p1Lat, p1Lng, p2Lat, p2Lng) {
                return getDistanceFunc(p1Lat, p1Lng, p2Lat, p2Lng);
            },
            getLonLat: function(centre, x, y) {
                return getLonLatFunc(centre, x, y);
            },
            getPosition: function(centre, r, angle) {
                return getPositionFunc(centre, r, angle);
            },
            getPositionLonLat: function (centre, r, angle) {
            	var x = r * Math.cos(angle * Math.PI / 180);
            	var y = r * Math.sin(angle * Math.PI / 180);
            	var lat = centre.lattitute + y / getDistanceFunc(centre.lattitute, centre.longtitute, centre.lattitute + 1, centre.longtitute);
            	var lng = centre.longtitute + x / getDistanceFunc(centre.lattitute, centre.longtitute, centre.lattitute, centre.longtitute + 1);
                return {
                    longtitute: lng,
                    lattitute: lat
                };
            },
            generateSectorPolygonPoints: function(centre, irotation, iangle, zoom, scalor) {
                var assemble = [];
                var dot;
                var i;
                var r = getRadiusFunc(zoom).rSector * (scalor || 1);

                for (i = 0; i <= r; i += r / 2) {
                    dot = getPositionFunc(centre, i, irotation);
                    assemble.push(dot);
                }

                for (i = 0; i <= iangle; i += iangle / 5) {
                    dot = getPositionFunc(centre, r, i + irotation);
                    assemble.push(dot);
                }

                return assemble;
            },
            getRadius: function(zoom) {
                return getRadiusFunc(zoom);
            },
            getDtPointRadius: function(zoom) {
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
			getArrowLine: function(x1, y1, x2, y2, r) {
				var rad = Math.atan2(y2 - y1, x2 - x1);
			    var centre = {
			        lng: x2,
			        lat: y2
			    };
			    var point1 = getPositionRadius(centre, -r, rad - 0.2);
			    var point2 = getPositionRadius(centre, -r, rad + 0.2);
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
            transformToBaidu: function(longtitute, lattitute) {
                var deferred = $q.defer();
                $http.jsonp(baiduApiUrl + '&coords=' + longtitute + ',' + lattitute
                        + '&from=1&to=5&ak=' + myKey).success(function(result) {
                        deferred.resolve(result.result[0]);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            transformBaiduCoors: function(coors) {
                var deferred = $q.defer();
                $http.jsonp(baiduApiUrl + '&coords=' + coors.longtitute + ',' + coors.lattitute
                        + '&from=1&to=5&ak=' + myKey).success(function(result) {
                        coors.longtitute = result.result[0].x;
                        coors.lattitute = result.result[0].y;
                        deferred.resolve(coors);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;;
            },
            queryWandonglouyu: function() {
                var deferred = $q.defer();
                $http.get(appUrlService.getPlanUrlHost() + 'phpApi/wandonglouyu.php')
                    .success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;;
            }
        };
    })
    .factory('baiduMapService', function (geometryService, networkElementService) {
    	var map = {};
        var getCellCenter = function(cell, rCell) {
            return geometryService.getPositionLonLat(cell, rCell, cell.azimuth);
        };
        return {
            initializeMap: function(tag, zoomLevel) {
                map = new BMap.Map(tag);
                map.centerAndZoom(new BMap.Point(113.01, 23.02), zoomLevel);
                map.setMinZoom(8); //设置地图最小级别
                map.setMaxZoom(17); //设置地图最大级别

                map.enableScrollWheelZoom(); //启用滚轮放大缩小
                map.enableDragging();
                map.disableDoubleClickZoom();

                var topLeftControl = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }); // 左上角，添加比例尺
                var topLeftNavigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件

                map.addControl(topLeftControl);
                map.addControl(topLeftNavigation);
            },
            addCityBoundary: function(city) {
                var bdary = new BMap.Boundary();
                bdary.get(city, function(rs) { //获取行政区域
                    var count = rs.boundaries.length; //行政区域的点有多少个
                    if (count === 0) {
                        return;
                    }
                    for (var i = 0; i < count; i++) {
                        var ply = new BMap.Polygon(rs.boundaries[i], {
                            strokeWeight: 2,
                            strokeColor: "#ff0000",
                            fillOpacity: 0.1
                        }); //建立多边形覆盖物
                        map.addOverlay(ply); //添加覆盖物
                    }
                });
            },
            removeOverlay: function(overlay) {
                map.removeOverlay(overlay);
            },
            removeOverlays: function(overlays) {
                angular.forEach(overlays, function(overlay) {
                    map.removeOverlay(overlay);
                });
            },
			addOverlays: function(overlays) {
				angular.forEach(overlays, function (overlay) {
					map.addOverlay(overlay);
				});
			},
            clearOverlays: function() {
                map.clearOverlays();
            },
			generateNeighborLines: function(lines, cell, neighbors, xOffset, yOffset) {
				var zoom = map.getZoom();
				var rSector = geometryService.getRadius(zoom).rSector;
				var centerCell = getCellCenter(cell, rSector / 2);
			    angular.forEach(neighbors, function (neighbor) {
			    	networkElementService.queryCellInfo(neighbor.neighborCellId, neighbor.neighborSectorId).then(function (neighborCell) {
			    		var neighborCenter = getCellCenter(neighborCell, rSector / 2);
				        var line = geometryService.getArrowLine(centerCell.longtitute + xOffset, centerCell.lattitute + yOffset,
				            neighborCenter.longtitute + xOffset, neighborCenter.lattitute + yOffset, rSector/2);
				        lines.push(line);
				    });
			    });
			},
			generateReverseNeighborLines: function (lines, cell, neighbors, xOffset, yOffset) {
				var zoom = map.getZoom();
				var rSector = geometryService.getRadius(zoom).rSector;
				var centerCell = getCellCenter(cell, rSector / 2);
				angular.forEach(neighbors, function (neighbor) {
					networkElementService.queryCellInfo(neighbor.cellId, neighbor.sectorId).then(function (neighborCell) {
						var neighborCenter = getCellCenter(neighborCell, rSector / 2);
						var line = geometryService.getLine(centerCell.longtitute + xOffset, centerCell.lattitute + yOffset,
				            neighborCenter.longtitute + xOffset, neighborCenter.lattitute + yOffset, "red");
						lines.push(line);
					});
				});
			},
            addOneMarker: function(marker, html) {
                map.addOverlay(marker);
                var infoBox = new BMapLib.InfoBox(map, html, {
                    boxStyle: {
                        background: "url('/Content/themes/baidu/tipbox.jpg') no-repeat center top",
                        width: "270px",
                        height: "200px"
                    },
                    closeIconUrl: "/Content/themes/baidu/close.png",
                    closeIconMargin: "1px 1px 0 0",
                    enableAutoPan: true,
                    align: INFOBOX_AT_TOP
                });
                marker.addEventListener("click", function() {

                    infoBox.open(this);
                });
            },
            addOneMarkerToScope: function(marker, callback, data) {
                map.addOverlay(marker);
                marker.addEventListener("click", function() {
                    callback(data);
                });
            },
            addOneSector: function(sector, html, boxHeight) {
                boxHeight = boxHeight || "300px";
                map.addOverlay(sector);
                var infoBox = new BMapLib.InfoBox(map, html, {
                    boxStyle: {
                        background: "url('/Content/themes/baidu/tipbox.jpg') no-repeat center top",
                        width: "270px",
                        height: boxHeight
                    },
                    closeIconUrl: "/Content/themes/baidu/close.png",
                    closeIconMargin: "1px 1px 0 0",
                    enableAutoPan: true,
                    align: INFOBOX_AT_TOP
                });
                sector.addEventListener("click", function() {
                    infoBox.open(this.getPath()[2]);
                });
            },
            addOneSectorToScope: function(sector, callBack, neighbor) {
                map.addOverlay(sector);
                sector.addEventListener("click", function() {
                    callBack(neighbor);
                });
            },
            setCellFocus: function(longtitute, lattitute, zoomLevel) {
                zoomLevel = zoomLevel || 15;
                map.centerAndZoom(new BMap.Point(longtitute, lattitute), zoomLevel);
            },
            generateSector: function(data, sectorColor, scalor) {
                var center = { lng: data.longtitute, lat: data.lattitute };
                var iangle = 65;
                var irotation = data.azimuth - iangle / 2;
                var zoom = map.getZoom();
                var points = geometryService.generateSectorPolygonPoints(center, irotation, iangle, zoom, scalor);
                sectorColor = sectorColor || "blue";
                var sector = new BMap.Polygon(points, {
                    strokeWeight: 2,
                    strokeColor: sectorColor,
                    fillColor: sectorColor,
                    fillOpacity: 0.5
                });
                return sector;
            },
            getCurrentMapRange: function(xOffset, yOffset) {
                return {
                    west: map.getBounds().getSouthWest().lng + xOffset,
                    south: map.getBounds().getSouthWest().lat + yOffset,
                    east: map.getBounds().getNorthEast().lng + xOffset,
                    north: map.getBounds().getNorthEast().lat + yOffset
                };
            },
            generateIconMarker: function(longtitute, lattitute, iconUrl) {
                var icon = new BMap.Icon(iconUrl, new BMap.Size(20, 30));
                return new BMap.Marker(new BMap.Point(longtitute, lattitute), {
                    icon: icon
                });
            },
            generateMarker: function(longtitute, lattitute) {
                return new BMap.Marker(new BMap.Point(longtitute, lattitute));
            },
            drawPolygonAndGetCenter: function(coors) {
                var centerx = 0;
                var centery = 0;
                var points = [];
                for (var p = 0; p < coors.length / 2; p++) {
                    points.push(new BMap.Point(parseFloat(coors[2 * p]), parseFloat(coors[2 * p + 1])));
                    centerx += parseFloat(coors[2 * p]);
                    centery += parseFloat(coors[2 * p + 1]);
                }
                centerx /= coors.length / 2;
                centery /= coors.length / 2;
                var polygon = new BMap.Polygon(points,
                { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.2 });
                map.addOverlay(polygon);
                return {
                    X: centerx,
                    Y: centery
                };
            },
            drawRectangleAndGetCenter: function(coors) {
                var centerx = (parseFloat(coors[0]) + parseFloat(coors[2])) / 2;
                var centery = (parseFloat(coors[1]) + parseFloat(coors[3])) / 2;
                var rectangle = new BMap.Polygon([
                    new BMap.Point(parseFloat(coors[0]), parseFloat(coors[1])),
                    new BMap.Point(parseFloat(coors[2]), parseFloat(coors[1])),
                    new BMap.Point(parseFloat(coors[2]), parseFloat(coors[3])),
                    new BMap.Point(parseFloat(coors[0]), parseFloat(coors[3]))
                ], { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.2 });
                map.addOverlay(rectangle);
                return {
                    X: centerx,
                    Y: centery
                };
            },
            drawCircleAndGetCenter: function(coors) {
                var centerx = parseFloat(coors[0]);
                var centery = parseFloat(coors[1]);
                var circle = new BMap.Circle(new BMap.Point(parseFloat(coors[0]), parseFloat(coors[1])),
                    parseFloat(coors[2]),
                    { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.2 });
                map.addOverlay(circle);
                return {
                    X: centerx,
                    Y: centery
                };
            },
            drawLabel: function(name, longtitute, lattitute) {
                var opts = {
                    position: new BMap.Point(longtitute, lattitute), // 指定文本标注所在的地理位置
                    offset: new BMap.Size(10, -20) //设置文本偏移量
                };
                var label = new BMap.Label(name, opts); // 创建文本标注对象
                label.setStyle({
                    color: "red",
                    fontSize: "12px",
                    height: "20px",
                    lineHeight: "20px",
                    fontFamily: "微软雅黑"
                });
                map.addOverlay(label);
            }
        };
    });