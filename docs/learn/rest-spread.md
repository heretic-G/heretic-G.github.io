...主要分为2个大类

#### Rest 主要是收集剩余变为数组并绑订到标志符上

BindingRestElement

RestDestructuringAssignmentEvaluation
    
    AssignmentRestProperty

IteratorDestructuringAssignmentEvaluation
    
    AssignmentRestElement

这里看其实分为两种 解构和默认的rest

解构主要看左面的外层是什么结构来判断是使用什么算法的结构逻辑

目前理解[...rest] 就是使用AssignmentRestElement {...rest}就是使用AssignmentRestProperty



#### Spread 把数据扔到另一个中

Array Initializer 

    SpreadElement是需要iterator而且只能在最后

Object Initializer

    PropertyDefinition是使用[[OwnPropertyKeys]]

    这里其实剩余所有都是这里的逻辑 
    undefined or null直接返回 其余的数据会变为object
    调用对应的OwnPropertyKeys逻辑