最经典的几个影响this的方法

#### call apply
    call和apply 其实最简单 这里其实就是使用第一个参数然后当做this直接去调用了内部的call方法

    这里还是记录下call apply的逻辑 其实就是第一个this的逻辑 如果是null undefined是window 否则
    对象数组函数直接扔 原始类型 会变成对应的封装类型的对象 当做this 其他的其实就真没啥了

#### bind
    bind这里会创建一个bind fun 为什么他不能影响new和bind fun不会被call和apply改变呢

    简单的说就是bind fun 被call的时候其实this还是call传入的但是bind fun有自己的一个call逻辑 人家不理你的this 直接是使用bind fun的一个内部保存bind的this去call 所以想要改变bind的指向就是要改这个内部属性的值 but没有方法
```javascript
    // TODO 完善bind 这里其实还有很多问题
    Function.prototype.aBind = function aBind (that, ...args) {
        let armFun = this
        if (typeof armFun !== 'function') throw TypeError('must a function')
        function BoundFun (...other) {
            if (new.target) {
                return new armFun(...args, ...other)
            } else {
                return armFun.call(that,...args, ...other)
            }
        }
        BoundFun.__proto__ = armFun.__proto__
        BoundFun.prototype = undefined
        
        return BoundFun
    }

```
#### new
    new 其实都不算是改变了 对于bind 为啥bind无效是因为他判断了bind 然后直接取了原始的fun 然后create一个obj去调的

#### arrow fun
    我目前发现arrow fun只有他自己是一个的 他在create fun的时候其实有一个特殊的字段 lexical-this 这个东西会导致他在获取的时候其实获取的是定义它的外层this (但是这里是建立的关系也就是外层如果被改变其实arrow fun是跟着变的)


留个坑 感觉这里需要过下几个call的流程
