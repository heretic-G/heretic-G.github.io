[如何阅读ecmascript规范](https://timothygu.me/es-howto/)

[v8 理解ecmascript-1](https://v8.dev/blog/understanding-ecmascript-part-1)

[v8 理解ecmascript-2](https://v8.dev/blog/understanding-ecmascript-part-2)

[v8 理解ecmascript-3](https://v8.dev/blog/understanding-ecmascript-part-3)

[v8 理解ecmascript-4](https://v8.dev/blog/understanding-ecmascript-part-4)


你可以理解这就是一篇翻译文 也可能存一些我的理解 我建议你自己阅读上面的文章 因为我自己记可能比较乱或者不成条理...

但是阅读ECMASCRIPT 确实是一个快速、准确、实时性高的方案，而且大多数规范都是易读的 只有很少的一些概念逻辑或者结构上的我觉得
单纯的阅读是难以理解的...不多BB开始


主要其实就是算法步骤中涉及的内容

1.Let b be ! ToBoolean(value).

上述的ToBoolean 他并不是一个真实实现时候存在的一个function 而是一个逻辑的名称或者一段逻辑别名 ToBoolean => 代表一段抽象逻辑 他会有自己的逻辑步骤 
一般来说你从理解可以理解为他就是一个js中的函数(只是方便理解 但是实际无关 只是为了方便复用和减少一些冗长的代码量 利于理解和阅读)

2.[[Prototype]] 类似的这种[[]]的其实需要你参考下上下文 可能含义会存在区别 但是理解上 他就像是一个object的属性，只是在js中我们不能直接去操作
部分存在可以利用提供的api去操作的

一般来说[[]]是存在于三种 `Record` `internal slots` `internal methods`

3.Completion Records

结构理解就是
```typescript
CR = {
    '[[Type]]': 'normal' | 'return' | 'throw' | 'break' | 'continue',
    '[[Value]]': unkonw, // Type 为 'normal' | 'return' | 'throw'
    '[[Target]]': unknow, // Type 为 'break' | 'continue'
}

```

然后两个缩写字符 
? 等价于ReturnIfAbrupt 
! 等价于从正常完成记录中提取值 也就是不会出现错误

    1.令val为Foo()；（val是一个完成记录。）
    2.断言：val非突然完成；
    3.设val为val.[[Value]]。

Return 好像是表示后面一定是一个 Record
