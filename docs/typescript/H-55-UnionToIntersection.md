```typescript

type UnionToIntersection<U> = (U extends infer R ? (args: R) => void : never) extends (args: infer L) => void ? L : never

```

今天事情很多 正好有个H中的简单题 完成...联合转交叉就很基础的一个操作

一看这个还想起来 我的联合转有序元祖 还没搞定 裂开...
