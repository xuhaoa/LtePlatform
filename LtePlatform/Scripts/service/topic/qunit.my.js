angular.module('qunit.my', ['myApp.region'])
    .value("config", {
        stats: { all: 0, bad: 0 },
        moduleStats: { all: 0, bad: 0 },
        started: 0,
        updateRate: 1000,
        blocking: false,
        autostart: true,
        autorun: false,
        filter: "",
        queue: [],
        urlConfig: []
    })
    .value("hasOwn", Object.prototype.hasOwnProperty)
    .factory('qunitBasicService', function(config, hasOwn, appFormatService) {
        return {
            getUrlConfigHtml: function () {
                var j,
                    escaped,
                    escapedTooltip,
                    selection = false,
                    urlConfigHtml = "";

                angular.forEach(config.urlConfig, function (val) {
                    if (typeof val === "string") {
                        val = {
                            id: val,
                            label: val
                        };
                    }

                    escaped = appFormatService.queryEscapeText(val.id);
                    escapedTooltip = appFormatService.queryEscapeText(val.tooltip);

                    if (config[val.id] === undefined) {
                        config[val.id] = appFormatService.getUrlParams[val.id];
                    }

                    if (!val.value || typeof val.value === "string") {
                        urlConfigHtml += "<input id='qunit-urlconfig-" + escaped +
                            "' name='" + escaped + "' type='checkbox'" +
                            (val.value ? " value='" + appFormatService.queryEscapeText(val.value) + "'" : "") +
                            (config[val.id] ? " checked='checked'" : "") +
                            " title='" + escapedTooltip + "' /><label for='qunit-urlconfig-" + escaped +
                            "' title='" + escapedTooltip + "'>" + val.label + "</label>";
                    } else {
                        urlConfigHtml += "<label for='qunit-urlconfig-" + escaped +
                            "' title='" + escapedTooltip + "'>" + val.label +
                            ": </label><select id='qunit-urlconfig-" + escaped +
                            "' name='" + escaped + "' title='" + escapedTooltip + "'><option></option>";

                        if (angular.isArray(val.value)) {
                            for (j = 0; j < val.value.length; j++) {
                                escaped = appFormatService.queryEscapeText(val.value[j]);
                                urlConfigHtml += "<option value='" + escaped + "'" +
                                    (config[val.id] === val.value[j] ?
                                    (selection = true) && " selected='selected'" : "") +
                                    ">" + escaped + "</option>";
                            }
                        } else {
                            for (j in val.value) {
                                if (val.value.hasOwnProperty(j)) {
                                    if (hasOwn.call(val.value, j)) {
                                        urlConfigHtml += "<option value='" + appFormatService.queryEscapeText(j) + "'" +
                                            (config[val.id] === j ?
                                            (selection = true) && " selected='selected'" : "") +
                                            ">" + appFormatService.queryEscapeText(val.value[j]) + "</option>";
                                    }
                                }
                            }
                        }
                        if (config[val.id] && !selection) {
                            escaped = appFormatService.queryEscapeText(config[val.id]);
                            urlConfigHtml += "<option value='" + escaped +
                                "' selected='selected' disabled='disabled'>" + escaped + "</option>";
                        }
                        urlConfigHtml += "</select>";
                    }
                });
                return urlConfigHtml;
            }
        }
    });