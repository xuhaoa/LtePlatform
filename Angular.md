# Angular前端架构
    目前采用angular1.x结构，包括服务、指令、控制器、过滤器等模块。另外，在生产系统以外，我们还提供了基于Jasmine架构的模块测试系统。
## 工厂服务
    采用angular结构的注入依赖工厂服务，服务共分为三层：基础路由层、数据服务层和数据应用层。各层用grunt工具将多个模块合并起来。
### grunt工具设置
```javascript
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            "foo": {
                "files": {
                    'app/url.js': [
                        'url/core.js', 'url/menu.js', 'url/format.js', 'url/geometry.js', 'url/calculation.js',
                        'url/app.url.js'
                    ],
                    'app/region.js': [
                        'region/basic.js', 'region/mongo.js', 'region/kpi.js', 'region/import.js',
                        'region/authorize.js', 'region/college.js',
                        'region/network.js', 'region/app.region.js'
                    ],
                    'app/kpi.js': [
                        'kpi/core.js', 'kpi/college.js', 'kpi/coverage.js', 'kpi/customer.js', 'kpi/parameter.js',
                        'kpi/work.js', 'kpi/app.kpi.js'
                    ],
                    'app/topic.js': [
                        'topic/basic.js', 'topic/parameters.js', 'topic/college.js', 'topic/dialog.js',
                        'topic/baidu.map.js'
                    ],
                    'app/filters.js': [
                        'filters/basic.js', 'filters/cell.js', 'filters/handoff.js', 'filters/combined.js'
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat']);
```
### 基础路由层
主要包括url目录下的各个脚本文件。
合并脚本app.url.js内容如下：
```javascript
angular.module('myApp.url', ['app.core', 'app.menu', 'app.format', 'app.geometry', 'app.calculation']);
```
基础路由层的说明详见[这里](https://github.com/ouyh18/LtePlatform/blob/master/AngularUrlFactory.md)
### 数据服务层
主要包含region目录下的各个脚本文件。
合并脚本app.region.js内容如下；
```javascript
angular.module('myApp.region',
[
    'region.basic', 'region.mongo', 'region.kpi', 'region.import', 'region.authorize', 'region.college',
    'region.network'
]);
```
### 数据应用层
主要包括kpi和topic两个目录下的各个脚本文件。
app.kpi.js合并文件内容如下：
```javascript
angular.module('myApp.kpi', ['kpi.core', 'kpi.college', "kpi.coverage", 'kpi.customer', 'kpi.parameter', 'kpi.work']);
```
baidu.map.js合并文件内容如下：
```javascript
angular.module('baidu.map', ['topic.basic', 'topic.college', "topic.parameters", 'topic.dialog']);
```
## 指令系统
指令是Html代码段及其绑定的响应逻辑的封装。
按目录可以分为基础应用、校园网、客户服务、基础数据、指标优化、工单系统6个模块。
按类别可以分为基础指令、格式化指令和Html绑定指令。
### 基础指令
### 格式化指令
### Html绑定指令
## 控制器模块
本解决方案的业务描述部分，提供对前端各模块访问的入口。
主模块是一个单页Web应用，前端模块的多数代码和主要功能都在这个应用内。
### 总体结构
总体结构嵌在_Layout.cshtml内，代码如下：
```html
<body ng-app="myApp">
    <div class="navbar navbar-blue-azure navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <img width="60" src="~/Content/Images/Logo_new_version.png" ng-click="sideBarShown=!sideBarShown" />
            </div>
            <div class="navbar-collapse collapse">
                <div ng-include="'/appViews/HeaderMenu.html'" ng-controller="header.menu"></div>
                @Html.Partial("_LoginPartial")
            </div>
        </div>
    </div>
    <div class="container content">
        @RenderBody()
        <hr />
        <footer>
            <p>
                &copy; 2004 &nbsp;-&nbsp; @DateTime.Now.Year - 中国电信佛山分公司欧阳晖
                <em>运营智慧化</em>
            </p>
        </footer>
    </div>

<script src="~/Scripts/jquery-3.1.0.min.js"></script>
<script src="~/Scripts/bootstrap.min.js"></script>
<script src="~/Scripts/respond.min.js"></script>
<script src="~/Scripts/fileinput.min.js"></script>
<link href="~/Content/ui-bootstrap-csp.css" rel="stylesheet"/>
    <script src="~/Scripts/locales/zh.js"></script>
<link href="~/Content/ui-grid.min.css" rel="stylesheet"/>
    <script src="~/Scripts/angular.min.js"></script>
    <script src="~/Scripts/angular-route.min.js"></script>
<script src="~/Scripts/angular-ui-router.min.js"></script>
<script src="~/Scripts/angular-animate.min.js"></script>
<script src="~/Scripts/angular-touch.min.js"></script>
<script src="~/Scripts/angular-busy.min.js"></script>
<script src="~/Scripts/underscore.min.js"></script>
<script src="~/Scripts/angular-ui/csv.js"></script>
<script src="~/Scripts/angular-ui/pdfmake.js"></script>
<script src="~/Scripts/angular-ui/vfs_fonts.js"></script>
<script src="~/Scripts/angular-ui/ui-bootstrap-tpls.min.js"></script>
<script src="~/Scripts/ui-grid.min.js"></script>

<script src="https://img.hcharts.cn/highcharts/highcharts.js"></script>
<script src="https://img.hcharts.cn/highcharts/highcharts-3d.js"></script>
<script src="https://img.hcharts.cn/highcharts/highcharts-more.js"></script>
<script src="https://img.hcharts.cn/highcharts/modules/exporting.js"></script>
<script src="https://img.hcharts.cn/highcharts/modules/drilldown.js"></script>
<script src="https://img.hcharts.cn/highcharts/modules/data.js"></script>
    <script src="https://cdn.bootcss.com/highcharts-ng/1.1.0/highcharts-ng.js"></script>
    <script src="~/Scripts/mycharts/comboChart.js"></script>
    <script src="~/Scripts/mycharts/drilldown.chart.js"></script>
<script src="~/Scripts/service/app/url.js"></script>
    <script src="~/Scripts/service/app/region.js"></script>
    <script src="~/Scripts/service/app/kpi.js"></script>
<script src="~/Scripts/service/app/topic.js"></script>
<script src="~/Scripts/service/app/filters.js"></script>
<script src="~/directives/app/app.module.js"></script>
<script src="~/directives/rutrace/rutrace.module.js"></script>
<script src="~/directives/parameters/parameters.module.js"></script>
<script src="~/directives/workitem/workitem.module.js"></script>
<script src="~/directives/customer/customer.module.js"></script>
<script src="~/directives/college/college.module.js"></script>
<script src="~/Scripts/app/common.js"></script>
<script src="~/Scripts/laydate/laydate.js"></script>
    @RenderSection("Scripts", required: false)
</body>
```
#### 主应用的定义
这个定义就在以上代码内，简化结构为：
```html
<body ng-app="myApp">
...
</body>
```
应用的名称是myApp。
#### 模块的装载
主应用模块实际上是12个子模块组合而成，代码如下：
```javascript
angular.module("myApp",
[
    'home.root', 'home.route', 'home.station', 'station.checking', 'station.fixing',
    'home.menu', 'home.complain', 'home.network', 'home.mr', 'home.kpi',
    'home.college', 'network.theme'
]);
```
#### 通过公共模块将服务和指令模块纳入
各个子模块均需要调用服务工厂和指令，通过模块包含的方式实现，代码如下：
```javascript
angular.module('app.common',
    [
        'app.filters',
        'app.module',
        'baidu.map',
        'cgBusy',
        'college.module',
        'customer.module',
        "highcharts-ng",
        'myApp.kpi',
        'myApp.region',
        'myApp.url',
        'ngAnimate',
        'ngRoute',
        'ngTouch',
        'parameters.module',
        'rutrace.module',
        "ui.bootstrap",
        'ui.grid',
        'ui.grid.edit',
        'ui.grid.exporter',
        'ui.grid.pagination',
        'ui.grid.selection',
        'ui.router',
        'workitem.module'
    ]);
```
## 过滤器
## 测试系统
