# LTE网络优化平台
This is a .net solution for LTE wireless network optimization when I work in China Telecom.
该解决方案是一个主要以WEB页面形式为呈现方式的综合网络优化分析呈现平台。该平台的程序是一个用Visual Studio开发的解决方案。
##解决方案总体结构
    解决方案共分22个项目，其中程序项目11个，测试项目11个。分为后端模块、前端模块和辅助模块三部分。
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
    主要分为Xamarin和Ionic两个项目。
##辅助模块
###MR数据采集模块
    MR数据（包括MRO、MRS和MRE三部分）存放在FTP服务器上，以压缩的XML文件形式存在，最终需要存放在Mongo数据库中。因此该模块需要完成数据的定期下载、解压、数据解析和入库功能。该模块主要是一些Python脚本，详细说明详见[这里](https://github.com/ouyh18/LtePlatform/blob/master/MrPython.md)
###信令解析模块
