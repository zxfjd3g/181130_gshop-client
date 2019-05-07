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
    1). 项目路由拆分
        确定路由组件显示的区域
        确定路由是几级路由
    2). App组件组成
        底部导航组件: FootGuide
        导航路由组件: MSite/Search/Order/Profile
    3). vue-router的理解和使用
        $router: 路由器对象, 包含一些操作路由的功能方法, 来实现编程式导航(跳转路由)
        $route: 当前路由对象, 一些当前路由信息数据的容器, path/meta/query/params
    4). FootGuide: 底部导航组件
        动态class
        编程式路由导航

## 4. 拆分组件
    1). 导航路由组件
        MSite
        Search
        Order
        Profile
    2). 抽取头部组件
        Header
        通过props向子组件传递数据
        通过slot向子组件传递标签
    3). 抽取商家列表组件
        ShopList
    4). 登陆/注册路由组件
        Login
        FooterGuide的显示/隐藏: 通过路由的meta

# day02
## 1. 启动后台应用并测试
    运行后台项目(启动mongodb服务), 
    使用postman测试后台接口, 如果不一致, 修改接口文档
    
## 2. 异步显示数据
    1). 封装ajax: 
        ajax请求的函数: 封装promise+axios
        接口请求函数: 根据接口文档定义
        解决ajax的跨越域问题: 配置代理, 对代理的理解
    2). vuex编码
        创建所有相关的模块: store/index|state|mutations|actions|getters|mutation-types
        设计state: 从后台获取的数据
        实现actions: 
            定义异步action: async/await
            流程:　发ajax获取数据, commit给mutation
        实现mutations: 给状态赋值
        实现index: 创建store对象
        main.js: 配置store
    3). 组件异步显示数据
        在mounted()通过$store.dispatch('actionName')来异步获取后台数据到state中
        mapState(['xxx'])读取state中数据到组件中
        在模板中显示xxx的数据
     
## 3. 异步显示分类轮播
    通过vuex获取categorys数组(发请求, 读取)
    对数据进行整合一计算(一维为特定的二维数组)
    使用Swiper显示轮播, 如何在界面更新之后创建Swiper对象?
        1). 使用watch+$nextTick( () =>{界面更新之后立即执行})
        2). 使用回调+$nextTick()	
    使用svg图片实现loading的效果
    
## 4. Star组件
    创建组件, 设计组件的props
    使用组件标签, 并传入相应的标签属性
    完成组件编码: 使用计算属性
    
# day03
### 1. 纯前台交互效果
    1). 切换登陆方式: isShowSms
    2). 手机号验证: right_phone_number + isRightPhone计算属性
    3). 倒计时效果: computeTime + setInterval()
    4). 密码显示/隐藏的切换: isShowPwd + transition
    5). 前台表单验证: 使用vee-validate进行声明式表单验证
    
### 2. 前后台交互效果
    1). 一次性图形验证码: 
        通过<img src="url">请求后台获取验证码图片显示
        点击回调中更新img的src, 并携带时间戳参数, 更新验证码
    2). 发送短信验证码
        使用第三方短信平台接口
        请求发送验证码短信
        使用mint-ui实现对不同结果的不同提示效果
    3). 短信登陆/注册
    4). 密码登陆/注册
        发送ajax请求, 得到返回的结果
        根据结果的标识(code)来判断登陆请求是否成功
            1: 不成功, 显示提示
            0. 成功, 保存用户信息, 返回到个人中心
    5). 自动登陆
        session与cookie的理解
        后台将userid保存到session中
        App初始化过程中发请求获取user信息, 并保存到state
    6). 退出登陆
        请求退出登陆的接口, 重置state中的user
        
## 3. cookie与session
    1). cookie:
    	会话cookie: 保存在浏览器的运行时内存中, 关闭浏览器数据不存在了
    	持久化cookie: 保存在浏览器管理的文件中, 关闭浏览器数据还存在了
    
    2). sesion:
    	会话(浏览器端):　从浏览器打开到关闭整体过程都是一个会话
    	session对象(服务器端): 用来存储数据的容器, 
    			这个对象一旦产生, 服务器会自动向浏览返回一个对应的cookie, 用来保存session的ID: connect.sid=sessionID
    			在服务器通过req.session获取session对象
    				1. 从req中取出以connect.sid为key的cookie值
    				2. 如果有, 找到对应的session对象
    				3. 如果没有, 创建新的session对象
    	目标: 关闭浏览器, 再打开还是同一个会话?
    		让connect.sid的cookie设置成为一个持久化cookie
    
## 4. 使用容联的基本步骤
    1). 注册并登陆
    2). 添加测试号码
    3). 在后台应用的sms_utils.js中修改相关信息串, 并重新启动后台应用
    4). 启动前台应用, 测试发送验证码的功能
    