arguments 主要就是FunctionDeclarationInstantiation里面的一部分逻辑 这里拆分出来单独记录下
(因为fun 一直没有弄很明白 但是arguments已经看的明白了)

arguments主要就是3个逻辑

* 要不要创建
* 要不要Map
* 是不是不可变的

第一要不要创建在规范中是`argumentsObjectNeeded`

默认是`true` 下面列举变为`false`的情况 (所有情况都是非严格模式 因为有个early error 严格不能存在`arguments`或者`eval`当做变量)
* `ThisMode`是`lexical` 
* 参数里面存在同名变量(也就是也有参数叫做`arguments`)
* 不包含默认值的情况下函数或者`lexicalNames`存在同名变量(也就是也有函数或者`let` `const`的变量也叫`arguments`)

第二要不要创建Map (Map可以实现`arguments`和参数变更互相更新 实质也就是绑了一层 互相变)

* 严格模式不创建Map
* `simpleParameterList`为`false`不创建 (只要不是全部是纯参数初始化就是非`simple`的)

第三要不要创建不可变
* 是不是严格模式(严格)
