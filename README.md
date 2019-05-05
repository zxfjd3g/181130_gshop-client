# day01
## 1. 项目开发准备
    项目描述
    技术选型
    API接口

## 2. 开启项目开发
    使用脚手架创建项目: vue-cli ---> vue init webpack gshop-client
    安装所有依赖/指定依赖
    开发环境运行
    生产环境打包与发布

## 3. 搭建项目整体界面结构
	项目路由拆分
        确定路由组件显示的区域
        确定路由是几级路由
	App组件组成
    	底部导航组件: FootGuide
    	导航路由组件: MSite/Search/Order/Profile
	vue-router的理解和使用
      $router: 路由器对象, 包含一些操作路由的功能方法, 来实现编程式导航(跳转路由)
      $route: 当前路由对象, 一些当前路由信息数据的容器, path/meta/query/params
	FootGuide: 底部导航组件
		动态class
    编程式路由导航

