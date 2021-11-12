```typescript
type FilterOut<T extends any[], F, N extends unknown[] = []> = 
T extends [fir:infer First, ...args: infer L] 
  ? [First] extends [F] 
    ? FilterOut<L, F, N> 
    : FilterOut<L, F, [...N, First]> 
  : N

```

这应该算是hard里面简单的了 数组挨个判断为了防止分发 直接让他不是一个naked 这样就解决了

看了下别人的答案 主要差异就是第三个变量是通过FilterOut 还是直接使用...来处理的

我改下我的 就是下面这样 这就是大多数在处理arr的2个逻辑差异 一个是存在上面 一个是

```typescript
type FilterOut<T extends any[], F> = 
T extends [fir:infer First, ...args: infer L] 
  ? [First] extends [F] 
    ? FilterOut<L, F> 
    : [First, ...FilterOut<L, F>]
  : []

```
