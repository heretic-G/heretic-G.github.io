
数组操作都是用infer和解构

```typescript

type Pop<T extends any[]> = T extends [...args: infer R, other:any] ? R : never
type Pop<T extends any[]> = T extends [...infer R, infer X] ? R : never


```


裂开 写错md了 我说怎么感觉乖乖的... 下面这种当时记录下了

再写一遍 其实这里不需要变量名...

```typescript

type Pop<T extends any[]> = T extends [...infer Rest, infer Last] ? Rest : never

```
