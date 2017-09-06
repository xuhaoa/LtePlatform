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
以
## 过滤器
## 测试系统
