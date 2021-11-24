```typescript

type IsAny<T> = [T, unknown] extends [unknown, T] ? [T, string] extends [string, T] ? true : false : false

```

其实难度很模糊的一道题 any的特性是既是底也是顶 我最开始就在想他和unknown有什么区别

就是父类型 子类型的区别 所以我先筛出来unknown 和any 然后在判断是不是unknown 就好了

看了别人的回答下面的思想也很好 & 的结果等于最小集 但是any是个特殊 所有人&他都是自己 这就导致2个不同的常量值最后会相等

也是个很好的想法 其实判断一个值是不是他就是判断他的特殊性

```typescript

type IsAny<T> = 0 extends (1 & T) ? true : false

```


