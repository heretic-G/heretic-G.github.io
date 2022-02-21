这里只是学习记录的笔记 总结别人的知识  并没有自己进行测试和debugger源码的实现逻辑

完全使用js实现的js解析器 

解析出来的tree是满足[ESTree spec](https://github.com/estree/estree)的

正常的流程就是字符串进来后进行分词处理 分词后进行语法分析 最后生成ast抽象语法树

acorn的词法和语法分析是交替进行的