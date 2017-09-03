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
## 指令系统
## 控制器模块
## 过滤器
## 测试系统
