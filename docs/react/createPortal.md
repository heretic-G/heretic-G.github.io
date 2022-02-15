createPortal 本身就是把一个component 渲染到另一个dom中

看了下实质就是
```javascript
{
    $$typeof: REACT_PORTAL_TYPE,
    key: key == null ? null : '' + key,
    children,
    containerInfo,
    implementation,
}
```
到了这里其实就开始好奇render在做什么 来看下render的调用流程

- 调用render函数 
- 实际就是默认 forceHydrate 为false的调用legacyRenderSubtreeIntoContainer 这里会根据dom上有没有_reactRootContainer 来走不同的逻辑
  - 不存在的话首先会调用 legacyCreateRootFromDOMContainer去创建他 这里会绑定在container的_reactRootContainer上
    - legacyCreateRootFromDOMContainer不需要注水的话会先把容器清干净 然后调用 createContainer 实质就是createFiberRoot
      - createFiberRoot这里首先创建FiberRootNode为root root.current 是一个HostRoot的Fiber 在初始化更新队列 返回root
    - container的reactContainer为root.current
    - 绑订所有的event(这里不进行展开)
    - 
    
这样总结不好 或者说这样看沉浸在实现细节 这里导致过多关注细节 换一个方式 从函数大体逻辑来先理解legacy 和 



render之后其实就是在创建Fiber root 和hostRootFiber  初始化hostRootFiber的update队列

这里会往root dom上面挂载属性

- reactContainer 这里就是hostRootFiber
- reactRootContainer 这里是个对象其实就是FiberRoot

之后会开始初始化event 这里分两种事件 一种是需要捕获冒泡委托到容器的 另一种是不需要把捕获委托到容器的 而是在自己的dom就可以的

这里结束会开始非批量更新 触发updateContainer 这里先创建update挂到hostRootFiber上面 然后直接调用 performSyncWorkOnRoot
这里就到了最关键的renderRootSync和CommitRoot

renderRootSync 这里会进入workLoopSync 然后