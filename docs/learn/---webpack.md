- [文章](https://juejin.cn/user/1820446985555544/posts)
- 
- [文章2](https://webpack.docschina.org/)

学习总结笔记 可能比较凌乱 

- 初始化参数 把所有的配置参数合并成一份配置信息 例如默认的参数 配置文件 shell中的参数
- 创建编译器对象 创建Compiler对象
- 初始化编译环境 这里还没有太理解 但是这里能感觉webpack实际就是插件加一根主线实现的 内部外部都是依赖主线的事件去做事情 webpack内部的操作也是插件操作
- 开始 执行Compiler 的run
- 获取入口 入口文件变为 dependence对象

- 编译模块(make) 根据入口的dependence创建module 调用loader 转为js内容调用解释器 变为AST对象 从AST中寻找依赖 递归这个流程 直到空为止
- 完成模块编译 这里会依赖上面的流程中生成 依赖关系图

- 输出资源(seal) 根据入口模块和依赖关系 变为chunk 变为输出列表
- 写入到文件系统 

- Entry 入口 
- Compiler 编辑管理器
- Compilation 每次变更都会触发生成的一个结构 
- Dependence 依赖对象 记录模块依赖关系
- Module 用户的都是模块
- Chunk module生成的 这里其实已经很接近最后的输出文件
- Loader 内容转换
- Plugin 监听不同的事件 依赖这些事件 根据不同实际去变更编译的内容


合成配置 创建compiler 先注册用户定义的plugins 在注册内部的plugins
之后就是调用compiler.compile

这里面的逻辑就是先初始化 newCompilation的参数 然后触发make-> finish make -> finish -> seal


Tapable

    基本分为 