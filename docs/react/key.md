### React的key

1.React的key从jsx进来存在默认值`null` 然后除了`null`都转成了`string`

2.处理的key进来后到了`ReactElement`变成了`element`

3.`element`还会把key给`Fiber` 

4.在diff中 还会当做`map`的key用于创建`existingChildren` 
这里有差异是如果是`null`这里会使用`index`而其他很多比较的地方都是直接比较

这就是我了解的key存在的地方 现在说说作用也就是他的目的是什么 有没有他会产生什么差异

不存在key其实在diff的时候那key其实是一样的都是`null`或者`index` 一一对应 

举个例子 一个`<li>张三</li>`文案变成李四 不加key会直接复用li dom 加了key其实会销毁dom 然后创建新的li展示李四

所以如果是一个简单的list其实不加key效率更高

但是如果存在状态就不一样了 张三选中 不加key 其实这时候变更李四会变成李四选中 这里需要加key 去保证状态跟随正确

实质key是为了稳定的状态 它避免了一些错误 (但是并不是会一定提高效率，或者说绝大多数情况key都是保证的稳定性)


### Vue2的key (vue 我了解并不多)

vue的流程我不是很熟 但是vue其实实质差不多的 他的默认可以理解是`undefined`diff 和react有差异 
但是实质如果key 相同 type相同还是会复用 唯一差异就是arr 没有建立map去对比 但是vue 复用更多 没有key react需要
index对应上的type一样才会复用 vue是直接扫 扫到能复用的直接就用了


找的网上的介绍

在 Vue2 里 updateChildren 会进行

    头和头比
    尾和尾比
    头和尾比
    尾和头比
    都没有命中的对比

在 Vue3 里 patchKeyedChildren 为

    头和头比
    尾和尾比
    基于最长递增子序列进行移动/添加/删除


