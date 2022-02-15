[1](https://zhuanlan.zhihu.com/p/266564150)

component 

component Instance 

react element

fiber

dom



```javascript
// Instance
this.tag = tag; // 组件类型
this.key = key; // 唯一
this.elementType = null; // react 元素类型
this.type = null; // 组件构造函数
this.stateNode = null; // 跟当前Fiber相关本地状态（比如浏览器环境就是DOM节点）

// Fiber
this.return = null; // 获取父元素
this.child = null; // 第一个儿子节点
this.sibling = null; //下一个兄弟节点
this.index = 0; // 同层第几个

this.ref = null; //

this.pendingProps = pendingProps; // 下一次的props
this.memoizedProps = null; // 当前props
this.updateQueue = null; // 更新队列
this.memoizedState = null; // 当前state
this.dependencies = null; //

this.mode = mode; // 渲染模式

// Effects
this.flags = NoFlags; // 自己需要啥操作
this.subtreeFlags = NoFlags; // 子节点需要啥操作 快速知道需要下去不
this.deletions = null; // 删除节点

this.lanes = NoLanes; // 优先级
this.childLanes = NoLanes; // 子元素优先级

this.alternate = null; // 代替者 


```