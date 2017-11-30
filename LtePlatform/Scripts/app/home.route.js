﻿angular.module('home.route', ['app.common'])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        var viewDir = "/appViews/Home/";
        $stateProvider
            .state('list',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Network.html",
                        controller: "home.network"
                    }
                },
                url: "/"
            })
            .state('query',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Query.html",
                        controller: "home.query"
                    }
                },
                url: "/query"
            })
            .state('building',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Query.html",
                        controller: "evaluation.home"
                    }
                },
                url: "/building"
            })
            .state('topic',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.kpi"
                    },
                    "contents": {
                        templateUrl: "/appViews/Parameters/Topic.html",
                        controller: "query.topic"
                    }
                },
                url: "/topic"
            })
            .state('operation-station',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/Home/StationSearchMenu.html",
                        controller: "menu.operation-station"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Station.html",
                        controller: "operation-station.network"
                    },
                    "filter": {
                        templateUrl: "/appViews/Home/StationFilter.html",
                        controller: "operation-station.filter"
                    }

                },
                url: "/operation-station"
            })
            .state('operation-indoor',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/Home/StationSearchMenu.html",
                        controller: "menu.operation-indoor"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Station.html",
                        controller: "operation-indoor.network"
                    },
                    "filter": {
                        templateUrl: "/appViews/Home/IndoorFilter.html",
                        controller: "operation-indoor.filter"
                    }

                },
                url: "/operation-indoor"
            })
            .state('common-station', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/Home/StationSearchMenu.html",
                        controller: "menu.common-station"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Common.html",
                        controller: "common-station.network"
                    }
                },
                url: "/common-station"
            })
            .state('common-indoor', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/Home/StationSearchMenu.html",
                        controller: "menu.common-indoor"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Common.html",
                        controller: "common-indoor.network"
                    }
                },
                url: "/common-indoor"
            })
            .state('flow',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Flow.html",
                        controller: "home.flow"
                    }
                },
                url: "/flow"
            })
            .state('dt',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.dt"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Dt.html",
                        controller: "home.dt"
                    }
                },
                url: "/dt"
            })
            .state('kpi',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.kpi"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Kpi.html",
                        controller: "home.kpi"
                    }
                },
                url: "/kpi"
            })
            .state('plan',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.plan"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Menu/Plan.html",
                        controller: "home.plan"
                    }
                },
                url: "/plan"
            })
            .state('cdma',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.cdma"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Menu/Cdma.html",
                        controller: "home.cdma"
                    }
                },
                url: "/cdma"
            })
            .state('interference',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.cdma"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Menu/Plan.html",
                        controller: "home.interference"
                    }
                },
                url: "/interference"
            })
            .state('complain',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.complain"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Complain.html",
                        controller: "home.complain"
                    }
                },
                url: "/complain"
            })
            .state('micro',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.complain"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Micro.html",
                        controller: "complain.micro"
                    }
                },
                url: "/micro"
            })
            .state('college',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.college"
                    },
                    "contents": {
                        templateUrl: "/appViews/College/Root.html",
                        controller: "home.college"
                    }
                },
                url: "/college"
            })
            .state('college-coverage',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.college"
                    },
                    "contents": {
                        templateUrl: "/appViews/College/Coverage/Index.html",
                        controller: "college.coverage"
                    }
                },
                url: "/college-coverage"
            })
            .state('mr',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.mr"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Mr.html",
                        controller: "home.mr"
                    }
                },
                url: "/mr"
            })
            .state('grid',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.mr"
                    },
                    "contents": {
                        templateUrl: viewDir + "MrGrid.html",
                        controller: "mr.grid"
                    }
                },
                url: "/grid"
            })
            .state('app',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.mr"
                    },
                    "contents": {
                        templateUrl: "/appViews/BasicKpi/GridApp.html",
                        controller: "mr.app"
                    }
                },
                url: "/app"
            })
            .state('analysis',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: viewDir + "Analysis.html",
                        controller: "network.analysis"
                    }
                },
                url: "/analysis"
            })
            .state('collegeMap',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.analysis"
                    },
                    "contents": {
                        templateUrl: '/appViews/College/CollegeMenu.html',
                        controller: "college.map"
                    }
                },
                url: "/collegeMap"
            })
            .state('highway',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.analysis"
                    },
                    "contents": {
                        templateUrl: '/appViews/Evaluation/Highway.html',
                        controller: "analysis.highway"
                    }
                },
                url: "/highway"
            })
            .state('railway',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.analysis"
                    },
                    "contents": {
                        templateUrl: '/appViews/Evaluation/Highway.html',
                        controller: "analysis.railway"
                    }
                },
                url: "/railway"
            })
            .state('subway',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.analysis"
                    },
                    "contents": {
                        templateUrl: '/appViews/Evaluation/Subway.html',
                        controller: "analysis.subway"
                    }
                },
                url: "/subway"
            })
            .state('highvalue',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.analysis"
                    },
                    "contents": {
                        templateUrl: '/appViews/Evaluation/HighValue.html',
                        controller: "analysis.highvalue"
                    }
                },
                url: "/highvalue"
            })
            .state('alarm-station',
            {
                views: {
                    'menu': {
                        templateUrl: viewDir + "StationSearchMenu.html",
                        controller: "menu.alarm-station"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/Alarm.html",
                        controller: "alarm-station.network"
                    }

                },
                url: "/alarm-station"
            })
            .state('alarm-indoor',
            {
                views: {
                    'menu': {
                        templateUrl: viewDir + "StationSearchMenu.html",
                        controller: "menu.alarm-indoor"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/Alarm.html",
                        controller: "alarm-indoor.network"
                    }

                },
                url: "/alarm-indoor"
            })
            .state('checking-station',
            {
                views: {
                    'menu': {
                        templateUrl: viewDir + "StationSearchMenu.html",
                        controller: "menu.checking-station"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/Checking.html",
                        controller: "checking-station.network"
                    }
                },
                url: "/checking-station"
            })
            .state('checking-indoor',
            {
                views: {
                    'menu': {
                        templateUrl: viewDir + "StationSearchMenu.html",
                        controller: "menu.checking"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/Checking.html",
                        controller: "checking-indoor.network"
                    }
                },
                url: "/checking-indoor"
            })
            .state('fixing-station',
            {
                views: {
                    'menu': {
                        templateUrl: viewDir + "StationSearchMenu.html",
                        controller: "menu.fixing-station"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/Fixing.html",
                        controller: "fixing-station.network"
                    }
                },
                url: "/fixing-station"
            })
            .state('fixing-indoor',
            {
                views: {
                    'menu': {
                        templateUrl: viewDir + "StationSearchMenu.html",
                        controller: "menu.fixing-indoor"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/Fixing.html",
                        controller: "fixing-indoor.network"
                    }
                },
                url: "/fixing-indoor"
            })
            .state('resource-station', {
                views: {
                    'menu': {
                        templateUrl: viewDir + "StationSearchMenu.html",
                        controller: "menu.resource-station"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/Resource.html",
                        controller: "resource-station.network"
                    }

                },
                url: "/resource-station"
            })
            .state('resource-indoor', {
                views: {
                    'menu': {
                        templateUrl: viewDir + "StationSearchMenu.html",
                        controller: "menu.resource-indoor"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/Resource.html",
                        controller: "resource-indoor.network"
                    }

                },
                url: "/resource-indoor"
            })
            .state('special-station',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.fixing"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/SpecialStation.html",
                        controller: "special-station.network"
                    }

                },
                url: "/special-station"
            })
            .state('long-term',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.fixing"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/FaultStation.html",
                        controller: "fault-station.network"
                    }
                },
                url: "/long-term"
            })
            .state('special-indoor',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.fixing"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/SpecialStation.html",
                        controller: "special-indoor.network"
                    }

                },
                url: "/special-indoor"
            })
            .state('clear-flow',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.fixing"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/ClearZero.html",
                        controller: "clear-flow.network"
                    }
                },
                url: "/clear-flow"
            })
            .state('clear-voice',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.fixing"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/ClearZero.html",
                        controller: "clear-voice.network"
                    }
                },
                url: "/clear-voice"
            })
            .state('assessment',
            {
                views: {                
                    'menu': {
                        templateUrl: "/appViews/Home/Assessment.html",
                        controller: "menu.assessment"
                    }
                },
                url: "/assessment"
            })
            .state('construction',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.construction"
                    },
                    "contents": {
                        templateUrl: "/appViews/Parameters/Region/BtsConstruction.html",
                        controller: "bts.construction"
                    }
                },
                url: "/construction"
            })
            .state('blueprint',
            {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.construction"
                    },
                    "contents": {
                        templateUrl: "/appViews/Parameters/Region/BluePrint.html",
                        controller: "bts.blueprint"
                    }
                },
                url: "/blueprint"
            });
        $urlRouterProvider.otherwise('/');
    })