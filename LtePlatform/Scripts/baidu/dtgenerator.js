
DtGenerator.prototype.generateLegends= function(criteria, sign) {
    $("#colorBar .map-w-i").remove();
    for (var i = 0; i < criteria.length; i++) {
        $("#colorBar").append("<li class='map-w-i' style='background-color:#"
            + criteria[i].color + "; border:1px solid #" + criteria[i].color + ";'>"
            + (sign !== false ? "&lt;" : "&gt;") + criteria[i].threshold + "</li>");
    }
    $("#colorBar").append("<li class='map-w-i' style='background-color:#"
        + "077f07" + "; border:1px solid #" + "077f07" + ";'>"
        + (sign !== false ? "&gt;=" : "&lt;=") + criteria[criteria.length - 1].threshold + "</li>");
}

DtGenerator.prototype.generateRsrpPoints = function (coverageData, criteria) {
    var radius = getDtPointRadius(map.getZoom());
    for (var i = 0; i < coverageData.length; i++) {
        var color = "077f07";
        var data = coverageData[i];
        for (var j = 0; j < criteria.length; j++) {
            if (data.rsrp < criteria[j].threshold) {
                color = criteria[j].color;
                break;
            }
        }
        addOneDtPoint(data.baiduLongtitute, data.baiduLattitute, color, radius);
    }
};

DtGenerator.prototype.generateRx0Points = function (coverageData, criteria) {
    var radius = getDtPointRadius(map.getZoom());
    for (var i = 0; i < coverageData.length; i++) {
        var color = "077f07";
        var data = coverageData[i];
        for (var j = 0; j < criteria.length; j++) {
            if (data.rxAgc0 < criteria[j].threshold) {
                color = criteria[j].color;
                break;
            }
        }
        addOneDtPoint(data.baiduLongtitute, data.baiduLattitute, color, radius);
    }
};

DtGenerator.prototype.generateRx1Points = function (coverageData, criteria) {
    var radius = getDtPointRadius(map.getZoom());
    for (var i = 0; i < coverageData.length; i++) {
        var color = "077f07";
        var data = coverageData[i];
        for (var j = 0; j < criteria.length; j++) {
            if (data.rxAgc1 < criteria[j].threshold) {
                color = criteria[j].color;
                break;
            }
        }
        addOneDtPoint(data.baiduLongtitute, data.baiduLattitute, color, radius);
    }
};

DtGenerator.prototype.generateSinrPoints = function(coverageData, criteria) {
    var radius = getDtPointRadius(map.getZoom());
    for (var i = 0; i < coverageData.length; i++) {
        var color = "077f07";
        var data = coverageData[i];
        for (var j = 0; j < criteria.length; j++) {
            if (data.sinr < criteria[j].threshold) {
                color = criteria[j].color;
                break;
            }
        }
        addOneDtPoint(data.baiduLongtitute, data.baiduLattitute, color, radius);
    }
};

DtGenerator.prototype.generateEcioPoints = function (coverageData, criteria) {
    var radius = getDtPointRadius(map.getZoom());
    for (var i = 0; i < coverageData.length; i++) {
        var color = "077f07";
        var data = coverageData[i];
        for (var j = 0; j < criteria.length; j++) {
            if (data.ecio < criteria[j].threshold) {
                color = criteria[j].color;
                break;
            }
        }
        addOneDtPoint(data.baiduLongtitute, data.baiduLattitute, color, radius);
    }
};

DtGenerator.prototype.generateRxPoints = function (coverageData, criteria) {
    var radius = getDtPointRadius(map.getZoom());
    for (var i = 0; i < coverageData.length; i++) {
        var color = "077f07";
        var data = coverageData[i];
        for (var j = 0; j < criteria.length; j++) {
            if (data.rxAgc < criteria[j].threshold) {
                color = criteria[j].color;
                break;
            }
        }
        addOneDtPoint(data.baiduLongtitute, data.baiduLattitute, color, radius);
    }
};

DtGenerator.prototype.generateTxPoints = function (coverageData, criteria) {
    var radius = getDtPointRadius(map.getZoom());
    for (var i = 0; i < coverageData.length; i++) {
        var color = "077f07";
        var data = coverageData[i];
        for (var j = 0; j < criteria.length; j++) {
            if (data.txPower > criteria[j].threshold) {
                color = criteria[j].color;
                break;
            }
        }
        addOneDtPoint(data.baiduLongtitute, data.baiduLattitute, color, radius);
    }
};