```typescript

type strToArr<S extends string = ''> = S extends `${infer F}.${infer L}` ? [F, ...strToArr<L>] : [S]

type getValByKey<T, A extends string[] = []> = A extends [infer F, ...infer Rest] ? F extends keyof T ? getValByKey<T[F], Rest extends string[] ? Rest : []> : never : T

type Get<T, K extends string> = K extends '' ? never : getValByKey<T, strToArr<K>>


```

算是常规题吧 没有hard的难度 基本就是循环取就可以了

我自己的习惯是str转arr 实际可以直接extends `${infer F}.${infer L}` 这样来取着判断

```typescript

type Get<T, K extends string> = K extends '' ? never : K extends `${infer F}.${infer L}` ? F extends keyof T ? Get<T[F], L> : never : K extends keyof T ? T[K] : never

```

其他也没发现好的方式
