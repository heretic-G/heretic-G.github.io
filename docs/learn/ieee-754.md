ieee-754 是js是使用的存储number的规范

这个其实难度没有很多 1为符号位 11位指数位 52位尾数位

所以我的理解其实数字是转成二进制的科学计数法来存储的

在指数位中 定义了1023是0 尾数其实还有一位隐藏位

有几个特殊值  指数位全1 尾数全0 就是无穷 具体正负无穷就看符号位

指数全1 尾数 非全0就是 NaN

然后其实就没啥了 精度问题是因为 小数10进制转2进制可能是个无线的 那这时候你有限位存无线位
肯定会丢失一些

所以其实经典问题就是 0.1 + 0.2 为啥不是0.3 是因为0.1其实就是个无线 然后0.2也是无线 俩人加一块直接等于一个满长度的小数

这里其实有个新的问题 为什么0.1能够展示0.1 这个比上一个好玩 其实存储的时候 0.1确实贼长然后舍了一部分导致精度出现问题 

但是chrome 在做展示的时候使用了一个算法来让这个存储存在精度的问题展示是回归到期望的值(或者是更短的展示值) 
Grisu3这个算法 其实还有Dragon4 这个是ecma规范中说道的 但是这个算法
慢一点 所以v8 后来使用了Grisu3来实现的 

这个具体实现我没看 但是其实简单的说(嗯 就是我猜的)就是如果在很小的值上面+- 一个很小的数之后 数字会变短 就用这个短的

所以在回到第一个问题 0.1 其实是一个丢失精度的但是他丢失的就是一个很小的数 所以优化展示回到了0.1 然后0.2也是一个很小的数 
但是优化展示回到了0.2 这俩加一块 误差变大了...然后0.3基于算法的逻辑没有得到一个更短的所以直接展示了全部(这个也是我猜的 没有验证 所以错误的话...轻喷)

上面的0.1+0.2 这里在详细梳理了下 

0.1是一个丢了精度的值 0.2是一个丢了精度的值 

这俩计算的时候需要先对阶 然后计算 最后格式化和看看怎么处理多余位 

```javascript

(0.1 + 0.2).toString(2)
// '0.0100110011001100110011001100110011001100110011001101'
0.3.toString(2)
// '0.010011001100110011001100110011001100110011001100110011'

```

这里可以很明显的看到最后的值存在误差 因为0.1可能进位 0.2可能进位 这俩对阶后再处理 不知道会不会影响 导致最后的结果在经过
Grisu后可能已经优化展示不出原来的值 那我们可以在写个更简单的逻辑处理大多数情况

```javascript

function rn(num) {
    return Number(Number(num).toFixed(16))
}

```

这里能处理很多种情况的值了 但是有个逻辑是 如果你的数本来就很小...很可能就后面的被处理了 但是考虑一般的值也不会算到那么多小数位 其实基本够用...

当然存在一个问题是如果经过多次计算的值 可能影响超过了16的精度 这里可以调整这个值

比如正常计算 可能保留个5位 那一般写个10就可以 如果有更多可能的数 那就需要使用各math的库了

舍入误差 
    向偶 现在好像就是这个 虽然53位的尾数 看第54位是0还是11就53 + 1然后得到的结果
    向0
    向上
    向下


补偿一个计算逻辑 
浮点数计算	
    
    对阶 
    尾数求和
    规格化 
    舍入和溢出判断

[v8代码](https://github.com/v8/v8/blob/dc712da548c7fb433caed56af9a021d964952728/src/numbers/fast-dtoa.cc)

[简单的中文介绍](https://bitjoy.net/2015/08/30/introduction-to-floating-point-numbers-and-grisu-algorithm/)

[Grisu算法](https://www.cs.tufts.edu/~nr/cs257/archive/florian-loitsch/printf.pdf)
