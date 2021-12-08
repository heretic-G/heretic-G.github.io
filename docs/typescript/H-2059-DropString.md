```typescript

type inStr<S, T extends string> = S extends `${infer F}${T}${infer L}` ? '' : T
type DropString<S extends string, R extends string> = R extends '' ? S : S extends `${infer F}${infer L}` ? `${inStr<R, F>}${DropString<L, R>}` : ''

```


早上脑子蒙蒙的 每个字符判断是不是匹配字符串就可以了