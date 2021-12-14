=>>>>> [首页](https://heretic-g.github.io/)

下面都是独立demo

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

[图片增加马赛克和水印](https://heretic-g.github.io/Mosaic/index.html)

    基础的图片增加马赛克和水印功能  (水印不能增加多个)
    实际处理是4层canvas的结构
    从底下数 第一层背景 第二层马赛克 第三层水印 第四层操作
    然后生成直接排除最上层 直接按照顺序合成 更多的工作在于查询api参数... 
    撤销就是撤销马赛克步骤 其实就是存呗...
    马赛克生成是实时算的 这里其实算的范围小 也可以换一种方式 一次生成完整的马赛克图片 马赛克其实就是展示对应的马赛克图片的opacity为1 
    这里的问题在于一次生成会造成堵塞感 需要切小片 分片计算 如果在未生成完整的时候操作马赛克 已生成区域直接展示 未生成区域 直接按照对应分块生成
    这里有个性能在于可能需要的区域小于很多要实际生成的区域 所以这里需要尝试下分块大小的不同实际体感 尤其是低性能端


[简单的限制请求+loading](https://heretic-g.github.io/limitApi/index.html)

    这是一个zepto的项目 初始是想要不大改或者在业务这边在增加很多重复代码的情况
    实现api的loading效果(具体的UI原本没打算在这里的后来想了想就直接也仍在这里了)
    具体逻辑就是在一个btn上增加一个tag 在点击的捕获和冒泡都在document增加绑定
    一次点击触发的fetch会基于参数生成唯一key然后产生一个自增的id 有个全局参数是activeKey
    累次都是累加上去(主要是为了一个click触发多个fetch 然后在冒泡的document会消费掉这个activeKey获取到所有的id 增加一个tag到dom)
    每个fetch回来会清除掉对应id的 一个组合都回来会清除对应key的tag document这里进来目标是btn看下有标志吗 有就直接取消冒泡...
    处理最后有个逻辑问题是无法获取click触发的异步逻辑

    其实如果可以改动的大一些就是做个绑定逻辑el、clickFun 返回一个set disabled set loading的对象 clickfun内返回promise 在promise上挂finally 
    disabeld设置为false 解除disanled 点击后变为loading 禁止点击在clickfun的finally里面在恢复非loaidng
    类似react或者vue的组件这里只是封装的逻辑

[draggable中拖拽元素不存在透明效果](https://heretic-g.github.io/draggable/index.html)

    拖拽中 浏览器会默认设置原有的为img 这里的透明度是不可以设置的 也就是比如默认是存在0.8的浏览器设置透明 你只能在此基础上去增加透明值
    而不能去在减少 所以这里我直接使用了一个透明的最小图片(其实就是白色的 我懒得找个透明的) 需要提前加载好 然后在拖拽的时候直接clone dom
    和鼠标保持一致 这里有个坑在于最后end的会设置个0 0 所以为了防止这个浏览器效果 我这里进行了一次x y的后移 也就是每次存一个 新的来了 设置老的 存新的
    就能够处理掉这个逻辑 以前没有接触过这个 也算是熟悉了下
