---准备 重写<最近看了新的内容 需要重新处理>

0b111  二进制


原码 这玩粗暴点 第一位标志符号位就算是原码 一般1为负 0为正
反码 正数还是自己 负数就是先干掉符号位 取反 在把符号位放回去...
补码 反码+1也可以 原码从右第一个1和他右边的0不变然后左边按位取反也可以

为啥有这三... 其实就是处理减法时候的负数问题...  因为他要转换成加法然后保证计算结果正常


js 只存在 与、或、非、异或
与 		&		有0出0 全1出1
或		|		有1出1 全0出0
非		!		有1出0 有0出1
与非	nand	         先与再取反
或非	nor	                 先或在取反
同或	xnor		         相同为1 相异为0
异或	xor ^		相异为1 相同为0
~按位非


`<<` `>>` 和 `>>>`
`>>` 是有符号右移
`>>>` 是无符号右移

然后js中 负数整数转成二进制存的是补码
你在负数 >>  和~中都能发现验证这个

感觉没有更多内容了 应用一般就是一些leetcode中 或者计算中会用 还有一些把位当做一个逻辑的时候做一些合并处理(React里面)


toString(radix)
parseInt(string, radix)
