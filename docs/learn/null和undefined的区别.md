最基本的 

typeof

    null是object(不要再背老黄历的什么对象是000 null也是然后就返回对象了 无论历史基于什么原因现在就是 兼容处理 在规范中null可以获取到null类型 只是为了兼容展示了object)
    undefined是undefined

语义

    null更多是在于object里面的null
    undefined更多是一个值没有定义

toBoolean
    
    都是false

toNumber
    
    null => 0
    undefined => NaN

还有个保留字

    undefined不是保留字但是在最外层不能声明是因为 

```javascript

Object.getOwnPropertyDescriptor(window, 'undefined')
// {value: undefined, writable: false, enumerable: false, configurable: false}

```

    let不能声明估计是在最外层的变量空间标志符绑订 并且初始化完了 