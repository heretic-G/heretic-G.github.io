开头其实是要实现个 toLowerCase没看规范前还感觉应该没多难基本大家印象的大小写转换就是英文使用ASCII去做转换

我最开始认为差不多 看了才发现太年轻了实际规范是把string转成unicode utf-16 然后描述中说是使用unicode默认大小写转换算法

unicode定义的大小写转换就是类似map的玩意不过有个注意的是 大写的不一定小写就是逆向的



charCodeAt

codePointAt

超过utf-16 编码 的字符处理

utf-16 编码