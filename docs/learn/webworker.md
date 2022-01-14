



web worker 看mdn就是线程 这里存在很多限制 同源限制 

    dom是不可以操作的
    bom只有部分可以操作 requestAnimationFram navigator location XMLHttpRequest/fetch setInterval/clearInterval setTimeout/clearTimeout

web worker 在使用的时候这里浏览器会存在最大限制不过现在都不叫大 看了ff是512现在 我们可以依赖navigator.hardwareConcurrency来确定需要创建的并行数量
但是实际我自己测试在一个1800ms的任务

1  1800 2 1800-1900 3 2000 4 2100-2400 5 2500-2700 6 3070-3200

这里可以看到当并行多了 其实因为抢占这里性能会下降  但是实际还是比单独要快

所以这里能够保持main的响应

##### 分块传输
这个应该是最基本的 大量数据肯定会这样搞 因为数据来源的生成也是要时间的 比如file如果一次read 会卡主一段时间

分段既是生成也是传输
##### 增量传输
需要提前规划好 还要就是转换为增量这里main需要时间开销 整体设计会增加复杂度

##### Transferable

这个在时间上 几乎等于一次通信的最低时间 问题是支持数据少 main的数据直接无了

只有几个数据可以ArrayBuffer、MessagePort 和 ImageBitmap
##### shareArrayBuffer

这里本身就是为了解决数据传输的问题整体直接共享 这里的问题在于 常规逻辑在使用的时候 转成buffer也是存在成本的

还有就是需要直接做站点隔离 也就是COOP 不然现在share是不能使用的

写了个demo
