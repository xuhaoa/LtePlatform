angular.module('baidu.map', ['myApp.url', 'myApp.region', "ui.bootstrap", 'myApp.kpi'])
	.value('drawingStyleOptions', {
		strokeColor: "red",    //边线颜色。
		fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
		strokeWeight: 3,       //边线的宽度，以像素为单位。
		strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
		fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
		strokeStyle: 'solid' //边线的样式，solid或dashed。
	})
	.value('baiduMapOptions', {
		myKey: 'LlMnTd7NcCWI1ibhDAdKeVlG',
		baiduApiUrl: '//api.map.baidu.com/geoconv/v1/?callback=JSON_CALLBACK',
		baiduPlaceUrl: '//api.map.baidu.com/place/v2/suggestion?callback=JSON_CALLBACK'
	})
	.factory('baiduQueryService', function (generalHttpService, appUrlService, baiduMapOptions) {
		return{

			transformToBaidu: function (longtitute, lattitute) {
				return generalHttpService.getJsonpData(baiduMapOptions.baiduApiUrl + '&coords=' + longtitute + ',' + lattitute
					+ '&from=1&to=5&ak=' + baiduMapOptions.myKey, function (result) {
						return result.result[0];
					});
			},
			transformBaiduCoors: function (coors) {
				return generalHttpService.getJsonpData(baiduMapOptions.baiduApiUrl + '&coords=' + coors.longtitute + ',' + coors.lattitute
					+ '&from=1&to=5&ak=' + baiduMapOptions.myKey, function (result) {
						return {
							longtitute: result.result[0].x,
							lattitute: result.result[0].y
						}
					});
			},
			queryBaiduPlace: function (name) {
				return generalHttpService.getJsonpData(baiduMapOptions.baiduPlaceUrl + '&query=' + name
					+ '&region=佛山市&output=json&ak=' + baiduMapOptions.myKey, function (result) {
					return result.result;
				});
			},
			queryWandonglouyu: function () {
				return generalHttpService.getUrlData(appUrlService.getPlanUrlHost() + 'phpApi/wandonglouyu.php', {});
			}
		}
	})
	.factory('baiduMapService', function (geometryService, networkElementService, drawingStyleOptions) {
		var mapStructure = {
			mainMap: {},
			subMap: {}
		};
		var map = mapStructure.mainMap;
		var getCellCenter = function (cell, rCell) {
			return geometryService.getPositionLonLat(cell, rCell, cell.azimuth);
		};
		var drawingManager = {};
		return {
			getMap: function() {
				return map;
			},
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
			switchSubMap: function() {
				map = mapStructure.subMap;
			},
			switchMainMap: function() {
				map = mapStructure.mainMap;
			},
			addClickListener: function(callback) {
				map.addEventListener('click', function(e) {
					callback(e);
				});
			},
			setCenter: function (distinctIndex) {
				var lonDictionary = [113.30, 113.15, 113.12, 112.87, 112.88, 113.01];
				var latDictionay = [22.80, 23.03, 23.02, 23.17, 22.90, 23.02];
				var index = parseInt(distinctIndex) - 1;
				index = (index > 4 || index < 0) ? 5 : index;
				map.centerAndZoom(new BMap.Point(lonDictionary[index], latDictionay[index]), 12);
			},
			initializeDrawingManager: function() {
				drawingManager = new BMapLib.DrawingManager(map, {
					isOpen: true, //是否开启绘制模式
					enableDrawingTool: true, //是否显示工具栏
					drawingToolOptions: {
						anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
						offset: new BMap.Size(5, 5), //偏离值
						drawingTypes: [
							BMAP_DRAWING_CIRCLE,
							BMAP_DRAWING_POLYGON,
							BMAP_DRAWING_RECTANGLE
						]
					},
					circleOptions: drawingStyleOptions, //圆的样式
					polygonOptions: drawingStyleOptions, //多边形的样式
					rectangleOptions: drawingStyleOptions //矩形的样式
				});
			},
			addDrawingEventListener: function(event, callback) {
				drawingManager.addEventListener(event, callback);
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
							strokeWeight: 3,
							strokeColor: "#ff0000",
							fillOpacity: 0.1
						}); //建立多边形覆盖物
						map.addOverlay(ply); //添加覆盖物
					}
				});
			},
			addDistrictBoundary: function (district, color) {
				var bdary = new BMap.Boundary();
				bdary.get(district, function (rs) { //获取行政区域
					var count = rs.boundaries.length; //行政区域的点有多少个
					if (count === 0) {
						return;
					}
					for (var i = 0; i < count; i++) {
						var ply = new BMap.Polygon(rs.boundaries[i], {
							strokeWeight: 2,
							strokeColor: color || "#00ee22",
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
			generateNeighborLines: function(lines, settings) {
				var zoom = map.getZoom();
				var rSector = geometryService.getRadius(zoom).rSector;
				var centerCell = getCellCenter(settings.cell, rSector / 2);
				angular.forEach(settings.neighbors, function (neighbor) {
					networkElementService.queryCellInfo(neighbor.neighborCellId, neighbor.neighborSectorId).then(function(neighborCell) {
						if (neighborCell) {
							var neighborCenter = getCellCenter(neighborCell, rSector / 2);
							var line = geometryService.getArrowLine(centerCell.longtitute + settings.xOffset,
								centerCell.lattitute + settings.yOffset,
								neighborCenter.longtitute + settings.xOffset, neighborCenter.lattitute + settings.yOffset, rSector / 2);
							lines.push(line);
						}

					});
				});
			},
			generateReverseNeighborLines: function (lines, settings) {
				var zoom = map.getZoom();
				var rSector = geometryService.getRadius(zoom).rSector;
				var centerCell = getCellCenter(settings.cell, rSector / 2);
				angular.forEach(settings.neighbors, function (neighbor) {
					networkElementService.queryCellInfo(neighbor.cellId, neighbor.sectorId).then(function(neighborCell) {
						if (neighborCell) {
							var neighborCenter = getCellCenter(neighborCell, rSector / 2);
							var line = geometryService.getLine(centerCell.longtitute + settings.xOffset,
								centerCell.lattitute + settings.yOffset,
								neighborCenter.longtitute + settings.xOffset,
								neighborCenter.lattitute + settings.yOffset, "red");
							lines.push(line);
						}

					});
				});
			},
			generateInterferenceComponents: function (lines, circles, cell, neighbors, xOffset, yOffset, color, callback) {
				var zoom = map.getZoom();
				var rSector = geometryService.getRadius(zoom).rSector;
				var centerCell = getCellCenter(cell, rSector / 2);
				angular.forEach(neighbors, function (neighbor) {
					if (neighbor.destENodebId > 0) {
						networkElementService.queryCellInfo(neighbor.destENodebId, neighbor.destSectorId).then(function(neighborCell) {
							var neighborCenter = getCellCenter(neighborCell, rSector / 2);
							var line = geometryService.getLine(centerCell.longtitute + xOffset, centerCell.lattitute + yOffset,
								neighborCenter.longtitute + xOffset, neighborCenter.lattitute + yOffset, color);
							lines.push(line);
							var circle = geometryService.getCircle(
								neighborCenter.longtitute + xOffset,
								neighborCenter.lattitute + yOffset,
								50, color,
								callback, neighbor);
							circles.push(circle);
						});
					}
				});
			},
			generateVictimComponents: function (lines, circles, cell, neighbors, xOffset, yOffset, color, callback) {
				var zoom = map.getZoom();
				var rSector = geometryService.getRadius(zoom).rSector;
				var centerCell = getCellCenter(cell, rSector / 2);
				angular.forEach(neighbors, function (neighbor) {
					if (neighbor.victimENodebId > 0) {
						networkElementService.queryCellInfo(neighbor.victimENodebId, neighbor.victimSectorId).then(function(neighborCell) {
							var neighborCenter = getCellCenter(neighborCell, rSector / 2);
							var line = geometryService.getLine(centerCell.longtitute + xOffset, centerCell.lattitute + yOffset,
								neighborCenter.longtitute + xOffset, neighborCenter.lattitute + yOffset, color);
							lines.push(line);
							var circle = geometryService.getCircle(
								neighborCenter.longtitute + xOffset, neighborCenter.lattitute + yOffset, 50, color,
								callback, neighbor);
							circles.push(circle);
						});
					}
				});
			},
			addOneMarker: function(marker) {
				map.addOverlay(marker);
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
				sector.addEventListener("click", function() {
					callBack(neighbor);
				});
				map.addOverlay(sector);
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
			generateCircleMarker: function(longtitute, lattitute, color) {
				return new BMap.Circle(new BMap.Point(longtitute, lattitute), 5,
				{
					strokeColor: color,
					strokeWeight: 1,
					strokeOpacity: 0.8,
					fillColor: color
				});
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
					Y: centery,
					points: points
				};
			},
			drawPolygon: function(coors) {
				var points = [];
				for (var p = 0; p < coors.length / 2; p++) {
					points.push(new BMap.Point(parseFloat(coors[2 * p]), parseFloat(coors[2 * p + 1])));
				}
				var polygon = new BMap.Polygon(points,
				{ strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.2 });
				map.addOverlay(polygon);
			},
			drawPolygonWithColor: function (coorsString, color, xoffset, yoffset) {
				var points = [];
				var coors = coorsString.split(';');
				if (coors[coors.length - 2].trim() === coors[0].trim()) {
					coors = coors.slice(0, coors.length - 2);
				}
				angular.forEach(coors, function(coor) {
					if (coor.length > 1) {
						var fields = coor.split(',');
						points.push(new BMap.Point(parseFloat(fields[0]) - xoffset, parseFloat(fields[1]) - yoffset));
					}
				});
				var polygon = new BMap.Polygon(points,
				{ strokeColor: color, strokeWeight: 1, strokeOpacity: 0.2, fillColor: color });
				map.addOverlay(polygon);
				return polygon.getPath();
			},
			getPolygonCenter: function(coors) {
				var centerx = 0;
				var centery = 0;
				for (var p = 0; p < coors.length / 2; p++) {
					centerx += parseFloat(coors[2 * p]);
					centery += parseFloat(coors[2 * p + 1]);
				}
				centerx /= coors.length / 2;
				centery /= coors.length / 2;
				return {
					X: centerx,
					Y: centery
				};
			},
			drawRectangleAndGetCenter: function(coors) {
				var centerx = (parseFloat(coors[0]) + parseFloat(coors[2])) / 2;
				var centery = (parseFloat(coors[1]) + parseFloat(coors[3])) / 2;
				var points = [
					new BMap.Point(parseFloat(coors[0]), parseFloat(coors[1])),
					new BMap.Point(parseFloat(coors[2]), parseFloat(coors[1])),
					new BMap.Point(parseFloat(coors[2]), parseFloat(coors[3])),
					new BMap.Point(parseFloat(coors[0]), parseFloat(coors[3]))
				];
				var rectangle = new BMap.Polygon(points, { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.2 });
				map.addOverlay(rectangle);
				return {
					X: centerx,
					Y: centery,
					points: points
				};
			},
			drawRectangle: function(coors) {
				var rectangle = new BMap.Polygon([
					new BMap.Point(parseFloat(coors[0]), parseFloat(coors[1])),
					new BMap.Point(parseFloat(coors[2]), parseFloat(coors[1])),
					new BMap.Point(parseFloat(coors[2]), parseFloat(coors[3])),
					new BMap.Point(parseFloat(coors[0]), parseFloat(coors[3]))
				], { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.2 });
				map.addOverlay(rectangle);
			},
			getRectangleCenter: function(coors) {
				var centerx = (parseFloat(coors[0]) + parseFloat(coors[2])) / 2;
				var centery = (parseFloat(coors[1]) + parseFloat(coors[3])) / 2;
				return {
					X: centerx,
					Y: centery
				};
			},
			drawCircleAndGetCenter: function(coors) {
				var centerx = parseFloat(coors[0]);
				var centery = parseFloat(coors[1]);
				var circle = new BMap.Circle(new BMap.Point(centerx, centery),
					parseFloat(coors[2]),
					{ strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.2 });
				map.addOverlay(circle);
				return {
					X: centerx,
					Y: centery,
					points: points
				};
			},
			drawCircle: function(coors) {
				var circle = new BMap.Circle(new BMap.Point(parseFloat(coors[0]), parseFloat(coors[1])),
					parseFloat(coors[2]),
					{ strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.2 });
				map.addOverlay(circle);
			},
			getCircleCenter: function(coors) {
				var centerx = parseFloat(coors[0]);
				var centery = parseFloat(coors[1]);
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
			},
			drawCustomizeLabel: function(lon, lat, text, details, lines) {
				var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(lon, lat), text, details, lines);

				map.addOverlay(myCompOverlay);
			},
			drawMultiPoints: function(coors, color, xoffset, yoffset, callback) {
				var points = [];  // 添加海量点数据
				angular.forEach(coors, function(data) {
					points.push(new BMap.Point(data.longtitute - xoffset, data.lattitute - yoffset));
				});
				var options = {
					size: BMAP_POINT_SIZE_SMALL,
					color: color
				}
				var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
				if (callback)
					pointCollection.addEventListener('click', callback);
				map.addOverlay(pointCollection);  // 添加Overlay
				return pointCollection;
			},
			drawPointsUsual: function (coors, xoffset, yoffset, callback) {
				angular.forEach(coors, function (data) {
					var myIcon = new BMap.Icon("/Content/Images/Hotmap/markers.png", new BMap.Size(23, 25), {
						offset: new BMap.Size(10, 25),
						imageOffset: new BMap.Size(0, (0 - data.index + 1) * 25)
					});
					var point = new BMap.Point(data.longtitute - xoffset, data.lattitute - yoffset);
					var marker = new BMap.Marker(point, { icon: myIcon });
					marker.data = data;
					marker.addEventListener("click", callback);
					map.addOverlay(marker);
				});
				return;
			},
			drawPointCollection: function (coors, color, xoffset, yoffset, callback) {

				var points = [];  // 添加海量点数据
				angular.forEach(coors, function (data) {
					var p = new BMap.Point(data.longtitute - xoffset, data.lattitute - yoffset);
					p.data = data;
					points.push(p);
				});
				var options = {
					size: BMAP_POINT_SIZE_SMALL,
					shape: BMAP_POINT_SHAPE_CIRCLE,
					color: color
				}
				var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
				if (callback)
					pointCollection.addEventListener('click', callback);
				map.addOverlay(pointCollection);  // 添加Overlay
				return pointCollection;
			}
		};
	})
	.factory('parametersMapService', function (baiduMapService, networkElementService, baiduQueryService, parametersDialogService,
		neGeometryService) {
		var showENodebsElements = function (eNodebs, beginDate, endDate, shouldShowCells) {
			baiduQueryService.transformToBaidu(eNodebs[0].longtitute, eNodebs[0].lattitute).then(function (coors) {
				var xOffset = coors.x - eNodebs[0].longtitute;
				var yOffset = coors.y - eNodebs[0].lattitute;
				angular.forEach(eNodebs, function (eNodeb) {
					eNodeb.longtitute += xOffset;
					eNodeb.lattitute += yOffset;
					var marker = baiduMapService.generateIconMarker(eNodeb.longtitute, eNodeb.lattitute,
						"/Content/Images/Hotmap/site_or.png");
					baiduMapService.addOneMarkerToScope(marker, function(item) {
						parametersDialogService.showENodebInfo(item, beginDate, endDate);
					}, eNodeb);
					if (shouldShowCells) {
						networkElementService.queryCellInfosInOneENodeb(eNodeb.eNodebId).then(function(cells) {
							angular.forEach(cells, function(cell) {
								cell.longtitute += xOffset;
								cell.lattitute += yOffset;
								var cellSector = baiduMapService.generateSector(cell);
								baiduMapService.addOneSectorToScope(cellSector, function(item) {
									parametersDialogService.showCellInfo(item, beginDate, endDate);
								}, cell);
							});
						});
					}

				});
			});
		};
		var showPhpElements = function (elements, showElementInfo) {
			baiduQueryService.transformToBaidu(elements[0].longtitute, elements[0].lattitute).then(function (coors) {
				var xOffset = coors.x - parseFloat(elements[0].longtitute);
				var yOffset = coors.y - parseFloat(elements[0].lattitute);
				angular.forEach(elements, function (element) {
					element.longtitute = xOffset + parseFloat(element.longtitute);
					element.lattitute = yOffset + parseFloat(element.lattitute);
					var marker = baiduMapService.generateIconMarker(element.longtitute, element.lattitute,
						"/Content/Images/Hotmap/site_or.png");
					baiduMapService.addOneMarkerToScope(marker, showElementInfo, element);
				});
			});
		};
		var showCdmaElements = function (btss) {
			baiduQueryService.transformToBaidu(btss[0].longtitute, btss[0].lattitute).then(function (coors) {
				var xOffset = coors.x - btss[0].longtitute;
				var yOffset = coors.y - btss[0].lattitute;
				angular.forEach(btss, function (bts) {
					bts.longtitute += xOffset;
					bts.lattitute += yOffset;
					var marker = baiduMapService.generateIconMarker(bts.longtitute, bts.lattitute,
						"/Content/Images/Hotmap/site_bl.png");
					baiduMapService.addOneMarkerToScope(marker, function(item) {
						parametersDialogService.showBtsInfo(item);
					}, bts);
					networkElementService.queryCdmaCellInfosInOneBts(bts.btsId).then(function (cells) {
						angular.forEach(cells, function (cell) {
							cell.longtitute += xOffset;
							cell.lattitute += yOffset;
							cell.btsId = bts.btsId;
							var cellSector = baiduMapService.generateSector(cell);
							baiduMapService.addOneSectorToScope(cellSector, function (item) {
								parametersDialogService.showCdmaCellInfo(item);
							}, cell);
						});
					});
				});
			});
		};
		return {
			showElementsInOneTown: function (city, district, town, beginDate, endDate) {
				networkElementService.queryENodebsInOneTown(city, district, town).then(function (eNodebs) {
					showENodebsElements(eNodebs, beginDate, endDate, true);
				});
			},
			showElementsWithGeneralName: function (name, beginDate, endDate) {
				networkElementService.queryENodebsByGeneralName(name).then(function (eNodebs) {
					if (eNodebs.length === 0) return;
					showENodebsElements(eNodebs, beginDate, endDate, true);
				});
			},
			showCdmaInOneTown: function (city, district, town) {
				networkElementService.queryBtssInOneTown(city, district, town).then(function (btss) {
					showCdmaElements(btss);
				});
			},
			showCdmaWithGeneralName: function (name) {
				networkElementService.queryBtssByGeneralName(name).then(function (btss) {
					if (btss.length === 0) return;
					showCdmaElements(btss);
				});
			},
			showENodebs: function (eNodebs, beginDate, endDate) {
				showENodebsElements(eNodebs, beginDate, endDate, false);
			},
			showBtssElements: function (btss) {
				return showCdmaElements(btss);
			},
			showCellSectors: function (cells, showCellInfo) {
				baiduQueryService.transformToBaidu(cells[0].longtitute, cells[0].lattitute).then(function (coors) {
					var xOffset = coors.x - cells[0].longtitute;
					var yOffset = coors.y - cells[0].lattitute;
					baiduMapService.setCellFocus(coors.x, coors.y, 16);
					angular.forEach(cells, function (cell) {
						cell.longtitute += xOffset;
						cell.lattitute += yOffset;
						var cellSector = baiduMapService.generateSector(cell);
						baiduMapService.addOneSectorToScope(cellSector, function (item) {
							showCellInfo(item);
						}, cell);
					});
				});
			},
			showPhpElements: function (elements, showElementInfo) {
				return showPhpElements(elements, showElementInfo);
			},
			showIntervalPoints: function (intervals, coverageOverlays) {
				angular.forEach(intervals, function (interval) {
					var coors = interval.coors;
					var index;
					if (coors.length === 0) {
						return;
					} else
						index = parseInt(coors.length / 2);
					baiduQueryService.transformBaiduCoors(coors[index]).then(function(newCoor) {
						var xoffset = coors[index].longtitute - newCoor.longtitute;
						var yoffset = coors[index].lattitute - newCoor.lattitute;
						var points = baiduMapService.drawMultiPoints(coors, interval.color, xoffset, yoffset);
						if (coverageOverlays)
							$scope.coverageOverlays.push(points);
					});
				});
			},
			displaySourceDistributions: function (sites, filters, colors) {
				baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function(coors) {
					var xOffset = coors.x - sites[0].longtitute;
					var yOffset = coors.y - sites[0].lattitute;
					angular.forEach(filters, function(filter, $index) {
						var stats = _.filter(sites, filter);
						baiduMapService.drawMultiPoints(stats, colors[$index], -xOffset, -yOffset, function(e) {
							var xCenter = e.point.lng - xOffset;
							var yCenter = e.point.lat - yOffset;
							var container = neGeometryService.queryNearestRange(xCenter, yCenter);
							networkElementService.queryRangeDistributions(container).then(function(items) {
								if (items.length) {
									parametersDialogService.showDistributionInfo(items[0]);
								}
							});
						});
					});
				});
			}
		}
	})

	.factory('parametersDialogService', function ($uibModal, $log, menuItemService, baiduMapService) {
		return {
			showENodebInfo: function (eNodeb, beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Parameters/Map/ENodebMapInfoBox.html',
					controller: 'map.eNodeb.dialog',
					resolve: {
						dialogTitle: function () {
							return eNodeb.name + "-" + "基站基本信息";
						},
						eNodeb: function () {
							return eNodeb;
						},
						beginDate: function() {
							return beginDate;
						},
						endDate: function() {
							return endDate;
						}
					}
				});
			},
			showTownENodebInfo: function (item, city, district) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Parameters/Region/TownENodebInfo.html',
					controller: 'town.eNodeb.dialog',
					resolve: {
						dialogTitle: function () {
							return city + district + item.town + "-" + "基站基本信息";
						},
						city: function () {
							return city;
						},
						district: function () {
							return district;
						},
						town: function () {
							return item.town;
						}
					}
				});
			},
			showTownDtInfo: function (item) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: '/appViews/College/Coverage/CollegeMap.html',
					controller: 'town.dt.dialog',
					resolve: {
						dialogTitle: function () {
							return item.cityName + item.districtName + item.townName + "-" + "路测数据文件信息";
						},
						item: function () {
							return item;
						}
					}
				}, function(info) {
					baiduMapService.switchMainMap();
				});
			},
			showHotSpotsInfo: function (hotSpotList) {
				menuItemService.showGeneralDialogWithAction({
					templateUrl: '/appViews/Parameters/Map/HotSpotInfoBox.html',
					controller: 'hot.spot.info.dialog',
					resolve: {
						dialogTitle: function () {
							return "热点信息列表";
						},
						hotSpotList: function () {
							return hotSpotList;
						}
					}
				});
			},
			showDistributionInfo: function (distribution) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Parameters/Map/DistributionMapInfoBox.html',
					controller: 'map.distribution.dialog',
					resolve: {
						dialogTitle: function() {
							return distribution.name + "-" + "室内分布基本信息";
						},
						distribution: function() {
							return distribution;
						}
					}
				});
			},
			showBtsInfo: function (bts) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Parameters/Map/BtsMapInfoBox.html',
					controller: 'map.bts.dialog',
					resolve: {
						dialogTitle: function() {
							return bts.name + "-" + "基站基本信息";
						},
						bts: function() {
							return bts;
						}
					}
				});
			},
			showCellInfo: function (cell, beginDate, endDate) {
				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: '/appViews/Rutrace/Map/NeighborMapInfoBox.html',
					controller: 'map.neighbor.dialog',
					size: 'lg',
					resolve: {
						dialogTitle: function () {
							return cell.cellName + "小区信息";
						},
						neighbor: function () {
							return cell;
						},
						beginDate: function() {
							return beginDate;
						},
						endDate: function() {
							return endDate;
						}
					}
				});
				modalInstance.result.then(function (nei) {
					console.log(nei);
				}, function () {
					$log.info('Modal dismissed at: ' + new Date());
				});
			},
			showCellsInfo: function (sectors) {
				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: '/appViews/Parameters/Map/CellsMapInfoBox.html',
					controller: 'map.sectors.dialog',
					size: 'lg',
					resolve: {
						dialogTitle: function () {
							return "小区信息列表";
						},
						sectors: function () {
							return sectors;
						}
					}
				});
				modalInstance.result.then(function (nei) {
					console.log(nei);
				}, function () {
					$log.info('Modal dismissed at: ' + new Date());
				});
			},
			showPlanningSitesInfo: function (site) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Home/PlanningDetails.html',
					controller: 'map.site.dialog',
					resolve: {
						dialogTitle: function() {
							return "规划站点信息:" + site.formalName;
						},
						site: function() {
							return site;
						}
					}
				});
			},
			showStationInfo: function (station, beginDate, endDate) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Home/StationDetails.html',
					controller: 'map.station.dialog',
					resolve: {
						dialogTitle: function() {
							return "站点信息:" + station.StationName;
						},
						station: function() {
							return station;
						},
						beginDate: function() {
							return beginDate;
						},
						endDate: function() {
							return endDate;
						}
					}
				});
			},
			showStationList: function () {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Home/StationListDialog.html',
					controller: 'map.stationList.dialog',
					resolve: {
						dialogTitle: function() {
							return "站点列表";
						}
					}
				});
			},
			showStationEdit: function (stationId) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Home/StationEdit.html',
					controller: 'map.stationEdit.dialog',
					resolve: {
						dialogTitle: function() {
							return "编辑站点";
						},
						stationId: function() {
							return stationId;
						}
					}
				});
			},
			showStationAdd: function () {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Home/StationAdd.html',
					controller: 'map.stationAdd.dialog',
					resolve: {
						dialogTitle: function() {
							return "站点添加";
						}
					}
				});
			},
			showCollegeCellInfo: function (cell) {
				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: '/appViews/College/Table/CollegeCellInfoBox.html',
					controller: 'college.cell.dialog',
					size: 'sm',
					resolve: {
						dialogTitle: function () {
							return cell.eNodebName + "-" + cell.sectorId + "小区信息";
						},
						cell: function () {
							return cell;
						}
					}
				});
				modalInstance.result.then(function (nei) {
					console.log(nei);
				}, function () {
					$log.info('Modal dismissed at: ' + new Date());
				});
			},
			showCdmaCellInfo: function (cell) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Parameters/Map/CdmaCellInfoBox.html',
					controller: 'map.cdma.cell.dialog',
					resolve: {
						dialogTitle: function() {
							return cell.cellName + "小区信息";
						},
						neighbor: function() {
							return cell;
						}
					}
				});
			},
			showCollegeCdmaCellInfo: function (cell) {
				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: '/appViews/College/Table/CdmaCellInfoBox.html',
					controller: 'map.cdma.cell.dialog',
					size: 'sm',
					resolve: {
						dialogTitle: function () {
							return cell.btsName + "-" + cell.sectorId + "小区信息";
						},
						neighbor: function () {
							return cell;
						}
					}
				});
				modalInstance.result.then(function (nei) {
					console.log(nei);
				}, function () {
					$log.info('Modal dismissed at: ' + new Date());
				});
			},
			showBuildingInfo: function (building) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/Evaluation/Dialog/BuildingInfoBox.html',
					controller: 'map.building.dialog',
					resolve: {
						dialogTitle: function() {
							return building.name + "楼宇信息";
						},
						building: function() {
							return building;
						}
					}
				});
			},
			maintainCollegeInfo: function(year) {
				menuItemService.showGeneralDialog({
					templateUrl: '/appViews/College/Stat.html',
					controller: 'maintain.college.dialog',
					resolve: {
						dialogTitle: function () {
							return "校园基础信息维护（" + year + "年）";
						},
						year: function () {
							return year;
						}
					}
				});
			},
			showCollegeFlow: function (year) {
				menuItemService.showGeneralDialog({
				    templateUrl: '/appViews/College/Test/Flow.html',
					controller: 'college.flow',
					resolve: {
						dialogTitle: function () {
						    return "校园流量分析（" + year + "年）";
						},
						year: function () {
							return year;
						}
					}
				});
			}
		};
	})

	.controller('map.eNodeb.dialog', function($scope, $uibModalInstance, eNodeb, dialogTitle,
		networkElementService, cellHuaweiMongoService, alarmImportService, intraFreqHoService, interFreqHoService, appFormatService,
		downSwitchService) {
		$scope.dialogTitle = dialogTitle;
		//查询基站基本信息
		networkElementService.queryENodebInfo(eNodeb.eNodebId).then(function(result) {
			$scope.eNodebGroups = appFormatService.generateENodebGroups(result);
			networkElementService.queryStationByENodeb(eNodeb.eNodebId, eNodeb.planNum).then(function(dict) {
				if (dict) {
					downSwitchService.getStationById(dict.stationNum).then(function(stations) {
						stations.result[0].Town = result.townName;
						$scope.stationGroups = appFormatService.generateStationGroups(stations.result[0]);
					});
				}

			});
			if (result.factory === '华为') {
				cellHuaweiMongoService.queryLocalCellDef(result.eNodebId).then(function(cellDef) {
					alarmImportService.updateHuaweiAlarmInfos(cellDef).then(function() {});
				});
			}
		});

		//查询该基站下带的小区列表
		networkElementService.queryCellViewsInOneENodeb(eNodeb.eNodebId).then(function (result) {
			$scope.cellList = result;
		});

		//查询基站同频切换参数
		intraFreqHoService.queryENodebParameters(eNodeb.eNodebId).then(function (result) {
			$scope.intraFreqHo = result;
		});

		//查询基站异频切换参数
		interFreqHoService.queryENodebParameters(eNodeb.eNodebId).then(function (result) {
			$scope.interFreqHo = result;
		});

		$scope.ok = function() {
			$uibModalInstance.close($scope.eNodebGroups);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('town.eNodeb.dialog', function($scope, $uibModalInstance, dialogTitle, city, district, town,
		networkElementService) {
		$scope.dialogTitle = dialogTitle;
		networkElementService.queryENodebsInOneTown(city, district, town).then(function (eNodebs) {
			$scope.eNodebList = eNodebs;
		});
		networkElementService.queryBtssInOneTown(city, district, town).then(function (btss) {
			$scope.btsList = btss;
		});

		$scope.ok = function () {
			$uibModalInstance.close($scope.eNodeb);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('town.dt.dialog', function ($scope, $uibModalInstance, dialogTitle, item,
		kpiDisplayService, baiduMapService, parametersMapService, coverageService, collegeService) {
		$scope.dialogTitle = dialogTitle;
		
		$scope.includeAllFiles = false;
		$scope.network = {
			options: ['2G', '3G', '4G'],
			selected: '2G'
		};
		$scope.dataFile = {
			options: [],
			selected: ''
		};
		$scope.data = [];
		$scope.coverageOverlays = [];

		$scope.query = function () {
			$scope.kpi = kpiDisplayService.queryKpiOptions($scope.network.selected);
			collegeService.queryTownRaster($scope.network.selected, item.townName, $scope.beginDate.value, $scope.endDate.value).then(function (results) {
				baiduMapService.switchSubMap();
				baiduMapService.initializeMap("all-map", 14);
				baiduMapService.setCellFocus(item.longtitute, item.lattitute, 14);
				if (results.length) {
					$scope.dataFile.options = results;
					$scope.dataFile.selected = results[0];
				}
			});

		};

		$scope.$watch('network.selected', function () {
			$scope.query();
		});

		$scope.showDtPoints = function () {
			$scope.legend = kpiDisplayService.queryCoverageLegend($scope.kpi.selected);
			$scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
			kpiDisplayService.generateCoveragePoints($scope.coveragePoints, $scope.data, $scope.kpi.selected);
			angular.forEach($scope.coverageOverlays, function (overlay) {
				baiduMapService.removeOverlay(overlay);
			});
			parametersMapService.showIntervalPoints($scope.coveragePoints.intervals, $scope.coveragePoints);
		};

		var queryRasterInfo = function (index) {
			coverageService.queryByRasterInfo($scope.dataFile.options[index], $scope.network.selected).then(function (result) {
				$scope.data.push.apply($scope.data, result);
				if (index < $scope.dataFile.options.length - 1) {
					queryRasterInfo(index + 1);
				} else {
					$scope.showDtPoints();
				}
			});
		};

		$scope.showResults = function () {
			$scope.data = [];
			if ($scope.includeAllFiles) {
				queryRasterInfo(0);
			} else {
				coverageService.queryByRasterInfo($scope.dataFile.selected, $scope.network.selected).then(function (result) {
					$scope.data = result;
					$scope.showDtPoints();
				});
			}
		};

		$scope.ok = function () {
			$uibModalInstance.close($scope.eNodeb);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})

	.controller('map.bts.dialog', function ($scope, $uibModalInstance, bts, dialogTitle, networkElementService) {
		$scope.bts = bts;
		$scope.dialogTitle = dialogTitle;

		networkElementService.queryBtsInfo(bts.btsId).then(function (result) {
			$scope.btsDetails = result;
		});
		networkElementService.queryCdmaCellViews(bts.name).then(function (result) {
			$scope.cdmaCellList = result;
		});
		$scope.ok = function() {
			$uibModalInstance.close($scope.bts);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.cdma.cell.dialog', function($scope, $uibModalInstance, neighbor, dialogTitle,
		networkElementService) {
		$scope.cdmaCellDetails = neighbor;
		$scope.dialogTitle = dialogTitle;
		$scope.ok = function() {
			$uibModalInstance.close($scope.neighbor);
		};
		networkElementService.queryCdmaCellInfo(neighbor.btsId, neighbor.sectorId).then(function (result) {
			angular.extend($scope.cdmaCellDetails, result);
		});
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.distribution.dialog', function($scope, $uibModalInstance, distribution, dialogTitle, appFormatService,
		networkElementService) {
		$scope.distribution = distribution;
		$scope.dialogTitle = dialogTitle;
		$scope.distributionGroups = appFormatService.generateDistributionGroups(distribution);
		if (distribution.eNodebId > 0) {
			networkElementService.queryCellInfo(distribution.eNodebId, distribution.lteSectorId).then(function(cell) {
				$scope.lteGroups = appFormatService.generateCellGroups(cell);
			});
		}
		if (distribution.btsId > 0) {
			networkElementService.queryCdmaCellInfo(distribution.btsId, distribution.cdmaSectorId).then(function(cell) {
				$scope.cdmaGroups = appFormatService.generateCdmaCellGroups(cell);
			});
		}

		$scope.ok = function() {
			$uibModalInstance.close($scope.distributionGroups);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.neighbor.dialog', function($scope, $uibModalInstance, intraFreqHoService, interFreqHoService, networkElementService, neighborDialogService,
		neighbor, dialogTitle, beginDate, endDate) {
		$scope.neighbor = neighbor;
		$scope.eNodebId = neighbor.otherInfos.split(': ')[5];
		$scope.sectorId = neighbor.cellName.split('-')[1];
		$scope.dialogTitle = dialogTitle;
		$scope.beginDate = beginDate;
		$scope.endDate = endDate;
		$scope.parameter = {
			options: [
				'基本参数', '同频切换', 'A1异频切换',
				'A2异频切换', 'A3异频切换', 'A4异频切换', 'A5异频切换'
			],
			selected: '基本参数'
		};

		$scope.dump = function () {
			neighborDialogService.dumpMongo({
				eNodebId: $scope.eNodebId,
				sectorId: $scope.sectorId,
				pci: neighbor.pci,
				name: neighbor.cellName.split('-')[0]
			}, $scope.beginDate.value, $scope.endDate.value);
		};

		$scope.ok = function() {
			$uibModalInstance.close($scope.neighbor);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		interFreqHoService.queryCellParameters($scope.eNodebId, $scope.sectorId).then(function (result) {
			$scope.interFreqHo = result;
		});
	})

	.controller('hot.spot.info.dialog', function ($scope, $uibModalInstance, dialogTitle, hotSpotList) {
		$scope.dialogTitle = dialogTitle;
		$scope.hotSpotList = hotSpotList;

		$scope.ok = function () {
			$uibModalInstance.close($scope.neighbor);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

	})

	.controller('map.sectors.dialog', function ($scope, $uibModalInstance, sectors, dialogTitle, networkElementService) {
		$scope.sectors = sectors;
		$scope.dialogTitle = dialogTitle;
		if (sectors.length > 0) {
			networkElementService.queryCellInfo(sectors[0].eNodebId, sectors[0].sectorId).then(function (result) {
				$scope.currentCell = result;
			});
		}
		$scope.ok = function () {
			$uibModalInstance.close($scope.sectors);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

	})

	.controller('map.site.dialog', function($scope, $uibModalInstance, site, dialogTitle, appFormatService) {
		$scope.itemGroups = appFormatService.generateSiteGroups(site);
		$scope.dialogTitle = dialogTitle;
		$scope.ok = function () {
			$uibModalInstance.close($scope.site);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})

	.controller('map.station.dialog', function ($scope, $uibModalInstance, station, dialogTitle, beginDate, endDate,
		appFormatService, networkElementService) {
		$scope.beginDate = beginDate;
		$scope.endDate = endDate;
		$scope.itemGroups = appFormatService.generateStationGroups(station);
		$scope.cellList = [];
		networkElementService.queryENodebStationInfo(station.StationId).then(function (eNodeb) {
			if (eNodeb) {
				$scope.eNodebGroups = appFormatService.generateENodebGroups(eNodeb);
			}
			
		});
		networkElementService.queryCellStationInfo(station.StationId).then(function(cellList) {
			$scope.cellList = cellList;
		});
		$scope.dialogTitle = dialogTitle;
		$scope.ok = function () {
			$uibModalInstance.close($scope.site);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('map.stationList.dialog', function ($scope, $http, dialogTitle, $uibModalInstance, parametersDialogService,
		downSwitchService) {
		$scope.dialogTitle = dialogTitle;
		$scope.distincts = new Array('全市', 'FS顺德', 'FS南海', 'FS禅城', 'FS三水', 'FS高明');
		$scope.stationList = [];
		$scope.page = 1;
		$scope.stationName = '';
		$scope.totolPage = 1;
		$http({
			method: 'get',
			url: 'http://219.128.254.36:9000/LtePlatForm/lte/index.php/Station/search/curr_page/0/page_size/10',
		}).then(function successCallback(response) {
			$scope.stationList = response.data.result.rows;
			$scope.totolPage = response.data.result.total_pages;
			$scope.page = response.data.result.curr_page;
		}, function errorCallback(response) {
			// 请求失败执行代码
		});
		$scope.details = function (stationId) {
			downSwitchService.getStationById(stationId).then(function(result) {
				parametersDialogService.showStationInfo(result.result[0]);
			});
		}

		$scope.delete = function (stationId) {
			if (confirm("你确定删除该站点？")) {
				$http({
					method: 'post',
					url: 'http://219.128.254.36:9000/LtePlatForm/lte/index.php/Station/delete',
					data: {
						"idList": stationId
					},
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					transformRequest: function (obj) {
						var str = [];
						for (var p in obj) {
							str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						}
						return str.join("&");
					}
				}).then(function successCallback(response) {
					alert(response.data.description);
					$scope.jumpPage($scope.page);
				}, function errorCallback(response) {
					// 请求失败执行代码
				});
			} else {

			}
		}
		$scope.edit = function (stationId) {
			parametersDialogService.showStationEdit(stationId);
		}
		$scope.addStation = function () {
			parametersDialogService.showStationAdd();
		}
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		}
		$scope.search = function () {
			$scope.page = 1;
			$scope.jumpPage($scope.page);
		}
		$scope.firstPage = function () {
			$scope.page = 1;
			$scope.jumpPage($scope.page);
		}
		$scope.lastPage = function () {
			$scope.page = $scope.totolPage;
			$scope.jumpPage($scope.page);
		}
		$scope.prevPage = function () {
			if ($scope.page != 1)
				$scope.page--;
			$scope.jumpPage($scope.page);
		}
		$scope.nextPage = function () {
			if ($scope.page != $scope.totolPage)
				$scope.page++;
			$scope.jumpPage($scope.page);
		}
		$scope.jumpPage = function (page) {
			if (page >= $scope.totolPage)
				page = $scope.totolPage;
			$http({
				method: 'post',
				url: 'http://219.128.254.36:9000/LtePlatForm/lte/index.php/Station/search',
				data: {
					"curr_page": page,
					"page_size": 10,
					"stationName": $scope.stationName,
					"areaName": $scope.selectDistinct
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				transformRequest: function (obj) {
					var str = [];
					for (var p in obj) {
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
					return str.join("&");
				}
			}).then(function successCallback(response) {
				$scope.stationList = response.data.result.rows;
				$scope.totolPage = response.data.result.total_pages;
				$scope.page = response.data.result.curr_page;
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		}
	})
	.controller('map.stationEdit.dialog', function ($scope, $http, stationId, dialogTitle, $uibModalInstance) {
		$scope.dialogTitle = dialogTitle;
		$scope.station;
		$http({
			method: 'post',
			url: 'http://219.128.254.36:9000/LtePlatForm/lte/index.php/Station/single',
			data: {
				"id": stationId
			},
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: function (obj) {
				var str = [];
				for (var p in obj) {
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				}
				return str.join("&");
			}
		}).then(function successCallback(response) {
			$scope.station = response.data.result[0];
		}, function errorCallback(response) {
			// 请求失败执行代码
		});
		$scope.ok = function () {
			$http({
				method: 'post',
				url: 'http://219.128.254.36:9000/LtePlatForm/lte/index.php/Station/update',
				data: {
					"Station": JSON.stringify($scope.station)
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				transformRequest: function (obj) {
					var str = [];
					for (var p in obj) {
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
					return str.join("&");
				}
			}).then(function successCallback(response) {
				alert(response.data.description);
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		}
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		}
	})
	.controller('map.stationAdd.dialog', function ($scope, $http, dialogTitle, $uibModalInstance) {
		$scope.dialogTitle = dialogTitle;
		$scope.station;
		$scope.ok = function () {
			$http({
				method: 'post',
				url: 'http://219.128.254.36:9000/LtePlatForm/lte/index.php/Station/add',
				data: {
					"Station": JSON.stringify($scope.station)
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				transformRequest: function (obj) {
					var str = [];
					for (var p in obj) {
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
					return str.join("&");
				}
			}).then(function successCallback(response) {
				alert(response.data.description);
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		}
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		}
	})

	.controller('college.cell.dialog', function($scope, $uibModalInstance, intraFreqHoService, interFreqHoService,
		cell, dialogTitle) {
		$scope.cell = cell;
		$scope.dialogTitle = dialogTitle;
		$scope.parameter = {
			options: [
				'基本参数', '同频切换', 'A1异频切换',
				'A2异频切换', 'A3异频切换', 'A4异频切换', 'A5异频切换'
			],
			selected: '基本参数'
		};
		$scope.eNodebId = cell.eNodebId;
		$scope.sectorId = cell.sectorId;

		$scope.ok = function() {
			$uibModalInstance.close($scope.cell);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		interFreqHoService.queryCellParameters(cell.eNodebId, cell.sectorId).then(function(result) {
			$scope.interFreqHo = result;
		});
	})
	.controller("maintain.college.dialog", function ($scope, $uibModalInstance, dialogTitle, year,
		collegeService, collegeQueryService, collegeDialogService, appFormatService) {
		$scope.dialogTitle = dialogTitle;
		$scope.collegeYearList = [];
		$scope.collegeInfo = {
			names: []
		};
		collegeService.queryNames().then(function (result) {
			$scope.collegeInfo.names = result;
			$scope.collegeName = $scope.collegeInfo.names[0];
		});

		$scope.updateInfos = function() {
			collegeService.queryStats(year).then(function(colleges) {
				$scope.collegeList = colleges;
			});
			collegeQueryService.queryYearList(year).then(function(colleges) {
				$scope.collegeYearList = colleges;
			});
			$scope.updateCollegeStatus($scope.collegeName);
		};
		$scope.updateCollegeStatus = function(name) {
			collegeQueryService.queryByNameAndYear(name, year).then(function(info) {
				$scope.collegeExisted = !!info;
			});
		};
		$scope.$watch('collegeName', function (name) {
			$scope.updateCollegeStatus(name);
		});
		$scope.addOneCollegeMarkerInfo = function () {
			collegeQueryService.queryByNameAndYear($scope.collegeName, year - 1).then(function (item) {
				if (!item) {
					var begin = new Date();
					begin.setDate(begin.getDate() - 365 - 7);
					var end = new Date();
					end.setDate(end.getDate() - 365);
					collegeQueryService.queryByName($scope.collegeName).then(function (college) {
						item = {
							oldOpenDate: appFormatService.getDateString(begin, 'yyyy-MM-dd'),
							newOpenDate: appFormatService.getDateString(end, 'yyyy-MM-dd'),
							collegeId: college.id
						};
						collegeDialogService.addYearInfo(item, $scope.collegeName, year, function () {
							$scope.updateInfos();
						});
					});
				} else {
					collegeDialogService.addYearInfo(item, $scope.collegeName, year, function () {
						$scope.updateInfos();
					});
				}
			});
		};
		$scope.createNewCollege = function () {
			collegeDialogService.addNewCollege(function() {
				$scope.updateInfos();
			});
		};

		$scope.updateInfos();

		$scope.ok = function () {
			$uibModalInstance.close($scope.cell);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

	})
	.controller("college.flow", function ($scope, $uibModalInstance, dialogTitle, year, collegeQueryService, parametersChartService) {
		$scope.dialogTitle = dialogTitle;
		$scope.collegeStatCount = 0;
		$scope.query = function () {
			angular.forEach($scope.collegeList, function (college) {
				collegeQueryService.queryCollegeFlow(college.name, $scope.beginDate.value, $scope.endDate.value).then(function (stat) {
					college.pdcpDownlinkFlow = stat.pdcpDownlinkFlow;
					college.pdcpUplinkFlow = stat.pdcpUplinkFlow;
					college.averageUsers = stat.averageUsers;
					college.cellCount = stat.cellCount;
					college.maxActiveUsers = stat.maxActiveUsers;
					$scope.collegeStatCount += 1;
				});
			});
		};
		$scope.$watch('collegeStatCount', function (count) {
			if ($scope.collegeList && count === $scope.collegeList.length && count > 0) {
				$("#downloadFlowConfig").highcharts(parametersChartService.getCollegeDistributionForDownlinkFlow($scope.collegeList));
				$("#uploadFlowConfig").highcharts(parametersChartService.getCollegeDistributionForUplinkFlow($scope.collegeList));
				$("#averageUsersConfig").highcharts(parametersChartService.getCollegeDistributionForAverageUsers($scope.collegeList));
				$("#activeUsersConfig").highcharts(parametersChartService.getCollegeDistributionForActiveUsers($scope.collegeList));
				$scope.collegeStatCount = 0;
			}
		});
		collegeQueryService.queryYearList(year).then(function (colleges) {
			$scope.collegeList = colleges;
			$scope.query();
		});

		$scope.ok = function () {
		    $uibModalInstance.close($scope.cell);
		};

		$scope.cancel = function () {
		    $uibModalInstance.dismiss('cancel');
		};

	})

	.factory('collegeMapService', function (baiduMapService, collegeService, collegeQueryService, collegeDtService) {
		return {
			showCollegeInfos: function (showCollegeDialogs, year) {
				collegeService.queryStats(year).then(function (colleges) {
					angular.forEach(colleges, function (college) {
						var center;
						collegeService.queryRegion(college.id).then(function (region) {
							switch (region.regionType) {
								case 2:
									center = baiduMapService.drawPolygonAndGetCenter(region.info.split(';'));
									break;
								case 1:
									center = baiduMapService.drawRectangleAndGetCenter(region.info.split(';'));
									break;
								default:
									center = baiduMapService.drawCircleAndGetCenter(region.info.split(';'));
									break;
							}
							var marker = baiduMapService.generateMarker(center.X, center.Y);
							baiduMapService.addOneMarkerToScope(marker, showCollegeDialogs, college);
							baiduMapService.drawLabel(college.name, center.X, center.Y);
						});
					});
				});
			},
			drawCollegeArea: function (collegeId, callback) {
				collegeService.queryRegion(collegeId).then(function (region) {
					var center;
					switch (region.regionType) {
						case 2:
							center = baiduMapService.drawPolygonAndGetCenter(region.info.split(';'));
							break;
						case 1:
							center = baiduMapService.drawRectangleAndGetCenter(region.info.split(';'));
							break;
						default:
							center = baiduMapService.drawCircleAndGetCenter(region.info.split(';'));
							break;
					}
					baiduMapService.setCellFocus(center.X, center.Y);
					callback(center);
				});
			},
			showDtInfos: function (infos, begin, end) {
				collegeQueryService.queryAll().then(function (colleges) {
					angular.forEach(colleges, function (college) {
						var center;
						collegeService.queryRegion(college.id).then(function (region) {
							switch (region.regionType) {
								case 2:
									center = baiduMapService.getPolygonCenter(region.info.split(';'));
									break;
								case 1:
									center = baiduMapService.getRectangleCenter(region.info.split(';'));
									break;
								default:
									center = baiduMapService.getCircleCenter(region.info.split(';'));
									break;
							}
							var info = {
								name: college.name,
								centerX: center.X,
								centerY: center.Y,
								area: region.area,
								file2Gs: 0,
								file3Gs: 0,
								file4Gs: 0
							};
							infos.push(info);
							collegeDtService.updateFileInfo(info, begin, end);
						});
					});
				});
			},
			queryCenterAndCallback: function (collegeName, callback) {
				collegeQueryService.queryByName(collegeName).then(function (college) {
					collegeService.queryRegion(college.id).then(function (region) {
						var center;
						switch (region.regionType) {
							case 2:
								center = baiduMapService.getPolygonCenter(region.info.split(';'));
								break;
							case 1:
								center = baiduMapService.getRectangleCenter(region.info.split(';'));
								break;
							default:
								center = baiduMapService.getCircleCenter(region.info.split(';'));
								break;
						}
						callback(center);
					});
				});
			}
		};
	});