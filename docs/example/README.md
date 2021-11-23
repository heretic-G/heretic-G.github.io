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
