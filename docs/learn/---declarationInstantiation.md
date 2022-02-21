本章主要是梳理正常的几个声明初始化的流程来了解和学习EC和ER也是了解js的运行流程

目前我自己感兴趣的就是 `Block` `Global` `Function` 也就是

* BlockDeclarationInstantiation
* GlobalDeclarationInstantiation
* FunctionDeclarationInstantiation

这个不光是设计他们本身自己的初始化流程 还涉及了一部分在附录B中兼容处理

### InstantiateOrdinaryFunctionObject

创建function object 初始化创建一共是普通对象的2个属性和15个function object的15个属性 

然后初始化这些参数(这里不列举 具体的去看规范) 设置length、name、prototype 设置[[call]]、[[construct]]

## FunctionDeclarationInstantiation

详细的的流程这里也不是会列举 主要是 重要的步骤 


#### arguments

第一个就是arguments 是不是需要创建一个map，具体的差异就是是调用
` CreateUnmappedArgumentsObject` 还是 ` CreateMappedArgumentsObject`来创建arguments
这个影响就是是不是会存在一个类似map的玩意存在于内部 这个会在属性上面增加setter和getter方法
导致变量和arguments的对应index位置的值做联动 或者说 两方会同步更新


简单参数列表 不存在参数或者只有参数标志符 也不能是解构 就只是最简单的模式

参数表达式 简单理解就是有默认值 (这里他不在乎是不是解构 只要里面没有默认值 外面也不存在就可以)

1.argumentsObjectNeeded = true
2.如果[[ThisMode]] 是lexical   argumentsObjectNeeded = false
3.如果参数中存在`arguments` argumentsObjectNeeded = false
4.没有默认值 存在let arguments 或者arguments的函数     argumentsObjectNeeded = false
5.判断的时候是当为argumentsObjectNeeded为true并且 非严格模式 并且是简单参数列表 才可以创建map

总结就是非严格 && 简单参数列表 && arguments 不能存在 参数列表 不能存在函数名列表 不能存在 lexicalNames列表


#### 多创建一个ER

第二个就是是否会多创建一个ER 

这里比较简单 当是严格或者不存在默认值的时候只会创建一个ER

也就是只有非严格 && 存在默认值的时候 会多创建一个ER

基于LE创建一个指向他新的DER  然后这个VR等于LE,LE等于创建的ER 
```javascript
// 1
ER = {
  ER: DER,
  OuterEnv: LE 
}

// 2
VR = LE

// 3
LE = ER

```

## GlobalDeclarationInstantiation




## BlockDeclarationInstantiation




