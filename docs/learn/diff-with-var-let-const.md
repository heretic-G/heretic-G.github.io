var let const 的区别

var let const 并不是赋值 而是声明

一个变量声明分为2步 第一步就是

CreateMutableBinding或者CreateImmutableBinding 主要是把变量标志符绑订到对应Execution Contexts的Environment Records
上去 

这里let const和var存在一个区别是 

InitializeBinding var是在Execution Contexts的时候直接设置了undefined

let和const是在声明的位置才InitializeBinding 

其实他俩都会在binding后不能获取或者使用  只是var在binding后直接初始化了 所以没事 

还有就是var其实重复声明这里只进行了一次CreateMutableBinding 最开始的时候多个同名标志符 直接只触发一个binding

