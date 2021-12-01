
rest的值其实是变量 这里需要设置类型 然后infer 就可以了 

我的问题是没想到这里还需要设置类型 我觉得是不用的

```typescript

type Last<T extends any[]> = T extends [...args: any, last: infer R] ? R : never

```


再写一遍 其实这里不需要变量名... 

```typescript

type Last<T extends any[]> = T extends [...infer Rest, infer Last] ? Last : never

```
