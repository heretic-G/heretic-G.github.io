vue 2的 keep-alive

实际就是内部的一个组件 定义的是 abstract 也就是在实际的dom中不展示 在生成的vnode中也不会展示

内部有cache的state key生成逻辑是
```javascript
const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
```
然后会在被缓存的vnode上面增加keepAlive属性为true

在缓存中只会缓存第一个组件 这里还有一个点就是 触发的生命周期
```javascript
vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive
// 触发   
componentVNodeHooks.prepatch(mountedNode, mountedNode);
```

react 是不支持keep-alive的 本质keep-alive是为了保存数据 减少切换导致的渲染时间 也可以提前的加载组件

社区有个 React Activation 插件好像是做的最好的了 不过还是存在问题，这种一般都是简单页面不会用 复杂页面 一旦出了问题那就是大坑

18中存在Offscreen新的api 不过并没有完全的激活和未激活的新的生命周期 都是触发渲染和卸载
不过感觉依赖这个api再去实现可能情况会更好


