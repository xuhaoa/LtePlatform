# LTE网络优化平台
This is a .net solution for LTE wireless network optimization when I work in China Telecom.
该解决方案是一个主要以WEB页面形式为呈现方式的综合网络优化分析呈现平台。该平台的程序是一个用Visual Studio开发的解决方案。

## 解决方案总体结构
解决方案共分22个项目，其中程序项目11个（主项目6个，辅助项目3个），测试项目11个。分为后端模块、前端模块和辅助模块三部分。
### 主项目
#### Abp.EntityFramework
该工程原本是ABP模块的一个部分。
本解决方案只是利用ABP的基础模块，Abp.EntityFramework采用了原有的大部分源代码，然后加上自己的一部分内容。
#### Lte.Domain
定义了公共的数据结构和基础数据设施。
#### Lte.MySqlFramework
定义了使用MySQL数据库引擎的有关数据实体、仓储及其实现，以及部分数据实体类的映射。
#### Lte.Parameters
定义了使用SQLServer和MongoDB数据库引擎的有关数据实体、仓储及其实现，以及部分数据实体类的映射。
#### Lte.Evaluations
定义了数据应用层模块。
#### LtePlatform
与本解决方案同名，是解决方案的主项目。
包括前端模块和后端模块中的用户认证模块和各类ASP.Net Web API2控制器的定义。
### 辅助项目
#### TraceParser
LTE信令数据的解析库，目前没有应用到主项目中。
#### ZipLib
压缩文件处理库，由于是C#项目，目前暂时没有应用。
#### Lte.Auxilary
辅助项目，主要是python脚本，目前用于后台数据的预处理。
### 测试项目
这部分主要是对各个后端模块的工程的单元测试，而对前端的测试模块在主工程中。
包括以下测试项目：
#### Abp.EntityFramework.Tests
#### Abp.Tests
#### AutoMapper.Test
#### Lte.Domain.Test
#### Lte.Evaluation.Test
#### Lte.Parameters.Test
#### LtePlatform.Tests
#### MongoDB.Driver.Legacy.Tests
#### Moq.Tests
#### TraceParser.Test
## 后端模块
### 数据库接口模块
本平台采用了SQLServer、MySQL、MongoDB等数据库引擎。
采用ABP的仓储架构。详细说明详见[这里](https://github.com/ouyh18/LtePlatform/blob/master/Databases.md)
### 数据应用层
调用各种数据库访问模块，详细说明详见[这里](https://github.com/ouyh18/LtePlatform/blob/master/Evaluations.md)
### 基础数据设施
定义了基本的数据类型和各类公用操作函数、类等，详细说明详见[这里](https://github.com/ouyh18/LtePlatform/blob/master/Infrastructure.md)
## 前端模块
前端程序主要采用了谷歌的AngularJS和Twitter的Bootstrap框架。
### Javascript脚本
AngularJS架构的Javascript脚本详见[这里](https://github.com/ouyh18/LtePlatform/blob/master/Angular.md)    
### 移动应用程序
主要分为Xamarin和Ionic两个项目。在2017版本中已经去除。

## 辅助模块
### MR数据采集模块
MR数据（包括MRO、MRS和MRE三部分）存放在FTP服务器上，以压缩的XML文件形式存在，最终需要存放在Mongo数据库中。
因此该模块需要完成数据的定期下载、解压、数据解析和入库功能。
该模块主要是一些Python脚本，详细说明详见[这里](https://github.com/ouyh18/LtePlatform/blob/master/MrPython.md)。

### 信令解析模块
对4G信令数据进行解析，分华为、中兴和爱立信三个厂家。
