# LTE网络优化平台
This is a .net solution for LTE wireless network optimization when I work in China Telecom.
该解决方案是一个主要以WEB页面形式为呈现方式的综合网络优化分析呈现平台。
##项目总体结构
##后端模块
###数据库接口模块
    本平台采用了SQLServer、MySQL、MongoDB等数据库引擎。采用ABP的仓储架构。详细说明详见[这里](https://github.com/ouyh18/LtePlatform/blob/master/Databases.md)
###数据应用层
    调用各种数据库访问模块，详细说明详见[这里](https://github.com/ouyh18/LtePlatform/blob/master/Evaluations.md)
###基础数据设施
    定义了基本的数据类型和各类公用操作函数、类等，详细说明详见[这里](https://github.com/ouyh18/LtePlatform/blob/master/Infrastructure.md)
##前端模块
    前端程序主要采用了谷歌的AngularJS和Twitter的Bootstrap框架。
###Javascript脚本
    AngularJS架构的Javascript脚本详见[这里](https://github.com/ouyh18/LtePlatform/blob/master/Angular.md)
    
###移动应用程序
