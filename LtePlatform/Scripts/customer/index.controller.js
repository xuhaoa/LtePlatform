﻿app.controller("customer.index", function ($scope, appUrlService) {
    var rootUrl = "/Customer#";
    $scope.menuItems = [
        {
            displayName: "日常支撑",
            isActive: true,
            subItems: [
            {
                displayName: "精确覆盖专题",
                url: "/Rutrace",
                tooltip: "综合分析后台指标、MR、路测信令和小区跟踪数据，挖掘小区的重叠覆盖、过覆盖等问题，对精确覆盖的效果进行模拟，并在百度地图上呈现。"
            }, {
                displayName: "专题覆盖优化",
                url: "/Evaluation/RegionDef",
                tooltip: "包括万栋楼宇等室内外场景优化；根据各小区的工程参数模拟覆盖范围，主要覆盖指标（RSRP、SINR）进行分析和呈现"
            }, {
                displayName: "规划辅助",
                url: appUrlService.getPlanUrlHost() + 'guihuafuzhu/index.php'
            }]
        }, {
            displayName: "专项支撑",
            isActive: false,
            subItems: [{
                displayName: "应急需求",
                url: rootUrl + "/emergency",
                tooltip: "应急需求（围绕应急通信车）的申请和查询"
            }, {
                displayName: "小区流量分析",
                url: "/Kpi/Flow"
            }, {
                displayName: "校园网专题优化",
                url: "/College/Map",
                tooltip: "校园网专项优化，包括数据管理、指标分析、支撑工作管理和校园网覆盖呈现"
            }]
        }, {
            displayName: "统计分析",
            isActive: false,
            subItems: [{
                displayName: "传统指标",
                url: "/Kpi",
                tooltip: "对传统指标（主要是2G和3G）的监控、分析和地理化呈现"
            }, {
                displayName: "工单管控",
                url: "/Kpi/WorkItem",
                tooltip: "对接本部优化部4G网优平台，结合日常优化，实现对日常工单的监控和分析"
            }]
        }, {
            displayName: "基础信息",
            isActive: false,
            subItems: [{
                displayName: "DT基础信息",
                url: "/Dt/List",
                tooltip: "按照区域或专题查看已导入的DT基础信息"
            }, {
                displayName: "基础信息管理",
                url: appUrlService.getParameterUrlHost() + 'index.php'
            }]
        }
    ];
});
