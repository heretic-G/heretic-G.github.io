#### 独立成demo的实现

计划是很多的 但是拆分出来的很少...


[贝塞尔曲线平滑canvas划线](https://heretic-g.github.io/example/canvas-draw-line.html)

[监听devtool是否打开](https://heretic-g.github.io/example/devtool.html)

[页面加载进度](https://heretic-g.github.io/example/pageLoading/index.html)

    页面内有一些已经添加的资源 打开控制台 把network的disabled cache勾上 刷新就好了 
    控制台或者页面会打印log
    这里也可以看到其实如果完全不依赖打包时候的size参数的话 完全通过head获取size 
    在加载进度上面根本没有帮助 因为size的api返回太慢 如果能在打包时带着size 其实这里体验能提升很多
    这里没有处理结束判断 在很多异步页面 需要在补充个结束表示 
    如果异步页面这里也需要防止进度完成或者过快的高百分比 需要在进度变快的时候减缓速度
    其实就是类似下载会卡最后一样  你能判断的都基本完成了 然后来了新的任务 很重 那确实展示进度也无法后退
    只能卡在这里了

[基础在线编辑](https://heretic-g.github.io/example/file/index.html)

    只是使用和学习新版的file api
    操作说明：
        获取文件夹之后 可以编辑下面的问题 
        新建文件如果存在在当前获取文件夹下会增到里面 如果不能就不会处理
        编辑保存需要手动处理

[基础在线编辑-单文件编辑](https://heretic-g.github.io/example/file/file.html)
    
    和上面的demo一样 这个只能选择一个文件会自动保存(就是操作间隔300ms)

[处理输入框的中文展示和过滤](https://heretic-g.github.io/inputShowAndLimit/index.html)

    如果抓input事件这里其实在中文或者合成的时候都会得到中间态的内容
    在此基础上面处理掉这个状态的值 只展示期望展示的值
    过滤非法值这个是在基础上增加的 如果依赖input其实会导致完全赋值后输入法因为设置value 变关闭(主要是没有api能够设置回输入法的状态)
    如果增加了没变化不处理 其实在非法值得时候也会导致退出输入法的状态 所以这里需要避开合成事件的节点
    期望react上的话 需要对接原生的event 不然如果使用受控组件这里在合成阶段 val不能变 不能变其实就是react给你设置了val会跳出来 需要手动封装一层
